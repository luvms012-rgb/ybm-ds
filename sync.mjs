#!/usr/bin/env node
// yds — 통합 동기화: Figma ↔ 로컬(ds/) ↔ GitHub(저장소 + Pages) ↔ 가이드 사이트
//
//   node sync.mjs                  상태 보기 (검증 + git + 배포 주소)
//   node sync.mjs figma            Figma 점검 스크립트 생성 → tokens/.figma-check.js
//                                  (Claude 가 use_figma 로 실행하고 결과를 tokens/.figma-result.json 에 저장)
//   node sync.mjs links           Figma 문서 프레임의 문서 / 코드 링크를 고치는 스크립트 생성 → tokens/.figma-links.js
//   node sync.mjs docs            Figma 문서 프레임 본문을 사이트와 같은 순서로 채우는 스크립트 생성 → tokens/.figma-docs.js
//   node sync.mjs docpage <slug>  컴포넌트 문서 프레임 하나를 사이트 페이지 구성 그대로 다시 그리는 스크립트 → tokens/.figma-docpage.js
//   node sync.mjs pull [결과.json]  Figma 결과 반영 → 토큰 빌드 → 검증 → GitHub 배포 → 가이드 재배포
//   node sync.mjs build            토큰만 다시 빌드 (오늘 날짜)
//   node sync.mjs verify           검증만
//   node sync.mjs deploy ["메시지"]  검증 → 전체 검사 → commit → push → 가이드 재배포
//   node sync.mjs check [--regen] [--live]  전체 검사 (tools/check.mjs: 링크, 사이트, 템플릿, 마크다운, 싱크, 컴포넌트 9곳)
//   node sync.mjs release 1.1.0 ["메시지"]  새 버전: VERSION, DS 머리 버전, Updates 버전 → 검사 → 배포 → 태그 v1.1.0
//
//   옵션  --no-push   커밋까지만      --ds-only   가이드 재배포 생략      --no-check  배포 전 전체 검사 생략
//
// 동기화.bat 더블클릭 = node sync.mjs deploy  (Figma 단계는 Claude 에게 "ds 동기화" 라고 요청)

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import { build, today } from './tokens/build.mjs';
import { linkPlan } from './tokens/links.mjs';

const DS = path.dirname(fileURLToPath(import.meta.url));
const WORKS = path.dirname(DS);
const CFG = JSON.parse(fs.readFileSync(path.join(DS, 'deploy.config.json'), 'utf8'));
const GUIDE_PUBLISH = path.join(WORKS, 'project', '_publish', 'publish.ps1');
const RESULT_DEFAULT = path.join(DS, 'tokens', '.figma-result.json');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const [cmd = 'status', arg] = args.filter((a) => !a.startsWith('--'));

const c = { g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[36m${s}\x1b[0m` };
const say = (s = '') => console.log(s);
const die = (s) => { say(); say(c.r('  ✖ ' + s)); say(); process.exit(1); };
const rel = (p) => path.relative(DS, p).replace(/\\/g, '/');
const read = (p) => fs.readFileSync(path.join(DS, p), 'utf8');

// ── git ──────────────────────────────────────────────────────────────────
function git(gargs, opts = {}) {
  const r = spawnSync('git', gargs, { cwd: DS, encoding: 'utf8', ...opts });
  if (r.error && r.error.code === 'ETIMEDOUT') return { ok: false, out: '', err: 'timeout' };
  if (r.error) die('git 을 찾을 수 없어요. Git for Windows 또는 GitHub Desktop 을 설치해 주세요.');
  if (r.status !== 0 && !opts.allowFail) throw new Error((r.stderr || r.stdout || '').trim() || `git ${gargs.join(' ')} 실패`);
  return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
}
const isRepo = () => fs.existsSync(path.join(DS, '.git'));
function ensureRepo() {
  if (isRepo()) return;
  git(['init', '-q', '-b', CFG.branch]);
  git(['remote', 'add', 'origin', CFG.repoUrl]);
  say(c.d(`  git 저장소를 만들었어요 → ${CFG.repoUrl}`));
}
function identityArgs() {
  const n = git(['config', 'user.name'], { allowFail: true }).out;
  const e = git(['config', 'user.email'], { allowFail: true }).out;
  return [...(n ? [] : ['-c', `user.name=${CFG.author.name}`]), ...(e ? [] : ['-c', `user.email=${CFG.author.email}`])];
}

// ── 검증 ─────────────────────────────────────────────────────────────────
function verify({ quiet = false } = {}) {
  const errors = [], warns = [];
  // 1) 생성물 = 스냅샷 빌드 결과 (손으로 고쳤거나 빌드를 빠뜨렸는지)
  const stamp = (read('dist/tokens.css').match(/생성: (\d{4}-\d{2}-\d{2})/) || [])[1] || today();
  let built;
  try { built = build(stamp); } catch (e) { errors.push('토큰 스냅샷 오류 — ' + e.message); }
  if (built) for (const [p, text] of Object.entries(built)) {
    if (!fs.existsSync(path.join(DS, p))) errors.push(`생성물 없음: ${p} → node sync.mjs build`);
    else if (read(p) !== text) errors.push(`생성물이 스냅샷과 다름: ${p} — 손으로 고치지 말고 Figma 변수 → node sync.mjs pull`);
  }
  // 2) 진입 파일의 @import 대상
  for (const m of read('dist/ybm-ds.css').matchAll(/@import url\("([^"]+)"\)/g))
    if (!fs.existsSync(path.join(DS, 'dist', m[1]))) errors.push(`ybm-ds.css 가 없는 파일을 import: ${m[1]}`);
  // 3) 폰트
  for (const m of read('dist/base.css').matchAll(/url\("?([^")]+\.woff2)"?\)/g))
    if (!fs.existsSync(path.join(DS, 'dist', m[1]))) errors.push(`폰트 파일 없음: ${m[1]}`);
  // 4) components.json ↔ components.css
  const css = read('dist/components.css');
  const manifest = JSON.parse(read('components.json'));
  const listed = new Set();
  for (const comp of manifest.components) for (const cls of comp.classes) {
    listed.add(cls);
    if (!new RegExp(`(^|[\\s,>+~(])${cls.replace(/[.-]/g, '\\$&')}(?![\\w-])`, 'm').test(css)) errors.push(`CSS 에 없는 클래스: ${cls} (${comp.no} ${comp.name})`);
  }
  const roots = new Set([...css.matchAll(/^(\.ds-[a-z0-9-]+)(?![\w-])/gm)].map((m) => m[1]));
  const unlisted = [...roots].filter((r) => !listed.has(r) && ![...listed].some((l) => r.startsWith(l + '-')));
  if (unlisted.length) warns.push(`components.json 에 없는 CSS 클래스: ${unlisted.join(' ')}`);
  // 5) 미리보기 페이지
  if (!fs.existsSync(path.join(DS, 'index.html'))) warns.push('index.html(컴포넌트 미리보기)이 없어요');

  if (!quiet) {
    say(c.b('  검증'));
    if (!errors.length) say(c.g(`  ✔ 토큰 생성물 · import · 폰트 · 컴포넌트 ${manifest.components.length}종 이상 없음`));
    for (const e of errors) say(c.r('  ✖ ' + e));
    for (const w of warns) say(c.y('  ! ' + w));
  }
  return { errors, warns };
}

// ── Figma 점검 스크립트 (변수 + 컴포넌트) ────────────────────────────────
function figmaScript() {
  execFileSync(process.execPath, [path.join(DS, 'tokens', 'figma-sync.mjs'), 'check'], { cwd: DS, stdio: 'pipe' });
  const file = path.join(DS, 'tokens', '.figma-check.js');
  const varScript = fs.readFileSync(file, 'utf8').replace(/^\/\/.*\n/, '');
  const manifest = JSON.parse(read('components.json'));
  const nodes = manifest.components.flatMap((comp) => comp.figma.map((f) => ({ label: `${comp.no} ${comp.name}${f.part ? ' / ' + f.part : ''}`, ...f })));
  const script = `// 자동 생성 — node sync.mjs figma (${today()}) · fileKey ${manifest.figmaFile} · 읽기 전용
// 결과 = { variables: {...}, components: {...} } → tokens/.figma-result.json 에 저장 후 node sync.mjs pull
const variables = await (async () => {
${varScript}
})();
const components = await (async () => {
  const NODES = ${JSON.stringify(nodes)};
  const res = { ok: 0, missing: [], typeMismatch: [], variantMismatch: [], unlisted: [] };
  const known = new Set(NODES.map((n) => n.id));
  for (const n of NODES) {
    const node = await figma.getNodeByIdAsync(n.id);
    if (!node) { res.missing.push(n.label + ' ' + n.id); continue; }
    if (node.type !== n.type) { res.typeMismatch.push(n.label + ' ' + n.id + ' → ' + node.type); continue; }
    if (n.variants && node.type === 'COMPONENT_SET' && node.children.length !== n.variants) {
      res.variantMismatch.push({ label: n.label, id: n.id, expected: n.variants, actual: node.children.length }); continue;
    }
    res.ok++;
  }
  // 컴포넌트는 카테고리 페이지(Action ~ Table & List)에 나뉘어 있다 — 문서·구분선 페이지만 빼고 전부 본다
  const NON_COMPONENT = new Set(['Get Started', 'About', 'Foundations', 'Iconography', 'Icons', 'Templates', 'Updates']);
  for (const page of figma.root.children) {
    if (NON_COMPONENT.has(page.name) || /^-+$/.test(page.name)) continue;
    await page.loadAsync();
    for (const s of page.findAllWithCriteria({ types: ['COMPONENT_SET'] }))
      if (!known.has(s.id)) res.unlisted.push(s.name + ' ' + s.id + ' · ' + s.children.length);
  }
  res.inSync = !res.missing.length && !res.typeMismatch.length && !res.variantMismatch.length && !res.unlisted.length;
  return res;
})();
const links = await (async () => {
${linksJs(false)}
})();
return { variables, components, links };
`;
  fs.writeFileSync(file, script, 'utf8');
  return file;
}

// ── Figma 문서 프레임 링크 (문서 · 코드) ─────────────────────────────────
// 문서 프레임 머리말의 "문서" 는 문서 사이트의 그 페이지, "코드" 는 GitHub 의 그 부품 CSS 구간(줄 범위)으로 건다. 계획은 tokens/links.mjs (사이트와 공용).
// 줄 번호는 CSS 를 고칠 때마다 밀리므로 손으로 고치지 않는다 - node sync.mjs figma 가 어긋남을 알려 주고, node sync.mjs links 로 다시 건다.
function plan() { try { return linkPlan(DS); } catch (e) { die(e.message); } }
// apply = false 면 확인만, true 면 다른 링크를 고친다. 결과 = { ok, changed, wrong, missing, docMismatch }
function linksJs(apply) {
  const p = plan();
  const tpl = JSON.parse(read('site/src/templates.json'));
  const templates = tpl.templates.filter((t) => t.figma).map((t) => ({ slug: t.slug, ids: [t.figma.pc, t.figma.mobile] }));
  const small = { templates, extra: [tpl.figmaHeader, ...Object.values(JSON.parse(read('components.json')).figmaDocs || {})].filter(Boolean), entries: p.entries.map(({ no, ids, doc, slug, start, end }) => ({ no, ids, doc, slug, start, end })), fixed: p.fixed.filter((f) => f.frame).map(({ frame, doc, code }) => ({ frame, doc, code })), about: p.about, site: p.site, src: p.src };
  return `const PLAN = ${JSON.stringify(small)};
const APPLY = ${apply};
const res = { ok: 0, changed: [], wrong: [], missing: [], docMismatch: [] };
for (const p of figma.root.children) if (!/^-+$/.test(p.name)) await p.loadAsync();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const top = (n) => { while (n.parent && n.parent.type !== 'PAGE') n = n.parent; return n; };
const targets = [];
for (const f of PLAN.fixed) { const n = await figma.getNodeByIdAsync(f.frame); if (n) targets.push({ frame: n, doc: f.doc, code: f.code }); else res.missing.push('문서 프레임 ' + f.frame); }
const groups = new Map();
for (const e of PLAN.entries) {
  let n = null; for (const id of e.ids) if ((n = await figma.getNodeByIdAsync(id))) break;
  if (!n) { res.missing.push(e.no + ' 컴포넌트 노드'); continue; }
  const f = top(n); if (!groups.has(f.id)) groups.set(f.id, { frame: f, list: [] }); groups.get(f.id).list.push(e);
  if (e.doc !== f.id) res.docMismatch.push(e.no + ' ' + e.slug + ': components.json doc ' + (e.doc || '없음') + ' / Figma ' + f.id + ' ' + f.name);
}
for (const { frame, list } of groups.values()) {
  // 프레임 하나에 부품이 여럿이면 프레임 이름과 같은 것 → 이름으로 시작하는 것 → 번호 순 첫째를 문서 페이지로
  list.sort((a, b) => a.start - b.start);
  const s = slug(frame.name);
  const main = list.find((e) => e.slug === s) || list.find((e) => e.slug.startsWith(s + '-')) || list[0];
  const joined = list.every((e, i) => !i || e.start === list[i - 1].end + 1);
  const [a, b] = joined ? [list[0].start, list[list.length - 1].end] : [main.start, main.end];
  targets.push({ frame, doc: PLAN.site + 'components/' + main.slug + '.html', code: PLAN.src + '#L' + a + '-L' + b });
}
const linkOf = (t) => { const s = t.getStyledTextSegments(['hyperlink']).find((x) => x.hyperlink); return s ? s.hyperlink.value : null; };
const fonts = async (t) => { for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const setLink = async (t, url, label, setText) => {
  const cur = linkOf(t);
  if (cur === url && (!setText || t.characters === url)) { res.ok++; return; }
  if (!APPLY) { res.wrong.push({ at: label, now: cur, want: url }); return; }
  await fonts(t);
  if (setText) t.characters = url;
  t.hyperlink = { type: 'URL', value: url };
  res.changed.push(label);
};
for (const t of targets) {
  for (const [name, url] of [['Documentation', t.doc], ['Code', t.code]]) {
    const node = t.frame.findOne((n) => n.type === 'TEXT' && n.name === name);
    if (!node) { res.missing.push(t.frame.name + ' ' + t.frame.id + ' / ' + name); continue; }
    await setLink(node, url, t.frame.name + ' / ' + (name === 'Code' ? '코드' : '문서'), false);
  }
}
for (const a of PLAN.about) {
  let node = a.node === 'ABOUT_SITE' ? null : await figma.getNodeByIdAsync(a.node);
  if (a.node === 'ABOUT_SITE') { const box = (await figma.getNodeByIdAsync('2482:837')); const row = box && box.findChild((n) => n.name === '문서 사이트'); node = row && row.findOne((n) => n.type === 'TEXT' && n.name === 'URL'); }
  if (!node) { res.missing.push('About 링크 ' + a.url); continue; }
  await setLink(node, a.url, 'About / ' + a.url, true);
}
for (const t of PLAN.templates || []) for (const id of t.ids) if (!(await figma.getNodeByIdAsync(id))) res.missing.push('템플릿 화면 ' + t.slug + ' ' + id);
for (const id of PLAN.extra || []) if (!(await figma.getNodeByIdAsync(id))) res.missing.push('문서 프레임 ' + id);
res.inSync = !res.wrong.length && !res.missing.length && !res.docMismatch.length;
return res;`;
}
function linksScript() {
  const file = path.join(DS, 'tokens', '.figma-links.js');
  fs.writeFileSync(file, `// 자동 생성 — node sync.mjs links (${today()}) · fileKey ${JSON.parse(read('components.json')).figmaFile} · 문서 프레임의 문서 / 코드 링크를 고친다\n${linksJs(true)}\n`, 'utf8');
  return file;
}
function reportLinks(links) {
  if (!links) return;
  say(c.b('  Figma 문서 프레임 링크 (문서 · 코드)'));
  if (links.inSync) { say(c.g(`  ✔ ${links.ok}개 링크 일치`)); return; }
  for (const w of links.wrong.slice(0, 12)) say(c.y(`  ! ${w.at}  지금 ${w.now || '없음'}`));
  if (links.wrong.length > 12) say(c.y(`  ! 그 밖에 ${links.wrong.length - 12}개`));
  for (const m of links.missing) say(c.r('  ✖ 찾지 못함: ' + m));
  for (const m of links.docMismatch || []) say(c.r('  ✖ 문서 프레임 ID 다름(components.json 의 doc 을 고친다): ' + m));
  say(c.d('    → node sync.mjs links 로 만든 스크립트를 use_figma 로 실행하면 다시 걸린다'));
}


// ── Figma 문서 프레임 본문 (사이트와 같은 순서) ──────────────────────────
// 머리말 설명은 사이트 설명으로, 본문은 Best Practices(Do / Don't 표) → Examples → Master Components 순서로 맞춘다.
// 자료는 node site/build.mjs 가 쓰는 tokens/.figma-docs.json. 같은 이름의 노드를 지우고 다시 만들어서 몇 번 실행해도 결과가 같다.
function docsScript() {
  const f = path.join(DS, 'tokens', '.figma-docs.json');
  if (!fs.existsSync(f)) die('tokens/.figma-docs.json 이 없어요. 먼저 node site/build.mjs');
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  const p = plan();
  const FOUND_FRAMES = Object.fromEntries(p.fixed.filter((x) => x.frame).map((x) => [x.frame, x.slug]));
  const DATA = { comps: d.components, found: d.foundations, icons: d.icons, foundFrames: FOUND_FRAMES };
  const file = path.join(DS, 'tokens', '.figma-docs.js');
  fs.writeFileSync(file, `// 자동 생성 - node sync.mjs docs (${today()}) · fileKey ${JSON.parse(read('components.json')).figmaFile} · 문서 프레임을 사이트와 같은 순서로
const DATA = ${JSON.stringify(DATA)};
${fs.readFileSync(path.join(DS, 'tokens', 'figma-docs.template.js'), 'utf8')}`, 'utf8');
  return file;
}

// 컴포넌트 문서 프레임 한 개를 사이트 페이지와 같은 구성으로 다시 그리는 스크립트 (2026-11-05, Action Button 기준)
// 자료: tokens/.figma-docs.json (node site/build.mjs). 클래스 → Figma 컴포넌트 세트는 components.json 의 classes, figma 로 잇는다
// 안내 페이지(Get Started, Foundations): 사이트 .md 를 블록으로 나눠 넘긴다 (2026-11-05)
//   h2 → 섹션, h3 → 소제목 묶음, 문단, 굵은 한 줄(라벨), 코드(text 는 "요청 글"), 표, "- [제목](주소): 설명" 줄 → 카드
const PAGE_DOCS = { 'get-started': { md: 'site/index.md', frame: '2608:2', category: 'Get Started', docs: 'https://luvms012-rgb.github.io/yds/site/index.html', code: 'https://github.com/luvms012-rgb/yds' },
  // Updates (2026-11-06): site/src/updates.json 을 사이트 Updates 쪽과 같은 순서의 글로 바꿔 그린다. 소식을 더할 때마다 다시 그린다
  updates: { json: 'site/src/updates.json', frame: '2701:3', category: 'Updates', docs: 'https://luvms012-rgb.github.io/yds/site/updates.html', code: 'https://github.com/luvms012-rgb/yds/commits/main' } };
function updatesMd(file) {
  const j = JSON.parse(read(file));
  const d = (x) => { const [y, m, dd] = x.split('-').map(Number); return `${y}. ${m}. ${dd}`; };
  return ['# Updates', 'yds 업데이트 소식과 변경 기록입니다.', ...j.releases.flatMap((r) => [`## ${r.version ? 'v' + r.version + ' ' : ''}${d(r.date)}`, ...r.sections.flatMap((x) => [`**${x.type}**`, ...x.items.map(([a, t]) => `- [${a}] ${t}`)])])].join('\n');
}
function mdBlocks(md) {
  const inl = (s) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1').trim();
  const lines = md.replace(/^<!--[^\n]*-->\n/, '').split('\n');
  const out = []; let title = '', lead = '';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    if (/^# /.test(l)) { title = l.slice(2).trim(); continue; }
    if (/^```/.test(l)) { const lang = l.slice(3).trim() || 'text'; const buf = []; for (i++; i < lines.length && !/^```/.test(lines[i]); i++) buf.push(lines[i]); out.push({ t: 'code', lang, code: buf.join('\n') }); continue; }
    if (/^## /.test(l)) { out.push({ t: 'h2', text: inl(l.slice(3)) }); continue; }
    if (/^### /.test(l)) { out.push({ t: 'h3', text: inl(l.slice(4)) }); continue; }
    if (/^\|/.test(l)) { const rows = []; for (; i < lines.length && /^\|/.test(lines[i]); i++) if (!/^\|\s*-/.test(lines[i])) rows.push(lines[i].replace(/^\||\|$/g, '').split(' | ').map((c) => ({ text: inl(c), mono: /^\s*`[^`]+`\s*$/.test(c) }))); i--; out.push({ t: 'table', head: rows[0].map((c) => c.text), rows: rows.slice(1) }); continue; }
    const card = l.match(/^- \[([^\]]+)\]\([^)]+\):\s*(.+)$/);
    if (card) { const last = out[out.length - 1]; const item = { title: card[1], desc: inl(card[2]) }; if (last && last.t === 'cards') last.items.push(item); else out.push({ t: 'cards', items: [item] }); continue; }
    if (/^\*\*[^*]+\*\*$/.test(l.trim())) { out.push({ t: 'label', text: inl(l) }); continue; }
    if (!lead && !out.length && title) { lead = inl(l); continue; }
    out.push({ t: 'p', text: inl(l).replace(/^- /, '• ') });
  }
  return { title, lead, blocks: out };
}
// ---- docpage 가 쓰는 사이트 실제 모양 자료 다듬기 (2026-11-06)
const hostOf = (s) => (s ? Object.fromEntries(Object.entries(s).filter(([k]) => ['d', 'fd', 'gap', 'p', 'jc', 'ai'].includes(k))) : null);
function prepStyled(P, SETS) {
  const isEl = (n) => n && typeof n === 'object';
  const setOf = (el) => (el.cls || []).find((c) => SETS[c] && c !== 'ds-list-item');
  const deep = (el) => (typeof el === 'string' ? el : (el.c || []).map(deep).join(' ')).replace(/\s+/g, ' ').trim();
  const hasPart = (el) => isEl(el) && (el.c || []).some((x) => isEl(x) && ((x.cls || []).some((c) => /^ds-[a-z-]+__[a-z-]+$/.test(c)) || hasPart(x)));
  const hasSet = (el) => isEl(el) && (setOf(el) || (el.c || []).some(hasSet));
  const isIcon = (el) => isEl(el) && (el.cls || []).includes('ds-icon');
  const dataAttrs = (el) => Object.fromEntries(Object.entries(el.a || {}).filter(([k]) => k.startsWith('data-') && !/^data-ds-/.test(k)).map(([k, v]) => [k.slice(5), v]));
  const part = (el, name) => (el.c || []).find((x) => isEl(x) && (x.cls || []).some((k) => k.endsWith('__' + name)));
  const sub = (el, name) => { let r = null; const f = (n) => { if (isEl(n) && !r) { if ((n.cls || []).some((k) => k.endsWith('__' + name))) r = n; else (n.c || []).forEach(f); } }; (el.c || []).forEach(f); return r; };
  const hasNode = (n, t) => isEl(n) && (n === t || (n.c || []).some((x) => hasNode(x, t)));
  const checked = (el) => isEl(el) && ((el.a && (el.a.checked !== undefined || el.a['aria-checked'] === 'true' || el.a['aria-selected'] === 'true')) || (el.c || []).some(checked));
  // 부품 하나에 넣을 글 (tokens 쪽 FILL 이 읽는다)
  function spec(el) {
    const s = { set: SETS[setOf(el)], own: (el.c || []).filter((x) => typeof x === 'string').join(' ').replace(/\s+/g, ' ').trim(), parts: {}, kids: [], a: dataAttrs(el) };
    if (el.a && (el.a.disabled !== undefined || el.a['aria-disabled'] === 'true')) s.a.state = 'disabled';
    // 켜짐 상태: Checkbox, Radio, Switch 는 안쪽 input 의 checked 를 state 로 (2026-11-06 검수)
    if (['ds-checkbox', 'ds-radio', 'ds-switch'].includes(setOf(el))) {
      const ctl = (el.c || []).find((x) => isEl(x) && x.tag === 'input');
      if (ctl && ctl.a) {
        const off = ctl.a.disabled !== undefined;
        if (ctl.a.indeterminate !== undefined || ctl.a['data-indeterminate'] !== undefined) s.a.state = 'indeterminate';
        else if (ctl.a.checked !== undefined) s.a.state = off ? 'disabledChecked' : 'checked';
        else if (off) s.a.state = 'disabled';
      }
    }
    if (el.a && el.a['aria-pressed'] === 'true' && !s.a.state) { if (setOf(el) === 'ds-toggle') s.a.state = 'on'; if (setOf(el) === 'ds-chip') s.a.state = 'checked'; }
    // 입력 계열: 값 있음(content=value), 오류/비활성/읽기 전용(state), 앞뒤 아이콘과 글, 필수/선택/오류/글자 수 표시 (2026-11-07 검수)
    const kind = setOf(el);
    const ctlOf = (n) => { let r = null; const f = (x) => { if (r || !isEl(x)) return; if (['input', 'textarea', 'button', 'select'].includes(x.tag) && x !== el && !(x.cls || []).some((c) => /__(clear|cancel|close)$/.test(c))) r = x; else (x.c || []).forEach(f); }; (n.c || []).forEach(f); return r; };
    if (['ds-input', 'ds-textarea', 'ds-fieldbutton', 'ds-select', 'ds-quantity', 'ds-codeinput', 'ds-searchfield'].includes(kind)) {
      const ctl = kind === 'ds-textarea' || kind === 'ds-select' || kind === 'ds-fieldbutton' ? el : ctlOf(el) || el;
      const ca = ctl.a || {};
      const val = ca.value || (kind === 'ds-fieldbutton' || kind === 'ds-select' ? deep(sub(el, 'value') || { c: [] }) : '') || (kind === 'ds-textarea' ? deep(el) : '');
      if (val) { s.a.content = 'value'; if (kind === 'ds-textarea') s.parts.value = val; }
      const inv = ca['aria-invalid'] === 'true' || (el.a || {})['aria-invalid'] === 'true';
      if (inv) s.a.state = 'invalid'; else if (ca.disabled !== undefined) s.a.state = 'disabled'; else if (ca.readonly !== undefined || (el.a || {})['aria-readonly'] === 'true') s.a.state = 'readOnly';
      else if (kind === 'ds-select' && (el.a || {})['aria-expanded'] === 'true') s.a.state = 'open';
      const kids = (el.c || []).filter(isEl); const vi = kids.findIndex((x) => (x.cls || []).some((c) => /__value$/.test(c))); const ci = vi >= 0 ? vi : kids.indexOf(kids.find((x) => x === ctl || hasNode(x, ctl)));
      const icons = kids.map((x, i) => [x, i]).filter(([x]) => (x.cls || []).includes('ds-icon'));
      const pre = icons.find(([, i]) => ci < 0 || i < ci), suf = icons.find(([, i]) => ci >= 0 && i > ci);
      const nm = (x) => (x.cls.find((c) => /^ds-icon--/.test(c) && !/^ds-icon--(xs|sm|md|lg|xl)$/.test(c)) || '').slice(9);
      s.flags = { prefixicon: !!pre, suffixicon: !!suf, prefixtext: !!part(el, 'prefix'), suffixtext: !!part(el, 'suffix') };
      s.icons = {}; if (pre) s.icons.prefix = nm(pre[0]); if (suf) s.icons.suffix = nm(suf[0]);
    }
    if (kind === 'ds-field') {
      const inv = JSON.stringify(el).includes('"aria-invalid":"true"');
      s.flags = { required: !!sub(el, 'required'), indicator: !!sub(el, 'indicator'), showerror: inv && !!sub(el, 'error'), charactercount: !!sub(el, 'count'), showdescription: !!sub(el, 'help') && !inv, showlabel: !!sub(el, 'label') };
    }
    if (kind === 'ds-selectbox') { const ctl = ctlOf(el); if (ctl && ctl.a) { s.a.type = ctl.a.type === 'radio' ? 'radio' : 'check'; s.a.state = ctl.a.disabled !== undefined ? 'disabled' : ctl.a.checked !== undefined ? 'checked' : 'unchecked'; } }
    if (kind === 'ds-accordion') s.a.state = (el.a || {}).open !== undefined ? 'expanded' : s.a.state === 'disabled' ? 'disabled' : 'collapsed';
    if (kind === 'ds-helpbubble') s.flags = { closebutton: !!sub(el, 'close') };
    if (kind === 'ds-searchfield') s.flags = { ...(s.flags || {}), cancel: !!sub(el, 'cancel') };
    if (el.a && el.a.placeholder) s.parts.placeholder = el.a.placeholder;
    if (el.a && el.a.value) s.parts.value = el.a.value;
    const push = (key, v) => { if (!v) return; s.parts[key] = s.parts[key] === undefined ? v : [].concat(s.parts[key], v); };
    const walk = (n) => {
      if (!isEl(n)) return;
      if (setOf(n)) { s.kids.push(spec(n)); return; }
      const pt = (n.cls || []).map((c) => c.match(/^ds-[a-z-]+__([a-z-]+)$/)).find(Boolean);
      if (n.tag === 'input' || n.tag === 'textarea') { if (n.a.placeholder) push('placeholder', n.a.placeholder); if (n.a.value) push('value', n.a.value); }
      const leaf = pt && !hasSet(n) && !hasPart(n);
      if (leaf && deep(n)) push(pt[1], deep(n));
      else if (leaf && n.a && n.a['data-placeholder']) push('placeholder', n.a['data-placeholder']);
      else if (!pt && !(n.cls || []).some((c) => /^ds-/.test(c)) && ['h1', 'h2', 'h3', 'h4', 'p', 'ul', 'ol', 'blockquote', 'th', 'td', 'dt', 'dd', 'li'].includes(n.tag) && !hasSet(n) && deep(n)) push(n.tag, n.tag === 'ul' || n.tag === 'ol' ? (n.c || []).filter(isEl).map((li, i) => (n.tag === 'ul' ? '•  ' : i + 1 + '. ') + deep(li)).join('\n') : deep(n));
      if (!leaf) (n.c || []).forEach(walk); else (n.c || []).forEach((x) => { if (isEl(x) && setOf(x)) s.kids.push(spec(x)); });
    };
    (el.c || []).forEach(walk);
    if (s.icons && !Object.keys(s.icons).length) delete s.icons;
    if (!s.kids.length) delete s.kids; if (!Object.keys(s.parts).length) delete s.parts; if (!s.own) delete s.own; if (!Object.keys(s.a).length) delete s.a;
    return s;
  }
  const KIND = { 'ds-card': 'card', 'ds-bottomsheet': 'sheet', 'ds-dialog': 'dialog', 'ds-markdown': 'md' };
  const TEXTKEYS = ['fs', 'fw', 'c', 'lh', 'ul', 'nw'];
  const slim = (el, keepKids) => {
    const s = el.s; if (!s) return;
    if (el.a) delete el.a.style;
    if (s.d === 'b') delete s.d;
    const direct = (el.c || []).some((x) => typeof x === 'string') || isIcon(el) || ['input', 'textarea', 'svg'].includes(el.tag);
    if (!direct) for (const k of TEXTKEYS) delete s[k];
    if (!keepKids) delete s.k;
  };
  // Figma 부품 속성으로 사이트 내용을 나타낼 수 없는 부품: 사이트에서 읽은 모양 그대로 그린다(안쪽도 모두, 2026-11-07 검수)
  const SHAPE = ['ds-select-content', 'ds-menu', 'ds-sidenav', 'ds-table', 'ds-table-wrap', 'ds-tree', 'ds-wheelpicker', 'ds-timepicker', 'ds-datepicker', 'ds-pagination', 'ds-breadcrumbs', 'ds-bottomnav', 'ds-timer', 'ds-rating', 'ds-codeinput', 'ds-desclist', 'ds-search-suggest', 'ds-menusheet', 'ds-carousel', 'ds-stepper', 'ds-ptr', 'ds-scrollfog', 'ds-tablepagination', 'ds-tag-group', 'ds-callout', 'ds-appbar', 'ds-empty', 'ds-result', 'ds-topnav', 'ds-imageframe', 'ds-multiselect', 'ds-progress', 'ds-banner', 'ds-chiptabs', 'ds-tabs', 'ds-divider', 'ds-quantity', 'ds-avatar', 'ds-avatar-group', 'ds-fileattach', 'ds-fileitem', 'ds-citation', 'ds-codeblock'];
  const shapeOf = (el) => isEl(el) && (el.cls || []).some((c) => SHAPE.includes(c));
  const asShape = (el) => { if (!isEl(el)) return el; el.fb = 1; el.c = (el.c || []).map(asShape); slim(el, true); return el; };
  const prep = (el) => {
    if (!isEl(el)) return el;
    if (shapeOf(el) && el.s) return asShape(el);
    const k = setOf(el);
    if (k && KIND[k]) {
      const h = part(el, 'header');
      el.fx = { kind: KIND[k], title: h && sub(h, 'title') ? deep(sub(h, 'title')) : null, desc: h && sub(h, 'desc') ? deep(sub(h, 'desc')) : null, close: !!(h && sub(h, 'close')), handle: (el.a || {})['data-handle'] !== undefined, center: (el.a || {})['data-header-align'] === 'center' };
      el.c = el.c.map(prep); slim(el, true); return el;
    }
    if (k) {
      el.sp = spec(el);
      const ke = (el.c || []).filter(isEl);
      if (!el.sp.kids && !el.sp.parts && ke.length >= 2 && ke[0].cls[0] && ke.every((x) => x.cls[0] === ke[0].cls[0]) && !ke.some(hasSet)) el.sp.items = ke.map((x) => ({ t: deep(x), on: checked(x) }));
      const keep = (el.c || []).some(hasSet) || el.sp.items;
      if (keep) { el.c = el.c.map(prep); slim(el, true); }
      else { el.c = (el.c || []).filter((x) => typeof x === 'string' || isIcon(x)).map((x) => { if (isEl(x)) slim(x); return x; }); slim(el, false); }
      return el;
    }
    el.c = (el.c || []).map(prep); slim(el, true); return el;
  };
  if (P.cover) P.cover = P.cover.map(prep);
  for (const e of P.examples) e.tree = e.tree.map(prep);
}
function docpageScript(slug, mode) {
  const f = path.join(DS, 'tokens', '.figma-docs.json');
  if (!fs.existsSync(f)) die('tokens/.figma-docs.json 이 없어요. 먼저 node site/build.mjs');
  const d = JSON.parse(fs.readFileSync(f, 'utf8'));
  // Foundations: 사이트 foundations/<slug>.md, 프레임과 링크는 tokens/links.mjs 의 fixed 와 같다. 기존 견본 프레임은 남긴다
  const fx = plan().fixed.find((x) => x.slug === slug && x.frame);
  if (!PAGE_DOCS[slug] && fx && fs.existsSync(path.join(DS, 'site/foundations', slug + '.md'))) PAGE_DOCS[slug] = { md: `site/foundations/${slug}.md`, frame: fx.frame, category: 'Foundations', docs: fx.doc, code: fx.code, keepVisuals: true };
  if (PAGE_DOCS[slug]) {
    const pg = PAGE_DOCS[slug];
    const reg0 = JSON.parse(read('components.json'));
    const { title, lead, blocks } = mdBlocks(pg.json ? updatesMd(pg.json) : read(pg.md));
    // Figma 파일에만 있는 안내: 이 파일의 페이지 (사이트 메뉴와 같은 순서)
    const figmaPages = pg.keepVisuals || pg.json ? null : [['Get Started', 'yds 소개와 시작하는 방법'], ['Foundations', '색, 글자, 간격, 모서리, 그림자, 움직임, 기준점'], ['Iconography', 'Lucide 아이콘 라이브러리와 쓰는 법'], ['Action ~ Table & List', `컴포넌트 ${d.components.length}종. 사이트 Components 와 같은 분류 페이지`], ['Updates', 'yds 업데이트 소식. 사이트 Updates 와 같은 글']];
    // 견본을 남기는 쪽(Foundations)은 '보기' 칸이 있는 토큰 표를 빼고 Figma 견본으로 보여 준다
    // '보기' 칸이 있는 토큰 표는 Figma 에서 견본을 그려 넣는다(글자 견본, 간격 막대, 모서리 상자, 그림자 카드) - 2026-11-05 사용자 "사이트와 섹션 순서 같게"
    let blocks2 = blocks;
    blocks2 = blocks2.filter((b, i) => !(b.t === 'h2' && (!blocks2[i + 1] || blocks2[i + 1].t === 'h2')));  // 표를 빼서 비게 된 절 제목도 뺀다
    const DATA = { mode: 'page', frame: pg.frame, category: pg.category, title, lead, blocks: blocks2, figmaPages, keepVisuals: !!pg.keepVisuals, sets: {}, defaults: {}, links: { docs: pg.docs, code: pg.code } };
    const file = path.join(DS, 'tokens', '.figma-docpage.js');
    fs.writeFileSync(file, `// 자동 생성 - node sync.mjs docpage ${slug} (${today()}) · fileKey ${reg0.figmaFile} · 문서 프레임 ${pg.frame}
const DATA = ${JSON.stringify(DATA)};
${fs.readFileSync(path.join(DS, 'tokens', 'figma-docpage.template.js'), 'utf8')}`, 'utf8');
    return file;
  }
  const comp = d.components.find((x) => x.slug === slug || x.no === slug);
  if (!comp) die(`컴포넌트가 없어요: ${slug}`);
  if (!comp.doc) die(`${comp.name} 에 Figma 문서 프레임(doc)이 없어요 (components.json)`);
  const reg = JSON.parse(read('components.json'));
  const list = Array.isArray(reg) ? reg : reg.components;
  const sets = {}, defaults = {};
  const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
  for (const x of list) {
    const page = (d.components.find((y) => y.no === x.no) || {}).page || {};
    for (const fg of (x.figma || []).filter((g) => g.type === 'COMPONENT_SET' || g.type === 'COMPONENT')) {
      const cls = (fg.part ? x.classes.find((k) => norm(k).endsWith(norm(fg.part))) : x.classes[0]) || null;
      if (!cls) continue;
      const k = cls.replace(/^\./, '');
      if (!sets[k]) { sets[k] = fg.id; defaults[k] = page.defaults || {}; }
    }
  }
  // 사이트 실제 모양 (node tokens/figma-styles.mjs → tokens/.figma-styles.json, 2026-11-06): 있으면 대표 그림과 예시 나무를
  // 브라우저에서 읽은 것(요소마다 배경, 테두리, 여백, 글자 크기)으로 바꾸고, 부품 인스턴스에 넣을 글(sp)과 본문 칸(fx)을 붙인다
  const sf = path.join(DS, 'tokens', '.figma-styles.json');
  const SJ = fs.existsSync(sf) ? JSON.parse(fs.readFileSync(sf, 'utf8'))[comp.slug] : null;
  if (SJ && SJ.examples && SJ.examples.length === comp.page.examples.length) {
    if (SJ.cover) { comp.page.cover = SJ.cover.c; comp.page.coverHost = hostOf(SJ.cover.s); }
    comp.page.examples.forEach((e, i) => { e.tree = SJ.examples[i].c; e.host = hostOf(SJ.examples[i].s); });
    prepStyled(comp.page, sets);
  }
  const me = list.find((x) => x.no === comp.no);
  const mainSets = (me.figma || []).map((g) => g.id);
  const mainClass = Object.keys(sets).find((k) => mainSets.includes(sets[k])) || null;
  // 이 페이지 예시와 대표 그림에 나오는 클래스만 넘긴다 (스크립트 크기를 줄인다)
  const used = new Set([mainClass]);
  const walk = (n) => { if (n && typeof n === 'object') { (n.cls || []).forEach((k) => used.add(k)); (n.c || []).forEach(walk); } };
  [...(comp.page.cover || []), ...comp.page.examples.flatMap((e) => e.tree)].forEach(walk);
  for (const k of Object.keys(sets)) if (!used.has(k)) { delete sets[k]; delete defaults[k]; }
  const link = plan().entries.find((e) => e.no === comp.no) || {};
  const DATA = { frame: comp.doc, comp, sets, defaults, mainSets, mainClass, links: { docs: link.site || null, code: link.code || null } };
  // 미리보기만 (node sync.mjs docpage <slug> preview): 대표 그림과 예시 칸만 다시 그린다. 한 프레임에 여럿이면 앞 컴포넌트의 그림, 예시 절 수만큼 건너뛴다
  if (mode === 'preview') {
    const same = list.filter((x) => x.doc === comp.doc); const before = same.slice(0, Math.max(same.findIndex((x) => x.no === comp.no), 0)).map((x) => d.components.find((y) => y.no === x.no) || { page: {} });
    DATA.mode = 'preview'; DATA.covIdx = before.filter((x) => x.page.cover).length; DATA.secIdx = before.filter((x) => (x.page.examples || []).length).length;
    const P = comp.page; DATA.comp = { no: comp.no, name: comp.name, slug: comp.slug, page: { cover: P.cover, coverHost: P.coverHost, examples: P.examples.map((e) => ({ tree: e.tree, host: e.host })) } };
    delete DATA.links;
  }
  const file = path.join(DS, 'tokens', '.figma-docpage.js');
  fs.writeFileSync(file, `// 자동 생성 - node sync.mjs docpage ${comp.slug} (${today()}) · fileKey ${reg.figmaFile} · 문서 프레임 ${comp.doc}
const DATA = ${JSON.stringify(DATA)};
${fs.readFileSync(path.join(DS, 'tokens', 'figma-docpage.template.js'), 'utf8')}`, 'utf8');
  return file;
}

function reportComponents(comp) {
  if (!comp) return;
  say(c.b('  Figma 컴포넌트 ↔ components.json'));
  if (comp.inSync) { say(c.g(`  ✔ ${comp.ok}개 노드 일치`)); return; }
  for (const m of comp.missing) say(c.r('  ✖ Figma 에 없음: ' + m));
  for (const m of comp.typeMismatch) say(c.r('  ✖ 타입 다름: ' + m));
  for (const m of comp.variantMismatch) say(c.y(`  ! 변형 수 다름: ${m.label} ${m.id} — 목록 ${m.expected} / Figma ${m.actual}`));
  for (const m of comp.unlisted) say(c.y('  ! components.json 에 없는 Figma 세트: ' + m));
  say(c.d('    → components.json 과 README §6.1 을 고치거나, Figma 쪽을 맞춘 뒤 다시 확인'));
}

// ── 빌드 · 배포 ──────────────────────────────────────────────────────────
function writeBuild(date = today()) {
  for (const [p, text] of Object.entries(build(date))) {
    fs.mkdirSync(path.dirname(path.join(DS, p)), { recursive: true });
    fs.writeFileSync(path.join(DS, p), text, 'utf8');
    say(c.d(`  생성 ${p} (${Buffer.byteLength(text)} bytes)`));
  }
}

// 단발 HTTPS 상태 조회 (연결 유지 없음 — Windows 에서 fetch 후 종료할 때 나는 오류를 피한다)
function httpStatus(url, method = 'HEAD') {
  return new Promise((resolve) => {
    const req = https.request(url, { method, agent: false, timeout: 15000, headers: { 'user-agent': 'yds-sync' } }, (res) => { res.resume(); resolve(res.statusCode); });
    req.on('timeout', () => { req.destroy(); resolve(0); });
    req.on('error', () => resolve(0));
    req.end();
  });
}
async function siteUp() { return (await httpStatus(CFG.pagesUrl + 'dist/ybm-ds.css')) === 200; }

// ── 전체 검사, 새 버전 ──────────────────────────────────────────────────────
function runCheck(extra = []) {
  say(c.b('  전체 검사 (tools/check.mjs)'));
  const r = spawnSync(process.execPath, [path.join(DS, 'tools/check.mjs'), ...extra], { cwd: DS, stdio: 'inherit' });
  return r.status === 0;
}
async function release(ver, message) {
  if (!/^\d+\.\d+\.\d+$/.test(ver || '')) die('버전을 x.y.z 로 주세요. 예) node sync.mjs release 1.1.0');
  const cur = read('VERSION').trim();
  const n = (v) => v.split('.').map(Number);
  const [a, b] = [n(ver), n(cur)];
  if (!(a[0] > b[0] || (a[0] === b[0] && (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2]))))) die(`지금 버전 ${cur} 보다 커야 해요.`);
  if (git(['tag', '-l', 'v' + ver]).out) die(`태그 v${ver} 가 이미 있어요.`);
  // Updates 맨 위 소식이 이번 버전이다. 이미 버전이 붙어 있으면 이번 소식을 먼저 적어야 한다
  const up = JSON.parse(read('site/src/updates.json'));
  const top = up.releases[0];
  if (!top || top.version) die('site/src/updates.json 맨 위에 이번 버전 소식(날짜와 항목)을 먼저 적어 주세요.');
  top.version = ver;
  fs.writeFileSync(path.join(DS, 'site/src/updates.json'), JSON.stringify(up, null, 2).replace(/\[\n\s+"(DS|템플릿|사이트)",\n\s+("[^"]*")\n\s+\]/g, '["$1", $2]') + '\n');
  fs.writeFileSync(path.join(DS, 'VERSION'), ver + '\n');
  const cssF = path.join(DS, 'dist/ybm-ds.css');
  fs.writeFileSync(cssF, fs.readFileSync(cssF, 'utf8').replace(/yds v\d+\.\d+\.\d+/, 'yds v' + ver));
  const jsF = path.join(DS, 'dist/ybm-ds.js');
  fs.writeFileSync(jsF, fs.readFileSync(jsF, 'utf8').replace(/version: "\d+\.\d+\.\d+"/, `version: "${ver}"`));
  say(c.g(`  ✔ 버전 ${cur} → ${ver} (VERSION, dist/ybm-ds.css, dist/ybm-ds.js, Updates)`));
  const b2 = spawnSync(process.execPath, [path.join(DS, 'site/build.mjs')], { cwd: DS, stdio: 'inherit' });
  if (b2.status !== 0) die('사이트 만들기 실패');
  await deploy(message || `yds v${ver}`);
  git(['tag', '-a', 'v' + ver, '-m', `yds v${ver}`]);
  if (!flags.has('--no-push')) {
    const env = { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' };
    const p = git(['push', '-q', 'origin', 'v' + ver], { allowFail: true, env, timeout: 60000 });
    if (!p.ok) die('태그 올리기 실패 — ' + p.err);
  }
  say(c.g(`  ✔ 태그 v${ver}`));
  say(c.d(`    버전 고정 주소 https://cdn.jsdelivr.net/gh/luvms012-rgb/yds@v${ver}/dist/ybm-ds.css`));
}

async function deploy(message) {
  const { errors } = verify();
  if (errors.length) die('검증 실패 — 위 항목을 고친 뒤 다시 실행하세요.');
  if (!flags.has('--no-check') && !runCheck()) die('전체 검사 실패 — 위 항목을 고친 뒤 다시 실행하세요. (급하면 --no-check)');
  ensureRepo();
  git(['add', '-A']);
  const dirty = !git(['diff', '--cached', '--quiet'], { allowFail: true }).ok;
  const hasHead = git(['rev-parse', '--verify', 'HEAD'], { allowFail: true }).ok;
  if (dirty) {
    const files = git(['diff', '--cached', '--name-only']).out.split('\n').filter(Boolean);
    const msg = message || `sync: ${files.length}개 파일 (${new Date().toISOString().slice(0, 16).replace('T', ' ')})`;
    git([...identityArgs(), 'commit', '-q', '-m', msg]);
    say(c.g(`  ✔ 커밋 — ${msg}`));
  } else say(c.d('  바뀐 파일 없음'));
  if (flags.has('--no-push')) return;

  const ahead = !hasHead || dirty || git(['status', '-sb'], { allowFail: true }).out.includes('ahead')
    || !git(['rev-parse', '--verify', `origin/${CFG.branch}`], { allowFail: true }).ok;
  if (ahead) {
    say('  GitHub 에 올리는 중...');
    // 사람이 보는 창(동기화.bat)이면 GitHub 로그인 창을 허용하고, 자동 실행이면 창 없이 바로 실패시킨다
    const interactive = process.stdout.isTTY && !process.env.CI;
    const env = interactive ? process.env : { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' };
    // 저장소가 없으면 push 가 로그인 단계에서 멈추므로 먼저 확인한다 (조회는 로그인 없이 바로 답한다)
    const slug = (CFG.repoUrl.match(/github\.com[:/](.+?)(?:\.git)?$/) || [])[1];
    let missing = false;
    missing = (await httpStatus(`https://api.github.com/repos/${slug}`, 'GET')) === 404;
    if (missing) die(`GitHub 저장소가 아직 없어요.\n    https://github.com/new 에서 이름 "${CFG.repoUrl.split('/').pop()}" · Public · README 없이 만든 뒤 다시 실행하세요.\n    그다음 저장소 Settings → Pages → Branch "${CFG.branch}" / root → Save`);
    const p = git(['push', '-q', '-u', 'origin', CFG.branch], { allowFail: true, env, timeout: interactive ? 0 : 60000 });
    if (p.err === 'timeout') die('push 가 1분 안에 끝나지 않았어요 — 저장소가 있는지, GitHub 로그인이 돼 있는지 확인한 뒤 동기화.bat 으로 다시 올려 주세요.');
    if (!p.ok) {
      if (/not found|does not exist/i.test(p.err)) die(`GitHub 저장소가 아직 없어요.\n    https://github.com/new 에서 이름 "${CFG.repoUrl.split('/').pop()}" · Public · README 없이 만든 뒤 다시 실행하세요.\n    그다음 저장소 Settings → Pages → Branch "${CFG.branch}" / root → Save`);
      die('push 실패 — ' + p.err);
    }
    say(c.g('  ✔ GitHub 반영'));
  }
  say(c.d(`    저장소 ${CFG.repoUrl}`));
  say(c.d(`    사이트 ${CFG.pagesUrl}  (1~2분 뒤 반영)`));

  if (!flags.has('--ds-only') && fs.existsSync(GUIDE_PUBLISH) && process.platform === 'win32') {
    say(c.b('  가이드 사이트 재배포'));
    const r = spawnSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', GUIDE_PUBLISH, '-Auto'], { stdio: 'inherit' });
    if (r.status !== 0) say(c.y('  ! 가이드 배포가 실패했어요 — project/_publish/배포하기.bat 로 다시 시도'));
  }
}

// ── 명령 ─────────────────────────────────────────────────────────────────
say();
say(c.b(`  yds 동기화 · ${cmd}`));
say('  ------------------------------------------------');

if (cmd === 'status') {
  verify();
  say(c.b('  git'));
  if (!isRepo()) say(c.y('  ! 아직 git 저장소가 아니에요 → node sync.mjs deploy 로 시작'));
  else {
    const st = git(['status', '--porcelain'], { allowFail: true }).out;
    say(st ? c.y(`  ! 커밋 안 된 변경 ${st.split('\n').length}개`) : c.g('  ✔ 커밋할 변경 없음'));
    const last = git(['log', '-1', '--format=%h %s (%cr)'], { allowFail: true }).out;
    if (last) say(c.d('    마지막 커밋 ' + last));
  }
  const snap = JSON.parse(read('tokens/figma-variables.json')).$meta.dumped;
  say(c.b('  Figma'));
  say(c.d(`    변수 스냅샷 ${snap} — 최신인지는 Claude 에게 "ds 동기화" 요청 (node sync.mjs figma)`));
  say(c.b('  배포'));
  say((await siteUp()) ? c.g(`  ✔ ${CFG.pagesUrl}`) : c.y(`  ! 사이트 응답 없음 ${CFG.pagesUrl}`));
} else if (cmd === 'figma') {
  const f = figmaScript();
  say(c.g(`  ✔ ${rel(f)} 생성 (${(fs.statSync(f).size / 1024).toFixed(1)}KB)`));
  say('    다음: 이 파일 내용을 use_figma(fileKey 1VCEsFU3xMWuXIntIrZz9i)로 실행 →');
  say(`          결과 JSON 을 ${rel(RESULT_DEFAULT)} 에 저장 → node sync.mjs pull`);
} else if (cmd === 'links') {
  const f = linksScript();
  say(c.g(`  ✔ ${rel(f)} 생성 (${(fs.statSync(f).size / 1024).toFixed(1)}KB)`));
  say('    다음: 이 파일 내용을 use_figma(fileKey 1VCEsFU3xMWuXIntIrZz9i)로 실행 → 결과의 changed 가 고친 링크');
} else if (cmd === 'docs') {
  const f = docsScript();
  say(c.g(`  ✔ ${rel(f)} 생성 (${(fs.statSync(f).size / 1024).toFixed(1)}KB)`));
  say('    다음: 이 파일 내용을 use_figma(fileKey 1VCEsFU3xMWuXIntIrZz9i)로 실행');
} else if (cmd === 'docpage') {
  if (!arg) die('컴포넌트 이름을 넣어 주세요: node sync.mjs docpage action-button');
  const f = docpageScript(arg, process.argv[4]);
  say(c.g(`  ✔ ${rel(f)} 생성 (${(fs.statSync(f).size / 1024).toFixed(1)}KB)`));
  say('    다음: 이 파일 내용을 use_figma(fileKey 1VCEsFU3xMWuXIntIrZz9i)로 실행');
} else if (cmd === 'pull') {
  const file = path.resolve(arg || RESULT_DEFAULT);
  if (!fs.existsSync(file)) die(`결과 파일이 없어요: ${file}\n    먼저 node sync.mjs figma → use_figma 실행 → 결과 저장`);
  const result = JSON.parse(fs.readFileSync(file, 'utf8'));
  const variables = result.variables || result;
  say(c.b('  Figma 변수 → 스냅샷'));
  if (variables.inSync) say(c.g('  ✔ 변수 변경 없음'));
  else {
    const tmp = path.join(DS, 'tokens', '.figma-variables-result.json');
    fs.writeFileSync(tmp, JSON.stringify(variables));
    execFileSync(process.execPath, [path.join(DS, 'tokens', 'figma-sync.mjs'), 'apply', tmp], { cwd: DS, stdio: 'inherit' });
    fs.rmSync(tmp);
    writeBuild();
  }
  reportComponents(result.components);
  reportLinks(result.links);
  await deploy(variables.inSync ? undefined : `tokens: Figma 변수 동기화 (${today()})`);
} else if (cmd === 'build') {
  writeBuild();
} else if (cmd === 'verify') {
  if (verify().errors.length) process.exit(1);
} else if (cmd === 'deploy') {
  await deploy(arg);
} else if (cmd === 'check') {
  if (!runCheck([...flags].filter((x) => x === '--regen' || x === '--live' || x === '--all'))) process.exit(1);
} else if (cmd === 'release') {
  await release(arg, args.filter((a) => !a.startsWith('--'))[2]);
} else {
  die(`모르는 명령: ${cmd}  (status / figma / pull / build / verify / deploy / check / release)`);
}
say();

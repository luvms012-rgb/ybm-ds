#!/usr/bin/env node
// YBM DS — 통합 동기화: Figma ↔ 로컬(ds/) ↔ GitHub(저장소 + Pages) ↔ 가이드 사이트
//
//   node sync.mjs                  상태 보기 (검증 + git + 배포 주소)
//   node sync.mjs figma            Figma 점검 스크립트 생성 → tokens/.figma-check.js
//                                  (Claude 가 use_figma 로 실행하고 결과를 tokens/.figma-result.json 에 저장)
//   node sync.mjs links           Figma 문서 프레임의 문서 / 코드 링크를 고치는 스크립트 생성 → tokens/.figma-links.js
//   node sync.mjs docs            Figma 문서 프레임 본문을 사이트와 같은 순서로 채우는 스크립트 생성 → tokens/.figma-docs.js
//   node sync.mjs pull [결과.json]  Figma 결과 반영 → 토큰 빌드 → 검증 → GitHub 배포 → 가이드 재배포
//   node sync.mjs build            토큰만 다시 빌드 (오늘 날짜)
//   node sync.mjs verify           검증만
//   node sync.mjs deploy ["메시지"]  검증 → commit → push → 가이드 재배포
//
//   옵션  --no-push   커밋까지만      --ds-only   가이드 재배포 생략
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
  const NON_COMPONENT = new Set(['Get Started', 'About', 'Foundations', 'Iconography', 'Icons', 'Templates']);
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
    const req = https.request(url, { method, agent: false, timeout: 15000, headers: { 'user-agent': 'ybm-ds-sync' } }, (res) => { res.resume(); resolve(res.statusCode); });
    req.on('timeout', () => { req.destroy(); resolve(0); });
    req.on('error', () => resolve(0));
    req.end();
  });
}
async function siteUp() { return (await httpStatus(CFG.pagesUrl + 'dist/ybm-ds.css')) === 200; }

async function deploy(message) {
  const { errors } = verify();
  if (errors.length) die('검증 실패 — 위 항목을 고친 뒤 다시 실행하세요.');
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
say(c.b(`  YBM DS 동기화 · ${cmd}`));
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
} else {
  die(`모르는 명령: ${cmd}  (status · figma · pull · build · verify · deploy)`);
}
say();

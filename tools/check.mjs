#!/usr/bin/env node
// yds 전체 검사 - DS, 사이트, 템플릿, 마크다운이 서로 맞는지 한 번에 본다 (2026-11-04, 세션 임시 검사 6가지를 저장소로 옮김)
//   node tools/check.mjs            빠른 검사 (만들어진 파일 기준)
//   node tools/check.mjs --regen    템플릿, 사이트, 토큰을 다시 만들어 바뀌는 파일이 없는지도 본다 (GitHub 자동 검사가 쓴다)
//   node tools/check.mjs --live     라이브(GitHub Pages) 파일이 로컬과 같은지도 본다 (배포 1 ~ 2분 뒤)
//   node sync.mjs check [--regen] [--live] 도 같다. 오류가 있으면 종료 코드 1, 주의만 있으면 0.
// 검사 항목
//   1 링크      사이트 html 안 상대 주소가 모두 있는 파일인지
//   2 사이트    사이트 쪽 안 클래스, 아이콘, 토큰이 DS 에 있는지, 화면 글에 줄표/가운뎃점이 없는지, site.css 에 토큰 밖 값이 없는지
//   3 템플릿    템플릿 67종과 컴포넌트 예시를 site/ai/yds-check.mjs 로 검사 (서비스 화면과 같은 규칙)
//   4 마크다운  .md 위치, 머리 주소, 화면 코드와 예시 코드가 글자 그대로 있는지, .md 링크, llms 주소
//   5 싱크      components.json, components.css 머리 주석, README, index.html, 사이트 페이지, 템플릿 목록, 진입 파일, 이름
//   6 새 컴포넌트  컴포넌트마다 넣어야 하는 9곳이 다 있는지 (README "새 컴포넌트 넣기")
//   7 빌드 경고  site/build.mjs 의 "!" 경고 (부품 설명, 한글 찾기 낱말, 아이콘 쓰임 등)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(R, 'site');
const PUBLIC = 'https://luvms012-rgb.github.io/yds/';
const SITE_URL = PUBLIC + 'site/';
const flags = new Set(process.argv.slice(2));
const read = (p) => fs.readFileSync(path.join(R, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));
const node = (args, opts = {}) => spawnSync(process.execPath, args, { cwd: R, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });
const results = [];
const check = (name, fn) => {
  const errors = [], warns = [];
  try { fn({ err: (m) => errors.push(m), warn: (m) => warns.push(m) }); } catch (e) { errors.push('검사 스크립트 오류: ' + e.message); }
  results.push({ name, errors, warns });
};
const walk = (d, skip = []) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? (skip.includes(e.name) ? [] : walk(path.join(d, e.name), skip)) : [path.join(d, e.name)]);
const rel = (f) => path.relative(R, f).replace(/\\/g, '/');
const slugOf = (name) => name.toLowerCase().replace(/ · /g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const norm = (s) => s.replace(/\s+/g, ' ').trim();
// start 로 시작하는 div 를 짝이 맞는 </div> 까지 통째로 지운다 (안에 div 가 겹쳐 있어도)
const stripDivs = (html, start) => {
  let out = '', last = 0, m;
  start.lastIndex = 0;
  while ((m = start.exec(html))) {
    if (m.index < last) continue;
    const tag = /<\/?div\b[^>]*>/g; tag.lastIndex = m.index; let depth = 0, end = html.length, t;
    while ((t = tag.exec(html))) { depth += t[0][1] === '/' ? -1 : 1; if (depth === 0) { end = tag.lastIndex; break; } }
    out += html.slice(last, m.index); last = end; start.lastIndex = end;
  }
  return out + html.slice(last);
};
const dec = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

// 0. 다시 만들기 (--regen): 만든 결과가 저장소와 같아야 한다
if (flags.has('--regen')) {
  check('0 다시 만들기', ({ err }) => {
    // 다시 만들기 전후로 생성물 폴더의 내용을 비교한다 (고치는 중이라 커밋 안 된 파일이 있어도 된다)
    // 저장소가 다루는 파일만 본다(.gitignore 에 든 로컬 전용 파일 tokens/.figma-* 등은 뺀다)
    const tracked = () => spawnSync('git', ['ls-files', '-co', '--exclude-standard', 'dist', 'tokens', 'site'], { cwd: R, encoding: 'utf8' }).stdout.split('\n').filter((f) => f && !/\.(LDH|png|jpe?g|webp|woff2?)$/.test(f));
    const snap = () => Object.fromEntries(tracked().filter((f) => fs.existsSync(path.join(R, f))).map((f) => [f, crypto.createHash('sha1').update(fs.readFileSync(path.join(R, f))).digest('hex')]));
    const before = snap();
    const date = (read('tokens/tokens.js').match(/생성: (\d{4}-\d{2}-\d{2})/) || [])[1];
    for (const [label, args] of [['토큰', ['tokens/build.mjs', ...(date ? [date] : [])]], ['템플릿', ['site/templates/gen/run.mjs']], ['사이트', ['site/build.mjs']]]) {
      const r = node(args);
      if (r.status !== 0) err(`${label} 만들기 실패: ${(r.stderr || r.stdout).trim().split('\n').slice(-3).join(' / ')}`);
    }
    const after = snap();
    const changed = [...new Set([...Object.keys(before), ...Object.keys(after)])].filter((k) => before[k] !== after[k]);
    if (changed.length) err(`다시 만들면 바뀌는 파일 ${changed.length}개: ${changed.slice(0, 6).join(', ')} (원본을 고친 뒤 만들기를 안 돌렸거나 생성물을 손으로 고쳤다)`);
  });
}

const DIST = ['dist/tokens.css', 'dist/base.css', 'dist/icons.css', 'dist/components.css', 'dist/utilities.css'].map(read).join('\n');
const CLASS_OK = new Set([...DIST.matchAll(/\.((?:ds|u)-[a-z0-9_-]+)/g)].map((m) => m[1]).concat([...DIST.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/))));
const ICONS = new Set([...read('dist/icons.css').matchAll(/\.ds-icon--([a-z0-9-]+)\s*\{/g)].map((m) => m[1]));
const TOKENS = new Set([...(DIST + read('dist/ybm-ds.js') + read('site/src/site.css')).matchAll(/(--ds-[a-z0-9_-]*[a-z0-9])/g)].map((m) => m[1]));
const sitePages = walk(SITE, ['src', 'gen', 'pages', 'themes']).filter((f) => f.endsWith('.html'));
const live = (h) => !/http-equiv="refresh"/.test(h);

// 1. 링크
check('1 링크', ({ err }) => {
  let n = 0;
  for (const f of walk(SITE, ['src', 'gen']).filter((x) => x.endsWith('.html'))) {
    const h = fs.readFileSync(f, 'utf8');
    for (const m of h.matchAll(/(?:href|src)="([^"#?]*)(?:[?#][^"]*)?"/g)) {
      const u = m[1]; if (!u.trim() || /^(https?:|mailto:|data:|javascript:|\/\/)/.test(u) || u.includes('${')) continue; n++;
      if (!fs.existsSync(path.normalize(path.join(path.dirname(f), u)))) err(`깨진 링크 ${u} <- ${rel(f)}`);
    }
  }
  if (!n) err('링크를 하나도 못 찾았다 (사이트를 만들었는지 확인)');
});

// 2. 사이트 쪽 규칙
check('2 사이트', ({ err }) => {
  for (const f of sitePages) {
    const h = fs.readFileSync(f, 'utf8'); if (!live(h)) continue;
    const body = h.replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
    for (const m of body.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) {
      if (c.startsWith('ds-icon--')) { const n = c.slice(9); if (!['sm', 'lg'].includes(n) && !ICONS.has(n)) err(`없는 아이콘 ${c} <- ${rel(f)}`); continue; }
      if (/^(ds|u)-/.test(c) && !CLASS_OK.has(c)) err(`없는 클래스 ${c} <- ${rel(f)}`);
    }
    for (const m of body.matchAll(/var\((--ds-[a-z0-9_-]+)\s*[,)]/g)) if (!TOKENS.has(m[1])) err(`없는 토큰 ${m[1]} <- ${rel(f)}`);
    const text = body.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n');
    for (const m of text.matchAll(/[^\n]{0,12}[—–·][^\n]{0,12}/g)) err(`줄표/가운뎃점 "${m[0].trim()}" <- ${rel(f)}`);
  }
  read('site/src/site.css').split('\n').forEach((l, i) => {
    const code = l.replace(/\/\*.*?\*\//g, '');
    if (/#[0-9a-fA-F]{3,8}\b|\brgba?\(/.test(code)) err(`site.css ${i + 1}행 색 값을 직접 씀`);
    if (/font-size:\s*\d+px/.test(code)) err(`site.css ${i + 1}행 px 글자 크기`);
    if (/font-weight:\s*\d{3}/.test(code)) err(`site.css ${i + 1}행 숫자 굵기`);
  });
});

// 3. 템플릿과 예시: 서비스 화면 검사 스크립트로
check('3 템플릿, 예시', ({ err, warn }) => {
  const tool = path.join(SITE, 'ai/yds-check.mjs');
  if (!fs.existsSync(tool)) return err('site/ai/yds-check.mjs 가 없다 (node site/build.mjs)');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'yds-ex-'));
  const EX = Object.assign({}, ...fs.readdirSync(path.join(SITE, 'src/examples')).filter((f) => f.endsWith('.json')).map((f) => readJson('site/src/examples/' + f)));
  for (const [k, list] of Object.entries(EX)) list.forEach((e, i) => fs.writeFileSync(path.join(tmp, `${k}-${i + 1}.html`), e.html));
  for (const [label, target] of [['템플릿', path.join(SITE, 'templates/pages')], ['예시', tmp]]) {
    const r = node([tool, target, '--json']);
    let out; try { out = JSON.parse(r.stdout); } catch { err(`${label} 검사 실행 실패`); continue; }
    for (const p of out.problems) {
      const where = `${label === '예시' ? path.basename(p.file, '.html') : rel(p.file)}:${p.line}`;
      if (p.level === '오류') err(`${label} ${where} [${p.kind}] ${p.msg}`);
    }
    const w = out.problems.filter((p) => p.level === '주의').length;
    if (w) warn(`${label} 주의 ${w}개 (DS 부품 겉모습을 직접 덮은 곳, 템플릿 배치용이면 그대로 둔다)`);
  }
  fs.rmSync(tmp, { recursive: true, force: true });
});

// 4. 마크다운
check('4 마크다운', ({ err }) => {
  const mds = walk(SITE, ['src', 'gen', 'pages']).filter((f) => f.endsWith('.md') && !/(CLAUDE|PLAN|PROPOSAL|REFERENCE-ANALYSIS)\.md$/.test(f));
  const EX = Object.assign({}, ...fs.readdirSync(path.join(SITE, 'src/examples')).filter((f) => f.endsWith('.json')).map((f) => readJson('site/src/examples/' + f)));
  const dedent = (s) => { const ls = s.split('\n'); const ind = Math.min(...ls.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length)); return ls.map((l) => l.slice(ind)).join('\n'); };
  for (const f of sitePages) {
    const h = fs.readFileSync(f, 'utf8');
    if (!/data-site-md-toggle/.test(h)) continue;
    const mdf = f.replace(/\.html$/, '.md');
    if (!fs.existsSync(mdf)) { err(`.md 없음 <- ${rel(f)}`); continue; }
    const md = fs.readFileSync(mdf, 'utf8');
    const url = SITE_URL + path.relative(SITE, f).replace(/\\/g, '/');
    if (md.split('\n')[0] !== `<!-- ${url} -->`) err(`머리 주소가 다름 ${rel(mdf)}`);
    // 미리보기 안(예시 화면, 목록 카드, 대표 그림, 구조 그림)의 코드는 화면 속 내용이라 뺀다
    const art = stripDivs(h.slice(h.indexOf('<article class="site-doc"'), h.lastIndexOf('</article>')), /<div class="(?:site-example__preview|site-tile__thumb|site-cover)[^"]*"/g);
    const mdCode = [...md.matchAll(/```[a-z]*\n([\s\S]*?)```/g)].map((m) => norm(m[1]));
    for (const m of art.matchAll(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g)) {
      const c = norm(dec(m[1])); if (c && !mdCode.some((x) => x.includes(c))) err(`화면 코드가 .md 에 없음 ${rel(mdf)}: ${c.slice(0, 50)}`);
    }
    for (const m of md.matchAll(/\]\(([^)\s]+)\)/g)) {
      const u = m[1].split('#')[0]; if (!u || !u.startsWith(PUBLIC)) continue;
      if (!fs.existsSync(path.join(R, u.slice(PUBLIC.length)))) err(`깨진 링크 ${u} <- ${rel(mdf)}`);
    }
  }
  for (const [slug, list] of Object.entries(EX)) {
    const mdf = path.join(SITE, 'components', slug + '.md');
    const md = fs.existsSync(mdf) ? norm(fs.readFileSync(mdf, 'utf8')) : '';
    for (const e of list) if (!md.includes(norm(dedent(e.html)))) err(`예시 코드가 .md 에 없음 ${slug}: ${e.title}`);
  }
  for (const f of ['site/llms.txt', 'site/llms-full.txt']) for (const m of read(f).matchAll(/https:\/\/luvms012-rgb\.github\.io\/ybm-ds\/([^\s)"'<>`]+)/g)) {
    const u = m[1].split('#')[0].replace(/[.,]$/, ''); if (!fs.existsSync(path.join(R, u))) err(`${f} 깨진 주소 ${u}`);
  }
  const reg = readJson('components.json').components.length;
  const listed = (read('site/components/index.md').match(/^- \[/gm) || []).length;
  if (listed !== reg) err(`components/index.md 목록 ${listed}개, 컴포넌트 ${reg}개`);
  if (mds.length < 10) err(`.md 가 ${mds.length}쪽뿐 (사이트를 만들었는지 확인)`);
});

// 5. 싱크
const reg = readJson('components.json').components;
const css = read('dist/components.css');
check('5 싱크', ({ err }) => {
  const heads = [...css.matchAll(/\/\* -{20,}\n {3}(\d\d) /g)].map((m) => m[1]);
  for (const c of reg) if (!heads.includes(c.no)) err(`components.css 머리 주석에 ${c.no} ${c.name} 이 없음`);
  for (const n of heads) if (!reg.some((c) => c.no === n)) err(`components.json 에 ${n} 이 없음`);
  for (const c of reg) for (const k of c.classes || []) if (!new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s{,\\[:.>)]').test(css)) err(`${c.no} 클래스 ${k} 가 CSS 에 없음`);
  const tj = readJson('site/src/templates.json').templates;
  const tpages = fs.readdirSync(path.join(SITE, 'templates/pages')).filter((f) => f.endsWith('.html')).map((f) => f.slice(0, -5));
  for (const t of tj) { if (!tpages.includes(t.slug)) err(`템플릿 페이지 없음 ${t.slug}`); if (!fs.existsSync(path.join(SITE, 'templates', t.slug + '.html'))) err(`템플릿 상세 없음 ${t.slug}`); }
  for (const s of tpages) if (!tj.some((t) => t.slug === s)) err(`templates.json 에 없는 템플릿 파일 ${s}`);
  const entry = read('dist/ybm-ds.css');
  for (const p of ['tokens.css', 'base.css', 'icons.css', 'components.css', 'utilities.css']) if (!entry.includes(p)) err(`ybm-ds.css 가 ${p} 를 불러오지 않음`);
  for (const f of ['README.md', 'site/llms.txt', 'dist/components.css', 'dist/ybm-ds.css', 'dist/ybm-ds.js', 'site/index.html', 'site/ai/AGENTS.md']) if (/YBM DS|YBM Design System/.test(read(f).replace(/컬렉션 「YBM DS」/g, ''))) err(`예전 이름 YBM DS 가 남음 ${f}`);
  for (const f of ['dist/components.css', 'dist/base.css', 'dist/utilities.css', 'dist/tokens.css', 'site/src/site.css']) if (/--ybm-/.test(read(f))) err(`예전 토큰 이름 --ybm- 이 남음 ${f}`);
  const ver = read('VERSION').trim();
  if (!/^\d+\.\d+\.\d+$/.test(ver)) err(`VERSION 이 x.y.z 모양이 아님: ${ver}`);
  if (!entry.includes(`yds v${ver}`)) err(`dist/ybm-ds.css 머리 버전이 VERSION(${ver}) 과 다름`);
  if (!read('dist/ybm-ds.js').includes(`version: "${ver}"`)) err(`dist/ybm-ds.js DS.version 이 VERSION(${ver}) 과 다름`);
});

// 5-1. 선 색 규칙 (2026-11-04 사용자 "같은 카드의 테두리 색이 다르면 안 된다"): 바깥 테두리는 stroke/neutral-weak 하나, 안쪽 구분선은 stroke/neutral-muted 하나
check('5-1 선 색', ({ err }) => {
  const OUTLINE = 'stroke-neutral-weak', DIVIDER = 'stroke-neutral-muted';
  // 바깥 테두리를 그리는 기본 규칙(상태, 변형 색 말고)
  const outlines = ['.ds-card', '.ds-list[data-variant="inset"]', '.ds-accordion[data-variant="separated"]', '.ds-popover', '.ds-selectbox', '.ds-input', '.ds-textarea', '.ds-fieldbutton', '.ds-select', '.ds-quantity', '.ds-fileattach__trigger', '.ds-fileitem', '.ds-citation', '.ds-codeblock', '.ds-multiselect__trigger', '.ds-tablepagination__select'];
  const dividers = ['.ds-divider', '.ds-accordion', '.ds-banner', '.ds-menu__divider::before', '.ds-list[data-divider] > li + li > .ds-list-item::before', '.ds-markdown hr', '.ds-codeblock__header'];
  const rules = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => [m[1].trim(), m[2]]);
  const colorOf = (body) => (body.match(/(?:inset 0 0 0 1px|inset 0 -?1px 0|--ds-[a-z-]*-(?:line|color):|border(?:-top)?: 1px solid|background:)\s*var\(--ds-color-(stroke-[a-z-]+)\)/) || [])[1];
  for (const [list, want, label] of [[outlines, OUTLINE, '바깥 테두리'], [dividers, DIVIDER, '안쪽 구분선']]) for (const sel of list) {
    const r = rules.find(([s]) => s === sel); if (!r) continue;
    const got = colorOf(r[1]); if (got && got !== want) err(`${label} ${sel}: ${got} (모두 ${want})`);
  }
  if (/\.ds-card\[data-variant="subtle"\]\s*\{[^}]*--ds-card-line/.test(css)) err('Card subtle 이 테두리 색을 따로 정함 (기본과 같아야 한다)');
  for (const f of fs.readdirSync(path.join(SITE, 'templates/gen')).filter((x) => x.endsWith('.mjs'))) {
    const t = fs.readFileSync(path.join(SITE, 'templates/gen', f), 'utf8');
    for (const m of t.matchAll(/inset 0 0 0 1px var\(--ds-color-(stroke-neutral(?:-[a-z]+)?)\)/g)) if (m[1] !== OUTLINE && m[1] !== 'stroke-neutral-contrast') err(`템플릿 ${f} 바깥 테두리 ${m[1]} (모두 ${OUTLINE})`);
  }
});

// 6. 새 컴포넌트 9곳
check('6 컴포넌트 9곳', ({ err, warn }) => {
  const idx = read('index.html');
  const notes = readJson('site/src/figma-notes.json');
  const ko = readJson('site/src/search-ko.json');
  const covers = read('site/src/covers.html');
  const readme = read('README.md');
  const g62 = readme.slice(readme.indexOf('### 6.2'), readme.indexOf('\n## 7'));
  const EX = Object.assign({}, ...fs.readdirSync(path.join(SITE, 'src/examples')).filter((f) => f.endsWith('.json')).map((f) => readJson('site/src/examples/' + f)));
  for (const c of reg) {
    const slug = slugOf(c.name); const base = c.name.split(' · ')[0]; const miss = [];
    if (!new RegExp(`/\\* -{20,}\\n {3}${c.no} `).test(css)) miss.push('components.css 머리 주석');
    if (!idx.includes(`id="c-${c.no}"`)) miss.push('index.html 미리보기');
    if (!notes.lead[c.no]) miss.push('figma-notes.json lead');
    if (ko[base] === undefined) miss.push('search-ko.json');
    if (!covers.includes(`data-slug="${slug}"`)) miss.push('covers.html 대표 그림');
    if (!EX[slug] || !EX[slug].length) miss.push('examples 예시');
    if (!fs.existsSync(path.join(SITE, 'components', slug + '.html'))) miss.push('사이트 페이지 (node site/build.mjs)');
    if (miss.length) err(`${c.no} ${c.name}: ${miss.join(', ')} 없음`);
    const dos = Object.keys(notes.dos).some((k) => k === c.no || k.startsWith(c.no + ' ')) || g62.includes(`**${base}**`);
    if (!dos) warn(`${c.no} ${c.name}: 사용 지침(figma-notes dos 또는 README 6.2) 없음`);
  }
});

// 7. 빌드 경고 (--regen 이 아니면 사이트만 한 번 더 만들어 본다. 결과 파일은 같다)
check('7 빌드 경고', ({ err }) => {
  const r = node(['site/build.mjs']);
  if (r.status !== 0) return err('site/build.mjs 실패: ' + (r.stderr || '').trim().split('\n').slice(-2).join(' / '));
  for (const l of r.stdout.split('\n')) if (/^\s+! /.test(l)) err(l.trim().slice(2));
});

// 8. 라이브 (--live)
if (flags.has('--live')) {
  const files = spawnSync('git', ['ls-files'], { cwd: R, encoding: 'utf8' }).stdout.split('\n')
    .filter((f) => f && (/^(dist|site|tokens)\//.test(f) || ['index.html', 'components.json', 'README.md', 'VERSION'].includes(f)))
    .filter((f) => !/^site\/(src|templates\/gen|themes\/gen)\//.test(f) && !/(\.LDH|\.mjs|\.gitignore|CLAUDE\.md)$/.test(f));
  const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
  const errors = [];
  let i = 0;
  await Promise.all(Array.from({ length: 12 }, async () => {
    while (i < files.length) {
      const f = files[i++];
      try {
        const r = await fetch(PUBLIC + encodeURI(f) + '?t=' + Date.now() + Math.random(), { cache: 'no-store' });
        if (r.status !== 200) { errors.push(`라이브에 없음 ${f} (${r.status})`); continue; }
        if (sha(Buffer.from(await r.arrayBuffer())) !== sha(fs.readFileSync(path.join(R, f)))) errors.push(`라이브와 다름 ${f}`);
      } catch { errors.push(`받기 실패 ${f}`); }
    }
  }));
  results.push({ name: `8 라이브 (${files.length}개)`, errors, warns: [] });
}

// 결과
let bad = 0;
for (const { name, errors, warns } of results) {
  bad += errors.length;
  console.log(`${errors.length ? '✘' : '✔'} ${name}${errors.length ? `  오류 ${errors.length}` : ''}${warns.length ? `  주의 ${warns.length}` : ''}`);
  for (const e of errors.slice(0, 15)) console.log('    ' + e);
  if (errors.length > 15) console.log(`    외 ${errors.length - 15}개`);
  for (const w of warns.slice(0, flags.has('--all') ? 999 : 3)) console.log('    주의: ' + w);
  if (!flags.has('--all') && warns.length > 3) console.log(`    주의 외 ${warns.length - 3}개 (--all 로 모두 보기)`);
}
// GitHub 자동 검사에서는 오류를 주석(annotation)으로도 남겨, 로그인 없이 실행 화면에서 바로 보이게 한다
if (process.env.GITHUB_ACTIONS) for (const { name, errors } of results) for (const e of errors.slice(0, 8)) console.log(`::error title=${name}::${e.replace(/\n/g, ' ')}`);
console.log(bad ? `\n검사 실패: 오류 ${bad}개` : '\n검사 통과');
process.exit(bad ? 1 : 0);

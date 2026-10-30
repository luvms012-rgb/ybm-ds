// YBM DS 문서 사이트 생성기 - node site/build.mjs
// 바로 위 폴더(DS 정본)를 읽기만 하고 site/ 아래에 정적 HTML 을 만든다. 패키지 설치 필요 없음.
//   읽는 것: components.json, dist/components.css(머리 주석, --ds-* 변수), dist/tokens.css, dist/icons.css,
//            dist/ybm-ds.js(머리 주석), index.html(컴포넌트 예시), README.md(6.2 사용 지침), site/src/*
//   만드는 것: site/index.html, site/get-started/*.html, site/components/*.html, site/templates/*.html, site/assets/*
//   손으로 쓰는 것(생성 안 함): site/templates/pages/*.html (템플릿 원본), site/src/*
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(SITE, '..');
const read = (p) => fs.readFileSync(path.join(DS, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));
const PUBLIC = 'https://luvms012-rgb.github.io/ybm-ds';
const GITHUB = 'https://github.com/luvms012-rgb/ybm-ds';
const RAW = 'https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main';
const FIGMA = 'https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=';
const SITE_URL = PUBLIC + '/site/';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// 사이트 문장 규칙: 가운뎃점과 긴 줄표를 쉼표와 - 로
const prose = (s) => String(s).replace(/\s*·\s*/g, ', ').replace(/\s*—\s*/g, ' - ').replace(/\s*\(\d{4}-\d{2}-\d{2} 추가\)/g, '').trim();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dedent = (s) => {
  const lines = s.replace(/^\n+|\s+$/g, '').split('\n');
  const n = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(n)).join('\n');
};
const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

/* ---------------------------------------------------------------- 데이터 */
const registry = readJson('components.json').components;
const notes = readJson('site/src/figma-notes.json');
const componentsCss = read('dist/components.css');
const tokensCss = read('dist/tokens.css');
const iconsCss = read('dist/icons.css');
const dsJs = read('dist/ybm-ds.js');
const preview = read('index.html');
const readme = read('README.md');

const CATS = [
  ['Action', '동작'], ['Data Input', '입력'], ['Navigation', '이동'], ['Container', '묶음'], ['Content', '콘텐츠'],
  ['Table & List', '표와 목록'], ['Feedback & Status', '피드백과 상태'], ['Overlay', '떠 있는 창'], ['Layout', '배치'], ['Chat', '대화'],
];
const catLabel = Object.fromEntries(CATS);

// components.css 머리 주석: "   NN 이름 - 설명" + 마크업과 규격
const headers = {};
{
  const re = /\/\* -{20,}\n {3}(\d\d) ([^\n]+)\n([\s\S]*?)\n {3}-{20,} \*\//g;
  let m;
  const marks = [];
  while ((m = re.exec(componentsCss))) marks.push({ no: m[1], first: m[2], body: m[3], start: m.index, end: re.lastIndex });
  marks.forEach((h, i) => {
    const sep = h.first.match(/^(.*?)\s+[-—]\s+(.*)$/);
    const body = h.body.split('\n').map((l) => l.replace(/^ {3}/, ''));
    const markup = body.filter((l) => /<[a-z/!]/i.test(l) && /^\s/.test(l));
    const spec = body.filter((l) => !markup.includes(l) && l.trim());
    headers[h.no] = {
      desc: sep ? prose(sep[2]) : '',
      markup: markup.length ? dedent(markup.join('\n')) : '',
      spec: spec.join('\n').replace(/ · /g, ' / ').replace(/·/g, '/'),
      cssText: componentsCss.slice(h.end, marks[i + 1] ? marks[i + 1].start : componentsCss.length),
    };
  });
}

// index.html 의 예시 섹션
const examples = {};
{
  const starts = [...preview.matchAll(/<section class="pv-sec" id="c-(\d\d)"[^>]*>/g)];
  const mainEnd = preview.lastIndexOf('</main>');
  starts.forEach((s, i) => {
    let chunk = preview.slice(s.index + s[0].length, starts[i + 1] ? starts[i + 1].index : mainEnd);
    chunk = chunk.slice(0, chunk.lastIndexOf('</section>'));
    chunk = chunk.replace(/^\s*<header>[\s\S]*?<\/header>/, '').trim();
    examples[s[1]] = chunk;
  });
}
// 균형 맞춘 <div class="pv-stage..."> 안쪽만 꺼낸다
function stages(html) {
  const out = [];
  const re = /<div class="pv-stage[^"]*"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    let depth = 1, i = re.lastIndex;
    const tag = /<\/?div\b[^>]*>/g;
    tag.lastIndex = i;
    let t;
    while (depth && (t = tag.exec(html))) depth += t[0][1] === '/' ? -1 : 1;
    out.push(html.slice(i, t.index));
    re.lastIndex = tag.lastIndex;
  }
  return out;
}
const codeOf = (html) => stages(html).map((s) => dedent(s.replace(/ ?\bpv-(w|wide|col)\b/g, '').replace(/ class=""/g, ''))).join('\n\n');

// README 6.2 사용 지침
const readmeDos = [];
{
  const sec = readme.slice(readme.indexOf('### 6.2'), readme.indexOf('## 7.'));
  for (const m of sec.matchAll(/^- \*\*(.+?)\*\* - (.+)$/gm)) readmeDos.push({ keys: m[1], text: m[2] });
}
const ALIAS = { FAB: 'Floating Action Button', '로딩 표시': 'Progress Circle' };

const comps = registry.map((c) => {
  const h = headers[c.no] || {};
  const base = c.name.split(' · ')[0];
  const names = [c.name, base, ...c.name.split(' · ')].map((s) => s.toLowerCase());
  const dos = [];
  for (const d of readmeDos) {
    const parts = d.keys.split(/\s+vs\s+|\s*\/\s*/).map((p) => (ALIAS[p] || p).toLowerCase());
    if (parts.some((p) => names.includes(p))) dos.push(prose(d.text));
  }
  for (const [k, list] of Object.entries(notes.dos)) if (k === c.no || k.startsWith(c.no + ' ')) dos.push(...list.map(prose));
  const vars = new Map();
  // 이 컴포넌트 이름으로 시작하는 변수만 (안에 든 아이콘 크기 같은 남의 변수는 뺀다)
  const own = c.classes.map((k) => '--ds-' + k.replace(/^\.ds-/, '').split('-')[0]);
  for (const m of (h.cssText || '').matchAll(/(--ds-[a-z0-9-]+)\s*:\s*([^;{}]+);/g)) if (!vars.has(m[1]) && own.some((p) => m[1].startsWith(p))) vars.set(m[1], m[2].trim());
  return {
    ...c,
    slug: slugify(c.name),
    cat: notes.page[c.no] || 'Layout',
    desc: prose(notes.lead[c.no] || h.desc || ''),
    markup: h.markup || '',
    spec: h.spec || '',
    example: examples[c.no] || '',
    dos: [...new Set(dos)],
    vars: [...vars],
  };
});
// 왼쪽 메뉴와 이전 / 다음 문서는 이름 ABC 순
const compsAZ = [...comps].sort((a, b) => a.name.localeCompare(b.name, 'en'));
const missing = comps.filter((c) => !c.desc || !c.example).map((c) => c.no + (c.desc ? '' : ' 설명') + (c.example ? '' : ' 예시'));
if (missing.length) console.log('  ! 비어 있는 것:', missing.join(', '));

const templates = fs.existsSync(path.join(SITE, 'src/templates.json')) ? JSON.parse(fs.readFileSync(path.join(SITE, 'src/templates.json'), 'utf8')).templates.filter((t) => fs.existsSync(path.join(SITE, 'templates/pages', t.slug + '.html'))) : [];

/* ---------------------------------------------------------------- 공통 조각 */
function codeblock(code, lang = 'html', extra = '') {
  return `<figure class="ds-codeblock"${extra}>
  <figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">${esc(lang)}</span><button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사"><i class="ds-icon ds-icon--copy ds-icon--sm" aria-hidden="true"></i></button></figcaption>
  <pre class="ds-codeblock__code"><code>${esc(code)}</code></pre>
</figure>`;
}
function example(previewHtml, code) {
  return `<div class="site-example">
  <div class="site-example__bar"><div class="ds-chiptabs" role="tablist" aria-label="보기 방식"><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true" data-site-view="preview">미리보기</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-site-view="code">코드</button></div></div>
  <div class="site-example__preview">${previewHtml}</div>
  <div class="site-example__code" hidden>${codeblock(code)}</div>
</div>`;
}
const table = (head, rows) => `<div class="ds-table-wrap"><table class="ds-table" data-density="compact">
<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`;
const btn = (href, label, variant = 'neutralWeak', size = 'small', icon = '') =>
  `<a class="ds-btn" data-variant="${variant}" data-size="${size}" href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${icon ? `<i class="ds-icon ds-icon--${icon} ds-icon--sm" aria-hidden="true"></i>` : ''}${esc(label)}</a>`;


// 상단 메뉴 (레퍼런스 B 처럼 Foundations 는 따로)
const NAV = [['get-started', 'Get Started', 'index.html'], ['foundations', 'Foundations', 'foundations/index.html'], ['components', 'Components', 'components/index.html'], ['templates', 'Templates', 'templates/index.html']];
// 왼쪽 메뉴는 영문, 묶음은 두고 묶음 안은 ABC 순 (레퍼런스 B)
const az = (list) => [...list].sort((a, b) => a[1].localeCompare(b[1], 'en'));
// 파운데이션: 항목마다 한 페이지 (슬러그, 영문 이름)
const FOUND = az([['color', 'Color'], ['typography', 'Typography'], ['spacing', 'Spacing'], ['shape', 'Radius'], ['elevation', 'Elevation'], ['motion', 'Motion'], ['icons', 'Iconography']]);
const foundPager = (slug) => { const i = FOUND.findIndex(([s]) => s === slug); const p = FOUND[i - 1], n = FOUND[i + 1]; return [p && { href: p[0] + '.html', label: p[1] }, n && { href: n[0] + '.html', label: n[1] }]; };
const GS = [['Guide', az([['get-started/usage.html', 'Usage'], ['get-started/scripts.html', 'Scripts']])]];
// 시작하기 문서 순서 (이전 / 다음 문서) - 왼쪽 메뉴 순서 그대로, 이름은 페이지 제목
const GS_TITLE = { 'get-started/usage.html': 'Usage', 'get-started/scripts.html': 'Scripts' };
const GS_ORDER = [['index.html', 'Get Started'], ...GS.flatMap(([, list]) => list.map(([h]) => [h, GS_TITLE[h]]))];
const gsPager = (file) => { const i = GS_ORDER.findIndex(([f]) => f === file); const p = GS_ORDER[i - 1], n = GS_ORDER[i + 1]; return [p && { href: '{root}' + p[0], label: p[1] }, n && { href: '{root}' + n[0], label: n[1] }]; };

function sideNav(section, file, root) {
  const item = (href, label) => `<a class="site-nav__item" href="${root}${href}"${href === file ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
  // 레퍼런스 B 왼쪽 메뉴: 접지 않는 묶음 - 작은 묶음 이름 + 항목
  const group = (label, items) => `<div class="site-nav__group" role="group" aria-label="${esc(label)}"><p class="site-nav__label">${esc(label)}</p>${items.join('')}</div>`;
  const parts = [];
  if (section === 'get-started') {
    parts.push(item('index.html', 'Overview'));
    for (const [label, list] of GS) parts.push(group(label, list.map(([h, l]) => item(h, l)), true));
  }
  if (section === 'foundations') {
    parts.push(item('foundations/index.html', 'Overview'));
    parts.push(...FOUND.map(([s, l]) => item(`foundations/${s}.html`, l)));
  }
  if (section === 'components') {
    parts.push(item('components/index.html', 'Overview'));
    parts.push(...compsAZ.map((c) => item(`components/${c.slug}.html`, c.name.split(' · ')[0])));
  }
  if (section === 'templates') {
    parts.push(item('templates/index.html', 'Overview'));
    parts.push(...templates.map((t) => item(`templates/${t.slug}.html`, t.en)));
  }
  const mobile = `<div class="site-side__mobile"><nav class="site-nav" aria-label="주요 메뉴">${NAV.map(([k, l, h]) => `<a class="site-nav__item" href="${root}${h}"${k === section ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav><div class="site-nav__sep"></div></div>`;
  // 컴포넌트 메뉴 맨 위 찾기 칸 (높이 32, 모서리 12, 1px 테두리) - 메뉴 항목과 목록 카드를 함께 거른다
  const search = section === 'components' ? `<div class="site-side__searchbar"><div class="ds-input site-side__search" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" placeholder="컴포넌트 찾기" aria-label="컴포넌트 찾기" data-site-search></div></div>` : '';
  return `<aside class="site-side" id="site-side" aria-label="페이지 목록">
  <div class="site-side__top"><b>메뉴</b><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" data-site-close aria-label="메뉴 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
  ${mobile}${search}
  <nav class="site-nav" aria-label="${esc(NAV.find((n) => n[0] === section)[1])} 메뉴"${search ? ' data-site-navfilter' : ''}>${parts.join('\n')}</nav>
</aside>`;
}

const iconBtn = (attrs, label, inner) => `<button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="${esc(label)}" ${attrs}>${inner}</button>`;
const iconLink = (href, label, icon, extra = '') => `<a class="ds-btn${extra}" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" href="${href}" target="_blank" rel="noopener" aria-label="${esc(label)}"><i class="ds-icon ${icon}" aria-hidden="true"></i></a>`;

// layout - doc: 본문 752 + 목차 (문서, 컴포넌트 목록과 상세도 같은 폭) / wide: 메뉴 옆 전체 폭 (템플릿 상세)
//          full: PC 에서 왼쪽 메뉴 없이 전체 폭 (템플릿 목록)
function page({ file, title, section, body, layout = 'doc', desc = '', pager = [] }) {
  const depth = file.split('/').length - 1;
  const root = '../'.repeat(depth);
  // 제목 구성 (레퍼런스 B): 큰 제목과 설명 (위 경로 글자는 쓰지 않는다)
  body = body.replace(/<header>(\s*<p class="site-eyebrow">[\s\S]*?<\/p>)?/, '<header class="site-head">');
  // 이전 / 다음 문서 (레퍼런스 B)
  const [prev, next] = pager;
  const pagerHtml = prev || next ? `<nav class="site-pager" aria-label="이전, 다음 문서">${prev ? `<a href="${prev.href}" data-dir="prev"><span class="site-pager__label"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i>이전 문서</span><b>${esc(prev.label)}</b></a>` : '<span></span>'}${next ? `<a href="${next.href}" data-dir="next"><span class="site-pager__label">다음 문서<i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></span><b>${esc(next.label)}</b></a>` : ''}</nav>` : '';
  // 푸터 (레퍼런스 B): 왼쪽 로고와 저작권, 오른쪽 메뉴 두 묶음
  const footer = `<footer class="site-footer">
  <div class="site-footer__brand"><img src="${root}assets/logo-ybmnet.svg" alt="YBM NET" width="81" height="24"><p class="site-footer__copy">© 2026 YBM NET. All rights reserved.</p></div>
  <nav class="site-footer__nav" aria-label="사이트 메뉴">
    <div><p class="site-footer__title">Menu</p>${NAV.map(([, l, h]) => `<a href="${root}${h}">${l}</a>`).join('')}</div>
    <div><p class="site-footer__title">More</p><a href="${FIGMA}2274-1143" target="_blank" rel="noopener">Figma</a><a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a></div>
  </nav>
</footer>`;
  // h2 에 제목 링크를 달고 목차를 만든다
  const heads = [];
  body = body.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (m, id, inner) => {
    heads.push([id, inner.replace(/<[^>]+>/g, '')]);
    return `<h2 id="${id}">${inner}<a class="site-anchor" href="#${id}" aria-label="이 제목 링크"><i class="ds-icon ds-icon--link ds-icon--sm" aria-hidden="true"></i></a></h2>`;
  });
  const hasToc = layout === 'doc' && heads.length > 1;
  const tocSelect = hasToc ? `<div class="site-toc-select"><select aria-label="이 페이지 목차" data-site-toc>${heads.map(([id, t]) => `<option value="${id}">${esc(t)}</option>`).join('')}</select><i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i></div>` : '';
  body = body.replace('</header>', `${tocSelect}\n</header>`);
  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - YBM DS</title>
${desc ? `<meta name="description" content="${esc(desc)}">\n` : ''}<!-- 생성물: node site/build.mjs 가 만든다. 직접 고치지 말고 site/build.mjs 나 site/src 를 고친다 -->
<script>try { var t = localStorage.getItem("ybm-site-theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}</script>
<link rel="icon" href="${root}assets/logo-ybmnet.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}../dist/ybm-ds.css">
<link rel="stylesheet" href="${root}assets/site.css">
<script src="${root}../dist/ybm-ds.js" defer></script>
<script src="${root}assets/site.js" defer></script>
</head>
<body class="site">
<a class="site-skip" href="#main">본문 바로가기</a>
<header class="site-top">
  <a class="site-logo" href="${root}index.html"><img src="${root}assets/logo-ybmnet.svg" alt="YBM NET" width="81" height="24"></a>
  <nav class="site-topnav" aria-label="주요 메뉴">
    ${NAV.map(([k, l, h]) => `<a class="site-topnav__item" href="${root}${h}"${k === section ? ' aria-current="page"' : ''}>${l}</a>`).join('\n    ')}
  </nav>
  <div class="site-top__end">
    ${iconBtn('data-site-theme-toggle', '화면 모드 바꾸기', '<i class="ds-icon site-i--moon" aria-hidden="true"></i><i class="ds-icon site-i--sun" aria-hidden="true"></i>').replace('class="ds-btn"', 'class="ds-btn site-theme-btn"')}
    ${iconLink(FIGMA + '2274-1143', 'Figma 파일', 'site-i--figma', ' site-only-wide')}
    ${iconLink(GITHUB, 'GitHub 저장소', 'site-i--github', ' site-only-wide')}
    <a class="ds-btn site-cta" data-variant="neutralSolid" data-size="xsmall" href="${root}index.html#ai">시작하기</a>
    ${iconBtn('data-site-menu aria-controls="site-side" aria-expanded="false"', '메뉴 열기', '<i class="ds-icon ds-icon--menu" aria-hidden="true"></i>').replace('class="ds-btn"', 'class="ds-btn site-menu-btn"')}
  </div>
</header>
<div class="site-body site-body--${layout}">
${sideNav(section, file, root)}
<div class="site-scrim" data-site-close></div>
<main class="site-main" id="main">
<article class="site-doc">
${body}
${pagerHtml}
${footer}
</article>
</main>
${layout === 'doc' ? `<aside class="site-toc" aria-label="이 페이지 목차">${hasToc ? `<p class="site-toc__title">목차</p><nav><span class="site-toc__indicator" aria-hidden="true"></span>${heads.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('')}</nav>` : ''}</aside>` : ''}
</div>
</body>
</html>
`;
  const out = path.join(SITE, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replaceAll('{root}', root));
  return file;
}
const written = [];
const write = (o) => written.push(page(o));

/* ---------------------------------------------------------------- Get Started */
const CSS_LINK = `<link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">
<script src="${PUBLIC}/dist/ybm-ds.js" defer></script>`;
const prompts = [
  ['YBM DS 적용하기', '지금 만들고 있는 화면이나 프로젝트에 DS 를 연결합니다.',
    `이 프로젝트에 YBM DS 를 적용해 줘.
1. <head> 에 아래 두 줄을 넣어 줘.
   <link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">
   <script src="${PUBLIC}/dist/ybm-ds.js" defer></script>
2. 쓸 수 있는 컴포넌트 목록은 ${PUBLIC}/components.json, 각 컴포넌트의 HTML 구조는 ${RAW}/dist/components.css 의 컴포넌트별 머리 주석을 따라.
3. 색, 간격, 글자 크기, 모서리, 그림자는 ${RAW}/dist/tokens.css 의 --ybm-* 토큰만 써.
4. 서비스 CSS 는 DS 다음에 불러오고, 바꾸고 싶은 모양은 컴포넌트의 --ds-* 변수만 덮어써.
5. 새 ds- 클래스를 만들거나 !important 를 쓰지 마.`],
  ['화면 만들기', '만들고 싶은 화면을 말로 설명하면 DS 부품으로 조립합니다.',
    `YBM DS 로 [만들 화면, 예: 회원 목록 관리 화면]을 만들어 줘.
- 부품은 ${PUBLIC}/components.json 에 있는 것만 쓰고, 마크업은 ${RAW}/dist/components.css 머리 주석 그대로 써.
- 비슷한 화면이 ${SITE_URL}templates/index.html 에 있으면 그 템플릿을 출발점으로 써.
- 모바일 먼저 만들고, 768px 이상과 1280px 이상에서 배치를 바꿔 줘.
- 글자는 한국어. 제목 500 굵기, 본문 16px 줄 높이 28px, 자간은 주지 않고, 본문 word-break: keep-all.
- 배치용 CSS 에는 --ybm-* 토큰만 쓰고 hex 색은 쓰지 마.`],
  ['규칙 점검하기', '이미 만든 화면이 DS 규칙을 지키는지 확인하고 고칩니다.',
    `이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb 로 색을 직접 쓴 곳 → --ybm-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ybm-space-*, --ybm-font-size-* 로
- ${RAW}/dist/components.css 에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.`],
];
write({
  file: 'index.html', section: 'get-started', title: 'Get Started', desc: 'YBM DS 를 AI 와 함께 바로 시작하는 방법', pager: gsPager('index.html'),
  body: `<header>
  <h1 class="site-h1">Get Started</h1>
  <p class="site-lead">YBM DS 를 프로젝트에 넣고 바로 화면을 만들어 보세요.</p>
</header>

<h2 id="ai">AI 로 빠르게 시작하기</h2>
<p>아래 내용을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 설치부터 규칙까지 알아서 맞춰요.</p>
${codeblock(prompts[0][2], 'text', ' data-wrap')}
<p>그다음 만들고 싶은 화면을 말로 설명하세요. 대괄호 안만 내 상황에 맞게 바꾸면 됩니다. 비슷한 화면이 <a class="ds-link" href="templates/index.html">템플릿</a> 에 있으면 그 화면에서 출발해요.</p>
${codeblock(prompts[1][2], 'text', ' data-wrap')}
<p>이미 만든 화면이 있다면 DS 규칙을 지키는지 점검하게 할 수 있어요.</p>
${codeblock(prompts[2][2], 'text', ' data-wrap')}

<h2 id="install">설치</h2>
<p>가장 쉽고 권장하는 방법은 CSS 로 바로 쓰는 것입니다. 빌드 도구나 설치 과정 없이 <code>&lt;head&gt;</code> 에 두 줄만 넣으면 글꼴(Pretendard), 토큰, 아이콘, 컴포넌트가 한 번에 들어와요.</p>
${codeblock(CSS_LINK)}

<h2 id="first">첫 컴포넌트 넣기</h2>
<p>정해진 클래스와 속성만 붙이면 됩니다. 각 컴포넌트의 구조와 속성은 <a class="ds-link" href="components/index.html">Components</a> 에 있어요.</p>
${example(`<div class="pv-stage"><button class="ds-btn" data-variant="brandSolid" data-size="large">시작하기</button><button class="ds-btn" data-variant="neutralWeak" data-size="large">나중에</button></div>`, `<button class="ds-btn" data-variant="brandSolid" data-size="large">시작하기</button>\n<button class="ds-btn" data-variant="neutralWeak" data-size="large">나중에</button>`)}

<h2 id="theme">다크 모드</h2>
<p>html 요소에 속성 하나만 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 오른쪽 위 달 모양 버튼으로 이 사이트에서도 바로 볼 수 있어요.</p>
${codeblock('<html lang="ko" data-theme="dark">')}

<h2 id="custom">모양 바꾸기</h2>
<p>서비스 CSS 는 DS 다음에 불러오고, 새 클래스를 만들지 말고 컴포넌트 변수(<code>--ds-*</code>)만 덮어씁니다. 자세한 내용은 <a class="ds-link" href="get-started/usage.html">사용 규칙</a> 에 있어요.</p>
${codeblock(`<link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">\n<link rel="stylesheet" href="my-service.css">  <!-- 서비스 CSS 는 항상 DS 다음 -->\n\n/* my-service.css */\n.my-dialog { --ds-dialog-width: 360px; }`)}

<h2 id="other">다른 설치 방법</h2>
<p>개발자가 버전을 고정하거나 파일을 직접 가지고 있어야 할 때 씁니다.</p>
<h3>버전 고정 주소</h3>
<p>위 주소는 늘 최신 버전을 줍니다. 배포 후 바뀌지 않게 하려면 공개 CDN 주소에 커밋 번호를 넣어 고정하세요.</p>
${codeblock(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.css">\n<script src="https://cdn.jsdelivr.net/gh/luvms012-rgb/ybm-ds@[커밋 번호]/dist/ybm-ds.js" defer></script>`)}
<h3>파일 내려받기</h3>
<p>저장소를 내려받아 <code>dist</code> 폴더를 프로젝트에 넣고 상대 경로로 불러옵니다. 인터넷이 막힌 환경이나 사내 서버에 둘 때 씁니다.</p>
${codeblock(`git clone ${GITHUB}.git\n# ybm-ds/dist 폴더를 프로젝트로 복사한 뒤\n<link rel="stylesheet" href="./dist/ybm-ds.css">\n<script src="./dist/ybm-ds.js" defer></script>`, 'shell')}
<h3>Tailwind CSS 와 함께</h3>
<p>Tailwind 를 쓰는 프로젝트는 토큰을 Tailwind 이름으로 바로 쓸 수 있는 설정 파일이 있어요. 값은 모두 DS 의 CSS 변수를 가리키므로 <code>ybm-ds.css</code> 도 함께 불러와야 합니다.</p>
${codeblock(`// tailwind.config.js - ybm-ds/tokens/tailwind.preset.js 를 프로젝트에 복사한 뒤\nmodule.exports = { presets: [require('./tailwind.preset.js')] };`, 'javascript')}

<h2 id="next">다음으로</h2>
<div class="site-grid">
  <a class="site-card" href="get-started/usage.html"><div class="site-card__body"><p class="site-card__title">Usage</p><p class="site-card__desc">불러오는 순서, 커스텀, 다크 모드, 반응형 기준점을 알아봅니다.</p></div></a>
  <a class="site-card" href="components/index.html"><div class="site-card__body"><p class="site-card__title">Components</p><p class="site-card__desc">부품마다 미리보기, 사용법, 속성, 사용 지침을 봅니다.</p></div></a>
  <a class="site-card" href="templates/index.html"><div class="site-card__body"><p class="site-card__title">Templates</p><p class="site-card__desc">자주 쓰는 화면을 통째로 복사해 출발점으로 씁니다.</p></div></a>
</div>`.replaceAll('href="components/', 'href="{root}components/').replaceAll('href="templates/', 'href="{root}templates/').replaceAll('href="get-started/', 'href="{root}get-started/'),
});

// 사용 규칙
const bpRows = [['sm', '480px', '큰 휴대폰'], ['md', '768px', '태블릿, PC 부품으로 바뀌는 기준'], ['lg', '1280px', '넓은 PC, 3단 배치'], ['xl', '1440px', '아주 넓은 화면']];
write({
  file: 'get-started/usage.html', section: 'get-started', title: 'Usage', pager: gsPager('get-started/usage.html'),
  body: `<header><h1 class="site-h1">Usage</h1><p class="site-lead">DS 를 불러오는 순서와 모양을 바꾸는 방법, 화면 모드와 반응형 기준을 정리했습니다.</p></header>

<h2 id="order">불러오는 순서</h2>
<p>DS 를 먼저, 서비스 CSS 를 그다음에 불러옵니다. DS 전체가 CSS 레이어 안에 들어 있어서 레이어 밖에 쓴 서비스 CSS 는 선택자 길이와 상관없이 항상 DS 를 이깁니다. 그래서 <code>!important</code> 나 긴 선택자로 다툴 필요가 없어요.</p>
${codeblock('@layer ybm.tokens, ybm.base, ybm.icons, ybm.components, ybm.utilities;', 'css')}

<h2 id="custom">모양 바꾸기</h2>
<ul class="site-list">
  <li>서비스는 <b>컴포넌트 변수(<code>--ds-*</code>)만 바꿔서</b> 모양을 조정합니다. 새 <code>ds-</code> 클래스를 만들거나 <code>!important</code> 를 쓰지 않습니다.</li>
  <li>각 컴포넌트에서 바꿀 수 있는 변수는 컴포넌트 페이지의 "바꿀 수 있는 변수" 표에 있어요.</li>
  <li>팔레트는 YBM 전체가 함께 쓰고, 서비스는 시맨틱(<code>bg</code>, <code>fg</code>, <code>stroke</code>) 색과 컴포넌트 변수만 덮어씁니다.</li>
</ul>
${codeblock('.my-dialog { --ds-dialog-width: 360px; }\n.my-banner { --ds-banner-bg: var(--ybm-color-bg-brand-weak); }', 'css')}

<h2 id="state">상태는 HTML 속성으로</h2>
<p>CSS 는 Figma 속성 이름을 그대로 <code>data-*</code> 속성으로 씁니다. 상태는 가능한 한 HTML 기본 속성으로 표현해서 접근성이 함께 맞춰지게 했어요.</p>
${table(['상태', '쓰는 속성'], [['꺼짐', '<code>disabled</code>'], ['선택', '<code>:checked</code>, <code>aria-selected</code>, <code>aria-pressed</code>'], ['지금 위치', '<code>aria-current="page"</code>'], ['펼침', '<code>aria-expanded</code>'], ['오류', '<code>aria-invalid="true"</code>'], ['누름', '<code>:active</code> (마우스는 <code>:hover</code> 도)']])}

<h2 id="theme">화면 모드</h2>
<p>모드는 라이트와 다크 두 가지입니다. <code>&lt;html data-theme="dark"&gt;</code> 를 붙이면 시맨틱 색이 모두 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없어요.</p>

<h2 id="breakpoint">반응형 기준점</h2>
<p>작은 화면부터 쌓아 올리는 방식입니다. <code>@media</code> 안에서는 CSS 변수를 쓸 수 없어서 숫자를 직접 씁니다.</p>
${table(['이름', '폭', '쓰임'], bpRows.map(([n, w, u]) => [`<code>${n}</code>`, w, u]))}
${codeblock(`@media (min-width: 768px) { /* 태블릿, PC */ }\n@media (min-width: 1280px) { /* 넓은 PC */ }\n\n<!-- 유틸리티: 768 이상에서 숨김(모바일 전용) / 768 이상에서만 보임(PC 전용) -->\n<div class="u-hide-from-md">…</div>\n<div class="u-show-from-md">…</div>`, 'css')}
<ul class="site-list">
  <li>Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet, Dialog ↔ Bottom Sheet 는 768 을 기준으로 바꿉니다.</li>
  <li>Side Navigation 은 1280 이상 펼침, 768 이상 접힘, 그보다 좁으면 서랍 메뉴입니다.</li>
</ul>

<h2 id="korean">한글 줄바꿈</h2>
<p>본문에는 <code>word-break: keep-all</code> 과 <code>overflow-wrap: break-word</code> 를 함께 씁니다. 넣지 않으면 한글이 음절 단위로 끊겨 어절 중간에서 줄이 바뀝니다.</p>

<h2 id="icon">아이콘</h2>
<p>UI 아이콘은 Lucide 한 가지만 씁니다. 색은 부모 글자색을 따르고, 크기는 기본 20, <code>ds-icon--sm</code> 16, <code>ds-icon--lg</code> 24 입니다. 목록은 <a class="ds-link" href="{root}foundations/icons.html">아이콘</a> 에 있어요.</p>`,
});

// 파운데이션 - tokens.css 에서 값을 읽는다. 다크 블록은 따로 읽어 색의 다크 값으로 쓴다
const darkAt = tokensCss.indexOf(':root[data-theme="dark"]');
const darkEnd = tokensCss.indexOf('}', darkAt) + 1;
const lightCss = tokensCss.slice(0, darkAt) + tokensCss.slice(darkEnd);
const varMap = (css) => Object.fromEntries([...css.matchAll(/(--ybm-[a-z0-9_-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const LIGHT = varMap(lightCss);
const DARK = { ...LIGHT, ...varMap(tokensCss.slice(darkAt, darkEnd)) };
const resolve = (map, v, n = 0) => { const m = String(v).match(/^var\((--[a-z0-9_-]+)\)$/); return m && n < 12 ? resolve(map, map[m[1]], n + 1) : v; };
const tokRe = (re) => [...lightCss.matchAll(re)];

// 색: 레퍼런스 A 처럼 토큰 / 값(라이트, 다크 견본 + 값)
const colorGroups = [['bg', '배경'], ['fg', '글자와 아이콘'], ['stroke', '테두리']];
const colorTable = (k) => {
  const names = [...new Set(tokRe(new RegExp(`(--ybm-color-${k}-[a-z0-9-]+)\\s*:`, 'g')).map((m) => m[1]))];
  return table(['토큰', '값'], names.map((v) => {
    const l = resolve(LIGHT, `var(${v})`), d = resolve(DARK, `var(${v})`);
    return [`<code>${v}</code>`, `<span class="site-swatches"><span class="site-swatch" style="background: ${esc(l)}"></span><span class="site-swatch" style="background: ${esc(d)}"></span></span><code>${esc(l)} / ${esc(d)}</code>`];
  }));
};
// 파운데이션 그림 - 목록 카드와 각 페이지 큰 그림에 같이 쓴다 (DS 토큰으로 그린다)
const FV = {
  color: ['brand', 'positive', 'warning', 'neutral'].map((t, i) => `<span class="site-fv-swatch${i % 2 ? ' site-fv-swatch--pill' : ''}" style="background: var(--ybm-color-bg-${t}-solid)"></span>`).join(''),
  typography: '<span class="site-fv-type">Aa 가</span>',
  spacing: '<span class="site-fv-space"><span style="width: var(--ybm-space-x6)"></span><span style="width: var(--ybm-space-x12)"></span><span style="width: var(--ybm-space-x20)"></span></span>',
  shape: ['2xs', 'xl', 'pill'].map((r) => `<span class="site-fv-shape" style="border-radius: var(--ybm-shape-${r})"></span>`).join(''),
  elevation: ['raised', 'panel', 'modal'].map((e) => `<span class="site-fv-card" style="box-shadow: var(--ybm-elevation-${e})"></span>`).join(''),
  motion: '<svg class="site-fv-curve" viewBox="0 0 120 80"><path d="M8 72 C44 72 44 8 112 8"/><circle cx="8" cy="72" r="5"/><circle cx="112" cy="8" r="5"/></svg>',
  icons: `<span class="site-fv-icons">${['search', 'calendar', 'copy', 'link'].map((n) => `<i class="ds-icon ds-icon--${n}"></i>`).join('')}</span>`,
};
const fvBox = (slug, cover = false) => `<div class="site-tile__thumb${cover ? ' site-cover' : ''}" aria-hidden="true"${cover ? ' data-site-fit-max="2"' : ''}><div class="site-tile__inner"><div class="pv-stage">${FV[slug]}</div></div></div>`;
const foundName = Object.fromEntries(FOUND);
write({
  file: 'foundations/index.html', section: 'foundations', title: 'Foundations', layout: 'wide',
  body: `<header><h1 class="site-h1">Foundations</h1><p class="site-lead">색, 글자, 간격처럼 모든 화면의 바탕이 되는 값입니다. 화면에서는 값 대신 토큰 이름을 씁니다.</p></header>
<div class="site-tiles">${FOUND.map(([s, l]) => `<a class="site-tile" href="${s}.html">${fvBox(s)}<p class="site-tile__name">${esc(l)}</p></a>`).join('\n')}</div>`,
});
const foundPages = {
  color: {
    title: '색', lead: '배경, 글자와 아이콘, 테두리에 쓰는 시맨틱 색입니다. 값은 라이트 / 다크 순서예요.',
    body: `<h2 id="overview">개요</h2>
<p>화면에는 시맨틱 색(<code>bg</code>, <code>fg</code>, <code>stroke</code>)만 씁니다. 팔레트(<code>--ybm-color-palette-*</code>)는 시맨틱 색을 만드는 원료라 화면에 직접 쓰지 않아요. 색을 토큰으로만 쓰면 <code>data-theme="dark"</code> 하나로 다크 모드가 맞춰집니다.</p>
${colorGroups.map(([k, label]) => `<h2 id="${k}">${label}</h2>\n${colorTable(k)}`).join('\n')}`,
  },
  typography: {
    title: '글자', lead: '글꼴, 굵기, 크기와 줄 높이 토큰입니다.',
    body: `<h2 id="overview">개요</h2>
<p>글꼴은 Pretendard 입니다. 크기는 <code>--ybm-font-size-t01</code> ~ <code>t17</code>, 줄 높이는 같은 번호의 <code>--ybm-line-height-*</code> 를 짝으로 씁니다. 굵기는 regular 400, medium 500, semibold 600, bold 700 입니다.</p>
<p>한글 위계: 페이지 제목 40/48 medium(500), 리드 16/24 light(300), 섹션 제목 24/32 medium, 소제목 16/22 medium, 본문 16/28 regular, 보조 글 14 regular 입니다. 자간은 주지 않습니다.</p>
<h2 id="size">크기</h2>
${table(['토큰', '크기 / 줄 높이 (px)', '보기'], tokRe(/--ybm-font-size-(t\d\d): (\d+)px/g).map((m) => [`<code>${m[1]}</code>`, `${m[2]} / ${(LIGHT[`--ybm-line-height-${m[1]}`] || '').replace('px', '')}`, `<span class="site-sample" style="font-size: var(--ybm-font-size-${m[1]}); line-height: var(--ybm-line-height-${m[1]}); font-weight: var(--ybm-font-weight-bold)">가나다 Aa 123</span>`]))}
<h2 id="weight">굵기</h2>
${table(['토큰', '값', '보기'], tokRe(/--ybm-font-weight-([a-z]+): (\d+);/g).map((m) => [`<code>--ybm-font-weight-${m[1]}</code>`, m[2], `<span class="site-sample" style="font-size: var(--ybm-font-size-t06); font-weight: var(--ybm-font-weight-${m[1]})">가나다 Aa 123</span>`]))}`,
  },
  spacing: {
    title: '간격', lead: '여백과 간격에 쓰는 토큰입니다.',
    body: `<h2 id="overview">개요</h2>
<p>4px 단위를 기본으로 하고, 작은 간격은 2px 단위도 씁니다. 화면 좌우 여백은 <code>--ybm-space-x-global-gutter</code> 입니다.</p>
<h2 id="tokens">토큰</h2>
${table(['토큰', '값', '보기'], tokRe(/--ybm-space-(x[0-9_]+): (\d+)px/g).map((m) => [`<code>--ybm-space-${m[1]}</code>`, `${m[2]}px`, `<span class="site-bar" style="width: var(--ybm-space-${m[1]})"></span>`]))}`,
  },
  shape: {
    title: '모서리', lead: '부품 모서리 곡률 토큰입니다.',
    body: `<h2 id="overview">개요</h2>
<p>모서리는 쓰임 이름으로 씁니다. 어떤 영역에 <code>--ybm-shape-scale</code> 을 0 과 1 사이 값으로 덮어쓰면 그 안의 모서리만 덜 둥글게 바꿀 수 있어요.</p>
<h2 id="tokens">토큰</h2>
${table(['토큰', '값', '보기'], [...new Set(tokRe(/--ybm-shape-base-([a-z0-9]+):/g).map((m) => m[1]))].concat('pill').map((n) => {
  const px = n === 'pill' ? resolve(LIGHT, LIGHT['--ybm-shape-pill']) : resolve(LIGHT, LIGHT[`--ybm-shape-base-${n}`]);
  return [`<code>--ybm-shape-${n}</code>`, esc(px), `<span class="site-shape" style="border-radius: var(--ybm-shape-${n})"></span>`];
}))}`,
  },
  elevation: {
    title: '그림자', lead: '떠 있는 높이를 나타내는 그림자와 쌓는 순서입니다.',
    body: `<h2 id="shadow">그림자</h2>
<p>숫자 대신 쓰임 이름으로 씁니다.</p>
${table(['토큰', '쓰임', '보기'], tokRe(/--ybm-elevation-(raised|overlay|panel|floating|modal):\s+[^;]+;\s*\/\* ([^*]+) \*\//g).map((m) => [`<code>--ybm-elevation-${m[1]}</code>`, prose(m[2]), `<span class="site-shadow" style="box-shadow: var(--ybm-elevation-${m[1]})"></span>`]))}
<h2 id="z">쌓는 순서</h2>
${table(['토큰', '값'], tokRe(/--ybm-z-([a-z]+): (\d+);/g).map((m) => [`<code>--ybm-z-${m[1]}</code>`, m[2]]))}`,
  },
  motion: {
    title: '움직임', lead: '움직임의 길이와 속도 곡선입니다.',
    body: `<h2 id="duration">길이</h2>
${table(['토큰', '값'], tokRe(/--ybm-duration-([a-z]+): ([^;]+);/g).map((m) => [`<code>--ybm-duration-${m[1]}</code>`, `<code>${esc(m[2])}</code>`]))}
<h2 id="easing">속도 곡선</h2>
${table(['토큰', '값'], tokRe(/--ybm-easing-([a-z]+): ([^;]+);/g).map((m) => [`<code>--ybm-easing-${m[1]}</code>`, `<code>${esc(m[2])}</code>`]))}`,
  },
};
for (const [slug, p] of Object.entries(foundPages)) {
  write({
    file: `foundations/${slug}.html`, section: 'foundations', title: foundName[slug], desc: p.lead, pager: foundPager(slug),
    body: `<header><h1 class="site-h1">${esc(foundName[slug])}</h1><p class="site-lead">${esc(p.lead)}</p></header>\n${fvBox(slug, true)}\n${p.body}`,
  });
}

// 아이콘
const iconNames = [...new Set([...iconsCss.matchAll(/\.ds-icon--([a-z0-9-]+)\s*\{\s*--ds-icon:/g)].map((m) => m[1]))].sort();
// Lucide 전체 목록 - site/src/lucide-icons.json (site/lucide-update.mjs 로 만든다). 화면에는 site.js 가 그린다
const lucide = JSON.parse(fs.readFileSync(path.join(SITE, 'src/lucide-icons.json'), 'utf8'));
const lucideCount = Object.keys(lucide.icons).length;
write({
  file: 'foundations/icons.html', section: 'foundations', title: 'Iconography', pager: foundPager('icons'),
  body: `<header><h1 class="site-h1">Iconography</h1><p class="site-lead">UI 아이콘은 Lucide 한 가지만 씁니다. Lucide 전체 ${lucideCount.toLocaleString()}개 가운데 CSS 로 바로 쓸 수 있는 것은 ${iconNames.length}개이고, 나머지는 필요할 때 <code>icons.css</code> 에 한 줄 넣어 씁니다.</p></header>
${fvBox('icons', true)}
<div class="site-icon-search"><div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" placeholder="아이콘 찾기 (예: arrow, user, calendar)" aria-label="아이콘 찾기" data-site-lucide-search></div><span class="site-lucide-count" data-site-lucide-count></span></div>
<h2 id="use">쓰는 법</h2>
${example(`<div class="pv-stage"><i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i><i class="ds-icon ds-icon--search" aria-hidden="true"></i><i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i><span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--circle-check-solid ds-icon--lg" aria-hidden="true"></i></span></div>`, `<i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>  <!-- 16 -->\n<i class="ds-icon ds-icon--search" aria-hidden="true"></i>              <!-- 20 기본 -->\n<i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i>  <!-- 24 -->\n<span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></span>  <!-- 색은 부모 글자색 -->`)}
<ul class="site-list site-note">
  <li>색은 부모 글자색을 따릅니다. 크기는 <code>--ds-icon-size</code> 로도 바꿀 수 있어요.</li>
  <li>이름 끝에 <code>-solid</code> 가 붙은 것은 채움 모양입니다.</li>
  <li>뜻이 있는 아이콘만 쓰는 버튼에는 <code>aria-label</code> 을 꼭 답니다. 꾸밈용 아이콘은 <code>aria-hidden="true"</code>.</li>
  <li>필요한 아이콘이 없으면 Lucide 원본 그대로 <code>icons.css</code> 에 한 줄 추가합니다.</li>
</ul>
<h2 id="css">CSS 로 바로 쓰는 아이콘</h2>
<p>누르면 클래스 이름이 복사됩니다.</p>
<div class="site-icons">${iconNames.map((n) => `<button type="button" class="site-icon" data-site-copy="ds-icon--${n}" title="ds-icon--${n} 복사"><i class="ds-icon ds-icon--${n} ds-icon--lg" aria-hidden="true"></i><span>${n}</span></button>`).join('')}</div>
<h2 id="lucide">Lucide 전체 아이콘</h2>
<p>Lucide ${esc(lucide.version)} 의 아이콘 ${lucideCount.toLocaleString()}개입니다. CSS 표시가 붙은 것은 누르면 클래스 이름이, 나머지는 <code>icons.css</code> 에 넣을 줄이 복사됩니다. 위 찾기 칸에 영어 이름이나 뜻을 넣으면 두 목록이 함께 걸러집니다.</p>
<div class="site-icons" id="site-lucide" data-site-ds-icons="${esc(iconNames.join(' '))}"></div>
<p class="site-note">아이콘 그림은 Lucide(ISC 라이선스)입니다. <a class="ds-link" href="{root}assets/lucide-LICENSE.txt">라이선스 전문</a></p>
<script src="{root}assets/lucide-icons.js" defer></script>`,
});

// 스크립트
const jsRows = [...dsJs.slice(0, dsJs.indexOf('*/')).matchAll(/^\s*· (.+?) — (.+)$/gm)].map((m) => [`<b>${esc(m[1])}</b>`, inline(prose(m[2]))]);
write({
  file: 'get-started/scripts.html', section: 'get-started', title: 'Scripts', pager: gsPager('get-started/scripts.html'),
  body: `<header><h1 class="site-h1">Scripts</h1><p class="site-lead"><code>ybm-ds.js</code> 는 CSS 만으로 안 되는 동작만 맡습니다. 불러오기만 하면 HTML 속성을 보고 알아서 동작해요.</p></header>
<h2 id="features">하는 일</h2>
${table(['부품', '하는 일'], jsRows)}
<h2 id="api">직접 부르는 기능</h2>
${table(['기능', '쓰는 법'], [['창 열기, 닫기', '<code>YBM.openDialog(요소)</code>, <code>YBM.closeDialog(요소)</code>'], ['알림 띄우기', '<code>YBM.snackbar("저장했어요", { variant: "positive" })</code>'], ['새로 고침 끝내기', '<code>YBM.endRefresh(요소)</code>'], ['나중에 넣은 HTML 연결', '<code>YBM.init(요소)</code>']])}
${codeblock(`<button class="ds-btn" data-ds-open="confirm">열기</button>\n<dialog class="ds-dialog" id="confirm">… <button class="ds-btn" data-ds-close>닫기</button></dialog>\n\n<script>\n  YBM.snackbar("저장했어요", { variant: "positive", action: "확인" });\n</script>`)}`,
});

/* ---------------------------------------------------------------- Components */
// 맨 바깥 요소를 앞에서부터 n 개 꺼낸다 (글자만 있는 조각과 주석은 건너뛴다)
const VOID = new Set(['input', 'img', 'br', 'hr', 'meta', 'link', 'source', 'col', 'area', 'wbr']);
function topElements(html, n) {
  const out = [];
  const re = /<(\/?)([a-zA-Z][\w-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*?(\/?)>/g;
  let m, depth = 0, start = 0;
  while ((m = re.exec(html)) && out.length < n) {
    const tag = m[2].toLowerCase();
    if (m[1]) { if (--depth === 0) out.push(html.slice(start, re.lastIndex)); continue; }
    if (depth === 0) start = m.index;
    if (VOID.has(tag) || m[3]) { if (depth === 0) out.push(html.slice(start, re.lastIndex)); } else depth++;
  }
  return out;
}
// 썸네일 - 레퍼런스 B 처럼 회색 16:9 상자 가운데에 첫 예시의 앞 부품 몇 개를 실제 크기로
const cardThumb = (c) => {
  const first = stages(c.example)[0] || '';
  // 카드 전체가 링크라 안쪽 링크는 span 으로 바꾼다(링크 안 링크는 HTML 이 깨진다)
  const safe = topElements(first, 2).join('').replace(/ id="[^"]*"/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<a\b/g, '<span').replace(/<\/a>/g, '</span>');
  return `<div class="site-tile__thumb" aria-hidden="true"><div class="site-tile__inner" inert><div class="pv-stage">${safe}</div></div></div>`;
};
const coverThumb = (c) => cardThumb(c).replace('class="site-tile__thumb"', 'class="site-tile__thumb site-cover" data-site-fit-max="2"');
// 템플릿 목록 머리: 레퍼런스 A 목록 화면처럼 가운데 제목과 설명
const hero = (title, lead) => `<header class="site-hero"><h1 class="site-h1">${esc(title)}</h1><p class="site-lead">${esc(lead)}</p></header>`;
write({
  file: 'components/index.html', section: 'components', title: 'Components', layout: 'wide',
  body: `<header><h1 class="site-h1">Components</h1><p class="site-lead">화면을 만드는 부품 ${comps.length}종입니다. 모두 Figma 와 CSS 가 같은 이름, 같은 값으로 짝을 이룹니다.</p></header>
<div class="site-tiles">${compsAZ.map((c) => `<a class="site-tile" href="${c.slug}.html" data-site-item="${esc((c.name + ' ' + c.desc).toLowerCase())}">${cardThumb(c)}<p class="site-tile__name">${esc(c.name.split(' · ')[0])}</p></a>`).join('\n')}</div>
<div class="ds-empty site-empty-result" hidden><span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span><p class="ds-empty__title">찾는 컴포넌트가 없어요</p><p class="ds-empty__desc">다른 이름으로 찾아보세요.</p></div>`,
});

// components.json 의 props 글을 항목으로 나눈다: "size `a/b`" 는 값 목록, 나머지는 켜고 끄는 속성이나 설명
function propsTable(c) {
  const items = [];
  let cur = '', tick = false;
  const src = c.props || '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '`') tick = !tick;
    // 백틱 밖의 " · ", ", ", " / " 에서만 나눈다 (값 안의 a·b, a/b 는 그대로)
    const sep = !tick && ((ch === ',' && src[i + 1] === ' ') || ((ch === '·' || ch === '/') && src[i - 1] === ' ' && src[i + 1] === ' '));
    if (sep) { items.push(cur); cur = ''; continue; }
    cur += ch;
  }
  items.push(cur);
  const rows = [], flags = [], notes = [];
  for (let it of items.map((s) => s.trim()).filter(Boolean)) {
    const m = it.match(/^(?:([A-Za-z][\w ]*?)\s+)?([A-Za-z][\w-]*)\s*`([^`]+)`\s*(.*)$/);
    if (m) {
      const vals = m[3].split(/[·/]/).map((v) => v.trim()).filter(Boolean);
      rows.push([`<code>${esc(((m[1] ? m[1] + ' ' : '') + m[2]).trim())}</code>`, vals.map((v) => `<span class="ds-badge">${esc(v)}</span>`).join(' ') + (m[4] ? ` <span class="site-card__no">${esc(m[4].replace(/[()]/g, ''))}</span>` : '')]);
    } else if (/^[A-Za-z][\w-]*$/.test(it)) flags.push(`<code>${esc(it)}</code>`);
    else notes.push(inline(prose(it)));
  }
  if (flags.length) rows.push(['켜고 끄는 속성', flags.join(' ')]);
  return { rows, rest: notes.join(', ') };
}
comps.forEach((c) => {
  const i = compsAZ.indexOf(c);
  const prev = compsAZ[i - 1], next = compsAZ[i + 1];
  const { rows, rest } = propsTable(c);
  const sections = [];
  sections.push(`<h2 id="preview">미리보기</h2>${c.example ? example(c.example, codeOf(c.example) || c.markup) : '<p>아직 예시가 없어요.</p>'}`);
  if (c.markup) sections.push(`<h2 id="usage">사용법</h2><p>아래 구조를 그대로 쓰고, 대괄호 <code>[ ]</code> 안은 필요할 때만 넣습니다.</p>${codeblock(c.markup)}`);
  if (rows.length || rest) sections.push(`<h2 id="props">속성</h2><p>Figma 속성 이름을 그대로 <code>data-*</code> 속성으로 씁니다.</p>${rows.length ? table(['속성', '값'], rows) : ''}${rest ? `<p class="site-note">그 밖에: ${rest}</p>` : ''}`);
  if (c.vars.length) sections.push(`<h2 id="vars">바꿀 수 있는 변수</h2><p>서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.</p>${table(['변수', '기본값'], c.vars.map(([n, v]) => [`<code>${esc(n)}</code>`, `<code>${esc(v)}</code>`]))}`);
  if (c.dos.length) sections.push(`<h2 id="guide">사용 지침</h2><ul class="site-dos">${c.dos.map((d) => `<li>${inline(d)}</li>`).join('')}</ul>`);
  if (c.spec) sections.push(`<h2 id="spec">디자인 값</h2><p>Figma 와 CSS 가 함께 따르는 크기, 여백, 색입니다.</p><pre class="site-spec">${esc(c.spec)}</pre>`);
  write({
    file: `components/${c.slug}.html`, section: 'components', title: c.name.split(' · ')[0], desc: c.desc,
    pager: [prev && { href: `${prev.slug}.html`, label: prev.name.split(' · ')[0] }, next && { href: `${next.slug}.html`, label: next.name.split(' · ')[0] }],
    body: `<header>
  <h1 class="site-h1">${esc(c.name)}</h1>
  <p class="site-lead">${esc(c.desc)}</p>
</header>
${coverThumb(c)}
${sections.join('\n')}`,
  });
});

/* ---------------------------------------------------------------- Templates */
const tplGroups = [...new Set(templates.map((t) => t.group))];
write({
  file: 'templates/index.html', section: 'templates', title: 'Templates', layout: 'full',
  body: `${hero('Templates', '자주 쓰는 화면을 DS 부품으로 미리 조립해 두었습니다. 통째로 복사해 출발점으로 쓰고, 모두 모바일부터 PC 까지 맞춰집니다.')}
<div class="site-toolbar site-toolbar--center">
  <div class="ds-chiptabs" role="tablist" aria-label="분류">
    <button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true" data-site-filter="">전체</button>
    ${tplGroups.map((g) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-site-filter="${esc(g)}">${esc(g)}</button>`).join('\n    ')}
  </div>
</div>
<div class="site-grid site-tpl-grid">
${templates.map((t) => `<a class="site-card" href="${t.slug}.html" data-site-item="${esc((t.name + ' ' + t.en + ' ' + t.desc).toLowerCase())}" data-site-cat="${esc(t.group)}"><div class="site-tpl-thumb" aria-hidden="true"><iframe src="pages/${t.slug}.html" title="${esc(t.name)} 미리보기" tabindex="-1" data-site-frame></iframe></div><div class="site-card__body"><p class="site-card__title">${esc(t.name)} <span class="site-card__no">${esc(t.en)}</span></p><p class="site-card__desc">${esc(t.desc)}</p></div></a>`).join('\n')}
</div>
<div class="ds-empty site-empty-result" hidden><span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span><p class="ds-empty__title">해당하는 템플릿이 없어요</p></div>`,
});
templates.forEach((t) => {
  // 쓴 컴포넌트는 템플릿 파일의 class 를 보고 자동으로 찾는다
  const src = fs.readFileSync(path.join(SITE, 'templates/pages', t.slug + '.html'), 'utf8');
  const classes = new Set((src.match(/class="[^"]*"/g) || []).join(' ').match(/\bds-[a-z0-9_-]+/g) || []);
  const used = comps.filter((c) => c.classes.some((k) => classes.has(k.slice(1))));
  write({
    file: `templates/${t.slug}.html`, section: 'templates', title: t.en, desc: t.desc, layout: 'wide',
    body: `<header>
  <p class="site-eyebrow"><a href="index.html">Templates</a> / ${esc(t.group)}</p>
  <h1 class="site-h1">${esc(t.en)}</h1>
  <p class="site-lead">${esc(t.desc)}</p>
  <div class="site-meta">${btn(`pages/${t.slug}.html`, '새 창으로 보기', 'neutralSolid', 'small', 'external-link').replace('href="pages', 'target="_blank" rel="noopener" href="pages')}</div>
</header>
<div class="site-frame">
  <div class="site-frame__bar">
    <div class="ds-segmented" role="group" aria-label="보기 방식"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-view="preview">미리보기</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-view="code">코드</button></div>
    <div class="ds-segmented" role="group" aria-label="화면 폭"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-device="desktop">PC</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-device="tablet">태블릿</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-device="mobile">모바일</button></div>
  </div>
  <div class="site-frame__stage" data-device="desktop"><iframe src="pages/${t.slug}.html" title="${esc(t.name)} 템플릿" data-site-frame></iframe></div>
  <div class="site-frame__code" hidden>${codeblock('불러오는 중…').replace('<figure class="ds-codeblock"', `<figure class="ds-codeblock" data-site-src="pages/${t.slug}.html"`)}</div>
</div>
${t.note ? `<h2 id="responsive">화면 폭에 따라</h2><p>${esc(t.note)}</p>` : ''}
${used.length ? `<h2 id="components">쓴 컴포넌트</h2><div class="site-links">${used.map((c) => `<a class="ds-chip" data-size="small" href="../components/${c.slug}.html">${esc(c.name.split(' · ')[0])}</a>`).join('')}</div>` : ''}`,
  });
});

/* ---------------------------------------------------------------- 자산 */
fs.mkdirSync(path.join(SITE, 'assets'), { recursive: true });
fs.copyFileSync(path.join(SITE, 'src/site.js'), path.join(SITE, 'assets/site.js'));
fs.copyFileSync(path.join(SITE, 'src/logo-ybmnet.svg'), path.join(SITE, 'assets/logo-ybmnet.svg'));
fs.writeFileSync(path.join(SITE, 'assets/lucide-icons.js'), `/* Lucide ${lucide.version} (ISC) - 생성물: site/src/lucide-icons.json */\nwindow.LUCIDE = ${JSON.stringify(lucide)};\n`);
fs.copyFileSync(path.join(SITE, 'src/lucide-LICENSE.txt'), path.join(SITE, 'assets/lucide-LICENSE.txt'));
// 사이트 전용 아이콘(DS 아이콘 세트에 없는 화면 모드, 저장소 링크용). Lucide 원본 경로를 DS 와 같은 방식(mask)으로 쓴다
const SITE_ICONS = {
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
};
const svgUri = (b) => 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + b + '</svg>') + '")';
fs.writeFileSync(path.join(SITE, 'assets/site.css'), fs.readFileSync(path.join(SITE, 'src/site.css'), 'utf8')
  + '\n/* 사이트 전용 아이콘 - build.mjs 가 붙인다 */\n'
  + Object.entries(SITE_ICONS).map(([n, b]) => `.site-i--${n} { --ds-icon: ${svgUri(b)}; }`).join('\n') + '\n');

console.log(`  ✔ 사이트 ${written.length}쪽 생성 (컴포넌트 ${comps.length}, 템플릿 ${templates.length})`);

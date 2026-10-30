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
function example(previewHtml, code, label = '예시') {
  return `<div class="site-example">
  <div class="site-example__bar"><span class="site-example__label">${esc(label)}</span>
    <div class="ds-segmented" role="group" aria-label="보기 방식"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-view="preview">미리보기</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-view="code">코드</button></div></div>
  <div class="site-example__preview">${previewHtml}</div>
  <div class="site-example__code" hidden>${codeblock(code)}</div>
</div>`;
}
const table = (head, rows) => `<div class="ds-table-wrap"><table class="ds-table" data-density="compact">
<thead><tr>${head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`;
const btn = (href, label, variant = 'neutralWeak', size = 'small', icon = '') =>
  `<a class="ds-btn" data-variant="${variant}" data-size="${size}" href="${href}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${icon ? `<i class="ds-icon ds-icon--${icon} ds-icon--sm" aria-hidden="true"></i>` : ''}${esc(label)}</a>`;

const NAV = [['get-started', 'Get Started', 'index.html'], ['components', 'Components', 'components/index.html'], ['templates', 'Templates', 'templates/index.html']];
const GS = [['가이드', [['get-started/usage.html', '사용 규칙'], ['get-started/scripts.html', '스크립트']]], ['파운데이션', [['get-started/tokens.html', '토큰'], ['get-started/icons.html', '아이콘']]]];

function sideNav(section, file, root) {
  const item = (href, label) => `<a class="site-nav__item" href="${root}${href}"${href === file ? ' aria-current="page"' : ''}>${esc(label)}</a>`;
  const group = (label, items, open) => `<details class="site-nav__group"${open ? ' open' : ''}><summary>${esc(label)}<i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i></summary>${items.join('')}</details>`;
  const parts = [];
  if (section === 'get-started') {
    parts.push(item('index.html', '시작하기'));
    for (const [label, list] of GS) parts.push(group(label, list.map(([h, l]) => item(h, l)), true));
  }
  if (section === 'components') {
    parts.push(item('components/index.html', '전체 보기'));
    for (const [cat, label] of CATS) {
      const list = comps.filter((c) => c.cat === cat);
      if (list.length) parts.push(group(label, list.map((c) => item(`components/${c.slug}.html`, c.name.split(' · ')[0])), list.some((c) => file === `components/${c.slug}.html`) || file === 'components/index.html'));
    }
  }
  if (section === 'templates') {
    parts.push(item('templates/index.html', '전체 보기'));
    for (const g of [...new Set(templates.map((t) => t.group))]) parts.push(group(g, templates.filter((t) => t.group === g).map((t) => item(`templates/${t.slug}.html`, t.name)), true));
  }
  const mobile = `<div class="site-side__mobile"><nav class="site-nav" aria-label="주요 메뉴">${NAV.map(([k, l, h]) => `<a class="site-nav__item" href="${root}${h}"${k === section ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav><div class="site-nav__sep"></div></div>`;
  return `<aside class="site-side" id="site-side" aria-label="페이지 목록">
  <div class="site-side__top"><b>메뉴</b><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" data-site-close aria-label="메뉴 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
  ${mobile}
  <nav class="site-nav" aria-label="${esc(NAV.find((n) => n[0] === section)[1])} 메뉴">${parts.join('\n')}</nav>
</aside>`;
}

const iconBtn = (attrs, label, inner) => `<button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="${esc(label)}" ${attrs}>${inner}</button>`;
const iconLink = (href, label, icon, extra = '') => `<a class="ds-btn${extra}" data-variant="ghost" data-size="small" data-layout="iconOnly" href="${href}" target="_blank" rel="noopener" aria-label="${esc(label)}"><i class="ds-icon ${icon}" aria-hidden="true"></i></a>`;

function page({ file, title, section, body, wide = false, desc = '' }) {
  const depth = file.split('/').length - 1;
  const root = '../'.repeat(depth);
  // h2 에 제목 링크를 달고 목차를 만든다
  const heads = [];
  body = body.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (m, id, inner) => {
    heads.push([id, inner.replace(/<[^>]+>/g, '')]);
    return `<h2 id="${id}">${inner}<a class="site-anchor" href="#${id}" aria-label="이 제목 링크"><i class="ds-icon ds-icon--link ds-icon--sm" aria-hidden="true"></i></a></h2>`;
  });
  const hasToc = !wide && heads.length > 1;
  const tocSelect = hasToc ? `<div class="site-toc-select"><select aria-label="이 페이지 목차" data-site-toc>${heads.map(([id, t]) => `<option value="${id}">${esc(t)}</option>`).join('')}</select><i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i></div>` : '';
  body = body.replace('</header>', `</header>\n${tocSelect}`);
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
  <nav class="ds-topnav__menu" aria-label="주요 메뉴">
    ${NAV.map(([k, l, h]) => `<a class="ds-topnav__item" href="${root}${h}"${k === section ? ' aria-current="page"' : ''}>${l}</a>`).join('\n    ')}
  </nav>
  <div class="site-top__end">
    ${iconBtn('data-site-theme-toggle', '화면 모드 바꾸기', '<i class="ds-icon site-i--moon" aria-hidden="true"></i><i class="ds-icon site-i--sun" aria-hidden="true"></i>').replace('class="ds-btn"', 'class="ds-btn site-theme-btn"')}
    ${iconLink(FIGMA + '2274-1143', 'Figma 파일', 'site-i--figma', ' site-only-wide')}
    ${iconLink(GITHUB, 'GitHub 저장소', 'site-i--github', ' site-only-wide')}
    <a class="ds-btn site-cta" data-variant="neutralSolid" data-size="xsmall" href="${root}index.html#ai">시작하기</a>
    ${iconBtn('data-site-menu aria-controls="site-side" aria-expanded="false"', '메뉴 열기', '<i class="ds-icon ds-icon--menu" aria-hidden="true"></i>').replace('class="ds-btn"', 'class="ds-btn site-menu-btn"')}
  </div>
</header>
<div class="site-body${wide ? ' site-body--wide' : ''}">
${sideNav(section, file, root)}
<div class="site-scrim" data-site-close></div>
<main class="site-main" id="main">
<article class="site-doc">
${body}
</article>
</main>
${hasToc ? `<aside class="site-toc" aria-label="이 페이지 목차"><nav>${heads.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('')}</nav></aside>` : ''}
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
- 글자는 한국어, 제목 자간 -0.02em, 본문 word-break: keep-all.
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
  file: 'index.html', section: 'get-started', title: '시작하기', desc: 'YBM DS 를 AI 와 함께 바로 시작하는 방법',
  body: `<header>
  <h1 class="site-h1">시작하기</h1>
  <p class="site-lead">YBM DS 를 프로젝트에 넣고 바로 화면을 만들어 보세요.</p>
</header>

<h2 id="ai">AI 로 빠르게 시작하기</h2>
<p>아래 내용을 AI 코딩 도구(ChatGPT, Claude, Cursor 등)에 붙여 넣으면 설치부터 규칙까지 알아서 맞춰요.</p>
<span class="site-label">${esc(prompts[0][0])}</span>
${codeblock(prompts[0][2], 'text', ' data-wrap')}
<p>그다음 만들고 싶은 화면을 말로 설명하세요. 대괄호 안만 내 상황에 맞게 바꾸면 됩니다. 비슷한 화면이 <a class="ds-link" href="templates/index.html">템플릿</a> 에 있으면 그 화면에서 출발해요.</p>
<span class="site-label">${esc(prompts[1][0])}</span>
${codeblock(prompts[1][2], 'text', ' data-wrap')}
<p>이미 만든 화면이 있다면 DS 규칙을 지키는지 점검하게 할 수 있어요.</p>
<span class="site-label">${esc(prompts[2][0])}</span>
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
  <a class="site-card" href="get-started/usage.html"><div class="site-card__body"><p class="site-card__title">사용 규칙</p><p class="site-card__desc">불러오는 순서, 커스텀, 다크 모드, 반응형 기준점을 알아봅니다.</p></div></a>
  <a class="site-card" href="components/index.html"><div class="site-card__body"><p class="site-card__title">컴포넌트 ${comps.length}종</p><p class="site-card__desc">부품마다 미리보기, 사용법, 속성, 사용 지침을 봅니다.</p></div></a>
  <a class="site-card" href="templates/index.html"><div class="site-card__body"><p class="site-card__title">템플릿</p><p class="site-card__desc">자주 쓰는 화면을 통째로 복사해 출발점으로 씁니다.</p></div></a>
</div>`.replaceAll('href="components/', 'href="{root}components/').replaceAll('href="templates/', 'href="{root}templates/').replaceAll('href="get-started/', 'href="{root}get-started/'),
});

// 사용 규칙
const bpRows = [['sm', '480px', '큰 휴대폰'], ['md', '768px', '태블릿, PC 부품으로 바뀌는 기준'], ['lg', '1280px', '넓은 PC, 3단 배치'], ['xl', '1440px', '아주 넓은 화면']];
write({
  file: 'get-started/usage.html', section: 'get-started', title: '사용 규칙',
  body: `<header><h1 class="site-h1">사용 규칙</h1><p class="site-lead">DS 를 불러오는 순서와 모양을 바꾸는 방법, 화면 모드와 반응형 기준을 정리했습니다.</p></header>

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
<p>UI 아이콘은 Lucide 한 가지만 씁니다. 색은 부모 글자색을 따르고, 크기는 기본 20, <code>ds-icon--sm</code> 16, <code>ds-icon--lg</code> 24 입니다. 목록은 <a class="ds-link" href="{root}get-started/icons.html">아이콘</a> 에 있어요.</p>`,
});

// 토큰
const tokRe = (re) => [...tokensCss.slice(0, tokensCss.indexOf(':root[data-theme="dark"]')).matchAll(re)];
const colorGroups = { bg: '배경 (bg)', fg: '글자와 아이콘 (fg)', stroke: '테두리 (stroke)' };
const colorTables = Object.entries(colorGroups).map(([k, label]) => {
  const rows = tokRe(new RegExp(`(--ybm-color-${k}-[a-z0-9-]+)\\s*:`, 'g')).map((m) => m[1]);
  const uniq = [...new Set(rows)];
  return `<h3>${label}</h3>${table(['미리보기', 'CSS 변수'], uniq.map((v) => [k === 'fg' ? `<b style="color: var(${v}); font-size: var(--ybm-font-size-t07)">가</b>` : `<span class="site-swatch" style="${k === 'stroke' ? `background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 0 0 2px var(${v})` : `background: var(${v})`}"></span>`, `<code>${v}</code>`]))}`;
}).join('\n');
const typeRows = tokRe(/--ybm-font-size-(t\d\d): (\d+)px/g).map((m) => {
  const lh = (tokensCss.match(new RegExp(`--ybm-line-height-${m[1]}: (\\d+)px`)) || [])[1];
  return [`<code>${m[1]}</code>`, `${m[2]} / ${lh}`, `<span class="site-sample" style="font-size: var(--ybm-font-size-${m[1]}); line-height: var(--ybm-line-height-${m[1]}); font-weight: var(--ybm-font-weight-bold); letter-spacing: ${+m[2] >= 20 ? '-0.02em' : +m[2] >= 15 ? '-0.01em' : '0'}">가나다 Aa 123</span>`];
});
const spaceRows = tokRe(/--ybm-space-(x[0-9_]+): (\d+)px/g).map((m) => [`<code>--ybm-space-${m[1]}</code>`, `${m[2]}px`, `<span class="site-bar" style="width: var(--ybm-space-${m[1]})"></span>`]);
const shapeRows = tokRe(/--ybm-shape-([a-z0-9]+): ([^;]+);/g).map((m) => [`<code>--ybm-shape-${m[1]}</code>`, esc(m[2]), `<span class="site-shape" style="border-radius: var(--ybm-shape-${m[1]})"></span>`]);
const elevRows = tokRe(/--ybm-elevation-(raised|overlay|panel|floating|modal):\s+[^;]+;\s*\/\* ([^*]+) \*\//g).map((m) => [`<code>--ybm-elevation-${m[1]}</code>`, prose(m[2]), `<span class="site-shadow" style="box-shadow: var(--ybm-elevation-${m[1]})"></span>`]);
const motionRows = tokRe(/--ybm-(duration|easing)-([a-z]+): ([^;]+);/g).map((m) => [`<code>--ybm-${m[1]}-${m[2]}</code>`, `<code>${esc(m[3])}</code>`]);
const zRows = tokRe(/--ybm-z-([a-z]+): (\d+);/g).map((m) => [`<code>--ybm-z-${m[1]}</code>`, m[2]]);
write({
  file: 'get-started/tokens.html', section: 'get-started', title: '토큰',
  body: `<header><h1 class="site-h1">토큰</h1><p class="site-lead">색, 글자, 간격, 모서리, 그림자, 움직임 값입니다. 화면에서는 값 대신 CSS 변수 이름을 씁니다. 위쪽의 라이트/다크를 바꾸면 색이 함께 바뀝니다.</p></header>
<h2 id="color">색</h2>
<p>화면에는 시맨틱 색(<code>bg</code>, <code>fg</code>, <code>stroke</code>)만 씁니다. 팔레트(<code>--ybm-color-palette-*</code>)는 시맨틱 색을 만드는 원료라 화면에 직접 쓰지 않아요.</p>
${colorTables}
<h2 id="type">글자</h2>
<p>글꼴은 Pretendard 입니다. 크기는 <code>--ybm-font-size-t01</code> ~ <code>t17</code>, 줄 높이는 같은 번호의 <code>--ybm-line-height-*</code> 를 짝으로 씁니다. 굵기는 regular 400, medium 500, semibold 600, bold 700 입니다.</p>
<p>한글은 20px 이상 제목에 자간 -0.02em, 15~19px 에 -0.01em 을 주고 14px 이하는 그대로 둡니다. 제목은 bold, 소제목 semibold, 본문 regular, 라벨 medium 을 기본으로 합니다.</p>
${table(['이름', '크기 / 줄 높이 (px)', '보기'], typeRows)}
<h2 id="space">간격</h2>
<p>4px 단위를 기본으로 하고, 작은 간격은 2px 단위도 씁니다. 화면 좌우 여백은 <code>--ybm-space-x-global-gutter</code> 입니다.</p>
${table(['CSS 변수', '값', '보기'], spaceRows)}
<h2 id="shape">모서리</h2>
${table(['CSS 변수', '값', '보기'], shapeRows)}
<h2 id="elevation">그림자</h2>
<p>숫자 대신 쓰임 이름으로 씁니다.</p>
${table(['CSS 변수', '쓰임', '보기'], elevRows)}
<h2 id="motion">움직임</h2>
${table(['CSS 변수', '값'], motionRows)}
<h2 id="z">쌓는 순서</h2>
${table(['CSS 변수', '값'], zRows)}`,
});

// 아이콘
const iconNames = [...new Set([...iconsCss.matchAll(/\.ds-icon--([a-z0-9-]+)\s*\{\s*--ds-icon:/g)].map((m) => m[1]))].sort();
write({
  file: 'get-started/icons.html', section: 'get-started', title: '아이콘',
  body: `<header><h1 class="site-h1">아이콘</h1><p class="site-lead">UI 아이콘은 Lucide 한 가지만 씁니다. 지금 CSS 로 바로 쓸 수 있는 아이콘은 ${iconNames.length}개이고, 누르면 클래스 이름이 복사됩니다.</p></header>
<h2 id="use">쓰는 법</h2>
${example(`<div class="pv-stage"><i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i><i class="ds-icon ds-icon--search" aria-hidden="true"></i><i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i><span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--heart-solid ds-icon--lg" aria-hidden="true"></i></span></div>`, `<i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>  <!-- 16 -->\n<i class="ds-icon ds-icon--search" aria-hidden="true"></i>              <!-- 20 기본 -->\n<i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i>  <!-- 24 -->\n<span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--heart-solid" aria-hidden="true"></i></span>  <!-- 색은 부모 글자색 -->`)}
<ul class="site-list site-note">
  <li>색은 부모 글자색을 따릅니다. 크기는 <code>--ds-icon-size</code> 로도 바꿀 수 있어요.</li>
  <li>이름 끝에 <code>-solid</code> 가 붙은 것은 채움 모양입니다.</li>
  <li>뜻이 있는 아이콘만 쓰는 버튼에는 <code>aria-label</code> 을 꼭 답니다. 꾸밈용 아이콘은 <code>aria-hidden="true"</code>.</li>
  <li>필요한 아이콘이 없으면 Lucide 원본 그대로 <code>icons.css</code> 에 한 줄 추가합니다.</li>
</ul>
<h2 id="all">전체 아이콘</h2>
<div class="site-icons">${iconNames.map((n) => `<button type="button" class="site-icon" data-site-copy="ds-icon--${n}" title="ds-icon--${n} 복사"><i class="ds-icon ds-icon--${n} ds-icon--lg" aria-hidden="true"></i><span>${n}</span></button>`).join('')}</div>`,
});

// 스크립트
const jsRows = [...dsJs.slice(0, dsJs.indexOf('*/')).matchAll(/^\s*· (.+?) — (.+)$/gm)].map((m) => [`<b>${esc(m[1])}</b>`, inline(prose(m[2]))]);
write({
  file: 'get-started/scripts.html', section: 'get-started', title: '스크립트',
  body: `<header><h1 class="site-h1">스크립트</h1><p class="site-lead"><code>ybm-ds.js</code> 는 CSS 만으로 안 되는 동작만 맡습니다. 불러오기만 하면 HTML 속성을 보고 알아서 동작해요.</p></header>
<h2 id="features">하는 일</h2>
${table(['부품', '하는 일'], jsRows)}
<h2 id="api">직접 부르는 기능</h2>
${table(['기능', '쓰는 법'], [['창 열기, 닫기', '<code>YBM.openDialog(요소)</code>, <code>YBM.closeDialog(요소)</code>'], ['알림 띄우기', '<code>YBM.snackbar("저장했어요", { variant: "positive" })</code>'], ['새로 고침 끝내기', '<code>YBM.endRefresh(요소)</code>'], ['나중에 넣은 HTML 연결', '<code>YBM.init(요소)</code>']])}
${codeblock(`<button class="ds-btn" data-ds-open="confirm">열기</button>\n<dialog class="ds-dialog" id="confirm">… <button class="ds-btn" data-ds-close>닫기</button></dialog>\n\n<script>\n  YBM.snackbar("저장했어요", { variant: "positive", action: "확인" });\n</script>`)}`,
});

/* ---------------------------------------------------------------- Components */
const cardThumb = (c) => {
  const first = stages(c.example)[0] || '';
  // 카드 전체가 링크라 안쪽 링크는 span 으로 바꾼다(링크 안 링크는 HTML 이 깨진다)
  const safe = first.replace(/ id="[^"]*"/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<a\b/g, '<span').replace(/<\/a>/g, '</span>');
  return `<div class="site-card__thumb" aria-hidden="true"><div class="site-card__thumb-inner" inert><div class="pv-stage">${safe}</div></div></div>`;
};
write({
  file: 'components/index.html', section: 'components', title: 'Components', wide: true,
  body: `<header><p class="site-eyebrow">Components</p><h1 class="site-h1">컴포넌트</h1><p class="site-lead">화면을 만드는 부품 ${comps.length}종입니다. 모두 Figma 와 CSS 가 같은 이름, 같은 값으로 짝을 이룹니다.</p></header>
<div class="site-toolbar">
  <div class="ds-input" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" placeholder="이름이나 설명으로 찾기" aria-label="컴포넌트 찾기" data-site-search><button type="button" class="ds-input__clear" aria-label="지우기"></button></div>
  <div class="ds-chiptabs" role="tablist" aria-label="분류">
    <button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true" data-site-filter="">전체</button>
    ${CATS.map(([k, l]) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-site-filter="${k}">${l}</button>`).join('\n    ')}
  </div>
</div>
${CATS.map(([cat, label]) => {
  const list = comps.filter((c) => c.cat === cat);
  if (!list.length) return '';
  return `<section class="site-group"><h2 class="site-group__title" id="cat-${slugify(cat)}">${label}<small>${list.length}</small></h2>
<div class="site-grid">${list.map((c) => `<a class="site-card" href="${c.slug}.html" data-site-item="${esc((c.name + ' ' + c.desc).toLowerCase())}" data-site-cat="${esc(cat)}">${cardThumb(c)}<div class="site-card__body"><p class="site-card__title"><span class="site-card__no">${c.no}</span>${esc(c.name.split(' · ')[0])}</p><p class="site-card__desc">${esc(c.desc)}</p></div></a>`).join('\n')}</div></section>`;
}).join('\n')}
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
comps.forEach((c, i) => {
  const prev = comps[i - 1], next = comps[i + 1];
  const { rows, rest } = propsTable(c);
  const figmaBtns = c.figma.map((f) => btn(FIGMA + f.id.replace(':', '-'), f.part ? `Figma - ${f.part}` : 'Figma', 'neutralOutline', 'xsmall', 'external-link')).join(' ');
  const sections = [];
  sections.push(`<h2 id="preview">미리보기</h2>${c.example ? example(c.example, codeOf(c.example) || c.markup) : '<p>아직 예시가 없어요.</p>'}`);
  if (c.markup) sections.push(`<h2 id="usage">사용법</h2><p>아래 구조를 그대로 쓰고, 대괄호 <code>[ ]</code> 안은 필요할 때만 넣습니다.</p>${codeblock(c.markup)}`);
  if (rows.length || rest) sections.push(`<h2 id="props">속성</h2><p>Figma 속성 이름을 그대로 <code>data-*</code> 속성으로 씁니다.</p>${rows.length ? table(['속성', '값'], rows) : ''}${rest ? `<p class="site-note">그 밖에: ${rest}</p>` : ''}`);
  if (c.vars.length) sections.push(`<h2 id="vars">바꿀 수 있는 변수</h2><p>서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.</p>${table(['변수', '기본값'], c.vars.map(([n, v]) => [`<code>${esc(n)}</code>`, `<code>${esc(v)}</code>`]))}`);
  if (c.dos.length) sections.push(`<h2 id="guide">사용 지침</h2><ul class="site-dos">${c.dos.map((d) => `<li>${inline(d)}</li>`).join('')}</ul>`);
  if (c.spec) sections.push(`<h2 id="spec">디자인 값</h2><p>Figma 와 CSS 가 함께 따르는 크기, 여백, 색입니다.</p><pre class="site-spec">${esc(c.spec)}</pre>`);
  write({
    file: `components/${c.slug}.html`, section: 'components', title: c.name.split(' · ')[0], desc: c.desc,
    body: `<header>
  <p class="site-eyebrow"><a href="index.html">Components</a> / ${esc(catLabel[c.cat])}</p>
  <h1 class="site-h1">${esc(c.name)}</h1>
  <p class="site-lead">${esc(c.desc)}</p>
  <div class="site-meta"><span class="ds-badge" data-size="large">${c.no}</span> ${c.classes.map((k) => `<span class="ds-badge" data-size="large" data-variant="outline">${esc(k)}</span>`).join(' ')} ${figmaBtns}</div>
</header>
${sections.join('\n')}
<nav class="site-pager" aria-label="이전, 다음 컴포넌트">${prev ? `<a href="${prev.slug}.html" data-dir="prev"><small>이전</small><b>${esc(prev.name.split(' · ')[0])}</b></a>` : '<span></span>'}${next ? `<a href="${next.slug}.html" data-dir="next"><small>다음</small><b>${esc(next.name.split(' · ')[0])}</b></a>` : ''}</nav>`,
  });
});

/* ---------------------------------------------------------------- Templates */
const tplGroups = [...new Set(templates.map((t) => t.group))];
write({
  file: 'templates/index.html', section: 'templates', title: 'Templates', wide: true,
  body: `<header><p class="site-eyebrow">Templates</p><h1 class="site-h1">템플릿</h1><p class="site-lead">자주 쓰는 화면을 DS 부품으로 미리 조립해 두었습니다. 통째로 복사해 출발점으로 쓰고, 모두 모바일부터 PC 까지 맞춰집니다.</p></header>
<div class="site-toolbar">
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
    file: `templates/${t.slug}.html`, section: 'templates', title: t.name, desc: t.desc, wide: true,
    body: `<header>
  <p class="site-eyebrow"><a href="index.html">Templates</a> / ${esc(t.group)}</p>
  <h1 class="site-h1">${esc(t.name)}</h1>
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

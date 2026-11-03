// YBM DS 문서 사이트 생성기 - node site/build.mjs
// 바로 위 폴더(DS 정본)를 읽기만 하고 site/ 아래에 정적 HTML을 만든다. 패키지 설치 필요 없음.
//   읽는 것: components.json, dist/components.css(머리 주석, --ds-* 변수), dist/tokens.css, dist/icons.css,
//            dist/ybm-ds.js(머리 주석), index.html(컴포넌트 예시), README.md(6.2 사용 지침), site/src/*
//   만드는 것: site/index.html, site/get-started/*.html, site/foundations/*.html, site/components/*.html, site/templates/*.html, site/assets/*
//   손으로 쓰는 것(생성 안 함): site/templates/pages/*.html (템플릿 원본), site/src/*
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { linkPlan } from '../tokens/links.mjs';
import { writeMarkdown } from './md.mjs';

const SITE = path.dirname(fileURLToPath(import.meta.url));
// 사이트 CSS / JS 주소에 붙이는 버전 - 내용이 바뀌면 값이 바뀌어 브라우저가 예전 파일을 쓰지 않는다
const ASSET_V = crypto.createHash('sha1').update(['src/site.css', 'src/site.js', 'src/brand-mono.css', 'build.mjs'].map((f) => fs.readFileSync(path.join(SITE, f))).join('')).digest('hex').slice(0, 8);
const DS = path.resolve(SITE, '..');
const read = (p) => fs.readFileSync(path.join(DS, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));
const PUBLIC = 'https://luvms012-rgb.github.io/ybm-ds';
const GITHUB = 'https://github.com/luvms012-rgb/ybm-ds';
const RAW = 'https://raw.githubusercontent.com/luvms012-rgb/ybm-ds/main';
const FIGMA = 'https://www.figma.com/design/1VCEsFU3xMWuXIntIrZz9i/?node-id=';
const SITE_URL = PUBLIC + '/site/';
// 페이지 머리말의 Figma / Code 버튼 주소 - Figma 문서 프레임의 "문서 / 코드" 링크와 같은 계획(tokens/links.mjs)
const LINKS = linkPlan(DS);
const linkByNo = Object.fromEntries(LINKS.entries.map((e) => [e.no, e]));
const linkBySlug = Object.fromEntries(LINKS.fixed.map((f) => [f.slug, f]));

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

// index.html의 예시 섹션
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
// 지침 한 줄에 규칙 하나: README 6.2 는 문장마다 나눈다. Do / Don't 는 첫 문장이 "~않습니다, ~마세요" 로 끝나는지로 가른다
const sentences = (t) => t.split(/(?<=[다요]\.)\s+/).map((x) => x.trim()).filter(Boolean);
const isDont = (t) => /(않습니다|않아요|마세요|안 됩니다|말아요)\.?$/.test(sentences(t)[0] || '');
const ALIAS = { FAB: 'Floating Action Button', '로딩 표시': 'Progress Circle' };

const comps = registry.map((c) => {
  const h = headers[c.no] || {};
  const base = c.name.split(' · ')[0];
  const names = [c.name, base, ...c.name.split(' · ')].map((s) => s.toLowerCase());
  const dos = [];
  for (const d of readmeDos) {
    const parts = d.keys.split(/\s+vs\s+|\s*\/\s*/).map((p) => (ALIAS[p] || p).toLowerCase());
    if (parts.some((p) => names.includes(p))) dos.push(...sentences(d.text).map(prose));
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
    // 설명은 문장으로 끝낸다 (CSS 머리 주석에서 온 "…하는 막대" 같은 이름꼴에는 "입니다." 를 붙인다)
    desc: ((d) => d && !/[.!?다요]$/.test(d) ? d + '입니다.' : d)(prose(notes.lead[c.no] || h.desc || '')),
    markup: h.markup || '',
    spec: h.spec || '',
    example: examples[c.no] || '',
    // README 와 Figma 메모가 같은 규칙을 말하면(앞 7글자가 같으면) 뒤에 오는 더 자세한 쪽만 남긴다
    dos: [...new Set(dos)].filter((d, i, all) => { const k = (t) => t.replace(/\s/g, '').slice(0, 7); return !all.some((o, j) => j > i && k(o) === k(d)); }),
    vars: [...vars],
  };
});
// Figma 문서 프레임을 사이트와 같은 내용으로 채울 자료 - node sync.mjs docs 가 읽는다 (커밋 안 함)
const figmaDocs = () => fs.writeFileSync(path.join(DS, 'tokens', '.figma-docs.json'), JSON.stringify({
  components: comps.map((c) => ({ no: c.no, name: c.name, slug: c.slug, doc: c.doc || null, desc: c.desc, dos: ((r) => [...r.filter(([ok]) => ok), ...r.filter(([ok]) => !ok)])(c.dos.map((d) => [isDont(d) ? 0 : 1, d])) })),
  foundations: Object.fromEntries(FOUND.map(([slug, label]) => [slug, { label, lead: slug === 'icons' ? ICON_LEAD : (foundPages[slug] || {}).lead || '' }])),
  icons: ICON_PRACTICES.map(([ok, t]) => [ok ? 1 : 0, t]),
}, null, 1));
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


// 상단 메뉴 다섯 (11-03 사용자 "메뉴는 총 5개"): Get Started, Foundations, Components, Templates, Updates
// Get Started 와 Updates 는 왼쪽 메뉴 없이 한 칸(레퍼런스 B Get Started), Foundations 는 왼쪽 메뉴에 Overview + 항목
// 테마는 11-03 사용자 "우선 숨김, 처음부터 다시": 메뉴, Usage 테마 절, AI 목록, llms.txt 에서 뺀다. 다시 열 때 true
const SHOW_THEMES = false;
const NAV = [['get-started', 'Get Started', 'index.html'], ['foundations', 'Foundations', 'foundations/index.html'], ['components', 'Components', 'components/index.html'], ['templates', 'Templates', 'templates/index.html'], ['updates', 'Updates', 'updates.html'], ...(SHOW_THEMES ? [['themes', 'Themes', 'themes/index.html']] : [])];
// 왼쪽 메뉴는 영문, 묶음은 두고 묶음 안은 ABC 순 (레퍼런스 B)
const az = (list) => [...list].sort((a, b) => a[1].localeCompare(b[1], 'en'));
// 파운데이션: 항목마다 한 페이지 (슬러그, 영문 이름)
const FOUND = az([['color', 'Color'], ['typography', 'Typography'], ['spacing', 'Spacing'], ['shape', 'Radius'], ['elevation', 'Elevation'], ['motion', 'Motion'], ['icons', 'Iconography'], ['breakpoint', 'Breakpoint']]);
// Get Started 문서 (왼쪽 메뉴 없음): 첫 화면과 AI & Tools
const GS_ORDER = [['index.html', 'Get Started'], ['get-started/ai.html', 'AI & Tools']];
// Foundations 왼쪽 메뉴와 이전 / 다음 순서: Overview 다음 항목 ABC 순. Color 와 Iconography 의 탭 쪽은 첫 탭과 같은 자리
const FD_ORDER = [['foundations/index.html', 'Overview'], ...FOUND.map(([s, l]) => [`foundations/${s}.html`, l])];
const fdPager = (file) => { const i = FD_ORDER.findIndex(([f]) => f === file); const p = FD_ORDER[i - 1], n = FD_ORDER[i + 1]; return [p && { href: '{root}' + p[0], label: p[1] }, n && { href: '{root}' + n[0], label: n[1] }]; };

// 컴포넌트 찾기 칸의 한글 낱말 (site/src/search-ko.json, 키는 영어 이름). 한글로 찾아도 영어 이름 컴포넌트가 나온다
const SEARCH_KO = JSON.parse(fs.readFileSync(path.join(SITE, 'src/search-ko.json'), 'utf8'));
const koKeys = (name) => { const k = SEARCH_KO[name]; if (k === undefined) console.log('  ! search-ko.json에 한글 낱말이 없음:', name); return k || ''; };
function sideNav(section, file, root) {
  const item = (href, label, keys = '') => `<a class="site-nav__item" href="${root}${href}"${href === file || (section === 'foundations' && file.startsWith(href.replace(/\.html$/, '-'))) ? ' aria-current="page"' : ''}${keys ? ` data-site-keys="${esc(keys)}"` : ''}>${esc(label)}</a>`;
  // 레퍼런스 A 왼쪽 메뉴: 접는 묶음(아코디언) - 묶음 이름 버튼 + 오른쪽 꺾쇠, 안쪽 항목은 32 들여쓰기
  const group = (label, items) => {
    const id = 'site-nav-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `<div class="site-nav__group" data-site-group="${esc(label)}"><button type="button" class="site-nav__toggle" aria-expanded="true" aria-controls="${id}">${esc(label)}<i class="ds-icon ds-icon--chevron-up site-nav__chevron" aria-hidden="true"></i></button><div class="site-nav__panel" id="${id}" role="group" aria-label="${esc(label)}"><div class="site-nav__children">${items.join('')}</div></div></div>`;
  };
  const parts = [];
  if (section === 'foundations') parts.push(...FD_ORDER.map(([h, l]) => item(h, l)));
  if (section === 'components') {
    parts.push(item('components/index.html', 'Overview'));
    parts.push(...compsAZ.map((c) => item(`components/${c.slug}.html`, c.name.split(' · ')[0], koKeys(c.name.split(' · ')[0]))));
  }
  if (section === 'themes') parts.push(item('themes/index.html', 'Overview'));
  if (section === 'templates') {
    parts.push(item('templates/index.html', 'Overview'));
    parts.push(...templates.map((t) => item(`templates/${t.slug}.html`, t.name)));
  }
  const mobile = `<div class="site-side__mobile"><nav class="site-nav" aria-label="주요 메뉴">${NAV.map(([k, l, h]) => `<a class="site-nav__item" href="${root}${h}"${k === section ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav><div class="site-nav__sep"></div></div>`;
  // 컴포넌트 메뉴 맨 위 찾기 칸 (높이 32, 모서리 12, 1px 테두리) - 메뉴 항목과 목록 카드를 함께 거른다
  const search = section === 'components' ? `<div class="site-side__searchbar"><div class="ds-input site-side__search" data-variant="outline" data-size="medium"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" placeholder="컴포넌트 찾기" aria-label="컴포넌트 찾기" data-site-search><button type="button" class="ds-input__clear" aria-label="지우기"></button></div></div>` : '';
  return `<aside class="site-side" id="site-side" aria-label="페이지 목록">
  <div class="site-side__top"><b>메뉴</b><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" data-site-close aria-label="메뉴 닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button></div>
  ${mobile}${search}
  <nav class="site-nav" aria-label="${esc(NAV.find((n) => n[0] === section)[1])} 메뉴"${search ? ' data-site-navfilter' : ''}>${parts.join('\n')}</nav>
</aside>`;
}

const iconBtn = (attrs, label, inner) => `<button type="button" class="ds-btn" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-label="${esc(label)}" ${attrs}>${inner}</button>`;
// Best Practices 표 - [할 것(true) / 하지 말 것(false), 문장]
const practices = (items) => table(['구분', '내용'], [...items.filter(([ok]) => ok), ...items.filter(([ok]) => !ok)].map(([ok, text]) => [`<b class="ds-badge site-practice" data-tone="${ok ? 'positive' : 'critical'}">${ok ? 'Do' : 'Don\'t'}</b>`, inline(text)]));
const metaLink = (href, label, icon) => `<a class="ds-btn" data-variant="neutralWeak" data-size="xsmall" href="${href}" target="_blank" rel="noopener"><i class="ds-icon ${icon} ds-icon--sm" aria-hidden="true"></i>${label}</a>`;
const metaLinks = (l) => l ? `<div class="site-meta">${l.figma ? metaLink(l.figma, 'Figma', 'site-i--figma') : ''}${metaLink(l.code, '코드', 'site-i--github')}</div>` : '';
const iconLink = (href, label, icon, extra = '') => `<a class="ds-btn${extra}" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" href="${href}" target="_blank" rel="noopener" aria-label="${esc(label)}"><i class="ds-icon ${icon}" aria-hidden="true"></i></a>`;

// layout - doc: 본문 752 + 목차 (문서, 컴포넌트 목록과 상세도 같은 폭) / wide: 메뉴 옆 전체 폭 (템플릿 상세)
//          full: PC에서 왼쪽 메뉴 없이 전체 폭 (템플릿 목록)
function page({ file, title, section, body, layout = 'doc', desc = '', pager = [] }) {
  const depth = file.split('/').length - 1;
  const root = '../'.repeat(depth);
  // 제목 구성 (레퍼런스 B): 큰 제목과 설명 (위 경로 글자는 쓰지 않는다)
  body = body.replace(/<header>(\s*<p class="site-eyebrow">[\s\S]*?<\/p>)?/, '<header class="site-head">');
  // AI 가 읽는 마크다운 (llms.txt 표준): 제목 아래 버튼 줄에 Markdown 메뉴. 링크 복사, 내용 복사, 새 창으로 열기, 전체 목차
  if (section === 'get-started' || section === 'foundations' || section === 'components') {
    MD_PAGES.push({ file, title, desc, section });
    const menu = mdMenu(path.basename(file).replace(/\.html$/, '.md'), root);
    if (/<header class="site-head">[\s\S]*?<div class="site-meta">/.test(body)) body = body.replace(/(<header class="site-head">[\s\S]*?<div class="site-meta">[\s\S]*?)(<\/div>)/, (m, a, b) => a + menu + b);
    else body = body.replace('</header>', `<div class="site-meta">${menu}</div></header>`);
  }
  // 이전 / 다음 문서 (레퍼런스 B)
  const [prev, next] = pager;
  const pagerHtml = prev || next ? `<nav class="site-pager" aria-label="이전, 다음 문서">${prev ? `<a href="${prev.href}" data-dir="prev"><span class="site-pager__label"><i class="ds-icon ds-icon--chevron-left ds-icon--sm" aria-hidden="true"></i>이전</span><b>${esc(prev.label)}</b></a>` : ''}${next ? `<a href="${next.href}" data-dir="next"><span class="site-pager__label">다음<i class="ds-icon ds-icon--chevron-right ds-icon--sm" aria-hidden="true"></i></span><b>${esc(next.label)}</b></a>` : ''}</nav>` : '';
  // 푸터 (레퍼런스 B): 왼쪽 로고와 저작권, 오른쪽 메뉴 두 묶음
  const footer = `<footer class="site-footer">
  <div class="site-footer__brand"><img src="${root}assets/logo-ybmnet.svg" alt="YBM NET" width="81" height="24"><p class="site-footer__copy">© 2026 YBM NET. All rights reserved.</p></div>
  <nav class="site-footer__nav" aria-label="사이트 메뉴">
    <div><p class="site-footer__title">메뉴</p>${NAV.map(([, l, h]) => `<a href="${root}${h}">${l}</a>`).join('')}</div>
    <div><p class="site-footer__title">더 보기</p><a href="${FIGMA}2608-2" target="_blank" rel="noopener">Figma</a><a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a></div>
  </nav>
</footer>`;
  // h2에 제목 링크를 달고 목차를 만든다
  const heads = [];
  body = body.replace(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g, (m, id, inner) => {
    heads.push([id, inner.replace(/<[^>]+>/g, '')]);
    return `<h2 id="${id}">${inner}<a class="site-anchor" href="#${id}" aria-label="이 제목 링크"><i class="ds-icon ds-icon--link ds-icon--sm" aria-hidden="true"></i></a></h2>`;
  });
  const hasToc = layout === 'doc' && heads.length > 1;
  // 좁은 화면 목차: 브라우저 기본 select 대신 DS Select Trigger + Select Content (여닫기는 site.js)
  const tocSelect = hasToc ? `<div class="site-toc-select"><button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-controls="site-toc-list" aria-label="이 페이지 목차" data-site-toc><span class="ds-select__value">${esc(heads[0][1])}</span></button><div class="ds-select-content site-toc-list" id="site-toc-list" role="listbox" data-size="medium" hidden><ul class="ds-select-list">${heads.map(([id, t], i) => `<li><button type="button" class="ds-select-item" role="option" data-site-toc-go="${id}"${i ? '' : ' aria-selected="true"'}><span class="ds-select-item__body"><span class="ds-select-item__label">${esc(t)}</span></span></button></li>`).join('')}</ul></div></div>` : '';
  body = body.replace('</header>', `${tocSelect}\n</header>`);
  const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - YBM DS</title>
${desc ? `<meta name="description" content="${esc(desc)}">\n` : ''}<!-- 생성물: node site/build.mjs가 만든다. 직접 고치지 말고 site/build.mjs나 site/src를 고친다 -->
<script>try { var t = localStorage.getItem("ybm-site-theme"); if (t === "dark" || (!t && matchMedia("(prefers-color-scheme: dark)").matches)) document.documentElement.dataset.theme = "dark"; } catch (e) {}</script>
<link rel="icon" href="${root}assets/logo-ybmnet.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}../dist/ybm-ds.css">
<link rel="stylesheet" href="${root}assets/site.css?v=${ASSET_V}">
<script src="${root}../dist/ybm-ds.js" defer></script>
<script src="${root}assets/site.js?v=${ASSET_V}" defer></script>
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
    ${iconLink(FIGMA + '2608-2', 'Figma 파일', 'site-i--figma', ' site-only-wide')}
    ${iconLink(GITHUB, 'GitHub 저장소', 'site-i--github', ' site-only-wide')}
    <a class="ds-btn site-cta" data-variant="neutralSolid" data-size="xsmall" href="${root}index.html#start">시작하기</a>
    ${iconBtn('data-site-menu aria-controls="site-side" aria-expanded="false"', '메뉴 열기', '<i class="ds-icon ds-icon--menu" aria-hidden="true"></i>').replace('class="ds-btn"', 'class="ds-btn site-menu-btn"')}
  </div>
</header>
<div class="site-body site-body--${layout}${layout === 'doc' && section === 'components' && !/index\.html$/.test(file) ? ' site-body--comp' : ''}">
${sideNav(section, file, root)}
<div class="site-scrim" data-site-close></div>
<main class="site-main" id="main">
<article class="site-doc">
${body}
${pagerHtml}
${footer}
</article>
</main>
${layout === 'doc' ? `<aside class="site-toc" aria-label="이 페이지 목차">${hasToc ? `<nav><span class="site-toc__indicator" aria-hidden="true"></span>${heads.map(([id, t]) => `<a href="#${id}">${esc(t)}</a>`).join('')}</nav>` : ''}</aside>` : ''}
</div>
</body>
</html>
`;
  const out = path.join(SITE, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html.replaceAll('{root}', root));
  return file;
}
const MD_PAGES = [];
const mdMenu = (md, root) => `<span class="site-md"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="xsmall" aria-haspopup="menu" aria-expanded="false" data-site-md-toggle><i class="ds-icon ds-icon--file-text ds-icon--sm" aria-hidden="true"></i>Markdown<i class="ds-icon ds-icon--chevron-down ds-icon--sm" aria-hidden="true"></i></button><div class="ds-menu site-md__menu" role="menu" hidden><button type="button" class="ds-menu-item" role="menuitem" data-site-md="link" data-href="${md}"><i class="ds-icon ds-icon--link" aria-hidden="true"></i>링크 복사</button><button type="button" class="ds-menu-item" role="menuitem" data-site-md="copy" data-href="${md}"><i class="ds-icon ds-icon--copy" aria-hidden="true"></i>내용 복사</button><a class="ds-menu-item" role="menuitem" href="${md}" target="_blank" rel="noopener"><i class="ds-icon ds-icon--external-link" aria-hidden="true"></i>새 창으로 열기</a><div class="ds-menu__divider" role="separator"></div><a class="ds-menu-item" role="menuitem" href="${root}llms.txt" target="_blank" rel="noopener"><i class="ds-icon ds-icon--list" aria-hidden="true"></i>전체 목차 llms.txt</a></div></span>`;
const written = [];
const write = (o) => written.push(page(o));

/* ---------------------------------------------------------------- Get Started */
const CSS_LINK = `<link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">
<script src="${PUBLIC}/dist/ybm-ds.js" defer></script>`;
const prompts = [
  ['YBM DS 적용하기', '지금 만들고 있는 화면이나 프로젝트에 DS를 연결합니다.',
    `이 프로젝트에 YBM DS를 적용해 줘.
1. <head>에 아래 두 줄을 넣어 줘.
   <link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">
   <script src="${PUBLIC}/dist/ybm-ds.js" defer></script>
2. 문서는 ${SITE_URL}llms.txt 목차에서 필요한 페이지(.md)를 골라 읽어.
3. 쓸 수 있는 컴포넌트 목록은 ${PUBLIC}/components.json, 각 컴포넌트의 HTML 구조는 ${RAW}/dist/components.css의 컴포넌트별 머리 주석을 따라.
4. 색, 간격, 글자 크기, 모서리, 그림자는 ${RAW}/dist/tokens.css의 --ybm-* 토큰만 써.
5. 서비스 CSS는 DS 다음에 불러오고, 바꾸고 싶은 모양은 컴포넌트의 --ds-* 변수만 덮어써.
6. 새 ds- 클래스를 만들거나 !important를 쓰지 마.`],
  ['화면 만들기', '만들고 싶은 화면을 말로 설명하면 DS 부품으로 조립합니다.',
    `YBM DS로 [만들 화면, 예: 회원 목록 관리 화면]을 만들어 줘.
- 부품은 ${PUBLIC}/components.json에 있는 것만 쓰고, 마크업은 ${RAW}/dist/components.css 머리 주석 그대로 써.
- 쓰는 컴포넌트는 ${SITE_URL}llms.txt에서 그 문서(.md)를 읽고 사용 지침을 따라.
- 비슷한 화면이 llms.txt의 Templates 목록에 있으면 그 HTML을 출발점으로 써.
- 모바일 먼저 만들고, 768px 이상과 1280px 이상에서 배치를 바꿔 줘.
- 글자는 한국어. 제목은 Bold에 자간 -0.02em, 항목 제목은 SemiBold, 본문은 Regular로 쓰고, 크기는 --ybm-font-size-* 토큰, 본문은 word-break: keep-all.
- 배치용 CSS에는 --ybm-* 토큰만 쓰고 hex 색은 쓰지 마.`],
  ['규칙 점검하기', '이미 만든 화면이 DS 규칙을 지키는지 확인하고 고칩니다.',
    `이 화면이 YBM DS 규칙을 지키는지 점검하고 고쳐 줘.
- hex, rgb로 색을 직접 쓴 곳 → --ybm-color-* 토큰으로
- 토큰이 아닌 임의의 간격, 글자 크기 → --ybm-space-*, --ybm-font-size-* 로
- ${RAW}/dist/components.css에 없는 ds- 클래스, !important
- DS 부품으로 바꿀 수 있는데 직접 만든 버튼, 입력, 표
고친 곳은 목록으로 알려 줘.`],
];
// 반응형 기준점 (Foundations Breakpoint, 11-04 시작하기에서 옮김)
const bpRows = [['sm', '480px', '큰 휴대폰'], ['md', '768px', '태블릿, PC 부품으로 바뀌는 기준'], ['lg', '1280px', '넓은 PC, 3단 배치'], ['xl', '1440px', '아주 넓은 화면']];
// 안내 카드 (레퍼런스 B Get Started): 옅은 회색 칸에 제목과 화살표, 아래 한 줄 설명. out 이면 새 창
const hubCard = (href, title, desc, out = false) => `<a class="site-hub" href="${href}"${out ? ' target="_blank" rel="noopener"' : ''}><span class="site-hub__title">${esc(title)}<i class="ds-icon ds-icon--${out ? 'external-link' : 'arrow-right'} ds-icon--sm" aria-hidden="true"></i></span><span class="site-hub__desc">${esc(desc)}</span></a>`;
write({
  file: 'index.html', section: 'get-started', title: 'Get Started', desc: 'YBM DS를 처음 쓰는 사람을 위한 안내', layout: 'page',
  body: `<header>
  <h1 class="site-h1">Get Started</h1>
  <p class="site-lead">YBM DS는 YBM 서비스를 위한 디자인 시스템입니다.</p>
  ${metaLinks({ figma: LINKS.figmaUrl('2608:2'), code: GITHUB })}
</header>

<h2 id="about">YBM DS란 무엇인가요?</h2>
${table(['용어', '뜻'], [
  ['<b>토큰</b>', '색, 크기, 간격 같은 값에 붙인 이름입니다.'],
  ['<b>컴포넌트</b>', '버튼, 입력창처럼 화면을 이루는 부품입니다.'],
  ['<b>템플릿</b>', '부품을 조립해 둔 화면 한 장입니다.'],
])}

<h2 id="system">시스템 이해하기</h2>
<div class="site-grid site-grid--hub">
  ${hubCard('{root}foundations/index.html', 'Foundations', '색, 글자, 간격 같은 기본 토큰.')}
  ${hubCard('{root}components/index.html', 'Components', '화면을 이루는 부품의 모양과 쓰임.')}
  ${hubCard('{root}templates/index.html', 'Templates', '가져다 고쳐 쓰는 완성 화면.')}
</div>

<h2 id="start">바로 써 보기</h2>
<p>AI 코딩 도구로 만들 때는 <a class="ds-link" href="get-started/ai.html#prompt">AI &amp; Tools</a>의 요청 글을 붙여 넣으면 아래 설치와 규칙을 알아서 맞춥니다.</p>
<script>if (location.hash === '#ai') location.replace('get-started/ai.html#prompt');</script>
<p><code>&lt;head&gt;</code>에 두 줄을 넣으면 글꼴, 토큰, 아이콘, 컴포넌트가 함께 들어옵니다. 컴포넌트마다 쓰는 법은 <a class="ds-link" href="components/index.html">Components</a>에 있습니다.</p>
${codeblock(CSS_LINK)}

<h2 id="service">다른 서비스에 쓰기</h2>
<p>YBM IT처럼 다른 서비스에도 DS를 그대로 가져다 씁니다. DS 파일은 고치지 않고, 서비스 CSS 한 장에서 그 서비스의 색과 로고만 바꿉니다.</p>
<h3>1. 서비스 CSS를 DS 다음에 불러오기</h3>
<p>DS가 CSS 레이어 안에 있어 뒤에 불러온 서비스 CSS가 <code>!important</code> 없이 이깁니다.</p>
${codeblock(`<link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">\n<script src="${PUBLIC}/dist/ybm-ds.js" defer></script>\n<link rel="stylesheet" href="ybm-it.css">  <!-- 서비스 CSS는 항상 DS 다음 -->`)}
<h3>2. 브랜드 색 넣기</h3>
<p>브랜드 팔레트 10단계만 서비스 색으로 바꾸면 주 버튼, 체크박스, 링크처럼 브랜드 색을 쓰는 곳이 모두 따라 바뀝니다. 자세한 것은 <a class="ds-link" href="{root}foundations/color.html">Color</a>에 있습니다.</p>
${codeblock(`/* ybm-it.css */\n:root {\n  --ybm-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */\n  --ybm-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */\n  --ybm-color-palette-brand-700: #0d7d3e;  /* 눌림 */\n  /* 200 ~ 500, 800 ~ 1000 도 같은 색의 단계로 */\n}\n:root[data-theme="dark"] {\n  /* 다크는 같은 단계를 뒤집어 넣는다 (다크 100 = 라이트 1000) */\n}`, 'css')}
<h3>3. 로고와 이름 바꾸기</h3>
<p>머리 메뉴의 로고 그림과 페이지 제목만 서비스 것으로 바꿉니다.</p>
${codeblock(`<header class="ds-topnav">\n  <a class="ds-topnav__left" href="/"><img src="ybm-it-logo.svg" alt="YBM IT"></a>\n  …\n</header>`)}
<h3>4. 필요한 곳만 다듬기</h3>
<p>모양을 더 바꾸고 싶으면 컴포넌트 변수(<code>--ds-*</code>)만 덮어씁니다. 새 <code>ds-</code> 클래스를 만들지 않습니다.</p>
${codeblock(`/* ybm-it.css */\n.ds-dialog { --ds-dialog-width: 360px; }\n.ds-btn[data-variant="brandSolid"] { --ds-btn-radius: var(--ybm-shape-pill); }`, 'css')}

<h2 id="theme">다크 모드</h2>
<p><code>html</code>에 속성 하나를 붙이면 모든 색이 어두운 화면용으로 바뀝니다. 색을 토큰으로만 썼다면 따로 고칠 것이 없습니다.</p>
${codeblock('<html lang="ko" data-theme="dark">')}

${SHOW_THEMES ? `<h2 id="custom-theme">테마</h2>
<p>테마는 브랜드 색, 바탕색, 모서리 곡률을 한 번에 바꿉니다. DS 다음에 테마 파일을 붙이고 html 에 테마 이름을 적으면 됩니다. 고를 수 있는 테마는 <a class="ds-link" data-size="small" href="themes/index.html">Themes</a>에 있습니다.</p>
${codeblock(`<html lang="ko" data-ds-theme="trust">
<link rel="stylesheet" href="${PUBLIC}/dist/ybm-ds.css">
<link rel="stylesheet" href="${PUBLIC}/dist/themes/trust.css">`)}

` : ''}`.replaceAll('href="components/', 'href="{root}components/').replaceAll('href="templates/', 'href="{root}templates/').replaceAll('href="get-started/', 'href="{root}get-started/'),
});

// 예전 Usage, Scripts 주소는 시작하기의 옮긴 절로 넘긴다 (공유된 링크가 깨지지 않게)
for (const [f, to, label] of [['usage', 'start', '바로 써 보기'], ['scripts', 'start', '바로 써 보기']]) {
  fs.writeFileSync(path.join(SITE, `get-started/${f}.html`), `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../index.html#${to}"><title>Get Started - YBM DS</title></head><body><a href="../index.html#${to}">${label}</a></body></html>\n`);
  fs.rmSync(path.join(SITE, `get-started/${f}.md`), { force: true });
}

// 파운데이션 - tokens.css에서 값을 읽는다. 다크 블록은 따로 읽어 색의 다크 값으로 쓴다
const darkAt = tokensCss.indexOf(':root[data-theme="dark"]');
const darkEnd = tokensCss.indexOf('}', darkAt) + 1;
const lightCss = tokensCss.slice(0, darkAt) + tokensCss.slice(darkEnd);
const varMap = (css) => Object.fromEntries([...css.matchAll(/(--ybm-[a-z0-9_-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const LIGHT = varMap(lightCss);
const DARK = { ...LIGHT, ...varMap(tokensCss.slice(darkAt, darkEnd)) };
const resolve = (map, v, n = 0) => { const m = String(v).match(/^var\((--[a-z0-9_-]+)\)$/); return m && n < 12 ? resolve(map, map[m[1]], n + 1) : v; };
const tokRe = (re) => [...lightCss.matchAll(re)];

// 파운데이션 상세 구성 (11-03 사용자: 레퍼런스 A Color 길이, 그림은 최소로)
//   개요 > (파운데이션마다 필요한 절) > 토큰 > 코드에서 쓰기 > 사용 지침. 그림은 따로 넣지 않고 토큰 표의 견본만 쓴다
// 색 토큰 표: 레퍼런스 A처럼 토큰 / 값(라이트, 다크 견본 + 값)
const colorGroups = [['bg', '배경'], ['fg', '글자와 아이콘'], ['stroke', '테두리']];
const colorTable = (k) => {
  const names = [...new Set(tokRe(new RegExp(`(--ybm-color-${k}-[a-z0-9-]+)\\s*:`, 'g')).map((m) => m[1]))];
  return table(['토큰', '값'], names.map((v) => {
    const l = resolve(LIGHT, `var(${v})`), d = resolve(DARK, `var(${v})`);
    return [`<code>${v}</code>`, `<span class="site-swatches"><span class="site-swatch" style="background: ${esc(l)}"></span><span class="site-swatch" style="background: ${esc(d)}"></span></span><code>${esc(l)} / ${esc(d)}</code>`];
  }));
};
const foundName = Object.fromEntries(FOUND);
fs.mkdirSync(path.join(SITE, 'foundations'), { recursive: true });
const foundPages = {
  color: {
    title: '색', lead: '색은 정보의 위계와 상태, 브랜드를 구분해 보여 줍니다.', tabs: 'color',
    body: `<h2 id="overview">개요</h2>
<p>YBM DS 의 색은 역할 색과 팔레트 색 두 층으로 되어 있습니다. 화면에는 역할 색만 쓰고, 팔레트 색은 역할 색을 만드는 원료로 둡니다. 그래서 어떤 화면에서도 글자와 바탕의 대비가 충분하고 뜻이 분명합니다.</p>
<h2 id="role-based">역할 색</h2>
<p>역할 색은 생김새가 아니라 하는 일로 이름을 붙인 색입니다. 오류는 <code>critical</code>, 성공은 <code>positive</code> 처럼 이름만 보고 어디에 쓰는지 알 수 있습니다. 자세한 규칙과 전체 목록은 <a class="ds-link" href="color-roles.html">Roles</a>에 있습니다.</p>
<h3>장점 1. 접근성</h3>
<p>역할 색은 처음부터 정해 둔 글자와 바탕 짝으로 대비를 맞췄습니다. 짝을 지켜 쓰기만 하면 읽기 어려운 조합이 생기지 않습니다.</p>
<h3>장점 2. 빈틈없는 바꾸기</h3>
<p>색을 바꿀 때 값이 아니라 뜻을 기준으로 바꿉니다. 값이 같아도 뜻이 다르면 따로 바꿀 수 있어서, 한 곳을 고쳐도 다른 곳이 함께 흔들리지 않습니다.</p>
<h3>장점 3. 다크 모드</h3>
<p>역할 색은 라이트와 다크 모드에 알맞은 값을 따로 갖고 있습니다. 토큰으로만 썼다면 <code>data-theme="dark"</code> 하나로 모든 화면이 맞춰집니다.</p>
<h2 id="palette-color">팔레트 색</h2>
<p>팔레트 색은 회색과 일곱 가지 색을 100 ~ 1000 단계로 나눈 원료 색입니다. 역할 색으로 나타내기 어려운 드문 경우에만 화면에 씁니다. 다크 모드에서는 같은 단계 번호에 어두운 화면용 값이 들어가 있어 그대로 써도 알아보기 쉽습니다. 전체 목록은 <a class="ds-link" href="color-palette.html">Palette</a>에 있습니다.</p>
<h2 id="related">관련 문서</h2>
<div class="site-grid site-grid--hub">
  ${hubCard('color-roles.html', '역할 색', '역할 색의 규칙과 전체 토큰.')}
  ${hubCard('color-palette.html', '팔레트 색', '팔레트 색의 단계와 전체 토큰.')}
</div>
<h2 id="code">코드에서 쓰기</h2>
${codeblock(`.my-card {\n  background: var(--ybm-color-bg-layer-default);\n  color: var(--ybm-color-fg-neutral);\n  border: 1px solid var(--ybm-color-stroke-neutral-muted);\n}`, 'css')}
<h3>브랜드 색 바꾸기</h3>
<p>이 가이드는 모노톤으로 보여 줍니다. 팔레트 <code>--ybm-color-palette-brand-100</code> ~ <code>1000</code>만 덮어쓰면 브랜드 색을 쓰는 곳이 모두 따라 바뀝니다.</p>
${codeblock(`/* my-service.css - DS 다음에 불러온다 */\n:root {\n  --ybm-color-palette-brand-100: #e6f6ee;  /* 옅은 배경 */\n  --ybm-color-palette-brand-600: #12a150;  /* 주 버튼, 링크 */\n  --ybm-color-palette-brand-700: #0d7d3e;  /* 눌림, 진한 글자 */\n  /* 200 ~ 500, 800 ~ 1000 도 같은 색의 단계로 채운다 */\n}\n:root[data-theme="dark"] {\n  /* 다크 모드는 같은 단계를 뒤집어 넣는다 (다크 100 = 라이트 1000) */\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '역할에 맞는 색을 고릅니다. 오류는 critical, 성공은 positive 입니다.'],
  [true, '진한 면 위 글자는 fg-on-[역할]-solid 를 씁니다.'],
  [true, '브랜드 색은 주 버튼처럼 꼭 눈에 띄어야 할 곳에만 씁니다.'],
  [false, 'hex 나 팔레트 색을 화면에 직접 쓰지 않습니다.'],
  [false, '색만으로 뜻을 전하지 않습니다. 아이콘이나 글자를 함께 씁니다.'],
])}`,
  },
  typography: {
    title: '글자', lead: '타이포그래피는 글을 분명하고 읽기 쉽게 전합니다.',
    body: `<h2 id="overview">개요</h2>
<p>글꼴은 Pretendard 하나입니다. 크기는 <code>--ybm-font-size-t01</code> ~ <code>t17</code>, 줄 높이는 같은 번호의 <code>--ybm-line-height-*</code>를 짝으로 씁니다.</p>
<h2 id="size">크기</h2>
${table(['토큰', '크기 / 줄 높이 (px)', '보기'], tokRe(/--ybm-font-size-(t\d\d): (\d+)px/g).map((m) => [`<code>${m[1]}</code>`, `${m[2]} / ${(LIGHT[`--ybm-line-height-${m[1]}`] || '').replace('px', '')}`, `<span class="site-sample" style="font-size: var(--ybm-font-size-${m[1]}); line-height: var(--ybm-line-height-${m[1]}); font-weight: var(--ybm-font-weight-bold)">가나다 Aa 123</span>`]))}
<h2 id="weight">굵기</h2>
${table(['토큰', '값', '보기'], tokRe(/--ybm-font-weight-([a-z]+): (\d+);/g).map((m) => [`<code>--ybm-font-weight-${m[1]}</code>`, m[2], `<span class="site-sample" style="font-size: var(--ybm-font-size-t06); font-weight: var(--ybm-font-weight-${m[1]})">가나다 Aa 123</span>`]))}
<h2 id="code">코드에서 쓰기</h2>
<p>본문에는 <code>word-break: keep-all</code>을 함께 써서 어절 중간에서 줄이 바뀌지 않게 합니다.</p>
${codeblock(`.my-title {\n  font-size: var(--ybm-font-size-t09);\n  line-height: var(--ybm-line-height-t09);\n  font-weight: var(--ybm-font-weight-bold);\n}\n.my-text {\n  font-size: var(--ybm-font-size-t05);\n  line-height: var(--ybm-line-height-t05);\n  word-break: keep-all;\n  overflow-wrap: break-word;\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '크기와 줄 높이는 같은 번호끼리 짝으로 씁니다.'],
  [true, '제목은 Bold, 항목 제목은 SemiBold, 본문은 Regular 로 위계를 나눕니다.'],
  [true, '한 화면의 크기는 서너 단계로 줄입니다.'],
  [false, 'px 숫자를 직접 쓰지 않습니다.'],
  [false, '강조를 색으로만 하지 않습니다. 굵기를 먼저 씁니다.'],
])}`,
  },
  spacing: {
    title: '간격', lead: '간격은 요소 사이의 거리로 무엇이 한 묶음인지 보여 줍니다.',
    body: `<h2 id="overview">개요</h2>
<p>4px 단위가 기본이고 작은 간격은 2px 단위도 씁니다. 이름의 숫자에 4를 곱하면 값입니다. 화면 좌우 여백은 <code>--ybm-space-x-global-gutter</code> 입니다.</p>
<h2 id="tokens">토큰</h2>
${table(['토큰', '값', '보기'], tokRe(/--ybm-space-(x[0-9_]+): (\d+)px/g).map((m) => [`<code>--ybm-space-${m[1]}</code>`, `${m[2]}px`, `<span class="site-bar" style="width: var(--ybm-space-${m[1]})"></span>`]))}
<h2 id="code">코드에서 쓰기</h2>
${codeblock(`.my-page {\n  padding-inline: var(--ybm-space-x-global-gutter);\n}\n.my-card {\n  display: flex;\n  flex-direction: column;\n  gap: var(--ybm-space-x2);\n  padding: var(--ybm-space-x4);\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '관련 있는 줄은 좁게 붙이고, 다른 덩어리는 넓게 띄웁니다.'],
  [true, '화면 좌우 여백은 global-gutter 하나로 맞춥니다.'],
  [false, '토큰에 없는 간격(예: 13px)을 만들지 않습니다.'],
])}`,
  },
  breakpoint: {
    title: '기준점', lead: '기준점은 화면 폭에 따라 배치를 바꾸는 지점입니다.',
    body: `<h2 id="overview">개요</h2>
<p>작은 화면부터 만들고 폭이 넓어질 때 배치를 더합니다. <code>@media</code> 안에서는 CSS 변수를 쓸 수 없어 숫자를 직접 씁니다.</p>
<h2 id="tokens">토큰</h2>
${table(['토큰', '폭', '쓰임'], bpRows.map(([n, w, u]) => [`<code>--ybm-breakpoint-${n}</code>`, w, u]))}
<h2 id="components">컴포넌트가 바뀌는 곳</h2>
<ul class="site-list">
  <li>Top Navigation ↔ Top App Bar, Side Panel ↔ Bottom Sheet, Dialog ↔ Bottom Sheet는 768을 기준으로 바꿉니다.</li>
  <li>Side Navigation은 1280 이상 펼침, 768 이상 접힘, 그보다 좁으면 서랍 메뉴입니다.</li>
</ul>
<h2 id="code">코드에서 쓰기</h2>
${codeblock(`@media (min-width: 768px) { /* 태블릿, PC */ }
@media (min-width: 1280px) { /* 넓은 PC */ }

<!-- 768 이상에서 숨김(모바일 전용) / 768 이상에서만 보임(PC 전용) -->
<div class="u-hide-from-md">…</div>
<div class="u-show-from-md">…</div>`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '모바일 화면을 먼저 만들고 min-width 로 넓은 화면을 더합니다.'],
  [true, '기준점은 표의 네 값만 씁니다.'],
  [false, '기기 이름(아이폰, 갤럭시)에 맞춘 폭을 따로 만들지 않습니다.'],
])}`,
  },
  shape: {
    title: '모서리', lead: '모서리는 요소의 둥글기를 정해 화면의 인상을 맞춥니다.',
    body: `<h2 id="overview">개요</h2>
<p>모서리는 크기 이름으로 씁니다. 작은 요소일수록 덜 둥글고 큰 면일수록 더 둥급니다. 칩과 배지처럼 양 끝이 둥근 요소는 <code>pill</code>을 씁니다.</p>
<h2 id="tokens">토큰</h2>
${table(['토큰', '값', '보기'], [...new Set(tokRe(/--ybm-shape-base-([a-z0-9]+):/g).map((m) => m[1]))].concat('pill').map((n) => {
  const px = n === 'pill' ? resolve(LIGHT, LIGHT['--ybm-shape-pill']) : resolve(LIGHT, LIGHT[`--ybm-shape-base-${n}`]);
  return [`<code>--ybm-shape-${n}</code>`, esc(px), `<span class="site-shape" style="border-radius: var(--ybm-shape-${n})"></span>`];
}))}
<h2 id="code">코드에서 쓰기</h2>
<p>어떤 영역에 <code>--ybm-shape-scale</code>을 0과 1 사이 값으로 덮어쓰면 그 안의 모서리만 덜 둥글게 바뀝니다.</p>
${codeblock(`.my-card {\n  border-radius: var(--ybm-shape-lg);\n}\n.admin-area {\n  --ybm-shape-scale: 0.5;  /* 이 영역 안의 모서리를 절반으로 */\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '안쪽 요소의 모서리는 바깥 요소보다 작게 둡니다.'],
  [false, '한 화면 안에서 같은 종류의 요소에 다른 둥글기를 섞지 않습니다.'],
])}`,
  },
  elevation: {
    title: '그림자', lead: '그림자와 겹침 순서는 요소가 얼마나 떠 있는지, 무엇이 위에 있는지 보여 줍니다.',
    body: `<h2 id="overview">개요</h2>
<p>위에 떠 있는 면일수록 지금 더 중요합니다. 그림자는 숫자 대신 쓰임 이름으로 쓰고, 다크 모드에서는 떠 있는 면을 <code>bg-layer-floating</code>으로 한 단계 밝게 칠해 높이를 보여 줍니다.</p>
<h2 id="shadow">그림자</h2>
${table(['토큰', '쓰임', '보기'], tokRe(/--ybm-elevation-(raised|overlay|panel|floating|modal):\s+[^;]+;\s*\/\* ([^*]+) \*\//g).map((m) => [`<code>--ybm-elevation-${m[1]}</code>`, prose(m[2]), `<span class="site-shadow" style="box-shadow: var(--ybm-elevation-${m[1]})"></span>`]))}
<h2 id="z">겹침 순서</h2>
${table(['토큰', '값'], tokRe(/--ybm-z-([a-z]+): (\d+);/g).map((m) => [`<code>--ybm-z-${m[1]}</code>`, m[2]]))}
<h2 id="code">코드에서 쓰기</h2>
${codeblock(`.my-menu {\n  background: var(--ybm-color-bg-layer-floating);\n  box-shadow: var(--ybm-elevation-overlay);\n  z-index: var(--ybm-z-overlay);\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '요소의 쓰임에 맞는 그림자 이름을 고릅니다. 메뉴는 overlay, 다이얼로그는 modal 입니다.'],
  [true, '같은 높이 안에서 면을 나눌 때는 그림자 대신 테두리를 씁니다.'],
  [false, '그림자 값을 직접 만들지 않습니다.'],
])}`,
  },
  motion: {
    title: '움직임', lead: '움직임은 화면이 바뀌는 과정을 자연스럽게 이어 줍니다.',
    body: `<h2 id="overview">개요</h2>
<p>버튼 색처럼 작은 반응은 짧게, 시트처럼 화면이 크게 바뀌는 움직임은 조금 길게 씁니다. 들어오는 요소는 <code>enter</code>, 나가는 요소는 <code>exit</code> 곡선을 씁니다.</p>
<h2 id="duration">길이</h2>
${table(['토큰', '값'], tokRe(/--ybm-duration-([a-z]+): ([^;]+);/g).map((m) => [`<code>--ybm-duration-${m[1]}</code>`, `<code>${esc(m[2])}</code>`]))}
<h2 id="easing">속도 곡선</h2>
${table(['토큰', '값'], tokRe(/--ybm-easing-([a-z]+): ([^;]+);/g).map((m) => [`<code>--ybm-easing-${m[1]}</code>`, `<code>${esc(m[2])}</code>`]))}
<h2 id="code">코드에서 쓰기</h2>
<p>움직임 줄이기를 켠 사용자에게는 움직임을 끕니다.</p>
${codeblock(`.my-sheet {\n  transition: transform var(--ybm-duration-slow) var(--ybm-easing-emphasized);\n}\n@media (prefers-reduced-motion: reduce) {\n  .my-sheet { transition: none; }\n}`, 'css')}
<h2 id="practices">사용 지침</h2>
${practices([
  [true, '바뀌는 과정을 이어 줄 때만 움직임을 씁니다.'],
  [true, '움직임 줄이기 설정을 따릅니다.'],
  [false, '눈길을 끌려고 꾸밈 움직임을 넣지 않습니다.'],
])}`,
  },
};
// 탭으로 나눈 파운데이션 (레퍼런스 B): 제목 아래 탭 막대, 탭마다 한 쪽. 첫 탭은 원래 주소
const FD_TABS = {
  color: [['color.html', 'Overview'], ['color-roles.html', 'Roles'], ['color-palette.html', 'Palette']],
  icons: [['icons.html', 'Overview'], ['icons-library.html', 'Library']],
};
const fdTabs = (key, file) => `<nav class="site-pagetabs" aria-label="${esc(foundName[key])} 문서">${FD_TABS[key].map(([f, l]) => `<a href="${f}"${'foundations/' + f === file ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`;
const fdHead = (slug, lead) => `<header><h1 class="site-h1">${esc(foundName[slug])}</h1><p class="site-lead">${esc(lead)}</p>${metaLinks(linkBySlug[slug])}</header>`;
for (const [slug, p] of Object.entries(foundPages)) {
  write({
    file: `foundations/${slug}.html`, section: 'foundations', title: foundName[slug], desc: p.lead, pager: fdPager(`foundations/${slug}.html`),
    body: `${fdHead(slug, p.lead)}\n${p.tabs ? fdTabs(p.tabs, `foundations/${slug}.html`) + '\n' : ''}${p.body}`,
  });
}

// Color > Roles: 속성, 역할, 변형, 상태 규칙 다음 전체 토큰 (설명은 이름에서 만든다)
const ROLE_KO = { brand: '브랜드', neutral: '기본', positive: '성공', warning: '주의', critical: '오류', informative: '안내', magic: 'AI', layer: '면', canvas: '화면 바탕', overlay: '덮개', transparent: '투명', disabled: '꺼짐', placeholder: '입력 전 안내 글자', focus: '포커스' };
const VAR_KO = { solid: '진한 면', weak: '옅은 면', 'weak-alpha': '옅은 반투명 면', muted: '한 단계 흐린', subtle: '두 단계 흐린', contrast: '더 진한', inverted: '반전', default: '기본', floating: '떠 있는 면', ring: '고리' };
const colorDesc = (v) => {
  const n = v.replace('--ybm-color-', ''), [prop, ...rest] = n.split('-');
  let r = rest.join('-'), pressed = /-pressed$/.test(r); r = r.replace(/-pressed$/, '');
  const on = r.match(/^on-([a-z]+)-solid$/);
  if (on) return `${ROLE_KO[on[1]] || on[1]} 진한 면 위의 글자와 아이콘입니다.`;
  const role = r.split('-')[0], vr = r.slice(role.length + 1);
  const what = { bg: '배경', fg: '글자와 아이콘', stroke: '테두리' }[prop];
  return `${ROLE_KO[role] || role}${vr ? ' ' + (VAR_KO[vr] || vr) : ''} ${what}${pressed ? ', 눌렀을 때' : ''}입니다.`;
};
const palName = (v, map) => { const m = String(map[v] || '').match(/^var\(--ybm-color-(palette-[a-z0-9-]+)\)$/); return m ? m[1] : resolve(map, map[v]); };
const swatch2 = (l, d) => `<span class="site-swatches"><span class="site-swatch" style="background: ${esc(l)}"></span><span class="site-swatch" style="background: ${esc(d)}"></span></span>`;
const roleTable = (k) => {
  const names = [...new Set(tokRe(new RegExp(`(--ybm-color-${k}-[a-z0-9-]+)\\s*:`, 'g')).map((m) => m[1]))];
  return table(['토큰', '값'], names.map((v) => {
    const l = resolve(LIGHT, `var(${v})`), d = resolve(DARK, `var(${v})`);
    return [`<code>${v}</code><br><span class="site-token-desc">${esc(colorDesc(v))}</span>`, `${swatch2(l, d)}<code>${esc(palName(v, LIGHT))}</code>`];
  }));
};
const roleChips = (list) => `<div class="site-rolechips">${list.map((v) => { const n = `--ybm-color-${v}`; const l = resolve(LIGHT, `var(${n})`), d = resolve(DARK, `var(${n})`); return `<span class="site-rolechip">${swatch2(l, d)}<code>${n}</code></span>`; }).join('')}</div>`;
const ROLES = [
  ['brand', 'Brand', '브랜드 색은 브랜드와 이어지는 요소를 바로 알아보게 합니다. 화면에서 가장 중요한 동작 하나를 강조할 때도 씁니다.', ['fg-brand', 'bg-brand-solid', 'bg-brand-solid-pressed', 'bg-brand-weak', 'stroke-brand-solid']],
  ['neutral', 'Neutral', '기본 색은 대부분의 글과 바탕에 쓰는 색입니다. 가장 눈에 띄지는 않지만 늘 잘 보여야 하는 요소에 씁니다.', ['fg-neutral', 'fg-neutral-muted', 'fg-neutral-subtle', 'fg-on-neutral-solid', 'bg-neutral-solid', 'bg-neutral-weak']],
  ['positive', 'Positive', '성공 색은 끝난 일, 확인, 좋은 상태를 알립니다.', ['fg-positive', 'fg-positive-contrast', 'bg-positive-solid', 'bg-positive-weak']],
  ['warning', 'Warning', '주의 색은 마감 임박처럼 사용자가 한 번 더 살펴야 할 내용을 알립니다.', ['fg-warning', 'fg-warning-contrast', 'bg-warning-solid', 'bg-warning-weak']],
  ['critical', 'Critical', '오류 색은 실패, 삭제처럼 바로 주의를 끌어야 하는 문제를 알립니다.', ['fg-critical', 'fg-critical-contrast', 'bg-critical-solid', 'bg-critical-weak']],
  ['informative', 'Informative', '안내 색은 도움말과 상태 설명처럼 알아 두면 좋은 정보를 전합니다.', ['fg-informative', 'fg-informative-contrast', 'bg-informative-solid', 'bg-informative-weak']],
  ['magic', 'Magic', 'AI 색은 AI 기능과 새 기능을 다른 기능과 구분해 보여 줍니다.', ['fg-magic', 'bg-magic-solid', 'bg-magic-weak', 'stroke-magic-solid']],
  ['layer', 'Layer', '면 색은 화면의 깊이와 겹침을 나눕니다. 화면 바탕, 기본 면, 떠 있는 면 순서로 위에 놓입니다.', ['bg-canvas', 'bg-layer-default', 'bg-layer-floating', 'bg-overlay']],
];
write({
  file: 'foundations/color-roles.html', section: 'foundations', title: 'Color Roles', desc: '역할 색의 규칙과 전체 토큰', pager: fdPager('foundations/color.html'),
  body: `${fdHead('color', foundPages.color.lead)}\n${fdTabs('color', 'foundations/color-roles.html')}
<p>역할 색의 이름은 속성, 역할, 변형, 상태 네 조각으로 이어 붙입니다. <code>--ybm-color-bg-brand-solid-pressed</code>는 배경(속성), 브랜드(역할), 진한 면(변형), 눌렀을 때(상태)입니다.</p>
<h2 id="property">속성</h2>
<p>모든 역할 색은 세 가지 속성 가운데 하나로 시작합니다.</p>
${table(['속성', '쓰는 곳'], [['<code>bg</code>', '화면 전체나 부품의 바탕'], ['<code>fg</code>', '글자, 아이콘 같은 앞쪽 요소'], ['<code>stroke</code>', '경계를 나누는 선과 부품의 테두리']])}
<h2 id="role">역할</h2>
<p>속성 다음에 뜻을 나타내는 역할이 붙습니다. 같은 역할은 여러 속성에 걸쳐 함께 쓰여 화면 전체에서 같은 뜻으로 읽힙니다.</p>
${ROLES.map(([id, en, d, list]) => `<h3 id="role-${id}">${en}</h3>\n<p>${d}</p>\n${roleChips(list)}`).join('\n')}
<h2 id="variant">변형</h2>
<p>같은 역할이라도 강조 정도에 따라 변형을 고릅니다. 예를 들어 성공 배경은 옅은 <code>bg-positive-weak</code>와 진한 <code>bg-positive-solid</code>가 있습니다.</p>
${table(['변형', '뜻'], [['<code>solid</code>', '진한 면입니다. 가장 강하게 눈에 띕니다.'], ['<code>weak</code>', '옅은 면입니다. 넓은 영역에 써도 부담이 적습니다.'], ['<code>muted</code>, <code>subtle</code>', '한 단계, 두 단계 흐린 글자와 선입니다.'], ['<code>contrast</code>', '옅은 면 위에서도 읽히는 더 진한 글자입니다.'], ['<code>on-[역할]-solid</code>', '진한 면 위에 올리는 글자와 아이콘입니다.']])}
<h2 id="state">상태</h2>
<p>부품의 상태에 따라 색이 바뀝니다. 눌렀을 때는 끝에 <code>-pressed</code>가 붙은 색을 쓰고, 꺼진 부품은 <code>bg-disabled</code>, <code>fg-disabled</code>를 씁니다.</p>
<h2 id="tokens">토큰</h2>
<p>값의 앞 견본은 라이트 모드, 뒤 견본은 다크 모드입니다.</p>
${colorGroups.map(([k, label]) => `<h3 id="tokens-${k}">${label}</h3>\n${roleTable(k)}`).join('\n')}`,
});

// Color > Palette: 회색 한 줄과 일곱 색 격자, 다음 전체 토큰. 견본은 실제 값(라이트 / 다크)으로 칠한다 (가이드 모노톤과 상관없이)
const PAL_FAM = [['brand', 'Brand'], ['blue', 'Blue'], ['green', 'Green'], ['orange', 'Orange'], ['yellow', 'Yellow'], ['red', 'Red'], ['purple', 'Purple']];
const palVal = (n) => [resolve(LIGHT, `var(--ybm-color-palette-${n})`), resolve(DARK, `var(--ybm-color-palette-${n})`)];
const palCell = (n) => { const [l, d] = palVal(n); return `<span class="site-pal__cell" style="--l: ${esc(l)}; --d: ${esc(d)}" title="--ybm-color-palette-${n}  ${esc(l)}"></span>`; };
const palRow = (fam, en, steps) => `<div class="site-pal__row"><span class="site-pal__name">${en}</span>${steps.map((st) => palCell(`${fam}-${st}`)).join('')}</div>`;
const palHead = (steps) => `<div class="site-pal__row site-pal__head"><span class="site-pal__name"></span>${steps.map((st) => `<span>${st}</span>`).join('')}</div>`;
const GRAY = ['00', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'], STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'];
const palTokens = [...new Set(tokRe(/(--ybm-color-palette-[a-z0-9-]+)\s*:/g).map((m) => m[1]))];
write({
  file: 'foundations/color-palette.html', section: 'foundations', title: 'Color Palette', desc: '팔레트 색의 단계와 전체 토큰', pager: fdPager('foundations/color.html'),
  body: `${fdHead('color', foundPages.color.lead)}\n${fdTabs('color', 'foundations/color-palette.html')}
<p>팔레트 색은 역할 색을 만드는 원료입니다. 다크 모드에서는 같은 단계 번호에 어두운 화면용 값이 들어 있어, 라이트 모드 기준으로 골라도 다크 모드에서 알아보기 쉽습니다.</p>
<h2 id="gray">Gray</h2>
<div class="site-pal" style="--n: 11">${palHead(GRAY)}${palRow('gray', 'Gray', GRAY)}</div>
<h2 id="chromatic">Chromatic</h2>
<p>Brand 는 서비스마다 바꿔 쓰는 색입니다. 이 가이드의 다른 화면은 모노톤으로 보이지만 여기에는 실제 값이 보입니다.</p>
<div class="site-pal" style="--n: 10">${palHead(STEPS)}${PAL_FAM.map(([f, en]) => palRow(f, en, STEPS)).join('')}</div>
<h2 id="tokens">토큰</h2>
<p>값의 앞 견본은 라이트 모드, 뒤 견본은 다크 모드입니다.</p>
${table(['토큰', '값'], palTokens.map((v) => { const l = resolve(LIGHT, `var(${v})`), d = resolve(DARK, `var(${v})`); return [`<code>${v}</code>`, `${swatch2(l, d)}<code>${esc(l)} / ${esc(d)}</code>`]; }))}`,
});

// Foundations 첫 쪽 (레퍼런스 B Foundations Overview): 항목마다 카드
write({
  file: 'foundations/index.html', section: 'foundations', title: 'Foundations', desc: '색, 글자, 간격처럼 화면의 바탕이 되는 토큰과 원칙', pager: fdPager('foundations/index.html'),
  body: `<header><h1 class="site-h1">Foundations</h1><p class="site-lead">색, 글자, 간격처럼 모든 화면의 바탕이 되는 토큰과 원칙입니다.</p></header>
<h2 id="list">항목</h2>
<div class="site-grid site-grid--hub">
${FOUND.map(([sl, en]) => hubCard(`${sl}.html`, en, sl === 'icons' ? '아이콘은 정보와 기능을 빠르게 알아보도록 돕습니다.' : foundPages[sl].lead)).join('\n')}
</div>`,
});

// 아이콘
const iconNames = [...new Set([...iconsCss.matchAll(/\.ds-icon--([a-z0-9-]+)\s*\{\s*--ds-icon:/g)].map((m) => m[1]))].sort();
// Lucide 전체 목록 - site/src/lucide-icons.json (site/lucide-update.mjs로 만든다). 화면에는 site.js가 그린다
const lucide = JSON.parse(fs.readFileSync(path.join(SITE, 'src/lucide-icons.json'), 'utf8'));
const lucideCount = Object.keys(lucide.icons).length;
const ICON_LEAD = '아이콘은 정보와 기능을 빠르게 알아보도록 돕습니다.';
const ICON_PRACTICES = [
  [true, '같은 뜻에는 늘 같은 아이콘을 씁니다. 닫기는 x, 더 보기는 ellipsis 입니다.'],
  [true, '아이콘만 있는 버튼에는 aria-label을 붙입니다.'],
  [true, '색은 글자색을 따라가게 둡니다. 상태 색이 필요하면 부모 글자색을 바꿉니다.'],
  [true, '크기는 16, 20, 24 셋 중에서 고릅니다.'],
  [false, '이모지나 다른 아이콘 세트를 섞지 않습니다.'],
  [false, '아이콘 그림을 손으로 고치지 않습니다. Lucide 원본 그대로 씁니다.'],
  [false, '아이콘 하나로 긴 뜻을 대신하지 않습니다. 뜻이 분명하지 않으면 글자를 같이 씁니다.'],
];
// 아이콘 쓰임 (아이콘 페이지 표). icons.css에 아이콘을 넣으면 여기에도 한 줄 - 빠지면 빌드가 알려 주고 Others에 넣는다
const ICON_GROUPS = [
  ['이동', { 'chevron-down': '펼치기, 드롭다운 열기', 'chevron-up': '접기', 'chevron-left': '뒤로, 이전', 'chevron-right': '다음, 목록 행의 이동 표시', 'chevrons-left': '맨 처음으로', 'chevrons-right': '맨 끝으로', 'arrow-right': '다음 단계, 바로 가기', 'arrow-up': '맨 위로, 보내기', 'corner-down-right': '답글, 하위 항목', menu: '메뉴 열기', 'panel-left': '왼쪽 메뉴 열고 닫기', house: '홈', 'house-solid': '홈 (선택됨)', 'external-link': '새 창으로 열기' }],
  ['동작', { x: '닫기, 지우기', check: '선택됨, 확인', plus: '추가, 수량 늘리기', minus: '빼기, 수량 줄이기', search: '찾기', copy: '복사', share: '공유', link: '링크 복사, 제목 링크', trash: '삭제', upload: '올리기', paperclip: '파일 첨부', 'rotate-ccw': '새로 고침, 되돌리기', ellipsis: '더 보기 메뉴', eye: '비밀번호 보이기', 'eye-off': '비밀번호 숨기기', image: '사진 자리, 사진 올리기', square: '멈춤 (AI 답변 생성 중단)' }],
  ['상태', { 'circle-check': '성공, 완료', 'circle-check-solid': '성공, 완료 (채움, Callout과 Snackbar)', 'circle-alert': '오류, 주의', 'circle-alert-solid': '오류, 주의 (채움)', 'triangle-alert': '경고', 'triangle-alert-solid': '경고 (채움)', info: '안내', 'info-solid': '안내 (채움)', 'circle-x': '실패, 입력 지우기', inbox: '비어 있음 (Empty)', sparkles: 'AI 기능, 새 기능' }],
  ['사물', { calendar: '날짜 고르기', clock: '시간 고르기, 시각', 'file-text': '문서, 파일', 'id-card': '계정, 신분 정보', 'credit-card': '결제, 카드', globe: '언어, 지역', monitor: 'PC 화면 보기', smartphone: '모바일 화면 보기', headset: '고객센터', 'message-circle': '댓글, 대화', 'map-pin': '위치, 주소', 'shopping-cart': '장바구니' }],
  ['앱', { folder: '폴더', 'folder-open': '열린 폴더', 'folder-tree': '폴더 구조', 'folder-input': '폴더로 옮기기', file: '파일', 'file-code': '코드 파일', archive: '보관', download: '내려받기', save: '저장', printer: '인쇄', mail: '메일', bell: '알림', settings: '설정', 'log-out': '로그아웃', user: '사람, 내 정보', users: '여러 사람, 팀', lock: '잠금, 보안', 'key-round': '열쇠, SSO 로그인', 'shield-check': '안전, 인증됨', building: '회사, 기업', package: '상품, 꾸러미', truck: '배송', receipt: '영수증, 청구', wallet: '지갑, 자산', tag: '태그, 분류', flag: '깃발, 표시', 'at-sign': '아이디, 멘션', phone: '전화', cloud: '클라우드', database: '데이터베이스', server: '서버', 'globe-lock': '보안 연결', 'link-2': '연결된 계정', 'book-open': '문서, 배우기', lightbulb: '도움말, 팁', rocket: '빠르게, 시작', bug: '버그, 문제', 'wand-sparkles': 'AI 도구 사용', sparkle: '반짝, 새로움' }],
  ['편집', { 'layout-grid': '바둑판 보기', list: '목록 보기', 'list-checks': '체크 목록', 'list-filter': '목록 거르기', 'list-music': '재생 목록', 'columns-3': '열 보기', 'grip-vertical': '끌어 옮기기 손잡이', move: '옮기기', 'zoom-in': '확대', 'zoom-out': '축소', type: '글자 도구', layers: '레이어', 'pen-tool': '펜 도구', 'mouse-pointer-2': '선택 도구', hand: '화면 이동 도구', crop: '자르기', scissors: '오려 두기', palette: '색, 만들기', 'square-pen': '새로 쓰기', pencil: '고치기', 'text-align-start': '글 블록', italic: '기울임', 'undo-2': '되돌리기', 'redo-2': '다시 하기', undo: '되돌리기', terminal: '터미널', code: '코드', 'git-branch': '브랜치', 'git-commit-horizontal': '커밋', 'git-pull-request': '풀 리퀘스트', 'panel-right': '오른쪽 패널, 태블릿 보기', 'maximize-2': '크게 보기', play: '실행, 재생', pause: '멈춤', video: '영상', mic: '말로 입력', 'chart-line': '선 그래프', 'chart-column': '막대 그래프', 'chart-pie': '원 그래프', 'calendar-days': '달력 보기' }],
  ['그 밖에', { funnel: '거르기', 'sliders-horizontal': '보기 설정, 고급 검색', 'arrow-down': '아래로', 'arrow-left': '왼쪽, 이전', 'arrow-up-down': '정렬', 'chevrons-up-down': '모두 펼치기', 'ellipsis-vertical': '세로 더 보기', 'refresh-cw': '새로 고침', circle: '빈 동그라미', 'circle-dot': '선택된 동그라미', 'circle-dashed': '예정, 빈 상태', sun: '밝은 화면', moon: '어두운 화면', command: '명령, 단축키' }],
  ['반응', { heart: '좋아요, 찜', 'heart-solid': '좋아요, 찜 (선택됨)', bookmark: '저장, 북마크', 'bookmark-solid': '저장, 북마크 (선택됨)', star: '평점, 즐겨찾기', 'star-solid': '평점, 즐겨찾기 (채움)', 'thumbs-up': '도움이 됐어요', 'thumbs-down': '도움이 안 됐어요' }],
];
{
  const listed = new Set(ICON_GROUPS.flatMap(([, m]) => Object.keys(m)));
  const extra = iconNames.filter((n) => !listed.has(n));
  const gone = [...listed].filter((n) => !iconNames.includes(n));
  if (extra.length) { console.log('  ! 아이콘 쓰임이 없는 아이콘(build.mjs ICON_GROUPS에 적기):', extra.join(', ')); ICON_GROUPS.push(['쓰임 미정', Object.fromEntries(extra.map((n) => [n, '']))]); }
  if (gone.length) console.log('  ! icons.css에 없는 아이콘이 ICON_GROUPS에 있음:', gone.join(', '));
}
const iconRow = (n, usage) => [`<button type="button" class="site-icon-name" data-site-copy="ds-icon--${n}" title="클래스 이름 복사"><i class="ds-icon ds-icon--${n}" aria-hidden="true"></i><code>${n}</code></button>`, esc(usage)];
write({
  file: 'foundations/icons.html', section: 'foundations', title: 'Iconography', pager: fdPager('foundations/icons.html'),
  body: `<header><h1 class="site-h1">Iconography</h1><p class="site-lead">${ICON_LEAD}</p>${metaLinks(linkBySlug.icons)}</header>
${fdTabs('icons', 'foundations/icons.html')}
<h2 id="overview">개요</h2>
<p>아이콘은 Lucide 한 가지만 씁니다. 선이 고르고 모양이 단순해 처음 보는 사람도 뜻을 바로 압니다. 지금 바로 쓸 수 있는 아이콘은 ${iconNames.length}개이고, 필요하면 Lucide ${lucideCount.toLocaleString()}개 가운데서 더 넣습니다. 모든 아이콘은 <a class="ds-link" href="icons-library.html">Library</a>에서 찾아 바로 복사합니다.</p>
${example(`<div class="pv-stage"><button type="button" class="ds-btn" data-variant="neutralWeak" data-size="medium"><i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>찾기</button><button type="button" class="ds-btn" data-variant="ghost" data-size="medium" data-layout="iconOnly" aria-label="닫기"><i class="ds-icon ds-icon--x" aria-hidden="true"></i></button><span class="ds-badge" data-tone="positive"><i class="ds-icon ds-icon--circle-check-solid ds-icon--sm" aria-hidden="true"></i>완료</span></div>`, `<!-- 글자 옆: 꾸밈용이라 aria-hidden -->\n<button class="ds-btn" data-variant="neutralWeak" data-size="medium">\n  <i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>찾기\n</button>\n\n<!-- 아이콘만 있는 버튼: 뜻을 aria-label로 -->\n<button class="ds-btn" data-variant="ghost" data-size="medium" data-layout="iconOnly" aria-label="닫기">\n  <i class="ds-icon ds-icon--x" aria-hidden="true"></i>\n</button>`)}
<h2 id="categories">종류</h2>
${table(['종류', '모양', '쓰는 곳'], [['선', '<i class="ds-icon ds-icon--house" aria-hidden="true"></i> <code>ds-icon--house</code>', '대부분의 자리. 기본 모양입니다.'], ['채움', '<i class="ds-icon ds-icon--house-solid" aria-hidden="true"></i> <code>ds-icon--house-solid</code>', '선택된 탭, 상태 표시처럼 더 강하게 보여야 할 때. 이름 끝에 <code>-solid</code>가 붙습니다.']])}
<h2 id="naming">이름 규칙</h2>
<ul class="site-list">
  <li>이름은 쓰임이 아니라 생김새로 붙입니다. 닫기 버튼이어도 이름은 <code>x</code> 입니다.</li>
  <li>이름은 Lucide 이름을 그대로 씁니다. 클래스는 <code>ds-icon--</code> 뒤에 이름을 붙입니다.</li>
  <li>Library 에서는 영어 이름, 영어 태그, 한국어 쓰임으로 찾을 수 있습니다.</li>
</ul>
<h2 id="size">크기와 색</h2>
<p>크기는 기본 20 이고, <code>ds-icon--sm</code> 16, <code>ds-icon--lg</code> 24 두 가지가 더 있습니다. 그 밖의 크기가 꼭 필요하면 <code>--ds-icon-size</code> 변수로 바꿉니다. 색은 부모의 글자색을 바꾸면 따라옵니다.</p>
${example(`<div class="pv-stage"><i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i><i class="ds-icon ds-icon--search" aria-hidden="true"></i><i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i><span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--circle-check-solid ds-icon--lg" aria-hidden="true"></i></span><span style="color: var(--ybm-color-fg-critical)"><i class="ds-icon ds-icon--triangle-alert-solid ds-icon--lg" aria-hidden="true"></i></span></div>`, `<i class="ds-icon ds-icon--search ds-icon--sm" aria-hidden="true"></i>  <!-- 16 -->\n<i class="ds-icon ds-icon--search" aria-hidden="true"></i>              <!-- 20 기본 -->\n<i class="ds-icon ds-icon--search ds-icon--lg" aria-hidden="true"></i>  <!-- 24 -->\n\n<!-- 색은 부모 글자색 -->\n<span style="color: var(--ybm-color-fg-brand)"><i class="ds-icon ds-icon--circle-check-solid" aria-hidden="true"></i></span>\n<span style="color: var(--ybm-color-fg-critical)"><i class="ds-icon ds-icon--triangle-alert-solid" aria-hidden="true"></i></span>`)}
<h2 id="usage">쓰임</h2>
<p>자주 쓰는 아이콘의 쓰임입니다. 같은 뜻에는 늘 같은 아이콘을 씁니다.</p>
${ICON_GROUPS.map(([g, m]) => `<h3 id="icons-${ICON_GROUPS.findIndex(([x]) => x === g) + 1}">${g}</h3>\n${table(['이름', '쓰임'], Object.entries(m).filter(([n]) => iconNames.includes(n)).map(([n, u]) => iconRow(n, u)))}`).join('\n')}
<h2 id="add">새 아이콘 넣기</h2>
<p>지금 있는 아이콘 안에서 쓰는 것을 먼저 권합니다. 그래도 새 아이콘이 필요하면 아래 순서를 따릅니다.</p>
<ol class="site-list">
  <li><a class="ds-link" href="icons-library.html">Library</a>의 Lucide 전체에서 알맞은 아이콘을 고릅니다.</li>
  <li>오른쪽 칸의 <b>icons.css 줄</b>을 복사해 <code>dist/icons.css</code> 끝에 붙입니다.</li>
  <li>그다음부터 <code>ds-icon--이름</code> 클래스로 씁니다.</li>
</ol>
${codeblock(`/* Lucide heart - 복사된 줄을 dist/icons.css 끝에 붙인다 */\n:root { --ds-icon-heart: url("data:image/svg+xml,…"); }\n.ds-icon--heart { --ds-icon: var(--ds-icon-heart); }\n\n<!-- 그다음부터 -->\n<i class="ds-icon ds-icon--heart" aria-hidden="true"></i>`)}
<h2 id="practices">사용 지침</h2>
${practices(ICON_PRACTICES)}
<p class="site-note">아이콘 그림은 Lucide(ISC 라이선스)입니다. <a class="ds-link" href="{root}assets/lucide-LICENSE.txt">라이선스 전문</a></p>`,
});

// Iconography > Library (레퍼런스 B 아이콘 라이브러리): 종류 전환, 찾기, 정사각 칸 격자, 고른 아이콘 정보 칸. 그리기는 site.js
const ICON_USE = Object.assign({}, ...ICON_GROUPS.map(([, m]) => m));
write({
  file: 'foundations/icons-library.html', section: 'foundations', title: 'Icon Library', desc: '아이콘을 찾아 클래스와 SVG 를 복사합니다', pager: fdPager('foundations/icons.html'),
  body: `<header><h1 class="site-h1">Iconography</h1><p class="site-lead">${ICON_LEAD}</p>${metaLinks(linkBySlug.icons)}</header>
${fdTabs('icons', 'foundations/icons-library.html')}
<div class="site-lib" data-site-lib>
  <div class="site-lib__bar">
    <div class="ds-segmented" role="group" aria-label="아이콘 묶음" data-size="medium"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-lib-set="ds">YBM DS ${iconNames.length}</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-lib-set="all">Lucide 전체 ${lucideCount.toLocaleString()}</button></div>
    <div class="ds-input site-lib__search" data-variant="outline" data-size="large"><i class="ds-icon ds-icon--search ds-input__icon" aria-hidden="true"></i><input class="ds-input__control" type="search" placeholder="user, calendar, 닫기, 날짜…" aria-label="아이콘 찾기" data-site-lib-q><button type="button" class="ds-input__clear" aria-label="지우기"></button></div>
    <p class="site-lib__hint" data-site-lib-count>영어 이름, 태그, 한국어 쓰임으로 찾아 보세요.</p>
  </div>
  <div class="site-lib__body">
    <div class="site-lib__grid" data-site-lib-grid role="listbox" aria-label="아이콘"></div>
    <aside class="site-lib__panel" data-site-lib-panel aria-live="polite"></aside>
  </div>
</div>
<script>window.YBM_ICONS = ${JSON.stringify({ names: iconNames, use: ICON_USE }).replace(/</g, '\\u003c')};</script>
<script src="{root}assets/lucide-icons.js" defer></script>
<p class="site-note">아이콘 그림은 Lucide(ISC 라이선스)입니다. <a class="ds-link" href="{root}assets/lucide-LICENSE.txt">라이선스 전문</a></p>`,
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
// 썸네일 - 레퍼런스 B처럼 회색 16:9 상자 가운데에 첫 예시의 앞 부품 몇 개를 실제 크기로
// 컴포넌트 대표 그림: site/src/covers.html 에 컴포넌트마다 손으로 쓴 장면(한국어, 실제 쓰임). 없으면 첫 예시에서 꺼낸다
const COVERS = Object.fromEntries([...fs.readFileSync(path.join(SITE, 'src/covers.html'), 'utf8').matchAll(/<template data-slug="([^"]+)">([\s\S]*?)<\/template>/g)].map((m) => [m[1], m[2]]));
const cardThumb = (c) => {
  if (COVERS[c.slug]) return `<div class="site-tile__thumb" aria-hidden="true"><div class="site-tile__inner" inert><div class="pv-stage">${COVERS[c.slug].replace(/<a\b/g, '<span').replace(/<\/a>/g, '</span>')}</div></div></div>`;
  const first = stages(c.example)[0] || '';
  // 카드 전체가 링크라 안쪽 링크는 span으로 바꾼다(링크 안 링크는 HTML이 깨진다)
  const safe = topElements(first, 2).join('').replace(/ id="[^"]*"/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<a\b/g, '<span').replace(/<\/a>/g, '</span>');
  return `<div class="site-tile__thumb" aria-hidden="true"><div class="site-tile__inner" inert><div class="pv-stage">${safe}</div></div></div>`;
};
const coverThumb = (c) => cardThumb(c).replace('class="site-tile__thumb"', 'class="site-tile__thumb site-cover" data-site-fit-max="2"');
// 템플릿 목록 머리: 레퍼런스 A 목록 화면처럼 가운데 제목과 설명
const hero = (title, lead) => `<header class="site-hero"><h1 class="site-h1">${esc(title)}</h1><p class="site-lead">${esc(lead)}</p></header>`;
write({
  file: 'components/index.html', section: 'components', title: 'Components', layout: 'wide',
  body: `<header><h1 class="site-h1">Components</h1><p class="site-lead">화면을 만드는 데 쓰는 컴포넌트 ${comps.length}종입니다. Figma와 CSS가 같은 이름과 값으로 짝을 이룹니다.</p></header>
<div class="site-tiles">${compsAZ.map((c) => `<a class="site-tile" href="${c.slug}.html" data-site-item="${esc((c.name + ' ' + koKeys(c.name.split(' · ')[0])).toLowerCase())}">${cardThumb(c)}<p class="site-tile__name">${esc(c.name.split(' · ')[0])}</p></a>`).join('\n')}</div>
<div class="ds-empty site-empty-result" hidden><span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span><p class="ds-empty__title">찾는 컴포넌트가 없어요</p><p class="ds-empty__desc">다른 이름으로 찾아보세요.</p></div>`,
});

// components.json의 props 글을 항목으로 나눈다: "size `a/b`" 는 값 목록, 나머지는 켜고 끄는 속성이나 설명
function propsTable(c) {
  const items = [];
  let cur = '', tick = false;
  const src = c.props || '';
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '`') tick = !tick;
    // 백틱 밖의 " · ", ", ", " / " 에서만 나눈다 (값 안의 a·b, a/b는 그대로)
    const sep = !tick && ((ch === ',' && src[i + 1] === ' ') || ((ch === '·' || ch === '/') && src[i - 1] === ' ' && src[i + 1] === ' '));
    if (sep) { items.push(cur); cur = ''; continue; }
    cur += ch;
  }
  items.push(cur);
  const rows = [], flags = [], notes = [], lists = [];
  for (let it of items.map((s) => s.trim()).filter(Boolean)) {
    const m = it.match(/^(?:([A-Za-z][\w ]*?)\s+)?([A-Za-z][\w-]*)\s*`([^`]+)`\s*(.*)$/);
    if (m) {
      const vals = m[3].split(/[·/]/).map((v) => v.trim()).filter(Boolean);
      if (!m[1]) lists.push([m[2], vals]);
      rows.push([`<code>${esc(((m[1] ? m[1] + ' ' : '') + m[2]).trim())}</code>`, vals.map((v) => `<span class="ds-badge">${esc(v)}</span>`).join(' ') + (m[4] ? ` <span class="site-card__no">${esc(m[4].replace(/[()]/g, ''))}</span>` : '')]);
    } else if (/^[A-Za-z][\w-]*$/.test(it)) flags.push(`<code>${esc(it)}</code>`);
    else notes.push(inline(prose(it)));
  }
  if (flags.length) rows.push(['켜고 끄는 속성', flags.join(' ')]);
  return { rows, rest: notes.join(', '), lists };
}

// 컴포넌트 상세 구성 (11-03 사용자: 레퍼런스 A 길이로, 그림은 레퍼런스 B 처럼)
//   사용법 > 구조(레퍼런스 B 처럼 부품 이름과 화살표 그림 + 부품 표) > 속성 > 동작 > 사용 지침 > 예시 > 규격(CSS 변수, 크기와 여백)
//   그림은 줄인다(사용자 "이미지 최소화"): 맨 위 대표 그림과 구조 그림 둘만
//   컴포넌트마다 자료가 있는 절만 나온다
const IMG_BLANK = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" fill="#dcdee3"/></svg>');
const ANATOMY_KO = JSON.parse(fs.readFileSync(path.join(SITE, 'src/anatomy-ko.json'), 'utf8'));
// 머리 주석 마크업을 그릴 수 있는 HTML 로: 주석은 빼고, 고를 수 있는 속성 [data-x] 는 빼고, 고를 수 있는 요소 [<…>] 는 괄호만 뗀다
const renderable = (markup) => {
  let s = markup.replace(/<!--[\s\S]*?-->/g, '');
  for (let prev; prev !== s;) { prev = s; s = s.replace(/(<[a-zA-Z][^<>]*?)\s*\[[^\]<>]*\](?=[^<>]*>)/, '$1'); }
  return s.replace(/\[(?=\s*<)/g, '').replace(/>\s*\]/g, '>').replace(/ id="[^"]*"/g, '').replace(/\shidden(?=[\s>])/g, '')  // 닫힌 창(hidden)도 구조 그림에서는 펼쳐 보인다
    // 자리만 적은 그림 주소(…, logo.svg)는 회색 빈 그림으로
    .replace(/(<img\b[^>]*?\ssrc=")(?!https?:|data:)[^"]*"/g, `$1${IMG_BLANK}"`).replace(/<a\b/g, '<span').replace(/<\/a>/g, '</span>');
};
const partName = (s) => s.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
function anatomyOf(c) {
  if (!c.markup) return null;
  const parts = [...new Set([...c.markup.matchAll(/\b(ds-[a-z0-9-]+?)__([a-z0-9-]+)/g)].map((m) => m[0]))];
  if (parts.length < 2) return null;
  // 부품이 가장 많이 든 맨 바깥 요소 하나를 그린다
  const tops = topElements(renderable(c.markup), 12);
  const pick = tops.sort((a, b) => (b.match(/__/g) || []).length - (a.match(/__/g) || []).length)[0] || '';
  const rows = parts.map((p, i) => {
    const suf = p.split('__')[1];
    const desc = ANATOMY_KO[`${c.no}:${suf}`] || ANATOMY_KO[suf] || '';
    if (!desc) console.log('  ! anatomy-ko.json에 부품 설명이 없음:', c.no, suf);
    return [`<span class="site-anatomy__part"><b>${esc(partName(suf))}</b><code>${esc(p)}</code></span>`, esc(desc)];
  });
  const figure = `<div class="site-tile__thumb site-cover site-anatomy" data-site-fit-max="1" data-site-anatomy="${esc(parts.join(' '))}" data-site-anatomy-names="${esc(parts.map((p) => partName(p.split('__')[1])).join('|'))}" aria-hidden="true"><div class="site-tile__inner" inert><div class="pv-stage">${pick}</div></div></div>`;
  return `<h2 id="anatomy">구조</h2>${figure}<div class="site-anatomy-table">${table(['부품', '설명'], rows)}</div>`;
}
// ybm-ds.js 머리 주석의 "· 이름 — 하는 일" 을 컴포넌트에 붙인다 (이름이 다른 것은 번호로)
const JS_ALIAS = { 'Text Field clear 버튼': '04' };
const jsFor = (c) => [...dsJs.slice(0, dsJs.indexOf('*/')).matchAll(/^\s*· (.+?) — (.+)$/gm)].filter((m) => JS_ALIAS[m[1]] ? JS_ALIAS[m[1]] === c.no : c.name.split(' · ').some((n) => n === m[1])).map((m) => inline(prose(m[2])));
comps.forEach((c) => {
  const i = compsAZ.indexOf(c);
  const prev = compsAZ[i - 1], next = compsAZ[i + 1];
  const { rows, rest } = propsTable(c);
  const sections = [];
  sections.push(`<h2 id="usage">사용법</h2>${c.markup ? `<p>아래 구조를 복사해 씁니다. 대괄호 <code>[ ]</code> 안은 필요할 때만 넣습니다.</p>${codeblock(c.markup)}` : '<p>아래 예시의 코드를 복사해 씁니다.</p>'}`);
  const anatomy = anatomyOf(c);
  if (anatomy) sections.push(anatomy);
  if (rows.length || rest) sections.push(`<h2 id="props">속성</h2><p>Figma 속성 이름을 그대로 <code>data-*</code> 속성으로 씁니다.</p>${rows.length ? table(['속성', '값'], rows) : ''}${rest ? `<p class="site-note">그 밖에: ${rest}</p>` : ''}`);
  const js = jsFor(c);
  if (js.length) sections.push(`<h2 id="behavior">동작</h2><p><code>ybm-ds.js</code>를 불러오면 알아서 동작합니다.</p><ul class="site-list">${js.map((t) => `<li>${t}</li>`).join('')}</ul>`);
  if (c.dos.length) sections.push(`<h2 id="guide">사용 지침</h2>${practices(c.dos.map((d) => [!isDont(d), d]))}`);
  sections.push(`<h2 id="examples">예시</h2>${c.example ? example(c.example, codeOf(c.example) || c.markup) : '<p>아직 예시가 없습니다.</p>'}`);
  if (c.vars.length || c.spec) sections.push(`<h2 id="spec">규격</h2>${c.vars.length ? `<h3>CSS 변수</h3><p>서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.</p>${table(['변수', '기본값'], c.vars.map(([n, v]) => [`<code>${esc(n)}</code>`, `<code>${esc(v)}</code>`]))}` : ''}${c.spec ? `<h3>크기와 여백</h3><pre class="site-spec">${esc(c.spec)}</pre>` : ''}`);
  write({
    file: `components/${c.slug}.html`, section: 'components', title: c.name.split(' · ')[0], desc: c.desc,
    pager: [prev && { href: `${prev.slug}.html`, label: prev.name.split(' · ')[0] }, next && { href: `${next.slug}.html`, label: next.name.split(' · ')[0] }],
    body: `<header>
  <h1 class="site-h1">${esc(c.name)}</h1>
  <p class="site-lead">${esc(c.desc)}</p>
  ${metaLinks(linkByNo[c.no])}
</header>
${coverThumb(c)}
${sections.join('\n')}`,
  });
});

/* ---------------------------------------------------------------- Templates */
const tplGroups = [...new Set(templates.map((t) => t.group))];
// 분류 칩에 보이는 이름 (값은 templates.json 의 영어 group)
const TPL_GROUP_KO = { Dashboard: '대시보드', Table: '표', Form: '입력 폼', Settings: '설정', Login: '로그인', Tools: '도구', Content: '콘텐츠', 'AI Chat': 'AI 채팅', Gallery: '갤러리', Community: '커뮤니티', Pricing: '요금제', 'My Page': '마이페이지', Commerce: '쇼핑', Exam: '시험 접수', 'Exam B2B': '단체 시험', 'Learning B2B': '기업 러닝' };
const TPL_FIGMA = JSON.parse(fs.readFileSync(path.join(SITE, 'src/templates.json'), 'utf8')).figmaHeader;
write({
  file: 'templates/index.html', section: 'templates', title: 'Templates', layout: 'full',
  body: `${hero('Templates', '자주 만드는 화면을 DS 컴포넌트로 미리 조립해 두었습니다. 통째로 복사해 새 화면의 출발점으로 쓰세요.').replace('class="site-hero"', 'class="site-hero site-hero--tpl"')}
<div class="site-toolbar site-toolbar--center">
  <div class="ds-chiptabs" role="tablist" aria-label="분류">
    <button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true" data-site-filter="">전체</button>
    ${tplGroups.map((g) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-site-filter="${esc(g)}">${esc(TPL_GROUP_KO[g] || g)}</button>`).join('\n    ')}
  </div>
</div>
<div class="site-tpl-grid">
${templates.map((t) => `<article class="site-tpl" data-site-item="${esc((t.name + ' ' + t.en + ' ' + t.group + ' ' + t.desc).toLowerCase())}" data-site-cat="${esc(t.group)}">
  <div class="site-tpl-thumb" aria-hidden="true"><iframe src="pages/${t.slug}.html" title="${esc(t.name)} 미리보기" tabindex="-1" loading="lazy" data-site-frame></iframe></div>
  <div class="site-tpl__scrim">
    <div class="site-tpl__text"><h3 class="site-tpl__title"><a class="site-tpl__link" href="${t.slug}.html">${esc(t.name)}</a></h3><p class="site-tpl__desc">${esc(t.desc)}</p></div>
    <div class="site-tpl__actions"><a class="site-tpl__btn" href="${t.slug}.html"><i class="ds-icon ds-icon--eye" aria-hidden="true"></i>미리보기</a>${t.figma ? `<a class="site-tpl__btn" href="${LINKS.figmaUrl(t.figma.pc)}" target="_blank" rel="noopener"><i class="ds-icon site-i--figma" aria-hidden="true"></i>Figma에서 열기</a>` : ''}</div>
  </div>
</article>`).join('\n')}
</div>
<div class="ds-empty site-empty-result" hidden><span class="ds-empty__media"><i class="ds-icon ds-icon--search" aria-hidden="true"></i></span><p class="ds-empty__title">해당하는 템플릿이 없어요</p></div>`,
});
// 목록에서 빠진 템플릿의 상세 페이지는 지운다 (생성기가 템플릿을 바꾸면 옛 페이지가 남지 않게)
for (const f of fs.readdirSync(path.join(SITE, 'templates'))) if (f.endsWith('.html') && f !== 'index.html' && !templates.some((t) => t.slug + '.html' === f)) fs.unlinkSync(path.join(SITE, 'templates', f));
templates.forEach((t) => {
  // 쓴 컴포넌트는 템플릿 파일의 class를 보고 자동으로 찾는다
  const src = fs.readFileSync(path.join(SITE, 'templates/pages', t.slug + '.html'), 'utf8');
  const classes = new Set((src.match(/class="[^"]*"/g) || []).join(' ').match(/\bds-[a-z0-9_-]+/g) || []);
  const used = comps.filter((c) => c.classes.some((k) => classes.has(k.slice(1))));
  write({
    file: `templates/${t.slug}.html`, section: 'templates', title: t.name, desc: t.desc, layout: 'wide',
    body: `<header>
  <p class="site-eyebrow"><a href="index.html">Templates</a> / ${esc(t.group)}</p>
  <h1 class="site-h1">${esc(t.name)}</h1>
  <p class="site-lead">${esc(t.desc)}</p>
  <div class="site-meta">${btn(`pages/${t.slug}.html`, '새 창으로 보기', 'neutralSolid', 'small', 'external-link').replace('href="pages', 'target="_blank" rel="noopener" href="pages')}${t.figma ? metaLink(LINKS.figmaUrl(t.figma.pc), 'Figma', 'site-i--figma') : ''}${metaLink(`${GITHUB}/blob/main/site/templates/pages/${t.slug}.html`, '코드', 'site-i--github')}</div>
</header>
<div class="site-frame">
  <div class="site-frame__bar">
    <div class="ds-segmented" role="group" aria-label="보기 방식"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-view="preview">미리보기</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-view="code">코드</button></div>
    <div class="ds-segmented" role="group" aria-label="화면 폭"><button type="button" class="ds-segmented__item" aria-pressed="true" data-site-device="desktop">PC</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-device="tablet">태블릿</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-site-device="mobile">모바일</button></div>
  </div>
  <div class="site-frame__stage" data-device="desktop"><iframe src="pages/${t.slug}.html" title="${esc(t.name)} 템플릿" data-site-frame></iframe></div>
  <div class="site-frame__code" hidden>${codeblock('불러오는 중…').replace('<figure class="ds-codeblock"', `<figure class="ds-codeblock" data-site-src="pages/${t.slug}.html"`)}</div>
</div>
${t.note ? `<h2 id="responsive">반응형</h2><p>${esc(t.note)}</p>` : ''}
${used.length ? `<h2 id="components">쓴 컴포넌트</h2><div class="site-links">${used.map((c) => `<a class="ds-chip" data-size="small" href="../components/${c.slug}.html">${esc(c.name.split(' · ')[0])}</a>`).join('')}</div>` : ''}`,
  });
});

/* ---------------------------------------------------------------- AI & Tools (마크다운) */
// 11-03 사용자 "AI 를 AI & Tools 로 바꿔서 개선": 레퍼런스 B AI & Tools 처럼 짧은 소개 다음 도구별 절. 주소는 get-started/ai.html 그대로
write({
  file: 'get-started/ai.html', section: 'get-started', title: 'AI & Tools', desc: 'AI 도구와 YBM DS를 함께 쓰는 방법', layout: 'page',
  body: `<header><h1 class="site-h1">AI &amp; Tools</h1><p class="site-lead">AI 도구와 YBM DS를 함께 쓰는 방법입니다.</p></header>
<h2 id="intro">소개</h2>
<p>모든 문서를 AI가 읽기 쉬운 마크다운으로도 냅니다. 컴포넌트 목록, HTML 구조, 토큰도 파일로 열려 있어 AI가 DS 규칙대로 화면을 만듭니다.</p>
<h2 id="prompt">요청 예시</h2>
<h3>DS 적용하기</h3>
${codeblock(prompts[0][2], 'text', ' data-wrap')}
<h3>화면 만들기</h3>
<p>대괄호 안만 내 상황에 맞게 바꿉니다.</p>
${codeblock(prompts[1][2], 'text', ' data-wrap')}
<h3>규칙 점검하기</h3>
${codeblock(prompts[2][2], 'text', ' data-wrap')}
<h2 id="llms">llms.txt</h2>
${table(['파일', '내용'], [
  [`<a class="ds-link" href="../llms.txt" target="_blank" rel="noopener">llms.txt</a>`, '전체 목차입니다. AI가 필요한 문서를 골라 읽습니다.'],
  [`<a class="ds-link" href="../llms-full.txt" target="_blank" rel="noopener">llms-full.txt</a>`, '모든 문서를 한 파일로 모았습니다. 주소를 열지 못하는 도구에 첨부합니다.'],
  ['페이지별 <code>.md</code>', '문서 주소의 <code>.html</code>을 <code>.md</code>로 바꾸면 그 페이지만 받습니다.'],
])}
<ul class="site-list">
  <li>컴포넌트 하나만 필요하면 제목 아래 <b>Markdown</b> 메뉴에서 <b>내용 복사</b>를 누릅니다.</li>
  <li>여러 컴포넌트로 화면을 만들 때는 <code>llms.txt</code> 주소를 알려 줍니다.</li>
</ul>
<h2 id="files">AI가 읽는 파일</h2>
${table(['파일', '내용'], [
  [`<a class="ds-link" href="${PUBLIC}/components.json" target="_blank" rel="noopener">components.json</a>`, '쓸 수 있는 컴포넌트와 속성 목록입니다.'],
  [`<a class="ds-link" href="${RAW}/dist/components.css" target="_blank" rel="noopener">components.css</a>`, '컴포넌트마다 머리 주석에 HTML 구조가 있습니다.'],
  [`<a class="ds-link" href="${RAW}/dist/tokens.css" target="_blank" rel="noopener">tokens.css</a>`, '색, 간격, 글자 크기 같은 <code>--ybm-*</code> 토큰입니다.'],
  ['Templates', `<code>llms.txt</code> 끝에 템플릿마다 HTML 원본 주소가 있어 새 화면의 출발점으로 씁니다.`],
  ...(SHOW_THEMES ? [['Themes', '테마 CSS 주소와 어울리는 서비스입니다.']] : []),
])}
<h2 id="figma">Figma</h2>
<p>Figma 변수 이름이 CSS 변수 이름과 같습니다. Dev Mode에서 복사한 코드가 그대로 동작하고, AI에 Figma 화면을 주면 같은 토큰 이름으로 옮깁니다.</p>
<div class="site-grid site-grid--hub">${hubCard(LINKS.figmaUrl('2608:2'), 'Figma 라이브러리', '컴포넌트와 토큰을 Figma에서 봅니다.', true)}</div>`,
});

/* ---------------------------------------------------------------- Updates */
// 레퍼런스 B Updates: 제목과 설명, 소식 카드(날짜, 제목, 설명). 소식은 site/src/updates.json 맨 위에 추가
const UPDATES = readJson('site/src/updates.json').updates;
const fmtDate = (d) => { const [y, m, dd] = d.split('-').map(Number); return `${y}. ${m}. ${dd}`; };
write({
  file: 'updates.html', section: 'updates', title: 'Updates', desc: 'YBM DS 업데이트 소식', layout: 'page',
  body: `<header><h1 class="site-h1">Updates</h1><p class="site-lead">YBM DS 업데이트 소식과 변경 기록입니다.</p></header>
<h2 id="release-notes">Release Notes</h2>
<div class="site-updates">
${UPDATES.map((u) => `<article class="site-update"><time datetime="${u.date}">${fmtDate(u.date)}</time><h3>${esc(u.title)}</h3><p>${esc(u.desc)}</p></article>`).join('\n')}
</div>
<p class="site-note">자세한 변경 기록은 <a class="ds-link" href="${GITHUB}/commits/main" target="_blank" rel="noopener">GitHub</a>에 있습니다.</p>`,
});

/* ---------------------------------------------------------------- Themes */
// 레퍼런스 A Themes 배치 그대로: 왼쪽 260 고정 칸 안 흰 카드(제목 + 미리보기 다크 버튼, 설명, 사용방법 링크, 알약 버튼 둘, 테마 카드 211×120),
// 오른쪽은 남은 폭 전체 카드 안에 테마를 입힌 화면을 높이 그대로 펼친다(페이지와 함께 스크롤). 사용방법은 Usage "테마" 절
const themesJson = readJson('site/src/themes.json').themes;
const THEME_CARDS = [{ slug: '', name: '기본', card: { bg: '#f3f4f5', fg: '#1a1c20', art: ['square', 'circle'] } }, ...themesJson];
const artSvg = (n, size = 44) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${lucide.icons[n] || ''}</svg>`;
const themeCard = (t, on) => `<button type="button" class="site-theme" aria-pressed="${on}" data-site-theme="${t.slug}" aria-label="${esc(t.name)} 테마 미리 보기" style="--site-theme-bg: ${t.card.bg}; --site-theme-fg: ${t.card.fg}">${artSvg(t.card.art[0])}<span class="site-theme__name">${esc(t.name)}</span>${artSvg(t.card.art[1])}</button>`;
const firstTheme = themesJson[0];
if (SHOW_THEMES) write({
  file: 'themes/index.html', section: 'themes', title: 'Themes', layout: 'full',
  body: `<div class="site-themes">
<aside class="site-themes__aside" aria-label="테마 고르기"><div class="site-themes__panel">
  <div class="site-themes__intro">
    <div class="site-themes__title"><h1 class="site-h1">Themes</h1>${iconBtn('data-site-theme-mode aria-pressed="false"', '미리보기를 다크 모드로 보기', '<i class="ds-icon site-i--moon" aria-hidden="true"></i>')}</div>
    <p class="site-themes__desc">YBM DS 에는 기본 테마가 들어 있습니다. 서비스에 맞게 바꾸려면 마음에 드는 테마 파일을 복사해 쓰세요.</p>
    <a class="ds-link" data-size="small" href="../index.html#custom-theme">테마 사용방법</a>
  </div>
  <div class="site-themes__acts"><a class="ds-btn" data-variant="neutralSolid" data-size="small" data-width="fill" href="${GITHUB}/blob/main/dist/themes/${firstTheme.slug}.css" target="_blank" rel="noopener" data-site-theme-file>이 테마 쓰기</a><a class="ds-btn" data-variant="neutralWeak" data-size="small" data-width="fill" href="pages/${firstTheme.slug}.html" target="_blank" rel="noopener" data-site-theme-open>새 창으로 보기</a></div>
  <div class="site-themes__list" role="group" aria-label="테마">${THEME_CARDS.map((t, i) => themeCard(t, i === 1)).join('')}</div>
</div></aside>
<div class="site-themes__stage"><iframe src="pages/${firstTheme.slug}.html" title="${esc(firstTheme.name)} 테마를 입힌 화면" scrolling="no" data-site-frame data-site-nomono data-site-theme-frame></iframe></div>
</div>`,
});
else fs.rmSync(path.join(SITE, 'themes/index.html'), { force: true });

/* ---------------------------------------------------------------- 자산 */
fs.mkdirSync(path.join(SITE, 'assets'), { recursive: true });
fs.copyFileSync(path.join(SITE, 'src/site.js'), path.join(SITE, 'assets/site.js'));
// 가이드 모노톤: 사이트는 site.css 끝에 붙이고, 템플릿 미리보기 iframe 은 site.js 가 이 파일을 넣는다
fs.copyFileSync(path.join(SITE, 'src/brand-mono.css'), path.join(SITE, 'assets/brand-mono.css'));
fs.copyFileSync(path.join(SITE, 'src/logo-ybmnet.svg'), path.join(SITE, 'assets/logo-ybmnet.svg'));
fs.writeFileSync(path.join(SITE, 'assets/lucide-icons.js'), `/* Lucide ${lucide.version} (ISC) - 생성물: site/src/lucide-icons.json */\nwindow.LUCIDE = ${JSON.stringify(lucide)};\n`);
fs.copyFileSync(path.join(SITE, 'src/lucide-LICENSE.txt'), path.join(SITE, 'assets/lucide-LICENSE.txt'));
// 사이트 전용 아이콘(DS 아이콘 세트에 없는 화면 모드, 저장소 링크용). Lucide 원본 경로를 DS와 같은 방식(mask)으로 쓴다
const SITE_ICONS = {
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
};
const svgUri = (b) => 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + b + '</svg>') + '")';
fs.writeFileSync(path.join(SITE, 'assets/site.css'), fs.readFileSync(path.join(SITE, 'src/site.css'), 'utf8')
  + '\n' + fs.readFileSync(path.join(SITE, 'src/brand-mono.css'), 'utf8')
  + '\n/* 사이트 전용 아이콘 - build.mjs가 붙인다 */\n'
  + Object.entries(SITE_ICONS).map(([n, b]) => `.site-i--${n} { --ds-icon: ${svgUri(b)}; }`).join('\n') + '\n');

figmaDocs();
{
  const byFile = (f) => MD_PAGES.find((p) => p.file === f);
  const gs = GS_ORDER.filter(([f]) => !f.startsWith('foundations/')).map(([f]) => byFile(f)).filter(Boolean);
  const found = MD_PAGES.filter((p) => p.file.startsWith('foundations/'));
  const compPages = MD_PAGES.filter((p) => p.section === 'components');
  const intro = `# YBM DS

> YBM 서비스를 위한 디자인 시스템입니다. HTML 에 .ds-* 클래스를 붙이고 --ybm-* 토큰으로 색, 간격, 글자를 맞춥니다. 이 파일은 AI 도구가 읽도록 문서 목록을 모은 것입니다.

- CSS: ${PUBLIC}/dist/ybm-ds.css
- JS: ${PUBLIC}/dist/ybm-ds.js
- 전체 문서 한 파일: ${SITE_URL}llms-full.txt`;
  const tplList = `## Templates

템플릿 HTML 원본입니다. 안의 CSS 주소(../../../dist/)는 위 CSS, JS 주소로 바꿔 씁니다.

${templates.map((t) => `- [${t.name}](${SITE_URL}templates/pages/${t.slug}.html): ${t.desc}`).join('\n')}`;
  const themeList = `## Themes

DS 다음에 테마 CSS 를 붙이고 \`<html data-ds-theme="이름">\` 으로 켭니다.

${themesJson.map((t) => `- [${t.name} ${t.slug}](${PUBLIC}/dist/themes/${t.slug}.css): ${t.desc}`).join('\n')}`;
  const n = writeMarkdown({ SITE, SITE_URL, intro, extra: SHOW_THEMES ? [tplList, themeList] : [tplList], groups: [{ label: 'Get Started', pages: gs }, { label: 'Foundations', pages: found }, { label: 'Components', pages: compPages }] });
  console.log(`  ✔ 마크다운 ${n}쪽, llms.txt, llms-full.txt`);
}
console.log(`  ✔ 사이트 ${written.length}쪽 생성 (컴포넌트 ${comps.length}, 템플릿 ${templates.length})`);

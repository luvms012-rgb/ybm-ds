// 테마 예시 생성기 (테스트용, 2026-11-04): 테마 CSS 10개(dist/themes/<이름>.css)와 테마를 입힌 "실제 사이트" 화면 10개(site/themes/pages/<이름>.html)를 만든다.
// 사용: node site/themes/gen.mjs  →  node site/build.mjs
// 레퍼런스 A Themes 처럼 테마 하나가 완성된 사이트 한 장으로 보인다. 화면 구성은 회사 UI 패턴 갤러리(uipatterns web)의
// 교육, 도서, 매거진, 커뮤니티, 커머스, 금융 서비스 메인 화면에서 yds 에 어울리는 것을 골라 DS 부품으로 다시 짰다. 서비스 이름과 내용은 모두 가상이다.
// 테마가 바꾸는 것은 세 가지뿐이다: 브랜드 팔레트(brand 100~1000), 바탕과 면 색(bg/canvas, bg/layer-*), 모서리 노브(--ds-shape-scale).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as K from '../templates/gen/kit.mjs';
const { esc, icon, btn, iconBtn, badge, photo, input, search, select, chip, tabs, table, accordion, pagination, progress, callout, link, segmented, sw } = K;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(HERE, '..', '..');
const OUT = path.join(HERE, 'pages');
const LUCIDE = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'src', 'lucide-icons.json'), 'utf8')).icons;

// ── 색 ────────────────────────────────────────────────────────────────────
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => rgb2hex(hex2rgb(a).map((v, i) => v + (hex2rgb(b)[i] - v) * t));
// 600 단계 색 하나로 100~1000 팔레트를 만든다 (밝은 쪽은 흰색, 어두운 쪽은 검정과 섞는다)
const scale = (base) => ({
  100: mix(base, '#ffffff', 0.92), 200: mix(base, '#ffffff', 0.84), 300: mix(base, '#ffffff', 0.7), 400: mix(base, '#ffffff', 0.5), 500: mix(base, '#ffffff', 0.26),
  600: base, 700: mix(base, '#000000', 0.16), 800: mix(base, '#000000', 0.32), 900: mix(base, '#000000', 0.5), 1000: mix(base, '#000000', 0.68),
});
const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// ── 테마 열 ───────────────────────────────────────────────────────────────
// brand: 600 단계 색 · canvas/layer: 라이트 바탕과 면 · dark: 다크 바탕과 면 · shape: 모서리 노브 · site: 예시 사이트 이름
export const THEMES = [
  { slug: 'mint', name: '민트', en: 'Mint', brand: '#12b886', canvas: '#ffffff', layer: '#ffffff', dark: ['#0f1412', '#0f1412', '#161d1a'], shape: 1.25, site: '클래스온', art: ['palette', 'sparkles'],
    desc: '흰 바탕에 민트 그린 하나와 넉넉하게 둥근 카드를 쓴 테마입니다. 취미 클래스, 라이프스타일 서비스처럼 가볍고 산뜻한 화면에 어울립니다.' },
  { slug: 'forest', name: '숲', en: 'Forest', brand: '#00a36c', canvas: '#ffffff', layer: '#ffffff', dark: ['#0e1311', '#0e1311', '#161c19'], shape: 1, site: '러닝핏', art: ['graduation-cap', 'monitor-play'],
    desc: '흰 바탕에 진한 초록과 또렷한 강의 카드를 쓴 테마입니다. 온라인 강의, 학습 마켓처럼 정보가 많은 화면에 어울립니다.' },
  { slug: 'tangerine', name: '귤', en: 'Tangerine', brand: '#ff6a00', canvas: '#fffdfa', layer: '#ffffff', dark: ['#15110d', '#15110d', '#1e1812'], shape: 1, site: '데일리노트', art: ['newspaper', 'coffee'],
    desc: '따뜻한 흰 바탕에 주황 하나와 글 중심 배치를 쓴 테마입니다. 뉴스레터, 매거진, 읽을거리가 많은 화면에 어울립니다.' },
  { slug: 'navy', name: '네이비', en: 'Navy', brand: '#1c3f94', canvas: '#f4f6f9', layer: '#ffffff', dark: ['#0d1017', '#141922', '#1a2030'], shape: 0.75, site: '글로벌어학평가원', art: ['landmark', 'file-check'],
    desc: '옅은 회색 바탕 위 흰 카드와 네이비, 덜 둥근 모서리를 쓴 테마입니다. 시험 접수, 공공, 금융 서비스처럼 신뢰가 중요한 화면에 어울립니다.' },
  { slug: 'violet', name: '보라', en: 'Violet', brand: '#6d4aff', canvas: '#f6f5fc', layer: '#ffffff', dark: ['#100f17', '#100f17', '#19172a'], shape: 1.5, site: '토키', art: ['bot', 'message-circle'],
    desc: '연보라 바탕에 보라 하나와 알약처럼 둥근 모서리를 쓴 테마입니다. AI 튜터, 새로운 기능을 소개하는 화면에 어울립니다.' },
  { slug: 'coral', name: '코랄', en: 'Coral', brand: '#f0506e', canvas: '#ffffff', layer: '#ffffff', dark: ['#15100f', '#15100f', '#1f1817'], shape: 1, site: '무드샵', art: ['shopping-bag', 'heart'],
    desc: '흰 바탕에 코랄 레드와 사진이 큰 상품 카드를 쓴 테마입니다. 쇼핑몰, 뷰티처럼 상품을 많이 보여 주는 화면에 어울립니다.' },
  { slug: 'sky', name: '하늘', en: 'Sky', brand: '#1f8ff0', canvas: '#ffffff', layer: '#ffffff', dark: ['#0d1218', '#0d1218', '#151c25'], shape: 0.75, site: '집꾸밈', art: ['house', 'camera'],
    desc: '흰 바탕에 밝은 하늘색과 각이 조금 살아 있는 카드를 쓴 테마입니다. 커뮤니티, 사진 피드처럼 사용자 글이 많은 화면에 어울립니다.' },
  { slug: 'ink', name: '먹', en: 'Ink', brand: '#1a1c20', canvas: '#f7f5f0', layer: '#ffffff', dark: ['#121212', '#1a1a1a', '#222222'], shape: 0.5, site: '책다락', art: ['book-open', 'library'],
    desc: '종이색 바탕에 검정 하나와 거의 각진 모서리를 쓴 테마입니다. 서점, 출판, 아카이브처럼 글과 책이 주인공인 화면에 어울립니다.' },
  { slug: 'rose', name: '장미', en: 'Rose', brand: '#ff4f8b', canvas: '#fff8fa', layer: '#ffffff', dark: ['#17101 3'.replace(' ', ''), '#17101 3'.replace(' ', ''), '#22171c'], shape: 1.75, site: '키즈잉글리시', art: ['baby', 'star'],
    desc: '연분홍 바탕에 분홍 하나와 아주 둥근 모서리를 쓴 테마입니다. 어린이 학습, 놀이처럼 친근하고 밝은 화면에 어울립니다.' },
  { slug: 'teal', name: '청록', en: 'Teal', brand: '#0b8a9e', canvas: '#f3f6f7', layer: '#ffffff', dark: ['#0c1314', '#121a1c', '#182224'], shape: 1.25, site: '머니온', art: ['wallet', 'chart-line'],
    desc: '옅은 회색 바탕 위 흰 카드와 청록을 쓴 테마입니다. 자산, 결제처럼 숫자가 많고 차분해야 하는 화면에 어울립니다.' },
];

const themeCss = (t) => {
  const p = scale(t.brand);
  const line = (k, v) => `  ${k}: ${v};`;
  return `/* ==========================================================================
   yds 테마 예시 (테스트용) - ${t.name} (${t.slug})
   --------------------------------------------------------------------------
   ${t.desc}

   쓰는 법
     <html lang="ko" data-ds-theme="${t.slug}">
     <link rel="stylesheet" href="…/yds/dist/ybm-ds.css">
     <link rel="stylesheet" href="…/yds/dist/themes/${t.slug}.css">      ← DS 다음에

   테마가 바꾸는 것은 세 가지뿐이다. 컴포넌트는 모두 시맨틱 토큰을 거치므로 따로 고치지 않는다.
     1) palette/brand-100~1000  브랜드 색 (다크는 같은 단계를 뒤집어 넣는다)
     2) bg/canvas, bg/layer-*   바탕과 면 색
     3) --ds-shape-scale        모서리 곡률 노브 ${t.shape}
   이 파일은 site/themes/gen.mjs 가 만든다. 직접 고치지 말고 생성기를 고친다.
   ========================================================================== */

:root[data-ds-theme="${t.slug}"] {
${STEPS.map((s) => line(`--ds-color-palette-brand-${s}`, p[s])).join('\n')}

${line('--ds-color-bg-canvas', t.canvas)}
${line('--ds-color-bg-layer-default', t.layer)}
${line('--ds-color-bg-layer-floating', t.layer)}

${line('--ds-shape-scale', t.shape)}
}

:root[data-ds-theme="${t.slug}"][data-theme="dark"] {
${STEPS.map((s, i) => line(`--ds-color-palette-brand-${s}`, p[STEPS[STEPS.length - 1 - i]])).join('\n')}

${line('--ds-color-bg-canvas', t.dark[0])}
${line('--ds-color-bg-layer-default', t.dark[1])}
${line('--ds-color-bg-layer-floating', t.dark[2])}
}
`;
};

// ── 화면 조각 ──────────────────────────────────────────────────────────────
const art = (name, size = 28, tone = 'brand') => {
  if (!LUCIDE[name]) throw new Error('Lucide 에 없는 아이콘: ' + name);
  return `<svg class="th-art" data-tone="${tone}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE[name]}</svg>`;
};
const nl = (s) => s.split('\n').map(esc).join('<br>');
const img = (topic, i, ratio = '4:3', w = 800) => `<div class="ds-imageframe" data-ratio="${ratio}"><img src="${photo(topic, i, w)}" alt="" loading="lazy"></div>`;
const rating = (v, n) => `<span class="ds-rating" data-size="small" style="--ds-rating-value: ${v}" role="img" aria-label="5점 만점에 ${v}점, ${n}개 평가"><span class="ds-rating__stars"></span><span class="ds-rating__value">${v}</span><span class="ds-rating__count">(${n})</span></span>`;
const won = (n) => n.toLocaleString('ko-KR') + '원';
const avatar = (name, size = 36) => `<span class="ds-avatar" data-size="${size}" role="img" aria-label="${esc(name)}"><span class="ds-avatar__initials" aria-hidden="true">${esc(name.slice(0, 1))}</span></span>`;

// 공통 뼈대: 위 메뉴(로고, 메뉴, 오른쪽), 본문, 아래
const gnb = (name, menu, { end = '', search: q = '', cur = 0, sub = '' } = {}) => `<header class="th-gnb"><div class="th-wrap th-gnb__row">
  <a class="th-logo" href="#">${esc(name)}</a>
  <nav class="th-menu" aria-label="주요 메뉴">${menu.map((m, i) => `<a href="#"${i === cur ? ' aria-current="page"' : ''}>${esc(m)}</a>`).join('')}</nav>
  ${q ? `<div class="th-gnb__search">${search('q', q, 'medium')}</div>` : ''}
  <div class="th-gnb__end">${end || `${iconBtn('search', '검색')}${iconBtn('bell', '알림')}${btn('로그인', { variant: 'neutralWeak', size: 'xsmall' })}`}</div>
  <span class="th-gnb__burger">${iconBtn('menu', '메뉴 열기')}</span>
</div>${sub ? `<div class="th-wrap th-gnb__sub">${sub}</div>` : ''}</header>`;
const foot = (name, links, note) => `<footer class="th-foot"><div class="th-wrap">
  <nav class="th-foot__links" aria-label="약관">${links.map((l, i) => `<a href="#"${i === 1 ? ' data-strong' : ''}>${esc(l)}</a>`).join('')}</nav>
  <div class="th-foot__body"><p><b>${esc(name)}</b>이 화면은 yds 테마 예시예요. 회사 이름, 상품, 연락처는 모두 가상입니다.<br>${esc(note)}</p><p>© 2026 ${esc(name)}</p></div>
</div></footer>`;
const secHead = (title, { sub = '', more = '전체 보기', id = '' } = {}) => `<div class="th-sec__head"><div><h2${id ? ` id="${id}"` : ''}>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${more ? link(more + ' ' + icon('chevron-right', 'sm'), '#', '') : ''}</div>`;
const tiles = (items, cls = '') => `<ul class="th-tiles${cls ? ' ' + cls : ''}">${items.map(([ic, t, tone]) => `<li><a href="#"><span class="th-tile">${art(ic, 28, tone || 'brand')}</span><span>${nl(t)}</span></a></li>`).join('')}</ul>`;
const card = (inner, cls = '') => `<div class="th-card${cls ? ' ' + cls : ''}">${inner}</div>`;

// 공통 CSS: 배치만 적는다. 색, 글자, 간격, 모서리는 모두 DS 토큰이라 테마를 바꾸면 따라 바뀐다
const BASE = `
  body { margin: 0; background: var(--ds-color-bg-canvas); color: var(--ds-color-fg-neutral); word-break: keep-all; overflow-wrap: break-word; }
  a { color: inherit; }
  .th-wrap { box-sizing: border-box; width: min(100%, 1200px); margin-inline: auto; padding-inline: var(--ds-space-x4); }
  @media (min-width: 768px) { .th-wrap { padding-inline: var(--ds-space-x6); } }
  .th-art[data-tone="brand"] { color: var(--ds-color-fg-brand); }
  .th-art[data-tone="positive"] { color: var(--ds-color-fg-positive); }
  .th-art[data-tone="warning"] { color: var(--ds-color-fg-warning); }
  .th-art[data-tone="critical"] { color: var(--ds-color-fg-critical); }
  .th-art[data-tone="magic"] { color: var(--ds-color-fg-magic); }
  .th-art[data-tone="neutral"] { color: var(--ds-color-fg-neutral-muted); }
  .th-art[data-tone="on-brand"] { color: var(--ds-color-fg-on-brand-solid); }
  .th-em { color: var(--ds-color-fg-brand); }
  .th-num { font-variant-numeric: tabular-nums; }
  .th-muted { color: var(--ds-color-fg-neutral-muted); }

  .th-gnb { position: sticky; top: 0; z-index: var(--ds-z-sticky); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
  .th-gnb__row { display: flex; align-items: center; gap: var(--ds-space-x8); height: 64px; }
  .th-logo { font-size: var(--ds-font-size-t07); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; color: var(--ds-color-fg-brand); text-decoration: none; white-space: nowrap; }
  .th-menu { display: none; gap: var(--ds-space-x7); }
  .th-menu a { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); color: var(--ds-color-fg-neutral); text-decoration: none; white-space: nowrap; }
  .th-menu a[aria-current="page"] { color: var(--ds-color-fg-brand); }
  .th-gnb__search { display: none; flex: 1 1 auto; max-width: 420px; }
  .th-gnb__end { display: none; align-items: center; gap: var(--ds-space-x1); margin-left: auto; }
  .th-gnb__burger { margin-left: auto; }
  .th-gnb__sub { display: flex; align-items: center; gap: var(--ds-space-x2); min-height: 48px; overflow-x: auto; scrollbar-width: none; }
  @media (min-width: 1024px) { .th-menu, .th-gnb__search, .th-gnb__end { display: flex; } .th-gnb__burger { display: none; } }

  .th-sec { padding-top: var(--ds-space-x14); }
  .th-sec__head { display: flex; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x4); margin-bottom: var(--ds-space-x6); }
  .th-sec__head h2 { margin: 0; font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .th-sec__head p { margin: var(--ds-space-x1) 0 0; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); }
  .th-sec__head .ds-link { white-space: nowrap; }

  .th-tiles { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--ds-space-x5) var(--ds-space-x2); margin: 0; padding: 0; list-style: none; }
  @media (min-width: 1024px) { .th-tiles { grid-template-columns: repeat(10, minmax(0, 1fr)); } }
  .th-tiles a { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral); text-decoration: none; text-align: center; font-size: var(--ds-font-size-t03); line-height: 18px; }
  .th-tile { display: grid; place-items: center; flex: none; width: 60px; height: 60px; border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-brand-weak); transition: transform var(--ds-duration-fast) var(--ds-easing-standard); }
  .th-tiles a:hover .th-tile { transform: translateY(-2px); }

  .th-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x8) var(--ds-space-x4); }
  @media (min-width: 768px) { .th-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .th-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .th-item { position: relative; display: flex; flex-direction: column; gap: var(--ds-space-x2); color: inherit; text-decoration: none; }
  .th-item .ds-imageframe { border-radius: var(--ds-shape-xl); }
  .th-item__like { position: absolute; top: var(--ds-space-x2); right: var(--ds-space-x2); }
  .th-item__like .ds-btn { background: rgb(255 255 255 / .85); color: var(--ds-color-fg-neutral); }
  .th-item__tag { position: absolute; top: var(--ds-space-x2); left: var(--ds-space-x2); }
  .th-item b { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); }
  .th-item small { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
  .th-item__price { display: flex; align-items: baseline; gap: var(--ds-space-x2); font-size: var(--ds-font-size-t05); }
  .th-item__price b { display: inline; font-size: var(--ds-font-size-t06); }
  .th-item__price s { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); }
  .th-item__off { color: var(--ds-color-fg-critical); font-weight: var(--ds-font-weight-bold); }
  .th-meta { display: flex; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t02); }

  .th-card { padding: var(--ds-space-x6); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .th-card h3 { margin: 0 0 var(--ds-space-x3); font-size: var(--ds-font-size-t06); font-weight: var(--ds-font-weight-bold); }
  .th-card--brand { background: var(--ds-color-bg-brand-weak); box-shadow: none; }
  .th-between { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }

  .th-band { padding: var(--ds-space-x10); border-radius: var(--ds-shape-3xl); background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x6); }
  .th-band h2 { margin: 0; font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
  .th-band p { margin: var(--ds-space-x2) 0 0; opacity: .88; }
  .th-band .ds-btn { background: var(--ds-color-bg-layer-default); color: var(--ds-color-fg-brand); }

  .th-list { margin: 0; padding: 0; list-style: none; }
  .th-list li a { display: flex; flex-direction: column; gap: 2px; padding-block: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); text-decoration: none; }
  .th-list li b { overflow: hidden; font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-medium); text-overflow: ellipsis; white-space: nowrap; }
  .th-list li span { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); }

  .th-foot { margin-top: var(--ds-space-x20); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-weak); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
  .th-foot__links { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2) var(--ds-space-x6); padding-block: var(--ds-space-x5); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
  .th-foot__links a { color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-medium); text-decoration: none; }
  .th-foot__links a[data-strong] { color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-bold); }
  .th-foot__body { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--ds-space-x6); padding-block: var(--ds-space-x6) var(--ds-space-x12); }
  .th-foot__body p { margin: 0; line-height: 22px; }
  .th-foot__body b { display: block; margin-bottom: var(--ds-space-x2); color: var(--ds-color-fg-neutral); font-size: var(--ds-font-size-t05); }
`;

// ── 1. 민트: 취미 클래스 플랫폼 (탈잉, 클래스101 결 - 색 띠 히어로, 분류 아이콘, 주간 BEST 카드, 실시간 랭킹) ──
const mint = () => {
  const css = `
    .th-hero { background: var(--ds-color-bg-brand-weak); }
    .th-hero .th-wrap { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x8); align-items: center; padding-block: var(--ds-space-x12); }
    @media (min-width: 1024px) { .th-hero .th-wrap { grid-template-columns: minmax(0, 1fr) 440px; padding-block: var(--ds-space-x16); } }
    .th-hero h1 { margin: var(--ds-space-x4) 0 0; font-size: 40px; line-height: 1.3; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-hero p { margin: var(--ds-space-x4) 0 var(--ds-space-x8); font-size: var(--ds-font-size-t06); color: var(--ds-color-fg-neutral-muted); }
    .th-hero__acts { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); }
    .th-hero__pager { display: inline-flex; margin-top: var(--ds-space-x8); padding: 2px var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral-weak-alpha); font-size: var(--ds-font-size-t02); }
    .th-hero .ds-imageframe { border-radius: var(--ds-shape-3xl); }
    .th-rank { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); margin: 0; padding: 0; list-style: none; counter-reset: r; }
    @media (min-width: 768px) { .th-rank { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .th-rank a { display: grid; grid-template-columns: 28px 96px minmax(0, 1fr); align-items: center; gap: var(--ds-space-x4); padding: var(--ds-space-x3); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); text-decoration: none; }
    .th-rank a::before { counter-increment: r; content: counter(r); font-size: var(--ds-font-size-t08); font-weight: var(--ds-font-weight-bold); color: var(--ds-color-fg-brand); text-align: center; }
    .th-rank .ds-imageframe { border-radius: var(--ds-shape-lg); }
    .th-rank b { display: block; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); }
    .th-rank small { color: var(--ds-color-fg-neutral-muted); }
    .th-chips { display: flex; gap: var(--ds-space-x2); flex-wrap: wrap; margin-bottom: var(--ds-space-x6); }
  `;
  const CATS = [['trophy', '실시간 랭킹'], ['target', '목표 달성'], ['monitor-play', 'VOD'], ['zap', '신규 클래스'], ['keyboard-music', '아이돌댄스'], ['piano', '피아노'], ['sparkles', '사주, 타로'], ['dumbbell', '홈트'], ['chef-hat', '쿠킹, 베이킹'], ['languages', '외국어']];
  const BEST = [['하루 10분, 흔들리지 않는 발음 만들기', '김세라 · 외국어', 4.9, 412, 'study', 0], ['전신 회복 근본 스트레칭 4주', '로라 · 홈트', 4.8, 236, 'work', 1], ['평생 써먹는 원어민 영어 표현 100', '제임스 · 외국어', 4.9, 1120, 'study', 2], ['주말 집밥, 레시피 없이 요리하기', '윤서진 · 쿠킹', 4.7, 98, 'food', 0], ['첫 피아노, 한 달 뒤 한 곡 완주', '이도윤 · 피아노', 4.8, 164, 'book', 1], ['한 장으로 끝내는 타로 입문', '달빛 · 사주, 타로', 4.6, 77, 'nature', 2], ['필라테스로 자세 바꾸기', '한지우 · 홈트', 4.9, 305, 'work', 2], ['영어 뉴스 받아쓰기 챌린지', '김세라 · 외국어', 4.8, 520, 'study', 1]];
  const RANK = [['노트북 하나로 시작하는 온라인 자동 수익', '창업, 부업 · 선착순 모집'], ['어색한 그림은 그만, 기초부터 드로잉', '드로잉 · 매주 과제'], ['이모티콘 작가가 되는 가장 빠른 길', '디지털 드로잉'], ['경제적 자유를 만드는 미국 주식 입문', '금융, 재테크'], ['초보도 바로 만드는 아이폰 사진 보정', '사진, 영상'], ['하루 20분 영어 말하기 루틴', '외국어']];
  const body = `${gnb('클래스온', ['클래스', '라이브', '커뮤니티', '멤버십', '전자책'], { search: '재능을 검색해 보세요', end: `${btn('로그인', { variant: 'ghost', size: 'xsmall' })}${btn('무료로 시작하기', { variant: 'brandSolid', size: 'xsmall' })}` })}
<section class="th-hero" aria-label="소개"><div class="th-wrap">
  <div>${badge('이번 주 신규', 'brand', true)}<h1>먹어도 저절로 살 빠지는<br><span class="th-em">웨일리 다이어트</span></h1><p>떡볶이, 마라탕, 요아정 이제 참지 마세요. 7일 무료 체험으로 시작해 보세요.</p>
    <div class="th-hero__acts">${btn('클래스 보러 가기', { variant: 'brandSolid', size: 'large', icEnd: 'arrow-right' })}${btn('커리큘럼 미리 보기', { variant: 'neutralWeak', size: 'large' })}</div>
    <span class="th-hero__pager th-num">1 / 13</span></div>
  ${img('food', 1, '4:3', 1000)}
</div></section>
<main class="th-wrap">
  <section class="th-sec" aria-label="분류">${tiles(CATS)}</section>
  <section class="th-sec" aria-labelledby="s1">${secHead('주간 BEST 인기 클래스 20', { id: 's1', sub: '이번 주 가장 많이 수강한 클래스예요' })}
    <div class="th-chips">${['전체', '외국어', '홈트', '쿠킹', '음악', '재테크'].map((t, i) => chip(t, { on: !i, variant: i ? 'outlineWeak' : 'solid' })).join('')}</div>
    <div class="th-grid">${BEST.map(([t, a, r, n, ph, pi], i) => `<a class="th-item" href="#">${img(ph, pi + i, '4:3', 600)}<span class="th-item__tag">${badge(i % 3 ? 'VOD' : 'LIVE', i % 3 ? 'neutral' : 'critical', true)}</span><span class="th-item__like">${iconBtn('heart', '찜하기', { size: 'xsmall' })}</span><b>${t}</b><small>${a}</small>${rating(r, n)}</a>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s2">${secHead('실시간 인기 클래스', { id: 's2' })}
    <ol class="th-rank">${RANK.map(([t, s], i) => `<li><a href="#">${img(['work', 'book', 'product', 'city', 'product', 'study'][i], i, '4:3', 300)}<span><b>${t}</b><small>${s}</small></span></a></li>`).join('')}</ol></section>
  <section class="th-sec" aria-label="멤버십"><div class="th-band"><div><h2>클래스온 멤버십</h2><p>월 19,900원으로 모든 VOD 클래스를 무제한으로 들어요.</p></div>${btn('멤버십 시작하기', { variant: 'neutralSolid', size: 'large', icEnd: 'arrow-right' })}</div></section>
</main>
${foot('클래스온', ['이용약관', '개인정보 처리방침', '환불 규정', '크리에이터 지원'], '서울시 가상구 예시로 1 · hello@example.com')}`;
  return { css, body };
};

// ── 2. 숲: 강의 마켓 (인프런 결 - 띠 공지, 검색 메뉴, 분류 아이콘, 필터 칩, 가격과 평점이 있는 강의 격자) ──
const forest = () => {
  const css = `
    .th-promo { background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); text-align: center; font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-semibold); padding: var(--ds-space-x2) var(--ds-space-x4); }
    .th-promo span { opacity: .8; font-weight: var(--ds-font-weight-regular); margin-left: var(--ds-space-x2); }
    .th-filters { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); padding-top: var(--ds-space-x8); }
    .th-filters .ds-select { margin-left: auto; width: 128px; }
    .th-applied { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2); padding-top: var(--ds-space-x3); }
    .th-grid { padding-top: var(--ds-space-x8); }
    @media (min-width: 1024px) { .th-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
    .th-item .ds-imageframe { border-radius: var(--ds-shape-lg); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
    .th-pager { display: flex; justify-content: center; padding-top: var(--ds-space-x10); }
    .th-bizband { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: center; margin-top: var(--ds-space-x16); padding: var(--ds-space-x8); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-neutral-weak-alpha); }
    @media (min-width: 1024px) { .th-bizband { grid-template-columns: minmax(0, 1fr) 360px; } }
    .th-bizband h2 { margin: 0 0 var(--ds-space-x2); font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-bizband p { margin: 0 0 var(--ds-space-x5); color: var(--ds-color-fg-neutral-muted); }
    .th-bizband .ds-imageframe { border-radius: var(--ds-shape-xl); }
  `;
  const CATS = [['search', '전체'], ['code', '개발, 프로그래밍'], ['gamepad-2', '게임 개발'], ['database', '데이터 사이언스'], ['brain', '인공지능'], ['shield', '보안, 네트워크'], ['cpu', '하드웨어'], ['palette', '디자인, 아트'], ['briefcase', '기획, 경영'], ['languages', '어학']];
  const COURSES = [['세계 자바 챔피언의 레전드 강의', '블라드 미하일로프', 55000, 38500, 5.0, 94, 'work', 0], ['서류 합격률 4%를 탈출하는 개발자 이력서 작성법', '강승현', 22000, 15400, 5.0, 29, 'study', 1], ['시니어 면접관이 알려주는 개발자 취업과 이직', '코드빌런', 165000, 115500, 4.8, 208, 'book', 2], ['CS 지식의 정석, 디자인 패턴과 네트워크', '큰돌', 154000, 107800, 4.4, 12, 'work', 3], ['하루 100만 원 벌게 해준 프리랜서 노하우', '제임스', 99000, 69300, 4.9, 61, 'city', 0], ['모바일 웹 퍼블리싱 포트폴리오 with Figma', '코딩웍스', 44000, 30800, 4.9, 118, 'product', 1], ['포트폴리오 사이트 만들고 배포까지', '짐코딩', 66000, 46200, 4.8, 73, 'study', 2], ['기출로 대비하는 개발자 전공 면접', '개발자 뭉치', 38000, 26600, 4.7, 44, 'book', 3], ['해외 빅테크 코딩 인터뷰 LeetCode 족보', '노승찬', 77000, 53900, 4.6, 21, 'work', 4], ['실무로 배우는 영어 이메일과 미팅 표현', '엘리', 33000, 23100, 4.9, 302, 'study', 4]];
  const body = `<div class="th-promo">오늘이 마지막! 30% 할인 종료<span>무료 강의 선물 + 전강의 30%</span></div>
${gnb('러닝핏', ['강의', '로드맵', '멘토링', '커뮤니티'], { search: '나의 진짜 성장을 도와줄 실무 강의를 찾아보세요', end: `${btn('한국어', { variant: 'ghost', size: 'xsmall', ic: 'globe' })}${btn('로그인', { variant: 'brandSolid', size: 'xsmall' })}` })}
<main class="th-wrap">
  <section class="th-sec" aria-label="분류" style="padding-top: var(--ds-space-x8)">${tiles(CATS)}</section>
  <section aria-label="거르기">
    <div class="th-filters">${btn('기술 검색', { variant: 'neutralOutline', size: 'small', ic: 'funnel', icEnd: 'chevron-down' })}${['얼리버드 할인', '무료', '할인', '유료', '모임, 부트캠프', '난이도'].map((t, i) => chip(t, { size: 'medium', variant: 'outlineWeak', on: i === 0 })).join('')}${select('추천순', { aria: '정렬', size: 'small' })}</div>
    <div class="th-applied">${badge('포트폴리오 <button type="button" class="ds-badge__action" aria-label="포트폴리오 삭제"><i class="ds-icon ds-icon--x"></i></button>', 'brand')}${badge('면접 <button type="button" class="ds-badge__action" aria-label="면접 삭제"><i class="ds-icon ds-icon--x"></i></button>', 'brand')}</div>
    <div class="th-grid">${COURSES.map(([t, a, p, d, r, n, ph, pi], i) => `<a class="th-item" href="#">${img(ph, pi, '16:9', 480)}${i === 2 ? `<span class="th-item__tag">${badge('Update', 'positive', true)}</span>` : ''}<b>${t}</b><small>${a}</small><span class="th-item__price"><s class="th-num">${won(p)}</s><span class="th-item__off">30%</span><b class="th-num">${won(d)}</b></span><span class="th-meta">${rating(r, n)}<span>·</span>${icon('users', 'sm')} ${(n * 7).toLocaleString()}+</span></a>`).join('')}</div>
    <div class="th-pager">${pagination(1, 24)}</div></section>
  <section class="th-bizband" aria-label="기업 교육"><div><span class="th-em" style="font-weight: var(--ds-font-weight-semibold)">러닝핏 비즈니스</span><h2>팀의 성장을 한곳에서 관리하세요</h2><p>직원 교육 배정, 진도 확인, 수료 보고서까지. 20인 이상 기업은 무료 체험을 드려요.</p>${btn('도입 문의', { variant: 'brandSolid', size: 'medium', icEnd: 'arrow-right' })}</div>${img('work', 2, '16:9', 720)}</section>
</main>
${foot('러닝핏', ['이용약관', '개인정보 처리방침', '지식공유 참여', '기업 서비스'], '경기도 가상시 예시로 77 · support@example.com')}`;
  return { css, body };
};

// ── 3. 귤: 뉴스레터, 매거진 (뉴닉 결 - 탭, 알림 띠, 대표 기사, 두 열 기사 목록, 오른쪽 로그인 카드와 짧은 소식) ──
const tangerine = () => {
  const css = `
    .th-layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x10); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-layout { grid-template-columns: minmax(0, 1fr) 300px; } }
    .th-tabs { margin-bottom: var(--ds-space-x6); }
    .th-feature { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); margin-top: var(--ds-space-x6); color: inherit; text-decoration: none; }
    @media (min-width: 768px) { .th-feature { grid-template-columns: 300px minmax(0, 1fr); } }
    .th-feature .ds-imageframe { border-radius: var(--ds-shape-xl); }
    .th-feature h2 { margin: var(--ds-space-x3) 0; font-size: var(--ds-font-size-t08); line-height: 1.4; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-feature p { margin: 0 0 var(--ds-space-x4); color: var(--ds-color-fg-neutral-muted); line-height: 26px; }
    .th-by { display: flex; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); }
    .th-by b { color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-semibold); }
    .th-news { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6) var(--ds-space-x8); margin: var(--ds-space-x10) 0 0; padding: 0; list-style: none; }
    @media (min-width: 768px) { .th-news { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .th-news a { display: grid; grid-template-columns: 112px minmax(0, 1fr); gap: var(--ds-space-x4); align-items: center; color: inherit; text-decoration: none; }
    .th-news .ds-imageframe { border-radius: var(--ds-shape-lg); }
    .th-news b { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; font-size: var(--ds-font-size-t05); line-height: 24px; font-weight: var(--ds-font-weight-semibold); }
    .th-news small { display: block; margin-top: var(--ds-space-x1); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); }
    .th-side { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
    .th-card--login { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); text-align: center; }
    .th-card--login p { margin: 0; font-weight: var(--ds-font-weight-semibold); line-height: 24px; }
    .th-card h3 { display: flex; align-items: center; gap: var(--ds-space-x2); font-size: var(--ds-font-size-t05); }
    .th-tags { display: flex; flex-wrap: wrap; gap: var(--ds-space-x1) var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: 22px; font-weight: var(--ds-font-weight-semibold); }
    .th-card--survey { text-align: center; }
    .th-card--survey p { margin: 0 0 var(--ds-space-x4); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
    .th-mini { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); line-height: 20px; }
    .th-mini a { text-decoration: none; margin-right: var(--ds-space-x2); }
  `;
  const LIST = [['제2의 딥시크, AI 에이전트 마누스의 등장', '뉴스 · 17시간 전', 'work', 0], ['대통령 탄핵심판 선고일이 미뤄질 수 있는 이유', '뉴스 · 18시간 전', 'city', 1], ['박물관에 전시된 역사 속 사진의 뒷이야기', '뉴스 · 20시간 전', 'book', 2], ['테슬라 주식이 하루 만에 15% 떨어진 이유', '뉴스 · 21시간 전', 'product', 1], ['출판계에서 리커버 에디션이 인기인 이유', '고슴이의책 · 하루 전', 'book', 0], ['전 세계 경제를 들었다 놨다 하는 관세 정책', '뉴스 · 2일 전', 'city', 2], ['어르신들이 만들어 주는 가장 따뜻한 국밥', '뉴스 · 2일 전', 'food', 1], ['전투기 오폭 사고 중간 조사 결과', '뉴스 · 2일 전', 'nature', 2]];
  const body = `${gnb('데일리노트', ['홈', '시리즈', '그라운드', '아카이브'], { end: `${btn('광고 제휴', { variant: 'ghost', size: 'xsmall' })}${iconBtn('search', '검색')}${iconBtn('bell', '알림')}${btn('로그인', { variant: 'brandOutline', size: 'xsmall' })}` })}
<main class="th-wrap th-layout">
  <div>
    <div class="th-tabs">${tabs(['데일리', '아티클', '포스트'], 0, '글 종류', { layout: 'hug' })}</div>
    ${callout('', `${icon('clock', 'sm')} <b style="color: var(--ds-color-fg-brand)">20시간 남았어요!</b> 시간 없을 때 하루에 딱 이것만 보세요. <a class="ds-callout__link" href="#">소식 보러 가기</a>`, 'neutral', 'clock')}
    <a class="th-feature" href="#">${img('city', 0, '4:3', 700)}<div>${badge('헤드라인', 'brand')}<h2>역대급 실업급여 지급, 찬바람 부는 취업 시장 올해는 괜찮아질까?</h2><p>역대급 고용 한파에 실업급여 수급자가 증가했어요. 취업 시장의 양극화가 심해지고 있는 건데요. 상반기 채용 시즌이 시작됐지만 취업 시장이 다시 회복할지는 지켜봐야 해요.</p><span class="th-by"><b>헤드라인</b> 한 시간 전 · 읽는 데 4분</span></div></a>
    <ul class="th-news">${LIST.map(([t, m, ph, pi]) => `<li><a href="#">${img(ph, pi, '4:3', 300)}<span><b>${t}</b><small>${m}</small></span></a></li>`).join('')}</ul>
    <div style="display: flex; justify-content: center; padding-top: var(--ds-space-x10)">${btn('지난 소식 더 보기', { variant: 'neutralWeak', size: 'medium', icEnd: 'chevron-down' })}</div>
  </div>
  <aside class="th-side" aria-label="옆 내용">
    ${card(`${art('mail-open', 40)}<p>로그인하고<br>맞춤 콘텐츠를 이용해 보세요</p>${btn('데일리노트 시작하기', { variant: 'brandSolid', size: 'medium' })}`, 'th-card--login')}
    ${card(`<h3>${art('timer', 20)} 1분 뉴스</h3><div class="th-tags">${['#대통령선거', '#반도체', '#물가', '#환율', '#AI규제', '#부동산'].map((t) => `<a href="#" style="text-decoration: none">${t}</a>`).join('')}</div>`)}
    ${card(`${badge('이번 주 설문', 'warning')}<h3 style="justify-content: center; margin-top: var(--ds-space-x3)">지자체 소개팅, 어떻게 생각해?</h3><p>기간 3월 10일 ~ 3월 12일</p>${btn('설문 참여하기', { variant: 'brandSolid', size: 'small', icEnd: 'arrow-right' })}`, 'th-card--survey')}
    ${card(`<h3>${art('bell-ring', 20)} 매일 아침 7시</h3><p style="margin: 0 0 var(--ds-space-x3); font-size: var(--ds-font-size-t03); line-height: 20px">뉴스레터로 받아 보세요. 광고 없이 핵심만 보내 드려요.</p>${input('em', 'type="email" placeholder="이메일 주소" aria-label="이메일 주소"', { size: 'medium' })}<div style="margin-top: var(--ds-space-x2)">${btn('구독하기', { variant: 'brandSolid', size: 'small', fill: true })}</div>`, 'th-card--brand')}
    <p class="th-mini">© 데일리노트<br><a href="#">뉴스레터 구독</a><a href="#">채용</a><a href="#">광고 제휴</a><a href="#">이용약관</a><a href="#">개인정보 처리방침</a></p>
  </aside>
</main>
${foot('데일리노트', ['이용약관', '개인정보 처리방침', '청소년 보호 정책', '광고 제휴'], '서울시 가상구 예시로 33 · news@example.com')}`;
  return { css, body };
};

// ── 4. 네이비: 어학시험 접수 (교보문고, 시험 접수 결 - 위 작은 링크 줄, 큰 배너와 로그인 카드, 바로 가기, 접수 단계, 시험 일정 표, 공지) ──
const navy = () => {
  const css = `
    .th-util { display: none; justify-content: flex-end; gap: var(--ds-space-x4); padding-block: var(--ds-space-x2); font-size: var(--ds-font-size-t02); color: var(--ds-color-fg-neutral-muted); }
    .th-util a { text-decoration: none; }
    .th-utilbar { background: var(--ds-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
    @media (min-width: 1024px) { .th-util { display: flex; } }
    .th-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-hero { grid-template-columns: minmax(0, 1fr) 320px; } }
    .th-banner { position: relative; overflow: hidden; border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); }
    .th-banner > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .28; }
    .th-banner__text { position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start; gap: var(--ds-space-x2); box-sizing: border-box; min-height: 300px; padding: var(--ds-space-x8); }
    .th-banner__text h1 { margin: 0; font-size: 32px; line-height: 1.35; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-banner__text p { margin: 0; opacity: .9; }
    .th-banner__pager { position: absolute; right: var(--ds-space-x6); bottom: var(--ds-space-x6); padding: 2px var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: rgb(0 0 0 / .35); font-size: var(--ds-font-size-t02); }
    .th-login { display: flex; flex-direction: column; justify-content: center; gap: var(--ds-space-x4); text-align: center; }
    .th-login p { margin: 0; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-bold); }
    .th-login p span { display: block; color: var(--ds-color-fg-brand); font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-semibold); }
    .th-login__links { display: flex; justify-content: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t03); color: var(--ds-color-fg-neutral-muted); }
    .th-login__links a { text-decoration: none; }
    .th-tile { background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
    .th-steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); }
    @media (min-width: 768px) { .th-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .th-step { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
    .th-step b { font-size: var(--ds-font-size-t05); }
    .th-step small { color: var(--ds-color-fg-neutral-muted); line-height: 20px; }
    .th-step__no { color: var(--ds-color-fg-brand); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); }
    .th-two { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
    @media (min-width: 1024px) { .th-two { grid-template-columns: minmax(0, 1fr) 340px; } }
    .th-call { display: flex; align-items: center; gap: var(--ds-space-x4); margin-top: var(--ds-space-x4); padding-top: var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-weak); }
    .th-call b { display: block; color: var(--ds-color-fg-brand); font-size: var(--ds-font-size-t07); letter-spacing: -0.02em; }
    .th-call small { color: var(--ds-color-fg-neutral-muted); }
  `;
  const QUICK = [['calendar-check', '시험 접수'], ['ticket', '수험표 출력'], ['award', '성적 확인'], ['map-pin', '고사장 찾기'], ['refresh-cw', '접수 변경, 취소'], ['file-text', '성적표 발급'], ['building', '단체 접수'], ['book-open', '시험 안내'], ['badge-check', '정기 시험 일정'], ['headset', '고객센터']];
  const ROWS = [['제512회', '2026.11.22(토)', '10.20 ~ 11.03', ['접수 중', 'positive'], true], ['제513회', '2026.12.13(일)', '11.10 ~ 11.24', ['접수 예정', 'informative'], false], ['제514회', '2027.01.10(토)', '12.08 ~ 12.22', ['접수 예정', 'informative'], false], ['스피킹 제98회', '2026.11.29(일)', '10.27 ~ 11.17', ['추가 접수', 'warning'], true], ['라이팅 제41회', '2026.12.06(토)', '11.03 ~ 11.24', ['접수 예정', 'informative'], false]];
  const body = `<div class="th-utilbar"><div class="th-util th-wrap"><a href="#">고객센터</a><a href="#">단체 접수</a><a href="#">회원가입</a><a href="#">로그인</a></div></div>
${gnb('글로벌어학평가원', ['시험 접수', '성적 확인', '시험 안내', '학습 자료', '고객센터'], { end: `${iconBtn('search', '검색')}${btn('마이페이지', { variant: 'neutralWeak', size: 'xsmall', ic: 'user' })}${btn('지금 접수하기', { variant: 'brandSolid', size: 'xsmall' })}` })}
<main class="th-wrap">
  <section class="th-hero" aria-label="소식">
    <div class="th-banner"><img src="${photo('city', 3, 1400)}" alt=""><div class="th-banner__text">${badge('제512회 정기 시험', 'brand', true)}<h1>11월 22일 시험<br>접수 마감이 3일 남았어요</h1><p>모바일로 3분이면 접수가 끝나요. 접수 후 고사장 변경은 마감 전까지 가능해요.</p><div style="margin-top: var(--ds-space-x4)">${btn('지금 접수하기', { variant: 'neutralSolid', size: 'large', icEnd: 'arrow-right' })}</div></div><span class="th-banner__pager th-num">2 / 4</span></div>
    ${card(`<p><span>로그인하고</span>내 시험을 한눈에 확인하세요</p>${btn('로그인', { variant: 'brandSolid', size: 'large', fill: true })}${btn('간편 인증으로 로그인', { variant: 'neutralWeak', size: 'medium', fill: true })}<div class="th-login__links"><a href="#">아이디 찾기</a><a href="#">비밀번호 찾기</a><a href="#">회원가입</a></div>`, 'th-login')}
  </section>
  <section class="th-sec" aria-label="바로 가기">${tiles(QUICK)}</section>
  <section class="th-sec" aria-labelledby="s1">${secHead('접수는 네 단계면 끝나요', { id: 's1', more: '접수 안내 자세히' })}
    <div class="th-steps">${[['시험과 회차 고르기', '시험 종류와 날짜를 고르고 잔여석을 확인해요.', 'calendar-check'], ['고사장 고르기', '집과 가까운 고사장을 지도에서 골라요.', 'map-pin'], ['응시자 정보와 사진', '영문 이름과 규격 사진을 올려요.', 'id-card'], ['결제와 수험표', '결제하면 바로 수험표가 나와요.', 'ticket']].map(([t, d, ic], i) => card(`<span class="th-step__no">STEP ${i + 1}</span>${art(ic, 32)}<b>${t}</b><small>${d}</small>`, 'th-step')).join('')}</div></section>
  <section class="th-sec th-two" aria-label="일정과 공지">
    ${card(`<h3>시험 일정</h3>${table(['회차', '시험일', '접수 기간', '상태', ''], ROWS.map(([r, d, p, [s, tone], can]) => [`<b>${r}</b>`, d, p, badge(s, tone), can ? btn('접수', { variant: 'brandSolid', size: 'xsmall' }) : btn('알림 신청', { variant: 'neutralWeak', size: 'xsmall' })]), { compact: true })}<p class="th-muted" style="margin: var(--ds-space-x3) 0 0; font-size: var(--ds-font-size-t03)">접수 기간은 오전 10시에 열리고 마지막 날 오후 6시에 닫혀요.</p>`)}
    ${card(`<div class="th-between"><h3 style="margin: 0">공지사항</h3>${link('더 보기', '#', '')}</div><ul class="th-list" style="margin-top: var(--ds-space-x2)">${[['제512회 고사장 추가 개설 안내', '2026.11.02'], ['[안내] 신분증 인정 범위 변경', '2026.10.28'], ['성적표 발급 서비스 점검 (11.08 02:00 ~ 06:00)', '2026.10.25'], ['[발표] 제511회 성적 발표', '2026.10.21']].map(([t, d]) => `<li><a href="#"><b>${t}</b><span>${d}</span></a></li>`).join('')}</ul><div class="th-call">${art('headset', 36)}<div><b>1588-0000</b><small>평일 09:00 ~ 18:00 · 점심 12:00 ~ 13:00</small></div></div>`)}
  </section>
</main>
${foot('글로벌어학평가원', ['이용약관', '개인정보 처리방침', '이메일 무단 수집 거부', '단체 접수 안내'], '서울시 가상구 예시로 100 · help@example.com')}`;
  return { css, body };
};

// ── 5. 보라: AI 영어 튜터 (AI 서비스 소개 결 - 가운데 큰 제목, 대화 미리 보기, 기능 카드, 요금제, 자주 묻는 질문) ──
const violet = () => {
  const css = `
    .th-hero { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x5); padding-top: var(--ds-space-x16); text-align: center; }
    .th-eyebrow { display: inline-flex; align-items: center; gap: var(--ds-space-x1); padding: 4px var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-brand-weak); color: var(--ds-color-fg-brand); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-semibold); }
    .th-hero h1 { margin: 0; max-width: 760px; font-size: 44px; line-height: 1.25; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.035em; }
    .th-hero p { margin: 0; max-width: 560px; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); }
    .th-hero__acts { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ds-space-x2); }
    .th-chat { box-sizing: border-box; width: min(100%, 720px); margin-top: var(--ds-space-x8); padding: var(--ds-space-x5); border-radius: var(--ds-shape-3xl); background: var(--ds-color-bg-layer-default); box-shadow: var(--ds-elevation-raised); text-align: left; }
    .th-chat__head { display: flex; align-items: center; gap: var(--ds-space-x3); padding-bottom: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
    .th-chat__head b { display: block; }
    .th-chat__head small { color: var(--ds-color-fg-positive); font-size: var(--ds-font-size-t02); }
    .th-chat__log { display: flex; flex-direction: column; gap: var(--ds-space-x3); padding-block: var(--ds-space-x5); }
    .th-chat__log .ds-chat-bubble { max-width: 80%; }
    .th-chat__log .ds-chat-bubble[data-sender="user"] { align-self: flex-end; }
    .th-fix { display: inline-flex; align-items: center; gap: var(--ds-space-x1); margin-top: var(--ds-space-x2); padding: 2px var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-positive-weak); color: var(--ds-color-fg-positive); font-size: var(--ds-font-size-t02); }
    .th-feat { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
    @media (min-width: 768px) { .th-feat { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .th-fcard { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
    .th-fcard b { font-size: var(--ds-font-size-t06); }
    .th-fcard p { margin: 0; color: var(--ds-color-fg-neutral-muted); line-height: 24px; }
    .th-plans { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); align-items: start; }
    @media (min-width: 768px) { .th-plans { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .th-plan { position: relative; display: flex; flex-direction: column; gap: var(--ds-space-x5); }
    .th-plan[data-hot] { box-shadow: inset 0 0 0 2px var(--ds-color-stroke-brand-solid); }
    .th-plan[data-hot] > .ds-badge { position: absolute; top: calc(-1 * var(--ds-space-x3)); left: var(--ds-space-x7); }
    .th-plan h3 { margin: 0; }
    .th-plan__price { font-size: var(--ds-font-size-t09); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-plan__price small { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-regular); letter-spacing: 0; }
    .th-plan ul { display: flex; flex-direction: column; gap: var(--ds-space-x2); margin: 0; padding: 0; list-style: none; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); }
    .th-plan li { display: flex; align-items: center; gap: var(--ds-space-x2); }
    .th-plan li .ds-icon { color: var(--ds-color-fg-brand); }
    .th-faq { max-width: 760px; margin-inline: auto; }
    .th-faq .th-sec__head { justify-content: center; text-align: center; }
  `;
  const body = `${gnb('토키', ['기능', '요금제', '후기', '기업용'], { end: `${btn('로그인', { variant: 'ghost', size: 'xsmall' })}${btn('무료로 시작하기', { variant: 'brandSolid', size: 'xsmall' })}` })}
<main class="th-wrap">
  <section class="th-hero" aria-label="소개">
    <span class="th-eyebrow">${icon('sparkles', 'sm')} 새로워진 토키 3.0</span>
    <h1>매일 10분, AI 튜터와<br>진짜 대화로 배우는 영어</h1>
    <p>말하면 바로 고쳐 주고, 내 수준에 맞는 표현을 알려 줘요. 발음, 문법, 어휘를 한 번에 챙기세요.</p>
    <div class="th-hero__acts">${btn('7일 무료 체험', { variant: 'brandSolid', size: 'large', icEnd: 'arrow-right' })}${btn('데모 보기', { variant: 'neutralWeak', size: 'large', ic: 'play' })}</div>
    <div class="th-chat" role="group" aria-label="대화 미리 보기">
      <div class="th-chat__head">${avatar('토키', 42)}<div><b>토키 튜터</b><small>● 지금 대화 중 · 비즈니스 영어</small></div><div style="margin-left: auto">${badge('Day 12', 'brand')}</div></div>
      <div class="th-chat__log">
        <p class="ds-chat-system" data-variant="divider">오늘</p>
        <div class="ds-chat-bubble">Good morning! Tell me about a meeting you had this week.</div>
        <div class="ds-chat-bubble" data-sender="user">I had meeting with my team on Monday. We discussed about the new project.</div>
        <div class="ds-chat-bubble">Nice! Two small fixes 👇<br><span class="th-fix">${icon('check', 'sm')} I had <b>a</b> meeting</span> <span class="th-fix">${icon('check', 'sm')} We discussed the project (no “about”)</span><br><br>What was the most important decision?</div>
      </div>
      <form class="ds-chat-composer" onsubmit="return false"><button type="button" class="ds-chat-composer__attach" aria-label="첨부"><i class="ds-icon ds-icon--plus" aria-hidden="true"></i></button><div class="ds-chat-composer__field"><textarea class="ds-chat-composer__input" rows="1" placeholder="영어로 답해 보세요 (한국어도 괜찮아요)" aria-label="메시지"></textarea>${iconBtn('mic', '음성으로 말하기', { size: 'xsmall' })}<button type="submit" class="ds-chat-send" aria-label="보내기"></button></div></form>
    </div>
  </section>
  <section class="th-sec" aria-labelledby="s1">${secHead('왜 토키인가요?', { id: 's1', more: '' })}
    <div class="th-feat">${[['mic', '말하면 바로 고쳐 줘요', '문장을 끝내면 틀린 곳과 더 자연스러운 표현을 바로 보여 줘요. 발음 점수도 함께요.'], ['route', '내 목표에 맞춘 커리큘럼', '여행, 면접, 비즈니스 미팅처럼 목표를 고르면 매일 대화 주제가 바뀌어요.'], ['chart-no-axes-combined', '실력 변화가 보여요', '주간 리포트로 자주 틀리는 문법과 늘어난 어휘를 숫자로 확인해요.']].map(([ic, t, d]) => card(`<span class="th-tile">${art(ic, 28)}</span><b>${t}</b><p>${d}</p>`, 'th-fcard')).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s2">${secHead('요금제', { id: 's2', sub: '언제든 해지할 수 있어요', more: '' })}
    <div class="th-plans">${[['스타터', 0, '가볍게 시작', ['하루 1회 대화 (10분)', '기본 교정', '주간 리포트'], false, '무료로 시작'], ['플러스', 14900, '가장 많이 골라요', ['무제한 대화', '발음 점수와 상세 교정', '목표별 커리큘럼', '복습 노트'], true, '7일 무료 체험'], ['프로', 29900, '시험과 면접 준비', ['플러스의 모든 기능', '모의 면접, 스피킹 시험 모드', '원어민 튜터 월 2회', '우선 지원'], false, '프로 시작하기']].map(([n, p, s, f, hot, cta]) => `<div class="th-card th-plan"${hot ? ' data-hot' : ''}>${hot ? badge('인기', 'brand', true) : ''}<div><h3>${n}</h3><small class="th-muted">${s}</small></div><div class="th-plan__price th-num">${p ? won(p) : '무료'}${p ? '<small> / 월</small>' : ''}</div><ul>${f.map((x) => `<li>${icon('check', 'sm')}${x}</li>`).join('')}</ul>${btn(cta, { variant: hot ? 'brandSolid' : 'neutralWeak', size: 'medium', fill: true })}</div>`).join('')}</div></section>
  <section class="th-sec th-faq" aria-labelledby="s3">${secHead('자주 묻는 질문', { id: 's3', more: '' })}
    ${accordion([['영어를 거의 못해도 할 수 있나요?', '네. 첫 대화에서 수준을 가늠한 뒤 쉬운 문장부터 시작해요. 한국어로 답해도 토키가 영어 표현을 알려 줘요.', true], ['음성 대화도 되나요?', '마이크 버튼을 누르고 말하면 돼요. 발음 점수와 함께 어떤 소리를 고치면 좋을지 알려 줘요.'], ['무료 체험이 끝나면 자동으로 결제되나요?', '체험이 끝나기 하루 전에 알림을 보내요. 그때 해지하면 결제되지 않아요.'], ['기업용 플랜도 있나요?', '임직원 교육용으로 관리자 화면과 진도 리포트를 제공해요. 기업용 메뉴에서 문의해 주세요.']], 'separated')}</section>
  <section class="th-sec" aria-label="시작"><div class="th-band" style="justify-content: center; text-align: center; flex-direction: column"><div><h2>오늘부터 매일 10분</h2><p>첫 7일은 무료예요. 카드 등록 없이 바로 시작해 보세요.</p></div>${btn('무료로 시작하기', { variant: 'neutralSolid', size: 'large', icEnd: 'arrow-right' })}</div></section>
</main>
${foot('토키', ['이용약관', '개인정보 처리방침', '환불 정책', '기업용 문의'], '서울시 가상구 예시로 7 · hi@example.com')}`;
  return { css, body };
};

// ── 6. 코랄: 쇼핑몰 (올리브영, 지그재그 결 - 분류 줄, 큰 배너 둘, 타임 세일, 브랜드 선반, 상품 격자) ──
const coral = () => {
  const css = `
    .th-banners { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-banners { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); } }
    .th-bn { position: relative; overflow: hidden; border-radius: var(--ds-shape-2xl); color: var(--ds-color-palette-static-white); text-decoration: none; }
    .th-bn img { display: block; width: 100%; aspect-ratio: 2 / 1; object-fit: cover; }
    .th-bn--side img { aspect-ratio: 1; }
    @media (min-width: 1024px) { .th-bn--side img { aspect-ratio: auto; height: 100%; } }
    .th-bn__text { position: absolute; inset: auto 0 0; padding: var(--ds-space-x7); background: linear-gradient(transparent, rgb(0 0 0 / .6)); }
    .th-bn__text b { display: block; font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-bn__text span { opacity: .9; font-size: var(--ds-font-size-t04); }
    .th-sale { display: flex; align-items: center; gap: var(--ds-space-x3); }
    .th-timer { display: inline-flex; align-items: center; gap: var(--ds-space-x1); padding: 4px var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-critical-weak); color: var(--ds-color-fg-critical); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); }
    .th-brands { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x3); }
    @media (min-width: 768px) { .th-brands { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .th-brand { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x4); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral-weak-alpha); text-decoration: none; }
    .th-brand b { display: block; font-size: var(--ds-font-size-t04); }
    .th-brand small { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t02); }
    .th-item .ds-imageframe { border-radius: var(--ds-shape-lg); }
  `;
  const PRODS = [['[1+1] 비타민 C 세럼 30ml 더블 기획', '글로우랩', 48000, 24900, 4.8, 2310, 'product', 0], ['수분 가득 히알루론 크림 100ml', '워터핏', 32000, 19900, 4.9, 1180, 'product', 1], ['데일리 선크림 SPF50+ 3개 세트', '선데이', 39000, 27300, 4.7, 860, 'product', 2], ['향기로운 바디워시 라벤더 500ml', '포레스트', 18000, 12600, 4.8, 455, 'product', 3], ['리넨 쿠션 커버 2종', '무드홈', 32000, 22400, 4.6, 128, 'product', 4], ['손으로 빚은 머그 세트', '도자기공방', 28000, 25200, 4.9, 77, 'food', 2], ['원목 트레이 M', '무드홈', 46000, 36800, 4.8, 210, 'product', 0], ['산책용 보온 물병 500ml', '에브리데이', 24000, 16800, 4.7, 540, 'product', 1]];
  const body = `${gnb('무드샵', ['랭킹', '세일', '신상품', '브랜드', '이벤트', '기획전'], { search: '찾는 상품을 검색해 보세요', end: `${iconBtn('heart', '찜 목록')}${iconBtn('shopping-cart', '장바구니')}${btn('로그인', { variant: 'neutralWeak', size: 'xsmall' })}`, sub: ['스킨케어', '메이크업', '헤어, 바디', '건강식품', '리빙', '패션', '푸드', '키즈'].map((t, i) => chip(t, { size: 'small', variant: 'outlineWeak', on: !i })).join('') })}
<main class="th-wrap">
  <section class="th-banners" aria-label="소식">
    <a class="th-bn" href="#"><img src="${photo('product', 5, 1400)}" alt=""><div class="th-bn__text">${badge('가을 특집', 'brand', true)}<b style="margin-top: var(--ds-space-x2)">첫 구매 최대 2만 원 할인</b><span>구매한 적이 없으세요? 지금 가입하면 쿠폰을 바로 드려요.</span></div></a>
    <a class="th-bn th-bn--side" href="#"><img src="${photo('product', 2, 800)}" alt=""><div class="th-bn__text"><b>오늘만 특가</b><span>포근한 무광 숏패딩 오늘만 21,900원</span></div></a>
  </section>
  <section class="th-sec" aria-label="바로 가기">${tiles([['percent', '할인 혜택'], ['zap', '오늘만 특가'], ['smartphone', 'APP 혜택'], ['gift', '기프트카드'], ['truck', '바로 배송'], ['sparkles', '이달의 추천'], ['pen-line', '리뷰 이벤트'], ['package', '사은품'], ['thumbs-up', '추천'], ['flower-2', '책 그리고 꽃']])}</section>
  <section class="th-sec" aria-labelledby="s1"><div class="th-sec__head"><div class="th-sale"><h2 id="s1">타임 세일</h2><span class="th-timer">${icon('clock', 'sm')} 02 : 14 : 37</span></div>${link('전체 보기 ' + icon('chevron-right', 'sm'), '#', '')}</div>
    <div class="th-grid">${PRODS.slice(0, 4).map(([t, b, p, d, r, n, ph, pi]) => `<a class="th-item" href="#">${img(ph, pi, '1:1', 500)}<span class="th-item__tag">${badge('오늘만', 'critical', true)}</span><span class="th-item__like">${iconBtn('heart', '찜하기', { size: 'xsmall' })}</span><small>${b}</small><b>${t}</b><span class="th-item__price"><span class="th-item__off">${Math.round((1 - d / p) * 100)}%</span><b class="th-num">${won(d)}</b><s class="th-num">${won(p)}</s></span>${rating(r, n)}</a>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s2">${secHead('인기 브랜드', { id: 's2' })}
    <div class="th-brands">${[['글로우랩', '스킨케어 1위', 'sparkles'], ['무드홈', '리빙 베스트', 'house'], ['선데이', '선케어', 'sun'], ['포레스트', '바디, 헤어', 'leaf']].map(([n, s, ic]) => `<a class="th-brand" href="#"><span class="th-tile" style="width: 48px; height: 48px">${art(ic, 24)}</span><span><b>${n}</b><small>${s}</small></span></a>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s3">${secHead('지금 많이 담는 상품', { id: 's3', sub: '최근 일주일 판매량 기준' })}
    <div class="th-grid">${PRODS.slice(4).concat(PRODS.slice(0, 4)).map(([t, b, p, d, r, n, ph, pi], i) => `<a class="th-item" href="#">${img(ph, pi + 1, '1:1', 500)}${i < 3 ? `<span class="th-item__tag">${badge(String(i + 1), 'neutral', true)}</span>` : ''}<small>${b}</small><b>${t}</b><span class="th-item__price"><span class="th-item__off">${Math.round((1 - d / p) * 100)}%</span><b class="th-num">${won(d)}</b></span>${rating(r, n)}</a>`).join('')}</div></section>
</main>
${foot('무드샵', ['이용약관', '개인정보 처리방침', '입점 문의', '고객센터'], '서울시 가상구 예시로 55 · shop@example.com')}`;
  return { css, body };
};

// ── 7. 하늘: 인테리어 커뮤니티 (오늘의집 결 - 띠 공지, 두 번째 메뉴 줄, 큰 사진 글과 이벤트 카드, 바로 가기, 사진 피드) ──
const sky = () => {
  const css = `
    .th-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-hero { grid-template-columns: minmax(0, 3fr) minmax(0, 1fr); } }
    .th-story { position: relative; display: block; overflow: hidden; border-radius: var(--ds-shape-xl); color: var(--ds-color-palette-static-white); text-decoration: none; }
    .th-story img { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
    .th-story__text { position: absolute; inset: auto 0 0; padding: var(--ds-space-x7); background: linear-gradient(transparent, rgb(0 0 0 / .65)); }
    .th-story__text b { display: block; font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-story__by { display: flex; align-items: center; gap: var(--ds-space-x2); margin-top: var(--ds-space-x2); font-size: var(--ds-font-size-t03); }
    .th-event { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--ds-space-x3); padding: var(--ds-space-x8); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); text-align: center; text-decoration: none; }
    .th-event b { font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-event small { opacity: .85; }
    .th-event .ds-badge { background: rgb(255 255 255 / .2); color: inherit; }
    .th-feed { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x6) var(--ds-space-x4); }
    @media (min-width: 768px) { .th-feed { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .th-feed { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .th-post { display: flex; flex-direction: column; gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
    .th-post .ds-imageframe { border-radius: var(--ds-shape-lg); }
    .th-post__by { display: flex; align-items: center; gap: var(--ds-space-x2); font-size: var(--ds-font-size-t03); }
    .th-post__by small { color: var(--ds-color-fg-neutral-subtle); }
    .th-post p { margin: 0; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; font-size: var(--ds-font-size-t04); line-height: 22px; }
    .th-post__stats { display: flex; gap: var(--ds-space-x3); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); }
    .th-post__stats span { display: inline-flex; align-items: center; gap: 2px; }
    .th-write { position: fixed; right: var(--ds-space-x6); bottom: var(--ds-space-x6); z-index: var(--ds-z-sticky); }
  `;
  const POSTS = [['시대후상', '여기가 10평? 디자이너 부부의 빈티지 하우스', 1240, 86, 'city', 4], ['민트그린', '창가에 책상을 두니 아침이 달라졌어요', 532, 41, 'work', 3], ['호두네', '12평 신혼집, 수납으로 넓어 보이게', 980, 73, 'product', 2], ['오후의빛', '우드와 화이트만으로 꾸민 거실', 2210, 150, 'nature', 1], ['달팽이', '자취 7년차가 추천하는 조명 세 가지', 760, 58, 'product', 0], ['집순이', '베란다를 작은 정원으로 바꿨어요', 415, 32, 'nature', 2], ['도윤맘', '아이 방 책장, 이렇게 정리했어요', 690, 44, 'book', 1], ['새벽커피', '주방 상부장 없애고 선반으로', 1530, 98, 'food', 3]];
  const body = `${callout('', `<b>첫 구매라면 누구나 최대 2만 원 할인!</b> <a class="ds-callout__link" href="#">자세히</a>`, 'informative', 'info-solid').replace('class="ds-callout"', 'class="ds-callout" style="border-radius: 0; justify-content: center"')}
${gnb('집꾸밈', ['커뮤니티', '쇼핑', '인테리어, 생활'], { search: '통합검색', end: `${iconBtn('bookmark', '스크랩')}${iconBtn('bell', '알림')}${iconBtn('shopping-cart', '장바구니')}${avatar('나', 36)}${btn('글쓰기', { variant: 'brandSolid', size: 'xsmall', icEnd: 'chevron-down' })}`, sub: tabs(['홈', '꿀템발견', '집꾸미기', '추천', '집들이', '집사진', '3D인테리어'], 0, '커뮤니티 메뉴', { layout: 'hug' }) })}
<main class="th-wrap">
  <section class="th-hero" aria-label="오늘의 이야기">
    <a class="th-story" href="#"><img src="${photo('city', 4, 1400)}" alt=""><div class="th-story__text">${badge('집들이', 'neutral', true)}<b style="margin-top: var(--ds-space-x2)">여기가 10평? 디자이너 부부의 빈티지 하우스</b><span class="th-story__by">${avatar('시대후상', 24)} 시대후상</span></div></a>
    <a class="th-event" href="#">${badge('이벤트')}<b>구매한 적이 없으세요?<br>첫 구매 최대 2만 원 할인</b>${art('ticket', 56, 'on-brand')}<small class="th-num">3 / 12</small></a>
  </section>
  <section class="th-sec" aria-label="바로 가기">${tiles([['flame', '여름시즌오프', 'critical'], ['alarm-clock', '오늘의딜'], ['house', '집들이'], ['clover', '행운출첵', 'positive'], ['sofa', '살림살이'], ['shopping-bag', '취향의발견'], ['store', '오마트'], ['truck', '원하는날도착'], ['hammer', '리모델링'], ['sparkles', '입주청소']])}</section>
  <section class="th-sec" aria-labelledby="s1">${secHead('이런 사진 찾고 있나요?', { id: 's1', sub: '좋아하실 만한 인테리어 콘텐츠를 추천해드려요', more: '더보기' })}
    <div style="display: flex; gap: var(--ds-space-x2); flex-wrap: wrap; margin-bottom: var(--ds-space-x6)">${['전체', '원룸', '아파트', '주택', '거실', '침실', '주방', '서재'].map((t, i) => chip(t, { on: !i, variant: i ? 'outlineWeak' : 'solid' })).join('')}</div>
    <div class="th-feed">${POSTS.map(([u, t, l, c, ph, pi]) => `<a class="th-post" href="#">${img(ph, pi, '1:1', 500)}<span class="th-post__by">${avatar(u, 24)}<b>${u}</b><small>· 2일 전</small></span><p>${t}</p><span class="th-post__stats"><span>${icon('heart', 'sm')} ${l.toLocaleString()}</span><span>${icon('message-circle', 'sm')} ${c}</span><span>${icon('bookmark', 'sm')} 스크랩</span></span></a>`).join('')}</div>
    <div style="display: flex; justify-content: center; padding-top: var(--ds-space-x10)">${btn('사진 더 보기', { variant: 'neutralOutline', size: 'medium' })}</div></section>
</main>
<div class="th-write">${btn('글쓰기', { variant: 'brandSolid', size: 'large', ic: 'pencil' })}</div>
${foot('집꾸밈', ['이용약관', '개인정보 처리방침', '입점 신청', '제휴 문의'], '서울시 가상구 예시로 12 · home@example.com')}`;
  return { css, body };
};

// ── 8. 먹: 온라인 서점 (교보문고 결 - 위 작은 링크, 통합검색, 큰 배너와 옆 카드, 바로 가기, 오늘의 선택 탭, 베스트셀러 순위) ──
const ink = () => {
  const css = `
    .th-gnb__row { height: 80px; }
    .th-logo { font-family: Georgia, 'Noto Serif KR', serif; letter-spacing: -0.01em; }
    .th-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-hero { grid-template-columns: minmax(0, 1fr) 300px; } }
    .th-bn { position: relative; overflow: hidden; border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); }
    .th-bn > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .35; }
    .th-bn__text { position: relative; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: var(--ds-space-x2); box-sizing: border-box; min-height: 300px; padding: var(--ds-space-x10); }
    .th-bn__text h1 { margin: 0; font-size: 36px; line-height: 1.3; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-bn__text p { margin: 0; opacity: .9; }
    .th-bn__pager { position: absolute; right: var(--ds-space-x6); bottom: var(--ds-space-x6); padding: 2px var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: rgb(255 255 255 / .2); font-size: var(--ds-font-size-t02); }
    .th-side { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
    .th-side .th-card { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: var(--ds-space-x3); text-align: center; }
    .th-side .th-card p { margin: 0; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
    .th-side .th-card b { font-size: var(--ds-font-size-t06); }
    .th-tile { border-radius: var(--ds-shape-pill); }
    .th-pick { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ds-space-x5); margin-bottom: var(--ds-space-x6); }
    .th-pick h2 { margin: 0; font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
    .th-pick nav { display: flex; gap: var(--ds-space-x4); font-size: var(--ds-font-size-t04); color: var(--ds-color-fg-neutral-muted); }
    .th-pick nav a { text-decoration: none; }
    .th-pick nav a[aria-current] { color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-bold); }
    .th-books { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ds-space-x8) var(--ds-space-x4); }
    @media (min-width: 768px) { .th-books { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
    .th-book { display: flex; flex-direction: column; gap: var(--ds-space-x2); text-decoration: none; }
    .th-book .ds-imageframe { border-radius: var(--ds-shape-sm); box-shadow: 0 8px 20px -10px rgb(0 0 0 / .35), inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
    .th-book__no { color: var(--ds-color-fg-brand); font-size: var(--ds-font-size-t06); font-weight: var(--ds-font-weight-bold); font-family: Georgia, serif; }
    .th-book b { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; font-size: var(--ds-font-size-t04); line-height: 22px; font-weight: var(--ds-font-weight-semibold); }
    .th-book small { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t02); }
    .th-book__price { font-size: var(--ds-font-size-t04); }
    .th-book__price b { display: inline; font-size: var(--ds-font-size-t05); }
    .th-quote { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: center; padding: var(--ds-space-x10); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
    @media (min-width: 1024px) { .th-quote { grid-template-columns: 220px minmax(0, 1fr); } }
    .th-quote .ds-imageframe { border-radius: var(--ds-shape-sm); }
    .th-quote blockquote { margin: 0; font-family: Georgia, 'Noto Serif KR', serif; font-size: var(--ds-font-size-t08); line-height: 1.5; letter-spacing: -0.01em; }
    .th-quote cite { display: block; margin-top: var(--ds-space-x4); color: var(--ds-color-fg-neutral-muted); font-style: normal; font-size: var(--ds-font-size-t04); }
  `;
  const BOOKS = [['소년이 온다', '한강 · 창비', 15000, 13500], ['불편한 편의점', '김호연 · 나무옆의자', 14000, 12600], ['세이노의 가르침', '세이노 · 데이원', 7200, 6480], ['모순', '양귀자 · 쓰다', 13000, 11700], ['트렌드 코리아 2027', '김난도 외 · 미래의창', 19000, 17100], ['원씽', '게리 켈러 · 비즈니스북스', 15000, 13500], ['작별하지 않는다', '한강 · 문학동네', 15000, 13500], ['도둑맞은 집중력', '요한 하리 · 어크로스', 18800, 16920], ['역행자', '자청 · 웅진지식하우스', 17500, 15750], ['아주 희미한 빛으로도', '최은영 · 문학동네', 15000, 13500], ['나의 돈 많은 고등학교 친구', '송희구 · 서삼독', 17800, 16020], ['흔한남매 17', '흔한남매 · 미래엔아이세움', 14500, 13050]];
  const body = `${gnb('책다락', ['베스트', '신상품', '이벤트', '바로펀딩', 'PICKS', '컬처라운지'], { search: '경기도가 찜한 책? 우수출판물 20권, 지금 확인', end: `${btn('로그인', { variant: 'ghost', size: 'xsmall' })}${iconBtn('shopping-cart', '장바구니')}${avatar('나', 36)}` })}
<main class="th-wrap">
  <section class="th-hero" aria-label="소식">
    <div class="th-bn"><img src="${photo('book', 0, 1400)}" alt=""><div class="th-bn__text">${badge('Special', 'neutral', true)}<h1>바로펀딩<br>돌잔치</h1><p>1주년 기념 골드바 주인공은?</p><div style="margin-top: var(--ds-space-x4)">${btn('전체 보기', { variant: 'neutralSolid', size: 'medium', icEnd: 'chevron-right' })}</div></div><span class="th-bn__pager th-num">09 / 35</span></div>
    <div class="th-side">${card(`${art('book-heart', 36)}<b>책책책 가을 특집</b><p>선착순 교환권 받기</p>${btn('참여하기', { variant: 'brandSolid', size: 'small' })}`)}${card(`${art('sprout', 36)}<b>책을 읽읍시다!</b><p>가을 끝갈피 이벤트</p>${btn('자세히', { variant: 'neutralWeak', size: 'small' })}`, 'th-card--brand')}</div>
  </section>
  <section class="th-sec" aria-label="바로 가기">${tiles([['percent', '할인혜택'], ['zap', '오늘만특가'], ['smartphone', 'APP혜택'], ['gift', '기프트카드'], ['truck', '바로출판'], ['calendar', '이달의 책'], ['pen-line', '손글씨캠페인'], ['package', '사은품'], ['thumbs-up', '추천'], ['flower-2', '책그리고꽃']])}</section>
  <section class="th-sec" aria-labelledby="s1"><div class="th-pick"><h2 id="s1">오늘의 선택</h2><nav aria-label="분류"><a href="#" aria-current="true">국내도서</a><a href="#">외국도서</a><a href="#">eBook</a><a href="#">sam</a><a href="#">핫트랙스</a></nav><span style="margin-left: auto">${link('더보기 +', '#', '')}</span></div>
    <div class="th-books">${BOOKS.slice(0, 6).map(([t, a, p, d], i) => `<a class="th-book" href="#">${img('book', i, '3:4', 400)}<b>${t}</b><small>${a}</small><span class="th-book__price th-num"><span class="th-item__off">10%</span> <b>${won(d)}</b></span></a>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s2">${secHead('베스트셀러', { id: 's2', sub: '주간 종합 · 11월 1주' })}
    <div class="th-books">${BOOKS.slice(6).map(([t, a, p, d], i) => `<a class="th-book" href="#"><span class="th-book__no">${i + 1}</span>${img('book', i + 3, '3:4', 400)}<b>${t}</b><small>${a}</small><span class="th-book__price th-num"><span class="th-item__off">10%</span> <b>${won(d)}</b></span></a>`).join('')}</div></section>
  <section class="th-sec" aria-label="추천 문장"><div class="th-quote">${img('book', 2, '3:4', 440)}<div>${badge('책 속 한 문장', 'brand')}<blockquote style="margin-top: var(--ds-space-x4)">“리즈 위더스푼을 올린 바로 그 책, 올해 읽은 소설 중 단연 최고다.”</blockquote><cite>출간 직후 폭발적 반응! 〈브로큰 컨트리〉 · 북클럽 추천</cite><div style="margin-top: var(--ds-space-x6)">${btn('미리 읽어 보기', { variant: 'brandSolid', size: 'medium', ic: 'book-open' })}</div></div></div></section>
</main>
${foot('책다락', ['이용약관', '개인정보 처리방침', '청소년 보호 정책', '입점 문의'], '서울시 가상구 예시로 1 · book@example.com')}`;
  return { css, body };
};

// ── 9. 장미: 어린이 영어 학습 홈 (키즈 학습 앱 결 - 인사와 오늘의 미션, 진도, 뱃지, 오늘 수업, 보호자 메뉴) ──
const rose = () => {
  const css = `
    .th-top { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-top { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); } }
    .th-hello { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x6); background: var(--ds-color-bg-brand-weak); box-shadow: none; }
    .th-hello h1 { margin: 0; font-size: 30px; line-height: 1.35; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-hello p { margin: var(--ds-space-x2) 0 var(--ds-space-x5); color: var(--ds-color-fg-neutral-muted); }
    .th-hello .ds-avatar { flex: none; }
    .th-streak { display: flex; gap: var(--ds-space-x2); }
    .th-day { display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-layer-default); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); color: var(--ds-color-fg-neutral-muted); }
    .th-day[data-done] { background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); }
    .th-day[data-today] { box-shadow: inset 0 0 0 2px var(--ds-color-stroke-brand-solid); color: var(--ds-color-fg-brand); }
    .th-goal { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
    .th-goal__row { display: flex; align-items: center; gap: var(--ds-space-x4); }
    .th-goal__row b { font-size: var(--ds-font-size-t07); }
    .th-missions { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); }
    @media (min-width: 768px) { .th-missions { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .th-mission { display: flex; flex-direction: column; gap: var(--ds-space-x3); text-decoration: none; }
    .th-mission b { font-size: var(--ds-font-size-t05); }
    .th-mission small { color: var(--ds-color-fg-neutral-muted); }
    .th-mission[data-done] { background: var(--ds-color-bg-positive-weak); box-shadow: none; }
    .th-badges { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ds-space-x3); }
    @media (min-width: 768px) { .th-badges { grid-template-columns: repeat(8, minmax(0, 1fr)); } }
    .th-badge { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); text-align: center; font-size: var(--ds-font-size-t02); color: var(--ds-color-fg-neutral-muted); }
    .th-badge .th-tile { width: 64px; height: 64px; border-radius: var(--ds-shape-pill); }
    .th-badge[data-locked] .th-tile { background: var(--ds-color-bg-neutral-weak-alpha); }
    .th-lessons { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
    @media (min-width: 768px) { .th-lessons { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1024px) { .th-lessons { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
    .th-lesson { display: flex; flex-direction: column; gap: var(--ds-space-x2); text-decoration: none; }
    .th-lesson .ds-imageframe { border-radius: var(--ds-shape-xl); }
    .th-lesson b { font-size: var(--ds-font-size-t05); }
    .th-lesson small { color: var(--ds-color-fg-neutral-muted); }
    .th-parent { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
    @media (min-width: 1024px) { .th-parent { grid-template-columns: minmax(0, 1fr) 360px; } }
    .th-kv { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ds-space-x3); }
    .th-kv div { padding: var(--ds-space-x4); border-radius: var(--ds-shape-xl); background: var(--ds-color-bg-neutral-weak-alpha); }
    .th-kv b { display: block; font-size: var(--ds-font-size-t08); letter-spacing: -0.02em; }
    .th-kv small { color: var(--ds-color-fg-neutral-muted); }
  `;
  const body = `${gnb('키즈잉글리시', ['오늘의 학습', '동화', '노래', '게임', '보호자'], { end: `${badge(icon('star-solid', 'sm') + ' 1,240', 'warning')}${iconBtn('bell', '알림')}${avatar('지우', 36)}` })}
<main class="th-wrap">
  <section class="th-top" aria-label="오늘">
    ${card(`${avatar('지우', 80)}<div><h1>지우야, 안녕! 👋<br>오늘도 영어랑 놀아 볼까?</h1><p>어제 <b class="th-em">12개 단어</b>를 새로 배웠어요. 오늘 미션 3개를 끝내면 별 50개를 받아요.</p>${btn('오늘 학습 시작', { variant: 'brandSolid', size: 'large', ic: 'play' })}</div>`, 'th-hello')}
    ${card(`<h3>이번 주 출석</h3><div class="th-streak">${['월', '화', '수', '목', '금', '토', '일'].map((d, i) => `<span class="th-day"${i < 3 ? ' data-done' : i === 3 ? ' data-today' : ''}>${i < 3 ? icon('check', 'sm') : d}</span>`).join('')}</div><div class="th-goal" style="margin-top: var(--ds-space-x6)"><div class="th-goal__row">${K.ring(68, 56, 'brand')}<div><b class="th-num">68%</b><br><small class="th-muted">레벨 2 진도</small></div></div>${progress(68, { label: '레벨 2 진도' })}<small class="th-muted">레벨 3까지 단어 24개, 동화 2편 남았어요.</small></div>`)}
  </section>
  <section class="th-sec" aria-labelledby="s1">${secHead('오늘의 미션', { id: 's1', more: '' })}
    <div class="th-missions">${[['book-open', '동화 읽기', 'The Hungry Caterpillar', true], ['mic', '따라 말하기', '과일 이름 8개', false], ['puzzle', '단어 퍼즐', '동물 친구들', false]].map(([ic, t, s, done]) => `<a class="th-card th-mission" href="#"${done ? ' data-done' : ''}><span class="th-tile">${art(ic, 28, done ? 'positive' : 'brand')}</span><div><b>${t}</b><br><small>${s}</small></div>${done ? badge('완료 ' + icon('check', 'sm'), 'positive') : badge('별 15개', 'warning')}</a>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s2">${secHead('모은 뱃지', { id: 's2', sub: '8개 중 5개를 모았어요' })}
    <div class="th-badges">${[['star', '첫 수업'], ['flame', '3일 연속'], ['book-open', '동화 10편'], ['mic', '발음왕'], ['trophy', '퀴즈 만점'], ['keyboard-music', '노래 5곡'], ['crown', '7일 연속'], ['rocket', '레벨 3']].map(([ic, t], i) => `<div class="th-badge"${i >= 5 ? ' data-locked' : ''}><span class="th-tile">${art(ic, 28, i >= 5 ? 'neutral' : 'brand')}</span>${t}</div>`).join('')}</div></section>
  <section class="th-sec" aria-labelledby="s3">${secHead('이어서 배우기', { id: 's3' })}
    <div class="th-lessons">${[['Colors Around Me', '레벨 2 · 10분', 40, 'nature', 0], ['My Family', '레벨 2 · 8분', 0, 'study', 1], ['Animals on the Farm', '레벨 2 · 12분', 100, 'nature', 2], ['Let\'s Count!', '레벨 2 · 6분', 0, 'book', 3]].map(([t, s, p, ph, pi]) => `<a class="th-lesson" href="#">${img(ph, pi, '4:3', 480)}<b>${t}</b><small>${s}</small>${p ? progress(p, { label: t + ' 진도', tone: p === 100 ? 'positive' : '' }) : badge('새 수업', 'brand')}</a>`).join('')}</div></section>
  <section class="th-sec th-parent" aria-label="보호자">
    ${card(`<div class="th-between"><h3>보호자 리포트</h3>${segmented(['이번 주', '이번 달'], 0, '기간')}</div><div class="th-kv"><div><b class="th-num">42분</b><small>학습 시간</small></div><div><b class="th-num">36개</b><small>새 단어</small></div><div><b class="th-num">91%</b><small>발음 정확도</small></div></div><p class="th-muted" style="margin: var(--ds-space-x4) 0 0; font-size: var(--ds-font-size-t03); line-height: 20px">지난주보다 학습 시간이 12분 늘었어요. 동물 이름 발음이 특히 좋아졌어요.</p>`)}
    ${card(`<h3>학습 설정</h3><div class="th-between" style="padding-block: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak)"><span>하루 학습 알림 (오후 4시)</span>${sw('하루 학습 알림', true)}</div><div class="th-between" style="padding-block: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak)"><span>주말 쉬기</span>${sw('주말 쉬기')}</div><div class="th-between" style="padding-block: var(--ds-space-x3)"><span>리포트 이메일 받기</span>${sw('리포트 이메일', true)}</div>`)}
  </section>
</main>
${foot('키즈잉글리시', ['이용약관', '개인정보 처리방침', '아동 보호 정책', '보호자 안내'], '서울시 가상구 예시로 24 · kids@example.com')}`;
  return { css, body };
};

// ── 10. 청록: 자산 홈 (토스, 뱅크 결 - 총자산 카드, 계좌 목록, 빠른 송금, 소비 그래프, 최근 거래, 혜택) ──
const teal = () => {
  const css = `
    .th-layout { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x6); }
    @media (min-width: 1024px) { .th-layout { grid-template-columns: minmax(0, 1fr) 360px; } }
    .th-col { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
    .th-total { background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); box-shadow: none; }
    .th-total small { opacity: .8; }
    .th-total b { display: block; margin-top: var(--ds-space-x1); font-size: 36px; line-height: 1.2; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
    .th-total__acts { display: flex; gap: var(--ds-space-x2); margin-top: var(--ds-space-x6); }
    .th-total__acts .ds-btn { background: rgb(255 255 255 / .16); color: inherit; }
    .th-total__acts .ds-btn[data-variant="neutralSolid"] { background: var(--ds-color-bg-layer-default); color: var(--ds-color-fg-brand); }
    .th-acct { margin: 0; padding: 0; list-style: none; }
    .th-acct li { display: flex; align-items: center; gap: var(--ds-space-x4); padding-block: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
    .th-acct li:last-child { box-shadow: none; padding-bottom: 0; }
    .th-acct b { display: block; font-size: var(--ds-font-size-t05); }
    .th-acct small { color: var(--ds-color-fg-neutral-muted); }
    .th-acct .th-amt { margin-left: auto; font-size: var(--ds-font-size-t06); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; white-space: nowrap; }
    .th-tile { width: 48px; height: 48px; border-radius: var(--ds-shape-xl); }
    .th-quick { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ds-space-x2); }
    .th-quick a { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x3) 0; border-radius: var(--ds-shape-xl); text-decoration: none; font-size: var(--ds-font-size-t03); }
    .th-quick a:hover { background: var(--ds-color-bg-neutral-weak-alpha); }
    .th-spend { display: flex; align-items: center; gap: var(--ds-space-x6); }
    .th-spend b { display: block; font-size: var(--ds-font-size-t08); letter-spacing: -0.02em; }
    .th-cats { display: flex; flex-direction: column; gap: var(--ds-space-x3); margin-top: var(--ds-space-x5); }
    .th-cat { display: grid; grid-template-columns: 90px minmax(0, 1fr) 80px; align-items: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t04); }
    .th-cat .th-num { text-align: right; }
    .th-tx { margin: 0; padding: 0; list-style: none; }
    .th-tx li { display: flex; align-items: center; gap: var(--ds-space-x3); padding-block: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-weak); }
    .th-tx li:last-child { box-shadow: none; }
    .th-tx b { display: block; font-size: var(--ds-font-size-t04); font-weight: var(--ds-font-weight-medium); }
    .th-tx small { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t02); }
    .th-tx .th-amt { margin-left: auto; font-weight: var(--ds-font-weight-semibold); white-space: nowrap; }
    .th-tx .th-amt[data-in] { color: var(--ds-color-fg-brand); }
    .th-offer { display: flex; align-items: center; gap: var(--ds-space-x4); text-decoration: none; }
    .th-offer b { display: block; }
    .th-offer small { color: var(--ds-color-fg-neutral-muted); }
  `;
  const CATS = [['식비', 38, '412,300'], ['교통', 14, '152,800'], ['쇼핑', 22, '240,900'], ['구독', 9, '98,700'], ['기타', 17, '186,400']];
  const TX = [['스타벅스 강남점', '오늘 08:41 · 식비', -5600], ['월급', '11.03 · 급여', 3250000], ['넷플릭스', '11.02 · 구독', -17000], ['이마트 성수점', '11.01 · 쇼핑', -84200], ['지하철', '11.01 · 교통', -1550], ['김민수', '10.31 · 송금 받음', 50000]];
  const body = `${gnb('머니온', ['홈', '소비', '투자', '대출', '보험', '혜택'], { end: `${iconBtn('search', '검색')}${iconBtn('bell', '알림')}${avatar('서윤', 36)}` })}
<main class="th-wrap th-layout">
  <div class="th-col">
    ${card(`<small>내 자산</small><b class="th-num">42,318,900원</b><small>어제보다 <span style="opacity: 1; font-weight: var(--ds-font-weight-semibold)">+128,400원</span></small><div class="th-total__acts">${btn('송금', { variant: 'neutralSolid', size: 'medium', ic: 'arrow-right' })}${btn('이체 내역', { variant: 'neutralWeak', size: 'medium' })}${btn('계좌 추가', { variant: 'neutralWeak', size: 'medium', ic: 'plus' })}</div>`, 'th-total')}
    ${card(`<div class="th-between"><h3>계좌</h3>${link('전체 보기', '#', '')}</div><ul class="th-acct">${[['landmark', '머니온 통장', '입출금 · 1002-***-5541', 8120400], ['piggy-bank', '목돈 모으기', '적금 · 12개월 중 7개월', 7000000], ['chart-line', '투자 계좌', '국내 주식 · 수익률 +6.2%', 15438500], ['credit-card', '머니온 카드', '이번 달 사용 1,091,100원', 11760000]].map(([ic, t, s, a]) => `<li><span class="th-tile">${art(ic, 24)}</span><span><b>${t}</b><small>${s}</small></span><span class="th-amt th-num">${won(a)}</span></li>`).join('')}</ul>`)}
    ${card(`<div class="th-between"><h3>이번 달 소비</h3>${segmented(['11월', '10월'], 0, '달')}</div><div class="th-spend">${K.donut(CATS.map(([t, v]) => [t, v]), { size: 120, thick: 14, label: '소비 비율' })}<div><small class="th-muted">11월 1일 ~ 4일</small><b class="th-num">1,091,100원</b><small class="th-muted">지난달 같은 기간보다 8% 적게 썼어요</small></div></div><div class="th-cats">${CATS.map(([t, v, a], i) => `<div class="th-cat"><span>${t}</span>${progress(v, { label: t + ' 비율' })}<span class="th-num th-muted">${a}원</span></div>`).join('')}</div>`)}
  </div>
  <aside class="th-col" aria-label="옆 내용">
    ${card(`<h3>자주 쓰는 기능</h3><div class="th-quick">${[['send', '송금'], ['qr-code', 'QR 결제'], ['receipt', '청구서'], ['calendar-days', '정기 결제'], ['users', '모임 통장'], ['gift', '선물하기'], ['shield-check', '보험 조회'], ['ellipsis', '더 보기']].map(([ic, t]) => `<a href="#"><span class="th-tile">${art(ic, 22)}</span>${t}</a>`).join('')}</div>`)}
    ${card(`<div class="th-between"><h3>최근 거래</h3>${link('더 보기', '#', '')}</div><ul class="th-tx">${TX.map(([t, s, a]) => `<li>${avatar(t, 36)}<span><b>${t}</b><small>${s}</small></span><span class="th-amt th-num"${a > 0 ? ' data-in' : ''}>${a > 0 ? '+' : '-'}${won(Math.abs(a))}</span></li>`).join('')}</ul>`)}
    <a class="th-card th-card--brand th-offer" href="#"><span class="th-tile">${art('badge-percent', 24)}</span><span><b>이번 달 카드 혜택 남았어요</b><small>커피 50% 할인 2회 · 11월 30일까지</small></span>${icon('chevron-right')}</a>
    ${callout('안내', '11월 8일 02:00 ~ 06:00 시스템 점검으로 송금이 잠시 멈춰요.', 'informative')}
  </aside>
</main>
${foot('머니온', ['이용약관', '개인정보 처리방침', '전자금융거래 약관', '고객센터'], '서울시 가상구 예시로 88 · money@example.com')}`;
  return { css, body };
};

const VIEWS = { mint, forest, tangerine, navy, violet, coral, sky, ink, rose, teal };

// ── 쓰기 ───────────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const THEME_DIR = path.join(DS, 'dist', 'themes');
fs.rmSync(THEME_DIR, { recursive: true, force: true });
fs.mkdirSync(THEME_DIR, { recursive: true });
for (const t of THEMES) {
  fs.writeFileSync(path.join(THEME_DIR, t.slug + '.css'), themeCss(t));
  const v = VIEWS[t.slug]();
  const html = `<!doctype html>
<html lang="ko" data-ds-theme="${t.slug}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.name)} 테마 - ${esc(t.site)} (yds 테마 예시)</title>
<!-- 생성물: node site/themes/gen.mjs 가 만든다. 직접 고치지 말고 생성기를 고친다 -->
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<link rel="stylesheet" href="../../../dist/themes/${t.slug}.css">
<script>if (location.hash === "#default") document.documentElement.removeAttribute("data-ds-theme");</script>
<script src="../../../dist/ybm-ds.js" defer></script>
<style>${BASE}${v.css}</style>
</head>
<body>
${v.body}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, t.slug + '.html'), html);
}
// 테마 목록 (사이트 Themes 페이지가 읽는다). 카드 색은 테마의 옅은 면과 브랜드 색
fs.writeFileSync(path.join(HERE, '..', 'src', 'themes.json'), JSON.stringify({ themes: THEMES.map((t) => ({ slug: t.slug, name: t.name, en: t.en, site: t.site, desc: t.desc, swatches: [t.canvas, t.brand, scale(t.brand)[100], '#1a1c20'], card: { bg: scale(t.brand)[100], fg: t.brand, art: t.art } })) }, null, 2) + '\n');
console.log(`테마 ${THEMES.length}개: CSS(dist/themes)와 화면(site/themes/pages) 생성`);

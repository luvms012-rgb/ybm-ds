// 템플릿 생성기 공용 부품. 레퍼런스 A 템플릿 51종의 구조를 yds 부품과 토큰으로 다시 짠다.
// 값은 모두 --ds-* 토큰. 글은 한국어, 숫자와 고유한 기술 용어만 영어.
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------ 공통 CSS */
export const BASE_CSS = `  /* 템플릿 배치 전용. 값은 모두 --ds-* 토큰
     배치(여백, 카드, 구분선)는 레퍼런스 A 템플릿, 한글 글자 위계(크기, 굵기, 색 단계, 자간)는 토스를 따른다 */
  body { word-break: keep-all; overflow-wrap: break-word; }
  .tp-app { display: flex; flex-direction: column; min-height: 100vh; background: var(--ds-color-bg-layer-default); }
  .tp-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); padding: var(--ds-space-x6) var(--ds-space-x4) 0; }
  .tp-head__texts { display: flex; flex-direction: column; gap: var(--ds-space-x1_5); min-width: 0; }
  .tp-head__tools { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); }
  .tp-head > .tp-row, .tp-head .tp-between > .tp-row { flex-wrap: wrap; }
  .ds-tablepagination { flex-wrap: wrap; row-gap: var(--ds-space-x2); min-width: 0; }
  .tp-between > .tp-row { flex-wrap: wrap; }
  /* 글자 위계 (토스): 굵기 두 단계, 제목은 자간 -0.02em, 글자 색은 neutral / muted / subtle 세 단계 */
  .tp-h1 { font-size: var(--ds-font-size-t09); line-height: var(--ds-line-height-t09); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-h2 { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-h3 { font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); letter-spacing: -0.01em; }
  .tp-h4 { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-semibold); }
  .tp-sub { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); color: var(--ds-color-fg-neutral-muted); }
  .tp-caption { font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); }
  .tp-num { font-variant-numeric: tabular-nums; }
  /* 표는 DS Table 그대로 쓴다 (2026-11-03 DS 개편). 아래는 표 위, 아래 줄만 */
  /* 표 위 한 줄: 왼쪽 개수, 오른쪽 고르기 칸과 찾기 (커뮤니티 게시판 btools) */
  .tp-ttools { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-ttools__end { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); }
  .tp-ttools__end > .ds-select { min-width: 120px; }
  .tp-ttools .ds-input { flex: none; width: 240px; max-width: 100%; }
  .tp-tfoot { display: flex; justify-content: center; padding-top: var(--ds-space-x2); }
  /* 배치 (레퍼런스 A): 흰 바탕, 바깥 여백 16 / 24, 묶음 사이 24 / 32 와 구분선 */
  .tp-body { display: flex; flex: 1 1 auto; flex-direction: column; min-height: 0; }
  .tp-content { display: flex; flex: 1 1 auto; flex-direction: column; gap: var(--ds-space-x6); min-width: 0; padding: var(--ds-space-x5) var(--ds-space-x4) var(--ds-space-x10); }
  .tp-panel { display: flex; flex-direction: column; gap: var(--ds-space-x5); padding: var(--ds-space-x5) var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-sec { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; }
  .tp-sec-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x2) var(--ds-space-x3); }
  .tp-sec-head__texts { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ds-space-x1) var(--ds-space-x2); }
  .tp-row { display: flex; align-items: center; gap: var(--ds-space-x2); min-width: 0; }
  /* 줄 안에 놓인 고르기 칸은 글자만큼만 */
  :is(.tp-row, .tp-between, .tp-head__tools, .tp-sec-head, .tp-ttools__end) > .ds-select { width: auto; min-width: 140px; }
  .tp-between { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); }
  .tp-stack { display: flex; flex-direction: column; gap: var(--ds-space-x1); min-width: 0; }
  .tp-stack > .ds-badge { align-self: flex-start; }
  .tp-g2, .tp-g3, .tp-g4, .tp-g5, .tp-g6 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); }
  /* 카드 (레퍼런스 A): 흰 바탕 + 옅은 1px 선, 모서리 12 */
  .tp-card { min-width: 0; }
  .tp-span2 { grid-column: auto; }
  .tp-kpi__label { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); color: var(--ds-color-fg-neutral-muted); }
  .tp-kpi__value { font-size: var(--ds-font-size-t08); line-height: var(--ds-line-height-t08); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-delta { display: inline-flex; align-items: center; gap: 2px; font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); font-weight: var(--ds-font-weight-medium); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tp-delta .ds-icon { --ds-icon-size: 14px; }
  .tp-delta[data-tone="up"] { color: var(--ds-color-fg-positive); }
  .tp-delta[data-tone="down"] { color: var(--ds-color-fg-critical); }
  .tp-delta[data-tone="flat"] { color: var(--ds-color-fg-neutral-muted); }
  /* 차트: 얇은 선, 옅은 격자, 마우스를 올리면 세로 안내선과 값 풍선 */
  .tp-chart { display: block; width: 100%; height: auto; overflow: visible; }
  .tp-chart text { fill: var(--ds-color-fg-neutral-subtle); font-size: 11px; font-family: inherit; font-variant-numeric: tabular-nums; }
  .tp-chart .tp-grid-line { stroke: var(--ds-color-stroke-neutral-muted); stroke-width: 1; }
  .tp-chart [data-i] { transition: opacity var(--ds-duration-fast) var(--ds-easing-standard); }
  .tp-chart.is-hover [data-i]:not(.is-on) { opacity: .35; }
  .tp-chart .tp-guide { stroke: var(--ds-color-fg-neutral-subtle); stroke-width: 1; stroke-dasharray: 3 3; opacity: 0; pointer-events: none; }
  .tp-chart .tp-dot { stroke: var(--ds-color-bg-layer-default); stroke-width: 2; opacity: 0; pointer-events: none; }
  .tp-chart.is-hover .tp-guide, .tp-chart.is-hover .tp-dot { opacity: 1; }
  .tp-tip { position: fixed; z-index: var(--ds-z-tooltip, 60); display: flex; flex-direction: column; gap: 2px; min-width: 96px; padding: var(--ds-space-x2) var(--ds-space-x2_5); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-on-neutral-solid); box-shadow: var(--ds-elevation-overlay); font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); pointer-events: none; opacity: 0; transform: translateY(4px); transition: opacity var(--ds-duration-fast) var(--ds-easing-standard), transform var(--ds-duration-fast) var(--ds-easing-standard); }
  .tp-tip.is-on { opacity: 1; transform: none; }
  .tp-tip__t { font-weight: var(--ds-font-weight-semibold); opacity: .8; }
  .tp-tip__t:only-child { opacity: 1; }
  [data-tip] { transition: filter var(--ds-duration-fast) var(--ds-easing-standard); }
  [data-tip]:hover { filter: brightness(0.9); }
  .tp-tip__r { display: flex; align-items: center; gap: var(--ds-space-x1_5); font-variant-numeric: tabular-nums; }
  .tp-tip__r b { margin-inline-start: auto; padding-inline-start: var(--ds-space-x3); font-weight: var(--ds-font-weight-semibold); }
  .tp-tip__r i { flex: none; width: 8px; height: 8px; border-radius: 2px; background: var(--c); }
  .tp-legend { display: flex; flex-wrap: wrap; gap: var(--ds-space-x1) var(--ds-space-x4); font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-legend__item { display: inline-flex; align-items: center; gap: var(--ds-space-x1_5); }
  .tp-swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; background: var(--c, var(--ds-color-chart-series-1)); }
  .tp-split { display: flex; height: 10px; overflow: hidden; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral); }
  .tp-split > span { height: 100%; background: var(--c); }
  .tp-split > span + span { box-shadow: inset 2px 0 0 var(--ds-color-bg-layer-default); }
  .tp-ph { display: grid; place-items: center; width: 100%; height: 100%; color: var(--ds-color-fg-neutral-subtle); background: var(--ds-color-bg-neutral); }
  .tp-ph > img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .tp-logo { display: inline-grid; place-items: center; width: 88px; height: 28px; border-radius: var(--ds-shape-xs); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03-static); line-height: var(--ds-line-height-t03-static); font-weight: var(--ds-font-weight-semibold); }
  .tp-bar { position: sticky; top: 0; z-index: var(--ds-z-sticky); background: var(--ds-color-bg-layer-default); }
  .tp-track { display: flex; flex-direction: column; gap: var(--ds-space-x1); min-width: 120px; }
  .tp-hide-sm { display: none; }
  .tp-scroll-x { overflow-x: auto; }
  .tp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .tp-kbd { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 4px; border-radius: var(--ds-shape-2xs); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-muted); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t01); font-family: inherit; }
  @media (min-width: 768px) {
    .tp-head { padding: var(--ds-space-x8) var(--ds-space-x6) 0; }
    .tp-h1 { font-size: var(--ds-font-size-t11); line-height: var(--ds-line-height-t11); }
    .tp-h2 { font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); }
    .tp-content { padding: var(--ds-space-x6) var(--ds-space-x6) var(--ds-space-x12); gap: var(--ds-space-x8); }
    .tp-panel { padding: var(--ds-space-x6); }
    .tp-card.ds-card { --ds-card-padding: var(--ds-space-x5); --ds-card-gap: var(--ds-space-x4); }
    .tp-g2, .tp-g3, .tp-g4, .tp-g5, .tp-g6 { gap: var(--ds-space-x4); }
    .tp-g2, .tp-g4, .tp-g6 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tp-g3, .tp-g5 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tp-hide-sm { display: revert; }
  }
  @media (min-width: 1024px) {
    .tp-body--panel { flex-direction: row; }
    .tp-body--panel > .tp-panel { flex: none; width: 360px; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }
    .tp-g3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .tp-g4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .tp-g5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    .tp-g6 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .tp-span2 { grid-column: span 2; }
    .tp-span3 { grid-column: span 3; }
  }
  @media (min-width: 1280px) { .tp-g6 { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
`;

/* ------------------------------------------------------------ 페이지 */
export const page = ({ title, css = '', body, bodyClass = '' }) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - yds 템플릿</title>
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<script src="../../../dist/ybm-ds.js" defer></script>
<style>
${BASE_CSS}${css}</style>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}${/data-tp=|data-tip=/.test(body) ? `\n<script>\n${CHART_JS}\n</script>` : ''}
</body>
</html>
`;

/* ------------------------------------------------------------ 기본 부품 */
export const icon = (n, size = '') => `<i class="ds-icon ds-icon--${n}${size ? ' ds-icon--' + size : ''}" aria-hidden="true"></i>`;
export const btn = (label, { variant = 'neutralWeak', size = 'small', href, fill = false, ic = '', icEnd = '', attrs = '', aria = '' } = {}) => {
  const inner = `${ic ? icon(ic) : ''}${label}${icEnd ? icon(icEnd) : ''}`;
  const a = `class="ds-btn" data-variant="${variant}" data-size="${size}"${fill ? ' data-width="fill"' : ''}${aria ? ` aria-label="${esc(aria)}"` : ''}${attrs ? ' ' + attrs : ''}`;
  return href ? `<a ${a} href="${href}">${inner}</a>` : `<button type="button" ${a}>${inner}</button>`;
};
export const iconBtn = (ic, aria, { variant = 'ghost', size = 'small', attrs = '' } = {}) => `<button type="button" class="ds-btn" data-variant="${variant}" data-size="${size}" data-layout="iconOnly" aria-label="${esc(aria)}"${attrs ? ' ' + attrs : ''}>${icon(ic)}</button>`;
export const badge = (t, tone = 'neutral', solid = false) => `<span class="ds-badge" data-tone="${tone}"${solid ? ' data-variant="solid"' : ''}>${t}</span>`;
export const dot = (tone, label = '') => `<span class="ds-statusdot" data-tone="${tone}"${label ? ` role="img" aria-label="${esc(label)}"` : ' aria-hidden="true"'}></span>`;
export const avatar = (name, size = 24) => `<span class="ds-avatar" data-size="${size}" role="img" aria-label="${esc(name)}"><span class="ds-avatar__initials" aria-hidden="true">${esc(name.slice(0, 1))}</span></span>`;
export const avatars = (names, size = 24, more = 0) => `<div class="ds-avatar-group" data-size="${size}" role="group" aria-label="참여자">${names.map((n) => avatar(n, size)).join('')}${more ? `<span class="ds-avatar-group__overflow" role="img" aria-label="그 외 ${more}명">+${more}</span>` : ''}</div>`;
export const link = (t, href = '#', size = 'small') => `<a class="ds-link" href="${href}"${size ? ` data-size="${size}"` : ''}>${t}</a>`;
export const divider = () => `<hr class="ds-divider">`;
// 고르기 칸과 입력칸은 large 52 / medium 40 두 가지뿐이라 small 은 medium 으로 받는다
const field40 = (size) => (size === 'small' ? 'medium' : size);
// 한 줄에 고르기 칸이나 입력칸(40)이 있거나, 세그먼트(32)와 버튼(36)이 함께 있으면 small 버튼과 세그먼트를 medium(40)으로 높이를 맞춘다
export const even = (h, force = false) => (force || /class="ds-(select|input)"/.test(h) || (/class="ds-segmented"/.test(h) && /class="ds-btn"/.test(h)) ? h.replace(/(class="ds-(?:btn|segmented)"[^>]*? data-size=")small"/g, '$1medium"') : h);
export const select = (value, { id = '', aria = '', size = 'medium' } = {}) => `<button type="button" class="ds-select" data-size="${field40(size)}"${id ? ` id="${id}"` : ''} aria-haspopup="listbox" aria-expanded="false"${aria ? ` aria-label="${esc(aria)}"` : ''}><span class="ds-select__value">${value}</span></button>`;
export const selField = (label, value, id) => `<div class="ds-field tp-selfield"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}</label></div>${select(value, { id })}</div>`;
export const input = (id, attrs = '', { size = 'medium', ic = '' } = {}) => `<div class="ds-input" data-variant="outline" data-size="${field40(size)}">${ic ? `<i class="ds-icon ds-icon--${ic} ds-input__icon" aria-hidden="true"></i>` : ''}<input class="ds-input__control" id="${id}" ${attrs}></div>`;
export const search = (id, ph, size = 'medium') => input(id, `type="search" placeholder="${esc(ph)}" aria-label="${esc(ph)}"`, { size, ic: 'search' });
export const field = (id, label, control, { help = '', required = false } = {}) => `<div class="ds-field"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}${required ? ' <span class="ds-field__required" aria-hidden="true"></span>' : ''}</label></div>${control}${help ? `<div class="ds-field__footer"><p class="ds-field__help">${help}</p></div>` : ''}</div>`;
export const textarea = (id, attrs = '') => `<textarea class="ds-textarea" id="${id}" ${attrs}></textarea>`;
export const checkbox = (label, { checked = false, name = '', size = '' } = {}) => `<label class="ds-checkbox"${size ? ` data-size="${size}"` : ''}><input type="checkbox" class="ds-checkbox__control"${name ? ` name="${name}"` : ''}${checked ? ' checked' : ''}>${label ? `<span class="ds-checkbox__label">${label}</span>` : ''}</label>`;
export const checkOnly = (aria, checked = false) => `<label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="${esc(aria)}"${checked ? ' checked' : ''}></label>`;
export const sw = (aria, on = false) => `<label class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" aria-label="${esc(aria)}"${on ? ' checked' : ''}></label>`;
export const radios = (name, items, cur = 0, dir = '') => `<div class="ds-radio-group" role="radiogroup" data-size="medium"${dir ? ` data-direction="${dir}"` : ''}>${items.map((l, i) => `<label class="ds-radio"><input type="radio" class="ds-radio__control" name="${name}"${i === cur ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>`;
export const segmented = (items, cur = 0, aria = '보기', size = 'small') => `<div class="ds-segmented" role="group" aria-label="${esc(aria)}" data-size="${size}">${items.map((l, i) => `<button type="button" class="ds-segmented__item" aria-pressed="${i === cur}">${l}</button>`).join('')}</div>`;
export const chiptabs = (items, cur = 0, aria = '분류', { size = '', inset = 'none' } = {}) => `<div class="ds-chiptabs" role="tablist" aria-label="${esc(aria)}"${size ? ` data-size="${size}"` : ''}${inset ? ` data-inset="${inset}"` : ''}>${items.map((l, i) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="${i === cur}">${l}</button>`).join('')}</div>`;
export const tabs = (items, cur = 0, aria = '탭', { layout = '', inset = '' } = {}) => `<div class="ds-tabs" role="tablist" aria-label="${esc(aria)}"${layout ? ` data-layout="${layout}"` : ''}${inset ? ` data-inset="${inset}"` : ''}>${items.map((l, i) => `<button type="button" class="ds-tabs__trigger" role="tab" aria-selected="${i === cur}">${l}</button>`).join('')}</div>`;
export const chip = (l, { on = false, variant = 'outlineWeak', size = 'small' } = {}) => `<button type="button" class="ds-chip" data-variant="${variant}" data-size="${size}"${on ? ' aria-pressed="true"' : ''}>${l}</button>`;
export const progress = (v, { tone = '', small = true, label = '' } = {}) => `<div class="ds-progress" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"${label ? ` aria-label="${esc(label)}"` : ''} style="--ds-progress-value: ${v}%"${tone ? ` data-tone="${tone}"` : ''}${small ? ' data-size="small"' : ''}></div>`;
export const ring = (v, size = 24, tone = '') => `<span class="ds-progress-circle" data-size="${size}"${tone ? ` data-tone="${tone}"` : ''} role="progressbar" aria-valuenow="${v}" style="--ds-progress-value: ${v}"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>`;
export const card = (inner, { cls = '', size = 'small', variant = 'subtle', tag = 'section', attrs = '' } = {}) => `<${tag} class="ds-card tp-card${cls ? ' ' + cls : ''}"${variant ? ` data-variant="${variant}"` : ''}${size ? ` data-size="${size}"` : ''}${attrs ? ' ' + attrs : ''}>${inner}</${tag}>`;
export const callout = (title, desc, tone = 'informative', ic = 'info-solid') => `<div class="ds-callout" data-tone="${tone}">${icon(ic)}<div class="ds-callout__body">${title ? `<p class="ds-callout__title">${title}</p>` : ''}${desc ? `<p class="ds-callout__desc">${desc}</p>` : ''}</div></div>`;
export const empty = (title, desc, ic = 'inbox', action = '') => `<div class="ds-empty"><span class="ds-empty__media">${icon(ic)}</span><p class="ds-empty__title">${title}</p>${desc ? `<p class="ds-empty__desc">${desc}</p>` : ''}${action ? `<div class="ds-empty__actions">${action}</div>` : ''}</div>`;
// 사진: Unsplash(무료 사용 허락) 사진을 주소로 불러온다. 주제별 목록에서 번호로 고른다.
export const unsplash = (id, w = 960) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
export const PHOTOS = {
  nature: ['1506905925346-21bda4d32df4', '1501785888041-af3ef285b470', '1470071459604-3b5ec3a7fe05', '1441974231531-c6227db76b6e', '1507525428034-b723cf961d3e', '1469474968028-56623f02e42e', '1500530855697-b586d89ba3ee', '1447752875215-b2761acb3c5d', '1433086966358-54859d0ed716', '1472214103451-9374bd1c798e'],
  city: ['1477959858617-67f85cf4f1df', '1449824913935-59a10b8d2000', '1480714378408-67cf0d13bc1b', '1514565131-fce0801e5785', '1486406146926-c627a92ad1ab'],
  food: ['1504674900247-0877df9cc836', '1546069901-ba9599a7e63c', '1512621776951-a57141f2eefd', '1495474472287-4d71bcdd2085', '1509042239860-f550ce710b93'],
  product: ['1523275335684-37898b6baf30', '1505740420928-5e560c06d30e', '1526170375885-4d8ecf77b99f', '1491553895911-0055eca6402d', '1572635196237-14b3f281503f', '1495474472287-4d71bcdd2085'],
  book: ['1456513080510-7bf3a84b82f8', '1455390582262-044cdead277a', '1434030216411-0b793f4b4173', '1503676260728-1c00da094a0b', '1512820790803-83ca734da794', '1481627834876-b7833e8f5570', '1513475382585-d06e58bcb0e0'],
  study: ['1516321318423-f06f85e504b3', '1460925895917-afdab827c52f', '1551288049-bebda4e38f71', '1498050108023-c5249f4df085', '1521737604893-d14cc237f11d', '1557804506-669a67965ba0', '1455390582262-044cdead277a', '1517694712202-14dd9538aa97', '1552664730-d307ca884978', '1522202176988-66273c2fd55f', '1519389950473-47ba0277781c', '1456513080510-7bf3a84b82f8'],
  work: ['1497366216548-37526070297c', '1497366811353-6870744d04b2', '1531482615713-2afd69097998', '1552664730-d307ca884978', '1521737604893-d14cc237f11d', '1501504905252-473c47e087f8', '1524178232363-1fb2b075b655'],
};
PHOTOS.mix = [PHOTOS.nature[1], PHOTOS.work[0], PHOTOS.city[0], PHOTOS.food[1], PHOTOS.nature[4], PHOTOS.work[1], PHOTOS.nature[2], PHOTOS.city[2], PHOTOS.food[3], PHOTOS.nature[7], PHOTOS.city[1], PHOTOS.nature[9]];
export const photo = (theme, i = 0, w) => unsplash(PHOTOS[theme][((i % PHOTOS[theme].length) + PHOTOS[theme].length) % PHOTOS[theme].length], w);
export const thumb = (ratio = '16:9', cls = '', src = '', radius = '') => `<div class="ds-imageframe${cls ? ' ' + cls : ''}" data-ratio="${ratio}"${radius ? ` data-radius="${radius}"` : ''} aria-hidden="true"><span class="tp-ph">${src ? `<img src="${src}" alt="" loading="lazy">` : icon('image')}</span></div>`;
export const breadcrumbs = (items) => `<nav class="ds-breadcrumbs" aria-label="현재 위치"><ol>${items.map((t, i) => `<li>${i === items.length - 1 ? `<span aria-current="page">${t}</span>` : `<a href="#">${t}</a>`}</li>`).join('')}</ol></nav>`;
export const stepper = (steps, cur, aria = '단계') => `<ol class="ds-stepper" aria-label="${esc(aria)}">${steps.map((s, i) => `<li class="ds-stepper__step"${i < cur ? ' data-state="complete"' : i === cur ? ' data-state="current" aria-current="step"' : ''}><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">${s}</span></li>`).join('')}</ol>`;
export const pagination = (cur = 1, last = 12) => `<nav class="ds-pagination" aria-label="페이지"><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지"${cur === 1 ? ' aria-disabled="true"' : ' href="#"'}></a>${[1, 2, 3].map((n) => `<a class="ds-pagination__item" href="#"${n === cur ? ' aria-current="page"' : ''}>${n}</a>`).join('')}<span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span><a class="ds-pagination__item" href="#">${last}</a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>`;
export const tablePager = (total, per = 10) => `<div class="ds-tablepagination"><label class="ds-tablepagination__size"><span class="ds-tablepagination__label">페이지당 행 수</span><span class="ds-tablepagination__select"><select><option selected>${per}개</option><option>25개</option><option>50개</option></select></span></label><div class="ds-tablepagination__range"><span class="ds-tablepagination__position"><span class="ds-tablepagination__current">1-${per}</span><span class="ds-tablepagination__total">/ 총 ${total}개</span></span><nav class="ds-pagination" aria-label="표 페이지"><a class="ds-pagination__item" data-type="prev" aria-disabled="true" aria-label="이전 페이지"></a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav></div></div>`;
export const table = (cols, rows, { compact = true, interactive = false, cls = '', caption = '' } = {}) => `<div class="ds-table-wrap${cls ? ' ' + cls : ''}"><table class="ds-table"${compact ? ' data-density="compact"' : ''}>${caption ? `<caption class="tp-sr">${caption}</caption>` : ''}<thead><tr>${cols.map((c) => { const [t, a] = Array.isArray(c) ? c : [c]; return `<th scope="col"${a ? ` data-align="${a}"` : ''}>${t}</th>`; }).join('')}</tr></thead><tbody>${rows.map((r) => `<tr${interactive ? ' data-interactive' : ''}>${r.map((v, i) => { const a = Array.isArray(cols[i]) ? cols[i][1] : ''; return `<td${a ? ` data-align="${a}"` : ''}>${v}</td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`;
export const listItem = (title, { sub = '', prefix = '', suffix = '', href = '#', chevron = false, current = false, size = '' } = {}) => `<li><a class="ds-list-item"${size ? ` data-size="${size}"` : ''} href="${href}"${current ? ' aria-current="page"' : ''}>${prefix ? `<span class="ds-list-item__prefix">${prefix}</span>` : ''}<span class="ds-list-item__content"><span class="ds-list-item__title">${title}</span>${sub ? `<span class="ds-list-item__desc">${sub}</span>` : ''}</span>${suffix ? `<span class="ds-list-item__suffix">${suffix}</span>` : ''}${chevron ? `<i class="ds-icon ds-icon--chevron-right ds-list-item__chevron" aria-hidden="true"></i>` : ''}</a></li>`;
export const list = (items) => `<ul class="ds-list">${items.join('')}</ul>`;
export const menu = (items) => `<div class="ds-menu" role="menu">${items.map((it) => it === '-' ? '<div class="ds-menu__divider" role="separator"></div>' : `<button class="ds-menu-item" role="menuitem"${it[2] ? ` data-tone="${it[2]}"` : ''}>${it[1] ? icon(it[1]) : ''}${it[0]}</button>`).join('')}</div>`;
export const accordion = (items, variant = '') => items.map(([t, d, open, sub]) => `<details class="ds-accordion"${variant ? ` data-variant="${variant}"` : ''}${open ? ' open' : ''}><summary class="ds-accordion__trigger"><span class="ds-accordion__body"><span class="ds-accordion__title">${t}</span>${sub ? `<span class="ds-accordion__desc">${sub}</span>` : ''}</span></summary><div class="ds-accordion__content">${d}</div></details>`).join('');
export const codeblock = (lang, code) => `<figure class="ds-codeblock"><figcaption class="ds-codeblock__header"><span class="ds-codeblock__language">${lang}</span><button type="button" class="ds-codeblock__copy" data-ds-copy aria-label="코드 복사">${icon('copy', 'sm')}</button></figcaption><pre class="ds-codeblock__code"><code>${esc(code)}</code></pre></figure>`;
export const kbd = (t) => `<kbd class="tp-kbd">${t}</kbd>`;
export const logo = (label = '서비스 이름 홈') => `<a class="tp-brand" href="#" aria-label="${esc(label)}"><span class="tp-logo">로고</span></a>`;

/* ------------------------------------------------------------ 머리글과 KPI */
export const head = (title, { sub = '', tools = '', eyebrow = '', level = 1 } = {}) => `<header class="tp-head">
  <div class="tp-head__texts">${eyebrow}<h${level} class="tp-h1">${title}</h${level}>${sub ? `<p class="tp-sub">${sub}</p>` : ''}</div>
  ${tools ? `<div class="tp-head__tools">${even(tools)}</div>` : ''}
</header>`;
export const secHead = (title, { sub = '', tools = '', level = 2, cls = 'tp-h2', id = '' } = {}) => `<div class="tp-sec-head"><div class="tp-sec-head__texts"><h${level} class="${cls}"${id ? ` id="${id}"` : ''}>${title}</h${level}>${sub ? `<span class="tp-sub">${sub}</span>` : ''}</div>${tools ? `<div class="tp-row">${even(tools)}</div>` : ''}</div>`;
export const delta = (v, tone = v.startsWith('-') ? 'down' : v.startsWith('+') ? 'up' : 'flat') => `<span class="tp-delta" data-tone="${tone}">${tone === 'flat' ? '' : `<i class="ds-icon ds-icon--arrow-up ds-icon--sm" aria-hidden="true"${tone === 'down' ? ' style="transform: rotate(180deg)"' : ''}></i>`}${v}</span>`;
export const kpi = (label, value, { d = '', note = '', chart = '', lead = '' } = {}) => card(`<div class="tp-stack">${lead ? `<div class="tp-row">${lead}<span class="tp-kpi__label">${label}</span></div>` : `<span class="tp-kpi__label">${label}</span>`}<div class="tp-row" style="align-items: baseline; flex-wrap: wrap"><span class="tp-kpi__value">${value}</span>${d ? delta(d) : ''}</div>${note ? `<span class="tp-caption">${note}</span>` : ''}</div>${chart}`);

/* ------------------------------------------------------------ 데이터와 차트 */
export const rnd = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
export const walk = (seed, n, start, vol, { min = 0, drift = 0 } = {}) => { const r = rnd(seed); let v = start; return Array.from({ length: n }, () => { v = Math.max(min, v + (r() - 0.5) * vol + drift); return Math.round(v * 10) / 10; }); };
export const C = (i) => `var(--ds-color-chart-series-${((i % 5) + 5) % 5 + 1})`;
const fmt = (n) => (Math.abs(n) >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + 'k' : String(+n.toFixed(2)));
// 차트 공통: 그림은 SVG, 마우스를 올렸을 때 쓰는 값은 data-tp 에 JSON 으로 담는다(CHART_JS 가 읽는다).
let CID = 0;
const tpData = (o) => esc(JSON.stringify(o));
// 선 그래프: series = [{ name, data, color?, dash?, fill? }]
// area: 한 계열이면 위에서 아래로 옅어지는 면, stacked: 쌓은 면. xs: 점마다 이름(풍선 제목), 없으면 x 눈금에서 가까운 것을 쓴다.
export const lineChart = (series, { w = 640, h = 220, x = [], xs = [], yTicks = 4, area = false, stacked = false, label = '선 그래프', unit = '', today = -1 } = {}) => {
  const pl = 40, pr = 8, pt = 8, pb = x.length ? 24 : 8, iw = w - pl - pr, ih = h - pt - pb;
  const n = series[0].data.length;
  const sums = stacked ? Array.from({ length: n }, (_, i) => series.reduce((a, s) => a + s.data[i], 0)) : null;
  const all = stacked ? sums : series.flatMap((s) => s.data);
  let max = Math.max(...all), min = stacked ? 0 : Math.min(...all);
  const step = niceStep((max - min) / yTicks); min = Math.floor(min / step) * step; max = Math.ceil(max / step) * step || step;
  const X = (i) => pl + (iw * i) / Math.max(1, n - 1), Y = (v) => pt + ih - ((v - min) / (max - min)) * ih;
  const id = 'tpg' + ++CID;
  let g = '', defs = '';
  for (let v = min; v <= max + 1e-9; v += step) g += `<line class="tp-grid-line" x1="${pl}" x2="${w - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${pl - 8}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmt(v)}${unit}</text>`;
  x.forEach((t, k) => { const i = Math.round((k * (n - 1)) / Math.max(1, x.length - 1)); g += `<text x="${X(i).toFixed(1)}" y="${h - 6}" text-anchor="${k === 0 ? 'start' : k === x.length - 1 ? 'end' : 'middle'}">${t}</text>`; });
  let paths = '';
  const base = Array(n).fill(0);
  const tops = [];
  series.forEach((s, si) => {
    const col = s.color || C(si);
    const top = s.data.map((v, i) => (stacked ? base[i] + v : v));
    tops.push(top.map((v) => +Y(v).toFixed(1)));
    const pts = top.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    if (stacked) {
      const bot = base.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).reverse();
      paths += `<polygon points="${pts.join(' ')} ${bot.join(' ')}" fill="${col}" fill-opacity="0.22"/>`;
    } else if (area && si === 0) {
      defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity="0.22"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient>`;
      paths += `<polygon points="${pts.join(' ')} ${X(n - 1).toFixed(1)},${Y(min).toFixed(1)} ${X(0).toFixed(1)},${Y(min).toFixed(1)}" fill="url(#${id})"/>`;
    }
    paths += `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="1.75" stroke-linejoin="round" stroke-linecap="round"${s.dash ? ' stroke-dasharray="4 4"' : ''}/>`;
    if (stacked) top.forEach((v, i) => (base[i] = v));
  });
  if (today >= 0) paths += `<line x1="${X(today)}" x2="${X(today)}" y1="${pt}" y2="${pt + ih}" stroke="var(--ds-color-fg-neutral-muted)" stroke-dasharray="4 4"/>`;
  const hover = `<line class="tp-guide" x1="0" x2="0" y1="${pt}" y2="${pt + ih}"/>${series.map((s, si) => `<circle class="tp-dot" r="4" cx="0" cy="0" fill="${s.color || C(si)}"/>`).join('')}`;
  const titles = xs.length === n ? xs : x.length ? Array.from({ length: n }, (_, i) => { const k = Math.round((i * (x.length - 1)) / Math.max(1, n - 1)); return Math.round((k * (n - 1)) / Math.max(1, x.length - 1)) === i ? x[k] : ''; }) : [];
  const data = { t: 'line', w, h, pl, iw, n, x: titles, u: unit, s: series.map((s, si) => ({ n: s.name || '', c: s.color || C(si), v: s.data, y: tops[si] })) };
  return `<svg class="tp-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" data-tp="${tpData(data)}">${defs ? `<defs>${defs}</defs>` : ''}${g}${paths}${hover}</svg>`;
};
export const niceStep = (raw) => { const p = Math.pow(10, Math.floor(Math.log10(raw || 1))); const f = raw / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; };
export const spark = (data, color = C(0), { w = 200, h = 40, label = '추이', unit = '' } = {}) => {
  const max = Math.max(...data), min = Math.min(...data), n = data.length;
  const ys = data.map((v) => +(h - 2 - ((v - min) / (max - min || 1)) * (h - 4)).toFixed(1));
  const pts = data.map((v, i) => `${((w * i) / (n - 1)).toFixed(1)},${ys[i]}`).join(' ');
  const d = { t: 'line', w, h, pl: 0, iw: w, n, x: [], u: unit, s: [{ n: '', c: color, v: data, y: ys }] };
  return `<svg class="tp-chart tp-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(label)}" data-tp="${tpData(d)}"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><line class="tp-guide" x1="0" x2="0" y1="0" y2="${h}" vector-effect="non-scaling-stroke"/></svg>`;
};
// 막대 그래프: groups = [[v1, v2, ...], ...] (계열 여러 개면 나란히, stacked 면 쌓기). names: 계열 이름(풍선에 씀)
export const barChart = (groups, { w = 640, h = 220, x = [], xs = [], label = '막대 그래프', stacked = false, colors = [], names = [], unit = '' } = {}) => {
  const pl = 40, pr = 8, pt = 8, pb = 24, iw = w - pl - pr, ih = h - pt - pb, n = groups.length, k = groups[0].length;
  const max0 = Math.max(...groups.map((g) => (stacked ? g.reduce((a, b) => a + b, 0) : Math.max(...g)))); const step = niceStep(max0 / 4); const max = Math.ceil(max0 / step) * step;
  const Y = (v) => pt + ih - (v / max) * ih; const bw = iw / n; let s = '';
  for (let v = 0; v <= max + 1e-9; v += step) s += `<line class="tp-grid-line" x1="${pl}" x2="${w - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${pl - 8}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmt(v)}${unit}</text>`;
  groups.forEach((g, i) => {
    let acc = 0; const inner = bw * (k > 1 && !stacked ? 0.7 : 0.56), each = stacked ? inner : inner / k;
    s += `<g data-i="${i}">`;
    g.forEach((v, j) => { const x0 = pl + bw * i + (bw - inner) / 2 + (stacked ? 0 : each * j); const y0 = stacked ? Y(acc + v) : Y(v); const hh = stacked ? Y(acc) - Y(acc + v) : Y(0) - Y(v); s += `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${Math.max(1, each - (stacked ? 0 : 3)).toFixed(1)}" height="${Math.max(0, hh).toFixed(1)}" rx="${Math.min(4, each / 4).toFixed(1)}" fill="${colors[j] || C(j)}"/>`; acc += v; });
    s += '</g>';
    if (x[i] !== undefined) s += `<text x="${(pl + bw * i + bw / 2).toFixed(1)}" y="${h - 6}" text-anchor="middle">${x[i]}</text>`;
  });
  const d = { t: 'bar', w, h, pl, iw, n, x: xs.length ? xs : x, u: unit, s: Array.from({ length: k }, (_, j) => ({ n: names[j] || '', c: colors[j] || C(j), v: groups.map((g) => g[j]) })) };
  return `<svg class="tp-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" data-tp="${tpData(d)}">${s}</svg>`;
};
export const donut = (parts, { size = 160, thick = 16, center = '', sub = '', label = '도넛 그래프', unit = '' } = {}) => {
  const r = (size - thick) / 2, c = 2 * Math.PI * r; let off = 0; const tot = parts.reduce((a, p) => a + p[1], 0);
  const arcs = parts.map(([, v, col], i) => { const len = (v / tot) * c; const s = `<circle data-i="${i}" cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col || C(i)}" stroke-width="${thick}" stroke-dasharray="${Math.max(0, len - 2).toFixed(1)} ${(c - len + 2).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`; off += len; return s; }).join('');
  const d = { t: 'pie', u: unit, s: parts.map(([n, v, col], i) => ({ n, c: col || C(i), v, p: Math.round((v / tot) * 1000) / 10 })) };
  return `<svg class="tp-chart tp-donut" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="${esc(label)}" data-tp="${tpData(d)}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ds-color-bg-neutral)" stroke-width="${thick}"/>${arcs}${center ? `<text x="50%" y="${size / 2 + (sub ? 2 : 7)}" text-anchor="middle" style="font-size:22px;font-weight:700;letter-spacing:-0.02em;fill:var(--ds-color-fg-neutral)">${center}</text>` : ''}${sub ? `<text x="50%" y="${size / 2 + 20}" text-anchor="middle">${sub}</text>` : ''}</svg>`;
};
// 차트 인터랙션: 선과 막대는 가로 위치로 가장 가까운 점, 도넛은 조각. 풍선 하나를 페이지가 같이 쓴다.
export const CHART_JS = `(function () {
  var tip = document.createElement('div'); tip.className = 'tp-tip'; tip.setAttribute('role', 'status'); document.body.appendChild(tip);
  var nf = function (v, u) { return (typeof v === 'number' ? v.toLocaleString('ko-KR') : v) + (u || ''); };
  var show = function (title, rows, cx, cy) {
    tip.innerHTML = (title ? '<span class="tp-tip__t">' + title + '</span>' : '') + rows.map(function (r) { return '<span class="tp-tip__r">' + (r.c ? '<i style="--c:' + r.c + '"></i>' : '') + (r.n || '') + '<b>' + r.v + '</b></span>'; }).join('');
    tip.classList.add('is-on');
    var tw = tip.offsetWidth, th = tip.offsetHeight, x = cx + 14, y = cy - th - 10;
    if (x + tw > innerWidth - 8) x = cx - tw - 14; if (y < 8) y = cy + 14;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  };
  var hide = function (svg) { tip.classList.remove('is-on'); svg.classList.remove('is-hover'); svg.querySelectorAll('.is-on').forEach(function (e) { e.classList.remove('is-on'); }); };
  document.querySelectorAll('[data-tip]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) { var p = el.getAttribute('data-tip').split('|'); show(p[0], p[1] ? [{ n: '', v: p[1] }] : [], e.clientX, e.clientY); });
    el.addEventListener('pointerleave', function () { tip.classList.remove('is-on'); });
  });
  document.querySelectorAll('svg[data-tp]').forEach(function (svg) {
    var d = JSON.parse(svg.getAttribute('data-tp'));
    var guide = svg.querySelector('.tp-guide'), dots = svg.querySelectorAll('.tp-dot');
    svg.addEventListener('pointerleave', function () { hide(svg); });
    svg.addEventListener('pointermove', function (e) {
      var rc = svg.getBoundingClientRect();
      if (d.t === 'pie') {
        var t = e.target.closest('[data-i]'); if (!t) { hide(svg); return; }
        var p = d.s[+t.getAttribute('data-i')];
        svg.classList.add('is-hover'); svg.querySelectorAll('[data-i]').forEach(function (a) { a.classList.toggle('is-on', a === t); });
        show(p.n, [{ c: p.c, n: '', v: nf(p.v, d.u) + ' · ' + p.p + '%' }], e.clientX, e.clientY); return;
      }
      var vx = (e.clientX - rc.left) / rc.width * d.w;
      var i = d.t === 'bar' ? Math.floor((vx - d.pl) / (d.iw / d.n)) : Math.round((vx - d.pl) / d.iw * (d.n - 1));
      if (i < 0 || i >= d.n) { hide(svg); return; }
      svg.classList.add('is-hover');
      var top = rc.top + rc.height;
      if (d.t === 'line') {
        var gx = d.pl + d.iw * i / Math.max(1, d.n - 1);
        if (guide) { guide.setAttribute('x1', gx); guide.setAttribute('x2', gx); }
        d.s.forEach(function (s, k) { if (dots[k]) { dots[k].setAttribute('cx', gx); dots[k].setAttribute('cy', s.y[i]); } top = Math.min(top, rc.top + s.y[i] / d.h * rc.height); });
        show(d.x[i] || '', d.s.map(function (s) { return { c: d.s.length > 1 ? s.c : '', n: s.n, v: nf(s.v[i], d.u) }; }), rc.left + gx / d.w * rc.width, top);
      } else {
        svg.querySelectorAll('g[data-i]').forEach(function (g) { g.classList.toggle('is-on', +g.getAttribute('data-i') === i); });
        show(d.x[i] || '', d.s.map(function (s) { return { c: d.s.length > 1 ? s.c : '', n: s.n, v: nf(s.v[i], d.u) }; }), e.clientX, e.clientY);
      }
    });
  });
})();`;
export const legend = (items) => `<div class="tp-legend">${items.map(([t, i, extra]) => `<span class="tp-legend__item"><span class="tp-swatch" style="--c:${typeof i === 'number' ? C(i) : i}"></span>${t}${extra ? ` <span class="tp-num">${extra}</span>` : ''}</span>`).join('')}</div>`;
export const split = (parts) => `<div class="tp-split" role="img" aria-label="${esc(parts.map(([t, v]) => `${t} ${v}%`).join(', '))}">${parts.map(([t, v, c], i) => `<span style="width:${v}%;--c:${c || C(i)}" data-tip="${esc(t)}|${v}%"></span>`).join('')}</div>`;
export const meter = (label, v, value) => `<div class="tp-track"><div class="tp-between"><span class="tp-sub">${label}</span><span class="tp-num tp-sub">${value}</span></div>${progress(v, { label })}</div>`;

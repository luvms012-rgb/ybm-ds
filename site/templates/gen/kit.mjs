// 템플릿 생성기 공용 부품. 레퍼런스 A 템플릿 51종의 구조를 YBM DS 부품과 토큰으로 다시 짠다.
// 값은 모두 --ybm-* 토큰. 글은 한국어, 숫자와 고유한 기술 용어만 영어.
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------ 공통 CSS */
export const BASE_CSS = `  /* 템플릿 배치 전용. 값은 모두 --ybm-* 토큰 */
  body { word-break: keep-all; overflow-wrap: break-word; }
  .tp-app { display: flex; flex-direction: column; min-height: 100vh; background: var(--ybm-color-bg-layer-default); }
  .tp-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ybm-space-x4); padding: var(--ybm-space-x6) var(--ybm-space-x4) var(--ybm-space-x2); }
  .tp-head__texts { display: flex; flex-direction: column; gap: var(--ybm-space-x2); min-width: 0; }
  .tp-head .tp-sub { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-head__tools { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--ybm-space-x2); }
  .tp-head > .tp-row, .tp-head .tp-between > .tp-row { flex-wrap: wrap; }
  .ds-tablepagination { flex-wrap: wrap; row-gap: var(--ybm-space-x2); min-width: 0; }
  .tp-between > .tp-row { flex-wrap: wrap; }
  .tp-h1 { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  .tp-h2 { font-size: var(--ybm-font-size-t07); line-height: var(--ybm-line-height-t07); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  .tp-h3 { font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); font-weight: var(--ybm-font-weight-semibold); }
  .tp-h4 { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); font-weight: var(--ybm-font-weight-semibold); }
  .tp-sub { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral-muted); }
  .tp-caption { font-size: var(--ybm-font-size-t02); line-height: var(--ybm-line-height-t02); color: var(--ybm-color-fg-neutral-subtle); }
  .tp-num { font-variant-numeric: tabular-nums; }
  .tp-body { display: flex; flex: 1 1 auto; flex-direction: column; min-height: 0; }
  .tp-content { display: flex; flex: 1 1 auto; flex-direction: column; gap: var(--ybm-space-x8); min-width: 0; padding: var(--ybm-space-x6) var(--ybm-space-x4) var(--ybm-space-x12); }
  .tp-panel { display: flex; flex-direction: column; gap: var(--ybm-space-x6); padding: var(--ybm-space-x6) var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-sec { display: flex; flex-direction: column; gap: var(--ybm-space-x4); min-width: 0; }
  .tp-sec-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2) var(--ybm-space-x3); }
  .tp-sec-head__texts { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ybm-space-x1) var(--ybm-space-x3); }
  .tp-row { display: flex; align-items: center; gap: var(--ybm-space-x2); min-width: 0; }
  /* 줄 안에 놓인 고르기 칸은 글자만큼만 */
  :is(.tp-row, .tp-between, .tp-head__tools, .tp-sec-head) > .ds-select { width: auto; min-width: 140px; }
  .tp-between { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
  .tp-stack { display: flex; flex-direction: column; gap: var(--ybm-space-x1); min-width: 0; }
  .tp-stack > .ds-badge { align-self: flex-start; }
  .tp-g2, .tp-g3, .tp-g4, .tp-g5, .tp-g6 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x3); }
  .tp-card { min-width: 0; }
  /* 흰 바탕 화면의 카드는 선 없는 연회색 상자 */
  .tp-card.ds-card { gap: var(--ybm-space-x4); padding: var(--ybm-space-x5); border-radius: var(--ybm-shape-2xl); box-shadow: none; background: var(--ybm-color-bg-neutral-muted); }
  /* 회색 바탕 화면(tp-canvas): 흰 면을 선 없이 바탕색 차이로 나눈다 */
  body.tp-canvas, .tp-canvas .tp-app, .tp-canvas .tp-bar { background: var(--ybm-color-bg-canvas); }
  .tp-canvas .tp-card.ds-card { box-shadow: none; background: var(--ybm-color-bg-layer-default); }
  .tp-canvas .tp-content > .ds-divider, .tp-canvas .tp-content > .tp-sec + .ds-divider { display: none; }
  .tp-canvas .tp-panel { background: var(--ybm-color-bg-layer-default); box-shadow: none; }
  .tp-canvas .tp-g2, .tp-canvas .tp-g3, .tp-canvas .tp-g4, .tp-canvas .tp-g5, .tp-canvas .tp-g6 { gap: var(--ybm-space-x4); }
  .tp-canvas .tp-content { gap: var(--ybm-space-x6); }
  .tp-span2 { grid-column: auto; }
  .tp-kpi__label { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral-muted); }
  .tp-kpi__value { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-delta { display: inline-flex; align-items: center; gap: 2px; font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); font-weight: var(--ybm-font-weight-medium); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tp-delta .ds-icon { --ds-icon-size: 14px; }
  .tp-delta[data-tone="up"] { color: var(--ybm-color-fg-positive); }
  .tp-delta[data-tone="down"] { color: var(--ybm-color-fg-critical); }
  .tp-delta[data-tone="flat"] { color: var(--ybm-color-fg-neutral-muted); }
  .tp-chart { display: block; width: 100%; height: auto; overflow: visible; }
  .tp-chart text { fill: var(--ybm-color-fg-neutral-subtle); font-size: 11px; font-family: inherit; }
  .tp-chart .tp-grid-line { stroke: var(--ybm-color-stroke-neutral-muted); stroke-width: 1; }
  .tp-legend { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x1) var(--ybm-space-x4); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); color: var(--ybm-color-fg-neutral-muted); }
  .tp-legend__item { display: inline-flex; align-items: center; gap: var(--ybm-space-x1_5); }
  .tp-swatch { flex: none; width: 10px; height: 10px; border-radius: 3px; background: var(--c, var(--ybm-color-chart-series-1)); }
  .tp-split { display: flex; height: 12px; overflow: hidden; border-radius: var(--ybm-shape-pill); background: var(--ybm-color-bg-neutral); }
  .tp-split > span { height: 100%; background: var(--c); }
  .tp-split > span + span { box-shadow: inset 2px 0 0 var(--ybm-color-bg-layer-default); }
  .tp-ph { display: grid; place-items: center; width: 100%; height: 100%; color: var(--ybm-color-fg-neutral-subtle); background: var(--ybm-color-bg-neutral); }
  .tp-logo { display: inline-grid; place-items: center; width: 88px; height: 28px; border-radius: var(--ybm-shape-xs); background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t03-static); line-height: var(--ybm-line-height-t03-static); font-weight: var(--ybm-font-weight-semibold); }
  .tp-bar { position: sticky; top: 0; z-index: var(--ybm-z-sticky); background: var(--ybm-color-bg-layer-default); }
  .tp-track { display: flex; flex-direction: column; gap: var(--ybm-space-x1); min-width: 120px; }
  .tp-hide-sm { display: none; }
  .tp-scroll-x { overflow-x: auto; }
  .tp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .tp-kbd { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 4px; border-radius: var(--ybm-shape-2xs); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t01); font-family: inherit; }
  @media (min-width: 768px) {
    .tp-head { padding: var(--ybm-space-x10) var(--ybm-space-x10) var(--ybm-space-x2); }
    .tp-h1 { font-size: var(--ybm-font-size-t11); line-height: var(--ybm-line-height-t11); }
    .tp-head .tp-sub { font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); }
    .tp-content { padding: var(--ybm-space-x8) var(--ybm-space-x10) var(--ybm-space-x16); gap: var(--ybm-space-x12); }
    .tp-canvas .tp-content { gap: var(--ybm-space-x8); }
    .tp-panel { padding: var(--ybm-space-x8) var(--ybm-space-x6); }
    .tp-card.ds-card { padding: var(--ybm-space-x6); }
    .tp-g2, .tp-g4, .tp-g6 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tp-g3, .tp-g5 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tp-hide-sm { display: revert; }
  }
  @media (min-width: 1024px) {
    .tp-body--panel { flex-direction: row; }
    .tp-body--panel > .tp-panel { flex: none; width: 400px; box-shadow: inset 1px 0 0 var(--ybm-color-stroke-neutral-muted); }
    .tp-canvas .tp-body--panel > .tp-panel { box-shadow: none; }
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
<title>${esc(title)} - YBM DS 템플릿</title>
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<script src="../../../dist/ybm-ds.js" defer></script>
<style>
${BASE_CSS}${css}</style>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
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
export const link = (t, href = '#') => `<a class="ds-link" href="${href}">${t}</a>`;
export const divider = () => `<hr class="ds-divider">`;
export const select = (value, { id = '', aria = '', size = 'medium' } = {}) => `<button type="button" class="ds-select" data-size="${size}"${id ? ` id="${id}"` : ''} aria-haspopup="listbox" aria-expanded="false"${aria ? ` aria-label="${esc(aria)}"` : ''}><span class="ds-select__value">${value}</span></button>`;
export const selField = (label, value, id) => `<div class="ds-field tp-selfield"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}</label></div>${select(value, { id })}</div>`;
export const input = (id, attrs = '', { size = 'medium', ic = '' } = {}) => `<div class="ds-input" data-variant="outline" data-size="${size}">${ic ? `<i class="ds-icon ds-icon--${ic} ds-input__icon" aria-hidden="true"></i>` : ''}<input class="ds-input__control" id="${id}" ${attrs}></div>`;
export const search = (id, ph, size = 'medium') => input(id, `type="search" placeholder="${esc(ph)}" aria-label="${esc(ph)}"`, { size, ic: 'search' });
export const field = (id, label, control, { help = '', required = false } = {}) => `<div class="ds-field"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}${required ? ' <span class="ds-field__required" aria-hidden="true">*</span>' : ''}</label></div>${control}${help ? `<div class="ds-field__footer"><p class="ds-field__help">${help}</p></div>` : ''}</div>`;
export const textarea = (id, attrs = '') => `<textarea class="ds-textarea" id="${id}" ${attrs}></textarea>`;
export const checkbox = (label, { checked = false, name = '', size = '' } = {}) => `<label class="ds-checkbox"${size ? ` data-size="${size}"` : ''}><input type="checkbox" class="ds-checkbox__control"${name ? ` name="${name}"` : ''}${checked ? ' checked' : ''}>${label ? `<span class="ds-checkbox__label">${label}</span>` : ''}</label>`;
export const checkOnly = (aria, checked = false) => `<label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="${esc(aria)}"${checked ? ' checked' : ''}></label>`;
export const sw = (aria, on = false) => `<label class="ds-switch"><input type="checkbox" role="switch" class="ds-switch__control" aria-label="${esc(aria)}"${on ? ' checked' : ''}></label>`;
export const radios = (name, items, cur = 0, dir = '') => `<div class="ds-radio-group" role="radiogroup" data-size="medium"${dir ? ` data-direction="${dir}"` : ''}>${items.map((l, i) => `<label class="ds-radio"><input type="radio" class="ds-radio__control" name="${name}"${i === cur ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div>`;
export const segmented = (items, cur = 0, aria = '보기', size = 'small') => `<div class="ds-segmented" role="group" aria-label="${esc(aria)}" data-size="${size}">${items.map((l, i) => `<button type="button" class="ds-segmented__item" aria-pressed="${i === cur}">${l}</button>`).join('')}</div>`;
export const chiptabs = (items, cur = 0, aria = '분류') => `<div class="ds-chiptabs" role="tablist" aria-label="${esc(aria)}">${items.map((l, i) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="${i === cur}">${l}</button>`).join('')}</div>`;
export const tabs = (items, cur = 0, aria = '탭') => `<div class="ds-tabs" role="tablist" aria-label="${esc(aria)}">${items.map((l, i) => `<button type="button" class="ds-tabs__trigger" role="tab" aria-selected="${i === cur}">${l}</button>`).join('')}</div>`;
export const chip = (l, { on = false, variant = 'outlineWeak', size = 'small' } = {}) => `<button type="button" class="ds-chip" data-variant="${variant}" data-size="${size}"${on ? ' aria-pressed="true"' : ''}>${l}</button>`;
export const progress = (v, { tone = '', small = true, label = '' } = {}) => `<div class="ds-progress" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100"${label ? ` aria-label="${esc(label)}"` : ''} style="--ds-progress-value: ${v}%"${tone ? ` data-tone="${tone}"` : ''}${small ? ' data-size="small"' : ''}></div>`;
export const ring = (v, size = 24, tone = '') => `<span class="ds-progress-circle" data-size="${size}"${tone ? ` data-tone="${tone}"` : ''} role="progressbar" aria-valuenow="${v}" style="--ds-progress-value: ${v}"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span>`;
export const card = (inner, { cls = '', size = 'small', tag = 'section', attrs = '' } = {}) => `<${tag} class="ds-card tp-card${cls ? ' ' + cls : ''}"${size ? ` data-size="${size}"` : ''}${attrs ? ' ' + attrs : ''}>${inner}</${tag}>`;
export const callout = (title, desc, tone = 'informative', ic = 'info-solid') => `<div class="ds-callout" data-tone="${tone}">${icon(ic)}<div class="ds-callout__body">${title ? `<p class="ds-callout__title">${title}</p>` : ''}${desc ? `<p class="ds-callout__desc">${desc}</p>` : ''}</div></div>`;
export const empty = (title, desc, ic = 'inbox', action = '') => `<div class="ds-empty"><span class="ds-empty__media">${icon(ic)}</span><p class="ds-empty__title">${title}</p>${desc ? `<p class="ds-empty__desc">${desc}</p>` : ''}${action ? `<div class="ds-empty__actions">${action}</div>` : ''}</div>`;
export const thumb = (ratio = '16:9', cls = '') => `<div class="ds-imageframe${cls ? ' ' + cls : ''}" data-ratio="${ratio}" aria-hidden="true"><span class="tp-ph">${icon('image')}</span></div>`;
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
  ${tools ? `<div class="tp-head__tools">${tools}</div>` : ''}
</header>`;
export const secHead = (title, { sub = '', tools = '', level = 2, cls = 'tp-h2', id = '' } = {}) => `<div class="tp-sec-head"><div class="tp-sec-head__texts"><h${level} class="${cls}"${id ? ` id="${id}"` : ''}>${title}</h${level}>${sub ? `<span class="tp-sub">${sub}</span>` : ''}</div>${tools ? `<div class="tp-row">${tools}</div>` : ''}</div>`;
export const delta = (v, tone = v.startsWith('-') ? 'down' : v.startsWith('+') ? 'up' : 'flat') => `<span class="tp-delta" data-tone="${tone}">${tone === 'flat' ? '' : `<i class="ds-icon ds-icon--arrow-up ds-icon--sm" aria-hidden="true"${tone === 'down' ? ' style="transform: rotate(180deg)"' : ''}></i>`}${v}</span>`;
export const kpi = (label, value, { d = '', note = '', chart = '', lead = '' } = {}) => card(`<div class="tp-stack">${lead ? `<div class="tp-row">${lead}<span class="tp-kpi__label">${label}</span></div>` : `<span class="tp-kpi__label">${label}</span>`}<div class="tp-row" style="align-items: baseline; flex-wrap: wrap"><span class="tp-kpi__value">${value}</span>${d ? delta(d) : ''}</div>${note ? `<span class="tp-caption">${note}</span>` : ''}</div>${chart}`);

/* ------------------------------------------------------------ 데이터와 차트 */
export const rnd = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
export const walk = (seed, n, start, vol, { min = 0, drift = 0 } = {}) => { const r = rnd(seed); let v = start; return Array.from({ length: n }, () => { v = Math.max(min, v + (r() - 0.5) * vol + drift); return Math.round(v * 10) / 10; }); };
export const C = (i) => `var(--ybm-color-chart-series-${((i % 5) + 5) % 5 + 1})`;
const fmt = (n) => (Math.abs(n) >= 1000 ? (n / 1000).toFixed(n % 1000 ? 1 : 0) + 'k' : String(Math.round(n)));
// 선 그래프: series = [{ name, data, color? , dash? , fill? }]
export const lineChart = (series, { w = 640, h = 220, x = [], yTicks = 4, area = false, stacked = false, label = '선 그래프', unit = '', today = -1 } = {}) => {
  const pl = 40, pr = 8, pt = 8, pb = x.length ? 24 : 8, iw = w - pl - pr, ih = h - pt - pb;
  const n = series[0].data.length;
  const sums = stacked ? Array.from({ length: n }, (_, i) => series.reduce((a, s) => a + s.data[i], 0)) : null;
  const all = stacked ? sums : series.flatMap((s) => s.data);
  let max = Math.max(...all), min = stacked || area ? 0 : Math.min(...all);
  const step = niceStep((max - min) / yTicks); min = Math.floor(min / step) * step; max = Math.ceil(max / step) * step || step;
  const X = (i) => pl + (iw * i) / Math.max(1, n - 1), Y = (v) => pt + ih - ((v - min) / (max - min)) * ih;
  let g = '';
  for (let v = min; v <= max + 1e-9; v += step) g += `<line class="tp-grid-line" x1="${pl}" x2="${w - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${pl - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmt(v)}${unit}</text>`;
  x.forEach((t, k) => { const i = Math.round((k * (n - 1)) / Math.max(1, x.length - 1)); g += `<text x="${X(i).toFixed(1)}" y="${h - 6}" text-anchor="${k === 0 ? 'start' : k === x.length - 1 ? 'end' : 'middle'}">${t}</text>`; });
  let paths = '';
  const base = Array(n).fill(0);
  series.forEach((s, si) => {
    const col = s.color || C(si);
    const top = s.data.map((v, i) => (stacked ? base[i] + v : v));
    const pts = top.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    if (area || stacked) { const bot = stacked ? base.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).reverse() : [`${X(n - 1).toFixed(1)},${Y(min).toFixed(1)}`, `${X(0).toFixed(1)},${Y(min).toFixed(1)}`]; paths += `<polygon points="${pts.join(' ')} ${bot.join(' ')}" fill="${col}" fill-opacity="${stacked ? 0.55 : 0.14}"/>`; }
    paths += `<polyline points="${pts.join(' ')}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${s.dash ? ' stroke-dasharray="4 4"' : ''}/>`;
    if (stacked) top.forEach((v, i) => (base[i] = v));
  });
  if (today >= 0) paths += `<line x1="${X(today)}" x2="${X(today)}" y1="${pt}" y2="${pt + ih}" stroke="var(--ybm-color-fg-neutral-muted)" stroke-dasharray="4 4"/>`;
  return `<svg class="tp-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${g}${paths}</svg>`;
};
export const niceStep = (raw) => { const p = Math.pow(10, Math.floor(Math.log10(raw || 1))); const f = raw / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; };
export const spark = (data, color = C(0), { w = 200, h = 40, label = '추이' } = {}) => { const max = Math.max(...data), min = Math.min(...data), n = data.length; const pts = data.map((v, i) => `${((w * i) / (n - 1)).toFixed(1)},${(h - 2 - ((v - min) / (max - min || 1)) * (h - 4)).toFixed(1)}`).join(' '); return `<svg class="tp-chart tp-spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(label)}"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`; };
export const barChart = (groups, { w = 640, h = 220, x = [], label = '막대 그래프', stacked = false, colors = [] } = {}) => {
  // groups: [[v1, v2, ...], ...] (계열 여러 개면 나란히, stacked 면 쌓기)
  const pl = 40, pr = 8, pt = 8, pb = 24, iw = w - pl - pr, ih = h - pt - pb, n = groups.length, k = groups[0].length;
  const max0 = Math.max(...groups.map((g) => (stacked ? g.reduce((a, b) => a + b, 0) : Math.max(...g)))); const step = niceStep(max0 / 4); const max = Math.ceil(max0 / step) * step;
  const Y = (v) => pt + ih - (v / max) * ih; const bw = iw / n; let s = '';
  for (let v = 0; v <= max + 1e-9; v += step) s += `<line class="tp-grid-line" x1="${pl}" x2="${w - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${pl - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${fmt(v)}</text>`;
  groups.forEach((g, i) => { let acc = 0; const inner = bw * 0.64, each = stacked ? inner : inner / k; g.forEach((v, j) => { const x0 = pl + bw * i + (bw - inner) / 2 + (stacked ? 0 : each * j); const y0 = stacked ? Y(acc + v) : Y(v); const hh = stacked ? Y(acc) - Y(acc + v) : Y(0) - Y(v); s += `<rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${Math.max(1, each - (stacked ? 0 : 2)).toFixed(1)}" height="${Math.max(0, hh).toFixed(1)}" rx="2" fill="${colors[j] || C(j)}"/>`; acc += v; }); if (x[i] !== undefined) s += `<text x="${(pl + bw * i + bw / 2).toFixed(1)}" y="${h - 6}" text-anchor="middle">${x[i]}</text>`; });
  return `<svg class="tp-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${s}</svg>`;
};
export const donut = (parts, { size = 160, thick = 18, center = '', sub = '', label = '도넛 그래프' } = {}) => { const r = (size - thick) / 2, c = 2 * Math.PI * r; let off = 0; const tot = parts.reduce((a, p) => a + p[1], 0); const arcs = parts.map(([, v, col], i) => { const len = (v / tot) * c; const s = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${col || C(i)}" stroke-width="${thick}" stroke-dasharray="${Math.max(0, len - 2).toFixed(1)} ${(c - len + 2).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`; off += len; return s; }).join(''); return `<svg class="tp-chart tp-donut" viewBox="0 0 ${size} ${size}" style="max-width:${size}px" role="img" aria-label="${esc(label)}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ybm-color-bg-neutral)" stroke-width="${thick}"/>${arcs}${center ? `<text x="50%" y="${size / 2 + (sub ? 0 : 6)}" text-anchor="middle" style="font-size:22px;font-weight:700;fill:var(--ybm-color-fg-neutral)">${center}</text>` : ''}${sub ? `<text x="50%" y="${size / 2 + 20}" text-anchor="middle">${sub}</text>` : ''}</svg>`; };
export const legend = (items) => `<div class="tp-legend">${items.map(([t, i, extra]) => `<span class="tp-legend__item"><span class="tp-swatch" style="--c:${typeof i === 'number' ? C(i) : i}"></span>${t}${extra ? ` <span class="tp-num">${extra}</span>` : ''}</span>`).join('')}</div>`;
export const split = (parts) => `<div class="tp-split" role="img" aria-label="${esc(parts.map(([t, v]) => `${t} ${v}%`).join(', '))}">${parts.map(([, v, c], i) => `<span style="width:${v}%;--c:${c || C(i)}"></span>`).join('')}</div>`;
export const meter = (label, v, value) => `<div class="tp-track"><div class="tp-between"><span class="tp-sub">${label}</span><span class="tp-num tp-sub">${value}</span></div>${progress(v, { label })}</div>`;

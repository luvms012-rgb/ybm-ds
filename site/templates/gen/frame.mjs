// 시험 접수, 러닝 템플릿이 함께 쓰는 틀: 위 메뉴(사용자 화면), 옆 메뉴(기관 관리 화면), 공통 조각.
import * as K from './kit.mjs';
const { icon, esc } = K;

export const T = (s) => `<span class="tp-num">${s}</span>`;

export const FRAME_CSS = `
  /* 위 메뉴 화면 */
  .tp-topbar { position: sticky; top: 0; z-index: var(--ybm-z-sticky); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-topbar > .ds-topnav { width: min(100%, 1200px); margin-inline: auto; background: none; }
  .tp-topbar .ds-topnav__menu { display: none; }
  @media (min-width: 768px) { .tp-topbar .ds-topnav__menu { display: flex; } }
  .tp-wrap { width: min(100%, 1200px); margin-inline: auto; }
  .tp-topbar ~ .tp-head, .tp-topbar ~ .tp-content { box-sizing: border-box; width: min(100%, 1280px); margin-inline: auto; }
  /* 옆 메뉴 화면 */
  .tp-app.tp-frame { flex-direction: row; min-height: 100vh; }
  .tp-frame .ds-sidenav__header { justify-content: flex-start; }
  .tp-frame > .ds-sidenav { display: none; }
  .tp-frame__main { display: flex; flex: 1 1 auto; flex-direction: column; min-width: 0; }
  .tp-mbar { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); padding: var(--ybm-space-x2) var(--ybm-space-x4); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 1024px) {
    .tp-frame > .ds-sidenav { display: flex; position: sticky; top: 0; flex: none; height: 100vh; background: var(--ybm-color-bg-layer-default); box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); }
    .tp-mbar { display: none; }
  }
  .tp-org { display: flex; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x2) var(--ybm-space-x2) var(--ybm-space-x1); }
  .tp-org__mark { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: var(--ybm-shape-sm); background: var(--ybm-color-bg-neutral-solid); color: var(--ybm-color-fg-neutral-inverted); font-size: var(--ybm-font-size-t03-static); font-weight: var(--ybm-font-weight-bold); }
  /* 고르기 상자 칸 수: 모바일은 1칸(4칸은 2칸), 768 부터 지정한 칸 */
  .tp-sb2, .tp-sb3 { --ds-selectbox-columns: 1; } .tp-sb4 { --ds-selectbox-columns: 2; }
  @media (min-width: 768px) { .tp-sb2 { --ds-selectbox-columns: 2; } .tp-sb3 { --ds-selectbox-columns: 3; } .tp-sb4 { --ds-selectbox-columns: 4; } }
  /* 옆으로 미는 표는 눌리지 않게 */
  .tp-scroll-x .ds-table { min-width: 760px; }
  /* 공통 조각 */
  .tp-big { font-size: var(--ybm-font-size-t11); line-height: var(--ybm-line-height-t11); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-mid { font-size: var(--ybm-font-size-t07); line-height: var(--ybm-line-height-t07); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-rows { display: flex; flex-direction: column; }
  .tp-rows > * { padding-block: var(--ybm-space-x3); }
  .tp-rows > * + * { box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-kv { display: flex; justify-content: space-between; gap: var(--ybm-space-x3); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-kv > :first-child { color: var(--ybm-color-fg-neutral-muted); flex: none; }
  .tp-kv > :last-child { text-align: end; }
  .tp-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4); }
  .tp-stats > * { display: flex; flex-direction: column; gap: var(--ybm-space-x1); min-width: 0; }
  @media (min-width: 768px) { .tp-stats { grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); } .tp-stats > * + * { padding-inline-start: var(--ybm-space-x4); box-shadow: inset 1px 0 0 var(--ybm-color-stroke-neutral-muted); } }
  .tp-thumb-sm { flex: none; width: 96px; }
  .tp-thumb-sm .ds-imageframe, .tp-course .ds-imageframe { border-radius: var(--ybm-shape-lg); }
  .tp-aside-sticky { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  @media (min-width: 1024px) { .tp-aside-sticky { position: sticky; top: calc(var(--ybm-space-x16) + var(--ybm-space-x4)); } }
`;

const topItem = (t, cur) => `<a class="ds-topnav__item" href="#"${cur ? ' aria-current="page"' : ''}>${t}</a>`;
export const topbar = (menu, cur, end) => `<div class="tp-topbar"><header class="ds-topnav">
  <div class="ds-topnav__left"><a class="ds-topnav__heading" href="#" aria-label="서비스 이름 홈"><span class="tp-logo">로고</span></a><nav class="ds-topnav__menu" aria-label="주요 메뉴">${menu.map((t, i) => topItem(t, i === cur)).join('')}</nav></div>
  <div class="ds-topnav__end">${end}</div>
</header></div>`;

const sideItem = ([t, ic, cur]) => `<a class="ds-sidenav__item" href="#"${cur ? ' aria-current="page"' : ''}><span class="ds-sidenav__prefix">${icon(ic)}</span><span class="ds-sidenav__label">${t}</span></a>`;
// groups: [[묶음 이름 | '', [[메뉴, 아이콘, 지금?], ...]], ...]
export const sidenav = (org, groups, footer = []) => `<nav class="ds-sidenav" aria-label="관리 메뉴">
  <div class="ds-sidenav__header"><div class="tp-org"><span class="tp-org__mark" aria-hidden="true">${esc(org.slice(0, 1))}</span><span class="tp-stack"><span class="tp-h4">${org}</span><span class="tp-caption">기관 관리</span></span></div></div>
  <div class="ds-sidenav__content">${groups.map(([g, items]) => `<div class="ds-sidenav__group">${g ? `<div class="ds-sidenav__group-label">${g}</div>` : ''}${items.map(sideItem).join('')}</div>`).join('')}</div>
  ${footer.length ? `<div class="ds-sidenav__footer">${footer.map(sideItem).join('')}</div>` : ''}
</nav>`;
export const mbar = (title) => `<div class="tp-mbar"><span class="tp-h4">${title}</span><button type="button" class="ds-btn" data-variant="ghost" data-size="small" data-layout="iconOnly" aria-label="메뉴 열기">${icon('menu')}</button></div>`;
export const frame = (nav, title, main) => `<div class="tp-app tp-frame">${nav}<div class="tp-frame__main">${mbar(title)}${main}</div></div>`;

export const selectbox = (name, items, cur = 0, { cols = 0, type = 'radio', vertical = false } = {}) => `<div class="ds-selectbox-group${cols ? ' tp-sb' + cols : ''}">${items.map(([l, d, ic], i) => `<label class="ds-selectbox"${vertical ? ' data-layout="vertical"' : ''}>${ic ? icon(ic) : ''}<span class="ds-selectbox__texts"><span class="ds-selectbox__label">${l}</span>${d ? `<span class="ds-selectbox__desc">${d}</span>` : ''}</span>${type === 'radio' ? `<span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="${name}"${i === cur ? ' checked' : ''}></span>` : `<span class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"${(Array.isArray(cur) ? cur.includes(i) : i === cur) ? ' checked' : ''}></span>`}</label>`).join('')}</div>`;
export const tags = (items, size = '') => `<span class="ds-tag-group"${size ? ` data-size="${size}"` : ''}>${items.map((t) => `<span>${t}</span>`).join('')}</span>`;
// 달력: 그 달 1일의 요일(0=일), 날 수, 고른 날, 오늘, 고를 수 없는 날
export const calendar = (title, { first = 0, days = 30, sel = 0, today = 0, off = [] } = {}) => {
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = i - first + 1;
    if (d < 1 || d > days) { cells.push('<button type="button" class="ds-date-cell" disabled aria-hidden="true"></button>'); continue; }
    const st = d === sel ? ' data-state="selected"' : d === today ? ' data-state="today"' : '';
    cells.push(`<button type="button" class="ds-date-cell"${st}${off.includes(d) || d < today ? ' disabled' : ''}>${d}</button>`);
  }
  return `<div class="ds-datepicker tp-cal"><div class="ds-datepicker__header"><button type="button" class="ds-datepicker__nav" aria-label="이전 달">${icon('chevron-left', 'lg')}</button><strong class="ds-datepicker__title">${title}</strong><button type="button" class="ds-datepicker__nav" aria-label="다음 달">${icon('chevron-right', 'lg')}</button></div><div class="ds-datepicker__weekdays">${'일월화수목금토'.split('').map((w) => `<span>${w}</span>`).join('')}</div><div class="ds-datepicker__grid" role="grid">${cells.join('')}</div></div>`;
};

// 시험·학습 템플릿 생성기 공용 조각. 결과는 site/templates/pages/*.html (손으로 쓴 것과 같은 규칙)
export const COMMON_CSS = `  /* 템플릿 배치 전용. 값은 모두 --ybm-* 토큰 */
  body { word-break: keep-all; overflow-wrap: break-word; }
  .tp-h1 { font-size: var(--ybm-font-size-t10); line-height: var(--ybm-line-height-t10); font-weight: var(--ybm-font-weight-bold); }
  .tp-h2 { font-size: var(--ybm-font-size-t07); line-height: var(--ybm-line-height-t07); font-weight: var(--ybm-font-weight-semibold); }
  .tp-h3 { font-size: var(--ybm-font-size-t05); line-height: 22px; font-weight: var(--ybm-font-weight-semibold); }
  .tp-sub { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral-muted); }
  .tp-caption { font-size: var(--ybm-font-size-t02); line-height: var(--ybm-line-height-t02); color: var(--ybm-color-fg-neutral-subtle); }
  .tp-num { font-variant-numeric: tabular-nums; }
  .tp-ph { display: grid; place-items: center; height: 100%; color: var(--ybm-color-fg-neutral-subtle); }
  .tp-logo { display: grid; place-items: center; width: 88px; height: 28px; border-radius: var(--ybm-shape-xs); background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t03-static); line-height: var(--ybm-line-height-t03-static); font-weight: var(--ybm-font-weight-semibold); }
  .tp-bar { position: sticky; top: 0; z-index: var(--ybm-z-sticky); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-page { background: var(--ybm-color-bg-canvas); }
  .tp-main { display: flex; flex-direction: column; gap: var(--ybm-space-x4); max-width: 1120px; margin-inline: auto; padding: var(--ybm-space-x4) var(--ybm-space-x-global-gutter) calc(var(--ybm-space-x20) + env(safe-area-inset-bottom, 0px)); }
  .tp-box { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x5) var(--ybm-space-x4); border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-weak); }
  .tp-boxhead { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
  .tp-row { display: flex; align-items: center; gap: var(--ybm-space-x3); }
  .tp-between { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); }
  .tp-stack { display: flex; flex-direction: column; gap: var(--ybm-space-x1); min-width: 0; }
  .tp-grid { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x3); }
  .tp-kpis { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x3); }
  .tp-kpi b { display: block; font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); }
  .tp-bars { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-barrow { display: grid; grid-template-columns: 88px 1fr 56px; align-items: center; gap: var(--ybm-space-x3); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-barrow .tp-num { text-align: right; }
  .tp-cta { position: fixed; inset: auto 0 0 0; z-index: var(--ybm-z-sticky); display: flex; gap: var(--ybm-space-x2); padding: var(--ybm-space-x3) var(--ybm-space-x-global-gutter) calc(var(--ybm-space-x3) + env(safe-area-inset-bottom, 0px)); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-cta > .ds-btn { flex: 1 1 auto; }
  .tp-side { position: sticky; top: 0; height: 100vh; }
  .tp-layout { display: block; }
  @media (min-width: 768px) {
    .tp-h1 { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); }
    .tp-main { gap: var(--ybm-space-x6); padding: var(--ybm-space-x10) var(--ybm-space-x8) var(--ybm-space-x16); }
    .tp-box { padding: var(--ybm-space-x6); }
    .tp-kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .tp-cta { position: static; padding: 0; background: none; box-shadow: none; justify-content: flex-end; }
    .tp-cta > .ds-btn { flex: none; }
    .tp-layout { display: grid; grid-template-columns: auto minmax(0, 1fr); }
  }
`;
export const head = (title, css) => `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} - YBM DS 템플릿</title>
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<script src="../../../dist/ybm-ds.js" defer></script>
<style>
${COMMON_CSS}${css || ''}</style>
</head>
<body class="tp-page">
`;
export const icon = (n, size = '') => `<i class="ds-icon ds-icon--${n}${size ? ' ds-icon--' + size : ''}" aria-hidden="true"></i>`;
export const appbar = (title, { back = true, right = '' } = {}) => `<header class="ds-appbar u-hide-from-md tp-bar">
  <div class="ds-appbar__left">${back ? `<button type="button" class="ds-appbar__button" aria-label="뒤로">${icon('chevron-left')}</button>` : `<span class="tp-logo" aria-label="서비스 이름">로고</span>`}</div>
  <div class="ds-appbar__main"><h1 class="ds-appbar__title">${title}</h1></div>
  <div class="ds-appbar__right">${right}</div>
</header>
`;
export const topnav = (menus, current, end = '') => `<header class="ds-topnav u-show-from-md tp-bar">
  <div class="ds-topnav__left">
    <a class="ds-topnav__heading" href="#" aria-label="서비스 이름 홈"><span class="tp-logo">로고</span></a>
    <nav class="ds-topnav__menu" aria-label="주요 메뉴">${menus.map(([l, h]) => `<a class="ds-topnav__item" href="${h}"${l === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
  </div>
  <div class="ds-topnav__end">${end || `<a class="ds-avatar" href="my-exams.html" aria-label="김민수, 내 정보"><span class="ds-avatar__initials" aria-hidden="true">김</span></a>`}</div>
</header>
`;
export const sidenav = (groups, current) => `<div class="tp-side u-show-from-md"><nav class="ds-sidenav" aria-label="관리 메뉴"><div class="ds-sidenav__content">${groups.map(([label, items]) => `<div class="ds-sidenav__group"><div class="ds-sidenav__group-label">${label}</div>${items.map(([l, h, i]) => `<a class="ds-sidenav__item" href="${h}"${l === current ? ' aria-current="page"' : ''}><span class="ds-sidenav__prefix">${icon(i)}</span><span class="ds-sidenav__label">${l}</span></a>`).join('')}</div>`).join('')}</div></nav></div>
`;
export const bottomnav = (items, current) => `<nav class="ds-bottomnav u-hide-from-md" aria-label="주요 메뉴">${items.map(([l, h, i]) => `<a class="ds-bottomnav__item" href="${h}"${l === current ? ' aria-current="page"' : ''}><span class="ds-bottomnav__icon">${icon(i, 'lg')}</span><span class="ds-bottomnav__label">${l}</span></a>`).join('')}</nav>
`;
export const stepper = (steps, cur) => `<ol class="ds-stepper" aria-label="접수 단계">${steps.map((s, i) => `<li class="ds-stepper__step"${i < cur ? ' data-state="complete"' : i === cur ? ' data-state="current" aria-current="step"' : ''}><span class="ds-stepper__indicator"></span><span class="ds-stepper__label">${s}</span></li>`).join('')}</ol>`;
export const badge = (t, tone = 'neutral', solid = false) => `<span class="ds-badge" data-tone="${tone}"${solid ? ' data-variant="solid"' : ''}>${t}</span>`;
export const btn = (label, { variant = 'neutralWeak', size = 'medium', href, fill = false, iconName = '', attrs = '' } = {}) => href ? `<a class="ds-btn" data-variant="${variant}" data-size="${size}"${fill ? ' data-width="fill"' : ''} href="${href}" ${attrs}>${iconName ? icon(iconName) : ''}${label}</a>` : `<button type="button" class="ds-btn" data-variant="${variant}" data-size="${size}"${fill ? ' data-width="fill"' : ''} ${attrs}>${iconName ? icon(iconName) : ''}${label}</button>`;
export const progress = (v, tone = 'brand', small = false) => `<div class="ds-progress" role="progressbar" aria-valuenow="${v}" aria-valuemin="0" aria-valuemax="100" style="--ds-progress-value: ${v}%"${tone !== 'brand' ? ` data-tone="${tone}"` : ''}${small ? ' data-size="small"' : ''}></div>`;
export const bars = (rows, tone = 'brand') => `<div class="tp-bars">${rows.map(([l, v, t]) => `<div class="tp-barrow"><span>${l}</span>${progress(v, tone)}<span class="tp-num">${t ?? v + '%'}</span></div>`).join('')}</div>`;
export const field = (id, label, input, help = '') => `<div class="ds-field"><div class="ds-field__header"><label class="ds-field__label" for="${id}">${label}</label></div>${input}${help ? `<div class="ds-field__footer"><p class="ds-field__help">${help}</p></div>` : ''}</div>`;
export const input = (id, attrs = '') => `<div class="ds-input" data-variant="outline"><input class="ds-input__control" id="${id}" ${attrs}></div>`;
export const table = (cols, rows, opts = {}) => `<div class="ds-table-wrap"><table class="ds-table"${opts.compact ? ' data-density="compact"' : ''}><thead><tr>${cols.map(([c, a]) => `<th scope="col"${a ? ` data-align="${a}"` : ''}>${c}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr${opts.interactive ? ' data-interactive' : ''}>${r.map((c, i) => `<td${cols[i][1] ? ` data-align="${cols[i][1]}"` : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const thumb = (cls = '', ratio = '') => `<div class="ds-imageframe ${cls}"${ratio ? ` data-ratio="${ratio}"` : ''} data-stroke aria-hidden="true"><span class="tp-ph">${icon('image')}</span></div>`;
export const accordion = (items, variant = 'inline') => items.map(([t, d, open], i) => `<details class="ds-accordion"${variant === 'separated' ? ' data-variant="separated"' : ''}${open ? ' open' : ''}><summary class="ds-accordion__trigger"><span class="ds-accordion__body"><span class="ds-accordion__title">${t}</span></span></summary><div class="ds-accordion__content">${d}</div></details>`).join('');
export const selectbox = (name, items, { cols = 1, radio = true } = {}) => `<div class="ds-selectbox-group" style="--ds-selectbox-columns: ${cols}">${items.map(([l, d, on]) => `<label class="ds-selectbox"><span class="ds-selectbox__texts"><span class="ds-selectbox__label">${l}</span>${d ? `<span class="ds-selectbox__desc">${d}</span>` : ''}</span><span class="ds-${radio ? 'radio' : 'checkbox'}" data-tone="neutral" data-size="medium"><input type="${radio ? 'radio' : 'checkbox'}" class="ds-${radio ? 'radio' : 'checkbox'}__control" name="${name}"${on ? ' checked' : ''}></span></label>`).join('')}</div>`;
export const EXAM_MENUS = [['시험 접수', 'exam-schedule.html'], ['접수 확인', 'my-exams.html'], ['성적 확인', 'exam-score.html'], ['고사장 안내', '#'], ['고객센터', 'help-center.html']];
export const EXAM_TABS = [['홈', 'exam-home.html', 'house'], ['접수', 'exam-schedule.html', 'calendar'], ['성적', 'exam-score.html', 'file-text'], ['마이', 'my-exams.html', 'id-card']];
export const LEARN_MENUS = [['강좌', 'course-catalog.html'], ['내 학습', 'my-learning.html'], ['레벨 테스트', 'level-test.html'], ['시험 접수', 'exam-home.html'], ['고객센터', 'help-center.html']];
export const LEARN_TABS = [['홈', 'my-learning.html', 'house'], ['강좌', 'course-catalog.html', 'search'], ['내 학습', 'my-learning.html', 'file-text'], ['마이', 'mypage.html', 'id-card']];
export const B2B_EXAM_NAV = [['시험', [['대시보드', 'exam-b2b-dashboard.html', 'house'], ['단체 접수', 'group-registration.html', 'upload'], ['응시자 관리', 'exam-b2b-dashboard.html#people', 'id-card'], ['성적 조회', '#', 'file-text']]], ['회사', [['정산', '#', 'credit-card'], ['설정', 'settings.html', 'menu']]]];
export const B2B_LEARN_NAV = [['교육', [['대시보드', 'learning-admin.html', 'house'], ['과정 관리', '#', 'file-text'], ['임직원 배정', 'learning-admin.html#assign', 'id-card'], ['성과 리포트', 'learning-admin.html#report', 'sparkles']]], ['회사', [['시험 연계', 'exam-b2b-dashboard.html', 'calendar'], ['설정', 'settings.html', 'menu']]]];
export const FOOT = `</body>\n</html>\n`;

import * as K from './kit.mjs';
const { icon, btn, iconBtn, search, dot, avatar, esc } = K;

// 앱 틀 3종: 내비게이션만 진짜로 그리고, 본문은 회색 자리(skeleton)로 비워 둔다
const CSS = `
  .tp-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: var(--ybm-color-bg-layer-default); }
  .tp-shell__row { display: flex; flex: 1 1 auto; min-height: 0; }
  .tp-shell__main { flex: 1 1 auto; min-width: 0; overflow: auto; padding: var(--ybm-space-x6) var(--ybm-space-x4); background: var(--ybm-color-bg-neutral-subtle); }
  @media (min-width: 768px) { .tp-shell__main { padding: var(--ybm-space-x6); } }
  .tp-block { border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); }
  .tp-block--dash { background: var(--ybm-color-bg-layer-default); }
  .tp-skel { display: flex; flex-direction: column; gap: var(--ybm-space-x4); }
  .tp-skel__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4); }
  @media (min-width: 1024px) { .tp-skel__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-rail { display: none; flex: none; flex-direction: column; gap: var(--ybm-space-x1); width: 260px; padding: var(--ybm-space-x3); overflow: auto; box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-rail { display: flex; } }
  .tp-resize { display: none; width: 6px; flex: none; cursor: col-resize; place-items: center; }
  .tp-resize::after { content: ""; width: 3px; height: 28px; border-radius: 2px; background: var(--ybm-color-stroke-neutral-weak); }
  @media (min-width: 768px) { .tp-resize { display: grid; } }
  .tp-nitem { display: flex; align-items: center; gap: var(--ybm-space-x2); min-height: 36px; padding: 0 var(--ybm-space-x2); border-radius: var(--ybm-shape-sm); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t04); text-decoration: none; }
  .tp-nitem:hover { background: var(--ybm-color-bg-transparent-pressed); }
  .tp-nitem[aria-current="page"] { background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral); font-weight: var(--ybm-font-weight-semibold); }
  .tp-nitem .tp-grow { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-ngroup { padding: var(--ybm-space-x3) var(--ybm-space-x2) var(--ybm-space-x1); font-size: var(--ybm-font-size-t02); color: var(--ybm-color-fg-neutral-subtle); }
`;
const skel = (n = 4) => `<div class="tp-skel" aria-label="본문 자리"><div class="tp-block tp-block--dash" style="height: 120px"></div><div class="tp-skel__grid">${Array.from({ length: n }, () => '<div class="tp-block tp-block--dash" style="height: 140px"></div>').join('')}</div><div class="tp-block tp-block--dash" style="height: 280px"></div></div>`;
const nitem = (t, ic = '', cur = false, end = '') => `<a class="tp-nitem" href="#"${cur ? ' aria-current="page"' : ''}>${ic ? icon(ic, 'sm') : ''}<span class="tp-grow">${t}</span>${end}</a>`;

/* 1. 메뉴 막대 + 트리 레일 -------------------------------------- */
const shellNav = () => {
  const css = CSS + `
  .tp-menubar { display: flex; align-items: center; gap: var(--ybm-space-x1); min-height: 52px; padding: var(--ybm-space-x2) var(--ybm-space-x3); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); overflow-x: auto; }
  .tp-menubar .tp-q { width: min(360px, 40vw); margin-left: auto; }
  .tp-tree2 { list-style: none; margin: 0; padding: 0; font-size: var(--ybm-font-size-t03); }
  .tp-tree2 li > span { display: flex; align-items: center; gap: var(--ybm-space-x1_5); min-height: 28px; padding-left: calc(var(--d) * 16px + 4px); border-radius: var(--ybm-shape-xs); color: var(--ybm-color-fg-neutral-muted); }
  .tp-tree2 li > span[aria-selected="true"] { background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral); }
  .tp-tree2 .ds-icon { --ds-icon-size: 16px; }
`;
  const tr = [[0, 'f', 'src', 1], [1, 'f', 'pages', 1], [2, 'file-code', '홈.tsx'], [2, 'file-code', '강좌.tsx', 0, 1], [2, 'file-code', '설정.tsx'], [1, 'f', 'components', 0], [1, 'f', 'styles', 0], [0, 'f', 'public', 0], [0, 'file', 'package.json'], [0, 'file-text', 'README.md']];
  const body = `<div class="tp-shell">
<a class="tp-sr" href="#main">본문으로 건너뛰기</a>
<header role="banner"><nav class="tp-menubar" aria-label="메뉴 막대">${K.even(`${K.logo()}${['파일', '편집', '보기', '실행', '도움말'].map((t) => btn(t, { variant: 'ghost' })).join('')}<div class="tp-q">${search('cmd', '파일과 명령 찾기…  ⌘K', 'small')}</div>${iconBtn('play', '프로젝트 실행', { variant: 'neutralWeak' })}${avatar('김서윤', 24)}`)}</nav></header>
<div class="tp-shell__row">
  <aside class="tp-rail" aria-label="옆 메뉴"><ul class="tp-tree2" role="tree">${tr.map(([d, k, n, o, s]) => `<li role="treeitem"><span style="--d:${d}"${s ? ' aria-selected="true"' : ''}>${k === 'f' ? icon(o ? 'chevron-down' : 'chevron-right', 'sm') + icon(o ? 'folder-open' : 'folder', 'sm') : '<span style="width:16px"></span>' + icon(k, 'sm')}${n}</span></li>`).join('')}</ul></aside>
  <div class="tp-resize" role="separator" aria-label="옆 메뉴 크기 조절"></div>
  <main class="tp-shell__main" id="main">${skel()}</main>
</div>
</div>`;
  return { slug: 'shell-nav', en: 'Shell Nav', name: '앱 틀 (위 메뉴 + 옆 트리)', group: 'Shell', desc: '위쪽 메뉴 막대와 왼쪽 폴더 목록을 함께 쓰는 앱 기본 틀입니다. 위에서 명령을 찾고, 왼쪽 목록은 크기를 바꿀 수 있습니다.', css, body };
};

/* 2. 옆 메뉴만 -------------------------------------------------- */
const sideNav = () => {
  const css = CSS + `
  .tp-rail { width: 280px; }
  .tp-rail__head { display: flex; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x2); font-weight: var(--ybm-font-weight-semibold); }
  .tp-rail__foot { margin-top: auto; display: flex; flex-direction: column; gap: var(--ybm-space-x1); padding-top: var(--ybm-space-x3); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-ws > summary { list-style: none; cursor: pointer; }
  .tp-ws > summary::-webkit-details-marker { display: none; }
  .tp-ws .tp-nitem { padding-left: var(--ybm-space-x8); }
  .tp-shell__main { display: flex; flex-direction: column; gap: var(--ybm-space-x4); }
  .tp-footbox { height: 96px; }
`;
  const ws = [['주말 여행 계획', ['숙소 비교', '일정 짜기'], 1], ['영어 회화 공부', ['오늘의 표현', '모의 인터뷰'], 0], ['회사 보고서', ['3분기 요약'], 0]];
  const body = `<div class="tp-shell">
<a class="tp-sr" href="#main">본문으로 건너뛰기</a>
<div class="tp-shell__row">
  <aside class="tp-rail" aria-label="옆 메뉴">
    <a class="tp-rail__head" href="#">${icon('sparkles')}AI 도우미</a>
    <span class="tp-ngroup">메뉴</span>${nitem('새 대화', 'square-pen', true)}${nitem('찾기', 'search')}${nitem('자료실', 'book-open')}${nitem('즐겨찾기', 'star')}
    ${K.divider()}
    <span class="tp-ngroup">작업 공간</span>${ws.map(([t, items, open]) => `<details class="tp-ws"${open ? ' open' : ''}><summary class="tp-nitem">${icon(open ? 'chevron-down' : 'chevron-right', 'sm')}${icon('folder', 'sm')}<span class="tp-grow">${t}</span></summary>${items.map((x, i) => nitem(x, '', false, i === 0 && open ? dot('positive', '진행 중') : '')).join('')}</details>`).join('')}
    <div class="tp-rail__foot"><span class="tp-ngroup">계정</span>${nitem('설정', 'settings')}<a class="tp-nitem" href="#">${avatar('김서윤', 20)}<span class="tp-grow">김서윤</span></a>${btn('옆 메뉴 접기', { variant: 'ghost', ic: 'panel-left', size: 'small' })}</div>
  </aside>
  <div class="tp-resize" role="separator" aria-label="옆 메뉴 크기 조절"></div>
  <main class="tp-shell__main" id="main">${skel()}<div class="tp-block tp-footbox" aria-label="아래 입력 자리"></div></main>
</div>
</div>`;
  return { slug: 'shell-side-nav', en: 'Side Nav', name: '앱 틀 (옆 메뉴)', group: 'Shell', desc: '왼쪽 메뉴 하나로 이동하는 앱 기본 틀입니다. 메뉴는 접거나 크기를 바꿀 수 있고, 기록 묶음과 찾기를 담습니다.', css, body };
};

/* 3. 위 메뉴만 (메가 메뉴) -------------------------------------- */
const topNav = () => {
  const css = CSS + `
  .tp-topbar { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: var(--ybm-space-x4); min-height: 64px; padding: 0 var(--ybm-space-x4); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-topbar { padding: 0 var(--ybm-space-x6); } }
  .tp-topbar__menu { display: none; justify-content: center; gap: var(--ybm-space-x1); }
  @media (min-width: 768px) { .tp-topbar__menu { display: flex; } }
  .tp-mega-btn { display: inline-flex; align-items: center; gap: var(--ybm-space-x1); height: 40px; padding: 0 var(--ybm-space-x3); border: 0; border-radius: var(--ybm-shape-sm); background: none; color: var(--ybm-color-fg-neutral); font: inherit; font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-medium); cursor: pointer; text-decoration: none; }
  .tp-mega-btn[aria-expanded="true"] { background: var(--ybm-color-bg-neutral); }
  .tp-mega { position: absolute; left: 0; right: 0; top: 64px; z-index: var(--ybm-z-overlay); display: none; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ybm-space-x6); padding: var(--ybm-space-x6) var(--ybm-space-x6) var(--ybm-space-x8); background: var(--ybm-color-bg-layer-floating); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted), 0 12px 24px rgb(0 0 0 / .08); }
  @media (min-width: 768px) { .tp-mega { display: grid; } }
  .tp-mega h3 { margin-bottom: var(--ybm-space-x2); }
  .tp-mega ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--ybm-space-x1_5); font-size: var(--ybm-font-size-t04); color: var(--ybm-color-fg-neutral-muted); }
  .tp-shell__main { position: relative; }
  .tp-shell__main::before { content: ""; position: absolute; inset: 0; background: var(--ybm-color-bg-overlay); opacity: .35; }
  @media (max-width: 767.98px) { .tp-shell__main::before { display: none; } }
  .tp-g6s { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4); }
  @media (min-width: 1024px) { .tp-g6s { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
`;
  const mega = [['아우터', ['코트', '재킷', '패딩', '카디건']], ['상의', ['니트', '셔츠', '맨투맨', '티셔츠']], ['하의', ['청바지', '슬랙스', '스커트', '반바지']], ['추천', ['이번 주 새 상품', '많이 팔린 상품', '선물하기 좋은']]];
  const body = `<div class="tp-shell">
<a class="tp-sr" href="#main">본문으로 건너뛰기</a>
<header role="banner" style="position: relative">
  <nav class="tp-topbar" aria-label="쇼핑몰 메뉴">${K.logo()}<div class="tp-topbar__menu"><button type="button" class="tp-mega-btn" aria-expanded="true">쇼핑${icon('chevron-down', 'sm')}</button><button type="button" class="tp-mega-btn" aria-expanded="false">브랜드${icon('chevron-down', 'sm')}</button><a class="tp-mega-btn" href="#">세일</a><a class="tp-mega-btn" href="#">고객센터</a></div><div class="tp-row">${iconBtn('search', '상품 찾기')}${iconBtn('heart', '찜')}${iconBtn('shopping-cart', '장바구니')}${iconBtn('menu', '전체 메뉴').replace('class="ds-btn"', 'class="ds-btn u-hide-from-md"')}</div></nav>
  <div class="tp-mega" aria-label="쇼핑 메뉴">${mega.map(([t, items]) => `<div><h3 class="tp-h4">${t}</h3><ul>${items.map((x) => `<li><a class="ds-link" href="#" style="color:inherit;text-decoration:none">${x}</a></li>`).join('')}</ul></div>`).join('')}</div>
</header>
<main class="tp-shell__main" id="main"><div class="tp-skel"><div class="tp-block tp-block--dash" style="height: 280px"></div><div class="tp-g6s">${Array.from({ length: 6 }, () => '<div class="tp-block tp-block--dash" style="height: 200px"></div>').join('')}</div><div class="tp-block tp-block--dash" style="height: 200px"></div></div></main>
</div>`;
  return { slug: 'shell-top-nav', en: 'Top Nav', name: '앱 틀 (위 메뉴)', group: 'Shell', desc: '위쪽 메뉴만 있는 앱 기본 틀입니다. 메뉴를 누르면 전체 폭 메뉴가 열리고, 본문은 화면 폭을 모두 씁니다.', css, body };
};

export const templates = [shellNav, sideNav, topNav].map((f) => f());

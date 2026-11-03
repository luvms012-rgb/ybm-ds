// 마이페이지 템플릿(My Page): 마이페이지 홈, 주문 내역, 내 정보.
// 사내 UI 패턴 모음 '마이페이지' 화면의 공통 구조만 따른다(왼쪽 묶음 메뉴, 프로필 요약과 혜택 숫자, 주문 단계, 설정 행). 서비스 이름, 글, 로고는 넣지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, secHead, select, chiptabs, segmented, avatar, link, thumb, pagination, sw, esc } = K;

const MENU = ['홈', '카테고리', '혜택', '마이페이지'];
const END = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('shopping-cart', '장바구니', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const NAV = [
  ['쇼핑', [['주문 내역', 'list'], ['취소, 반품 내역', 'rotate-ccw'], ['찜한 상품', 'heart'], ['최근 본 상품', 'eye']]],
  ['혜택', [['쿠폰', 'tag'], ['포인트', 'star-solid']]],
  ['내 정보', [['내 정보', 'user'], ['배송지', 'map-pin'], ['알림 설정', 'bell']]],
];
const NAV_FLAT = NAV.flatMap(([, items]) => items.map(([t]) => t));

const CSS = FRAME_CSS + `
  /* 마이페이지 배치: 모바일 1열 + 위 칩 메뉴, 1024 부터 왼쪽 메뉴 200 | 본문 (커뮤니티와 같은 칸, 여백) */
  .tp-mp { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); box-sizing: border-box; width: min(100%, 1200px); margin-inline: auto; padding: var(--ds-space-x5) var(--ds-space-x4) var(--ds-space-x12); }
  .tp-mp__main { display: flex; flex-direction: column; gap: var(--ds-space-x10); min-width: 0; }
  .tp-mp__nav { display: none; }
  .tp-mp__chips { overflow-x: auto; scrollbar-width: none; }
  @media (min-width: 768px) { .tp-mp { padding: var(--ds-space-x8) var(--ds-space-x6) var(--ds-space-x16); } }
  @media (min-width: 1024px) {
    .tp-mp { grid-template-columns: 200px minmax(0, 1fr); gap: var(--ds-space-x10); }
    .tp-mp__nav { display: flex; flex-direction: column; gap: var(--ds-space-x4); position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); align-self: start; }
    .tp-mp__chips { display: none; }
  }
  .tp-mp__nav .ds-sidenav { width: auto; height: auto; background: none; }
  .tp-mp__nav .ds-sidenav__content { padding: 0; }
  /* 표 위 도구 줄: 좁은 화면에서는 고르기 칸과 찾기 칸이 남은 폭을 나눠 쓴다 */
  @media (max-width: 767px) { .tp-mp .tp-ttools > .tp-row { width: 100%; } .tp-mp .tp-ttools > .tp-row > :is(.ds-select, .ds-input) { flex: 1 1 140px; } }
  .tp-mp-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); }
  /* 프로필 요약 */
  .tp-prof { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x4); }
  .tp-prof__who { display: flex; align-items: center; gap: var(--ds-space-x3); min-width: 0; }
  .tp-stat-link { color: inherit; text-decoration: none; }
  /* 주문 단계: 옅은 바탕 한 장 위에 숫자 5칸, 768 부터 사이 꺾쇠 */
  .tp-flow { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); padding: var(--ds-space-x5) var(--ds-space-x2); border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-flow > a { position: relative; display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x1); color: var(--ds-color-fg-neutral-subtle); text-align: center; text-decoration: none; font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); }
  .tp-flow > a[data-on] { color: var(--ds-color-fg-neutral); }
  .tp-flow .tp-mid { color: inherit; }
  .tp-flow__arrow { display: none; }
  @media (min-width: 768px) { .tp-flow__arrow { display: block; position: absolute; left: 0; top: 50%; translate: -50% -50%; --ds-icon-size: 16px; color: var(--ds-color-fg-neutral-subtle); } }
  /* 주문 상품 한 줄 */
  .tp-oitem { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--ds-space-x3) var(--ds-space-x4); align-items: center; }
  .tp-oitem__acts { grid-column: 1 / -1; display: flex; gap: var(--ds-space-x2); }
  .tp-oitem__acts > .ds-btn { flex: 1 1 0; }
  @media (min-width: 768px) {
    .tp-oitem { grid-template-columns: 80px minmax(0, 1fr) 128px; }
    .tp-oitem__acts { grid-column: auto; flex-direction: column; }
  }
  .tp-ostate { font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); font-weight: var(--ds-font-weight-semibold); color: var(--ds-color-fg-neutral); }
  .tp-ostate[data-tone="brand"] { color: var(--ds-color-fg-brand); }
  .tp-ostate[data-tone="muted"] { color: var(--ds-color-fg-neutral-subtle); }
  /* 주문 묶음: 위 날짜와 주문 번호, 아래 상품 줄 (줄 사이 선은 줄 자체에) */
  .tp-order { display: flex; flex-direction: column; }
  .tp-order__head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding-bottom: var(--ds-space-x3); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-order .tp-rows > * { padding-block: var(--ds-space-x4); }
  /* 찜한 상품 */
  .tp-wish { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-wish { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-wish a { display: flex; flex-direction: column; gap: var(--ds-space-x2); color: inherit; text-decoration: none; }
  /* 설정 행: 왼쪽 이름과 설명, 오른쪽 값과 동작 */
  .tp-setrow { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x2) var(--ds-space-x4); }
  .tp-setrow__end { display: flex; align-items: center; gap: var(--ds-space-x3); min-width: 0; }
  .tp-setrow__val { font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); color: var(--ds-color-fg-neutral); font-variant-numeric: tabular-nums; }
  .tp-addr { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-leave { align-self: flex-start; color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); }
`;

const sideNav = (cur) => `<nav class="ds-sidenav" aria-label="마이페이지 메뉴"><div class="ds-sidenav__content">${NAV.map(([g, items]) => `<div class="ds-sidenav__group"><div class="ds-sidenav__group-label">${g}</div>${items.map(([t, ic]) => `<a class="ds-sidenav__item" href="#"${t === cur ? ' aria-current="page"' : ''}><span class="ds-sidenav__prefix">${icon(ic)}</span><span class="ds-sidenav__label">${t}</span></a>`).join('')}</div>`).join('')}</div></nav>`;
const shell = (cur, main) => `<div class="tp-app">${topbar(MENU, 3, END)}
<div class="tp-mp">
  <aside class="tp-mp__nav" aria-label="마이페이지 메뉴"><h2 class="tp-h2">마이페이지</h2>${sideNav(cur)}</aside>
  <main class="tp-mp__main">
    <div class="tp-mp__chips">${chiptabs(['마이페이지 홈', ...NAV_FLAT], Math.max(0, NAV_FLAT.indexOf(cur) + 1), '마이페이지 메뉴')}</div>
${main}
  </main>
</div></div>`;

const ITEMS = [
  ['product', 0, '무선 이어폰 프로 2세대', '화이트 · 1개', '189,000원', '배송 중', 'brand', ['배송 조회', '문의하기']],
  ['product', 2, '데일리 백팩 18L', '차콜 · 1개', '59,000원', '배송 완료', '', ['리뷰 쓰기', '교환, 반품']],
  ['book', 1, '처음 시작하는 기록 습관', '1권', '16,800원', '구매 확정', 'muted', ['다시 담기']],
  ['product', 4, '스테인리스 텀블러 500ml', '실버 · 2개', '38,000원', '상품 준비 중', '', ['주문 취소']],
];
const oitem = ([th, i, n, opt, price, st, tone, acts]) => `<div class="tp-oitem">${thumb('1:1', '', K.photo(th, i, 240), 'md')}<div class="tp-stack" style="gap: 2px"><span class="tp-ostate"${tone ? ` data-tone="${tone}"` : ''}>${st}</span><span class="tp-h4">${n}</span><span class="tp-num" style="margin-top: var(--ds-space-x1_5); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-bold)">${price}</span><span class="tp-caption">${opt}</span></div><div class="tp-oitem__acts">${acts.map((a) => btn(a)).join('')}</div></div>`;

/* 1. 마이페이지 홈 ------------------------------------------------ */
const home = () => {
  const flow = [['결제 완료', 0], ['상품 준비 중', 1], ['배송 중', 1], ['배송 완료', 3], ['구매 확정', 0]];
  const wish = [['product', 1, '라탄 수납 바구니', '24,900원'], ['product', 3, '세라믹 머그 2개 세트', '18,000원'], ['book', 2, '하루 10분 글쓰기', '14,400원'], ['product', 5, '접이식 캠핑 의자', '42,000원']];
  const body = shell('', `    <section class="tp-sec" aria-label="내 프로필">${card(`<div class="tp-stack" style="gap: var(--ds-space-x5)">
      <div class="tp-prof"><div class="tp-prof__who">${avatar('와이비엠', 56)}<div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-row"><span class="tp-h2">와이비엠 님</span>${badge('일반 회원')}</span><span class="tp-caption">ybm@example.com</span></div></div>${btn('내 정보 수정', { icEnd: 'chevron-right' })}</div>
      <div class="tp-stats" style="--n: 4">${[['포인트', '3,200P'], ['쿠폰', '4장'], ['찜한 상품', '12개'], ['쓸 수 있는 리뷰', '2개']].map(([l, v]) => `<a class="tp-stat-link" href="#"><span class="tp-caption">${l}</span><span class="tp-mid">${v}</span></a>`).join('')}</div>
    </div>`, { size: '' })}</section>
    <section class="tp-sec">${secHead('주문 현황', { sub: '최근 1개월', tools: link('전체 보기') })}
      <div class="tp-flow">${flow.map(([l, n], i) => `<a href="#"${n ? ' data-on' : ''}>${i ? `<i class="ds-icon ds-icon--chevron-right tp-flow__arrow" aria-hidden="true"></i>` : ''}<span class="tp-mid">${T(n)}</span><span>${l}</span></a>`).join('')}</div>
    </section>
    <section class="tp-sec">${secHead('최근 주문', { tools: link('전체 보기') })}
      <div class="tp-rows">${ITEMS.slice(0, 3).map(oitem).join('')}</div>
    </section>
    <section class="tp-sec">${secHead('찜한 상품', { sub: '12개', tools: link('전체 보기') })}
      <div class="tp-wish">${wish.map(([th, i, n, p]) => `<a href="#">${thumb('1:1', '', K.photo(th, i, 400), 'lg')}<span class="tp-stack" style="gap: 2px"><span class="tp-sub" style="color: var(--ds-color-fg-neutral)">${n}</span><span class="tp-h4 tp-num">${p}</span></span></a>`).join('')}</div>
    </section>`);
  return { slug: 'mypage-home', en: 'My Page Home', name: '마이페이지 홈', group: 'My Page', desc: '마이페이지의 첫 화면입니다. 혜택과 주문 현황을 한눈에 봅니다.', css: CSS, body };
};

/* 2. 주문 내역 --------------------------------------------------- */
const orders = () => {
  const groups = [['2026.11.01', '20261101-0042', [ITEMS[0], ITEMS[3]]], ['2026.10.24', '20261024-0918', [ITEMS[1]]], ['2026.10.12', '20261012-1377', [ITEMS[2]]]];
  const body = shell('주문 내역', `    <header class="tp-mp-head"><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">주문 내역</h1><p class="tp-sub">주문한 상품의 배송 상태를 보고 취소, 교환, 반품을 신청할 수 있어요.</p></div></header>
    <div class="tp-stack" style="gap: var(--ds-space-x3)">
      <div class="tp-ttools">${chiptabs(['전체 6', '결제 완료 0', '배송 중 1', '배송 완료 3', '취소, 반품 2'], 0, '주문 상태', { size: 'large' })}<div class="tp-ttools__end">${K.even(segmented(['1개월', '3개월', '6개월', '1년'], 1, '기간') + K.search('od-q', '상품 이름으로 찾기'), true)}</div></div>
    </div>
    <div class="tp-stack" style="gap: var(--ds-space-x10)">${groups.map(([d, no, items]) => `<section class="tp-order" aria-label="${d} 주문"><div class="tp-order__head"><span class="tp-row"><span class="tp-h3 tp-num">${d}</span><span class="tp-caption tp-num">주문 번호 ${no}</span></span>${link('주문 상세')}</div><div class="tp-rows">${items.map(oitem).join('')}</div></section>`).join('')}</div>
    <div class="tp-tfoot">${pagination(1, 3)}</div>`);
  return { slug: 'mypage-orders', en: 'Order History', name: '주문 내역', group: 'My Page', desc: '주문을 날짜별로 모아 보는 내역 화면입니다. 상품마다 다음에 할 일을 바로 처리합니다.', css: CSS, body };
};

/* 3. 내 정보 ----------------------------------------------------- */
const profile = () => {
  const row = (label, desc, end) => `<div class="tp-setrow"><div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-h4">${label}</span>${desc ? `<span class="tp-caption">${desc}</span>` : ''}</div><div class="tp-setrow__end">${end}</div></div>`;
  const val = (v, b = '변경') => `<span class="tp-setrow__val">${v}</span>${btn(b)}`;
  const sec = (title, rows) => `<section class="tp-sec" style="gap: var(--ds-space-x2)"><h2 class="tp-h2">${title}</h2><div class="tp-rows">${rows.join('')}</div></section>`;
  const body = shell('내 정보', `    <header class="tp-mp-head"><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">내 정보</h1><p class="tp-sub">로그인 정보와 연락처, 배송지, 알림을 바꿀 수 있어요.</p></div></header>
    ${sec('로그인 정보', [row('이메일', '로그인과 주문 안내에 써요.', val('ybm@example.com')), row('비밀번호', '마지막으로 바꾼 날 2026.06.14', val('••••••••')), row('간편 로그인', '연결한 계정으로 바로 로그인해요.', `<span class="tp-setrow__val">2개 연결</span>${btn('관리')}`)])}
    ${sec('개인 정보', [row('이름', '', val('와이비엠')), row('휴대폰', '본인 확인과 배송 연락에 써요.', val('010-1234-5678')), row('생년월일', '생일 쿠폰을 보내 드려요.', val('2001.04.12', '입력'))])}
    <section class="tp-sec" style="gap: var(--ds-space-x2)"><div class="tp-between"><h2 class="tp-h2">배송지</h2>${btn('새 배송지', { variant: 'ghost', ic: 'plus' })}</div><div class="tp-rows">
      <div class="tp-addr"><div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-row"><span class="tp-h4">집</span>${badge('기본 배송지', 'brand')}</span><span class="tp-sub">와이비엠 · 010-1234-5678</span><span class="tp-sub">서울시 종로구 종로 104, 3층</span></div><div class="tp-row">${btn('수정')}</div></div>
      <div class="tp-addr"><div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-h4">회사</span><span class="tp-sub">와이비엠 · 010-1234-5678</span><span class="tp-sub">서울시 중구 세종대로 110, 12층</span></div><div class="tp-row">${btn('수정')}${btn('지우기', { variant: 'ghost' })}</div></div>
    </div></section>
    ${sec('알림', [row('주문, 배송 알림', '결제, 출발, 도착을 알려 드려요.', sw('주문, 배송 알림', true)), row('혜택, 이벤트 알림', '받기로 한 날 2026.03.02', sw('혜택, 이벤트 알림', true)), row('이메일 소식', '받지 않기로 한 날 2026.08.11', sw('이메일 소식', false))])}
    <a class="tp-leave" href="#">회원 탈퇴</a>`);
  return { slug: 'mypage-profile', en: 'My Info', name: '내 정보', group: 'My Page', desc: '내 정보와 알림 설정을 보고 수정하는 화면입니다.', css: CSS, body };
};

export const templates = [home, orders, profile].map((f) => f());

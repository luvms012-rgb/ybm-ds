// 쇼핑 템플릿(Commerce): 장바구니, 빈 장바구니.
// 사내 UI 패턴 모음의 '장바구니' 화면(종합몰, 새벽 배송, 리셀 등)에서 공통 구조만 뽑았다. 서비스 이름, 글, 로고는 넣지 않는다.
// 결제 화면은 Form 분류(결제 단계, 결제 폼)에 있다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, secHead, checkbox, checkOnly, tabs, progress, thumb, link, avatar, esc } = K;

const MENU = ['홈', '카테고리', '베스트', '혜택'];
const END = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('heart', '찜한 상품', { size: 'xsmall' })}${iconBtn('shopping-cart', '장바구니', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const won = (n) => T(n.toLocaleString('ko-KR') + '원');

const CSS = FRAME_CSS + `
  /* 쇼핑 배치: 가운데 1200, 1024 부터 상품 | 결제 금액 360 (오른쪽은 따라 내려옴) */
  .tp-shop { box-sizing: border-box; display: flex; flex-direction: column; gap: var(--ybm-space-x6); width: min(100%, 1200px); margin-inline: auto; padding: var(--ybm-space-x6) var(--ybm-space-x4) var(--ybm-space-x16); }
  .tp-shop__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ybm-space-x3) var(--ybm-space-x4); }
  /* 단계 표시: 장바구니 > 주문 결제 > 주문 완료 */
  .tp-steps { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); margin: 0; padding: 0; list-style: none; font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); color: var(--ybm-color-fg-neutral-subtle); }
  .tp-steps li { display: inline-flex; align-items: center; gap: var(--ybm-space-x1_5); }
  .tp-steps li + li::before { content: ''; width: 16px; height: 1px; margin-inline-end: var(--ybm-space-x0_5); background: var(--ybm-color-stroke-neutral-weak); }
  .tp-steps b { display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: var(--ybm-shape-pill); background: var(--ybm-color-bg-neutral-weak-alpha); font-size: var(--ybm-font-size-t01); font-weight: var(--ybm-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .tp-steps [aria-current] { color: var(--ybm-color-fg-neutral); font-weight: var(--ybm-font-weight-semibold); }
  .tp-steps [aria-current] b { background: var(--ybm-color-bg-neutral-solid); color: var(--ybm-color-fg-neutral-inverted); }
  .tp-cart { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x6); }
  .tp-cart__main { display: flex; flex-direction: column; gap: var(--ybm-space-x4); min-width: 0; }
  .tp-cart__aside { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-cart__order { display: none; }
  @media (min-width: 1024px) {
    .tp-cart { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; }
    .tp-cart__aside { position: sticky; top: 88px; }
    .tp-cart__order { display: flex; }
  }
  /* 전체 고르기 줄 */
  .tp-selbar { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); }
  /* 무료 배송까지 남은 금액 */
  /* 무료 배송까지 남은 금액: 상자 없이 금액만 강조, 얇은 막대와 양 끝 금액 (쇼핑몰 장바구니 공통) */
  .tp-freeship { display: flex; flex-direction: column; gap: var(--ybm-space-x2); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral-muted); }
  .tp-freeship__msg { display: flex; align-items: center; gap: var(--ybm-space-x1_5); }
  .tp-freeship__msg .ds-icon { --ds-icon-size: 16px; color: var(--ybm-color-fg-brand); }
  .tp-freeship b { font-weight: var(--ybm-font-weight-bold); color: var(--ybm-color-fg-brand); }
  .tp-freeship__ends { display: flex; justify-content: space-between; font-size: var(--ybm-font-size-t02); line-height: var(--ybm-line-height-t02); color: var(--ybm-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  /* 배송 묶음과 상품 줄 */
  .tp-grp.ds-card { gap: 0; }
  .tp-grp__head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); padding-bottom: var(--ybm-space-x3); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-grp__head .tp-row { flex-wrap: wrap; }
  .tp-item { display: grid; grid-template-columns: auto 72px minmax(0, 1fr) auto; grid-template-areas: "chk img info del" "chk ctl ctl ctl"; align-items: start; gap: var(--ybm-space-x3); padding-block: var(--ybm-space-x4); }
  .tp-item + .tp-item { box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-item:last-child { padding-bottom: 0; }
  .tp-item__chk { grid-area: chk; padding-top: 2px; }
  .tp-item__img { grid-area: img; }
  .tp-item__info { grid-area: info; display: flex; flex-direction: column; gap: var(--ybm-space-x1); min-width: 0; }
  .tp-item__name { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral); text-decoration: none; }
  .tp-item__opt { font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); color: var(--ybm-color-fg-neutral-subtle); }
  .tp-item__del { grid-area: del; margin-top: -6px; }
  .tp-item__ctl { grid-area: ctl; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); }
  .tp-item__info > .ds-btn { align-self: flex-start; margin-top: var(--ybm-space-x1); }
  .tp-selbar .ds-checkbox { white-space: nowrap; }
  .tp-only-md { display: none; }
  .tp-price { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
  .tp-price__was { font-size: var(--ybm-font-size-t02); line-height: var(--ybm-line-height-t02); color: var(--ybm-color-fg-neutral-subtle); text-decoration: line-through; }
  .tp-price__now { display: flex; align-items: baseline; gap: var(--ybm-space-x1); font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); font-weight: var(--ybm-font-weight-bold); }
  .tp-off { color: var(--ybm-color-fg-critical); }
  .tp-item[data-soldout] :is(.tp-item__img, .tp-item__name, .tp-price) { opacity: 0.4; }
  @media (min-width: 768px) {
    .tp-item { grid-template-columns: auto 88px minmax(0, 1fr) auto auto; grid-template-areas: "chk img info ctl del"; align-items: center; column-gap: var(--ybm-space-x4); }
    .tp-item__chk { align-self: center; padding-top: 0; }
    .tp-item__del { margin-top: 0; }
    .tp-item__ctl { gap: var(--ybm-space-x6); }
    .tp-price { min-width: 140px; }
    .tp-only-md { display: inline-flex; }
  }
  /* 결제 예정 금액 */
  .tp-sum { display: flex; flex-direction: column; gap: var(--ybm-space-x3); margin: 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-sum > div { display: flex; align-items: baseline; justify-content: space-between; gap: var(--ybm-space-x3); }
  .tp-sum dt { color: var(--ybm-color-fg-neutral-muted); }
  .tp-sum dd { margin: 0; text-align: end; }
  .tp-sum__total { margin-top: var(--ybm-space-x1); padding-top: var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-sum__total dt { color: var(--ybm-color-fg-neutral); font-weight: var(--ybm-font-weight-semibold); }
  .tp-sum__total dd { font-size: var(--ybm-font-size-t08); line-height: var(--ybm-line-height-t08); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  .tp-tip { display: flex; align-items: flex-start; gap: var(--ybm-space-x2); padding: var(--ybm-space-x3); border-radius: var(--ybm-shape-md); background: var(--ybm-color-bg-neutral-weak-alpha); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); color: var(--ybm-color-fg-neutral-muted); }
  .tp-tip .ds-icon { flex: none; margin-top: 2px; --ds-icon-size: 16px; }
  .tp-cart__order.ds-btn { width: 100%; }
  /* 모바일 아래 고정 주문 막대 (1024 부터는 오른쪽 결제 금액의 버튼을 쓴다) */
  .tp-orderbar { position: sticky; bottom: 0; z-index: var(--ybm-z-sticky); display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); padding: var(--ybm-space-x3) var(--ybm-space-x4); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-orderbar .tp-stack { gap: 0; }
  .tp-orderbar b { font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); font-weight: var(--ybm-font-weight-bold); }
  @media (min-width: 1024px) { .tp-orderbar { display: none; } }
  /* 안내 글 */
  .tp-notes { display: flex; flex-direction: column; gap: var(--ybm-space-x1_5); margin: 0; padding-inline-start: var(--ybm-space-x5); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); }
  /* 추천 상품 */
  .tp-recs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x6) var(--ybm-space-x4); }
  @media (min-width: 768px) { .tp-recs { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-rec { display: flex; flex-direction: column; gap: var(--ybm-space-x2); min-width: 0; }
  .tp-rec__name { display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); color: var(--ybm-color-fg-neutral); text-decoration: none; }
  /* 할인 없는 상품도 가격 줄 높이를 같게, 담기 버튼은 카드 맨 아래 한 줄로 */
  .tp-rec .tp-price { min-height: 46px; justify-content: flex-end; }
  .tp-rec .ds-btn { margin-top: auto; }
`;

const steps = (cur) => `<ol class="tp-steps" aria-label="주문 단계">${['장바구니', '주문 결제', '주문 완료'].map((t, i) => `<li${i === cur ? ' aria-current="step"' : ''}><b>${i + 1}</b>${t}</li>`).join('')}</ol>`;
const qty = (n, name, off = false) => `<div class="ds-quantity" data-size="small"><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 줄이기"${n <= 1 || off ? ' disabled' : ''}>${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="${n}" aria-label="${esc(name)} 수량"${off ? ' disabled' : ''}><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 늘리기"${off ? ' disabled' : ''}>${icon('plus')}</button></div>`;
const price = (now, was, n) => `<div class="tp-price">${was ? `<span class="tp-price__was tp-num">${(was * n).toLocaleString('ko-KR')}원</span>` : ''}<span class="tp-price__now">${was ? `<span class="tp-off tp-num">${Math.round((1 - now / was) * 100)}%</span>` : ''}${won(now * n)}</span></div>`;
const item = ([name, opt, img, now, was, n, soldout]) => `<div class="tp-item"${soldout ? ' data-soldout' : ''}>
  <span class="tp-item__chk">${checkOnly(name + ' 고르기', !soldout)}</span>
  <a class="tp-item__img" href="#" tabindex="-1">${thumb('1:1', '', K.photo('product', img, 240), 'md')}</a>
  <div class="tp-item__info"><a class="tp-item__name" href="#">${name}</a><span class="tp-item__opt">${opt}</span>${soldout ? `<span>${badge('품절', 'critical')}</span>` : btn('옵션 바꾸기', { variant: 'neutralOutline', size: 'xsmall' })}</div>
  <div class="tp-item__ctl">${qty(n, name, soldout)}${price(now, was, n)}</div>
  <span class="tp-item__del">${iconBtn('x', name + ' 빼기', { size: 'xsmall' })}</span>
</div>`;
const rec = ([name, img, now, was]) => `<article class="tp-rec"><a href="#" tabindex="-1">${thumb('1:1', '', K.photo('product', img, 480), 'lg')}</a><a class="tp-rec__name" href="#">${name}</a>${price(now, was, 1).replace('class="tp-price"', 'class="tp-price" style="align-items:flex-start"')}${btn('담기', { variant: 'neutralWeak', ic: 'shopping-cart', fill: true })}</article>`;
const RECS = [['가벼운 러닝화', 3, 79000, 99000], ['즉석 카메라 필름 20장', 2, 24000, 0], ['원두 커피 200g', 5, 16900, 18900], ['가죽 시계줄 20mm', 0, 19800, 0]];
const NOTES = ['장바구니에 담은 상품은 30일 동안 보관해요.', '쿠폰과 적립금은 주문 결제 단계에서 쓸 수 있어요.', '상품 가격과 할인은 바뀔 수 있어서, 결제할 때의 금액으로 주문돼요.'];

/* 1. 장바구니 ---------------------------------------------------- */
const cart = () => {
  const groups = [
    ['빠른 배송', badge('내일 도착', 'positive'), '무료 배송', [['노이즈 캔슬링 무선 헤드폰', '블랙 / 1개', 1, 189000, 239000, 1], ['즉석 카메라', '화이트 / 1개', 2, 129000, 0, 1]]],
    ['한빛 상회', badge('판매자 배송'), '무료 배송', [['클래식 가죽 손목시계', '브라운 / 38mm', 0, 89000, 119000, 1], ['편광 선글라스', '블랙 / 기본', 4, 45000, 0, 1, true]]],
    ['아침 로스터리', badge('판매자 배송'), '배송비 3,000원', [['원두 커피 드립백 20개입', '고소한 맛 / 20개입', 5, 12900, 14900, 2]]],
  ];
  const n = groups.reduce((a, g) => a + g[3].length, 0);
  const on = groups.reduce((a, g) => a + g[3].filter((r) => !r[6]).length, 0);
  const body = `<div class="tp-app">${topbar(MENU, -1, END)}
<main class="tp-shop" aria-label="장바구니">
  <header class="tp-shop__head"><h1 class="tp-h1">장바구니</h1>${steps(0)}</header>
  ${tabs([`일반 배송 ${n}`, '정기 배송 0'], 0, '배송 종류')}
  <div class="tp-cart">
    <div class="tp-cart__main">
      <div class="tp-selbar">${checkbox(`전체 고르기 ${T(on + '/' + n)}`, { checked: true })}<div class="tp-row">${btn('품절 상품 빼기', { variant: 'ghost', attrs: 'class="tp-only-md"' }).replace('class="ds-btn" ', 'class="ds-btn tp-only-md" ').replace(' class="tp-only-md"', '')}${btn('고른 상품 빼기', { variant: 'neutralOutline' })}</div></div>
      <div class="tp-freeship"><span class="tp-freeship__msg">${icon('truck')}아침 로스터리 상품을 <b>${won(4200)}</b> 더 담으면 <b>무료 배송</b>이에요.</span>${progress(86, { label: '무료 배송까지' })}<span class="tp-freeship__ends"><span>0원</span><span>30,000원</span></span></div>
      ${groups.map(([seller, tag, ship, rows]) => card(`<div class="tp-grp__head"><span class="tp-row">${checkOnly(seller + ' 상품 모두 고르기', true)}<h2 class="tp-h4">${seller}</h2>${tag}</span><span class="tp-caption">${ship}</span></div>${rows.map(item).join('')}`, { cls: 'tp-grp', attrs: `aria-label="${esc(seller)}"` })).join('')}
      <ul class="tp-notes">${NOTES.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
    <aside class="tp-cart__aside" aria-label="결제 예정 금액">
      ${card(`<h2 class="tp-h3">결제 예정 금액</h2><dl class="tp-sum"><div><dt>상품 금액</dt><dd>${won(516800)}</dd></div><div><dt>할인 금액</dt><dd class="tp-off">-${won(84000)}</dd></div><div><dt>배송비</dt><dd>${won(3000)}</dd></div><div class="tp-sum__total"><dt>결제 예정 금액</dt><dd>${won(435800)}</dd></div></dl><p class="tp-tip">${icon('tag')}<span>쿠폰을 쓰면 최대 ${won(12000)} 더 아낄 수 있어요. 주문 결제 단계에서 골라 주세요.</span></p>`, { size: 'medium' })}
      ${btn(`${won(435800)} 주문하기`, { variant: 'brandSolid', size: 'large' }).replace('class="ds-btn"', 'class="ds-btn tp-cart__order"')}
    </aside>
  </div>
  <section class="tp-sec" aria-labelledby="recs">${secHead('함께 사면 좋은 상품', { id: 'recs', cls: 'tp-h2' })}<div class="tp-recs">${RECS.map(rec).join('')}</div></section>
</main>
<div class="tp-orderbar"><div class="tp-stack"><span class="tp-caption">상품 ${T('5')}개</span><b>${won(435800)}</b></div>${btn('주문하기', { variant: 'brandSolid', size: 'large' })}</div>
</div>`;
  return { slug: 'cart', en: 'Cart', name: '장바구니', group: 'Commerce', desc: '담은 상품을 확인하고 수량과 옵션을 바꾸는 장바구니입니다. 결제 예정 금액을 보며 바로 주문합니다.', css: CSS, body };
};

/* 2. 빈 장바구니 ------------------------------------------------- */
const cartEmpty = () => {
  const css = CSS + `
  .tp-cart-empty { padding-block: var(--ybm-space-x12); border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-neutral-weak-alpha); }
`;
  const body = `<div class="tp-app">${topbar(MENU, -1, END)}
<main class="tp-shop" aria-label="장바구니">
  <header class="tp-shop__head"><h1 class="tp-h1">장바구니</h1>${steps(0)}</header>
  ${tabs(['일반 배송 0', '정기 배송 0'], 0, '배송 종류')}
  <div class="tp-cart-empty">${K.empty('장바구니가 비어 있어요', '마음에 드는 상품을 담아 보세요. 찜한 상품에서 바로 담을 수도 있어요.', 'shopping-cart', `${btn('찜한 상품 보기')}${btn('쇼핑 계속하기', { variant: 'neutralSolid' })}`)}</div>
  <ul class="tp-notes">${NOTES.slice(0, 2).map((t) => `<li>${t}</li>`).join('')}</ul>
  <section class="tp-sec" aria-labelledby="recs">${secHead('이런 상품은 어때요', { id: 'recs', cls: 'tp-h2', sub: '최근 본 상품과 비슷해요' })}<div class="tp-recs">${RECS.map(rec).join('')}</div></section>
</main>
</div>`;
  return { slug: 'cart-empty', en: 'Empty Cart', name: '빈 장바구니', group: 'Commerce', desc: '담은 상품이 없을 때의 장바구니입니다. 추천 상품으로 쇼핑을 이어 가게 돕습니다.', css, body };
};

export const templates = [cart, cartEmpty].map((f) => f());

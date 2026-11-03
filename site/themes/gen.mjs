// 테마 예시 화면 생성기: 테마를 입힌 "실제 사이트" 한 화면을 만든다 (템플릿이 와이어프레임이라면 테마는 완성된 사이트 느낌).
// 사용: node site/themes/gen.mjs  →  node site/build.mjs
// 화면은 DS 컴포넌트와 kit 함수로만 짠다. 테마는 html 의 data-ds-theme 하나로 바뀐다(dist/themes/<이름>.css).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as K from '../templates/gen/kit.mjs';
const { esc, icon, btn, iconBtn, badge, input, select, checkbox, segmented, photo, avatar } = K;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'pages');
const won = (n) => n.toLocaleString('ko-KR') + '원';

export const THEMES = [
  { slug: 'study', name: '서재', en: 'Study', font: 'https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap',
    desc: '따뜻한 종이 바탕에 짙은 초록과 명조 제목을 쓴 테마입니다. 책, 강의처럼 차분하게 읽는 서비스에 어울립니다.',
    swatches: ['#f3efe4', '#23734f', '#164b34', '#fffdf8'] },
];

const CSS = `
  body { margin: 0; background: var(--ybm-color-bg-canvas); color: var(--ybm-color-fg-neutral); word-break: keep-all; overflow-wrap: break-word; }
  /* 큰 제목에만 테마의 제목 글꼴(--ybm-font-family-display). 테마가 없으면 기본 글꼴 */
  .th-display { font-family: var(--ybm-font-family-display, var(--ybm-font-family-base)); letter-spacing: -0.01em; }
  .th-wrap { box-sizing: border-box; width: min(100%, 1200px); margin-inline: auto; padding-inline: var(--ybm-space-x4); }
  @media (min-width: 768px) { .th-wrap { padding-inline: var(--ybm-space-x6); } }
  /* 위 메뉴 */
  .th-top { position: sticky; top: 0; z-index: var(--ybm-z-sticky); background: color-mix(in srgb, var(--ybm-color-bg-canvas) 88%, transparent); backdrop-filter: blur(12px); }
  .th-top .th-wrap { display: flex; align-items: center; gap: var(--ybm-space-x6); height: 64px; }
  .th-logo { font-size: var(--ybm-font-size-t07); line-height: 1; font-weight: var(--ybm-font-weight-bold); color: var(--ybm-color-fg-brand); text-decoration: none; }
  .th-menu { display: none; gap: var(--ybm-space-x1); }
  .th-menu a { padding: var(--ybm-space-x1_5) var(--ybm-space-x3); border-radius: var(--ybm-shape-pill); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-medium); text-decoration: none; }
  .th-menu a[aria-current="page"] { background: var(--ybm-color-bg-brand-weak); color: var(--ybm-color-fg-brand-contrast); }
  .th-top__end { display: flex; align-items: center; gap: var(--ybm-space-x1); margin-left: auto; }
  @media (min-width: 768px) { .th-menu { display: flex; } }
  /* 첫 화면 */
  .th-hero { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x4); padding-block: var(--ybm-space-x12) var(--ybm-space-x10); text-align: center; }
  .th-hero__eyebrow { color: var(--ybm-color-fg-brand); font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-semibold); }
  .th-hero h1 { margin: 0; font-size: 36px; line-height: 1.25; font-weight: 700; color: var(--ybm-color-fg-neutral); }
  @media (min-width: 768px) { .th-hero h1 { font-size: 52px; } }
  .th-hero p { max-width: 520px; margin: 0; color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); }
  .th-hero__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ybm-space-x2); margin-top: var(--ybm-space-x2); }
  /* 책 카드: 사진 → 배지 → 제목 → 지은이 → 가격 → 담기 (위계 순, 관련 줄은 붙이고 덩어리 사이는 띄운다) */
  .th-books { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x6); }
  @media (min-width: 768px) { .th-books { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .th-book { overflow: hidden; padding: 0; gap: 0; }
  .th-book .ds-imageframe { border-radius: 0; }
  .th-book__body { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x5); }
  .th-book__texts { display: flex; flex-direction: column; gap: var(--ybm-space-x1); }
  .th-book__texts .ds-badge { align-self: flex-start; margin-bottom: var(--ybm-space-x1); }
  .th-book h3 { margin: 0; font-size: var(--ybm-font-size-t07); line-height: var(--ybm-line-height-t07); font-weight: 700; }
  .th-book__by { color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); }
  .th-book__price { font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); font-weight: var(--ybm-font-weight-bold); font-variant-numeric: tabular-nums; }
  .th-book__buy { display: flex; align-items: center; gap: var(--ybm-space-x2); }
  .th-book__buy .ds-btn { flex: 1 1 auto; }
  /* 묶음 제목 */
  .th-sec { display: flex; flex-direction: column; gap: var(--ybm-space-x5); padding-block: var(--ybm-space-x10); }
  .th-sec__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ybm-space-x3); }
  .th-sec__head h2 { margin: 0; font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: 700; }
  .th-sec__head p { margin: var(--ybm-space-x1) 0 0; color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t04); }
  .th-grid2 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x6); align-items: start; }
  @media (min-width: 1024px) { .th-grid2 { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } .th-grid2--wide { grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); } }
  .th-card-title { margin: 0; font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); font-weight: 700; }
  /* 주문 */
  .th-form { display: flex; flex-direction: column; gap: var(--ybm-space-x5); }
  .th-form .ds-input, .th-form .ds-select { width: 100%; }
  .th-row2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--ybm-space-x2); }
  .th-ship .ds-selectbox__desc { font-variant-numeric: tabular-nums; }
  .th-ship__price { margin-left: auto; font-weight: var(--ybm-font-weight-semibold); font-variant-numeric: tabular-nums; }
  /* AI 도우미 */
  .th-chat { padding: 0; gap: 0; overflow: hidden; }
  .th-chat__head { display: flex; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4) var(--ybm-space-x5); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .th-chat__log { display: flex; flex-direction: column; gap: var(--ybm-space-x3); padding: var(--ybm-space-x5); }
  .th-chat__log .ds-chat-bubble[data-sender="user"] { align-self: flex-end; }
  .th-pick { display: flex; flex-direction: column; gap: var(--ybm-space-x2); margin: var(--ybm-space-x2) 0 0; padding: 0; list-style: none; }
  .th-pick li { display: flex; align-items: center; gap: var(--ybm-space-x3); }
  .th-pick .ds-imageframe { flex: none; width: 40px; }
  .th-pick b { display: block; font-size: var(--ybm-font-size-t04); }
  .th-pick span { color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t02); }
  /* 재고, 매출 */
  .th-tools { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
  .th-tools__end { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x2); }
  .th-tools .ds-input { flex: none; width: 200px; max-width: 100%; }
  .th-tools__end > .ds-select { width: auto; min-width: 128px; }
  .th-low { color: var(--ybm-color-fg-critical); font-weight: var(--ybm-font-weight-semibold); }
  .th-stats { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--ybm-space-x4); }
  .th-stat { display: flex; flex-direction: column; gap: var(--ybm-space-x1); }
  .th-stat__label { color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); }
  .th-stat__value { font-size: var(--ybm-font-size-t10); line-height: var(--ybm-line-height-t10); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .th-up { color: var(--ybm-color-fg-positive); font-size: var(--ybm-font-size-t03); font-weight: var(--ybm-font-weight-semibold); }
  .th-acts { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
  .th-acts li { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); padding-block: var(--ybm-space-x3); }
  .th-acts li + li { box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .th-acts b { display: block; font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-medium); }
  .th-acts span { color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t02); }
  .th-acts em { font-style: normal; font-weight: var(--ybm-font-weight-semibold); font-variant-numeric: tabular-nums; }
  .th-acts em[data-minus] { color: var(--ybm-color-fg-neutral-subtle); }
  /* 아래 */
  .th-foot { padding-block: var(--ybm-space-x10); color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t03); }
  .th-foot .th-wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--ybm-space-x3); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); padding-top: var(--ybm-space-x6); }
`;

const qty = (n, name) => `<div class="ds-quantity" data-size="small"><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 줄이기"${n <= 1 ? ' disabled' : ''}>${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="${n}" aria-label="${esc(name)} 수량"><button type="button" class="ds-quantity__btn" aria-label="${esc(name)} 수량 늘리기">${icon('plus')}</button></div>`;
const frame = (src, ratio = '4:3', radius = '') => `<div class="ds-imageframe" data-ratio="${ratio}"${radius ? ` data-radius="${radius}"` : ''}><img src="${src}" alt="" loading="lazy"></div>`;

const BOOKS = [
  ['새 책', 'brand', '느리게 걷는 법', '김하늘 · 에세이', 16800, 0],
  ['많이 읽어요', 'positive', '하루 10분 글쓰기', '이서윤 · 글쓰기', 14400, 1],
  ['한정판', 'warning', '종이 위의 여름', '박준 · 소설', 19800, 4],
];
const book = ([b, tone, t, by, p, img]) => `<article class="ds-card th-book" data-variant="subtle">${frame(photo('book', img, 720))}
  <div class="th-book__body"><div class="th-book__texts">${badge(b, tone)}<h3 class="th-display">${t}</h3><span class="th-book__by">${by}</span></div><span class="th-book__price">${won(p)}</span>
  <div class="th-book__buy">${qty(1, t)}${btn('담기', { variant: 'neutralWeak', size: 'small', ic: 'shopping-cart' })}</div></div></article>`;

const ship = [['일반 배송', '3~5일 안에 도착해요', 3000], ['빠른 배송', '내일 도착해요', 4000, true], ['오늘 도착', '오후 2시 전 주문만 가능해요', 6000]];
const order = `<section class="ds-card th-order" data-variant="subtle" aria-labelledby="th-order-t"><h2 class="th-card-title th-display" id="th-order-t">주문하기</h2>
<form class="th-form" onsubmit="return false">
  ${K.field('o-mail', '이메일', input('o-mail', 'type="email" value="ybm@example.com"'))}
  <div class="ds-field"><div class="ds-field__header"><span class="ds-field__label">배송 방법</span></div><div class="ds-selectbox-group th-ship">${ship.map(([l, d, p, on]) => `<label class="ds-selectbox"><span class="ds-selectbox__texts"><span class="ds-selectbox__label">${l}</span><span class="ds-selectbox__desc">${d}</span></span><span class="th-ship__price">${won(p)}</span><span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="o-ship"${on ? ' checked' : ''}></span></label>`).join('')}</div></div>
  <div class="ds-field"><div class="ds-field__header"><span class="ds-field__label">결제 수단</span></div>${segmented(['카드', '계좌 이체', '간편 결제'], 0, '결제 수단', 'medium').replace('class="ds-segmented"', 'class="ds-segmented" data-layout="fill"')}</div>
  ${K.field('o-card', '카드 번호', input('o-card', 'inputmode="numeric" placeholder="0000 0000 0000 0000"'))}
  <div class="th-row2">${K.field('o-exp', '유효 기간', input('o-exp', 'placeholder="MM / YY"'))}${K.field('o-cvc', '보안 코드', input('o-cvc', 'inputmode="numeric" placeholder="3자리"'))}</div>
  ${checkbox('다음에도 이 결제 정보로 빠르게 결제할게요')}
  ${btn('51,200원 결제하기', { variant: 'brandSolid', size: 'large', fill: true })}
</form></section>`;

const picks = [['느리게 걷는 법', '에세이 · 220쪽', 0], ['종이 위의 여름', '소설 · 180쪽', 4]];
const chat = `<section class="ds-card th-chat" data-variant="subtle" aria-labelledby="th-chat-t">
  <div class="th-chat__head">${icon('sparkles')}<h2 class="th-card-title th-display" id="th-chat-t" style="flex:1">서재 도우미</h2>${iconBtn('x', '닫기', { size: 'xsmall' })}</div>
  <div class="th-chat__log">
    <p class="ds-chat-system" data-variant="divider">오늘</p>
    <div class="ds-chat-bubble" data-sender="user">주말에 가볍게 읽을 책을 추천해 줘</div>
    <div class="ds-chat-bubble">최근에 읽은 에세이를 보고 두 권을 골랐어요. 둘 다 하루 저녁이면 다 읽을 수 있어요.
      <ul class="th-pick">${picks.map(([t, m, i]) => `<li>${frame(photo('book', i, 160), '1:1', 'sm')}<div><b>${t}</b><span>${m}</span></div></li>`).join('')}</ul></div>
    <div class="ds-chat-bubble" data-sender="user">첫 번째 책 담아 줘</div>
    <div class="ds-chat-bubble">"느리게 걷는 법"을 장바구니에 담았어요. 지금 주문하면 내일 도착해요.</div>
  </div>
  <form class="ds-chat-composer" onsubmit="return false"><button type="button" class="ds-chat-composer__attach" aria-label="첨부">${icon('plus')}</button><div class="ds-chat-composer__field"><textarea class="ds-chat-composer__input" rows="1" placeholder="도우미에게 물어보세요" aria-label="메시지"></textarea><button type="submit" class="ds-chat-send" aria-label="보내기" disabled></button></div></form>
</section>`;

const stock = [['느리게 걷는 법', '김하늘', 42, 'A-3', '에세이'], ['하루 10분 글쓰기', '이서윤', 128, 'A-1', '글쓰기'], ['종이 위의 여름', '박준', 6, 'B-2', '소설'], ['처음 만나는 철학', '정다은', 63, 'C-4', '인문'], ['오늘의 식탁', '한지우', 9, 'D-1', '요리']];
const inventory = `<section class="ds-card" data-variant="subtle" aria-labelledby="th-inv-t">
  <div class="th-tools"><h2 class="th-card-title th-display" id="th-inv-t">재고</h2><div class="th-tools__end">${K.even(input('inv-q', 'type="search" placeholder="책 이름으로 찾기" aria-label="책 찾기"', { ic: 'search' }) + select('모든 분야', { aria: '분야' }) + btn('책 추가', { variant: 'brandSolid', ic: 'plus' }))}</div></div>
  ${K.callout('', '2권의 재고가 10권 아래로 줄었어요.', 'warning', 'triangle-alert-solid')}
  <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th scope="col"><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="모든 책 고르기"></label></th><th scope="col" style="width:40%">책</th><th scope="col" data-align="end">남은 수량</th><th scope="col">위치</th><th scope="col">분야</th></tr></thead><tbody>${stock.map(([t, a, n, loc, cat]) => `<tr><td><label class="ds-checkbox"><input type="checkbox" class="ds-checkbox__control" aria-label="${t} 고르기"></label></td><td><span class="ds-table__stack"><span>${t}</span><span>${a}</span></span></td><td data-align="end"${n < 10 ? ' class="th-low"' : ''}>${n}권</td><td>${loc}</td><td>${badge(cat)}</td></tr>`).join('')}</tbody></table></div>
</section>`;

const acts = [['주문 2041', '결제 · 오후 1:59', '+51,200원'], ['주문 2039', '환불 · 오후 12:40', '-14,400원', 1], ['주문 2038', '결제 · 오전 10:30', '+33,600원'], ['주문 2036', '결제 · 오전 9:11', '+19,800원']];
const sales = `<section class="ds-card" data-variant="subtle" aria-labelledby="th-sales-t">
  <h2 class="th-card-title th-display" id="th-sales-t">이번 달 매출</h2>
  <div class="th-stats"><div class="th-stat"><span class="th-stat__label">매출</span><span class="th-stat__value">1,842만원</span><span class="th-up">지난달보다 12% 늘었어요</span></div><div class="th-stat"><span class="th-stat__label">주문</span><span class="th-stat__value">1,204건</span><span class="th-up">지난달보다 8% 늘었어요</span></div></div>
  ${K.divider()}
  <div class="th-tools"><h3 class="th-card-title" style="font-size: var(--ybm-font-size-t05)">최근 주문</h3>${K.link('전체 보기')}</div>
  <ul class="th-acts">${acts.map(([t, m, v, minus]) => `<li><div><b>${t}</b><span>${m}</span></div><em${minus ? ' data-minus' : ''}>${v}</em></li>`).join('')}</ul>
</section>`;

const body = (t) => `<header class="th-top"><div class="th-wrap"><a class="th-logo th-display" href="#">한빛 서재</a><nav class="th-menu" aria-label="주요 메뉴"><a href="#" aria-current="page">책</a><a href="#">클래스</a><a href="#">읽는 이야기</a><a href="#">도움말</a></nav>
  <div class="th-top__end">${iconBtn('search', '찾기', { variant: 'ghost' })}${iconBtn('heart', '찜한 책', { variant: 'ghost' })}${iconBtn('shopping-cart', '장바구니', { variant: 'ghost' })}${btn('로그인', { variant: 'brandSolid' })}</div></div></header>
<main>
  <section class="th-wrap th-hero"><span class="th-hero__eyebrow">이번 주 새로 들어온 책 12권</span><h1 class="th-display">오늘 읽을 한 권,<br>여기서 찾아요</h1><p>천천히 읽고 오래 남는 책과 강의를 골라 두었어요. 마음에 드는 한 권부터 시작해 보세요.</p><div class="th-hero__ctas">${btn('책 둘러보기', { variant: 'brandSolid', size: 'large' })}${btn('클래스 보기', { variant: 'neutralWeak', size: 'large' })}</div></section>
  <section class="th-wrap"><div class="th-books">${BOOKS.map(book).join('')}</div></section>
  <section class="th-wrap th-sec"><div class="th-sec__head"><div><h2 class="th-display">주문과 도우미</h2><p>고른 책을 바로 주문하고, 궁금한 건 도우미에게 물어보세요.</p></div></div><div class="th-grid2">${order}${chat}</div></section>
  <section class="th-wrap th-sec" style="padding-top: 0"><div class="th-sec__head"><div><h2 class="th-display">서재 관리</h2><p>재고와 매출을 한눈에 봐요.</p></div></div><div class="th-grid2 th-grid2--wide">${inventory}${sales}</div></section>
</main>
<footer class="th-foot"><div class="th-wrap"><span class="th-display" style="color: var(--ybm-color-fg-brand); font-weight: 700">한빛 서재</span><span>이 화면은 YBM DS 테마 예시예요. 서점과 사람 이름은 가상입니다.</span></div></footer>`;

fs.mkdirSync(OUT, { recursive: true });
for (const t of THEMES) {
  const html = `<!doctype html>
<html lang="ko" data-ds-theme="${t.slug}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.name)} 테마 - YBM DS</title>
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<link rel="stylesheet" href="../../../dist/themes/${t.slug}.css">
<link rel="stylesheet" href="${t.font}">
<script>if (location.hash === "#default") document.documentElement.removeAttribute("data-ds-theme");</script>
<script src="../../../dist/ybm-ds.js" defer></script>
<style>${CSS}</style>
</head>
<body>
${body(t)}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, t.slug + '.html'), html);
}
fs.writeFileSync(path.join(HERE, '..', 'src', 'themes.json'), JSON.stringify({ themes: THEMES.map(({ slug, name, en, desc, swatches }) => ({ slug, name, en, desc, swatches })) }, null, 2) + '\n');
console.log(`테마 화면 ${THEMES.length}개 생성`);

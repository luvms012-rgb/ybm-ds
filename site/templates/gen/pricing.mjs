// 요금제, 구독 템플릿: 요금제 비교, 구독 결제, 내 구독, 구독 해지.
// 사내 UI 패턴 모음의 '멤버십·요금제' 화면에서 공통 구조만 뽑았다(서비스 이름, 글, 로고는 넣지 않음).
import * as K from './kit.mjs';
import { T, FRAME_CSS, selectbox } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, checkbox, radios, textarea, divider, link, esc } = K;

const PR_CSS = FRAME_CSS + `
  .tp-pr-wrap { box-sizing: border-box; width: min(100%, 1200px); margin-inline: auto; }
  .tp-pr-narrow { box-sizing: border-box; width: min(100%, 720px); margin-inline: auto; }
  .tp-pr-hero { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x3); text-align: center; }
  .tp-pr-period { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--ybm-space-x2); }
  .tp-price { display: flex; align-items: baseline; gap: var(--ybm-space-x1); }
  .tp-price__v { font-size: var(--ybm-font-size-t10); line-height: var(--ybm-line-height-t10); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
  .tp-feat { display: flex; flex-direction: column; gap: var(--ybm-space-x2); margin: 0; padding: 0; list-style: none; }
  .tp-feat li { display: flex; align-items: flex-start; gap: var(--ybm-space-x2); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-feat li > .ds-icon { flex: none; margin-top: 2px; --ds-icon-size: 16px; }
  .tp-feat li[data-off] { color: var(--ybm-color-fg-neutral-subtle); }
  .tp-notes { display: flex; flex-direction: column; gap: var(--ybm-space-x1_5); margin: 0; padding-inline-start: var(--ybm-space-x5); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); }
`;
const feats = (items) => `<ul class="tp-feat">${items.map((t) => (t.startsWith('-') ? `<li data-off>${icon('minus')}<span>${t.slice(1)}</span></li>` : `<li>${icon('check')}<span>${t}</span></li>`)).join('')}</ul>`;
const ok = icon('check');
const no = '<span class="tp-caption" aria-label="없음">-</span>';

/* 1. 요금제 비교 -------------------------------------------------- */
const plans = () => {
  const css = PR_CSS + `
  .tp-plans { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x4); }
  @media (min-width: 768px) { .tp-plans { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1280px) { .tp-plans { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-plan.ds-card { gap: var(--ybm-space-x4); }
  .tp-plan[data-pick].ds-card { box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-neutral-contrast); }
  .tp-plan .ds-btn { margin-top: auto; }
  .tp-plan__top { display: flex; flex-direction: column; gap: var(--ybm-space-x3); min-height: 0; }
  .tp-pr [data-y] { display: none; }
  .tp-pr[data-period="y"] [data-m] { display: none; }
  .tp-pr[data-period="y"] [data-y] { display: revert; }
  .tp-cmp-t td:not(:first-child), .tp-cmp-t th:not(:first-child) { text-align: center; }
  .tp-cmp-t .ds-icon { --ds-icon-size: 18px; }
`;
  const P = [
    ['무료', '혼자 가볍게 시작할 때', ['0원', '0원'], '지금 쓰는 요금제', 'neutralWeak', ['프로젝트 3개', '저장 공간 1GB', '기본 템플릿', '-팀원 초대', '-버전 기록']],
    ['베이직', '혼자 꾸준히 쓸 때', ['5,900원', '4,900원'], '베이직 시작하기', 'neutralOutline', ['프로젝트 20개', '저장 공간 10GB', '모든 템플릿', '팀원 2명까지', '-버전 기록']],
    ['프로', '작은 팀이 함께 쓸 때', ['9,900원', '7,900원'], '프로 시작하기', 'brandSolid', ['프로젝트 무제한', '저장 공간 50GB', '모든 템플릿', '팀원 10명까지', '버전 기록 30일']],
    ['팀', '여러 팀을 관리할 때', ['19,900원', '15,900원'], '팀 시작하기', 'neutralOutline', ['프로젝트 무제한', '저장 공간 1TB', '권한 관리와 SSO', '팀원 무제한', '버전 기록 1년']],
  ];
  const planCard = ([n, d, [m, y], cta, v, f], i) => card(`<div class="tp-plan__top">
    <div class="tp-between"><h2 class="tp-h3">${n}</h2>${i === 2 ? badge('추천', 'brand', true) : ''}</div>
    <p class="tp-sub">${d}</p>
    <div class="tp-stack"><div class="tp-price"><span class="tp-price__v" data-m>${m}</span><span class="tp-price__v" data-y>${y}</span><span class="tp-sub">/ 월</span></div>
    <span class="tp-caption" data-m>${i ? '매달 결제해요' : '카드 없이 쓸 수 있어요'}</span><span class="tp-caption" data-y>${i ? '1년치를 한 번에 결제해요' : '카드 없이 쓸 수 있어요'}</span></div>
  </div>
  ${btn(cta, { variant: v, size: 'medium', fill: true, attrs: i === 0 ? 'disabled' : '' })}
  ${divider()}
  ${feats(f)}`, { cls: 'tp-plan', attrs: i === 2 ? 'data-pick' : '' });
  const rows = [
    ['프로젝트 수', '3개', '20개', '무제한', '무제한'],
    ['저장 공간', '1GB', '10GB', '50GB', '1TB'],
    ['팀원 초대', no, '2명', '10명', '무제한'],
    ['모든 템플릿', no, ok, ok, ok],
    ['버전 기록', no, no, '30일', '1년'],
    ['댓글과 멘션', ok, ok, ok, ok],
    ['파일 내려받기 (PDF, PNG)', ok, ok, ok, ok],
    ['권한 관리', no, no, no, ok],
    ['SSO 로그인', no, no, no, ok],
    ['도움 받기', '도움말 센터', '이메일', '이메일, 채팅', '전담 매니저'],
  ];
  const faq = [
    ['무료로 써 보고 바꿀 수 있나요?', '네, 무료 요금제로 먼저 써 보고 필요할 때 언제든 바꿀 수 있어요. 만든 프로젝트는 그대로 남아요.', true],
    ['연 결제는 얼마나 저렴한가요?', '연 결제를 고르면 월 결제보다 약 20% 저렴해요. 1년치를 한 번에 결제해요.'],
    ['요금제를 중간에 바꾸면 어떻게 되나요?', '올리면 남은 기간만큼 나눠 계산해 바로 적용해요. 내리면 다음 결제일부터 바뀌어요.'],
    ['해지하면 환불받을 수 있나요?', '결제한 지 7일 안에 쓰지 않았다면 전액 환불해요. 그 뒤에는 남은 기간까지 쓸 수 있고 다음 결제가 멈춰요.'],
    ['세금계산서를 받을 수 있나요?', '팀 요금제는 결제할 때 사업자 정보를 넣으면 매달 세금계산서를 보내 드려요.'],
  ];
  const body = `<div class="tp-app"><main class="tp-content tp-pr" data-period="m">
  <div class="tp-pr-wrap tp-stack" style="gap: var(--ybm-space-x10)">
    <header class="tp-pr-hero">
      <h1 class="tp-h1">나에게 맞는 요금제를 골라 보세요</h1>
      <p class="tp-sub">무료로 시작하고 필요할 때 올리세요. 언제든 바꾸거나 해지할 수 있어요.</p>
      <div class="tp-pr-period"><div class="ds-segmented" role="group" aria-label="결제 주기" data-size="medium"><button type="button" class="ds-segmented__item" aria-pressed="true" data-period="m">월 결제</button><button type="button" class="ds-segmented__item" aria-pressed="false" data-period="y">연 결제</button></div>${badge('연 결제 20% 할인', 'positive')}</div>
    </header>
    <div class="tp-plans">${P.map(planCard).join('')}</div>
    <section class="tp-sec" aria-labelledby="cmp">${secHead('모든 기능 비교', { id: 'cmp' })}
      <div class="tp-scroll-x tp-cmp-t">${K.table([['기능'], ['무료'], ['베이직'], ['프로'], ['팀']], rows, { caption: '요금제별 기능 비교' })}</div>
    </section>
    <section class="tp-sec" aria-labelledby="faq">${secHead('자주 묻는 질문', { id: 'faq' })}
      <div>${K.accordion(faq)}</div>
    </section>
    ${card(`<div class="tp-between"><div class="tp-stack"><h2 class="tp-h3">50명이 넘는 팀인가요?</h2><p class="tp-sub">쓰는 인원과 필요한 기능에 맞춰 요금을 따로 안내해 드려요.</p></div>${btn('도입 문의하기', { size: 'medium', icEnd: 'arrow-right' })}</div>`)}
  </div>
</main></div>
<script>
document.addEventListener('click', function (e) { var b = e.target.closest('[data-period]'); if (b && b.tagName === 'BUTTON') document.querySelector('.tp-pr').dataset.period = b.dataset.period; });
</script>`;
  return { slug: 'pricing-plans', en: 'Pricing Plans', name: '요금제 비교', group: 'Pricing', desc: '요금제를 나란히 놓고 비교해 고르는 화면입니다. 월 결제와 연 결제를 바꿔 보면 가격이 바뀌고, 아래 표로 기능 차이를 한눈에 봅니다.', css, body };
};

/* 2. 구독 결제 ---------------------------------------------------- */
const checkout = () => {
  const css = PR_CSS + `
  .tp-sub-pay { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); }
  @media (min-width: 1024px) { .tp-sub-pay { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; } .tp-sub-pay__aside { position: sticky; top: var(--ybm-space-x6); } }
  .tp-sub-form { display: flex; flex-direction: column; gap: var(--ybm-space-x5); min-width: 0; }
  .tp-sub-form .ds-selectbox__label { display: inline-flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); }
  .tp-pair { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x4); }
  @media (min-width: 560px) { .tp-pair { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .tp-coupon { display: flex; gap: var(--ybm-space-x2); }
  .tp-coupon > .ds-input { flex: 1 1 auto; }
  .tp-agree { display: flex; flex-direction: column; gap: var(--ybm-space-x1); padding-inline-start: var(--ybm-space-x7); }
`;
  const inp = (id, ph, attrs = '') => input(id, `placeholder="${esc(ph)}" ${attrs}`);
  const body = `<div class="tp-app"><main class="tp-content">
  <div class="tp-pr-wrap tp-sub-pay" style="max-width: 1080px">
    <div class="tp-sub-form">
      <div class="tp-stack" style="gap: var(--ybm-space-x3)">${link('요금제 다시 고르기')}<h1 class="tp-h1">프로 요금제 시작하기</h1><p class="tp-sub">첫 7일은 무료예요. 무료 기간이 끝나기 하루 전에 알려 드려요.</p></div>
      ${divider()}
      <h2 class="tp-h3">결제 주기</h2>
      ${selectbox('cycle', [[`연 결제 ${badge('20% 할인', 'positive')}`, '월 7,900원, 1년치 94,800원을 한 번에 결제해요'], ['월 결제', '월 9,900원, 매달 같은 날 결제해요']], 0)}
      <h2 class="tp-h3">결제 수단</h2>
      ${radios('pay', ['신용, 체크 카드', '간편 결제', '계좌 이체'], 0)}
      <div class="tp-pair">${field('c-no', '카드 번호', inp('c-no', '0000 0000 0000 0000', 'inputmode="numeric"'), { required: true })}<div class="tp-pair">${field('c-exp', '유효 기간', inp('c-exp', 'MM/YY'), { required: true })}${field('c-birth', '생년월일 6자리', inp('c-birth', '000000', 'inputmode="numeric"'), { required: true })}</div></div>
      ${field('c-coupon', '할인 코드', `<div class="tp-coupon">${K.even(inp('c-coupon', '코드를 넣어 주세요') + btn('적용'))}</div>`)}
      <h2 class="tp-h3">약관 동의</h2>
      <div class="tp-stack" style="gap: var(--ybm-space-x2)">${checkbox('모두 동의해요', { checked: true })}
        <div class="tp-agree">${checkbox('(필수) 정기 결제에 동의해요', { checked: true, size: 'small' })}${checkbox('(필수) 이용 약관과 환불 규정을 확인했어요', { checked: true, size: 'small' })}${checkbox('(선택) 혜택 소식을 받아 볼게요', { checked: true, size: 'small' })}</div></div>
    </div>
    <aside class="tp-sub-pay__aside tp-stack" style="gap: var(--ybm-space-x4)">
      ${card(`<div class="tp-between"><h2 class="tp-h3">결제 요약</h2>${badge('7일 무료', 'brand')}</div>
      <div class="tp-rows">
        <div class="tp-kv"><span>요금제</span><span>프로</span></div>
        <div class="tp-kv"><span>결제 주기</span><span>연 결제</span></div>
        <div class="tp-kv"><span>정가</span>${T('118,800원')}</div>
        <div class="tp-kv"><span>연 결제 할인</span>${T('-24,000원')}</div>
        <div class="tp-kv"><span>첫 결제일</span>${T('2026.11.09')}</div>
      </div>
      ${divider()}
      <div class="tp-between"><span class="tp-h4">오늘 결제할 금액</span><span class="tp-mid">${T('0원')}</span></div>
      <p class="tp-caption">무료 기간이 끝나면 94,800원이 결제돼요.</p>`)}
      ${btn('7일 무료로 시작하기', { variant: 'brandSolid', size: 'large', fill: true })}
      <p class="tp-caption" style="text-align:center">${icon('lock', 'sm')} 무료 기간 안에 해지하면 결제되지 않아요</p>
    </aside>
  </div>
</main></div>`;
  return { slug: 'subscription-checkout', en: 'Subscription Checkout', name: '구독 결제', group: 'Pricing', desc: '고른 요금제를 결제하는 화면입니다. 결제 주기, 결제 수단, 할인 코드, 약관 동의를 한 화면에서 받고 오른쪽 요약에 오늘 결제할 금액과 다음 결제일을 보여 줍니다.', css, body };
};

/* 3. 내 구독 ------------------------------------------------------ */
const manage = () => {
  const css = PR_CSS + `
  .tp-manage { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x4); }
  @media (min-width: 1024px) { .tp-manage { grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); } }
  .tp-cardmark { display: grid; place-items: center; flex: none; width: 48px; height: 32px; border-radius: var(--ybm-shape-xs); background: var(--ybm-color-bg-neutral); }
`;
  const hist = [
    ['2026.10.09', '프로 연 결제', '94,800원', badge('결제 완료', 'positive')],
    ['2025.10.09', '프로 연 결제', '94,800원', badge('결제 완료', 'positive')],
    ['2025.09.09', '베이직 월 결제', '5,900원', badge('결제 완료', 'positive')],
    ['2025.08.09', '베이직 월 결제', '5,900원', badge('환불', 'neutral')],
    ['2025.07.09', '베이직 월 결제', '5,900원', badge('결제 완료', 'positive')],
  ].map(([d, n, p, s]) => [T(d), n, T(p), s, iconBtn('download', '영수증 내려받기', { size: 'xsmall' })]);
  const body = `<div class="tp-app">
  ${head('구독과 결제', { sub: '지금 쓰는 요금제와 결제 정보를 확인하고 바꿀 수 있어요.' })}
  <main class="tp-content">
    <div class="tp-manage">
      ${card(`<div class="tp-between"><div class="tp-row">${badge('이용 중', 'positive')}<span class="tp-sub">연 결제</span></div>${link('요금제 비교하기')}</div>
      <div class="tp-stack"><h2 class="tp-h2">프로</h2><div class="tp-price"><span class="tp-mid">${T('7,900원')}</span><span class="tp-sub">/ 월, 1년 94,800원</span></div></div>
      <div class="tp-rows">
        <div class="tp-kv"><span>다음 결제일</span>${T('2027.10.09')}</div>
        <div class="tp-kv"><span>다음 결제 금액</span>${T('94,800원')}</div>
        <div class="tp-kv"><span>팀원</span>${T('4명 / 10명')}</div>
      </div>
      <div class="tp-row" style="flex-wrap: wrap">${btn('요금제 바꾸기', { variant: 'neutralSolid', size: 'medium' })}${btn('월 결제로 바꾸기', { size: 'medium' })}</div>`)}
      ${card(`<h2 class="tp-h3">이번 달 사용량</h2>
      ${K.meter('프로젝트', 40, '8 / 무제한')}${K.meter('저장 공간', 24, '12GB / 50GB')}${K.meter('팀원', 40, '4명 / 10명')}${K.meter('버전 기록', 100, '30일 보관')}
      <p class="tp-caption">사용량은 매일 새벽 4시에 새로 계산해요.</p>`)}
    </div>
    <section class="tp-sec" aria-labelledby="pm">${secHead('결제 수단', { id: 'pm' })}
      ${card(`<div class="tp-between"><div class="tp-row" style="gap: var(--ybm-space-x3)"><span class="tp-cardmark">${icon('credit-card')}</span><span class="tp-stack"><span class="tp-h4">신용카드 **** 4821</span><span class="tp-caption">유효 기간 08/29</span></span></div>${btn('바꾸기')}</div>`)}
    </section>
    <section class="tp-sec" aria-labelledby="hist">${secHead('결제 내역', { id: 'hist', tools: btn('전체 내려받기', { ic: 'download' }) })}
      <div class="tp-scroll-x">${K.table(['결제일', '내용', ['금액', 'right'], '상태', ['영수증', 'center']], hist, { caption: '결제 내역' })}</div>
    </section>
    ${divider()}
    <div class="tp-between"><div class="tp-stack"><span class="tp-h4">구독 해지</span><span class="tp-sub">해지해도 2027.10.09까지는 프로 요금제를 그대로 쓸 수 있어요.</span></div>${btn('구독 해지하기', { variant: 'ghost' })}</div>
  </main>
</div>`;
  return { slug: 'subscription-settings', en: 'Subscription Settings', name: '내 구독', group: 'Pricing', desc: '지금 쓰는 요금제와 다음 결제일, 사용량, 결제 수단, 결제 내역을 한 화면에서 관리합니다. 요금제 바꾸기와 해지는 같은 화면에서 시작합니다.', css, body };
};

/* 4. 구독 해지 ---------------------------------------------------- */
const cancel = () => {
  const css = PR_CSS + `
  .tp-cancel { display: flex; flex-direction: column; gap: var(--ybm-space-x8); }
  .tp-keep { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x3); }
  @media (min-width: 768px) { .tp-keep { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .tp-keep__item { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4); border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-neutral-subtle); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); }
  .tp-keep__item > .ds-icon { --ds-icon-size: 24px; }
  .tp-offer.ds-card { background: var(--ybm-color-bg-neutral); box-shadow: none; }
  .tp-cancel-acts { display: flex; flex-direction: column-reverse; gap: var(--ybm-space-x2); }
  @media (min-width: 560px) { .tp-cancel-acts { flex-direction: row; justify-content: flex-end; } }
`;
  const keep = [
    ['folder', '프로젝트 무제한', '지금 만든 프로젝트 23개 가운데 3개만 남기고 읽기 전용이 돼요.'],
    ['users', '팀원 10명', '함께 쓰는 팀원 3명이 편집할 수 없게 돼요.'],
    ['rotate-ccw', '버전 기록 30일', '지난 기록을 되돌릴 수 없게 돼요.'],
  ];
  const body = `<div class="tp-app"><main class="tp-content">
  <div class="tp-pr-narrow tp-cancel">
    <div class="tp-stack" style="gap: var(--ybm-space-x3)">${link('내 구독으로 돌아가기')}<h1 class="tp-h1">구독을 해지하기 전에 확인해 주세요</h1><p class="tp-sub">지금 프로 요금제를 쓰고 있어요. 해지하면 2027.10.09에 무료 요금제로 바뀌어요.</p></div>
    <section class="tp-sec" aria-labelledby="lose"><h2 class="tp-h3" id="lose">해지하면 이런 혜택을 쓸 수 없어요</h2>
      <div class="tp-keep">${keep.map(([ic, t, d]) => `<div class="tp-keep__item">${icon(ic)}<span class="tp-h4">${t}</span><span class="tp-sub">${d}</span></div>`).join('')}</div>
    </section>
    <section class="tp-sec" aria-labelledby="why"><h2 class="tp-h3" id="why">해지하는 까닭을 알려 주세요</h2>
      ${radios('why', ['요금이 부담돼요', '자주 쓰지 않아요', '필요한 기능이 없어요', '다른 서비스로 옮겨요', '기타'], 0)}
      ${field('why-more', '더 알려 주실 내용 (선택)', textarea('why-more', 'rows="3" placeholder="더 나은 서비스를 만드는 데 쓸게요"'))}
    </section>
    ${card(`<div class="tp-row" style="align-items: flex-start; gap: var(--ybm-space-x3)">${icon('sparkles', 'lg')}<div class="tp-stack" style="gap: var(--ybm-space-x2)"><h2 class="tp-h3">3개월 동안 40% 할인받고 계속 쓰기</h2><p class="tp-sub">요금이 부담된다면 다음 3개월은 월 4,740원에 쓸 수 있어요. 할인이 끝나면 원래 요금으로 돌아가요.</p></div></div>
    <div>${btn('할인받고 계속 쓰기', { variant: 'neutralSolid', size: 'medium' })}</div>`, { cls: 'tp-offer' })}
    <section class="tp-sec" aria-labelledby="note"><h2 class="tp-h3" id="note">해지 전에 알아 두세요</h2>
      <ul class="tp-notes">
        <li>해지해도 남은 기간까지는 지금 요금제를 그대로 쓸 수 있어요.</li>
        <li>해지를 신청하면 다음 결제가 멈추고, 남은 기간 안에는 언제든 해지를 취소할 수 있어요.</li>
        <li>결제한 지 7일 안에 쓰지 않았다면 전액 환불받을 수 있어요.</li>
        <li>연 결제를 중간에 해지하면 쓴 기간을 뺀 금액을 환불해요.</li>
      </ul>
    </section>
    ${divider()}
    <div class="tp-cancel-acts">${btn('해지 신청하기', { variant: 'neutralWeak', size: 'large' })}${btn('구독 유지하기', { variant: 'brandSolid', size: 'large' })}</div>
  </div>
</main></div>`;
  return { slug: 'subscription-cancel', en: 'Cancel Subscription', name: '구독 해지', group: 'Pricing', desc: '구독을 해지하기 전에 잃게 되는 혜택과 유의 사항을 보여 주는 화면입니다. 해지 까닭을 묻고 할인 제안을 함께 보여 준 뒤 유지와 해지 가운데 고르게 합니다.', css, body };
};

export const templates = [plans, checkout, manage, cancel].map((f) => f());

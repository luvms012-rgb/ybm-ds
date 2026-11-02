import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, select, checkbox, radios, textarea, divider, thumb, link, stepper, chip, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;
const inp = (id, ph, attrs = '') => input(id, `placeholder="${esc(ph)}" ${attrs}`);
const req = (id, label, control, help = '') => field(id, label, control, { help, required: true });
const sel = (id, v) => select(v, { id, size: 'medium' });

const FORM_CSS = `
  .tp-form { display: flex; flex-direction: column; gap: var(--ybm-space-x5); }
  .tp-form .ds-field { min-width: 0; }
  .tp-pair { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x4); }
  @media (min-width: 560px) { .tp-pair { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .tp-legend-t { font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); font-weight: var(--ybm-font-weight-semibold); }
  .tp-chips { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x2); }
  .tp-optrow { display: flex; gap: var(--ybm-space-x3); align-items: flex-start; padding: var(--ybm-space-x3) 0; }
  .tp-optrow + .tp-optrow { box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-footer-bar { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); padding: var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); background: var(--ybm-color-bg-layer-default); }
  @media (min-width: 768px) { .tp-footer-bar { padding: var(--ybm-space-x4) var(--ybm-space-x6); } }
  .tp-sum-line { display: flex; justify-content: space-between; gap: var(--ybm-space-x3); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-sum-line > :first-child { color: var(--ybm-color-fg-neutral-muted); }
  .tp-sum-total { display: flex; justify-content: space-between; font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); font-weight: var(--ybm-font-weight-bold); }
  .tp-item { display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: var(--ybm-space-x3); align-items: start; }
  .tp-item .ds-imageframe { border-radius: var(--ybm-shape-sm); }
`;
const opt = (t, d, checked = false, type = 'checkbox', name = 'o') => `<label class="tp-optrow"><span class="ds-${type}" data-size="medium"><input type="${type}" class="ds-${type}__control" name="${name}"${checked ? ' checked' : ''} aria-label="${esc(t)}"></span><span class="tp-stack"><span>${t}</span><span class="tp-sub">${d}</span></span></label>`;
const summary = (items, lines, total, title = '주문 요약') => card(`<div class="tp-between"><h2 class="tp-h3">${title}</h2>${badge(items.length + '개')}</div>${items.map(([n, d, p]) => `<div class="tp-item">${thumb('1:1')}<div class="tp-stack"><div class="tp-between" style="align-items:flex-start;flex-wrap:nowrap"><span>${n}</span>${T(p)}</div><span class="tp-caption">${d}</span></div></div>`).join('')}${divider()}${lines.map(([k, v]) => `<div class="tp-sum-line"><span>${k}</span>${T(v)}</div>`).join('')}${divider()}<div class="tp-sum-total"><span>합계</span>${T(total)}</div>`);
const ITEMS = [['TOEIC 실전 모의고사 1000제', '교재 · 2권 세트', '38,000원'], ['단어 암기 카드', '교구 · 1개', '12,000원'], ['오답 노트 3권', '문구 · 3개', '9,000원']];

/* 1. 결제 폼 (긴 폼 + 고정 요약) -------------------------------- */
const payment = () => {
  const css = FORM_CSS + `
  .tp-pay { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); width: min(100%, 1080px); margin-inline: auto; }
  @media (min-width: 1024px) { .tp-pay { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; } .tp-pay__aside { position: sticky; top: var(--ybm-space-x6); } }
`;
  const body = `<div class="tp-app"><main class="tp-content">
  <div class="tp-pay">
    <div class="tp-form">
      <div class="tp-stack"><h1 class="tp-h1">결제 요청</h1><p class="tp-sub">주문 내용을 확인하고 결제를 끝내 주세요. 모든 결제는 암호화되어 안전하게 처리돼요.</p></div>
      ${divider()}
      ${card(`<div class="tp-between"><span class="tp-h4">로그인하고 결제하기</span>${btn('로그인')}</div><p class="tp-sub">로그인하면 주문을 추적하고 정보를 저장해 다음에 더 빨리 결제할 수 있어요.</p>`)}
      <h2 class="tp-legend-t">연락처</h2>
      ${req('f-mail', '이메일', inp('f-mail', 'you@example.com', 'type="email"'))}
      ${checkbox('새 소식과 혜택을 이메일로 받기')}
      <h2 class="tp-legend-t">배송 정보</h2>
      <div class="tp-pair">${req('f-name', '받는 사람', inp('f-name', '홍길동'))}${field('f-phone', '휴대폰 번호', inp('f-phone', '010-0000-0000', 'type="tel"'))}</div>
      ${req('f-addr', '주소', inp('f-addr', '서울시 종로구 종로 104'))}
      <div class="tp-pair">${field('f-addr2', '상세 주소', inp('f-addr2', '3층'))}${req('f-zip', '우편번호', inp('f-zip', '03190'))}</div>
      ${field('f-req', '배송 요청', sel('f-req', '문 앞에 놓아 주세요'))}
      ${checkbox('다음에도 이 배송지 쓰기', { checked: true })}
      <h2 class="tp-legend-t">결제 수단</h2>
      ${radios('pay', ['신용·체크 카드', '간편 결제', '계좌 이체'], 0)}
      <div class="tp-pair">${req('f-card', '카드 번호', inp('f-card', '0000 0000 0000 0000', 'inputmode="numeric"'))}<div class="tp-pair">${req('f-exp', '유효 기간', inp('f-exp', 'MM/YY'))}${req('f-cvc', 'CVC', inp('f-cvc', '123'))}</div></div>
      ${checkbox('주문 내용을 확인했고 결제에 동의해요')}
    </div>
    <aside class="tp-pay__aside tp-stack" style="gap: var(--ybm-space-x4)">
      ${summary(ITEMS, [['상품 금액', '59,000원'], ['배송비', '3,000원'], ['할인', '-5,000원']], '57,000원')}
      ${btn('57,000원 결제하기', { variant: 'brandSolid', size: 'large', fill: true })}
      <p class="tp-caption" style="text-align:center">${icon('lock', 'sm')} 결제 정보는 저장하지 않아요</p>
    </aside>
  </div>
</main></div>`;
  return { slug: 'payment-form', canvas: false, en: 'Checkout Form', name: '결제 폼', group: 'Form', desc: '긴 결제 폼 옆에 주문 요약을 고정해 두는 화면입니다. 입력이 바뀌면 요약이 다시 계산되고, 마지막에 합계를 확인하고 결제합니다.', css, body };
};

/* 2. 결제 단계 (장바구니 → 결제) -------------------------------- */
const checkoutWizard = () => {
  const css = FORM_CSS + `
  .tp-cw { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); width: min(100%, 1120px); margin-inline: auto; }
  @media (min-width: 1024px) { .tp-cw { grid-template-columns: minmax(0, 1fr) 360px; align-items: start; } .tp-cw__aside { position: sticky; top: var(--ybm-space-x6); } }
  .tp-cart { display: grid; grid-template-columns: 72px minmax(0, 1fr); gap: var(--ybm-space-x4); padding-block: var(--ybm-space-x4); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-cart .ds-imageframe { border-radius: var(--ybm-shape-md); }
  .tp-promo { display: flex; gap: var(--ybm-space-x2); align-items: flex-end; }
  .tp-promo .ds-field { flex: 1 1 auto; }
`;
  const qty = (n) => `<div class="ds-quantity" data-size="small"><button type="button" class="ds-quantity__btn" aria-label="수량 줄이기">${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="${n}" aria-label="수량"><button type="button" class="ds-quantity__btn" aria-label="수량 늘리기">${icon('plus')}</button></div>`;
  const cart = [['TOEIC 실전 모의고사 1000제', '교재 · 2권 세트 · 권당 19,000원', 2, '38,000원'], ['단어 암기 카드', '교구 · 개당 12,000원', 1, '12,000원'], ['오답 노트', '문구 · 권당 3,000원', 3, '9,000원'], ['형광펜 5색 세트', '문구 · 개당 4,500원', 1, '4,500원']];
  const body = `<div class="tp-app"><main class="tp-content">
  <div class="tp-cw">
    <div class="tp-form">
      <div class="tp-row" style="justify-content: space-between; flex-wrap: wrap"><h1 class="tp-h1">결제</h1><span class="tp-row tp-sub">${icon('lock', 'sm')}안전한 결제</span></div>
      ${stepper(['장바구니', '배송', '결제', '확인'], 0, '결제 단계')}
      <h2 class="tp-h2">장바구니 확인</h2>
      <div>${cart.map(([n, d, q, p]) => `<div class="tp-cart">${thumb('1:1')}<div class="tp-stack" style="gap: var(--ybm-space-x2)"><div class="tp-between"><span class="tp-h4">${n}</span>${T(p)}</div><span class="tp-caption">${d}</span><div class="tp-row">${qty(q)}${btn('빼기', { variant: 'ghost', ic: 'trash', size: 'xsmall' })}</div></div></div>`).join('')}</div>
      <div class="tp-promo">${field('promo', '할인 코드', inp('promo', 'WELCOME10'))}${btn('적용', { size: 'medium' })}</div>
      <div class="tp-between">${btn('쇼핑 계속하기', { variant: 'ghost', ic: 'chevron-left', size: 'medium' })}${btn('배송 정보 입력', { variant: 'brandSolid', size: 'medium', icEnd: 'arrow-right' })}</div>
    </div>
    <aside class="tp-cw__aside">${summary(cart.map(([n, d, q, p]) => [n, d.split(' · ')[0] + ' · ' + q + '개', p]), [['상품 금액', '63,500원'], ['배송비', '3,000원'], ['할인', '-6,350원']], '60,150원')}</aside>
  </div>
</main></div>`;
  return { slug: 'checkout-wizard', canvas: false, en: 'Checkout Wizard', name: '결제 단계', group: 'Form', desc: '장바구니, 배송, 결제, 확인을 단계로 나눈 결제 화면입니다. 답이 바뀔 때마다 오른쪽 요약이 다시 계산되고, 좁은 화면에서는 요약이 아래로 내려갑니다.', css, body };
};

/* 3. 문의 폼 ----------------------------------------------------- */
const contact = () => {
  const css = FORM_CSS + `
  .tp-contact { display: flex; flex-direction: column; gap: var(--ybm-space-x8); width: min(100%, 800px); margin-inline: auto; padding-block: var(--ybm-space-x8); }
  .tp-why { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-why > .ds-icon { color: var(--ybm-color-fg-brand); }
  .tp-hero-t { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
`;
  const reasons = [['rocket', '빠르게 움직여요', '군더더기 없이 바로 일을 시작해요.'], ['users', '한 팀처럼 일해요', '담당자 한 명이 처음부터 끝까지 함께해요.'], ['shield-check', '결과로 말해요', '약속한 일정과 품질을 지켜요.']];
  const goals = ['단체 수강', '시험 접수 대행', '사내 어학 교육', '레벨 테스트', '교재 납품', '맞춤 강좌 제작', '학습 플랫폼 도입', '제휴', '기타'];
  const body = `<div class="tp-app"><main class="tp-content"><div class="tp-contact">
  <div class="tp-stack" style="gap: var(--ybm-space-x3); text-align: center; align-items: center"><span class="tp-hero-t">함께 일해요</span><span class="tp-sub" style="max-width: 520px">어떤 일을 준비하고 계신지 조금만 알려 주세요. 담당자가 하루 안에 연락드릴게요.</span></div>
  <div class="tp-g3">${reasons.map(([ic, t, d]) => card(`<div class="tp-why">${icon(ic, 'lg')}<span class="tp-h4">${t}</span><span class="tp-sub">${d}</span></div>`)).join('')}</div>
  <form class="tp-form" onsubmit="return false">
    <div class="tp-pair">${req('c-name', '이름', inp('c-name', '이름'))}${req('c-mail', '이메일', inp('c-mail', 'you@company.com', 'type="email"'))}</div>
    <div class="tp-pair">${field('c-com', '회사', inp('c-com', '회사 이름'))}${field('c-tel', '연락처', inp('c-tel', '전화번호', 'type="tel"'))}</div>
    ${divider()}
    <fieldset class="tp-stack" style="border:0;padding:0;margin:0;gap:var(--ybm-space-x3)"><legend class="tp-legend-t" style="margin-bottom:var(--ybm-space-x3)">어떤 일이 필요하세요?</legend><div class="tp-chips">${goals.map((g, i) => chip(g, { on: i === 0 || i === 2 })).join('')}</div></fieldset>
    <div class="tp-pair">${field('c-when', '언제쯤 시작하고 싶으세요?', sel('c-when', '한 달 안에'))}${field('c-budget', '예산은 어느 정도인가요?', sel('c-budget', '1,000만~3,000만원'))}</div>
    <fieldset class="ds-field" style="border:0;padding:0;margin:0"><legend class="ds-field__label" style="margin-bottom:var(--ybm-space-x2)">어떻게 알게 되셨나요?</legend>${radios('src', ['소셜 미디어', '검색', '지인 추천', '행사·세미나', '기사', '기타'], 1)}</fieldset>
    ${field('c-msg', '더 하고 싶은 말', textarea('c-msg', 'rows="4" placeholder="무엇이든 편하게 적어 주세요"'))}
    ${checkbox('예산 결정 권한이 있어요')}
    ${btn('보내기', { variant: 'brandSolid', size: 'large', fill: true, attrs: 'type="submit"' }).replace('type="button" ', '')}
    <p class="tp-caption" style="text-align:center">보내면 ${link('개인정보 처리방침')}에 동의한 것으로 봐요.</p>
  </form>
</div></main></div>`;
  return { slug: 'contact-form', canvas: false, en: 'Contact Form', name: '문의 폼', group: 'Form', desc: '글칸, 알약 버튼, 고르기, 긴 글을 섞은 한 줄 폼입니다. 단계도 갈림도 요약도 없이 맨 아래 전체 폭 보내기 버튼 하나로 끝납니다.', css, body };
};

/* 4. 대화상자 단계 폼 ------------------------------------------ */
const dialogWizard = () => {
  const css = FORM_CSS + `
  .tp-under { opacity: .55; pointer-events: none; }
  .tp-modal { position: fixed; inset: 0; z-index: var(--ybm-z-dialog); display: grid; place-items: center; padding: var(--ybm-space-x4); background: var(--ybm-color-bg-overlay); }
  .tp-modal .ds-dialog { position: static; display: flex; opacity: 1; transform: none; animation: none; width: min(560px, 100%); max-height: calc(100vh - var(--ybm-space-x8)); margin: 0; box-shadow: var(--ybm-elevation-5, 0 16px 48px rgb(0 0 0 / .24)); }
  .tp-modal .ds-dialog__body { display: flex; flex-direction: column; gap: var(--ybm-space-x5); overflow: auto; }
  .tp-dlg-steps { padding: 0 var(--ybm-space-x5) var(--ybm-space-x2); }
  .tp-modal .ds-dialog__footer { flex-direction: row; justify-content: space-between; box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); padding-block: var(--ybm-space-x4); }
  .tp-modal .ds-dialog__footer > .ds-btn { width: auto; }
`;
  const secs = [['핵심 요약', '주요 숫자와 지난주 대비 변화', 1], ['파이프라인 단계', '단계별 건수와 금액', 1], ['새로 생긴 기회', '이번 주 새로 들어온 건', 0], ['잃은 기회', '사유와 금액', 0], ['담당자별 순위', '담당자별 성과', 1]];
  const body = `<div class="tp-app">
<div class="tp-under" aria-hidden="true">${head('리포트', { sub: '정기 리포트 4개', tools: btn('리포트 예약', { variant: 'neutralSolid', ic: 'plus' }) })}<main class="tp-content"><div class="tp-g3">${['주간 수강 현황', '월간 매출', '기업 고객 리포트'].map((t) => card(`<span class="tp-h4">${t}</span><span class="tp-sub">매주 월요일 오전 9시</span>`)).join('')}</div></main></div>
<div class="tp-modal">
  <div class="ds-dialog" open role="dialog" aria-modal="true" aria-labelledby="dlg-t">
    <div class="ds-dialog__header"><h2 class="ds-dialog__title" id="dlg-t">리포트 예약</h2><button type="button" class="ds-dialog__close" aria-label="닫기"></button></div>
    <div class="tp-dlg-steps">${stepper(['리포트', '일정', '받는 사람', '확인'], 0, '리포트 예약 단계')}</div>
    <div class="ds-dialog__body">
      ${req('r-name', '리포트 이름', inp('r-name', '주간 수강 현황', 'value="주간 수강 현황"'), '이메일 제목으로 써요.')}
      ${field('r-data', '데이터', sel('r-data', '수강과 결제'))}
      <fieldset class="ds-field" style="border:0;padding:0;margin:0"><legend class="ds-field__label">넣을 내용</legend>${secs.map(([t, d, c]) => opt(t, d, !!c)).join('')}</fieldset>
    </div>
    <div class="ds-dialog__footer">${btn('취소', { size: 'medium' })}<span></span>${btn('다음', { variant: 'brandSolid', size: 'medium', icEnd: 'arrow-right' })}</div>
  </div>
</div>
</div>`;
  return { slug: 'form-wizard-dialog', en: 'Dialog Wizard', name: '대화상자 단계 폼', group: 'Form', desc: '아래 화면은 그대로 둔 채 대화상자 안에서 짧은 단계를 밟는 폼입니다. 작은 단계 표시와 아래쪽에 고정된 버튼 줄이 있습니다.', css, body };
};

/* 5. 단계 폼 (가로 진행) ---------------------------------------- */
const wizard = () => {
  const css = FORM_CSS + `
  .tp-wz { display: flex; flex-direction: column; gap: var(--ybm-space-x6); width: min(100%, 640px); margin-inline: auto; }
  .tp-wz-head { display: flex; flex-direction: column; gap: var(--ybm-space-x5); padding: var(--ybm-space-x5) var(--ybm-space-x4); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-wz-head { padding: var(--ybm-space-x6); } }
  .tp-prefix { display: flex; align-items: center; gap: 0; }
  .tp-prefix > span { padding: 0 var(--ybm-space-x3); height: 48px; display: grid; place-items: center; border-radius: var(--ybm-shape-md) 0 0 var(--ybm-shape-md); background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t04); white-space: nowrap; }
  .tp-prefix .ds-input { flex: 1 1 auto; border-top-left-radius: 0; border-bottom-left-radius: 0; }
`;
  const body = `<div class="tp-app" style="min-height: 100vh">
<header class="tp-wz-head"><div class="tp-between"><h1 class="tp-h1">워크스페이스 만들기</h1>${btn('나가기', { variant: 'ghost', ic: 'x' })}</div>${stepper(['워크스페이스', '팀원 초대', '요금제', '확인'], 0, '워크스페이스 만들기 단계')}</header>
<main class="tp-content"><div class="tp-wz">
  <div class="tp-stack"><h2 class="tp-h2">워크스페이스 정보</h2><p class="tp-sub">이름을 정하고 데이터를 둘 지역을 고르세요. 지역은 나중에 바꿀 수 없어요.</p></div>
  <div class="tp-form">
    ${req('w-name', '워크스페이스 이름', inp('w-name', '가나다 학원'))}
    ${req('w-url', '워크스페이스 주소', `<div class="tp-prefix"><span>ybm.app/</span>${inp('w-url', 'ganada')}</div>`, '영문 소문자, 숫자, 하이픈만 쓸 수 있어요.')}
    ${field('w-region', '데이터 지역', sel('w-region', '대한민국 (서울)'), { help: '강좌, 파일, 기록이 저장되는 곳이에요.' })}
    <fieldset class="ds-field" style="border:0;padding:0;margin:0"><legend class="ds-field__label">누가 들어올 수 있나요</legend>${[['초대한 사람만', '관리자가 초대해야 들어올 수 있어요.', 1], ['회사 이메일이 있는 사람', '@ganada.kr 이메일이면 바로 들어와요.', 0], ['링크가 있는 사람', '초대 링크를 아는 사람은 누구나 들어와요.', 0]].map(([t, d, c]) => opt(t, d, !!c, 'radio', 'join')).join('')}</fieldset>
  </div>
</div></main>
<footer class="tp-footer-bar" style="position: sticky; bottom: 0"><span class="tp-sub tp-num">4단계 중 1단계</span><div class="tp-row">${btn('이전', { size: 'medium', attrs: 'disabled' })}${btn('다음', { variant: 'brandSolid', size: 'medium', icEnd: 'arrow-right' })}</div></footer>
</div>`;
  return { slug: 'form-wizard', en: 'Form Wizard', name: '단계 폼', group: 'Form', desc: '한 번에 한 칸씩 넘어가는 여러 단계 폼입니다. 진행 표시를 위쪽 가로로 두어 모든 단계가 전체 폭을 쓰고, 아래 버튼 줄은 고정됩니다.', css, body };
};

/* 6. 펼치는 단계 폼 (아코디언) ---------------------------------- */
const inlineWizard = () => {
  const css = FORM_CSS + `
  .tp-iw { width: min(100%, 720px); margin-inline: auto; }
  .tp-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .tp-step { display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: var(--ybm-space-x4); }
  .tp-step__rail { display: flex; flex-direction: column; align-items: center; }
  .tp-step__rail::after { content: ""; flex: 1 1 auto; width: 2px; margin-block: var(--ybm-space-x1); background: var(--ybm-color-stroke-neutral-muted); }
  .tp-step:last-child .tp-step__rail::after { display: none; }
  .tp-step__no { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); font-weight: var(--ybm-font-weight-semibold); }
  .tp-step[data-state="done"] .tp-step__no { background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); }
  .tp-step[data-state="current"] .tp-step__no { box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-brand-solid); background: var(--ybm-color-bg-layer-default); color: var(--ybm-color-fg-brand); }
  .tp-step__main { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding-bottom: var(--ybm-space-x6); min-width: 0; }
  .tp-step__head { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); min-height: 28px; }
`;
  const steps = [['저장소', 'done', '가나다/학습-웹 · main 브랜치'], ['실행 조건', 'current', ''], ['빌드 환경', '', ''], ['테스트', '', ''], ['배포 대상', '', ''], ['알림', '', ''], ['확인', '', '']];
  const cur = `<div class="tp-form">${field('ci-ev', '파이프라인을 돌릴 때', `<div>${[['풀 리퀘스트', '열린 풀 리퀘스트가 있는 브랜치에 올릴 때마다', 1], ['기본 브랜치에 올릴 때', 'main 브랜치에 합쳐질 때', 1], ['태그를 만들 때', 'v로 시작하는 태그를 만들 때', 0], ['정해진 시간', '매일 새벽 3시', 0]].map(([t, d, c]) => opt(t, d, !!c)).join('')}</div>`, { help: '고르는 일마다 빌드 시간이 들어요. 꼭 필요한 것부터 고르세요.' })}<div>${btn('다음', { variant: 'brandSolid', size: 'medium' })}</div></div>`;
  const body = `<div class="tp-app">
${head('지속 통합 설정', { sub: '앞의 두 단계만 답하면 나머지는 알아서 채워져요.' })}
<main class="tp-content"><div class="tp-iw"><ol class="tp-steps" aria-label="지속 통합 설정 단계">${steps.map(([t, st, res], i) => `<li class="tp-step" data-state="${st}"${st === 'current' ? ' aria-current="step"' : ''}><div class="tp-step__rail"><span class="tp-step__no">${st === 'done' ? icon('check', 'sm') : i + 1}</span></div><div class="tp-step__main"><div class="tp-step__head"><span class="tp-stack"><span class="tp-h4"${st ? '' : ' style="color: var(--ybm-color-fg-neutral-muted)"'}>${t}</span>${res ? `<span class="tp-caption">${res}</span>` : ''}</span>${st === 'done' ? btn('고치기', { variant: 'ghost', size: 'xsmall', ic: 'pencil' }) : ''}</div>${st === 'current' ? cur : ''}</div></li>`).join('')}</ol></div></main>
</div>`;
  return { slug: 'form-wizard-inline', en: 'Inline Wizard', name: '펼치는 단계 폼', group: 'Form', desc: '모든 단계를 한 줄로 쌓은 아코디언 단계 폼입니다. 지금 단계만 펼쳐지고, 끝난 단계는 결과와 고치기 버튼만 남긴 한 줄로 접힙니다.', css, body };
};

/* 7. 두 칸 폼 --------------------------------------------------- */
const twoColumn = () => {
  const css = FORM_CSS + `
  .tp-tc { display: flex; flex-direction: column; gap: var(--ybm-space-x8); width: min(100%, 1120px); margin-inline: auto; padding-block: var(--ybm-space-x6); }
  .tp-tc__top { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x6); align-items: center; }
  @media (min-width: 1024px) { .tp-tc__top { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .tp-tc__top .ds-imageframe { border-radius: var(--ybm-shape-xl); }
  .tp-hero-t { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
`;
  const topics = ['단체 수강', '시험 접수', '사내 교육', '맞춤 강좌', '학습 플랫폼', '제휴', '취재', '기타'];
  const body = `<div class="tp-app"><main class="tp-content"><div class="tp-tc">
  <div class="tp-tc__top"><div class="tp-stack" style="gap: var(--ybm-space-x3)"><h1 class="tp-hero-t">함께 일해요</h1><p class="tp-sub">어떤 일을 하고 계신지 알려 주시면 맞는 방법을 같이 찾아 드릴게요.</p></div>${thumb('16:9')}</div>
  <div class="tp-g2" style="align-items:start">
    ${card(`<h2 class="tp-h3">내 정보</h2><div class="tp-form">${req('t-name', '이름', inp('t-name', '이름'))}<div class="tp-pair">${req('t-mail', '이메일', inp('t-mail', '이메일', 'type="email"'))}${field('t-com', '회사', inp('t-com', '회사 이름'))}</div><div class="tp-pair">${field('t-job', '직함', inp('t-job', '직함'))}${field('t-tel', '연락처', inp('t-tel', '전화번호', 'type="tel"'))}</div></div>`, { size: '' })}
    ${card(`<h2 class="tp-h3">문의 내용</h2><div class="tp-form"><fieldset class="tp-stack" style="border:0;padding:0;margin:0;gap:var(--ybm-space-x2)"><legend class="ds-field__label" style="margin-bottom:var(--ybm-space-x2)">무엇에 관한 문의인가요?</legend><div class="tp-chips">${topics.map((t, i) => chip(t, { on: i === 0 })).join('')}</div></fieldset>${field('t-budget', '예산 범위', sel('t-budget', '1,000만원 미만'))}${req('t-msg', '자세한 내용', textarea('t-msg', 'rows="5" placeholder="일정, 인원, 바라는 결과를 적어 주세요"'))}${btn('보내기', { variant: 'brandSolid', size: 'large', fill: true })}</div>`, { size: '' })}
  </div>
  ${divider()}
  <div class="tp-g4">${[['일반 문의', 'hello@company.com'], ['기업 영업', 'sales@company.com'], ['언론', 'press@company.com'], ['고객 지원', 'help@company.com']].map(([t, m]) => `<div class="tp-stack"><span class="tp-h4">${t}</span>${link(m, 'mailto:' + m)}</div>`).join('')}</div>
</div></main></div>`;
  return { slug: 'form-two-column', en: 'Two-column Form', name: '두 칸 폼', group: 'Form', desc: '큰 제목 아래를 두 칸으로 나눈 폼입니다. 한쪽에 내 정보, 다른 쪽에 문의 내용을 두고 맨 아래 연락처 줄로 마무리합니다.', css, body };
};

/* 8. 세로 단계 폼 (왼쪽 단계 + 오른쪽 도움말) -------------------- */
const vertical = () => {
  const css = FORM_CSS + `
  .tp-vw { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1024px) { .tp-vw { grid-template-columns: 260px minmax(0, 1fr) 320px; } }
  .tp-vw__steps { padding: var(--ybm-space-x5) var(--ybm-space-x4); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-vw__steps { padding: var(--ybm-space-x6); box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); } .tp-vw__steps .ds-stepper { position: sticky; top: var(--ybm-space-x6); } }
  .tp-vw__main { display: flex; flex-direction: column; gap: var(--ybm-space-x6); width: min(100%, 640px); margin-inline: auto; padding: var(--ybm-space-x6) var(--ybm-space-x4) var(--ybm-space-x12); }
  .tp-vw__help { display: none; }
  @media (min-width: 1024px) { .tp-vw__help { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x6); box-shadow: inset 1px 0 0 var(--ybm-color-stroke-neutral-muted); } }
  .tp-num-input { max-width: 160px; }
`;
  const body = `<div class="tp-app">
<header class="tp-head" style="align-items: center"><span class="tp-h4">오디오북 출판</span><div class="tp-row">${btn('임시 저장', { ic: 'save' })}${btn('나가기', { variant: 'ghost', ic: 'x' })}</div></header>
<div class="tp-vw">
  <nav class="tp-vw__steps" aria-label="출판 단계">${stepper(['저자 정보', '책 정보', '표지와 샘플', '오디오 파일', '가격과 판매', '검토와 출판'], 1, '출판 단계').replace('class="ds-stepper"', 'class="ds-stepper" data-orientation="vertical"')}</nav>
  <main class="tp-vw__main">
    <div class="tp-stack"><h1 class="tp-h1">책 정보</h1><p class="tp-sub">독자가 책을 찾는 데 도움이 되는 정보를 넣어 주세요.</p><p class="tp-caption">필수 칸을 채워야 다음으로 넘어갈 수 있어요.</p></div>
    <div class="tp-form">
      ${req('b-title', '책 제목', inp('b-title', '', 'value="한 달 만에 끝내는 비즈니스 영어"'), '서점에 보일 그대로 적어 주세요.')}
      ${field('b-sub', '부제', inp('b-sub', '선택 사항'))}
      ${req('b-author', '지은이', inp('b-author', '', 'value="김서윤"'))}
      ${field('b-narr', '읽은 사람', inp('b-narr', '성우 이름'))}
      <div class="tp-pair">${field('b-ed', '판', inp('b-ed', '2판'))}${field('b-lang', '언어', sel('b-lang', '한국어'))}</div>
      <div class="tp-pair">${field('b-series', '시리즈', inp('b-series', '시리즈 이름'), { help: '없는 시리즈면 새로 만들어요.' })}${field('b-no', '시리즈 순서', `<div class="tp-num-input">${inp('b-no', '1', 'type="number" min="1"')}</div>`, { help: '읽는 순서에서 몇 번째인지 적어요.' })}</div>
      ${req('b-desc', '소개', textarea('b-desc', 'rows="5" placeholder="장르보다 이 책만의 매력을 먼저 적어 주세요"'), '독자가 맨 먼저 읽는 글이에요.')}
    </div>
    <div class="tp-between">${btn('이전', { size: 'medium', ic: 'chevron-left' })}${btn('다음', { variant: 'brandSolid', size: 'medium', icEnd: 'arrow-right' })}</div>
  </main>
  <aside class="tp-vw__help" aria-labelledby="h-t">
    <h2 class="tp-h4" id="h-t">${icon('lightbulb', 'sm')} 책 제목 쓰는 법</h2>
    <p class="tp-sub">표지에 적힌 제목과 똑같이 적어 주세요. 홍보 문구나 할인 정보를 제목에 넣으면 심사에서 돌려보낼 수 있어요.</p>
    ${K.callout('예시', '좋음: 한 달 만에 끝내는 비즈니스 영어 · 나쁨: [50% 할인] 비즈니스 영어 최고의 책', 'informative', 'info-solid')}
    <p class="tp-caption">입력칸을 옮겨 가면 이 안내도 그 칸에 맞게 바뀌어요.</p>
  </aside>
</div>
</div>`;
  return { slug: 'form-wizard-vertical', en: 'Vertical Wizard', name: '세로 단계 폼', group: 'Form', desc: '단계를 왼쪽 세로 막대에 고정하고, 오른쪽 패널의 도움말이 지금 고른 칸을 따라 바뀌는 여러 단계 폼입니다. 칸이 많은 긴 입력에 맞습니다.', css, body };
};

export const templates = [payment, checkoutWizard, contact, dialogWizard, wizard, inlineWizard, twoColumn, vertical].map((f) => f());

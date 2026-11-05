import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, card, field, input, select, checkbox, sw, divider, link, search, avatar, esc } = K;
const inp = (id, v, attrs = '') => input(id, `value="${esc(v)}" ${attrs}`);
const sel = (id, v) => select(v, { id, size: 'medium' });

const CSS = `
  .tp-snav { display: flex; flex-direction: column; gap: var(--ds-space-x1); }
  .tp-snav__group { font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); padding: var(--ds-space-x3) var(--ds-space-x2) var(--ds-space-x1); }
  .tp-snav__item { display: flex; align-items: center; gap: var(--ds-space-x2); width: 100%; min-height: 36px; padding: 0 var(--ds-space-x2); border: 0; border-radius: var(--ds-shape-sm); background: none; color: var(--ds-color-fg-neutral-muted); font: inherit; font-size: var(--ds-font-size-t04); text-align: left; text-decoration: none; cursor: pointer; }
  .tp-snav__item:hover { background: var(--ds-color-bg-transparent-pressed); }
  .tp-snav__item[aria-current="page"] { background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-semibold); }
  .tp-srow { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); padding-block: var(--ds-space-x4); }
  .tp-srow + .tp-srow { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-srow { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; } }
  .tp-srow__label { display: flex; gap: var(--ds-space-x3); align-items: flex-start; }
  .tp-srow__label > .ds-icon { margin-top: 2px; color: var(--ds-color-fg-neutral-muted); }
`;
const nav = (groups, cur) => `<nav class="tp-snav" aria-label="설정 메뉴">${groups.map(([g, items]) => `${g ? `<span class="tp-snav__group">${g}</span>` : ''}${items.map(([t, ic]) => `<a class="tp-snav__item" href="#"${t === cur ? ' aria-current="page"' : ''}>${ic ? icon(ic, 'sm') : ''}${t}</a>`).join('')}`).join('')}</nav>`;
const row = (ic, t, d, control) => `<div class="tp-srow"><div class="tp-srow__label">${icon(ic, 'sm')}<span class="tp-stack"><span class="tp-h4">${t}</span><span class="tp-sub">${d}</span></span></div><div>${control}</div></div>`;

/* 1. 설정 대화상자 ---------------------------------------------- */
const dialog = () => {
  const css = CSS + `
  .tp-under { opacity: .5; pointer-events: none; }
  .tp-modal { position: fixed; inset: 0; z-index: var(--ds-z-dialog); display: grid; place-items: center; padding: var(--ds-space-x4); background: var(--ds-color-bg-overlay); }
  .tp-sdlg { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); width: min(960px, 100%); height: min(680px, calc(100vh - var(--ds-space-x8))); overflow: hidden; border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-floating); box-shadow: 0 16px 48px var(--ds-color-palette-static-black-alpha-600); }
  @media (min-width: 768px) { .tp-sdlg { grid-template-columns: 240px minmax(0, 1fr); } }
  .tp-sdlg__side { display: none; flex-direction: column; gap: var(--ds-space-x3); padding: var(--ds-space-x5) var(--ds-space-x3); overflow: auto; background: var(--ds-color-bg-neutral-subtle); box-shadow: inset -1px 0 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 768px) { .tp-sdlg__side { display: flex; } }
  .tp-sdlg__main { display: flex; flex-direction: column; gap: var(--ds-space-x5); padding: var(--ds-space-x6); overflow: auto; }
  .tp-sdlg__close { position: absolute; top: var(--ds-space-x3); right: var(--ds-space-x3); }
`;
  const groups = [['계정', [['프로필', 'user'], ['로그인과 보안', 'lock'], ['연결된 계정', 'link-2']]], ['환경', [['화면', 'sun'], ['언어와 지역', 'globe'], ['접근성', 'eye']]], ['알림', [['이메일', 'mail'], ['앱 푸시', 'bell']]], ['워크스페이스', [['멤버', 'users'], ['결제', 'credit-card']]]];
  const body = `<div class="tp-app">
<div class="tp-under" aria-hidden="true">${K.head('홈', { sub: '오늘 할 일 4개' })}<main class="tp-content"><div class="tp-g3">${['오늘 수업', '과제', '공지'].map((t) => card(`<span class="tp-h4">${t}</span><span class="tp-sub">내용 자리</span>`)).join('')}</div></main></div>
<div class="tp-modal"><div class="tp-sdlg" role="dialog" aria-modal="true" aria-labelledby="sd-t">
  <aside class="tp-sdlg__side"><h2 class="tp-h4" style="padding-inline: var(--ds-space-x2)">설정</h2>${search('sq', '설정 찾기', 'small')}${nav(groups, '프로필')}</aside>
  <div class="tp-sdlg__main">
    <span class="tp-sdlg__close">${iconBtn('x', '닫기')}</span>
    <div class="tp-stack"><h2 class="tp-h2" id="sd-t">프로필</h2><p class="tp-sub">워크스페이스의 다른 사람에게 보이는 내 모습이에요.</p></div>
    <span class="tp-caption">기본 정보</span>
    ${card(`<div>${row('user', '표시 이름', '글, 댓글, 멘션에 보여요.', inp('d-name', '와이비엠', 'aria-label="표시 이름"'))}${row('id-card', '직함', '프로필 카드에 이름과 함께 보여요.', inp('d-job', '교육 운영 매니저', 'aria-label="직함"'))}${row('at-sign', '아이디', '멘션할 때 쓰는 이름이에요.', inp('d-id', 'ybm', 'aria-label="아이디"'))}${row('image', '프로필 사진', '정사각형 사진이 가장 잘 보여요.', `<div class="tp-row">${avatar('와이비엠', 48)}${btn('사진 바꾸기')}${btn('지우기', { variant: 'ghost' })}</div>`)}</div>`)}
    <span class="tp-caption">표시</span>
    ${card(`<div>${row('clock', '시간대', '알림과 일정이 이 시간에 맞춰 보여요.', sel('d-tz', '서울 (GMT+9)'))}${row('eye', '온라인 상태 보이기', '다른 사람이 내가 접속 중인지 볼 수 있어요.', sw('온라인 상태 보이기', true))}</div>`)}
  </div>
</div></div>
</div>`;
  return { slug: 'settings-dialog', en: 'Settings Dialog', name: '설정 대화상자', group: 'Settings', desc: '보던 화면을 떠나지 않고 창 안에서 설정을 바꾸는 화면입니다. 바꾼 값은 바로 적용됩니다.', css, body };
};

/* 2. 설정 폼 (한 장으로 이어지는) ------------------------------ */
const form = () => {
  const css = CSS + `
  .tp-sf { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1024px) { .tp-sf { grid-template-columns: 240px minmax(0, 1fr); } }
  .tp-sf__side { display: none; padding: var(--ds-space-x6) var(--ds-space-x4); box-shadow: inset -1px 0 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-sf__side { display: block; } .tp-sf__side .tp-snav { position: sticky; top: var(--ds-space-x6); } }
  .tp-ssec { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); }
  @media (min-width: 1024px) { .tp-ssec { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: var(--ds-space-x10); } }
  .tp-ssec__fields { display: flex; flex-direction: column; gap: var(--ds-space-x4); max-width: 560px; }
  .tp-ssec__fields > .ds-btn { align-self: flex-start; }
  .tp-cbd { display: flex; flex-direction: column; gap: 2px; }
  .tp-search-w { width: min(100%, 320px); }
`;
  const items = ['기본 정보', '비밀번호', '알림', '개인정보', '연결된 앱', '결제', '고급 설정'];
  const sec = (t, d, fields, act) => `<section class="tp-ssec"><div class="tp-stack"><h2 class="tp-h3">${t}</h2><p class="tp-sub">${d}</p></div><div class="tp-ssec__fields">${fields}${btn(act, { variant: 'neutralSolid', size: 'medium' })}</div></section>`;
  const cb = (t, d, on) => `<label class="ds-checkbox" style="align-items:flex-start"><input type="checkbox" class="ds-checkbox__control"${on ? ' checked' : ''}><span class="tp-cbd"><span class="ds-checkbox__label">${t}</span><span class="tp-sub">${d}</span></span></label>`;
  const body = `<div class="tp-app">
<header class="tp-head" style="align-items: flex-end"><h1 class="tp-h1">설정</h1><div class="tp-search-w">${field('s-q', '찾기', search('s-q', '설정 찾기…'))}</div></header>
<div class="tp-sf">
  <aside class="tp-sf__side">${nav([['', items.map((t) => [t])]], '기본 정보')}</aside>
  <main class="tp-content">
    ${sec('기본 정보', '내 정보와 계정 정보를 보고 바꿀 수 있어요.', `${field('u-id', '아이디', inp('u-id', 'ybm'))}${field('u-name', '이름', inp('u-name', '와이비엠'))}${field('u-mail', '이메일', inp('u-mail', 'ybm@example.com', 'type="email"'))}${field('u-tel', '휴대폰', inp('u-tel', '010-1234-5678', 'type="tel"'))}${field('u-lang', '언어', sel('u-lang', '한국어'))}`, '저장')}
    ${K.divider()}
    ${sec('비밀번호 변경', '계정을 안전하게 지키려면 비밀번호를 주기적으로 바꿔 주세요.', `${field('p-cur', '지금 비밀번호', input('p-cur', 'type="password"'))}${field('p-new', '새 비밀번호', input('p-new', 'type="password"'), { help: '8자 이상, 영문과 숫자를 섞어 주세요.' })}${field('p-new2', '새 비밀번호 확인', input('p-new2', 'type="password"'))}`, '비밀번호 변경')}
    ${K.divider()}
    ${sec('고급 설정', '계정의 자세한 설정과 보안 옵션이에요.', `${cb('데이터 내보내기 허용', '내 학습 기록과 백업을 내려받을 수 있어요.', 1)}${cb('2단계 인증', '로그인할 때 휴대폰으로 한 번 더 확인해요.', 1)}${cb('새 기기 로그인 알림', '처음 쓰는 기기에서 로그인하면 알려 드려요.', 0)}${cb('검색 엔진에 프로필 숨기기', '공개 프로필이 검색 결과에 나오지 않아요.', 0)}`, '설정 저장')}
  </main>
</div>
</div>`;
  return { slug: 'settings', en: 'Settings Form', name: '설정 폼', group: 'Settings', desc: '모든 설정을 한 페이지에 이어 놓은 가장 단순한 설정 화면입니다. 설정 항목이 많지 않을 때 씁니다.', css, body };
};

/* 3. 설정 패널 (왼쪽 메뉴로 바꾸는) ---------------------------- */
const panels = () => {
  const css = CSS + `
  .tp-sp { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1024px) { .tp-sp { grid-template-columns: 280px minmax(0, 1fr); } }
  .tp-sp__side { display: flex; flex-direction: column; gap: var(--ds-space-x3); padding: var(--ds-space-x5) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-sp__side { padding: var(--ds-space-x8) var(--ds-space-x5); box-shadow: inset -1px 0 0 var(--ds-color-stroke-neutral-muted); } }
  .tp-sp__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, 720px); padding: var(--ds-space-x6) var(--ds-space-x4) var(--ds-space-x12); }
  @media (min-width: 1024px) { .tp-sp__main { padding: var(--ds-space-x8) var(--ds-space-x10); } }
  .tp-info { display: flex; justify-content: space-between; gap: var(--ds-space-x4); padding-block: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-info__v { color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
`;
  const items = [['개인 정보', 'user'], ['로그인과 보안', 'lock'], ['결제와 환불', 'credit-card'], ['알림', 'bell'], ['개인정보 보호', 'shield-check'], ['학습 설정', 'book-open'], ['언어와 지역', 'globe'], ['연결된 기기', 'smartphone'], ['기업 계정', 'building']];
  const info = [['실명', '와이비엠', 1], ['닉네임', '입력하지 않음', 1], ['이메일', 's***n@example.com', 1], ['휴대폰', '010-****-5678', 1], ['본인 인증', badge('인증 완료', 'positive'), 0], ['집 주소', '입력하지 않음', 1], ['우편물 받을 주소', '입력하지 않음', 1], ['비상 연락처', '입력함', 1]];
  const body = `<div class="tp-app">
<div class="tp-sp">
  <aside class="tp-sp__side"><h2 class="tp-h2">계정 설정</h2>${nav([['', items]], '개인 정보')}${divider()}${nav([['', [['로그아웃', 'log-out']]]], '')}</aside>
  <main class="tp-sp__main">
    <h1 class="tp-h1">개인 정보</h1>
    <div>${info.map(([k, v, e]) => `<div class="tp-info"><div class="tp-stack"><span class="tp-h4">${k}</span><span class="tp-info__v">${v}</span></div>${e ? btn('수정', { variant: 'neutralWeak', size: 'xsmall' }) : ''}</div>`).join('')}</div>
    ${card(`<div class="tp-row" style="align-items:flex-start">${icon('info', 'sm')}<div class="tp-stack"><span class="tp-h4">일부 정보가 보이지 않는 이유</span><span class="tp-sub">본인 확인을 위해 일부 정보는 가려서 보여 드려요. 가린 정보는 고치기를 누른 뒤 본인 인증을 하면 볼 수 있어요.</span></div></div>`)}
  </main>
</div>
</div>`;
  return { slug: 'settings-sidebar', en: 'Settings Panels', name: '설정 패널', group: 'Settings', desc: '왼쪽 메뉴로 설정 묶음을 오가는 설정 화면입니다. 항목은 그 자리에서 바로 수정합니다.', css, body };
};

export const templates = [dialog, form, panels].map((f) => f());

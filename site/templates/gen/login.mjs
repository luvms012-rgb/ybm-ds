import * as K from './kit.mjs';
const { btn, field, input, link, thumb, esc } = K;
const inp = (id, ph, attrs = '') => input(id, `placeholder="${esc(ph)}" ${attrs}`, { size: 'large' });

const CSS = `
  .tp-auth { display: grid; place-items: center; min-height: 100vh; padding: var(--ds-space-x8) var(--ds-space-x4); background: var(--ds-color-bg-canvas); }
  .tp-auth__wrap { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x6); width: min(100%, 400px); }
  .tp-auth__brand { display: flex; align-items: center; gap: var(--ds-space-x2); font-weight: var(--ds-font-weight-semibold); }
  .tp-auth__card { display: flex; flex-direction: column; gap: var(--ds-space-x5); width: 100%; padding: var(--ds-space-x6); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-muted), 0 1px 2px var(--ds-color-palette-static-black-alpha-200), 0 8px 24px var(--ds-color-palette-static-black-alpha-300); }
  .tp-auth__title { display: flex; flex-direction: column; gap: var(--ds-space-x1); text-align: center; }
  .tp-auth__fields { display: flex; flex-direction: column; gap: var(--ds-space-x4); }
  .tp-or { display: flex; align-items: center; gap: var(--ds-space-x3); color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); }
  .tp-or::before, .tp-or::after { content: ""; flex: 1 1 auto; height: 1px; background: var(--ds-color-stroke-neutral-muted); }
  .tp-auth__alt { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x2); }
  .tp-auth__foot { text-align: center; }
  .tp-legal { max-width: 360px; text-align: center; }
  .tp-pw-head { display: flex; justify-content: space-between; align-items: baseline; }
`;
const brand = `<div class="tp-auth__brand"><span class="tp-logo">로고</span></div>`;
const legal = `<p class="tp-caption tp-legal">계속하면 ${link('이용약관')}과 ${link('개인정보 처리방침')}에 동의한 것으로 봐요.</p>`;
const pw = (id) => `<div class="ds-field"><div class="ds-field__header tp-pw-head"><label class="ds-field__label" for="${id}">비밀번호</label>${link('비밀번호를 잊으셨나요?')}</div>${inp(id, '비밀번호를 입력하세요', 'type="password"')}</div>`;
const alt = `<div class="tp-auth__alt">${btn('카카오', { variant: 'neutralOutline', size: 'large', fill: true, ic: 'message-circle' })}${btn('네이버', { variant: 'neutralOutline', size: 'large', fill: true, ic: 'globe' })}</div>`;

/* 1. 로그인 카드 ------------------------------------------------- */
const loginCard = () => {
  const body = `<main class="tp-auth"><div class="tp-auth__wrap">
  ${brand}
  <div class="tp-auth__card">
    <div class="tp-auth__title"><h1 class="tp-h2">다시 오셨네요</h1><p class="tp-sub">계정에 로그인하세요</p></div>
    <div class="tp-auth__fields">${field('lc-mail', '이메일', inp('lc-mail', 'name@company.com', 'type="email" autocomplete="email"'))}${pw('lc-pw')}</div>
    ${btn('로그인', { variant: 'brandSolid', size: 'large', fill: true })}
    <div class="tp-or">또는</div>
    ${alt}
    <p class="tp-sub tp-auth__foot">계정이 없으신가요? ${link('가입하기')}</p>
  </div>
  ${legal}
</div></main>`;
  return { slug: 'login-card', en: 'Login Card', name: '로그인 카드', group: 'Login', desc: '화면 가운데 카드 하나로 로그인하는 기본 로그인 화면입니다.', css: CSS, body };
};

/* 2. 로그인 (반으로 나눈) --------------------------------------- */
const loginSplit = () => {
  const css = CSS + `
  .tp-split-card { display: grid; grid-template-columns: minmax(0, 1fr); width: min(100%, 960px); overflow: hidden; border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-muted), 0 8px 24px var(--ds-color-palette-static-black-alpha-300); }
  @media (min-width: 768px) { .tp-split-card { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .tp-split-card__form { display: flex; flex-direction: column; gap: var(--ds-space-x6); padding: var(--ds-space-x8) var(--ds-space-x6); }
  .tp-split-card__media { display: none; }
  @media (min-width: 768px) { .tp-split-card__media { display: block; } .tp-split-card__media .ds-imageframe { height: 100%; aspect-ratio: auto; } }
  .tp-split-card__inner { display: flex; flex-direction: column; gap: var(--ds-space-x5); width: min(100%, 340px); margin: auto; }
`;
  const body = `<main class="tp-auth"><div class="tp-auth__wrap" style="width: min(100%, 960px)">
  <div class="tp-split-card">
    <div class="tp-split-card__form">
      ${brand.replace('tp-auth__brand', 'tp-auth__brand" style="align-self:flex-start')}
      <div class="tp-split-card__inner">
        <div class="tp-auth__title" style="text-align:left"><h1 class="tp-h2">다시 오셨네요</h1><p class="tp-sub">서비스 계정으로 로그인하세요</p></div>
        <div class="tp-auth__fields">${field('ls-mail', '이메일', inp('ls-mail', 'name@company.com', 'type="email"'))}${pw('ls-pw')}</div>
        ${btn('로그인', { variant: 'brandSolid', size: 'large', fill: true })}
        <div class="tp-or">또는</div>
        ${alt}
      </div>
      <p class="tp-sub">계정이 없으신가요? ${link('가입하기')}</p>
    </div>
    <div class="tp-split-card__media">${thumb('3:4', '', K.photo('work', 1, 1000), 'none')}</div>
  </div>
  ${legal}
</div></main>`;
  return { slug: 'login-split', en: 'Login Split', name: '로그인 (반으로 나눈)', group: 'Login', desc: '한쪽에는 로그인 폼, 다른 쪽에는 사진을 둔 로그인 화면입니다. 서비스 분위기를 함께 전할 때 씁니다.', css, body };
};

/* 3. 로그인 SSO -------------------------------------------------- */
const loginSso = () => {
  const body = `<main class="tp-auth"><div class="tp-auth__wrap">
  ${brand}
  <div class="tp-auth__card">
    <div class="tp-auth__title"><h1 class="tp-h2">다시 오셨네요</h1><p class="tp-sub">회사 이메일을 넣으면 회사 로그인으로 이어져요</p></div>
    <div class="tp-auth__fields">${field('sso-mail', '회사 이메일', inp('sso-mail', 'you@company.com', 'type="email" autocomplete="email"'), { help: '회사가 등록돼 있으면 회사 로그인 화면으로 바로 넘어가요.' })}${field('sso-pw', '비밀번호', inp('sso-pw', '비밀번호', 'type="password"'))}</div>
    ${link('로그인이 안 되나요?')}
    ${btn('계속', { variant: 'brandSolid', size: 'large', fill: true })}
    <div class="tp-or">또는</div>
    ${btn('회사 계정(SSO)으로 로그인', { variant: 'neutralOutline', size: 'large', fill: true, ic: 'key-round' })}
    <p class="tp-sub tp-auth__foot">계정이 없으신가요? ${link('사용 요청')}</p>
  </div>
</div></main>`;
  return { slug: 'login-sso', en: 'Login SSO', name: '로그인 (SSO)', group: 'Login', desc: '이메일을 먼저 받고 회사 계정 로그인으로 이어 주는 화면입니다. 회사 계정이 없으면 비밀번호로 로그인합니다.', css: CSS, body };
};

export const templates = [loginCard, loginSplit, loginSso].map((f) => f());

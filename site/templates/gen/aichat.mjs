import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, avatar, codeblock, chip, esc } = K;

const CHAT_CSS = `
  .tp-chat { display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: var(--ds-color-bg-layer-default); }
  .tp-chat__body { display: flex; flex: 1 1 auto; min-height: 0; }
  .tp-chat__main { display: flex; flex: 1 1 auto; flex-direction: column; min-width: 0; }
  .tp-log { flex: 1 1 auto; overflow: auto; display: flex; flex-direction: column; gap: var(--ds-space-x5); padding: var(--ds-space-x6) var(--ds-space-x4); }
  .tp-log > * { width: min(100%, 720px); margin-inline: auto; }
  .tp-msg-user { display: flex; flex-direction: column; align-items: flex-end; gap: var(--ds-space-x1_5); }
  .tp-msg-ai { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ds-space-x3); }
  .tp-msg-ai__body { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; }
  .tp-tools { border-radius: var(--ds-shape-lg); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-tools > summary { display: flex; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x2) var(--ds-space-x3); list-style: none; cursor: pointer; font-size: var(--ds-font-size-t03); color: var(--ds-color-fg-neutral-muted); }
  .tp-tools > summary::-webkit-details-marker { display: none; }
  .tp-tools ul { list-style: none; margin: 0; padding: 0 var(--ds-space-x3) var(--ds-space-x2); display: flex; flex-direction: column; gap: var(--ds-space-x1); font-size: var(--ds-font-size-t03); }
  .tp-tools li { display: flex; align-items: center; gap: var(--ds-space-x2); color: var(--ds-color-fg-neutral-muted); }
  .tp-tools li .ds-icon { color: var(--ds-color-fg-positive); }
  .tp-tools code { color: var(--ds-color-fg-neutral); }
  .tp-composer-wrap { padding: var(--ds-space-x3) var(--ds-space-x4) var(--ds-space-x4); }
  .tp-composer-wrap > * { width: min(100%, 720px); margin-inline: auto; }
  .tp-composer { display: flex; flex-direction: column; gap: var(--ds-space-x2); padding: var(--ds-space-x3); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-layer-floating); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak), 0 4px 16px var(--ds-color-palette-static-black-alpha-300); }
  .tp-composer .ds-textarea { --ds-textarea-line-width: 0px; --ds-textarea-min-height: 48px; --ds-textarea-padding: var(--ds-space-x1); resize: none; background: none; }
  .tp-composer__bar { display: flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-composer__bar .tp-grow { flex: 1 1 auto; }
  .tp-files-row { display: flex; flex-wrap: wrap; gap: var(--ds-space-x1_5); }
  .tp-file-token { display: inline-flex; align-items: center; gap: var(--ds-space-x1); height: 28px; padding: 0 var(--ds-space-x1) 0 var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral); font-size: var(--ds-font-size-t03); }
`;
const composer = (ph = '무엇이든 물어보세요', files = []) => `<form class="tp-composer" onsubmit="return false">${files.length ? `<div class="tp-files-row">${files.map((f) => `<span class="tp-file-token">${icon('file-text', 'sm')}${f}${iconBtn('x', f + ' 빼기', { size: 'xsmall' })}</span>`).join('')}</div>` : ''}<textarea class="ds-textarea" rows="2" placeholder="${esc(ph)}" aria-label="메시지 입력"></textarea><div class="tp-composer__bar">${iconBtn('plus', '파일 첨부')}${btn('참고 자료', { variant: 'ghost', ic: 'paperclip', size: 'small' })}${btn('도구', { variant: 'ghost', ic: 'sliders-horizontal', size: 'small' })}<span class="tp-grow"></span>${iconBtn('mic', '말로 입력')}<button type="submit" class="ds-chat-send" aria-label="보내기"></button></div></form>`;

/* 1. AI 대화 (오른쪽 결과물 패널) ------------------------------ */
const conversation = () => {
  const css = CHAT_CSS + `
  .tp-artifact { display: none; flex: none; width: min(46%, 600px); flex-direction: column; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-artifact { display: flex; } }
  .tp-artifact__bar { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-artifact__doc { flex: 1 1 auto; overflow: auto; padding: var(--ds-space-x6); }
  .tp-chat-head { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
`;
  const body = `<div class="tp-chat">
<header class="tp-chat-head"><span class="tp-row">${iconBtn('panel-left', '대화 목록')}<span class="tp-h4">로그인 유지 기능 점검</span></span><span class="tp-row">${iconBtn('share', '공유')}${iconBtn('ellipsis', '더 보기')}</span></header>
<div class="tp-chat__body">
  <div class="tp-chat__main">
    <div class="tp-log" role="log" aria-label="대화">
      <p class="ds-chat-system" data-variant="divider">오늘</p>
      <div class="tp-msg-user"><div class="tp-files-row"><span class="tp-file-token">${icon('file-code', 'sm')}auth-service.ts</span><span class="tp-file-token">${icon('file-code', 'sm')}middleware.ts</span></div><div class="ds-chat-bubble" data-sender="user">이 두 파일을 봐 줄래요? 토큰 새로 받기가 가끔 실패하는 것 같아요.</div><span class="ds-chat-meta" data-status="read"><time>오전 10:15</time></span></div>
      <div class="tp-msg-ai">${avatar('AI', 24)}<div class="tp-msg-ai__body"><p>두 파일을 읽어 볼게요. 토큰이 만료되는 순간 요청이 동시에 여러 개 오면 새로 받기를 겹쳐서 하는 것 같아요.</p>
        <details class="tp-tools"><summary>${icon('wand-sparkles', 'sm')}도구 3번 사용 ${icon('chevron-down', 'sm')}</summary><ul><li>${icon('circle-check', 'sm')}읽음 <code>auth-service.ts</code></li><li>${icon('circle-check', 'sm')}읽음 <code>middleware.ts</code></li><li>${icon('circle-check', 'sm')}찾음 <code>refreshToken</code> 6곳</li></ul></details>
        <div class="ds-markdown"><h3>원인</h3><p>만료 직전 요청 3개가 동시에 <code>refreshToken()</code>을 불러서, 먼저 끝난 요청이 토큰을 바꾸면 나머지 둘은 이미 쓴 토큰으로 다시 요청해 실패해요.</p><h3>고치는 법</h3><p>새로 받는 중이면 같은 약속(Promise)을 함께 기다리게 하면 돼요.</p></div>
        ${codeblock('ts', "let pending: Promise<string> | null = null;\n\nexport function refreshToken() {\n  pending ??= fetchNewToken().finally(() => { pending = null; });\n  return pending;\n}")}
        <div class="tp-row">${iconBtn('copy', '복사', { size: 'xsmall' })}${iconBtn('thumbs-up', '좋아요', { size: 'xsmall' })}${iconBtn('thumbs-down', '별로예요', { size: 'xsmall' })}${iconBtn('rotate-ccw', '다시 답하기', { size: 'xsmall' })}</div></div></div>
      <div class="tp-msg-user"><div class="ds-chat-bubble" data-sender="user">좋아요. 배포 계획도 문서로 정리해 줘요.</div><span class="ds-chat-meta" data-status="read"><time>오전 10:21</time></span></div>
      <div class="tp-msg-ai">${avatar('AI', 24)}<div class="tp-msg-ai__body"><p>오른쪽에 설계와 배포 문서를 만들었어요. 문제, 고치는 법, 테스트, 단계별 배포 순서로 정리했어요.</p></div></div>
    </div>
    <div class="tp-composer-wrap">${composer('이어서 물어보세요')}</div>
  </div>
  <aside class="tp-artifact" aria-label="결과물">
    <div class="tp-artifact__bar"><span class="tp-row">${icon('file-text', 'sm')}<span class="tp-h4">토큰 새로 받기 설계와 배포</span>${badge('v2')}</span><span class="tp-row">${iconBtn('copy', '복사')}${iconBtn('download', '내려받기')}${iconBtn('x', '닫기')}</span></div>
    <div class="tp-artifact__doc ds-markdown"><h2>토큰 새로 받기 설계와 배포</h2><h3>개요</h3><p>짧은 접속 토큰과 긴 새로 받기 토큰을 함께 써요. 접속 토큰이 끝나기 전에 조용히 새로 받아 사용자가 로그아웃되지 않게 해요.</p><h3>문제</h3><ol><li>요청 여러 개가 동시에 만료를 만나요.</li><li>각자 새로 받기를 불러요.</li><li>마지막 하나만 성공하고 나머지는 401이 나요.</li></ol><h3>고치는 법</h3><p>새로 받는 중인 약속을 하나만 두고 모두 그것을 기다려요.</p><h3>테스트</h3><table><thead><tr><th>상황</th><th>기대</th></tr></thead><tbody><tr><td>동시 요청 3개</td><td>새로 받기 1번</td></tr><tr><td>새로 받기 실패</td><td>로그인 화면으로</td></tr></tbody></table><h3>배포와 지켜보기</h3><p>사용자 5%부터 켜고 24시간 동안 실패율이 그대로면 100%로 넓혀요.</p></div>
  </aside>
</div>
</div>`;
  return { slug: 'ai-chat', en: 'AI Chat Conversation', name: 'AI 대화', group: 'AI Chat', desc: 'AI와 주고받은 대화와 결과물을 함께 보는 화면입니다. 결과물은 옆 패널에서 따로 엽니다.', css, body };
};

/* 2. AI 첫 화면 ------------------------------------------------- */
const landing = () => {
  const css = CHAT_CSS + `
  .tp-land { display: grid; place-items: center; min-height: 100vh; padding: var(--ds-space-x8) var(--ds-space-x4); background: var(--ds-color-bg-layer-default); }
  .tp-land__in { display: flex; flex-direction: column; gap: var(--ds-space-x6); width: min(100%, 720px); }
  .tp-hi { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-hi > .tp-row { color: var(--ds-color-fg-magic); }
  .tp-hi h1 { font-size: var(--ds-font-size-t12); line-height: var(--ds-line-height-t12); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .tp-cats { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ds-space-x2); }
`;
  const body = `<main class="tp-land"><div class="tp-land__in">
  <div class="tp-hi"><span class="tp-row">${icon('sparkles')}<span class="tp-h3">안녕하세요, 와이비엠 님</span></span><h1>무엇부터 시작할까요?</h1></div>
  ${composer('무엇이든 물어보세요', ['수업 계획서.pdf', '지난 학기 설문.xlsx', '강의 영상 목록.csv'])}
  <div class="tp-cats" role="group" aria-label="분류">${[['pencil', '글쓰기'], ['code', '코딩'], ['search', '찾아보기'], ['palette', '만들기'], ['book-open', '배우기']].map(([ic, t]) => btn(t, { variant: 'neutralOutline', ic, attrs: 'aria-pressed="false"' })).join('')}</div>
</div></main>`;
  return { slug: 'ai-chat-landing', en: 'AI Chat Landing', name: 'AI 첫 화면', group: 'AI Chat', desc: '대화를 시작하기 전에 보여 주는 AI 첫 화면입니다. 입력창과 추천 버튼으로 바로 시작합니다.', css, body };
};

export const templates = [conversation, landing].map((f) => f());

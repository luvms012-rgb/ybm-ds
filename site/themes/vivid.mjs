// 테마 "선명" 예시 화면: 템플릿의 시험 신청(exam-apply) 내용을 교육 서비스 소개 사이트의 결로 다시 입힌 것.
// 결: 흰 바탕, 로열 블루 하나, 가운데 정렬 아주 큰 두 줄 제목(핵심어 파랑 밑줄), 옅은 회색 큰 카드, 알약 탭, 검정 강조 카드, 넉넉한 묶음 간격.
// 컨트롤은 DS 부품(Radio, Chip, Input, Checkbox, Button, Callout)을 그대로 쓰고 배치와 글자 크기만 화면 쪽에서 정한다.
import * as K from '../templates/gen/kit.mjs';
const { esc, icon, btn, photo, badge } = K;

export const css = (art) => `
  body { margin: 0; background: var(--ybm-color-bg-canvas); color: var(--ybm-color-fg-neutral); word-break: keep-all; overflow-wrap: break-word; }
  .vv-wrap { box-sizing: border-box; width: min(100%, 1248px); margin-inline: auto; padding-inline: var(--ybm-space-x5); }
  @media (min-width: 768px) { .vv-wrap { padding-inline: var(--ybm-space-x8); } }
  .vv-u { text-decoration: underline; text-decoration-color: var(--ybm-color-bg-brand-solid); text-decoration-thickness: 4px; text-underline-offset: 10px; text-decoration-skip-ink: none; }
  .vv-em { color: var(--ybm-color-fg-brand); }

  /* 위 메뉴: 흰 바탕, 가운데 메뉴(꺾쇠), 오른쪽 로그인 글자 + 검정 버튼 */
  .vv-top { position: sticky; top: 0; z-index: var(--ybm-z-sticky); background: var(--ybm-color-bg-layer-default); }
  .vv-top .vv-wrap { display: flex; align-items: center; gap: var(--ybm-space-x8); height: 72px; }
  .vv-logo { display: flex; align-items: center; gap: var(--ybm-space-x2); color: var(--ybm-color-fg-brand); font-size: var(--ybm-font-size-t06); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.03em; text-decoration: none; }
  .vv-menu { display: none; flex: 1 1 auto; justify-content: center; gap: var(--ybm-space-x8); }
  .vv-menu a { display: inline-flex; align-items: center; gap: var(--ybm-space-x1); color: var(--ybm-color-fg-neutral); font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-medium); text-decoration: none; }
  .vv-menu a[aria-current="page"] { color: var(--ybm-color-fg-brand); font-weight: var(--ybm-font-weight-bold); }
  .vv-menu .ds-icon { --ds-icon-size: 14px; }
  .vv-top__end { display: flex; align-items: center; gap: var(--ybm-space-x5); margin-left: auto; }
  .vv-top__end > a { color: var(--ybm-color-fg-neutral); font-size: var(--ybm-font-size-t04); text-decoration: none; }
  @media (min-width: 1024px) { .vv-menu { display: flex; } }

  /* 첫 화면: 머리말 → 큰 제목 → 알약 탭 → 큰 사진 */
  .vv-hero { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x5); padding-top: var(--ybm-space-x16); text-align: center; }
  .vv-eyebrow { color: var(--ybm-color-fg-brand); font-size: var(--ybm-font-size-t05); font-weight: var(--ybm-font-weight-bold); }
  .vv-hero h1 { margin: 0; font-size: 40px; line-height: 1.3; font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  @media (min-width: 768px) { .vv-hero h1 { font-size: 52px; } }
  .vv-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ybm-space-x1); margin-top: var(--ybm-space-x5); padding: var(--ybm-space-x1_5); border-radius: var(--ybm-shape-pill); background: var(--ybm-color-bg-neutral-weak-alpha); }
  .vv-tabs a { display: inline-flex; align-items: center; gap: var(--ybm-space-x1_5); padding: var(--ybm-space-x2_5) var(--ybm-space-x6); border-radius: var(--ybm-shape-pill); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t04); font-weight: var(--ybm-font-weight-medium); text-decoration: none; }
  .vv-tabs a[aria-current="step"] { background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); font-weight: var(--ybm-font-weight-semibold); }
  .vv-tabs a[data-done] { color: var(--ybm-color-fg-neutral); }
  .vv-tabs a[data-done] .ds-icon { --ds-icon-size: 16px; color: var(--ybm-color-fg-brand); }
  .vv-photo { position: relative; overflow: hidden; margin-top: var(--ybm-space-x12); border-radius: var(--ybm-shape-2xl); background: var(--ybm-color-palette-static-black); }
  .vv-photo img { display: block; width: 100%; height: 360px; object-fit: cover; opacity: .62; }
  .vv-photo p { position: absolute; inset: 0; display: grid; place-items: center; margin: 0; padding: var(--ybm-space-x6); color: var(--ybm-color-palette-static-white); font-size: 22px; line-height: 1.6; font-weight: var(--ybm-font-weight-semibold); text-align: center; letter-spacing: -0.01em; }

  /* 묶음: 가운데 큰 두 줄 제목 + 리드, 넉넉한 위 간격 */
  .vv-sec { display: flex; flex-direction: column; gap: var(--ybm-space-x12); padding-top: 160px; }
  .vv-sec__head { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x5); text-align: center; }
  .vv-sec__head h2 { position: relative; margin: 0; font-size: 34px; line-height: 1.35; font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  @media (min-width: 768px) { .vv-sec__head h2 { font-size: 44px; } }
  .vv-sec__head h2 .vv-mark { position: absolute; top: -14px; right: -34px; color: var(--ybm-color-fg-brand); }
  .vv-sec__head p { max-width: 640px; margin: 0; color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t06); line-height: 1.6; font-weight: var(--ybm-font-weight-medium); }

  /* 시험 고르기: 옅은 회색 큰 카드 (그림 → 이름 → 설명 → 고르기) */
  .vv-exams { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x5); }
  @media (min-width: 768px) { .vv-exams { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .vv-exam { position: relative; display: flex; flex-direction: column; overflow: hidden; border-radius: var(--ybm-shape-2xl); background: var(--ybm-color-bg-neutral-weak-alpha); cursor: pointer; transition: box-shadow var(--ybm-duration-fast) var(--ybm-easing-standard); }
  .vv-exam:has(:checked) { box-shadow: inset 0 0 0 3px var(--ybm-color-stroke-brand-solid); }
  .vv-exam__art { display: grid; place-items: center; height: 200px; color: var(--ybm-color-fg-brand); }
  .vv-exam__art svg { width: 96px; height: 96px; }
  .vv-exam__body { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x2); padding: 0 var(--ybm-space-x6) var(--ybm-space-x8); text-align: center; }
  .vv-exam__body b { font-size: 24px; line-height: 1.45; letter-spacing: -0.02em; }
  .vv-exam__body span { color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t05); line-height: 1.6; font-weight: var(--ybm-font-weight-medium); }
  .vv-exam .ds-radio { position: absolute; top: var(--ybm-space-x5); right: var(--ybm-space-x5); }
  .vv-langs { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ybm-space-x2); }

  /* 날짜와 고사장: 왼쪽 체크 목록, 오른쪽 옅은 파랑 판 안 흰 카드 */
  .vv-when { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); align-items: center; }
  @media (min-width: 1024px) { .vv-when { grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: var(--ybm-space-x16); } }
  .vv-checks { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
  .vv-checks li { padding-block: var(--ybm-space-x5); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .vv-checks label { display: flex; align-items: flex-start; gap: var(--ybm-space-x3); cursor: pointer; }
  .vv-checks b { display: block; color: var(--ybm-color-fg-neutral-subtle); font-size: 20px; line-height: 1.45; font-weight: var(--ybm-font-weight-semibold); letter-spacing: -0.02em; }
  .vv-checks span { display: block; margin-top: var(--ybm-space-x1); color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t04); }
  .vv-checks label:has(:checked) b { color: var(--ybm-color-fg-neutral); }
  .vv-checks label:has(:checked) span { color: var(--ybm-color-fg-neutral-muted); }
  .vv-checks .ds-radio { margin-top: 4px; }
  .vv-board { padding: var(--ybm-space-x8); border-radius: var(--ybm-shape-2xl); background: linear-gradient(135deg, var(--ybm-color-bg-brand-weak), var(--ybm-color-bg-neutral-weak-alpha)); }
  .vv-board__card { display: flex; flex-direction: column; gap: var(--ybm-space-x5); padding: var(--ybm-space-x7); border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-layer-floating); box-shadow: var(--ybm-elevation-overlay); }
  .vv-board__card h3 { margin: 0; font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); }
  .vv-dates { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--ybm-space-x2); }
  .vv-date { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: var(--ybm-space-x3) 0; border: 0; border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-neutral-weak-alpha); color: var(--ybm-color-fg-neutral); font: inherit; cursor: pointer; }
  .vv-date small { color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t02); }
  .vv-date b { font-size: var(--ybm-font-size-t07); line-height: 1.2; font-variant-numeric: tabular-nums; }
  .vv-date[aria-pressed="true"] { background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); }
  .vv-date[aria-pressed="true"] small { color: inherit; opacity: .8; }
  .vv-date:disabled { color: var(--ybm-color-fg-disabled); cursor: not-allowed; }
  .vv-slots { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x2); }

  /* 응시자 정보 + 검정 결제 카드 */
  .vv-pay { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); align-items: start; }
  @media (min-width: 1024px) { .vv-pay { grid-template-columns: minmax(0, 1fr) 420px; gap: var(--ybm-space-x12); } }
  .vv-form { display: flex; flex-direction: column; gap: var(--ybm-space-x6); }
  .vv-form .ds-input { width: 100%; }
  .vv-grid2 { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x5); }
  @media (min-width: 768px) { .vv-grid2 { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .vv-agree { display: flex; flex-direction: column; gap: var(--ybm-space-x3); padding: var(--ybm-space-x6); border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-neutral-weak-alpha); }
  .vv-sum { position: sticky; top: 96px; display: flex; flex-direction: column; gap: var(--ybm-space-x6); padding: var(--ybm-space-x8); border-radius: var(--ybm-shape-2xl); background: var(--ybm-color-palette-static-black); color: var(--ybm-color-palette-static-white); }
  .vv-sum__label { color: var(--ybm-color-palette-static-white-alpha-700); font-size: var(--ybm-font-size-t04); }
  .vv-sum__price { font-size: 52px; line-height: 1.15; font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.03em; font-variant-numeric: tabular-nums; color: var(--ybm-color-palette-brand-400); }
  .vv-sum__price small { margin-left: var(--ybm-space-x1); font-size: 22px; color: var(--ybm-color-palette-static-white); }
  .vv-sum dl { display: flex; flex-direction: column; gap: var(--ybm-space-x3); margin: 0; padding-top: var(--ybm-space-x6); box-shadow: inset 0 1px 0 var(--ybm-color-palette-static-white-alpha-200); font-size: var(--ybm-font-size-t04); }
  .vv-sum dl div { display: flex; justify-content: space-between; gap: var(--ybm-space-x3); }
  .vv-sum dt { color: var(--ybm-color-palette-static-white-alpha-700); }
  .vv-sum dd { margin: 0; text-align: end; }
  .vv-sum__note { color: var(--ybm-color-palette-static-white-alpha-600); font-size: var(--ybm-font-size-t03); line-height: 1.6; }

  /* 아래 */
  .vv-foot { margin-top: 160px; padding-block: var(--ybm-space-x12); background: var(--ybm-color-bg-neutral-weak-alpha); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); line-height: 1.7; }
  .vv-foot b { display: block; margin-bottom: var(--ybm-space-x2); color: var(--ybm-color-fg-neutral); font-size: var(--ybm-font-size-t05); }
`;

const EXAMS = [['mic', '영어 말하기 시험', '대화하듯 말하며 실력을 단계로 확인해요', true], ['headphones', '영어 읽기 듣기 시험', '읽기와 듣기를 점수로 정확하게 재요'], ['pen-line', '영어 쓰기 시험', '생각을 글로 쓰는 힘을 단계로 확인해요']];
const DATES = [['토', '14', false, true], ['일', '15'], ['수', '18', true], ['토', '21'], ['일', '22', false, true]];
const CENTERS = [['한빛대학교 인문관', '서울 가상구 · 남은 자리 12', true], ['한빛고등학교 본관', '서울 예시구 · 남은 자리 4'], ['한빛센터 강남', '서울 예시구 · 남은 자리 21'], ['한빛센터 부산', '부산 예시구 · 남은 자리 9']];

export const body = (art) => `<header class="vv-top"><div class="vv-wrap"><a class="vv-logo" href="#">${art('book-open-check', '', 26)}한빛 시험센터</a>
  <nav class="vv-menu" aria-label="주요 메뉴"><a href="#">시험 소개${icon('chevron-down')}</a><a href="#" aria-current="page">시험 접수${icon('chevron-down')}</a><a href="#">성적 확인</a><a href="#">시험 소식${icon('chevron-down')}</a></nav>
  <div class="vv-top__end"><a href="#">로그인</a>${btn('무료로 모의시험 보기', { variant: 'neutralSolid', size: 'medium' })}</div></div></header>
<main>
  <section class="vv-wrap vv-hero" aria-labelledby="vv-h1">
    <span class="vv-eyebrow">시험 접수</span>
    <h1 id="vv-h1">영어 말하기 시험 신청</h1>
    <nav class="vv-tabs" aria-label="신청 단계"><a href="#vv-exam" data-done>${icon('check')}시험 고르기</a><a href="#vv-when" aria-current="step">날짜와 고사장</a><a href="#vv-info">응시자 정보</a><a href="#vv-info">결제</a></nav>
  </section>
  <div class="vv-wrap"><div class="vv-photo"><img src="${photo('study', 3, 1600)}" alt=""><p>원하는 날짜와 가까운 고사장을 고르고<br>결제하면 접수가 바로 끝나요.</p></div></div>

  <section class="vv-wrap vv-sec" id="vv-exam" aria-labelledby="vv-s1">
    <div class="vv-sec__head"><h2 id="vv-s1">어떤 시험을<br><span class="vv-u">응시할까요?</span>${art('sparkles', '', 34).replace('class="th-art"', 'class="th-art vv-mark"')}</h2><p>시험마다 평가하는 능력과 성적표가 달라요. 목표에 맞는 시험을 하나 고르세요.</p></div>
    <div class="vv-exams" role="radiogroup" aria-label="시험">${EXAMS.map(([ic, t, d, on]) => `<label class="vv-exam"><span class="vv-exam__art">${art(ic, '', 96)}</span><span class="vv-exam__body"><b>${t}</b><span>${d}</span></span><span class="ds-radio" data-size="large"><input type="radio" class="ds-radio__control" name="vv-exam"${on ? ' checked' : ''} aria-label="${esc(t)}"></span></label>`).join('')}</div>
    <div class="vv-langs" role="group" aria-label="언어">${['영어', '중국어', '일본어', '스페인어', '베트남어'].map((l, i) => K.chip(l, { on: i === 0, size: 'large' })).join('')}</div>
  </section>

  <section class="vv-wrap vv-sec" id="vv-when" aria-labelledby="vv-s2">
    <div class="vv-sec__head"><h2 id="vv-s2">언제, 어디서<br><span class="vv-u">시험을 볼까요?</span></h2><p>남은 자리는 실시간으로 바뀌어요. 마음에 드는 날짜와 고사장을 먼저 잡아 두세요.</p></div>
    <div class="vv-when">
      <ul class="vv-checks" role="radiogroup" aria-label="고사장">${CENTERS.map(([t, d, on]) => `<li><label><span class="ds-radio" data-size="medium"><input type="radio" class="ds-radio__control" name="vv-center"${on ? ' checked' : ''}></span><span><b>${t}</b><span>${d}</span></span></label></li>`).join('')}</ul>
      <div class="vv-board"><div class="vv-board__card">
        <h3>2026년 11월</h3>
        <div class="vv-dates" role="group" aria-label="날짜">${DATES.map(([w, d, on, off]) => `<button type="button" class="vv-date"${on ? ' aria-pressed="true"' : ' aria-pressed="false"'}${off ? ' disabled' : ''}><small>${w}</small><b>${d}</b></button>`).join('')}</div>
        <div class="vv-slots">${['10:00', '13:00', '14:20', '15:40', '17:00'].map((t, i) => K.chip(t, { on: i === 1, size: 'medium' })).join('')}</div>
        ${K.callout('', '11월 18일 (수) 13:00 시험의 성적은 11월 25일에 나와요.', 'informative')}
      </div></div>
    </div>
  </section>

  <section class="vv-wrap vv-sec" id="vv-info" aria-labelledby="vv-s3">
    <div class="vv-sec__head"><h2 id="vv-s3">마지막으로<br><span class="vv-u">정보를 확인해요</span></h2><p>성적표와 수험표에 들어가는 정보예요. 여권과 같은 영문 이름으로 적어 주세요.</p></div>
    <div class="vv-pay">
      <form class="vv-form" onsubmit="return false">
        <div class="vv-grid2">${K.field('vv-name', '이름', K.input('vv-name', 'value="와이비엠" readonly', { size: 'large' }))}${K.field('vv-birth', '생년월일', K.input('vv-birth', 'value="2001.04.12" readonly', { size: 'large' }))}${K.field('vv-en1', '영문 성', K.input('vv-en1', 'value="YBM"', { size: 'large' }), { required: true })}${K.field('vv-en2', '영문 이름', K.input('vv-en2', 'value="NET"', { size: 'large' }), { required: true })}${K.field('vv-tel', '휴대폰', K.input('vv-tel', 'value="010-1234-5678"', { size: 'large' }))}${K.field('vv-mail', '이메일', K.input('vv-mail', 'value="ybm@example.com"', { size: 'large' }))}</div>
        <div class="vv-agree">${K.checkbox('<b>모두 동의해요</b>', { checked: true })}${['[필수] 시험 응시 규정', '[필수] 개인정보 수집과 이용', '[선택] 시험 소식 받기'].map((t, i) => K.checkbox(t, { checked: i < 2 })).join('')}</div>
      </form>
      <aside class="vv-sum" aria-label="결제할 금액"><span class="vv-sum__label">결제할 금액</span><span class="vv-sum__price">84,000<small>원</small></span>
        <dl><div><dt>시험</dt><dd>영어 말하기 시험</dd></div><div><dt>일시</dt><dd>11월 18일 (수) 13:00</dd></div><div><dt>고사장</dt><dd>한빛대학교 인문관</dd></div><div><dt>할인</dt><dd>재응시 할인 -10,000원</dd></div></dl>
        ${btn('84,000원 결제하고 접수하기', { variant: 'brandSolid', size: 'large', fill: true })}
        <span class="vv-sum__note">시험 3일 전까지는 전액 돌려받을 수 있어요.</span></aside>
    </div>
  </section>
</main>
<footer class="vv-foot"><div class="vv-wrap"><b>한빛 시험센터</b>이 화면은 YBM DS 테마 예시예요. 시험, 기관, 연락처는 모두 가상입니다.<br>고객센터 1588-0000 · help@example.com</div></footer>`;

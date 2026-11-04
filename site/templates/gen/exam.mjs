// 시험 접수 템플릿: 개인(Exam)과 기관 단체(Exam B2B). 시험 이름은 특정 시험이 아닌 일반 이름을 쓴다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar, sidenav, frame, selectbox, tags, calendar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, select, checkbox, divider, chip, chiptabs, tabs, segmented, progress, ring, table, tablePager, stepper, avatar, callout, dot, link, breadcrumbs, lineChart, barChart, donut, legend, meter, kpi, search, C, esc } = K;

const USER_MENU = ['시험 일정', '시험 접수', '성적 확인', '내 시험'];
const userEnd = `${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const ORG = '한빛대학교';
const orgNav = (cur) => sidenav(ORG, [['', [['홈', 'house', cur === 0], ['단체 접수', 'square-pen', cur === 1], ['응시자 관리', 'users', cur === 2], ['성적 리포트', 'chart-column', cur === 3]]], ['운영', [['정산', 'receipt', false], ['공지 보내기', 'mail', false]]]], [['설정', 'settings', false]]);
const CSS = FRAME_CSS + `
  .tp-cal { width: 100%; padding: 0; box-shadow: none; background: none; }
  .tp-slots { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ds-space-x2); }
  .tp-slots .ds-chip { justify-content: center; }
  .tp-map { position: relative; overflow: hidden; border-radius: var(--ds-shape-lg); background: var(--ds-color-bg-neutral); min-height: 200px; display: grid; place-items: center; color: var(--ds-color-fg-neutral-subtle); }
`;

/* 1. 시험 신청 (한 화면에 단계별 묶음 + 고정 요약) ------------------- */
const apply = () => {
  const css = CSS + `
  .tp-ea { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); width: min(100%, 1120px); margin-inline: auto; }
  @media (min-width: 1024px) { .tp-ea { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } }
  .tp-step-h { display: flex; align-items: center; gap: var(--ds-space-x3); }
  .tp-step-no { display: inline-grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: var(--ds-shape-pill); background: var(--ds-color-bg-neutral); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); }
  .tp-step-h .ds-icon { --ds-icon-size: 24px; color: var(--ds-color-fg-positive); }
  .tp-step-h[data-current] .tp-step-no { background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); }
  .tp-step-h > .tp-h2 { flex: 1 1 auto; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); }
  .tp-ds { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 768px) { .tp-ds { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
  .tp-total { display: flex; align-items: baseline; justify-content: space-between; }
`;
  const stepH = (n, t, state = '', tool = '') => `<div class="tp-step-h"${state === 'current' ? ' data-current' : ''}>${state === 'done' ? icon('circle-check-solid') : `<span class="tp-step-no">${n}</span>`}<h2 class="tp-h2">${t}</h2>${tool}</div>`;
  const slot = (t, on = false, off = false) => `<button type="button" class="ds-chip" data-variant="outlineWeak" data-size="medium"${on ? ' aria-pressed="true"' : ''}${off ? ' disabled' : ''}>${off ? `${t} 마감` : t}</button>`;
  const body = `<div class="tp-app">${topbar(USER_MENU, 1, userEnd)}<main class="tp-content">
  <div class="tp-ea">
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      <div class="tp-stack" style="gap: var(--ds-space-x2); padding-block-end: var(--ds-space-x2)"><h1 class="tp-h1">시험 신청</h1><p class="tp-sub">시험, 날짜, 고사장을 고르고 결제하면 접수가 끝나요.</p></div>
      ${card(`${stepH(1, '시험 고르기', 'done', link('바꾸기'))}${selectbox('exam', [['영어 말하기 시험', '말하기 능력을 단계로 평가해요', 'mic'], ['영어 읽기 듣기 시험', '읽기와 듣기를 점수로 평가해요', 'book-open'], ['영어 쓰기 시험', '쓰기 능력을 단계로 평가해요', 'pencil']], 0, { cols: 3, vertical: true })}`)}
      ${card(`${stepH(2, '언어 고르기', 'done')}<div class="tp-chips" style="display:flex;flex-wrap:wrap;gap:var(--ds-space-x2)">${['영어', '중국어', '일본어', '스페인어', '러시아어', '베트남어'].map((l, i) => chip(l, { on: i === 0, size: 'medium' })).join('')}</div>`)}
      ${card(`${stepH(3, '날짜와 고사장 고르기', 'current', segmented(['날짜 먼저', '고사장 먼저'], 0, '고르는 순서'))}
        <div class="tp-ds">
          <div class="tp-stack" style="gap: var(--ds-space-x3)">${calendar('2026년 11월', { first: 0, days: 30, sel: 18, today: 2, off: [1, 8, 15, 22, 29] })}</div>
          <div class="tp-stack" style="gap: var(--ds-space-x4)">
            <div class="tp-stack" style="gap: var(--ds-space-x2)"><span class="tp-h4">오전</span><div class="tp-slots">${slot('10:00')}${slot('11:20', false, true)}</div></div>
            <div class="tp-stack" style="gap: var(--ds-space-x2)"><span class="tp-h4">오후</span><div class="tp-slots">${slot('13:00', true)}${slot('14:20')}${slot('15:40')}${slot('17:00')}${slot('18:20', false, true)}${slot('19:30')}</div></div>
            ${callout('', '11월 18일 (수) 13:00 시험의 성적은 11월 25일에 나와요.', 'informative')}
          </div>
        </div>
        ${divider()}
        <div class="tp-between"><span class="tp-h3">고사장</span>${select('서울', { id: 'ea-region', aria: '지역' })}</div>
        <div class="tp-ds">
          <div class="tp-map" aria-hidden="true">${icon('map-pin', 'lg')}</div>
          ${selectbox('venue', [['강남 시험장', '1.3km / 남은 자리 12석'], ['종로 시험장', '6.7km / 남은 자리 3석'], ['신촌 시험장', '9.8km / 남은 자리 20석']], 0)}
        </div>`)}
      ${card(`${stepH(4, '규정 동의')}${checkbox('<b>전체 동의</b>', { checked: false })}${divider()}<div class="tp-stack" style="gap: var(--ds-space-x3)">${['[필수] 시험 응시 규정', '[필수] 시험 성적 이용 규정', '[필수] 개인정보 수집과 이용', '[선택] 시험 소식과 혜택 받기'].map((t) => `<div class="tp-between">${checkbox(t)}${link('보기')}</div>`).join('')}</div>`)}
      ${card(`${stepH(5, '응시자 정보 확인')}<div class="tp-ds">${field('ea-name', '이름', input('ea-name', 'value="와이비엠" readonly'))}${field('ea-birth', '생년월일', input('ea-birth', 'value="2001.04.12" readonly'))}${field('ea-en1', '영문 성', input('ea-en1', 'value="YBM"'), { required: true, help: '여권과 같은 영문으로 적어 주세요.' })}${field('ea-en2', '영문 이름', input('ea-en2', 'value="NET"'), { required: true })}${field('ea-phone', '휴대폰', input('ea-phone', 'value="010-1234-5678"'))}${field('ea-mail', '이메일', input('ea-mail', 'value="ybm@example.com"'))}</div>${checkbox('[필수] 응시자 정보가 맞는지 확인했어요')}`)}
      ${card(`${stepH(6, '할인과 결제 수단')}${field('ea-coupon', '쿠폰', select('쓸 수 있는 쿠폰 1장', { id: 'ea-coupon', size: 'medium' }))}${selectbox('pay', [['카드', '', 'credit-card'], ['계좌 이체', '', 'building'], ['간편 결제', '', 'wallet'], ['휴대폰', '', 'smartphone']], 0, { cols: 4, vertical: true })}`)}
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">신청 내용</span><div class="tp-stack" style="gap: var(--ds-space-x2)">${[['시험', '영어 말하기 시험'], ['언어', '영어'], ['날짜', '11월 18일 (수) 13:00'], ['고사장', '강남 시험장']].map(([k, v]) => `<div class="tp-kv"><span>${k}</span><span>${v}</span></div>`).join('')}</div>${divider()}<div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-kv"><span>응시료</span>${T('84,000원')}</div><div class="tp-kv"><span>쿠폰 할인</span>${T('-8,400원')}</div></div><div class="tp-total"><span class="tp-h4">결제 금액</span><span class="tp-mid">${T('75,600원')}</span></div>`)}
      ${btn('75,600원 결제하기', { variant: 'brandSolid', size: 'large', fill: true })}
      <p class="tp-caption" style="text-align:center">시험 3일 전까지는 전액 환불돼요</p>
    </aside>
  </div>
</main></div>`;
  return { slug: 'exam-apply', en: 'Exam Application', name: '시험 신청', group: 'Exam', desc: '시험 종류부터 결제까지 한 화면에서 차례로 고르는 신청 화면입니다. 고른 내용과 금액은 옆 요약에 바로 나타납니다.', css, body };
};

/* 2. 내 시험 (개인 대시보드) ---------------------------------------- */
const mine = () => {
  const css = CSS + `
  .tp-next { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 768px) { .tp-next { grid-template-columns: minmax(0, 1fr) 260px; } }
  .tp-dday { display: inline-flex; align-self: flex-start; padding: 2px var(--ds-space-x2); border-radius: var(--ds-shape-sm); background: var(--ds-color-bg-neutral-solid); color: var(--ds-color-fg-neutral-inverted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
  .tp-check { display: flex; align-items: center; gap: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-check .ds-icon { color: var(--ds-color-fg-positive); }
  .tp-hist { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x1) var(--ds-space-x3); align-items: center; }
`;
  const hist = (t, when, st, tone, act) => `<div class="tp-hist"><div class="tp-stack"><span class="tp-h4">${t}</span>${tags(when)}</div><div class="tp-row">${badge(st, tone)}${act ? btn(act, { size: 'xsmall' }) : ''}</div></div>`;
  const body = `<div class="tp-app">${topbar(USER_MENU, 3, userEnd)}
${head('내 시험', { sub: '접수한 시험과 성적을 한곳에서 봐요.', tools: btn('시험 접수하기', { variant: 'brandSolid', ic: 'plus' }) })}
<main class="tp-content">
  <div class="tp-g3">
    ${card(`<div class="tp-next"><div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-dday">D-16</span><span class="tp-mid">영어 말하기 시험</span>${tags(['11월 18일 (수) 13:00', '강남 시험장', '수험 번호 1118-0427'], 't4')}<div class="tp-row" style="flex-wrap:wrap; margin-block-start: var(--ds-space-x2)">${btn('수험표 보기', { variant: 'neutralSolid', ic: 'id-card' })}${btn('고사장 바꾸기')}${btn('접수 취소', { variant: 'ghost' })}</div></div>
      <div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-h4">시험 날 챙길 것</span>${[['신분증', true], ['수험표', true], ['12:40까지 입실', false]].map(([t, ok]) => `<span class="tp-check">${icon(ok ? 'circle-check-solid' : 'circle')}${t}</span>`).join('')}</div></div>`, { cls: 'tp-span2' })}
    ${card(`<div class="tp-between"><span class="tp-h3">최근 점수</span>${link('성적표')}</div><div class="tp-row" style="align-items: baseline"><span class="tp-big">${T('780')}</span><span class="tp-sub">/ 990</span>${K.delta('+45')}</div>${lineChart([{ name: '점수', data: [610, 655, 690, 735, 780] }], { w: 320, h: 110, x: ['3월', '5월', '7월', '9월', '10월'], label: '점수 변화' })}${meter('목표 850점까지', 92, '70점 남음')}`)}
  </div>
  <section class="tp-sec">${secHead('접수 내역', { tools: chiptabs(['전체', '접수 완료', '응시 완료', '취소'], 0, '접수 상태') })}
    ${card(`<div class="tp-rows">${hist('영어 말하기 시험', ['11월 18일 (수) 13:00', '강남 시험장'], '접수 완료', 'informative', '수험표')}${hist('영어 읽기 듣기 시험', ['10월 12일 (일) 09:30', '종로 시험장'], '응시 완료', 'positive', '성적 보기')}${hist('영어 읽기 듣기 시험', ['9월 7일 (일) 09:30', '신촌 시험장'], '응시 완료', 'positive', '성적 보기')}${hist('영어 쓰기 시험', ['8월 23일 (토) 14:00', '강남 시험장'], '취소', '', '환불 내역')}</div>`)}
  </section>
  <section class="tp-sec">${secHead('혜택')}
    <div class="tp-g2">${card(`<div class="tp-row" style="align-items:flex-start; gap: var(--ds-space-x3)">${icon('tag', 'lg')}<div class="tp-stack" style="flex:1"><span class="tp-h4">다시 보면 10% 할인</span><span class="tp-sub">12월 31일까지 같은 시험을 다시 신청하면 써요.</span></div>${btn('쿠폰 받기', { size: 'xsmall' })}</div>`)}${card(`<div class="tp-row" style="align-items:flex-start; gap: var(--ds-space-x3)">${icon('book-open', 'lg')}<div class="tp-stack" style="flex:1"><span class="tp-h4">말하기 모의 시험 무료</span><span class="tp-sub">시험 전에 실제와 같은 화면으로 연습해 봐요.</span></div>${btn('연습하기', { size: 'xsmall' })}</div>`)}</div>
  </section>
</main></div>`;
  return { slug: 'exam-my', en: 'My Exams', name: '내 시험', group: 'Exam', desc: '응시자가 자신의 시험 일정과 점수를 한눈에 보는 화면입니다.', css, body };
};

/* 3. 성적표 ------------------------------------------------------- */
const score = () => {
  const css = CSS + `
  .tp-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: center; }
  @media (min-width: 768px) { .tp-hero { grid-template-columns: auto minmax(0, 1fr); } }
  .tp-hero .ds-progress-circle { --ds-progress-circle-size: 140px; }
  .tp-ring-wrap { position: relative; display: grid; place-items: center; width: 140px; height: 140px; }
  .tp-ring-wrap > .ds-progress-circle { width: 140px; height: 140px; }
  .tp-ring-wrap > .tp-ring-txt { position: absolute; display: flex; flex-direction: column; align-items: center; }
  .tp-area { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
`;
  const dist = [2, 5, 9, 16, 24, 31, 27, 19, 11, 5];
  // 내 구간(9번째 막대)만 진하게, 나머지는 옅은 회색
  let k = 0;
  const distChart = barChart(dist.map((v) => [v]), { x: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '99'], colors: ['var(--ds-color-bg-neutral)'], label: '점수 구간별 응시자 비율' }).replace(/fill="var\(--ds-color-bg-neutral\)"/g, (m) => (k++ === 8 ? `fill="${C(0)}"` : m));
  const area = (t, s, max, v, note) => `<div class="tp-area"><div class="tp-between"><span class="tp-h4">${t}</span><span>${T(`<b>${s}</b> / ${max}`)}</span></div>${progress(v, { small: false, label: t })}<span class="tp-caption">${note}</span></div>`;
  const body = `<div class="tp-app">${topbar(USER_MENU, 2, userEnd)}
${head('영어 읽기 듣기 시험 성적', { eyebrow: breadcrumbs(['내 시험', '성적표']), sub: '10월 12일 (일) 응시 / 수험 번호 1012-0381', tools: `${btn('인쇄', { ic: 'printer' })}${btn('성적 증명서 받기', { variant: 'brandSolid', ic: 'download' })}` })}
<main class="tp-content">
  ${card(`<div class="tp-hero">${donut([['내 점수', 845, C(0)], ['남은 점수', 145, 'var(--ds-color-bg-neutral)']], { size: 148, thick: 14, center: '845', sub: '/ 990', label: '총점 845점, 990점 만점' })}
    <div class="tp-stats" style="--n:3"><div><span class="tp-sub">지난 시험보다</span><span class="tp-mid">${T('+65점')}</span><span class="tp-caption">9월 7일 780점</span></div><div><span class="tp-sub">상위</span><span class="tp-mid">${T('12%')}</span><span class="tp-caption">같은 날 응시자 1,284명 중</span></div><div><span class="tp-sub">유효 기간</span><span class="tp-mid">${T('2028.10.11')}</span><span class="tp-caption">응시일부터 2년</span></div></div></div>`)}
  <div class="tp-g2">
    ${card(`<span class="tp-h3">영역별 점수</span>${area('듣기', 430, 495, 87, '긴 대화의 세부 내용을 잘 들었어요.')}${area('읽기', 415, 495, 84, '문법 문제에서 시간을 더 줄일 수 있어요.')}`)}
    ${card(`<div class="tp-between"><span class="tp-h3">점수 분포</span>${legend([['내 구간', 0], ['다른 응시자', 'var(--ds-color-bg-neutral)']])}</div>${distChart}<span class="tp-caption">가로는 백분위, 세로는 응시자 비율이에요.</span>`)}
  </div>
  <section class="tp-sec">${secHead('문항 유형별 정답률', { sub: '틀린 유형부터 다시 연습해 보세요.' })}
    ${card(table([['유형'], ['영역'], ['정답률', 'right'], ['평균', 'right'], ['']], [['사진 묘사', '듣기', T('100%'), T('86%'), link('연습하기')], ['질문 응답', '듣기', T('88%'), T('72%'), link('연습하기')], ['짧은 대화', '듣기', T('85%'), T('70%'), link('연습하기')], ['문법 빈칸', '읽기', T('74%'), T('68%'), link('연습하기')], ['긴 지문 읽기', '읽기', T('81%'), T('64%'), link('연습하기')]]))}
  </section>
  ${callout('다음 목표를 정해 볼까요?', '지금 점수에서 900점까지 55점 남았어요. 맞춤 연습 문제를 추천해 드릴게요.', 'informative', 'lightbulb')}
</main></div>`;
  return { slug: 'exam-score', en: 'Score Report', name: '성적표', group: 'Exam', desc: '시험 성적을 확인하는 화면입니다. 총점을 먼저 보여 주고 영역별 점수로 이어집니다.', css, body };
};

/* 4. 단체 접수 (기관) ---------------------------------------------- */
const groupApply = () => {
  const css = CSS + `
  .tp-ga { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1280px) { .tp-ga { grid-template-columns: minmax(0, 1fr) 320px; align-items: start; } }
  .tp-err { background: var(--ds-color-bg-critical-weak); }
  .tp-err-msg { color: var(--ds-color-fg-critical); }
`;
  const rows = [['1', '김민준', '20231042', '경영학과', 'minjun@hanbit.ac.kr', badge('정상', 'positive')], ['2', '이서연', '20231107', '경영학과', 'seoyeon@hanbit.ac.kr', badge('정상', 'positive')], ['3', '박지후', '20220388', '국제통상학과', '<span class="tp-err-msg">jihu@hanbit</span>', badge('이메일 확인', 'critical')], ['4', '최하은', '20240215', '영어영문학과', 'haeun@hanbit.ac.kr', badge('정상', 'positive')], ['5', '정민재', '', '컴퓨터공학과', 'minjae@hanbit.ac.kr', badge('학번 없음', 'critical')], ['6', '한지아', '20230561', '컴퓨터공학과', 'jia@hanbit.ac.kr', badge('정상', 'positive')]];
  const tbl = table([['번호'], ['이름'], ['학번'], ['학과'], ['이메일'], ['확인']], rows).replace(/<tr><td>3<\/td>/, '<tr class="tp-err"><td>3</td>').replace(/<tr><td>5<\/td>/, '<tr class="tp-err"><td>5</td>');
  const main = `${head('단체 접수', { sub: '응시자 명단을 올리면 한 번에 접수해요.', tools: btn('임시 저장', { ic: 'save' }) })}
<main class="tp-content">
  ${card(stepper(['시험 고르기', '명단 올리기', '확인', '결제'], 1, '접수 단계'))}
  <div class="tp-ga">
    <div class="tp-stack" style="gap: var(--ds-space-x4)">
      ${card(`<div class="tp-between"><div class="tp-stack"><span class="tp-caption">고른 시험</span><span class="tp-h3">영어 읽기 듣기 시험</span>${tags(['12월 6일 (토) 09:30', '한빛대학교 단독 고사장', '정원 150명'], 't4')}</div>${btn('바꾸기', { size: 'xsmall' })}</div>`)}
      ${card(`<div class="tp-between"><div class="tp-stack"><span class="tp-h3">응시자 명단</span><span class="tp-sub">양식에 맞춰 이름, 학번, 학과, 이메일을 적어 올려 주세요.</span></div>${btn('양식 받기', { ic: 'download', size: 'small' })}</div>
        <div class="ds-fileattach"><label class="ds-fileattach__dropzone"><input type="file" class="ds-fileattach__input" accept=".xlsx,.csv"><span class="ds-fileattach__label">엑셀 파일을 끌어 놓거나 눌러서 올리세요</span></label>
          <div class="ds-fileattach__items"><div class="ds-fileitem"><span class="ds-fileitem__thumbnail">${icon('file-text')}</span><span class="ds-fileitem__name">2학기_응시자.xlsx</span></div></div></div>
        <div class="tp-between"><div class="tp-row" style="flex-wrap:wrap">${chip('전체 128', { on: true })}${chip('정상 124')}${chip('확인 필요 4')}</div><span class="tp-caption">빨간 줄을 눌러 바로 고칠 수 있어요</span></div>
        <div class="tp-scroll-x">${tbl}</div>`)}
    </div>
    <aside class="tp-aside-sticky">
      ${card(`<span class="tp-h3">접수 요약</span><div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-kv"><span>접수 인원</span>${T('124명')}</div><div class="tp-kv"><span>1인 응시료</span>${T('46,800원')}</div><div class="tp-kv"><span>단체 할인 10%</span>${T('-580,320원')}</div></div>${divider()}<div class="tp-total tp-between" style="align-items:baseline"><span class="tp-h4">합계</span><span class="tp-mid">${T('5,222,880원')}</span></div>${field('ga-bill', '결제 방법', select('세금계산서 발행', { id: 'ga-bill', size: 'medium' }))}`)}
      ${btn('다음: 확인하기', { variant: 'brandSolid', size: 'large', fill: true, icEnd: 'arrow-right' })}
      <p class="tp-caption" style="text-align:center">확인이 필요한 4명은 빼고 접수해요</p>
    </aside>
  </div>
</main>`;
  return { slug: 'exam-group-apply', en: 'Group Application', name: '단체 접수', group: 'Exam B2B', desc: '기관 담당자가 명단 파일을 올려 한 번에 접수하는 화면입니다. 고쳐야 할 행은 올리자마자 알려 줍니다.', css, body: frame(orgNav(1), '단체 접수', main) };
};

/* 5. 응시자 관리 (기관) -------------------------------------------- */
const roster = () => {
  const people = [['김민준', '20231042', '경영학과', 'A-012', true, '접수 완료'], ['이서연', '20231107', '경영학과', 'A-013', true, '접수 완료'], ['박지후', '20220388', '국제통상학과', 'A-021', false, '접수 완료'], ['최하은', '20240215', '영어영문학과', 'B-004', true, '접수 완료'], ['정민재', '20230877', '컴퓨터공학과', 'B-011', true, '접수 완료'], ['한지아', '20230561', '컴퓨터공학과', 'B-012', false, '접수 완료'], ['오도윤', '20221190', '경제학과', '-', false, '취소'], ['윤채원', '20240033', '경제학과', 'C-002', true, '접수 완료']];
  const rows = people.map(([n, id, dep, seat, sent, st]) => [K.checkOnly(n + ' 고르기'), `<div class="tp-row">${avatar(n, 28)}<span>${n}</span></div>`, T(id), dep, T(seat), `<span class="tp-row">${dot(sent ? 'positive' : 'warning')}${sent ? '보냄' : '안 보냄'}</span>`, badge(st, st === '취소' ? '' : 'informative'), iconBtn('ellipsis', '더 보기', { size: 'xsmall' })]);
  const css = CSS;
  const main = `${head('응시자 관리', { sub: '12월 6일 (토) 영어 읽기 듣기 시험 / 단체 접수 124명', tools: `${btn('명단 내려받기', { ic: 'download' })}${btn('수험표 보내기', { variant: 'brandSolid', ic: 'mail' })}` })}
<main class="tp-content">
  ${card(`<div class="tp-stats"><div><span class="tp-sub">접수</span><span class="tp-mid">${T('124명')}</span></div><div><span class="tp-sub">수험표 보냄</span><span class="tp-mid">${T('118명')}</span></div><div><span class="tp-sub">수험표 안 보냄</span><span class="tp-mid">${T('6명')}</span></div><div><span class="tp-sub">취소</span><span class="tp-mid">${T('2명')}</span></div></div>`)}
  ${card(`<div class="tp-between"><div class="tp-row" style="flex-wrap:wrap">${search('ro-q', '이름, 학번 찾기')}${select('학과 전체', { id: 'ro-dep', aria: '학과' })}${select('상태 전체', { id: 'ro-st', aria: '상태' })}</div>${chiptabs(['전체', '안 보냄 6', '취소 2'], 0, '빠른 거르기')}</div>
    <div class="tp-scroll-x">${table([[K.checkOnly('모두 고르기')], ['이름'], ['학번'], ['학과'], ['좌석'], ['수험표'], ['상태'], ['']], rows, { interactive: true })}</div>${tablePager(124, 8)}`)}
</main>`;
  return { slug: 'exam-group-roster', en: 'Candidate Roster', name: '응시자 관리', group: 'Exam B2B', desc: '단체로 접수한 응시자를 찾아보고 관리하는 표입니다. 여러 명을 골라 수험표를 한 번에 보냅니다.', css, body: frame(orgNav(2), '응시자 관리', main) };
};

/* 6. 단체 성적 대시보드 (기관) ------------------------------------- */
const groupDash = () => {
  const css = CSS + `
  .tp-rank { display: grid; grid-template-columns: 24px minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; }
  .tp-rank > :first-child { color: var(--ds-color-fg-neutral-subtle); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; }
`;
  const deps = [['영어영문학과', 86, '812점'], ['국제통상학과', 78, '764점'], ['경영학과', 71, '726점'], ['경제학과', 64, '690점'], ['컴퓨터공학과', 58, '652점']];
  const main = `${head('응시 현황과 성적', { sub: '2026년 2학기 / 단체 응시 4회', tools: `${select('12월 6일 시험', { id: 'gd-round', aria: '시험 회차' })}${btn('리포트 받기', { ic: 'download' })}` })}
<main class="tp-content">
  <div class="tp-g4">${kpi('응시 인원', '118명', { note: '접수 124명 중 95%' })}${kpi('평균 점수', '712점', { d: '+24', note: '지난 회차보다' })}${kpi('목표 달성', '64%', { d: '+8%p', note: '목표 700점 이상' })}${kpi('최고 점수', '965점', { note: '영어영문학과' })}</div>
  <div class="tp-g3">
    ${card(`<div class="tp-between"><span class="tp-h3">점수 분포</span><span class="tp-caption">100점 구간별 인원</span></div>${barChart([[2], [5], [9], [18], [27], [31], [17], [9]], { x: ['300', '400', '500', '600', '700', '800', '900', '990'], label: '점수 구간별 인원' })}`, { cls: 'tp-span2' })}
    ${card(`<span class="tp-h3">목표 달성</span><div style="display:grid;place-items:center">${donut([['달성', 64, C(0)], ['미달', 36, 'var(--ds-color-bg-neutral)']], { center: '64%', sub: '76명 달성', label: '목표 달성 비율' })}</div>${legend([['700점 이상', 0, '76명'], ['700점 미만', 'var(--ds-color-bg-neutral)', '42명']])}`)}
  </div>
  <div class="tp-g2">
    ${card(`<span class="tp-h3">학과별 목표 달성</span><div class="tp-stack" style="gap: var(--ds-space-x4)">${deps.map(([d, v, s]) => K.meter(d, v, `${v}% / 평균 ${s}`)).join('')}</div>`)}
    ${card(`<div class="tp-between"><span class="tp-h3">회차별 평균</span>${legend([['우리 기관', 0], ['전체 응시자', 1]])}</div>${lineChart([{ name: '우리 기관', data: [648, 671, 688, 712] }, { name: '전체 응시자', data: [655, 660, 662, 668], dash: true }], { h: 200, x: ['3월', '6월', '9월', '12월'], label: '회차별 평균 점수' })}`)}
  </div>
  <div class="tp-g2">
    ${card(`<div class="tp-between"><span class="tp-h3">점수 오른 학생</span>${link('모두 보기')}</div><div class="tp-rows">${[['이서연', '경영학과', '+135점'], ['최하은', '영어영문학과', '+110점'], ['김민준', '경영학과', '+95점'], ['윤채원', '경제학과', '+80점']].map(([n, d, v], i) => `<div class="tp-rank"><span>${i + 1}</span><div class="tp-row">${avatar(n, 28)}<div class="tp-stack"><span>${n}</span><span class="tp-caption">${d}</span></div></div>${K.delta(v)}</div>`).join('')}</div>`)}
    ${card(`<div class="tp-between"><span class="tp-h3">다시 응시가 필요한 학생</span>${badge('42명', 'warning')}</div><p class="tp-sub">목표에 못 미친 학생에게 다음 회차 안내와 할인 쿠폰을 보낼 수 있어요.</p><div class="tp-rows">${[['박지후', '국제통상학과', '612점'], ['정민재', '컴퓨터공학과', '598점'], ['한지아', '컴퓨터공학과', '575점']].map(([n, d, s]) => `<div class="tp-between"><div class="tp-row">${avatar(n, 28)}<div class="tp-stack"><span>${n}</span><span class="tp-caption">${d}</span></div></div>${T(s)}</div>`).join('')}</div>${btn('안내 보내기', { variant: 'neutralSolid', ic: 'mail', fill: true })}`)}
  </div>
</main>`;
  return { slug: 'exam-group-dashboard', en: 'Group Score Dashboard', name: '단체 성적 대시보드', group: 'Exam B2B', desc: '기관이 단체 응시 결과를 한눈에 보는 대시보드입니다.', css, body: frame(orgNav(3), '성적 리포트', main) };
};

export const templates = [apply, mine, score, groupApply, roster, groupDash].map((f) => f());

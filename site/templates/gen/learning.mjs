// 기업, 대학 대상 러닝 플랫폼 템플릿(Learning B2B): 학습자 화면과 교육 담당자 화면.
// AI 맞춤 추천, AI 튜터(요약, 퀴즈, 질문), 법정 필수 교육, 사내 지식 공유를 담는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar, sidenav, frame, tags } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, field, input, select, checkbox, divider, chip, chiptabs, tabs, segmented, progress, table, tablePager, avatar, callout, dot, link, lineChart, barChart, donut, legend, meter, kpi, search, sw, thumb, pagination, C, esc } = K;

const LEARN_MENU = ['홈', '과정 찾기', '내 학습', '지식 공유'];
const learnEnd = `${btn('AI 어드바이저', { size: 'xsmall', ic: 'sparkles' })}${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('와이비엠', 28)}`;
const ORG = '한빛전자';
const adminNav = (cur) => sidenav(ORG, [['', [['홈', 'house', cur === 0], ['과정 운영', 'book-open', cur === 1], ['학습자', 'users', cur === 2], ['필수 교육', 'shield-check', cur === 3], ['학습 현황', 'chart-column', cur === 4]]], ['지식', [['사내 지식', 'lightbulb', false], ['AI 튜터 설정', 'sparkles', false]]]], [['설정', 'settings', false]]);
const CSS = FRAME_CSS + `
  .tp-course { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-width: 0; color: inherit; text-decoration: none; }
  .tp-course__title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); font-weight: var(--ds-font-weight-semibold); }
  .tp-course__meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); }
  .tp-star { display: inline-flex; align-items: center; gap: 2px; font-size: var(--ds-font-size-t03); line-height: var(--ds-line-height-t03); font-variant-numeric: tabular-nums; }
  .tp-star .ds-icon { --ds-icon-size: 14px; color: var(--ds-color-fg-warning); }
  .tp-cover { position: relative; }
  .tp-ask { display: flex; align-items: center; gap: var(--ds-space-x2); }
  .tp-ask > .ds-input { flex: 1 1 auto; }
  .tp-cover > .ds-badge { position: absolute; top: var(--ds-space-x2); left: var(--ds-space-x2); }
`;
// 표지 자리: 회색 한 가지(여러 색을 쓰지 않는다)
const COVER = { '처음 만나는 생성형 AI 업무 활용': 0, '엑셀 함수와 피벗 한 번에': 1, '데이터로 말하는 보고서 쓰기': 2, '개인정보 보호 교육': 3, '팀장의 1:1 대화법': 4, '설득하는 프레젠테이션 구조 잡기': 5, '비즈니스 영어 이메일 바로 쓰기': 6, '파이썬으로 하는 업무 자동화': 7, '직장 내 괴롭힘 예방 교육': 8, '고객의 말을 듣는 인터뷰': 9, '프로젝트 일정과 위험 관리': 10, '일본어 업무 회화 첫걸음': 11 };
const cover = (i, ratio = '16:9', b = '', title = '') => `<div class="tp-cover">${thumb(ratio, '', K.photo('study', title in COVER ? COVER[title] : i, 720), 'lg')}${b}</div>`;
const star = (r, n) => `<span class="tp-star">${icon('star-solid')}${r} <span class="tp-caption">(${n})</span></span>`;
const course = (i, title, meta, { b = '', r = '4.8', n = '1,204', prog = -1 } = {}) => `<a class="tp-course" href="#">${cover(i, '16:9', b, title)}<div class="tp-stack" style="gap: var(--ds-space-x1)"><span class="tp-course__title">${title}</span><div class="tp-course__meta">${tags(meta)}${r ? star(r, n) : ''}</div>${prog >= 0 ? progress(prog, { label: title + ' 진도' }) : ''}</div></a>`;

/* 1. 학습 홈 (학습자) ---------------------------------------------- */
const home = () => {
  const css = CSS + `
  .tp-hello { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); align-items: center; }
  @media (min-width: 1024px) { .tp-hello { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); } }
  .tp-resume { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); align-items: center; }
  @media (min-width: 768px) { .tp-resume { grid-template-columns: 280px minmax(0, 1fr); } }
  .tp-must { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x2) var(--ds-space-x4); align-items: center; }
`;
  const must = (t, due, v, done = false) => `<div class="tp-must"><div class="tp-stack" style="gap: var(--ds-space-x2)"><div class="tp-row"><span class="tp-h4">${t}</span>${done ? badge('이수 완료', 'positive') : badge(due, due.startsWith('D-') && parseInt(due.slice(2)) <= 7 ? 'critical' : 'warning')}</div>${done ? '' : progress(v, { label: t + ' 진도' })}</div>${done ? btn('이수증', { size: 'xsmall', ic: 'download' }) : btn(v ? '이어 하기' : '시작하기', { size: 'xsmall' })}</div>`;
  const body = `<div class="tp-app">${topbar(LEARN_MENU, 0, learnEnd)}
<main class="tp-content">
  <div class="tp-hello">
    <div class="tp-stack" style="gap: var(--ds-space-x2)"><h1 class="tp-h1">와이비엠 님, 오늘도 10분만 배워 볼까요?</h1><p class="tp-sub">이번 주 목표 3시간 중 2시간 40분을 채웠어요.</p></div>
    ${card(`<div class="tp-stats" style="--n:3"><div><span class="tp-sub">이번 주 학습</span><span class="tp-mid">${T('2시간 40분')}</span></div><div><span class="tp-sub">연속 학습</span><span class="tp-mid">${T('6일')}</span></div><div><span class="tp-sub">이수한 과정</span><span class="tp-mid">${T('12개')}</span></div></div>`)}
  </div>
  <section class="tp-sec">${secHead('이어서 보기')}
    ${card(`<div class="tp-resume">${cover(2)}<div class="tp-stack" style="gap: var(--ds-space-x3)">${badge('직무', 'informative')}<span class="tp-mid">데이터로 말하는 보고서 쓰기</span><span class="tp-sub">3강. 숫자를 그림으로 바꾸기 · 12분 남음</span>${meter('진도', 25, '3 / 12강')}<div class="tp-row" style="flex-wrap:wrap">${btn('이어 보기', { variant: 'brandSolid', ic: 'play' })}${btn('AI 요약 보기', { ic: 'sparkles' })}</div></div></div>`)}
  </section>
  <div class="tp-g2">
    <section class="tp-sec">${secHead('꼭 들어야 하는 교육', { sub: '법정 필수', tools: link('모두 보기') })}
      ${card(`<div class="tp-rows">${must('개인정보 보호 교육', 'D-5', 40)}${must('직장 내 괴롭힘 예방 교육', 'D-12', 0)}${must('산업 안전 보건 교육', '', 100, true)}</div>`)}
    </section>
    <section class="tp-sec">${secHead('AI 어드바이저에게 물어보기')}
      ${card(`<div class="tp-row" style="align-items:flex-start; gap: var(--ds-space-x3)">${icon('sparkles', 'lg')}<p class="tp-sub" style="flex:1">팀장이 되었다면 어떤 과정부터 들으면 좋을지, 이번 달 필수 교육은 무엇인지 물어보세요.</p></div><div class="tp-row" style="flex-wrap:wrap">${['신임 팀장 추천 과정', '남은 필수 교육', '엑셀 함수 빨리 배우기'].map((t) => chip(t)).join('')}</div><div class="tp-ask">${K.even(`${input('lh-ask', 'placeholder="궁금한 것을 적어 보세요" aria-label="AI 어드바이저에게 질문"')}${iconBtn('arrow-up', '보내기', { variant: 'neutralSolid' })}`)}</div>`)}
    </section>
  </div>
  <section class="tp-sec">${secHead('와이비엠 님을 위한 추천', { sub: '직무와 지난 학습을 보고 AI가 골랐어요', tools: link('더 보기') })}
    <div class="tp-g4">${course(1, '처음 만나는 생성형 AI 업무 활용', ['3시간', '입문'], { b: badge('신규', 'brand', true) })}${course(2, '설득하는 프레젠테이션 구조 잡기', ['5시간', '중급'], { r: '4.7', n: '862' })}${course(3, '팀장의 1:1 대화법', ['2시간', '중급'], { r: '4.9', n: '2,310' })}${course(4, '비즈니스 영어 이메일 바로 쓰기', ['8시간', '입문'], { r: '4.6', n: '540' })}</div>
  </section>
  <section class="tp-sec">${secHead('사내 지식', { sub: '동료가 나눈 노하우', tools: link('지식 공유하기') })}
    ${card(`<div class="tp-rows">${[['신규 입사자 온보딩 체크리스트', '인사팀 · 이서연', 128], ['고객 문의 응답 문장 모음', '고객경험팀 · 박지후', 96], ['분기 보고서 템플릿과 작성 팁', '전략기획팀 · 최하은', 74]].map(([t, w, l]) => `<div class="tp-between"><div class="tp-stack"><span class="tp-h4">${t}</span><span class="tp-caption">${w}</span></div><span class="tp-row tp-caption">${icon('thumbs-up', 'sm')}${T(l)}</span></div>`).join('')}</div>`)}
  </section>
</main></div>`;
  return { slug: 'learning-home', en: 'Learning Home', name: '학습 홈', group: 'Learning B2B', desc: '임직원이 처음 보는 학습 홈입니다. 이어서 볼 강의와 필수 교육을 먼저 보여 줍니다.', css, body };
};

/* 2. 과정 찾기 ---------------------------------------------------- */
const catalog = () => {
  const css = CSS + `
  .tp-cat-head { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-cat-head .ds-input { max-width: 560px; }
  .tp-g4c { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ds-space-x8) var(--ds-space-x4); }
  @media (min-width: 1024px) { .tp-g4c { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ds-space-x10) var(--ds-space-x6); } }
`;
  const items = [['처음 만나는 생성형 AI 업무 활용', ['3시간', '입문'], '신규'], ['엑셀 함수와 피벗 한 번에', ['6시간', '입문'], ''], ['데이터로 말하는 보고서 쓰기', ['4시간', '중급'], ''], ['개인정보 보호 교육', ['1시간', '필수'], '필수'], ['팀장의 1:1 대화법', ['2시간', '중급'], '인기'], ['설득하는 프레젠테이션 구조 잡기', ['5시간', '중급'], ''], ['비즈니스 영어 이메일 바로 쓰기', ['8시간', '입문'], ''], ['파이썬으로 하는 업무 자동화', ['12시간', '중급'], '신규'], ['직장 내 괴롭힘 예방 교육', ['1시간', '필수'], '필수'], ['고객의 말을 듣는 인터뷰', ['3시간', '입문'], ''], ['프로젝트 일정과 위험 관리', ['4시간', '중급'], ''], ['일본어 업무 회화 첫걸음', ['10시간', '입문'], '']];
  const tone = { 신규: 'brand', 필수: 'critical', 인기: 'warning' };
  const body = `<div class="tp-app">${topbar(LEARN_MENU, 1, learnEnd)}
<main class="tp-content">
  <div class="tp-cat-head"><h1 class="tp-h1">과정 찾기</h1>${search('lc-q', '배우고 싶은 것을 찾아보세요', 'medium')}${chiptabs(['전체', 'AI·디지털', '직무', '리더십', '외국어', '법정 필수', '자기계발'], 0, '분류')}</div>
  <div class="tp-between"><span class="tp-sub">과정 ${T('248')}개</span><div class="tp-row">${select('수준 전체', { id: 'lc-lv', aria: '수준' })}${select('학습 시간 전체', { id: 'lc-time', aria: '학습 시간' })}${select('인기순', { id: 'lc-sort', aria: '정렬' })}</div></div>
  <div class="tp-g4c">${items.map(([t, m, b], i) => course(i, t, m, { b: b ? badge(b, tone[b], true) : '', r: (4.5 + (i % 5) / 10).toFixed(1), n: String(320 + i * 137) })).join('')}</div>
  <div style="display:flex;justify-content:center">${pagination(1, 21)}</div>
</main></div>`;
  return { slug: 'learning-catalog', en: 'Course Catalog', name: '과정 찾기', group: 'Learning B2B', desc: '듣고 싶은 과정을 찾는 목록입니다. 분류와 수준, 학습 시간으로 걸러 봅니다.', css, body };
};

/* 3. 강의 보기 + AI 튜터 ------------------------------------------- */
const player = () => {
  const css = CSS + `
  .tp-pl { display: flex; flex-direction: column; min-height: 100vh; }
  .tp-pl__bar { display: flex; align-items: center; gap: var(--ds-space-x3); padding: var(--ds-space-x2) var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-pl__bar .ds-progress { width: 120px; }
  .tp-pl__body { display: flex; flex-direction: column; flex: 1 1 auto; }
  .tp-pl__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); flex: 1 1 auto; min-width: 0; padding: var(--ds-space-x6) var(--ds-space-x4) var(--ds-space-x12); }
  .tp-video { position: relative; display: grid; place-items: center; aspect-ratio: 16 / 9; border-radius: var(--ds-shape-xl); background: var(--ds-color-palette-static-black); color: var(--ds-color-palette-static-white); }  /* 영상 자리는 화면 모드와 상관없이 늘 검정 */
  .tp-video__play { display: grid; place-items: center; width: 64px; height: 64px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white-alpha-300); }
  .tp-video__play .ds-icon { --ds-icon-size: 28px; }
  .tp-video__bar { position: absolute; inset: auto var(--ds-space-x4) var(--ds-space-x3); display: flex; align-items: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }
  .tp-video__track { flex: 1 1 auto; height: 4px; border-radius: var(--ds-shape-pill); background: var(--ds-color-palette-static-white-alpha-300); overflow: hidden; }
  .tp-video__track > span { display: block; width: 38%; height: 100%; background: var(--ds-color-palette-static-white); }
  .tp-curr { display: flex; flex-direction: column; gap: var(--ds-space-x1); padding: var(--ds-space-x6) var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-lesson { display: grid; grid-template-columns: 20px minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; padding: var(--ds-space-x3); border-radius: var(--ds-shape-lg); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-lesson[aria-current] { background: var(--ds-color-bg-neutral-muted); font-weight: var(--ds-font-weight-semibold); }
  .tp-lesson .ds-icon { color: var(--ds-color-fg-neutral-subtle); }
  .tp-lesson[data-done] .ds-icon { color: var(--ds-color-fg-positive); }
  .tp-chap { padding: var(--ds-space-x4) var(--ds-space-x3) var(--ds-space-x1); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); font-weight: var(--ds-font-weight-semibold); }
  .tp-tutor { display: flex; flex-direction: column; gap: var(--ds-space-x4); padding: var(--ds-space-x5); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-neutral-muted); }
  .tp-tutor ul { margin: 0; padding-inline-start: 1.2em; display: flex; flex-direction: column; gap: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  @media (min-width: 1024px) { .tp-pl__body { flex-direction: row; } .tp-curr { flex: none; width: 360px; box-shadow: inset 1px 0 0 var(--ds-color-stroke-neutral-muted); } .tp-pl__main { padding: var(--ds-space-x8) var(--ds-space-x10) var(--ds-space-x16); } }
`;
  const L = (t, d, st = '') => `<a class="tp-lesson" href="#"${st === 'done' ? ' data-done' : ''}${st === 'cur' ? ' aria-current="true"' : ''}>${icon(st === 'done' ? 'circle-check-solid' : st === 'cur' ? 'play' : 'circle')}<span>${t}</span><span class="tp-caption tp-num">${d}</span></a>`;
  const body = `<div class="tp-pl">
  <div class="tp-pl__bar">${iconBtn('arrow-left', '뒤로', { size: 'small' })}<span class="tp-h4" style="flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap">데이터로 말하는 보고서 쓰기</span><span class="tp-caption tp-hide-sm">진도 25%</span><span class="tp-hide-sm">${progress(25, { label: '진도' })}</span>${iconBtn('bookmark', '저장', { size: 'small' })}</div>
  <div class="tp-pl__body">
    <main class="tp-pl__main">
      <div class="tp-video" role="img" aria-label="강의 영상"><span class="tp-video__play">${icon('play')}</span><div class="tp-video__bar"><span>04:31</span><span class="tp-video__track"><span></span></span><span>12:08</span>${icon('maximize-2', 'sm')}</div></div>
      <div class="tp-stack" style="gap: var(--ds-space-x2)"><h1 class="tp-h1">3강. 숫자를 그림으로 바꾸기</h1>${tags(['2장 보고서의 뼈대', '12분', '강사 정민재'], 't4')}</div>
      ${tabs(['AI 튜터', '노트', '질문 8', '자료 2'], 0, '강의 탭')}
      <div class="tp-tutor">
        <div class="tp-between"><span class="tp-row tp-h3">${icon('sparkles')}이 강의 핵심 요약</span>${badge('AI가 만들었어요')}</div>
        <ul><li>표보다 그래프가 나은 때는 바뀌는 흐름이나 비교를 보여 줄 때예요.</li><li>그래프 하나에는 말하고 싶은 메시지 하나만 담아요.</li><li>강조할 값만 진한 색, 나머지는 회색으로 두면 눈이 바로 가요.</li></ul>
        <div class="tp-row" style="flex-wrap:wrap">${btn('퀴즈 3문제 풀기', { variant: 'neutralSolid', ic: 'list-checks' })}${btn('요약 노트에 담기', { ic: 'save' })}</div>
      </div>
      <div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-h3">튜터에게 질문하기</span><div class="tp-ask">${K.even(`${input('pl-ask', 'placeholder="이 강의에서 궁금한 것을 물어보세요" aria-label="튜터에게 질문"')}${iconBtn('arrow-up', '보내기', { variant: 'neutralSolid' })}`)}</div><div class="tp-row" style="flex-wrap:wrap">${['막대와 선 그래프는 언제 써요?', '예시 보고서 보여 줘'].map((t) => chip(t)).join('')}</div></div>
    </main>
    <aside class="tp-curr" aria-label="커리큘럼">
      <div class="tp-between" style="padding-inline: var(--ds-space-x3)"><span class="tp-h3">커리큘럼</span><span class="tp-caption">${T('3 / 12강')}</span></div>
      <div class="tp-chap">1장 왜 보고서인가</div>${L('1강. 읽히는 보고서의 조건', '08:12', 'done')}${L('2강. 결론부터 쓰기', '10:40', 'done')}
      <div class="tp-chap">2장 보고서의 뼈대</div>${L('3강. 숫자를 그림으로 바꾸기', '12:08', 'cur')}${L('4강. 한 장 요약 만들기', '09:55')}${L('5강. 표 깔끔하게 다듬기', '11:20')}
      <div class="tp-chap">3장 실전 연습</div>${L('6강. 주간 보고 다시 쓰기', '14:02')}${L('7강. 분기 보고 발표하기', '13:30')}${L('퀴즈. 2장 확인 문제', '5문제')}
    </aside>
  </div>
</div>`;
  return { slug: 'learning-player', en: 'Course Player', name: '강의 보기', group: 'Learning B2B', desc: '강의를 들으며 AI 튜터에게 요약과 퀴즈를 받는 화면입니다.', css, body };
};

/* 4. 과정 운영 (교육 담당자) ---------------------------------------- */
const admin = () => {
  const css = CSS + `
  .tp-ad { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); }
  @media (min-width: 1280px) { .tp-ad { grid-template-columns: minmax(0, 1fr) 340px; align-items: start; } }
  .tp-ad .ds-table th:first-child { width: 38%; }
  .tp-ad .ds-table td:first-child { white-space: normal; }
  .tp-opt { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
`;
  const rows = [['데이터로 말하는 보고서 쓰기', '3기', '직무', '11.03 ~ 11.28', '전략기획팀 외 2', 86, 72, '진행 중'], ['개인정보 보호 교육', '2026', '법정 필수', '11.01 ~ 11.30', '전체 임직원', 1240, 58, '진행 중'], ['신임 팀장 리더십', '5기', '리더십', '11.10 ~ 12.12', '신임 팀장', 24, 31, '진행 중'], ['처음 만나는 생성형 AI 업무 활용', '2기', 'AI·디지털', '11.17 ~ 12.05', '희망자', 312, 0, '예정'], ['비즈니스 영어 이메일', '4기', '외국어', '10.06 ~ 10.31', '해외영업팀', 41, 95, '끝남']];
  const st = { '진행 중': 'informative', 예정: '', 끝남: 'positive' };
  const trs = rows.map(([n, g, cat, per, who, cnt, v, s], i) => [`<div class="tp-stack"><span class="tp-h4">${n}</span><span class="tp-caption">${g} · ${per}</span></div>`, badge(cat), T(cnt.toLocaleString() + '명'), `<div class="tp-track" style="min-width:120px">${progress(v, { label: n + ' 이수율' })}<span class="tp-caption tp-num">${v}%</span></div>`, badge(s, st[s]), iconBtn('ellipsis', '더 보기', { size: 'xsmall' })]);
  const main = `${head('과정 운영', { sub: '과정마다 차수를 열고 대상자와 알림을 정해요.', tools: btn('과정 만들기', { variant: 'brandSolid', ic: 'plus' }) })}
<main class="tp-content">
  <div class="tp-ad">
    ${card(`<div class="tp-between">${tabs(['진행 중 12', '예정 4', '끝남 30'], 0, '과정 상태')}${search('ad-q', '과정 찾기', 'medium')}</div><div class="tp-scroll-x">${table([['과정'], ['분류'], ['수강', 'right'], ['이수율'], ['상태'], ['']], trs, { interactive: true, compact: false }).replace('<tr data-interactive>', '<tr data-interactive aria-selected="true">')}</div>${tablePager(12, 5)}`)}
    <aside class="tp-aside-sticky">
      ${card(`<div class="tp-stack"><span class="tp-caption">고른 과정</span><span class="tp-h3">데이터로 말하는 보고서 쓰기 3기</span></div>
        <div class="tp-stack" style="gap: var(--ds-space-x2)">${[['기간', '11월 3일 ~ 11월 28일'], ['수강', '86명'], ['이수 기준', '진도 80% + 퀴즈 60점']].map(([k, v]) => `<div class="tp-kv"><span>${k}</span><span>${v}</span></div>`).join('')}</div>${divider()}
        <span class="tp-h4">대상 부서</span><div class="tp-row" style="flex-wrap:wrap">${['전략기획팀', '재무팀', '영업관리팀'].map((t) => chip(t + ' ×', { on: true })).join('')}${chip('+ 추가')}</div>${divider()}
        <span class="tp-h4">알림</span>${[['시작 알림', true], ['마감 3일 전 알림', true], ['진도 낮은 학습자 독려', true], ['AI 튜터 요약 메일', false]].map(([t, on]) => `<label class="tp-opt"><span>${t}</span>${sw(t, on)}</label>`).join('')}
        ${btn('저장', { variant: 'neutralSolid', fill: true })}`)}
    </aside>
  </div>
</main>`;
  return { slug: 'learning-admin', en: 'Course Operations', name: '과정 운영', group: 'Learning B2B', desc: '교육 담당자가 과정과 차수를 운영하는 화면입니다.', css, body: frame(adminNav(1), '과정 운영', main) };
};

/* 5. 학습 현황 대시보드 (교육 담당자) -------------------------------- */
const dash = () => {
  const css = CSS + `
  .tp-due { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ds-space-x3); align-items: center; }
`;
  const deps = [['영업본부', 94], ['연구소', 88], ['경영지원', 81], ['생산본부', 72], ['고객경험팀', 63]];
  const top = [['처음 만나는 생성형 AI 업무 활용', 'AI·디지털', '1,082명', '4.8'], ['개인정보 보호 교육', '법정 필수', '1,240명', '4.2'], ['엑셀 함수와 피벗 한 번에', '직무', '764명', '4.7'], ['팀장의 1:1 대화법', '리더십', '418명', '4.9'], ['비즈니스 영어 이메일 바로 쓰기', '외국어', '355명', '4.6']];
  const main = `${head('학습 현황', { sub: '2026년 11월 · 전체 임직원 1,240명', tools: `${segmented(['이번 달', '분기', '올해'], 0, '기간')}${btn('리포트 받기', { ic: 'download' })}` })}
<main class="tp-content">
  <div class="tp-g4">${kpi('필수 교육 이수율', '82%', { d: '+6%p', note: '지난달보다' })}${kpi('1인 평균 학습', '6.2시간', { d: '+0.8', note: '이번 달' })}${kpi('학습한 사람', '1,018명', { note: '전체의 82%' })}${kpi('만족도', '4.6', { note: '5점 만점, 응답 2,140건' })}</div>
  <div class="tp-g3">
    ${card(`<div class="tp-between"><span class="tp-h3">월별 학습 시간</span>${legend([['자율 학습', 0], ['필수 교육', 1]])}</div>${lineChart([{ name: '자율 학습', data: [2100, 2380, 2290, 2620, 2810, 3050] }, { name: '필수 교육', data: [820, 760, 1240, 690, 720, 1480] }], { h: 220, x: ['6월', '7월', '8월', '9월', '10월', '11월'], label: '월별 학습 시간', unit: '' })}`, { cls: 'tp-span2' })}
    ${card(`<span class="tp-h3">분야별 비중</span><div style="display:grid;place-items:center">${donut([['직무', 38], ['AI·디지털', 24], ['리더십', 14], ['외국어', 12], ['법정 필수', 12]], { center: '3,050', sub: '시간', label: '분야별 학습 시간 비중' })}</div>${legend([['직무', 0, '38%'], ['AI·디지털', 1, '24%'], ['리더십', 2, '14%'], ['외국어', 3, '12%'], ['법정 필수', 4, '12%']])}`)}
  </div>
  <div class="tp-g2">
    ${card(`<div class="tp-between"><span class="tp-h3">부서별 필수 교육 이수율</span>${select('개인정보 보호 교육', { id: 'ld-must', aria: '필수 교육' })}</div><div class="tp-stack" style="gap: var(--ds-space-x4)">${deps.map(([d, v]) => meter(d, v, v + '%')).join('')}</div>`)}
    ${card(`<div class="tp-between"><span class="tp-h3">마감이 다가오는 미이수자</span>${badge('224명', 'critical')}</div><p class="tp-sub">개인정보 보호 교육 마감까지 5일 남았어요.</p><div class="tp-rows">${[['오도윤', '생산본부', 20], ['윤채원', '고객경험팀', 0], ['한지아', '생산본부', 35], ['정민재', '경영지원', 10]].map(([n, d, v]) => `<div class="tp-due"><div class="tp-row">${avatar(n, 28)}<div class="tp-stack"><span>${n}</span><span class="tp-caption">${d}</span></div></div><span class="tp-caption tp-num">진도 ${v}%</span></div>`).join('')}</div>${btn('독려 알림 보내기', { variant: 'neutralSolid', ic: 'bell', fill: true })}`)}
  </div>
  <div class="tp-g3">
    ${card(`<div class="tp-between"><span class="tp-h3">많이 들은 과정</span>${link('모두 보기')}</div>${table([['과정'], ['분야'], ['수강', 'right'], ['만족도', 'right']], top.map(([n, c, p, r]) => [n, badge(c), T(p), `<span class="tp-star">${icon('star-solid')}${r}</span>`]))}`, { cls: 'tp-span2' })}
    ${card(`<span class="tp-row tp-h3">${icon('sparkles')}AI 튜터 이용</span><div class="tp-stack" style="gap: var(--ds-space-x4)"><div class="tp-kv"><span>질문</span>${T('4,812건')}</div><div class="tp-kv"><span>요약 보기</span>${T('9,306회')}</div><div class="tp-kv"><span>퀴즈 풀이</span>${T('6,127회')}</div><div class="tp-kv"><span>답변 만족</span>${T('91%')}</div></div>${callout('', '퀴즈를 푼 학습자의 이수율이 18%p 높아요.', 'informative', 'lightbulb')}`)}
  </div>
</main>`;
  return { slug: 'learning-dashboard', en: 'Learning Dashboard', name: '학습 현황 대시보드', group: 'Learning B2B', desc: '교육 담당자가 전체 학습 현황을 보는 대시보드입니다. 마감이 다가오는 미이수자를 바로 찾습니다.', css, body: frame(adminNav(4), '학습 현황', main) };
};

export const templates = [home, catalog, player, admin, dash].map((f) => f());

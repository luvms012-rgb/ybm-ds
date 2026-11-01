import * as H from './helpers.mjs';
const { head, icon, appbar, topnav, sidenav, bottomnav, stepper, badge, btn, progress, bars, field, input, table, thumb, accordion, selectbox, LEARN_MENUS, LEARN_TABS, B2B_EXAM_NAV, B2B_LEARN_NAV, FOOT } = H;
export const pages = {};
const adminTop = (title, nav, current) => appbar(title) + topnav([['시험 관리', 'exam-b2b-dashboard.html'], ['교육 관리', 'learning-admin.html'], ['고객센터', 'help-center.html']], title.includes('교육') ? '교육 관리' : '시험 관리', `${btn('도움말', { variant: 'ghost', size: 'xsmall', iconName: 'info' })}<a class="ds-avatar" href="#" aria-label="박담당, 관리자"><span class="ds-avatar__initials" aria-hidden="true">박</span></a>`) + `<div class="tp-layout">` + sidenav(nav, current) + `<main class="tp-main" style="max-width: none">`;
const adminEnd = `</main></div>` + FOOT;
const checkbox = (on, label) => `<label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"${on ? ' checked' : ''} aria-label="${label || '선택'}"></label>`;

// 7. 단체 접수
pages['group-registration'] = head('단체 접수', `  .tp-upload { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x4); }
  .tp-result { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ybm-space-x2); }
  .tp-result > div { display: flex; flex-direction: column; gap: var(--ybm-space-x1); padding: var(--ybm-space-x3) var(--ybm-space-x4); border-radius: var(--ybm-shape-md); background: var(--ybm-color-bg-neutral); }
  .tp-result b { font-size: var(--ybm-font-size-t08); line-height: var(--ybm-line-height-t08); font-weight: var(--ybm-font-weight-bold); }
  .tp-fix .ds-input { min-width: 140px; }
  @media (min-width: 768px) { .tp-two { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: var(--ybm-space-x6); align-items: start; } .tp-sticky { position: sticky; top: 72px; } }
`) + adminTop('단체 접수', B2B_EXAM_NAV, '단체 접수') + `
  <header class="tp-stack"><h1 class="tp-h1">단체 접수</h1><p class="tp-sub">명단 파일 하나로 임직원을 한 번에 접수해요. 응시료는 회사 계정으로 한 번에 결제돼요.</p></header>
  ${stepper(['시험 선택', '명단 올리기', '확인', '결제'], 1)}
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ybm-space-x6)">
      <section class="tp-box" aria-labelledby="up-title">
        <div class="tp-boxhead"><h2 class="tp-h3" id="up-title">명단 올리기</h2>${btn('양식 내려받기 (xlsx)', { size: 'small', iconName: 'file-text' })}</div>
        <div class="ds-callout" data-tone="informative">${icon('info-solid')}<p class="ds-callout__content">양식의 열 순서를 바꾸지 마세요. 이름, 생년월일, 휴대폰, 이메일, 부서, 사번 6개 열이 필요하고 한 번에 500명까지 올릴 수 있어요.</p></div>
        <div class="ds-fileattach">
          <label class="ds-fileattach__dropzone"><input type="file" class="ds-fileattach__input" accept=".xlsx,.csv"><span class="ds-fileattach__label">명단 파일(xlsx, csv)을 끌어 놓거나 눌러서 올리세요</span></label>
          <div class="ds-fileattach__items">
            <label class="ds-fileattach__trigger"><input type="file" class="ds-fileattach__input" aria-label="파일 추가">${icon('plus')}<span class="ds-fileattach__count"><b>1</b>/1</span></label>
            <div class="ds-fileitem"><span class="ds-fileitem__thumbnail">${icon('file-text')}</span><span class="ds-fileitem__texts"><span class="ds-fileitem__name">11월_토익_응시자_명단.xlsx</span><span class="ds-fileitem__size">48KB · 120명</span></span><button type="button" class="ds-fileitem__remove" aria-label="파일 빼기">${icon('x')}</button></div>
          </div>
        </div>
        <div class="tp-result" role="status">
          <div><span class="tp-caption">전체</span><b class="tp-num">120</b></div>
          <div><span class="tp-caption">바로 접수 가능</span><b class="tp-num" style="color: var(--ybm-color-fg-positive)">116</b></div>
          <div><span class="tp-caption">고쳐야 함</span><b class="tp-num" style="color: var(--ybm-color-fg-critical)">4</b></div>
        </div>
      </section>
      <section class="tp-box" aria-labelledby="fix-title">
        <div class="tp-boxhead"><h2 class="tp-h3" id="fix-title">고쳐야 할 줄 4개</h2><span class="tp-caption">여기서 바로 고치거나, 파일을 고쳐 다시 올리세요</span></div>
        <div class="tp-fix">${table([['줄', 'center'], ['이름'], ['문제'], ['고치기']], [
          ['12', '김하늘', badge('생년월일 형식', 'critical') + ' <span class="tp-caption">1998/3/4</span>', input('f1', 'value="1998-03-04" aria-label="생년월일"')],
          ['37', '이준호', badge('휴대폰 번호 없음', 'critical'), input('f2', 'placeholder="010-0000-0000" aria-label="휴대폰"')],
          ['58', '박서연', badge('이미 접수됨', 'warning') + ' <span class="tp-caption">개인 접수 11.04</span>', btn('명단에서 빼기', { size: 'xsmall' })],
          ['101', '최민재', badge('이메일 형식', 'critical') + ' <span class="tp-caption">minjae@</span>', input('f4', 'value="minjae@company.co.kr" aria-label="이메일"')],
        ], { compact: true })}</div>
        <div class="tp-row">${btn('고친 내용 저장', { variant: 'neutralSolid', size: 'small' })}${btn('오류 줄만 내려받기', { variant: 'ghost', size: 'small' })}</div>
      </section>
      <section class="tp-box" aria-labelledby="opt-title">
        <h2 class="tp-h3" id="opt-title">접수 옵션</h2>
        ${selectbox('center', [['고사장 자동 배정', '회사 주소에서 가까운 고사장부터 채워요', true], ['고사장 직접 지정', '명단의 모든 응시자가 같은 고사장에서 봐요']], { cols: 2 })}
        <fieldset class="ds-checkbox-group" aria-label="알림">
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">응시자에게 접수 완료와 수험표를 문자로 보내요</span></label>
          <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">성적이 나오면 회사 관리자에게 함께 공개해요 (응시자 동의 수집)</span></label>
        </fieldset>
      </section>
    </div>
    <aside class="tp-box tp-sticky" aria-labelledby="sum-title">
      <h2 class="tp-h3" id="sum-title">접수 요약</h2>
      <ul class="ds-list" data-divider>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">시험</span></span><span class="ds-list-item__suffix">TOEIC 제512회</span></div></li>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">시험일</span></span><span class="ds-list-item__suffix tp-num">2026.11.23 (일)</span></div></li>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">접수 인원</span></span><span class="ds-list-item__suffix tp-num">116명</span></div></li>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">단체 응시료</span><span class="ds-list-item__desc">1인 47,000원 · 단체 할인 적용</span></span><span class="ds-list-item__suffix tp-num">5,452,000원</span></div></li>
      </ul>
      <div class="ds-callout" data-tone="neutral">${icon('info-solid')}<p class="ds-callout__content">고쳐야 할 4명은 빼고 먼저 접수할 수 있어요. 나중에 추가 접수 기간에 더할 수 있어요.</p></div>
      <div class="tp-cta">${btn('116명 먼저 접수', { variant: 'brandSolid', size: 'large', fill: true })}</div>
    </aside>
  </div>
` + adminEnd;

// 8. 기업 시험 관리 대시보드
pages['exam-b2b-dashboard'] = head('기업 시험 관리', `  .tp-kpi { display: flex; flex-direction: column; gap: var(--ybm-space-x1); }
  .tp-bulk { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); padding: var(--ybm-space-x2) var(--ybm-space-x3); border-radius: var(--ybm-shape-md); background: var(--ybm-color-bg-brand-weak); }
  .tp-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); }
  .tp-toolbar .ds-input { flex: 1 1 220px; }
  @media (min-width: 768px) { .tp-two { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: var(--ybm-space-x4); align-items: start; } }
`) + adminTop('기업 시험 관리', B2B_EXAM_NAV, '대시보드') + `
  <header class="tp-between"><div class="tp-stack"><h1 class="tp-h1">시험 관리</h1><p class="tp-sub">회사 이름 · 2026년 11월 · 임직원 1,240명</p></div><div class="tp-row">${btn('성적 내려받기', { iconName: 'file-text' })}${btn('단체 접수', { variant: 'brandSolid', href: 'group-registration.html', iconName: 'plus' })}</div></header>
  <div class="tp-kpis">
    ${[['이번 달 접수', '240', '명 · 지난달보다 +32'], ['응시 완료', '212', '명 · 응시율 88%'], ['평균 점수', '712', '점 · 지난 회차 +18'], ['미응시', '28', '명 · 사유 입력 필요 9']].map(([l, v, d]) => `<section class="tp-box tp-kpi"><span class="tp-caption">${l}</span><b class="tp-num">${v}</b><span class="tp-caption">${d}</span></section>`).join('')}
  </div>
  <div class="tp-two">
    <section class="tp-box" aria-labelledby="round-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="round-title">회차별 접수 현황</h2>${btn('전체 보기', { variant: 'ghost', size: 'xsmall' })}</div>
      ${table([['회차'], ['시험일', 'center'], ['접수', 'right'], ['응시', 'right'], ['평균', 'right'], ['상태', 'center']], [
        ['TOEIC 512회', '11.23', '116', '-', '-', badge('접수 완료', 'positive')],
        ['TOEIC 511회', '11.09', '98', '91', '708', badge('성적 발표', 'informative')],
        ['OPIc 11월', '11.15', '26', '-', '-', badge('접수 중', 'positive')],
        ['TOEIC Speaking 10월', '10.26', '40', '38', '140', badge('완료')],
      ], { compact: true, interactive: true })}
    </section>
    <section class="tp-box" aria-labelledby="dept-title">
      <h2 class="tp-h3" id="dept-title">부서별 평균 점수 (511회)</h2>
      ${bars([['영업', 74, '735'], ['마케팅', 72, '712'], ['개발', 70, '698'], ['인사', 76, '751'], ['재무', 68, '676']])}
      <p class="tp-caption">막대는 990점 기준 비율이에요. 회사 평균 708점, 전국 평균 687점.</p>
    </section>
  </div>
  <section class="tp-box" id="people" aria-labelledby="people-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="people-title">응시자 관리 · 제512회</h2><span class="tp-caption">116명</span></div>
    <div class="tp-toolbar">
      <div class="ds-input" data-variant="outline" data-size="medium">${icon('search').replace('ds-icon"', 'ds-icon ds-input__icon"')}<input class="ds-input__control" type="search" placeholder="이름, 사번, 부서" aria-label="응시자 찾기"></div>
      <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="부서"><span class="ds-select__value">전체 부서</span></button>
      <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="상태"><span class="ds-select__value">전체 상태</span></button>
    </div>
    <div class="tp-bulk" role="status"><span class="tp-sub"><b class="tp-num">3명</b> 선택함</span><div class="tp-row">${btn('수험표 보내기', { size: 'small', variant: 'neutralSolid', iconName: 'share' })}${btn('고사장 변경', { size: 'small' })}${btn('접수 취소', { size: 'small', variant: 'ghost' })}</div></div>
    ${table([[checkbox(false, '전체 선택'), 'center'], ['이름'], ['부서'], ['사번', 'center'], ['고사장'], ['수험표', 'center'], ['상태', 'center'], ['', 'center']], [
      [checkbox(true), '<b>김민수</b>', '영업 1팀', 'A10231', '강남 제1고사장', badge('발송됨', 'positive'), badge('접수 완료', 'positive'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(true), '<b>이서연</b>', '마케팅팀', 'A10388', '서초 제2고사장', badge('발송됨', 'positive'), badge('접수 완료', 'positive'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(true), '<b>박지훈</b>', '개발 2팀', 'B20417', '강남 제1고사장', badge('대기'), badge('접수 완료', 'positive'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(false), '<b>최유나</b>', '인사팀', 'A10052', '종로 제1고사장', badge('대기'), badge('사진 미등록', 'warning'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(false), '<b>정하늘</b>', '재무팀', 'C30119', '-', badge('-'), badge('취소 요청', 'critical'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
    ], { compact: true })}
    <div class="tp-between"><span class="tp-caption">1~5 / 116명</span><nav class="ds-pagination" data-type="simple" aria-label="페이지"><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a><span class="ds-pagination__indicator"><b>1</b> / 24</span><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav></div>
  </section>
` + adminEnd;

// 9. 강좌 찾기
pages['course-catalog'] = head('강좌 찾기', `  .tp-filters { display: none; }
  .tp-cards { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x4); }
  .tp-course { display: flex; flex-direction: column; gap: var(--ybm-space-x3); color: inherit; text-decoration: none; }
  .tp-course__body { display: flex; flex-direction: column; gap: var(--ybm-space-x1); }
  .tp-course__title { font-size: var(--ybm-font-size-t05); line-height: var(--ybm-line-height-t05); font-weight: var(--ybm-font-weight-semibold); }
  .tp-course__price { display: flex; align-items: baseline; gap: var(--ybm-space-x2); }
  .tp-course__price b { font-size: var(--ybm-font-size-t06); font-weight: var(--ybm-font-weight-bold); }
  .tp-course__price s { color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t03); }
  .tp-toolbar { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
  @media (min-width: 768px) { .tp-two { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: var(--ybm-space-x8); align-items: start; } .tp-filters { display: flex; flex-direction: column; gap: var(--ybm-space-x6); position: sticky; top: 72px; } .tp-cards { grid-template-columns: repeat(2, 1fr); } .tp-mobile-filter { display: none; } }
  @media (min-width: 1280px) { .tp-cards { grid-template-columns: repeat(3, 1fr); } }
`) + appbar('강좌 찾기', { back: false, right: `<button type="button" class="ds-appbar__button" aria-label="검색">${icon('search')}</button>` }) + topnav(LEARN_MENUS, '강좌', `<a class="ds-avatar" href="my-learning.html" aria-label="김민수, 내 학습"><span class="ds-avatar__initials" aria-hidden="true">김</span></a>`) + `
<main class="tp-main">
  <header class="tp-stack u-show-from-md"><h1 class="tp-h1">강좌 찾기</h1><p class="tp-sub">목표 점수와 남은 기간에 맞는 강좌를 골라 보세요. 레벨 테스트를 보면 딱 맞는 강좌를 추천해 드려요.</p></header>
  <div class="ds-chiptabs tp-mobile-filter" role="tablist" aria-label="빠른 필터"><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">TOEIC 700+</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">TOEIC 900+</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">OPIc IH</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">라이브</button></div>
  <div class="tp-two">
    <aside class="tp-filters" aria-label="필터">
      <div class="tp-stack" style="gap: var(--ybm-space-x3)"><h2 class="tp-h3">목표</h2><fieldset class="ds-checkbox-group" aria-label="목표">${['TOEIC 700점', 'TOEIC 800점', 'TOEIC 900점', 'OPIc IM', 'OPIc IH 이상', 'TOEIC Speaking'].map((l, i) => `<label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"${i === 2 ? ' checked' : ''}><span class="ds-checkbox__label">${l}</span></label>`).join('')}</fieldset></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x3)"><h2 class="tp-h3">수업 방식</h2><fieldset class="ds-checkbox-group" aria-label="수업 방식">${['동영상 강의', '실시간 라이브', '1:1 코칭', '스터디 모임'].map((l) => `<label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">${l}</span></label>`).join('')}</fieldset></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x3)"><h2 class="tp-h3">기간</h2><div class="ds-radio-group" role="radiogroup" data-size="medium">${['전체', '4주 안에', '8주 안에', '12주 이상'].map((l, i) => `<label class="ds-radio"><input type="radio" class="ds-radio__control" name="len"${i === 0 ? ' checked' : ''}><span>${l}</span></label>`).join('')}</div></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x3)"><h2 class="tp-h3">가격</h2><input type="range" class="ds-slider" min="0" max="300000" step="10000" value="200000" aria-label="최대 가격"><span class="tp-caption">20만 원까지</span></div>
      ${btn('필터 초기화', { variant: 'ghost', size: 'small' })}
    </aside>
    <section aria-labelledby="list-title">
      <div class="tp-toolbar" style="margin-bottom: var(--ybm-space-x4)"><h2 class="tp-h3" id="list-title">강좌 <span class="tp-sub tp-num">128개</span></h2><div class="tp-row">${btn('필터', { size: 'small', iconName: 'menu', attrs: 'class="ds-btn tp-mobile-filter"' })}<button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬"><span class="ds-select__value">인기순</span></button></div></div>
      <div class="tp-cards">
        ${[['TOEIC 900+ 완성반 (8주)', '김강사', 4.9, 2140, 189000, 240000, '베스트', 'brand'], ['TOEIC 750 보장 라이브 (6주)', '이강사', 4.8, 980, 159000, 0, '라이브', 'informative'], ['OPIc IH 2주 완성', '박강사', 4.7, 1320, 99000, 129000, '', ''], ['TOEIC 듣기 집중 2주', '최강사', 4.6, 760, 59000, 0, '', ''], ['비즈니스 영어 말하기 12주', '정강사', 4.9, 410, 240000, 0, '1:1 코칭', 'positive'], ['TOEIC 기초 문법 4주', '한강사', 4.5, 2860, 39000, 59000, '입문', '']].map(([t, i, r, n, p, o, b, tone]) => `<a class="tp-course" href="course-detail.html">${thumb('', '16:9')}<div class="tp-course__body">${b ? badge(b, tone || 'neutral', !!tone) : ''}<span class="tp-course__title">${t}</span><span class="tp-caption">${i} · 수강생 ${n.toLocaleString()}명</span><span class="ds-rating" style="--ds-rating-value: ${r}" aria-label="평점 ${r}"><span class="ds-rating__stars" aria-hidden="true"></span><span class="ds-rating__value tp-num">${r}</span></span><span class="tp-course__price">${o ? `<span style="color: var(--ybm-color-fg-critical); font-weight: var(--ybm-font-weight-semibold)">${Math.round((1 - p / o) * 100)}%</span>` : ''}<b class="tp-num">${p.toLocaleString()}원</b>${o ? `<s class="tp-num">${o.toLocaleString()}원</s>` : ''}</span></div></a>`).join('')}
      </div>
      <nav class="ds-pagination" aria-label="페이지" style="justify-content: center; margin-top: var(--ybm-space-x8)"><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a><a class="ds-pagination__item" href="#" aria-current="page">1</a><a class="ds-pagination__item" href="#">2</a><a class="ds-pagination__item" href="#">3</a><span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span><a class="ds-pagination__item" href="#">22</a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>
    </section>
  </div>
</main>
${bottomnav(LEARN_TABS, '강좌')}
` + FOOT;

// 10. 강좌 상세
pages['course-detail'] = head('강좌 상세', `  .tp-main { max-width: 1120px; }
  .tp-hero { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x3); }
  .tp-lesson { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); padding: var(--ybm-space-x2) 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-lesson + .tp-lesson { border-top: 1px solid var(--ybm-color-stroke-neutral-weak); }
  .tp-review { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4) 0; }
  .tp-review + .tp-review { border-top: 1px solid var(--ybm-color-stroke-neutral-weak); }
  .tp-buy { display: flex; flex-direction: column; gap: var(--ybm-space-x4); }
  .tp-buy__price b { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); }
  .tp-cta-mobile { display: flex; }
  @media (min-width: 768px) { .tp-two { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: var(--ybm-space-x8); align-items: start; } .tp-sticky { position: sticky; top: 72px; } .tp-cta-mobile { display: none; } }
`) + appbar('강좌 상세', { right: `<button type="button" class="ds-appbar__button" aria-label="찜">${icon('heart')}</button><button type="button" class="ds-appbar__button" aria-label="공유">${icon('share')}</button>` }) + topnav(LEARN_MENUS, '강좌', `<a class="ds-avatar" href="my-learning.html" aria-label="김민수, 내 학습"><span class="ds-avatar__initials" aria-hidden="true">김</span></a>`) + `
<main class="tp-main">
  <nav class="ds-breadcrumbs u-show-from-md" aria-label="현재 위치"><ol><li><a href="course-catalog.html">강좌</a></li><li><a href="#">TOEIC</a></li><li><span aria-current="page">TOEIC 900+ 완성반</span></li></ol></nav>
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ybm-space-x8)">
      <header class="tp-hero">
        <div class="tp-row">${badge('베스트', 'brand', true)}${badge('8주 과정')}${badge('동영상 + 주 1회 라이브')}</div>
        <h1 class="tp-h1">TOEIC 900+ 완성반</h1>
        <p class="tp-sub">800점대에서 멈춘 분을 위한 8주 과정이에요. 파트 5, 6, 7의 틀린 유형을 찾아 메우고, 매주 실전 모의고사로 시간 배분을 몸에 익혀요.</p>
        <div class="tp-meta"><span class="ds-rating" style="--ds-rating-value: 4.9" aria-label="평점 4.9"><span class="ds-rating__stars" aria-hidden="true"></span><span class="ds-rating__value tp-num">4.9</span><span class="ds-rating__count tp-num">(412)</span></span><span class="tp-caption">수강생 2,140명 · 수료 후 평균 +86점</span></div>
        ${thumb('', '16:9')}
      </header>
      <div class="ds-tabs" role="tablist" aria-label="강좌 정보" data-layout="hug"><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="true">소개</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">커리큘럼</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">강사</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">후기 412</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">자주 묻는 질문</button></div>
      <section class="tp-stack" style="gap: var(--ybm-space-x3)" aria-labelledby="who-title">
        <h2 class="tp-h2" id="who-title">이런 분께 맞아요</h2>
        <ul class="ds-list" data-variant="inset">${['최근 TOEIC 점수가 780~870점인 분', '읽기 파트에서 시간이 늘 모자라는 분', '8주 뒤 시험 접수를 이미 했거나 할 예정인 분'].map((t) => `<li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('circle-check')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">${t}</span></span></div></li>`).join('')}</ul>
      </section>
      <section class="tp-stack" style="gap: var(--ybm-space-x3)" aria-labelledby="cur-title">
        <div class="tp-between"><h2 class="tp-h2" id="cur-title">커리큘럼</h2><span class="tp-caption">8주 · 강의 48개 · 총 21시간 30분</span></div>
        ${accordion([
          ['1주차 · 진단과 목표 세우기', [['OT와 학습 계획 세우기', '12:40', true], ['진단 모의고사 (실전 120분)', '120:00'], ['진단 결과 풀이: 내 약점 유형', '38:20']].map(([t, d, free]) => `<div class="tp-lesson"><span class="tp-row">${icon('square', 'sm')}${t}${free ? badge('미리 보기', 'brand') : ''}</span><span class="tp-caption tp-num">${d}</span></div>`).join(''), true],
          ['2주차 · 파트 5 문법 유형 완성', '<p class="tp-sub">강의 6개 · 2시간 50분</p>'],
          ['3주차 · 파트 6 문맥 추론', '<p class="tp-sub">강의 6개 · 2시간 35분</p>'],
          ['4주차 · 파트 7 단일 지문 속독', '<p class="tp-sub">강의 6개 · 3시간 10분</p>'],
          ['5~8주차 · 이중 지문, 실전 모의고사 4회', '<p class="tp-sub">강의 24개 · 10시간 15분 · 라이브 4회</p>'],
        ])}
      </section>
      <section class="tp-box" aria-labelledby="t-title">
        <h2 class="tp-h3" id="t-title">강사</h2>
        <div class="tp-row" style="align-items: flex-start"><span class="ds-avatar" data-size="64" role="img" aria-label="김강사"><span class="ds-avatar__initials" aria-hidden="true">김</span></span><div class="tp-stack"><span class="tp-h3">김강사</span><p class="tp-sub">TOEIC 990점 만점 12회, 12년째 읽기 파트만 가르쳐요. 문법을 외우게 하지 않고 문제 유형으로 익히게 하는 수업으로 유명해요.</p></div></div>
      </section>
      <section class="tp-stack" style="gap: var(--ybm-space-x2)" aria-labelledby="rv-title">
        <div class="tp-between"><h2 class="tp-h2" id="rv-title">후기</h2><span class="ds-rating" style="--ds-rating-value: 4.9" aria-label="평점 4.9"><span class="ds-rating__stars" aria-hidden="true"></span><span class="ds-rating__value tp-num">4.9</span><span class="ds-rating__count tp-num">(412)</span></span></div>
        ${[['이○○', 5, '8주 만에 815에서 905로 올랐어요. 파트 7 시간 배분 강의가 결정적이었어요.', '수료 · TOEIC 905'], ['박○○', 5, '라이브에서 질문을 바로 받아 주셔서 혼자 공부할 때보다 훨씬 빨랐어요.', '수료 · TOEIC 880'], ['최○○', 4, '강의는 좋은데 과제 양이 꽤 많아요. 주 5시간은 잡아야 해요.', '수강 6주차']].map(([n, r, t, s]) => `<article class="tp-review"><div class="tp-row"><span class="ds-rating" data-size="small" style="--ds-rating-value: ${r}" aria-label="평점 ${r}"><span class="ds-rating__stars" aria-hidden="true"></span></span><span class="tp-caption">${n} · ${s}</span></div><p class="tp-sub" style="color: var(--ybm-color-fg-neutral)">${t}</p></article>`).join('')}
        ${btn('후기 412개 모두 보기', { fill: true })}
      </section>
    </div>
    <aside class="tp-box tp-buy tp-sticky" aria-labelledby="buy-title">
      <div class="tp-buy__price"><span class="tp-caption"><s class="tp-num">240,000원</s> · 21% 할인</span><br><b class="tp-num">189,000원</b></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x2)"><span class="tp-h3" id="buy-title">수강 기간</span>${selectbox('period', [['8주 (추천)', '강의 기간과 같아요', true], ['12주', '+20,000원 · 복습 4주 추가']])}</div>
      <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" checked><span class="ds-checkbox__label">교재 포함 (+18,000원, 배송 2일)</span></label>
      <ul class="ds-list" data-variant="inset">${['수강 시작 7일 안에는 전액 환불', '모바일, PC 어디서나 이어 보기', '수료하면 다음 시험 응시료 10% 할인'].map((t) => `<li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('check')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">${t}</span></span></div></li>`).join('')}</ul>
      <div class="tp-row u-show-from-md">${btn('찜', { iconName: 'heart' })}${btn('수강 신청', { variant: 'brandSolid', size: 'large', href: 'checkout.html', fill: true })}</div>
    </aside>
  </div>
</main>
<div class="tp-cta tp-cta-mobile">${btn('찜', { size: 'large', iconName: 'heart' })}${btn('189,000원 수강 신청', { variant: 'brandSolid', size: 'large', href: 'checkout.html' })}</div>
` + FOOT;

// 11. 강의 수강 (강의실)
pages['classroom'] = head('강의 수강', `  .tp-page { background: var(--ybm-color-bg-layer-default); }
  .tp-main { max-width: none; padding: 0; gap: 0; }
  .tp-video { position: relative; aspect-ratio: 16 / 9; background: var(--ybm-color-bg-neutral-solid); color: var(--ybm-color-fg-on-neutral-solid); }
  .tp-video__center { position: absolute; inset: 0; display: grid; place-items: center; }
  .tp-video__play { display: grid; place-items: center; width: 64px; height: 64px; border-radius: var(--ybm-shape-pill); background: var(--ybm-color-palette-static-white-alpha-300); }
  .tp-controls { position: absolute; inset: auto 0 0 0; display: flex; align-items: center; gap: var(--ybm-space-x3); padding: var(--ybm-space-x3) var(--ybm-space-x4); background: linear-gradient(transparent, var(--ybm-color-palette-static-black-alpha-700)); font-size: var(--ybm-font-size-t02); }
  .tp-controls .ds-progress { flex: 1; }
  .tp-info { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x4) var(--ybm-space-x-global-gutter); }
  .tp-outline { display: flex; flex-direction: column; }
  .tp-outline__head { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4) var(--ybm-space-x-global-gutter); border-bottom: 1px solid var(--ybm-color-stroke-neutral-muted); }
  .tp-lesson { display: flex; align-items: center; gap: var(--ybm-space-x3); padding: var(--ybm-space-x3) var(--ybm-space-x-global-gutter); color: inherit; text-decoration: none; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-lesson[aria-current] { background: var(--ybm-color-bg-brand-weak); font-weight: var(--ybm-font-weight-semibold); }
  .tp-lesson__title { flex: 1 1 auto; min-width: 0; }
  .tp-week { padding: var(--ybm-space-x3) var(--ybm-space-x-global-gutter) var(--ybm-space-x1); font-size: var(--ybm-font-size-t03); color: var(--ybm-color-fg-neutral-muted); }
  .tp-note { width: 100%; min-height: 120px; }
  @media (min-width: 768px) { .tp-layout { grid-template-columns: minmax(0, 1fr) 360px; height: calc(100vh - 56px); } .tp-player { overflow-y: auto; } .tp-outline { border-left: 1px solid var(--ybm-color-stroke-neutral-muted); overflow-y: auto; } .tp-info { padding: var(--ybm-space-x6) var(--ybm-space-x8); } .tp-mobile-tabs { display: none; } }
`) + appbar('강의 수강', { right: `<button type="button" class="ds-appbar__button" aria-label="설정">${icon('menu')}</button>` }) + topnav(LEARN_MENUS, '내 학습', `${btn('질문하기', { size: 'xsmall', iconName: 'message-circle' })}<a class="ds-avatar" href="my-learning.html" aria-label="김민수, 내 학습"><span class="ds-avatar__initials" aria-hidden="true">김</span></a>`) + `
<div class="tp-layout">
  <main class="tp-main tp-player">
    <div class="tp-video" role="region" aria-label="강의 영상">
      <div class="tp-video__center"><span class="tp-video__play">${icon('arrow-right', 'lg')}</span></div>
      <div class="tp-controls"><span class="tp-num">12:04</span>${progress(38, 'brand', true)}<span class="tp-num">31:20</span><span>1.25×</span>${icon('monitor')}</div>
    </div>
    <div class="tp-info">
      <div class="tp-stack"><span class="tp-caption">3주차 · 파트 6 문맥 추론</span><h1 class="tp-h2">14. 접속부사 고르기: 앞뒤 문장의 관계부터</h1></div>
      <div class="tp-row" style="flex-wrap: wrap">${btn('강의 자료 (PDF)', { size: 'small', iconName: 'file-text' })}${btn('이 강의 질문 3', { size: 'small', iconName: 'message-circle' })}${btn('다 봤어요', { variant: 'neutralSolid', size: 'small', iconName: 'check' })}</div>
      <div class="ds-tabs tp-mobile-tabs" role="tablist" aria-label="강의실 메뉴"><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="true">목차</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">메모</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">질문</button></div>
      <section class="tp-stack" style="gap: var(--ybm-space-x2)" aria-labelledby="note-title">
        <h2 class="tp-h3" id="note-title">내 메모</h2>
        <textarea class="ds-textarea tp-note" aria-label="메모" placeholder="영상을 보다가 메모를 남기면 재생 시간과 함께 저장돼요.">[08:12] however / therefore 는 앞 문장과의 관계를 먼저 본다. 빈칸 뒤 문장이 결과면 therefore.</textarea>
        <div class="tp-between"><span class="tp-caption">자동 저장됨 · 방금</span>${btn('시간 표시 넣기', { variant: 'ghost', size: 'xsmall', iconName: 'clock' })}</div>
      </section>
    </div>
  </main>
  <aside class="tp-outline" aria-label="목차">
    <div class="tp-outline__head"><span class="tp-h3">TOEIC 900+ 완성반</span>${progress(42)}<span class="tp-caption tp-num">진도 42% · 48강 중 20강 · 남은 수강 기간 36일</span></div>
    <div class="tp-week">3주차 · 파트 6 문맥 추론</div>
    ${[['13. 문맥 어휘: 같은 뜻 다른 단어', '22:10', 100], ['14. 접속부사 고르기: 앞뒤 문장의 관계부터', '31:20', 38, true], ['15. 문장 삽입 문제 3단계 풀이', '28:45', 0], ['16. 파트 6 실전 10세트', '40:00', 0]].map(([t, d, p, cur]) => `<a class="tp-lesson" href="#"${cur ? ' aria-current="true"' : ''}><span class="ds-progress-circle" data-size="24" data-tone="${p === 100 ? 'neutral' : 'brand'}" role="progressbar" aria-valuenow="${p}" style="--ds-progress-value: ${p}"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span><span class="tp-lesson__title">${t}</span><span class="tp-caption tp-num">${d}</span></a>`).join('')}
    <div class="tp-week">4주차 · 파트 7 단일 지문 속독</div>
    ${[['17. 지문 유형별 읽는 순서', '24:30'], ['18. 질문 먼저, 지문은 나중에', '26:15'], ['19. 이메일과 공지문', '30:05']].map(([t, d]) => `<a class="tp-lesson" href="#"><span class="ds-progress-circle" data-size="24" data-tone="neutral" role="progressbar" aria-valuenow="0" style="--ds-progress-value: 0"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="ds-progress-circle__track" pathLength="100"/><circle class="ds-progress-circle__range" pathLength="100"/></svg></span><span class="tp-lesson__title">${t}</span><span class="tp-caption tp-num">${d}</span></a>`).join('')}
  </aside>
</div>
` + FOOT;

// 12. 내 학습
pages['my-learning'] = head('내 학습', `  .tp-main { max-width: 1120px; }
  .tp-goal { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x4); }
  .tp-goal__num b { font-size: var(--ybm-font-size-t10); line-height: var(--ybm-line-height-t10); font-weight: var(--ybm-font-weight-bold); }
  .tp-streak { display: flex; gap: var(--ybm-space-x2); }
  .tp-day { display: flex; flex: 1; flex-direction: column; align-items: center; gap: var(--ybm-space-x1); font-size: var(--ybm-font-size-t02); color: var(--ybm-color-fg-neutral-muted); }
  .tp-day span:first-child { display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--ybm-shape-pill); background: var(--ybm-color-bg-neutral); }
  .tp-day[data-done] span:first-child { background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); }
  .tp-day[data-today] span:first-child { box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-brand-solid); }
  .tp-course { display: grid; grid-template-columns: 96px minmax(0, 1fr); gap: var(--ybm-space-x3); align-items: center; }
  @media (min-width: 768px) { .tp-goal { grid-template-columns: 1.2fr 1fr 1fr; } .tp-two { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: var(--ybm-space-x4); align-items: start; } .tp-course { grid-template-columns: 160px minmax(0, 1fr) auto; } }
`) + appbar('내 학습', { back: false, right: `<a class="ds-appbar__button" href="#" aria-label="알림">${icon('inbox')}</a>` }) + topnav(LEARN_MENUS, '내 학습', `<a class="ds-avatar" href="mypage.html" aria-label="김민수, 마이페이지"><span class="ds-avatar__initials" aria-hidden="true">김</span></a>`) + `
<main class="tp-main">
  <header class="tp-between"><div class="tp-stack"><h1 class="tp-h1">민수 님, 오늘도 이어 볼까요?</h1><p class="tp-sub">이번 주 4일 학습 · 지난주보다 1시간 더 했어요.</p></div>${btn('레벨 테스트 다시 보기', { href: 'level-test.html', iconName: 'sparkles' })}</header>
  <div class="tp-goal">
    <section class="tp-box" aria-labelledby="cont-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="cont-title">이어 보기</h2>${badge('3주차', 'informative')}</div>
      <div class="tp-course">${thumb('', '16:9')}<div class="tp-stack"><span class="tp-h3">14. 접속부사 고르기</span><span class="tp-caption">TOEIC 900+ 완성반 · 12:04 / 31:20</span>${progress(38, 'brand', true)}</div>${btn('이어 보기', { variant: 'brandSolid', href: 'classroom.html', iconName: 'arrow-right' })}</div>
    </section>
    <section class="tp-box" aria-labelledby="goal-title">
      <h2 class="tp-h3" id="goal-title">목표</h2>
      <div class="tp-between"><div class="tp-goal__num tp-stack"><span class="tp-caption">목표 점수</span><b class="tp-num">900</b></div><div class="tp-goal__num tp-stack" style="text-align: right"><span class="tp-caption">최근 모의고사</span><b class="tp-num" style="color: var(--ybm-color-fg-brand)">845</b></div></div>
      ${progress(84)}
      <p class="tp-caption">제512회 시험까지 <b>D-22</b> · 목표까지 55점 남았어요</p>
    </section>
    <section class="tp-box" aria-labelledby="week-title">
      <h2 class="tp-h3" id="week-title">이번 주 학습</h2>
      <div class="tp-streak">${[['월', 1], ['화', 1], ['수', 0], ['목', 1], ['금', 1], ['토', 2], ['일', 0]].map(([d, s]) => `<div class="tp-day"${s === 1 ? ' data-done' : s === 2 ? ' data-today' : ''}><span>${s === 1 ? icon('check', 'sm') : ''}</span><span>${d}</span></div>`).join('')}</div>
      <p class="tp-caption">4일 연속 학습 중 · 이번 주 3시간 20분</p>
    </section>
  </div>
  <div class="tp-two">
    <section class="tp-box" aria-labelledby="my-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="my-title">수강 중인 강좌</h2>${btn('전체 보기', { variant: 'ghost', size: 'xsmall' })}</div>
      ${[['TOEIC 900+ 완성반', '8주 과정 · 36일 남음', 42], ['TOEIC 듣기 집중 2주', '2주 과정 · 5일 남음', 80], ['비즈니스 영어 말하기 12주', '12주 과정 · 시작 전', 0]].map(([t, s, p]) => `<div class="tp-course">${thumb('', '16:9')}<div class="tp-stack"><span class="tp-h3">${t}</span><span class="tp-caption">${s} · 진도 ${p}%</span>${progress(p, p ? 'brand' : 'neutral', true)}</div>${btn(p ? '이어 보기' : '시작하기', { size: 'small', href: 'classroom.html' })}</div>`).join('')}
    </section>
    <aside class="tp-stack" style="gap: var(--ybm-space-x4)">
      <section class="tp-box" aria-labelledby="up-title">
        <h2 class="tp-h3" id="up-title">다가오는 일정</h2>
        <ul class="ds-list" data-divider>
          <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('calendar')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">라이브 질의응답 · 파트 7</span><span class="ds-list-item__desc">11.04 (화) 20:00 · 김강사</span></span><span class="ds-list-item__suffix">${btn('알림', { size: 'xsmall' })}</span></div></li>
          <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('file-text')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">실전 모의고사 3회</span><span class="ds-list-item__desc">11.08 (토)까지 · 120분</span></span></div></li>
          <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('star')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">TOEIC 제512회 시험</span><span class="ds-list-item__desc">11.23 (일) 09:20 · 강남 제1고사장</span></span><span class="ds-list-item__suffix">${btn('수험표', { size: 'xsmall', href: 'exam-ticket.html' })}</span></div></li>
        </ul>
      </section>
      <div class="ds-callout" data-tone="informative">${icon('sparkles')}<p class="ds-callout__content"><strong class="ds-callout__title">추천</strong>  최근 모의고사에서 파트 7 정답률이 71%예요. 속독 특강 2강을 추천해요.  <a class="ds-callout__link" href="course-catalog.html">보러 가기</a></p></div>
    </aside>
  </div>
</main>
${bottomnav(LEARN_TABS, '내 학습')}
` + FOOT;

// 13. 레벨 테스트
pages['level-test'] = head('레벨 테스트', `  .tp-main { max-width: 800px; }
  .tp-testbar { display: flex; align-items: center; justify-content: space-between; gap: var(--ybm-space-x3); }
  .tp-testbar .ds-timer { font-size: var(--ybm-font-size-t05); font-weight: var(--ybm-font-weight-semibold); color: var(--ybm-color-fg-neutral); }
  .tp-q { font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); font-weight: var(--ybm-font-weight-semibold); }
  .tp-passage { padding: var(--ybm-space-x4); border-radius: var(--ybm-shape-md); background: var(--ybm-color-bg-canvas); font-size: var(--ybm-font-size-t05); line-height: 28px; }
  .tp-nums { display: grid; grid-template-columns: repeat(10, 1fr); gap: var(--ybm-space-x1_5); }
  .tp-nums button { height: 32px; border-radius: var(--ybm-shape-sm); background: var(--ybm-color-bg-neutral); font-size: var(--ybm-font-size-t02); color: var(--ybm-color-fg-neutral-muted); }
  .tp-nums button[data-done] { background: var(--ybm-color-bg-neutral-solid); color: var(--ybm-color-fg-on-neutral-solid); }
  .tp-nums button[aria-current] { box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-brand-solid); color: var(--ybm-color-fg-brand); }
  @media (min-width: 768px) { .tp-nums { grid-template-columns: repeat(15, 1fr); } }
`) + appbar('레벨 테스트', { back: false, right: `<button type="button" class="ds-appbar__button" aria-label="그만두기">${icon('x')}</button>` }) + topnav(LEARN_MENUS, '레벨 테스트', btn('그만두기', { variant: 'ghost', size: 'xsmall' })) + `
<main class="tp-main">
  <div class="tp-testbar">
    <div class="tp-stack"><span class="tp-caption">읽기 영역 · 12 / 30</span>${progress(40, 'brand', true)}</div>
    <span class="tp-row">${icon('clock')}<time class="ds-timer" id="test-timer">14:32</time></span>
  </div>
  <section class="tp-box" aria-labelledby="q-title">
    <span class="tp-caption">문항 12 · 파트 6 유형</span>
    <div class="tp-passage">Thank you for your order. Your package was shipped on March 3 and is expected to arrive within five business days. <b>______</b>, you can track the delivery status at any time using the number below.</div>
    <h1 class="tp-q" id="q-title">빈칸에 들어갈 가장 알맞은 말을 고르세요.</h1>
    <div class="ds-radio-group" role="radiogroup" aria-labelledby="q-title">
      ${['(A) However', '(B) Meanwhile', '(C) Otherwise', '(D) Therefore'].map((o, i) => `<label class="ds-radio"><input type="radio" class="ds-radio__control" name="q12"${i === 1 ? ' checked' : ''}><span>${o}</span></label>`).join('')}
    </div>
    <div class="tp-between"><label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">나중에 다시 보기</span></label><div class="tp-row">${btn('이전', { size: 'medium', iconName: 'chevron-left' })}${btn('다음', { variant: 'neutralSolid', size: 'medium' })}</div></div>
  </section>
  <section class="tp-box" aria-labelledby="nav-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="nav-title">문항 이동</h2><span class="tp-caption">푼 문항 11 · 다시 볼 문항 2</span></div>
    <div class="tp-nums" role="list">${Array.from({ length: 30 }, (_, i) => `<button type="button"${i < 11 ? ' data-done' : ''}${i === 11 ? ' aria-current="true"' : ''} aria-label="${i + 1}번 문항">${i + 1}</button>`).join('')}</div>
    <div class="ds-callout" data-tone="neutral">${icon('info-solid')}<p class="ds-callout__content">시간이 끝나면 푼 문항까지 자동으로 제출돼요. 결과는 바로 보여 드리고, 맞는 강좌를 추천해 드려요.</p></div>
  </section>
  <div class="tp-cta">${btn('제출하고 결과 보기', { variant: 'brandSolid', size: 'large', fill: true })}</div>
</main>
<script>document.getElementById("test-timer").setAttribute("data-end", new Date(Date.now() + (14 * 60 + 32) * 1000).toISOString());</script>
` + FOOT;

// 14. 기업 교육 관리
pages['learning-admin'] = head('기업 교육 관리', `  .tp-kpi { display: flex; flex-direction: column; gap: var(--ybm-space-x1); }
  .tp-compare { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: var(--ybm-space-x4); text-align: center; }
  .tp-compare b { display: block; font-size: var(--ybm-font-size-t10); line-height: var(--ybm-line-height-t10); font-weight: var(--ybm-font-weight-bold); }
  .tp-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); }
  .tp-toolbar .ds-input { flex: 1 1 220px; }
  @media (min-width: 768px) { .tp-two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--ybm-space-x4); align-items: start; } }
`) + adminTop('기업 교육 관리', B2B_LEARN_NAV, '대시보드') + `
  <header class="tp-between"><div class="tp-stack"><h1 class="tp-h1">교육 관리</h1><p class="tp-sub">회사 이름 · 2026년 4분기 어학 교육 · 배정 320명</p></div><div class="tp-row">${btn('성과 리포트 내려받기', { iconName: 'file-text' })}${btn('과정 배정', { variant: 'brandSolid', iconName: 'plus', attrs: 'data-ds-open="assign-dlg"' })}</div></header>
  <div class="tp-kpis">
    ${[['배정 인원', '320', '명 · 7개 과정'], ['수료율', '68%', '목표 80% · 4주 남음'], ['1인 평균 학습', '9.4', '시간 · 지난달 7.1'], ['시험 점수 변화', '+87', '점 · 교육 전후 평균']].map(([l, v, d]) => `<section class="tp-box tp-kpi"><span class="tp-caption">${l}</span><b class="tp-num">${v}</b><span class="tp-caption">${d}</span></section>`).join('')}
  </div>
  <div class="tp-two">
    <section class="tp-box" aria-labelledby="c-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="c-title">과정별 수료율</h2>${btn('과정 관리', { variant: 'ghost', size: 'xsmall' })}</div>
      ${bars([['TOEIC 900+', 74, '74%'], ['TOEIC 750', 81, '81%'], ['OPIc IH', 52, '52%'], ['비즈니스 회화', 63, '63%'], ['이메일 영작', 88, '88%']])}
      <div class="ds-callout" data-tone="warning">${icon('triangle-alert-solid')}<p class="ds-callout__content"><strong class="ds-callout__title">OPIc IH 과정</strong>  2주째 접속하지 않은 임직원이 14명이에요.  <a class="ds-callout__link" href="#assign">알림 보내기</a></p></div>
    </section>
    <section class="tp-box" id="report" aria-labelledby="link-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="link-title">시험 연계 성과</h2>${badge('TOEIC 511회 기준', 'informative')}</div>
      <div class="tp-compare"><div><span class="tp-caption">교육 전 평균</span><b class="tp-num">648</b></div>${icon('arrow-right', 'lg')}<div><span class="tp-caption">교육 후 평균</span><b class="tp-num" style="color: var(--ybm-color-fg-brand)">735</b></div></div>
      ${bars([['수료자', 74, '735'], ['미수료자', 66, '661'], ['미배정', 65, '652']], 'neutral')}
      <p class="tp-caption">수료한 임직원 142명의 평균이 교육 전보다 87점 올랐어요. 미수료자는 13점 올랐어요.</p>
    </section>
  </div>
  <section class="tp-box" id="assign" aria-labelledby="a-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="a-title">임직원 배정 현황</h2><span class="tp-caption">320명</span></div>
    <div class="tp-toolbar">
      <div class="ds-input" data-variant="outline" data-size="medium">${icon('search').replace('ds-icon"', 'ds-icon ds-input__icon"')}<input class="ds-input__control" type="search" placeholder="이름, 사번, 부서" aria-label="임직원 찾기"></div>
      <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="과정"><span class="ds-select__value">전체 과정</span></button>
      <div class="ds-chiptabs" role="tablist" aria-label="상태"><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true">전체</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">학습 중</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">수료</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false" data-notification>미접속</button></div>
    </div>
    ${table([[checkbox(false, '전체 선택'), 'center'], ['이름'], ['부서'], ['과정'], ['진도'], ['마지막 학습', 'center'], ['상태', 'center'], ['', 'center']], [
      [checkbox(false), '<b>김민수</b>', '영업 1팀', 'TOEIC 900+', progress(42, 'brand', true) + '<span class="tp-caption tp-num">42%</span>', '오늘', badge('학습 중', 'informative'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(false), '<b>이서연</b>', '마케팅팀', 'TOEIC 750', progress(100, 'neutral', true) + '<span class="tp-caption tp-num">100%</span>', '10.28', badge('수료', 'positive'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(false), '<b>박지훈</b>', '개발 2팀', 'OPIc IH', progress(18, 'brand', true) + '<span class="tp-caption tp-num">18%</span>', '14일 전', badge('미접속', 'warning'), btn('알림', { size: 'xsmall' })],
      [checkbox(false), '<b>최유나</b>', '인사팀', '이메일 영작', progress(88, 'brand', true) + '<span class="tp-caption tp-num">88%</span>', '어제', badge('학습 중', 'informative'), btn('상세', { variant: 'ghost', size: 'xsmall' })],
      [checkbox(false), '<b>정하늘</b>', '재무팀', '-', '-', '-', badge('미배정'), btn('배정', { size: 'xsmall', attrs: 'data-ds-open="assign-dlg"' })],
    ], { compact: true })}
    <div class="tp-between"><span class="tp-caption">1~5 / 320명</span><nav class="ds-pagination" data-type="simple" aria-label="페이지"><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a><span class="ds-pagination__indicator"><b>1</b> / 64</span><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav></div>
  </section>
</main></div>
<dialog class="ds-dialog" id="assign-dlg" aria-labelledby="assign-title">
  <div class="ds-dialog__header"><h2 class="ds-dialog__title" id="assign-title">과정 배정</h2><button type="button" class="ds-dialog__close" aria-label="닫기" data-ds-close>${icon('x')}</button></div>
  <div class="ds-dialog__body"><div class="tp-stack" style="gap: var(--ybm-space-x4)">${field('as-who', '대상', input('as-who', 'placeholder="이름, 사번, 부서로 찾기"'), '부서 전체를 고르면 그 부서 임직원이 모두 배정돼요.')}<div class="tp-stack" style="gap: var(--ybm-space-x2)"><span class="ds-field__label">과정</span>${selectbox('as-course', [['TOEIC 900+ 완성반', '8주 · 1인 189,000원', true], ['TOEIC 750 보장반', '6주 · 1인 159,000원'], ['OPIc IH 2주 완성', '2주 · 1인 99,000원'], ['이메일 영작 4주', '4주 · 1인 49,000원']], { cols: 2 })}</div>${field('as-due', '수료 기한', input('as-due', 'value="2026-12-31" type="date"'))}</div></div>
  <div class="ds-dialog__footer">${btn('취소', { attrs: 'data-ds-close' })}${btn('배정하기', { variant: 'brandSolid', attrs: 'data-ds-close' })}</div>
</dialog>
` + FOOT;

// 갤러리: 특정 서비스 느낌 없이 범용 사진첩으로 다시 씀
pages['gallery'] = head('사진 갤러리', `  .tp-main { max-width: 1200px; }
  .tp-toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
  .tp-grid-photos { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--ybm-space-x2); }
  .tp-photo { display: flex; flex-direction: column; gap: var(--ybm-space-x2); color: inherit; text-decoration: none; }
  .tp-photo__title { font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); font-weight: var(--ybm-font-weight-medium); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tp-fab { position: fixed; right: var(--ybm-space-x4); bottom: calc(72px + env(safe-area-inset-bottom, 0px)); z-index: var(--ybm-z-sticky); }
  @media (min-width: 768px) { .tp-grid-photos { grid-template-columns: repeat(3, 1fr); gap: var(--ybm-space-x4); } .tp-fab { display: none; } }
  @media (min-width: 1280px) { .tp-grid-photos { grid-template-columns: repeat(4, 1fr); } }
`) + appbar('갤러리', { back: false, right: `<button type="button" class="ds-appbar__button" aria-label="검색">${icon('search')}</button>` }) + topnav([['홈', '#'], ['갤러리', 'gallery.html'], ['소식', 'notice.html'], ['모임', 'group-detail.html'], ['고객지원', 'help-center.html']], '갤러리', btn('사진 올리기', { variant: 'neutralSolid', size: 'small', iconName: 'upload' })) + `
<main class="tp-main">
  <header class="tp-stack u-show-from-md"><h1 class="tp-h1">갤러리</h1><p class="tp-sub">행사와 활동 사진을 앨범별로 모아 두었어요. 누구나 올리고 내려받을 수 있어요.</p></header>
  <div class="ds-chiptabs" role="tablist" aria-label="앨범">${['전체', '2026 워크숍', '10월 행사', '제품 사진', '사무실', '동호회'].map((a, i) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="${i === 0}">${a}</button>`).join('')}</div>
  <div class="tp-toolbar"><span class="tp-sub">사진 <b class="tp-num">248</b>장 · 앨범 5개</span><div class="tp-row"><button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="정렬"><span class="ds-select__value">최신순</span></button><span class="ds-segmented" role="group" aria-label="보기 방식"><button type="button" class="ds-segmented__item" aria-pressed="true" aria-label="격자">${icon('image')}</button><button type="button" class="ds-segmented__item" aria-pressed="false" aria-label="목록">${icon('menu')}</button></span></div></div>
  <div class="tp-grid-photos">
    ${['워크숍 단체 사진', '발표 세션 1', '점심시간', '팀 빌딩 활동', '저녁 만찬', '시상식', '제품 촬영 A', '제품 촬영 B', '새 사무실 로비', '회의실', '동호회 등산', '동호회 러닝'].map((t, i) => `<a class="tp-photo" href="#">${thumb('', i % 5 === 0 ? '4:3' : '4:3')}<div class="tp-stack" style="gap: 0"><span class="tp-photo__title">${t}</span><span class="tp-caption tp-num">2026.10.${String(28 - i).padStart(2, '0')} · ${12 - i % 7}장</span></div></a>`).join('')}
  </div>
  <nav class="ds-pagination" aria-label="페이지" style="justify-content: center"><a class="ds-pagination__item" data-type="prev" aria-label="이전 페이지" aria-disabled="true"></a><a class="ds-pagination__item" href="#" aria-current="page">1</a><a class="ds-pagination__item" href="#">2</a><a class="ds-pagination__item" href="#">3</a><span class="ds-pagination__item" data-type="ellipsis" aria-hidden="true"></span><a class="ds-pagination__item" href="#">21</a><a class="ds-pagination__item" data-type="next" href="#" aria-label="다음 페이지"></a></nav>
</main>
<button type="button" class="ds-fab tp-fab" aria-label="사진 올리기">${icon('plus', 'lg')}</button>
${bottomnav([['홈', '#', 'house'], ['갤러리', 'gallery.html', 'image'], ['소식', 'notice.html', 'inbox'], ['전체', '#', 'menu']], '갤러리')}
` + FOOT;

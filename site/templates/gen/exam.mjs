import * as H from './helpers.mjs';
const { head, icon, appbar, topnav, sidenav, bottomnav, stepper, badge, btn, progress, bars, field, input, table, thumb, accordion, selectbox, EXAM_MENUS, EXAM_TABS, FOOT } = H;
export const pages = {};

// 1. 시험 홈
pages['exam-home'] = head('시험 홈', `  .tp-hero { display: grid; gap: var(--ybm-space-x4); padding: var(--ybm-space-x6) var(--ybm-space-x5); border-radius: var(--ybm-shape-2xl); background: var(--ybm-color-bg-neutral-solid); color: var(--ybm-color-fg-on-neutral-solid); }
  .tp-hero .tp-sub, .tp-hero .tp-caption { color: inherit; opacity: .75; }
  .tp-hero__title { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); }
  .tp-hero__actions { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x2); }
  .tp-dday { display: inline-flex; align-items: center; gap: var(--ybm-space-x2); }
  .tp-dday .ds-timer { color: inherit; font-size: var(--ybm-font-size-t04); }
  .tp-quick { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--ybm-space-x2); }
  .tp-quick a { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4) var(--ybm-space-x1); border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-weak); color: inherit; text-decoration: none; font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); text-align: center; }
  .tp-quick .ds-icon { --ds-icon-size: 28px; color: var(--ybm-color-fg-brand); }
  .tp-exams { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x3); }
  .tp-exam { display: flex; flex-direction: column; gap: var(--ybm-space-x3); padding: var(--ybm-space-x4); border-radius: var(--ybm-shape-lg); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-weak); }
  @media (min-width: 768px) { .tp-hero { grid-template-columns: minmax(0, 1fr) auto; align-items: center; padding: var(--ybm-space-x10) var(--ybm-space-x8); } .tp-hero__title { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); } .tp-two { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: var(--ybm-space-x4); align-items: start; } .tp-exams { grid-template-columns: repeat(3, 1fr); } }
`) + appbar('시험', { back: false, right: `<a class="ds-appbar__button" href="#" aria-label="알림">${icon('inbox')}</a>` }) + topnav(EXAM_MENUS, '') + `
<main class="tp-main">
  <section class="tp-hero" aria-labelledby="next-title">
    <div class="tp-stack" style="gap: var(--ybm-space-x3)">
      <span class="tp-dday">${badge('접수 중', 'positive', true)}<span class="tp-caption">오늘 17:00 마감 · 남은 시간 <time class="ds-timer" id="deadline" data-end="">8:05:22</time></span></span>
      <h2 class="tp-hero__title" id="next-title">제512회 TOEIC 정기시험<br>11월 23일(일) 오전 9시 20분 입실</h2>
      <p class="tp-sub">접수 기간 11.03(월) ~ 11.10(월) 17:00 · 성적 발표 12.05(금) · 응시료 52,500원</p>
    </div>
    <div class="tp-hero__actions">${btn('지금 접수하기', { variant: 'brandSolid', size: 'large', href: 'exam-schedule.html' })}${btn('전체 일정 보기', { variant: 'neutralOutline', size: 'large', href: '#schedule', attrs: 'style="color: inherit"' })}</div>
  </section>

  <nav class="tp-quick" aria-label="바로 가기">
    <a href="my-exams.html">${icon('file-text')}접수 확인</a>
    <a href="exam-ticket.html">${icon('id-card')}수험표 출력</a>
    <a href="exam-score.html">${icon('star')}성적 확인</a>
    <a href="help-center.html">${icon('rotate-ccw')}환불 안내</a>
  </nav>

  <div class="tp-two">
    <section class="tp-box" id="schedule" aria-labelledby="sch-title">
      <div class="tp-boxhead"><h2 class="tp-h2" id="sch-title">다가오는 시험 일정</h2><div class="ds-chiptabs" role="tablist" aria-label="시험 종류" data-variant="neutralOutline"><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true">TOEIC</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">Speaking</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">OPIc</button></div></div>
      ${table([['회차', 'center'], ['시험일'], ['접수 기간'], ['성적 발표', 'center'], ['상태', 'center'], ['', 'center']], [
        ['512', '<b>11.23 (일)</b>', '<span class="tp-num">11.03 ~ 11.10</span>', '12.05', badge('접수 중', 'positive'), btn('접수', { variant: 'brandSolid', size: 'xsmall', href: 'exam-schedule.html' })],
        ['513', '<b>12.07 (일)</b>', '<span class="tp-num">11.17 ~ 11.24</span>', '12.19', badge('접수 예정', 'informative'), btn('알림 받기', { size: 'xsmall' })],
        ['514', '<b>12.21 (일)</b>', '<span class="tp-num">12.01 ~ 12.08</span>', '01.02', badge('접수 예정', 'informative'), btn('알림 받기', { size: 'xsmall' })],
        ['511', '<b>11.09 (일)</b>', '<span class="tp-num">10.20 ~ 10.27</span>', '11.21', badge('접수 마감'), btn('성적 보기', { size: 'xsmall', href: 'exam-score.html' })],
      ])}
      <p class="tp-caption">추가 접수는 정기 접수 마감 뒤 이틀 동안이고 응시료에 4,400원이 더해져요.</p>
    </section>
    <aside class="tp-stack" style="gap: var(--ybm-space-x4)">
      <section class="tp-box" aria-labelledby="notice-title">
        <div class="tp-boxhead"><h2 class="tp-h3" id="notice-title">공지사항</h2>${btn('더 보기', { variant: 'ghost', size: 'xsmall', href: 'notice.html' })}</div>
        <ul class="ds-list" data-divider>
          <li><a class="ds-list-item" href="notice-detail.html"><span class="ds-list-item__content"><span class="ds-list-item__title">11월 정기시험 고사장 추가 안내</span><span class="ds-list-item__desc tp-num">2026.10.30</span></span>${icon('chevron-right')}</a></li>
          <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">사진 규격이 바뀝니다 (12월 시험부터)</span><span class="ds-list-item__desc tp-num">2026.10.24</span></span>${icon('chevron-right')}</a></li>
          <li><a class="ds-list-item" href="#"><span class="ds-list-item__content"><span class="ds-list-item__title">성적표 우편 발송 지연 안내</span><span class="ds-list-item__desc tp-num">2026.10.15</span></span>${icon('chevron-right')}</a></li>
        </ul>
      </section>
      <div class="ds-callout" data-tone="informative">${icon('info-solid')}<p class="ds-callout__content"><strong class="ds-callout__title">단체 접수</strong>  기업과 학교는 명단 파일 하나로 한 번에 접수할 수 있어요.  <a class="ds-callout__link" href="group-registration.html">단체 접수 안내</a></p></div>
    </aside>
  </div>

  <section aria-labelledby="kinds-title">
    <div class="tp-boxhead" style="margin-bottom: var(--ybm-space-x3)"><h2 class="tp-h2" id="kinds-title">시험 안내</h2></div>
    <div class="tp-exams">
      ${[['TOEIC', '듣기와 읽기 200문항, 120분', '990점 만점 · 성적 유효 2년'], ['TOEIC Speaking', '말하기 11문항, 약 20분', '200점 만점 · 8개 등급'], ['OPIc', '컴퓨터 기반 말하기 인터뷰, 40분', 'NL ~ AL 9개 등급 · 상시 시험']].map(([n, d, c]) => `<article class="tp-exam"><div class="tp-stack"><h3 class="tp-h3">${n}</h3><p class="tp-sub">${d}</p><p class="tp-caption">${c}</p></div>${btn('자세히 보기', { size: 'small', href: '#' })}</article>`).join('')}
    </div>
  </section>
</main>
${bottomnav(EXAM_TABS, '홈')}
<script>
  /* 접수 마감 남은 시간: 지금부터 8시간 5분 뒤 */
  document.getElementById("deadline").setAttribute("data-end", new Date(Date.now() + (8 * 60 + 5) * 60 * 1000).toISOString());
</script>
` + FOOT;

// 2. 시험 일정과 고사장 선택
pages['exam-schedule'] = head('시험 일정 선택', `  .tp-main { max-width: 960px; }
  .tp-steps { padding: var(--ybm-space-x2) 0; }
  .tp-rounds .ds-selectbox__label { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); }
  .tp-centers { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-center { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--ybm-space-x3); padding: var(--ybm-space-x3) var(--ybm-space-x4); border-radius: var(--ybm-shape-lg); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-weak); }
  .tp-center[data-selected] { box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-neutral-contrast); }
  .tp-center__seats { display: flex; flex-direction: column; gap: var(--ybm-space-x1); width: 96px; }
  .tp-summary { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-summary dl { display: grid; grid-template-columns: 72px 1fr; gap: var(--ybm-space-x1) var(--ybm-space-x3); margin: 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-summary dt { color: var(--ybm-color-fg-neutral-muted); } .tp-summary dd { margin: 0; }
  .tp-summary__total { display: flex; justify-content: space-between; padding-top: var(--ybm-space-x3); border-top: 1px solid var(--ybm-color-stroke-neutral-muted); font-size: var(--ybm-font-size-t06); font-weight: var(--ybm-font-weight-semibold); }
  .tp-map { display: none; }
  @media (min-width: 768px) { .tp-main { max-width: 1120px; } .tp-two { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: var(--ybm-space-x6); align-items: start; } .tp-sticky { position: sticky; top: 72px; } .tp-map { display: block; } }
`) + appbar('시험 접수') + topnav(EXAM_MENUS, '시험 접수') + `
<main class="tp-main">
  <header class="u-show-from-md"><h1 class="tp-h1">시험 접수</h1></header>
  <div class="tp-steps">${stepper(['시험 선택', '고사장', '응시자 정보', '결제'], 0)}</div>
  <div class="tp-two">
    <div class="tp-stack" style="gap: var(--ybm-space-x6)">
      <section class="tp-box" aria-labelledby="kind-title">
        <h2 class="tp-h3" id="kind-title">어떤 시험인가요?</h2>
        <div class="ds-segmented" role="group" aria-label="시험 종류" data-layout="fill"><button type="button" class="ds-segmented__item" aria-pressed="true">TOEIC</button><button type="button" class="ds-segmented__item" aria-pressed="false">TOEIC Speaking</button><button type="button" class="ds-segmented__item" aria-pressed="false">OPIc</button></div>
      </section>
      <section class="tp-box" aria-labelledby="round-title">
        <div class="tp-boxhead"><h2 class="tp-h3" id="round-title">회차 선택</h2><div class="ds-chiptabs" role="tablist" aria-label="달" data-variant="neutralOutline"><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="true">11월</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">12월</button><button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="false">1월</button></div></div>
        <div class="tp-rounds">${selectbox('round', [
          [`제512회 · 11월 23일(일) ${badge('접수 중', 'positive')}`, '접수 11.03 ~ 11.10 · 성적 발표 12.05 · 서울 고사장 38곳 남음', true],
          [`제512회 추가 접수 · 11월 23일(일) ${badge('11.11 ~ 11.12', 'warning')}`, '응시료 56,900원 · 남은 고사장만 선택할 수 있어요'],
          [`제513회 · 12월 7일(일) ${badge('접수 예정', 'informative')}`, '접수 11.17 ~ 11.24 · 성적 발표 12.19'],
        ])}</div>
      </section>
      <section class="tp-box" aria-labelledby="center-title">
        <div class="tp-boxhead"><h2 class="tp-h3" id="center-title">고사장 선택</h2><span class="tp-caption">잔여석은 10분마다 갱신돼요</span></div>
        <div class="ds-chiptabs" role="tablist" aria-label="지역">${['서울', '경기', '인천', '부산', '대구', '대전', '광주', '그 밖'].map((r, i) => `<button type="button" class="ds-chiptabs__trigger" role="tab" aria-selected="${i === 0}">${r}</button>`).join('')}</div>
        <div class="ds-input" data-variant="outline" data-size="medium">${icon('search').replace('ds-icon"', 'ds-icon ds-input__icon"')}<input class="ds-input__control" type="search" placeholder="고사장 이름이나 지하철역으로 찾기" aria-label="고사장 찾기"><button type="button" class="ds-input__clear" aria-label="지우기"></button></div>
        <div class="tp-centers">
          ${[['강남 제1고사장', '서울 강남구 테헤란로 152 · 2호선 역삼역 3번 출구 도보 4분', 86, '남음 12', 'positive', true], ['서초 제2고사장', '서울 서초구 서초대로 301 · 2호선 교대역 9번 출구 도보 6분', 62, '남음 48', 'positive'], ['종로 제1고사장', '서울 종로구 종로 51 · 1호선 종각역 6번 출구 도보 3분', 97, '남음 3', 'warning'], ['마포 제3고사장', '서울 마포구 양화로 160 · 2호선 홍대입구역 1번 출구 도보 5분', 100, '마감', 'neutral']].map(([n, a, p, s, t, sel]) => `<label class="tp-center"${sel ? ' data-selected' : ''}><span class="ds-radio" data-tone="neutral" data-size="medium"><input type="radio" class="ds-radio__control" name="center"${sel ? ' checked' : ''}${t === 'neutral' ? ' disabled' : ''}></span><span class="tp-stack"><span class="tp-h3">${n}</span><span class="tp-caption">${a}</span></span><span class="tp-center__seats">${badge(s, t)}${progress(p, t === 'warning' ? 'brand' : 'neutral', true)}</span></label>`).join('')}
        </div>
        ${btn('고사장 더 보기', { fill: true })}
      </section>
    </div>
    <aside class="tp-stack tp-sticky" style="gap: var(--ybm-space-x4)">
      <div class="tp-map">${thumb('', '4:3').replace('tp-ph">', 'tp-ph">' + icon('map-pin', 'lg') + ' ')}</div>
      <section class="tp-box tp-summary" aria-labelledby="sum-title">
        <h2 class="tp-h3" id="sum-title">선택한 내용</h2>
        <dl><dt>시험</dt><dd>TOEIC 제512회</dd><dt>시험일</dt><dd class="tp-num">2026.11.23 (일) 09:20 입실</dd><dt>고사장</dt><dd>강남 제1고사장</dd><dt>접수 유형</dt><dd>정기 접수</dd></dl>
        <div class="tp-summary__total"><span>응시료</span><span class="tp-num">52,500원</span></div>
        <div class="ds-callout" data-tone="neutral">${icon('info-solid')}<p class="ds-callout__content">시험일 기준 9일 전까지 취소하면 전액 환불돼요.</p></div>
        <div class="tp-cta">${btn('다음: 응시자 정보', { variant: 'brandSolid', size: 'large', href: 'exam-applicant.html', fill: true })}</div>
      </section>
    </aside>
  </div>
</main>
` + FOOT;

// 3. 응시자 정보와 사진
pages['exam-applicant'] = head('응시자 정보 등록', `  .tp-main { max-width: 720px; }
  .tp-photo { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x4); }
  .tp-photo__samples { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ybm-space-x2); }
  .tp-sample { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x1); text-align: center; }
  .tp-sample .ds-imageframe { width: 100%; }
  .tp-sample__ok { color: var(--ybm-color-fg-positive); } .tp-sample__no { color: var(--ybm-color-fg-critical); }
  .tp-twocol { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x4); }
  @media (min-width: 768px) { .tp-photo { grid-template-columns: 200px 1fr; } .tp-twocol { grid-template-columns: 1fr 1fr; } }
`) + appbar('응시자 정보') + topnav(EXAM_MENUS, '시험 접수') + `
<main class="tp-main">
  <header class="u-show-from-md"><h1 class="tp-h1">시험 접수</h1></header>
  <div class="tp-steps">${stepper(['시험 선택', '고사장', '응시자 정보', '결제'], 2)}</div>
  <form action="#" method="post" class="tp-stack" style="gap: var(--ybm-space-x6)">
    <section class="tp-box" aria-labelledby="who-title">
      <div class="tp-boxhead"><h2 class="tp-h3" id="who-title">응시자 정보</h2>${badge('본인 인증 완료', 'positive')}</div>
      <div class="ds-callout" data-tone="informative">${icon('info-solid')}<p class="ds-callout__content">이름과 생년월일은 본인 인증 값이라 바꿀 수 없어요. 수험표와 성적표에 그대로 찍힙니다.</p></div>
      <div class="tp-twocol">
        ${field('a-name', '이름', `<div class="ds-input" data-variant="outline"><input class="ds-input__control" id="a-name" value="김민수" readonly></div>`)}
        ${field('a-birth', '생년월일', `<div class="ds-input" data-variant="outline"><input class="ds-input__control" id="a-birth" value="1998.03.14" readonly></div>`)}
        ${field('a-en', '영문 이름', input('a-en', 'value="KIM MINSU" placeholder="여권과 같게, 대문자"'), '여권이 없으면 신분증의 영문 이름을 적어요.')}
        ${field('a-phone', '휴대폰 번호', input('a-phone', 'type="tel" value="010-1234-5678"'), '수험표와 성적 발표 알림을 이 번호로 보내요.')}
      </div>
      ${field('a-email', '이메일', input('a-email', 'type="email" value="minsu@example.com"'))}
    </section>

    <section class="tp-box" aria-labelledby="photo-title">
      <h2 class="tp-h3" id="photo-title">사진 등록</h2>
      <div class="tp-photo">
        <div class="ds-fileattach">
          <label class="ds-fileattach__dropzone"><input type="file" class="ds-fileattach__input" accept="image/*"><span class="ds-fileattach__label">사진을 끌어 놓거나 눌러서 올리세요</span></label>
        </div>
        <div class="tp-stack" style="gap: var(--ybm-space-x3)">
          <p class="tp-sub">최근 6개월 안에 찍은 여권 규격 사진이어야 해요. 규격에 맞지 않으면 시험 당일 입실이 거부될 수 있어요.</p>
          <ul class="ds-list" data-variant="inset">
            <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('circle-check')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">3.5 × 4.5cm 비율, 300 × 400px 이상</span></span></div></li>
            <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('circle-check')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">흰색이나 옅은 단색 배경, 정면, 무표정</span></span></div></li>
            <li><div class="ds-list-item"><span class="ds-list-item__prefix">${icon('circle-check')}</span><span class="ds-list-item__content"><span class="ds-list-item__title">모자, 선글라스, 마스크 없이. 안경 빛 반사 주의</span></span></div></li>
          </ul>
          <div class="tp-photo__samples">
            <div class="tp-sample">${thumb('', '4:3')}<span class="tp-caption tp-sample__ok">${icon('circle-check-solid', 'sm')} 좋아요</span></div>
            <div class="tp-sample">${thumb('', '4:3')}<span class="tp-caption tp-sample__no">${icon('circle-x', 'sm')} 배경 복잡</span></div>
            <div class="tp-sample">${thumb('', '4:3')}<span class="tp-caption tp-sample__no">${icon('circle-x', 'sm')} 얼굴 잘림</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="tp-box" aria-labelledby="id-title">
      <h2 class="tp-h3" id="id-title">시험 당일 가져올 신분증</h2>
      ${selectbox('idtype', [['주민등록증', '', true], ['운전면허증'], ['여권', '유효 기간 안의 것'], ['청소년증 또는 학생증', '만 18세 이하만']], { cols: 2 })}
      <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">장애가 있거나 임신 중이라 시험 편의가 필요해요 (별도 서류 안내를 받아요)</span></label>
    </section>

    <section class="tp-box" aria-labelledby="agree-title">
      <h2 class="tp-h3" id="agree-title">확인과 동의</h2>
      <fieldset class="ds-checkbox-group" aria-label="동의 항목">
        <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" required><span class="ds-checkbox__label">[필수] 응시 규정과 부정행위 처리 기준을 읽고 동의합니다</span></label>
        <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control" required><span class="ds-checkbox__label">[필수] 환불 규정(시험 9일 전까지 전액, 이후 50%)을 확인했습니다</span></label>
        <label class="ds-checkbox" data-tone="neutral"><input type="checkbox" class="ds-checkbox__control"><span class="ds-checkbox__label">[선택] 성적을 접수한 기관(회사, 학교)에 제공하는 데 동의합니다</span></label>
      </fieldset>
    </section>
    <div class="tp-cta">${btn('이전', { size: 'large', href: 'exam-schedule.html' })}${btn('다음: 결제', { variant: 'brandSolid', size: 'large', href: 'checkout.html' })}</div>
  </form>
</main>
` + FOOT;

// 4. 접수 완료와 수험표
pages['exam-ticket'] = head('접수 완료와 수험표', `  .tp-main { max-width: 720px; }
  .tp-ticket { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x5); }
  .tp-ticket__photo { width: 120px; }
  .tp-ticket dl { display: grid; grid-template-columns: 88px 1fr; gap: var(--ybm-space-x2) var(--ybm-space-x4); margin: 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-ticket dt { color: var(--ybm-color-fg-neutral-muted); } .tp-ticket dd { margin: 0; }
  .tp-ticket__no { font-size: var(--ybm-font-size-t08); line-height: var(--ybm-line-height-t08); font-weight: var(--ybm-font-weight-bold); letter-spacing: .04em; }
  .tp-qr { display: grid; place-items: center; width: 120px; aspect-ratio: 1; border-radius: var(--ybm-shape-sm); background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral-subtle); }
  .tp-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--ybm-space-x2); }
  @media (min-width: 768px) { .tp-ticket { grid-template-columns: auto minmax(0, 1fr) auto; } }
`) + appbar('접수 완료', { back: false, right: `<button type="button" class="ds-appbar__button" aria-label="닫기">${icon('x')}</button>` }) + topnav(EXAM_MENUS, '접수 확인') + `
<main class="tp-main">
  <section class="ds-result">
    <div class="ds-result__asset" style="color: var(--ybm-color-fg-positive)">${icon('circle-check-solid')}</div>
    <div class="ds-result__texts"><h1 class="ds-result__title">접수가 끝났어요</h1><p class="ds-result__desc">수험표는 시험 일주일 전인 11월 16일부터 여기서 바로 볼 수 있어요. 문자와 이메일로도 보내 드릴게요.</p></div>
  </section>
  <section class="tp-box" aria-labelledby="t-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="t-title">수험표</h2>${badge('11.16부터 출력 가능', 'informative')}</div>
    <div class="tp-ticket">
      <div class="ds-imageframe tp-ticket__photo" data-ratio="4:3" data-stroke aria-hidden="true" style="--ds-imageframe-ratio: 3.5 / 4.5"><span class="tp-ph">${icon('image')}</span></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x3)">
        <div><p class="tp-caption">수험번호</p><p class="tp-ticket__no tp-num">0512-0318-2041</p></div>
        <dl><dt>시험</dt><dd>TOEIC 제512회 정기시험</dd><dt>응시자</dt><dd>김민수 (KIM MINSU) · 1998.03.14</dd><dt>일시</dt><dd class="tp-num">2026.11.23 (일) 09:20 입실 · 09:45 시험 시작</dd><dt>고사장</dt><dd>강남 제1고사장 3층 302호<br><span class="tp-caption">서울 강남구 테헤란로 152 · 역삼역 3번 출구 도보 4분</span></dd></dl>
      </div>
      <div class="tp-qr" aria-label="입실 확인 QR 코드 자리">${icon('square', 'lg')}</div>
    </div>
    <div class="tp-actions">${btn('수험표 저장', { iconName: 'file-text' })}${btn('캘린더에 추가', { iconName: 'calendar' })}${btn('길찾기', { iconName: 'map-pin' })}</div>
  </section>
  <section class="tp-box" aria-labelledby="pay-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="pay-title">결제 정보</h2>${btn('영수증', { variant: 'ghost', size: 'xsmall' })}</div>
    <dl class="tp-ticket" style="grid-template-columns: 1fr"><div style="display: grid; grid-template-columns: 88px 1fr; gap: var(--ybm-space-x2) var(--ybm-space-x4); font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04)"><dt style="color: var(--ybm-color-fg-neutral-muted)">접수 번호</dt><dd class="tp-num" style="margin: 0">20261101-0512-77310</dd><dt style="color: var(--ybm-color-fg-neutral-muted)">결제 수단</dt><dd style="margin: 0">신용카드 일시불</dd><dt style="color: var(--ybm-color-fg-neutral-muted)">응시료</dt><dd class="tp-num" style="margin: 0">52,500원</dd></div></dl>
    <div class="ds-callout" data-tone="warning">${icon('triangle-alert-solid')}<p class="ds-callout__content"><strong class="ds-callout__title">취소와 환불</strong>  11월 14일까지 취소하면 전액, 그 뒤 시험 전날까지는 50%가 환불돼요.  <a class="ds-callout__link" href="my-exams.html">접수 내역에서 취소</a></p></div>
  </section>
  <section class="tp-box" aria-labelledby="tip-title">
    <h2 class="tp-h3" id="tip-title">시험 당일 꼭 확인하세요</h2>
    ${accordion([['준비물', '신분증(주민등록증, 운전면허증, 여권), 수험표, 연필과 지우개. 컴퓨터용 사인펜은 고사장에서 드려요.', true], ['입실과 퇴실', '09:20까지 입실해야 하고 09:50 이후에는 들어갈 수 없어요. 듣기 시험 중에는 퇴실할 수 없어요.'], ['가져오면 안 되는 것', '휴대폰을 포함한 모든 전자기기는 꺼서 감독관에게 맡겨요. 소지하다 발견되면 부정행위로 처리돼요.']])}
  </section>
  <div class="tp-cta">${btn('접수 내역 보기', { size: 'large', href: 'my-exams.html' })}${btn('홈으로', { variant: 'neutralSolid', size: 'large', href: 'exam-home.html' })}</div>
</main>
` + FOOT;

// 5. 성적 확인
pages['exam-score'] = head('성적 확인', `  .tp-main { max-width: 960px; }
  .tp-score { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x5); }
  .tp-total { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x1); padding: var(--ybm-space-x6); border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-brand-weak); text-align: center; }
  .tp-total b { font-size: 56px; line-height: 64px; font-weight: var(--ybm-font-weight-bold); color: var(--ybm-color-fg-brand); }
  .tp-parts { display: grid; grid-template-columns: 1fr 1fr; gap: var(--ybm-space-x3); }
  .tp-part { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding: var(--ybm-space-x4); border-radius: var(--ybm-shape-lg); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-weak); }
  .tp-part b { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); font-weight: var(--ybm-font-weight-bold); }
  .tp-trend { display: flex; align-items: flex-end; gap: var(--ybm-space-x3); height: 160px; padding-top: var(--ybm-space-x2); }
  .tp-trend__col { display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: flex-end; gap: var(--ybm-space-x1); height: 100%; }
  .tp-trend__bar { width: 100%; max-width: 56px; border-radius: var(--ybm-shape-xs) var(--ybm-shape-xs) 0 0; background: var(--ybm-color-bg-neutral-muted); }
  .tp-trend__col[data-current] .tp-trend__bar { background: var(--ybm-color-bg-brand-solid); }
  @media (min-width: 768px) { .tp-score { grid-template-columns: 320px minmax(0, 1fr); } .tp-two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--ybm-space-x4); } }
`) + appbar('성적 확인') + topnav(EXAM_MENUS, '성적 확인') + `
<main class="tp-main">
  <div class="tp-between">
    <header class="tp-stack"><h1 class="tp-h1">성적 확인</h1><p class="tp-sub">성적은 발표일 낮 12시에 열리고 2년 동안 유효해요.</p></header>
    <button type="button" class="ds-select" data-size="medium" aria-haspopup="listbox" aria-expanded="false" aria-label="시험 회차"><span class="ds-select__value">제511회 · 2026.11.09</span></button>
  </div>
  <section class="tp-box" aria-labelledby="sc-title">
    <div class="tp-boxhead"><h2 class="tp-h3" id="sc-title">TOEIC 제511회 · 2026.11.09 응시</h2>${badge('발표 완료', 'positive')}</div>
    <div class="tp-score">
      <div class="tp-total"><span class="tp-caption">총점</span><b class="tp-num">875</b><span class="tp-sub">990점 만점 · 상위 9%</span></div>
      <div class="tp-stack" style="gap: var(--ybm-space-x4)">
        <div class="tp-parts">
          <div class="tp-part"><span class="tp-caption">Listening</span><b class="tp-num">455</b>${progress(92)}<span class="tp-caption">495점 만점 · 지난 시험보다 +20</span></div>
          <div class="tp-part"><span class="tp-caption">Reading</span><b class="tp-num">420</b>${progress(85)}<span class="tp-caption">495점 만점 · 지난 시험보다 +35</span></div>
        </div>
        <div class="tp-row" style="flex-wrap: wrap">${btn('온라인 성적표 (PDF)', { variant: 'brandSolid', iconName: 'file-text' })}${btn('공식 성적표 우편 신청', { variant: 'neutralOutline' })}${btn('공유', { variant: 'ghost', iconName: 'share' })}</div>
      </div>
    </div>
  </section>
  <div class="tp-two">
    <section class="tp-box" aria-labelledby="part-title">
      <h2 class="tp-h3" id="part-title">영역별 정답률</h2>
      ${bars([['사진 묘사', 100], ['질의응답', 92], ['짧은 대화', 88], ['설명문', 90], ['문장 빈칸', 85], ['장문 빈칸', 81], ['독해', 83]])}
      <div class="ds-callout" data-tone="informative">${icon('sparkles')}<p class="ds-callout__content"><strong class="ds-callout__title">다음 목표</strong>  장문 빈칸과 독해를 올리면 900점이 보여요.  <a class="ds-callout__link" href="course-catalog.html">900 목표 강좌 보기</a></p></div>
    </section>
    <section class="tp-box" aria-labelledby="trend-title">
      <h2 class="tp-h3" id="trend-title">최근 성적 변화</h2>
      <div class="tp-trend" role="img" aria-label="최근 4회 총점: 760, 805, 820, 875">
        ${[['제498회', 760], ['제503회', 805], ['제507회', 820], ['제511회', 875, true]].map(([l, v, c]) => `<div class="tp-trend__col"${c ? ' data-current' : ''}><span class="tp-caption tp-num">${v}</span><div class="tp-trend__bar" style="height: ${Math.round(v / 990 * 100)}%"></div><span class="tp-caption">${l}</span></div>`).join('')}
      </div>
      <ul class="ds-list" data-variant="inset" data-divider>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">성적 유효 기간</span></span><span class="ds-list-item__suffix tp-num">2028.11.21까지</span></div></li>
        <li><div class="ds-list-item"><span class="ds-list-item__content"><span class="ds-list-item__title">성적 제공 기관</span><span class="ds-list-item__desc">접수할 때 동의한 기관 1곳</span></span><span class="ds-list-item__suffix">${btn('관리', { variant: 'ghost', size: 'xsmall' })}</span></div></li>
      </ul>
    </section>
  </div>
</main>
${bottomnav(EXAM_TABS, '성적')}
` + FOOT;

// 6. 내 시험
pages['my-exams'] = head('내 시험', `  .tp-main { max-width: 880px; }
  .tp-item { display: grid; grid-template-columns: 1fr; gap: var(--ybm-space-x3); }
  .tp-item__actions { display: flex; flex-wrap: wrap; gap: var(--ybm-space-x2); }
  .tp-date { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; padding: var(--ybm-space-x2); border-radius: var(--ybm-shape-md); background: var(--ybm-color-bg-neutral); }
  .tp-date b { font-size: var(--ybm-font-size-t08); line-height: var(--ybm-line-height-t08); font-weight: var(--ybm-font-weight-bold); }
  @media (min-width: 768px) { .tp-item { grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; } }
`) + appbar('내 시험', { back: false, right: `<a class="ds-appbar__button" href="settings.html" aria-label="설정">${icon('menu')}</a>` }) + topnav(EXAM_MENUS, '접수 확인') + `
<main class="tp-main">
  <header class="tp-between"><div class="tp-stack"><h1 class="tp-h1">내 시험</h1><p class="tp-sub">김민수 님의 접수와 성적을 한곳에서 봐요.</p></div>${btn('새로 접수', { variant: 'brandSolid', href: 'exam-schedule.html', iconName: 'plus' })}</header>
  <div class="ds-callout" data-tone="informative">${icon('calendar')}<p class="ds-callout__content"><strong class="ds-callout__title">D-22</strong>  제512회 TOEIC이 11월 23일(일)에 있어요. 수험표는 11월 16일부터 볼 수 있어요.</p></div>
  <div class="ds-tabs" role="tablist" aria-label="내역 종류"><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="true">접수 내역</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">성적</button><button type="button" class="ds-tabs__trigger" role="tab" aria-selected="false">환불</button></div>
  ${[
    ['11', '23', 'TOEIC 제512회 정기시험', '강남 제1고사장 302호 · 09:20 입실', badge('접수 완료', 'positive'), [['수험표', { href: 'exam-ticket.html', variant: 'neutralSolid', size: 'small' }], ['고사장 변경', { size: 'small' }], ['접수 취소', { size: 'small', variant: 'ghost' }]]],
    ['11', '09', 'TOEIC 제511회 정기시험', '서초 제2고사장 · 응시 완료', badge('성적 발표', 'informative'), [['성적 보기', { href: 'exam-score.html', variant: 'neutralSolid', size: 'small' }], ['성적표 발급', { size: 'small' }]]],
    ['10', '18', 'OPIc', '종로 OPIc 센터 · 응시 완료', badge('성적 발표', 'informative'), [['성적 보기', { variant: 'neutralSolid', size: 'small' }]]],
    ['09', '14', 'TOEIC 제507회 정기시험', '강남 제1고사장 · 응시 완료', badge('유효 ~2028.09', 'neutral'), [['성적 보기', { size: 'small' }]]],
  ].map(([m, d, t, s, b, acts]) => `<article class="tp-box tp-item"><div class="tp-date"><span class="tp-caption">${m}월</span><b class="tp-num">${d}</b></div><div class="tp-stack"><div class="tp-row">${b}<span class="tp-h3">${t}</span></div><p class="tp-sub">${s}</p></div><div class="tp-item__actions">${acts.map(([l, o]) => btn(l, o)).join('')}</div></article>`).join('')}
  <div style="display: flex; justify-content: center">${btn('지난 내역 더 보기')}</div>
</main>
${bottomnav(EXAM_TABS, '마이')}
` + FOOT;

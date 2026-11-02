import * as K from './kit.mjs';
const { icon, btn, badge, dot, card, head, secHead, kpi, delta, lineChart, spark, barChart, donut, legend, split, table, progress, segmented, selField, select, avatar, link, divider, walk, C, list, listItem } = K;

const DAYS = ['10.01', '10.08', '10.15', '10.22', '10.29'];
const T = (s) => `<span class="tp-num">${s}</span>`;
const bar = (label, v, txt) => `<div class="tp-track">${progress(v, { label })}<span class="tp-caption tp-num">${txt}</span></div>`;

/* 1. 분석 대시보드 ------------------------------------------------ */
const analytics = () => {
  const users = [{ name: '전체', data: walk(3, 48, 110, 14, { min: 50 }) }, { name: 'PC', data: walk(5, 48, 72, 10, { min: 20 }) }, { name: '모바일', data: walk(9, 48, 40, 8, { min: 15 }) }];
  const tiles = [['월 방문자', '27.3k', '+18.2%', 11], ['월 페이지 뷰', '48.2k', '+12.5%', 12], ['평균 머문 시간', '4.5분', '-14.3%', 13], ['이탈률', '42.3%', '-8.7%', 14]];
  const region = [['서울', 38], ['경기', 28], ['부산', 22], ['대구', 8], ['기타', 4]];
  const role = [['학생', 45], ['직장인', 20], ['교사', 15], ['학부모', 12], ['기타', 8]];
  const pages = [['/home', 8420, 62.3, '3:42'], ['/courses', 6180, 48.1, '4:15'], ['/exam', 5210, 41.7, '2:58'], ['/mypage', 3940, 35.2, '5:06'], ['/notice', 2860, 28.4, '1:47'], ['/help', 1920, 22.9, '2:31']];
  const events = [['page_view', 18420, '12,300', '4,920'], ['sign_up', 9210, '6,840', '2,370'], ['add_to_cart', 7330, '5,120', '2,210'], ['purchase', 4210, '3,560', '650'], ['share', 2180, '1,940', '240'], ['search', 1840, '1,510', '330']];
  const mx = (a) => Math.max(...a.map((r) => r[1]));
  const css = `
  .tp-demo { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-demo__rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: var(--ybm-space-x2) var(--ybm-space-x4); }
`;
  const body = `<div class="tp-app">
<main class="tp-content">
  <section class="tp-sec" aria-labelledby="s-users">
    ${secHead('활성 사용자', { id: 's-users', tools: btn('새로 고침', { ic: 'rotate-ccw' }) })}
    ${card(`${lineChart(users, { w: 1100, h: 240, x: ['10.01', '10.08', '10.15', '10.22', '10.29'], label: '활성 사용자 추이' })}${legend(users.map((s, i) => [s.name, i]))}`)}
  </section>
  <div class="tp-g4">${tiles.map(([l, v, d, s], i) => kpi(l, v, { d, note: '지난 30일, 이전 기간 대비', chart: spark(walk(s, 30, 50, 12, { min: 10 }), C(0), { label: l + ' 추이' }) })).join('')}</div>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-demo">
    ${secHead('사용자 구성', { id: 's-demo', tools: btn('더 보기') })}
    <div class="tp-g2">${[['지역', region], ['사용자 유형', role]].map(([t, rows]) => card(`<h3 class="tp-h4">${t}</h3><div class="tp-demo">${split(rows.map(([n, v]) => [n, v]))}<div class="tp-demo__rows">${rows.map(([n, v], i) => `<div class="tp-stack">${legend([[n, i]])}<span class="tp-caption tp-num">${v}명 · ${v}.0%</span></div>`).join('')}</div></div>`)).join('')}</div>
  </section>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-eng">
    ${secHead('참여', { id: 's-eng', tools: btn('더 보기') })}
    <div class="tp-g2">
      ${card(`<div class="tp-between"><h3 class="tp-h4">많이 본 페이지</h3>${link('전체 페이지')}</div>${table(['페이지', '조회', ['참여율', 'end'], ['머문 시간', 'end']], pages.map(([p, v, e, t]) => [`<code>${p}</code>`, bar(p + ' 조회', Math.round((v / mx(pages)) * 100), v.toLocaleString() + '회'), T(e + '%'), T(t)]))}`)}
      ${card(`<div class="tp-between"><h3 class="tp-h4">많이 일어난 이벤트</h3>${link('전체 이벤트')}</div>${table(['이벤트', '횟수', ['사용자', 'end'], ['세션', 'end']], events.map(([p, v, u, s]) => [`<code>${p}</code>`, bar(p, Math.round((v / mx(events)) * 100), v.toLocaleString()), T(u), T(s)]))}`)}
    </div>
  </section>
</main>
</div>`;
  return { slug: 'dashboard', en: 'Analytics Dashboard', name: '분석 대시보드', group: 'Dashboard', desc: '이용자 추이 그래프, 핵심 지표, 이용자 구성, 참여 현황을 한 화면에서 훑어보는 기본 분석 대시보드입니다.', css, body };
};

/* 2. 데이터 대시보드 (비교) --------------------------------------- */
const comparison = () => {
  const metrics = [['활성 사용자', '128만', ['+0.4%', '+2.1%', '+5.8%', '+21.4%']], ['신규 가입', '8,240', ['-1.2%', '+3.4%', '+8.1%', '+12.0%']], ['결제 전환율', '3.8%', ['+0.1%', '-0.2%', '+0.5%', '+1.1%']], ['평균 결제액', '₩42,300', ['+0.8%', '+1.6%', '-2.3%', '+6.4%']], ['재방문율', '61%', ['+0.2%', '+0.9%', '+2.4%', '+4.0%']], ['수강 완료율', '47%', ['-0.5%', '+1.2%', '+3.3%', '+9.8%']], ['문의 건수', '1,920', ['-4.1%', '-6.0%', '-9.2%', '-18.5%']], ['앱 평점', '4.7', ['0.0%', '+0.1%', '+0.1%', '+0.3%']]];
  const dev = [{ name: '모바일', data: walk(21, 60, 620, 40, { min: 400, drift: 2 }) }, { name: 'PC', data: walk(22, 60, 380, 30, { min: 200 }) }, { name: '태블릿', data: walk(23, 60, 120, 14, { min: 60 }) }];
  const demo = [['나이', [['14–19', 18], ['20–29', 26], ['30–39', 24], ['40–49', 17], ['50 이상', 15]]], ['성별', [['여성', 54], ['남성', 44], ['응답 안 함', 2]]], ['지역', [['서울', 34], ['경기', 27], ['부산', 9], ['기타', 30]]], ['기기', [['iOS', 46], ['Android', 39], ['웹', 15]]]];
  const ch = [['검색', 486200, 38, '+4.2%'], ['직접 방문', 312400, 24, '+1.1%'], ['소셜', 198300, 15, '+9.6%'], ['추천 링크', 142900, 11, '-2.4%'], ['이메일', 88600, 7, '+0.8%'], ['광고', 61400, 5, '-5.3%']];
  const css = `
  .tp-metric__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ybm-space-x1) var(--ybm-space-x2); }
  .tp-metric__cell { display: flex; flex-direction: column; }
  .tp-bars-list { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-bars-list__row { display: grid; grid-template-columns: 72px minmax(0, 1fr) 40px; align-items: center; gap: var(--ybm-space-x2); font-size: var(--ybm-font-size-t03); }
  .tp-sec-ic { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: var(--ybm-shape-xs); background: var(--ybm-color-bg-neutral); }
`;
  const sec = (ic, t, sub, id) => `<div class="tp-sec-head"><div class="tp-sec-head__texts"><span class="tp-row"><span class="tp-sec-ic">${icon(ic, 'sm')}</span><h2 class="tp-h2" id="${id}">${t}</h2></span><span class="tp-sub">${sub}</span></div></div>`;
  const body = `<div class="tp-app">
${head('데이터 대시보드', { sub: '사용자 분석 개요 · 전체 사용자 · 모든 기기 · 최근 90일', tools: `${select('최근 90일', { id: 'f-range', aria: '기간' })}${select('모든 기기', { id: 'f-dev', aria: '기기' })}${select('전체 사용자', { id: 'f-seg', aria: '사용자' })}${btn('내보내기', { ic: 'upload' })}` })}
<main class="tp-content">
  <section class="tp-sec" aria-labelledby="s-km">${sec('sparkles', '핵심 지표', '전일, 전주, 전월, 전년 대비 변화', 's-km')}
    <div class="tp-g4">${metrics.map(([l, v, ds], i) => card(`<div class="tp-stack"><span class="tp-kpi__label">${l}</span><div class="tp-between"><span class="tp-kpi__value">${v}</span><span style="width:72px">${spark(walk(40 + i, 20, 30, 8, { min: 5 }), C(0), { w: 72, h: 24, label: l })}</span></div></div><div class="tp-metric__grid">${ds.map((d, k) => `<span class="tp-metric__cell">${delta(d)}<span class="tp-caption">${['전일', '전주', '전월', '전년'][k]}</span></span>`).join('')}</div>`)).join('')}</div>
  </section>
  <section class="tp-sec" aria-labelledby="s-dev">${sec('smartphone', '기기', '일간 활성 사용자 (천 명)', 's-dev')}
    ${card(`<span class="tp-sub">기기 종류별 일간 활성 사용자</span>${lineChart(dev, { w: 1100, h: 240, x: ['8월', '9월', '10월'], label: '기기별 일간 활성 사용자' })}${legend(dev.map((s, i) => [s.name, i]))}`)}
  </section>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-aud">${sec('id-card', '사용자 구성', '활성 사용자 비율', 's-aud')}
    <div class="tp-g4">${demo.map(([t, rows]) => card(`<h3 class="tp-h4">${t}</h3><div class="tp-bars-list">${rows.map(([n, v], i) => `<div class="tp-bars-list__row">${legend([[n, i]])}${progress(v * 2 > 100 ? 100 : v * 2, { label: n })}<span class="tp-num tp-caption" style="text-align:end">${v}%</span></div>`).join('')}</div>`)).join('')}</div>
  </section>
  <section class="tp-sec" aria-labelledby="s-acq">${secHead('유입 경로', { id: 's-acq', sub: '사용자가 서비스를 찾는 방법' })}
    ${card(table(['경로', '사용자', ['비율', 'end'], ['전월 대비', 'end']], ch.map(([n, u, p, d]) => [n, `<div class="tp-track">${progress(Math.round((u / 486200) * 100), { label: n })}<span class="tp-caption tp-num">${u.toLocaleString()}</span></div>`, T(p + '%'), badge(d, d.startsWith('-') ? 'critical' : 'positive')])), { size: 'small' })}
  </section>
</main>
</div>`;
  return { slug: 'dashboard-comparison', en: 'Data Dashboard', name: '데이터 대시보드', group: 'Dashboard', desc: '기간, 기기, 이용자 조건을 골라 지표를 비교하는 대시보드입니다. 지표마다 작은 추이 그래프와 전일, 전주, 전월, 전년 대비 변화를 함께 보여 줍니다.', css, body };
};

/* 3. 주간 리포트 (스코어카드 + 오른쪽 요약) ---------------------- */
const scorecard = () => {
  const sc = [['순매출', '48.2억', '+2.4%'], ['신규 수강생', '3,820', '+6.1%'], ['수강 완료율', '47%', '-1.3%'], ['환불률', '2.1%', '-0.4%'], ['평균 학습 시간', '5.2시간', '+0.6%'], ['고객 만족도', '4.6', '+0.1']];
  const goals = [['연 매출 600억 달성', 97, '김서준 · 사업 본부장', '581억 / 600억'], ['기업 고객 3곳 늘리기', 67, '이하린 · 영업 이사', '2 / 3곳'], ['수강 완료율 55%', 85, '박도윤 · 교육 운영', '47% / 55%'], ['앱 평점 4.8', 42, '최지아 · 제품', '4.7 / 4.8']];
  const trends = [['순매출', '12.4억', '+14%'], ['신규 수강생', '3,820명', '+6%'], ['학습 시간', '1.9만 시간', '+9%'], ['문의 건수', '1,920건', '-18%']];
  const why = [['circle-check-solid', 'positive', '순매출이 지난주보다 2.4% 늘었어요', '기업 고객 세 곳의 재계약이 예정보다 빨리 끝났어요.'], ['triangle-alert-solid', 'warning', '수강 완료율이 1.3%포인트 내려갔어요', '시험 직전 단기 강좌의 중도 포기가 늘었어요.'], ['info-solid', 'informative', '모바일 결제 비중이 처음으로 60%를 넘었어요', '간편 결제를 붙인 뒤 결제 단계 이탈이 줄었어요.'], ['circle-alert-solid', 'critical', '환불 문의가 화요일에 몰렸어요', '결제 오류 공지가 늦게 나가 같은 문의가 반복됐어요.']];
  const css = `
  .tp-goal { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-goal + .tp-goal { padding-top: var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-whylist { display: flex; flex-direction: column; }
  .tp-whylist > .tp-why { padding-block: var(--ybm-space-x4); }
  .tp-whylist > .tp-why + .tp-why { box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-why { display: flex; gap: var(--ybm-space-x3); }
  .tp-why .ds-icon { margin-top: 2px; }
  .tp-why[data-tone="positive"] > .ds-icon { color: var(--ybm-color-fg-positive); }
  .tp-why[data-tone="warning"] > .ds-icon { color: var(--ybm-color-fg-warning); }
  .tp-why[data-tone="informative"] > .ds-icon { color: var(--ybm-color-fg-informative); }
  .tp-why[data-tone="critical"] > .ds-icon { color: var(--ybm-color-fg-critical); }
`;
  const body = `<div class="tp-app">
${head('주간 업무 리포트', { sub: '2026년 10월 26일~11월 1일, 지난주와 비교 · 11월 2일 생성', tools: `${segmented(['지난주', '지난달', '작년'], 0, '비교 기간')}${btn('공유', { ic: 'share' })}` })}
<div class="tp-body tp-body--panel">
<main class="tp-content">
  <section class="tp-sec" aria-labelledby="s-sc">${secHead('스코어카드', { id: 's-sc', sub: '이번 주 성과 지표' })}
    <div class="tp-g3">${sc.map(([l, v, d]) => kpi(l, v, { d })).join('')}</div>
  </section>
  <section class="tp-sec" aria-labelledby="s-goal">${secHead('목표 달성', { id: 's-goal', sub: '4개 가운데 2개 순항' })}
    ${card(goals.map(([t, v, who, n]) => `<div class="tp-goal"><div class="tp-between"><h3 class="tp-h4">${t}</h3><span class="tp-num tp-h4">${v}%</span></div>${progress(v, { label: t, tone: v < 60 ? 'warning' : '' })}<div class="tp-between"><span class="tp-row">${avatar(who)}<span class="tp-sub">${who}</span></span><span class="tp-caption tp-num">${n}</span></div></div>`).join(''))}
  </section>
  <section class="tp-sec" aria-labelledby="s-tr">${secHead('추이', { id: 's-tr', sub: '이번 기간과 지난 기간 · 최근 12주' })}
    <div class="tp-g2">${trends.map(([l, v, d], i) => card(`<div class="tp-between"><span class="tp-row"><h3 class="tp-h4">${l}</h3><span class="tp-h4 tp-num">${v}</span></span>${delta(d + ' 지난 기간 대비')}</div>${lineChart([{ name: '이번', data: walk(60 + i, 12, 50, 10, { min: 10, drift: 1 }) }, { name: '지난', data: walk(70 + i, 12, 44, 8, { min: 10 }), color: 'var(--ybm-color-fg-neutral-subtle)', dash: true }], { w: 520, h: 160, x: ['8월', '9월', '10월'], label: l + ' 추이' })}${legend([['이번 기간', 0], ['지난 기간', 'var(--ybm-color-fg-neutral-subtle)']])}`)).join('')}</div>
  </section>
</main>
<aside class="tp-panel" aria-labelledby="s-why">
  ${secHead('무엇이 왜 바뀌었나', { id: 's-why', sub: 'AI 요약', cls: 'tp-h3' })}
  <div class="tp-whylist">${why.map(([ic, tone, t, d]) => `<div class="tp-why" data-tone="${tone}">${icon(ic)}<div class="tp-stack"><h3 class="tp-h4">${t}</h3><p class="tp-sub">${d}</p></div></div>`).join('')}</div>
</aside>
</div>
</div>`;
  return { slug: 'dashboard-scorecard', en: 'Executive Summary Dashboard', name: '주간 리포트 대시보드', group: 'Dashboard', desc: '한 주의 성과를 보고서처럼 읽는 대시보드입니다. 핵심 지표, 목표 달성률, 추이 그래프 옆에 무엇이 왜 바뀌었는지 요약을 함께 둡니다.', css, body };
};

/* 4. 퍼널과 코호트 ----------------------------------------------- */
const funnel = () => {
  const tiles = [['방문 → 가입', '32.1%', '+1.8%p'], ['가입 → 첫 수강', '41.6%', '+0.9%p'], ['첫 수강 → 결제', '28.4%', '-1.2%p'], ['결제 → 재결제', '52.3%', '+2.4%p'], ['전체 전환', '4.9%', '+0.3%p']];
  const stages = [['방문', 128400, ''], ['가입', 41216, '-68%'], ['첫 수강', 17146, '-58%'], ['결제', 4869, '-72%'], ['재결제', 2547, '-48%'], ['추천', 812, '-68%']];
  const conv = [0, 1, 2, 3].map((i) => ({ name: tiles[i][0], data: walk(80 + i, 26, [32, 42, 28, 52][i], 4, { min: 5 }) }));
  const cohort = ['8.31–9.06', '9.07–9.13', '9.14–9.20', '9.21–9.27', '9.28–10.04', '10.05–10.11', '10.12–10.18', '10.19–10.25'];
  const ret = (r, w) => Math.max(0, Math.round(100 * Math.pow(0.78 - r * 0.008, w) + (w ? 6 : 0)));
  const tone = (v) => (v >= 80 ? 'brand' : v >= 56 ? 'informative' : v >= 44 ? 'positive' : v >= 32 ? 'warning' : 'neutral');
  const css = `
  .tp-funnel { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4); }
  @media (min-width: 1024px) { .tp-funnel { grid-template-columns: repeat(6, minmax(0, 1fr)); } }
  .tp-funnel__bar { display: flex; align-items: flex-end; height: 120px; border-radius: var(--ybm-shape-xs); background: var(--ybm-color-bg-neutral); overflow: hidden; }
  .tp-funnel__bar > span { display: block; width: 100%; background: var(--ybm-color-chart-series-1); }
  .tp-heat td { text-align: center; }
`;
  const body = `<div class="tp-app">
${head('퍼널과 코호트 분석', { sub: '방문 128,400명 · 전체 전환 4.9%', tools: `${segmented(['7일', '30일', '90일'], 1, '퍼널 기간')}${select('모든 플랫폼', { id: 'f-seg', aria: '사용자 묶음' })}${btn('내보내기', { ic: 'upload' })}` })}
<main class="tp-content">
  <section class="tp-sec" aria-label="단계 전환율">
    <div class="tp-g5">${tiles.map(([l, v, d]) => kpi(l, v, { d: d + ' 지난 기간 대비' })).join('')}</div>
    ${card(`<div class="tp-stack"><h2 class="tp-h3">전환 퍼널</h2><span class="tp-sub">모든 플랫폼 · 30일</span></div>${divider()}<div class="tp-funnel">${stages.map(([n, v, d], i) => `<div class="tp-stack" style="gap: var(--ybm-space-x2)"><span class="tp-sub">${i ? stages[i - 1][0] + ' → ' + n : n}</span><div class="tp-row"><span class="tp-h3 tp-num">${i ? ((v / stages[i - 1][1]) * 100).toFixed(1) + '%' : v.toLocaleString()}</span>${d ? badge(d, 'critical') : ''}</div><div class="tp-funnel__bar" data-tip="${n}|${v.toLocaleString()}명"><span style="height:${Math.max(4, (v / 128400) * 100)}%"></span></div><span class="tp-caption tp-num">${v.toLocaleString()}명</span></div>`).join('')}</div>`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">시간에 따른 전환율</h2><span class="tp-sub">단계별 전환율 · 최근 26주</span></div>${lineChart(conv, { w: 1100, h: 240, x: ['5월', '6월', '7월', '8월', '9월', '10월'], unit: '%', label: '단계별 전환율 추이' })}${legend(conv.map((s, i) => [s.name, i]))}`)}
  </section>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-co">${secHead('주간 잔존 코호트', { id: 's-co', sub: '가입 주 × 가입 뒤 지난 주' })}
    ${card(`${table(['가입 주', ['사용자', 'end'], ...Array.from({ length: 9 }, (_, w) => ['' + w + '주', 'center'])], cohort.map((c, r) => [c, T((4820 - r * 210).toLocaleString()), ...Array.from({ length: 9 }, (_, w) => (w <= 8 - r ? badge(ret(r, w) + '%', tone(ret(r, w))).replace('<span class', `<span data-tip="${c} 가입 · ${w}주 뒤|${ret(r, w)}% 남음" class`) : ''))]), { cls: 'tp-heat' })}<div class="tp-row" style="flex-wrap: wrap"><span class="tp-caption">잔존율</span>${[['32% 미만', 'neutral'], ['32–44%', 'warning'], ['44–56%', 'positive'], ['56–80%', 'informative'], ['80% 이상', 'brand']].map(([t, k]) => badge(t, k)).join('')}</div>`)}
  </section>
</main>
</div>`;
  return { slug: 'dashboard-cohort-funnel', en: 'Funnel & Cohort Dashboard', name: '퍼널·코호트 대시보드', group: 'Dashboard', desc: '단계마다 얼마나 이탈하는지 보는 퍼널과, 가입 시기별로 얼마나 남아 있는지 보는 코호트 표를 함께 둔 분석 대시보드입니다.', css, body };
};

/* 5. 자산 대시보드 (구성 변화) ----------------------------------- */
const composition = () => {
  const tiles = [['총 평가액', '2억 9,420만', '+14.8%'], ['연 수익률', '14.8%', '+2.1%'], ['배당 수익률', '2.8%', '+0.2%'], ['보유 종목', '23개', '+4']];
  // 총 평가액(억 원) 1년, 주마다 한 점
  const rr = K.rnd(120); let tv = 2.31;
  const total = Array.from({ length: 53 }, () => { tv += (rr() - 0.5) * 0.06 + 0.012; return +tv.toFixed(2); });
  const days = Array.from({ length: 53 }, (_, i) => { const t = new Date(2025, 10, 3 + i * 7); return t.getFullYear() + '.' + String(t.getMonth() + 1).padStart(2, '0') + '.' + String(t.getDate()).padStart(2, '0'); });
  const mix = [['국내 주식', 34], ['해외 주식', 30], ['채권', 24], ['현금', 12]];
  const top = [['삼', '가 전자', '8,720만', '+18.4%'], ['반', '나 반도체', '6,140만', '+22.1%'], ['인', '다 인터넷', '3,980만', '-3.2%'], ['배', '라 배터리', '2,860만', '+6.7%'], ['바', '마 바이오', '1,930만', '-1.4%']];
  const idx = [['코스피', 'KOSPI', '2,861.43', '+0.42%'], ['코스닥', 'KOSDAQ', '842.17', '-0.31%'], ['다우존스', 'DJI', '43,821.67', '+0.42%'], ['나스닥', 'IXIC', '19,204.88', '+0.87%'], ['S&P 500', 'SPX', '5,934.20', '+0.55%'], ['원/달러', 'USD/KRW', '1,372.50', '-0.18%'], ['금', 'GOLD', '2,684.30', '+0.24%'], ['국고채 10년', 'KR10Y', '2.94%', '-0.02%']];
  const trend = [['가 전자', '72,800', '+1.35', '+1.9%', '1,240만'], ['나 반도체', '214,500', '+4.50', '+2.1%', '880만'], ['다 인터넷', '186,200', '-2.10', '-1.1%', '410만'], ['라 배터리', '392,000', '+7.00', '+1.8%', '320만'], ['마 바이오', '74,300', '-0.80', '-1.1%', '290만'], ['바 자동차', '248,500', '+3.50', '+1.4%', '270만']];
  const body = `<div class="tp-app">
<main class="tp-content">
  <div class="tp-between"><h1 class="tp-h1">내 자산</h1>${btn('거래 내역', { ic: 'file-text' })}</div>
  <div class="tp-g4">${tiles.map(([l, v, d]) => kpi(l, v, { d })).join('')}</div>
  <div class="tp-g4">
    ${card(`<div class="tp-between"><h2 class="tp-h3">총 평가액</h2>${segmented(['3개월', '6개월', '1년'], 2, '기간')}</div>${lineChart([{ name: '총 평가액', data: total }], { w: 820, h: 260, area: true, unit: '억', x: ['2025.11', '2026.02', '2026.05', '2026.08', '2026.11'], xs: days, label: '1년 동안의 총 평가액' })}<div class="tp-stack" style="gap: var(--ybm-space-x2)"><span class="tp-h4">자산 구성</span>${split(mix)}${legend(mix.map(([t, v], i) => [t, i, v + '%']))}</div>`, { cls: 'tp-span3' })}
    ${card(`<div class="tp-between"><h2 class="tp-h3">많이 가진 종목</h2>${link('전체 보기')}</div>${list(top.map(([a, n, v, d]) => listItem(n, { size: 'small', prefix: avatar(a), suffix: `<span class="tp-stack" style="align-items:flex-end"><span class="tp-num">${v}</span>${badge(d, d.startsWith('-') ? 'critical' : 'positive')}</span>` })))}`)}
  </div>
  ${divider()}
  <div class="tp-between"><div class="tp-stack"><h2 class="tp-h1">오늘의 시장</h2><span class="tp-sub">지난 24시간</span></div>${btn('새로 고침', { ic: 'rotate-ccw' })}</div>
  <div class="tp-g4">${idx.map(([n, c, v, d], i) => card(`<div class="tp-stack"><h3 class="tp-h4">${n}</h3><span class="tp-caption">${c}</span></div><div class="tp-between"><span class="tp-h3 tp-num">${v}</span>${delta(d)}</div>${spark(walk(120 + i, 24, 40, 8, { min: 5 }), d.startsWith('-') ? 'var(--ybm-color-fg-critical)' : 'var(--ybm-color-fg-positive)', { h: 32, label: n + ' 추이' })}`)).join('')}</div>
  ${card(`<h2 class="tp-h3">관심 종목</h2>${table(['종목', ['현재가', 'end'], ['전일 대비', 'end'], ['등락률', 'end'], ['거래량', 'end'], ['', 'end']], trend.map(([n, p, c, r, v]) => [n, T(p), badge(c, c.startsWith('-') ? 'critical' : 'positive'), T(r), T(v), btn('관심', { variant: 'ghost', ic: 'star', size: 'xsmall' })]))}`)}
</main>
</div>`;
  return { slug: 'dashboard-composition', en: 'Portfolio Dashboard', name: '자산 대시보드', group: 'Dashboard', desc: '자산이 시간에 따라 어떻게 바뀌었는지 보는 대시보드입니다. 총액과 수익률 지표, 1년 동안의 총 평가액 그래프와 자산 구성, 보유 종목, 시장 지수를 차례로 보여 줍니다.', css: '', body };
};

/* 6. 프로젝트 현황 ----------------------------------------------- */
const progressDash = () => {
  const ms = [['기획 확정', 0, 12, 'positive'], ['디자인 시스템 적용', 8, 34, 'positive'], ['수강 결제 개편', 20, 52, 'warning'], ['학습 기록 API', 30, 58, 'critical'], ['앱 출시 준비', 48, 78, 'informative'], ['QA와 접근성 점검', 60, 84, 'informative'], ['정식 출시', 84, 90, 'neutral']];
  const ws = [['핵심 플랫폼', '개발', '김서준', 82, '4월 21일', ['순항', 'positive']], ['결제', '개발', '이하린', 54, '5월 9일', ['위험', 'warning']], ['학습 기록', '개발', '박도윤', 31, '5월 16일', ['막힘', 'critical']], ['앱', '출시', '최지아', 46, '6월 2일', ['순항', 'positive']], ['디자인', '디자인', '정유나', 90, '4월 4일', ['완료', 'neutral']], ['QA', '검증', '한지호', 18, '6월 13일', ['순항', 'positive']]];
  const W = 1100, today = 46;
  const gantt = `<svg class="tp-chart" viewBox="0 0 ${W} ${ms.length * 36 + 30}" role="img" aria-label="마일스톤 일정">${[0, 15, 30, 45, 60, 75, 90].map((d) => `<line class="tp-grid-line" x1="${180 + (d / 90) * (W - 190)}" x2="${180 + (d / 90) * (W - 190)}" y1="0" y2="${ms.length * 36}"/><text x="${180 + (d / 90) * (W - 190)}" y="${ms.length * 36 + 20}" text-anchor="middle">${d}일</text>`).join('')}${ms.map(([n, a, b, t], i) => `<text x="0" y="${i * 36 + 23}" style="fill:var(--ybm-color-fg-neutral);font-size:13px">${n}</text><rect x="${180 + (a / 90) * (W - 190)}" y="${i * 36 + 8}" width="${((b - a) / 90) * (W - 190)}" height="20" rx="4" fill="var(--ybm-color-fg-${t === 'neutral' ? 'neutral-subtle' : t})" data-tip="${n}|${a}일 ~ ${b}일"/>`).join('')}<line x1="${180 + (today / 90) * (W - 190)}" x2="${180 + (today / 90) * (W - 190)}" y1="0" y2="${ms.length * 36}" stroke="var(--ybm-color-fg-neutral)" stroke-dasharray="4 4"/></svg>`;
  const body = `<div class="tp-app">
${head('새 학습 앱 출시', { sub: `목표 출시일 2026년 6월 30일 · ${badge('막힘 1건', 'critical')}`, tools: `${segmented(['기획', '개발', '검증', '출시'], 1, '진행 단계')}${btn('보고서', { ic: 'file-text' })}` })}
<main class="tp-content">
  <section class="tp-sec" aria-labelledby="s-ms">${secHead('마일스톤 일정', { id: 's-ms', sub: '프로젝트 0~90일 · 점선이 오늘' })}
    ${card(`<div class="tp-scroll-x">${gantt}</div>${legend([['순항', 'var(--ybm-color-fg-positive)'], ['위험', 'var(--ybm-color-fg-warning)'], ['막힘', 'var(--ybm-color-fg-critical)'], ['예정', 'var(--ybm-color-fg-informative)']])}`)}
  </section>
  <div class="tp-g3">
    ${card(`<div class="tp-stack"><h2 class="tp-h3">전체 진행</h2><span class="tp-sub">할 일 148개 · 320포인트</span></div><div class="tp-row" style="gap: var(--ybm-space-x6); flex-wrap: wrap">${donut([['완료', 62, C(0)], ['진행', 24, C(1)], ['검토', 9, C(2)], ['남음', 53, 'var(--ybm-color-bg-neutral)']], { size: 140, center: '42%', sub: '완료' })}${legend([['완료', 0, 62], ['진행', 1, 24], ['검토', 2, 9], ['남음', 'var(--ybm-color-bg-neutral)', 53]])}</div>`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">이번 주 처리량</h2><span class="tp-sub">닫힌 할 일 · 최근 8주</span></div>${barChart([[12], [18], [15], [22], [19], [24], [17], [21]], { w: 420, h: 180, x: ['1', '2', '3', '4', '5', '6', '7', '8'], label: '주별 처리량' })}`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">위험 요소</h2><span class="tp-sub">해결이 필요한 3건</span></div>${list([listItem('학습 기록 API 응답 지연', { sub: '박도윤 · 4일째', prefix: dot('critical'), size: 'small' }), listItem('결제 대행사 계약 검토', { sub: '이하린 · 법무 검토 중', prefix: dot('warning'), size: 'small' }), listItem('앱 심사 일정 미확정', { sub: '최지아 · 다음 주 확인', prefix: dot('warning'), size: 'small' })])}`)}
  </div>
  ${card(`<div class="tp-between"><h2 class="tp-h3">작업 흐름</h2><span class="tp-sub">8개 중 8개</span></div>${table(['작업 흐름', '담당', '진행', '마감', '상태'], ws.map(([n, s, o, v, d, [st, tn]]) => [`<span class="tp-stack"><span>${n}</span><span class="tp-caption">${s}</span></span>`, `<span class="tp-row">${avatar(o)}${o}</span>`, `<div class="tp-row" style="min-width:140px">${progress(v, { label: n })}<span class="tp-num tp-caption">${v}%</span></div>`, T(d), badge(st, tn)]))}`)}
</main>
</div>`;
  return { slug: 'dashboard-progress', en: 'Project Status Dashboard', name: '프로젝트 현황 대시보드', group: 'Dashboard', desc: '일정 막대와 오늘 표시선, 완료율 도넛, 담당자별 진행 표로 프로젝트가 어디까지 왔는지 보여 주는 대시보드입니다.', css: '', body };
};

/* 7. 서비스 모니터링 (오른쪽 알림 패널) -------------------------- */
const monitoring = () => {
  const tiles = [['positive', '전체 상태', '98.6%', '+0.3%'], ['warning', '오류율', '1.84%', '+0.9%'], ['warning', '응답 시간 p99', '512ms', '+84ms'], ['positive', '가용성', '99.98%', '+0.01%']];
  const lat = ['p50', 'p95', 'p99'].map((name, i) => ({ name, data: walk(140 + i, 60, [60, 180, 380][i], [10, 30, 90][i], { min: 20 }) }));
  const vol = ['서울', '도쿄', '싱가포르'].map((name, i) => ({ name, data: walk(150 + i, 60, [9000, 7000, 4500][i], 1400, { min: 2000 }) }));
  const svc = [['positive', '인증', '99.72%', 2], ['warning', '결제 API', '99.55%', 10], ['warning', '이미지 CDN', '99.63%', 6], ['positive', '검색', '99.91%', 1], ['critical', '알림', '98.80%', 14]];
  const strip = (seed, bad) => { const r = K.rnd(seed); return `<div class="tp-uptime" role="img" aria-label="최근 90일 가동 기록, 문제 있던 날 ${bad}일">${Array.from({ length: 90 }, (_, i) => { const x = r(); const s = x < bad / 90 ? (x < bad / 360 ? 'down' : 'warn') : 'ok'; return `<span data-s="${s}" data-tip="${90 - i}일 전|${{ ok: '정상', warn: '느림', down: '중단' }[s]}"></span>`; }).join('')}</div>`; };
  const alerts = [['critical', '검색 서버 5xx 오류 5% 넘음', '검색 · 서울', '발생', '4분 전'], ['critical', '결제 API p99 500ms 넘음', '결제 · 서울', '발생', '12분 전'], ['critical', '알림 대기열 쌓임', '알림 · 싱가포르', '발생', '31분 전'], ['warning', 'CDN 캐시 적중률 떨어짐', 'CDN · 도쿄', '확인', '1시간 전'], ['warning', '인증 오류율 증가 (개발 환경)', '인증 · 서울', '확인', '2시간 전'], ['positive', '정산 작업 응답 없음', '정산 · 서울', '해결', '3시간 전']];
  const brk = [['critical', '검색', '서울 · 서버 16대 · 4.1k rpm', '1180ms', '5.8%'], ['warning', '결제 API', '서울 · 서버 24대 · 9.2k rpm', '512ms', '2.1%'], ['warning', '이미지 CDN', '도쿄 · 서버 30대 · 14.8k rpm', '402ms', '1.6%'], ['positive', '알림', '싱가포르 · 서버 6대 · 1.2k rpm', '268ms', '0.5%'], ['positive', '인증', '서울 · 서버 12대 · 4.0k rpm', '236ms', '0.4%']];
  const css = `
  .tp-uptime { display: grid; grid-template-columns: repeat(90, minmax(0, 1fr)); gap: 2px; height: 28px; }
  .tp-uptime span { border-radius: 2px; background: var(--ybm-color-bg-positive-solid); }
  .tp-uptime span[data-s="warn"] { background: var(--ybm-color-bg-warning-solid); }
  .tp-uptime span[data-s="down"] { background: var(--ybm-color-bg-critical-solid); }
  .tp-svc { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-svc + .tp-svc { padding-top: var(--ybm-space-x3); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-alert { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--ybm-space-x1) var(--ybm-space-x2); align-items: start; padding-block: var(--ybm-space-x2_5); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-alert .ds-statusdot { margin-top: 6px; }
  .tp-alert__end { display: flex; flex-direction: column; align-items: flex-end; gap: var(--ybm-space-x1); }
`;
  const body = `<div class="tp-app">
${head('서비스 상태 모니터', { sub: `<span class="tp-row">${dot('positive', '실시간')}11월 1일 오후 6:15 업데이트</span>`, tools: `${segmented(['1시간', '1일', '7일'], 1, '시간 범위')}${select('운영', { id: 'f-env', aria: '환경' })}${select('모든 지역', { id: 'f-region', aria: '지역' })}` })}
<div class="tp-body tp-body--panel">
<main class="tp-content">
  <div class="tp-g4">${tiles.map(([t, l, v, d], i) => kpi(l, v, { d, lead: dot(t, l), chart: spark(walk(160 + i, 48, 40, 10, { min: 5 }), `var(--ybm-color-fg-${t})`, { h: 36, label: l + ' 추이' }) })).join('')}</div>
  <div class="tp-g2">
    ${card(`<div class="tp-stack"><h2 class="tp-h3">응답 시간</h2><span class="tp-sub">모든 서비스의 백분위 응답 시간 (ms)</span></div>${lineChart(lat, { w: 520, h: 220, x: ['00:00', '06:00', '12:00', '18:00', '23:50'], label: '응답 시간 추이' })}${legend(lat.map((s, i) => [s.name, i]))}`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">지역별 요청량</h2><span class="tp-sub">분당 요청 수 (rpm)</span></div>${lineChart(vol, { w: 520, h: 220, x: ['00:00', '06:00', '12:00', '18:00', '23:50'], label: '지역별 요청량 추이' })}${legend(vol.map((s, i) => [s.name, i]))}`)}
  </div>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-all">${secHead('모든 서비스', { id: 's-all', sub: '최근 90일 일별 가동 · 운영 · 모든 지역', tools: legend([['정상', 'var(--ybm-color-bg-positive-solid)'], ['저하', 'var(--ybm-color-bg-warning-solid)'], ['중단', 'var(--ybm-color-bg-critical-solid)']]) })}
    ${card(svc.map(([t, n, u, b], i) => `<div class="tp-svc"><div class="tp-between"><span class="tp-row">${dot(t, n)}<h3 class="tp-h4">${n}</h3></span><span class="tp-sub tp-num">가동률 ${u}</span></div>${strip(170 + i, b)}</div>`).join(''))}
  </section>
</main>
<aside class="tp-panel" aria-label="알림과 서비스 요약">
  <section class="tp-sec" aria-labelledby="s-al">${secHead(`<span class="tp-row">${icon('triangle-alert')}활성 알림</span>`, { id: 's-al', cls: 'tp-h3', tools: badge('3건 발생', 'critical') })}<span class="tp-caption">최근 24시간 6건 · 최신순</span>
    <div>${alerts.map(([t, n, w, st, time]) => `<div class="tp-alert">${dot(t, st)}<div class="tp-stack"><span class="tp-h4" style="font-weight:var(--ybm-font-weight-medium)">${n}</span><span class="tp-caption">${w}</span></div><div class="tp-alert__end">${badge(st, t === 'positive' ? 'positive' : t === 'warning' ? 'warning' : 'critical')}<span class="tp-caption">${time}</span></div></div>`).join('')}</div>
  </section>
  <section class="tp-sec" aria-labelledby="s-br">${secHead(`<span class="tp-row">${icon('monitor')}서비스별 현황</span>`, { id: 's-br', cls: 'tp-h3', tools: badge('10') })}<span class="tp-caption">운영 · 모든 지역</span>
    <div>${brk.map(([t, n, w, p, e]) => `<div class="tp-alert">${dot(t, n)}<div class="tp-stack"><span class="tp-h4" style="font-weight:var(--ybm-font-weight-medium)">${n}</span><span class="tp-caption">${w}</span></div><div class="tp-alert__end"><span class="tp-num tp-h4">p99 ${p}</span>${badge(e, t === 'positive' ? 'positive' : t === 'warning' ? 'warning' : 'critical')}</div></div>`).join('')}</div>
  </section>
</aside>
</div>
</div>`;
  return { slug: 'dashboard-alert-rail', en: 'Service Monitoring Dashboard', name: '서비스 모니터링 대시보드', group: 'Dashboard', desc: '서비스 상태를 계속 지켜보는 모니터링 화면입니다. 상태 지표, 시간대별 그래프, 서비스별 90일 가동 기록을 보여 주고 오른쪽에 알림 목록을 따로 둡니다.', css, body };
};

export const templates = [analytics, comparison, scorecard, funnel, composition, progressDash, monitoring].map((f) => f());

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
  .tp-demo { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  .tp-demo__rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: var(--ds-space-x2) var(--ds-space-x4); }
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
  return { slug: 'dashboard', en: 'Analytics Dashboard', name: '분석 대시보드', group: 'Dashboard', desc: '서비스 이용 흐름을 한눈에 보는 기본 분석 대시보드입니다. 추이 그래프와 핵심 지표를 먼저 보여 줍니다.', css, body };
};

/* 2. 프로젝트 현황 ----------------------------------------------- */
const progressDash = () => {
  const ms = [['기획 확정', 0, 12, 'positive'], ['디자인 시스템 적용', 8, 34, 'positive'], ['수강 결제 개편', 20, 52, 'warning'], ['학습 기록 API', 30, 58, 'critical'], ['앱 출시 준비', 48, 78, 'informative'], ['QA와 접근성 점검', 60, 84, 'informative'], ['정식 출시', 84, 90, 'neutral']];
  const ws = [['핵심 플랫폼', '개발', '김서준', 82, '4월 21일', ['순항', 'positive']], ['결제', '개발', '이하린', 54, '5월 9일', ['위험', 'warning']], ['학습 기록', '개발', '박도윤', 31, '5월 16일', ['막힘', 'critical']], ['앱', '출시', '최지아', 46, '6월 2일', ['순항', 'positive']], ['디자인', '디자인', '정유나', 90, '4월 4일', ['완료', 'neutral']], ['QA', '검증', '한지호', 18, '6월 13일', ['순항', 'positive']]];
  const W = 1100, today = 46;
  const gantt = `<svg class="tp-chart" viewBox="0 0 ${W} ${ms.length * 36 + 30}" role="img" aria-label="마일스톤 일정">${[0, 15, 30, 45, 60, 75, 90].map((d) => `<line class="tp-grid-line" x1="${180 + (d / 90) * (W - 190)}" x2="${180 + (d / 90) * (W - 190)}" y1="0" y2="${ms.length * 36}"/><text x="${180 + (d / 90) * (W - 190)}" y="${ms.length * 36 + 20}" text-anchor="middle">${d}일</text>`).join('')}${ms.map(([n, a, b, t], i) => `<text x="0" y="${i * 36 + 23}" style="fill:var(--ds-color-fg-neutral);font-size:13px">${n}</text><rect x="${180 + (a / 90) * (W - 190)}" y="${i * 36 + 8}" width="${((b - a) / 90) * (W - 190)}" height="20" rx="4" fill="var(--ds-color-fg-${t === 'neutral' ? 'neutral-subtle' : t})" data-tip="${n}|${a}일 ~ ${b}일"/>`).join('')}<line x1="${180 + (today / 90) * (W - 190)}" x2="${180 + (today / 90) * (W - 190)}" y1="0" y2="${ms.length * 36}" stroke="var(--ds-color-fg-neutral)" stroke-dasharray="4 4"/></svg>`;
  const body = `<div class="tp-app">
${head('새 학습 앱 출시', { sub: `목표 출시일 2026년 6월 30일 · ${badge('막힘 1건', 'critical')}`, tools: `${segmented(['기획', '개발', '검증', '출시'], 1, '진행 단계')}${btn('보고서', { ic: 'file-text' })}` })}
<main class="tp-content">
  <section class="tp-sec" aria-labelledby="s-ms">${secHead('마일스톤 일정', { id: 's-ms', sub: '프로젝트 0~90일 · 점선이 오늘' })}
    ${card(`<div class="tp-scroll-x">${gantt}</div>${legend([['순항', 'var(--ds-color-fg-positive)'], ['위험', 'var(--ds-color-fg-warning)'], ['막힘', 'var(--ds-color-fg-critical)'], ['예정', 'var(--ds-color-fg-informative)']])}`)}
  </section>
  <div class="tp-g3">
    ${card(`<div class="tp-stack"><h2 class="tp-h3">전체 진행</h2><span class="tp-sub">할 일 148개 · 320포인트</span></div><div class="tp-row" style="gap: var(--ds-space-x6); flex-wrap: wrap">${donut([['완료', 62, C(0)], ['진행', 24, C(1)], ['검토', 9, C(2)], ['남음', 53, 'var(--ds-color-bg-neutral)']], { size: 140, center: '42%', sub: '완료' })}${legend([['완료', 0, 62], ['진행', 1, 24], ['검토', 2, 9], ['남음', 'var(--ds-color-bg-neutral)', 53]])}</div>`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">이번 주 처리량</h2><span class="tp-sub">닫힌 할 일 · 최근 8주</span></div>${barChart([[12], [18], [15], [22], [19], [24], [17], [21]], { w: 420, h: 180, x: ['1', '2', '3', '4', '5', '6', '7', '8'], label: '주별 처리량' })}`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">위험 요소</h2><span class="tp-sub">해결이 필요한 3건</span></div>${list([listItem('학습 기록 API 응답 지연', { sub: '박도윤 · 4일째', prefix: dot('critical'), size: 'small' }), listItem('결제 대행사 계약 검토', { sub: '이하린 · 법무 검토 중', prefix: dot('warning'), size: 'small' }), listItem('앱 심사 일정 미확정', { sub: '최지아 · 다음 주 확인', prefix: dot('warning'), size: 'small' })])}`)}
  </div>
  ${card(`<div class="tp-between"><h2 class="tp-h3">작업 흐름</h2><span class="tp-sub">8개 중 8개</span></div>${table(['작업 흐름', '담당', '진행', '마감', '상태'], ws.map(([n, s, o, v, d, [st, tn]]) => [`<span class="tp-stack"><span>${n}</span><span class="tp-caption">${s}</span></span>`, `<span class="tp-row">${avatar(o)}${o}</span>`, `<div class="tp-row" style="min-width:140px">${progress(v, { label: n })}<span class="tp-num tp-caption">${v}%</span></div>`, T(d), badge(st, tn)]))}`)}
</main>
</div>`;
  return { slug: 'dashboard-progress', en: 'Project Status Dashboard', name: '프로젝트 현황 대시보드', group: 'Dashboard', desc: '프로젝트가 어디까지 왔는지 일정과 진행률로 보여 주는 대시보드입니다.', css: '', body };
};

/* 3. 서비스 모니터링 (오른쪽 알림 패널) -------------------------- */
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
  .tp-uptime span { border-radius: 2px; background: var(--ds-color-bg-positive-solid); }
  .tp-uptime span[data-s="warn"] { background: var(--ds-color-bg-warning-solid); }
  .tp-uptime span[data-s="down"] { background: var(--ds-color-bg-critical-solid); }
  .tp-svc { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-svc + .tp-svc { padding-top: var(--ds-space-x3); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-alert { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--ds-space-x1) var(--ds-space-x2); align-items: start; padding-block: var(--ds-space-x2_5); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-alert .ds-statusdot { margin-top: 6px; }
  .tp-alert__end { display: flex; flex-direction: column; align-items: flex-end; gap: var(--ds-space-x1); }
`;
  const body = `<div class="tp-app">
${head('서비스 상태 모니터', { sub: `<span class="tp-row">${dot('positive', '실시간')}11월 1일 오후 6:15 업데이트</span>`, tools: `${segmented(['1시간', '1일', '7일'], 1, '시간 범위')}${select('운영', { id: 'f-env', aria: '환경' })}${select('모든 지역', { id: 'f-region', aria: '지역' })}` })}
<div class="tp-body tp-body--panel">
<main class="tp-content">
  <div class="tp-g4">${tiles.map(([t, l, v, d], i) => kpi(l, v, { d, lead: dot(t, l), chart: spark(walk(160 + i, 48, 40, 10, { min: 5 }), `var(--ds-color-fg-${t})`, { h: 36, label: l + ' 추이' }) })).join('')}</div>
  <div class="tp-g2">
    ${card(`<div class="tp-stack"><h2 class="tp-h3">응답 시간</h2><span class="tp-sub">모든 서비스의 백분위 응답 시간 (ms)</span></div>${lineChart(lat, { w: 520, h: 220, x: ['00:00', '06:00', '12:00', '18:00', '23:50'], label: '응답 시간 추이' })}${legend(lat.map((s, i) => [s.name, i]))}`)}
    ${card(`<div class="tp-stack"><h2 class="tp-h3">지역별 요청량</h2><span class="tp-sub">분당 요청 수 (rpm)</span></div>${lineChart(vol, { w: 520, h: 220, x: ['00:00', '06:00', '12:00', '18:00', '23:50'], label: '지역별 요청량 추이' })}${legend(vol.map((s, i) => [s.name, i]))}`)}
  </div>
  ${divider()}
  <section class="tp-sec" aria-labelledby="s-all">${secHead('모든 서비스', { id: 's-all', sub: '최근 90일 일별 가동 · 운영 · 모든 지역', tools: legend([['정상', 'var(--ds-color-bg-positive-solid)'], ['저하', 'var(--ds-color-bg-warning-solid)'], ['중단', 'var(--ds-color-bg-critical-solid)']]) })}
    ${card(svc.map(([t, n, u, b], i) => `<div class="tp-svc"><div class="tp-between"><span class="tp-row">${dot(t, n)}<h3 class="tp-h4">${n}</h3></span><span class="tp-sub tp-num">가동률 ${u}</span></div>${strip(170 + i, b)}</div>`).join(''))}
  </section>
</main>
<aside class="tp-panel" aria-label="알림과 서비스 요약">
  <section class="tp-sec" aria-labelledby="s-al">${secHead(`<span class="tp-row">${icon('triangle-alert')}활성 알림</span>`, { id: 's-al', cls: 'tp-h3', tools: badge('3건 발생', 'critical') })}<span class="tp-caption">최근 24시간 6건 · 최신순</span>
    <div>${alerts.map(([t, n, w, st, time]) => `<div class="tp-alert">${dot(t, st)}<div class="tp-stack"><span class="tp-h4" style="font-weight:var(--ds-font-weight-medium)">${n}</span><span class="tp-caption">${w}</span></div><div class="tp-alert__end">${badge(st, t === 'positive' ? 'positive' : t === 'warning' ? 'warning' : 'critical')}<span class="tp-caption">${time}</span></div></div>`).join('')}</div>
  </section>
  <section class="tp-sec" aria-labelledby="s-br">${secHead(`<span class="tp-row">${icon('monitor')}서비스별 현황</span>`, { id: 's-br', cls: 'tp-h3', tools: badge('10') })}<span class="tp-caption">운영 · 모든 지역</span>
    <div>${brk.map(([t, n, w, p, e]) => `<div class="tp-alert">${dot(t, n)}<div class="tp-stack"><span class="tp-h4" style="font-weight:var(--ds-font-weight-medium)">${n}</span><span class="tp-caption">${w}</span></div><div class="tp-alert__end"><span class="tp-num tp-h4">p99 ${p}</span>${badge(e, t === 'positive' ? 'positive' : t === 'warning' ? 'warning' : 'critical')}</div></div>`).join('')}</div>
  </section>
</aside>
</div>
</div>`;
  return { slug: 'dashboard-alert-rail', en: 'Service Monitoring Dashboard', name: '서비스 모니터링 대시보드', group: 'Dashboard', desc: '서비스 상태를 지켜보다가 문제가 생기면 바로 알아차리게 돕는 모니터링 화면입니다. 알림은 오른쪽에 따로 모아 둡니다.', css, body };
};

export const templates = [analytics, progressDash, monitoring].map((f) => f());

import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, dot, card, head, secHead, table, segmented, selField, avatar, link, divider, search, sw, checkOnly, tabs, select, breadcrumbs, tablePager, codeblock, input, field, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;
const won = (n) => n.toLocaleString() + '원';

const TABLE_CSS = `
  .tp-grouprow__in { display: flex; align-items: center; gap: var(--ybm-space-x2); font-weight: var(--ybm-font-weight-semibold); }
  .tp-tpage { gap: var(--ybm-space-x5); padding-top: var(--ybm-space-x6); }
  .tp-tpage__head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ybm-space-x3) var(--ybm-space-x4); }
`;
const grow = (cols, label, count, extra = '') => `<tr class="ds-table__group"><td colspan="${cols}"><span class="tp-grouprow__in"><button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="true" aria-label="${esc(label)} 접기">${icon('chevron-down', 'sm')}</button>${label}${count !== '' ? badge(String(count)) : ''}${extra}</span></td></tr>`;
const trs = (rows) => rows.map((r) => `<tr>${r.map((c) => `<td${c && c.startsWith && c.startsWith('@end') ? ' data-align="end"' : ''}>${c && c.startsWith && c.startsWith('@end') ? c.slice(4) : c}</td>`).join('')}</tr>`).join('');
const thead = (cols) => `<thead><tr>${cols.map((c) => { const [t, a] = Array.isArray(c) ? c : [c]; return `<th scope="col"${a ? ` data-align="${a}"` : ''}>${t}</th>`; }).join('')}</tr></thead>`;

/* 1. 접히는 표 묶음 ---------------------------------------------- */
const collapsible = () => {
  const groups = [
    ['예금·적금', 4, '1억 2,480만원', ['계좌', '은행', ['잔액', 'end'], ['금리', 'end'], '최근 거래'], [['생활비 통장', '가 은행 ··· 4821', '@end8,240,000원', '@end0.1%', '오늘'], ['비상금 통장', '나 은행 ··· 1093', '@end21,560,000원', '@end2.8%', '어제'], ['청약 저축', '가 은행 ··· 7730', '@end18,000,000원', '@end2.3%', '10.25'], ['정기 예금', '다 은행 ··· 5512', '@end77,000,000원', '@end3.4%', '10.02']]],
    ['투자', 3, '4억 6,120만원', ['계좌', '증권사', ['평가액', 'end'], ['수익률', 'end'], '최근 거래'], [['국내 주식', '라 증권 ··· 2209', '@end184,200,000원', '@end' + badge('+12.4%', 'positive'), '오늘'], ['해외 주식', '라 증권 ··· 2210', '@end231,600,000원', '@end' + badge('+18.9%', 'positive'), '어제'], ['연금 저축', '마 증권 ··· 8814', '@end45,400,000원', '@end' + badge('-1.2%', 'critical'), '10.29']]],
    ['연금', 2, '2억 1,840만원', ['계좌', '운용사', ['적립금', 'end'], ['올해 납입', 'end'], '최근 거래'], [['퇴직 연금 DC', '바 생명 ··· 0042', '@end162,400,000원', '@end7,200,000원', '10.25'], ['개인 IRP', '라 증권 ··· 3301', '@end56,000,000원', '@end9,000,000원', '10.10']]],
    ['카드', 2, '-312만원', ['카드', '카드사', ['이번 달 사용', 'end'], ['결제일', 'end'], '최근 거래'], [['생활 카드', '가 카드 ··· 9921', '@end1,840,000원', '@end15일', '오늘'], ['출장 카드', '사 카드 ··· 4410', '@end1,280,000원', '@end25일', '10.30']]],
    ['대출', 2, '-1억 3,600만원', ['대출', '은행', ['남은 원금', 'end'], ['금리', 'end'], '다음 상환'], [['주택 담보 대출', '가 은행 ··· 6620', '@end128,000,000원', '@end3.9%', '11.15'], ['신용 대출', '나 은행 ··· 2281', '@end8,000,000원', '@end5.2%', '11.20']]],
  ];
  const css = TABLE_CSS + `
  .tp-coll { border-radius: inherit; }
  .tp-coll > summary { display: flex; align-items: center; gap: var(--ybm-space-x3); padding: var(--ybm-space-x1) 0 var(--ybm-space-x3); list-style: none; cursor: pointer; }
  .tp-coll > summary::-webkit-details-marker { display: none; }
  .tp-coll > summary .ds-icon { transition: transform var(--ybm-duration-fast) var(--ybm-easing-standard); }
  .tp-coll:not([open]) > summary { padding-bottom: var(--ybm-space-x1); }
  .tp-coll:not([open]) > summary .ds-icon { transform: rotate(-90deg); }
  .tp-coll th:first-child { width: 48px; }
  .tp-coll__total { margin-left: auto; font-weight: var(--ybm-font-weight-semibold); font-variant-numeric: tabular-nums; }
`;
  const body = `<div class="tp-app">
${head('연결된 계좌', { sub: '13개 계좌의 순자산 7억 6,840만원', tools: `${btn('계좌 연결', { variant: 'neutralSolid', ic: 'plus' })}${segmented(['1개월', '3개월', '6개월', '1년', '전체'], 2, '기간')}` })}
<main class="tp-content" style="gap: var(--ybm-space-x3)">
  ${groups.map(([g, n, tot, cols, rows], gi) => card(`<details class="tp-coll"${gi < 3 ? ' open' : ''}><summary>${icon('chevron-down', 'sm')}<h2 class="tp-h3">${g}</h2>${badge(n + '개')}<span class="tp-coll__total">${tot}</span></summary><div class="ds-table-wrap"><table class="ds-table" data-density="compact">${thead(['', ...cols])}<tbody>${rows.map((r) => `<tr><td style="width:40px"><button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="false" aria-label="${esc(r[0])} 자세히">${icon('chevron-right', 'sm')}</button></td>${r.map((c, i) => `<td${Array.isArray(cols[i]) ? ` data-align="${cols[i][1]}"` : ''}>${i === 0 ? `<span class="ds-table__stack"><span>${c}</span><span>${r[1]}</span></span>`.replace(`<span>${r[1]}</span></span>`, `<span>${r[1].split(' ··· ')[1] ? '··· ' + r[1].split(' ··· ')[1] : ''}</span></span>`) : (i === 1 ? String(c).split(' ··· ')[0] : String(c).replace('@end', ''))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`)).join('')}
</main>
</div>`;
  return { slug: 'table-collapsible', en: 'Collapsible Table', name: '접히는 표 묶음', group: 'Table', desc: '열 구성이 다른 표 여러 개를 접고 펼 수 있는 묶음으로 나눠 담은 화면입니다. 표 하나로 합치면 빈칸이 많아질 때 씁니다.', css, body };
};

/* 2. 필터 표 ----------------------------------------------------- */
const filter = () => {
  const groups = [['강남점', [['SJ-2139', '제빙기 작동 안 함', '김도윤', ['예정', 'informative'], ['critical', '긴급'], '11.13 오후 1:42'], ['SJ-2141', '주방 후드 소음', '이서연', ['진행', 'brand'], ['warning', '높음'], '11.13 오후 3:10'], ['SJ-2150', '냉장고 온도 경보', '김도윤', ['예정', 'informative'], ['critical', '긴급'], '11.14 오전 9:00']]], ['판교점', [['SJ-2102', '출입문 센서 교체', '박지후', ['완료', 'positive'], ['neutral', '보통'], '11.10 오전 11:20'], ['SJ-2118', '조명 일부 깜빡임', '최하은', ['진행', 'brand'], ['neutral', '보통'], '11.12 오후 2:30'], ['SJ-2133', '에어컨 필터 청소', '박지후', ['대기', 'neutral'], ['neutral', '낮음'], '11.15 오전 10:00']]], ['성수점', [['SJ-2097', '배수구 막힘', '정민재', ['완료', 'positive'], ['warning', '높음'], '11.09 오후 4:05'], ['SJ-2126', '키오스크 결제 오류', '한지아', ['진행', 'brand'], ['critical', '긴급'], '11.13 오전 8:40']]]];
  const css = TABLE_CSS + `
  .tp-ftable th:nth-child(2) { width: 40%; }
`;
  const body = `<div class="tp-app">
<main class="tp-content tp-tpage" aria-label="현장 작업">
  <header class="tp-tpage__head"><div class="tp-stack" style="gap: var(--ybm-space-x1_5)"><h1 class="tp-h1">현장 작업</h1><p class="tp-sub">지점 3곳의 수리와 점검 작업을 한곳에서 봐요.</p></div><div class="tp-row">${btn('내보내기', { ic: 'download' })}${btn('작업 만들기', { variant: 'neutralSolid', ic: 'plus' })}</div></header>
  <div class="tp-stack" style="gap: var(--ybm-space-x3)">
    ${K.chiptabs(['전체 55', '예정 18', '진행 21', '완료 12', '대기 4'], 0, '상태')}
    <div class="tp-ttools"><span class="tp-sub">작업 ${T('55')}개 · ${link('조건 지우기')}</span><div class="tp-ttools__end">${K.even(select('모든 우선순위', { aria: '우선순위' }) + select('모든 담당자', { aria: '담당자' }) + select('지점 3곳', { aria: '지점' }) + select('이번 주', { aria: '기간' }) + search('q', '작업 찾기'))}</div></div>
  </div>
  <div class="ds-table-wrap"><table class="ds-table tp-ftable">${thead([checkOnly('모든 행 선택'), '작업', '담당자', '상태', '우선순위', ['일정', 'end']])}<tbody>${groups.map(([g, rows]) => grow(6, g, rows.length) + rows.map(([id, n, who, [st, tn], [pt, pl], when]) => `<tr><td>${checkOnly(id + ' ' + n + ' 선택')}</td><td><span class="ds-table__stack"><span>${n}</span><span>${id}</span></span></td><td><span class="tp-row">${avatar(who)}${who}</span></td><td>${badge(st, tn)}</td><td><span class="tp-row">${dot(pt, pl)}${pl}</span></td><td data-align="end">${T(when)}</td></tr>`).join('')).join('')}</tbody></table></div>
  <div class="tp-tfoot">${K.pagination(1, 6)}</div>
</main>
</div>`;
  return { slug: 'table-filter', en: 'Filterable Table', name: '필터 표', group: 'Table', desc: '검색과 여러 조건으로 원하는 행만 걸러 보는 표입니다. 자주 쓰는 조건은 보기로 저장하고, 행은 지점별로 묶어 보여 줍니다.', css, body };
};

/* 3. 묶음 표 ----------------------------------------------------- */
const grouped = () => {
  const groups = [['진행 중', 'brand', [['T-2350', ['결제'], '간편 결제 연동 2차', '7.03', '7.18', '와이비엠'], ['T-2351', ['앱'], '푸시 알림 설정 화면', '7.05', '7.20', '이준호'], ['T-2355', ['웹', '디자인'], '강좌 상세 리뉴얼', '7.08', '7.25', '박하린']]], ['할 일', 'informative', [['T-2360', ['결제'], '환불 사유 선택 추가', '—', '7.30', '최민준'], ['T-2362', ['앱'], '오프라인 저장 용량 표시', '—', '8.02', '정다은'], ['T-2363', ['데이터'], '주간 리포트 자동 발송', '—', '8.05', '한지우'], ['T-2366', ['웹'], '검색 결과 정렬 옵션', '—', '8.09', '와이비엠']]], ['백로그', 'neutral', [['T-2370', ['기타'], '처음 오신 분 안내 투어', '—', '—', '이준호'], ['T-2371', ['앱'], '다크 모드 색 점검', '—', '—', '박하린']]]];
  const css = TABLE_CSS + `
  .tp-gtable th:nth-child(2) { width: 44%; }
`;
  const n = groups.reduce((a, g) => a + g[2].length, 0);
  const body = `<div class="tp-app">
<main class="tp-content tp-tpage" aria-label="모든 이슈">
  <header class="tp-tpage__head"><div class="tp-stack" style="gap: var(--ybm-space-x1_5)"><h1 class="tp-h1">모든 이슈</h1><p class="tp-sub">이번 분기 이슈를 상태별로 묶어 봐요.</p></div>${btn('새 이슈', { variant: 'neutralSolid', ic: 'plus' })}</header>
  <div class="tp-stack" style="gap: var(--ybm-space-x3)">
    ${K.chiptabs(['전체 ' + n, ...groups.map(([g, , rows]) => g + ' ' + rows.length)], 0, '상태')}
    <div class="tp-ttools"><span class="tp-sub">이슈 ${T(String(n))}개</span><div class="tp-ttools__end">${K.even(select('모든 담당자', { aria: '담당자' }) + select('마감 빠른 순', { aria: '정렬' }) + search('q', '이슈 찾기'))}</div></div>
  </div>
  <div class="ds-table-wrap"><table class="ds-table tp-gtable">${thead(['번호', '제목', '담당', '시작', '마감', '<span class="tp-sr">동작</span>'])}<tbody>${groups.map(([g, tone, rows]) => grow(6, `${dot(tone)}${g}`, rows.length) + rows.map(([id, labels, t, st, d, who]) => `<tr><td>${T(id)}</td><td><span class="tp-row">${t}${labels.map((l) => badge(l)).join('')}</span></td><td><span class="tp-row">${avatar(who)}${who}</span></td><td>${T(st)}</td><td>${T(d)}</td><td data-align="end">${iconBtn('ellipsis', t + ' 동작')}</td></tr>`).join('')).join('')}</tbody></table></div>
</main>
</div>`;
  return { slug: 'table-grouped', en: 'Grouped Table', name: '묶음 표', group: 'Table', desc: '행을 상태별 묶음으로 나누고 묶음마다 개수를 붙인 표입니다. 긴 목록을 몇 덩어리로 나눠 접고 펴며 읽습니다.', css, body };
};

/* 4. 받은함 표 --------------------------------------------------- */
const inbox = () => {
  const rows = [[1, '와이비엠', '결제 페이지가 일부 해외 카드에서 오류가 나요', '오전 9:52', 1], [1, '이준호', '11월 단체 수강 견적 다시 부탁드려요', '오전 9:10', 0], [1, '박하린', '강의 영상 자막 싱크가 맞지 않아요', '오전 8:47', 1], [0, '최민준', '모의고사 점수 반영 문의', '어제', 0], [0, '정다은', '세금 계산서 발행 요청', '어제', 1], [0, '한지우', '앱에서 로그인이 자꾸 풀려요', '10.30', 0], [0, '오세린', '수강 기간 연장 가능한가요?', '10.29', 0], [0, '윤도현', '기업 관리자 권한 추가', '10.28', 1], [0, '서지민', '교재 배송 주소 변경', '10.27', 0]];
  const css = TABLE_CSS + `
  .tp-inbox { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); min-height: 0; }
  @media (min-width: 1024px) { .tp-inbox { grid-template-columns: minmax(0, 1fr) 8px minmax(0, 1.1fr); } }
  .tp-unread { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--ybm-color-bg-brand-solid); }
  .tp-inbox__row { display: flex; flex-direction: column; }
  .tp-inbox__row b { font-weight: var(--ybm-font-weight-semibold); }
  .tp-handle { display: none; place-items: center; cursor: col-resize; box-shadow: inset 1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-handle::after { content: ""; width: 4px; height: 32px; border-radius: 2px; background: var(--ybm-color-stroke-neutral-weak); }
  @media (min-width: 1024px) { .tp-handle { display: grid; } }
  .tp-read { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x5) var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  @media (min-width: 1024px) { .tp-read { padding: var(--ybm-space-x6); box-shadow: none; } }
  .tp-msg { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
`;
  const msgs = [['와이비엠', '오전 9:21', '안녕하세요, 해외 발급 카드로 결제하면 마지막 단계에서 "결제를 완료하지 못했어요"가 떠요. 국내 카드는 괜찮아요.', 0], ['상담원 이민지', '오전 9:30', '불편을 드려 죄송해요. 결제 대행사에 확인을 요청했어요. 사용하신 카드 종류를 알려 주실 수 있을까요?', 0], ['와이비엠', '오전 9:44', '해외 발급 비자 카드예요. 두 장 모두 같은 오류가 났어요.', 0], ['상담원 이민지', '오전 9:52', '확인했어요. 해외 카드 3D 인증 단계에서 오류가 나는 것으로 보여요. 오늘 오후까지 고친 뒤 다시 안내드릴게요.', 1]];
  const body = `<div class="tp-app" style="height: 100vh">
<header class="tp-head" style="flex-direction: column; align-items: stretch; padding-bottom: 0">
  <div class="tp-between"><div class="tp-head__texts"><h1 class="tp-h1">받은함</h1><p class="tp-sub">대화 9개 중 3개 읽지 않음</p></div><div class="tp-row">${btn('필터', { ic: 'funnel' })}${btn('새 메시지', { variant: 'neutralSolid', ic: 'square-pen' })}</div></div>
  ${tabs(['전체', '읽지 않음', '별표', '보관함'], 0, '받은함 탭')}
</header>
<div class="tp-inbox">
  <div class="tp-inbox__list" style="overflow:auto"><div class="ds-table-wrap"><table class="ds-table" data-density="compact">${thead(['<span class="tp-sr">상태</span>', '대화', ['받은 시간', 'end']])}<tbody>${rows.map(([u, who, s, t, att], i) => `<tr data-interactive${i === 0 ? ' aria-selected="true"' : ''}><td style="width:28px">${u ? '<span class="tp-unread" role="img" aria-label="읽지 않음"></span>' : ''}</td><td><span class="tp-inbox__row">${u ? `<b>${who}</b><b>${s}</b>` : `<span>${who}</span><span class="tp-sub">${s}</span>`}</span></td><td data-align="end"><span class="tp-row" style="justify-content:flex-end">${att ? icon('paperclip', 'sm') : ''}${T(t)}</span></td></tr>`).join('')}</tbody></table></div></div>
  <div class="tp-handle" role="separator" aria-label="대화 창 크기 조절" aria-orientation="vertical"></div>
  <aside class="tp-read" aria-label="대화">
    <div class="tp-between"><h2 class="tp-h3">결제 페이지가 일부 해외 카드에서 오류가 나요</h2><div class="tp-row">${iconBtn('archive', '보관')}${iconBtn('folder-input', '폴더로 옮기기')}${iconBtn('trash', '삭제')}${iconBtn('x', '대화 닫기')}</div></div>
    <div class="tp-row" style="flex-wrap: wrap">${badge('긴급', 'critical')}${badge('결제', 'brand')}${badge('해외 카드')}${badge('답변 대기', 'warning')}</div>
    <div>${K.accordion(msgs.map(([w, t, d, open]) => [`<span class="tp-row">${avatar(w)}<b>${w}</b><span class="tp-caption">${t}</span></span>`, `<p class="tp-sub">${d}</p>`, open]), '')}</div>
    <div class="tp-row">${btn('답장', { variant: 'neutralSolid', ic: 'corner-down-right' })}${btn('전달', { ic: 'arrow-right' })}</div>
  </aside>
</div>
</div>`;
  return { slug: 'table-inbox', en: 'Inbox Table', name: '받은함 표', group: 'Table', desc: '왼쪽 목록에서 고른 항목을 오른쪽에서 바로 읽는 받은함입니다. 가운데 경계를 끌어 두 칸 크기를 바꾸고, 좁은 화면에서는 위아래로 쌓입니다.', css, body };
};

/* 5. 검색 표 (청구서) ------------------------------------------- */
const searchable = () => {
  const meta = [['청구 대상', '가 커피 주식회사'], ['청구일', '2026.10.31'], ['마감일', '2026.11.30'], ['상태', badge('미결제', 'warning')], ['담당자', '와이비엠'], ['결제 조건', '말일 기준 30일'], ['통화', 'KRW'], ['청구서 번호', 'INV-2043']];
  const items = [['요구 사항 워크숍', '기획', '시간제', 12, 150000], ['사용자 인터뷰 진행', '리서치', '시간제', 16, 120000], ['정보 구조 설계', '기획', '고정', 1, 2400000], ['디자인 시스템 정리', '디자인', '고정', 1, 4800000], ['주요 화면 시안', '디자인', '시간제', 64, 130000], ['프로토타입 제작', '디자인', '시간제', 24, 130000], ['접근성 점검', '품질', '고정', 1, 1600000], ['프론트엔드 개발', '개발', '시간제', 120, 140000], ['결제 연동', '개발', '시간제', 36, 160000], ['관리자 화면', '개발', '시간제', 48, 140000], ['QA 테스트', '품질', '시간제', 40, 90000], ['배포와 인수인계', '운영', '고정', 1, 1200000]];
  const sub = items.reduce((a, [, , , q, p]) => a + q * p, 0), tax = Math.round(sub * 0.1);
  const css = TABLE_CSS + `
  .tp-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4) var(--ybm-space-x6); margin: 0; }
  @media (min-width: 1024px) { .tp-meta { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .tp-meta dt { color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); }
  .tp-meta dd { margin: 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); font-weight: var(--ybm-font-weight-medium); }
  .tp-th { display: inline-flex; align-items: center; gap: var(--ybm-space-x1); }
  .tp-totals { display: flex; flex-direction: column; gap: var(--ybm-space-x2); width: min(100%, 360px); margin-left: auto; }
  .tp-totals hr { margin: 0; }
`;
  const th = (t, a) => [`<span class="tp-th">${t}${iconBtn('funnel', t + ' 거르기', { size: 'xsmall' })}</span>`, a];
  const body = `<div class="tp-app">
<main class="tp-content">
  <div class="tp-stack" style="gap: var(--ybm-space-x5)">
    <div class="tp-between"><h1 class="tp-h1">청구서 INV-2043</h1>${btn('PDF 받기', { ic: 'download' })}</div>
    <dl class="tp-meta">${meta.map(([k, v]) => `<div class="tp-stack"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </div>
  <div class="tp-between" style="align-items: flex-end">${segmented(['전체', '시간제', '고정'], 0, '청구 방식')}<div style="width: min(100%, 320px)">${field('q', '항목 찾기', search('q', '찾기…'))}</div></div>
  <div class="tp-stack" style="gap: var(--ybm-space-x4)">
    ${table([th('항목'), th('분류'), th('방식'), [...th('수량', 'end')], [...th('단가', 'end')], ['금액', 'end']], items.map(([n, c, m, q, p]) => [n, c, badge(m, m === '고정' ? 'informative' : 'neutral'), T(q), T(won(p)), T(won(q * p))]))}
    <div class="tp-totals">${divider()}<div class="tp-between"><span class="tp-sub">소계</span>${T(won(sub))}</div><div class="tp-between"><span class="tp-sub">부가세 (10%)</span>${T(won(tax))}</div>${divider()}<div class="tp-between"><b>청구 합계</b><b class="tp-num">${won(sub + tax)}</b></div>${divider()}</div>
  </div>
</main>
</div>`;
  return { slug: 'table-page', en: 'Searchable Table', name: '검색 표', group: 'Table', desc: '청구서 한 건의 정보 아래에 항목 표를 둔 화면입니다. 검색, 보기 전환, 열별 필터로 항목을 좁혀 봅니다.', css, body };
};

/* 6. 트리 표 (저장소) ------------------------------------------- */
const tree = () => {
  const rows = [[0, 'f', '.github', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전', 1], [1, 'f', 'workflows', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전', 1], [2, 'd', 'ci.yml', 'ci: 패키지 캐시를 실행 사이에 재사용 (#412)', '3시간 전'], [2, 'd', 'release.yml', 'chore: 배포 이름 규칙 바꿈', '2주 전'], [0, 'f', 'docs', 'docs: 도형 묶기 예제 추가', '어제', 0], [0, 'f', 'src', 'feat: 선택 상자 크기 조절 손잡이', '5시간 전', 1], [1, 'f', 'shapes', 'feat: 둥근 사각형 지원', '2일 전', 0], [1, 'd', 'canvas.ts', 'feat: 선택 상자 크기 조절 손잡이', '5시간 전'], [1, 'd', 'index.ts', 'refactor: 내보내기 정리', '1주 전'], [0, 'f', 'tests', 'test: 확대 축소 경계 값', '3일 전', 0], [0, 'd', '.gitignore', 'chore: 처음 만듦', '8개월 전'], [0, 'd', 'LICENSE', 'chore: 처음 만듦', '8개월 전'], [0, 'd', 'package.json', 'chore: 버전 1.4.0', '4일 전'], [0, 'd', 'README.md', 'docs: 설치 방법 정리', '어제']];
  const css = TABLE_CSS + `
  .tp-tree-name { display: flex; align-items: center; gap: var(--ybm-space-x1); padding-left: calc(var(--d) * 20px); }
  .tp-tree-name .tp-spacer { width: 20px; }
  .tp-tree-name .ds-icon { color: var(--ybm-color-fg-neutral-subtle); }
  .tp-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); }
  .tp-toolbar .tp-grow { flex: 1 1 200px; display: flex; justify-content: flex-end; gap: var(--ybm-space-x2); flex-wrap: wrap; }
  .tp-about dl { display: grid; grid-template-columns: auto 1fr; gap: var(--ybm-space-x2) var(--ybm-space-x4); margin: 0; }
  .tp-about dt { color: var(--ybm-color-fg-neutral-muted); }
  .tp-about dd { margin: 0; }
  .tp-md h3 { margin: 0 0 var(--ybm-space-x2); }
  .tp-md h4 { margin: var(--ybm-space-x5) 0 var(--ybm-space-x2); }
`;
  const body = `<div class="tp-app">
<header class="tp-head" style="align-items: center">
  <div class="tp-row" style="flex-wrap: wrap"><h1 class="tp-h1">canvas-editor</h1>${breadcrumbs(['canvas-editor'])}${badge('공개')}</div>
  <div class="tp-row">${btn('지켜보기', { ic: 'eye' })}${btn('포크 12', { ic: 'git-branch' })}${btn('별 248', { ic: 'star' })}${btn('코드', { variant: 'neutralSolid', ic: 'code', icEnd: 'chevron-down' })}</div>
</header>
<div class="tp-body tp-body--panel">
<main class="tp-content" style="gap: var(--ybm-space-x4)">
  <div class="tp-toolbar">${K.even(`${btn('main', { ic: 'git-branch', icEnd: 'chevron-down' })}${btn('브랜치 8', { variant: 'ghost', ic: 'git-pull-request' })}${btn('태그 14', { variant: 'ghost', ic: 'tag' })}<div class="tp-grow"><div style="width: min(100%, 240px)">${input('goto', 'type="search" placeholder="파일로 이동" aria-label="파일로 이동"', { size: 'small', ic: 'search' })}</div>${btn('파일 추가', { icEnd: 'chevron-down' })}${btn('기록 1,284', { variant: 'ghost', ic: 'rotate-ccw' })}</div>`)}</div>
  ${card(`<div class="ds-table-wrap"><table class="ds-table" data-density="compact">${thead([`<span class="tp-row">${iconBtn('chevrons-up-down', '모든 행 펼치기', { size: 'xsmall' })}이름</span>`, '마지막 변경', ['시간', 'end']])}<tbody>${rows.map(([d, k, n, m, t, open]) => `<tr><td><span class="tp-tree-name" style="--d:${d}">${k === 'f' ? `<button type="button" class="ds-btn tp-caret" data-variant="ghost" data-size="xsmall" data-layout="iconOnly" aria-expanded="${!!open}" aria-label="${n} ${open ? '접기' : '펼치기'}">${icon(open ? 'chevron-down' : 'chevron-right', 'sm')}</button>${icon(open ? 'folder-open' : 'folder', 'sm')}` : `<span class="tp-spacer"></span>${icon('file', 'sm')}`}${link(n)}</span></td><td class="tp-sub">${m}</td><td data-align="end">${T(t)}</td></tr>`).join('')}</tbody></table></div>`, { attrs: 'style="padding: 0; overflow: hidden"' })}
  ${card(`${tabs(['README', '라이선스', '기여 안내'], 0, '문서')}<div class="ds-markdown tp-md"><h3>canvas-editor</h3><p>웹 페이지에 넣어 쓰는 작은 벡터 캔버스예요. 도형을 그리고, 묶고, 크기를 바꾸고, 이미지로 내보낼 수 있어요.</p><h4>설치</h4>${codeblock('bash', 'npm install canvas-editor')}<h4>사용</h4>${codeblock('ts', "import { Canvas } from 'canvas-editor';\n\nconst canvas = new Canvas('#stage', { width: 800, height: 600 });\ncanvas.add({ type: 'rect', x: 40, y: 40, w: 120, h: 80 });")}</div>`)}
</main>
<aside class="tp-panel tp-about" aria-labelledby="s-about">
  <h2 class="tp-h3" id="s-about">정보</h2>
  <p class="tp-sub">웹 페이지에 넣어 쓰는 작은 벡터 캔버스. 도형 그리기, 묶기, 내보내기.</p>
  <div class="tp-row" style="flex-wrap: wrap">${['canvas', 'vector', 'editor', 'typescript'].map((t) => badge(t, 'brand')).join('')}</div>
  <dl><dt>별</dt><dd class="tp-num">248</dd><dt>지켜보는 사람</dt><dd class="tp-num">19</dd><dt>포크</dt><dd class="tp-num">12</dd><dt>최근 릴리스</dt><dd>v1.4.0 · 4일 전</dd><dt>라이선스</dt><dd>MIT</dd></dl>
  ${divider()}
  <h3 class="tp-h4">기여한 사람 8명</h3>${K.avatars(['와이비엠', '이준호', '박하린', '최민준', '정다은'], 24, 3)}
</aside>
</div>
</div>`;
  return { slug: 'table-tree', en: 'Tree Table', name: '트리 표', group: 'Table', desc: '상위 행을 펼치면 하위 행이 나오는 계층 표입니다. 코드 저장소처럼 폴더 구조를 보여 주고, 옆에 저장소 정보를 둡니다.', css, body };
};

export const templates = [collapsible, filter, grouped, inbox, searchable, tree].map((f) => f());

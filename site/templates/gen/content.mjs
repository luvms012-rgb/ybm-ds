import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, card, head, secHead, search, divider, thumb, link, tabs, table, avatar, avatars, codeblock, list, listItem, select, field, checkbox, progress, segmented, accordion, chiptabs, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;

const DOC_CSS = `
  .tp-doc { display: flex; flex-direction: column; gap: var(--ybm-space-x8); width: min(100%, 880px); margin-inline: auto; }
  .tp-doc-title { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  .tp-doc p { font-size: var(--ybm-font-size-t05); line-height: 28px; }
  .tp-demo { display: grid; place-items: center; min-height: 180px; padding: var(--ybm-space-x6); border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-neutral-subtle); }
  .tp-demo__row { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ybm-space-x3); }
`;
let TN = 0;
let BK = 0;
const tileCard = (t, d) => `<article class="ds-card tp-card tp-tile" data-size="small">${thumb('16:9', '', K.photo('mix', TN++, 640), 'md')}<div class="tp-stack"><h3 class="tp-h4">${t}</h3><p class="tp-sub">${d}</p></div></article>`;

/* 1. 카드 그리드 (라이브러리) ---------------------------------- */
const library = () => {
  const groups = [['레이아웃', [['Card', '안쪽 여백, 테두리, 그림자를 고를 수 있는 담는 상자'], ['Divider', '내용 사이를 가로나 세로로 나누는 선'], ['Image Frame', '정해진 비율로 사진을 자르는 틀'], ['Side Panel', '화면 옆에서 밀려 나오는 패널'], ['Bottom Sheet', '모바일 아래에서 올라오는 시트'], ['Scroll Fog', '스크롤 끝을 흐리게 알려 주는 그늘'], ['Carousel', '옆으로 넘겨 보는 카드 줄']]], ['폼', [['Checkbox', '여러 개를 고르는 상자, 일부 선택 상태 포함'], ['Radio Group', '하나만 고르는 동그라미 묶음'], ['Switch', '켜고 끄는 스위치'], ['Text Field', '한 줄 입력칸'], ['Select', '목록에서 하나 고르기'], ['Date Picker', '달력에서 날짜 고르기'], ['File Attach', '파일 끌어 놓기와 목록']]], ['내비게이션', [['Breadcrumbs', '지금 위치를 보여 주는 경로'], ['Tabs', '같은 화면 안에서 내용 바꾸기'], ['Pagination', '여러 쪽으로 나눈 목록 넘기기'], ['Side Navigation', '왼쪽 세로 메뉴'], ['Top App Bar', '모바일 맨 위 막대'], ['Bottom Navigation', '모바일 아래 탭'], ['Stepper', '단계 진행 표시']]], ['피드백', [['Badge', '상태나 개수를 짧게 알리는 표'], ['Callout', '눈에 띄게 알리는 안내 상자'], ['Snackbar', '잠깐 떴다 사라지는 알림'], ['Progress', '얼마나 진행됐는지 막대로'], ['Skeleton', '불러오는 동안의 자리'], ['Empty', '내용이 없을 때의 안내'], ['Help Bubble', '처음 쓰는 사람을 위한 말풍선']]]];
  const css = `
  .tp-libbar { display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--ybm-space-x3); }
  .tp-libbar .tp-q { flex: 1 1 280px; max-width: 360px; }
  .tp-libbar .ds-chiptabs { padding-inline: 0; flex: 1 1 auto; }
`;
  const body = `<div class="tp-app">
${head('라이브러리')}
<main class="tp-content">
  <div class="tp-libbar"><div class="tp-q">${field('lq', '찾기', search('lq', '찾기…'))}</div>${chiptabs(['전체', '레이아웃', '폼', '내비게이션', '피드백', '데이터', '미디어'], 0, '분류로 거르기')}${btn('최근 순', { variant: 'ghost', icEnd: 'chevron-down' })}</div>
  ${groups.map(([g, items]) => `${divider()}<section class="tp-sec" aria-labelledby="g-${esc(g)}">${secHead(g, { id: 'g-' + esc(g), sub: items.length + '개' })}<div class="tp-g4">${items.map(([t, d]) => tileCard(t, d)).join('')}</div></section>`).join('')}
</main>
</div>`;
  return { slug: 'library', en: 'Card Grid', name: '카드 그리드', group: 'Content', desc: '카드를 훑어보며 원하는 항목을 찾는 목록 화면입니다. 분류 탭으로 바로 좁혀 봅니다.', css, body };
};

/* 2. 문서 목록 (카탈로그) -------------------------------------- */
const catalog = () => {
  const sections = [['기초', [['Color', '배경, 글자, 테두리 색을 의미 이름으로 씁니다.'], ['Typography', '17단계 글자 크기와 줄 높이'], ['Spacing', '4px 단위 여백'], ['Shape', '둥글기 단계와 곡률 노브'], ['Elevation', '떠 있는 높이별 그림자'], ['Motion', '움직임 시간과 가속 곡선'], ['Icons', 'Lucide 선 아이콘']]], ['입력', [['Action Button', '누르면 일이 일어나는 버튼'], ['Text Field', '한 줄과 여러 줄 입력'], ['Select', '목록에서 고르기'], ['Checkbox', '여러 개 고르기'], ['Switch', '켜고 끄기'], ['Slider', '범위에서 값 고르기']]], ['보여 주기', [['Badge', '상태와 개수'], ['Avatar', '사람과 그룹'], ['Table', '행과 열로 정리'], ['Card', '내용을 담는 상자'], ['Chat', '대화 말풍선과 입력창']]]];
  const css = `
  .tp-cat-hero { display: flex; flex-direction: column; align-items: flex-start; gap: var(--ybm-space-x3); padding: var(--ybm-space-x8) var(--ybm-space-x6); border-radius: var(--ybm-shape-2xl); background: var(--ybm-color-bg-brand-weak); }
  .tp-cat-hero .tp-doc-title { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  .tp-cat-card { display: flex; flex-direction: column; gap: var(--ybm-space-x1); height: 100%; color: inherit; text-decoration: none; }
  a.ds-card:hover { box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-contrast); }
`;
  const body = `<div class="tp-app"><main class="tp-content">
  <div class="tp-cat-hero"><span class="tp-doc-title">YBM DS 둘러보기</span><p class="tp-sub" style="max-width: 560px">화면을 빠르게 만들 수 있도록 부품, 토큰, 템플릿을 한곳에 모았어요. 필요한 묶음을 골라 들어가세요.</p>${btn('시작하기', { variant: 'neutralSolid', icEnd: 'arrow-right' })}</div>
  ${sections.map(([s, items]) => `<section class="tp-sec" aria-labelledby="c-${esc(s)}"><h2 class="tp-h2" id="c-${esc(s)}">${s}</h2><div class="tp-g4">${items.map(([t, d]) => `<a class="ds-card tp-card" data-size="small" href="#"><span class="tp-cat-card"><span class="tp-h4">${t}</span><span class="tp-sub">${d}</span></span></a>`).join('')}</div></section>`).join('')}
</main></div>`;
  return { slug: 'documentation', en: 'Documentation Catalog', name: '문서 목록', group: 'Content', desc: '문서 사이트의 첫 화면입니다. 분류별 카드로 원하는 문서에 바로 들어갑니다.', css, body };
};

/* 3. 디자인 문서 ------------------------------------------------ */
const docDesign = () => {
  const dos = [['Do', '한 화면에는 강조 버튼을 하나만 둡니다.'], ['Do', '버튼 글은 동사로 짧게 씁니다. 예: 저장, 보내기'], ['Don\'t', '같은 줄에 강조 버튼을 여러 개 두지 않습니다.'], ['Don\'t', '아이콘만 있는 버튼에 이름(aria-label)을 빼먹지 않습니다.']];
  const props = [['variant', 'brandSolid · neutralSolid · neutralWeak · neutralOutline · ghost', 'neutralWeak'], ['size', 'xsmall · small · medium · large', 'medium'], ['width', 'fill', '—'], ['disabled', 'true · false', 'false']];
  const css = DOC_CSS + `
  .tp-ex { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-ex__bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ybm-space-x2); }
`;
  const body = `<div class="tp-app"><main class="tp-content"><article class="tp-doc">
  <header class="tp-stack" style="gap: var(--ybm-space-x2)"><h1 class="tp-doc-title">Button</h1><span class="tp-caption">2026년 10월 30일 · 오후 5:40에 고침</span></header>
  ${card(`<div class="tp-demo"><div class="tp-demo__row">${btn('저장', { variant: 'brandSolid', size: 'medium' })}${btn('취소', { size: 'medium' })}</div></div>`)}
  <section class="tp-sec"><h2 class="tp-h2">쓰는 법</h2><p>버튼은 누르면 일이 일어난다는 것을 알려 줍니다. 저장하기, 보내기, 다음으로 넘어가기처럼 화면에서 할 일을 고르게 해요.</p>
  <h3 class="tp-h3">이렇게 쓰세요</h3>${table(['구분', '내용'], dos.map(([k, v]) => [badge(k, k === 'Do' ? 'positive' : 'critical'), v]))}</section>
  ${divider()}
  <section class="tp-sec"><h2 class="tp-h2">예시</h2><p>자주 쓰는 모양, 크기, 상태를 모았어요.</p>
  ${[['의미', [['brandSolid', '강조'], ['neutralSolid', '중립 강조'], ['neutralWeak', '기본'], ['ghost', '가볍게']]], ['크기', [['neutralWeak', 'xsmall', 'xsmall'], ['neutralWeak', 'small', 'small'], ['neutralWeak', 'medium', 'medium'], ['neutralWeak', 'large', 'large']]]].map(([t, bs]) => card(`<div class="tp-ex"><div class="tp-ex__bar"><span class="tp-h4">${t}</span><div class="tp-row">${btn('코드 복사', { variant: 'ghost', ic: 'copy', size: 'xsmall' })}${btn('새 창', { variant: 'ghost', ic: 'external-link', size: 'xsmall' })}</div></div><div class="tp-demo"><div class="tp-demo__row">${bs.map(([v, l, sz]) => btn(l, { variant: v, size: sz || 'medium' })).join('')}</div></div>${tabs(['미리 보기', '코드'], 0, t + ' 보기')}<p class="tp-sub">강조 버튼은 화면에서 가장 중요한 한 가지 일에만 씁니다.</p></div>`)).join('')}</section>
  ${divider()}
  <section class="tp-sec"><h2 class="tp-h2">속성</h2>${table(['이름', '값', '기본값'], props.map(([n, v, d]) => [`<code>${n}</code>`, v, `<code>${d}</code>`]))}</section>
  <section class="tp-sec"><h2 class="tp-h2">코드</h2>${codeblock('html', '<button class="ds-btn" data-variant="brandSolid" data-size="medium">저장</button>')}</section>
</article></main></div>`;
  return { slug: 'documentation-design', en: 'Documentation Design', name: '디자인 문서', group: 'Content', desc: '설명 사이에 실제로 동작하는 예시를 넣은 디자인 문서입니다. 컴포넌트 사용법을 정리할 때 씁니다.', css, body };
};

/* 4. 기술 문서 (단계별) ---------------------------------------- */
const docTech = () => {
  const css = DOC_CSS + `
  .tp-steps-doc { display: flex; flex-direction: column; gap: var(--ybm-space-x6); }
  .tp-stepdoc { display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: var(--ybm-space-x4); }
  .tp-stepdoc__n { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--ybm-color-bg-neutral); font-weight: var(--ybm-font-weight-semibold); }
  .tp-stepdoc__b { display: flex; flex-direction: column; gap: var(--ybm-space-x3); min-width: 0; }
  .tp-ai { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-ai > .tp-between .ds-icon { color: var(--ybm-color-fg-magic); }
`;
  const steps = [['핵심 패키지 설치', '모든 프로젝트는 핵심 패키지를 설치하는 데서 시작해요.', 'bash', 'npm install @ybm/ds'], ['미리 만든 스타일 불러오기', '빌드 설정 없이 CSS 파일 하나만 불러오면 돼요.', 'html', '<link rel="stylesheet" href="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.css">'], ['첫 부품 넣기', '클래스 이름만 붙이면 DS 모양이 돼요.', 'html', '<button class="ds-btn" data-variant="brandSolid">시작하기</button>'], ['동작 붙이기', '대화상자, 탭 같은 동작이 필요하면 스크립트를 함께 불러와요.', 'html', '<script src="https://luvms012-rgb.github.io/ybm-ds/dist/ybm-ds.js" defer></script>']];
  const body = `<div class="tp-app"><main class="tp-content"><article class="tp-doc">
  <header class="tp-stack" style="gap: var(--ybm-space-x2)"><h1 class="tp-doc-title">YBM DS 시작하기</h1><span class="tp-caption">2026년 10월 30일에 고침</span></header>
  ${card(`<div class="tp-ai"><div class="tp-between"><span class="tp-row">${icon('sparkles')}<span class="tp-h4">AI에게 맡기기</span></span><div class="tp-row">${btn('복사', { ic: 'copy', size: 'xsmall' })}${iconBtn('ellipsis', '더 보기', { size: 'xsmall' })}</div></div><p class="tp-sub">"내 프로젝트에 YBM DS를 붙여 줘. 필요한 파일을 불러오고 첫 화면을 DS 부품으로 바꿔 줘."</p></div>`)}
  <section class="tp-sec"><h2 class="tp-h2">준비물</h2>${list(['Node.js 18 이상', '패키지 관리자 (npm, pnpm, yarn 가운데 하나)', 'HTML 파일 하나', '인터넷 연결'].map((t) => listItem(t, { prefix: icon('check', 'sm'), size: 'small' })))}</section>
  ${divider()}
  <section class="tp-sec"><h2 class="tp-h2">설치하기</h2><p>아래 순서대로 하면 5분 안에 첫 화면을 볼 수 있어요.</p>
  <div class="tp-steps-doc">${steps.map(([t, d, l, c], i) => `<div class="tp-stepdoc"><span class="tp-stepdoc__n">${i + 1}</span><div class="tp-stepdoc__b"><h3 class="tp-h3">${t}</h3><p class="tp-sub">${d}</p>${codeblock(l, c)}</div></div>`).join('')}</div></section>
  ${divider()}
  <section class="tp-sec"><h2 class="tp-h2">다음으로</h2><div class="tp-g2">${[['book-open', '부품 둘러보기', '71개 부품의 쓰는 법과 예시'], ['layout-grid', '템플릿에서 시작하기', '자주 쓰는 화면을 통째로 복사']].map(([ic, t, d]) => `<a class="ds-card tp-card" data-size="small" href="#" style="text-decoration:none;color:inherit"><span class="tp-row">${icon(ic)}<span class="tp-stack"><span class="tp-h4">${t}</span><span class="tp-sub">${d}</span></span></span></a>`).join('')}</div></section>
</article></main></div>`;
  return { slug: 'documentation-technical', en: 'Documentation Technical', name: '기술 문서', group: 'Content', desc: '단계마다 번호와 코드를 붙인 따라 하기 문서입니다. 처음부터 끝까지 순서대로 따라가게 합니다.', css, body };
};

/* 5. 주문 상세 -------------------------------------------------- */
const orderDetail = () => {
  const items = [['TOEIC 실전 모의고사 1000제', '19,000원', 2], ['단어 암기 카드', '12,000원', 1], ['오답 노트', '3,000원', 3], ['형광펜 5색 세트', '4,500원', 1], ['독서대', '28,000원', 1]];
  const acts = [['주문 접수', '와이비엠 님이 주문했어요', '10.31 오후 2:04'], ['결제 완료', '카드 결제 89,500원', '10.31 오후 2:05'], ['메모 추가', '"선물 포장 부탁드려요"', '10.31 오후 2:06'], ['재고 확인 필요', '독서대 재고 1개 남음', '10.31 오후 4:30']];
  const css = `
  .tp-od { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1024px) { .tp-od { grid-template-columns: minmax(0, 1fr) 360px; } }
  .tp-meta-line { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); }
  .tp-meta-line .tp-sep { color: var(--ybm-color-stroke-neutral-weak); }
  .tp-line { display: grid; grid-template-columns: 56px minmax(0, 1fr) auto; gap: var(--ybm-space-x3); align-items: center; padding-block: var(--ybm-space-x3); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-tl { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .tp-tl li { position: relative; display: grid; grid-template-columns: 16px minmax(0, 1fr); gap: var(--ybm-space-x3); padding-bottom: var(--ybm-space-x4); }
  .tp-tl li::before { content: ""; width: 10px; height: 10px; margin: 5px 3px 0; border-radius: 50%; background: var(--ybm-color-bg-brand-solid); }
  .tp-tl li:not(:last-child)::after { content: ""; position: absolute; left: 7px; top: 18px; bottom: 0; width: 2px; background: var(--ybm-color-stroke-neutral-muted); }
`;
  const sep = '<span class="tp-sep">·</span>';
  const body = `<div class="tp-app">
<header class="tp-head" style="flex-direction: column; align-items: stretch; padding-bottom: 0">
  <div class="tp-between" style="align-items:flex-start"><div class="tp-stack" style="gap: var(--ybm-space-x2)">${link(icon('chevron-left', 'sm') + '모든 주문')}<h1 class="tp-h1">#1001</h1><div class="tp-meta-line"><span>상품 5개</span>${sep}<span class="tp-row">${avatar('와이비엠', 20)}와이비엠</span>${sep}${badge('배송 준비 전', 'warning')}${sep}<span class="tp-row">${icon('calendar', 'sm')}2026.10.31</span>${sep}<span class="tp-row">${icon('triangle-alert', 'sm')}확인 필요</span></div></div><div class="tp-row">${btn('환불')}${btn('배송 처리', { variant: 'neutralSolid' })}</div></div>
  ${tabs(['상품', '결제', '배송', '기록'], 0, '주문 탭')}
</header>
<div class="tp-od">
  <main class="tp-content tp-wi__main">
    <section class="tp-sec">${secHead(`<span class="tp-row">상품 ${badge('배송 준비 전', 'warning')}</span>`, { tools: `${btn('송장 출력', { ic: 'printer' })}${btn('배송 처리', { variant: 'neutralSolid' })}` })}<div>${items.map(([n, p, q]) => `<div class="tp-line">${thumb('1:1', '', K.photo('book', BK++, 240))}<div class="tp-stack"><span>${n}</span><span class="tp-caption tp-num">${p} × ${q}</span></div><span class="tp-num">${(parseInt(p.replace(/\D/g, '')) * q).toLocaleString()}원</span></div>`).join('')}</div></section>
    <section class="tp-sec">${secHead('결제', { tools: badge('결제 완료', 'positive') })}${card(`${[['상품 금액', '89,000원'], ['배송비', '3,000원'], ['할인', '-2,500원']].map(([k, v]) => `<div class="tp-between"><span class="tp-sub">${k}</span>${T(v)}</div>`).join('')}${divider()}<div class="tp-between"><b>합계</b><b class="tp-num">89,500원</b></div>`)}</section>
    <section class="tp-sec">${secHead('활동')}<ol class="tp-tl">${acts.map(([t, d, w]) => `<li><div class="tp-stack"><span class="tp-h4">${t}</span><span class="tp-sub">${d}</span><span class="tp-caption">${w}</span></div></li>`).join('')}</ol></section>
  </main>
  <aside class="tp-panel">
    ${accordion([['메모', '<p class="tp-sub">이번 분기 세 번째 주문인 단골 고객이에요. 선물 포장을 좋아하세요.</p>', true], ['고객', `<div class="tp-row">${avatar('와이비엠', 42)}<div class="tp-stack"><span>와이비엠</span><span class="tp-caption">ybm@example.com · 주문 12번</span></div></div>`, true], ['배송지', '<p class="tp-sub">서울시 종로구 종로 104, 3층<br>010-1234-5678</p>', true], ['태그', `<div class="tp-row">${badge('단골', 'brand')}${badge('선물')}</div>`, false]], 'separated')}
  </aside>
</div>
</div>`;
  return { slug: 'detail-page', en: 'Order Detail', name: '주문 상세', group: 'Content', desc: '주문 한 건을 자세히 보고 처리하는 화면입니다. 상품과 진행 기록, 고객 정보를 한곳에서 확인합니다.', css, body };
};

/* 6. 상품 상세 -------------------------------------------------- */
const productDetail = () => {
  const css = `
  .tp-pd { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); width: min(100%, 1180px); margin-inline: auto; }
  @media (min-width: 1024px) { .tp-pd { grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); } }
  .tp-pd__media { display: flex; flex-direction: column; gap: var(--ybm-space-x3); }
  .tp-thumbs { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: var(--ybm-space-x2); }
  .tp-thumbs .ds-imageframe[aria-current="true"] { outline: 2px solid var(--ybm-color-stroke-neutral-contrast); outline-offset: 2px; }
  .tp-pd__info { display: flex; flex-direction: column; gap: var(--ybm-space-x5); }
  .tp-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--ybm-space-x2); }
  .tp-price b { font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); }
  .tp-price s { color: var(--ybm-color-fg-neutral-subtle); }
  .tp-opt { display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
  .tp-opt .ds-quantity { align-self: flex-start; width: 144px; }
  .tp-pd__btns { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--ybm-space-x2); }
`;
  const body = `<div class="tp-app"><main class="tp-content"><div class="tp-pd">
  <div class="tp-pd__media">${thumb('1:1', '', K.photo('book', 0, 1200), 'xl')}<div class="tp-thumbs">${Array.from({ length: 6 }, (_, i) => thumb('1:1', '', K.photo('book', i, 320), 'md').replace('aria-hidden="true"', i === 0 ? 'aria-current="true"' : 'aria-hidden="true"')).join('')}</div></div>
  <div class="tp-pd__info">
    <div class="tp-stack" style="gap: var(--ybm-space-x2)"><h1 class="tp-h1">TOEIC 실전 모의고사 1000제 세트</h1><span class="ds-rating" data-size="small" style="--ds-rating-value: 4.3" role="img" aria-label="5점 만점에 4.3점, 후기 128개"><span class="ds-rating__stars"></span><span class="ds-rating__value">4.3</span><span class="ds-rating__count">(128)</span></span></div>
    <div class="tp-price"><b class="tp-num">38,000원</b><s class="tp-num">48,000원</s>${badge('할인', 'critical')}</div>
    <p class="tp-sub">최신 출제 경향을 담은 모의고사 10회분과 해설집을 한 세트로 묶었어요. 회차마다 점수 환산표와 영역별 분석표가 들어 있어요.</p>
    <div class="tp-opt"><span class="tp-h4">구성</span>${segmented(['문제집만', '문제집 + 해설', '전체 세트'], 2, '구성', 'medium')}</div>
    <div class="tp-opt"><span class="tp-h4">음원</span>${segmented(['QR 스트리밍', 'MP3 다운로드'], 0, '음원', 'medium')}</div>
    <div class="tp-opt"><span class="tp-h4">수량</span><div class="ds-quantity"><button type="button" class="ds-quantity__btn" aria-label="수량 줄이기">${icon('minus')}</button><input class="ds-quantity__value" inputmode="numeric" value="1" aria-label="수량"><button type="button" class="ds-quantity__btn" aria-label="수량 늘리기">${icon('plus')}</button></div></div>
    <div class="tp-pd__btns">${btn('장바구니 담기', { variant: 'brandSolid', size: 'large', fill: true })}${btn('', { size: 'large', ic: 'heart', aria: '찜하기' })}</div>
    ${btn('바로 구매', { variant: 'neutralOutline', size: 'large', fill: true })}
    <div>${divider()}${accordion([['상세 정보', '<p class="tp-sub">문제집 2권, 해설집 1권, 음원 QR 카드. 판형 188×257mm, 총 920쪽.</p>', true], ['배송', '<p class="tp-sub">오후 2시 전 주문은 오늘 출발해요. 3만원 이상 무료 배송.</p>'], ['교환과 환불', '<p class="tp-sub">받은 날부터 7일 안에, 포장을 뜯지 않았으면 교환과 환불이 돼요.</p>']])}</div>
  </div>
</div></main></div>`;
  return { slug: 'product-detail', en: 'Product Detail', name: '상품 상세', group: 'Content', desc: '상품 하나를 자세히 보고 바로 구매하는 화면입니다.', css, body };
};

/* 7. 할 일 상세 ------------------------------------------------- */
const workItem = () => {
  const subs = [['지금 가입 흐름을 살펴보고 불편한 점 적기', 1, '와이비엠 · 10.20'], ['첫 화면에 샘플 강좌 미리 넣기', 1, '이준호 · 10.24'], ['가입 단계 5개를 3개로 줄이기', 0, '박하린 · 11.03까지'], ['첫 수업 안내 메일 다시 쓰기', 0, '정다은 · 11.05까지'], ['7일 뒤 활성화율 측정 대시보드', 0, '한지우 · 11.08까지']];
  const fields = [['상태', badge('진행 중', 'brand')], ['담당', `<span class="tp-row">${avatar('와이비엠', 20)}와이비엠</span>`], ['우선순위', `<span class="tp-row">${K.dot('warning')}높음</span>`], ['마감', '11월 15일'], ['스프린트', '24'], ['만든 사람', '최민준 · 10월 18일'], ['지켜보는 사람', avatars(['와이비엠', '이준호', '박하린'], 24, 2)]];
  const css = `
  .tp-wi { display: grid; flex: 1 1 auto; grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 1024px) { .tp-wi { grid-template-columns: minmax(0, 1fr) 320px; } }
  .tp-crumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ybm-space-x2); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); }
  .tp-crumb a { color: inherit; text-decoration: none; }
  .tp-wi__main { gap: var(--ybm-space-x10); }
  /* 오른쪽 속성: 선과 상자 없이 이름 / 값 두 칸 (모바일은 본문 아래) */
  .tp-wi__side { display: flex; flex-direction: column; gap: var(--ybm-space-x4); padding: var(--ybm-space-x5) var(--ybm-space-x4) var(--ybm-space-x10); }
  .tp-props { display: grid; grid-template-columns: 96px minmax(0, 1fr); align-items: center; gap: var(--ybm-space-x4) var(--ybm-space-x3); margin: 0; font-size: var(--ybm-font-size-t04); line-height: var(--ybm-line-height-t04); }
  .tp-props dt { color: var(--ybm-color-fg-neutral-subtle); }
  .tp-props dd { margin: 0; min-width: 0; }
  @media (min-width: 1024px) { .tp-wi__side { padding: var(--ybm-space-x5) var(--ybm-space-x6) var(--ybm-space-x10) 0; } }
  .tp-sub-item { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--ybm-space-x3); padding-block: var(--ybm-space-x2_5); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-files { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--ybm-space-x3); }
  .tp-file { display: flex; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x3); border-radius: var(--ybm-shape-md); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); font-size: var(--ybm-font-size-t03); }
  .tp-comment { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--ybm-space-x3); }
`;
  const body = `<div class="tp-app">
<header class="tp-head" style="flex-direction: column; align-items: stretch">
  <div class="tp-crumb"><a href="#">모든 할 일</a><span>/</span><span class="tp-num">PLT-247</span></div>
  <div class="tp-between"><h1 class="tp-h1">워크스페이스 가입 흐름 새로 만들기</h1><div class="tp-row">${iconBtn('link', '링크 복사')}${iconBtn('share', '공유')}${iconBtn('ellipsis', '더 보기')}</div></div>
</header>
<div class="tp-wi">
  <main class="tp-content">
    <section class="tp-sec"><h2 class="tp-h3">설명</h2><p class="tp-sub">계정을 만든 뒤 첫 수업을 듣기까지 빠져나가는 사람을 줄여요. 단계를 짧게 하고, 새 워크스페이스마다 샘플 강좌를 미리 넣어 바로 시작하게 해요.</p><h3 class="tp-h4">성공 기준</h3>${list(['가입 7일 뒤 활성화율 42% → 55%', '첫 수업까지 걸리는 시간 절반으로', '가입 중 이탈 30% 줄이기'].map((t) => listItem(t, { prefix: icon('check', 'sm'), size: 'small' })))}</section>
    <section class="tp-sec"><div class="tp-between"><span class="tp-row"><h2 class="tp-h3">하위 할 일</h2>${btn('추가', { variant: 'ghost', ic: 'plus', size: 'xsmall' })}</span><span class="tp-row" style="min-width: 200px"><span class="tp-caption tp-num">5개 중 2개 끝</span>${progress(40, { label: '하위 할 일 진행' })}</span></div><div>${subs.map(([t, d, m]) => `<div class="tp-sub-item">${checkbox(t, { checked: !!d })}<span class="tp-caption" style="white-space:nowrap">${m}</span></div>`).join('')}</div></section>
    <section class="tp-sec"><h2 class="tp-h3">첨부 파일</h2><div class="tp-files">${[['file-text', '가입 흐름 분석.pdf'], ['image', '새 화면 시안.png'], ['file', '측정 계획.xlsx']].map(([ic, n]) => `<span class="tp-file">${icon(ic, 'sm')}${n}</span>`).join('')}</div></section>
    <section class="tp-sec"><h2 class="tp-h3">댓글</h2>${[['이준호', '어제', '샘플 강좌는 토익 입문 1강으로 넣으면 어떨까요? 완강률이 가장 높아요.'], ['와이비엠', '2시간 전', '좋아요. 그걸로 갈게요. 디자인 시안은 금요일까지 올릴게요.']].map(([w, t, c]) => `<div class="tp-comment">${avatar(w, 24)}<div class="tp-stack"><span class="tp-row"><b>${w}</b><span class="tp-caption">${t}</span></span><p class="tp-sub">${c}</p></div></div>`).join('')}${K.textarea('cm', 'rows="3" placeholder="댓글을 남기세요" aria-label="댓글"')}<div>${btn('댓글 달기', { variant: 'neutralSolid' })}</div></section>
  </main>
  <aside class="tp-wi__side" aria-label="속성"><dl class="tp-props">${fields.map(([l, v]) => `<dt>${l}</dt><dd>${v}</dd>`).join('')}</dl></aside>
</div>
</div>`;
  return { slug: 'work-item-detail', en: 'Work Item Detail', name: '할 일 상세', group: 'Content', desc: '할 일 하나를 자세히 보며 진행 상황을 나누는 화면입니다. 하위 할 일과 댓글로 함께 일합니다.', css, body };
};

export const templates = [library, catalog, docDesign, docTech, orderDetail, productDetail, workItem].map((f) => f());

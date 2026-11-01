import * as K from './kit.mjs';
const { icon, btn, tabs, divider } = K;

const TINTS = ['brand', 'informative', 'positive', 'warning', 'magic', 'critical'];
// 사진 자리: 색이 조금씩 다른 연한 바탕 + 사진 아이콘 (실제 사진은 서비스에서 넣는다)
const ph = (ratio, i = 0, cls = '') => `<div class="ds-imageframe tp-photo${cls ? ' ' + cls : ''}"${ratio ? ` data-ratio="${ratio}"` : ''} aria-hidden="true"><span class="tp-ph" style="background: var(--ybm-color-bg-${TINTS[i % TINTS.length]}-weak)">${icon('image', 'lg')}</span></div>`;
const CSS = `
  .tp-gal { display: flex; flex-direction: column; gap: var(--ybm-space-x10); width: min(100%, 1200px); margin-inline: auto; padding: var(--ybm-space-x10) var(--ybm-space-x4) var(--ybm-space-x16); }
  @media (min-width: 768px) { .tp-gal { padding: var(--ybm-space-x16) var(--ybm-space-x6) var(--ybm-space-x24); } }
  .tp-hero-t { font-size: var(--ybm-font-size-t12); line-height: var(--ybm-line-height-t12); font-weight: var(--ybm-font-weight-bold); letter-spacing: -0.02em; }
  @media (min-width: 1024px) { .tp-hero-t { font-size: var(--ybm-font-size-t14); line-height: var(--ybm-line-height-t14); } }
  .tp-lead { font-size: var(--ybm-font-size-t06); line-height: var(--ybm-line-height-t06); color: var(--ybm-color-fg-neutral-muted); }
  .tp-center { display: flex; flex-direction: column; align-items: center; gap: var(--ybm-space-x4); text-align: center; }
  .tp-center .tp-lead { max-width: 640px; }
  .tp-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ybm-space-x2); }
  .tp-photo { border-radius: var(--ybm-shape-xl); }
  .tp-photo .ds-icon { color: var(--ybm-color-fg-neutral-subtle); }
`;
const wrap = (inner) => `<div class="tp-app"><main class="tp-gal">${inner}</main></div>`;
const heroText = (t, d, ctas = true) => `<div class="tp-center"><h1 class="tp-hero-t">${t}</h1><p class="tp-lead">${d}</p>${ctas ? `<div class="tp-ctas">${btn('시작하기', { variant: 'brandSolid', size: 'large' })}${btn('더 알아보기', { variant: 'neutralOutline', size: 'large' })}</div>` : ''}</div>`;
const T1 = '작은 기쁨, 어디서나';
const D1 = '하루를 바꾸는 데는 작은 것 하나면 충분해요. 마음에 드는 장면을 모아 두고 언제든 다시 꺼내 보세요.';
const T2 = '하루를 조금 더 즐겁게, 작은 것부터 하나씩';
const D2 = '가장 작은 것들이 가장 중요하다고 믿어요. 일상의 장면을 고르고 모아 나만의 앨범으로 만들어 보세요.';

const centered = () => ({ slug: 'centered-hero', en: 'Centered Hero', name: '가운데 히어로', group: 'Gallery', desc: '큰 제목, 짧은 설명, 버튼 두 개를 가운데 쌓고 그 아래 넓은 사진 한 장을 깐 대칭 첫 화면입니다. 양옆에 다른 것을 두지 않아요.', css: CSS, body: wrap(`${heroText(T1, D1)}${ph('21:9', 0)}`) });

const classic = () => ({ slug: 'classic-gallery', en: 'Classic Gallery', name: '바둑판 갤러리', group: 'Gallery', desc: '가운데 소개 아래에 같은 비율 사진을 바둑판처럼 늘어놓고, 탭으로 그 자리에서 거르는 갤러리입니다. 높이가 다른 벽돌형과 달리 줄이 고르게 맞아요.', css: CSS + `
  .tp-grid4 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x3); }
  @media (min-width: 1024px) { .tp-grid4 { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--ybm-space-x4); } }
  .tp-tabs-center { display: flex; justify-content: center; }
`, body: wrap(`${heroText(T2, D2, false)}<div class="tp-tabs-center">${tabs(['전체', '풍경', '도시', '사람', '음식'], 0, '사진 분류')}</div><div class="tp-grid4">${Array.from({ length: 12 }, (_, i) => ph('1:1', i)).join('')}</div>`) });

const galleryHero = () => ({ slug: 'gallery-hero', en: 'Gallery Hero', name: '사진 묶음 히어로', group: 'Gallery', desc: '가운데 제목과 버튼 아래에 넓은 사진 한 장 대신 여러 사진을 모아 깐 첫 화면입니다. 사진이 한 장면이 아니라 여러 장면으로 읽혀요.', css: CSS + `
  .tp-mosaic { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x3); }
  @media (min-width: 1024px) { .tp-mosaic { grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: 200px 200px; gap: var(--ybm-space-x4); } .tp-mosaic > :first-child { grid-column: span 2; grid-row: span 2; } .tp-mosaic .ds-imageframe { aspect-ratio: auto; height: 100%; } }
`, body: wrap(`${heroText(T1, D1)}<div class="tp-mosaic">${[0, 1, 2, 3, 4].map((i) => ph('4:3', i)).join('')}</div>`) });

const mixed = () => ({ slug: 'mixed-gallery', en: 'Mixed Gallery', name: '벽돌형 갤러리', group: 'Gallery', desc: '높이가 다른 사진을 자르지 않고 빈틈없이 쌓는 벽돌형 갤러리입니다. 사진마다 짧은 설명이 붙고, 줄이 고르지 않아 자연스러워요.', css: CSS + `
  .tp-masonry { columns: 2; column-gap: var(--ybm-space-x3); }
  @media (min-width: 1024px) { .tp-masonry { columns: 3; column-gap: var(--ybm-space-x4); } }
  .tp-masonry figure { break-inside: avoid; margin: 0 0 var(--ybm-space-x4); display: flex; flex-direction: column; gap: var(--ybm-space-x2); }
`, body: wrap(`<div class="tp-stack" style="gap: var(--ybm-space-x4)"><h1 class="tp-hero-t">${T2}</h1><p class="tp-lead" style="max-width: 720px">${D2}</p></div><div class="tp-masonry">${[['3:4', '이른 아침 바닷가'], ['1:1', '창가의 화분'], ['4:3', '골목 끝 작은 카페'], ['3:4', '비 오는 날의 우산'], ['4:3', '주말 시장 풍경'], ['1:1', '오후의 책상'], ['3:4', '가을 산책길'], ['4:3', '노을 지는 다리'], ['1:1', '손으로 만든 머그']].map(([r, c], i) => `<figure>${ph(r, i)}<figcaption class="tp-sub">${c}</figcaption></figure>`).join('')}</div>`) });

const product = () => ({ slug: 'product-gallery', en: 'Product Gallery', name: '상품 갤러리', group: 'Gallery', desc: '사진, 이름, 한 줄 설명, 가격이 있는 같은 모양 카드를 늘어놓은 상품 갤러리입니다. 거르기나 상세 화면 없이 훑어보고 고르기만 해요.', css: CSS + `
  .tp-pg-head { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x4); align-items: end; }
  @media (min-width: 1024px) { .tp-pg-head { grid-template-columns: 2fr 1fr; } .tp-pg-head > :last-child { justify-self: end; } }
  .tp-grid3 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: var(--ybm-space-x6); }
  @media (min-width: 640px) { .tp-grid3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .tp-grid3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .tp-pcard { display: flex; flex-direction: column; gap: var(--ybm-space-x2); color: inherit; text-decoration: none; }
`, body: wrap(`<div class="tp-pg-head"><div class="tp-stack" style="gap: var(--ybm-space-x3)"><h1 class="tp-hero-t">${T2}</h1><p class="tp-lead">${D2}</p></div>${btn('모두 보기', { variant: 'neutralOutline', size: 'large', icEnd: 'arrow-right' })}</div><div class="tp-grid3">${[['어디든 가는 가방', '가볍고 튼튼해서 매일 들기 좋아요.', '75,000원'], ['손으로 빚은 머그', '하나씩 모양이 조금씩 달라요.', '28,000원'], ['리넨 쿠션 커버', '빨수록 부드러워지는 천이에요.', '32,000원'], ['원목 트레이', '아침상을 차리기 좋은 크기예요.', '46,000원'], ['향초 세트', '세 가지 향을 번갈아 써 보세요.', '39,000원'], ['산책용 물병', '보온과 보냉이 모두 돼요.', '24,000원']].map(([t, d, p], i) => `<a class="tp-pcard" href="#">${ph('4:3', i)}<span class="tp-h3">${t}</span><span class="tp-sub">${d}</span><span class="tp-h4 tp-num">${p}</span></a>`).join('')}</div>`) });

const side = () => ({ slug: 'side-gallery', en: 'Side Gallery', name: '옆 갤러리', group: 'Gallery', desc: '한쪽에 제목·설명·링크를 두고 반대쪽에 사진 묶음을 붙인 비대칭 구역입니다. 일부러 균형을 깨서 가운데 정렬 히어로와 다르게 보여요.', css: CSS + `
  .tp-side { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ybm-space-x8); align-items: center; }
  @media (min-width: 1024px) { .tp-side { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: var(--ybm-space-x12); } }
  .tp-eyebrow { font-size: var(--ybm-font-size-t03); font-weight: var(--ybm-font-weight-semibold); letter-spacing: .08em; color: var(--ybm-color-fg-brand); }
  .tp-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x4); padding-top: var(--ybm-space-x5); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-stats b { display: block; font-size: var(--ybm-font-size-t09); line-height: var(--ybm-line-height-t09); }
  .tp-collage { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ybm-space-x3); }
  .tp-collage > :nth-child(3n+2) { transform: translateY(var(--ybm-space-x6)); }
`, body: wrap(`<div class="tp-side"><div class="tp-stack" style="gap: var(--ybm-space-x5)"><span class="tp-eyebrow">COLORFUL</span><h1 class="tp-hero-t">${T2}</h1><p class="tp-lead">가장 작은 것들이 가장 중요해요. 매일 조금씩 모은 장면이 큰 기억이 돼요.</p><div>${btn('앨범 둘러보기', { variant: 'brandSolid', size: 'large', icEnd: 'arrow-right' })}</div><div class="tp-stats">${[['1.2만+', '사진'], ['340', '앨범'], ['98%', '만족'], ['24', '나라']].map(([v, l]) => `<div><b class="tp-num">${v}</b><span class="tp-sub">${l}</span></div>`).join('')}</div></div><div class="tp-collage">${Array.from({ length: 9 }, (_, i) => ph('3:4', i)).join('')}</div></div>`) });

export const templates = [centered, classic, galleryHero, mixed, product, side].map((f) => f());

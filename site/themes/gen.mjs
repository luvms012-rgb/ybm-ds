// 테마 예시 화면 생성기: 테마를 입힌 "실제 사이트" 한 화면을 만든다 (템플릿이 와이어프레임이라면 테마는 완성된 사이트 느낌).
// 사용: node site/themes/gen.mjs  →  node site/build.mjs
// 화면은 DS 컴포넌트와 kit 함수로만 짠다. 테마는 html 의 data-ds-theme 하나로 바뀐다(dist/themes/<이름>.css).
// 그림 아이콘은 Lucide(site/src/lucide-icons.json)를 색 타일 안에 크게 넣는다. 서비스 이름과 내용은 모두 가상이다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as K from '../templates/gen/kit.mjs';
import * as vivid from './vivid.mjs';
const { esc, icon, btn, iconBtn, badge, photo } = K;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'pages');
const LUCIDE = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'src', 'lucide-icons.json'), 'utf8')).icons;
// 테마마다 화면 한 벌(css, body). 든든은 이 파일 아래, 선명은 vivid.mjs
// 그림 아이콘: 톤(brand / positive / warning / critical / magic) 색 선
const art = (name, tone = 'brand', size = 36) => {
  if (!LUCIDE[name]) throw new Error('Lucide 에 없는 아이콘: ' + name);
  return `<svg class="th-art"${tone ? ` data-tone="${tone}"` : ''} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LUCIDE[name]}</svg>`;
};

export const THEMES = [
  { slug: 'trust', name: '든든', en: 'Trust',
    desc: '흰 바탕에 선명한 파랑 하나와 옅은 하늘색 면을 쓴 테마입니다. 보험, 금융, 공공 서비스처럼 믿음을 주는 화면에 어울립니다.',
    swatches: ['#ffffff', '#1658ff', '#edf4ff', '#272727'], card: { bg: '#edf4ff', fg: '#1658ff', art: ['shield-check', 'heart-pulse'] } },
  { slug: 'vivid', name: '선명', en: 'Vivid',
    desc: '흰 바탕에 또렷한 로열 블루 하나와 크고 둥근 카드를 쓴 테마입니다. 교육, 학습 서비스처럼 시원하고 자신감 있는 화면에 어울립니다.',
    swatches: ['#ffffff', '#004fff', '#f2f3f5', '#111111'], card: { bg: '#eef3ff', fg: '#004fff', art: ['book-open-check', 'sparkles'] } },
];

const CSS = `
  body { margin: 0; background: var(--ds-color-bg-canvas); color: var(--ds-color-fg-neutral); word-break: keep-all; overflow-wrap: break-word; }
  .th-wrap { box-sizing: border-box; width: min(100%, 1248px); margin-inline: auto; padding-inline: var(--ds-space-x4); }
  @media (min-width: 768px) { .th-wrap { padding-inline: var(--ds-space-x6); } }
  .th-art[data-tone="brand"] { color: var(--ds-color-fg-brand); }
  .th-art[data-tone="positive"] { color: var(--ds-color-fg-positive); }
  .th-art[data-tone="warning"] { color: var(--ds-color-fg-warning); }
  .th-art[data-tone="critical"] { color: var(--ds-color-fg-critical); }
  .th-art[data-tone="magic"] { color: var(--ds-color-fg-magic); }
  .th-em { color: var(--ds-color-fg-brand); }

  /* 위: 작은 링크 줄 + 메뉴 */
  .th-util { display: none; justify-content: flex-end; align-items: center; gap: var(--ds-space-x4); padding-top: var(--ds-space-x3); font-size: var(--ds-font-size-t02); color: var(--ds-color-fg-neutral-muted); }
  .th-util a { color: inherit; text-decoration: none; }
  @media (min-width: 1024px) { .th-util { display: flex; } }
  .th-gnb { position: sticky; top: 0; z-index: var(--ds-z-sticky); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .th-gnb .th-wrap { display: flex; align-items: center; gap: var(--ds-space-x12); height: 72px; }
  .th-logo { font-size: var(--ds-font-size-t07); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; color: var(--ds-color-fg-brand); text-decoration: none; white-space: nowrap; }
  .th-menu { display: none; gap: var(--ds-space-x10); }
  .th-menu a { font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-semibold); color: var(--ds-color-fg-neutral); text-decoration: none; }
  .th-gnb__end { display: flex; gap: var(--ds-space-x1); margin-left: auto; }
  @media (min-width: 1024px) { .th-menu { display: flex; } }

  /* 첫 줄: 큰 배너 + 로그인 카드 */
  .th-hero { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x5); padding-top: var(--ds-space-x8); }
  @media (min-width: 1024px) { .th-hero { grid-template-columns: minmax(0, 1fr) 344px; gap: var(--ds-space-x10); } }
  .th-banner { position: relative; overflow: hidden; border-radius: var(--ds-shape-2xl); background: var(--ds-color-palette-static-black); }
  .th-banner > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .78; }
  .th-banner__text { position: relative; display: flex; flex-direction: column; justify-content: flex-end; gap: var(--ds-space-x2); box-sizing: border-box; min-height: 280px; padding: var(--ds-space-x8); color: var(--ds-color-palette-static-white); background: linear-gradient(90deg, rgb(0 0 0 / .5), transparent 75%); }
  .th-banner__text .ds-badge { align-self: flex-start; margin-bottom: var(--ds-space-x1); }
  .th-banner__text h1 { margin: 0; font-size: 30px; line-height: 1.4; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
  .th-banner__text p { margin: 0; font-size: var(--ds-font-size-t05); opacity: .9; }
  .th-banner__pager { position: absolute; right: var(--ds-space-x6); bottom: var(--ds-space-x6); padding: var(--ds-space-x1) var(--ds-space-x3); border-radius: var(--ds-shape-pill); background: rgb(0 0 0 / .4); color: var(--ds-color-palette-static-white); font-size: var(--ds-font-size-t02); font-variant-numeric: tabular-nums; }
  .th-login { display: flex; flex-direction: column; justify-content: center; gap: var(--ds-space-x5); padding: var(--ds-space-x8); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-brand-weak); text-align: center; }
  .th-login p { margin: 0; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); font-weight: var(--ds-font-weight-bold); }
  .th-login p span { display: block; color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-semibold); }
  .th-login__links { display: flex; justify-content: center; gap: var(--ds-space-x3); font-size: var(--ds-font-size-t03); color: var(--ds-color-fg-neutral-muted); }
  .th-login__links a { color: inherit; text-decoration: none; }

  /* 바로 가기: 옅은 파랑 타일 + 그림 아이콘 + 두 줄 이름 */
  .th-quick { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: var(--ds-space-x6) var(--ds-space-x2); margin: 0; padding: var(--ds-space-x12) 0 0; list-style: none; }
  @media (min-width: 1024px) { .th-quick { grid-template-columns: repeat(10, minmax(0, 1fr)); } }
  .th-quick a { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x3); color: var(--ds-color-fg-neutral); text-decoration: none; text-align: center; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .th-tile { display: grid; place-items: center; flex: none; width: 72px; height: 72px; border-radius: var(--ds-shape-3xl); background: var(--ds-color-bg-brand-weak); transition: transform var(--ds-duration-fast) var(--ds-easing-standard); }
  .th-tile--sm { width: 56px; height: 56px; border-radius: var(--ds-shape-xl); }
  @media (min-width: 1024px) { .th-quick .th-tile { width: 80px; height: 80px; } }
  .th-quick a:hover .th-tile { transform: translateY(-2px); }

  /* 묶음: 왼쪽 두 줄 제목(둘째 줄 브랜드 색), 오른쪽 내용 */
  .th-sec { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); padding-top: var(--ds-space-x16); }
  @media (min-width: 1024px) { .th-sec { grid-template-columns: 280px minmax(0, 1fr); gap: var(--ds-space-x10); } }
  .th-sec__title { display: flex; flex-direction: column; align-items: flex-start; gap: var(--ds-space-x4); }
  .th-sec__title h2 { margin: 0; font-size: 30px; line-height: 1.5; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
  .th-sec__title h2 .th-em { display: block; }

  /* 간편 가입: 파랑 테두리 카드 (분류 → 이름 → 설명 → 가격과 그림) */
  .th-direct { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .th-direct { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  .th-dcard { display: flex; flex-direction: column; gap: var(--ds-space-x3); min-height: 230px; box-sizing: border-box; padding: var(--ds-space-x7); border-radius: var(--ds-shape-2xl); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-brand-weak); color: inherit; text-decoration: none; transition: box-shadow var(--ds-duration-fast) var(--ds-easing-standard); }
  .th-dcard:hover { box-shadow: inset 0 0 0 2px var(--ds-color-stroke-brand-solid); }
  .th-dcard h3 { margin: 0; font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); font-weight: var(--ds-font-weight-bold); letter-spacing: -0.02em; }
  .th-dcard h3 small { display: block; margin-bottom: 2px; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); font-weight: var(--ds-font-weight-semibold); color: var(--ds-color-fg-brand); letter-spacing: 0; }
  .th-dcard p { margin: 0; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: 22px; }
  .th-dcard__foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: auto; }
  .th-dcard__price { font-size: var(--ds-font-size-t04); color: var(--ds-color-fg-neutral-muted); }
  .th-dcard__price b { color: var(--ds-color-fg-neutral); font-size: var(--ds-font-size-t06); font-variant-numeric: tabular-nums; }

  /* 추천 보험: 구분선 목록 2열 (그림 → 이름 → 한 줄 설명) */
  .th-rec { display: grid; grid-template-columns: minmax(0, 1fr); column-gap: var(--ds-space-x10); margin: 0; padding: 0; list-style: none; }
  @media (min-width: 768px) { .th-rec { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .th-rec a { display: grid; grid-template-columns: 56px minmax(0, 1fr) auto; align-items: center; gap: var(--ds-space-x4); padding-block: var(--ds-space-x6); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); color: inherit; text-decoration: none; }
  .th-rec b { display: block; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); }
  .th-rec__desc { display: block; margin-top: 2px; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t04); line-height: 22px; }
  .th-rec .ds-icon { color: var(--ds-color-fg-neutral-subtle); }

  /* 안심 띠: 파랑 큰 카드 + 도움 카드 두 장 */
  .th-band { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); padding-top: var(--ds-space-x16); }
  @media (min-width: 1024px) { .th-band { grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr); } }
  .th-band__main { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x6); padding: var(--ds-space-x8); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-brand-solid); color: var(--ds-color-fg-on-brand-solid); }
  .th-band__main p { margin: 0; font-size: var(--ds-font-size-t08); line-height: 1.45; font-weight: var(--ds-font-weight-bold); letter-spacing: -0.03em; }
  .th-band__main p span { display: block; margin-top: var(--ds-space-x2); font-size: var(--ds-font-size-t04); line-height: 22px; font-weight: var(--ds-font-weight-regular); opacity: .85; letter-spacing: 0; }
  .th-band__main svg { flex: none; opacity: .9; }
  .th-help { display: flex; flex-direction: column; justify-content: space-between; gap: var(--ds-space-x6); padding: var(--ds-space-x7); border-radius: var(--ds-shape-2xl); background: var(--ds-color-bg-neutral-weak-alpha); color: inherit; text-decoration: none; }
  .th-help b { display: block; font-size: var(--ds-font-size-t06); line-height: var(--ds-line-height-t06); }
  .th-help__desc { display: block; margin-top: 2px; color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
  .th-help__foot { display: flex; align-items: flex-end; justify-content: space-between; }
  .th-help__foot .ds-icon { color: var(--ds-color-fg-neutral-subtle); }

  /* 보험 고르기 + 공지 */
  .th-pick { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x10); }
  @media (min-width: 1024px) { .th-pick { grid-template-columns: minmax(0, 1fr) 340px; } }
  .th-cats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--ds-space-x3); margin: 0; padding: 0; list-style: none; }
  @media (min-width: 768px) { .th-cats { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
  .th-cats a { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x2); padding: var(--ds-space-x5) var(--ds-space-x2); border-radius: var(--ds-shape-xl); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-muted); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t05); font-weight: var(--ds-font-weight-semibold); }
  .th-cats a:hover { box-shadow: inset 0 0 0 1px var(--ds-color-stroke-brand-solid); }
  .th-notice { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .th-notice__head { display: flex; align-items: center; justify-content: space-between; }
  .th-notice__head b { font-size: var(--ds-font-size-t07); line-height: var(--ds-line-height-t07); letter-spacing: -0.02em; }
  .th-notice ul { margin: 0; padding: 0; list-style: none; }
  .th-notice li a { display: flex; flex-direction: column; gap: 2px; padding-block: var(--ds-space-x4); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); color: inherit; text-decoration: none; }
  .th-notice li b { overflow: hidden; font-size: var(--ds-font-size-t05); font-weight: var(--ds-font-weight-medium); text-overflow: ellipsis; white-space: nowrap; }
  .th-notice li span { color: var(--ds-color-fg-neutral-subtle); font-size: var(--ds-font-size-t03); font-variant-numeric: tabular-nums; }

  /* 아래 */
  .th-foot { margin-top: var(--ds-space-x20); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); color: var(--ds-color-fg-neutral-muted); font-size: var(--ds-font-size-t03); }
  .th-foot__links { display: flex; flex-wrap: wrap; gap: var(--ds-space-x2) var(--ds-space-x6); padding-block: var(--ds-space-x5); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .th-foot__links a { color: var(--ds-color-fg-neutral); font-weight: var(--ds-font-weight-medium); text-decoration: none; }
  .th-foot__links a[data-strong] { color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-bold); }
  .th-foot__body { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--ds-space-x6); padding-block: var(--ds-space-x6) var(--ds-space-x12); }
  .th-foot__body p { margin: 0; line-height: 22px; }
  .th-foot__body b { display: block; margin-bottom: var(--ds-space-x2); color: var(--ds-color-fg-neutral); font-size: var(--ds-font-size-t05); }
  .th-call { display: flex; flex-wrap: wrap; align-items: flex-start; gap: var(--ds-space-x2); }
  .th-call__num { margin-left: var(--ds-space-x1); color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-bold); }
`;

const QUICK = [['file-search', '보험계약\n조회', 'brand'], ['hand-coins', '보험금\n청구', 'magic'], ['receipt', '청구 내역\n보기', 'critical'], ['wallet', '보험료\n내기', 'warning'], ['search-check', '숨은 보험금\n찾기', 'brand'], ['file-pen-line', '다이렉트\n가입', 'brand'], ['landmark', '계약 대출\n신청', 'positive'], ['piggy-bank', '대출 상환\n이자 내기', 'warning'], ['file-check', '필요 서류\n안내', 'positive'], ['house-heart', '마이홈', 'brand']];
const DIRECT = [['plane', '다이렉트', '국내여행보험', '가까운 여행이라도 사고와 분실 걱정 없이 출발해 보세요.', '1,200'], ['umbrella', '다이렉트', '해외여행보험', '여행의 설렘은 누리고, 걱정은 두고 떠나세요.', '3,900'], ['heart-pulse', '다이렉트', '미니 독감보험', '기침이 시작되기 전에 독감 치료비를 미리 준비하세요.', '990']];
const REC = [['ribbon', '올인원 암보험', '진단비부터 최신 치료비까지 한 번에 보장해요', 'critical'], ['shield-check', '가족 든든 간병보험', '간병비 걱정을 가족 모두 함께 줄여요', 'brand'], ['house-heart', '올인원 가정보험', '일상 사고부터 화재, 누수까지 지켜 드려요', 'positive'], ['stethoscope', '3대 질병 실속보험', '암, 뇌, 심장 질환을 실속 있게 대비해요', 'magic']];
const CATS = [['shield-check', '종신, 보장', 'brand'], ['ribbon', '암', 'critical'], ['car', '운전자', 'brand'], ['plane', '여행, 레저', 'positive'], ['flame', '화재', 'critical'], ['baby', '어린이', 'warning'], ['coins', '연금', 'warning'], ['piggy-bank', '저축', 'positive'], ['badge-percent', '다이렉트', 'magic'], ['ellipsis', '기타', 'brand']];
const NOTICE = [['보험금 청구 서류 안내가 바뀌었어요', '2026.11.02'], ['[안내] 도수 치료, 입원 의료비 심사 기준', '2026.10.28'], ['[발표] 다이렉트 여행보험 가입 이벤트 당첨자', '2026.10.21']];
const nl = (s) => s.split('\n').map(esc).join('<br>');

const body = () => `<div class="th-wrap th-util"><a href="#">고객센터</a><a href="#">인증센터</a><a href="#">회원가입</a>${btn('로그인', { variant: 'brandSolid', size: 'xsmall' })}</div>
<header class="th-gnb"><div class="th-wrap"><a class="th-logo" href="#">한빛안심보험</a><nav class="th-menu" aria-label="주요 메뉴"><a href="#">MY</a><a href="#">보상</a><a href="#">대출</a><a href="#">다이렉트</a><a href="#">보험상품</a><a href="#">고객지원</a></nav><div class="th-gnb__end">${iconBtn('search', '찾기', { variant: 'ghost', size: 'medium' })}${iconBtn('menu', '전체 메뉴', { variant: 'ghost', size: 'medium' })}</div></div></header>
<main class="th-wrap">
  <section class="th-hero" aria-label="소식">
    <div class="th-banner"><img src="${photo('nature', 2, 1400)}" alt=""><div class="th-banner__text">${badge('다이렉트 여행보험', 'brand', true)}<h1>떠나기 전 3분이면<br>여행 걱정 끝</h1><p>하루 1,200원부터 휴대폰으로 바로 가입해요.</p></div><span class="th-banner__pager">1 / 3</span></div>
    <div class="th-login"><p><span>로그인하고</span>내 보험을 한눈에 확인하세요</p>${btn('로그인', { variant: 'brandSolid', size: 'large', fill: true })}<div class="th-login__links"><a href="#">아이디 찾기</a><a href="#">비밀번호 찾기</a><a href="#">회원가입</a></div></div>
  </section>
  <ul class="th-quick" aria-label="자주 찾는 메뉴">${QUICK.map(([ic, t, tone]) => `<li><a href="#"><span class="th-tile">${art(ic, tone)}</span>${nl(t)}</a></li>`).join('')}</ul>

  <section class="th-sec" aria-labelledby="th-s1"><div class="th-sec__title"><h2 id="th-s1">간편 가입은<span class="th-em">다이렉트보험!</span></h2>${K.link('전체 보기', '#', '')}</div>
    <div class="th-direct">${DIRECT.map(([ic, k, t, d, p]) => `<a class="th-dcard" href="#"><h3><small>${k}</small>${t}</h3><p>${d}</p><div class="th-dcard__foot"><span class="th-dcard__price">하루 <b>${p}</b>원부터</span><span class="th-tile th-tile--sm">${art(ic, 'brand', 28)}</span></div></a>`).join('')}</div></section>

  <section class="th-sec" aria-labelledby="th-s2"><div class="th-sec__title"><h2 id="th-s2">지금 많이 찾는<span class="th-em">추천 보험이에요</span></h2></div>
    <ul class="th-rec">${REC.map(([ic, t, d, tone]) => `<li><a href="#"><span class="th-tile th-tile--sm">${art(ic, tone, 28)}</span><span><b>${t}</b><span class="th-rec__desc">${d}</span></span>${icon('chevron-right')}</a></li>`).join('')}</ul></section>

  <section class="th-band" aria-label="안내">
    <div class="th-band__main"><p>당신의 하루를 지키는<br>한빛안심보험<span>보험금 청구부터 상담까지 한곳에서 도와 드려요.</span></p>${art('shield-check', '', 72)}</div>
    <a class="th-help" href="#"><div><b>자주 묻는 질문</b><span class="th-help__desc">청구, 가입, 해지 궁금증을 모았어요</span></div><div class="th-help__foot">${art('message-circle-question-mark', 'brand', 32)}${icon('arrow-right')}</div></a>
    <a class="th-help" href="#"><div><b>고객지원</b><span class="th-help__desc">평일 9시부터 18시까지 상담해요</span></div><div class="th-help__foot">${art('headset', 'positive', 32)}${icon('arrow-right')}</div></a>
  </section>

  <section class="th-sec" aria-labelledby="th-s3"><div class="th-sec__title"><h2 id="th-s3">나에게 꼭 맞는<span class="th-em">보험을 찾아보세요</span></h2></div>
    <div class="th-pick"><ul class="th-cats">${CATS.map(([ic, t, tone]) => `<li><a href="#">${art(ic, tone, 32)}${t}</a></li>`).join('')}</ul>
      <div class="th-notice"><div class="th-notice__head"><b>공지사항</b>${K.link('더 보기', '#', '')}</div><ul>${NOTICE.map(([t, d]) => `<li><a href="#"><b>${t}</b><span>${d}</span></a></li>`).join('')}</ul></div></div></section>
</main>
<footer class="th-foot"><div class="th-wrap"><nav class="th-foot__links" aria-label="약관"><a href="#">회원가입 약관</a><a href="#">이용약관</a><a href="#" data-strong>개인정보 처리방침</a><a href="#">신용정보 활용 체제</a></nav>
  <div class="th-foot__body"><p><b>한빛안심보험</b>이 화면은 YBM DS 테마 예시예요. 회사 이름, 상품, 연락처는 모두 가상입니다.<br>서울시 가상구 예시로 100 · help@example.com</p><div class="th-call">${btn('고객센터<span class="th-call__num">1588-0000</span>', { variant: 'neutralOutline', size: 'small' })}${btn('이용 시간 안내', { variant: 'neutralOutline', size: 'small', icEnd: 'chevron-right' })}</div></div></div></footer>`;

const VIEWS = { trust: { css: () => CSS, body }, vivid };

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const t of THEMES) {
  const v = VIEWS[t.slug];
  const html = `<!doctype html>
<html lang="ko" data-ds-theme="${t.slug}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.name)} 테마 - YBM DS</title>
<link rel="stylesheet" href="../../../dist/ybm-ds.css">
<link rel="stylesheet" href="../../../dist/themes/${t.slug}.css">
<script>if (location.hash === "#default") document.documentElement.removeAttribute("data-ds-theme");</script>
<script src="../../../dist/ybm-ds.js" defer></script>
<style>${v.css(art)}</style>
</head>
<body>
${v.body(art)}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, t.slug + '.html'), html);
}
fs.writeFileSync(path.join(HERE, '..', 'src', 'themes.json'), JSON.stringify({ themes: THEMES.map(({ slug, name, en, desc, swatches, card }) => ({ slug, name, en, desc, swatches, card })) }, null, 2) + '\n');
console.log(`테마 화면 ${THEMES.length}개 생성`);

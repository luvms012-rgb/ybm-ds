// 커뮤니티 템플릿(Community): 게시판형 커뮤니티의 홈, 게시판 목록, 게시글 상세, 글쓰기.
// 국내 웹 커뮤니티 화면(사내 UI 패턴 모음 '커뮤니티')의 공통 구조만 따른다. 서비스 이름, 글, 로고는 넣지 않는다.
import * as K from './kit.mjs';
import { T, FRAME_CSS, topbar } from './frame.mjs';
const { icon, btn, iconBtn, badge, card, secHead, field, input, select, chip, chiptabs, segmented, avatar, avatars, callout, link, thumb, pagination, search, sw, meter, esc } = K;

const MENU = ['홈', '게시판', '인기글', '모임'];
const END = `${iconBtn('search', '찾기', { size: 'xsmall' })}${iconBtn('bell', '알림', { size: 'xsmall' })}${avatar('주말산책', 28)}`;
const BOARDS = [['전체글', 'list'], ['인기글', 'star-solid'], ['공지사항', 'bell'], ['자유게시판', 'message-circle'], ['질문과 답변', 'info'], ['정보 나눔', 'bookmark'], ['후기', 'thumbs-up'], ['모임 모집', 'users']];

const CSS = FRAME_CSS + `
  /* 커뮤니티 배치: 모바일 1열, 1024 부터 게시판 메뉴 220 | 본문, 1280 부터 오른쪽 칸 300 */
  .tp-cm { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x6); box-sizing: border-box; width: min(100%, 1280px); margin-inline: auto; padding: var(--ds-space-x5) var(--ds-space-x4) var(--ds-space-x12); }
  .tp-cm__main { display: flex; flex-direction: column; gap: var(--ds-space-x6); min-width: 0; }
  .tp-cm__nav, .tp-cm__aside { display: none; }
  .tp-cm__chips { overflow-x: auto; scrollbar-width: none; }
  @media (min-width: 768px) { .tp-cm { padding: var(--ds-space-x8) var(--ds-space-x6) var(--ds-space-x16); } }
  @media (min-width: 1024px) {
    .tp-cm:not(.tp-cm--one) { grid-template-columns: 220px minmax(0, 1fr); gap: var(--ds-space-x8); }
    .tp-cm__nav { display: flex; flex-direction: column; gap: var(--ds-space-x4); position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); align-self: start; }
    .tp-cm__chips { display: none; }
  }
  @media (min-width: 1280px) {
    .tp-cm--aside { grid-template-columns: 220px minmax(0, 1fr) 300px; }
    .tp-cm__aside { display: flex; flex-direction: column; gap: var(--ds-space-x6); position: sticky; top: calc(var(--ds-space-x16) + var(--ds-space-x4)); align-self: start; }
  }
  /* 게시판 메뉴: 옆 메뉴 부품을 칸 폭에 맞춰 쓴다 */
  .tp-cm__nav .ds-sidenav { width: auto; height: auto; background: none; }
  .tp-cm__nav .ds-sidenav__content { padding: 0; }
  .tp-me { display: flex; flex-direction: column; gap: var(--ds-space-x3); }
  /* 글 묶음: 줄 사이 선 */
  .tp-feed { display: flex; flex-direction: column; }
  .tp-feed > * { padding-block: var(--ds-space-x5); }
  .tp-feed > * + * { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-post { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
  .tp-post--thumb { grid-template-columns: minmax(0, 1fr) 88px; }
  @media (min-width: 768px) { .tp-post--thumb { grid-template-columns: minmax(0, 1fr) 120px; } }
  .tp-post__body { display: flex; flex-direction: column; gap: var(--ds-space-x2); min-width: 0; }
  .tp-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .tp-who { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); min-width: 0; }
  .tp-meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x3); font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  .tp-meta > span { display: inline-flex; align-items: center; gap: var(--ds-space-x1); }
  .tp-meta .ds-icon { --ds-icon-size: 14px; }
  .tp-cnt { margin-inline-start: var(--ds-space-x1); color: var(--ds-color-fg-brand); font-weight: var(--ds-font-weight-semibold); font-variant-numeric: tabular-nums; }
  /* 순위 목록 */
  .tp-rank { display: flex; flex-direction: column; gap: var(--ds-space-x3); margin: 0; padding: 0; list-style: none; counter-reset: rank; }
  .tp-rank > li { display: grid; grid-template-columns: 20px minmax(0, 1fr); gap: var(--ds-space-x2); counter-increment: rank; }
  .tp-rank > li::before { content: counter(rank); font-weight: var(--ds-font-weight-bold); font-variant-numeric: tabular-nums; color: var(--ds-color-fg-neutral); }
  .tp-rank a { color: inherit; text-decoration: none; }
  .tp-hot { display: flex; flex-direction: column; gap: var(--ds-space-x3); color: inherit; text-decoration: none; }
`;

const boardNav = (cur) => `<nav class="ds-sidenav" aria-label="게시판"><div class="ds-sidenav__content"><div class="ds-sidenav__group"><div class="ds-sidenav__group-label">게시판</div>${BOARDS.map(([t, ic], i) => `<a class="ds-sidenav__item" href="#"${i === cur ? ' aria-current="page"' : ''}><span class="ds-sidenav__prefix">${icon(ic)}</span><span class="ds-sidenav__label">${t}</span></a>`).join('')}</div></div></nav>`;
const me = () => card(`<div class="tp-me"><div class="tp-row">${avatar('주말산책', 40)}<div class="tp-stack"><span class="tp-h4">주말산책</span><span class="tp-caption">글 ${T('12')} / 댓글 ${T('48')}</span></div></div>${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil', fill: true })}</div>`);
const leftNav = (cur) => `<aside class="tp-cm__nav" aria-label="내 정보와 게시판">${me()}${boardNav(cur)}</aside>`;
const mobileBoards = (cur) => `<div class="tp-cm__chips">${chiptabs(BOARDS.map(([t]) => t), cur, '게시판')}</div>`;
const who = (name, time, { lv = '', extra = '' } = {}) => `<div class="tp-who">${avatar(name, 24)}<span class="tp-h4">${name}</span>${lv ? badge(lv) : ''}<span class="tp-caption">${time}</span>${extra}</div>`;
const meta = (like, cmt, view) => `<div class="tp-meta"><span>${icon('thumbs-up')}${like}</span><span>${icon('message-circle')}${cmt}</span><span>${icon('eye')}${view}</span></div>`;
const rank = (items) => `<ol class="tp-rank">${items.map(([t, c]) => `<li><a href="#" class="tp-stack"><span class="tp-h4 tp-clamp">${t}</span><span class="tp-caption">댓글 ${T(c)}</span></a></li>`).join('')}</ol>`;
const HOT = [['처음 가 본 둘레길, 생각보다 쉬웠어요', 42], ['홈카페 원두 추천해 주세요', 31], ['이번 주말 비 온대요, 실내 데이트 어디 가요?', 28], ['반려식물 잎이 노랗게 변해요', 19], ['책 모임 3월 도서 투표 결과', 16]];

/* 1. 커뮤니티 홈 ------------------------------------------------- */
const home = () => {
  const posts = [
    ['정보 나눔', '초보도 바로 가는 서울 근교 둘레길 5곳', '지하철로 갈 수 있고 두세 시간이면 끝나는 길만 골랐어요. 길마다 화장실과 카페 위치도 같이 적었어요.', '하늘바라기', '20분 전', '128', '24', '1,920', 0],
    ['질문과 답변', '홈카페 처음인데 그라인더부터 사야 할까요?', '캡슐 머신만 써 봤는데 원두로 바꿔 보고 싶어요. 예산은 20만 원 정도예요.', '커피한잔', '1시간 전', '36', '18', '842', -1],
    ['후기', '주말 캠핑 장비, 이것만 챙기면 충분했어요', '처음 캠핑 갈 때 짐이 너무 많았는데 세 번 다녀오고 나서 줄인 목록이에요.', '캠핑초보', '3시간 전', '87', '12', '1,204', 1],
    ['자유게시판', '퇴근하고 30분 걷기, 한 달 해 본 이야기', '처음엔 귀찮았는데 지금은 안 걸으면 잠이 안 와요. 같이 걸을 분 계세요?', '초록손', '5시간 전', '54', '9', '611', -1],
    ['모임 모집', '토요일 아침 독서 모임 2명 더 모여요', '한 달에 한 권, 카페에서 두 시간 이야기 나눠요. 이번 달 책은 투표로 정해요.', '책읽는밤', '어제', '22', '7', '388', 2],
  ];
  const post = ([b, t, ex, n, time, like, cmt, view, ph]) => `<a class="tp-post${ph >= 0 ? ' tp-post--thumb' : ''}" href="#"><div class="tp-post__body">${who(n, time, { extra: badge(b) })}<span class="tp-h3">${t}</span><span class="tp-sub tp-clamp">${ex}</span>${meta(like, cmt, view)}</div>${ph >= 0 ? `<div class="tp-post__thumb">${thumb('1:1', '', K.photo('mix', ph, 320), 'lg')}</div>` : ''}</a>`;
  const hot = (i, t, n, c) => `<a class="tp-hot" href="#">${thumb('4:3', '', K.photo('nature', i, 480), 'lg')}<div class="tp-stack"><span class="tp-h4 tp-clamp">${t}</span><span class="tp-caption">${n} / 댓글 ${T(c)}</span></div></a>`;
  const css = CSS;
  const body = `<div class="tp-app">${topbar(MENU, 0, END)}
<div class="tp-cm tp-cm--aside">
  ${leftNav(0)}
  <main class="tp-cm__main">
    ${mobileBoards(0)}
    <section class="tp-sec">${secHead('지금 뜨는 글', { sub: '최근 24시간', tools: link('더 보기') })}
      <div class="tp-g3">${hot(1, '새벽 산에서 본 구름바다, 사진 남겨요', '하늘바라기', 42)}${hot(4, '바닷가 캠핑장 세 곳 다녀온 비교 후기', '캠핑초보', 31)}${hot(6, '동네 공원 산책 코스 지도로 정리했어요', '초록손', 28)}</div>
    </section>
    <section class="tp-sec">${secHead('새 글', { tools: segmented(['추천순', '최신순'], 1, '정렬') })}
      <div class="tp-feed">${posts.map(post).join('')}</div>
      ${btn('글 더 보기', { fill: true, icEnd: 'chevron-down' })}
    </section>
  </main>
  <aside class="tp-cm__aside" aria-label="인기글과 소식">
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x4)"><span class="tp-h3">실시간 인기글</span>${rank(HOT)}</div>`)}
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x3)"><span class="tp-h3">이번 주 활발한 멤버</span>${avatars(['하늘바라기', '커피한잔', '캠핑초보', '초록손', '책읽는밤'], 32, 12)}<span class="tp-caption">글과 댓글을 많이 남긴 멤버예요.</span></div>`)}
    ${callout('커뮤니티 이용 규칙이 바뀌었어요', '광고 글과 개인 정보가 담긴 글은 알림 없이 숨겨질 수 있어요.', 'informative')}
  </aside>
</div></div>`;
  return { slug: 'community-home', en: 'Community Home', name: '커뮤니티 홈', group: 'Community', desc: '게시판형 커뮤니티의 첫 화면입니다. 지금 뜨는 글과 새 글을 한곳에서 봅니다.', css, body };
};

/* 2. 게시판 목록 ------------------------------------------------- */
const board = () => {
  const css = CSS + `
  .tp-bhead { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--ds-space-x3) var(--ds-space-x4); }
  .tp-btools { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); }
  .tp-btools .ds-input { width: min(100%, 240px); }
  /* 글 목록: 모바일은 제목 + 한 줄 정보, 768 부터 칸을 나눈 표 모양. 줄 선은 줄 자체에 그린다(안쪽 바탕이 덮지 않게) */
  .tp-board { margin: 0; padding: 0; list-style: none; box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-solid); }
  .tp-board > li { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1) var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x2); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); font-size: var(--ds-font-size-t02); line-height: var(--ds-line-height-t02); color: var(--ds-color-fg-neutral-subtle); font-variant-numeric: tabular-nums; }
  .tp-board > li[data-pinned] { background: var(--ds-color-bg-neutral-weak-alpha); }
  .tp-board > li.tp-board__head { display: none; }  /* 줄 규칙(.tp-board > li)보다 세게: !important 대신 선택자로 */
  .tp-board .c-no { display: none; }
  .tp-board .c-title { order: -1; flex: 1 1 100%; display: flex; align-items: center; gap: var(--ds-space-x1_5); min-width: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); color: var(--ds-color-fg-neutral); }
  .tp-board .c-title a { overflow: hidden; color: inherit; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; }
  .tp-board .c-title .ds-icon { flex: none; --ds-icon-size: 14px; color: var(--ds-color-fg-neutral-subtle); }
  .tp-board [data-pinned] .c-title { font-weight: var(--ds-font-weight-semibold); }
  .tp-board .tp-m { display: inline; }
  @media (min-width: 768px) {
    .tp-board > li { display: grid; grid-template-columns: 64px 80px minmax(0, 1fr) 104px 72px 56px 56px; gap: var(--ds-space-x2); padding: 0 var(--ds-space-x2); min-height: 48px; }
    .tp-board > li.tp-board__head { display: grid; min-height: 44px; color: var(--ds-color-fg-neutral-muted); font-weight: var(--ds-font-weight-medium); }
    .tp-board .c-no { display: block; }
    .tp-board .c-title { order: 0; flex: none; }
    .tp-board :is(.c-no, .c-view, .c-like, .c-date) { text-align: center; }
    .tp-board .c-author { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--ds-color-fg-neutral-muted); }
    .tp-board .tp-m { display: none; }
  }
  .tp-bfoot { display: flex; flex-direction: column; align-items: center; gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-bfoot { position: relative; } .tp-bfoot > .ds-btn { position: absolute; right: 0; top: 0; } }
`;
  const pins = [['공지', '커뮤니티 이용 규칙 안내 (3월 바뀐 내용)', '운영자', '03.02', '4,812', '36', 0], ['공지', '봄맞이 사진 공모전, 3월 31일까지 받아요', '운영자', '03.05', '2,930', '58', 12]];
  const rows = [[2418, '잡담', '퇴근하고 30분 걷기, 한 달 해 본 이야기', '초록손', '14:52', '611', '54', 9, true, true], [2417, '질문', '홈카페 처음인데 그라인더부터 사야 할까요?', '커피한잔', '14:20', '842', '36', 18, false, true], [2416, '정보', '초보도 바로 가는 서울 근교 둘레길 5곳', '하늘바라기', '13:47', '1,920', '128', 24, true, false], [2415, '잡담', '이번 주말 비 온대요, 실내 데이트 어디 가요?', '주말산책', '13:05', '402', '12', 28, false, false], [2414, '후기', '주말 캠핑 장비, 이것만 챙기면 충분했어요', '캠핑초보', '11:38', '1,204', '87', 12, true, false], [2413, '질문', '반려식물 잎이 노랗게 변해요, 물을 줄여야 할까요?', '초록손', '10:12', '377', '8', 19, true, false], [2412, '잡담', '오늘 점심 뭐 드셨어요?', '배고픈곰', '09:40', '215', '3', 41, false, false], [2411, '정보', '도서관 전자책 무료로 빌리는 법', '책읽는밤', '어제', '1,508', '96', 15, false, false], [2410, '후기', '처음 가 본 둘레길, 생각보다 쉬웠어요', '하늘바라기', '어제', '2,102', '142', 42, true, false], [2409, '잡담', '봄옷 정리하다 찾은 옛날 사진', '주말산책', '어제', '388', '21', 6, true, false]];
  const head = `<li class="tp-board__head" aria-hidden="true"><span class="c-no">번호</span><span>말머리</span><span class="c-title" style="justify-content:center;color:inherit">제목</span><span>글쓴이</span><span class="c-date">작성일</span><span class="c-view">조회</span><span class="c-like">좋아요</span></li>`;
  const pin = ([b, t, n, d, v, l, c]) => `<li data-pinned><span class="c-no">${badge('공지', 'critical')}</span><span class="c-cat">${b}</span><span class="c-title"><a href="#">${t}</a>${c ? `<span class="tp-cnt">${c}</span>` : ''}</span><span class="c-author">${n}</span><span class="c-date">${d}</span><span class="c-view"><span class="tp-m">조회 </span>${v}</span><span class="c-like"><span class="tp-m">좋아요 </span>${l}</span></li>`;
  const row = ([no, b, t, n, d, v, l, c, ph, isNew]) => `<li><span class="c-no">${no}</span><span class="c-cat">${b}</span><span class="c-title"><a href="#">${t}</a>${ph ? icon('image') : ''}${c ? `<span class="tp-cnt">${c}</span>` : ''}${isNew ? badge('새 글', 'brand') : ''}</span><span class="c-author">${n}</span><span class="c-date">${d}</span><span class="c-view"><span class="tp-m">조회 </span>${v}</span><span class="c-like"><span class="tp-m">좋아요 </span>${l}</span></li>`;
  const body = `<div class="tp-app">${topbar(MENU, 1, END)}
<div class="tp-cm">
  ${leftNav(3)}
  <main class="tp-cm__main">
    ${mobileBoards(3)}
    <header class="tp-bhead"><div class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">자유게시판</h1><p class="tp-sub">일상 이야기를 자유롭게 나눠요. 멤버 ${T('12,840')}명</p></div>${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil' })}</header>
    <div class="tp-stack" style="gap: var(--ds-space-x3)">
      ${chiptabs(['전체', '잡담', '질문', '정보', '후기'], 0, '말머리')}
      <div class="tp-btools"><span class="tp-sub">글 ${T('2,418')}개</span><div class="tp-row">${K.even(select('최신순', { id: 'bd-sort', aria: '정렬' }) + search('bd-q', '게시판 안에서 찾기'))}</div></div>
    </div>
    <ul class="tp-board" aria-label="글 목록">${head}${pins.map(pin).join('')}${rows.map(row).join('')}</ul>
    <div class="tp-bfoot">${pagination(1, 242)}${btn('글쓰기', { variant: 'brandSolid', ic: 'pencil' })}</div>
  </main>
</div></div>`;
  return { slug: 'community-board', en: 'Board List', name: '게시판 목록', group: 'Community', desc: '카페형 게시판의 글 목록입니다. 말머리로 거르고 공지는 위에 고정합니다.', css, body };
};

/* 3. 게시글 상세 ------------------------------------------------- */
const post = () => {
  const css = CSS + `
  .tp-article { display: flex; flex-direction: column; gap: var(--ds-space-x5); }
  .tp-article__text { display: flex; flex-direction: column; gap: var(--ds-space-x4); font-size: var(--ds-font-size-t05); line-height: var(--ds-line-height-t05); }
  .tp-article__text p { margin: 0; }
  .tp-acts { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x2); padding-block: var(--ds-space-x4); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted), inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-acts__end { margin-inline-start: auto; display: flex; gap: var(--ds-space-x1); }
  .tp-cform { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-cform .ds-textarea { --ds-textarea-min-height: 88px; }
  .tp-cmts { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
  .tp-cmts > li { padding-block: var(--ds-space-x4); }
  .tp-cmts > li + li { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-cmt { display: flex; flex-direction: column; gap: var(--ds-space-x2); }
  .tp-cmt p { margin: 0; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-cmt__acts { display: flex; gap: var(--ds-space-x1); margin-inline-start: calc(-1 * var(--ds-space-x2)); }
  .tp-replies { display: flex; flex-direction: column; gap: var(--ds-space-x4); margin: var(--ds-space-x4) 0 0; padding: 0 0 0 var(--ds-space-x8); list-style: none; }
  .tp-replies > li { position: relative; }
  .tp-replies > li > .ds-icon { position: absolute; left: calc(-1 * var(--ds-space-x6)); top: 2px; --ds-icon-size: 16px; color: var(--ds-color-fg-neutral-subtle); }
  .tp-adj { display: flex; flex-direction: column; }
  .tp-adj > a { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--ds-space-x3); padding: var(--ds-space-x3) var(--ds-space-x1); color: inherit; text-decoration: none; font-size: var(--ds-font-size-t04); line-height: var(--ds-line-height-t04); }
  .tp-adj > a + a { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-adj > a > span:last-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;
  const cmt = (n, time, text, like, { mine = false, replies = [] } = {}) => `<li><div class="tp-cmt"><div class="tp-between">${who(n, time, { extra: mine ? badge('글쓴이', 'brand') : '' })}${iconBtn('ellipsis', '댓글 더 보기', { size: 'xsmall' })}</div><p>${text}</p><div class="tp-cmt__acts">${btn(`좋아요 ${like}`, { variant: 'ghost', size: 'xsmall', ic: 'thumbs-up' })}${btn('답글', { variant: 'ghost', size: 'xsmall' })}</div></div>${replies.length ? `<ul class="tp-replies">${replies.map(([rn, rt, rx, rl, rm]) => `<li>${icon('corner-down-right')}<div class="tp-cmt"><div class="tp-between">${who(rn, rt, { extra: rm ? badge('글쓴이', 'brand') : '' })}${iconBtn('ellipsis', '답글 더 보기', { size: 'xsmall' })}</div><p>${rx}</p><div class="tp-cmt__acts">${btn(`좋아요 ${rl}`, { variant: 'ghost', size: 'xsmall', ic: 'thumbs-up' })}</div></div></li>`).join('')}</ul>` : ''}</li>`;
  const body = `<div class="tp-app">${topbar(MENU, 1, END)}
<div class="tp-cm tp-cm--aside">
  ${leftNav(4)}
  <main class="tp-cm__main">
    <article class="tp-article">
      ${K.breadcrumbs(['커뮤니티', '질문과 답변'])}
      <div class="tp-stack" style="gap: var(--ds-space-x3)">${badge('질문')}<h1 class="tp-h1">홈카페 처음인데 그라인더부터 사야 할까요?</h1>
        <div class="tp-between">${who('커피한잔', '1시간 전', { lv: '새싹 멤버' })}<div class="tp-row"><span class="tp-meta"><span>조회 ${T('842')}</span></span>${iconBtn('ellipsis-vertical', '글 더 보기', { size: 'xsmall' })}</div></div>
      </div>
      <div class="tp-article__text">
        <p>지금까지는 캡슐 머신만 써 봤는데, 원두를 직접 갈아서 내려 보고 싶어졌어요. 예산은 20만 원 정도예요.</p>
        <p>그라인더를 먼저 사고 드리퍼는 싼 것으로 시작할지, 아니면 둘 다 중간 가격으로 맞출지 고민이에요. 처음 시작할 때 어떻게 하셨는지 궁금해요.</p>
        ${thumb('16:9', '', K.photo('food', 3, 960), 'lg')}
      </div>
      ${card(`<div class="tp-between"><span class="tp-h4">투표</span><span class="tp-caption">${T('36')}명 참여 / 여러 개 고를 수 있어요</span></div>${meter('그라인더에 먼저 투자', 58, '58%')}${meter('둘 다 중간 가격', 31, '31%')}${meter('일단 원두를 사서 갈아 달라고 하기', 11, '11%')}`)}
      <div class="tp-acts">${btn('좋아요 36', { variant: 'neutralOutline', ic: 'thumbs-up' })}${btn('스크랩', { variant: 'neutralOutline', ic: 'bookmark' })}<div class="tp-acts__end">${iconBtn('share', '공유하기')}${iconBtn('flag', '신고하기')}</div></div>
    </article>
    <section class="tp-sec" aria-labelledby="c-title">${secHead(`댓글 ${T('18')}`, { id: 'c-title', cls: 'tp-h3', tools: segmented(['등록순', '최신순'], 0, '댓글 정렬') })}
      <div class="tp-cform"><textarea class="ds-textarea" id="c-new" placeholder="따뜻한 댓글을 남겨 주세요" aria-label="댓글 쓰기"></textarea><div class="tp-between"><span class="tp-caption">${T('0')} / 500</span>${btn('등록', { variant: 'neutralSolid' })}</div></div>
      <ul class="tp-cmts">
        ${cmt('하늘바라기', '50분 전', '그라인더가 맛을 제일 많이 바꿔요. 드리퍼는 플라스틱도 충분해요.', 12, { replies: [['커피한잔', '40분 전', '플라스틱도 괜찮군요. 그럼 그라인더에 더 쓸게요!', 3, true]] })}
        ${cmt('주말산책', '35분 전', '저는 핸드 그라인더로 시작했어요. 아침마다 가는 시간이 은근히 좋아요.', 8)}
        ${cmt('책읽는밤', '12분 전', '원두는 볶은 날짜를 꼭 보세요. 2주 안쪽이 맛있어요.', 5)}
      </ul>
      ${btn('댓글 더 보기', { fill: true, icEnd: 'chevron-down' })}
    </section>
    <nav class="tp-adj" aria-label="이전, 다음 글"><a href="#"><span class="tp-caption">이전 글</span><span>반려식물 잎이 노랗게 변해요, 물을 줄여야 할까요?</span></a><a href="#"><span class="tp-caption">다음 글</span><span>도서관 전자책 무료로 빌리는 법</span></a></nav>
  </main>
  <aside class="tp-cm__aside" aria-label="이 게시판 인기글">
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x4)"><span class="tp-h3">이 게시판 인기글</span>${rank(HOT)}</div>`)}
    ${card(`<div class="tp-stack" style="gap: var(--ds-space-x3)"><div class="tp-row">${avatar('커피한잔', 40)}<div class="tp-stack"><span class="tp-h4">커피한잔</span><span class="tp-caption">글 ${T('8')} / 댓글 ${T('31')}</span></div></div>${btn('다른 글 보기', { fill: true })}</div>`)}
  </aside>
</div></div>`;
  return { slug: 'community-post', en: 'Post Detail', name: '게시글 상세', group: 'Community', desc: '게시글 하나를 읽고 댓글로 이야기를 나누는 화면입니다.', css, body };
};

/* 4. 글쓰기 ----------------------------------------------------- */
const write = () => {
  const css = CSS + `
  .tp-cm--one { max-width: 800px; }
  .tp-wform { display: flex; flex-direction: column; gap: var(--ds-space-x6); }
  .tp-wpick { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ds-space-x4); }
  @media (min-width: 768px) { .tp-wpick { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  /* 본문 칸: 도구 줄 + 글 칸을 한 상자로. 선은 상자와 도구 줄 자신에 그린다 */
  .tp-editor { display: flex; flex-direction: column; border-radius: var(--ds-shape-lg); box-shadow: inset 0 0 0 1px var(--ds-color-stroke-neutral-weak); }
  .tp-editor__bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ds-space-x1); padding: var(--ds-space-x2); box-shadow: inset 0 -1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-editor .ds-textarea { --ds-textarea-line-width: 0px; --ds-textarea-min-height: 320px; background: none; }
  .tp-opts { display: flex; flex-direction: column; }
  .tp-opts > label { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-x3); padding-block: var(--ds-space-x3); }
  .tp-opts > label + label { box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-wbar { position: sticky; bottom: 0; z-index: var(--ds-z-sticky); display: flex; justify-content: flex-end; gap: var(--ds-space-x2); padding: var(--ds-space-x3) var(--ds-space-x4); background: var(--ds-color-bg-layer-default); box-shadow: inset 0 1px 0 var(--ds-color-stroke-neutral-muted); }
  .tp-wbar__in { display: flex; justify-content: space-between; align-items: center; gap: var(--ds-space-x2); width: min(100%, 752px); margin-inline: auto; }
`;
  const img = (i, name, main) => `<div class="ds-fileitem" data-type="image"><img class="ds-fileitem__image" src="${K.photo('nature', i, 240)}" alt="${name}">${main ? '<span class="ds-fileitem__badge">대표</span>' : ''}<button type="button" class="ds-fileitem__remove" aria-label="${name} 빼기">${icon('x')}</button></div>`;
  const body = `<div class="tp-app">${topbar(MENU, 1, END)}
<main class="tp-cm tp-cm--one">
  <div class="tp-cm__main">
    <header class="tp-stack" style="gap: var(--ds-space-x1_5)"><h1 class="tp-h1">글쓰기</h1><p class="tp-sub">사진은 10장까지 올릴 수 있어요.</p></header>
    <form class="tp-wform" onsubmit="return false">
      <div class="tp-wpick">${field('w-board', '게시판', select('자유게시판', { id: 'w-board' }), { required: true })}${field('w-cat', '말머리', select('잡담', { id: 'w-cat' }))}</div>
      ${field('w-title', '제목', input('w-title', 'placeholder="제목을 적어 주세요" maxlength="60"'), { required: true, help: '60자까지 쓸 수 있어요.' })}
      <div class="ds-field"><div class="ds-field__header"><label class="ds-field__label" for="w-body">본문 <span class="ds-field__required" aria-hidden="true"></span></label></div>
        <div class="tp-editor"><div class="tp-editor__bar" role="toolbar" aria-label="글 꾸미기">${iconBtn('italic', '기울이기', { size: 'xsmall' })}${iconBtn('link', '링크 넣기', { size: 'xsmall' })}${iconBtn('list', '목록', { size: 'xsmall' })}${iconBtn('image', '사진 넣기', { size: 'xsmall' })}${iconBtn('paperclip', '파일 붙이기', { size: 'xsmall' })}${iconBtn('chart-column', '투표 넣기', { size: 'xsmall' })}</div><textarea class="ds-textarea" id="w-body" placeholder="이야기를 나눠 주세요. 다른 멤버를 존중하는 글을 써 주세요."></textarea></div>
      </div>
      <div class="ds-field"><div class="ds-field__header"><span class="ds-field__label">사진</span></div>
        <div class="ds-fileattach"><div class="ds-fileattach__items"><label class="ds-fileattach__trigger"><input type="file" class="ds-fileattach__input" multiple accept="image/*" aria-label="사진 추가">${icon('plus')}<span class="ds-fileattach__count"><b>3</b>/10</span></label>${img(1, '산 사진', true)}${img(4, '바다 사진')}${img(6, '공원 사진')}</div></div>
      </div>
      <div class="tp-opts">
        <label><span class="tp-stack"><span class="tp-h4">댓글 허용</span><span class="tp-caption">끄면 아무도 댓글을 달 수 없어요.</span></span>${sw('댓글 허용', true)}</label>
        <label><span class="tp-stack"><span class="tp-h4">이름 숨기기</span><span class="tp-caption">글쓴이 이름 대신 익명으로 보여요.</span></span>${sw('이름 숨기기')}</label>
      </div>
      ${callout('', '광고, 욕설, 다른 사람의 개인 정보가 담긴 글은 알림 없이 숨겨질 수 있어요.', 'informative')}
    </form>
  </div>
</main>
<div class="tp-wbar"><div class="tp-wbar__in"><span class="tp-caption">자동 저장 14:32</span><div class="tp-row">${btn('임시 저장', { size: 'medium' })}${btn('등록', { variant: 'brandSolid', size: 'medium' })}</div></div></div>
</div>`;
  return { slug: 'community-write', en: 'Write Post', name: '글쓰기', group: 'Community', desc: '커뮤니티에 새 글을 쓰는 화면입니다. 게시판과 말머리를 고른 뒤 글과 사진을 올립니다.', css, body };
};

export const templates = [home(), board(), post(), write()];

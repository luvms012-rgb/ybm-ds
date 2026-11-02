import * as K from './kit.mjs';
const { icon, btn, iconBtn, badge, dot, card, field, input, select, segmented, tabs, search, divider, avatar, avatars, thumb, esc } = K;
const T = (s) => `<span class="tp-num">${s}</span>`;
const inp = (id, v, aria, attrs = '') => input(id, `value="${esc(v)}" aria-label="${esc(aria)}" ${attrs}`, { size: 'small' });

const APP_CSS = `
  .tp-tool { display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: var(--ybm-color-bg-layer-default); }
  .tp-tool__bar { display: flex; align-items: center; gap: var(--ybm-space-x2); min-height: 52px; padding: var(--ybm-space-x2) var(--ybm-space-x3); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); overflow-x: auto; }
  .tp-tool__bar .tp-spacer { flex: 1 1 auto; }
  .tp-tool__body { display: flex; flex: 1 1 auto; min-height: 0; }
  .tp-pane { display: flex; flex-direction: column; gap: var(--ybm-space-x3); min-width: 0; overflow: auto; padding: var(--ybm-space-x3); }
  .tp-pane--left { display: none; flex: none; width: 260px; box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-pane--right { display: none; flex: none; width: 280px; box-shadow: inset 1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-pane--main { flex: 1 1 auto; padding: 0; }
  @media (min-width: 768px) { .tp-pane--left { display: flex; } }
  @media (min-width: 1024px) { .tp-pane--right { display: flex; } }
  .tp-tree { list-style: none; margin: 0; padding: 0; font-size: var(--ybm-font-size-t03); line-height: var(--ybm-line-height-t03); }
  .tp-tree li > span { display: flex; align-items: center; gap: var(--ybm-space-x1_5); min-height: 28px; padding: 0 var(--ybm-space-x2) 0 calc(var(--ybm-space-x2) + var(--d, 0) * 16px); border-radius: var(--ybm-shape-xs); color: var(--ybm-color-fg-neutral-muted); cursor: default; }
  .tp-tree li > span[aria-selected="true"] { background: var(--ybm-color-bg-brand-weak); color: var(--ybm-color-fg-brand); }
  .tp-tree .ds-icon { --ds-icon-size: 16px; flex: none; }
  .tp-tree .tp-tw { width: 16px; display: inline-grid; place-items: center; }
  .tp-label { font-size: var(--ybm-font-size-t02); line-height: var(--ybm-line-height-t02); font-weight: var(--ybm-font-weight-semibold); color: var(--ybm-color-fg-neutral-subtle); text-transform: uppercase; letter-spacing: .02em; }
  .tp-insp { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding-block: var(--ybm-space-x3); box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-insp__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x2); }
  .tp-mini { display: flex; align-items: center; gap: var(--ybm-space-x1); }
  .tp-mini > span { width: 20px; flex: none; color: var(--ybm-color-fg-neutral-subtle); font-size: var(--ybm-font-size-t02); text-align: center; }
  .tp-mini .ds-input { flex: 1 1 auto; min-width: 0; }
`;
const tree = (rows) => `<ul class="tp-tree" role="tree">${rows.map(([d, kind, name, sel, open]) => `<li role="treeitem"${kind === 'f' ? ` aria-expanded="${!!open}"` : ''}><span style="--d:${d}"${sel ? ' aria-selected="true"' : ''}><span class="tp-tw">${kind === 'f' ? icon(open ? 'chevron-down' : 'chevron-right', 'sm') : ''}</span>${icon(kind === 'f' ? (open ? 'folder-open' : 'folder') : kind, 'sm')}${name}</span></li>`).join('')}</ul>`;
const mini = (l, v) => `<label class="tp-mini"><span>${l}</span>${inp('i-' + l + v, v, l)}</label>`;

/* 1. 캔버스 편집기 ---------------------------------------------- */
const canvas = () => {
  const css = APP_CSS + `
  .tp-doc-tab { display: inline-flex; align-items: center; gap: var(--ybm-space-x1_5); height: 32px; padding: 0 var(--ybm-space-x1) 0 var(--ybm-space-x3); border-radius: var(--ybm-shape-sm); color: var(--ybm-color-fg-neutral-muted); font-size: var(--ybm-font-size-t03); white-space: nowrap; }
  .tp-doc-tab[aria-selected="true"] { background: var(--ybm-color-bg-neutral); color: var(--ybm-color-fg-neutral); font-weight: var(--ybm-font-weight-semibold); }
  .tp-stage { position: relative; flex: 1 1 auto; display: grid; place-items: center; min-height: 0; overflow: auto; background: var(--ybm-color-bg-neutral-subtle); background-image: radial-gradient(var(--ybm-color-stroke-neutral-muted) 1px, transparent 1px); background-size: 16px 16px; }
  .tp-artboard { position: relative; width: 340px; aspect-ratio: 3 / 4.4; background: var(--ybm-color-bg-layer-default); box-shadow: 0 8px 32px rgb(0 0 0 / .16); }
  .tp-artboard .ds-imageframe { position: absolute; inset: 22% 8% 16%; width: auto; height: auto; aspect-ratio: auto; border-radius: 0; }
  .tp-artboard__t { position: absolute; left: 8%; top: 4%; right: 8%; font-size: 26px; line-height: 1.05; font-weight: 800; letter-spacing: -0.03em; }
  .tp-artboard__s { position: absolute; left: 8%; bottom: 6%; right: 8%; font-size: 12px; color: var(--ybm-color-fg-neutral-muted); }
  .tp-sel { position: absolute; inset: 22% 8% 16%; outline: 2px solid var(--ybm-color-stroke-brand-solid); }
  .tp-sel i { position: absolute; width: 8px; height: 8px; background: var(--ybm-color-bg-layer-default); box-shadow: inset 0 0 0 2px var(--ybm-color-stroke-brand-solid); }
  .tp-zoom { position: absolute; left: 50%; bottom: var(--ybm-space-x4); transform: translateX(-50%); display: flex; align-items: center; gap: var(--ybm-space-x1); padding: var(--ybm-space-x1); border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-layer-floating); box-shadow: 0 4px 16px rgb(0 0 0 / .12), inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); }
`;
  const handles = ['left:-5px;top:-5px', 'right:-5px;top:-5px', 'left:-5px;bottom:-5px', 'right:-5px;bottom:-5px'].map((p) => `<i style="${p}"></i>`).join('');
  const body = `<div class="tp-tool">
<header class="tp-tool__bar">${iconBtn('menu', '메뉴')}<div class="tp-row" role="tablist" aria-label="열린 문서">${[['가을 특강 포스터', 1], ['브랜드 시트', 0], ['제목 없는 초안', 0]].map(([t, s]) => `<span class="tp-doc-tab" role="tab" aria-selected="${!!s}">${icon('image', 'sm')}${t}${iconBtn('x', t + ' 닫기', { size: 'xsmall' })}</span>`).join('')}</div>${iconBtn('plus', '새 문서')}<span class="tp-spacer"></span><span class="tp-caption">저장됨 · 2분 전</span>${avatars(['김서윤', '이준호'], 24)}${btn('공유', { variant: 'neutralSolid', ic: 'share' })}</header>
<div class="tp-tool__body">
  <aside class="tp-pane tp-pane--left" aria-label="레이어와 에셋">${segmented(['레이어', '에셋'], 0, '왼쪽 패널')}${tree([[0, 'f', '글자', 0, 1], [1, 'type', '제목'], [1, 'type', '날짜와 장소'], [0, 'f', '이미지', 0, 1], [1, 'image', '메인 사진', 1], [1, 'image', '배경 질감'], [0, 'f', '도형', 0, 0], [0, 'layers', '배경']])}</aside>
  <main class="tp-pane tp-pane--main" style="position: relative">
    <div class="tp-stage"><div class="tp-artboard" aria-label="포스터 화면"><span class="tp-artboard__t">가을 특강<br>말하기 집중반</span>${thumb('4:3')}<span class="tp-sel">${handles}</span><span class="tp-artboard__s">11월 12일 토요일 오후 2시 · 종로 캠퍼스 5층</span></div>
    <div class="tp-zoom" role="toolbar" aria-label="보기 도구">${iconBtn('mouse-pointer-2', '선택')}${iconBtn('hand', '이동')}${iconBtn('type', '글자')}${iconBtn('square', '도형')}<span style="width:1px;height:20px;background:var(--ybm-color-stroke-neutral-muted)"></span>${iconBtn('zoom-out', '축소')}<span class="tp-caption tp-num" style="min-width:40px;text-align:center">100%</span>${iconBtn('zoom-in', '확대')}</div></div>
  </main>
  <aside class="tp-pane tp-pane--right" aria-label="속성">
    <div class="tp-between"><span class="tp-h4">메인 사진</span>${badge('이미지')}</div>
    <div class="tp-insp"><span class="tp-label">위치와 크기</span><div class="tp-insp__grid">${mini('X', '27')}${mini('Y', '64')}${mini('W', '286')}${mini('H', '214')}</div></div>
    <div class="tp-insp"><span class="tp-label">모양</span><div class="tp-insp__grid">${mini('R', '0')}${mini('%', '100')}</div></div>
    <div class="tp-insp"><span class="tp-label">필터</span>${[['밝기', 52], ['대비', 64], ['채도', 40]].map(([l, v]) => `<label class="tp-stack"><span class="tp-between"><span class="tp-sub">${l}</span>${T(v)}</span><input type="range" class="ds-slider" value="${v}" aria-label="${l}"></label>`).join('')}</div>
    <div class="tp-insp" style="box-shadow:none"><span class="tp-label">내보내기</span><div class="tp-row">${select('PNG', { size: 'small', aria: '파일 형식' })}${btn('내보내기', { ic: 'download' })}</div></div>
  </aside>
</div>
</div>`;
  return { slug: 'canvas-editor', en: 'Canvas Editor', name: '캔버스 편집기', group: 'Tools', desc: '레이어 패널 위에 문서 탭을 두고, 흐린 바탕 위의 고정 크기 화면을 확대, 축소하며, 오른쪽에 위치, 글자, 필터 속성을 두는 편집기입니다.', css, body };
};

/* 2. 파일 탐색기 (열 보기) ------------------------------------- */
const explorer = () => {
  const css = APP_CSS + `
  .tp-cols { display: flex; flex: 1 1 auto; min-height: 0; overflow-x: auto; }
  .tp-col { flex: none; width: 240px; overflow: auto; padding: var(--ybm-space-x2); box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-col ul { list-style: none; margin: 0; padding: 0; }
  .tp-col li { display: flex; align-items: center; gap: var(--ybm-space-x2); min-height: 32px; padding: 0 var(--ybm-space-x2); border-radius: var(--ybm-shape-xs); font-size: var(--ybm-font-size-t03); color: var(--ybm-color-fg-neutral); }
  .tp-col li .ds-icon { --ds-icon-size: 16px; color: var(--ybm-color-fg-neutral-subtle); }
  .tp-col li > .tp-grow { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .tp-col li[aria-selected="true"] { background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); }
  .tp-col li[aria-selected="true"] .ds-icon { color: inherit; }
  .tp-col li[data-path="true"] { background: var(--ybm-color-bg-neutral); }
  .tp-preview { flex: 1 1 280px; min-width: 280px; display: flex; flex-direction: column; gap: var(--ybm-space-x3); padding: var(--ybm-space-x5); }
  .tp-preview dl { display: grid; grid-template-columns: auto 1fr; gap: var(--ybm-space-x1_5) var(--ybm-space-x4); margin: 0; font-size: var(--ybm-font-size-t03); }
  .tp-preview dt { color: var(--ybm-color-fg-neutral-muted); }
  .tp-preview dd { margin: 0; }
  .tp-sidebar ul { list-style: none; margin: 0; padding: 0; }
  .tp-crumbs { padding: var(--ybm-space-x2) var(--ybm-space-x4); box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
`;
  const col = (items) => `<div class="tp-col"><ul role="listbox">${items.map(([ic, n, st, more]) => `<li role="option"${st === 's' ? ' aria-selected="true"' : st === 'p' ? ' data-path="true"' : ''}>${icon(ic)}<span class="tp-grow">${n}</span>${more ? icon('chevron-right', 'sm') : ''}</li>`).join('')}</ul></div>`;
  const side = [['house', '홈'], ['monitor', '데스크톱'], ['file-text', '문서', 1], ['download', '다운로드'], ['image', '사진'], ['cloud', '클라우드 드라이브']];
  const body = `<div class="tp-tool">
<header class="tp-tool__bar" role="toolbar" aria-label="파일 탐색기">${iconBtn('chevron-left', '뒤로')}${iconBtn('chevron-right', '앞으로')}<span class="tp-h4" style="margin-inline: var(--ybm-space-x2)">2026 강의 자료</span><span class="tp-spacer"></span>${segmented([icon('layout-grid', 'sm'), icon('list', 'sm'), icon('columns-3', 'sm'), icon('image', 'sm')], 2, '보기 방식')}${iconBtn('layers', '묶기')}${iconBtn('share', '공유')}${iconBtn('tag', '태그')}${iconBtn('ellipsis', '더 보기')}<div style="width: 200px">${search('fq', '찾기', 'small')}</div></header>
<div class="tp-tool__body">
  <aside class="tp-pane tp-pane--left tp-sidebar" style="width: 200px" aria-label="즐겨찾기"><span class="tp-label">즐겨찾기</span>${tree(side.map(([ic, n, s]) => [0, ic, n, s]))}<span class="tp-label">태그</span>${tree([[0, 'circle', '중요'], [0, 'circle', '검토 필요'], [0, 'circle', '공유됨']])}</aside>
  <main class="tp-pane tp-pane--main">
    <div class="tp-cols">
      ${col([['folder', '2025 강의 자료', '', 1], ['folder', '2026 강의 자료', 'p', 1], ['folder', '교재 원고', '', 1], ['folder', '행사', '', 1], ['file-text', '연간 계획.pdf']])}
      ${col([['folder', '토익 실전반', 'p', 1], ['folder', '말하기 집중반', '', 1], ['folder', '기업 출강', '', 1], ['file-text', '강사 명단.xlsx'], ['file-text', '시간표.pdf']])}
      ${col([['folder', '1주차', '', 1], ['folder', '2주차', '', 1], ['file-text', '강의 계획서.docx', 's'], ['file-text', '모의고사 1회.pdf'], ['file-text', '모의고사 2회.pdf'], ['video', '오리엔테이션.mp4'], ['image', '표지.png']])}
      <section class="tp-preview" aria-label="미리 보기">${thumb('4:3')}<div class="tp-stack"><span class="tp-h4">강의 계획서.docx</span><span class="tp-caption">Word 문서 · 284KB</span></div><dl><dt>만든 날</dt><dd>2026.09.01</dd><dt>고친 날</dt><dd>2026.10.29 오후 3:12</dd><dt>위치</dt><dd>2026 강의 자료 › 토익 실전반</dd><dt>태그</dt><dd>${badge('중요', 'critical')}</dd></dl><div class="tp-row">${btn('열기', { variant: 'neutralSolid' })}${btn('공유', { ic: 'share' })}</div></section>
    </div>
  </main>
</div>
<footer class="tp-crumbs">${K.breadcrumbs(['문서', '2026 강의 자료', '토익 실전반', '강의 계획서.docx'])}</footer>
</div>`;
  return { slug: 'file-explorer', en: 'File Explorer', name: '파일 탐색기', group: 'Tools', desc: '깊은 폴더를 바꿔 끼우지 않고 옆 칸으로 이어 여는 계층 탐색기입니다. 경로 표시, 보기 방식 전환, 미리 보기 칸이 있습니다.', css, body };
};

/* 3. 코드 편집기 (IDE) ------------------------------------------ */
const ide = () => {
  const code = `import { useState, useCallback } from 'react';
import { Button } from './Button';

export function Counter({ start = 0 }) {
  const [count, setCount] = useState(start);
  const increase = useCallback(() => setCount((n) => n + 1), []);
  const reset = useCallback(() => setCount(start), [start]);

  return (
    <div className="counter">
      <p>지금 숫자: {count}</p>
      <Button label="하나 더" onClick={increase} />
      <Button label="처음으로" variant="secondary" onClick={reset} />
    </div>
  );
}`;
  const css = APP_CSS + `
  .tp-ide-tabs { display: flex; box-shadow: inset 0 -1px 0 var(--ybm-color-stroke-neutral-muted); overflow-x: auto; }
  .tp-ide-tab { display: inline-flex; align-items: center; gap: var(--ybm-space-x1_5); height: 36px; padding: 0 var(--ybm-space-x2) 0 var(--ybm-space-x3); font-size: var(--ybm-font-size-t03); color: var(--ybm-color-fg-neutral-muted); white-space: nowrap; box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-ide-tab[aria-selected="true"] { color: var(--ybm-color-fg-neutral); background: var(--ybm-color-bg-layer-default); box-shadow: inset -1px 0 0 var(--ybm-color-stroke-neutral-muted), inset 0 2px 0 var(--ybm-color-stroke-brand-solid); }
  .tp-code { flex: 1 1 auto; margin: 0; padding: var(--ybm-space-x3) 0; overflow: auto; font-family: var(--ybm-font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 13px; line-height: 20px; counter-reset: ln; }
  .tp-code span { display: block; padding-right: var(--ybm-space-x4); white-space: pre; }
  .tp-code span::before { counter-increment: ln; content: counter(ln); display: inline-block; width: 44px; padding-right: var(--ybm-space-x4); text-align: right; color: var(--ybm-color-fg-neutral-subtle); }
  .tp-code span[data-hl] { background: var(--ybm-color-bg-brand-weak); }
  .tp-term { flex: none; height: 200px; display: flex; flex-direction: column; box-shadow: inset 0 1px 0 var(--ybm-color-stroke-neutral-muted); }
  .tp-term pre { flex: 1 1 auto; margin: 0; padding: var(--ybm-space-x3) var(--ybm-space-x4); overflow: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; line-height: 18px; color: var(--ybm-color-fg-neutral-muted); }
  .tp-term .ds-tabs { padding-inline: var(--ybm-space-x2); }
  .tp-handle-h { height: 6px; cursor: row-resize; display: grid; place-items: center; }
  .tp-handle-h::after { content: ""; width: 32px; height: 4px; border-radius: 2px; background: var(--ybm-color-stroke-neutral-weak); }
  .tp-status { display: flex; gap: var(--ybm-space-x4); padding: var(--ybm-space-x1) var(--ybm-space-x3); background: var(--ybm-color-bg-brand-solid); color: var(--ybm-color-fg-on-brand-solid); font-size: var(--ybm-font-size-t02); }
`;
  const body = `<div class="tp-tool">
<div class="tp-tool__body">
  <aside class="tp-pane tp-pane--left" aria-label="파일">${search('ide-q', '파일 찾기', 'small')}${tree([[0, 'f', 'src', 0, 1], [1, 'f', 'components', 0, 1], [2, 'file-code', 'Button.tsx'], [2, 'file-code', 'Counter.tsx', 1], [2, 'file-code', 'Header.tsx'], [1, 'f', 'hooks', 0, 0], [1, 'f', 'styles', 0, 0], [1, 'file-code', 'App.tsx'], [1, 'file-code', 'main.tsx'], [0, 'f', 'public', 0, 0], [0, 'file', 'package.json'], [0, 'file', 'tsconfig.json'], [0, 'file-text', 'README.md']])}</aside>
  <main class="tp-pane tp-pane--main">
    <div class="tp-ide-tabs" role="tablist" aria-label="열린 파일">${[['Counter.tsx', 1], ['Button.tsx', 0], ['App.tsx', 0]].map(([n, s]) => `<span class="tp-ide-tab" role="tab" aria-selected="${!!s}">${icon('file-code', 'sm')}${n}${iconBtn('x', n + ' 닫기', { size: 'xsmall' })}</span>`).join('')}</div>
    <pre class="tp-code" aria-label="Counter.tsx 코드">${code.split('\n').map((l, i) => `<span${i === 5 ? ' data-hl' : ''}>${esc(l) || ' '}</span>`).join('')}</pre>
    <div class="tp-handle-h" role="separator" aria-label="터미널 크기 조절"></div>
    <section class="tp-term" aria-label="아래 패널"><div class="tp-between" style="padding-right: var(--ybm-space-x2)">${tabs(['터미널', '문제 2', '출력'], 0, '아래 패널')}<div class="tp-row">${iconBtn('plus', '새 터미널', { size: 'xsmall' })}${iconBtn('trash', '지우기', { size: 'xsmall' })}${iconBtn('x', '패널 닫기', { size: 'xsmall' })}</div></div><pre>$ npm run dev

  VITE v6.0.3  ready in 412 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
12:04:18 [vite] hmr update /src/components/Counter.tsx</pre></section>
  </main>
  <aside class="tp-pane tp-pane--right" aria-label="개요">
    <span class="tp-label">개요</span>${tree([[0, 'code', 'Counter'], [1, 'circle', 'count'], [1, 'circle', 'increase'], [1, 'circle', 'reset', 1]])}
    <span class="tp-label">변경 사항</span>${tree([[0, 'file-code', 'Counter.tsx  M'], [0, 'file-code', 'Button.tsx  M']])}${btn('커밋', { variant: 'neutralSolid', fill: true, ic: 'check' })}
  </aside>
</div>
<footer class="tp-status"><span class="tp-row">${icon('git-branch', 'sm')}main</span><span>오류 0 · 경고 2</span><span class="tp-spacer" style="flex:1"></span><span>6줄, 3칸</span><span>UTF-8</span><span>TypeScript React</span></footer>
</div>`;
  return { slug: 'ide', en: 'IDE', name: '코드 편집기', group: 'Tools', desc: '크기를 바꾸고 접을 수 있는 여러 칸으로 빽빽하게 짠 작업 공간입니다. 한쪽에 파일 트리, 가운데 탭 문서, 아래 터미널 서랍, 맨 아래 상태 막대가 있습니다.', css, body };
};

/* 4. 칸반 보드 -------------------------------------------------- */
const kanban = () => {
  const cols = [['neutral', '할 일', [['기획', '높음'], '새 학기 수강 안내 메일 초안', '목표, 대상, 일정을 담은 짧은 안내문을 써요.', '2시간 전 고침 · 7월 8일까지', ['김서윤']], [['리서치', '보통'], '수강생 의견 모으기', '지난 학기 설문에서 주요 의견을 정리해요.', '1일 전 고침 · 7월 11일까지', ['이준호', '박하린']]], ['informative', '진행 중', [['디자인', '높음'], '강좌 상세 화면 시안', '커리큘럼과 후기 영역을 새로 잡아요.', '30분 전 고침 · 7월 9일까지', ['박하린']], [['개발', '보통'], '결제 오류 고치기', '해외 카드 3D 인증 단계 오류', '3시간 전 고침 · 7월 10일까지', ['최민준']], [['콘텐츠', '낮음'], '모의고사 해설 영상 편집', '1~3회 해설을 10분 안으로 줄여요.', '어제 고침', ['정다은']]], ['warning', '검토', [['QA', '높음'], '앱 푸시 알림 점검', '안드로이드 14에서 알림이 늦게 와요.', '4시간 전 고침', ['한지우', '김서윤']]], ['positive', '완료', [['운영', '보통'], '9월 정산 마감', '기업 고객 12곳 정산 끝', '2일 전 고침', ['윤도현']], [['디자인', '낮음'], '아이콘 정리', '쓰지 않는 아이콘 18개 삭제', '3일 전 고침', ['박하린']]]];
  const css = APP_CSS + `
  .tp-board { display: flex; gap: var(--ybm-space-x3); flex: 1 1 auto; min-height: 0; padding: var(--ybm-space-x4); overflow-x: auto; background: var(--ybm-color-bg-neutral-subtle); }
  .tp-lane { display: flex; flex-direction: column; flex: none; width: 300px; max-height: 100%; border-radius: var(--ybm-shape-xl); background: var(--ybm-color-bg-neutral); }
  .tp-lane__head { display: flex; align-items: center; justify-content: space-between; padding: var(--ybm-space-x3) var(--ybm-space-x3) var(--ybm-space-x2); }
  .tp-lane__body { display: flex; flex-direction: column; gap: var(--ybm-space-x2); padding: 0 var(--ybm-space-x2) var(--ybm-space-x2); overflow: auto; }
  .tp-kcard { cursor: grab; }
  .tp-kcard[data-dragging] { transform: rotate(2deg); box-shadow: 0 8px 24px rgb(0 0 0 / .16); }
`;
  const body = `<div class="tp-tool">
<header class="tp-tool__bar" role="toolbar" aria-label="보드 동작"><h1 class="tp-h3">스프린트 보드</h1>${badge('8')}<span style="width: 160px">${select('스프린트 24', { size: 'small', aria: '스프린트' })}</span><span class="tp-spacer"></span>${iconBtn('arrow-up-down', '정렬')}${iconBtn('funnel', '거르기')}${iconBtn('users', '담당자')}${iconBtn('settings', '보드 설정')}${btn('할 일 추가', { variant: 'neutralSolid', ic: 'plus' })}</header>
<main class="tp-board">${cols.map(([tone, t, ...cards]) => `<section class="tp-lane" aria-label="${t}"><div class="tp-lane__head"><span class="tp-row">${dot(tone, t + ' 상태')}<h2 class="tp-h4">${t}</h2></span><span class="tp-row"><span class="tp-caption tp-num">${cards.length}</span>${iconBtn('plus', t + '에 추가', { size: 'xsmall' })}</span></div><div class="tp-lane__body">${cards.map(([[c, p], h, d, m, who], i) => card(`<div class="tp-between"><span class="tp-row">${badge(c)}${badge(p, p === '높음' ? 'critical' : p === '보통' ? 'warning' : 'neutral')}</span>${iconBtn('ellipsis', '할 일 동작', { size: 'xsmall' })}</div><div class="tp-stack"><h3 class="tp-h4">${h}</h3><p class="tp-sub">${d}</p></div><div class="tp-between"><span class="tp-caption">${m}</span>${avatars(who, 20)}</div>`, { cls: 'tp-kcard', tag: 'article', attrs: tone === 'informative' && i === 1 ? 'data-dragging' : '' })).join('')}</div></section>`).join('')}</main>
</div>`;
  return { slug: 'kanban-board', canvas: false, en: 'Kanban Board', name: '칸반 보드', group: 'Tools', desc: '열 자체가 상태인 가로 칸반입니다. 카드를 다른 열로 끌어다 놓으면 상태가 바뀝니다. 열은 고정이고 카드 높이는 내용에 따라 달라집니다.', css, body };
};

/* 5. 페이지 편집기 --------------------------------------------- */
const pageEditor = () => {
  const blocks = [['type', '제목'], ['text-align-start', '글'], ['image', '이미지'], ['square', '버튼'], ['layout-grid', '카드 묶음'], ['list', '표'], ['chart-line', '그래프'], ['minus', '구분선']];
  const layers = ['머리글', '요약 카드', '최근 결제 표', '바닥글'];
  const tx = [['가 카페', '음식', '오늘', '-6,500원'], ['나 서점', '교육', '어제', '-24,000원'], ['월급', '수입', '10.25', '+3,200,000원'], ['다 마트', '생활', '10.24', '-58,200원'], ['라 주유소', '교통', '10.23', '-70,000원']];
  const css = APP_CSS + `
  .tp-pane--left { width: 300px; }
  .tp-blocks { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ybm-space-x2); }
  .tp-blocks li { display: flex; align-items: center; gap: var(--ybm-space-x2); padding: var(--ybm-space-x2) var(--ybm-space-x3); border-radius: var(--ybm-shape-md); box-shadow: inset 0 0 0 1px var(--ybm-color-stroke-neutral-muted); font-size: var(--ybm-font-size-t03); cursor: grab; }
  .tp-layer { display: flex; align-items: center; gap: var(--ybm-space-x2); min-height: 36px; padding: 0 var(--ybm-space-x2); border-radius: var(--ybm-shape-sm); font-size: var(--ybm-font-size-t03); }
  .tp-layer[aria-selected="true"] { background: var(--ybm-color-bg-brand-weak); color: var(--ybm-color-fg-brand); }
  .tp-layer .tp-grow { flex: 1 1 auto; }
  .tp-canvas { flex: 1 1 auto; overflow: auto; padding: var(--ybm-space-x8) var(--ybm-space-x6); background: var(--ybm-color-bg-neutral-subtle); }
  .tp-page { display: flex; flex-direction: column; gap: var(--ybm-space-x4); width: min(100%, 880px); margin-inline: auto; padding: var(--ybm-space-x6); border-radius: var(--ybm-shape-lg); background: var(--ybm-color-bg-layer-default); box-shadow: 0 4px 24px rgb(0 0 0 / .08); }
  .tp-picked { outline: 2px solid var(--ybm-color-stroke-brand-solid); outline-offset: 4px; border-radius: var(--ybm-shape-sm); }
`;
  const body = `<div class="tp-tool">
<header class="tp-tool__bar"><h1 class="tp-h4">페이지 편집기</h1><span class="tp-spacer"></span>${segmented([icon('monitor', 'sm'), icon('panel-right', 'sm'), icon('smartphone', 'sm')], 0, '화면 크기')}${iconBtn('undo-2', '되돌리기')}${iconBtn('redo-2', '다시 하기')}${btn('미리 보기', { ic: 'eye' })}${btn('게시', { variant: 'brandSolid' })}</header>
<div class="tp-tool__body">
  <aside class="tp-pane tp-pane--left" aria-label="블록과 레이어">${tabs(['블록', '설정'], 0, '왼쪽 패널')}<span class="tp-label">블록 넣기</span><ul class="tp-blocks">${blocks.map(([ic, t]) => `<li draggable="true">${icon(ic, 'sm')}${t}</li>`).join('')}</ul><span class="tp-label">레이어</span><div>${layers.map((t, i) => `<div class="tp-layer"${i === 2 ? ' aria-selected="true"' : ''}>${icon('grip-vertical', 'sm')}<span class="tp-grow">${t}</span>${iconBtn('arrow-up', t + ' 위로', { size: 'xsmall' })}${iconBtn('arrow-down', t + ' 아래로', { size: 'xsmall' })}</div>`).join('')}</div></aside>
  <main class="tp-pane tp-pane--main"><div class="tp-canvas"><div class="tp-page">
    <div class="tp-between"><span class="tp-h2">내 가계부</span>${btn('내보내기', { ic: 'download' })}</div>
    <div class="tp-g3">${[['이번 달 수입', '320만원'], ['이번 달 지출', '158만원'], ['남은 예산', '42만원']].map(([l, v]) => K.kpi(l, v)).join('')}</div>
    <div class="tp-picked">${card(`<div class="tp-between"><div class="tp-stack"><h3 class="tp-h3">최근 결제</h3><span class="tp-sub">최근 계좌 활동이에요.</span></div>${btn('전체 보기')}</div>${K.table(['내역', '분류', '날짜', ['금액', 'end']], tx.map(([n, c, d, a]) => [n, badge(c), T(d), T(a)]))}`)}</div>
  </div></div></main>
  <aside class="tp-pane tp-pane--right" aria-label="속성"><div class="tp-between"><span class="tp-h4">최근 결제 표</span>${iconBtn('trash', '블록 지우기', { size: 'xsmall' })}</div>${field('pe-t', '제목', inp('pe-t', '최근 결제', '제목'))}${field('pe-n', '보여 줄 행 수', select('5개', { id: 'pe-n', size: 'small' }))}<label class="tp-between"><span class="tp-sub">전체 보기 버튼</span>${K.sw('전체 보기 버튼', true)}</label><label class="tp-between"><span class="tp-sub">분류 배지</span>${K.sw('분류 배지', true)}</label>${field('pe-pad', '안쪽 여백', segmented(['좁게', '보통', '넓게'], 1, '안쪽 여백'))}</aside>
</div>
</div>`;
  return { slug: 'editor', en: 'Page Editor', name: '페이지 편집기', group: 'Tools', desc: '왼쪽에 블록 모음, 가운데 실제 화면, 오른쪽에 고른 것에 맞게 바뀌는 속성 패널을 둔 세 칸 편집기입니다. 끌어다 놓아 화면을 만듭니다.', css, body };
};

export const templates = [canvas, explorer, ide, kanban, pageEditor].map((f) => f());

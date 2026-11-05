// 자동 생성 - node sync.mjs docpage action-button (2026-11-05) · fileKey 1VCEsFU3xMWuXIntIrZz9i · 문서 프레임 2481:2
const DATA = {"frame":"2481:2","comp":{"no":"01","name":"Action Button","slug":"action-button","doc":"2481:2","desc":"누르면 바로 동작을 실행하는 기본 버튼입니다.","dos":[[1,"강조 버튼(High emphasis)은 한 화면에 하나만 둡니다."],[0,"버튼을 세 개 넘게 나란히 두지 않습니다."]],"page":{"usage":"<button class=\"ds-btn\" data-variant=\"neutralWeak\" data-size=\"large\">\n  [<i class=\"ds-icon ds-icon--plus\" aria-hidden=\"true\"></i>] 라벨 [<i class=\"ds-icon …\">]\n</button>","props":[["variant","brandSolid brandOutline neutralSolid neutralWeak neutralOutline criticalSolid ghost"],["size","xsmall small medium large"],["layout","iconOnly"],["width","fill"]],"propsRest":"","behavior":[],"examples":[{"title":"강조 버튼은 화면에 하나만 두기","desc":"화면에서 가장 중요한 동작 하나만 brandSolid로 두고, 나머지는 neutralWeak로 낮춥니다. 강조 버튼이 둘이면 무엇을 먼저 눌러야 할지 알기 어렵습니다.","wide":true,"code":"<div class=\"u-col u-gap-4\" style=\"width: 100%; max-width: 420px\">\n  <div class=\"u-flex u-center u-between\">\n    <span class=\"ds-t04 ds-fg-muted\">총 결제 금액</span>\n    <strong class=\"ds-t07 ds-fw-bold\">32,000원</strong>\n  </div>\n  <div class=\"u-flex u-gap-2\">\n    <button class=\"ds-btn\" data-variant=\"neutralWeak\" data-size=\"large\" data-width=\"fill\">장바구니 담기</button>\n    <button class=\"ds-btn\" data-size=\"large\" data-width=\"fill\">바로 구매하기</button>\n  </div>\n</div>","tree":[{"tag":"div","cls":["u-col","u-gap-4"],"a":{"style":"width: 100%; max-width: 420px"},"c":[{"tag":"div","cls":["u-flex","u-center","u-between"],"a":{},"c":[{"tag":"span","cls":["ds-t04","ds-fg-muted"],"a":{},"c":["총 결제 금액"]},{"tag":"strong","cls":["ds-t07","ds-fw-bold"],"a":{},"c":["32,000원"]}]},{"tag":"div","cls":["u-flex","u-gap-2"],"a":{},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralWeak","data-size":"large","data-width":"fill"},"c":["장바구니 담기"]},{"tag":"button","cls":["ds-btn"],"a":{"data-size":"large","data-width":"fill"},"c":["바로 구매하기"]}]}]}]},{"title":"버튼은 세 개까지, 나머지는 아이콘으로","desc":"나란히 두는 버튼은 세 개까지로 하고, 찜이나 공유처럼 가끔 쓰는 동작은 아이콘 버튼으로 작게 둡니다. 아이콘만 있는 버튼에는 aria-label 로 이름을 붙입니다.","wide":true,"code":"<div class=\"u-col u-gap-4\" style=\"width: 100%; max-width: 420px\">\n  <strong class=\"ds-t06 ds-fw-bold\">영어 회화 첫걸음</strong>\n  <div class=\"u-flex u-gap-2\">\n    <button class=\"ds-btn\" data-variant=\"neutralOutline\" data-size=\"large\" data-layout=\"iconOnly\" aria-label=\"찜하기\"><i class=\"ds-icon ds-icon--heart\" aria-hidden=\"true\"></i></button>\n    <button class=\"ds-btn\" data-variant=\"neutralOutline\" data-size=\"large\" data-layout=\"iconOnly\" aria-label=\"공유하기\"><i class=\"ds-icon ds-icon--share\" aria-hidden=\"true\"></i></button>\n    <button class=\"ds-btn\" data-size=\"large\" data-width=\"fill\">수강 신청하기</button>\n  </div>\n</div>","tree":[{"tag":"div","cls":["u-col","u-gap-4"],"a":{"style":"width: 100%; max-width: 420px"},"c":[{"tag":"strong","cls":["ds-t06","ds-fw-bold"],"a":{},"c":["영어 회화 첫걸음"]},{"tag":"div","cls":["u-flex","u-gap-2"],"a":{},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralOutline","data-size":"large","data-layout":"iconOnly","aria-label":"찜하기"},"c":[{"tag":"i","cls":["ds-icon","ds-icon--heart"],"a":{"aria-hidden":"true"},"c":[]}]},{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralOutline","data-size":"large","data-layout":"iconOnly","aria-label":"공유하기"},"c":[{"tag":"i","cls":["ds-icon","ds-icon--share"],"a":{"aria-hidden":"true"},"c":[]}]},{"tag":"button","cls":["ds-btn"],"a":{"data-size":"large","data-width":"fill"},"c":["수강 신청하기"]}]}]}]},{"title":"목록 줄 안에서는 작은 보조 버튼으로","desc":"줄마다 놓는 버튼은 small 크기의 neutralWeak로 두어 줄마다 강조가 생기지 않게 합니다. 줄 안에 버튼이 있으면 줄 전체를 링크로 만들지 않습니다.","wide":true,"code":"<ul class=\"ds-list\" data-variant=\"inset\" data-divider style=\"width: 100%; max-width: 420px\">\n  <li>\n    <div class=\"ds-list-item\">\n      <span class=\"ds-list-item__content\">\n        <span class=\"ds-list-item__title\">무선 이어폰</span>\n        <span class=\"ds-list-item__desc\">11월 2일 도착</span>\n      </span>\n      <span class=\"ds-list-item__suffix\"><button class=\"ds-btn\" data-variant=\"neutralWeak\" data-size=\"small\">리뷰 쓰기</button></span>\n    </div>\n  </li>\n  <li>\n    <div class=\"ds-list-item\">\n      <span class=\"ds-list-item__content\">\n        <span class=\"ds-list-item__title\">보온 텀블러</span>\n        <span class=\"ds-list-item__desc\">내일 도착 예정</span>\n      </span>\n      <span class=\"ds-list-item__suffix\"><button class=\"ds-btn\" data-variant=\"neutralWeak\" data-size=\"small\">배송 조회</button></span>\n    </div>\n  </li>\n  <li>\n    <div class=\"ds-list-item\">\n      <span class=\"ds-list-item__content\">\n        <span class=\"ds-list-item__title\">노트 3권 세트</span>\n        <span class=\"ds-list-item__desc\">10월 28일 도착</span>\n      </span>\n      <span class=\"ds-list-item__suffix\"><button class=\"ds-btn\" data-variant=\"neutralWeak\" data-size=\"small\">다시 담기</button></span>\n    </div>\n  </li>\n</ul>","tree":[{"tag":"ul","cls":["ds-list"],"a":{"data-variant":"inset","data-divider":"","style":"width: 100%; max-width: 420px"},"c":[{"tag":"li","cls":[],"a":{},"c":[{"tag":"div","cls":["ds-list-item"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__content"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__title"],"a":{},"c":["무선 이어폰"]},{"tag":"span","cls":["ds-list-item__desc"],"a":{},"c":["11월 2일 도착"]}]},{"tag":"span","cls":["ds-list-item__suffix"],"a":{},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralWeak","data-size":"small"},"c":["리뷰 쓰기"]}]}]}]},{"tag":"li","cls":[],"a":{},"c":[{"tag":"div","cls":["ds-list-item"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__content"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__title"],"a":{},"c":["보온 텀블러"]},{"tag":"span","cls":["ds-list-item__desc"],"a":{},"c":["내일 도착 예정"]}]},{"tag":"span","cls":["ds-list-item__suffix"],"a":{},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralWeak","data-size":"small"},"c":["배송 조회"]}]}]}]},{"tag":"li","cls":[],"a":{},"c":[{"tag":"div","cls":["ds-list-item"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__content"],"a":{},"c":[{"tag":"span","cls":["ds-list-item__title"],"a":{},"c":["노트 3권 세트"]},{"tag":"span","cls":["ds-list-item__desc"],"a":{},"c":["10월 28일 도착"]}]},{"tag":"span","cls":["ds-list-item__suffix"],"a":{},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralWeak","data-size":"small"},"c":["다시 담기"]}]}]}]}]}]}],"cover":[{"tag":"div","cls":[],"a":{"style":"display:flex;align-items:center;gap:8px"},"c":[{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"neutralWeak","data-size":"large"},"c":["취소"]},{"tag":"button","cls":["ds-btn"],"a":{"data-variant":"brandSolid","data-size":"large"},"c":["결제하기"]}]}],"vars":[["--ds-btn-height","40px"],["--ds-btn-padding-x","var(--ds-space-x4)"],["--ds-btn-radius","var(--ds-shape-sm)"],["--ds-btn-gap","var(--ds-space-x1_5)"],["--ds-btn-font-size","var(--ds-font-size-t04)"],["--ds-btn-line-height","var(--ds-line-height-t04)"],["--ds-btn-font-weight","var(--ds-font-weight-semibold)"],["--ds-btn-icon","18px"],["--ds-btn-icon-only","20px"],["--ds-btn-bg","var(--ds-color-bg-brand-solid)"],["--ds-btn-bg-pressed","var(--ds-color-bg-brand-solid-pressed)"],["--ds-btn-fg","var(--ds-color-fg-on-brand-solid)"],["--ds-btn-border","transparent"]],"spec":"variant : brandSolid(기본) / neutralSolid / neutralWeak / criticalSolid / brandOutline / neutralOutline / ghost\nsize    : xsmall 32 / small 36 / medium 40(기본) / large 52\nlayout  : 기본 withText / data-layout=\"iconOnly\" / data-width=\"fill\"\nFigma: xsmall px14 gap4 t02 Medium shape/xs (iconOnly pill) / icon 16\n       small  px14 gap4 t04 SemiBold shape/sm / icon 16 (iconOnly 18)\n       medium px16 gap6 t04 SemiBold shape/sm / icon 18 (iconOnly 20)\n       large  px20 gap8 t06 SemiBold shape/md / icon 24","defaults":{"variant":"brandSolid","size":"medium","layout":"withText"}}},"sets":{"ds-btn":"24:354","ds-list-item":"2350:1207"},"defaults":{"ds-btn":{"variant":"brandSolid","size":"medium","layout":"withText"},"ds-list-item":{"variant":"plain","size":"medium"}},"mainSets":["24:354"],"mainClass":"ds-btn","links":{"docs":"https://luvms012-rgb.github.io/yds/site/components/action-button.html","code":"https://github.com/luvms012-rgb/yds/blob/main/dist/components.css#L101-L174"}};
// Figma 쪽 실행 코드 - 컴포넌트 문서 프레임 한 개를 사이트 컴포넌트 페이지와 같은 구성으로 다시 그린다.
// node sync.mjs docpage <slug> 가 맨 위에 DATA 를 붙여 tokens/.figma-docpage.js 를 만든다. 같은 이름의 노드를 지우고 다시 만들어서 몇 번 실행해도 결과가 같다.
// 순서(사이트와 같음): 머리말 → 대표 그림 → 사용법 → 속성(+ 속성별 모양) → 동작 → 사용 지침 → 예시(미리보기 + 코드) → 규격(CSS 변수, 크기와 여백) → Master Components
// 2026-11-05 Action Button 을 기준으로 만듦. 예시 HTML 은 DS 클래스를 Figma 컴포넌트 인스턴스로, u-* 배치를 자동 배치로 그린다.
const C = DATA.comp, P = C.page;
const frame = await figma.getNodeByIdAsync(DATA.frame);
await figma.setCurrentPageAsync(frame.parent.type === 'PAGE' ? frame.parent : figma.currentPage);
const iconPage = figma.root.children.find((p) => p.name === 'Iconography'); await iconPage.loadAsync();
const res = { frame: frame.id, created: [], warn: [] };
const styles = Object.fromEntries((await figma.getLocalTextStylesAsync()).map((s) => [s.name, s]));
const st = (n) => { if (!styles[n]) throw new Error('글자 스타일 없음: ' + n); return styles[n]; };
const T = { section: st('Static/t07/4 Bold'), sub: st('Static/t06/4 Bold'), lead: st('Static/t05/1 Regular'), body: st('Static/t04/1 Regular'), head: st('Static/t04/2 Medium'), cap: st('Static/t02/1 Regular'), title: st('Static/t05/4 Bold') };
for (const s of Object.values(T)) await figma.loadFontAsync(s.fontName);
// 코드 글꼴: Roboto Mono 에는 한글이 없어 한글 고정폭 NanumGothicCoding 을 쓴다
const MONO = { family: 'NanumGothicCoding', style: 'Regular' }, MONO_M = MONO;
await figma.loadFontAsync(MONO); await figma.loadFontAsync(MONO_M);
const allVars = await figma.variables.getLocalVariablesAsync();
const V = Object.fromEntries(allVars.map((v) => [v.name, v]));
const paint = (name) => { if (!V[name]) throw new Error('색 변수 없음: ' + name); return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', V[name]); };
const DIM = {}; for (const v of allVars) if (/^dimension\/x/.test(v.name)) DIM[Object.values(v.valuesByMode)[0]] = v;
const space = (node, field, px) => { node[field] = px; if (DIM[px]) node.setBoundVariable(field, DIM[px]); };
const radius = (node, name) => { for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) node.setBoundVariable(f, V[name]); };
const PREFIX = 'Doc - ';

// ---------- 기본 조각
function text(chars, style, color = 'fg/neutral', name = 'Text') {
  const t = figma.createText(); t.textStyleId = style.id; t.characters = String(chars); t.fills = [paint(color)]; t.name = name; return t;
}
function mono(chars, size = 't04', color = 'fg/neutral', font = MONO) {
  const t = figma.createText(); t.fontName = font; t.characters = String(chars); t.fills = [paint(color)];
  t.setBoundVariable('fontSize', V['fontSize/' + size]); t.setBoundVariable('lineHeight', V['lineHeight/' + size]); t.name = 'Code'; return t;
}
function box(dir, name, opts = {}) {
  const f = figma.createAutoLayout(dir); f.name = name; f.fills = opts.fill ? [paint(opts.fill)] : [];
  if (opts.gap !== undefined) space(f, 'itemSpacing', opts.gap);
  if (opts.pad !== undefined) { const p = !Array.isArray(opts.pad) ? [opts.pad, opts.pad, opts.pad, opts.pad] : opts.pad.length === 2 ? [opts.pad[0], opts.pad[1], opts.pad[0], opts.pad[1]] : opts.pad; space(f, 'paddingTop', p[0]); space(f, 'paddingRight', p[1]); space(f, 'paddingBottom', p[2]); space(f, 'paddingLeft', p[3]); }
  if (opts.radius) radius(f, opts.radius);
  if (opts.stroke) { f.strokes = [paint(opts.stroke)]; f.strokeWeight = 1; f.strokeAlign = 'INSIDE'; }
  return f;
}
const add = (parent, child, fill) => { parent.appendChild(child); if (fill) child.layoutSizingHorizontal = 'FILL'; if (child.type === 'TEXT' && fill) child.textAutoResize = 'HEIGHT'; return child; };
function bottomLine(f, on) { f.strokes = [paint('stroke/neutral-muted')]; f.strokeAlign = 'INSIDE'; f.strokeTopWeight = 0; f.strokeLeftWeight = 0; f.strokeRightWeight = 0; f.strokeBottomWeight = on ? 1 : 0; }

// 코드 상자 (사이트 코드 상자, 11-05: 흰 바탕 + 옅은 테두리, 옅은 회색 머리 줄 44 에 언어 이름). flat 은 예시 상자 안 (테두리 없이 위 구분선)
function codeBox(code, lang = 'html', name = 'Code Box', flat = false) {
  const f = box('VERTICAL', name, flat ? { fill: 'bg/layer-default' } : { fill: 'bg/layer-default', radius: 'shape/lg', stroke: 'stroke/neutral-weak' }); f.clipsContent = true;
  if (flat) { f.strokes = [paint('stroke/neutral-muted')]; f.strokeAlign = 'INSIDE'; f.strokeTopWeight = 1; f.strokeLeftWeight = 0; f.strokeRightWeight = 0; f.strokeBottomWeight = 0; }
  const h = box('HORIZONTAL', 'Header', { fill: 'bg/neutral-weak-alpha', pad: [8, 16] }); h.counterAxisAlignItems = 'CENTER';
  add(f, h, true); h.resize(h.width, 44); h.layoutSizingVertical = 'FIXED'; h.layoutSizingHorizontal = 'FILL'; add(h, mono(lang, 't02', 'fg/neutral-muted'));
  const body = box('VERTICAL', 'Body', { pad: [12, 16] }); add(f, body, true);
  add(body, mono(code.replace(/\s+$/, ''), 't04'), true);
  return f;
}
// 표 (사이트 표: 흰 바탕, 테두리, 머리 줄, 줄 사이 선). cells 는 문자열 또는 노드를 만드는 함수
function table(head, rows, widths, name = 'Table') {
  const t = box('VERTICAL', name, { fill: 'bg/layer-default', radius: 'shape/lg', stroke: 'stroke/neutral-weak' }); t.clipsContent = true;
  const all = [head, ...rows];
  all.forEach((r, i) => {
    const row = box('HORIZONTAL', i ? 'Row' : 'Head', { pad: [i ? 14 : 12, 20], gap: 24 }); row.counterAxisAlignItems = 'CENTER';
    add(t, row, true); bottomLine(row, i < all.length - 1);
    r.forEach((cell, j) => {
      const node = typeof cell === 'function' ? cell() : text(cell, i ? T.lead : T.head, i ? 'fg/neutral' : 'fg/neutral-muted', i ? 'Cell' : 'Head Cell');
      row.appendChild(node);
      if (widths[j]) { if (node.type === 'TEXT') { node.textAutoResize = 'HEIGHT'; node.resize(widths[j], node.height); } else node.resize(widths[j], node.height); node.layoutSizingHorizontal = 'FIXED'; if (node.type !== 'TEXT') node.layoutSizingVertical = 'HUG'; }
      else { node.layoutSizingHorizontal = 'FILL'; if (node.type === 'TEXT') node.textAutoResize = 'HEIGHT'; }
    });
  });
  return t;
}
const codeCell = (s) => () => mono(s, 't04', 'fg/neutral');
function section(title, lead) {
  const s = box('VERTICAL', PREFIX + title, { gap: 16, pad: [0, 0, 72, 0] });
  add(s, text(title, T.section, 'fg/neutral', 'Section Header'));
  if (lead) add(s, text(lead, T.lead, 'fg/neutral-muted', 'Lead'), true);
  return s;
}

// ---------- 컴포넌트 찾기와 인스턴스
const SET = {};
for (const [cls, id] of Object.entries(DATA.sets)) { const n = await figma.getNodeByIdAsync(id); if (n) SET[cls] = n; }
const iconCache = {};
const iconOf = (name) => { if (!(name in iconCache)) { const s = iconPage.findOne((n) => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name === 'Lucide/' + name); iconCache[name] = s ? (s.type === 'COMPONENT_SET' ? s.defaultVariant || s.children[0] : s) : null; if (!s) res.warn.push('아이콘 없음: ' + name); } return iconCache[name]; };
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const ownText = (el) => el.c.filter((x) => typeof x === 'string').join(' ').trim();
const iconsIn = (el) => el.c.filter((x) => typeof x !== 'string' && x.cls.some((c) => /^ds-icon--/.test(c))).map((x) => ({ name: x.cls.find((c) => /^ds-icon--/.test(c) && !/^ds-icon--(sm|lg)$/.test(c)).slice(9), before: el.c.indexOf(x) < el.c.findIndex((y) => typeof y === 'string') || el.c.findIndex((y) => typeof y === 'string') < 0 }));
function instanceFor(el, set, defaults) {
  const defs = set.componentPropertyDefinitions, props = {};
  for (const [k, d] of Object.entries(defs)) {
    if (d.type !== 'VARIANT') continue;
    let v = el.a['data-' + kebab(k)];
    if (k === 'state' && (el.a.disabled !== undefined || el.a['aria-disabled'] === 'true')) v = 'disabled';
    if (k === 'layout' && !v) v = ownText(el) || !iconsIn(el).length ? undefined : 'iconOnly';
    if (!v || !d.variantOptions.includes(v)) v = defaults[k] && d.variantOptions.includes(defaults[k]) ? defaults[k] : d.variantOptions.includes('enabled') && k === 'state' ? 'enabled' : undefined;
    if (v) props[k] = v;
  }
  const variant = set.children.find((c) => Object.entries(props).every(([k, v]) => c.variantProperties[k] === v)) || set.defaultVariant;
  const inst = variant.createInstance();
  const extra = {};
  const label = ownText(el), icons = iconsIn(el);
  for (const [k, d] of Object.entries(inst.componentProperties)) {
    const base = k.split('#')[0];
    if (d.type === 'TEXT' && /^(label|title|text)$/.test(base) && label) extra[k] = label;
    if (d.type === 'BOOLEAN' && /^prefix icon$/.test(base)) extra[k] = !!icons.find((i) => i.before) && !!label;
    if (d.type === 'BOOLEAN' && /^suffix icon$/.test(base)) extra[k] = !!icons.find((i) => !i.before) && !!label;
  }
  for (const [k, d] of Object.entries(inst.componentProperties)) {
    if (d.type !== 'INSTANCE_SWAP') continue;
    const base = k.split('#')[0];
    const ic = base === 'icon' && !label ? icons[0] : base === 'prefix' ? icons.find((i) => i.before) : base === 'suffix' ? icons.find((i) => !i.before) : null;
    if (ic && iconOf(ic.name)) extra[k] = iconOf(ic.name).id;
  }
  if (Object.keys(extra).length) inst.setProperties(extra);
  return inst;
}
// 목록 줄(List Item) 안에 DS 부품이 든 suffix: 줄 인스턴스 + 부품을 한 줄로 묶는다 (Figma List Item 의 suffix 는 글자만 받는다)
async function listItem(el, parent, divider) {
  const set = SET['ds-list-item']; const find = (cls) => { let r = null; const walk = (n) => { if (typeof n !== 'string') { if (n.cls.includes(cls)) r = r || n; n.c.forEach(walk); } }; walk(el); return r; };
  const title = find('ds-list-item__title'), desc = find('ds-list-item__desc'), suffix = find('ds-list-item__suffix');
  const inst = set.defaultVariant.createInstance();
  const p = {}; for (const k of Object.keys(inst.componentProperties)) { const b = k.split('#')[0];
    if (b === 'title' && title) p[k] = ownText(title); if (b === 'description text' && desc) p[k] = ownText(desc); if (b === 'description') p[k] = !!desc;
    if (b === 'prefix icon') p[k] = false; if (b === 'chevron') p[k] = false; if (b === 'suffix') p[k] = !!(suffix && suffix.c.every((x) => typeof x === 'string')); if (b === 'suffix text' && suffix && suffix.c.every((x) => typeof x === 'string')) p[k] = ownText(suffix); if (b === 'divider') p[k] = false; }
  inst.setProperties(p);
  const comp = suffix && suffix.c.find((x) => typeof x !== 'string');
  if (!comp) { add(parent, inst, true); if (divider) bottomLine(inst, true); return; }
  const row = box('HORIZONTAL', 'List Item + ' + (comp.cls[0] || 'suffix'), { pad: [0, 16, 0, 0] }); row.counterAxisAlignItems = 'CENTER';
  add(parent, row, true); add(row, inst); inst.layoutSizingHorizontal = 'FILL';
  await render(comp, row, {});
  if (divider) bottomLine(row, true);
}
// HTML 나무 → Figma
const TSTYLE = (cls) => { const t = (cls.find((c) => /^ds-t\d\d$/.test(c)) || 'ds-t05').slice(3); const w = cls.includes('ds-fw-bold') ? '4 Bold' : cls.includes('ds-fw-semibold') ? '3 SemiBold' : cls.includes('ds-fw-medium') ? '2 Medium' : '1 Regular'; return styles['Scale/' + t + '/' + w] || styles['Static/' + t + '/' + w]; };
const TCOLOR = (cls) => cls.includes('ds-fg-muted') ? 'fg/neutral-muted' : cls.includes('ds-fg-subtle') ? 'fg/neutral-subtle' : 'fg/neutral';
async function render(el, parent, ctx) {
  if (typeof el === 'string') { const s = TSTYLE(ctx.cls || []); await figma.loadFontAsync(s.fontName); add(parent, text(el.trim(), s, TCOLOR(ctx.cls || []))); return; }
  const setCls = el.cls.find((c) => SET[c] && c !== 'ds-list-item');
  if (setCls) {
    const inst = instanceFor(el, SET[setCls], (DATA.defaults[setCls] || {}));
    parent.appendChild(inst);
    if ((el.a['data-width'] === 'fill' || el.cls.includes('u-grow') || el.cls.includes('u-full')) && parent.layoutMode && parent.layoutMode !== 'NONE') inst.layoutSizingHorizontal = 'FILL';
    return inst;
  }
  if (el.cls.includes('ds-list')) {
    const inset = el.a['data-variant'] === 'inset';
    const l = box('VERTICAL', 'List', inset ? { fill: 'bg/layer-default', radius: 'shape/xl', stroke: 'stroke/neutral-weak' } : {}); l.clipsContent = true;
    parent.appendChild(l); fit(l, el, parent);
    const items = el.c.filter((x) => typeof x !== 'string');
    for (let i = 0; i < items.length; i++) { const li = items[i]; const it = li.cls.includes('ds-list-item') ? li : li.c.find((x) => typeof x !== 'string' && x.cls.includes('ds-list-item')); if (it) await listItem(it, l, el.a['data-divider'] !== undefined && i < items.length - 1); }
    return l;
  }
  const kids = el.c;
  const isText = kids.every((x) => typeof x === 'string') && kids.length;
  if (isText && !el.cls.some((c) => /^u-(flex|col)$/.test(c))) {
    const s = TSTYLE(el.cls); await figma.loadFontAsync(s.fontName);
    const t = text(ownText(el), s, TCOLOR(el.cls), el.tag); parent.appendChild(t); return t;
  }
  const st0 = el.a.style || '';
  const dir = el.cls.includes('u-col') || /flex-direction:\s*column/.test(st0) ? 'VERTICAL' : el.cls.includes('u-flex') || /display:\s*(inline-)?flex/.test(st0) ? 'HORIZONTAL' : (el.tag === 'span' ? 'HORIZONTAL' : 'VERTICAL');
  const f = box(dir, el.tag + (el.cls.length ? '.' + el.cls.join('.') : ''));
  const gap = el.cls.find((c) => /^u-gap-/.test(c)); if (gap) space(f, 'itemSpacing', parseFloat(gap.slice(6).replace('_', '.')) * 4);
  const style = el.a.style || ''; const g = style.match(/gap:\s*(\d+)px/); if (g) space(f, 'itemSpacing', +g[1]);
  if (el.cls.includes('u-center') || /align-items:\s*center/.test(style)) f.counterAxisAlignItems = 'CENTER';
  if (el.cls.includes('u-between')) f.primaryAxisAlignItems = 'SPACE_BETWEEN';
  if (el.cls.includes('u-wrap')) f.layoutWrap = 'WRAP';
  parent.appendChild(f); fit(f, el, parent);
  for (const k of kids) await render(k, f, { cls: el.cls });
  return f;
}
function fit(node, el, parent) {
  const style = el.a.style || '';
  const max = style.match(/max-width:\s*(\d+)px/), w = style.match(/(?:^|;)\s*width:\s*(\d+)px/);
  if (max || w) { node.resize(+(max || w)[1], node.height); node.layoutSizingHorizontal = 'FIXED'; if (node.layoutMode && node.layoutMode !== 'NONE') node.layoutSizingVertical = 'HUG'; }
  else if ((/width:\s*100%/.test(style) || el.cls.includes('u-full') || el.cls.includes('u-grow') || el.cls.includes('u-between')) && parent.layoutMode && parent.layoutMode !== 'NONE') node.layoutSizingHorizontal = 'FILL';
  // 블록 요소(div, ul 등)는 세로로 쌓는 부모 안에서 폭을 채운다 (예시 맨 바깥은 max-width 로 고정)
  else if (['div', 'ul', 'ol', 'section', 'li', 'p', 'form', 'nav', 'header', 'footer'].includes(el.tag) && parent.layoutMode === 'VERTICAL' && !['Preview', 'Scene'].includes(parent.name)) node.layoutSizingHorizontal = 'FILL';
}

// ---------- 머리말
const fontsOf = async (t) => { for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const pt = frame.findOne((n) => n.type === 'FRAME' && n.name === 'Page Title');
const setText = async (t, s) => { if (t && t.characters !== s) { const link = (t.getStyledTextSegments(['hyperlink']).find((x) => x.hyperlink) || {}).hyperlink; await fontsOf(t); t.characters = s; if (link) t.hyperlink = link; } };
if (pt) { await setText(pt.findChild((n) => n.name === 'Title'), C.name.replace(/ · /g, ' / ')); await setText(pt.findChild((n) => n.name === 'Description'), C.desc); }
// Docs / Code 링크: 사이트 페이지와 GitHub CSS 줄 범위 (tokens/links.mjs 와 같은 주소)
const setLink = async (t, url) => { if (!t || !url) return; await fontsOf(t); t.hyperlink = { type: 'URL', value: url }; };
if (pt) { await setLink(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Documentation'), DATA.links.docs); await setLink(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Code'), DATA.links.code); }

// ---------- 본문: Master Components 만 남기고 다시 그린다
const B = frame.findChild((n) => n.type === 'FRAME' && n.name === 'Body');
const keep = new Set(['Section Header - Master Components', 'Master Components']);
for (const n of [...B.children]) if (!keep.has(n.name)) n.remove();
const at = () => B.children.findIndex((n) => n.name === 'Section Header - Master Components');
const put = (node) => { B.insertChild(at() < 0 ? B.children.length : at(), node); node.layoutSizingHorizontal = 'FILL'; res.created.push(node.id); return node; };

// 대표 그림 (사이트: 회색 상자 가운데 실제 쓰임 장면, 두 배 크기)
if (P.cover) {
  const cv = box('VERTICAL', PREFIX + '대표 그림', { fill: 'bg/neutral', radius: 'shape/xl' }); cv.primaryAxisAlignItems = 'CENTER'; cv.counterAxisAlignItems = 'CENTER';
  put(cv); cv.resize(1320, 560); cv.layoutSizingVertical = 'FIXED'; cv.layoutSizingHorizontal = 'FILL';
  const wrap = box('HORIZONTAL', 'Scene'); cv.appendChild(wrap);
  for (const el of P.cover) await render(el, wrap, {});
  wrap.rescale(2);
  const spacer = box('VERTICAL', 'Spacer'); spacer.resize(10, 72 - 24); spacer.layoutSizingVertical = 'FIXED'; put(spacer);
}
// 사용법
if (P.usage) { const s = section('사용법', '아래 구조를 복사해 씁니다. 대괄호 [ ] 안은 필요할 때만 넣습니다.'); add(s, codeBox(P.usage), true); put(s); }
// 속성 + 속성별 모양
if (P.props.length) {
  const s = section('속성', 'Figma 속성 이름을 그대로 data-* 속성으로 씁니다.');
  add(s, table(['속성', '값'], P.props.map(([k, v]) => [codeCell(k), v]), [240]), true);
  if (P.propsRest) add(s, text('그 밖에: ' + P.propsRest, T.body, 'fg/neutral-muted'), true);
  const main = Object.values(SET).find((n) => DATA.mainSets.includes(n.id));
  if (main) {
    const defs = main.componentPropertyDefinitions, d0 = DATA.defaults[DATA.mainClass] || {};
    for (const [k, d] of Object.entries(defs)) {
      if (d.type !== 'VARIANT' || d.variantOptions.length < 2) continue;
      const blk = box('VERTICAL', 'Property - ' + k, { fill: 'bg/canvas', radius: 'shape/xl', pad: 32, gap: 8 });
      add(s, blk, true);
      add(blk, text(k, T.title, 'fg/neutral', 'Header'));
      const row = box('HORIZONTAL', 'Preview', { gap: 40, pad: [24, 0, 8, 0] }); row.counterAxisAlignItems = 'MAX'; add(blk, row, true); row.layoutWrap = 'WRAP'; space(row, 'counterAxisSpacing', 24);
      for (const opt of d.variantOptions) {
        const want = Object.fromEntries(Object.entries(defs).filter(([, x]) => x.type === 'VARIANT').map(([kk, x]) => [kk, kk === k ? opt : (d0[kk] && x.variantOptions.includes(d0[kk]) ? d0[kk] : kk === 'state' ? 'enabled' : x.defaultValue)]));
        const v = main.children.find((c) => Object.entries(want).every(([kk, vv]) => c.variantProperties[kk] === vv));
        if (!v) continue;
        const cell = box('VERTICAL', opt, { gap: 12 }); cell.counterAxisAlignItems = 'CENTER'; row.appendChild(cell);
        cell.appendChild(v.createInstance()); add(cell, text(opt, T.cap, 'fg/neutral-muted', 'Caption'));
      }
    }
  }
  put(s);
}
// 동작
if (P.behavior.length) { const s = section('동작', 'ybm-ds.js 를 불러오면 알아서 동작합니다.'); for (const b of P.behavior) add(s, text('• ' + b, T.lead, 'fg/neutral', 'Item'), true); put(s); }
// 사용 지침
if (C.dos.length) {
  const s = section('사용 지침');
  const badge = await figma.getNodeByIdAsync('17:87');
  const badgeOf = (ok) => () => { const b = badge.children.find((c) => c.name === 'size=medium, variant=weak, tone=' + (ok ? 'positive' : 'critical')).createInstance(); b.setProperties({ 'label#17:36': ok ? 'Do' : "Don't" }); return b; };
  add(s, table(['구분', '내용'], C.dos.map(([ok, t]) => [badgeOf(ok), t]), [120]), true);
  put(s);
}
// 예시
if (P.examples.length) {
  const s = section('예시');
  for (const e of P.examples) {
    const ex = box('VERTICAL', 'Example - ' + (e.title || C.name), { gap: 8, pad: [16, 0, 24, 0] }); add(s, ex, true);
    if (e.title) add(ex, text(e.title, T.sub, 'fg/neutral', 'Title'), true);
    if (e.desc) add(ex, text(e.desc, T.lead, 'fg/neutral-muted', 'Description'), true);
    const card = box('VERTICAL', 'Example Box', { radius: 'shape/lg', stroke: 'stroke/neutral-muted' }); card.clipsContent = true; add(ex, card, true); space(ex, 'itemSpacing', 8);
    const pv = box('VERTICAL', 'Preview', { fill: 'bg/layer-default', pad: 48 }); pv.counterAxisAlignItems = 'CENTER'; pv.primaryAxisAlignItems = 'CENTER'; add(card, pv, true);
    for (const el of e.tree) await render(el, pv, {});
    add(card, codeBox(e.code, 'html', 'Code Box', true), true);
  }
  put(s);
}
// 규격
if (P.vars.length || P.spec) {
  const s = section('규격');
  if (P.vars.length) { add(s, text('CSS 변수', T.sub, 'fg/neutral', 'Sub Header'), true); add(s, text('서비스에서 모양을 바꿀 때는 이 변수만 덮어씁니다.', T.lead, 'fg/neutral-muted', 'Lead'), true); add(s, table(['변수', '기본값'], P.vars.map(([n, v]) => [codeCell(n), codeCell(v)]), [420]), true); }
  if (P.spec) { const h = text('크기와 여백', T.sub, 'fg/neutral', 'Sub Header'); add(s, h, true); add(s, codeBox(P.spec, 'text', 'Spec'), true); }
  put(s);
}
const mh = B.findChild((n) => n.name === 'Section Header - Master Components');
return { ...res, bodyChildren: B.children.map((n) => n.name), height: Math.round(frame.height), masterHeader: !!mh };

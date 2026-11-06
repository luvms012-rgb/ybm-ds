// Figma 쪽 실행 코드 - 컴포넌트 문서 프레임 한 개를 사이트 컴포넌트 페이지와 같은 구성으로 다시 그린다.
// node sync.mjs docpage <slug> 가 맨 위에 DATA 를 붙여 tokens/.figma-docpage.js 를 만든다. 같은 이름의 노드를 지우고 다시 만들어서 몇 번 실행해도 결과가 같다.
// 순서(사이트와 같음): 머리말 → 대표 그림 → 사용법 → 속성(+ 속성별 모양) → 동작 → 사용 지침 → 예시(미리보기 + 코드) → 규격(CSS 변수, 크기와 여백) → Master Components
// 2026-11-05 Action Button 을 기준으로 만듦. 예시 HTML 은 DS 클래스를 Figma 컴포넌트 인스턴스로, u-* 배치를 자동 배치로 그린다.
// 사이트 가이드는 brand-mono.css 로 브랜드 색을 무채색으로 보이므로, 문서 프레임(Master Components 밖) 의 brand 변수 칠을 같은 자리 neutral/gray 변수로 바꾼다. 컴포넌트 원본은 건드리지 않는다 (2026-11-06)
async function MONOIZE(B) {
const vars = await figma.variables.getLocalVariablesAsync('COLOR'); const byName = {}; const byId = {}; for (const v of vars) { byName[v.name] = v; byId[v.id] = v; }
const SP = { 'bg/brand-weak': 'bg/neutral-weak-alpha', 'bg/brand-weak-pressed': 'bg/neutral-weak-alpha-pressed', 'fg/brand': 'fg/neutral', 'fg/brand-contrast': 'fg/neutral', 'chart/series-1': 'bg/neutral-solid' };
const to = (n) => { if (SP[n]) return SP[n]; if (/^palette\/brand-/.test(n)) return n.replace('brand', 'gray'); if (/brand/.test(n)) return n.replace('brand', 'neutral'); return null; };
let cnt = 0; const miss = new Set();
const fix = (node) => { for (const p of ['fills', 'strokes']) { const arr = node[p]; if (!Array.isArray(arr) || !arr.some((x) => x.boundVariables && x.boundVariables.color)) continue; let ch = false; const nw = arr.map((x) => { const b = x.boundVariables && x.boundVariables.color; const v = b && byId[b.id]; const t = v && to(v.name); if (!t) return x; if (!byName[t]) { miss.add(t); return x; } ch = true; return figma.variables.setBoundVariableForPaint(x, 'color', byName[t]); }); if (ch) { try { node[p] = nw; cnt++; } catch (e) {} } } };
const walk = (n) => { if (n.type === 'COMPONENT' || n.type === 'COMPONENT_SET') return; fix(n); if ('children' in n) for (const c of n.children) walk(c); };
for (const c of B.children) if (!/Master/i.test(c.name)) walk(c);
return { cnt, miss: [...miss] };
}
const C = DATA.comp || {}, P = C.page || {};
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
      let node = typeof cell === 'function' ? cell() : text(cell, i ? T.lead : T.head, i ? 'fg/neutral' : 'fg/neutral-muted', i ? 'Cell' : 'Head Cell');
      // 부품(배지 등)은 제 크기 그대로 두고 칸 틀에 넣는다 (부품 자체를 칸 폭으로 늘리지 않는다)
      if (node.type === 'INSTANCE') { const c = box('HORIZONTAL', 'Cell'); c.counterAxisAlignItems = 'CENTER'; c.appendChild(node); node = c; }
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
    let v = (el.sp && el.sp.a && el.sp.a[kebab(k)]) || el.a['data-' + kebab(k)];
    if (k === 'state' && (el.a.disabled !== undefined || el.a['aria-disabled'] === 'true')) v = 'disabled';
    if (k === 'layout' && !v) v = ownText(el) || !iconsIn(el).length ? undefined : 'iconOnly';
    if (k === 'extended' && !v) v = ownText(el) ? 'true' : 'false';
    if (!v || !d.variantOptions.includes(v)) v = defaults[k] && d.variantOptions.includes(defaults[k]) ? defaults[k] : d.variantOptions.includes('enabled') && k === 'state' ? 'enabled' : undefined;
    if (v) props[k] = v;
  }
  const variant = set.type === 'COMPONENT' ? set : set.children.find((c) => Object.entries(props).every(([k, v]) => c.variantProperties[k] === v)) || set.defaultVariant;
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
  if ((ctx.shape || el.fb) && el.s) return renderS(el, parent, true);  // 부품 속성으로 못 나타내는 것은 사이트 모양 그대로 (sync.mjs SHAPE, 2026-11-07)
  const setCls = el.cls.find((c) => SET[c] && c !== 'ds-list-item');
  if (setCls) return setNode(el, setCls, parent);
  if (el.s) return renderS(el, parent);
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

// ---------- 사이트에서 읽은 실제 모양(el.s, node tokens/figma-styles.mjs)으로 그리기 (2026-11-06)
// s: d 표시(b 블록, f 플렉스, if, g 그리드, i 인라인, ib), fd 세로, gap [행, 열], jc, ai, p 여백, bg, bw 테두리 두께, bc, r 모서리, w, h, fs, fw, c 글자색, lh, ta, k 자식 상자 [x, y, w, h]
// 색은 같은 값의 Figma 변수(bg/, fg/, stroke/)에 묶고, 없으면 값 그대로. 글자는 같은 크기와 굵기의 Static 글자 스타일
const CV = { bg: [], fg: [], stroke: [], any: [] };
{
  const byId = Object.fromEntries(allVars.map((v) => [v.id, v]));
  const colls = Object.fromEntries((await figma.variables.getLocalVariableCollectionsAsync()).map((c) => [c.id, c]));
  const val = (v, n = 0) => { const c = colls[v.variableCollectionId]; const x = c && v.valuesByMode[c.defaultModeId]; if (x && x.type === 'VARIABLE_ALIAS') return byId[x.id] && n < 8 ? val(byId[x.id], n + 1) : null; return x; };
  for (const v of allVars) { if (v.resolvedType !== 'COLOR') continue; const x = val(v); if (!x || x.r === undefined) continue; (CV[v.name.split('/')[0]] || CV.any).push([v.name, x.r * 255, x.g * 255, x.b * 255, x.a === undefined ? 1 : x.a]); }
}
const hexRGB = (h) => [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), h.length > 6 ? parseInt(h.slice(6, 8), 16) / 255 : 1];
const cpaint = (h, kind) => {
  const [r, g, b, a] = hexRGB(h);
  for (const list of [CV[kind] || [], CV.bg, CV.fg, CV.stroke, CV.any]) { const m = list.find((e) => Math.abs(e[1] - r) < 1.5 && Math.abs(e[2] - g) < 1.5 && Math.abs(e[3] - b) < 1.5 && Math.abs(e[4] - a) < 0.02); if (m) return paint(m[0]); }
  return { type: 'SOLID', color: { r: r / 255, g: g / 255, b: b / 255 }, opacity: a };
};
const WN = (w) => (w >= 700 ? 'Bold' : w >= 600 ? 'SemiBold' : w >= 500 ? 'Medium' : 'Regular');
const TS = (fs, fw) => Object.values(styles).find((x) => x.name.startsWith('Static/') && x.fontSize === fs && x.fontName.style === WN(fw));
const lhOf = (x) => (x.lineHeight && x.lineHeight.unit === 'PIXELS' ? x.lineHeight.value : 0);
const SHAPES = allVars.filter((v) => /^shape\//.test(v.name) && v.resolvedType === 'FLOAT');
async function styleText(t, s, from, to) {
  const x = TS(s.fs, s.fw);
  const f = x ? x.fontName : { family: 'Pretendard', style: WN(s.fw) }; await figma.loadFontAsync(f);
  const all = from === undefined;
  if (x) { if (all) t.textStyleId = x.id; else t.setRangeTextStyleId(from, to, x.id); }
  else { if (all) { t.fontName = f; t.fontSize = s.fs || 16; } else { t.setRangeFontName(from, to, f); t.setRangeFontSize(from, to, s.fs || 16); } }
  const fill = [cpaint(s.c || '1a1c20', 'fg')]; if (all) t.fills = fill; else t.setRangeFills(from, to, fill);
  if (s.lh && (!x || Math.abs(lhOf(x) - s.lh) > 1)) { const lh = { unit: 'PIXELS', value: s.lh }; if (all) t.lineHeight = lh; else t.setRangeLineHeight(from, to, lh); }
  if (s.ul) { if (all) t.textDecoration = 'UNDERLINE'; else t.setRangeTextDecoration(from, to, 'UNDERLINE'); }
}
// 글자 줄(인라인 조각들)을 글자 레이어 하나로: [[글, s], ...]
async function runText(parts, s0, name) {
  const t = figma.createText(); t.name = name || 'Text';
  await figma.loadFontAsync(t.fontName);
  const str = parts.map((p) => p[0]).join('').replace(/^\s+|\s+$/g, '');
  const lead = parts.map((p) => p[0]).join('').search(/\S/);
  await styleText(t, s0);
  t.characters = str || ' ';
  let i = -Math.max(lead, 0);
  for (const [txt, s] of parts) { const a = Math.max(i, 0), b = Math.min(i + txt.length, str.length); if (b > a && s !== s0) await styleText(t, s, a, b); i += txt.length; }
  if (s0.ta) t.textAlignHorizontal = s0.ta === 'center' ? 'CENTER' : 'RIGHT';
  return t;
}
const isIcon = (el) => typeof el !== 'string' && el.cls.includes('ds-icon') && el.cls.some((c) => /^ds-icon--/.test(c) && !/^ds-icon--(xs|sm|md|lg|xl)$/.test(c));
const plainBox = (s) => !s.bg && !(s.bw && s.bw.some(Boolean)) && !(s.p && s.p.some(Boolean)) && !s.r && !s.rg && !s.ps && !s.pi && !s.pt;
const inlineOK = (el) => typeof el === 'string' || (el.s && el.s.d === 'i' && plainBox(el.s) && !isIcon(el) && !el.cls.some((c) => SET[c] && c !== 'ds-list-item') && el.c.every(inlineOK));
const flat = (el, s, out) => { if (typeof el === 'string') out.push([el, s]); else for (const k of el.c) flat(k, el.s, out); return out; };
const rectOf = (bs) => bs.reduce((u, b) => (u ? [Math.min(u[0], b[0]), Math.min(u[1], b[1]), Math.max(u[0] + u[2], b[0] + b[2]) - Math.min(u[0], b[0]), Math.max(u[1] + u[3], b[1] + b[3]) - Math.min(u[1], b[1])] : b.slice()), null);
const hugW = (n) => n.layoutSizingHorizontal === 'HUG';
const CW = new Map(); const cwOf = (n) => CW.get(n.id) || 0;
// 부모 안에서 폭 정하기: 부모 폭을 다 쓰면 FILL, 아니면 사이트 폭으로 고정(내용에 맞는 요소는 HUG 뒤 다르면 고정)
function sizeW(node, s, parent, cw) {
  if (!parent.layoutMode || parent.layoutMode === 'NONE' || !s) return;
  const root = ['Preview', 'Scene'].includes(parent.name);
  const full = cw > 0 && Math.abs(s.w - cw) <= 1;
  if (node.type === 'TEXT') {
    if (s.fg && parent.layoutMode === 'HORIZONTAL' && !root) { node.textAutoResize = 'HEIGHT'; node.layoutGrow = 1; return; }  // 가로 줄에서 남는 폭을 채우는 글 (오른쪽 정렬 값 등)
    const one = s.nw || !s.lh || s.h <= s.lh * 1.4;
    if (one) { node.textAutoResize = 'WIDTH_AND_HEIGHT'; return; }
    if (full && !root && !hugW(parent) && parent.layoutMode === 'VERTICAL') { node.layoutSizingHorizontal = 'FILL'; node.textAutoResize = 'HEIGHT'; return; }
    node.textAutoResize = 'HEIGHT'; node.resize(Math.max(s.w, 1), node.height); node.layoutSizingHorizontal = 'FIXED'; return;
  }
  if (!root && !hugW(parent) && ((parent.layoutMode === 'VERTICAL' && full) || (parent.layoutMode === 'HORIZONTAL' && s.fg))) { node.layoutSizingHorizontal = 'FILL'; return 'fill'; }
  return 'later';
}
function fixAfter(node, s) {
  if (!s || node.type === 'TEXT') return;
  if (node.layoutSizingHorizontal !== 'FILL' && s.w > 0 && Math.abs(node.width - s.w) > 2) { try { node.resize(s.w, node.height); node.layoutSizingHorizontal = 'FIXED'; } catch (e) {} }
  if (node.type === 'FRAME' && node.layoutMode !== 'NONE') { if (node.layoutSizingVertical !== 'FILL' && s.h > 0 && (s.h > node.height + 2 || (s.ov && s.h < node.height - 2))) { node.resize(node.width, s.h); node.layoutSizingVertical = 'FIXED'; } }
  else if (node.type === 'INSTANCE' && s.h > 0 && Math.abs(node.height - s.h) > 2 && !node.children.some((c) => c.type === 'TEXT' || c.layoutMode)) { try { node.resize(node.width, s.h); } catch (e) {} }
}
async function iconNode(el, parent) {
  const s = el.s; const name = el.cls.find((c) => /^ds-icon--/.test(c) && !/^ds-icon--(xs|sm|md|lg|xl)$/.test(c)).slice(9);
  const solid = /-solid$/.test(name); const setN = iconPage.findOne((n) => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name === 'Lucide/' + name.replace(/-solid$/, ''));
  const comp = setN && (setN.type === 'COMPONENT_SET' ? setN.children.find((v) => /Solid/i.test(v.name) === solid) || setN.defaultVariant : setN);
  let n;
  if (comp) { n = comp.createInstance(); const col = cpaint(s.bg || s.c || '1a1c20', 'fg'); for (const v of n.findAll((x) => x.type === 'VECTOR')) { if (v.strokes.length) v.strokes = [col]; if (v.fills.length) v.fills = [col]; } }
  else { n = figma.createFrame(); n.name = 'icon ' + name; n.fills = [cpaint(s.bg || s.c || '1a1c20', 'fg')]; res.warn.push('아이콘 없음: ' + name); }
  parent.appendChild(n); n.resize(s.w || 20, s.h || 20); return n;
}
async function renderS(el, parent, sh) {
  // 모양 그대로 그리는 입력칸: 값 또는 안내 글(placeholder)을 칸 안 글자로 (2026-11-07)
  if ((el.tag === 'input' || el.tag === 'textarea') && el.s && !el.c.length && (el.a.value || el.a.placeholder)) { const v = el.a.value || el.a.placeholder; const s0 = el.a.value ? el.s : { ...el.s, c: el.s.pc || el.s.c }; el = { ...el, c: [v], s: el.tag === 'input' ? { ...s0, d: 'f', ai: 'center', jc: s0.ta === 'center' ? 'center' : s0.jc } : s0 }; }
  const s = el.s; const SH = !!(sh || el.fb);
  if (s.d === 'n' || s.vh) return null;
  if (isIcon(el)) return iconNode(el, parent);
  const cw = cwOf(parent);
  if (plainBox(s) && el.c.length && el.c.every(inlineOK) && !s.ov && !s.op && !/^i?[fg]$/.test(s.d)) { const t = await runText(flat(el, s, []), s, el.tag); parent.appendChild(t); sizeW(t, s, parent, cw); return t; }
  if (['svg', 'img', 'video', 'canvas', 'picture'].includes(el.tag)) {
    const f = figma.createFrame(); f.name = el.tag; f.fills = s.bg ? [cpaint(s.bg, 'bg')] : el.tag === 'svg' ? [] : [paint('bg/neutral')];
    if (s.r) { [f.topLeftRadius, f.topRightRadius, f.bottomRightRadius, f.bottomLeftRadius] = s.r; }
    parent.appendChild(f); f.resize(Math.max(s.w, 1), Math.max(s.h, 1)); if (sizeW(f, s, parent, cw) === 'fill') {} return f;
  }
  const dir = el.tag === 'tr' ? 'HORIZONTAL' : /^i?f$/.test(s.d) ? (s.fd === 'c' ? 'VERTICAL' : 'HORIZONTAL') : /^i?g$/.test(s.d) ? (s.gc > 1 ? 'HORIZONTAL' : 'VERTICAL') : 'VERTICAL';  // 표 줄은 가로
  const f = figma.createAutoLayout(dir); f.name = el.tag + (el.cls.length ? '.' + el.cls.join('.') : '');
  f.fills = s.bg ? [cpaint(s.bg, 'bg')] : [];
  const bw = s.bw || [0, 0, 0, 0], p = s.p || [0, 0, 0, 0];
  if (s.bw) { f.strokes = [cpaint(s.bc, 'stroke')]; f.strokeAlign = 'INSIDE'; f.strokeTopWeight = bw[0]; f.strokeRightWeight = bw[1]; f.strokeBottomWeight = bw[2]; f.strokeLeftWeight = bw[3]; }
  else if (s.rg) { f.strokes = [cpaint(s.rg[1], 'stroke')]; f.strokeAlign = 'INSIDE'; f.strokeWeight = s.rg[0]; }  // box-shadow inset 테두리 (2026-11-07)
  if (s.r) { const keys = ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius']; s.r.forEach((v, i) => { const sv = SHAPES.find((x) => Object.values(x.valuesByMode)[0] === v); f[keys[i]] = Math.min(v, Math.max(s.w, s.h)); if (sv && v < 999) f.setBoundVariable(keys[i], sv); }); }
  if (s.op) f.opacity = s.op;
  f.clipsContent = !!s.ov;
  const pad = [p[0] + bw[0], p[1] + bw[1], p[2] + bw[2], p[3] + bw[3]];
  // 자식 묶기: 블록 안의 글자와 인라인 요소는 한 줄 글자로
  const items = []; const K = s.k || [];
  el.c.forEach((k, i) => {
    if (el.tag === 'details' && el.a.open === undefined && (typeof k === 'string' || k.tag !== 'summary')) return;  // 닫힌 details 는 제목 줄만
    const b = K[i] || [0, 0, 0, 0];
    const block = !/^i?f$|^i?g$/.test(s.d);
    if (block && inlineOK(k)) { const last = items[items.length - 1]; if (last && last.run) { last.parts.push(...flat(k, s, [])); last.bs.push(b); return; } items.push({ run: true, parts: flat(k, s, []), bs: [b] }); return; }
    if (typeof k === 'string') { items.push({ run: true, parts: [[k, s]], bs: [b] }); return; }
    if (k.s && (k.s.d === 'n' || k.s.vh)) return;
    items.push({ el: k, bs: [b], abs: k.s && k.s.pos === 'a' });
  });
  items.forEach((it) => { it.b = rectOf(it.bs); });
  const flow = items.filter((it) => !it.abs);
  const H = dir === 'HORIZONTAL', vis = flow.filter((it) => it.b[2] > 0 && it.b[3] > 0), oneRow = H && vis.length > 0 && vis.every((it) => it.b[1] < vis[0].b[1] + vis[0].b[3] && it.b[1] + it.b[3] > vis[0].b[1]), wrap = (s.wr || (/^i?g$/.test(s.d) && s.gc > 1)) && !oneRow;
  if (wrap) { f.layoutWrap = 'WRAP'; const g = s.gap || [0, 0]; f.itemSpacing = g[1]; f.counterAxisSpacing = g[0]; }
  let spacers = null;
  if (!wrap && s.jc !== 'space-between' && flow.length > 1) {
    const gaps = []; for (let i = 1; i < flow.length; i++) { const a = flow[i - 1].b, b = flow[i].b; gaps.push(H ? b[0] - (a[0] + a[2]) : b[1] - (a[1] + a[3])); }
    const mn = Math.min(...gaps); f.itemSpacing = mn; if (gaps.some((g) => Math.abs(g - mn) > 1)) spacers = gaps.map((g) => g - mn);
  }
  const J = { center: 'CENTER', 'flex-end': 'MAX', end: 'MAX', right: 'MAX', 'space-between': 'SPACE_BETWEEN' };
  const A = { center: 'CENTER', 'flex-end': 'MAX', end: 'MAX', baseline: H ? 'BASELINE' : 'MIN' };
  if (/^i?[fg]$/.test(s.d)) { f.primaryAxisAlignItems = J[s.jc] || 'MIN'; f.counterAxisAlignItems = A[s.ai] || 'MIN'; }
  if (/^i?g$/.test(s.d) && !(s.gc > 1) && s.ai === 'center') { f.primaryAxisAlignItems = 'CENTER'; f.counterAxisAlignItems = 'CENTER'; }  // grid + place-items: center (아이콘 동그라미 등)
  const inner = Math.max(s.w - pad[1] - pad[3], 0);
  const first = flow[0] && flow[0].b;
  if (first && !H && f.primaryAxisAlignItems === 'MIN' && first[1] > 1) pad[0] += first[1];
  if (first && H && f.primaryAxisAlignItems === 'MIN' && first[0] > 1 && !wrap) pad[3] += first[0];
  if (!/^i?[fg]$/.test(s.d)) { const nf = flow.find((it) => it.b[2] < inner - 2); if (nf) { const x = nf.b[0], r = inner - (x + nf.b[2]); f.counterAxisAlignItems = Math.abs(x - r) <= 2 && x > 2 ? 'CENTER' : x > r + 2 ? 'MAX' : 'MIN'; } if (s.ta === 'center' && flow.every((it) => it.run)) f.counterAxisAlignItems = 'CENTER'; }
  f.paddingTop = pad[0]; f.paddingRight = pad[1]; f.paddingBottom = pad[2]; f.paddingLeft = pad[3];
  parent.appendChild(f);
  const mode = sizeW(f, s, parent, cw);
  if (mode === 'later') { if (el.tag === 'td' || el.tag === 'th') { f.resize(Math.max(s.w, 1), f.height); f.layoutSizingHorizontal = 'FIXED'; f.primaryAxisAlignItems = 'CENTER'; } else if (/^(i|ib|if|ig)$/.test(s.d) || (parent.layoutMode === 'HORIZONTAL')) f.layoutSizingHorizontal = 'HUG'; else { f.resize(Math.max(s.w, 1), f.height); f.layoutSizingHorizontal = 'FIXED'; } }
  f.layoutSizingVertical = 'HUG';
  CW.set(f.id, inner);
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (spacers && i > 0 && !it.abs && spacers[flow.indexOf(it) - 1] > 0) { const sp = figma.createFrame(); sp.name = 'gap'; sp.fills = []; f.appendChild(sp); sp.resize(H ? spacers[flow.indexOf(it) - 1] : 1, H ? 1 : spacers[flow.indexOf(it) - 1]); }
    let n;
    if (it.run) { const s0 = it.parts[0][1] || s; n = await runText(it.parts, s0.fs ? s0 : s, 'Text'); f.appendChild(n); sizeW(n, { ...s0, w: it.b[2], h: it.b[3], lh: s0.lh, nw: s0.nw }, f, inner); if (!s0.ta && s.ta) n.textAlignHorizontal = s.ta === 'center' ? 'CENTER' : 'RIGHT'; }
    else n = await render(it.el, f, SH ? { shape: true } : {});
    if (n && it.abs) { try { n.layoutPositioning = 'ABSOLUTE'; n.x = it.b[0] + pad[3]; n.y = it.b[1] + pad[0]; } catch (e) {} }
    // 세로 줄에서 자식 하나만 가운데나 오른쪽에 붙은 경우 (align-self, margin auto) - 가로 틀로 감싸 자리를 맞춘다
    if (n && !it.abs && !H && !wrap && n.parent === f && n.layoutSizingHorizontal !== 'FILL' && it.b[2] < inner - 2) { const x = it.b[0], r = inner - (x + it.b[2]); const want = x > 2 && Math.abs(x - r) <= 2 ? 'CENTER' : x > 2 && r <= 2 ? 'MAX' : x <= 2 && r > 2 ? 'MIN' : null; if (want && want !== f.counterAxisAlignItems) { const w = figma.createAutoLayout('HORIZONTAL'); w.name = 'align'; w.fills = []; f.insertChild(f.children.indexOf(n), w); w.layoutSizingHorizontal = 'FILL'; w.layoutSizingVertical = 'HUG'; w.primaryAxisAlignItems = want; w.appendChild(n); } }
  }
  if (!f.children.length) { const fill = f.layoutSizingHorizontal === 'FILL'; f.resize(Math.max(s.w, 0.01), Math.max(s.h, 0.01)); if (fill) f.layoutSizingHorizontal = 'FILL'; f.layoutSizingVertical = 'FIXED'; await pseudo(f, s); return f; }
  fixAfter(f, s);
  await pseudo(f, s);
  return f;
}
// ::before / ::after 의 선과 점 (s.ps: [x, y, w, h, 색, 모서리]) - 절대 위치 사각형. 가로선은 좌우 여백을 지키며 늘어난다 (2026-11-07)
async function pseudo(f, s) {
  for (const [x, y, w, h, c, r] of s.ps || []) {
    const rc = figma.createRectangle(); rc.name = h <= 2 || w <= 2 ? 'line' : 'dot'; rc.fills = [cpaint(c, 'stroke')];
    f.appendChild(rc); rc.layoutPositioning = 'ABSOLUTE';
    const line = h <= 2 && w > 40, right = Math.max(s.w - x - w, 0);
    rc.resize(line ? Math.max(f.width - x - right, 1) : w, h); rc.x = x; rc.y = y > s.h / 2 && s.h ? f.height - (s.h - y) : y;
    if (r) rc.cornerRadius = Math.min(r, Math.min(w, h) / 2);
    if (line) rc.constraints = { horizontal: 'STRETCH', vertical: y > s.h / 2 ? 'MAX' : 'MIN' };
  }
  // ::before/::after 아이콘 (s.pi: [앞b/뒤a, 이름, w, h, 색, 절대, x, y]) - 체크, 꺾쇠, 화살표 등
  for (const [pos, nm, w, h, c, abs, x, y] of s.pi || []) {
    const ic = iconOf(nm); if (!ic) continue;
    const n = ic.createInstance(); const col = cpaint(c || '1a1c20', 'fg'); for (const v of n.findAll((z) => z.type === 'VECTOR')) { if (v.strokes.length) v.strokes = [col]; if (v.fills.length) v.fills = [col]; }
    if (abs) { f.appendChild(n); n.layoutPositioning = 'ABSOLUTE'; n.resize(w, h); n.x = x; n.y = y; } else { if (pos === 'b') { f.insertChild(0, n); if (f.layoutMode === 'HORIZONTAL') f.paddingLeft = Math.max(0, f.paddingLeft - w - f.itemSpacing); else f.paddingTop = Math.max(0, f.paddingTop - h - f.itemSpacing); } else f.appendChild(n); n.resize(w, h); }
  }
  // 글자 가상 요소 (s.pt: [앞b/뒤a, 글, 색, 크기, 굵기, 좌우 여백]) - 태그 사이 점 등
  for (const [pos, txt, c, fs, fw, m] of s.pt || []) {
    const t = await runText([[txt, { fs, fw, c }]], { fs, fw, c }, 'pseudo');
    if (f.layoutMode !== 'HORIZONTAL') { f.layoutMode = 'HORIZONTAL'; f.counterAxisAlignItems = 'CENTER'; f.itemSpacing = m; }
    if (pos === 'b') { f.insertChild(0, t); f.paddingLeft = Math.max(0, f.paddingLeft - t.width - m); } else f.appendChild(t);
    if (m && f.itemSpacing < m) f.itemSpacing = m;
  }
}
// 부품 인스턴스: 글자 채우기(sp), 본문 칸이 있는 부품(fx: card, sheet, dialog, md)은 풀어서 본문을 그린다. 인스턴스로 못 나타내면 모양 그대로 그린다
async function setNode(el, setCls, parent) {
  const cw = cwOf(parent);
  if (el.fb && el.s) return renderS(el, parent);
  const inst = instanceFor(el, SET[setCls], (DATA.defaults[setCls] || {}));
  parent.appendChild(inst);
  let node = inst;
  if (el.sp) { const ok = await FILL(inst, el.sp, true); if (ok === false && el.s && el.c.length) { inst.remove(); return renderS(el, parent); } }
  if (el.fx) node = await FIX(inst, el);
  if (el.s) { if (sizeW(node, el.s, parent, cw) !== 'fill') fixAfter(node, el.s); }
  else if ((el.a['data-width'] === 'fill' || el.cls.includes('u-grow') || el.cls.includes('u-full')) && parent.layoutMode && parent.layoutMode !== 'NONE') node.layoutSizingHorizontal = 'FILL';
  return node;
}

// 인스턴스 글자 채우기 (sync.mjs 가 만든 sp: own 글, parts 이름별 글, kids 안쪽 부품, items 되풀이 항목, a 속성)
const LIST_ITEM = '2350:1207';
const nk = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const kebab2 = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()).replace(/\s+/g, '-').toLowerCase();
const AL = { label: ['label', 'text', 'name', 'value', 'title', 'item', 'trigger'], title: ['title', 'heading', 'name', 'label', 'h2', 'h3'], description: ['desc', 'description', 'subtitle', 'help', 'sub', 'supporting', 'message'], descriptiontext: ['desc', 'description', 'subtitle'], message: ['message', 'text', 'body', 'content', 'title'], value: ['value', 'placeholder', 'text'], actionlabel: ['action'], action: ['action'], actionbutton: ['action'], body: ['body', 'content', 'p'], content: ['body', 'content', 'p', 'text'], contenttext: ['content', 'body', 'panel'], count: ['count'], nickname: ['nickname', 'name'], name: ['name', 'title'], subtitle: ['subtitle', 'desc'], indicatorlabel: ['indicator'], indicatortext: ['indicator'], errormessage: ['error', 'errormessage'], prefixlabel: ['prefix'], prefixtext: ['prefix'], suffixlabel: ['suffix'], suffixtext: ['suffix'], suffix: ['suffix'], number: ['number'], time: ['time'], status: ['status'], size: ['size'], language: ['language'], codetext: ['code'], total: ['total'], cancel: ['cancel'], input: ['input', 'placeholder'], placeholder: ['placeholder', 'value'] };
const OWNFIRST = ['label', 'text', 'message', 'value'];
const DEFAULT_TEXT = ['라벨', 'Label', 'Content', '설명을 작성할 수 있어요', '제목', 'Title', 'Description'];
const fontsDone = new Set();
async function fonts(node) { const ts = node.type === 'TEXT' ? [node] : node.findAll((n) => n.type === 'TEXT'); for (const t of ts) { if (t.characters.length === 0) { const f = t.fontName; if (f !== figma.mixed) { const k = f.family + f.style; if (!fontsDone.has(k)) { await figma.loadFontAsync(f); fontsDone.add(k); } } continue; } for (const s of t.getStyledTextSegments(['fontName'])) { const k = s.fontName.family + s.fontName.style; if (!fontsDone.has(k)) { await figma.loadFontAsync(s.fontName); fontsDone.add(k); } } } }
const setIdOf = async (inst) => { const m = await inst.getMainComponentAsync(); if (!m) return null; return m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.id : m.id; };
function nestedOf(node) { const out = []; const walk = (n) => { for (const c of n.children || []) { if (c.type === 'INSTANCE') out.push(c); else walk(c); } }; walk(node); return out; }
function ownTexts(inst) { const out = []; const walk = (n) => { for (const c of n.children || []) { if (c.type === 'TEXT') out.push(c); else if (c.type !== 'INSTANCE') walk(c); } }; walk(inst); return out; }
function picker(s) {
  const used = {};
  const take = (keys) => { for (const k of keys) { const v = (s.parts || {})[k]; if (v === undefined) continue; if (Array.isArray(v)) { const i = used[k] || 0; if (i < v.length) { used[k] = i + 1; return v[i]; } } else if (!used[k]) { used[k] = 1; return v; } } return undefined; };
  const has = (keys) => keys.some((k) => (s.parts || {})[k] !== undefined);
  return { take, has };
}
async function FILL(inst, s, top) {
  const main = await inst.getMainComponentAsync(); if (!main) return;
  const owner = main.parent && main.parent.type === 'COMPONENT_SET' ? main.parent : main;
  const defs = owner.componentPropertyDefinitions;
  if (s.a) { const vp = {}; for (const [k, d] of Object.entries(defs)) { if (d.type !== 'VARIANT') continue; const v = s.a[kebab2(k)] || s.a[k]; if (v && d.variantOptions.includes(v) && inst.componentProperties[k] && inst.componentProperties[k].value !== v) vp[k] = v; } if (Object.keys(vp).length) { try { inst.setProperties(vp); } catch (e) {} } }
  await fonts(inst);
  const pk = picker(s); const p = {}; const filled = new Set();
  for (const [k, d] of Object.entries(inst.componentProperties)) {
    const b = nk(k.split('#')[0]);
    if (d.type === 'TEXT') {
      const keys = AL[b] || [b];
      let v = OWNFIRST.includes(b) && s.own ? s.own : pk.take(keys);
      if (v === undefined && b === 'title' && s.own) v = s.own;
      if (v !== undefined) { filled.add(b); if (v !== d.value) p[k] = v; }
    }
    if (d.type === 'BOOLEAN' && ['description', 'descriptiontext', 'subtitle', 'showdescription'].includes(b)) { const v = pk.has(AL.description); if (v !== d.value) p[k] = v; }
  }
  // 사이트에 글이 없는데 Figma 기본 글이 남는 칸은 끈다 (Checkbox, Switch 이름표 등)
  for (const [k, d] of Object.entries(inst.componentProperties)) {
    if (d.type !== 'TEXT') continue; const b = nk(k.split('#')[0]);
    if (filled.has(b) || !DEFAULT_TEXT.includes(d.value)) continue;
    const sk = Object.keys(inst.componentProperties).find((x) => inst.componentProperties[x].type === 'BOOLEAN' && nk(x.split('#')[0]) === 'show' + b);
    if (sk) p[sk] = false;
  }
  // 켜고 끄는 칸(필수 점, 선택 꼬리표, 오류 글, 글자 수, 앞뒤 아이콘/글, 닫기, 취소)과 아이콘 바꾸기 (sync.mjs spec 의 flags, icons, 2026-11-07)
  for (const [k, d] of Object.entries(inst.componentProperties)) {
    const b = nk(k.split('#')[0]);
    if (d.type === 'BOOLEAN' && s.flags && b in s.flags && s.flags[b] !== d.value) p[k] = s.flags[b];
    if (d.type === 'INSTANCE_SWAP' && s.icons && (b === 'prefix' || b === 'suffix') && s.icons[b]) { const ic = iconOf(s.icons[b]); if (ic) p[k] = ic.id; }
  }
  if (Object.keys(p).length) { try { inst.setProperties(p); } catch (e) { res.warn.push('prop ' + inst.name + ': ' + String(e).slice(0, 60)); } }
  for (const t of ownTexts(inst)) {
    if (t.componentPropertyReferences && t.componentPropertyReferences.characters) continue;
    const b = nk(t.name); const v = pk.take(AL[b] || [b]);
    if (v !== undefined && t.characters !== v) { await fonts(t); t.characters = v; }
  }
  // 되풀이 항목(라디오 묶음 등): 안쪽 같은 부품에 차례로 글을 넣고 남는 것은 끈다. 모자라면 false (모양 그대로 그린다)
  // 안쪽 글이 모두 꺼진 칸(빈 footer 등)은 칸째 끈다 - 빈 칸이 자리를 차지하지 않게 (2026-11-07)
  const hideEmpty = (n) => { for (const c of n.children || []) { if (c.type === 'FRAME' && c.visible && c.children.length) { hideEmpty(c); if (c.children.every((x) => !x.visible)) c.visible = false; } } };
  hideEmpty(inst);
  if (s.items) {
    const nested = nestedOf(inst).filter((n) => n.visible); const ids = []; for (const n of nested) ids.push(await setIdOf(n));
    const cnt = {}; ids.forEach((x) => { cnt[x] = (cnt[x] || 0) + 1; }); const top1 = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
    const its = nested.filter((n, i) => ids[i] === top1);
    if (its.length < s.items.length) return false;
    for (let i = 0; i < its.length; i++) {
      const n = its[i], it = s.items[i]; if (!it) { n.visible = false; continue; }
      const pp = {}; const tk = Object.keys(n.componentProperties).find((x) => n.componentProperties[x].type === 'TEXT'); if (tk) pp[tk] = it.t;
      for (const [k, d] of Object.entries(n.componentProperties)) if (d.type === 'VARIANT' && /^(checked|selected|state)$/i.test(k)) { const opts = (await n.getMainComponentAsync()).parent.componentPropertyDefinitions[k].variantOptions; const want = it.on ? opts.find((o) => /^(true|checked|selected|on)$/i.test(o)) : opts.find((o) => /^(false|unchecked|enabled|off|default)$/i.test(o)); if (want) pp[k] = want; }
      try { await fonts(n); n.setProperties(pp); } catch (e) {}
    }
    return true;
  }
  if (s.kids && s.kids.length) {
    const nested = nestedOf(inst); const ids = []; for (const n of nested) ids.push(await setIdOf(n));
    const usedN = new Set(); const sets = new Set(); let miss = 0;
    for (const kid of s.kids) {
      sets.add(kid.set);
      let best = -1, score = -1;
      for (let i = 0; i < nested.length; i++) { if (usedN.has(i) || ids[i] !== kid.set) continue; let sc = 0; for (const [k, v] of Object.entries(nested[i].componentProperties)) if (v.type === 'VARIANT' && kid.a && (kid.a[kebab2(k)] === v.value)) sc++; if (sc > score) { score = sc; best = i; } }
      if (best < 0) { miss++; continue; }
      usedN.add(best); if (!nested[best].visible) nested[best].visible = true;
      await FILL(nested[best], kid, false);
    }
    if (miss && top) return false;
    for (let i = 0; i < nested.length; i++) if (!usedN.has(i) && sets.has(ids[i]) && nested[i].visible) nested[i].visible = false;
    s._sets = sets;
  }
  const nested2 = nestedOf(inst); const kidSets = s._sets || new Set(); const grp = {};
  for (const n of nested2) {
    if (!n.visible) continue; const id = await setIdOf(n); if (kidSets.has(id)) continue;
    let got = false, list = false; const pp = {};
    for (const [k, d] of Object.entries(n.componentProperties)) { if (d.type !== 'TEXT') continue; const b = nk(k.split('#')[0]); const keys = AL[b] || [b]; list = list || keys.some((x) => Array.isArray((s.parts || {})[x])); const v = pk.take(keys); if (v !== undefined) { got = true; if (v !== d.value) pp[k] = v; } }
    if (Object.keys(pp).length) { try { await fonts(n); n.setProperties(pp); } catch (e) {} }
    for (const t of n.findAll((x) => x.type === 'TEXT')) { if (t.componentPropertyReferences && t.componentPropertyReferences.characters) continue; const b = nk(t.name); const v = pk.take(AL[b] || [b]); if (v !== undefined) { got = true; if (t.characters !== v) { await fonts(t); t.characters = v; } } }
    (grp[id] = grp[id] || []).push([n, got, list]);
  }
  for (const arr of Object.values(grp)) if (arr.some((x) => x[1] && x[2])) for (const [n, got] of arr) if (!got && n.visible) n.visible = false;
  return true;
}
// 본문 칸 부품: 인스턴스를 풀고 사이트 본문을 그린다 (fx = { kind, title, desc, header, close, handle, center })
const partEl = (el, name) => el.c.find((x) => typeof x !== 'string' && x.cls.some((k) => k.endsWith('__' + name)));
const deepT = (el) => (typeof el === 'string' ? el : el.c.map(deepT).join('')).replace(/\s+/g, ' ').trim();
async function renderInto(fr, els, w) {
  CW.set(fr.id, w || fr.width - fr.paddingLeft - fr.paddingRight);
  const before = new Set(fr.children.map((c) => c.id));
  for (const el of els) await render(el, fr, {});
  if (fr.layoutMode === 'VERTICAL') for (const c of fr.children) if (!before.has(c.id)) { try { if (c.type === 'TEXT') { c.layoutSizingHorizontal = 'FILL'; c.textAutoResize = 'HEIGHT'; } else c.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
}
async function FIX(inst, el) {
  const o = el.fx; const cp = inst.componentProperties;
  const keyOf = (b) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === b);
  const kidsOf = (x) => (x ? x.c.filter((y) => typeof y !== 'string' || y.trim()) : []);
  const ft = partEl(el, 'footer');
  if (o.kind === 'card') {
    const h = partEl(el, 'header'); const p = {}; const put = (b, v) => { const k = keyOf(b); if (k !== undefined && v !== undefined && v !== null) p[k] = v; };
    put('header', !!h); put('show description', !!o.desc); put('footer', !!ft); put('title', o.title); put('description', o.desc);
    await fonts(inst); inst.setProperties(p);
    const fr = inst.detachInstance();
    const slot = fr.findChild((n) => n.name === 'content');
    const nb = box('VERTICAL', 'content', { gap: 12 });
    if (slot) { fr.insertChild(fr.children.indexOf(slot), nb); slot.remove(); } else fr.appendChild(nb);
    nb.layoutSizingHorizontal = 'FILL';
    await renderInto(nb, el.c.filter((x) => x !== h && x !== ft && (typeof x !== 'string' || x.trim())), (el.s ? el.s.w : fr.width) - fr.paddingLeft - fr.paddingRight);
    if (ft) { const f2 = fr.findChild((n) => n.name === 'footer'); if (f2) { for (const c of [...f2.children]) c.remove(); await renderInto(f2, kidsOf(ft)); } }
    if (fr.layoutMode === 'VERTICAL') { fr.primaryAxisSizingMode = 'AUTO'; }  // 카드 높이는 내용에 맞게 (부품 기본 높이로 늘어나지 않게, 2026-11-07)
    return fr;
  }
  if (o.kind === 'sheet' || o.kind === 'dialog') {
    const vp = {}; const opt = (k, v) => { if (cp[k] && cp[k].type === 'VARIANT' && cp[k].value !== v) vp[k] = v; };
    opt('closeButton', o.close ? 'true' : 'false');
    if (o.kind === 'sheet') { opt('handle', o.handle ? 'true' : 'false'); opt('headerAlign', o.center ? 'center' : 'left'); } else opt('footer', ft ? 'true' : 'false');
    try { if (Object.keys(vp).length) inst.setProperties(vp); } catch (e) { res.warn.push('variant ' + String(e).slice(0, 60)); }
    const p = {}; if (o.title && keyOf('title')) p[keyOf('title')] = o.title; if (o.desc && keyOf('description')) p[keyOf('description')] = o.desc;
    await fonts(inst); if (Object.keys(p).length) inst.setProperties(p);
    const fr = inst.detachInstance();
    if (!o.desc) { const d = fr.findOne((n) => n.type === 'TEXT' && n.name === 'description'); if (d) d.visible = false; }
    const body = fr.findChild((n) => n.name === 'body'); const be = partEl(el, 'body');
    if (body) { for (const c of [...body.children]) if (o.kind === 'sheet' || c.name === 'content') c.remove(); await renderInto(body, kidsOf(be)); if (o.kind === 'dialog') { const sb = body.findChild((n) => n.name === 'scrollbar'); if (sb) body.appendChild(sb); } }
    const f2 = fr.findChild((n) => n.name === 'footer');
    if (f2) { if (ft) { for (const c of [...f2.children]) c.remove(); await renderInto(f2, kidsOf(ft)); } else f2.visible = false; }
    return fr;
  }
  if (o.kind === 'md') {
    const fr = inst.detachInstance();
    const tplN = {}; for (const c of fr.children) if (!tplN[c.name]) tplN[c.name] = c;
    const old = [...fr.children]; let i = 0;
    const setT = async (t, v) => { if (!t) return; await fonts(t); t.characters = v; };
    for (const e of el.c.filter((x) => typeof x !== 'string')) {
      if (i++ && tplN.space) fr.appendChild(tplN.space.clone());
      const sc = e.cls.find((c) => SET[c] && c !== 'ds-list-item');
      if (sc) { const n = await render(e, fr, {}); try { n.layoutSizingHorizontal = 'FILL'; } catch (er) {} continue; }
      if (e.tag === 'blockquote' && tplN.blockquote) { const b = tplN.blockquote.clone(); fr.appendChild(b); await setT(b.findOne((n) => n.type === 'TEXT'), deepT(e)); continue; }
      const key = /^h[12]$/.test(e.tag) ? 'h2' : /^h[3-6]$/.test(e.tag) ? 'h3' : e.tag === 'ul' || e.tag === 'ol' ? 'ul' : 'p';
      const t = (tplN[key] || tplN.p).clone(); fr.appendChild(t);
      await setT(t, key === 'ul' ? e.c.filter((x) => typeof x !== 'string').map((li, j) => (e.tag === 'ul' ? '•  ' : j + 1 + '. ') + deepT(li)).join('\n') : deepT(e));
    }
    for (const c of old) c.remove();
    return fr;
  }
  return inst;
}

// ---------- 미리보기만 다시 그리기 (DATA.mode = 'preview'): 대표 그림과 예시 미리보기 칸만 비우고 다시 그린다. 코드, 표 등은 그대로
if (DATA.mode === 'preview') {
  const B = frame.findChild((n) => n.type === 'FRAME' && n.name === 'Body');
  const out = { s: C.slug, cover: 0, ex: 0, warn: res.warn };
  if (P.cover) {
    const cv = B.children.filter((n) => n.name === PREFIX + '대표 그림')[DATA.covIdx || 0];
    if (cv) { for (const c of [...cv.children]) c.remove(); const wrap = box('HORIZONTAL', 'Scene'); cv.appendChild(wrap); wrap.counterAxisAlignItems = 'CENTER'; const hs = P.coverHost || {}; if (hs.gap) wrap.itemSpacing = hs.gap[1]; if (hs.fd === 'c') { wrap.layoutMode = 'VERTICAL'; wrap.itemSpacing = hs.gap ? hs.gap[0] : 0; } for (const el of P.cover) await render(el, wrap, {}); wrap.rescale(2); out.cover = 1; out.coverH = Math.round(wrap.height); }
  }
  const sec = B.children.filter((n) => n.name === PREFIX + '예시')[DATA.secIdx || 0];
  if (sec && P.examples.length) {
    const boxes = sec.children.filter((n) => n.name.startsWith('Example - '));
    for (let i = 0; i < P.examples.length; i++) {
      const pv = boxes[i] && boxes[i].findOne((n) => n.name === 'Preview'); if (!pv) continue;
      for (const c of [...pv.children]) c.remove();
      const hs = P.examples[i].host; if (hs) { const p = hs.p || [0, 0, 0, 0]; pv.paddingTop = Math.max(p[0], 32); pv.paddingBottom = Math.max(p[2], 32); pv.itemSpacing = hs.gap ? (hs.fd === 'c' ? hs.gap[0] : hs.gap[1]) : 0; if (hs.fd !== 'c' && /f/.test(hs.d)) { pv.layoutMode = 'HORIZONTAL'; pv.layoutWrap = 'WRAP'; pv.counterAxisSpacing = hs.gap ? hs.gap[0] : 0; pv.primaryAxisAlignItems = 'CENTER'; pv.counterAxisAlignItems = 'CENTER'; } else { pv.layoutMode = 'VERTICAL'; pv.primaryAxisAlignItems = 'CENTER'; pv.counterAxisAlignItems = 'CENTER'; } }
      pv.minHeight = 240; pv.paddingLeft = 24; pv.paddingRight = 24;  // 사이트 .site-example__preview: min-height 240, 여백 32/24, 세로 가운데 (2026-11-07)
      for (const el of P.examples[i].tree) await render(el, pv, {});
      out.ex++;
    }
  }
  out.mono = await MONOIZE(B);
  return out;
}

// ---------- 안내 페이지 (Get Started, Foundations): 사이트 .md 블록을 그대로 그린다 (2026-11-05)
if (DATA.mode === 'page') {
  const fontsOf0 = async (t) => { for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
  const setT = async (t, v) => { if (t && v && t.characters !== v) { await fontsOf0(t); t.characters = v; } };
  const setL = async (t, url) => { if (t && url) { await fontsOf0(t); t.hyperlink = { type: 'URL', value: url }; } };
  const ptp = frame.findOne((n) => n.type === 'FRAME' && n.name === 'Page Title');
  await setT(frame.findOne((n) => n.type === 'TEXT' && n.name === 'Category'), DATA.category);
  if (ptp) { await setT(ptp.findChild((n) => n.name === 'Title'), DATA.title); await setT(ptp.findChild((n) => n.name === 'Description'), DATA.lead); await setL(ptp.findOne((n) => n.type === 'TEXT' && n.name === 'Documentation'), DATA.links.docs); await setL(ptp.findOne((n) => n.type === 'TEXT' && n.name === 'Code'), DATA.links.code); }
  const BP = frame.findChild((n) => n.type === 'FRAME' && n.name === 'Body');
  // Foundations: 예전부터 있던 견본 프레임(변수에 묶인 색 칸, 글자 견본 등)은 지우지 않고 맨 아래 '토큰 견본' 절로 옮긴다
  const kept = [];
  if (DATA.keepVisuals) {
    const prev = BP.findChild((n) => n.name === PREFIX + '토큰 견본');
    if (prev) for (const n of [...prev.children]) if (!['Section Header', 'Lead'].includes(n.name)) kept.push(n);
    for (const n of [...BP.children]) if (!n.name.startsWith(PREFIX) && !kept.includes(n)) kept.push(n);
    for (const n of kept) frame.appendChild(n);  // 잠깐 Body 밖으로
  }
  for (const n of [...BP.children]) n.remove();
  const out = [];
  const putP = (node) => { BP.appendChild(node); node.layoutSizingHorizontal = 'FILL'; out.push(node.id); };
  const CARD_T = st('Static/t07/2 Medium');
  await figma.loadFontAsync(CARD_T.fontName);
  let sec = null, grp = null;
  const target = () => grp || sec;
  for (const b of DATA.blocks) {
    if (b.t === 'h2') { if (sec) putP(sec); sec = section(b.text); grp = null; continue; }
    if (!sec) sec = section('');
    if (b.t === 'h3') { grp = box('VERTICAL', 'Group - ' + b.text, { gap: 12, pad: [16, 0, 16, 0] }); add(sec, grp, true); add(grp, text(b.text, T.sub, 'fg/neutral', 'Sub Header'), true); continue; }
    if (b.t === 'p') { add(target(), text(b.text, T.lead, 'fg/neutral-muted', 'Paragraph'), true); continue; }
    if (b.t === 'label') { add(target(), text(b.text, T.title, 'fg/neutral', 'Label'), true); continue; }
    if (b.t === 'code') { add(target(), codeBox(b.code, b.lang === 'text' ? '요청 글' : b.lang), true); continue; }
    if (b.t === 'table') {
      const dd = b.head[0] === '구분';  // 사용 지침 표: Do / Don't 는 배지로 (컴포넌트 문서와 같게)
      const badgeSet = dd ? await figma.getNodeByIdAsync('17:87') : null;
      const badge = (ok) => () => { const x = badgeSet.children.find((c) => c.name === 'size=medium, variant=weak, tone=' + (ok ? 'positive' : 'critical')).createInstance(); x.setProperties({ 'label#17:36': ok ? 'Do' : "Don't" }); return x; };
      // 아이콘 쓰임 표: 이름 칸에 Iconography 의 실제 아이콘을 함께 (사이트 표처럼 모양을 보며 고르게)
      const ic = b.head[0] === '이름' && b.head[1] === '쓰임';
      const iconCell = (name) => () => { const c = box('HORIZONTAL', 'Icon Cell', { gap: 12 }); c.counterAxisAlignItems = 'CENTER'; const solid = /-solid$/.test(name); const setN = iconPage.findOne((n) => (n.type === 'COMPONENT_SET' || n.type === 'COMPONENT') && n.name === 'Lucide/' + name.replace(/-solid$/, '')); const comp = setN && (setN.type === 'COMPONENT_SET' ? (setN.children.find((v) => /Solid/i.test(v.name) === solid) || setN.defaultVariant) : setN); if (comp) { const i = comp.createInstance(); c.appendChild(i); } c.appendChild(mono(name, 't04', 'fg/neutral')); return c; };
      add(target(), table(b.head, b.rows.map((r) => r.map((c, j) => (dd && j === 0 && /^(Do|Don't)$/.test(c.text) ? badge(c.text === 'Do') : ic && j === 0 ? iconCell(c.text) : c.mono ? codeCell(c.text) : c.text))), [dd ? 120 : 280]), true); continue;
    }
    if (b.t === 'cards') {
      const row = box('HORIZONTAL', 'Cards', { gap: 16 }); add(target(), row, true);
      for (const it of b.items) {
        const card = box('VERTICAL', 'Card - ' + it.title, { fill: 'bg/neutral', radius: 'shape/xl', pad: 28, gap: 8 });
        row.appendChild(card); card.layoutSizingHorizontal = 'FILL'; card.layoutSizingVertical = 'FILL';
        add(card, text(it.title, CARD_T, 'fg/neutral', 'Title'), true); add(card, text(it.desc, T.body, 'fg/neutral-muted', 'Description'), true);
      }
      continue;
    }
  }
  if (sec) putP(sec);
  if (kept.length) { const s = section('토큰 견본', 'Figma 변수에 묶인 견본입니다. 변수 값을 바꾸면 여기도 함께 바뀝니다.'); for (const n of kept) s.appendChild(n); putP(s); }
  // Figma 파일에만 있는 안내
  if (DATA.figmaPages) { const s = section('Pages in This File', '이 파일의 페이지는 문서 사이트의 메뉴와 같은 순서와 이름입니다.'); add(s, table(['페이지', '내용'], DATA.figmaPages, [280]), true); putP(s); }
  return { frame: frame.id, createdNodeIds: out, height: Math.round(frame.height), body: BP.children.map((n) => n.name) };
}

// ---------- 머리말
const fontsOf = async (t) => { for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const pt = frame.findOne((n) => n.type === 'FRAME' && n.name === 'Page Title');
const setText = async (t, s) => { if (t && t.characters !== s) { const link = (t.getStyledTextSegments(['hyperlink']).find((x) => x.hyperlink) || {}).hyperlink; await fontsOf(t); t.characters = s; if (link) t.hyperlink = link; } };
// 한 프레임에 컴포넌트가 여럿인 곳(DATA.part = { index, count }): 프레임 제목은 그대로 두고, 컴포넌트마다 제목 절을 두고 차례로 이어 그린다 (2026-11-06)
const PART = DATA.part && DATA.part.count > 1 ? DATA.part : null;
if (pt && !PART) { await setText(pt.findChild((n) => n.name === 'Title'), C.name.replace(/ · /g, ' / ')); await setText(pt.findChild((n) => n.name === 'Description'), C.desc); }
// Docs / Code 링크: 사이트 페이지와 GitHub CSS 줄 범위 (tokens/links.mjs 와 같은 주소)
const setLink = async (t, url) => { if (!t || !url) return; await fontsOf(t); t.hyperlink = { type: 'URL', value: url }; };
if (pt && (!PART || PART.index === 0)) { await setLink(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Documentation'), DATA.links.docs); await setLink(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Code'), DATA.links.code); }

// ---------- 본문: Master Components 만 남기고 다시 그린다
const B = frame.findChild((n) => n.type === 'FRAME' && n.name === 'Body');
const keep = new Set(['Section Header - Master Components', 'Master Components']);
if (!PART || PART.index === 0) for (const n of [...B.children]) if (!keep.has(n.name)) n.remove();
const at = () => B.children.findIndex((n) => n.name === 'Section Header - Master Components');
const put = (node) => { B.insertChild(at() < 0 ? B.children.length : at(), node); node.layoutSizingHorizontal = 'FILL'; res.created.push(node.id); return node; };
if (PART) {
  const ttl = st('Static/t09/4 Bold'); await figma.loadFontAsync(ttl.fontName);
  const s = box('VERTICAL', PREFIX + 'Component - ' + C.name, { gap: 12, pad: [PART.index ? 48 : 0, 0, 48, 0] });
  if (PART.index) { s.strokes = [paint('stroke/neutral-muted')]; s.strokeAlign = 'INSIDE'; s.strokeTopWeight = 1; s.strokeLeftWeight = 0; s.strokeRightWeight = 0; s.strokeBottomWeight = 0; }
  add(s, text(C.name.replace(/ · /g, ' / '), ttl, 'fg/neutral', 'Component Title'));
  if (C.desc) add(s, text(C.desc, T.lead, 'fg/neutral-muted', 'Lead'), true);
  put(s);
}

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
        const want = Object.fromEntries(Object.entries(defs).filter(([, x]) => x.type === 'VARIANT').map(([kk, x]) => [kk, kk === k ? opt : (d0[kk] && x.variantOptions.includes(d0[kk]) ? d0[kk] : kk === 'state' && x.variantOptions.includes('enabled') ? 'enabled' : x.defaultValue)]));
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
    const pv = box('VERTICAL', 'Preview', { fill: 'bg/layer-default', pad: [32, 24] }); pv.counterAxisAlignItems = 'CENTER'; pv.primaryAxisAlignItems = 'CENTER'; pv.minHeight = 240; add(card, pv, true);
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
res.mono = await MONOIZE(B);
const mh = B.findChild((n) => n.name === 'Section Header - Master Components');
return { ...res, bodyChildren: B.children.map((n) => n.name), height: Math.round(frame.height), masterHeader: !!mh };

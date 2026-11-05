// Figma 쪽 실행 코드 - 컴포넌트 문서 프레임 한 개를 사이트 컴포넌트 페이지와 같은 구성으로 다시 그린다.
// node sync.mjs docpage <slug> 가 맨 위에 DATA 를 붙여 tokens/.figma-docpage.js 를 만든다. 같은 이름의 노드를 지우고 다시 만들어서 몇 번 실행해도 결과가 같다.
// 순서(사이트와 같음): 머리말 → 대표 그림 → 사용법 → 속성(+ 속성별 모양) → 동작 → 사용 지침 → 예시(미리보기 + 코드) → 규격(CSS 변수, 크기와 여백) → Master Components
// 2026-11-05 Action Button 을 기준으로 만듦. 예시 HTML 은 DS 클래스를 Figma 컴포넌트 인스턴스로, u-* 배치를 자동 배치로 그린다.
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

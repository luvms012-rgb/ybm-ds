// Figma 쪽 실행 코드. sync.mjs docs 가 위에 DATA 를 붙여 tokens/.figma-docs.js 를 만든다.
// 문서 프레임을 사이트와 같은 순서로 맞춘다: 머리말(제목, 설명, Docs / Code 링크) → Best Practices → Examples → Master Components
const res = { frames: [], rows: 0, missing: [] };
for (const p of figma.root.children) if (!/^-+$/.test(p.name)) await p.loadAsync();
const styles = Object.fromEntries((await figma.getLocalTextStylesAsync()).map((s) => [s.name, s]));
const st = (n) => { if (!styles[n]) throw new Error('글자 스타일 없음: ' + n); return styles[n]; };
const S_SECTION = st('Static/t07/4 Bold'), S_HEAD = st('Static/t04/2 Medium'), S_ROW = st('Static/t05/1 Regular');
for (const s of [S_SECTION, S_HEAD, S_ROW]) await figma.loadFontAsync(s.fontName);
const vars = Object.fromEntries((await figma.variables.getLocalVariablesAsync('COLOR')).map((v) => [v.name, v]));
const paint = (name) => { if (!vars[name]) throw new Error('색 변수 없음: ' + name); return figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', vars[name]); };
const badgeSet = await figma.getNodeByIdAsync('17:87');
const badgeOf = (tone) => badgeSet.children.find((c) => c.name === 'size=medium, variant=weak, tone=' + tone);
const B = { 1: badgeOf('positive'), 0: badgeOf('critical') };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const fontsOf = async (t) => { for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const linkOf = (t) => { const s = t.getStyledTextSegments(['hyperlink']).find((x) => x.hyperlink); return s ? s.hyperlink : null; };
const setText = async (t, chars) => { if (!t || t.characters === chars) return; const link = linkOf(t); await fontsOf(t); t.characters = chars; if (link) t.hyperlink = link; };
const text = (chars, style, color, name) => { const t = figma.createText(); t.textStyleId = style.id; t.characters = chars; t.fills = [paint(color)]; t.name = name; return t; };
const GEN = ['Section Header - Best Practices', 'Best Practices', 'Section Header - Examples'];

function bottomLine(f, on) { f.strokes = [paint('stroke/neutral-weak')]; f.strokeAlign = 'INSIDE'; f.strokeTopWeight = 0; f.strokeLeftWeight = 0; f.strokeRightWeight = 0; f.strokeBottomWeight = on ? 1 : 0; }
function makeRow(table, first, second, isHead, last) {
  const r = figma.createAutoLayout('HORIZONTAL');
  r.name = isHead ? 'Head' : 'Row'; r.itemSpacing = 24; r.counterAxisAlignItems = 'CENTER';
  r.paddingTop = r.paddingBottom = isHead ? 12 : 14; r.paddingLeft = r.paddingRight = 20; r.fills = [];
  table.appendChild(r); r.layoutSizingHorizontal = 'FILL'; bottomLine(r, !last);
  const cell = figma.createAutoLayout('HORIZONTAL'); cell.name = 'Guidance'; cell.fills = [];
  r.appendChild(cell); cell.resize(120, 24); cell.layoutSizingVertical = 'HUG';
  if (isHead) cell.appendChild(text('Guidance', S_HEAD, 'fg/neutral-muted', 'Guidance'));
  else { const b = B[first].createInstance(); b.setProperties({ 'label#17:36': first ? 'Do' : "Don't" }); cell.appendChild(b); }
  const t = isHead ? text('Practices', S_HEAD, 'fg/neutral-muted', 'Practices') : text(second, S_ROW, 'fg/neutral', 'Practice');
  r.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT';
}
async function header(frame, title, desc) {
  const pt = frame.findOne((n) => n.type === 'FRAME' && n.name === 'Page Title');
  if (!pt) return;
  if (title) await setText(pt.findChild((n) => n.type === 'TEXT' && n.name === 'Title'), title);
  if (desc) await setText(pt.findChild((n) => n.type === 'TEXT' && n.name === 'Description'), desc);
  await setText(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Documentation'), 'Docs');
  await setText(pt.findOne((n) => n.type === 'TEXT' && n.name === 'Code'), 'Code');
}
async function body(frame, rows) {
  const b = frame.findChild((n) => n.type === 'FRAME' && n.name === 'Body');
  if (!b) { res.missing.push(frame.name + ' ' + frame.id + ' 에 Body 없음'); return; }
  b.children.filter((n) => GEN.includes(n.name)).forEach((n) => n.remove());
  const mh = b.findChild((n) => n.type === 'TEXT' && (n.name === 'Section Header' || n.name === 'Section Header - Master Components'));
  if (mh) { await setText(mh, 'Master Components'); mh.name = 'Section Header - Master Components'; }
  const ex = b.findChild((n) => n.type === 'FRAME' && n.name === 'Examples');
  if (ex) b.insertChild(b.children.indexOf(ex), text('Examples', S_SECTION, 'fg/neutral', 'Section Header - Examples'));
  if (!rows.length) return;
  const wrap = figma.createAutoLayout('VERTICAL'); wrap.name = 'Best Practices'; wrap.paddingBottom = 72; wrap.fills = [];
  b.insertChild(0, wrap); wrap.layoutSizingHorizontal = 'FILL';
  b.insertChild(0, text('Best Practices', S_SECTION, 'fg/neutral', 'Section Header - Best Practices'));
  const table = figma.createAutoLayout('VERTICAL'); table.name = 'Table'; table.cornerRadius = 12; table.clipsContent = true;
  table.fills = [paint('bg/layer-default')]; table.strokes = [paint('stroke/neutral-weak')]; table.strokeWeight = 1; table.strokeAlign = 'INSIDE';
  wrap.appendChild(table); table.layoutSizingHorizontal = 'FILL';
  makeRow(table, null, null, true, false);
  rows.forEach(([ok, t], i) => makeRow(table, ok, t, false, i === rows.length - 1));
  res.rows += rows.length;
}

// 컴포넌트 문서 프레임: components.json 의 doc 으로 묶는다. 한 프레임에 부품이 여럿이면 프레임 이름과 같은 부품의 설명을 쓴다
const groups = new Map();
for (const c of DATA.comps) { if (!c.doc) continue; if (!groups.has(c.doc)) groups.set(c.doc, []); groups.get(c.doc).push(c); }
for (const [id, list] of groups) {
  const frame = await figma.getNodeByIdAsync(id);
  if (!frame) { res.missing.push('문서 프레임 ' + id); continue; }
  const s = slug(frame.name);
  const main = list.find((e) => e.slug === s) || list.find((e) => e.slug.startsWith(s + '-')) || list.slice().sort((a, b) => a.no.localeCompare(b.no))[0];
  const seen = new Set(); const rows = [];
  for (const e of [main, ...list.filter((x) => x !== main)]) for (const r of e.dos) if (!seen.has(r[1])) { seen.add(r[1]); rows.push(r); }
  rows.sort((x, y) => y[0] - x[0]); // Do 먼저, Don't 나중 (안정 정렬)
  await header(frame, null, main.desc);
  await body(frame, rows);
  res.frames.push(frame.name);
}
// Foundations 와 Iconography: 제목과 설명을 사이트와 같게, Iconography 는 Best Practices 도
for (const [id, key] of Object.entries(DATA.foundFrames)) {
  const frame = await figma.getNodeByIdAsync(id);
  if (!frame) { res.missing.push('문서 프레임 ' + id); continue; }
  const f = DATA.found[key] || {};
  await header(frame, f.label, f.lead);
  if (key === 'icons') await body(frame, DATA.icons);
  res.frames.push(frame.name);
}
return { frames: res.frames.length, rows: res.rows, missing: res.missing, sample: res.frames.slice(0, 5) };

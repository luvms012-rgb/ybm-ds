#!/usr/bin/env node
// YBM DS — 토큰 빌드 스크립트 (2026-10-22 build.py 를 Node 로 옮김 — 같은 입력이면 같은 출력)
// 입력: tokens/figma-variables.json (Figma 변수 전집 스냅샷 = source of truth)
// 출력: dist/tokens.css · tokens/design-tokens.json · tokens/tokens.js · tokens/tailwind.preset.js
//
//   node tokens/build.mjs                 오늘 날짜로 ds/ 에 생성
//   node tokens/build.mjs <날짜> <폴더>    다른 폴더에 생성 (검증용)
//
// 다른 스크립트에서는 import { build } from './build.mjs' → { 상대경로: 내용 } 을 돌려받는다.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(path.dirname(fileURLToPath(import.meta.url))); // ds/
const P = '--ybm-';

// ── Python json.dumps(indent=2, ensure_ascii=False) 와 같은 출력 ─────────────
// 객체 키 순서를 지키기 위해 사전은 전부 Map 으로 만든다 ("100" 같은 키를 JS 객체가 재정렬하므로).
const M = (pairs) => new Map(pairs);
function dumps(v, ind = '') {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'string' || typeof v === 'boolean') return JSON.stringify(v);
  if (typeof v === 'number') return String(v);
  const next = ind + '  ';
  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    return '[\n' + v.map((x) => next + dumps(x, next)).join(',\n') + '\n' + ind + ']';
  }
  const entries = v instanceof Map ? [...v.entries()] : Object.entries(v);
  if (!entries.length) return '{}';
  return '{\n' + entries.map(([k, x]) => next + JSON.stringify(k) + ': ' + dumps(x, next)).join(',\n') + '\n' + ind + '}';
}
const cmp = (a, b) => { // 튜플·문자열·숫자 비교 (Python sorted 와 같은 순서)
  if (Array.isArray(a)) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) { const c = cmp(a[i], b[i]); if (c) return c; }
    return a.length - b.length;
  }
  return a < b ? -1 : a > b ? 1 : 0;
};
const sortBy = (arr, key = (x) => x) => [...arr].sort((x, y) => cmp(key(x), key(y)));
const int = (v) => Math.trunc(Number(v));
const after = (s) => s.split('/').slice(1).join('/'); // "bg/canvas" → "canvas"

export function build(date, sourcePath = path.join(HERE, 'tokens', 'figma-variables.json')) {
  const SOURCE = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const FIGMA = SOURCE.collections;
  const vars = (c) => FIGMA[c].variables;

  // 스냅샷이 불완전하면 그럴듯한 결과 대신 바로 실패한다
  const seen = new Set();
  for (const [cname, c] of Object.entries(FIGMA)) {
    const meta = SOURCE.$meta.collections[cname];
    const names = Object.keys(c.variables);
    if (names.length !== meta.count) throw new Error(`${cname} snapshot count mismatch: expected ${meta.count}, found ${names.length}`);
    for (const [n, rec] of Object.entries(c.variables)) {
      if (seen.has(n)) throw new Error(`Duplicate Figma variable name: ${n}`);
      seen.add(n);
      const ms = Object.keys(rec.values);
      if (ms.length !== c.modes.length || !c.modes.every((m) => ms.includes(m))) throw new Error(`Incomplete Figma modes for ${cname} / ${n}`);
      for (const val of Object.values(rec.values)) {
        const t = val && typeof val === 'object' ? val.alias : null;
        if (t != null && !Object.values(FIGMA).some((o) => t in o.variables)) throw new Error(`Unresolved Figma alias: ${n} -> ${t}`);
      }
    }
  }

  const ds = vars('YBM DS');
  const dsNames = Object.keys(ds);
  const paletteNames = dsNames.filter((n) => n.startsWith('palette/')).map((n) => n.slice(8));
  const naturalStep = (v) => { if (v === '00') return [0, 0]; const i = /^-?\d+$/.test(v) ? parseInt(v, 10) : NaN; return Number.isNaN(i) ? [2, v] : [1, i]; };
  const PALETTE = [];
  for (const fam of ['gray', 'brand', 'blue', 'green', 'orange', 'yellow', 'purple', 'red']) {
    const steps = sortBy(paletteNames.filter((n) => n.startsWith(fam + '-')), (n) => naturalStep(n.slice(fam.length + 1)))
      .map((t) => [t.slice(fam.length + 1), ds['palette/' + t].values.Light, ds['palette/' + t].values.Dark]);
    if (steps.length) PALETTE.push([fam, steps]);
  }
  const staticSort = (n) => {
    if (n === 'static-white' || n === 'static-black') return [0, n === 'static-white' ? 0 : 1, 0];
    return [1, n.startsWith('static-black-alpha-') ? 0 : 1, parseInt(n.split('-').pop(), 10)];
  };
  const STATIC = sortBy(paletteNames.filter((n) => n.startsWith('static-')), staticSort).map((n) => [n, ds['palette/' + n].values.Light]);
  const LOGO = sortBy(dsNames.filter((n) => n.startsWith('logo/'))).map((n) => [after(n), ds[n].values.Light, ds[n].description || '']);

  const semantic = (prefix) => sortBy(dsNames.filter((n) => n.startsWith(prefix + '/'))).map((name) => {
    const v = ['Light', 'Dark'].map((mode) => {
      const val = ds[name].values[mode];
      if (name === 'bg/transparent' && val === '#00000000') return null;
      const t = val && typeof val === 'object' ? val.alias : null;
      if (t == null || !t.startsWith('palette/')) throw new Error(`Expected palette alias for ${name} (${mode})`);
      return t.slice(8);
    });
    return [after(name), v[0], v[1]];
  });
  const BG = semantic('bg'), FG = semantic('fg'), STROKE = semantic('stroke'), CHART = semantic('chart');
  const ELEV_COLOR = sortBy(dsNames.filter((n) => n.startsWith('elevation/'))).map((n) => [after(n), ds[n].values.Light, ds[n].values.Dark]);

  const dimSort = (n) => { const s = n.slice(1); return s.endsWith('_5') ? parseFloat(s.slice(0, -2)) + 0.5 : parseFloat(s); };
  const SPACE = sortBy(dsNames.filter((n) => n.startsWith('dimension/')), (n) => dimSort(after(n))).map((n) => [after(n), ds[n].values.Light]);
  const gAlias = ds['spacing/x-global-gutter'].values.Light.alias;
  if (!gAlias || !gAlias.startsWith('dimension/')) throw new Error('spacing/x-global-gutter must alias a dimension variable');
  const GUTTER_REF = after(gAlias), GUTTER_VALUE = ds[gAlias].values.Light;

  const radSort = (n) => (n === 'full' ? [2, 0] : [0, parseFloat(n.slice(1).replace('_', '.'))]);
  const RADIUS = sortBy(dsNames.filter((n) => n.startsWith('radius/')), (n) => radSort(after(n))).map((n) => [after(n), ds[n].values.Light]);
  const shapeVars = vars('Shape');
  const shapeOrder = { '2xs': 0, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6, '3xl': 7 };
  const shapeTarget = (name, mode) => {
    const t = shapeVars[name].values[mode].alias;
    if (!t || !t.startsWith('radius/')) throw new Error(`Expected radius alias for Shape / ${name} / ${mode}`);
    return after(t);
  };
  const SHAPE = sortBy(Object.keys(shapeVars).filter((n) => n.startsWith('shape/') && n !== 'shape/pill'), (n) => shapeOrder[after(n)] ?? 99)
    .map((n) => [after(n), shapeTarget(n, 'Default')]);
  const SHAPE_PILL = shapeTarget('shape/pill', 'Default');

  const ty = vars('Typography');
  const tyModes = FIGMA.Typography.modes;
  const typeNames = sortBy(Object.keys(ty).filter((n) => n.startsWith('fontSize/t') && !n.endsWith('-static')).map(after), (n) => parseInt(n.slice(1), 10));
  const row = (name, mode, label = name) => [label, int(ty['fontSize/' + name].values[mode]), int(ty['lineHeight/' + name].values[mode])];
  const TYPE = typeNames.map((n) => row(n, tyModes[0]));
  const WEIGHT_VALUES = { regular: 400, medium: 500, semibold: 600, bold: 700 };
  const WEIGHTS = ['regular', 'medium', 'semibold', 'bold'].filter((n) => 'fontStyle/' + n in ty).map((n) => [n, WEIGHT_VALUES[n]]);
  const FONT_STACK = SOURCE.cssOnly.fontFamilyCss;

  const ev = vars('Elevation');
  const parts = {};
  for (const n of Object.keys(ev)) {
    const [, lvl, layer, part] = n.split('/');
    ((parts[lvl] ||= {})[layer] ||= {})[part] = int(ev[n].values.Default);
  }
  const ELEV_LEVELS = Object.keys(parts).map(Number).sort((a, b) => a - b);
  const geo = (l) => [['y', 'blur', 'spread'].map((p) => parts[l].key[p]), ['y', 'blur', 'spread'].map((p) => parts[l].ambient[p])];
  const ELEV_ROLE = [['raised', 1, 'thumb, 선택된 세그먼트'], ['overlay', 2, 'menu, select, snackbar, tooltip, date picker'],
    ['panel', 3, '떠 있는 패널, 펼침 메뉴'], ['floating', 4, 'FAB'], ['modal', 5, 'dialog, alert dialog, bottom sheet']];
  const ELEV_RING = { overlay: 'stroke-neutral-muted' };
  const MOTION = Object.entries(SOURCE.cssOnly.motion);
  const ZINDEX = Object.entries(SOURCE.cssOnly.zIndex);
  const elevExpr = (lvl) => { const [[ky, kb, ks], [ay, ab, as]] = geo(lvl);
    return `0 ${ky}px ${kb}px ${ks}px var(${P}color-elevation-${lvl}-key), 0 ${ay}px ${ab}px ${as}px var(${P}color-elevation-${lvl}-ambient)`; };
  const ring = (n) => (ELEV_RING[n] ? `inset 0 0 0 1px var(${P}color-${ELEV_RING[n]}), ` : '');
  const groups = [['Background', BG, 'bg'], ['Foreground', FG, 'fg'], ['Stroke', STROKE, 'stroke'], ['Chart (데이터 시각화 계열)', CHART, 'chart']];

  // ── tokens.css ─────────────────────────────────────────────────────────
  function css() {
    const D = [], o = [];
    o.push(`/* ==========================================================================
   YBM Design System — TOKENS
   --------------------------------------------------------------------------
   ⚠ 이 파일은 tokens/build.mjs 가 figma-variables.json 에서 생성한다. 직접 고치지 말 것.
   생성: ${date} · Figma file 1VCEsFU3xMWuXIntIrZz9i
          컬렉션 「YBM DS」 Light/Dark · Typography · Shape · Elevation
          (모드는 Light/Dark 하나뿐 — 2026-10-27 글자 배율·모양 테마 모드 삭제)

   3계층 구조
     1) PALETTE   --ybm-color-palette-*        원시값. 컴포넌트·서비스에서 직접 쓰지 않는다.
     2) SEMANTIC  --ybm-color-[bg|fg|stroke|chart]-*  역할. 컴포넌트는 이 층만 참조한다.
     3) COMPONENT --ds-[컴포넌트]-*             components.css 안에서 각 컴포넌트가 노출.

   서비스 커스텀은 2)·3)만 덮어쓴다. 1) 팔레트는 YBM 전체가 공유한다.
   변수 이름은 Figma Dev Mode 의 Web code syntax 와 같다 → Dev Mode 복사본이 그대로 동작.
   ========================================================================== */
`);
    o.push('/* --------------------------------------------------------------------------\n'
      + '   1. PALETTE — 다크 모드는 명도 반전(flip). static-* 만 모드 무관.\n'
      + '   -------------------------------------------------------------------------- */');
    o.push(':root {');
    for (const [fam, steps] of PALETTE) {
      o.push(`  /* ${fam} */`);
      for (const [s, l, d] of steps) {
        o.push(`  ${P}color-palette-${fam}-${s}: ${l};`);
        if (l !== d) D.push(`  ${P}color-palette-${fam}-${s}: ${d};`);
      }
    }
    o.push('\n  /* static — 모드 무관 */');
    for (const [n, v] of STATIC) o.push(`  ${P}color-palette-${n}: ${v};`);
    o.push('\n  /* 로고 전용 고정색 — 브랜드 자산. 모드 무관이고 다른 토큰이 참조하지 않는다. */');
    for (const [n, v, desc] of LOGO) o.push(`  ${P}color-logo-${n}: ${v};  /* ${desc} */`);
    o.push('}\n');

    o.push('/* --------------------------------------------------------------------------\n'
      + '   2. SEMANTIC — 컴포넌트가 참조하는 유일한 색 레이어\n'
      + '   시맨틱 이름은 반드시 역할(critical/informative/positive/warning/magic)이어야 하고\n'
      + '   색 이름(red/orange/…)이면 안 된다.\n'
      + '   -------------------------------------------------------------------------- */');
    o.push(':root {');
    o.push('  color-scheme: light;\n');
    for (const [label, group, kind] of groups) {
      o.push(`  /* ${label} */`);
      for (const [name, l, d] of group) {
        if (l === null) { o.push(`  ${P}color-${kind}-${name}: transparent;`); continue; }
        o.push(`  ${P}color-${kind}-${name}: var(${P}color-palette-${l});`);
        if (l !== d) D.push(`  ${P}color-${kind}-${name}: var(${P}color-palette-${d});`);
      }
      o.push('');
    }
    o.push('  /* Elevation 색 — key(접촉) + ambient(확산). 기하값은 §5 */');
    for (const [n, l, d] of ELEV_COLOR) { o.push(`  ${P}color-elevation-${n}: ${l};`); D.push(`  ${P}color-elevation-${n}: ${d};`); }
    o.push('}\n');

    o.push('/* --------------------------------------------------------------------------\n'
      + '   3. DARK — <html data-theme="dark">. 팔레트 flip + 대비 보정이 필요한 시맨틱만 재지정.\n'
      + '   -------------------------------------------------------------------------- */');
    o.push(':root[data-theme="dark"] {');
    o.push('  color-scheme: dark;');
    o.push(...D);
    o.push('}\n');

    o.push('/* --------------------------------------------------------------------------\n'
      + '   4. DIMENSION — spacing(xN = N×4px) · radius\n'
      + '   20px 이하는 2px 단위 반값 스텝, 20~64px 는 4px 단위, 그 위는 점프(72/80/96/128).\n'
      + '   -------------------------------------------------------------------------- */');
    o.push(':root {');
    const rows3 = (items) => { for (let i = 0; i < items.length; i += 3) o.push('  ' + items.slice(i, i + 3).join('  ')); };
    rows3(SPACE.map(([n, v]) => `${P}space-${n}: ${int(v)}px;`));
    o.push(`  ${P}space-x-global-gutter: var(${P}space-${GUTTER_REF});`);
    o.push('');
    rows3(RADIUS.map(([n, v]) => `${P}radius-${n}: ${int(v)}px;`));
    o.push('}\n');

    o.push(`/* --------------------------------------------------------------------------
   5. SHAPE — 컴포넌트 모서리 곡률(시맨틱) + 곡률 노브
   테마 모드는 없다. --ybm-shape-scale 을 영역에 덮어쓰면 그 안의 곡률만 줄이거나(0~1) 없앨 수 있다.

   ⚠ shape 계산을 :root 에 두면 안 된다 — 커스텀 프로퍼티는 "선언된 요소"에서 값이 확정되고
   자식은 그 결과를 상속하므로, :root 에 calc 를 두면 하위에서 --ybm-shape-scale 을 덮어써도
   반영되지 않는다. 모든 요소에서 다시 계산해야 영역 단위 조절이 동작한다.
   -------------------------------------------------------------------------- */`);
    o.push(':root {');
    o.push('  --ybm-shape-scale: 1;              /* 곡률 노브 — 0 이면 완전 각짐 */');
    for (const [n, dflt] of SHAPE) o.push(`  ${P}shape-base-${n}: var(${P}radius-${dflt});`);
    o.push(`  ${P}shape-pill: var(${P}radius-${SHAPE_PILL});   /* pill 은 노브와 무관하게 항상 원형 */`);
    o.push('}\n');
    o.push('*, ::before, ::after {');
    for (const [n] of SHAPE) o.push(`  ${P}shape-${n}: calc(var(${P}shape-base-${n}) * var(${P}shape-scale));`);
    o.push('}\n');

    o.push(`/* --------------------------------------------------------------------------
   6. TYPOGRAPHY — Figma Typography 컬렉션 (t01~t17, 모드 하나)
   *-static 은 같은 값이다. 브라우저·시스템 글자 확대와 무관하게 고정해 두고 싶은 자리에 쓰는 이름.
   lineHeight 는 2026-09-29 에 전 단계 +2 로 조정했다.
   -------------------------------------------------------------------------- */`);
    o.push(':root {');
    o.push(`  ${P}font-family-base: ${FONT_STACK};`);
    for (const [n, w] of WEIGHTS) o.push(`  ${P}font-weight-${n}: ${w};`);
    o.push('');
    for (const [t, fs, lh] of TYPE) o.push(`  ${P}font-size-${t}: ${fs}px;  ${P}line-height-${t}: ${lh}px;`);
    o.push('');
    o.push('  /* static (뷰포트·시스템 폰트 확대 무관) */');
    for (const [t] of TYPE) o.push(`  ${P}font-size-${t}-static: var(${P}font-size-${t});  ${P}line-height-${t}-static: var(${P}line-height-${t});`);
    o.push('}\n');

    o.push(`/* --------------------------------------------------------------------------
   7. SYSTEM — elevation · motion · z-index  (Figma 에 없고 CSS 에만 있는 층)
   -------------------------------------------------------------------------- */`);
    o.push(':root {');
    o.push('  /* 2겹 구조(key + ambient). 기하값은 여기 한 번만, 색은 테마 블록에서 바뀐다.\n'
      + '     Figma 변수 elevation/1~5 (key·ambient + Elevation 컬렉션 기하) 와 1:1.\n'
      + '     1 raised · 2 overlay · 3 panel · 4 floating · 5 modal */');
    for (const l of ELEV_LEVELS) o.push(`  ${P}elevation-${l}: ${elevExpr(l)};`);
    o.push('\n  /* 역할 별칭 — 컴포넌트는 숫자가 아니라 이 이름을 쓴다 */');
    const w = Math.max(...ELEV_ROLE.map(([n]) => n.length));
    for (const [n, l, desc] of ELEV_ROLE) o.push(`  ${P}elevation-${n}:${' '.repeat(w - n.length)} ${ring(n)}var(${P}elevation-${l});  /* ${desc} */`);
    o.push('\n  /* Motion */');
    for (const [n, v] of MOTION) o.push(`  ${P}${n}: ${v};`);
    o.push('\n  /* Z-index */');
    for (const [n, v] of ZINDEX) o.push(`  ${P}z-${n}: ${int(v)};`);
    o.push('}');
    return o.join('\n') + '\n';
  }

  function flat() {
    const t = new Map();
    for (const [fam, steps] of PALETTE) for (const [s, l] of steps) t.set(`${P}color-palette-${fam}-${s}`, l);
    for (const [n, v] of STATIC) t.set(`${P}color-palette-${n}`, v);
    for (const [n, v] of LOGO) t.set(`${P}color-logo-${n}`, v);
    for (const [, group, kind] of groups) for (const [name, l] of group) t.set(`${P}color-${kind}-${name}`, l === null ? 'transparent' : `var(${P}color-palette-${l})`);
    for (const [n, l] of ELEV_COLOR) t.set(`${P}color-elevation-${n}`, l);
    for (const [n, v] of SPACE) t.set(`${P}space-${n}`, `${int(v)}px`);
    t.set(`${P}space-x-global-gutter`, `var(${P}space-${GUTTER_REF})`);
    for (const [n, v] of RADIUS) t.set(`${P}radius-${n}`, `${int(v)}px`);
    for (const [n, dflt] of SHAPE) t.set(`${P}shape-${n}`, `var(${P}radius-${dflt})`);
    t.set(`${P}shape-pill`, `var(${P}radius-${SHAPE_PILL})`);
    t.set(`${P}font-family-base`, FONT_STACK);
    for (const [n, v] of WEIGHTS) t.set(`${P}font-weight-${n}`, v);
    for (const [tt, fs, lh] of TYPE) { t.set(`${P}font-size-${tt}`, `${fs}px`); t.set(`${P}line-height-${tt}`, `${lh}px`); }
    for (const l of ELEV_LEVELS) t.set(`${P}elevation-${l}`, elevExpr(l));
    for (const [n, l] of ELEV_ROLE) t.set(`${P}elevation-${n}`, `${ring(n)}var(${P}elevation-${l})`);
    for (const [n, v] of MOTION) t.set(`${P}${n}`, v);
    for (const [n, v] of ZINDEX) t.set(`${P}z-${n}`, v);
    return t;
  }

  function nestedJson() {
    const scale = (rows) => M(rows.map(([t, fs, lh]) => [t, M([['fontSize', `${fs}px`], ['lineHeight', `${lh}px`]])]));
    const color = M([['palette', M([...PALETTE.map(([fam, steps]) => [fam, M(steps.map(([s, l, d]) => [s, M([['light', l], ['dark', d]])]))]),
      ['static', M(STATIC.map(([n, v]) => [n.replace('static-', ''), M([['light', v], ['dark', v]])]))]])]]);
    for (const [, group, kind] of groups) color.set(kind, M(group.map(([n, l, d]) => [n, M([['light', l || 'transparent'], ['dark', d || 'transparent']])])));
    color.set('elevation', M(ELEV_COLOR.map(([n, l, d]) => [n, M([['light', l], ['dark', d]])])));
    color.set('logo', M(LOGO.map(([n, v, desc]) => [n, M([['light', v], ['dark', v], ['description', desc]])])));
    const dimension = M(SPACE.map(([n, v]) => [n, `${int(v)}px`]));
    dimension.set('x-global-gutter', `${GUTTER_VALUE}px`);
    const xyz = (a) => M([['y', a[0]], ['blur', a[1]], ['spread', a[2]]]);
    const elevation = M(ELEV_LEVELS.map((l) => [String(l), M([['key', xyz(geo(l)[0])], ['ambient', xyz(geo(l)[1])]])]));
    elevation.set('roles', M(ELEV_ROLE.map(([n, l]) => [n, l])));
    elevation.set('ring', M(Object.entries(ELEV_RING).map(([n, c]) => [n, M([['width', 1], ['inset', true], ['color', c]])])));
    const shape = M(SHAPE.map(([n, d]) => [n, d]));
    shape.set('pill', SHAPE_PILL);
    const d = M([
      ['$meta', M([['name', 'YBM Design System'], ['generated', date],
        ['source', 'Figma 1VCEsFU3xMWuXIntIrZz9i / YBM DS + Typography + Shape + Elevation'],
        ['note', 'tokens/build.mjs 가 생성한다. 직접 수정하지 말 것.']])],
      ['color', color], ['dimension', dimension],
      ['radius', M(RADIUS.map(([n, v]) => [n, `${int(v)}px`]))], ['shape', shape],
      ['typography', M([['fontFamily', FONT_STACK], ['fontWeight', M(WEIGHTS)], ['scale', scale(TYPE)]])],
      ['elevation', elevation], ['motion', M(MOTION)], ['zIndex', M(ZINDEX)],
    ]);
    return dumps(d) + '\n';
  }

  function tokensJs() {
    const o = ['// YBM Design System — tokens.js', `// ⚠ tokens/build.mjs 가 생성한다. 직접 고치지 말 것. 생성: ${date}`,
      '// CSS 변수명 → Light 모드 값. 다크 값은 design-tokens.json 을 참고.', '', 'export const tokens = {'];
    for (const [k, v] of flat()) o.push(`  ${JSON.stringify(k)}: ${dumps(v)},`);
    o.push('};', '', "/** CSS 변수 참조 문자열을 돌려준다. ex) cssVar('--ybm-color-bg-canvas') */",
      'export const cssVar = (name) => `var(${name})`;', '', 'export default tokens;');
    return o.join('\n') + '\n';
  }

  function tailwindPreset() {
    const ref = (n) => `var(${n})`;
    const colors = M(PALETTE.map(([fam, steps]) => [fam, M(steps.map(([s]) => [s, ref(`${P}color-palette-${fam}-${s}`)]))]));
    colors.set('static', M(STATIC.map(([n]) => [n.replace('static-', ''), ref(`${P}color-palette-${n}`)])));
    colors.set('logo', M(LOGO.map(([n]) => [n, ref(`${P}color-logo-${n}`)])));
    for (const [, group, kind] of groups) colors.set(kind, M(group.map(([n]) => [n, ref(`${P}color-${kind}-${n}`)])));
    const radius = M(RADIUS.map(([n]) => [n, ref(`${P}radius-${n}`)]));
    for (const [n] of SHAPE) radius.set(`shape-${n}`, ref(`${P}shape-${n}`));
    radius.set('shape-pill', ref(`${P}shape-pill`));
    const shadow = M(ELEV_LEVELS.map((l) => [String(l), ref(`${P}elevation-${l}`)]));
    for (const [n] of ELEV_ROLE) shadow.set(n, ref(`${P}elevation-${n}`));
    const cfg = M([['theme', M([['extend', M([
      ['colors', colors], ['spacing', M(SPACE.map(([n]) => [n, ref(`${P}space-${n}`)]))], ['borderRadius', radius],
      ['fontSize', M(TYPE.map(([t]) => [t, [ref(`${P}font-size-${t}`), M([['lineHeight', ref(`${P}line-height-${t}`)]])]]))],
      ['boxShadow', shadow], ['fontFamily', M([['sans', [ref(`${P}font-family-base`)]]])],
      ['fontWeight', M(WEIGHTS.map(([n]) => [n, ref(`${P}font-weight-${n}`)]))],
      ['transitionDuration', M(MOTION.filter(([n]) => n.startsWith('duration')).map(([n]) => [n.replace('duration-', ''), ref(P + n)]))],
      ['transitionTimingFunction', M(MOTION.filter(([n]) => n.startsWith('easing')).map(([n]) => [n.replace('easing-', ''), ref(P + n)]))],
      ['zIndex', M(ZINDEX.map(([n]) => [n, ref(`${P}z-${n}`)]))],
    ])]])], ['darkMode', ['selector', '[data-theme="dark"]']]]);
    return '// YBM Design System — Tailwind preset\n'
      + `// ⚠ tokens/build.mjs 가 생성한다. 직접 고치지 말 것. 생성: ${date}\n`
      + '// 모든 값이 CSS 변수를 가리키므로 ybm-ds.css 를 함께 로드해야 동작한다.\n'
      + "// tailwind.config.js → module.exports = { presets: [require('./tokens/tailwind.preset.js')], … }\n\n"
      + `module.exports = ${dumps(cfg)};\n`;
  }

  return {
    'dist/tokens.css': css(),
    'tokens/design-tokens.json': nestedJson(),
    'tokens/tokens.js': tokensJs(),
    'tokens/tailwind.preset.js': tailwindPreset(),
  };
}

export const today = () => {
  const d = new Date(); const z = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const date = process.argv[2] || today();
  const out = process.argv[3] || HERE;
  for (const [rel, text] of Object.entries(build(date))) {
    const full = path.join(out, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, text, 'utf8');
    console.log(`${rel} (${Buffer.byteLength(text)} bytes)`);
  }
}

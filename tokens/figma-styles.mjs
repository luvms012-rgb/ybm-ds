// 사이트 컴포넌트 페이지를 헤드리스 Chrome 으로 열어, 대표 그림과 예시 미리보기의 요소마다 실제 계산된 모양을 읽는다
//   node tokens/figma-styles.mjs [slug ...]   → tokens/.figma-styles.json (커밋 안 함)
// sync.mjs docpage 가 이 값을 나무에 붙여 Figma 에서 사이트와 같은 배경, 테두리, 둥글기, 여백, 글자 크기로 그린다 (2026-11-06)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
const DS = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), '..');
const OUT = path.join(DS, 'tokens', '.figma-styles.json');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((f) => fs.existsSync(f));
if (!CHROME) { console.error('Chrome 이 없어요'); process.exit(1); }
const docs = JSON.parse(fs.readFileSync(path.join(DS, 'tokens', '.figma-docs.json'), 'utf8')).components.filter((c) => c.doc);
const only = process.argv.slice(2);
const list = only.length ? docs.filter((c) => only.includes(c.slug)) : docs;

// 페이지 안에서 돌리는 함수: 요소 → { tag, cls, a, c, s }
const ICON_NAMES = [...new Set([...fs.readFileSync(path.join(DS, 'dist', 'icons.css'), 'utf8').matchAll(/--ds-icon-([a-z0-9-]+)\s*:/g)].map((m) => m[1]))];
const SER = String.raw`(() => {
  // ::before/::after 아이콘(mask-image)을 이름으로 찾는 표: --ds-icon-이름 변수 값 → 이름 (2026-11-07)
  const nu = (v) => { v = String(v).trim().replace(/^url\((["']?)/, '').replace(/(["']?)\)$/, ''); try { return decodeURIComponent(v).replace(/\s+/g, ' '); } catch (e) { return v.replace(/\s+/g, ' '); } };
  const ICON = {}; const rootCS = getComputedStyle(document.documentElement);
  for (const nm of ${JSON.stringify(ICON_NAMES)}) { const v = rootCS.getPropertyValue('--ds-icon-' + nm); if (v) ICON[nu(v)] = nm; }
  const R = (v) => Math.round(parseFloat(v) || 0);
  const hex = (v) => { if (!v) return undefined; const m = v.match(/rgba?\(([^)]+)\)/); if (!m) return undefined; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); const a = p.length > 3 ? p[3] : 1; if (a === 0) return undefined; return p.slice(0, 3).map((x) => Math.round(x).toString(16).padStart(2, '0')).join('') + (a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : ''); };
  const DISP = { flex: 'f', 'inline-flex': 'if', grid: 'g', 'inline-grid': 'ig', inline: 'i', 'inline-block': 'ib', none: 'n', contents: 'ct' };
  const KEEP = /^(data-|aria-(disabled|checked|selected|pressed|current|expanded|label|invalid|readonly)$|style$|disabled$|placeholder$|value$|checked$|type$|role$|open$|selected$|readonly$|for$|name$)/;
  function boxOf(node, base, k) { let r; if (node.nodeType === 3) { const rg = document.createRange(); rg.selectNodeContents(node); r = rg.getBoundingClientRect(); } else r = node.getBoundingClientRect(); return [Math.round((r.left - base.left) / k), Math.round((r.top - base.top) / k), Math.round(r.width / k), Math.round(r.height / k)]; }
  function ser(el, k) {
    const cs = getComputedStyle(el);
    const a = {}; for (const at of el.attributes) if (at.name !== 'class' && KEEP.test(at.name)) a[at.name] = at.value;
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.value && el.type !== 'checkbox' && el.type !== 'radio') a.value = el.value;
    if (el.checked) a.checked = '';
    const s = {}; const d = DISP[cs.display] || (cs.display.startsWith('table') ? 't' : 'b'); s.d = d;
    if (/^(i?f|i?g)$/.test(d)) {
      if (cs.flexDirection.startsWith('column')) s.fd = 'c';
      if (cs.flexWrap === 'wrap') s.wr = 1;
      const rg = R(cs.rowGap), cg = R(cs.columnGap); if (rg || cg) s.gap = [rg, cg];
      if (!/^(normal|flex-start|start|left)$/.test(cs.justifyContent)) s.jc = cs.justifyContent;
      if (!/^(normal|stretch)$/.test(cs.alignItems)) s.ai = cs.alignItems;
      if (/g/.test(d)) s.gc = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
    }
    const p = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(R); if (p.some(Boolean)) s.p = p;
    const bg = hex(cs.backgroundColor); if (bg) s.bg = bg;
    const bw = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(R);
    const bsty = [cs.borderTopStyle, cs.borderRightStyle, cs.borderBottomStyle, cs.borderLeftStyle];
    bw.forEach((w, i) => { if (bsty[i] === 'none' || bsty[i] === 'hidden') bw[i] = 0; });
    if (bw.some(Boolean)) { const i = bw.findIndex(Boolean); const c = hex([cs.borderTopColor, cs.borderRightColor, cs.borderBottomColor, cs.borderLeftColor][i]); if (c) { s.bw = bw; s.bc = c; } }
    const r = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(R); if (r.some(Boolean)) s.r = r.map((x) => Math.min(x, 999));
    s.w = el.offsetWidth !== undefined ? el.offsetWidth : Math.round(el.getBoundingClientRect().width / k); s.h = el.offsetHeight !== undefined ? el.offsetHeight : Math.round(el.getBoundingClientRect().height / k);
    if (parseFloat(cs.flexGrow) > 0) s.fg = 1;
    const op = parseFloat(cs.opacity); if (op < 1) s.op = Math.round(op * 100) / 100;
    if (cs.boxShadow !== 'none') s.sh = 1;
    // 테두리를 box-shadow: inset 0 0 0 Npx 로 그리는 부품 (목록 inset, 카드, 선택 칸 등, 2026-11-07)
    const ring = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px 0px 0px (\d+(?:\.\d+)?)px inset/) || cs.boxShadow.match(/inset 0px 0px 0px (\d+(?:\.\d+)?)px (rgba?\([^)]+\))/);
    if (ring) { const w = parseFloat(ring[1].startsWith('rgb') ? ring[2] : ring[1]), c = hex(ring[1].startsWith('rgb') ? ring[1] : ring[2]); if (w && c) s.rg = [Math.round(w), c]; }
    // ::before / ::after 로 그린 선과 점 (목록 구분선, 알림 점 등): 위치가 정해진 작은 색 상자만
    const ps = [], pi = [], pt = [];
    // 아래 한 줄만 그리는 그림자 (탭 목록 아래 줄 등: inset 0 -1px 0 색)
    const bln = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px -(\d+(?:\.\d+)?)px 0px 0px inset/) || cs.boxShadow.match(/inset 0px -(\d+(?:\.\d+)?)px 0px 0px (rgba?\([^)]+\))/);
    // 위 한 줄 그림자 (inset 0 1px 0 색: 메뉴 시트 항목 사이 줄 등)
    const tln = cs.boxShadow.match(/(rgba?\([^)]+\)) 0px (\d+(?:\.\d+)?)px 0px 0px inset/) || cs.boxShadow.match(/inset 0px (\d+(?:\.\d+)?)px 0px 0px (rgba?\([^)]+\))/);
    if (tln) { const rf = tln[1].startsWith('rgb'); const w = Math.round(parseFloat(rf ? tln[2] : tln[1])), c = hex(rf ? tln[1] : tln[2]); if (w && c) ps.push([0, 0, s.w, w, c, 0]); }
    if (bln) { const rgbFirst = bln[1].startsWith('rgb'); const w = Math.round(parseFloat(rgbFirst ? bln[2] : bln[1])), c = hex(rgbFirst ? bln[1] : bln[2]); if (w && c) ps.push([0, s.h - w, s.w, w, c, 0]); }
    for (const pe of ['::before', '::after']) {
      const q = getComputedStyle(el, pe);
      const mk = [q.webkitMaskImage, q.maskImage].find((x) => x && x !== 'none');
      if (mk && q.content !== 'none' && q.content !== 'normal' && q.display !== 'none' && q.visibility !== 'hidden') {
        let nm = ICON[nu(mk)];
        // 회전된 아이콘(펼친 꺾쇠 등)은 같은 방향의 아이콘 이름으로 (transform 또는 rotate)
        if (nm) { let deg = 0; const mt = q.transform.match(/matrix\(([^,]+),\s*([^,]+)/); if (mt) deg = Math.round(Math.atan2(parseFloat(mt[2]), parseFloat(mt[1])) * 180 / Math.PI); const rt = q.rotate && q.rotate !== 'none' ? parseFloat(q.rotate) : 0; deg = ((deg + rt) % 360 + 360) % 360;
          const DIR = ['right', 'down', 'left', 'up']; const m2 = nm.match(/^(chevron|arrow|chevrons)-(right|down|left|up)$/); if (m2 && deg % 90 === 0 && deg) nm = m2[1] + '-' + DIR[(DIR.indexOf(m2[2]) + deg / 90) % 4]; }
        if (nm) { const pw = parseFloat(q.width) || 16, ph = parseFloat(q.height) || 16, abs = /^(absolute|fixed)$/.test(q.position); const ow = el.offsetWidth, oh = el.offsetHeight;
          const px = abs ? (q.left !== 'auto' ? parseFloat(q.left) : q.right !== 'auto' ? ow - parseFloat(q.right) - pw : 0) : 0, py = abs ? (q.top !== 'auto' ? parseFloat(q.top) : q.bottom !== 'auto' ? oh - parseFloat(q.bottom) - ph : 0) : 0;
          pi.push([pe === '::before' ? 'b' : 'a', nm, Math.round(pw), Math.round(ph), hex(q.backgroundColor) || hex(cs.color), abs ? 1 : 0, Math.round(px), Math.round(py)]); }
        continue;
      }
      if (q.content === 'none' || q.content === 'normal' || q.display === 'none' || q.visibility === 'hidden') continue;
      if (/^".+"$/.test(q.content) && !/^(absolute|fixed)$/.test(q.position)) { try { pt.push([pe === '::before' ? 'b' : 'a', JSON.parse(q.content), hex(q.color), R(q.fontSize), +q.fontWeight, R(q.marginRight) + R(q.marginLeft)]); } catch (e) {} continue; }
      if (!/^(absolute|fixed)$/.test(q.position)) continue;
      if (q.content !== '""' && q.content !== "''") continue;
      const bgc = hex(q.backgroundColor); if (!bgc || parseFloat(q.opacity) === 0) continue;
      const pw = parseFloat(q.width), ph = parseFloat(q.height); if (!(pw > 0 && ph > 0) || (pw > 40 && ph > 8) || (ph > 40 && pw > 8)) continue;
      const ow = el.offsetWidth, oh = el.offsetHeight;
      const px = q.left !== 'auto' ? parseFloat(q.left) : q.right !== 'auto' ? ow - parseFloat(q.right) - pw : 0;
      const py = q.top !== 'auto' ? parseFloat(q.top) : q.bottom !== 'auto' ? oh - parseFloat(q.bottom) - ph : 0;
      ps.push([Math.round(px), Math.round(py), Math.round(pw), Math.round(ph), bgc, R(q.borderTopLeftRadius)]);
    }
    if (ps.length) s.ps = ps;
    if (pi.length) s.pi = pi;
    if (pt.length) s.pt = pt;
    if (cs.position === 'absolute' || cs.position === 'fixed') s.pos = 'a';
    if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflow === 'clip') s.ov = 1;
    if (cs.visibility === 'hidden') s.vh = 1;
    s.fs = R(cs.fontSize); s.fw = +cs.fontWeight; s.c = hex(cs.color);
    if (/^(center|right|end)$/.test(cs.textAlign)) s.ta = cs.textAlign === 'end' ? 'right' : cs.textAlign;
    if (cs.lineHeight !== 'normal') s.lh = R(cs.lineHeight);
    if (cs.textDecorationLine.includes('underline')) s.ul = 1;
    if (cs.whiteSpace === 'nowrap' || cs.whiteSpace === 'pre') s.nw = 1;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') s.pc = hex(getComputedStyle(el, '::placeholder').color);
    const base = el.getBoundingClientRect(); const bl = R(cs.borderLeftWidth) + R(cs.paddingLeft), bt = R(cs.borderTopWidth) + R(cs.paddingTop);
    const c = [], kb = [];
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { const pre = /^pre/.test(cs.whiteSpace || ''); const t = pre ? n.textContent : n.textContent.replace(/\s+/g, ' '); if (!t.trim()) continue; c.push(t); const b = boxOf(n, base, k); const lh = cs.lineHeight === 'normal' ? parseFloat(cs.fontSize) * 1.2 : parseFloat(cs.lineHeight); if (lh > 0 && b[3] > 0) { const nh = Math.max(1, Math.round(b[3] / lh)) * lh; b[1] = Math.round(b[1] - (nh - b[3]) / 2); b[3] = Math.round(nh); } kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]); continue; }
      if (n.nodeType !== 1 || /^(SCRIPT|STYLE|TEMPLATE|svg)$/i.test(n.tagName)) { if (n.nodeType === 1 && /^svg$/i.test(n.tagName)) { const b = boxOf(n, base, k); c.push({ tag: 'svg', cls: [], a: {}, c: [], s: { d: 'ib', w: b[2], h: b[3], c: hex(getComputedStyle(n).color) } }); kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]); } continue; }
      const ccs = getComputedStyle(n);
      if (ccs.display === 'none') { if (n.tagName !== 'DIALOG' && !/\bds-[a-z]+(-[a-z]+)*\b(?!__)/.test(n.className)) continue; }
      c.push(ser(n, k)); const b = boxOf(n, base, k); kb.push([b[0] - bl, b[1] - bt, b[2], b[3]]);
    }
    if (kb.length) s.k = kb;
    return { tag: el.tagName.toLowerCase(), cls: [...el.classList], a, c, s };
  }
  const scale = (el) => { const r = el.getBoundingClientRect(); return el.offsetWidth ? r.width / el.offsetWidth : 1; };
  const cover = document.querySelector('.site-cover:not(.site-anatomy) .pv-stage');
  const exs = [...document.querySelectorAll('.site-example__preview')];
  const host = (h) => { const x = ser(h, scale(h)); delete x.s.k; return { s: x.s, c: x.c }; };
  return JSON.stringify({ cover: cover ? host(cover) : null, examples: exs.map(host) });
})()`;

const port = 9333 + Math.floor(Math.random() * 300);
const prof = path.join(DS, '.cache', 'chrome-prof');
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ver = null; for (let i = 0; i < 50 && !ver; i++) { await sleep(200); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch {} }
const page = ver.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const wait = new Map(); const events = [];
ws.addEventListener('message', (m) => { const j = JSON.parse(m.data); if (j.id && wait.has(j.id)) { wait.get(j.id)(j); wait.delete(j.id); } else if (j.method) events.push(j.method); });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
const res = only.length ? old : {};
for (const c of list) {
  events.length = 0;
  const url = 'file:///' + path.join(DS, 'site', 'components', c.slug + '.html').replace(/\\/g, '/');
  await send('Page.navigate', { url });
  for (let i = 0; i < 100 && !events.includes('Page.loadEventFired'); i++) await sleep(50);
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 400)))', awaitPromise: true });
  const r = await send('Runtime.evaluate', { expression: SER, returnByValue: true });
  if (!r.result || r.result.exceptionDetails) { console.log('실패', c.slug, JSON.stringify(r.result && r.result.exceptionDetails).slice(0, 300)); continue; }
  const v = JSON.parse(r.result.result.value);
  const nEx = (c.page.examples || []).length;
  if (v.examples.length !== nEx) console.log('  ! 예시 수 다름', c.slug, v.examples.length, nEx);
  res[c.slug] = v;
}
ws.close(); chrome.kill();
fs.writeFileSync(OUT, JSON.stringify(res));
console.log('tokens/.figma-styles.json', Object.keys(res).length + '쪽', fs.statSync(OUT).size + 'B');

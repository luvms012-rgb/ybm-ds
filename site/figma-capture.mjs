// 템플릿 화면을 Figma 로 옮기기 위한 캡처 - node site/figma-capture.mjs [slug ...]
// 이 컴퓨터의 Chrome 을 화면 없이 띄워 템플릿을 PC(1440) / 모바일(375) 폭으로 열고, 그려진 그대로 SVG 로 저장한다.
// 글자는 SVG <text>(Figma 에서 글자 레이어), 아이콘은 Lucide 벡터, 배경과 테두리는 도형, 넘침 잘라내기는 마스크가 된다.
// 결과: tokens/.figma-capture/<slug>-pc.svg, <slug>-mobile.svg (커밋 안 함). Figma 에 올린 뒤 정리는 Claude 가 use_figma 로 한다.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SITE = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(SITE, '..');
const OUT = path.join(DS, 'tokens', '.figma-capture');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const WIDTHS = [['pc', 1440], ['mobile', 375]];
const only = process.argv.slice(2);
const templates = JSON.parse(fs.readFileSync(path.join(SITE, 'src/templates.json'), 'utf8')).templates.filter((t) => !only.length || only.includes(t.slug));
fs.mkdirSync(OUT, { recursive: true });

// ── 페이지 안에서 도는 직렬화기 (DOM → SVG 문자열) ─────────────────────────
function serialize() {
  const W = document.documentElement.clientWidth;
  const H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const n2 = (v) => Math.round(v * 100) / 100;
  const col = (c) => {
    if (!c) return null;
    let m = c.match(/^rgba?\(([^)]+)\)/), p;
    if (m) p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    else if ((m = c.match(/^color\(srgb ([^)]+)\)/))) { p = m[1].split(/[\s/]+/).filter(Boolean).map(Number); p = [p[0] * 255, p[1] * 255, p[2] * 255, p.length > 3 ? p[3] : 1]; }
    else return null;
    const a = p.length > 3 ? p[3] : 1;
    if (!(a > 0)) return null;
    return { hex: '#' + p.slice(0, 3).map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join(''), a: n2(a) };
  };
  const paint = (c, attr = 'fill') => `${attr}="${c.hex}"${c.a < 1 ? ` ${attr}-opacity="${c.a}"` : ''}`;
  const px = (v) => parseFloat(v) || 0;
  const rr = (x, y, w, h, r) => {
    const [tl, tr, br, bl] = r.map((v) => Math.max(0, Math.min(v, w / 2, h / 2)));
    if (!tl && !tr && !br && !bl) return `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}"`;
    if (tl === tr && tr === br && br === bl) return `<rect x="${n2(x)}" y="${n2(y)}" width="${n2(w)}" height="${n2(h)}" rx="${n2(tl)}"`;
    return `<path d="M${n2(x + tl)} ${n2(y)}H${n2(x + w - tr)}${tr ? `A${n2(tr)} ${n2(tr)} 0 0 1 ${n2(x + w)} ${n2(y + tr)}` : ''}V${n2(y + h - br)}${br ? `A${n2(br)} ${n2(br)} 0 0 1 ${n2(x + w - br)} ${n2(y + h)}` : ''}H${n2(x + bl)}${bl ? `A${n2(bl)} ${n2(bl)} 0 0 1 ${n2(x)} ${n2(y + h - bl)}` : ''}V${n2(y + tl)}${tl ? `A${n2(tl)} ${n2(tl)} 0 0 1 ${n2(x + tl)} ${n2(y)}` : ''}Z"`;
  };
  const radii = (cs) => [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(px);
  let uid = 0; const defs = [];
  const nameOf = (el) => { const c = [...el.classList].find((k) => /^(ds|tp|u)-/.test(k)) || el.tagName.toLowerCase(); return c.replace(/[^a-z0-9_-]/gi, '-'); };

  // 1) ::before / ::after 를 진짜 요소로 바꿔 둔다 (input 처럼 자식을 못 가지는 요소는 아래에서 따로 그린다)
  const props = [...getComputedStyle(document.body)];
  const voids = new Set(['INPUT', 'IMG', 'BR', 'HR', 'TEXTAREA', 'SELECT']);
  for (const el of [...document.body.querySelectorAll('*')]) {
    if (voids.has(el.tagName)) continue;
    for (const pe of ['::before', '::after']) {
      const cs = getComputedStyle(el, pe);
      if (!cs.content || cs.content === 'none' || cs.content === 'normal' || cs.display === 'none') continue;
      const s = document.createElement('span');
      let css = ''; for (const p of props) css += `${p}:${cs.getPropertyValue(p)};`;
      s.style.cssText = css;
      const t = cs.content.match(/^"(.*)"$/); if (t) s.textContent = t[1];
      s.setAttribute('data-pseudo', pe);
      if (pe === '::before') el.prepend(s); else el.append(s);
      el.setAttribute('data-pz', '');
    }
  }
  const st = document.createElement('style'); st.textContent = '[data-pz]::before,[data-pz]::after{content:none!important}'; document.head.append(st);

  // 마스크 SVG(아이콘) → 벡터
  const iconSvg = (cs, x, y, w, h, color) => {
    const mi = cs.webkitMaskImage || cs.maskImage || '';
    const m = mi.match(/url\("?(data:image\/svg\+xml[^")]*)"?\)/);
    if (!m) return '';
    let svg = decodeURIComponent(m[1].replace(/^data:image\/svg\+xml(;charset=utf-8)?,/, ''));
    const vb = (svg.match(/viewBox="([^"]+)"/) || [, '0 0 24 24'])[1].split(/\s+/).map(Number);
    const root = (svg.match(/<svg([^>]*)>/) || [, ''])[1];
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    const attrs = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'].map((k) => { const v = (root.match(new RegExp(`\\s${k}="([^"]+)"`)) || [])[1]; return v ? `${k}="${v}"` : ''; }).join(' ');
    const recolor = (s) => s.replace(/"(black|#000|#000000)"/g, `"${color.hex}"`);
    const size = Math.min(w, h);
    const rep = /repeat|space/.test(cs.webkitMaskRepeat || cs.maskRepeat || '') && w > h * 1.5;
    const sz = px((cs.webkitMaskSize || cs.maskSize || '').split(' ')[0]) || size;
    const count = rep ? Math.max(1, Math.floor((w + 0.5) / sz)) : 1;
    const gap = rep && count > 1 ? (w - sz * count) / (count - 1) : 0;
    let g = '';
    for (let i = 0; i < count; i++) {
      const ix = rep ? x + i * (sz + gap) : x + (w - size) / 2, iy = rep ? y + (h - sz) / 2 : y + (h - size) / 2, s = (rep ? sz : size) / vb[2];
      g += `<g id="icon" transform="translate(${n2(ix)} ${n2(iy)}) scale(${n2(s)})" ${recolor(attrs)}${color.a < 1 ? ` opacity="${color.a}"` : ''}>${recolor(inner)}</g>`;
    }
    return g;
  };

  // 글자: 줄마다 <text> 하나. id 에 굵기를 적어 두면 Figma 정리 때 굵기를 바로잡는다
  const textLines = (node, cs) => {
    const color = col(cs.color); if (!color) return '';
    const fs = px(cs.fontSize), fw = Math.round(px(cs.fontWeight) / 100) * 100 || 400;
    const ls = cs.letterSpacing === 'normal' ? 0 : px(cs.letterSpacing);
    const range = document.createRange(); const lines = [];
    const txt = node.textContent;
    for (let i = 0; i < txt.length; i++) {
      range.setStart(node, i); range.setEnd(node, i + 1);
      const r = range.getClientRects()[0];
      if (!r || (r.width === 0 && /\s/.test(txt[i]))) continue;
      let line = lines.find((l) => Math.abs(l.top - r.top) < fs * 0.5);
      if (!line && /\s/.test(txt[i])) continue;
      if (!line) { line = { top: r.top, h: r.height, x: r.left, s: '' }; lines.push(line); }
      line.s += /\s/.test(txt[i]) ? ' ' : txt[i];
    }
    const deco = cs.textDecorationLine.includes('underline') ? ' text-decoration="underline"' : '';
    return lines.map((l) => { const s = l.s.replace(/\s+/g, ' ').trim(); if (!s) return ''; const base = l.top + scrollY + l.h * 0.7917; return `<text id="t-${fw}-${++uid}" x="${n2(l.x + scrollX)}" y="${n2(base)}" font-family="Pretendard" font-size="${n2(fs)}" font-weight="${fw}"${ls ? ` letter-spacing="${n2(ls)}"` : ''}${deco} ${paint(color)}>${esc(s)}</text>`; }).join('');
  };

  const shadowsOf = (cs) => {
    if (!cs.boxShadow || cs.boxShadow === 'none') return [];
    return cs.boxShadow.split(/,(?![^(]*\))/).map((s) => {
      const c = col((s.match(/(rgba?\([^)]+\)|color\([^)]+\))/) || [])[1]);
      const nums = s.replace(/(rgba?\([^)]+\)|color\([^)]+\))/, '').replace('inset', '').trim().split(/\s+/).map(px);
      return { inset: /inset/.test(s), x: nums[0] || 0, y: nums[1] || 0, blur: nums[2] || 0, spread: nums[3] || 0, c };
    }).filter((s) => s.c);
  };

  function draw(el) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || px(cs.opacity) === 0) return '';
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'TEMPLATE' || el.tagName === 'DIALOG' && !el.open) return '';
    const r = el.getBoundingClientRect();
    const x = r.left + scrollX, y = r.top + scrollY, w = r.width, h = r.height;
    let self = '', kids = '';
    const rad = radii(cs);
    const masked = /url\(/.test(cs.webkitMaskImage || cs.maskImage || '');
    if (w > 0 && h > 0) {
      // 바깥 그림자 → Figma 정리 때 그림자 효과로 바꾼다
      const sh = shadowsOf(cs);
      const drop = sh.filter((s) => !s.inset && s.blur > 0);
      const bg = col(cs.backgroundColor);
      if (masked) { const c = bg || col(cs.color); if (c) self += iconSvg(cs, x, y, w, h, c); }
      else {
        if (bg || drop.length) {
          const id = drop.length ? `fx-${drop.map((d) => [d.x, d.y, d.blur, d.spread, d.c.hex.slice(1), Math.round(d.c.a * 100)].join('_')).join('__')}` : 'bg';
          self += `${rr(x, y, w, h, rad)} id="${id}" ${bg ? paint(bg) : 'fill="#ffffff" fill-opacity="0"'}/>`;
        }
        const bw = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(px);
        const bc = [cs.borderTopColor, cs.borderRightColor, cs.borderBottomColor, cs.borderLeftColor].map(col);
        const styles = [cs.borderTopStyle, cs.borderRightStyle, cs.borderBottomStyle, cs.borderLeftStyle];
        if (bw.every((v) => v > 0 && v === bw[0]) && bc.every((c) => c && c.hex === bc[0].hex) && styles.every((s) => s !== 'none')) {
          const b = bw[0];
          self += `${rr(x + b / 2, y + b / 2, w - b, h - b, rad.map((v) => Math.max(0, v - b / 2)))} id="border" fill="none" ${paint(bc[0], 'stroke')} stroke-width="${b}"${styles[0] === 'dashed' ? ' stroke-dasharray="4 4"' : ''}/>`;
        } else {
          [[x, y, w, bw[0]], [x + w - bw[1], y, bw[1], h], [x, y + h - bw[2], w, bw[2]], [x, y, bw[3], h]].forEach(([bx, by, bW, bH], i) => { if (bw[i] > 0 && bc[i] && styles[i] !== 'none') self += `<rect id="line" x="${n2(bx)}" y="${n2(by)}" width="${n2(bW)}" height="${n2(bH)}" ${paint(bc[i])}/>`; });
        }
        // 테두리처럼 쓰는 그림자 (inset 0 0 0 Npx / 0 0 0 Npx)
        for (const s of sh) if (!s.blur && !s.x && !s.y && s.spread > 0) {
          const k = s.spread, o = s.inset ? k / 2 : -k / 2;
          self += `${rr(x + o, y + o, w - 2 * o, h - 2 * o, rad.map((v) => Math.max(0, v - o)))} id="ring" fill="none" ${paint(s.c, 'stroke')} stroke-width="${n2(k)}"/>`;
          if (s.inset && !s.blur && s.spread > 0 && el.tagName === 'INPUT') {}
        }
        if (cs.borderBottomWidth === '0px' && /^(1|2)px$/.test(cs.outlineWidth)) {}
      }
      // 입력 칸 글자와 체크 표시
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        const type = (el.type || '').toLowerCase();
        if (!['checkbox', 'radio', 'range', 'file', 'hidden'].includes(type)) {
          const val = el.value; const ph = el.getAttribute('placeholder') || '';
          const show = val ? (type === 'password' ? '•'.repeat(val.length) : val) : ph;
          if (show) {
            const c = col(val ? cs.color : getComputedStyle(el, '::placeholder').color) || col(cs.color);
            const fs = px(cs.fontSize), fw = Math.round(px(cs.fontWeight) / 100) * 100 || 400;
            const tx = x + px(cs.paddingLeft) + px(cs.borderLeftWidth);
            const ty = el.tagName === 'TEXTAREA' ? y + px(cs.paddingTop) + px(cs.borderTopWidth) + (px(cs.lineHeight) || fs * 1.4) / 2 + fs * 0.35 : y + h / 2 + fs * 0.35;
            if (c) self += `<text id="t-${fw}-${++uid}" x="${n2(tx)}" y="${n2(ty)}" font-family="Pretendard" font-size="${n2(fs)}" font-weight="${fw}" ${paint(c)}>${esc(show.split('\n')[0])}</text>`;
          }
        } else if (type === 'checkbox' || type === 'radio') {
          for (const pe of ['::before', '::after']) {
            const p = getComputedStyle(el, pe);
            if (!p.content || p.content === 'none' || p.display === 'none') continue;
            const m = (p.transform.match(/matrix\(([^)]+)\)/) || [, '1,0,0,1,0,0'])[1].split(',').map(Number);
            if (m[0] === 0) continue;
            const pw = px(p.width) * m[0], ph2 = px(p.height) * m[3];
            if (!pw || !ph2) continue;
            const pxl = p.position === 'absolute' && p.left !== 'auto' ? x + px(p.left) + m[4] : x + (w - pw) / 2 + m[4];
            const pyt = p.position === 'absolute' && p.top !== 'auto' ? y + px(p.top) + m[5] : y + (h - ph2) / 2 + m[5];
            const pc = col(p.backgroundColor);
            if (/url\(/.test(p.webkitMaskImage || p.maskImage || '')) { if (pc) self += iconSvg(p, pxl, pyt, pw, ph2, pc); }
            else if (pc) self += `${rr(pxl, pyt, pw, ph2, radii(p).map((v) => v * m[0]))} id="mark" ${paint(pc)}/>`;
          }
        }
      }
    }
    for (const ch of el.childNodes) {
      if (ch.nodeType === 3) { if (ch.textContent.trim()) kids += textLines(ch, cs); }
      else if (ch.nodeType === 1) {
        if (ch.tagName === 'svg' || ch.tagName === 'SVG') { const b = ch.getBoundingClientRect(); const vb = ch.viewBox && ch.viewBox.baseVal; const c = col(getComputedStyle(ch).color); kids += `<svg x="${n2(b.left + scrollX)}" y="${n2(b.top + scrollY)}" width="${n2(b.width)}" height="${n2(b.height)}"${vb && vb.width ? ` viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}"` : ''}>${ch.innerHTML.replace(/currentColor/g, c ? c.hex : '#000')}</svg>`; }
        else kids += draw(ch);
      }
    }
    const clip = ['overflowX', 'overflowY'].some((k) => cs[k] !== 'visible') && w > 0 && h > 0;
    if (clip && kids) { const id = 'c' + (++uid); defs.push(`<clipPath id="${id}">${rr(x, y, w, h, rad)}/></clipPath>`); kids = `<g clip-path="url(#${id})">${kids}</g>`; }
    let ci = cs.clipPath && cs.clipPath.match(/inset\(([^)]+)\)/);
    let body = self + kids;
    if (ci && body) { const raw = ci[1].split(/\s+/); const pct = (s, base) => s.endsWith('%') ? parseFloat(s) / 100 * base : px(s); const [t0, r0 = t0, b0 = t0, l0 = r0] = raw; const v = [pct(t0, h), pct(r0, w), pct(b0, h), pct(l0, w)]; const [t, ri, b, l] = v; if (v.every((q) => q !== null)) { const id = 'c' + (++uid); defs.push(`<clipPath id="${id}"><rect x="${n2(x + l)}" y="${n2(y + t)}" width="${n2(Math.max(0, w - l - ri))}" height="${n2(Math.max(0, h - t - b))}"/></clipPath>`); body = `<g clip-path="url(#${id})">${body}</g>`; } }
    if (!body) return '';
    const op = px(cs.opacity);
    const named = [...el.classList].some((k) => /^(ds|tp)-/.test(k)) || /^(HEADER|MAIN|NAV|SECTION|FOOTER|ASIDE|ARTICLE|FORM)$/.test(el.tagName);
    if (named || op < 1) return `<g id="${nameOf(el)}"${op < 1 ? ` opacity="${n2(op)}"` : ''}>${body}</g>`;
    return body;
  }
  const page = col(getComputedStyle(document.body).backgroundColor) || col(getComputedStyle(document.documentElement).backgroundColor) || { hex: '#ffffff', a: 1 };
  const content = draw(document.body);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs.join('')}</defs><rect id="page" width="${W}" height="${H}" ${paint(page)}/>${content}</svg>`;
}

// ── Chrome DevTools Protocol (패키지 없이 Node 내장 WebSocket) ─────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(OUT, '.chrome')}`, '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-color-profile=srgb', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
let ws, seq = 0; const waiters = new Map(), events = [];
try {
  let list;
  for (let i = 0; i < 50 && !list; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); } catch { await sleep(200); } }
  const target = list.find((t) => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && waiters.has(m.id)) { waiters.get(m.id)(m); waiters.delete(m.id); } else if (m.method) events.push(m.method); });
  const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; waiters.set(id, (m) => m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result)); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception ? r.exceptionDetails.exception.description : r.exceptionDetails.text); return r.result.value; };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const t of templates) {
    for (const [kind, width] of WIDTHS) {
      await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
      events.length = 0;
      await send('Page.navigate', { url: 'file://' + path.join(SITE, 'templates/pages', t.slug + '.html') });
      for (let i = 0; i < 100 && !events.includes('Page.loadEventFired'); i++) await sleep(50);
      await evaluate('document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 300)))');
      const h = await evaluate('Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)');
      await send('Emulation.setDeviceMetricsOverride', { width, height: Math.min(h, 12000), deviceScaleFactor: 1, mobile: width < 768 });
      await evaluate('new Promise((r) => setTimeout(r, 250))');
      const svg = await evaluate('(' + serialize.toString() + ')()');
      const file = path.join(OUT, `${t.slug}-${kind}.svg`);
      fs.writeFileSync(file, svg);
      console.log(`  ${t.slug}-${kind}.svg ${(svg.length / 1024).toFixed(0)}KB ${width}x${Math.min(h, 12000)}`);
    }
  }
} finally {
  try { ws && ws.close(); } catch {}
  chrome.kill();
}

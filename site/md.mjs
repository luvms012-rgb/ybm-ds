// 문서 페이지를 AI 가 읽기 좋은 마크다운으로도 낸다 (llms.txt 표준: llmstxt.org).
//   페이지마다 같은 주소의 .md   예) components/action-button.html → components/action-button.md
//   site/llms.txt       전체 목차 (분류별 링크와 한 줄 설명)
//   site/llms-full.txt  모든 문서를 한 파일로
// build.mjs 가 페이지를 다 쓴 뒤 부른다. 생성된 HTML 의 본문(article.site-doc)만 읽어 바꾸고, 미리보기와 버튼은 뺀다.
import fs from 'node:fs';
import path from 'node:path';

const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'col', 'wbr']);
// 마크다운에 넣지 않는 것: 미리보기, 대표 그림, 버튼, 메뉴, 이전/다음, 목차 고르기
const SKIP_CLASS = /\b(pv-stage|site-example__preview|site-example__bar|site-tile|site-cover|site-meta|site-md|site-toc-select|site-pager|site-footer|ds-codeblock__header|site-anchor|site-frame|site-icons|site-iconlist|site-search)\b/;
const SKIP_TAG = new Set(['button', 'svg', 'iframe', 'script', 'style', 'template', 'select', 'input', 'label', 'nav', 'dialog']);

const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&middot;/g, '·').replace(/&amp;/g, '&');

function parse(html) {
  const root = { tag: '#root', attrs: '', kids: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    if (m[4] !== undefined) { stack[stack.length - 1].kids.push({ text: m[4] }); continue; }
    const [, close, tagRaw, attrs] = m; const tag = tagRaw.toLowerCase();
    if (close) { for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === tag) { stack.length = i; break; } continue; }
    const node = { tag, attrs, kids: [] };
    stack[stack.length - 1].kids.push(node);
    if (!VOID.has(tag) && !attrs.trim().endsWith('/')) stack.push(node);
  }
  return root;
}
const attr = (n, name) => { const m = (n.attrs || '').match(new RegExp(`\\b${name}="([^"]*)"`)); return m ? decode(m[1]) : ''; };
const skip = (n) => n.tag && (SKIP_TAG.has(n.tag) || SKIP_CLASS.test(attr(n, 'class')) || /\bhidden\b/.test(n.attrs) && !/site-example__code/.test(attr(n, 'class')) || attr(n, 'aria-hidden') === 'true');
const textOf = (n) => n.text !== undefined ? decode(n.text) : (n.kids || []).map(textOf).join('');

function inline(n, ctx) {
  if (n.text !== undefined) return decode(n.text).replace(/\s+/g, ' ');
  if (skip(n)) return '';
  const inner = () => n.kids.map((k) => inline(k, ctx)).join('');
  switch (n.tag) {
    case 'code': return '`' + textOf(n).replace(/`/g, "'") + '`';
    case 'b': case 'strong': { const t = inner().trim(); return t ? `**${t}**` : ''; }
    case 'em': case 'i': return n.kids.length ? inner() : '';
    case 'br': return ' ';
    case 'a': { const t = inner().trim(); const href = attr(n, 'href'); if (!t) return ''; if (!href || href.startsWith('#')) return t; return `[${t}](${ctx.abs(href)})`; }
    default: return inner();
  }
}

function block(n, ctx, out) {
  if (n.text !== undefined) { const t = decode(n.text).replace(/\s+/g, ' ').trim(); if (t) out.push(t); return; }
  if (skip(n)) return;
  const cls = attr(n, 'class');
  const para = (prefix = '') => { const t = n.kids.map((k) => inline(k, ctx)).join('').replace(/\s+/g, ' ').trim(); if (t) out.push(prefix + t); };
  switch (n.tag) {
    case 'h1': return para('# ');
    case 'h2': return para('## ');
    case 'h3': return para('### ');
    case 'h4': return para('#### ');
    case 'p': case 'figcaption': case 'caption': return para();
    case 'ul': case 'ol': {
      const items = n.kids.filter((k) => k.tag === 'li').map((li, i) => (n.tag === 'ol' ? `${i + 1}. ` : '- ') + li.kids.map((k) => inline(k, ctx)).join('').replace(/\s+/g, ' ').trim());
      if (items.length) out.push(items.join('\n'));
      return;
    }
    case 'pre': {
      const lang = ctx.lang || ''; ctx.lang = '';
      out.push('```' + lang + '\n' + textOf(n).replace(/\n+$/, '') + '\n```');
      return;
    }
    case 'table': {
      const rows = [];
      const walk = (x) => { if (x.tag === 'tr') rows.push(x); else (x.kids || []).forEach(walk); };
      walk(n);
      if (!rows.length) return;
      const cells = rows.map((r) => r.kids.filter((c) => c.tag === 'th' || c.tag === 'td').map((c) => c.kids.map((k) => inline(k, ctx)).join('').replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim()));
      const w = Math.max(...cells.map((r) => r.length));
      const line = (r) => '| ' + Array.from({ length: w }, (_, i) => r[i] ?? '').join(' | ') + ' |';
      out.push([line(cells[0]), '| ' + Array(w).fill('---').join(' | ') + ' |', ...cells.slice(1).map(line)].join('\n'));
      return;
    }
    case 'figure': {
      if (/ds-codeblock/.test(cls)) { const lang = n.kids.find((k) => k.tag === 'figcaption'); ctx.lang = lang ? textOf(lang).trim().split(/\s/)[0] : ''; }
      break;
    }
  }
  if (n.tag === 'span' || n.tag === 'a' || n.tag === 'b' || n.tag === 'code') return para();
  n.kids.forEach((k) => block(k, ctx, out));
}

export function htmlToMd(html, url) {
  const a = html.indexOf('<article class="site-doc"');
  const b = html.indexOf('</article>', a);
  if (a < 0 || b < 0) return null;
  const tree = parse(html.slice(a, b));
  const base = new URL(url);
  const ctx = { lang: '', abs: (h) => { try { const u = new URL(h, base); if (u.pathname.endsWith('.html') && u.origin === base.origin) u.pathname = u.pathname.replace(/\.html$/, '.md'); return u.href; } catch { return h; } } };
  const out = [];
  block(tree, ctx, out);
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// site 폴더의 문서(시작하기, Foundations, 컴포넌트)를 .md 로 쓰고 llms.txt 두 개를 만든다
export function writeMarkdown({ SITE, SITE_URL, groups, intro }) {
  const index = [];
  const full = [];
  let count = 0;
  for (const g of groups) {
    const lines = [];
    for (const { file, title, desc } of g.pages) {
      const html = fs.readFileSync(path.join(SITE, file), 'utf8');
      const md = htmlToMd(html, SITE_URL + file);
      if (!md) continue;
      const mdFile = file.replace(/\.html$/, '.md');
      fs.writeFileSync(path.join(SITE, mdFile), `<!-- ${SITE_URL}${file} -->\n\n${md}`);
      lines.push(`- [${title}](${SITE_URL}${mdFile})${desc ? `: ${desc}` : ''}`);
      full.push(`<!-- ${SITE_URL}${mdFile} -->\n\n${md}`);
      count++;
    }
    if (lines.length) index.push(`## ${g.label}\n\n${lines.join('\n')}`);
  }
  fs.writeFileSync(path.join(SITE, 'llms.txt'), `${intro}\n\n${index.join('\n\n')}\n`);
  fs.writeFileSync(path.join(SITE, 'llms-full.txt'), `${intro}\n\n${full.join('\n\n---\n\n')}`);
  return count;
}

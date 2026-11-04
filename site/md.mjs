// 문서 페이지를 AI 가 읽기 좋은 마크다운으로도 낸다 (llms.txt 표준: llmstxt.org).
//   페이지마다 같은 주소의 .md   예) components/action-button.html → components/action-button.md
//   site/llms.txt       전체 목차 (분류별 링크와 한 줄 설명)
//   site/llms-full.txt  모든 문서를 한 파일로
// build.mjs 가 페이지를 다 쓴 뒤 부른다. 생성된 HTML 의 본문(article.site-doc)만 읽어 바꾸고, 미리보기와 버튼은 뺀다.
import fs from 'node:fs';
import path from 'node:path';

const VOID = new Set(['br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'col', 'wbr']);
// 마크다운에 넣지 않는 것: 미리보기, 대표 그림, 버튼, 메뉴, 이전/다음, 목차 고르기
const SKIP_CLASS = /\b(pv-stage|site-example__preview|site-example__bar|site-tile__thumb|site-cover|site-meta|site-md|site-toc-select|site-pager|site-footer|ds-codeblock__header|site-anchor|site-frame|site-icons|site-iconlist|site-search)\b/;
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
// 숨긴 칸이라도 코드 칸(예시 코드, 코드 탭의 둘째 칸)은 마크다운에 넣는다
// 버튼은 빼되, 아이콘 이름 복사 버튼(site-icon-name)은 이름이 내용이라 넣는다 (2026-11-04, 전에는 아이콘 표의 이름 칸이 비었다)
const skip = (n) => n.tag && (SKIP_TAG.has(n.tag) && !(n.tag === 'button' && /\bsite-icon-name\b/.test(attr(n, 'class'))) ||SKIP_CLASS.test(attr(n, 'class')) || /\bhidden\b/.test(n.attrs) && !/site-example__code|site-codetabs__panel/.test(attr(n, 'class')) || attr(n, 'aria-hidden') === 'true');
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
      if (/ds-codeblock/.test(cls)) {
        const cap = n.kids.find((k) => k.tag === 'figcaption');
        const find = (x, f) => (f(x) ? x : (x.kids || []).reduce((r, k) => r || find(k, f), null));
        const tab = cap && find(cap, (x) => x.tag === 'button' && /aria-selected="true"/.test(x.attrs || ''));
        if (tab) {
          // 코드 탭(예: AI 요청 / HTML): 탭 이름을 굵게 적고, 언어는 탭 이름이 언어면 그것, 아니면 text
          const label = textOf(tab).trim();
          out.push(`**${label}**`);
          ctx.lang = /^(html|css|js|javascript|json|shell)$/i.test(label) ? label.toLowerCase() : 'text';
        } else {
          const lang = cap && find(cap, (x) => /ds-codeblock__language/.test(attr(x, 'class')));
          ctx.lang = lang ? textOf(lang).trim().split(/\s/)[0] : '';
        }
      }
      break;
    }
  }
  // 컴포넌트 목록 카드: 미리보기는 빼고 이름만 링크 한 줄로 (2026-11-04, 전에는 목록이 통째로 빠졌다)
  if (n.tag === 'a' && /\bsite-tile\b/.test(cls)) {
    const find = (x) => (/site-tile__name/.test(attr(x, 'class')) ? x : (x.kids || []).reduce((r, k) => r || (k.tag ? find(k) : null), null));
    const nm = find(n); const t = nm ? textOf(nm).replace(/\s+/g, ' ').trim() : '';
    if (t) out.push(`- [${t}](${ctx.abs(attr(n, 'href'))})`);
    return;
  }
  if (n.tag === 'span' || n.tag === 'a' || n.tag === 'b' || n.tag === 'code') return para();
  n.kids.forEach((k) => block(k, ctx, out));
}

// mdUrls: .md 가 있는 페이지 주소. 그 페이지로 가는 링크만 .md 로 바꾸고 나머지(템플릿, 테마)는 .html 그대로
export function htmlToMd(html, url, mdUrls) {
  const a = html.indexOf('<article class="site-doc"');
  // 예시 안에도 <article>(Card 등)이 있어 첫 </article> 가 아니라 마지막 것이 문서 끝이다 (2026-11-04 고침: 전에는 Card 쪽이 소개에서 끊겼다)
  const b = html.lastIndexOf('</article>');
  if (a < 0 || b < 0) return null;
  const tree = parse(html.slice(a, b));
  const base = new URL(url);
  const ctx = { lang: '', abs: (h) => { try { const u = new URL(h, base); if (u.pathname.endsWith('.html') && u.origin === base.origin && (!mdUrls || mdUrls.has(u.origin + u.pathname))) u.pathname = u.pathname.replace(/\.html$/, '.md'); return u.href; } catch { return h; } } };
  const out = [];
  block(tree, ctx, out);
  return out.join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// site 폴더의 문서(시작하기, Foundations, 컴포넌트)를 .md 로 쓰고 llms.txt 두 개를 만든다
// extra: 두 파일 끝에 붙이는 목록(템플릿, 테마)
export function writeMarkdown({ SITE, SITE_URL, groups, intro, extra = [] }) {
  const index = [];
  const full = [];
  let count = 0;
  const mdUrls = new Set(groups.flatMap((g) => g.pages.map((p) => SITE_URL + p.file)));
  for (const g of groups) {
    const lines = [];
    for (const { file, title, desc } of g.pages) {
      const html = fs.readFileSync(path.join(SITE, file), 'utf8');
      const md = htmlToMd(html, SITE_URL + file, mdUrls);
      if (!md) continue;
      const mdFile = file.replace(/\.html$/, '.md');
      fs.writeFileSync(path.join(SITE, mdFile), `<!-- ${SITE_URL}${file} -->\n\n${md}`);
      lines.push(`- [${title}](${SITE_URL}${mdFile})${desc ? `: ${desc}` : ''}`);
      full.push(`<!-- ${SITE_URL}${mdFile} -->\n\n${md}`);
      count++;
    }
    if (lines.length) index.push(`## ${g.label}\n\n${lines.join('\n')}`);
  }
  fs.writeFileSync(path.join(SITE, 'llms.txt'), `${intro}\n\n${[...index, ...extra].join('\n\n')}\n`);
  fs.writeFileSync(path.join(SITE, 'llms-full.txt'), `${intro}\n\n${[...full, ...extra].join('\n\n---\n\n')}\n`);
  return count;
}

#!/usr/bin/env node
// yds 규칙 검사 - 화면 파일에서 yds 규칙을 어긴 곳을 찾습니다. 설치할 것 없이 node 만 있으면 됩니다.
//   사용: node yds-check.mjs <파일 또는 폴더> [...]   (폴더는 안쪽 html, css, php, jsp, vue, jsx, tsx 를 모두 봅니다)
//         --json  결과를 JSON 으로   --quiet  요약만
//   문제가 있으면 종료 코드 1 입니다. AI 도구는 화면을 고친 뒤 이 스크립트를 돌리고, 나온 문제를 모두 고칩니다.
//   이 파일은 yds 문서 사이트를 만들 때 함께 만들어집니다(yds __VERSION__). 클래스, 아이콘, 토큰 목록이 안에 들어 있습니다.
import fs from 'node:fs';
import path from 'node:path';

const DATA = __DATA__;
const CLASSES = new Set(DATA.classes);
const ICONS = new Set(DATA.icons);
const TOKENS = new Set(DATA.tokens);
const EXT = /\.(html?|css|php|jsp|vue|jsx|tsx|svelte|njk|hbs|ejs)$/i;
const SKIP_DIR = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'vendor']);

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const quiet = args.includes('--quiet');
const targets = args.filter((a) => !a.startsWith('--'));
if (!targets.length) {
  console.log('사용: node yds-check.mjs <파일 또는 폴더> [--json] [--quiet]');
  process.exit(2);
}
const files = [];
const walk = (p) => {
  let st; try { st = fs.statSync(p); } catch { console.error(`없는 경로: ${p}`); return; }
  if (st.isDirectory()) { for (const e of fs.readdirSync(p)) if (!SKIP_DIR.has(e)) walk(path.join(p, e)); }
  else if (EXT.test(p)) files.push(p);
};
targets.forEach(walk);

const problems = [];
const lineOf = (src, i) => src.slice(0, i).split('\n').length;
// warn: 꼭 틀린 것은 아니지만 살펴볼 곳(주의). 주의만 있으면 종료 코드는 0
const add = (file, src, i, kind, msg, warn = false) => problems.push({ file, line: lineOf(src, i), kind, msg, level: warn ? '주의' : '오류' });
const dynamic = (s) => /\$\{|\{\{|<\?|<%|\{[a-zA-Z]/.test(s);

function checkStyles(file, src, css, offset, inline) {
  const code = css.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length));
  const at = (i) => offset + i;
  // 그림 주소(url(...)) 안의 색은 보지 않는다
  const noUrl = code.replace(/url\([^)]*\)/g, (m) => ' '.repeat(m.length));
  for (const m of noUrl.matchAll(/#[0-9a-fA-F]{3,8}\b|\brgba?\([^)]*\)|\bhsla?\([^)]*\)/g)) {
    // 토큰을 정의하는 자리(--ds-color-palette-brand-600: #...)는 브랜드 컬러 덮어쓰기라 괜찮다
    const before = noUrl.slice(Math.max(0, m.index - 80), m.index);
    if (/--ds-color-palette-brand-\d+\s*:\s*$/.test(before)) continue;
    add(file, src, at(m.index), '색', `색 값 ${m[0]} 을 직접 썼습니다. --ds-color-* 역할 토큰을 쓰세요.`);
  }
  for (const m of noUrl.matchAll(/font-weight\s*:\s*(\d{3})/g)) add(file, src, at(m.index), '글자', `굵기 ${m[1]} 을 숫자로 썼습니다. --ds-font-weight-* 토큰을 쓰세요.`);
  for (const m of noUrl.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?px)/g)) add(file, src, at(m.index), '글자', `글자 크기 ${m[1]} 을 숫자로 썼습니다. --ds-font-size-* 토큰을 쓰세요.`);
  for (const m of noUrl.matchAll(/!important/g)) add(file, src, at(m.index), '덮어쓰기', '!important 를 쓰지 않습니다. 서비스 CSS 를 DS 다음에 불러오면 됩니다.');
  for (const m of noUrl.matchAll(/var\((--ds-[a-z0-9_-]+)/g)) if (!TOKENS.has(m[1])) add(file, src, at(m.index), '토큰', `없는 토큰 ${m[1]} 입니다.`);
  if (inline) return;
  // DS 부품 겉모습을 직접 덮는 곳: 선택자에 .ds- 가 있고 색, 바탕, 테두리, 모서리, 안쪽 여백, 글자 같은 속성을 바꾸면 알린다.
  // 자리 잡기(폭, 위치, flex, grid, 바깥 여백, 보이기/숨기기)는 화면 배치라 괜찮다. 아이콘 색은 부모 글자색을 따르므로 .ds-icon 의 color 도 괜찮다
  const LOOK = /^(color|background(-color|-image)?|border(-[a-z]+)*|outline(-[a-z]+)*|box-shadow|padding(-[a-z]+)*|font(-[a-z]+)*|line-height|letter-spacing|text-decoration(-[a-z]+)*|height|min-height)$/;
  for (const m of noUrl.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const sel = m[1].trim(); const body = m[2];
    if (!/\.ds-[a-z]/.test(sel) || /^@/.test(sel)) continue;
    const props = body.split(';').map((d) => d.split(':')[0].trim()).filter(Boolean);
    const look = props.filter((p) => LOOK.test(p) && !(p === 'color' && /\.ds-icon\b[^,]*$/.test(sel)));
    if (look.length) add(file, src, at(m.index + m[0].indexOf(sel)), '덮어쓰기', `DS 부품(${sel.slice(0, 40)})의 ${look.slice(0, 3).join(', ')} 을 직접 바꿨습니다. 부품 변수(--ds-부품-*)를 덮어쓰거나 맞는 변형(data-*)을 쓰세요.`, true);
  }
}

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  if (/\.css$/i.test(file)) { checkStyles(file, src, src, 0, false); continue; }
  // <style> 와 style=""
  for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) checkStyles(file, src, m[1], m.index + m[0].indexOf(m[1]), false);
  for (const m of src.matchAll(/\sstyle="([^"]*)"/g)) if (!dynamic(m[1])) checkStyles(file, src, m[1], m.index, true);
  // 클래스
  for (const m of src.matchAll(/\sclass(?:Name)?="([^"]*)"/g)) {
    if (dynamic(m[1])) continue;
    for (const c of m[1].split(/\s+/)) {
      if (!c) continue;
      if (c.startsWith('ds-icon--')) { const n = c.slice(9); if (!['sm', 'lg'].includes(n) && !ICONS.has(n)) add(file, src, m.index, '아이콘', `없는 아이콘 ${n} 입니다. icons.json 에 있는 이름만 씁니다.`); continue; }
      if (/^(ds|u)-/.test(c) && !CLASSES.has(c)) add(file, src, m.index, '클래스', `yds 에 없는 클래스 ${c} 입니다. 새 ds- 클래스를 만들지 않습니다.`);
    }
  }
  // 접근성: 아이콘만 있는 버튼 이름, 꾸밈 아이콘, 그림 대체 글
  for (const m of src.matchAll(/<(button|a)\b([^>]*data-layout="iconOnly"[^>]*)>/g)) if (!/aria-label(ledby)?=/.test(m[2])) add(file, src, m.index, '접근성', '아이콘만 있는 버튼에 aria-label 이 없습니다.');
  for (const m of src.matchAll(/<i\b([^>]*class="[^"]*\bds-icon\b[^"]*"[^>]*)>/g)) if (!/aria-hidden="true"|aria-label=|role="img"/.test(m[1])) add(file, src, m.index, '접근성', '꾸밈 아이콘에 aria-hidden="true" 가 없습니다.');
  for (const m of src.matchAll(/<img\b([^>]*)>/g)) if (!/\salt=/.test(m[1])) add(file, src, m.index, '접근성', '그림에 alt 가 없습니다.');
  // 글: 긴 줄표, 가운뎃점
  const text = src.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, (x) => ' '.repeat(x.length)).replace(/<[^>]+>/g, (x) => ' '.repeat(x.length));
  for (const m of text.matchAll(/[—–·]/g)) add(file, src, m.index, '글', `"${m[0]}" 대신 쉼표나 " / " 를 씁니다.`);
}

const errors = problems.filter((p) => p.level === '오류');
const warns = problems.filter((p) => p.level === '주의');
if (asJson) { console.log(JSON.stringify({ files: files.length, errors: errors.length, warnings: warns.length, problems }, null, 2)); process.exit(errors.length ? 1 : 0); }
const count = (list) => { const k = {}; for (const p of list) k[p.kind] = (k[p.kind] || 0) + 1; return Object.entries(k).map(([a, b]) => `${a} ${b}`).join(', '); };
if (!quiet) for (const p of [...errors, ...warns]) console.log(`${p.file}:${p.line}  ${p.level} [${p.kind}] ${p.msg}`);
console.log(`\nyds 검사: 파일 ${files.length}개, 오류 ${errors.length}개${errors.length ? ` (${count(errors)})` : ''}, 주의 ${warns.length}개${warns.length ? ` (${count(warns)})` : ''}`);
process.exit(errors.length ? 1 : 0);

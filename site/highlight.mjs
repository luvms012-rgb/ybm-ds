// 사이트 코드 상자 글자 색 (11-04 사용자 "코드뷰 컬러로 개선, seed 참조"): 레퍼런스 B 의 GitHub 테마 규칙
//   키워드 빨강 .hl-k / 문자열 남색 .hl-s / 함수, 속성 이름 보라 .hl-f / 상수, CSS 속성 파랑 .hl-c / 태그 초록 .hl-t / 주석 회색 .hl-m
//   빌드 때 HTML 로 바꾼다. 색은 site.css 에서 DS 팔레트 토큰으로 칠해 다크 모드에서도 따라 바뀐다
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const span = (cls, s) => `<span class="hl-${cls}">${esc(s)}</span>`;

function html(code) {
  const re = /(<!--[\s\S]*?-->)|(<\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)(\s*\/?>)?/g;
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    if (m[1]) out += span('m', m[1]);
    else {
      out += esc(m[2]) + span('t', m[3]);
      out += (m[4] || '').replace(/(\s+)([^\s=>/]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g, (a, sp, name, eq, val) => esc(sp) + span('f', name) + (eq ? esc(eq) + span('s', val) : ''));
      out += esc(m[5] || '');
    }
    last = re.lastIndex;
  }
  return out + esc(code.slice(last));
}

function css(code) {
  const re = /\/\*[\s\S]*?\*\/|"[^"]*"|'[^']*'|@[\w-]+|[{}]|--[\w-]+|[\w-]+(?=\()|-?\d[\w.%]*|#[0-9a-fA-F]{3,8}\b|[\w-]+|[\s\S]/g;
  let out = '', depth = 0, m;
  while ((m = re.exec(code))) {
    const t = m[0], rest = code.slice(re.lastIndex);
    if (t.startsWith('/*')) out += span('m', t);
    else if (t[0] === '"' || t[0] === "'") out += span('s', t);
    else if (t[0] === '@') out += span('k', t);
    else if (t === '{') { depth++; out += t; }
    else if (t === '}') { depth = Math.max(0, depth - 1); out += t; }
    else if (/^--/.test(t)) out += span('c', t);
    else if (/^[\w-]+$/.test(t) && /^\(/.test(rest)) out += span('f', t);
    // 속성 이름. 중괄호 밖에서는 @media (min-width: ...) 처럼 콜론 뒤를 띄운 것만 (a:hover 는 선택자)
    else if (/^[A-Za-z_-][\w-]*$/.test(t) && (depth > 0 ? /^\s*:/.test(rest) : /^:\s/.test(rest))) out += span('c', t);
    else if (/^[A-Za-z_-][\w-]*$/.test(t) && depth === 0) out += span('t', t);
    else if (/^(-?\d|#[0-9a-fA-F])/.test(t)) out += span('c', t);
    else out += esc(t);
  }
  return out;
}

const JS_KEY = new Set('const let var function return if else for while do switch case break continue import from export default new require module async await class extends this typeof instanceof in of try catch finally throw'.split(' '));
const JS_CONST = new Set('true false null undefined'.split(' '));
function js(code) {
  const re = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:\\[\s\S]|[^`])*`|"(?:\\.|[^"\n])*"|'(?:\\.|[^'\n])*'|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*|[\s\S]/g;
  let out = '', m;
  while ((m = re.exec(code))) {
    const t = m[0], rest = code.slice(re.lastIndex);
    if (t.startsWith('//') || t.startsWith('/*')) out += span('m', t);
    else if (/^[`"']/.test(t)) out += span('s', t);
    else if (/^\d/.test(t)) out += span('c', t);
    else if (JS_KEY.has(t)) out += span('k', t);
    else if (JS_CONST.has(t)) out += span('c', t);
    else if (/^[A-Za-z_$]/.test(t) && /^\s*\(/.test(rest)) out += span('f', t);
    else out += esc(t);
  }
  return out;
}

// shell: 줄 첫 낱말은 명령(보라), # 뒤는 주석, 따옴표는 문자열. <로 시작하는 줄은 HTML 로
function shell(code) {
  return code.split('\n').map((line) => {
    if (/^\s*</.test(line)) return html(line);
    const c = line.match(/^(\s*)(#.*)$/);
    if (c) return esc(c[1]) + span('m', c[2]);
    const m = line.match(/^(\s*)(\S+)(.*)$/);
    if (!m) return esc(line);
    return esc(m[1]) + span('f', m[2]) + m[3].split(/("[^"]*"|'[^']*'|\s#.*$)/).map((p) => (/^["']/.test(p) ? span('s', p) : /^\s#/.test(p) ? span('m', p) : esc(p))).join('');
  }).join('\n');
}

export function highlight(code, lang = 'html') {
  const l = String(lang).toLowerCase();
  if (l === 'html' || l === 'xml' || l === 'svg') return html(code);
  if (l === 'css') return css(code);
  if (l === 'javascript' || l === 'js' || l === 'json' || l === 'ts') return js(code);
  if (l === 'shell' || l === 'bash' || l === 'sh') return shell(code);
  return esc(code);
}

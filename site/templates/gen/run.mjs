// 템플릿 생성기: 분류별 파일(dashboard.mjs 등)을 모아 ../pages/*.html 과 ../../src/templates.json 을 다시 쓴다.
// 사용: node site/templates/gen/run.mjs  →  node site/build.mjs
// 레퍼런스 A 템플릿 51종의 구조를 YBM DS 로 다시 짠 것이다. 목록에 없는 옛 템플릿 파일은 지운다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { page } from './kit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.join(HERE, '..', 'pages');
const JSON_PATH = path.join(HERE, '..', '..', 'src', 'templates.json');
const GROUPS = ['Dashboard', 'Table', 'Form', 'Settings', 'Login', 'Tools', 'Content', 'AI Chat', 'Gallery', 'Shell', 'Community', 'Pricing', 'Exam', 'Exam B2B', 'Learning B2B'];
const MODS = ['dashboard', 'table', 'form', 'settings', 'login', 'tools', 'content', 'aichat', 'gallery', 'shell', 'community', 'pricing', 'exam', 'learning'];

const all = [];
for (const m of MODS) {
  const f = path.join(HERE, m + '.mjs');
  if (!fs.existsSync(f)) continue;
  const { templates } = await import(pathToFileURL(f).href);
  all.push(...templates);
}
all.sort((a, b) => GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.en.localeCompare(b.en));

const old = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const keepFigma = Object.fromEntries((old.templates || []).filter((t) => t.figma && t.rebuilt).map((t) => [t.slug, t.figma]));
for (const t of all) fs.writeFileSync(path.join(PAGES, t.slug + '.html'), page({ title: t.name, css: t.css || '', body: t.body, bodyClass: t.bodyClass || '' }));
const slugs = new Set(all.map((t) => t.slug));
let removed = 0;
for (const f of fs.readdirSync(PAGES)) if (f.endsWith('.html') && !slugs.has(f.slice(0, -5))) { fs.unlinkSync(path.join(PAGES, f)); removed++; }
const out = { ...old, templates: all.map(({ slug, en, name, group, desc }) => ({ slug, name, en, group, desc, rebuilt: true, ...(keepFigma[slug] ? { figma: keepFigma[slug] } : {}) })) };
fs.writeFileSync(JSON_PATH, JSON.stringify(out, null, 2) + '\n');
console.log(`${all.length}종 생성, 옛 파일 ${removed}개 삭제`);

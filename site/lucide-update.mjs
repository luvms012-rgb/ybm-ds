// Lucide 전체 아이콘 목록 갱신 - node site/lucide-update.mjs <내려받은 폴더> <버전>
// 폴더에는 npm lucide-static 패키지의 icon-nodes.json, tags.json, LICENSE 가 있어야 한다.
//   예) https://cdn.jsdelivr.net/npm/lucide-static@1.64.0/icon-nodes.json (tags.json, LICENSE 도 같은 위치)
// 결과: site/src/lucide-icons.json (이름 → SVG 안쪽, 검색어), site/src/lucide-LICENSE.txt
// 사이트 아이콘 페이지의 "Lucide 전체" 목록만 쓰는 자료다. DS CSS(dist/icons.css)는 바꾸지 않는다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.dirname(fileURLToPath(import.meta.url));
const [dir, version] = process.argv.slice(2);
if (!dir || !version) { console.error('사용법: node site/lucide-update.mjs <폴더> <버전>'); process.exit(1); }
const nodes = JSON.parse(fs.readFileSync(path.join(dir, 'icon-nodes.json'), 'utf8'));
const tags = JSON.parse(fs.readFileSync(path.join(dir, 'tags.json'), 'utf8'));
const attr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const icons = {};
for (const name of Object.keys(nodes).sort()) {
  icons[name] = nodes[name].map(([tag, attrs]) => `<${tag}${Object.entries(attrs).filter(([k]) => k !== 'key').map(([k, v]) => ` ${k}="${attr(v)}"`).join('')}/>`).join('');
}
const tagOut = {};
for (const name of Object.keys(icons)) if (tags[name]) tagOut[name] = tags[name].join(' ');
fs.writeFileSync(path.join(SITE, 'src/lucide-icons.json'), JSON.stringify({ version, icons, tags: tagOut }));
fs.copyFileSync(path.join(dir, 'LICENSE'), path.join(SITE, 'src/lucide-LICENSE.txt'));
console.log(`  ✔ Lucide ${version} 아이콘 ${Object.keys(icons).length}개`);

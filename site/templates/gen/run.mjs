// 시험·학습 템플릿 15종(exam.mjs, b2b-learning.mjs)을 다시 만들어 ../pages/ 에 쓴다.
// 사용: node site/templates/gen/run.mjs  →  그다음 node site/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages as A } from './exam.mjs';
import { pages as B } from './b2b-learning.mjs';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'pages') + path.sep;
const all = { ...A, ...B };
for (const [slug, html] of Object.entries(all)) fs.writeFileSync(OUT + slug + '.html', html);
console.log(Object.keys(all).length, 'files');

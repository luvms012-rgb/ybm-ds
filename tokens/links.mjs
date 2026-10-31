// YBM DS — "문서 / 코드" 링크 계획. Figma 문서 프레임(sync.mjs links · figma)과 문서 사이트(site/build.mjs)가 같은 주소를 쓰도록 여기서 한 번만 만든다.
//   문서 = 문서 사이트의 그 페이지, 코드 = GitHub 의 그 부품 CSS 구간(줄 범위), Figma = 그 문서 프레임
//   줄 번호는 CSS 를 고치면 밀린다 → 사이트는 빌드마다 다시 계산되고, Figma 쪽은 node sync.mjs figma 점검 뒤 node sync.mjs links 로 다시 건다.
import fs from 'node:fs';
import path from 'node:path';

export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// 구획 머리(/* ---- 줄 다음 줄)의 번호로 CSS 를 나눈다 → { 번호: [시작 줄, 끝 줄] } (1부터 세는 줄 번호)
export function cssSections(text, re) {
  const lines = text.split('\n');
  const heads = [];
  for (let i = 1; i < lines.length; i++) {
    const m = /^\/\* -{10,}/.test(lines[i - 1]) && lines[i].match(re);
    if (m && (!heads.length || heads[heads.length - 1].key !== m[1])) heads.push({ key: m[1], start: i });
  }
  let last = lines.length; while (last > 0 && !lines[last - 1].trim()) last--;
  return Object.fromEntries(heads.map((h, k) => [h.key, [h.start, k + 1 < heads.length ? heads[k + 1].start - 1 : last]]));
}

// Foundations 페이지(사이트 slug) ↔ tokens.css 구획 번호. icons 는 icons.css 파일 전체.
const FOUNDATION_SECTIONS = { color: ['1', '3'], typography: ['6', '6'], spacing: ['4', '4'], shape: ['5', '5'], elevation: ['7', '7'], motion: ['7', '7'], icons: null };

export function linkPlan(DS) {
  const read = (p) => fs.readFileSync(path.join(DS, p), 'utf8');
  const cfg = JSON.parse(read('deploy.config.json'));
  const manifest = JSON.parse(read('components.json'));
  const site = cfg.pagesUrl + 'site/';
  const src = `${cfg.repoUrl}/blob/${cfg.branch}/`;
  const figmaUrl = (id) => `https://www.figma.com/design/${manifest.figmaFile}/?node-id=${id.replace(':', '-')}`;
  const range = (file, [a, b]) => `${src}${file}#L${a}-L${b}`;
  const comp = cssSections(read('dist/components.css'), /^\s+(\d\d)(?:-\d+)?\s/);
  const tok = cssSections(read('dist/tokens.css'), /^\s+(\d)\.\s/);
  const entries = manifest.components.map((c) => {
    if (!comp[c.no]) throw new Error(`components.css 에 ${c.no} ${c.name} 구획(/* ---- 다음 줄 "${c.no} ${c.name}")이 없어요.`);
    const slug = slugify(c.name);
    return { no: c.no, ids: c.figma.map((f) => f.id), doc: c.doc || null, slug, start: comp[c.no][0], end: comp[c.no][1], figma: c.doc ? figmaUrl(c.doc) : null, site: `${site}components/${slug}.html`, code: range('dist/components.css', comp[c.no]) };
  });
  const docs = manifest.figmaDocs || {};
  const fixed = Object.entries(FOUNDATION_SECTIONS).map(([slug, sec]) => ({
    slug, frame: docs[slug] || null, figma: docs[slug] ? figmaUrl(docs[slug]) : null,
    doc: `${site}foundations/${slug}.html`,
    code: sec ? range('dist/tokens.css', [tok[sec[0]][0], tok[sec[1]][1]]) : `${src}dist/icons.css`,
  }));
  // About 페이지 링크 묶음 (글자와 링크를 함께 맞춘다)
  const about = [{ node: '2482:841', url: cfg.repoUrl }, { node: '2482:844', url: cfg.pagesUrl }, { node: 'ABOUT_SITE', url: site }];
  return { entries, fixed, about, site, src: `${src}dist/components.css`, figmaUrl };
}

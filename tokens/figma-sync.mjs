#!/usr/bin/env node
// Figma ↔ 스냅샷(tokens/figma-variables.json) 변수 동기화 도우미.
//
//   node tokens/figma-sync.mjs check   → tokens/.figma-check.js 생성
//        그 파일 내용을 Figma MCP use_figma 로 실행한다(fileKey 1VCEsFU3xMWuXIntIrZz9i, 읽기 전용).
//        Figma 가 스냅샷과 다른 변수만 돌려준다: { same, added, removed, changed, collections }.
//   node tokens/figma-sync.mjs apply <결과.json>
//        use_figma 결과(JSON)를 저장한 파일을 스냅샷에 병합한다. 보통은 node sync.mjs pull 이 이 과정을 대신한다.
//
// 비교 기준: 변수 이름 · 타입 · 모드별 값(색 hex, 숫자, 별칭 이름) · description.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SNAP = path.join(HERE, 'figma-variables.json');
const OUT = path.join(HERE, '.figma-check.js');

// Figma 쪽과 똑같이 계산해야 하므로 아래 두 함수는 check 스크립트에도 문자열로 그대로 들어간다.
function canon(rec, modes) {
  const vals = modes.map((m) => {
    const v = rec.values[m];
    if (v && typeof v === 'object') return { alias: v.alias };
    if (typeof v === 'number') return Math.round(v * 10000) / 10000;
    return typeof v === 'string' ? v.toLowerCase() : v;
  });
  return JSON.stringify([rec.type, vals, rec.description || '']);
}
function fnv(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
}

const snap = JSON.parse(fs.readFileSync(SNAP, 'utf8'));
const cmd = process.argv[2];

if (cmd === 'check') {
  const hashes = {};
  for (const [cname, c] of Object.entries(snap.collections)) {
    hashes[cname] = { modes: c.modes, vars: {} };
    for (const [n, r] of Object.entries(c.variables)) hashes[cname].vars[n] = fnv(canon(r, c.modes));
  }
  const script = `// 자동 생성 — node tokens/figma-sync.mjs check (스냅샷 ${snap.$meta.dumped})
const SNAP = ${JSON.stringify(hashes)};
${canon.toString()}
${fnv.toString()}
const hex2 = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
const toHex = (c) => '#' + hex2(c.r) + hex2(c.g) + hex2(c.b) + (c.a === undefined || c.a >= 1 ? '' : hex2(c.a));
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const all = await figma.variables.getLocalVariablesAsync();
const byId = new Map(all.map((v) => [v.id, v]));
const res = { same: 0, added: {}, removed: [], changed: {}, collections: {} };
for (const c of cols) {
  const modes = c.modes.map((m) => m.name);
  const snapC = SNAP[c.name];
  res.collections[c.name] = { modes, count: c.variableIds.length, order: [] };
  if (!snapC || JSON.stringify(snapC.modes) !== JSON.stringify(modes)) res.collections[c.name].modesChanged = true;
  const seen = new Set();
  for (const id of c.variableIds) {
    const v = byId.get(id); if (!v) continue;
    res.collections[c.name].order.push(v.name);
    const values = {};
    for (const m of c.modes) {
      const raw = v.valuesByMode[m.modeId];
      if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
        const t = byId.get(raw.id) || (await figma.variables.getVariableByIdAsync(raw.id));
        values[m.name] = { alias: t ? t.name : raw.id };
      } else values[m.name] = v.resolvedType === 'COLOR' ? toHex(raw) : raw;
    }
    const rec = { type: v.resolvedType, values };
    if (v.description) rec.description = v.description;
    seen.add(v.name);
    const old = snapC && snapC.vars[v.name];
    if (old === undefined) (res.added[c.name] ||= {})[v.name] = rec;
    else if (old !== fnv(canon(rec, modes))) (res.changed[c.name] ||= {})[v.name] = rec;
    else res.same++;
  }
  if (snapC) for (const n of Object.keys(snapC.vars)) if (!seen.has(n)) res.removed.push(c.name + ' / ' + n);
}
for (const n of Object.keys(SNAP)) if (!res.collections[n]) res.removed.push(n + ' (컬렉션 전체)');
const dirty = Object.keys(res.added).length || Object.keys(res.changed).length || res.removed.length
  || Object.values(res.collections).some((c) => c.modesChanged);
if (!dirty) for (const c of Object.values(res.collections)) delete c.order; // 변경 없으면 결과를 짧게
res.inSync = !dirty;
return res;
`;
  fs.writeFileSync(OUT, script, 'utf8');
  console.log(`생성: ${path.relative(process.cwd(), OUT)} (${(script.length / 1024).toFixed(1)}KB) — use_figma 로 실행`);
} else if (cmd === 'apply') {
  const res = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
  if (res.inSync) { console.log('변경 없음 — 스냅샷 그대로'); process.exit(0); }
  const log = [];
  const next = { $meta: { ...snap.$meta, collections: {} }, collections: {} };
  for (const [cname, info] of Object.entries(res.collections)) {
    const old = snap.collections[cname]?.variables || {};
    const vars = {};
    for (const n of info.order) {
      const rec = res.changed[cname]?.[n] || res.added[cname]?.[n] || old[n];
      if (!rec) throw new Error(`값을 알 수 없는 변수: ${cname} / ${n}`);
      if (res.changed[cname]?.[n]) log.push(`변경  ${cname} / ${n}`);
      if (res.added[cname]?.[n]) log.push(`추가  ${cname} / ${n}`);
      vars[n] = rec;
    }
    next.collections[cname] = { modes: info.modes, variables: vars };
    next.$meta.collections[cname] = { modes: info.modes, count: info.order.length };
  }
  for (const r of res.removed) log.push(`삭제  ${r}`);
  next.$meta.dumped = new Date().toISOString().slice(0, 10);
  fs.copyFileSync(SNAP, SNAP.replace(/\.json$/, `.backup-${snap.$meta.dumped}.json`));
  fs.writeFileSync(SNAP, JSON.stringify(next, null, 2) + '\n', 'utf8');
  console.log(log.join('\n') || '(순서만 바뀜)');
  console.log(`\n스냅샷 갱신 완료 → 다음: node tokens/build.mjs (sync.mjs pull 은 자동)`);
} else {
  console.log('사용: node tokens/figma-sync.mjs check | apply <결과.json>');
  process.exit(1);
}

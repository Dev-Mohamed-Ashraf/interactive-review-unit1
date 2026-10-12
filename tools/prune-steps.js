#!/usr/bin/env node
/* =========================================================
 * tools/prune-steps.js — remove scene steps from lesson files by rule
 * (used for the "one explanation per topic" cleanup).
 *   node tools/prune-steps.js            → dry run: list what would go
 *   node tools/prune-steps.js --write    → rewrite the lesson files
 * A step is the object literal directly inside a `steps: [ … ]` array.
 * Rules match on lesson + station + anim (+ photo img).
 * ========================================================= */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// [lesson, station, anim, img?]  — every matching scene step is removed
const RULES = [
  ['1-1', 'history', 'cinema'], ['1-1', 'history', 'eraTimeline'], ['1-1', 'history', 'photo', 'img/eras.webp'],
  ['1-1', 'history', 'photo', 'img/real-eniac.webp'], ['1-1', 'history', 'photo', 'img/datacenter.webp'],
  ['1-1', 'moore', 'cinema'], ['1-1', 'moore', 'mooreChip'], ['1-1', 'moore', 'photo', 'img/real-wafer.webp'],
  ['1-1', 'moore', 'mooreLimit'], ['1-1', 'moore', 'mooreParallel'],
  ['1-1', 'social', 'iconCards'],
  ['1-1', 'emerging', 'cinema'],
  ['1-2', 'what', 'cinema'], ['1-2', 'what', 'nestedCircles'],
  ['1-2', 'ml', 'photo', 'img/rules-vs-learned.webp'], ['1-2', 'ml', 'spamTrainer'],
  ['1-2', 'dl', 'neuralNet'], ['1-2', 'dl', 'photo', 'img/ai-xray.webp'],
  ['1-2', 'genai', 'genAI'], ['1-2', 'genai', 'hallucinationWhy'], ['1-2', 'genai', 'iconCards'], ['1-2', 'genai', 'photo', 'img/verify.webp'],
  ['1-3', 'daily', 'dailyAI'], ['1-3', 'daily', 'photo', 'img/recommend.webp'],
  ['1-3', 'industry', 'cinema'], ['1-3', 'industry', 'industries'],
  ['1-3', 'caution', 'goodVsCaution'], ['1-3', 'caution', 'photo', 'img/doctor-xray.webp'], ['1-3', 'caution', 'blackBox'],
  ['1-3', 'caution', 'blackBoxWhy'], ['1-3', 'caution', 'iconCards'],
  ['1-4', 'bias', 'biasSim'], ['1-4', 'bias', 'photo', 'img/bias.webp'],
  ['1-4', 'privacy', 'cinema'], ['1-4', 'privacy', 'privacyCam'], ['1-4', 'privacy', 'photo', 'img/privacy.webp'],
  ['1-4', 'xai', 'blackBox'], ['1-4', 'xai', 'photo', 'img/xai.webp'], ['1-4', 'xai', 'xaiExplain'], ['1-4', 'xai', 'responsibility'],
  ['1-4', 'principles', 'iconCards'],
  ['2-1', 'https', 'tlsStory'], ['2-1', 'https', 'threatsDemo'], ['2-1', 'https', 'photo', 'img/cy-https.webp'], ['2-1', 'https', 'tlsHandshake'],
  ['2-1', 'auth', 'mfaStory'], ['2-1', 'auth', 'mfaDemo'], ['2-1', 'auth', 'photo', 'img/cy-mfa.webp'],
  ['2-1', 'combine', 'photo', 'img/cy-cert.webp'],
  ['2-2', 'blocks', 'fortressStory'], ['2-2', 'blocks', 'firewallSim'], ['2-2', 'blocks', 'photo', 'img/cy-firewall.webp'],
  ['2-2', 'blocks', 'vpnTunnel'], ['2-2', 'blocks', 'photo', 'img/cy-vpn.webp'], ['2-2', 'blocks', 'dmzMap'],
  ['2-3', 'incident', 'incidentStory'], ['2-3', 'incident', 'incidentResponse'], ['2-3', 'incident', 'photo', 'img/cy-recover.webp'],
  ['2-3', 'risk', 'photo', 'img/cy-risk.webp'],
];

/** offsets of every object literal that sits directly inside a `steps: [` array */
function stepRanges(src) {
  const out = [];
  const stack = []; // entries: '{' | '[' | 'steps['
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2) + 2; continue; }
    if (c === "'" || c === '"' || c === '`') {
      const q = c; i++;
      while (i < n && src[i] !== q) { if (src[i] === '\\') i++; i++; }
      i++; continue;
    }
    if (c === '[') {
      const before = src.slice(Math.max(0, i - 12), i);
      stack.push(/steps:\s*$/.test(before) ? 'steps[' : '[');
    } else if (c === '{') {
      if (stack[stack.length - 1] === 'steps[') out.push({ start: i, end: -1, depth: stack.length });
      stack.push('{');
    } else if (c === ']') stack.pop();
    else if (c === '}') {
      stack.pop();
      const open = out.find((r) => r.end === -1 && r.depth === stack.length);
      if (open && stack[stack.length - 1] === 'steps[') open.end = i + 1;
    }
    i++;
  }
  return out.filter((r) => r.end > 0);
}

function stationAt(src, pos) {
  const re = /\n {6}id: '([^']+)'/g;
  let m, last = null;
  while ((m = re.exec(src)) && m.index < pos) last = m[1];
  return last;
}

const write = process.argv.includes('--write');
const used = new Set();
const lessonsDir = path.join(ROOT, 'js/content');
['1-1', '1-2', '1-3', '1-4', '2-1', '2-2', '2-3'].forEach((lid) => {
  const file = path.join(lessonsDir, `lesson-${lid}.js`);
  let src = fs.readFileSync(file, 'utf8');
  const kill = [];
  stepRanges(src).forEach((r) => {
    const body = src.slice(r.start, r.end);
    const anim = (body.match(/visual:\s*\{\s*anim:\s*'([^']+)'/) || [])[1];
    if (!anim) return;
    const img = (body.match(/img:\s*'([^']+)'/) || [])[1];
    const st = stationAt(src, r.start);
    const rule = RULES.find((x) => x[0] === lid && x[1] === st && x[2] === anim && (!x[3] || x[3] === img));
    if (!rule) return;
    used.add(RULES.indexOf(rule));
    const title = (body.match(/title:\s*\{\s*ar:\s*'([^']*)'/) || [])[1] || '';
    console.log(`${lid}/${st}  − ${anim}${img ? ' ' + img : ''}  ${title}`);
    kill.push(r);
  });
  if (write && kill.length) {
    kill.sort((a, b) => b.start - a.start).forEach((r) => {
      // swallow the trailing comma and the line break so no blank lines are left behind
      let s = r.start, e = r.end;
      while (s > 0 && src[s - 1] === ' ') s--;
      if (src[e] === ',') e++;
      if (src[e] === '\n') e++;
      src = src.slice(0, s) + src.slice(e);
    });
    fs.writeFileSync(file, src);
  }
});
RULES.forEach((r, k) => { if (!used.has(k)) console.log('!! rule matched nothing:', r.join(' ')); });
console.log(write ? 'written' : '(dry run)');

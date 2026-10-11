#!/usr/bin/env node
/* =========================================================
 * tools/quiz-report.js — quality report for the questions.
 *   node tools/quiz-report.js            → summary per station
 *   node tools/quiz-report.js --list     → every MCQ whose answer is the longest option
 * Finds the patterns students learn to exploit:
 *   • true/false answers in a predictable order (T F T F…, all T…)
 *   • the correct MCQ option being the longest one
 * ========================================================= */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function loadLessons() {
  const lessons = {};
  const RV = { lessons: { add: (id, l) => { lessons[id] = l; }, get: (id) => lessons[id] }, unit: null };
  const ctx = { RV, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  // the real RV.addSteps (core/registry.js) is tiny; mirror it here
  RV.addSteps = (lid, sid, steps) => {
    const st = lessons[lid].stations.find((s) => s.id === sid);
    if (!st) throw new Error(`addSteps: no station ${sid} in ${lid}`);
    const at = st.steps.findIndex((s) => s.type === 'summary');
    st.steps.splice(at === -1 ? st.steps.length : at, 0, ...steps);
  };
  const files = fs.readdirSync(path.join(ROOT, 'js/content')).filter((f) => /^lesson-.*\.js$/.test(f)).sort()
    .concat(fs.readdirSync(path.join(ROOT, 'js/content')).filter((f) => /^checks-.*\.js$/.test(f)).sort());
  files.forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/content', f), 'utf8'), ctx));
  return lessons;
}

const len = (bi) => String((bi && (bi.ar || bi)) || '').replace(/[*_`]/g, '').length;

function quizzes(lesson) {
  const out = [];
  lesson.stations.forEach((st) => st.steps.forEach((step, k) => {
    if (step.type === 'quiz' && step.q) out.push({ st, k, q: step.q });
  }));
  return out;
}

/** Correct option is the strictly longest (by > 15 %) → a giveaway. */
function longestIsAnswer(q) {
  if (q.widget !== 'mcq' || Array.isArray(q.answer)) return false;
  const L = q.options.map(len);
  const others = L.filter((_, i) => i !== q.answer);
  return L[q.answer] > Math.max(...others) * 1.15;
}

function tfSequence(lesson, st) {
  const seq = [];
  st.steps.forEach((s) => { if (s.type === 'quiz' && s.q && s.q.widget === 'tf') s.q.items.forEach((it) => seq.push(it.answer ? 'T' : 'F')); });
  return seq.join('');
}

function report(list) {
  const lessons = loadLessons();
  const rows = [];
  Object.values(lessons).forEach((L) => {
    const qs = quizzes(L);
    const mcq = qs.filter((x) => x.q.widget === 'mcq' && !Array.isArray(x.q.answer));
    const longest = mcq.filter((x) => longestIsAnswer(x.q));
    const pos = [0, 0, 0, 0, 0, 0];
    mcq.forEach((x) => { pos[x.q.answer]++; });
    console.log(`\n■ ${L.id}: ${qs.length} questions · MCQ ${mcq.length} · answer = longest option in ${longest.length} · answer positions A/B/C/D = ${pos.slice(0, 4).join('/')}`);
    L.stations.forEach((st) => {
      const n = st.steps.filter((s) => s.type === 'quiz').length;
      const seq = tfSequence(L, st);
      if (n) console.log(`   ${st.id.padEnd(12)} ${String(n).padStart(2)} q  T/F: ${seq || '-'}`);
    });
    if (list) longest.forEach((x) => console.log(`     ⚠ ${L.id}/${x.st.id}#${x.k}: ${x.q.prompt.ar}\n        ✓ ${x.q.options[x.q.answer].ar}`));
    rows.push({ id: L.id, total: qs.length, mcq: mcq.length, longest: longest.length });
  });
  return rows;
}

if (require.main === module) report(process.argv.includes('--list'));
module.exports = { loadLessons, longestIsAnswer, tfSequence, quizzes, len };

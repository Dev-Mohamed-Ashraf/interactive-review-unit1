#!/usr/bin/env node
/* =========================================================
 * tests/run.js — static content & wiring tests (Node, no deps).
 *   node tests/run.js
 * Loads every script listed in index.html into a sandbox with a
 * fake DOM, then checks the module graph and all lesson content:
 *  - every script in index.html exists and loads without error
 *  - every lesson of every chapter (RV.chapters) is registered, ids unique
 *  - every step type / widget / anim referenced exists
 *  - every widget's own validate(q) passes (answers in range…)
 *  - every bilingual text has both ar & en
 *  - every image path exists on disk
 * ========================================================= */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const quiz = require('../tools/quiz-report.js'); // question-quality rules

const ROOT = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);

let failures = 0;
let checks = 0;
const fail = (msg) => { failures++; console.log('  ✗ ' + msg); };
const ok = () => { checks++; };

// ---------- minimal browser sandbox ----------
function fakeEl() {
  return new Proxy(function () {}, {
    get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'style' || k === 'dataset' || k === 'classList' ? fakeEl() : fakeEl()),
    apply: () => fakeEl(),
    set: () => true,
  });
}
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval, Math, JSON, Object, Array, Promise,
  localStorage: { getItem: () => null, setItem() {} },
  matchMedia: () => ({ matches: false }),
  navigator: {},
  location: { hash: '', protocol: 'file:' },
  addEventListener() {},
  requestAnimationFrame: () => 0,
  performance: { now: () => Date.now() },
  document: { documentElement: fakeEl(), createElement: fakeEl, createElementNS: fakeEl, createTextNode: fakeEl, createDocumentFragment: fakeEl, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [], getElementById: () => fakeEl(), body: fakeEl() },
};
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);

console.log('\n▶ Loading modules from index.html');
scripts.forEach((src) => {
  const file = path.join(ROOT, src);
  if (!fs.existsSync(file)) { fail(`missing script ${src}`); return; }
  if (src.startsWith('vendor/')) {
    // GSAP needs a real DOM; provide a stub instead
    if (src.endsWith('gsap.min.js')) sandbox.gsap = new Proxy({}, { get: () => () => fakeEl() });
    ok(); return;
  }
  try { vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: src }); ok(); }
  catch (e) { fail(`${src} threw on load: ${e.message}`); }
});

// orphan files: in js/ but not referenced by index.html
const allJs = [];
(function walk(dir) {
  fs.readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.js')) allJs.push(path.relative(ROOT, p).replace(/\\/g, '/'));
  });
})(path.join(ROOT, 'js'));
allJs.forEach((f) => { if (!scripts.includes(f)) fail(`orphan module not loaded by index.html: ${f}`); else ok(); });

const RV = sandbox.RV;
if (!RV || !RV.unit) { console.log('FATAL: RV.unit not defined'); process.exit(1); }

// ---------- helpers ----------
function biCheck(val, where) {
  if (val == null) return;
  if (typeof val === 'object' && !Array.isArray(val) && ('ar' in val || 'en' in val)) {
    if (!val.ar || !val.en) fail(`${where}: bilingual text missing ${!val.ar ? 'ar' : 'en'}`); else ok();
    for (const lang of ['ar', 'en']) {
      const s = String(val[lang] || '');
      if ((s.match(/\*\*/g) || []).length % 2) fail(`${where}.${lang}: unbalanced ** markup`);
    }
  }
}
function walkBi(obj, where) {
  if (!obj || typeof obj !== 'object') return;
  if (!Array.isArray(obj) && ('ar' in obj || 'en' in obj)) { biCheck(obj, where); return; }
  for (const k in obj) walkBi(obj[k], `${where}.${k}`);
}
function imgCheck(p, where) {
  if (typeof p !== 'string' || !/\.(webp|png|jpe?g|svg|mp4)$/i.test(p)) return;
  if (!fs.existsSync(path.join(ROOT, p))) fail(`${where}: image not found ${p}`); else ok();
  if (/\.mp4$/.test(p)) {
    // every video needs its light 480p twin and a poster (core/perf.js + anims/cinema.js rely on them)
    [p.replace(/\.mp4$/, '-480.mp4'), p.replace(/\.mp4$/, '.jpg')].forEach((v) => { if (!fs.existsSync(path.join(ROOT, v))) fail(`${where}: missing ${v}`); else ok(); });
  }
}
function walkImgs(obj, where) {
  if (!obj || typeof obj !== 'object') return;
  for (const k in obj) { if (typeof obj[k] === 'string') imgCheck(obj[k], `${where}.${k}`); else walkImgs(obj[k], `${where}.${k}`); }
}

// ---------- unit / lessons ----------
console.log('▶ Checking unit + lessons');
const STEP_TYPES = ['scene', 'intro', 'quiz', 'example', 'summary'];
const KINDS = ['learn', 'example', 'practice', 'flash', 'challenge', 'game', 'test'];
const seenLessons = new Set();
const ALL_LESSONS = RV.chapters.reduce((a, c) => a.concat(c.lessons), []);
RV.chapters.forEach((c, i) => {
  ['title', 'subtitle', 'challengeTitle', 'challengeSub', 'route', 'challengeId'].forEach((k) => { if (!c[k]) fail(`chapter ${c.number}: missing ${k}`); else ok(); });
  if (c.number !== i + 1) fail(`chapter numbers must be 1, 2, 3… in order (got ${c.number})`);
});
ALL_LESSONS.forEach((id) => {
  if (!RV.lessons.has(id)) { fail(`lesson ${id} listed in unit but not registered`); return; }
  if (seenLessons.has(id)) fail(`duplicate lesson ${id}`);
  seenLessons.add(id);
  const L = RV.lessons.get(id);
  const where = `lesson ${id}`;
  ['title', 'guiding', 'keyFact', 'hook'].forEach((k) => { if (!L[k]) fail(`${where}: missing ${k}`); });
  if (!/^#[0-9a-f]{6}$/i.test(L.color || '')) fail(`${where}: color must be #rrggbb`);
  imgCheck(L.cover, `${where}.cover`);
  walkBi(L, where);
  walkImgs(L, where);
  const sids = new Set();
  L.stations.forEach((st, si) => {
    const sw = `${where}/${st.id}`;
    if (sids.has(st.id)) fail(`${sw}: duplicate station id`); sids.add(st.id);
    if (!KINDS.includes(st.kind)) fail(`${sw}: unknown kind ${st.kind}`);
    if (!st.steps || !st.steps.length) fail(`${sw}: no steps`);
    (st.steps || []).forEach((step, k) => {
      const w = `${sw}#${k}`;
      if (!STEP_TYPES.includes(step.type)) { fail(`${w}: unknown step type ${step.type}`); return; }
      ok();
      if (step.visual) {
        if (!RV.anims.has(step.visual.anim)) fail(`${w}: unknown anim "${step.visual.anim}"`); else ok();
        const def = RV.anims.has(step.visual.anim) && RV.anims.get(step.visual.anim);
        if (def && def.validate) def.validate(step.visual.props || {}).forEach((e) => fail(`${w} anim ${step.visual.anim}: ${e}`));
      }
      if (step.type === 'scene' && !step.title) fail(`${w}: scene needs a title`);
      if (step.type === 'quiz' || step.type === 'example') {
        if (!step.q || !RV.widgets.has(step.q.widget)) { fail(`${w}: unknown widget ${step.q && step.q.widget}`); return; }
        const errs = RV.widgets.get(step.q.widget).validate(step.q) || [];
        errs.forEach((e) => fail(`${w} ${step.q.widget}: ${e}`));
        if (!errs.length) ok();
        // question quality: the right option must never be a give-away by being the longest
        if (quiz.longestIsAnswer(step.q)) fail(`${w} mcq: the correct option is clearly the longest — lengthen the distractors (node tools/quiz-report.js --list)`); else ok();
      }
      if (step.type === 'example' && (!step.solution || !step.solution.length)) fail(`${w}: example needs solution[]`);
      if (st.kind === 'test' && step.type !== 'quiz') fail(`${w}: test stations may contain quiz steps only`);
    });
  });
});

// every registered anim is used somewhere (dead-code check)
const used = new Set();
ALL_LESSONS.forEach((id) => RV.lessons.has(id) && RV.lessons.get(id).stations.forEach((st) => st.steps.forEach((s) => s.visual && used.add(s.visual.anim))));
used.add('hero'); // used by intro steps
RV.anims.list().forEach((a) => { if (!used.has(a)) fail(`anim "${a}" is registered but never used`); else ok(); });

// numeric widget parser unit test
if (RV.widgets.has('numeric')) {
  const p = RV.widgets.get('numeric').parseNum;
  [['4,202,545', 4202545], ['٤٢٠٠', 4200], ['4.2e6', 4.2e6], ['abc', NaN]].forEach(([inp, exp]) => {
    const got = p(inp);
    if (Number.isNaN(exp) ? !Number.isNaN(got) : got !== exp) fail(`numeric.parseNum(${inp}) = ${got}, expected ${exp}`); else ok();
  });
}

// ---------- lint: native .append() must never receive a maybe-null child ----------
allJs.forEach((f) => {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  src.split(/\r?\n/).forEach((line, i) => {
    const suspicious = /\.append\(/.test(line) && !/RV\.dom|svg\.append|\bs\(/.test(line) && /\?[^:]+:\s*null|\|\|\s*''/.test(line);
    if (suspicious) fail(`${f}:${i + 1} native append() with a possibly-null child — use RV.dom.add()`);
  });
});

// ---------- math & physics behind the animations ----------
console.log('▶ Checking math/physics models');
const near = (a, b, tol) => Math.abs(a - b) <= tol;
if (RV.mooreSolve) {
  const S = RV.mooreSolve;
  [
    [{ mode: 'forward', y0: 2002, n0: 1451, y1: 2025 }, 'result', 4202545, 1],   // the user's example
    [{ mode: 'forward', y0: 2000, n0: 1e6, y1: 2010 }, 'result', 32e6, 0],
    [{ mode: 'forward', y0: 1971, n0: 2300, y1: 2021 }, 'result', 77175193600, 1],
    [{ mode: 'backward', y1: 2020, n1: 8000, y0: 2014 }, 'result', 1000, 0],
    [{ mode: 'years', ratio: 16 }, 'years', 8, 0],
    [{ mode: 'years', ratio: 64 }, 'years', 12, 0],
  ].forEach(([p, key, exp, tol]) => {
    const got = S(p)[key];
    if (!near(got, exp, tol)) fail(`mooreSolve(${JSON.stringify(p)}).${key} = ${got}, expected ${exp}`); else ok();
  });
}
if (RV.drivePhysics) {
  const { outcome, carAt, PHYS } = RV.drivePhysics;
  const cloud = outcome('cloud'), edge = outcome('edge');
  if (cloud.safe) fail('edgeVsCloud: cloud run must be unsafe (that is the lesson)'); else ok();
  if (!edge.safe) fail('edgeVsCloud: edge run must stop safely'); else ok();
  if (!near(cloud.reaction, 13.3, 0.1)) fail(`cloud reaction distance ${cloud.reaction} ≠ 13.3 m (text says 13 m)`); else ok();
  if (!near(PHYS.v * 0.1, 1.7, 0.05)) fail('0.1 s at 60 km/h should be ≈1.7 m (note text)'); else ok();
  const end = carAt('edge', 10);
  if (!near(end.speed, 0, 1e-9)) fail('edge car should be stopped at t=10'); else ok();
}
// numeric answers in content must equal what the formula gives (no typos in answers)
RV.availableLessons().forEach((id) => RV.lessons.get(id).stations.forEach((st) => st.steps.forEach((step, k) => {
  if (step.q && step.q.widget === 'numeric' && step.q.check) {
    const exp = RV.mooreSolve(step.q.check)[step.q.check.mode === 'years' ? 'years' : 'result'];
    if (!near(exp, step.q.answer, Math.abs(step.q.answer) * (step.q.tolerance || 0) + 0.5)) fail(`${id}/${st.id}#${k}: numeric answer ${step.q.answer} ≠ formula ${exp}`); else ok();
  }
})));

// ---------- "nothing gets lost": every image / video in the project is shown somewhere ----------
console.log('▶ Checking the mistakes notebook');
{
  const S = RV.study, lesson = RV.availableLessons()[0];
  const qs = S.questions(lesson), q = qs[0];
  const check = (cond, msg) => (cond ? ok() : fail(`study: ${msg}`));
  RV.availableLessons().forEach((id) => S.questions(id).forEach((x) => check(S.label(x.step) && S.label(x.step).ar, `${x.key} has no label`)));
  check(qs.length > 0 && !S.mistakes().length, 'a fresh student has an empty notebook');
  S.record(q.source, q.step, { correct: false });
  check(S.mistakes().length === 1, 'a wrong answer enters the notebook');
  S.record(q.source, q.step, { correct: true });
  check(S.mistakes().length === 1, 'one right answer is not enough to leave');
  S.record(q.source, q.step, { correct: false });
  S.record(q.source, q.step, { correct: true });
  check(S.mistakes().length === 1, 'a wrong answer restarts the count');
  S.record(q.source, q.step, { correct: true });
  check(S.mistakes().length === 0, `${S.OUT_AFTER} right answers in a row clear it`);
  check(S.lessonStats(lesson).answered === 1 && S.lessonStats(lesson).right === 1, 'lesson stats follow the latest answer');
  S.record({ lesson, station: 'x', step: 0 }, { type: 'quiz', q: { widget: 'poll' } }, { correct: false });
  check(!S.mistakes().length, 'polls are not graded');
  qs.slice(0, S.SESSION + 3).forEach((x) => S.record(x.source, x.step, { correct: false }));
  const review = S.reviewStation();
  check(review.steps.length === Math.min(S.SESSION, qs.length) && review.steps[0].source.lesson === lesson, 'a review is capped and keeps each source');
  RV.store.resetAll();
  RV.availableLessons().forEach((id) => check(S.quickStation(id).steps.some((x) => x.points && x.points.length), `lesson ${id} has no quick summary`));
  S.EXAMS.forEach((x) => {
    const exam = S.examStation(x.perLesson), n = RV.availableLessons().length * x.perLesson;
    check(exam.steps.length === n, `${x.id} exam has ${exam.steps.length} of ${n} questions`);
    check(new Set(exam.steps.map((st) => `${st.source.lesson}/${st.source.station}/${st.source.step}`)).size === n, `${x.id} exam repeats a question`);
    check(exam.steps.every((st) => st.q.widget === 'mcq' && st.optional), `${x.id} exam holds optional multiple-choice questions`);
  });
}

console.log('▶ Checking the summaries, glossary and search');
{
  const check = (cond, msg) => (cond ? ok() : fail(msg));
  const walkSheet = (id, v, where) => {
    if (Array.isArray(v)) { v.forEach((x, k) => walkSheet(id, x, `${where}[${k}]`)); return; }
    if (!v || typeof v !== 'object') return;
    if ('ar' in v || 'en' in v) { check(v.ar && v.en, `sheet ${id}: ${where} needs ar and en`); return; }
    if (v.t) check(RV.sheet.types.includes(v.t), `sheet ${id}: unknown block ${v.t}`);
    if (v.t === 'draw') check(RV.sheet.art[v.art], `sheet ${id}: unknown drawing ${v.art}`);
    Object.keys(v).forEach((k) => walkSheet(id, v[k], `${where}.${k}`));
  };
  RV.availableLessons().forEach((id) => {
    check(RV.sheets[id], `lesson ${id} has no printable sheet`);
    if (RV.sheets[id]) walkSheet(id, RV.sheets[id], 'sheet');
  });
  const L = RV.lexicon, terms = L.terms();
  check(terms.length > 150, `glossary has only ${terms.length} terms`);
  check(new Set(terms.map((x) => x.key)).size === terms.length, 'glossary keys are unique');
  terms.forEach((x) => check(x.related.length && x.related.every((k) => L.term(k) && k !== x.key), `${x.key}: broken links`));
  check(L.term('hallucination') && L.term('hallucination').lessons.length > 1, 'a term in several lessons is merged');
  const hits = (q) => L.search(q);
  check(hits('RMSE').term.length > 0, 'search finds an English term');
  check(hits('الهلوسه').term.length > 0 && hits('الهَلوسة').term.length > 0, 'search ignores spelling variants');
  check(hits('xyzqq').text.length === 0, 'nonsense finds nothing');
  check(hits('تعلم الالة').lesson.length > 0, 'search finds a lesson without hamza or shadda');
}

console.log('▶ Checking every media file is used');
{
  const code = allJs.map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
  fs.readdirSync(path.join(ROOT, 'img')).forEach((f) => { if (!code.includes(`img/${f}`)) fail(`img/${f} is not shown anywhere`); else ok(); });
  if (fs.existsSync(path.join(ROOT, 'media'))) fs.readdirSync(path.join(ROOT, 'media')).filter((f) => /^mx-\d+\.mp4$/.test(f)).forEach((f) => { if (!code.includes(`media/${f}`)) fail(`media/${f} is not shown anywhere`); else ok(); });
}

// ---------- offline layer is in sync with the files ----------
console.log('▶ Checking offline build (sw.js)');
{
  const build = require('../tools/build.js');
  const swPath = path.join(ROOT, 'sw.js');
  if (!fs.existsSync(swPath)) fail('sw.js missing — run: node tools/build.js');
  else {
    const assets = build.listAssets().filter((a) => a !== 'sw.js');
    const v = build.version(assets);
    if (!fs.readFileSync(swPath, 'utf8').includes(`rv-u1-${v}`)) fail('sw.js is stale — run: node tools/build.js'); else ok();
    try { new vm.Script(fs.readFileSync(swPath, 'utf8'), { filename: 'sw.js' }); ok(); } catch (e) { fail(`sw.js syntax error: ${e.message}`); }
  }
  // every file referenced by index.html must be cached
  [...html.matchAll(/(?:src|href)="([^"#:]+)"/g)].map((m) => m[1]).forEach((ref) => {
    if (!fs.existsSync(path.join(ROOT, ref))) fail(`index.html references missing file ${ref}`); else ok();
  });
}

console.log(`\n${failures ? '❌' : '✅'} ${checks} checks passed, ${failures} failed\n`);
process.exit(failures ? 1 : 0);

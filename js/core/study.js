/* =========================================================
 * core/study.js — what the student should study next.
 * Responsibility: turn recorded answers into the mistakes notebook and a
 * mastery figure per lesson. Answers live in RV.store; questions are found
 * by "<lesson>/<station>/<step index>", so nothing is copied out of content.
 *   RV.study.record(source, step, res)   ← the player, on a question's first answer
 *   RV.study.mistakes(lessonId?)         → notebook entries, most troubled first
 *   RV.study.lessonStats(id) · summary() · weakest()
 *   RV.study.reviewStation(lessonId?)    → a station made of notebook questions
 * ========================================================= */
(function () {
  'use strict';
  const GRADED = new Set(['mcq', 'tf', 'match', 'classify', 'fill', 'order', 'numeric', 'essay', 'recall']);
  const OUT_AFTER = 2;   // correct answers in a row that take a question out of the notebook
  const SESSION = 12;    // questions in one review
  const MIN_ANSWERS = 3; // fewer than this says nothing about a lesson
  const WEAK = 0.6, STRONG = 0.85;

  const keyOf = (src) => `${src.lesson}/${src.station}/${src.step}`;
  const graded = (step) => !!(step && step.type === 'quiz' && step.q && GRADED.has(step.q.widget));
  const cache = {};

  /** Every graded question of a lesson: { key, source, step }. */
  function questions(lessonId) {
    if (cache[lessonId]) return cache[lessonId];
    const out = [];
    RV.lessons.get(lessonId).stations.forEach((st) => st.steps.forEach((step, k) => {
      if (!graded(step)) return;
      const source = { lesson: lessonId, station: st.id, step: k };
      out.push({ key: keyOf(source), source, step });
    }));
    cache[lessonId] = out;
    return out;
  }

  /** The line that names a question in a list ("fill the blanks" alone says nothing). */
  function label(step) {
    const q = step.q;
    if (q.widget === 'tf') return q.items[0].text;
    if (q.widget === 'recall') return q.items[0].q;
    if (q.widget === 'fill') return { ar: q.text.ar.replace(/\{\d+\}/g, '____'), en: q.text.en.replace(/\{\d+\}/g, '____') };
    return q.prompt;
  }

  const inNotebook = (a) => !!a && a.w > 0 && a.r < OUT_AFTER;

  function lessonStats(id) {
    const qs = questions(id), answers = RV.store.answers();
    let answered = 0, right = 0, mistakes = 0;
    qs.forEach((q) => {
      const a = answers[q.key];
      if (!a) return;
      answered++;
      if (a.ok) right++;
      if (inNotebook(a)) mistakes++;
    });
    const mastery = answered ? right / answered : 0;
    const level = answered < MIN_ANSWERS ? 'new' : mastery < WEAK ? 'weak' : mastery < STRONG ? 'mid' : 'strong';
    return { id, total: qs.length, answered, right, mistakes, mastery, level };
  }

  function summary() {
    const all = RV.availableLessons().map(lessonStats);
    const sum = (f) => all.reduce((n, s) => n + s[f], 0);
    const answered = sum('answered'), right = sum('right');
    return { total: sum('total'), answered, right, mistakes: sum('mistakes'), mastery: answered ? right / answered : 0 };
  }

  /** Lessons that need work, weakest first. */
  function weakest(n) {
    return RV.availableLessons().map(lessonStats)
      .filter((s) => s.level === 'weak' || s.level === 'mid')
      .sort((a, b) => a.mastery - b.mastery || b.mistakes - a.mistakes)
      .slice(0, n || 3);
  }

  /** Notebook entries: most often wrong first, then the ones waiting longest. */
  function mistakes(lessonId) {
    const ids = lessonId ? [lessonId] : RV.availableLessons();
    const answers = RV.store.answers(), out = [];
    ids.forEach((id) => questions(id).forEach((q) => {
      if (inNotebook(answers[q.key])) out.push(Object.assign({}, q, { answer: answers[q.key] }));
    }));
    return out.sort((a, b) => b.answer.w - a.answer.w || a.answer.t - b.answer.t);
  }

  function record(source, step, res) {
    if (!graded(step) || !res) return;
    RV.store.recordAnswer(keyOf(source), !!res.correct);
  }

  function reviewStation(lessonId) {
    const steps = mistakes(lessonId).slice(0, SESSION).map((m) => Object.assign({}, m.step, {
      source: m.source,
      title: { ar: `من درس ${m.source.lesson}`, en: `From lesson ${m.source.lesson}` },
    }));
    return { id: 'review', kind: 'practice', title: { ar: 'مراجعة كشكول الأخطاء', en: 'Mistakes review' }, steps };
  }

  function reviewLesson(lessonId) {
    return { id: 'study', isReview: true, title: { ar: 'مذاكرتي', en: 'My study' }, color: '#fb923c', stations: [], backHref: '#/study',
      left: () => mistakes(lessonId).length };
  }

  RV.study = { OUT_AFTER, SESSION, graded, label, questions, lessonStats, summary, weakest, mistakes, record, reviewStation, reviewLesson };
})();

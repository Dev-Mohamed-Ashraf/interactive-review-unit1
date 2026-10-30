/* =========================================================
 * core/lexicon.js — the glossary and the course-wide search.
 * Both are built from the lessons themselves, so they never drift from the
 * content: terms come from the flash cards, search covers lessons, summaries,
 * explanations, exam notes and questions.
 *   RV.lexicon.terms()        → every term, once, with its lessons and links
 *   RV.lexicon.term(key)      → one term
 *   RV.lexicon.search(query)  → results grouped by kind, best first
 *   RV.lexicon.marks(query)   → RegExp that finds the query in shown text
 * ========================================================= */
(function () {
  'use strict';
  const RELATED = 5;
  const clean = (s) => String(s).replace(/\*\*|__|`/g, '');

  /** Spelling-insensitive form: Arabic hamza/ta marbuta/ya variants and diacritics fold together. */
  function norm(s) {
    return clean(s).toLowerCase()
      .replace(/[ً-ْٰـ]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
      .replace(/[^\p{L}\p{N}²₀₁%]+/gu, ' ').trim();
  }

  let cachedTerms = null;

  /** The names a term goes by: "إدخال / مخفية" and "XAI (…)" count as several. */
  const names = (front) => [front.ar, front.en].flatMap((s) => clean(s).split(/[/·()]/)).map(norm).filter((n) => n.length > 2);

  function buildTerms() {
    const map = new Map();
    RV.availableLessons().forEach((id) => RV.lessons.get(id).stations.forEach((st) => st.steps.forEach((step) => {
      ((step.q && step.q.cards) || []).forEach((card) => {
        const key = norm(card.front.en).replace(/ /g, '-');
        const known = map.get(key);
        if (known) { if (!known.lessons.includes(id)) known.lessons.push(id); return; }
        map.set(key, { key, front: card.front, back: card.back, lessons: [id], names: names(card.front), text: norm(`${card.back.ar} ${card.back.en}`) });
      });
    })));
    const all = [...map.values()];
    /* links from content/glossary-links.js (two-way), then the closest terms of the same lesson */
    const linked = new Map(all.map((a) => [a.key, []]));
    Object.keys(RV.termLinks).forEach((a) => RV.termLinks[a].forEach((b) => {
      if (!linked.has(a) || !linked.has(b)) throw new Error(`glossary link ${a} → ${b}: no such term`);
      if (!linked.get(a).includes(b)) linked.get(a).push(b);
      if (!linked.get(b).includes(a)) linked.get(b).unshift(a);
    }));
    all.forEach((a, i) => {
      const near = all.filter((b) => b !== a && b.lessons[0] === a.lessons[0] && !linked.get(a.key).includes(b.key))
        .sort((x, y) => Math.abs(all.indexOf(x) - i) - Math.abs(all.indexOf(y) - i)).map((b) => b.key);
      a.related = [...linked.get(a.key), ...near].slice(0, RELATED);
    });
    return all;
  }

  function terms() {
    if (!cachedTerms) cachedTerms = buildTerms();
    return cachedTerms;
  }
  const term = (key) => terms().find((x) => x.key === key) || null;

  let cachedIndex = null;

  function buildIndex() {
    const docs = [];
    const add = (kind, title, body, href, lesson) => docs.push({ kind, title, body, href, lesson, hay: norm(`${title.ar} ${title.en} ${body ? `${body.ar} ${body.en}` : ''}`), head: norm(`${title.ar} ${title.en}`) });
    terms().forEach((x) => add('term', x.front, x.back, `#/glossary/${x.key}`, x.lessons[0]));
    RV.availableLessons().forEach((id) => {
      const l = RV.lessons.get(id);
      add('lesson', l.title, l.guiding || null, `#/l/${id}`, id);
      l.stations.forEach((st) => st.steps.forEach((step, k) => {
        const where = `#/l/${id}/s/${st.id}/${k}`;
        (step.points || []).forEach((p) => add('text', st.title, p, where, id));
        (step.beats || []).forEach((b, n) => add('text', st.title, b, `${where}/${n}`, id));
        (step.notes || []).forEach((n) => { if (n.text) add('text', st.title, n.text, where, id); });
        if (RV.study.graded(step)) add('question', st.title, RV.study.label(step), where, id);
      }));
    });
    return docs;
  }

  /** Every word must appear; a hit in the title beats one in the body. */
  function search(query) {
    const words = norm(query).split(' ').filter(Boolean);
    const groups = { term: [], lesson: [], text: [], question: [] };
    if (!words.length) return groups;
    if (!cachedIndex) cachedIndex = buildIndex();
    const full = words.join(' ');
    cachedIndex.forEach((d) => {
      if (!words.every((w) => d.hay.includes(w))) return;
      const score = (d.head === full ? 100 : 0) + (d.head.startsWith(full) ? 40 : 0) + (d.head.includes(full) ? 30 : 0) + (d.hay.includes(full) ? 10 : 0) + words.filter((w) => d.head.includes(w)).length;
      groups[d.kind].push({ doc: d, score });
    });
    Object.keys(groups).forEach((k) => { groups[k] = groups[k].sort((a, b) => b.score - a.score).map((x) => x.doc); });
    return groups;
  }

  /** A RegExp for highlighting: the typed letters, whichever spelling the text uses. */
  function marks(query) {
    const FOLD = { ا: '[اأإآ]', ي: '[يىئ]', ه: '[هة]', و: '[وؤ]' };
    const words = norm(query).split(' ').filter(Boolean).map((w) => [...w].map((c) => (FOLD[c] || c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).join('[\\u064B-\\u0652\\u0640]*'));
    return words.length ? new RegExp(`(${words.join('|')})`, 'giu') : null;
  }

  RV.lexicon = { norm, clean, terms, term, search, marks };
})();

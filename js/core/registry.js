/* =========================================================
 * core/registry.js — RV namespace + typed registries.
 * Responsibility: the ONLY place modules plug into each other.
 *   RV.anims    → animated visuals   (js/anims/*.js)
 *   RV.widgets  → question engines   (js/widgets/*.js)
 *   RV.lessons  → lesson content     (js/content/*.js)
 *   RV.screens  → full-page screens  (js/screens/*.js)
 * ========================================================= */
(function () {
  'use strict';
  const RV = (window.RV = window.RV || {});

  function makeRegistry(kind) {
    const map = Object.create(null);
    const order = [];
    return {
      add(name, def) {
        if (map[name]) throw new Error(`${kind} "${name}" registered twice`);
        map[name] = def;
        order.push(name);
        return def;
      },
      get(name) {
        const def = map[name];
        if (!def) throw new Error(`Unknown ${kind}: "${name}"`);
        return def;
      },
      has: (name) => name in map,
      list: () => order.slice(),
    };
  }

  RV.anims = makeRegistry('anim');
  RV.widgets = makeRegistry('widget');
  RV.lessons = makeRegistry('lesson');
  RV.screens = makeRegistry('screen');
  RV.unit = null;     // the FIRST chapter (kept for older code paths)
  RV.chapters = [];   // every chapter, in order — js/content/unit*.js call RV.addChapter
  RV.course = null;   // the whole review (js/content/course.js)
  RV.addChapter = (c) => { RV.chapters.push(c); if (!RV.unit) RV.unit = c; return c; };
  /** The chapter a lesson belongs to. */
  RV.chapterOf = (lessonId) => RV.chapters.find((c) => c.lessons.includes(lessonId)) || RV.chapters[0];
  /** Loaded lessons of one chapter. */
  RV.chapterLessons = (c) => c.lessons.filter((id) => RV.lessons.has(id));
  /**
   * Extra steps for a station, from a separate content file (e.g. js/content/checks-1-1.js —
   * "check yourself" questions). Inserted just before the station's summary step, so a lesson
   * file never has to be edited to add questions.
   */
  RV.addSteps = (lessonId, stationId, steps) => {
    const st = RV.lessons.get(lessonId).stations.find((s) => s.id === stationId);
    if (!st) throw new Error(`addSteps: no station "${stationId}" in lesson ${lessonId}`);
    const at = st.steps.findIndex((s) => s.type === 'summary');
    st.steps.splice(at === -1 ? st.steps.length : at, 0, ...steps);
  };
  /** Lessons of the unit that are actually loaded (missing ones are reported by tests). */
  RV.availableLessons = () => RV.chapters.reduce((all, c) => all.concat(RV.chapterLessons(c)), []);
})();

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
  RV.unit = null; // set by js/content/unit1.js
  /** Lessons of the unit that are actually loaded (missing ones are reported by tests). */
  RV.availableLessons = () => (RV.unit ? RV.unit.lessons.filter((id) => RV.lessons.has(id)) : []);
})();

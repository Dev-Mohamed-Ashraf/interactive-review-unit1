/* =========================================================
 * core/store.js — progress + settings persistence.
 * Responsibility: read/write localStorage safely. Works (in
 * memory) even when storage is blocked (private mode, iOS).
 * ========================================================= */
(function () {
  'use strict';
  const KEY = 'rv.programming-ai.unit1.v1';
  const DEFAULT = {
    settings: { lang: 'ar', sound: true, teacher: false, theme: 'dark', present: false, tts: false, calm: false },
    stations: {}, // "1-1/learn-1": { done: true, stars: 3, best: 9, max: 10 }
    game: { xp: 0, badges: [] },
    answers: {}, // "1-1/test/4": { w: wrong answers, r: correct in a row, ok: last answer right, t: when }
  };

  let data = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULT);
      const parsed = JSON.parse(raw);
      return {
        settings: Object.assign({}, DEFAULT.settings, parsed.settings),
        stations: parsed.stations || {},
        game: Object.assign({ xp: 0, badges: [] }, parsed.game),
        answers: parsed.answers || {},
      };
    } catch (e) {
      return clone(DEFAULT);
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage blocked: keep in memory */ }
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  const sid = (lessonId, stationId) => `${lessonId}/${stationId}`;

  RV.store = {
    setting(name) { return data.settings[name]; },
    setSetting(name, value) { data.settings[name] = value; save(); },

    station(lessonId, stationId) { return data.stations[sid(lessonId, stationId)] || null; },
    /** Record a finished station; keeps the best score. */
    complete(lessonId, stationId, result) {
      const key = sid(lessonId, stationId);
      const prev = data.stations[key] || {};
      const next = Object.assign({}, prev, { done: true });
      if (result && typeof result.score === 'number') {
        if (prev.best == null || result.score >= prev.best) {
          next.best = result.score;
          next.max = result.max;
        }
        next.stars = Math.max(prev.stars || 0, starsFor(result.score, result.max));
      } else {
        next.stars = Math.max(prev.stars || 0, 3);
      }
      data.stations[key] = next;
      save();
      return next;
    },
    /** Fraction 0..1 of finished stations in a lesson. */
    lessonProgress(lesson) {
      const total = lesson.stations.length;
      const done = lesson.stations.filter((st) => this.station(lesson.id, st.id)).length;
      return total ? done / total : 0;
    },
    isUnlocked(lesson, index) {
      if (data.settings.teacher || index === 0) return true;
      const prev = lesson.stations[index - 1];
      return !!this.station(lesson.id, prev.id);
    },
    /** Answers per question — read through core/study.js. */
    answers() { return data.answers; },
    recordAnswer(key, ok) {
      const a = data.answers[key] || { w: 0, r: 0 };
      a.w += ok ? 0 : 1;
      a.r = ok ? a.r + 1 : 0;
      a.ok = ok ? 1 : 0;
      a.t = Date.now();
      data.answers[key] = a;
      save();
    },
    /** Rewards state (XP, badges) — owned by core/game.js. */
    game() { return data.game; },
    saveGame() { save(); },
    resetAll() { data = clone(DEFAULT); save(); },
  };

  function starsFor(score, max) {
    const r = max ? score / max : 0;
    return r >= 0.9 ? 3 : r >= 0.6 ? 2 : r > 0 ? 1 : 0;
  }
  RV.store.starsFor = starsFor;
})();

/* =========================================================
 * app.js — boot + hash router. The top of the module graph.
 *   #/                      → home
 *   #/l/<lessonId>          → lesson path
 *   #/l/<lessonId>/s/<sid>  → station player
 *   #/challenge             → chapter 1 challenge (random test)
 *   #/challenge/<n>         → chapter n challenge
 *   #/study                 → mistakes notebook + mastery per lesson
 *   #/study/review[/<id>]   → review the notebook (all, or one lesson)
 *   #/quick/<lessonId>      → a lesson's summaries and exam traps
 *   #/exam                  → practice exam: choose a length
 *   #/exam/run/<perLesson>  → the running exam
 *   #/selftest              → mounts every step (QA)
 * ========================================================= */
(function () {
  'use strict';
  const root = document.getElementById('app');
  let current = null;

  function parse() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    if (parts[0] === 'l' && parts[1] && parts[2] === 's' && parts[3]) return { screen: 'player', lessonId: parts[1], stationId: parts[3] };
    if (parts[0] === 'l' && parts[1]) return { screen: 'path', lessonId: parts[1] };
    if (parts[0] === 'challenge') return { screen: 'challenge', chapter: +parts[1] || 1 };
    if (parts[0] === 'study' && parts[1] === 'review') return { screen: 'review', lessonId: parts[2] };
    if (parts[0] === 'study') return { screen: 'study' };
    if (parts[0] === 'quick' && parts[1]) return { screen: 'quick', lessonId: parts[1] };
    if (parts[0] === 'exam' && parts[1] === 'run') return { screen: 'examRun', perLesson: +parts[2] };
    if (parts[0] === 'exam') return { screen: 'exam' };
    if (parts[0] === 'selftest') return { screen: 'selftest' };
    if (parts[0] === 'audit') return { screen: 'audit' };
    if (parts[0] === 'badges') return { screen: 'badges' };
    if (parts[0] === 'certificate') return { screen: 'certificate' };
    return { screen: 'home' };
  }

  function render() {
    if (current && current.destroy) current.destroy();
    current = null;
    // stop the old screen's tweens — but not the rewards that float over every screen (+XP, combo, badge card)
    gsap.killTweensOf([...document.querySelectorAll('body *')].filter((el) => !el.closest('.xp-float, .celebrate')));
    RV.dom.clear(root);
    window.scrollTo(0, 0);
    const r = parse();
    try {
      if (r.screen === 'player') {
        const lesson = RV.lessons.get(r.lessonId);
        const station = lesson.stations.find((s) => s.id === r.stationId);
        if (!station) throw new Error('No station ' + r.stationId);
        const idx = lesson.stations.indexOf(station);
        if (!RV.store.isUnlocked(lesson, idx)) { location.replace(`#/l/${lesson.id}`); return; }
        current = RV.screens.get('player').render(root, { lesson, station });
      } else if (r.screen === 'challenge') {
        const ch = RV.chapters.find((c) => c.number === r.chapter) || RV.chapters[0];
        current = RV.screens.get('player').render(root, { lesson: challengeLesson(ch), station: challengeStation(ch) });
      } else if (r.screen === 'review') {
        const station = RV.study.reviewStation(r.lessonId);
        if (!station.steps.length) { location.replace('#/study'); return; }
        current = RV.screens.get('player').render(root, { lesson: RV.study.reviewLesson(r.lessonId), station });
      } else if (r.screen === 'quick') {
        current = RV.screens.get('player').render(root, { lesson: RV.study.quickLesson(), station: RV.study.quickStation(r.lessonId) });
      } else if (r.screen === 'examRun') {
        current = RV.screens.get('player').render(root, { lesson: RV.study.examLesson(), station: RV.study.examStation(r.perLesson) });
      } else if (r.screen === 'path') {
        current = RV.screens.get('path').render(root, { lessonId: r.lessonId });
      } else {
        current = RV.screens.get(r.screen).render(root, r);
      }
    } catch (err) {
      console.error(err);
      root.appendChild(RV.dom.h('div', { class: 'fatal card' }, RV.dom.h('h2', null, '⚠️'), RV.dom.h('pre', null, String(err && err.message)), RV.dom.h('a', { class: 'btn', href: '#/' }, RV.i18n.ui('home'))));
    }
  }

  /** A chapter challenge = N random questions drawn from that chapter's lesson tests + practice. */
  function challengeLesson(ch) {
    return { id: ch.challengeId, isChallenge: true, chapter: ch, title: ch.title, color: '#fbbf24', stations: [] };
  }
  let cachedChallenge = null;
  function challengeStation(ch) {
    if (cachedChallenge && cachedChallenge.lang === RV.i18n.lang && location.hash === ch.route && cachedChallenge.keep) return cachedChallenge.station;
    const pool = [];
    RV.chapterLessons(ch).forEach((id) => {
      RV.lessons.get(id).stations.forEach((st) => {
        if (st.kind !== 'test' && st.kind !== 'practice') return;
        st.steps.forEach((step) => {
          if (step.type === 'quiz' && ['mcq', 'tf', 'match', 'fill', 'order', 'classify'].includes(step.q.widget)) pool.push(Object.assign({}, step, { source: { lesson: id, station: st.id, step: st.steps.indexOf(step) }, title: { ar: `من درس ${id}`, en: `From lesson ${id}` } }));
        });
      });
    });
    const steps = RV.dom.shuffle(pool).slice(0, ch.challengeCount || 20);
    const station = { id: 'challenge', kind: 'test', title: ch.challengeTitle, steps };
    cachedChallenge = { station, lang: RV.i18n.lang, keep: false };
    return station;
  }

  RV.app = {
    rerender: render,
    start() {
      // Animation watchdog: some embedded browsers (app preview panes, in-app web views)
      // stop requestAnimationFrame while timers keep running. GSAP would then freeze every
      // entrance animation on its first frame and leave content invisible. If no animation
      // frame arrived for 250 ms, drive GSAP from a timer instead. (?drive forces it, for QA.)
      let lastFrame = performance.now();
      (function frame() { lastFrame = performance.now(); requestAnimationFrame(frame); })();
      const forced = /[?&]drive\b/.test(location.search);
      setInterval(() => { if (forced || performance.now() - lastFrame > 250) gsap.ticker.tick(); }, 16);
      RV.i18n.set(RV.store.setting('lang') || 'ar');
      RV.chrome.applyTheme();
      RV.i18n.onChange(render);
      window.addEventListener('hashchange', render);
      document.addEventListener('pointerdown', () => RV.sound.unlock(), { once: true });
      render();
      const devHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
      if ('serviceWorker' in navigator && location.protocol.startsWith('http') && (!devHost || /[?&]sw\b/.test(location.search))) { // (?sw = QA on the dev server)
        navigator.serviceWorker.register('sw.js').catch(() => {});
        setTimeout(() => RV.offline.auto(), 1500); // Home Screen app: store everything for offline by itself
        // once the page has settled, let the worker fetch images in the background
        setTimeout(() => navigator.serviceWorker.ready.then((r) => r.active && r.active.postMessage('warm')), 20000);
      }
    },
  };
})();

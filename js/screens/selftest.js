/* =========================================================
 * screens/selftest.js — QA screen (#/selftest).
 * Mounts EVERY step of EVERY station in both languages, plays all
 * beats, reveals every widget, and reports any thrown error.
 * Result is exposed on window.__selftest for automated checks.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;

  RV.screens.add('selftest', {
    render(root) {
      const status = h('h2', null, 'Self-test running…');
      const stage = h('div', { class: 'selftest-stage' });
      const log = h('ol', { class: 'selftest-log' });
      root.appendChild(h('div', { class: 'screen selftest' }, status, stage, log));

      const jobs = [];
      ['ar', 'en'].forEach((lang) => RV.availableLessons().forEach((id) => {
        const lesson = RV.lessons.get(id);
        lesson.stations.forEach((st) => st.steps.forEach((step, k) => jobs.push({ lang, lesson, st, step, k })));
      }));

      const origLang = RV.i18n.lang;
      const soundWas = RV.store.setting('sound');
      RV.store.setSetting('sound', false);
      const errors = [];
      const origError = console.error;
      let current = '';
      console.error = function (...args) { errors.push(`${current} → console.error: ${args.map(String).join(' ').slice(0, 160)}`); origError.apply(console, args); };
      let j = 0;
      let stopped = false;

      function runJob(job) {
        RV.i18n.set(job.lang, { silent: true });
        RV.dom.clear(stage);
        const host = h('div', { class: 'step step-' + job.step.type });
        stage.appendChild(host);
        const where = `[${job.lang}] ${job.lesson.id}/${job.st.id}#${job.k} ${job.step.type}` +
          (job.step.q ? ':' + job.step.q.widget : '') + (job.step.visual ? ':' + job.step.visual.anim : '');
        current = where;
        try {
          const inst = RV.steps[job.step.type].render(host, job.step, { lesson: job.lesson, station: job.st, mode: 'practice', onAnswer() {}, onReady() {} });
          for (let b = 0; b < inst.beats; b++) inst.beat(b);
          if (inst.reveal) inst.reveal();
          inst.destroy();
        } catch (e) {
          errors.push(`${where} → ${e.message}`);
          log.appendChild(h('li', null, `${where} → ${e.message}`));
          console.error(where, e);
        }
      }

      (function loop() {
        if (stopped) return;
        const until = performance.now() + (document.hidden ? 600 : 40); // hidden tabs throttle timers to ~1/s
        while (j < jobs.length && performance.now() < until) runJob(jobs[j++]);
        status.textContent = `Self-test: ${j}/${jobs.length}`;
        if (j < jobs.length) { setTimeout(loop, 0); return; }
        finish();
      })();

      function finish() {
        console.error = origError;
        RV.dom.clear(stage);
        RV.i18n.set(origLang, { silent: true });
        RV.store.setSetting('sound', soundWas);
        const ok = errors.length === 0;
        status.textContent = ok ? `✅ SELFTEST PASS — ${jobs.length} step renders` : `❌ SELFTEST FAIL — ${errors.length} errors`;
        window.__selftest = { ok, total: jobs.length, errors };
      }

      return {
        destroy() {
          stopped = true;
          console.error = origError;
          RV.i18n.set(origLang, { silent: true });
          RV.store.setSetting('sound', soundWas);
        },
      };
    },
  });
})();

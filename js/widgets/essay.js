/* widgets/essay.js — open / exam-style written answer with a model answer.
 * q = { widget:'essay', prompt, marks, points:[bi] (marking checklist), model: bi }
 * Student writes, reveals the model answer, ticks the points they covered. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('essay', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.bi(q.model, 'model', e);
      W.v.arr(q.points, 'points', e, 1);
      (q.points || []).forEach((p, i) => W.v.bi(p, `points[${i}]`, e));
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const marks = q.marks || 1;
      const area = h('textarea', { class: 'essay-input', rows: 4, placeholder: RV.i18n.ui('yourAnswer') });
      const showBtn = h('button', { class: 'btn btn-primary', type: 'button' }, RV.icon('bulb'), RV.i18n.ui('showModel'));
      const model = h('div', { class: 'essay-model', hidden: true },
        h('h4', null, RV.i18n.t({ ar: 'إجابة نموذجية', en: 'Model answer' })),
        h('p', null, RV.rich(q.model)));
      const ticks = q.points.map((p) => {
        const cb = h('input', { type: 'checkbox' });
        const lab = h('label', { class: 'essay-point' }, cb, h('span', null, RV.rich(p)));
        cb.addEventListener('change', () => { RV.sound.play('tap'); lab.classList.toggle('is-checked', cb.checked); });
        return { cb, lab };
      });
      const doneBtn = h('button', { class: 'btn btn-sm', type: 'button' }, RV.icon('check'), RV.i18n.ui('check'));
      const checklist = h('div', { class: 'essay-check', hidden: true }, h('p', { class: 'q-hint' }, RV.i18n.ui('checklist')), ticks.map((x) => x.lab), doneBtn);

      RV.dom.add(el,
        W.header(Object.assign({}, q, { tag: q.tag || (q.marks ? { ar: `[${q.marks} درجات]`, en: `[${q.marks} marks]` } : null) })),
        area, h('div', { class: 'q-actions' }, showBtn), model, checklist);

      showBtn.addEventListener('click', reveal);
      doneBtn.addEventListener('click', () => {
        const got = ticks.filter((x) => x.cb.checked).length;
        const score = Math.round((got / ticks.length) * marks * 2) / 2;
        ticks.forEach((x) => { x.cb.disabled = true; });
        doneBtn.disabled = true;
        RV.sound.play(got === ticks.length ? 'ok' : 'pop');
        RV.fx.toast(`${score} / ${marks}`);
        report({ correct: got === ticks.length, score, max: marks });
      });

      function reveal() {
        if (!model.hidden) return;
        model.hidden = false; checklist.hidden = false; showBtn.hidden = true;
        gsap.from([model, checklist], { y: 16, opacity: 0, stagger: 0.12, duration: 0.45, ease: 'power2.out' });
        RV.sound.play('whoosh');
      }
      return { reveal };
    },
  });
})();

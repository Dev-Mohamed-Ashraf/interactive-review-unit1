/* widgets/recall.js — "think, then reveal" short-answer questions
 * (the textbook "Try 1 — what is the term for…" items).
 * q = { widget:'recall', prompt, items:[{ q, a }] }
 * Student says the answer, reveals it, then self-marks ✓ / ✗. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('recall', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.items, 'items', e, 1);
      (q.items || []).forEach((it, i) => { W.v.bi(it.q, `items[${i}].q`, e); W.v.bi(it.a, `items[${i}].a`, e); });
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const marks = q.items.map(() => null);
      const rows = q.items.map((it, i) => {
        const ans = h('div', { class: 'recall-answer', hidden: true }, h('span', { class: 'term' }, RV.rich(it.a)), RV.i18n.alt(it.a) ? h('span', { class: 'chip en-term' }, RV.i18n.alt(it.a)) : null);
        const show = h('button', { class: 'btn btn-sm', type: 'button' }, RV.icon('eye'), RV.i18n.t({ ar: 'اكشف الإجابة', en: 'Reveal' }));
        const yes = h('button', { class: 'btn btn-sm recall-yes', type: 'button', hidden: true }, RV.icon('check'), RV.i18n.t({ ar: 'كنت عارفها', en: 'I knew it' }));
        const no = h('button', { class: 'btn btn-sm recall-no', type: 'button', hidden: true }, RV.icon('refresh'), RV.i18n.t({ ar: 'محتاج أراجعها', en: 'Need review' }));
        const row = h('div', { class: 'recall-row' },
          h('span', { class: 'tf-num' }, String(i + 1)),
          h('div', { class: 'recall-body' }, h('p', { class: 'recall-q' }, RV.rich(it.q)), ans, h('div', { class: 'recall-actions' }, show, yes, no)));
        show.addEventListener('click', () => reveal(i));
        yes.addEventListener('click', () => mark(i, true));
        no.addEventListener('click', () => mark(i, false));
        return { row, ans, show, yes, no };
      });
      el.append(W.header(q), h('div', { class: 'recall-list' }, rows.map((r) => r.row)));
      gsap.from(rows.map((r) => r.row), { y: 16, opacity: 0, stagger: 0.07, duration: 0.4, clearProps: 'all' });

      function reveal(i) {
        const r = rows[i];
        r.ans.hidden = false; r.show.hidden = true; r.yes.hidden = false; r.no.hidden = false;
        gsap.from(r.ans, { y: -8, opacity: 0, duration: 0.35 });
        RV.sound.play('pop');
      }
      function mark(i, ok) {
        const r = rows[i];
        marks[i] = ok;
        r.row.classList.toggle('is-correct', ok);
        r.row.classList.toggle('is-review', !ok);
        r.yes.hidden = true; r.no.hidden = true;
        RV.sound.play(ok ? 'ok' : 'tap');
        if (marks.every((m) => m !== null)) {
          const score = marks.filter(Boolean).length;
          report({ correct: score === marks.length, score, max: marks.length });
        }
      }
      return { reveal() { rows.forEach((r, i) => { if (r.ans.hidden) reveal(i); }); } };
    },
  });
})();

/* widgets/tf.js — true / false statements (one or many).
 * q = { widget:'tf', prompt?, items:[{ text, answer:bool, explain }] } */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;
  const DEFAULT_PROMPT = { ar: 'حدّد: صح ولا غلط؟', en: 'True or false?' };

  W.defineWidget('tf', {
    validate(q) {
      const e = [];
      W.v.arr(q.items, 'items', e, 1);
      (q.items || []).forEach((it, i) => {
        W.v.bi(it.text, `items[${i}].text`, e);
        if (typeof it.answer !== 'boolean') e.push(`items[${i}].answer must be boolean`);
        if (it.explain) W.v.bi(it.explain, `items[${i}].explain`, e);
      });
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const state = q.items.map(() => null); // null | true | false (user's answer, once right/locked)
      let firstTry = q.items.map(() => true);
      const rows = [];

      const list = h('div', { class: 'tf-list' });
      // statements appear in a new random order each time → no "T, F, T, F" rhythm to guess from
      const order = q.fixedOrder ? q.items.map((_, i) => i) : RV.dom.shuffle(q.items.map((_, i) => i));
      order.forEach((i, pos) => {
        const it = q.items[i];
        const yes = h('button', { class: 'tf-btn tf-yes', type: 'button' }, RV.icon('check'), RV.i18n.ui('tf_true'));
        const no = h('button', { class: 'tf-btn tf-no', type: 'button' }, RV.icon('x'), RV.i18n.ui('tf_false'));
        const note = h('p', { class: 'tf-note' });
        const row = h('div', { class: 'tf-row' },
          q.items.length > 1 ? h('span', { class: 'tf-num' }, String(pos + 1)) : null,
          h('p', { class: 'tf-text' }, RV.rich(it.text)),
          h('div', { class: 'tf-btns' }, yes, no),
          note);
        yes.addEventListener('click', () => answer(i, true));
        no.addEventListener('click', () => answer(i, false));
        rows[i] = { row, yes, no, note };
        list.appendChild(row);
      });

      el.append(W.header(Object.assign({}, q, { prompt: q.prompt || DEFAULT_PROMPT })), list);
      gsap.from(order.map((i) => rows[i].row), { x: 30, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out', clearProps: 'all' });

      function answer(i, val) {
        if (state[i] !== null) return;
        const it = q.items[i];
        const r = rows[i];
        const right = val === it.answer;
        const btn = val ? r.yes : r.no;
        if (right || ctx.mode === 'test') {
          state[i] = val;
          r.row.classList.add(right ? 'is-correct' : 'is-wrong', 'is-locked');
          (it.answer ? r.yes : r.no).classList.add('is-answer');
          if (!right) btn.classList.add('is-picked-wrong');
          if (it.explain) { r.note.replaceChildren(RV.rich(it.explain)); gsap.from(r.note, { height: 0, opacity: 0, duration: 0.3 }); }
          RV.sound.play(right ? 'ok' : 'bad');
          if (right) W.pop(r.row); else W.shake(r.row);
        } else {
          firstTry[i] = false;
          W.shake(btn);
          RV.sound.play('bad');
          btn.classList.add('is-picked-wrong');
          setTimeout(() => btn.classList.remove('is-picked-wrong'), 700);
        }
        if (state.every((s) => s !== null)) finish();
      }

      function finish() {
        const score = q.items.reduce((n, it, i) => n + (state[i] === it.answer && firstTry[i] ? 1 : 0), 0);
        const max = q.items.length;
        report({ correct: score === max, score, max });
      }

      return {
        reveal() {
          q.items.forEach((it, i) => { if (state[i] === null) { firstTry[i] = false; answer(i, it.answer); } });
        },
      };
    },
  });
})();

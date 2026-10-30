/* widgets/mcq.js — multiple choice (single or multi-select).
 * q = { widget:'mcq', prompt, options:[bi], answer: i | [i,j], explain, fixedOrder? }
 * Options are shown in a NEW random order every time (so the letter / position of the
 * right answer can never be memorised); "all/none of the above" stays last.
 * `fixedOrder: true` keeps the authored order (e.g. ordered numbers). */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;
  const LETTERS = { ar: ['أ', 'ب', 'ج', 'د', 'هـ', 'و'], en: ['A', 'B', 'C', 'D', 'E', 'F'] };

  const LAST = /(كل|جميع) ما سبق|لا شيء مما سبق|ولا (واحدة|حاجة) من (دول|السابق)|all of the above|none of the above/i;
  /** Random order, with "all / none of the above" kept at the end. */
  function displayOrder(q) {
    const idx = q.options.map((_, i) => i);
    if (q.fixedOrder) return idx;
    const pinned = idx.filter((i) => LAST.test(q.options[i].ar || '') || LAST.test(q.options[i].en || ''));
    return RV.dom.shuffle(idx.filter((i) => !pinned.includes(i))).concat(pinned);
  }

  W.defineWidget('mcq', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.options, 'options', e, 2);
      (q.options || []).forEach((o, i) => W.v.bi(o, `options[${i}]`, e));
      const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
      ans.forEach((a) => W.v.idx(a, (q.options || []).length, 'answer', e));
      return e;
    },
    mount(el, q, ctx) {
      const multi = Array.isArray(q.answer);
      const answers = multi ? q.answer : [q.answer];
      const report = W.reporter(ctx);
      const letters = LETTERS[RV.i18n.lang];
      let locked = false;
      const chosen = new Set();

      const list = h('div', { class: 'opts' });
      const buttons = new Array(q.options.length); // indexed by the ORIGINAL option index
      displayOrder(q).forEach((i, pos) => {
        const b = h('button', { class: 'opt', type: 'button', 'aria-pressed': 'false' },
          h('span', { class: 'opt-key' }, letters[pos]),
          h('span', { class: 'opt-text' }, RV.rich(q.options[i])));
        b.addEventListener('click', () => pick(i));
        list.appendChild(b);
        buttons[i] = b;
      });

      const checkBtn = multi ? h('button', { class: 'btn btn-primary q-check', type: 'button', disabled: true }, RV.i18n.ui('check')) : null;
      if (checkBtn) checkBtn.addEventListener('click', check);

      RV.dom.add(el, W.header(q, multi ? 'selectAll' : null), list, checkBtn);
      gsap.from(buttons, { y: 16, opacity: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out', clearProps: 'all' });

      function pick(i) {
        if (locked) return;
        RV.sound.play('tap');
        if (multi) {
          chosen.has(i) ? chosen.delete(i) : chosen.add(i);
          buttons[i].classList.toggle('is-selected', chosen.has(i));
          buttons[i].setAttribute('aria-pressed', chosen.has(i));
          checkBtn.disabled = chosen.size === 0;
          return;
        }
        chosen.clear(); chosen.add(i);
        check();
      }

      function check() {
        const right = answers.every((a) => chosen.has(a)) && chosen.size === answers.length;
        if (ctx.mode === 'exam') { // no verdict until the end; the choice can still change
          buttons.forEach((b, i) => b.classList.toggle('is-selected', chosen.has(i)));
          report({ correct: right, score: right ? 1 : 0, max: 1 });
          return;
        }
        buttons.forEach((b, i) => {
          b.classList.remove('is-correct', 'is-wrong');
          if (chosen.has(i)) b.classList.add(answers.includes(i) ? 'is-correct' : 'is-wrong');
        });
        if (right) {
          locked = true;
          buttons.forEach((b) => b.classList.add('is-locked'));
          chosen.forEach((i) => W.pop(buttons[i]));
          W.feedback(el, 'ok', q.explain);
        } else {
          chosen.forEach((i) => { if (!answers.includes(i)) W.shake(buttons[i]); });
          if (ctx.mode === 'test') { locked = true; markAnswers(); }
          W.feedback(el, 'bad', ctx.mode === 'test' ? q.explain : null);
          if (ctx.mode !== 'test') {
            setTimeout(() => {
              if (locked) return;
              buttons.forEach((b) => b.classList.remove('is-wrong', 'is-selected'));
              chosen.clear();
              if (checkBtn) checkBtn.disabled = true;
            }, 900);
          }
        }
        report({ correct: right, score: right ? 1 : 0, max: 1 });
      }

      function markAnswers() {
        buttons.forEach((b, i) => { b.classList.add('is-locked'); if (answers.includes(i)) b.classList.add('is-correct'); });
        if (checkBtn) checkBtn.disabled = true;
      }

      return {
        reveal() {
          locked = true;
          markAnswers();
          answers.forEach((a) => W.pop(buttons[a]));
          W.feedback(el, 'ok', q.explain);
        },
      };
    },
  });
})();

/* widgets/guess.js — 🎯 "guess the transistors": a log-scale slider game.
 * q = { widget:'guess', prompt, y0, n0, y1 }
 * The student drags to a guess, locks it in, then the real Moore value
 * slides in on the same scale; stars and XP depend on how close it was. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;
  const fmt = (n) => (RV.fmtBig ? RV.fmtBig(n) : Math.round(n).toLocaleString('en-US'));

  W.defineWidget('guess', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      ['y0', 'n0', 'y1'].forEach((k) => { if (typeof q[k] !== 'number') e.push(`${k} must be a number`); });
      if (q.y1 <= q.y0) e.push('y1 must be after y0');
      return e;
    },
    mount(el, q, ctx) {
      const actual = RV.mooreSolve({ mode: 'forward', y0: q.y0, n0: q.n0, y1: q.y1 }).result;
      const lo = Math.log10(q.n0), hi = Math.log10(actual) + 1.6; // scale from N₀ to well above the answer
      const toVal = (p) => 10 ** (lo + (hi - lo) * p);
      const toPos = (v) => (Math.log10(v) - lo) / (hi - lo);
      let pos = 0.35, locked = false;

      const valueEl = h('div', { class: 'gs-value mono' });
      const range = h('input', { type: 'range', min: 0, max: 1000, value: pos * 1000, class: 'gs-range no-swipe', 'aria-label': 'guess' });
      const realMark = h('div', { class: 'gs-real', hidden: true }, h('span', null, '🎯'));
      const guessMark = h('div', { class: 'gs-guess-mark', hidden: true }, h('span', null, '👆'));
      const scale = h('div', { class: 'gs-scale' }, range, realMark, guessMark,
        h('div', { class: 'gs-ends mono' }, h('span', null, fmt(q.n0)), h('span', null, fmt(toVal(1)))));
      const lockBtn = h('button', { class: 'btn btn-primary', type: 'button' }, '🔒 ', RV.i18n.t({ ar: 'ثبّت تخميني', en: 'Lock my guess' }));
      const result = h('div', { class: 'gs-result', hidden: true });
      RV.dom.add(el,
        h('div', { class: 'q-head' }, h('span', { class: 'q-tag' }, '🎯 ', RV.i18n.t({ ar: 'خمّن!', en: 'Guess!' })), h('p', { class: 'q-prompt' }, RV.rich(q.prompt)),
          h('p', { class: 'q-hint' }, RV.i18n.t({ ar: `معلومة: سنة ${q.y0} كان العدد ${q.n0.toLocaleString('en-US')}. حرّك السهم لتخمينك لسنة ${q.y1}.`, en: `Clue: in ${q.y0} the count was ${q.n0.toLocaleString('en-US')}. Slide to your guess for ${q.y1}.` }))),
        valueEl, scale, h('div', { class: 'q-actions' }, lockBtn), result);

      function paint() { valueEl.textContent = '≈ ' + fmt(toVal(pos)); }
      paint();
      range.addEventListener('input', () => { if (locked) return; pos = range.value / 1000; paint(); RV.sound.play('beep'); });
      lockBtn.addEventListener('click', lock);

      function lock() {
        if (locked) return;
        locked = true; range.disabled = true; lockBtn.hidden = true;
        const guess = toVal(pos);
        const ratio = Math.max(guess / actual, actual / guess);
        guessMark.hidden = false; guessMark.style.left = pos * 100 + '%';
        realMark.hidden = false;
        gsap.fromTo(realMark, { left: '0%' }, { left: Math.min(1, toPos(actual)) * 100 + '%', duration: 1.4, ease: 'power3.out' });
        const stars = ratio < 1.5 ? 3 : ratio < 3 ? 2 : ratio < 10 ? 1 : 0;
        const verdict = [
          { ar: 'بعيد شوية 😅 — النمو الأُسّي بيخدع!', en: 'Quite far 😅 — exponential growth is tricky!' },
          { ar: 'مش بطّال! 👍', en: 'Not bad! 👍' },
          { ar: 'قريب جدًا! 👏', en: 'Very close! 👏' },
          { ar: 'قنّاص!! 🎯🔥', en: 'Sniper!! 🎯🔥' },
        ][stars];
        const n = (q.y1 - q.y0) / 2;
        result.hidden = false;
        result.replaceChildren(
          h('div', { class: 'gs-stars' }, '⭐'.repeat(stars) + '☆'.repeat(3 - stars)),
          h('b', null, RV.i18n.t(verdict)),
          h('p', null, RV.i18n.t({ ar: 'تخمينك: ', en: 'Your guess: ' }), h('b', { class: 'mono' }, fmt(guess)), ' · ', RV.i18n.t({ ar: 'الحقيقة: ', en: 'Actual: ' }), h('b', { class: 'mono gs-actual' }, fmt(actual))),
          RV.mathEl('p', 'gs-formula mono', `N = ${q.n0.toLocaleString('en-US')} × 2^${n} ≈ ${fmt(actual)}`));
        gsap.from(result.children, { y: 16, opacity: 0, stagger: 0.15, duration: 0.45, delay: 1.2 });
        setTimeout(() => {
          RV.sound.play(stars >= 2 ? 'win' : 'pop');
          if (stars === 3) RV.fx.confetti();
          RV.game.event('guess', { ratio, xp: [5, 10, 20, 30][stars], anchor: valueEl });
          if (ctx.onAnswer) ctx.onAnswer({ correct: stars >= 2, score: stars >= 2 ? 1 : 0, max: 1 });
        }, 1300);
      }
      return { reveal() { if (!locked) { pos = toPos(actual); range.value = pos * 1000; paint(); lock(); } } };
    },
  });
})();

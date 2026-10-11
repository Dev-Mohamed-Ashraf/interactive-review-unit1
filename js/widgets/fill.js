/* widgets/fill.js — fill the blanks from a word bank.
 * q = { widget:'fill', prompt, text:{ar:'… {0} … {1}', en:'…'}, bank:[bi], answer:[bankIdx per blank], explain }
 * Tap a word → it goes to the active (or first empty) blank. Tap a filled blank to clear it. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('fill', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.bi(q.text, 'text', e);
      W.v.arr(q.bank, 'bank', e, 2);
      (q.bank || []).forEach((b, i) => W.v.bi(b, `bank[${i}]`, e));
      W.v.arr(q.answer, 'answer', e, 1);
      (q.answer || []).forEach((a, i) => W.v.idx(a, (q.bank || []).length, `answer[${i}]`, e));
      ['ar', 'en'].forEach((lang) => {
        const txt = q.text && q.text[lang];
        if (!txt) return;
        const found = (txt.match(/\{(\d+)\}/g) || []).length;
        if (found !== (q.answer || []).length) e.push(`text.${lang}: has ${found} blanks but answer has ${(q.answer || []).length}`);
      });
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const filled = q.answer.map(() => null);
      let firstTry = true;
      let locked = false;
      let activeBlank = 0;

      const para = h('p', { class: 'fill-text' });
      const blanks = [];
      RV.i18n.t(q.text).split(/(\{\d+\})/).forEach((part) => {
        const m = part.match(/^\{(\d+)\}$/);
        if (!m) { para.appendChild(RV.rich(part)); return; }
        const k = +m[1];
        const b = h('button', { class: 'fill-blank', type: 'button' }, h('span', { class: 'fill-letter' }, String.fromCharCode(97 + k)));
        b.addEventListener('click', () => tapBlank(k));
        blanks[k] = b;
        para.appendChild(b);
      });

      const bank = h('div', { class: 'fill-bank' });
      const words = q.bank.map((w, i) => {
        const b = h('button', { class: 'fill-word', type: 'button' }, RV.rich(w));
        b.addEventListener('click', () => tapWord(i));
        bank.appendChild(b);
        return b;
      });

      el.append(W.header(q, 'tapFill'), para, bank);
      paint();

      function tapBlank(k) {
        if (locked) return;
        RV.sound.play('tap');
        if (filled[k] !== null) filled[k] = null;
        activeBlank = k;
        paint();
      }
      function tapWord(i) {
        if (locked || filled.includes(i)) return;
        let k = activeBlank;
        if (k == null || filled[k] !== null) k = filled.indexOf(null);
        if (k < 0) return;
        filled[k] = i;
        RV.sound.play('pop');
        activeBlank = filled.indexOf(null);
        paint();
        gsap.from(blanks[k], { scale: 0.8, duration: 0.35, ease: 'back.out(3)', clearProps: 'scale' });
        if (filled.every((f) => f !== null)) check();
      }
      function paint() {
        blanks.forEach((b, k) => {
          const i = filled[k];
          b.classList.toggle('is-filled', i !== null);
          b.classList.toggle('is-active', k === activeBlank && !locked);
          while (b.childNodes.length > 1) b.removeChild(b.lastChild); // keep the (a)(b) letter, drop the old word
          if (i !== null) b.appendChild(RV.rich(q.bank[i]));
        });
        words.forEach((w, i) => w.classList.toggle('is-used', filled.includes(i)));
      }
      function check() {
        let score = 0;
        blanks.forEach((b, k) => {
          const ok = filled[k] === q.answer[k];
          if (ok) score++;
          b.classList.toggle('is-correct', ok);
          b.classList.toggle('is-wrong', !ok);
        });
        const all = score === blanks.length;
        if (all || ctx.mode === 'test') {
          locked = true;
          if (!all) setTimeout(showAnswer, 1000);
          W.feedback(el, all ? 'ok' : score ? 'partly' : 'bad', q.explain);
          report({ correct: all && firstTry, score: firstTry ? score : 0, max: blanks.length });
        } else {
          firstTry = false;
          W.feedback(el, score ? 'partly' : 'bad', null);
          setTimeout(() => {
            blanks.forEach((b, k) => { if (filled[k] !== q.answer[k]) filled[k] = null; b.classList.remove('is-wrong'); });
            activeBlank = filled.indexOf(null);
            paint();
          }, 1000);
        }
      }
      function showAnswer() {
        q.answer.forEach((a, k) => { filled[k] = a; });
        locked = true;
        paint();
        blanks.forEach((b) => { b.classList.remove('is-wrong'); b.classList.add('is-correct'); });
      }

      return { reveal() { firstTry = false; showAnswer(); W.feedback(el, 'ok', q.explain); } };
    },
  });
})();

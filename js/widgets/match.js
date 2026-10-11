/* widgets/match.js — tap-to-pair matching (touch friendly).
 * q = { widget:'match', prompt, left:[bi], right:[bi], answer:[rightIdx per left], explain }
 * Tap a left card, then a right card. Lines are drawn between pairs. */
(function () {
  'use strict';
  const { h, s } = RV.dom;
  const W = RV.wkit;
  const COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#fb923c'];

  W.defineWidget('match', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.left, 'left', e, 2);
      W.v.arr(q.right, 'right', e, 2);
      W.v.arr(q.answer, 'answer', e, 2);
      (q.left || []).forEach((x, i) => W.v.bi(x, `left[${i}]`, e));
      (q.right || []).forEach((x, i) => W.v.bi(x, `right[${i}]`, e));
      if (q.answer && q.left && q.answer.length !== q.left.length) e.push('answer length must equal left length');
      (q.answer || []).forEach((a, i) => W.v.idx(a, (q.right || []).length, `answer[${i}]`, e));
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const pairs = new Array(q.left.length).fill(null); // left i → right j
      let firstTry = true;
      let activeLeft = null;
      let locked = false;

      const wrap = h('div', { class: 'match' });
      const svg = s('svg', { class: 'match-lines' });
      const colL = h('div', { class: 'match-col' });
      const colR = h('div', { class: 'match-col' });
      const L = q.left.map((txt, i) => {
        const b = h('button', { class: 'match-item', type: 'button' }, h('span', { class: 'match-key' }, String.fromCharCode(97 + i)), h('span', null, RV.rich(txt)));
        b.addEventListener('click', () => tapLeft(i));
        colL.appendChild(b);
        return b;
      });
      const R = q.right.map((txt, j) => {
        const b = h('button', { class: 'match-item', type: 'button' }, h('span', { class: 'match-key' }, String.fromCharCode(65 + j)), h('span', null, RV.rich(txt)));
        b.addEventListener('click', () => tapRight(j));
        colR.appendChild(b);
        return b;
      });
      wrap.append(svg, colL, colR);
      el.append(W.header(q, 'tapPair'), wrap);
      gsap.from([...L, ...R], { scale: 0.9, opacity: 0, stagger: 0.04, duration: 0.35, ease: 'back.out(2)', clearProps: 'all' });

      const ro = new ResizeObserver(drawLines);
      ro.observe(wrap);

      function tapLeft(i) {
        if (locked) return;
        RV.sound.play('tap');
        activeLeft = activeLeft === i ? null : i;
        L.forEach((b, k) => b.classList.toggle('is-active', k === activeLeft));
      }
      function tapRight(j) {
        if (locked) return;
        if (activeLeft === null) {
          // allow re-pick: tapping a paired right un-pairs it
          const owner = pairs.indexOf(j);
          if (owner >= 0) { pairs[owner] = null; paint(); }
          return;
        }
        const prevOwner = pairs.indexOf(j);
        if (prevOwner >= 0) pairs[prevOwner] = null;
        pairs[activeLeft] = j;
        RV.sound.play('pop');
        activeLeft = null;
        paint();
        if (pairs.every((p) => p !== null)) check();
      }

      function paint() {
        L.forEach((b, i) => {
          b.classList.toggle('is-active', i === activeLeft);
          b.style.setProperty('--pair', pairs[i] !== null ? COLORS[i % COLORS.length] : 'transparent');
          b.classList.toggle('is-paired', pairs[i] !== null);
        });
        R.forEach((b, j) => {
          const owner = pairs.indexOf(j);
          b.style.setProperty('--pair', owner >= 0 ? COLORS[owner % COLORS.length] : 'transparent');
          b.classList.toggle('is-paired', owner >= 0);
        });
        drawLines();
      }

      function drawLines() {
        const box = wrap.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
        RV.dom.clear(svg);
        const rtl = document.documentElement.dir === 'rtl';
        pairs.forEach((j, i) => {
          if (j === null) return;
          const a = L[i].getBoundingClientRect();
          const b = R[j].getBoundingClientRect();
          const x1 = (rtl ? a.left : a.right) - box.left;
          const x2 = (rtl ? b.right : b.left) - box.left;
          const y1 = a.top + a.height / 2 - box.top;
          const y2 = b.top + b.height / 2 - box.top;
          const mx = (x1 + x2) / 2;
          const wrong = L[i].classList.contains('is-wrong');
          svg.appendChild(s('path', { d: `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`, stroke: wrong ? 'var(--bad)' : COLORS[i % COLORS.length], 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round', 'stroke-dasharray': wrong ? '6 6' : null }));
        });
      }

      function check() {
        let score = 0;
        pairs.forEach((j, i) => {
          const ok = j === q.answer[i];
          if (ok) score++;
          L[i].classList.toggle('is-correct', ok); L[i].classList.toggle('is-wrong', !ok);
          R[j].classList.toggle('is-correct', ok); R[j].classList.toggle('is-wrong', !ok);
        });
        drawLines();
        const all = score === q.left.length;
        if (all || ctx.mode === 'test') {
          locked = true;
          if (!all) showAnswer();
          W.feedback(el, all ? 'ok' : score ? 'partly' : 'bad', q.explain);
          report({ correct: all && firstTry, score: firstTry ? score : 0, max: q.left.length });
        } else {
          firstTry = false;
          W.feedback(el, score ? 'partly' : 'bad', null);
          setTimeout(() => {
            pairs.forEach((j, i) => { if (j !== q.answer[i]) pairs[i] = null; });
            [...L, ...R].forEach((b) => b.classList.remove('is-wrong'));
            paint();
          }, 1100);
        }
      }

      function showAnswer() {
        q.answer.forEach((j, i) => { pairs[i] = j; });
        paint();
        [...L, ...R].forEach((b) => { b.classList.remove('is-wrong'); b.classList.add('is-correct'); });
        drawLines();
      }

      return {
        reveal() { locked = true; firstTry = false; showAnswer(); W.feedback(el, 'ok', q.explain); },
        destroy() { ro.disconnect(); },
      };
    },
  });
})();

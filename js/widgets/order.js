/* widgets/order.js — put items in the right sequence by tapping.
 * q = { widget:'order', prompt, items:[bi] (CORRECT order), explain }
 * Items appear shuffled; each tap appends to the answer track. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('order', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.items, 'items', e, 3);
      (q.items || []).forEach((x, i) => W.v.bi(x, `items[${i}]`, e));
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      let firstTry = true;
      let locked = false;
      let picked = []; // indices into q.items, in user order

      let shuffled = RV.dom.shuffle(q.items.map((_, i) => i));
      if (shuffled.every((v, i) => v === i)) shuffled = shuffled.reverse();

      const track = h('ol', { class: 'order-track' });
      const pool = h('div', { class: 'order-pool' });
      const slots = q.items.map((_, k) => {
        const li = h('li', { class: 'order-slot' }, h('span', { class: 'order-num' }, String(k + 1)), h('span', { class: 'order-slot-text' }));
        li.addEventListener('click', () => unpick(k));
        track.appendChild(li);
        return li;
      });
      const chips = {};
      shuffled.forEach((i) => {
        const b = h('button', { class: 'order-chip', type: 'button' }, RV.rich(q.items[i]));
        b.addEventListener('click', () => pick(i));
        chips[i] = b;
        pool.appendChild(b);
      });
      const resetBtn = h('button', { class: 'btn btn-sm btn-ghost', type: 'button' }, RV.icon('refresh'), RV.i18n.ui('reset'));
      resetBtn.addEventListener('click', () => { if (!locked) { picked = []; paint(); } });

      el.append(W.header(q, 'tapOrder'), track, pool, h('div', { class: 'q-actions' }, resetBtn));
      gsap.from(Object.values(chips), { y: 20, opacity: 0, stagger: 0.07, duration: 0.4, ease: 'back.out(2)', clearProps: 'all' });

      function pick(i) {
        if (locked || picked.includes(i)) return;
        RV.sound.play('pop');
        picked.push(i);
        paint();
        gsap.from(slots[picked.length - 1], { scale: 0.85, duration: 0.35, ease: 'back.out(3)', clearProps: 'scale' });
        if (picked.length === q.items.length) check();
      }
      function unpick(k) {
        if (locked || k >= picked.length) return;
        picked.splice(k, 1);
        paint();
      }
      function paint() {
        slots.forEach((li, k) => {
          const i = picked[k];
          li.querySelector('.order-slot-text').replaceChildren(i == null ? '' : RV.rich(q.items[i]));
          li.classList.toggle('is-filled', i != null);
          li.classList.remove('is-correct', 'is-wrong');
        });
        Object.entries(chips).forEach(([i, b]) => b.classList.toggle('is-used', picked.includes(+i)));
      }
      function check() {
        const right = picked.every((v, k) => v === k);
        slots.forEach((li, k) => li.classList.add(picked[k] === k ? 'is-correct' : 'is-wrong'));
        if (right || ctx.mode === 'test') {
          locked = true;
          if (!right) setTimeout(showAnswer, 900);
          W.feedback(el, right ? 'ok' : 'bad', q.explain);
          report({ correct: right && firstTry, score: right && firstTry ? 1 : 0, max: 1 });
        } else {
          firstTry = false;
          W.feedback(el, 'bad', null);
          slots.forEach((li, k) => { if (picked[k] !== k) W.shake(li); });
          // keep the correct prefix, clear the rest
          const firstWrong = picked.findIndex((v, k) => v !== k);
          setTimeout(() => { picked = picked.slice(0, firstWrong); paint(); }, 1000);
        }
      }
      function showAnswer() {
        picked = q.items.map((_, i) => i);
        paint();
        slots.forEach((li) => li.classList.add('is-correct'));
      }

      return {
        reveal() { locked = true; firstTry = false; showAnswer(); W.feedback(el, 'ok', q.explain); },
      };
    },
  });
})();

/* widgets/flash.js — key-term flashcards (3D flip + known / again deck).
 * q = { widget:'flash', prompt, cards:[{ front: bi, back: bi }] }
 * "Again" sends the card to the back of the deck. Done when all known. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('flash', {
    validate(q) {
      const e = [];
      W.v.arr(q.cards, 'cards', e, 1);
      (q.cards || []).forEach((c, i) => { W.v.bi(c.front, `cards[${i}].front`, e); W.v.bi(c.back, `cards[${i}].back`, e); });
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      let deck = q.cards.map((_, i) => i);
      let known = 0;
      let flipped = false;

      const counter = h('div', { class: 'flash-counter' });
      const inner = h('div', { class: 'flash-inner' });
      const card = h('button', { class: 'flash-card', type: 'button', 'aria-live': 'polite' }, inner);
      const knowBtn = h('button', { class: 'btn btn-primary', type: 'button' }, RV.i18n.ui('known'));
      const againBtn = h('button', { class: 'btn', type: 'button' }, RV.i18n.ui('again'));
      const bar = h('div', { class: 'flash-bar' }, h('i'));
      el.append(W.header(Object.assign({}, q, { prompt: q.prompt || { ar: 'كروت المصطلحات', en: 'Key-term cards' } }), 'tapToFlip'), bar, counter, card, h('div', { class: 'q-actions flash-actions' }, againBtn, knowBtn));

      card.addEventListener('click', flip);
      knowBtn.addEventListener('click', () => next(true));
      againBtn.addEventListener('click', () => next(false));
      render();

      function render() {
        const i = deck[0];
        const c = q.cards[i];
        flipped = false;
        RV.dom.clear(inner);
        RV.dom.add(inner,
          h('div', { class: 'flash-face flash-front' }, h('span', { class: 'flash-big term' }, RV.rich(c.front)), RV.i18n.alt(c.front) ? h('span', { class: 'chip en-term' }, RV.i18n.alt(c.front)) : null),
          h('div', { class: 'flash-face flash-back' }, h('p', null, RV.rich(c.back))));
        inner.style.transform = 'rotateY(0deg)';
        counter.textContent = `${known} / ${q.cards.length}`;
        bar.firstChild.style.width = `${(known / q.cards.length) * 100}%`;
        gsap.fromTo(card, { y: 30, opacity: 0, rotate: -3 }, { y: 0, opacity: 1, rotate: 0, duration: 0.45, ease: 'back.out(1.6)' });
      }
      function flip() {
        flipped = !flipped;
        RV.sound.play('whoosh');
        gsap.to(inner, { rotateY: flipped ? 180 : 0, duration: 0.6, ease: 'power3.inOut' });
      }
      function next(ok) {
        if (!deck.length) return;
        const i = deck.shift();
        if (ok) { known++; RV.sound.play('ok'); } else { deck.push(i); RV.sound.play('tap'); }
        if (!deck.length) {
          counter.textContent = `${known} / ${q.cards.length}`;
          bar.firstChild.style.width = '100%';
          card.disabled = true; knowBtn.disabled = true; againBtn.disabled = true;
          RV.fx.confetti({ count: 80 });
          report({ correct: true, score: q.cards.length, max: q.cards.length });
          return;
        }
        render();
      }
      return { reveal() { if (!flipped) flip(); } };
    },
  });
})();

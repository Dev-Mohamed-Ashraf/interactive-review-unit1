/* =========================================================
 * anims/cards.js — iconCards: a deck of concept cards.
 *   props = { cards: [{ icon, title: bi, sub?: bi, motion?: 'network'|'cart'|'pulse'|'float'|'scan'|'spin' }] }
 *   beat i → card i flips in and becomes the spotlight; earlier cards stay.
 *   Each card has its own looping micro-motion so nothing is ever still.
 * ========================================================= */
(function () {
  'use strict';

  const MOTIONS = {
    network(card) { // signals pulsing outward
      for (let k = 0; k < 3; k++) {
        const r = RV.dom.h('span', { class: 'ic-ripple' });
        card.querySelector('.ic-icon').appendChild(r);
        gsap.fromTo(r, { scale: 0.6, opacity: 0.8 }, { scale: 2.2, opacity: 0, duration: 2, repeat: -1, delay: k * 0.66, ease: 'power1.out' });
      }
    },
    cart(card) { gsap.to(card.querySelector('.ic-icon .ico'), { x: 6, rotate: -6, duration: 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut' }); },
    pulse(card) { gsap.to(card.querySelector('.ic-icon'), { scale: 1.1, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' }); },
    float(card) { gsap.to(card.querySelector('.ic-icon'), { y: -8, rotate: 4, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' }); },
    spin(card) { gsap.to(card.querySelector('.ic-icon .ico'), { rotate: 360, duration: 6, repeat: -1, ease: 'none' }); },
    scan(card) {
      const line = RV.dom.h('span', { class: 'ic-scanline' });
      card.querySelector('.ic-icon').appendChild(line);
      gsap.fromTo(line, { top: '10%' }, { top: '85%', duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    },
  };

  RV.kit.defineAnim('iconCards', (stage, props, api) => {
    const { h } = api;
    const cards = (props.cards || []).map((c, i) => {
      const el = h('div', { class: 'ic-card', style: { '--i': i } },
        h('div', { class: 'ic-icon' }, api.icon(c.icon)),
        h('div', { class: 'ic-title' }, api.t(c.title)),
        c.sub ? h('div', { class: 'ic-sub' }, api.t(c.sub)) : null);
      el.style.visibility = 'hidden';
      return { el, def: c, shown: false };
    });
    const grid = h('div', { class: 'ic-grid', style: { '--n': cards.length } }, cards.map((c) => c.el));
    stage.appendChild(grid);

    function show(c) {
      c.shown = true;
      c.el.style.visibility = 'visible';
      gsap.fromTo(c.el, { rotateY: -100, opacity: 0, z: -120 }, { rotateY: 0, opacity: 1, z: 0, duration: 0.8, ease: 'back.out(1.4)' });
      if (!c.moving) { c.moving = true; (MOTIONS[c.def.motion] || MOTIONS.float)(c.el); }
    }

    return {
      beat(i) {
        cards.forEach((c, k) => {
          if (k <= i && !c.shown) show(c);
          if (k > i && c.shown) { c.shown = false; gsap.set(c.el, { visibility: 'hidden' }); }
          c.el.classList.toggle('is-focus', k === i);
        });
        const focus = cards[i];
        if (focus) gsap.fromTo(focus.el, { scale: 1 }, { scale: 1.06, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out' });
      },
    };
  });
})();

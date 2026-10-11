/* =========================================================
 * anims/realities.js — arVr: AR adds ➕ / VR replaces 🔄
 *   Two panels share the same "real room".
 *   beat 0: AR — a phone overlays digital objects on the real room
 *   beat 1: VR — headset on, the room dissolves into a virtual world
 *   beat 2: both side by side with the rule
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  function room(s, id) {
    return s('g', { class: 'room' },
      s('rect', { x: 0, y: 0, width: 400, height: 300, class: 'room-wall' }),
      s('rect', { x: 0, y: 220, width: 400, height: 80, class: 'room-floor' }),
      s('rect', { x: 250, y: 40, width: 110, height: 90, rx: 6, class: 'room-window' }),
      s('line', { x1: 305, x2: 305, y1: 40, y2: 130, class: 'room-frame' }),
      s('line', { x1: 250, x2: 360, y1: 85, y2: 85, class: 'room-frame' }),
      s('rect', { x: 60, y: 180, width: 120, height: 14, rx: 4, class: 'room-table' }),
      s('rect', { x: 70, y: 194, width: 10, height: 50, class: 'room-table' }),
      s('rect', { x: 160, y: 194, width: 10, height: 50, class: 'room-table' }),
      s('rect', { x: 330, y: 200, width: 30, height: 40, rx: 4, class: 'room-pot' }),
      s('path', { d: 'M345 200 C 330 170, 320 160, 335 140 M345 200 C 360 165, 372 160, 360 138 M345 200 L345 150', class: 'room-plant' }));
  }

  K.defineAnim('arVr', (stage, props, api) => {
    const { s, h } = api;
    const t = api.t;

    // ---------- AR panel ----------
    const arSvg = s('svg', { viewBox: '0 0 400 300', class: 'rv-svg' });
    const arRoom = room(s);
    const overlay = s('g', { class: 'ar-overlay' });
    const sofa = s('g', { class: 'ar-sofa', transform: 'translate(120 215)' },
      s('rect', { x: -60, y: -40, width: 120, height: 34, rx: 10 }), s('rect', { x: -70, y: -20, width: 140, height: 26, rx: 10 }), s('rect', { x: -66, y: 6, width: 8, height: 12 }), s('rect', { x: 58, y: 6, width: 8, height: 12 }));
    const tag = s('g', { class: 'ar-tag', transform: 'translate(120 140)' }, s('rect', { x: -62, y: -18, width: 124, height: 32, rx: 9 }), s('text', { x: 0, y: 4, 'text-anchor': 'middle' }, t({ ar: 'كنبة · 3,500 ج', en: 'Sofa · EGP 3,500' })));
    const arrow = s('path', { d: 'M200 270 L200 236 L188 236 L206 214 L224 236 L212 236 L212 270 Z', class: 'ar-arrow' });
    const creature = s('g', { class: 'ar-creature', transform: 'translate(300 250)' }, s('circle', { cx: 0, cy: 0, r: 16 }), s('circle', { cx: -5, cy: -4, r: 3, class: 'eye' }), s('circle', { cx: 5, cy: -4, r: 3, class: 'eye' }));
    overlay.append(sofa, tag, arrow, creature);
    const phone = s('g', { class: 'ar-phone' }, s('rect', { x: 40, y: 20, width: 320, height: 260, rx: 26 }), s('rect', { x: 180, y: 28, width: 40, height: 6, rx: 3, class: 'ar-notch' }));
    arSvg.append(arRoom, overlay, phone);
    const arPanel = h('div', { class: 'rv-panel rv-ar' }, h('div', { class: 'rv-head' }, h('b', null, 'AR'), h('span', null, t({ ar: 'الواقع المعزز', en: 'Augmented reality' })), h('span', { class: 'rv-rule' }, t({ ar: 'يضيف ➕', en: 'adds ➕' }))), arSvg);

    // ---------- VR panel ----------
    const vrSvg = s('svg', { viewBox: '0 0 400 300', class: 'rv-svg' });
    const vrRoom = room(s);
    const pixels = s('g', { class: 'vr-pixels' });
    for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) pixels.appendChild(s('rect', { x: c * 50, y: r * 50, width: 50, height: 50, class: 'vr-px' }));
    const space = s('g', { class: 'vr-space' });
    space.appendChild(s('rect', { x: 0, y: 0, width: 400, height: 300, class: 'vr-bg' }));
    for (let k = 0; k < 40; k++) space.appendChild(s('circle', { cx: Math.random() * 400, cy: Math.random() * 300, r: Math.random() * 1.8 + 0.4, class: 'vr-star' }));
    const planet = s('g', { transform: 'translate(270 120)' }, s('circle', { cx: 0, cy: 0, r: 46, class: 'vr-planet' }), s('ellipse', { cx: 0, cy: 0, rx: 80, ry: 16, class: 'vr-ring' }));
    const cubes = [0, 1, 2].map((k) => s('rect', { x: 60 + k * 50, y: 190 - k * 40, width: 34, height: 34, rx: 6, class: 'vr-cube' }));
    space.append(planet, ...cubes);
    const headset = s('g', { class: 'vr-headset', transform: 'translate(200 150)' }, s('path', { d: 'M-120 -40 H120 V40 H40 L20 15 H-20 L-40 40 H-120 Z' }), s('circle', { cx: -60, cy: 0, r: 20, class: 'lens' }), s('circle', { cx: 60, cy: 0, r: 20, class: 'lens' }));
    vrSvg.append(vrRoom, space, pixels, headset);
    const vrPanel = h('div', { class: 'rv-panel rv-vr' }, h('div', { class: 'rv-head' }, h('b', null, 'VR'), h('span', null, t({ ar: 'الواقع الافتراضي', en: 'Virtual reality' })), h('span', { class: 'rv-rule' }, t({ ar: 'يستبدل 🔄', en: 'replaces 🔄' }))), vrSvg);

    stage.appendChild(h('div', { class: 'rv-wrap' }, arPanel, vrPanel));

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function playAR() {
      gsap.set(overlay.children, { autoAlpha: 0 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.fromTo(phone, { x: -30, y: 20, rotation: -4, svgOrigin: '200 150' }, { x: 0, y: 0, rotation: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(sofa, { autoAlpha: 0, scale: 0.2, svgOrigin: '120 215' }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' })
        .fromTo(tag, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.4 })
        .fromTo(arrow, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 })
        .fromTo(creature, { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'bounce.out' })
        .to(creature, { y: -16, duration: 0.3, repeat: 3, yoyo: true, ease: 'power1.out' })
        .to(overlay.children, { autoAlpha: 0, duration: 0.4, delay: 0.6 });
      loops.push(tl);
    }
    function playVR() {
      gsap.set(space, { autoAlpha: 0 });
      gsap.set(pixels.children, { autoAlpha: 0 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tl.set(vrRoom, { autoAlpha: 1 })
        .set(space, { autoAlpha: 0 })
        .fromTo(headset, { y: -220, autoAlpha: 1 }, { y: 0, duration: 0.8, ease: 'power3.in' })
        .to(headset, { autoAlpha: 0, duration: 0.3 })
        .set(pixels.children, { autoAlpha: 1 })
        .set(vrRoom, { autoAlpha: 0 })
        .to(pixels.children, { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.35, stagger: { amount: 0.9, from: 'random' } })
        .to(space, { autoAlpha: 1, duration: 0.6 }, '-=0.8')
        .to(planet, { rotation: 20, svgOrigin: '270 120', duration: 3, ease: 'sine.inOut' }, '<')
        .to(cubes, { y: -14, rotation: 25, transformOrigin: '50% 50%', duration: 1.2, stagger: 0.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<');
      loops.push(tl);
    }

    return {
      beat(i) {
        kill();
        arPanel.classList.toggle('is-dim', i === 1);
        vrPanel.classList.toggle('is-dim', i === 0);
        arPanel.classList.toggle('is-focus', i !== 1);
        vrPanel.classList.toggle('is-focus', i !== 0);
        if (i !== 1) playAR();
        if (i !== 0) playVR(); else { gsap.set(space, { autoAlpha: 0 }); gsap.set(vrRoom, { autoAlpha: 1 }); gsap.set(pixels.children, { autoAlpha: 0 }); gsap.set(headset, { autoAlpha: 0 }); }
        if (i === 2) gsap.from('.rv-rule', { scale: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(3)' });
      },
    };
  });
})();

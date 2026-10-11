/* =========================================================
 * anims/mooreSymbols.js — "what do t and t₀ mean?" made concrete.
 *   props = { y0: 2002, n0: 1451, y1: 2025 }
 *   beat 0: calendar t₀ flips to the START year; chip shows N₀ (the count we know)
 *   beat 1: calendar t  flips to the TARGET year; N = ? pulses (what we want)
 *   beat 2: a runner travels t₀ → t, a counter counts the years, ×2 pops every 2 years
 *   beat 3: the result line: t − t₀ = 23 years → n = 23 ÷ 2 = 11.5 doublings
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  K.defineAnim('mooreSymbols', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const y0 = props.y0 || 2002, y1 = props.y1 || 2025, n0 = props.n0 || 1451;
    const dt = y1 - y0, n = dt / 2;

    function calendar(sym, cls, label, chip) {
      const year = h('div', { class: 'sy-year mono' }, '----');
      const card = h('div', { class: 'sy-cal ' + cls },
        h('div', { class: 'sy-rings' }, h('i'), h('i')),
        h('div', { class: 'sy-cal-head' }, h('b', { class: 'mono' }, sym), h('span', null, t(label))),
        year,
        h('div', { class: 'sy-chip' }, chip));
      return { card, year };
    }
    const c0 = calendar('t₀', 'start', { ar: 'سنة البداية', en: 'start year' },
      [h('span', { class: 'mono' }, 'N₀ = ' + n0.toLocaleString('en-US')), h('small', null, t({ ar: 'العدد اللي إحنا عارفينه', en: 'the count we know' }))]);
    const q = h('span', { class: 'mono sy-q' }, 'N = ?');
    const c1 = calendar('t', 'target', { ar: 'السنة المطلوبة', en: 'target year' },
      [q, h('small', null, t({ ar: 'العدد اللي عايزين نعرفه', en: 'the count we want' }))]);

    const fill = h('div', { class: 'sy-fill' });
    const runner = h('div', { class: 'sy-runner' }, api.icon('clock'));
    const ticks = h('div', { class: 'sy-ticks' });
    for (let k = 1; k <= Math.ceil(n); k++) ticks.appendChild(h('span', { class: 'sy-tick' + (k > n ? ' half' : ''), style: { left: Math.min(100, (k * 2 / dt) * 100) + '%' } }, k > n ? '×√2' : '×2'));
    const counter = h('div', { class: 'sy-counter' }, h('b', { class: 'mono' }, '0'), h('span', null, t({ ar: 'سنة', en: 'years' })));
    const track = h('div', { class: 'sy-track' }, h('div', { class: 'sy-line' }, fill, runner), ticks);

    const res1 = RV.mathEl('div', 'sy-res mono', `t − t₀ = ${y1} − ${y0} = ${dt}`);
    const res2 = RV.mathEl('div', 'sy-res big mono', `n = ${dt} ÷ 2 = ${n.toLocaleString('en-US')}`);
    const resNote = h('div', { class: 'sy-note' }, t({ ar: 'كل سنتين = تضاعف واحد (×2)', en: 'every 2 years = one doubling (×2)' }));

    stage.appendChild(h('div', { class: 'sy-wrap' },
      h('div', { class: 'sy-cals' }, c0.card, h('div', { class: 'sy-arrow' }, '⟶'), c1.card),
      h('div', { class: 'sy-mid' }, track, counter),
      h('div', { class: 'sy-results' }, res1, res2, resNote)));

    gsap.set([c1.card, track, counter, res1, res2, resNote], { autoAlpha: 0 });
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    /** Flip the calendar pages quickly up to the final year. */
    function flipTo(el, from, to) {
      const o = { v: from };
      return gsap.to(o, { v: to, duration: 1.1, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); gsap.fromTo(el, { rotateX: -60 }, { rotateX: 0, duration: 0.12 }); } });
    }
    let level = -1;
    function show(i) {
      if (i >= 0 && level < 0) {
        gsap.fromTo(c0.card, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.8)' });
        loops.push(flipTo(c0.year, y0 - 30, y0));
      }
      if (i >= 1 && level < 1) {
        gsap.fromTo(c1.card, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.8)' });
        loops.push(flipTo(c1.year, y0, y1));
        loops.push(gsap.to(q, { scale: 1.15, duration: 0.5, repeat: -1, yoyo: true }));
      }
      if (i >= 2 && level < 2) {
        gsap.to([track, counter], { autoAlpha: 1, duration: 0.3 });
        const o = { y: 0 };
        const tl = gsap.timeline();
        tl.to(o, { y: dt, duration: Math.min(5, dt * 0.22), ease: 'none', onUpdate: () => {
          const pct = (o.y / dt) * 100;
          fill.style.width = pct + '%'; runner.style.left = pct + '%';
          counter.firstChild.textContent = Math.floor(o.y);
          Array.from(ticks.children).forEach((tk, k) => {
            if (!tk.classList.contains('on') && o.y >= Math.min(dt, (k + 1) * 2) - 0.001) { tk.classList.add('on'); gsap.fromTo(tk, { scale: 2 }, { scale: 1, duration: 0.3 }); api.sound.play('pop'); }
          });
        } });
        loops.push(tl);
      }
      if (i >= 3 && level < 3) {
        gsap.fromTo(res1, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45 });
        gsap.fromTo(res2, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.5, ease: 'back.out(2.2)' });
        gsap.fromTo(resNote, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, delay: 1 });
      }
      level = Math.max(level, i);
    }
    return { beat(i) { if (i < level) { /* going back: just keep the finished picture */ return; } show(i); }, destroy: kill };
  });
})();

/* =========================================================
 * core/fx.js — shared visual effects.
 * Responsibility: confetti, toast, count-up, typewriter.
 * Anims & screens call these; fx knows nothing about content.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  // Animation IS the lesson here, so the OS "reduce motion" switch (often off-by-default on school PCs
  // and boards with Windows "animation effects" disabled) does not dim it. Calm motion is an explicit
  // choice in the top bar (store setting `calm`).
  const reduced = () => !!RV.store.setting('calm');

  function confetti(opts) {
    if (reduced()) return;
    const count = (opts && opts.count) || 140;
    const canvas = h('canvas', { class: 'fx-confetti' });
    document.body.appendChild(canvas);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (canvas.width = innerWidth * dpr);
    const H = (canvas.height = innerHeight * dpr);
    const c = canvas.getContext('2d');
    const colors = ['#38bdf8', '#a78bfa', '#facc15', '#34d399', '#f472b6', '#fb923c'];
    const parts = Array.from({ length: count }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.55,
      vx: (Math.random() - 0.5) * 22 * dpr,
      vy: -(Math.random() * 20 + 12) * dpr,
      r: (Math.random() * 6 + 4) * dpr,
      a: Math.random() * Math.PI,
      va: (Math.random() - 0.5) * 0.3,
      col: colors[(Math.random() * colors.length) | 0],
    }));
    let frame = 0;
    (function tick() {
      c.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += 0.6 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        c.save(); c.translate(p.x, p.y); c.rotate(p.a);
        c.fillStyle = p.col; c.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        c.restore();
      });
      if (++frame < 160) requestAnimationFrame(tick);
      else canvas.remove();
    })();
  }

  let toastTimer = null;
  function toast(text, kind) {
    let el = document.querySelector('.fx-toast');
    if (!el) { el = h('div', { class: 'fx-toast', role: 'status' }); document.body.appendChild(el); }
    el.textContent = text;
    el.dataset.kind = kind || 'info';
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function countUp(el, to, opts) {
    const o = Object.assign({ duration: 1, decimals: 0, from: 0, format: null }, opts);
    const fmt = o.format || ((v) => v.toLocaleString('en-US', { maximumFractionDigits: o.decimals }));
    const obj = { v: o.from };
    return gsap.to(obj, { v: to, duration: o.duration, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); } });
  }

  /** Type text into an element character by character. Returns a tween. */
  function typewriter(el, text, opts) {
    const o = Object.assign({ cps: 40 }, opts);
    const obj = { n: 0 };
    el.textContent = '';
    return gsap.to(obj, {
      n: text.length, duration: text.length / o.cps, ease: 'none',
      onUpdate: () => { el.textContent = text.slice(0, Math.round(obj.n)); },
    });
  }

  RV.fx = { confetti, toast, countUp, typewriter, reduced };
})();

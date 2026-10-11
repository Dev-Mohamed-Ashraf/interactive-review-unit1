/* =========================================================
 * core/kit.js — the contract every animation follows.
 *
 *   RV.kit.defineAnim('name', (stage, props, api) => {
 *     ...build DOM inside `stage`, start GSAP tweens...
 *     return { beat(i) { ...jump/animate to beat i... } };
 *   });
 *
 * The kit guarantees cleanup: every tween, timer and listener
 * created through `api` is killed when the step is left.
 * Anims never touch the player, the store, or other anims.
 * ========================================================= */
(function () {
  'use strict';
  const { h, s } = RV.dom;

  function defineAnim(name, setup) {
    RV.anims.add(name, {
      mount(stage, props, baseApi) {
        const disposers = [];
        const pending = new Map(); // beat-scoped timers (see api.after)
        let inBeat = false;
        const api = Object.assign({}, baseApi, {
          h, s, icon: RV.icon, t: RV.i18n.t, ui: RV.i18n.ui, sound: RV.sound, fx: RV.fx, revealText, svgIcon,
          every(ms, fn) { const id = setInterval(fn, ms); disposers.push(() => clearInterval(id)); return id; },
          after(ms, fn) {
            // timers started by a beat belong to that beat: if the next beat comes first they are
            // flushed (run now) so the previous beat completes instead of landing late on top of the new one
            const scoped = inBeat;
            const run = () => { pending.delete(id); const was = inBeat; inBeat = scoped; try { fn(); } finally { inBeat = was; } };
            const id = setTimeout(run, ms);
            if (scoped) pending.set(id, run);
            disposers.push(() => clearTimeout(id));
            return id;
          },
          on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt); disposers.push(() => el.removeEventListener(ev, fn, opt)); },
          /**
           * Shrink-to-fit: scale `inner` down (never up) so ALL of it is visible inside `box`.
           * Text reflows at the wider virtual width, so it shrinks as little as possible.
           * Returns refit(animate) — call it after adding content. Re-fits on resize too.
           */
          fitBox(box, inner, opt) {
            const min = (opt && opt.min) || 0.5;
            let k = 1;
            inner.classList.add('fit-inner');
            box.dataset.fit = '1'; // (autoFit leaves boxes that fit themselves alone)
            function measure(scale) {
              inner.style.width = (100 / scale) + '%';
              return inner.offsetHeight * scale;
            }
            function refit(animate) {
              const cs = getComputedStyle(box);
              const avail = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
              if (avail <= 0) return;
              inner.style.transformOrigin = getComputedStyle(inner).direction === 'rtl' ? 'top right' : 'top left';
              let next = 1;
              for (let i = 0; i < 4 && measure(next) > avail + 1; i++) next = Math.max(min, next * avail / measure(next));
              const natural = measure(next) / next;
              inner.style.marginBottom = -Math.round(natural * (1 - next)) + 'px'; // give back the space the scale-down frees (no phantom scrollbar)
              if (Math.abs(next - k) < 0.005) return;
              k = next;
              gsap.to(inner, { scale: k, duration: animate === false ? 0 : 0.45, ease: 'power2.out', overwrite: 'auto' });
            }
            const ro = new ResizeObserver(() => refit(false));
            ro.observe(box);
            disposers.push(() => ro.disconnect());
            refit(false);
            setTimeout(() => refit(false), 60); // fonts/images may change the size right after mounting
            return refit;
          },
          /** A toolbar of toggle/action buttons floating over the stage. */
          toolbar(buttons) {
            const bar = h('div', { class: 'anim-toolbar' });
            buttons.forEach((b) => {
              const btn = h('button', { class: 'btn btn-sm' + (b.active ? ' is-active' : ''), type: 'button' },
                b.icon ? RV.icon(b.icon) : null, h('span', null, RV.i18n.t(b.label)));
              btn.addEventListener('click', () => {
                if (b.group) bar.querySelectorAll('button').forEach((x) => x.classList.toggle('is-active', x === btn));
                RV.sound.play('tap');
                b.onClick(btn);
              });
              bar.appendChild(btn);
            });
            stage.appendChild(bar);
            return bar;
          },
        });

        stage.classList.add('anim-' + name);
        ambient(stage); // every anim gets a living backdrop (photo/video anims cover it)
        let hooks = {};
        const gctx = gsap.context(() => { hooks = setup(stage, props || {}, api) || {}; }, stage);

        // every HTML layer of the anim is kept fully on screen (see autoFit) — now, after each beat, and on resize
        const fitTimers = [];
        const fitSoon = () => { fitTimers.splice(0).forEach(clearTimeout); autoFit(stage); [80, 500, 1300].forEach((ms) => fitTimers.push(setTimeout(() => autoFit(stage), ms))); };
        const fro = new ResizeObserver(() => autoFit(stage));
        fro.observe(stage);
        fitSoon();

        return {
          beat(i) {
            for (let round = 0; round < 5 && pending.size; round++) {
              [...pending].forEach(([id, run]) => { clearTimeout(id); run(); });
            }
            if (hooks.beat) gctx.add(() => { inBeat = true; try { hooks.beat(i); } finally { inBeat = false; } });
            fitSoon();
          },
          destroy() {
            fro.disconnect();
            fitTimers.forEach(clearTimeout);
            disposers.forEach((d) => d());
            if (hooks.destroy) hooks.destroy();
            gctx.revert();
            gsap.killTweensOf(stage.querySelectorAll('*'));
            stage.classList.remove('anim-' + name);
            RV.dom.clear(stage);
          },
        };
      },
    });
  }

  /**
   * autoFit: the safety net that makes "text cut off at the edge of the animation" impossible.
   * For every absolutely-positioned HTML layer of an anim whose content is bigger than the stage
   * (small phones, long Arabic text, many items), lay it out in a larger virtual box and scale it
   * down with the CSS `scale` property (which never fights GSAP transforms). Never scales up.
   */
  const FIT_SKIP = '.stage-ambient, .anim-toolbar, .lp-frame, .cn-frame, [data-fit], svg, .stage-label';
  function autoFit(stage) {
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    Array.from(stage.children).forEach((w) => {
      if (!(w instanceof HTMLElement) || w.matches(FIT_SKIP)) return;
      if (getComputedStyle(w).position !== 'absolute') return;
      const was = +w.dataset.k || 1;
      if (was !== 1) { w.style.width = w.style.height = w.style.inset = w.style.scale = w.style.transformOrigin = ''; }
      // measure the LAYOUT of the in-flow children (offsets ignore transforms, so a card that is
      // still flying in from below never counts as "overflowing")
      const ext = () => {
        let t = 0, b = 0, l = 0, r = 0, any = false;
        const cs = getComputedStyle(w);
        Array.from(w.children).forEach((c) => {
          if (!(c instanceof HTMLElement) || c.offsetParent !== w) return;
          const p = getComputedStyle(c).position;
          if (p === 'absolute' || p === 'fixed') return;
          if (!any) { t = c.offsetTop; b = c.offsetTop + c.offsetHeight; l = c.offsetLeft; r = c.offsetLeft + c.offsetWidth; any = true; }
          t = Math.min(t, c.offsetTop); b = Math.max(b, c.offsetTop + c.offsetHeight);
          l = Math.min(l, c.offsetLeft); r = Math.max(r, c.offsetLeft + c.offsetWidth);
        });
        if (!any) return null;
        return { h: b - Math.min(t, parseFloat(cs.paddingTop)) + parseFloat(cs.paddingBottom), w: r - Math.min(l, parseFloat(cs.paddingLeft)) + parseFloat(cs.paddingRight), t, l, b, r };
      };
      const ratio = () => {
        const e = ext();
        if (!e) return 1;
        const over = e.b > w.clientHeight + 3 || e.t < -3 || e.l < -3 || e.r > w.clientWidth + 3;
        return over ? Math.min(w.clientHeight / e.h, w.clientWidth / e.w, 1) : 1;
      };
      let q = ratio();
      if (q >= 1) { delete w.dataset.k; return; }
      const rtl = getComputedStyle(w).direction === 'rtl';
      let k = 1;
      for (let n = 0; n < 5 && q < 1 && k > 0.5; n++) {
        k = Math.max(0.5, k * q * 0.99);
        Object.assign(w.style, { inset: rtl ? '0 0 auto auto' : '0 auto auto 0', width: W / k + 'px', height: H / k + 'px', scale: String(k), transformOrigin: rtl ? 'top right' : 'top left' });
        q = ratio();
      }
      w.dataset.k = k.toFixed(3);
    });
  }

  /** A responsive SVG canvas that fills the stage. */
  function svgCanvas(stage, w, hgt, cls) {
    ambient(stage);
    const svg = s('svg', { viewBox: `0 0 ${w} ${hgt}`, class: 'anim-svg ' + (cls || ''), preserveAspectRatio: 'xMidYMid meet' });
    stage.appendChild(svg);
    return svg;
  }

  /** Living backdrop behind SVG scenes: drifting grid + glowing particles (never a dead empty stage). */
  function ambient(stage) {
    if (stage.querySelector(':scope > .stage-ambient')) return;
    const amb = h('div', { class: 'stage-ambient', 'aria-hidden': 'true' }, h('div', { class: 'amb-grid' }), h('div', { class: 'amb-glow' }));
    for (let i = 0; i < 18; i++) {
      const p = h('i', { style: { left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' } });
      amb.appendChild(p);
      gsap.to(p, { y: -60 - Math.random() * 120, x: (Math.random() - 0.5) * 60, opacity: 0, duration: 5 + Math.random() * 6, repeat: -1, delay: Math.random() * 5, ease: 'sine.out' });
    }
    gsap.to(amb.querySelector('.amb-grid'), { backgroundPosition: '0px 48px', duration: 6, repeat: -1, ease: 'none' });
    gsap.to(amb.querySelector('.amb-glow'), { xPercent: 30, yPercent: -20, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    stage.prepend(amb);
  }

  /** Place a 24×24 icon inside an SVG scene at (x, y) with a size. */
  function svgIcon(name, x, y, size, attrs) {
    const k = size / 24;
    const g = s('g', Object.assign({ transform: `translate(${x - size / 2} ${y - size / 2}) scale(${k})`, class: 'svg-ico' }, attrs || {}));
    g.innerHTML = RV.iconMarkup(name);
    return g;
  }

  /** Bilingual text that also shows the other-language term as a small subtitle. */
  function dualLabel(v, cls) {
    return h('span', { class: 'dual ' + (cls || '') },
      h('span', { class: 'dual-main' }, RV.i18n.t(v)),
      RV.i18n.alt(v) ? h('span', { class: 'dual-sub' }, RV.i18n.alt(v)) : null);
  }

  /**
   * Animate text in. Arabic letters are joined, so Arabic is split by WORD;
   * Latin text and numbers are split by CHARACTER.
   */
  function revealText(el, opts) {
    const o = Object.assign({ delay: 0, stagger: null, y: 18 }, opts);
    const arabic = /[؀-ۿ]/.test(el.textContent);
    if (!window.SplitText || RV.fx.reduced()) return gsap.from(el, { opacity: 0, duration: 0.4, delay: o.delay });
    const split = new SplitText(el, { type: arabic ? 'words' : 'words,chars' });
    const targets = arabic ? split.words : split.chars;
    const each = o.stagger || (arabic ? 0.06 : 0.022);
    return gsap.from(targets, {
      y: o.y, opacity: 0, rotateX: arabic ? 0 : -70, // (no per-letter blur: too costly on tablets)
      stagger: { amount: Math.min(1.1, each * targets.length) }, // long texts never take more than ~1 s
      duration: 0.55, ease: 'power3.out', delay: o.delay,
      onComplete: () => split.revert(),
      onInterrupt: () => split.revert(), // if killed mid-way, restore the plain (visible) text
    });
  }

  if (window.gsap) {
    ['SplitText', 'DrawSVGPlugin', 'MotionPathPlugin', 'CustomEase', 'TextPlugin'].forEach((p) => { if (window[p]) gsap.registerPlugin(window[p]); });
    guardFrom();
  }

  /**
   * Safety net for entrance animations (gsap.from / timeline.from).
   * A from() tween animates FROM the given values TO whatever the element shows *right now*.
   * If the student taps "next" while a previous entrance is still half-way, "right now" is a
   * half-transparent state — and the element would stay faded / half-written forever.
   * So before any from(): finish the element's previous (finite) tweens, and if it is still
   * invisible, make it visible — the entrance then always ends fully shown.
   */
  function guardFrom() {
    function prepare(targets, vars) {
      if (!vars || typeof targets === 'function') return;
      let els;
      try { els = gsap.utils.toArray(targets); } catch (e) { return; }
      els.forEach((el) => {
        if (!el || typeof el !== 'object') return;
        gsap.getTweensOf(el).forEach((tw) => {
          if (tw.parent === gsap.globalTimeline && tw.repeat() !== -1 && tw.progress() < 1) tw.progress(1);
        });
      });
      const fades = 'opacity' in vars || 'autoAlpha' in vars;
      if (!fades) return;
      els.forEach((el) => {
        if (el instanceof Element && +gsap.getProperty(el, 'opacity') < 0.05) gsap.set(el, 'autoAlpha' in vars ? { autoAlpha: 1 } : { opacity: 1 });
      });
    }
    const gFrom = gsap.from.bind(gsap);
    gsap.from = function (targets, vars) { prepare(targets, vars); return gFrom(targets, vars); };
    if (!gsap.core || !gsap.core.Timeline) return; // (node test stub)
    const TL = gsap.core.Timeline.prototype;
    const tFrom = TL.from;
    TL.from = function (targets, vars, position) { prepare(targets, vars); return tFrom.call(this, targets, vars, position); };
  }

  RV.kit = { defineAnim, svgCanvas, svgIcon, dualLabel, revealText, autoFit };
})();

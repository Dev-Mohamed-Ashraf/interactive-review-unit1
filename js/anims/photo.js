/* =========================================================
 * anims/photo.js — "living" photographs. No still images anywhere.
 *   hero  : lesson cover — gentle float + parallax + light sweep + particles
 *   photo : any picture with optional hotspot labels revealed per beat
 *     props = { img, caption?, credit?, motion?: 'in'|'out'|'pan', hotspots?: [{ x, y, label, beat, icon }] }
 *     (x, y in % of the IMAGE itself)
 *
 * The WHOLE picture is always visible: the image is fitted inside the
 * stage (object-fit: contain, computed in JS so hotspots stay glued to the
 * picture), and a blurred, slowly drifting copy fills the empty space behind
 * it. Motion never zooms past the safe margin, so nothing is ever cropped.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /** Shared builder: fitted photo + blurred ambient fill + motion + parallax. */
  function livingPhoto(stage, props, api, opts) {
    const { h } = api;
    const bg = h('img', { class: 'lp-bg', src: props.img, alt: '', draggable: 'false', decoding: 'async', 'aria-hidden': 'true' });
    const img = h('img', { class: 'lp-img', src: props.img, alt: '', draggable: 'false', decoding: 'async' });
    const sweep = h('div', { class: 'lp-sweep' });
    const spot = h('div', { class: 'lp-spot' });
    const pic = h('div', { class: 'lp-pic' }, img, sweep, spot);
    const box = h('div', { class: 'lp-box' }, pic);
    const particles = h('div', { class: 'lp-particles' });
    const vignette = h('div', { class: 'lp-vignette' });
    const frame = h('div', { class: 'lp-frame' }, bg, vignette, box, particles);
    stage.appendChild(frame);

    // 0) fit the picture inside the frame (keeps its aspect ratio → never cropped)
    const reserve = props.caption ? 46 : 0; // room for the caption under the picture
    let fitted = false;
    function fit() {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const fw = frame.clientWidth, fh = frame.clientHeight;
      if (!iw || !ih || !fw || !fh) return;
      const m = Math.max(10, Math.min(26, fw * 0.03));
      const k = Math.min((fw - 2 * m) / iw, (fh - 2 * m - reserve) / ih);
      const w = Math.round(iw * k), hh = Math.round(ih * k);
      Object.assign(box.style, { width: w + 'px', height: hh + 'px', left: Math.round((fw - w) / 2) + 'px', top: Math.round((fh - reserve - hh) / 2) + 'px' });
      if (!fitted) { fitted = true; enter(); }
      frame.dispatchEvent(new Event('lp-fit'));
    }
    if (img.complete && img.naturalWidth) setTimeout(fit, 0);
    api.on(img, 'load', fit);
    const ro = new ResizeObserver(() => fit());
    ro.observe(frame);
    const stopRo = () => ro.disconnect();

    // 1) cinematic entrance: the picture unfolds from its centre, then breathes gently
    function enter() {
      gsap.fromTo(pic, { clipPath: 'inset(48% 48% 48% 48% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.1, ease: 'expo.inOut' });
      gsap.fromTo(box, { scale: 0.92, rotateX: 8, opacity: 0 }, { scale: 1, rotateX: 0, opacity: 1, duration: 1.1, ease: 'power3.out' });
      const motion = props.motion || opts.motion || 'in';
      const drift = { in: { scale: 1.03, y: -4 }, out: { scale: 0.985, y: 3 }, pan: { x: 8, y: -3 } }[motion] || { scale: 1.03 };
      gsap.to(img, Object.assign({ duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.1 }, drift));
    }
    // ambient fill behind: slow Ken Burns on the blurred copy (cropping it is fine — it's only light)
    gsap.fromTo(bg, { scale: 1.15, xPercent: -2 }, { scale: 1.3, xPercent: 2, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true });

    // 2) light sweep crossing the photo every few seconds
    gsap.fromTo(sweep, { xPercent: -130 }, { xPercent: 130, duration: 2.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 3.5, delay: 1.2 });

    // 3) floating particles (bokeh)
    const n = opts.particles || 14;
    for (let i = 0; i < n; i++) {
      const p = h('i', { style: { left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', width: 4 + Math.random() * 8 + 'px', height: 4 + Math.random() * 8 + 'px' } });
      particles.appendChild(p);
      gsap.to(p, { y: -40 - Math.random() * 80, x: (Math.random() - 0.5) * 40, opacity: 0, duration: 4 + Math.random() * 5, repeat: -1, delay: Math.random() * 4, ease: 'sine.out' });
    }

    // 4) parallax: pointer on desktop/boards, tilt on phones/tablets (small: the picture stays whole)
    const qx = gsap.quickTo(pic, 'x', { duration: 0.8, ease: 'power3' });
    const qy = gsap.quickTo(pic, 'y', { duration: 0.8, ease: 'power3' });
    const rx = gsap.quickTo(box, 'rotationY', { duration: 0.9, ease: 'power3' });
    const ry = gsap.quickTo(box, 'rotationX', { duration: 0.9, ease: 'power3' });
    const bx = gsap.quickTo(bg, 'x', { duration: 1.2, ease: 'power3' });
    function move(nx, ny) { qx(nx * -6); qy(ny * -5); rx(nx * 4); ry(ny * -3); bx(nx * 24); }
    api.on(stage, 'pointermove', (e) => {
      const b = stage.getBoundingClientRect();
      move((e.clientX - b.left) / b.width - 0.5, (e.clientY - b.top) / b.height - 0.5);
    });
    api.on(stage, 'pointerleave', () => move(0, 0));
    api.on(window, 'deviceorientation', (e) => {
      if (e.gamma == null) return;
      move(Math.max(-1, Math.min(1, e.gamma / 30)) / 2, Math.max(-1, Math.min(1, (e.beta - 45) / 30)) / 2);
    });

    if (props.credit) frame.appendChild(h('div', { class: 'lp-credit' }, '📷 ' + props.credit)); // licence attribution (CC BY-SA)
    if (props.caption) {
      const cap = h('div', { class: 'lp-caption' }, RV.i18n.t(props.caption));
      frame.appendChild(cap);
      gsap.from(cap, { y: 20, opacity: 0, delay: 0.8, duration: 0.6, ease: 'power3.out' });
    }
    return { frame, box, pic, spot, destroy: stopRo };
  }

  K.defineAnim('hero', (stage, props, api) => {
    const lp = livingPhoto(stage, props, api, { motion: 'in', particles: 22 });
    return { destroy: lp.destroy };
  });

  K.defineAnim('photo', (stage, props, api) => {
    const lp = livingPhoto(stage, props, api, { motion: 'out', particles: 10 });
    const hs = (props.hotspots || []).map((spot) => {
      const label = api.h('span', { class: 'hotspot-label' }, RV.i18n.t(spot.label));
      const el = api.h('div', { class: 'hotspot ' + (spot.x > 55 ? 'hs-left' : 'hs-right'), style: { left: spot.x + '%', top: spot.y + '%' } },
        api.h('span', { class: 'hotspot-dot' }, spot.icon ? api.icon(spot.icon) : null), label);
      el.style.opacity = 0;
      lp.box.appendChild(el);
      gsap.to(el.querySelector('.hotspot-dot'), { boxShadow: '0 0 0 14px rgba(56,189,248,0)', duration: 1.3, repeat: -1, ease: 'power1.out' });
      return { el, label, spot, beat: spot.beat || 0 };
    });

    /** Keep every label fully inside the stage (slides it back in if it would stick out). */
    function keepInside(x) {
      gsap.set(x.label, { x: 0 });
      const f = lp.frame.getBoundingClientRect();
      const r = x.label.getBoundingClientRect();
      const pad = 8;
      let dx = 0;
      if (r.left < f.left + pad) dx = f.left + pad - r.left;
      else if (r.right > f.right - pad) dx = f.right - pad - r.right;
      if (dx) gsap.set(x.label, { x: dx });
      // …and never on top of another label: slide down (or up near the bottom) until free
      gsap.set(x.label, { y: 0 });
      for (let tries = 0; tries < 4; tries++) {
        const me = x.label.getBoundingClientRect();
        const hit = hs.find((o) => o !== x && o.el.style.opacity !== '0' && overlap(me, o.label.getBoundingClientRect()));
        if (!hit) break;
        const o = hit.label.getBoundingClientRect();
        const down = o.bottom - me.top + 6, up = me.bottom - o.top + 6;
        const cur = gsap.getProperty(x.label, 'y');
        gsap.set(x.label, { y: me.bottom + down < f.bottom - pad ? cur + down : cur - up });
      }
    }
    function overlap(a, b) { return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom; }
    lp.frame.addEventListener('lp-fit', () => hs.forEach((x) => { if (x.el.style.opacity !== '0') keepInside(x); }));

    /** Spotlight: dim everything except the newest hotspot for a moment, so the eye goes there. */
    function focus(spot) {
      lp.spot.style.setProperty('--sx', spot.x + '%');
      lp.spot.style.setProperty('--sy', spot.y + '%');
      gsap.killTweensOf(lp.spot);
      gsap.timeline().to(lp.spot, { opacity: 1, duration: 0.45, ease: 'power2.out' }).to(lp.spot, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=1.4');
    }

    let lastBeat = -1;
    return {
      beat(i) {
        let newest = null;
        hs.forEach((x) => {
          const show = x.beat <= i;
          if (show && x.el.style.opacity === '0') {
            gsap.set(x.el, { opacity: 1 });
            keepInside(x);
            gsap.fromTo(x.el.children, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, delay: 0.25, ease: 'back.out(2.4)' });
            if (x.beat === i) newest = x.spot;
          } else if (!show) gsap.set(x.el, { opacity: 0 });
        });
        if (newest && i !== lastBeat) focus(newest);
        lastBeat = i;
      },
      destroy: lp.destroy,
    };
  });
})();

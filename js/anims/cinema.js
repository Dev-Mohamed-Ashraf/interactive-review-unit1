/* =========================================================
 * anims/cinema.js — real video footage as a living stage.
 *   props = {
 *     clips: [{ src: 'media/mx-23219.mp4', beat?: 0, title?: bi, sub?: bi, icon? }],
 *              // one clip per beat (montage) — crossfades between two <video> layers;
 *              // the clip whose beat ≤ current beat (closest) is shown
 *     hotspots?: [{ x, y, label: bi, icon, beat }],
 *     tint?: 'blue' | 'violet' | 'green' | 'amber'   (colour grade overlay)
 *   }
 * Each clip's title/sub becomes an animated lower-third card. Poster = same name .jpg.
 * Videos are muted + playsinline so they autoplay on iPhone/iPad.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  K.defineAnim('cinema', (stage, props, api) => {
    const { h } = api;
    const clips = (props.clips || []).map((c, i) => Object.assign({ beat: i }, c));

    function makeVideo() {
      const v = h('video', { class: 'cn-video', muted: true, playsinline: true, loop: true, preload: 'metadata' });
      v.muted = true; v.playsInline = true; v.setAttribute('webkit-playsinline', '');
      return v;
    }
    const layers = [makeVideo(), makeVideo()];
    const mover = h('div', { class: 'cn-move' }, layers);
    const grade = h('div', { class: 'cn-grade cn-' + (props.tint || 'blue') });
    const vignette = h('div', { class: 'lp-vignette' });
    const corners = h('div', { class: 'cn-corners' }, h('i'), h('i'), h('i'), h('i'));
    const rec = h('div', { class: 'cn-rec' }, h('span', { class: 'cn-dot' }), 'LIVE');
    const lower = h('div', { class: 'cn-lower' });
    const bar = h('div', { class: 'cn-progress' }, clips.map(() => h('i')));
    const frame = h('div', { class: 'cn-frame' }, mover, grade, vignette, corners, rec, lower, bar);
    stage.appendChild(frame);

    // gentle camera drift + pointer/tilt parallax
    gsap.fromTo(mover, { scale: 1.06 }, { scale: 1.16, xPercent: -2, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    const qx = gsap.quickTo(mover, 'x', { duration: 0.9, ease: 'power3' });
    const qy = gsap.quickTo(mover, 'y', { duration: 0.9, ease: 'power3' });
    api.on(stage, 'pointermove', (e) => { const b = stage.getBoundingClientRect(); qx(((e.clientX - b.left) / b.width - 0.5) * -24); qy(((e.clientY - b.top) / b.height - 0.5) * -18); });
    api.on(stage, 'pointerleave', () => { qx(0); qy(0); });
    gsap.to(rec.firstChild, { opacity: 0.2, duration: 0.6, repeat: -1, yoyo: true });
    gsap.from(corners.children, { scale: 1.6, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' });

    const hs = (props.hotspots || []).map((spot) => {
      const el = h('div', { class: 'hotspot', style: { left: spot.x + '%', top: spot.y + '%' } },
        h('span', { class: 'hotspot-dot' }, spot.icon ? api.icon(spot.icon) : null),
        h('span', { class: 'hotspot-label' }, api.t(spot.label)));
      el.style.opacity = 0;
      frame.appendChild(el);
      gsap.to(el.querySelector('.hotspot-dot'), { boxShadow: '0 0 0 14px rgba(56,189,248,0)', duration: 1.3, repeat: -1, ease: 'power1.out' });
      return { el, beat: spot.beat || 0 };
    });

    let front = 0;
    let currentClip = -1;
    function play(v) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }

    function showClip(ci) {
      if (ci === currentClip || !clips[ci]) return;
      const c = clips[ci];
      const first = currentClip < 0;
      currentClip = ci;
      const next = layers[first ? front : 1 - front];
      const prev = layers[front];
      next.poster = c.src.replace(/\.mp4$/, '.jpg');
      next.src = RV.perf.video(c.src); // 480p on phones / weak devices
      next.currentTime = 0;
      play(next);
      if (!first) {
        gsap.set(next, { zIndex: 2 }); gsap.set(prev, { zIndex: 1 });
        gsap.fromTo(next, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', onComplete: () => prev.pause() });
        front = 1 - front;
        api.sound.play('whoosh');
      } else {
        gsap.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.8 });
      }
      Array.from(bar.children).forEach((b, k) => b.classList.toggle('on', k <= ci));
      lowerThird(c);
    }

    function lowerThird(c) {
      RV.dom.clear(lower);
      if (!c.title) { lower.style.opacity = 0; return; }
      lower.style.opacity = 1;
      const title = h('b', null, api.t(c.title));
      RV.dom.add(lower, c.icon ? h('span', { class: 'cn-lower-ico' }, api.icon(c.icon)) : null,
        h('div', { class: 'cn-lower-txt' }, title, c.sub ? h('small', null, api.t(c.sub)) : null));
      gsap.fromTo(lower, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out', delay: 0.25, clearProps: 'clipPath' });
      K.revealText(title, { delay: 0.45 });
    }

    // stop decoding when the step is left
    api.on(window, 'pagehide', () => layers.forEach((v) => v.pause()));

    return {
      beat(i) {
        let ci = 0;
        clips.forEach((c, k) => { if (c.beat <= i) ci = k; });
        showClip(ci);
        hs.forEach((x) => {
          const show = x.beat <= i;
          if (show && x.el.style.opacity === '0') { gsap.set(x.el, { opacity: 1 }); gsap.fromTo(x.el.children, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(2.4)' }); }
          else if (!show) gsap.set(x.el, { opacity: 0 });
        });
      },
      destroy() { layers.forEach((v) => { v.pause(); v.removeAttribute('src'); v.load(); }); },
    };
  });
})();

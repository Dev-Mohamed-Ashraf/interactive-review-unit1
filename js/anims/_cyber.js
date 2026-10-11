/* =========================================================
 * anims/_cyber.js — shared SVG building blocks for the chapter-2
 * (cybersecurity) scenes: devices, data packets, links, labels.
 * Not an animation itself — crypto.js / network.js / incident.js use it.
 *   const C = RV.cyberKit(api);
 *   C.node(x, y, 'server', label, 'is-good')   → <g> device with icon + caption
 *   C.packet('كلمة السر', 'is-plain')          → <g> data packet (send it with C.fly)
 *   C.fly(pkt, a, b, { duration })             → tween a packet from point a to point b
 * Everything is positioned with GSAP x/y (never a transform attribute),
 * so later tweens can move it freely.
 * ========================================================= */
(function () {
  'use strict';

  RV.cyberKit = function (api) {
    const { s } = api;
    const t = api.t;

    /** A device / actor: rounded tile with an icon and a caption under it. */
    function node(x, y, icon, label, cls, size) {
      const S = size || 86;
      const g = s('g', { class: 'cy-node ' + (cls || '') });
      g.append(
        s('rect', { x: -S / 2, y: -S / 2, width: S, height: S, rx: S * 0.24, class: 'cy-node-bg' }),
        api.svgIcon(icon, 0, 0, S * 0.5, { class: 'svg-ico cy-node-ico' }));
      if (label) g.appendChild(s('text', { x: 0, y: S / 2 + 24, 'text-anchor': 'middle', class: 'cy-node-lbl' }, t(label)));
      gsap.set(g, { x, y });
      return g;
    }

    /** A data packet: a pill with text. kind: is-plain (readable) · is-cipher · is-bad · is-key. */
    function packet(text, cls) {
      const txt = typeof text === 'string' ? text : t(text);
      const w = Math.max(54, txt.length * 9 + 28);
      const g = s('g', { class: 'cy-packet ' + (cls || '') });
      g.append(s('rect', { x: -w / 2, y: -17, width: w, height: 34, rx: 17 }), s('text', { x: 0, y: 6, 'text-anchor': 'middle' }, txt));
      g.setText = (v) => {
        const nv = typeof v === 'string' ? v : t(v);
        g.lastChild.textContent = nv;
        const nw = Math.max(54, nv.length * 9 + 28);
        g.firstChild.setAttribute('x', -nw / 2); g.firstChild.setAttribute('width', nw);
      };
      gsap.set(g, { x: -200, y: -200, opacity: 0 });
      return g;
    }

    /** Move something from a to b (points {x, y}); returns the tween. */
    function fly(el, a, b, opts) {
      const o = Object.assign({ duration: 1.1, ease: 'power1.inOut' }, opts);
      return gsap.fromTo(el, { x: a.x, y: a.y, opacity: 1 }, Object.assign({ x: b.x, y: b.y }, o));
    }

    /** A straight link between two points. */
    function link(a, b, cls) {
      return s('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'cy-link ' + (cls || '') });
    }

    /** A floating label pill (for "تنصّت!" etc.). */
    function tag(x, y, text, cls) {
      const txt = t(text);
      const w = Math.max(60, txt.length * 9.5 + 30);
      const g = s('g', { class: 'cy-tag ' + (cls || '') });
      g.append(s('rect', { x: -w / 2, y: -19, width: w, height: 38, rx: 12 }), s('text', { x: 0, y: 7, 'text-anchor': 'middle' }, txt));
      gsap.set(g, { x, y });
      return g;
    }

    /** Pop something in (scale from its own centre). */
    function pop(el, delay) {
      return gsap.fromTo(el, { scale: 0.3, opacity: 0, transformOrigin: '50% 50%' }, { scale: 1, opacity: 1, duration: 0.5, delay: delay || 0, ease: 'back.out(2.2)' });
    }

    /** Scramble text into "cipher" symbols (deterministic). */
    function scramble(str) {
      const pool = '#$%&@*!?7Kx9Qz3W§Ψλ';
      return Array.from(str).map((ch, i) => (ch === ' ' ? ' ' : pool[(ch.charCodeAt(0) * 7 + i * 13) % pool.length])).join('');
    }

    /**
     * Big numbered step caption at the top of a scene: "① Eavesdropping…".
     * banner.set(n, text, cls) — n may be '' (no number); cls: '' | 'is-bad' | 'is-good'.
     */
    function banner(svgEl, y, width) {
      const W = width || 760, Y = y || 34;
      const g = s('g', { class: 'cy-banner' });
      const rect = s('rect', { x: 400 - W / 2, y: Y - 26, width: W, height: 52, rx: 16 });
      const dot = s('circle', { cx: 400 + W / 2 - 30, cy: Y, r: 18, class: 'cy-bn-dot' });
      const no = s('text', { x: 400 + W / 2 - 30, y: Y + 8, 'text-anchor': 'middle', class: 'cy-bn-no mono' }, '1');
      const txt = s('text', { x: 400 - 10, y: Y + 8, 'text-anchor': 'middle', class: 'cy-bn-t' }, '');
      g.append(rect, dot, no, txt);
      svgEl.appendChild(g);
      return {
        el: g,
        set(n, text, cls) {
          g.setAttribute('class', 'cy-banner ' + (cls || ''));
          no.textContent = n === '' || n == null ? '★' : String(n);
          txt.textContent = typeof text === 'string' ? text : t(text);
          gsap.fromTo(g, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
          gsap.fromTo(dot, { scale: 0.3, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
        },
      };
    }

    /**
     * A persistent labelled arrow from a to b that DRAWS itself and stays on screen
     * (so the whole sequence of messages remains visible, like a sequence diagram).
     * kind: 'pub' | 'common' | 'ok' | 'bad'. Returns { g, play(delay) → tween }.
     */
    function trail(a, b, label, kind, labelDy) {
      const g = s('g', { class: 'cy-trail-g' });
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len;
      const tip = { x: b.x - ux * 4, y: b.y - uy * 4 };
      const line = s('path', { d: `M${a.x} ${a.y} L${tip.x} ${tip.y}`, class: 'cy-trail ' + kind });
      const head = s('path', { d: `M${b.x} ${b.y} L${b.x - ux * 16 - uy * 9} ${b.y - uy * 16 + ux * 9} L${b.x - ux * 16 + uy * 9} ${b.y - uy * 16 - ux * 9} Z`, class: 'cy-trail-head ' + kind, fill: 'currentColor' });
      const txt = s('text', { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + (labelDy == null ? -12 : labelDy), 'text-anchor': 'middle', class: 'cy-trail-t ' + kind }, label ? t(label) : '');
      g.append(line, head, txt);
      gsap.set(g, { autoAlpha: 0 });
      return {
        g,
        play(delay) {
          const L = len;
          gsap.set(g, { autoAlpha: 1 });
          line.setAttribute('stroke-dasharray', L);
          return gsap.timeline({ delay: delay || 0 })
            .fromTo(line, { strokeDashoffset: L }, { strokeDashoffset: 0, duration: Math.min(1.4, 0.4 + L / 500), ease: 'power2.inOut' })
            .fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .fromTo(txt, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35 }, '<');
        },
        hide() { gsap.set(g, { autoAlpha: 0 }); },
        show() { gsap.set(g, { autoAlpha: 1 }); line.removeAttribute('stroke-dasharray'); gsap.set([head, txt], { opacity: 1 }); },
      };
    }

    /** The same big step caption for HTML scenes. */
    function hbanner() {
      const h = api.h;
      const no = h('span', { class: 'cy-hb-no mono' }, '1');
      const txt = h('b', { class: 'cy-hb-t' }, '');
      const el = h('div', { class: 'cy-hbanner' }, no, txt);
      return {
        el,
        set(n, text, cls) {
          el.className = 'cy-hbanner ' + (cls || '');
          no.textContent = n === '' || n == null ? '★' : String(n);
          txt.textContent = typeof text === 'string' ? text : t(text);
          gsap.fromTo(el, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
          gsap.fromTo(no, { scale: 0.3 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
        },
      };
    }

    return { node, packet, fly, link, tag, pop, scramble, banner, trail, hbanner };
  };
})();

/* =========================================================
 * anims/movie-kit.js — RV.movieKit: the shared shell of the chapter-2
 * teacher-driven "movies" (mfaMovie, networkMovie, incidentMovie), built
 * on the same pattern as httpsMovie:
 *   • a fixed 1920×880 board scaled to the stage (audited layout holds at
 *     every size),
 *   • ONE paused GSAP timeline with a 10 s slot per lesson beat: "Next"
 *     plays one scene, then it FREEZES so the teacher can explain,
 *   • ⟲ replay button + scene dots at the top corners,
 *   • the same male cartoon characters (project rule: men only).
 * ========================================================= */
(function () {
  'use strict';

  /* male cartoon characters (inline SVG) — same drawing as httpsMovie, plus a cap and a headset */
  function person(o) {
    const covered = o.beanie || o.cap;
    const hair = covered ? '' : `<path d="M54 106 Q48 52 100 50 Q152 52 146 106 Q142 80 128 74 Q100 86 72 74 Q58 82 54 106Z" fill="${o.hair}"/>`;
    const beanie = o.beanie ? `<path d="M50 98 Q52 40 100 38 Q148 40 150 98Z" fill="${o.beanie}"/><rect x="46" y="88" width="108" height="16" rx="8" fill="#111827"/>` : '';
    const cap = o.cap ? `<path d="M52 92 Q54 42 100 40 Q146 42 148 92Z" fill="${o.cap}"/><rect x="40" y="84" width="120" height="14" rx="7" fill="#0f172a"/><circle cx="100" cy="64" r="9" fill="#fbbf24"/>` : '';
    const beard = o.beard ? `<path d="M55 112 Q58 168 100 170 Q142 168 145 112 Q140 140 122 146 Q100 136 78 146 Q60 140 55 112Z" fill="${o.beard}"/>` : '';
    const glasses = o.glasses ? '<g fill="none" stroke="#1f2937" stroke-width="3.5"><circle cx="81" cy="110" r="13"/><circle cx="119" cy="110" r="13"/><path d="M94 110 H106"/></g>' : '';
    const shades = o.shades ? '<g fill="#0b0f19"><rect x="64" y="100" width="32" height="20" rx="6"/><rect x="104" y="100" width="32" height="20" rx="6"/><rect x="94" y="106" width="12" height="4"/></g>' : '';
    const headset = o.headset ? '<path d="M50 112 Q50 44 100 44 Q150 44 150 112" fill="none" stroke="#0f172a" stroke-width="7"/><rect x="40" y="100" width="16" height="30" rx="6" fill="#0f172a"/><rect x="144" y="100" width="16" height="30" rx="6" fill="#0f172a"/><path d="M150 126 Q146 150 118 150" fill="none" stroke="#0f172a" stroke-width="4"/>' : '';
    const tie = o.tie ? `<path d="M80 178 L100 204 L120 178Z" fill="#f8fafc"/><path d="M96 190 L104 190 L109 238 L100 250 L91 238Z" fill="${o.tie}"/>` : '';
    const prop = o.laptop ? '<g><rect x="34" y="196" width="132" height="70" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/><circle cx="100" cy="231" r="12" fill="#38bdf8"/></g>' : '';
    return `<svg viewBox="0 0 200 260"><g class="bob">
      <path d="M26 264 Q28 176 100 170 Q172 176 174 264Z" fill="${o.shirt}"/>${tie}
      <rect x="88" y="148" width="24" height="30" rx="8" fill="${o.skin}"/>
      <circle cx="54" cy="112" r="11" fill="${o.skin}"/><circle cx="146" cy="112" r="11" fill="${o.skin}"/>
      <ellipse cx="100" cy="108" rx="46" ry="52" fill="${o.skin}"/>${hair}${beanie}${cap}${beard}
      <g fill="none" stroke="${o.brow}" stroke-width="5" stroke-linecap="round"><path d="M70 94 Q81 88 92 93"/><path d="M108 93 Q119 88 130 94"/></g>
      <g class="eyes"><circle cx="81" cy="110" r="5.5" fill="#111827"/><circle cx="119" cy="110" r="5.5" fill="#111827"/></g>${glasses}${shades}${headset}
      <path d="M100 116 Q96 126 102 128" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3" stroke-linecap="round"/>
      <path class="m-smile" d="${o.smirk ? 'M88 140 Q104 146 116 134' : 'M86 136 Q100 150 114 136'}" fill="none" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round"/>
      <path class="m-sad" d="M86 146 Q100 134 114 146" fill="none" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round" opacity="0"/>${prop}
    </g></svg>`;
  }

  /* the cast (one look per role, reused by every movie) */
  const CAST = {
    user: { skin: '#f1c7a5', hair: '#3b2414', brow: '#3b2414', shirt: '#2563eb', laptop: true },
    userPlain: { skin: '#f1c7a5', hair: '#3b2414', brow: '#3b2414', shirt: '#2563eb' },
    server: { skin: '#d9a87e', hair: '#1f1a17', brow: '#1f1a17', shirt: '#15803d', tie: '#0f172a' },
    hacker: { skin: '#c99b74', beanie: '#18181b', brow: '#18181b', shirt: '#3f3f46', beard: '#292524', shades: true, smirk: true },
    guard: { skin: '#e8b98f', cap: '#1e3a8a', brow: '#6b7280', shirt: '#1e40af', beard: '#4b5563', tie: '#0f172a' },
    visitor: { skin: '#eac09a', hair: '#7c2d12', brow: '#7c2d12', shirt: '#0891b2' },
    it: { skin: '#e0b088', hair: '#111827', brow: '#111827', shirt: '#7c3aed', glasses: true, headset: true },
    clerk: { skin: '#d9a87e', hair: '#57534e', brow: '#44403c', shirt: '#b45309', tie: '#7c2d12', beard: '#57534e' },
  };

  const RACK = (attrs) => `<svg ${attrs || ''} viewBox="0 0 165 430">
      <rect x="4" y="4" width="157" height="422" rx="16" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      ${[26, 122, 218, 314].map((y, k) => `<rect x="18" y="${y}" width="129" height="70" rx="8" fill="#0f172a"/><circle class="led" cx="40" cy="${y + 35}" r="7" fill="${['#34d399', '#38bdf8', '#34d399', '#fbbf24'][k]}"/><rect x="60" y="${y + 30}" width="70" height="10" rx="5" fill="#334155"/>`).join('')}
    </svg>`;
  /* a desktop PC: .scr turns red when infected, .ok / .bad overlays */
  const PC = () => `<svg viewBox="0 0 180 150">
      <rect x="6" y="6" width="168" height="108" rx="12" fill="#1e293b" stroke="#64748b" stroke-width="5"/>
      <rect class="scr" x="18" y="18" width="144" height="84" rx="6" fill="#065f46"/>
      <path class="ok" d="M66 60 l16 16 32 -34" fill="none" stroke="#a7f3d0" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <g class="bad" opacity="0"><path d="M76 56 V46 a14 14 0 0 1 28 0 V56" fill="none" stroke="#fecaca" stroke-width="7"/><rect x="68" y="54" width="44" height="34" rx="6" fill="#fecaca"/></g>
      <rect x="78" y="114" width="24" height="20" fill="#475569"/><rect x="48" y="132" width="84" height="12" rx="6" fill="#64748b"/>
    </svg>`;

  /**
   * RV.movieKit.create(stage, api, { cls, prefix, beats, html, cast: {id: role} })
   * → { board, q, Q, tl, at, IN, POP, OUT, SND, PULSE, L, done() }
   */
  function create(stage, api, o) {
    const { h } = api;
    const L = (ar, en) => api.t({ ar, en });
    const board = h('div', { class: 'hm-board mv-board ' + o.cls });
    board.innerHTML = `<div class="mv-bg"></div><div class="mv-grid"></div>${o.html(L)}<div class="mv-vig"></div>`;
    const P = o.prefix;
    const q = (n) => board.querySelector('#' + P + n);
    const Q = (names) => names.trim().split(/\s+/).map(q);
    Object.keys(o.cast || {}).forEach((id) => { q(id).innerHTML = person(CAST[o.cast[id]]); });

    const wrap = h('div', { class: 'hm-wrap', 'data-fit': '1' }, board);
    const dots = h('div', { class: 'hm-dots' });
    const replay = h('button', { class: 'btn btn-sm hm-replay', type: 'button', title: L('أعد المشهد', 'Replay scene') }, '⟲ ', L('أعد المشهد', 'Replay'));
    stage.append(wrap, replay, dots);
    function fit() {
      const W = stage.clientWidth, H = stage.clientHeight;
      if (!W || !H) return;
      const k = Math.min(W / 1920, H / 880);
      board.style.transform = `translate(${(W - 1920 * k) / 2}px, ${(H - 880 * k) / 2}px) scale(${k})`;
    }
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    fit();

    /* idle life (outside the scene timeline): characters breathe and blink, LEDs flicker */
    const idle = [];
    if (!(RV.fx && RV.fx.reduced && RV.fx.reduced())) {
      board.querySelectorAll('.char').forEach((c, i) => {
        idle.push(gsap.to(c.querySelector('.bob'), { y: -4, duration: 1.5 + i * 0.17, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
        idle.push(gsap.to(c.querySelector('.eyes'), { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: -1, repeatDelay: 2.8 + i * 0.6, ease: 'none' }));
      });
      const leds = board.querySelectorAll('.led');
      if (leds.length) idle.push(gsap.to(leds, { opacity: 0.25, duration: 0.35, stagger: 0.22, yoyo: true, repeat: -1, ease: 'none' }));
      (o.idle || []).forEach((f) => idle.push(f(q)));
    }

    /* the scenes: one paused timeline, a 10 s slot per beat */
    const SLOT = 10, N = o.beats;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out', immediateRender: false } });
    const IN = (els, t, d, from) => tl.fromTo(els, Object.assign({ opacity: 0 }, from || {}),
      Object.assign({ opacity: 1, duration: d || 0.5 }, Object.fromEntries(Object.keys(from || {}).map((k) => [k, /^scale/.test(k) ? 1 : 0]))), t);
    const POP = (els, t, d) => tl.fromTo(els, { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: d || 0.55, ease: 'back.out(1.9)' }, t);
    const OUT = (els, t, d) => tl.to(els, { opacity: 0, duration: d || 0.4 }, t);
    const SND = (name, t) => tl.call(() => api.sound.play(name), null, t);
    const PULSE = (els, t, color, n) => tl.fromTo(els, { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: `0 0 46px ${color}`, duration: 0.45, yoyo: true, repeat: (n || 2) * 2 - 1 }, t);
    const at = (n, k) => n * SLOT + (k || 0);
    for (let n = 1; n < N; n++) tl.addPause(at(n) - 0.05);

    function done() {
      for (let n = 0; n < N; n++) dots.appendChild(h('i'));
      let cur = 0;
      function go(n) {
        cur = Math.max(0, Math.min(N - 1, n));
        dots.querySelectorAll('i').forEach((d, k) => d.classList.toggle('on', k === cur));
        tl.pause();
        tl.seek(at(cur), true);
        tl.play();
      }
      api.on(replay, 'click', () => { api.sound.play('tap'); go(cur); });
      board.__tl = tl; // (QA: the layout audit seeks through every scene)
      return {
        beat(i) { go(i); },
        destroy() { ro.disconnect(); idle.forEach((x) => x.kill()); tl.kill(); },
      };
    }
    return { board, q, Q, tl, at, IN, POP, OUT, SND, PULSE, L, done };
  }

  RV.movieKit = { person, CAST, RACK, PC, create };
})();

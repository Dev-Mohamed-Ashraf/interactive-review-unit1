/* =========================================================
 * anims/movies-1-2.js — lesson 1-2 teacher-driven movies (shell:
 * movie-kit.js; each beat plays, then FREEZES; after it, the parts that
 * mean something keep moving slowly). One visual language for the lesson
 * (css/anims-movies-l12.css):
 *   aiMovie    (station what)  : AI around you → what AI is → narrow AI →
 *                                the nested family AI ⊃ ML ⊃ DL ⊃ GenAI → nested, not parallel
 *   learnMovie (station ml)    : hand-written rules break → labelled data → training →
 *                                the model predicts new e-mails → recommendations → rules vs data
 *   dlMovie    (station dl)    : neuron → neural network → signals & weights → training →
 *                                deep = many layers + huge data → the farmer (rare = errors) → recap
 *   genaiMovie (station genai) : prompt → new content → text/images/audio/code → word by word →
 *                                hallucination → its forms → the school report → exam traps
 * Every position is LOGICAL (inset-inline-start), so each layout mirrors
 * itself in Arabic; pictures with a direction are mirrored inside their SVG.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  if (!MK.CAST.farmer) MK.CAST.farmer = { skin: '#c99b74', cap: '#ca8a04', brow: '#44403c', shirt: '#4d7c0f', beard: '#44403c' };

  /* builders for one movie (ids prefixed with P) */
  function kit(P, rtl) {
    const at = (x, y, w, h) => `inset-inline-start:${x}px;top:${y}px;${w ? `width:${w}px;` : ''}${h ? `height:${h}px;` : ''}`;
    const mir = (W, inner) => (rtl ? `<g transform="translate(${W} 0) scale(-1 1)">${inner}</g>` : inner);
    return {
      at, mir, arrow: rtl ? '←' : '→',
      card: (id, x, y, w, h, c, o) => `<div id="${P}${id}" class="l12u l12-card ${c || ''}${o.row ? ' row' : ''} later" style="${at(x, y, w, h)}">${o.ic ? `<span class="ic">${o.ic}</span>` : ''}${o.row ? '<span class="tx">' : ''}${o.h ? `<span class="h">${o.h}</span>` : ''}${o.p ? `<span class="p">${o.p}</span>` : ''}${o.k ? `<span class="k">${o.k}</span>` : ''}${o.row ? '</span>' : ''}${o.html || ''}</div>`,
      /* chip anchored by its END edge (inset-inline-end) */
      chipE: (id, x, y, txt, c) => `<div id="${P}${id}" class="l12u l12-chip ${c || ''} later" style="inset-inline-end:${x}px;top:${y}px">${txt}</div>`,
      chip: (id, x, y, txt, c, w) => `<div id="${P}${id}" class="l12u l12-chip ${c || ''} later" style="${at(x, y, w)}">${txt}</div>`,
      mid: (id, y, txt, c) => `<div id="${P}${id}" class="l12u l12-chip ${c || ''} later" style="left:0;right:0;margin:auto;width:fit-content;top:${y}px">${txt}</div>`,
      svg: (id, x, y, w, h, vb, inner, c) => `<svg id="${P}${id}" class="l12u l12-svg ${c || ''} later" style="${at(x, y, w, h)}" viewBox="${vb}">${inner}</svg>`,
      big: (id, x, y, w, size, txt, c) => `<div id="${P}${id}" class="l12u l12-big ${c || ''} later" style="${at(x, y, w)}font-size:${size}px">${txt}</div>`,
      txt: (id, x, y, w, txt, c) => `<div id="${P}${id}" class="l12u l12-txt ${c || ''} later" style="${at(x, y, w)}">${txt}</div>`,
      mail: (id, x, y, w, txt, tag, c) => `<div id="${P}${id}" class="l12u l12-mail ${c || ''} later" style="${at(x, y, w)}">${txt}${tag ? `<span class="tg ${tag[0]}">${tag[1]}</span>` : ''}</div>`,
      ch: (id, x, y, size) => `<div id="${P}${id}" class="char ${size || ''} l12u later" style="${at(x, y)}"></div>`,
      flip: (id, x, y, w, h, front, back) => `<div id="${P}${id}" class="l12u l12-flip later" style="${at(x, y, w, h)}"><div class="in"><div class="f">${front}</div><div class="b">${back}</div></div></div>`,
      stamp: (id, x, y, txt, ok) => `<div id="${P}${id}" class="l12u l12-stamp ${ok ? 'ok' : ''} later" style="${at(x, y)}">${txt}</div>`,
    };
  }
  /* a stamp lands (big → its size, tilted) */
  const stampIn = (M, el, t) => M.tl.fromTo(el, { opacity: 0, scale: 2.4, rotation: -8 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.45, ease: 'back.out(1.6)' }, t);
  /* a soft glow (filter: the cards keep their own shadow) — once at t, or travelling along a list forever */
  const glow = (M, els, t, color) => M.tl.fromTo(els, { filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' }, { filter: `drop-shadow(0 0 26px ${color})`, duration: 0.4, yoyo: true, repeat: 1 }, t);
  const glowCycle = (els, color, d) => gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).fromTo(els, { filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' }, { filter: `drop-shadow(0 0 26px ${color})`, duration: d, stagger: d, yoyo: true, repeat: 1, ease: 'sine.inOut' });
  /* a flip card turns to show its answer */
  const flipAt = (M, el, t) => M.tl.fromTo(el.querySelector('.in'), { rotationY: 0 }, { rotationY: 180, duration: 0.8, ease: 'power2.inOut' }, t);

  /* ─────────────── pictures (no text that could be mirrored by mistake) ─────────────── */
  const PHONE = (P) => `<defs><linearGradient id="${P}scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset="1" stop-color="#0f172a"/></linearGradient>
      <radialGradient id="${P}orbg"><stop offset="0" stop-color="#f5d0fe"/><stop offset=".45" stop-color="#a78bfa"/><stop offset="1" stop-color="#4c1d95" stop-opacity="0"/></radialGradient></defs>
    <rect x="6" y="6" width="288" height="568" rx="48" fill="#0b1020" stroke="#64748b" stroke-width="6"/>
    <rect x="22" y="54" width="256" height="472" rx="26" fill="url(#${P}scr)"/><rect x="110" y="24" width="80" height="14" rx="7" fill="#334155"/>
    <circle class="orb" cx="150" cy="240" r="112" fill="url(#${P}orbg)"/>
    <circle class="ring" cx="150" cy="240" r="88" fill="none" stroke="#c4b5fd" stroke-width="4" stroke-dasharray="14 12"/>
    <circle cx="150" cy="240" r="60" fill="#1e1b4b" stroke="#c4b5fd" stroke-width="5"/>
    <text x="150" y="262" text-anchor="middle" font-size="60" font-weight="900" fill="#ede9fe" font-family="Segoe UI, Arial, sans-serif">AI</text>
    ${['#38bdf8', '#fbbf24', '#2dd4bf', '#a78bfa'].map((c, k) => `<rect class="tile" x="${44 + k * 56}" y="404" width="44" height="44" rx="12" fill="${c}"/>`).join('')}
    <rect x="110" y="544" width="80" height="10" rx="5" fill="#475569"/>`;
  const HEAD = (P, B) => `<defs><radialGradient id="${P}hg"><stop offset="0" stop-color="#f0abfc" stop-opacity=".95"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient></defs>
    ${B.mir(380, `<path d="M120 336 L120 268 Q56 246 56 160 Q58 58 172 40 Q272 30 302 120 Q308 140 302 152 L326 200 Q330 212 314 214 L302 216 Q308 254 282 266 Q252 274 232 266 L232 336 Z" fill="#334155" stroke="#64748b" stroke-width="5"/>
      <path d="M60 152 Q50 50 172 34 Q266 26 300 104 Q252 72 202 82 Q142 72 112 122 Q90 142 60 152Z" fill="#1f2937"/>
      <circle class="glow" cx="185" cy="160" r="92" fill="url(#${P}hg)"/>`)}
    <text x="190" y="190" text-anchor="middle" font-size="96">🧠</text>`;
  const ROBOT = (c) => `<line x1="150" y1="20" x2="150" y2="56" stroke="#94a3b8" stroke-width="6"/><circle class="ant" cx="150" cy="18" r="13" fill="${c}"/>
    <rect x="40" y="56" width="220" height="170" rx="40" fill="#e2e8f0" stroke="#94a3b8" stroke-width="5"/>
    <rect x="66" y="82" width="168" height="118" rx="24" fill="#0f172a"/>
    <g class="eyes"><circle cx="118" cy="134" r="16" fill="${c}"/><circle cx="182" cy="134" r="16" fill="${c}"/></g>
    <path d="M120 174 Q150 190 180 174" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="22" y="112" width="20" height="56" rx="8" fill="#94a3b8"/><rect x="258" y="112" width="20" height="56" rx="8" fill="#94a3b8"/>
    <rect x="86" y="228" width="128" height="66" rx="20" fill="${c}" opacity=".85"/>`;
  const MININEST = `${[[10, 10, 540, 400, 80, '#38bdf8'], [70, 84, 420, 316, 64, '#34d399'], [130, 158, 300, 232, 50, '#a78bfa'], [190, 232, 180, 148, 40, '#f472b6']]
    .map(([x, y, w, h, r, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" fill-opacity=".1" stroke="${c}" stroke-width="6"/>`).join('')}
    ${[['AI', 60, '#e0f2fe'], ['ML', 134, '#d1fae5'], ['DL', 208, '#ede9fe'], ['GenAI', 318, '#fce7f3']]
    .map(([t, y, c]) => `<text x="280" y="${y}" text-anchor="middle" font-size="40" font-weight="900" fill="${c}" font-family="Segoe UI, Arial, sans-serif">${t}</text>`).join('')}`;
  const MACHINE = (P, B) => `<defs><linearGradient id="${P}mb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#475569"/><stop offset="1" stop-color="#1e293b"/></linearGradient></defs>
    ${B.mir(360, `<rect x="30" y="20" width="300" height="390" rx="36" fill="url(#${P}mb)" stroke="#94a3b8" stroke-width="5"/>
      <rect x="60" y="50" width="240" height="150" rx="20" fill="#0b1222" stroke="#334155" stroke-width="4"/>
      <rect x="0" y="240" width="44" height="110" rx="10" fill="#0f172a" stroke="#64748b" stroke-width="4"/>
      <rect class="beam" x="46" y="236" width="12" height="118" rx="6" fill="#38bdf8" opacity="0"/>
      <path d="M330 116 L360 104 L360 204 L330 192Z" fill="#0f172a" stroke="#64748b" stroke-width="4"/>
      <circle class="g1" cx="140" cy="300" r="46" fill="none" stroke="#fbbf24" stroke-width="14" stroke-dasharray="14 10"/>
      <circle class="g2" cx="236" cy="288" r="32" fill="none" stroke="#a78bfa" stroke-width="12" stroke-dasharray="10 8"/>
      <circle class="lamp" cx="290" cy="376" r="14" fill="#64748b"/>`)}`;
  const BIN = (fill, stroke) => `<path d="M24 44 L256 44 L234 244 L46 244Z" fill="${fill}" stroke="${stroke}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="10" y="22" width="260" height="30" rx="12" fill="${stroke}"/>`;
  const BELT = (B) => B.mir(1080, `<rect x="0" y="12" width="1080" height="46" rx="23" fill="#1e293b" stroke="#475569" stroke-width="4"/>
    ${range(11).map((k) => `<circle cx="${40 + k * 100}" cy="35" r="13" fill="#334155" stroke="#94a3b8" stroke-width="3"/>`).join('')}
    <path class="mv" d="M24 35 H1056" stroke="#94a3b8" stroke-width="5" stroke-dasharray="26 22" opacity=".7"/>`);
  const GAUGE = (P, B) => `<defs><linearGradient id="${P}gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#10b981"/><stop offset=".5" stop-color="#fbbf24"/><stop offset="1" stop-color="#ef4444"/></linearGradient></defs>
    ${B.mir(560, `<path d="M50 290 A230 230 0 0 1 510 290" fill="none" stroke="url(#${P}gg)" stroke-width="40" stroke-linecap="round"/>
      ${range(11).map((k) => { const a = Math.PI * (1 - k / 10); return `<line x1="${280 + 180 * Math.cos(a)}" y1="${290 - 180 * Math.sin(a)}" x2="${280 + 160 * Math.cos(a)}" y2="${290 - 160 * Math.sin(a)}" stroke="#cbd5e1" stroke-width="4"/>`; }).join('')}
      <g class="nd"><path d="M280 290 L280 96" stroke="#f8fafc" stroke-width="10" stroke-linecap="round"/><circle cx="280" cy="290" r="24" fill="#f8fafc"/><circle cx="280" cy="290" r="10" fill="#334155"/></g>`)}`;
  /* neural network: columns of nodes, every link has a weight (thickness) and a travelling dot */
  function NET(cols, W, H, B, o) {
    o = o || {};
    const R = o.r || 24, xs = cols.map((_, i) => 60 + i * ((W - 120) / (cols.length - 1)));
    const ys = (n) => range(n).map((k) => H / 2 + (k - (n - 1) / 2) * Math.min(96, (H - 70) / Math.max(1, n - 1)));
    let links = '', dots = '', nodes = '';
    cols.forEach((n, i) => {
      if (i < cols.length - 1) ys(n).forEach((y, a) => ys(cols[i + 1]).forEach((y2, b) => {
        const w = 2 + ((a * 7 + b * 3 + i) % 5) * 1.9, w2 = 2 + ((a * 3 + b * 5 + i * 2 + 1) % 5) * 1.9;
        links += `<line class="lk L${i}${w > 7 ? ' thick' : ''}" x1="${xs[i]}" y1="${y}" x2="${xs[i + 1]}" y2="${y2}" stroke="#7dd3fc" stroke-width="${w}" data-w2="${w2}" opacity=".5"/>`;
        dots += `<circle class="pl P${i}" cx="${xs[i]}" cy="${y}" r="8" fill="#fde68a" opacity="0" data-x0="${xs[i]}" data-y0="${y}" data-x1="${xs[i + 1]}" data-y1="${y2}"/>`;
      }));
      ys(n).forEach((y) => { nodes += `<circle class="nd N${i}" cx="${xs[i]}" cy="${y}" r="${R}" fill="${i === 0 ? '#38bdf8' : i === cols.length - 1 ? '#34d399' : '#a78bfa'}" stroke="#e2e8f0" stroke-width="4"/>`; });
    });
    return B.mir(W, links + dots + nodes);
  }
  /* one signal wave through a network svg (forward, or backward in amber = the correction) */
  function wave(T, root, n, t, back) {
    const q = (s) => root.querySelectorAll(s);
    for (let j = 0; j < n; j++) {
      const i = back ? n - 1 - j : j, t0 = t + j * 0.42;
      const from = back ? 1 : 0, to = back ? 0 : 1;
      T.fromTo(q('.P' + i), { attr: { cx: (k, e) => +e.dataset['x' + from], cy: (k, e) => +e.dataset['y' + from] }, opacity: 0, fill: back ? '#fb923c' : '#fde68a' },
        { attr: { cx: (k, e) => +e.dataset['x' + to], cy: (k, e) => +e.dataset['y' + to] }, opacity: 1, duration: 0.42, ease: 'none' }, t0);
      T.to(q('.P' + i), { opacity: 0, duration: 0.08 }, t0 + 0.42);
      T.fromTo(q('.N' + (back ? i : i + 1)), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 0.18, yoyo: true, repeat: 1 }, t0 + 0.36);
    }
    return T;
  }
  const NEURON = (B) => B.mir(560, `<g stroke="#c4b5fd" stroke-width="8" fill="none" stroke-linecap="round" class="den">
      <path d="M118 160 Q80 120 40 110"/><path d="M80 128 Q70 90 82 58"/><path d="M116 198 Q70 222 30 250"/><path d="M70 230 Q58 270 70 302"/><path d="M150 126 Q140 86 110 48"/><path d="M152 236 Q152 276 132 320"/></g>
    <path class="axon" d="M206 180 C300 180 330 180 470 180" stroke="#c4b5fd" stroke-width="10" fill="none"/>
    ${[240, 300, 360, 420].map((x) => `<rect x="${x}" y="167" width="40" height="26" rx="13" fill="#a78bfa"/>`).join('')}
    <path class="term" d="M470 180 L530 130 M470 180 L542 180 M470 180 L530 230" stroke="#c4b5fd" stroke-width="8" stroke-linecap="round" fill="none"/>
    <circle cx="530" cy="130" r="10" fill="#f0abfc"/><circle cx="542" cy="180" r="10" fill="#f0abfc"/><circle cx="530" cy="230" r="10" fill="#f0abfc"/>
    <circle class="soma" cx="150" cy="180" r="56" fill="#7c3aed" stroke="#ddd6fe" stroke-width="6"/><circle cx="150" cy="180" r="20" fill="#ddd6fe"/>
    <circle class="imp" cx="206" cy="180" r="13" fill="#fde68a" opacity="0"/>`);
  const ROAD = (P, B) => `<defs><clipPath id="${P}rc"><rect width="460" height="300" rx="22"/></clipPath>
      <linearGradient id="${P}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#bae6fd"/></linearGradient></defs>
    <g clip-path="url(#${P}rc)">${B.mir(460, `<rect width="460" height="300" fill="url(#${P}sky)"/>
      <rect x="18" y="70" width="70" height="110" fill="#64748b"/><rect x="96" y="40" width="60" height="140" fill="#475569"/><rect x="340" y="90" width="90" height="90" fill="#64748b"/>
      <rect y="176" width="460" height="124" fill="#334155"/>
      ${range(6).map((k) => `<rect x="${130 + k * 38}" y="206" width="22" height="88" fill="#e2e8f0"/>`).join('')}
      <rect x="398" y="70" width="10" height="110" fill="#94a3b8"/><circle cx="403" cy="66" r="14" fill="#fde68a"/>
      <g class="ped"><circle cx="232" cy="122" r="16" fill="#f1c7a5"/><path d="M216 112 Q232 96 248 112Z" fill="#1f2937"/><rect x="220" y="138" width="24" height="46" rx="10" fill="#2563eb"/>
        <path d="M226 182 L214 222 M238 182 L252 222" stroke="#1f2937" stroke-width="8" stroke-linecap="round"/><path d="M222 146 L206 172 M242 146 L258 168" stroke="#f1c7a5" stroke-width="7" stroke-linecap="round"/></g>
      <rect class="det" x="198" y="94" width="70" height="138" rx="8" fill="none" stroke="#34d399" stroke-width="6" stroke-dasharray="14 8" opacity="0"/>`)}</g>
    <rect width="460" height="300" rx="22" fill="none" stroke="#94a3b8" stroke-width="5"/>`;
  const DECK = (P) => `${range(6).map((k) => `<g transform="translate(${60 - k * 10} ${10 + k * 22}) rotate(${(k % 2 ? 1 : -1) * (6 - k)} 150 100)">
      <rect width="300" height="200" rx="18" fill="#0f172a" stroke="#94a3b8" stroke-width="4"/><rect x="14" y="14" width="272" height="110" rx="10" fill="${['#0ea5e9', '#22c55e', '#f59e0b', '#a78bfa', '#38bdf8', '#34d399'][k]}" opacity=".75"/>
      <rect x="14" y="136" width="${120 + k * 20}" height="16" rx="8" fill="#475569"/><rect x="14" y="164" width="90" height="16" rx="8" fill="#334155"/></g>`).join('')}`;
  const LEAF = (fill, spot, vein) => `<svg viewBox="0 0 120 100" width="120" height="100"><path d="M10 90 Q16 12 110 8 Q104 88 10 90Z" fill="${fill}" stroke="#14532d" stroke-width="4"/>
    <path d="M14 86 Q52 52 104 14" stroke="${vein || '#14532d'}" stroke-width="4" fill="none"/>${spot ? `<circle cx="44" cy="54" r="9" fill="${spot}"/><circle cx="70" cy="34" r="7" fill="${spot}"/><circle cx="64" cy="66" r="6" fill="${spot}"/>` : ''}</svg>`;
  const ORB = (P) => `<defs><radialGradient id="${P}og"><stop offset="0" stop-color="#fdf4ff"/><stop offset=".35" stop-color="#e879f9"/><stop offset=".7" stop-color="#7c3aed"/><stop offset="1" stop-color="#4c1d95" stop-opacity="0"/></radialGradient></defs>
    <circle class="halo" cx="150" cy="150" r="148" fill="url(#${P}og)" opacity=".55"/>
    <circle class="r1" cx="150" cy="150" r="118" fill="none" stroke="#f0abfc" stroke-width="5" stroke-dasharray="22 14"/>
    <circle class="r2" cx="150" cy="150" r="94" fill="none" stroke="#a78bfa" stroke-width="5" stroke-dasharray="8 10"/>
    <circle cx="150" cy="150" r="70" fill="#2e1065" stroke="#e9d5ff" stroke-width="5"/>
    <text x="150" y="166" text-anchor="middle" font-size="40" font-weight="900" fill="#fae8ff" font-family="Segoe UI, Arial, sans-serif">GenAI</text>`;
  const SUNSET = (P, B) => `<defs><linearGradient id="${P}ss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset=".55" stop-color="#f97316"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <clipPath id="${P}sc"><rect width="500" height="150" rx="14"/></clipPath></defs>
    <g clip-path="url(#${P}sc)">${B.mir(500, `<rect width="500" height="150" fill="url(#${P}ss)"/><circle class="sun" cx="330" cy="70" r="34" fill="#fef08a"/>
      <path d="M40 112 L100 54 L160 112Z" fill="#b45309"/><path d="M130 112 L176 68 L222 112Z" fill="#92400e"/>
      <rect y="108" width="500" height="42" fill="#1d4ed8"/><path class="wv" d="M0 124 Q25 116 50 124 T100 124 T150 124 T200 124 T250 124 T300 124 T350 124 T400 124 T450 124 T500 124 T550 124" stroke="#93c5fd" stroke-width="4" fill="none"/>
      <path d="M430 108 L430 60 M430 62 Q404 50 392 66 M430 62 Q456 48 466 64 M430 62 Q414 40 400 40 M430 62 Q448 40 462 42" stroke="#14532d" stroke-width="7" fill="none" stroke-linecap="round"/>`)}</g>`;
  const WAVEFORM = (B) => B.mir(500, range(22).map((k) => `<rect class="wb" x="${12 + k * 22}" y="${75 - (14 + ((k * 37) % 50))}" width="12" height="${2 * (14 + ((k * 37) % 50))}" rx="6" fill="#f472b6"/>`).join(''));
  const LINES = (B) => B.mir(500, [470, 420, 300].map((w, k) => `<rect class="ln" x="14" y="${22 + k * 44}" width="${w}" height="22" rx="11" fill="#7dd3fc" opacity=".8"/>`).join(''));
  const DOC = `<path d="M20 10 H270 L330 70 V420 H20Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="5" stroke-linejoin="round"/><path d="M270 10 V70 H330" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="5" stroke-linejoin="round"/>
    <rect x="56" y="60" width="180" height="26" rx="10" fill="#6366f1"/>${range(7).map((k) => `<rect x="56" y="${120 + k * 40}" width="${[240, 220, 236, 180, 230, 200, 140][k]}" height="16" rx="8" fill="#94a3b8"/>`).join('')}`;

  /* ═════════════════════════ aiMovie ═════════════════════════ */
  K.defineAnim('aiMovie', (stage, props, api) => {
    const P = 'ai-', rtl = MK.RTL(), U = MK.ui(P), B = kit(P, rtl);
    const WIRES = [[810, 300, 630, 265], [810, 560, 630, 555], [1110, 300, 1290, 265], [1110, 560, 1290, 555]]
      .map(([x1, y1, x2, y2]) => { const d = `M${x1} ${y1} C${(x1 + x2) / 2} ${y1} ${(x1 + x2) / 2} ${y2} ${x2} ${y2}`; return `<path class="w" d="${d}" fill="none" stroke="#a78bfa" stroke-width="5" opacity=".6"/><path class="wp" d="${d}" fill="none" stroke="#f5d0fe" stroke-width="10" stroke-linecap="round" stroke-dasharray="20 420" opacity="0"/>`; }).join('');
    const M = MK.create(stage, api, { props,
      cls: 'mv-ai mv-l12', prefix: P, beats: 5, cast: { 'ch-st': 'student' },
      html: (L) => `
  <div id="ai-stage" class="mv-stage">
    <svg id="ai-wires" class="l12-svg later" style="left:0;top:0;width:1920px;height:880px" viewBox="0 0 1920 880">${WIRES}</svg>
    ${B.svg('phone', 810, 150, 300, 580, '0 0 300 580', PHONE(P))}
    ${B.card('c1', 110, 190, 520, 150, 'c-blue', { row: true, ic: '✉️', h: L('فلتر الرسائل المزعجة', 'Spam filter'), p: L('بيرتّب إيميلك', 'sorts your e-mail') })}
    ${B.card('c2', 110, 480, 520, 150, 'c-amber', { row: true, ic: '🛒', h: L('توصيات المتجر', 'Store suggestions'), p: L('بيرشّحلك منتجات', 'recommends products') })}
    ${B.card('c3', 1290, 190, 520, 150, 'c-teal', { row: true, ic: '🌐', h: L('تطبيق الترجمة', 'Translation app'), p: L('بيحوّل لغة لتانية', 'turns one language into another') })}
    ${B.card('c4', 1290, 480, 520, 150, 'c-violet', { row: true, ic: '💬', h: 'ChatGPT', p: L('بيولّد نص من طلبك', 'writes text from your prompt') })}

    ${B.svg('head', 130, 150, 380, 340, '0 0 380 340', HEAD(P, B))}
    ${B.svg('bot', 1410, 160, 340, 330, '0 0 300 300', ROBOT('#38bdf8'))}
    ${B.svg('arc', 520, 168, 880, 80, '0 0 880 80', B.mir(880, '<path d="M10 74 Q440 -40 840 70" fill="none" stroke="#c4b5fd" stroke-width="6" stroke-dasharray="16 12"/><path d="M816 46 L850 74 L808 82" fill="none" stroke="#c4b5fd" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'))}
    ${B.mid('cp', 116, '🔁 ' + L('الحاسب بيعيد إنتاج السلوك الذكي أو بينفّذه', 'the computer reproduces or performs intelligent behaviour'), 'c-violet')}
    ${B.chip('k1', 560, 262, '🎓 ' + L('تعلّم', 'learning'), 'c-violet big', 280)}
    ${B.chip('k2', 560, 344, '🧩 ' + L('استدلال', 'reasoning'), 'c-violet big', 280)}
    ${B.chip('k3', 560, 426, '⚖️ ' + L('حكم', 'judgement'), 'c-violet big', 280)}
    ${B.card('def', 130, 540, 1660, 0, 'c-violet', { row: true, ic: '🤖', h: L('الذكاء الاصطناعي (AI)', 'Artificial intelligence (AI)'), p: L('مصطلح عام لتقنيات بتعيد إنتاج أو تنفّذ سلوك إنساني ذكي (تعلّم · استدلال · حكم) على الحاسب', 'a general term for technologies that reproduce or perform intelligent human behaviour (learning · reasoning · judgement) on a computer') })}
    ${B.chip('e1', 170, 714, '🗣️ ' + L('التعرّف على الكلام', 'speech recognition'), 'c-blue', 480)}
    ${B.chip('e2', 720, 714, '🖼️ ' + L('التعرّف على الصور', 'image recognition'), 'c-blue', 480)}
    ${B.chip('e3', 1270, 714, '🌐 ' + L('الترجمة', 'translation'), 'c-blue', 480)}

    ${B.ch('ch-st', 120, 300, 'md')}
    ${B.big('h1', 96, 178, 90, 64, '🗣️', 'drift')}${B.big('h2', 290, 178, 90, 64, '👀', 'drift')}${B.big('h3', 380, 330, 90, 64, '🌐', 'drift')}${B.big('h4', 14, 330, 90, 64, '⚽', 'drift')}
    ${B.chip('hl', 60, 610, '🧑 ' + L('الإنسان: ذكاء عام', 'a human: general intelligence'), 'c-green')}
    ${B.svg('r1', 580, 170, 300, 300, '0 0 300 300', ROBOT('#2dd4bf'))}
    ${B.svg('r2', 1010, 170, 300, 300, '0 0 300 300', ROBOT('#fbbf24'))}
    ${B.svg('r3', 1440, 170, 300, 300, '0 0 300 300', ROBOT('#f472b6'))}
    ${B.chip('rl1', 540, 494, '🌐 ' + L('بيترجم بس', 'translates only'), 'c-teal', 380)}
    ${B.chip('rl2', 970, 494, '🖼️ ' + L('بيتعرّف على الصور بس', 'recognises images only'), 'c-amber', 380)}
    ${B.chip('rl3', 1400, 494, '✉️ ' + L('بيفرز السبام بس', 'sorts spam only'), 'c-pink', 380)}
    ${B.chip('req', 560, 600, '🖼️ ' + L('اتعرّف على الصورة دي!', 'recognise this photo!'), 'c-slate', 340)}
    ${B.big('qm', 680, 196, 100, 120, '❓')}

    <div id="ai-R1" class="l12u l12-ring c-blue later" style="left:200px;top:128px;width:1520px;height:622px"></div>
    <div id="ai-R2" class="l12u l12-ring c-green later" style="left:340px;top:232px;width:1240px;height:506px"></div>
    <div id="ai-R3" class="l12u l12-ring c-violet later" style="left:480px;top:336px;width:960px;height:390px"></div>
    <div id="ai-R4" class="l12u l12-ring c-pink later" style="left:620px;top:440px;width:680px;height:274px"></div>
    ${B.mid('L1', 146, '🤖 ' + L('الذكاء الاصطناعي', 'Artificial intelligence') + ' <bdi class="code">AI</bdi>', 'c-blue solid')}
    ${B.mid('L2', 250, '📚 ' + L('التعلّم الآلي', 'Machine learning') + ' <bdi class="code">ML</bdi>', 'c-green solid')}
    ${B.mid('L3', 354, '🕸️ ' + L('التعلّم العميق', 'Deep learning') + ' <bdi class="code">DL</bdi>', 'c-violet solid')}
    ${B.mid('L4', 458, '✨ ' + L('الذكاء التوليدي', 'Generative AI'), 'c-pink solid')}
    ${B.chip('x1a', 236, 150, '🌐 ' + L('الترجمة', 'translation'), 'c-blue')}
    ${B.chipE('x1b', 236, 150, '📜 ' + L('حتى أنظمة القواعد', 'even rule systems'), 'c-blue')}
    ${B.chip('x2a', 372, 254, '✉️ ' + L('فلتر السبام', 'spam filter'), 'c-green')}
    ${B.chipE('x2b', 372, 254, '🛒 ' + L('التوصيات', 'recommendations'), 'c-green')}
    ${B.chip('x3a', 504, 358, '🚗 ' + L('القيادة الذاتية', 'self-driving'), 'c-violet sm')}
    ${B.chipE('x3b', 504, 358, '🔊 ' + L('التعرف على الكلام', 'speech synthesis'), 'c-violet sm')}
    ${B.chip('x4a', 650, 560, '💬 ChatGPT', 'c-pink sm', 290)}
    ${B.chip('x4b', 960, 560, '🎨 ' + L('توليد الصور', 'image generation'), 'c-pink sm', 310)}
    ${B.mid('x4c', 640, L('بيولّد محتوى جديد', 'creates new content'), 'c-pink')}

    ${[['AI', L('ذكاء اصطناعي', 'AI'), 'c-blue'], ['ML', L('تعلّم آلي', 'machine learning'), 'c-green'], ['DL', L('تعلّم عميق', 'deep learning'), 'c-violet'], ['GenAI', L('توليدي', 'generative'), 'c-pink']]
      .map(([t, n, c], k) => B.card('p' + k, 130 + k * 425, 150, 380, 130, c, { h: `<bdi class="code">${t}</bdi>`, p: n })).join('')}
    ${B.stamp('sx', 560, 196, '✗ ' + L('مش 4 تقنيات منفصلة جنب بعض', 'not 4 separate side-by-side technologies'))}
    ${B.svg('mini', 120, 320, 560, 420, '0 0 560 420', MININEST)}
    ${B.stamp('sok', 470, 668, '✓ ' + L('متداخلة', 'nested'), true)}
    ${B.flip('f1', 760, 330, 1040, 160, `<span class="ic">🤔</span><span>«${L('الذكاء الاصطناعي والتعلّم الآلي نفس المعنى', 'AI and machine learning mean the same')}»؟</span>`,
      `<span class="x">✗</span><span><del>«${L('الذكاء الاصطناعي والتعلّم الآلي نفس المعنى', 'AI and machine learning mean the same')}»</del>${L('غلط!', 'False!')}<small>${L('AI المجال الواسع، والتعلّم الآلي تقنية جوّاه', 'AI is the broad field; ML is one technology inside it')}</small></span>`)}
    ${B.flip('f2', 760, 530, 1040, 160, `<span class="ic">🤔</span><span>«${L('التعلّم العميق تقنية منفصلة عن التعلّم الآلي', 'Deep learning is separate from machine learning')}»؟</span>`,
      `<span class="x">✗</span><span><del>«${L('التعلّم العميق تقنية منفصلة عن التعلّم الآلي', 'Deep learning is separate from machine learning')}»</del>${L('غلط!', 'False!')}<small>${L('التعلّم العميق نوع متقدّم جوّه التعلّم الآلي', 'deep learning is an advanced kind inside machine learning')}</small></span>`)}

    ${U.hd(0, '📱 ' + L('الذكاء الاصطناعي شغّال حواليك', 'AI is at work all around you'))}
    ${U.hd(1, '🧠 ' + L('يعني إيه ذكاء اصطناعي؟', 'What is artificial intelligence?'))}
    ${U.hd(2, '🎯 ' + L('ذكاء النهارده «ضيّق»', 'Today’s AI is “narrow”'))}
    ${U.hd(3, '⭕ ' + L('عيلة واحدة… كل دايرة جوّه اللي قبلها', 'One family… each circle inside the last'))}
    ${U.hd(4, '⚠️ ' + L('متداخلة… مش متوازية!', 'Nested… not parallel!'))}
    ${U.nt(0, '🤔 ' + L('كلهم ذكاء اصطناعي… بس مش من نفس النوع!', 'All of them are AI… but not the same kind!'), 'warn')}
    ${U.nt(2, L('كل AI النهارده بارع في مهمة واحدة — مش ذكاء عام يعمل كل حاجة زي الإنسان', 'Every AI today is expert at ONE task — not a general intelligence like a human'), 'warn')}
    ${U.nt(3, '<bdi class="code">AI ⊃ ML ⊃ DL ⊃ GenAI</bdi> — ' + L('من الأوسع للأكثر تخصصًا', 'from the broadest to the most specialised'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;

    /* 0 — AI is all around you */
    let c = at(0);
    frame(0, c, 6.4);
    tl.fromTo(q('phone'), { opacity: 0, y: 70, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, c + 0.3); SND('whoosh', c + 0.3);
    tl.fromTo(all('#ai-phone .orb'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.7, ease: 'back.out(2)' }, c + 1.0);
    tl.fromTo(all('#ai-phone .tile'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(2)' }, c + 1.2);
    IN(q('wires'), c + 1.7, 0.1);
    tl.fromTo(all('#ai-wires .w'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.12 }, c + 1.7);
    Q('c1 c2 c3 c4').forEach((el, i) => {
      const s = i < 2 ? 1 : -1;
      tl.fromTo(el, { opacity: 0, x: 220 * sx * s, scale: 0.5 }, { opacity: 1, x: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }, c + 2.4 + i * 0.6);
      SND('pop', c + 2.4 + i * 0.6);
    });
    glow(M, Q('c1 c2 c3 c4'), c + 5.2, 'rgba(196,181,253,.95)');

    /* 1 — what AI is */
    c = at(1);
    frame(1, c);
    OUT(Q('phone wires c1 c2 c3 c4'), c, 0.4);
    IN(q('head'), c + 0.5, 0.6, { x: -60 * sx });
    IN(q('bot'), c + 0.7, 0.6, { x: 60 * sx });
    Q('k1 k2 k3').forEach((k, i) => { POP(k, c + 1.4 + i * 0.35, 0.4); SND('pop', c + 1.4 + i * 0.35); });
    IN(q('arc'), c + 2.5, 0.1); tl.fromTo(all('#ai-arc path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8 }, c + 2.5);
    IN(q('cp'), c + 2.7, 0.4, { y: -16 });
    Q('k1 k2 k3').forEach((k, i) => tl.to(k, { x: 540 * sx, duration: 1.0, ease: 'power2.inOut' }, c + 3.3 + i * 0.25));
    tl.to(all('#ai-bot .eyes circle'), { attr: { fill: '#fde68a' }, duration: 0.3 }, c + 4.4);
    M.PULSE(q('k3'), c + 4.4, 'rgba(250,204,21,.8)', 1);
    IN(q('def'), c + 4.9, 0.5, { y: 30 }); SND('ok', c + 4.9);
    Q('e1 e2 e3').forEach((e, i) => IN(e, c + 5.9 + i * 0.4, 0.4, { y: 20 }));

    /* 2 — narrow AI */
    c = at(2);
    frame(2, c, 7.0);
    OUT(Q('head bot k1 k2 k3 arc cp def e1 e2 e3'), c, 0.4);
    IN(q('ch-st'), c + 0.5, 0.6, { x: -70 * sx });
    Q('h1 h2 h3 h4').forEach((e, i) => POP(e, c + 1.0 + i * 0.25, 0.4));
    IN(q('hl'), c + 1.8, 0.4, { y: 16 });
    Q('r1 r2 r3').forEach((r, i) => { POP(r, c + 2.3 + i * 0.35, 0.5); SND('pop', c + 2.3 + i * 0.35); });
    Q('rl1 rl2 rl3').forEach((r, i) => IN(r, c + 2.7 + i * 0.35, 0.4, { y: 16 }));
    IN(q('req'), c + 4.2, 0.4, { y: 20 });
    tl.to(q('req'), { y: -330, scale: 0.4, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 5.0);
    M.shake(q('r1'), c + 5.8, 9); POP(q('qm'), c + 5.8, 0.5); SND('bad', c + 5.8);

    /* 3 — the nested family */
    c = at(3);
    frame(3, c, 7.6);
    OUT(Q('ch-st h1 h2 h3 h4 hl r1 r2 r3 rl1 rl2 rl3 qm'), c, 0.4);
    const RINGS = [['R1', 'L1', 'x1a x1b'], ['R2', 'L2', 'x2a x2b'], ['R3', 'L3', 'x3a x3b'], ['R4', 'L4', 'x4a x4b x4c']];
    RINGS.forEach(([r, l, xs], i) => {
      const t = c + 0.6 + i * 1.65;
      tl.fromTo(q(r), { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, t);
      POP(q(l), t + 0.35, 0.45); SND('pop', t + 0.35);
      Q(xs).forEach((x, j) => IN(x, t + 0.75 + j * 0.2, 0.4, { y: 14 }));
    });

    /* 4 — nested, not parallel + traps */
    c = at(4);
    frame(4, c);
    OUT(Q('R1 R2 R3 R4 L1 L2 L3 L4 x1a x1b x2a x2b x3a x3b x4a x4b x4c'), c, 0.4);
    Q('p0 p1 p2 p3').forEach((p, i) => IN(p, c + 0.5 + i * 0.25, 0.45, { y: 30 }));
    stampIn(M, q('sx'), c + 1.9); SND('bad', c + 1.9);
    OUT(q('sx'), c + 3.0, 0.3);
    Q('p0 p1 p2 p3').forEach((p, i) => tl.to(p, { x: (400 - (130 + i * 425 + 190)) * sx, y: 380 + i * 30, scale: 0.25, opacity: 0, duration: 0.7, ease: 'power2.in' }, c + 3.1 + i * 0.12));
    IN(q('mini'), c + 3.8, 0.6, { scale: 0.8 });
    stampIn(M, q('sok'), c + 4.5); SND('ok', c + 4.5);
    IN(q('f1'), c + 5.0, 0.5, { x: 60 * sx }); IN(q('f2'), c + 5.3, 0.5, { x: 60 * sx });
    flipAt(M, q('f1'), c + 6.2); SND('bad', c + 6.5);
    flipAt(M, q('f2'), c + 7.4); SND('bad', c + 7.7);

    /* living loops */
    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1 }).fromTo(all('#ai-wires .wp'), { opacity: 1, strokeDashoffset: 0 }, { strokeDashoffset: -230, duration: 1.3, ease: 'none', stagger: 0.33 }));
    M.loop(0, 6.0, () => M.breathe(all('#ai-phone .orb'), 1.12, 1.3));
    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1 }).to(all('#ai-phone .ring'), { rotation: 360, svgOrigin: '150 240', duration: 8, ease: 'none' }));
    M.loop(1, 6.8, () => M.breathe(all('#ai-head .glow'), 1.15, 1.4));
    M.loop(1, 6.8, () => M.bob(Q('k1 k2 k3'), 6, 1.3));
    M.loop(1, 6.8, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#ai-bot .ant'), { attr: { fill: '#fde68a' }, duration: 0.6 }));
    M.loop(2, 6.6, () => M.bob(Q('h1 h2 h3 h4'), 9, 1.4));
    M.loop(2, 6.6, () => gsap.timeline({ repeat: -1, repeatDelay: 1.6 }).fromTo(q('r1'), { rotation: 0 }, { rotation: 5, duration: 0.12, yoyo: true, repeat: 5, transformOrigin: '50% 90%' }));
    M.loop(2, 6.6, () => M.breathe(q('qm'), 1.15, 0.9));
    M.loop(3, 7.4, () => glowCycle(Q('R1 R2 R3 R4'), 'rgba(255,255,255,.8)', 0.6));
    M.loop(4, 8.4, () => M.breathe(q('mini'), 1.03, 1.6));
    return M.done();
  });

  /* ═════════════════════════ mlMovie ═════════════════════════ */
  K.defineAnim('learnMovie', (stage, props, api) => {
    const P = 'ml-', rtl = MK.RTL(), U = MK.ui(P), B = kit(P, rtl);
    const M = MK.create(stage, api, { props,
      cls: 'mv-ml mv-l12', prefix: P, beats: 6, cast: { 'ch-pg': 'engineer', 'ch-hk': 'hacker' },
      html: (L) => {
        const DATA = [['💰', L('فلوس ببلاش', 'free money'), 1], ['📚', L('واجب بكرة', 'homework due'), 0], ['🎁', L('جايزة ليك', 'a prize for you'), 1],
          ['⚽', L('ماتش بكرة', 'match tomorrow'), 0], ['💸', L('اكسب فلوس', 'earn cash'), 1], ['👨‍🏫', L('الحصة اتأجلت', 'class moved'), 0],
          ['🏆', L('كسبت جايزة', 'you won'), 1], ['📅', L('جدول الحصص', 'timetable'), 0], ['🔥', L('عرض النهارده', 'today’s deal'), 1]];
        const SP = ['s', L('سبام', 'spam')], OK = ['o', L('سليم', 'OK')], NEW = ['n', L('جديد', 'new')];
        const row = (w, p, cls, tag) => `<div class="l12-pr"><b>${w}</b><span class="l12-bar ${cls}"><i data-w="${p}" style="width:${p}%"></i></span><em>${tag}</em></div>`;
        return `
  <div id="ml-stage" class="mv-stage">
    ${B.svg('belt', 80, 598, 1080, 70, '0 0 1080 70', BELT(B))}
    ${B.svg('mc', 1150, 250, 360, 420, '0 0 360 420', MACHINE(P, B))}
    ${B.svg('binS', 1600, 166, 280, 250, '0 0 280 250', BIN('rgba(127,29,29,.55)', '#ef4444'))}
    ${B.svg('binO', 1600, 470, 280, 250, '0 0 280 250', BIN('rgba(6,78,59,.55)', '#10b981'))}
    ${B.chip('lbS', 1620, 270, '🚫 ' + L('سبام', 'spam'), 'c-red', 240)}
    ${B.chip('lbO', 1620, 574, '✅ ' + L('سليم', 'OK'), 'c-green', 240)}
    ${B.big('scrR', 1210, 312, 240, 92, '📜')}${B.big('scrB', 1210, 312, 240, 92, '🧠')}
    ${B.big('fly', 1490, 360, 80, 60, '✉️')}

    ${B.ch('ch-pg', 90, 140, 'sm')}
    ${B.card('rule', 300, 150, 620, 0, 'c-amber', { row: true, ic: '📜', h: L('قاعدة كتبها المبرمج بإيده', 'A rule the programmer wrote by hand'), p: L('لو الإيميل فيه', 'if the e-mail contains') + ' «<bdi class="code">free</bdi>» ← ' + L('سبام', 'spam') })}
    ${B.mail('m1', 100, 510, 330, '🎁 <bdi class="code">free gift</bdi>')}
    ${B.mail('m2', 100, 510, 330, '🎁 <bdi class="code">fr€e gift</bdi>')}
    ${B.stamp('brk', 330, 352, '😬 ' + L('عدّى! القاعدة اتكسرت', 'It got through! The rule broke'))}
    ${B.ch('ch-hk', 950, 128, 'sm')}

    ${DATA.map(([e, t, s], k) => B.mail('d' + k, 268 + (k % 3) * 295, 140 + Math.floor(k / 3) * 92, 287, t, s ? SP : OK, 'mini')).join('')}
    ${B.chip('dlb', 280, 430, '🗂️ ' + L('بيانات متعلّم عليها: كل إيميل ومعاه الإجابة الصح', 'labelled data: every e-mail with its right answer'), 'c-amber')}

    ${B.card('pat', 110, 140, 990, 410, 'c-violet', { h: '🔍 ' + L('الأنماط اللي اكتشفها بنفسه', 'The patterns it found by itself'),
      html: row('«' + L('فلوس ببلاش', 'free money') + '»', 92, 's', L('سبام', 'spam')) + row('«' + L('جايزة', 'prize') + '»', 85, 's', L('سبام', 'spam')) + row('«' + L('واجب · حصة', 'homework · class') + '»', 90, 'o', L('سليم', 'OK')) })}
    ${B.chip('mdl', 1190, 180, '🧠 ' + L('النموذج', 'the model'), 'c-violet solid big', 280)}

    ${B.svg('gau', 300, 118, 560, 320, '0 0 560 320', GAUGE(P, B))}
    ${B.chip('gO', 296, 440, '✅ ' + L('سليم', 'OK'), 'c-green', 190)}
    ${B.chip('gS', 674, 440, '🚫 ' + L('سبام', 'spam'), 'c-red', 190)}
    ${B.big('gv1', 880, 250, 230, 76, '<bdi>94%</bdi>', 'l12-red')}${B.big('gv2', 880, 250, 230, 76, '<bdi>6%</bdi>', 'l12-green')}
    ${B.mail('nm1', 100, 510, 470, '🎉 ' + L('مبروك! كسبت فلوس', 'You won money!'), NEW)}
    ${B.mail('nm2', 100, 510, 470, '📅 ' + L('ميعاد الدرس اتغيّر', 'Class time changed'), NEW)}

    ${B.card('hist', 100, 140, 1000, 300, 'c-amber', { h: '🛒 ' + L('مشترياتك القديمة', 'Your past purchases'),
      html: `<div class="l12-tiles">${[['⚽', L('كورة', 'ball')], ['👟', L('جزمة رياضي', 'trainers')], ['🧢', L('كاب', 'cap')], ['🥤', L('زمزمية', 'bottle')]].map(([e, t]) => `<span><b>${e}</b>${t}</span>`).join('')}</div>` })}
    ${B.big('pk', 1040, 250, 90, 64, '🛒')}
    ${B.card('rec', 1560, 220, 330, 360, 'c-green', { ic: '🧤', h: L('جوانتي حارس', 'Goalkeeper gloves'), p: L('ناس اشترت زيّك اشترته', 'people like you bought it'), k: '✨ ' + L('مرشّحلك', 'for you') })}
    ${B.card('same', 100, 480, 1010, 0, 'c-blue', { row: true, ic: '🤝', h: L('السبام والتوصيات: شغل مختلف… وفكرة واحدة', 'Spam & recommendations: different jobs… one idea'), p: L('بيتعلّموا أنماط من بيانات قديمة ← ويتنبّأوا بحاجة جديدة', 'they learn patterns from past data → and predict something new') })}

    ${U.hd(0, '📜 ' + L('الطريقة القديمة: قواعد مكتوبة بالإيد', 'The old way: hand-written rules'))}
    ${U.hd(1, '📚 ' + L('الطريقة الجديدة: نعلّمه بالأمثلة', 'The new way: teach it with examples'))}
    ${U.hd(2, '⚙️ ' + L('التدريب: بيكتشف الأنماط بنفسه', 'Training: it finds the patterns itself'))}
    ${U.hd(3, '🔮 ' + L('التنبؤ: إيميلات عمره ما شافها', 'Prediction: e-mails it has never seen'))}
    ${U.hd(4, '🛒 ' + L('نفس الفكرة: توصية المنتجات', 'Same idea: product recommendations'))}
    ${U.nt(0, L('القواعد ثابتة: حيلة صغيرة تكسرها… ومستحيل تكتب قاعدة لكل حالة', 'Rules are fixed: one small trick breaks them… and you can’t write a rule for everything'), 'warn')}
    ${U.nt(2, L('محدش كتب له القاعدة — هو اللي استنتجها من البيانات، وطلع «النموذج»', 'Nobody wrote the rule — it worked it out from the data, and out came “the model”'), 'ok')}
    ${U.nt(3, L('التعلّم الآلي = يتعلّم أنماط من البيانات عشان يتنبّأ ويحكم على الجديد', 'Machine learning = learning patterns from data to predict and judge new things'), 'ok')}
    ${U.nt(4, L('الاتنين تعلّم آلي — مش قواعد مكتوبة بإيد المبرمج', 'Both are machine learning — not rules written by a programmer'), 'ok')}
  </div>
  <div id="ml-recap" class="mv-recap">
    ${U.hd(5, '📌 ' + L('الخلاصة: قواعد ثابتة ولا تعلّم من البيانات؟', 'Recap: fixed rules or learning from data?'))}
    ${B.card('rA', 110, 140, 820, 410, 'c-red', { ic: '📜', h: L('قواعد مكتوبة بالإيد', 'Hand-written rules'),
      html: `<ul class="l12-list"><li>✍️ ${L('المبرمج يكتب كل قاعدة', 'the programmer writes every rule')}</li><li>🧱 ${L('ثابتة — مابتتعلّمش لوحدها', 'fixed — they never learn')}</li><li>💥 ${L('أي حالة جديدة تكسرها', 'anything new breaks them')}</li></ul>` })}
    ${B.card('rB', 990, 140, 820, 410, 'c-green', { ic: '📚', h: L('التعلّم الآلي: قواعد متعلّمة من البيانات', 'Machine learning: rules learned from data'),
      html: `<ul class="l12-list"><li>🔍 ${L('بيكتشف الأنماط بنفسه', 'finds the patterns itself')}</li><li>🔮 ${L('بيتنبّأ ويحكم على الجديد', 'predicts and judges new things')}</li><li>✉️ ${L('أمثلة: فلتر السبام · التوصيات', 'e.g. spam filter · recommendations')}</li></ul>` })}
    ${[['📊', L('بيانات', 'data')], ['⚙️', L('تدريب', 'training')], ['🧠', L('نموذج', 'model')], ['🔮', L('تنبؤ', 'prediction')]]
      .map(([e, t], k) => B.chip('f' + k, 190 + k * 410, 600, e + ' ' + t, 'c-violet big', 300)).join('')}
    ${range(3).map((k) => B.big('a' + k, 500 + k * 410, 598, 90, 60, B.arrow, 'l12-gold')).join('')}
  </div>`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const mc = (s) => all('#ml-mc ' + s);
    /* an e-mail rides the belt into the machine, gets scanned, and the result flies to a bin */
    const ride = (el, t, w) => {
      IN(el, t, 0.3);
      tl.to(el, { x: (1180 - 100 - w) * sx, duration: 1.3, ease: 'power1.inOut' }, t + 0.2);
      tl.to(el, { scale: 0.5, opacity: 0, duration: 0.25 }, t + 1.5);
      tl.fromTo(mc('.beam'), { opacity: 0 }, { opacity: 0.9, duration: 0.15, yoyo: true, repeat: 3 }, t + 1.5);
      SND('tap', t + 1.5);
    };
    const toBin = (t, spam) => {
      tl.fromTo(q('fly'), { opacity: 0, x: 0, y: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2 }, t);
      tl.to(q('fly'), { x: 220 * sx, y: spam ? -90 : 210, duration: 0.6, ease: 'power2.in' }, t + 0.2);
      tl.to(q('fly'), { opacity: 0, scale: 0.4, duration: 0.15 }, t + 0.8);
      tl.fromTo(q(spam ? 'binS' : 'binO'), { scale: 1, transformOrigin: '50% 100%' }, { scale: 1.08, duration: 0.15, yoyo: true, repeat: 1 }, t + 0.8);
    };

    /* 0 — hand-written rules break */
    let c = at(0);
    frame(0, c, 8.5);
    IN(Q('belt mc binS binO lbS lbO'), c + 0.2, 0.5, { y: 20 });
    IN(q('ch-pg'), c + 0.4, 0.5, { x: -60 * sx });
    IN(q('rule'), c + 0.8, 0.5, { y: -20 });
    tl.fromTo(q('scrR'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, c + 1.4); SND('pop', c + 1.4);
    ride(q('m1'), c + 1.9, 330);
    tl.to(mc('.lamp'), { attr: { fill: '#ef4444' }, duration: 0.1 }, c + 3.5);
    toBin(c + 3.6, true); SND('ok', c + 4.4);
    tl.to(mc('.lamp'), { attr: { fill: '#64748b' }, duration: 0.1 }, c + 4.6);
    ride(q('m2'), c + 4.7, 330);
    tl.to(mc('.lamp'), { attr: { fill: '#10b981' }, duration: 0.1 }, c + 6.3);
    toBin(c + 6.4, false);
    tl.to(q('binO'), { filter: 'drop-shadow(0 0 26px #ef4444)', duration: 0.2, yoyo: true, repeat: 3 }, c + 7.2);
    stampIn(M, q('brk'), c + 7.3); SND('bad', c + 7.3);
    IN(q('ch-hk'), c + 7.8, 0.5, { y: -20 });

    /* 1 — labelled data */
    c = at(1);
    frame(1, c);
    OUT(Q('rule brk ch-hk scrR m1 m2'), c, 0.4);
    tl.to(mc('.lamp'), { attr: { fill: '#64748b' }, duration: 0.1 }, c);
    range(9).forEach((k) => { tl.fromTo(q('d' + k), { opacity: 0, y: -50, rotation: (k % 2 ? 6 : -6) }, { opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: 'back.out(1.6)' }, c + 0.6 + k * 0.22); });
    SND('pop', c + 0.6); SND('pop', c + 1.5);
    IN(q('dlb'), c + 3.0, 0.5, { y: 20 });
    M.PULSE(all('#ml-stage .l12-mail .tg'), c + 3.9, 'rgba(255,255,255,.7)', 1);

    /* 2 — training → the model */
    c = at(2);
    frame(2, c, 7.4);
    OUT(Q('dlb ch-pg'), c, 0.3);
    range(9).forEach((k) => {
      const cx = 268 + (k % 3) * 295 + 143, cy = 140 + Math.floor(k / 3) * 92 + 39;
      tl.to(q('d' + k), { x: (1330 - cx) * sx, y: 270 - cy, scale: 0.25, opacity: 0, duration: 0.55, ease: 'power2.in' }, c + 0.4 + k * 0.13);
    });
    SND('whoosh', c + 0.4);
    tl.fromTo(mc('.g1'), { rotation: 0, svgOrigin: '140 300' }, { rotation: 360, svgOrigin: '140 300', duration: 1.1, repeat: 3, ease: 'none' }, c + 1.0);
    tl.fromTo(mc('.g2'), { rotation: 0, svgOrigin: '236 288' }, { rotation: -360, svgOrigin: '236 288', duration: 0.9, repeat: 4, ease: 'none' }, c + 1.0);
    tl.to(mc('.lamp'), { attr: { fill: '#fbbf24' }, duration: 0.2, yoyo: true, repeat: 7 }, c + 1.0);
    IN(q('pat'), c + 2.0, 0.5, { y: 30 });
    tl.fromTo(all('#ml-pat .l12-bar i'), { width: '0%' }, { width: (k, e) => e.dataset.w + '%', duration: 0.8, stagger: 0.55, ease: 'power2.out' }, c + 2.6);
    SND('pop', c + 2.6); SND('pop', c + 3.15); SND('pop', c + 3.7);
    tl.fromTo(q('scrB'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, c + 5.6);
    POP(q('mdl'), c + 5.8, 0.5); SND('ok', c + 5.8);
    tl.to(mc('.lamp'), { attr: { fill: '#a78bfa' }, duration: 0.2 }, c + 5.8);

    /* 3 — predictions on new e-mails */
    c = at(3);
    frame(3, c, 8.3);
    OUT(q('pat'), c, 0.4);
    IN(Q('gau gO gS'), c + 0.4, 0.5, { y: 20 });
    tl.set(mc('.lamp'), { attr: { fill: '#64748b' } }, c);
    const ND = all('#ml-gau .nd');
    tl.fromTo(ND, { rotation: -90, svgOrigin: '280 290' }, { rotation: -90, svgOrigin: '280 290', duration: 0.01 }, c + 0.4);
    ride(q('nm1'), c + 1.0, 470);
    tl.to(ND, { rotation: 79, svgOrigin: '280 290', duration: 1.0, ease: 'elastic.out(1, 0.5)' }, c + 2.6);
    POP(q('gv1'), c + 3.0, 0.4); SND('bad', c + 3.0);
    toBin(c + 3.4, true);
    OUT(q('gv1'), c + 4.4, 0.3);
    ride(q('nm2'), c + 4.6, 470);
    tl.to(ND, { rotation: -79, svgOrigin: '280 290', duration: 1.0, ease: 'elastic.out(1, 0.5)' }, c + 6.2);
    POP(q('gv2'), c + 6.6, 0.4); SND('ok', c + 6.6);
    toBin(c + 7.0, false);

    /* 4 — same recipe: recommendations */
    c = at(4);
    frame(4, c, 7.6);
    OUT(Q('belt binS binO lbS lbO gau gO gS gv2'), c, 0.4);
    IN(q('hist'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(all('#ml-hist .l12-tiles span'), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2)' }, c + 0.9);
    tl.fromTo(q('pk'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 2.2);
    tl.to(q('pk'), { x: 200 * sx, y: 70, scale: 0.5, duration: 0.8, ease: 'power2.in' }, c + 2.4);
    tl.to(q('pk'), { opacity: 0, duration: 0.15 }, c + 3.2);
    tl.fromTo(mc('.g1'), { rotation: 0, svgOrigin: '140 300' }, { rotation: 360, svgOrigin: '140 300', duration: 1.0, ease: 'none' }, c + 3.0);
    POP(q('rec'), c + 3.8, 0.6); SND('ok', c + 3.8);
    IN(q('same'), c + 5.0, 0.5, { y: 30 }); SND('pop', c + 5.0);

    /* 5 — recap */
    c = at(5);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd5'), c + 0.6, 0.5, { y: -30 });
    IN(q('rA'), c + 1.0, 0.6, { x: -50 * sx }); SND('bad', c + 1.0);
    IN(q('rB'), c + 1.8, 0.6, { x: 50 * sx }); SND('ok', c + 1.8);
    range(4).forEach((k) => { POP(q('f' + k), c + 3.0 + k * 0.5, 0.45); if (k < 3) IN(q('a' + k), c + 3.3 + k * 0.5, 0.3); });

    /* living loops */
    const beltLoop = () => gsap.timeline({ repeat: -1 }).fromTo(all('#ml-belt .mv'), { strokeDashoffset: 0 }, { strokeDashoffset: -48, duration: 0.8, ease: 'none' });
    M.loop(0, 8.4, beltLoop);
    M.loop(0, 8.4, () => M.breathe(q('brk'), 1.06, 0.9));
    M.loop(1, 4.0, () => M.bob(all('#ml-stage .l12-mail.mini'), 7, 1.2));
    M.loop(2, 6.4, () => M.glowLoop(q('mdl'), 'rgba(167,139,250,.95)', 1.1));
    M.loop(2, 6.4, () => gsap.timeline({ repeat: -1 }).to(mc('.g1'), { rotation: '+=360', svgOrigin: '140 300', duration: 4, ease: 'none' }, 0).to(mc('.g2'), { rotation: '-=360', svgOrigin: '236 288', duration: 4, ease: 'none' }, 0));
    M.loop(3, 8.2, beltLoop);
    M.loop(3, 8.2, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(ND, { rotation: -79, svgOrigin: '280 290' }, { rotation: -70, svgOrigin: '280 290', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(4, 6.0, () => M.ping(q('pk'), 200 * sx, 70, 1.0, 0.8));
    M.loop(4, 6.0, () => M.breathe(q('rec'), 1.04, 1.3));
    M.loop(4, 6.0, () => glowCycle(all('#ml-hist .l12-tiles span'), 'rgba(251,191,36,.95)', 0.4));
    M.loop(5, 5.4, () => M.cycle(Q('f0 f1 f2 f3'), 'rgba(167,139,250,.95)', 0.5));
    return M.done();
  });

  /* ═════════════════════════ dlMovie ═════════════════════════ */
  K.defineAnim('dlMovie', (stage, props, api) => {
    const P = 'dl-', rtl = MK.RTL(), U = MK.ui(P), B = kit(P, rtl);
    const M = MK.create(stage, api, { props,
      cls: 'mv-dl mv-l12', prefix: P, beats: 6, cast: { 'ch-fm': 'farmer' },
      html: (L) => {
        const pr = (id, w, p, cls) => `<div class="l12-pr"><b>${w}</b><span class="l12-bar ${cls}"><i id="${P}${id}" style="width:${p}%"></i></span><em><bdi id="${P}${id}v">${p}</bdi>%</em></div>`;
        return `
  <div id="dl-stage" class="mv-stage">
    ${B.svg('neu', 60, 180, 480, 308, '0 0 560 360', NEURON(B))}
    ${B.chip('nl', 60, 520, '🧠 ' + L('خلية عصبية (عصبون) في المخ', 'a nerve cell (neuron) in the brain'), 'c-violet')}
    ${B.chip('ins', 548, 306, L('مستوحاة', 'inspired') + ' ' + B.arrow, 'c-amber', 180)}
    ${B.svg('net', 740, 150, 900, 440, '0 0 900 440', NET([3, 4, 4, 2], 900, 440, B))}
    ${B.chip('la', 720, 596, L('إدخال', 'input'), 'c-blue', 160)}
    ${B.chip('lb', 1040, 596, L('طبقات مخفية', 'hidden layers'), 'c-violet', 300)}
    ${B.chip('lc', 1500, 596, L('إخراج', 'output'), 'c-green', 160)}

    ${B.svg('img', 90, 150, 460, 300, '0 0 460 300', ROAD(P, B))}
    ${B.chip('imgl', 90, 466, '📷 ' + L('صورة من كاميرا العربية', 'a frame from the car camera'), 'c-blue', 460)}
    ${B.chip('o1', 1636, 290, '🚶 ' + L('مشاة', 'pedestrian'), 'c-green')}
    ${B.chip('o2', 1636, 386, '🪧 ' + L('مش مشاة', 'no one'), 'c-slate')}
    ${B.mid('wc', 680, '⚖️ ' + L('كل وصلة ليها «وزن» بيحدّد قوة الإشارة — السميكة أقوى', 'every link has a “weight” that sets the signal’s strength — thick = strong'), 'c-amber')}

    ${B.card('res', 90, 488, 460, 270, 'c-blue', { h: '🎯 ' + L('حكم الشبكة', 'The network says'), html: pr('b1', '🚶 ' + L('مشاة', 'person'), 30, 'o') + pr('b2', '🪧 ' + L('لأ', 'none'), 70, 's') })}
    ${B.big('xw', 470, 470, 90, 70, '❌')}${B.big('xo', 470, 470, 90, 70, '✅')}
    ${B.mid('t1', 680, '1️⃣ ' + L('أول محاولة: غلط!', 'First try: wrong!'), 'c-red')}
    ${B.mid('t2', 680, '🔧 ' + L('الغلطة بترجع لورا… والأوزان بتتضبط شوية', 'the error travels back… the weights shift a little'), 'c-amber')}
    ${B.mid('t3', 680, '✅ ' + L('بعد آلاف الأمثلة: الحكم بقى صح', 'after thousands of examples: it gets it right'), 'c-green')}

    ${B.svg('deep', 600, 160, 1180, 440, '0 0 1180 440', NET([3, 5, 5, 5, 5, 5, 2], 1180, 440, B, { r: 20 }))}
    ${B.chip('f1', 732, 612, '〰️ ' + L('حواف', 'edges'), 'c-blue', 210)}
    ${B.chip('f2', 1085, 612, '🔷 ' + L('أشكال', 'shapes'), 'c-violet', 210)}
    ${B.chip('f3', 1438, 612, '🚶 ' + L('مشاة!', 'a person!'), 'c-green', 210)}
    ${B.chip('fl', 640, 698, '🔍 ' + L('بيكتشف الخصائص بنفسه — طبقة ورا طبقة', 'it discovers the features itself — layer by layer'), 'c-amber', 1100)}
    ${B.svg('deck', 80, 150, 420, 330, '0 0 420 330', DECK(P))}
    ${B.big('cnt', 60, 490, 460, 50, `<bdi id="${P}num">0</bdi> ${L('صورة', 'images')}`, 'l12-gold')}
    ${B.chip('ex1', 70, 580, '🚗 ' + L('تحليل صور القيادة الذاتية', 'image analysis for self-driving'), 'c-blue sm', 440)}
    ${B.chip('ex2', 70, 664, '🔊 ' + L('التعرف على الكلام', 'speech synthesis'), 'c-pink', 440)}

    ${B.ch('ch-fm', 60, 470, 'md')}
    ${range(6).map((k) => B.card('lv' + k, 60 + (k % 3) * 176, 130 + Math.floor(k / 3) * 180, 164, 168, (k % 2 ? 'c-red' : 'c-green') + ' tile',
      { html: LEAF(k % 2 ? '#a3a33a' : '#22c55e', k % 2 ? '#78350f' : '') + `<span class="k">${k % 2 ? L('مريض', 'sick') : L('سليم', 'healthy')}</span>` })).join('')}
    ${B.chip('lbl', 300, 500, '🏷️ ' + L('آلاف الصور المعنونة', 'thousands of labelled photos'), 'c-amber')}
    ${B.svg('net2', 760, 180, 600, 360, '0 0 600 360', NET([3, 4, 4, 2], 600, 360, B, { r: 22 }))}
    ${B.card('nw1', 320, 590, 164, 168, 'c-slate tile', { html: LEAF('#a3a33a', '#78350f') + `<span class="k">${L('جديدة', 'new')}</span>` })}
    ${B.card('nw2', 320, 590, 164, 168, 'c-slate tile', { html: LEAF('#22c55e', '#c026d3') + `<span class="k">${L('جديدة', 'new')}</span>` })}
    ${B.card('ra', 1420, 170, 440, 360, 'c-green', { ic: LEAF('#a3a33a', '#78350f'), h: L('الحكم: مريضة', 'Verdict: sick'), k: '✅ <bdi>94%</bdi>' })}
    ${B.card('rb', 1420, 170, 440, 360, 'c-red', { ic: LEAF('#22c55e', '#c026d3'), h: L('مرض نادر! 🤷‍♂️', 'A rare disease! 🤷‍♂️'), p: L('مريضة 52% · سليمة 48%', 'sick 52% · healthy 48%'), k: '❓ ' + L('محتار', 'unsure') })}
    ${B.stamp('oops', 1360, 566, '⚠️ ' + L('ممكن يغلط!', 'it may be wrong!'))}

    ${U.hd(0, '🧠 ' + L('الشبكة العصبية: مستوحاة من خلايا المخ', 'Neural network: modelled on brain cells'))}
    ${U.hd(1, '⚡ ' + L('الإشارة بتعدّي طبقة ورا طبقة', 'Signals pass layer by layer'))}
    ${U.hd(2, '🏋️ ' + L('التدريب: الأوزان بتتضبط شوية شوية', 'Training: the weights are tuned little by little'))}
    ${U.hd(3, '📚 ' + L('التعلّم العميق = طبقات كتير + بيانات ضخمة', 'Deep learning = many layers + huge data'))}
    ${U.hd(4, '🌾 ' + L('مثال جديد: مزارع بيفحص محصوله', 'New context: a farmer checks his crops'))}
    ${U.nt(0, L('مكوّنات بسيطة كتير متوصّلة في طبقات ← بتتعلّم من البيانات وتاخد أحكام معقّدة', 'many simple units linked in layers → they learn from data and make complex judgements'), 'ok')}
    ${U.nt(3, '⭐ ' + L('الشبكات العصبية هي التقنية الأساسية ورا التقدّم الكبير في الذكاء الاصطناعي', 'neural networks are the core technology behind recent AI progress'), 'ok')}
  </div>
  <div id="dl-recap" class="mv-recap">
    ${U.hd(5, '💡 ' + L('الخلاصة', 'The point'))}
    ${[['🕸️', L('شبكة عصبية', 'Neural network'), L('مستوحاة من خلايا المخ · طبقات: إدخال ← مخفية ← إخراج', 'modelled on neurons · input → hidden → output'), 'c-violet'],
      ['⚖️', L('الأوزان', 'Weights'), L('كل وصلة ليها وزن… بيتضبط بالتدريب', 'every link has a weight… tuned by training'), 'c-amber'],
      ['📚', L('التعلّم العميق', 'Deep learning'), L('جوّه التعلّم الآلي: طبقات كتير + بيانات ضخمة', 'inside ML: many layers + huge data'), 'c-blue'],
      ['⚠️', L('الحاجة النادرة', 'Rare cases'), L('لو نادرة في بياناته ← غالبًا هيغلط', 'rare in its data → it will likely err'), 'c-red']]
      .map(([ic, h, p, cc], k) => B.card('rc' + k, 70 + k * 450, 150, 420, 290, cc, { ic, h, p })).join('')}
    ${B.mid('rp1', 520, '🚗 ' + L('القيادة الذاتية (التعرّف على المشاة)', 'self-driving (spotting pedestrians)') + ' · 🔊 ' + L('التعرف على الكلام', 'speech synthesis') + ' · 🌾 ' + L('فحص المحاصيل', 'crop checks'), 'c-blue big')}
    ${B.mid('rp2', 620, '⭐ ' + L('الشبكة العصبية = التقنية الأساسية ورا التقدّم الكبير في الذكاء الاصطناعي', 'the neural network = the core technology behind recent AI progress'), 'c-green')}
  </div>`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const NETP = q('net'), DEEP = q('deep'), NET2 = q('net2');
    const bars = (a, b, t) => {
      tl.to(q('b1'), { width: a + '%', duration: 0.6 }, t); tl.to(q('b2'), { width: b + '%', duration: 0.6 }, t);
      tl.to(q('b1v'), { textContent: a, snap: { textContent: 1 }, duration: 0.6 }, t); tl.to(q('b2v'), { textContent: b, snap: { textContent: 1 }, duration: 0.6 }, t);
    };

    /* 0 — from the neuron to the network */
    let c = at(0);
    frame(0, c, 6.8);
    IN(q('neu'), c + 0.3, 0.1);
    tl.fromTo(all('#dl-neu .den path, #dl-neu .axon, #dl-neu .term'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, stagger: 0.06 }, c + 0.3);
    tl.fromTo(all('#dl-neu .soma'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, c + 0.3);
    IN(q('nl'), c + 1.4, 0.4, { y: 16 });
    tl.fromTo(all('#dl-neu .imp'), { attr: { cx: 206 }, opacity: 1 }, { attr: { cx: 540 }, duration: 0.9, ease: 'power1.in' }, c + 1.9);
    tl.to(all('#dl-neu .imp'), { opacity: 0, duration: 0.1 }, c + 2.8);
    POP(q('ins'), c + 2.9, 0.4); SND('pop', c + 2.9);
    IN(NETP, c + 3.3, 0.1);
    tl.fromTo(all('#dl-net .nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, stagger: 0.07, ease: 'back.out(2)' }, c + 3.3);
    tl.fromTo(all('#dl-net .lk'), { opacity: 0 }, { opacity: 0.5, duration: 0.5, stagger: { each: 0.006, from: 'start' } }, c + 4.3);
    Q('la lb lc').forEach((l, i) => IN(l, c + 5.0 + i * 0.3, 0.4, { y: 14 }));
    wave(tl, NETP, 3, c + 5.9);

    /* 1 — signals and weights */
    c = at(1);
    frame(1, c);
    OUT(Q('neu nl ins'), c, 0.3);
    IN(q('img'), c + 0.4, 0.5, { x: -40 * sx }); IN(q('imgl'), c + 0.7, 0.4, { y: 14 });
    IN(Q('o1 o2'), c + 1.0, 0.4, { x: 30 * sx });
    tl.fromTo(all('#dl-img .det'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 1.4);
    wave(tl, NETP, 3, c + 1.8); SND('whoosh', c + 1.8);
    M.PULSE(q('o1'), c + 3.0, 'rgba(52,211,153,.9)', 1);
    wave(tl, NETP, 3, c + 3.6);
    IN(q('wc'), c + 5.0, 0.5, { y: 20 });
    tl.fromTo(all('#dl-net .lk.thick'), { stroke: '#7dd3fc', opacity: 0.5 }, { stroke: '#fde68a', opacity: 1, duration: 0.4, yoyo: true, repeat: 3 }, c + 5.6);

    /* 2 — training */
    c = at(2);
    frame(2, c, 8.6);
    OUT(Q('wc imgl'), c, 0.3);
    IN(q('res'), c + 0.3, 0.4, { y: 20 });
    wave(tl, NETP, 3, c + 0.8);
    bars(30, 70, c + 2.1);
    POP(q('xw'), c + 2.3, 0.4); IN(q('t1'), c + 2.3, 0.3); SND('bad', c + 2.3);
    OUT(q('t1'), c + 3.2, 0.2); IN(q('t2'), c + 3.3, 0.3);
    wave(tl, NETP, 3, c + 3.3, true);
    tl.to(all('#dl-net .lk'), { attr: { 'stroke-width': (k, e) => +e.dataset.w2 }, stroke: '#fdba74', duration: 0.7 }, c + 4.3);
    tl.to(all('#dl-net .lk'), { stroke: '#7dd3fc', duration: 0.5 }, c + 5.0);
    OUT(q('xw'), c + 4.8, 0.2);
    wave(tl, NETP, 3, c + 5.1);
    bars(97, 3, c + 6.4);
    POP(q('xo'), c + 6.6, 0.4); OUT(q('t2'), c + 6.5, 0.2); IN(q('t3'), c + 6.6, 0.3); SND('ok', c + 6.6);

    /* 3 — deep learning */
    c = at(3);
    frame(3, c, 7.8);
    OUT(Q('img res xo t3 net la lb lc o1 o2'), c, 0.4);
    IN(DEEP, c + 0.5, 0.1);
    tl.fromTo(all('#dl-deep .nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.03, ease: 'back.out(2)' }, c + 0.5);
    tl.fromTo(all('#dl-deep .lk'), { opacity: 0 }, { opacity: 0.45, duration: 0.6 }, c + 1.4);
    IN(q('deck'), c + 0.8, 0.5, { y: 30 });
    IN(q('cnt'), c + 1.2, 0.4);
    const cnt = { v: 0 };
    tl.fromTo(cnt, { v: 0 }, { v: 1000000, duration: 2.2, ease: 'power2.in', onUpdate() { const e = q('num'); if (e) e.textContent = Math.round(cnt.v).toLocaleString('en-US'); } }, c + 1.3);
    wave(tl, DEEP, 6, c + 2.2);
    Q('f1 f2 f3').forEach((f, i) => POP(f, c + 2.6 + i * 0.8, 0.4));
    IN(q('fl'), c + 5.0, 0.4, { y: 16 });
    IN(q('ex1'), c + 5.8, 0.4, { y: 16 }); IN(q('ex2'), c + 6.2, 0.4, { y: 16 });

    /* 4 — the farmer: thousands of labelled photos; rare = it may be wrong */
    c = at(4);
    frame(4, c);
    OUT(Q('deep deck cnt ex1 ex2 f1 f2 f3 fl'), c, 0.4);
    IN(q('ch-fm'), c + 0.4, 0.5, { x: -50 * sx });
    range(6).forEach((k) => POP(q('lv' + k), c + 0.7 + k * 0.15, 0.4));
    IN(q('lbl'), c + 1.7, 0.4, { y: 14 });
    IN(NET2, c + 1.9, 0.4);
    range(6).forEach((k) => {
      const cx = 60 + (k % 3) * 176 + 82, cy = 130 + Math.floor(k / 3) * 180 + 84;
      tl.to(q('lv' + k), { x: (790 - cx) * sx, y: 360 - cy, scale: 0.3, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 2.6 + k * 0.1);
    });
    wave(tl, NET2, 3, c + 3.2);
    IN(q('nw1'), c + 4.4, 0.3);
    tl.to(q('nw1'), { x: 420 * sx, y: -310, scale: 0.3, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 4.8);
    wave(tl, NET2, 3, c + 5.2);
    POP(q('ra'), c + 6.4, 0.5); SND('ok', c + 6.4);
    IN(q('nw2'), c + 6.6, 0.3);
    tl.to(q('nw2'), { x: 420 * sx, y: -310, scale: 0.3, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 7.0);
    OUT(q('ra'), c + 7.6, 0.2); POP(q('rb'), c + 7.8, 0.5); SND('bad', c + 7.8);
    stampIn(M, q('oops'), c + 8.4);

    /* 5 — recap */
    c = at(5);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd5'), c + 0.6, 0.5, { y: -30 });
    range(4).forEach((k) => { IN(q('rc' + k), c + 1.0 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 1.0 + k * 0.5); });
    IN(q('rp1'), c + 3.4, 0.5, { y: 20 });
    POP(q('rp2'), c + 4.2, 0.5);

    /* living loops: signals keep flowing */
    const flow = (root, n, back) => () => wave(gsap.timeline({ repeat: -1, repeatDelay: 0.5 }), root, n, 0, back);
    M.loop(0, 7.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(all('#dl-neu .imp'), { attr: { cx: 206 }, opacity: 1 }, { attr: { cx: 540 }, duration: 1.1, ease: 'power1.in' }).to(all('#dl-neu .imp'), { opacity: 0, duration: 0.1 }));
    M.loop(0, 7.4, flow(NETP, 3));
    M.loop(1, 6.8, flow(NETP, 3));
    M.loop(1, 6.8, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#dl-img .det'), { opacity: 0.3, duration: 0.7 }));
    M.loop(2, 7.4, flow(NETP, 3));
    M.loop(3, 6.8, flow(DEEP, 6));
    M.loop(4, 9.0, flow(NET2, 3));
    M.loop(4, 9.0, () => M.breathe(q('oops'), 1.06, 0.9));
    M.loop(5, 5.0, () => glowCycle(Q('rc0 rc1 rc2 rc3'), 'rgba(196,181,253,.95)', 0.5));
    return M.done();
  });

  /* ═════════════════════════ genaiMovie ═════════════════════════ */
  K.defineAnim('genaiMovie', (stage, props, api) => {
    const P = 'gn-', rtl = MK.RTL(), U = MK.ui(P), B = kit(P, rtl);
    const ar = api.t({ ar: 'x', en: 'y' }) === 'x';
    const ME = ar ? ['اكتب', 'جملتين', 'عن', 'نهر', 'النيل', '✍️'] : ['Write', 'two', 'lines', 'about', 'the', 'Nile', '✍️'];
    const AI = ar ? ['النيل', 'أطول', 'نهر', 'في', 'إفريقيا،', 'بيجري', 'من', 'الجنوب', 'للشمال', 'وبيدّي', 'مصر', 'الحياة', '🌊'] : ['The', 'Nile', 'is', 'Africa’s', 'longest', 'river;', 'it', 'flows', 'north', 'and', 'gives', 'Egypt', 'life', '🌊'];
    const M = MK.create(stage, api, { props,
      cls: 'mv-gn mv-l12', prefix: P, beats: 7, cast: { 'ch-st': 'studentL' },
      html: (L) => `
  <div id="gn-stage" class="mv-stage">
    ${B.ch('ch-st', 40, 470, 'md')}
    <div id="gn-chat" class="l12u l12-chat later" style="${B.at(300, 130, 1300, 620)}"><div class="cbar"><i></i>💬 ${L('مساعد ذكاء اصطناعي توليدي (زي ChatGPT)', 'A generative AI assistant (like ChatGPT)')}</div></div>
    <div id="gn-me" class="l12u l12-msg me later" style="inset-inline-end:${1920 - 1560}px;top:236px">${ME.map((w) => `<span class="wd">${w}</span>`).join(' ')}</div>
    <div id="gn-dots" class="l12u l12-dots later" style="${B.at(340, 350)}"><i></i><i></i><i></i></div>
    <div id="gn-ai" class="l12u l12-msg ai later" style="${B.at(340, 350, 1060)}">🤖 ${AI.map((w) => `<span class="wd">${w}</span>`).join(' ')}<span class="l12-cur"></span></div>
    ${B.chip('new', 340, 600, '✨ ' + L('نص جديد ماكانش موجود قبل كده!', 'brand-new text that did not exist before!'), 'c-violet big')}
    ${B.big('sp1', 1380, 330, 70, 56, '✨')}${B.big('sp2', 330, 300, 70, 46, '✨')}${B.big('sp3', 1240, 500, 70, 40, '✨')}

    <svg id="gn-rays" class="l12-svg later" style="left:0;top:0;width:1920px;height:880px" viewBox="0 0 1920 880">
      ${[[660, 265], [660, 575], [1260, 265], [1260, 575]].map(([x, y]) => `<path class="ry" d="M960 410 L${x} ${y}" stroke="#e879f9" stroke-width="5" stroke-dasharray="10 10" opacity=".7"/><circle class="rd" cx="960" cy="410" r="9" fill="#fae8ff" opacity="0" data-x="${x}" data-y="${y}"/>`).join('')}</svg>
    ${B.svg('orb', 810, 260, 300, 300, '0 0 300 300', ORB(P))}
    ${B.mid('pr', 150, '💬 «' + L('غروب الشمس على النيل', 'sunset over the Nile') + '»', 'c-slate big')}
    ${B.card('o1', 100, 140, 560, 250, 'c-blue', { h: '📝 ' + L('نص', 'Text'), html: `<svg class="l12-in" viewBox="0 0 500 150">${LINES(B)}</svg>` })}
    ${B.card('o2', 1260, 140, 560, 250, 'c-amber', { h: '🖼️ ' + L('صور', 'Images'), html: `<svg class="l12-in" viewBox="0 0 500 150">${SUNSET(P, B)}</svg>` })}
    ${B.card('o3', 100, 450, 560, 250, 'c-pink', { h: '🎵 ' + L('صوت', 'Audio'), html: `<svg class="l12-in" viewBox="0 0 500 150">${WAVEFORM(B)}</svg>` })}
    ${B.card('o4', 1260, 450, 560, 250, 'c-green', { h: '💻 ' + L('برامج', 'Programs'), html: `<div class="l12-code code"><span>sky = draw("sunset")</span><span>river = "Nile"</span><span>show(sky, river)</span></div>` })}
    ${B.mid('ex', 640, '🧪 ' + L('أمثلة: ChatGPT · أدوات توليد الصور', 'e.g. ChatGPT · image generators'), 'c-violet')}

    <div id="gn-sent" class="l12u l12-card c-slate row later" style="${B.at(160, 140, 1600, 110)}"><span class="ic">🤖</span><span class="tx l12-sentence">${L('برج القاهرة اتبنى سنة', 'The Cairo Tower was built in')} <span class="l12-slot"><span id="gn-blank" class="l12-blank">____</span><span id="gn-wrong" class="l12-fill bad">1890</span></span> <span id="gn-right" class="l12-fill good">1961</span></span></div>
    ${[['1961', 46], ['1890', 34], ['1956', 20]].map(([y, p], k) => `${B.txt('y' + k, 250, 300 + k * 96, 170, `<bdi class="code">${y}</bdi>`)}<div id="gn-b${k}" class="l12u l12-bar later" style="${B.at(440, 306 + k * 96, 900)}"><i data-w="${p * 2}" style="width:${p * 2}%"></i></div>${B.txt('p' + k, 1360, 300 + k * 96, 140, `<bdi>${p}%</bdi>`)}`).join('')}
    <div id="gn-sel" class="l12u l12-sel later" style="${B.at(230, 288, 1300, 72)}"></div>
    ${B.mid('pick', 600, '🎲 ' + L('بيختار كلمة «شكلها مناسب»… مش بيتأكد إنها صح!', 'it picks a word that “looks right”… without checking it is true!'), 'c-amber big')}
    ${B.chip('conf', 160, 290, '😎 ' + L('قالها بثقة كاملة!', 'said with total confidence!'), 'c-amber big')}
    ${B.card('src', 1180, 290, 580, 0, 'c-green', { row: true, ic: '📖', h: L('مصدر موثوق', 'A reliable source'), p: L('برج القاهرة اتفتح سنة 1961', 'the Cairo Tower opened in 1961') })}
    ${B.big('mag', 1100, 300, 100, 80, '🔍')}
    ${B.stamp('stp', 1180, 162, '😵 ' + L('هلوسة!', 'Hallucination!'))}
    ${B.card('def', 160, 520, 1600, 0, 'c-red', { row: true, ic: '😵', h: L('الهلوسة', 'Hallucination'), p: L('إن النموذج التوليدي يطلّع كلام يبدو معقول ومقنع… لكنه غلط', 'a generative model producing fluent, convincing output… that is factually wrong') })}

    ${B.card('fa', 100, 160, 520, 300, 'c-red', { ic: '🧾', h: L('حقيقة مزيفة', 'A fake fact'), p: '«' + L('الهرم الأكبر اتبنى سنة 1200م', 'The Great Pyramid was built in 1200 AD') + '»', k: '✗ ' + L('عمره حوالي 4500 سنة', 'it is about 4,500 years old') })}
    ${B.card('fb', 700, 160, 520, 300, 'c-red', { ic: '📚', h: L('مرجع مش موجود أصلًا', 'A source that does not exist'), p: '«' + L('كتاب «أسرار الجيزة» لنجيب محفوظ', 'Mahfouz’s book “Secrets of Giza”') + '»', k: '✗ ' + L('الكتاب ده مخترع', 'that book is invented') })}
    ${B.card('fc', 1300, 160, 520, 300, 'c-red', { ic: '🔢', h: L('رقم أو حساب غلط', 'A wrong number or sum'), p: '<bdi class="code">15 × 4 = 70</bdi>', k: '✗ ' + L('الصح: 60', 'correct: 60') })}
    ${B.mid('why', 520, '📉 ' + L('بتزيد لما المعلومة نادرة أو مش موجودة في بيانات التدريب', 'more likely when the info is rare or missing from the training data'), 'c-amber big')}

    ${B.svg('doc', 90, 150, 340, 430, '0 0 350 430', DOC)}
    ${B.big('cpy', 520, 620, 100, 80, '📋')}
    ${B.stamp('dx', 130, 360, '✗ ' + L('خطر!', 'Danger!'))}
    ${B.chip('ben', 470, 160, '👍 ' + L('المنفعة: سرعة وأفكار', 'benefit: speed and ideas'), 'c-green big')}
    ${B.chip('rsk', 470, 250, '👎 ' + L('الخطر: معلومة غلط', 'risk: a false fact'), 'c-red big')}
    ${B.card('cp', 470, 360, 560, 220, 'c-amber', { ic: '📄', h: L('ماتنقلش إجابته زي ما هي', 'Never paste it as-is'), p: L('ممكن يكون فيها هلوسة', 'it may be a hallucination') })}
    ${B.card('chk', 1080, 140, 760, 580, 'c-green', { h: '🛡️ ' + L('تحمي نفسك إزاي؟', 'How to protect yourself') })}
    ${[L('راجع مصدر موثوق', 'Check a reliable source'), L('اطلب المرجع واتأكد منه', 'Ask for the source — and verify it'), L('قارن مصدرين', 'Compare two sources'),
      L('استخدمه للأفكار مش للحقيقة النهائية', 'Use it for ideas, not final facts'), L('افهم واكتب بأسلوبك', 'Understand it and write it yourself')]
      .map((txt, k) => `<div id="gn-k${k}" class="l12u l12-check later" style="${B.at(1116, 236 + k * 92, 700)}"><span class="bx"><b>✓</b></span>${k + 1}. ${txt}</div>`).join('')}

    ${B.flip('t1', 160, 150, 1600, 150, `<span class="ic">🤔</span><span>«${L('فلتر السبام ذكاء اصطناعي توليدي', 'A spam filter is generative AI')}»؟</span>`,
      `<span class="x">✗</span><span><del>«${L('فلتر السبام ذكاء اصطناعي توليدي', 'A spam filter is generative AI')}»</del>${L('غلط!', 'False!')}<small>${L('ده تعلّم آلي بيصنّف (سبام / سليم) — مابيولّدش محتوى جديد', 'it is machine learning that classifies (spam / OK) — it creates nothing new')}</small></span>`)}
    ${B.flip('t2', 160, 340, 1600, 150, `<span class="ic">🤔</span><span>«${L('الذكاء التوليدي بيستخدم تعلّم آلي عادي مش تعلّم عميق', 'Generative AI uses ordinary ML, not deep learning')}»؟</span>`,
      `<span class="x">✗</span><span><del>«${L('الذكاء التوليدي بيستخدم تعلّم آلي عادي مش تعلّم عميق', 'Generative AI uses ordinary ML, not deep learning')}»</del>${L('غلط!', 'False!')}<small>${L('غالبية الذكاء التوليدي مبنية على التعلّم العميق', 'generative AI is built on deep learning')}</small></span>`)}
    ${B.flip('t3', 160, 530, 1600, 150, `<span class="ic">🤔</span><span>«${L('أحط إجابته في تقرير المدرسة زي ما هي', 'I can paste its answer into my school report')}»؟</span>`,
      `<span class="x">✗</span><span><del>«${L('أحط إجابته في تقرير المدرسة زي ما هي', 'I can paste its answer into my school report')}»</del>${L('لأ!', 'No!')}<small>${L('ممكن تكون هلوسة — اتحقّق من مصدر موثوق واكتب بفهمك', 'it may be a hallucination — verify with a reliable source and write it yourself')}</small></span>`)}

    ${U.hd(0, '✨ ' + L('الذكاء التوليدي: طلب ← محتوى جديد', 'Generative AI: a prompt → new content'))}
    ${U.hd(1, '🎨 ' + L('مش نص بس: صور · صوت · برامج', 'Not only text: images · audio · programs'))}
    ${U.hd(2, '🔤 ' + L('بيكتب كلمة ورا كلمة… بالاحتمالات', 'It writes word by word… by probability'))}
    ${U.hd(3, '😵 ' + L('الهلوسة: كلام مقنع… بس غلط!', 'Hallucination: convincing… but wrong!'))}
    ${U.hd(4, '🧩 ' + L('أشكال الهلوسة', 'Forms of hallucination'))}
    ${U.hd(5, '📄 ' + L('تقرير المدرسة: تستخدمه إزاي صح؟', 'Your school report: how to use it right'))}
    ${U.hd(6, '⚠️ ' + L('فخاخ الامتحان', 'Exam traps'))}
    ${U.nt(0, L('بيستخدم التعلّم العميق عشان يولّد بيانات جديدة', 'it uses deep learning to generate new data'), 'ok')}
    ${U.nt(1, L('كله محتوى جديد — مبني على الأنماط اللي اتعلّمها من بيانات التدريب', 'all new content — built on patterns learned from its training data'), 'ok')}
    ${U.nt(2, L('لكل كلمة نسبة احتمال اتعلّمها من ملايين النصوص — مابيدوّرش في قاعدة حقائق', 'each word has a probability learned from millions of texts — it does not look facts up'), 'warn')}
    ${U.nt(5, '✅ ' + L('العادة الذهبية: اتحقّق قبل ما تعتمد على أي معلومة', 'the golden habit: verify before you rely on any fact'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;

    /* 0 — a prompt → new text */
    let c = at(0);
    frame(0, c, 7.6);
    IN(q('ch-st'), c + 0.2, 0.5, { x: -60 * sx });
    IN(q('chat'), c + 0.4, 0.5, { scale: 0.96 });
    IN(q('me'), c + 1.0, 0.2);
    tl.fromTo(all('#gn-me .wd'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.13 }, c + 1.0); SND('tap', c + 1.0);
    IN(q('dots'), c + 2.2, 0.2);
    tl.fromTo(all('#gn-dots i'), { y: 0 }, { y: -12, duration: 0.25, yoyo: true, repeat: 3, stagger: 0.12, ease: 'sine.inOut' }, c + 2.3);
    OUT(q('dots'), c + 3.4, 0.15);
    IN(q('ai'), c + 3.5, 0.2);
    tl.fromTo(all('#gn-ai .wd'), { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.2 }, c + 3.6);
    Q('sp1 sp2 sp3').forEach((s, i) => POP(s, c + 6.4 + i * 0.15, 0.4));
    POP(q('new'), c + 6.6, 0.5); SND('ok', c + 6.6);

    /* 1 — not only text */
    c = at(1);
    frame(1, c, 6.6);
    OUT(Q('ch-st chat me ai new sp1 sp2 sp3'), c, 0.4);
    IN(q('orb'), c + 0.4, 0.6, { scale: 0.6 }); SND('whoosh', c + 0.4);
    IN(q('pr'), c + 0.9, 0.4, { y: -20 });
    tl.to(q('pr'), { y: 230, scale: 0.3, opacity: 0, duration: 0.6, ease: 'power2.in' }, c + 1.7);
    tl.fromTo(all('#gn-orb .halo'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 1 }, c + 2.3);
    IN(q('rays'), c + 2.5, 0.1); tl.fromTo(all('#gn-rays .ry'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, stagger: 0.1 }, c + 2.5);
    Q('o1 o2 o3 o4').forEach((o, i) => { POP(o, c + 2.8 + i * 0.45, 0.5); SND('pop', c + 2.8 + i * 0.45); });
    tl.fromTo(all('#gn-o1 .ln'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.5, stagger: 0.25 }, c + 3.2);
    tl.fromTo(all('#gn-o2 .sun'), { attr: { cy: 20 } }, { attr: { cy: 70 }, duration: 1.4, ease: 'sine.out' }, c + 3.3);
    tl.fromTo(all('#gn-o3 .wb'), { scaleY: 0.1, transformOrigin: '50% 50%' }, { scaleY: 1, duration: 0.3, stagger: 0.03 }, c + 3.9);
    tl.fromTo(all('#gn-o4 .l12-code span'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.3 }, c + 4.4);
    IN(q('ex'), c + 5.6, 0.5, { y: 20 });

    /* 2 — word by word, by probability */
    c = at(2);
    frame(2, c, 6.6);
    OUT(Q('orb rays o1 o2 o3 o4 ex'), c, 0.4);
    IN(q('sent'), c + 0.5, 0.5, { y: 20 });
    tl.fromTo(q('blank'), { opacity: 1 }, { opacity: 0.2, duration: 0.3, yoyo: true, repeat: 3 }, c + 1.0);
    range(3).forEach((k) => {
      IN(Q(`y${k} b${k} p${k}`), c + 1.3 + k * 0.4, 0.3);
      tl.fromTo(all(`#gn-b${k} i`), { width: '0%' }, { width: (i, e) => e.dataset.w + '%', duration: 0.6 }, c + 1.3 + k * 0.4);
    });
    IN(q('sel'), c + 2.8, 0.2);
    [0, 1, 2, 0, 1, 2, 1].forEach((r, j) => { tl.to(q('sel'), { y: r * 96, duration: 0.22, ease: 'power1.inOut' }, c + 2.9 + j * 0.3); SND('tap', c + 2.9 + j * 0.3); });
    tl.to(q('sel'), { boxShadow: '0 0 40px rgba(251,191,36,.9)', duration: 0.3 }, c + 5.0);
    POP(q('pick'), c + 5.3, 0.5); SND('pop', c + 5.3);

    /* 3 — hallucination */
    c = at(3);
    frame(3, c);
    OUT(Q('y0 y1 y2 b0 b1 b2 p0 p1 p2 sel pick'), c, 0.4);
    OUT(q('blank'), c + 0.5, 0.15);
    tl.fromTo(q('wrong'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 0.6); SND('pop', c + 0.6);
    POP(q('conf'), c + 1.3, 0.4);
    IN(q('src'), c + 2.2, 0.5, { x: 50 * sx }); SND('ok', c + 2.2);
    tl.fromTo(q('mag'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 3.0);
    tl.to(q('mag'), { x: -560 * sx, y: -150, duration: 0.8, ease: 'power2.inOut' }, c + 3.2);
    stampIn(M, q('stp'), c + 4.1); SND('bad', c + 4.1);
    tl.to(q('mag'), { opacity: 0, duration: 0.2 }, c + 4.2);
    tl.to(q('wrong'), { opacity: 0.45, textDecoration: 'line-through', duration: 0.2 }, c + 4.6);
    tl.set(q('right'), { display: 'inline-block' }, c + 4.8);
    tl.fromTo(q('right'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 4.8);
    IN(q('def'), c + 5.6, 0.5, { y: 30 });

    /* 4 — forms of hallucination */
    c = at(4);
    frame(4, c);
    OUT(Q('sent conf src stp def'), c, 0.4);
    Q('fa fb fc').forEach((f, i) => { IN(f, c + 0.6 + i * 0.8, 0.5, { y: 30 }); SND('bad', c + 0.9 + i * 0.8); });
    tl.fromTo(all('#gn-fb .p'), { opacity: 1 }, { opacity: 0.25, duration: 0.25, yoyo: true, repeat: 3 }, c + 2.4);
    IN(q('why'), c + 3.8, 0.5, { y: 20 });

    /* 5 — the school report */
    c = at(5);
    frame(5, c, 8.4);
    OUT(Q('fa fb fc why'), c, 0.4);
    IN(q('doc'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(q('cpy'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 1.0);
    tl.to(q('cpy'), { x: -330 * sx, y: -300, duration: 0.7, ease: 'power2.in' }, c + 1.2);
    tl.to(q('cpy'), { opacity: 0, duration: 0.15 }, c + 1.9);
    stampIn(M, q('dx'), c + 2.0); SND('bad', c + 2.0);
    IN(q('ben'), c + 2.6, 0.4, { x: 30 * sx }); IN(q('rsk'), c + 3.0, 0.4, { x: 30 * sx });
    IN(q('cp'), c + 3.5, 0.5, { y: 20 });
    IN(q('chk'), c + 4.0, 0.5, { x: 40 * sx });
    range(5).forEach((k) => {
      IN(q('k' + k), c + 4.4 + k * 0.6, 0.3, { x: 20 * sx });
      tl.fromTo(all(`#gn-k${k} .bx b`), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, ease: 'back.out(3)' }, c + 4.6 + k * 0.6);
      SND('tap', c + 4.6 + k * 0.6);
    });

    /* 6 — exam traps */
    c = at(6);
    frame(6, c);
    OUT(Q('doc dx ben rsk cp chk k0 k1 k2 k3 k4'), c, 0.4);
    Q('t1 t2 t3').forEach((f, i) => IN(f, c + 0.5 + i * 0.3, 0.5, { x: 60 * sx }));
    Q('t1 t2 t3').forEach((f, i) => { flipAt(M, f, c + 1.9 + i * 1.5); SND('bad', c + 2.2 + i * 1.5); });

    /* living loops */
    M.loop(0, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#gn-ai .l12-cur'), { opacity: 0, duration: 0.5, ease: 'steps(1)' }));
    M.loop(0, 7.4, () => M.bob(Q('sp1 sp2 sp3'), 10, 1.2));
    M.loop(1, 6.4, () => {
      const x = gsap.timeline({ repeat: -1 });
      x.to(all('#gn-orb .r1'), { rotation: 360, svgOrigin: '150 150', duration: 9, ease: 'none' }, 0).to(all('#gn-orb .r2'), { rotation: -360, svgOrigin: '150 150', duration: 9, ease: 'none' }, 0);
      return x;
    });
    M.loop(1, 6.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.3 }).fromTo(all('#gn-rays .rd'), { attr: { cx: 960, cy: 410 }, opacity: 0 }, { attr: { cx: (k, e) => +e.dataset.x, cy: (k, e) => +e.dataset.y }, opacity: 1, duration: 1.0, ease: 'power1.in', stagger: 0.25 }).to(all('#gn-rays .rd'), { opacity: 0, duration: 0.1 }));
    M.loop(1, 6.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#gn-o3 .wb'), { scaleY: 0.3, transformOrigin: '50% 50%', duration: 0.35, ease: 'sine.inOut', stagger: { each: 0.05, from: 'random' } }));
    M.loop(1, 6.4, () => gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.4 }).fromTo(all('#gn-o2 .sun'), { attr: { cy: 70 } }, { attr: { cy: 104 }, duration: 3, ease: 'sine.inOut' }));
    M.loop(1, 6.4, () => gsap.timeline({ repeat: -1 }).fromTo(all('#gn-o2 .wv'), { x: 0 }, { x: -50, duration: 1.6, ease: 'none' }));
    M.loop(2, 5.8, () => M.glowLoop(q('sel'), 'rgba(251,191,36,.9)', 0.8));
    M.loop(3, 6.4, () => M.breathe(q('stp'), 1.07, 0.9));
    M.loop(4, 4.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#gn-fb .p'), { opacity: 0.3, duration: 0.9, ease: 'sine.inOut' }));
    M.loop(5, 8.0, () => M.breathe(q('dx'), 1.06, 0.9));
    return M.done();
  });

  /* the same builders for the other movies drawn in this look (movies-2-1.js) */
  MK.look = { kit, stampIn, flipAt, glow, glowCycle, art: { ROBOT, BELT, GAUGE, NET, wave, LEAF, DOC, HEAD } };
})();

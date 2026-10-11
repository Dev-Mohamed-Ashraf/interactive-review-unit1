/* =========================================================
 * anims/mooreMath.js — Moore's Law as mathematics.
 *   mooreFormula : doubling ladder → n = (t − t₀) ÷ 2 → N = N₀ × 2ⁿ (labelled)
 *   mooreSolver  : animated blackboard solution, one line per beat
 *       props.mode 'forward'  { y0, n0, y1, actual? }   find N
 *                  'backward' { y1, n1, y0 }            find N₀
 *                  'years'    { ratio }                 find years
 *   mooreLab     : sliders → live formula + exponential curve
 * All numbers are COMPUTED from props, so new examples need data only.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  /** Plain-language meaning shown under every symbol on the board. */
  const MEANING = {
    't₀': { ar: 'سنة البداية', en: 'start year' }, 't': { ar: 'السنة المطلوبة', en: 'target year' },
    'N₀': { ar: 'العدد في سنة البداية', en: 'count at the start' }, 'N': { ar: 'العدد في السنة المطلوبة', en: 'count in the target year' },
  };
  const fmt = (n, d) => Number(n).toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d });
  const pow2Text = (n) => `2^${n}`; // rendered as a real <sup> by RV.mathEl

  /** Pure math for a solver config — exported for tests. */
  function solve(p) {
    if (p.mode === 'years') {
      const n = Math.log2(p.ratio);
      return { n, years: n * 2 };
    }
    const dt = p.mode === 'backward' ? p.y1 - p.y0 : p.y1 - p.y0;
    const n = dt / 2;
    const pow = 2 ** n;
    if (p.mode === 'backward') return { dt, n, pow, result: p.n1 / pow };
    return { dt, n, pow, result: p.n0 * pow };
  }
  RV.mooreSolve = solve;

  /** "2^11.5 = 2^11 × 2^0.5 = 2,048 × 1.414 ≈ 2,896" or "2^5 = 2×2×2×2×2 = 32" */
  function powerLine(n) {
    const v = 2 ** n;
    if (Number.isInteger(n)) {
      if (n <= 6) return `${pow2Text(n)} = ${Array(n).fill('2').join(' × ')} = ${fmt(v)}`;
      return `${pow2Text(n)} = ${fmt(v)}`;
    }
    const whole = Math.floor(n);
    return `${pow2Text(n)} = ${pow2Text(whole)} × 2^0.5 = ${fmt(2 ** whole)} × 1.414 ≈ ${fmt(v, 0)}`;
  }

  /* ───────────────────────── mooreFormula ───────────────────────── */
  K.defineAnim('mooreFormula', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    // ladder: years 0..8, value ×2 each step, stack of squares grows
    const steps = [0, 1, 2, 3, 4];
    const cols = steps.map((k) => {
      const stack = h('div', { class: 'mf-stack' });
      for (let q = 0; q < 2 ** k; q++) stack.appendChild(h('i'));
      return h('div', { class: 'mf-col' },
        h('div', { class: 'mf-val mono' }, '×' + 2 ** k), stack,
        h('div', { class: 'mf-year mono' }, `+${k * 2} ${t({ ar: 'سنة', en: 'yr' })}`));
    });
    const arrows = steps.slice(1).map(() => h('div', { class: 'mf-arrow mono' }, '×2'));
    const ladder = h('div', { class: 'mf-ladder' });
    cols.forEach((c, k) => { if (k) ladder.appendChild(arrows[k - 1]); ladder.appendChild(c); });

    const part = (txt, cls, label) => h('span', { class: 'mf-part ' + cls }, RV.mathEl('span', 'mf-sym mono', txt), h('span', { class: 'mf-tag' }, t(label)));
    const nLine = h('div', { class: 'mf-formula' },
      part('n', 'p-n', { ar: 'عدد مرات التضاعف', en: 'doublings' }), h('span', { class: 'mf-op' }, '='),
      h('span', { class: 'mf-par mono' }, '('), part('t', 'p-t', { ar: 'السنة المطلوبة', en: 'target year' }), h('span', { class: 'mf-op' }, '−'), part('t₀', 'p-t0', { ar: 'سنة البداية', en: 'start year' }), h('span', { class: 'mf-par mono' }, ')'),
      h('span', { class: 'mf-op' }, '÷'), part('2', 'p-2', { ar: 'كل سنتين', en: 'every 2 yrs' }));
    const NLine = h('div', { class: 'mf-formula mf-main' },
      part('N', 'p-N', { ar: 'العدد الجديد', en: 'new count' }), h('span', { class: 'mf-op' }, '='),
      part('N₀', 'p-N0', { ar: 'العدد الأصلي', en: 'start count' }), h('span', { class: 'mf-op' }, '×'),
      part('2^n', 'p-2n', { ar: '2 أُس n', en: '2 to the n' }));
    const wrap = h('div', { class: 'mf-wrap' }, ladder, nLine, NLine);
    stage.appendChild(wrap);
    gsap.set([nLine, NLine], { autoAlpha: 0 });

    function ladderIn() {
      const tl = gsap.timeline();
      cols.forEach((c, k) => {
        tl.from(c, { y: 30, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, k * 0.55)
          .from(c.querySelectorAll('.mf-stack i'), { scale: 0, stagger: 0.02, duration: 0.25, ease: 'back.out(3)' }, k * 0.55 + 0.1)
          .add(() => api.sound.play('pop'), k * 0.55);
        if (k) tl.from(arrows[k - 1], { scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(3)' }, k * 0.55 - 0.15);
      });
    }
    function show(el) {
      gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      const parts = el.querySelectorAll('.mf-sym, .mf-op, .mf-par');
      gsap.from(parts, { y: -30, opacity: 0, rotateX: -90, stagger: 0.07, duration: 0.5, ease: 'back.out(2)' });
      gsap.from(el.querySelectorAll('.mf-tag'), { y: 10, opacity: 0, stagger: 0.1, delay: 0.5, duration: 0.4 });
    }
    let ladderPlayed = false;
    const visible = { n: false, N: false };
    function toggle(key, el, on) {
      if (on && !visible[key]) show(el);
      if (!on && visible[key]) gsap.to(el, { autoAlpha: 0, duration: 0.2 });
      visible[key] = on;
    }
    return {
      beat(i) {
        if (!ladderPlayed) { ladderPlayed = true; ladderIn(); }
        toggle('n', nLine, i >= 1);
        toggle('N', NLine, i >= 2);
        gsap.to(ladder, { opacity: i >= 2 ? 0.35 : 1, scale: i >= 2 ? 0.85 : 1, duration: 0.5 });
      },
    };
  });

  /* ───────────────────────── mooreSolver ───────────────────────── */
  K.defineAnim('mooreSolver', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const p = props;
    const r = solve(p);

    // --- blackboard lines (one per beat) ---
    const L = [];
    const line = (label, math, cls) => h('div', { class: 'ms-line ' + (cls || '') }, label ? h('span', { class: 'ms-label' }, t(label)) : null, RV.mathEl('span', 'ms-math mono', math));
    if (p.mode === 'forward') {
      L.push(h('div', { class: 'ms-line ms-given' },
        chip('t₀', p.y0), chip('N₀', fmt(p.n0)), chip('t', p.y1), chip('N', '?', 'is-find')));
      L.push(line({ ar: 'عدد السنين', en: 'years' }, `t − t₀ = ${p.y1} − ${p.y0} = ${r.dt}`));
      L.push(line({ ar: 'مرات التضاعف', en: 'doublings' }, `n = ${r.dt} ÷ 2 = ${fmt(r.n)}`));
      L.push(line({ ar: 'نعوّض', en: 'substitute' }, `N = N₀ × 2^n = ${fmt(p.n0)} × ${pow2Text(r.n)}`));
      L.push(line({ ar: 'نحسب الأُس', en: 'the power' }, powerLine(r.n)));
      L.push(line({ ar: 'الناتج', en: 'answer' }, `N ≈ ${fmt(r.result, 0)}`, 'ms-result'));
    } else if (p.mode === 'backward') {
      L.push(h('div', { class: 'ms-line ms-given' }, chip('t', p.y1), chip('N', fmt(p.n1)), chip('t₀', p.y0), chip('N₀', '?', 'is-find')));
      L.push(line({ ar: 'عدد السنين', en: 'years' }, `t − t₀ = ${p.y1} − ${p.y0} = ${r.dt}`));
      L.push(line({ ar: 'مرات التضاعف', en: 'doublings' }, `n = ${r.dt} ÷ 2 = ${fmt(r.n)}`));
      L.push(line({ ar: 'نقلب القانون', en: 'rearrange' }, `N₀ = N ÷ 2^n = ${fmt(p.n1)} ÷ ${pow2Text(r.n)}`));
      L.push(line({ ar: 'نحسب الأُس', en: 'the power' }, powerLine(r.n)));
      L.push(line({ ar: 'الناتج', en: 'answer' }, `N₀ = ${fmt(r.result)}`, 'ms-result'));
    } else {
      L.push(h('div', { class: 'ms-line ms-given' }, chip('N ÷ N₀', '×' + p.ratio), chip(t({ ar: 'السنين', en: 'years' }), '?', 'is-find')));
      L.push(line({ ar: 'كأُس للـ 2', en: 'as a power of 2' }, `${p.ratio} = ${Array(r.n).fill('2').join(' × ')} = ${pow2Text(r.n)}`));
      L.push(line({ ar: 'مرات التضاعف', en: 'doublings' }, `n = ${r.n}`));
      L.push(line({ ar: 'الناتج', en: 'answer' }, `${t({ ar: 'السنين', en: 'years' })} = n × 2 = ${r.n} × 2 = ${r.years}`, 'ms-result'));
    }
    function chip(k, v, cls) {
      return h('span', { class: 'ms-chip ' + (cls || '') },
        h('span', { class: 'ms-chip-top' }, h('b', { class: 'mono' }, k), h('span', { class: 'mono' }, String(v))),
        MEANING[k] ? h('small', { class: 'ms-chip-mean' }, t(MEANING[k])) : null);
    }

    const boardInner = h('div', { class: 'ms-board-inner' }, h('div', { class: 'ms-board-title' }, api.icon('pen'), t({ ar: 'السبورة', en: 'The board' })), L);
    const board = h('div', { class: 'ms-board' }, boardInner);
    const refit = api.fitBox(board, boardInner, { min: 0.45 }); // the whole board always fits — nothing scrolls out of sight
    L.forEach((el) => { el.style.display = 'none'; });

    // --- visual: timeline with doubling markers + growth bars ---
    const viz = s('svg', { viewBox: '0 0 420 360', class: 'ms-viz' });
    const nWhole = Math.floor(r.n || 0);
    const doublings = p.mode === 'years' ? r.n : r.n;
    const tl = s('g', { class: 'ms-tl' });
    tl.append(s('line', { x1: 30, x2: 390, y1: 60, y2: 60, class: 'ms-tl-line' }));
    const yA = p.mode === 'forward' ? p.y0 : p.mode === 'backward' ? p.y0 : 0;
    const yB = p.mode === 'forward' ? p.y1 : p.mode === 'backward' ? p.y1 : r.years;
    tl.append(s('text', { x: 30, y: 40, 'text-anchor': 'middle', class: 'ms-tl-y mono' }, p.mode === 'years' ? '0' : yA),
      s('text', { x: 390, y: 40, 'text-anchor': 'middle', class: 'ms-tl-y mono' }, p.mode === 'years' ? yB : yB));
    if (p.mode !== 'years') {
      tl.append(s('text', { x: 30, y: 20, 'text-anchor': 'middle', class: 'ms-tl-sym mono' }, 't₀'),
        s('text', { x: 390, y: 20, 'text-anchor': 'middle', class: 'ms-tl-sym mono' }, 't'));
    }
    const marks = [];
    const total = Math.ceil(doublings);
    for (let k = 1; k <= total; k++) {
      const frac = Math.min(1, (k * 2) / ((yB - yA) || 1));
      const x = 30 + frac * 360;
      const half = k > doublings;
      const m = s('g', { class: 'ms-mark' + (half ? ' is-half' : '') }, s('circle', { cx: x, cy: 60, r: total > 16 ? 4 : 7 }), total <= 14 ? s('text', { x, y: 88, 'text-anchor': 'middle', class: 'ms-mark-t mono' }, half ? '×√2' : '×2') : null);
      tl.appendChild(m); marks.push(m);
    }
    const nBadge = s('text', { x: 210, y: 125, 'text-anchor': 'middle', class: 'ms-nbadge mono' }, `n = ${fmt(doublings)}`);
    tl.appendChild(nBadge);
    // growth bars: value after each doubling (linear scale → hockey stick)
    const bars = s('g', { class: 'ms-bars' });
    const B = Math.min(nWhole, 14);
    const maxV = 2 ** B;
    const barEls = [];
    for (let k = 0; k <= B; k++) {
      const bw = 340 / (B + 1);
      const hgt = Math.max(2, (2 ** k / maxV) * 180);
      const rect = s('rect', { x: 40 + k * bw + bw * 0.12, y: 340 - hgt, width: bw * 0.76, height: hgt, rx: Math.min(6, bw * 0.2), class: 'ms-bar' });
      bars.appendChild(rect); barEls.push(rect);
    }
    const resultBig = s('text', { x: 210, y: 175, 'text-anchor': 'middle', class: 'ms-big mono' }, '');
    const resultSub = s('text', { x: 210, y: 205, 'text-anchor': 'middle', class: 'ms-sub' }, '');
    viz.append(tl, bars, resultBig, resultSub);
    let actualG = null;
    if (p.actual) {
      actualG = s('g', { class: 'ms-actual' },
        s('text', { x: 210, y: 236, 'text-anchor': 'middle', class: 'ms-actual-t' }, t(p.actual.label)));
      viz.appendChild(actualG);
      gsap.set(actualG, { autoAlpha: 0 });
    }

    stage.appendChild(h('div', { class: 'ms-wrap' }, board, h('div', { class: 'ms-viz-wrap' }, viz)));
    gsap.set([tl, bars, resultBig, resultSub], { autoAlpha: 0 });
    gsap.set(marks, { autoAlpha: 0 });
    gsap.set(barEls, { scaleY: 0, transformOrigin: '50% 100%' });

    let shown = -1;
    function reveal(k) {
      const el = L[k];
      if (!el) return;
      el.style.display = '';
      refit();
      const math = el.querySelector('.ms-math');
      gsap.fromTo(el, { x: RV.i18n.lang === 'ar' ? -30 : 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
      // chalk-writing wipe (robust: no per-letter split, so the text can never stay hidden)
      if (math) gsap.fromTo(math, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.9, delay: 0.15, ease: 'power1.inOut', clearProps: 'clipPath' });
      board.scrollTop = 0; // the board shrinks to fit instead of scrolling (see api.fitBox)
      el.classList.add('is-new');
      L.forEach((x, j) => x.classList.toggle('is-current', j === k));
      // chalk underline
      gsap.fromTo(el, { '--u': '0%' }, { '--u': '100%', duration: 0.6, delay: 0.3 });
    }
    function vizFor(k) {
      const last = L.length - 1;
      if (k >= 1) gsap.to(tl, { autoAlpha: 1, duration: 0.4 });
      if ((p.mode !== 'years' && k === 2) || (p.mode === 'years' && k === 1)) {
        gsap.to(marks, { autoAlpha: 1, stagger: Math.min(0.12, 2.5 / marks.length), duration: 0.25, ease: 'back.out(3)', onStart: () => api.sound.play('pop') });
        gsap.fromTo(nBadge, { scale: 0.5, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, delay: 0.4, ease: 'elastic.out(1,.5)' });
      }
      if (k >= last - 1 && p.mode !== 'years') {
        gsap.to(bars, { autoAlpha: 1, duration: 0.3 });
        gsap.to(barEls, { scaleY: 1, stagger: 0.07, duration: 0.45, ease: 'back.out(1.6)' });
      }
      if (k === last) {
        gsap.to(bars, { opacity: 0.25, duration: 0.6, delay: 0.8 });
        gsap.to([resultBig, resultSub], { autoAlpha: 1, duration: 0.3, delay: 0.5 });
        const target = p.mode === 'years' ? r.years : r.result;
        RV.fx.countUp(resultBig, target, { duration: 1.6, decimals: 0, format: (v) => fmt(Math.round(v), 0) });
        resultSub.textContent = p.mode === 'years' ? t({ ar: 'سنة', en: 'years' }) : (target >= 1e6 ? '≈ ' + RV.fmtBig(target) : t({ ar: 'ترانزستور', en: 'transistors' }));
        gsap.fromTo(resultBig, { scale: 0.4, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.9, delay: 0.5, ease: 'elastic.out(1, .45)' });
        api.after(1900, () => { api.sound.play('win'); RV.fx.confetti({ count: 60 }); });
        if (actualG) gsap.to(actualG, { autoAlpha: 1, duration: 0.5, delay: 2.2 });
      }
    }

    return {
      beat(i) {
        const k = Math.min(i, L.length - 1);
        if (k > shown) { for (let j = shown + 1; j <= k; j++) { reveal(j); vizFor(j); } }
        else if (k < shown) { L.forEach((el, j) => { if (j > k) el.style.display = 'none'; el.classList.toggle('is-current', j === k); }); }
        shown = k;
      },
    };
  });

  /* ───────────────────────── mooreLab ───────────────────────── */
  K.defineAnim('mooreLab', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const st = { n0: 2300, y0: 1971, y1: 2021 };
    const n0In = h('input', { type: 'number', class: 'lab-num mono', value: st.n0, min: 1, inputmode: 'numeric' });
    const y0In = h('input', { type: 'range', min: 1960, max: 2030, step: 1, value: st.y0 });
    const y1In = h('input', { type: 'range', min: 1962, max: 2050, step: 1, value: st.y1 });
    const y0V = h('b', { class: 'mono' }), y1V = h('b', { class: 'mono' });
    const out = { dt: h('b', { class: 'mono' }), n: h('b', { class: 'mono' }), p: h('b', { class: 'mono' }), N: h('b', { class: 'mono lab-N' }), Nw: h('span', { class: 'lab-Nw' }) };
    const logBtn = h('button', { class: 'btn btn-sm', type: 'button' }, t({ ar: 'محور لوغاريتمي', en: 'Log scale' }));
    let logScale = false;
    logBtn.addEventListener('click', () => { logScale = !logScale; logBtn.classList.toggle('is-active', logScale); api.sound.play('tap'); draw(); });

    const ctr = h('div', { class: 'lab-controls no-swipe' },
      h('label', null, h('span', null, 'N₀ ', t({ ar: '(العدد في البداية)', en: '(start count)' })), n0In),
      h('label', null, h('span', null, 't₀ ', t({ ar: 'سنة البداية', en: 'start year' }), ' ', y0V), y0In),
      h('label', null, h('span', null, 't ', t({ ar: 'السنة المطلوبة', en: 'target year' }), ' ', y1V), y1In),
      h('div', { class: 'lab-out' },
        h('div', null, 't − t₀ = ', out.dt), h('div', null, 'n = ', out.n), h('div', null, RV.mathEl('span', null, '2^n = '), out.p),
        h('div', { class: 'lab-res' }, 'N = ', out.N, out.Nw)),
      logBtn);
    const svg = s('svg', { viewBox: '0 0 460 300', class: 'lab-svg' });
    stage.appendChild(h('div', { class: 'lab-wrap' }, svg, ctr));

    [n0In, y0In, y1In].forEach((el) => api.on(el, 'input', () => {
      st.n0 = Math.max(1, +n0In.value || 1);
      st.y0 = +y0In.value;
      st.y1 = Math.max(+y1In.value, st.y0 + 2);
      if (+y1In.value !== st.y1) y1In.value = st.y1;
      draw();
    }));

    function draw() {
      const dt = st.y1 - st.y0, n = dt / 2, pw = 2 ** n, N = st.n0 * pw;
      y0V.textContent = st.y0; y1V.textContent = st.y1;
      out.dt.textContent = dt; out.n.textContent = fmt(n); out.p.textContent = fmt(pw, 1); out.N.textContent = fmt(N, 0);
      out.Nw.textContent = N >= 1e6 ? ' ≈ ' + RV.fmtBig(N) : '';
      RV.dom.clear(svg);
      const X = (y) => 40 + ((y - st.y0) / dt) * 400;
      const Y = logScale ? (v) => 270 - (Math.log10(v / st.n0) / Math.max(1e-9, Math.log10(pw))) * 240 : (v) => 270 - (v / N) * 240;
      svg.append(s('line', { x1: 40, x2: 440, y1: 270, y2: 270, class: 'lab-axis' }), s('line', { x1: 40, x2: 40, y1: 20, y2: 270, class: 'lab-axis' }));
      let d = '';
      for (let k = 0; k <= 120; k++) { const y = st.y0 + (dt * k) / 120; const v = st.n0 * 2 ** ((y - st.y0) / 2); d += (k ? 'L' : 'M') + X(y).toFixed(1) + ' ' + Y(v).toFixed(1); }
      const area = s('path', { d: d + ` L440 270 L40 270 Z`, class: 'lab-area' });
      const path = s('path', { d, class: 'lab-curve' });
      const dot = s('circle', { cx: X(st.y1), cy: Y(N), r: 8, class: 'lab-dot' });
      svg.append(area, path, dot,
        s('text', { x: 40, y: 292, class: 'lab-tick mono', 'text-anchor': 'middle' }, st.y0),
        s('text', { x: 440, y: 292, class: 'lab-tick mono', 'text-anchor': 'middle' }, st.y1),
        s('text', { x: 50, y: 30, class: 'lab-tick' }, logScale ? t({ ar: 'لوغاريتمي: خط مستقيم!', en: 'log scale: a straight line!' }) : t({ ar: 'نمو أُسّي 🚀', en: 'exponential growth 🚀' })));
      gsap.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power2.out' });
      gsap.fromTo(dot, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, delay: 0.4, ease: 'back.out(3)' });
    }
    draw();
    return {};
  });
})();

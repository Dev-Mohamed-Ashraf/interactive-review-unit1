/* =========================================================
 * anims/moore.js — Moore's Law concept visuals.
 *   mooreChip     : transistor → doubling run 1971→2021 → real-chip log chart
 *   mooreLimit    : the 4 problems, one sub-scene per beat
 *                   (atom-sized gates · quantum tunneling · leakage · heat trade-off)
 *   mooreParallel : 1 core vs 4 cores race → quantum teaser
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /** 2300 → "2,300" · 4.2e6 → "4.2 مليون" / "4.2 million" */
  function fmtBig(n) {
    const ar = RV.i18n.lang === 'ar';
    if (n < 1e6) return Math.round(n).toLocaleString('en-US');
    if (n < 1e9) return (n / 1e6).toFixed(n < 1e7 ? 2 : 1).replace(/\.0+$/, '') + (ar ? ' مليون' : ' million');
    return (n / 1e9).toFixed(n < 1e10 ? 2 : 1).replace(/\.0+$/, '') + (ar ? ' مليار' : ' billion');
  }
  RV.fmtBig = fmtBig;

  /** Cross-fade helper: show one <g> of a list. */
  function showOnly(groups, i) {
    groups.forEach((g, k) => {
      if (k === i) gsap.to(g, { autoAlpha: 1, duration: 0.5, delay: 0.15 });
      else gsap.to(g, { autoAlpha: 0, duration: 0.3 });
    });
  }

  /* ───────────────────────── mooreChip ───────────────────────── */
  K.defineAnim('mooreChip', (stage, props, api) => {
    const { s } = api;
    const svg = K.svgCanvas(stage, 800, 460);
    const t = api.t;

    // --- scene A: chip with transistor grid ---
    const chipG = s('g', { class: 'mc-chip' });
    const pins = s('g', { class: 'mc-pins' });
    for (let k = 0; k < 8; k++) {
      const p = 70 + k * 37;
      pins.append(s('rect', { x: p, y: 46, width: 14, height: 26, rx: 3 }), s('rect', { x: p, y: 388, width: 14, height: 26, rx: 3 }),
        s('rect', { x: 46, y: p, width: 26, height: 14, rx: 3 }), s('rect', { x: 388, y: p, width: 26, height: 14, rx: 3 }));
    }
    const die = s('rect', { x: 70, y: 70, width: 320, height: 320, rx: 18, class: 'mc-die' });
    const cells = s('g', { class: 'mc-cells' });
    chipG.append(pins, die, cells);

    const yearT = s('text', { x: 600, y: 120, 'text-anchor': 'middle', class: 'mc-year' }, '1971');
    const countLbl = s('text', { x: 600, y: 175, 'text-anchor': 'middle', class: 'mc-lbl' }, t({ ar: 'عدد الترانزستورات', en: 'Transistor count' }));
    const countT = s('text', { x: 600, y: 235, 'text-anchor': 'middle', class: 'mc-count' }, '2,300');
    const x2 = s('text', { x: 600, y: 320, 'text-anchor': 'middle', class: 'mc-x2' }, '×2');
    const every = s('text', { x: 600, y: 360, 'text-anchor': 'middle', class: 'mc-lbl' }, t({ ar: 'كل سنتين ⏱', en: 'every 2 years ⏱' }));
    // single transistor = switch (scene 0)
    const sw = s('g', { class: 'mc-switch', transform: 'translate(600 250)' },
      s('rect', { x: -70, y: -34, width: 140, height: 68, rx: 34, class: 'mc-sw-track' }),
      s('circle', { cx: -36, cy: 0, r: 26, class: 'mc-sw-knob' }),
      s('text', { x: 0, y: 75, 'text-anchor': 'middle', class: 'mc-sw-txt' }, '0'));
    const swLbl = s('text', { x: 600, y: 140, 'text-anchor': 'middle', class: 'mc-lbl' }, t({ ar: 'ترانزستور = مفتاح صغير', en: 'transistor = tiny switch' }));
    const sceneA = s('g', null, chipG, yearT, countLbl, countT, x2, every, sw, swLbl);

    // --- scene B: log chart of real chips ---
    const chips = [[1971, 2300, 'Intel 4004'], [1978, 29000, 'Intel 8086'], [1989, 1.2e6, 'Intel 486'], [2000, 4.2e7, 'Pentium 4'], [2010, 1.17e9, 'Core i7'], [2021, 5.7e10, 'Apple M1 Max']];
    const X = (y) => 110 + ((y - 1970) / 52) * 640;
    const Y = (n) => 400 - ((Math.log10(n) - 3) / 8) * 340;
    const chartG = s('g', { class: 'mc-chart' });
    for (let e = 3; e <= 11; e++) chartG.append(s('line', { x1: 100, x2: 760, y1: Y(10 ** e), y2: Y(10 ** e), class: 'mc-grid' }), s('text', { x: 92, y: Y(10 ** e) + 5, 'text-anchor': 'end', class: 'mc-axis' }, '10', s('tspan', { dy: -9, 'font-size': 11 }, String(e))));
    [1970, 1980, 1990, 2000, 2010, 2020].forEach((y) => chartG.append(s('text', { x: X(y), y: 428, 'text-anchor': 'middle', class: 'mc-axis' }, y)));
    const ideal = s('path', { d: `M${X(1971)} ${Y(2300)} L${X(2021)} ${Y(2300 * 2 ** 25)}`, class: 'mc-ideal' });
    const real = s('path', { d: chips.map((c, i) => `${i ? 'L' : 'M'}${X(c[0])} ${Y(c[1])}`).join(' '), class: 'mc-real' });
    const dots = chips.map((c) => s('g', { class: 'mc-pt' }, s('circle', { cx: X(c[0]), cy: Y(c[1]), r: 7 }), s('text', X(c[0]) > 620 ? { x: X(c[0]) - 12, y: Y(c[1]) - 14, 'text-anchor': 'end', class: 'mc-pt-lbl' } : { x: X(c[0]) + 10, y: Y(c[1]) - 12, class: 'mc-pt-lbl' }, c[2])));
    const legend = s('text', { x: 430, y: 40, 'text-anchor': 'middle', class: 'mc-lbl' }, t({ ar: 'المحور الرأسي لوغاريتمي: كل خط = ×10', en: 'Log scale: each line = ×10' }));
    chartG.append(ideal, real, ...dots, legend);

    svg.append(sceneA, chartG);
    gsap.set(chartG, { autoAlpha: 0 });

    let level = -1;
    function drawCells(k) {
      if (k === level) return;
      level = k;
      RV.dom.clear(cells);
      const cols = 2 ** Math.ceil(k / 2), rows = 2 ** Math.floor(k / 2);
      const pad = 16, W = 320 - pad * 2, cw = W / cols, ch = W / rows;
      const rects = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const rect = s('rect', { x: 70 + pad + c * cw + cw * 0.12, y: 70 + pad + r * ch + ch * 0.12, width: cw * 0.76, height: ch * 0.76, rx: Math.min(cw, ch) * 0.12, class: 'mc-cell' });
        cells.appendChild(rect); rects.push(rect);
      }
      gsap.from(rects, { scale: 0, transformOrigin: '50% 50%', duration: 0.25, stagger: { amount: 0.2, from: 'center' }, ease: 'back.out(2)' });
    }

    let run = null;
    let swTween = null;
    function sceneSwitch() {
      [countLbl, countT, x2, every].forEach((e) => gsap.set(e, { autoAlpha: 0 }));
      gsap.set([sw, swLbl], { autoAlpha: 1 });
      drawCells(0);
      yearT.textContent = '1971';
      const knob = sw.querySelector('.mc-sw-knob');
      const txt = sw.querySelector('.mc-sw-txt');
      swTween = gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
        .to(knob, { attr: { cx: 36 }, duration: 0.35, ease: 'power2.inOut', onStart: () => { txt.textContent = '1'; sw.classList.add('on'); } })
        .to(knob, { attr: { cx: -36 }, duration: 0.35, ease: 'power2.inOut', delay: 0.9, onStart: () => { txt.textContent = '0'; sw.classList.remove('on'); } });
    }
    function sceneDoubling() {
      if (swTween) swTween.kill();
      gsap.to([sw, swLbl], { autoAlpha: 0, duration: 0.3 });
      gsap.to([countLbl, countT, x2, every], { autoAlpha: 1, duration: 0.4 });
      const state = { step: 0 };
      if (run) run.kill();
      run = gsap.timeline();
      for (let k = 1; k <= 25; k++) {
        run.add(() => {
          state.step = k;
          yearT.textContent = String(1971 + 2 * k);
          countT.textContent = fmtBig(2300 * 2 ** k);
          drawCells(Math.min(k, 8));
          gsap.fromTo(x2, { scale: 1.8, opacity: 1, transformOrigin: '50% 50%' }, { scale: 1, opacity: 0.8, duration: 0.3 });
          gsap.fromTo(die, { attr: { 'stroke-width': 8 } }, { attr: { 'stroke-width': 3 }, duration: 0.3 });
          if (k % 3 === 0) api.sound.play('beep');
        }, k * 0.38);
      }
      run.add(() => { gsap.fromTo(countT, { scale: 1.3, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, .4)' }); api.sound.play('ok'); }, '+=0.1');
    }
    function sceneChart() {
      if (run) run.progress(1).kill();
      showOnly([sceneA, chartG], 1);
      gsap.fromTo(real, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, delay: 0.4, ease: 'power2.inOut' });
      gsap.fromTo(ideal, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, delay: 0.4, ease: 'power2.inOut' });
      gsap.from(dots, { scale: 0, transformOrigin: '50% 50%', stagger: 0.25, delay: 0.6, duration: 0.4, ease: 'back.out(3)' });
    }

    return {
      beat(i) {
        if (i === 0) { showOnly([sceneA, chartG], 0); sceneSwitch(); }
        else if (i === 1) { showOnly([sceneA, chartG], 0); sceneDoubling(); }
        else sceneChart();
      },
    };
  });

  /* ───────────────────────── mooreLimit ───────────────────────── */
  K.defineAnim('mooreLimit', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 460);
    const title = (txt, color) => s('text', { x: 400, y: 50, 'text-anchor': 'middle', class: 'ml-title', fill: color || 'var(--lesson)' }, t(txt));
    const groups = [];
    const loops = [];

    // S0 · shrinking to atoms
    const g0 = s('g');
    const gate = s('rect', { x: 250, y: 120, width: 300, height: 220, rx: 14, class: 'ml-gate' });
    const sizeT = s('text', { x: 400, y: 245, 'text-anchor': 'middle', class: 'ml-size mono' }, '10 µm');
    const yearT0 = s('text', { x: 400, y: 380, 'text-anchor': 'middle', class: 'ml-sub' }, '1971');
    const atoms = s('g', { class: 'ml-atoms' });
    for (let k = 0; k < 15; k++) atoms.appendChild(s('circle', { cx: 400 - 7 * 12 + k * 12, cy: 230, r: 5.5 }));
    const atomLbl = s('text', { x: 400, y: 300, 'text-anchor': 'middle', class: 'ml-warn' }, t({ ar: 'عرضه ≈ 15 ذرة بس! ⚛', en: 'only ≈ 15 atoms wide! ⚛' }));
    g0.append(title({ ar: 'المشكلة 1: الترانزستور قرّب من حجم الذرات', en: 'Problem 1: transistors near atomic size' }), gate, sizeT, yearT0, atoms, atomLbl);
    groups.push(g0);
    function play0() {
      gsap.set(atoms.children, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(atomLbl, { autoAlpha: 0 });
      const steps = [['10 µm', 1971, 300, 220], ['1 µm', 1985, 220, 170], ['90 nm', 2004, 150, 120], ['10 nm', 2017, 100, 70], ['3 nm', 2023, 190, 26]];
      const tl = gsap.timeline({ delay: 0.4 });
      steps.forEach(([sz, yr, w, hgt], k) => {
        tl.to(gate, { attr: { x: 400 - w / 2, y: 230 - hgt / 2, width: w, height: hgt }, duration: 0.7, ease: 'power3.inOut' }, k * 1.0)
          .add(() => { sizeT.textContent = sz; yearT0.textContent = yr; api.sound.play('tap'); }, k * 1.0);
      });
      tl.to(sizeT, { attr: { y: 175 } }, '<')
        .to(atoms.children, { scale: 1, stagger: 0.04, duration: 0.3, ease: 'back.out(3)' })
        .to(atomLbl, { autoAlpha: 1, duration: 0.4 })
        .fromTo(atomLbl, { scale: 0.7, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'elastic.out(1,.5)' }, '<');
      loops.push(tl);
    }

    // S1 · quantum tunneling
    const g1 = s('g');
    const wall = s('rect', { x: 380, y: 110, width: 40, height: 250, rx: 6, class: 'ml-wall' });
    const wallLbl = s('text', { x: 400, y: 395, 'text-anchor': 'middle', class: 'ml-sub' }, t({ ar: 'الحاجز العازل', en: 'insulating barrier' }));
    const stopLbl = s('text', { x: 210, y: 100, 'text-anchor': 'middle', class: 'ml-ok' }, t({ ar: 'المفروض تقف هنا 🚫', en: 'should stop here 🚫' }));
    const passLbl = s('text', { x: 600, y: 100, 'text-anchor': 'middle', class: 'ml-warn' }, t({ ar: 'لكن بعضها عدّى! 👻', en: 'but some got through! 👻' }));
    const e1 = s('g', { class: 'ml-electrons' });
    g1.append(title({ ar: 'المشكلة 2: تأثير النفق الكمومي', en: 'Problem 2: quantum tunneling' }), wall, wallLbl, stopLbl, passLbl, e1);
    groups.push(g1);
    function play1() {
      RV.dom.clear(e1);
      for (let k = 0; k < 9; k++) {
        const y = 135 + k * 26;
        const c = s('circle', { cx: 120, cy: y, r: 10, class: 'ml-e' });
        e1.appendChild(c);
        const tunnels = k % 3 === 1;
        const tl = gsap.timeline({ repeat: -1, delay: k * 0.28, repeatDelay: 0.4 });
        tl.fromTo(c, { attr: { cx: 80 }, opacity: 1 }, { attr: { cx: 368 }, duration: 1.1, ease: 'none' });
        if (tunnels) {
          tl.to(c, { opacity: 0.25, duration: 0.15 })
            .to(c, { attr: { cx: 432 }, duration: 0.35, ease: 'none' })
            .to(c, { opacity: 1, duration: 0.15, onStart: () => c.classList.add('is-ghost') })
            .to(c, { attr: { cx: 720 }, duration: 1, ease: 'none' })
            .set(c, { opacity: 0, onComplete: () => c.classList.remove('is-ghost') });
        } else {
          tl.to(c, { attr: { cx: 90 }, duration: 1, ease: 'power2.out' }).to(c, { opacity: 0, duration: 0.2 });
        }
        loops.push(tl);
      }
      gsap.from([stopLbl, passLbl], { y: -10, opacity: 0, stagger: 0.8, delay: 1.2, duration: 0.5 });
    }

    // S2 · leakage current
    const g2 = s('g');
    const pipe = s('path', { d: 'M90 200 H330 M470 200 H710', class: 'ml-pipe' });
    const valveBody = s('g', null,
      s('rect', { x: -70, y: -60, width: 140, height: 120, rx: 18 }),
      s('text', { x: 0, y: 12, 'text-anchor': 'middle', class: 'ml-off' }, 'OFF'));
    const valve = s('g', { class: 'ml-valve', transform: 'translate(400 200)' }, valveBody); // (jiggle the body, not the positioned group)
    const drops = s('g', { class: 'ml-drops' });
    const meterBg = s('rect', { x: 250, y: 320, width: 300, height: 26, rx: 13, class: 'ml-meter-bg' });
    const meter = s('rect', { x: 250, y: 320, width: 0, height: 26, rx: 13, class: 'ml-meter' });
    const meterLbl = s('text', { x: 400, y: 385, 'text-anchor': 'middle', class: 'ml-sub' }, t({ ar: 'طاقة ضايعة ⚡ ← حرارة', en: 'wasted energy ⚡ → heat' }));
    g2.append(title({ ar: 'المشكلة 3: تيار التسرّب', en: 'Problem 3: leakage current' }), pipe, valve, drops, meterBg, meter, meterLbl);
    groups.push(g2);
    function play2() {
      RV.dom.clear(drops);
      for (let k = 0; k < 6; k++) {
        const d = s('path', { d: 'M0 -8 C 6 0, 6 8, 0 8 C -6 8, -6 0, 0 -8 Z', class: 'ml-drop', transform: `translate(${370 + k * 12} 262)` });
        drops.appendChild(d);
        loops.push(gsap.fromTo(d, { y: 0, opacity: 1 }, { y: 50, opacity: 0, duration: 0.9, repeat: -1, delay: k * 0.18, ease: 'power1.in' }));
      }
      loops.push(gsap.fromTo(meter, { attr: { width: 0 } }, { attr: { width: 300 }, duration: 5, ease: 'none', repeat: -1 }));
      loops.push(gsap.fromTo(valveBody, { x: -1.5 }, { x: 1.5, duration: 0.08, repeat: -1, yoyo: true }));
    }

    // S3 · heat + the trade-off seesaw
    const g3 = s('g');
    const chip = s('rect', { x: 120, y: 210, width: 170, height: 170, rx: 16, class: 'ml-hotchip' });
    const waves = s('g', { class: 'ml-waves' });
    for (let k = 0; k < 3; k++) waves.appendChild(s('path', { d: `M${150 + k * 45} 190 q 12 -20 0 -40 q -12 -20 0 -40`, class: 'ml-wave' }));
    const thermo = s('g', null, s('rect', { x: 330, y: 150, width: 26, height: 210, rx: 13, class: 'ml-th-bg' }), s('rect', { x: 336, y: 350, width: 14, height: 4, rx: 7, class: 'ml-th', id: 'thFill' }), s('circle', { cx: 343, cy: 372, r: 20, class: 'ml-th-bulb' }));
    const beamG = s('g', { transform: 'translate(590 300)' });
    const beam = s('g', null,
      s('rect', { x: -170, y: -6, width: 340, height: 12, rx: 6, class: 'ml-beam' }),
      s('g', { transform: 'translate(-140 -40)' }, s('rect', { x: -60, y: -30, width: 120, height: 56, rx: 12, class: 'ml-pan ml-pan-a' }), s('text', { x: 0, y: 6, 'text-anchor': 'middle', class: 'ml-pan-t' }, t({ ar: 'أداء أعلى ⬆', en: 'more speed ⬆' }))),
      s('g', { transform: 'translate(140 -40)' }, s('rect', { x: -60, y: -30, width: 120, height: 56, rx: 12, class: 'ml-pan ml-pan-b' }), s('text', { x: 0, y: 6, 'text-anchor': 'middle', class: 'ml-pan-t' }, t({ ar: 'طاقة أقل ⬇', en: 'less power ⬇' }))));
    beamG.append(beam, s('path', { d: 'M-22 40 L0 6 L22 40 Z', class: 'ml-fulcrum' }));
    const cant = s('text', { x: 590, y: 420, 'text-anchor': 'middle', class: 'ml-warn' }, t({ ar: 'صعب نكسب الاتنين مع بعض!', en: "Hard to win both at once!" }));
    g3.append(title({ ar: 'النتيجة: حرارة + صعب نجمع الأداء والطاقة', en: 'Result: heat + a performance/power trade-off' }), chip, waves, thermo, beamG, cant);
    groups.push(g3);
    function play3() {
      const th = g3.querySelector('#thFill');
      loops.push(gsap.fromTo(th, { attr: { y: 350, height: 4 } }, { attr: { y: 165, height: 189 }, duration: 2.4, ease: 'power2.in' }));
      loops.push(gsap.fromTo(chip, { fill: 'rgba(56,189,248,.25)' }, { fill: 'rgba(251,113,133,.55)', duration: 2.4 }));
      Array.from(waves.children).forEach((w, k) => loops.push(gsap.fromTo(w, { y: 10, opacity: 0 }, { y: -30, opacity: 1, duration: 1.4, repeat: -1, delay: k * 0.4, ease: 'sine.out' })));
      loops.push(gsap.fromTo(beam, { rotation: -14, svgOrigin: '0 0' }, { rotation: 14, svgOrigin: '0 0', duration: 1.3, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
      gsap.from(cant, { opacity: 0, y: 10, delay: 1.5, duration: 0.5 });
    }

    svg.append(...groups);
    groups.forEach((g) => gsap.set(g, { autoAlpha: 0 }));
    const players = [play0, play1, play2, play3];
    let cur = -1;
    return {
      beat(i) {
        if (i === cur) return;
        cur = i;
        loops.splice(0).forEach((l) => l.kill());
        showOnly(groups, i);
        api.sound.play('whoosh');
        (players[i] || play3)();
      },
    };
  });

  /* ───────────────────────── mooreParallel ───────────────────────── */
  K.defineAnim('mooreParallel', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 460);
    const COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#fb923c', '#60a5fa', '#4ade80'];
    const loops = [];

    const gA = s('g');
    const lane = (y, label) => s('g', null, s('text', { x: 400, y: y - 40, 'text-anchor': 'middle', class: 'mp-lbl' }, t(label)));
    const one = lane(120, { ar: 'نواة واحدة — المهام ورا بعض', en: 'One core — tasks one after another' });
    const many = lane(290, { ar: '4 أنوية — المهام في نفس الوقت', en: '4 cores — tasks at the same time' });
    const core1 = s('rect', { x: 340, y: 95, width: 120, height: 50, rx: 10, class: 'mp-core' });
    const coresN = [0, 1, 2, 3].map((k) => s('rect', { x: 190 + k * 110, y: 270, width: 90, height: 44, rx: 10, class: 'mp-core' }));
    const time1 = s('text', { x: 700, y: 128, 'text-anchor': 'middle', class: 'mp-time mono' }, '0.0s');
    const time4 = s('text', { x: 700, y: 300, 'text-anchor': 'middle', class: 'mp-time mono' }, '0.0s');
    const tasks1 = s('g'), tasks4 = s('g');
    const speed = s('text', { x: 400, y: 410, 'text-anchor': 'middle', class: 'mp-win' }, t({ ar: '⚡ أسرع 4 مرات!', en: '⚡ 4× faster!' }));
    gA.append(one, many, core1, ...coresN, time1, time4, tasks1, tasks4, speed);

    const gB = s('g');
    const atom = s('g', { class: 'mp-atom' });
    atom.appendChild(K.svgIcon('atom', 400, 210, 220));
    gB.append(atom, s('text', { x: 400, y: 400, 'text-anchor': 'middle', class: 'mp-lbl' }, t({ ar: 'الحواسب الكمومية: مبنية على ميكانيكا الكم', en: 'Quantum computers: built on quantum mechanics' })));
    svg.append(gA, gB);
    gsap.set(gB, { autoAlpha: 0 });

    function race() {
      loops.splice(0).forEach((l) => l.kill());
      RV.dom.clear(tasks1); RV.dom.clear(tasks4);
      gsap.set(speed, { autoAlpha: 0 });
      const per = 0.45;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      const clock1 = { v: 0 }, clock4 = { v: 0 };
      tl.fromTo(clock1, { v: 0 }, { v: 8 * per, duration: 8 * per, ease: 'none', onUpdate: () => { time1.textContent = clock1.v.toFixed(1) + 's'; } }, 0);
      tl.fromTo(clock4, { v: 0 }, { v: 2 * per, duration: 2 * per, ease: 'none', onUpdate: () => { time4.textContent = clock4.v.toFixed(1) + 's'; } }, 0);
      for (let k = 0; k < 8; k++) {
        const a = s('rect', { x: 40 + k * 0, y: 104, width: 32, height: 32, rx: 7, fill: COLORS[k] });
        tasks1.appendChild(a);
        tl.fromTo(a, { attr: { x: 40 - k * 36 + 250 }, opacity: k < 6 ? 1 : 0 }, { attr: { x: 384 }, opacity: 1, duration: 0.25, ease: 'power2.in' }, k * per)
          .to(a, { attr: { x: 760 }, opacity: 0, duration: 0.25, ease: 'power2.out' }, k * per + per - 0.1);
        const b = s('rect', { x: 0, y: 276, width: 32, height: 32, rx: 7, fill: COLORS[k] });
        tasks4.appendChild(b);
        const core = k % 4, round = Math.floor(k / 4);
        tl.fromTo(b, { attr: { x: 60, y: 276 }, opacity: 0 }, { attr: { x: 219 + core * 110, y: 276 }, opacity: 1, duration: 0.25, ease: 'power2.in' }, round * per)
          .to(b, { attr: { y: 360 }, opacity: 0, duration: 0.25 }, round * per + per - 0.1);
      }
      tl.to(speed, { autoAlpha: 1, duration: 0.3 }, 2 * per)
        .fromTo(speed, { scale: 0.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(3)' }, 2 * per);
      [core1, ...coresN].forEach((c) => c.classList.add('is-busy'));
      loops.push(tl);
    }
    function quantum() {
      loops.splice(0).forEach((l) => l.kill());
      loops.push(gsap.to(atom, { rotation: 360, svgOrigin: '400 210', duration: 8, repeat: -1, ease: 'none' }));
      loops.push(gsap.fromTo(atom, { scale: 0.92, svgOrigin: '400 210' }, { scale: 1.06, svgOrigin: '400 210', duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
    }

    return {
      beat(i) {
        showOnly([gA, gB], i ? 1 : 0);
        i ? quantum() : race();
      },
    };
  });
})();

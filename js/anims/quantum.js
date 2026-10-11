/* =========================================================
 * anims/quantum.js — bitQubit
 *   beat 0: classical bit — a switch that is EITHER 0 OR 1
 *   beat 1: qubit — Bloch sphere arrow sweeping: 0 AND 1 together (superposition)
 *   beat 2: power — n qubits hold 2ⁿ states at once (counter + state grid)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  K.defineAnim('bitQubit', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 460);

    // --- classical bit (left) ---
    const bitG = s('g', { transform: 'translate(200 220)' });
    const bitBox = s('rect', { x: -90, y: -90, width: 180, height: 180, rx: 28, class: 'qb-bitbox' });
    const bitVal = s('text', { x: 0, y: 34, 'text-anchor': 'middle', class: 'qb-bitval mono' }, '0');
    const bulb = s('circle', { cx: 0, cy: -130, r: 18, class: 'qb-bulb' });
    bitG.append(bulb, bitBox, bitVal, s('text', { x: 0, y: 140, 'text-anchor': 'middle', class: 'qb-lbl' }, t({ ar: 'بِت: 0 أو 1', en: 'bit: 0 OR 1' })));

    // --- qubit (right) ---
    const qG = s('g', { transform: 'translate(590 220)' });
    const sphere = s('circle', { cx: 0, cy: 0, r: 110, class: 'qb-sphere' });
    const eq = s('ellipse', { cx: 0, cy: 0, rx: 110, ry: 30, class: 'qb-eq' });
    const axis = s('line', { x1: 0, y1: -120, x2: 0, y2: 120, class: 'qb-axis' });
    const k0 = s('text', { x: 0, y: -128, 'text-anchor': 'middle', class: 'qb-ket mono' }, '|0⟩');
    const k1 = s('text', { x: 0, y: 148, 'text-anchor': 'middle', class: 'qb-ket mono' }, '|1⟩');
    const arrow = s('g', { class: 'qb-arrow' }, s('line', { x1: 0, y1: 0, x2: 0, y2: -100 }), s('circle', { cx: 0, cy: -100, r: 9 }));
    const glow = s('circle', { cx: 0, cy: 0, r: 110, class: 'qb-glow' });
    qG.append(glow, sphere, eq, axis, k0, k1, arrow, s('text', { x: 0, y: 185, 'text-anchor': 'middle', class: 'qb-lbl' }, t({ ar: 'كيوبت: 0 و 1 مع بعض', en: 'qubit: 0 AND 1 together' })));
    const sceneA = s('g', null, bitG, qG);

    // --- power scene ---
    const sceneB = s('g');
    const nTxt = s('text', { x: 400, y: 90, 'text-anchor': 'middle', class: 'qb-big mono' }, '1');
    const nLbl = s('text', { x: 400, y: 125, 'text-anchor': 'middle', class: 'qb-lbl' }, t({ ar: 'كيوبت', en: 'qubits' }));
    const stTxt = s('text', { x: 400, y: 420, 'text-anchor': 'middle', class: 'qb-big2 mono' }, '2');
    const stLbl = s('text', { x: 400, y: 450, 'text-anchor': 'middle', class: 'qb-lbl' }, t({ ar: 'حالة في نفس اللحظة', en: 'states at the same moment' }));
    const grid = s('g');
    const cells = [];
    for (let r = 0; r < 8; r++) for (let c = 0; c < 32; c++) { const cell = s('rect', { x: 80 + c * 20, y: 160 + r * 26, width: 16, height: 20, rx: 4, class: 'qb-cell' }); grid.appendChild(cell); cells.push(cell); }
    sceneB.append(nTxt, nLbl, grid, stTxt, stLbl);
    svg.append(sceneA, sceneB);
    gsap.set(sceneB, { autoAlpha: 0 });

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function bitLoop() {
      const tl = gsap.timeline({ repeat: -1 });
      [1, 0].forEach((v) => {
        tl.to(bitBox, { scaleX: 0, svgOrigin: '0 0', duration: 0.18, ease: 'power2.in' }, '+=0.9')
          .add(() => { bitVal.textContent = String(v); bitG.classList.toggle('on', v === 1); })
          .to(bitBox, { scaleX: 1, svgOrigin: '0 0', duration: 0.18, ease: 'power2.out' });
      });
      loops.push(tl);
    }
    function qubitLoop() {
      loops.push(gsap.to(arrow, { rotation: 360, svgOrigin: '0 0', duration: 3.2, repeat: -1, ease: 'sine.inOut' }));
      loops.push(gsap.fromTo(glow, { opacity: 0.15, scale: 0.95, svgOrigin: '0 0' }, { opacity: 0.5, scale: 1.08, svgOrigin: '0 0', duration: 1.2, repeat: -1, yoyo: true }));
      loops.push(gsap.to(eq, { attr: { ry: 50 }, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
    }
    function powerRun() {
      gsap.set(cells, { opacity: 0.12 });
      const st = { n: 1 };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      for (let n = 1; n <= 8; n++) {
        tl.add(() => {
          nTxt.textContent = n;
          stTxt.textContent = (2 ** n).toLocaleString('en-US');
          const lit = Math.min(cells.length, 2 ** n);
          gsap.to(cells.slice(0, lit), { opacity: 1, duration: 0.25, stagger: { amount: 0.25 } });
          gsap.fromTo(stTxt, { scale: 1.4, svgOrigin: '400 410' }, { scale: 1, svgOrigin: '400 410', duration: 0.35 });
          api.sound.play('pop');
        }, (n - 1) * 0.75);
      }
      tl.add(() => { nTxt.textContent = '50'; stTxt.textContent = '1,125,899,906,842,624'; gsap.fromTo(stTxt, { scale: 0.6, svgOrigin: '400 410' }, { scale: 1, svgOrigin: '400 410', duration: 0.8, ease: 'elastic.out(1,.4)' }); }, '+=0.8');
      tl.add(() => gsap.set(cells, { opacity: 0.12 }), '+=1.5');
      loops.push(tl);
      st.n = 1;
    }

    return {
      beat(i) {
        kill();
        if (i <= 1) {
          gsap.to(sceneA, { autoAlpha: 1, duration: 0.4 });
          gsap.to(sceneB, { autoAlpha: 0, duration: 0.3 });
          bitLoop();
          gsap.to(qG, { opacity: i === 0 ? 0.25 : 1, duration: 0.4 });
          gsap.to(bitG, { opacity: i === 1 ? 0.5 : 1, duration: 0.4 });
          if (i === 1) qubitLoop();
        } else {
          gsap.to(sceneA, { autoAlpha: 0, duration: 0.3 });
          gsap.to(sceneB, { autoAlpha: 1, duration: 0.4 });
          powerRun();
        }
      },
    };
  });
})();

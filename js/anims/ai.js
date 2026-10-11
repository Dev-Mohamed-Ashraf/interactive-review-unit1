/* =========================================================
 * anims/ai.js — how AI works.
 *   nestedCircles : AI ⊃ ML ⊃ DL ⊃ GenAI; beat i spotlights ring i, last beat = whole map
 *   spamTrainer   : rules vs learning — hand-written rule fails; model learns word
 *                   weights from labelled emails, then classifies new ones
 *   neuralNet     : layers → signals flow → training reshapes weights → deep + big data
 *   genAI         : prompt → new text / image / audio → hallucination → verify
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── nestedCircles ───────────────────────── */
  K.defineAnim('nestedCircles', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 520);
    const C = { x: 400, y: 270 };
    const rings = [
      { r: 240, color: '#38bdf8', name: { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' }, code: 'AI', ex: [['mic', { ar: 'التعرف على الكلام', en: 'speech' }], ['image', { ar: 'التعرف على الصور', en: 'images' }], ['translate', { ar: 'الترجمة', en: 'translation' }]] },
      { r: 180, color: '#a78bfa', name: { ar: 'التعلّم الآلي', en: 'Machine Learning' }, code: 'ML', ex: [['mail', { ar: 'فلتر السبام', en: 'spam filter' }], ['cart', { ar: 'التوصيات', en: 'recommendations' }]] },
      { r: 122, color: '#34d399', name: { ar: 'التعلّم العميق', en: 'Deep Learning' }, code: 'DL', ex: [['network', { ar: 'شبكات عصبية', en: 'neural nets' }], ['car', { ar: 'صور القيادة الذاتية', en: 'self-driving vision' }]] },
      { r: 66, color: '#fbbf24', name: { ar: 'التوليدي', en: 'Generative AI' }, code: 'GenAI', ex: [['sparkle', { ar: 'ChatGPT', en: 'ChatGPT' }], ['image', { ar: 'توليد صور', en: 'image gen' }]] },
    ];
    const groups = rings.map((R, i) => {
      const g = s('g', { class: 'nc-ring' });
      const circle = s('circle', { cx: C.x, cy: C.y, r: R.r, fill: R.color, 'fill-opacity': 0.1, stroke: R.color, 'stroke-width': 3 });
      const label = s('text', { x: C.x, y: C.y - R.r + 30, 'text-anchor': 'middle', class: 'nc-label', fill: R.color }, t(R.name));
      const code = s('text', { x: C.x, y: C.y - R.r + 52, 'text-anchor': 'middle', class: 'nc-code', fill: R.color }, R.code);
      g.append(circle, label, code);
      if (i === 3) { label.setAttribute('y', C.y + 2); code.setAttribute('y', C.y + 24); }
      return { g, circle, label, code, R };
    });
    // example chips orbiting the spotlighted ring
    const exG = s('g', { class: 'nc-examples' });
    const formula = s('text', { x: C.x, y: 510, 'text-anchor': 'middle', class: 'nc-formula' }, 'AI ⊃ ML ⊃ DL ⊃ GenAI');
    svg.append(...groups.map((x) => x.g), exG, formula);
    gsap.set(groups.map((x) => x.g), { autoAlpha: 0 });
    gsap.set(formula, { autoAlpha: 0 });
    let shown = -1;
    const loops = [];

    function examples(i) {
      loops.splice(0).forEach((l) => l.kill());
      RV.dom.clear(exG);
      const R = rings[i];
      R.ex.forEach(([icon, label], k) => {
        const ang = -Math.PI / 2 + ((k + 1) / (R.ex.length + 1)) * Math.PI * 2 * 0.5 + Math.PI * 0.25;
        const rr = i === 3 ? 120 : R.r - 34;
        const x = C.x + Math.cos(ang) * rr * 1.05, y = C.y + Math.sin(ang) * rr * 0.75 + 30;
        const chip = s('g', { class: 'nc-chip', transform: `translate(${x} ${y})` },
          s('rect', { x: -78, y: -20, width: 156, height: 40, rx: 20, fill: R.color }),
          K.svgIcon(icon, -56, 0, 20, { class: 'svg-ico nc-chip-ico' }),
          s('text', { x: 8, y: 6, 'text-anchor': 'middle', class: 'nc-chip-t' }, t(label)));
        exG.appendChild(chip);
        gsap.from(chip, { scale: 0, opacity: 0, svgOrigin: `${x} ${y}`, duration: 0.5, delay: 0.3 + k * 0.15, ease: 'back.out(2.4)' });
        loops.push(gsap.to(chip, { y: '+=6', duration: 1.4 + k * 0.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 }));
      });
    }

    return {
      beat(i) {
        const k = Math.min(i, 3);
        groups.forEach((x, j) => {
          if (j <= k && j > shown) gsap.fromTo(x.g, { autoAlpha: 0, scale: 0.6, svgOrigin: `${C.x} ${C.y}` }, { autoAlpha: 1, scale: 1, svgOrigin: `${C.x} ${C.y}`, duration: 0.7, ease: 'back.out(1.6)' });
          if (j > k) gsap.to(x.g, { autoAlpha: 0, duration: 0.2 });
          gsap.to(x.circle, { attr: { 'fill-opacity': j === k && i <= 3 ? 0.28 : 0.08, 'stroke-width': j === k && i <= 3 ? 6 : 3 }, duration: 0.4 });
        });
        if (i <= 3) { examples(k); gsap.to(formula, { autoAlpha: 0, duration: 0.2 }); api.sound.play('pop'); }
        else {
          loops.splice(0).forEach((l) => l.kill()); RV.dom.clear(exG);
          gsap.to(formula, { autoAlpha: 1, duration: 0.4 });
          gsap.from(formula, { scale: 0.6, svgOrigin: '400 500', duration: 0.6, ease: 'back.out(2)' });
          groups.forEach((x, j) => gsap.fromTo(x.circle, { attr: { 'fill-opacity': 0.08 } }, { attr: { 'fill-opacity': 0.3 }, duration: 0.4, delay: j * 0.25, yoyo: true, repeat: 1 }));
        }
        shown = Math.max(shown, k);
      },
    };
  });

  /* ───────────────────────── spamTrainer ───────────────────────── */
  K.defineAnim('spamTrainer', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const TRAIN = [
      { txt: { ar: '🎁 مبروك! كسبت جايزة مجانية', en: '🎁 Congrats! You won a FREE prize' }, spam: true, words: ['prize', 'free'] },
      { txt: { ar: 'ميعاد درس الكيمياء بكرة', en: 'Chemistry lesson tomorrow' }, spam: false, words: ['lesson'] },
      { txt: { ar: '💰 اربح فلوس من البيت مجانًا', en: '💰 Earn money from home, free' }, spam: true, words: ['money', 'free'] },
      { txt: { ar: 'صورة الرحلة من ماما', en: 'Trip photo from mum' }, spam: false, words: ['photo'] },
      { txt: { ar: '⚡ اضغط هنا واكسب جايزة', en: '⚡ Click here to win a prize' }, spam: true, words: ['click', 'prize'] },
      { txt: { ar: 'واجب البرمجة مرفق', en: 'Programming homework attached' }, spam: false, words: ['lesson'] },
    ];
    const TEST = [
      { txt: { ar: 'جايزة مجانية مستنياك 🎉', en: 'A free prize is waiting 🎉' }, spam: true },
      { txt: { ar: 'ملخص درس الفيزياء', en: 'Physics lesson summary' }, spam: false },
      { txt: { ar: 'فلوس سهلة! اضغط الآن', en: 'Easy money! Click now' }, spam: true },
    ];
    const WORDS = [
      ['free', { ar: 'مجاني', en: 'free' }], ['prize', { ar: 'جايزة', en: 'prize' }], ['money', { ar: 'فلوس', en: 'money' }],
      ['click', { ar: 'اضغط', en: 'click' }], ['lesson', { ar: 'درس', en: 'lesson' }], ['photo', { ar: 'صورة', en: 'photo' }],
    ];

    // --- rules panel ---
    const ruleCode = h('pre', { class: 'st-code mono' }, 'if "free" in email:\n    → spam');
    const trick = h('div', { class: 'st-mail' }, '📧 ', t({ ar: 'جايزة fr€e مستنياك!', en: 'A fr€e prize awaits!' }));
    const trickRes = h('div', { class: 'st-verdict bad' }, t({ ar: '✗ القاعدة فشلت — عدّى على إنه سليم!', en: '✗ Rule failed — marked as safe!' }));
    const rules = h('div', { class: 'st-rules' }, h('h4', null, '✍️ ', t({ ar: 'قواعد مكتوبة بإيد المبرمج', en: 'Rules written by hand' })), ruleCode, trick, trickRes);

    // --- learning panel ---
    const inbox = h('div', { class: 'st-bin' }, h('b', null, '📥 ', t({ ar: 'سليم', en: 'Safe' })));
    const spamBin = h('div', { class: 'st-bin spam' }, h('b', null, '🚫 ', t({ ar: 'سبام', en: 'Spam' })));
    const queue = h('div', { class: 'st-queue' });
    const weights = {};
    const wBars = h('div', { class: 'st-weights' }, h('h5', null, '🧠 ', t({ ar: 'اللي النموذج اتعلمه', en: 'What the model learned' })),
      WORDS.map(([k, label]) => {
        const bar = h('i');
        weights[k] = { v: 0, bar };
        return h('div', { class: 'st-w' }, h('span', null, t(label)), h('div', { class: 'st-w-track' }, bar));
      }));
    const learn = h('div', { class: 'st-learn' }, queue, h('div', { class: 'st-bins' }, inbox, spamBin), wBars);
    const testBox = h('div', { class: 'st-test' });
    const wrap = h('div', { class: 'st-wrap' }, rules, learn, testBox);
    const fitHost = h('div', { class: 'st-fit' }, wrap);
    stage.appendChild(fitHost);
    const refit = api.fitBox(fitHost, wrap, { min: 0.6 }); // all mails, bins and bars always on screen

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    function setW(k, v) {
      weights[k].v = v;
      gsap.to(weights[k].bar, { width: Math.abs(v) * 100 + '%', backgroundColor: v > 0 ? '#fb7185' : '#34d399', duration: 0.5 });
    }

    function playRules() {
      kill();
      rules.hidden = false; learn.hidden = true; testBox.hidden = true;
      wrap.classList.remove('has-test'); refit();
      const tl = gsap.timeline();
      tl.from(ruleCode, { opacity: 0, y: 10, duration: 0.4 })
        .from(trick, { x: -60, opacity: 0, duration: 0.6, ease: 'power3.out' }, '+=0.4')
        .fromTo(trickRes, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)', onStart: () => api.sound.play('bad') }, '+=0.4');
      loops.push(tl);
    }
    function playTrain() {
      kill();
      rules.hidden = true; learn.hidden = false; testBox.hidden = true;
      wrap.classList.remove('has-test');
      RV.dom.clear(queue);
      Array.from(inbox.querySelectorAll('.st-mail')).concat(Array.from(spamBin.querySelectorAll('.st-mail'))).forEach((m) => m.remove());
      WORDS.forEach(([k]) => setW(k, 0));
      const tl = gsap.timeline({ delay: 0.3 });
      TRAIN.forEach((m, i) => {
        const el = h('div', { class: 'st-mail' + (m.spam ? ' is-spam' : '') }, '📧 ', t(m.txt));
        tl.add(() => {
          queue.replaceChildren(el);
          refit();
          gsap.fromTo(el, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
        }, i * 1.1)
          .add(() => {
            const bin = m.spam ? spamBin : inbox;
            const from = el.getBoundingClientRect();
            bin.appendChild(el);
            refit(false);
            const to = el.getBoundingClientRect();
            const k = gsap.getProperty(wrap, 'scale') || 1; // the board may be shrunk to fit
            gsap.from(el, { x: (from.left - to.left) / k, y: (from.top - to.top) / k, duration: 0.5, ease: 'power3.inOut' });
            api.sound.play(m.spam ? 'beep' : 'pop');
            m.words.forEach((w) => setW(w, Math.max(-1, Math.min(1, weights[w].v + (m.spam ? 0.5 : -0.5)))));
          }, i * 1.1 + 0.55);
      });
      loops.push(tl);
    }
    function playTest() {
      kill();
      rules.hidden = true; learn.hidden = false; testBox.hidden = false;
      wrap.classList.add('has-test');
      // came here before training finished (fast tapping)? show the fully trained model, never a half-empty one
      if (inbox.querySelectorAll('.st-mail').length + spamBin.querySelectorAll('.st-mail').length < TRAIN.length) {
        RV.dom.clear(queue);
        Array.from(inbox.querySelectorAll('.st-mail')).concat(Array.from(spamBin.querySelectorAll('.st-mail'))).forEach((m) => m.remove());
        WORDS.forEach(([k]) => { weights[k].v = 0; });
        TRAIN.forEach((m) => {
          (m.spam ? spamBin : inbox).appendChild(h('div', { class: 'st-mail' + (m.spam ? ' is-spam' : '') }, '📧 ', t(m.txt)));
          m.words.forEach((w) => { weights[w].v = Math.max(-1, Math.min(1, weights[w].v + (m.spam ? 0.5 : -0.5))); });
        });
        WORDS.forEach(([k]) => setW(k, weights[k].v));
      }
      RV.dom.clear(testBox);
      testBox.appendChild(h('h5', null, '🧪 ', t({ ar: 'إيميلات جديدة ماشافهاش قبل كده', en: 'New emails it has never seen' })));
      TEST.forEach((m, i) => {
        const pct = m.spam ? 90 + i * 3 : 8;
        const row = h('div', { class: 'st-trow' }, h('span', null, '📧 ', t(m.txt)),
          h('b', { class: m.spam ? 'bad' : 'ok' }, m.spam ? t({ ar: `سبام ${pct}%`, en: `spam ${pct}%` }) : t({ ar: 'سليم ✓', en: 'safe ✓' })));
        testBox.appendChild(row);
        gsap.from(row, { x: 40, opacity: 0, delay: 0.3 + i * 0.5, duration: 0.45, ease: 'power3.out', onStart: () => api.sound.play(m.spam ? 'beep' : 'pop') });
      });
      refit();
    }

    return { beat(i) { if (i === 0) playRules(); else if (i === 1) playTrain(); else playTest(); } };
  });

  /* ───────────────────────── neuralNet ───────────────────────── */
  K.defineAnim('neuralNet', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 480);
    const layerXs = [140, 300, 460, 620];
    const sizes = [4, 6, 6, 2];
    const nodes = sizes.map((n, L) => Array.from({ length: n }, (_, k) => ({ x: layerXs[L], y: 240 + (k - (n - 1) / 2) * 62 })));
    const edgeG = s('g', { class: 'nn-edges' });
    const nodeG = s('g', { class: 'nn-nodes' });
    const edges = [];
    for (let L = 0; L < 3; L++) nodes[L].forEach((a) => nodes[L + 1].forEach((b) => {
      const w = Math.random() * 0.8 + 0.2;
      const e = s('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'nn-edge', 'stroke-width': w * 3 });
      edgeG.appendChild(e); edges.push({ e, a, b, L, w });
    }));
    const nodeEls = nodes.flat().map((n) => { const c = s('circle', { cx: n.x, cy: n.y, r: 16, class: 'nn-node' }); nodeG.appendChild(c); return c; });
    const labels = s('g', { class: 'nn-labels' },
      s('text', { x: 140, y: 470, 'text-anchor': 'middle' }, t({ ar: 'طبقة الإدخال', en: 'input' })),
      s('text', { x: 380, y: 470, 'text-anchor': 'middle' }, t({ ar: 'طبقات مخفية', en: 'hidden layers' })),
      s('text', { x: 620, y: 470, 'text-anchor': 'middle' }, t({ ar: 'الإخراج', en: 'output' })));
    const inputImg = s('g', { transform: 'translate(40 240)' }, s('rect', { x: -30, y: -30, width: 60, height: 60, rx: 10, class: 'nn-img' }));
    inputImg.appendChild(K.svgIcon('image', 0, 0, 34));
    const outA = s('text', { x: 660, y: nodes[3][0].y + 6, class: 'nn-out' }, t({ ar: 'قطة 🐱', en: 'cat 🐱' }));
    const outB = s('text', { x: 660, y: nodes[3][1].y + 6, class: 'nn-out dim' }, t({ ar: 'كلب 🐶', en: 'dog 🐶' }));
    const pctA = s('text', { x: 760, y: nodes[3][0].y + 6, class: 'nn-pct mono', 'text-anchor': 'end' }, '50%');
    const deepNote = s('text', { x: 400, y: 40, 'text-anchor': 'middle', class: 'nn-note' }, t({ ar: '«عميق» = طبقات مخفية كتير + بيانات ضخمة 📚', en: '"Deep" = many hidden layers + big data 📚' }));
    const dataStack = s('g', { class: 'nn-data' });
    for (let k = 0; k < 8; k++) dataStack.appendChild(s('rect', { x: 20 + k * 4, y: 110 - k * 6, width: 50, height: 36, rx: 6 }));
    svg.append(edgeG, nodeG, labels, inputImg, outA, outB, pctA, deepNote, dataStack);
    gsap.set([outA, outB, pctA, deepNote, dataStack, inputImg], { autoAlpha: 0 });
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function build() {
      gsap.from(nodeEls, { scale: 0, svgOrigin: '400 240', stagger: 0.03, duration: 0.4, ease: 'back.out(2)' });
      gsap.fromTo(edges.map((x) => x.e), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, stagger: 0.004, delay: 0.3 });
    }
    function pulses(n) {
      for (let k = 0; k < n; k++) {
        const path = [];
        let cur = nodes[0][(Math.random() * 4) | 0];
        for (let L = 0; L < 3; L++) { const nx = nodes[L + 1][(Math.random() * nodes[L + 1].length) | 0]; path.push([cur, nx]); cur = nx; }
        const dot = s('circle', { r: 6, cx: path[0][0].x, cy: path[0][0].y, class: 'nn-pulse' });
        svg.appendChild(dot);
        const tl = gsap.timeline({ repeat: -1, delay: k * 0.35, repeatDelay: 0.3 });
        path.forEach(([a, b]) => tl.fromTo(dot, { attr: { cx: a.x, cy: a.y } }, { attr: { cx: b.x, cy: b.y }, duration: 0.45, ease: 'power1.inOut' }));
        loops.push(tl);
        loops.push({ kill: () => dot.remove() });
      }
    }
    function train() {
      gsap.to(inputImg, { autoAlpha: 1, duration: 0.3 });
      gsap.to([outA, outB, pctA], { autoAlpha: 1, duration: 0.3 });
      const st = { p: 50 };
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      tl.to(st, { p: 96, duration: 3, ease: 'power2.out', onUpdate: () => { pctA.textContent = Math.round(st.p) + '%'; } })
        .add(() => { edges.forEach((x) => { x.w = Math.random(); gsap.to(x.e, { attr: { 'stroke-width': 0.4 + x.w * 4 }, duration: 1.5 }); }); }, 0)
        .to(st, { p: 50, duration: 0.01 }, '+=1');
      loops.push(tl);
    }
    function deep() {
      gsap.to([deepNote, dataStack], { autoAlpha: 1, duration: 0.4 });
      gsap.from(dataStack.children, { y: -40, opacity: 0, stagger: 0.08, duration: 0.4 });
      loops.push(gsap.fromTo(nodeEls, { attr: { r: 16 } }, { attr: { r: 19 }, duration: 0.5, stagger: { each: 0.02, repeat: -1, yoyo: true } }));
    }
    let built = false;
    return {
      beat(i) {
        kill();
        if (!built) { built = true; build(); }
        gsap.set([deepNote, dataStack], { autoAlpha: 0 });
        if (i >= 1) pulses(6);
        if (i >= 2) train(); else gsap.set([outA, outB, pctA, inputImg], { autoAlpha: 0 });
        if (i >= 3) deep();
      },
    };
  });

  /* ───────────────────────── genAI ───────────────────────── */
  K.defineAnim('genAI', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const prompt = h('div', { class: 'ga-prompt' }, h('span', { class: 'ga-caret' }));
    const sendBtn = h('div', { class: 'ga-send' }, api.icon('arrowNext', 'flip-rtl'));
    const promptRow = h('div', { class: 'ga-prompt-row' }, h('span', { class: 'ga-you' }, '👤'), prompt, sendBtn);
    const brain = h('div', { class: 'ga-brain' }, api.icon('sparkle'), h('span', null, 'GenAI'));
    const outText = h('div', { class: 'ga-out ga-text' });
    const imgSvg = s('svg', { viewBox: '0 0 200 140', class: 'ga-img' },
      s('rect', { x: 0, y: 0, width: 200, height: 140, rx: 12, class: 'ga-sky' }),
      s('circle', { cx: 160, cy: 30, r: 16, class: 'ga-sun' }),
      s('path', { d: 'M0 110 Q 50 80 100 105 T 200 100 V140 H0 Z', class: 'ga-hill' }),
      s('g', { class: 'ga-cat', transform: 'translate(80 92)' }, s('ellipse', { cx: 0, cy: 0, rx: 22, ry: 14 }), s('circle', { cx: 20, cy: -12, r: 11 }), s('path', { d: 'M13 -21 l3 -9 l5 7 M23 -22 l5 -8 l3 9' }), s('path', { d: 'M-20 -2 q -14 -10 -6 -24', class: 'ga-tail' })),
      s('circle', { cx: 125, cy: 104, r: 9, class: 'ga-ball' }));
    const outImg = h('div', { class: 'ga-out ga-image' }, imgSvg);
    const wave = h('div', { class: 'ga-out ga-audio' }, Array.from({ length: 28 }, () => h('i')));
    const outs = h('div', { class: 'ga-outs' }, outText, outImg, wave);
    const chat = h('div', { class: 'ga-chat' });
    const stamp = h('div', { class: 'ga-stamp' }, t({ ar: 'هلوسة! ✗', en: 'Hallucination! ✗' }));
    const verify = h('div', { class: 'ga-verify' }, api.icon('search'), h('span', null, t({ ar: 'المصدر الرسمي: برج القاهرة افتُتح سنة 1961 ✓', en: 'Official source: Cairo Tower opened in 1961 ✓' })));
    const halluc = h('div', { class: 'ga-halluc' }, chat, stamp, verify);
    stage.appendChild(h('div', { class: 'ga-wrap' }, promptRow, brain, outs, halluc));

    const loops = [];
    let epoch = 0; // bumps on every beat; stale callbacks compare and bail out
    const kill = () => { epoch++; loops.splice(0).forEach((l) => l.kill()); };
    function type(el, text, cps) {
      el.textContent = '';
      const tw = RV.fx.typewriter(el, text, { cps: cps || 30 });
      loops.push(tw);
      return tw;
    }
    function ask(q, then) {
      const span = h('span');
      prompt.replaceChildren(span, h('span', { class: 'ga-caret' }));
      const tw = type(span, q, 26);
      const mine = epoch;
      tw.eventCallback('onComplete', () => {
        if (mine !== epoch) return;
        gsap.fromTo(sendBtn, { scale: 1 }, { scale: 1.3, yoyo: true, repeat: 1, duration: 0.15 });
        api.sound.play('whoosh');
        gsap.fromTo(brain, { boxShadow: '0 0 0 0 rgba(251,191,36,.8)' }, { boxShadow: '0 0 40px 10px rgba(251,191,36,0)', duration: 0.9 });
        loops.push(gsap.to(brain.querySelector('.ico'), { rotate: 360, duration: 1, ease: 'power2.inOut' }));
        api.after(700, () => { if (mine === epoch) then(); });
      });
    }
    function showText() {
      halluc.hidden = true; outs.hidden = false;
      [outImg, wave].forEach((x) => gsap.set(x, { autoAlpha: 0.15 }));
      gsap.set(outText, { autoAlpha: 1 });
      outText.textContent = '';
      ask(t({ ar: 'اكتب بيت شعر عن البحر', en: 'Write a short line about the sea' }), () =>
        type(outText, t({ ar: '🌊 يا بحرُ يا مرآةَ السماءِ… في موجِك تسكنُ الحكاياتُ', en: '🌊 O sea, mirror of the sky… in your waves the stories sleep' }), 28));
    }
    function showMedia() {
      halluc.hidden = true; outs.hidden = false;
      gsap.set(outText, { autoAlpha: 0.3 });
      ask(t({ ar: 'ارسم قطة بتلعب كورة + لحن هادي', en: 'Draw a cat playing ball + a calm tune' }), () => {
        gsap.to(outImg, { autoAlpha: 1, duration: 0.3 });
        gsap.from(imgSvg.children, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', stagger: 0.15, duration: 0.5, ease: 'back.out(2)' });
        loops.push(gsap.to(imgSvg.querySelector('.ga-ball'), { x: 18, y: -14, duration: 0.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }));
        loops.push(gsap.to(imgSvg.querySelector('.ga-tail'), { rotate: 18, transformOrigin: '100% 100%', duration: 0.4, repeat: -1, yoyo: true }));
        gsap.to(wave, { autoAlpha: 1, duration: 0.3, delay: 0.8 });
        Array.from(wave.children).forEach((b, k) => loops.push(gsap.fromTo(b, { scaleY: 0.2 }, { scaleY: 0.3 + Math.random(), duration: 0.25 + Math.random() * 0.3, repeat: -1, yoyo: true, delay: 0.8 + k * 0.02 })));
      });
    }
    function showHalluc(withVerify) {
      outs.hidden = true; halluc.hidden = false;
      gsap.set([stamp, verify], { autoAlpha: 0 });
      RV.dom.clear(chat);
      const ans = h('p');
      chat.append(h('div', { class: 'ga-q' }, t({ ar: 'برج القاهرة اتبنى إمتى؟', en: 'When was Cairo Tower built?' })), h('div', { class: 'ga-a' }, '🤖 ', ans));
      const tw = type(ans, t({ ar: 'برج القاهرة اتبنى سنة 1890 بأمر من الملك فاروق، وارتفاعه 400 متر. ✅', en: 'Cairo Tower was built in 1890 by order of King Farouk and is 400 m tall. ✅' }), 34);
      tw.eventCallback('onComplete', () => {
        gsap.fromTo(stamp, { autoAlpha: 0, scale: 2.4, rotate: -25 }, { autoAlpha: 1, scale: 1, rotate: -12, duration: 0.45, ease: 'back.out(2)' });
        api.sound.play('bad');
        if (withVerify) gsap.fromTo(verify, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.7, onStart: () => api.sound.play('ok') });
      });
    }
    return {
      beat(i) {
        kill();
        if (i === 0) showText();
        else if (i === 1) showMedia();
        else showHalluc(i >= 3);
      },
    };
  });
})();

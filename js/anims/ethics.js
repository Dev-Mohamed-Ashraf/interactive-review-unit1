/* =========================================================
 * anims/ethics.js — ethical issues with AI.
 *   biasSim        : a hiring AI. beats: biased past data → learned bias (unequal
 *                    acceptance) → fix with balanced data + testing → proxy variable trap.
 *                    Toolbar lets the class flip biased/balanced data live.
 *   privacyCam     : public cameras track faces → mass collection of behaviour data
 *   responsibility : developer / user / operator around a wrong decision
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /** Deterministic pseudo-random (same picture every time). */
  function rng(seed) { let x = seed; return () => ((x = (x * 9301 + 49297) % 233280) / 233280); }

  /* ───────────────────────── biasSim ───────────────────────── */
  K.defineAnim('biasSim', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const N = 40;
    const rand = rng(7);
    // past applicants: half group A (●), half group B (▲) — equal skill, unequal past decisions
    const past = Array.from({ length: N }, (_, i) => ({ g: i % 2 ? 'B' : 'A', hired: false }));
    const biasedRate = { A: 0.7, B: 0.15 };
    past.forEach((p) => { p.hired = rand() < biasedRate[p.g]; });

    const grid = h('div', { class: 'bs-grid' }, past.map((p) => h('span', { class: `bs-p g${p.g}` + (p.hired ? ' hired' : '') }, p.g === 'A' ? '●' : '▲')));
    const legend = h('div', { class: 'bs-legend' },
      h('span', { class: 'gA' }, '● ', t({ ar: 'مجموعة أ', en: 'Group A' })), h('span', { class: 'gB' }, '▲ ', t({ ar: 'مجموعة ب', en: 'Group B' })),
      h('span', { class: 'hired-l' }, '✓ ', t({ ar: 'اتعيّن', en: 'hired' })));
    const pastPanel = h('div', { class: 'bs-panel' }, h('h5', null, '📂 ', t({ ar: 'بيانات التدريب: قرارات التوظيف القديمة', en: 'Training data: past hiring decisions' })), grid, legend);

    const model = h('div', { class: 'bs-model' }, api.icon('brain'), h('b', null, t({ ar: 'ذكاء التوظيف', en: 'Hiring AI' })));
    const bar = (cls, label) => {
      const fill = h('i');
      const val = h('b', { class: 'mono' }, '0%');
      return { el: h('div', { class: 'bs-bar ' + cls }, h('span', null, label), h('div', { class: 'bs-track' }, fill), val), fill, val };
    };
    const barA = bar('gA', '● ' + t({ ar: 'أ', en: 'A' }));
    const barB = bar('gB', '▲ ' + t({ ar: 'ب', en: 'B' }));
    const verdict = h('div', { class: 'bs-verdict' });
    const outPanel = h('div', { class: 'bs-panel' }, h('h5', null, '🧑‍💼 ', t({ ar: 'متقدمين جداد بنفس المهارات — نسبة القبول', en: 'New applicants, equal skills — acceptance rate' })), barA.el, barB.el, verdict);

    const proxy = h('div', { class: 'bs-proxy' },
      h('div', { class: 'bs-cols' },
        h('span', { class: 'bs-col struck' }, t({ ar: 'الجنس / المجموعة', en: 'gender / group' })),
        h('span', { class: 'bs-col' }, t({ ar: 'سنين الخبرة', en: 'experience' })),
        h('span', { class: 'bs-col warn' }, t({ ar: 'اسم النادي ⚠️', en: 'club name ⚠️' }))),
      h('p', null, t({ ar: 'شلنا عمود «المجموعة»… بس «اسم النادي» مرتبط بيها فبيرجّع التحيز من الباب الخلفي = متغيّر وسيط (proxy)', en: 'We removed "group"… but "club name" correlates with it and brings the bias back = a proxy variable' })));
    const wrap = h('div', { class: 'bs-wrap' }, pastPanel, h('div', { class: 'bs-flow' }, '➜'), model, h('div', { class: 'bs-flow' }, '➜'), outPanel, proxy);
    const fitHost = h('div', { class: 'bs-fit' }, wrap);
    stage.appendChild(fitHost);
    const refit = api.fitBox(fitHost, wrap, { min: 0.6 }); // every panel stays on screen, whatever the stage size

    let mode = 'biased';
    function setBars(a, b, kind) {
      gsap.to(barA.fill, { width: a + '%', duration: 0.9, ease: 'power3.out' });
      gsap.to(barB.fill, { width: b + '%', duration: 0.9, ease: 'power3.out' });
      RV.fx.countUp(barA.val, a, { duration: 0.9, format: (v) => Math.round(v) + '%' });
      RV.fx.countUp(barB.val, b, { duration: 0.9, format: (v) => Math.round(v) + '%' });
      verdict.className = 'bs-verdict ' + kind;
      verdict.textContent = t(kind === 'bad' ? { ar: '⚠️ تحيّز خوارزمي! نفس المهارات… ونتيجة مختلفة', en: '⚠️ Algorithmic bias! Same skills… different outcome' } : { ar: '✅ عادل: بيانات متوازنة + اختبار النتائج لكل مجموعة', en: '✅ Fair: balanced data + results tested per group' });
      refit(); // the verdict text may wrap to a new line
      gsap.fromTo(verdict, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, delay: 0.6, ease: 'back.out(2)' });
    }
    function paintPast(balanced) {
      const r = rng(11);
      Array.from(grid.children).forEach((el, i) => {
        const g = past[i].g;
        const hired = balanced ? r() < 0.55 : past[i].hired;
        el.classList.toggle('hired', hired);
      });
      gsap.from(grid.children, { scale: 0.4, opacity: 0, stagger: { each: 0.015, from: 'random' }, duration: 0.3 });
    }
    function train(balanced) {
      mode = balanced ? 'balanced' : 'biased';
      paintPast(balanced);
      gsap.fromTo(model, { boxShadow: '0 0 0 0 rgba(167,139,250,.8)' }, { boxShadow: '0 0 40px 12px rgba(167,139,250,0)', duration: 1, delay: 0.5 });
      api.after(900, () => (balanced ? setBars(58, 56, 'ok') : setBars(70, 18, 'bad')));
      api.sound.play('whoosh');
    }

    api.toolbar([
      { icon: 'alert', label: { ar: 'بيانات متحيزة', en: 'Biased data' }, group: true, active: true, onClick: () => { gsap.set(proxy, { autoAlpha: 0 }); train(false); } },
      { icon: 'scale', label: { ar: 'بيانات متوازنة', en: 'Balanced data' }, group: true, onClick: () => { gsap.set(proxy, { autoAlpha: 0 }); train(true); } },
    ]);
    gsap.set([outPanel, model, proxy], { autoAlpha: 0 });

    return {
      beat(i) {
        gsap.set(proxy, { autoAlpha: 0 });
        if (i === 0) { gsap.set([outPanel, model], { autoAlpha: 0 }); paintPast(false); }
        if (i === 1) { gsap.to([model, outPanel], { autoAlpha: 1, duration: 0.4 }); train(false); }
        if (i === 2) { gsap.to([model, outPanel], { autoAlpha: 1, duration: 0.4 }); train(true); }
        if (i >= 3) {
          gsap.to([model, outPanel], { autoAlpha: 1, duration: 0.4 });
          gsap.to(proxy, { autoAlpha: 1, duration: 0.4 });
          gsap.from(proxy.querySelectorAll('.bs-col'), { y: -16, opacity: 0, stagger: 0.2, duration: 0.4 });
          api.after(600, () => setBars(66, 30, 'bad'));
        }
      },
    };
  });

  /* ───────────────────────── privacyCam ───────────────────────── */
  K.defineAnim('privacyCam', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 460);
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    // scene A: street + camera
    const A = s('g');
    A.append(s('rect', { x: 0, y: 300, width: 800, height: 160, class: 'pc-ground' }), s('rect', { x: 0, y: 0, width: 800, height: 300, class: 'pc-sky' }));
    for (let k = 0; k < 5; k++) A.appendChild(s('rect', { x: 20 + k * 160, y: 120 + (k % 2) * 40, width: 120, height: 180 - (k % 2) * 40, rx: 6, class: 'pc-bld' }));
    const cam = s('g', { transform: 'translate(400 60)', class: 'pc-cam' }, s('rect', { x: -6, y: -40, width: 12, height: 40, class: 'pc-pole' }), s('rect', { x: -34, y: -12, width: 68, height: 30, rx: 8 }), s('circle', { cx: 20, cy: 3, r: 7, class: 'pc-lens' }));
    const cone = s('path', { d: 'M400 75 L250 330 L550 330 Z', class: 'pc-cone' });
    const people = [];
    const names = [{ ar: 'سارة · 09:14 · المترو', en: 'Sara · 09:14 · metro' }, { ar: 'عمر · 09:15 · البنك', en: 'Omar · 09:15 · bank' }, { ar: 'ليلى · 09:15 · الصيدلية', en: 'Laila · 09:15 · pharmacy' }];
    names.forEach((nm, k) => {
      const g = s('g', { class: 'pc-person' }, s('circle', { cx: 0, cy: -38, r: 12, class: 'pc-head' }), s('rect', { x: -12, y: -26, width: 24, height: 40, rx: 10, class: 'pc-body' }),
        s('rect', { x: -20, y: -54, width: 40, height: 34, rx: 6, class: 'pc-box' }),
        s('text', { x: 0, y: -62, 'text-anchor': 'middle', class: 'pc-tag' }, t(nm)));
      A.appendChild(g);
      people.push(g);
    });
    A.append(cone, cam);
    const warnA = s('text', { x: 400, y: 440, 'text-anchor': 'middle', class: 'pc-warn' }, t({ ar: '👁️ الكاميرا بتعرف كل واحد وبتتبّع حركته', en: '👁️ The camera identifies and tracks everyone' }));
    A.appendChild(warnA);

    // scene B: data streaming from a phone into a database
    const B = s('g');
    const phone = s('g', { transform: 'translate(170 230)' }, s('rect', { x: -50, y: -90, width: 100, height: 180, rx: 18, class: 'pc-phone' }));
    phone.appendChild(K.svgIcon('user', 0, 0, 50));
    const db = s('g', { transform: 'translate(640 230)' });
    db.appendChild(K.svgIcon('database', 0, 0, 150));
    const counter = s('text', { x: 640, y: 350, 'text-anchor': 'middle', class: 'pc-count mono' }, '0');
    const countLbl = s('text', { x: 640, y: 380, 'text-anchor': 'middle', class: 'pc-lbl' }, t({ ar: 'نقطة بيانات عنك', en: 'data points about you' }));
    const streams = s('g');
    B.append(phone, db, streams, counter, countLbl, s('text', { x: 400, y: 440, 'text-anchor': 'middle', class: 'pc-warn' }, t({ ar: '📊 جمع ضخم لبيانات سلوكك على الإنترنت وتحليلها', en: '📊 Mass collection and analysis of your online behaviour' })));
    svg.append(A, B);
    gsap.set(B, { autoAlpha: 0 });

    function playA() {
      people.forEach((p, k) => {
        const tl = gsap.timeline({ repeat: -1, delay: k * 1.3 });
        const box = p.querySelector('.pc-box');
        const tag = p.querySelector('.pc-tag');
        // one timeline for walking AND tagging, so the name tag only shows while the person is inside the camera view
        tl.fromTo(p, { x: -60, y: 360 + k * 26 }, { x: 860, duration: 7, ease: 'none' }, 0)
          .set([box, tag], { autoAlpha: 0 }, 0)
          .set([box, tag], { autoAlpha: 1 }, 2.4)
          .to(box, { attr: { 'stroke-width': 5 }, duration: 0.2, yoyo: true, repeat: 3 }, 2.4)
          .set([box, tag], { autoAlpha: 0 }, 5);
        loops.push(tl);
      });
      loops.push(gsap.fromTo(cone, { rotation: -18, svgOrigin: '400 75' }, { rotation: 18, svgOrigin: '400 75', duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
      loops.push(gsap.fromTo(cam, { rotation: -10, svgOrigin: '400 60' }, { rotation: 10, svgOrigin: '400 60', duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
    }
    function playB() {
      RV.dom.clear(streams);
      const icons = ['heart', 'flag', 'search', 'cart', 'film', 'camera'];
      const cnt = { v: 0 };
      loops.push(gsap.to(cnt, { v: 128450, duration: 8, ease: 'power1.in', onUpdate: () => { counter.textContent = Math.round(cnt.v).toLocaleString('en-US'); } }));
      for (let k = 0; k < 12; k++) {
        const g = s('g');
        g.appendChild(K.svgIcon(icons[k % icons.length], 0, 0, 28));
        streams.appendChild(g);
        loops.push(gsap.fromTo(g, { x: 220, y: 230 + (k % 5 - 2) * 30, opacity: 0 }, { keyframes: [{ opacity: 1, duration: 0.2 }, { x: 590, y: 230, duration: 1.4, ease: 'power1.in' }, { opacity: 0, duration: 0.1 }], repeat: -1, delay: k * 0.3 }));
      }
    }
    return {
      beat(i) {
        kill();
        if (i === 0) { gsap.to(A, { autoAlpha: 1, duration: 0.4 }); gsap.to(B, { autoAlpha: 0, duration: 0.3 }); playA(); }
        else { gsap.to(A, { autoAlpha: 0, duration: 0.3 }); gsap.to(B, { autoAlpha: 1, duration: 0.4 }); playB(); }
      },
    };
  });

  /* ───────────────────────── responsibility ───────────────────────── */
  K.defineAnim('responsibility', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const actor = (cls, icon, name, duty) => h('div', { class: 'rs-actor ' + cls }, h('div', { class: 'rs-ico' }, api.icon(icon)), h('b', null, t(name)), h('p', { class: 'rs-duty' }, t(duty)));
    const dev = actor('dev', 'code', { ar: 'المطوّر', en: 'Developer' }, { ar: 'بنى النموذج واختار بيانات التدريب', en: 'Built the model and chose the training data' });
    const user = actor('user', 'user', { ar: 'المستخدِم', en: 'User' }, { ar: 'اعتمد على النتيجة من غير ما يراجعها', en: 'Relied on the result without checking' });
    const op = actor('op', 'building', { ar: 'المشغِّل', en: 'Operator' }, { ar: 'الشركة اللي شغّلت النظام وحطّت قواعده', en: 'The company running it and setting its rules' });
    const center = h('div', { class: 'rs-center' }, h('span', { class: 'rs-x' }, '✗'), h('b', null, t({ ar: 'تشخيص غلط!', en: 'Wrong diagnosis!' })), h('span', { class: 'rs-q' }, t({ ar: 'مين المسؤول؟', en: 'Who is responsible?' })));
    const verdict = h('div', { class: 'rs-verdict' }, t({ ar: '⚖️ الآراء بتختلف… ولسه مفيش معيار واضح متّفق عليه', en: '⚖️ Views differ… no clear agreed standard yet' }));
    stage.appendChild(h('div', { class: 'rs-wrap' }, dev, user, center, op, verdict));
    const actors = [dev, user, op];
    const loops = [];
    return {
      beat(i) {
        loops.splice(0).forEach((l) => l.kill());
        if (i === 0) {
          gsap.set(actors.map((a) => a.querySelector('.rs-duty')), { autoAlpha: 0 });
          gsap.set(verdict, { autoAlpha: 0 });
          gsap.from(center, { scale: 0, duration: 0.6, ease: 'back.out(2.4)' });
          gsap.from(actors, { scale: 0.5, opacity: 0, stagger: 0.2, duration: 0.5, delay: 0.3, ease: 'back.out(2)' });
          const tl = gsap.timeline({ repeat: -1 });
          actors.forEach((a) => tl.to(a, { boxShadow: '0 0 0 4px var(--bad)', duration: 0.3 }).to(a, { boxShadow: '0 0 0 0 rgba(0,0,0,0)', duration: 0.3 }));
          loops.push(tl);
          loops.push(gsap.to(center.querySelector('.rs-q'), { scale: 1.1, duration: 0.6, repeat: -1, yoyo: true }));
        } else {
          gsap.to(actors.map((a) => a.querySelector('.rs-duty')), { autoAlpha: 1, stagger: 0.3, duration: 0.4 });
          gsap.fromTo(verdict, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 1 });
        }
      },
    };
  });
})();

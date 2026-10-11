/* =========================================================
 * anims/life.js — AI in daily life & industry.
 *   dailyAI       : a phone switching between 4 live services (one per beat):
 *                   recommendations · voice assistant · translation · face unlock
 *   industries    : 4 animated tiles — healthcare · agriculture · manufacturing · logistics
 *   goodVsCaution : "AI is good at" vs "needs caution" + human-in-the-loop
 *   blackBox      : input → ? → output; props.open:true turns it into explainable AI (XAI)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── dailyAI ───────────────────────── */
  K.defineAnim('dailyAI', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const screen = h('div', { class: 'da-screen' });
    const phone = h('div', { class: 'da-phone' }, h('div', { class: 'da-notch' }), screen);
    const tabs = [
      ['film', { ar: 'الترشيحات', en: 'Recommend' }], ['mic', { ar: 'المساعد الصوتي', en: 'Voice' }],
      ['translate', { ar: 'الترجمة', en: 'Translate' }], ['face', { ar: 'التعرف على الوجه', en: 'Face ID' }],
    ].map(([icon, label]) => h('div', { class: 'da-tab' }, api.icon(icon), h('span', null, t(label))));
    stage.appendChild(h('div', { class: 'da-wrap' }, phone, h('div', { class: 'da-tabs' }, tabs)));
    const loops = [];
    let epoch = 0;
    const kill = () => { epoch++; loops.splice(0).forEach((l) => l.kill()); };

    function recommend() {
      const watched = h('div', { class: 'da-watched' }, '⚽ ', t({ ar: 'شفت: أهداف الأهلي', en: 'You watched: football goals' }));
      const because = h('div', { class: 'da-because' }, t({ ar: 'لأنك بتحب الكورة… 👇', en: 'Because you like football… 👇' }));
      const cards = [['⚽', { ar: 'ملخص الدوري', en: 'League recap' }], ['🏆', { ar: 'أجمل 10 أهداف', en: 'Top 10 goals' }], ['🎮', { ar: 'FIFA تحدّي', en: 'FIFA challenge' }], ['🍳', { ar: 'وصفة كيك', en: 'Cake recipe' }]]
        .map(([e, l], k) => h('div', { class: 'da-card' + (k === 3 ? ' low' : '') }, h('b', null, e), h('span', null, t(l)), h('i', { class: 'mono' }, k === 3 ? '12%' : `${96 - k * 4}%`)));
      screen.replaceChildren(watched, because, h('div', { class: 'da-cards' }, cards));
      const tl = gsap.timeline();
      tl.from(watched, { y: -20, opacity: 0, duration: 0.4 })
        .from(because, { opacity: 0, duration: 0.3 }, '+=0.3')
        .from(cards, { x: 60, opacity: 0, stagger: 0.15, duration: 0.45, ease: 'back.out(1.6)' });
      loops.push(tl);
    }
    function voice() {
      const bars = h('div', { class: 'da-wave' }, Array.from({ length: 20 }, () => h('i')));
      const q = h('div', { class: 'da-bubble me' }, '🎤 ', t({ ar: 'الجو عامل إيه النهارده؟', en: "What's the weather today?" }));
      const a = h('div', { class: 'da-bubble ai' }, '☀️ ', t({ ar: 'القاهرة: 28° ومشمس', en: 'Cairo: 28° and sunny' }));
      const steps = h('div', { class: 'da-steps' }, ['🎧', '🧠', '⚙️'].map((e, k) => h('span', null, e, ' ', t([{ ar: 'يتعرّف', en: 'recognise' }, { ar: 'يفهم', en: 'understand' }, { ar: 'ينفّذ', en: 'execute' }][k]))));
      screen.replaceChildren(bars, q, steps, a);
      gsap.set([q, a, steps.children], { autoAlpha: 0 });
      Array.from(bars.children).forEach((b, k) => loops.push(gsap.fromTo(b, { scaleY: 0.15 }, { scaleY: 0.4 + Math.random() * 0.6, duration: 0.2 + Math.random() * 0.2, repeat: 9, yoyo: true, delay: k * 0.02 })));
      const tl = gsap.timeline({ delay: 0.4 });
      tl.to(q, { autoAlpha: 1, duration: 0.3 }, 1)
        .to(steps.children, { autoAlpha: 1, stagger: 0.45, duration: 0.3 }, 1.4)
        .fromTo(a, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, onStart: () => api.sound.play('pop') }, 3);
      loops.push(tl);
    }
    function translate() {
      const lines = [['Soupe du jour', { ar: 'شوربة اليوم', en: 'Soup of the day' }], ['Poulet rôti', { ar: 'فراخ مشوية', en: 'Roast chicken' }], ['Gâteau au chocolat', { ar: 'كيكة شوكولاتة', en: 'Chocolate cake' }]];
      const menu = h('div', { class: 'da-menu' }, h('b', null, '🇫🇷 Menu'), lines.map(([fr]) => h('div', { class: 'da-line' }, fr)));
      const scan = h('div', { class: 'da-scan' });
      screen.replaceChildren(menu, scan);
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(scan, { top: '10%', autoAlpha: 1 }, { top: '90%', duration: 1.2, ease: 'power1.inOut' })
        .to(scan, { autoAlpha: 0, duration: 0.2 });
      menu.querySelectorAll('.da-line').forEach((el, k) => {
        tl.add(() => { el.textContent = t(lines[k][1]); el.classList.add('done'); api.sound.play('tap'); }, 0.4 + k * 0.35)
          .fromTo(el, { rotateX: 90 }, { rotateX: 0, duration: 0.35 }, 0.4 + k * 0.35);
      });
      loops.push(tl);
    }
    function face() {
      const faceEl = h('div', { class: 'da-face' }, api.icon('user'));
      const mesh = h('div', { class: 'da-mesh' }, Array.from({ length: 12 }, () => h('i')));
      const lock = h('div', { class: 'da-lock' }, api.icon('lock'));
      const ok = h('div', { class: 'da-ok' }, t({ ar: 'تم التعرف ✓ اتفتح!', en: 'Recognised ✓ unlocked!' }));
      screen.replaceChildren(faceEl, mesh, lock, ok);
      gsap.set(ok, { autoAlpha: 0 });
      const mine = epoch;
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(mesh.children, { scale: 0, stagger: { each: 0.06, from: 'random' }, duration: 0.3 })
        .to(mesh, { rotate: 360, duration: 1.2, ease: 'power2.inOut' })
        .add(() => { if (mine !== epoch) return; lock.replaceChildren(api.icon('check')); lock.classList.add('open'); api.sound.play('ok'); })
        .to(ok, { autoAlpha: 1, duration: 0.3 });
      loops.push(tl);
    }

    const scenes = [recommend, voice, translate, face];
    return {
      beat(i) {
        kill();
        const k = Math.min(i, 3);
        tabs.forEach((x, j) => x.classList.toggle('is-active', j === k));
        gsap.fromTo(phone, { rotateY: -14, scale: 0.96 }, { rotateY: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' });
        scenes[k]();
      },
    };
  });

  /* ───────────────────────── industries ───────────────────────── */
  K.defineAnim('industries', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const tile = (cls, icon, name, job, svg) => h('div', { class: 'in-tile ' + cls }, h('div', { class: 'in-head' }, api.icon(icon), h('b', null, t(name))), svg, h('p', null, t(job)));

    // healthcare: x-ray + scan + detection ring
    const xr = s('svg', { viewBox: '0 0 200 120', class: 'in-svg' },
      s('rect', { x: 0, y: 0, width: 200, height: 120, rx: 10, class: 'in-xray-bg' }),
      s('path', { d: 'M100 15 V105 M70 30 q30 10 60 0 M66 48 q34 12 68 0 M64 66 q36 12 72 0 M66 84 q34 10 68 0', class: 'in-ribs' }),
      s('rect', { x: 0, y: 10, width: 200, height: 4, class: 'in-scan' }),
      s('circle', { cx: 128, cy: 60, r: 14, class: 'in-found' }));
    // agriculture: field + drone + pest box
    const ag = s('svg', { viewBox: '0 0 200 120', class: 'in-svg' },
      s('rect', { x: 0, y: 70, width: 200, height: 50, class: 'in-field' }),
      ...Array.from({ length: 9 }, (_, k) => s('path', { d: `M${12 + k * 22} 100 q 6 -24 0 -36 M${12 + k * 22} 90 q -10 -6 -12 -16 M${12 + k * 22} 84 q 10 -6 12 -16`, class: 'in-plant' + (k === 6 ? ' sick' : '') })),
      s('g', { class: 'in-drone' }, s('rect', { x: -14, y: -4, width: 28, height: 8, rx: 4 }), s('line', { x1: -18, y1: -6, x2: -6, y2: -6 }), s('line', { x1: 6, y1: -6, x2: 18, y2: -6 }), s('path', { d: 'M-8 4 L-26 60 H26 L8 4 Z', class: 'in-beam' })),
      s('rect', { x: 132, y: 58, width: 28, height: 46, rx: 4, class: 'in-pest' }));
    // manufacturing: conveyor + QC + gear warning
    const mf = s('svg', { viewBox: '0 0 200 120', class: 'in-svg' },
      s('rect', { x: 0, y: 80, width: 200, height: 10, rx: 5, class: 'in-belt' }),
      s('g', { class: 'in-boxes' }, ...[0, 1, 2, 3].map((k) => s('rect', { x: 0, y: 56, width: 24, height: 24, rx: 4, class: 'in-box' + (k === 2 ? ' bad' : '') }))),
      s('path', { d: 'M100 8 L88 30 H112 Z', class: 'in-cam' }), s('line', { x1: 100, y1: 30, x2: 100, y2: 56, class: 'in-cam-beam' }),
      s('g', { transform: 'translate(170 30)', class: 'in-gear' }));
    mf.querySelector('.in-gear').appendChild(K.svgIcon('gear', 0, 0, 30));
    const warn = s('text', { x: 150, y: 14, class: 'in-warn' }, '⚠');
    mf.appendChild(warn);
    // logistics: map nodes + optimal route
    const pts = [[20, 95], [60, 30], [100, 80], [140, 25], [180, 90], [110, 45]];
    const lg = s('svg', { viewBox: '0 0 200 120', class: 'in-svg' },
      s('rect', { x: 0, y: 0, width: 200, height: 120, rx: 10, class: 'in-map' }),
      s('path', { d: 'M20 95 L60 30 L140 25 L100 80 L180 90', class: 'in-bad-route' }),
      s('path', { d: 'M20 95 L100 80 L110 45 L140 25 L180 90', class: 'in-route' }),
      ...pts.map(([x, y]) => s('circle', { cx: x, cy: y, r: 6, class: 'in-stop' })));
    const truck = s('g', { class: 'in-truck' });
    truck.appendChild(K.svgIcon('truck', 0, 0, 22));
    lg.appendChild(truck);

    const tiles = [
      tile('t-health', 'heart', { ar: 'الرعاية الصحية', en: 'Healthcare' }, { ar: 'تشخيص الأمراض من الأشعة السينية والمقطعية · دعم اكتشاف الأدوية', en: 'Disease detection from X-ray/CT · drug-discovery support' }, xr),
      tile('t-agri', 'leaf', { ar: 'الزراعة', en: 'Agriculture' }, { ar: 'التنبؤ بموعد الحصاد · كشف الآفات والأمراض', en: 'Predicting harvest timing · detecting pests & diseases' }, ag),
      tile('t-manu', 'factory', { ar: 'التصنيع', en: 'Manufacturing' }, { ar: 'أتمتة فحص الجودة · الصيانة التنبؤية', en: 'Automated quality inspection · predictive maintenance' }, mf),
      tile('t-logi', 'truck', { ar: 'الخدمات اللوجستية', en: 'Logistics' }, { ar: 'تحسين مسارات التوصيل', en: 'Optimising delivery routes' }, lg),
    ];
    stage.appendChild(h('div', { class: 'in-grid' }, tiles));
    gsap.from(tiles, { y: 30, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'back.out(1.6)' });

    // perpetual motions (always alive)
    gsap.fromTo(xr.querySelector('.in-scan'), { attr: { y: 6 } }, { attr: { y: 110 }, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo(xr.querySelector('.in-found'), { attr: { r: 10 }, opacity: 0.4 }, { attr: { r: 18 }, opacity: 1, duration: 0.8, repeat: -1, yoyo: true });
    gsap.fromTo(ag.querySelector('.in-drone'), { x: 20, y: 20 }, { x: 180, y: 20, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo(ag.querySelector('.in-pest'), { opacity: 0.2 }, { opacity: 1, duration: 0.6, repeat: -1, yoyo: true });
    Array.from(mf.querySelectorAll('.in-box')).forEach((b, k) => gsap.fromTo(b, { attr: { x: -30 } }, { attr: { x: 210 }, duration: 4, repeat: -1, ease: 'none', delay: k * 1 }));
    gsap.to(mf.querySelector('.in-gear'), { rotation: 360, svgOrigin: '170 30', duration: 3, repeat: -1, ease: 'none' });
    gsap.fromTo(warn, { opacity: 0 }, { opacity: 1, duration: 0.5, repeat: -1, yoyo: true });
    gsap.fromTo(lg.querySelector('.in-route'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 2, repeat: -1, repeatDelay: 1, ease: 'power1.inOut' });
    gsap.to(truck, { duration: 3, repeat: -1, repeatDelay: 0.5, ease: 'power1.inOut', motionPath: { path: lg.querySelector('.in-route'), align: lg.querySelector('.in-route'), alignOrigin: [0.5, 0.5] } });

    return {
      beat(i) {
        tiles.forEach((x, k) => x.classList.toggle('is-focus', k === i));
        tiles.forEach((x, k) => x.classList.toggle('is-dim', i < 4 && k !== i));
        if (tiles[i]) gsap.fromTo(tiles[i], { scale: 0.95 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
      },
    };
  });

  /* ───────────────────────── goodVsCaution ───────────────────────── */
  K.defineAnim('goodVsCaution', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const GOOD = [{ ar: 'إيجاد وتصنيف الأنماط في الصور والنصوص', en: 'Finding & classifying patterns' }, { ar: 'التعرّف على الصور والصوت والنص وتوليدها', en: 'Recognising & generating images, audio, text' }, { ar: 'الاستدلال والتنبؤ الاحتمالي من البيانات', en: 'Probabilistic reasoning & prediction' }];
    const CARE = [{ ar: 'الأحكام الأخلاقية (تمييز وتحيّز)', en: 'Ethical judgments (bias)' }, { ar: 'المعلومات الشخصية والخصوصية', en: 'Personal info & privacy' }, { ar: 'القرار النهائي (مين المسؤول؟)', en: 'Final decisions (who is responsible?)' }, { ar: 'بيانات تدريب متحيزة', en: 'Biased training data' }, { ar: 'الهلوسة (محتوى غلط)', en: 'Hallucination' }, { ar: 'حقوق النشر في بيانات التدريب', en: 'Copyright in training data' }, { ar: 'الصندوق الأسود (مش واضح ليه قرّر)', en: 'Black box (unclear why)' }];
    const col = (cls, title, items) => h('div', { class: 'gc-col ' + cls }, h('h4', null, t(title)), items.map((x) => h('div', { class: 'gc-item' }, t(x))));
    const good = col('good', { ar: '✅ الذكاء الاصطناعي شاطر في', en: '✅ AI is good at' }, GOOD);
    const care = col('care', { ar: '⚠️ محتاج حذر في', en: '⚠️ Needs caution' }, CARE);
    const loopTxt = h('div', { class: 'gc-loop' },
      h('span', { class: 'gc-node ai' }, '🤖 ', t({ ar: 'الـAI يقترح', en: 'AI suggests' })), h('span', { class: 'gc-arrow' }, '➜'),
      h('span', { class: 'gc-node human' }, '👩‍⚕️ ', t({ ar: 'الإنسان يراجع ويقرّر', en: 'Human reviews & decides' })), h('span', { class: 'gc-arrow' }, '➜'),
      h('span', { class: 'gc-node ok' }, '✅ ', t({ ar: 'قرار مسؤول', en: 'Responsible decision' })));
    stage.appendChild(h('div', { class: 'gc-wrap' }, h('div', { class: 'gc-cols' }, good, care), loopTxt));
    gsap.set([good, care, loopTxt], { autoAlpha: 0 });
    let level = -1;
    return {
      beat(i) {
        if (i >= 0 && level < 0) { gsap.to(good, { autoAlpha: 1, duration: 0.3 }); gsap.from(good.querySelectorAll('.gc-item'), { x: 40, opacity: 0, stagger: 0.2, duration: 0.45, ease: 'back.out(1.6)' }); }
        if (i >= 1 && level < 1) { gsap.to(care, { autoAlpha: 1, duration: 0.3 }); gsap.from(care.querySelectorAll('.gc-item'), { x: -40, opacity: 0, stagger: 0.12, duration: 0.4, ease: 'back.out(1.6)' }); }
        if (i >= 2 && level < 2) { gsap.to(loopTxt, { autoAlpha: 1, duration: 0.3 }); gsap.from(loopTxt.children, { scale: 0, stagger: 0.25, duration: 0.45, ease: 'back.out(2.4)' }); }
        if (i < 2) gsap.set(loopTxt, { autoAlpha: 0 });
        if (i < 1) gsap.set(care, { autoAlpha: 0 });
        level = i;
      },
    };
  });

  /* ───────────────────────── blackBox ───────────────────────── */
  K.defineAnim('blackBox', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const input = h('div', { class: 'bb-in' }, api.icon('user'), h('span', null, t({ ar: 'طلب وظيفة: أحمد', en: 'Job application: Ahmed' })));
    const qm = h('div', { class: 'bb-qm' }, '?');
    const factors = h('div', { class: 'bb-factors' }, [
      [{ ar: 'سنين الخبرة', en: 'Years of experience' }, 0.45, 'ok'], [{ ar: 'المهارات', en: 'Skills' }, 0.35, 'ok'], [{ ar: 'الحي اللي ساكن فيه ⚠️', en: 'Neighbourhood ⚠️' }, 0.2, 'bad'],
    ].map(([label, w, kind]) => h('div', { class: 'bb-f ' + kind }, h('span', null, t(label)), h('div', { class: 'bb-track' }, h('i', { style: { width: w * 100 + '%' } })), h('b', { class: 'mono' }, Math.round(w * 100) + '%'))));
    const box = h('div', { class: 'bb-box' }, qm, factors);
    const out = h('div', { class: 'bb-out' }, '❌ ', t({ ar: 'مرفوض', en: 'Rejected' }));
    const why = h('div', { class: 'bb-why' }, t({ ar: '«ليه اترفضت؟» 🤷 … مفيش إجابة', en: '"Why was I rejected?" 🤷 … no answer' }));
    const xai = h('div', { class: 'bb-why ok' }, t({ ar: 'XAI: «اترفض بسبب الحي» ← نكتشف التحيّز ونصلّحه!', en: 'XAI: "rejected because of neighbourhood" → bias found and fixed!' }));
    stage.appendChild(h('div', { class: 'bb-wrap' }, input, h('div', { class: 'bb-arrow' }, '➜'), box, h('div', { class: 'bb-arrow' }, '➜'), out, why, xai));
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function closed() {
      kill();
      box.classList.remove('is-open');
      gsap.set(factors, { autoAlpha: 0 }); gsap.set(qm, { autoAlpha: 1 }); gsap.set(xai, { autoAlpha: 0 });
      const tl = gsap.timeline();
      tl.from(input, { x: 40, opacity: 0, duration: 0.4 })
        .fromTo(box, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
        .from(out, { scale: 0, duration: 0.4, ease: 'back.out(3)' })
        .fromTo(why, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 });
      loops.push(tl);
      loops.push(gsap.to(qm, { rotate: 12, scale: 1.15, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
    }
    function open() {
      kill();
      box.classList.add('is-open');
      gsap.set(why, { autoAlpha: 0 });
      const tl = gsap.timeline();
      tl.to(qm, { autoAlpha: 0, scale: 2, duration: 0.3 })
        .to(factors, { autoAlpha: 1, duration: 0.3 })
        .from(factors.querySelectorAll('.bb-track i'), { width: 0, stagger: 0.25, duration: 0.6, ease: 'power3.out' })
        .fromTo(xai, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, onStart: () => api.sound.play('ok') });
      loops.push(tl);
    }
    return {
      beat(i) {
        const showOpen = props.open ? i >= (props.openAt || 0) : false;
        showOpen ? open() : closed();
      },
    };
  });
})();

/* =========================================================
 * anims/deep.js — deep dives into the two hardest ideas of the chapter.
 *   hallucinationWhy : a language model picks the most LIKELY next word,
 *                      it does not look facts up → plausible but false text.
 *                      beats: autocomplete · probability race · wrong-but-plausible pick
 *                             · gaps in data → invention · three kinds of hallucination
 *   blackBoxWhy      : millions of weights → no human-readable reason.
 *                      beats: the network · every link is a number · the decision is
 *                             millions of multiplications · consequences
 *   xaiExplain       : three ways XAI explains a decision.
 *                      beats: factor importance · counterfactual ("if…, then accepted")
 *                             · heat-map on an X-ray
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── hallucinationWhy ───────────────────────── */
  K.defineAnim('hallucinationWhy', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const sentence = h('div', { class: 'hw-sentence' });
    const blank = h('span', { class: 'hw-blank' }, '____');
    const bars = h('div', { class: 'hw-bars' });
    const note = h('div', { class: 'hw-note' });
    const kinds = h('div', { class: 'hw-kinds' });
    const db = h('div', { class: 'hw-db' }, api.icon('database'), h('span', null, t({ ar: 'قاعدة حقائق؟', en: 'A fact database?' })), h('b', null, '✗'));
    const wrap = h('div', { class: 'hw-wrap' }, sentence, bars, db, note, kinds);
    const fitHost = h('div', { class: 'hw-fit' }, wrap);
    stage.appendChild(fitHost);
    const refit = api.fitBox(fitHost, wrap, { min: 0.6 });

    const CANDS = [
      { w: '1961', p: 0.34, ok: true },
      { w: '1890', p: 0.31, ok: false },
      { w: '1956', p: 0.22, ok: false },
      { w: '2005', p: 0.13, ok: false },
    ];
    const rows = CANDS.map((c) => {
      const fill = h('i');
      const pct = h('b', { class: 'mono' }, '0%');
      const row = h('div', { class: 'hw-bar' }, h('span', { class: 'mono hw-word' }, c.w), h('div', { class: 'hw-track' }, fill), pct);
      bars.appendChild(row);
      return { row, fill, pct, c };
    });
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function writeSentence() {
      sentence.replaceChildren(h('span', null, t({ ar: 'برج القاهرة اتبنى سنة ', en: 'Cairo Tower was built in ' })), blank);
      gsap.fromTo(sentence, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
      loops.push(gsap.to(blank, { opacity: 0.2, duration: 0.5, repeat: -1, yoyo: true }));
    }
    function race(winner) {
      rows.forEach(({ row, fill, pct, c }, k) => {
        row.classList.remove('win', 'bad', 'good');
        loops.push(gsap.fromTo(fill, { width: '0%' }, { width: c.p * 260 + '%', duration: 1.2, delay: k * 0.1, ease: 'power3.out' }));
        RV.fx.countUp(pct, c.p * 100, { duration: 1.2, format: (v) => Math.round(v) + '%' });
      });
      if (winner != null) api.after(1500, () => {
        const r = rows[winner];
        r.row.classList.add('win', r.c.ok ? 'good' : 'bad');
        blank.textContent = r.c.w;
        blank.classList.toggle('is-bad', !r.c.ok);
        gsap.killTweensOf(blank); gsap.set(blank, { opacity: 1 });
        gsap.fromTo(blank, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
        api.sound.play(r.c.ok ? 'ok' : 'bad');
      });
    }
    function say(txt, kind) {
      note.className = 'hw-note ' + (kind || '');
      note.replaceChildren(RV.rich(txt));
      gsap.fromTo(note, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 });
    }
    function showKinds() {
      RV.dom.clear(kinds);
      [['📅', { ar: 'حقيقة مزيفة', en: 'A fake fact' }, { ar: '«برج القاهرة اتبنى 1890»', en: '"Cairo Tower was built in 1890"' }],
        ['📚', { ar: 'مرجع مش موجود', en: 'A non-existent source' }, { ar: 'كتاب أو رابط باسم حقيقي… بس مش موجود', en: 'A real-sounding book or link… that does not exist' }],
        ['🔢', { ar: 'رقم أو حساب غلط', en: 'A wrong number' }, { ar: '«2^10 = 1,000»', en: '"2^10 = 1,000"' }]].forEach(([e, n, ex]) => {
        kinds.appendChild(h('div', { class: 'hw-kind' }, h('span', { class: 'hw-kind-e' }, e), h('b', null, t(n)), h('small', null, RV.rich(ex))));
      });
      gsap.from(kinds.children, { y: 30, opacity: 0, rotateX: -60, stagger: 0.2, duration: 0.5, ease: 'back.out(1.8)' });
    }

    return {
      beat(i) {
        kill();
        bars.hidden = db.hidden = i >= 4; // the 3 kinds take their place (nothing pushed off-screen)
        kinds.hidden = i < 4;
        gsap.set([bars, db, kinds], { autoAlpha: i === 0 ? 0 : 1 });
        if (i < 4) gsap.set(kinds, { autoAlpha: 0 });
        if (i === 0) { writeSentence(); gsap.set(db, { autoAlpha: 0 }); say({ ar: 'الذكاء التوليدي بيكمّل الجملة __كلمة بكلمة__ — زي «الإكمال التلقائي» في الكيبورد بس أقوى بكتير.', en: 'Generative AI continues text __word by word__ — like keyboard autocomplete, only far stronger.' }); }
        if (i === 1) { writeSentence(); gsap.set(db, { autoAlpha: 0 }); race(null); say({ ar: 'لكل كلمة ممكنة __نسبة احتمال__ اتعلّمها من البيانات. الكلمات بتتنافس!', en: 'Each possible word gets a __probability__ learned from data. The words compete!' }); }
        if (i === 2) { writeSentence(); race(1); gsap.fromTo(db, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 0.4 }); say({ ar: 'النموذج __مش بيدوّر في قاعدة حقائق__ — ممكن يختار كلمة «شكلها صح» زي 1890 وهي غلط. ده **الهلوسة**.', en: 'The model __does not look facts up__ — it may pick a plausible word like 1890 that is wrong. That is **hallucination**.' }, 'bad'); }
        if (i === 3) { writeSentence(); race(1); gsap.set(db, { autoAlpha: 1 }); say({ ar: 'وبتزيد لما المعلومة __نادرة أو مش موجودة__ في بيانات التدريب — بدل ما يقول «مش عارف»، بيأّلف حاجة مقنعة.', en: 'It gets worse when the information is __rare or missing__ in the training data — instead of saying "I don’t know", it invents something convincing.' }, 'bad'); }
        if (i >= 4) { showKinds(); say({ ar: 'تلات أشكال للهلوسة لازم تاخد بالك منها 👇', en: 'Three shapes of hallucination to watch for 👇' }); }
        refit();
      },
    };
  });

  /* ───────────────────────── blackBoxWhy ───────────────────────── */
  K.defineAnim('blackBoxWhy', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 800, 460);
    const layers = [5, 8, 8, 8, 2];
    const xs = layers.map((_, i) => 110 + i * 145);
    const nodes = layers.map((n, L) => Array.from({ length: n }, (_, k) => ({ x: xs[L], y: 230 + (k - (n - 1) / 2) * 46 })));
    const edgeG = s('g'); const nodeG = s('g'); const numG = s('g', { class: 'bw-nums' });
    const edges = [];
    for (let L = 0; L < layers.length - 1; L++) nodes[L].forEach((a) => nodes[L + 1].forEach((b) => {
      const e = s('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'bw-edge' });
      edgeG.appendChild(e); edges.push({ e, a, b });
    }));
    nodes.flat().forEach((n) => nodeG.appendChild(s('circle', { cx: n.x, cy: n.y, r: 11, class: 'bw-node' })));
    const inLbl = s('text', { x: 110, y: 470 - 20, 'text-anchor': 'middle', class: 'bw-lbl' }, t({ ar: 'بيانات المتقدّم', en: 'applicant data' }));
    const outLbl = s('text', { x: 690, y: 470 - 20, 'text-anchor': 'middle', class: 'bw-lbl' }, t({ ar: 'القرار', en: 'decision' }));
    const verdict = s('text', { x: 720, y: 160, 'text-anchor': 'middle', class: 'bw-verdict' }, '❌');
    const counter = s('text', { x: 400, y: 40, 'text-anchor': 'middle', class: 'bw-counter mono' }, '');
    const shroud = s('rect', { x: 170, y: 40, width: 460, height: 380, rx: 30, class: 'bw-shroud' });
    const why = s('text', { x: 400, y: 238, 'text-anchor': 'middle', class: 'bw-why' }, t({ ar: '«ليه رفضتني؟» 🤷', en: '"Why did you reject me?" 🤷' }));
    svg.append(edgeG, nodeG, numG, inLbl, outLbl, verdict, counter, shroud, why);
    gsap.set([numG, verdict, shroud, why], { autoAlpha: 0 });
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());

    function numbers() {
      RV.dom.clear(numG);
      edges.filter((_, k) => k % 3 === 0).forEach((ed) => {
        const tx = s('text', { x: (ed.a.x + ed.b.x) / 2, y: (ed.a.y + ed.b.y) / 2, class: 'bw-w mono', 'text-anchor': 'middle' }, ((Math.random() - 0.5) * 3).toFixed(2));
        numG.appendChild(tx);
      });
      gsap.to(numG, { autoAlpha: 1, duration: 0.3 });
      gsap.from(numG.children, { opacity: 0, scale: 0, transformOrigin: '50% 50%', stagger: 0.01, duration: 0.3 });
      const id = api.every(450, () => { Array.from(numG.children).forEach((n) => { if (Math.random() < 0.3) n.textContent = ((Math.random() - 0.5) * 3).toFixed(2); }); });
      loops.push({ kill: () => clearInterval(id) });
    }
    function flow() {
      for (let k = 0; k < 10; k++) {
        const path = [];
        let cur = nodes[0][(Math.random() * 5) | 0];
        for (let L = 0; L < layers.length - 1; L++) { const nx = nodes[L + 1][(Math.random() * nodes[L + 1].length) | 0]; path.push([cur, nx]); cur = nx; }
        const dot = s('circle', { r: 5, cx: path[0][0].x, cy: path[0][0].y, class: 'bw-pulse' });
        svg.insertBefore(dot, shroud);
        const tl = gsap.timeline({ repeat: -1, delay: k * 0.18 });
        path.forEach(([a, b]) => tl.fromTo(dot, { attr: { cx: a.x, cy: a.y } }, { attr: { cx: b.x, cy: b.y }, duration: 0.3, ease: 'none' }));
        loops.push(tl, { kill: () => dot.remove() });
      }
      const c = { v: 0 };
      loops.push(gsap.to(c, { v: 175000000, duration: 3, ease: 'power2.in', onUpdate: () => { counter.textContent = t({ ar: `${Math.round(c.v).toLocaleString('en-US')} عملية ضرب`, en: `${Math.round(c.v).toLocaleString('en-US')} multiplications` }); } }));
      gsap.to(verdict, { autoAlpha: 1, delay: 1.5 });
    }
    return {
      beat(i) {
        kill();
        gsap.set([shroud, why], { autoAlpha: 0 });
        if (i === 0) { gsap.set([numG, verdict], { autoAlpha: 0 }); counter.textContent = ''; gsap.from(edgeG.children, { opacity: 0, stagger: 0.002, duration: 0.3 }); }
        if (i >= 1) numbers();
        if (i >= 2) flow();
        if (i >= 3) {
          gsap.to(shroud, { autoAlpha: 0.94, duration: 0.8 });
          gsap.fromTo(why, { autoAlpha: 0, scale: 0.6, svgOrigin: '400 238' }, { autoAlpha: 1, scale: 1, svgOrigin: '400 238', duration: 0.6, delay: 0.5, ease: 'back.out(2)' });
        }
      },
    };
  });

  /* ───────────────────────── xaiExplain ───────────────────────── */
  K.defineAnim('xaiExplain', (stage, props, api) => {
    const { h, s } = api;
    const t = api.t;
    const panels = [];
    // 1) factor importance
    const factors = [[{ ar: 'سنين الخبرة', en: 'Years of experience' }, 0.42, 'ok'], [{ ar: 'المهارات', en: 'Skills' }, 0.33, 'ok'], [{ ar: 'الحي اللي ساكن فيه ⚠️', en: 'Neighbourhood ⚠️' }, 0.25, 'bad']];
    const p1 = h('div', { class: 'xe-panel' }, h('h4', null, '📊 ', t({ ar: 'أهمية كل عامل', en: 'How much each factor counted' })),
      factors.map(([l, w, k]) => h('div', { class: 'xe-f ' + k }, h('span', null, t(l)), h('div', { class: 'xe-track' }, h('i', { 'data-w': w })), h('b', { class: 'mono' }, Math.round(w * 100) + '%'))),
      h('p', { class: 'xe-take bad' }, t({ ar: '«الحي» مالوش علاقة بالكفاءة ← تحيّز! نشيله ونعيد التدريب', en: '"Neighbourhood" says nothing about ability → bias! Remove it and retrain' })));
    // 2) counterfactual
    const p2 = h('div', { class: 'xe-panel' }, h('h4', null, '🔁 ', t({ ar: 'لو كان… كان اتقبل', en: 'If… then accepted' })),
      h('div', { class: 'xe-cf' },
        h('div', { class: 'xe-cf-card bad' }, h('b', null, t({ ar: 'الحالي', en: 'Now' })), h('span', null, t({ ar: 'خبرة سنة واحدة', en: '1 year of experience' })), h('i', null, '❌')),
        h('span', { class: 'xe-cf-arrow' }, '⟶'),
        h('div', { class: 'xe-cf-card ok' }, h('b', null, t({ ar: 'لو', en: 'If' })), h('span', null, t({ ar: 'خبرة 3 سنين', en: '3 years of experience' })), h('i', null, '✅'))),
      h('p', { class: 'xe-take' }, t({ ar: 'المتقدّم بقى فاهم يعمل إيه عشان يتقبل المرة الجاية', en: 'The applicant now knows what to improve next time' })));
    // 3) heat-map on an X-ray
    const heat = s('svg', { viewBox: '0 0 200 160', class: 'xe-xray' },
      s('rect', { x: 0, y: 0, width: 200, height: 160, rx: 12, class: 'xe-xbg' }),
      s('path', { d: 'M100 15 V150 M60 40 q40 14 80 0 M55 62 q45 15 90 0 M52 84 q48 15 96 0 M55 106 q45 13 90 0 M60 128 q40 12 80 0', class: 'xe-ribs' }),
      s('circle', { cx: 132, cy: 78, r: 26, class: 'xe-heat' }), s('circle', { cx: 132, cy: 78, r: 14, class: 'xe-heat core' }));
    const p3 = h('div', { class: 'xe-panel' }, h('h4', null, '🔥 ', t({ ar: 'خريطة حرارية', en: 'Heat-map' })), heat,
      h('p', { class: 'xe-take' }, t({ ar: 'الأحمر = المكان اللي بنى عليه التشخيص — الطبيب يراجعه بعينه', en: 'Red = where the diagnosis came from — the doctor checks it' })));
    panels.push(p1, p2, p3);
    stage.appendChild(h('div', { class: 'xe-wrap' }, panels));
    gsap.set(panels, { autoAlpha: 0 });
    const loops = [];
    const shown = panels.map(() => false);
    return {
      beat(i) {
        loops.splice(0).forEach((l) => l.kill());
        panels.forEach((p, k) => {
          const on = k <= i;
          p.classList.toggle('is-focus', k === i);
          if (on && !shown[k]) {
            shown[k] = true;
            gsap.fromTo(p, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' });
            if (k === 0) p.querySelectorAll('.xe-track i').forEach((b, j) => gsap.fromTo(b, { width: 0 }, { width: +b.dataset.w * 220 + '%', duration: 0.8, delay: 0.3 + j * 0.2 }));
          }
          if (!on) { shown[k] = false; gsap.set(p, { autoAlpha: 0 }); }
        });
        if (i >= 2) loops.push(gsap.fromTo(heat.querySelectorAll('.xe-heat'), { opacity: 0.3, scale: 0.8, svgOrigin: '132 78' }, { opacity: 0.9, scale: 1.15, svgOrigin: '132 78', duration: 0.8, repeat: -1, yoyo: true }));
      },
    };
  });
})();

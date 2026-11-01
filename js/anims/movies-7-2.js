/* =========================================================
 * anims/movies-7-2.js — lesson 7-2 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   nnMovie : input → hidden → output layers · one neuron (weights, Σ,
 *             activation, worked numbers) · training (before/during/after) ·
 *             deep learning: hierarchical features (edges → parts → whole) ·
 *             what made it practical (data + GPU/TPU, overfitting) · the leap
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const T = (x, y, txt, fill, size) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 30}" font-weight="900" fill="${fill || '#e2e8f0'}">${txt}</text>`;
  /* the network: data flows from the reading side (right in Arabic) */
  const NET = () => {
    const R = MK.RTL(), X = (x) => (R ? 1740 - x : x);
    const L = [{ x: 200, n: 4, c: '#38bdf8' }, { x: 640, n: 5, c: '#a78bfa' }, { x: 1080, n: 5, c: '#a78bfa' }, { x: 1520, n: 2, c: '#34d399' }];
    const Y = (n, k) => 200 + (k - (n - 1) / 2) * 76;
    let lines = '', nodes = '';
    L.forEach((l, i) => {
      if (i < 3) { const m = L[i + 1]; range(l.n).forEach((a) => range(m.n).forEach((b) => { lines += `<path class="cn c${i}" d="M${X(l.x)} ${Y(l.n, a)} L${X(m.x)} ${Y(m.n, b)}" stroke="#475569" stroke-width="3"/>`; })); }
      range(l.n).forEach((k) => { nodes += `<circle class="nd l${i}" cx="${X(l.x)}" cy="${Y(l.n, k)}" r="28" fill="#0f172a" stroke="${l.c}" stroke-width="6"/>`; });
    });
    return `${lines}${nodes}${T(X(1520), Y(2, 0) + 12, '🐶', '#fff', 34)}${T(X(1520), Y(2, 1) + 12, '🐱', '#fff', 34)}`;
  };
  /* one neuron with three weighted inputs */
  const NEU = `${[[1, 0.9, 70], [0, 0.2, 200], [1, -0.7, 330]].map(([x, w, y], k) => `
      <path class="wl" d="M150 ${y} L480 200" stroke="${w < 0 ? '#f87171' : '#38bdf8'}" stroke-width="${Math.round(Math.abs(w) * 16) + 2}" stroke-linecap="round"/>
      <circle cx="100" cy="${y}" r="44" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>${T(100, y + 11, 'x' + (k + 1) + '=' + x, '#e0f2fe', 26)}
      ${T(300, (y + 200) / 2 - 14, 'w=' + w, w < 0 ? '#fca5a5' : '#bae6fd', 28)}`).join('')}
    <circle class="sum" cx="540" cy="200" r="70" fill="#1e1b4b" stroke="#a78bfa" stroke-width="7"/>${T(540, 216, 'Σ + b', '#ede9fe', 38)}
    <path d="M612 200 H720" stroke="#fbbf24" stroke-width="7"/><path d="M708 184 L732 200 L708 216" fill="none" stroke="#fbbf24" stroke-width="7"/>
    <rect x="740" y="160" width="120" height="80" rx="16" fill="#422006" stroke="#fbbf24" stroke-width="5"/>${T(800, 212, 'f( )', '#fde68a', 32)}
    <path d="M860 200 H910" stroke="#34d399" stroke-width="7"/><circle class="o" cx="918" cy="200" r="16" fill="#34d399"/>`;
  /* accuracy bar */
  const ACC = `<rect x="10" y="20" width="1080" height="56" rx="28" fill="#1e293b" stroke="#475569" stroke-width="4"/><rect class="af" x="10" y="20" width="1080" height="56" rx="28" fill="#34d399"/>`;
  /* hierarchical features of a handwritten "8" */
  const P_IN = `<rect x="4" y="4" width="292" height="232" rx="18" fill="#0b1222" stroke="#475569" stroke-width="4"/><circle cx="150" cy="78" r="44" fill="none" stroke="#e2e8f0" stroke-width="14"/><circle cx="150" cy="170" r="52" fill="none" stroke="#e2e8f0" stroke-width="14"/>`;
  const P_EDGE = `<rect x="4" y="4" width="292" height="232" rx="18" fill="#0b1222" stroke="#475569" stroke-width="4"/>${[[60, 60, 100, 40], [180, 50, 230, 80], [70, 150, 110, 190], [200, 160, 240, 120], [120, 110, 170, 120], [140, 200, 190, 210], [40, 110, 50, 150], [250, 90, 260, 130]].map(([a, b, c, d]) => `<path class="eg" d="M${a} ${b} L${c} ${d}" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/>`).join('')}`;
  const P_PART = `<rect x="4" y="4" width="292" height="232" rx="18" fill="#0b1222" stroke="#475569" stroke-width="4"/><circle class="pp" cx="90" cy="120" r="50" fill="none" stroke="#a78bfa" stroke-width="13"/><circle class="pp" cx="215" cy="120" r="56" fill="none" stroke="#a78bfa" stroke-width="13"/>`;
  const P_WHOLE = `<rect x="4" y="4" width="292" height="232" rx="18" fill="#0b1222" stroke="#475569" stroke-width="4"/><circle cx="110" cy="78" r="40" fill="none" stroke="#34d399" stroke-width="13"/><circle cx="110" cy="166" r="48" fill="none" stroke="#34d399" stroke-width="13"/>${T(225, 150, '= 8', '#fde68a', 50)}`;

  K.defineAnim('nnMovie', (stage, props, api) => {
    const U = MK.uiL12('nn-'), B = MK.look.kit('nn-', MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l72 mv-l12', prefix: 'nn-', beats: 7,
      html: (L) => `
  <div id="nn-stage" class="mv-stage">
    ${U.art('net', 90, 150, 1740, 400, '0 0 1740 400', NET())}
    ${U.box('li', 90, 570, 520, 't-blue', { h: L('طبقة الإدخال', 'Input layer'), p: L('بتستقبل البيانات من برّه (بكسلات)', 'receives data from outside (pixels)') })}
    ${U.box('lh', 700, 570, 520, 't-violet', { h: L('الطبقات المخفية', 'Hidden layers'), p: L('بتعالج وتستخرج السمات', 'process and extract features') })}
    ${U.box('lo', 1310, 570, 520, 't-green', { h: L('طبقة الإخراج', 'Output layer'), p: L('بتطلّع النتيجة كإجابة', 'output the result as the answer') })}

    ${U.art('neu', 90, 170, 940, 420, '0 0 940 420', NEU)}
    ${U.pill('nf', 1150, 190, '🧮 ' + L('أوزان × مدخلات ← مجموع ← تنشيط', 'weights × inputs → sum → activation'), 't-violet')}
    ${U.pill('nc', 1150, 300, '<span class="code">0.9×1 + 0.2×0 + (−0.7)×1 + 0.1 = 0.3</span>', 'solid')}
    ${U.box('nw', 1150, 410, 680, 't-blue', { h: L('الوزن', 'Weight'), p: L('قد إيه بنركّز على كل مدخل — موجب أو سالب، والأكبر أقوى', 'how much each input counts — positive or negative; bigger = stronger') })}
    ${U.pill('na', 1150, 620, '⚡ ' + L('دالة التنشيط: علاقات مش تناسبية بس', 'Activation: non-proportional relations'), 't-amber')}

    ${U.box('b0', 70, 180, 570, 't-red', { ic: '🎲', h: L('قبل التدريب', 'Before training'), p: L('أوزان عشوائية ← صورة كلب ← «قطة» ❌', 'random weights → a dog photo → "cat" ❌') })}
    ${U.box('b1', 675, 180, 570, 't-amber', { ic: '🔧', h: L('أثناء التدريب', 'During training'), p: L('نضبط الأوزان شوية شوية حسب الفرق بين التنبّؤ والإجابة', 'tune weights step by step from the gap to the answer') })}
    ${U.box('b2', 1280, 180, 570, 't-green', { ic: '✅', h: L('بعد التدريب', 'After training'), p: L('نقيس الأداء على بيانات منفصلة', 'correct answers even on new data') })}
    ${U.pill('accl', 90, 480, '🎯 ' + L('الدقة', 'Accuracy'), 't-slate')}
    ${U.art('acc', 360, 470, 1100, 100, '0 0 1100 100', ACC)}
    ${U.pill('accv', 1500, 480, L('20% ← 95%', '20% → 95%'), 'solid')}

    ${[['in', P_IN, L('صورة المدخل', 'Input image')], ['ed', P_EDGE, L('ضحلة: خطوط وتغيّر لون', 'Shallow: lines, color')], ['pa', P_PART, L('وسطى: أجزاء (حلقات)', 'Middle: parts (loops)')], ['wh', P_WHOLE, L('عميقة: الشكل كله ← «8»', 'Deep: the whole → "8"')]]
      .map(([id, svg, t], k) => U.art(id, 90 + k * 450, 190, 300, 240, '0 0 300 240', svg) + U.pill(id + 'l', 60 + k * 450, 460, t, ['t-slate', 't-blue', 't-violet', 't-green'][k])).join('')}
    ${U.box('dl', 360, 580, 1200, 't-violet', { h: L('التعلّم العميق = طبقات مخفية كتير متكدّسة', 'Deep learning = many stacked hidden layers'), p: L('كل ما الطبقة أعمق ← سمات أعقد', 'deeper layers → more complex features') })}

    ${U.box('bd', 90, 190, 560, 't-blue', { ic: '📚', h: L('بيانات كتير', 'Big data'), p: L('آلاف الأمثلة', 'thousands of examples') })}
    ${U.emo('pl', 690, 230, 100, 80, '➕')}
    ${U.box('gp', 830, 190, 560, 't-amber', { ic: '🖥️', h: L('قدرة حسابية عالية', 'High computing power'), p: 'GPU · TPU' })}
    ${U.pill('ok', 1450, 250, '✅ ' + L('عملي', 'practical'), 't-green')}
    ${U.pill('bf', 90, 470, '🕰️ ' + L('قبلها: تعميق الطبقات لوحده ماكانش كفاية', 'Before: deeper layers alone were not enough'), 't-slate')}
    ${U.pill('of', 90, 580, '⚠️ ' + L('عمق أكتر ≠ أداء أحسن تلقائيًا — فرط التخصيص: يحفظ الأمثلة ومايعمّمش', 'More depth ≠ better automatically — overfitting: memorizes, does not generalize'), 't-red')}

    ${U.box('f0', 70, 180, 570, 't-blue', { ic: '🖼️', h: L('التعرّف على الصور', 'Image recognition'), p: L('الوجوه · الأشعة الطبية · كشف الأجسام للعربيات الذاتية', 'faces · medical images · object detection for self-driving') })}
    ${U.box('f1', 675, 180, 570, 't-violet', { ic: '🎙️', h: L('التعرّف على الكلام', 'Speech recognition'), p: L('السماعات الذكية · التفريغ · ترجمة الكلام', 'smart speakers · transcription · speech translation') })}
    ${U.box('f2', 1280, 180, 570, 't-green', { ic: '💬', h: L('معالجة اللغة الطبيعية', 'Natural language processing'), p: L('ترجمة آلية · تلخيص · إجابة أسئلة', 'machine translation · summarizing · Q&A') })}
    ${U.pill('hb', 90, 480, '✋ ' + L('قبل: البشر بيصمّموا السمات بإيديهم واحدة واحدة', 'Before: humans designed features one by one'), 't-slate')}
    ${U.pill('ha', 90, 580, '🤖 ' + L('بعد: السمات بتتعلّم تلقائيًا ← أساس الذكاء التوليدي', 'After: features are learned automatically → the base for generative AI'), 't-green')}

    ${U.hd(0, '🧠 ' + L('بنية الشبكة العصبية', 'The structure of a neural network'))}
    ${U.hd(1, '⚪ ' + L('خلية عصبية واحدة', 'One neuron'))}
    ${U.hd(2, '🔧 ' + L('التدريب = ضبط الأوزان', 'Training = tuning the weights'))}
    ${U.hd(3, '🪜 ' + L('التعلّم العميق: سمات طبقة فوق طبقة', 'Deep learning: features layer on layer'))}
    ${U.hd(4, '🚀 ' + L('إيه اللي خلّاه عملي؟', 'What made it practical?'))}
    ${U.hd(5, '📈 ' + L('القفزة', 'The leap'))}
    ${U.nt(0, L('البنية حسب المهمة والبيانات والموارد', 'A harder problem → more layers and nodes'))}
    ${U.nt(2, L('كل خلية بسيطة… بس خلايا كتير مع بعض = أحكام معقّدة', 'Each neuron is simple… many together = complex judgments'), 'ok')}
    ${U.nt(3, L('في الكتاب: حواف ← عيون وأنف ← الوجه كله — نفس الفكرة', 'In the textbook: edges → eyes and nose → the whole face — same idea'))}
  </div>
  <div id="nn-recap" class="mv-recap">
    ${U.hd(6, '💡 ' + L('الخلاصة', 'The point'))}
    ${B.card('x0', 70, 170, 410, 420, 'c-violet rc', { ic: '🧠', p: L('إدخال ← مخفية (سمات) ← إخراج', 'Input → hidden (features) → output') })}
    ${B.card('x1', 530, 170, 410, 420, 'c-blue rc', { ic: '⚪', p: L('الخلية: أوزان × مدخلات ← مجموع ← دالة تنشيط', 'A neuron: weights × inputs → sum → activation') })}
    ${B.card('x2', 990, 170, 410, 420, 'c-amber rc', { ic: '🔧', p: L('التدريب بيضبط الأوزان: عشوائية ← مضبوطة', 'Training tunes weights: random → tuned') })}
    ${B.card('x3', 1450, 170, 410, 420, 'c-green rc', { ic: '🪜', p: L('عميق = طبقات كتير: خطوط ← أجزاء ← الكل', 'Deep = many layers: lines → parts → whole') })}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#nn-' + id + ' .' + c);

    /* 0 — the network */
    let c = at(0);
    frame(0, c, 6.0);
    IN(q('net'), c + 0.4, 0.4);
    tl.fromTo(sel('net', 'nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.04, ease: 'back.out(2)' }, c + 0.5);
    [0, 1, 2].forEach((i) => tl.fromTo(sel('net', 'c' + i), { opacity: 0 }, { opacity: 1, duration: 0.4 }, c + 1.3 + i * 0.2));
    IN(q('li'), c + 2.2, 0.4, { y: 20 }); SND('pop', c + 2.2);
    [0, 1, 2].forEach((i) => tl.to(sel('net', 'c' + i), { stroke: '#fbbf24', duration: 0.3, yoyo: true, repeat: 1 }, c + 2.8 + i * 0.5));
    IN(q('lh'), c + 3.2, 0.4, { y: 20 }); SND('pop', c + 3.2);
    tl.to(sel('net', 'l3'), { fill: '#065f46', duration: 0.4 }, c + 4.3);
    IN(q('lo'), c + 4.3, 0.4, { y: 20 }); SND('ok', c + 4.3);

    /* 1 — one neuron */
    c = at(1);
    frame(1, c);
    OUT(Q('net li lh lo'), c, 0.4);
    IN(q('neu'), c + 0.5, 0.4);
    tl.fromTo(sel('neu', 'wl'), { opacity: 0.15 }, { opacity: 1, duration: 0.4, stagger: 0.3 }, c + 0.8);
    tl.fromTo(sel('neu', 'sum'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1 }, c + 2.0);
    IN(q('nf'), c + 1.4, 0.4, { x: 30 * sx }); SND('pop', c + 1.4);
    IN(q('nc'), c + 2.4, 0.4, { x: 30 * sx }); SND('ok', c + 2.4);
    tl.fromTo(sel('neu', 'o'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 2.8);
    IN(q('nw'), c + 3.4, 0.5, { y: 20 });
    IN(q('na'), c + 4.4, 0.4, { y: 20 });

    /* 2 — training */
    c = at(2);
    frame(2, c, 5.6);
    OUT(Q('neu nf nc nw na'), c, 0.4);
    IN(q('b0'), c + 0.5, 0.5, { y: 30 }); SND('bad', c + 0.5);
    IN(q('accl'), c + 0.6, 0.3); IN(q('acc'), c + 0.6, 0.3); IN(q('accv'), c + 0.6, 0.3);
    tl.fromTo(sel('acc', 'af'), { attr: { width: 216 } }, { attr: { width: 216 }, duration: 0.01 }, c + 0.6);
    IN(q('b1'), c + 1.6, 0.5, { y: 30 }); SND('tap', c + 1.6);
    tl.to(sel('acc', 'af'), { attr: { width: 1026 }, duration: 2.4, ease: 'power1.inOut' }, c + 1.8);
    IN(q('b2'), c + 4.2, 0.5, { y: 30 }); SND('ok', c + 4.2);

    /* 3 — hierarchical features */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('b0 b1 b2 accl acc accv'), c, 0.4);
    ['in', 'ed', 'pa', 'wh'].forEach((id, k) => { IN(q(id), c + 0.5 + k * 0.9, 0.4, { scale: 0.9 }); IN(q(id + 'l'), c + 0.7 + k * 0.9, 0.3, { y: 20 }); SND('pop', c + 0.5 + k * 0.9); });
    tl.fromTo(sel('ed', 'eg'), { opacity: 0 }, { opacity: 1, duration: 0.1, stagger: 0.07 }, c + 1.5);
    tl.fromTo(sel('pa', 'pp'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, stagger: 0.2 }, c + 2.4);
    IN(q('dl'), c + 4.4, 0.5, { y: 20 }); SND('ok', c + 4.4);

    /* 4 — what made it practical */
    c = at(4);
    frame(4, c);
    OUT(Q('in ed pa wh inl edl pal whl dl'), c, 0.4);
    IN(q('bd'), c + 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5);
    IN(q('pl'), c + 1.1, 0.3);
    IN(q('gp'), c + 1.4, 0.5, { y: 30 }); SND('pop', c + 1.4);
    POP(q('ok'), c + 2.4, 0.4); SND('ok', c + 2.4);
    IN(q('bf'), c + 3.2, 0.4, { x: 30 * sx });
    IN(q('of'), c + 4.0, 0.4, { x: 30 * sx }); SND('bad', c + 4.0);

    /* 5 — the leap */
    c = at(5);
    frame(5, c);
    OUT(Q('bd pl gp ok bf of'), c, 0.4);
    Q('f0 f1 f2').forEach((b, i) => { IN(b, c + 0.5 + i * 0.8, 0.5, { y: 30 }); SND('pop', c + 0.5 + i * 0.8); });
    IN(q('hb'), c + 3.0, 0.4, { x: 30 * sx });
    IN(q('ha'), c + 3.8, 0.4, { x: 30 * sx }); SND('ok', c + 3.8);

    /* 6 — recap */
    c = at(6);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd6'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.5, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.5); });
    M.loop(6, 3.4, () => MK.look.glowCycle(Q('x0 x1 x2 x3'), 'rgba(251,191,36,.8)', 0.5));
    /* living loops: signals keep flowing through the network */
    const flow = () => { const x = gsap.timeline({ repeat: -1, repeatDelay: 0.4 }); [0, 1, 2].forEach((i) => { x.to(sel('net', 'c' + i), { stroke: '#fbbf24', duration: 0.3, yoyo: true, repeat: 1 }, i * 0.5); x.fromTo(sel('net', 'l' + (i + 1)), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 }, i * 0.5 + 0.3); }); return x; };
    M.loop(0, 5.2, flow);
    M.loop(1, 5.0, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      .fromTo(sel('neu', 'wl'), { opacity: 0.2 }, { opacity: 1, duration: 0.35, stagger: 0.25 })
      .fromTo(sel('neu', 'sum'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.12, duration: 0.3, yoyo: true, repeat: 1 })
      .fromTo(sel('neu', 'o'), { scale: 0.3, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }));
    M.loop(2, 5.0, () => gsap.timeline({ repeat: -1, repeatDelay: 1.0 }).fromTo(sel('acc', 'af'), { attr: { width: 216 } }, { attr: { width: 1026 }, duration: 2.4, ease: 'power1.inOut' }));
    M.loop(3, 5.0, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
      .fromTo(sel('ed', 'eg'), { opacity: 0.2 }, { opacity: 1, duration: 0.1, stagger: 0.07 })
      .fromTo(sel('pa', 'pp'), { scale: 0.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, stagger: 0.2 })
      .fromTo(q('wh'), { filter: 'drop-shadow(0 0 0px rgba(52,211,153,0))' }, { filter: 'drop-shadow(0 0 22px rgba(52,211,153,.9))', duration: 0.5, yoyo: true, repeat: 1 }));
    M.loop(4, 4.6, () => M.cycle(Q('bd gp'), 'rgba(251,191,36,.85)', 0.7));
    M.loop(5, 4.6, () => M.cycle(Q('f0 f1 f2'), 'rgba(167,139,250,.85)', 0.6));
    return M.done();
  });
})();

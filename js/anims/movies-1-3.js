/* =========================================================
 * anims/movies-1-3.js — lesson 1-3 teacher-driven movies (shell:
 * movie-kit.js; each beat plays, then FREEZES).
 *   aiLifeMovie (station daily)   : AI in your pocket (recommendations, voice,
 *                                   translation, face unlock) + AI in industry
 *   cautionMovie (station caution): good at patterns · needs caution · the doctor
 *                                   decides · the black box
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const ART_PHONE = (inner) => `<rect x="10" y="10" width="200" height="380" rx="30" fill="#0f172a" stroke="#94a3b8" stroke-width="6"/><rect x="26" y="50" width="168" height="300" rx="10" fill="#1e293b"/>${inner}`;
  const FACE = `<g class="scan"><ellipse cx="110" cy="190" rx="54" ry="68" fill="none" stroke="#38bdf8" stroke-width="6" stroke-dasharray="12 8"/><circle cx="90" cy="178" r="7" fill="#38bdf8"/><circle cx="130" cy="178" r="7" fill="#38bdf8"/><path d="M90 220 Q110 234 130 220" fill="none" stroke="#38bdf8" stroke-width="6"/></g>
    <rect class="beam" x="40" y="120" width="140" height="6" rx="3" fill="#34d399"/>`;
  const ROUTE = `<rect x="10" y="10" width="520" height="300" rx="22" fill="#1e293b"/>
    <path class="long" d="M60 260 C120 60 260 300 330 80 S470 260 480 60" fill="none" stroke="#f87171" stroke-width="8" stroke-dasharray="16 10"/>
    <path class="short" d="M60 260 L480 60" fill="none" stroke="#34d399" stroke-width="10" stroke-linecap="round"/>
    <circle cx="60" cy="260" r="16" fill="#fbbf24"/><circle cx="480" cy="60" r="16" fill="#38bdf8"/>`;
  const XRAY = `<rect x="10" y="10" width="420" height="420" rx="24" fill="#020617" stroke="#475569" stroke-width="6"/>
    ${range(5).map((k) => `<path d="M80 ${110 + k * 50} Q220 ${70 + k * 50} 360 ${110 + k * 50}" fill="none" stroke="#cbd5e1" stroke-width="10" opacity=".75"/>`).join('')}
    <rect x="210" y="70" width="20" height="320" rx="10" fill="#e2e8f0" opacity=".8"/>`;
  const BOX3D = `<path d="M60 90 L200 30 L340 90 L200 150Z" fill="#334155"/><path d="M60 90 L200 150 L200 330 L60 270Z" fill="#0f172a"/><path d="M340 90 L200 150 L200 330 L340 270Z" fill="#1e293b"/>`;

  /* ═════════════════════════ aiLifeMovie ═════════════════════════ */
  K.defineAnim('aiLifeMovie', (stage, props, api) => {
    const U = MK.ui('lf-');
    const d = MK.RTL() ? 720 : 0; // RTL: the first of a pair sits on the right
    const M = MK.create(stage, api, {
      cls: 'mv-life mv-l13', prefix: 'lf-', beats: 6, cast: { 'ch-st': 'studentL' },
      html: (L) => `
  <div id="lf-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.pill('h1', 470, 240, '👀 ' + L('شفت: ماتشات كورة', 'watched: football'), 't-slate')}
    ${U.pill('h2', 470, 330, '❤️ ' + L('حبّيت: فيديوهات برمجة', 'liked: coding videos'), 't-slate')}
    ${U.pill('h3', 470, 420, '⏱️ ' + L('قعدت كتير: علوم', 'stayed long: science'), 't-slate')}
    ${U.emo('ai0', 960, 300, 132, 90, '🤖')}
    ${U.box('rec', 1120, 230, 760, 't-green', { ic: '🎯', h: L('مقترح ليك', 'Recommended for you'), p: '⚽ ' + L('ملخص ماتش', 'match highlights') + ' · 💻 ' + L('كورس برمجة', 'coding course'), s: L('بيتنبّأ بتفضيلاتك من سلوكك السابق', 'predicts your taste from past behaviour') })}
    ${U.pill('ex0', 1120, 560, 'YouTube · Amazon · Spotify', 't-blue')}

    ${U.bub('b1', 30, 505, 400, L('يا مساعد، فكّرني بالمذاكرة الساعة 8', 'Assistant, remind me to study at 8') + ' 🎙️')}
    ${U.pill('v1', 470, 240, '🎙️ ' + L('يتعرّف على الصوت', 'recognises the voice'), 't-blue')}
    ${U.pill('v2', 470, 330, '🧠 ' + L('يفهم الأمر', 'understands the command'), 't-violet')}
    ${U.pill('v3', 470, 420, '✅ ' + L('ينفّذه: منبّه 8:00', 'carries it out: alarm 8:00'), 't-green')}
    ${U.box('tr', 1120, 230, 760, 't-amber', { ic: '🌐', h: L('الترجمة الآلية', 'Machine translation'), p: L('بتترجم النصوص تلقائيًا للغات مختلفة', 'translates text automatically into other languages'), s: 'Google Translate · DeepL' })}
    ${U.pill('t1', 1120, 540, L('صباح الخير', 'صباح الخير') + ' ➜ <bdi>Good morning</bdi>', 'solid')}
    ${U.pill('ex1', 470, 520, 'Siri · Google Assistant', 't-blue')}

    ${U.art('ph', 600, 210, 220, 400, '0 0 220 400', ART_PHONE(FACE))}
    ${U.emo('lock', 860, 330, 120, 80, '🔒')}${U.emo('unlock', 860, 330, 120, 80, '🔓')}
    ${U.box('fr', 1120, 230, 760, 't-blue', { ic: '🙂', h: L('التعرّف على الوجه', 'Face recognition'), p: L('يكتشف ويتعرّف على وجوه الناس في الصور تلقائيًا', 'detects and recognises people’s faces in images automatically'), s: L('مثال: فتح قفل الموبايل', 'e.g. unlocking your phone') })}

    ${U.box('in1', 470 + d, 230, 690, 't-red', { ic: '🏥', h: L('الرعاية الصحية', 'Healthcare'), p: L('تشخيص بالصور: يكشف الأمراض من الأشعة السينية والمقطعية', 'image diagnosis: finds disease in X-ray and CT scans'), s: L('ويدعم اكتشاف الأدوية', 'and supports drug discovery') })}
    ${U.box('in2', 1190 - d, 230, 690, 't-green', { ic: '🌾', h: L('الزراعة', 'Agriculture'), p: L('التنبؤ بموعد الحصاد', 'predicting harvest time'), s: L('كشف الآفات والأمراض في النبات', 'detecting pests and plant disease') })}
    ${U.box('in3', 470 + d, 230, 690, 't-amber', { ic: '🏭', h: L('التصنيع', 'Manufacturing'), p: L('أتمتة فحص جودة المنتج', 'automated quality inspection'), s: L('الصيانة التنبؤية = نتنبّأ بالعطل قبل ما يحصل', 'predictive maintenance = predict a fault before it happens') })}
    ${U.box('in4', 1190 - d, 230, 690, 't-blue', { ic: '🚚', h: L('الخدمات اللوجستية', 'Logistics'), p: L('تحسين مسارات التوصيل', 'optimising delivery routes'), s: L('أقصر وأوفر طريق للعربية', 'the shortest, cheapest route') })}
    ${U.art('route', 1260 - d, 500, 540, 260, '0 0 540 320', ROUTE)}
    ${U.emo('gear', 556 + d, 520, 124, 80, '⚙️')}${U.pill('warn', 700 + d, 540, '⚠️ ' + L('العطل جاي بعد يومين', 'fault due in 2 days'), 't-red')}

    ${U.hd(0, '🎯 ' + L('أنظمة الترشيح', 'Recommendation systems'))}
    ${U.hd(1, '🎙️ ' + L('المساعد الصوتي', 'Voice assistant') + ' · 🌐 ' + L('الترجمة الآلية', 'Machine translation'))}
    ${U.hd(2, '🙂 ' + L('التعرّف على الوجه', 'Face recognition'))}
    ${U.hd(3, '🏥 ' + L('الصحة', 'Health') + ' · 🌾 ' + L('الزراعة', 'Agriculture'))}
    ${U.hd(4, '🏭 ' + L('التصنيع', 'Manufacturing') + ' · 🚚 ' + L('اللوجستيات', 'Logistics'))}
    ${U.nt(2, '⚠️ ' + L('«الترجمة الآلية = بشر بيترجموا يدويًا» ← غلط؛ هي تلقائية', '“Machine translation = humans translating by hand” → false; it is automatic'), 'warn')}
  </div>
  <div id="lf-recap" class="mv-recap">
    ${U.hd(5, '💡 ' + L('الخلاصة: كل استخدام في مكانه', 'The point: each use in its place'))}
    ${U.box('r0', 90, 140, 1740, 't-green', { h: '📱 ' + L('في حياتنا', 'In daily life'), p: L('الترشيحات · المساعد الصوتي · الترجمة الآلية · التعرّف على الوجه', 'recommendations · voice assistants · machine translation · face recognition') })}
    ${[[L('التشخيص بالصور', 'Image diagnosis'), L('صحة', 'Health'), '🏥'], [L('كشف الآفات', 'Pest detection'), L('زراعة', 'Agriculture'), '🌾'],
      [L('الصيانة التنبؤية', 'Predictive maintenance'), L('تصنيع', 'Manufacturing'), '🏭'], [L('تحسين المسارات', 'Route optimisation'), L('لوجستيات', 'Logistics'), '🚚']]
      .map(([a, b, e], k) => U.pill('m' + k, 140 + (d ? 1 - (k % 2) : k % 2) * 880, 360 + Math.floor(k / 2) * 110, `${e} ${a} ← ${b}`, 't-blue')).join('')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — recommendations */
    let c = at(0);
    frame(0, c);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    Q('h1 h2 h3').forEach((h, i) => IN(h, c + 0.9 + i * 0.5, 0.4, { x: -30 }));
    POP(q('ai0'), c + 2.6, 0.5); SND('pop', c + 2.6);
    tl.to(Q('h1 h2 h3'), { x: 30, opacity: 0.35, duration: 0.6, stagger: 0.15 }, c + 3.0);
    IN(q('rec'), c + 3.8, 0.5, { x: 40 }); SND('ok', c + 3.8);
    IN(q('ex0'), c + 4.8, 0.4, { y: 20 });

    /* 1 — voice assistant + translation */
    c = at(1);
    frame(1, c);
    OUT(Q('h1 h2 h3 ai0 rec ex0'), c, 0.4);
    IN(q('b1'), c + 0.6, 0.4, { y: 14 });
    Q('v1 v2 v3').forEach((v, i) => { IN(v, c + 1.6 + i * 0.7, 0.4, { x: -30 }); SND('pop', c + 1.6 + i * 0.7); });
    IN(q('ex1'), c + 3.8, 0.4, { y: 20 });
    IN(q('tr'), c + 4.6, 0.5, { x: 40 });
    POP(q('t1'), c + 5.6, 0.5); SND('ok', c + 5.6);

    /* 2 — face recognition */
    c = at(2);
    frame(2, c, 5.2);
    OUT(Q('b1 v1 v2 v3 ex1 tr t1'), c, 0.4);
    IN(q('ph'), c + 0.6, 0.5, { y: 30 }); IN(q('lock'), c + 0.8, 0.3);
    tl.fromTo(all('#lf-ph .beam'), { y: 0 }, { y: 200, duration: 0.8, yoyo: true, repeat: 2, ease: 'sine.inOut' }, c + 1.2);
    OUT(q('lock'), c + 3.4, 0.2); POP(q('unlock'), c + 3.5, 0.4); SND('ok', c + 3.5);
    IN(q('fr'), c + 1.4, 0.5, { x: 40 });

    /* 3 — health + agriculture */
    c = at(3);
    frame(3, c);
    OUT(Q('ph unlock fr ch-st'), c, 0.4);
    IN(q('in1'), c + 0.7, 0.5, { y: 30 }); SND('pop', c + 0.7);
    IN(q('in2'), c + 2.2, 0.5, { y: 30 }); SND('pop', c + 2.2);

    /* 4 — manufacturing + logistics */
    c = at(4);
    frame(4, c);
    OUT(Q('in1 in2'), c, 0.4);
    IN(q('in3'), c + 0.7, 0.5, { y: 30 }); SND('pop', c + 0.7);
    POP(q('gear'), c + 1.6, 0.4);
    tl.fromTo(q('gear'), { scale: 1 }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, c + 1.9);
    POP(q('warn'), c + 2.6, 0.4); SND('bad', c + 2.6);
    IN(q('in4'), c + 3.6, 0.5, { y: 30 });
    IN(q('route'), c + 4.4, 0.5);
    tl.fromTo(all('#lf-route .long'), { opacity: 1 }, { opacity: 0.25, duration: 0.5 }, c + 5.6);
    tl.fromTo(all('#lf-route .short'), { strokeDasharray: '0 700' }, { strokeDasharray: '700 0', duration: 1.0 }, c + 5.0);
    SND('ok', c + 6.0);

    /* 5 — recap */
    c = at(5);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd5'), c + 0.6, 0.5, { y: -30 });
    IN(q('r0'), c + 1.0, 0.6, { y: 30 }); SND('pop', c + 1.0);
    range(4).forEach((k) => { IN(q('m' + k), c + 2.0 + k * 0.6, 0.4, { x: 30 }); SND('pop', c + 2.0 + k * 0.6); });
    return M.done();
  });

  /* ═════════════════════════ cautionMovie ═════════════════════════ */
  K.defineAnim('cautionMovie', (stage, props, api) => {
    const U = MK.ui('ca-');
    const rtl = MK.RTL(); // RTL: the first item sits on the right
    const CAUTION = [['⚖️', 'الأحكام الأخلاقية', 'ethical judgements'], ['🔒', 'الخصوصية', 'privacy'], ['👤', 'القرار النهائي (مين المسؤول؟)', 'the final decision (who is responsible?)'],
      ['📊', 'البيانات المتحيزة', 'biased data'], ['😵', 'الهلوسة', 'hallucination'], ['©️', 'حقوق النشر', 'copyright'], ['⬛', 'الصندوق الأسود', 'the black box']];
    const M = MK.create(stage, api, {
      cls: 'mv-caution mv-l13', prefix: 'ca-', beats: 6, cast: { 'ch-dr': 'doctor' },
      html: (L) => `
  <div id="ca-stage" class="mv-stage">
    ${U.ch('ch-dr', 40, 470, 'md')}
    ${U.box('g1', rtl ? 1430 : 470, 230, 450, 't-green', { ic: '🔍', h: L('الأنماط', 'Patterns'), p: L('إيجاد وتصنيف الأنماط في بيانات معقّدة (صور ونصوص)', 'finding and sorting patterns in complex data (images, text)') })}
    ${U.box('g2', 950, 230, 450, 't-green', { ic: '🖼️', h: L('التعرّف والتوليد', 'Recognising & generating'), p: L('للصور والصوت والنص', 'images, audio and text') })}
    ${U.box('g3', rtl ? 470 : 1430, 230, 450, 't-green', { ic: '📊', h: L('التنبؤ', 'Prediction'), p: L('تنبؤ احتمالي من البيانات', 'probabilistic prediction from data') })}
    ${U.pill('g4', 470, 560, '⚡ ' + L('ومعالجة كميات بيانات كبيرة بسرعة', 'and fast processing of large amounts of data'), 't-blue')}
    ${CAUTION.map(([e, a, b], k) => U.pill('c' + k, 480 + (rtl ? 1 - (k % 2) : k % 2) * 700, 220 + Math.floor(k / 2) * 100, `${e} ${L(a, b)}`, 't-amber')).join('')}
    ${U.art('xr', 480, 200, 440, 440, '0 0 440 440', XRAY)}
    <div id="ca-mark" class="later ca-mark" ${MK.S(760, 380, 110, 110)}></div>
    ${U.pill('x1', 980, 240, '🤖 ' + L('يعلّم على مكان مشكوك فيه بسرعة ودقة', 'marks a suspicious spot fast and precisely'), 't-blue')}
    ${U.pill('x2', 980, 340, '👨‍⚕️ ' + L('القرار النهائي للطبيب', 'the doctor makes the final decision'), 't-green')}
    ${U.pill('x3', 980, 440, '❤️ ' + L('الغلط بيأثر على حياة إنسان', 'a mistake affects a human life'), 't-red')}
    ${U.bub('b2', 30, 505, 400, L('شكرًا… هراجعه وأقرّر أنا', 'Thanks… I will check it and decide') + ' 🩺')}
    ${U.pill('in', 470, 380, '📄 ' + L('طلب قرض', 'loan request'), 'solid')}
    ${U.art('bx', 820, 200, 400, 360, '0 0 400 360', BOX3D)}
    ${U.emo('qm', 954, 300, 132, 90, '❓')}
    ${U.pill('out', 1300, 380, '❌ ' + L('مرفوض', 'rejected'), 't-red')}
    ${U.pill('why', 1300, 480, '🤷 ' + L('ليه؟ محدش عارف', 'why? nobody knows'), 't-slate')}
    <div id="ca-nums" class="typed code later" ${MK.S(1290, 200, 590)}>0.82 −1.30 0.07 2.41<br>−0.55 1.13 0.96 −2.02<br>0.33 −0.71 1.58 0.04<br>… ${L('ملايين ومليارات الأرقام', 'millions, billions of numbers')}</div>
    ${U.pill('res', 470, 600, L('النتيجة واضحة (مقبول/مرفوض)… بس مفيش سبب مكتوب نقدر نقراه', 'The result is clear (yes/no)… but no written reason we can read'), 't-amber')}
    ${[['🏦', L('قرض اترفض', 'A rejected loan'), L('ليه؟ محدش عارف يشرح', 'why? nobody can explain')], ['💼', L('وظيفة اترفضت', 'A rejected job'), L('يمكن بسبب تحيّز (زي الحي)', 'maybe bias (like the area)')],
      ['🩺', L('تشخيص طبي', 'A diagnosis'), L('الطبيب لازم يفهم شاف إيه', 'the doctor must see why')], ['🛡️', L('رفض تأمين', 'A refused claim'), L('لو غلط… مين يتحاسب؟', 'if wrong… who answers?')]]
      .map(([ic, h, p], k) => U.box('h' + k, 470 + (rtl ? 1 - (k % 2) : k % 2) * 715, 220 + Math.floor(k / 2) * 230, 690, 't-red', { ic, h, p })).join('')}

    ${U.hd(0, '💪 ' + L('الذكاء الاصطناعي شاطر في إيه؟', 'What is AI good at?'))}
    ${U.hd(1, '⚠️ ' + L('ومحتاج حذر في إيه؟', 'And where do we need caution?'))}
    ${U.hd(2, '🩻 ' + L('الـAI يقترح… والطبيب يقرّر', 'AI suggests… the doctor decides'))}
    ${U.hd(3, '⬛ ' + L('مشكلة الصندوق الأسود', 'The black-box problem'))}
    ${U.hd(4, '🔦 ' + L('جوّه الصندوق: ملايين الأرقام', 'Inside the box: millions of numbers'))}
    ${U.hd(5, '🚨 ' + L('فين الصندوق الأسود ممكن يأذي؟', 'Where can the black box hurt?'))}
    ${U.nt(1, '⚠️ ' + L('«نسيب الأحكام الأخلاقية للـAI بالكامل» ← غلط', '“Leave ethical judgements fully to AI” → false'), 'bad')}
    ${U.nt(3, L('لو مش فاهمين «ليه»، صعب نتحقّق إن القرار صح أو نكتشف الغلط', 'Without the “why”, we cannot check the decision or find the mistake'), 'warn')}
    ${U.nt(4, L('من غير «ليه» مانقدرش نتحقّق ولا نكتشف التحيّز ولا نعرف نحاسب مين', 'Without the “why” we cannot verify, spot bias or hold anyone accountable'), 'bad')}
    ${U.nt(5, '✅ ' + L('الحل: إنسان يراجع في المهام الحسّاسة — والعالم بيشتغل على XAI', 'The fix: a human reviews sensitive tasks — and the world works on XAI'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — good at */
    let c = at(0);
    frame(0, c);
    IN(q('ch-dr'), c + 0.3, 0.6, { x: -80 });
    Q('g1 g2 g3').forEach((g, i) => { IN(g, c + 0.8 + i * 0.8, 0.5, { y: 30 }); SND('ok', c + 0.8 + i * 0.8); });
    IN(q('g4'), c + 3.4, 0.4, { y: 20 });

    /* 1 — needs caution */
    c = at(1);
    frame(1, c, 5.6);
    OUT(Q('g1 g2 g3 g4'), c, 0.4);
    range(CAUTION.length).forEach((k) => { IN(q('c' + k), c + 0.7 + k * 0.6, 0.4, { x: 30 }); SND('pop', c + 0.7 + k * 0.6); });

    /* 2 — AI suggests, the doctor decides */
    c = at(2);
    frame(2, c);
    OUT(Q(range(CAUTION.length).map((k) => 'c' + k).join(' ')), c, 0.4);
    IN(q('xr'), c + 0.6, 0.5);
    POP(q('mark'), c + 1.4, 0.5); SND('pop', c + 1.4);
    tl.fromTo(q('mark'), { boxShadow: '0 0 0 rgba(248,113,113,0)' }, { boxShadow: '0 0 40px rgba(248,113,113,.95)', duration: 0.4, yoyo: true, repeat: 3 }, c + 1.9);
    IN(q('x1'), c + 1.8, 0.4, { x: 30 });
    IN(q('x2'), c + 3.0, 0.4, { x: 30 }); SND('ok', c + 3.0);
    IN(q('x3'), c + 4.0, 0.4, { x: 30 });
    IN(q('b2'), c + 5.0, 0.4, { y: 14 });

    /* 3 — the black box */
    c = at(3);
    frame(3, c, 5.4);
    OUT(Q('xr mark x1 x2 x3 b2'), c, 0.4);
    IN(q('in'), c + 0.6, 0.4, { x: -30 });
    IN(q('bx'), c + 1.0, 0.5, { scale: 0.85 });
    tl.to(q('in'), { x: 360, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 1.8);
    POP(q('qm'), c + 2.6, 0.4);
    tl.fromTo(q('bx'), { rotation: 0 }, { rotation: 2, duration: 0.08, yoyo: true, repeat: 7, transformOrigin: '50% 100%' }, c + 2.6);
    POP(q('out'), c + 3.4, 0.4); SND('bad', c + 3.4);
    IN(q('why'), c + 4.2, 0.4, { y: 20 });

    /* 4 — inside: millions of numbers */
    c = at(4);
    frame(4, c, 4.8);
    OUT(Q('qm out why'), c, 0.3);
    tl.to(all('#ca-bx path')[0], { y: -60, opacity: 0.4, duration: 0.6 }, c + 0.6);
    IN(q('nums'), c + 1.2, 0.5, { x: 40 }); SND('pop', c + 1.2);
    IN(q('res'), c + 2.8, 0.5, { y: 20 });

    /* 5 — where it can hurt */
    c = at(5);
    frame(5, c, 5.0);
    OUT(Q('bx nums res'), c, 0.4);
    range(4).forEach((k) => { IN(q('h' + k), c + 0.7 + k * 0.8, 0.5, { y: 30 }); SND('bad', c + 0.7 + k * 0.8); });
    return M.done();
  });
})();

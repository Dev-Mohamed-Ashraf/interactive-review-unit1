/* =========================================================
 * anims/movies-5-1.js — lesson 5-1 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   collectMovie : collect → organize → analyze · primary data ·
 *                  secondary data · combine · population & sample ·
 *                  simple random · stratified · sampling bias (3 kinds) ·
 *                  confident but wrong + reducing bias
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  /* the population: 8 × 6 = 48 people-dots */
  const DOTS = range(48).map((k) => `<circle class="d" cx="${70 + (k % 8) * 88}" cy="${70 + Math.floor(k / 8) * 76}" r="26" fill="#475569" stroke="#0f172a" stroke-width="4"/>`).join('');
  const POP = `<rect x="4" y="4" width="752" height="512" rx="30" fill="rgba(15,23,42,.85)" stroke="#64748b" stroke-width="4"/>${DOTS}`;
  const SRS = [3, 9, 14, 20, 27, 33, 38, 44];
  /* strata: rows 0–2 (24 = 50%), rows 3–4 (16 ≈ 33%), row 5 (8 ≈ 17%) → a 12-person sample 6 : 4 : 2 */
  const STRAT = [{ rows: [0, 1, 2], col: '#38bdf8', pick: [2, 5, 11, 12, 17, 22] }, { rows: [3, 4], col: '#34d399', pick: [26, 29, 35, 38] }, { rows: [5], col: '#fbbf24', pick: [41, 46] }];

  K.defineAnim('collectMovie', (stage, props, api) => {
    const U = MK.uiL('c1-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l51', prefix: 'c1-', beats: 10, cast: { 'ch-s': 'studentL', 'ch-b': 'student' },
      html: (L) => `
  <div id="c1-stage" class="mv-stage">
    ${U.pill('goal', 640, 150, '🎯 ' + L('الأول: نوضّح الغرض من التحليل', 'First: make the purpose clear'), 'solid')}
    ${U.box('col', 120, 270, 480, 't-blue', { ic: '📥', h: L('١ جمع', '1 Collect'), p: L('نخطّط نجمع إيه وإزاي', 'plan what to gather and how') })}
    ${U.box('org', 720, 270, 480, 't-violet', { ic: '🗂️', h: L('٢ تنظيم', '2 Organize'), p: L('نرتّب وننظّف', 'arrange and tidy') })}
    ${U.box('ana', 1320, 270, 480, 't-green', { ic: '📊', h: L('٣ تحليل', '3 Analyze'), p: L('نطلع باستنتاجات', 'draw conclusions') })}
    ${U.emo('a1', 610, 300, 100, 70, L('⬅', '➜'))}
    ${U.emo('a2', 1210, 300, 100, 70, L('⬅', '➜'))}
    ${U.pill('bad', 120, 560, '🗑️ ' + L('بيانات مش مطابقة للغرض…', 'Data that does not match the purpose…'), 't-red')}
    ${U.pill('bad2', 900, 560, L('…مفيش تنظيم ولا تحليل يصلّحها', '…no organizing or analysis can rescue it'), 't-red')}
    ${U.xc('x0', 1510, 160)}

    ${U.ch('ch-s', 90, 300, 'md')}
    ${[['📋', L('استبيانات', 'Surveys')], ['🎤', L('مقابلات', 'Interviews')], ['👀', L('ملاحظة', 'Observation')], ['🧪', L('تجارب', 'Experiments')]]
      .map(([e, t], k) => U.pill('m' + k, 380, 200 + k * 100, e + ' ' + t, 't-green')).join('')}
    ${U.box('prim', 1000, 200, 820, 't-green', { ic: '🆕', h: L('بيانات أولية', 'Primary data'), p: L('بنجمعها من جديد عشان تناسب غرضنا بالظبط', 'newly collected to fit our exact purpose'), s: '✅ ' + L('أصيلة وموثوقة', 'original and reliable') + ' · ⏳💰 ' + L('محتاجة وقت وجهد وتكلفة', 'costs time, effort and money') })}

    ${[['🌐', L('بيانات مفتوحة', 'Open datasets')], ['📈', L('إحصائيات جاهزة', 'Existing statistics')], ['📑', L('تقارير قطاعية', 'Industry reports')]]
      .map(([e, t], k) => U.pill('s' + k, 380, 220 + k * 110, e + ' ' + t, 't-blue')).join('')}
    ${U.box('sec', 1000, 200, 820, 't-blue', { ic: '📚', h: L('بيانات ثانوية', 'Secondary data'), p: L('جمعها ونشرها غيرنا… وإحنا بنستخدمها', 'collected and published by others… we reuse it'), s: '⚡ ' + L('كمية كبيرة بسرعة', 'lots of data, fast') + ' · ⚠️ ' + L('ممكن ماتطابقش غرضك أو فيها تحيّز/حذف', 'may not fit, may hide bias or omissions') })}

    ${U.box('pc', 120, 200, 760, 't-green', { ic: '🆕', h: L('الأولية = القلب', 'Primary = the core'), p: L('موثوقة ومصمّمة لغرضك', 'reliable, designed for you') })}
    ${U.box('sc', 1040, 200, 760, 't-blue', { ic: '📚', h: L('الثانوية = الحجم', 'Secondary = the scale'), p: L('بيانات كبيرة مانقدرش نجمعها لوحدنا', 'large data we could not gather alone') })}
    ${U.pill('mix', 420, 450, '🤝 ' + L('عمليًا بنجمع الاتنين حسب الغرض والقيود', 'In practice we combine both by purpose and constraints'), 't-green')}
    ${U.pill('cz', 360, 570, '💡 ' + L('تعداد حكومي نزّلته = بيانات ثانوية بالنسبة لك', 'A government census you download = secondary data for you'), 'solid')}

    ${U.art('pop', 100, 150, 760, 520, '0 0 760 520', POP)}
    ${U.pill('lp', 980, 190, '👥 ' + L('المجتمع الإحصائي = المجموعة كلها', 'Population = the whole group'), 't-slate')}
    ${U.pill('ls', 980, 290, '🟡 ' + L('العينة = الجزء اللي بندرسه فعلًا', 'Sample = the part we actually survey'), 'solid')}
    ${U.pill('cen', 980, 420, '📋 ' + L('حصر شامل (تعداد) = نمسح المجتمع كله', 'Census = survey the whole population'), 't-violet')}
    ${U.pill('ssv', 980, 520, '🔍 ' + L('مسح بالعينة = نمسح جزء مختار', 'Sample survey = survey a chosen part'), 't-violet')}

    ${U.emo('dice', 1000, 170, 140, 100, '🎲')}
    ${U.box('srs', 980, 320, 840, 't-amber', { h: L('المعاينة العشوائية البسيطة', 'Simple random sampling'), p: L('بالصدفة البحتة — لكل واحد فرصة متساوية', 'pure chance — everyone has an equal chance'), s: L('أساسية، وتنفع حتى لو مانعرفش كتير عن المجتمع', 'basic; works even with little knowledge of the population') })}

    ${[['#38bdf8', L('طبقة ١ · 50%', 'Stratum 1 · 50%')], ['#34d399', L('طبقة ٢ · 33%', 'Stratum 2 · 33%')], ['#fbbf24', L('طبقة ٣ · 17%', 'Stratum 3 · 17%')]]
      .map(([c, t], k) => `<div id="c1-st${k}" class="pill t-slate later" style="inset-inline-start:980px;top:${170 + k * 84}px;border-color:${c}">${t}</div>`).join('')}
    ${U.pill('sp', 1360, 254, '🎯 ' + L('العينة 6 : 4 : 2', 'Sample 6 : 4 : 2'), 'solid')}
    ${U.box('str', 980, 440, 840, 't-green', { h: L('المعاينة الطبقية', 'Stratified sampling'), p: L('نقسّم المجتمع طبقات (صف، سن، نوع) وبعدين عشوائي من كل طبقة', 'divide into strata (year, age, gender), then pick randomly from each'), s: L('العينة بتعكس تركيب المجتمع ← تحيّز أقل', 'the sample mirrors the population → less bias') })}

    ${U.box('bdef', 260, 160, 1400, 't-red', { h: '⚠️ ' + L('تحيّز المعاينة', 'Sampling bias'), p: L('طريقة اختيار العينة متحيّزة ← العينة ماتعكسش المجتمع ← مانقدرش نعمّم', 'a biased way of choosing → the sample misrepresents the population → no generalizing') })}
    ${U.box('b0', 80, 360, 560, 't-red', { ic: '🙋', h: L('الاختيار الذاتي', 'Self-selection'), p: L('اللي عايز يرد بس هو اللي بيرد', 'only those who want to reply do'), s: L('استبيان ويب: يرد المهتمين بس', 'web survey: only the keen reply') })}
    ${U.box('b1', 680, 360, 560, 't-amber', { ic: '🎭', h: L('تحيّز الاستجابة', 'Response bias'), p: L('بيجاوبوا الإجابة «الحلوة» مش الحقيقية', 'they give the "nice" answer, not the true one'), s: L('يقول بذاكر أكتر من الحقيقة', 'reports more study time than real') })}
    ${U.box('b2', 1280, 360, 560, 't-violet', { ic: '🚉', h: L('تحيّز الزمان/المكان', 'Time/location bias'), p: L('المسح محصور في وقت أو مكان', 'survey limited to one time or place'), s: L('محطة الضهر أيام الشغل: يغيب الموظفين والطلبة', 'station at weekday noon: workers and students missed') })}

    ${U.ch('ch-b', 100, 300, 'md')}
    ${U.pill('sl', 380, 190, '🌐 ' + L('استبيان ويب: «بتنام كام ساعة؟»', 'Web survey: "how many hours do you sleep?"'), 't-blue')}
    ${U.pill('sr', 380, 290, '😴 ' + L('اللي ردّوا: اللي بيناموا قليل وبيشتكوا', 'Who replied: short sleepers who complain'), 't-red')}
    ${U.pill('savg', 380, 390, '🧮 ' + L('المتوسط = 5 ساعات… حساب دقيق', 'Mean = 5 hours… precise arithmetic'), 'solid')}
    ${U.pill('swr', 380, 490, '❌ ' + L('…بس على المجموعة الغلط!', '…but on the wrong group!'), 't-red')}
    ${['✔ ' + L('اختيار من غير تحيّز', 'unbiased selection'), '✔ ' + L('نراعي الطبقات', 'account for strata'), '✔ ' + L('أسئلة تسمح بإجابة صادقة', 'questions that allow honest answers'), '✔ ' + L('طريقة إجراء مدروسة', 'careful conduct')]
      .map((t, k) => U.pill('r' + k, 1180, 200 + k * 100, t, 't-green')).join('')}

    ${U.hd(0, L('جمع ← تنظيم ← تحليل', 'Collect → organize → analyze'))}
    ${U.hd(1, '🆕 ' + L('البيانات الأولية', 'Primary data'))}
    ${U.hd(2, '📚 ' + L('البيانات الثانوية', 'Secondary data'))}
    ${U.hd(3, '🤝 ' + L('الاتنين مع بعض', 'Both together'))}
    ${U.hd(4, '👥 ' + L('المجتمع والعينة', 'Population and sample'))}
    ${U.hd(5, '🎲 ' + L('العشوائية البسيطة', 'Simple random'))}
    ${U.hd(6, '🧁 ' + L('المعاينة الطبقية', 'Stratified sampling'))}
    ${U.hd(7, '⚠️ ' + L('تلات أنواع للتحيّز', 'Three kinds of bias'))}
    ${U.hd(8, '😬 ' + L('واثقة… بس غلط', 'Confident… but wrong'))}
    ${U.nt(0, L('مرحلة الجمع بتحدّد جودة التحليل كله', 'The collection stage decides the quality of the whole analysis'), 'warn')}
    ${U.nt(4, L('العينة العادلة = نسخة مصغّرة من المجتمع', 'A fair sample = a miniature copy of the population'), 'ok')}
    ${U.nt(6, '⚠️ ' + L('مش «ممثّل واحد من كل طبقة» — ده اختيار عشوائي من كل طبقة', 'Not "one representative per stratum" — it is a random pick from each'), 'warn')}
    ${U.nt(7, L('الاختيار الذاتي = مين اتسأل · الاستجابة = إزاي جاوبوا', 'Self-selection = who was asked · response = how they answered'))}
  </div>
  <div id="c1-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '🆕 ' + L('أولية: نجمعها لغرضنا · 📚 ثانوية: جمعها غيرنا', 'Primary: gathered for us · secondary: gathered by others'), 't-green')}
    ${U.pill('x1', 120, 290, '👥 ' + L('المجتمع = الكل · العينة = جزء عادل منه', 'Population = the whole · sample = a fair part of it'), 't-slate')}
    ${U.pill('x2', 120, 400, '🎲 ' + L('بسيطة = صدفة بحتة · 🧁 طبقية = عشوائي من كل طبقة', 'Simple = pure chance · stratified = random from each stratum'), 't-amber')}
    ${U.pill('x3', 120, 510, '⚠️ ' + L('العينة المتحيّزة بتدّي إجابة واثقة… بس غلط', 'A biased sample gives a confident answer… that is wrong'), 't-red')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP: PP, OUT, SND, frame, sx } = M;
    const dots = M.board.querySelectorAll('#c1-pop .d');
    const D = (ks) => ks.map((k) => dots[k]);
    const paint = (ks, fill, t, stg) => tl.to(D(ks), { attr: { fill }, duration: 0.3, stagger: stg || 0 }, t);
    const ring = (ks, t, stg) => tl.fromTo(D(ks), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 1, stagger: stg || 0 }, t);

    /* 0 — collect → organize → analyze */
    let c = at(0);
    frame(0, c, 6.2);
    IN(q('goal'), c + 0.5, 0.4, { y: -20 });
    Q('col org ana').forEach((b, i) => { IN(b, c + 1.0 + i * 0.7, 0.45, { y: 30 }); SND('pop', c + 1.0 + i * 0.7); });
    IN(q('a1'), c + 1.5, 0.3); IN(q('a2'), c + 2.2, 0.3);
    IN(q('bad'), c + 3.4, 0.45, { x: -40 * sx }); SND('bad', c + 3.4);
    IN(q('bad2'), c + 4.2, 0.45, { x: 40 * sx });
    PP(q('x0'), c + 5.0, 0.5); SND('bad', c + 5.0);

    /* 1 — primary data */
    c = at(1);
    frame(1, c);
    OUT(Q('goal col org ana a1 a2 bad bad2 x0'), c, 0.4);
    IN(q('ch-s'), c + 0.5, 0.5, { x: -60 * sx });
    range(4).forEach((k) => { IN(q('m' + k), c + 1.2 + k * 0.5, 0.4, { x: 30 * sx }); SND('pop', c + 1.2 + k * 0.5); });
    IN(q('prim'), c + 3.6, 0.5, { y: 30 }); SND('ok', c + 3.6);

    /* 2 — secondary data */
    c = at(2);
    frame(2, c);
    OUT(Q('m0 m1 m2 m3 prim'), c, 0.4);
    range(3).forEach((k) => { IN(q('s' + k), c + 0.8 + k * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 0.8 + k * 0.6); });
    IN(q('sec'), c + 3.0, 0.5, { y: 30 }); SND('ok', c + 3.0);

    /* 3 — combine */
    c = at(3);
    frame(3, c);
    OUT(Q('ch-s s0 s1 s2 sec'), c, 0.4);
    IN(q('pc'), c + 0.6, 0.5, { x: -40 * sx }); SND('pop', c + 0.6);
    IN(q('sc'), c + 1.4, 0.5, { x: 40 * sx }); SND('pop', c + 1.4);
    PP(q('mix'), c + 2.6, 0.5); SND('ok', c + 2.6);
    IN(q('cz'), c + 4.0, 0.45, { y: 20 });

    /* 4 — population & sample */
    c = at(4);
    frame(4, c, 6.0);
    OUT(Q('pc sc mix cz'), c, 0.4);
    IN(q('pop'), c + 0.5, 0.5, { scale: 0.9 });
    tl.fromTo(dots, { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.02 }, c + 0.8);
    IN(q('lp'), c + 2.0, 0.4, { x: 30 * sx });
    paint(SRS, '#fbbf24', c + 2.8, 0.08); ring(SRS, c + 2.8, 0.08); SND('pop', c + 2.8);
    IN(q('ls'), c + 3.6, 0.4, { x: 30 * sx });
    IN(q('cen'), c + 4.4, 0.4, { y: 20 });
    IN(q('ssv'), c + 5.0, 0.4, { y: 20 });

    /* 5 — simple random */
    c = at(5);
    frame(5, c);
    OUT(Q('lp ls cen ssv'), c, 0.3);
    paint(SRS, '#475569', c + 0.2);
    IN(q('dice'), c + 0.6, 0.4);
    tl.fromTo(q('dice'), { rotation: 0 }, { rotation: 720, duration: 1.4, ease: 'power2.out' }, c + 0.6); SND('tap', c + 0.8);
    [40, 7, 18, 31, 2, 25, 45, 12].forEach((k, i) => {
      paint([k], '#fbbf24', c + 1.6 + i * 0.28); ring([k], c + 1.6 + i * 0.28);
    });
    SND('pop', c + 1.6);
    IN(q('srs'), c + 4.2, 0.5, { y: 30 }); SND('ok', c + 4.2);

    /* 6 — stratified */
    c = at(6);
    frame(6, c, 6.4);
    OUT(Q('dice srs'), c, 0.3);
    paint(range(48), '#475569', c + 0.2);
    STRAT.forEach((s, k) => {
      const ks = range(48).filter((i) => s.rows.includes(Math.floor(i / 8)));
      paint(ks, s.col, c + 0.8 + k * 0.6, 0.015);
      IN(q('st' + k), c + 0.8 + k * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 0.8 + k * 0.6);
    });
    STRAT.forEach((s, k) => {
      tl.to(D(s.pick), { attr: { stroke: '#fef3c7' }, duration: 0.2, stagger: 0.15 }, c + 3.0 + k * 0.7);
      ring(s.pick, c + 3.0 + k * 0.7, 0.15);
      tl.to(D(s.pick), { attr: { 'stroke-width': 10 }, duration: 0.2, stagger: 0.15 }, c + 3.0 + k * 0.7);
    });
    PP(q('sp'), c + 5.2, 0.45); SND('ok', c + 5.2);
    IN(q('str'), c + 5.6, 0.5, { y: 30 });

    /* 7 — three kinds of sampling bias */
    c = at(7);
    frame(7, c, 5.6);
    OUT(Q('pop st0 st1 st2 sp str'), c, 0.4);
    IN(q('bdef'), c + 0.6, 0.5, { y: -20 }); SND('bad', c + 0.6);
    Q('b0 b1 b2').forEach((b, i) => { IN(b, c + 1.8 + i * 1.0, 0.5, { y: 30 }); SND('pop', c + 1.8 + i * 1.0); });

    /* 8 — confident but wrong + reducing bias */
    c = at(8);
    frame(8, c);
    OUT(Q('bdef b0 b1 b2'), c, 0.4);
    IN(q('ch-b'), c + 0.5, 0.5, { x: -60 * sx });
    IN(q('sl'), c + 1.0, 0.4, { x: 30 * sx });
    IN(q('sr'), c + 1.7, 0.4, { x: 30 * sx }); SND('bad', c + 1.7);
    PP(q('savg'), c + 2.5, 0.45);
    IN(q('swr'), c + 3.2, 0.4, { x: 30 * sx }); SND('bad', c + 3.2);
    M.mood('ch-b', true, c + 3.2);
    range(4).forEach((k) => { IN(q('r' + k), c + 4.2 + k * 0.5, 0.4, { x: 30 * sx }); SND('pop', c + 4.2 + k * 0.5); });
    M.mood('ch-b', false, c + 6.2);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops */
    M.loop(0, 6.2, () => M.cycle(Q('col org ana'), 'rgba(56,189,248,.85)', 0.6));
    M.loop(1, 5.4, () => M.cycle(Q('m0 m1 m2 m3'), 'rgba(52,211,153,.85)', 0.45));
    M.loop(2, 5.0, () => M.cycle(Q('s0 s1 s2'), 'rgba(56,189,248,.85)', 0.5));
    M.loop(3, 5.2, () => M.cycle(Q('pc sc mix'), 'rgba(52,211,153,.85)', 0.6));
    /* the sample keeps being redrawn at random — a new fair sample each time */
    const redraw = (n) => () => {
      const x = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      x.to(dots, { attr: { fill: '#475569' }, duration: 0.3 });
      range(n).map(() => Math.floor(Math.random() * 48)).forEach((k, i) => x.to(dots[k], { attr: { fill: '#fbbf24' }, duration: 0.25 }, 0.4 + i * 0.18));
      return x;
    };
    M.loop(4, 5.6, redraw(8));
    M.loop(5, 5.0, redraw(8));
    M.loop(5, 5.0, () => gsap.timeline({ repeat: -1, repeatDelay: 1.6 }).fromTo(q('dice'), { rotation: 0 }, { rotation: 360, duration: 1.2, ease: 'power2.out' }));
    M.loop(6, 6.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).fromTo([...STRAT[0].pick, ...STRAT[1].pick, ...STRAT[2].pick].map((k) => dots[k]), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 0.3, stagger: 0.12, yoyo: true, repeat: 1 }));
    M.loop(7, 5.4, () => M.cycle(Q('b0 b1 b2'), 'rgba(248,113,113,.85)', 0.6));
    M.loop(8, 6.4, () => M.cycle(Q('r0 r1 r2 r3'), 'rgba(52,211,153,.85)', 0.45));
    return M.done();
  });
})();

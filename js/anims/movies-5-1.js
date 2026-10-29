/* =========================================================
 * anims/movies-5-1.js — lesson 5-1 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   collectMovie (stations collect 0–3 · sample 4–9): a collect → organize →
 *     analyze pipeline where good data gives a sound conclusion and off-purpose
 *     data cannot be rescued · primary data (four ways to gather, strengths,
 *     cost) · secondary data (three sources, a huge row count, a redacted
 *     report) · both together + a census flip card · population and sample on
 *     a 48-dot crowd · simple random (a dice picks dots) · stratified (rows
 *     recolour, 6 : 4 : 2) · three kinds of bias · a precise mean on the wrong
 *     group + how to reduce bias · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, flipAt, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  /* the population: 8 × 6 = 48 people-dots */
  const DOTS = range(48).map((k) => `<circle class="d d${k}" cx="${70 + (k % 8) * 88}" cy="${70 + Math.floor(k / 8) * 76}" r="26" fill="#475569" stroke="#0f172a" stroke-width="4"/>`).join('');
  const CROWD = `<rect x="4" y="4" width="752" height="512" rx="30" fill="rgba(15,23,42,.85)" stroke="#64748b" stroke-width="4"/>${DOTS}`;
  const PART = [1, 10, 15, 22, 28, 35, 41, 46];
  const SRS = [3, 9, 14, 20, 27, 33, 38, 44];
  /* strata: rows 0–2 (24 = 50%), rows 3–4 (16 ≈ 33%), row 5 (8 ≈ 17%) → a 12-person sample 6 : 4 : 2 */
  const STRAT = [{ rows: [0, 1, 2], col: '#38bdf8', pick: [2, 5, 11, 12, 17, 22] }, { rows: [3, 4], col: '#34d399', pick: [26, 29, 35, 38] }, { rows: [5], col: '#fbbf24', pick: [41, 46] }];

  K.defineAnim('collectMovie', (stage, props, api) => {
    const P = 'c1-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-l12 mv-c51', prefix: P, beats: 10, cast: { us: 'studentL' },
      html: (L) => {
        const card4 = (id, x, c, ic, h, p, k) => B.card(id, x, 170, 410, 400, c, { ic, h, p, k });
        return `
  <div id="c1-s0" class="mv-stage">
    ${B.mid('goal', 140, '🎯 ' + L('الأول: الغرض يتوضّح', 'First: the purpose is made clear'), 'c-amber')}
    ${B.card('col', 70, 230, 480, 0, 'c-blue', { ic: '📥', h: '① ' + L('جمع', 'Collect'), p: L('نخطّط هنجمع إيه وإزاي', 'plan what to gather and how') })}
    ${B.card('org', 720, 230, 480, 0, 'c-violet', { ic: '🗂️', h: '② ' + L('تنظيم', 'Organize'), p: L('نرتّب وننظّف', 'arrange and tidy') })}
    ${B.card('ana', 1370, 230, 480, 0, 'c-green', { ic: '📊', h: '③ ' + L('تحليل', 'Analyze'), p: L('نطلع باستنتاجات', 'draw conclusions') })}
    ${B.big('a1', 575, 300, 120, 64, B.arrow)}${B.big('a2', 1225, 300, 120, 64, B.arrow)}
    <div id="c1-ln" class="l12u l51-lane later" style="${B.at(70, 500, 1300, 100)}">${range(3).map((k) => `<span class="l51pk gdk gdk${k}">📄</span>`).join('')}${range(3).map((k) => `<span class="l51pk trk trk${k}">🗑️</span>`).join('')}</div>
    ${B.chip('ok0', 1400, 516, '✅ ' + L('استنتاج مناسب', 'a sound conclusion'), 'c-green', 450)}
    ${B.chip('ng0', 1400, 516, '❌ ' + L('استنتاج مش مناسب', 'an unfit conclusion'), 'c-red', 450)}
    ${B.mid('bad', 650, '🗑️ ' + L('بيانات مش مطابقة للغرض ← مفيش تنظيم ولا تحليل يصلّحها', 'data that misses the purpose → no organizing or analysis can rescue it'), 'c-red')}
  </div>
  <div id="c1-s1" class="mv-stage">
    ${B.ch('us', 70, 400, 'md')}
    ${[['📋', L('استبيانات', 'Surveys')], ['🎤', L('مقابلات', 'Interviews')], ['👀', L('ملاحظة', 'Observation')], ['🧪', L('تجارب', 'Experiments')]]
      .map(([ic, t], k) => B.card('m' + k, 320 + (k % 2) * 290, 170 + Math.floor(k / 2) * 230, 270, 200, 'c-green', { ic, h: t })).join('')}
    ${B.card('prim', 960, 150, 900, 0, 'c-green', { ic: '🆕', h: L('بيانات أولية', 'Primary data'), p: L('بنجمعها من جديد عشان تناسب غرض محدّد', 'newly collected to fit a specific purpose') })}
    ${B.card('pro', 960, 410, 900, 0, 'c-green', { row: true, ic: '✅', h: L('أصالة وموثوقية عالية', 'High originality and reliability'), p: L('بنودها متصمّمة على قد الغرض — قلب التحليل', 'items designed for the purpose — the core of analysis') })}
    ${B.card('con', 960, 570, 900, 0, 'c-amber', { row: true, ic: '⏳', h: L('القيد', 'The limit'), p: '⏱️ ' + L('وقت', 'time') + ' · 💪 ' + L('جهد', 'effort') + ' · 💰 ' + L('تكلفة', 'cost') })}
  </div>
  <div id="c1-s2" class="mv-stage">
    ${[['🌐', L('بيانات مفتوحة', 'Open data')], ['📈', L('إحصائيات موجودة', 'Existing statistics')], ['📑', L('تقارير القطاعات', 'Industry reports')]]
      .map(([ic, t], k) => B.card('so' + k, 70, 160 + k * 160, 500, 0, 'c-blue', { row: true, ic, h: t })).join('')}
    <div id="c1-dc" class="l12u l51-doc later" style="${B.at(620, 150, 460, 560)}"><b class="hd">📊 <bdi class="rn">0</bdi> ${L('صف', 'rows')}</b>${range(7).map((k) => `<i class="r r${k}"></i>`).join('')}<span class="by">${L('جمعها: جهة تانية', 'collected by: someone else')}</span></div>
    ${B.card('sec', 1130, 150, 730, 0, 'c-blue', { row: true, ic: '📚', h: L('بيانات ثانوية', 'Secondary data'), p: L('جمعها ونشرها غيرنا… وإحنا بنستخدمها', 'collected and published by others… we use it') })}
    ${B.card('fast', 1130, 320, 730, 0, 'c-green', { row: true, ic: '⚡', h: L('كمية كبيرة في وقت قصير', 'A lot in a short time') })}
    ${B.card('w1', 1130, 430, 730, 0, 'c-amber', { row: true, ic: '🎯', h: L('ممكن ماتطابقش غرضك بالظبط', 'may not match your exact purpose') })}
    ${B.card('w2', 1130, 540, 730, 0, 'c-red', { row: true, ic: '✂️', h: L('ممكن يكون فيها تحيّز أو حذف', 'may carry bias or omissions'), p: L('حصل وهي بتتحرّر أو تتلخّص', 'from editing or summarizing') })}
  </div>
  <div id="c1-s3" class="mv-stage">
    ${B.card('pc', 70, 160, 560, 300, 'c-green', { ic: '🆕', h: L('الأولية', 'Primary'), p: L('قيمتها في الموثوقية والأصالة', 'valued for reliability and originality') })}
    ${B.card('sc', 1290, 160, 570, 300, 'c-blue', { ic: '📚', h: L('الثانوية', 'Secondary'), p: L('قيمتها في الحجم — إحصائيات مانقدرش نجمعها لوحدنا', 'valued for scale — statistics we could not gather alone') })}
    ${B.card('mix', 680, 160, 560, 300, 'c-violet', { ic: '🤝', h: L('التحليل الحقيقي', 'Real analysis'), p: L('بنجمع الاتنين حسب الغرض والقيود', 'combines both by purpose and constraints') })}
    ${B.flip('cz', 360, 510, 1200, 170, `<span class="ic">🏛️</span>${L('تعداد حكومي نزّلته… أولية ولا ثانوية؟', 'A government census you downloaded… primary or secondary?')}`,
      `<span class="ic">📚</span><span>${L('ثانوية بالنسبة لك', 'Secondary — for you')}<small>${L('أنت ماجمعتهوش بنفسك', 'you did not collect it yourself')}</small></span>`)}
  </div>

    ${B.svg('pop', 70, 150, 760, 520, '0 0 760 520', CROWD)}
    ${B.svg('lasso', 70, 150, 760, 520, '0 0 760 520', PART.map((k) => `<circle cx="${70 + (k % 8) * 88}" cy="${70 + Math.floor(k / 8) * 76}" r="38" fill="none" stroke="#fbbf24" stroke-width="5" stroke-dasharray="10 8"/>`).join(''))}
  <div id="c1-s4" class="mv-stage">
    ${B.card('lp', 900, 150, 960, 0, 'c-slate', { row: true, ic: '👥', h: L('المجتمع الإحصائي', 'Population'), p: L('المجموعة الكاملة اللي بنحلّلها', 'the whole group we analyze') })}
    ${B.card('ls', 900, 290, 960, 0, 'c-amber', { row: true, ic: '🟡', h: L('العينة', 'Sample'), p: L('الجزء اللي بندرسه فعلًا', 'the part we actually survey') })}
    ${B.card('cen', 900, 440, 460, 0, 'c-violet', { ic: '📋', h: L('حصر شامل (تعداد)', 'Census'), p: L('نمسح المجتمع كله', 'survey all of it') })}
    ${B.card('ssv', 1400, 440, 460, 0, 'c-violet', { ic: '🔍', h: L('مسح بالعينة', 'Sample survey'), p: L('نمسح عينة مختارة', 'survey a chosen sample') })}
  </div>
  <div id="c1-s5" class="mv-stage">
    ${B.big('dice', 920, 160, 160, 120, '🎲')}
    ${B.card('srs', 1110, 150, 750, 0, 'c-amber', { h: L('المعاينة العشوائية البسيطة', 'Simple random sampling'), p: L('بالصدفة البحتة من غير تحيّز', 'by pure chance, without bias') })}
    ${[['⚖️', L('لكل واحد فرصة معروفة ومتساوية', 'everyone has a known, equal chance')], ['🧭', L('الأساسية — تنفع حتى لو معلوماتنا قليلة', 'the basic one — works even with little info')], ['🌍', L('العينة غالبًا تمثّل المجتمع ← نعمّم', 'the sample usually represents the whole → generalize')]]
      .map(([ic, t], k) => B.card('sr' + k, 920, 350 + k * 120, 940, 0, 'c-amber', { row: true, ic, h: t })).join('')}
  </div>
  <div id="c1-s6" class="mv-stage">
    ${B.card('str', 900, 150, 960, 0, 'c-teal', { ic: '🧁', h: L('المعاينة الطبقية', 'Stratified sampling'), p: L('نقسّم المجتمع طبقات (الصف، السن، النوع) — وبعدين عشوائي من كل طبقة', 'divide into strata (year, age, gender) — then random from each') })}
    <div id="c1-rt" class="l12u l51-rt later" style="${B.at(900, 400, 960)}">
      <span class="th"></span><span class="th">👥 ${L('المجتمع', 'population')}</span><span class="th"></span><span class="th">🟡 ${L('العينة', 'sample')}</span>
      ${[[24, 6, '50%'], [16, 4, '33%'], [8, 2, '17%']].map(([a, b, pc], k) => `<span class="sw" style="background:${STRAT[k].col}">${L('طبقة', 'stratum')} <bdi>${k + 1}</bdi></span><span class="v"><bdi>${a} · ${pc}</bdi></span><span class="ar">${B.arrow}</span><span class="v s s${k}"><bdi>${b} · ${pc}</bdi></span>`).join('')}
    </div>
    ${B.chip('use6', 900, 690, '💡 ' + L('مفيدة لما الفروق بين الطبقات بتأثّر — بتقلّل التحيّز', 'useful when strata differ — it reduces bias'), 'c-teal', 960)}
  </div>

  <div id="c1-s7" class="mv-stage">
    ${B.card('bdef', 70, 140, 1790, 0, 'c-red', { row: true, ic: '⚠️', h: L('تحيّز المعاينة', 'Sampling bias'), p: L('طريقة الاختيار متحيّزة ← العينة ماتعكسش المجتمع ← مانقدرش نعمّم', 'a biased way of choosing → the sample misses the population → no generalizing') })}
    ${B.card('b0', 70, 300, 560, 400, 'c-red', { ic: '🙋', h: L('الاختيار الذاتي', 'Self-selection'), p: L('اللي عايز يرد بس هو اللي بيرد', 'only those who want to reply do'), html: `<div class="l51-mini">🌐 <span class="hs">🙋🙋</span><span class="qs">😶😶😶</span></div>` })}
    ${B.card('b1', 680, 300, 560, 400, 'c-amber', { ic: '🎭', h: L('تحيّز الاستجابة', 'Response bias'), p: L('الإجابة «المرغوبة» مش الدقيقة — خطأ قياس', 'the “desired” answer, not the accurate one — a measurement error'), html: `<div class="l51-mini">💬 «<bdi>5</bdi> ${L('ساعات', 'hours')}» <s>⏱️ <bdi>2</bdi></s></div>` })}
    ${B.card('b2', 1290, 300, 570, 400, 'c-violet', { ic: '🚉', h: L('تحيّز الزمان/المكان', 'Time/location bias'), p: L('مسح قدّام محطة الضهر أيام الشغل', 'a survey at a station at noon on workdays'), html: `<div class="l51-mini">🕛 <span class="gone">👔 🎒</span></div>` })}
  </div>
  <div id="c1-s8" class="mv-stage">
    <div id="c1-sv" class="l12u l12-win later" style="${B.at(70, 150, 720, 330)}"><div class="wbar"><i></i><i></i><i></i><span class="url">survey.com</span></div>
      <div class="wbody l51-sv"><b>😴 ${L('بتنام كام ساعة؟', 'How many hours do you sleep?')}</b><div class="resp">${range(5).map(() => '<span class="y">😫</span>').join('')}${range(5).map(() => '<span class="n">😌</span>').join('')}</div></div></div>
    ${B.card('avg', 70, 510, 720, 0, 'c-amber', { row: true, ic: '🧮', h: L('المتوسط = 5 ساعات', 'Mean = 5 hours'), p: L('حساب دقيق جدًا…', 'very precise arithmetic…') })}
    ${B.stamp('wg', 300, 640, '❌ ' + L('على المجموعة الغلط!', 'on the wrong group!'))}
    ${B.card('rd', 860, 150, 1000, 0, 'c-green', { ic: '🛡️', h: L('التحيّز صعب يتشال خالص… بس بيقلّ بتصميم دقيق', 'Bias is hard to remove fully… careful design reduces it'),
      html: `<ul class="l12-list">${[['👥', L('إزاي نختار المبحوثين', 'how we choose respondents')], ['❓', L('إزاي نصيغ الأسئلة', 'how we word the questions')], ['📋', L('إزاي نعمل المسح', 'how we run the survey')]].map(([ic, t], k) => `<li class="li${k}">✔ ${ic} ${t}</li>`).join('')}</ul>` })}
  </div>
  <div id="c1-s9" class="mv-stage">
    ${card4('x0', 70, 'c-green', '🆕📚', L('أولية وثانوية', 'Primary & secondary'), L('نجمعها بنفسنا · جاهزة من غيرنا', 'we gather it · ready-made by others'))}
    ${card4('x1', 530, 'c-slate', '👥🟡', L('المجتمع والعينة', 'Population & sample'), L('الكل · جزء عادل منه', 'the whole · a fair part of it'))}
    ${card4('x2', 990, 'c-amber', '🎲🧁', L('بسيطة وطبقية', 'Simple & stratified'), L('صدفة بحتة · عشوائي من كل طبقة', 'pure chance · random from each stratum'))}
    ${card4('x3', 1450, 'c-red', '⚠️', L('العينة المتحيّزة', 'A biased sample'), L('إجابة واثقة… بس غلط', 'a confident answer… but wrong'))}
    ${B.mid('xb', 620, '📌 ' + L('اجمع للغرض… واختار عينة عادلة', 'gather for the purpose… and pick a fair sample'), 'c-amber big')}
  </div>
    ${U.hd(0, '🔁 ' + L('جمع ← تنظيم ← تحليل', 'Collect → organize → analyze'))}
    ${U.hd(1, '🆕 ' + L('البيانات الأولية', 'Primary data'))}
    ${U.hd(2, '📚 ' + L('البيانات الثانوية', 'Secondary data'))}
    ${U.hd(3, '🤝 ' + L('الاتنين مع بعض', 'Both together'))}
    ${U.hd(4, '👥 ' + L('المجتمع والعينة', 'Population and sample'))}
    ${U.hd(5, '🎲 ' + L('المعاينة العشوائية البسيطة', 'Simple random sampling'))}
    ${U.hd(6, '🧁 ' + L('المعاينة الطبقية', 'Stratified sampling'))}
    ${U.hd(7, '⚠️ ' + L('تلات أنواع للتحيّز', 'Three kinds of bias'))}
    ${U.hd(8, '😬 ' + L('واثقة… بس غلط', 'Confident… but wrong'))}
    ${U.hd(9, '📌 ' + L('الخلاصة', 'Recap'))}
    ${U.nt(0, '⚠️ ' + L('مرحلة الجمع بتحدّد جودة التحليل كله', 'The collection stage decides the quality of the whole analysis'), 'warn')}
    ${U.nt(4, '🔍 ' + L('أخذ العينات = اختيار عينة — والموثوقية بتفرق حسب الطريقة', 'Sampling = choosing a sample — reliability depends on the method'), 'ok')}
    ${U.nt(6, '⚠️ ' + L('مش «ممثّل واحد من كل طبقة» — ده اختيار عشوائي من كل طبقة', 'Not “one representative per stratum” — a random pick from each'), 'warn')}
    ${U.nt(7, L('الاختيار الذاتي = مين اتسأل · الاستجابة = إزاي جاوبوا', 'Self-selection = who was asked · response = how they answered'))}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };
    const dots = (ks) => ks.map((k) => M.board.querySelector('#c1-pop .d' + k));
    const paint = (ks, fill, t, d) => tl.to(dots(ks), { attr: { fill }, duration: 0.25, stagger: d || 0 }, t);
    const rowsOf = (rows) => range(48).filter((k) => rows.includes(Math.floor(k / 8)));

    /* 0 — the pipeline: sound data flows through, off-purpose data cannot be rescued */
    let c = at(0);
    frame(0, c, 7.0);
    POP(q('goal'), c + 0.3, 0.4);
    ['col', 'org', 'ana'].forEach((id, k) => { IN(q(id), c + 0.8 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.8 + k * 0.5); });
    IN(Q('a1 a2'), c + 2.0, 0.3);
    IN(q('ln'), c + 2.2, 0.3);
    range(3).forEach((k) => tl.fromTo(all('#c1-ln .gdk' + k), { opacity: 0, x: 0 }, { opacity: 1, x: 1180 * sx, duration: 1.4, ease: 'power1.inOut' }, c + 2.4 + k * 0.25));
    POP(q('ok0'), c + 4.0, 0.4); SND('ok', c + 4.0);
    tl.to(all('#c1-ln .gdk'), { opacity: 0, duration: 0.3 }, c + 4.4);
    OUT(q('ok0'), c + 4.6, 0.3);
    range(3).forEach((k) => tl.fromTo(all('#c1-ln .trk' + k), { opacity: 0, x: 0 }, { opacity: 1, x: 1180 * sx, duration: 1.4, ease: 'power1.inOut' }, c + 4.6 + k * 0.25));
    glow(M, q('org'), c + 5.2, 'rgba(167,139,250,.9)'); glow(M, q('ana'), c + 5.6, 'rgba(52,211,153,.9)');
    POP(q('ng0'), c + 6.2, 0.4); SND('bad', c + 6.2);
    IN(q('bad'), c + 6.6, 0.4, { y: 12 });

    /* 1 — primary data */
    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('us'), c + 0.4, 0.5, { y: 30 });
    range(4).forEach((k) => { POP(q('m' + k), c + 0.9 + k * 0.3, 0.35); SND('pop', c + 0.9 + k * 0.3); });
    IN(q('prim'), c + 2.4, 0.5, { x: 40 * sx }); SND('ok', c + 2.4);
    IN(q('pro'), c + 3.6, 0.5, { y: 20 });
    IN(q('con'), c + 4.6, 0.5, { y: 20 }); SND('tap', c + 4.6);

    /* 2 — secondary data */
    c = at(2);
    frame(2, c);
    leave(2, c);
    range(3).forEach((k) => IN(q('so' + k), c + 0.4 + k * 0.3, 0.4, { x: -30 * sx }));
    IN(q('dc'), c + 1.4, 0.5, { y: 30 });
    tl.fromTo(all('#c1-dc .rn'), { textContent: 0 }, { textContent: 1000000, snap: { textContent: 1000 }, duration: 1.6, ease: 'power2.in' }, c + 1.8);
    IN(q('sec'), c + 2.0, 0.5, { x: 40 * sx }); SND('ok', c + 2.0);
    IN(q('fast'), c + 3.2, 0.4, { y: 20 }); SND('pop', c + 3.2);
    IN(q('w1'), c + 4.2, 0.4, { y: 20 });
    IN(q('w2'), c + 5.0, 0.4, { y: 20 }); SND('bad', c + 5.0);
    tl.to(all('#c1-dc .r2, #c1-dc .r5'), { backgroundColor: '#0f172a', duration: 0.3, stagger: 0.3 }, c + 5.4);

    /* 3 — both together + the census flip card */
    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('pc'), c + 0.4, 0.5, { x: -40 * sx }); IN(q('sc'), c + 0.8, 0.5, { x: 40 * sx });
    POP(q('mix'), c + 1.8, 0.5); SND('ok', c + 1.8);
    IN(q('cz'), c + 3.0, 0.4, { y: 20 });
    flipAt(M, q('cz'), c + 4.4); SND('whoosh', c + 4.4);

    /* 4 — population and sample */
    c = at(4);
    frame(4, c, 5.4);
    leave(4, c);
    IN(q('pop'), c + 0.4, 0.5, { scale: 0.9 });
    tl.fromTo(dots(range(48)), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.012 }, c + 0.6);
    IN(q('lp'), c + 1.0, 0.4, { x: 40 * sx });
    paint(PART, '#fbbf24', c + 1.8, 0.08); IN(q('lasso'), c + 1.8, 0.4); SND('pop', c + 1.8);
    IN(q('ls'), c + 2.4, 0.4, { x: 40 * sx });
    IN(q('cen'), c + 3.4, 0.4, { y: 20 }); glow(M, q('pop'), c + 3.6, 'rgba(167,139,250,.95)');
    IN(q('ssv'), c + 4.2, 0.4, { y: 20 }); glow(M, q('lasso'), c + 4.4, 'rgba(251,191,36,.95)');

    /* 5 — simple random: the dice picks dots */
    c = at(5);
    frame(5, c);
    leave(5, c);
    OUT(q('lasso'), c, 0.3); paint(PART, '#475569', c + 0.1);
    POP(q('dice'), c + 0.5, 0.4);
    tl.to(q('dice'), { rotation: '+=720', duration: 1.6, ease: 'power2.out' }, c + 0.8); SND('whoosh', c + 0.8);
    SRS.forEach((k, i) => { paint([k], '#fbbf24', c + 1.0 + i * 0.2); });
    SND('pop', c + 1.6);
    IN(q('srs'), c + 2.0, 0.5, { x: 40 * sx });
    range(3).forEach((k) => IN(q('sr' + k), c + 3.0 + k * 0.6, 0.4, { y: 20 }));

    /* 6 — stratified: rows recolour, then a random pick inside each */
    c = at(6);
    frame(6, c, 5.6);
    leave(6, c);
    paint(SRS, '#475569', c + 0.1);
    STRAT.forEach((s, i) => tl.to(dots(rowsOf(s.rows)), { attr: { stroke: s.col }, duration: 0.3 }, c + 0.5 + i * 0.3));
    SND('pop', c + 0.5);
    IN(q('str'), c + 1.4, 0.5, { x: 40 * sx });
    STRAT.forEach((s, i) => { paint(s.pick, s.col, c + 2.4 + i * 0.6, 0.08); SND('tap', c + 2.4 + i * 0.6); });
    IN(q('rt'), c + 2.4, 0.5, { y: 20 });
    tl.fromTo(all('#c1-rt .s'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.6 }, c + 2.6);
    IN(q('use6'), c + 4.6, 0.4, { y: 12 });

    /* 7 — three kinds of sampling bias */
    c = at(7);
    frame(7, c, 5.6);
    leave(7, c);
    OUT(q('pop'), c, 0.4);
    tl.to(all('#c1-pop .d'), { attr: { stroke: '#0f172a', fill: '#475569' }, duration: 0.01 }, c + 0.4);
    IN(q('bdef'), c + 0.4, 0.5, { y: -20 }); SND('bad', c + 0.4);
    ['b0', 'b1', 'b2'].forEach((id, k) => { IN(q(id), c + 1.4 + k * 1.1, 0.5, { y: 30 }); SND('pop', c + 1.4 + k * 1.1); });
    tl.fromTo(all('#c1-b0 .qs'), { opacity: 1 }, { opacity: 0.25, duration: 0.4 }, c + 2.0);
    tl.fromTo(all('#c1-b1 s'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 3.2);
    tl.fromTo(all('#c1-b2 .gone'), { opacity: 1 }, { opacity: 0.2, duration: 0.4 }, c + 4.2);

    /* 8 — a precise mean on the wrong group, then how to reduce bias */
    c = at(8);
    frame(8, c);
    leave(8, c);
    IN(q('sv'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#c1-sv .y'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.15 }, c + 1.0);
    tl.fromTo(all('#c1-sv .n'), { opacity: 0 }, { opacity: 0.25, duration: 0.3 }, c + 1.8); SND('tap', c + 1.0);
    IN(q('avg'), c + 2.4, 0.5, { y: 20 }); SND('ok', c + 2.4);
    stampIn(M, q('wg'), c + 3.4); SND('bad', c + 3.4);
    IN(q('rd'), c + 4.4, 0.5, { x: 40 * sx });
    tl.fromTo(all('#c1-rd li'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.4 }, c + 5.0); SND('ok', c + 5.0);

    /* 9 — recap */
    c = at(9);
    frame(9, c);
    leave(9, c);
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 0.4 + i * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.4 + i * 0.5); });
    POP(q('xb'), c + 2.6, 0.5); SND('ok', c + 2.6);

    M.loop(0, 7.2, () => M.breathe(q('ng0'), 1.06, 0.8));
    M.loop(1, 5.2, () => glowCycle(Q('m0 m1 m2 m3'), 'rgba(52,211,153,.9)', 0.4));
    M.loop(2, 5.8, () => glowCycle(Q('so0 so1 so2'), 'rgba(56,189,248,.9)', 0.4));
    M.loop(3, 5.4, () => M.breathe(q('mix'), 1.03, 1.0));
    M.loop(4, 5.0, () => gsap.timeline({ repeat: -1 }).to(all('#c1-lasso circle'), { attr: { 'stroke-dashoffset': -36 }, duration: 1.2, ease: 'none' }));
    M.loop(5, 5.2, () => M.bob(q('dice'), 8, 0.9));
    M.loop(6, 5.2, () => glowCycle(all('#c1-rt .s'), 'rgba(45,212,191,.9)', 0.4));
    M.loop(8, 6.4, () => M.breathe(q('wg'), 1.05, 0.9));
    M.loop(9, 3.4, () => glowCycle(Q('x0 x1 x2 x3'), 'rgba(251,191,36,.8)', 0.5));
    return M.done();
  });
})();

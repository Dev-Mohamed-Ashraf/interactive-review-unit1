/* =========================================================
 * anims/movies-4-3.js — lesson 4-3 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   evalMovie : two kinds · qualitative (watch + listen) · quantitative
 *               (count + A/B) · combine · PV · bounce rate · CVR ·
 *               heuristic evaluation · high-PV/low-CVR case
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const BROWSER = (w, h, inner) => `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    <path d="M4 26 Q4 4 26 4 H${w - 26} Q${w - 4} 4 ${w - 4} 26 V62 H4Z" fill="#1e293b"/>
    <circle cx="30" cy="33" r="8" fill="#f87171"/><circle cx="56" cy="33" r="8" fill="#fbbf24"/><circle cx="82" cy="33" r="8" fill="#34d399"/>
    <rect x="112" y="16" width="${w - 140}" height="34" rx="17" fill="#0b1222"/>${inner || ''}`;
  const DASH = `<rect x="4" y="4" width="752" height="472" rx="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    ${range(6).map((k) => `<rect class="bar" x="${60 + k * 70}" y="${380 - [120, 190, 150, 250, 210, 290][k]}" width="46" height="${[120, 190, 150, 250, 210, 290][k]}" rx="8" fill="#38bdf8"/>`).join('')}
    <path d="M40 380 H500" stroke="#64748b" stroke-width="4"/>
    <rect x="540" y="60" width="180" height="110" rx="16" fill="#1e293b"/><text x="630" y="100" text-anchor="middle" font-size="26" fill="#94a3b8">PV</text><text x="630" y="150" text-anchor="middle" font-size="40" font-weight="900" fill="#e0f2fe">1,250</text>
    <rect x="540" y="200" width="180" height="110" rx="16" fill="#1e293b"/><text x="630" y="240" text-anchor="middle" font-size="26" fill="#94a3b8">⏱️</text><text x="630" y="290" text-anchor="middle" font-size="40" font-weight="900" fill="#e0f2fe">2:40</text>`;

  K.defineAnim('evalMovie', (stage, props, api) => {
    const U = MK.uiL('e3-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l43', prefix: 'e3-', beats: 10, cast: { 'ch-t': 'studentL', 'ch-o': 'engineer', 'ch-x': 'engineer' },
      html: (L) => `
  <div id="e3-stage" class="mv-stage">
    ${U.box('ql', 120, 220, 760, 't-violet', { ic: '🔍', h: L('التقييم النوعي', 'Qualitative evaluation'), p: L('نتفرّج على المستخدمين ونسمعهم', 'watch and listen to users'), s: '❓ ' + L('ليه؟', 'why?') })}
    ${U.box('qn', 1040, 220, 760, 't-blue', { ic: '📊', h: L('التقييم الكمّي', 'Quantitative evaluation'), p: L('نعدّ ونقيس بالأرقام', 'count and measure with numbers'), s: '🔢 ' + L('قد إيه؟', 'how much?') })}

    ${U.ch('ch-t', 90, 430, 'md')}
    ${U.ch('ch-o', 400, 470, 'sm')}
    ${U.pill('say', 60, 320, '«' + L('مش لاقي زرار الدفع!', 'I can’t find the pay button!') + '» 😕', 'solid')}
    ${U.pill('ut', 700, 220, '👀 ' + L('اختبار الاستخدام: نراقب الاستخدام الفعلي', 'Usability testing: observe real use'), 't-violet')}
    ${U.pill('iv', 700, 320, '🎤 ' + L('المقابلات: نسمع احتياجاتهم وضيقهم', 'Interviews: hear needs and frustrations'), 't-violet')}
    ${U.box('why', 700, 450, 760, 't-violet', { h: '🔍 ' + L('النوعي = «ليه؟»', 'Qualitative = "why?"'), p: L('أسباب السلوك… حاجات ماتتقاسش بالأرقام', 'reasons behind behavior… what numbers cannot express') })}

    ${U.art('dash', 90, 180, 760, 480, '0 0 760 480', DASH)}
    ${U.pill('wa', 960, 220, '📈 ' + L('تحليلات الويب: PV · الوقت', 'Web analytics: PV · time'), 't-blue')}
    ${U.pill('ab', 960, 320, '🅰️🅱️ ' + L('اختبار A/B: نقارن خيارين', 'A/B testing: compare two options'), 't-blue')}
    ${U.box('hm', 960, 450, 820, 't-blue', { h: '📊 ' + L('الكمّي = «قد إيه؟»', 'Quantitative = "how much?"'), p: L('بموضوعية وإحصائيًا', 'objectively and statistically') })}

    ${U.box('nums', 120, 220, 760, 't-blue', { ic: '🔢', h: L('الأرقام', 'Numbers'), p: L('بتقول فين المشكلة', 'show where the problem is') })}
    ${U.box('voices', 1040, 220, 760, 't-violet', { ic: '🗣️', h: L('الأصوات', 'Voices'), p: L('بتقول ليه', 'show why') })}
    ${U.pill('both', 560, 540, '🤝 ' + L('الاتنين مع بعض = تقييم أدق', 'both together = a more accurate evaluation'), 't-green')}

    ${U.art('pg', 700, 200, 480, 400, '0 0 480 400', BROWSER(480, 400, `<rect x="40" y="96" width="400" height="60" rx="12" fill="#334155"/>${range(4).map((k) => `<rect x="40" y="${180 + k * 44}" width="${400 - (k % 2) * 90}" height="22" rx="11" fill="#334155"/>`).join('')}`))}
    ${range(10).map((k) => U.emo('v' + k, 80 + (k % 5) * 110, 260 + Math.floor(k / 5) * 120, 80, 50, '🧑')).join('')}
    ${U.pill('pv', 1260, 200, '👁️ PV = 1,250', 'solid')}
    ${U.box('pvb', 1260, 300, 580, 't-blue', { h: L('PV — مشاهدات الصفحة', 'PV — page views'), p: L('إجمالي مرات مشاهدة الصفحة', 'total times the page was viewed'), s: L('قد إيه الموقع ظاهر ومنتشر', 'how widely the site is seen') })}
    ${U.pill('bp', 1260, 200, '↩️ 60% ' + L('خرجوا بعد صفحة واحدة', 'left after one page'), 't-red')}
    ${U.box('bb', 1260, 300, 580, 't-red', { h: L('معدل الارتداد', 'Bounce rate'), p: L('نسبة الزيارات اللي خلصت بعد الصفحة الأولى بس', 'share of visits ending after only the first page'), s: L('هل الصفحة كانت على قد توقّعه؟', 'did the page meet expectations?') })}
    ${U.emo('cart', 1080, 610, 110, 70, '🛒')}
    ${U.pill('cp', 1260, 200, '🛒 ' + L('واحد بس اشترى', 'only one bought'), 't-green')}
    ${U.box('cb', 1260, 300, 580, 't-green', { h: L('معدل التحويل (CVR)', 'Conversion rate (CVR)'), p: L('نسبة الزيارات اللي حقّقت هدف (شراء، تسجيل…)', 'share of visits reaching a target (purchase, sign-up…)'), s: '💰 ' + L('مساهمة الموقع في الأرباح', 'the site’s contribution to profit') })}

    ${U.ch('ch-x', 90, 410, 'md')}
    ${['✔ ' + L('الاتساق — تصميم وعمليات موحّدة', 'Consistency — unified design and operation'), '✔ ' + L('منع الأخطاء — يصعّب الغلط', 'Error prevention — hard to make mistakes'), '✔ ' + L('وضوح حالة النظام', 'Visibility of system status')]
      .map((t, k) => U.pill('h' + k, 400, 230 + k * 100, t, 't-violet')).join('')}
    ${U.pill('hx', 400, 540, '⏳ ' + L('جاري التحميل…', 'Loading…') + ' · ⚠️ ' + L('رسالة خطأ في الإدخال', 'input error message'), 't-slate')}
    ${U.box('hb', 1180, 210, 660, 't-violet', { ic: '🧑‍💼', h: L('التقييم الإرشادي', 'Heuristic evaluation'), p: L('خبراء بيحدّدوا مشاكل الواجهة بقواعد عملية', 'experts find UI problems by rules of thumb'), s: L('شكل من التقييم النوعي', 'a form of qualitative evaluation') })}

    ${U.pill('c1', 100, 200, '📈 PV ' + L('عالي', 'high'), 't-blue')}
    ${U.pill('c2', 100, 290, '📉 CVR ' + L('واطي', 'low'), 't-red')}
    ${U.pill('c3', 100, 400, '📍 ' + L('الأرقام: المشكلة بين الدخول والشراء', 'Numbers: the problem is between arriving and buying'), 't-slate')}
    ${U.art('shop', 1040, 190, 600, 380, '0 0 600 380', BROWSER(600, 380, `<rect x="40" y="96" width="230" height="170" rx="14" fill="#38bdf8"/><text x="155" y="200" text-anchor="middle" font-size="70">📚</text>
      <rect x="310" y="100" width="250" height="26" rx="13" fill="#334155"/><rect x="310" y="146" width="200" height="26" rx="13" fill="#334155"/><text x="310" y="232" font-size="40" font-weight="900" fill="#fbbf24">120 ${L('ج', 'EGP')}</text>
      <rect x="520" y="330" width="56" height="26" rx="6" fill="#475569"/><circle class="ring" cx="548" cy="343" r="40" fill="none" stroke="#ef4444" stroke-width="6" opacity="0"/>`))}
    ${U.pill('c4', 1040, 610, '🔍 ' + L('اختبار استخدام: زرار «الدفع» مستخبي!', 'Usability test: the "Pay" button is hidden!'), 't-violet')}

    ${U.hd(0, L('نوعين للتقييم', 'Two kinds of evaluation'))}
    ${U.hd(1, '🔍 ' + L('التقييم النوعي', 'Qualitative evaluation'))}
    ${U.hd(2, '📊 ' + L('التقييم الكمّي', 'Quantitative evaluation'))}
    ${U.hd(3, '🤝 ' + L('نجمع الاتنين', 'Combine both'))}
    ${U.hd(4, '👁️ PV')}
    ${U.hd(5, '↩️ ' + L('معدل الارتداد', 'Bounce rate'))}
    ${U.hd(6, '🎯 ' + L('معدل التحويل', 'Conversion rate'))}
    ${U.hd(7, '🧑‍💼 ' + L('التقييم الإرشادي', 'Heuristic evaluation'))}
    ${U.hd(8, '🛒 ' + L('مثال: PV عالي و CVR واطي', 'Case: high PV, low CVR'))}
    ${U.nt(0, L('ونفس الفكرة بتنفع لتقييم المواقع', 'and the same idea applies to evaluating websites'), 'ok')}
    ${U.nt(4, L('تحليلات الويب = الطريقة المركزية للتقييم الكمّي', 'Web analytics = the central method of quantitative evaluation'), 'ok')}
    ${U.nt(6, '⚠️ ' + L('«الارتداد = نسبة تحقيق الهدف» ← غلط: ده CVR', '"Bounce = goal-achievement rate" → false: that is CVR'), 'warn')}
  </div>
  <div id="e3-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 200, '📊 ' + L('الكمّي = قد إيه: PV · الارتداد · CVR (تحليلات الويب) + A/B', 'Quantitative = how much: PV · bounce · CVR (web analytics) + A/B'), 't-blue')}
    ${U.pill('x1', 120, 310, '🔍 ' + L('النوعي = ليه: اختبار الاستخدام · المقابلات · التقييم الإرشادي', 'Qualitative = why: usability tests · interviews · heuristic checks'), 't-violet')}
    ${U.pill('x2', 120, 420, '🤝 ' + L('الأرقام بتقول فين… والأصوات بتقول ليه — اجمع الاتنين', 'Numbers say where… voices say why — combine both'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#e3-' + id + ' .' + c);
    const V = (ks) => ks.map((k) => q('v' + k));

    /* 0 — two kinds */
    let c = at(0);
    frame(0, c, 4.0);
    IN(q('ql'), c + 0.6, 0.5, { x: -40 * sx }); SND('pop', c + 0.6);
    IN(q('qn'), c + 1.8, 0.5, { x: 40 * sx }); SND('pop', c + 1.8);

    /* 1 — qualitative */
    c = at(1);
    frame(1, c);
    OUT(Q('ql qn'), c, 0.4);
    IN(q('ch-t'), c + 0.5, 0.5, { x: -60 * sx }); IN(q('ch-o'), c + 0.9, 0.5, { y: 30 });
    IN(q('say'), c + 1.6, 0.4, { y: 14 }); SND('bad', c + 1.6);
    IN(q('ut'), c + 2.6, 0.4, { x: 30 * sx }); SND('pop', c + 2.6);
    IN(q('iv'), c + 3.4, 0.4, { x: 30 * sx }); SND('pop', c + 3.4);
    IN(q('why'), c + 4.4, 0.5, { y: 20 }); SND('ok', c + 4.4);

    /* 2 — quantitative */
    c = at(2);
    frame(2, c);
    OUT(Q('ch-t ch-o say ut iv why'), c, 0.4);
    IN(q('dash'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(sel('dash', 'bar'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.6)' }, c + 0.9);
    IN(q('wa'), c + 2.4, 0.4, { x: 30 * sx }); SND('pop', c + 2.4);
    IN(q('ab'), c + 3.2, 0.4, { x: 30 * sx }); SND('pop', c + 3.2);
    IN(q('hm'), c + 4.2, 0.5, { y: 20 }); SND('ok', c + 4.2);

    /* 3 — combine */
    c = at(3);
    frame(3, c);
    OUT(Q('dash wa ab hm'), c, 0.4);
    IN(q('nums'), c + 0.6, 0.5, { x: -40 * sx }); SND('pop', c + 0.6);
    IN(q('voices'), c + 1.8, 0.5, { x: 40 * sx }); SND('pop', c + 1.8);
    POP(q('both'), c + 3.2, 0.5); SND('ok', c + 3.2);

    /* 4 — PV */
    c = at(4);
    frame(4, c, 5.2);
    OUT(Q('nums voices both'), c, 0.4);
    IN(q('pg'), c + 0.5, 0.5, { y: 30 });
    range(10).forEach((k) => {
      IN(q('v' + k), c + 1.0 + k * 0.12, 0.25);
      tl.to(q('v' + k), { x: (650 - (k % 5) * 22) * sx, y: 70 - Math.floor(k / 5) * 20, duration: 0.8, ease: 'power1.inOut' }, c + 1.6 + k * 0.1); // into a neat 5×2 grid on the page
    });
    POP(q('pv'), c + 3.0, 0.5); SND('ok', c + 3.0);
    IN(q('pvb'), c + 3.6, 0.5, { x: 40 * sx });

    /* 5 — bounce rate */
    c = at(5);
    frame(5, c);
    OUT(Q('pv pvb'), c, 0.3);
    tl.to(V([0, 1, 2, 3, 4, 5]), { x: 0, y: 0, opacity: 0.35, duration: 0.9, stagger: 0.1, ease: 'power1.inOut' }, c + 0.6); SND('bad', c + 0.8);
    POP(q('bp'), c + 2.0, 0.5);
    IN(q('bb'), c + 2.8, 0.5, { x: 40 * sx });

    /* 6 — conversion rate */
    c = at(6);
    frame(6, c, 5.6);
    OUT(Q('bp bb'), c, 0.3);
    OUT(V([0, 1, 2, 3, 4, 5]), c, 0.3);
    IN(q('cart'), c + 0.6, 0.4, { y: 20 });
    tl.to(q('v9'), { x: 575 * sx, y: 220, duration: 1.0, ease: 'power2.inOut' }, c + 1.2);
    POP(q('cp'), c + 2.4, 0.5); SND('ok', c + 2.4);
    IN(q('cb'), c + 3.2, 0.5, { x: 40 * sx });

    /* 7 — heuristic evaluation */
    c = at(7);
    frame(7, c);
    OUT(Q('pg cart cp cb'), c, 0.4); OUT(V([6, 7, 8, 9]), c, 0.4);
    IN(q('ch-x'), c + 0.5, 0.5, { x: -60 * sx });
    range(3).forEach((k) => { IN(q('h' + k), c + 1.2 + k * 0.7, 0.4, { x: 30 * sx }); SND('pop', c + 1.2 + k * 0.7); });
    IN(q('hx'), c + 3.4, 0.4, { y: 20 });
    IN(q('hb'), c + 4.2, 0.5, { x: 40 * sx }); SND('ok', c + 4.2);

    /* 8 — high PV, low CVR */
    c = at(8);
    frame(8, c);
    OUT(Q('ch-x h0 h1 h2 hx hb'), c, 0.4);
    IN(q('c1'), c + 0.5, 0.4, { x: 30 * sx }); IN(q('c2'), c + 1.0, 0.4, { x: 30 * sx }); SND('bad', c + 1.0);
    IN(q('c3'), c + 1.8, 0.4, { y: 20 });
    IN(q('shop'), c + 2.6, 0.5, { y: 30 });
    tl.fromTo(sel('shop', 'ring'), { opacity: 0, scale: 1.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, c + 3.6); SND('pop', c + 3.6);
    IN(q('c4'), c + 4.2, 0.4, { y: 20 }); SND('ok', c + 4.2);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

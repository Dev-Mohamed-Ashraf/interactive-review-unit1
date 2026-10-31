/* =========================================================
 * anims/movies-4-3.js — lesson 4-3 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   evalMovie (stations kinds 0–3 · metrics 4–9): watch & listen vs count &
 *     measure · a usability test and an interview · an analytics dashboard and
 *     an A/B test · where vs why · PV ticking up · visitors bouncing · a funnel
 *     to CVR · an expert’s heuristic checklist · high PV + low CVR → the hidden
 *     pay button · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  K.defineAnim('evalMovie', (stage, props, api) => {
    const P = 'e3-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-eval mv-l12 mv-l43', prefix: P, beats: 10, cast: { us: 'studentL', ob: 'it', iv: 'student', ex: 'engineer', u2: 'studentL' },
      html: (L) => {
        const bar = (lab, w, cls, val) => `<div class="l12-pr"><b>${lab}</b><span class="l12-bar ${cls || 'o'}"><i data-w="${w}" style="width:${w}%"></i></span><em><bdi>${val || w + '%'}</bdi></em></div>`;
        return `
  <div id="e3-s0" class="mv-stage">
    ${B.card('ql', 70, 150, 860, 450, 'c-violet', { ic: '🔍', h: L('التقييم النوعي', 'Qualitative evaluation'), p: L('نتفرّج على المستخدمين ونسمعهم', 'watch and listen to users'), html: '<div class="l12-icons">👀 🗣️ 📝</div>' })}
    ${B.card('qn', 990, 150, 870, 450, 'c-blue', { ic: '📊', h: L('التقييم الكمّي', 'Quantitative evaluation'), p: L('نعدّ ونقيس بالأرقام', 'count and measure with numbers'), html: `<div class="l12-cols3">${[60, 90, 45, 75].map((h) => `<i style="height:${h}%"></i>`).join('')}</div>` })}
  </div>
  <div id="e3-s1" class="mv-stage">
    ${B.ch('us', 80, 360, 'md')}${B.ch('ob', 380, 360, 'md')}
    ${B.chip('ut', 60, 250, '🧪 ' + L('اختبار قابلية الاستخدام: نراقب الاستخدام الفعلي', 'usability test: watch real use'), 'c-violet big')}
    ${B.chip('nt', 360, 680, '📝 «' + L('مش لاقي زرار الدفع!', 'can’t find the pay button!') + '»', 'c-amber')}
    ${B.ch('iv', 1060, 360, 'md')}
    ${B.chip('in', 900, 250, '🎙️ ' + L('مقابلة: نسمع آراءهم مباشرة', 'interview: hear them directly'), 'c-violet big')}
    ${B.chip('sy', 1300, 420, '💬 «' + L('بحس إن الخطوات كتير', 'there are too many steps') + '»', 'c-slate')}
    ${B.mid('why', 140, '❓ ' + L('بيساعد على فهم التجربة وأسباب السلوك والمشكلات', 'explores the “reasons” in depth — things numbers can’t show'), 'c-violet')}
  </div>
  <div id="e3-s2" class="mv-stage">
    ${B.card('an', 70, 150, 860, 460, 'c-blue', { h: '📈 ' + L('تحليلات الويب', 'Web analytics'), html: `<div class="l12-dash"><span>👁️ PV<b><bdi class="c1">0</bdi></b></span><span>⏱️ ${L('الوقت', 'time')}<b><bdi>2:35</bdi></b></span></div>` })}
    ${B.card('ab', 990, 150, 870, 460, 'c-green', { h: '🆎 ' + L('اختبار A/B', 'A/B test'), html: `<div class="l12-ab"><span class="a">A <i class="ba">${L('اشترِ', 'Buy')}</i></span><span class="b">B <i class="bb">${L('اشترِ', 'Buy')}</i></span></div>` + bar('A', 30, 's', '3%') + bar('B', 50, 'o', '5% ✓') })}
    ${B.mid('obj', 660, '📊 ' + L('بيانات عددية ومقاييس محددة بوضوح', 'numbers → an objective, statistical evaluation'), 'c-blue big')}
  </div>
  <div id="e3-s3" class="mv-stage">
    ${B.card('wh', 70, 150, 860, 380, 'c-blue', { ic: '📍', h: L('الأرقام: «فين»؟', 'Numbers: “where”?'), p: L('قد إيه بيتستخدم — وفين المشكلة', 'how much it is used — where the problem is') })}
    ${B.card('wy', 990, 150, 870, 380, 'c-violet', { ic: '❓', h: L('الآراء: «ليه»؟', 'Voices: “why”?'), p: L('ليه صعب الاستخدام', 'why it is hard to use') })}
    ${B.mid('both', 590, '🤝 ' + L('الجمع بينهم = تقييم أدق', 'combining both = a more accurate evaluation'), 'c-green big')}
  </div>

  <div id="e3-s4" class="mv-stage">
    <div id="e3-pv" class="l12u l12-win later" style="${B.at(70, 150, 820, 440)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com</span></div><div class="wbody l12-eye">👁️<b><bdi class="c2">0</bdi></b><small>${L('مشاهدة للصفحة', 'page views')}</small></div></div>
    ${B.card('pvd', 960, 150, 900, 0, 'c-blue', { ic: '👁️', h: L('PV — مشاهدات الصفحة', 'PV — page views'), p: L('إجمالي مرات المشاهدة — ومش بيساوي عدد الأشخاص', 'total number of times pages were viewed — a basic reach measure') })}
    ${B.chip('cen', 960, 470, '📈 ' + L('تحليلات الويب = إحدى أدوات التقييم الكمّي', 'web analytics = the central quantitative method'), 'c-blue', 900)}
  </div>
  <div id="e3-s5" class="mv-stage">
    <div id="e3-door" class="l12u l12-flowrow later" style="${B.at(70, 150, 1100, 420)}"><div class="pg1">📄 ${L('الصفحة الأولى', 'first page')}</div><div class="pg2">📄📄 ${L('صفحات تانية', 'more pages')}</div><div class="ex">🚪 ${L('خروج', 'exit')}</div>${range(10).map((k) => `<span class="v v${k}">👤</span>`).join('')}</div>
    ${B.card('br', 1230, 150, 630, 0, 'c-amber', { ic: '🚪', h: L('معدل الارتداد', 'Bounce rate'), p: L('نسبة المستخدمين اللي غادروا بعد الصفحة الأولى بس', 'the share of visits that ended after the first page'), k: '6 / 10 = <bdi>60%</bdi>' })}
    ${B.chip('exp', 1230, 520, '🎯 ' + L('تعريفه بيختلف حسب أداة التحليل', 'did the page meet expectations?'), 'c-amber', 630)}
  </div>
  <div id="e3-s6" class="mv-stage">
    <div id="e3-fun" class="l12u l12-funnel later" style="${B.at(70, 140, 980, 500)}"><span class="f0">👥 ${L('100 زيارة', '100 visits')}</span><span class="f1">🛍️ ${L('30 شافوا المنتج', '30 saw a product')}</span><span class="f2">🛒 ${L('3 اشتروا', '3 bought')}</span></div>
    ${B.card('cv', 1110, 150, 750, 0, 'c-green', { ic: '🎯', h: L('معدل التحويل (CVR)', 'Conversion rate (CVR)'), p: L('نسبة اللي حقّقوا هدف (شراء، تسجيل…) — مع تحديد المقام', 'share of visits that reached the goal (buy, sign-up…) — the site’s contribution to profit'), k: '3 / 100 = <bdi>3%</bdi>' })}
    ${B.chip('tr', 1110, 520, '⚠️ ' + L('فخ: «الارتداد = نسبة تحقيق الهدف» ← غلط (ده CVR)', 'trap: “bounce = goal rate” → false (that is CVR)'), 'c-red', 750)}
  </div>
  <div id="e3-s7" class="mv-stage">
    ${B.ch('ex', 70, 360, 'md')}
    <div id="e3-ui" class="l12u l12-win later" style="${B.at(330, 150, 760, 460)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com/checkout</span></div>
      <div class="wbody"><div class="l12-field">📧 email <b class="err">⚠️ ${L('الإيميل ناقص @', 'missing @')}</b></div><div class="l12-field">⏳ ${L('جاري التحميل…', 'loading…')} <b class="spin">◐</b></div><div class="l12-field">🔘 ${L('نفس شكل الزراير', 'same button style')} <b>✓</b></div></div></div>
    ${[['🔁', L('الاتساق', 'Consistency'), L('التصميم والعمليات موحّدة', 'unified design and actions')], ['🛑', L('منع الأخطاء', 'Error prevention'), L('التصميم يصعّب الغلط', 'design makes mistakes hard')], ['💡', L('وضوح حالة النظام', 'Visible system status'), L('مؤشر التحميل · رسايل خطأ الإدخال', 'loading indicator · input error messages')]]
      .map(([ic, h, p], k) => B.card('h' + k, 1140, 150 + k * 165, 720, 0, 'c-violet', { row: true, ic, h, p })).join('')}
    ${B.chip('hd', 330, 650, '🧑‍💼 ' + L('خبراء + قواعد عملية = شكل من التقييم النوعي', 'experts + heuristics = a form of qualitative evaluation'), 'c-violet', 760)}
  </div>
  <div id="e3-s8" class="mv-stage">
    ${B.card('kp', 70, 150, 620, 0, 'c-slate', { h: '📊 ' + L('لوحة المتجر', 'Shop dashboard'), html: `<div class="l12-dash"><span>👁️ PV<b class="up">↑ <bdi>12,480</bdi></b></span><span>🎯 CVR<b class="dn">↓ <bdi>0.4%</bdi></b></span></div>` })}
    ${B.chip('wh8', 70, 520, '📍 ' + L('الأرقام قالت فين: بين الدخول والشراء', 'numbers said where: between arriving and buying'), 'c-blue', 620)}
    ${B.ch('u2', 760, 360, 'md')}
    <div id="e3-shop" class="l12u l12-win later" style="${B.at(1040, 150, 820, 460)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com/cart</span></div><div class="wbody l12-cart">🛒 ${L('السلة: حذاء', 'cart: shoe')}<br><bdi>450</bdi> ${L('جنيه', 'EGP')}<span class="pay">${L('ادفع', 'Pay')}</span></div></div>
    ${B.big('mag', 1100, 300, 110, 90, '🔍')}
    ${B.stamp('hid', 1180, 640, '😮 ' + L('زرار الدفع مستخبي!', 'the pay button is hidden!'))}
  </div>
  <div id="e3-s9" class="mv-stage">
    ${B.card('rq', 70, 150, 860, 380, 'c-blue', { ic: '📊', h: L('الكمّي ← قد إيه؟', 'Quantitative → how much?'), p: 'PV · ' + L('الارتداد', 'bounce') + ' · CVR' })}
    ${B.card('rl', 990, 150, 870, 380, 'c-violet', { ic: '🔍', h: L('النوعي ← ليه؟', 'Qualitative → why?'), p: L('اختبار قابلية الاستخدام · المقابلات · التقييم الإرشادي', 'usability tests · interviews · heuristic evaluation') })}
    ${B.mid('rb', 590, '🤝 ' + L('اجمع الاتنين عشان تقيّم الموقع بوضوح', 'combine both to evaluate a site clearly'), 'c-green big')}
  </div>
    ${U.hd(0, '⚖️ ' + L('نوعين التقييم', 'Two kinds of evaluation'))}
    ${U.hd(1, '🔍 ' + L('التقييم النوعي', 'Qualitative evaluation'))}
    ${U.hd(2, '📊 ' + L('التقييم الكمّي', 'Quantitative evaluation'))}
    ${U.hd(3, '🤝 ' + L('الأرقام بتقول فين… والآراء بتقول ليه', 'Numbers say where… voices say why'))}
    ${U.hd(4, '👁️ ' + L('مشاهدات الصفحة (PV)', 'Page views (PV)'))}
    ${U.hd(5, '🚪 ' + L('معدل الارتداد', 'Bounce rate'))}
    ${U.hd(6, '🎯 ' + L('معدل التحويل (CVR)', 'Conversion rate (CVR)'))}
    ${U.hd(7, '🧑‍💼 ' + L('التقييم الإرشادي', 'Heuristic evaluation'))}
    ${U.hd(8, '🛒 ' + L('مثال: PV عالي و CVR منخفض', 'Example: high PV, low CVR'))}
    ${U.hd(9, '📌 ' + L('الخلاصة', 'Recap'))}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    let c = at(0);
    frame(0, c);
    IN(q('ql'), c + 0.4, 0.5, { x: -40 * sx });
    tl.fromTo(all('#e3-ql .l12-icons'), { letterSpacing: '0px', opacity: 0 }, { letterSpacing: '30px', opacity: 1, duration: 0.8 }, c + 1.0);
    IN(q('qn'), c + 2.2, 0.5, { x: 40 * sx });
    tl.fromTo(all('#e3-qn .l12-cols3 i'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.6)' }, c + 2.8); SND('pop', c + 2.8);

    c = at(1);
    frame(1, c);
    leave(1, c);
    POP(q('why'), c + 0.4, 0.4);
    IN(Q('us ob'), c + 0.8, 0.5, { y: 30 }); IN(q('ut'), c + 1.2, 0.4, { y: -12 });
    M.mood('us', true, c + 2.0); POP(q('nt'), c + 2.2, 0.4); SND('tap', c + 2.2);
    IN(q('iv'), c + 3.4, 0.5, { y: 30 }); IN(q('in'), c + 3.8, 0.4, { y: -12 }); POP(q('sy'), c + 4.6, 0.4);

    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('an'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#e3-an .c1'), { textContent: 0 }, { textContent: 12480, snap: { textContent: 10 }, duration: 1.6 }, c + 0.9);
    IN(q('ab'), c + 2.4, 0.5, { y: 30 });
    tl.fromTo(all('#e3-ab .l12-bar i'), { width: '0%' }, { width: (k, e) => e.dataset.w + '%', duration: 0.8, stagger: 0.4 }, c + 3.2); SND('ok', c + 4.4);
    glow(M, all('#e3-ab .bb'), c + 4.4, 'rgba(52,211,153,.95)');
    IN(q('obj'), c + 5.2, 0.4, { y: 12 });

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('wh'), c + 0.4, 0.5, { x: -40 * sx }); IN(q('wy'), c + 1.4, 0.5, { x: 40 * sx });
    tl.to(Q('wh wy'), { x: (k) => (k ? -30 : 30) * sx, duration: 0.6, ease: 'power2.inOut' }, c + 2.6);
    POP(q('both'), c + 3.2, 0.5); SND('ok', c + 3.2);

    c = at(4);
    frame(4, c);
    leave(4, c);
    IN(q('pv'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#e3-pv .c2'), { textContent: 0 }, { textContent: 12480, snap: { textContent: 10 }, duration: 2.4, ease: 'power1.in' }, c + 1.0);
    IN(q('pvd'), c + 2.0, 0.5, { x: 40 * sx }); IN(q('cen'), c + 3.4, 0.4, { y: 12 });

    c = at(5);
    frame(5, c);
    leave(5, c);
    IN(q('door'), c + 0.4, 0.4);
    range(10).forEach((k) => {
      const t = c + 0.8 + k * 0.25, bounce = k % 5 < 3;
      tl.fromTo(all('#e3-door .v' + k), { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: (240 + (k % 5) * 40) * sx, duration: 0.4 }, t);
      tl.to(all('#e3-door .v' + k), bounce ? { y: 200, duration: 0.4 } : { x: (660 + (k % 5) * 50) * sx, duration: 0.5 }, t + 0.6);
    });
    SND('bad', c + 3.6);
    IN(q('br'), c + 4.4, 0.5, { x: 40 * sx }); IN(q('exp'), c + 5.6, 0.4, { y: 12 });

    c = at(6);
    frame(6, c);
    leave(6, c);
    IN(q('fun'), c + 0.4, 0.3);
    tl.fromTo(all('#e3-fun span'), { opacity: 0, scaleX: 0.3 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.6 }, c + 0.6); SND('pop', c + 0.6);
    IN(q('cv'), c + 2.8, 0.5, { x: 40 * sx }); SND('ok', c + 2.8);
    IN(q('tr'), c + 4.4, 0.4, { y: 12 });

    c = at(7);
    frame(7, c);
    leave(7, c);
    IN(q('ex'), c + 0.4, 0.5, { x: -30 * sx }); IN(q('ui'), c + 0.8, 0.5, { y: 30 });
    range(3).forEach((k) => { IN(q('h' + k), c + 1.6 + k * 0.9, 0.5, { x: 40 * sx }); SND('ok', c + 1.6 + k * 0.9); });
    tl.fromTo(all('#e3-ui .err'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 3.4);
    IN(q('hd'), c + 4.8, 0.4, { y: 12 });

    c = at(8);
    frame(8, c);
    leave(8, c);
    IN(q('kp'), c + 0.4, 0.5, { y: 30 }); SND('bad', c + 1.0);
    IN(q('wh8'), c + 1.6, 0.4, { y: 12 });
    IN(q('u2'), c + 2.4, 0.5, { y: 30 }); IN(q('shop'), c + 2.6, 0.5, { x: 40 * sx }); M.mood('u2', true, c + 3.2);
    tl.fromTo(q('mag'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 3.6);
    tl.to(q('mag'), { x: 420 * sx, y: 200, duration: 1.0, ease: 'power2.inOut' }, c + 3.8);
    tl.to(all('#e3-shop .pay'), { opacity: 1, backgroundColor: '#ec4899', color: '#fff', duration: 0.4 }, c + 4.8);
    stampIn(M, q('hid'), c + 5.2); SND('bad', c + 5.2);

    c = at(9);
    frame(9, c);
    leave(9, c);
    IN(q('rq'), c + 0.4, 0.5, { x: -40 * sx }); IN(q('rl'), c + 1.0, 0.5, { x: 40 * sx });
    POP(q('rb'), c + 2.2, 0.5); SND('ok', c + 2.2);

    M.loop(0, 4.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#e3-qn .l12-cols3 i'), { scaleY: 0.7, transformOrigin: '50% 100%', duration: 0.8, stagger: 0.15, ease: 'sine.inOut' }));
    M.loop(1, 5.6, () => M.bob(Q('nt sy'), 7, 1.1));
    M.loop(2, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#e3-ab .bb'), { scale: 1.1, duration: 0.6 }));
    M.loop(3, 4.0, () => M.breathe(q('both'), 1.05, 1.0));
    M.loop(4, 3.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#e3-pv .l12-eye'), { scale: 1.04, duration: 0.8 }));
    M.loop(6, 5.0, () => glowCycle(all('#e3-fun span'), 'rgba(52,211,153,.9)', 0.4));
    M.loop(7, 5.4, () => gsap.timeline({ repeat: -1 }).to(all('#e3-ui .spin'), { rotation: 360, duration: 1.2, ease: 'none' }));
    M.loop(8, 5.8, () => M.breathe(q('hid'), 1.06, 0.9));
    return M.done();
  });
})();

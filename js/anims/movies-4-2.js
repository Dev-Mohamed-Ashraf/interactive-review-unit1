/* =========================================================
 * anims/movies-4-2.js — lesson 4-2 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   designMovie (stations plan 0–3 · crap 4–9): visitors lost on a designer’s
 *     page · a persona card · grey wireframe boxes that grow into a design ·
 *     why wireframes before colours · one messy product page fixed principle by
 *     principle (contrast, repetition, alignment, proximity) · UCD · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  K.defineAnim('designMovie', (stage, props, api) => {
    const P = 'd2-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-design mv-l12 mv-l42', prefix: P, beats: 10, cast: { ds: 'engineer', v1: 'student', v2: 'visitor', ps: 'applicant', ps2: 'applicant', k1: 'clerk', k2: 'server' },
      html: (L) => `
  <div id="d2-s0" class="mv-stage">
    <div id="d2-mess" class="l12u l12-win later" style="${B.at(560, 140, 800, 420)}"><div class="wbar"><i></i><i></i><i></i><span class="url">my-site.com</span></div>
      <div class="wbody l12-clutter">${['📢', '🎁', '⭐', '📞', '🛒', '📰', '🔥', '❓', '📍', '💬', '🎵', '📷'].map((e, k) => `<span style="transform:rotate(${(k % 5) * 6 - 12}deg)">${e}</span>`).join('')}</div></div>
    ${B.ch('ds', 120, 340, 'md')}
    ${B.chip('dsa', 70, 250, '😎 ' + L('«واضح جدًا!»', '“crystal clear!”'), 'c-slate big')}
    ${B.ch('v1', 1460, 340, 'md')}${B.ch('v2', 1660, 360, 'sm')}
    ${B.big('qa', 1440, 220, 90, 70, '❓')}${B.big('qb', 1700, 240, 90, 70, '❓')}
    ${B.mid('fu', 640, '🧭 ' + L('التصميم الكويس بيبدأ من المستخدم… مش من المصمّم', 'good design starts from the user… not the creator'), 'c-green big')}
  </div>
  <div id="d2-s1" class="mv-stage">
    ${B.ch('ps', 120, 220, 'md')}
    <div id="d2-pc" class="l12u l12-card c-green later" style="${B.at(420, 150, 900, 0)}"><span class="h">🪪 ${L('شخصية المستخدم (Persona)', 'Persona')}</span>
      <div class="l12-kv"><b>👤 ${L('الاسم', 'name')}</b><span>${L('أحمد · 32 سنة', 'Ahmed · 32')}</span><b>💼 ${L('المهنة', 'job')}</b><span>${L('موظف', 'office worker')}</span><b>🎯 ${L('الهدف', 'goal')}</b><span>${L('يقارن منتجات من الموبايل في المواصلات', 'compare products on his phone while commuting')}</span><b>⏱️ ${L('التحدي', 'challenge')}</b><span>${L('عايز المعلومة في وقت قصير', 'needs information fast')}</span></div></div>
    ${B.big('bus', 1380, 180, 320, 110, '🚌📱')}
    ${B.card('pd', 1380, 420, 480, 0, 'c-amber', { ic: '🎯', p: L('نفكّر في «المستخدم ده محتاج إيه» — فالتصميم مايتوهش', 'we think “what does THIS user need” — so the design stays on track') })}
  </div>
  <div id="d2-s2" class="mv-stage">
    <div id="d2-wf" class="l12u l12-wire later" style="${B.at(120, 140, 820, 500)}"><b class="hd">${L('الهيدر', 'header')}</b><b class="im">${L('صورة', 'image')}</b><b class="tx">${L('نص', 'text')}</b><b class="bt">${L('زرار', 'button')}</b></div>
    <div id="d2-fin" class="l12u l12-win later" style="${B.at(1040, 140, 820, 500)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com</span></div>
      <div class="wbody l12-final"><b class="hd">🛍️ Nile Shop</b><b class="im">👟</b><div class="tx"><b>${L('حذاء رياضي', 'Running shoe')}</b><span><bdi>450</bdi> ${L('جنيه', 'EGP')}</span></div><b class="bt">${L('اشترِ', 'Buy')}</b></div></div>
    ${B.big('grow', 940, 330, 100, 70, B.arrow, 'l12-gold')}
    ${B.mid('wd', 680, '🔲 ' + L('مخطّط تقريبي من غير ألوان ولا زخرفة — يحدّد مكان المعلومات وأولويتها', 'a rough plan with no colour or decoration — it fixes where information goes and its priority'), 'c-slate')}
  </div>
  <div id="d2-s3" class="mv-stage">
    ${B.ch('k1', 120, 330, 'md')}${B.ch('k2', 420, 330, 'md')}
    ${B.chip('b1', 60, 220, '🔵 «' + L('أنا بحب الأزرق!', 'I love blue!') + '»', 'c-blue big')}
    ${B.chip('b2', 380, 150, '🟢 «' + L('لأ، الأخضر!', 'no, green!') + '»', 'c-green big')}
    ${B.stamp('nx', 160, 640, '✗ ' + L('ذوق شخصي… مابيخلصش', 'personal taste… endless'))}
    ${B.card('need', 1000, 160, 860, 0, 'c-green', { ic: '🔲', h: L('نثبّت مكان المعلومات وأولويتها الأول', 'fix the placement & priority first'), p: L('النقاش يبقى عن احتياج المستخدم — فأصحاب المصلحة يتفقوا أسهل', 'the talk is about the user’s need — stakeholders agree more easily') })}
    ${B.chip('trap', 1000, 520, '⚠️ ' + L('الإطار السلكي مش تصميم نهائي ومافيهوش ألوان', 'a wireframe is not a final design and has no colour'), 'c-red', 860)}
  </div>

  <div id="d2-pgw" class="mv-stage">
    <div id="d2-pg" class="l12u l12-win later" style="${B.at(70, 140, 940, 520)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com/shoe</span></div>
      <div class="wbody l12-prod"><b class="t">${L('حذاء رياضي جديد', 'New running shoe')}</b><div class="row"><span class="im">👟</span><div class="info"><b class="nm">${L('حذاء الجري X', 'Runner X')}</b><b class="pr"><bdi>450</bdi> ${L('جنيه', 'EGP')}</b><b class="bt">${L('اشترِ', 'Buy')}</b></div></div><p class="ds">${L('خفيف ومريح للجري اليومي', 'light and comfy for daily runs')}</p></div></div>
    ${B.svg('guide', 140, 250, 40, 380, '0 0 40 380', '<path d="M20 0 V380" stroke="#38bdf8" stroke-width="6" stroke-dasharray="14 10"/>')}
    ${[['🎯', L('① التباين', '① Contrast'), L('نبرز أهم العناصر فورًا — عنوان كبير وغامق، ولون مميّز لزرار «اشترِ»', 'highlight the key elements — big bold heading, an accent colour for “Buy”'), 'c-pink'],
      ['🔁', L('② التكرار', '② Repetition'), L('نفس لون وحجم وخط العناوين في كل صفحة — تصميم متّسق والمستخدم مايتوهش', 'same heading colour, size and font on every page — consistent, users don’t get lost'), 'c-blue'],
      ['📏', L('③ المحاذاة', '③ Alignment'), L('كل عنصر على خط أساس مشترك — الشاشة يبقى ليها نظام', 'every element on a shared baseline — the screen gets order'), 'c-amber'],
      ['🧲', L('④ التقارب', '④ Proximity'), L('المعلومات المرتبطة قريبة — صورة واسم وسعر المنتج مجموعة واحدة', 'related info together — the product’s image, name and price form one group'), 'c-green']]
      .map(([ic, h, p, c], k) => B.card('cr' + k, 1060, 150, 800, 0, c, { ic, h, p })).join('')}
    <div id="d2-minis" class="l12u l12-minis later" style="${B.at(1060, 450, 800, 200)}">${range(3).map((k) => `<span><b>${[L('الرئيسية', 'Home'), L('المنتجات', 'Products'), L('اتصل بينا', 'Contact')][k]}</b><i>• ─────</i><i>• ────</i></span>`).join('')}</div>
  </div>

  <div id="d2-s8" class="mv-stage">
    ${B.ch('ps2', 820, 300, 'md')}
    ${B.chip('u1', 470, 190, '🤔 ' + L('المستخدم محتاج إيه؟', 'what does the user need?'), 'c-green big')}
    ${B.chip('u2', 1100, 190, '📍 ' + L('هيستخدمه في أنهي موقف؟', 'in which situation?'), 'c-blue big')}
    ${B.chip('u3', 470, 620, '🪪 ' + L('شخصية المستخدم = طريقة لتطبيقه', 'personas are one way to apply it'), 'c-amber')}
    ${B.chip('u4', 1100, 620, '🎯 ' + L('قابلية الاستخدام · إمكانية الوصول', 'usability · accessibility'), 'c-violet')}
    ${B.card('ucd', 70, 300, 640, 0, 'c-green', { ic: '🧭', h: L('التصميم المتمحور حول المستخدم (UCD)', 'User-Centred Design (UCD)'), p: L('من منظور المستخدم — مش راحة المصمّم', 'from the user’s view — not the designer’s comfort') })}
  </div>
  <div id="d2-s9" class="mv-stage">
    ${[['🪪', L('شخصية', 'Persona'), L('مين؟', 'who?'), 'c-green'], ['🔲', L('إطار سلكي', 'Wireframe'), L('فين؟ (من غير لون)', 'where? (no colour)'), 'c-slate'], ['🎨', 'CRAP', L('وضّحها', 'make it clear'), 'c-pink'], ['🧭', 'UCD', L('قرّر للمستخدم', 'decide for the user'), 'c-blue']]
      .map(([ic, h, p, c], k) => B.card('rc' + k, 70 + k * 455, 150, 400, 260, c, { ic, h: `<bdi>${h}</bdi>`, k: p })).join('')}
    ${range(3).map((k) => B.big('ra' + k, 470 + k * 455, 250, 55, 50, B.arrow, 'l12-gold')).join('')}
    ${B.mid('crap', 480, '🎯 ' + L('التباين يبرز · 🔁 التكرار يوحّد · 📏 المحاذاة تنظّم · 🧲 التقارب يجمّع', 'contrast highlights · repetition unifies · alignment orders · proximity groups'), 'c-amber big')}
  </div>
    ${U.hd(0, '🤔 ' + L('واضح للمصمّم… تايه للزوّار', 'Clear to its designer… lost visitors'))}
    ${U.hd(1, '🪪 ' + L('شخصية المستخدم (Persona)', 'The persona'))}
    ${U.hd(2, '🔲 ' + L('الإطار السلكي (Wireframe)', 'The wireframe'))}
    ${U.hd(3, '💬 ' + L('ليه الإطار السلكي قبل الألوان؟', 'Why a wireframe before colours?'))}
    ${U.hd(4, '🎯 ' + L('① التباين (Contrast)', '① Contrast'))}
    ${U.hd(5, '🔁 ' + L('② التكرار (Repetition)', '② Repetition'))}
    ${U.hd(6, '📏 ' + L('③ المحاذاة (Alignment)', '③ Alignment'))}
    ${U.hd(7, '🧲 ' + L('④ التقارب (Proximity)', '④ Proximity'))}
    ${U.hd(8, '🧭 ' + L('التصميم المتمحور حول المستخدم', 'User-centred design'))}
    ${U.hd(9, '📌 ' + L('الخلاصة', 'Recap'))}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };
    const sel = (s) => all('#d2-pg ' + s);
    /* the messy page: every part starts off its line; principles bring it home */
    const MESS = { '.t': { x: 40, y: 0 }, '.im': { x: -30, y: 40 }, '.nm': { x: 50, y: 50 }, '.pr': { x: -40, y: 90 }, '.bt': { x: 70, y: 60 }, '.ds': { x: -50, y: 0 } };
    const card = (k, t) => { if (k > 0) OUT(q('cr' + (k - 1)), t, 0.3); IN(q('cr' + k), t + 0.3, 0.5, { x: 40 * sx }); };

    /* 0 — lost visitors */
    let c = at(0);
    frame(0, c);
    IN(q('mess'), c + 0.3, 0.5, { y: 30 });
    tl.fromTo(all('#d2-mess .l12-clutter span'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.08, ease: 'back.out(2)' }, c + 0.7);
    IN(q('ds'), c + 1.8, 0.5, { x: -30 * sx }); POP(q('dsa'), c + 2.4, 0.4);
    IN(Q('v1 v2'), c + 3.2, 0.5, { x: 30 * sx });
    POP(q('qa'), c + 4.0, 0.4); POP(q('qb'), c + 4.3, 0.4); SND('bad', c + 4.0);
    M.mood('v1', true, c + 4.2); M.mood('v2', true, c + 4.4);
    POP(q('fu'), c + 5.4, 0.5);

    /* 1 — persona */
    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('ps'), c + 0.4, 0.5, { x: -30 * sx });
    IN(q('pc'), c + 0.8, 0.5, { y: 30 });
    tl.fromTo(all('#d2-pc .l12-kv > *'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.2 }, c + 1.3); SND('pop', c + 1.3);
    POP(q('bus'), c + 3.4, 0.5);
    IN(q('pd'), c + 4.4, 0.5, { y: 24 });

    /* 2 — wireframe */
    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('wf'), c + 0.4, 0.3);
    tl.fromTo(all('#d2-wf b'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.35, ease: 'back.out(2)' }, c + 0.6); SND('pop', c + 0.6);
    IN(q('grow'), c + 2.4, 0.3);
    IN(q('fin'), c + 2.8, 0.6, { scale: 0.9 }); SND('ok', c + 3.2);
    IN(q('wd'), c + 4.4, 0.4, { y: 12 });

    /* 3 — why wireframe first */
    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(Q('k1 k2'), c + 0.4, 0.5, { y: 30 });
    POP(q('b1'), c + 1.0, 0.4); POP(q('b2'), c + 1.6, 0.4); SND('bad', c + 1.6);
    tl.fromTo(Q('b1 b2'), { rotation: 0 }, { rotation: 3, duration: 0.1, yoyo: true, repeat: 7 }, c + 2.2);
    stampIn(M, q('nx'), c + 3.0);
    IN(q('need'), c + 3.8, 0.5, { x: 40 * sx }); SND('ok', c + 3.8);
    M.mood('k1', false, c + 4.4);
    IN(q('trap'), c + 5.4, 0.4, { y: 12 });

    /* 4–7 — one messy page, fixed principle by principle */
    c = at(4);
    frame(4, c);
    leave(4, c);
    Object.entries(MESS).forEach(([s, o]) => tl.set(sel(s), { x: o.x * sx, y: o.y }, c));
    IN(q('pg'), c + 0.4, 0.5, { y: 30 });
    card(0, c + 0.8);
    tl.fromTo(sel('.t'), { fontSize: '30px', color: '#64748b' }, { fontSize: '50px', color: '#0f172a', duration: 0.7 }, c + 2.0);
    tl.fromTo(sel('.bt'), { backgroundColor: '#cbd5e1', color: '#475569' }, { backgroundColor: '#ec4899', color: '#ffffff', duration: 0.6 }, c + 2.8); SND('pop', c + 2.8);
    glow(M, sel('.bt'), c + 3.4, 'rgba(236,72,153,.95)');

    c = at(5);
    frame(5, c);
    card(1, c + 0.3);
    IN(q('minis'), c + 1.2, 0.5, { y: 24 });
    tl.fromTo(all('#d2-minis b'), { color: '#94a3b8', fontSize: '24px' }, { color: '#0f172a', fontSize: '30px', duration: 0.4, stagger: 0.3 }, c + 1.8);
    tl.to(all('#d2-minis i'), { color: '#2563eb', duration: 0.3, stagger: 0.1 }, c + 3.0); SND('ok', c + 3.4);

    c = at(6);
    frame(6, c);
    OUT(q('minis'), c, 0.3); card(2, c + 0.3);
    IN(q('guide'), c + 1.0, 0.3); tl.fromTo(all('#d2-guide path'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6 }, c + 1.0);
    Object.keys(MESS).forEach((s, k) => tl.to(sel(s), { x: 0, duration: 0.5, ease: 'back.out(1.6)' }, c + 1.8 + k * 0.2)); SND('tap', c + 1.8);

    c = at(7);
    frame(7, c);
    OUT(q('guide'), c, 0.3); card(3, c + 0.3);
    Object.keys(MESS).forEach((s, k) => tl.to(sel(s), { y: 0, duration: 0.5, ease: 'power2.inOut' }, c + 1.2 + k * 0.15)); SND('tap', c + 1.2);
    tl.to(sel('.row'), { outlineColor: 'rgba(52,211,153,1)', duration: 0.4 }, c + 2.6); SND('ok', c + 2.8);

    /* 8 — UCD */
    c = at(8);
    frame(8, c);
    OUT(q('pgw'), c, 0.4);
    IN(q('ps2'), c + 0.4, 0.5, { y: 30 });
    IN(q('ucd'), c + 1.0, 0.5, { x: -30 * sx });
    ['u1', 'u2', 'u3', 'u4'].forEach((u, k) => POP(q(u), c + 2.0 + k * 0.6, 0.4));

    /* 9 — recap */
    c = at(9);
    frame(9, c);
    OUT(q('s8'), c, 0.4);
    range(4).forEach((k) => { IN(q('rc' + k), c + 0.4 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.4 + k * 0.5); if (k < 3) IN(q('ra' + k), c + 0.7 + k * 0.5, 0.3); });
    POP(q('crap'), c + 2.8, 0.5);

    M.loop(0, 6.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#d2-mess .l12-clutter span'), { rotation: '+=8', duration: 0.6, stagger: { each: 0.05, from: 'random' } }));
    M.loop(1, 5.4, () => M.bob(q('bus'), 6, 0.6));
    M.loop(2, 5.2, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('grow'), { x: 14 * sx, duration: 0.6 }));
    M.loop(3, 6.2, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(Q('b1 b2'), { rotation: 0 }, { rotation: 3, duration: 0.1, yoyo: true, repeat: 5 }));
    M.loop(4, 4.2, () => M.glowLoop(sel('.bt'), 'rgba(236,72,153,.95)', 0.9));
    M.loop(7, 3.6, () => M.glowLoop(sel('.row'), 'rgba(52,211,153,.8)', 1.0));
    M.loop(8, 4.6, () => M.bob(Q('u1 u2 u3 u4'), 7, 1.2));
    M.loop(9, 3.6, () => glowCycle(Q('rc0 rc1 rc2 rc3'), 'rgba(16,185,129,.9)', 0.4));
    return M.done();
  });
})();

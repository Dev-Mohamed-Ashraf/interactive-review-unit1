/* =========================================================
 * anims/movies-3.js — lesson 3-1 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   webTiersMovie (stations tiers 0–2 · flow 3–8): what a web app is · the three
 *     tiers (a browser, a server, a database) · examples per tier · one search
 *     travelling down the tiers and back (①–⑥) · familiar services · a fault · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const RACK = `<rect x="10" y="10" width="220" height="310" rx="22" fill="#1e293b" stroke="#64748b" stroke-width="5"/>
    ${range(4).map((k) => `<rect x="30" y="${34 + k * 70}" width="180" height="52" rx="10" fill="#0f172a"/><circle class="led" cx="52" cy="${60 + k * 70}" r="8" fill="${['#34d399', '#38bdf8', '#34d399', '#fbbf24'][k]}"/><rect x="76" y="${54 + k * 70}" width="110" height="12" rx="6" fill="#334155"/>`).join('')}`;
  const DB = `<path d="M30 60 V270 Q210 330 390 270 V60" fill="#0f172a" stroke="#34d399" stroke-width="6"/>
    <ellipse cx="210" cy="60" rx="180" ry="44" fill="#134e4a" stroke="#34d399" stroke-width="6"/>
    ${[130, 190, 250].map((y) => `<path d="M30 ${y} Q210 ${y + 56} 390 ${y}" fill="none" stroke="#2dd4bf" stroke-width="4" opacity=".55"/>`).join('')}
    ${range(3).map((k) => `<rect class="rw r${k}" x="110" y="${118 + k * 58}" width="200" height="24" rx="12" fill="#2dd4bf" opacity=".25"/>`).join('')}`;

  K.defineAnim('webTiersMovie', (stage, props, api) => {
    const P = 'w1-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l12 mv-l31', prefix: P, beats: 9,
      html: (L) => {
        const STEPS = [L('① تستقبل', '① receive'), L('② تبعت', '② send'), L('③ تدوّر', '③ search'), L('④ ترجّع', '④ return'), L('⑤ ترتّب', '⑤ organise'), L('⑥ تعرض', '⑥ display')];
        return `
  <div id="w1-s0" class="mv-stage">
    <div id="w1-app" class="l12u l12-win later" style="${B.at(70, 150, 860, 420)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🌐 <span class="u u0">youtube.com</span><span class="u u1">amazon.com</span><span class="u u2">mail.google.com</span><span class="u u3">maps.google.com</span></span></div>
      <div class="wbody l12-apps"><span class="a a0">▶️ YouTube</span><span class="a a1">🛒 Amazon</span><span class="a a2">✉️ Gmail</span><span class="a a3">🗺️ Google Maps</span></div></div>
    ${B.card('inst', 1000, 150, 420, 250, 'c-slate', { ic: '📦', h: L('تسطيب برنامج مخصّص؟', 'Install special software?') })}
    ${B.stamp('noi', 1080, 420, '✗ ' + L('مش محتاج', 'not needed'))}
    ${B.chip('brw', 1480, 220, '🌐 ' + L('يكفي متصفح', 'a browser is enough'), 'c-green big')}
    ${B.card('def0', 70, 610, 1790, 0, 'c-blue', { row: true, ic: '🌐', h: L('تطبيق الويب', 'Web application'), p: L('تطبيق بيتستخدم عن طريق متصفح الويب — من غير ما تسطّب برنامج مخصّص', 'an application used through a web browser — no dedicated software to install') })}
  </div>

  <div id="w1-tr" class="mv-stage">
    ${B.chip('t0', 70, 118, '🖥️ ' + L('الواجهة الأمامية', 'Frontend') + ' <bdi>Frontend</bdi>', 'c-blue big', 640)}
    ${B.chip('t1', 770, 118, '⚙️ ' + L('الخلفية', 'Backend') + ' <bdi>Backend</bdi>', 'c-violet big', 400)}
    ${B.chip('t2', 1230, 118, '🗄️ ' + L('قاعدة البيانات', 'Database') + ' <bdi>Database</bdi>', 'c-green big', 620)}
    <div id="w1-fw" class="l12u l12-win later" style="${B.at(90, 200, 600, 320)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🔒 shop.com</span></div>
      <div class="wbody l12-lay"><div class="ly srch"><div class="l12-field">🔎 <b class="tq"><span>${L('سماعة', 'headphones')}</span></b></div></div>
        <div class="ly res"><div class="l12-field">🎧 ${L('سماعة لاسلكي', 'wireless headphones')}</div><div class="l12-field">🎧 ${L('سماعة جيمنج', 'gaming headset')}</div></div>
        <div class="ly book"><div class="l12-field">📅 ${L('احجز ميعاد', 'book a slot')}</div><div class="empty">😕 ${L('مفيش مواعيد ظهرت', 'no slots appear')}</div></div></div></div>
    ${B.svg('bk', 850, 200, 240, 330, '0 0 240 330', RACK)}
    ${B.big('gear', 900, 225, 140, 90, '⚙️')}
    ${B.svg('db', 1330, 210, 420, 320, '0 0 420 330', DB)}
    ${B.chip('w0', 70, 556, '💻 ' + L('على المتصفح — المستخدم شايفها', 'on the browser — the user sees it'), 'c-blue', 640)}
    ${B.chip('w1', 770, 556, '🖥️ ' + L('على الخادم — مش ظاهرة', 'on the server — hidden'), 'c-violet', 400)}
    ${B.chip('w2', 1230, 556, '📚 ' + L('تنظّم · تخزّن · تدير', 'organise · store · manage'), 'c-green', 620)}
    ${B.card('x0', 70, 556, 640, 0, 'c-blue', { p: L('شاشة البحث · صفحات المنتجات · نماذج الإدخال', 'search screen · product pages · input forms') })}
    ${B.card('x1', 770, 556, 400, 0, 'c-violet', { p: L('البحث عن المنتجات المطابقة · مصادقة الدخول', 'matching products · login authentication') })}
    ${B.card('x2', 1230, 556, 620, 0, 'c-green', { p: L('المنتجات · المستخدمين · سجل الطلبات', 'products · users · order history') })}
    ${B.chip('p1', 560, 300, '🔎 «' + L('سماعة', 'headphones') + '»', 'c-amber')}
    ${B.chip('p2', 1020, 300, '🔍 ' + L('دوّر على: سماعة', 'find: headphones'), 'c-amber')}
    ${B.chip('p3', 1220, 400, '📦 ' + L('منتجين مطابقين', '2 matches'), 'c-green')}
    ${B.chip('p4', 760, 400, '📋 ' + L('النتايج مترتّبة', 'sorted results'), 'c-green')}
    ${STEPS.map((s, k) => B.chip('st' + k, 70 + k * 300, 676, s, 'c-slate', 270)).join('')}
    ${B.chip('ok', 90, 470, '✅ ' + L('الأمامية شغّالة', 'the frontend works'), 'c-green')}
    ${B.big('q1', 920, 360, 80, 70, '❓')}${B.big('q2', 1490, 360, 80, 70, '❓')}
    ${B.chip('tr1', 70, 610, '⚠️ ' + L('«الخلفية بتشتغل على المتصفح» ← غلط: على الخادم', '“the backend runs in the browser” → false: on the server'), 'c-red', 900)}
    ${B.chip('tr2', 1000, 610, '⚠️ ' + L('«الأمامية لوحدها تكفي» ← غلط: تلات طبقات', '“the frontend alone is enough” → false: three tiers'), 'c-red', 850)}
  </div>

  <div id="w1-s6" class="mv-stage">
    <div id="w1-tab" class="l12u l12-grid later" style="${B.at(70, 140, 1790, 520)}">
      <b></b><b class="h c-blue">🖥️ ${L('الأمامية', 'Frontend')}</b><b class="h c-violet">⚙️ ${L('الخلفية', 'Backend')}</b><b class="h c-green">🗄️ ${L('قاعدة البيانات', 'Database')}</b>
      <b class="r">🎬 ${L('موقع فيديو', 'Video site')}</b><span>${L('تشغيل الفيديو وشاشة البحث', 'playback & search screens')}</span><span>${L('اختيار الفيديوهات المقترحة · عدّ المشاهدات', 'pick recommendations · count views')}</span><span>${L('الفيديوهات · المستخدمين · سجل المشاهدة', 'videos · users · watch history')}</span>
      <b class="r">💬 ${L('تواصل اجتماعي', 'SNS')}</b><span>${L('التايملاين وشاشة النشر', 'timeline & post screens')}</span><span>${L('مين يشوف البوست · الإشعارات', 'who sees a post · notifications')}</span><span>${L('البوستات · المتابعات · الرسايل', 'posts · follows · messages')}</span>
      <b class="r">🛒 ${L('متجر إلكتروني', 'E-commerce')}</b><span>${L('قايمة المنتجات والسلة', 'product list & cart')}</span><span>${L('مراجعة المخزون · تنفيذ الدفع', 'stock check · payment')}</span><span>${L('المنتجات · الطلبات · العملاء', 'products · orders · customers')}</span></div>
  </div>

  <div id="w1-s8" class="mv-stage">
    ${[['🖥️', L('الأمامية', 'Frontend'), L('تعرض وتجمع', 'shows and collects'), 'c-blue'], ['⚙️', L('الخلفية', 'Backend'), L('تقرّر وتعالج', 'decides and processes'), 'c-violet'], ['🗄️', L('قاعدة البيانات', 'Database'), L('تخزّن وتسترجع', 'stores and retrieves'), 'c-green']]
      .map(([ic, h, p, c], k) => B.card('rc' + k, 70 + k * 600, 160, 570, 320, c, { ic, h, k: p })).join('')}
    ${B.mid('rp', 540, '🤝 ' + L('تلات طبقات متعاونة = تطبيق ويب شغّال', 'three cooperating tiers = a working web app'), 'c-green big')}
  </div>
    ${U.hd(0, '🌐 ' + L('يعني إيه تطبيق ويب؟', 'What is a web application?'))}
    ${U.hd(1, '🧱 ' + L('التلات طبقات', 'The three tiers'))}
    ${U.hd(2, '🗂️ ' + L('أمثلة لكل طبقة', 'Examples for each tier'))}
    ${U.hd(3, '🔎 ' + L('بحث في متجر: ① و②', 'A shop search: ① and ②'))}
    ${U.hd(4, '🗄️ ' + L('③ و④: الخلفية تسأل قاعدة البيانات', '③ and ④: the backend asks the database'))}
    ${U.hd(5, '📋 ' + L('⑤ و⑥: النتايج ترجع للشاشة', '⑤ and ⑥: results return to the screen'))}
    ${U.hd(6, '🎬 ' + L('كل الخدمات نفس البنية', 'Every service, the same architecture'))}
    ${U.hd(7, '🔧 ' + L('شخّص العطل', 'Diagnose the fault'))}
    ${U.hd(8, '📌 ' + L('الخلاصة', 'Recap'))}
    ${U.nt(5, L('الطلب بينزل في الطبقات… والاستجابة بترجع لفوق', 'the request goes down the tiers… the response comes back up'), 'ok')}
    ${U.nt(6, L('اللي بيتغيّر هو محتوى كل طبقة — مش وجودها', 'what changes is what each tier holds — not whether it exists'), 'ok')}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const step = (k, t) => { tl.to(q('st' + k), { backgroundColor: 'rgba(251,191,36,.35)', borderColor: '#fbbf24', color: '#fff', duration: 0.3 }, t); SND('tap', t); };
    const go = (el, t, dx, dy) => { tl.fromTo(q(el), { opacity: 0, x: 0, y: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25 }, t); tl.to(q(el), { x: dx * sx, y: dy || 0, duration: 0.9, ease: 'power1.inOut' }, t + 0.25); tl.to(q(el), { opacity: 0, duration: 0.2 }, t + 1.2); };
    const lay = (name, t) => { tl.to(all('#w1-fw .ly'), { opacity: 0, duration: 0.2 }, t); tl.to(all('#w1-fw .ly.' + name), { opacity: 1, duration: 0.3 }, t + 0.2); };

    /* 0 — what a web app is */
    let c = at(0);
    frame(0, c);
    IN(q('app'), c + 0.3, 0.5, { y: 30 });
    range(4).forEach((k) => {
      tl.fromTo(all(`#w1-app .a${k}`), { opacity: 0.25, scale: 0.9 }, { opacity: 1, scale: 1.06, duration: 0.3 }, c + 0.9 + k * 0.6);
      tl.to(all('#w1-app .u'), { opacity: 0, duration: 0.1 }, c + 0.9 + k * 0.6);
      tl.to(all(`#w1-app .u${k}`), { opacity: 1, duration: 0.2 }, c + 1.0 + k * 0.6);
      if (k < 3) tl.to(all(`#w1-app .a${k}`), { opacity: 0.6, scale: 1, duration: 0.3 }, c + 1.4 + k * 0.6);
    });
    IN(q('inst'), c + 3.6, 0.5, { y: 24 }); stampIn(M, q('noi'), c + 4.3); SND('bad', c + 4.3);
    POP(q('brw'), c + 5.0, 0.5); SND('ok', c + 5.0);
    IN(q('def0'), c + 5.8, 0.5, { y: 24 });

    /* 1 — the three tiers */
    c = at(1);
    frame(1, c);
    OUT(q('s0'), c, 0.4);
    [['t0', 'fw', 'w0'], ['t1', 'bk', 'w1'], ['t2', 'db', 'w2']].forEach(([t, a, w], k) => {
      IN(q(t), c + 0.5 + k * 1.4, 0.4, { y: -16 }); IN(q(a), c + 0.7 + k * 1.4, 0.5, { y: 30 }); IN(q(w), c + 1.2 + k * 1.4, 0.4, { y: 12 }); SND('pop', c + 0.7 + k * 1.4);
    });
    IN(q('gear'), c + 2.2, 0.4);
    tl.fromTo(all('#w1-fw .ly.srch'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 1.0);

    /* 2 — examples for each tier */
    c = at(2);
    frame(2, c);
    OUT(Q('w0 w1 w2'), c, 0.3);
    range(3).forEach((k) => { IN(q('x' + k), c + 0.6 + k * 0.9, 0.5, { y: 20 }); glow(M, q(['fw', 'bk', 'db'][k]), c + 0.6 + k * 0.9, 'rgba(255,255,255,.6)'); });

    /* 3 — ① receive · ② send */
    c = at(3);
    frame(3, c);
    OUT(Q('x0 x1 x2'), c, 0.3);
    range(6).forEach((k) => IN(q('st' + k), c + 0.4 + k * 0.08, 0.3, { y: 12 }));
    tl.fromTo(all('#w1-fw .tq span'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'steps(5)' }, c + 1.2);
    step(0, c + 1.4);
    go('p1', c + 2.8, 200, 0); step(1, c + 2.8);

    /* 4 — ③ search · ④ return */
    c = at(4);
    frame(4, c);
    tl.fromTo(q('gear'), { rotation: 0 }, { rotation: 360, duration: 1.2, ease: 'none' }, c + 0.4);
    go('p2', c + 1.6, 260, 0); step(2, c + 1.6);
    tl.fromTo(all('#w1-db .rw'), { opacity: 0.25 }, { opacity: (k) => (k < 2 ? 1 : 0.25), duration: 0.3, stagger: 0.2 }, c + 2.9);
    go('p3', c + 4.0, -260, 0); step(3, c + 4.0);

    /* 5 — ⑤ organise · ⑥ display */
    c = at(5);
    frame(5, c, 6.0);
    tl.fromTo(q('gear'), { rotation: 0 }, { rotation: -360, duration: 1.0, ease: 'none' }, c + 0.4); step(4, c + 0.6);
    go('p4', c + 1.6, -260, 0);
    lay('res', c + 2.9); step(5, c + 3.0);
    tl.fromTo(all('#w1-fw .res .l12-field'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.3 }, c + 3.1); SND('ok', c + 3.4);

    /* 6 — familiar services */
    c = at(6);
    frame(6, c, 6.0);
    OUT(q('tr'), c, 0.4);
    IN(q('tab'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(all('#w1-tab span'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.25 }, c + 1.0);

    /* 7 — diagnose a fault */
    c = at(7);
    frame(7, c);
    OUT(q('s6'), c, 0.4); IN(q('tr'), c + 0.3, 0.4);
    OUT(Q('st0 st1 st2 st3 st4 st5'), c, 0.2);
    lay('book', c + 0.5);
    POP(q('ok'), c + 1.4, 0.4); SND('ok', c + 1.4);
    tl.to(all('#w1-fw .empty'), { opacity: 1, duration: 0.3 }, c + 1.0);
    POP(q('q1'), c + 2.4, 0.4); POP(q('q2'), c + 2.8, 0.4); SND('bad', c + 2.4);
    glow(M, Q('bk db'), c + 3.2, 'rgba(248,113,113,.95)');
    IN(q('tr1'), c + 4.4, 0.4, { y: 12 }); IN(q('tr2'), c + 5.2, 0.4, { y: 12 });

    /* 8 — recap */
    c = at(8);
    frame(8, c);
    OUT(q('tr'), c, 0.4);
    range(3).forEach((k) => { IN(q('rc' + k), c + 0.5 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5 + k * 0.5); });
    POP(q('rp'), c + 2.4, 0.5);

    /* living loops */
    M.loop(0, 6.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('brw'), { scale: 1.06, duration: 0.9, ease: 'sine.inOut' }));
    M.loop(1, 5.0, () => gsap.timeline({ repeat: -1 }).to(q('gear'), { rotation: '+=360', duration: 5, ease: 'none' }));
    M.loop(1, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#w1-bk .led'), { opacity: 0.3, duration: 0.4, stagger: 0.15 }));
    M.loop(5, 5.0, () => glowCycle(Q('st0 st1 st2 st3 st4 st5'), 'rgba(251,191,36,.9)', 0.35));
    M.loop(7, 6.0, () => M.breathe(Q('q1 q2'), 1.15, 0.8));
    M.loop(8, 3.0, () => glowCycle(Q('rc0 rc1 rc2'), 'rgba(56,189,248,.9)', 0.5));
    return M.done();
  });
})();

/* =========================================================
 * anims/movies-3.js — chapter 3 (web applications) teacher-driven movies
 * (shell: movie-kit.js; each beat plays, then FREEZES). Layouts use the
 * logical builders (MK.uiL), so they mirror themselves in Arabic.
 *   webTiersMovie (3-1) : web app · the three tiers · a search request
 *                         through the tiers (6 steps) · services · faults
 *   webCommMovie  (3-2) : client/server · HTTP/HTTPS · GET/POST ·
 *                         status codes · API + JSON
 *   frontendMovie (3-3) : HTML/CSS/JS as a building · semantic HTML ·
 *                         responsive design · frameworks
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  /* a browser window frame (SVG) with optional inner content */
  const BROWSER = (w, h, inner) => `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    <path d="M4 26 Q4 4 26 4 H${w - 26} Q${w - 4} 4 ${w - 4} 26 V62 H4Z" fill="#1e293b"/>
    <circle cx="30" cy="33" r="8" fill="#f87171"/><circle cx="56" cy="33" r="8" fill="#fbbf24"/><circle cx="82" cy="33" r="8" fill="#34d399"/>
    <rect x="112" y="16" width="${w - 140}" height="34" rx="17" fill="#0b1222"/>${inner || ''}`;

  /* ═════════════════════════ webTiersMovie (3-1) ═════════════════════════ */
  K.defineAnim('webTiersMovie', (stage, props, api) => {
    const U = MK.uiL('w1-');
    const tiles = [['▶️', 'YouTube', 60, 92], ['🛒', 'Amazon', 370, 92], ['✉️', 'Gmail', 60, 262], ['🗺️', 'Google Maps', 370, 262]];
    const BR0 = BROWSER(700, 440, tiles.map(([e, n, x, y], k) => `<g class="tile t${k}"><rect x="${x}" y="${y}" width="270" height="150" rx="22" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <text x="${x + 135}" y="${y + 78}" text-anchor="middle" font-size="62">${e}</text><text x="${x + 135}" y="${y + 128}" text-anchor="middle" font-size="28" font-weight="800" fill="#e2e8f0">${n}</text></g>`).join(''));
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l31', prefix: 'w1-', beats: 9, cast: { 'ch-u': 'studentL', 'ch-u2': 'student' },
      html: (L) => {
        const BR2 = BROWSER(560, 380, `<text x="280" y="122" text-anchor="middle" font-size="34" font-weight="900" fill="#e2e8f0">📅 ${L('حجز موعد', 'Book a visit')}</text>
          ${range(3).map((k) => `<rect x="${60 + k * 150}" y="160" width="130" height="64" rx="14" fill="#1e293b" stroke="#334155" stroke-width="3"/><text x="${125 + k * 150}" y="203" text-anchor="middle" font-size="30" fill="#64748b">—</text>`).join('')}
          <text x="280" y="300" text-anchor="middle" font-size="30" font-weight="900" fill="#fca5a5">${L('مفيش مواعيد ظاهرة!', 'No slots shown!')}</text>`);
        return `
  <div id="w1-stage" class="mv-stage">
    ${U.ch('ch-u', 70, 420, 'md')}
    ${U.art('br', 330, 180, 700, 440, '0 0 700 440', BR0)}
    ${U.box('def', 1100, 190, 760, 't-blue', { ic: '🌐', h: L('تطبيق الويب', 'Web application'), p: L('تطبيق بيتستخدم عن طريق متصفح الويب', 'an application used through a web browser'), s: L('يكفي متصفح — من غير تسطيب برنامج مخصّص', 'a browser is enough — nothing to install') })}
    ${U.pill('ex', 1100, 500, 'YouTube · Amazon · Gmail · Google Maps', 't-slate')}

    ${U.box('fe', 80, 170, 540, 't-blue', { ic: '🖥️', y: L('Frontend', 'Frontend'), h: L('الواجهة الأمامية', 'The frontend'), p: L('الشاشة اللي المستخدم بيشوفها', 'the screen users see'), s: L('على المتصفح · بتستقبل الإدخال', 'on the browser · accepts input') })}
    ${U.box('be', 690, 170, 540, 't-violet', { ic: '⚙️', y: L('Backend', 'Backend'), h: L('الواجهة الخلفية', 'The backend'), p: L('معالجة على جانب الخادم', 'server-side processing'), s: L('مش ظاهرة · بتعالج وتقرّر', 'unseen · processes and decides') })}
    ${U.box('db', 1300, 170, 540, 't-green', { ic: '🗄️', y: L('Database', 'Database'), h: L('قاعدة البيانات', 'The database'), p: L('بتنظّم وتخزّن وتدير البيانات', 'organizes, stores, manages data'), s: L('تسترجع وقت الحاجة · تسجّل الجديد', 'retrieves when needed · records new') })}
    ${U.emo('a1', 620, 276, 70, 44, '⇄')}${U.emo('a2', 1230, 276, 70, 44, '⇄')}
    ${U.pill('sd1', 80, 486, '💻 ' + L('على جهاز المستخدم (المتصفح)', 'on the user’s device (browser)'), 't-slate')}
    ${U.pill('sd2', 860, 486, '☁️ ' + L('على الخادم — المستخدم مش شايفها', 'on the server — hidden from the user'), 't-slate')}
    ${U.pill('e1', 80, 568, '🔍 ' + L('شاشة البحث', 'search screen') + ' · 🛍️ ' + L('صفحات المنتجات', 'product pages'), 't-blue')}
    ${U.pill('e2', 80, 648, '📝 ' + L('نماذج الإدخال', 'input forms'), 't-blue')}
    ${U.pill('e3', 690, 568, '🔎 ' + L('البحث عن المنتجات المطابقة', 'finding matching products'), 't-violet')}
    ${U.pill('e4', 690, 648, '🔑 ' + L('مصادقة تسجيل الدخول', 'login authentication'), 't-violet')}
    ${U.pill('e5', 1300, 568, '📦 ' + L('المنتجات', 'products') + ' · 👤 ' + L('المستخدمين', 'users'), 't-green')}
    ${U.pill('e6', 1300, 648, '🧾 ' + L('سجل الطلبات', 'order history'), 't-green')}

    ${U.ch('ch-u2', 40, 250, 'sm')}
    ${U.box('nfe', 290, 200, 400, 't-blue', { ic: '🖥️', h: L('الأمامية', 'Frontend') })}
    ${U.box('nbe', 790, 200, 400, 't-violet', { ic: '⚙️', h: L('الخلفية', 'Backend') })}
    ${U.box('ndb', 1290, 200, 400, 't-green', { ic: '🗄️', h: L('قاعدة البيانات', 'Database') })}
    ${U.pill('q0', 30, 520, '🔍 ' + L('«سماعات»', '"headphones"'), 'solid')}
    ${U.pill('k2', 820, 420, '🔎 ' + L('دوّر: سماعات', 'find: headphones'), 'solid')}
    ${U.pill('k3', 1320, 490, '📦 ' + L('3 منتجات', '3 products'), 't-green')}
    ${U.pill('k4', 820, 490, '📋 ' + L('نتايج مترتبة', 'organized results'), 't-violet')}
    ${U.box('res', 290, 420, 400, 't-green', { h: '✅ ' + L('3 نتايج', '3 results'), p: '🎧 🎧 🎧' })}
    ${U.pill('s1', 120, 610, '① ' + L('الأمامية بتستقبل كلمات البحث', 'the frontend receives the keywords'), 't-slate')}
    ${U.pill('s2', 120, 690, '② ' + L('الأمامية بتبعتها للخلفية', 'the frontend sends them to the backend'), 't-slate')}
    ${U.pill('s3', 120, 610, '③ ' + L('الخلفية بتدوّر في قاعدة البيانات', 'the backend searches the database'), 't-slate')}
    ${U.pill('s4', 120, 690, '④ ' + L('قاعدة البيانات بترجّع المنتجات المطابقة', 'the database returns the matching products'), 't-slate')}
    ${U.pill('s5', 120, 610, '⑤ ' + L('الخلفية بترتّب النتايج وترجّعها', 'the backend organizes and returns the results'), 't-slate')}
    ${U.pill('s6', 120, 690, '⑥ ' + L('الأمامية بتعرض النتايج على الشاشة', 'the frontend shows the results'), 't-slate')}

    ${U.pill('c1', 430, 160, '🖥️ ' + L('الأمامية', 'Frontend'), 't-blue')}
    ${U.pill('c2', 910, 160, '⚙️ ' + L('الخلفية', 'Backend'), 't-violet')}
    ${U.pill('c3', 1390, 160, '🗄️ ' + L('قاعدة البيانات', 'Database'), 't-green')}
    ${[['🎬 ' + L('موقع فيديو', 'Video site'), L('شاشات التشغيل والبحث', 'playback and search screens'), L('المقترحات · عدّ المشاهدات', 'suggestions · view counts'), L('الفيديوهات · سجل المشاهدة', 'videos · viewing history')],
      ['💬 ' + L('تواصل اجتماعي', 'SNS'), L('التايملاين وشاشة النشر', 'timeline and post screen'), L('جمهور المنشور · الإشعارات', 'post audience · notifications'), L('المنشورات · المتابعات', 'posts · follows')],
      ['🛒 ' + L('متجر إلكتروني', 'Online shop'), L('المنتجات وشاشة السلة', 'products and cart screen'), L('فحص المخزون · الدفع', 'stock check · payment'), L('المنتجات · الطلبات · العملاء', 'products · orders · customers')]]
      .map(([lab, a, b, c], r) => U.pill('rl' + r, 40, 262 + r * 160, lab, 't-amber')
        + U.box('cf' + r, 420, 240 + r * 160, 450, 't-blue', { p: a }) + U.box('cb' + r, 900, 240 + r * 160, 450, 't-violet', { p: b }) + U.box('cd' + r, 1380, 240 + r * 160, 450, 't-green', { p: c })).join('')}

    ${U.art('br2', 50, 170, 560, 380, '0 0 560 380', BR2)}
    ${U.box('dfe', 680, 180, 360, 't-green', { ic: '🖥️', h: L('الأمامية', 'Frontend'), p: '✅ ' + L('شغّالة — الصفحة ظهرت', 'working — page shown') })}
    ${U.box('dbe', 1080, 180, 360, 't-amber', { ic: '⚙️', h: L('الخلفية', 'Backend'), p: '❓ ' + L('غالبًا هنا', 'probably here') })}
    ${U.box('ddb', 1480, 180, 360, 't-amber', { ic: '🗄️', h: L('قاعدة البيانات', 'Database'), p: '❓ ' + L('أو هنا', 'or here') })}
    ${U.pill('tr1', 680, 500, '❌ ' + L('«الخلفية بتشتغل على المتصفح» ← غلط: على الخادم', '"The backend runs on the browser" → false: on the server'), 't-red')}
    ${U.pill('tr2', 680, 590, '❌ ' + L('«التطبيق يشتغل بالأمامية لوحدها» ← غلط: 3 طبقات', '"The app works with the frontend alone" → false: three tiers'), 't-red')}

    ${U.hd(0, '🌐 ' + L('يعني إيه تطبيق ويب؟', 'What is a web application?'))}
    ${U.hd(1, '🧱 ' + L('التلات طبقات', 'The three tiers'))}
    ${U.hd(2, '📋 ' + L('أمثلة لكل طبقة', 'Examples of each tier'))}
    ${U.hd(3, '①② ' + L('الأمامية بتستقبل وبتبعت', 'The frontend receives and sends'))}
    ${U.hd(4, '③④ ' + L('الخلفية وقاعدة البيانات', 'Backend and database'))}
    ${U.hd(5, '⑤⑥ ' + L('الاستجابة بترجع', 'The reply comes back'))}
    ${U.hd(6, '🧩 ' + L('نفس البنية في كل خدمة', 'The same structure in every service'))}
    ${U.hd(7, '🔧 ' + L('شخّص العطل + فخاخ الامتحان', 'Diagnose the fault + exam traps'))}
    ${U.nt(2, L('الأمامية تعرض وتجمع · الخلفية تقرّر وتعالج · قاعدة البيانات تخزّن وتسترجع', 'Frontend shows & collects · backend decides & processes · database stores & retrieves'), 'ok')}
    ${U.nt(5, '⬇️ ' + L('الطلب بينزل في الطبقات… و⬆️ الاستجابة بترجع', 'The request flows down the tiers… ⬆️ and the reply returns'), 'ok')}
    ${U.nt(6, L('نفس التلات طبقات — اللي بيتغيّر محتوى كل طبقة', 'The same three tiers — only the content of each tier changes'), 'ok')}
  </div>
  <div id="w1-recap" class="mv-recap">
    ${U.hd(8, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.box('r0', 120, 220, 520, 't-blue', { ic: '🖥️', h: L('الأمامية', 'Frontend'), p: L('تعرض وتجمع', 'shows and collects') })}
    ${U.box('r1', 700, 220, 520, 't-violet', { ic: '⚙️', h: L('الخلفية', 'Backend'), p: L('تقرّر وتعالج', 'decides and processes') })}
    ${U.box('r2', 1280, 220, 520, 't-green', { ic: '🗄️', h: L('قاعدة البيانات', 'Database'), p: L('تخزّن وتسترجع', 'stores and retrieves') })}
    ${U.pill('eq', 520, 560, '= ' + L('تلات طبقات متعاونة = تطبيق ويب شغّال', 'three cooperating tiers = a working web app') + ' 🌐', 't-green')}
  </div>`;
      },
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const tile = (k) => M.board.querySelector('#w1-br .t' + k);
    const glow = (el, t, color) => PULSE(el, t, color || 'rgba(56,189,248,.9)', 2);

    /* 0 — what a web app is */
    let c = at(0);
    frame(0, c);
    IN(q('ch-u'), c + 0.3, 0.6, { x: -80 * sx });
    IN(q('br'), c + 0.9, 0.6, { y: 40 });
    range(4).forEach((k) => { tl.fromTo(tile(k), { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 1.6 + k * 0.35); SND('pop', c + 1.6 + k * 0.35); });
    IN(q('def'), c + 3.2, 0.6, { x: 40 * sx }); SND('ok', c + 3.2);
    IN(q('ex'), c + 4.4, 0.4, { y: 20 });

    /* 1 — the three tiers */
    c = at(1);
    frame(1, c);
    OUT(Q('ch-u br def ex'), c, 0.4);
    IN(q('fe'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('a1'), c + 1.3, 0.3);
    IN(q('be'), c + 1.7, 0.5, { y: 30 }); SND('pop', c + 1.7);
    IN(q('a2'), c + 2.4, 0.3);
    IN(q('db'), c + 2.8, 0.5, { y: 30 }); SND('pop', c + 2.8);
    IN(q('sd1'), c + 3.8, 0.4, { y: 20 }); IN(q('sd2'), c + 4.3, 0.4, { y: 20 });

    /* 2 — examples of each tier */
    c = at(2);
    frame(2, c, 5.2);
    Q('e1 e2 e3 e4 e5 e6').forEach((e, i) => { IN(e, c + 0.6 + i * 0.6, 0.4, { y: 20 }); SND('pop', c + 0.6 + i * 0.6); });
    glow(q('fe'), c + 0.6); glow(q('be'), c + 1.8, 'rgba(167,139,250,.9)'); glow(q('db'), c + 3.0, 'rgba(52,211,153,.9)');

    /* 3 — ① ② the frontend receives and sends */
    c = at(3);
    frame(3, c);
    OUT(Q('fe be db a1 a2 sd1 sd2 e1 e2 e3 e4 e5 e6'), c, 0.4);
    IN(q('ch-u2'), c + 0.5, 0.5, { x: -60 * sx });
    Q('nfe nbe ndb').forEach((n, i) => IN(n, c + 0.7 + i * 0.25, 0.5, { y: 30 }));
    POP(q('q0'), c + 1.8, 0.4); SND('pop', c + 1.8);
    tl.to(q('q0'), { x: 300 * sx, y: -90, duration: 0.8, ease: 'power2.inOut' }, c + 2.4);
    glow(q('nfe'), c + 3.1); IN(q('s1'), c + 3.1, 0.4, { y: 20 });
    tl.to(q('q0'), { x: 790 * sx, duration: 1.0, ease: 'power1.inOut' }, c + 4.6); SND('whoosh', c + 4.6);
    glow(q('nbe'), c + 5.6, 'rgba(167,139,250,.9)'); IN(q('s2'), c + 5.6, 0.4, { y: 20 });

    /* 4 — ③ ④ the backend asks the database; the database returns */
    c = at(4);
    frame(4, c);
    OUT(Q('s1 s2 q0'), c, 0.3);
    POP(q('k2'), c + 0.5, 0.4);
    tl.to(q('k2'), { x: 500 * sx, duration: 1.0, ease: 'power1.inOut' }, c + 1.0); SND('whoosh', c + 1.0);
    glow(q('ndb'), c + 2.0, 'rgba(52,211,153,.9)'); IN(q('s3'), c + 1.0, 0.4, { y: 20 });
    OUT(q('k2'), c + 2.6, 0.3);
    POP(q('k3'), c + 3.0, 0.4); SND('pop', c + 3.0);
    tl.to(q('k3'), { x: -500 * sx, duration: 1.0, ease: 'power1.inOut' }, c + 3.6);
    glow(q('nbe'), c + 4.6, 'rgba(167,139,250,.9)'); IN(q('s4'), c + 3.6, 0.4, { y: 20 });

    /* 5 — ⑤ ⑥ the reply comes back and is shown */
    c = at(5);
    frame(5, c, 5.4);
    OUT(Q('s3 s4 k3'), c, 0.3);
    POP(q('k4'), c + 0.5, 0.4);
    tl.to(q('k4'), { x: -500 * sx, duration: 1.0, ease: 'power1.inOut' }, c + 1.0); SND('whoosh', c + 1.0);
    IN(q('s5'), c + 1.0, 0.4, { y: 20 });
    OUT(q('k4'), c + 2.2, 0.3);
    glow(q('nfe'), c + 2.3);
    POP(q('res'), c + 2.8, 0.5); SND('ok', c + 2.8);
    IN(q('s6'), c + 3.2, 0.4, { y: 20 });

    /* 6 — the same tiers in every service */
    c = at(6);
    frame(6, c, 6.4);
    OUT(Q('ch-u2 nfe nbe ndb res s5 s6'), c, 0.4);
    Q('c1 c2 c3').forEach((h, i) => IN(h, c + 0.5 + i * 0.2, 0.4, { y: -20 }));
    range(3).forEach((r) => {
      const t0 = c + 1.4 + r * 1.5;
      IN(q('rl' + r), t0, 0.4, { x: 30 * sx }); SND('pop', t0);
      Q(`cf${r} cb${r} cd${r}`).forEach((e, i) => IN(e, t0 + 0.3 + i * 0.25, 0.4, { y: 20 }));
    });

    /* 7 — diagnose a fault + exam traps */
    c = at(7);
    frame(7, c);
    OUT(Q('c1 c2 c3 rl0 rl1 rl2 cf0 cb0 cd0 cf1 cb1 cd1 cf2 cb2 cd2'), c, 0.4);
    IN(q('br2'), c + 0.6, 0.5, { y: 30 });
    POP(q('dfe'), c + 1.8, 0.45); SND('ok', c + 1.8);
    POP(q('dbe'), c + 2.6, 0.45); POP(q('ddb'), c + 3.0, 0.45); SND('bad', c + 2.6);
    IN(q('tr1'), c + 4.0, 0.4, { x: 30 * sx }); SND('bad', c + 4.0);
    IN(q('tr2'), c + 5.0, 0.4, { x: 30 * sx }); SND('bad', c + 5.0);

    /* 8 — recap */
    c = at(8);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd8'), c + 0.6, 0.5, { y: -30 });
    Q('r0 r1 r2').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('eq'), c + 3.2, 0.6); SND('ok', c + 3.2);
    return M.done();
  });
})();

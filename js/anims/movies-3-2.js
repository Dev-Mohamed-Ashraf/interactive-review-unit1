/* =========================================================
 * anims/movies-3-2.js — lesson 3-2 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   webCommMovie : client/server · request → response · HTTP readable ·
 *                  HTTPS encrypted · GET · POST · status codes · API + JSON
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
  const RACKIN = MK.RACK('').replace(/^\s*<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

  K.defineAnim('webCommMovie', (stage, props, api) => {
    const U = MK.uiL('w2-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l32', prefix: 'w2-', beats: 9, cast: { 'ch-s': 'server', 'ch-h': 'hacker' },
      html: (L) => `
  <div id="w2-stage" class="mv-stage">
    ${U.art('rack', 1700, 170, 165, 430, '0 0 165 430', RACKIN)}
    ${U.ch('ch-s', 1470, 300, 'sm')}
    ${U.pill('sv', 1450, 548, '🖧 ' + L('خادم واحد', 'one server'), 't-green')}
    ${U.pill('cl1', 80, 200, '🌐 ' + L('متصفح', 'Browser'), 't-blue')}
    ${U.pill('cl2', 80, 330, '📱 ' + L('تطبيق موبايل', 'Mobile app'), 't-blue')}
    ${U.pill('cl3', 80, 460, '💻 ' + L('عميل تاني', 'Another client'), 't-blue')}
    ${range(3).map((k) => U.emo('q' + k, 420, 196 + k * 130, 84, 40, '✉️') + U.emo('r' + k, 1340, 236 + k * 130, 84, 40, '📄')).join('')}
    ${U.box('dc', 80, 610, 640, 't-blue', { h: '🙋 ' + L('العميل', 'Client'), p: L('بيطلب بيانات أو معالجة من الخادم', 'requests data or processing from the server') })}
    ${U.box('ds', 1180, 610, 640, 't-green', { h: '🖧 ' + L('الخادم', 'Server'), p: L('بيستقبل الطلب ويعالجه ويرجّع استجابة', 'receives, processes and returns a response') })}

    ${U.pill('req', 330, 290, '📨 ' + L('طلب: «عايز الصفحة الرئيسية»', 'Request: "the home page, please"'), 'solid')}
    ${U.pill('res', 1050, 400, '📄 ' + L('استجابة: الصفحة', 'Response: the page'), 't-green')}
    ${U.pill('one', 520, 530, L('طلب واحد ← استجابة واحدة مطابقة', 'one request → one matching response'), 't-slate')}

    ${U.pill('pw', 330, 300, '<span class="code">user=ali&amp;pass=1234</span>', 'solid')}
    ${U.ch('ch-h', 840, 450, 'sm')}
    ${U.pill('see', 1040, 500, '👀 ' + L('«1234»… قريتها!', '"1234"… I read it!'), 't-red')}
    ${U.pill('url', 620, 180, '🔒 <span class="code">https://bank.com</span>', 't-green')}
    ${U.pill('pw2', 330, 300, '🔐 <span class="code">✱✱✱✱✱✱✱✱✱✱</span>', 't-green')}
    ${U.pill('cant', 1040, 500, '🤯 ' + L('رموز ملهاش معنى!', 'meaningless symbols!'), 't-red')}
    ${U.box('dhs', 80, 470, 640, 't-green', { h: 'HTTPS = HTTP + ' + L('تشفير TLS', 'TLS encryption'), p: L('خطر القراءة من طرف تالت بيقلّ', 'less risk of third parties reading') })}

    ${U.art('bw', 80, 170, 560, 360, '0 0 560 360', BROWSER(560, 360, `<rect x="40" y="96" width="480" height="54" rx="27" fill="#1e293b"/><text x="280" y="132" text-anchor="middle" font-size="28" fill="#cbd5e1">🔍 ${L('كتب برمجة', 'coding books')}</text>
      ${range(3).map((k) => `<rect class="hit" x="40" y="${172 + k * 58}" width="480" height="44" rx="12" fill="#1e293b" opacity="0"/><text class="hit" x="280" y="${202 + k * 58}" text-anchor="middle" font-size="26" fill="#a7f3d0" opacity="0">📘 ${L('نتيجة', 'result')} ${k + 1}</text>`).join('')}`))}
    ${U.pill('g1', 680, 250, '<span class="code">GET /search?q=books</span>', 'solid')}
    ${U.pill('g2', 1000, 350, '200 ✅ + 📄 ' + L('النتايج', 'results'), 't-green')}
    ${U.box('dget', 700, 480, 620, 't-blue', { h: 'GET = ' + L('استرجاع', 'retrieve'), p: L('عرض صفحة ويب · نتايج البحث', 'showing a page · search results') })}
    ${U.box('form', 80, 190, 560, 't-slate', { ic: '📝', h: L('نموذج الدخول', 'Login form'), p: L('الاسم: ali · كلمة السر: ••••', 'name: ali · password: ••••') })}
    ${U.pill('p1', 680, 250, '<span class="code">POST /login</span> 📦', 'solid')}
    ${U.pill('p2', 1000, 350, '200 ✅ ' + L('أهلًا يا علي', 'Welcome, Ali'), 't-green')}
    ${U.box('dpost', 700, 480, 620, 't-amber', { h: 'POST = ' + L('إرسال', 'send'), p: L('بيانات الدخول · محتويات نموذج', 'login details · form contents') })}

    ${U.box('s200', 120, 210, 520, 't-green', { ic: '✅', h: '200', p: L('نجاح — الطلب اتعالج', 'success — request processed'), s: L('كل حاجة تمام', 'all good') })}
    ${U.box('s404', 700, 210, 520, 't-amber', { ic: '❓', h: '404', p: L('الصفحة مش موجودة', 'page not found'), s: L('العنوان غلط — من جهة العميل', 'wrong URL — the client’s side') })}
    ${U.box('s500', 1280, 210, 520, 't-red', { ic: '💥', h: '500', p: L('خطأ في الخادم', 'server error'), s: L('المشكلة عند الخادم', 'the problem is on the server') })}

    ${U.box('app', 120, 210, 500, 't-blue', { ic: '📱', h: L('تطبيق الطقس', 'Weather app'), p: L('برنامج (الأمامية)', 'one program (frontend)') })}
    ${U.box('svc', 1300, 210, 500, 't-violet', { ic: '⚙️', h: L('خدمة الطقس', 'Weather service'), p: L('برنامج تاني (الخلفية)', 'another program (backend)') })}
    ${U.pill('apil', 790, 250, '🔌 API', 't-amber')}
    ${U.emo('at', 640, 330, 84, 40, '✉️')}
    ${U.box('json', 620, 460, 680, 't-slate', { y: 'JSON', p: '<span class="code">{ "city": "Cairo", "temp": 31 }</span>' })}

    ${U.hd(0, '🙋 ' + L('العميل والخادم', 'Client and server'))}
    ${U.hd(1, '📨 ' + L('طلب ← استجابة', 'Request → response'))}
    ${U.hd(2, 'HTTP ' + L('— المحتوى بيمشي مقروء', '— the content travels readable'))}
    ${U.hd(3, '🔒 HTTPS ' + L('— المحتوى مشفّر', '— the content is encrypted'))}
    ${U.hd(4, 'GET ' + L('— استرجاع', '— retrieve'))}
    ${U.hd(5, 'POST ' + L('— إرسال', '— send'))}
    ${U.hd(6, L('رموز الحالة', 'Status codes'))}
    ${U.hd(7, '🔌 API ' + L('و', 'and') + ' JSON')}
    ${U.nt(0, L('عملاء كتير بيطلبوا… وخادم واحد بيستجيب', 'Many clients request… one server responds'), 'ok')}
    ${U.nt(1, '📜 ' + L('البروتوكول = قواعد مشتركة بتحكم التبادل ده', 'A protocol = shared rules for this exchange'), 'ok')}
    ${U.nt(2, L('HTTP = بروتوكول تبادل البيانات بين العملاء والخوادم', 'HTTP = the protocol for exchanging data between clients and servers'), 'warn')}
    ${U.nt(3, '🔑 ' + L('صفحة تسجيل الدخول لازم تكون HTTPS', 'A login page must use HTTPS'), 'ok')}
    ${U.nt(5, '⚠️ ' + L('«GET لإرسال البيانات» ← غلط: GET بيسترجع · POST بيبعت', '"GET sends data" → false: GET retrieves · POST sends'), 'warn')}
    ${U.nt(6, '⚠️ ' + L('«500 = نجاح» ← غلط: النجاح 200', '"500 = success" → false: success is 200'), 'warn')}
    ${U.nt(7, L('JSON سهل القراءة للبشر + سهل المعالجة للحاسب', 'JSON is easy for humans to read + easy for computers to process'), 'ok')}
  </div>
  <div id="w2-recap" class="mv-recap">
    ${U.hd(8, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 140, 200, '🙋 ' + L('العميل يطلب', 'The client asks') + ' ← 🖧 ' + L('الخادم يستجيب', 'the server responds'), 't-blue')}
    ${U.pill('x1', 140, 300, 'HTTP · HTTPS 🔒 = HTTP + ' + L('تشفير SSL/TLS', 'SSL/TLS encryption'), 't-green')}
    ${U.pill('x2', 140, 400, 'GET 🔎 ' + L('استرجاع', 'retrieve') + ' · POST 📦 ' + L('إرسال', 'send'), 't-amber')}
    ${U.pill('x3', 140, 500, '200 ✅ · 404 ❓ · 500 💥', 't-violet')}
    ${U.pill('x4', 140, 600, '🔌 API ' + L('بيبادل البيانات', 'exchanges data') + ' — ' + L('غالبًا', 'often') + ' JSON', 't-slate')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const hits = () => M.board.querySelectorAll('#w2-bw .hit');
    const fly = (el, t, dx, d) => tl.to(el, { x: dx * sx, duration: d || 1.0, ease: 'power1.inOut' }, t);

    /* 0 — many clients, one server */
    let c = at(0);
    frame(0, c, 6.0);
    IN(q('rack'), c + 0.3, 0.5, { x: 60 * sx }); IN(q('ch-s'), c + 0.5, 0.5, { x: 60 * sx }); IN(q('sv'), c + 0.8, 0.4);
    Q('cl1 cl2 cl3').forEach((e, i) => IN(e, c + 0.6 + i * 0.3, 0.4, { x: -40 * sx }));
    range(3).forEach((k) => {
      IN(q('q' + k), c + 1.8 + k * 0.3, 0.2); fly(q('q' + k), c + 1.8 + k * 0.3, 920, 1.0);
      tl.to(q('q' + k), { opacity: 0, duration: 0.2 }, c + 2.8 + k * 0.3);
      IN(q('r' + k), c + 3.3 + k * 0.3, 0.2); fly(q('r' + k), c + 3.3 + k * 0.3, -920, 1.0);
      tl.to(q('r' + k), { opacity: 0, duration: 0.2 }, c + 4.3 + k * 0.3);
    });
    SND('whoosh', c + 1.8); SND('pop', c + 3.3);
    IN(q('dc'), c + 4.0, 0.5, { y: 20 }); IN(q('ds'), c + 4.6, 0.5, { y: 20 });

    /* 1 — one request, one response */
    c = at(1);
    frame(1, c, 5.6);
    OUT(Q('cl2 cl3 dc ds'), c, 0.3);
    POP(q('req'), c + 0.6, 0.4);
    fly(q('req'), c + 1.2, 500, 1.2); SND('whoosh', c + 1.2);
    PULSE(q('sv'), c + 2.5, 'rgba(52,211,153,.9)', 2);
    OUT(q('req'), c + 2.6, 0.3);
    POP(q('res'), c + 3.0, 0.4);
    fly(q('res'), c + 3.4, -720, 1.2); SND('ok', c + 4.6);
    IN(q('one'), c + 4.8, 0.4, { y: 20 });

    /* 2 — HTTP: readable on the way */
    c = at(2);
    frame(2, c, 5.0);
    OUT(Q('res one'), c, 0.3);
    IN(q('ch-h'), c + 0.5, 0.5, { y: 40 });
    POP(q('pw'), c + 1.2, 0.4);
    fly(q('pw'), c + 1.8, 380, 1.0);
    POP(q('see'), c + 2.9, 0.4); SND('bad', c + 2.9);
    fly(q('pw'), c + 3.6, 740, 0.8);

    /* 3 — HTTPS: encrypted */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('pw see'), c, 0.3);
    POP(q('url'), c + 0.5, 0.45); SND('ok', c + 0.5);
    POP(q('pw2'), c + 1.3, 0.4);
    fly(q('pw2'), c + 1.9, 380, 1.0);
    POP(q('cant'), c + 3.0, 0.4); SND('bad', c + 3.0);
    M.mood('ch-h', true, c + 3.0);
    fly(q('pw2'), c + 3.7, 740, 0.8);
    IN(q('dhs'), c + 4.4, 0.5, { y: 20 });

    /* 4 — GET */
    c = at(4);
    frame(4, c);
    OUT(Q('pw2 cant url dhs ch-h cl1'), c, 0.3);
    IN(q('bw'), c + 0.5, 0.5, { y: 30 });
    POP(q('g1'), c + 1.4, 0.4);
    fly(q('g1'), c + 1.9, 520, 1.0); SND('whoosh', c + 1.9);
    OUT(q('g1'), c + 3.0, 0.3);
    POP(q('g2'), c + 3.2, 0.4);
    fly(q('g2'), c + 3.6, -280, 0.8);
    tl.to(hits(), { opacity: 1, duration: 0.3, stagger: 0.2 }, c + 4.3); SND('ok', c + 4.3);
    IN(q('dget'), c + 5.0, 0.5, { y: 20 });

    /* 5 — POST */
    c = at(5);
    frame(5, c, 5.4);
    OUT(Q('bw g2 dget'), c, 0.3);
    IN(q('form'), c + 0.5, 0.5, { y: 30 });
    POP(q('p1'), c + 1.4, 0.4);
    fly(q('p1'), c + 1.9, 520, 1.0); SND('whoosh', c + 1.9);
    OUT(q('p1'), c + 3.0, 0.3);
    POP(q('p2'), c + 3.2, 0.4); SND('ok', c + 3.2);
    fly(q('p2'), c + 3.6, -280, 0.8);
    IN(q('dpost'), c + 4.4, 0.5, { y: 20 });

    /* 6 — status codes */
    c = at(6);
    frame(6, c, 5.6);
    OUT(Q('form p2 dpost rack ch-s sv'), c, 0.3);
    POP(q('s200'), c + 0.7, 0.5); SND('ok', c + 0.7);
    POP(q('s404'), c + 2.0, 0.5); SND('pop', c + 2.0);
    POP(q('s500'), c + 3.3, 0.5); SND('bad', c + 3.3);

    /* 7 — API + JSON */
    c = at(7);
    frame(7, c, 5.4);
    OUT(Q('s200 s404 s500'), c, 0.3);
    IN(q('app'), c + 0.5, 0.5, { x: -40 * sx }); IN(q('svc'), c + 0.8, 0.5, { x: 40 * sx });
    POP(q('apil'), c + 1.5, 0.45); SND('pop', c + 1.5);
    IN(q('at'), c + 2.0, 0.2); fly(q('at'), c + 2.0, 600, 0.9);
    OUT(q('at'), c + 2.9, 0.2);
    IN(q('json'), c + 3.4, 0.6, { y: 30 }); SND('ok', c + 3.4);
    PULSE(q('json'), c + 4.0, 'rgba(251,191,36,.85)', 2);

    /* 8 — recap */
    c = at(8);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd8'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3 x4').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

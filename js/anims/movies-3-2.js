/* =========================================================
 * anims/movies-3-2.js — lesson 3-2 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   webCommMovie (stations client 0–3 · messages 4–8): many clients, one server ·
 *     request → response · HTTP travels readable · HTTPS travels locked ·
 *     GET brings data back · POST sends data · status codes 200/404/500 ·
 *     API + JSON · recap
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
  const WIRE = (W) => `<path d="M0 20 H${W}" stroke="#475569" stroke-width="8" stroke-dasharray="20 14" stroke-linecap="round"/>`;

  K.defineAnim('webCommMovie', (stage, props, api) => {
    const P = 'w2-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l12 mv-l32', prefix: P, beats: 9, cast: { sv: 'server', hk: 'hacker' },
      html: (L) => {
        const env = (id, txt, c, y) => B.chip(id, 520, y || 368, txt, c + ' l12-env');
        return `
  <div id="w2-base" class="mv-stage">
    <div id="w2-cl" class="l12u l12-win later" style="${B.at(70, 220, 420, 320)}"><div class="wbar"><i></i><i></i><i></i><span class="url" id="w2-url">🌐 shop.com</span></div>
      <div class="wbody l12-lay">
        <div class="ly l0">💻 ${L('العميل', 'The client')}<div class="l12-field">🛒 ${L('صفحة المنتجات', 'products page')}</div></div>
        <div class="ly l1"><div class="l12-field">👤 ${L('اسم المستخدم', 'username')} <b>ahmed</b></div><div class="l12-field">🔑 ${L('كلمة السر', 'password')} <b>••••</b></div></div>
        <div class="ly l2">☀️ ${L('الطقس', 'Weather')}<div class="l12-big2">${L('القاهرة', 'Cairo')} <bdi>31°</bdi></div></div></div></div>
    ${B.svg('wire', 500, 360, 920, 40, '0 0 920 40', WIRE(920))}
    ${B.svg('rk', 1440, 200, 240, 330, '0 0 240 330', RACK)}
    ${B.ch('sv', 1690, 300, 'sm')}
    ${B.chip('slb', 1420, 128, '🖥️ ' + L('الخادم', 'The server'), 'c-green', 290)}
  </div>

  <div id="w2-s0" class="mv-stage">
    ${['💻', '📱', '📲'].map((e, k) => B.card('d' + k, 70, 150 + k * 170, 300, 150, 'c-blue', { ic: e, h: [L('متصفح', 'browser'), L('تطبيق موبايل', 'mobile app'), L('تطبيق تابلت', 'tablet app')][k] })).join('')}
    ${range(3).map((k) => B.big('rq' + k, 400, 200 + k * 170, 70, 46, '📨')).join('')}
    ${B.svg('rk0', 1440, 200, 240, 330, '0 0 240 330', RACK)}
    ${B.card('cd', 520, 590, 640, 0, 'c-blue', { row: true, ic: '💻', h: L('العميل', 'Client'), p: L('بيطلب بيانات أو معالجة — زي المتصفحات وتطبيقات الموبايل', 'asks for data or processing — browsers, mobile apps') })}
    ${B.card('sd', 1200, 590, 660, 0, 'c-green', { row: true, ic: '🖥️', h: L('الخادم', 'Server'), p: L('بيستقبل الطلبات ويعالجها ويرجّع الاستجابات', 'receives requests, processes them and responds') })}
  </div>

  <div id="w2-s1" class="mv-stage">
    ${env('rq', '📨 ' + L('طلب: صفحة المنتجات', 'request: products page'), 'c-amber')}
    ${env('rs', '📬 ' + L('استجابة: الصفحة', 'response: the page'), 'c-green')}
    ${B.mid('one', 140, '1️⃣ ' + L('طلب واحد ← استجابة واحدة مطابقة', 'one request → one matching response'), 'c-amber big')}
    ${B.mid('pro', 230, '📜 ' + L('والتبادل ده بتحكمه قواعد مشتركة اسمها «بروتوكولات»', 'the exchange follows shared rules called “protocols”'), 'c-slate')}
  </div>

  <div id="w2-s2" class="mv-stage">
    ${B.ch('hk', 860, 140, 'sm')}
    ${env('h1', '📨 ' + L('كلمة السر:', 'password:') + ' <bdi class="code">1234</bdi>', 'c-red')}
    ${B.chip('rd', 1060, 160, '👀 «' + L('كلمة السر', 'password') + ' <bdi>1234</bdi>»', 'c-red big')}
    ${B.card('hd', 520, 600, 1340, 0, 'c-red', { row: true, ic: '📖', h: 'HTTP — HyperText Transfer Protocol', p: L('بروتوكول لتبادل البيانات بين العملاء والخوادم — بس المحتوى بيمشي مقروء', 'a protocol between clients and servers — but content travels readable') })}
  </div>

  <div id="w2-s3" class="mv-stage">
    ${env('h2', '🔒 <bdi class="code">x7#q@!</bdi>', 'c-green')}
    ${B.chip('cf', 1060, 160, '😵 ' + L('«مش فاهم حاجة!»', '“I can’t read it!”'), 'c-slate big')}
    ${B.card('hs', 520, 600, 1340, 0, 'c-green', { row: true, ic: '🔒', h: 'HTTPS = HTTP + ' + L('تشفير', 'encryption') + ' TLS (SSL/TLS)', p: L('المحتوى مشفّر فخطر قراءته بيقلّ — والعنوان بيبدأ بـ https:// — وصفحة الدخول لازم HTTPS', 'encrypted, so reading risk drops — the address starts with https:// — login pages must be HTTPS') })}
  </div>

  <div id="w2-s4" class="mv-stage">
    ${env('g1', '📨 <bdi class="code">GET /products</bdi>', 'c-blue')}
    ${env('g2', '📦 ' + L('بيانات الصفحة', 'page data'), 'c-green')}
    ${B.mid('gd', 140, '⬇️ <bdi>GET</bdi> = ' + L('استرجاع بيانات من الخادم', 'retrieve data from the server'), 'c-blue big')}
    ${B.chip('gx', 520, 600, '🧪 ' + L('أمثلة: عرض صفحة ويب · استرجاع نتايج البحث', 'e.g. showing a web page · getting search results'), 'c-blue')}
  </div>

  <div id="w2-s5" class="mv-stage">
    ${env('p1', '📨 <bdi class="code">POST /login</bdi> + ' + L('بياناتك', 'your data'), 'c-violet')}
    ${env('p2', '✅ ' + L('اتسجّلت', 'logged in'), 'c-green')}
    ${B.mid('pd', 140, '⬆️ <bdi>POST</bdi> = ' + L('إرسال بيانات للخادم عشان يعالجها', 'send data to the server to process'), 'c-violet big')}
    ${B.chip('px', 520, 600, '🧪 ' + L('أمثلة: معلومات تسجيل الدخول · محتويات نموذج', 'e.g. login details · form contents'), 'c-violet')}
    ${B.chip('pt', 520, 690, '⚠️ ' + L('فخ: «GET لإرسال البيانات» ← غلط', 'trap: “GET is for sending data” → false'), 'c-red')}
  </div>

  <div id="w2-s6" class="mv-stage">
    ${[['200', '✅', L('نجاح', 'success'), L('كله تمام', 'all good'), 'c-green'], ['404', '❓', L('الصفحة مش موجودة', 'page not found'), L('العنوان غلط — من جهة العميل', 'wrong address — the client side'), 'c-amber'], ['500', '💥', L('خطأ في الخادم', 'server error'), L('المشكلة عند الخادم', 'the problem is on the server'), 'c-red']]
      .map(([n, ic, h, p, c], k) => B.card('c' + k, 70 + k * 610, 150, 580, 0, c, { html: `<div class="l12-code3"><bdi>${n}</bdi> ${ic}</div>`, h, p })).join('')}
    ${B.mid('cdx', 600, '📨 ' + L('كل استجابة فيها «رمز حالة» بيبلّغ بالنتيجة', 'every response carries a status code reporting the result'), 'c-slate big')}
  </div>

  <div id="w2-s7" class="mv-stage">
    ${env('a1', '🔌 API: ' + L('عايز طقس القاهرة', 'Cairo weather please'), 'c-amber')}
    <div id="w2-js" class="l12u l12-doc l12-json later" style="${B.at(900, 130, 480)}"><div class="code ltr">{<br>&nbsp;&nbsp;"city": "Cairo",<br>&nbsp;&nbsp;"temp": 31,<br>&nbsp;&nbsp;"sky": "sunny"<br>}</div></div>
    ${B.card('ad', 520, 580, 660, 0, 'c-amber', { row: true, ic: '🔌', h: 'API', p: L('نظام لتبادل البيانات بين برامج مختلفة — والأمامية بتطلب من الخلفية عن طريقه', 'a system for exchanging data between programs — the frontend asks the backend through it') })}
    ${B.card('jd', 1220, 580, 640, 0, 'c-blue', { row: true, ic: '📄', h: 'JSON', p: L('سهلة القراءة للبشر وسهلة المعالجة للحاسب', 'easy for humans to read, easy for computers to process') })}
  </div>

  <div id="w2-s8" class="mv-stage">
    <div id="w2-flow" class="l12u l12-flow later" style="${B.at(70, 160, 1790, 300)}">
      <span class="n c-blue">💻 ${L('العميل يطلب', 'client asks')}</span><i>${B.arrow}</i><span class="n c-violet"><bdi>GET / POST</bdi><br><small>${L('عبر HTTP / HTTPS', 'over HTTP / HTTPS')}</small></span><i>${B.arrow}</i><span class="n c-green">🖥️ ${L('الخادم يستجيب', 'server responds')}</span><i>${B.arrow}</i><span class="n c-amber"><bdi>200 · 404 · 500</bdi><br><small>${L('رمز الحالة', 'status code')}</small></span></div>
    ${B.mid('fj', 510, '🔌 ' + L('وغالبًا API بيرجّع البيانات بصيغة JSON', 'and usually an API returns the data as JSON'), 'c-amber big')}
    ${B.mid('ft', 610, '⚠️ ' + L('الـAPI مش بروتوكول ولا تقنية تشفير ولا لضبط مظهر الصفحة', 'an API is not a protocol, not encryption, not page styling'), 'c-red')}
  </div>
    ${U.hd(0, '💻 ' + L('العميل والخادم', 'Client and server'))}
    ${U.hd(1, '📨 ' + L('طلب ← استجابة', 'Request → response'))}
    ${U.hd(2, '📖 ' + L('HTTP: المحتوى بيمشي مقروء', 'HTTP: content travels readable'))}
    ${U.hd(3, '🔒 ' + L('HTTPS: المحتوى بيمشي مشفّر', 'HTTPS: content travels encrypted'))}
    ${U.hd(4, '⬇️ ' + L('طريقة GET', 'The GET method'))}
    ${U.hd(5, '⬆️ ' + L('طريقة POST', 'The POST method'))}
    ${U.hd(6, '🔢 ' + L('رموز الحالة', 'Status codes'))}
    ${U.hd(7, '🔌 ' + L('API و JSON', 'API and JSON'))}
    ${U.hd(8, '📌 ' + L('الخلاصة', 'Recap'))}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const lay = (n, t) => { tl.to(all('#w2-cl .ly'), { opacity: 0, duration: 0.2 }, t); tl.to(all('#w2-cl .ly.l' + n), { opacity: 1, duration: 0.3 }, t + 0.2); };
    /* a message rides the wire: dir +1 = client → server, -1 = server → client */
    const ride = (id, t, dir, stopMid) => {
      const from = dir > 0 ? 0 : 720, to = stopMid ? 360 : (dir > 0 ? 720 : 0);
      tl.fromTo(q(id), { opacity: 0, x: from * sx, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.25 }, t);
      tl.to(q(id), { x: to * sx, duration: stopMid ? 0.8 : 1.4, ease: 'power1.inOut' }, t + 0.25);
      if (!stopMid) tl.to(q(id), { opacity: 0, duration: 0.2 }, t + 1.7);
    };
    const flash = (t) => tl.fromTo(all('#w2-rk .led'), { opacity: 1 }, { opacity: 0.2, duration: 0.12, yoyo: true, repeat: 5, stagger: 0.05 }, t);

    /* 0 — many clients, one server */
    let c = at(0);
    frame(0, c);
    range(3).forEach((k) => { IN(q('d' + k), c + 0.3 + k * 0.4, 0.4, { x: -30 * sx }); });
    IN(q('rk0'), c + 1.0, 0.5, { y: 30 });
    range(3).forEach((k) => {
      tl.fromTo(q('rq' + k), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 2.0 + k * 0.4);
      tl.to(q('rq' + k), { x: 1000 * sx, y: (1 - k) * 170 + 20, duration: 1.0, ease: 'power1.in' }, c + 2.2 + k * 0.4);
      tl.to(q('rq' + k), { opacity: 0, duration: 0.1 }, c + 3.2 + k * 0.4);
    });
    SND('whoosh', c + 2.2);
    IN(q('cd'), c + 4.4, 0.5, { y: 24 }); IN(q('sd'), c + 5.2, 0.5, { y: 24 });

    /* 1 — request → response */
    c = at(1);
    frame(1, c);
    OUT(q('s0'), c, 0.4);
    IN(Q('cl wire rk sv slb'), c + 0.4, 0.5, { y: 20 }); lay(0, c + 0.6);
    ride('rq', c + 1.4, 1); flash(c + 3.0);
    ride('rs', c + 3.6, -1); SND('ok', c + 5.0);
    POP(q('one'), c + 5.4, 0.5); IN(q('pro'), c + 6.4, 0.4, { y: 12 });

    /* 2 — HTTP: readable */
    c = at(2);
    frame(2, c);
    OUT(q('s1'), c, 0.3); lay(1, c + 0.3);
    IN(q('hk'), c + 0.5, 0.5, { y: -30 });
    ride('h1', c + 1.2, 1, true);
    POP(q('rd'), c + 2.4, 0.4); SND('bad', c + 2.4);
    IN(q('hd'), c + 3.6, 0.5, { y: 24 });

    /* 3 — HTTPS: encrypted */
    c = at(3);
    frame(3, c);
    OUT(Q('h1 rd hd'), c, 0.3);
    tl.set(q('url'), { textContent: '🔒 https://bank.com' }, c + 0.3);
    glow(M, q('cl'), c + 0.4, 'rgba(52,211,153,.95)');
    ride('h2', c + 1.0, 1, true);
    POP(q('cf'), c + 2.2, 0.4); M.mood('hk', true, c + 2.2); SND('ok', c + 2.2);
    IN(q('hs'), c + 3.4, 0.5, { y: 24 });

    /* 4 — GET */
    c = at(4);
    frame(4, c);
    OUT(q('s2'), c, 0.3); OUT(q('s3'), c, 0.3);
    tl.set(q('url'), { textContent: '🌐 shop.com' }, c + 0.3); lay(0, c + 0.3);
    POP(q('gd'), c + 0.5, 0.5);
    ride('g1', c + 1.2, 1); flash(c + 2.8);
    ride('g2', c + 3.4, -1); SND('ok', c + 4.8);
    glow(M, q('cl'), c + 5.0, 'rgba(56,189,248,.95)');
    IN(q('gx'), c + 5.6, 0.4, { y: 12 });

    /* 5 — POST */
    c = at(5);
    frame(5, c);
    OUT(q('s4'), c, 0.3); lay(1, c + 0.3);
    POP(q('pd'), c + 0.5, 0.5);
    ride('p1', c + 1.3, 1); flash(c + 2.9);
    ride('p2', c + 3.5, -1); SND('ok', c + 4.9);
    IN(q('px'), c + 5.4, 0.4, { y: 12 }); IN(q('pt'), c + 6.2, 0.4, { y: 12 });

    /* 6 — status codes */
    c = at(6);
    frame(6, c);
    OUT(q('s5'), c, 0.3); OUT(q('base'), c, 0.4);
    range(3).forEach((k) => { IN(q('c' + k), c + 0.6 + k * 1.0, 0.5, { y: 30 }); SND(['ok', 'pop', 'bad'][k], c + 0.6 + k * 1.0); });
    IN(q('cdx'), c + 4.0, 0.4, { y: 12 });

    /* 7 — API + JSON */
    c = at(7);
    frame(7, c);
    OUT(q('s6'), c, 0.3); IN(q('base'), c + 0.3, 0.4); lay(2, c + 0.3);
    tl.set(q('url'), { textContent: '☀️ weather-app' }, c + 0.3);
    ride('a1', c + 1.0, 1); flash(c + 2.6);
    IN(q('js'), c + 3.0, 0.5, { y: 20 }); SND('pop', c + 3.0);
    tl.to(q('js'), { x: -560 * sx, y: 90, scale: 0.4, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 4.4);
    tl.fromTo(all('#w2-cl .l12-big2'), { scale: 0.5 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 5.2); SND('ok', c + 5.2);
    IN(q('ad'), c + 5.6, 0.5, { y: 20 }); IN(q('jd'), c + 6.2, 0.5, { y: 20 });

    /* 8 — recap */
    c = at(8);
    frame(8, c);
    OUT(Q('s7 base'), c, 0.4);
    IN(q('flow'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(all('#w2-flow .n'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.45, ease: 'back.out(2)' }, c + 0.9);
    IN(q('fj'), c + 3.0, 0.4, { y: 12 }); IN(q('ft'), c + 3.8, 0.4, { y: 12 });

    /* living loops */
    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1, repeatDelay: 0.4 }).fromTo(Q('rq0 rq1 rq2'), { opacity: 1, x: 0, y: 0 }, { x: 1000 * sx, y: (k) => (1 - k) * 170 + 20, duration: 1.2, ease: 'power1.in', stagger: 0.3 }).to(Q('rq0 rq1 rq2'), { opacity: 0, duration: 0.1 }));
    const pingPong = (a, b) => () => gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).fromTo(q(a), { opacity: 1, x: 0 }, { x: 720 * sx, duration: 1.2, ease: 'power1.inOut' }).to(q(a), { opacity: 0, duration: 0.1 }).fromTo(q(b), { opacity: 1, x: 720 * sx }, { x: 0, duration: 1.2, ease: 'power1.inOut' }).to(q(b), { opacity: 0, duration: 0.1 });
    M.loop(1, 7.0, pingPong('rq', 'rs'));
    M.loop(2, 4.6, () => M.breathe(q('rd'), 1.06, 0.8));
    M.loop(3, 4.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('h2'), { y: -8, duration: 0.8, ease: 'sine.inOut' }));
    M.loop(4, 6.2, pingPong('g1', 'g2'));
    M.loop(5, 7.0, pingPong('p1', 'p2'));
    M.loop(6, 5.0, () => glowCycle(Q('c0 c1 c2'), 'rgba(255,255,255,.7)', 0.5));
    M.loop(8, 4.4, () => glowCycle(all('#w2-flow .n'), 'rgba(167,139,250,.9)', 0.4));
    return M.done();
  });
})();

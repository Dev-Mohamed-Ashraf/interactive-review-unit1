/* =========================================================
 * anims/movies-5-3.js — lesson 5-3 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   apiMovie : open data (free ≠ no rules) · providers · browser vs API ·
 *              ① request to an endpoint · ② JSON response · ③ use ·
 *              API cautions · terms of use · source citation
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const CODE = (t) => `<span class="code">${t}</span>`;
  /* a little chart the program draws from the fetched values */
  const CHART = `<rect x="4" y="4" width="552" height="352" rx="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    <path d="M40 310 H520" stroke="#64748b" stroke-width="4"/>
    ${range(8).map((k) => { const v = [210, 120, 170, 90, 240, 150, 190, 110][k]; return `<rect class="cb${k ? ' more' : ' first'}" x="${56 + k * 58}" y="${310 - v}" width="40" height="${v}" rx="6" fill="${k ? '#38bdf8' : '#fbbf24'}"/>`; }).join('')}`;

  K.defineAnim('apiMovie', (stage, props, api) => {
    const U = MK.uiL('c3-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l53', prefix: 'c3-', beats: 10, cast: { 'ch-u': 'studentL' },
      html: (L) => `
  <div id="c3-stage" class="mv-stage">
    ${U.emo('gift', 160, 200, 260, 190, '🎁')}
    ${U.pill('free', 120, 470, '🆓 ' + L('بيانات مفتوحة = متاحة للكل', 'Open data = available to everyone'), 't-green')}
    ${U.pill('rule', 120, 570, '⚠️ ' + L('مجانية… بس مش من غير قواعد', 'Free… but not without rules'), 't-amber')}
    ${[['📍', L('منين نجيبها؟', 'Where do we get it?')], ['🔌', L('إزاي نجيبها؟', 'How do we fetch it?')], ['📜', L('مسموح نستخدمها إزاي؟', 'How may we use it?')]]
      .map(([e, t], k) => U.pill('w' + k, 1000, 230 + k * 120, e + ' ' + t, 't-blue')).join('')}

    ${U.box('wb', 70, 180, 570, 't-blue', { ic: '🏦', h: 'World Bank Open Data', p: L('إحصائيات الدول: اقتصاد، سكان، تعليم، صحة', 'country stats: economy, population, education, health'), s: '→ ' + L('مقارنات دولية واتجاهات كل دولة', 'international comparisons, each country’s trends') })}
    ${U.box('un', 675, 180, 570, 't-violet', { ic: '🌐', h: 'UN Data', p: L('إحصائيات دولية من الأمم المتحدة ووكالاتها', 'international stats from the UN and its agencies'), s: '→ ' + L('قضايا عالمية: سكان، تنمية، بيئة', 'global issues: population, development, environment') })}
    ${U.box('kg', 1280, 180, 570, 't-green', { ic: '🏆', h: 'Kaggle', p: L('منصّة مسابقات تحليل بيانات + مجموعات متنوعة', 'data-analysis competitions + datasets in many fields'), s: '→ ' + L('بيانات لدراسة التعلّم الآلي والبحث', 'data for machine-learning study and research') })}
    ${U.pill('pick', 360, 600, '✅ ' + L('اختار مصدر موثوق ومطابق لغرض التحليل', 'Pick a reliable source that matches the purpose'), 't-slate')}

    ${U.ch('ch-u', 90, 260, 'md')}
    ${U.pill('br', 330, 210, '🖱️ ' + L('متصفح: تدوّر وتنزّل ملف ملف', 'Browser: search and download file by file'), 't-slate')}
    ${U.pill('slow', 330, 310, '🐢 ' + L('200 دولة × 20 سنة يدوي؟ مستحيل عمليًا', '200 countries × 20 years by hand? Practically impossible'), 't-red')}
    ${U.box('apib', 1000, 420, 840, 't-blue', { ic: '🔌', h: L('واجهة برمجة التطبيقات (API)', 'Application Programming Interface (API)'), p: L('قواعد لإزاي أجزاء البرامج تتعامل مع بعض', 'rules for how pieces of software interact'), s: L('البرنامج يطلب البيانات مباشرة من غير متصفح', 'a program requests data directly, no browser') })}
    ${U.pill('fast', 330, 420, '⚡ ' + L('API: سطر واحد يجيب آلاف القيم', 'API: one line fetches thousands of values'), 't-green')}

    ${U.box('cli', 90, 250, 400, 't-blue', { ic: '💻', h: L('العميل', 'Client'), p: L('برنامجك', 'your program') })}
    <div id="c3-srvw" class="later" style="position:absolute;inset-inline-start:1530px;top:190px;width:200px;height:430px">${MK.RACK('style="width:100%;height:100%"')}</div>
    ${U.pill('srvl', 1460, 640, '🗄️ ' + L('الخادم: مخزّن البيانات', 'Server: stores the data'), 't-green')}
    ${U.pill('req', 520, 300, '① GET ➜', 'solid')}
    ${U.pill('ep', 300, 150, '📍 ' + L('نقطة النهاية (Endpoint):', 'Endpoint:') + ' ' + CODE('api.worldbank.org/…/EGY/indicator/SP.POP.TOTL'), 't-amber')}
    ${U.pill('epx', 520, 470, L('الرابط بيحدّد «أنهي بيانات» بالظبط', 'The URL says exactly "which data"'), 't-slate')}

    <div id="c3-json" class="box t-green later" style="inset-inline-start:1000px;top:330px;width:470px;font-size:30px;line-height:1.5"><span class="code" style="display:block;text-align:left">{<br>&nbsp;"country": "EGY",<br>&nbsp;"year": 2024,<br>&nbsp;"value": 114500000<br>}</span></div>
    ${U.pill('res', 1000, 250, '② ' + L('الرد بصيغة JSON', 'Response in JSON'), 't-green')}
    ${U.pill('jsn', 300, 610, '🧩 JSON = ' + L('أزواج «اسم: قيمة» — سهلة للبشر وللبرامج', '"name: value" pairs — easy for people and programs'), 't-violet')}
    ${U.pill('err', 300, 695, '⚠️ ' + L('رابط غلط ← رد خطأ', 'Wrong URL → an error response'), 't-red')}

    ${U.art('chart', 1000, 190, 560, 360, '0 0 560 360', CHART)}
    ${U.pill('use', 90, 470, '③ ' + L('البرنامج بيقرا value ويستخدمها', 'The program reads "value" and uses it'), 'solid')}
    ${U.pill('rep', 90, 570, '🔁 ' + L('ويكرّر آليًا لآلاف الدول والسنين', 'and repeats automatically for thousands of countries and years'), 't-green')}

    ${['✔ ' + L('استخدمه حسب شروط المزوّد', 'Use it under the provider’s terms'), '✔ ' + L('ماتبعتش طلبات كتير في وقت قصير', 'No excessive requests in a short time'), '✔ ' + L('اتأكّد من نطاق الاستخدام المسموح', 'Confirm the permitted scope of use')]
      .map((t, k) => U.pill('c' + k, 90, 200 + k * 110, t, 't-green')).join('')}
    ${range(6).map((k) => U.emo('pk' + k, 560 + (k % 3) * 70, 560 + Math.floor(k / 3) * 70, 60, 46, '📨')).join('')}
    ${U.emo('stop', 820, 540, 120, 90, '🚦')}
    ${U.box('lim', 1050, 220, 780, 't-amber', { ic: '🚦', h: L('حد الطلبات', 'Request limit'), p: L('ماتتقّلش على الخادم', 'do not overload the server') })}

    ${[['📗', L('استخدام حر مع ذكر المصدر', 'Free use with attribution'), 't-green'], ['📙', L('ممنوع الاستخدام التجاري', 'No commercial use'), 't-amber'], ['📕', L('ممنوع إعادة النشر', 'No redistribution'), 't-red']]
      .map(([e, t, th], k) => U.box('lic' + k, 70 + k * 600, 200, 560, th, { ic: e, h: L('مجموعة ', 'Dataset ') + (k + 1), p: t })).join('')}
    ${U.pill('chk', 300, 500, '🔍 ' + L('اقرا شروط الاستخدام قبل ما تستخدم', 'Read the terms of use before using'), 'solid')}

    ${U.art('cchart', 90, 170, 560, 360, '0 0 560 360', CHART)}
    ${[['🏢', L('المزوّد:', 'Provider:') + ' World Bank'], ['📄', L('اسم البيانات:', 'Data name:') + ' Population, total'], ['📅', L('تاريخ الحصول:', 'Date obtained:') + ' 2026-10-13'], ['🔗', L('الرابط:', 'URL:') + ' ' + CODE('data.worldbank.org')]]
      .map(([e, t], k) => U.pill('ct' + k, 720, 190 + k * 95, e + ' ' + t, 't-blue')).join('')}
    ${U.pill('why1', 90, 590, '🛡️ ' + L('دليل على موثوقية البيانات', 'evidence of reliability'), 't-green')}
    ${U.pill('why2', 760, 590, '🔎 ' + L('وبيخلّي غيرك يتحقّق من التحليل', 'and lets others verify the analysis'), 't-green')}

    ${U.hd(0, '🎁 ' + L('البيانات المفتوحة', 'Open data'))}
    ${U.hd(1, '🏦 ' + L('أشهر المزوّدين', 'Major providers'))}
    ${U.hd(2, '🔌 ' + L('متصفح… ولا API؟', 'Browser… or API?'))}
    ${U.hd(3, '① ' + L('الطلب', 'The request'))}
    ${U.hd(4, '② ' + L('الاستجابة', 'The response'))}
    ${U.hd(5, '③ ' + L('الاستخدام', 'Using the data'))}
    ${U.hd(6, '🚦 ' + L('خد بالك وأنت بتستخدم API', 'Care when using an API'))}
    ${U.hd(7, '📜 ' + L('شروط الاستخدام', 'Terms of use'))}
    ${U.hd(8, '🏷️ ' + L('ذكر المصدر', 'Source citation'))}
    ${U.nt(1, L('على المنصّات دي: بحث وتنزيل من المتصفح… وفي حالات كتير API', 'On these platforms: search and download in a browser… and often an API'))}
    ${U.nt(6, '⚠️ ' + L('الخادم مابيبعتش من طرف واحد على طول، والعملاء مابيتبادلوش مباشرة', 'The server does not push data one-sidedly, and clients do not swap data directly'), 'warn')}
    ${U.nt(7, L('حتى المفتوحة: نطاق الاستخدام بيتحدّد لكل مجموعة لوحدها', 'Even open data: the scope of use is set per dataset'), 'warn')}
  </div>
  <div id="c3-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '🏦 World Bank · 🌐 UN Data · 🏆 Kaggle — ' + L('اختار الموثوق المناسب للغرض', 'pick the reliable one that fits'), 't-blue')}
    ${U.pill('x1', 120, 290, '🔌 ' + L('العميل ← نقطة النهاية · الخادم ← JSON · البرنامج يستخدم', 'Client → endpoint · server → JSON · the program uses it'), 't-green')}
    ${U.pill('x2', 120, 400, '📜 ' + L('شروط الاستخدام لكل مجموعة — حتى المجانية', 'Terms of use for every dataset — even free ones'), 't-amber')}
    ${U.pill('x3', 120, 510, '🏷️ ' + L('ذكر المصدر: مزوّد · اسم · تاريخ · رابط', 'Cite the source: provider · name · date · URL'), 't-violet')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#c3-' + id + ' .' + c);

    /* 0 — open data: free, but with rules */
    let c = at(0);
    frame(0, c);
    POP(q('gift'), c + 0.5, 0.6); SND('pop', c + 0.5);
    IN(q('free'), c + 1.4, 0.4, { x: 30 * sx });
    IN(q('rule'), c + 2.2, 0.4, { x: 30 * sx }); SND('bad', c + 2.2);
    range(3).forEach((k) => { IN(q('w' + k), c + 3.2 + k * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 3.2 + k * 0.6); });

    /* 1 — providers */
    c = at(1);
    frame(1, c, 5.0);
    OUT(Q('gift free rule w0 w1 w2'), c, 0.4);
    Q('wb un kg').forEach((b, i) => { IN(b, c + 0.6 + i * 1.0, 0.5, { y: 30 }); SND('pop', c + 0.6 + i * 1.0); });
    IN(q('pick'), c + 3.8, 0.45, { y: 20 }); SND('ok', c + 3.8);

    /* 2 — browser vs API */
    c = at(2);
    frame(2, c);
    OUT(Q('wb un kg pick'), c, 0.4);
    IN(q('ch-u'), c + 0.5, 0.5, { x: -60 * sx });
    IN(q('br'), c + 1.2, 0.4, { x: 30 * sx });
    IN(q('slow'), c + 2.0, 0.4, { x: 30 * sx }); SND('bad', c + 2.0);
    M.mood('ch-u', true, c + 2.0);
    IN(q('fast'), c + 3.2, 0.4, { x: 30 * sx }); SND('ok', c + 3.2);
    M.mood('ch-u', false, c + 3.2);
    IN(q('apib'), c + 4.0, 0.5, { y: 20 });

    /* 3 — ① the request */
    c = at(3);
    frame(3, c, 5.0);
    OUT(Q('ch-u br slow fast apib'), c, 0.4);
    IN(q('cli'), c + 0.5, 0.5, { x: -40 * sx });
    IN(q('srvw'), c + 0.8, 0.5, { x: 40 * sx }); IN(q('srvl'), c + 1.0, 0.4, { y: 20 });
    IN(q('ep'), c + 1.8, 0.45, { y: -20 }); SND('pop', c + 1.8);
    IN(q('req'), c + 2.6, 0.3);
    tl.fromTo(q('req'), { x: 0 }, { x: 860 * sx, duration: 1.4, ease: 'power1.inOut' }, c + 2.8); SND('tap', c + 2.8);
    tl.to(q('req'), { opacity: 0, duration: 0.3 }, c + 4.2);
    IN(q('epx'), c + 4.4, 0.4, { y: 20 });

    /* 4 — ② the JSON response */
    c = at(4);
    frame(4, c);
    OUT(Q('epx'), c, 0.3);
    IN(q('res'), c + 0.5, 0.4, { y: -20 });
    tl.fromTo(q('json'), { opacity: 0, x: 420 * sx, scale: 0.6 }, { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'back.out(1.4)' }, c + 0.8); SND('ok', c + 1.4);
    IN(q('jsn'), c + 2.6, 0.4, { x: 30 * sx });
    IN(q('err'), c + 3.6, 0.4, { x: 30 * sx }); SND('bad', c + 3.6);

    /* 5 — ③ use */
    c = at(5);
    frame(5, c);
    OUT(Q('res jsn err ep srvw srvl'), c, 0.4);
    tl.to(q('json'), { x: -520 * sx, scale: 0.4, opacity: 0, duration: 0.9, ease: 'power2.in' }, c + 0.4); // absorbed by the client
    IN(q('use'), c + 1.2, 0.4, { x: 30 * sx });
    IN(q('chart'), c + 1.8, 0.5, { y: 30 });
    tl.fromTo(sel('chart', 'first'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, ease: 'back.out(1.6)' }, c + 2.2); SND('pop', c + 2.2);
    IN(q('rep'), c + 3.2, 0.4, { x: 30 * sx });
    tl.fromTo(sel('chart', 'more'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(1.6)' }, c + 3.4); SND('ok', c + 3.6);

    /* 6 — API cautions */
    c = at(6);
    frame(6, c, 5.4);
    OUT(Q('cli use rep chart'), c, 0.4);
    range(3).forEach((k) => { IN(q('c' + k), c + 0.6 + k * 0.7, 0.4, { x: 30 * sx }); SND('pop', c + 0.6 + k * 0.7); });
    range(6).forEach((k) => IN(q('pk' + k), c + 2.8 + k * 0.08, 0.2));
    tl.to(Q('pk0 pk1 pk2 pk3 pk4 pk5'), { x: 160 * sx, duration: 0.5, stagger: 0.06 }, c + 3.2);
    POP(q('stop'), c + 3.6, 0.4); SND('bad', c + 3.6);
    tl.to(Q('pk0 pk1 pk2 pk3 pk4 pk5'), { x: 0, opacity: 0.25, duration: 0.5 }, c + 4.0);
    IN(q('lim'), c + 4.4, 0.5, { x: 40 * sx });

    /* 7 — terms of use */
    c = at(7);
    frame(7, c);
    OUT(Q('c0 c1 c2 pk0 pk1 pk2 pk3 pk4 pk5 stop lim'), c, 0.4);
    range(3).forEach((k) => { IN(q('lic' + k), c + 0.6 + k * 0.8, 0.5, { y: 30 }); SND('pop', c + 0.6 + k * 0.8); });
    POP(q('chk'), c + 3.4, 0.5); SND('ok', c + 3.4);

    /* 8 — source citation */
    c = at(8);
    frame(8, c);
    OUT(Q('lic0 lic1 lic2 chk'), c, 0.4);
    IN(q('cchart'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(sel('cchart', 'cb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.3, stagger: 0.06 }, c + 0.8);
    range(4).forEach((k) => { IN(q('ct' + k), c + 1.8 + k * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.8 + k * 0.6); });
    IN(q('why1'), c + 4.4, 0.4, { y: 20 });
    IN(q('why2'), c + 5.0, 0.4, { y: 20 }); SND('ok', c + 5.0);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

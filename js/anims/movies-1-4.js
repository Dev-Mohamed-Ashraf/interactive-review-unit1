/* =========================================================
 * anims/movies-1-4.js — lesson 1-4 teacher-driven movies, drawn in the
 * lesson 1-2 look (MK.look · css/anims-movies-l12.css). Every scene lives in
 * its own layer (#<p>s<k>): the next scene fades the previous one out.
 *   biasMovie       : biased past decisions → the model copies them (70% vs 18%) →
 *                     balance + test per group → the proxy-variable trap → real cases → recap
 *   privacyMovie    : cameras that track one person · a data file that keeps growing ·
 *                     the safety / privacy balance · share only what is needed · exam trap
 *   xaiMovie        : black box → XAI opens it → factor importance → “what if…” →
 *                     heat map → who is responsible?
 *   principlesMovie : fairness · transparency · privacy protection · accountability · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const { ROBOT } = MK.look.art;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const XRAY = `<rect x="10" y="10" width="420" height="420" rx="24" fill="#020617" stroke="#475569" stroke-width="6"/>
    ${range(5).map((k) => `<path d="M80 ${110 + k * 50} Q220 ${70 + k * 50} 360 ${110 + k * 50}" fill="none" stroke="#cbd5e1" stroke-width="10" opacity=".75"/>`).join('')}
    <rect x="210" y="70" width="20" height="320" rx="10" fill="#e2e8f0" opacity=".8"/>
    <defs><radialGradient id="xa-hot"><stop offset="0" stop-color="#ef4444" stop-opacity=".95"/><stop offset=".5" stop-color="#f97316" stop-opacity=".6"/><stop offset="1" stop-color="#fde047" stop-opacity="0"/></radialGradient></defs>
    <circle class="heat" cx="300" cy="230" r="80" fill="url(#xa-hot)" opacity="0"/>`;
  const CUBE = `<g class="faces"><path d="M60 90 L200 30 L340 90 L200 150Z" fill="#334155"/><path d="M60 90 L200 150 L200 330 L60 270Z" fill="#0f172a"/><path d="M340 90 L200 150 L200 330 L340 270Z" fill="#1e293b"/></g>
    <text class="qm" x="200" y="230" text-anchor="middle" font-size="110" font-weight="900" fill="#f87171" font-family="Segoe UI, Arial">?</text>`;
  const SCALE = `<path d="M200 60 V300" stroke="#cbd5e1" stroke-width="10"/><path d="M130 310 H270" stroke="#cbd5e1" stroke-width="12" stroke-linecap="round"/>
    <g class="beam"><path d="M40 70 H360" stroke="#fbbf24" stroke-width="10" stroke-linecap="round"/>
      <path d="M40 70 L10 160 H70Z M40 70 L70 160" fill="none" stroke="#fbbf24" stroke-width="4"/><path d="M5 160 H75 Q40 196 5 160Z" fill="#fbbf24"/>
      <path d="M360 70 L330 160 M360 70 L390 160" fill="none" stroke="#fbbf24" stroke-width="4"/><path d="M325 160 H395 Q360 196 325 160Z" fill="#fbbf24"/></g>
    <circle cx="200" cy="60" r="16" fill="#fde68a"/>`;
  const CITY = (B) => `<defs><linearGradient id="pv-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs>
    <rect width="1780" height="380" rx="26" fill="url(#pv-sky)"/>
    ${B.mir(1780, `${[[60, 140, 200], [300, 90, 160], [520, 170, 220], [800, 110, 180], [1040, 150, 240], [1340, 100, 170], [1560, 160, 200]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="#0f172a" opacity=".8"/>`).join('')}
      <rect y="300" width="1780" height="80" fill="#334155"/>
      ${[260, 890, 1520].map((x, k) => `<g class="cam c${k}"><rect x="${x}" y="40" width="10" height="70" fill="#94a3b8"/><rect x="${x - 40}" y="26" width="70" height="36" rx="8" fill="#e2e8f0"/><circle cx="${x - 30}" cy="44" r="10" fill="#0f172a"/><path class="cone" d="M${x - 40} 44 L${x - 160} 300 L${x + 80} 300Z" fill="#f87171" opacity="0"/></g>`).join('')}`)}`;

  /* ═════════════════════════ biasMovie ═════════════════════════ */
  K.defineAnim('biasMovie', (stage, props, api) => {
    const P = 'bi-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-bias mv-l12 mv-l14', prefix: P, beats: 6, cast: { a1: 'applicant', a2: 'visitor' },
      html: (L) => {
        const row = (g, s, ok) => `<div class="l12-trow ${ok ? 'ok' : 'no'}"><b>${g}</b><span>${L('مهارات', 'skills')} ${s}/10</span><em>${ok ? '✅ ' + L('اتقبل', 'hired') : '❌ ' + L('اترفض', 'rejected')}</em></div>`;
        return `
  <div id="bi-s0" class="mv-stage">
    ${B.card('old', 70, 140, 860, 460, 'c-slate', { h: '📂 ' + L('قرارات التعيين القديمة (بيانات التدريب)', 'Old hiring decisions (the training data)'), html: row('●', 8, 1) + row('▲', 8, 0) + row('●', 7, 1) + row('▲', 7, 0) })}
    ${B.ch('a1', 1080, 330, 'md')}${B.ch('a2', 1500, 330, 'md')}
    ${B.chip('g1', 1080, 640, '● ' + L('مهارات 8/10', 'skills 8/10'), 'c-blue', 220)}${B.chip('g2', 1500, 640, '▲ ' + L('مهارات 8/10', 'skills 8/10'), 'c-amber', 220)}
    ${B.chip('unf', 1040, 200, '⚠️ ' + L('▲ اتظلمت زمان… رغم إن المهارات واحدة', '▲ was treated unfairly… with the same skills'), 'c-red')}
  </div>
  <div id="bi-s1" class="mv-stage">
    ${B.svg('bot', 90, 150, 300, 300, '0 0 300 300', ROBOT('#fbbf24'))}
    ${B.card('odds', 470, 150, 1380, 0, 'c-slate', { h: '🤖 ' + L('النموذج بيقيّم متقدّمين جداد بنفس المهارات', 'The model rates new applicants with the same skills'),
      html: `<div class="l12-pr"><b>● ${L('فرصة القبول', 'chance')}</b><span class="l12-bar o"><i id="bi-r1" data-w="70" style="width:70%"></i></span><em>70%</em></div><div class="l12-pr"><b>▲ ${L('فرصة القبول', 'chance')}</b><span class="l12-bar s"><i id="bi-r2" data-w="18" style="width:18%"></i></span><em>18%</em></div>` })}
    ${B.card('def1', 90, 500, 1760, 0, 'c-red', { row: true, ic: '⚖️', h: L('التحيز الخوارزمي', 'Algorithmic bias'), p: L('نمط في مخرجات الـAI ممكن يؤدي لنتايج غير عادلة أو ضارة — النموذج اتعلّم الظلم وكرّره', 'bias in AI judgements caused by bias in the training data — the model learned the injustice and repeated it') })}
  </div>
  <div id="bi-s2" class="mv-stage">
    ${B.card('bal', 70, 140, 840, 460, 'c-green', { h: '⚖️ ' + L('① بيانات متوازنة لكل المجموعات', '① Balanced data for every group'),
      html: `<div class="l12-pop"><div><i>●</i>${range(8).map(() => '<b class="pa">👤</b>').join('')}</div><div><i>▲</i>${range(8).map((k) => `<b class="pb${k > 2 ? ' add' : ''}">👤</b>`).join('')}</div></div>` })}
    ${B.card('tst', 980, 140, 880, 460, 'c-blue', { h: '🧪 ' + L('② نختبر النتايج لكل مجموعة', '② Test the results for every group'),
      html: `<div class="l12-pr"><b>● ${L('القبول', 'hired')}</b><span class="l12-bar o"><i data-w="70" style="width:70%"></i></span><em>70%</em></div><div class="l12-pr"><b>▲ ${L('القبول', 'hired')}</b><span class="l12-bar o"><i id="bi-fix" data-w="70" style="width:70%"></i></span><em>70%</em></div>` })}
    ${B.mid('same', 640, '✅ ' + L('نفس المهارات ← نفس الفرصة', 'same skills → same chance'), 'c-green big')}
  </div>
  <div id="bi-s3" class="mv-stage">
    ${B.card('cols', 70, 140, 1040, 0, 'c-slate', { h: '📋 ' + L('أعمدة البيانات', 'Data columns'), html: `<div class="l12-cols"><span class="cg">👥 ${L('المجموعة', 'group')}</span><span class="cx">🏘️ ${L('الحي', 'district')}</span><span class="cx">⚽ ${L('اسم النادي', 'club name')}</span><span>⭐ ${L('المهارات', 'skills')}</span></div>` })}
    ${B.big('cut', 140, 350, 100, 80, '✂️')}
    ${B.stamp('back', 300, 460, '😬 ' + L('التحيز رجع!', 'the bias is back!'))}
    ${B.card('prox', 1170, 140, 690, 0, 'c-amber', { ic: '🕵️', h: L('المتغيّر البديل', 'Proxy variable'), p: L('متغيّر بيمثّل المجموعة بشكل غير مباشر… ممكن يرجّع التحيز حتى لو شلنا عمودها', 'a variable linked to the group… can bring the bias back even after removing the group column') })}
    ${B.chip('also', 70, 640, '🛠️ ' + L('والتحيز ممكن يدخل كمان من اختيار المتغيّرات أو تصميم النموذج أو طريقة الاستخدام', 'bias can also enter through the choice of variables or the model design'), 'c-amber')}
  </div>
  <div id="bi-s4" class="mv-stage">
    ${B.card('e1', 70, 150, 860, 440, 'c-red', { ic: '💼', h: L('ذكاء توظيف', 'A hiring AI'), p: L('بيقيّم فئة معيّنة بشكل غير عادل لأن قرارات الماضي كانت كده', 'rates one gender unfairly because past decisions did'), html: `<div class="l12-cv"><span>📄 ✅</span><span>📄 ❌</span><span>📄 ✅</span><span>📄 ❌</span></div>` })}
    ${B.card('e2', 990, 150, 860, 440, 'c-red', { ic: '📷', h: L('التعرّف على الوجه', 'Face recognition'), p: L('بيغلط أكتر مع مجموعات عرقية صورها كانت قليلة في التدريب', 'misidentifies more often the groups with few training photos'), html: `<div class="l12-faces">${range(8).map((k) => `<span class="${k % 3 === 2 ? 'x' : ''}">🙂</span>`).join('')}</div>` })}
  </div>
  <div id="bi-s5" class="mv-stage">
    ${[['📂', L('السبب', 'The cause'), L('أهمه بيانات تدريب متحيّزة: ناقصة أو فيها تمييز قديم', 'biased training data: missing groups or old discrimination'), 'c-red'],
      ['⚖️', L('العلاج', 'The fix'), L('بيانات متوازنة + اختبار لكل مجموعة', 'balanced data + testing for every group'), 'c-green'],
      ['🕵️', L('الفخ', 'The trap'), L('المتغيّر البديل بيرجّع التحيز', 'a proxy variable brings the bias back'), 'c-amber']]
      .map(([ic, h, p, c], k) => B.card('c' + k, 70 + k * 600, 150, 570, 330, c, { ic, h, p })).join('')}
    ${B.mid('nope', 560, '❌ ' + L('السبب مش بطء الحاسب ولا ضعف الإنترنت', 'the cause is NOT a slow computer or a weak connection'), 'c-red big')}
  </div>
    ${U.hd(0, '🏢 ' + L('ذكاء توظيف اتدرّب على قرارات الماضي', 'A hiring AI trained on past decisions'))}
    ${U.hd(1, '🤖 ' + L('النموذج اتعلّم الظلم… وكرّره', 'The model learned the injustice… and repeats it'))}
    ${U.hd(2, '🔧 ' + L('نقلّل التحيز إزاي؟', 'How do we reduce bias?'))}
    ${U.hd(3, '🕵️ ' + L('فخ المتغيّر البديل', 'The proxy-variable trap'))}
    ${U.hd(4, '🌍 ' + L('أمثلة حقيقية', 'Real cases'))}
    ${U.hd(5, '📌 ' + L('الخلاصة', 'Recap'))}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    let c = at(0);
    frame(0, c);
    IN(q('old'), c + 0.3, 0.5, { y: 30 });
    tl.fromTo(all('#bi-old .l12-trow'), { opacity: 0, x: 30 * sx }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.45 }, c + 0.9);
    tl.to(all('#bi-old .l12-trow.no'), { backgroundColor: 'rgba(248,113,113,.28)', duration: 0.4 }, c + 3.0); SND('bad', c + 3.0);
    IN(Q('a1 a2'), c + 3.8, 0.5, { y: 30 }); IN(Q('g1 g2'), c + 4.3, 0.4, { y: 12 });
    M.mood('a2', true, c + 5.0);
    POP(q('unf'), c + 5.2, 0.5);

    c = at(1);
    frame(1, c);
    leave(1, c);
    POP(q('bot'), c + 0.4, 0.5);
    tl.fromTo(all('#bi-bot .eyes circle'), { attr: { fill: '#fbbf24' } }, { attr: { fill: '#f87171' }, duration: 0.2, yoyo: true, repeat: 5 }, c + 1.0);
    IN(q('odds'), c + 1.6, 0.5, { x: 40 * sx });
    tl.fromTo(q('r1'), { width: '0%' }, { width: '70%', duration: 1.0 }, c + 2.2);
    tl.fromTo(q('r2'), { width: '0%' }, { width: '18%', duration: 1.0 }, c + 2.2); SND('bad', c + 3.2);
    glow(M, q('odds'), c + 3.4, 'rgba(248,113,113,.9)');
    IN(q('def1'), c + 4.4, 0.5, { y: 24 });

    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('bal'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#bi-bal .add'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, ease: 'back.out(2)' }, c + 1.4); SND('pop', c + 1.4);
    IN(q('tst'), c + 3.0, 0.5, { y: 30 });
    tl.fromTo(all('#bi-tst .l12-bar i'), { width: '0%' }, { width: '70%', duration: 0.9, stagger: 0.3 }, c + 3.6); SND('ok', c + 4.6);
    POP(q('same'), c + 5.2, 0.5);

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('cols'), c + 0.4, 0.5, { y: 30 });
    POP(q('cut'), c + 1.4, 0.4);
    tl.to(all('#bi-cols .cg'), { opacity: 0.2, textDecoration: 'line-through', duration: 0.4 }, c + 1.8); SND('tap', c + 1.8);
    tl.to(all('#bi-cols .cx'), { backgroundColor: 'rgba(248,113,113,.3)', borderColor: '#f87171', duration: 0.4, stagger: 0.4 }, c + 2.8); SND('bad', c + 3.2);
    stampIn(M, q('back'), c + 3.8);
    IN(q('prox'), c + 4.6, 0.5, { x: 40 * sx }); IN(q('also'), c + 5.8, 0.4, { y: 12 });

    c = at(4);
    frame(4, c);
    leave(4, c);
    IN(q('e1'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#bi-e1 .l12-cv span'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.25 }, c + 1.0);
    IN(q('e2'), c + 2.6, 0.5, { y: 30 });
    tl.fromTo(all('#bi-e2 .l12-faces span'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.1 }, c + 3.2);
    tl.to(all('#bi-e2 .l12-faces .x'), { backgroundColor: 'rgba(248,113,113,.35)', borderColor: '#f87171', duration: 0.3, stagger: 0.2 }, c + 4.4); SND('bad', c + 4.4);

    c = at(5);
    frame(5, c);
    leave(5, c);
    range(3).forEach((k) => { IN(q('c' + k), c + 0.5 + k * 0.6, 0.5, { y: 30 }); SND('pop', c + 0.5 + k * 0.6); });
    POP(q('nope'), c + 2.8, 0.5); SND('bad', c + 2.8);

    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#bi-old .l12-trow.no em'), { scale: 1.12, duration: 0.7, ease: 'sine.inOut' }));
    M.loop(1, 5.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('r2'), { opacity: 0.5, duration: 0.7 }));
    M.loop(2, 6.0, () => M.breathe(q('same'), 1.05, 1.1));
    M.loop(3, 6.6, () => M.breathe(q('back'), 1.06, 0.9));
    M.loop(4, 5.2, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#bi-e2 .l12-faces .x'), { scale: 1.12, duration: 0.6 }));
    M.loop(5, 3.6, () => glowCycle(Q('c0 c1 c2'), 'rgba(251,191,36,.9)', 0.5));
    return M.done();
  });

  /* ═════════════════════════ privacyMovie ═════════════════════════ */
  K.defineAnim('privacyMovie', (stage, props, api) => {
    const P = 'pv-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-priv mv-l12 mv-l14', prefix: P, beats: 5, cast: { st: 'student' },
      html: (L) => `
  <div id="pv-s0" class="mv-stage">
    ${B.svg('city', 70, 130, 1780, 380, '0 0 1780 380', CITY(B))}
    ${B.ch('st', 90, 300, 'sm')}
    ${[['🏫', '9:00', L('المدرسة', 'school')], ['🛒', '13:00', L('السوق', 'market')], ['🏠', '17:00', L('البيت', 'home')]].map(([e, t, n], k) => B.chip('t' + k, 100 + k * 630, 540, `${e} <bdi>${t}</bdi> · ${n} — 👤 ${L('اتعرّف عليه', 'identified')}`, 'c-red', 460)).join('')}
    ${B.mid('wh', 650, '📹 ' + L('الكاميرات بتعرف: مين · فين · إمتى', 'the cameras know: who · where · when'), 'c-red big')}
  </div>
  <div id="pv-s1" class="mv-stage">
    <div id="pv-ph" class="l12u l12-phone later" style="${B.at(120, 130, 340, 560)}"><div class="scr"><div class="abar">📱 ${L('موبايلك', 'your phone')}</div><div class="tile">👍 ${L('لايكات', 'likes')}</div><div class="tile">🔍 ${L('بحث', 'searches')}</div><div class="tile">📍 ${L('مكانك', 'location')}</div><div class="tile">🛍️ ${L('مشترياتك', 'purchases')}</div></div></div>
    ${range(8).map((k) => B.big('d' + k, 480, 220 + (k % 4) * 110, 80, 54, ['👍', '🔍', '📍', '🛍️'][k % 4])).join('')}
    ${B.card('file', 1100, 140, 760, 440, 'c-amber', { ic: '🗂️', h: L('ملف ضخم عنك', 'A huge file about you'), p: L('بيانات سلوكك على الإنترنت بتتجمع وتتحلّل', 'your online behaviour is collected and analysed'), html: `<div class="l12-count"><bdi id="pv-n">0</bdi> ${L('معلومة', 'facts')}</div>` })}
  </div>
  <div id="pv-s2" class="mv-stage">
    ${B.svg('scale', 660, 150, 600, 480, '0 0 400 330', SCALE)}
    ${B.chip('left', 520, 470, '🛡️ ' + L('سلامة', 'safety') + ' + 😌 ' + L('راحة', 'convenience'), 'c-green big')}
    ${B.chip('right', 1110, 470, '🔒 ' + L('خصوصية', 'privacy'), 'c-violet big')}
    ${B.chip('q1', 90, 200, '❓ ' + L('مين يشوف البيانات؟', 'who sees the data?'), 'c-amber big')}
    ${B.chip('q2', 90, 320, '⏳ ' + L('لحد إمتى تتخزّن؟', 'how long is it kept?'), 'c-amber big')}
    ${B.mid('rules', 660, '📜 ' + L('التوازن محتاج قواعد واضحة', 'the balance needs clear rules'), 'c-green big')}
  </div>
  <div id="pv-s3" class="mv-stage">
    <div id="pv-perm" class="l12u l12-win later" style="${B.at(120, 140, 820, 470)}"><div class="wbar"><i></i><i></i><i></i><span class="url">⚙️ ${L('صلاحيات تطبيق التوصيل', 'Delivery app permissions')}</span></div><div class="wbody">
      <div class="l12-field">📍 ${L('الموقع ← للتوصيل بس', 'location → for delivery only')} <b class="tg on">✓</b></div>
      <div class="l12-field">📷 ${L('الكاميرا ← للتطبيق ده بس', 'camera → this app only')} <b class="tg on">✓</b></div>
      <div class="l12-field">👥 ${L('جهات الاتصال ← مش محتاجها', 'contacts → not needed')} <b class="tg off">✗</b></div></div></div>
    ${B.card('prot', 1010, 140, 850, 0, 'c-green', { ic: '🔒', h: L('حماية الخصوصية', 'Privacy protection'), p: L('نتعامل مع البيانات بشكل مناسب: يتشارك بس اللي لازم، ولغرض واضح', 'handle data properly: share only what is needed, for a clear purpose') })}
    ${B.chip('you', 1010, 520, '🙋‍♂️ ' + L('إنت اللي تتحكّم', 'you are in control'), 'c-green big')}
  </div>
  <div id="pv-s4" class="mv-stage">
    ${B.card('yes', 70, 140, 860, 470, 'c-red', { ic: '✅', h: L('قضايا خصوصية', 'Privacy issues') })}
    ${B.card('no', 990, 140, 860, 470, 'c-slate', { ic: '❌', h: L('مش قضايا خصوصية', 'NOT privacy issues') })}
    ${B.chip('i0', 760, 640, '📹 ' + L('تتبّع الأفراد بالتعرّف على الوجه', 'tracking people by face recognition'), 'c-red')}
    ${B.chip('i1', 760, 640, '🗂️ ' + L('جمع البيانات الشخصية بكميات كبيرة', 'mass collection of personal data'), 'c-red')}
    ${B.chip('i2', 760, 640, '🎨 ' + L('الـAI بيعمل أعمال إبداعية', 'AI makes creative works'), 'c-slate')}
    ${B.chip('i3', 760, 640, '⚡ ' + L('سرعة الـAI زادت', 'AI got faster'), 'c-slate')}
  </div>
    ${U.hd(0, '📹 ' + L('المراقبة بالتعرّف على الوجه', 'Face-recognition surveillance'))}
    ${U.hd(1, '🗂️ ' + L('الجمع الجماعي للبيانات الشخصية', 'Mass collection of personal data'))}
    ${U.hd(2, '⚖️ ' + L('سلامة وراحة… ولا خصوصية؟', 'Safety and convenience… or privacy?'))}
    ${U.hd(3, '🔒 ' + L('حماية الخصوصية: إنت اللي تتحكّم', 'Privacy protection: you are in control'))}
    ${U.hd(4, '⚠️ ' + L('فخ الامتحان', 'Exam trap'))}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    let c = at(0);
    frame(0, c);
    IN(q('city'), c + 0.3, 0.5);
    IN(q('st'), c + 0.6, 0.4);
    range(3).forEach((k) => {
      const t = c + 1.2 + k * 1.9;
      tl.to(q('st'), { x: [0, 630, 1260][k] * sx + 0, duration: k ? 1.2 : 0.01, ease: 'power1.inOut' }, t - (k ? 1.2 : 0));
      tl.fromTo(all(`#pv-city .c${k} .cone`), { opacity: 0 }, { opacity: 0.45, duration: 0.3 }, t);
      POP(q('t' + k), t + 0.3, 0.4); SND('tap', t + 0.3);
    });
    tl.to(q('st'), { x: 1400 * sx, duration: 0.8 }, c + 6.9);
    POP(q('wh'), c + 7.2, 0.5); SND('bad', c + 7.2);

    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('ph'), c + 0.4, 0.5, { y: 30 });
    IN(q('file'), c + 0.8, 0.5, { x: 40 * sx });
    range(8).forEach((k) => {
      const t = c + 1.6 + k * 0.45;
      tl.fromTo(q('d' + k), { opacity: 0, x: 0, scale: 1 }, { opacity: 1, duration: 0.15 }, t);
      tl.to(q('d' + k), { x: 760 * sx, y: 40 - (k % 4) * 60, scale: 0.4, duration: 0.7, ease: 'power2.in' }, t + 0.15);
      tl.to(q('d' + k), { opacity: 0, duration: 0.1 }, t + 0.85);
    });
    const cnt = { v: 0 };
    tl.fromTo(cnt, { v: 0 }, { v: 2400000, duration: 4.2, ease: 'power2.in', onUpdate() { const e = q('n'); if (e) e.textContent = Math.round(cnt.v).toLocaleString('en-US'); } }, c + 1.8);
    glow(M, q('file'), c + 6.2, 'rgba(251,191,36,.95)'); SND('bad', c + 6.2);

    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('scale'), c + 0.4, 0.5, { y: 20 });
    IN(Q('left right'), c + 0.9, 0.4, { y: 12 });
    tl.fromTo(all('#pv-scale .beam'), { rotation: 0, svgOrigin: '200 60' }, { rotation: -14, svgOrigin: '200 60', duration: 0.9, ease: 'power2.inOut' }, c + 1.6);
    IN(q('q1'), c + 2.8, 0.4, { x: -30 * sx }); IN(q('q2'), c + 3.4, 0.4, { x: -30 * sx });
    POP(q('rules'), c + 4.6, 0.5); SND('ok', c + 4.6);
    tl.to(all('#pv-scale .beam'), { rotation: 0, svgOrigin: '200 60', duration: 1.0, ease: 'elastic.out(1, 0.5)' }, c + 4.8);

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('perm'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#pv-perm .l12-field'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.6 }, c + 1.0);
    tl.fromTo(all('#pv-perm .tg'), { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.6, ease: 'back.out(3)' }, c + 1.3); SND('tap', c + 1.3); SND('tap', c + 1.9); SND('bad', c + 2.5);
    IN(q('prot'), c + 3.4, 0.5, { x: 40 * sx }); POP(q('you'), c + 4.6, 0.5);

    c = at(4);
    frame(4, c);
    leave(4, c);
    IN(Q('yes no'), c + 0.4, 0.5, { y: 30 });
    const SORT = [[0, 0], [1, 0], [2, 1], [3, 1]];
    SORT.forEach(([k, side], j) => {
      const t = c + 1.2 + j * 1.3;
      POP(q('i' + k), t, 0.35);
      tl.to(q('i' + k), { x: (side === 0 ? -620 : 300) * sx, y: -300 + Math.floor(j % 2) * 110, duration: 0.6, ease: 'power2.inOut' }, t + 0.5);
      SND(side === 0 ? 'bad' : 'ok', t + 1.1);
    });

    M.loop(0, 7.8, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#pv-city .cone'), { opacity: 0.2, duration: 0.8 }));
    M.loop(1, 6.8, () => M.bob(Q('d0 d1 d2 d3'), 8, 1.0));
    M.loop(2, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#pv-scale .beam'), { rotation: -3, svgOrigin: '200 60' }, { rotation: 3, svgOrigin: '200 60', duration: 1.6, ease: 'sine.inOut' }));
    M.loop(3, 5.4, () => M.glowLoop(q('you'), 'rgba(52,211,153,.9)', 1.0));
    return M.done();
  });

  /* ═════════════════════════ xaiMovie ═════════════════════════ */
  K.defineAnim('xaiMovie', (stage, props, api) => {
    const P = 'xa-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-xai mv-l12 mv-l14', prefix: P, beats: 6, cast: { ap: 'applicant', dr: 'doctor', dv: 'engineer', us: 'student', op: 'clerk' },
      html: (L) => `
  <div id="xa-s0" class="mv-stage">
    ${B.ch('ap', 70, 380, 'md')}
    ${B.card('app', 60, 150, 380, 0, 'c-slate', { h: '📝 ' + L('طلب وظيفة', 'Job application'), p: L('خبرة سنة · مهارات كويسة', '1 year · good skills') })}
    ${B.svg('cube', 640, 170, 400, 360, '0 0 400 360', CUBE)}
    ${B.chip('rej', 1180, 300, '❌ ' + L('مرفوض', 'rejected'), 'c-red big')}
    ${B.chip('why', 1180, 410, '❓ ' + L('ليه؟… محدش عارف', 'why?… nobody knows'), 'c-amber big')}
  </div>
  <div id="xa-s1" class="mv-stage">
    ${B.chip('rsn', 1100, 260, '🏘️ ' + L('السبب: «الحي اللي ساكن فيه»!', 'the reason: “the district you live in”!'), 'c-red big')}
    ${B.chip('fix', 1100, 380, '🔧 ' + L('تحيّز… لازم يتشال ويتصلّح', 'bias… it must be removed'), 'c-green big')}
    ${B.card('xai', 420, 590, 1440, 0, 'c-blue', { row: true, ic: '🔍', h: L('الذكاء الاصطناعي القابل للتفسير (XAI)', 'Explainable AI (XAI)'), p: L('تقنية بتخلّي البشر يفهموا ليه الـAI أخد حكم معيّن', 'lets humans understand why an AI made a judgement') })}
  </div>
  <div id="xa-s2" class="mv-stage">
    ${B.card('imp', 70, 140, 1100, 470, 'c-slate', { h: '① ' + L('كل عامل أثّر قد إيه؟', 'How much did each factor weigh?'),
      html: [['⭐ ' + L('الخبرة', 'experience'), 55, 'o'], ['🧠 ' + L('المهارات', 'skills'), 48, 'o'], ['🎓 ' + L('الشهادة', 'degree'), 30, 'o'], ['🏘️ ' + L('الحي', 'district'), 90, 's']].map(([n, w, cl]) => `<div class="l12-pr"><b>${n}</b><span class="l12-bar ${cl}"><i data-w="${w}" style="width:${w}%"></i></span><em>${w}%</em></div>`).join('') })}
    ${B.card('one', 1230, 140, 630, 0, 'c-amber', { ic: '①', h: L('أهمية كل عامل', 'Factor importance'), p: L('لو لقينا «الحي» مأثّر — ده تحيّز لازم يتشال', 'if “district” matters — that is bias to remove') })}
  </div>
  <div id="xa-s3" class="mv-stage">
    ${B.card('cf', 70, 140, 1100, 470, 'c-slate', { h: '② ' + L('لو كان… كان اتقبل', 'What if…'), html: `<div class="l12-slide"><span>${L('سنين الخبرة', 'years of experience')}</span><span class="l12-bar o"><i id="xa-yr" data-w="33" style="width:33%"></i></span><b><bdi id="xa-y">1</bdi></b></div><div class="l12-verdict"><span class="v0">❌ ${L('مرفوض', 'rejected')}</span><span class="v1">✅ ${L('مقبول', 'accepted')}</span></div>` })}
    ${B.card('two', 1230, 140, 630, 0, 'c-green', { ic: '②', h: L('«لو كان… كان اتقبل»', '“What if…”'), p: L('أصغر تغيير كان هيقلب النتيجة', 'the smallest change that flips the result') })}
    ${B.chip('tip', 1230, 480, '💬 ' + L('«لو خبرتك 3 سنين كنت اتقبلت»', '“with 3 years you would be in”'), 'c-green')}
  </div>
  <div id="xa-s4" class="mv-stage">
    ${B.svg('xr', 90, 150, 420, 420, '0 0 440 440', XRAY)}
    ${B.ch('dr', 600, 360, 'md')}
    ${B.chip('ok', 560, 250, '👨‍⚕️ ' + L('«المكان ده منطقي… موافق»', '“that area makes sense… agreed”'), 'c-green big')}
    ${B.card('three', 1230, 140, 630, 0, 'c-pink', { ic: '③', h: L('الخريطة الحرارية', 'Heat map'), p: L('بتلوّن المكان اللي بنى عليه التشخيص', 'colours the area the diagnosis relied on') })}
  </div>
  <div id="xa-s5" class="mv-stage">
    ${B.ch('dv', 160, 300, 'md')}${B.ch('us', 850, 300, 'md')}${B.ch('op', 1540, 300, 'md')}
    ${B.chip('l0', 120, 610, '👨‍💻 ' + L('المطوّر', 'developer'), 'c-blue', 300)}${B.chip('l1', 810, 610, '🧑 ' + L('المستخدم', 'user'), 'c-violet', 300)}${B.chip('l2', 1500, 610, '🏢 ' + L('المشغّل', 'operator'), 'c-amber', 300)}
    ${B.mid('who', 130, '⚖️ ' + L('لو الـAI غلط… مين المسؤول؟', 'if the AI is wrong… who is responsible?'), 'c-amber big')}
    ${B.mid('none', 220, '❓ ' + L('مفيش توزيع واحد يصلح لكل السياقات', 'there is no agreed standard yet'), 'c-red')}
  </div>
    ${U.hd(0, '⬛ ' + L('الصندوق الأسود: قرار من غير «ليه»', 'The black box: a decision without a “why”'))}
    ${U.hd(1, '🔍 ' + L('XAI: الصندوق بقى شفاف', 'XAI: the box becomes transparent'))}
    ${U.hd(2, '① ' + L('XAI بيشرح: أهمية كل عامل', 'XAI explains: factor importance'))}
    ${U.hd(3, '② ' + L('XAI بيشرح: «لو كان… كان»', 'XAI explains: “what if…”'))}
    ${U.hd(4, '③ ' + L('XAI بيشرح: الخريطة الحرارية', 'XAI explains: the heat map'))}
    ${U.hd(5, '⚖️ ' + L('المسؤولية', 'Responsibility'))}
    ${U.nt(0, L('حتى لو النتيجة طلعت صح… الغموض بيصعّب تقييمها واكتشاف الأخطاء', 'even if the result is right by chance… the mystery blocks checking'), 'warn')}
    ${U.nt(5, '✅ ' + L('XAI بيدعم الشفافية ويساعد العدالة والمساءلة', 'XAI brings transparency and helps fairness and accountability'), 'ok')}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    let c = at(0);
    frame(0, c, 6.6);
    IN(Q('ap app'), c + 0.3, 0.5, { x: -30 * sx });
    POP(q('cube'), c + 1.0, 0.5);
    tl.to(q('app'), { x: 600 * sx, y: 120, scale: 0.3, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 1.8);
    tl.fromTo(q('cube'), { rotation: 0 }, { rotation: 3, duration: 0.08, yoyo: true, repeat: 9, transformOrigin: '50% 50%' }, c + 2.7);
    POP(q('rej'), c + 3.6, 0.4); SND('bad', c + 3.6); M.mood('ap', true, c + 3.7);
    POP(q('why'), c + 4.6, 0.4);

    /* 1 — the box becomes glass and shows its reason (the cube stays from scene 0) */
    c = at(1);
    frame(1, c);
    OUT(Q('rej why app'), c, 0.3);
    tl.to(all('#xa-cube .faces path'), { fillOpacity: 0.12, stroke: '#38bdf8', strokeWidth: 5, duration: 0.8 }, c + 0.5);
    tl.to(all('#xa-cube .qm'), { opacity: 0, duration: 0.3 }, c + 0.5);
    POP(q('rsn'), c + 1.6, 0.5); SND('bad', c + 1.6);
    POP(q('fix'), c + 2.8, 0.5); SND('ok', c + 2.8); M.mood('ap', false, c + 2.9);
    IN(q('xai'), c + 3.8, 0.5, { y: 24 });

    c = at(2);
    frame(2, c);
    OUT(q('s0'), c, 0.4); OUT(q('s1'), c, 0.4);
    IN(q('imp'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#xa-imp .l12-bar i'), { width: '0%' }, { width: (k, e) => e.dataset.w + '%', duration: 0.8, stagger: 0.5 }, c + 1.0);
    tl.fromTo(all('#xa-imp .l12-pr:last-child'), { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, c + 3.2); SND('bad', c + 3.2);
    IN(q('one'), c + 3.8, 0.5, { x: 40 * sx });

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('cf'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#xa-cf .v1'), { opacity: 0 }, { opacity: 0, duration: 0.01 }, c + 0.4);
    tl.fromTo(q('yr'), { width: '33%' }, { width: '100%', duration: 1.6, ease: 'power1.inOut' }, c + 1.6);
    tl.fromTo(q('y'), { textContent: 1 }, { textContent: 3, snap: { textContent: 1 }, duration: 1.6 }, c + 1.6);
    tl.to(all('#xa-cf .v0'), { opacity: 0, duration: 0.2 }, c + 3.2);
    tl.to(all('#xa-cf .v1'), { opacity: 1, duration: 0.3 }, c + 3.3); SND('ok', c + 3.3);
    IN(q('two'), c + 4.0, 0.5, { x: 40 * sx }); POP(q('tip'), c + 5.0, 0.4);

    c = at(4);
    frame(4, c);
    leave(4, c);
    IN(q('xr'), c + 0.4, 0.5);
    tl.fromTo(all('#xa-xr .heat'), { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 1.0 }, c + 1.2); SND('pop', c + 1.2);
    IN(q('dr'), c + 2.4, 0.5, { x: 40 * sx }); POP(q('ok'), c + 3.2, 0.4); SND('ok', c + 3.2);
    IN(q('three'), c + 4.0, 0.5, { x: 40 * sx });

    c = at(5);
    frame(5, c, 6.0);
    leave(5, c);
    POP(q('who'), c + 0.4, 0.5);
    range(3).forEach((k) => { IN(q(['dv', 'us', 'op'][k]), c + 1.0 + k * 0.5, 0.5, { y: 30 }); IN(q('l' + k), c + 1.3 + k * 0.5, 0.4, { y: 12 }); });
    tl.fromTo(Q('l0 l1 l2'), { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, stagger: 0.3, transformOrigin: '50% 50%' }, c + 3.2);
    POP(q('none'), c + 4.4, 0.4); SND('bad', c + 4.4);

    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).fromTo(q('cube'), { rotation: 0 }, { rotation: 3, duration: 0.08, yoyo: true, repeat: 7, transformOrigin: '50% 50%' }));
    M.loop(1, 5.0, () => M.breathe(q('rsn'), 1.05, 0.9));
    M.loop(2, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#xa-imp .l12-bar.s i'), { opacity: 0.55, duration: 0.7 }));
    M.loop(3, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#xa-cf .v1'), { scale: 1.08, duration: 0.7, transformOrigin: '50% 50%' }));
    M.loop(4, 5.0, () => M.breathe(all('#xa-xr .heat'), 1.15, 0.9));
    M.loop(5, 5.0, () => M.bob(Q('l0 l1 l2'), 7, 1.2));
    return M.done();
  });

  /* ═════════════════════════ principlesMovie ═════════════════════════ */
  K.defineAnim('principlesMovie', (stage, props, api) => {
    const P = 'pr-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-prin mv-l12 mv-l14', prefix: P, beats: 5, cast: { a1: 'applicant', a2: 'visitor', en: 'engineer' },
      html: (L) => `
  <div id="pr-s0" class="mv-stage">
    ${B.svg('scale', 200, 160, 520, 420, '0 0 400 330', SCALE)}
    ${B.ch('a1', 120, 400, 'sm')}${B.ch('a2', 620, 400, 'sm')}
    ${B.chip('f1', 90, 650, '✅ ' + L('اتقيّم بعدل', 'rated fairly'), 'c-green', 240)}${B.chip('f2', 590, 650, '✅ ' + L('اتقيّم بعدل', 'rated fairly'), 'c-green', 240)}
    ${B.card('p0', 960, 160, 900, 0, 'c-blue', { ic: '⚖️', h: L('العدالة (Fairness)', 'Fairness'), p: L('عدم التمييز ظلمًا ضد أي شخص أو مجموعة', 'no unjust discrimination against any person or group'), k: L('مثال: ذكاء توظيف يقيّم بعدل بغض النظر عن الجنس', 'e.g. a hiring AI rating fairly regardless of gender') })}
  </div>
  <div id="pr-s1" class="mv-stage">
    ${B.card('glass', 70, 140, 820, 480, 'c-violet', { h: '🔎 ' + L('صندوق شفاف', 'A glass box'), html: `<ul class="l12-list"><li>① ${L('بيانات الطلب', 'the application data')}</li><li>② ${L('العوامل اللي اتحسبت', 'the factors that counted')}</li><li>③ ${L('القرار وسببه', 'the decision and its reason')}</li></ul>` })}
    ${B.card('p1', 960, 160, 900, 0, 'c-violet', { ic: '👁️', h: L('الشفافية (Transparency)', 'Transparency'), p: L('إتاحة معلومات واضحة عن النظام واستخدامه وعملية القرار وحدوده', 'showing how decisions are made and how it works inside'), k: L('مثال: الإفصاح للمستخدمين عن إزاي النظام بيقرّر', 'e.g. telling users how the system decides') })}
  </div>
  <div id="pr-s2" class="mv-stage">
    ${B.card('addr', 70, 300, 340, 0, 'c-slate', { ic: '📍', h: L('عنوانك', 'Your address') })}
    ${B.chip('to1', 520, 210, '🚚 ' + L('للتوصيل — الغرض اللي اتجمع عشانه', 'for delivery — the purpose it was collected for') + ' ✅', 'c-green big')}
    ${B.chip('to2', 520, 470, '📢 ' + L('للإعلانات', 'for adverts') + ' ❌', 'c-red big')}
    ${B.big('pk1', 300, 330, 70, 50, '📦')}${B.big('pk2', 300, 330, 70, 50, '📦')}
    ${B.card('p2', 70, 590, 1790, 0, 'c-green', { row: true, ic: '🛡️', h: L('حماية الخصوصية', 'Privacy protection'), p: L('التعامل المناسب مع المعلومات الشخصية — ماتستخدمش البيانات لغرض غير اللي اتجمعت عشانه', 'proper handling of personal data — never use it for another purpose') })}
  </div>
  <div id="pr-s3" class="mv-stage">
    ${B.card('err', 70, 150, 520, 0, 'c-red', { ic: '🩺', h: L('تشخيص الـAI طلع غلط', 'The AI diagnosis was wrong') })}
    ${B.big('arw', 620, 230, 90, 60, B.arrow, 'l12-gold')}
    ${B.ch('en', 760, 330, 'md')}
    ${B.chip('me', 640, 650, '🙋‍♂️ ' + L('«أنا المسؤول… وهصلّح»', '“I am responsible… I will fix it”'), 'c-amber big')}
    ${B.card('p3', 1160, 160, 700, 0, 'c-amber', { ic: '🙋‍♂️', h: L('المساءلة (Accountability)', 'Accountability'), p: L('تحديد الجهات المسؤولة عن النظام وقراراته وآثاره وإمكان محاسبتها', 'someone is responsible and answerable for AI decisions') })}
  </div>
  <div id="pr-s4" class="mv-stage">
    ${[['⚖️', L('العدالة', 'Fairness'), 'c-blue'], ['👁️', L('الشفافية', 'Transparency'), 'c-violet'], ['🛡️', L('الخصوصية', 'Privacy'), 'c-green'], ['🙋‍♂️', L('المساءلة', 'Accountability'), 'c-amber']]
      .map(([ic, h, c], k) => B.card('r' + k, 70 + k * 450, 160, 420, 260, c, { ic, h })).join('')}
    ${B.mid('mn', 500, '🧠 ' + L('سرّ الحفظ: عدالة · شفافية · خصوصية · مساءلة = «عَشْخَم» 😄', 'the four principles: fairness · transparency · privacy · accountability'), 'c-amber big')}
  </div>
    ${U.hd(0, '⚖️ ' + L('المبدأ ①: العدالة', 'Principle ①: fairness'))}
    ${U.hd(1, '👁️ ' + L('المبدأ ②: الشفافية', 'Principle ②: transparency'))}
    ${U.hd(2, '🛡️ ' + L('المبدأ ③: حماية الخصوصية', 'Principle ③: privacy protection'))}
    ${U.hd(3, '🙋‍♂️ ' + L('المبدأ ④: المساءلة', 'Principle ④: accountability'))}
    ${U.hd(4, '🏆 ' + L('المبادئ الأربعة لأخلاقيات الذكاء الاصطناعي', 'The four principles of AI ethics'))}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    let c = at(0);
    frame(0, c);
    IN(q('scale'), c + 0.3, 0.5);
    tl.fromTo(all('#pr-scale .beam'), { rotation: -12, svgOrigin: '200 60' }, { rotation: 0, svgOrigin: '200 60', duration: 1.2, ease: 'elastic.out(1, 0.5)' }, c + 0.8);
    IN(Q('a1 a2'), c + 1.4, 0.5, { y: 30 });
    POP(q('f1'), c + 2.4, 0.4); POP(q('f2'), c + 2.6, 0.4); SND('ok', c + 2.4);
    IN(q('p0'), c + 3.4, 0.5, { x: 40 * sx });

    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('glass'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#pr-glass li'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.6 }, c + 1.0); SND('pop', c + 1.0);
    IN(q('p1'), c + 3.2, 0.5, { x: 40 * sx });

    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('addr'), c + 0.4, 0.5, { x: -30 * sx });
    IN(Q('to1 to2'), c + 1.0, 0.4, { x: 30 * sx });
    tl.fromTo(q('pk1'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 1.8);
    tl.to(q('pk1'), { x: 260 * sx, y: -110, duration: 0.8, ease: 'power2.inOut' }, c + 2.0); SND('ok', c + 2.8);
    tl.fromTo(q('pk2'), { opacity: 0, x: 0, y: 0 }, { opacity: 1, duration: 0.2 }, c + 3.2);
    tl.to(q('pk2'), { x: 160 * sx, y: 120, duration: 0.6, ease: 'power2.in' }, c + 3.4);
    tl.to(q('pk2'), { x: 120 * sx, y: 100, rotation: -30, opacity: 0, duration: 0.4 }, c + 4.0); SND('bad', c + 4.0);
    IN(q('p2'), c + 4.8, 0.5, { y: 24 });

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('err'), c + 0.4, 0.5, { y: 24 }); SND('bad', c + 0.4);
    IN(q('arw'), c + 1.2, 0.3);
    IN(q('en'), c + 1.5, 0.5, { y: 30 }); POP(q('me'), c + 2.3, 0.5); SND('ok', c + 2.3);
    IN(q('p3'), c + 3.4, 0.5, { x: 40 * sx });

    c = at(4);
    frame(4, c);
    leave(4, c);
    range(4).forEach((k) => { POP(q('r' + k), c + 0.5 + k * 0.5, 0.5); SND('pop', c + 0.5 + k * 0.5); });
    POP(q('mn'), c + 2.8, 0.5); SND('ok', c + 2.8);

    M.loop(0, 4.2, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#pr-scale .beam'), { rotation: -2, svgOrigin: '200 60' }, { rotation: 2, svgOrigin: '200 60', duration: 1.6, ease: 'sine.inOut' }));
    M.loop(1, 4.0, () => glowCycle(all('#pr-glass li'), 'rgba(167,139,250,.9)', 0.5));
    M.loop(2, 5.6, () => M.glowLoop(q('to1'), 'rgba(52,211,153,.9)', 1.0));
    M.loop(3, 4.2, () => M.breathe(q('me'), 1.05, 1.0));
    M.loop(4, 3.6, () => glowCycle(Q('r0 r1 r2 r3'), 'rgba(251,191,36,.9)', 0.5));
    return M.done();
  });
})();

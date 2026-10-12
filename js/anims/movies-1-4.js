/* =========================================================
 * anims/movies-1-4.js — lesson 1-4 teacher-driven movies (shell:
 * movie-kit.js; each beat plays, then FREEZES).
 *   biasMovie       (station bias)       : biased past data → unfair hiring AI → fixes
 *   privacyMovie    (station privacy)    : face tracking · mass data collection · balance
 *   xaiMovie        (station xai)        : black box → explainable AI (3 ways) → responsibility
 *   principlesMovie (station principles) : fairness · transparency · privacy · accountability
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const BOX3D = (glass) => glass
    ? '<path d="M60 90 L200 30 L340 90 L200 150Z" fill="rgba(125,211,252,.18)" stroke="#7dd3fc" stroke-width="4"/><path d="M60 90 L200 150 L200 330 L60 270Z" fill="rgba(125,211,252,.12)" stroke="#7dd3fc" stroke-width="4"/><path d="M340 90 L200 150 L200 330 L340 270Z" fill="rgba(125,211,252,.08)" stroke="#7dd3fc" stroke-width="4"/>'
    : '<path d="M60 90 L200 30 L340 90 L200 150Z" fill="#334155"/><path d="M60 90 L200 150 L200 330 L60 270Z" fill="#0f172a"/><path d="M340 90 L200 150 L200 330 L340 270Z" fill="#1e293b"/>';
  const XRAY = `<rect x="10" y="10" width="420" height="420" rx="24" fill="#020617" stroke="#475569" stroke-width="6"/>
    ${range(5).map((k) => `<path d="M80 ${110 + k * 50} Q220 ${70 + k * 50} 360 ${110 + k * 50}" fill="none" stroke="#cbd5e1" stroke-width="10" opacity=".75"/>`).join('')}
    <rect x="210" y="70" width="20" height="320" rx="10" fill="#e2e8f0" opacity=".8"/>
    <defs><radialGradient id="hx"><stop offset="0" stop-color="#ef4444" stop-opacity=".95"/><stop offset=".5" stop-color="#f59e0b" stop-opacity=".6"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient></defs>
    <circle class="heat" cx="300" cy="250" r="90" fill="url(#hx)" opacity="0"/>`;

  /* ═════════════════════════ biasMovie ═════════════════════════ */
  K.defineAnim('biasMovie', (stage, props, api) => {
    const U = MK.ui('bi-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-bias mv-l14', prefix: 'bi-', beats: 6, cast: { 'ch-en': 'engineer', 'ch-a1': 'applicant', 'ch-a2': 'visitor' },
      html: (L) => `
  <div id="bi-stage" class="mv-stage">
    ${U.ch('ch-en', 40, 470, 'md')}
    ${U.bub('b0', 30, 505, 400, L('هندرّب الذكاء على قرارات التعيين القديمة', 'We’ll train the AI on our old hiring decisions') + ' 📂')}
    <div id="bi-tab" class="typed later" ${MK.S(470, 220, 700)}>📂 ${L('قرارات الماضي', 'Past decisions')}<br>● ${L('مهارات', 'skills')} 8/10 ← ${L('اتقبل', 'hired')} ✅<br>▲ ${L('مهارات', 'skills')} 8/10 ← ${L('اترفض', 'rejected')} ❌<br>● ${L('مهارات', 'skills')} 7/10 ← ${L('اتقبل', 'hired')} ✅<br>▲ ${L('مهارات', 'skills')} 7/10 ← ${L('اترفض', 'rejected')} ❌</div>
    ${U.box('i0', 1220, 220, 660, 't-red', { ic: '⚠️', h: L('المجموعة ▲ اتظلمت زمان', 'Group ▲ was treated unfairly'), p: L('رغم إن المهارات واحدة!', 'even with the same skills!') })}
    ${U.ch('ch-a1', 480, 470, 'md')}${U.ch('ch-a2', 790, 470, 'md')}
    ${U.pill('g1', 500, 400, '● 8/10', 't-blue')}${U.pill('g2', 810, 400, '▲ 8/10', 't-amber')}
    <div id="bi-l1" class="lbl later" ${MK.S(1220, 250, 90)}>●</div><div id="bi-bar1" class="bar later" ${MK.S(1310, 256, 440)}><i style="width:70%"></i></div><div id="bi-p1" class="lbl later" ${MK.S(1770, 250, 110)}>70%</div>
    <div id="bi-l2" class="lbl later" ${MK.S(1220, 330, 90)}>▲</div><div id="bi-bar2" class="bar later" ${MK.S(1310, 336, 440)}><i style="width:18%"></i></div><div id="bi-p2" class="lbl later" ${MK.S(1770, 330, 110)}>18%</div>
    ${U.box('def', 1220, 420, 660, 't-amber', { h: L('التحيز الخوارزمي', 'Algorithmic bias'), p: L('تحيّز في أحكام الـAI سببه تحيّز في بيانات التدريب', 'bias in AI judgements caused by bias in the training data') })}
    ${U.box('f1', 1220, 400, 660, 't-green', { h: '⚖️ ' + L('بيانات متوازنة', 'Balanced data'), p: L('ممثّلة لكل المجموعات', 'representing every group') })}
    ${U.box('f2', 1220, 580, 660, 't-green', { h: '🧪 ' + L('نختبر النتائج لكل مجموعة', 'Test results per group'), p: L('قبل ما نستخدم النموذج', 'before using the model') })}
    ${U.pill('eq', 480, 220, '✅ ' + L('نفس المهارات ← نفس الفرصة', 'same skills → same chance'), 't-green')}
    ${U.pill('c1', 480, 250, '👥 ' + L('عمود «المجموعة»', 'the “group” column'), 't-slate')}
    ${U.emo('cut', 900, 236, 110, 70, '✂️')}
    ${U.pill('c2', 480, 420, '🏘️ ' + L('الحي اللي ساكن فيه', 'the area you live in'), 't-red')}
    ${U.pill('c3', 480, 590, '⚽ ' + L('اسم النادي', 'the club’s name'), 't-red')}
    ${U.box('i3', 1150, 230, 730, 't-amber', { ic: '🕵️', h: L('المتغيّر الوسيط', 'The proxy variable'), p: L('متغيّر مرتبط بالمجموعة ممكن يرجّع التحيز حتى لو شلناها', 'a variable linked to the group can bring bias back even after removing it'), s: L('والتحيز ممكن يدخل من اختيار المتغيرات أو تصميم النموذج', 'bias can also enter through variable choice or model design') })}
    ${U.box('e1', 470, 240, 700, 't-red', { ic: '💼', h: L('ذكاء توظيف', 'A hiring AI'), p: L('بيقيّم جنس معيّن بشكل غير عادل لأن قرارات الماضي كانت كده', 'rates one gender unfairly because past decisions did') })}
    ${U.box('e2', 1190, 240, 690, 't-red', { ic: '🙂', h: L('التعرّف على الوجه', 'Face recognition'), p: L('بيغلط أكتر مع مجموعات عرقية معيّنة لأن صورها كانت قليلة في التدريب', 'errs more with some ethnic groups whose photos were few in training') })}

    ${U.hd(0, '🏢 ' + L('ذكاء توظيف اتدرّب على قرارات الماضي', 'A hiring AI trained on past decisions'))}
    ${U.hd(1, '🤖 ' + L('النموذج اتعلّم الظلم… وكرّره', 'The model learned the unfairness… and repeated it'))}
    ${U.hd(2, '🔧 ' + L('نقلّل التحيز إزاي؟', 'How do we reduce bias?'))}
    ${U.hd(3, '🕵️ ' + L('فخ المتغيّر الوسيط', 'The proxy-variable trap'))}
    ${U.hd(4, '🌍 ' + L('أمثلة حقيقية', 'Real examples'))}
    ${U.nt(1, L('70% مقابل 18% — لنفس المهارات!', '70% vs 18% — for the same skills!'), 'bad')}
  </div>
  <div id="bi-recap" class="mv-recap">
    ${U.hd(5, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.box('r1', 1290, 140, 540, 't-red', { ic: '📂', h: L('السبب', 'The cause'), p: L('تحيّز بيانات التدريب (ناقصة أو فيها تمييز قديم)', 'biased training data (missing or old discrimination)') })}
    ${U.box('r2', 690, 140, 540, 't-green', { ic: '⚖️', h: L('العلاج', 'The fix'), p: L('بيانات متوازنة + اختبار لكل مجموعة', 'balanced data + testing per group') })}
    ${U.box('r3', 90, 140, 540, 't-amber', { ic: '🕵️', h: L('الفخ', 'The trap'), p: L('المتغيّر الوسيط يرجّع التحيز', 'a proxy variable brings bias back') })}
    ${U.rp('rp1', 520, '⚠️ ' + L('السبب مش بطء الحاسب ولا ضعف الإنترنت', 'The cause is NOT a slow computer or weak Internet'), 't-red')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — past decisions */
    let c = at(0);
    frame(0, c);
    IN(q('ch-en'), c + 0.3, 0.6, { x: -80 });
    IN(q('b0'), c + 0.9, 0.4, { y: 14 });
    IN(q('tab'), c + 1.6, 0.5, { y: 20 }); SND('pop', c + 1.6);
    IN(q('i0'), c + 3.6, 0.5, { x: 40 }); SND('bad', c + 3.6);

    /* 1 — the model learned it */
    c = at(1);
    frame(1, c, 6.0);
    OUT(Q('b0 tab i0'), c, 0.4);
    IN(q('ch-a1'), c + 0.5, 0.5, { x: -40 }); IN(q('ch-a2'), c + 0.7, 0.5, { x: 40 });
    POP(Q('g1 g2'), c + 1.3, 0.4);
    IN(Q('l1 l2'), c + 2.0, 0.3);
    tl.fromTo(Q('bar1 bar2'), { opacity: 0, scaleX: 0, transformOrigin: M.rtl ? '100% 50%' : '0% 50%' }, { opacity: 1, scaleX: 1, duration: 0.7, stagger: 0.3 }, c + 2.1);
    IN(Q('p1 p2'), c + 2.9, 0.3); SND('bad', c + 2.9);
    tl.to(all('#bi-ch-a2 .m-smile'), { opacity: 0, duration: 0.1 }, c + 3.0); tl.to(all('#bi-ch-a2 .m-sad'), { opacity: 1, duration: 0.1 }, c + 3.0);
    IN(q('def'), c + 4.0, 0.5, { y: 20 });

    /* 2 — fixes */
    c = at(2);
    frame(2, c);
    OUT(Q('def p1 p2'), c, 0.3);
    IN(q('f1'), c + 0.6, 0.5, { y: 20 }); SND('pop', c + 0.6);
    IN(q('f2'), c + 1.6, 0.5, { y: 20 }); SND('pop', c + 1.6);
    tl.to(all('#bi-bar1 i'), { width: '55%', duration: 0.8 }, c + 2.8);
    tl.to(all('#bi-bar2 i'), { width: '55%', duration: 0.8 }, c + 2.8);
    tl.to(all('#bi-ch-a2 .m-smile'), { opacity: 1, duration: 0.1 }, c + 3.6); tl.to(all('#bi-ch-a2 .m-sad'), { opacity: 0, duration: 0.1 }, c + 3.6);
    POP(q('eq'), c + 3.8, 0.5); SND('ok', c + 3.8);

    /* 3 — proxy variable */
    c = at(3);
    frame(3, c);
    OUT(Q('ch-a1 ch-a2 g1 g2 l1 l2 bar1 bar2 f1 f2 eq'), c, 0.4);
    IN(q('c1'), c + 0.6, 0.4, { x: -30 });
    POP(q('cut'), c + 1.4, 0.4); SND('pop', c + 1.4);
    tl.to(q('c1'), { opacity: 0.3, duration: 0.4 }, c + 1.8);
    IN(q('c2'), c + 2.6, 0.4, { x: -30 }); IN(q('c3'), c + 3.2, 0.4, { x: -30 }); SND('bad', c + 2.6);
    tl.fromTo(Q('c2 c3'), { boxShadow: '0 0 0 rgba(248,113,113,0)' }, { boxShadow: '0 0 36px rgba(248,113,113,.95)', duration: 0.4, yoyo: true, repeat: 3 }, c + 3.6);
    IN(q('i3'), c + 4.2, 0.5, { x: 40 });

    /* 4 — real examples */
    c = at(4);
    frame(4, c);
    OUT(Q('c1 cut c2 c3 i3'), c, 0.4);
    IN(q('e1'), c + 0.7, 0.5, { y: 30 }); SND('bad', c + 0.7);
    IN(q('e2'), c + 2.0, 0.5, { y: 30 }); SND('bad', c + 2.0);

    /* 5 — recap */
    c = at(5);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd5'), c + 0.6, 0.5, { y: -30 });
    Q('r1 r2 r3').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.6, { y: 30 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('rp1'), c + 3.2, 0.6); SND('bad', c + 3.2);
    return M.done();
  });

  /* ═════════════════════════ privacyMovie ═════════════════════════ */
  K.defineAnim('privacyMovie', (stage, props, api) => {
    const U = MK.ui('pv-');
    const d = MK.RTL() ? 720 : 0; // RTL: the first of a pair sits on the right
    const M = MK.create(stage, api, { props,
      cls: 'mv-priv mv-l14', prefix: 'pv-', beats: 5, cast: { 'ch-st': 'student' },
      html: (L) => `
  <div id="pv-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.emo('cam', 300, 150, 130, 90, '📹')}
    ${[['🏫', L('المدرسة', 'school'), '9:00'], ['🛒', L('السوق', 'market'), '13:00'], ['🏠', L('البيت', 'home'), '17:00']]
      .map(([e, p, t], k) => { const j = d ? 2 - k : k; return `${U.emo('pl' + k, 560 + j * 430, 210, 130, 80, e)}${U.pill('pt' + k, 520 + j * 430, 320, `${p} · <bdi>${t}</bdi>`, 't-slate')}${U.pill('lg' + k, 520 + j * 430, 400, '👤 ' + L('اتعرّف عليه', 'identified') + ' ✔', 't-red')}`; }).join('')}
    ${U.bub('b0', 30, 505, 400, L('الكاميرات عارفة أنا كنت فين طول اليوم!', 'The cameras know where I was all day!') + ' 😳')}

    ${U.emo('ph', 506, 260, 172, 120, '📱')}
    ${[['👍', L('لايكات', 'likes')], ['🔍', L('بحث', 'searches')], ['📍', L('مكان', 'location')], ['🛍️', L('مشتريات', 'purchases')]]
      .map(([e, t], k) => U.pill('dt' + k, 700, 230 + k * 90, `${e} ${t}`, 't-amber')).join('')}
    ${U.box('pf', 1180, 230, 700, 't-red', { ic: '🗂️', h: L('ملف ضخم عنك', 'A huge file about you'), p: L('بيانات سلوكك على الإنترنت بتتجمع وتتحلّل بكميات ضخمة', 'your online behaviour is collected and analysed in huge amounts') })}

    ${U.emo('scale', 866, 220, 240, 150, '⚖️')}
    ${U.pill('s1', 480, 300, '🛡️ ' + L('أمان', 'safety') + ' · 😌 ' + L('راحة', 'comfort'), 't-green')}
    ${U.pill('s2', 1180, 300, '🔒 ' + L('خصوصية', 'privacy'), 't-red')}
    ${U.pill('qa', 480, 470, '❓ ' + L('مين يشوف البيانات؟', 'Who may see the data?'), 't-amber')}
    ${U.pill('qb', 1000, 470, '⏳ ' + L('لحد إمتى تتخزّن؟', 'How long is it kept?'), 't-amber')}

    ${U.box('pr', 1180, 230, 700, 't-green', { ic: '🔒', h: L('حماية الخصوصية', 'Privacy protection'), p: L('نتعامل مع البيانات بشكل مناسب: يتشارك بس اللي لازم ولغرض واضح', 'handle data properly: share only what is needed, for a clear purpose') })}
    ${U.pill('o1', 480, 240, '📍 ' + L('المكان ← للتوصيل بس', 'location → delivery only'), 't-green')}
    ${U.pill('o2', 480, 340, '📷 ' + L('الكاميرا ← للتطبيق ده بس', 'camera → this app only'), 't-green')}
    ${U.pill('o3', 480, 440, '📇 ' + L('جهات الاتصال ← مش محتاجها', 'contacts → not needed') + ' ❌', 't-red')}

    ${U.box('y1', 470 + d, 240, 700, 't-red', { ic: '✅', h: L('قضايا خصوصية', 'Privacy issues'), p: L('تتبّع الأفراد بالتعرّف على الوجه · جمع البيانات الشخصية بكميات ضخمة', 'tracking people by face recognition · mass collection of personal data') })}
    ${U.box('y2', 1190 - d, 240, 690, 't-slate', { ic: '❌', h: L('مش قضايا خصوصية', 'NOT privacy issues'), p: L('«الـAI بيعمل أعمال إبداعية» · «سرعته زادت»', '“AI makes creative works” · “it got faster”') })}

    ${U.hd(0, '📹 ' + L('المراقبة بالتعرّف على الوجه', 'Surveillance by face recognition'))}
    ${U.hd(1, '🗂️ ' + L('الجمع الضخم للبيانات الشخصية', 'Mass collection of personal data'))}
    ${U.hd(2, '⚖️ ' + L('أمان وراحة… ولا خصوصية؟', 'Safety and convenience… or privacy?'))}
    ${U.hd(3, '🔒 ' + L('حماية الخصوصية: إنت اللي تتحكّم', 'Privacy protection: you are in control'))}
    ${U.hd(4, '⚠️ ' + L('فخ الامتحان', 'Exam trap'))}
    ${U.nt(0, L('الكاميرات تقدر تتعرّف على الأفراد وتتبّعهم: مين · فين · إمتى', 'Cameras can identify and track people: who · where · when'), 'bad')}
    ${U.nt(2, L('التوازن محتاج قواعد واضحة', 'The balance needs clear rules'), 'warn')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;

    /* 0 — face tracking */
    let c = at(0);
    frame(0, c, 7.0);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    POP(q('cam'), c + 0.8, 0.4);
    range(3).forEach((k) => {
      const t = c + 1.4 + k * 1.6;
      POP(q('pl' + k), t, 0.4); IN(q('pt' + k), t + 0.2, 0.3);
      POP(q('lg' + k), t + 0.8, 0.4); SND('bad', t + 0.8);
    });
    IN(q('b0'), c + 6.4, 0.4, { y: 14 });

    /* 1 — mass data */
    c = at(1);
    frame(1, c);
    OUT(Q('cam pl0 pl1 pl2 pt0 pt1 pt2 lg0 lg1 lg2 b0'), c, 0.4);
    POP(q('ph'), c + 0.6, 0.4);
    range(4).forEach((k) => { IN(q('dt' + k), c + 1.0 + k * 0.5, 0.4, { x: -40 }); SND('pop', c + 1.0 + k * 0.5); });
    IN(q('pf'), c + 3.4, 0.5, { x: 40 }); SND('bad', c + 3.4);
    tl.fromTo(q('pf'), { boxShadow: '0 0 0 rgba(248,113,113,0)' }, { boxShadow: '0 0 46px rgba(248,113,113,.9)', duration: 0.4, yoyo: true, repeat: 3 }, c + 4.0);

    /* 2 — the balance */
    c = at(2);
    frame(2, c, 5.4);
    OUT(Q('ph dt0 dt1 dt2 dt3 pf'), c, 0.4);
    POP(q('scale'), c + 0.6, 0.5);
    tl.fromTo(q('scale'), { rotation: 0 }, { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 30%' }, c + 1.2);
    IN(q('s1'), c + 1.4, 0.4, { x: -30 }); IN(q('s2'), c + 2.0, 0.4, { x: 30 });
    IN(q('qa'), c + 3.2, 0.4, { y: 20 }); IN(q('qb'), c + 3.8, 0.4, { y: 20 }); SND('pop', c + 3.2);

    /* 3 — protection */
    c = at(3);
    frame(3, c);
    OUT(Q('scale s1 s2 qa qb'), c, 0.4);
    IN(q('pr'), c + 0.6, 0.5, { x: 40 });
    Q('o1 o2 o3').forEach((o, i) => { IN(o, c + 1.6 + i * 0.8, 0.4, { x: -30 }); SND(i === 2 ? 'bad' : 'ok', c + 1.6 + i * 0.8); });

    /* 4 — trap */
    c = at(4);
    frame(4, c);
    OUT(Q('pr o1 o2 o3 ch-st'), c, 0.4);
    IN(q('y1'), c + 0.7, 0.5, { y: 30 }); SND('ok', c + 0.7);
    IN(q('y2'), c + 2.0, 0.5, { y: 30 }); SND('bad', c + 2.0);
    return M.done();
  });

  /* ═════════════════════════ xaiMovie ═════════════════════════ */
  K.defineAnim('xaiMovie', (stage, props, api) => {
    const U = MK.ui('xa-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-xai mv-l14', prefix: 'xa-', beats: 6, cast: { 'ch-ap': 'applicant', 'ch-dr': 'doctor' },
      html: (L) => `
  <div id="xa-stage" class="mv-stage">
    ${U.ch('ch-ap', 40, 470, 'md')}${U.ch('ch-dr', 40, 470, 'md')}
    ${U.pill('in', 470, 380, '📄 ' + L('طلب وظيفة', 'job application'), 'solid')}
    ${U.art('bx', 820, 200, 400, 360, '0 0 400 360', BOX3D(false))}
    ${U.art('gl', 820, 200, 400, 360, '0 0 400 360', BOX3D(true))}
    ${U.emo('qm', 954, 300, 132, 90, '❓')}
    ${U.pill('out', 1300, 380, '❌ ' + L('مرفوض', 'rejected'), 't-red')}
    ${U.bub('b0', 30, 505, 400, L('ليه اترفضت؟! محدش عارف يقولّي', 'Why was I rejected?! Nobody can tell me') + ' 😟')}
    ${U.pill('fz', 1300, 240, '🏘️ ' + L('السبب: «الحي اللي ساكن فيه»', 'reason: “the area you live in”'), 't-red')}
    ${U.pill('fx', 1300, 520, '🔧 ' + L('تحيّز! نشيله ونصلّح', 'bias! remove it and fix'), 't-green')}
    ${U.box('d1', 1300, 230, 580, 't-blue', { ic: '🔍', h: 'XAI', p: L('تقنية بتخلّي البشر يفهموا ليه الـAI أخد حكم معيّن', 'lets humans understand why the AI made a judgement') })}

    ${[[L('الخبرة', 'experience'), 70, 'ok'], [L('المهارات', 'skills'), 55, 'ok'], [L('الشهادة', 'degree'), 30, 'ok'], [L('الحي', 'area'), 80, 'bad']]
      .map(([t, w, cl], k) => `<div id="xa-fl${k}" class="lbl later" ${MK.S(480, 240 + k * 90, 170)}>${t}</div><div id="xa-fb${k}" class="bar ${cl} later" ${MK.S(660, 246 + k * 90, 520)}><i style="width:${w}%"></i></div>`).join('')}
    ${U.box('m1', 1230, 230, 650, 't-amber', { ic: '①', h: L('أهمية كل عامل', 'Importance of each factor'), p: L('كل عامل أثّر قد إيه في القرار', 'how much each factor weighed in the decision') })}
    ${U.pill('cf', 470, 260, '② ' + L('لو خبرتك 3 سنين… كنت اتقبلت', '3 years’ experience → hired') + ' ✅', 't-green')}
    ${U.box('m2', 1230, 230, 650, 't-green', { ic: '②', h: L('«لو كان… كان اتقبل»', '“If… then accepted”'), p: L('أصغر تغيير كان هيقلب النتيجة', 'the smallest change that flips the result') })}
    ${U.bub('b3', 30, 505, 400, L('تمام… كده فاهم وأقدر أتحسّن!', 'OK… now I understand and can improve!') + ' 💪')}
    ${U.art('xr', 480, 200, 440, 440, '0 0 440 440', XRAY)}
    ${U.box('m3', 1230, 230, 650, 't-red', { ic: '③', h: L('الخريطة الحرارية', 'Heat map'), p: L('بيلوّن المكان اللي بنى عليه التشخيص', 'colours the area the diagnosis was based on') })}
    ${U.bub('b4', 30, 505, 400, L('المكان ده منطقي… أوافق', 'That area makes sense… I agree') + ' ✅')}
    ${[['👨‍💻', L('المطوّر', 'Developer')], ['👤', L('المستخدِم', 'User')], ['🏢', L('المشغِّل', 'Operator')]]
      .map(([ic, h], k) => U.box('w' + k, 470 + (MK.RTL() ? 2 - k : k) * 480, 230, 450, 't-violet', { ic, h })).join('')}
    ${U.pill('nw', 470, 480, '❓ ' + L('لسه مفيش معيار واضح متّفق عليه', 'there is still no clear agreed standard'), 't-amber')}

    ${U.hd(0, '⬛ ' + L('الصندوق الأسود: قرار من غير «ليه»', 'The black box: a decision with no “why”'))}
    ${U.hd(1, '🔍 ' + L('XAI: الصندوق بقى شفاف', 'XAI: the box becomes transparent'))}
    ${U.hd(2, '① ' + L('XAI بيشرح: أهمية كل عامل', 'XAI explains: factor importance'))}
    ${U.hd(3, '② ' + L('XAI بيشرح: «لو كان… كان»', 'XAI explains: “what if…”'))}
    ${U.hd(4, '③ ' + L('XAI بيشرح: الخريطة الحرارية', 'XAI explains: the heat map'))}
    ${U.hd(5, '⚖️ ' + L('لو الـAI غلط… مين المسؤول؟', 'If AI is wrong… who is responsible?'))}
    ${U.nt(0, L('حتى لو النتيجة طلعت صح بالصدفة… الغموض بيمنع التحقّق', 'Even if the result is right by chance… the mystery blocks checking'), 'warn')}
    ${U.nt(2, '⚠️ ' + L('لو لقينا «الحي» مأثّر — ده تحيّز لازم يتشال!', 'If “the area” matters — that is bias to remove!'), 'bad')}
    ${U.nt(5, 'XAI ← ' + L('الشفافية + العدالة (نكتشف التحيّز) + المساءلة', 'transparency + fairness (spot bias) + accountability'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — black box */
    let c = at(0);
    frame(0, c, 6.4);
    IN(q('ch-ap'), c + 0.3, 0.6, { x: -80 });
    IN(q('in'), c + 0.8, 0.4, { x: -30 }); IN(q('bx'), c + 1.0, 0.5, { scale: 0.85 });
    tl.to(q('in'), { x: 360, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 1.8);
    POP(q('qm'), c + 2.6, 0.4);
    POP(q('out'), c + 3.4, 0.4); SND('bad', c + 3.4);
    M.mood('ch-ap', true, c + 3.6);
    IN(q('b0'), c + 4.4, 0.4, { y: 14 });

    /* 1 — XAI opens the box */
    c = at(1);
    frame(1, c);
    OUT(Q('b0 qm out'), c, 0.3);
    tl.to(q('bx'), { opacity: 0, duration: 0.6 }, c + 0.6); IN(q('gl'), c + 0.6, 0.6);
    IN(q('d1'), c + 1.4, 0.5, { x: 40 });
    OUT(q('d1'), c + 4.0, 0.3);
    POP(q('fz'), c + 4.4, 0.4); SND('bad', c + 4.4);
    POP(q('fx'), c + 5.6, 0.4); SND('ok', c + 5.6);
    M.mood('ch-ap', false, c + 5.8);

    /* 2 — factor importance */
    c = at(2);
    frame(2, c, 5.0);
    OUT(Q('gl fz fx'), c, 0.4);
    IN(q('m1'), c + 0.6, 0.5, { x: 40 });
    range(4).forEach((k) => {
      IN(q('fl' + k), c + 1.2 + k * 0.5, 0.3);
      tl.fromTo(q('fb' + k), { opacity: 0, scaleX: 0, transformOrigin: M.rtl ? '100% 50%' : '0% 50%' }, { opacity: 1, scaleX: 1, duration: 0.5 }, c + 1.2 + k * 0.5);
    });
    tl.fromTo(q('fb3'), { boxShadow: '0 0 0 rgba(248,113,113,0)' }, { boxShadow: '0 0 30px rgba(248,113,113,.95)', duration: 0.4, yoyo: true, repeat: 3 }, c + 3.4); SND('bad', c + 3.4);

    /* 3 — counterfactual */
    c = at(3);
    frame(3, c);
    OUT(Q('m1 fl0 fl1 fl2 fl3 fb0 fb1 fb2 fb3'), c, 0.4);
    IN(q('m2'), c + 0.6, 0.5, { x: 40 });
    POP(q('cf'), c + 1.6, 0.5); SND('ok', c + 1.6);
    IN(q('b3'), c + 3.0, 0.4, { y: 14 });

    /* 4 — heat map (the doctor) */
    c = at(4);
    frame(4, c);
    OUT(Q('m2 cf b3 ch-ap'), c, 0.4);
    IN(q('ch-dr'), c + 0.5, 0.5, { x: -80 });
    IN(q('xr'), c + 0.8, 0.5);
    IN(q('m3'), c + 1.2, 0.5, { x: 40 });
    tl.to(all('#xa-xr .heat'), { opacity: 1, duration: 0.8 }, c + 2.2); SND('pop', c + 2.2);
    tl.fromTo(all('#xa-xr .heat'), { attr: { r: 70 } }, { attr: { r: 95 }, duration: 0.5, yoyo: true, repeat: 3 }, c + 3.0);
    IN(q('b4'), c + 4.0, 0.4, { y: 14 });

    /* 5 — responsibility */
    c = at(5);
    frame(5, c, 5.0);
    OUT(Q('xr m3 b4 ch-dr'), c, 0.4);
    range(3).forEach((k) => { IN(q('w' + k), c + 0.7 + k * 0.6, 0.5, { y: 30 }); SND('pop', c + 0.7 + k * 0.6); });
    POP(q('nw'), c + 3.0, 0.5);
    return M.done();
  });

  /* ═════════════════════════ principlesMovie ═════════════════════════ */
  K.defineAnim('principlesMovie', (stage, props, api) => {
    const U = MK.ui('pr-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-prin mv-l14', prefix: 'pr-', beats: 5, cast: { 'ch-a1': 'applicant', 'ch-a2': 'visitor', 'ch-dr': 'doctor' },
      html: (L) => `
  <div id="pr-stage" class="mv-stage">
    ${U.ch('ch-a1', 470, 470, 'md')}${U.ch('ch-a2', 790, 470, 'md')}${U.ch('ch-dr', 470, 470, 'md')}
    ${U.pill('ok1', 490, 400, '✅ ' + L('اتقيّم بعدل', 'fairly rated'), 't-green')}${U.pill('ok2', 810, 400, '✅ ' + L('اتقيّم بعدل', 'fairly rated'), 't-green')}
    ${U.box('p0', 1120, 230, 760, 't-blue', { ic: '⚖️', h: L('العدالة (Fairness)', 'Fairness'), p: L('عدم التمييز ظلمًا ضد أي شخص أو مجموعة', 'no unjust discrimination against any person or group'), s: L('مثال: ذكاء توظيف يقيّم بعدل بغضّ النظر عن الجنس', 'e.g. a hiring AI that rates fairly regardless of gender') })}
    ${U.pill('t1', 480, 250, '① ' + L('بيانات الطلب', 'the application data'), 't-slate')}
    ${U.pill('t2', 480, 350, '② ' + L('العوامل اللي اتحسبت', 'the factors counted'), 't-slate')}
    ${U.pill('t3', 480, 450, '③ ' + L('القرار وسببه', 'the decision and why'), 't-slate')}
    ${U.box('p1', 1120, 230, 760, 't-violet', { ic: '👁️', h: L('الشفافية (Transparency)', 'Transparency'), p: L('إظهار عملية اتخاذ القرار وطريقة الشغل الداخلية بوضوح', 'showing how decisions are made and how it works inside'), s: L('مثال: الإفصاح للمستخدمين عن إزاي النظام بيقرّر', 'e.g. telling users how the system decides') })}
    ${U.pill('dd', 480, 260, '📍 ' + L('عنوانك', 'your address'), 'solid')}
    ${U.pill('u1', 480, 380, '🚚 ' + L('للتوصيل (الغرض اللي اتجمع عشانه)', 'for delivery (its purpose)') + ' ✅', 't-green')}
    ${U.pill('u2', 480, 480, '📢 ' + L('للإعلانات', 'for ads') + ' ❌', 't-red')}
    ${U.box('p2', 1120, 230, 760, 't-green', { ic: '🛡️', h: L('حماية الخصوصية', 'Privacy protection'), p: L('التعامل المناسب مع المعلومات الشخصية', 'proper handling of personal information'), s: L('مثال: ماتستخدمش البيانات لغرض غير اللي اتجمعت عشانه', 'e.g. never use data for another purpose than collected for') })}
    ${U.pill('a1', 664, 260, '🤖 ' + L('تشخيص طلع غلط', 'a wrong diagnosis'), 't-red')}
    ${U.pill('a2', 664, 370, '🙋 ' + L('فيه حد مسؤول ويتحاسب', 'someone answers for it'), 't-green')}
    ${U.box('p3', 1120, 230, 760, 't-amber', { ic: '🙋', h: L('المساءلة (Accountability)', 'Accountability'), p: L('إن يكون فيه حد مسؤول وقابل للمحاسبة عن قرارات الـAI', 'someone responsible and answerable for AI decisions'), s: L('مثال: المحاسبة لما تشخيص الـAI يطلع غلط', 'e.g. accountability when an AI diagnosis is wrong') })}
    ${U.hd(0, '⚖️ ' + L('المبدأ ①: العدالة', 'Principle ①: fairness'))}
    ${U.hd(1, '👁️ ' + L('المبدأ ②: الشفافية', 'Principle ②: transparency'))}
    ${U.hd(2, '🛡️ ' + L('المبدأ ③: حماية الخصوصية', 'Principle ③: privacy protection'))}
    ${U.hd(3, '🙋 ' + L('المبدأ ④: المساءلة', 'Principle ④: accountability'))}
  </div>
  <div id="pr-recap" class="mv-recap">
    ${U.hd(4, '💡 ' + L('المبادئ الأربعة لأخلاقيات الذكاء الاصطناعي', 'The four principles of AI ethics'))}
    ${[['⚖️', L('العدالة', 'Fairness'), 't-blue'], ['👁️', L('الشفافية', 'Transparency'), 't-violet'], ['🛡️', L('الخصوصية', 'Privacy'), 't-green'], ['🙋', L('المساءلة', 'Accountability'), 't-amber']]
      .map(([ic, h, th], k) => U.box('r' + k, (MK.RTL() ? 3 - k : k) * 440 + 90, 150, 410, th, { ic, h })).join('')}
    ${U.rp('rp1', 470, '🧠 ' + L('سرّ الحفظ: عدالة · شفافية · خصوصية · مساءلة = «عَشْخَم» 😄', 'Remember: Fairness · Transparency · Privacy · Accountability'), 't-amber')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;

    /* 0 — fairness */
    let c = at(0);
    frame(0, c);
    IN(q('ch-a1'), c + 0.4, 0.5, { x: -40 }); IN(q('ch-a2'), c + 0.6, 0.5, { x: 40 });
    IN(q('p0'), c + 1.2, 0.5, { x: 40 });
    POP(Q('ok1 ok2'), c + 2.8, 0.4); SND('ok', c + 2.8);

    /* 1 — transparency */
    c = at(1);
    frame(1, c);
    OUT(Q('ch-a1 ch-a2 ok1 ok2 p0'), c, 0.4);
    IN(q('p1'), c + 0.6, 0.5, { x: 40 });
    Q('t1 t2 t3').forEach((t, i) => { IN(t, c + 1.6 + i * 0.7, 0.4, { x: -30 }); SND('pop', c + 1.6 + i * 0.7); });

    /* 2 — privacy protection */
    c = at(2);
    frame(2, c);
    OUT(Q('p1 t1 t2 t3'), c, 0.4);
    IN(q('p2'), c + 0.6, 0.5, { x: 40 });
    POP(q('dd'), c + 1.4, 0.4);
    IN(q('u1'), c + 2.2, 0.4, { y: 20 }); SND('ok', c + 2.2);
    IN(q('u2'), c + 3.2, 0.4, { y: 20 }); SND('bad', c + 3.2);

    /* 3 — accountability */
    c = at(3);
    frame(3, c);
    OUT(Q('p2 dd u1 u2'), c, 0.4);
    IN(q('ch-dr'), c + 0.5, 0.5, { x: -40 });
    IN(q('p3'), c + 0.8, 0.5, { x: 40 });
    IN(q('a1'), c + 1.8, 0.4, { x: -20 }); SND('bad', c + 1.8);
    IN(q('a2'), c + 3.0, 0.4, { x: -20 }); SND('ok', c + 3.0);

    /* 4 — recap */
    c = at(4);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd4'), c + 0.6, 0.5, { y: -30 });
    range(4).forEach((k) => { IN(q('r' + k), c + 1.0 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 1.0 + k * 0.5); });
    POP(q('rp1'), c + 3.4, 0.6); SND('ok', c + 3.4);
    return M.done();
  });
})();

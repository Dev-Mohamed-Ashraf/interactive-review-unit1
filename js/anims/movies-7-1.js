/* =========================================================
 * anims/movies-7-1.js — lesson 7-1 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   mlMovie : conventional programming vs ML · where ML fits · the three
 *             types · classification (labels → boundary) · features ·
 *             clustering · reinforcement (state/action/reward) · bias ·
 *             black box + human in the loop
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  /* labelled points (two classes) + a learned boundary + one new point */
  const PTS = [[80, 90], [130, 60], [110, 150], [170, 110], [70, 200], [150, 190], [210, 70], [380, 260], [430, 300], [470, 220], [360, 330], [500, 320], [420, 190], [330, 280]];
  const CLS = `<rect x="4" y="4" width="592" height="392" rx="22" fill="rgba(15,23,42,.85)" stroke="#475569" stroke-width="4"/>
    <path class="bnd" d="M40 330 L560 60" stroke="#fbbf24" stroke-width="6" stroke-dasharray="14 10"/>
    ${PTS.map(([x, y], k) => `<circle class="lp ${k < 7 ? 'ca' : 'cb'}" cx="${x}" cy="${y}" r="17" fill="#64748b"/>`).join('')}
    <circle class="nw" cx="250" cy="120" r="22" fill="#94a3b8" stroke="#fff" stroke-width="4"/>`;
  /* unlabelled points → three clusters */
  const CL3 = range(18).map((k) => ({ x: 90 + ((k * 137) % 420), y: 70 + ((k * 89) % 260), g: k % 3 }));
  const CEN = [[150, 120], [440, 110], [300, 300]];
  const CLU = `<rect x="4" y="4" width="592" height="392" rx="22" fill="rgba(15,23,42,.85)" stroke="#475569" stroke-width="4"/>
    ${CL3.map((p, k) => `<circle class="up g${p.g}" data-k="${k}" cx="${p.x}" cy="${p.y}" r="15" fill="#94a3b8"/>`).join('')}`;
  /* reinforcement: a 5×3 grid world */
  /* columns mirror in Arabic so the robot starts on the reading side */
  const GRID = () => { const C = (col) => 24 + (MK.RTL() ? 4 - col : col) * 112; return `<rect x="4" y="4" width="592" height="352" rx="22" fill="rgba(15,23,42,.85)" stroke="#475569" stroke-width="4"/>
    ${range(15).map((k) => `<rect x="${24 + (k % 5) * 112}" y="${24 + Math.floor(k / 5) * 108}" width="104" height="100" rx="12" fill="${k === 7 ? 'rgba(248,113,113,.35)' : 'rgba(51,65,85,.6)'}"/>`).join('')}
    <text x="${C(4) + 52}" y="${24 + 2 * 108 + 66}" text-anchor="middle" font-size="56">🏁</text>
    <text x="${C(2) + 52}" y="${24 + 1 * 108 + 66}" text-anchor="middle" font-size="52">🕳️</text>`; };

  K.defineAnim('mlMovie', (stage, props, api) => {
    const U = MK.uiL('l1-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l71', prefix: 'l1-', beats: 10, cast: { 'ch-t': 'engineer' },
      html: (L) => `
  <div id="l1-stage" class="mv-stage">
    ${U.pill('cvh', 90, 170, '🧑‍💻 ' + L('البرمجة التقليدية', 'Conventional programming'), 't-slate')}
    ${U.box('cv1', 90, 250, 520, 't-slate', { h: '📜 ' + L('قواعد', 'Rules') + ' + 📥 ' + L('بيانات', 'Data'), p: L('الإنسان بيكتب القواعد', 'humans write the rules') })}
    ${U.emo('cva', 640, 270, 120, 70, L('⬅', '➜'))}
    ${U.box('cv2', 790, 250, 420, 't-slate', { ic: '💻', h: L('← إجابات', '→ answers') })}
    ${U.pill('mlh', 90, 460, '🤖 ' + L('تعلّم الآلة', 'Machine learning'), 't-violet')}
    ${U.box('ml1', 90, 540, 520, 't-violet', { h: '📥 ' + L('بيانات', 'Data') + ' + ✅ ' + L('إجابات', 'Answers'), p: L('أمثلة كتير', 'lots of examples') })}
    ${U.emo('mla', 640, 560, 120, 70, L('⬅', '➜'))}
    ${U.box('ml2', 790, 540, 420, 't-violet', { ic: '💻', h: L('← يلاقي القواعد بنفسه', '→ finds the rules itself') })}
    ${U.box('mld', 1290, 300, 540, 't-amber', { ic: '🧠', h: L('تعلّم الآلة', 'Machine learning'), p: L('يتعلّم أنماط من بيانات كتير عشان يحكم على بيانات جديدة', 'learns patterns from big data to judge new data'), s: L('أشهر طريقة لتشغيل الذكاء الاصطناعي', 'the most common way AI works') })}

    ${[['🐶🐱', L('الصورة كلب ولا قطة؟', 'Dog or cat in the photo?')], ['📧', L('الإيميل مزعج؟', 'Is the email spam?')], ['🎙️', L('صوت ← نص', 'Speech → text')]]
      .map(([e, t], k) => U.box('u' + k, 90 + k * 420, 190, 380, 't-green', { ic: e, p: t })).join('')}
    ${U.pill('uw', 90, 420, '✅ ' + L('القواعد أعقد من إن الإنسان يكتبها ← سيب الجهاز يتعلّم من الأمثلة', 'Rules too complex to write → let the computer learn from examples'), 't-green')}
    ${U.box('nx', 1390, 190, 440, 't-red', { ic: '➕', p: L('جمع رقمين = قاعدة بسيطة ← مش محتاج تعلّم آلة', 'adding two numbers = a simple rule → no ML needed') })}

    ${U.box('t0', 70, 180, 570, 't-blue', { ic: '🏷️', h: L('خاضع للإشراف', 'Supervised'), p: L('إدخال + إجابة صحيحة (وسم)', 'input + correct answer (label)'), s: '→ ' + L('قواعد للتنبّؤ بالإجابة', 'rules to predict the answer') })}
    ${U.box('t1', 675, 180, 570, 't-green', { ic: '📦', h: L('غير خاضع للإشراف', 'Unsupervised'), p: L('إدخال بس (من غير إجابات)', 'input only (no answers)'), s: '→ ' + L('بنية أو مجموعات مستخبية', 'hidden structure or groups') })}
    ${U.box('t2', 1280, 180, 570, 't-amber', { ic: '🎮', h: L('معزَّز', 'Reinforcement'), p: L('أفعال ونتايجها (مكافآت)', 'actions and their results (rewards)'), s: '→ ' + L('يختار أفعال أحسن', 'how to choose better actions') })}
    ${U.pill('tq', 230, 520, '🧭 ' + L('عندك إجابات؟ إشراف · مفيش وعايز مجموعات؟ غير إشراف · تجربة وخطأ؟ معزَّز', 'Labels? supervised · none, want groups? unsupervised · trial & error? reinforcement'), 'solid')}

    ${U.art('cls', 90, 170, 600, 400, '0 0 600 400', CLS)}
    ${U.pill('la', 760, 190, '🟦 ' + L('وسم: «عادي»', 'Label: "normal"'), 't-blue')}
    ${U.pill('lb', 1120, 190, '🟥 ' + L('وسم: «مزعج»', 'Label: "spam"'), 't-red')}
    ${U.pill('ltr', 760, 300, '① ' + L('التدريب: يلاقي حد فاصل من الأزواج (إدخال + وسم)', 'Training: find a boundary from (input + label) pairs'), 't-amber')}
    ${U.pill('lpr', 760, 400, '② ' + L('التنبّؤ: إيميل جديد من غير وسم ← «عادي»', 'Prediction: a new unlabelled email → "normal"'), 't-green')}
    ${U.box('clb', 760, 510, 1060, 't-blue', { h: L('التصنيف', 'Classification'), p: L('نتنبّأ البيانات دي تبع أنهي فئة — مثال للتعلّم الخاضع للإشراف', 'predict which class the input belongs to — supervised learning') })}

    ${[['🔤', L('نوع الكلمات في الإيميل', 'Kinds of words in the email')], ['📮', L('عنوان المرسِل', 'Sender address')], ['📏', L('طول النص', 'Text length')]]
      .map(([e, t], k) => U.pill('f' + k, 760, 200 + k * 100, e + ' ' + t, 't-violet')).join('')}
    ${U.box('fb', 760, 510, 1060, 't-violet', { h: L('السمة (Feature)', 'Feature'), p: L('دليل في البيانات بيساعد في التنبّؤ — واختيار السمات بيأثّر جامد على الدقة', 'a clue in the data that helps prediction — choosing features drives accuracy') })}

    ${U.art('clu', 90, 170, 600, 400, '0 0 600 400', CLU)}
    ${U.box('cub', 760, 180, 1060, 't-green', { h: L('التجميع (Clustering)', 'Clustering'), p: L('يجمّع المتشابه في مجموعات — من غير أوسمة؛ الجهاز بيلاقي «إيه المتشابه» بنفسه', 'groups similar items — no labels; the computer finds "what is similar" itself') })}
    ${[['🛒', L('عملاء متجر باتجاهات شراء متشابهة', 'Shoppers with similar buying habits')], ['🎧', L('مستمعين بأذواق متشابهة ← ترشيحات', 'Listeners with similar tastes → recommendations')], ['📰', L('مقالات أخبار متشابهة', 'Similar news articles')]]
      .map(([e, t], k) => U.pill('ce' + k, 760, 360 + k * 90, e + ' ' + t, 't-slate')).join('')}

    ${U.art('grid', 90, 170, 600, 360, '0 0 600 360', GRID())}
    ${U.emo('bot', 90 + 24, 170 + 24 + 108 * 2, 104, 64, '🤖')}
    ${U.pill('rw1', 300, 560, '−5 ' + L('وقع في الحفرة', 'fell in the hole'), 't-red')}
    ${U.pill('rw2', 300, 650, '+10 ' + L('وصل للعلم', 'reached the flag'), 't-green')}
    ${[['📍', L('الحالة', 'State'), L('الموقف اللي الوكيل فيه', 'the situation the agent is in')], ['🕹️', L('الفعل', 'Action'), L('الاختيارات المتاحة', 'the choices available')], ['🏆', L('المكافأة', 'Reward'), L('رقم بيقيّم الفعل', 'a number scoring the action')]]
      .map(([e, h, p], k) => U.box('re' + k, 760 + k * 360, 190, 330, 't-amber', { ic: e, h, p })).join('')}
    ${U.pill('rx', 760, 470, '🚶 ' + L('روبوت يتعلّم يمشي · 🎮 لعبة · 🚗 قيادة ذاتية', 'A robot learning to walk · a game · self-driving'), 't-slate')}
    ${U.pill('ry', 760, 570, L('بيتعلّم من نتايج أفعاله هو — مش من «إدخال ← إجابة»', 'Learns from its own actions’ results — not "input → answer"'), 't-amber')}

    ${U.box('bd', 90, 180, 760, 't-slate', { ic: '🙋‍♂️🙋‍♂️🙋‍♂️', h: L('بيانات التدريب', 'Training data'), p: L('بس الطلبة اللي طلبوا مساعدة قبل كده', 'only students who already asked for help') })}
    ${U.pill('bm', 90, 440, '🤖 ' + L('النموذج اتعلّم «مين بيطلب»… مش «مين محتاج»', 'The model learned "who asks"… not "who needs"'), 't-red')}
    ${U.box('bs', 960, 180, 860, 't-red', { ic: '🤐👦', h: L('طلبة ساكتين محتاجين دعم', 'Quiet students who need support'), p: L('النموذج فاتهم!', 'the model missed them!') })}
    ${U.pill('bf', 90, 560, '✅ ' + L('الإصلاح: بيانات فيها نتايج فعلية لطلبة ماطلبوش', 'Fix: data with real outcomes for students who never asked'), 't-green')}

    ${U.emo('bx', 160, 190, 240, 180, '⬛')}
    ${U.pill('bxo', 90, 480, '⚠️ ' + L('«الطالب ده محتاج دعم»… ليه؟ مش باين', '"This student needs support"… why? Hidden'), 't-amber')}
    ${U.ch('ch-t', 1000, 200, 'md')}
    ${U.box('hl', 1260, 200, 560, 't-green', { ic: '🧑‍🏫', h: L('إنسان في الحلقة', 'A human in the loop'), p: L('النموذج يقترح… والإنسان يقرّر', 'the model suggests… the human decides') })}
    ${U.pill('hl2', 90, 560, L('خصوصًا في القرارات اللي غلطتها مكلّفة', 'especially in decisions where mistakes are costly'), 't-slate')}

    ${U.hd(0, '🤖 ' + L('ماتكتبش القاعدة… ورّيه أمثلة', 'Don’t write the rule… show examples'))}
    ${U.hd(1, '🎯 ' + L('تعلّم الآلة بينفع فين؟', 'Where does ML fit?'))}
    ${U.hd(2, '🧭 ' + L('تلات أنواع للتعلّم', 'Three kinds of learning'))}
    ${U.hd(3, '🏷️ ' + L('التصنيف', 'Classification'))}
    ${U.hd(4, '🔤 ' + L('السمات', 'Features'))}
    ${U.hd(5, '📦 ' + L('التجميع', 'Clustering'))}
    ${U.hd(6, '🎮 ' + L('التعلّم المعزَّز', 'Reinforcement learning'))}
    ${U.hd(7, '⚖️ ' + L('التحيّز', 'Bias'))}
    ${U.hd(8, '⬛ ' + L('مشكلة الصندوق الأسود', 'The black-box problem'))}
    ${U.nt(5, L('الفرق بين التصنيف والتجميع = في أوسمة ولا لأ', 'Classification vs clustering = labels given or not'), 'warn')}
    ${U.nt(7, L('بيانات متحيّزة ← أحكام متحيّزة', 'Biased data → biased judgments'), 'bad')}
  </div>
  <div id="l1-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '🤖 ' + L('تعلّم الآلة بيلاقي القواعد من البيانات بدل ما نكتبها', 'ML finds the rules from data instead of us writing them'), 't-violet')}
    ${U.pill('x1', 120, 290, '🏷️ ' + L('إشراف (أوسمة ← تصنيف بسمات) · 📦 غير إشراف (تجميع)', 'Supervised (labels → classification) · unsupervised (clustering)'), 't-blue')}
    ${U.pill('x2', 120, 400, '🎮 ' + L('معزَّز: حالة · فعل · مكافأة', 'Reinforcement: state · action · reward'), 't-amber')}
    ${U.pill('x3', 120, 510, '⚖️ ' + L('تحيّز + صندوق أسود ← يدعم الإنسان مش يستبدله', 'Bias + black box → it supports humans, not replaces them'), 't-red')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#l1-' + id + ' .' + c);

    /* 0 — conventional vs ML */
    let c = at(0);
    frame(0, c);
    IN(q('cvh'), c + 0.4, 0.4, { x: 30 * sx });
    IN(q('cv1'), c + 0.8, 0.4, { y: 20 }); IN(q('cva'), c + 1.3, 0.3); IN(q('cv2'), c + 1.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.6);
    IN(q('mlh'), c + 2.4, 0.4, { x: 30 * sx });
    IN(q('ml1'), c + 2.8, 0.4, { y: 20 }); IN(q('mla'), c + 3.3, 0.3); IN(q('ml2'), c + 3.6, 0.4, { x: 30 * sx }); SND('ok', c + 3.6);
    IN(q('mld'), c + 4.6, 0.5, { x: 40 * sx });

    /* 1 — where ML fits */
    c = at(1);
    frame(1, c);
    OUT(Q('cvh cv1 cva cv2 mlh ml1 mla ml2 mld'), c, 0.4);
    range(3).forEach((k) => { IN(q('u' + k), c + 0.5 + k * 0.6, 0.45, { y: 30 }); SND('pop', c + 0.5 + k * 0.6); });
    IN(q('uw'), c + 2.6, 0.4, { y: 20 }); SND('ok', c + 2.6);
    IN(q('nx'), c + 3.6, 0.5, { x: 40 * sx }); SND('bad', c + 3.6);

    /* 2 — three kinds */
    c = at(2);
    frame(2, c);
    OUT(Q('u0 u1 u2 uw nx'), c, 0.4);
    Q('t0 t1 t2').forEach((b, i) => { IN(b, c + 0.6 + i * 0.9, 0.5, { y: 30 }); SND('pop', c + 0.6 + i * 0.9); });
    POP(q('tq'), c + 3.6, 0.5); SND('ok', c + 3.6);

    /* 3 — classification */
    c = at(3);
    frame(3, c);
    OUT(Q('t0 t1 t2 tq'), c, 0.4);
    IN(q('cls'), c + 0.5, 0.4);
    tl.set(sel('cls', 'bnd'), { opacity: 0 }, c);
    tl.set(sel('cls', 'nw'), { opacity: 0 }, c);
    tl.to(sel('cls', 'ca'), { attr: { fill: '#38bdf8' }, duration: 0.25, stagger: 0.08 }, c + 1.0); IN(q('la'), c + 1.0, 0.3);
    tl.to(sel('cls', 'cb'), { attr: { fill: '#f87171' }, duration: 0.25, stagger: 0.08 }, c + 1.6); IN(q('lb'), c + 1.6, 0.3);
    IN(q('ltr'), c + 2.4, 0.4, { x: 30 * sx });
    tl.to(sel('cls', 'bnd'), { opacity: 1, duration: 0.6 }, c + 2.6); SND('tap', c + 2.6);
    tl.to(sel('cls', 'nw'), { opacity: 1, duration: 0.3 }, c + 3.4);
    tl.fromTo(sel('cls', 'nw'), { scale: 1.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, c + 3.4);
    tl.to(sel('cls', 'nw'), { attr: { fill: '#38bdf8' }, duration: 0.4 }, c + 4.0);
    IN(q('lpr'), c + 4.0, 0.4, { x: 30 * sx }); SND('ok', c + 4.0);
    IN(q('clb'), c + 4.8, 0.5, { y: 20 });

    /* 4 — features */
    c = at(4);
    frame(4, c);
    OUT(Q('la lb ltr lpr clb'), c, 0.4);
    range(3).forEach((k) => { IN(q('f' + k), c + 0.6 + k * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 0.6 + k * 0.6); });
    IN(q('fb'), c + 2.8, 0.5, { y: 20 }); SND('ok', c + 2.8);

    /* 5 — clustering */
    c = at(5);
    frame(5, c, 5.4);
    OUT(Q('cls f0 f1 f2 fb'), c, 0.4);
    IN(q('clu'), c + 0.5, 0.4);
    const ups = sel('clu', 'up');
    ups.forEach((el, k) => {
      const p = CL3[k], [cx, cy] = CEN[p.g];
      const a = k * 2.1, r = 22 + (k % 3) * 16;
      tl.to(el, { attr: { cx: cx + Math.cos(a) * r, cy: cy + Math.sin(a) * r, fill: ['#38bdf8', '#34d399', '#fbbf24'][p.g] }, duration: 1.0, ease: 'power2.inOut' }, c + 1.4 + (k % 6) * 0.05);
    });
    SND('pop', c + 1.4);
    IN(q('cub'), c + 2.6, 0.5, { x: 40 * sx }); SND('ok', c + 2.6);
    range(3).forEach((k) => IN(q('ce' + k), c + 3.4 + k * 0.4, 0.4, { x: 30 * sx }));

    /* 6 — reinforcement */
    c = at(6);
    frame(6, c);
    OUT(Q('clu cub ce0 ce1 ce2'), c, 0.4);
    IN(q('grid'), c + 0.5, 0.4); IN(q('bot'), c + 0.7, 0.3);
    const BX = (cols) => cols * 112 * sx, BY = (rows) => rows * 108;
    tl.to(q('bot'), { x: BX(1), y: BY(-1), duration: 0.5 }, c + 1.2);
    tl.to(q('bot'), { x: BX(2), y: BY(-1), duration: 0.5 }, c + 1.8);
    IN(q('rw1'), c + 2.3, 0.3, { y: 20 }); SND('bad', c + 2.3);
    tl.to(q('bot'), { x: 0, y: 0, duration: 0.4 }, c + 2.8);
    tl.to(q('bot'), { x: BX(4), y: 0, duration: 1.0 }, c + 3.3);
    IN(q('rw2'), c + 4.3, 0.3, { y: 20 }); SND('ok', c + 4.3);
    range(3).forEach((k) => IN(q('re' + k), c + 1.2 + k * 0.6, 0.4, { y: 30 }));
    IN(q('rx'), c + 4.8, 0.4, { x: 30 * sx });
    IN(q('ry'), c + 5.4, 0.4, { x: 30 * sx });

    /* 7 — bias */
    c = at(7);
    frame(7, c, 3.6);
    OUT(Q('grid bot rw1 rw2 re0 re1 re2 rx ry'), c, 0.4);
    IN(q('bd'), c + 0.5, 0.5, { y: 30 });
    IN(q('bm'), c + 1.6, 0.4, { x: 30 * sx }); SND('bad', c + 1.6);
    IN(q('bs'), c + 2.6, 0.5, { x: 40 * sx }); SND('bad', c + 2.6);
    IN(q('bf'), c + 4.4, 0.4, { y: 20 }); SND('ok', c + 4.4);

    /* 8 — black box + human in the loop */
    c = at(8);
    frame(8, c);
    OUT(Q('bd bm bs bf'), c, 0.4);
    POP(q('bx'), c + 0.5, 0.5);
    tl.fromTo(q('bx'), { rotation: -4 }, { rotation: 4, duration: 0.15, yoyo: true, repeat: 5 }, c + 1.0);
    IN(q('bxo'), c + 1.4, 0.4, { y: 20 }); SND('bad', c + 1.4);
    IN(q('ch-t'), c + 2.4, 0.5, { x: 60 * sx });
    IN(q('hl'), c + 3.0, 0.5, { x: 40 * sx }); SND('ok', c + 3.0);
    IN(q('hl2'), c + 3.8, 0.4, { y: 20 });

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops */
    M.loop(0, 5.6, () => M.cycle(Q('cv1 cv2 ml1 ml2'), 'rgba(167,139,250,.85)', 0.5));
    M.loop(1, 4.6, () => M.bob(Q('u0 u1 u2'), 6, 1.2));
    M.loop(2, 4.6, () => M.cycle(Q('t0 t1 t2'), 'rgba(251,191,36,.85)', 0.6));
    /* new emails keep arriving and get classified */
    M.loop(3, 5.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
      .fromTo(sel('cls', 'nw'), { attr: { fill: '#94a3b8' }, scale: 1.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .to(sel('cls', 'nw'), { attr: { fill: '#38bdf8' }, duration: 0.4 }, '+=0.5'));
    M.loop(4, 4.0, () => M.cycle(Q('f0 f1 f2'), 'rgba(167,139,250,.85)', 0.5));
    M.loop(5, 5.0, () => gsap.timeline().to(sel('clu', 'up'), { y: '-=5', duration: 1.0, ease: 'sine.inOut', stagger: { each: 0.06, from: 'random', repeat: -1, yoyo: true } }));
    /* the robot keeps trying: falls in the hole sometimes, reaches the flag more and more */
    M.loop(6, 6.4, () => {
      const BX = (n) => n * 112 * sx, BY = (n) => n * 108;
      return gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
        .set(q('bot'), { x: 0, y: 0 })
        .to(q('bot'), { x: BX(1), y: BY(-1), duration: 0.5 }).to(q('bot'), { x: BX(2), y: BY(-1), duration: 0.5 })
        .fromTo(q('rw1'), { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: '50% 50%' })
        .to(q('bot'), { x: 0, y: 0, duration: 0.4 })
        .to(q('bot'), { x: BX(4), y: 0, duration: 1.2 })
        .fromTo(q('rw2'), { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: '50% 50%' });
    });
    M.loop(7, 5.0, () => M.glowLoop(q('bs'), 'rgba(248,113,113,.85)'));
    M.loop(8, 4.4, () => gsap.timeline({ repeat: -1, repeatDelay: 1.4 }).fromTo(q('bx'), { rotation: -4 }, { rotation: 4, duration: 0.15, yoyo: true, repeat: 5 }));
    M.loop(8, 4.4, () => M.glowLoop(q('hl'), 'rgba(52,211,153,.85)'));
    return M.done();
  });
})();

/* =========================================================
 * anims/movies-1-2.js — lesson 1-2 teacher-driven movies (shell:
 * movie-kit.js; each beat plays, then FREEZES).
 *   aiMovie    (station what)  : rules → AI → the student teaches the computer:
 *                                data → training → model → prediction → AI ⊃ ML ⊃ DL ⊃ GenAI
 *   dlMovie    (station dl)    : neural network layers, weights, training, deep learning
 *   genaiMovie (station genai) : prompt → new content, word-by-word, hallucination, checking
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  /* the computer the student teaches (viewBox 360×300) */
  const ART_PC = `<rect x="20" y="10" width="320" height="220" rx="24" fill="#e2e8f0"/><rect x="40" y="30" width="280" height="180" rx="14" fill="#0f172a"/>
    <g class="face"><circle cx="135" cy="105" r="16" fill="#38bdf8"/><circle cx="225" cy="105" r="16" fill="#38bdf8"/><path d="M140 160 Q180 185 220 160" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/></g>
    <g class="gears" opacity="0"><circle class="g1" cx="140" cy="120" r="44" fill="none" stroke="#fbbf24" stroke-width="14" stroke-dasharray="14 10"/><circle class="g2" cx="228" cy="96" r="30" fill="none" stroke="#a78bfa" stroke-width="12" stroke-dasharray="10 8"/></g>
    <rect x="150" y="230" width="60" height="34" fill="#94a3b8"/><rect x="100" y="262" width="160" height="22" rx="10" fill="#cbd5e1"/>`;
  /* neural network: columns of nodes (viewBox 780×440) */
  const NET = (cols) => {
    const W = 780, H = 440, xs = cols.map((_, i) => 60 + i * ((W - 120) / (cols.length - 1)));
    const ys = (n) => range(n).map((k) => H / 2 + (k - (n - 1) / 2) * Math.min(80, (H - 60) / Math.max(1, n - 1)));
    let links = '', nodes = '';
    cols.forEach((n, i) => {
      if (i < cols.length - 1) ys(n).forEach((y, a) => ys(cols[i + 1]).forEach((y2, b) => { links += `<path class="lk L${i}" d="M${xs[i]} ${y} L${xs[i + 1]} ${y2}" stroke="#7dd3fc" stroke-width="${2 + ((a * 7 + b * 3 + i) % 5) * 1.6}" opacity=".45"/>`; }));
      ys(n).forEach((y) => { nodes += `<circle class="nd N${i}" cx="${xs[i]}" cy="${y}" r="24" fill="${i === 0 ? '#38bdf8' : i === cols.length - 1 ? '#34d399' : '#a78bfa'}" stroke="#e2e8f0" stroke-width="4"/>`; });
    });
    return links + nodes;
  };

  /* ═════════════════════════ aiMovie ═════════════════════════ */
  K.defineAnim('aiMovie', (stage, props, api) => {
    const U = MK.ui('ai-');
    const M = MK.create(stage, api, {
      cls: 'mv-ai mv-l12', prefix: 'ai-', beats: 7, cast: { 'ch-st': 'student' },
      html: (L) => `
  <div id="ai-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.art('pc', 1000, 230, 360, 300, '0 0 360 300', ART_PC)}
    ${U.pill('pcl', 1080, 540, '💻 ' + L('الحاسب', 'The computer'), 't-slate')}
    <div id="ai-rule" class="typed later" ${MK.S(1400, 240, 480)}>📜 ${L('قاعدة مكتوبة بالإيد:', 'A hand-written rule:')}<br><b>${L('لو الإيميل فيه', 'if the email has')} <bdi class="code">free</bdi> ← ${L('سبام', 'spam')}</b></div>
    ${U.pill('e1', 480, 660, '✉️ <bdi class="code">free gift</bdi>', 'solid')}
    ${U.pill('e2', 480, 660, '✉️ <bdi class="code">fr€e gift</bdi>', 'solid')}
    ${U.pill('v1', 1400, 420, '🚫 ' + L('اتمسك: سبام', 'caught: spam'), 't-green')}
    ${U.pill('v2', 1400, 500, '😬 ' + L('عدّى! القاعدة فشلت', 'it passed! the rule failed'), 't-red')}
    ${U.bub('b0', 30, 505, 400, L('المحتال غيّر حرف واحد… والقاعدة اتغلبت!', 'The scammer changed one letter… and beat the rule!') + ' 😅')}

    ${U.box('i1', 470, 230, 860, 't-violet', { ic: '🤖', h: L('الذكاء الاصطناعي (AI)', 'Artificial intelligence (AI)'), p: L('مصطلح عام لتقنيات بتخلّي الحاسب يعيد إنتاج أو ينفّذ سلوك إنساني ذكي', 'a general term for technologies that let a computer reproduce or carry out intelligent human behaviour') })}
    ${U.pill('k1', 1400, 240, '🎓 ' + L('تعلّم', 'learning'), 't-violet')}${U.pill('k2', 1400, 330, '🧩 ' + L('استدلال', 'reasoning'), 't-violet')}${U.pill('k3', 1400, 420, '⚖️ ' + L('حكم', 'judgement'), 't-violet')}
    ${U.pill('x1', 480, 560, '🗣️ ' + L('التعرّف على الكلام', 'speech recognition'), 't-blue')}${U.pill('x2', 900, 560, '🖼️ ' + L('التعرّف على الصور', 'image recognition'), 't-blue')}${U.pill('x3', 1320, 560, '🌐 ' + L('الترجمة', 'translation'), 't-blue')}

    ${range(6).map((k) => U.pill('d' + k, 470 + (k % 3) * 170, 230 + Math.floor(k / 3) * 80, k % 2 ? '✅ ' + L('سليم', 'OK') : '🚫 ' + L('سبام', 'spam'), k % 2 ? 't-green' : 't-red')).join('')}
    ${U.pill('s1', 470, 400, '① ' + L('بيانات متعلّم عليها', 'labelled data'), 't-amber')}
    ${U.bub('b2', 30, 505, 400, L('خد الأمثلة دي واتعلّم منها!', 'Take these examples and learn from them!') + ' 📚')}
    ${U.pill('s2', 1400, 240, '② ' + L('التدريب', 'training') + ' ⚙️', 't-amber')}
    ${U.pill('w1', 1400, 330, '«' + L('جايزة', 'prize') + '» ← ' + L('سبام أكتر', 'more spam'), 't-red')}
    ${U.pill('w2', 1400, 410, '«' + L('فلوس', 'money') + '» ← ' + L('سبام أكتر', 'more spam'), 't-red')}
    ${U.pill('s3', 1400, 500, '③ ' + L('النموذج جاهز', 'the model is ready') + ' 🧠', 't-green')}
    ${U.pill('m1', 470, 600, '✉️ ' + L('جايزة فلوس ليك!', 'Money prize for you!'), 'solid')}
    ${U.pill('m2', 470, 600, '✉️ ' + L('ميعاد الحصة بكرة', 'Class is tomorrow'), 'solid')}
    ${U.pill('p1', 1400, 600, '④ ' + L('تنبؤ: غالبًا سبام', 'prediction: likely spam') + ' 🚫', 't-red')}
    ${U.pill('p2', 1400, 680, '④ ' + L('تنبؤ: سليم', 'prediction: OK') + ' ✅', 't-green')}
    ${U.bub('b4', 30, 505, 400, L('ده عمره ما شافه… وعرف لوحده!', 'It never saw that one… and still knew!') + ' 🤩')}

    <svg id="ai-rings" class="art later" ${MK.S(560, 120, 640, 640)} viewBox="0 0 640 640">
      <circle cx="320" cy="320" r="310" fill="rgba(56,189,248,.10)" stroke="#38bdf8" stroke-width="6"/><circle cx="320" cy="350" r="236" fill="rgba(52,211,153,.10)" stroke="#34d399" stroke-width="6"/>
      <circle cx="320" cy="380" r="162" fill="rgba(167,139,250,.12)" stroke="#a78bfa" stroke-width="6"/><circle cx="320" cy="410" r="88" fill="rgba(244,114,182,.15)" stroke="#f472b6" stroke-width="6"/></svg>
    <div id="ai-l1" class="lbl c later" ${MK.S(760, 152, 240)}>AI</div>
    <div id="ai-l2" class="lbl later" ${MK.S(760, 252, 240)}>ML</div>
    <div id="ai-l3" class="lbl later" ${MK.S(760, 350, 240)}>DL</div>
    <div id="ai-l4" class="lbl later" ${MK.S(760, 452, 240)}>GenAI</div>
    ${U.pill('r1', 1260, 200, 'AI: ' + L('ترجمة · كلام · صور', 'translation · speech · images'), 't-blue')}
    ${U.pill('r2', 1260, 300, 'ML: ' + L('فلتر السبام · التوصيات', 'spam filter · recommendations'), 't-green')}
    ${U.pill('r3', 1260, 400, 'DL: ' + L('صور القيادة الذاتية', 'self-driving images'), 't-violet')}
    ${U.pill('r4', 1260, 500, 'GenAI: ChatGPT', 't-pink')}

    ${U.box('t1', 470, 220, 700, 't-red', { ic: '❌', h: L('«AI و ML نفس المعنى»', '“AI and ML mean the same”'), p: L('غلط: AI مجال واسع، و ML تقنية جوّاه', 'false: AI is the wide field; ML is a technique inside it') })}
    ${U.box('t2', 1190, 220, 690, 't-red', { ic: '❌', h: L('«DL منفصل عن ML»', '“DL is separate from ML”'), p: L('غلط: DL نوع من ML بيستخدم شبكات عصبية', 'false: DL is a kind of ML that uses neural networks') })}
    ${U.box('t3', 470, 480, 1410, 't-amber', { ic: '☝️', h: L('كل AI النهارده شاطر في مهمة واحدة بس', 'Every AI today is good at ONE task only'), p: L('يترجم أو يتعرّف على وشوش… مش ذكاء عام يعمل كل حاجة زي الإنسان', 'translating or recognising faces… not a general intelligence like a human') })}

    ${U.hd(0, '📜 ' + L('زمان: الحاسب بينفّذ القواعد اللي اتكتبت له بس', 'Before: the computer only follows written rules'))}
    ${U.hd(1, '🤖 ' + L('يعني إيه ذكاء اصطناعي؟', 'What is artificial intelligence?'))}
    ${U.hd(2, '📚 ' + L('التعلّم الآلي: الطالب بيعلّم الحاسب بالأمثلة', 'Machine learning: the student teaches by examples'))}
    ${U.hd(3, '⚙️ ' + L('التدريب ← النموذج', 'Training → the model'))}
    ${U.hd(4, '🔮 ' + L('التنبؤ بإيميلات جديدة', 'Predicting new emails'))}
    ${U.hd(5, '⭕ ' + L('أربع دوائر… كل واحدة جوّه اللي قبلها', 'Four circles… each inside the previous'))}
    ${U.hd(6, '⚠️ ' + L('فخاخ الامتحان', 'Exam traps'))}
    ${U.nt(0, L('كتابة كل قاعدة بالإيد مرهقة… وبتفشل مع أي حاجة جديدة', 'Writing every rule by hand is exhausting… and fails on anything new'), 'warn')}
    ${U.nt(3, L('الحاسب بيكتشف الأنماط بنفسه — محدش كتب له القاعدة', 'The computer finds the patterns itself — nobody wrote the rule'), 'ok')}
    ${U.nt(4, L('التعلّم الآلي = يتعلّم أنماط من البيانات عشان يتنبّأ ويحكم', 'Machine learning = learning patterns from data to predict and judge'), 'ok')}
    ${U.nt(5, '<bdi class="code">AI ⊃ ML ⊃ DL ⊃ GenAI</bdi> — ' + L('من الأوسع للأكثر تخصصًا', 'from the widest to the most specialised'))}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const sub = (sel) => M.board.querySelector(sel);

    /* 0 — hand-written rules fail */
    let c = at(0);
    frame(0, c, 7.2);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    IN(Q('pc pcl'), c + 0.6, 0.5, { y: 30 });
    IN(q('rule'), c + 1.2, 0.5, { x: 40 });
    IN(q('e1'), c + 2.0, 0.3); tl.to(q('e1'), { x: 480, duration: 0.9, ease: 'power1.in' }, c + 2.2);
    OUT(q('e1'), c + 3.1, 0.2); POP(q('v1'), c + 3.2, 0.4); SND('ok', c + 3.2);
    IN(q('e2'), c + 3.8, 0.3); tl.to(q('e2'), { x: 480, duration: 0.9, ease: 'power1.in' }, c + 4.0);
    OUT(q('e2'), c + 4.9, 0.2); POP(q('v2'), c + 5.0, 0.4); SND('bad', c + 5.0);
    IN(q('b0'), c + 5.8, 0.4, { y: 14 });

    /* 1 — what AI is */
    c = at(1);
    frame(1, c);
    OUT(Q('pc pcl rule v1 v2 b0'), c, 0.4);
    IN(q('i1'), c + 0.6, 0.5, { y: 30 });
    Q('k1 k2 k3').forEach((k, i) => { POP(k, c + 1.6 + i * 0.5, 0.4); SND('pop', c + 1.6 + i * 0.5); });
    Q('x1 x2 x3').forEach((k, i) => IN(k, c + 3.4 + i * 0.4, 0.4, { y: 20 }));

    /* 2 — the student gives labelled examples */
    c = at(2);
    frame(2, c);
    OUT(Q('i1 k1 k2 k3 x1 x2 x3'), c, 0.4);
    IN(Q('pc pcl'), c + 0.5, 0.5, { y: 30 });
    IN(q('b2'), c + 0.9, 0.4, { y: 14 });
    range(6).forEach((k) => { POP(q('d' + k), c + 1.6 + k * 0.25, 0.35); });
    IN(q('s1'), c + 3.4, 0.4, { y: 20 });
    /* 3 — training → model (the examples go into the computer first) */
    c = at(3);
    frame(3, c, 7.4);
    OUT(Q('b2 s1'), c, 0.3);
    range(6).forEach((k) => {
      const t = c + 0.4 + k * 0.3;
      tl.to(q('d' + k), { x: 640 - (k % 3) * 170, y: 150 - Math.floor(k / 3) * 80, scale: 0.5, opacity: 0, duration: 0.6, ease: 'power2.in' }, t);
    });
    SND('whoosh', c + 0.4);
    const c3 = c + 2.2;
    IN(q('s2'), c3 + 0.5, 0.4, { x: 30 });
    tl.to(sub('#ai-pc .face'), { opacity: 0, duration: 0.3 }, c3 + 0.6);
    tl.to(sub('#ai-pc .gears'), { opacity: 1, duration: 0.3 }, c3 + 0.7);
    tl.fromTo(sub('#ai-pc .g1'), { rotation: 0, svgOrigin: '140 120' }, { rotation: 360, svgOrigin: '140 120', duration: 1.2, repeat: 2, ease: 'none' }, c3 + 0.8);
    tl.fromTo(sub('#ai-pc .g2'), { rotation: 0, svgOrigin: '228 96' }, { rotation: -360, svgOrigin: '228 96', duration: 1.0, repeat: 3, ease: 'none' }, c3 + 0.8);
    POP(q('w1'), c3 + 2.2, 0.4); SND('pop', c3 + 2.2);
    POP(q('w2'), c3 + 3.0, 0.4); SND('pop', c3 + 3.0);
    tl.to(sub('#ai-pc .gears'), { opacity: 0, duration: 0.3 }, c3 + 4.6);
    tl.to(sub('#ai-pc .face'), { opacity: 1, duration: 0.3 }, c3 + 4.7);
    POP(q('s3'), c3 + 5.0, 0.5); SND('ok', c3 + 5.0);

    /* 4 — predictions on new emails */
    c = at(4);
    frame(4, c, 7.0);
    OUT(Q('s2 w1 w2'), c, 0.3);
    IN(q('m1'), c + 0.6, 0.3); tl.to(q('m1'), { x: 560, duration: 0.9, ease: 'power1.in' }, c + 0.8);
    OUT(q('m1'), c + 1.7, 0.2); POP(q('p1'), c + 1.8, 0.4); SND('bad', c + 1.8);
    IN(q('m2'), c + 2.6, 0.3); tl.to(q('m2'), { x: 560, duration: 0.9, ease: 'power1.in' }, c + 2.8);
    OUT(q('m2'), c + 3.7, 0.2); POP(q('p2'), c + 3.8, 0.4); SND('ok', c + 3.8);
    IN(q('b4'), c + 4.6, 0.4, { y: 14 });

    /* 5 — AI ⊃ ML ⊃ DL ⊃ GenAI */
    c = at(5);
    frame(5, c, 6.6);
    OUT(Q('pc pcl s3 p1 p2 b4 ch-st'), c, 0.4);
    IN(q('rings'), c + 0.5, 0.6, { scale: 0.85 });
    Q('l1 l2 l3 l4').forEach((l, i) => { POP(l, c + 1.2 + i * 1.0, 0.4); SND('pop', c + 1.2 + i * 1.0); });
    Q('r1 r2 r3 r4').forEach((r, i) => IN(r, c + 1.5 + i * 1.0, 0.4, { x: 30 }));

    /* 6 — exam traps */
    c = at(6);
    frame(6, c);
    OUT(Q('rings l1 l2 l3 l4 r1 r2 r3 r4'), c, 0.4);
    IN(q('t1'), c + 0.7, 0.5, { y: 30 }); SND('bad', c + 0.7);
    IN(q('t2'), c + 1.9, 0.5, { y: 30 }); SND('bad', c + 1.9);
    IN(q('t3'), c + 3.1, 0.5, { y: 30 }); SND('pop', c + 3.1);
    return M.done();
  });

  /* ═════════════════════════ dlMovie ═════════════════════════ */
  K.defineAnim('dlMovie', (stage, props, api) => {
    const U = MK.ui('dl-');
    const M = MK.create(stage, api, {
      cls: 'mv-dl mv-l12', prefix: 'dl-', beats: 6, cast: { 'ch-st': 'student' },
      html: (L) => `
  <div id="dl-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.emo('brain', 300, 150, 150, 110, '🧠')}
    ${U.art('net', 470, 160, 780, 440, '0 0 780 440', NET([3, 4, 4, 2]))}
    ${U.art('deep', 470, 160, 780, 440, '0 0 780 440', NET([3, 4, 4, 4, 4, 4, 2]))}
    <div id="dl-la" class="lbl c later" ${MK.S(470, 610, 140)}>${L('إدخال', 'input')}</div>
    <div id="dl-lb" class="lbl c later" ${MK.S(720, 610, 300)}>${L('طبقات مخفية', 'hidden layers')}</div>
    <div id="dl-lc" class="lbl c later" ${MK.S(1110, 610, 140)}>${L('إخراج', 'output')}</div>
    ${U.box('i0', 1300, 200, 580, 't-violet', { ic: '🕸️', h: L('الشبكة العصبية', 'Neural network'), p: L('مكوّنات بسيطة كتير متوصّلة في طبقات — زي خلايا المخ', 'many simple units linked in layers — like brain cells') })}
    ${U.box('i1', 1300, 200, 580, 't-blue', { ic: '⚡', h: L('الإشارات بتعدّي طبقة ورا طبقة', 'Signals pass layer by layer'), p: L('وكل وصلة ليها وزن بيحدّد قوتها', 'and every link has a weight that sets its strength') })}
    ${U.emo('cat', 316, 240, 144, 96, '🐱')}
    <div id="dl-q1" class="lbl later" ${MK.S(1300, 220, 580)}>${L('قطة ولا كلب؟', 'Cat or dog?')}</div>
    <div id="dl-ba" class="lbl later" ${MK.S(1300, 290, 140)}>🐱 ${L('قطة', 'cat')}</div><div id="dl-bar1" class="bar later" ${MK.S(1450, 296, 300)}><i style="width:40%"></i></div><div id="dl-pa" class="lbl later" ${MK.S(1770, 290, 110)}>40%</div>
    <div id="dl-bb" class="lbl later" ${MK.S(1300, 360, 140)}>🐶 ${L('كلب', 'dog')}</div><div id="dl-bar2" class="bar later" ${MK.S(1450, 366, 300)}><i style="width:60%"></i></div><div id="dl-pb" class="lbl later" ${MK.S(1770, 360, 110)}>60%</div>
    <div id="dl-pa2" class="lbl later" ${MK.S(1770, 290, 110)}>96%</div><div id="dl-pb2" class="lbl later" ${MK.S(1770, 360, 110)}>4%</div>
    ${U.pill('loop', 1300, 460, '🔁 ' + L('الأوزان بتتغيّر شوية شوية', 'weights change little by little'), 't-amber')}
    ${U.bub('b2', 30, 505, 400, L('في الأول غلط… وبعد التدريب بقى شاطر!', 'Wrong at first… good after training!') + ' 💪')}
    ${U.box('i3', 1300, 200, 580, 't-green', { ic: '📚', h: L('التعلّم العميق', 'Deep learning'), p: L('طبقات مخفية كتير + بيانات ضخمة', 'many hidden layers + huge data'), s: L('بيتعلّم أنماط معقّدة', 'learns complex patterns') })}
    ${U.box('x1', 470, 200, 440, 't-green', { ic: '🩻', h: L('صور «سليم»', '“healthy” scans'), p: L('آلاف الصور متعلّم عليها', 'thousands of labelled images') })}
    ${U.box('x2', 960, 200, 440, 't-red', { ic: '🩻', h: L('صور «مريض»', '“sick” scans'), p: L('آلاف الصور متعلّم عليها', 'thousands of labelled images') })}
    ${U.pill('x3', 470, 460, '🩻 ' + L('صورة جديدة ← «مريض» — والطبيب يراجع', 'new scan → “sick” — the doctor checks'), 't-amber')}
    ${U.pill('x4', 470, 560, '❓ ' + L('مرض نادر مااتدرّبش عليه ← ممكن يغلط', 'a rare disease it never saw → it may be wrong'), 't-red')}
    ${U.bub('b4', 30, 505, 400, L('لو حاجة نادرة في بياناته… غالبًا هيغلط', 'If something is rare in its data… it will likely err') + ' ⚠️')}

    ${U.hd(0, '🧠 ' + L('الشبكة العصبية: مستوحاة من خلايا المخ', 'Neural network: inspired by brain cells'))}
    ${U.hd(1, '⚡ ' + L('الإشارات والأوزان', 'Signals and weights'))}
    ${U.hd(2, '🏋️ ' + L('التدريب: الشبكة بتتعلّم من البيانات', 'Training: the network learns from data'))}
    ${U.hd(3, '📚 ' + L('التعلّم العميق = طبقات كتير + بيانات ضخمة', 'Deep learning = many layers + huge data'))}
    ${U.hd(4, '🩻 ' + L('مثال: التعلّم العميق في الأشعة', 'Example: deep learning on X-rays'))}
    ${U.nt(0, L('إدخال ← طبقات مخفية ← إخراج', 'input → hidden layers → output'))}
    ${U.nt(3, L('الشبكة العصبية هي التقنية الأساسية ورا التقدّم الكبير في الذكاء الاصطناعي', 'Neural networks are the core technology behind recent AI progress'), 'ok')}
  </div>
  <div id="dl-recap" class="mv-recap">
    ${U.hd(5, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.box('r1', 1290, 140, 540, 't-violet', { ic: '🕸️', h: L('شبكة عصبية', 'Neural network'), p: L('طبقات: إدخال ← مخفية ← إخراج', 'layers: input → hidden → output') })}
    ${U.box('r2', 690, 140, 540, 't-blue', { ic: '🏋️', h: L('التدريب', 'Training'), p: L('الأوزان بتتظبط من البيانات', 'weights tuned from data') })}
    ${U.box('r3', 90, 140, 540, 't-green', { ic: '📚', h: L('التعلّم العميق', 'Deep learning'), p: L('طبقات كتير + بيانات ضخمة', 'many layers + huge data') })}
    ${U.rp('rp1', 520, '⚠️ ' + L('الحاجة النادرة في البيانات ← غالبًا بيغلط فيها', 'Rare in the data → it often gets it wrong'), 't-amber')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — the network: inspired by the brain */
    let c = at(0);
    frame(0, c, 5.0);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    POP(q('brain'), c + 0.8, 0.5); SND('pop', c + 0.8);
    IN(q('net'), c + 1.6, 0.6);
    tl.fromTo(all('#dl-net .nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' }, c + 1.7);
    IN(Q('la lb lc'), c + 3.0, 0.4);
    IN(q('i0'), c + 3.6, 0.5, { x: 40 });

    /* 1 — signals + weights */
    c = at(1);
    frame(1, c);
    OUT(Q('i0 brain'), c, 0.3);
    IN(q('i1'), c + 0.5, 0.5, { x: 40 });
    [0, 1, 2].forEach((j) => {
      tl.fromTo(all(`#dl-net .L${j}`), { opacity: 0.45, stroke: '#7dd3fc' }, { opacity: 1, stroke: '#fde68a', duration: 0.35, yoyo: true, repeat: 1 }, c + 1.4 + j * 0.8);
      tl.fromTo(all(`#dl-net .N${j + 1}`), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 1 }, c + 1.7 + j * 0.8);
    });
    SND('whoosh', c + 1.4);

    /* 2 — training: cat or dog */
    c = at(2);
    frame(2, c);
    OUT(q('i1'), c, 0.3);
    POP(q('cat'), c + 0.5, 0.4);
    IN(Q('q1 ba bar1 pa bb bar2 pb'), c + 1.0, 0.4); SND('bad', c + 1.2);
    POP(q('loop'), c + 2.4, 0.4);
    tl.fromTo(all('#dl-net .lk'), { opacity: 0.45 }, { opacity: 0.95, duration: 0.25, stagger: { each: 0.01, from: 'random' }, yoyo: true, repeat: 1 }, c + 2.6);
    tl.to(all('#dl-bar1 i'), { width: '96%', duration: 1.0 }, c + 4.0);
    tl.to(all('#dl-bar2 i'), { width: '4%', duration: 1.0 }, c + 4.0);
    OUT(Q('pa pb'), c + 4.0, 0.2); IN(Q('pa2 pb2'), c + 4.4, 0.3); SND('ok', c + 5.0);
    IN(q('b2'), c + 5.4, 0.4, { y: 14 });

    /* 3 — deep learning */
    c = at(3);
    frame(3, c, 5.0);
    OUT(Q('cat q1 ba bar1 pa2 bb bar2 pb2 loop b2 net'), c, 0.4);
    IN(q('deep'), c + 0.6, 0.6, { scale: 0.9 });
    tl.fromTo(all('#dl-deep .nd'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.05, ease: 'back.out(2)' }, c + 0.7);
    IN(q('i3'), c + 2.6, 0.5, { x: 40 });

    /* 4 — X-ray example */
    c = at(4);
    frame(4, c);
    OUT(Q('deep la lb lc i3'), c, 0.4);
    IN(q('x1'), c + 0.6, 0.5, { y: 30 }); IN(q('x2'), c + 1.2, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('x3'), c + 2.4, 0.5, { x: 30 }); SND('ok', c + 2.4);
    IN(q('x4'), c + 3.8, 0.5, { x: 30 }); SND('bad', c + 3.8);
    IN(q('b4'), c + 4.6, 0.4, { y: 14 });

    /* 5 — recap */
    c = at(5);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd5'), c + 0.6, 0.5, { y: -30 });
    Q('r1 r2 r3').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.6, { y: 30 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('rp1'), c + 3.2, 0.6);
    return M.done();
  });

  /* ═════════════════════════ genaiMovie ═════════════════════════ */
  K.defineAnim('genaiMovie', (stage, props, api) => {
    const U = MK.ui('gn-');
    const rtl = MK.RTL(); // RTL: the prompt (first) sits on the right
    const W1 = ['النيل', 'نهر', 'طويل', 'بيجري', 'من', 'الجنوب', 'للشمال', 'وبيدّي', 'مصر', 'الحياة…'];
    const E1 = ['The', 'Nile', 'is', 'a', 'long', 'river', 'flowing', 'north', 'and', 'giving', 'Egypt', 'life…'];
    const M = MK.create(stage, api, {
      cls: 'mv-gn mv-l12', prefix: 'gn-', beats: 7, cast: { 'ch-st': 'studentL' },
      html: (L) => `
  <div id="gn-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    <div id="gn-prompt" class="typed later" ${MK.S(rtl ? 1260 : 470, 220, 620)}>💬 ${L('الطلب (prompt):', 'Prompt:')}<br><b>${L('اكتب جملتين عن نهر النيل', 'Write two lines about the Nile')}</b></div>
    ${U.emo('arr', rtl ? 1140 : 1110, 270, 100, 64, rtl ? '⬅' : '➜')}
    <div id="gn-out" class="typed later" ${MK.S(rtl ? 470 : 1230, 220, 650, 300)}>🤖 ${L('الإجابة:', 'Answer:')}<br>${(api.t({ ar: 'x', en: 'y' }) === 'x' ? W1 : E1).map((w) => `<span class="wd">${w}</span>`).join(' ')}</div>
    ${U.pill('new', rtl ? 470 : 1230, 560, '✨ ' + L('نص جديد ماكانش موجود', 'new text that did not exist'), 't-violet')}
    ${U.bub('b0', 30, 505, 400, L('كتبلي كلام جديد في ثانية!', 'It wrote something new in a second!') + ' 😮')}

    ${[['📝', L('نص', 'Text'), 't-blue'], ['🖼️', L('صور', 'Images'), 't-violet'], ['🎵', L('صوت', 'Audio'), 't-pink'], ['💻', L('برامج', 'Code'), 't-green']]
      .map(([ic, h, th], k) => U.box('o' + k, 470 + (rtl ? 3 - k : k) * 355, 240, 330, th, { ic, h })).join('')}
    ${U.pill('ex', 470, 470, '🧪 ' + L('أمثلة: ChatGPT · أدوات توليد الصور', 'Examples: ChatGPT · image generators'), 't-amber')}
    ${U.pill('dl', 470, 560, '🧠 ' + L('بيستخدم التعلّم العميق عشان يولّد بيانات جديدة', 'it uses deep learning to generate new data'), 't-slate')}

    <div id="gn-sent" class="typed later" ${MK.S(470, 220, 1410)}>${L('برج القاهرة اتبنى سنة', 'The Cairo Tower was built in')} <span id="gn-blank" class="gn-blank">____</span><span id="gn-wrong" class="gn-fill bad">1890</span></div>
    ${[['1961', 46], ['1890', 34], ['1956', 20]].map(([y, p], k) => `<div id="gn-y${k}" class="lbl later" ${MK.S(480, 360 + k * 80, 110)}><bdi>${y}</bdi></div><div id="gn-bar${k}" class="bar later" ${MK.S(600, 366 + k * 80, 700)}><i style="width:${p * 2}%"></i></div>`).join('')}
    ${U.pill('pick', 1340, 440, '🎲 ' + L('بيختار كلمة «شكلها مناسب»', 'picks a word that “looks right”'), 't-amber')}
    ${U.box('h1', 1340, 360, 540, 't-red', { ic: '😵', h: L('مقنع جدًا… وغلط!', 'Very convincing… and wrong!'), p: L('ده اسمه الهلوسة', 'that is a hallucination') })}
    ${U.pill('real', 470, 620, '✅ ' + L('الحقيقة: برج القاهرة اتفتح سنة 1961', 'Fact: the Cairo Tower opened in 1961'), 't-green')}

    ${U.box('f1', 470, 240, 450, 't-red', { ic: '🧾', h: L('حقيقة مزيفة', 'A fake fact'), p: L('معلومة شكلها صح', 'info that looks true') })}
    ${U.box('f2', 950, 240, 450, 't-red', { ic: '📚', h: L('مرجع مش موجود', 'A source that does not exist'), p: L('كتاب أو رابط مخترع', 'an invented book or link') })}
    ${U.box('f3', 1430, 240, 450, 't-red', { ic: '🔢', h: L('رقم أو حساب غلط', 'A wrong number or sum'), p: L('بثقة كاملة', 'stated with full confidence') })}
    ${U.pill('f4', 470, 520, '📉 ' + L('بتزيد لما المعلومة نادرة أو مش في بيانات التدريب', 'more likely when the info is rare or missing from training data'), 't-amber')}

    ${[['🔍', L('راجع مصدر موثوق', 'Check a reliable source')], ['📖', L('اطلب المرجع واتأكد منه', 'Ask for the source — verify it')], ['⚖️', L('قارن مصدرين', 'Compare two sources')],
      ['💡', L('استخدمه للأفكار مش للحقيقة النهائية', 'Use it for ideas, not final facts')], ['✍️', L('افهم واكتب بأسلوبك', 'Understand and write it yourself')]]
      .map(([ic, txt], k) => U.pill('s' + k, 480 + (rtl ? 1 - (k % 2) : k % 2) * 700, 220 + Math.floor(k / 2) * 110, `${k + 1}. ${ic} ${txt}`, 't-green')).join('')}

    ${U.box('t1', 470, 240, 1410, 't-amber', { ic: '🚫✉️', h: L('فلتر السبام مش ذكاء توليدي', 'A spam filter is NOT generative AI'), p: L('هو تعلّم آلي بيصنّف — مش بيولّد محتوى جديد', 'it is machine learning that classifies — it creates nothing new') })}
    ${U.box('t2', 470, 500, 1410, 't-red', { ic: '📄', h: L('ماتحطّش إجابته في تقرير المدرسة زي ما هي', 'Never paste its answer into a school report as-is'), p: L('ممكن تكون هلوسة — اتحقّق واكتب بفهمك', 'it may be a hallucination — verify and write it yourself') })}

    ${U.hd(0, '✨ ' + L('الذكاء الاصطناعي التوليدي: طلب ← محتوى جديد', 'Generative AI: a prompt → new content'))}
    ${U.hd(1, '🎨 ' + L('مش نص بس', 'Not only text'))}
    ${U.hd(2, '🔤 ' + L('بيكتب كلمة ورا كلمة', 'It writes word by word'))}
    ${U.hd(3, '😵 ' + L('الهلوسة', 'Hallucination'))}
    ${U.hd(4, '🧩 ' + L('أشكال الهلوسة', 'Forms of hallucination'))}
    ${U.hd(5, '🛡️ ' + L('تحمي نفسك إزاي؟ 5 خطوات', 'How to protect yourself: 5 steps'))}
    ${U.hd(6, '⚠️ ' + L('فخاخ الامتحان', 'Exam traps'))}
    ${U.nt(2, L('لكل كلمة احتمال اتعلّمه من ملايين النصوص — والنموذج مابيدوّرش في قاعدة حقائق', 'Each word has a probability learned from millions of texts — the model does not look facts up'), 'warn')}
    ${U.nt(5, '✅ ' + L('العادة الذهبية: اتحقّق قبل ما تعتمد على أي معلومة', 'The golden habit: verify before you rely on any fact'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);

    /* 0 — prompt → new text */
    let c = at(0);
    frame(0, c);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    IN(q('prompt'), c + 0.8, 0.5, { y: 20 }); SND('pop', c + 0.8);
    IN(q('arr'), c + 1.6, 0.3, { x: -20 });
    IN(q('out'), c + 1.8, 0.4);
    tl.fromTo(all('#gn-out .wd'), { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.28 }, c + 2.2);
    POP(q('new'), c + 5.6, 0.4); SND('ok', c + 5.6);
    IN(q('b0'), c + 6.2, 0.4, { y: 14 });

    /* 1 — not only text */
    c = at(1);
    frame(1, c);
    OUT(Q('prompt arr out new b0'), c, 0.4);
    range(4).forEach((k) => { POP(q('o' + k), c + 0.7 + k * 0.5, 0.45); SND('pop', c + 0.7 + k * 0.5); });
    IN(q('ex'), c + 3.0, 0.4, { y: 20 });
    IN(q('dl'), c + 3.8, 0.4, { y: 20 });

    /* 2 — word by word, by probability */
    c = at(2);
    frame(2, c, 5.0);
    OUT(Q('o0 o1 o2 o3 ex dl'), c, 0.4);
    IN(q('sent'), c + 0.6, 0.5, { y: 20 });
    tl.fromTo(q('blank'), { opacity: 1 }, { opacity: 0.2, duration: 0.3, yoyo: true, repeat: 5 }, c + 1.2);
    range(3).forEach((k) => {
      IN(q('y' + k), c + 1.6 + k * 0.5, 0.3);
      tl.fromTo(q('bar' + k), { opacity: 0, scaleX: 0, transformOrigin: rtlOrigin() }, { opacity: 1, scaleX: 1, duration: 0.5 }, c + 1.6 + k * 0.5);
    });
    POP(q('pick'), c + 3.8, 0.4); SND('pop', c + 3.8);

    /* 3 — hallucination */
    c = at(3);
    frame(3, c);
    OUT(q('pick'), c, 0.3);
    tl.to(q('bar1'), { boxShadow: '0 0 30px rgba(248,113,113,.9)', duration: 0.3 }, c + 0.6);
    tl.set(q('blank'), { display: 'none' }, c + 1.0);
    tl.fromTo(q('wrong'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 1.1); SND('bad', c + 1.1);
    IN(q('h1'), c + 2.0, 0.5, { x: 40 });
    IN(q('real'), c + 3.6, 0.5, { y: 20 }); SND('ok', c + 3.6);

    /* 4 — forms */
    c = at(4);
    frame(4, c);
    OUT(Q('sent y0 y1 y2 bar0 bar1 bar2 h1 real'), c, 0.4);
    Q('f1 f2 f3').forEach((f, i) => { IN(f, c + 0.7 + i * 0.7, 0.5, { y: 30 }); SND('bad', c + 0.7 + i * 0.7); });
    IN(q('f4'), c + 3.2, 0.5, { y: 20 });

    /* 5 — five habits */
    c = at(5);
    frame(5, c, 5.4);
    OUT(Q('f1 f2 f3 f4'), c, 0.4);
    range(5).forEach((k) => { IN(q('s' + k), c + 0.7 + k * 0.7, 0.4, { x: 30 }); SND('pop', c + 0.7 + k * 0.7); });

    /* 6 — exam traps */
    c = at(6);
    frame(6, c);
    OUT(Q('s0 s1 s2 s3 s4'), c, 0.4);
    IN(q('t1'), c + 0.7, 0.5, { y: 30 }); SND('bad', c + 0.7);
    IN(q('t2'), c + 2.0, 0.5, { y: 30 }); SND('pop', c + 2.0);
    return M.done();

    function rtlOrigin() { return M.rtl ? '100% 50%' : '0% 50%'; }
  });
})();

/* =========================================================
 * anims/movies-5-2.js — lesson 5-2 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   cleanMovie : collect → clean → transform → analyze (GIGO) · a messy
 *                table · missing values · outliers · duplicates · type
 *                conversion (the table gets fixed scene by scene) ·
 *                normalization · standardization · pivot / join / aggregation
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const T = (x, y, txt, cls, fill, size) => `<text class="${cls || ''}" x="${x}" y="${y}" text-anchor="middle" font-size="${size || 34}" font-weight="800" fill="${fill || '#e2e8f0'}">${txt}</text>`;
  const RY = (i) => 80 + i * 76;

  /* the raw survey table: name · date · screen hours (5 rows, 4 problems) */
  function table(L) {
    /* columns read right-to-left in Arabic: mirror x positions inside the SVG */
    const R = MK.RTL();
    const cx = (x) => (R ? 880 - x : x);
    const rx = (x, w) => (R ? 880 - x - w : x);
    const names = [L('عمر', 'Omar'), L('علي', 'Ali'), L('كريم', 'Karim'), L('عمر', 'Omar'), L('يوسف', 'Youssef')];
    const dates = ['2026/4/1', '01 Apr 2026', '2026-04-02', '2026/4/1', '3-4-2026'];
    const fixedD = ['2026-04-01', '2026-04-01', '2026-04-02', '2026-04-01', '2026-04-03'];
    const hours = ['3', '', '9999', '3', '"4"'];
    return `<rect x="2" y="2" width="876" height="466" rx="22" fill="#0b1222" stroke="#475569" stroke-width="4"/>
      <rect x="2" y="2" width="876" height="70" rx="22" fill="#1e293b"/>
      ${T(cx(130), 48, L('الاسم', 'Name'), '', '#93c5fd')}${T(cx(440), 48, L('التاريخ', 'Date'), '', '#93c5fd')}${T(cx(750), 48, L('ساعات الشاشة', 'Screen hours'), '', '#93c5fd', 30)}
      <path d="M${cx(260)} 8 V462 M${cx(620)} 8 V462" stroke="#334155" stroke-width="3"/>
      <rect class="hl-miss" x="${rx(626, 248)}" y="${RY(1)}" width="248" height="70" rx="12" fill="rgba(248,113,113,.25)" stroke="#f87171" stroke-width="4" opacity="0"/>
      <rect class="hl-out" x="${rx(626, 248)}" y="${RY(2)}" width="248" height="70" rx="12" fill="rgba(251,191,36,.22)" stroke="#fbbf24" stroke-width="4" opacity="0"/>
      ${[0, 3].map((i) => `<rect class="hl-dup" x="8" y="${RY(i)}" width="864" height="70" rx="12" fill="rgba(167,139,250,.2)" stroke="#a78bfa" stroke-width="4" opacity="0"/>`).join('')}
      <rect class="hl-fmt" x="${rx(266, 348)}" y="${RY(0)}" width="348" height="374" rx="12" fill="rgba(56,189,248,.16)" stroke="#38bdf8" stroke-width="4" opacity="0"/>
      ${range(5).map((i) => `<g class="row r${i}">
        ${i ? `<path d="M10 ${RY(i) - 3} H870" stroke="#1e293b" stroke-width="2"/>` : ''}
        ${T(cx(130), RY(i) + 48, names[i])}
        ${T(cx(440), RY(i) + 48, dates[i], 'd-raw', '#e2e8f0', 32)}${T(cx(440), RY(i) + 48, fixedD[i], 'd-new', '#7dd3fc', 32).replace('<text ', '<text opacity="0" ')}
        ${i === 1 ? T(cx(750), RY(i) + 48, '3', 'v-imp', '#34d399').replace('<text ', '<text opacity="0" ') : ''}
        ${i === 2 ? T(cx(750), RY(i) + 48, '9999', 'v-out', '#fde68a') + T(cx(750), RY(i) + 48, '9', 'v-fix', '#34d399').replace('<text ', '<text opacity="0" ') : ''}
        ${i === 4 ? T(cx(750), RY(i) + 48, '"4"', 'h-txt', '#fca5a5') + T(cx(750), RY(i) + 48, '4', 'h-num', '#34d399').replace('<text ', '<text opacity="0" ') : ''}
        ${i === 0 || i === 3 ? T(cx(750), RY(i) + 48, hours[i]) : ''}
      </g>`).join('')}`;
  }
  /* daily sales with one spike */
  const SPIKE = `<path d="M30 300 H560" stroke="#64748b" stroke-width="4"/>
    ${range(9).map((k) => { const v = k === 6 ? 270 : [70, 90, 60, 100, 80, 75, 0, 95, 85][k]; return `<rect class="sb${k === 6 ? ' spk' : ''}" x="${44 + k * 58}" y="${300 - v}" width="40" height="${v}" rx="6" fill="${k === 6 ? '#fbbf24' : '#38bdf8'}"/>`; }).join('')}`;
  /* number line: 160–180 cm → 0–1 */
  const NL = `<path d="M60 90 H660 M60 300 H660" stroke="#94a3b8" stroke-width="5"/>
    ${[[60, '160'], [360, '170'], [660, '180']].map(([x, t]) => `<path d="M${x} 74 V106" stroke="#94a3b8" stroke-width="5"/>${T(x, 52, t, '', '#fde68a', 34)}`).join('')}
    ${[[60, '0'], [360, '0.5'], [660, '1']].map(([x, t]) => `<path d="M${x} 284 V316" stroke="#94a3b8" stroke-width="5"/>${T(x, 360, t, '', '#7dd3fc', 36)}`).join('')}
    ${[60, 360, 660].map((x, k) => `<circle class="nd nd${k}" cx="${x}" cy="90" r="18" fill="#fbbf24"/>`).join('')}`;
  /* bell curve with SD ticks */
  const BELL = `<path d="M40 320 H720" stroke="#64748b" stroke-width="4"/>
    <path class="bell" d="M40 318 C200 316 250 60 380 60 C510 60 560 316 720 318" fill="rgba(56,189,248,.18)" stroke="#38bdf8" stroke-width="6"/>
    ${[-2, -1, 0, 1, 2].map((v) => `<path d="M${380 + v * 140} 312 V332" stroke="#94a3b8" stroke-width="4"/>${T(380 + v * 140, 372, (v > 0 ? '+' : '') + v, '', v ? '#cbd5e1' : '#fde68a', 32)}`).join('')}
    <path d="M380 60 V320" stroke="#fde68a" stroke-width="4" stroke-dasharray="10 8"/>
    <circle class="zdot" cx="380" cy="320" r="20" fill="#f472b6"/>`;
  /* reshaping mini-diagrams */
  const PIV = `${range(6).map((k) => `<rect class="pl" x="40" y="${20 + k * 40}" width="200" height="30" rx="6" fill="#38bdf8"/>`).join('')}
    <path class="parr" d="M262 140 H318" stroke="#fde68a" stroke-width="8" marker-end="none"/><path class="parr" d="M306 124 L326 140 L306 156" fill="none" stroke="#fde68a" stroke-width="8"/>
    ${range(6).map((k) => `<rect class="pg" x="${350 + (k % 3) * 64}" y="${70 + Math.floor(k / 3) * 74}" width="56" height="64" rx="8" fill="#34d399"/>`).join('')}`;
  const JN = `${range(3).map((k) => `<rect class="ja" x="20" y="${30 + k * 50}" width="60" height="40" rx="6" fill="#fbbf24"/><rect class="ja" x="86" y="${30 + k * 50}" width="110" height="40" rx="6" fill="#38bdf8"/>`).join('')}
    ${range(3).map((k) => `<rect class="jb" x="${370}" y="${30 + k * 50}" width="60" height="40" rx="6" fill="#fbbf24"/><rect class="jb" x="436" y="${30 + k * 50}" width="110" height="40" rx="6" fill="#a78bfa"/>`).join('')}
    ${T(283, 110, '🔑', '', '#fde68a', 56)}
    ${range(3).map((k) => `<g class="jc"><rect x="120" y="${200 + k * 26}" width="60" height="22" rx="5" fill="#fbbf24"/><rect x="186" y="${200 + k * 26}" width="110" height="22" rx="5" fill="#38bdf8"/><rect x="302" y="${200 + k * 26}" width="110" height="22" rx="5" fill="#a78bfa"/></g>`).join('')}`;
  const AG = `<path d="M20 250 H540" stroke="#64748b" stroke-width="4"/>
    ${range(12).map((k) => `<rect class="ad" x="${30 + k * 22}" y="${250 - [60, 80, 50, 90, 70, 65, 85, 55, 75, 95, 60, 70][k]}" width="16" height="${[60, 80, 50, 90, 70, 65, 85, 55, 75, 95, 60, 70][k]}" rx="4" fill="#38bdf8"/>`).join('')}
    <path class="aarr" d="M310 150 H370" stroke="#fde68a" stroke-width="8"/><path class="aarr" d="M358 134 L378 150 L358 166" fill="none" stroke="#fde68a" stroke-width="8"/>
    <rect class="am" x="410" y="30" width="90" height="220" rx="10" fill="#34d399"/>${T(455, 290, 'Σ', 'am', '#d1fae5', 40)}`;

  K.defineAnim('cleanMovie', (stage, props, api) => {
    const U = MK.uiL12('c2-'), B = MK.look.kit('c2-', MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l52 mv-l12', prefix: 'c2-', beats: 10,
      html: (L) => `
  <div id="c2-stage" class="mv-stage">
    ${[['📥', L('١ الجمع', '1 Collect'), L('استطلاعات · مفتوحة · API', 'surveys · open data · API'), 't-blue'],
       ['🧹', L('٢ التنظيف', '2 Clean'), L('مفقودة · شاذة · مكررة', 'missing · outliers · duplicates'), 't-amber'],
       ['🔄', L('٣ التحويل', '3 Transform'), L('أنواع · مقياس · تشكيل', 'types · scale · reshape'), 't-violet'],
       ['📊', L('٤ التحليل', '4 Analyze'), L('إحصاء · رسوم · تعلّم آلي', 'statistics · charts · ML'), 't-green']]
      .map(([ic, h, p, th], k) => U.box('p' + k, 70 + k * 455, 200, 415, th, { ic, h, p })).join('')}
    ${U.pill('gigo', 470, 470, '🗑️ ' + L('مدخلات خاطئة — مخرجات خاطئة', 'Garbage in → garbage out'), 't-red')}
    ${U.pill('gig2', 330, 570, L('حساب دقيق على بيانات معيوبة = إجابة معيوبة', 'Careful calculation on flawed data = a flawed answer'), 't-slate')}

    ${U.art('tb', 70, 170, 880, 470, '0 0 880 470', table(L))}
    ${[['🕳️', L('قيمة مفقودة', 'Missing value'), 't-red'], ['📈', L('قيمة شاذة', 'Outlier'), 't-amber'], ['👯', L('صف مكرر', 'Duplicate row'), 't-violet'], ['📅', L('صيغ مختلفة', 'Mixed formats'), 't-blue']]
      .map(([e, t, th], k) => U.pill('pb' + k, 1040, 200 + k * 110, e + ' ' + t, th)).join('')}

    ${U.box('del', 1010, 170, 840, 't-red', { h: '🗑️ ' + L('الحذف', 'Deletion'), p: L('نشيل السجل/المتغير — لما الفقد قليل ومايسببش تحيّز', 'remove the row/column — when few, scattered without bias') })}
    ${U.box('imp', 1010, 340, 840, 't-green', { h: '🧩 ' + L('التعويض', 'Imputation'), p: L('نقدّر قيمة بديلة زي الوسيط — ونفحص أثرها في التوزيع', 'fill with mean, median or neighbour — if the trend stays') })}
    ${U.box('flg', 1010, 510, 840, 't-amber', { h: '🚩 ' + L('وضع علامة', 'Flagging'), p: L('نسيب مؤشر إنها كانت مفقودة — لما الغياب نفسه ليه معنى', 'mark it as missing — when the absence itself means something') })}

    ${U.art('spk', 1040, 160, 600, 320, '0 0 600 320', SPIKE)}
    ${U.pill('oq', 1100, 500, '🤔 ' + L('خطأ… ولا حقيقة نادرة؟', 'An error… or a rare truth?'), 'solid')}
    ${U.pill('oe', 1010, 590, '❌ ' + L('خطأ إدخال/قياس ← صحّح أو احذف', 'Entry/measurement error → fix or delete'), 't-red')}
    ${U.pill('or', 1010, 680, '✅ ' + L('حقيقية (عرض/حدث) ← احتفظ بيها مبدئيًا', 'Real (a sale/event) → keep it for now'), 't-green')}

    ${U.box('dup', 1010, 180, 840, 't-violet', { ic: '👯', h: L('البيانات المكررة', 'Duplicate data'), p: L('بتغيّر الحسابات ← بتتشال بعد التأكد', 'distort totals → removed in principle') })}
    ${U.pill('dq', 1010, 430, '🧾🧾 ' + L('نفس العميل اشترى مرتين = عمليتين حقيقيتين', 'Same customer bought twice = two real sales'), 't-amber')}
    ${U.pill('dk', 1010, 530, '✔ ' + L('نتأكّد إنه تكرار فعلي قبل ما نشيله', 'Confirm a true duplicate before removing'), 't-green')}

    ${U.pill('k0', 1010, 190, '🔢 "123" ' + L('←', '→') + ' 123 · ' + L('من نص لرقم', 'string to number'), 't-blue')}
    ${U.pill('k1', 1010, 300, '📅 ' + L('توحيد صيغة التاريخ', 'Unify date format') + ' → 2026-04-01', 't-blue')}
    ${U.pill('k2', 1010, 410, '🏷️ M/F + Male/Female → Male/Female', 't-blue')}
    ${U.box('kb', 1010, 520, 840, 't-blue', { h: L('تحويل نوع البيانات', 'Data type conversion'), p: L('نرتّب الصيغة عشان البيانات تبقى قابلة للتحليل', 'align the format so data can be analyzed') })}

    ${U.pill('raw', 100, 170, '📏 ' + L('الطول 160–180 سم', 'Height 160–180 cm') + ' · ⚖️ ' + L('الوزن 50–90 كجم', 'Weight 50–90 kg'), 't-slate')}
    ${U.pill('dom', 100, 270, '⚠️ ' + L('الأرقام الأكبر بتسيطر على النتيجة', 'Bigger numbers dominate the result'), 't-red')}
    ${U.art('nl', 1100, 170, 720, 400, '0 0 720 400', NL)}
    ${U.pill('nf', 100, 420, '🧮 ' + L('(القيمة − الأصغر) ÷ (الأكبر − الأصغر)', '(value − min) ÷ (max − min)'), 'solid')}
    ${B.card('cmp', 1100, 610, 720, 0, 'c-green', { row: true, ic: '⚖️', h: L('70 كجم ← 0.5 · 170 سم ← 0.5', '70 kg → 0.5 · 170 cm → 0.5'), p: L('دلوقتي الاتنين على نفس المقياس', 'now both sit on the same scale') })}
    ${U.box('nb', 100, 520, 900, 't-green', { h: L('التحويل الكمي (Min‑Max)', 'Normalization (Min‑Max)'), p: L('من 0 لـ 1 ← نقارن متغيرات بوحدات مختلفة', '0 to 1 → compare variables with different units') })}

    ${U.art('bell', 1080, 170, 760, 400, '0 0 760 400', BELL)}
    ${U.pill('zf', 100, 200, '🧮 ' + L('(القيمة − المتوسط) ÷ الانحراف المعياري', '(value − mean) ÷ standard deviation'), 'solid')}
    ${U.pill('zx', 100, 310, '📝 ' + L('درجتك = +1.5 ← فوق المتوسط بانحراف ونص', 'Your score = +1.5 → 1.5 SDs above the mean'), 't-pink')}
    ${U.box('zb', 100, 430, 900, 't-violet', { h: L('التوحيد القياسي', 'Standardization'), p: L('متوسط 0 وانحراف معياري 1 ← مكان القيمة بالنسبة للتشتّت', 'mean 0, SD 1 → where a value sits relative to the spread') })}

    ${U.art('pv', 80, 160, 560, 300, '0 0 560 300', PIV)}
    ${U.art('jn', 680, 160, 560, 300, '0 0 560 300', JN)}
    ${U.art('ag', 1280, 160, 560, 300, '0 0 560 300', AG)}
    ${U.box('pvb', 80, 480, 560, 't-green', { h: L('التحويل المحوري', 'Pivot'), p: L('رأسي ← جدول صف × عمود', 'vertical → row × column table') })}
    ${U.box('jnb', 680, 480, 560, 't-amber', { h: L('الربط', 'Join'), p: L('نوصل جداول بعنصر مشترك', 'link tables by a shared key') })}
    ${U.box('agb', 1280, 480, 560, 't-blue', { h: L('التجميع', 'Aggregation'), p: L('مجاميع ومتوسطات لكل مجموعة', 'totals and means per group') })}

    ${U.hd(0, '🧹 ' + L('من الخام للتحليل', 'From raw data to analysis'))}
    ${U.hd(1, '😵 ' + L('جدول خام… فوضى', 'A raw table… a mess'))}
    ${U.hd(2, '🕳️ ' + L('القيم المفقودة', 'Missing values'))}
    ${U.hd(3, '📈 ' + L('القيم الشاذة', 'Outliers'))}
    ${U.hd(4, '👯 ' + L('البيانات المكررة', 'Duplicate data'))}
    ${U.hd(5, '🔢 ' + L('تحويل نوع البيانات', 'Data type conversion'))}
    ${U.hd(6, '📏 ' + L('التحويل الكمي: من 0 لـ 1', 'Normalization: 0 to 1'))}
    ${U.hd(7, '🔔 ' + L('التوحيد القياسي', 'Standardization'))}
    ${U.hd(8, '🧩 ' + L('إعادة تشكيل البيانات', 'Reshaping data'))}
    ${U.nt(0, L('مفيش وصفة واحدة لكل البيانات — القرار حسب المشكلة وسؤال التحليل', 'No single fix fits all data — it depends on the problem and the question'), 'warn')}
    ${U.nt(2, L('70% فاضي؟ تعويض المتوسط هنا هيطلّع أرقام بعيدة عن الواقع', '70% blank? Imputing a mean here gives unrealistic values'), 'warn')}
    ${U.nt(3, L('اتضح إنها غلطة كتابة: 9999 ← 9', 'It turned out to be a typo: 9999 → 9'), 'ok')}
    ${U.nt(5, L('أرقام متخزّنة كنص ممكن تفشّل الحساب · تواريخ مش موحّدة = يوم واحد يتقسم لأيام', 'Numbers stored as text cannot be summed · mixed dates split one day into many'))}
    ${U.nt(7, '⚠️ ' + L('التحويل الكمي = 0 لـ 1 ثابت · التوحيد القياسي = متوسط 0 وانحراف 1', 'Normalization = a fixed 0–1 · standardization = mean 0, SD 1'), 'warn')}
    ${U.nt(8, L('وضّح الغرض الأول… وبعدين خطّط التشكيل', 'Clarify the purpose first… then plan the reshape'), 'ok')}
  </div>
  <div id="c2-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${B.card('x0', 70, 170, 410, 400, 'c-amber', { ic: '🧹', h: L('التنظيف', 'Cleaning'), p: L('مفقودة: حذف/تعويض/علامة · شاذة: حسب السبب · مكررة: لو فعلية', 'missing: delete/impute/flag · outliers: by cause · duplicates: if real') })}
    ${B.card('x1', 530, 170, 410, 400, 'c-blue', { ic: '🔢', h: L('تحويل النوع', 'Type conversion'), p: L('نص ← رقم · تاريخ موحّد · كتابة موحّدة', 'text → number · one date format · one notation') })}
    ${B.card('x2', 990, 170, 410, 400, 'c-violet', { ic: '📏🔔', h: L('المقياس', 'Scaling'), p: L('كمي = من 0 لـ 1 · قياسي = متوسط 0 وانحراف 1', 'normalization = 0 to 1 · standardization = mean 0, SD 1') })}
    ${B.card('x3', 1450, 170, 410, 400, 'c-green', { ic: '🧩', h: L('إعادة التشكيل', 'Reshaping'), p: L('محوري · ربط · تجميع', 'pivot · join · aggregate') })}
    ${B.mid('xb', 620, '🎯 ' + L('كل خطوة قرار بيقوده الغرض — مش قاعدة ثابتة', 'every step is a decision led by the purpose — not a fixed rule'), 'c-amber big')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#c2-' + id + ' .' + c);
    const show = (id, c, t, d) => tl.to(sel(id, c), { opacity: 1, duration: d || 0.4 }, t);
    const hide = (id, c, t, d) => tl.to(sel(id, c), { opacity: 0, duration: d || 0.4 }, t);
    const blink = (id, c, t) => tl.fromTo(sel(id, c), { opacity: 0 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: 3 }, t);

    /* 0 — the pipeline */
    let c = at(0);
    frame(0, c, 5.0);
    range(4).forEach((k) => { IN(q('p' + k), c + 0.5 + k * 0.6, 0.45, { x: -40 * sx }); SND('pop', c + 0.5 + k * 0.6); });
    POP(q('gigo'), c + 3.2, 0.5); SND('bad', c + 3.2);
    IN(q('gig2'), c + 4.0, 0.4, { y: 20 });

    /* 1 — a messy raw table */
    c = at(1);
    frame(1, c);
    OUT(Q('p0 p1 p2 p3 gigo gig2'), c, 0.4);
    IN(q('tb'), c + 0.5, 0.5, { y: 30 });
    ['hl-miss', 'hl-out', 'hl-dup', 'hl-fmt'].forEach((h, k) => {
      blink('tb', h, c + 1.4 + k * 0.9);
      IN(q('pb' + k), c + 1.4 + k * 0.9, 0.4, { x: 30 * sx }); SND('pop', c + 1.4 + k * 0.9);
    });

    /* 2 — missing values */
    c = at(2);
    frame(2, c, 5.4);
    OUT(Q('pb0 pb1 pb2 pb3'), c, 0.3);
    show('tb', 'hl-miss', c + 0.4);
    IN(q('del'), c + 1.0, 0.45, { x: 30 * sx }); SND('pop', c + 1.0);
    IN(q('imp'), c + 2.0, 0.45, { x: 30 * sx }); SND('pop', c + 2.0);
    IN(q('flg'), c + 3.0, 0.45, { x: 30 * sx }); SND('pop', c + 3.0);
    show('tb', 'v-imp', c + 4.2, 0.5); SND('ok', c + 4.2);
    tl.to(sel('tb', 'hl-miss'), { attr: { stroke: '#34d399', fill: 'rgba(52,211,153,.2)' }, duration: 0.4 }, c + 4.2);

    /* 3 — outliers */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('del imp flg'), c, 0.3); hide('tb', 'hl-miss', c);
    show('tb', 'hl-out', c + 0.4);
    IN(q('spk'), c + 0.8, 0.5, { y: 30 });
    tl.fromTo(sel('spk', 'sb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.6)' }, c + 1.0);
    tl.fromTo(sel('spk', 'spk'), { opacity: 1 }, { opacity: 0.35, duration: 0.2, yoyo: true, repeat: 5 }, c + 2.2);
    POP(q('oq'), c + 2.6, 0.45);
    IN(q('oe'), c + 3.4, 0.4, { x: 30 * sx }); SND('bad', c + 3.4);
    IN(q('or'), c + 4.2, 0.4, { x: 30 * sx }); SND('ok', c + 4.2);
    hide('tb', 'v-out', c + 5.4, 0.3); show('tb', 'v-fix', c + 5.6, 0.4); SND('ok', c + 5.6);

    /* 4 — duplicates */
    c = at(4);
    frame(4, c);
    OUT(Q('spk oq oe or'), c, 0.3); hide('tb', 'hl-out', c);
    show('tb', 'hl-dup', c + 0.4);
    IN(q('dup'), c + 0.8, 0.5, { x: 30 * sx }); SND('pop', c + 0.8);
    IN(q('dq'), c + 2.0, 0.4, { y: 20 });
    IN(q('dk'), c + 3.0, 0.4, { y: 20 }); SND('ok', c + 3.0);
    tl.to(sel('tb', 'r3'), { opacity: 0.12, duration: 0.5 }, c + 4.2);
    tl.to(sel('tb', 'hl-dup')[1], { opacity: 0, duration: 0.5 }, c + 4.2); SND('tap', c + 4.2);

    /* 5 — data type conversion */
    c = at(5);
    frame(5, c, 5.2);
    OUT(Q('dup dq dk'), c, 0.3); tl.to(sel('tb', 'hl-dup')[0], { opacity: 0, duration: 0.3 }, c);
    show('tb', 'hl-fmt', c + 0.4);
    IN(q('k0'), c + 0.8, 0.4, { x: 30 * sx }); SND('pop', c + 0.8);
    hide('tb', 'h-txt', c + 1.2, 0.3); show('tb', 'h-num', c + 1.4, 0.4);
    IN(q('k1'), c + 2.0, 0.4, { x: 30 * sx }); SND('pop', c + 2.0);
    hide('tb', 'd-raw', c + 2.4, 0.3); show('tb', 'd-new', c + 2.6, 0.5);
    IN(q('k2'), c + 3.2, 0.4, { x: 30 * sx }); SND('pop', c + 3.2);
    IN(q('kb'), c + 4.0, 0.5, { y: 20 }); SND('ok', c + 4.0);

    /* 6 — normalization */
    c = at(6);
    frame(6, c);
    OUT(Q('tb k0 k1 k2 kb'), c, 0.4);
    IN(q('raw'), c + 0.5, 0.4, { x: 30 * sx });
    IN(q('dom'), c + 1.2, 0.4, { x: 30 * sx }); SND('bad', c + 1.2);
    IN(q('nl'), c + 1.8, 0.5, { y: 30 });
    range(3).forEach((k) => { tl.fromTo(sel('nl', 'nd' + k), { y: 0 }, { y: 210, duration: 0.7, ease: 'power2.inOut' }, c + 2.6 + k * 0.4); });
    SND('pop', c + 2.6);
    POP(q('nf'), c + 4.0, 0.45);
    IN(q('nb'), c + 4.8, 0.5, { y: 20 }); SND('ok', c + 4.8);
    IN(q('cmp'), c + 5.6, 0.5, { y: 20 });

    /* 7 — standardization */
    c = at(7);
    frame(7, c, 5.6);
    OUT(Q('raw dom nl nf nb cmp'), c, 0.4);
    IN(q('bell'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(sel('bell', 'bell'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.8, ease: 'back.out(1.4)' }, c + 0.7);
    POP(q('zf'), c + 1.8, 0.45);
    tl.fromTo(sel('bell', 'zdot'), { x: 0 }, { x: 210, duration: 1.0, ease: 'power2.inOut' }, c + 2.6); SND('tap', c + 2.6);
    IN(q('zx'), c + 3.4, 0.4, { x: 30 * sx });
    IN(q('zb'), c + 4.2, 0.5, { y: 20 }); SND('ok', c + 4.2);

    /* 8 — reshaping: pivot · join · aggregation */
    c = at(8);
    frame(8, c, 6.4);
    OUT(Q('bell zf zx zb'), c, 0.4);
    IN(q('pv'), c + 0.5, 0.4); IN(q('pvb'), c + 0.5, 0.4, { y: 20 }); SND('pop', c + 0.5);
    tl.fromTo(sel('pv', 'pg'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 }, c + 1.1);
    tl.to(sel('pv', 'pl'), { opacity: 0.3, duration: 0.4 }, c + 1.1);
    IN(q('jn'), c + 2.2, 0.4); IN(q('jnb'), c + 2.2, 0.4, { y: 20 }); SND('pop', c + 2.2);
    tl.fromTo(sel('jn', 'jc'), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 }, c + 2.9);
    IN(q('ag'), c + 4.0, 0.4); IN(q('agb'), c + 4.0, 0.4, { y: 20 }); SND('pop', c + 4.0);
    tl.to(sel('ag', 'ad'), { opacity: 0.3, duration: 0.4, stagger: 0.04 }, c + 4.6);
    tl.fromTo(sel('ag', 'am'), { opacity: 0, scaleY: 0, transformOrigin: '50% 100%' }, { opacity: 1, scaleY: 1, duration: 0.6, ease: 'back.out(1.5)' }, c + 5.0); SND('ok', c + 5.0);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.5, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.5); });
    POP(q('xb'), c + 3.2, 0.5); SND('ok', c + 3.2);
    M.loop(9, 3.8, () => MK.look.glowCycle(Q('x0 x1 x2 x3'), 'rgba(251,191,36,.8)', 0.5));
    /* living loops */
    M.loop(0, 4.6, () => M.cycle(Q('p0 p1 p2 p3'), 'rgba(56,189,248,.85)', 0.5));
    M.loop(1, 5.0, () => gsap.timeline({ repeat: -1, repeatDelay: 0.4 }).fromTo(sel('tb', 'hl-miss'), { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 }).fromTo(sel('tb', 'hl-out'), { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 }).fromTo(sel('tb', 'hl-dup'), { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 }).fromTo(sel('tb', 'hl-fmt'), { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 1 }));
    M.loop(2, 5.0, () => M.cycle(Q('del imp flg'), 'rgba(251,191,36,.85)', 0.6));
    M.loop(3, 6.2, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('spk', 'spk'), { opacity: 1 }, { opacity: 0.4, duration: 0.8, ease: 'sine.inOut' }));
    M.loop(4, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('tb', 'hl-dup')[0], { opacity: 0.2 }, { opacity: 1, duration: 1.0, ease: 'sine.inOut' }));
    M.loop(5, 4.8, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('tb', 'd-new'), { opacity: 1 }, { opacity: 0.45, duration: 1.0, ease: 'sine.inOut', stagger: 0.15 }));
    /* the dots keep sliding from cm to the 0–1 scale */
    M.loop(6, 5.6, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(sel('nl', 'nd'), { y: 0 }, { y: 210, duration: 1.0, ease: 'power2.inOut', stagger: 0.35 }));
    M.loop(7, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('bell', 'zdot'), { x: 0 }, { x: 210, duration: 1.8, ease: 'sine.inOut' }));
    M.loop(8, 6.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
      .fromTo(sel('pv', 'pg'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 })
      .fromTo(sel('jn', 'jc'), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15 })
      .fromTo(sel('ag', 'am'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, ease: 'back.out(1.5)' }));
    return M.done();
  });
})();

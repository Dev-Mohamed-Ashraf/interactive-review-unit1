/* =========================================================
 * anims/movies-6-3.js — lesson 6-3 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   vizMovie : table → chart, two roles · bar/line/scatter (1–2 variables) ·
 *              overplotting · heatmap (day × time) · mosaic plot · story:
 *              one-sentence message · select elements · supporting info ·
 *              misleading but "correct" charts (axis not from zero)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const T = (x, y, txt, fill, size, w) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 28}" font-weight="${w || 800}" fill="${fill || '#cbd5e1'}">${txt}</text>`;
  /* weekly study minutes: a numbers table vs the same data as a line */
  const VALS = [40, 55, 35, 70, 90, 60, 120];
  const TAB = (L) => `<rect x="2" y="2" width="556" height="356" rx="20" fill="#0b1222" stroke="#475569" stroke-width="4"/>
    ${VALS.map((v, k) => `${T(140, 50 + k * 46, [L('سبت', 'Sat'), L('أحد', 'Sun'), L('اتنين', 'Mon'), L('تلات', 'Tue'), L('أربع', 'Wed'), L('خميس', 'Thu'), L('جمعة', 'Fri')][k], '#93c5fd', 28)}${T(400, 50 + k * 46, v, '#e2e8f0', 30)}`).join('')}`;
  const LINE = `<path d="M30 20 V320 H540" fill="none" stroke="#64748b" stroke-width="4"/>
    <path class="ln" d="${VALS.map((v, k) => `${k ? 'L' : 'M'}${60 + k * 75} ${310 - v * 2.2}`).join(' ')}" fill="none" stroke="#34d399" stroke-width="7" stroke-linejoin="round"/>
    ${VALS.map((v, k) => `<circle class="lp" cx="${60 + k * 75}" cy="${310 - v * 2.2}" r="10" fill="${k === 6 ? '#fbbf24' : '#34d399'}"/>`).join('')}`;
  /* three common chart types */
  const BAR = `<path d="M20 20 V230 H330" fill="none" stroke="#64748b" stroke-width="4"/>${[120, 170, 90, 150].map((v, k) => `<rect class="cb" x="${45 + k * 70}" y="${230 - v}" width="48" height="${v}" rx="6" fill="#38bdf8"/>`).join('')}`;
  const LN2 = `<path d="M20 20 V230 H330" fill="none" stroke="#64748b" stroke-width="4"/><path class="cl" d="M40 200 L95 170 L150 180 L205 120 L260 90 L315 50" fill="none" stroke="#34d399" stroke-width="6"/>`;
  const SC = `<path d="M20 20 V230 H330" fill="none" stroke="#64748b" stroke-width="4"/>${range(16).map((k) => `<circle class="cs" cx="${45 + k * 17}" cy="${(215 - k * 11 + Math.sin(k * 2.7) * 22).toFixed(0)}" r="8" fill="#fbbf24"/>`).join('')}`;
  /* overplotting: a blob of points vs density cells */
  const BLOB = `<path d="M20 20 V380 H620" fill="none" stroke="#64748b" stroke-width="4"/>
    ${range(260).map((k) => { const a = k * 2.399, r = 150 * Math.sqrt((k + 0.5) / 260); return `<circle class="bp" cx="${(320 + r * Math.cos(a) * 1.4).toFixed(0)}" cy="${(200 + r * Math.sin(a) * 0.9).toFixed(0)}" r="9" fill="#38bdf8" opacity=".55"/>`; }).join('')}`;
  const DENS = `${range(48).map((k) => { const cx = k % 8, cy = Math.floor(k / 8); const d = Math.max(0, 1 - Math.hypot((cx - 3.5) / 3.2, (cy - 2.5) / 2.4)); return `<rect class="dc" x="${30 + cx * 74}" y="${20 + cy * 58}" width="70" height="54" rx="6" fill="#ef4444" opacity="${(0.08 + d * 0.92).toFixed(2)}"/>`; }).join('')}`;
  /* heatmap: day × time (textbook values) */
  const HM = [[38, 12, 10, 14, 11, 13, 42], [68, 25, 22, 24, 28, 72, 66], [110, 52, 48, 55, 78, 115, 75]];
  const HEAT = (L) => {
    const R = MK.RTL();
    const days = [L('سبت', 'Sat'), L('أحد', 'Sun'), L('اتنين', 'Mon'), L('تلات', 'Tue'), L('أربع', 'Wed'), L('خميس', 'Thu'), L('جمعة', 'Fri')];
    const X = (k) => (R ? 1000 - 140 - (k + 1) * 120 + 20 : 150 + k * 120);
    return `${days.map((d, k) => T(X(k) + 55, 34, d, '#93c5fd', 28)).join('')}
      ${['10:00', '14:00', '18:00'].map((t, r) => T(R ? 930 : 70, 98 + r * 104, t, '#93c5fd', 28)).join('')}
      ${HM.map((row, r) => row.map((v, k) => `<rect class="hc" x="${X(k)}" y="${52 + r * 104}" width="110" height="94" rx="10" fill="#f97316" opacity="${(0.12 + (v / 115) * 0.88).toFixed(2)}"/>${T(X(k) + 55, 110 + r * 104, v, '#fff', 30, 900)}`).join('')).join('')}`;
  };
  /* mosaic: year group × favourite subject (areas) */
  const MOS = (L) => {
    const cols = [{ w: 0.58, parts: [0.4, 0.3, 0.3] }, { w: 0.42, parts: [0.22, 0.43, 0.35] }];
    const colr = ['#38bdf8', '#34d399', '#fbbf24'];
    let x = 10, out = '';
    cols.forEach((c, ci) => {
      const W = c.w * 640; let y = 10;
      c.parts.forEach((p, pi) => { const H = p * 400; out += `<rect class="mz" x="${x}" y="${y}" width="${W - 8}" height="${H - 8}" rx="8" fill="${colr[pi]}" opacity=".85"/>${T(x + W / 2, y + H / 2 + 10, Math.round(p * 100) + '%', '#0f172a', 30, 900)}`; y += H; });
      out += T(x + W / 2, 450, ci ? L('تانية (42%)', 'Year 2 (42%)') : L('أولى (58%)', 'Year 1 (58%)'), '#e2e8f0', 30);
      x += W;
    });
    return out;
  };
  /* story chart: class averages, one bar highlighted */
  const STORY = (L) => `<path d="M60 30 V330 H600" fill="none" stroke="#64748b" stroke-width="4"/>
    ${[62, 71, 88, 66, 69].map((v, k) => `<rect class="sb${k === 2 ? ' key' : ' rest'}" x="${90 + k * 100}" y="${330 - v * 3}" width="70" height="${v * 3}" rx="8" fill="${k === 2 ? '#fbbf24' : '#38bdf8'}"/>`).join('')}
    <g class="lab" opacity="0">${T(330, 375, L('الفصل', 'Class'), '#e2e8f0', 26)}<text x="30" y="180" font-size="26" font-weight="800" fill="#e2e8f0" text-anchor="middle" transform="rotate(-90 30 180)">${L('الدرجة', 'Points')}</text></g>`;
  /* misleading axis: 98 vs 100 with the axis starting at 96, then at 0 */
  const MIS = `<path d="M60 20 V330 H560" fill="none" stroke="#64748b" stroke-width="4"/>
    <rect class="m1" x="150" y="180" width="110" height="150" rx="8" fill="#38bdf8"/><rect class="m2" x="340" y="30" width="110" height="300" rx="8" fill="#f87171"/>
    <g class="ax96">${T(36, 336, '96', '#fca5a5', 26)}</g><g class="ax0" opacity="0">${T(36, 336, '0', '#a7f3d0', 26)}</g>`;

  K.defineAnim('vizMovie', (stage, props, api) => {
    const U = MK.uiL('v3-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l63', prefix: 'v3-', beats: 10,
      html: (L) => `
  <div id="v3-stage" class="mv-stage">
    ${U.art('tab', 90, 170, 560, 360, '0 0 560 360', TAB(L))}
    ${U.art('line', 700, 170, 560, 340, '0 0 560 340', LINE)}
    ${U.pill('jump', 90, 610, '👀 ' + L('النمط بيقفز قدّامك: الجمعة أعلى يوم', 'The pattern jumps out: Friday is highest'), 'solid')}
    ${U.box('r1', 1310, 170, 520, 't-violet', { ic: '🧠', h: L('دور ١: فهم المحلّل نفسه', 'Role 1: the analyst’s own understanding'), p: L('التوزيع والاتجاه والقيم الشاذة', 'distribution, trends, outliers') })}
    ${U.box('r2', 1310, 420, 520, 't-green', { ic: '📣', h: L('دور ٢: توصيل للآخرين', 'Role 2: communicating to others'), p: L('ننقل النتيجة بسهولة فهم', 'convey results understandably') })}

    ${U.art('g1', 90, 180, 350, 250, '0 0 350 250', BAR)}
    ${U.art('g2', 785, 180, 350, 250, '0 0 350 250', LN2)}
    ${U.art('g3', 1480, 180, 350, 250, '0 0 350 250', SC)}
    ${U.box('g1b', 60, 450, 410, 't-blue', { h: L('أعمدة', 'Bar'), p: L('نقارن قيم', 'compare values') })}
    ${U.box('g2b', 755, 450, 410, 't-green', { h: L('خطوط', 'Line'), p: L('تغيّر مع الزمن', 'change over time') })}
    ${U.box('g3b', 1450, 450, 410, 't-amber', { h: L('مبعثر', 'Scatter'), p: L('متغيرين كمّيين', 'two quantities') })}
    ${U.pill('g12', 430, 640, L('دول بيناسبوا متغير أو اتنين — والاختيار حسب عدد المتغيرات ونوعها والغرض', 'These suit one or two variables — choose by number, type and purpose'), 't-slate')}

    ${U.art('blob', 90, 170, 640, 400, '0 0 640 400', BLOB)}
    ${U.art('dens', 1150, 190, 640, 380, '0 0 640 380', DENS)}
    ${U.pill('op', 90, 600, '😵 ' + L('5000 نقطة = كتلة صمّاء: التراكب الزائد للنقاط', '5,000 points = one blob: overplotting'), 't-red')}
    ${U.pill('opf', 1080, 600, '✅ ' + L('خلايا ملوّنة بتبيّن فين الكثافة', 'coloured cells show where density is'), 't-green')}
    ${U.emo('arr', 830, 300, 160, 90, L('⬅', '➜'))}

    ${U.art('heat', 90, 160, 1000, 380, '0 0 1000 380', HEAT(L))}
    ${U.box('hb', 1140, 170, 690, 't-amber', { ic: '🌡️', h: L('الخريطة الحرارية', 'Heatmap'), p: L('محورين + قيمة تالتة رقمية باللون', 'two axes + a third numeric value as colour'), s: L('عدد العملاء: يوم × وقت', 'customers: day × time') })}
    ${U.pill('hk', 1140, 460, '🔥 ' + L('أزحم وقت: مسا الخميس والجمعة والسبت', 'Busiest: Thu, Fri and Sat evenings'), 'solid')}
    ${U.pill('hw', 1140, 560, L('بتنفع كمان للمتغيرات الفئوية', 'also suits categorical combinations'), 't-slate')}

    ${U.art('mos', 90, 160, 660, 480, '0 0 660 480', MOS(L))}
    ${['#38bdf8', '#34d399', '#fbbf24'].map((c, k) => `<div id="v3-lg${k}" class="pill t-slate later" style="inset-inline-start:800px;top:${180 + k * 80}px;border-color:${c}">${['📐 ' + L('رياضيات', 'Maths'), '🔬 ' + L('علوم', 'Science'), '🗣️ ' + L('لغات', 'Languages')][k]}</div>`).join('')}
    ${U.box('mb', 1120, 170, 710, 't-blue', { ic: '🧩', h: L('مخطط المستطيلات (الفسيفساء)', 'Mosaic plot'), p: L('متغيرين فئويين — النسبة = المساحة', 'two categorical variables — share = area'), s: L('عرض العمود = نسبة الفئة · الارتفاع = نسبتها جوّه مجموعتها', 'width = group share · height = share within group') })}

    ${U.art('st', 90, 180, 640, 400, '0 0 640 400', STORY(L))}
    ${U.pill('ttl', 90, 600, '📝 ' + L('«فصل 3 جاب أعلى متوسط في الرياضيات»', '"Class 3 scored highest in maths"'), 'solid')}
    ${U.box('s1', 820, 180, 1010, 't-amber', { ic: '①', h: L('وضّح الرسالة', 'Clarify the message'), p: L('اللي عايز تقوله لازم يتقال في جملة واحدة — والعنوان يحمل الادعاء', 'what you want to say fits one sentence — the title carries the claim') })}
    ${U.box('s2', 820, 380, 1010, 't-blue', { ic: '②', h: L('اختار العناصر', 'Select the elements'), p: L('شيل اللي مالوش علاقة، ولوّن المهم بس والباقي باهت', 'remove what does not serve it; colour only the key part') })}
    ${U.box('s3', 820, 580, 1010, 't-green', { ic: '③', h: L('معلومات داعمة', 'Supporting information'), p: L('عنوان · تسميات المحاور · الوحدات · ملاحظات', 'title · axis labels · units · notes') })}

    ${U.art('mis', 90, 170, 600, 360, '0 0 600 360', MIS)}
    ${U.pill('mw', 760, 190, '😱 ' + L('محور مش من صفر: 98 قصاد 100 تبان أضعاف!', 'Axis not from zero: 98 vs 100 looks huge!'), 't-red')}
    ${U.pill('mf', 760, 290, '✅ ' + L('ابدأ المحور من صفر — من غير ما تغيّر ولا رقم', 'Start the axis at zero — without changing one number'), 't-green')}
    ${U.pill('m2', 760, 400, '🎨 ' + L('ألوان من غير مفتاح ← مالهاش معنى', 'Colours with no key → meaningless'), 't-amber')}
    ${U.pill('m3', 760, 500, '✂️ ' + L('حذف فئات ← صورة ناقصة', 'Dropped categories → an incomplete picture'), 't-amber')}
    ${U.pill('aud', 760, 610, '👥 ' + L('في الآخر: اقعد مكان الجمهور واتأكّد إن الرسالة وصلت', 'Finally: sit in the audience’s seat and check the message lands'), 'solid')}

    ${U.hd(0, '📊 ' + L('ليه نرسم البيانات؟', 'Why visualize data?'))}
    ${U.hd(1, '📈 ' + L('رسوم لمتغير أو اتنين', 'Charts for one or two variables'))}
    ${U.hd(2, '😵 ' + L('التراكب الزائد للنقاط', 'Overplotting'))}
    ${U.hd(3, '🌡️ ' + L('الخريطة الحرارية', 'The heatmap'))}
    ${U.hd(4, '🧩 ' + L('مخطط المستطيلات', 'The mosaic plot'))}
    ${U.hd(5, '① ' + L('سرد القصص: الرسالة', 'Storytelling: the message'))}
    ${U.hd(6, '② ' + L('سرد القصص: العناصر', 'Storytelling: the elements'))}
    ${U.hd(7, '③ ' + L('سرد القصص: معلومات داعمة', 'Storytelling: supporting info'))}
    ${U.hd(8, '⚠️ ' + L('رسم «صح»… بيضلّل', 'A "correct" chart… that misleads'))}
    ${U.nt(4, L('خريطة حرارية = لون عبر محورين · مخطط المستطيلات = مساحة لفئتين', 'Heatmap = colour across two axes · mosaic = area for two categories'), 'warn')}
    ${U.nt(6, '⚠️ ' + L('عناصر أكتر مابتوضّحش الرسالة… بتدفنها', 'More elements do not clarify the message… they bury it'), 'warn')}
  </div>
  <div id="v3-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '🧠📣 ' + L('دورين: فهم المحلّل نفسه + التوصيل للآخرين', 'Two roles: the analyst’s understanding + communicating'), 't-violet')}
    ${U.pill('x1', 120, 290, '📈 ' + L('متغير/اتنين ← أعمدة · خطوط · مبعثر', 'One or two variables → bar · line · scatter'), 't-blue')}
    ${U.pill('x2', 120, 400, '🌡️ ' + L('خريطة حرارية = لون عبر محورين · 🧩 مستطيلات = مساحة لفئتين', 'Heatmap = colour on two axes · mosaic = area for two categories'), 't-amber')}
    ${U.pill('x3', 120, 510, '📝 ' + L('رسالة واحدة · عناصر بتخدمها · تسميات صادقة', 'One message · serving elements · honest labels'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#v3-' + id + ' .' + c);
    const draw = (els, t, d) => tl.fromTo(els, { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: d || 1, ease: 'power1.inOut' }, t);

    /* 0 — table → chart · two roles */
    let c = at(0);
    frame(0, c);
    IN(q('tab'), c + 0.4, 0.5, { y: 30 });
    IN(q('line'), c + 1.4, 0.4); draw(sel('line', 'ln'), c + 1.6, 1.2);
    tl.fromTo(sel('line', 'lp'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.12 }, c + 1.8);
    POP(q('jump'), c + 3.0, 0.45); SND('pop', c + 3.0);
    IN(q('r1'), c + 3.8, 0.5, { x: 40 * sx }); SND('pop', c + 3.8);
    IN(q('r2'), c + 4.6, 0.5, { x: 40 * sx }); SND('ok', c + 4.6);

    /* 1 — bar · line · scatter */
    c = at(1);
    frame(1, c);
    OUT(Q('tab line jump r1 r2'), c, 0.4);
    IN(q('g1'), c + 0.5, 0.3); IN(q('g1b'), c + 0.5, 0.4, { y: 20 }); SND('pop', c + 0.5);
    tl.fromTo(sel('g1', 'cb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, stagger: 0.1 }, c + 0.6);
    IN(q('g2'), c + 1.6, 0.3); IN(q('g2b'), c + 1.6, 0.4, { y: 20 }); SND('pop', c + 1.6); draw(sel('g2', 'cl'), c + 1.7, 0.9);
    IN(q('g3'), c + 2.8, 0.3); IN(q('g3b'), c + 2.8, 0.4, { y: 20 }); SND('pop', c + 2.8);
    tl.fromTo(sel('g3', 'cs'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.2, stagger: 0.05 }, c + 2.9);
    IN(q('g12'), c + 4.2, 0.4, { y: 20 });

    /* 2 — overplotting */
    c = at(2);
    frame(2, c);
    OUT(Q('g1 g2 g3 g1b g2b g3b g12'), c, 0.4);
    IN(q('blob'), c + 0.5, 0.3);
    tl.fromTo(sel('blob', 'bp'), { opacity: 0 }, { opacity: 0.55, duration: 0.05, stagger: 0.006 }, c + 0.6);
    IN(q('op'), c + 2.4, 0.4, { y: 20 }); SND('bad', c + 2.4);
    IN(q('arr'), c + 3.0, 0.3);
    IN(q('dens'), c + 3.2, 0.3);
    tl.fromTo(sel('dens', 'dc'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.2, stagger: 0.02 }, c + 3.3);
    IN(q('opf'), c + 4.6, 0.4, { y: 20 }); SND('ok', c + 4.6);

    /* 3 — heatmap */
    c = at(3);
    frame(3, c);
    OUT(Q('blob dens op opf arr'), c, 0.4);
    IN(q('heat'), c + 0.5, 0.4);
    tl.fromTo(sel('heat', 'hc'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.25, stagger: 0.05 }, c + 0.7);
    IN(q('hb'), c + 2.2, 0.5, { x: 40 * sx }); SND('pop', c + 2.2);
    POP(q('hk'), c + 3.4, 0.45); SND('ok', c + 3.4);
    IN(q('hw'), c + 4.2, 0.4, { y: 20 });

    /* 4 — mosaic plot */
    c = at(4);
    frame(4, c, 5.4);
    OUT(Q('heat hb hk hw'), c, 0.4);
    IN(q('mos'), c + 0.5, 0.4);
    tl.fromTo(sel('mos', 'mz'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.35, stagger: 0.15, ease: 'back.out(1.5)' }, c + 0.7);
    range(3).forEach((k) => IN(q('lg' + k), c + 1.8 + k * 0.3, 0.3, { x: 20 * sx }));
    IN(q('mb'), c + 3.0, 0.5, { x: 40 * sx }); SND('ok', c + 3.0);

    /* 5 — ① clarify the message */
    c = at(5);
    frame(5, c);
    OUT(Q('mos lg0 lg1 lg2 mb'), c, 0.4);
    IN(q('st'), c + 0.5, 0.4);
    tl.fromTo(sel('st', 'sb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, stagger: 0.1 }, c + 0.6);
    IN(q('s1'), c + 1.8, 0.5, { x: 40 * sx }); SND('pop', c + 1.8);
    POP(q('ttl'), c + 3.0, 0.5); SND('ok', c + 3.0);

    /* 6 — ② select the elements */
    c = at(6);
    frame(6, c, 4.6);
    IN(q('s2'), c + 0.5, 0.5, { x: 40 * sx }); SND('pop', c + 0.5);
    tl.to(sel('st', 'rest'), { attr: { fill: '#475569' }, duration: 0.6 }, c + 1.6);
    tl.fromTo(sel('st', 'key'), { scale: 1, transformOrigin: '50% 100%' }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 3 }, c + 2.2); SND('ok', c + 2.2);

    /* 7 — ③ supporting information */
    c = at(7);
    frame(7, c);
    IN(q('s3'), c + 0.5, 0.5, { x: 40 * sx }); SND('pop', c + 0.5);
    tl.to(sel('st', 'lab'), { opacity: 1, duration: 0.5 }, c + 1.6); SND('ok', c + 1.6);

    /* 8 — misleading charts */
    c = at(8);
    frame(8, c);
    OUT(Q('st ttl s1 s2 s3'), c, 0.4);
    IN(q('mis'), c + 0.5, 0.4);
    IN(q('mw'), c + 1.0, 0.4, { x: 30 * sx }); SND('bad', c + 1.0);
    tl.to(sel('mis', 'm1'), { attr: { y: 36, height: 294 }, duration: 0.8, ease: 'power2.inOut' }, c + 2.2);
    tl.to(sel('mis', 'm2'), { attr: { fill: '#38bdf8' }, duration: 0.8 }, c + 2.2);
    tl.to(sel('mis', 'ax96'), { opacity: 0, duration: 0.3 }, c + 2.2); tl.to(sel('mis', 'ax0'), { opacity: 1, duration: 0.3 }, c + 2.5);
    IN(q('mf'), c + 2.4, 0.4, { x: 30 * sx }); SND('ok', c + 2.4);
    IN(q('m2'), c + 3.4, 0.4, { x: 30 * sx });
    IN(q('m3'), c + 4.0, 0.4, { x: 30 * sx });
    IN(q('aud'), c + 4.8, 0.4, { y: 20 });

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops */
    M.loop(0, 5.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(sel('line', 'ln'), { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power1.inOut' }));
    M.loop(1, 4.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      .fromTo(sel('g1', 'cb'), { scaleY: 0.6, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, stagger: 0.1 })
      .fromTo(sel('g2', 'cl'), { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 0.9 })
      .fromTo(sel('g3', 'cs'), { scale: 0.4, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.2, stagger: 0.04 }));
    M.loop(2, 5.0, () => gsap.timeline().to(sel('dens', 'dc'), { scale: 0.85, transformOrigin: '50% 50%', duration: 0.9, ease: 'sine.inOut', stagger: { each: 0.03, from: 'center', repeat: -1, yoyo: true } }));
    M.loop(3, 4.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(sel('heat', 'hc'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 0.9, duration: 0.25, stagger: 0.04, yoyo: true, repeat: 1 }));
    M.loop(4, 4.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(sel('mos', 'mz'), { opacity: 0.85 }, { opacity: 0.4, duration: 0.4, stagger: 0.25, yoyo: true, repeat: 1 }));
    M.loop(5, 4.0, () => M.breathe(q('ttl'), 1.05, 1.1));
    M.loop(6, 3.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('st', 'key'), { scaleY: 1, transformOrigin: '50% 100%' }, { scaleY: 1.06, duration: 0.9, ease: 'sine.inOut' }));
    /* the axis keeps switching 96 ↔ 0: the same numbers, a different impression */
    M.loop(8, 5.6, () => gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1.2 })
      .to(sel('mis', 'm1'), { attr: { y: 180, height: 150 }, duration: 0.9, ease: 'power2.inOut' }, 0)
      .to(sel('mis', 'm2'), { attr: { fill: '#f87171' }, duration: 0.9 }, 0)
      .to(sel('mis', 'ax0'), { opacity: 0, duration: 0.3 }, 0).to(sel('mis', 'ax96'), { opacity: 1, duration: 0.3 }, 0.3));
    return M.done();
  });
})();

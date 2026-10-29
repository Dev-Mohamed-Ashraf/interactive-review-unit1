/* =========================================================
 * anims/movies-6-2.js — lesson 6-2 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   regressMovie : response vs explanatory, the model · simple regression
 *                  (line, least squares, residuals) · multiple regression ·
 *                  R² · RMSE vs MAE (worked) · correlation ≠ causation
 *                  (confounder) · cautions (range, R² alone, overfitting)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const T = (x, y, txt, fill, size) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 30}" font-weight="800" fill="${fill || '#cbd5e1'}">${txt}</text>`;
  /* temperature (20–40 °C) vs ice-cream sales: y = 9t − 150 (+ noise) */
  const PX = (t) => 90 + (t - 20) * 38;
  const PY = (s) => 500 - s * 1.5;
  const DATA = [[21, 45], [23, 50], [24, 82], [26, 90], [27, 128], [29, 112], [30, 150], [31, 122], [33, 160], [34, 170], [36, 198], [37, 175]];
  const fit = (t) => 9 * t - 150;
  const SCAT = `<path d="M90 30 V500 H860" fill="none" stroke="#64748b" stroke-width="4"/>
    ${[20, 25, 30, 35, 40].map((t) => `${T(PX(t), 540, t + '°', '#94a3b8', 28)}`).join('')}
    ${T(40, 40, '🍦', '#e2e8f0', 34)}${T(870, 470, '🌡️', '#e2e8f0', 34)}
    <path class="reg" d="M${PX(20)} ${PY(fit(20))} L${PX(38)} ${PY(fit(38))}" stroke="#fbbf24" stroke-width="7" stroke-linecap="round"/>
    ${DATA.map(([t, s]) => `<path class="res" d="M${PX(t)} ${PY(s)} V${PY(fit(t))}" stroke="#f472b6" stroke-width="5" stroke-dasharray="6 5"/>`).join('')}
    ${DATA.map(([t, s]) => `<circle class="pt" cx="${PX(t)}" cy="${PY(s)}" r="13" fill="#38bdf8" stroke="#0f172a" stroke-width="3"/>`).join('')}
    <g class="pred"><path d="M${PX(35)} 500 V${PY(fit(35))} H90" fill="none" stroke="#34d399" stroke-width="4" stroke-dasharray="10 8"/><circle cx="${PX(35)}" cy="${PY(fit(35))}" r="18" fill="#34d399"/></g>`;
  /* two mini scatters: tight vs loose */
  const MINI = (spread, seed) => `<path d="M30 20 V340 H530" fill="none" stroke="#64748b" stroke-width="4"/><path d="M50 320 L510 60" stroke="#fbbf24" stroke-width="6"/>
    ${range(14).map((k) => { const x = 60 + k * 33, y = 320 - (x - 50) * (260 / 460); const n = Math.sin(k * 7.3 + seed) * spread; return `<circle class="mp" cx="${x}" cy="${(y + n).toFixed(0)}" r="11" fill="#38bdf8"/>`; }).join('')}`;
  const METER = `<rect x="20" y="40" width="460" height="40" rx="20" fill="#1e293b" stroke="#475569" stroke-width="3"/>
    <rect class="mfill" x="20" y="40" width="460" height="40" rx="20" fill="#34d399"/>${T(20, 120, '0', '#cbd5e1', 28)}${T(480, 120, '1', '#cbd5e1', 28)}`;
  /* five prediction errors */
  const ERRS = [2, -3, 1, -2, 12];
  const ERRB = `<path d="M40 380 H720" stroke="#64748b" stroke-width="4"/>
    ${ERRS.map((e, k) => `<rect class="eb${k === 4 ? ' big' : ''}" x="${70 + k * 130}" y="${380 - Math.abs(e) * 26}" width="80" height="${Math.abs(e) * 26}" rx="8" fill="${k === 4 ? '#f87171' : '#38bdf8'}"/>${T(110 + k * 130, 425, (e > 0 ? '+' : '') + e, k === 4 ? '#fca5a5' : '#cbd5e1', 32)}`).join('')}`;
  /* correlation ≠ causation */
  const TWIN = (col) => `<path d="M20 20 V200 H360" fill="none" stroke="#64748b" stroke-width="4"/><path class="tw" d="M30 185 C120 170 180 120 240 90 S330 40 350 30" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
  /* overfitting: a smooth trend vs a curve chasing every point */
  const OVER = `<path d="M20 20 V300 H560" fill="none" stroke="#64748b" stroke-width="4"/>
    ${[[60, 250], [110, 205], [160, 230], [210, 170], [260, 190], [310, 130], [360, 150], [410, 100], [460, 120], [510, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#38bdf8"/>`).join('')}
    <path class="good" d="M50 250 L520 75" stroke="#34d399" stroke-width="6"/>
    <path class="wig" d="M60 250 C80 180 100 200 110 205 S150 260 160 230 S200 150 210 170 S250 220 260 190 S300 110 310 130 S350 170 360 150 S400 80 410 100 S450 140 460 120 S500 50 510 70" fill="none" stroke="#f87171" stroke-width="5"/>`;

  K.defineAnim('regressMovie', (stage, props, api) => {
    const U = MK.uiL12('g2-'), B = MK.look.kit('g2-', MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l62 mv-l12', prefix: 'g2-', beats: 8,
      html: (L) => `
  <div id="g2-stage" class="mv-stage">
    ${U.art('sc', 90, 160, 900, 560, '0 0 900 560', SCAT)}
    ${U.pill('rv', 1060, 180, '🍦 ' + L('متغير الاستجابة (y): المبيعات = النتيجة', 'Response variable (y): sales = the result'), 't-blue')}
    ${U.pill('ev', 1060, 280, '🌡️ ' + L('المتغير التفسيري (x): الحرارة = المدخل', 'Explanatory variable (x): temperature = input'), 't-amber')}
    ${U.box('mdl', 1060, 390, 780, 't-violet', { h: L('النموذج = المعادلة اللي طلعت من البيانات', 'The model = the equation from the data'), p: L('تمثيل مبسّط لعلاقة حقيقية', 'a simplified picture of a real relationship'), s: L('من غير تقييم… مالوش فايدة', 'without evaluation… it is useless') })}
    ${U.pill('pr', 1060, 610, '🔮 ' + L('بكرة 35° ← نتوقّع ~165 علبة', 'Tomorrow 35° → expect ~165 tubs'), 't-green')}

    ${U.pill('eq', 1060, 180, '📈 y = a x + b — ' + L('خط الانحدار', 'the regression line'), 'solid')}
    ${U.pill('rs', 1060, 280, '📏 ' + L('المتبقّي = الفعلي − الخط', 'Residual = actual − line'), 't-pink')}
    ${U.box('ls', 1060, 390, 780, 't-amber', { h: L('طريقة المربعات الصغرى', 'Least squares'), p: L('نختار a وb اللي بيقلّلوا مجموع مربعات المتبقيات', 'pick a and b that minimize the sum of squared residuals'), s: L('الانحدار البسيط = متغير تفسيري واحد', 'simple regression = one explanatory variable') })}

    ${[['📐', L('المساحة', 'Floor area'), 'x₁'], ['🗓️', L('عمر المبنى', 'Building age'), 'x₂'], ['🚉', L('البعد عن المحطة', 'Distance to station'), 'x₃']]
      .map(([e, t, x], k) => U.pill('in' + k, 90, 180 + k * 95, e + ' ' + t + ' (' + x + ')', 't-blue')).join('')}
    ${U.box('eq2', 640, 200, 620, 't-violet', { h: '🏠 ' + L('سعر المسكن', 'House price'), p: '<span class="code">y = a₁x₁ + a₂x₂ + a₃x₃ + b</span>', s: L('كل معامل = قوة تأثير متغيره · b = نقطة التقاطع', 'each coefficient = its variable’s weight · b = intercept') })}
    ${U.emo('house', 1380, 190, 200, 150, '🏠')}
    ${U.box('cs', 90, 490, 820, 't-amber', { h: L('بسيط: متغير تفسيري واحد', 'Simple: one explanatory variable'), p: L('بسيط وسهل التفسير — علاقة بين متغيرين باختصار', 'simple, easy to interpret — two variables concisely') })}
    ${U.box('cm', 1010, 490, 820, 't-violet', { h: L('متعدد: اتنين أو أكتر', 'Multiple: two or more'), p: L('بيعبّر عن علاقات معقّدة — النتيجة بتتأثّر بعوامل كتير', 'expresses complex relationships — many factors') })}

    ${U.art('mt', 90, 170, 560, 360, '0 0 560 360', MINI(8, 1))}
    ${U.art('ml', 700, 170, 560, 360, '0 0 560 360', MINI(70, 2))}
    ${U.pill('mtl', 230, 550, 'R² = 0.95 ✅', 't-green')}
    ${U.pill('mll', 860, 550, 'R² = 0.30', 't-red')}
    ${U.art('rm', 1330, 190, 500, 140, '0 0 500 140', METER)}
    ${U.box('r2b', 1310, 360, 540, 't-green', { h: L('R² معامل التحديد', 'R² coefficient of determination'), p: L('من 0 لـ 1: قد إيه النموذج بيفسّر التباين', '0 to 1: how much variation the model explains'), s: L('أقرب لـ 1 = تفسير أحسن', 'closer to 1 = better explained') })}

    ${U.art('er', 90, 160, 760, 460, '0 0 760 460', ERRB)}
    ${U.pill('mae', 920, 190, 'MAE = (2+3+1+2+12) ÷ 5 = 4', 't-blue')}
    ${U.pill('rmse', 920, 290, 'RMSE = √((4+9+1+4+144) ÷ 5) ≈ 5.7', 't-red')}
    ${U.box('rb', 920, 400, 920, 't-slate', { h: L('RMSE بيدّي الخطأ الكبير وزن أكبر (التربيع)', 'RMSE weights big misses more (squaring)'), p: L('MAE أقل تأثّرًا بالقيم الشاذة', 'MAE is less swayed by outliers'), s: L('الاتنين بوحدة متغير الاستجابة · أصغر = أدق', 'both in the response’s units · smaller = more accurate') })}

    ${U.art('t1', 90, 230, 380, 220, '0 0 380 220', TWIN('#38bdf8'))}
    ${U.art('t2', 1450, 230, 380, 220, '0 0 380 220', TWIN('#f87171'))}
    ${U.pill('t1l', 110, 470, '🍦 ' + L('مبيعات الآيس كريم', 'Ice-cream sales'), 't-blue')}
    ${U.pill('t2l', 1450, 470, '🏊 ' + L('حوادث السباحة', 'Swimming accidents'), 't-red')}
    ${U.pill('fitp', 620, 300, '📈 ' + L('ملاءمة قوية بينهم…', 'A tight fit between them…'), 't-slate')}
    ${U.emo('sun', 860, 150, 200, 120, '☀️')}
    ${U.pill('conf', 600, 420, '🕵️ ' + L('عامل مربِك: الصيف والحر بيرفعوا الاتنين', 'Confounder: summer heat drives both'), 'solid')}
    ${['⏱️ ' + L('أسبقية زمنية', 'temporal precedence'), '🚫 ' + L('استبعاد العوامل التانية', 'rule out other factors'), '📚 ' + L('سند نظري', 'theoretical support')]
      .map((t, k) => U.pill('cz' + k, 90 + k * 600, 590, t, 't-green')).join('')}

    ${U.art('ov', 90, 170, 580, 320, '0 0 580 320', OVER)}
    ${U.pill('ovg', 90, 510, '✅ ' + L('اتجاه بسيط', 'a simple trend'), 't-green')}
    ${U.pill('ovw', 90, 600, '❌ ' + L('ملاءمة مفرطة = بتطارد الضوضاء', 'overfitting = chasing noise'), 't-red')}
    ${['🔍 ' + L('النموذج مابيخلصش بإنشائه: أكّد الدقة والصلاحية للغرض', 'A model is not done when built: confirm accuracy and fit for purpose'), '📏 ' + L('ماتطبّقوش برّه مدى البيانات', 'Do not apply it outside the data’s range'), '🧮 ' + L('مش بـ R² لوحده — مع المؤشرات التانية', 'Not R² alone — with the other indicators'), '➕ ' + L('متغيرات أكتر ≠ نموذج أحسن', 'More variables ≠ a better model')]
      .map((t, k) => U.pill('k' + k, 760, 180 + k * 100, t, 't-slate')).join('')}

    ${U.hd(0, '🍦 ' + L('من البيانات… لتنبّؤ', 'From data… to a prediction'))}
    ${U.hd(1, '📈 ' + L('الانحدار البسيط', 'Simple regression'))}
    ${U.hd(2, '🏠 ' + L('الانحدار المتعدد', 'Multiple regression'))}
    ${U.hd(3, '🎯 ' + L('R²: قد إيه بيفسّر؟', 'R²: how much is explained?'))}
    ${U.hd(4, '📏 ' + L('RMSE و MAE', 'RMSE and MAE'))}
    ${U.hd(5, '🕵️ ' + L('ارتباط ≠ سببية', 'Correlation ≠ causation'))}
    ${U.hd(6, '⚠️ ' + L('خد بالك من النموذج', 'Model cautions'))}
    ${U.nt(3, L('R² عالي = الخط ملائم للتباين… مش إن x سبب y', 'High R² = the line fits the variation… not that x causes y'), 'warn')}
    ${U.nt(4, L('يوم شاذ (مهرجان) مايحكمش على النموذج ← MAE · الأخطاء الكبيرة مكلّفة ← RMSE', 'One odd day should not judge the model → MAE · big misses are costly → RMSE'))}
    ${U.nt(6, L('الانحدار منظور من البيانات… بنفسّره، مش بنطيعه', 'Regression is one view from the data… interpret it, don’t obey it'), 'ok')}
  </div>
  <div id="g2-recap" class="mv-recap">
    ${U.hd(7, '💡 ' + L('الخلاصة', 'The point'))}
    ${B.card('x0', 70, 170, 410, 420, 'c-amber rc', { ic: '📈', p: L('بسيط: <bdi>y = ax + b</bdi> (متغير واحد) · متعدد: مجموع موزون + b', 'Simple: y = ax + b (one x) · multiple: weighted sum + b') })}
    ${B.card('x1', 530, 170, 410, 420, 'c-pink rc', { ic: '📏', p: L('المربعات الصغرى بتقلّل مجموع مربعات المتبقيات', 'Least squares minimizes the sum of squared residuals') })}
    ${B.card('x2', 990, 170, 410, 420, 'c-green rc', { ic: '🎯', p: L('R² + RMSE + MAE مع بعض — مش R² لوحده', 'R² + RMSE + MAE together — never R² alone') })}
    ${B.card('x3', 1450, 170, 410, 420, 'c-red rc', { ic: '🕵️', p: L('ملاءمة كويسة = ارتباط… مش سببية', 'A good fit = correlation… not causation') })}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#g2-' + id + ' .' + c);
    const draw = (els, t, d) => tl.fromTo(els, { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: d || 1, ease: 'power1.inOut' }, t);
    tl.set(sel('sc', 'res'), { opacity: 0 }, 0);
    tl.set(sel('sc', 'pred'), { opacity: 0 }, 0);

    /* 0 — scatter → line → prediction */
    let c = at(0);
    frame(0, c, 6.4);
    IN(q('sc'), c + 0.4, 0.4);
    tl.fromTo(sel('sc', 'pt'), { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 }, c + 0.6);
    IN(q('rv'), c + 1.8, 0.4, { x: 30 * sx }); IN(q('ev'), c + 2.4, 0.4, { x: 30 * sx }); SND('pop', c + 2.4);
    draw(sel('sc', 'reg'), c + 3.0, 1.0); SND('tap', c + 3.0);
    IN(q('mdl'), c + 4.0, 0.5, { y: 20 });
    tl.to(sel('sc', 'pred'), { opacity: 1, duration: 0.5 }, c + 5.2);
    IN(q('pr'), c + 5.4, 0.4, { y: 20 }); SND('ok', c + 5.4);

    /* 1 — simple regression: residuals + least squares */
    c = at(1);
    frame(1, c);
    OUT(Q('rv ev mdl pr'), c, 0.3);
    tl.to(sel('sc', 'pred'), { opacity: 0, duration: 0.3 }, c);
    IN(q('eq'), c + 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 0.6);
    tl.to(sel('sc', 'res'), { opacity: 1, duration: 0.3, stagger: 0.12 }, c + 1.4); SND('tap', c + 1.4);
    IN(q('rs'), c + 2.4, 0.4, { x: 30 * sx });
    IN(q('ls'), c + 3.4, 0.5, { y: 20 }); SND('ok', c + 3.4);
    tl.fromTo(sel('sc', 'reg'), { strokeWidth: 7 }, { strokeWidth: 12, duration: 0.3, yoyo: true, repeat: 3 }, c + 4.2);

    /* 2 — multiple regression */
    c = at(2);
    frame(2, c);
    OUT(Q('sc eq rs ls'), c, 0.4);
    range(3).forEach((k) => { IN(q('in' + k), c + 0.6 + k * 0.5, 0.4, { x: -30 * sx }); SND('pop', c + 0.6 + k * 0.5); });
    IN(q('eq2'), c + 2.2, 0.5, { scale: 0.9 }); SND('ok', c + 2.2);
    POP(q('house'), c + 2.8, 0.5);
    IN(q('cs'), c + 3.8, 0.5, { y: 30 });
    IN(q('cm'), c + 4.4, 0.5, { y: 30 });

    /* 3 — R² */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('in0 in1 in2 eq2 house cs cm'), c, 0.4);
    IN(q('mt'), c + 0.5, 0.4); IN(q('ml'), c + 0.9, 0.4);
    tl.fromTo(sel('mt', 'mp'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.05 }, c + 0.6);
    tl.fromTo(sel('ml', 'mp'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.05 }, c + 1.0);
    IN(q('mtl'), c + 2.0, 0.4, { y: 20 }); SND('ok', c + 2.0);
    IN(q('mll'), c + 2.6, 0.4, { y: 20 }); SND('bad', c + 2.6);
    IN(q('rm'), c + 3.2, 0.4);
    tl.fromTo(sel('rm', 'mfill'), { attr: { width: 0 } }, { attr: { width: 437 }, duration: 0.9, ease: 'power2.out' }, c + 3.3);
    IN(q('r2b'), c + 4.2, 0.5, { y: 20 });

    /* 4 — RMSE vs MAE */
    c = at(4);
    frame(4, c, 6.0);
    OUT(Q('mt ml mtl mll rm r2b'), c, 0.4);
    IN(q('er'), c + 0.5, 0.4);
    tl.fromTo(sel('er', 'eb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(1.5)' }, c + 0.7);
    IN(q('mae'), c + 2.0, 0.4, { x: 30 * sx }); SND('pop', c + 2.0);
    tl.fromTo(sel('er', 'big'), { opacity: 1 }, { opacity: 0.35, duration: 0.2, yoyo: true, repeat: 5 }, c + 3.0);
    IN(q('rmse'), c + 3.0, 0.4, { x: 30 * sx }); SND('bad', c + 3.0);
    IN(q('rb'), c + 4.2, 0.5, { y: 20 });

    /* 5 — correlation ≠ causation */
    c = at(5);
    frame(5, c);
    OUT(Q('er mae rmse rb'), c, 0.4);
    IN(q('t1'), c + 0.5, 0.3); IN(q('t1l'), c + 0.5, 0.4, { y: 20 }); draw(sel('t1', 'tw'), c + 0.6, 0.9);
    IN(q('t2'), c + 1.2, 0.3); IN(q('t2l'), c + 1.2, 0.4, { y: 20 }); draw(sel('t2', 'tw'), c + 1.3, 0.9);
    IN(q('fitp'), c + 2.2, 0.4, { y: 20 }); SND('pop', c + 2.2);
    POP(q('sun'), c + 3.2, 0.6); SND('ok', c + 3.2);
    tl.to(q('fitp'), { opacity: 0, duration: 0.3 }, c + 3.2);
    IN(q('conf'), c + 3.6, 0.4, { y: 20 });
    range(3).forEach((k) => { IN(q('cz' + k), c + 4.6 + k * 0.5, 0.4, { y: 20 }); SND('pop', c + 4.6 + k * 0.5); });

    /* 6 — cautions + overfitting */
    c = at(6);
    frame(6, c);
    OUT(Q('t1 t2 t1l t2l sun conf cz0 cz1 cz2'), c, 0.4);
    IN(q('ov'), c + 0.5, 0.4);
    draw(sel('ov', 'good'), c + 0.8, 0.8); IN(q('ovg'), c + 1.4, 0.4, { y: 20 });
    draw(sel('ov', 'wig'), c + 2.0, 1.2); IN(q('ovw'), c + 3.0, 0.4, { y: 20 }); SND('bad', c + 3.0);
    range(4).forEach((k) => { IN(q('k' + k), c + 3.6 + k * 0.5, 0.4, { x: 30 * sx }); SND('pop', c + 3.6 + k * 0.5); });

    /* 7 — recap */
    c = at(7);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd7'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.5, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.5); });
    M.loop(7, 3.4, () => MK.look.glowCycle(Q('x0 x1 x2 x3'), 'rgba(251,191,36,.8)', 0.5));
    /* living loops */
    M.loop(0, 6.2, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('sc', 'pred'), { opacity: 1 }, { opacity: 0.35, duration: 1.0, ease: 'sine.inOut' }));
    M.loop(1, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('sc', 'res'), { opacity: 1 }, { opacity: 0.25, duration: 0.8, stagger: 0.08, ease: 'sine.inOut' }));
    M.loop(2, 5.0, () => M.cycle(Q('in0 in1 in2'), 'rgba(56,189,248,.85)', 0.5));
    M.loop(2, 5.0, () => M.glowLoop(q('eq2'), 'rgba(167,139,250,.85)'));
    M.loop(3, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('rm', 'mfill'), { attr: { width: 437 } }, { attr: { width: 400 }, duration: 1.4, ease: 'sine.inOut' }));
    M.loop(4, 5.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('er', 'big'), { opacity: 1 }, { opacity: 0.4, duration: 0.7, ease: 'sine.inOut' }));
    M.loop(5, 6.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(sel('t1', 'tw'), { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, 0).fromTo(sel('t2', 'tw'), { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, 0));
    M.loop(5, 6.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(q('sun'), { rotation: -8 }, { rotation: 8, duration: 2.0, ease: 'sine.inOut', transformOrigin: '50% 50%' }));
    M.loop(6, 6.4, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(sel('ov', 'wig'), { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut' }));
    return M.done();
  });
})();

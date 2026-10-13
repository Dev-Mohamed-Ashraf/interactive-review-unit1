/* =========================================================
 * anims/movies-6-1.js — lesson 6-1 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   inferMovie : sample → population (inference) · point vs interval ·
 *                the 95% confidence level · H₀ vs H₁ · the 4-step
 *                procedure · p vs α · t-test & chi-squared · Type I/II
 *                errors (trade-off) · cautions (significant ≠ important)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const T = (x, y, txt, fill, size, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor || 'middle'}" font-size="${size || 32}" font-weight="800" fill="${fill || '#cbd5e1'}">${txt}</text>`;
  /* population cloud + the sample drawn from it */
  const POPC = `<ellipse cx="260" cy="210" rx="250" ry="200" fill="rgba(56,189,248,.08)" stroke="#38bdf8" stroke-width="4"/>
    ${range(40).map((k) => { const a = k * 2.399, r = 30 + 170 * Math.sqrt((k + 0.5) / 40); return `<circle class="d${[3, 11, 17, 22, 29, 34, 8, 38].includes(k) ? ' pick' : ''}" cx="${(260 + r * Math.cos(a) * 0.95).toFixed(0)}" cy="${(210 + r * Math.sin(a) * 0.76).toFixed(0)}" r="13" fill="#64748b"/>`; }).join('')}`;
  const SMPC = `<ellipse cx="170" cy="130" rx="160" ry="120" fill="rgba(251,191,36,.1)" stroke="#fbbf24" stroke-width="4"/>
    ${range(8).map((k) => `<circle cx="${80 + (k % 4) * 60}" cy="${100 + Math.floor(k / 4) * 60}" r="16" fill="#fbbf24"/>`).join('')}`;
  /* number line 160 … 176 cm */
  const X = (v) => 80 + (v - 160) * 90;
  const NUML = `<path d="M60 150 H1540" stroke="#94a3b8" stroke-width="6"/>
    ${range(9).map((k) => { const v = 160 + k * 2; return `<path d="M${X(v)} 136 V164" stroke="#94a3b8" stroke-width="5"/>${T(X(v), 214, v, v === 168 ? '#fde68a' : '#cbd5e1', 34)}`; }).join('')}
    <rect class="brk" x="${X(166)}" y="118" width="${X(170) - X(166)}" height="64" rx="14" fill="rgba(251,191,36,.25)" stroke="#fbbf24" stroke-width="5" opacity="0"/>
    <g class="pin" opacity="0"><path d="M${X(168)} 150 L${X(168) - 22} 92 A28 28 0 1 1 ${X(168) + 22} 92Z" fill="#f472b6"/><circle cx="${X(168)}" cy="78" r="10" fill="#fff"/></g>`;
  /* 20 confidence intervals around the true mean */
  const CI = `<path d="M450 6 V554" stroke="#fde68a" stroke-width="5" stroke-dasharray="12 8"/>
    ${range(20).map((k) => { const c = k === 13 ? 680 : 450 + [-60, 40, -20, 70, -90, 10, 50, -40, 80, -70, 20, -10, 60, 0, -50, 30, -80, 90, -30, 15][k]; return `<g class="civ"><rect x="${c - 140}" y="${12 + k * 27}" width="280" height="16" rx="8" fill="${k === 13 ? '#f87171' : '#34d399'}"/><circle cx="${c}" cy="${20 + k * 27}" r="9" fill="#0f172a"/></g>`; }).join('')}`;
  /* the p-value gauge 0 … 0.10, α = 0.05 */
  const PX = (p) => 80 + p * 14400;
  const GAUGE = `<rect x="80" y="70" width="${PX(0.05) - 80}" height="56" rx="12" fill="rgba(52,211,153,.3)"/>
    <rect x="${PX(0.05)}" y="70" width="${PX(0.1) - PX(0.05)}" height="56" rx="12" fill="rgba(100,116,139,.3)"/>
    <path d="M${PX(0.05)} 50 V146" stroke="#fde68a" stroke-width="6"/>
    ${T(80, 186, '0', '#cbd5e1', 32)}${T(PX(0.05), 186, 'α = 0.05', '#fde68a', 34)}${T(PX(0.1), 186, '0.10', '#cbd5e1', 32)}
    <g class="pm"><path d="M${PX(0.02)} 66 l-22 -40 h44Z" fill="#f472b6"/></g>`;
  const TBARS = `<path d="M20 200 H380" stroke="#64748b" stroke-width="4"/><rect class="tb" x="80" y="${200 - 148}" width="90" height="148" rx="8" fill="#38bdf8"/><rect class="tb" x="230" y="${200 - 140}" width="90" height="140" rx="8" fill="#94a3b8"/>${T(125, 40, '74', '#e0f2fe', 32)}${T(275, 50, '70', '#e2e8f0', 32)}`;
  const CHIG = `${range(9).map((k) => `<rect class="cg" x="${30 + (k % 3) * 116}" y="${10 + Math.floor(k / 3) * 66}" width="104" height="56" rx="8" fill="${['#fbbf24', '#f59e0b', '#fde68a'][k % 3]}" opacity="${[0.9, 0.5, 0.7, 0.4, 0.95, 0.6, 0.7, 0.45, 0.85][k]}"/>`).join('')}`;
  const SAW = `<path d="M370 170 L400 120 L430 170Z" fill="#94a3b8"/><g class="plank"><rect x="60" y="104" width="680" height="18" rx="9" fill="#e2e8f0"/>
    <rect x="60" y="40" width="150" height="64" rx="12" fill="#f87171"/>${T(135, 84, 'I', '#fff', 40)}<rect x="590" y="40" width="150" height="64" rx="12" fill="#fbbf24"/>${T(665, 84, 'II', '#0f172a', 40)}</g>`;

  K.defineAnim('inferMovie', (stage, props, api) => {
    const U = MK.uiL('f1-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l61', prefix: 'f1-', beats: 10,
      html: (L) => `
  <div id="f1-stage" class="mv-stage">
    ${U.art('pop', 90, 160, 520, 420, '0 0 520 420', POPC)}
    ${U.art('smp', 1300, 230, 340, 260, '0 0 340 260', SMPC)}
    ${U.pill('ar1', 700, 250, L('⬅', '➜') + ' ' + L('نسحب عينة وندرسها', 'draw a sample and study it'), 't-amber')}
    ${U.pill('ar2', 700, 380, L('➜', '⬅') + ' ' + L('نستنتج خصائص المجتمع', 'infer the population'), 't-blue')}
    ${U.pill('unc', 700, 500, '❓ ' + L('دايمًا فيه عدم يقين… نقيسه مش نخبّيه', 'always uncertain… measure it, don’t hide it'), 'solid')}
    ${U.pill('ap1', 90, 640, '📏 ' + L('التقدير: «قد إيه تقريبًا؟»', 'Estimation: "about how big?"'), 't-green')}
    ${U.pill('ap2', 960, 640, '⚖️ ' + L('اختبار الفرضيات: «حقيقي ولا صدفة؟»', 'Hypothesis testing: "real or chance?"'), 't-violet')}

    ${U.art('nl', 160, 170, 1600, 260, '0 0 1600 260', NUML)}
    ${U.pill('pt', 160, 470, '📍 ' + L('تقدير نقطي: المتوسط ≈ 168 سم (قيمة واحدة)', 'Point estimate: mean ≈ 168 cm (one value)'), 't-pink')}
    ${U.pill('ivl', 160, 580, '↔️ ' + L('تقدير فاصل: بين 166 و170 سم (فترة ثقة)', 'Interval estimate: 166–170 cm (a confidence interval)'), 't-amber')}
    ${U.pill('pp', 1060, 470, L('سهل… بس عدم اليقين مش باين', 'easy… but uncertainty is invisible'), 't-slate')}
    ${U.pill('ip', 1060, 580, L('ليه عرض… بس بيوضّح عدم اليقين', 'has a width… but shows uncertainty'), 't-slate')}

    ${U.art('ci', 90, 160, 900, 560, '0 0 900 560', CI)}
    ${U.pill('cl1', 1060, 200, '🔁 ' + L('نكرّر نفس طريقة المسح 100 مرة…', 'repeat the same survey method 100 times…'), 't-slate')}
    ${U.pill('cl2', 1060, 300, '✅ ' + L('~95 فترة فيها القيمة الحقيقية', '~95 intervals contain the true value'), 't-green')}
    ${U.pill('cl3', 1060, 400, '❌ ' + L('~5 بس بتفوّتها', 'only ~5 miss it'), 't-red')}
    ${U.box('clb', 1060, 500, 760, 't-amber', { h: L('مستوى الثقة 95%', 'Confidence level 95%'), p: L('جملة عن الطريقة مش عن فترة بعينها', 'a statement about the method, not one interval'), s: L('95% و99% الأشهر', '95% and 99% are common') })}

    ${U.box('h0', 90, 180, 820, 't-slate', { ic: '0️⃣', h: L('فرضية العدم H₀', 'Null hypothesis H₀'), p: L('نقطة البداية: «مفيش فرق» أو «مفيش علاقة»', 'the starting point: "no difference" / "no relationship"') })}
    ${U.box('h1', 1010, 180, 820, 't-violet', { ic: '1️⃣', h: L('الفرضية البديلة H₁', 'Alternative hypothesis H₁'), p: L('بنعتمدها لو رفضنا H₀: «فيه فرق/علاقة»', 'adopted if H₀ is rejected: "there is a difference"') })}
    ${U.pill('lg', 160, 460, '🤔 ' + L('نفترض H₀ صح… البيانات اللي معانا كانت هتبقى بعيدة الاحتمال؟', 'Assume H₀ is true… would our data be unlikely?'), 'solid')}
    ${U.pill('rj', 160, 580, '❌ ' + L('بعيدة الاحتمال ← نرفض H₀', 'unlikely → reject H₀'), 't-red')}
    ${U.pill('nr', 1010, 580, '🤷 ' + L('مش بعيدة ← مانرفضش H₀', 'not unlikely → do not reject H₀'), 't-slate')}

    ${[['① ' + L('الفرضيات', 'Hypotheses'), L('H₀: مفيش فرق · H₁: الجديدة أعلى', 'H₀: no difference · H₁: new is higher'), 't-slate'],
       ['② ' + L('مستوى الدلالة', 'Significance level'), L('α = 0.05 قبل ما نشوف النتيجة', 'α = 0.05, before seeing results'), 't-amber'],
       ['③ ' + L('القيمة الاحتمالية', 'The p-value'), L('p = 0.02 محسوبة من البيانات', 'p = 0.02 computed from data'), 't-pink'],
       ['④ ' + L('نقارن ونحكم', 'Compare and judge'), L('0.02 < 0.05 ← نرفض H₀', '0.02 < 0.05 → reject H₀'), 't-green']]
      .map(([h, p, th], k) => U.box('s' + k, 60 + k * 455, 210, 420, th, { h, p })).join('')}
    ${U.pill('cc', 330, 500, '🎓 ' + L('الحكم: الطريقة الجديدة بتحقّق متوسط أعلى (إحصائيًا)', 'Conclusion: the new method gives a higher mean (statistically)'), 't-green')}

    ${U.art('g', 160, 170, 1600, 200, '0 0 1600 200', GAUGE)}
    ${U.pill('r1', 160, 430, '✅ p < α ' + L('← نرفض H₀ — النتيجة دالّة إحصائيًا', '→ reject H₀ — statistically significant'), 't-green')}
    ${U.pill('r2', 160, 530, '➖ p ≥ α ' + L('← مانرفضش H₀ — مش دالّة', '→ do not reject H₀ — not significant'), 't-slate')}
    ${U.box('pdef', 1100, 410, 720, 't-pink', { h: L('القيمة الاحتمالية p', 'The p-value'), p: L('احتمال نتيجة متطرفة كده أو أكتر لو H₀ صح', 'chance of a result this extreme or more if H₀ holds'), s: L('α = الحد اللي بنرفض عنده H₀', 'α = the threshold for rejecting H₀') })}

    ${U.box('tt', 90, 170, 820, 't-blue', { ic: '📊', h: L('اختبار t', 't-test'), p: L('فيه فرق بين متوسطي مجموعتين؟', 'do two groups’ means differ?'), s: L('طريقة تعلّم جديدة ولا التقليدية؟', 'a new learning method vs the usual one?') })}
    ${U.box('ch', 1010, 170, 820, 't-amber', { ic: '🔢', h: L('اختبار مربع كاي (χ²)', 'Chi-squared test (χ²)'), p: L('فيه علاقة بين متغيرين فئويين؟', 'are two categorical variables related?'), s: L('الصف وتفضيل المادة من مسح', 'year group and subject preference') })}
    ${U.art('tbar', 300, 480, 400, 220, '0 0 400 220', TBARS)}
    ${U.art('cgr', 1220, 480, 400, 220, '0 0 400 220', CHIG)}

    ${U.box('e1', 90, 170, 820, 't-red', { ic: '🚨', h: L('خطأ من النوع الأول', 'Type I error'), p: L('نرفض H₀ وهي صح = إنذار كاذب', 'reject H₀ when it is true = a false alarm') })}
    ${U.box('e2', 1010, 170, 820, 't-amber', { ic: '🙈', h: L('خطأ من النوع الثاني', 'Type II error'), p: L('مانرفضش H₀ وهي غلط = تفويت اكتشاف', 'keep H₀ when it is false = a missed discovery') })}
    ${U.pill('sw', 330, 420, '⚖️ ' + L('نقلّل α ← النوع الأول يقلّ… والتاني يزيد (مفاضلة)', 'Lower α → Type I falls… Type II rises (a trade-off)'), 'solid')}
    ${U.art('saw', 560, 520, 800, 180, '0 0 800 180', SAW)}

    ${['❌ ' + L('p مش «احتمال إن H₀ صح»', 'p is not "the chance H₀ is true"'), '❌ ' + L('p صغيرة مش معناها «تأثير كبير»', 'a small p does not mean "a big effect"'), '❌ ' + L('p < 0.05 قاعدة للحكم، مش حقيقة مطلقة', 'p < 0.05 is a rule, not absolute truth'), '⚠️ ' + L('«دالّة إحصائيًا» ≠ «مهمة عمليًا»', '"significant" ≠ "important in practice"')]
      .map((t, k) => U.pill('w' + k, 90, 180 + k * 110, t, k === 3 ? 't-amber' : 't-red')).join('')}
    ${U.box('ex', 1080, 180, 740, 't-blue', { ic: '🖱️', h: L('100,000 مستخدم', '100,000 users'), p: L('نسبة نقر 0.4% مقابل 0.5% ← دالّة!', 'click rate 0.4% vs 0.5% → significant!'), s: L('بس هل بتفرق في الربح؟ ده حكم تاني', 'but does it matter for profit? a separate judgment') })}

    ${U.hd(0, '🔎 ' + L('الاستدلال الإحصائي', 'Statistical inference'))}
    ${U.hd(1, '📍 ' + L('نقطي… ولا فاصل؟', 'Point… or interval?'))}
    ${U.hd(2, '🔁 ' + L('معنى «ثقة 95%»', 'What "95% confidence" means'))}
    ${U.hd(3, '⚖️ ' + L('H₀ ضد H₁', 'H₀ versus H₁'))}
    ${U.hd(4, '🪜 ' + L('خطوات اختبار الفرضيات', 'The testing procedure'))}
    ${U.hd(5, '🎯 ' + L('p قصاد α', 'p versus α'))}
    ${U.hd(6, '🧪 ' + L('أشهر الاختبارات', 'Major tests'))}
    ${U.hd(7, '🚨 ' + L('خطأين… بينهم مفاضلة', 'Two errors… a trade-off'))}
    ${U.hd(8, '⚠️ ' + L('خد بالك وأنت بتفسّر', 'Careful when interpreting'))}
    ${U.nt(2, '⚠️ ' + L('مش «احتمال 95% إن الحقيقة جوّه الفترة دي»', 'Not "a 95% chance the truth is in this interval"'), 'warn')}
    ${U.nt(3, L('ليه نفترض اللي عايزين ننفيه؟ لأن «البيانات بعيدة الاحتمال لو مفيش فرق» أسهل منطقيًا', 'Why assume what we want to deny? "Data unlikely if no difference" is logically easier'))}
    ${U.nt(5, L('نفس p = 0.04: عند α = 0.05 نرفض · عند α = 0.01 مانرفضش', 'Same p = 0.04: reject at α = 0.05 · do not reject at α = 0.01'), 'warn')}
  </div>
  <div id="f1-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '📏 ' + L('نقطي = قيمة · فاصل = مدى + مستوى ثقة (جملة عن الطريقة)', 'Point = a value · interval = a range + a confidence level (about the method)'), 't-amber')}
    ${U.pill('x1', 120, 290, '🪜 ' + L('H₀ و H₁ ← α مسبقًا ← p ← نرفض H₀ لو p < α', 'H₀ & H₁ → α first → p → reject H₀ if p < α'), 't-violet')}
    ${U.pill('x2', 120, 400, '🚨 ' + L('النوع الأول = إنذار كاذب · النوع التاني = تفويت', 'Type I = false alarm · Type II = a miss'), 't-red')}
    ${U.pill('x3', 120, 510, '⚠️ ' + L('دالّة إحصائيًا ≠ مهمة عمليًا', 'Statistically significant ≠ practically important'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#f1-' + id + ' .' + c);

    /* 0 — inference: sample → population */
    let c = at(0);
    frame(0, c, 6.0);
    IN(q('pop'), c + 0.5, 0.5, { scale: 0.9 });
    tl.fromTo(sel('pop', 'd'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.02 }, c + 0.7);
    tl.to(sel('pop', 'pick'), { attr: { fill: '#fbbf24' }, duration: 0.3, stagger: 0.1 }, c + 1.8);
    IN(q('ar1'), c + 2.4, 0.4, { x: 30 * sx }); SND('pop', c + 2.4);
    IN(q('smp'), c + 2.8, 0.5, { scale: 0.7 });
    IN(q('ar2'), c + 3.6, 0.4, { x: -30 * sx }); SND('pop', c + 3.6);
    IN(q('unc'), c + 4.4, 0.4, { y: 20 });
    IN(q('ap1'), c + 5.2, 0.4, { y: 20 }); IN(q('ap2'), c + 5.6, 0.4, { y: 20 }); SND('ok', c + 5.6);

    /* 1 — point vs interval */
    c = at(1);
    frame(1, c);
    OUT(Q('pop smp ar1 ar2 unc ap1 ap2'), c, 0.4);
    IN(q('nl'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(sel('nl', 'pin'), { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.6, ease: 'bounce.out' }, c + 1.2); SND('pop', c + 1.2);
    IN(q('pt'), c + 1.8, 0.4, { x: 30 * sx });
    IN(q('pp'), c + 2.4, 0.4, { x: 30 * sx });
    tl.fromTo(sel('nl', 'brk'), { opacity: 0, scaleX: 0.1, transformOrigin: '50% 50%' }, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'back.out(1.5)' }, c + 3.4); SND('pop', c + 3.4);
    IN(q('ivl'), c + 4.0, 0.4, { x: 30 * sx });
    IN(q('ip'), c + 4.6, 0.4, { x: 30 * sx }); SND('ok', c + 4.6);

    /* 2 — the 95% confidence level */
    c = at(2);
    frame(2, c, 5.4);
    OUT(Q('nl pt ivl pp ip'), c, 0.4);
    IN(q('ci'), c + 0.5, 0.4);
    tl.fromTo(sel('ci', 'civ'), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.09 }, c + 0.7);
    IN(q('cl1'), c + 1.0, 0.4, { x: 30 * sx });
    IN(q('cl2'), c + 2.8, 0.4, { x: 30 * sx }); SND('ok', c + 2.8);
    IN(q('cl3'), c + 3.4, 0.4, { x: 30 * sx }); SND('bad', c + 3.4);
    IN(q('clb'), c + 4.2, 0.5, { y: 20 });

    /* 3 — H₀ vs H₁ */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('ci cl1 cl2 cl3 clb'), c, 0.4);
    IN(q('h0'), c + 0.5, 0.5, { x: -40 * sx }); SND('pop', c + 0.5);
    IN(q('h1'), c + 1.3, 0.5, { x: 40 * sx }); SND('pop', c + 1.3);
    POP(q('lg'), c + 2.4, 0.5);
    IN(q('rj'), c + 3.6, 0.4, { y: 20 }); SND('bad', c + 3.6);
    IN(q('nr'), c + 4.2, 0.4, { y: 20 });

    /* 4 — the four steps */
    c = at(4);
    frame(4, c);
    OUT(Q('h0 h1 lg rj nr'), c, 0.4);
    range(4).forEach((k) => { IN(q('s' + k), c + 0.6 + k * 0.9, 0.45, { y: 30 }); SND('pop', c + 0.6 + k * 0.9); });
    POP(q('cc'), c + 4.4, 0.5); SND('ok', c + 4.4);

    /* 5 — p versus α */
    c = at(5);
    frame(5, c, 6.0);
    OUT(Q('s0 s1 s2 s3 cc'), c, 0.4);
    IN(q('g'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(sel('g', 'pm'), { x: 400 }, { x: 0, duration: 0.9, ease: 'power2.out' }, c + 1.0); SND('tap', c + 1.0);
    IN(q('r1'), c + 2.0, 0.4, { x: 30 * sx }); SND('ok', c + 2.0);
    tl.to(sel('g', 'pm'), { x: PX(0.08) - PX(0.02), duration: 1.0, ease: 'power2.inOut' }, c + 3.0);
    IN(q('r2'), c + 4.0, 0.4, { x: 30 * sx });
    IN(q('pdef'), c + 4.6, 0.5, { x: 40 * sx });

    /* 6 — t-test & chi-squared */
    c = at(6);
    frame(6, c);
    OUT(Q('g r1 r2 pdef'), c, 0.4);
    IN(q('tt'), c + 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5);
    IN(q('tbar'), c + 1.2, 0.4);
    tl.fromTo(sel('tbar', 'tb'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.6)' }, c + 1.3);
    IN(q('ch'), c + 2.8, 0.5, { y: 30 }); SND('pop', c + 2.8);
    IN(q('cgr'), c + 3.4, 0.4);
    tl.fromTo(sel('cgr', 'cg'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.3, stagger: 0.07 }, c + 3.5);

    /* 7 — Type I / Type II + trade-off */
    c = at(7);
    frame(7, c);
    OUT(Q('tt ch tbar cgr'), c, 0.4);
    IN(q('e1'), c + 0.5, 0.5, { x: -40 * sx }); SND('bad', c + 0.5);
    IN(q('e2'), c + 1.5, 0.5, { x: 40 * sx }); SND('bad', c + 1.5);
    IN(q('sw'), c + 2.6, 0.4, { y: 20 });
    IN(q('saw'), c + 3.0, 0.4);
    tl.fromTo(sel('saw', 'plank'), { rotation: 0, svgOrigin: '400 113' }, { rotation: -12, svgOrigin: '400 113', duration: 0.8, ease: 'back.out(2)' }, c + 3.6); SND('tap', c + 3.6);
    tl.to(sel('saw', 'plank'), { rotation: 12, svgOrigin: '400 113', duration: 0.9, ease: 'back.out(2)' }, c + 4.8);

    /* 8 — cautions */
    c = at(8);
    frame(8, c);
    OUT(Q('e1 e2 sw saw'), c, 0.4);
    range(4).forEach((k) => { IN(q('w' + k), c + 0.6 + k * 0.8, 0.4, { x: 30 * sx }); SND(k === 3 ? 'ok' : 'bad', c + 0.6 + k * 0.8); });
    IN(q('ex'), c + 3.8, 0.5, { x: 40 * sx });

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

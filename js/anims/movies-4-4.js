/* =========================================================
 * anims/movies-4-4.js — lesson 4-4 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   improveMovie (stations pdca 0–4 · design 5–9): version 1 is a best guess ·
 *     the PDCA wheel lights Plan (a bounce goal) · Do (the homepage is
 *     redesigned) · Check (bars against the goal line) · Act (enough or not →
 *     the wheel turns to round 2) · design thinking ①② (a student who cannot
 *     find “Sign up”) · ③④⑤ (sticky ideas → a paper prototype → a tester,
 *     then back) · an A/B split with click counters · the A/B rules · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  K.defineAnim('improveMovie', (stage, props, api) => {
    const P = 'i4-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l12 mv-l44', prefix: P, beats: 10, cast: { us: 'studentL', te: 'student' },
      html: (L) => {
        /* the PDCA wheel: four arcs (P top-right, clockwise), a runner dot, the active word in the middle */
        const COL = ['#38bdf8', '#34d399', '#fbbf24', '#f87171'];
        const WORD = [L('خطّط', 'Plan'), L('نفّذ', 'Do'), L('تحقّق', 'Check'), L('تصرّف', 'Act')];
        const pt = (a, r) => { const t = (a * Math.PI) / 180; return `${(280 + r * Math.cos(t)).toFixed(1)} ${(280 + r * Math.sin(t)).toFixed(1)}`; };
        const arc = (a1, a2) => `M${pt(a1, 205)} A205 205 0 0 1 ${pt(a2, 205)}`;
        const WHEEL = `<circle cx="280" cy="280" r="205" fill="none" stroke="rgba(148,163,184,.14)" stroke-width="84"/>
          ${['P', 'D', 'C', 'A'].map((l, k) => { const a = -90 + k * 90; return `<g class="q q${k}"><path d="${arc(a + 5, a + 85)}" fill="none" stroke="${COL[k]}" stroke-width="76" stroke-linecap="round"/>
            <text x="${pt(a + 45, 205).split(' ')[0]}" y="${+pt(a + 45, 205).split(' ')[1] + 22}" text-anchor="middle" font-size="62" font-weight="900" fill="#0b1222">${l}</text></g>`; }).join('')}
          <g class="run"><circle cx="280" cy="40" r="20" fill="#f8fafc" stroke="#0b1222" stroke-width="5"/></g>
          <circle cx="280" cy="280" r="132" fill="#0f172a" stroke="rgba(148,163,184,.35)" stroke-width="4"/>
          ${WORD.map((w, k) => `<text class="w w${k}" x="280" y="282" text-anchor="middle" font-size="58" font-weight="900" fill="${COL[k]}">${w}</text>`).join('')}
          <text class="rd r1" x="280" y="342" text-anchor="middle" font-size="30" font-weight="900" fill="#cbd5e1">🔁 ${L('جولة 1', 'round 1')}</text>
          <text class="rd r2" x="280" y="342" text-anchor="middle" font-size="30" font-weight="900" fill="#fde68a">🔁 ${L('جولة 2', 'round 2')}</text>`;
        const meter = (rows) => `<div class="l44-meter">${rows.map(([lab, w, cls, val]) => `<div class="mr"><b>${lab}</b><span class="l12-bar ${cls}"><i data-w="${w}" style="width:${w}%"></i></span><em><bdi>${val}</bdi></em></div>`).join('')}<span class="gl"><i>🎯 <bdi>30%</bdi></i></span></div>`;
        const STEPS = [['🤝', L('التعاطف', 'Empathize'), 'c-pink'], ['🎯', L('التعريف', 'Define'), 'c-violet'], ['💡', L('الأفكار', 'Ideate'), 'c-amber'], ['🧪', L('النموذج', 'Prototype'), 'c-blue'], ['👥', L('الاختبار', 'Test'), 'c-green']];
        const shop = (id, x, lab, cls) => `<div id="${P}${id}" class="l12u l12-win l44-ab later" style="${B.at(x, 150, 560, 360)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com</span></div>
          <div class="wbody"><span class="abt ${cls}">${lab}</span><div class="pr">👟 <span>${L('حذاء رياضي', 'Sneakers')}<br><bdi>450</bdi> ${L('جنيه', 'EGP')}</span></div><span class="buy ${cls}">🛒 ${L('اشترِ', 'Buy')}</span></div></div>`;
        return `
    ${B.svg('wh', 70, 150, 560, 560, '0 0 560 560', WHEEL)}

  <div id="i4-s0" class="mv-stage">
    <div id="i4-v1" class="l12u l12-win later" style="${B.at(70, 150, 820, 470)}"><div class="wbar"><i></i><i></i><i></i><span class="url">school.com</span></div>
      <div class="wbody l44-v1"><span class="ver">v<bdi class="vn">1</bdi>.0</span><div class="ln"><i></i><i></i><i></i></div><span class="gs">🤔 ${L('النسخة الأولى = أحسن تخمين', 'version 1 = a best guess')}</span></div></div>
    ${B.card('pd', 960, 150, 900, 0, 'c-blue', { ic: '🔁', h: L('دورة PDCA', 'The PDCA cycle'), p: L('بتدفع التحسين باستمرار بتكرار أربع خطوات', 'drives continuous improvement by repeating four steps'),
      html: `<div class="l44-four">${['P', 'D', 'C', 'A'].map((l, k) => `<span style="background:${COL[k]}">${l}</span>`).join('')}</div>` })}
    ${B.chip('use', 960, 520, '🏭 ' + L('تحسين الأعمال', 'business improvement') + ' · ✅ ' + L('إدارة الجودة', 'quality management') + ' · 🌐 ' + L('المواقع', 'websites'), 'c-slate', 900)}
  </div>
  <div id="i4-s1" class="mv-stage">
    ${B.card('pl', 700, 150, 1160, 0, 'c-blue', { row: true, ic: '🎯', h: 'P · ' + L('خطّط', 'Plan'), p: L('نحدّد هدف ونعمل خطة للتحسين', 'set a goal and plan the improvement') })}
    ${B.card('gl1', 700, 350, 620, 0, 'c-blue', { h: '🎯 ' + L('الهدف', 'The goal'), p: L('نرفع إكمال التسجيل من 40% لـ 50%', 'cut the bounce rate by 10%'), k: '<bdi>40%</bdi> ' + B.arrow + ' <bdi>' + L('50%', '30%') + '</bdi>' })}
    ${B.card('pn', 1370, 350, 490, 0, 'c-slate', { h: '📝 ' + L('الخطة', 'The plan'), p: L('تغيير مناسب في الصفحة', 'redesign the homepage') })}
  </div>
  <div id="i4-s2" class="mv-stage">
    ${B.card('do', 700, 150, 1160, 0, 'c-green', { row: true, ic: '🛠️', h: 'D · ' + L('نفّذ', 'Do'), p: L('ننفّذ حسب الخطة — نغيّر تصميم الصفحة الرئيسية', 'carry out the plan — change the homepage design') })}
    <div id="i4-hp" class="l12u l12-win later" style="${B.at(700, 330, 760, 400)}"><div class="wbar"><i></i><i></i><i></i><span class="url">school.com</span></div>
      <div class="wbody l44-hp"><div class="old">${range(6).map((k) => `<i style="width:${92 - (k % 3) * 18}%"></i>`).join('')}</div>
        <div class="neu"><b class="hero">📚 ${L('اتعلّم أسرع', 'Learn faster')}</b><span class="pic">🖼️</span><span class="cta">${L('سجّل', 'Sign up')}</span></div></div></div>
    ${B.big('wr', 1080, 470, 120, 96, '🔧')}
    ${B.chip('dn', 1500, 420, '✅ ' + L('اتنفّذ حسب الخطة', 'done as planned'), 'c-green', 360)}
  </div>
  <div id="i4-s3" class="mv-stage">
    ${B.card('ck', 700, 150, 1160, 0, 'c-amber', { row: true, ic: '📏', h: 'C · ' + L('تحقّق', 'Check'), p: L('نقيس النتايج ونقيّم قد إيه حقّقنا الهدف', 'measure the results and evaluate how far the goal was met') })}
    ${B.card('ms', 700, 330, 1160, 0, 'c-amber', { h: '🚪 ' + L('إكمال التسجيل', 'Bounce rate'), html: meter([[L('قبل', 'before'), 40, 's', '40%'], [L('بعد', 'after'), L('46', '34'), 'm', L('46%', '34%')]]) })}
    ${B.chip('vd', 700, 650, '📉 ' + L('اتحسّن لـ 46%… بس لسه موصلناش للهدف 50%', 'down to 34%… but not yet the 30% goal'), 'c-amber', 1160)}
  </div>
  <div id="i4-s4" class="mv-stage">
    ${B.card('ac', 700, 150, 1160, 0, 'c-red', { row: true, ic: '🔁', h: 'A · ' + L('تصرّف', 'Act'), p: L('بناءً على النتايج نعتمد اللي نجح أو نغيّر الخطة', 'based on the evaluation, decide the next improvement') })}
    ${B.card('ok', 700, 340, 560, 0, 'c-green', { ic: '✅', h: L('حقّق الهدف؟', 'Effect enough?'), p: L('نعتمده أو نوسّعه', 'continue this way') })}
    ${B.card('no', 1300, 340, 560, 0, 'c-red', { ic: '🔧', h: L('ماحقّقش الهدف؟', 'Not enough?'), p: L('نراجع السبب والخطة', 'revise headings or image placement') })}
    ${B.chip('bk', 700, 640, '↩️ ' + L('ونرجع لـ«خطّط» تاني — نتحسّن تدريجيًا بالتكرار', 'and back to “Plan” — improve gradually by repeating'), 'c-blue', 1160)}
  </div>

    ${STEPS.map(([ic, t, c], k) => B.chip('t' + k, 70 + k * 360, 150, `<bdi>${k + 1}</bdi> · ${ic} ${t}`, c + ' l44-st', 330)).join('')}
  <div id="i4-s5" class="mv-stage">
    ${B.ch('us', 70, 420, 'md')}
    ${B.chip('sy', 70, 250, '«' + L('زرار التسجيل تحت خالص!', 'Sign-up is way down!') + '» 😕', 'c-slate', 540)}
    <div id="i4-ph" class="l12u l12-phone l44-ph later" style="${B.at(320, 330, 270, 410)}"><div class="scr"><div class="lng">${range(7).map(() => '<i></i>').join('')}<span class="cta">${L('سجّل', 'Sign up')}</span></div></div></div>
    ${B.card('em', 680, 250, 560, 0, 'c-pink', { ic: '🤝', h: '① ' + L('التعاطف', 'Empathize'), p: L('نتعرّف على تجربة المستخدم واحتياجاته', 'put ourselves in the user’s place; understand challenges and needs') })}
    ${B.card('df', 1290, 250, 570, 0, 'c-violet', { ic: '🎯', h: '② ' + L('التعريف', 'Define'), p: L('من اللي فهمناه نوضّح المشكلة اللي هنحلّها', 'from what we learned, clarify the problem to solve') })}
    ${B.chip('pb', 680, 610, '📌 ' + L('المشكلة: الطالب مش لاقي «سجّل» على الموبايل', 'Problem: students can’t find “Sign up” on phones'), 'c-violet', 1180)}
  </div>
  <div id="i4-s6" class="mv-stage">
    ${B.chip('id', 70, 250, '③ ' + L('توليد الأفكار: أفكار كتير', 'Ideate: many ideas'), 'c-amber', 560)}
    ${[L('الزرار فوق', 'button on top'), L('شريط ثابت', 'sticky bar'), L('زرار أكبر', 'bigger button'), L('لون أوضح', 'clearer color')]
      .map((t, k) => `<div id="${P}i${k}" class="l12u l44-note later" style="${B.at(70 + (k % 2) * 290, 340 + Math.floor(k / 2) * 180, 270, 160)}">💡<br>${t}</div>`).join('')}
    ${B.chip('pt', 680, 250, '④ ' + L('النموذج الأولي: نموذج سريع', 'Prototype: a quick model'), 'c-blue', 560)}
    <div id="i4-sk" class="l12u l44-sk later" style="${B.at(800, 340, 320, 360)}"><span class="cta">${L('سجّل', 'Sign up')}</span><i></i><i></i><i></i><i></i></div>
    ${B.chip('ts', 1290, 250, '⑤ ' + L('الاختبار: المستخدمين يجرّبوه', 'Test: users try it'), 'c-green', 570)}
    ${B.ch('te', 1300, 400, 'md')}
    ${B.chip('f1', 1540, 400, '👍 ' + L('لقيته بسرعة', 'found it fast'), 'c-green sm')}
    ${B.chip('f2', 1540, 500, '🤔 ' + L('اللون باهت', 'color is faint'), 'c-amber sm')}
    ${B.big('rt', 1530, 214, 70, 54, '↩️')}
    ${B.mid('bk2', 696, '↩️ ' + L('على حسب النتيجة ممكن نرجع للتعاطف أو التعريف — رايح جاي', 'based on the result we may go back to empathize or define — back and forth'), 'c-pink')}
  </div>

  <div id="i4-s7" class="mv-stage">
    ${shop('wa', 70, 'A', 'a')}${shop('wb', 1290, 'B', 'b')}
    <div id="i4-fl" class="l12u l44-flow later" style="${B.at(660, 170, 600, 330)}">${range(10).map((k) => `<span class="u u${k}">👤</span>`).join('')}</div>
    ${B.card('ka', 70, 540, 560, 0, 'c-red', { html: `<div class="l44-cnt">👆 <bdi class="ca">0</bdi> ${L('ضغطة', 'clicks')}</div>` })}
    ${B.card('kb', 1290, 540, 570, 0, 'c-blue', { html: `<div class="l44-cnt">👆 <bdi class="cb">0</bdi> ${L('ضغطة', 'clicks')}</div>` })}
    ${B.card('win', 700, 520, 520, 0, 'c-green', { ic: '🏆', h: L('B أكتر فاعلية', 'B is more effective'), p: L('بالبيانات — مش بالذوق', 'by data — not by taste') })}
  </div>
  <div id="i4-s8" class="mv-stage">
    ${B.card('r1', 70, 150, 880, 0, 'c-green', { ic: '1️⃣', h: L('فرق واضح ومحدد بين النسختين', 'Change only one element at a time'),
      html: `<div class="l44-pair"><span class="buy a">${L('اشترِ', 'Buy')}</span><b>vs</b><span class="buy b">${L('اشترِ', 'Buy')}</span><em>✓ ${L('اللون بس', 'color only')}</em></div>` })}
    ${B.card('r2', 990, 150, 870, 0, 'c-blue', { ic: '📊', h: L('حدّد المقياس قبل الاختبار، واجمع عينة كافية', 'Decide after enough data'),
      html: `<div class="l44-pair"><span class="smp">👥 <bdi class="sn">10</bdi></span><span class="l12-slot"><em class="e1">⏳ ${L('لسه بدري', 'too early')}</em><em class="e2">✅ ${L('نقرّر', 'decide')}</em></span></div>` })}
    ${B.card('bd', 70, 470, 1790, 0, 'c-red', { row: true, ic: '❌', h: L('نغيّر اللون + الكلام + المكان مع بعض', 'Change color + text + position together'), p: L('حزمة التغييرات بتقيس أثر الحزمة، مش كل عنصر', 'you cannot tell which change made the effect → a wrong practice') })}
    ${B.big('qm', 1700, 500, 120, 90, '❓')}
  </div>
  <div id="i4-s9" class="mv-stage">
    ${B.card('x0', 70, 160, 560, 400, 'c-blue', { ic: '🔁', h: 'PDCA', p: L('خطّط ← نفّذ ← تحقّق ← تصرّف ← وتاني', 'Plan → Do → Check → Act → again'), k: L('إزاي نكرّر', 'how we repeat') })}
    ${B.card('x1', 680, 160, 560, 400, 'c-violet', { ic: '🧠', h: L('التفكير التصميمي', 'Design thinking'), p: L('تعاطف · تعريف · أفكار · نموذج · اختبار', 'empathize · define · ideate · prototype · test'), k: L('نحسّن إيه', 'what to improve') })}
    ${B.card('x2', 1290, 160, 570, 400, 'c-green', { ic: '🆎', h: L('اختبار A/B', 'A/B testing'), p: L('فرق واضح + عينة كافية', 'one element + enough data'), k: L('أنهي خيار', 'which option') })}
    ${B.mid('xb', 620, '🌱 ' + L('حسّن في دواير — الموقع عمره ما بيخلص', 'improve in loops — a website is never finished'), 'c-amber big')}
  </div>
    ${U.hd(0, '🌱 ' + L('الموقع عمره ما بيخلص', 'A website is never finished'))}
    ${U.hd(1, 'P · ' + L('خطّط', 'Plan'))}
    ${U.hd(2, 'D · ' + L('نفّذ', 'Do'))}
    ${U.hd(3, 'C · ' + L('تحقّق', 'Check'))}
    ${U.hd(4, 'A · ' + L('تصرّف… والدورة تلف تاني', 'Act… and the wheel turns again'))}
    ${U.hd(5, '🧠 ' + L('التفكير التصميمي ①②', 'Design thinking ①②'))}
    ${U.hd(6, '🧠 ' + L('التفكير التصميمي ③④⑤', 'Design thinking ③④⑤'))}
    ${U.hd(7, '🆎 ' + L('اختبار A/B', 'A/B testing'))}
    ${U.hd(8, '🔑 ' + L('قواعد اختبار A/B', 'A/B testing rules'))}
    ${U.hd(9, '📌 ' + L('الخلاصة: حسّن في دواير', 'The point: improve in loops'))}
    ${U.nt(4, '⚠️ ' + L('«PDCA بتخلص بعد جولة واحدة» ← غلط', '“PDCA is complete after one round” → false'), 'warn')}
    ${U.nt(5, '🧠 ' + L('اكتشاف المشاكل وتوليد الحلول من منظور المستخدم', 'Finding problems and solutions from the user’s perspective'), 'ok')}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };
    /* light one quarter of the wheel: the others dim, its word shows in the middle */
    const lit = (k, t) => {
      tl.to(all('#i4-wh .q'), { opacity: (i) => (i === k ? 1 : 0.22), duration: 0.4 }, t);
      tl.to(all('#i4-wh .w'), { opacity: (i) => (i === k ? 1 : 0), duration: 0.3 }, t);
      tl.to(all('#i4-wh .run'), { rotation: 45 + k * 90, svgOrigin: '280 280', duration: 0.7, ease: 'power2.inOut' }, t);
      glow(M, all('#i4-wh .q' + k), t + 0.5, 'rgba(255,255,255,.7)'); SND('pop', t + 0.5);
    };
    const step = (k, t) => {
      tl.to(Q('t0 t1 t2 t3 t4'), { opacity: (i) => (i === k ? 1 : 0.4), scale: (i) => (i === k ? 1.06 : 1), duration: 0.35 }, t);
    };

    /* 0 — never finished */
    let c = at(0);
    frame(0, c);
    tl.set(all('#i4-wh .w, #i4-wh .r2'), { opacity: 0 }, c);
    IN(q('v1'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#i4-v1 .vn'), { textContent: 1 }, { textContent: 4, snap: { textContent: 1 }, duration: 2.4, ease: 'none' }, c + 1.4); SND('tap', c + 1.4);
    IN(q('pd'), c + 2.6, 0.5, { x: 40 * sx }); SND('ok', c + 2.6);
    tl.fromTo(all('#i4-pd .l44-four span'), { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.2, ease: 'back.out(2)' }, c + 3.2);
    IN(q('use'), c + 4.4, 0.4, { y: 12 });

    /* 1 — Plan */
    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('wh'), c + 0.4, 0.6, { scale: 0.85 });
    tl.set(all('#i4-wh .r1'), { opacity: 1 }, c);
    lit(0, c + 1.0);
    IN(q('pl'), c + 1.6, 0.5, { x: 40 * sx });
    IN(q('gl1'), c + 2.6, 0.5, { y: 30 }); SND('pop', c + 2.6);
    IN(q('pn'), c + 3.6, 0.5, { y: 30 }); SND('pop', c + 3.6);

    /* 2 — Do */
    c = at(2);
    frame(2, c);
    leave(2, c);
    lit(1, c + 0.4);
    IN(q('do'), c + 0.9, 0.5, { x: 40 * sx });
    IN(q('hp'), c + 1.8, 0.5, { y: 30 });
    tl.fromTo(q('wr'), { opacity: 0, rotation: 0 }, { opacity: 1, rotation: -40, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, c + 2.6); SND('tap', c + 2.6);
    tl.fromTo(all('#i4-hp .old'), { opacity: 1 }, { opacity: 0, duration: 0.5 }, c + 4.2);
    tl.fromTo(all('#i4-hp .neu'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, c + 4.4); SND('ok', c + 4.4);
    tl.to(q('wr'), { opacity: 0, duration: 0.3 }, c + 4.4);
    POP(q('dn'), c + 5.0, 0.4);

    /* 3 — Check */
    c = at(3);
    frame(3, c);
    leave(3, c);
    lit(2, c + 0.4);
    IN(q('ck'), c + 0.9, 0.5, { x: 40 * sx });
    IN(q('ms'), c + 1.8, 0.5, { y: 30 });
    tl.fromTo(all('#i4-ms .l12-bar i'), { width: '0%' }, { width: (k, e) => e.dataset.w + '%', duration: 0.9, stagger: 0.8 }, c + 2.4); SND('tap', c + 2.4);
    tl.fromTo(all('#i4-ms .gl'), { opacity: 0, scaleY: 0, transformOrigin: '50% 0%' }, { opacity: 1, scaleY: 1, duration: 0.5 }, c + 4.2); SND('pop', c + 4.2);
    IN(q('vd'), c + 5.0, 0.4, { y: 12 }); SND('bad', c + 5.0);

    /* 4 — Act, and the wheel turns to round 2 */
    c = at(4);
    frame(4, c, 6.4);
    leave(4, c);
    lit(3, c + 0.4);
    IN(q('ac'), c + 0.9, 0.5, { x: 40 * sx });
    IN(q('ok'), c + 1.8, 0.5, { y: 30 }); IN(q('no'), c + 2.2, 0.5, { y: 30 });
    glow(M, q('no'), c + 3.0, 'rgba(248,113,113,.95)'); SND('bad', c + 3.0);
    tl.to(q('ok'), { opacity: 0.45, duration: 0.4 }, c + 3.0);
    tl.to(all('#i4-wh .q'), { opacity: 1, duration: 0.4 }, c + 4.0);
    tl.to(all('#i4-wh .w'), { opacity: 0, duration: 0.3 }, c + 4.0);
    tl.to(all('#i4-wh .run'), { rotation: 405, svgOrigin: '280 280', duration: 1.4, ease: 'power2.inOut' }, c + 4.0); SND('whoosh', c + 4.0);
    tl.to(all('#i4-wh .r1'), { opacity: 0, duration: 0.2 }, c + 5.2); tl.to(all('#i4-wh .r2'), { opacity: 1, duration: 0.3 }, c + 5.3);
    tl.to(all('#i4-wh .w0'), { opacity: 1, duration: 0.3 }, c + 5.3);
    tl.to(all('#i4-wh .q'), { opacity: (i) => (i === 0 ? 1 : 0.22), duration: 0.3 }, c + 5.3);
    IN(q('bk'), c + 5.4, 0.4, { y: 12 }); SND('ok', c + 5.4);

    /* 5 — design thinking ① ② */
    c = at(5);
    frame(5, c, 6.0);
    leave(5, c);
    OUT(q('wh'), c, 0.4);
    range(5).forEach((k) => IN(q('t' + k), c + 0.4 + k * 0.15, 0.3, { y: -20 }));
    step(0, c + 1.4);
    IN(q('us'), c + 1.2, 0.5, { y: 30 }); IN(q('ph'), c + 1.4, 0.5, { y: 30 });
    tl.fromTo(all('#i4-ph .lng'), { y: 0 }, { y: -330, duration: 1.6, ease: 'power1.inOut' }, c + 2.0);
    M.mood('us', true, c + 3.4); POP(q('sy'), c + 3.4, 0.4); SND('bad', c + 3.4);
    IN(q('em'), c + 2.2, 0.5, { y: 30 });
    step(1, c + 4.2);
    IN(q('df'), c + 4.2, 0.5, { y: 30 }); SND('pop', c + 4.2);
    IN(q('pb'), c + 5.2, 0.4, { y: 12 });

    /* 6 — design thinking ③ ④ ⑤, then back */
    c = at(6);
    frame(6, c);
    leave(6, c);
    step(2, c + 0.4);
    IN(q('id'), c + 0.5, 0.4, { y: -12 });
    range(4).forEach((k) => { POP(q('i' + k), c + 0.9 + k * 0.3, 0.35); });
    SND('pop', c + 0.9);
    step(3, c + 2.4);
    IN(q('pt'), c + 2.4, 0.4, { y: -12 });
    glow(M, q('i0'), c + 2.6, 'rgba(251,191,36,.95)');
    IN(q('sk'), c + 3.0, 0.5, { scale: 0.8 }); SND('tap', c + 3.0);
    step(4, c + 4.0);
    IN(q('ts'), c + 4.0, 0.4, { y: -12 });
    IN(q('te'), c + 4.3, 0.5, { y: 30 }); POP(q('f1'), c + 4.9, 0.35); POP(q('f2'), c + 5.3, 0.35); SND('pop', c + 4.9);
    tl.fromTo(q('rt'), { opacity: 0, x: 0 }, { opacity: 1, duration: 0.2 }, c + 5.9);
    tl.to(q('rt'), { x: -1360 * sx, duration: 1.2, ease: 'power2.inOut' }, c + 6.0); SND('whoosh', c + 6.0);
    tl.to(Q('t0 t1'), { opacity: 1, scale: 1.06, duration: 0.3 }, c + 7.0);
    tl.to(q('rt'), { opacity: 0, duration: 0.3 }, c + 7.2);
    IN(q('bk2'), c + 7.1, 0.4, { y: 12 });

    /* 7 — A/B test */
    c = at(7);
    frame(7, c);
    leave(7, c);
    OUT(Q('t0 t1 t2 t3 t4'), c, 0.4);
    IN(q('wa'), c + 0.4, 0.5, { x: -40 * sx }); IN(q('wb'), c + 0.7, 0.5, { x: 40 * sx }); SND('pop', c + 0.7);
    IN(q('fl'), c + 1.2, 0.2);
    range(10).forEach((k) => {
      const t = c + 1.4 + k * 0.22, toB = k % 2 === 1;
      tl.fromTo(all('#i4-fl .u' + k), { opacity: 0, x: 0, y: 0 }, { opacity: 1, y: 40 + (k % 3) * 60, duration: 0.3 }, t);
      tl.to(all('#i4-fl .u' + k), { x: (toB ? 330 : -330) * sx, opacity: 0, duration: 0.6, ease: 'power1.in' }, t + 0.4);
    });
    IN(Q('ka kb'), c + 2.4, 0.4, { y: 20 });
    tl.fromTo(all('#i4-ka .ca'), { textContent: 0 }, { textContent: 120, snap: { textContent: 1 }, duration: 1.8 }, c + 2.8);
    tl.fromTo(all('#i4-kb .cb'), { textContent: 0 }, { textContent: 180, snap: { textContent: 1 }, duration: 1.8 }, c + 2.8); SND('tap', c + 2.8);
    glow(M, Q('wb kb'), c + 4.8, 'rgba(56,189,248,.95)');
    POP(q('win'), c + 5.0, 0.5); SND('ok', c + 5.0);

    /* 8 — A/B rules */
    c = at(8);
    frame(8, c);
    leave(8, c);
    IN(q('r1'), c + 0.4, 0.5, { y: 30 }); SND('pop', c + 0.4);
    tl.fromTo(all('#i4-r1 em'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 1.4);
    IN(q('r2'), c + 2.0, 0.5, { y: 30 }); SND('pop', c + 2.0);
    tl.set(all('#i4-r2 .e2'), { opacity: 0 }, c);
    tl.fromTo(all('#i4-r2 .e1'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 2.6);
    tl.fromTo(all('#i4-r2 .sn'), { textContent: 10 }, { textContent: 2000, snap: { textContent: 10 }, duration: 1.4, ease: 'power1.in' }, c + 3.2);
    tl.to(all('#i4-r2 .e1'), { opacity: 0, duration: 0.2 }, c + 4.6); tl.to(all('#i4-r2 .e2'), { opacity: 1, duration: 0.3 }, c + 4.7); SND('ok', c + 4.7);
    IN(q('bd'), c + 5.4, 0.5, { y: 30 }); SND('bad', c + 5.4);
    POP(q('qm'), c + 6.0, 0.4);

    /* 9 — recap */
    c = at(9);
    frame(9, c);
    leave(9, c);
    Q('x0 x1 x2').forEach((x, i) => { IN(x, c + 0.4 + i * 0.6, 0.5, { y: 30 }); SND('pop', c + 0.4 + i * 0.6); });
    POP(q('xb'), c + 2.4, 0.5); SND('ok', c + 2.4);

    /* living loops */
    const spin = () => gsap.timeline({ repeat: -1 }).to(all('#i4-wh .run'), { rotation: '+=360', svgOrigin: '280 280', duration: 6, ease: 'none' });
    M.loop(0, 5.0, () => M.breathe(all('#i4-pd .l44-four'), 1.05, 1.0));
    M.loop(1, 4.4, () => M.breathe(q('gl1'), 1.03, 1.0));
    M.loop(2, 5.6, () => M.breathe(all('#i4-hp .cta'), 1.1, 0.8));
    M.loop(3, 5.6, () => M.breathe(q('vd'), 1.03, 1.0));
    M.loop(4, 6.0, spin);
    M.loop(5, 5.8, () => M.bob(q('sy'), 7, 1.1));
    M.loop(6, 7.6, () => glowCycle(Q('t4 t3 t2 t1 t0'), 'rgba(244,114,182,.9)', 0.3));
    M.loop(7, 5.6, () => M.breathe(q('win'), 1.05, 0.9));
    M.loop(8, 6.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(q('qm'), { rotation: -12 }, { rotation: 12, duration: 0.5, ease: 'sine.inOut' }));
    M.loop(9, 3.2, () => glowCycle(Q('x0 x1 x2'), 'rgba(251,191,36,.8)', 0.6));
    return M.done();
  });
})();

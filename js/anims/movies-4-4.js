/* =========================================================
 * anims/movies-4-4.js — lesson 4-4 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   improveMovie : never finished · Plan · Do · Check · Act (the PDCA ring
 *                  turns) · design thinking 1–2 and 3–5 · A/B test ·
 *                  A/B rules
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  K.defineAnim('improveMovie', (stage, props, api) => {
    const U = MK.uiL('i4-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l44', prefix: 'i4-', beats: 10, cast: { 'ch-s': 'student' },
      html: (L) => {
        const NODES = [['P', L('خطّط', 'Plan'), 280, 78, '#38bdf8'], ['D', L('نفّذ', 'Do'), 482, 280, '#34d399'], ['C', L('تحقّق', 'Check'), 280, 482, '#fbbf24'], ['A', L('تصرّف', 'Act'), 78, 280, '#f87171']];
        const RING = `<circle cx="280" cy="280" r="202" fill="none" stroke="#334155" stroke-width="14"/>
          <g class="spin"><path d="M280 78 A202 202 0 0 1 482 280" fill="none" stroke="#94a3b8" stroke-width="8" stroke-dasharray="18 14"/><path d="M482 280 A202 202 0 0 1 280 482" fill="none" stroke="#94a3b8" stroke-width="8" stroke-dasharray="18 14"/>
            <path d="M280 482 A202 202 0 0 1 78 280" fill="none" stroke="#94a3b8" stroke-width="8" stroke-dasharray="18 14"/><path d="M78 280 A202 202 0 0 1 280 78" fill="none" stroke="#94a3b8" stroke-width="8" stroke-dasharray="18 14"/></g>
          ${NODES.map(([l, t, x, y, col], k) => `<g class="nd n${k}"><circle cx="${x}" cy="${y}" r="70" fill="#0f172a" stroke="${col}" stroke-width="8"/>
            <text x="${x}" y="${y - 2}" text-anchor="middle" font-size="54" font-weight="900" fill="${col}">${l}</text><text x="${x}" y="${y + 40}" text-anchor="middle" font-size="28" font-weight="800" fill="#e2e8f0">${t}</text></g>`).join('')}
          <text x="280" y="296" text-anchor="middle" font-size="64">🔁</text>`;
        const HOME = (neu) => `<rect x="4" y="4" width="412" height="232" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
          ${neu ? '<rect x="24" y="22" width="372" height="48" rx="10" fill="#f87171"/><rect x="24" y="86" width="230" height="120" rx="12" fill="#38bdf8"/><rect x="274" y="96" width="122" height="22" rx="11" fill="#cbd5e1"/><rect x="274" y="132" width="100" height="22" rx="11" fill="#cbd5e1"/><rect x="274" y="166" width="122" height="34" rx="17" fill="#f97316"/>'
            : '<rect x="24" y="22" width="372" height="24" rx="6" fill="#cbd5e1"/>' + range(5).map((k) => `<rect x="24" y="${64 + k * 32}" width="${372 - (k % 2) * 120}" height="16" rx="8" fill="#cbd5e1"/>`).join('')}`;
        return `
  <div id="i4-stage" class="mv-stage">
    ${U.art('v1', 120, 220, 420, 240, '0 0 420 240', HOME(false))}
    ${U.pill('v1l', 120, 490, '🤔 ' + L('نسخة 1 = أحسن تخمين', 'Version 1 = a best guess'), 't-amber')}
    ${U.emo('fb', 640, 260, 420, 70, '🧑 💬 🧑 💬 🧑')}
    ${U.box('pd', 1160, 210, 680, 't-blue', { ic: '🔁', h: L('دورة PDCA', 'The PDCA cycle'), p: L('تكرار أربع خطوات للتحسين المستمر', 'four steps repeated for continuous improvement'), s: L('كمان في تحسين الأعمال وإدارة الجودة', 'also in business improvement and quality management') })}

    ${U.art('ring', 90, 150, 560, 560, '0 0 560 560', RING)}
    ${U.box('pl', 760, 190, 1080, 't-blue', { ic: '🎯', h: L('P · خطّط', 'P · Plan'), p: L('نحدّد هدف ونعمل خطة للتحسين', 'set a goal and plan the improvement'), s: L('مثال: هدف «نقلّل معدل الارتداد 10%» + نخطّط لإعادة تصميم الرئيسية', 'e.g. goal "cut the bounce rate by 10%" + plan a homepage redesign') })}
    ${U.pill('goal', 760, 520, '🎯 ' + L('الارتداد: 40% ← الهدف 30%', 'Bounce: 40% → goal 30%'), 'solid')}
    ${U.box('do', 760, 190, 1080, 't-green', { ic: '🛠️', h: L('D · نفّذ', 'D · Do'), p: L('ننفّذ حسب الخطة', 'carry out the plan'), s: L('نغيّر تصميم الصفحة الرئيسية', 'change the homepage design') })}
    ${U.art('hp0', 760, 470, 420, 240, '0 0 420 240', HOME(false))}
    ${U.art('hp1', 1260, 470, 420, 240, '0 0 420 240', HOME(true))}
    ${U.emo('hpa', 1180, 550, 80, 56, MK.RTL() ? '⬅️' : '➡️')}
    ${U.box('ck', 760, 190, 1080, 't-amber', { ic: '📏', h: L('C · تحقّق', 'C · Check'), p: L('نقيس النتايج ونقيّم قد إيه حقّقنا الهدف', 'measure results and evaluate goal achievement'), s: L('نقيس الارتداد بعد التغيير ونقارنه بالهدف', 'measure bounce after the change against the goal') })}
    ${U.pill('meas', 760, 520, '📉 ' + L('الارتداد بقى 34% — لسه مش 30%', 'Bounce is now 34% — not yet 30%'), 't-amber')}
    ${U.box('ac', 760, 190, 1080, 't-red', { ic: '🔁', h: L('A · تصرّف', 'A · Act'), p: L('على حسب التقييم نقرّر الخطوة الجاية', 'based on the evaluation, decide the next step'), s: L('كفاية؟ نكمّل · مش كفاية؟ نعدّل العناوين أو مكان الصور', 'enough? continue · not enough? revise headings or images') })}
    ${U.pill('loop', 760, 520, '↩️ ' + L('ونرجع لـ«خطّط» — التحسّن بالتكرار', 'back to "Plan" — improvement by repetition'), 't-green')}

    ${['① ' + L('التعاطف', 'Empathize'), '② ' + L('التعريف', 'Define'), '③ ' + L('الأفكار', 'Ideate'), '④ ' + L('النموذج', 'Prototype'), '⑤ ' + L('الاختبار', 'Test')]
      .map((t, k) => U.pill('dt' + k, 80 + k * 360, 180, t, ['t-pink', 't-violet', 't-amber', 't-blue', 't-green'][k])).join('')}
    ${U.box('em', 80, 290, 840, 't-pink', { ic: '🤝', h: L('① التعاطف', '① Empathize'), p: L('نحط نفسنا مكان المستخدم ونفهم تحدياته واحتياجاته', 'put yourself in the user’s position; understand challenges and needs') })}
    ${U.box('df', 1000, 290, 840, 't-violet', { ic: '🎯', h: L('② التعريف', '② Define'), p: L('من اللي فهمناه نوضّح المشكلة اللي هنحلّها', 'from what we learned, clarify the problem to solve') })}
    ${U.ch('ch-s', 100, 520, 'sm')}
    ${U.pill('sayx', 310, 590, '«' + L('زرار التسجيل تحت خالص!', 'The sign-up button is way down!') + '» 😕', 'solid')}
    ${U.pill('prob', 1000, 590, '📌 ' + L('المشكلة: الطالب مش لاقي «سجّل» على الموبايل', 'Problem: students can’t find "Sign up" on phones'), 't-violet')}
    ${U.box('id', 80, 290, 560, 't-amber', { ic: '💡', h: L('③ توليد الأفكار', '③ Ideate'), p: L('أفكار كتير للحل', 'many ideas for the solution') })}
    ${U.box('pt', 680, 290, 560, 't-blue', { ic: '🧪', h: L('④ النموذج الأولي', '④ Prototype'), p: L('نموذج سريع من الأفكار', 'a quick prototype from the ideas') })}
    ${U.box('ts', 1280, 290, 560, 't-green', { ic: '👥', h: L('⑤ الاختبار', '⑤ Test'), p: L('المستخدمين يجرّبوا وناخد ملاحظاتهم', 'users try it and we gather feedback') })}
    ${U.emo('ideas', 140, 520, 440, 64, '💡 💡 💡 💡')}
    ${U.pill('back', 680, 560, '↩️ ' + L('ممكن نرجع للتعاطف أو التعريف — رايح جاي', 'we may go back to empathize or define — back and forth'), 't-pink')}

    ${U.box('ba', 160, 210, 620, 't-red', { h: 'A', p: '🔴 ' + L('زرار «اشترِ» أحمر', 'a red "Buy" button') })}
    ${U.box('bb', 1140, 210, 620, 't-blue', { h: 'B', p: '🔵 ' + L('زرار «اشترِ» أزرق', 'a blue "Buy" button') })}
    ${U.emo('ua', 300, 380, 340, 60, '🧑 🧑 🧑')}${U.emo('ub', 1280, 380, 340, 60, '🧑 🧑 🧑')}
    ${U.pill('ca', 300, 480, '👆 120 ' + L('ضغطة', 'clicks'), 't-red')}
    ${U.pill('cb', 1280, 480, '👆 180 ' + L('ضغطة', 'clicks'), 't-blue')}
    ${U.pill('win', 620, 590, '🏆 ' + L('B أكتر فاعلية — بالبيانات مش بالذوق', 'B is more effective — by data, not taste'), 't-green')}
    ${U.box('r1', 120, 210, 820, 't-green', { ic: '1️⃣', h: L('عنصر واحد بس في المرة', 'Only one element at a time'), p: L('عشان نعرف أنهي تغيير عمل الأثر', 'so we know which change made the effect') })}
    ${U.box('r2', 980, 210, 820, 't-blue', { ic: '📊', h: L('بيانات كفاية قبل القرار', 'Enough data before deciding'), p: L('ماتحكمش من أول كام ضغطة', 'do not judge from the first few clicks') })}
    ${U.pill('bad', 120, 520, '❌ ' + L('لون + كلام + مكان مع بعض ← مش هتعرف مين السبب', 'color + text + position together → you cannot tell the cause'), 't-red')}

    ${U.hd(0, '🌱 ' + L('الموقع عمره ما بيخلص', 'A website is never finished'))}
    ${U.hd(1, 'P · ' + L('خطّط', 'Plan'))}
    ${U.hd(2, 'D · ' + L('نفّذ', 'Do'))}
    ${U.hd(3, 'C · ' + L('تحقّق', 'Check'))}
    ${U.hd(4, 'A · ' + L('تصرّف… والدورة تلف تاني', 'Act… and the loop turns again'))}
    ${U.hd(5, '🧠 ' + L('التفكير التصميمي ①②', 'Design thinking ①②'))}
    ${U.hd(6, '🧠 ' + L('التفكير التصميمي ③④⑤', 'Design thinking ③④⑤'))}
    ${U.hd(7, '🅰️🅱️ ' + L('اختبار A/B', 'A/B testing'))}
    ${U.hd(8, '🔑 ' + L('قواعد اختبار A/B', 'A/B testing rules'))}
    ${U.nt(4, '⚠️ ' + L('«PDCA بتخلص بعد تنفيذ واحد» ← غلط', '"PDCA is complete after one round" → false'), 'warn')}
    ${U.nt(5, L('اكتشاف المشاكل وتوليد الحلول من منظور المستخدم', 'Finding problems and solutions from the user’s perspective'), 'ok')}
  </div>
  <div id="i4-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة: حسّن في دواير', 'The point: improve in loops'))}
    ${U.pill('x0', 120, 200, '🔁 PDCA: ' + L('خطّط ← نفّذ ← تحقّق ← تصرّف ← وتاني (إزاي نكرّر)', 'Plan → Do → Check → Act → again (how to repeat)'), 't-blue')}
    ${U.pill('x1', 120, 310, '🧠 ' + L('التفكير التصميمي: تعاطف · تعريف · أفكار · نموذج · اختبار (نحسّن إيه)', 'Design thinking: empathize · define · ideate · prototype · test (what to improve)'), 't-violet')}
    ${U.pill('x2', 120, 420, '🅰️🅱️ A/B: ' + L('عنصر واحد + بيانات كفاية (أنهي خيار)', 'one element + enough data (which option)'), 't-green')}
  </div>`;
      },
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const node = (k) => M.board.querySelectorAll('#i4-ring .n' + k);
    const lit = (k, t) => { tl.fromTo(node(k), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.18, duration: 0.35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t); SND('pop', t); };

    /* 0 — never finished */
    let c = at(0);
    frame(0, c);
    IN(q('v1'), c + 0.4, 0.5, { y: 30 }); IN(q('v1l'), c + 1.0, 0.4, { y: 20 });
    IN(q('fb'), c + 1.8, 0.5, { x: 30 * sx }); SND('pop', c + 1.8);
    IN(q('pd'), c + 3.2, 0.5, { x: 40 * sx }); SND('ok', c + 3.2);

    /* 1 — Plan */
    c = at(1);
    frame(1, c);
    OUT(Q('v1 v1l fb pd'), c, 0.4);
    IN(q('ring'), c + 0.5, 0.6, { scale: 0.85 });
    lit(0, c + 1.4);
    IN(q('pl'), c + 1.8, 0.5, { x: 40 * sx });
    POP(q('goal'), c + 3.2, 0.45);

    /* 2 — Do */
    c = at(2);
    frame(2, c);
    OUT(Q('pl goal'), c, 0.3);
    lit(1, c + 0.5);
    IN(q('do'), c + 0.9, 0.5, { x: 40 * sx });
    IN(q('hp0'), c + 1.9, 0.5, { y: 30 }); IN(q('hpa'), c + 2.6, 0.3);
    POP(q('hp1'), c + 3.0, 0.5); SND('ok', c + 3.0);

    /* 3 — Check */
    c = at(3);
    frame(3, c);
    OUT(Q('do hp0 hp1 hpa'), c, 0.3);
    lit(2, c + 0.5);
    IN(q('ck'), c + 0.9, 0.5, { x: 40 * sx });
    POP(q('meas'), c + 2.4, 0.45); SND('bad', c + 2.4);

    /* 4 — Act, and the ring turns again */
    c = at(4);
    frame(4, c, 5.8);
    OUT(Q('ck meas'), c, 0.3);
    lit(3, c + 0.5);
    IN(q('ac'), c + 0.9, 0.5, { x: 40 * sx });
    tl.to(M.board.querySelectorAll('#i4-ring .spin'), { rotation: 360, svgOrigin: '280 280', duration: 2.0, ease: 'power1.inOut' }, c + 2.4); SND('whoosh', c + 2.4);
    IN(q('loop'), c + 3.2, 0.4, { y: 20 }); SND('ok', c + 3.2);

    /* 5 — design thinking ① ② */
    c = at(5);
    frame(5, c, 5.6);
    OUT(Q('ring ac loop'), c, 0.4);
    range(5).forEach((k) => IN(q('dt' + k), c + 0.5 + k * 0.2, 0.3, { y: -20 }));
    IN(q('em'), c + 1.8, 0.5, { y: 30 }); SND('pop', c + 1.8);
    IN(q('ch-s'), c + 2.2, 0.5, { x: -40 * sx }); IN(q('sayx'), c + 2.7, 0.4, { y: 14 });
    IN(q('df'), c + 3.6, 0.5, { y: 30 }); SND('pop', c + 3.6);
    IN(q('prob'), c + 4.4, 0.4, { y: 20 });

    /* 6 — design thinking ③ ④ ⑤ */
    c = at(6);
    frame(6, c);
    OUT(Q('em df ch-s sayx prob'), c, 0.4);
    IN(q('id'), c + 0.6, 0.5, { y: 30 }); IN(q('ideas'), c + 1.0, 0.4); SND('pop', c + 1.0);
    tl.fromTo(q('ideas'), { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, c + 1.4);
    IN(q('pt'), c + 2.2, 0.5, { y: 30 }); SND('pop', c + 2.2);
    IN(q('ts'), c + 3.2, 0.5, { y: 30 }); SND('pop', c + 3.2);
    IN(q('back'), c + 4.4, 0.4, { y: 20 }); SND('whoosh', c + 4.4);

    /* 7 — A/B test */
    c = at(7);
    frame(7, c);
    OUT(Q('dt0 dt1 dt2 dt3 dt4 id pt ts ideas back'), c, 0.4);
    IN(q('ba'), c + 0.6, 0.5, { x: -40 * sx }); IN(q('bb'), c + 0.9, 0.5, { x: 40 * sx });
    IN(q('ua'), c + 1.8, 0.4, { y: -30 }); IN(q('ub'), c + 1.8, 0.4, { y: -30 }); SND('pop', c + 1.8);
    POP(q('ca'), c + 3.0, 0.4); POP(q('cb'), c + 3.4, 0.4); SND('pop', c + 3.4);
    POP(q('win'), c + 4.4, 0.5); SND('ok', c + 4.4);

    /* 8 — A/B rules */
    c = at(8);
    frame(8, c);
    OUT(Q('ba bb ua ub ca cb win'), c, 0.4);
    IN(q('r1'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('r2'), c + 1.8, 0.5, { y: 30 }); SND('pop', c + 1.8);
    IN(q('bad'), c + 3.2, 0.4, { y: 20 }); SND('bad', c + 3.2);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops: the PDCA ring keeps turning */
    const beat = (k) => () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(node(k), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.15, duration: 0.8, ease: 'sine.inOut' });
    M.loop(0, 4.2, () => M.cycle(Q('v1 fb pd'), 'rgba(248,113,113,.8)', 0.6));
    M.loop(1, 4.0, beat(0)); M.loop(2, 4.0, beat(1)); M.loop(3, 3.4, beat(2));
    M.loop(2, 4.0, () => M.breathe(q('hp1'), 1.05, 1.1));
    M.loop(4, 5.0, () => gsap.timeline({ repeat: -1 }).to(M.board.querySelectorAll('#i4-ring .spin'), { rotation: '+=360', svgOrigin: '280 280', duration: 8, ease: 'none' }));
    M.loop(4, 5.0, () => { const x = gsap.timeline({ repeat: -1 }); [0, 1, 2, 3].forEach((k) => x.fromTo(node(k), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.18, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, k * 1.0)); return x; });
    M.loop(5, 5.4, () => M.cycle(Q('dt0 dt1 dt2 dt3 dt4'), 'rgba(248,113,113,.8)', 0.45));
    M.loop(6, 5.0, () => M.breathe(q('ideas'), 1.12, 0.9));
    M.loop(6, 5.0, () => M.cycle(Q('id pt ts'), 'rgba(248,113,113,.8)', 0.6));
    M.loop(7, 5.2, () => M.bob(Q('ua ub'), 6, 1.0));
    M.loop(7, 5.2, () => M.breathe(q('win'), 1.1, 0.9));
    M.loop(8, 4.0, () => M.cycle(Q('r1 r2'), 'rgba(52,211,153,.8)', 0.7));
    return M.done();
  });
})();

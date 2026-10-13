/* =========================================================
 * anims/movies-4-2.js — lesson 4-2 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   designMovie : start from the user · persona · wireframe · why the
 *                 wireframe comes first · contrast · repetition · alignment ·
 *                 proximity (before → after) · user-centered design
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const PAGE = '<rect x="4" y="4" width="512" height="412" rx="18" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>';
  const LINES = (x, y, n, w) => range(n).map((k) => `<rect x="${x}" y="${y + k * 34}" width="${w - (k % 2) * 60}" height="18" rx="9" fill="#cbd5e1"/>`).join('');

  K.defineAnim('designMovie', (stage, props, api) => {
    const U = MK.uiL('d2-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l42', prefix: 'd2-', beats: 10, cast: { 'ch-d': 'engineer', 'ch-p': 'applicant', 'ch-u': 'studentL' },
      html: (L) => {
        const MESS = `${PAGE}<rect x="60" y="40" width="200" height="40" rx="6" fill="#f472b6" transform="rotate(-6 160 60)"/><rect x="300" y="90" width="170" height="110" rx="6" fill="#38bdf8" transform="rotate(8 385 145)"/>
          <rect x="40" y="170" width="140" height="30" rx="6" fill="#fbbf24"/><rect x="220" y="250" width="240" height="26" rx="6" fill="#a78bfa" transform="rotate(-10 340 263)"/>
          <rect x="70" y="320" width="120" height="50" rx="25" fill="#34d399"/><rect x="330" y="330" width="150" height="30" rx="6" fill="#f87171" transform="rotate(12 405 345)"/><text x="400" y="60" font-size="44">❓</text><text x="120" y="290" font-size="44">❓</text>`;
        const WF = `<rect x="4" y="4" width="752" height="512" rx="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
          <rect x="30" y="28" width="700" height="70" rx="8" fill="#94a3b8"/><rect x="30" y="122" width="330" height="220" rx="8" fill="#94a3b8"/>
          ${range(5).map((k) => `<rect x="390" y="${130 + k * 44}" width="${330 - (k % 2) * 80}" height="22" rx="11" fill="#94a3b8"/>`).join('')}
          <rect x="30" y="370" width="700" height="60" rx="8" fill="#94a3b8"/><rect x="540" y="450" width="190" height="48" rx="24" fill="#94a3b8"/>
          ${[[60, 72, 1], [70, 238, 2], [420, 118, 3], [580, 482, 4]].map(([x, y, n]) => `<g class="pri"><circle cx="${x}" cy="${y}" r="22" fill="#0f172a"/><text x="${x}" y="${y + 10}" text-anchor="middle" font-size="28" font-weight="900" fill="#fff">${n}</text></g>`).join('')}
          <g class="col" opacity="0"><rect x="30" y="28" width="700" height="70" rx="8" fill="#10b981"/><rect x="30" y="122" width="330" height="220" rx="8" fill="#38bdf8"/>
            ${range(5).map((k) => `<rect x="390" y="${130 + k * 44}" width="${330 - (k % 2) * 80}" height="22" rx="11" fill="#475569"/>`).join('')}
            <rect x="30" y="370" width="700" height="60" rx="8" fill="#fde68a"/><rect x="540" y="450" width="190" height="48" rx="24" fill="#f97316"/></g>`;
        const pair = (bef, aft) => [bef, aft];
        const C = pair(`${PAGE}<text x="40" y="70" font-size="26" fill="#64748b">${L('سماعات لاسلكية', 'Wireless headphones')}</text>${LINES(40, 100, 5, 420)}<rect x="40" y="300" width="160" height="56" rx="10" fill="#cbd5e1"/><text x="120" y="336" text-anchor="middle" font-size="26" fill="#64748b">${L('اشترِ', 'Buy')}</text>`,
          `${PAGE}<text x="40" y="78" font-size="48" font-weight="900" fill="#0f172a">${L('سماعات لاسلكية', 'Wireless headphones')}</text>${LINES(40, 110, 5, 420)}<rect x="40" y="296" width="220" height="70" rx="35" fill="#f97316"/><text x="150" y="342" text-anchor="middle" font-size="34" font-weight="900" fill="#fff">🛒 ${L('اشترِ', 'Buy')}</text>`);
        const R = pair(`${range(3).map((k) => `<rect x="${10 + k * 170}" y="20" width="150" height="380" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/><rect x="${24 + k * 170}" y="40" width="${[110, 80, 120][k]}" height="${[20, 40, 14][k]}" rx="4" fill="${['#ef4444', '#22c55e', '#3b82f6'][k]}"/>${LINES(24 + k * 170, 110, 5, 120)}`).join('')}`,
          `${range(3).map((k) => `<rect x="${10 + k * 170}" y="20" width="150" height="380" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="3"/><rect x="${24 + k * 170}" y="40" width="110" height="30" rx="6" fill="#db2777"/>${LINES(24 + k * 170, 110, 5, 120)}`).join('')}`);
        const A = pair(`${PAGE}${[[40, 40, 300], [110, 110, 260], [60, 180, 340], [140, 250, 220], [80, 320, 280]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="44" rx="8" fill="#a78bfa"/>`).join('')}`,
          `${PAGE}<path d="M48 24 V396" stroke="#ef4444" stroke-width="4" stroke-dasharray="10 8"/>${[[40, 300], [110, 260], [180, 340], [250, 220], [320, 280]].map(([y, w]) => `<rect x="60" y="${y}" width="${w}" height="44" rx="8" fill="#a78bfa"/>`).join('')}`);
        const P = pair(`${PAGE}<rect x="40" y="40" width="170" height="130" rx="12" fill="#38bdf8"/><text x="125" y="122" text-anchor="middle" font-size="60">🎧</text>
            <text x="320" y="300" font-size="30" font-weight="800" fill="#0f172a">${L('سماعة', 'Headset')}</text><text x="60" y="380" font-size="30" font-weight="900" fill="#ea580c">500 ${L('ج', 'EGP')}</text>
            <rect x="300" y="60" width="170" height="130" rx="12" fill="#a78bfa"/><text x="385" y="142" text-anchor="middle" font-size="60">📱</text><text x="250" y="230" font-size="30" font-weight="900" fill="#ea580c">900 ${L('ج', 'EGP')}</text><text x="40" y="250" font-size="30" font-weight="800" fill="#0f172a">${L('موبايل', 'Phone')}</text>`,
          `${PAGE}${[[30, '🎧', '#38bdf8', L('سماعة', 'Headset'), 500], [280, '📱', '#a78bfa', L('موبايل', 'Phone'), 900]].map(([x, e, col, n, p]) => `<rect x="${x}" y="40" width="210" height="330" rx="16" fill="#fff" stroke="#cbd5e1" stroke-width="3"/>
            <rect x="${x + 20}" y="60" width="170" height="130" rx="12" fill="${col}"/><text x="${x + 105}" y="142" text-anchor="middle" font-size="60">${e}</text>
            <text x="${x + 105}" y="240" text-anchor="middle" font-size="30" font-weight="800" fill="#0f172a">${n}</text><text x="${x + 105}" y="290" text-anchor="middle" font-size="32" font-weight="900" fill="#ea580c">${p} ${L('ج', 'EGP')}</text>`).join('')}`);
        const pairs = [['c', C, 't-amber', '🔆', L('① التباين', '① Contrast'), L('يبرز الأهم ويوضّح الأولوية فورًا', 'highlights the most important at once'), L('عنوان كبير غامق · زرار بلون مميّز', 'large bold heading · accent button')],
          ['r', R, 't-pink', '🔁', L('② التكرار', '② Repetition'), L('نفس الخصائص ← تصميم متّسق', 'same features → a consistent design'), L('نفس خط ولون العناوين في كل صفحة', 'same heading font and color on every page')],
          ['a', A, 't-violet', '📏', L('③ المحاذاة', '③ Alignment'), L('كل عنصر على خط أساس مشترك', 'every element on a common baseline'), L('حواف النص والصور على خط واحد', 'text and image edges on one line')],
          ['p', P, 't-green', '🧲', L('④ التقارب', '④ Proximity'), L('المرتبط قريب ← مجموعة واحدة', 'related items close → one group'), L('الصورة والاسم والسعر مع بعض + مسافات', 'image, name, price together + spacing')]];
        return `
  <div id="d2-stage" class="mv-stage">
    ${U.ch('ch-d', 80, 420, 'md')}
    ${U.pill('dsay', 60, 300, '😎 ' + L('المصمّم: «واضح جدًا!»', 'Designer: "Crystal clear!"'), 'solid')}
    ${U.art('mess', 560, 190, 520, 420, '0 0 520 420', MESS)}
    ${U.emo('lost', 1180, 300, 560, 80, '😵 🤔 😵')}
    ${U.pill('lostp', 1180, 440, L('الزوّار تايهين!', 'Visitors are lost!'), 't-red')}
    ${U.pill('fix', 560, 650, '✅ ' + L('نبدأ من المستخدم… مش من المصمّم', 'Start from the user… not the designer'), 't-green')}

    ${U.ch('ch-p', 90, 400, 'md')}
    ${U.box('pc', 380, 180, 720, 't-blue', { ic: '🪪', h: L('شخصية المستخدم (Persona)', 'Persona'), p: L('موظف في التلاتينات · عايز يقارن منتجات من الموبايل في المواصلات', 'office worker in his 30s · compares products on his phone while commuting'), s: L('عايز المعلومة في وقت قصير', 'wants the information quickly') })}
    ${[['🎂', L('العمر', 'age')], ['💼', L('المهنة', 'occupation')], ['🎯', L('الهدف', 'purpose')], ['😓', L('التحديات', 'challenges')]].map(([e, t], k) => U.pill('f' + k, 1180, 190 + k * 90, e + ' ' + t, 't-slate')).join('')}
    ${U.pill('pb', 380, 560, '🧭 ' + L('«المستخدم ده محتاج إيه؟» ← التصميم مايتوهش', '"What does this user need?" → the design does not drift'), 't-green')}

    ${U.art('wf', 100, 170, 760, 520, '0 0 760 520', WF)}
    ${U.box('wfb', 980, 190, 860, 't-slate', { ic: '🔲', h: L('الإطار السلكي (Wireframe)', 'Wireframe'), p: L('مخطّط من غير ألوان ولا زخرفة', 'a blueprint with no color or decoration'), s: L('يحدّد مكان المعلومات وأولويتها (1، 2، 3…)', 'fixes placement and priority (1, 2, 3…)') })}
    ${U.pill('grow', 980, 520, '➡️ ' + L('وبعدين بيكبر لتصميم نهائي', 'later it grows into a final design'), 't-blue')}
    ${U.pill('taste', 980, 200, '🎨 ' + L('«أنا بحب الأزرق!» «لأ، الأخضر!» ← مابيخلصش', '"I like blue!" "No, green!" → never ends'), 't-red')}
    ${U.pill('prio', 980, 310, '📐 ' + L('«السعر فوق، الوصف تحته» ← اتفاق', '"Price on top, description below" → agreement'), 't-green')}
    ${U.box('stk', 980, 420, 860, 't-green', { h: '🤝 ' + L('أصحاب المصلحة يتفقوا أسهل', 'Stakeholders agree more easily'), p: L('النقاش على احتياج المستخدم مش على الذوق', 'the discussion is about user needs, not taste') })}

    ${pairs.map(([k, [bef, aft], th, ic, h, p, s]) => U.art('b' + k, 80, 200, 520, 420, '0 0 520 420', bef) + U.art('f' + k, 700, 200, 520, 420, '0 0 520 420', aft)
      + U.box('x' + k, 1300, 210, 540, th, { ic, h, p, s })).join('')}
    ${U.emo('arr', 600, 360, 100, 64, MK.RTL() ? '⬅️' : '➡️')}
    ${U.pill('bl', 230, 640, L('قبل', 'Before'), 't-red')}${U.pill('al', 880, 640, L('بعد', 'After'), 't-green')}

    ${U.box('u1', 90, 190, 600, 't-blue', { ic: '🧭', h: L('التصميم المتمحور حول المستخدم (UCD)', 'User-centered design (UCD)'), p: L('من منظور المستخدم… مش راحة المصمّم', 'the user’s perspective… not the creator’s convenience') })}
    ${U.pill('u2', 90, 470, '❓ ' + L('المستخدم محتاج إيه؟', 'What does the user need?'), 't-slate')}
    ${U.pill('u3', 90, 550, '📍 ' + L('هيستخدمه في أنهي موقف؟', 'In what situation?'), 't-slate')}
    ${U.pill('u4', 90, 630, '🪪 ' + L('الشخصية = طريقة لتطبيقه', 'A persona is one way to practice it'), 't-slate')}
    ${U.ch('ch-u', 860, 330, 'md')}
    ${U.emo('loop', 900, 196, 140, 76, '🔄')}
    ${U.box('g1', 1290, 200, 560, 't-green', { ic: '👍', h: L('قابلية الاستخدام', 'Usability'), p: L('سهل في الاستخدام', 'easy to use') })}
    ${U.box('g2', 1290, 440, 560, 't-violet', { ic: '♿', h: L('إمكانية الوصول', 'Accessibility'), p: L('ينفع لفئات واسعة', 'usable by a wide range of people') })}

    ${U.hd(0, '🤔 ' + L('واضح للمصمّم… ومُلخبط للزوّار', 'Clear to the designer… confusing to visitors'))}
    ${U.hd(1, '🪪 ' + L('شخصية المستخدم', 'Persona'))}
    ${U.hd(2, '🔲 ' + L('الإطار السلكي', 'Wireframe'))}
    ${U.hd(3, '💬 ' + L('ليه الإطار السلكي قبل الألوان؟', 'Why the wireframe before colors?'))}
    ${U.hd(4, '🔆 ' + L('التباين', 'Contrast'))}
    ${U.hd(5, '🔁 ' + L('التكرار', 'Repetition'))}
    ${U.hd(6, '📏 ' + L('المحاذاة', 'Alignment'))}
    ${U.hd(7, '🧲 ' + L('التقارب', 'Proximity'))}
    ${U.hd(8, '🧭 ' + L('التصميم المتمحور حول المستخدم', 'User-centered design'))}
    ${U.nt(3, '⚠️ ' + L('الإطار السلكي مش تصميم نهائي ومافيهوش ألوان', 'A wireframe is not a final design and has no colors'), 'warn')}
  </div>
  <div id="d2-recap" class="mv-recap">
    ${U.hd(9, '💡 ' + L('الخلاصة: من المستخدم للداخل', 'The point: from the user inward'))}
    ${U.pill('y0', 120, 200, '🪪 ' + L('شخصية = مين', 'Persona = who'), 't-blue')}
    ${U.pill('y1', 120, 300, '🔲 ' + L('إطار سلكي = فين (من غير لون)', 'Wireframe = where (no color)'), 't-slate')}
    ${U.pill('y2', 120, 400, '✨ CRAP: ' + L('تباين يبرز · تكرار يوحّد · محاذاة تنظّم · تقارب يجمّع', 'contrast highlights · repetition unifies · alignment orders · proximity groups'), 't-amber')}
    ${U.pill('y3', 120, 500, '🧭 UCD = ' + L('قرّر للمستخدم (قابلية استخدام + إمكانية وصول)', 'decide for the user (usability + accessibility)'), 't-green')}
  </div>`;
      },
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#d2-' + id + ' .' + c);

    /* 0 — clear to the designer, confusing to visitors */
    let c = at(0);
    frame(0, c);
    IN(q('ch-d'), c + 0.3, 0.6, { x: -60 * sx }); IN(q('dsay'), c + 0.9, 0.4, { y: 14 }); SND('pop', c + 0.9);
    IN(q('mess'), c + 1.6, 0.5, { y: 30 });
    IN(q('lost'), c + 2.6, 0.5, { x: 30 * sx }); IN(q('lostp'), c + 3.0, 0.4); SND('bad', c + 3.0);
    POP(q('fix'), c + 4.4, 0.5); SND('ok', c + 4.4);

    /* 1 — persona */
    c = at(1);
    frame(1, c);
    OUT(Q('ch-d dsay mess lost lostp fix'), c, 0.4);
    IN(q('ch-p'), c + 0.5, 0.6, { x: -60 * sx });
    IN(q('pc'), c + 1.2, 0.5, { y: 30 }); SND('pop', c + 1.2);
    range(4).forEach((k) => { IN(q('f' + k), c + 2.4 + k * 0.5, 0.4, { x: 30 * sx }); SND('pop', c + 2.4 + k * 0.5); });
    IN(q('pb'), c + 4.8, 0.4, { y: 20 }); SND('ok', c + 4.8);

    /* 2 — wireframe */
    c = at(2);
    frame(2, c);
    OUT(Q('ch-p pc f0 f1 f2 f3 pb'), c, 0.4);
    IN(q('wf'), c + 0.6, 0.5, { y: 30 });
    tl.fromTo(sel('wf', 'pri'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.35, ease: 'back.out(2)' }, c + 1.4);
    IN(q('wfb'), c + 2.6, 0.5, { x: 40 * sx }); SND('ok', c + 2.6);
    tl.to(sel('wf', 'col'), { opacity: 1, duration: 1.0 }, c + 4.4); IN(q('grow'), c + 4.4, 0.4, { y: 20 });

    /* 3 — why the wireframe comes first */
    c = at(3);
    frame(3, c, 5.4);
    OUT(Q('wfb grow'), c, 0.3);
    tl.to(sel('wf', 'col'), { opacity: 0, duration: 0.5 }, c);
    IN(q('taste'), c + 0.8, 0.4, { x: 30 * sx }); SND('bad', c + 0.8);
    IN(q('prio'), c + 2.2, 0.4, { x: 30 * sx }); SND('ok', c + 2.2);
    IN(q('stk'), c + 3.6, 0.5, { y: 20 });

    /* 4–7 — CRAP: before → after */
    ['c', 'r', 'a', 'p'].forEach((k, i) => {
      c = at(4 + i);
      frame(4 + i, c);
      if (i === 0) { OUT(Q('wf taste prio stk'), c, 0.4); IN(Q('arr bl al'), c + 1.6, 0.3); }
      else OUT(Q(`b${'crap'[i - 1]} f${'crap'[i - 1]} x${'crap'[i - 1]}`), c, 0.3);
      IN(q('b' + k), c + 0.6, 0.5, { y: 30 }); SND('bad', c + 0.9);
      PULSE(q('arr'), c + 2.0, 'rgba(251,191,36,.8)', 1);
      POP(q('f' + k), c + 2.4, 0.6); SND('ok', c + 2.6);
      IN(q('x' + k), c + 3.6, 0.5, { x: 40 * sx });
    });

    /* 8 — user-centered design */
    c = at(8);
    frame(8, c);
    OUT(Q('bp fp xp arr bl al'), c, 0.4);
    IN(q('u1'), c + 0.5, 0.5, { y: 30 });
    IN(q('ch-u'), c + 1.0, 0.5, { y: 30 }); POP(q('loop'), c + 1.4, 0.5);
    tl.to(q('loop'), { rotation: 360, duration: 2.4, ease: 'none', transformOrigin: '50% 50%' }, c + 1.6);
    Q('u2 u3 u4').forEach((u, i) => { IN(u, c + 2.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 2.0 + i * 0.6); });
    IN(q('g1'), c + 4.2, 0.5, { x: 40 * sx }); IN(q('g2'), c + 4.8, 0.5, { x: 40 * sx }); SND('ok', c + 4.8);

    /* 9 — recap */
    c = at(9);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd9'), c + 0.6, 0.5, { y: -30 });
    Q('y0 y1 y2 y3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops */
    M.loop(0, 5.2, () => M.breathe(q('fix'), 1.08, 1.0));
    M.loop(1, 5.4, () => M.cycle(Q('f0 f1 f2 f3'), 'rgba(52,211,153,.85)', 0.45));
    M.loop(2, 5.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(sel('wf', 'col'), { opacity: 1 }, { opacity: 0.25, duration: 1.4, ease: 'sine.inOut' }));
    M.loop(3, 4.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(sel('wf', 'pri'), { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.08, duration: 0.35, stagger: 0.35, yoyo: true, repeat: 1 }));
    ['c', 'r', 'a', 'p'].forEach((k, i) => M.loop(4 + i, 4.4, () => gsap.timeline({ repeat: -1, repeatDelay: 1.0 })
      .fromTo(q('b' + k), { opacity: 1 }, { opacity: 0.5, duration: 0.5 }).to(q('arr'), { boxShadow: '0 0 30px rgba(251,191,36,.8)', duration: 0.3, yoyo: true, repeat: 1 }, '<')
      .fromTo(q('f' + k), { scale: 1 }, { scale: 1.05, duration: 0.4, yoyo: true, repeat: 1, transformOrigin: '50% 50%' })
      .to(q('b' + k), { opacity: 1, duration: 0.5 })));
    M.loop(8, 5.4, () => gsap.timeline({ repeat: -1 }).to(q('loop'), { rotation: '+=360', duration: 4, ease: 'none', transformOrigin: '50% 50%' }));
    return M.done();
  });
})();

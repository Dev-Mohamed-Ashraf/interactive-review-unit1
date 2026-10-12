/* =========================================================
 * anims/movies-1-1.js — lesson 1-1 teacher-driven movies (shell:
 * movie-kit.js; same pattern as httpsMovie: each beat plays, then FREEZES).
 *   eraMovie     (station history)  : a student's day → the five stages of IT
 *   mooreMovie   (station moore)    : chip → transistor → doubling → limits → solutions
 *   societyMovie (station social)   : five social changes + emerging technologies
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  /* ── device drawings (viewBox 560×440) ── */
  const ART_ENIAC = `<rect x="10" y="404" width="540" height="12" rx="6" fill="#334155"/>
    ${range(4).map((i) => `<rect x="${22 + i * 133}" y="70" width="118" height="330" rx="10" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      ${range(18).map((k) => `<circle class="tube" cx="${48 + i * 133 + (k % 3) * 33}" cy="${110 + Math.floor(k / 3) * 48}" r="11" fill="#fbbf24"/>`).join('')}`).join('')}
    <path d="M140 380 q20 30 40 0 t40 0 M273 380 q20 30 40 0 t40 0 M406 380 q20 30 40 0" fill="none" stroke="#f97316" stroke-width="5"/>`;
  const ART_PC = `<rect x="20" y="380" width="520" height="22" rx="8" fill="#92400e"/>
    <rect x="120" y="70" width="280" height="220" rx="22" fill="#e2e8f0"/><rect x="142" y="92" width="236" height="170" rx="10" fill="#0f172a"/>
    ${range(5).map((k) => `<rect class="ln" x="160" y="${110 + k * 28}" width="${[170, 120, 190, 90, 150][k]}" height="10" rx="5" fill="#34d399"/>`).join('')}
    <rect x="230" y="290" width="60" height="40" fill="#94a3b8"/><rect x="110" y="330" width="300" height="44" rx="10" fill="#cbd5e1"/>
    <rect x="430" y="150" width="90" height="226" rx="10" fill="#cbd5e1"/><circle cx="475" cy="190" r="10" fill="#38bdf8"/>`;
  const ART_NET = `<circle cx="280" cy="220" r="175" fill="#1e3a8a" stroke="#38bdf8" stroke-width="6"/>
    <ellipse cx="280" cy="220" rx="80" ry="175" fill="none" stroke="#7dd3fc" stroke-width="4" opacity=".7"/>
    <path d="M105 220 H455 M128 135 H432 M128 305 H432" stroke="#7dd3fc" stroke-width="4" opacity=".7"/>
    ${[[170, 120], [400, 160], [220, 330], [380, 300], [290, 70]].map(([x, y], k) => `<g class="env" transform="translate(${x - 34} ${y - 22})"><rect width="68" height="44" rx="6" fill="#fef3c7"/><path d="M0 4 L34 26 L68 4" fill="none" stroke="#b45309" stroke-width="4"/></g>`).join('')}`;
  const ART_PHONE = `<rect x="190" y="14" width="180" height="400" rx="30" fill="#0f172a" stroke="#94a3b8" stroke-width="6"/>
    <rect x="206" y="58" width="148" height="310" rx="10" fill="#1e293b"/>
    ${range(12).map((k) => `<rect class="app" x="${222 + (k % 3) * 44}" y="${76 + Math.floor(k / 3) * 70}" width="32" height="32" rx="8" fill="${['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#f87171'][k % 6]}"/>`).join('')}
    <g fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"><path class="wv" d="M420 120 a40 40 0 0 1 0 60"/><path class="wv" d="M445 95 a75 75 0 0 1 0 110"/><path class="wv" d="M470 70 a110 110 0 0 1 0 160"/></g>`;
  const ART_CLOUD = `<path d="M150 170 a70 70 0 0 1 40 -120 a90 90 0 0 1 170 10 a70 70 0 0 1 60 110 Z" fill="#e0f2fe"/>
    ${[110, 240, 370].map((x) => `<g><rect x="${x}" y="260" width="80" height="150" rx="10" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      ${range(3).map((k) => `<rect x="${x + 12}" y="${276 + k * 42}" width="56" height="28" rx="5" fill="#0f172a"/><circle class="led" cx="${x + 24}" cy="${290 + k * 42}" r="5" fill="#34d399"/>`).join('')}
      <path class="up" d="M${x + 40} 250 V190" stroke="#38bdf8" stroke-width="5" stroke-dasharray="10 8"/></g>`).join('')}`;

  /* ═════════════════════════ eraMovie ═════════════════════════ */
  K.defineAnim('eraMovie', (stage, props, api) => {
    const U = MK.ui('er-');
    const rtl = MK.RTL();
    const ERAS = [
      ['1940s', 'ميلاد الحاسب', 'Computer'], ['1970s', 'الحاسب الشخصي', 'PC'], ['1990s', 'الإنترنت', 'Internet'],
      ['2000s', 'الهاتف الذكي', 'Smartphone'], ['2010s', 'السحابة', 'Cloud'],
    ];
    const chipX = (k) => 182 + (rtl ? 4 - k : k) * 314;
    const recX = (k) => 91 + (rtl ? 4 - k : k) * 352;
    const M = MK.create(stage, api, {
      cls: 'mv-era mv-l11', prefix: 'er-', beats: 7, cast: { 'ch-st': 'student' },
      html: (L) => `
  <div id="er-stage" class="mv-stage">
    ${ERAS.map((e, k) => `<div id="er-c${k + 1}" class="tchip later" ${MK.S(chipX(k), 122, 300)}><bdi>${e[0]}</bdi> · ${L(e[1], e[2])}</div>`).join('')}
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.box('a1', 470, 230, 690, 't-blue', { ic: '💬', h: L('شبكات التواصل', 'Social networks'), p: L('رسايله بتوصل لآلاف في ثانية', 'his messages reach thousands in a second') })}
    ${U.box('a2', 1190, 230, 690, 't-green', { ic: '💳', h: L('دفع من غير كاش', 'Cashless payment'), p: L('بيدفع فطاره بالموبايل', 'pays for breakfast by phone') })}
    ${U.box('a3', 470, 460, 690, 't-violet', { ic: '🎓', h: L('حصة أونلاين', 'Online lesson'), p: L('بيحضر الحصة من البيت', 'attends class from home') })}
    ${U.box('a4', 1190, 460, 690, 't-amber', { ic: '📦', h: L('طلب أونلاين', 'Online order'), p: L('الكتاب بيتشحن لحد البيت', 'the book ships to his door') })}
    ${U.art('d1', 470, 220, 560, 440, '0 0 560 440', ART_ENIAC)}
    ${U.art('d2', 470, 220, 560, 440, '0 0 560 440', ART_PC)}
    ${U.art('d3', 470, 220, 560, 440, '0 0 560 440', ART_NET)}
    ${U.art('d4', 470, 220, 560, 440, '0 0 560 440', ART_PHONE)}
    ${U.art('d5', 470, 220, 560, 440, '0 0 560 440', ART_CLOUD)}
    ${U.box('i1', 1080, 250, 800, 't-amber', { ic: '🏭', y: '1940s – 1960s', h: L('ميلاد الحاسب (ENIAC)', 'Birth of the computer (ENIAC)'), p: L('صمامات مفرغة · بيملا أوضة كاملة · حوالي 30 طن', 'vacuum tubes · fills a whole room · about 30 tonnes'), s: L('الاستخدام: عسكري وعلمي بس', 'used for military and science only') })}
    ${U.box('i2', 1080, 250, 800, 't-blue', { ic: '🖥️', y: '1970s – 1980s', h: L('الحواسب الشخصية (PC)', 'Personal computers (PCs)'), p: L('الحاسب بقى على المكتب وفي البيت', 'the computer moves onto desks and into homes'), s: L('لأول مرة الأفراد بيستخدموا الحاسب', 'for the first time individuals use computers') })}
    ${U.box('i3', 1080, 250, 800, 't-violet', { ic: '🌐', y: '1990s', h: L('الإنترنت تجاريًا + الويب', 'Commercial Internet + the Web'), p: L('البريد الإلكتروني انتشر', 'email spreads'), s: L('عولمة المعلومات', 'globalization of information') })}
    ${U.box('i4', 1080, 250, 800, 't-green', { ic: '📱', y: '2000s', h: L('الهواتف الذكية', 'Smartphones'), p: L('الإنترنت بقى في جيبك', 'the Internet in your pocket'), s: L('انتشار سريع وواسع لإنترنت الموبايل', 'explosive spread of mobile Internet') })}
    ${U.box('i5', 1080, 250, 800, 't-blue', { ic: '☁️', y: '2010s +', h: L('الحوسبة السحابية', 'Cloud computing'), p: L('تخزين ومعالجة وبرامج كخدمة عبر الإنترنت', 'storage, processing, software as a service online'), s: L('بيانات ضخمة + ذكاء اصطناعي + «IT كخدمة»', 'big data + AI + “IT as a service”') })}
    ${U.bub('b0', 30, 505, 400, L('رسايل · دفع · حصة · طلب… كله تكنولوجيا!', 'Messages · payment · class · orders… all tech!') + ' 😃')}
    ${U.bub('b1', 30, 505, 400, L('ده كان بيملا أوضة كاملة؟!', 'That filled a whole room?!') + ' 😮')}
    ${U.bub('b2', 30, 505, 400, L('أخيرًا كمبيوتر في البيت!', 'Finally, a computer at home!') + ' 🏠')}
    ${U.bub('b3', 30, 505, 400, L('إيميل يوصل آخر الدنيا في ثانية', 'An email crosses the world in a second') + ' 🌍')}
    ${U.bub('b4', 30, 505, 400, L('الإنترنت بقى في جيبي', 'The Internet is in my pocket') + ' 📱')}
    ${U.bub('b5', 30, 505, 400, L('صوري متخزّنة على سيرفر في مركز بيانات', 'My photos live on a server in a data centre') + ' ☁️')}
    ${U.hd(0, '📅 ' + L('يوم في حياة طالب… كله تكنولوجيا', 'A student’s day… all technology'))}
    ${U.hd(1, '① ' + L('الأربعينيات–الستينيات: ميلاد الحاسب', '1940s–60s: birth of the computer'))}
    ${U.hd(2, '② ' + L('السبعينيات–الثمانينيات: الحواسب الشخصية', '1970s–80s: personal computers'))}
    ${U.hd(3, '③ ' + L('التسعينيات: الإنترنت تجاريًا + الويب', '1990s: commercial Internet + the Web'))}
    ${U.hd(4, '④ ' + L('الألفينات: الهواتف الذكية', '2000s: smartphones'))}
    ${U.hd(5, '⑤ ' + L('من 2010 فصاعدًا: الحوسبة السحابية', '2010s onward: cloud computing'))}
    ${U.nt(0, L('من 20 سنة أغلب ده ماكانش موجود! — تعالوا نرجع بالزمن', 'Twenty years ago most of this did not exist! — let’s travel back'), 'warn')}
    ${U.nt(1, L('مافيش كيبورد ولا شاشة: كان بيتبرمج بالأسلاك والمفاتيح', 'No keyboard, no screen: programmed with cables and switches'))}
    ${U.nt(2, L('الحاسب نزل من المعامل… للبيوت والمكاتب', 'The computer leaves the labs… for homes and offices'))}
    ${U.nt(3, L('المعلومة بقت توصل لأي حد في العالم', 'Information now reaches anyone in the world'))}
    ${U.nt(4, L('الأجهزة بتصغر وبتقرّب من الإنسان: من أوضة… لجيبك', 'Devices shrink and come closer: from a room… to your pocket'))}
    ${U.nt(5, L('السحابة = أجهزة حقيقية في مراكز بيانات — وإنت بتستأجر جزء منها', 'The cloud = real machines in data centres — you rent a part of them'))}
  </div>
  <div id="er-recap" class="mv-recap">
    ${U.hd(6, '💡 ' + L('الخلاصة: خمس مراحل غيّرت العالم', 'The point: five stages that changed the world'))}
    ${[['🏭', '1940s', L('ميلاد الحاسب', 'Computer'), L('عسكري وعلمي', 'military & science'), 't-amber'], ['🖥️', '1970s', L('الحاسب الشخصي', 'PCs'), L('الأفراد يستخدموه', 'used by individuals'), 't-blue'],
      ['🌐', '1990s', L('الإنترنت', 'Internet'), L('عولمة المعلومات', 'global information'), 't-violet'], ['📱', '2000s', L('الهاتف الذكي', 'Smartphone'), L('إنترنت الموبايل', 'mobile Internet'), 't-green'],
      ['☁️', '2010s', L('السحابة', 'Cloud'), L('IT كخدمة', 'IT as a service'), 't-blue']]
      .map(([ic, y, h, p, th], k) => U.box('r' + (k + 1), recX(k), 220, 330, th, { ic, y, h, p })).join('')}
    ${U.rp('rp1', 560, '🔁 ' + L('كل مرحلة = تقنية جديدة + تغيير في التواصل والشغل والتجارة', 'Each stage = a new technology + a change in how we communicate, work and trade'), 't-green')}
    ${U.rp('rp2', 680, '⏳ ' + L('الترتيب: حاسب ← PC ← إنترنت ← موبايل ← سحابة', 'Order: computer → PC → Internet → smartphone → cloud'), 't-violet')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const sub = (sel) => M.board.querySelectorAll(sel);
    const ACT = { backgroundColor: '#38bdf8', borderColor: '#bae6fd', color: '#0b1222' };
    const DONE = { backgroundColor: 'rgba(52,211,153,.18)', borderColor: '#34d399', color: '#a7f3d0' };

    /* 0 — a student's day */
    let c = at(0);
    frame(0, c, 5.4);
    IN(q('ch-st'), c + 0.4, 0.6, { x: -80 });
    Q('a1 a2 a3 a4').forEach((a, i) => { POP(a, c + 1.0 + i * 0.7, 0.5); SND('pop', c + 1.0 + i * 0.7); });
    IN(q('b0'), c + 4.0, 0.4, { y: 14 });

    /* 1..5 — the five stages */
    const anim = [
      (t) => tl.fromTo(sub('#er-d1 .tube'), { opacity: 0.25 }, { opacity: 1, duration: 0.25, stagger: { each: 0.03, from: 'random' }, yoyo: true, repeat: 3 }, t),
      (t) => tl.fromTo(sub('#er-d2 .ln'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.4, stagger: 0.3 }, t),
      (t) => tl.fromTo(sub('#er-d3 .env'), { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.3, ease: 'back.out(2)' }, t),
      (t) => { tl.fromTo(sub('#er-d4 .app'), { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.08, ease: 'back.out(2)' }, t); tl.fromTo(sub('#er-d4 .wv'), { opacity: 0.15 }, { opacity: 1, duration: 0.3, stagger: 0.2, yoyo: true, repeat: 5 }, t + 1); },
      (t) => tl.fromTo(sub('#er-d5 .up'), { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 0.6, repeat: 4, ease: 'none' }, t),
    ];
    for (let k = 1; k <= 5; k++) {
      c = at(k);
      frame(k, c, 5.6);
      if (k === 1) OUT(Q('a1 a2 a3 a4 b0'), c, 0.4);
      else OUT(Q(`d${k - 1} i${k - 1} b${k - 1}`), c, 0.4);
      if (k === 1) IN(Q('c1 c2 c3 c4 c5'), c + 0.2, 0.4, { y: -16 });
      if (k === 1) tl.set(Q('c2 c3 c4 c5'), { opacity: 0.45 }, c + 0.65);
      if (k > 1) tl.to(q('c' + (k - 1)), Object.assign({ duration: 0.3 }, DONE), c + 0.5);
      tl.to(q('c' + k), Object.assign({ opacity: 1, duration: 0.3 }, ACT), c + 0.7);
      POP(q('d' + k), c + 0.9, 0.6); SND('whoosh', c + 0.9);
      anim[k - 1](c + 1.6);
      IN(q('i' + k), c + 1.6, 0.5, { x: 40 }); SND('pop', c + 1.6);
      IN(q('b' + k), c + 3.6, 0.4, { y: 14 });
    }

    /* 6 — recap */
    c = at(6);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd6'), c + 0.6, 0.5, { y: -30 });
    Q('r1 r2 r3 r4 r5').forEach((r, i) => { IN(r, c + 1.0 + i * 0.4, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.4); });
    POP(q('rp1'), c + 3.4, 0.6); SND('ok', c + 3.4);
    POP(q('rp2'), c + 4.4, 0.6);
    return M.done();
  });

  /* ═════════════════════════ mooreMovie ═════════════════════════ */
  const ART_CHIP = `<rect x="40" y="40" width="320" height="320" rx="26" fill="#1f2937" stroke="#64748b" stroke-width="6"/>
    ${range(8).map((k) => `<rect x="${64 + k * 36}" y="8" width="16" height="32" fill="#cbd5e1"/><rect x="${64 + k * 36}" y="360" width="16" height="32" fill="#cbd5e1"/><rect x="8" y="${64 + k * 36}" width="32" height="16" fill="#cbd5e1"/><rect x="360" y="${64 + k * 36}" width="32" height="16" fill="#cbd5e1"/>`).join('')}
    ${range(64).map((k) => `<rect class="tr" x="${76 + (k % 8) * 32}" y="${76 + Math.floor(k / 8) * 32}" width="22" height="22" rx="4" fill="#34d399"/>`).join('')}`;
  const ART_PHONE2 = `<rect x="10" y="10" width="140" height="290" rx="24" fill="#0f172a" stroke="#94a3b8" stroke-width="6"/><rect x="24" y="44" width="112" height="220" rx="8" fill="#1e293b"/>
    <rect x="48" y="120" width="64" height="64" rx="8" fill="#334155" stroke="#38bdf8" stroke-width="4"/>`;
  const ART_SWITCH = `<rect x="10" y="20" width="180" height="80" rx="40" fill="#334155" stroke="#94a3b8" stroke-width="5"/><circle class="knob" cx="50" cy="60" r="30" fill="#94a3b8"/>`;
  const ART_ATOMS = `<rect x="20" y="40" width="480" height="40" rx="10" fill="#475569"/>
    ${range(8).map((k) => `<circle cx="${70 + k * 54}" cy="150" r="24" fill="#fbbf24" stroke="#fde68a" stroke-width="4"/>`).join('')}
    <path d="M46 210 H472" stroke="#e2e8f0" stroke-width="5"/><path d="M46 196 V224 M472 196 V224" stroke="#e2e8f0" stroke-width="5"/>`;
  const ART_TUNNEL = `<rect x="200" y="20" width="44" height="220" rx="8" fill="#64748b"/>
    ${range(3).map((k) => `<circle class="e${k}" cx="60" cy="${70 + k * 60}" r="16" fill="#38bdf8"/>`).join('')}`;
  const ART_LEAK = `<rect x="20" y="90" width="300" height="40" rx="12" fill="#475569"/><rect x="150" y="40" width="44" height="90" rx="8" fill="#94a3b8"/>
    ${range(3).map((k) => `<path class="drop" d="M${110 + k * 60} 150 q-14 22 0 32 q14 -10 0 -32Z" fill="#38bdf8"/>`).join('')}`;
  const ART_CORE = (n) => `${range(n).map((k) => `<rect x="${n === 1 ? 110 : 20 + (k % 2) * 160}" y="${n === 1 ? 70 : 20 + Math.floor(k / 2) * 120}" width="140" height="100" rx="14" fill="#1e293b" stroke="${n === 1 ? '#fbbf24' : '#34d399'}" stroke-width="5"/>`).join('')}`;

  K.defineAnim('mooreMovie', (stage, props, api) => {
    const U = MK.ui('mo-');
    const M = MK.create(stage, api, {
      cls: 'mv-moore mv-l11', prefix: 'mo-', beats: 7, cast: { 'ch-en': 'engineer' },
      html: (L) => `
  <div id="mo-stage" class="mv-stage">
    ${U.ch('ch-en', 40, 470, 'md')}
    ${U.art('ph', 480, 260, 160, 310, '0 0 160 310', ART_PHONE2)}
    ${U.emo('ar1', 650, 360, 90, 60, '➜')}
    ${U.art('chip', 760, 220, 400, 400, '0 0 400 400', ART_CHIP)}
    ${U.box('i0', 1230, 230, 650, 't-green', { ic: '🔌', h: L('الترانزستور = مفتاح صغير جدًا', 'Transistor = a tiny switch'), p: L('شغّال = 1 · مقفول = 0', 'on = 1 · off = 0'), s: L('الشريحة (الدائرة المتكاملة) فيها مليارات منه', 'a chip (integrated circuit) holds billions') })}
    ${U.art('sw', 1300, 540, 200, 120, '0 0 200 120', ART_SWITCH)}
    ${U.pill('s1', 1540, 568, L('= 1 (شغّال)', '= 1 (on)'), 't-green')}
    ${U.pill('s0', 1540, 568, L('= 0 (مقفول)', '= 0 (off)'), 't-slate')}
    ${U.bub('b0', 30, 505, 400, L('جوّه الشريحة دي مليارات الترانزستورات!', 'Billions of transistors inside this chip!') + ' 🔬')}

    ${range(6).map((k) => `<div id="mo-bar${k}" class="later mo-bar" ${MK.S(500 + k * 130, 620 - 14 * (2 ** k) * 0.62 - 6, 96, 14 * (2 ** k) * 0.62 + 6)}></div><div id="mo-yr${k}" class="later mo-yr" ${MK.S(486 + k * 130, 630, 124)}>${1971 + 2 * k}</div><div id="mo-x${k}" class="later mo-x" ${MK.S(486 + k * 130, 560 - 14 * (2 ** k) * 0.62 - 6, 124)}>×${2 ** k}</div>`).join('')}
    ${U.box('i1', 1340, 230, 540, 't-blue', { ic: '📈', h: L('قانون مور', 'Moore’s Law'), p: L('عدد الترانزستورات في الدائرة المتكاملة بيتضاعف كل سنتين تقريبًا', 'the number of transistors in an IC doubles about every two years') })}
    ${U.pill('f1', 1360, 520, '<bdi class="code">N = N₀ × 2ⁿ</bdi> · <bdi>' + L('n = السنين ÷ 2', 'n = years ÷ 2') + '</bdi>', 'solid')}
    ${U.pill('c1', 1360, 600, 'Intel 4004 (1971): 2,300', 't-amber')}
    ${U.pill('c2', 1360, 680, L('النهارده: أكتر من 100 مليار', 'Today: over 100 billion'), 't-green')}

    ${U.box('ok2', 470, 240, 680, 't-green', { ic: '✅', h: L('عدد الترانزستورات', 'The transistor count'), p: L('في الدائرة المتكاملة — ده موضوع القانون', 'in an integrated circuit — that is the law') })}
    ${U.box('no2', 1200, 240, 680, 't-red', { ic: '❌', h: L('مش سرعة الإنترنت', 'Not Internet speed'), p: L('ولا سرعة المعالج مباشرةً', 'nor CPU speed directly') })}
    ${U.box('no3', 1200, 470, 680, 't-red', { ic: '🧪', h: L('«ملاحظة تجريبية»', 'An “empirical observation”'), p: L('مش قانون فيزيائي', 'not a law of physics') })}
    ${U.bub('b2', 30, 505, 400, L('خلّي بالك: الكلام عن «العدد» بس', 'Careful: it is only about the COUNT') + ' ☝️')}

    ${U.art('atoms', 520, 250, 520, 240, '0 0 520 240', ART_ATOMS)}
    ${U.pill('nm', 600, 520, L('أصغر من 10 نانومتر = عرض كام ذرة بس', 'under 10 nm = only a few atoms wide'), 't-amber')}
    ${U.box('i3', 1180, 240, 700, 't-amber', { ic: '🧱', h: L('المشكلة ①: الحد الفيزيائي', 'Problem ①: the physical limit'), p: L('الترانزستور صغر جدًا', 'the transistor got extremely small'), s: L('مش هينفع نصغّر للأبد', 'we cannot shrink forever') })}

    ${U.art('tun', 480, 230, 300, 260, '0 0 300 260', ART_TUNNEL)}
    ${U.box('i4a', 800, 230, 520, 't-violet', { ic: '👻', h: L('② تأثير النفق الكمومي', '② Quantum tunnelling'), p: L('الإلكترون بيعدّي الحاجز العازل', 'electrons pass through the barrier'), s: L('المفتاح مابقاش «مقفول» بشكل موثوق', 'the switch is no longer reliably off') })}
    ${U.art('leak', 1360, 230, 340, 200, '0 0 340 200', ART_LEAK)}
    ${U.box('i4b', 1360, 440, 520, 't-blue', { ic: '💧', h: L('③ تيار التسرّب', '③ Leakage current'), p: L('تيار بيهرب والمفتاح مقفول', 'current escapes while off') })}

    ${U.art('core1', 480, 250, 360, 240, '0 0 360 240', ART_CORE(1))}
    ${U.art('core4', 480, 250, 360, 260, '0 0 360 260', ART_CORE(4))}
    ${U.box('i5a', 900, 240, 480, 't-green', { ic: '⚙️', h: L('المعالجة المتوازية', 'Parallel processing'), p: L('أنوية كتير بتقسّم الشغل في نفس الوقت', 'many cores share the work at once') })}
    ${U.box('i5b', 1400, 240, 480, 't-violet', { ic: '⚛️', h: L('الحواسب الكمومية', 'Quantum computers'), p: L('حساب مبني على مبادئ ميكانيكا الكم', 'computing based on quantum mechanics') })}
    ${U.bub('b5', 30, 505, 400, L('بدل ما نصغّر أكتر… نشتغل بذكاء أكتر', 'Instead of shrinking more… work smarter') + ' 💡')}

    ${U.hd(0, '🔬 ' + L('جوّه كل جهاز… شريحة', 'Inside every device… a chip'))}
    ${U.hd(1, '📈 ' + L('قانون مور: ×2 كل سنتين تقريبًا', 'Moore’s Law: ×2 about every two years'))}
    ${U.hd(2, '⚠️ ' + L('قانون مور بيتكلم عن «العدد»', 'Moore’s Law is about the COUNT'))}
    ${U.hd(3, '🧱 ' + L('ليه قرّب يوقف؟ المشكلة ①', 'Why is it slowing? Problem ①'))}
    ${U.hd(4, '🔥 ' + L('المشكلة ② و③', 'Problems ② and ③'))}
    ${U.hd(5, '🚀 ' + L('الحلول: اتجاهات جديدة لزيادة الأداء', 'Solutions: new ways to add performance'))}
    ${U.nt(0, L('الشريحة = المخ اللي بيحسب كل حاجة في الموبايل واللابتوب', 'The chip = the brain that computes everything in a phone or laptop'))}
    ${U.nt(1, L('فضل صحيح سنين طويلة → قدرة الحوسبة زادت بشكل هائل', 'It held for decades → computing power grew enormously'), 'ok')}
    ${U.nt(4, '🔥 ' + L('النتيجة: حرارة وطاقة أعلى ← صعب نجمع أداء أعلى + طاقة أقل', 'Result: more heat and power → hard to get more performance with less energy'), 'bad')}
  </div>
  <div id="mo-recap" class="mv-recap">
    ${U.hd(6, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.box('r1', 1290, 140, 540, 't-blue', { ic: '📈', h: L('قانون مور', 'Moore’s Law'), p: L('الترانزستورات ×2 كل سنتين', 'transistors ×2 every 2 years') })}
    ${U.box('r2', 690, 140, 540, 't-red', { ic: '🧱', h: L('المشاكل', 'The limits'), p: L('حد فيزيائي · نفق كمومي · تيار تسرّب', 'physical limit · tunnelling · leakage') })}
    ${U.box('r3', 90, 140, 540, 't-green', { ic: '🚀', h: L('الحلول', 'Solutions'), p: L('معالجة متوازية · حواسب كمومية', 'parallel processing · quantum computers') })}
    ${U.rp('rp1', 500, '<bdi class="code">N = N₀ × 2ⁿ</bdi>  ·  <bdi>' + L('n = عدد السنين ÷ 2', 'n = number of years ÷ 2') + '</bdi>', 't-amber')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const sub = (sel) => M.board.querySelectorAll(sel);

    /* 0 — the chip and its transistors */
    let c = at(0);
    frame(0, c, 6.4);
    IN(q('ch-en'), c + 0.3, 0.6, { x: -80 });
    POP(q('ph'), c + 0.8, 0.5); IN(q('ar1'), c + 1.4, 0.3, { x: -20 });
    POP(q('chip'), c + 1.8, 0.6); SND('whoosh', c + 1.8);
    tl.fromTo(sub('#mo-chip .tr'), { opacity: 0 }, { opacity: 1, duration: 0.05, stagger: 0.02 }, c + 2.3);
    IN(q('i0'), c + 3.0, 0.5, { x: 40 });
    IN(q('sw'), c + 3.8, 0.4); IN(q('s0'), c + 3.8, 0.3);
    tl.to(sub('#mo-sw .knob'), { attr: { cx: 150 }, fill: '#34d399', duration: 0.3 }, c + 4.6);
    OUT(q('s0'), c + 4.6, 0.15); IN(q('s1'), c + 4.7, 0.2);
    IN(q('b0'), c + 5.2, 0.4, { y: 14 });
    SND('pop', c + 4.6);

    /* 1 — Moore's law: doubling */
    c = at(1);
    frame(1, c, 7.4);
    OUT(Q('ph ar1 chip i0 sw s0 s1 b0'), c, 0.4);
    IN(q('i1'), c + 0.6, 0.5, { x: 40 });
    range(6).forEach((k) => {
      const t = c + 1.2 + k * 0.6;
      tl.fromTo(q('bar' + k), { opacity: 0, scaleY: 0, transformOrigin: '50% 100%' }, { opacity: 1, scaleY: 1, duration: 0.4 }, t);
      IN(q('yr' + k), t, 0.3); POP(q('x' + k), t + 0.3, 0.3); SND('pop', t);
    });
    IN(q('f1'), c + 5.0, 0.5, { y: 20 });
    IN(q('c1'), c + 5.8, 0.4, { y: 20 });
    POP(q('c2'), c + 6.6, 0.5); SND('ok', c + 6.6);

    /* 2 — it is about the COUNT, an observation */
    c = at(2);
    frame(2, c);
    OUT(Q('i1 f1 c1 c2 bar0 bar1 bar2 bar3 bar4 bar5 yr0 yr1 yr2 yr3 yr4 yr5 x0 x1 x2 x3 x4 x5'), c, 0.4);
    IN(q('ok2'), c + 0.8, 0.5, { y: 30 }); SND('ok', c + 0.8);
    IN(q('no2'), c + 2.0, 0.5, { y: 30 }); SND('bad', c + 2.0);
    IN(q('no3'), c + 3.2, 0.5, { y: 30 }); SND('bad', c + 3.2);
    IN(q('b2'), c + 4.4, 0.4, { y: 14 });

    /* 3 — problem 1: the physical limit */
    c = at(3);
    frame(3, c);
    OUT(Q('ok2 no2 no3 b2'), c, 0.4);
    IN(q('atoms'), c + 0.7, 0.6, { scale: 0.8 });
    tl.fromTo(q('atoms'), { scale: 1.6 }, { scale: 1, duration: 1.4, ease: 'power2.inOut', transformOrigin: '50% 50%' }, c + 0.7);
    POP(q('nm'), c + 2.4, 0.5); SND('pop', c + 2.4);
    IN(q('i3'), c + 3.2, 0.5, { x: 40 });

    /* 4 — problems 2 & 3: tunnelling + leakage */
    c = at(4);
    frame(4, c, 6.2);
    OUT(Q('atoms nm i3'), c, 0.4);
    IN(q('tun'), c + 0.6, 0.5);
    tl.to(sub('#mo-tun .e0'), { attr: { cx: 120 }, duration: 0.6, yoyo: true, repeat: 3 }, c + 1.1);
    tl.to(sub('#mo-tun .e1'), { attr: { cx: 270 }, duration: 1.4, ease: 'power1.inOut' }, c + 1.3);
    tl.to(sub('#mo-tun .e2'), { attr: { cx: 120 }, duration: 0.6, yoyo: true, repeat: 3 }, c + 1.5);
    IN(q('i4a'), c + 1.6, 0.5, { y: 30 }); SND('bad', c + 2.6);
    IN(q('leak'), c + 3.4, 0.5);
    tl.fromTo(sub('#mo-leak .drop'), { y: 0, opacity: 1 }, { y: 16, opacity: 0.2, duration: 0.6, stagger: 0.2, repeat: 3 }, c + 3.8);
    IN(q('i4b'), c + 4.2, 0.5, { y: 30 });

    /* 5 — solutions */
    c = at(5);
    frame(5, c);
    OUT(Q('tun i4a leak i4b'), c, 0.4);
    IN(q('core1'), c + 0.6, 0.4);
    OUT(q('core1'), c + 2.4, 0.3);
    POP(q('core4'), c + 2.7, 0.5); SND('pop', c + 2.7);
    IN(q('i5a'), c + 1.0, 0.5, { y: 30 });
    IN(q('i5b'), c + 4.0, 0.5, { y: 30 }); SND('ok', c + 4.0);
    IN(q('b5'), c + 5.2, 0.4, { y: 14 });

    /* 6 — recap */
    c = at(6);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd6'), c + 0.6, 0.5, { y: -30 });
    Q('r1 r2 r3').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.6, { y: 30 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('rp1'), c + 3.2, 0.6); SND('ok', c + 3.2);
    return M.done();
  });

  /* ═════════════════════════ societyMovie ═════════════════════════ */
  const ART_SNS = `${[[300, 60], [520, 130], [540, 330], [300, 400], [70, 330], [80, 130]].map(([x, y], k) => `<path d="M300 230 L${x} ${y}" stroke="#38bdf8" stroke-width="5" opacity=".6"/><circle class="nd" cx="${x}" cy="${y}" r="34" fill="#1e293b" stroke="#38bdf8" stroke-width="5"/>`).join('')}
    <circle cx="300" cy="230" r="58" fill="#0ea5e9" stroke="#e0f2fe" stroke-width="6"/>`;
  const ART_CAR = `<rect x="40" y="150" width="380" height="110" rx="40" fill="#2563eb"/><path d="M110 150 Q140 80 230 80 Q320 80 350 150Z" fill="#60a5fa"/>
    <circle cx="120" cy="265" r="38" fill="#0f172a"/><circle cx="340" cy="265" r="38" fill="#0f172a"/><rect x="200" y="54" width="60" height="26" rx="8" fill="#fbbf24"/>
    ${[1, 2, 3].map((k) => `<path class="wv" d="M${420 + k * 22} ${200 - k * 30} a${k * 30} ${k * 30} 0 0 1 0 ${k * 60}" fill="none" stroke="#fbbf24" stroke-width="6"/>`).join('')}`;
  const ART_AR = `<rect x="10" y="10" width="420" height="260" rx="20" fill="#334155"/><path d="M60 200 h160 v-50 h-160z M70 150 v-30 h140 v30" fill="#92400e"/>
    <path d="M250 200 h140 v-50 h-140z M260 150 v-30 h120 v30" fill="none" stroke="#38bdf8" stroke-width="6" stroke-dasharray="14 10"/>`;
  const ART_VR = `<rect x="10" y="10" width="420" height="260" rx="20" fill="#4c1d95"/><circle cx="330" cy="70" r="34" fill="#fde68a"/>
    <path d="M10 230 L120 120 L210 210 L300 100 L430 230Z" fill="#7c3aed"/><path d="M140 170 h160 v40 h-160z" fill="#0f172a" stroke="#c4b5fd" stroke-width="6"/>`;

  K.defineAnim('societyMovie', (stage, props, api) => {
    const U = MK.ui('so-');
    const d = MK.RTL() ? 720 : 0; // RTL: the first of a pair sits on the right
    const M = MK.create(stage, api, {
      cls: 'mv-soc mv-l11', prefix: 'so-', beats: 8, cast: { 'ch-st': 'studentL' },
      html: (L) => `
  <div id="so-stage" class="mv-stage">
    ${U.ch('ch-st', 40, 470, 'md')}
    ${U.art('sns', 480, 220, 600, 460, '0 0 600 460', ART_SNS)}
    ${U.emo('sns-i', 730, 400, 100, 60, '📱')}
    ${U.box('i0', 1140, 260, 740, 't-blue', { ic: '💬', h: L('شبكات التواصل الاجتماعي (SNS)', 'Social networking services (SNS)'), p: L('المستخدمين بيتواصلوا وينشروا ويشاركوا المعلومات', 'users connect, post and share information'), s: L('فعّالة جدًا في نشر المعلومة بسرعة · Facebook · WhatsApp', 'very effective at spreading information fast · Facebook · WhatsApp') })}
    ${U.bub('b0', 30, 505, 400, L('نشرت صورة… وصلت لآلاف في ثانية!', 'I posted a photo… thousands saw it in a second!') + ' 📸')}

    ${U.box('i1a', 470 + d, 230, 690, 't-amber', { ic: '🛒', h: L('التجارة الإلكترونية (EC)', 'E-commerce (EC)'), p: L('بيع وشراء السلع والخدمات عبر الإنترنت', 'buying and selling goods and services online'), s: 'Amazon · eBay' })}
    ${U.box('i1b', 1190 - d, 230, 690, 't-green', { ic: '💳', h: L('الدفع غير النقدي', 'Cashless payment'), p: L('تدفع من غير كاش: كارت · QR · تطبيق', 'pay without cash: card · QR · app'), s: L('ممكن يحصل في محل حقيقي كمان', 'can happen in a real shop too') })}
    ${U.emo('pkg', 560 + d, 520, 100, 70, '📦')}${U.emo('home', 1000 + d, 520, 110, 70, '🏠')}
    ${U.emo('qr', 1290 - d, 520, 100, 70, '📲')}${U.emo('shop', 1680 - d, 520, 110, 70, '🏪')}

    ${U.box('i2a', 470 + d, 230, 690, 't-violet', { ic: '🏠💻', h: L('العمل عن بُعد', 'Remote work'), p: L('بتعمل مهامك من البيت أو أي مكان بالإنترنت', 'do your tasks from home or anywhere online') })}
    ${U.box('i2b', 1190 - d, 230, 690, 't-blue', { ic: '🎓', h: L('التعلّم عبر الإنترنت', 'Online learning'), p: L('الدروس والمواد بتتقدّم عن طريق الإنترنت', 'lessons and materials delivered over the Internet') })}

    ${U.art('car', 470, 300, 560, 320, '0 0 560 320', ART_CAR)}
    ${U.emo('ped', 1042, 384, 116, 80, '🚶')}
    ${U.box('i3', 1200, 230, 680, 't-blue', { ic: '🚗', h: L('القيادة الذاتية', 'Self-driving'), p: L('الذكاء الاصطناعي بيسوق العربية من غير سواق', 'AI drives the car with no driver') })}
    ${U.pill('p3a', 1220, 480, '👀 ' + L('تشوف: كاميرات وحسّاسات', 'Sees: cameras & sensors'), 't-amber')}
    ${U.pill('p3b', 1220, 560, '🧠 ' + L('تفكّر: تتعرّف وتقرّر', 'Thinks: recognises & decides'), 't-violet')}
    ${U.pill('p3c', 1220, 640, '🦶 ' + L('تتصرّف: دريكسيون وفرامل', 'Acts: steering & brakes'), 't-green')}

    ${U.box('i4a', 1160, 230, 720, 't-red', { ic: '☁️', h: L('لو بعتنا للسحابة: حوالي 0.8 ثانية', 'Via the cloud: about 0.8 s'), p: L('العربية تمشي حوالي 13 متر قبل ما تفرمل ← خطر!', 'the car travels about 13 m before braking → danger!') })}
    ${U.box('i4b', 1160, 520, 720, 't-green', { ic: '⚡', h: L('حوسبة طرفية: حوالي 0.05 ثانية', 'Edge computing: about 0.05 s'), p: L('القرار جوّه العربية ← تفرمل فورًا', 'decided inside the car → brakes at once') })}
    <div id="so-x4" class="xc later" ${MK.S(1040, 250)}>✕</div><div id="so-k4" class="xc ok later" ${MK.S(1040, 540)}>✓</div>

    ${U.art('ar', d ? 1440 : 470, 250, 440, 280, '0 0 440 280', ART_AR)}
    ${U.art('vr', d ? 910 : 1000, 250, 440, 280, '0 0 440 280', ART_VR)}
    ${U.box('i5a', d ? 1440 : 470, 550, 440, 't-blue', { h: 'AR ' + L('يضيف', 'adds') + ' ➕', p: L('معلومات رقمية فوق العالم الحقيقي', 'digital info on top of the real world') })}
    ${U.box('i5b', d ? 910 : 1000, 550, 440, 't-violet', { h: 'VR ' + L('يستبدل', 'replaces') + ' 🔄', p: L('عالم افتراضي كامل — الحقيقي يختفي', 'a whole virtual world — reality disappears') })}
    ${U.box('i5c', d ? 470 : 1480, 250, 400, 't-slate', { ic: '🎮', p: 'Pokémon GO = AR', s: L('نظارة VR = VR', 'VR headset = VR') })}

    ${U.box('i6a', d ? 1280 : 470, 240, 600, 't-slate', { ic: '💡', h: L('البِت التقليدي', 'A classical bit'), p: L('0 أو 1 — حالة واحدة في المرة', '0 OR 1 — one state at a time') })}
    <div id="so-bit" class="later so-bit" ${MK.S(d ? 1510 : 700, 500, 140)}>0</div><div id="so-bit1" class="later so-bit" ${MK.S(d ? 1510 : 700, 500, 140)}>1</div>
    ${U.box('i6b', d ? 470 : 1120, 240, 760, 't-violet', { ic: '⚛️', h: L('الكيوبت', 'A qubit'), p: L('0 و 1 مع بعض في نفس الوقت (التراكب)', '0 AND 1 at the same time (superposition)'), s: L('تسرّع بشكل هائل حسابات صعبة على الحاسب العادي', 'hugely speeds up calculations hard for normal computers') })}
    <div id="so-qb" class="later so-bit q" ${MK.S(d ? 740 : 1390, 540, 220)}>0 + 1</div>

    ${U.hd(0, '① ' + L('شبكات التواصل الاجتماعي', 'Social networking'))}
    ${U.hd(1, '② ' + L('التجارة الإلكترونية', 'E-commerce') + ' · ③ ' + L('الدفع غير النقدي', 'Cashless payment'))}
    ${U.hd(2, '④ ' + L('العمل عن بُعد', 'Remote work') + ' · ⑤ ' + L('التعلّم عبر الإنترنت', 'Online learning'))}
    ${U.hd(3, '🚗 ' + L('تقنية ناشئة: القيادة الذاتية', 'Emerging tech: self-driving'))}
    ${U.hd(4, '⚡ ' + L('ليه الحوسبة الطرفية؟', 'Why edge computing?'))}
    ${U.hd(5, '🥽 ' + L('الواقع المعزز ضد الواقع الافتراضي', 'Augmented vs virtual reality'))}
    ${U.hd(6, '⚛️ ' + L('الحوسبة الكمومية', 'Quantum computing'))}
    ${U.nt(1, '⚠️ ' + L('«التجارة الإلكترونية = شراء بالكاش من محل حقيقي» ← غلط', '“E-commerce = paying cash in a real shop” → false'), 'warn')}
    ${U.nt(2, L('الإنترنت خلّى الشغل والمدرسة ممكنين من أي مكان', 'The Internet makes work and school possible from anywhere'), 'ok')}
    ${U.nt(4, '⏱️ ' + L('تأخير 0.1 ثانية بس ممكن يسبّب حادثة — القرار لازم يتاخد على الجهاز نفسه', 'Even 0.1 s of delay can cause a crash — decide on the device itself'), 'warn')}
  </div>
  <div id="so-recap" class="mv-recap">
    ${U.hd(7, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.box('r1', 990, 140, 840, 't-blue', { ic: '👥', h: L('خمس تحولات اجتماعية', 'Five social changes'), p: L('SNS · تجارة إلكترونية · عمل عن بُعد', 'SNS · e-commerce · remote work'), s: L('تعلّم أونلاين · دفع غير نقدي', 'online learning · cashless payment') })}
    ${U.box('r2', 90, 140, 840, 't-violet', { ic: '🚀', h: L('تقنيات ناشئة', 'Emerging technologies'), p: L('قيادة ذاتية (بحوسبة طرفية)', 'self-driving (edge computing)'), s: L('AR يضيف · VR يستبدل · الكمومية تسرّع', 'AR adds · VR replaces · quantum speeds up') })}
    ${U.rp('rp1', 520, '🔁 ' + L('كل تقنية جديدة بتغيّر طريقة تواصلنا وشغلنا وتجارتنا', 'Each new technology changes how we communicate, work and trade'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame } = M;
    const sub = (sel) => M.board.querySelectorAll(sel);

    /* 0 — SNS */
    let c = at(0);
    frame(0, c);
    IN(q('ch-st'), c + 0.3, 0.6, { x: -80 });
    IN(q('sns'), c + 0.8, 0.5); POP(q('sns-i'), c + 1.0, 0.4);
    tl.fromTo(sub('#so-sns .nd'), { fill: '#1e293b' }, { fill: '#38bdf8', duration: 0.25, stagger: 0.25 }, c + 1.6); SND('pop', c + 1.6);
    IN(q('i0'), c + 2.4, 0.5, { x: 40 });
    IN(q('b0'), c + 4.0, 0.4, { y: 14 });

    /* 1 — e-commerce + cashless */
    c = at(1);
    frame(1, c, 6.0);
    OUT(Q('sns sns-i i0 b0'), c, 0.4);
    IN(q('i1a'), c + 0.6, 0.5, { y: 30 });
    POP(Q('pkg home'), c + 1.4, 0.4);
    tl.to(q('pkg'), { x: 320, duration: 1.4, ease: 'power1.inOut' }, c + 1.9); SND('whoosh', c + 1.9);
    IN(q('i1b'), c + 3.4, 0.5, { y: 30 });
    POP(Q('qr shop'), c + 4.2, 0.4);
    tl.to(q('qr'), { x: 290, duration: 1.0, ease: 'power1.inOut' }, c + 4.7); SND('ok', c + 5.7);

    /* 2 — remote work + online learning */
    c = at(2);
    frame(2, c, 3.6);
    OUT(Q('i1a i1b pkg home qr shop'), c, 0.4);
    IN(q('i2a'), c + 0.7, 0.5, { y: 30 }); SND('pop', c + 0.7);
    IN(q('i2b'), c + 1.9, 0.5, { y: 30 }); SND('pop', c + 1.9);

    /* 3 — self-driving: sees, thinks, acts */
    c = at(3);
    frame(3, c);
    OUT(Q('i2a i2b'), c, 0.4);
    IN(q('car'), c + 0.6, 0.6, { x: -120 });
    tl.fromTo(sub('#so-car .wv'), { opacity: 0.1 }, { opacity: 1, duration: 0.3, stagger: 0.15, yoyo: true, repeat: 7 }, c + 1.2);
    IN(q('i3'), c + 1.2, 0.5, { x: 40 });
    IN(q('p3a'), c + 2.4, 0.4, { x: 30 }); SND('pop', c + 2.4);
    IN(q('p3b'), c + 3.4, 0.4, { x: 30 }); SND('pop', c + 3.4);
    IN(q('p3c'), c + 4.4, 0.4, { x: 30 }); SND('pop', c + 4.4);

    /* 4 — edge vs cloud */
    c = at(4);
    frame(4, c, 6.0);
    OUT(Q('i3 p3a p3b p3c'), c, 0.4);
    POP(q('ped'), c + 0.6, 0.4); SND('bad', c + 0.6);
    IN(q('i4a'), c + 1.4, 0.5, { x: 40 });
    POP(q('x4'), c + 2.6, 0.4); SND('bad', c + 2.6);
    IN(q('i4b'), c + 3.6, 0.5, { x: 40 });
    POP(q('k4'), c + 4.6, 0.4); SND('ok', c + 4.6);
    tl.fromTo(q('car'), { y: 0 }, { y: 8, duration: 0.12, yoyo: true, repeat: 3 }, c + 4.7);

    /* 5 — AR vs VR */
    c = at(5);
    frame(5, c);
    OUT(Q('car ped i4a i4b x4 k4'), c, 0.4);
    IN(q('ar'), c + 0.6, 0.5, { y: 30 }); IN(q('i5a'), c + 1.1, 0.4);
    tl.fromTo(sub('#so-ar path')[1], { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 3 }, c + 1.6);
    IN(q('vr'), c + 3.0, 0.5, { y: 30 }); IN(q('i5b'), c + 3.5, 0.4); SND('whoosh', c + 3.0);
    IN(q('i5c'), c + 4.8, 0.5, { x: 40 });

    /* 6 — quantum: bit vs qubit */
    c = at(6);
    frame(6, c);
    OUT(Q('ar vr i5a i5b i5c'), c, 0.4);
    IN(q('i6a'), c + 0.6, 0.5, { y: 30 });
    IN(q('bit'), c + 1.2, 0.3);
    tl.to(q('bit'), { opacity: 0, duration: 0.05, yoyo: true, repeat: 6, repeatDelay: 0.35 }, c + 1.6);
    tl.to(q('bit1'), { opacity: 1, duration: 0.05, yoyo: true, repeat: 6, repeatDelay: 0.35 }, c + 1.6);
    IN(q('i6b'), c + 3.4, 0.5, { y: 30 });
    POP(q('qb'), c + 4.4, 0.5); SND('ok', c + 4.4);
    tl.fromTo(q('qb'), { boxShadow: '0 0 0 rgba(167,139,250,0)' }, { boxShadow: '0 0 50px rgba(167,139,250,.9)', duration: 0.5, yoyo: true, repeat: 3 }, c + 5.0);

    /* 7 — recap */
    c = at(7);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd7'), c + 0.6, 0.5, { y: -30 });
    IN(q('r1'), c + 1.0, 0.6, { y: 30 }); SND('pop', c + 1.0);
    IN(q('r2'), c + 1.8, 0.6, { y: 30 }); SND('pop', c + 1.8);
    POP(q('rp1'), c + 3.0, 0.6); SND('ok', c + 3.0);
    return M.done();
  });
})();

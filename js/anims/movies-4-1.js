/* =========================================================
 * anims/movies-4-1.js — lesson 4-1 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   mediaMovie (stations compare 0–3 · choose 4–8): a TV broadcasting to a
 *     crowd · radio on the move + a paper with no Internet · a website with a
 *     comment box + a post spreading on SNS · one-way vs two-way lanes ·
 *     website strengths · constraints · matching purpose → medium ·
 *     TV → website → SNS chain · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const TV = `<rect x="20" y="40" width="360" height="240" rx="26" fill="#1e293b" stroke="#94a3b8" stroke-width="8"/><rect x="44" y="64" width="312" height="192" rx="12" fill="#0ea5e9"/>
    <path d="M150 300 L120 340 M250 300 L280 340" stroke="#94a3b8" stroke-width="10" stroke-linecap="round"/><path d="M170 40 L140 4 M230 40 L260 4" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <circle cx="200" cy="160" r="46" fill="#fde047"/><path d="M188 140 L222 160 L188 180Z" fill="#0f172a"/>`;
  const RADIO = `<rect x="20" y="80" width="300" height="190" rx="30" fill="#b45309" stroke="#fde68a" stroke-width="6"/><circle cx="110" cy="175" r="58" fill="#78350f"/>
    ${range(5).map((k) => `<circle cx="110" cy="175" r="${12 + k * 10}" fill="none" stroke="#fbbf24" stroke-width="3" opacity=".6"/>`).join('')}
    <rect x="200" y="120" width="90" height="30" rx="8" fill="#fde68a"/><circle cx="230" cy="215" r="18" fill="#fde68a"/><circle cx="275" cy="215" r="18" fill="#fde68a"/>
    <path d="M60 80 L200 20" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>`;
  const WAVES = (cls) => range(3).map((k) => `<path class="${cls}" d="M${20 + k * 34} 20 Q${46 + k * 34} 80 ${20 + k * 34} 140" fill="none" stroke="#38bdf8" stroke-width="7" stroke-linecap="round"/>`).join('');

  K.defineAnim('mediaMovie', (stage, props, api) => {
    const P = 'm1-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l12 mv-l41', prefix: P, beats: 9,
      html: (L) => {
        const props4 = (rows) => `<ul class="l12-list sm">${rows.map((r) => `<li>${r}</li>`).join('')}</ul>`;
        return `
  <div id="m1-s0" class="mv-stage">
    ${B.svg('tv', 70, 160, 440, 380, '0 0 400 350', TV)}
    ${B.svg('wv0', 540, 220, 180, 160, '0 0 160 160', B.mir(160, WAVES('w')))}
    <div id="m1-crowd" class="l12u l12-crowd later" style="${B.at(740, 160, 520, 380)}">${range(15).map(() => '<span>👤</span>').join('')}</div>
    ${B.card('tvd', 1300, 150, 560, 0, 'c-blue', { ic: '📺', h: L('التلفزيون', 'TV'), html: props4(['🎬 ' + L('فيديو + صوت', 'video + audio'), '👥 ' + L('ناس كتير في نفس الوقت', 'many people at once'), '👁️👂 ' + L('النظر والسمع', 'sight and hearing'), '➡️ ' + L('اتجاه واحد', 'one-way')]) })}
  </div>
  <div id="m1-s1" class="mv-stage">
    ${B.svg('rd', 70, 140, 340, 290, '0 0 340 290', RADIO)}
    ${B.svg('wv1', 420, 170, 160, 160, '0 0 160 160', B.mir(160, WAVES('w')))}
    ${B.big('drv', 590, 200, 140, 100, '🚗')}
    ${B.card('rdd', 70, 470, 860, 0, 'c-amber', { row: true, ic: '📻', h: L('الراديو', 'Radio'), p: L('صوت بس · السمع بس · بيتسمع في أي مكان وإنت بتعمل حاجة تانية · اتجاه واحد', 'audio only · hearing only · heard anywhere while doing something else · one-way') })}
    <div id="m1-np" class="l12u l12-doc l12-paper later" style="${B.at(1010, 140, 520, 300)}"><b>📰 ${L('أخبار النهارده', 'Today’s news')}</b><div class="cols"><i></i><i></i><i></i><i></i><i class="img"></i></div></div>
    ${B.chip('nonet', 1550, 220, '📶 ✗ ' + L('من غير إنترنت', 'no Internet'), 'c-green')}
    ${B.card('npd', 1010, 470, 850, 0, 'c-slate', { row: true, ic: '📰', h: L('الجرنال', 'Newspaper'), p: L('نص + صور · مطبوع ماديًا · بيتقري من غير إنترنت · اتجاه واحد', 'text + images · printed · read without Internet · one-way') })}
  </div>
  <div id="m1-s2" class="mv-stage">
    <div id="m1-site" class="l12u l12-win later" style="${B.at(70, 140, 820, 430)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🌐 museum.eg</span></div>
      <div class="wbody l12-mix"><span>📝 ${L('نص', 'text')}</span><span>🖼️ ${L('صور', 'images')}</span><span>🎬 ${L('فيديو', 'video')}</span><span>🔊 ${L('صوت', 'audio')}</span><div class="cm">💬 ${L('اكتب تعليقك…', 'write a comment…')} <b>${L('إرسال', 'send')}</b></div></div></div>
    ${B.big('back', 900, 470, 120, 70, '↩️')}
    <div id="m1-sns" class="l12u l12-sns later" style="${B.at(1040, 140, 820, 430)}"><div class="post">💬 ${L('بوست', 'a post')} <b>🔁 <bdi class="n">0</bdi></b></div>${range(8).map((k) => `<span class="nd n${k}">👤</span>`).join('')}</div>
    ${B.chip('sd', 70, 610, '🌐 ' + L('الموقع: أساسًا اتجاه واحد — بس الاتجاهين بالنماذج والتعليقات', 'website: mostly one-way — two-way through forms & comments'), 'c-blue')}
    ${B.chip('nd', 1040, 610, '💬 ' + L('التواصل: بينشر بسرعة · المستخدمين بيشاركوا', 'SNS: spreads fast · users share'), 'c-violet')}
  </div>
  <div id="m1-s3" class="mv-stage">
    ${B.card('one', 70, 150, 860, 420, 'c-slate', { h: '➡️ ' + L('اتجاه واحد', 'One-way'), html: `<div class="l12-lane"><span>📺 📻 📰</span><b class="ar1">${B.arrow}</b><span>👥</span></div><p class="cap">${L('المستقبل بيستقبل بس', 'the receiver only receives')}</p>` })}
    ${B.card('two', 990, 150, 870, 420, 'c-green', { h: '↔️ ' + L('الاتجاهين', 'Two-way'), html: `<div class="l12-lane"><span>💬 ${L('دايمًا', 'always')}</span><b class="ar2">⇄</b><span>👥</span></div><div class="l12-lane"><span>🌐 ${L('بالنماذج والتعليقات', 'via forms & comments')}</span><b class="ar2">⇄</b><span>👥</span></div>` })}
    ${B.mid('trp', 620, '⚠️ ' + L('فخ: «التلفزيون بيتيح تفاعل في الاتجاهين» ← غلط', 'trap: “TV allows two-way interaction” → false'), 'c-red big')}
  </div>
  <div id="m1-s4" class="mv-stage">
    <div id="m1-web" class="l12u l12-win later" style="${B.at(70, 160, 640, 440)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🌐 nile-shop.com</span></div><div class="wbody l12-mix"><span>📝</span><span>🖼️</span><span>🎬</span><span>🔊</span></div></div>
    ${[['🧩', L('تجمع معلومات متنوعة', 'combine diverse information')], ['🔄', L('تتحدّث في أي وقت', 'update any time')], ['🌍', L('توصل من أي مكان تقريبًا', 'reach almost anywhere')], ['↔️', L('تفاعل في الاتجاهين بالنماذج والتعليقات', 'two-way via forms & comments')], ['🌐', L('يكفي متصفح من غير تسطيب', 'just a browser, nothing to install')]]
      .map(([ic, t], k) => B.chip('g' + k, 780, 150 + k * 104, `<b class="nm">${k + 1}</b> ${ic} ${t}`, 'c-green big', 1080)).join('')}
  </div>
  <div id="m1-s5" class="mv-stage">
    ${B.card('c0', 70, 150, 570, 420, 'c-red', { ic: '📶', h: L('① محتاجة إنترنت', '① Needs the Internet'), p: L('عادةً — إلا لو الصفحة متخزّنة مؤقتًا', 'usually — unless the page is cached'), html: '<div class="l12-off">⚠️ No internet</div>' })}
    ${B.card('c1', 670, 150, 570, 420, 'c-amber', { ic: '🚪', h: L('② لازم المستخدم يدخل بنفسه', '② The user must visit'), p: L('المعلومة مابتوصلش لوحدها', 'information does not arrive by itself'), html: `<div class="l12-visit">👀 <bdi>0</bdi> ${L('زيارة', 'visits')}</div>` })}
    ${B.card('c2', 1270, 150, 590, 420, 'c-slate', { ic: '🐢', h: L('③ العرض والسرعة بيختلفوا', '③ Display & speed vary'), p: L('حسب جهاز المستخدم وشبكته', 'by the user’s device and network'), html: `<div class="l12-load"><span>💻 <i class="f"></i></span><span>📱 <i class="s"></i></span></div>` })}
  </div>
  <div id="m1-s6" class="mv-stage">
    ${[['📣', L('تبلّغ ناس كتير مرة واحدة', 'inform many at once')], ['📚', L('معلومات مفصّلة', 'detailed information')], ['🎯', L('رسالة لناس معيّنين', 'a message to specific people')], ['🔁', L('انتشار بالتناقل', 'word of mouth')]]
      .map(([ic, t], k) => B.chip('pu' + k, 70, 160 + k * 130, ic + ' ' + t, 'c-amber big', 640)).join('')}
    ${[['📺 ' + L('تلفزيون · إعلانات التواصل', 'TV · SNS ads'), L('وصول واسع', 'wide reach')], ['🌐 ' + L('موقع', 'website'), L('مفيش حد للكمية · يتشاف في أي وقت', 'no limit · view any time')], ['✉️ ' + L('إيميل · رسايل مباشرة', 'email · DMs'), L('توصيل فردي', 'one-to-one')], ['💬 ' + L('التواصل الاجتماعي', 'SNS'), L('المستخدمين بيشاركوا بإرادتهم', 'users share by choice')]]
      .map(([h, p], k) => B.chip('me' + k, 1090, 160 + k * 130, `${h} <small>· ${p}</small>`, 'c-blue', 770)).join('')}
    ${range(4).map((k) => B.big('ln' + k, 740, 166 + k * 130, 320, 46, B.arrow + B.arrow + B.arrow, 'l12-gold')).join('')}
  </div>
  <div id="m1-s7" class="mv-stage">
    ${[['📺', L('إعلان تلفزيوني', 'a TV ad'), L('يوجّه الناس…', 'points people…'), 'c-blue'], ['🌐', L('الموقع', 'the website'), L('التفاصيل… ويشجّع النشر', 'the details… and encourages sharing'), 'c-green'], ['💬', L('التواصل الاجتماعي', 'SNS'), L('الناس بتنشر وتشارك', 'people post and share'), 'c-violet']]
      .map(([ic, h, p, c], k) => B.card('ch' + k, 70 + k * 640, 160, 520, 300, c, { ic, h, p })).join('')}
    ${range(2).map((k) => B.big('ca' + k, 600 + k * 640, 270, 100, 64, B.arrow, 'l12-gold')).join('')}
    ${B.card('aud', 70, 520, 1790, 0, 'c-amber', { row: true, ic: '👨‍👦‍👦', h: L('فكّر في الجمهور', 'Think of the audience'), p: L('عيلة من غير إنترنت مش هيوصلها الموقع — يوصلها راديو أو ملصق مطبوع', 'a family with no Internet will not get the website — radio or a printed poster will') })}
  </div>
  <div id="m1-s8" class="mv-stage">
    ${B.mid('nb', 150, '🏆 ' + L('مفيش وسيط أحسن في كل حاجة', 'no medium is best for everything'), 'c-amber big')}
    ${[['🎯', L('اختار حسب الغرض والجمهور', 'choose by purpose and audience'), 'c-blue'], ['🔗', L('اجمع الوسائط: كل واحد يعمل اللي بيجيده', 'combine media: each does what it does best'), 'c-green']]
      .map(([ic, h, c], k) => B.card('r' + k, 70 + k * 910, 250, 880, 0, c, { row: true, ic, h })).join('')}
    ${B.chip('t1', 70, 470, '⚠️ ' + L('«الموقع بيتشاف من غير إنترنت» ← غلط', '“a website works without the Internet” → false'), 'c-red big', 880)}
    ${B.chip('t2', 980, 470, '⚠️ ' + L('«المعلومة بتوصل لوحدها» ← غلط', '“information arrives by itself” → false'), 'c-red big', 880)}
  </div>
    ${U.hd(0, '📺 ' + L('التلفزيون', 'Television'))}
    ${U.hd(1, '📻 ' + L('الراديو والجرنال', 'Radio and newspapers'))}
    ${U.hd(2, '🌐 ' + L('الموقع والتواصل الاجتماعي', 'Websites and SNS'))}
    ${U.hd(3, '↔️ ' + L('اتجاه واحد ولا الاتجاهين؟', 'One-way or two-way?'))}
    ${U.hd(4, '✅ ' + L('نقاط قوة المواقع', 'Strengths of websites'))}
    ${U.hd(5, '⚠️ ' + L('قيود المواقع', 'Constraints of websites'))}
    ${U.hd(6, '🎯 ' + L('اختار الوسيط حسب الغرض', 'Choose the medium by purpose'))}
    ${U.hd(7, '🔗 ' + L('عمليًا بنجمع كذا وسيط', 'In practice we combine media'))}
    ${U.hd(8, '📌 ' + L('الخلاصة', 'Recap'))}`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };
    const pulse = (sel, t) => tl.fromTo(all(sel), { opacity: 0.2 }, { opacity: 1, duration: 0.3, stagger: 0.2, yoyo: true, repeat: 3 }, t);

    let c = at(0);
    frame(0, c);
    IN(q('tv'), c + 0.3, 0.6, { scale: 0.9 }); SND('pop', c + 0.3);
    IN(q('wv0'), c + 1.0, 0.2); pulse('#m1-wv0 .w', c + 1.0);
    IN(q('crowd'), c + 1.4, 0.2);
    tl.fromTo(all('#m1-crowd span'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.07, ease: 'back.out(2)' }, c + 1.5);
    tl.to(all('#m1-crowd span'), { color: '#fde047', textShadow: '0 0 14px #fde047', duration: 0.3, stagger: 0.03 }, c + 2.8);
    IN(q('tvd'), c + 3.6, 0.5, { x: 40 * sx });
    tl.fromTo(all('#m1-tvd li'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.4 }, c + 4.1);

    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('rd'), c + 0.4, 0.5, { y: 30 }); IN(q('wv1'), c + 1.0, 0.2); pulse('#m1-wv1 .w', c + 1.0);
    IN(q('drv'), c + 1.2, 0.3); tl.fromTo(q('drv'), { x: 0 }, { x: 140 * sx, duration: 2.0, ease: 'none' }, c + 1.4);
    IN(q('rdd'), c + 2.4, 0.5, { y: 24 });
    IN(q('np'), c + 3.6, 0.5, { rotation: -8 }); SND('pop', c + 3.6);
    POP(q('nonet'), c + 4.6, 0.4);
    IN(q('npd'), c + 5.4, 0.5, { y: 24 });

    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('site'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#m1-site .l12-mix span'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.25, ease: 'back.out(2)' }, c + 0.9);
    tl.fromTo(all('#m1-site .cm'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 2.0);
    POP(q('back'), c + 2.6, 0.4); SND('tap', c + 2.6); IN(q('sd'), c + 3.0, 0.4, { y: 12 });
    IN(q('sns'), c + 3.8, 0.5, { y: 30 });
    tl.fromTo(all('#m1-sns .nd'), { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.18, ease: 'back.out(2)' }, c + 4.3);
    tl.fromTo(all('#m1-sns .n'), { textContent: 0 }, { textContent: 1250, snap: { textContent: 1 }, duration: 1.6 }, c + 4.3); SND('whoosh', c + 4.3);
    IN(q('nd'), c + 6.2, 0.4, { y: 12 });

    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('one'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#m1-one .ar1'), { x: -30 * sx }, { x: 30 * sx, duration: 0.6, yoyo: true, repeat: 3 }, c + 1.0);
    IN(q('two'), c + 2.6, 0.5, { y: 30 });
    tl.fromTo(all('#m1-two .ar2'), { scale: 1 }, { scale: 1.3, duration: 0.3, yoyo: true, repeat: 3, stagger: 0.3 }, c + 3.2);
    POP(q('trp'), c + 5.0, 0.5); SND('bad', c + 5.0);

    c = at(4);
    frame(4, c);
    leave(4, c);
    IN(q('web'), c + 0.4, 0.5, { x: -30 * sx });
    range(5).forEach((k) => { IN(q('g' + k), c + 1.0 + k * 0.8, 0.4, { x: 30 * sx }); SND('ok', c + 1.0 + k * 0.8); });

    c = at(5);
    frame(5, c);
    leave(5, c);
    range(3).forEach((k) => { IN(q('c' + k), c + 0.4 + k * 1.2, 0.5, { y: 30 }); SND('bad', c + 0.4 + k * 1.2); });
    tl.fromTo(all('#m1-c2 .f'), { width: '0%' }, { width: '100%', duration: 0.8 }, c + 3.0);
    tl.fromTo(all('#m1-c2 .s'), { width: '0%' }, { width: '30%', duration: 3.0, ease: 'none' }, c + 3.0);

    c = at(6);
    frame(6, c);
    leave(6, c);
    range(4).forEach((k) => {
      const t = c + 0.4 + k * 1.3;
      IN(q('pu' + k), t, 0.4, { x: -30 * sx });
      tl.fromTo(q('ln' + k), { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.5 }, t + 0.4);
      IN(q('me' + k), t + 0.8, 0.4, { x: 30 * sx }); SND('pop', t + 0.8);
    });

    c = at(7);
    frame(7, c);
    leave(7, c);
    range(3).forEach((k) => { IN(q('ch' + k), c + 0.4 + k * 1.0, 0.5, { y: 30 }); SND('pop', c + 0.4 + k * 1.0); if (k < 2) IN(q('ca' + k), c + 0.9 + k * 1.0, 0.3); });
    IN(q('aud'), c + 3.8, 0.5, { y: 24 });

    c = at(8);
    frame(8, c);
    leave(8, c);
    POP(q('nb'), c + 0.4, 0.5);
    range(2).forEach((k) => IN(q('r' + k), c + 1.2 + k * 0.6, 0.5, { y: 24 }));
    IN(q('t1'), c + 2.8, 0.4, { y: 12 }); IN(q('t2'), c + 3.4, 0.4, { y: 12 }); SND('bad', c + 3.4);

    const waves = (id) => () => gsap.timeline({ repeat: -1 }).fromTo(all(`#m1-${id} .w`), { opacity: 0.15 }, { opacity: 1, duration: 0.35, stagger: 0.25, yoyo: true, repeat: 1 });
    M.loop(0, 6.0, waves('wv0'));
    M.loop(1, 6.0, waves('wv1'));
    M.loop(1, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('drv'), { y: -6, duration: 0.3 }));
    M.loop(2, 6.8, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#m1-sns .nd'), { scale: 1.15, duration: 0.5, stagger: { each: 0.1, from: 'random' } }));
    M.loop(3, 5.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#m1-one .ar1'), { x: -24 * sx }, { x: 24 * sx, duration: 0.8, ease: 'sine.inOut' }));
    M.loop(4, 5.4, () => glowCycle(Q('g0 g1 g2 g3 g4'), 'rgba(52,211,153,.9)', 0.35));
    M.loop(5, 6.2, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#m1-c0 .l12-off'), { opacity: 0.4, duration: 0.6 }));
    M.loop(6, 5.8, () => glowCycle(Q('me0 me1 me2 me3'), 'rgba(56,189,248,.9)', 0.4));
    M.loop(7, 4.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(Q('ca0 ca1'), { x: 14 * sx, duration: 0.6, ease: 'sine.inOut' }));
    return M.done();
  });
})();

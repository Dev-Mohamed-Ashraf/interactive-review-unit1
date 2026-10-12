/* =========================================================
 * anims/movies-4-1.js — lesson 4-1 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   mediaMovie : TV · radio + newspaper · website + SNS · one-way vs
 *                two-way · website strengths · constraints · choosing by
 *                purpose · combining media
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const BROWSER = (w, h, inner) => `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="22" fill="#0f172a" stroke="#475569" stroke-width="4"/>
    <path d="M4 26 Q4 4 26 4 H${w - 26} Q${w - 4} 4 ${w - 4} 26 V62 H4Z" fill="#1e293b"/>
    <circle cx="30" cy="33" r="8" fill="#f87171"/><circle cx="56" cy="33" r="8" fill="#fbbf24"/><circle cx="82" cy="33" r="8" fill="#34d399"/>
    <rect x="112" y="16" width="${w - 140}" height="34" rx="17" fill="#0b1222"/>${inner || ''}`;
  const TV = `<path d="M200 10 L280 70 L360 10" fill="none" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
    <rect x="20" y="70" width="520" height="290" rx="26" fill="#1e293b" stroke="#94a3b8" stroke-width="6"/>
    <rect x="46" y="94" width="468" height="242" rx="14" fill="#0ea5e9"/><path d="M250 160 L330 215 L250 270Z" fill="#f8fafc"/>
    <rect x="230" y="360" width="100" height="22" rx="8" fill="#64748b"/>
    ${range(3).map((k) => `<circle class="wave w${k}" cx="280" cy="40" r="${40 + k * 34}" fill="none" stroke="#38bdf8" stroke-width="5" opacity="0"/>`).join('')}`;

  K.defineAnim('mediaMovie', (stage, props, api) => {
    const U = MK.uiL('m1-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-media mv-l41', prefix: 'm1-', beats: 9,
      html: (L) => `
  <div id="m1-stage" class="mv-stage">
    ${U.art('tv', 100, 200, 560, 400, '0 0 560 400', TV)}
    ${U.emo('vw', 700, 250, 520, 64, '👀 👀 👀 👀 👀')}
    ${U.pill('ow', 760, 400, '➡️ ' + L('من المرسل للمستقبل بس', 'from sender to receiver only'), 't-amber')}
    ${U.box('tvb', 1280, 200, 560, 't-blue', { ic: '📺', h: L('التلفزيون', 'TV'), y: L('فيديو + صوت', 'video + audio'), p: L('لناس كتير في نفس الوقت · النظر والسمع', 'many at once · sight and hearing'), s: '➡️ ' + L('اتجاه واحد', 'one-way') })}

    ${U.box('rad', 120, 190, 780, 't-amber', { ic: '📻', h: L('الراديو', 'Radio'), y: L('صوت بس', 'audio only'), p: L('السمع بس · في أي مكان وإنت بتعمل حاجة تانية', 'hearing only · anywhere, alongside other tasks'), s: '➡️ ' + L('اتجاه واحد', 'one-way') })}
    ${U.box('np', 1020, 190, 780, 't-slate', { ic: '📰', h: L('الجرنال', 'Newspaper'), y: L('نص + صور', 'text + images'), p: L('بيفضل مطبوع · بيتقري من غير إنترنت', 'stays printed · read without the Internet'), s: '➡️ ' + L('اتجاه واحد', 'one-way') })}
    ${U.pill('rr', 160, 540, '🚗 🎧 ' + L('بيتسمع وإنت سايق أو بتذاكر', 'heard while driving or studying'), 't-amber')}
    ${U.pill('nn', 1060, 540, '📵 ' + L('مش محتاج إنترنت', 'needs no Internet'), 't-slate')}

    ${U.box('web', 120, 190, 780, 't-blue', { ic: '🌐', h: L('الموقع', 'Website'), y: L('نص + صور + فيديو + صوت', 'text + images + video + audio'), p: L('يتحدّث في أي وقت · أساسًا اتجاه واحد', 'updatable any time · basically one-way'), s: '↩️ ' + L('وفيه تفاعل بالنماذج والتعليقات', 'plus interaction via forms and comments') })}
    ${U.box('sns', 1020, 190, 780, 't-pink', { ic: '💬', h: L('التواصل الاجتماعي', 'SNS'), y: L('نص + صور + فيديو + صوت', 'text + images + video + audio'), p: L('أسرع نشر للمعلومة · المستخدمين بينشروا ويشاركوا', 'fastest spread · users post and share'), s: '↔️ ' + L('في الاتجاهين', 'two-way') })}
    ${U.emo('sh', 1180, 540, 460, 64, '🔁 ❤️ 💬 🔁')}

    ${U.box('z1', 120, 180, 780, 't-amber', { h: '➡️ ' + L('اتجاه واحد', 'One-way') })}
    ${U.box('z2', 1020, 180, 780, 't-green', { h: '↔️ ' + L('في الاتجاهين', 'Two-way') })}
    ${[['📺 ' + L('التلفزيون', 'TV'), 0], ['📻 ' + L('الراديو', 'Radio'), 0], ['📰 ' + L('الجرنال', 'Newspaper'), 0], ['💬 ' + L('التواصل الاجتماعي — دايمًا', 'SNS — always'), 1], ['🌐 ' + L('الموقع — بالنماذج والتعليقات', 'Website — via forms and comments'), 1]]
      .map(([t, z], k) => U.pill('c' + k, z ? 1060 : 160, 300 + (z ? k - 3 : k) * 100, t, z ? 't-green' : 't-amber')).join('')}

    ${U.art('br', 80, 180, 600, 420, '0 0 600 420', BROWSER(600, 420, `<rect x="40" y="96" width="250" height="150" rx="14" fill="#38bdf8"/><path d="M60 230 L130 160 L180 200 L220 170 L270 230Z" fill="#0369a1"/>
      <rect x="320" y="96" width="240" height="26" rx="13" fill="#334155"/><rect x="320" y="140" width="200" height="26" rx="13" fill="#334155"/><rect x="320" y="184" width="220" height="26" rx="13" fill="#334155"/>
      <rect x="40" y="276" width="520" height="56" rx="14" fill="#1e293b" stroke="#475569" stroke-width="3"/><rect x="420" y="350" width="140" height="44" rx="22" fill="#2563eb"/>
      <g class="off" opacity="0"><rect x="4" y="4" width="592" height="412" rx="22" fill="#0f172a" opacity=".78"/><text x="300" y="240" text-anchor="middle" font-size="96">📵</text></g>`))}
    ${[L('① نص + صور + فيديو مع بعض', '① text + images + video together'), L('② يتحدّث في أي وقت 🔄', '② update any time 🔄'), L('③ من أي مكان في العالم 🌍', '③ from almost anywhere 🌍'),
      L('④ تفاعل بالنماذج والتعليقات ↔️', '④ two-way via forms and comments ↔️'), L('⑤ متصفح بس — من غير تسطيب', '⑤ just a browser — nothing to install')]
      .map((t, k) => U.pill('s' + k, 740, 190 + k * 92, '✅ ' + t, 't-green')).join('')}
    ${[L('① محتاج إنترنت عادةً 📶 (إلا لو الصفحة متخزّنة)', '① usually needs the Internet 📶 (unless cached)'), L('② المعلومة مابتوصلش إلا لو المستخدم دخل بنفسه 🚪', '② reaches users only if they visit 🚪'),
      L('③ العرض والسرعة بيختلفوا حسب الجهاز والشبكة 🐢', '③ display and speed vary by device and network 🐢')]
      .map((t, k) => U.pill('k' + k, 740, 230 + k * 120, '⚠️ ' + t, 't-red')).join('')}

    ${[[L('تبلّغ ناس كتير مرة واحدة', 'Inform many at once'), '📺 ' + L('تلفزيون · إعلانات التواصل', 'TV · SNS ads'), L('وصول واسع', 'wide reach')],
      [L('تقدّم معلومات مفصّلة', 'Give detailed information'), '🌐 ' + L('الموقع', 'Website'), L('مفيش حد للكمية · في أي وقت', 'no limit · any time')],
      [L('توصّل مباشرة لناس معيّنين', 'Reach specific people directly'), '✉️ ' + L('إيميل · رسايل مباشرة', 'email · direct messages'), L('توصيل فردي', 'one-to-one delivery')],
      [L('ينتشر بالتناقل', 'Spread by word of mouth'), '💬 ' + L('التواصل الاجتماعي', 'SNS'), L('الناس بتشارك بإرادتها', 'users share voluntarily')]]
      .map(([a, b, c], r) => U.pill('pa' + r, 80, 190 + r * 120, '🎯 ' + a, 't-slate') + U.pill('pm' + r, 700, 190 + r * 120, b, 't-blue') + U.pill('pr' + r, 1290, 190 + r * 120, c, 't-green')).join('')}

    ${U.box('ctv', 100, 230, 460, 't-blue', { ic: '📺', h: L('إعلان تلفزيوني', 'TV ad'), p: L('يجذب الانتباه', 'grabs attention') })}
    ${U.box('cweb', 730, 230, 460, 't-violet', { ic: '🌐', h: L('الموقع', 'Website'), p: L('التفاصيل الكاملة', 'the full details') })}
    ${U.box('csns', 1360, 230, 460, 't-pink', { ic: '💬', h: L('التواصل', 'SNS'), p: L('الناس تنشر', 'people share') })}
    ${U.emo('ar1', 600, 290, 90, 60, MK.RTL() ? '⬅️' : '➡️')}${U.emo('ar2', 1230, 290, 90, 60, MK.RTL() ? '⬅️' : '➡️')}
    ${U.pill('fam', 100, 560, '🏠 ' + L('عيلة من غير إنترنت؟ ← 📻 راديو · 📄 ملصق مطبوع', 'A family with no Internet? → 📻 radio · 📄 printed poster'), 't-amber')}

    ${U.hd(0, '📺 ' + L('التلفزيون', 'TV'))}
    ${U.hd(1, '📻 ' + L('الراديو', 'Radio') + ' · 📰 ' + L('الجرنال', 'Newspaper'))}
    ${U.hd(2, '🌐 ' + L('الموقع', 'Website') + ' · 💬 ' + L('التواصل الاجتماعي', 'SNS'))}
    ${U.hd(3, L('اتجاه واحد ↔ في الاتجاهين', 'One-way ↔ two-way'))}
    ${U.hd(4, '✅ ' + L('نقاط قوة المواقع', 'Strengths of websites'))}
    ${U.hd(5, '⚠️ ' + L('قيود المواقع', 'Constraints of websites'))}
    ${U.hd(6, '🎯 ' + L('اختار الوسيط حسب الغرض', 'Choose the medium by purpose'))}
    ${U.hd(7, '🔗 ' + L('عمليًا بنجمع الوسائط', 'In practice we combine media'))}
    ${U.nt(3, '⚠️ ' + L('«التلفزيون بيتيح تفاعل في الاتجاهين» ← غلط', '"TV allows two-way interaction" → false'), 'warn')}
    ${U.nt(6, L('مفيش وسيط أحسن في كل حاجة — الغرض والجمهور هما اللي بيحدّدوا', 'No medium is best for everything — purpose and audience decide'), 'ok')}
  </div>
  <div id="m1-recap" class="mv-recap">
    ${U.hd(8, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 200, '📺 ' + L('وصول واسع', 'wide reach') + ' · 📻 ' + L('صوت في أي مكان', 'sound anywhere') + ' · 📰 ' + L('من غير إنترنت', 'no Internet'), 't-amber')}
    ${U.pill('x1', 120, 310, '🌐 ' + L('الموقع: متنوع · يتحدّث — بس محتاج إنترنت ولازم يدخلوه', 'Website: diverse · updatable — but needs the Internet and a visit'), 't-blue')}
    ${U.pill('x2', 120, 420, '💬 ' + L('التواصل: أسرع نشر · في الاتجاهين', 'SNS: fastest spread · two-way'), 't-pink')}
    ${U.pill('x3', 120, 530, '🎯 ' + L('اختار حسب الغرض والجمهور… واجمع الوسائط', 'Choose by purpose and audience… and combine media'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#m1-' + id + ' .' + c);

    /* 0 — TV */
    let c = at(0);
    frame(0, c);
    IN(q('tv'), c + 0.4, 0.6, { y: 30 });
    range(3).forEach((k) => tl.fromTo(sel('tv', 'w' + k), { opacity: 0 }, { opacity: 0.9, duration: 0.3, yoyo: true, repeat: 3 }, c + 1.0 + k * 0.25));
    IN(q('vw'), c + 1.8, 0.5, { x: 40 * sx }); SND('pop', c + 1.8);
    IN(q('ow'), c + 2.8, 0.4, { y: 20 });
    IN(q('tvb'), c + 3.6, 0.5, { x: 40 * sx }); SND('ok', c + 3.6);

    /* 1 — radio + newspaper */
    c = at(1);
    frame(1, c);
    OUT(Q('tv vw ow tvb'), c, 0.4);
    IN(q('rad'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('rr'), c + 1.6, 0.4, { y: 20 });
    IN(q('np'), c + 2.6, 0.5, { y: 30 }); SND('pop', c + 2.6);
    IN(q('nn'), c + 3.6, 0.4, { y: 20 });

    /* 2 — website + SNS */
    c = at(2);
    frame(2, c);
    OUT(Q('rad np rr nn'), c, 0.4);
    IN(q('web'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('sns'), c + 2.0, 0.5, { y: 30 }); SND('pop', c + 2.0);
    IN(q('sh'), c + 3.0, 0.4); tl.fromTo(q('sh'), { scale: 1 }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, c + 3.4); SND('ok', c + 3.0);

    /* 3 — one-way vs two-way */
    c = at(3);
    frame(3, c, 5.6);
    OUT(Q('web sns sh'), c, 0.4);
    IN(q('z1'), c + 0.5, 0.4, { y: 20 }); IN(q('z2'), c + 0.7, 0.4, { y: 20 });
    range(5).forEach((k) => { POP(q('c' + k), c + 1.4 + k * 0.6, 0.4); SND('pop', c + 1.4 + k * 0.6); });

    /* 4 — website strengths */
    c = at(4);
    frame(4, c);
    OUT(Q('z1 z2 c0 c1 c2 c3 c4'), c, 0.4);
    IN(q('br'), c + 0.5, 0.5, { y: 30 });
    range(5).forEach((k) => { IN(q('s' + k), c + 1.2 + k * 0.7, 0.4, { x: 40 * sx }); SND('pop', c + 1.2 + k * 0.7); });

    /* 5 — website constraints */
    c = at(5);
    frame(5, c);
    OUT(Q('s0 s1 s2 s3 s4'), c, 0.4);
    tl.to(sel('br', 'off'), { opacity: 1, duration: 0.5 }, c + 0.6); SND('bad', c + 0.6);
    range(3).forEach((k) => { IN(q('k' + k), c + 1.2 + k * 0.9, 0.4, { x: 40 * sx }); SND('pop', c + 1.2 + k * 0.9); });

    /* 6 — choosing by purpose */
    c = at(6);
    frame(6, c, 6.6);
    OUT(Q('br k0 k1 k2'), c, 0.4);
    range(4).forEach((r) => {
      const t = c + 0.6 + r * 1.4;
      IN(q('pa' + r), t, 0.4, { x: 30 * sx }); IN(q('pm' + r), t + 0.4, 0.4, { x: 30 * sx }); IN(q('pr' + r), t + 0.8, 0.4, { x: 30 * sx });
      SND('pop', t + 0.4);
    });

    /* 7 — combining media */
    c = at(7);
    frame(7, c);
    OUT(Q('pa0 pm0 pr0 pa1 pm1 pr1 pa2 pm2 pr2 pa3 pm3 pr3'), c, 0.4);
    IN(q('ctv'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('ar1'), c + 1.4, 0.3);
    IN(q('cweb'), c + 1.8, 0.5, { y: 30 }); SND('pop', c + 1.8);
    IN(q('ar2'), c + 2.6, 0.3);
    IN(q('csns'), c + 3.0, 0.5, { y: 30 }); SND('pop', c + 3.0);
    PULSE(Q('ctv cweb csns'), c + 3.8, 'rgba(251,191,36,.8)', 2);
    IN(q('fam'), c + 5.0, 0.4, { y: 20 }); SND('ok', c + 5.0);

    /* 8 — recap */
    c = at(8);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd8'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

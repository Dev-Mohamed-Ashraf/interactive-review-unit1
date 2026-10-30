/* =========================================================
 * anims/movies-2-1.js — lesson 2-1 teacher-driven movies, drawn in the
 * lesson 1-2 look (MK.look · css/anims-movies-l12.css):
 *   keysMovie   (station https)   : one shared key → the key must travel (copied!) →
 *                                   open padlock + private key → public key is slow → use both
 *   mfaUseMovie (station auth)    : multi-factor authentication in real services
 *   signMovie   (station combine) : sign with the private key → verify with the public key →
 *                                   tampering caught → non-repudiation → the digital certificate
 *   stackMovie  (station combine) : one online purchase, four threats, four technologies
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow } = MK.look;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  /* a refusal wiggle (rotation, so it never touches the x an element has travelled) */
  const wiggle = (M, el, t) => M.tl.fromTo(el, { rotation: 0 }, { rotation: 5, duration: 0.06, yoyo: true, repeat: 7, ease: 'sine.inOut' }, t);

  const CHEST = `<path d="M12 72 Q12 20 100 20 Q188 20 188 72Z" fill="#b45309" stroke="#fbbf24" stroke-width="5"/>
    <rect x="12" y="66" width="176" height="92" rx="14" fill="#92400e" stroke="#fbbf24" stroke-width="5"/><rect x="12" y="98" width="176" height="12" fill="#78350f"/>`;
  /* a chest with an open / closed padlock on its front */
  const box = (P, B, id, x, y) => `<div id="${P}${id}" class="l12u l12-boxw later" style="${B.at(x, y, 190, 160)}"><svg viewBox="0 0 200 170">${CHEST}</svg><span class="lk o">🔓</span><span class="lk c">🔒</span></div>`;
  const ROAD = (W) => `<path d="M0 15 H${W}" stroke="#64748b" stroke-width="6" stroke-dasharray="22 16" stroke-linecap="round"/>`;

  /* ═════════════════════════ keysMovie ═════════════════════════ */
  K.defineAnim('keysMovie', (stage, props, api) => {
    const P = 'ky-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-ky mv-l12', prefix: P, beats: 5, cast: { ah: 'user', st: 'server', hk: 'hacker' },
      html: (L) => {
        const msg = '✉️ «' + L('ميعادنا الساعة 5', 'meet at 5') + '»';
        return `
  <div id="ky-stage" class="mv-stage">
    ${B.svg('road', 300, 686, 1320, 30, '0 0 1320 30', ROAD(1320))}
    ${B.ch('ah', 70, 410, 'md')}${B.ch('st', 1630, 410, 'md')}${B.ch('hk', 860, 236, 'sm')}
    ${B.chip('ahl', 70, 700, '👦 ' + L('أحمد', 'Ahmed'), 'c-blue', 220)}
    ${B.chip('stl', 1630, 700, '🏪 ' + L('المتجر', 'The shop'), 'c-green', 220)}
    ${box(P, B, 'bx', 320, 530)}
    <div id="ky-msg" class="l12u l12-doc later" style="${B.at(320, 330, 400)}">${msg}</div>
    <div id="ky-msg2" class="l12u l12-doc later" style="${B.at(1180, 420, 400)}">${msg}</div>
    ${B.big('k1', 360, 228, 80, 66, '🔑')}${B.big('k2', 1480, 228, 80, 66, '🔑')}
    ${B.big('k3', 330, 604, 80, 56, '🔑')}${B.big('k4', 880, 604, 80, 56, '🔑')}
    ${B.mid('kl', 126, '🔑 ' + L('مفتاح واحد مشترك: نفس المفتاح بيقفل وبيفتح', 'one shared key: the same key locks and unlocks'), 'c-amber big')}
    ${B.mid('fast', 206, '⚡ ' + L('سريع جدًا — مناسب لكميات كبيرة من البيانات', 'very fast — good for large amounts of data'), 'c-green')}
    ${B.mid('q1', 126, '❓ ' + L('بس المتجر هيجيب نسخة من المفتاح إزاي؟', 'but how does the shop get a copy of the key?'), 'c-slate big')}
    ${B.chip('cpy', 1060, 330, '📋 ' + L('نسخ المفتاح!', 'copied the key!'), 'c-red')}
    ${B.chip('leak', 1060, 250, '😈 «' + L('ميعادنا الساعة 5', 'meet at 5') + '»', 'c-red')}
    ${B.stamp('st1', 320, 408, '😱 ' + L('كل الرسايل اتكشفت!', 'every message exposed!'))}

    ${B.mid('pbl', 126, '🔓 ' + L('المفتاح العام = قفل مفتوح… أي حد ياخده', 'the public key = an open padlock… anyone may take one'), 'c-violet big')}
    ${B.big('pk', 1480, 228, 80, 66, '🗝️')}
    ${B.chip('pkl', 1340, 326, '🗝️ ' + L('مفتاح خاص: مع المتجر بس', 'private key: only the shop has it'), 'c-violet')}
    ${B.big('pl1', 1480, 228, 80, 66, '🔓')}${B.big('pl2', 1480, 228, 80, 66, '🔓')}
    ${B.chip('no1', 540, 330, '❌ ' + L('مايقدرش يفتحه', 'cannot open it'), 'c-red')}

    <div id="ky-race" class="l12u l12-card c-slate later" style="${B.at(320, 150, 1280, 370)}"><span class="h">📦 ${L('نفس الملف الكبير (فيديو 1 جيجا)', 'the same big file (a 1 GB video)')}</span>
      <div class="l12-pr"><b>🔑 ${L('متماثل', 'common key')}</b><span class="l12-bar o"><i id="ky-ra" style="width:100%"></i></span><em id="ky-sa">✅ ${L('خلص', 'done')}</em></div>
      <div class="l12-pr"><b>🔓 ${L('مفتاح عام', 'public key')}</b><span class="l12-bar s"><i id="ky-rb" style="width:18%"></i></span><em id="ky-sb">🐢 ${L('لسه…', 'still…')}</em></div></div>
    ${B.card('cmpA', 320, 550, 620, 0, 'c-blue', { row: true, ic: '🔑', h: L('المتماثل', 'Common key'), p: L('سريع ⚡ — بس توصيل المفتاح خطر', 'fast ⚡ — but sending the key is risky') })}
    ${B.card('cmpB', 980, 550, 620, 0, 'c-violet', { row: true, ic: '🔓', h: L('المفتاح العام', 'Public key'), p: L('توصيل آمن 🔒 — بس بطيء 🐢', 'safe delivery 🔒 — but slow 🐢') })}

    ${B.mid('fA', 126, '🔓 ' + L('المفتاح العام ← يوصّل المفتاح بأمان', 'public key → delivers the key safely'), 'c-violet')}
    ${B.mid('fB', 204, '🔑 ' + L('المفتاح المتماثل ← يبعت البيانات الكتير بسرعة', 'common key → sends lots of data quickly'), 'c-blue')}
    ${B.mid('fC', 282, '✅ ' + L('أمان + سرعة', 'security + speed'), 'c-green solid big')}
    ${B.big('sk', 340, 380, 80, 66, '🔑')}${B.big('skA', 360, 300, 80, 66, '🔑')}${B.big('skB', 1480, 300, 80, 66, '🔑')}
    ${range(5).map((k) => B.big('pk' + k, 330, 604, 70, 48, '📦')).join('')}
    ${B.mid('dh', 380, 'ℹ️ ' + L('إصدارات TLS الحديثة بتتفق على المفتاح المشترك بطريقة اسمها Diffie-Hellman', 'current TLS versions agree on the shared key with Diffie-Hellman instead'), 'c-slate sm')}

    ${U.hd(0, '🔑 ' + L('النوع الأول: التشفير المتماثل', 'Type 1: common-key (symmetric) cryptography'))}
    ${U.hd(1, '😈 ' + L('المشكلة: المفتاح نفسه لازم يسافر', 'The problem: the key itself must travel'))}
    ${U.hd(2, '🔓 ' + L('النوع التاني: التشفير بالمفتاح العام', 'Type 2: public-key cryptography'))}
    ${U.hd(3, '🐢 ' + L('بس المفتاح العام بطيء على البيانات الكتير', 'But public-key is slow on lots of data'))}
    ${U.hd(4, '🤝 ' + L('الحل: ناخد أحسن ما في الاتنين', 'The fix: take the best of both'))}
    ${U.nt(0, L('التشفير المتماثل: نفس المفتاح للتشفير وفك التشفير', 'common-key cryptography: the same key encrypts and decrypts'), 'ok')}
    ${U.nt(1, L('لازم المفتاح يوصل للطرف التاني الأول بأمان — ولو اتسرق في السكة، كل حاجة تتكشف', 'the key must first reach the other side safely — stolen on the way, everything is exposed'), 'warn')}
    ${U.nt(2, L('العام بيقفل · الخاص بس بيفتح ← تبعت سر من غير ما تتفقوا على مفتاح قبل كده', 'the public key locks · only the private key unlocks → send a secret with no key agreed beforehand'), 'ok')}
    ${U.nt(4, L('ده بالظبط اللي HTTPS بيعمله — تعالى نشوفه مرحلة مرحلة 👇', 'that is exactly what HTTPS does — let’s watch it stage by stage 👇'), 'ok')}
  </div>`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const lock = (t, closed) => {
      tl.to(all('#ky-bx .lk.o'), { opacity: closed ? 0 : 1, duration: 0.15 }, t);
      tl.fromTo(all('#ky-bx .lk.c'), { scale: 1.5 }, { opacity: closed ? 1 : 0, scale: 1, duration: 0.3, ease: 'back.out(2)' }, t);
      SND('tap', t);
    };
    const reset = (t) => { tl.set(q('bx'), { x: 0 }, t); tl.set(all('#ky-bx .lk.o'), { opacity: 1 }, t); tl.set(all('#ky-bx .lk.c'), { opacity: 0 }, t); };
    const drop = (el, t) => tl.to(el, { y: 200, scale: 0.4, opacity: 0, duration: 0.5, ease: 'power2.in' }, t);

    /* 0 — one shared key */
    let c = at(0);
    frame(0, c, 8.2);
    IN(Q('ah st'), c + 0.3, 0.5, { y: 20 }); IN(Q('ahl stl road'), c + 0.5, 0.4);
    IN(q('kl'), c + 0.8, 0.4, { y: -16 });
    POP(q('k1'), c + 1.2, 0.4); POP(q('k2'), c + 1.4, 0.4); SND('pop', c + 1.2);
    glow(M, Q('k1 k2'), c + 1.8, 'rgba(251,191,36,.95)');
    IN(Q('msg bx'), c + 2.0, 0.4, { y: 16 });
    drop(q('msg'), c + 2.6);
    tl.to(q('k1'), { x: 15 * sx, y: 320, duration: 0.5, ease: 'power2.inOut' }, c + 3.1);
    tl.to(q('k1'), { rotation: 90, duration: 0.2 }, c + 3.6);
    lock(c + 3.8, true);
    tl.to(q('k1'), { x: 0, y: 0, rotation: 0, duration: 0.4 }, c + 4.0);
    tl.to(q('bx'), { x: 1100 * sx, duration: 1.5, ease: 'power1.inOut' }, c + 4.3);
    tl.to(q('k2'), { x: 35 * sx, y: 320, duration: 0.5, ease: 'power2.inOut' }, c + 5.9);
    tl.to(q('k2'), { rotation: 90, duration: 0.2 }, c + 6.4);
    lock(c + 6.6, false);
    POP(q('msg2'), c + 6.9, 0.45); SND('ok', c + 6.9);
    IN(q('fast'), c + 7.4, 0.4, { y: -10 });

    /* 1 — the key must travel… and gets copied */
    c = at(1);
    frame(1, c, 7.8);
    OUT(Q('kl fast msg2 k2'), c, 0.3);
    reset(c + 0.3); tl.set(q('k2'), { x: 0, y: 0, rotation: 0 }, c + 0.3); tl.set(q('msg'), { y: 0, scale: 1 }, c + 0.3);
    IN(q('q1'), c + 0.5, 0.4, { y: -16 });
    IN(q('hk'), c + 0.7, 0.5, { y: -30 });
    IN(q('k3'), c + 1.2, 0.3);
    tl.to(q('k3'), { x: 1120 * sx, duration: 2.0, ease: 'none' }, c + 1.4);
    OUT(q('k3'), c + 3.4, 0.2); POP(q('k2'), c + 3.5, 0.4);
    POP(q('k4'), c + 2.3, 0.3);
    tl.to(q('k4'), { x: 120 * sx, y: -330, duration: 0.6, ease: 'power2.out' }, c + 2.6);
    POP(q('cpy'), c + 2.9, 0.4); SND('bad', c + 2.9);
    IN(q('msg'), c + 3.8, 0.3); drop(q('msg'), c + 4.2);
    lock(c + 4.6, true);
    tl.to(q('bx'), { x: 600 * sx, duration: 0.9, ease: 'power1.inOut' }, c + 4.9);
    tl.to(q('k4'), { x: 135 * sx, y: -24, duration: 0.5, ease: 'power2.in' }, c + 5.9);
    lock(c + 6.4, false); SND('bad', c + 6.4);
    POP(q('leak'), c + 6.6, 0.4);
    stampIn(M, q('st1'), c + 7.0);

    /* 2 — public key: an open padlock for anyone, the private key stays home */
    c = at(2);
    frame(2, c, 8.4);
    OUT(Q('q1 cpy leak st1 k4 k2 k1'), c, 0.3);
    reset(c + 0.3); tl.set(q('k4'), { x: 0, y: 0 }, c + 0.3); tl.set(q('msg'), { y: 0, scale: 1 }, c + 0.3);
    IN(q('pbl'), c + 0.5, 0.4, { y: -16 });
    POP(q('pk'), c + 0.9, 0.4); IN(q('pkl'), c + 1.1, 0.4, { y: 12 });
    POP(q('pl1'), c + 1.6, 0.3); tl.to(q('pl1'), { x: -1120 * sx, duration: 0.9, ease: 'power2.inOut' }, c + 1.8);
    POP(q('pl2'), c + 2.2, 0.3); tl.to(q('pl2'), { x: -420 * sx, y: 20, duration: 0.7, ease: 'power2.inOut' }, c + 2.4); SND('whoosh', c + 1.8);
    IN(q('msg'), c + 3.0, 0.3); drop(q('msg'), c + 3.3);
    tl.to(q('pl1'), { x: -1085 * sx, y: 356, scale: 0.6, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 3.8);
    lock(c + 4.3, true);
    tl.to(q('bx'), { x: 600 * sx, duration: 0.9, ease: 'power1.inOut' }, c + 4.6);
    wiggle(M, q('bx'), c + 5.6); POP(q('no1'), c + 5.7, 0.4); SND('bad', c + 5.7);
    tl.to(q('bx'), { x: 1100 * sx, duration: 0.8, ease: 'power1.inOut' }, c + 6.3);
    tl.to(q('pk'), { x: 35 * sx, y: 356, duration: 0.5, ease: 'power2.inOut' }, c + 7.2);
    lock(c + 7.7, false);
    POP(q('msg2'), c + 7.9, 0.4); SND('ok', c + 7.9);

    /* 3 — public key is slow on big data */
    c = at(3);
    frame(3, c);
    OUT(Q('pbl pk pkl pl2 no1 msg2 bx road hk'), c, 0.3);
    IN(q('race'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(q('ra'), { width: '0%' }, { width: '100%', duration: 1.0, ease: 'power1.in' }, c + 1.2);
    tl.fromTo(q('rb'), { width: '0%' }, { width: '18%', duration: 4.5, ease: 'none' }, c + 1.2);
    tl.fromTo(q('sa'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 2.3); SND('ok', c + 2.3);
    tl.fromTo(q('sb'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 5.8); SND('bad', c + 5.8);
    IN(q('cmpA'), c + 6.2, 0.5, { y: 24 }); IN(q('cmpB'), c + 6.8, 0.5, { y: 24 });

    /* 4 — HTTPS uses both */
    c = at(4);
    frame(4, c, 8.4);
    OUT(Q('race cmpA cmpB'), c, 0.3);
    reset(c + 0.3); tl.set(q('pk'), { x: 0, y: 0 }, c + 0.3); tl.set(q('pl1'), { x: -1120 * sx, y: 0, scale: 1 }, c + 0.3);
    IN(Q('road bx'), c + 0.4, 0.4); IN(q('pl1'), c + 0.6, 0.3); IN(q('pk'), c + 0.6, 0.3);
    IN(q('fA'), c + 0.6, 0.4, { y: -16 });
    POP(q('sk'), c + 1.0, 0.4);
    tl.to(q('sk'), { x: 60 * sx, y: 190, scale: 0.4, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 1.5);
    tl.to(q('pl1'), { x: -1085 * sx, y: 356, scale: 0.6, opacity: 0, duration: 0.5, ease: 'power2.in' }, c + 2.0);
    lock(c + 2.5, true);
    tl.to(q('bx'), { x: 1100 * sx, duration: 1.4, ease: 'power1.inOut' }, c + 2.7);
    tl.to(q('pk'), { x: 35 * sx, y: 356, duration: 0.5, ease: 'power2.inOut' }, c + 4.1);
    lock(c + 4.6, false); SND('ok', c + 4.6);
    POP(q('skA'), c + 5.0, 0.4); POP(q('skB'), c + 5.0, 0.4);
    IN(q('fB'), c + 5.3, 0.4, { y: -16 });
    range(5).forEach((k) => {
      tl.fromTo(q('pk' + k), { opacity: 0, x: 0 }, { opacity: 1, x: 1150 * sx, duration: 0.7, ease: 'power1.in' }, c + 5.8 + k * 0.15);
      tl.to(q('pk' + k), { opacity: 0, duration: 0.1 }, c + 6.5 + k * 0.15);
    });
    POP(q('fC'), c + 6.9, 0.5); SND('ok', c + 6.9);
    IN(q('dh'), c + 7.6, 0.4);

    /* living loops */
    M.loop(0, 8.0, () => M.breathe(Q('k1 k2'), 1.12, 1.1));
    M.loop(1, 7.6, () => M.breathe(q('leak'), 1.06, 0.9));
    M.loop(1, 7.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('k4'), { rotation: 18, duration: 0.6, ease: 'sine.inOut' }));
    M.loop(2, 8.2, () => M.glowLoop(q('pkl'), 'rgba(167,139,250,.95)', 1.0));
    M.loop(3, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('rb'), { opacity: 0.55, duration: 0.8 }));
    M.loop(4, 8.2, () => gsap.timeline({ repeat: -1, repeatDelay: 0.3 }).fromTo(Q('pk0 pk1 pk2 pk3 pk4'), { opacity: 0, x: 0 }, { opacity: 1, x: 1150 * sx, duration: 0.8, ease: 'power1.in', stagger: 0.18 }).to(Q('pk0 pk1 pk2 pk3 pk4'), { opacity: 0, duration: 0.1, stagger: 0.18 }, 0.8));
    return M.done();
  });

  /* ═════════════════════════ mfaUseMovie ═════════════════════════ */
  K.defineAnim('mfaUseMovie', (stage, props, api) => {
    const P = 'mu-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-mu mv-l12', prefix: P, beats: 2,
      html: (L) => {
        const KN = L('معرفة', 'knowledge'), PO = L('حيازة', 'possession'), BI = L('حيوية', 'biometric');
        const f = (cls, txt, type) => `<span class="f ${cls}"><b>${txt}</b><i>${type}</i></span>`;
        const PLUS = '<span class="plus">+</span>';
        const SV = [
          ['🏦', L('البنك أونلاين', 'Online banking'), f('k', '🔑 ' + L('كلمة سر', 'password'), KN) + PLUS + f('p', '🔢 ' + L('كلمة سر لمرة واحدة', 'one-time password'), PO), 'c-blue'],
          ['💬', L('السوشيال ميديا', 'Social media'), f('k', '🔑 ' + L('كلمة سر', 'password'), KN) + PLUS + f('p', '📩 ' + L('كود SMS', 'SMS code'), PO), 'c-violet'],
          ['🛒', L('التسوّق أونلاين', 'Online shopping'), f('k', '🔑 ' + L('كلمة سر', 'password'), KN) + PLUS + f('p', '💳 ' + L('كود <bdi>3-D Secure</bdi>', '<bdi>3-D Secure</bdi> code'), PO), 'c-amber'],
          ['💼', L('لابتوب الشركة', 'Company laptop'), f('p', '🪪 ' + L('كارت ذكي', 'smart card'), PO) + PLUS + f('b', '👆 ' + L('بصمة', 'fingerprint'), BI), 'c-teal']];
        return `
  <div id="mu-stage" class="mv-stage">
    ${SV.map(([ic, h, facts, cc], k) => B.card('s' + k, 70 + (k % 2) * 910, 128 + Math.floor(k / 2) * 280, 870, 262, cc, { ic, h, html: `<div class="l12-facts">${facts}</div>` })).join('')}
    ${B.mid('lg', 694, `<span class="l12-key k">🧠 ${KN}</span> ${L('حاجة إنت عارفها', 'something you know')} · <span class="l12-key p">📱 ${PO}</span> ${L('حاجة معاك', 'something you have')} · <span class="l12-key b">👆 ${BI}</span> ${L('حاجة هي إنت', 'something you are')}`, 'c-slate')}
    ${U.hd(0, '🏦 ' + L('المصادقة متعددة العوامل في خدمات حقيقية', 'Multi-factor authentication in real services'))}
    ${U.hd(1, '🛡️ ' + L('عامل اتكسر؟ التاني لسه بيقفل الباب', 'One factor broken? The other still locks the door'))}
    ${U.nt(1, L('كل خدمة بتجمع عاملين من نوعين مختلفين — لو واحد اتكسر، التاني بيمنع الدخول', 'each service combines two DIFFERENT kinds of factor — if one breaks, the other still blocks the way in'), 'ok')}
  </div>`;
      },
    });
    const { q, Q, tl, IN, OUT, SND, frame } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    let c = at(0);
    frame(0, c);
    range(4).forEach((k) => {
      IN(q('s' + k), c + 0.5 + k * 0.7, 0.5, { y: 30 }); SND('pop', c + 0.5 + k * 0.7);
      tl.fromTo(all(`#mu-s${k} .f`), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.3, ease: 'back.out(2)' }, c + 0.9 + k * 0.7);
    });
    IN(q('lg'), c + 4.2, 0.5, { y: 20 });
    c = at(1);
    frame(1, c, 5.6);
    OUT(q('lg'), c, 0.3);
    tl.to(all('#mu-stage .f:first-child'), { opacity: 0.35, filter: 'grayscale(1)', duration: 0.4 }, c + 0.8);
    tl.fromTo(all('#mu-stage .f:first-child'), { x: 0 }, { x: 6, duration: 0.06, yoyo: true, repeat: 7 }, c + 0.8); SND('bad', c + 0.8);
    tl.to(all('#mu-stage .f:last-child'), { filter: 'drop-shadow(0 0 18px rgba(52,211,153,.95))', duration: 0.4, yoyo: true, repeat: 3 }, c + 2.2); SND('ok', c + 2.4);
    M.loop(1, 4.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#mu-stage .f:last-child'), { filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' }, { filter: 'drop-shadow(0 0 16px rgba(52,211,153,.9))', duration: 1.0, ease: 'sine.inOut' }));
    return M.done();
  });

  /* ═════════════════════════ signMovie ═════════════════════════ */
  K.defineAnim('signMovie', (stage, props, api) => {
    const P = 'sg-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-sg mv-l12', prefix: P, beats: 5, cast: { ah: 'user', st: 'server', hk: 'hacker', ca: 'clerk' },
      html: (L) => `
  <div id="sg-stage" class="mv-stage">
    ${B.svg('road', 300, 686, 1320, 30, '0 0 1320 30', ROAD(1320))}
    ${B.ch('ah', 70, 410, 'md')}${B.ch('st', 1630, 410, 'md')}${B.ch('hk', 860, 262, 'sm')}
    ${B.chip('ahl', 70, 700, '👦 ' + L('أحمد', 'Ahmed'), 'c-blue', 220)}
    ${B.chip('stl', 1630, 700, '🏪 ' + L('المتجر', 'The shop'), 'c-green', 220)}
    <div id="sg-od" class="l12u l12-doc later" style="${B.at(330, 500, 330)}">🧾 ${L('طلب شراء', 'Purchase order')}<small>${L('من: أحمد', 'from: Ahmed')}</small>${L('المبلغ:', 'amount:')} <span id="sg-a1" class="amt">100</span><span id="sg-a2" class="amt bad" style="display:none">900</span> ${L('جنيه', 'EGP')}<span id="sg-sl" class="seal later">🔏</span></div>
    ${B.big('pkA', 120, 250, 80, 66, '🗝️')}
    ${B.chip('pkl', 300, 300, '🗝️ ' + L('مفتاح أحمد الخاص: معاه هو بس', 'Ahmed’s private key: only he has it'), 'c-violet')}
    ${B.mid('dir', 126, '⚠️ ' + L('الاتجاه معكوس عن التشفير: الخاص بيوقّع · العام بيتحقّق', 'reversed vs encryption: the private key signs · the public key verifies'), 'c-amber big')}
    ${B.big('pub', 1480, 250, 80, 66, '🔓')}
    ${B.chip('publ', 1250, 330, '🔓 ' + L('مفتاح أحمد العام: مع الكل', 'Ahmed’s public key: everyone has it'), 'c-violet')}
    ${B.mid('v1', 206, '✅ ' + L('التوقيع سليم ← الطلب ماتغيّرش + اللي بعته أحمد فعلًا', 'valid signature → the order is unchanged + Ahmed really sent it'), 'c-green')}
    ${B.big('pen', 1060, 300, 80, 66, '✏️')}
    ${B.mid('v2', 126, '❌ ' + L('التوقيع مش مطابق ← في تلاعب!', 'signature does not match → tampering!'), 'c-red')}
    ${B.mid('v3', 196, '🎭 ' + L('ولو حد وقّع بمفتاح غير مفتاح أحمد ← انتحال هوية المرسِل بيتكشف', 'and a signature made with any other key → sender impersonation is caught'), 'c-red')}
    ${B.chip('bub', 300, 300, '🙄 «' + L('أنا مابعتّش الطلب ده!', 'I never sent that order!') + '»', 'c-slate big')}
    ${B.mid('v4', 206, '🗝️ ' + L('التوقيع ده ماطلعش غير من مفتاحك الخاص', 'only your private key could make this signature'), 'c-violet')}
    ${B.stamp('nr', 760, 380, '✓ ' + L('عدم التنصل', 'non-repudiation'), true)}

    ${B.ch('ca', 870, 140, 'sm')}
    ${B.mid('cal', 386, '🏛️ ' + L('جهة إصدار الشهادات (CA)', 'Certificate authority (CA)'), 'c-amber')}
    <div id="sg-w1" class="l12u l12-win later" style="${B.at(70, 150, 680, 360)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🔒 bank.com.eg</span></div><div class="wbody">🏦 ${L('البنك الحقيقي', 'The real bank')}<div class="l12-field">📜 ${L('شهادة رقمية سليمة', 'valid digital certificate')} <b>✓</b></div><div class="l12-field">✍️ ${L('موقّعة من جهة الشهادات', 'signed by the CA')} <b>✓</b></div></div></div>
    <div id="sg-w2" class="l12u l12-win fake later" style="${B.at(1170, 150, 680, 360)}"><div class="wbar"><i></i><i></i><i></i><span class="url">⚠️ bank-eg.xyz</span></div><div class="wbody">🎭 ${L('شكله زي البنك…', 'looks like the bank…')}<div class="l12-field">📜 ${L('مفيش شهادة سليمة', 'no valid certificate')} <b>✗</b></div></div></div>
    ${B.stamp('fk', 1240, 470, '🚫 ' + L('موقع مزيّف!', 'fake site!'))}
    ${B.mid('cd', 610, '📜 ' + L('الشهادة الرقمية بتثبت إن الطرف التاني حقيقي', 'the digital certificate proves the other side is genuine'), 'c-green big')}

    ${U.hd(0, '✍️ ' + L('التوقيع الرقمي: أحمد بيوقّع بمفتاحه الخاص', 'Digital signature: Ahmed signs with his private key'))}
    ${U.hd(1, '✅ ' + L('المتجر بيتحقّق بالمفتاح العام بتاع أحمد', 'The shop verifies with Ahmed’s public key'))}
    ${U.hd(2, '✏️ ' + L('لو حد غيّر رقم واحد في السكة…', 'If someone changes one digit on the way…'))}
    ${U.hd(3, '🙅‍♂️ ' + L('عدم التنصل', 'Non-repudiation'))}
    ${U.hd(4, '📜 ' + L('الشهادة الرقمية: الموقع ده حقيقي؟', 'The digital certificate: is this site genuine?'))}
    ${U.nt(2, L('التوقيع الرقمي بيكشف التلاعب في البيانات وانتحال هوية المرسِل', 'a digital signature detects data tampering and sender impersonation'), 'ok')}
    ${U.nt(3, L('عدم التنصل = المرسِل مايقدرش ينكر بعد كده إنه بعت', 'non-repudiation = the sender cannot later deny having sent it'), 'ok')}
  </div>`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const sendDoc = (t, dx, d) => tl.to(q('od'), { x: dx * sx, duration: d || 1.4, ease: 'power1.inOut' }, t);

    /* 0 — Ahmed signs with his private key */
    let c = at(0);
    frame(0, c);
    IN(Q('ah st'), c + 0.3, 0.5, { y: 20 }); IN(Q('ahl stl road'), c + 0.5, 0.4);
    IN(q('od'), c + 0.9, 0.5, { y: 20 });
    POP(q('pkA'), c + 1.5, 0.4); IN(q('pkl'), c + 1.7, 0.4, { y: 10 }); SND('pop', c + 1.5);
    tl.to(q('pkA'), { x: 420 * sx, y: 350, scale: 0.6, duration: 0.6, ease: 'power2.inOut' }, c + 2.6);
    tl.fromTo(q('sl'), { opacity: 0, scale: 2.2 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 3.2); SND('tap', c + 3.2);
    tl.to(q('pkA'), { x: 0, y: 0, scale: 1, duration: 0.5 }, c + 3.5);
    IN(q('dir'), c + 4.2, 0.5, { y: -16 });
    sendDoc(c + 5.2, 920, 1.6);

    /* 1 — the shop verifies with Ahmed's public key */
    c = at(1);
    frame(1, c);
    OUT(q('pkl'), c, 0.3);
    POP(q('pub'), c + 0.5, 0.4); IN(q('publ'), c + 0.7, 0.4, { y: 10 });
    tl.to(q('pub'), { x: -130 * sx, y: 280, scale: 0.7, duration: 0.6, ease: 'power2.inOut' }, c + 1.6);
    glow(M, q('od'), c + 2.3, 'rgba(56,189,248,.95)');
    tl.to(q('pub'), { x: 0, y: 0, scale: 1, duration: 0.5 }, c + 3.0);
    IN(q('v1'), c + 3.2, 0.4, { y: -12 }); SND('ok', c + 3.2);
    glow(M, q('od'), c + 3.4, 'rgba(52,211,153,.95)');

    /* 2 — tampering on the way */
    c = at(2);
    frame(2, c, 7.4);
    OUT(Q('dir v1 pub publ'), c, 0.3);
    tl.set(q('od'), { x: 0 }, c + 0.3);
    IN(q('hk'), c + 0.5, 0.5, { y: -30 });
    sendDoc(c + 1.0, 560, 1.0);
    POP(q('pen'), c + 2.1, 0.4);
    tl.to(q('pen'), { y: 200, x: -40 * sx, duration: 0.4 }, c + 2.4);
    tl.set(q('a1'), { display: 'none' }, c + 2.8); tl.set(q('a2'), { display: 'inline-block' }, c + 2.8); SND('bad', c + 2.8);
    tl.fromTo(q('a2'), { scale: 1.8 }, { scale: 1, duration: 0.3 }, c + 2.8);
    tl.to(q('pen'), { y: 0, x: 0, opacity: 0, duration: 0.3 }, c + 3.1);
    sendDoc(c + 3.5, 920, 0.8);
    wiggle(M, q('od'), c + 4.5);
    IN(q('v2'), c + 4.6, 0.4, { y: -12 }); SND('bad', c + 4.6);
    IN(q('v3'), c + 5.8, 0.4, { y: -12 });

    /* 3 — non-repudiation */
    c = at(3);
    frame(3, c, 6.8);
    OUT(Q('v2 v3 hk'), c, 0.3);
    tl.set(q('a2'), { display: 'none' }, c + 0.3); tl.set(q('a1'), { display: 'inline-block' }, c + 0.3);
    POP(q('bub'), c + 0.8, 0.5); SND('pop', c + 0.8);
    glow(M, q('sl'), c + 2.0, 'rgba(248,113,113,.95)');
    IN(q('v4'), c + 2.4, 0.4, { y: -12 });
    stampIn(M, q('nr'), c + 3.6); SND('ok', c + 3.6);

    /* 4 — the digital certificate */
    c = at(4);
    frame(4, c, 7.2);
    OUT(Q('bub v4 nr od ah st ahl stl road pkA'), c, 0.4);
    IN(q('ca'), c + 0.5, 0.5, { y: -20 }); IN(q('cal'), c + 0.8, 0.4, { y: 12 });
    IN(q('w1'), c + 1.3, 0.5, { x: -40 * sx }); IN(q('w2'), c + 1.7, 0.5, { x: 40 * sx });
    tl.fromTo(all('#sg-w1 .l12-field'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.4 }, c + 2.4); SND('ok', c + 2.8);
    glow(M, q('w1'), c + 3.2, 'rgba(52,211,153,.95)');
    tl.fromTo(all('#sg-w2 .l12-field'), { opacity: 0, x: -20 * sx }, { opacity: 1, x: 0, duration: 0.35 }, c + 3.8);
    stampIn(M, q('fk'), c + 4.4); SND('bad', c + 4.4);
    IN(q('cd'), c + 5.6, 0.5, { y: 20 });

    /* living loops */
    M.loop(0, 7.0, () => M.breathe(q('sl'), 1.12, 0.9));
    M.loop(1, 4.0, () => M.glowLoop(q('v1'), 'rgba(52,211,153,.8)', 1.1));
    M.loop(2, 6.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(q('a2'), { scale: 1.2, duration: 0.6, ease: 'sine.inOut' }));
    M.loop(3, 4.4, () => M.breathe(q('nr'), 1.06, 1.0));
    M.loop(4, 6.4, () => M.breathe(q('fk'), 1.06, 0.9));
    return M.done();
  });

  /* ═════════════════════════ stackMovie ═════════════════════════ */
  K.defineAnim('stackMovie', (stage, props, api) => {
    const P = 'sk-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-sk mv-l12', prefix: P, beats: 6, cast: { us: 'user', hk: 'hacker' },
      html: (L) => {
        const STEPS = [[L('فتح الموقع', 'open the shop'), '👂 ' + L('خطر: التنصّت', 'threat: eavesdropping'), '🔐 ' + L('التشفير (HTTPS)', 'encryption (HTTPS)')],
          [L('التأكد من الموقع', 'check the site'), '🎭 ' + L('خطر: موقع مزيّف', 'threat: a fake site'), '📜 ' + L('الشهادة الرقمية', 'digital certificate')],
          [L('تسجيل الدخول', 'log in'), '🔓 ' + L('خطر: دخول غير مصرّح', 'threat: unauthorized login'), '📱 ' + L('المصادقة متعددة العوامل', 'multi-factor authentication')],
          [L('إرسال الطلب', 'send the order'), '✏️ ' + L('خطر: التلاعب', 'threat: tampering'), '✍️ ' + L('التوقيع الرقمي', 'digital signature')]];
        return `
  <div id="sk-stage" class="mv-stage">
    ${STEPS.map(([b, em, u], k) => `<div id="sk-r${k}" class="l12u l12-step later" style="${B.at(40, 136 + k * 154, 580, 140)}"><span class="num">${k + 1}</span><span class="tx"><b>${b}</b><em>${em}</em><u class="later">${u}</u></span><span class="st"><span class="w">⏳</span><span class="d later">✅</span></span></div>`).join('')}
    ${B.ch('us', 700, 430, 'md')}${B.ch('hk', 1640, 430, 'md')}
    <div id="sk-shop" class="l12u l12-win later" style="${B.at(940, 140, 640, 260)}"><div class="wbar"><i></i><i></i><i></i><span class="url">shop.com</span></div><div class="wbody">🛒 ${L('سلة المشتريات: 🎧 سماعة', 'your cart: 🎧 headphones')}</div></div>
    ${['👂', '🎭', '🔓', '✏️'].map((e, k) => B.big('t' + k, [1560, 1810, 1560, 1810][k], [330, 330, 560, 560][k], 80, 58, e)).join('')}

    ${B.chip('p1', 940, 560, '💳 <bdi class="code">4512 7788</bdi>', 'c-blue')}
    ${B.chip('g1', 940, 560, '🔒 <bdi class="code">x7#q@!</bdi>', 'c-slate')}
    ${B.chip('hv', 1290, 330, '👂 «<bdi class="code">x7#q@!</bdi>» ' + L('مش مفهوم!', 'gibberish!'), 'c-red')}

    <div id="sk-wr" class="l12u l12-win later" style="${B.at(680, 140, 580, 330)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🔒 shop.com</span></div><div class="wbody">🛒 ${L('المتجر الحقيقي', 'the real shop')}<div class="l12-field">📜 ${L('شهادة سليمة من CA', 'valid certificate from a CA')} <b>✓</b></div></div></div>
    <div id="sk-wf" class="l12u l12-win fake later" style="${B.at(1300, 140, 580, 330)}"><div class="wbar"><i></i><i></i><i></i><span class="url">⚠️ sh0p-deals.xyz</span></div><div class="wbody">🎭 ${L('عروض وهمية!', 'fake deals!')}<div class="l12-field">📜 ${L('مفيش شهادة سليمة', 'no valid certificate')} <b>✗</b></div></div></div>
    ${B.stamp('ws', 1300, 510, '🚫 ' + L('المتصفح حذّرك', 'browser warning'))}

    <div id="sk-wl" class="l12u l12-win later" style="${B.at(680, 140, 620, 400)}"><div class="wbar"><i></i><i></i><i></i><span class="url">🔒 shop.com/login</span></div><div class="wbody">👤 ${L('تسجيل الدخول', 'Log in')}<div class="l12-field">🔑 ${L('كلمة السر', 'password')} <b>••••••</b></div><div class="l12-field">📩 ${L('كود SMS', 'SMS code')} <b>482913</b></div></div></div>
    ${B.chip('sms', 1340, 150, '📩 ' + L('وصلك على موبايلك: 482913', 'sent to your phone: 482913'), 'c-blue')}
    ${B.chip('hkp', 1340, 250, '😈 ' + L('معايا كلمة السر المسرّبة!', 'I have the leaked password!'), 'c-red')}
    ${B.chip('hkx', 1340, 340, '⛔ ' + L('مفيش موبايل = مفيش دخول', 'no phone = no way in'), 'c-red')}

    <div id="sk-od" class="l12u l12-doc later" style="${B.at(700, 170, 380)}">🧾 ${L('الطلب: 🎧 سماعة', 'order: 🎧 headphones')}<small>${L('العنوان: القاهرة', 'address: Cairo')}</small>${L('المبلغ:', 'amount:')} <span id="sk-a1" class="amt">800</span><span id="sk-a2" class="amt bad" style="display:none">8</span> ${L('جنيه', 'EGP')}<span class="seal">🔏</span></div>
    ${B.big('pen', 1240, 250, 80, 64, '✏️')}
    ${B.stamp('tx', 760, 420, '❌ ' + L('التلاعب اتكشف!', 'tampering caught!'))}

    ${[['🔐', L('التشفير', 'Encryption'), L('يمنع قراءة المحتوى من أي طرف تالت', 'stops third parties reading the content'), 'c-blue'],
      ['📜', L('الشهادة الرقمية', 'Digital certificate'), L('تثبت إن الطرف التاني حقيقي', 'proves the other side is genuine'), 'c-green'],
      ['📱', L('المصادقة متعددة العوامل', 'Multi-factor authentication'), L('تمنع الدخول غير المصرّح', 'blocks unauthorized logins'), 'c-amber'],
      ['✍️', L('التوقيع الرقمي', 'Digital signature'), L('يكشف التلاعب وانتحال المرسِل + عدم التنصل', 'detects tampering & sender impersonation + non-repudiation'), 'c-violet']]
      .map(([ic, h, p, cc], k) => B.card('e' + k, 660 + (k % 2) * 620, 136 + Math.floor(k / 2) * 230, 590, 210, cc, { row: true, ic, h, p })).join('')}
    ${B.chip('all', 660, 610, '🛡️ ' + L('الأمان = تقنيات كتير شغّالة مع بعض — مش تقنية واحدة', 'security = many technologies working together — not one'), 'c-green big', 1210)}

    ${U.hd(0, '🛒 ' + L('هتشتري أونلاين… و4 أخطار مستنياك', 'You buy online… and 4 threats are waiting'))}
    ${U.hd(1, '① ' + L('التشفير: محدش يقدر يقرا بياناتك', 'Encryption: nobody can read your data'))}
    ${U.hd(2, '② ' + L('الشهادة الرقمية: ده المتجر الحقيقي؟', 'Digital certificate: is it the real shop?'))}
    ${U.hd(3, '③ ' + L('المصادقة متعددة العوامل: كلمة السر مش كفاية', 'Multi-factor authentication: a password is not enough'))}
    ${U.hd(4, '④ ' + L('التوقيع الرقمي: الطلب وصل زي ما هو؟', 'Digital signature: did the order arrive unchanged?'))}
    ${U.hd(5, '🛡️ ' + L('الخلاصة: كل تقنية بتصد خطر', 'Recap: each technology stops a threat'))}
    ${U.nt(0, L('التنصّت · الموقع المزيّف · الدخول غير المصرّح · التلاعب — محتاجين أكتر من تقنية', 'eavesdropping · fake site · unauthorized login · tampering — one technology is not enough'), 'warn')}
    ${U.nt(5, '⚠️ ' + L('فخ: «التوقيع الرقمي بيحسّن سرعة الاتصال» ← غلط', 'trap: “a digital signature speeds up communication” → false'), 'warn')}
  </div>`;
      },
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    /* step k of the journey is solved: the threat fades, the technology appears, ⏳ → ✅ */
    const solve = (k, t) => {
      tl.to(all(`#sk-r${k} em`), { opacity: 0.4, duration: 0.3 }, t);
      tl.fromTo(all(`#sk-r${k} u`), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.4 }, t + 0.2);
      tl.to(all(`#sk-r${k} .w`), { opacity: 0, duration: 0.2 }, t + 0.3);
      tl.fromTo(all(`#sk-r${k} .d`), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, t + 0.3);
      tl.to(q('r' + k), { borderColor: '#34d399', duration: 0.3 }, t + 0.3);
      tl.to(q('t' + k), { opacity: 0, scale: 0.3, duration: 0.3 }, t + 0.3);
      SND('ok', t + 0.3);
    };
    const focus = (k, t) => tl.fromTo(q('r' + k), { scale: 1 }, { scale: 1.04, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, t);

    /* 0 — four threats */
    let c = at(0);
    frame(0, c, 6.6);
    IN(q('us'), c + 0.3, 0.5, { x: -40 * sx }); IN(q('shop'), c + 0.6, 0.5, { y: 20 });
    IN(q('hk'), c + 1.4, 0.5, { x: 40 * sx }); SND('bad', c + 1.4);
    range(4).forEach((k) => {
      IN(q('r' + k), c + 2.0 + k * 0.7, 0.45, { x: -40 * sx });
      POP(q('t' + k), c + 2.2 + k * 0.7, 0.4); SND('pop', c + 2.2 + k * 0.7);
    });

    /* 1 — encryption */
    c = at(1);
    frame(1, c);
    OUT(q('shop'), c, 0.3);
    focus(0, c + 0.4);
    IN(q('p1'), c + 0.8, 0.3);
    tl.to(q('p1'), { x: 280 * sx, duration: 0.8, ease: 'power1.in' }, c + 1.0);
    OUT(q('p1'), c + 1.8, 0.15);
    tl.fromTo(q('g1'), { opacity: 0, x: 280 * sx }, { opacity: 1, x: 280 * sx, duration: 0.15 }, c + 1.8);
    tl.to(q('g1'), { x: 540 * sx, duration: 0.9, ease: 'power1.out' }, c + 2.0);
    POP(q('hv'), c + 2.6, 0.4); SND('bad', c + 2.6);
    solve(0, c + 3.6);

    /* 2 — digital certificate */
    c = at(2);
    frame(2, c);
    OUT(Q('g1 hv us hk t2 t3'), c, 0.3);
    focus(1, c + 0.4);
    IN(q('wr'), c + 0.7, 0.5, { y: 20 }); IN(q('wf'), c + 1.2, 0.5, { y: 20 });
    tl.fromTo(all('#sk-wr .l12-field'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 1.9);
    glow(M, q('wr'), c + 2.2, 'rgba(52,211,153,.95)');
    tl.fromTo(all('#sk-wf .l12-field'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, c + 2.8);
    stampIn(M, q('ws'), c + 3.2); SND('bad', c + 3.2);
    solve(1, c + 4.2);

    /* 3 — multi-factor authentication */
    c = at(3);
    frame(3, c);
    OUT(Q('wr wf ws'), c, 0.3);
    focus(2, c + 0.4);
    IN(q('wl'), c + 0.7, 0.5, { y: 20 });
    tl.fromTo(all('#sk-wl .l12-field'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.9 }, c + 1.3);
    POP(q('sms'), c + 2.1, 0.4); SND('pop', c + 2.1);
    IN(Q('hk t2 t3'), c + 3.0, 0.4, { x: 40 * sx }); POP(q('hkp'), c + 3.2, 0.4);
    wiggle(M, q('hk'), c + 4.0);
    POP(q('hkx'), c + 4.1, 0.4); SND('bad', c + 4.1);
    solve(2, c + 5.0);

    /* 4 — digital signature */
    c = at(4);
    frame(4, c);
    OUT(Q('wl sms hkp hkx'), c, 0.3);
    focus(3, c + 0.4);
    IN(q('od'), c + 0.7, 0.5, { y: 20 });
    tl.to(q('od'), { x: 400 * sx, duration: 1.0, ease: 'power1.inOut' }, c + 1.4);
    POP(q('pen'), c + 2.4, 0.3);
    tl.to(q('pen'), { y: 60, x: -20 * sx, duration: 0.3 }, c + 2.6);
    tl.set(q('a1'), { display: 'none' }, c + 2.9); tl.set(q('a2'), { display: 'inline-block' }, c + 2.9); SND('bad', c + 2.9);
    tl.to(q('pen'), { opacity: 0, duration: 0.2 }, c + 3.1);
    wiggle(M, q('od'), c + 3.5);
    stampIn(M, q('tx'), c + 3.7);
    solve(3, c + 4.8);

    /* 5 — recap */
    c = at(5);
    frame(5, c, 6.0);
    OUT(Q('od tx pen hk'), c, 0.3);
    range(4).forEach((k) => { IN(q('e' + k), c + 0.6 + k * 0.5, 0.45, { y: 24 }); SND('pop', c + 0.6 + k * 0.5); });
    POP(q('all'), c + 3.0, 0.5); SND('ok', c + 3.0);

    /* living loops */
    M.loop(0, 6.4, () => M.bob(Q('t0 t1 t2 t3'), 10, 1.2));
    M.loop(1, 4.6, () => gsap.timeline({ repeat: -1, repeatDelay: 0.5 }).fromTo(q('g1'), { x: 280 * sx, opacity: 1 }, { x: 540 * sx, duration: 1.2, ease: 'none' }).to(q('g1'), { opacity: 0, duration: 0.2 }));
    M.loop(1, 4.6, () => M.breathe(q('hv'), 1.05, 0.9));
    M.loop(2, 5.0, () => M.breathe(q('ws'), 1.06, 0.9));
    M.loop(3, 5.8, () => M.breathe(q('hkx'), 1.05, 0.9));
    M.loop(4, 5.6, () => M.breathe(q('tx'), 1.04, 0.9));
    M.loop(5, 4.0, () => MK.look.glowCycle(Q('e0 e1 e2 e3'), 'rgba(52,211,153,.9)', 0.5));
    return M.done();
  });
})();

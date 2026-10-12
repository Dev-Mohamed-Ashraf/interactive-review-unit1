/* =========================================================
 * anims/mfa-movie.js — mfaMovie: multi-factor authentication as a real,
 * teacher-driven animation (lesson 2-1, station "auth"). Same pattern as
 * httpsMovie: each lesson beat = one scene that plays, then FREEZES.
 *
 * Scenes (beats):
 *  0 Ahmed's account: a password only (one factor: knowledge 🧠)
 *  1 the password leaks from another site → the attacker walks in 🚨
 *  2 Ahmed turns on MFA: password 🧠 + phone code 📱 (possession)
 *  3 the attacker tries again → the code goes to Ahmed's phone → blocked ⛔
 *  4 Ahmed signs in with two different kinds of factor ✅
 *  5 trap: two passwords = the same factor twice → NOT MFA
 *  6 recap: the three factors + the MFA rule
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;

  const PHONE = `<svg viewBox="0 0 90 150"><rect x="4" y="4" width="82" height="142" rx="16" fill="#0f172a" stroke="#94a3b8" stroke-width="5"/>
    <rect class="scr" x="12" y="20" width="66" height="108" rx="6" fill="#1e3a8a"/><circle cx="45" cy="138" r="4" fill="#94a3b8"/>
    <text class="code" x="45" y="70" text-anchor="middle" font-size="22" font-weight="900" fill="#fde68a" opacity="0" font-family="Consolas, monospace"><tspan x="45">482</tspan><tspan x="45" dy="26">913</tspan></text></svg>`;

  K.defineAnim('mfaMovie', (stage, props, api) => {
    const M = MK.create(stage, api, { props,
      cls: 'mv-mfa', prefix: 'mf-', beats: 7,
      cast: { 'ch-ahmed': 'user', 'ch-bank': 'server', 'ch-hacker': 'hacker' },
      html: (L) => `
  <div id="mf-stage">
    ${MK.RACK('id="mf-rack" class="later"')}
    <div id="mf-ch-ahmed" class="char later"></div>
    <div id="mf-ch-bank" class="char later"></div>
    <div id="mf-ch-hacker" class="char later"></div>
    <div id="mf-t-ahmed" class="tag later">👨 ${L('أحمد', 'Ahmed')}<span class="sub-tag">${L('صاحب الحساب', 'account owner')}</span></div>
    <div id="mf-t-bank" class="tag later">🏦 ${L('البنك', 'The bank')}<span class="sub-tag">${L('الخادم', 'the server')}</span></div>
    <div id="mf-t-hacker" class="tag later">😈 ${L('المهاجم', 'Attacker')}</div>

    <div id="mf-hd0" class="head later">🧠 ${L('حساب أحمد محمي بعامل واحد بس', 'Ahmed’s account: one factor only')}</div>
    <div id="mf-hd1" class="head later">🚨 ${L('العامل الوحيد اتكسر ← المهاجم دخل', 'The only factor broke → the attacker is in')}</div>
    <div id="mf-hd2" class="head later">🔐 ${L('المصادقة متعددة العوامل', 'Multi-factor authentication')}: 🧠 + 📱</div>
    <div id="mf-hd3" class="head later">⛔ ${L('كلمة السر لوحدها مابقتش كفاية', 'The password alone is no longer enough')}</div>
    <div id="mf-hd4" class="head later">✅ ${L('عاملين من نوعين مختلفين', 'Two different kinds of factor')}</div>
    <div id="mf-hd5" class="head later">⚠️ ${L('فخ: كلمتين سر مش مصادقة متعددة العوامل', 'Trap: two passwords are NOT MFA')}</div>
    <div id="mf-hd6" class="head later">💡 ${L('الخلاصة: عوامل المصادقة التلاتة', 'The point: the three factors')}</div>

    <div id="mf-login" class="later">
      <div class="ttl">🏦 ${L('بنك المستقبل · تسجيل الدخول', 'Future Bank · sign in')}</div>
      <div id="mf-f1" class="row"><span class="fld">🔑 ${L('كلمة السر', 'Password')} <b>••••••</b></span><span class="fac k">🧠 ${L('معرفة', 'knowledge')}</span></div>
      <div id="mf-f2" class="row later"><span class="fld">📱 ${L('كود الموبايل', 'Phone code')} <b>______</b></span><span class="fac p">📱 ${L('حيازة', 'possession')}</span></div>
      <div id="mf-st-ok" class="st ok later">✔</div><div id="mf-st-bad" class="st bad later">🚨</div><div id="mf-st-no" class="st no later">⛔</div>
    </div>

    <div id="mf-b-ahmed1" class="bubble tl mv-bub later">${L('كلمة السر بتاعتي قوية… كفاية كده!', 'My password is strong… that’s enough!')} 💪</div>
    <div id="mf-b-bank1" class="bubble tr mv-bub later">✅ ${L('كلمة السر صح — اتفضل', 'Password correct — come in')}</div>
    <div id="mf-pw0" class="chip later">🔑 ${L('كلمة السر', 'password')} ••••••</div>

    <div id="mf-leak" class="later"><div class="t">📄 ${L('قايمة كلمات سر مسرّبة', 'Leaked password list')}</div><div class="l">ahmed : Ahmed2024</div><div class="l">omar : 123456</div><div class="s">${L('من موقع تاني اتسرّق', 'from another breached site')}</div></div>
    <div id="mf-b-hack1" class="bubble tl later">${L('لقيت كلمة سر أحمد!', 'Found Ahmed’s password!')} 😈</div>
    <div id="mf-pw" class="chip bad later">🔑 Ahmed2024</div>
    <div id="mf-b-bank2" class="bubble tr mv-bub later">${L('أهلًا يا أحمد!', 'Welcome, Ahmed!')} 😃<span class="aside">${L('(ده مش أحمد!)', '(that’s not Ahmed!)')}</span></div>

    <svg id="mf-phone" class="later" viewBox="0 0 90 150">${PHONE.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg>
    <div id="mf-b-ahmed2" class="bubble tl mv-bub later">${L('من النهارده: لازم الكود اللي على موبايلي كمان', 'From today: the code on my phone is needed too')} 📱</div>

    <div id="mf-b-bank3" class="bubble tr mv-bub later">${L('كلمة السر صح… ابعت الكود اللي وصل لموبايلك', 'Password correct… now send the code from your phone')}</div>
    <div id="mf-code" class="chip code later">💬 ${L('الكود', 'code')} 482913</div>
    <div id="mf-b-hack2" class="bubble tl later">${L('كود؟! مفيش معايا موبايله', 'A code?! I don’t have his phone')} 😤</div>
    <div id="mf-block" class="later">⛔ ${L('اتمنع', 'Blocked')}</div>
    <div id="mf-b-bank4" class="bubble tr mv-bub later">${L('أهلًا يا أحمد الحقيقي', 'Welcome, the real Ahmed')} 👋</div>

    <div id="mf-cmpA" class="cmp no later"><div class="ic">🔑 + 🔑</div><div class="h">${L('كلمة سر + كلمة سر', 'password + password')}</div><div class="f">🧠 ${L('معرفة', 'knowledge')} + 🧠 ${L('معرفة', 'knowledge')}</div><div class="v">❌ ${L('مش MFA — نفس العامل مرتين', 'NOT MFA — the same factor twice')}</div></div>
    <div id="mf-cmpB" class="cmp yes later"><div class="ic">🔑 + 📱</div><div class="h">${L('كلمة سر + كود الموبايل', 'password + phone code')}</div><div class="f">🧠 ${L('معرفة', 'knowledge')} + 📱 ${L('حيازة', 'possession')}</div><div class="v">✅ ${L('MFA — عاملين مختلفين', 'MFA — two different factors')}</div></div>
    <div id="mf-b-hack3" class="bubble tl mv-bub later">${L('لو الاتنين كلمة سر… هسرقهم من نفس القايمة', 'Two passwords? I’ll steal both from one list')} 😏</div>
  </div>

  <div id="mf-recap">
    <div id="mf-rc1" class="rc later"><span class="ic">🧠</span><span class="h">${L('المعرفة', 'Knowledge')}</span><span class="p">${L('حاجة إنت عارفها', 'something you know')}</span><span class="x">${L('كلمة سر · PIN', 'password · PIN')}</span></div>
    <div id="mf-rc2" class="rc later"><span class="ic">📱</span><span class="h">${L('الحيازة', 'Possession')}</span><span class="p">${L('حاجة معاك', 'something you have')}</span><span class="x">${L('موبايل · كارت ذكي', 'phone · smart card')}</span></div>
    <div id="mf-rc3" class="rc later"><span class="ic">👆</span><span class="h">${L('الحيوية', 'Biometric')}</span><span class="p">${L('حاجة هي إنت', 'something you are')}</span><span class="x">${L('بصمة · وجه', 'fingerprint · face')}</span></div>
    <div id="mf-rule" class="later">🔐 MFA = ${L('اتنين أو أكتر من عوامل مختلفة', 'two or more DIFFERENT factors')}</div>
    <div id="mf-rule2" class="later">❌ ${L('كلمة سر + سؤال سري = نفس العامل (معرفة) ← مش MFA', 'password + secret question = same factor (knowledge) → not MFA')}</div>
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE } = M;
    const sub = (sel) => M.board.querySelector(sel);

    /* 0 — one factor: the password */
    let c = at(0);
    IN(q('hd0'), c + 0.1, 0.5, { y: -30 });
    IN(q('ch-ahmed'), c + 0.3, 0.6, { x: -120 }); IN(q('t-ahmed'), c + 0.6, 0.4);
    IN(q('ch-bank'), c + 0.4, 0.6, { x: 120 }); IN(q('rack'), c + 0.5, 0.6, { y: 40 }); IN(q('t-bank'), c + 0.7, 0.4);
    IN(q('login'), c + 1.0, 0.6, { y: -40 });
    PULSE(sub('#mf-f1 .fac'), c + 1.7, 'rgba(167,139,250,.95)');
    IN(q('b-ahmed1'), c + 2.2, 0.4, { y: 14 }); SND('pop', c + 2.2);
    OUT(q('b-ahmed1'), c + 4.4, 0.3);
    IN(q('pw0'), c + 4.6, 0.3);
    tl.to(q('pw0'), { x: 700, duration: 1.1, ease: 'power1.inOut' }, c + 4.8);
    OUT(q('pw0'), c + 5.9, 0.2);
    POP(q('st-ok'), c + 6.0, 0.45); SND('ok', c + 6.0);
    IN(q('b-bank1'), c + 6.2, 0.4, { y: 14 });

    /* 1 — the leak: the only factor breaks, the attacker walks in */
    c = at(1);
    OUT(Q('hd0 b-bank1 st-ok'), c, 0.3);
    IN(q('hd1'), c + 0.3, 0.5, { y: -30 });
    POP(q('leak'), c + 0.6, 0.6); SND('pop', c + 0.6);
    IN(q('ch-hacker'), c + 1.4, 0.7, { y: 60 }); IN(q('t-hacker'), c + 1.8, 0.4);
    IN(q('b-hack1'), c + 2.3, 0.4, { y: 14 });
    PULSE(sub('#mf-leak .l'), c + 2.3, 'rgba(248,113,113,.95)');
    OUT(q('b-hack1'), c + 4.0, 0.3);
    POP(q('pw'), c + 4.1, 0.4);
    tl.to(q('pw'), { x: 650, duration: 1.1, ease: 'power1.inOut' }, c + 4.5); SND('whoosh', c + 4.5);
    OUT(q('pw'), c + 5.6, 0.2);
    POP(q('st-bad'), c + 5.7, 0.45); SND('bad', c + 5.7);
    tl.fromTo(q('login'), { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 7 }, c + 5.7);
    IN(q('b-bank2'), c + 6.0, 0.4, { y: 14 });
    tl.to(q('ch-hacker'), { y: -18, duration: 0.3, yoyo: true, repeat: 1 }, c + 6.4);

    /* 2 — Ahmed turns on MFA: password + phone code */
    c = at(2);
    OUT(Q('hd1 b-bank2 st-bad leak'), c, 0.35);
    IN(q('hd2'), c + 0.4, 0.5, { y: -30 });
    POP(q('phone'), c + 1.0, 0.55); SND('pop', c + 1.0);
    tl.fromTo(q('phone'), { rotation: 0 }, { rotation: -10, duration: 0.15, yoyo: true, repeat: 3, transformOrigin: '50% 90%' }, c + 1.6);
    IN(q('f2'), c + 2.0, 0.5, { scale: 0.9 }); SND('pop', c + 2.0);
    PULSE(sub('#mf-f2 .fac'), c + 2.6, 'rgba(56,189,248,.95)');
    IN(q('b-ahmed2'), c + 3.2, 0.4, { y: 14 });

    /* 3 — the attacker tries again… the code goes to Ahmed’s phone → blocked */
    c = at(3);
    OUT(Q('hd2 b-ahmed2'), c, 0.3);
    IN(q('hd3'), c + 0.3, 0.5, { y: -30 });
    tl.set(q('pw'), { x: 0 }, c + 0.5);
    POP(q('pw'), c + 0.6, 0.4);
    tl.to(q('pw'), { x: 650, duration: 1.1, ease: 'power1.inOut' }, c + 1.0); SND('whoosh', c + 1.0);
    OUT(q('pw'), c + 2.1, 0.2);
    IN(q('b-bank3'), c + 2.3, 0.4, { y: 14 });
    POP(q('code'), c + 3.2, 0.4); SND('pop', c + 3.2);
    tl.to(q('code'), { x: -640, duration: 1.2, ease: 'power1.inOut' }, c + 3.6);
    OUT(q('code'), c + 4.8, 0.2);
    tl.to(sub('#mf-phone .code'), { opacity: 1, duration: 0.2 }, c + 4.8);
    tl.fromTo(q('phone'), { scale: 1 }, { scale: 1.18, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, c + 4.8);
    OUT(q('b-bank3'), c + 5.0, 0.3);
    IN(q('b-hack2'), c + 5.3, 0.4, { y: 14 });
    tl.to(sub('#mf-ch-hacker .m-smile'), { opacity: 0, duration: 0.1 }, c + 5.4);
    tl.to(sub('#mf-ch-hacker .m-sad'), { opacity: 1, duration: 0.1 }, c + 5.4);
    POP(q('st-no'), c + 6.3, 0.45); POP(q('block'), c + 6.4, 0.5); SND('ok', c + 6.3);

    /* 4 — Ahmed signs in normally: password + code */
    c = at(4);
    OUT(Q('hd3 b-hack2 block st-no t-hacker'), c, 0.3);
    tl.to(q('ch-hacker'), { y: 160, opacity: 0, duration: 0.6, ease: 'power2.in' }, c);
    IN(q('hd4'), c + 0.4, 0.5, { y: -30 });
    tl.set(q('pw0'), { x: 0 }, c + 0.8);
    IN(q('pw0'), c + 0.9, 0.3);
    tl.to(q('pw0'), { x: 700, duration: 1.1, ease: 'power1.inOut' }, c + 1.1);
    OUT(q('pw0'), c + 2.2, 0.2);
    PULSE(sub('#mf-f1 .fac'), c + 2.2, 'rgba(167,139,250,.95)', 1);
    tl.set(q('code'), { x: -640 }, c + 2.5);
    tl.to(sub('#mf-phone .code'), { opacity: 0, duration: 0.2 }, c + 2.6);
    IN(q('code'), c + 2.6, 0.3);
    tl.to(q('code'), { x: 0, duration: 1.2, ease: 'power1.inOut' }, c + 2.8);
    OUT(q('code'), c + 4.0, 0.2);
    PULSE(sub('#mf-f2 .fac'), c + 4.0, 'rgba(56,189,248,.95)', 1);
    POP(q('st-ok'), c + 4.4, 0.45); SND('ok', c + 4.4);
    IN(q('b-bank4'), c + 4.7, 0.4, { y: 14 });
    tl.fromTo(q('ch-ahmed'), { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 90%' }, c + 5.2);

    /* 5 — the trap: two passwords are NOT MFA */
    c = at(5);
    OUT(Q('hd4 b-bank4 st-ok login phone ch-ahmed t-ahmed ch-bank t-bank rack'), c, 0.45);
    IN(q('hd5'), c + 0.5, 0.5, { y: -30 });
    tl.set(sub('#mf-ch-hacker .m-smile'), { opacity: 1 }, c + 0.6);
    tl.set(sub('#mf-ch-hacker .m-sad'), { opacity: 0 }, c + 0.6);
    IN(q('cmpA'), c + 0.9, 0.6, { x: -60 }); SND('pop', c + 0.9);
    tl.to(q('ch-hacker'), { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }, c + 2.0);
    IN(q('t-hacker'), c + 2.3, 0.3);
    IN(q('b-hack3'), c + 2.6, 0.4, { y: 14 });
    POP(sub('#mf-cmpA .v'), c + 4.4, 0.5); SND('bad', c + 4.4);
    IN(q('cmpB'), c + 5.4, 0.6, { x: 60 }); SND('pop', c + 5.4);
    POP(sub('#mf-cmpB .v'), c + 6.3, 0.5); SND('ok', c + 6.3);

    /* 6 — recap: three factors; MFA = two or more DIFFERENT ones */
    c = at(6);
    OUT(Q('hd5 cmpA cmpB b-hack3 t-hacker'), c, 0.4);
    tl.to(q('ch-hacker'), { y: 160, opacity: 0, duration: 0.6, ease: 'power2.in' }, c);
    IN(q('hd6'), c + 0.5, 0.5, { y: -30 });
    Q('rc1 rc2 rc3').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.6, { y: 40 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('rule'), c + 3.0, 0.7); SND('ok', c + 3.0);
    IN(q('rule2'), c + 4.2, 0.5, { y: 20 });

    return M.done();
  });
})();

/* =========================================================
 * anims/incident-movie.js — incidentMovie: incident response to a
 * ransomware attack at school, as a real, teacher-driven animation
 * (lesson 2-3, station "incident"). Same pattern as httpsMovie: each
 * lesson beat = one scene that plays, then FREEZES.
 *
 * The six stages run along the top bar (① on the reading side).
 * Scenes (beats):
 *  0 ① preparation: plan + team + backups, before anything happens
 *  1 ② detection: files locked, "pay the ransom" → confirmed incident
 *  2 ③ containment: unplug the infected PCs (the third stays clean)
 *  3 ④ eradication: remove the malware (files still locked)
 *  4 ⑤ recovery: restore from the clean backup
 *  5 ⑥ prevention of recurrence: cause = phishing + a hole → patch + training
 *  6 ✗ recovery BEFORE eradication: the cause is still there → it returns
 *  7 recap: the right order + why it matters
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;

  K.defineAnim('incidentMovie', (stage, props, api) => {
    const rtl = !(RV.i18n && RV.i18n.lang === 'en');
    const slotX = (k) => 290 + (rtl ? 5 - k : k) * 225; // stage chip k (0..5) → left px (corners stay free for ⟲ and the dots)
    const STAGES = [
      ['📘', 'التحضير', 'Preparation', 'خطة + فريق + نسخ احتياطية قبل أي حادث', 'plan + team + backups before anything happens'],
      ['🚨', 'الاكتشاف', 'Detection', 'اكتشاف الحادث وتأكيده', 'discover and confirm the incident'],
      ['🔌', 'الاحتواء', 'Containment', 'نحدّ من نطاق التأثير: نفصل الجهاز', 'limit the impact: isolate the PC'],
      ['🧹', 'الاستئصال', 'Eradication', 'نشيل السبب: نمسح البرنامج الخبيث', 'remove the cause: delete the malware'],
      ['♻️', 'الاستعادة', 'Recovery', 'نرجّع الأنظمة لطبيعتها من نسخة نضيفة', 'back to normal from a clean backup'],
      ['🛡️', 'الدروس والتحسين', 'Prevention', 'نحلّل السبب: تحديث + تدريب', 'analyse the cause: patch + training'],
    ];
    const NUM = '①②③④⑤⑥';
    const M = MK.create(stage, api, { props,
      cls: 'mv-inc', prefix: 'ir-', beats: 8,
      cast: { 'ch-it': 'it', 'ch-clerk': 'clerk' },
      html: (L) => `
  <div id="ir-stage">
    ${STAGES.map((s, k) => `<div id="ir-s${k + 1}" class="sc later" style="left:${slotX(k)}px">${NUM[k]} ${L(s[1], s[2])}</div>`).join('')}
    <svg id="ir-net" class="later" viewBox="0 0 1920 880">
      ${[790, 1070, 1350].map((x, k) => `<path id="ir-c${k + 1}" d="M1070 226 L${x} 430" stroke="#38bdf8" stroke-width="6" stroke-dasharray="16 12" fill="none" stroke-linecap="round"/>`).join('')}
    </svg>
    <div id="ir-hub" class="later">🌐 ${L('شبكة المدرسة', 'School network')}</div>
    ${[1, 2, 3].map((k) => `<div id="ir-pc${k}" class="pc later">${MK.PC()}</div>`).join('')}
    ${[1, 2, 3].map((k) => `<div id="ir-bug${k}" class="bug later">👾</div>`).join('')}

    <div id="ir-ch-it" class="char later"></div>
    <div id="ir-ch-clerk" class="char later"></div>
    <div id="ir-t-it" class="tag later">👨‍💻 ${L('مسؤول الشبكة', 'IT lead')}<span class="sub-tag">${L('فريق الاستجابة', 'response team')}</span></div>
    <div id="ir-t-clerk" class="tag later">👨‍💼 ${L('موظف', 'Clerk')}<span class="sub-tag">${L('شؤون الطلاب', 'student records')}</span></div>

    <div id="ir-plan" class="prop later"><span class="ic">📘</span>${L('خطة الاستجابة', 'Response plan')}</div>
    <div id="ir-team" class="prop later"><span class="ic">👥</span>${L('الفريق', 'The team')}</div>
    <div id="ir-backup" class="prop later"><span class="ic">💾</span>${L('نسخة احتياطية', 'Backup')}</div>

    <div id="ir-b-it0" class="bubble tl mv-bub later">${L('لازم نكون جاهزين قبل ما المشكلة تحصل', 'We must be ready before trouble comes')} 📘</div>
    <div id="ir-note" class="slot bad later">💀 ${L('ملفاتك اتشفّرت! ادفع الفدية', 'Your files are encrypted! Pay the ransom')} 💰</div>
    <div id="ir-b-clerk1" class="bubble tr mv-bub later">${L('الملفات اتقفلت! مكتوب «ادفع الفدية»', 'The files are locked! It says “pay the ransom”')} 😱</div>
    <div id="ir-b-it1" class="bubble tl mv-bub later">${L('اتأكّدت: ده حادث أمني — برنامج فدية', 'Confirmed: a security incident — ransomware')} 🚨</div>
    <div id="ir-plug1" class="plug later">🔌</div><div id="ir-plug2" class="plug later">🔌</div>
    <div id="ir-b-it2" class="bubble tl mv-bub later">${L('فصلتهم! الجهاز التالت لسه سليم', 'Unplugged! The third PC is still clean')} ✋</div>
    <div id="ir-b-it3" class="bubble tl mv-bub later">${L('البرنامج الخبيث اتمسح — بس الملفات لسه مقفولة', 'The malware is gone — but the files are still locked')} 🧹</div>
    <div id="ir-b-clerk4" class="bubble tr mv-bub later">${L('الملفات رجعت!', 'The files are back!')} 🎉</div>
    <div id="ir-cause" class="slot later">🔍 ${L('السبب', 'Cause')}: 📧 ${L('إيميل احتيال', 'a phishing email')} + 🕳️ ${L('ثغرة مش متحدّثة', 'an unpatched hole')}</div>
    <div id="ir-patch" class="fix later">🛡️ ${L('تحديث الأجهزة', 'Patch the PCs')}</div>
    <div id="ir-train" class="fix later">🎓 ${L('تدريب الموظفين', 'Train the staff')}</div>
    <div id="ir-b-it5" class="bubble tl mv-bub later">${L('هندرّب الكل ونحدّث الأجهزة — علشان مايتكررش', 'We’ll train everyone and patch — so it never repeats')}</div>
    <div id="ir-wrong" class="slot bad later">❌ ${L('الاستعادة قبل الاستئصال ← السبب لسه موجود ← الحادث يرجع!', 'Recovery before eradication → the cause remains → it returns!')}</div>
    <div id="ir-b-it6" class="bubble tl mv-bub later">${L('غلطة! لازم الاستئصال قبل الاستعادة', 'Mistake! Eradicate before you recover')} 😖</div>
  </div>

  <div id="ir-recap">
    <div id="ir-r-title" class="head later">💡 ${L('الترتيب الصح للمراحل الست', 'The six stages, in the right order')}</div>
    ${STAGES.map((s, k) => `<div id="ir-rc${k + 1}" class="rcs later" style="left:${[1290, 680, 70][rtl ? k % 3 : 2 - (k % 3)]}px;top:${k < 3 ? 120 : 368}px"><b>${NUM[k]} ${s[0]} ${L(s[1], s[2])}</b><span>${L(s[3], s[4])}</span></div>`).join('')}
    <div id="ir-r1" class="rp later">⚡ ${L('الاحتواء قبل الاستئصال ← وإلا الضرر ينتشر وإنت بتنظّف', 'Contain before eradicating → or it spreads while you clean')}</div>
    <div id="ir-r2" class="rp later">⚡ ${L('الاستئصال قبل الاستعادة ← وإلا الحادث يتكرر فورًا', 'Eradicate before recovering → or the incident repeats at once')}</div>
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE } = M;
    const sub = (sel) => M.board.querySelector(sel);
    const ACT = { backgroundColor: '#fb7185', borderColor: '#fecdd3', color: '#1f0a10' };
    const DONE = { backgroundColor: 'rgba(52,211,153,.18)', borderColor: '#34d399', color: '#a7f3d0' };
    const activate = (k, t) => {
      if (k > 1) tl.to(q('s' + (k - 1)), Object.assign({ duration: 0.3 }, DONE), t);
      tl.to(q('s' + k), Object.assign({ opacity: 1, duration: 0.3 }, ACT), t);
      tl.fromTo(q('s' + k), { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, t);
      SND('pop', t);
    };
    const sick = (k, on, t) => {
      tl.to(sub(`#ir-pc${k} .scr`), { attr: { fill: on ? '#7f1d1d' : '#065f46' }, duration: 0.3 }, t);
      tl.to(sub(`#ir-pc${k} .ok`), { opacity: on ? 0 : 1, duration: 0.2 }, t);
      tl.to(sub(`#ir-pc${k} .bad`), { opacity: on ? 1 : 0, duration: 0.2 }, t);
    };
    const cable = (k, cut, t) => tl.to(q('c' + k), { attr: { stroke: cut ? '#ef4444' : '#38bdf8' }, opacity: cut ? 0.3 : 1, duration: 0.4 }, t);

    /* 0 — ① preparation */
    let c = at(0);
    IN(Q('s1 s2 s3 s4 s5 s6'), c + 0.1, 0.5, { y: -20 });
    tl.set(Q('s1 s2 s3 s4 s5 s6'), { opacity: 0.4 }, c + 0.65);
    activate(1, c + 0.8);
    IN(q('ch-it'), c + 0.6, 0.6, { x: -100 }); IN(q('t-it'), c + 0.9, 0.4);
    IN(q('ch-clerk'), c + 0.7, 0.6, { x: 100 }); IN(q('t-clerk'), c + 1.0, 0.4);
    IN(q('net'), c + 1.2, 0.5); IN(q('hub'), c + 1.2, 0.5, { y: -20 });
    IN(Q('pc1 pc2 pc3'), c + 1.4, 0.5, { y: 30 });
    POP(q('plan'), c + 2.2); POP(q('team'), c + 2.6); POP(q('backup'), c + 3.0);
    SND('pop', c + 2.2); SND('pop', c + 3.0);
    IN(q('b-it0'), c + 3.6, 0.4, { y: 14 });
    PULSE(Q('plan team backup'), c + 4.2, 'rgba(251,191,36,.9)');

    /* 1 — ② detection */
    c = at(1);
    OUT(q('b-it0'), c, 0.3);
    activate(2, c + 0.2);
    POP(q('bug1'), c + 0.8, 0.5); SND('bad', c + 0.8);
    sick(1, true, c + 1.1);
    IN(q('note'), c + 1.4, 0.4, { y: 20 });
    IN(q('b-clerk1'), c + 1.9, 0.4, { y: 14 });
    OUT(q('b-clerk1'), c + 3.9, 0.25);
    IN(q('b-it1'), c + 4.1, 0.4, { y: 14 });
    tl.set(q('bug2'), { x: -190 }, c + 5.6);
    IN(q('bug2'), c + 5.7, 0.2);
    tl.to(q('bug2'), { x: 0, duration: 0.9, ease: 'power1.inOut' }, c + 5.8);
    sick(2, true, c + 6.7); SND('bad', c + 6.7);

    /* 2 — ③ containment */
    c = at(2);
    OUT(q('b-it1'), c, 0.3);
    activate(3, c + 0.2);
    POP(q('plug1'), c + 0.9, 0.45); cable(1, true, c + 0.9); SND('pop', c + 0.9);
    POP(q('plug2'), c + 1.5, 0.45); cable(2, true, c + 1.5); SND('pop', c + 1.5);
    IN(q('b-it2'), c + 2.3, 0.4, { y: 14 }); SND('ok', c + 2.3);
    PULSE(q('pc3'), c + 2.8, 'rgba(52,211,153,.95)');

    /* 3 — ④ eradication */
    c = at(3);
    OUT(q('b-it2'), c, 0.3);
    activate(4, c + 0.2);
    tl.to(Q('bug1 bug2'), { scale: 0, rotation: 200, opacity: 0, duration: 0.9, ease: 'back.in(2)', stagger: 0.3 }, c + 0.9);
    SND('whoosh', c + 0.9);
    IN(q('b-it3'), c + 2.3, 0.4, { y: 14 });
    PULSE(q('note'), c + 3.2, 'rgba(248,113,113,.9)');

    /* 4 — ⑤ recovery */
    c = at(4);
    OUT(q('b-it3'), c, 0.3);
    activate(5, c + 0.2);
    OUT(Q('plug1 plug2'), c + 0.7, 0.3); cable(1, false, c + 0.7); cable(2, false, c + 0.7);
    tl.to(q('backup'), { y: 160, duration: 0.6, ease: 'power2.inOut' }, c + 1.2);
    tl.to(q('backup'), { x: 330, duration: 0.8, ease: 'power2.inOut' }, c + 1.8); SND('whoosh', c + 1.8);
    tl.fromTo(q('backup'), { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 0 50px rgba(52,211,153,.95)', duration: 0.3, yoyo: true, repeat: 1 }, c + 2.6);
    sick(1, false, c + 2.8); sick(2, false, c + 3.0); SND('ok', c + 2.8);
    OUT(q('note'), c + 3.0, 0.3);
    IN(q('b-clerk4'), c + 3.6, 0.4, { y: 14 });
    tl.to(q('backup'), { x: 0, duration: 0.7, ease: 'power2.inOut' }, c + 4.6);
    tl.to(q('backup'), { y: 0, duration: 0.5, ease: 'power2.inOut' }, c + 5.3);

    /* 5 — ⑥ prevention of recurrence */
    c = at(5);
    OUT(q('b-clerk4'), c, 0.3);
    activate(6, c + 0.2);
    IN(q('cause'), c + 0.9, 0.5, { y: 20 });
    IN(q('b-it5'), c + 2.4, 0.4, { y: 14 });
    POP(q('patch'), c + 3.4, 0.5); POP(q('train'), c + 3.9, 0.5); SND('ok', c + 3.4);
    tl.to(Q('pc1 pc2 pc3'), { filter: 'drop-shadow(0 0 18px rgba(52,211,153,.9))', duration: 0.4, yoyo: true, repeat: 3 }, c + 4.4);
    tl.to(q('s6'), Object.assign({ duration: 0.3 }, DONE), c + 6.0);

    /* 6 — ✗ wrong order: recovery before eradication */
    c = at(6);
    OUT(Q('b-it5 cause patch train'), c, 0.3);
    const d4 = slotX(4) - slotX(3);
    OUT(Q('s4 s5'), c + 0.4, 0.25);
    tl.set(q('s4'), { x: d4, borderColor: '#ef4444' }, c + 0.7);
    tl.set(q('s5'), { x: -d4, borderColor: '#ef4444' }, c + 0.7);
    IN(Q('s4 s5'), c + 0.75, 0.3, { y: -12 });
    SND('whoosh', c + 0.4);
    IN(q('wrong'), c + 1.1, 0.4, { y: 20 }); SND('bad', c + 1.1);
    tl.set(q('bug1'), { scale: 1, rotation: 0 }, c + 1.6);
    POP(q('bug1'), c + 1.7, 0.45);
    tl.to(q('backup'), { y: 160, duration: 0.5, ease: 'power2.inOut' }, c + 2.4);
    tl.to(q('backup'), { x: 330, duration: 0.7, ease: 'power2.inOut' }, c + 2.9);
    tl.to(q('backup'), { x: 0, duration: 0.5, ease: 'power2.inOut' }, c + 3.7);
    tl.to(q('backup'), { y: 0, duration: 0.4, ease: 'power2.inOut' }, c + 4.2);
    sick(1, true, c + 4.2);
    tl.set(q('bug2'), { x: -190, scale: 1, rotation: 0 }, c + 4.4);
    IN(q('bug2'), c + 4.5, 0.2); tl.to(q('bug2'), { x: 0, duration: 0.8, ease: 'power1.inOut' }, c + 4.5);
    sick(2, true, c + 5.3); SND('bad', c + 5.3);
    tl.set(q('bug3'), { x: -190 }, c + 5.5);
    IN(q('bug3'), c + 5.6, 0.2); tl.to(q('bug3'), { x: 0, duration: 0.8, ease: 'power1.inOut' }, c + 5.6);
    sick(3, true, c + 6.4); SND('bad', c + 6.4);
    IN(q('b-it6'), c + 6.8, 0.4, { y: 14 });

    /* 7 — recap */
    c = at(7);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('r-title'), c + 0.6, 0.5, { y: -30 });
    Q('rc1 rc2 rc3 rc4 rc5 rc6').forEach((r, i) => { IN(r, c + 1.0 + i * 0.4, 0.5, { y: 30 }); SND('pop', c + 1.0 + i * 0.4); });
    POP(q('r1'), c + 4.0, 0.6); SND('ok', c + 4.0);
    POP(q('r2'), c + 4.9, 0.6); SND('ok', c + 4.9);

    /* living loops */
    M.loop(0, 5.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(Q('plan team backup'), { boxShadow: '0 0 4px rgba(0,0,0,0)' }, { boxShadow: '0 0 42px rgba(251,191,36,.95)', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(1, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(Q('bug1 bug2'), { rotation: -8 }, { rotation: 8, duration: 0.9, ease: 'sine.inOut', transformOrigin: '50% 50%' }));
    M.loop(2, 4.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(q('pc3'), { boxShadow: '0 0 4px rgba(0,0,0,0)' }, { boxShadow: '0 0 42px rgba(52,211,153,.95)', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(3, 4.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(q('note'), { boxShadow: '0 0 4px rgba(0,0,0,0)' }, { boxShadow: '0 0 42px rgba(248,113,113,.95)', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(4, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(Q('pc1 pc2'), { filter: 'drop-shadow(0 0 0px rgba(52,211,153,0))' }, { filter: 'drop-shadow(0 0 18px rgba(52,211,153,.9))', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(5, 6.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(Q('pc1 pc2 pc3'), { filter: 'drop-shadow(0 0 0px rgba(52,211,153,0))' }, { filter: 'drop-shadow(0 0 18px rgba(52,211,153,.9))', duration: 1.2, ease: 'sine.inOut' }));
    M.loop(6, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(Q('bug1 bug2 bug3'), { rotation: -8 }, { rotation: 8, duration: 0.9, ease: 'sine.inOut', transformOrigin: '50% 50%' }));
    return M.done();
  });
})();

/* =========================================================
 * anims/stories-ch2.js — chapter-2 cartoon "videos" (engine: story.js)
 *   mfaStory      : a leaked password → break-in · the phone code (MFA)
 *                   stops the attacker · two passwords are not MFA
 *   fortressStory : the company network as a fortress — firewall = gate
 *                   guard, DMZ = reception, VPN = secure tunnel, defense in
 *                   depth = many doors, zero trust = badge at every door
 *   incidentStory : an IT team handles ransomware in the six stages, then
 *                   what happens when recovery comes before eradication
 * Each chapter = one lesson beat.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ═════════════════════════ mfaStory ═════════════════════════ */
  K.defineAnim('mfaStory', (stage, props, api) => {
    const S = RV.storyKit(stage, api);
    const tl = S.tl;
    const U = S.person(150, 285, 'user', { ar: 'أحمد', en: 'Ahmed' });
    const BK = S.person(750, 285, 'server', { ar: 'البنك', en: 'The bank' });
    const HK = S.person(450, 285, 'hacker', { ar: 'المهاجم', en: 'Attacker' });
    const leak = S.item('text', 450, 95, 'is-bad', { ar: 'قايمة كلمات سر مسرّبة', en: 'leaked password list' });
    const pw = S.item('key', 450, 160, 'is-pub', { ar: 'كلمة السر 🧠', en: 'password 🧠' });
    const code = S.item('sms', 650, 200, 'is-sess', { ar: 'كود 482913', en: 'code 482913' });
    const phone = S.item('phone', 300, 210, 'is-phone', { ar: 'موبايل أحمد 📱', en: 'Ahmed’s phone 📱' });
    const ok = S.item('check', 750, 75, 'is-ok');
    const no = S.item('x', 750, 75, 'is-no');
    const alarm = S.item('siren', 750, 75, 'is-bad');
    gsap.set(HK.g, { autoAlpha: 0 });

    S.chapter(0);
    tl.call(S.say({ ar: '🎬 أحمد عنده حساب في البنك… محمي بكلمة سر بس (عامل واحد: المعرفة 🧠)', en: '🎬 Ahmed has a bank account… protected by a password only (one factor: knowledge 🧠)' }))
      .add(S.speak(U, { ar: 'كلمة السر بتاعتي قوية… كفاية كده!', en: 'My password is strong… that’s enough!' }, 2.4))
      .add(S.speak(BK, { ar: 'تمام، كلمة السر صح — اتفضل', en: 'OK, password correct — come in' }, 2.2));

    S.chapter(1);
    tl.call(S.say({ ar: '① موقع تاني اتسرّق… وكلمة سر أحمد بقت في قايمة مسرّبة على الإنترنت', en: '① Another website was breached… and Ahmed’s password is now in a leaked list online' }))
      .to(HK.g, { autoAlpha: 1, duration: 0.4 })
      .fromTo(leak, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 95, duration: 0.5 })
      .add(S.speak(HK, { ar: 'لقيت كلمة سر أحمد! 😈', en: 'Found Ahmed’s password! 😈' }, 2.2))
      .fromTo(pw, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
      .to(pw, { x: 650, y: 200, duration: 1.1, ease: 'power1.inOut' })
      .fromTo(alarm, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' })
      .call(() => api.sound.play('bad'))
      .add(S.speak(BK, { ar: 'أهلًا يا أحمد! 😃 (ده مش أحمد!)', en: 'Welcome, Ahmed! 😃 (that’s not Ahmed!)' }, 2.6), '<')
      .call(S.say({ ar: '🚨 عامل واحد اتكسر = المهاجم دخل على طول', en: '🚨 One factor broken = the attacker walks right in' }))
      .to([alarm, pw, leak], { autoAlpha: 0, duration: 0.4 }, '+=1.4');

    S.chapter(2);
    tl.call(S.say({ ar: '② أحمد فعّل المصادقة متعددة العوامل: كلمة سر 🧠 + كود بيوصل على موبايله 📱 (حيازة)', en: '② Ahmed turns on multi-factor authentication: password 🧠 + a code sent to his phone 📱 (possession)' }))
      .fromTo(phone, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .add(S.speak(U, { ar: 'من النهارده: لازم الكود اللي على موبايلي كمان', en: 'From today: the code on my phone is needed too' }, 2.6), '<');

    S.chapter(3);
    tl.call(S.say({ ar: '③ المهاجم جرّب تاني بكلمة السر المسرّبة… البنك طلب الكود — والكود راح لموبايل أحمد مش للمهاجم!', en: '③ The attacker tries again with the leaked password… the bank asks for the code — and it goes to Ahmed’s phone, not the attacker!' }))
      .set(pw, { x: 450, y: 160 })
      .to(pw, { autoAlpha: 1, duration: 0.3 })
      .to(pw, { x: 650, y: 200, duration: 1, ease: 'power1.inOut' })
      .add(S.speak(BK, { ar: 'كلمة السر صح… بس ابعتلي الكود اللي وصل لموبايلك', en: 'Password correct… now send the code that reached your phone' }, 2.6))
      .fromTo(code, { autoAlpha: 1, x: 650, y: 200 }, { x: 300, y: 150, duration: 1.1, ease: 'power1.inOut' })
      .add(S.speak(HK, { ar: 'كود؟! مفيش معايا موبايله 😤', en: 'A code?! I don’t have his phone 😤' }, 2.4))
      .fromTo(no, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' })
      .call(() => api.sound.play('ok'))
      .call(S.say({ ar: '⛔ اتمنع: عامل الحيازة (الموبايل) لسه حامي الحساب', en: '⛔ Blocked: the possession factor (the phone) still protects the account' }))
      .to([no, pw], { autoAlpha: 0, duration: 0.4 }, '+=1.4');

    S.chapter(4);
    tl.call(S.say({ ar: '④ أحمد بيدخل عادي: كلمة السر + الكود من موبايله ✅ — عاملين من نوعين مختلفين', en: '④ Ahmed signs in normally: password + the code from his phone ✅ — two different kinds of factor' }))
      .to(HK.g, { autoAlpha: 0.35, duration: 0.3 })
      .to(code, { x: 650, y: 200, duration: 1, ease: 'power1.inOut' })
      .fromTo(ok, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' })
      .add(S.speak(BK, { ar: 'أهلًا يا أحمد الحقيقي 👋', en: 'Welcome, the real Ahmed 👋' }, 2.2), '<')
      .to([ok, code], { autoAlpha: 0, duration: 0.4 }, '+=1');

    S.chapter(5);
    tl.call(S.say({ ar: '⚠️ فخ الامتحان: كلمتين سر = نفس العامل (معرفة) مرتين ⇒ مش مصادقة متعددة العوامل', en: '⚠️ Exam trap: two passwords = the same factor (knowledge) twice ⇒ NOT multi-factor authentication' }))
      .to(HK.g, { autoAlpha: 1, duration: 0.3 })
      .add(S.speak(HK, { ar: 'لو الاتنين كلمة سر… هسرق الاتنين من نفس القايمة 😏', en: 'If both are passwords… I’ll steal both from the same list 😏' }, 3));

    return { beat(i) { S.go(i); }, destroy() { S.kill(); } };
  });

  /* ═════════════════════════ fortressStory ═════════════════════════ */
  K.defineAnim('fortressStory', (stage, props, api) => {
    const S = RV.storyKit(stage, api);
    const { s } = api;
    const t = api.t;
    const tl = S.tl;
    const svg = S.svg;
    // the fortress: outside | gate (firewall) | reception (DMZ) | inner door (firewall) | office (internal)
    const zone = (x, w, label, cls) => {
      const g = s('g', { class: 'fs-zone ' + cls }, s('rect', { x, y: 60, width: w, height: 320, rx: 18 }), s('text', { x: x + w / 2, y: 88, 'text-anchor': 'middle', class: 'fs-zone-t' }, t(label)));
      svg.insertBefore(g, svg.children[1]);
      return g;
    };
    const zOut = zone(10, 230, { ar: 'بره (الإنترنت)', en: 'Outside (Internet)' }, 'out');
    const zDmz = zone(300, 250, { ar: 'الاستقبال = DMZ', en: 'Reception = DMZ' }, 'dmz');
    const zIn = zone(610, 280, { ar: 'المكتب الداخلي', en: 'Inner office' }, 'in');
    const door = (x, label) => {
      const g = s('g', { class: 'fs-door' }, s('rect', { x: x - 14, y: 60, width: 28, height: 320, rx: 6 }), s('text', { x, y: 400, 'text-anchor': 'middle', class: 'fs-door-t' }, t(label)));
      svg.insertBefore(g, svg.children[4]);
      return g;
    };
    const gate1 = door(270, { ar: 'جدار حماية', en: 'firewall' });
    const gate2 = door(580, { ar: 'جدار حماية', en: 'firewall' });
    const GD = S.person(270, 250, 'ca', { ar: 'الحارس', en: 'The guard' });
    const VIS = S.person(120, 250, 'user', { ar: 'زائر للموقع', en: 'Site visitor' });
    const HK = S.person(120, 250, 'hacker', { ar: 'المهاجم', en: 'Attacker' });
    const EMP = S.person(770, 250, 'server', { ar: 'موظف', en: 'Employee' });
    const rules = S.item('text', 270, 70, 'is-cert', { ar: 'قواعد مضبوطة مسبقًا', en: 'preset rules' });
    const web = S.item('server', 425, 200, 'is-ok', { ar: 'خادم الويب', en: 'web server' });
    const vault = S.item('database', 800, 140, 'is-sess', { ar: 'بيانات العملاء', en: 'customer data' });
    const no = S.item('x', 270, 70, 'is-no');
    const tunnel = s('rect', { x: 60, y: 282, width: 690, height: 50, rx: 25, class: 'fs-tunnel' });
    svg.insertBefore(tunnel, svg.children[6]);
    const cafe = S.item('laptopHome', 80, 307, 'is-phone', { ar: 'موظف في كافيه', en: 'staff at a café' });
    const blob = S.item('lock', 120, 307, 'is-msg');
    const badges = [0, 1].map((k) => S.item('userCheck', 700 + k * 100, 120, 'is-ok'));
    gsap.set([HK.g, VIS.g, tunnel, no], { autoAlpha: 0 });

    S.chapter(0);
    tl.call(S.say({ ar: '🎬 تخيّل شبكة الشركة كأنها قلعة: الكنز = بيانات العملاء 🗄️ في المكتب الداخلي', en: '🎬 Picture the company network as a fortress: the treasure = customer data 🗄️ in the inner office' }))
      .from([zOut, zDmz, zIn], { autoAlpha: 0, y: 20, stagger: 0.2, duration: 0.5 })
      .fromTo(vault, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .add(S.speak(EMP, { ar: 'إحنا شغالين هنا… والبيانات دي سرّية جدًا', en: 'We work here… and this data is top secret' }, 2.6));

    S.chapter(1);
    tl.call(S.say({ ar: '① جدار الحماية = حارس على البوابة معاه قواعد مضبوطة مسبقًا: يسمح أو يمنع', en: '① The firewall = a guard at the gate with preset rules: allow or deny' }))
      .fromTo(rules, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 70, duration: 0.4 })
      .to(VIS.g, { autoAlpha: 1, duration: 0.3 })
      .add(S.speak(VIS, { ar: 'عايز أشوف موقعكم', en: 'I want to see your website' }, 2))
      .add(S.speak(GD, { ar: '✅ مسموح — اتفضل على الاستقبال', en: '✅ Allowed — go to reception' }, 2.2))
      .add(VIS.walk(400, 1.2))
      .to(VIS.g, { autoAlpha: 0, duration: 0.3 })
      .set(VIS.g, { x: 120 })
      .to(HK.g, { autoAlpha: 1, duration: 0.3 })
      .add(S.speak(HK, { ar: 'عايز أدخل على الخزنة على طول!', en: 'I want to go straight to the vault!' }, 2.2))
      .add(S.speak(GD, { ar: '⛔ ممنوع — مفيش دخول مباشر لقاعدة البيانات', en: '⛔ Denied — no direct access to the database' }, 2.4))
      .fromTo(no, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' }, '<')
      .call(() => api.sound.play('bad'))
      .to([no, rules], { autoAlpha: 0, duration: 0.4 }, '+=1');

    S.chapter(2);
    tl.call(S.say({ ar: '② DMZ = صالة استقبال منفصلة: الخوادم العامة (ويب وبريد) هنا، بعيد عن المكتب الداخلي', en: '② The DMZ = a separate reception hall: public servers (web, mail) live here, away from the inner office' }))
      .fromTo(web, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .add(HK.walk(400, 1.2))
      .add(S.speak(HK, { ar: 'هاجمت خادم الويب! دلوقتي هدخل جوّه…', en: 'I hacked the web server! Now I’ll get inside…' }, 2.4))
      .to(web, { rotation: 8, duration: 0.07, yoyo: true, repeat: 7 }, '<')
      .add(HK.walk(530, 0.8))
      .fromTo(gate2, { x: 0 }, { x: 6, duration: 0.06, yoyo: true, repeat: 7 })
      .call(() => api.sound.play('bad'))
      .call(S.say({ ar: '🛡️ الباب التاني (جدار حماية تاني) وقفه — الشبكة الداخلية سليمة', en: '🛡️ The second door (another firewall) stops him — the internal network is safe' }))
      .add(HK.walk(120, 1.2), '+=1.2');

    S.chapter(3);
    tl.call(S.say({ ar: '③ VPN = نفق مشفّر عبر الإنترنت: الموظف من الكافيه يوصل للمكتب بأمان، والمتنصّت مش فاهم حاجة', en: '③ A VPN = an encrypted tunnel over the Internet: staff in a café reach the office safely; an eavesdropper understands nothing' }))
      .to(HK.g, { autoAlpha: 0, duration: 0.3 })
      .fromTo(cafe, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4 })
      .fromTo(tunnel, { autoAlpha: 0, scaleX: 0, transformOrigin: '0% 50%' }, { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' })
      .fromTo(blob, { autoAlpha: 1, x: 120 }, { x: 720, duration: 1.8, ease: 'none' })
      .to(blob, { autoAlpha: 0, duration: 0.2 })
      .call(() => api.sound.play('ok'));

    S.chapter(4);
    tl.call(S.say({ ar: '④ الدفاع في العمق: حارس + نفق مشفّر + صالة منفصلة + حماية لكل جهاز — لو طبقة اتكسرت، اللي بعدها تحمي', en: '④ Defense in depth: guard + encrypted tunnel + separate hall + protection on every PC — if one layer breaks, the next still protects' }))
      .to([gate1, tunnel, zDmz, gate2], { opacity: 0.4, duration: 0.2 })
      .to(gate1, { opacity: 1, duration: 0.3 }).to(gate1, { opacity: 0.4, duration: 0.3, delay: 0.4 })
      .to(tunnel, { opacity: 1, duration: 0.3 }).to(tunnel, { opacity: 0.4, duration: 0.3, delay: 0.4 })
      .to(zDmz, { opacity: 1, duration: 0.3 }).to(zDmz, { opacity: 0.4, duration: 0.3, delay: 0.4 })
      .to(gate2, { opacity: 1, duration: 0.3 })
      .to([gate1, tunnel, zDmz, gate2], { opacity: 1, duration: 0.4 });

    S.chapter(5);
    tl.call(S.say({ ar: '⑤ انعدام الثقة: حتى اللي جوّه المكتب لازم يثبت هويته وصلاحياته عند كل باب، كل مرة', en: '⑤ Zero trust: even people inside must prove identity and permissions at every door, every time' }))
      .fromTo(badges, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, stagger: 0.2, duration: 0.4, ease: 'back.out(2)' })
      .add(S.speak(EMP, { ar: 'حتى أنا… بوري الكارنيه عند كل باب 🪪', en: 'Even me… I show my badge at every door 🪪' }, 2.6))
      .to(HK.g, { autoAlpha: 1, x: 680, duration: 0.6 })
      .add(S.speak(HK, { ar: 'أنا جوّه خلاص… مش هيسألوني؟', en: 'I’m already inside… they won’t ask me?' }, 2.2))
      .to(badges[0], { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 })
      .call(() => api.sound.play('bad'))
      .call(S.say({ ar: '⛔ لأ — مفيش «جوّه موثوق»: كل وصول بيتحقّق منه', en: '⛔ No — there is no "trusted inside": every access is verified' }));

    return { beat(i) { S.go(i); }, destroy() { S.kill(); } };
  });

  /* ═════════════════════════ incidentStory ═════════════════════════ */
  K.defineAnim('incidentStory', (stage, props, api) => {
    const S = RV.storyKit(stage, api);
    const { s } = api;
    const t = api.t;
    const tl = S.tl;
    const IT = S.person(160, 285, 'it', { ar: 'مسؤول الشبكة', en: 'IT lead' });
    const EMP = S.person(400, 285, 'server', { ar: 'موظف شؤون الطلاب', en: 'Records clerk' });
    const pcs = [0, 1, 2].map((k) => S.item('monitor', 640 + k * 85, 200, 'is-ok'));
    const bug = S.item('bug', 640, 200, 'is-bad', { ar: 'برنامج فدية', en: 'ransomware' });
    const book = S.item('book', 90, 140, 'is-cert', { ar: 'خطة الاستجابة', en: 'response plan' });
    const disk = S.item('backup', 90, 230, 'is-sess', { ar: 'نسخة احتياطية', en: 'backup' });
    const plug = S.item('plug', 640, 120, 'is-bad', { ar: 'فصل الكابل', en: 'cable unplugged' });
    const shield = S.item('shield', 725, 110, 'is-ok', { ar: 'تحديث + تدريب', en: 'patch + training' });
    const note = S.item('alert', 400, 95, 'is-bad', { ar: 'ادفع الفدية!', en: 'Pay the ransom!' });
    const stageChip = s('text', { x: 450, y: 44, 'text-anchor': 'middle', class: 'is-chip-t' }, '');
    S.svg.appendChild(stageChip);
    const setStage = (n, txt) => () => { stageChip.textContent = `${n} · ${t(txt)}`; gsap.fromTo(stageChip, { opacity: 0, y: 34 }, { opacity: 1, y: 44, duration: 0.4 }); };
    const sick = (k, on) => () => { pcs[k].setAttribute('class', 'st-item ' + (on ? 'is-bad' : 'is-ok')); };

    S.chapter(0);
    tl.call(setStage('١', { ar: 'التحضير', en: 'Preparation' }))
      .call(S.say({ ar: '① التحضير: قبل أي حادث — خطة استجابة مكتوبة، فريق، ونسخ احتياطية جاهزة', en: '① Preparation: before anything happens — a written response plan, a team, and ready backups' }))
      .fromTo([book, disk], { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, stagger: 0.3, duration: 0.5, ease: 'back.out(2)' })
      .fromTo(pcs, { autoAlpha: 0, y: 230 }, { autoAlpha: 1, y: 200, stagger: 0.15, duration: 0.4 })
      .add(S.speak(IT, { ar: 'لازم نكون جاهزين قبل ما المشكلة تحصل', en: 'We must be ready before trouble comes' }, 2.6));

    S.chapter(1);
    tl.call(setStage('٢', { ar: 'الاكتشاف', en: 'Detection' }))
      .call(S.say({ ar: '② الاكتشاف: اكتشاف إن فيه حادث وتأكيده — الملفات اتشفّرت ومحدش قادر يدخل!', en: '② Detection: discover and confirm the incident — files are encrypted and no one can log in!' }))
      .fromTo(bug, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' })
      .call(sick(0, true))
      .fromTo(note, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 95, duration: 0.4 })
      .call(() => api.sound.play('bad'))
      .add(S.speak(EMP, { ar: 'الملفات اتقفلت! 😱 مكتوب «ادفع الفدية»', en: 'The files are locked! 😱 It says "pay the ransom"' }, 2.6))
      .add(S.speak(IT, { ar: 'اتأكّدت: ده حادث أمني — برنامج فدية', en: 'Confirmed: a security incident — ransomware' }, 2.4))
      .to(bug, { x: 725, duration: 0.8, delay: 0.3 })
      .call(sick(1, true));

    S.chapter(2);
    tl.call(setStage('٣', { ar: 'الاحتواء', en: 'Containment' }))
      .call(S.say({ ar: '③ الاحتواء: نحدّ من الضرر علشان مايتنشرش — نفصل الأجهزة المصابة عن الشبكة فورًا', en: '③ Containment: limit the damage so it does not spread — unplug the infected PCs from the network now' }))
      .add(IT.walk(545, 1))
      .fromTo(plug, { autoAlpha: 0, y: 90 }, { autoAlpha: 1, y: 120, duration: 0.4 })
      .to([pcs[0], pcs[1]], { y: 230, duration: 0.4 })
      .add(S.speak(IT, { ar: 'فصلتهم! الجهاز التالت لسه سليم ✋', en: 'Unplugged! The third PC is still clean ✋' }, 2.4))
      .call(() => api.sound.play('ok'));

    S.chapter(3);
    tl.call(setStage('٤', { ar: 'الإزالة', en: 'Eradication' }))
      .call(S.say({ ar: '④ الإزالة: نشيل السبب نفسه — نمسح البرنامج الخبيث من الأجهزة', en: '④ Eradication: remove the cause itself — delete the malware from the PCs' }))
      .to(bug, { scale: 0, rotation: 200, autoAlpha: 0, duration: 0.9, ease: 'back.in(2)' })
      .call(sick(0, false)).call(sick(1, false))
      .add(S.speak(IT, { ar: 'البرنامج الخبيث اتمسح 🧹', en: 'The malware is gone 🧹' }, 2.2))
      .to(plug, { autoAlpha: 0, duration: 0.3 });

    S.chapter(4);
    tl.call(setStage('٥', { ar: 'الاستعادة', en: 'Recovery' }))
      .call(S.say({ ar: '⑤ الاستعادة: نرجّع الأنظمة والخدمات لحالتها الطبيعية من النسخة الاحتياطية النضيفة', en: '⑤ Recovery: return systems and services to normal from the clean backup' }))
      .to(disk, { x: 680, y: 150, duration: 1.2, ease: 'power1.inOut' })
      .to([pcs[0], pcs[1]], { y: 200, duration: 0.4 })
      .to(note, { autoAlpha: 0, duration: 0.3 }, '<')
      .add(S.speak(EMP, { ar: 'الملفات رجعت! 🎉', en: 'The files are back! 🎉' }, 2.2))
      .to(disk, { x: 90, y: 230, duration: 0.8 });

    S.chapter(5);
    tl.call(setStage('٦', { ar: 'منع التكرار', en: 'Prevention' }))
      .call(S.say({ ar: '⑥ منع التكرار: نحلّل السبب (إيميل احتيال + ثغرة) وناخد إجراءات علشان مايتكررش: تحديث + تدريب', en: '⑥ Prevention of recurrence: analyse the cause (phishing mail + a hole) and act so it never repeats: patch + training' }))
      .fromTo(shield, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .add(S.speak(IT, { ar: 'السبب كان إيميل احتيال — هندرّب الكل ونحدّث الأجهزة', en: 'It came from a phishing email — we’ll train everyone and patch' }, 3));

    S.chapter(6);
    tl.call(setStage('✗', { ar: 'لو الترتيب اتلخبط…', en: 'If the order is wrong…' }))
      .call(S.say({ ar: '❌ لو رجّعنا النسخة الاحتياطية قبل ما نمسح البرنامج الخبيث… السبب لسه موجود والحادث يرجع تاني!', en: '❌ If we restore the backup before removing the malware… the cause is still there and the incident comes back!' }))
      .to(shield, { autoAlpha: 0, duration: 0.3 })
      .set(bug, { x: 640, scale: 1, rotation: 0 })
      .to(bug, { autoAlpha: 1, duration: 0.3 })
      .to(disk, { x: 680, y: 150, duration: 1 })
      .call(sick(0, true)).to(bug, { x: 725, duration: 0.6 }).call(sick(1, true)).to(bug, { x: 810, duration: 0.6 }).call(sick(2, true))
      .call(() => api.sound.play('bad'))
      .add(S.speak(IT, { ar: 'غلطة! لازم الإزالة قبل الاستعادة', en: 'Mistake! Eradicate before you recover' }, 2.6));

    return { beat(i) { S.go(i); }, destroy() { S.kill(); } };
  });
})();

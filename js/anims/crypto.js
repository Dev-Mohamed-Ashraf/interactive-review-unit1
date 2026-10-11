/* =========================================================
 * anims/crypto.js — lesson 2-1 (cryptography & authentication)
 *   threatsDemo  : what goes wrong WITHOUT HTTPS — eavesdropping, tampering,
 *                  impersonation — then HTTPS blocks all three
 *   commonKey    : one shared key locks AND unlocks (live cipher with a key
 *                  slider) · very fast · but how do we send the key safely?
 *   keyPair      : public key (open padlock, given to everyone) + private key
 *                  (kept secret) · the eavesdropper can't open the box · slow
 *   tlsHandshake : the 3 stages: certificate + public key → session key
 *                  exchange → fast data with the common key
 *   signCert     : digital signature (private key signs, public key verifies,
 *                  tampering detected, non-repudiation) + digital certificate
 *   mfaDemo      : the 3 factors · password leaked → break-in · + phone OTP →
 *                  blocked · two passwords are NOT multi-factor
 *   securityStack: online shopping — 4 threats, 4 technologies, all at once
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── threatsDemo ───────────────────────── */
  K.defineAnim('threatsDemo', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 460);
    const A = { x: 110, y: 170 }, B = { x: 690, y: 170 }, H = { x: 400, y: 345 };
    const wire = C.link(A, B, 'cy-wire');
    const lockMid = api.svgIcon('lock', 400, 170, 42, { class: 'svg-ico cy-midlock' });
    const you = C.node(A.x, A.y, 'monitor', { ar: 'إنت', en: 'You' }, 'is-you');
    const bank = C.node(B.x, B.y, 'building', { ar: 'البنك الحقيقي', en: 'Real bank' }, 'is-good');
    const fake = C.node(B.x, B.y, 'building', { ar: 'بنك مزيّف!', en: 'Fake bank!' }, 'is-bad');
    const hacker = C.node(H.x, H.y, 'hacker', { ar: 'المهاجم', en: 'Attacker' }, 'is-bad', 76);
    const tap = C.link({ x: 400, y: 170 }, { x: 400, y: 305 }, 'cy-tap');
    const pkt = C.packet('', 'is-plain');
    const copy = C.packet('', 'is-plain');
    const title = s('text', { x: 400, y: 52, 'text-anchor': 'middle', class: 'cy-title' }, '');
    const verdict = C.tag(400, 425, '', 'is-bad');
    svg.append(wire, tap, lockMid, you, fake, bank, hacker, copy, pkt, title, verdict);
    gsap.set([fake, lockMid, verdict], { autoAlpha: 0 });

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    function setTitle(txt, cls) { title.textContent = t(txt); title.setAttribute('class', 'cy-title ' + (cls || '')); gsap.fromTo(title, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }); }
    function say(txt, cls) {
      verdict.lastChild.textContent = t(txt);
      verdict.setAttribute('class', 'cy-tag ' + cls);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      verdict.firstChild.setAttribute('x', -w / 2); verdict.firstChild.setAttribute('width', w);
      gsap.fromTo(verdict, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' });
    }

    function story(i) {
      const secure = i >= 3;
      gsap.to(lockMid, { autoAlpha: secure ? 1 : 0, duration: 0.4 });
      wire.classList.toggle('is-secure', secure);
      gsap.to(fake, { autoAlpha: !secure && i === 2 ? 1 : 0, duration: 0.4 });
      gsap.to(bank, { autoAlpha: !secure && i === 2 ? 0 : 1, duration: 0.4 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      loops.push(tl);
      if (i === 0) {
        setTitle({ ar: '١) التنصّت: حد بيقرا رسالتك', en: '1) Eavesdropping: someone reads your message' }, 'bad');
        tl.add(() => { pkt.setText({ ar: 'كلمة السر: 1234', en: 'password: 1234' }); copy.setText({ ar: 'كلمة السر: 1234', en: 'password: 1234' }); pkt.setAttribute('class', 'cy-packet is-plain'); copy.setAttribute('class', 'cy-packet is-plain'); })
          .add(C.fly(pkt, A, B, { duration: 2 }), 0)
          .add(C.fly(copy, { x: 400, y: 170 }, H, { duration: 0.8 }), 1)
          .add(() => { say({ ar: '👀 المهاجم قرا كلمة السر!', en: '👀 The attacker read your password!' }, 'is-bad'); api.sound.play('bad'); }, 1.8)
          .to([pkt, copy], { opacity: 0, duration: 0.3 }, '+=1.4');
      } else if (i === 1) {
        setTitle({ ar: '٢) التلاعب: حد بيغيّر الرسالة في السكة', en: '2) Tampering: someone changes the message on the way' }, 'bad');
        gsap.set(copy, { opacity: 0 });
        tl.add(() => { pkt.setText({ ar: 'حوّل 100 جنيه', en: 'send EGP 100' }); pkt.setAttribute('class', 'cy-packet is-plain'); })
          .add(C.fly(pkt, A, { x: 400, y: 170 }, { duration: 1 }), 0)
          .to(pkt, { y: 250, duration: 0.4 })
          .add(() => { pkt.setText({ ar: 'حوّل 10,000 جنيه', en: 'send EGP 10,000' }); pkt.setAttribute('class', 'cy-packet is-bad'); api.sound.play('beep'); })
          .to(pkt, { y: 170, duration: 0.4, delay: 0.3 })
          .to(pkt, { x: B.x, duration: 1 })
          .add(() => say({ ar: '✏️ الرسالة اتغيّرت والبنك مش واخد باله!', en: '✏️ The message was changed and the bank never noticed!' }, 'is-bad'))
          .to(pkt, { opacity: 0, duration: 0.3 }, '+=1.4');
      } else if (i === 2) {
        setTitle({ ar: '٣) انتحال الهوية: موقع بيدّعي إنه البنك', en: '3) Impersonation: a site pretends to be the bank' }, 'bad');
        gsap.set(copy, { opacity: 0 });
        tl.add(() => { pkt.setText({ ar: 'كلمة السر: 1234', en: 'password: 1234' }); pkt.setAttribute('class', 'cy-packet is-plain'); })
          .add(C.fly(pkt, A, B, { duration: 2 }), 0)
          .add(() => { say({ ar: '🎭 بعتّ كلمة السر لبنك مزيّف!', en: '🎭 You sent your password to a fake bank!' }, 'is-bad'); api.sound.play('bad'); })
          .to(pkt, { opacity: 0, duration: 0.3 }, '+=1.4');
      } else {
        setTitle({ ar: '🔒 HTTPS: تشفير + كشف تلاعب + تحقق من الطرف التاني', en: '🔒 HTTPS: encryption + tamper detection + partner verification' }, 'good');
        tl.add(() => { pkt.setText(C.scramble('password 1234')); copy.setText(C.scramble('password 1234')); pkt.setAttribute('class', 'cy-packet is-cipher'); copy.setAttribute('class', 'cy-packet is-cipher'); })
          .add(C.fly(pkt, A, B, { duration: 2 }), 0)
          .add(C.fly(copy, { x: 400, y: 170 }, H, { duration: 0.8 }), 1)
          .add(() => { say({ ar: '✅ المهاجم شايف رموز مالهاش معنى — والبنك اتأكّد إنه الحقيقي', en: '✅ The attacker sees meaningless symbols — and the bank is verified as real' }, 'is-good'); api.sound.play('ok'); }, 1.8)
          .to([pkt, copy], { opacity: 0, duration: 0.3 }, '+=1.6');
      }
    }

    return { beat(i) { kill(); gsap.set(verdict, { autoAlpha: 0 }); story(Math.min(i, 3)); } };
  });

  /* ───────────────────────── commonKey ───────────────────────── */
  K.defineAnim('commonKey', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const WORD = props.word || 'HELLO';
    let key = 3;
    const shift = (str, k) => Array.from(str).map((c) => (/[A-Z]/.test(c) ? String.fromCharCode(((c.charCodeAt(0) - 65 + k + 26) % 26) + 65) : c)).join('');
    const tiles = (str) => Array.from(str).map((c) => h('span', { class: 'ck-tile mono' }, c));
    const plainBox = h('div', { class: 'ck-row' }, tiles(WORD));
    const cipherBox = h('div', { class: 'ck-row is-cipher' }, tiles(shift(WORD, key)));
    const backBox = h('div', { class: 'ck-row' }, tiles(WORD));
    const keyBadge = () => h('span', { class: 'ck-key' }, api.icon('key'), h('b', { class: 'mono' }, '+' + key));
    const k1 = h('div', { class: 'ck-step' }, keyBadge(), h('small', null, t({ ar: 'نفس المفتاح يقفل', en: 'the key locks' })));
    const k2 = h('div', { class: 'ck-step' }, keyBadge(), h('small', null, t({ ar: 'ونفس المفتاح يفتح', en: 'the same key unlocks' })));
    const slider = h('input', { type: 'range', min: 1, max: 9, value: key, class: 'ck-slider', 'aria-label': 'key' });
    const sliderBox = h('label', { class: 'ck-slide' }, h('span', null, '🔑 ', t({ ar: 'غيّر المفتاح:', en: 'Change the key:' })), slider);
    const lane = h('div', { class: 'ck-lane' },
      h('div', { class: 'ck-col' }, h('small', { class: 'muted' }, t({ ar: 'الرسالة', en: 'Message' })), plainBox),
      k1,
      h('div', { class: 'ck-col' }, h('small', { class: 'muted' }, t({ ar: 'مشفّرة', en: 'Encrypted' })), cipherBox),
      k2,
      h('div', { class: 'ck-col' }, h('small', { class: 'muted' }, t({ ar: 'رجعت تاني', en: 'Decrypted' })), backBox));
    const speed = h('div', { class: 'ck-speed' }, h('span', null, '⚡ ', t({ ar: 'تشفير فيديو 1 جيجا', en: 'Encrypting a 1 GB video' })), h('div', { class: 'ck-bar' }, h('i')), h('b', { class: 'ck-time mono' }, ''));
    const problem = h('div', { class: 'ck-problem' },
      h('div', { class: 'ck-trip' }, h('span', { class: 'ck-end' }, api.icon('monitor')), h('span', { class: 'ck-flykey' }, api.icon('key')), h('span', { class: 'ck-end' }, api.icon('server'))),
      h('div', { class: 'ck-thief' }, api.icon('hacker'), h('span', null, t({ ar: 'اتنسخ!', en: 'copied!' }))),
      h('p', null, t({ ar: '⚠️ المشكلة: لازم نبعت المفتاح للطرف التاني الأول… ولو حد نسخه في السكة، يقدر يفك كل الرسايل!', en: '⚠️ The problem: the key must reach the other side first… and if someone copies it on the way, they can read everything!' })));
    const wrap = h('div', { class: 'ck-wrap' },
      h('h4', { class: 'ck-head' }, '🔑 ', t({ ar: 'التشفير بالمفتاح المتناظر (المشترك): مفتاح واحد للقفل والفتح', en: 'Common-key (symmetric) cryptography: one key locks and unlocks' })),
      lane, sliderBox, speed, problem);
    stage.appendChild(wrap);

    function render(animate) {
      const enc = shift(WORD, key);
      Array.from(cipherBox.children).forEach((el, i) => { el.textContent = enc[i]; });
      [k1, k2].forEach((k) => { k.firstChild.lastChild.textContent = (k === k1 ? '+' : '−') + key; });
      if (animate) gsap.fromTo(cipherBox.children, { rotateX: -90, opacity: 0 }, { rotateX: 0, opacity: 1, stagger: 0.07, duration: 0.4 });
    }
    api.on(slider, 'input', () => { key = +slider.value; render(true); api.sound.play('tap'); });
    render(false);

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        gsap.set([speed, problem], { autoAlpha: 0 });
        gsap.set(backBox, { autoAlpha: i >= 1 ? 1 : 0.15 });
        gsap.set(k2, { autoAlpha: i >= 1 ? 1 : 0.15 });
        if (i === 0) {
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
            .fromTo(plainBox.children, { y: 0 }, { y: -8, stagger: 0.06, duration: 0.25, yoyo: true, repeat: 1 })
            .fromTo(k1, { scale: 1 }, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 1 })
            .fromTo(cipherBox.children, { rotateX: -90, opacity: 0 }, { rotateX: 0, opacity: 1, stagger: 0.08, duration: 0.4 }));
        } else if (i === 1) {
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
            .fromTo(k2, { scale: 1 }, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 1 })
            .fromTo(backBox.children, { rotateX: 90, opacity: 0 }, { rotateX: 0, opacity: 1, stagger: 0.08, duration: 0.4 }));
        } else if (i === 2) {
          gsap.to(speed, { autoAlpha: 1, duration: 0.3 });
          const bar = speed.querySelector('i');
          const time = speed.querySelector('.ck-time');
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
            .fromTo(bar, { width: '0%' }, { width: '100%', duration: 0.9, ease: 'power2.out', onUpdate() { time.textContent = (this.progress() * 0.4).toFixed(2) + 's'; } })
            .add(() => { time.textContent = t({ ar: '0.4 ثانية ⚡ سريع جدًا', en: '0.4 s ⚡ very fast' }); }));
        } else {
          gsap.to(problem, { autoAlpha: 1, duration: 0.3 });
          const fk = problem.querySelector('.ck-flykey');
          const thief = problem.querySelector('.ck-thief');
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .fromTo(fk, { xPercent: RV.i18n.lang === 'ar' ? 160 : -160 }, { xPercent: RV.i18n.lang === 'ar' ? -160 : 160, duration: 1.8, ease: 'none' })
            .fromTo(thief, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, 0.8)
            .add(() => api.sound.play('bad'), 0.8)
            .to(thief, { opacity: 0, duration: 0.3 }, '+=1'));
        }
      },
    };
  });

  /* ───────────────────────── keyPair ───────────────────────── */
  K.defineAnim('keyPair', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 460);
    const BR = { x: 120, y: 200 }, SV = { x: 680, y: 200 }, HK = { x: 400, y: 360 };
    const browser = C.node(BR.x, BR.y, 'monitor', { ar: 'المتصفح', en: 'Browser' }, 'is-you');
    const server = C.node(SV.x, SV.y, 'server', { ar: 'الخادم', en: 'Server' }, 'is-good');
    const hacker = C.node(HK.x, HK.y, 'hacker', { ar: 'المهاجم', en: 'Attacker' }, 'is-bad', 72);
    const wire = C.link(BR, SV, 'cy-wire');
    // the key pair, held by the server
    const pub = s('g', { class: 'kp-pub' }, s('rect', { x: -34, y: -34, width: 68, height: 68, rx: 16 }), api.svgIcon('unlock', 0, -2, 38, { class: 'svg-ico' }));
    const priv = s('g', { class: 'kp-priv' }, s('rect', { x: -34, y: -34, width: 68, height: 68, rx: 16 }), api.svgIcon('key', 0, 0, 38, { class: 'svg-ico' }));
    const pubLbl = s('text', { x: 0, y: 56, 'text-anchor': 'middle', class: 'cy-small' }, t({ ar: 'عام 🔓 للكل', en: 'public 🔓 for all' }));
    const privLbl = s('text', { x: 0, y: 56, 'text-anchor': 'middle', class: 'cy-small' }, t({ ar: 'خاص 🔑 سرّي', en: 'private 🔑 secret' }));
    pub.appendChild(pubLbl); priv.appendChild(privLbl);
    gsap.set(pub, { x: 560, y: 90 }); gsap.set(priv, { x: 720, y: 90 });
    const box = s('g', { class: 'kp-box' }, s('rect', { x: -40, y: -26, width: 80, height: 52, rx: 10 }), s('text', { x: 0, y: 6, 'text-anchor': 'middle', class: 'mono' }, '🔑'));
    const boxLock = api.svgIcon('lock', 0, -36, 30, { class: 'svg-ico kp-boxlock' });
    box.appendChild(boxLock);
    gsap.set(box, { x: BR.x, y: BR.y, opacity: 0 });
    const fail = C.tag(HK.x, 285, { ar: '❌ مفتاحه مايفتحش القفل', en: '❌ his key cannot open it' }, 'is-bad');
    const ok = C.tag(SV.x, 300, { ar: '✅ اتفتح بالمفتاح الخاص', en: '✅ opened with the private key' }, 'is-good');
    const title = s('text', { x: 400, y: 32, 'text-anchor': 'middle', class: 'cy-title' }, '');
    // slow-vs-fast race
    const race = s('g', { class: 'kp-race' });
    const lane = (y, label, cls) => {
      const g = s('g', null, s('text', { x: 90, y: y + 6, 'text-anchor': 'end', class: 'cy-small' }, t(label)),
        s('rect', { x: 110, y: y - 12, width: 560, height: 24, rx: 12, class: 'kp-track' }), s('rect', { x: 110, y: y - 12, width: 0, height: 24, rx: 12, class: 'kp-fill ' + cls }));
      race.appendChild(g);
      return g.lastChild;
    };
    const slowBar = lane(160, { ar: 'مفتاح عام', en: 'public-key' }, 'slow');
    const fastBar = lane(230, { ar: 'مفتاح متناظر', en: 'common-key' }, 'fast');
    const raceNote = s('text', { x: 400, y: 310, 'text-anchor': 'middle', class: 'cy-sub' }, t({ ar: 'نفس الملف الكبير: العام بطيء 🐢 — المتناظر سريع ⚡', en: 'Same big file: public-key is slow 🐢 — common-key is fast ⚡' }));
    race.appendChild(raceNote);
    svg.append(wire, browser, server, hacker, pub, priv, box, fail, ok, race, title);
    gsap.set([fail, ok, race], { autoAlpha: 0 });

    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    const setTitle = (txt) => { title.textContent = t(txt); gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.4 }); };
    return {
      beat(i) {
        kill();
        gsap.set([fail, ok], { autoAlpha: 0 });
        const scene = i >= 3 ? 'race' : 'pair';
        gsap.to(race, { autoAlpha: scene === 'race' ? 1 : 0, duration: 0.3 });
        gsap.to([wire, browser, server, hacker, pub, priv, box], { autoAlpha: scene === 'race' ? 0 : 1, duration: 0.3 });
        if (i === 0) {
          setTitle({ ar: 'زوج مفاتيح مرتبطين: اللي يقفله العام… مايفتحهوش غير الخاص', en: 'A linked pair: what the public key locks… only the private key opens' });
          gsap.set(box, { opacity: 0 });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).to(pub, { y: 80, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }).to(priv, { y: 80, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }));
        } else if (i === 1 || i === 2) {
          setTitle(i === 1 ? { ar: 'المتصفح ياخد القفل المفتوح ويقفل بيه صندوق فيه السر', en: 'The browser takes the open padlock and locks a box holding the secret' }
            : { ar: 'المهاجم مسك الصندوق… بس مايقدرش يفتحه — الخادم بس يقدر', en: 'The attacker grabs the box… but cannot open it — only the server can' });
          const pc = pub.cloneNode(true);
          svg.appendChild(pc);
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, onRepeat: () => gsap.set([fail, ok], { autoAlpha: 0 }) });
          tl.fromTo(pc, { x: 560, y: 90, opacity: 1 }, { x: BR.x, y: 90, duration: 1.2, ease: 'power2.inOut' })
            .set(box, { x: BR.x, y: BR.y, opacity: 1 })
            .fromTo(boxLock, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' })
            .to(pc, { opacity: 0, duration: 0.3 }, '<')
            .add(() => api.sound.play('pop'));
          if (i === 2) {
            tl.to(box, { x: 400, duration: 1, ease: 'power1.inOut' })
              .to(box, { y: 300, duration: 0.5 })
              .to(box, { rotation: 8, duration: 0.08, yoyo: true, repeat: 5 })
              .add(() => { gsap.to(fail, { autoAlpha: 1, duration: 0.3 }); api.sound.play('bad'); })
              .to(box, { y: BR.y, duration: 0.5, delay: 0.6 })
              .to(box, { x: SV.x, duration: 1, ease: 'power1.inOut' })
              .to(priv, { x: SV.x, y: 120, duration: 0.6 }, '<')
              .add(() => { gsap.to(boxLock, { opacity: 0, y: -16, duration: 0.3 }); gsap.to(ok, { autoAlpha: 1, duration: 0.3 }); api.sound.play('ok'); })
              .to(priv, { x: 720, y: 90, duration: 0.6, delay: 1 });
          }
          loops.push(tl, { kill: () => pc.remove() });
        } else {
          setTitle({ ar: 'العيب: المفتاح العام بطيء على البيانات الكتير', en: 'The drawback: public-key is slow for lots of data' });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .set([slowBar, fastBar], { attr: { width: 0 } })
            .to(fastBar, { attr: { width: 560 }, duration: 0.8, ease: 'power2.out' }, 0)
            .to(slowBar, { attr: { width: 560 }, duration: 6, ease: 'none' }, 0));
        }
      },
    };
  });

  /* ───────────────────────── tlsHandshake ─────────────────────────
   * A sequence diagram that builds itself: every message leaves its arrow
   * on screen, so by the end the whole handshake is visible at once.
   *   beat 0 the three players · 1 ① certificate + public key · 2 ① CA check
   *   3 ② session key locked with the public key · 4 ② opened with the private key
   *   5 ③ fast data with the common key · 6 the division of roles
   */
  K.defineAnim('tlsHandshake', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 540);
    const BX = 130, SX = 670, CX = 400;
    const bn = C.banner(svg, 34);
    const lifeB = s('line', { x1: BX, y1: 160, x2: BX, y2: 525, class: 'cy-lifeline' });
    const lifeS = s('line', { x1: SX, y1: 160, x2: SX, y2: 525, class: 'cy-lifeline' });
    const lifeC = s('line', { x1: CX, y1: 150, x2: CX, y2: 290, class: 'cy-lifeline' });
    const browser = C.node(BX, 112, 'monitor', { ar: 'المتصفح', en: 'Browser' }, 'is-you', 74);
    const server = C.node(SX, 112, 'server', { ar: 'خادم الويب', en: 'Web server' }, 'is-good', 74);
    const ca = C.node(CX, 112, 'stamp', { ar: 'جهة الشهادات CA', en: 'Certificate authority' }, 'is-ca', 64);
    svg.insertBefore(lifeC, svg.firstChild); svg.insertBefore(lifeS, svg.firstChild); svg.insertBefore(lifeB, svg.firstChild);
    const keyPubS = api.svgIcon('unlock', SX + 58, 112, 30, { class: 'svg-ico tls-pub' });
    const keyPrivS = api.svgIcon('key', SX + 58, 150, 28, { class: 'svg-ico tls-priv' });
    const sessB = api.svgIcon('key', BX - 54, 330, 34, { class: 'svg-ico tls-k' });
    const sessS = api.svgIcon('key', SX + 54, 330, 34, { class: 'svg-ico tls-k' });
    // the arrows (rows go down the lifelines)
    const T = {
      cert: C.trail({ x: SX - 8, y: 190 }, { x: BX + 8, y: 190 }, { ar: '① 📜 شهادة رقمية + 🔓 مفتاح عام', en: '① 📜 certificate + 🔓 public key' }, 'pub'),
      ask: C.trail({ x: BX + 8, y: 238 }, { x: CX - 8, y: 238 }, { ar: 'الشهادة دي سليمة؟', en: 'is this certificate valid?' }, 'ok'),
      yes: C.trail({ x: CX - 8, y: 274 }, { x: BX + 8, y: 274 }, { ar: '✅ أيوه — الموقع حقيقي', en: '✅ yes — the site is genuine' }, 'ok'),
      sess: C.trail({ x: BX + 8, y: 330 }, { x: SX - 8, y: 330 }, { ar: '② 🔒 مفتاح الجلسة (مقفول بالمفتاح العام)', en: '② 🔒 session key (locked with the public key)' }, 'pub'),
      d1: C.trail({ x: BX + 8, y: 420 }, { x: SX - 8, y: 420 }, { ar: '③ بيانات مشفّرة ⚡', en: '③ encrypted data ⚡' }, 'common'),
      d2: C.trail({ x: SX - 8, y: 460 }, { x: BX + 8, y: 460 }, { ar: '③ صفحة الموقع مشفّرة ⚡', en: '③ encrypted web page ⚡' }, 'common'),
      d3: C.trail({ x: BX + 8, y: 500 }, { x: SX - 8, y: 500 }, { ar: '③ كلمة السر مشفّرة ⚡', en: '③ encrypted password ⚡' }, 'common'),
    };
    const opened = C.tag(SX - 120, 372, { ar: '🔑 فكّه بمفتاحه الخاص', en: '🔑 opened with its private key' }, 'is-pub');
    const same = C.tag(400, 372, { ar: '🤝 نفس المفتاح مع الاتنين', en: '🤝 both hold the same key' }, 'is-good');
    const spy = C.node(400, 470, 'hacker', null, 'is-bad', 48);
    const spyTag = C.tag(400, 520, { ar: 'المتنصّت شايف رموز بس', en: 'the eavesdropper sees only symbols' }, 'is-bad');
    const legend = s('g', { class: 'tls-legend' });
    legend.append(
      s('rect', { x: 150, y: 382, width: 500, height: 110, rx: 16, class: 'fw-card' }),
      s('text', { x: 400, y: 418, 'text-anchor': 'middle', class: 'cy-trail-t pub' }, t({ ar: 'بنفسجي = مفتاح عام ← مشاركة المفتاح بأمان (بطيء)', en: 'purple = public-key → share the key safely (slow)' })),
      s('text', { x: 400, y: 452, 'text-anchor': 'middle', class: 'cy-trail-t common' }, t({ ar: 'أزرق = مفتاح متناظر ← البيانات الكتير بسرعة', en: 'blue = common-key → lots of data, fast' })),
      s('text', { x: 400, y: 480, 'text-anchor': 'middle', class: 'cy-trail-t ok' }, t({ ar: 'النتيجة: أمان + سرعة مع بعض', en: 'result: security + speed together' })));
    svg.append(keyPubS, keyPrivS, sessB, sessS, ...Object.values(T).map((x) => x.g), opened, same, spy, spyTag, legend);
    gsap.set([keyPubS, keyPrivS, sessB, sessS, opened, same, spy, spyTag, legend], { autoAlpha: 0 });

    const ROWS = [[], ['cert'], ['ask', 'yes'], ['sess'], [], ['d1', 'd2', 'd3'], []];
    const BANNERS = [
      ['', { ar: 'مصافحة TLS: 3 مراحل بين المتصفح والخادم', en: 'TLS handshake: 3 stages between browser and server' }, ''],
      [1, { ar: 'الاتصال: الخادم يبعت شهادته الرقمية + مفتاحه العام', en: 'Connection: the server sends its certificate + public key' }, ''],
      [1, { ar: 'الاتصال: المتصفح يتحقق من الخادم عن طريق CA', en: 'Connection: the browser verifies the server via the CA' }, 'is-good'],
      [2, { ar: 'تبادل المفتاح: المتصفح يقفل مفتاح الجلسة بالمفتاح العام', en: 'Key exchange: the browser locks the session key with the public key' }, ''],
      [2, { ar: 'تبادل المفتاح: الخادم يفتحه بمفتاحه الخاص', en: 'Key exchange: the server opens it with its private key' }, 'is-good'],
      [3, { ar: 'تبادل البيانات: كل حاجة مشفّرة بالمفتاح المتناظر ⚡', en: 'Data: everything encrypted with the common key ⚡' }, ''],
      ['', { ar: 'العام لمشاركة المفتاح · المتناظر للبيانات', en: 'public-key shares the key · common-key moves the data' }, 'is-good'],
    ];
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        const b = BANNERS[Math.min(i, BANNERS.length - 1)];
        bn.set(b[0], b[1], b[2]);
        // earlier rows stay drawn; the current row draws itself now
        Object.entries(T).forEach(([k, tr]) => {
          const row = ROWS.findIndex((r) => r.includes(k));
          if (row < i && i < 6) tr.show(); else if (row !== i || i >= 6) tr.hide();
        });
        gsap.set(keyPubS, { autoAlpha: i >= 1 ? 1 : 0 });
        gsap.set(keyPrivS, { autoAlpha: i >= 1 ? 1 : 0 });
        gsap.set([sessB], { autoAlpha: i >= 3 && i < 6 ? 1 : 0 });
        gsap.set([sessS, same], { autoAlpha: i >= 5 && i < 6 ? 1 : 0 });
        gsap.set([opened], { autoAlpha: 0 });
        gsap.set([spy, spyTag], { autoAlpha: 0 });
        gsap.set(legend, { autoAlpha: i >= 6 ? 1 : 0 });
        const tl = gsap.timeline();
        loops.push(tl);
        if (i === 0) {
          tl.add(C.pop(browser)).add(C.pop(server), 0.25).add(C.pop(ca), 0.5);
        } else if (i === 1) {
          tl.add(T.cert.play()).fromTo(keyPubS, { scale: 1.6, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4 }, 0);
          api.sound.play('whoosh');
        } else if (i === 2) {
          tl.add(T.ask.play()).add(() => api.sound.play('pop')).fromTo(ca, { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.15, duration: 0.3, yoyo: true, repeat: 1 }).add(T.yes.play()).add(() => api.sound.play('ok'));
        } else if (i === 3) {
          tl.fromTo(sessB, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.5)' })
            .add(() => api.sound.play('pop'))
            .add(T.sess.play(), '+=0.3');
        } else if (i === 4) {
          T.sess.show();
          tl.to(keyPrivS, { x: -6, duration: 0.15, yoyo: true, repeat: 3 })
            .fromTo(opened, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
            .fromTo(sessS, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.5)' })
            .fromTo(same, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
            .add(() => api.sound.play('ok'));
          loops.push(gsap.to([sessB, sessS], { scale: 1.15, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: -1, delay: 1.4 }));
        } else if (i === 5) {
          tl.add(T.d1.play()).add(T.d2.play(), '-=0.6').add(T.d3.play(), '-=0.6')
            .to([spy, spyTag], { autoAlpha: 1, duration: 0.4 });
        } else {
          tl.fromTo(legend, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 });
        }
      },
    };
  });

  /* ───────────────────────── signCert ───────────────────────── */
  K.defineAnim('signCert', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 460);
    const SE = { x: 120, y: 200 }, RE = { x: 680, y: 200 };
    const sender = C.node(SE.x, SE.y, 'user', { ar: 'أحمد (المرسِل)', en: 'Ahmed (sender)' }, 'is-you');
    const recv = C.node(RE.x, RE.y, 'building', { ar: 'المتجر (المستقبِل)', en: 'Shop (receiver)' }, 'is-good');
    const wire = C.link(SE, RE, 'cy-wire');
    const doc = s('g', { class: 'sg-doc' }, s('rect', { x: -70, y: -46, width: 140, height: 92, rx: 10 }),
      s('text', { x: 0, y: -14, 'text-anchor': 'middle', class: 'sg-line' }, t({ ar: 'اطلب لابتوب', en: 'Order laptop' })),
      s('text', { x: 0, y: 16, 'text-anchor': 'middle', class: 'sg-qty mono' }, '× 1'));
    const seal = s('g', { class: 'sg-seal' }, s('circle', { cx: 50, cy: 34, r: 22 }), api.svgIcon('stamp', 50, 34, 24, { class: 'svg-ico' }));
    doc.appendChild(seal);
    gsap.set(doc, { x: SE.x, y: 80 });
    const privK = api.svgIcon('key', SE.x + 70, 80, 30, { class: 'svg-ico sg-priv' });
    const pubK = api.svgIcon('unlock', RE.x - 70, 80, 30, { class: 'svg-ico sg-pub' });
    const hacker = C.node(400, 360, 'hacker', { ar: 'المهاجم', en: 'Attacker' }, 'is-bad', 66);
    const verdict = C.tag(400, 440, '', 'is-good');
    const title = s('text', { x: 400, y: 30, 'text-anchor': 'middle', class: 'cy-title' }, '');
    // certificate scene
    const certG = s('g');
    const real = C.node(250, 210, 'globe', { ar: 'bank.com.eg', en: 'bank.com.eg' }, 'is-good');
    const fake = C.node(550, 210, 'globe', { ar: 'bank-eg.xyz', en: 'bank-eg.xyz' }, 'is-bad');
    const caN = C.node(400, 80, 'stamp', { ar: 'جهة الشهادات CA', en: 'Certificate authority' }, 'is-ca', 66);
    const okTag = C.tag(250, 320, { ar: '📜 شهادة سليمة ← 🔒', en: '📜 valid certificate → 🔒' }, 'is-good');
    const badTag = C.tag(550, 320, { ar: '⚠️ مفيش شهادة صحيحة — احذر!', en: '⚠️ no valid certificate — beware!' }, 'is-bad');
    certG.append(C.link({ x: 400, y: 80 }, { x: 250, y: 210 }, 'cy-tap'), real, fake, caN, okTag, badTag);
    svg.append(wire, sender, recv, hacker, doc, privK, pubK, certG, verdict, title);
    gsap.set([certG, verdict, seal], { autoAlpha: 0 });

    const qty = doc.querySelector('.sg-qty');
    function say(txt, cls) {
      verdict.lastChild.textContent = t(txt);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      verdict.firstChild.setAttribute('x', -w / 2); verdict.firstChild.setAttribute('width', w);
      verdict.setAttribute('class', 'cy-tag ' + cls);
      gsap.fromTo(verdict, { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    const setTitle = (txt) => { title.textContent = t(txt); gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.4 }); };
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        const certScene = i >= 4;
        gsap.to(certG, { autoAlpha: certScene ? 1 : 0, duration: 0.3 });
        gsap.to([wire, sender, recv, hacker, doc, privK, pubK], { autoAlpha: certScene ? 0 : 1, duration: 0.3 });
        gsap.set(verdict, { autoAlpha: 0 });
        qty.textContent = '× 1'; doc.classList.remove('is-bad');
        if (i === 0) {
          setTitle({ ar: 'التوقيع الرقمي: المرسِل يوقّع بمفتاحه الخاص 🔑', en: 'Digital signature: the sender signs with the private key 🔑' });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
            .set(seal, { autoAlpha: 0 }).set(doc, { x: SE.x, y: 80 })
            .to(privK, { x: -40, duration: 0.5, yoyo: true, repeat: 1 })
            .fromTo(seal, { autoAlpha: 0, scale: 2, transformOrigin: '50px 34px' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
            .add(() => api.sound.play('pop')));
        } else if (i === 1) {
          setTitle({ ar: 'المستقبِل يتحقّق بالمفتاح العام للمرسِل 🔓', en: 'The receiver verifies with the sender’s public key 🔓' });
          gsap.set(seal, { autoAlpha: 1 });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
            .fromTo(doc, { x: SE.x, y: 80 }, { x: RE.x, duration: 1.6, ease: 'power1.inOut' })
            .to(pubK, { y: 70, duration: 0.3, yoyo: true, repeat: 1 })
            .add(() => { say({ ar: '✅ التوقيع سليم: الرسالة ماتغيّرتش، والمرسِل هو أحمد فعلًا', en: '✅ Valid signature: unchanged, and really from Ahmed' }, 'is-good'); api.sound.play('ok'); })
            .to(verdict, { autoAlpha: 0, duration: 0.3 }, '+=1.6'));
        } else if (i === 2) {
          setTitle({ ar: 'لو حد غيّر الرسالة في السكة… التحقق يفشل فورًا', en: 'If someone changes the message on the way… verification fails at once' });
          gsap.set(seal, { autoAlpha: 1 });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
            .add(() => { qty.textContent = '× 1'; doc.classList.remove('is-bad'); })
            .fromTo(doc, { x: SE.x, y: 80 }, { x: 400, duration: 0.9 })
            .to(doc, { y: 250, duration: 0.4 })
            .add(() => { qty.textContent = '× 9'; doc.classList.add('is-bad'); api.sound.play('beep'); })
            .to(doc, { y: 80, duration: 0.4, delay: 0.4 })
            .to(doc, { x: RE.x, duration: 0.9 })
            .to(pubK, { y: 70, duration: 0.3, yoyo: true, repeat: 1 })
            .add(() => { say({ ar: '❌ التوقيع مش مطابق — اتكشف التلاعب!', en: '❌ Signature does not match — tampering detected!' }, 'is-bad'); api.sound.play('bad'); })
            .to(verdict, { autoAlpha: 0, duration: 0.3 }, '+=1.6'));
        } else if (i === 3) {
          setTitle({ ar: 'عدم الإنكار: أحمد مايقدرش يقول «مبعتش حاجة»', en: 'Non-repudiation: Ahmed cannot say "I never sent it"' });
          gsap.set(seal, { autoAlpha: 1 }); gsap.set(doc, { x: RE.x, y: 80 });
          say({ ar: '🔏 التوقيع ماطلعش غير من مفتاحه الخاص — يبقى هو اللي بعت', en: '🔏 Only his private key could make this signature — so he sent it' }, 'is-good');
          loops.push(gsap.to(seal, { scale: 1.15, transformOrigin: '50px 34px', duration: 0.6, yoyo: true, repeat: -1 }));
        } else {
          setTitle({ ar: 'الشهادة الرقمية: بتثبت إن الموقع حقيقي (بضمان جهة الشهادات)', en: 'Digital certificate: proves the site is genuine (vouched for by a CA)' });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
            .set([okTag, badTag], { autoAlpha: 0 })
            .fromTo(caN, { scale: 1 }, { scale: 1.15, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 })
            .add(() => { gsap.fromTo(okTag, { autoAlpha: 0, y: 330 }, { autoAlpha: 1, y: 320, duration: 0.4 }); api.sound.play('ok'); })
            .add(() => { gsap.fromTo(badTag, { autoAlpha: 0, y: 330 }, { autoAlpha: 1, y: 320, duration: 0.4 }); api.sound.play('bad'); }, '+=0.8')
            .fromTo(fake, { x: 550 }, { x: 556, duration: 0.07, yoyo: true, repeat: 7 }, '<'));
        }
      },
    };
  });

  /* ───────────────────────── mfaDemo ───────────────────────── */
  K.defineAnim('mfaDemo', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const F = [
      { id: 'know', icon: 'brain', title: { ar: 'المعرفة', en: 'Knowledge' }, sub: { ar: 'حاجة إنت عارفها', en: 'something you know' }, ex: { ar: 'كلمة السر · PIN', en: 'password · PIN' } },
      { id: 'have', icon: 'phone', title: { ar: 'الحيازة', en: 'Possession' }, sub: { ar: 'حاجة معاك', en: 'something you have' }, ex: { ar: 'موبايل (OTP / SMS) · كارت ذكي', en: 'phone (OTP / SMS) · smart card' } },
      { id: 'are', icon: 'fingerprint', title: { ar: 'الحيوية', en: 'Biometric' }, sub: { ar: 'حاجة هي إنت', en: 'something you are' }, ex: { ar: 'بصمة الإصبع · الوجه', en: 'fingerprint · face' } },
    ];
    const cards = F.map((f) => h('div', { class: 'mf-card mf-' + f.id }, h('span', { class: 'mf-ico' }, api.icon(f.icon)), h('b', null, t(f.title)), h('small', null, t(f.sub)), h('em', null, t(f.ex))));
    const factors = h('div', { class: 'mf-factors' }, cards);
    // login simulation
    const pw = h('div', { class: 'mf-field' }, api.icon('key'), h('span', { class: 'mono' }, '••••••'));
    const otp = h('div', { class: 'mf-field mf-otp' }, api.icon('sms'), h('span', { class: 'mono' }, t({ ar: 'الكود اتبعت لموبايلك', en: 'code sent to your phone' })));
    const result = h('div', { class: 'mf-result' });
    const thief = h('div', { class: 'mf-thief' }, api.icon('hacker'), h('span', null, t({ ar: 'المهاجم عرف كلمة السر', en: 'the attacker knows the password' })));
    const login = h('div', { class: 'mf-login' }, h('div', { class: 'mf-screen' }, h('b', null, '🏦 ', t({ ar: 'تسجيل الدخول', en: 'Sign in' })), pw, otp, result), thief);
    // two passwords trap + services table
    const trap = h('div', { class: 'mf-trap' },
      h('div', { class: 'mf-combo bad' }, h('span', null, '🧠 + 🧠'), h('b', null, t({ ar: 'كلمتين سر = مش MFA', en: 'two passwords = NOT MFA' })), h('small', null, t({ ar: 'نفس العامل (معرفة) مرتين', en: 'the same factor (knowledge) twice' }))),
      h('div', { class: 'mf-combo ok' }, h('span', null, '🧠 + 📱'), h('b', null, t({ ar: 'كلمة سر + OTP = MFA ✓', en: 'password + OTP = MFA ✓' })), h('small', null, t({ ar: 'عاملين مختلفين', en: 'two different factors' }))));
    const services = h('div', { class: 'mf-services' }, [
      [{ ar: '🏦 البنك أونلاين', en: '🏦 Online banking' }, { ar: 'كلمة سر + كلمة سر لمرة واحدة (OTP)', en: 'password + one-time password' }, '🧠📱'],
      [{ ar: '💬 تسجيل دخول السوشيال', en: '💬 SNS login' }, { ar: 'كلمة سر + رسالة SMS', en: 'password + SMS' }, '🧠📱'],
      [{ ar: '💻 لابتوب الشركة', en: '💻 Company laptop' }, { ar: 'كارت ذكي + بصمة', en: 'smart card + fingerprint' }, '📱👆'],
      [{ ar: '🛒 التسوّق أونلاين', en: '🛒 Online shopping' }, { ar: 'كلمة سر + كود 3-D Secure', en: 'password + 3-D Secure code' }, '🧠📱'],
    ].map(([a, b, c]) => h('div', { class: 'mf-svc' }, h('b', null, t(a)), h('span', null, t(b)), h('i', null, c))));
    const wrap = h('div', { class: 'mf-wrap' }, factors, login, trap, services);
    stage.appendChild(wrap);

    function show(el, on) { el.hidden = !on; }
    function res(txt, cls) { result.className = 'mf-result ' + cls; result.textContent = t(txt); gsap.fromTo(result, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }); }
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        show(factors, i === 0 || i === 3);
        show(login, i === 1 || i === 2);
        show(trap, i === 3);
        show(services, i >= 4);
        if (i === 0) gsap.from(cards, { y: 30, opacity: 0, rotateX: -50, stagger: 0.2, duration: 0.6, ease: 'back.out(1.6)' });
        if (i === 1 || i === 2) {
          otp.hidden = i === 1;
          result.textContent = '';
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.6 })
            .fromTo(thief, { x: RV.i18n.lang === 'ar' ? -80 : 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
            .fromTo(pw.lastChild, { opacity: 0 }, { opacity: 1, duration: 0.4 })
            .add(() => {
              if (i === 1) { res({ ar: '🚨 دخل! كلمة السر لوحدها اتكسرت', en: '🚨 Broke in! The password alone was broken' }, 'bad'); api.sound.play('bad'); }
              else { gsap.fromTo(otp, { scale: 0.9 }, { scale: 1, duration: 0.3 }); }
            })
            .add(() => { if (i === 2) { res({ ar: '⛔ اتمنع: معندوش موبايلك (عامل الحيازة)', en: '⛔ Blocked: he does not have your phone (possession)' }, 'ok'); api.sound.play('ok'); } }, '+=0.8')
            .to([thief, result], { opacity: 0, duration: 0.3 }, '+=1.6'));
        }
        if (i === 3) gsap.from(trap.children, { y: 20, opacity: 0, stagger: 0.3, duration: 0.5 });
        if (i >= 4) gsap.from(services.children, { x: RV.i18n.lang === 'ar' ? 30 : -30, opacity: 0, stagger: 0.15, duration: 0.45 });
      },
    };
  });

  /* ───────────────────────── securityStack ───────────────────────── */
  K.defineAnim('securityStack', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const ROWS = [
      { threat: { ar: 'التنصّت', en: 'Eavesdropping' }, ti: 'eye', tech: { ar: 'التشفير', en: 'Encryption' }, ki: 'lock', what: { ar: 'يمنع قراءة المحتوى', en: 'stops reading' }, when: { ar: '① أول ما تفتح الموقع (HTTPS)', en: '① as you open the site (HTTPS)' } },
      { threat: { ar: 'موقع مزيّف', en: 'Fake site' }, ti: 'globe', tech: { ar: 'الشهادة الرقمية', en: 'Digital certificate' }, ki: 'certificate', what: { ar: 'تثبت إن الموقع حقيقي', en: 'proves the site is real' }, when: { ar: '② المتصفح يفحص الشهادة', en: '② the browser checks it' } },
      { threat: { ar: 'دخول غير مصرّح', en: 'Unauthorized login' }, ti: 'hacker', tech: { ar: 'المصادقة متعددة العوامل', en: 'Multi-factor auth.' }, ki: 'fingerprint', what: { ar: 'تمنع الدخول غير المصرّح', en: 'blocks bad logins' }, when: { ar: '③ وإنت بتسجّل الدخول', en: '③ when you sign in' } },
      { threat: { ar: 'التلاعب', en: 'Tampering' }, ti: 'pen', tech: { ar: 'التوقيع الرقمي', en: 'Digital signature' }, ki: 'stamp', what: { ar: 'يكشف التلاعب + عدم الإنكار', en: 'detects tampering + non-repudiation' }, when: { ar: '④ على تفاصيل الطلب', en: '④ on the order details' } },
    ];
    const rows = ROWS.map((r) => h('div', { class: 'ss-row' },
      h('div', { class: 'ss-when' }, t(r.when)),
      h('div', { class: 'ss-threat' }, api.icon(r.ti), h('b', null, t(r.threat))),
      h('div', { class: 'ss-arrow' }, h('span', { class: 'ss-bolt' }, '⚡')),
      h('div', { class: 'ss-tech' }, api.icon(r.ki), h('div', null, h('b', null, t(r.tech)), h('small', null, t(r.what))))));
    const done = h('div', { class: 'ss-done' }, t({ ar: '🛡️ الأمان = طبقات من تقنيات مختلفة شغّالة مع بعض — مش تقنية واحدة', en: '🛡️ Security = layers of different technologies working together — not one alone' }));
    const wrap = h('div', { class: 'ss-wrap' }, h('h4', null, '🛒 ', t({ ar: 'وإنت بتشتري من متجر إلكتروني…', en: 'While you shop online…' })), rows, done);
    stage.appendChild(wrap);
    gsap.set(rows, { autoAlpha: 0.12 });
    gsap.set(done, { autoAlpha: 0 });
    const loops = [];
    return {
      beat(i) {
        loops.splice(0).forEach((l) => l.kill());
        rows.forEach((r, k) => {
          const on = k <= i;
          r.classList.toggle('is-on', on);
          r.classList.toggle('is-current', k === i);
          gsap.to(r, { autoAlpha: on ? 1 : 0.12, duration: 0.4 });
        });
        const cur = rows[i];
        if (cur) {
          const bolt = cur.querySelector('.ss-bolt');
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
            .fromTo(bolt, { xPercent: RV.i18n.lang === 'ar' ? 120 : -120, opacity: 1 }, { xPercent: 0, duration: 0.5, ease: 'power2.in' })
            .to(bolt, { scale: 0, opacity: 0, duration: 0.2 })
            .fromTo(cur.querySelector('.ss-tech'), { scale: 1 }, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 }, '<'));
          api.sound.play('pop');
        }
        gsap.to(done, { autoAlpha: i >= rows.length ? 1 : 0, duration: 0.4 });
        if (i >= rows.length) gsap.fromTo(done, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
      },
    };
  });
})();

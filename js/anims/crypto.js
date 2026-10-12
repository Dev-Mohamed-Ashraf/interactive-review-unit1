/* =========================================================
 * anims/crypto.js — lesson 2-1 (cryptography & authentication)
 *   commonKey    : one shared key locks AND unlocks (live cipher with a key
 *                  slider) · very fast · but how do we send the key safely?
 *   keyPair      : public key (open padlock, given to everyone) + private key
 *                  (kept secret) · the eavesdropper can't open the box · slow
 *   signCert     : digital signature (private key signs, public key verifies,
 *                  tampering detected, non-repudiation) + digital certificate
 *   securityStack: online shopping — 4 threats, 4 technologies, all at once
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── threatsDemo ───────────────────────── */


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

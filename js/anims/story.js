/* =========================================================
 * anims/story.js — "animated video" stories with cartoon characters.
 * A story plays by itself like a video (▶ / ⏸ / ⟲, progress bar,
 * subtitles), split into chapters; each lesson beat jumps to its chapter
 * and the video pauses at the end of that chapter.
 *
 *   RV.storyKit(stage, api) → {
 *     svg, person(x, y, look), bubble(person, text), say(text),
 *     item(icon, x, y, cls), tl (the GSAP timeline), chapter(n), done()
 *   }
 * Characters are drawn in SVG (all male, modest — see project rules).
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  RV.storyKit = function (stage, api, opts) {
    const { s, h } = api;
    const t = api.t;
    const W = (opts && opts.w) || 900, H = (opts && opts.h) || 470;
    const svg = K.svgCanvas(stage, W, H, 'st-svg');
    const ground = s('rect', { x: 0, y: H - 70, width: W, height: 70, class: 'st-ground' });
    svg.appendChild(ground);

    /* ---------- characters ---------- */
    const LOOKS = {
      browser: { shirt: '#38bdf8', hair: '#1f2937', skin: '#f1c27d', prop: 'monitor' },
      server: { shirt: '#34d399', hair: '#3f2a1d', skin: '#d6a074', prop: 'server' },
      ca: { shirt: '#fbbf24', hair: '#111827', skin: '#e0ac69', prop: 'stamp', cap: true },
      hacker: { shirt: '#3f3f46', hair: '#111827', skin: '#c68642', prop: 'hacker', hood: true },
      user: { shirt: '#a78bfa', hair: '#2b1b12', skin: '#f1c27d', prop: 'phone' },
      it: { shirt: '#60a5fa', hair: '#111827', skin: '#c68642', prop: 'wrench' },
    };
    function person(x, y, look, label) {
      const L = typeof look === 'string' ? LOOKS[look] : look;
      const g = s('g', { class: 'st-person' });
      const legL = s('rect', { x: -22, y: 40, width: 18, height: 56, rx: 8, class: 'st-leg' });
      const legR = s('rect', { x: 4, y: 40, width: 18, height: 56, rx: 8, class: 'st-leg' });
      const body = s('rect', { x: -34, y: -26, width: 68, height: 76, rx: 22, fill: L.shirt });
      const armL = s('g', { class: 'st-arm' }, s('rect', { x: -10, y: 0, width: 16, height: 56, rx: 8, fill: L.shirt }), s('circle', { cx: -2, cy: 58, r: 9, fill: L.skin }));
      const armR = s('g', { class: 'st-arm' }, s('rect', { x: -6, y: 0, width: 16, height: 56, rx: 8, fill: L.shirt }), s('circle', { cx: 2, cy: 58, r: 9, fill: L.skin }));
      gsap.set(armL, { x: -36, y: -20 }); gsap.set(armR, { x: 36, y: -20 });
      const neck = s('rect', { x: -8, y: -36, width: 16, height: 14, fill: L.skin });
      const head = s('g', { class: 'st-head' });
      head.append(s('circle', { cx: 0, cy: -62, r: 30, fill: L.skin }));
      // short hair for everyone (all characters are men — project rule)
      head.append(s('path', { d: 'M-30 -66 C-32 -98 32 -100 30 -66 C24 -80 10 -84 0 -82 C-12 -84 -24 -80 -30 -66 Z', fill: L.hair }));
      if (L.hood) {
        // the attacker: black beanie + dark glasses + beard (clearly a man, no hood that could read as long hair)
        head.append(
          s('path', { d: 'M-31 -70 C-31 -104 31 -104 31 -70 Z', fill: '#0b0b12' }),
          s('rect', { x: -33, y: -74, width: 66, height: 9, rx: 4, fill: '#27272a' }),
          s('path', { d: 'M-27 -52 C-24 -26 24 -26 27 -52 C18 -40 -18 -40 -27 -52 Z', fill: '#1f1308' }),
          s('rect', { x: -22, y: -68, width: 18, height: 10, rx: 4, fill: '#0b0b12' }),
          s('rect', { x: 4, y: -68, width: 18, height: 10, rx: 4, fill: '#0b0b12' }),
          s('rect', { x: -4, y: -65, width: 8, height: 3, fill: '#0b0b12' }));
      }
      if (L.cap) head.append(s('path', { d: 'M-30 -78 C-28 -100 28 -100 30 -78 Z', fill: '#1d4ed8' }), s('rect', { x: -4, y: -80, width: 40, height: 7, rx: 3, fill: '#1d4ed8' }));
      const eyes = s('g', { class: 'st-eyes' }, s('circle', { cx: -10, cy: -62, r: 3.6, fill: '#111' }), s('circle', { cx: 10, cy: -62, r: 3.6, fill: '#111' }));
      const mouth = s('path', { d: 'M-9 -48 Q0 -41 9 -48', class: 'st-mouth' });
      head.append(eyes, mouth);
      g.append(legL, legR, armL, body, armR, neck, head);
      if (L.prop) g.appendChild(api.svgIcon(L.prop, 0, 14, 30, { class: 'svg-ico st-badge' }));
      if (label) {
        const tag = s('g', { class: 'st-name' });
        const txt = t(label);
        const w = Math.max(70, txt.length * 11 + 26);
        tag.append(s('rect', { x: -w / 2, y: 104, width: w, height: 32, rx: 10 }), s('text', { x: 0, y: 126, 'text-anchor': 'middle' }, txt));
        g.appendChild(tag);
      }
      gsap.set(g, { x, y, scale: 1.3, transformOrigin: '50% 100%' });
      svg.appendChild(g);
      // idle: breathing + blinking
      gsap.to(body, { scaleY: 1.03, transformOrigin: '50% 100%', duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(eyes, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08, yoyo: true, repeat: -1, repeatDelay: 2.6 + Math.random() * 2 });
      return {
        g, armL, armR, mouth, x, y,
        /** talking mouth for d seconds (adds to a timeline) */
        talk(d) { return gsap.fromTo(mouth, { scaleY: 1 }, { scaleY: 2.4, transformOrigin: '50% 50%', duration: 0.12, yoyo: true, repeat: Math.max(1, Math.round((d || 1.2) / 0.24)) }); },
        /** raise the right arm (to hand something over) */
        reach() { return gsap.to(armR, { rotation: -70, svgOrigin: '0 0', duration: 0.4, yoyo: true, repeat: 1, repeatDelay: 0.6 }); },
        walk(toX, d) {
          const tl = gsap.timeline();
          tl.to(g, { x: toX, duration: d || 1.2, ease: 'power1.inOut' })
            .fromTo([legL, legR], { rotation: 0 }, { rotation: (k) => (k ? 12 : -12), svgOrigin: '0 40', duration: 0.2, yoyo: true, repeat: Math.round((d || 1.2) / 0.2) - 1 }, 0);
          return tl;
        },
        hop() { return gsap.to(g, { y: y - 22, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }); },
      };
    }

    /* ---------- speech bubble ---------- */
    function wrap(text, max) {
      const words = text.split(' ');
      const lines = [];
      let cur = '';
      words.forEach((w) => { if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; });
      if (cur.trim()) lines.push(cur.trim());
      return lines;
    }
    function bubble(p, text, dx, dy) {
      const txt = typeof text === 'string' ? text : t(text);
      const lines = wrap(txt, 24);
      const w = Math.min(330, Math.max(...lines.map((l) => l.length)) * 11.5 + 34);
      const hgt = lines.length * 27 + 22;
      const tailX = (dx == null ? 0 : dx), by = (dy == null ? -110 : dy) - hgt;
      // keep the whole bubble on screen (the character is drawn at scale 1.3)
      const k13 = 1.3, ac = p.x + tailX * k13, half = (w * k13) / 2;
      let bx = tailX;
      if (ac - half < 8) bx += (8 - (ac - half)) / k13;
      if (ac + half > W - 8) bx -= (ac + half - (W - 8)) / k13;
      const g = s('g', { class: 'st-bubble' });
      g.append(s('rect', { x: bx - w / 2, y: by, width: w, height: hgt, rx: 16 }),
        s('path', { d: `M${tailX - 10} ${by + hgt - 1} L${tailX} ${by + hgt + 16} L${tailX + 12} ${by + hgt - 1} Z` }));
      lines.forEach((l, k) => g.appendChild(s('text', { x: bx, y: by + 30 + k * 27, 'text-anchor': 'middle' }, l)));
      p.g.appendChild(g);
      gsap.set(g, { autoAlpha: 0 });
      return g;
    }
    /** add "show bubble, talk, hide" to the main timeline */
    function speak(p, text, hold, dx, dy) {
      const b = bubble(p, text, dx, dy);
      const d = hold || 2.4;
      const tl = gsap.timeline();
      tl.fromTo(b, { autoAlpha: 0, scale: 0.5, transformOrigin: '50% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' })
        .add(p.talk(d * 0.7), 0)
        .to(b, { autoAlpha: 0, duration: 0.25 }, d);
      return tl;
    }

    /* ---------- props that move between characters ---------- */
    function item(icon, x, y, cls, label) {
      const g = s('g', { class: 'st-item ' + (cls || '') });
      g.append(s('rect', { x: -30, y: -30, width: 60, height: 60, rx: 14 }), api.svgIcon(icon, 0, 0, 34, { class: 'svg-ico' }));
      if (label) g.appendChild(s('text', { x: 0, y: 50, 'text-anchor': 'middle', class: 'st-item-t' }, t(label)));
      gsap.set(g, { x, y, autoAlpha: 0 });
      svg.appendChild(g);
      return g;
    }

    /* ---------- subtitles + controls ---------- */
    const sub = h('div', { class: 'st-sub' }, '');
    const bar = h('div', { class: 'st-bar' }, h('i'));
    const playBtn = h('button', { class: 'btn btn-sm st-play', type: 'button' }, '⏸');
    const againBtn = h('button', { class: 'btn btn-sm', type: 'button' }, '⟲');
    const chip = h('span', { class: 'st-chip' }, '🎬 ', t({ ar: 'قصة متحركة', en: 'Animated story' }));
    const ctrl = h('div', { class: 'st-ctrl' }, chip, playBtn, againBtn, bar);
    stage.append(sub, ctrl);
    // immediateRender: false → no tween draws its start state before its own scene plays
    const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false }, onUpdate() { bar.firstChild.style.width = (tl.progress() * 100) + '%'; } });
    function say(text) {
      return () => {
        sub.textContent = typeof text === 'string' ? text : t(text);
        gsap.fromTo(sub, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 });
        if (RV.store.setting('tts') && RV.voice) RV.voice.say(sub.textContent);
      };
    }
    function setBtn() { playBtn.textContent = tl.paused() || tl.progress() === 1 ? '▶' : '⏸'; }
    api.on(playBtn, 'click', () => { if (tl.progress() === 1) tl.restart(); else tl.paused(!tl.paused()); setBtn(); });
    api.on(againBtn, 'click', () => { tl.restart(); setBtn(); });
    const marks = [];
    return {
      svg, person, bubble, speak, item, say, tl,
      /** mark the start of chapter n (= lesson beat n); the video pauses before the next one */
      chapter(n) { if (n > 0) { tl.addPause(); tl.to({}, { duration: 0.05 }); } tl.addLabel('c' + n); marks.push(n); }, // (gap: the pause fires before the next chapter's first line)
      /** jump to a chapter and play it */
      go(n) {
        const lbl = 'c' + Math.min(n, marks.length - 1);
        tl.seek(lbl, false).play();
        setTimeout(setBtn, 50);
      },
      kill() { tl.kill(); },
    };
  };

  /* ═════════════════════════ tlsStory ═════════════════════════
   * HTTPS as a cartoon: the browser (a student at his laptop) meets the
   * server; certificate + public key handed over; the CA officer checks
   * it; the browser makes a NEW session key, locks it in a box with the
   * server's open padlock; the attacker can't open it; the server opens
   * it with its private key; then fast talk with the shared key.
   */
  K.defineAnim('tlsStory', (stage, props, api) => {
    const S = RV.storyKit(stage, api);
    const { s } = api;
    const t = api.t;
    const tl = S.tl;
    const B = S.person(150, 285, 'browser', { ar: 'المتصفح (إنت)', en: 'Browser (you)' });
    const SV = S.person(750, 285, 'server', { ar: 'الخادم (موقع البنك)', en: 'Server (the bank site)' });
    const CA = S.person(450, 285, 'ca', { ar: 'جهة الشهادات CA', en: 'Certificate authority' });
    const HK = S.person(450, 285, 'hacker', { ar: 'المهاجم', en: 'Attacker' });
    const cert = S.item('certificate', 650, 200, 'is-cert', { ar: 'شهادة رقمية', en: 'certificate' });
    const pub = S.item('unlock', 650, 200, 'is-pub', { ar: 'مفتاح عام', en: 'public key' });
    const priv = S.item('key', 830, 150, 'is-priv', { ar: 'مفتاح خاص (سرّي)', en: 'private key (secret)' });
    const sess = S.item('key', 300, 205, 'is-sess', { ar: 'مفتاح الجلسة', en: 'session key' });
    const box = S.item('lock', 300, 205, 'is-box', { ar: 'صندوق مقفول', en: 'locked box' });
    const sess2 = S.item('key', 620, 205, 'is-sess', { ar: 'نفس المفتاح', en: 'same key' });
    const ok = S.item('check', 450, 75, 'is-ok');
    const no = S.item('x', 450, 75, 'is-no');
    const msgs = [0, 1, 2, 3].map(() => S.item('lock', 200, 245, 'is-msg'));
    gsap.set([CA.g, HK.g], { autoAlpha: 0 });

    // chapter 0 — meet the players
    S.chapter(0);
    tl.call(S.say({ ar: '🎬 ده «المتصفح» — بيمثّل جهازك. وده «الخادم» — بيمثّل موقع البنك.', en: '🎬 This is the "browser" — your device. That is the "server" — the bank website.' }))
      .from(B.g, { x: -100, duration: 1, ease: 'power2.out' })
      .from(SV.g, { x: 1000, duration: 1, ease: 'power2.out' }, '<')
      .add(S.speak(B, { ar: 'أهلًا! عايز أفتح حسابي بأمان 👋', en: 'Hi! I want to open my account safely 👋' }, 2.4))
      .add(S.speak(SV, { ar: 'أهلًا بيك! خليني أثبتلك إني البنك الحقيقي', en: 'Welcome! Let me prove I am the real bank' }, 2.6));

    // chapter 1 — certificate + public key handed over
    S.chapter(1);
    tl.call(S.say({ ar: '① الخادم بيدّي المتصفح: شهادة رقمية 📜 + مفتاح عام 🔓 (قفل مفتوح أي حد ياخده)', en: '① The server gives the browser: a digital certificate 📜 + a public key 🔓 (an open padlock anyone may take)' }))
      .add(S.speak(SV, { ar: 'اتفضل: دي شهادتي، وده قفلي المفتوح', en: 'Here: my certificate, and my open padlock' }, 2.4))
      .add(SV.reach(), '<')
      .set([cert, pub], { autoAlpha: 1 }, '<0.3')
      .to(cert, { x: 300, y: 150, duration: 1.4, ease: 'power2.inOut' }, '<')
      .to(pub, { x: 300, y: 250, duration: 1.4, ease: 'power2.inOut' }, '<0.2')
      .fromTo(priv, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
      .add(S.speak(SV, { ar: 'أما المفتاح الخاص… ده معايا أنا بس 🤫', en: 'The private key… stays with me only 🤫' }, 2.4));

    // chapter 2 — the CA checks the certificate
    S.chapter(2);
    tl.call(S.say({ ar: '① المتصفح بيتأكد من الشهادة عند «جهة إصدار الشهادات» — زي ختم رسمي', en: '① The browser checks the certificate with the "certificate authority" — like an official stamp' }))
      .to(CA.g, { autoAlpha: 1, duration: 0.4 })
      .add(S.speak(B, { ar: 'الشهادة دي سليمة؟ ده البنك الحقيقي؟', en: 'Is this certificate valid? Is this the real bank?' }, 2.4))
      .to(cert, { x: 450, y: 120, duration: 0.9 }, '<')
      .add(CA.reach())
      .fromTo(ok, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' })
      .add(S.speak(CA, { ar: '✅ أيوه، أنا اللي ختمتها — الموقع حقيقي', en: '✅ Yes, I stamped it — the site is genuine' }, 2.6), '<')
      .to(cert, { x: 300, y: 150, duration: 0.8 })
      .to([ok, CA.g], { autoAlpha: 0, duration: 0.4 });

    // chapter 3 — the browser makes a NEW session key and locks it with the public key
    S.chapter(3);
    tl.call(S.say({ ar: '② المتصفح بيعمل مفتاح جديد للجلسة 🔑 (متناظر)… ويقفله في صندوق بالقفل العام 🔓', en: '② The browser makes a NEW session key 🔑 (common key)… and locks it in a box with the public padlock 🔓' }))
      .add(S.speak(B, { ar: 'هعمل مفتاح سرّي جديد للجلسة دي', en: 'I’ll make a brand-new secret key for this session' }, 2.4))
      .fromTo(sess, { autoAlpha: 0, scale: 0.2, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(3)' }, '<0.5')
      .add(S.speak(B, { ar: 'وهحطّه في صندوق وأقفله بقفلك المفتوح', en: 'I’ll put it in a box and lock it with your open padlock' }, 2.6))
      .to(sess, { scale: 0.4, autoAlpha: 0, duration: 0.5 }, '<0.8')
      .to(pub, { x: 300, y: 205, duration: 0.6 }, '<')
      .set(pub, { autoAlpha: 0 })
      .fromTo(box, { autoAlpha: 0, scale: 0.4, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' })
      .call(() => api.sound.play('pop'));

    // chapter 4 — the attacker grabs the box but cannot open it
    S.chapter(4);
    tl.call(S.say({ ar: '② الصندوق ماشي في السكة… والمهاجم مسكه! بس مايقدرش يفتحه — مفيش معاه المفتاح الخاص', en: '② The box travels… and the attacker grabs it! But he cannot open it — he has no private key' }))
      .to(HK.g, { autoAlpha: 1, duration: 0.4 })
      .to(box, { x: 450, y: 150, duration: 1.2, ease: 'power1.inOut' })
      .add(S.speak(HK, { ar: 'هه! هفتحه وأشوف السر…', en: 'Ha! I’ll open it and see the secret…' }, 2.2))
      .to(box, { rotation: 10, duration: 0.07, yoyo: true, repeat: 7 })
      .fromTo(no, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' })
      .call(() => api.sound.play('bad'))
      .add(S.speak(HK, { ar: 'مش راضي يتفتح! 😤', en: 'It won’t open! 😤' }, 1.8))
      .to([no, HK.g], { autoAlpha: 0, duration: 0.4 });

    // chapter 5 — the server opens it with its private key
    S.chapter(5);
    tl.call(S.say({ ar: '② الخادم بس يفتح الصندوق بمفتاحه الخاص — ودلوقتي الاتنين معاهم نفس مفتاح الجلسة', en: '② Only the server opens the box, with its private key — now both share the same session key' }))
      .to(box, { x: 620, y: 205, duration: 1.2, ease: 'power1.inOut' })
      .to(priv, { x: 620, y: 205, duration: 0.7 })
      .to(box, { autoAlpha: 0, scale: 0.5, duration: 0.4 })
      .to(priv, { x: 830, y: 150, duration: 0.6 })
      .fromTo(sess2, { autoAlpha: 0, scale: 0.3, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(3)' }, '<')
      .set(sess, { x: 300, y: 205, scale: 1 })
      .to(sess, { autoAlpha: 1, duration: 0.4 })
      .call(() => api.sound.play('ok'))
      .add(S.speak(SV, { ar: 'وصل! بقى معانا نفس المفتاح 🤝', en: 'Got it! We now share the same key 🤝' }, 2.4));

    // chapter 6 — fast talk with the shared (common) key
    S.chapter(6);
    tl.call(S.say({ ar: '③ من هنا ورايح: كل الكلام بيتقفل بالمفتاح المتناظر — سريع جدًا ⚡ والمهاجم مايفهمش حاجة', en: '③ From now on: every message is locked with the common key — very fast ⚡ and the attacker understands nothing' }))
      .to(HK.g, { autoAlpha: 0.5, duration: 0.3 });
    msgs.forEach((m, k) => {
      const fwd = k % 2 === 0;
      tl.fromTo(m, { x: fwd ? 300 : 620, y: 190, autoAlpha: 1 }, { x: fwd ? 620 : 300, duration: 0.7, ease: 'none' }, k === 0 ? '>' : '>-0.35').to(m, { autoAlpha: 0, duration: 0.1 });
    });
    tl.add(S.speak(B, { ar: 'حوّل 100 جنيه لحساب أخويا', en: 'Send EGP 100 to my brother' }, 2))
      .add(S.speak(SV, { ar: 'تمّ ✅', en: 'Done ✅' }, 1.6))
      .add(S.speak(HK, { ar: '#$%&@… مش فاهم حاجة 🤯', en: '#$%&@… I understand nothing 🤯' }, 2), '<');

    // chapter 7 — the moral
    S.chapter(7);
    tl.call(S.say({ ar: '📌 المفتاح العام = لتوصيل مفتاح الجلسة بأمان · المفتاح المتناظر = للبيانات بسرعة ⇒ أمان + سرعة', en: '📌 Public key = deliver the session key safely · common key = move the data fast ⇒ security + speed' }))
      .to([B.g, SV.g], { y: '-=14', duration: 0.25, yoyo: true, repeat: 3 });

    void s;
    return {
      beat(i) { S.go(i); },
      destroy() { S.kill(); },
    };
  });
})();

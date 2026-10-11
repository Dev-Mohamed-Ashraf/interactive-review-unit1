/* =========================================================
 * anims/https-movie.js — httpsMovie: the full HTTPS story as a real,
 * teacher-driven animation (no narration, no subtitles — the teacher talks).
 * Each lesson beat = one scene: it plays, then FREEZES so the teacher can
 * explain; "Next" plays the following scene, "⟲" replays the current one.
 *
 * Ported from the HyperFrames explainer video (فيديوهات/https-video):
 * same male cartoon characters, props and layout, on a fixed 1920×880
 * board that is scaled to the stage — the layout was audited frame by
 * frame so no text ever overlaps another.
 *
 * Scenes (beats):
 *  0 the padlock next to the address        7 ② a NEW session key (common)
 *  1 no protection: eavesdropping 👀          8 ② locked in a box with the public lock
 *  2 tampering ✏️ + impersonation 🎭            9 ② the attacker cannot open it
 *  3 HTTPS blocks all three                  10 ② the server opens it (private key) 🤝
 *  4 the players: browser · server · CA      11 ③ fast encrypted data ⚡
 *  5 ① certificate + public key; private stays 12 recap: security + speed
 *  6 ① the CA checks it ✅
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* male cartoon characters (inline SVG) — project rule: men only */
  function person(o) {
    const hair = o.beanie ? '' : `<path d="M54 106 Q48 52 100 50 Q152 52 146 106 Q142 80 128 74 Q100 86 72 74 Q58 82 54 106Z" fill="${o.hair}"/>`;
    const beanie = o.beanie ? `<path d="M50 98 Q52 40 100 38 Q148 40 150 98Z" fill="${o.beanie}"/><rect x="46" y="88" width="108" height="16" rx="8" fill="#111827"/>` : '';
    const beard = o.beard ? `<path d="M55 112 Q58 168 100 170 Q142 168 145 112 Q140 140 122 146 Q100 136 78 146 Q60 140 55 112Z" fill="${o.beard}"/>` : '';
    const glasses = o.glasses ? '<g fill="none" stroke="#1f2937" stroke-width="3.5"><circle cx="81" cy="110" r="13"/><circle cx="119" cy="110" r="13"/><path d="M94 110 H106"/></g>' : '';
    const shades = o.shades ? '<g fill="#0b0f19"><rect x="64" y="100" width="32" height="20" rx="6"/><rect x="104" y="100" width="32" height="20" rx="6"/><rect x="94" y="106" width="12" height="4"/></g>' : '';
    const tie = o.tie ? `<path d="M80 178 L100 204 L120 178Z" fill="#f8fafc"/><path d="M96 190 L104 190 L109 238 L100 250 L91 238Z" fill="${o.tie}"/>` : '';
    const prop = o.laptop ? '<g><rect x="34" y="196" width="132" height="70" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/><circle cx="100" cy="231" r="12" fill="#38bdf8"/></g>' : '';
    return `<svg viewBox="0 0 200 260"><g class="bob">
      <path d="M26 264 Q28 176 100 170 Q172 176 174 264Z" fill="${o.shirt}"/>${tie}
      <rect x="88" y="148" width="24" height="30" rx="8" fill="${o.skin}"/>
      <circle cx="54" cy="112" r="11" fill="${o.skin}"/><circle cx="146" cy="112" r="11" fill="${o.skin}"/>
      <ellipse cx="100" cy="108" rx="46" ry="52" fill="${o.skin}"/>${hair}${beanie}${beard}
      <g fill="none" stroke="${o.brow}" stroke-width="5" stroke-linecap="round"><path d="M70 94 Q81 88 92 93"/><path d="M108 93 Q119 88 130 94"/></g>
      <g class="eyes"><circle cx="81" cy="110" r="5.5" fill="#111827"/><circle cx="119" cy="110" r="5.5" fill="#111827"/></g>${glasses}${shades}
      <path d="M100 116 Q96 126 102 128" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="3" stroke-linecap="round"/>
      <path class="m-smile" d="${o.smirk ? 'M88 140 Q104 146 116 134' : 'M86 136 Q100 150 114 136'}" fill="none" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round"/>
      <path class="m-sad" d="M86 146 Q100 134 114 146" fill="none" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round" opacity="0"/>${prop}
    </g></svg>`;
  }
  const KEY = (fill, ring, hole) => `<circle cx="30" cy="32" r="24" fill="${fill}" stroke="${ring}" stroke-width="5"/><circle cx="30" cy="32" r="9" fill="${hole}"/>
    <rect x="52" y="26" width="84" height="13" rx="6" fill="${fill}"/><rect x="110" y="37" width="10" height="18" rx="3" fill="${fill}"/><rect x="92" y="37" width="10" height="13" rx="3" fill="${fill}"/>`;
  const GOLD = KEY('#f59e0b', '#fef3c7', '#78350f');
  const LOCK_BODY = '<rect x="6" y="46" width="74" height="54" rx="12" fill="#3b82f6" stroke="#bfdbfe" stroke-width="4"/><circle cx="43" cy="68" r="7" fill="#1e3a8a"/><rect x="40" y="70" width="6" height="16" rx="3" fill="#1e3a8a"/>';

  K.defineAnim('httpsMovie', (stage, props, api) => {
    const { h } = api;
    const L = (ar, en) => api.t({ ar, en });

    /* ---------- the board (1920×880), scaled to the stage ---------- */
    const board = h('div', { class: 'hm-board' });
    board.innerHTML = `
  <div id="hm-bg"></div><div id="hm-grid"></div>
  <div id="hm-hook">
    <div id="hm-h-title" class="later">${L('إزاي', 'How does')} <span>HTTPS</span> ${L('بيحميك؟', 'protect you?')}</div>
    <div id="hm-win" class="later">
      <div class="bar"><div class="dots"><i></i><i></i><i></i></div>
        <div id="hm-url"><svg id="hm-hlock" viewBox="0 0 40 44"><path d="M10 20 V13 a10 10 0 0 1 20 0 V20" fill="none" stroke="#34d399" stroke-width="5"/><rect x="4" y="19" width="32" height="23" rx="5" fill="#34d399"/></svg><span><span class="s">https</span>://www.bank.com</span></div>
      </div>
      <div class="page">
        <div class="brand">🏦 ${L('بنك المستقبل', 'Future Bank')}<small>${L('خدمات الإنترنت البنكية', 'Online banking')}</small></div>
        <div class="form"><div>${L('اسم المستخدم', 'Username')}</div><div>${L('كلمة المرور', 'Password')} ••••••</div><div class="btn">${L('دخول', 'Sign in')}</div></div>
      </div>
    </div>
    <div id="hm-h-ring" class="later"></div>
    <div id="hm-h-secret" class="later">⏱️ ${L('حوار سري في أقل من ثانية!', 'A secret conversation in under a second!')}</div>
  </div>

  <div id="hm-stage">
    <svg id="hm-net" viewBox="0 0 1920 1080">
      <defs><linearGradient id="hm-gl" gradientUnits="userSpaceOnUse" x1="430" y1="0" x2="1430" y2="0"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#34d399"/></linearGradient></defs>
      <path id="hm-line" class="later" d="M430 540 L1430 540" stroke="url(#hm-gl)" stroke-width="6" stroke-dasharray="18 14" fill="none" stroke-linecap="round"/>
      <path id="hm-calink" class="later" d="M330 350 Q560 470 880 410" stroke="#fbbf24" stroke-width="5" stroke-dasharray="14 12" fill="none" stroke-linecap="round"/>
    </svg>
    <div id="hm-netlabel" class="later">🌐 ${L('الإنترنت', 'Internet')}</div>
    <svg id="hm-rack" class="later" viewBox="0 0 165 430">
      <rect x="4" y="4" width="157" height="422" rx="16" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      ${[26, 122, 218, 314].map((y, k) => `<rect x="18" y="${y}" width="129" height="70" rx="8" fill="#0f172a"/><circle class="led" cx="40" cy="${y + 35}" r="7" fill="${['#34d399', '#38bdf8', '#34d399', '#fbbf24'][k]}"/><rect x="60" y="${y + 30}" width="70" height="10" rx="5" fill="#334155"/>`).join('')}
    </svg>
    <div id="hm-ch-browser" class="char later"></div>
    <div id="hm-ch-server" class="char later"></div>
    <div id="hm-ch-ca" class="char later"></div>
    <div id="hm-ch-hacker" class="char later"></div>
    <div id="hm-t-browser" class="tag later">💻 ${L('المتصفح', 'Browser')}<span class="sub-tag">${L('جهازك', 'your device')}</span></div>
    <div id="hm-t-server" class="tag later">🏦 ${L('الخادم', 'Server')}<span class="sub-tag">${L('موقع البنك', 'the bank site')}</span></div>
    <div id="hm-t-ca" class="tag later">🏛️ ${L('جهة إصدار الشهادات', 'Certificate authority')}</div>
    <div id="hm-t-hacker" class="tag later">😈 ${L('المهاجم', 'Attacker')}</div>

    <div id="hm-hd1" class="head later">${L('المرحلة ① التحقق من هوية الخادم', 'Stage ① verify the server')}</div>
    <div id="hm-hd2" class="head later">${L('المرحلة ② تبادل مفتاح الجلسة', 'Stage ② exchange the session key')}</div>
    <div id="hm-hd3" class="head later">${L('المرحلة ③ نقل البيانات المشفّرة', 'Stage ③ encrypted data')}</div>

    <div id="hm-tp" class="later">🔑 ${L('كلمة المرور', 'Password')}: 1234</div>
    <div id="hm-tp2" class="later">💸 ${L('حوّل', 'Send')} <b>100</b> ${L('جنيه', 'EGP')}</div>
    <div id="hm-th1" class="card threat later"><span class="e">👀</span>${L('يقرأ كلمة المرور', 'Reads the password')}<small>${L('التنصت', 'eavesdropping')}</small></div>
    <div id="hm-th2" class="card threat later"><span class="e">✏️</span>${L('يغيّر رسالتك', 'Changes your message')}<small>100 ⟵ 10,000</small></div>
    <div id="hm-th3" class="card threat later"><span class="e">🎭</span>${L('ينتحل شخصية البنك', 'Pretends to be the bank')}<small>${L('موقع مزيّف', 'fake site')}</small></div>
    ${[1, 2, 3].map((k) => `<div id="hm-xm${k}" class="xm later"><b>🚫 ${L('اتمنع', 'blocked')}</b></div>`).join('')}
    <div id="hm-shield" class="later">🛡️ <span>HTTPS</span> ${L('يمنع ده كله', 'stops all of this')}</div>

    <div id="hm-cert" class="later"><div class="t">📜 ${L('شهادة رقمية', 'Digital certificate')}</div><div class="d">www.bank.com</div><div style="font-size:25px">${L('موقّعة من جهة الشهادات', 'signed by the CA')} ✍️</div><div class="seal">✔</div></div>
    <svg id="hm-pub" class="later" viewBox="0 0 86 104">
      <path id="hm-pub-open" d="M22 48 V30 a21 21 0 0 1 42 0 V20" fill="none" stroke="#93c5fd" stroke-width="9" stroke-linecap="round"/>
      <path id="hm-pub-shut" d="M22 48 V30 a21 21 0 0 1 42 0 V48" fill="none" stroke="#93c5fd" stroke-width="9" stroke-linecap="round" opacity="0"/>${LOCK_BODY}
    </svg>
    <div id="hm-pubtag" class="ptag later">🔓 ${L('مفتاح عام — لأي حد', 'Public key — for anyone')}</div>
    <svg id="hm-priv" class="later" viewBox="0 0 140 64">${KEY('#8b5cf6', '#ddd6fe', '#2e1065')}</svg>
    <div id="hm-privtag" class="ptag later">🔐 ${L('المفتاح الخاص — معه وحده', 'Private key — server only')}</div>
    <svg id="hm-stamp" class="later" viewBox="0 0 100 120">
      <rect x="38" y="4" width="24" height="54" rx="10" fill="#92400e"/><ellipse cx="50" cy="12" rx="22" ry="12" fill="#b45309"/>
      <rect x="12" y="58" width="76" height="26" rx="6" fill="#d97706"/><rect x="6" y="84" width="88" height="14" rx="4" fill="#dc2626"/>
    </svg>
    <div id="hm-b-browser" class="bubble tr later">${L('الشهادة دي سليمة؟', 'Is this certificate valid?')} 🤔</div>
    <div id="hm-b-ca" class="bubble tr later">✅ ${L('أيوه، سليمة وموقّعة مني', 'Yes — valid, I signed it')}</div>
    <div id="hm-b-server" class="bubble tr later">${L('اتفضل شهادتي ومفتاحي العام', 'Here: my certificate and public key')}</div>
    <div id="hm-vcheck" class="later">✓</div>
    <div id="hm-real" class="ptag later">✅ ${L('ده البنك الحقيقي', 'This is the real bank')}</div>

    <svg id="hm-spark" class="later" viewBox="0 0 200 140"><g fill="#fde68a"><path d="M30 20 l5 14 14 5 -14 5 -5 14 -5 -14 -14 -5 14 -5z"/><path d="M170 30 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/><path d="M160 110 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/><path d="M40 108 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z"/></g></svg>
    <svg id="hm-skey" class="later" viewBox="0 0 140 64">${GOLD}</svg>
    <div id="hm-skeytag" class="ptag later">🔑 ${L('مفتاح الجلسة (متناظر) — جديد', 'Session key (common) — new')}</div>
    <div id="hm-boxg" class="later">
      <svg viewBox="0 0 160 140"><rect x="8" y="48" width="144" height="88" rx="12" fill="#92400e" stroke="#fbbf24" stroke-width="5"/><rect x="8" y="80" width="144" height="10" fill="#78350f"/>
        <g id="hm-lid"><rect x="4" y="26" width="152" height="30" rx="10" fill="#b45309" stroke="#fbbf24" stroke-width="5"/></g></svg>
      <svg id="hm-boxlock" class="later" viewBox="0 0 86 104"><path d="M22 48 V30 a21 21 0 0 1 42 0 V48" fill="none" stroke="#93c5fd" stroke-width="9" stroke-linecap="round"/>${LOCK_BODY}</svg>
    </div>
    <div id="hm-note" class="card later"><span class="no">❌ ${L('المفتاح العام لا يتحوّل إلى مفتاح متناظر', 'The public key is NOT turned into a common key')}</span><span class="yes">✅ ${L('هو فقط القفل اللي بيوصّل مفتاح الجلسة بأمان', 'It is only the lock that delivers the session key safely')}</span></div>
    <div id="hm-b-hack1" class="bubble tl later">😈 ${L('هاخد الصندوق!', 'I’ll take the box!')}</div>
    <div id="hm-b-hack2" class="bubble tl later"><span>😫 ${L('مش قادر أفتحه!', 'I can’t open it!')}</span><span>${L('معنديش المفتاح الخاص', 'I don’t have the private key')}</span></div>
    <div id="hm-xbox" class="later">✕</div>
    <svg id="hm-skey2" class="later" viewBox="0 0 140 64">${GOLD}</svg>
    <svg id="hm-skeyB" class="later" viewBox="0 0 140 64">${GOLD}</svg>
    <div id="hm-same" class="card later">🤝 ${L('الطرفان معهما نفس مفتاح الجلسة', 'Both sides now share the same session key')}</div>

    ${[L('كلمة المرور', 'password'), L('رصيد الحساب', 'balance'), L('تحويل 100 جنيه', 'send EGP 100'), L('كشف الحساب', 'statement'), L('تسجيل خروج', 'sign out')]
      .map((x, k) => `<div id="hm-pk${k + 1}" class="pk later">🔒 ${x}</div>`).join('')}
    <div id="hm-scr" class="later"><span id="hm-s1">x9#Lq@7&amp;Zp!</span><span id="hm-s2" class="later">Ω7%kT$2#vQ</span><span id="hm-s3" class="later">@@3x!R9*cW</span><span id="hm-s4" class="later">&amp;Zp0#mL!8?</span></div>
    <div id="hm-fast" class="card later">⚡ ${L('سريع جدًّا — نفس المفتاح للتشفير وفك التشفير', 'Very fast — one key to lock and unlock')}</div>
  </div>

  <div id="hm-recap">
    <div id="hm-r-brand" class="later">${L('مراجعة تفاعلية · البرمجة والذكاء الاصطناعي · الدرس 2-1', 'Interactive review · Programming & AI · Lesson 2-1')}</div>
    <div id="hm-r-title" class="later">${L('الخلاصة', 'The point')} 💡</div>
    <div id="hm-rc1" class="rc later"><span class="ic">🔓</span><span class="h">${L('المفتاح العام', 'Public key')}</span><span class="p">${L('يوصّل مفتاح الجلسة بأمان', 'delivers the session key safely')}</span></div>
    <div id="hm-r-plus" class="later">+</div>
    <div id="hm-rc2" class="rc later"><span class="ic">🔑</span><span class="h">${L('المفتاح المتناظر', 'Common key')}</span><span class="p">${L('ينقل البيانات بسرعة', 'moves the data fast')}</span></div>
    <div id="hm-r-eq" class="later">= ${L('أمان + سرعة', 'security + speed')} 🔒</div>
    <div id="hm-r-url" class="later">🔒 <span><span class="s">https</span>://www.bank.com</span></div>
  </div>
  <div id="hm-vig"></div>`;

    const Q = (names) => names.split(' ').map((n) => board.querySelector('#hm-' + n));
    const q = (n) => board.querySelector('#hm-' + n);
    q('ch-browser').innerHTML = person({ skin: '#f1c7a5', hair: '#3b2414', brow: '#3b2414', shirt: '#2563eb', laptop: true });
    q('ch-server').innerHTML = person({ skin: '#d9a87e', hair: '#1f1a17', brow: '#1f1a17', shirt: '#15803d', tie: '#0f172a' });
    q('ch-ca').innerHTML = person({ skin: '#e8b98f', hair: '#9ca3af', brow: '#6b7280', shirt: '#b45309', beard: '#9ca3af', glasses: true, tie: '#7c2d12' });
    q('ch-hacker').innerHTML = person({ skin: '#c99b74', beanie: '#18181b', brow: '#18181b', shirt: '#3f3f46', beard: '#292524', shades: true, smirk: true });

    const wrap = h('div', { class: 'hm-wrap', 'data-fit': '1' }, board);
    const dots = h('div', { class: 'hm-dots' });
    const replay = h('button', { class: 'btn btn-sm hm-replay', type: 'button', title: L('أعد المشهد', 'Replay scene') }, '⟲ ', L('أعد المشهد', 'Replay'));
    stage.append(wrap, replay, dots);

    function fit() {
      const W = stage.clientWidth, H = stage.clientHeight;
      if (!W || !H) return;
      const k = Math.min(W / 1920, H / 880);
      board.style.transform = `translate(${(W - 1920 * k) / 2}px, ${(H - 880 * k) / 2}px) scale(${k})`;
    }
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    fit();

    /* ---------- idle life (outside the scene timeline) ---------- */
    const idle = [];
    if (!(RV.fx && RV.fx.reduced && RV.fx.reduced())) {
      ['browser', 'server', 'ca', 'hacker'].forEach((c, i) => {
        idle.push(gsap.to(board.querySelector('#hm-ch-' + c + ' .bob'), { y: -4, duration: 1.5 + i * 0.17, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
        idle.push(gsap.to(board.querySelector('#hm-ch-' + c + ' .eyes'), { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.07, yoyo: true, repeat: -1, repeatDelay: 2.8 + i * 0.6, ease: 'none' }));
      });
      idle.push(gsap.to(board.querySelectorAll('.led'), { opacity: 0.25, duration: 0.35, stagger: 0.22, yoyo: true, repeat: -1, ease: 'none' }));
      idle.push(gsap.to(q('calink'), { strokeDashoffset: -260, duration: 4, repeat: -1, ease: 'none' }));
      idle.push(gsap.to(q('line'), { strokeDashoffset: -320, duration: 6, repeat: -1, ease: 'none' }));
    }

    /* ---------- the scenes: one paused timeline, a 10 s slot per scene ---------- */
    const SLOT = 10, N = 13;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out', immediateRender: false } });
    const IN = (els, t, d, from) => tl.fromTo(els, Object.assign({ opacity: 0 }, from || {}),
      Object.assign({ opacity: 1, duration: d || 0.5 }, Object.fromEntries(Object.keys(from || {}).map((k) => [k, k === 'scale' ? 1 : 0]))), t);
    const POP = (els, t, d) => tl.fromTo(els, { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: d || 0.55, ease: 'back.out(1.9)' }, t);
    const OUT = (els, t, d) => tl.to(els, { opacity: 0, duration: d || 0.4 }, t);
    const SND = (name, t) => tl.call(() => api.sound.play(name), null, t);
    const at = (n, o) => n * SLOT + (o || 0);
    for (let n = 1; n < N; n++) tl.addPause(at(n) - 0.05);

    /* 0 — the padlock next to the address */
    IN(q('h-title'), at(0, 0.1), 0.8, { y: -40 });
    IN(q('win'), at(0, 0.6), 0.8, { y: 60, scale: 0.92 });
    tl.fromTo(q('url'), { backgroundColor: '#0b1222' }, { backgroundColor: '#13233f', duration: 0.4, yoyo: true, repeat: 1 }, at(0, 1.5));
    POP(q('h-ring'), at(0, 2.2), 0.5); SND('pop', at(0, 2.2));
    tl.fromTo(q('hlock'), { scale: 1 }, { scale: 1.35, duration: 0.35, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' }, at(0, 2.4));
    IN(q('h-secret'), at(0, 3.3), 0.5, { y: 30 });

    /* 1 — no protection: someone on the way reads your password */
    let c = at(1);
    OUT(q('h-secret'), c, 0.3);
    tl.to(q('hook'), { scale: 3.2, transformOrigin: '29% 35%', opacity: 0, duration: 1.1, ease: 'power3.in' }, c + 0.1);
    SND('whoosh', c + 0.1);
    IN(q('line'), c + 1.1, 0.6); IN(q('netlabel'), c + 1.3, 0.5);
    IN(q('ch-browser'), c + 1.1, 0.6, { x: -120 }); IN(q('ch-server'), c + 1.25, 0.6, { x: 120 }); IN(q('rack'), c + 1.35, 0.6, { x: 80 });
    IN(q('ch-hacker'), c + 1.8, 0.7, { y: 60 }); IN(q('t-hacker'), c + 2.3, 0.4);
    IN(q('tp'), c + 3.0, 0.3);
    tl.to(q('tp'), { x: 420, duration: 1.0, ease: 'power1.inOut' }, c + 3.2);
    POP(q('th1'), c + 3.6); SND('bad', c + 3.6);
    tl.to(q('ch-hacker'), { y: -18, duration: 0.3, yoyo: true, repeat: 1 }, c + 4.2);

    /* 2 — tampering + impersonation */
    c = at(2);
    OUT(q('tp'), c, 0.3);
    IN(q('tp2'), c + 0.2, 0.3);
    tl.to(q('tp2'), { x: 420, duration: 0.8, ease: 'power1.inOut' }, c + 0.4);
    tl.to(board.querySelector('#hm-tp2 b'), { color: '#ef4444', scale: 1.4, duration: 0.2, yoyo: true, repeat: 1 }, c + 1.2);
    POP(q('th2'), c + 0.8); SND('bad', c + 0.8);
    OUT(q('tp2'), c + 2.6, 0.3);
    POP(q('th3'), c + 3.0); SND('bad', c + 3.0);

    /* 3 — HTTPS stops all three */
    c = at(3);
    POP(q('shield'), c + 0.1, 0.7); SND('ok', c + 0.2);
    Q('xm1 xm2 xm3').forEach((x, i) => POP(x, c + 0.6 + i * 0.25, 0.35));
    tl.to(Q('th1 th2 th3'), { opacity: 0.35, duration: 0.4 }, c + 0.6);

    /* 4 — the players */
    c = at(4);
    OUT(Q('th1 th2 th3 xm1 xm2 xm3 shield'), c, 0.45);
    tl.to(q('ch-hacker'), { y: 160, opacity: 0, duration: 0.6, ease: 'power2.in' }, c);
    OUT(q('t-hacker'), c, 0.3);
    POP(q('t-browser'), c + 0.8); SND('pop', c + 0.8);
    tl.fromTo(q('ch-browser'), { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 90%' }, c + 0.8);
    POP(q('t-server'), c + 1.8); SND('pop', c + 1.8);
    tl.fromTo(q('ch-server'), { scale: 1 }, { scale: 1.06, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 90%' }, c + 1.8);
    IN(q('ch-ca'), c + 2.8, 0.6, { y: -80 }); POP(q('t-ca'), c + 3.1); SND('pop', c + 3.1);
    IN(q('stamp'), c + 3.8, 0.4, { y: -20 });
    tl.to(q('stamp'), { y: -16, duration: 0.18, yoyo: true, repeat: 1 }, c + 4.3);

    /* 5 — ① certificate + public key; the private key stays */
    c = at(5);
    IN(q('hd1'), c, 0.5, { y: -30 });
    OUT(q('netlabel'), c, 0.3); OUT(q('t-ca'), c + 0.2, 0.3);
    IN(q('b-server'), c + 0.6, 0.4, { y: 14 });
    IN(q('cert'), c + 1.0, 0.45, { scale: 0.6 }); SND('whoosh', c + 1.5);
    tl.to(q('cert'), { y: 180, duration: 0.3, ease: 'power2.in' }, c + 1.5);
    tl.to(q('cert'), { x: -640, duration: 0.55, ease: 'power1.inOut' }, c + 1.8);
    tl.to(q('cert'), { y: -190, duration: 0.55, ease: 'power2.out' }, c + 2.35);
    OUT(q('b-server'), c + 3.0, 0.3);
    const pf = c + 3.3;
    IN(q('pub'), pf - 0.45, 0.45, { scale: 0.6 }); SND('whoosh', pf);
    tl.to(q('pub'), { y: 210, duration: 0.3, ease: 'power2.in' }, pf);
    tl.to(q('pub'), { x: -680, duration: 0.5, ease: 'none' }, pf + 0.3);
    tl.to(q('pub'), { x: -604, y: -172, duration: 0.6, ease: 'power2.out' }, pf + 0.8);
    POP(q('pubtag'), pf + 1.45);
    POP(q('priv'), c + 5.6); POP(q('privtag'), c + 5.8); SND('pop', c + 5.6);
    tl.fromTo(q('priv'), { rotation: 0 }, { rotation: -12, duration: 0.25, yoyo: true, repeat: 3, transformOrigin: '30% 50%' }, c + 6.1);

    /* 6 — ① the CA checks the certificate */
    c = at(6);
    OUT(Q('pubtag privtag'), c, 0.3);
    IN(q('calink'), c, 0.5); tl.to(q('t-ca'), { opacity: 1, duration: 0.4 }, c);
    IN(q('b-browser'), c + 0.6, 0.4, { y: 14 });
    tl.fromTo(q('cert'), { boxShadow: '0 16px 36px rgba(0,0,0,.45)' }, { boxShadow: '0 0 46px rgba(251,191,36,.95)', duration: 0.5, yoyo: true, repeat: 3 }, c + 0.9);
    const ys = c + 2.8;
    OUT(q('b-browser'), ys - 0.3, 0.3);
    tl.to(q('stamp'), { x: -415, duration: 0.7, ease: 'power2.out' }, ys - 0.1);
    tl.to(q('stamp'), { y: -166, duration: 0.7, ease: 'power2.in' }, ys - 0.1);
    tl.to(q('stamp'), { y: -131, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.in' }, ys + 0.65);
    POP(q('vcheck'), ys + 0.8, 0.5); SND('ok', ys + 0.8);
    IN(q('b-ca'), ys, 0.4, { y: 14 });
    OUT(q('stamp'), ys + 1.3, 0.4);
    POP(q('real'), ys + 1.8);

    /* 7 — ② the browser makes a NEW session key (common key) */
    c = at(7);
    OUT(Q('b-ca calink real vcheck cert t-ca hd1'), c, 0.4);
    tl.to(q('ch-ca'), { y: -60, opacity: 0, duration: 0.5 }, c);
    IN(q('hd2'), c + 0.5, 0.5, { y: -30 });
    IN(q('spark'), c + 1.2, 0.3, { scale: 0.4 });
    tl.to(q('spark'), { rotation: 25, scale: 1.15, duration: 0.6, yoyo: true, repeat: 3, transformOrigin: '50% 50%' }, c + 1.2);
    POP(q('skey'), c + 1.45, 0.6); SND('pop', c + 1.45);
    OUT(q('spark'), c + 3.8, 0.3);
    POP(q('skeytag'), c + 2.4);

    /* 8 — ② into the box, locked with the PUBLIC lock (not converted!) */
    c = at(8);
    OUT(q('skeytag'), c, 0.3);
    tl.set(q('lid'), { rotation: -38, transformOrigin: '0% 100%' }, c + 0.15);
    POP(q('boxg'), c + 0.2, 0.5); SND('pop', c + 0.2);
    tl.to(q('skey'), { y: 160, scale: 0.55, duration: 0.7, ease: 'power2.in' }, c + 0.7);
    tl.to(q('skey'), { opacity: 0, duration: 0.15 }, c + 1.35);
    tl.to(q('lid'), { rotation: 0, duration: 0.35, ease: 'bounce.out' }, c + 1.4);
    tl.to(q('pub'), { x: -893, y: 71, scale: 0.7, duration: 0.6, ease: 'power2.inOut' }, c + 2.0);
    tl.to(q('pub-open'), { opacity: 0, duration: 0.1 }, c + 2.55); tl.to(q('pub-shut'), { opacity: 1, duration: 0.1 }, c + 2.55);
    tl.to(q('pub'), { opacity: 0, duration: 0.2 }, c + 2.75);
    tl.fromTo(q('boxlock'), { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, c + 2.7);
    SND('ok', c + 2.7);
    tl.fromTo(q('boxg'), { rotation: 0 }, { rotation: 4, duration: 0.08, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, c + 2.75);
    IN(q('note'), c + 3.6, 0.5, { y: 20 });
    tl.fromTo(board.querySelector('#hm-note .yes'), { opacity: 0.15 }, { opacity: 1, duration: 0.4 }, c + 4.8);

    /* 9 — ② the attacker grabs the box… and cannot open it */
    c = at(9);
    OUT(Q('note hd2'), c, 0.35);
    tl.to(q('ch-hacker'), { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.4)' }, c + 0.2);
    IN(q('t-hacker'), c + 0.5, 0.3);
    tl.to(q('boxg'), { x: 440, y: 40, duration: 1.0, ease: 'power2.inOut' }, c + 0.5); SND('whoosh', c + 0.5);
    IN(q('b-hack1'), c + 1.1, 0.4, { y: 14 });
    tl.to(q('ch-hacker'), { y: -8, duration: 0.3 }, c + 1.4);
    tl.fromTo(q('boxg'), { rotation: 0 }, { rotation: 9, duration: 0.09, yoyo: true, repeat: 11, transformOrigin: '50% 50%' }, c + 1.8);
    OUT(q('b-hack1'), c + 3.0, 0.25);
    POP(q('xbox'), c + 3.2, 0.35); SND('bad', c + 3.2);
    tl.to(board.querySelector('#hm-ch-hacker .m-smile'), { opacity: 0, duration: 0.1 }, c + 3.2);
    tl.to(board.querySelector('#hm-ch-hacker .m-sad'), { opacity: 1, duration: 0.1 }, c + 3.2);
    IN(q('b-hack2'), c + 3.7, 0.4, { y: 14 });

    /* 10 — ② the server opens it with its private key → same key on both sides */
    c = at(10);
    OUT(Q('xbox b-hack2'), c, 0.3);
    tl.to(q('ch-hacker'), { y: 0, duration: 0.3 }, c);
    tl.to(q('boxg'), { x: 840, y: 20, duration: 1.0, ease: 'power2.inOut' }, c + 0.3); SND('whoosh', c + 0.3);
    tl.to(q('priv'), { x: -250, y: 215, rotation: -20, duration: 0.8, ease: 'power2.inOut' }, c + 1.3);
    tl.to(q('boxlock'), { opacity: 0, y: -30, duration: 0.3 }, c + 2.1);
    tl.to(q('lid'), { rotation: -38, duration: 0.35, ease: 'back.out(2)' }, c + 2.25);
    POP(q('skey2'), c + 2.45, 0.5);
    tl.fromTo(q('skey2'), { y: 60 }, { y: 0, duration: 0.5 }, c + 2.45);
    POP(q('skeyB'), c + 3.2, 0.5); SND('ok', c + 3.2);
    POP(q('same'), c + 3.4, 0.5);
    tl.to(Q('skeyB skey2'), { scale: 1.2, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 50%' }, c + 3.9);

    /* 11 — ③ everything encrypted with the common key: fast */
    c = at(11);
    OUT(Q('same boxg priv'), c, 0.4);
    IN(q('hd3'), c + 0.4, 0.5, { y: -30 });
    tl.to(q('netlabel'), { opacity: 1, duration: 0.4 }, c + 0.4);
    tl.to(q('skeyB'), { y: -10, scale: 0.8, duration: 0.5 }, c + 0.4);
    tl.to(q('skey2'), { y: 0, x: 70, scale: 0.8, duration: 0.5 }, c + 0.4);
    Q('pk1 pk2 pk3 pk4 pk5').forEach((p, i) => {
      const t0 = c + 1.2 + i * 0.75, back = i % 2 === 1;
      if (back) tl.set(p, { y: -64 }, t0 - 0.01);
      tl.fromTo(p, { opacity: 0, x: back ? 690 : 0 }, { opacity: 1, duration: 0.2 }, t0);
      tl.to(p, { x: back ? 0 : 690, duration: 1.15, ease: 'power1.inOut' }, t0);
      tl.to(p, { opacity: 0, duration: 0.2 }, t0 + 1.1);
    });
    POP(q('fast'), c + 2.2); SND('ok', c + 2.2);
    const sc = c + 5.0;
    POP(q('scr'), sc - 0.2, 0.4); SND('bad', sc);
    Q('s1 s2 s3 s4').forEach((s, i) => {
      if (i) tl.to(s, { opacity: 1, duration: 0.05 }, sc + i * 0.45);
      tl.to(s, { opacity: 0, duration: 0.05 }, sc + i * 0.45 + 0.43);
    });
    tl.to(q('s4'), { opacity: 1, duration: 0.05 }, sc + 1.8);
    tl.to(q('ch-hacker'), { rotation: -6, duration: 0.2, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, sc + 0.3);

    /* 12 — recap */
    c = at(12);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('r-title'), c + 0.6, 0.5, { y: -30 });
    IN(q('r-brand'), c + 0.9, 0.5);
    IN(q('rc1'), c + 1.4, 0.6, { x: 80 }); SND('pop', c + 1.4);
    IN(q('r-plus'), c + 2.2, 0.4, { scale: 0.4 });
    IN(q('rc2'), c + 2.4, 0.6, { x: -80 }); SND('pop', c + 2.4);
    POP(q('r-eq'), c + 3.4, 0.7); SND('ok', c + 3.4);
    IN(q('r-url'), c + 4.4, 0.6, { y: 30 });
    tl.fromTo(q('r-url'), { boxShadow: '0 0 0 rgba(52,211,153,0)' }, { boxShadow: '0 0 60px rgba(52,211,153,.75)', duration: 0.6, yoyo: true, repeat: 3 }, c + 5.0);

    /* ---------- beat control ---------- */
    for (let n = 0; n < N; n++) dots.appendChild(h('i'));
    let cur = 0;
    function go(n) {
      cur = Math.max(0, Math.min(N - 1, n));
      dots.querySelectorAll('i').forEach((d, k) => d.classList.toggle('on', k === cur));
      tl.pause();
      tl.seek(at(cur), true);
      tl.play();
    }
    api.on(replay, 'click', () => { api.sound.play('tap'); go(cur); });
    board.__tl = tl; // (QA: the layout audit seeks through every scene)

    return {
      beat(i) { go(i); },
      destroy() { ro.disconnect(); idle.forEach((x) => x.kill()); tl.kill(); },
    };
  });
})();

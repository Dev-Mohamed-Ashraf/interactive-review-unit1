/* =========================================================
 * anims/network-movie.js — networkMovie: network security design as a
 * real, teacher-driven animation (lesson 2-2, station "blocks"). Same
 * pattern as httpsMovie: each lesson beat = one scene that plays, then
 * FREEZES so the teacher can explain.
 *
 * The company network is a fortress:
 *   outside (Internet) | gate = firewall ① | reception = DMZ | inner door =
 *   firewall ② | inner office (internal network, customer data)
 *
 * Scenes (beats):
 *  0 the fortress and its treasure (customer data)
 *  1 ① firewall = gate guard with preset rules: visitor ✅, attacker ⛔
 *  2 ② DMZ = separate reception: a hacked web server stays outside door ②
 *  3 ③ VPN = encrypted tunnel from a café; the eavesdropper sees symbols
 *  4 ④ defense in depth: four layers — one falls, the next holds
 *  5 ⑤ zero trust: even inside, identity + permissions at every door
 *  6 recap: gate · line · area + layers + verify every access
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;

  const VAULT = `<ellipse cx="80" cy="34" rx="70" ry="24" fill="#a78bfa"/><rect x="10" y="34" width="140" height="130" fill="#7c3aed"/>
    <ellipse cx="80" cy="164" rx="70" ry="24" fill="#6d28d9"/><ellipse cx="80" cy="34" rx="70" ry="24" fill="#c4b5fd"/>
    <path d="M10 78 Q80 106 150 78 M10 122 Q80 150 150 122" fill="none" stroke="#ddd6fe" stroke-width="4" opacity=".7"/>`;

  K.defineAnim('networkMovie', (stage, props, api) => {
    const M = MK.create(stage, api, {
      cls: 'mv-net', prefix: 'nw-', beats: 7,
      cast: { 'ch-guard': 'guard', 'ch-vis': 'visitor', 'ch-hack': 'hacker', 'ch-emp': 'server', 'ch-cafe': 'user', 'ch-spy': 'hacker' },
      html: (L) => `
  <div id="nw-stage">
    <div id="nw-zout" class="zone later"><span class="zl">🌐 ${L('بره (الإنترنت)', 'Outside (Internet)')}</span></div>
    <div id="nw-zdmz" class="zone later"><span class="zl">🏨 ${L('الاستقبال = DMZ', 'Reception = DMZ')}</span></div>
    <div id="nw-zin" class="zone later"><span class="zl">🏢 ${L('المكتب الداخلي (الشبكة الداخلية)', 'Inner office (internal network)')}</span></div>
    <div id="nw-door1" class="door later"></div><div id="nw-door2" class="door later"></div>
    <div id="nw-dl1" class="dl later">🧱 ${L('جدار حماية', 'Firewall')} ①</div>
    <div id="nw-dl2" class="dl later">🧱 ${L('جدار حماية', 'Firewall')} ②</div>

    <div id="nw-wl" class="rl later">🖥️ ${L('ويب', 'Web')}</div><div id="nw-ml" class="rl later">📧 ${L('بريد', 'Mail')}</div>
    ${MK.RACK('id="nw-web" class="later"')}${MK.RACK('id="nw-mail" class="later"')}
    <svg id="nw-vault" class="later" viewBox="0 0 160 200">${VAULT}</svg>
    <div id="nw-vlabel" class="later">🗄️ ${L('بيانات العملاء', 'Customer data')}</div>
    <div id="nw-pc1" class="pc later">${MK.PC()}</div><div id="nw-pc2" class="pc later">${MK.PC()}</div>

    <div id="nw-ch-guard" class="char later"></div>
    <div id="nw-ch-vis" class="char later"></div>
    <div id="nw-ch-hack" class="char later"></div>
    <div id="nw-ch-emp" class="char later"></div>
    <div id="nw-ch-cafe" class="char later"></div>
    <div id="nw-ch-spy" class="char later"></div>

    ${[
      ['🏰', L('شبكة الشركة = قلعة', 'The company network = a fortress')],
      ['①', L('جدار الحماية = حارس على البوابة', 'Firewall = a guard at the gate')],
      ['②', L('DMZ = صالة استقبال منفصلة', 'DMZ = a separate reception hall')],
      ['③', L('VPN = نفق مشفّر عبر الإنترنت', 'VPN = an encrypted tunnel over the Internet')],
      ['④', L('الدفاع في العمق = طبقات ورا بعض', 'Defense in depth = layer after layer')],
      ['⑤', L('انعدام الثقة = مفيش حد موثوق تلقائيًا', 'Zero trust = nobody is trusted automatically')],
    ].map(([e, x], k) => `<div id="nw-hd${k}" class="head later">${e} ${x}</div>`).join('')}

    <div id="nw-n0" class="note later">💎 ${L('الكنز = بيانات العملاء في المكتب الداخلي · وبره = زوار… ومهاجمين', 'The treasure = customer data in the inner office · outside = visitors… and attackers')}</div>
    <div id="nw-n1" class="note later">📋 ${L('قواعد مضبوطة مسبقًا', 'Preset rules')}: ✅ ${L('زوار ← خادم الويب', 'visitors → web server')} · ⛔ ${L('دخول مباشر ← قاعدة البيانات', 'direct access → database')}</div>
    <div id="nw-n2a" class="note later">🏨 ${L('الخوادم العامة (ويب + بريد) هنا — بعيد عن المكتب الداخلي', 'Public servers (web + mail) live here — away from the inner office')}</div>
    <div id="nw-n2b" class="note ok later">🛡️ ${L('الباب التاني (جدار حماية تاني) وقفه ← الشبكة الداخلية سليمة', 'The second door (another firewall) stops him → the inside is safe')}</div>
    <div id="nw-n3" class="note later">🏠 ${L('العمل عن بُعد', 'Remote work')} · 🏢 ${L('ربط الفروع', 'Linking branches')} — ${L('والمتنصّت شايف رموز ملهاش معنى', 'the eavesdropper sees only symbols')}</div>
    <div id="nw-n5" class="note bad later">⛔ ${L('مفيش «جوّه موثوق»: الهوية + الصلاحيات بتتفحص في كل مرة', 'No "trusted inside": identity + permissions are checked every time')}</div>

    <div id="nw-b-emp1" class="bubble tl mv-bub later">${L('إحنا شغالين هنا… والبيانات دي سرّية جدًا', 'We work here… and this data is top secret')} 🤫</div>
    <div id="nw-b-vis" class="bubble tl mv-bub later">🙋 ${L('عايز أشوف موقعكم', 'I want to see your website')}</div>
    <div id="nw-b-guard1" class="bubble tl mv-bub later">✅ ${L('مسموح — اتفضل على الاستقبال', 'Allowed — go to reception')}</div>
    <div id="nw-b-hack1" class="bubble tl mv-bub later">😈 ${L('عايز أدخل على الخزنة على طول!', 'I want to go straight to the vault!')}</div>
    <div id="nw-b-guard2" class="bubble tl mv-bub later">⛔ ${L('ممنوع — مفيش دخول مباشر لقاعدة البيانات', 'Denied — no direct access to the database')}</div>
    <div id="nw-x1" class="xc later">✕</div>
    <div id="nw-b-hack2" class="bubble tl mv-bub later">💥 ${L('هاجمت خادم الويب! هدخل جوّه…', 'I hacked the web server! Now inside…')}</div>
    <div id="nw-x2" class="xc later">✕</div>

    <div id="nw-cafe" class="later">☕ ${L('كافيه · واي فاي عام', 'Café · public Wi-Fi')} 📶</div>
    <div id="nw-scr" class="later"><span id="nw-s1">x9#Lq@7&amp;Zp</span><span id="nw-s2" class="later">Ω7%kT$2#vQ</span><span id="nw-s3" class="later">@@3x!R9*cW</span></div>
    <div id="nw-tunnel" class="later"></div>
    <div id="nw-tl" class="later">🔒 ${L('نفق VPN مشفّر', 'Encrypted VPN tunnel')}</div>
    <div id="nw-pkt" class="later">🔒 ${L('ملف', 'file')}.pdf</div>

    ${[
      [L('مدخل الشبكة', 'Network entry'), '🧱 ' + L('جدار حماية', 'firewall')],
      [L('مسار الاتصال', 'Communication path'), '🔒 VPN'],
      [L('وضع الخوادم', 'Server placement'), '🏨 DMZ'],
      [L('الأجهزة الطرفية', 'Endpoints'), '🛡️ ' + L('مكافح فيروسات + تحديث', 'antivirus + updates')],
    ].map(([a, b], k) => `<div id="nw-L${k + 1}" class="lay later"><b>${'①②③④'[k]} ${a}</b><span>${b}</span></div>`).join('')}
    <div id="nw-sh1" class="sh later">🛡️</div><div id="nw-sh2" class="sh later">🛡️</div>
    <div id="nw-boom" class="later">💥</div>

    <div id="nw-b-emp2" class="bubble tl mv-bub later">${L('حتى أنا… بوري الكارنيه عند كل باب', 'Even me… I show my badge at every door')} 🪪</div>
    <div id="nw-badge" class="later">🪪 ${L('الهوية', 'identity')} ✔ · ${L('الصلاحيات', 'permissions')} ✔</div>
    <div id="nw-ck1" class="ck later">🪪</div><div id="nw-ck2" class="ck later">🪪</div>
    <div id="nw-b-hack3" class="bubble tr mv-bub later">${L('أنا جوّه خلاص… مش هيسألوني؟', 'I’m already inside… they won’t ask me?')} 🤔</div>
    <div id="nw-deny" class="xc later">⛔</div>
  </div>

  <div id="nw-recap">
    <div id="nw-hd6" class="head later">💡 ${L('الخلاصة', 'The point')}</div>
    <div id="nw-rc1" class="rc later"><span class="ic">🧱</span><span class="h">${L('جدار الحماية = بوابة', 'Firewall = a gate')}</span><span class="p">${L('يسمح أو يمنع بقواعد', 'allows or denies by rules')}</span></div>
    <div id="nw-rc2" class="rc later"><span class="ic">🔒</span><span class="h">VPN = ${L('خط', 'a line')}</span><span class="p">${L('نفق مشفّر للاتصال من بعيد', 'encrypted tunnel for remote access')}</span></div>
    <div id="nw-rc3" class="rc later"><span class="ic">🏨</span><span class="h">DMZ = ${L('منطقة', 'an area')}</span><span class="p">${L('معزولة للخوادم العامة', 'isolated, for public servers')}</span></div>
    <div id="nw-r1" class="rp later">🧱🔒🏨🛡️ ${L('الدفاع في العمق = طبقات ورا بعض', 'Defense in depth = layer after layer')}</div>
    <div id="nw-r2" class="rp zt later">🪪 ${L('انعدام الثقة = اتحقّق من كل وصول، كل مرة', 'Zero trust = verify every access, every time')}</div>
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE } = M;
    const sub = (sel) => M.board.querySelector(sel);
    const hop = (el, t, d) => tl.to(el, { y: -10, duration: 0.15, yoyo: true, repeat: 2 * Math.max(1, Math.round(d / 0.3)) - 1, ease: 'sine.inOut' }, t);
    const walk = (el, t, x, d) => { tl.to(el, { x, duration: d, ease: 'none' }, t); hop(el, t, d); };
    const shake = (el, t) => tl.fromTo(el, { x: 0 }, { x: 7, duration: 0.06, yoyo: true, repeat: 7 }, t);
    const RED = 'drop-shadow(0 0 22px rgba(239,68,68,.95))', NONE = 'drop-shadow(0 0 0px rgba(239,68,68,0))';
    const glowZone = (el, t, color) => tl.fromTo(el, { boxShadow: 'inset 0 0 0 rgba(0,0,0,0)' }, { boxShadow: `inset 0 0 70px ${color}`, duration: 0.5, yoyo: true, repeat: 3 }, t);

    /* 0 — the fortress */
    let c = at(0);
    IN(q('hd0'), c + 0.1, 0.5, { y: -30 });
    Q('zout zdmz zin').forEach((z, i) => IN(z, c + 0.4 + i * 0.3, 0.5, { y: 24 }));
    Q('door1 door2').forEach((d, i) => IN(d, c + 1.4 + i * 0.2, 0.4, { scaleY: 0.2 }));
    IN(Q('dl1 dl2'), c + 1.7, 0.4);
    IN(Q('web mail'), c + 2.0, 0.5, { y: 30 }); IN(Q('wl ml'), c + 2.2, 0.4);
    IN(Q('pc1 pc2'), c + 2.4, 0.5, { y: 30 });
    POP(q('vault'), c + 2.9, 0.6); POP(q('vlabel'), c + 3.2); SND('pop', c + 2.9);
    tl.fromTo(q('vault'), { filter: 'drop-shadow(0 0 0px rgba(251,191,36,0))' }, { filter: 'drop-shadow(0 0 30px rgba(251,191,36,.9))', duration: 0.5, yoyo: true, repeat: 3 }, c + 3.6);
    IN(q('ch-emp'), c + 3.8, 0.6, { x: 60 });
    IN(q('b-emp1'), c + 4.5, 0.4, { y: 14 });
    IN(q('n0'), c + 5.6, 0.5, { y: 20 });

    /* 1 — ① the firewall: a guard with preset rules */
    c = at(1);
    OUT(Q('hd0 b-emp1 n0'), c, 0.3);
    IN(q('hd1'), c + 0.3, 0.5, { y: -30 });
    IN(q('ch-guard'), c + 0.5, 0.6, { y: -30 });
    PULSE(q('dl1'), c + 0.8, 'rgba(251,191,36,.9)', 1);
    IN(q('n1'), c + 1.0, 0.5, { y: 20 }); SND('pop', c + 1.0);
    IN(q('ch-vis'), c + 1.4, 0.4); walk(q('ch-vis'), c + 1.4, 0, 0.6);
    tl.set(q('ch-vis'), { x: -100 }, c + 1.39);
    IN(q('b-vis'), c + 2.1, 0.4, { y: 14 });
    OUT(q('b-vis'), c + 3.4, 0.25);
    IN(q('b-guard1'), c + 3.6, 0.4, { y: 14 }); SND('ok', c + 3.6);
    OUT(q('b-guard1'), c + 5.0, 0.25);
    OUT(q('ch-vis'), c + 5.2, 0.3);
    tl.set(q('ch-vis'), { x: 560 }, c + 5.55);
    IN(q('ch-vis'), c + 5.6, 0.4, { scale: 0.7 });
    tl.set(q('ch-hack'), { x: -100 }, c + 6.0);
    IN(q('ch-hack'), c + 6.0, 0.4); walk(q('ch-hack'), c + 6.0, 0, 0.6);
    IN(q('b-hack1'), c + 6.6, 0.4, { y: 14 });
    OUT(q('b-hack1'), c + 7.7, 0.25);
    IN(q('b-guard2'), c + 7.9, 0.4, { y: 14 });
    POP(q('x1'), c + 8.1, 0.45); SND('bad', c + 8.1);
    shake(q('door1'), c + 8.1);

    /* 2 — ② the DMZ: the web server is hit, door ② holds */
    c = at(2);
    OUT(Q('hd1 b-guard2 x1 n1 ch-vis'), c, 0.3);
    IN(q('hd2'), c + 0.3, 0.5, { y: -30 });
    glowZone(q('zdmz'), c + 0.6, 'rgba(56,189,248,.45)');
    IN(q('n2a'), c + 0.7, 0.5, { y: 20 });
    tl.fromTo(Q('web mail'), { scale: 1 }, { scale: 1.08, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, c + 1.0);
    OUT(q('ch-hack'), c + 2.4, 0.3);
    tl.set(q('ch-hack'), { x: 820 }, c + 2.75);
    IN(q('ch-hack'), c + 2.8, 0.4, { scale: 0.7 });
    IN(q('b-hack2'), c + 3.3, 0.4, { y: 14 }); SND('bad', c + 3.3);
    tl.fromTo(q('web'), { filter: NONE }, { filter: RED, duration: 0.3 }, c + 3.3);
    tl.fromTo(q('web'), { rotation: 0 }, { rotation: 5, duration: 0.07, yoyo: true, repeat: 9, transformOrigin: '50% 100%' }, c + 3.3);
    OUT(q('b-hack2'), c + 5.0, 0.25);
    OUT(q('n2a'), c + 5.0, 0.3);
    tl.to(q('ch-hack'), { x: 850, duration: 0.25, yoyo: true, repeat: 3, ease: 'power2.in' }, c + 5.3);
    shake(q('door2'), c + 5.4);
    POP(q('x2'), c + 6.4, 0.45); SND('ok', c + 6.4);
    tl.to(sub('#nw-ch-hack .m-smile'), { opacity: 0, duration: 0.1 }, c + 6.4);
    tl.to(sub('#nw-ch-hack .m-sad'), { opacity: 1, duration: 0.1 }, c + 6.4);
    IN(q('n2b'), c + 6.8, 0.5, { y: 20 });

    /* 3 — ③ VPN: an encrypted tunnel from a café */
    c = at(3);
    OUT(Q('hd2 x2 n2b ch-hack ch-guard'), c, 0.35);
    tl.set(q('web'), { filter: NONE }, c + 0.4);
    IN(q('hd3'), c + 0.4, 0.5, { y: -30 });
    IN(q('cafe'), c + 0.8, 0.4, { y: -20 });
    IN(q('ch-cafe'), c + 1.0, 0.6, { x: -80 });
    IN(q('ch-spy'), c + 1.4, 0.5, { y: 40 });
    tl.fromTo(q('tunnel'), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1.0, ease: 'power2.out', transformOrigin: '0% 50%' }, c + 2.0);
    SND('whoosh', c + 2.0);
    IN(q('tl'), c + 2.8, 0.4);
    tl.set(q('pkt'), { x: 0 }, c + 3.2);
    IN(q('pkt'), c + 3.3, 0.3);
    tl.to(q('pkt'), { x: 760, duration: 2.6, ease: 'none' }, c + 3.4);
    OUT(q('pkt'), c + 6.0, 0.2);
    POP(q('scr'), c + 3.6, 0.4); SND('bad', c + 3.6);
    Q('s1 s2 s3').forEach((s, i) => {
      if (i) tl.to(s, { opacity: 1, duration: 0.05 }, c + 3.6 + i * 0.6);
      if (i < 2) tl.to(s, { opacity: 0, duration: 0.05 }, c + 3.6 + i * 0.6 + 0.58);
    });
    tl.to(sub('#nw-ch-spy .m-smile'), { opacity: 0, duration: 0.1 }, c + 4.6);
    tl.to(sub('#nw-ch-spy .m-sad'), { opacity: 1, duration: 0.1 }, c + 4.6);
    SND('ok', c + 6.0);
    IN(q('n3'), c + 6.2, 0.5, { y: 20 });

    /* 4 — ④ defense in depth: four layers */
    c = at(4);
    OUT(Q('hd3 n3 ch-spy scr cafe tl'), c, 0.35);
    IN(q('hd4'), c + 0.4, 0.5, { y: -30 });
    IN(q('L1'), c + 0.9, 0.5, { scale: 0.85 }); PULSE(q('door1'), c + 1.0, 'rgba(251,191,36,.95)', 1);
    IN(q('L2'), c + 1.8, 0.5, { scale: 0.85 }); PULSE(q('tunnel'), c + 1.9, 'rgba(52,211,153,.95)', 1);
    IN(q('L3'), c + 2.7, 0.5, { scale: 0.85 }); glowZone(q('zdmz'), c + 2.8, 'rgba(56,189,248,.5)');
    IN(q('L4'), c + 3.6, 0.5, { scale: 0.85 }); POP(Q('sh1 sh2'), c + 3.7, 0.45); SND('pop', c + 3.7);
    POP(q('boom'), c + 5.2, 0.5); SND('bad', c + 5.2);
    shake(q('door1'), c + 5.2);
    tl.to(q('L1'), { opacity: 0.45, duration: 0.3 }, c + 5.5);
    tl.fromTo(Q('L2 L3 L4'), { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 0 40px rgba(52,211,153,.95)', duration: 0.4, stagger: 0.25, yoyo: true, repeat: 3 }, c + 6.0);
    SND('ok', c + 6.0);

    /* 5 — ⑤ zero trust: identity + permissions at every door */
    c = at(5);
    OUT(Q('hd4 L1 L2 L3 L4 boom sh1 sh2 tunnel ch-cafe pc1 pc2'), c, 0.4);
    IN(q('hd5'), c + 0.4, 0.5, { y: -30 });
    POP(Q('ck1 ck2'), c + 0.8, 0.45); SND('pop', c + 0.8);
    IN(q('b-emp2'), c + 1.2, 0.4, { y: 14 });
    OUT(q('b-emp2'), c + 3.0, 0.25);
    POP(q('badge'), c + 3.2, 0.45); SND('ok', c + 3.2);
    OUT(q('badge'), c + 4.4, 0.25);
    tl.set(sub('#nw-ch-hack .m-smile'), { opacity: 1 }, c + 4.5);
    tl.set(sub('#nw-ch-hack .m-sad'), { opacity: 0 }, c + 4.5);
    tl.set(q('ch-hack'), { x: 1360, scale: 1 }, c + 4.5);
    IN(q('ch-hack'), c + 4.6, 0.4, { scale: 0.7 });
    IN(q('b-hack3'), c + 5.1, 0.4, { y: 14 });
    OUT(q('b-hack3'), c + 6.6, 0.25);
    tl.fromTo(Q('ck1 ck2'), { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 0 40px rgba(248,113,113,.95)', duration: 0.3, yoyo: true, repeat: 3 }, c + 6.7);
    POP(q('deny'), c + 6.8, 0.45); SND('bad', c + 6.8);
    tl.to(sub('#nw-ch-hack .m-smile'), { opacity: 0, duration: 0.1 }, c + 6.8);
    tl.to(sub('#nw-ch-hack .m-sad'), { opacity: 1, duration: 0.1 }, c + 6.8);
    IN(q('n5'), c + 7.2, 0.5, { y: 20 });

    /* 6 — recap */
    c = at(6);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd6'), c + 0.6, 0.5, { y: -30 });
    Q('rc1 rc2 rc3').forEach((r, i) => { IN(r, c + 1.0 + i * 0.6, 0.6, { y: 40 }); SND('pop', c + 1.0 + i * 0.6); });
    POP(q('r1'), c + 3.2, 0.6); SND('ok', c + 3.2);
    POP(q('r2'), c + 4.2, 0.6); SND('ok', c + 4.2);

    return M.done();
  });
})();

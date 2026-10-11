/* =========================================================
 * anims/network.js — lesson 2-2 (network security design)
 *   firewallSim  : packets meet a firewall that checks preset rules —
 *                  web request allowed, direct database access denied
 *   vpnTunnel    : public Wi-Fi eavesdropper reads everything → a VPN
 *                  tunnel encrypts it · uses: remote work + branches
 *   dmzMap       : Internet | FW | DMZ (web, mail) | FW | internal —
 *                  an attacked web server cannot reach the internal data
 *   defenseDepth : one wall vs four layers; the attacker loses at each
 *   zeroTrust    : castle-and-moat ("inside is safe") vs verify every access
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── firewallSim ───────────────────────── */
  K.defineAnim('firewallSim', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 460);
    const NET = { x: 90, y: 230 }, FW = { x: 360, y: 230 }, WEB = { x: 640, y: 150 }, DB = { x: 640, y: 320 };
    const net = C.node(NET.x, NET.y, 'globe', { ar: 'الإنترنت', en: 'Internet' }, '', 90);
    const wall = s('g', { class: 'fw-wall' }, s('rect', { x: -26, y: -150, width: 52, height: 300, rx: 10 }), api.svgIcon('wall', 0, -100, 36, { class: 'svg-ico' }), api.svgIcon('wall', 0, 0, 36, { class: 'svg-ico' }), api.svgIcon('wall', 0, 100, 36, { class: 'svg-ico' }));
    gsap.set(wall, { x: FW.x, y: FW.y });
    const wallLbl = s('text', { x: FW.x, y: 412, 'text-anchor': 'middle', class: 'cy-node-lbl' }, t({ ar: 'جدار الحماية', en: 'Firewall' }));
    const web = C.node(WEB.x, WEB.y, 'server', { ar: 'خادم الويب', en: 'Web server' }, 'is-good');
    const db = C.node(DB.x, DB.y, 'database', { ar: 'قاعدة البيانات', en: 'Database' }, 'is-you');
    // rules card
    const rules = s('g', { class: 'fw-rules' });
    const R = [
      { txt: { ar: '✅ اسمح: الوصول لخادم الويب', en: '✅ allow: access to the web server' }, ok: true },
      { txt: { ar: '⛔ امنع: الوصول المباشر لقاعدة البيانات', en: '⛔ deny: direct access to the database' }, ok: false },
    ];
    rules.appendChild(s('rect', { x: 150, y: 18, width: 500, height: 86, rx: 12, class: 'fw-card' }));
    rules.appendChild(s('text', { x: 400, y: 40, 'text-anchor': 'middle', class: 'cy-small' }, t({ ar: '📋 قواعد مضبوطة مسبقًا', en: '📋 rules set in advance' })));
    const ruleEls = R.map((r, k) => { const el = s('text', { x: 400, y: 66 + k * 26, 'text-anchor': 'middle', class: 'fw-rule ' + (r.ok ? 'ok' : 'bad') }, t(r.txt)); rules.appendChild(el); return el; });
    const p1 = C.packet({ ar: 'طلب صفحة الموقع', en: 'GET web page' }, 'is-plain');
    const p2 = C.packet({ ar: 'دخول مباشر للبيانات', en: 'direct DB access' }, 'is-bad');
    const p3 = C.packet({ ar: 'هجوم مستخبي في طلب', en: 'attack hidden in a request' }, 'is-bad');
    const verdict = C.tag(400, 440, '', 'is-good');
    svg.append(rules, net, web, db, wall, wallLbl, p1, p2, p3, verdict);
    gsap.set(verdict, { autoAlpha: 0 });

    function say(txt, cls) {
      verdict.lastChild.textContent = t(txt);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      verdict.firstChild.setAttribute('x', -w / 2); verdict.firstChild.setAttribute('width', w);
      verdict.setAttribute('class', 'cy-tag ' + cls);
      gsap.fromTo(verdict, { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    const flash = (k) => { ruleEls.forEach((r, i) => r.classList.toggle('on', i === k)); };
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill(); gsap.set([p1, p2, p3, verdict], { autoAlpha: 0 }); flash(-1);
        web.classList.remove('is-hit');
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        loops.push(tl);
        if (i <= 1) {
          tl.add(C.fly(p1, NET, { x: FW.x - 40, y: FW.y }, { duration: 1 }))
            .add(() => { flash(0); api.sound.play('pop'); })
            .to(p1, { x: WEB.x - 60, y: WEB.y, duration: 0.9 })
            .add(() => say({ ar: '✅ مسموح — القاعدة بتسمح بالوصول لخادم الويب', en: '✅ Allowed — a rule permits the web server' }, 'is-good'))
            .to([p1, verdict], { autoAlpha: 0, duration: 0.3 }, '+=1.2');
        }
        if (i === 0 || i === 2) {
          tl.add(() => flash(-1))
            .add(C.fly(p2, NET, { x: FW.x - 40, y: FW.y }, { duration: 1 }))
            .add(() => { flash(1); api.sound.play('bad'); })
            .to(p2, { x: FW.x - 70, duration: 0.12, yoyo: true, repeat: 3 })
            .to(p2, { x: NET.x + 60, y: NET.y + 60, rotation: -20, autoAlpha: 0, duration: 0.6 })
            .add(() => say({ ar: '⛔ ممنوع — مفيش وصول مباشر من بره لقاعدة البيانات', en: '⛔ Denied — no direct outside access to the database' }, 'is-bad'))
            .to(verdict, { autoAlpha: 0, duration: 0.3 }, '+=1.2')
            .set(p2, { rotation: 0 });
        }
        if (i >= 3) {
          tl.add(C.fly(p3, NET, { x: FW.x - 40, y: FW.y }, { duration: 1 }))
            .add(() => { flash(0); })
            .to(p3, { x: WEB.x - 60, y: WEB.y, duration: 0.9 })
            .add(() => { web.classList.add('is-hit'); say({ ar: '⚠️ الطلب «شكله» مسموح فعدّى — جدار حماية لوحده مش كفاية', en: '⚠️ It looked allowed, so it passed — a firewall alone is not enough' }, 'is-warn'); api.sound.play('bad'); })
            .to([p3, verdict], { autoAlpha: 0, duration: 0.3 }, '+=1.8')
            .add(() => web.classList.remove('is-hit'));
        }
      },
    };
  });

  /* ───────────────────────── vpnTunnel ───────────────────────── */
  K.defineAnim('vpnTunnel', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 460);
    const ME = { x: 110, y: 200 }, HQ = { x: 690, y: 200 }, BR = { x: 690, y: 370 }, SPY = { x: 300, y: 360 };
    const me = C.node(ME.x, ME.y, 'laptopHome', { ar: 'موظف في كافيه', en: 'Staff in a café' }, 'is-you');
    const wifi = api.svgIcon('wifi', ME.x, ME.y - 78, 34, { class: 'svg-ico vp-wifi' });
    const wifiLbl = s('text', { x: ME.x, y: ME.y - 108, 'text-anchor': 'middle', class: 'cy-small' }, t({ ar: 'واي فاي عام', en: 'public Wi-Fi' }));
    const hq = C.node(HQ.x, HQ.y, 'building', { ar: 'شبكة الشركة', en: 'Company network' }, 'is-good');
    const branch = C.node(BR.x, BR.y, 'building', { ar: 'فرع تاني', en: 'Another branch' }, 'is-good', 72);
    const spy = C.node(SPY.x, SPY.y, 'hacker', { ar: 'متنصّت على الواي فاي', en: 'Wi-Fi eavesdropper' }, 'is-bad', 70);
    const line = C.link(ME, HQ, 'cy-wire');
    const tunnel = s('g', { class: 'vp-tunnel' }, s('rect', { x: ME.x + 40, y: ME.y - 30, width: HQ.x - ME.x - 80, height: 60, rx: 30 }),
      api.svgIcon('lock', ME.x + 70, ME.y, 26, { class: 'svg-ico' }), api.svgIcon('lock', HQ.x - 70, HQ.y, 26, { class: 'svg-ico' }));
    const tunnel2 = s('path', { d: `M${HQ.x - 40} ${HQ.y + 40} C ${HQ.x - 120} ${HQ.y + 90}, ${BR.x - 120} ${BR.y - 50}, ${BR.x - 36} ${BR.y - 10}`, class: 'vp-tunnel2' });
    const tunLbl = s('text', { x: 400, y: ME.y - 46, 'text-anchor': 'middle', class: 'cy-sub' }, t({ ar: 'نفق مشفّر عبر الإنترنت (VPN)', en: 'encrypted tunnel over the Internet (VPN)' }));
    const pkt = C.packet('', 'is-plain');
    const copy = C.packet('', 'is-plain');
    const say = C.tag(400, 440, '', 'is-bad');
    svg.append(line, tunnel, tunnel2, tunLbl, wifi, wifiLbl, me, hq, branch, spy, copy, pkt, say);
    gsap.set([tunnel, tunnel2, tunLbl, branch, say], { autoAlpha: 0 });
    function tell(txt, cls) {
      say.lastChild.textContent = t(txt);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      say.firstChild.setAttribute('x', -w / 2); say.firstChild.setAttribute('width', w);
      say.setAttribute('class', 'cy-tag ' + cls);
      gsap.fromTo(say, { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill(); gsap.set(say, { autoAlpha: 0 });
        const vpn = i >= 1;
        gsap.to(tunnel, { autoAlpha: vpn ? 1 : 0, duration: 0.5 });
        gsap.to(tunLbl, { autoAlpha: vpn ? 1 : 0, duration: 0.5 });
        gsap.to([branch, tunnel2], { autoAlpha: i >= 2 ? 1 : 0, duration: 0.5 });
        const secret = { ar: 'ملف العملاء.xlsx', en: 'customers.xlsx' };
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        loops.push(tl);
        tl.add(() => {
          pkt.setText(vpn ? C.scramble('customers.xlsx') : secret);
          copy.setText(vpn ? C.scramble('customers.xlsx') : secret);
          pkt.setAttribute('class', 'cy-packet ' + (vpn ? 'is-cipher' : 'is-plain'));
          copy.setAttribute('class', 'cy-packet ' + (vpn ? 'is-cipher' : 'is-plain'));
        })
          .add(C.fly(pkt, ME, HQ, { duration: 2.2, ease: 'none' }), 0)
          .add(C.fly(copy, { x: 250, y: ME.y }, SPY, { duration: 0.8 }), 0.7)
          .add(() => {
            if (vpn) { tell({ ar: '🔒 المتنصّت شايف رموز — المحتوى مشفّر جوّه النفق', en: '🔒 The eavesdropper sees symbols — the content is encrypted in the tunnel' }, 'is-good'); api.sound.play('ok'); }
            else { tell({ ar: '👀 على الواي فاي العام المتنصّت قرا الملف!', en: '👀 On public Wi-Fi the eavesdropper read the file!' }, 'is-bad'); api.sound.play('bad'); }
          }, 1.5)
          .to([pkt, copy, say], { autoAlpha: 0, duration: 0.3 }, '+=1.4');
        if (i >= 2) loops.push(gsap.fromTo(tunnel2, { strokeDashoffset: 0 }, { strokeDashoffset: -60, duration: 1.5, repeat: -1, ease: 'none' }));
      },
    };
  });

  /* ───────────────────────── dmzMap ───────────────────────── */
  K.defineAnim('dmzMap', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 820, 470);
    const zone = (x, w, label, sub, cls) => s('g', { class: 'dz-zone ' + cls },
      s('rect', { x, y: 40, width: w, height: 340, rx: 18 }),
      s('text', { x: x + w / 2, y: 70, 'text-anchor': 'middle', class: 'dz-zone-t' }, t(label)),
      s('text', { x: x + w / 2, y: 92, 'text-anchor': 'middle', class: 'cy-small' }, t(sub)));
    const zNet = zone(14, 170, { ar: 'الإنترنت', en: 'Internet' }, { ar: 'مستخدمين · مهاجمين', en: 'users · attackers' }, 'net');
    const zDmz = zone(262, 220, { ar: 'DMZ — المنطقة المعزولة', en: 'DMZ' }, { ar: 'خوادم عامة', en: 'public-facing servers' }, 'dmz');
    const zIn = zone(560, 246, { ar: 'الشبكة الداخلية', en: 'Internal network' }, { ar: 'بيانات سرّية', en: 'confidential data' }, 'in');
    const fw = (x) => { const g = s('g', { class: 'fw-wall' }, s('rect', { x: -14, y: -150, width: 28, height: 300, rx: 7 }), api.svgIcon('wall', 0, 0, 22, { class: 'svg-ico' })); gsap.set(g, { x, y: 225 }); return g; };
    const fw1 = fw(223), fw2 = fw(521);
    const user = C.node(100, 170, 'user', { ar: 'مستخدم', en: 'User' }, 'is-you', 70);
    const atk = C.node(100, 300, 'hacker', { ar: 'مهاجم', en: 'Attacker' }, 'is-bad', 70);
    const web = C.node(330, 170, 'server', { ar: 'خادم الويب', en: 'Web' }, 'is-good', 70);
    const mail = C.node(420, 290, 'mail', { ar: 'خادم البريد', en: 'Mail' }, 'is-good', 70);
    const pcs = C.node(630, 170, 'monitor', { ar: 'أجهزة الموظفين', en: 'Staff PCs' }, 'is-you', 70);
    const db = C.node(730, 290, 'database', { ar: 'قاعدة البيانات', en: 'Database' }, 'is-you', 70);
    const pkt = C.packet({ ar: 'زيارة الموقع', en: 'visit site' }, 'is-plain');
    const evil = C.packet({ ar: 'هجوم 💣', en: 'attack 💣' }, 'is-bad');
    const say = C.tag(410, 440, '', 'is-good');
    svg.append(zNet, zDmz, zIn, fw1, fw2, user, atk, web, mail, pcs, db, pkt, evil, say);
    gsap.set(say, { autoAlpha: 0 });
    function tell(txt, cls) {
      say.lastChild.textContent = t(txt);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      say.firstChild.setAttribute('x', -w / 2); say.firstChild.setAttribute('width', w);
      say.setAttribute('class', 'cy-tag ' + cls);
      gsap.fromTo(say, { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    const parts = [zNet, zDmz, zIn, fw1, fw2, user, atk, web, mail, pcs, db];
    return {
      beat(i) {
        kill(); gsap.set([say, pkt, evil], { autoAlpha: 0 });
        web.classList.remove('is-hit'); db.classList.remove('is-hit'); pcs.classList.remove('is-hit');
        if (i === 0) {
          gsap.fromTo(parts, { autoAlpha: 0, y: '+=0', scale: 0.9, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 0.45, ease: 'back.out(1.6)' });
          tell({ ar: '▮ = جدار حماية · الخوادم العامة في منطقة لوحدها', en: '▮ = firewall · public servers live in their own zone' }, 'is-good');
        } else if (i === 1) {
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 })
            .add(C.fly(pkt, { x: 100, y: 170 }, { x: 330, y: 170 }, { duration: 1.4 }))
            .add(() => { tell({ ar: '✅ الناس بتوصل لخادم الويب في الـDMZ عادي', en: '✅ People reach the web server in the DMZ normally' }, 'is-good'); api.sound.play('ok'); })
            .to([pkt, say], { autoAlpha: 0, duration: 0.3 }, '+=1.4'));
        } else {
          const inside = i >= 3; // "what if the web server were inside?"
          if (inside) gsap.to(web, { x: 640, y: 290, duration: 0.6 }); else gsap.set(web, { x: 330, y: 170 });
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
            .add(C.fly(evil, { x: 100, y: 300 }, inside ? { x: 640, y: 290 } : { x: 330, y: 170 }, { duration: 1.4 }))
            .add(() => { web.classList.add('is-hit'); api.sound.play('bad'); })
            .to(evil, { x: inside ? 730 : 505, y: inside ? 290 : 225, duration: 0.8, delay: 0.3 })
            .add(() => {
              if (inside) { db.classList.add('is-hit'); pcs.classList.add('is-hit'); tell({ ar: '💥 الخادم كان جوّه — المهاجم وصل للبيانات السرّية!', en: '💥 The server was inside — the attacker reached the confidential data!' }, 'is-bad'); }
              else { tell({ ar: '🛡️ الخادم اتضرب بس الجدار التاني وقف الهجوم — الشبكة الداخلية سليمة', en: '🛡️ The server was hit but the second firewall stopped it — the internal network is safe' }, 'is-good'); api.sound.play('ok'); }
            })
            .to(evil, { autoAlpha: 0, duration: 0.3 })
            .to(say, { autoAlpha: 0, duration: 0.3 }, '+=1.6')
            .add(() => { web.classList.remove('is-hit'); db.classList.remove('is-hit'); pcs.classList.remove('is-hit'); }));
        }
        if (i < 3) gsap.to(web, { x: 330, y: 170, duration: 0.4 });
      },
    };
  });

  /* ───────────────────────── defenseDepth ───────────────────────── */
  K.defineAnim('defenseDepth', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const L = [
      { icon: 'wall', n: { ar: 'مدخل الشبكة', en: 'Network entry' }, m: { ar: 'جدار حماية يمنع الاتصال غير المصرّح', en: 'firewall blocks unauthorized traffic' }, stop: { ar: 'اتمنع عند الباب 🚫', en: 'blocked at the door 🚫' } },
      { icon: 'tunnel', n: { ar: 'مسار الاتصال', en: 'Communication path' }, m: { ar: 'VPN يشفّر الاتصال', en: 'VPN encrypts traffic' }, stop: { ar: 'سرق بيانات… مشفّرة 🔒', en: 'stole data… encrypted 🔒' } },
      { icon: 'server', n: { ar: 'وضع الخوادم', en: 'Server placement' }, m: { ar: 'DMZ تفصل الخوادم العامة', en: 'DMZ isolates public servers' }, stop: { ar: 'اخترق خادم عام… ومحبوس في الـDMZ', en: 'broke a public server… trapped in the DMZ' } },
      { icon: 'monitor', n: { ar: 'الأجهزة الطرفية', en: 'Endpoints' }, m: { ar: 'مكافح فيروسات + تحديث النظام', en: 'antivirus + OS updates' }, stop: { ar: 'البرنامج الخبيث اتمسح 🧹', en: 'malware removed 🧹' } },
    ];
    const rows = L.map((l, k) => h('div', { class: 'dd-layer', style: { '--k': k } },
      h('span', { class: 'dd-n mono' }, String(k + 1)), h('span', { class: 'dd-ico' }, api.icon(l.icon)),
      h('div', { class: 'dd-txt' }, h('b', null, t(l.n)), h('small', null, t(l.m))),
      h('span', { class: 'dd-stop' }, t(l.stop))));
    const atk = h('div', { class: 'dd-atk' }, api.icon('hacker'));
    const core = h('div', { class: 'dd-core' }, api.icon('database'), h('b', null, t({ ar: 'بيانات العملاء', en: 'Customer data' })));
    const single = h('div', { class: 'dd-single' },
      h('div', { class: 'dd-one' }, api.icon('wall'), h('b', null, t({ ar: 'حاجز واحد بس', en: 'one single barrier' }))),
      h('p', null, t({ ar: 'لو اتكسر… المهاجم وصل لكل حاجة 💥', en: 'if it breaks… the attacker reaches everything 💥' })));
    const wrap = h('div', { class: 'dd-wrap' }, h('div', { class: 'dd-stack' }, atk, rows, core), single);
    stage.appendChild(wrap);
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        single.hidden = i !== 0;
        rows.forEach((r, k) => { r.classList.toggle('is-on', i >= 1 && (i >= 5 || k <= i - 1)); r.classList.toggle('is-current', k === i - 1); });
        if (i === 0) {
          loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 }).fromTo(single.querySelector('.dd-one'), { rotate: 0 }, { rotate: -8, duration: 0.08, yoyo: true, repeat: 5 }).to(single.querySelector('.dd-one'), { scale: 0.6, opacity: 0.3, duration: 0.4 }).to(single.querySelector('.dd-one'), { scale: 1, opacity: 1, duration: 0.4, delay: 1 }));
          return;
        }
        const k = Math.min(i - 1, 3);
        const row = rows[k];
        api.sound.play('pop');
        loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 })
          .fromTo(atk, { y: -10, opacity: 1, scale: 1 }, { y: row.offsetTop - 20, duration: 0.9, ease: 'power2.in' })
          .fromTo(row, { x: 0 }, { x: 6, duration: 0.06, yoyo: true, repeat: 5 })
          .fromTo(row.querySelector('.dd-stop'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '<')
          .to(atk, { opacity: 0, scale: 0.5, duration: 0.3 })
          .to(row.querySelector('.dd-stop'), { opacity: 0, duration: 0.3 }, '+=1.2'));
      },
    };
  });

  /* ───────────────────────── zeroTrust ───────────────────────── */
  K.defineAnim('zeroTrust', (stage, props, api) => {
    const { s } = api;
    const t = api.t;
    const C = RV.cyberKit(api);
    const svg = K.svgCanvas(stage, 800, 470);
    const moat = s('ellipse', { cx: 470, cy: 250, rx: 270, ry: 170, class: 'zt-perimeter' });
    const moatLbl = s('text', { x: 470, y: 66, 'text-anchor': 'middle', class: 'cy-sub' }, t({ ar: 'المحيط: «الداخل آمن… والخارج خطر»', en: 'The perimeter: "inside is safe… outside is dangerous"' }));
    const res = [
      { p: { x: 410, y: 190 }, icon: 'database', l: { ar: 'العملاء', en: 'Customers' } },
      { p: { x: 560, y: 190 }, icon: 'server', l: { ar: 'المرتّبات', en: 'Payroll' } },
      { p: { x: 485, y: 320 }, icon: 'mail', l: { ar: 'البريد', en: 'Mail' } },
    ].map((r) => ({ ...r, g: C.node(r.p.x, r.p.y, r.icon, r.l, 'is-good', 66) }));
    const gates = res.map((r) => { const g = s('g', { class: 'zt-gate' }, s('circle', { cx: 0, cy: 0, r: 15 }), api.svgIcon('userCheck', 0, 0, 18, { class: 'svg-ico' })); gsap.set(g, { x: r.p.x - 44, y: r.p.y - 40 }); return g; });
    const atk = C.node(100, 250, 'hacker', { ar: 'مهاجم', en: 'Attacker' }, 'is-bad', 62);
    const home = C.node(90, 110, 'laptopHome', { ar: 'موظف من البيت', en: 'staff at home' }, 'is-you', 58);
    const cloud = C.node(720, 420, 'cloud', { ar: 'خدمة سحابية', en: 'cloud service' }, 'is-you', 58);
    const title = s('text', { x: 400, y: 30, 'text-anchor': 'middle', class: 'cy-title' }, '');
    const say = C.tag(400, 452, '', 'is-bad');
    svg.append(moat, moatLbl, ...res.map((r) => r.g), ...gates, home, cloud, atk, title, say);
    gsap.set([gates, home, cloud, say], { autoAlpha: 0 });
    function tell(txt, cls) {
      say.lastChild.textContent = t(txt);
      const w = Math.max(60, t(txt).length * 9.5 + 30);
      say.firstChild.setAttribute('x', -w / 2); say.firstChild.setAttribute('width', w);
      say.setAttribute('class', 'cy-tag ' + cls);
      gsap.fromTo(say, { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
    }
    const setTitle = (txt) => { title.textContent = t(txt); gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 0.4 }); };
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill(); gsap.set(say, { autoAlpha: 0 });
        res.forEach((r) => r.g.classList.remove('is-hit'));
        gsap.to(gates, { autoAlpha: i >= 2 ? 1 : 0, duration: 0.4 });
        gsap.to([home, cloud], { autoAlpha: i >= 1 ? 1 : 0, duration: 0.4 });
        moat.classList.toggle('is-blur', i >= 1);
        if (i === 0) {
          setTitle({ ar: 'الأمان التقليدي: سور واحد… واللي جوّه موثوق', en: 'Traditional security: one wall… and everything inside is trusted' });
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).set(atk, { x: 90, y: 250 }).to(atk, { x: 260, duration: 0.8 })
            .add(() => tell({ ar: '😱 عدّى الحدود → وصول واسع لكل حاجة', en: '😱 Past the edge → broad access to everything' }, 'is-bad'));
          res.forEach((r) => tl.to(atk, { x: r.p.x - 60, y: r.p.y + 10, duration: 0.6 }).add(() => { r.g.classList.add('is-hit'); api.sound.play('beep'); }));
          tl.to(say, { autoAlpha: 0, duration: 0.3 }, '+=1').add(() => res.forEach((r) => r.g.classList.remove('is-hit')));
          loops.push(tl);
        } else if (i === 1) {
          setTitle({ ar: 'السحابة والعمل من البيت ضيّعوا الحدّ بين «جوّه» و«بره»', en: 'Cloud and remote work blurred the line between "inside" and "outside"' });
          gsap.set(atk, { x: 90, y: 250 });
          tell({ ar: 'الموظف بره، والخدمة بره… فين «الداخل الآمن»؟ 🤔', en: 'Staff outside, services outside… where is the "safe inside"? 🤔' }, 'is-warn');
          loops.push(gsap.to(moat, { attr: { rx: 285 }, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }));
        } else {
          setTitle({ ar: 'انعدام الثقة: محدش موثوق تلقائيًا — كل وصول بيتحقّق منه كل مرة', en: 'Zero trust: no one is trusted automatically — every access is verified every time' });
          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).set(atk, { x: 90, y: 250 }).to(atk, { x: 260, duration: 0.8 });
          res.forEach((r, k) => tl.to(atk, { x: r.p.x - 80, y: r.p.y - 20, duration: 0.6 })
            .fromTo(gates[k], { scale: 1, transformOrigin: '50% 50%' }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 1 })
            .add(() => api.sound.play('bad')));
          tl.add(() => tell({ ar: '⛔ اتمنع عند كل مورد: الهوية + الصلاحيات بتتفحص كل مرة', en: '⛔ Blocked at every resource: identity + permissions checked every time' }, 'is-good'))
            .to(say, { autoAlpha: 0, duration: 0.3 }, '+=1.6');
          loops.push(tl);
        }
      },
    };
  });
})();

/* =========================================================
 * anims/network.js — lesson 2-2 (network security design)
 *   defenseDepth : one wall vs four layers; the attacker loses at each
 *   zeroTrust    : castle-and-moat ("inside is safe") vs verify every access
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── firewallSim ───────────────────────── */


  /* ───────────────────────── vpnTunnel ───────────────────────── */


  /* ───────────────────────── dmzMap ───────────────────────── */


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

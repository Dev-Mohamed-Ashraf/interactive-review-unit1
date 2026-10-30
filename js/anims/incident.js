/* =========================================================
 * anims/incident.js — lesson 2-3 (incident response & risk management)
 *   incidentTypes    : information leak · data tampering · service outage
 *                      (+ what is NOT an incident)
 *   riskMatrix       : risk = impact × likelihood on a 3×3 grid, the textbook
 *                      risks a–d scored and ranked, then a live calculator
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /* ───────────────────────── incidentTypes ───────────────────────── */
  K.defineAnim('incidentTypes', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const leakFiles = [0, 1, 2, 3].map(() => h('span', { class: 'it-file' }, '📄'));
    const leak = h('div', { class: 'it-card it-leak' }, h('div', { class: 'it-vis' }, h('span', { class: 'it-srv' }, api.icon('server')), leakFiles),
      h('b', null, t({ ar: 'تسرّب المعلومات', en: 'Information leak' })), h('small', null, t({ ar: 'معلومات شخصية أو سرّية بتطلع لبره', en: 'personal or confidential info leaks outside' })));
    const num = h('b', { class: 'it-num mono' }, '500');
    const tamper = h('div', { class: 'it-card it-tamper' }, h('div', { class: 'it-vis' }, h('div', { class: 'it-row' }, h('span', null, t({ ar: 'رصيدك:', en: 'Balance:' })), num)),
      h('b', null, t({ ar: 'التلاعب بالبيانات', en: 'Data tampering' })), h('small', null, t({ ar: 'تعديل بيانات جوّه النظام من غير تصريح', en: 'data altered inside the system without authorization' })));
    const page = h('div', { class: 'it-page' }, h('b', { class: 'mono' }, '503'), h('small', null, t({ ar: 'الخدمة مش متاحة', en: 'Service unavailable' })));
    const outage = h('div', { class: 'it-card it-out' }, h('div', { class: 'it-vis' }, page),
      h('b', null, t({ ar: 'انقطاع الخدمة', en: 'Service outage' })), h('small', null, t({ ar: 'الخدمة بتقف بسبب هجوم على الخادم', en: 'a service goes down due to an attack on the server' })));
    const not = h('div', { class: 'it-not' }, '🔄 ', t({ ar: 'تحديث برمجي لإضافة ميزات جديدة = ', en: 'A software update adding new features = ' }), h('b', null, t({ ar: 'مش حادث أمني ✋ (مفيش ضرر)', en: 'NOT a security incident ✋ (no damage)' })));
    const def = h('div', { class: 'it-def' }, t({ ar: '🚨 الحادث الأمني = حدث بيأثر في __سرية المعلومات أو سلامتها أو توافرها__، أو يهددها بجدية، أو يخالف سياسة أمنية', en: '🚨 A security incident = a situation where __actual damage__ occurs due to an information-security problem' }).replace(/__/g, ''));
    const cards = [leak, tamper, outage];
    const wrap = h('div', { class: 'it-wrap' }, def, h('div', { class: 'it-grid' }, cards), not);
    stage.appendChild(wrap);
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        cards.forEach((c, k) => { c.classList.toggle('is-on', k <= i); c.classList.toggle('is-current', k === i); });
        not.hidden = i < 3;
        if (i === 0 || i >= 3) loops.push(gsap.timeline({ repeat: -1 }).fromTo(leakFiles, { x: 0, y: 0, opacity: 1 }, { x: () => (RV.i18n.lang === 'ar' ? -1 : 1) * (60 + Math.random() * 40), y: () => -30 + Math.random() * 60, opacity: 0, stagger: 0.3, duration: 1.2, ease: 'power1.in' }));
        if (i === 1 || i >= 3) loops.push(gsap.timeline({ repeat: -1, repeatDelay: 1 }).add(() => { num.textContent = '500'; num.classList.remove('bad'); }).to(num, { scale: 1.3, duration: 0.2, delay: 1 }).add(() => { num.textContent = '5,000'; num.classList.add('bad'); api.sound.play('beep'); }).to(num, { scale: 1, duration: 0.3 }));
        if (i === 2 || i >= 3) loops.push(gsap.fromTo(page, { opacity: 1 }, { opacity: 0.35, duration: 0.5, repeat: -1, yoyo: true }));
        if (cards[i]) gsap.fromTo(cards[i], { y: 20, scale: 0.95 }, { y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' });
        if (i >= 3) gsap.fromTo(not, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
      },
    };
  });

  /* ───────────────────────── incidentResponse ───────────────────────── */


  /* ───────────────────────── riskMatrix ───────────────────────── */
  K.defineAnim('riskMatrix', (stage, props, api) => {
    const { h } = api;
    const t = api.t;
    const LVL = [{ ar: 'منخفض', en: 'Low' }, { ar: 'متوسط', en: 'Medium' }, { ar: 'مرتفع', en: 'High' }];
    const NAME = (v) => (v >= 9 ? { ar: 'مرتفع جدًا', en: 'Very high' } : v >= 6 ? { ar: 'مرتفع', en: 'High' } : v >= 3 ? { ar: 'متوسط', en: 'Medium' } : v >= 2 ? { ar: 'منخفض', en: 'Low' } : { ar: 'منخفض جدًا', en: 'Very low' });
    const cells = {};
    const grid = h('div', { class: 'rm-grid' });
    for (let imp = 3; imp >= 1; imp--) {
      grid.appendChild(h('span', { class: 'rm-axis-y' }, t(LVL[imp - 1])));
      for (let lik = 1; lik <= 3; lik++) {
        const v = imp * lik;
        const cell = h('div', { class: 'rm-cell lv' + Math.min(4, Math.ceil(v / 2.25)) }, h('small', { class: 'rm-cell-n' }, t(NAME(v))), h('b', { class: 'mono rm-cell-v' }, String(v)));
        cells[imp + ',' + lik] = cell;
        grid.appendChild(cell);
      }
    }
    grid.appendChild(h('span'));
    LVL.forEach((l) => grid.appendChild(h('span', { class: 'rm-axis-x' }, t(l))));
    const yLbl = h('div', { class: 'rm-ylbl' }, t({ ar: 'التأثير ↑', en: 'Impact ↑' }));
    const xLbl = h('div', { class: 'rm-xlbl' }, t({ ar: 'الاحتمالية →', en: 'Likelihood →' }));
    const formula = h('div', { class: 'rm-formula mono' }, t({ ar: 'حجم المخاطرة = التأثير × الاحتمالية', en: 'Risk size = Impact × Likelihood' }));
    const RISKS = [
      { id: 'a', i: 3, l: 3 }, { id: 'b', i: 1, l: 3 }, { id: 'c', i: 3, l: 2 }, { id: 'd', i: 1, l: 1 },
    ];
    const pins = RISKS.map((r) => h('span', { class: 'rm-pin mono' }, r.id));
    const rank = h('ol', { class: 'rm-rank' }, RISKS.slice().sort((x, y) => y.i * y.l - x.i * x.l).map((r) => h('li', null, h('b', { class: 'mono' }, r.id), ` = ${r.i} × ${r.l} = `, h('b', { class: 'mono' }, String(r.i * r.l)))));
    // live calculator
    const si = h('input', { type: 'range', min: 1, max: 3, value: 2, class: 'rm-slide' });
    const sl = h('input', { type: 'range', min: 1, max: 3, value: 2, class: 'rm-slide' });
    const out = h('b', { class: 'rm-out mono' }, '4');
    const lab = h('div', { class: 'rm-lab' },
      h('label', null, t({ ar: 'التأثير', en: 'Impact' }), si), h('label', null, t({ ar: 'الاحتمالية', en: 'Likelihood' }), sl),
      h('div', { class: 'rm-res' }, t({ ar: 'المخاطرة = ', en: 'Risk = ' }), out));
    const wrap = h('div', { class: 'rm-wrap' }, formula, h('div', { class: 'rm-board' }, yLbl, grid, xLbl), h('div', { class: 'rm-side' }, rank, lab));
    stage.appendChild(wrap);

    function calc() {
      const v = +si.value * +sl.value;
      out.textContent = `${si.value} × ${sl.value} = ${v}`;
      Object.values(cells).forEach((c) => c.classList.remove('is-live'));
      cells[si.value + ',' + sl.value].classList.add('is-live');
      gsap.fromTo(out, { scale: 1.3 }, { scale: 1, duration: 0.3 });
    }
    api.on(si, 'input', () => { calc(); api.sound.play('tap'); });
    api.on(sl, 'input', () => { calc(); api.sound.play('tap'); });
    const loops = [];
    const kill = () => loops.splice(0).forEach((l) => l.kill());
    return {
      beat(i) {
        kill();
        rank.hidden = i < 2;
        lab.hidden = i < 3;
        pins.forEach((p) => p.remove());
        Object.values(cells).forEach((c) => c.classList.remove('is-live', 'is-first'));
        if (i === 0) {
          gsap.from(Object.values(cells), { scale: 0.6, opacity: 0, stagger: { each: 0.06, from: 'end' }, duration: 0.4, ease: 'back.out(2)' });
          loops.push(gsap.fromTo(cells['3,3'], { boxShadow: '0 0 0 0 rgba(251,113,133,.8)' }, { boxShadow: '0 0 0 14px rgba(251,113,133,0)', duration: 1.2, repeat: -1 }));
        }
        if (i >= 1) {
          RISKS.forEach((r, k) => {
            const cell = cells[r.i + ',' + r.l];
            cell.appendChild(pins[k]);
            if (i === 1) gsap.fromTo(pins[k], { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.5, delay: k * 0.4, ease: 'back.out(2.5)', onStart: () => api.sound.play('pop') });
          });
        }
        if (i >= 2) {
          cells['3,3'].classList.add('is-first');
          gsap.from(rank.children, { x: RV.i18n.lang === 'ar' ? 30 : -30, opacity: 0, stagger: 0.25, duration: 0.45 });
        }
        if (i >= 3) calc();
      },
    };
  });
})();

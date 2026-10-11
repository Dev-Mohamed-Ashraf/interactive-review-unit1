/* =========================================================
 * screens/wheel.js — 🎡 the question wheel (classroom game).
 *   RV.wheel.open(lesson) → full-screen overlay: spin → a random question
 *   from the lesson's practice / test / worked stations pops up and is
 *   answered right there (practice mode, XP counts).
 * ========================================================= */
(function () {
  'use strict';
  const { h, s } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const OK = ['mcq', 'tf', 'match', 'fill', 'order', 'classify', 'numeric', 'recall'];
  const COLORS = ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6', '#fb923c', '#60a5fa', '#4ade80'];

  function pool(lesson) {
    const out = [];
    lesson.stations.forEach((st) => st.steps.forEach((step) => {
      if ((step.type === 'quiz' || step.type === 'example') && step.q && OK.includes(step.q.widget)) out.push(step.q);
    }));
    return out;
  }

  function open(lesson) {
    const qs = RV.dom.shuffle(pool(lesson));
    if (!qs.length) return;
    const N = 8;
    const R = 180, C = 200;
    const wheel = s('g', { class: 'wh-wheel' });
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / N) * Math.PI * 2 - Math.PI / 2;
      const p = `M${C} ${C} L${C + R * Math.cos(a0)} ${C + R * Math.sin(a0)} A${R} ${R} 0 0 1 ${C + R * Math.cos(a1)} ${C + R * Math.sin(a1)} Z`;
      const am = (a0 + a1) / 2;
      wheel.append(s('path', { d: p, fill: COLORS[i], stroke: '#060b1c', 'stroke-width': 3 }),
        s('text', { x: C + R * 0.66 * Math.cos(am), y: C + R * 0.66 * Math.sin(am) + 10, 'text-anchor': 'middle', class: 'wh-num' }, String(i + 1)));
    }
    const svg = s('svg', { viewBox: '0 0 400 400', class: 'wh-svg' }, wheel,
      s('circle', { cx: C, cy: C, r: 34, class: 'wh-hub' }),
      s('path', { d: `M${C - 16} 4 L${C + 16} 4 L${C} 40 Z`, class: 'wh-pin' }));
    const spinBtn = h('button', { class: 'btn btn-primary wh-spin', type: 'button' }, '🎡 ', t({ ar: 'لِف العجلة!', en: 'Spin!' }));
    const closeBtn = h('button', { class: 'icon-btn wh-close', type: 'button' }, RV.icon('close'));
    const qBox = h('div', { class: 'wh-q', hidden: true });
    const overlay = h('div', { class: 'wh-overlay' }, closeBtn,
      h('h2', null, '🎡 ', t({ ar: 'عجلة الأسئلة', en: 'Question wheel' }), ' · ', h('span', { class: 'mono' }, lesson.id)),
      h('div', { class: 'wh-stage' }, svg, spinBtn), qBox);
    document.body.appendChild(overlay);
    gsap.from(svg, { scale: 0.3, rotate: -180, duration: 0.8, ease: 'back.out(1.6)' });

    let rot = 0, k = 0, spinning = false;
    spinBtn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true; qBox.hidden = true;
      const seg = Math.floor(Math.random() * N);
      rot += 360 * 5 + (360 - (seg + 0.5) * (360 / N)) - (rot % 360);
      let lastTick = 0;
      gsap.to(wheel, { rotation: rot, svgOrigin: `${C} ${C}`, duration: 4, ease: 'power4.out',
        onUpdate() { const r = gsap.getProperty(wheel, 'rotation'); if (Math.floor(r / 45) !== lastTick) { lastTick = Math.floor(r / 45); RV.sound.play('tap'); } },
        onComplete() { spinning = false; RV.sound.play('win'); showQ(seg); } });
    });
    closeBtn.addEventListener('click', () => gsap.to(overlay, { opacity: 0, duration: 0.25, onComplete: () => overlay.remove() }));

    function showQ(seg) {
      const q = qs[k++ % qs.length];
      RV.dom.clear(qBox);
      qBox.hidden = false;
      const card = h('div', { class: 'q-card card' });
      qBox.append(h('div', { class: 'wh-q-head', style: { background: COLORS[seg] } }, t({ ar: `سؤال رقم ${seg + 1}`, en: `Question ${seg + 1}` })), card);
      RV.widgets.get(q.widget).mount(card, q, { mode: 'practice', onAnswer(res) { RV.game.answer(res, spinBtn); } });
      gsap.from(qBox, { y: 40, opacity: 0, duration: 0.5, ease: 'back.out(1.6)' });
      qBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  RV.wheel = { open, pool };
})();

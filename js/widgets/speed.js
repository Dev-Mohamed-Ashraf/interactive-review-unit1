/* widgets/speed.js — ⚡ speed round: true/false statements against the clock.
 * q = { widget:'speed', id?, seconds?: 60, prompt?, items:[{ text: bi, answer: bool }] }
 * Combo multiplies points (×5 max); keyboard ←/→ or the two big buttons;
 * the personal best is saved per round id. */
(function () {
  'use strict';
  const { h, s } = RV.dom;
  const W = RV.wkit;
  const RING = 119.4; // circumference of r=19

  W.defineWidget('speed', {
    validate(q) {
      const e = [];
      W.v.arr(q.items, 'items', e, 8);
      (q.items || []).forEach((it, i) => { W.v.bi(it.text, `items[${i}].text`, e); if (typeof it.answer !== 'boolean') e.push(`items[${i}].answer must be boolean`); });
      return e;
    },
    mount(el, q, ctx) {
      const total = q.seconds || 60;
      const bestKey = 'speed:' + (q.id || q.items.length);
      let deck = [], k = 0, correct = 0, wrong = 0, combo = 0, points = 0, left = total, timer = null, running = false;

      const clock = h('div', { class: 'sp-clock mono' }, String(total));
      const ringFg = s('circle', { cx: 22, cy: 22, r: 19, class: 'sp-ring-fg', 'stroke-dasharray': RING, 'stroke-dashoffset': 0 });
      const ring = s('svg', { viewBox: '0 0 44 44', class: 'sp-ring' }, s('circle', { cx: 22, cy: 22, r: 19, class: 'sp-ring-bg' }), ringFg);
      const pts = h('div', { class: 'sp-points mono' }, '0');
      const comboEl = h('div', { class: 'sp-combo' });
      const card = h('div', { class: 'sp-card' });
      const yes = h('button', { class: 'sp-btn yes', type: 'button' }, RV.icon('check'), RV.i18n.ui('tf_true'));
      const no = h('button', { class: 'sp-btn no', type: 'button' }, RV.icon('x'), RV.i18n.ui('tf_false'));
      const startLabel = h('span', null, RV.i18n.t({ ar: `ابدأ — ${total} ثانية`, en: `Start — ${total} seconds` }));
      const startBtn = h('button', { class: 'btn btn-primary sp-start', type: 'button' }, '⚡ ', startLabel);
      const best = h('div', { class: 'sp-best muted' });
      const arena = h('div', { class: 'sp-arena is-idle' }, card, h('div', { class: 'sp-btns' }, no, yes));
      el.append(
        h('div', { class: 'q-head' }, h('span', { class: 'q-tag' }, '⚡ ', RV.i18n.t({ ar: 'تحدّي السرعة', en: 'Speed round' })),
          h('p', { class: 'q-prompt' }, RV.rich(q.prompt || { ar: 'صح ولا غلط؟ جاوب أسرع ما تقدر — الإجابات الصح ورا بعض بتضاعف النقط!', en: 'True or false? Answer fast — correct streaks multiply your points!' }))),
        h('div', { class: 'sp-hud' }, h('div', { class: 'sp-timer' }, ring, clock), comboEl, pts),
        arena, h('div', { class: 'q-actions' }, startBtn), best);
      card.textContent = RV.i18n.t({ ar: 'جاهز؟ 🏁', en: 'Ready? 🏁' });
      showBest();

      startBtn.addEventListener('click', start);
      yes.addEventListener('click', () => answer(true));
      no.addEventListener('click', () => answer(false));
      function onKey(e) {
        if (!running) return;
        const rtl = RV.i18n.lang === 'ar';
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.stopPropagation(); e.preventDefault();
          // in RTL the "true" button sits on the right
          answer(e.key === 'ArrowRight' ? rtl : !rtl);
        }
      }
      document.addEventListener('keydown', onKey, true);

      function showBest() {
        const b = RV.store.game()[bestKey] || 0;
        best.textContent = b ? RV.i18n.t({ ar: `🏆 أعلى سكور ليك: ${b}`, en: `🏆 Your best: ${b}` }) : '';
      }
      function start() {
        deck = RV.dom.shuffle(q.items);
        k = 0; correct = 0; wrong = 0; combo = 0; points = 0; left = total;
        clock.textContent = total; clock.classList.remove('hurry'); pts.textContent = '0'; comboEl.textContent = '';
        ringFg.setAttribute('stroke-dashoffset', '0');
        running = true; startBtn.hidden = true; arena.classList.remove('is-idle');
        RV.sound.play('whoosh');
        show();
        timer = setInterval(tick, 1000);
      }
      function tick() {
        left--;
        clock.textContent = left;
        ringFg.setAttribute('stroke-dashoffset', String(RING * (1 - left / total)));
        if (left <= 10 && left > 0) { clock.classList.add('hurry'); RV.sound.play('beep'); }
        if (left <= 0) end();
      }
      function show() {
        card.replaceChildren(RV.rich(deck[k % deck.length].text));
        gsap.fromTo(card, { x: 60, opacity: 0, rotate: 4 }, { x: 0, opacity: 1, rotate: 0, duration: 0.3, ease: 'power3.out' });
      }
      function answer(val) {
        if (!running) return;
        const ok = val === deck[k % deck.length].answer;
        if (ok) {
          correct++; combo++; points += 10 * Math.min(combo, 5);
          RV.sound.play('ok');
          gsap.fromTo(card, { boxShadow: '0 0 0 6px rgba(52,211,153,.9)' }, { boxShadow: '0 0 0 0 rgba(52,211,153,0)', duration: 0.5 });
        } else {
          wrong++; combo = 0;
          RV.sound.play('bad'); W.shake(card);
        }
        pts.textContent = points;
        comboEl.textContent = combo >= 2 ? `🔥 ×${Math.min(combo, 5)}` : '';
        if (combo >= 2) gsap.fromTo(comboEl, { scale: 1.6 }, { scale: 1, duration: 0.3 });
        k++;
        if (k >= deck.length) { deck = RV.dom.shuffle(q.items); k = 0; } // loop the deck until time is up
        setTimeout(() => { if (running) show(); }, ok ? 120 : 380);
      }
      function end() {
        running = false; clearInterval(timer);
        arena.classList.add('is-idle');
        const g = RV.store.game();
        const isBest = points > (g[bestKey] || 0);
        if (isBest) { g[bestKey] = points; RV.store.saveGame(); }
        card.replaceChildren(h('div', { class: 'sp-result' },
          h('b', { class: 'mono' }, points + ' ⭐'),
          h('span', null, RV.i18n.t({ ar: `✅ ${correct} صح · ❌ ${wrong} غلط`, en: `✅ ${correct} right · ❌ ${wrong} wrong` })),
          isBest ? h('span', { class: 'sp-newbest' }, RV.i18n.t({ ar: '🏆 رقم قياسي جديد!', en: '🏆 New personal best!' })) : null));
        gsap.from(card, { scale: 0.7, duration: 0.5, ease: 'back.out(2)' });
        RV.sound.play('win');
        if (correct >= 8) RV.fx.confetti();
        startLabel.textContent = RV.i18n.t({ ar: 'العب تاني', en: 'Play again' });
        startBtn.hidden = false;
        showBest();
        RV.game.event('speed', { correct, xp: Math.min(60, correct * 3), anchor: startBtn });
        if (ctx.onAnswer) ctx.onAnswer({ correct: false, score: 0, max: 0 });
      }

      return {
        reveal() { /* a game: nothing to reveal */ },
        destroy() { running = false; clearInterval(timer); document.removeEventListener('keydown', onKey, true); },
      };
    },
  });
})();

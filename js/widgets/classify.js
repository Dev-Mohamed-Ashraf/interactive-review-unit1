/* widgets/classify.js — sort cards into groups (tap card → tap group).
 * q = { widget:'classify', prompt, groups:[{label, icon}], items:[{text, group}], explain } */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('classify', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.groups, 'groups', e, 2);
      W.v.arr(q.items, 'items', e, 2);
      (q.groups || []).forEach((g, i) => W.v.bi(g.label, `groups[${i}].label`, e));
      (q.items || []).forEach((it, i) => { W.v.bi(it.text, `items[${i}].text`, e); W.v.idx(it.group, (q.groups || []).length, `items[${i}].group`, e); });
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const placed = q.items.map(() => null);
      const firstTry = q.items.map(() => true);
      let active = null;

      const pool = h('div', { class: 'cls-pool' });
      const bins = h('div', { class: 'cls-bins', style: { '--n': q.groups.length } });
      const cards = q.items.map((it, i) => {
        const b = h('button', { class: 'cls-card', type: 'button' }, RV.rich(it.text));
        b.addEventListener('click', () => select(i));
        pool.appendChild(b);
        return b;
      });
      const binEls = q.groups.map((g, gi) => {
        const drop = h('div', { class: 'cls-drop' });
        const bin = h('button', { class: 'cls-bin', type: 'button' },
          h('div', { class: 'cls-bin-head' }, g.icon ? RV.icon(g.icon) : null, RV.kit.dualLabel(g.label)), drop);
        bin.addEventListener('click', (ev) => { if (ev.target.closest('.cls-card')) return; drop_(gi); });
        bins.appendChild(bin);
        return { bin, drop };
      });

      el.append(W.header(q, 'tapClassify'), pool, bins);
      gsap.from(cards, { y: 18, opacity: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out', clearProps: 'all' });

      // ── drag & drop with a finger or mouse (tap-to-select still works) ──
      cards.forEach((card, i) => {
        let ghost = null, sx = 0, sy = 0, moved = false;
        card.addEventListener('pointerdown', (e) => {
          if (placed[i] !== null) return;
          sx = e.clientX; sy = e.clientY; moved = false;
          try { card.setPointerCapture(e.pointerId); } catch (err) { /* synthetic / inactive pointer */ }
        });
        card.addEventListener('pointermove', (e) => {
          if (!(e.buttons || e.pointerType === 'touch')) return; // only while pressed
          const dx = e.clientX - sx, dy = e.clientY - sy;
          if (!moved && Math.hypot(dx, dy) < 10) return;
          if (!moved) {
            moved = true;
            const r = card.getBoundingClientRect();
            ghost = card.cloneNode(true);
            ghost.classList.add('cls-ghost');
            Object.assign(ghost.style, { width: r.width + 'px', left: r.left + 'px', top: r.top + 'px' });
            document.body.appendChild(ghost);
            card.classList.add('is-dragging');
            active = i;
            bins.classList.add('is-armed');
          }
          gsap.set(ghost, { x: dx, y: dy, rotate: dx / 30 });
          binEls.forEach((b) => { const r = b.bin.getBoundingClientRect(); b.bin.classList.toggle('is-hover', e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom); });
        });
        const finish = (e) => {
          if (!moved) return;
          const target = binEls.findIndex((b) => { const r = b.bin.getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom; });
          binEls.forEach((b) => b.bin.classList.remove('is-hover'));
          card.classList.remove('is-dragging');
          if (ghost) { ghost.remove(); ghost = null; }
          if (target >= 0) drop_(target); else { active = null; bins.classList.remove('is-armed'); }
          // swallow the click that follows a drag
          card.addEventListener('click', (ev) => ev.stopImmediatePropagation(), { capture: true, once: true });
        };
        card.addEventListener('pointerup', finish);
        card.addEventListener('pointercancel', finish);
      });

      function select(i) {
        if (placed[i] !== null) return;
        RV.sound.play('tap');
        active = active === i ? null : i;
        cards.forEach((c, k) => c.classList.toggle('is-active', k === active));
        bins.classList.toggle('is-armed', active !== null);
      }
      function drop_(gi) {
        if (active === null) return;
        const i = active;
        const it = q.items[i];
        const ok = it.group === gi;
        if (ok || ctx.mode === 'test') {
          placed[i] = gi;
          const card = cards[i];
          const from = card.getBoundingClientRect();
          binEls[gi].drop.appendChild(card);
          const to = card.getBoundingClientRect();
          gsap.from(card, { x: from.left - to.left, y: from.top - to.top, duration: 0.45, ease: 'power3.out', clearProps: 'transform' });
          card.classList.remove('is-active');
          card.classList.add(ok ? 'is-correct' : 'is-wrong', 'is-placed');
          RV.sound.play(ok ? 'ok' : 'bad');
          if (!ok) {
            // test mode: show where it belonged
            card.appendChild(h('small', { class: 'cls-should' }, '→ ' + RV.i18n.t(q.groups[it.group].label)));
          }
        } else {
          firstTry[i] = false;
          W.shake(binEls[gi].bin);
          RV.sound.play('bad');
          binEls[gi].bin.classList.add('is-wrong');
          setTimeout(() => binEls[gi].bin.classList.remove('is-wrong'), 600);
          return;
        }
        active = null;
        bins.classList.remove('is-armed');
        if (placed.every((p) => p !== null)) {
          const score = q.items.reduce((n, it2, k) => n + (placed[k] === it2.group && firstTry[k] ? 1 : 0), 0);
          W.feedback(el, score === q.items.length ? 'ok' : score ? 'partly' : 'bad', q.explain);
          report({ correct: score === q.items.length, score, max: q.items.length });
        }
      }

      return {
        reveal() {
          q.items.forEach((it, i) => { if (placed[i] === null) { firstTry[i] = false; active = i; drop_(it.group); } });
        },
      };
    },
  });
})();

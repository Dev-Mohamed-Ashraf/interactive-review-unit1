/* =========================================================
 * screens/steps.js — renderers for each STEP TYPE inside a station.
 *
 *   RV.steps[type].render(host, step, ctx) → {
 *     beats:   number of reveal beats (>=1)
 *     beat(i): show beat i (0-based)
 *     ready(): may the player advance past this step?
 *     destroy()
 *   }
 * ctx = { lesson, station, mode, onAnswer(res), onReady() }
 * The player owns navigation; steps own their own content only.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  const NOTE = {
    exam:    { icon: 'alert',  key: 'exam' },
    confuse: { icon: 'scale',  key: 'confuse' },
    tip:     { icon: 'bulb',   key: 'tip' },
    think:   { icon: 'question', key: 'think' },
    fact:    { icon: 'sparkle', key: 'keyFact' },
  };

  function noteBox(n) {
    const def = NOTE[n.kind] || NOTE.tip;
    return h('aside', { class: 'note note-' + n.kind },
      h('div', { class: 'note-title' }, RV.icon(def.icon), n.title ? t(n.title) : RV.i18n.ui(def.key)),
      h('p', null, RV.rich(n.text)));
  }

  function termChips(terms) {
    if (!terms || !terms.length) return null;
    return h('div', { class: 'term-chips' }, terms.map((x) => h('span', { class: 'chip en-term' }, x)));
  }

  /** Mount an animation in a stage element; returns the anim instance (or a no-op). */
  function mountAnim(stage, visual, ctx) {
    if (!visual) return { beat() {}, destroy() {} };
    const def = RV.anims.get(visual.anim);
    return def.mount(stage, visual.props || {}, { lesson: ctx.lesson });
  }

  /** Standard two-pane layout: visual stage + text panel. */
  function splitLayout(host, hasVisual, wide) {
    const stage = h('div', { class: 'stage' + (wide ? ' stage-wide' : '') });
    const panel = h('div', { class: 'panel' });
    host.appendChild(h('div', { class: 'split' + (hasVisual ? '' : ' no-visual') + (wide ? ' split-wide' : '') }, hasVisual ? stage : null, panel));
    return { stage, panel };
  }

  const steps = {
    /* ---------- scene: animation + progressively revealed beats ---------- */
    scene: {
      render(host, step, ctx) {
        const { stage, panel } = splitLayout(host, !!step.visual, step.wide);
        const anim = mountAnim(stage, step.visual, ctx);
        const beats = step.beats && step.beats.length ? step.beats : [];
        const list = h('ol', { class: 'beats' });
        const items = beats.map((b) => h('li', { class: 'beat' }, RV.rich(b)));
        items.forEach((li) => list.appendChild(li));
        const notes = h('div', { class: 'notes' }, (step.notes || []).map(noteBox));
        const titleEl = h('h2', { class: 'panel-title' }, RV.rich(step.title));
        RV.dom.add(panel,
          step.kicker ? h('span', { class: 'panel-kicker' }, t(step.kicker)) : null,
          titleEl,
          step.enTitle ? h('p', { class: 'panel-en' }, step.enTitle) : null,
          termChips(step.terms), list, notes);
        const count = Math.max(1, items.length);
        let shown = -1;
        RV.kit.revealText(titleEl, { y: 24 });
        return {
          beats: count,
          beat(i) {
            items.forEach((li, k) => {
              li.classList.toggle('is-shown', k <= i);
              li.classList.toggle('is-current', k === i);
            });
            if (i > shown && items[i]) {
              gsap.fromTo(items[i], { x: RV.i18n.lang === 'ar' ? -24 : 24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
              const li = items[i];
              const words = RV.kit.revealText(li, { stagger: 0.035, y: 12 }); // word-by-word (Arabic) / letter-by-letter (Latin)
              // then a highlighter pen sweeps over the key terms, one after another
              if (li.querySelector('.term, .kw')) {
                li.style.setProperty('--hl', '0%');
                gsap.delayedCall(Math.min(1.3, words.totalDuration()), () => {
                  gsap.fromTo(li.querySelectorAll('.term, .kw'), { '--hl': '0%' }, { '--hl': '100%', duration: 0.5, stagger: 0.18, ease: 'power2.inOut' });
                  li.style.removeProperty('--hl');
                });
              }
              // and the stage glows for a moment: "look — the picture just changed with this line"
              if (i > 0 && step.visual) { stage.classList.remove('is-pulse'); void stage.offsetWidth; stage.classList.add('is-pulse'); }
              if (i > 0) RV.sound.play('pop');
            }
            const last = i >= count - 1;
            if (last && !notes.classList.contains('is-shown') && notes.children.length) {
              notes.classList.add('is-shown');
              gsap.from(notes.children, { y: 20, opacity: 0, stagger: 0.12, duration: 0.5, delay: 0.25, ease: 'power2.out' });
            } else if (!last) notes.classList.remove('is-shown');
            shown = Math.max(shown, i);
            const cur = items[i];
            if (cur && cur.scrollIntoView && panel.scrollHeight > panel.clientHeight) cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            anim.beat(i);
          },
          ready: () => true,
          destroy() { anim.destroy(); },
        };
      },
    },

    /* ---------- intro: guiding question, key fact, key concepts ---------- */
    intro: {
      render(host, step, ctx) {
        const L = ctx.lesson;
        const { stage, panel } = splitLayout(host, true);
        const anim = mountAnim(stage, { anim: 'hero', props: { img: L.cover, caption: L.coverCaption } }, ctx);
        const blocks = [
          h('div', { class: 'intro-block' }, h('h3', null, RV.icon('question'), RV.i18n.ui('guiding')), h('p', { class: 'intro-big' }, t(L.guiding))),
          h('div', { class: 'intro-block' }, h('p', null, RV.rich(L.hook))),
          h('div', { class: 'intro-block intro-fact' }, h('h3', null, RV.icon('sparkle'), RV.i18n.ui('keyFact')), h('p', null, RV.rich(L.keyFact)),
            termChips(L.concepts)),
        ];
        RV.dom.add(panel, h('span', { class: 'panel-kicker' }, `${RV.i18n.ui('lesson')} ${L.id}`), h('h2', { class: 'panel-title' }, t(L.title)), h('div', { class: 'intro-blocks' }, blocks));
        return {
          beats: blocks.length,
          beat(i) {
            blocks.forEach((b, k) => b.classList.toggle('is-shown', k <= i));
            if (blocks[i]) gsap.fromTo(blocks[i], { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' });
            anim.beat(i);
          },
          ready: () => true,
          destroy() { anim.destroy(); },
        };
      },
    },

    /* ---------- quiz: one question widget ---------- */
    quiz: {
      render(host, step, ctx) {
        let answered = false;
        const card = h('div', { class: 'q-card card' });
        host.appendChild(h('div', { class: 'q-wrap' }, step.title ? h('h2', { class: 'panel-title q-title' }, RV.rich(step.title)) : null, card));
        const inst = RV.widgets.get(step.q.widget).mount(card, step.q, {
          mode: ctx.mode,
          onAnswer(res) { answered = true; ctx.onAnswer(res); ctx.onReady(); },
        });
        return {
          beats: 1,
          beat() {},
          ready: () => answered || RV.store.setting('teacher') || step.optional,
          destroy() { if (inst && inst.destroy) inst.destroy(); },
          reveal: () => inst.reveal && inst.reveal(),
        };
      },
    },

    /* ---------- example: question + step-by-step worked solution ---------- */
    example: {
      render(host, step, ctx) {
        const card = h('div', { class: 'q-card card' });
        const solList = h('ol', { class: 'solution-steps' });
        const solBtn = h('button', { class: 'btn btn-primary', type: 'button' }, RV.icon('bulb'), RV.i18n.ui('showSolution'));
        const sol = h('div', { class: 'solution card' }, h('h3', null, RV.icon('pen'), t({ ar: 'الحل', en: 'Solution' })), solList, solBtn);
        host.appendChild(h('div', { class: 'example-wrap' },
          h('h2', { class: 'panel-title' }, RV.icon('pen'), RV.rich(step.title || { ar: 'مثال محلول', en: 'Worked example' })),
          h('div', { class: 'example-grid' }, card, sol)));
        const inst = RV.widgets.get(step.q.widget).mount(card, step.q, { mode: 'worked', onAnswer() {} });
        let k = 0;
        solBtn.addEventListener('click', () => {
          if (k < step.solution.length) {
            const li = h('li', null, RV.rich(step.solution[k]));
            solList.appendChild(li);
            gsap.from(li, { y: 14, opacity: 0, duration: 0.45, ease: 'power2.out' });
            RV.sound.play('pop');
            k++;
            solBtn.lastChild.textContent = RV.i18n.ui('nextStep');
          }
          if (k >= step.solution.length) { solBtn.hidden = true; inst.reveal && inst.reveal(); }
        });
        return { beats: 1, beat() {}, ready: () => true, destroy() { if (inst && inst.destroy) inst.destroy(); } };
      },
    },

    /* ---------- summary: "the lesson in lines" + key terms ---------- */
    summary: {
      render(host, step) {
        const items = step.points.map((p) => h('li', null, RV.rich(p)));
        const terms = (step.terms || []).map((x) => h('div', { class: 'sum-term' }, h('b', { class: 'term' }, t(x.term)), h('span', { class: 'chip en-term' }, RV.i18n.alt(x.term)), h('p', null, t(x.def))));
        host.appendChild(h('div', { class: 'summary-wrap' },
          h('h2', { class: 'panel-title' }, RV.icon('sparkle'), RV.rich(step.title || { ar: 'الدرس في سطور', en: 'The lesson in lines' })),
          h('div', { class: 'summary-grid' },
            h('ol', { class: 'summary-points card' }, items),
            terms.length ? h('div', { class: 'summary-terms card' }, h('h3', null, RV.icon('book'), RV.i18n.ui('keyTerms')), terms) : null)));
        return {
          beats: 1,
          beat() { gsap.from([...items, ...terms], { y: 18, opacity: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out' }); },
          ready: () => true,
          destroy() {},
        };
      },
    },
  };

  RV.steps = steps;
  RV.stepHelpers = { noteBox, termChips };
})();

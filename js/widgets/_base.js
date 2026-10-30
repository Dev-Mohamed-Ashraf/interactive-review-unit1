/* =========================================================
 * widgets/_base.js — shared contract for question widgets.
 *
 *   RV.wkit.defineWidget('mcq', {
 *     validate(q) → array of error strings (used by tests)
 *     mount(el, q, ctx) → { reveal() }
 *   });
 *
 * ctx = { mode: 'practice' | 'test' | 'worked', onAnswer(result) }
 * result = { correct: bool, score: number, max: number }
 * practice → instant feedback + retry · test → first answer locks
 * exam     → no verdict at all, the latest choice counts (mcq only)
 * worked   → like practice, and reveal() shows the right answer.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  function defineWidget(name, def) {
    if (typeof def.mount !== 'function') throw new Error(`widget ${name} needs mount()`);
    RV.widgets.add(name, def);
  }

  /** Question header: prompt + optional figure + optional hint line. */
  function header(q, hintKey) {
    return h('div', { class: 'q-head' },
      q.tag ? h('span', { class: 'q-tag' }, t(q.tag)) : null,
      h('p', { class: 'q-prompt' }, RV.rich(q.prompt)),
      q.figure ? h('img', { class: 'q-figure', src: q.figure, alt: '', loading: 'lazy' }) : null,
      hintKey ? h('p', { class: 'q-hint' }, RV.i18n.ui(hintKey)) : null);
  }

  /** Feedback box under a question. kind: ok | bad | partly */
  function feedback(host, kind, explain) {
    let box = host.querySelector(':scope > .q-feedback');
    if (!box) { box = h('div', { class: 'q-feedback', role: 'status' }); host.appendChild(box); }
    RV.dom.clear(box);
    box.dataset.kind = kind;
    const title = kind === 'ok' ? 'correct' : kind === 'partly' ? 'partly' : 'wrong';
    box.appendChild(h('div', { class: 'q-feedback-title' }, RV.icon(kind === 'ok' ? 'check' : kind === 'partly' ? 'target' : 'x'), RV.i18n.ui(title)));
    if (explain) box.appendChild(h('p', { class: 'q-feedback-body' }, RV.rich(explain)));
    gsap.fromTo(box, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
    RV.sound.play(kind === 'ok' ? 'ok' : 'bad');
    return box;
  }

  function clearFeedback(host) {
    const box = host.querySelector(':scope > .q-feedback');
    if (box) box.remove();
  }

  function shake(el) {
    gsap.fromTo(el, { x: 0 }, { x: 8, duration: 0.06, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' });
  }
  function pop(el) {
    gsap.fromTo(el, { scale: 0.94 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', clearProps: 'scale' });
  }

  /** Report once in test mode; every time otherwise. */
  function reporter(ctx) {
    let sent = false;
    return (result) => {
      if (ctx.mode === 'test' && sent) return;
      sent = true;
      if (ctx.onAnswer) ctx.onAnswer(result);
    };
  }

  /** Common validators reused by the widgets' validate(). */
  const v = {
    bi(val, path, errs) {
      if (val == null) { errs.push(`${path}: missing`); return; }
      if (typeof val === 'string') return;
      if (!val.ar || !val.en) errs.push(`${path}: needs both ar & en`);
    },
    arr(val, path, errs, min) {
      if (!Array.isArray(val) || val.length < (min || 1)) errs.push(`${path}: needs array (min ${min || 1})`);
    },
    idx(val, len, path, errs) {
      if (!Number.isInteger(val) || val < 0 || val >= len) errs.push(`${path}: index ${val} out of range 0..${len - 1}`);
    },
  };

  RV.wkit = { defineWidget, header, feedback, clearFeedback, shake, pop, reporter, v };
})();

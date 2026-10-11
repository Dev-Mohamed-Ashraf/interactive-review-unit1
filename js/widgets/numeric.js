/* widgets/numeric.js — type a number (Moore's-law calculations etc).
 * q = { widget:'numeric', prompt, answer:number, tolerance?:0.02 (relative),
 *       unit?: bi, hint?: bi, explain?: bi }
 * Accepts "4,202,545", "4202545", "4.2e6", Arabic-Indic digits. */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;
  const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  function parseNum(str) {
    let s = String(str).trim();
    s = s.replace(/[٠-٩]/g, (d) => AR_DIGITS.indexOf(d)).replace(/٫/g, '.').replace(/[,،\s]/g, '');
    if (!/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }

  W.defineWidget('numeric', {
    parseNum,
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      if (typeof q.answer !== 'number' || !isFinite(q.answer)) e.push('answer must be a finite number');
      if (q.hint) W.v.bi(q.hint, 'hint', e);
      return e;
    },
    mount(el, q, ctx) {
      const report = W.reporter(ctx);
      const tol = q.tolerance == null ? 0.02 : q.tolerance;
      let tries = 0;
      let locked = false;
      const input = h('input', { class: 'num-input mono', inputmode: 'decimal', autocomplete: 'off', placeholder: '0', 'aria-label': 'answer' });
      const unit = q.unit ? h('span', { class: 'num-unit' }, RV.i18n.t(q.unit)) : null;
      const check = h('button', { class: 'btn btn-primary', type: 'button' }, RV.icon('check'), RV.i18n.ui('check'));
      const hintBtn = q.hint ? h('button', { class: 'btn btn-sm btn-ghost', type: 'button' }, RV.icon('bulb'), RV.i18n.t({ ar: 'تلميح', en: 'Hint' })) : null;
      const hintBox = q.hint ? h('p', { class: 'num-hint', hidden: true }, RV.rich(q.hint)) : null;
      RV.dom.add(el, W.header(q), h('div', { class: 'num-row' }, input, unit, check), hintBtn ? h('div', { class: 'q-actions' }, hintBtn) : null, hintBox);

      check.addEventListener('click', submit);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
      if (hintBtn) hintBtn.addEventListener('click', () => { hintBox.hidden = false; hintBtn.hidden = true; gsap.from(hintBox, { y: -8, opacity: 0, duration: 0.3 }); RV.sound.play('pop'); });

      function submit() {
        if (locked) return;
        const v = parseNum(input.value);
        if (isNaN(v)) { W.shake(input); return; }
        tries++;
        const ok = Math.abs(v - q.answer) <= Math.abs(q.answer) * tol + 1e-9;
        input.classList.toggle('is-correct', ok);
        input.classList.toggle('is-wrong', !ok);
        if (ok || ctx.mode === 'test') {
          locked = true; input.readOnly = true; check.disabled = true;
          W.feedback(el, ok ? 'ok' : 'bad', explainText());
          if (ok) W.pop(input); else W.shake(input);
          report({ correct: ok && tries === 1, score: ok && tries === 1 ? 1 : 0, max: 1 });
        } else {
          W.shake(input);
          const dir = v < q.answer ? { ar: 'إجابتك أصغر من المطلوب — راجع عدد مرات التضاعف.', en: 'Too small — re-check the number of doublings.' } : { ar: 'إجابتك أكبر من المطلوب — راجع عدد مرات التضاعف.', en: 'Too large — re-check the number of doublings.' };
          W.feedback(el, 'bad', dir);
          if (hintBox && tries >= 2) { hintBox.hidden = false; if (hintBtn) hintBtn.hidden = true; }
        }
      }
      function explainText() {
        const ans = { ar: `الإجابة: ${fmt(q.answer)}`, en: `Answer: ${fmt(q.answer)}` };
        if (!q.explain) return ans;
        return { ar: `${ans.ar} — ${q.explain.ar}`, en: `${ans.en} — ${q.explain.en}` };
      }
      function fmt(n) { return n.toLocaleString('en-US', { maximumFractionDigits: 2 }); }

      return {
        reveal() {
          input.value = fmt(q.answer);
          locked = true; input.readOnly = true; check.disabled = true;
          input.classList.add('is-correct');
          W.feedback(el, 'ok', explainText());
        },
      };
    },
  });
})();

/* =========================================================
 * core/rich.js — minimal inline markup for content text.
 *   **term**  → highlighted key term
 *   __word__  → emphasised (lilac) keyword
 *   `math`    → LTR-isolated formula chip (safe inside Arabic text)
 *   x^y       → x with superscript y  (2^11.5, N₀ × 2^n)
 * Responsibility: text → safe DOM. No HTML from content is trusted.
 * ========================================================= */
(function () {
  'use strict';
  const TOKEN = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`)/g;
  const POWER = /\^([0-9A-Za-z.]+)/g;

  /** Append text to a node, turning ^exponents into <sup>. */
  function appendMath(parent, text) {
    let last = 0;
    text.replace(POWER, (m, exp, i) => {
      if (i > last) parent.appendChild(document.createTextNode(text.slice(last, i)));
      const sup = document.createElement('sup');
      sup.textContent = exp;
      parent.appendChild(sup);
      last = i + m.length;
      return m;
    });
    if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
    return parent;
  }

  RV.rich = function (value) {
    const text = RV.i18n.t(value);
    const frag = document.createDocumentFragment();
    text.split(TOKEN).forEach((part) => {
      if (!part) return;
      let el;
      if (part.startsWith('**')) { el = document.createElement('strong'); el.className = 'term'; appendMath(el, part.slice(2, -2)); }
      else if (part.startsWith('__')) { el = document.createElement('em'); el.className = 'kw'; appendMath(el, part.slice(2, -2)); }
      else if (part.startsWith('`')) { el = document.createElement('code'); el.className = 'tok'; el.dir = 'ltr'; appendMath(el, part.slice(1, -1)); }
      else { appendMath(frag, part); return; }
      frag.appendChild(el);
    });
    return frag;
  };
  /** Build an element whose text may contain ^exponents (used by math anims). */
  RV.mathEl = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; return appendMath(el, text); };
  RV.plain = (value) => RV.i18n.t(value).replace(/\*\*|__|`/g, '').replace(POWER, '^$1');
})();

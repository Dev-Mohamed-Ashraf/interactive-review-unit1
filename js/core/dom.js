/* =========================================================
 * core/dom.js — tiny DOM/SVG builders.
 * Responsibility: create elements declaratively. No app logic.
 *   h('div', {class:'x', onClick: fn}, 'text', child, [more])
 *   s('circle', {cx:10, cy:10, r:5})   // SVG namespace
 * ========================================================= */
(function () {
  'use strict';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function apply(el, attrs) {
    if (!attrs) return;
    for (const key in attrs) {
      const val = attrs[key];
      if (val == null || val === false) continue;
      if (key === 'class') el.setAttribute('class', Array.isArray(val) ? val.filter(Boolean).join(' ') : val);
      else if (key === 'style' && typeof val === 'object') Object.keys(val).forEach((k) => { if (k.startsWith('--')) el.style.setProperty(k, val[k]); else el.style[k] = val[k]; });
      else if (key === 'html') el.innerHTML = val;
      else if (key === 'dataset') Object.assign(el.dataset, val);
      else if (key.startsWith('on') && typeof val === 'function') el.addEventListener(key.slice(2).toLowerCase(), val);
      else el.setAttribute(key, val === true ? '' : val);
    }
  }

  function append(el, children) {
    for (const c of children) {
      if (c == null || c === false) continue;
      if (Array.isArray(c)) append(el, c);
      else el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
  }

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    apply(el, attrs);
    append(el, children);
    return el;
  }

  function s(tag, attrs, ...children) {
    const el = document.createElementNS(SVG_NS, tag);
    apply(el, attrs);
    append(el, children);
    return el;
  }

  function clear(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  }

  /** Like Element.append but skips null/false and flattens arrays (native append writes "null"). */
  function add(el, ...children) { append(el, children); return el; }

  RV.dom = {
    h, s, clear, add,
    qs: (sel, root) => (root || document).querySelector(sel),
    qsa: (sel, root) => Array.from((root || document).querySelectorAll(sel)),
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    /** Shuffle, retrying (a few dozen times) while `bad(order)` says the order gives the answers away. */
    shuffleUntil(arr, bad) {
      let a = RV.dom.shuffle(arr);
      for (let k = 0; k < 60 && bad(a); k++) a = RV.dom.shuffle(arr);
      return a;
    },
    /** A sequence of answer keys that is too regular to hide anything: all in blocks (TTFF, 001122)
     *  or strictly repeating (TFTF, 012012). Short sequences never count. */
    patterned(keys) {
      if (keys.length < 4) return false;
      const kinds = new Set(keys).size;
      let runs = 1;
      for (let i = 1; i < keys.length; i++) if (keys[i] !== keys[i - 1]) runs++;
      if (kinds > 1 && runs === kinds) return true;
      return kinds > 1 && keys.every((k, i) => i < kinds || k === keys[i - kinds]);
    },
  };
})();

/* =========================================================
 * anims/moore.js — shared number formatting for the Moore's-law
 * calculators (mooreMath, mooreSymbols) and the guess widget.
 * ========================================================= */
(function () {
  'use strict';

  /** 2300 → "2,300" · 4.2e6 → "4.2 مليون" / "4.2 million" */
  function fmtBig(n) {
    const ar = RV.i18n.lang === 'ar';
    if (n < 1e6) return Math.round(n).toLocaleString('en-US');
    if (n < 1e9) return (n / 1e6).toFixed(n < 1e7 ? 2 : 1).replace(/\.0+$/, '') + (ar ? ' مليون' : ' million');
    return (n / 1e9).toFixed(n < 1e10 ? 2 : 1).replace(/\.0+$/, '') + (ar ? ' مليار' : ' billion');
  }
  RV.fmtBig = fmtBig;
})();

/* =========================================================
 * core/perf.js — adapt quality to the device (nothing is removed,
 * only lighter variants are chosen).
 *   RV.perf.lite        → weak device / data-saver / the user chose calm motion
 *   RV.perf.video(src)  → 'media/mx-1.mp4' or the 480p 'media/mx-1-480.mp4'
 * Adds class "lite" on <html> so CSS can drop the costliest effects
 * (backdrop blur, floating particles, blend modes).
 * ========================================================= */
(function () {
  'use strict';
  const nav = navigator;
  const conn = nav.connection || {};
  const calm = !!RV.store.setting('calm'); // the user's own choice (top bar) - not the OS setting
  const slowNet = conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || '');
  const weak = (nav.deviceMemory && nav.deviceMemory <= 2) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2);
  const lite = !!(calm || slowNet || weak || /[?&]lite\b/.test(location.search));
  if (lite) document.documentElement.classList.add('lite');
  if (calm) document.documentElement.classList.add('calm');

  RV.perf = {
    lite,
    /** Pick the video file for this device: 480p on phones, weak devices and slow networks. */
    video(src) {
      // judged on the SCREEN, not the window: turning an iPad must not switch to a file that was not downloaded for offline
      const s = window.screen || { width: innerWidth, height: innerHeight };
      const small = Math.min(s.width, s.height) < 700 || Math.max(s.width, s.height) < 900;
      return (small || lite || slowNet) ? src.replace(/\.mp4$/, '-480.mp4') : src;
    },
  };
})();

/* =========================================================
 * core/voice.js — read text aloud (Web Speech API, built into
 * iOS/Android/Chrome/Edge; no files, works offline on iPad).
 *   RV.voice.available     → bool
 *   RV.voice.say(text)     → speak (cancels the previous line)
 *   RV.voice.stop()
 * ========================================================= */
(function () {
  'use strict';
  const synth = window.speechSynthesis;
  let voices = [];
  function load() { voices = synth ? synth.getVoices() : []; }
  if (synth) { load(); synth.onvoiceschanged = load; }

  function pick(lang) {
    const pref = lang === 'ar' ? ['ar-EG', 'ar-SA', 'ar'] : ['en-GB', 'en-US', 'en'];
    for (const p of pref) {
      const v = voices.find((x) => x.lang && x.lang.replace('_', '-').toLowerCase().startsWith(p.toLowerCase()));
      if (v) return v;
    }
    return null;
  }

  RV.voice = {
    get available() { return !!synth; },
    say(text) {
      if (!synth || !text) return;
      synth.cancel();
      const lang = RV.i18n.lang;
      const clean = text.replace(/[*_`]/g, '').replace(/\^/g, lang === 'ar' ? ' أُس ' : ' to the power ');
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      const v = pick(lang);
      if (v) u.voice = v;
      u.rate = lang === 'ar' ? 0.95 : 1;
      synth.speak(u);
    },
    stop() { if (synth) synth.cancel(); },
  };
})();

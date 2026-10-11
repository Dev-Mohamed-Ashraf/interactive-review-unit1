/* =========================================================
 * core/sound.js — synthesized UI sounds (no audio files).
 * Responsibility: short feedback tones via WebAudio.
 * iOS needs a user gesture before audio: unlock() on first tap.
 * ========================================================= */
(function () {
  'use strict';
  let ctx = null;

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, gain) {
    const a = audio();
    if (!a) return;
    const t0 = a.currentTime + start;
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.15, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(a.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function sweep(from, to, dur, gain) {
    const a = audio();
    if (!a) return;
    const t0 = a.currentTime;
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(gain || 0.06, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(a.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  const SOUNDS = {
    tap:    () => tone(660, 0, 0.06, 'triangle', 0.06),
    pop:    () => tone(880, 0, 0.09, 'sine', 0.08),
    whoosh: () => sweep(300, 1200, 0.25, 0.04),
    ok:     () => { tone(660, 0, 0.12, 'sine', 0.12); tone(990, 0.09, 0.2, 'sine', 0.12); },
    bad:    () => { tone(220, 0, 0.16, 'square', 0.05); tone(180, 0.1, 0.2, 'square', 0.05); },
    win:    () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.1)),
    beep:   () => tone(1200, 0, 0.05, 'square', 0.03),
  };

  RV.sound = {
    play(name) {
      if (!RV.store.setting('sound')) return;
      try { (SOUNDS[name] || SOUNDS.tap)(); } catch (e) { /* audio unavailable */ }
    },
    unlock() { try { audio(); } catch (e) { /* ignore */ } },
    names: () => Object.keys(SOUNDS),
  };
})();

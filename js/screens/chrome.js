/* =========================================================
 * screens/chrome.js — shared screen furniture.
 * Responsibility: top-bar settings buttons (language, sound,
 * theme, teacher mode, fullscreen) and lesson theming.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;

  function settingsButtons(onChange) {
    const lang = h('button', { class: 'icon-btn lang-btn', type: 'button', title: 'Language / اللغة' }, RV.i18n.lang === 'ar' ? 'EN' : 'ع');
    lang.addEventListener('click', () => {
      const next = RV.i18n.lang === 'ar' ? 'en' : 'ar';
      RV.store.setSetting('lang', next);
      RV.i18n.set(next);
    });

    const sound = h('button', { class: 'icon-btn', type: 'button', title: RV.i18n.ui('sound') }, RV.icon(RV.store.setting('sound') ? 'sound' : 'mute'));
    sound.addEventListener('click', () => {
      const on = !RV.store.setting('sound');
      RV.store.setSetting('sound', on);
      sound.replaceChildren(RV.icon(on ? 'sound' : 'mute'));
      if (on) RV.sound.play('pop');
    });

    const theme = h('button', { class: 'icon-btn btn-theme', type: 'button', title: 'Theme' }, RV.icon(RV.store.setting('theme') === 'light' ? 'moon' : 'sun'));
    theme.addEventListener('click', () => {
      const next = RV.store.setting('theme') === 'light' ? 'dark' : 'light';
      RV.store.setSetting('theme', next);
      applyTheme();
      theme.replaceChildren(RV.icon(next === 'light' ? 'moon' : 'sun'));
    });

    const teacher = h('button', { class: 'icon-btn' + (RV.store.setting('teacher') ? ' on' : ''), type: 'button', title: RV.i18n.ui('teacherMode') }, RV.icon('teacher'));
    teacher.addEventListener('click', () => {
      const on = !RV.store.setting('teacher');
      RV.store.setSetting('teacher', on);
      teacher.classList.toggle('on', on);
      RV.fx.toast(RV.i18n.ui('teacherMode') + (on ? ' ✓' : ' ✗'));
      if (onChange) onChange();
    });

    const calm = RV.store.setting('calm');
    const motion = h('button', { class: 'icon-btn' + (calm ? '' : ' on'), type: 'button', title: RV.i18n.t({ ar: 'الحركة: كاملة ✨ / هادية', en: 'Motion: full ✨ / calm' }) }, RV.icon('sparkle'));
    motion.addEventListener('click', () => {
      RV.store.setSetting('calm', !RV.store.setting('calm'));
      RV.fx.toast(RV.i18n.t(RV.store.setting('calm') ? { ar: 'حركة هادية 🌙', en: 'Calm motion 🌙' } : { ar: 'حركة كاملة ✨', en: 'Full motion ✨' }));
      setTimeout(() => location.reload(), 600); // quality level is chosen at start-up (core/perf.js)
    });

    const btns = [lang, sound, theme, teacher, motion];
    const el = document.documentElement;
    if (el.requestFullscreen || el.webkitRequestFullscreen) {
      const fs = h('button', { class: 'icon-btn btn-fs', type: 'button', title: RV.i18n.ui('fullscreen') }, RV.icon('expand'));
      fs.addEventListener('click', () => {
        const doc = document;
        if (doc.fullscreenElement || doc.webkitFullscreenElement) (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
        else (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
      });
      btns.push(fs);
    }
    return h('div', { class: 'settings' }, btns);
  }

  function applyTheme() {
    document.documentElement.dataset.theme = RV.store.setting('theme') === 'light' ? 'light' : 'dark';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = RV.store.setting('theme') === 'light' ? '#f3f6fc' : '#060b1c';
  }

  /** Set the per-lesson accent color on a root element. */
  function lessonTheme(el, lesson) {
    el.style.setProperty('--lesson', lesson ? lesson.color : 'var(--accent)');
    el.style.setProperty('--lesson-soft', lesson ? lesson.color + '24' : 'rgba(56,189,248,.14)');
  }

  function stars(n, max) {
    return h('span', { class: 'stars', 'aria-label': `${n}/${max || 3}` },
      Array.from({ length: max || 3 }, (_, i) => h('span', { class: 'star' + (i < n ? ' on' : '') }, RV.icon('star'))));
  }

  RV.chrome = { settingsButtons, applyTheme, lessonTheme, stars };
})();

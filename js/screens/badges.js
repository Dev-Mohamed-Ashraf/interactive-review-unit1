/* =========================================================
 * screens/badges.js — #/badges : level, XP and the badge shelf.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  RV.screens.add('badges', {
    render(root) {
      RV.chrome.lessonTheme(root, null);
      const g = RV.store.game();
      const L = RV.game.levelFor(g.xp);
      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', null, t({ ar: 'أوسمتي ومستواي', en: 'My badges & level' }))),
        RV.chrome.settingsButtons(() => RV.app.rerender()));

      const levelCard = h('section', { class: 'lvl-card card' },
        h('div', { class: 'lvl-icon' }, L.icon),
        h('div', { class: 'lvl-info' },
          h('small', { class: 'muted' }, t({ ar: 'مستواك الحالي', en: 'Your level' })),
          h('h2', null, t(L.name)),
          h('div', { class: 'lvl-bar' }, h('b', { style: { width: Math.round(L.progress * 100) + '%' } })),
          h('p', { class: 'mono' }, L.next ? `${g.xp} / ${L.next.xp} XP → ${L.next.icon} ${t(L.next.name)}` : `${g.xp} XP — ${t({ ar: 'أعلى مستوى! 👑', en: 'Max level! 👑' })}`)),
        h('div', { class: 'lvl-ladder' }, RV.game.LEVELS.map((x, i) => h('span', { class: i <= L.index ? 'on' : '' }, x.icon))));

      const shelf = h('section', { class: 'badge-shelf' }, Object.entries(RV.game.BADGES).map(([id, b]) => {
        const got = g.badges.includes(id);
        return h('div', { class: 'badge card' + (got ? ' got' : '') },
          h('div', { class: 'badge-icon' }, got ? b.icon : '🔒'),
          h('b', null, t(b.name)),
          h('small', { class: 'muted' }, t(b.desc)));
      }));

      const tips = h('section', { class: 'xp-tips card' },
        h('h3', null, '💡 ', t({ ar: 'إزاي تجمع نقاط؟', en: 'How to earn XP' })),
        h('ul', null,
          h('li', null, t({ ar: 'إجابة صح من أول مرة = 10 XP، والسلسلة 🔥 بتزوّد لحد 20', en: 'Correct first try = 10 XP; streaks 🔥 add up to 20' })),
          h('li', null, t({ ar: 'خلّص محطة = 50 XP · امتحان = لحد 100 XP', en: 'Finish a station = 50 XP · a test = up to 100 XP' })),
          h('li', null, t({ ar: 'تحدّي السرعة ⚡ ولعبة التخمين 🎯 فيهم نقاط إضافية', en: 'Speed rounds ⚡ and the guessing game 🎯 give bonus XP' }))));

      root.append(h('div', { class: 'screen badges-screen' }, top, levelCard, shelf, tips));
      gsap.from('.lvl-card', { y: 30, opacity: 0, duration: 0.5 });
      gsap.from('.badge', { scale: 0.6, opacity: 0, stagger: 0.06, duration: 0.45, ease: 'back.out(2)' });
      gsap.from('.lvl-bar b', { width: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    },
  });
})();

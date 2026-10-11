/* =========================================================
 * screens/certificate.js — #/certificate : a printable certificate
 * with the student's name, stars per lesson, XP, level and badges.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  RV.screens.add('certificate', {
    render(root) {
      RV.chrome.lessonTheme(root, null);
      const g = RV.store.game();
      const L = RV.game.levelFor(g.xp);
      const nameIn = h('input', { class: 'cert-name-in', placeholder: t({ ar: 'اكتب اسمك هنا', en: 'Type your name' }), value: g.name || '', maxlength: 40 });
      const nameOut = h('div', { class: 'cert-name' }, g.name || '…');
      nameIn.addEventListener('input', () => { g.name = nameIn.value.trim(); RV.store.saveGame(); nameOut.textContent = g.name || '…'; });

      const rows = RV.availableLessons().map((id) => {
        const lesson = RV.lessons.get(id);
        const test = RV.store.station(id, 'test');
        return h('div', { class: 'cert-row' }, h('span', { class: 'mono' }, id), h('span', null, t(lesson.title)),
          RV.chrome.stars(test ? test.stars || 0 : 0), h('span', { class: 'mono' }, test ? `${test.best}/${test.max}` : '—'));
      });
      const challenges = RV.chapters.map((c) => ({ c, r: RV.store.station(c.challengeId, 'challenge') })).filter((x) => x.r);
      const date = new Date().toLocaleDateString(RV.i18n.lang === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

      const cert = h('section', { class: 'cert' },
        h('div', { class: 'cert-border' }),
        h('div', { class: 'cert-seal' }, '🎓'),
        h('small', { class: 'cert-kicker' }, t({ ar: 'شهادة إتمام', en: 'Certificate of completion' })),
        h('h1', null, t((RV.course || RV.unit).title)),
        h('p', { class: 'muted' }, RV.i18n.ui('subject'), ' · ', RV.i18n.ui('grade')),
        h('p', null, t({ ar: 'تشهد المراجعة التفاعلية بأن الطالب/ة', en: 'This certifies that' })),
        nameOut,
        h('p', null, t({ ar: 'أتمّ المراجعة التفاعلية بنجاح', en: 'has completed the interactive review' })),
        h('div', { class: 'cert-rows' }, rows),
        h('div', { class: 'cert-stats' },
          h('span', null, L.icon, ' ', t(L.name)), h('span', { class: 'mono' }, `${g.xp} XP`),
          challenges.map(({ c, r }) => h('span', null, '🏆 ', t(c.challengeTitle), ' ', h('b', { class: 'mono' }, `${r.best}/${r.max}`)))),
        h('div', { class: 'cert-badges' }, g.badges.map((id) => h('span', { title: t(RV.game.BADGES[id].name) }, RV.game.BADGES[id].icon))),
        h('div', { class: 'cert-foot' }, h('span', null, date), h('span', null, RV.i18n.ui('madeBy'))));

      const top = h('div', { class: 'topbar no-print' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', null, '🎓 ', t({ ar: 'شهادتك', en: 'Your certificate' }))),
        RV.chrome.settingsButtons(() => RV.app.rerender()));
      const tools = h('div', { class: 'cert-tools no-print' }, nameIn,
        h('button', { class: 'btn btn-primary', type: 'button', onClick: () => window.print() }, '🖨️ ', t({ ar: 'اطبع / احفظ PDF', en: 'Print / save PDF' })));
      root.append(h('div', { class: 'screen cert-screen' }, top, tools, cert));
      gsap.from(cert, { y: 40, opacity: 0, scale: 0.95, duration: 0.7, ease: 'back.out(1.4)' });
      gsap.from('.cert-seal', { rotate: -200, scale: 0, duration: 1, delay: 0.3, ease: 'back.out(2)' });
      setTimeout(() => RV.fx.confetti(), 500);
    },
  });
})();

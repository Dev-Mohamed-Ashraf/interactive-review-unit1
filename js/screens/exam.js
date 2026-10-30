/* =========================================================
 * screens/exam.js — the full-course practice exam: pick a length, read the
 * rules, start. The exam itself runs in the player (RV.study.examLesson).
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  RV.screens.add('exam', {
    render(root) {
      RV.chrome.lessonTheme(root, null);
      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', { class: 'chip' }, '📝'), h('span', null, t({ ar: 'الامتحان الشامل', en: 'Full practice exam' }))),
        RV.game.pill(),
        RV.chrome.settingsButtons(() => RV.app.rerender()));
      const lessons = RV.availableLessons().length;
      const cards = RV.study.EXAMS.map((x) => {
        const n = lessons * x.perLesson, best = RV.store.station('exam', x.id);
        return h('a', { class: 'exam-card card', href: `#/exam/run/${x.perLesson}` },
          h('b', null, t(x.title)),
          h('span', { class: 'mono exam-size' }, t({ ar: `${n} سؤال · ${x.minutes} دقيقة`, en: `${n} questions · ${x.minutes} min` })),
          h('small', { class: 'muted' }, t(x.perLesson === 1 ? { ar: 'سؤال من كل درس', en: 'One question per lesson' } : { ar: 'سؤالين من كل درس', en: 'Two questions per lesson' })),
          best ? h('small', { class: 'exam-best mono' }, t({ ar: `أحسن نتيجة: ${best.best} / ${best.max}`, en: `Best: ${best.best} / ${best.max}` })) : null);
      });
      const rules = [
        { ar: 'اختيار من متعدد من كل دروس المنهج، وفي كل مرة أسئلة مختلفة.', en: 'Multiple choice from every lesson, different questions each time.' },
        { ar: 'مش هتعرف إجابتك صح ولا غلط غير في الآخر، وتقدر تغيّر اختيارك قبل ما تعدّي السؤال.', en: 'You learn what was right only at the end; you can change your choice before moving on.' },
        { ar: 'مفيش رجوع لسؤال عدّيته، ولو الوقت خلص الامتحان بيتسلّم لوحده.', en: 'You cannot return to a passed question; time up hands the exam in.' },
        { ar: 'الأسئلة الغلط بتروح كشكول الأخطاء، وهتشوف نتيجتك في كل درس.', en: 'Missed questions go to your notebook, and you see your result per lesson.' },
      ];
      root.append(h('div', { class: 'screen study' }, top,
        h('p', { class: 'exam-lead muted' }, t({ ar: 'امتحان تجريبي للتدريب، وعدد أسئلته ووقته مش بالضرورة زي الامتحان الرسمي.', en: 'A practice exam: its length and time are not necessarily those of the official exam.' })),
        h('section', { class: 'exam-cards' }, cards),
        h('ol', { class: 'exam-rules card' }, rules.map((r) => h('li', null, t(r))))));
    },
  });
})();

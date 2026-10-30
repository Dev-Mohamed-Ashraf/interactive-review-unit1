/* =========================================================
 * screens/study.js — "My study": the mistakes notebook and how strong the
 * student is in each lesson. All the figures come from RV.study.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const pct = (x) => `${Math.round(x * 100)}%`;
  const LEVEL = {
    new: { ar: 'لسه بدري', en: 'Too early' },
    weak: { ar: 'محتاج مذاكرة', en: 'Needs work' },
    mid: { ar: 'قرّبت', en: 'Getting there' },
    strong: { ar: 'ممتاز', en: 'Strong' },
  };

  RV.screens.add('study', {
    render(root) {
      RV.chrome.lessonTheme(root, null);
      const S = RV.study.summary();
      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', { class: 'chip' }, '📒'), h('span', null, t({ ar: 'مذاكرتي', en: 'My study' }))),
        RV.game.pill(),
        RV.chrome.settingsButtons(() => RV.app.rerender()));
      const stats = h('section', { class: 'study-stats' },
        tile(pct(S.mastery), { ar: 'نسبة إتقانك', en: 'Your mastery' }),
        tile(`${S.answered} / ${S.total}`, { ar: 'سؤال حلّيته', en: 'Questions answered' }),
        tile(String(S.mistakes), { ar: 'في الكشكول', en: 'In the notebook' }));
      const chapters = RV.chapters.filter((c) => RV.chapterLessons(c).length).map((c) => h('section', { class: 'study-chapter' },
        h('h2', null, `${RV.i18n.ui('unit')} ${c.number} · ${t(c.title)}`),
        RV.chapterLessons(c).map((id) => lessonRow(RV.study.lessonStats(id)))));
      root.append(h('div', { class: 'screen study' }, top, stats, notebookCard(S), weakCard(), chapters,
        h('p', { class: 'study-note muted' }, t({
          ar: 'الإتقان = آخر إجابة ليك في كل سؤال حلّيته. السؤال بيخرج من الكشكول لما تجاوبه صح مرتين ورا بعض.',
          en: 'Mastery = your latest answer to each question you tried. A question leaves the notebook after two correct answers in a row.',
        }))));
    },
  });

  function tile(value, label) {
    return h('div', { class: 'study-tile card' }, h('b', { class: 'mono' }, value), h('span', { class: 'muted' }, t(label)));
  }

  function notebookCard(S) {
    if (!S.answered) {
      return h('div', { class: 'study-cta card' }, h('span', { class: 'extra-ico' }, '📒'),
        h('div', null, h('h3', null, t({ ar: 'الكشكول لسه فاضي', en: 'The notebook is empty' })),
          h('p', { class: 'muted' }, t({ ar: 'أي سؤال تغلط فيه في الدروس أو التحديات هيتحفظ هنا لوحده.', en: 'Any question you miss in lessons or challenges lands here by itself.' }))),
        h('a', { class: 'btn btn-primary', href: '#/' }, t({ ar: 'ابدأ درس', en: 'Start a lesson' })));
    }
    if (!S.mistakes) {
      return h('div', { class: 'study-cta card' }, h('span', { class: 'extra-ico' }, '🎉'),
        h('div', null, h('h3', null, t({ ar: 'الكشكول فاضي… برافو!', en: 'Notebook clear… well done!' })),
          h('p', { class: 'muted' }, t({ ar: 'مفيش أسئلة مستنياك دلوقتي. كمّل الدروس اللي لسه ماحلّتش أسئلتها.', en: 'Nothing is waiting for you. Carry on with the lessons you have not tried yet.' }))));
    }
    const n = Math.min(S.mistakes, RV.study.SESSION);
    return h('div', { class: 'study-cta card is-hot' }, h('span', { class: 'extra-ico' }, '📒'),
      h('div', null, h('h3', null, t({ ar: `عندك ${S.mistakes} سؤال في الكشكول`, en: `${S.mistakes} questions in your notebook` })),
        h('p', { class: 'muted' }, t({ ar: 'حل الأسئلة اللي غلطت فيها تاني، وبعد كل سؤال هتشوف شرح الإجابة.', en: 'Retry the ones you missed, with the explanation after each answer.' }))),
      h('a', { class: 'btn btn-primary', href: '#/study/review' }, RV.icon('refresh'), t({ ar: `راجع ${n} سؤال`, en: `Review ${n} questions` })));
  }

  function weakCard() {
    const weak = RV.study.weakest(3);
    if (!weak.length) return null;
    return h('section', { class: 'study-weak' },
      h('h2', null, t({ ar: 'ابدأ بالدروس دي', en: 'Start with these lessons' })),
      h('div', { class: 'study-weak-grid' }, weak.map((s) => {
        const lesson = RV.lessons.get(s.id);
        return h('a', { class: 'study-weak-item card', href: s.mistakes ? `#/study/review/${s.id}` : `#/l/${s.id}`, style: { '--lesson': lesson.color } },
          h('span', { class: 'chip mono' }, s.id), h('b', null, t(lesson.title)), h('span', { class: `study-level is-${s.level}` }, pct(s.mastery)));
      })));
  }

  function lessonRow(s) {
    const lesson = RV.lessons.get(s.id);
    const head = [
      h('span', { class: 'chip mono' }, s.id),
      h('span', { class: 'study-name' }, t(lesson.title)),
      h('span', { class: 'study-bar' }, h('i', { class: `is-${s.level}`, style: { width: pct(s.answered ? s.mastery : 0) } })),
      h('span', { class: 'study-count mono muted' }, `${s.answered}/${s.total}`),
      h('span', { class: `study-level is-${s.level}` }, s.level === 'new' ? t(LEVEL.new) : `${pct(s.mastery)} · ${t(LEVEL[s.level])}`),
    ];
    if (!s.mistakes) return h('a', { class: 'study-row', href: `#/l/${s.id}` }, head);
    const list = RV.study.mistakes(s.id);
    return h('details', { class: 'study-row-wrap' },
      h('summary', { class: 'study-row' }, head, h('span', { class: 'study-mistakes' }, `📒 ${s.mistakes}`)),
      h('div', { class: 'study-detail' },
        h('ol', { class: 'study-qs' }, list.map((m) => h('li', null,
          h('span', { class: 'study-q' }, RV.rich(RV.study.label(m.step))),
          h('small', { class: 'muted' }, t({ ar: `غلطت فيه ${m.answer.w} مرة · صح ورا بعض: ${m.answer.r} من ${RV.study.OUT_AFTER}`, en: `missed ${m.answer.w} times · right in a row: ${m.answer.r} of ${RV.study.OUT_AFTER}` }))))),
        h('div', { class: 'study-actions' },
          h('a', { class: 'btn btn-primary btn-sm', href: `#/study/review/${s.id}` }, RV.icon('refresh'), t({ ar: 'راجع أخطاء الدرس', en: 'Review this lesson’s mistakes' })),
          h('a', { class: 'btn btn-sm', href: `#/l/${s.id}` }, t({ ar: 'افتح الدرس', en: 'Open the lesson' })))));
  }
})();

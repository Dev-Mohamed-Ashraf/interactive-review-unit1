/* =========================================================
 * screens/print.js — printable summaries: choose a lesson or a chapter,
 * see the A4 pages, print them or save them as PDF.
 *   #/print · #/print/<lessonId> · #/print/unit/<n> · #/print/all
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const PAGE_WIDTH = 794;

  const topbar = (title, href) => h('div', { class: 'topbar no-print' },
    h('a', { class: 'icon-btn', href, title: RV.i18n.ui('back') }, RV.icon(href === '#/' ? 'home' : 'close')),
    h('div', { class: 'topbar-title' }, h('span', { class: 'chip' }, '🖨️'), h('span', null, title)),
    RV.chrome.settingsButtons(() => RV.app.rerender()));

  RV.screens.add('print', {
    render(root, params) {
      RV.chrome.lessonTheme(root, null);
      const job = params.what ? jobFor(params.what, params.n) : null;
      return job ? showPages(root, job) : showPicker(root);
    },
  });

  function jobFor(what, n) {
    if (what === 'all') {
      const units = RV.chapters.filter((c) => RV.chapterLessons(c).length);
      return { ids: RV.availableLessons(), title: t({ ar: 'ملخص المنهج كله', en: 'The whole course' }),
        cover: { heading: t((RV.course || RV.unit).title), rows: units.map((c) => {
          const first = RV.lessons.get(RV.chapterLessons(c)[0]);
          return { id: `${RV.i18n.ui('unit')} ${c.number}`, title: t(c.title), cover: first.cover, color: first.color };
        }) } };
    }
    if (what === 'unit') {
      const c = RV.chapters.find((x) => x.number === n) || RV.chapters[0];
      return { ids: RV.chapterLessons(c), title: `${RV.i18n.ui('unit')} ${c.number}`,
        cover: { heading: t(c.title), sub: `${RV.i18n.ui('unit')} ${c.number}`, rows: RV.chapterLessons(c).map((id) => {
          const l = RV.lessons.get(id);
          return { id, title: t(l.title), cover: l.cover, color: l.color };
        }) } };
    }
    return { ids: [what], title: t(RV.lessons.get(what).title) };
  }

  function showPicker(root) {
    const chapters = RV.chapters.filter((c) => RV.chapterLessons(c).length).map((c) => h('section', { class: 'print-unit' },
      h('h2', null, `${RV.i18n.ui('unit')} ${c.number} · ${t(c.title)}`),
      h('div', { class: 'print-grid' },
        RV.chapterLessons(c).map((id) => {
          const l = RV.lessons.get(id);
          return h('a', { class: 'print-card card', href: `#/print/${id}` }, h('img', { src: l.cover, alt: '', loading: 'lazy' }),
            h('div', null, h('span', { class: 'chip mono' }, id), h('b', null, t(l.title))));
        })),
      h('div', { class: 'study-actions', style: { marginTop: '10px' } }, h('a', { class: 'btn btn-sm', href: `#/print/unit/${c.number}` }, '📚 ', t({ ar: 'ملخصات الفصل كله', en: 'The whole chapter' })))));
    root.append(h('div', { class: 'screen study print-screen' }, topbar(t({ ar: 'الملخصات للطباعة', en: 'Printable summaries' }), '#/'),
      h('p', { class: 'exam-lead muted' }, t({ ar: 'كل درس في ورقة مرسومة: خرائط بمربعات وأسهم، ورسومات، وفخاخ الامتحان، ومصطلحات الدرس.', en: 'Each lesson on a designed sheet: maps with boxes and arrows, drawings, exam traps and the lesson terms.' })),
      h('div', { class: 'study-actions' }, h('a', { class: 'btn btn-primary', href: '#/print/all' }, '📘 ', t({ ar: 'المنهج كله في ملف واحد', en: 'The whole course in one file' }))),
      chapters));
  }

  function showPages(root, job) {
    const paper = h('div', { class: 'sh-paper' }), wrap = h('div', { class: 'sh-wrap' }, paper);
    const printBtn = h('button', { class: 'btn btn-primary', type: 'button', disabled: true }, '🖨️ ', t({ ar: 'اطبع أو احفظ PDF', en: 'Print or save as PDF' }));
    printBtn.addEventListener('click', () => window.print());
    root.append(h('div', { class: 'screen print-screen' }, topbar(job.title, '#/print'),
      h('div', { class: 'print-tools no-print' }, printBtn, h('span', { class: 'muted' }, t({
        ar: 'اختار A4 من غير هوامش، وفعّل «رسومات الخلفية». لو الزرار مش بيفتح الطباعة على الآيباد، افتح الموقع في Safari واطبع من زرار المشاركة.',
        en: 'Choose A4 with no margins and enable “background graphics”. If the button does nothing on iPad, open the site in Safari and print from Share.',
      }))),
      wrap));
    const fit = () => { paper.style.zoom = String(Math.min(1, wrap.clientWidth / PAGE_WIDTH)); };
    RV.sheet.render(paper, job.ids, job.cover).then(() => { fit(); printBtn.disabled = false; paper.dataset.ready = '1'; });
    addEventListener('resize', fit);
    return { destroy() { removeEventListener('resize', fit); } };
  }
})();

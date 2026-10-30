/* =========================================================
 * screens/glossary.js — the course dictionary: every term with its meaning,
 * its lesson, and a small map of the terms it connects to.
 *   #/glossary · #/glossary/<term key>
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const colorOf = (x) => RV.lessons.get(x.lessons[0]).color;

  RV.screens.add('glossary', {
    render(root, params) {
      RV.chrome.lessonTheme(root, null);
      const all = RV.lexicon.terms();
      let unit = 0, word = '';
      const list = h('div', { class: 'gl-list' });
      const count = h('span', { class: 'muted gl-count' });
      const input = h('input', { class: 'gl-input', type: 'search', placeholder: t({ ar: 'دوّر على مصطلح…', en: 'Find a term…' }), 'aria-label': t({ ar: 'دوّر على مصطلح', en: 'Find a term' }) });
      input.addEventListener('input', () => { word = RV.lexicon.norm(input.value); draw(); });

      const chips = h('div', { class: 'gl-units' });
      const setUnit = (n) => { unit = n; draw(); };
      const draw = () => {
        RV.dom.clear(chips);
        [{ number: 0 }, ...RV.chapters.filter((c) => RV.chapterLessons(c).length)].forEach((c) => {
          chips.appendChild(h('button', { class: 'chip gl-unit' + (unit === c.number ? ' is-on' : ''), type: 'button', onClick: () => setUnit(c.number) }, c.number ? `${RV.i18n.ui('unit')} ${c.number}` : t({ ar: 'الكل', en: 'All' })));
        });
        const show = all.filter((x) => (!unit || x.lessons.some((id) => RV.chapterOf(id).number === unit))
          && (!word || x.names.some((n) => n.includes(word)) || x.text.includes(word)));
        count.textContent = t({ ar: `${show.length} مصطلح`, en: `${show.length} terms` });
        RV.dom.clear(list);
        RV.chapters.filter((c) => RV.chapterLessons(c).length).forEach((c) => {
          const mine = show.filter((x) => RV.chapterOf(x.lessons[0]).number === c.number);
          if (!mine.length) return;
          list.appendChild(h('section', { class: 'gl-group' }, h('h2', null, `${RV.i18n.ui('unit')} ${c.number} · ${t(c.title)}`),
            h('div', { class: 'gl-grid' }, mine.map(card))));
        });
        if (!show.length) list.appendChild(h('p', { class: 'muted gl-empty' }, t({ ar: 'مفيش مصطلح بالاسم ده. جرّب البحث في المنهج كله.', en: 'No such term. Try searching the whole course.' }), ' ', h('a', { href: `#/search/${encodeURIComponent(input.value)}` }, t({ ar: 'ابحث', en: 'Search' }))));
      };

      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', { class: 'chip' }, '📖'), h('span', null, t({ ar: 'قاموس المصطلحات', en: 'Glossary' }))),
        h('a', { class: 'icon-btn', href: '#/search', title: t({ ar: 'بحث', en: 'Search' }) }, RV.icon('search')),
        RV.chrome.settingsButtons(() => RV.app.rerender()));
      root.append(h('div', { class: 'screen study glossary' }, top,
        h('div', { class: 'gl-tools' }, input, count), chips, list));
      draw();
      if (params.key && RV.lexicon.term(params.key)) showTerm(root, RV.lexicon.term(params.key));
    },
  });

  const card = (x) => h('a', { class: 'gl-card card', href: `#/glossary/${x.key}`, style: { '--lesson': colorOf(x) } },
    h('div', { class: 'gl-card-top' }, h('b', null, t(x.front)), h('span', { class: 'chip mono' }, x.lessons[0])),
    h('small', { class: 'muted gl-alt', dir: 'auto' }, RV.i18n.alt(x.front)),
    h('p', null, RV.rich(x.back)));

  /** One term: its meaning and the terms it leads to, as boxes joined by arrows. */
  function showTerm(root, x) {
    const close = () => { location.hash = '#/glossary'; };
    const others = x.related.map(RV.lexicon.term);
    const panel = h('div', { class: 'gl-panel card', role: 'dialog', 'aria-modal': 'true', style: { '--lesson': colorOf(x) } },
      h('button', { class: 'icon-btn gl-close', type: 'button', title: RV.i18n.ui('back'), onClick: close }, RV.icon('close')),
      h('div', { class: 'gl-head' }, h('h2', null, t(x.front)), h('p', { class: 'muted', dir: 'auto' }, RV.i18n.alt(x.front))),
      h('p', { class: 'gl-def' }, RV.rich(x.back)),
      h('div', { class: 'gl-from' }, t({ ar: 'في الدروس:', en: 'In lessons:' }), x.lessons.map((id) => h('a', { class: 'chip mono', href: `#/l/${id}` }, id)),
        h('a', { class: 'btn btn-sm', href: `#/print/${x.lessons[0]}` }, '🖨️ ', t({ ar: 'ملخص الدرس', en: 'Lesson summary' }))),
      others.length ? h('div', { class: 'gl-map' },
        h('h3', null, t({ ar: 'مرتبط بـ', en: 'Connected to' })),
        h('div', { class: 'gl-root' }, t(x.front)),
        h('div', { class: 'gl-links' }, others.map((o) => h('a', { class: 'gl-link', href: `#/glossary/${o.key}`, style: { '--lesson': colorOf(o) } },
          h('b', null, t(o.front)), h('small', { class: 'muted', dir: 'auto' }, RV.i18n.alt(o.front)))))) : null);
    const veil = h('div', { class: 'gl-veil' }, panel);
    veil.addEventListener('click', (e) => { if (e.target === veil) close(); });
    root.querySelector('.glossary').appendChild(veil);
  }
})();

/* =========================================================
 * screens/search.js — search the whole course: terms, lessons, explanations
 * and questions. Results open at the exact step they came from.
 *   #/search · #/search/<query>
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const SHOWN = 6;
  const KINDS = [
    ['term', '📖', { ar: 'مصطلحات', en: 'Terms' }],
    ['lesson', '🎓', { ar: 'دروس', en: 'Lessons' }],
    ['text', '📝', { ar: 'في الشرح والملخصات', en: 'In explanations and summaries' }],
    ['question', '❓', { ar: 'في الأسئلة', en: 'In questions' }],
  ];
  const IDEAS = ['RMSE', 'HTTPS', { ar: 'الهلوسة', en: 'hallucination' }, 'PDCA', { ar: 'العينة', en: 'sample' }, { ar: 'جدار الحماية', en: 'firewall' }, 'API', { ar: 'الانحدار', en: 'regression' }];

  /** A short piece of the text around the first hit, with every hit marked. */
  function snippet(text, query) {
    const plain = RV.lexicon.clean(text), re = RV.lexicon.marks(query);
    const at = re ? plain.search(re) : -1;
    const from = Math.max(0, at - 60), part = (from ? '…' : '') + plain.slice(from, from + 170) + (plain.length > from + 170 ? '…' : '');
    if (!re) return part;
    const out = h('span');
    part.split(re).forEach((piece, k) => { if (piece) out.append(k % 2 ? h('mark', null, piece) : piece); });
    return out;
  }

  const result = (d, query) => h('a', { class: 'se-hit card', href: d.href },
    h('div', { class: 'se-hit-top' }, h('b', null, snippet(t(d.title), query)), d.lesson ? h('span', { class: 'chip mono' }, d.lesson) : null),
    d.body ? h('p', { class: 'muted' }, snippet(t(d.body), query)) : null);

  function section(kind, ic, title, docs, query) {
    if (!docs.length) return null;
    const list = h('div', { class: 'se-list' }, docs.slice(0, SHOWN).map((d) => result(d, query)));
    const more = docs.length > SHOWN ? h('button', { class: 'btn btn-sm', type: 'button' }, t({ ar: `اعرض الباقي (${docs.length - SHOWN})`, en: `Show the rest (${docs.length - SHOWN})` })) : null;
    if (more) more.addEventListener('click', () => { docs.slice(SHOWN).forEach((d) => list.appendChild(result(d, query))); more.remove(); });
    return h('section', { class: 'se-group' }, h('h2', null, `${ic} ${t(title)} `, h('span', { class: 'muted' }, `(${docs.length})`)), list, more);
  }

  RV.screens.add('search', {
    render(root, params) {
      RV.chrome.lessonTheme(root, null);
      const input = h('input', { class: 'gl-input se-input', type: 'search', value: params.query || '', placeholder: t({ ar: 'اكتب أي كلمة من المنهج…', en: 'Type any word from the course…' }), 'aria-label': t({ ar: 'بحث في المنهج', en: 'Search the course' }) });
      const out = h('div', { class: 'se-out' });
      const draw = () => {
        const q = input.value;
        RV.dom.clear(out);
        if (!RV.lexicon.norm(q)) {
          out.append(h('p', { class: 'muted' }, t({ ar: 'جرّب:', en: 'Try:' })),
            h('div', { class: 'gl-units' }, IDEAS.map((i) => { const w = t(i); return h('button', { class: 'chip gl-unit', type: 'button', onClick: () => { input.value = w; draw(); } }, w); })));
          return;
        }
        const groups = RV.lexicon.search(q);
        const parts = KINDS.map(([k, ic, title]) => section(k, ic, title, groups[k], q)).filter(Boolean);
        if (parts.length) out.append(...parts);
        else out.append(h('p', { class: 'muted gl-empty' }, t({ ar: 'مفيش نتايج. جرّب كلمة أقصر أو بالإنجليزي.', en: 'No results. Try a shorter word, or the other language.' })));
      };
      let wait = 0;
      input.addEventListener('input', () => { clearTimeout(wait); wait = setTimeout(draw, 180); });
      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', { class: 'chip' }, '🔎'), h('span', null, t({ ar: 'بحث في المنهج', en: 'Search the course' }))),
        RV.chrome.settingsButtons(() => RV.app.rerender()));
      root.append(h('div', { class: 'screen study' }, top, h('div', { class: 'gl-tools' }, input), out));
      draw();
      setTimeout(() => input.focus(), 60);
      return { destroy() { clearTimeout(wait); } };
    },
  });
})();

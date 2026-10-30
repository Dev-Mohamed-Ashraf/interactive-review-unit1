/* =========================================================
 * screens/sheet.js — draws a printable A4 lesson summary from a sheet
 * definition (js/content/sheets-*.js). A sheet is rows of blocks; every
 * block type is a small diagram, so related ideas are joined by real arrows:
 *   flow · cycle · tree · nest · link · layers · cards · compare · formula ·
 *   draw · traps · note
 * RV.sheet.render(paper, lessonIds, cover) lays the rows out on real A4
 * pages (a row never splits), so the screen shows what the printer gets.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);
  const rich = (v) => (v == null ? null : RV.rich(v));

  const svgEl = (markup, cls, viewBox) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (cls) el.setAttribute('class', cls);
    if (viewBox) el.setAttribute('viewBox', viewBox);
    el.innerHTML = markup;
    return el;
  };
  /* arrows are drawn pointing to the end of the line and flip with the page direction */
  const arrow = (cls) => svgEl('<path d="M2 12H38" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M29 3l11 9-11 9" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>', 'sh-ar ' + (cls || ''), '0 0 42 24');
  const arrowDown = () => svgEl('<path d="M12 2V30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M3 21l9 11 9-11" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>', 'sh-ar-d', '0 0 24 34');

  const box = (b) => h('div', { class: `sh-box c-${b.c || 'l'}${b.solid ? ' is-solid' : ''}` },
    b.ic ? h('span', { class: 'ic' }, b.ic) : null,
    b.h ? h('b', null, rich(b.h)) : null,
    b.p ? h('span', { class: 'p' }, rich(b.p)) : null,
    b.list ? h('ul', null, b.list.map((x) => h('li', null, rich(x)))) : null);

  const BLOCK = {
    flow(b) {
      const row = [];
      b.items.forEach((it, k) => { if (k) row.push(arrow()); row.push(box(it)); });
      return [h('div', { class: 'sh-flow' }, row), b.back ? h('div', { class: 'sh-back' }, h('span', null, rich(b.back))) : null];
    },
    vflow(b) {
      const col = [];
      b.items.forEach((it, k) => { if (k) col.push(arrowDown()); col.push(box(it)); });
      return h('div', { class: 'sh-vflow' }, col);
    },
    cycle(b) {
      const n = b.items.length, size = 320, r = 104, c = size / 2;
      const pt = (deg, rad) => [c + rad * Math.cos(deg * Math.PI / 180), c + rad * Math.sin(deg * Math.PI / 180)];
      const arcs = b.items.map((_, k) => {
        const a = -90 + (k * 360) / n, gap = n > 4 ? 25 : 30;
        const [x1, y1] = pt(a + gap, r), [x2, y2] = pt(a + 360 / n - gap, r);
        return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" marker-end="url(#sh-head)"/>`;
      }).join('');
      const nodes = b.items.map((it, k) => {
        const [x, y] = pt(-90 + (k * 360) / n, r);
        return h('div', { class: 'sh-cnode', style: { left: `${(x / size) * 100}%`, top: `${(y / size) * 100}%` } }, box(it));
      });
      return h('div', { class: 'sh-cycle' },
        svgEl(`<defs><marker id="sh-head" markerWidth="4" markerHeight="4" refX="2.4" refY="2" orient="auto"><path d="M0 0L4 2L0 4z" fill="currentColor"/></marker></defs>${arcs}`, 'sh-cring', `0 0 ${size} ${size}`),
        nodes, b.center ? h('div', { class: 'sh-ccenter' }, rich(b.center)) : null);
    },
    tree(b) {
      return h('div', { class: 'sh-tree' }, box(Object.assign({ solid: true }, b.root)),
        h('div', { class: 'sh-kids' }, b.kids.map((k) => h('div', { class: 'sh-kid' }, box(k)))));
    },
    nest(b) {
      const make = (k) => (k >= b.items.length ? null : h('div', { class: `sh-ring c-${b.items[k].c || 'l'}` },
        h('div', { class: 'sh-ring-t' }, rich(b.items[k].h), b.items[k].p ? h('small', null, rich(b.items[k].p)) : null), make(k + 1)));
      return h('div', { class: 'sh-nest' }, make(0));
    },
    link(b) {
      const row = [];
      b.nodes.forEach((n, k) => {
        if (k) {
          const e = b.edges[k - 1] || {};
          row.push(e.sign ? h('div', { class: 'sh-sign' }, e.sign) : h('div', { class: 'sh-edge' },
            e.to ? h('small', null, rich(e.to)) : null, arrow(),
            e.back ? arrow('is-back') : null, e.back ? h('small', null, rich(e.back)) : null));
        }
        row.push(box(n));
      });
      return h('div', { class: 'sh-link' }, row);
    },
    layers(b) {
      const col = [];
      b.items.forEach((it, k) => {
        if (k) col.push(arrowDown());
        col.push(h('div', { class: `sh-layer c-${it.c || 'l'}` }, it.ic ? h('span', { class: 'ic' }, it.ic) : null, h('b', null, rich(it.h)), it.p ? h('span', { class: 'p' }, rich(it.p)) : null));
      });
      return h('div', { class: 'sh-layers' }, col);
    },
    cards(b) {
      return h('div', { class: 'sh-cards', style: { gridTemplateColumns: `repeat(${b.cols || Math.min(b.items.length, 4)}, minmax(0, 1fr))` } }, b.items.map(box));
    },
    compare(b) {
      return h('table', { class: 'sh-cmp' },
        h('thead', null, h('tr', null, h('th', null, ''), b.cols.map((c) => h('th', { class: `c-${c.c || 'l'}` }, c.ic ? `${c.ic} ` : '', rich(c.h))))),
        h('tbody', null, b.rows.map((row) => h('tr', null, h('th', null, rich(row.k)), row.v.map((v) => h('td', null, rich(v)))))));
    },
    formula(b) {
      return h('div', { class: 'sh-formula' },
        h('div', { class: 'f', dir: 'ltr' }, rich(b.f)),
        b.p ? h('p', null, rich(b.p)) : null,
        b.ex ? h('p', { class: 'ex' }, rich(b.ex)) : null);
    },
    draw(b) {
      const art = RV.sheet.art[b.art];
      if (!art) throw new Error('Unknown sheet art: ' + b.art);
      return h('figure', { class: 'sh-draw' }, art(b), b.cap ? h('figcaption', null, rich(b.cap)) : null);
    },
    traps(b) {
      return h('div', { class: 'sh-traps' }, b.items.map((it) => h('div', { class: 'sh-trap' },
        h('span', { class: 'bad' }, '✗ ', rich(it.bad)), arrow(), h('span', { class: 'good' }, '✓ ', rich(it.good)))));
    },
    note(b) {
      return h('div', { class: `sh-note c-${b.c || 'l'}` }, h('span', { class: 'ic' }, b.ic || '💡'), h('p', null, rich(b.p)));
    },
  };

  function block(b) {
    const inner = BLOCK[b.t](b);
    return h('section', { class: `sh-block is-${b.t}` }, b.title ? h('h3', { class: 'sh-h' }, b.ic ? `${b.ic} ` : '', rich(b.title)) : null, inner);
  }
  const rowEl = (row) => h('div', { class: 'sh-row', style: { gridTemplateColumns: row.map((b) => `minmax(0, ${b.w || 1}fr)`).join(' ') } }, row.map(block));

  /** Terms of the lesson (AR + EN), from its flash cards. */
  function termsRow(lesson) {
    const cards = [];
    lesson.stations.forEach((st) => st.steps.forEach((s) => { if (s.q && s.q.cards) cards.push(...s.q.cards); }));
    if (!cards.length) return null;
    return h('section', { class: 'sh-block is-terms' }, h('h3', { class: 'sh-h' }, '📖 ', t({ ar: 'مصطلحات الدرس', en: 'Lesson terms' })),
      h('div', { class: 'sh-terms' }, cards.map((c) => h('span', null, h('b', null, t(c.front)), h('i', { dir: 'auto' }, RV.i18n.alt(c.front))))));
  }

  function neighbour(lesson) {
    const list = RV.availableLessons(), k = list.indexOf(lesson.id);
    return h('div', { class: 'sh-path' },
      k > 0 ? h('span', null, list[k - 1]) : null, k > 0 ? arrow() : null,
      h('b', null, lesson.id),
      k < list.length - 1 ? arrow() : null, k < list.length - 1 ? h('span', null, list[k + 1]) : null);
  }

  function header(lesson, def) {
    const ch = RV.chapterOf(lesson.id);
    return h('header', { class: 'sh-head' },
      h('div', { class: 'sh-head-txt' },
        h('small', null, `${RV.i18n.ui('unit')} ${ch.number} · ${t(ch.title)}`),
        h('h1', null, h('em', null, lesson.id), t(lesson.title)),
        h('p', { class: 'en', dir: 'auto' }, RV.i18n.alt(lesson.title)),
        def.lead ? h('p', { class: 'lead' }, rich(def.lead)) : null),
      h('div', { class: 'sh-head-img' }, h('img', { src: lesson.cover, alt: '' })));
  }

  const miniHeader = (lesson) => h('header', { class: 'sh-mini' }, h('em', null, lesson.id), h('b', null, t(lesson.title)));

  function footer(lesson, n) {
    return h('footer', { class: 'sh-foot' },
      h('span', null, RV.i18n.ui('subject'), ' · ', RV.i18n.ui('grade')),
      neighbour(lesson),
      h('span', null, RV.i18n.ui('madeBy'), ' · ', h('b', { class: 'n' }, String(n))));
  }

  /** Rows go on A4 pages one by one; a row that does not fit opens the next page. */
  function sheetPages(paper, lesson, tight) {
    const def = RV.sheets[lesson.id], first = paper.children.length;
    let page = null, n = 0;
    const open = () => {
      n++;
      const body = h('div', { class: 'sh-body' });
      page = h('article', { class: 'sh-page' + (tight ? ' is-tight' : ''), style: { '--lc': lesson.color } }, n === 1 ? header(lesson, def) : miniHeader(lesson), body, footer(lesson, n));
      page.body = body;
      paper.appendChild(page);
    };
    const put = (el) => {
      page.body.appendChild(el);
      if (page.body.scrollHeight > page.body.clientHeight + 1 && page.body.children.length > 1) {
        el.remove();
        page.classList.add('is-full');
        open();
        page.body.appendChild(el);
      }
    };
    open();
    def.rows.forEach((row) => put(rowEl(row)));
    const terms = termsRow(lesson);
    if (terms) put(terms);
    /* a few lines alone on a new page: tighten the sheet so they fit */
    const last = page.body.lastElementChild.getBoundingClientRect(), box = page.body.getBoundingClientRect();
    if (!tight && n > 1 && (last.bottom - box.top) / box.height < 0.3) {
      while (paper.children.length > first) paper.lastChild.remove();
      sheetPages(paper, lesson, true);
    } else if (tight && n > 1 && page.body.children.length === 1 && page.body.firstChild === terms) {
      page.remove(); // the terms are in the glossary too: a sheet stays on one page
    }
    /* a nearly full last page spreads its rows evenly instead of leaving a gap */
    const end = paper.lastChild.body;
    if (end) {
      const fill = (end.lastElementChild.getBoundingClientRect().bottom - end.getBoundingClientRect().top) / end.clientHeight;
      paper.lastChild.classList.toggle('is-full', fill > 0.65);
    }
  }

  /** The opening page of a chapter or the course: its lessons joined in order. */
  function coverPage(paper, c) {
    const rows = c.rows.map((r, k) => [k ? arrowDown() : null, h('div', { class: 'sh-cover-row', style: { '--lc': r.color } },
      h('img', { src: r.cover, alt: '' }), h('em', null, r.id), h('b', null, r.title))]);
    paper.appendChild(h('article', { class: 'sh-page sh-cover', style: { '--lc': c.color || '#6366f1' } },
      h('div', { class: 'sh-cover-top' }, h('small', null, RV.i18n.ui('subject'), ' · ', RV.i18n.ui('grade')), h('h1', null, c.heading), c.sub ? h('p', null, c.sub) : null),
      h('div', { class: 'sh-cover-list' }, rows), h('p', { class: 'sh-cover-by' }, RV.i18n.ui('madeBy'))));
  }

  RV.sheet = {
    art: {},
    types: Object.keys(BLOCK),
    /** ids: lessons in order · cover: optional { heading, sub, rows: [{ id, title, cover, color }] } */
    render(paper, ids, cover) {
      RV.dom.clear(paper);
      const fonts = ['400 15px Cairo', '700 15px Cairo', '800 15px Cairo', '900 15px Cairo', '400 15px Plex', '600 15px Plex', '700 15px Plex', '600 15px Mono'].map((f) => document.fonts.load(f, 'ابج abc 123'));
      return Promise.all(fonts).catch(() => null).then(() => {
        if (cover) coverPage(paper, cover);
        ids.forEach((id) => sheetPages(paper, RV.lessons.get(id)));
      });
    },
  };
})();

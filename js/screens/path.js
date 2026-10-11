/* =========================================================
 * screens/path.js — the lesson "road": hero + winding path of stations.
 * ========================================================= */
(function () {
  'use strict';
  const { h, s } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  const KIND = {
    learn:     { icon: 'book',   label: { ar: 'شرح', en: 'Learn' } },
    example:   { icon: 'pen',    label: { ar: 'مثال محلول', en: 'Worked example' } },
    practice:  { icon: 'target', label: { ar: 'تدريب', en: 'Practice' } },
    flash:     { icon: 'cards',  label: { ar: 'مصطلحات', en: 'Key terms' } },
    challenge: { icon: 'bulb',   label: { ar: 'فكّر كمهندس', en: 'Think like an engineer' } },
    game:      { icon: 'bolt',   label: { ar: 'لعبة', en: 'Game' } },
    test:      { icon: 'trophy', label: { ar: 'امتحان الدرس', en: 'Lesson test' } },
  };
  RV.stationKinds = KIND;

  RV.screens.add('path', {
    render(root, params) {
      const lesson = RV.lessons.get(params.lessonId);
      RV.chrome.lessonTheme(root, lesson);
      const list = RV.availableLessons();
      const idx = list.indexOf(lesson.id);

      const top = h('div', { class: 'topbar' },
        h('a', { class: 'icon-btn', href: '#/', title: RV.i18n.ui('home') }, RV.icon('home')),
        h('div', { class: 'topbar-title' }, h('span', { class: 'mono chip' }, lesson.id), h('span', null, t(lesson.title))),
        RV.game.pill(),
        RV.chrome.settingsButtons(() => RV.app.rerender()));

      const hero = h('header', { class: 'path-hero' },
        h('div', { class: 'path-hero-img' }, h('img', { src: lesson.cover, alt: '' })),
        h('div', { class: 'path-hero-text' },
          h('span', { class: 'path-kicker' }, `${RV.i18n.ui('lesson')} ${lesson.id}`),
          h('h1', null, t(lesson.title)),
          h('p', { class: 'path-en muted' }, RV.i18n.alt(lesson.title)),
          h('div', { class: 'path-guiding' }, h('span', { class: 'path-guiding-label' }, RV.icon('question'), RV.i18n.ui('guiding')), h('p', null, t(lesson.guiding)))));

      const objectives = h('section', { class: 'path-objectives card' },
        h('h3', null, RV.icon('target'), RV.i18n.ui('objectives')),
        h('ul', null, lesson.objectives.map((o) => h('li', null, t(o)))));

      const road = buildRoad(lesson);

      const wheelBtn = h('button', { class: 'btn wheel-btn', type: 'button', onClick: () => RV.wheel.open(lesson) }, '🎡 ', t({ ar: 'عجلة الأسئلة', en: 'Question wheel' }));
      const nav = h('nav', { class: 'path-nav' },
        idx > 0 ? h('a', { class: 'btn btn-ghost', href: `#/l/${list[idx - 1]}` }, RV.icon('arrowPrev', 'flip-rtl'), list[idx - 1]) : h('span'),
        idx < list.length - 1 ? h('a', { class: 'btn btn-ghost', href: `#/l/${list[idx + 1]}` }, list[idx + 1], RV.icon('arrowNext', 'flip-rtl')) : h('a', { class: 'btn btn-ghost', href: '#/challenge' }, RV.i18n.ui('unitChallenge'), RV.icon('trophy')));

      root.append(h('div', { class: 'screen path' }, top, hero, h('div', { class: 'path-tools' }, wheelBtn), h('div', { class: 'path-layout' }, objectives, road), nav));

      const tl = gsap.timeline();
      tl.from('.path-hero-img', { opacity: 0, duration: 0.8, ease: 'power2.out' }) // (the <img> itself is moved by the CSS Ken Burns — never by GSAP too, or Safari shakes)
        .from('.path-hero-text > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, 0.1)
        .from('.path-objectives', { y: 30, opacity: 0, duration: 0.5 }, 0.4)
        .fromTo('.road-line', { strokeDashoffset: 3000 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, 0.4)
        .from('.station > *', { scale: 0.5, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'back.out(2)' }, 0.6); // children only: .station keeps its CSS translate
      gsap.to('.station.is-current .station-pulse', { scale: 1.7, opacity: 0, duration: 1.4, repeat: -1, ease: 'power1.out' });
    },
  });

  function buildRoad(lesson) {
    const wrap = h('section', { class: 'road' });
    const n = lesson.stations.length;
    const rowH = 118;
    const H = n * rowH + 40;
    // zig-zag x positions in a 0..100 coordinate space
    const xs = lesson.stations.map((_, i) => [50, 76, 50, 24][i % 4]);
    const ys = lesson.stations.map((_, i) => 60 + i * rowH);
    let d = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < n; i++) {
      const my = (ys[i - 1] + ys[i]) / 2;
      d += ` C ${xs[i - 1]} ${my}, ${xs[i]} ${my}, ${xs[i]} ${ys[i]}`;
    }
    const svg = s('svg', { class: 'road-svg', viewBox: `0 0 100 ${H}`, preserveAspectRatio: 'none', style: { height: H + 'px' } },
      s('path', { d, class: 'road-bed', 'vector-effect': 'non-scaling-stroke' }),
      s('path', { d, class: 'road-line', 'vector-effect': 'non-scaling-stroke', 'stroke-dasharray': '3000' }));
    wrap.style.height = H + 'px';
    wrap.appendChild(svg);

    let currentMarked = false;
    lesson.stations.forEach((st, i) => {
      const kind = KIND[st.kind] || KIND.learn;
      const rec = RV.store.station(lesson.id, st.id);
      const unlocked = RV.store.isUnlocked(lesson, i);
      const current = unlocked && !rec && !currentMarked;
      if (current) currentMarked = true;
      const node = h(unlocked ? 'a' : 'button', {
        class: ['station', rec ? 'is-done' : '', current ? 'is-current' : '', unlocked ? '' : 'is-locked', xs[i] > 50 ? 'right' : xs[i] < 50 ? 'left' : 'mid'],
        href: unlocked ? `#/l/${lesson.id}/s/${st.id}` : null,
        type: unlocked ? null : 'button',
        style: { top: ys[i] + 'px', left: xs[i] + '%' },
      },
        h('span', { class: 'station-pulse' }),
        h('span', { class: 'station-dot' }, RV.icon(unlocked ? (rec ? 'check' : kind.icon) : 'lock')),
        h('span', { class: 'station-label' },
          h('small', null, t(kind.label)),
          h('b', null, t(st.title)),
          rec ? RV.chrome.stars(rec.stars || 0) : null,
          rec && rec.max ? h('span', { class: 'mono station-score' }, `${rec.best}/${rec.max}`) : null));
      if (!unlocked) node.addEventListener('click', () => { RV.sound.play('bad'); RV.fx.toast(RV.i18n.ui('locked')); RV.wkit.shake(node.querySelector('.station-dot')); });
      wrap.appendChild(node);
    });
    return wrap;
  }
})();

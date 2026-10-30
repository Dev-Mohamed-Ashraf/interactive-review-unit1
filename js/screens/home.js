/* =========================================================
 * screens/home.js — landing: course hero, then one section per chapter
 * (its lesson cards + its challenge), then extras (badges, certificate, offline).
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  RV.screens.add('home', {
    render(root) {
      const course = RV.course || RV.unit;
      RV.chrome.lessonTheme(root, null);

      const hero = h('header', { class: 'home-hero' },
        h('div', { class: 'home-hero-bg' }, heroOrbit()),
        h('div', { class: 'home-hero-text' },
          h('div', { class: 'home-kicker' }, h('span', { class: 'chip' }, RV.i18n.ui('subject')), h('span', { class: 'muted' }, RV.i18n.ui('grade'))),
          h('h1', { class: 'home-title' }, h('span', { class: 'home-unit-no' }, t({ ar: `${RV.chapters.length} فصول · ${RV.availableLessons().length} دروس`, en: `${RV.chapters.length} chapters · ${RV.availableLessons().length} lessons` })), t(course.title)),
          h('p', { class: 'home-sub' }, t(course.subtitle)),
          h('p', { class: 'home-by muted' }, RV.i18n.ui('madeBy'))));

      let n = 0;
      const chapters = RV.chapters.filter((c) => RV.chapterLessons(c).length).map((c) => h('section', { class: 'chapter-block' },
        h('header', { class: 'chapter-head' },
          h('span', { class: 'chapter-no mono' }, String(c.number).padStart(2, '0')),
          h('div', null, h('small', { class: 'muted' }, `${RV.i18n.ui('unit')} ${c.number}`), h('h2', null, t(c.title)), h('p', { class: 'muted' }, t(c.subtitle)))),
        h('div', { class: 'lesson-grid' }, RV.chapterLessons(c).map((id) => lessonCard(RV.lessons.get(id), n++))),
        h('a', { class: 'challenge-card card', href: c.route },
          h('div', { class: 'challenge-ico' }, RV.icon('trophy')),
          h('div', null, h('h3', null, t(c.challengeTitle)), h('p', { class: 'muted' }, t(c.challengeSub))),
          bestBadge(c.challengeId, 'challenge'),
          h('span', { class: 'challenge-go' }, RV.icon('arrowNext', 'flip-rtl')))));

      const top = h('div', { class: 'topbar home-top' },
        h('div', { class: 'brand' }, h('span', { class: 'brand-mark mono' }, '</>'), h('span', null, RV.i18n.ui('appTitle'))),
        RV.game.pill(),
        RV.chrome.settingsButtons(() => RV.app.rerender()));

      const extras = h('section', { class: 'home-extras' },
        h('a', { class: 'extra-card card', href: '#/badges' }, h('span', { class: 'extra-ico' }, RV.game.levelFor(RV.store.game().xp).icon),
          h('div', null, h('b', null, t({ ar: 'أوسمتي ومستواي', en: 'My badges & level' })), h('small', { class: 'muted' }, `${RV.store.game().badges.length} / ${Object.keys(RV.game.BADGES).length} 🏅`))),
        h('a', { class: 'extra-card card', href: '#/certificate' }, h('span', { class: 'extra-ico' }, '🎓'),
          h('div', null, h('b', null, t({ ar: 'شهادتك', en: 'Your certificate' })), h('small', { class: 'muted' }, t({ ar: 'اكتب اسمك واطبعها', en: 'Add your name and print' })))),
        offlineCard());
      const find = h('a', { class: 'home-search', href: '#/search' }, RV.icon('search'), t({ ar: 'دوّر على أي حاجة في المنهج…', en: 'Search anything in the course…' }));
      root.append(h('div', { class: 'screen home' }, top, hero, find, studyCard(), chapters, extras));

      gsap.timeline()
        .from('.home-kicker, .home-title, .home-sub, .home-by', { y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' })
        .from('.lesson-card', { y: 50, opacity: 0, stagger: 0.09, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.challenge-card, .chapter-head', { y: 30, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');
      gsap.to('.orbit', { rotation: 360, duration: 120, repeat: -1, ease: 'none' });
      gsap.to('.orbit-node', { opacity: 0.35, duration: 1.6, repeat: -1, yoyo: true, stagger: 0.4, ease: 'sine.inOut' });
    },
  });

  /** The way into the mistakes notebook, with what is waiting there. */
  function studyCard() {
    const S = RV.study.summary();
    const sub = S.mistakes ? { ar: `${S.mistakes} سؤال مستنيك تراجعه`, en: `${S.mistakes} questions waiting for review` }
      : S.answered ? { ar: `نسبة إتقانك ${Math.round(S.mastery * 100)}%`, en: `Your mastery: ${Math.round(S.mastery * 100)}%` }
        : { ar: 'هيبدأ يشتغل لما تحل أسئلة', en: 'Starts working once you answer questions' };
    const card = (href, ico, title, small) => h('a', { class: 'study-home card', href }, h('span', { class: 'extra-ico' }, ico),
      h('div', null, h('b', null, t(title)), h('small', { class: 'muted' }, t(small))),
      h('span', { class: 'challenge-go' }, RV.icon('arrowNext', 'flip-rtl')));
    return h('div', { class: 'study-home-row' },
      card('#/study', '📒', { ar: 'كشكول الأخطاء ونقاط ضعفي', en: 'Mistakes notebook & weak spots' }, sub),
      card('#/exam', '📝', { ar: 'الامتحان الشامل', en: 'Full practice exam' }, { ar: 'بمؤقت وتحليل لكل درس', en: 'Timed, with a result per lesson' }),
      card('#/glossary', '📖', { ar: 'قاموس المصطلحات', en: 'Glossary' }, { ar: `${RV.lexicon.terms().length} مصطلح مترابطين`, en: `${RV.lexicon.terms().length} connected terms` }),
      card('#/print', '🖨️', { ar: 'الملخصات للطباعة', en: 'Printable summaries' }, { ar: 'ورقة مرسومة لكل درس', en: 'A designed sheet per lesson' }));
  }

  /** "Download for offline": one tap with internet → the whole review works with no internet (videos too). */
  function offlineCard() {
    if (!RV.offline.supported) return null; // file:// and the dev server have no service worker
    // iPad/iPhone in a Safari tab: the offline copy must live in the Home Screen app, not in Safari
    if (RV.offline.ios && !RV.offline.standalone) {
      return h('div', { class: 'extra-card card offline-card' }, h('span', { class: 'extra-ico' }, '📲'),
        h('div', null, h('b', null, t({ ar: 'علشان تشتغل من غير إنترنت على الآيباد/الآيفون', en: 'To use it offline on iPad / iPhone' })),
          h('small', { class: 'muted' }, t({ ar: '١) زرار المشاركة ⬆️ ← «إضافة إلى الشاشة الرئيسية»  ٢) افتحها من الأيقونة وإنت على النت واستنى «✅ جاهزة»  ٣) بعد كده افتحها من الأيقونة في أي مكان', en: '1) Share ⬆️ → "Add to Home Screen"  2) open it from the icon while online and wait for "✅ Ready"  3) then open it from the icon anywhere' }))));
    }
    const sub = h('small', { class: 'muted' });
    const bar = h('div', { class: 'offline-bar' }, h('i'));
    const card = h('button', { class: 'extra-card card offline-card', type: 'button' }, h('span', { class: 'extra-ico' }, '📥'),
      h('div', null, h('b', null, t({ ar: 'نزّل المراجعة للأوفلاين', en: 'Download for offline' })), sub, bar));
    function idle() {
      const ok = RV.offline.ready();
      card.classList.toggle('is-ready', ok);
      sub.textContent = t(ok ? { ar: '✅ جاهزة — بتشتغل من غير إنترنت (اضغط للتحديث)', en: '✅ Ready — works with no internet (tap to refresh)' }
        : { ar: 'دوسة واحدة وإنت على الإنترنت ← تشتغل بعد كده من غير نت (فيديوهات كمان)', en: 'One tap while online → works without internet afterwards (videos too)' });
    }
    idle();
    card.addEventListener('click', () => {
      if (card.disabled) return;
      if (!navigator.onLine) { RV.fx.toast(t({ ar: 'محتاج إنترنت للتنزيل أول مرة 📶', en: 'Needs internet the first time 📶' })); return; }
      card.disabled = true;
      card.classList.add('is-busy');
      sub.textContent = t({ ar: 'بيتنزّل… سيب الصفحة مفتوحة', en: 'Downloading… keep this page open' });
      RV.offline.download(({ done, total }) => {
        gsap.to(bar.firstChild, { width: Math.round((done / total) * 100) + '%', duration: 0.3 });
        sub.textContent = t({ ar: `بيتنزّل… ${Math.round((done / total) * 100)}%`, en: `Downloading… ${Math.round((done / total) * 100)}%` });
      }).then((res) => {
        card.disabled = false;
        card.classList.remove('is-busy');
        if (res.ok) { RV.fx.toast(t({ ar: 'تمام ✅ المراجعة بقت تشتغل من غير إنترنت', en: 'Done ✅ the review now works offline' })); RV.fx.confetti({ count: 80 }); idle(); }
        else sub.textContent = t({ ar: `⚠️ ${res.failed} ملف ماتنزلش — اتأكد من النت وجرّب تاني`, en: `⚠️ ${res.failed} files failed — check the connection and retry` });
      });
    });
    return card;
  }

  function lessonCard(lesson, i) {
    const pct = RV.store.lessonProgress(lesson);
    const a = h('a', { class: 'lesson-card card', href: `#/l/${lesson.id}`, style: { '--lesson': lesson.color } },
      h('div', { class: 'lesson-card-img' }, h('img', { src: lesson.cover, alt: '', loading: i > 1 ? 'lazy' : 'eager' })),
      h('div', { class: 'lesson-card-body' },
        h('div', { class: 'lesson-card-top' }, h('span', { class: 'lesson-no mono' }, lesson.id), ring(pct)),
        h('h3', null, t(lesson.title)),
        h('p', { class: 'muted lesson-card-en' }, RV.i18n.alt(lesson.title)),
        h('div', { class: 'lesson-card-meta' }, RV.icon('flag'), `${lesson.stations.length} ${RV.i18n.ui('stations')}`,
          h('span', { class: 'lesson-card-cta' }, RV.i18n.ui(pct === 0 ? 'start' : pct < 1 ? 'continue' : 'review'), RV.icon('arrowNext', 'flip-rtl')))));
    return a;
  }

  function ring(pct) {
    const r = 18, c = 2 * Math.PI * r;
    const svg = RV.dom.s('svg', { class: 'ring', viewBox: '0 0 44 44' },
      RV.dom.s('circle', { cx: 22, cy: 22, r, class: 'ring-bg' }),
      RV.dom.s('circle', { cx: 22, cy: 22, r, class: 'ring-fg', 'stroke-dasharray': c, 'stroke-dashoffset': c * (1 - pct) }),
      RV.dom.s('text', { x: 22, y: 26, 'text-anchor': 'middle', class: 'ring-txt' }, Math.round(pct * 100) + '%'));
    return svg;
  }

  function bestBadge(lessonId, stationId) {
    const st = RV.store.station(lessonId, stationId);
    if (!st) return null;
    return h('div', { class: 'best-badge' }, RV.chrome.stars(st.stars || 0), h('span', { class: 'mono' }, `${st.best}/${st.max}`));
  }

  /** Decorative orbit of tech icons behind the hero title. */
  function heroOrbit() {
    const s = RV.dom.s;
    const names = ['cpu', 'globe', 'phone', 'cloud', 'brain', 'shield', 'network', 'sparkle'];
    const svg = s('svg', { viewBox: '0 0 600 600', class: 'orbit', 'aria-hidden': 'true' },
      s('circle', { cx: 300, cy: 300, r: 250, class: 'orbit-ring' }),
      s('circle', { cx: 300, cy: 300, r: 170, class: 'orbit-ring' }));
    names.forEach((n, i) => {
      const ang = (i / names.length) * Math.PI * 2;
      const r = i % 2 ? 170 : 250;
      const g = s('g', { class: 'orbit-dot' });
      g.appendChild(s('circle', { cx: 300 + Math.cos(ang) * r, cy: 300 + Math.sin(ang) * r, r: 26, class: 'orbit-node' }));
      g.appendChild(RV.kit.svgIcon(n, 300 + Math.cos(ang) * r, 300 + Math.sin(ang) * r, 26));
      svg.appendChild(g);
    });
    return svg;
  }

  RV.homeHelpers = { ring };
})();

/* =========================================================
 * core/game.js — rewards: XP, levels, combos and badges.
 * Responsibility: turn learning events into motivation.
 *   RV.game.answer(result)              ← every widget answer (via the player)
 *   RV.game.stationDone(lesson, st, r)  ← every finished station
 *   RV.game.event(name, data)           ← special moments (speed round, guesses…)
 * Persists through RV.store.game(); renders floating "+XP", combo flames,
 * and a full-screen badge celebration. Knows nothing about content.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  const LEVELS = [
    { xp: 0, name: { ar: 'مبتدئ', en: 'Beginner' }, icon: '🌱' },
    { xp: 150, name: { ar: 'مستكشف', en: 'Explorer' }, icon: '🧭' },
    { xp: 400, name: { ar: 'باحث', en: 'Researcher' }, icon: '🔬' },
    { xp: 800, name: { ar: 'مهندس', en: 'Engineer' }, icon: '🛠️' },
    { xp: 1400, name: { ar: 'خبير', en: 'Expert' }, icon: '🚀' },
    { xp: 2200, name: { ar: 'أسطورة', en: 'Legend' }, icon: '👑' },
  ];

  const BADGES = {
    first:     { icon: '👣', name: { ar: 'أول خطوة', en: 'First step' }, desc: { ar: 'خلّصت أول محطة', en: 'Finished your first station' } },
    perfect:   { icon: '💯', name: { ar: 'علامة كاملة', en: 'Full marks' }, desc: { ar: 'امتحان درس بالدرجة النهائية', en: 'A lesson test with full marks' } },
    combo5:    { icon: '🔥', name: { ar: 'سلسلة نار', en: 'On fire' }, desc: { ar: '5 إجابات صح ورا بعض', en: '5 correct answers in a row' } },
    combo10:   { icon: '☄️', name: { ar: 'نيزك', en: 'Meteor' }, desc: { ar: '10 إجابات صح ورا بعض', en: '10 correct in a row' } },
    moore:     { icon: '🧮', name: { ar: 'حلّال مسائل مور', en: 'Moore solver' }, desc: { ar: 'خلّصت محطة مسائل قانون مور', en: 'Finished the Moore problems station' } },
    speed:     { icon: '⚡', name: { ar: 'صاروخ', en: 'Rocket' }, desc: { ar: '10 إجابات صح في تحدّي السرعة', en: '10 correct in a speed round' } },
    sniper:    { icon: '🎯', name: { ar: 'قنّاص', en: 'Sniper' }, desc: { ar: 'تخمين قريب جدًا في لعبة الترانزستورات', en: 'A very close transistor guess' } },
    lesson:    { icon: '🏅', name: { ar: 'خلّصت درس', en: 'Lesson complete' }, desc: { ar: 'خلّصت كل محطات درس', en: 'Finished every station of a lesson' } },
    chapter:   { icon: '🏆', name: { ar: 'بطل الفصل', en: 'Chapter hero' }, desc: { ar: 'خلّصت الأربع دروس', en: 'Finished all four lessons' } },
    challenge: { icon: '🎓', name: { ar: 'خرّيج الفصل الأول', en: 'Chapter graduate' }, desc: { ar: 'خلّصت تحدّي الفصل', en: 'Completed the chapter challenge' } },
  };

  let combo = 0;

  function levelFor(xp) {
    let i = 0;
    LEVELS.forEach((L, k) => { if (xp >= L.xp) i = k; });
    const cur = LEVELS[i], next = LEVELS[i + 1];
    return { index: i, ...cur, next, progress: next ? (xp - cur.xp) / (next.xp - cur.xp) : 1 };
  }

  function addXP(n, anchor) {
    const g = RV.store.game();
    const before = levelFor(g.xp).index;
    g.xp += n;
    RV.store.saveGame();
    floatText(`+${n} XP`, anchor);
    document.querySelectorAll('.xp-pill').forEach(renderPill);
    const after = levelFor(g.xp);
    if (after.index > before) celebrate(after.icon, { ar: `مستوى جديد: ${after.name.ar}`, en: `New level: ${after.name.en}` }, { ar: 'كمّل كده! 💪', en: 'Keep going! 💪' });
  }

  function award(id) {
    const g = RV.store.game();
    if (!BADGES[id] || g.badges.includes(id)) return false;
    g.badges.push(id);
    RV.store.saveGame();
    const b = BADGES[id];
    setTimeout(() => celebrate(b.icon, { ar: `وسام جديد: ${b.name.ar}`, en: `New badge: ${b.name.en}` }, b.desc), 900);
    return true;
  }

  /** Floating "+10 XP" near an element (or the bottom-centre). */
  function floatText(text, anchor, cls) {
    const el = h('div', { class: 'xp-float ' + (cls || '') }, text);
    document.body.appendChild(el);
    const r = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight - 120, width: 0 };
    gsap.set(el, { left: r.left + r.width / 2, top: r.top });
    gsap.fromTo(el, { y: 0, opacity: 0, scale: 0.6 }, { y: -70, opacity: 1, scale: 1.1, duration: 0.6, ease: 'back.out(2)' });
    gsap.to(el, { opacity: 0, y: -110, duration: 0.5, delay: 0.9, onComplete: () => el.remove() });
    setTimeout(() => el.remove(), 2200); // safety net: never leave a number stuck on the screen
  }

  /** Full-screen celebration card (badge / level up). */
  function celebrate(icon, title, sub) {
    const card = h('div', { class: 'celebrate' },
      h('div', { class: 'celebrate-card' },
        h('div', { class: 'celebrate-icon' }, icon),
        h('h3', null, t(title)),
        h('p', null, t(sub)),
        h('button', { class: 'btn btn-primary', type: 'button' }, '👍')));
    document.body.appendChild(card);
    const close = () => { gsap.to(card, { opacity: 0, duration: 0.25, onComplete: () => card.remove() }); setTimeout(() => card.remove(), 600); };
    card.addEventListener('click', close);
    gsap.from(card.querySelector('.celebrate-card'), { scale: 0.4, rotate: -8, opacity: 0, duration: 0.6, ease: 'back.out(2)' });
    gsap.from(card.querySelector('.celebrate-icon'), { scale: 0, rotate: 200, duration: 0.8, delay: 0.15, ease: 'back.out(2.5)' });
    RV.sound.play('win');
    RV.fx.confetti({ count: 120 });
    setTimeout(close, 4200);
  }

  /** The XP pill used in top bars: level icon, XP, progress ring. */
  function pill() {
    const el = h('button', { class: 'xp-pill', type: 'button', title: 'XP' });
    renderPill(el);
    el.addEventListener('click', () => { location.hash = '#/badges'; });
    return el;
  }
  function renderPill(el) {
    const g = RV.store.game();
    const L = levelFor(g.xp);
    RV.dom.clear(el);
    el.append(h('span', { class: 'xp-lvl' }, L.icon), h('span', { class: 'xp-num mono' }, g.xp + ' XP'), h('i', { class: 'xp-bar' }, h('b', { style: { width: Math.round(L.progress * 100) + '%' } })));
  }

  RV.game = {
    LEVELS, BADGES, levelFor, award, pill, floatText, celebrate,
    /** A widget answered. Only first-try correctness earns XP and combo. */
    answer(res, anchor) {
      if (!res) return;
      if (res.correct) {
        combo++;
        addXP(10 + Math.min(combo - 1, 5) * 2, anchor);
        if (combo >= 3) floatText(`🔥 ×${combo}`, anchor, 'combo');
        if (combo === 5) award('combo5');
        if (combo === 10) award('combo10');
      } else if (res.score > 0) {
        addXP(Math.round(10 * res.score / res.max), anchor);
        combo = 0;
      } else combo = 0;
    },
    stationDone(lesson, station, result) {
      addXP(result ? 30 + Math.round(70 * result.score / result.max) : 50);
      award('first');
      if (station.kind === 'test' && result && result.score === result.max) award('perfect');
      if (station.id === 'moore-math') award('moore');
      if (lesson.isChallenge) award('challenge');
      if (lesson.stations && lesson.stations.length && RV.store.lessonProgress(lesson) === 1) award('lesson');
      const ch = lesson.isChallenge ? null : RV.chapterOf(lesson.id);
      if (ch && RV.chapterLessons(ch).every((id) => RV.store.lessonProgress(RV.lessons.get(id)) === 1)) award('chapter');
    },
    event(name, data) {
      if (name === 'speed' && data.correct >= 10) award('speed');
      if (name === 'guess' && data.ratio < 1.5) award('sniper');
      if (data && data.xp) addXP(data.xp, data.anchor);
    },
  };
})();

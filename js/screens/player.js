/* =========================================================
 * screens/player.js — runs one station: navigation, transitions,
 * keyboard input, scoring, and the completion screen.
 * Content rendering is delegated to RV.steps[type].
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const t = (v) => RV.i18n.t(v);

  RV.screens.add('player', {
    render(root, params) {
      const lesson = params.lesson;
      const station = params.station;
      const isTest = station.kind === 'test';
      const steps = station.steps;
      const results = new Array(steps.length).fill(null);
      let i = 0;
      let beat = 0;
      let cur = null;
      let busy = false;

      RV.chrome.lessonTheme(root, lesson.color ? lesson : null);
      const backHref = lesson.backHref || (lesson.isChallenge ? '#/' : `#/l/${lesson.id}`);

      // ---------- chrome ----------
      const bar = h('div', { class: 'player-progress' }, h('i'));
      const counter = h('span', { class: 'player-count mono' });
      const top = h('div', { class: 'topbar player-top' },
        h('a', { class: 'icon-btn', href: backHref, title: RV.i18n.ui('back') }, RV.icon('close')),
        h('div', { class: 'topbar-title' },
          h('span', { class: 'chip mono' }, lesson.isReview ? '📒' : lesson.isChallenge ? '★' : lesson.id),
          h('span', { class: 'player-station' }, t(station.title)), counter),
        RV.game.pill(),
        ttsBtn(),
        presentBtn(),
        RV.chrome.settingsButtons(() => updateNav()));
      const body = h('main', { class: 'player-body' });
      const prevBtn = h('button', { class: 'btn btn-ghost nav-prev', type: 'button' }, RV.icon('arrowPrev', 'flip-rtl'), h('span', null, RV.i18n.ui('prev')));
      const nextBtn = h('button', { class: 'btn btn-primary nav-next', type: 'button' }, h('span', null, RV.i18n.ui('next')), RV.icon('arrowNext', 'flip-rtl'));
      const dots = h('div', { class: 'nav-dots' }, steps.map(() => h('i')));
      const nav = h('footer', { class: 'player-nav' }, prevBtn, dots, nextBtn);
      const screen = h('div', { class: 'screen player' + (isTest ? ' is-test' : '') + (RV.store.setting('present') && innerWidth > 900 ? ' is-present' : '') }, top, bar, body, nav);

      /** Presentation mode: the stage fills the screen, the current beat becomes a subtitle. */
      function presentBtn() {
        const b = h('button', { class: 'icon-btn btn-present' + (RV.store.setting('present') ? ' on' : ''), type: 'button', title: RV.i18n.ui('present') }, RV.icon('film'));
        b.addEventListener('click', () => {
          const on = !RV.store.setting('present');
          RV.store.setSetting('present', on);
          b.classList.toggle('on', on);
          screen.classList.toggle('is-present', on);
          RV.sound.play('whoosh');
          window.dispatchEvent(new Event('resize'));
        });
        return b;
      }
      root.appendChild(screen);

      prevBtn.addEventListener('click', prev);
      nextBtn.addEventListener('click', next);

      // ---------- input: keyboard (buttons above) ----------
      function onKey(e) {
        if (e.target.closest && e.target.closest('textarea, input')) return;
        const rtl = RV.i18n.lang === 'ar';
        if (e.key === 'ArrowRight') { e.preventDefault(); rtl ? prev() : next(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); rtl ? next() : prev(); }
        else if (e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') { if (e.target === document.body) { e.preventDefault(); next(); } }
        else if (e.key === 'PageUp') { e.preventDefault(); prev(); }
        else if (e.key === 'Escape') location.hash = backHref;
      }
      // (no swipe: on the iPad a finger on the board must never change the step —
      //  only the Next / Back buttons or the keyboard move between steps)
      document.addEventListener('keydown', onKey);

      // ---------- step lifecycle ----------
      function mount(index, opts) {
        if (cur) cur.destroy();
        RV.dom.clear(body);
        i = index;
        const step = steps[i];
        const host = h('div', { class: 'step step-' + step.type });
        body.appendChild(host);
        const renderer = RV.steps[step.type];
        if (!renderer) throw new Error('Unknown step type: ' + step.type);
        cur = renderer.render(host, step, {
          lesson, station,
          mode: isTest ? 'test' : 'practice',
          onAnswer(res) {
            if (!results[i]) { // only the first answer counts (no farming by retrying)
              RV.game.answer(res, nextBtn);
              RV.study.record(steps[i].source || { lesson: lesson.id, station: station.id, step: i }, steps[i], res);
            }
            if (!results[i] || !isTest) results[i] = results[i] || res;
          },
          onReady() { updateNav(); pulseNext(); },
        });
        beat = opts && opts.atEnd ? cur.beats - 1 : 0;
        if (opts && opts.atEnd) for (let k = 0; k <= beat; k++) cur.beat(k); else cur.beat(0);
        if (opts && opts.dir) gsap.from(host, { x: opts.dir * (RV.i18n.lang === 'ar' ? -60 : 60), opacity: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' });
        body.scrollTop = 0;
        updateNav();
      }

      function next() {
        if (busy) return;
        RV.sound.unlock();
        if (beat < cur.beats - 1) { beat++; cur.beat(beat); updateNav(); return; }
        if (!cur.ready()) {
          RV.wkit.shake(nextBtn);
          RV.fx.toast(t({ ar: 'جاوب الأول 😉', en: 'Answer first 😉' }));
          return;
        }
        if (i < steps.length - 1) transition(i + 1, 1);
        else finish();
      }
      function prev() {
        if (busy) return;
        if (beat > 0) { beat--; cur.beat(beat); updateNav(); return; }
        if (i > 0) transition(i - 1, -1, true);
      }
      function transition(target, dir, atEnd) {
        busy = true;
        RV.sound.play('whoosh');
        gsap.to(body.firstChild, {
          x: -dir * (RV.i18n.lang === 'ar' ? -60 : 60), opacity: 0, duration: 0.22, ease: 'power2.in',
          onComplete() { busy = false; mount(target, { dir, atEnd }); },
        });
      }
      function pulseNext() { gsap.fromTo(nextBtn, { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.out' }); }

      /** 🔊 read-aloud toggle: speaks the newest line every time a beat or step appears. */
      function ttsBtn() {
        if (!RV.voice.available) return null;
        const b = h('button', { class: 'icon-btn btn-tts' + (RV.store.setting('tts') ? ' on' : ''), type: 'button', title: RV.i18n.ui('readAloud') }, RV.icon('wave'));
        b.addEventListener('click', () => {
          const on = !RV.store.setting('tts');
          RV.store.setSetting('tts', on);
          b.classList.toggle('on', on);
          if (on) speakCurrent(); else RV.voice.stop();
        });
        return b;
      }
      function speakCurrent() {
        if (!RV.store.setting('tts')) return;
        const el = body.querySelector('.beat.is-current') || body.querySelector('.intro-blocks .is-shown:last-of-type') || body.querySelector('.q-prompt') || body.querySelector('.panel-title');
        if (!el) return;
        const copy = el.cloneNode(true); // exponents are <sup>: read "2^11.5" as "2 to the power 11.5"
        copy.querySelectorAll('sup').forEach((x) => x.replaceWith(' ^' + x.textContent + ' '));
        RV.voice.say(copy.textContent);
      }

      function updateNav() {
        setTimeout(speakCurrent, 120);
        if (!cur) return;
        const total = steps.length;
        const frac = (i + (beat + 1) / cur.beats) / total;
        bar.firstChild.style.width = `${Math.min(1, frac) * 100}%`;
        counter.textContent = `${i + 1}/${total}`;
        Array.from(dots.children).forEach((d, k) => { d.className = k < i ? 'is-done' : k === i ? 'is-cur' : ''; });
        prevBtn.disabled = i === 0 && beat === 0;
        const lastStep = i === total - 1 && beat >= cur.beats - 1;
        nextBtn.firstChild.textContent = RV.i18n.ui(lastStep ? 'finish' : 'next');
        nextBtn.classList.toggle('is-waiting', !cur.ready() && beat >= cur.beats - 1);
      }

      // ---------- finish ----------
      function finish() {
        let result = null;
        if (isTest || lesson.isReview) {
          const max = results.reduce((n, r, k) => n + (r ? r.max : stepMax(steps[k])), 0);
          const score = results.reduce((n, r) => n + (r ? r.score : 0), 0);
          result = { score, max };
        }
        if (lesson.isReview) { showComplete(result, { stars: RV.store.starsFor(result.score, result.max) }); return; }
        const rec = RV.store.complete(lesson.id, station.id, result);
        showComplete(result, rec);
        RV.game.stationDone(lesson, station, result);
      }

      function stepMax(step) {
        const q = step.q || {};
        if (q.widget === 'tf' || q.widget === 'recall') return (q.items || []).length;
        if (q.widget === 'match') return q.left.length;
        if (q.widget === 'fill') return q.answer.length;
        if (q.widget === 'classify') return q.items.length;
        if (q.widget === 'essay') return q.marks || 1;
        return 1;
      }

      /** Where the missed questions went: the notebook. */
      function notebookNote() {
        if (lesson.isReview) {
          const n = lesson.left(), all = RV.study.summary().mistakes;
          return h('p', { class: 'done-note muted' }, t(n ? { ar: `📒 لسه ${n} سؤال — كل سؤال بيخرج لما تجاوبه صح مرتين ورا بعض`, en: `📒 ${n} questions left — each leaves after two correct answers in a row` }
            : all ? { ar: `🎉 خلصت أخطاء الدرس ده — لسه ${all} سؤال في دروس تانية`, en: `🎉 This lesson is clear — ${all} questions left in other lessons` }
              : { ar: '🎉 الكشكول فضي!', en: '🎉 The notebook is clear!' }));
        }
        const missed = results.filter((r, k) => r && !r.correct && RV.study.graded(steps[k])).length;
        return missed ? h('a', { class: 'btn btn-sm done-note', href: '#/study' }, t({ ar: `📒 ${missed} سؤال اتحفظ في كشكول الأخطاء`, en: `📒 ${missed} questions saved to your notebook` })) : null;
      }

      function showComplete(result, rec) {
        if (cur) { cur.destroy(); cur = null; }
        RV.dom.clear(body);
        nav.hidden = true;
        bar.firstChild.style.width = '100%';
        const stationsList = lesson.stations || [];
        const idx = stationsList.findIndex((s) => s.id === station.id);
        const nextSt = idx >= 0 ? stationsList[idx + 1] : null;
        const starsN = rec.stars || 0;

        let headline = lesson.isReview ? t({ ar: 'خلّصت المراجعة!', en: 'Review finished!' }) : RV.i18n.ui('stationDone');
        let msg = '';
        if (result) {
          const r = result.score / result.max;
          msg = RV.i18n.ui(r >= 0.9 ? 'resultGreat' : r >= 0.6 ? 'resultGood' : 'resultLow');
        }
        const scoreEl = result ? h('div', { class: 'done-score' }, h('span', { class: 'done-num mono' }, '0'), h('span', { class: 'done-max mono' }, ` / ${result.max}`)) : null;
        const reviewDots = result ? h('div', { class: 'done-review' }, results.map((r, k) => h('span', { class: r && r.score === r.max ? 'ok' : r && r.score > 0 ? 'part' : 'bad', title: String(k + 1) }, String(k + 1)))) : null;

        const actions = h('div', { class: 'done-actions' },
          result && !(lesson.isReview && !lesson.left()) ? h('button', { class: 'btn', type: 'button', onClick: () => RV.app.rerender() }, RV.icon('refresh'), lesson.isReview ? t({ ar: 'راجع تاني', en: 'Review again' }) : RV.i18n.ui('retake')) : null,
          h('a', { class: 'btn' + (nextSt ? '' : ' btn-primary'), href: backHref }, RV.icon(lesson.isChallenge ? 'home' : 'flag'), lesson.isReview ? t(lesson.title) : RV.i18n.ui(lesson.isChallenge ? 'home' : 'backToPath')),
          nextSt ? h('a', { class: 'btn btn-primary', href: `#/l/${lesson.id}/s/${nextSt.id}` }, RV.i18n.ui('nextStation'), RV.icon('arrowNext', 'flip-rtl')) : null);

        const card = h('div', { class: 'done card' },
          h('div', { class: 'done-badge' }, RV.icon(isTest ? 'trophy' : 'check')),
          h('h2', null, headline),
          h('p', { class: 'muted' }, t(station.title)),
          RV.chrome.stars(starsN),
          scoreEl, msg ? h('p', { class: 'done-msg' }, msg) : null, reviewDots, notebookNote(), actions);
        body.appendChild(h('div', { class: 'done-wrap' }, card));

        const tl = gsap.timeline();
        tl.from(card, { y: 40, opacity: 0, scale: 0.92, duration: 0.6, ease: 'back.out(1.6)' })
          .from(card.querySelector('.done-badge'), { scale: 0, rotate: -120, duration: 0.6, ease: 'back.out(2.5)' }, '-=0.3')
          .from(card.querySelectorAll('.star'), { scale: 0, stagger: 0.15, duration: 0.4, ease: 'back.out(3)' }, '-=0.2');
        if (scoreEl) RV.fx.countUp(scoreEl.querySelector('.done-num'), result.score, { duration: 1.2, decimals: 1 });
        RV.sound.play('win');
        if (!result || result.score / result.max >= 0.6) setTimeout(() => RV.fx.confetti(), 350);
      }

      mount(0);

      return {
        destroy() {
          RV.voice.stop();
          document.removeEventListener('keydown', onKey);
          if (cur) cur.destroy();
        },
      };
    },
  });
})();

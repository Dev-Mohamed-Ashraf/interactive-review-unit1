/* =========================================================
 * screens/audit.js — layout QA (#/audit, #/audit/<lessonId>).
 * Mounts every visual step inside a real player layout, plays each
 * beat, lets the animation settle, then reports:
 *   • text that is cut off (outside the stage, or clipped by an
 *     overflow:hidden box, or truncated with scroll overflow)
 *   • images that are cropped (object-fit: cover hiding > 3 %)
 * Result is exposed on window.__audit for automated checks.
 * ========================================================= */
(function () {
  'use strict';
  const { h } = RV.dom;
  const SPEED = 6;      // animations run 6× faster during the audit
  const SETTLE = 420;   // ms to wait after each beat

  function visible(el, stop) {
    for (let n = el; n && n !== stop; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.15) return false;
    }
    return true;
  }

  /** Elements that directly own visible text. */
  function textOwners(root) {
    const out = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) if (n.nodeValue.trim().length > 1 && n.parentElement) out.add(n.parentElement);
    return [...out];
  }

  function clipBox(el, stage) {
    // intersection of every overflow-clipping ancestor up to (and including) the stage
    let r = stage.getBoundingClientRect();
    let box = { l: r.left, t: r.top, r: r.right, b: r.bottom };
    for (let n = el.parentElement; n && n !== stage; n = n.parentElement) {
      if (n instanceof SVGElement && n.tagName !== 'svg') continue;
      const cs = getComputedStyle(n);
      if (/(hidden|clip|auto|scroll)/.test(cs.overflow + cs.overflowX + cs.overflowY)) {
        const q = n.getBoundingClientRect();
        box = { l: Math.max(box.l, q.left), t: Math.max(box.t, q.top), r: Math.min(box.r, q.right), b: Math.min(box.b, q.bottom) };
      }
    }
    return box;
  }

  function scan(stage) {
    const issues = [];
    textOwners(stage).forEach((el) => {
      if (el.closest('.stage-ambient, .lp-credit, .anim-toolbar')) return;
      if (!visible(el, stage)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      const c = clipBox(el, stage);
      const tol = 3;
      const cut = Math.max(c.l - r.left, r.right - c.r, c.t - r.top, r.bottom - c.b);
      if (cut > tol) issues.push({ kind: 'text-cut', px: Math.round(cut), text: el.textContent.trim().slice(0, 40), cls: el.getAttribute('class') || el.tagName });
      else if (!(el instanceof SVGElement)) {
        const cs = getComputedStyle(el);
        if (/(hidden|clip)/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 2) issues.push({ kind: 'text-trunc', px: el.scrollWidth - el.clientWidth, text: el.textContent.trim().slice(0, 40), cls: el.getAttribute('class') || el.tagName });
      }
    });
    stage.querySelectorAll('img:not(.lp-bg), video').forEach((m) => {
      if (!visible(m, stage)) return;
      const cs = getComputedStyle(m);
      if (cs.objectFit !== 'cover') return;
      const nw = m.naturalWidth || m.videoWidth, nh = m.naturalHeight || m.videoHeight;
      if (!nw || !nh) return;
      const bw = m.clientWidth, bh = m.clientHeight;
      const shown = Math.min(1, (bw / bh) / (nw / nh), (nw / nh) / (bw / bh));
      if (shown < 0.97 && m.tagName === 'IMG') issues.push({ kind: 'img-crop', px: Math.round((1 - shown) * 100), text: m.getAttribute('src'), cls: 'shows ' + Math.round(shown * 100) + '%' });
    });
    return issues;
  }

  /** #/audit/<lesson>/<station>/<step>/<beat> — mount ONE visual step and freeze it there (for screenshots). */
  function inspect(root, lessonId, stId, k, beat) {
    const lesson = RV.lessons.get(lessonId);
    const st = lesson.stations.find((x) => x.id === stId);
    const step = st.steps[k];
    document.documentElement.style.setProperty('--lesson', lesson.color);
    const body = h('main', { class: 'player-body' });
    const host = h('div', { class: 'step step-' + step.type });
    body.appendChild(host);
    root.appendChild(h('div', { class: 'screen player' }, body));
    gsap.ticker.lagSmoothing(0);
    const inst = RV.steps[step.type].render(host, step, { lesson, station: st, mode: 'practice', onAnswer() {}, onReady() {} });
    for (let b = 0; b <= Math.min(beat, inst.beats - 1); b++) inst.beat(b);
    setTimeout(() => { const s = host.querySelector('.stage'); window.__inspect = s ? scan(s) : []; }, 2500);
    return { destroy() { inst.destroy(); gsap.ticker.lagSmoothing(500, 33); } };
  }

  window.__scan = scan; // (console helper)
  RV.screens.add('audit', {
    render(root, r) {
      const [, , only = '', onlySt, onlyStep, onlyBeat] = location.hash.split('/');
      if (onlySt) return inspect(root, only, onlySt, +onlyStep || 0, onlyBeat == null ? 99 : +onlyBeat);
      const status = h('h2', null, 'Layout audit…');
      const body = h('main', { class: 'player-body' });
      const log = h('ol', { class: 'selftest-log' });
      root.appendChild(h('div', { class: 'screen player' }, status, body));
      root.appendChild(log);
      const jobs = [];
      RV.availableLessons().filter((id) => !only || id === only).forEach((id) => {
        const lesson = RV.lessons.get(id);
        lesson.stations.forEach((st) => st.steps.forEach((step, k) => { if (step.visual || step.type === 'intro') jobs.push({ lesson, st, step, k }); }));
      });
      const soundWas = RV.store.setting('sound');
      RV.store.setSetting('sound', false);
      gsap.globalTimeline.timeScale(SPEED);
      gsap.ticker.lagSmoothing(0); // a hidden/background tab ticks ~1×/s: let animations keep real time
      const found = [];
      let stopped = false, j = 0, inst = null;
      const wait = (ms) => new Promise((res) => setTimeout(res, ms));

      async function run() {
        for (; j < jobs.length && !stopped; j++) {
          const job = jobs[j];
          status.textContent = `Layout audit ${j + 1}/${jobs.length} — ${job.lesson.id}/${job.st.id}#${job.k}`;
          RV.dom.clear(body);
          document.documentElement.style.setProperty('--lesson', job.lesson.color);
          const host = h('div', { class: 'step step-' + job.step.type });
          body.appendChild(host);
          try {
            inst = RV.steps[job.step.type].render(host, job.step, { lesson: job.lesson, station: job.st, mode: 'practice', onAnswer() {}, onReady() {} });
            for (let b = 0; b < inst.beats && !stopped; b++) {
              inst.beat(b);
              await wait(SETTLE);
              const stage = host.querySelector('.stage');
              if (!stage) continue;
              scan(stage).forEach((x) => {
                const key = `${job.lesson.id}/${job.st.id}#${job.k}:${x.kind}:${x.text}`;
                if (found.some((f) => f.key === key)) return;
                const anim = job.step.visual ? job.step.visual.anim : 'hero';
                found.push(Object.assign({ key, where: `${job.lesson.id}/${job.st.id}#${job.k} ${anim} beat ${b}` }, x));
                log.appendChild(h('li', null, `${job.lesson.id}/${job.st.id}#${job.k} ${anim} b${b} · ${x.kind} ${x.px} · ${x.cls} · ${x.text}`));
              });
            }
            inst.destroy(); inst = null;
          } catch (e) { found.push({ where: `${job.lesson.id}/${job.st.id}#${job.k}`, kind: 'error', text: e.message }); }
        }
        if (stopped) return;
        RV.dom.clear(body);
        gsap.globalTimeline.timeScale(1);
        gsap.ticker.lagSmoothing(500, 33);
        RV.store.setSetting('sound', soundWas);
        status.textContent = found.length ? `⚠️ LAYOUT AUDIT — ${found.length} issues in ${jobs.length} visuals (${innerWidth}×${innerHeight}, ${RV.i18n.lang})` : `✅ LAYOUT AUDIT PASS — ${jobs.length} visuals (${innerWidth}×${innerHeight}, ${RV.i18n.lang})`;
        window.__audit = { done: true, total: jobs.length, viewport: `${innerWidth}x${innerHeight}`, lang: RV.i18n.lang, issues: found };
      }
      window.__audit = { done: false };
      run();
      return {
        destroy() {
          stopped = true;
          if (inst && inst.destroy) inst.destroy();
          gsap.globalTimeline.timeScale(1);
          gsap.ticker.lagSmoothing(500, 33);
          RV.store.setSetting('sound', soundWas);
        },
      };
    },
  });
})();

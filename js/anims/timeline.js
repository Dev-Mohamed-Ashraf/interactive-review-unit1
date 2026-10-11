/* =========================================================
 * anims/timeline.js — eraTimeline: IT history as a time machine.
 *   props = { eras: [{ year, icon, title: bi, impact: bi }] }
 *   beat i → travel to era i (nodes are also tappable).
 * ========================================================= */
(function () {
  'use strict';

  RV.kit.defineAnim('eraTimeline', (stage, props, api) => {
    const { h } = api;
    const eras = props.eras || [];

    // big "display" area
    const glow = h('div', { class: 'et-glow' });
    const iconBox = h('div', { class: 'et-icon' });
    const year = h('div', { class: 'et-year mono' });
    const title = h('div', { class: 'et-title' });
    const impact = h('div', { class: 'et-impact' });
    const display = h('div', { class: 'et-display' }, glow, iconBox, year, title, impact);

    // timeline track
    const fill = h('div', { class: 'et-fill' });
    const runner = h('div', { class: 'et-runner' });
    const nodes = eras.map((e, i) => {
      const n = h('button', { class: 'et-node', type: 'button' }, h('span', { class: 'et-dot' }, api.icon(e.icon)), h('span', { class: 'et-node-year mono' }, e.year));
      n.addEventListener('click', () => { api.sound.play('tap'); go(i); });
      return n;
    });
    const track = h('div', { class: 'et-track' }, h('div', { class: 'et-line' }, fill, runner), h('div', { class: 'et-nodes' }, nodes));

    // twinkling star field
    const stars = h('div', { class: 'et-stars' });
    for (let i = 0; i < 40; i++) stars.appendChild(h('i', { style: { left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animationDelay: Math.random() * 3 + 's' } }));

    stage.append(stars, display, track);
    gsap.from(nodes, { y: 30, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' });
    gsap.to(glow, { scale: 1.15, opacity: 0.55, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(iconBox, { y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    let current = -1;
    let trans = null;
    function go(i) {
      if (i === current || !eras[i]) return;
      const dir = i > current ? 1 : -1;
      current = i;
      const e = eras[i];
      const pct = eras.length > 1 ? (i / (eras.length - 1)) * 100 : 0;
      nodes.forEach((n, k) => { n.classList.toggle('is-active', k === i); n.classList.toggle('is-past', k < i); });
      gsap.to(fill, { width: pct + '%', duration: 0.9, ease: 'power3.inOut' });
      gsap.to(runner, { left: pct + '%', duration: 0.9, ease: 'power3.inOut' });

      if (trans) trans.kill();
      gsap.killTweensOf([iconBox, year, title, impact], 'opacity,x,scale,rotate'); // keep the idle float (y)
      trans = gsap.timeline()
        .to([iconBox, year, title, impact], { opacity: 0, x: -40 * dir, duration: 0.25, stagger: 0.03, ease: 'power2.in' })
        .add(() => {
          iconBox.replaceChildren(api.icon(e.icon));
          year.textContent = e.year;
          title.textContent = api.t(e.title);
          impact.replaceChildren(api.icon('users'), h('span', null, api.t(e.impact)));
        })
        .fromTo(iconBox, { opacity: 0, x: 40 * dir, scale: 0.4, rotate: -20 * dir }, { opacity: 1, x: 0, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(2)' })
        .fromTo(year, { opacity: 0, x: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, '-=0.45')
        .fromTo(title, { opacity: 0, x: 0 }, { opacity: 1, duration: 0.01 }, '-=0.2')
        .add(() => RV.kit.revealText(title), '<')
        .fromTo(impact, { opacity: 0, x: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, '+=0.2');
      api.sound.play('whoosh');
    }

    return { beat(i) { go(Math.min(i, eras.length - 1)); } };
  });
})();

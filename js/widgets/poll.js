/* widgets/poll.js — "predict first": the student commits to a guess BEFORE
 * the next scene shows what really happens. No right/wrong here (the scene
 * reveals it), but the choice is remembered and echoed back.
 * q = { widget:'poll', prompt, options:[{ text: bi, emoji }], after?: bi } */
(function () {
  'use strict';
  const { h } = RV.dom;
  const W = RV.wkit;

  W.defineWidget('poll', {
    validate(q) {
      const e = [];
      W.v.bi(q.prompt, 'prompt', e);
      W.v.arr(q.options, 'options', e, 2);
      (q.options || []).forEach((o, i) => W.v.bi(o.text, `options[${i}].text`, e));
      if (q.after) W.v.bi(q.after, 'after', e);
      return e;
    },
    mount(el, q, ctx) {
      let chosen = null;
      const opts = q.options.map((o, i) => {
        const b = h('button', { class: 'poll-opt', type: 'button' }, h('span', { class: 'poll-emoji' }, o.emoji || '❓'), h('span', null, RV.rich(o.text)));
        b.addEventListener('click', () => choose(i));
        return b;
      });
      const after = h('div', { class: 'poll-after', hidden: true });
      RV.dom.add(el, h('div', { class: 'q-head' }, h('span', { class: 'q-tag poll-tag' }, '🤔 ', RV.i18n.t({ ar: 'توقّع الأول!', en: 'Predict first!' })), h('p', { class: 'q-prompt' }, RV.rich(q.prompt))),
        h('div', { class: 'poll-opts' }, opts), after);
      gsap.from(opts, { y: 30, opacity: 0, rotate: () => (Math.random() - 0.5) * 8, stagger: 0.1, duration: 0.5, ease: 'back.out(2)', clearProps: 'opacity,transform' }); // clear so .is-faded can dim the others

      function choose(i) {
        if (chosen !== null) return;
        chosen = i;
        RV.sound.play('pop');
        opts.forEach((b, k) => b.classList.toggle(k === i ? 'is-chosen' : 'is-faded', true));
        gsap.fromTo(opts[i], { scale: 1 }, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1 });
        after.hidden = false;
        after.replaceChildren(h('b', null, RV.i18n.t({ ar: 'اخترت: ', en: 'Your guess: ' })), q.options[i].emoji || '', ' ', RV.rich(q.options[i].text), h('p', null, RV.rich(q.after || { ar: 'يلا نشوف اللي هيحصل فعلًا في المشهد الجاي 👀', en: 'Let’s see what really happens next 👀' })));
        gsap.from(after, { y: 16, opacity: 0, duration: 0.4 });
        RV.game.event('poll', { xp: 5, anchor: opts[i] });
        if (ctx.onAnswer) ctx.onAnswer({ correct: false, score: 0, max: 0, poll: i });
      }
      return { reveal() { if (chosen === null) choose(0); } };
    },
  });
})();

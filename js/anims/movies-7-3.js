/* =========================================================
 * anims/movies-7-3.js — lesson 7-3 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   llmMovie : next-word prediction (probabilities) · hallucination ·
 *              what makes it "large" + new abilities · RLHF (3 steps) ·
 *              what RLHF does and does not fix · multimodality ·
 *              safe use (verify dates, names, numbers)
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  /* candidate next words with probabilities (bars grow from the reading side) */
  const PROB = (L) => {
    const R = MK.RTL();
    const rows = [[L('مشمس', 'sunny'), 62, '#34d399'], [L('حار', 'hot'), 25, '#38bdf8'], [L('بارد', 'cold'), 13, '#94a3b8']];
    return rows.map(([w, p, c], k) => {
      const y = 30 + k * 86, W = p * 9;
      return `<text x="${R ? 1040 : 20}" y="${y + 42}" text-anchor="${R ? 'end' : 'start'}" font-size="36" font-weight="900" fill="#e2e8f0" style="direction:${R ? 'rtl' : 'ltr'}">${w}</text>
        <rect class="pb${k === 0 ? ' top' : ''}" data-w="${W}" x="${R ? 860 - W : 200}" y="${y + 6}" width="${W}" height="50" rx="12" fill="${c}"/>
        <text x="${R ? 860 - W - 14 : 200 + W + 14}" y="${y + 44}" text-anchor="${R ? 'end' : 'start'}" font-size="32" font-weight="900" fill="${c}">${p}%</text>`;
    }).join('');
  };

  K.defineAnim('llmMovie', (stage, props, api) => {
    const U = MK.uiL('lm-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-data mv-l73', prefix: 'lm-', beats: 8, cast: { 'ch-q': 'student', 'ch-r': 'engineer', 'ch-c': 'studentL' },
      html: (L) => `
  <div id="lm-stage" class="mv-stage">
    <div id="lm-sent" class="box t-violet later" style="inset-inline-start:160px;top:170px;width:1600px;font-size:54px;padding:22px 30px">
      <span id="lm-w0">${L('طقس اليوم', 'Today’s weather is')}</span> <span id="lm-w1" style="color:#86efac">${L('مشمس', 'sunny')}</span> <span id="lm-w2" style="color:#86efac">${L('و', 'and')}</span><span id="lm-w3" style="color:#86efac">${L('دافئ', ' warm')}</span> <span id="lm-cur" style="color:#fbbf24">▌</span></div>
    ${U.art('prob', 160, 330, 1060, 280, '0 0 1060 280', PROB(L))}
    ${U.box('how', 1280, 340, 560, 't-amber', { h: L('نموذج اللغة', 'A language model'), p: L('يتنبّأ بالكلمة المحتملة الجاية… ويكرّر', 'predicts the likely next word… and repeats'), s: L('بيختار المحتمل إحصائيًا — مش المؤكد صحّته', 'picks the statistically likely — not the surely correct') })}

    ${U.ch('ch-q', 80, 300, 'md')}
    ${U.pill('qq', 340, 190, '🙋‍♂️ ' + L('مسجد أحمد بن طولون اتبنى إمتى؟', 'When was the Mosque of Ibn Tulun built?'), 't-slate')}
    ${U.box('ans', 340, 300, 900, 't-blue', { ic: '🤖', p: L('«اتبنى سنة 1150م بأمر صلاح الدين» — بثقة كاملة!', '"It was built in 1150 AD by order of Saladin" — fully confident!') })}
    ${U.xc('xx', 1180, 300)}
    ${U.pill('tr', 340, 520, '📚 ' + L('الحقيقة: 876–879م بأمر أحمد بن طولون', 'The fact: 876–879 AD, by Ahmad ibn Tulun'), 't-green')}
    ${U.box('hb', 1320, 190, 520, 't-red', { h: L('الهلوسة', 'Hallucination'), p: L('رد مقنع بس مخالف للحقيقة', 'a convincing reply that is factually wrong'), s: L('لأنه بيختار المحتمل مش الصح', 'because it picks the likely, not the true') })}
    ${U.pill('chk', 340, 620, '✔ ' + L('اتحقّق من التواريخ والأسماء والأرقام', 'Verify dates, names and numbers'), 'solid')}

    ${U.box('dat', 90, 180, 820, 't-blue', { ic: '📚', h: L('كمية بيانات التدريب', 'Amount of training data'), p: L('نصوص إنترنت هائلة: مليارات لتريليونات كلمة (Tokens)', 'vast Internet text: billions to trillions of words (tokens)') })}
    ${U.box('par', 1010, 180, 820, 't-violet', { ic: '⚙️', h: L('عدد المعلمات', 'Number of parameters'), p: L('قيم الأوزان: مليارات لتريليونات', 'the weights: billions to trillions') })}
    ${U.pill('emg', 90, 470, '✨ ' + L('بعد حجم معيّن تظهر قدرات جديدة:', 'Past a certain scale new abilities appear:'), 'solid')}
    ${['🧠 ' + L('استدلال', 'reasoning'), '📝 ' + L('تلخيص', 'summarizing'), '🌍 ' + L('ترجمة', 'translation'), '💻 ' + L('كود', 'code')]
      .map((t, k) => U.pill('ab' + k, 90 + k * 290, 570, t, 't-green')).join('')}
    ${U.pill('svc', 1300, 570, '💬 ChatGPT · Claude · Gemini', 't-slate')}

    ${U.box('r0', 70, 180, 570, 't-blue', { ic: '📚', h: '① ' + L('تدريب أولي', 'Initial training'), p: L('يتعلّم استخدام اللغة من نصوص كتير', 'learns how language is used from lots of text') })}
    ${U.box('r1', 675, 180, 570, 't-amber', { ic: '👍👎', h: '② ' + L('تقييم بشري', 'Human evaluation'), p: L('«أنهي رد أحسن؟» A ولا B', '"which reply is better?" A or B') })}
    ${U.box('r2', 1280, 180, 570, 't-green', { ic: '🏆', h: '③ ' + L('ضبط بالتعلّم المعزَّز', 'Tuning by RL'), p: L('التقييم البشري = مكافأة', 'the human rating = the reward') })}
    ${U.ch('ch-r', 820, 430, 'sm')}
    ${U.pill('ra', 1060, 470, 'A 👍', 't-green')}
    ${U.pill('rb', 1060, 560, 'B 👎', 't-red')}
    ${U.pill('rres', 90, 470, '✅ ' + L('ردود طبيعية ومهذّبة', 'natural, polite replies'), 't-green')}
    ${U.pill('rres2', 90, 570, '🎯 ' + L('مناسبة للقصد · بتتجنّب غير المناسب', 'fit the intent · avoid the inappropriate'), 't-green')}

    ${U.box('yes', 90, 180, 820, 't-green', { ic: '✔', h: L('RLHF بيحسّن', 'RLHF improves'), p: L('إتباع التعليمات · الأسلوب · جزء من الأمان', 'following instructions · tone · some safety') })}
    ${U.box('no', 1010, 180, 820, 't-red', { ic: '✘', h: L('ومابيضمنش', 'and does not guarantee'), p: L('الحقيقة · الأمان الكامل', 'truth · complete safety') })}
    ${U.pill('big', 260, 480, '📏 ' + L('نموذج أكبر = أطلق في الكلام… مش بالضرورة أصدق', 'A bigger model = more fluent… not necessarily more truthful'), 'solid')}

    ${U.box('mm', 660, 290, 600, 't-violet', { ic: '🤖', h: L('نموذج واحد', 'One model'), p: L('كل الوسائط = أرقام جوّه الشبكة', 'every modality = numbers inside the network') })}
    ${[['📝', L('نص', 'Text'), 150, 200], ['🖼️', L('صورة', 'Image'), 1380, 200], ['🔊', L('صوت', 'Audio'), 150, 470], ['🎬', L('فيديو', 'Video'), 1380, 470]]
      .map(([e, t, x, y], k) => U.box('md' + k, x, y, 380, 't-blue', { ic: e, h: t })).join('')}
    ${U.pill('num', 600, 560, '<span class="code">[0.12, −0.48, 0.91, …]</span>', 't-slate')}
    ${U.pill('mx', 300, 650, '🖼️→📝 ' + L('وصف صورة', 'describe an image') + ' · 🔊→📝 ' + L('تفريغ صوت', 'transcribe audio') + ' · 📝→🖼️ ' + L('توليد صورة', 'generate an image'), 't-green')}

    ${U.ch('ch-c', 80, 300, 'md')}
    ${U.box('ok', 340, 190, 700, 't-green', { ic: '✔', h: L('يساعد في', 'Helps with'), p: L('مسودة · تنظيم · صياغة', 'drafting · organizing · wording') })}
    ${U.box('bad', 1110, 190, 720, 't-red', { ic: '✘', h: L('ماتثقش زي ما هو في', 'Do not trust as-is'), p: L('تواريخ · أسماء · أرقام', 'dates · names · numbers') })}
    ${U.pill('rule', 340, 460, '📋 ' + L('القاعدة: كل تاريخ واسم ورقم يتراجع من مصدر موثوق قبل النشر', 'Rule: check every date, name and number against a reliable source before publishing'), 'solid')}
    ${U.pill('hum', 340, 570, '🧑‍🏫 ' + L('وإنسان يراجع المقال قبل ما يتنشر', 'and a person reviews the article before it is published'), 't-violet')}

    ${U.hd(0, '🔮 ' + L('التنبّؤ بالكلمة الجاية', 'Next-word prediction'))}
    ${U.hd(1, '🌀 ' + L('الهلوسة', 'Hallucination'))}
    ${U.hd(2, '🏔️ ' + L('يعني إيه «كبير»؟', 'What makes it "large"?'))}
    ${U.hd(3, '👍 ' + L('الضبط بـ RLHF', 'Tuning by RLHF'))}
    ${U.hd(4, '⚖️ ' + L('RLHF… بيصلّح إيه ومابيصلّحش إيه؟', 'RLHF… what it fixes and what it does not'))}
    ${U.hd(5, '🎛️ ' + L('تعدّد الوسائط', 'Multimodality'))}
    ${U.hd(6, '🛡️ ' + L('استخدمه بأمان', 'Use it safely'))}
    ${U.nt(0, L('«طقس اليوم» ← «مشمس» ← «و» ← «دافئ»: كلمة كلمة', '"Today’s weather is" → "sunny" → "and" → "warm": word by word'), 'ok')}
    ${U.nt(2, L('«كبير» = البيانات والمعلمات — الاتنين مع بعض', '"Large" = data AND parameters — both together'), 'warn')}
    ${U.nt(3, L('الترتيب: تدريب أولي ← تقييم بشري ← ضبط معزَّز', 'Order: initial training → human evaluation → RL tuning'), 'warn')}
  </div>
  <div id="lm-recap" class="mv-recap">
    ${U.hd(7, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 120, 180, '🔮 ' + L('بيتنبّأ بالكلمة المحتملة… مش المؤكدة ← هلوسة', 'Predicts the likely word… not the sure one → hallucination'), 't-violet')}
    ${U.pill('x1', 120, 290, '🏔️ ' + L('LLM = بيانات هائلة + مليارات المعلمات', 'LLM = vast data + billions of parameters'), 't-blue')}
    ${U.pill('x2', 120, 400, '👍 ' + L('RLHF بيحسّن الأسلوب… مش بيضمن الحقيقة', 'RLHF improves style… does not guarantee truth'), 't-amber')}
    ${U.pill('x3', 120, 510, '🎛️ ' + L('تعدّد الوسائط: نص + صورة + صوت في نموذج واحد', 'Multimodality: text + image + audio in one model'), 't-green')}
  </div>`,
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#lm-' + id + ' .' + c);
    const R = MK.RTL();
    ['w1', 'w2', 'w3'].forEach((w) => tl.set(q(w), { opacity: 0 }, 0));

    /* 0 — next-word prediction */
    let c = at(0);
    frame(0, c, 6.6);
    IN(q('sent'), c + 0.4, 0.5, { y: -20 });
    tl.fromTo(q('cur'), { opacity: 1 }, { opacity: 0, duration: 0.3, yoyo: true, repeat: 5 }, c + 0.8);
    IN(q('prob'), c + 1.2, 0.4);
    sel('prob', 'pb').forEach((r, k) => {
      const W = +r.getAttribute('data-w');
      tl.fromTo(r, { attr: { width: 0, x: R ? 860 : 200 } }, { attr: { width: W, x: R ? 860 - W : 200 }, duration: 0.7, ease: 'power2.out' }, c + 1.4 + k * 0.25);
    });
    SND('tap', c + 1.4);
    tl.fromTo(sel('prob', 'top'), { opacity: 1 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 3 }, c + 2.6);
    tl.to(q('w1'), { opacity: 1, duration: 0.3 }, c + 3.4); SND('pop', c + 3.4);
    tl.to(q('w2'), { opacity: 1, duration: 0.3 }, c + 4.2); SND('pop', c + 4.2);
    tl.to(q('w3'), { opacity: 1, duration: 0.3 }, c + 5.0); SND('pop', c + 5.0);
    IN(q('how'), c + 5.6, 0.5, { x: 40 * sx });

    /* 1 — hallucination */
    c = at(1);
    frame(1, c);
    OUT(Q('sent prob how'), c, 0.4);
    IN(q('ch-q'), c + 0.5, 0.5, { x: -60 * sx });
    IN(q('qq'), c + 1.0, 0.4, { x: 30 * sx }); SND('pop', c + 1.0);
    IN(q('ans'), c + 1.8, 0.5, { y: 20 }); SND('ok', c + 1.8);
    POP(q('xx'), c + 3.0, 0.4); SND('bad', c + 3.0);
    M.mood('ch-q', true, c + 3.0);
    IN(q('tr'), c + 3.6, 0.4, { y: 20 });
    IN(q('hb'), c + 4.4, 0.5, { x: 40 * sx });
    IN(q('chk'), c + 5.2, 0.4, { y: 20 }); SND('ok', c + 5.2);
    M.mood('ch-q', false, c + 5.2);

    /* 2 — large */
    c = at(2);
    frame(2, c, 6.6);
    OUT(Q('ch-q qq ans xx tr hb chk'), c, 0.4);
    IN(q('dat'), c + 0.5, 0.5, { x: -40 * sx }); SND('pop', c + 0.5);
    IN(q('par'), c + 1.3, 0.5, { x: 40 * sx }); SND('pop', c + 1.3);
    POP(q('emg'), c + 2.4, 0.45);
    [0, 1, 2, 3].forEach((k) => { IN(q('ab' + k), c + 3.0 + k * 0.4, 0.35, { y: 20 }); SND('pop', c + 3.0 + k * 0.4); });
    IN(q('svc'), c + 4.8, 0.4, { y: 20 });

    /* 3 — RLHF */
    c = at(3);
    frame(3, c, 6.0);
    OUT(Q('dat par emg ab0 ab1 ab2 ab3 svc'), c, 0.4);
    IN(q('r0'), c + 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5);
    IN(q('r1'), c + 1.4, 0.5, { y: 30 }); SND('pop', c + 1.4);
    IN(q('ch-r'), c + 1.8, 0.4, { y: 30 });
    IN(q('ra'), c + 2.4, 0.3, { x: 20 * sx }); IN(q('rb'), c + 2.8, 0.3, { x: 20 * sx }); SND('tap', c + 2.8);
    IN(q('r2'), c + 3.6, 0.5, { y: 30 }); SND('ok', c + 3.6);
    IN(q('rres'), c + 4.4, 0.4, { x: 30 * sx });
    IN(q('rres2'), c + 5.0, 0.4, { x: 30 * sx });

    /* 4 — what RLHF fixes and does not */
    c = at(4);
    frame(4, c);
    OUT(Q('r0 r1 r2 ch-r ra rb rres rres2'), c, 0.4);
    IN(q('yes'), c + 0.5, 0.5, { x: -40 * sx }); SND('ok', c + 0.5);
    IN(q('no'), c + 1.5, 0.5, { x: 40 * sx }); SND('bad', c + 1.5);
    POP(q('big'), c + 2.8, 0.5);

    /* 5 — multimodality */
    c = at(5);
    frame(5, c);
    OUT(Q('yes no big'), c, 0.4);
    POP(q('mm'), c + 0.5, 0.5); SND('pop', c + 0.5);
    [0, 1, 2, 3].forEach((k) => { IN(q('md' + k), c + 1.2 + k * 0.4, 0.4, { scale: 0.8 }); SND('pop', c + 1.2 + k * 0.4); });
    tl.fromTo(q('mm'), { boxShadow: '0 0 0 rgba(0,0,0,0)' }, { boxShadow: '0 0 60px #a78bfa', duration: 0.4, yoyo: true, repeat: 3 }, c + 3.0);
    IN(q('num'), c + 3.0, 0.4, { y: 20 });
    IN(q('mx'), c + 4.2, 0.4, { y: 20 }); SND('ok', c + 4.2);

    /* 6 — use it safely */
    c = at(6);
    frame(6, c);
    OUT(Q('mm md0 md1 md2 md3 num mx'), c, 0.4);
    IN(q('ch-c'), c + 0.5, 0.5, { x: -60 * sx });
    IN(q('ok'), c + 1.0, 0.5, { y: 20 }); SND('ok', c + 1.0);
    IN(q('bad'), c + 1.8, 0.5, { y: 20 }); SND('bad', c + 1.8);
    POP(q('rule'), c + 3.0, 0.5);
    IN(q('hum'), c + 4.0, 0.4, { y: 20 }); SND('ok', c + 4.0);

    /* 7 — recap */
    c = at(7);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd7'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    /* living loops */
    M.loop(0, 6.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(q('cur'), { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'steps(1)' }));
    /* the model keeps re-predicting the next word: the bars re-grow, the top one wins */
    M.loop(0, 6.4, () => { const x = gsap.timeline({ repeat: -1, repeatDelay: 1.2 }); sel('prob', 'pb').forEach((r, k) => { const W = +r.getAttribute('data-w'); x.fromTo(r, { attr: { width: 0, x: R ? 860 : 200 } }, { attr: { width: W, x: R ? 860 - W : 200 }, duration: 0.7, ease: 'power2.out' }, k * 0.2); }); return x.fromTo(sel('prob', 'top'), { opacity: 1 }, { opacity: 0.4, duration: 0.2, yoyo: true, repeat: 3 }); });
    M.loop(1, 6.0, () => gsap.timeline({ repeat: -1, repeatDelay: 1.6 }).fromTo(q('xx'), { scale: 1, rotation: 0 }, { scale: 1.15, rotation: -8, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }));
    M.loop(2, 5.6, () => M.bob(Q('ab0 ab1 ab2 ab3'), 6, 1.0));
    M.loop(3, 5.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(Q('ra rb'), { scale: 1 }, { scale: 1.12, duration: 0.3, stagger: 0.6, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }).add(M.cycle(Q('r0 r1 r2'), 'rgba(52,211,153,.85)', 0.5).repeat(0)));
    M.loop(4, 3.6, () => M.cycle(Q('yes no'), 'rgba(251,191,36,.85)', 0.8));
    M.loop(5, 5.0, () => M.glowLoop(q('mm'), 'rgba(167,139,250,.95)', 1.0));
    M.loop(5, 5.0, () => M.bob(Q('md0 md1 md2 md3'), 7, 1.2));
    M.loop(6, 4.6, () => M.glowLoop(q('rule'), 'rgba(251,191,36,.85)'));
    return M.done();
  });
})();

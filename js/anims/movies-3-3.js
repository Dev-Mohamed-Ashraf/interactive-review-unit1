/* =========================================================
 * anims/movies-3-3.js — lesson 3-3 teacher-driven movie, drawn in the lesson
 * 1-2 look (MK.look · css/anims-movies-l12.css).
 *   frontendMovie (stations trio 0–3 · modern 4–8): a code editor beside a live
 *     page and a house: HTML builds the frame · CSS paints it · JavaScript wires
 *     the lights · semantic tags · accessibility + SEO · one page on three
 *     screens · frameworks · recap
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;

  const HOUSE = `<g class="frm" fill="none" stroke="#94a3b8" stroke-width="8" stroke-linejoin="round"><path d="M40 150 L200 30 L360 150"/><rect x="70" y="140" width="260" height="200"/><rect x="170" y="240" width="60" height="100"/><rect x="100" y="180" width="50" height="50"/><rect x="250" y="180" width="50" height="50"/></g>
    <g class="paint" opacity="0"><path d="M40 150 L200 30 L360 150Z" fill="#ef4444"/><rect x="70" y="140" width="260" height="200" fill="#fbbf24"/><rect x="170" y="240" width="60" height="100" fill="#92400e"/><rect x="100" y="180" width="50" height="50" fill="#bae6fd"/><rect x="250" y="180" width="50" height="50" fill="#bae6fd"/></g>
    <g class="lights" opacity="0"><rect x="100" y="180" width="50" height="50" fill="#fde047"/><rect x="250" y="180" width="50" height="50" fill="#fde047"/><circle cx="200" cy="110" r="16" fill="#fde047"/></g>`;

  K.defineAnim('frontendMovie', (stage, props, api) => {
    const P = 'f3-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l12 mv-l33', prefix: P, beats: 9,
      html: (L) => `
  <div id="f3-s0" class="mv-stage">
    ${[['🏗️', 'HTML', L('البنية (الهيكل)', 'structure'), 'c-amber'], ['🎨', 'CSS', L('المظهر', 'appearance'), 'c-blue'], ['💡', 'JavaScript', L('السلوك والتفاعل', 'behavior'), 'c-violet']]
      .map(([ic, h, p, c], k) => B.card('t' + k, 70 + k * 420, 170, 390, 300, c, { ic, h: `<bdi>${h}</bdi>`, p })).join('')}
    ${B.svg('h0', 1380, 150, 420, 380, '0 0 400 360', HOUSE)}
    ${B.mid('tog', 560, '🧩 ' + L('كل تقنية ليها دور مختلف… ومش لازم الصفحة تستخدم التلاتة مع بعض', 'each has its own role… the page is made with all of them together'), 'c-slate big')}
  </div>

  <div id="f3-ed" class="mv-stage">
    <div id="f3-code" class="l12u l12-editor later" style="${B.at(70, 140, 700, 440)}"><div class="tabs"><span class="tb t0">index.html</span><span class="tb t1">style.css</span><span class="tb t2">app.js</span></div>
      <pre class="c c0"><span>&lt;h1&gt;Nile Shop&lt;/h1&gt;</span><span>&lt;p&gt;Best prices&lt;/p&gt;</span><span>&lt;img src="bag.png"&gt;</span><span>&lt;button&gt;Add to cart&lt;/button&gt;</span></pre>
      <pre class="c c1"><span>h1 { color: #2563eb; }</span><span>body { background: #fef3c7; }</span><span>button { border-radius: 20px; }</span></pre>
      <pre class="c c2"><span>button.onclick = () =&gt; {</span><span>  cart.count += 1;</span><span>  show(cart);</span><span>}</span></pre></div>
    <div id="f3-pg" class="l12u l12-win l12-page later" style="${B.at(820, 140, 600, 440)}"><div class="wbar"><i></i><i></i><i></i><span class="url">nile-shop.com</span><span class="cart">🛒 <bdi class="n0">0</bdi><bdi class="n1">1</bdi></span></div>
      <div class="wbody"><h4 class="ttl">Nile Shop</h4><p class="sub">Best prices</p><div class="pic">👜</div><button class="btn">Add to cart</button><span class="cur">👆</span></div></div>
    ${B.svg('hs', 1460, 170, 400, 360, '0 0 400 360', HOUSE)}
    ${B.chip('an0', 1460, 560, '🏗️ ' + L('HTML = هيكل المبنى', 'HTML = the frame'), 'c-amber', 400)}
    ${B.chip('an1', 1460, 560, '🎨 ' + L('CSS = الديكور', 'CSS = the decoration'), 'c-blue', 400)}
    ${B.chip('an2', 1460, 560, '💡 ' + L('JS = الكهربا والسباكة', 'JS = electricity & plumbing'), 'c-violet', 400)}
    ${B.chip('d0', 70, 620, 'HTML: ' + L('بيوصف العناصر: عناوين · فقرات · صور · روابط', 'describes elements: headings · paragraphs · images · links'), 'c-amber big')}
    ${B.chip('d1', 70, 620, 'CSS: ' + L('الألوان · التخطيط · الحجم · الخطوط', 'colors · layout · size · fonts'), 'c-blue big')}
    ${B.chip('d2', 70, 620, 'JS: ' + L('بيرد على الضغط وبيحدّث جزء بس من الشاشة', 'responds to clicks and updates only part of the screen'), 'c-violet big')}
    ${B.chip('trp', 70, 700, '⚠️ ' + L('فخ: «CSS بيضيف السلوك» ← غلط', 'trap: “CSS adds behavior” → false'), 'c-red')}
  </div>

  <div id="f3-s4" class="mv-stage">
    <div id="f3-sem" class="l12u l12-blocks later" style="${B.at(70, 140, 820, 460)}"><b class="hd">&lt;header&gt; ${L('أعلى الصفحة', 'top')}</b><b class="nv">&lt;nav&gt; ${L('التنقّل', 'navigation')}</b><b class="mn">&lt;main&gt; ${L('المحتوى الرئيسي', 'main content')}</b><b class="ft">&lt;footer&gt; ${L('أسفل الصفحة', 'bottom')}</b></div>
    <div id="f3-div" class="l12u l12-blocks gray later" style="${B.at(1040, 140, 820, 460)}"><b>&lt;div&gt;</b><b>&lt;div&gt;</b><b class="mn">&lt;div&gt;</b><b>&lt;div&gt;</b></div>
    ${B.stamp('ok', 260, 630, '✓ ' + L('بتدل على المعنى', 'they mean something'), true)}
    ${B.stamp('no', 1240, 630, '✗ ' + L('صناديق ملهاش معنى', 'meaningless boxes'))}
  </div>
  <div id="f3-s5" class="mv-stage">
    ${B.card('acc', 70, 150, 860, 380, 'c-green', { ic: '🔊', h: L('① إمكانية الوصول', '① Accessibility'), p: L('برامج قراءة الشاشة بتفهم بنية الصفحة — فالمعلومة توصل لذوي الإعاقة البصرية', 'screen readers understand the structure — information reaches visually impaired users'), html: `<div class="l12-say">«header… nav… main…» 🔊</div>` })}
    ${B.card('seo', 990, 150, 870, 380, 'c-blue', { ic: '🔎', h: L('② SEO — تحسين محركات البحث', '② SEO'), p: L('ممكن تساعد محركات البحث تفهم البنية — بس مابتضمنش ترتيب أعلى', 'search engines understand the content and show the page properly'), html: `<div class="l12-rank"><span class="me">1. nile-shop.com ✓</span><span>2. ...</span></div>` })}
    ${B.mid('fast', 590, '⚠️ ' + L('مش بالضرورة بتخلّي الصفحة أسرع!', 'it does NOT necessarily make the page faster!'), 'c-red big')}
  </div>
  <div id="f3-s6" class="mv-stage">
    <div id="f3-dev" class="l12u l12-dev later" style="${B.at(500, 150, 920, 420)}"><div class="g"><span>🛍️</span><span>👟</span><span>🎧</span><span>⌚</span><span>📱</span><span>🎒</span></div></div>
    ${B.chip('w0', 160, 250, '🖥️ ' + L('كمبيوتر', 'PC'), 'c-blue big', 260)}${B.chip('w1', 160, 350, '📟 ' + L('تابلت', 'tablet'), 'c-blue big', 260)}${B.chip('w2', 160, 450, '📱 ' + L('موبايل', 'phone'), 'c-blue big', 260)}
    ${B.chip('one', 1480, 250, '1️⃣ ' + L('صفحة واحدة', 'one page'), 'c-green big', 380)}
    ${B.chip('mf', 160, 620, '📱 ' + L('نهج الأولوية للجوال: مراعاة الشاشات الصغيرة من بداية التصميم', 'mobile-first: start designing from small screens'), 'c-amber big')}
  </div>
  <div id="f3-s7" class="mv-stage">
    ${B.card('box', 70, 150, 600, 420, 'c-slate', { ic: '🧰', h: L('مكوّنات جاهزة', 'Ready-made parts'), html: `<div class="l12-parts"><span>🔘 Button</span><span>🧾 Card</span><span>☰ Navbar</span><span>📝 Form</span></div>` })}
    ${[['⚛️', 'React', L('مكتبة JavaScript لبناء الواجهات من مكوّنات قابلة لإعادة الاستخدام', 'by Meta: updates part of the screen efficiently — big apps'), 'c-blue'],
      ['🟩', 'Vue', L('بسيط: تبني تدريجيًا من ميزات صغيرة', 'simple: build up gradually from small features'), 'c-green'],
      ['▲', 'Next.js', L('إطار مبني على React: التوجيه وطرق عرض الصفحات', 'React’s strengths + faster page display'), 'c-slate']]
      .map(([ic, h, p, c], k) => B.card('fw' + k, 720, 150 + k * 150, 1140, 0, c, { row: true, ic, h: `<bdi>${h}</bdi>`, p })).join('')}
    ${B.mid('fd', 640, '🧱 ' + L('الإطار = وظائف ومكوّنات جاهزة ← تطوير أكفأ من غير ما تكتب كل حاجة من الصفر', 'a framework = ready functions and parts → efficient building, not everything from scratch'), 'c-amber')}
  </div>
  <div id="f3-s8" class="mv-stage">
    ${[['🏗️', 'HTML', L('يبني', 'structures'), 'c-amber'], ['🎨', 'CSS', L('ينسّق', 'styles'), 'c-blue'], ['💡', 'JavaScript', L('يتصرّف', 'behaves'), 'c-violet']]
      .map(([ic, h, p, c], k) => B.card('r' + k, 70 + k * 600, 150, 570, 240, c, { ic, h: `<bdi>${h}</bdi>`, k: p })).join('')}
    ${[['🏷️', L('HTML الدلالية: وصول + SEO', 'semantic HTML: access + SEO')], ['📱', L('المتجاوب: أي شاشة', 'responsive: any screen')], ['🧰', L('الأطر: بناء أكفأ', 'frameworks: efficient building')]]
      .map(([ic, t], k) => B.chip('m' + k, 70 + k * 600, 450, ic + ' ' + t, 'c-green big', 570)).join('')}
  </div>
    ${U.hd(0, '🧱 ' + L('الصفحة = تلات تقنيات', 'A page = three technologies'))}
    ${U.hd(1, '🏗️ ' + L('HTML: البنية', 'HTML: structure'))}
    ${U.hd(2, '🎨 ' + L('CSS: المظهر', 'CSS: appearance'))}
    ${U.hd(3, '💡 ' + L('JavaScript: السلوك والتفاعل', 'JavaScript: behavior'))}
    ${U.hd(4, '🏷️ ' + L('HTML الدلالية', 'Semantic HTML'))}
    ${U.hd(5, '🎯 ' + L('فوايد HTML الدلالية', 'Why semantic HTML?'))}
    ${U.hd(6, '📱 ' + L('التصميم المتجاوب', 'Responsive design'))}
    ${U.hd(7, '🧰 ' + L('الأطر (Frameworks)', 'Frameworks'))}
    ${U.hd(8, '📌 ' + L('الخلاصة', 'Recap'))}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const tab = (k, t) => { tl.to(all('#f3-code .c'), { opacity: 0, duration: 0.2 }, t); tl.to(all('#f3-code .tb'), { opacity: 0.45, duration: 0.2 }, t); tl.to(all('#f3-code .t' + k), { opacity: 1, duration: 0.2 }, t + 0.1); tl.to(all('#f3-code .c' + k), { opacity: 1, duration: 0.1 }, t + 0.2);
      tl.fromTo(all(`#f3-code .c${k} span`), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.25, stagger: 0.35 }, t + 0.3); };
    const swap = (o, n, t) => { if (o) OUT(q(o), t, 0.2); IN(q(n), t + 0.2, 0.4, { y: 12 }); };

    /* 0 — three technologies */
    let c = at(0);
    frame(0, c);
    [0, 1, 2].forEach((k) => { IN(q('t' + k), c + 0.4 + k * 0.6, 0.5, { y: 30 }); SND('pop', c + 0.4 + k * 0.6); });
    IN(q('h0'), c + 2.4, 0.4);
    tl.fromTo(all('#f3-h0 .frm *'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, stagger: 0.1 }, c + 2.5);
    tl.to(all('#f3-h0 .paint'), { opacity: 1, duration: 0.6 }, c + 3.8);
    tl.to(all('#f3-h0 .lights'), { opacity: 1, duration: 0.3 }, c + 4.6);
    POP(q('tog'), c + 5.4, 0.5);

    /* 1 — HTML builds the structure */
    c = at(1);
    frame(1, c);
    OUT(q('s0'), c, 0.4);
    IN(Q('code pg hs'), c + 0.4, 0.5, { y: 24 });
    tab(0, c + 0.8);
    tl.fromTo(all('#f3-pg .ttl, #f3-pg .sub, #f3-pg .pic, #f3-pg .btn'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.35 }, c + 1.2);
    tl.fromTo(all('#f3-hs .frm *'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9, stagger: 0.12 }, c + 1.4); SND('pop', c + 1.4);
    swap(null, 'an0', c + 3.4); swap(null, 'd0', c + 4.0);

    /* 2 — CSS paints it */
    c = at(2);
    frame(2, c);
    tab(1, c + 0.4);
    tl.to(all('#f3-pg .wbody'), { backgroundColor: '#fef3c7', duration: 0.6 }, c + 1.3);
    tl.to(all('#f3-pg .ttl'), { color: '#2563eb', fontSize: '52px', duration: 0.6 }, c + 1.6);
    tl.to(all('#f3-pg .btn'), { borderRadius: '24px', backgroundColor: '#2563eb', color: '#fff', duration: 0.6 }, c + 2.0);
    tl.to(all('#f3-hs .paint'), { opacity: 1, duration: 0.8 }, c + 1.6); SND('ok', c + 2.4);
    swap('an0', 'an1', c + 3.2); swap('d0', 'd1', c + 3.6);

    /* 3 — JavaScript wires the behaviour */
    c = at(3);
    frame(3, c);
    tab(2, c + 0.4);
    tl.fromTo(all('#f3-pg .cur'), { opacity: 0, x: 60, y: 60 }, { opacity: 1, x: 0, y: 0, duration: 0.6 }, c + 1.8);
    tl.fromTo(all('#f3-pg .btn'), { scale: 1 }, { scale: 0.9, duration: 0.12, yoyo: true, repeat: 1 }, c + 2.5); SND('tap', c + 2.5);
    tl.to(all('#f3-pg .n0'), { opacity: 0, duration: 0.1 }, c + 2.7); tl.fromTo(all('#f3-pg .n1'), { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.3 }, c + 2.7);
    tl.fromTo(all('#f3-pg .cart'), { backgroundColor: 'rgba(52,211,153,0)' }, { backgroundColor: 'rgba(52,211,153,.6)', duration: 0.3, yoyo: true, repeat: 3 }, c + 2.7); SND('ok', c + 2.8);
    tl.to(all('#f3-hs .lights'), { opacity: 1, duration: 0.3 }, c + 2.9);
    swap('an1', 'an2', c + 3.6); swap('d1', 'd2', c + 4.0);
    IN(q('trp'), c + 5.2, 0.4, { y: 12 });

    /* 4 — semantic HTML */
    c = at(4);
    frame(4, c);
    OUT(q('ed'), c, 0.4);
    IN(q('sem'), c + 0.5, 0.5, { x: -30 * sx });
    tl.fromTo(all('#f3-sem b'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.4 }, c + 0.9); SND('pop', c + 0.9);
    IN(q('div'), c + 2.8, 0.5, { x: 30 * sx });
    stampIn(M, q('ok'), c + 4.0); SND('ok', c + 4.0);
    stampIn(M, q('no'), c + 4.8); SND('bad', c + 4.8);

    /* 5 — accessibility + SEO */
    c = at(5);
    frame(5, c);
    OUT(q('s4'), c, 0.4);
    IN(q('acc'), c + 0.5, 0.5, { y: 30 });
    tl.fromTo(all('#f3-acc .l12-say'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'none' }, c + 1.2);
    IN(q('seo'), c + 2.6, 0.5, { y: 30 });
    tl.fromTo(all('#f3-seo .me'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, c + 3.3); SND('ok', c + 3.4);
    POP(q('fast'), c + 4.8, 0.5); SND('bad', c + 4.8);

    /* 6 — responsive: one page, three screens */
    c = at(6);
    frame(6, c);
    OUT(q('s5'), c, 0.4);
    IN(q('dev'), c + 0.4, 0.5);
    IN(q('one'), c + 0.8, 0.4, { x: 30 * sx });
    const sizes = [[920, 3], [620, 2], [320, 1]];
    sizes.forEach(([w, n], k) => {
      const t = c + 1.2 + k * 1.6;
      IN(q('w' + k), t, 0.3, { x: -20 * sx });
      tl.to(q('dev'), { width: w, duration: 0.8, ease: 'power2.inOut' }, t);
      tl.set(all('#f3-dev .g'), { gridTemplateColumns: `repeat(${n}, 1fr)` }, t + 0.4);
      SND('whoosh', t);
    });
    IN(q('mf'), c + 6.2, 0.4, { y: 12 });

    /* 7 — frameworks */
    c = at(7);
    frame(7, c);
    OUT(q('s6'), c, 0.4);
    IN(q('box'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#f3-box .l12-parts span'), { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.25, ease: 'bounce.out' }, c + 0.9);
    [0, 1, 2].forEach((k) => { IN(q('fw' + k), c + 2.4 + k * 0.7, 0.5, { x: 40 * sx }); SND('pop', c + 2.4 + k * 0.7); });
    IN(q('fd'), c + 4.8, 0.4, { y: 12 });

    /* 8 — recap */
    c = at(8);
    frame(8, c);
    OUT(q('s7'), c, 0.4);
    [0, 1, 2].forEach((k) => { IN(q('r' + k), c + 0.5 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5 + k * 0.5); });
    [0, 1, 2].forEach((k) => IN(q('m' + k), c + 2.4 + k * 0.4, 0.4, { y: 16 }));

    /* living loops */
    M.loop(0, 6.0, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#f3-h0 .lights'), { opacity: 0.4, duration: 0.9 }));
    M.loop(1, 4.6, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#f3-code .c0 span:last-child'), { opacity: 0.4, duration: 0.6 }));
    M.loop(3, 5.8, () => gsap.timeline({ repeat: -1, repeatDelay: 0.8 }).fromTo(all('#f3-pg .btn'), { scale: 1 }, { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 }).fromTo(all('#f3-pg .cart'), { backgroundColor: 'rgba(52,211,153,0)' }, { backgroundColor: 'rgba(52,211,153,.6)', duration: 0.25, yoyo: true, repeat: 1 }));
    M.loop(3, 5.8, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#f3-hs .lights'), { opacity: 0.5, duration: 0.8 }));
    M.loop(4, 5.6, () => glowCycle(all('#f3-sem b'), 'rgba(52,211,153,.9)', 0.4));
    M.loop(5, 5.6, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(all('#f3-acc .l12-say'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'none' }));
    M.loop(6, 6.8, () => {
      const x = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      sizes.concat([[620, 2]]).forEach(([w, n], k) => { x.to(q('dev'), { width: w, duration: 0.8, ease: 'power2.inOut' }, k * 1.6); x.set(all('#f3-dev .g'), { gridTemplateColumns: `repeat(${n}, 1fr)` }, k * 1.6 + 0.4); });
      return x;
    });
    M.loop(7, 5.4, () => M.bob(all('#f3-box .l12-parts span'), 8, 1.1));
    M.loop(8, 3.6, () => glowCycle(Q('r0 r1 r2'), 'rgba(244,114,182,.9)', 0.5));
    return M.done();
  });
})();

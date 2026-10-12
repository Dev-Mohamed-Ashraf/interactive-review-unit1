/* =========================================================
 * anims/movies-3-3.js — lesson 3-3 teacher-driven movie (shell:
 * movie-kit.js; each beat plays, then FREEZES; logical/mirrored layout).
 *   frontendMovie : HTML/CSS/JS built like a house · semantic HTML and
 *                   its benefits · responsive design · frameworks
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const MONO = 'font-family="Consolas, monospace"';

  K.defineAnim('frontendMovie', (stage, props, api) => {
    const U = MK.uiL('w3-');
    const M = MK.create(stage, api, { props,
      cls: 'mv-web mv-l33', prefix: 'w3-', beats: 9,
      html: (L) => {
        const PAGE = `<rect x="4" y="4" width="852" height="552" rx="20" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
          <g class="raw" fill="none" stroke="#9ca3af" stroke-width="3" stroke-dasharray="10 8">
            <rect x="40" y="40" width="780" height="76" rx="8"/><rect x="40" y="146" width="480" height="34" rx="6"/><rect x="40" y="196" width="480" height="34" rx="6"/>
            <rect x="40" y="246" width="400" height="34" rx="6"/><rect x="560" y="146" width="260" height="170" rx="8"/><rect x="40" y="320" width="260" height="44" rx="6"/><rect x="40" y="420" width="260" height="80" rx="8"/></g>
          <g class="raw" fill="#475569" font-size="28" font-weight="700" ${MONO}>
            <text x="64" y="88">&lt;h1&gt;</text><text x="64" y="172">&lt;p&gt;</text><text x="600" y="240">&lt;img&gt;</text><text x="64" y="351">&lt;a&gt;</text><text x="64" y="470">&lt;button&gt;</text></g>
          <g class="sty" opacity="0">
            <rect x="40" y="40" width="780" height="76" rx="14" fill="#db2777"/><text x="430" y="90" text-anchor="middle" font-size="34" font-weight="900" fill="#fff">📚 ${L('مكتبة المدرسة', 'School library')}</text>
            <rect x="40" y="146" width="480" height="34" rx="17" fill="#cbd5e1"/><rect x="40" y="196" width="480" height="34" rx="17" fill="#cbd5e1"/><rect x="40" y="246" width="400" height="34" rx="17" fill="#cbd5e1"/>
            <rect x="560" y="146" width="260" height="170" rx="16" fill="#93c5fd"/><path d="M580 300 L650 220 L700 270 L740 230 L800 300Z" fill="#2563eb"/><circle cx="760" cy="190" r="18" fill="#fde68a"/>
            <text x="64" y="352" font-size="30" font-weight="800" fill="#2563eb" text-decoration="underline">🔗 ${L('اقرا المزيد', 'Read more')}</text>
            <rect x="40" y="420" width="260" height="80" rx="40" fill="#2563eb"/><text x="170" y="472" text-anchor="middle" font-size="32" font-weight="900" fill="#fff">👍 ${L('أعجبني', 'Like')}</text></g>
          ${range(3).map((k) => `<text class="cnt cnt${k}" x="350" y="474" font-size="44" font-weight="900" fill="#0f172a" opacity="0" ${MONO}>${k}</text>`).join('')}`;
        const HOUSE = `<g class="fr" fill="none" stroke="#94a3b8" stroke-width="6" stroke-linejoin="round"><path d="M60 390 V190 L220 60 L380 190 V390 Z"/><path d="M60 190 H380 M220 60 V390 M60 290 H380"/></g>
          <g class="dec" opacity="0"><rect x="60" y="190" width="320" height="200" fill="#f9a8d4"/><path d="M36 200 L220 48 L404 200Z" fill="#be185d"/>
            <rect x="100" y="230" width="80" height="70" rx="6" fill="#fef3c7" stroke="#fff" stroke-width="4"/><rect x="260" y="290" width="70" height="100" rx="6" fill="#7c2d12"/></g>
          <g class="pow" opacity="0"><circle cx="140" cy="265" r="34" fill="#fde047" opacity=".55"/><circle cx="140" cy="265" r="16" fill="#facc15"/>
            <path d="M400 390 V330 H350" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/><path d="M350 330 q-6 16 0 22 q6 -6 0 -22Z" fill="#38bdf8"/>
            <path d="M380 300 L400 260 L392 290 L412 290 L390 332 L398 302Z" fill="#facc15"/></g>`;
        const BLOCKS = (sem) => [['header', 20, 20, 80, '#38bdf8'], ['nav', 20, 115, 60, '#a78bfa'], ['main', 20, 190, 240, '#34d399'], ['footer', 20, 445, 55, '#fbbf24']]
          .map(([t, x, y, hh, col]) => `<rect x="${x}" y="${y}" width="520" height="${hh}" rx="12" fill="${sem ? col : '#334155'}" stroke="${sem ? '#0f172a' : '#64748b'}" stroke-width="3"/>
            <text x="280" y="${y + hh / 2 + 10}" text-anchor="middle" font-size="30" font-weight="900" fill="${sem ? '#0f172a' : '#cbd5e1'}" ${MONO}>&lt;${sem ? t : 'div'}&gt;</text>`).join('');
        const DEVICE = (w, h, cols, frame) => {
          const pad = 26, top = 30, gw = (w - pad * 2 - (cols - 1) * 14) / cols;
          return `<rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="${frame}" fill="#0f172a" stroke="#94a3b8" stroke-width="6"/>
            <rect x="${pad}" y="${top}" width="${w - pad * 2}" height="40" rx="8" fill="#db2777"/>
            ${range(cols * (cols === 1 ? 4 : 2)).map((i) => `<rect x="${pad + (i % cols) * (gw + 14)}" y="${top + 56 + Math.floor(i / cols) * 92}" width="${gw}" height="78" rx="10" fill="${['#38bdf8', '#34d399', '#fbbf24', '#a78bfa', '#f472b6', '#60a5fa'][i % 6]}"/>`).join('')}`;
        };
        return `
  <div id="w3-stage" class="mv-stage">
    ${U.box('h0', 120, 220, 520, 't-blue', { ic: '🏗️', y: 'HTML', h: L('البنية', 'Structure'), p: L('هيكل المبنى', 'the frame') })}
    ${U.box('c0', 700, 220, 520, 't-pink', { ic: '🎨', y: 'CSS', h: L('المظهر', 'Appearance'), p: L('الديكور الداخلي والخارجي', 'interior and exterior') })}
    ${U.box('j0', 1280, 220, 520, 't-amber', { ic: '💡', y: 'JavaScript', h: L('السلوك', 'Behavior'), p: L('الكهربا والسباكة', 'electricity and plumbing') })}

    ${U.art('pg', 60, 160, 860, 560, '0 0 860 560', PAGE)}
    ${U.art('house', 980, 180, 440, 420, '0 0 440 420', HOUSE)}
    ${U.emo('cur', MK.RTL() ? 640 : 230, 610, 90, 60, '👆')}
    ${U.box('i1', 1460, 190, 400, 't-blue', { y: 'HTML', h: L('البنية (الهيكل)', 'Structure'), p: L('عناوين · فقرات · صور · لينكات', 'headings · paragraphs · images · links'), s: '🏗️ ' + L('هيكل المبنى', 'the frame') })}
    ${U.box('i2', 1460, 190, 400, 't-pink', { y: 'CSS', h: L('المظهر', 'Appearance'), p: L('ألوان · تخطيط · حجم · خطوط', 'colors · layout · size · fonts'), s: '🎨 ' + L('الديكور', 'the decoration') })}
    ${U.box('i3', 1460, 190, 400, 't-amber', { y: 'JavaScript', h: L('السلوك والتفاعل', 'Behavior'), p: L('يرد على الضغط · يحدّث جزء من الشاشة', 'reacts to clicks · updates part of the screen'), s: '💡 ' + L('الكهربا والسباكة', 'electricity and plumbing') })}

    ${U.art('soup', 80, 170, 560, 520, '0 0 560 520', BLOCKS(false))}
    ${U.art('sem', 700, 170, 560, 520, '0 0 560 520', BLOCKS(true))}
    ${U.pill('nm', 150, 700, '❓ ' + L('صناديق ملهاش معنى', 'meaningless boxes'), 't-red')}
    ${U.pill('ym', 790, 700, '✅ ' + L('كل جزء بمعناه', 'each part named by meaning'), 't-green')}
    ${U.box('sx', 1320, 190, 520, 't-violet', { ic: '🏷️', h: L('HTML الدلالية', 'Semantic HTML'), p: L('وسوم بتدل على معنى كل جزء', 'tags that indicate meaning') })}
    ${U.emo('rd', 220, 230, 160, 110, '🔊')}
    ${U.pill('rdb', 90, 380, '«' + L('شريط تنقّل… المحتوى الرئيسي…', 'navigation… main content…') + '»', 'solid')}
    ${U.box('b1', 1320, 190, 520, 't-blue', { ic: '♿', h: L('① إمكانية الوصول', '① Accessibility'), p: L('برامج قراءة الشاشة تفهم البنية', 'screen readers understand it'), s: L('المعلومة توصل لذوي الإعاقة البصرية', 'reaches visually impaired users') })}
    ${U.box('b2', 1320, 470, 520, 't-green', { ic: '🔎', h: L('② SEO', '② SEO'), p: L('محركات البحث تفهم المحتوى صح', 'search engines understand it') })}

    ${U.art('pc', 60, 200, 640, 420, '0 0 640 420', DEVICE(640, 420, 3, 18))}
    ${U.art('tab', 760, 190, 380, 460, '0 0 380 460', DEVICE(380, 460, 2, 30))}
    ${U.art('ph', 1190, 200, 240, 440, '0 0 240 440', DEVICE(240, 440, 1, 34))}
    ${U.box('rsp', 1480, 220, 380, 't-pink', { ic: '📱', h: L('التصميم المتجاوب', 'Responsive design'), p: L('صفحة واحدة… بتتظبط على كل شاشة', 'one page… fits every screen') })}

    ${U.art('pf', 660, 190, 500, 420, '0 0 500 420', `<rect x="4" y="4" width="492" height="412" rx="20" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="14 10"/>${range(4).map((k) => `<rect x="40" y="${36 + k * 92}" width="420" height="72" rx="14" fill="none" stroke="#475569" stroke-width="3" stroke-dasharray="8 8"/>`).join('')}`)}
    ${U.box('kit', 80, 190, 520, 't-violet', { ic: '🧰', h: L('إطار العمل', 'Framework'), p: L('وظائف ومكوّنات جاهزة', 'ready-made functions and parts'), s: L('تطوير أكفأ — مش من الصفر', 'efficient — not from scratch') })}
    ${[['🔘', L('زرار', 'button')], ['🧭', L('قايمة', 'menu')], ['🃏', L('كارت', 'card')], ['📝', L('نموذج', 'form')]].map(([e, t], k) => U.pill('k' + k, 80 + (k % 2) * 260, 470 + Math.floor(k / 2) * 90, e + ' ' + t, 't-slate')).join('')}
    ${U.box('fw1', 1220, 190, 640, 't-blue', { h: '⚛️ React', p: L('من Meta · بيحدّث جزء من الشاشة · للتطبيقات الكبيرة', 'by Meta · updates part of the screen · large apps') })}
    ${U.box('fw2', 1220, 350, 640, 't-green', { h: '🟩 Vue', p: L('بنية بسيطة · تبني تدريجيًا من ميزات صغيرة', 'simple · build up from small features') })}
    ${U.box('fw3', 1220, 510, 640, 't-slate', { h: '▲ Next.js', p: L('مزايا React + تسريع عرض الصفحة', 'React’s features + faster display') })}

    ${U.hd(0, '🏠 ' + L('صفحة الويب = تلات تقنيات', 'A web page = three technologies'))}
    ${U.hd(1, '🏗️ HTML ' + L('— البنية', '— structure'))}
    ${U.hd(2, '🎨 CSS ' + L('— المظهر', '— appearance'))}
    ${U.hd(3, '💡 JavaScript ' + L('— السلوك', '— behavior'))}
    ${U.hd(4, '🏷️ ' + L('HTML الدلالية', 'Semantic HTML'))}
    ${U.hd(5, L('فوايد HTML الدلالية', 'Why semantic HTML helps'))}
    ${U.hd(6, '📱 ' + L('التصميم المتجاوب', 'Responsive design'))}
    ${U.hd(7, '🧰 ' + L('الأطر', 'Frameworks'))}
    ${U.nt(0, L('تلات أدوار مستقلة… والصفحة بتتعمل بيهم مع بعض', 'Three independent roles… combined into one page'), 'ok')}
    ${U.nt(3, '⚠️ ' + L('«CSS بيضيف السلوك» ← غلط: السلوك JavaScript', '"CSS adds behavior" → false: behavior is JavaScript'), 'warn')}
    ${U.nt(5, '⚠️ ' + L('مش بالضرورة بتخلّي الصفحة أسرع!', 'It does not necessarily make the page faster!'), 'warn')}
    ${U.nt(6, '📱 ' + L('الأولوية للموبايل (mobile-first): نبدأ التصميم من الشاشة الصغيرة', 'Mobile-first: design starts from the small screen'), 'ok')}
  </div>
  <div id="w3-recap" class="mv-recap">
    ${U.hd(8, '💡 ' + L('الخلاصة', 'The point'))}
    ${U.pill('x0', 140, 200, '🏗️ HTML ' + L('يبني', 'structures') + ' · 🎨 CSS ' + L('ينسّق', 'styles') + ' · 💡 JavaScript ' + L('يتصرّف', 'behaves'), 't-blue')}
    ${U.pill('x1', 140, 310, '🏷️ ' + L('HTML الدلالية', 'Semantic HTML') + ' = ' + L('إمكانية وصول + SEO', 'accessibility + SEO'), 't-violet')}
    ${U.pill('x2', 140, 420, '📱 ' + L('المتجاوب = أي شاشة', 'Responsive = any screen') + ' (mobile-first)', 't-pink')}
    ${U.pill('x3', 140, 530, '🧰 ' + L('الأطر = بناء أكفأ', 'Frameworks = efficient building') + ' (React · Vue · Next.js)', 't-green')}
  </div>`;
      },
    });
    const { q, Q, tl, at, IN, POP, OUT, SND, PULSE, frame, sx } = M;
    const sel = (id, c) => M.board.querySelectorAll('#w3-' + id + ' .' + c);

    /* 0 — three technologies */
    let c = at(0);
    frame(0, c, 4.6);
    Q('h0 c0 j0').forEach((e, i) => { IN(e, c + 0.6 + i * 1.0, 0.5, { y: 40 }); SND('pop', c + 0.6 + i * 1.0); });

    /* 1 — HTML: the structure */
    c = at(1);
    frame(1, c);
    OUT(Q('h0 c0 j0'), c, 0.4);
    IN(q('pg'), c + 0.6, 0.5, { y: 30 });
    tl.fromTo(sel('pg', 'raw'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.3 }, c + 1.0);
    IN(q('house'), c + 1.6, 0.5, { x: 40 * sx });
    tl.fromTo(sel('house', 'fr'), { strokeDasharray: '0 2400' }, { strokeDasharray: '2400 0', duration: 1.6, ease: 'power1.inOut' }, c + 1.8);
    IN(q('i1'), c + 3.6, 0.5, { x: 40 * sx }); SND('ok', c + 3.6);

    /* 2 — CSS: the appearance */
    c = at(2);
    frame(2, c);
    OUT(q('i1'), c, 0.3);
    tl.to(sel('pg', 'sty'), { opacity: 1, duration: 1.2, ease: 'power1.inOut' }, c + 0.8); SND('whoosh', c + 0.8);
    tl.to(sel('pg', 'raw'), { opacity: 0.12, duration: 1.0 }, c + 0.8);
    tl.to(sel('house', 'dec'), { opacity: 1, duration: 1.2 }, c + 1.6);
    IN(q('i2'), c + 3.0, 0.5, { x: 40 * sx }); SND('ok', c + 3.0);

    /* 3 — JavaScript: the behavior */
    c = at(3);
    frame(3, c, 6.4);
    OUT(q('i2'), c, 0.3);
    tl.to(sel('pg', 'cnt0'), { opacity: 1, duration: 0.2 }, c + 0.6);
    IN(q('cur'), c + 0.8, 0.4, { y: 40 });
    [1, 2].forEach((k) => {
      const t = c + 1.6 + (k - 1) * 1.2;
      tl.to(q('cur'), { y: -20, duration: 0.15, yoyo: true, repeat: 1 }, t);
      tl.to(sel('pg', 'cnt' + (k - 1)), { opacity: 0, duration: 0.1 }, t + 0.2);
      tl.to(sel('pg', 'cnt' + k), { opacity: 1, duration: 0.1 }, t + 0.2);
      SND('pop', t + 0.2);
    });
    tl.to(sel('house', 'pow'), { opacity: 1, duration: 0.6 }, c + 4.2); SND('ok', c + 4.2);
    IN(q('i3'), c + 4.6, 0.5, { x: 40 * sx });

    /* 4 — semantic HTML */
    c = at(4);
    frame(4, c);
    OUT(Q('pg house cur i3'), c, 0.4);
    IN(q('soup'), c + 0.6, 0.5, { y: 30 }); IN(q('nm'), c + 1.4, 0.4, { y: 20 }); SND('bad', c + 1.4);
    IN(q('sem'), c + 2.4, 0.5, { y: 30 }); IN(q('ym'), c + 3.2, 0.4, { y: 20 }); SND('ok', c + 3.2);
    IN(q('sx'), c + 4.0, 0.5, { x: 40 * sx });

    /* 5 — benefits */
    c = at(5);
    frame(5, c, 5.2);
    OUT(Q('soup nm ym sx'), c, 0.4);
    POP(q('rd'), c + 0.6, 0.5); IN(q('rdb'), c + 1.2, 0.4, { y: 20 }); SND('pop', c + 0.6);
    PULSE(q('sem'), c + 1.4, 'rgba(167,139,250,.85)', 2);
    IN(q('b1'), c + 2.4, 0.5, { x: 40 * sx }); SND('ok', c + 2.4);
    IN(q('b2'), c + 3.6, 0.5, { x: 40 * sx }); SND('ok', c + 3.6);

    /* 6 — responsive design */
    c = at(6);
    frame(6, c, 5.0);
    OUT(Q('rd rdb sem b1 b2'), c, 0.4);
    IN(q('pc'), c + 0.6, 0.5, { y: 30 }); SND('pop', c + 0.6);
    IN(q('tab'), c + 1.6, 0.5, { y: 30 }); SND('pop', c + 1.6);
    IN(q('ph'), c + 2.6, 0.5, { y: 30 }); SND('pop', c + 2.6);
    IN(q('rsp'), c + 3.6, 0.5, { x: 40 * sx }); SND('ok', c + 3.6);

    /* 7 — frameworks */
    c = at(7);
    frame(7, c);
    OUT(Q('pc tab ph rsp'), c, 0.4);
    IN(q('kit'), c + 0.5, 0.5, { y: 30 });
    IN(q('pf'), c + 0.8, 0.5);
    range(4).forEach((k) => IN(q('k' + k), c + 1.0 + k * 0.2, 0.3, { y: 20 }));
    range(4).forEach((k) => {
      const t = c + 2.0 + k * 0.5;
      tl.to(q('k' + k), { x: (620 - (k % 2) * 260) * sx, y: 226 + k * 92 - (470 + Math.floor(k / 2) * 90) + 8, duration: 0.6, ease: 'power2.inOut' }, t);
      SND('pop', t + 0.6);
    });
    Q('fw1 fw2 fw3').forEach((e, i) => IN(e, c + 4.4 + i * 0.6, 0.5, { x: 40 * sx }));

    /* 8 — recap */
    c = at(8);
    tl.to(q('stage'), { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.in', transformOrigin: '50% 50%' }, c);
    IN(q('hd8'), c + 0.6, 0.5, { y: -30 });
    Q('x0 x1 x2 x3').forEach((x, i) => { IN(x, c + 1.0 + i * 0.6, 0.4, { x: 30 * sx }); SND('pop', c + 1.0 + i * 0.6); });
    return M.done();
  });
})();

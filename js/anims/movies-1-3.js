/* =========================================================
 * anims/movies-1-3.js — lesson 1-3 teacher-driven movies, drawn in the
 * lesson 1-2 look (MK.look · css/anims-movies-l12.css). Every scene lives in
 * its own layer (#<p>s<k>): the next scene fades the previous one out.
 *   aiLifeMovie  (stations daily 0–3 · industry 4–8):
 *     recommendations · voice assistant · machine translation · face unlock ·
 *     healthcare · agriculture · manufacturing · logistics · recap
 *   cautionMovie (station caution): good at · needs caution · the doctor decides ·
 *     the black box · inside the box · where it hurts
 * Positions are LOGICAL (inset-inline-start): every layout mirrors itself in Arabic.
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;
  const MK = RV.movieKit;
  const { kit, stampIn, glow, glowCycle } = MK.look;
  const { ROBOT, BELT, GAUGE } = MK.look.art;
  const range = (n) => Array.from({ length: n }, (_, i) => i);

  const XRAY = `<rect x="10" y="10" width="420" height="420" rx="24" fill="#020617" stroke="#475569" stroke-width="6"/>
    ${range(5).map((k) => `<path d="M80 ${110 + k * 50} Q220 ${70 + k * 50} 360 ${110 + k * 50}" fill="none" stroke="#cbd5e1" stroke-width="10" opacity=".75"/>`).join('')}
    <rect x="210" y="70" width="20" height="320" rx="10" fill="#e2e8f0" opacity=".8"/>
    <rect class="beam" x="30" y="40" width="380" height="8" rx="4" fill="#38bdf8" opacity="0"/>
    <circle class="mark" cx="300" cy="230" r="44" fill="none" stroke="#f87171" stroke-width="8" opacity="0"/>`;
  const FACE = `<ellipse cx="110" cy="128" rx="58" ry="70" fill="#f1c7a5"/><path d="M52 112 Q50 52 110 50 Q170 52 168 112 Q160 80 140 76 Q110 88 80 76 Q60 82 52 112Z" fill="#1f2937"/>
    <circle cx="88" cy="128" r="7" fill="#111827"/><circle cx="132" cy="128" r="7" fill="#111827"/><path d="M90 160 Q110 174 130 160" fill="none" stroke="#7f1d1d" stroke-width="5" stroke-linecap="round"/>
    <rect class="box" x="40" y="44" width="140" height="170" rx="14" fill="none" stroke="#38bdf8" stroke-width="6" stroke-dasharray="14 9" opacity="0"/>
    <g class="pts" opacity="0" fill="#34d399">${[[88, 128], [132, 128], [110, 146], [92, 162], [128, 162], [110, 196], [70, 112], [150, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>`;
  const FIELD = (B) => `<defs><linearGradient id="lf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient>
      <clipPath id="lf-fc"><rect width="900" height="420" rx="24"/></clipPath></defs>
    <g clip-path="url(#lf-fc)">${B.mir(900, `<rect width="900" height="420" fill="url(#lf-sky)"/><circle cx="780" cy="80" r="44" fill="#fde047"/>
      <rect y="170" width="900" height="250" fill="#a16207"/>
      ${range(4).map((r) => range(9).map((c) => `<g class="pl${r === 2 && c === 6 ? ' sick' : ''}"><rect x="${58 + c * 96}" y="${208 + r * 54}" width="8" height="26" fill="#14532d"/><circle cx="${62 + c * 96}" cy="${204 + r * 54}" r="${16 + ((r + c) % 3) * 2}" fill="${r === 2 && c === 6 ? '#a3a33a' : '#22c55e'}"/></g>`).join('')).join('')}
      <rect class="scanl" x="20" y="180" width="10" height="230" rx="5" fill="#38bdf8" opacity="0"/>
      <rect class="bugbox" x="${62 + 6 * 96 - 34}" y="${204 + 2 * 54 - 34}" width="68" height="68" rx="10" fill="none" stroke="#f87171" stroke-width="6" stroke-dasharray="12 7" opacity="0"/>`)}</g>
    <rect width="900" height="420" rx="24" fill="none" stroke="#94a3b8" stroke-width="5"/>`;
  const MAP = (B) => `<rect width="900" height="520" rx="26" fill="#0f172a" stroke="#475569" stroke-width="5"/>
    ${B.mir(900, `${range(8).map((k) => `<path d="M${60 + k * 110} 20 V500" stroke="#1e293b" stroke-width="18"/>`).join('')}${range(4).map((k) => `<path d="M20 ${70 + k * 120} H880" stroke="#1e293b" stroke-width="18"/>`).join('')}
      <path class="long" d="M90 450 L90 310 L420 310 L420 450 L640 450 L640 70 L310 70 L310 190 L810 190" fill="none" stroke="#f87171" stroke-width="9" stroke-dasharray="18 12" stroke-linejoin="round"/>
      <path class="short" d="M90 450 L310 450 L310 190 L810 190" fill="none" stroke="#34d399" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      ${[[90, 450, '#fbbf24'], [310, 450, '#38bdf8'], [310, 190, '#38bdf8'], [810, 190, '#34d399']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="20" fill="${c}" stroke="#0f172a" stroke-width="5"/>`).join('')}
      <g class="truck"><rect x="-26" y="-18" width="52" height="36" rx="8" fill="#f8fafc"/><rect x="10" y="-14" width="14" height="14" rx="3" fill="#38bdf8"/></g>`)}`;
  const MOLE = `<g class="mol">${[[100, 40, '#38bdf8'], [160, 90, '#f472b6'], [140, 160, '#34d399'], [60, 160, '#fbbf24'], [40, 90, '#a78bfa']].map(([x, y, c], k, a) => `<path d="M100 100 L${x} ${y}" stroke="#94a3b8" stroke-width="7"/>`).join('')}
    <circle cx="100" cy="100" r="22" fill="#e2e8f0"/>${[[100, 40, '#38bdf8'], [160, 90, '#f472b6'], [140, 160, '#34d399'], [60, 160, '#fbbf24'], [40, 90, '#a78bfa']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="17" fill="${c}"/>`).join('')}</g>`;
  const CUBE = `<path d="M60 90 L200 30 L340 90 L200 150Z" fill="#334155"/><path d="M60 90 L200 150 L200 330 L60 270Z" fill="#0f172a"/><path d="M340 90 L200 150 L200 330 L340 270Z" fill="#1e293b"/>
    <text x="200" y="230" text-anchor="middle" font-size="110" font-weight="900" fill="#f87171" font-family="Segoe UI, Arial">?</text>`;
  const DOTS = `${range(36).map((k) => { const g = k % 3, a = (k * 137.5) * Math.PI / 180, r = 18 + (k % 7) * 9; return `<circle class="dt g${g}" cx="${200 + Math.cos(a) * 150}" cy="${150 + Math.sin(a) * 110}" r="10" fill="#94a3b8" data-x="${[90, 200, 310][g] + Math.cos(a) * r * 0.6}" data-y="${[110, 210, 110][g] + Math.sin(a) * r * 0.5}"/>`; }).join('')}`;

  /* ═════════════════════════ aiLifeMovie ═════════════════════════ */
  K.defineAnim('aiLifeMovie', (stage, props, api) => {
    const P = 'lf-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-life mv-l12 mv-l13', prefix: P, beats: 9, cast: { st: 'studentL', dr: 'doctor' },
      html: (L) => `
  <div id="lf-s0" class="mv-stage">
    ${B.card('his', 70, 150, 520, 330, 'c-slate', { h: '📜 ' + L('سلوكك السابق', 'Your past behaviour'), html: `<ul class="l12-list"><li>👀 ${L('شفت ماتشات كورة', 'watched football')}</li><li>❤️ ${L('حبّيت فيديوهات برمجة', 'liked coding videos')}</li><li>⏱️ ${L('قعدت كتير على العلوم', 'stayed long on science')}</li></ul>` })}
    ${B.svg('bot0', 690, 190, 260, 260, '0 0 300 300', ROBOT('#34d399'))}
    ${B.big('ar0', 600, 280, 90, 60, B.arrow, 'l12-gold')}${B.big('ar1', 960, 280, 90, 60, B.arrow, 'l12-gold')}
    <div id="lf-ph" class="l12u l12-phone later" style="${B.at(1100, 110, 380, 600)}"><div class="scr"><div class="abar">▶️ ${L('فيديوهات', 'Videos')}</div>
      <div class="tile t0">💻 ${L('كورس برمجة', 'coding course')}<b>✨ ${L('مقترح ليك', 'for you')}</b></div><div class="tile">⚽ ${L('ملخص الماتش', 'match highlights')}</div><div class="tile">🔭 ${L('أسرار الفضاء', 'space secrets')}</div></div></div>
    ${B.card('d0', 1540, 150, 330, 360, 'c-green', { ic: '🎯', h: L('أنظمة التوصية', 'Recommendation systems'), p: L('بتتنبّأ بتفضيلاتك من سلوكك السابق وتعرضلك توصيات', 'predict your taste from past behaviour and show suggestions') })}
    ${B.chip('x0', 70, 520, '🧪 ' + L('أمثلة:', 'e.g.') + ' YouTube · Amazon · Spotify', 'c-green big')}
  </div>
  <div id="lf-s1" class="mv-stage">
    ${B.ch('st', 60, 400, 'md')}
    ${B.chip('say', 40, 300, '🗣️ «' + L('يا مساعد، صحّيني 7 الصبح', 'Hey assistant, wake me at 7') + '»', 'c-slate big')}
    <svg id="lf-wv" class="l12u l12-svg later" style="${B.at(320, 450, 380, 120)}" viewBox="0 0 380 120">${range(16).map((k) => `<rect class="wb" x="${8 + k * 23}" y="${60 - (12 + (k * 29) % 44)}" width="12" height="${2 * (12 + (k * 29) % 44)}" rx="6" fill="#38bdf8"/>`).join('')}</svg>
    ${[['🎤', L('يتعرّف على الصوت', 'recognises the voice'), L('صوتك ← كلام مكتوب', 'your voice → text'), 'c-blue'], ['🧠', L('يفهم الأمر', 'understands the command'), L('«صحّيني 7» = منبّه', '“wake me at 7” = alarm'), 'c-violet'], ['✅', L('ينفّذه', 'executes it'), L('⏰ منبّه 7:00', '⏰ alarm 7:00'), 'c-green']]
      .map(([ic, h, p, c], k) => B.card('v' + k, 760 + k * 380, 170, 330, 240, c, { ic, h, p })).join('')}
    ${B.big('va0', 1090, 250, 50, 50, B.arrow, 'l12-gold')}${B.big('va1', 1470, 250, 50, 50, B.arrow, 'l12-gold')}
    ${B.card('d1', 760, 470, 1090, 0, 'c-violet', { row: true, ic: '🎙️', h: L('المساعد الصوتي', 'Voice assistant'), p: L('يتعرّف على الصوت · يفهم الأمر · ينفّذه', 'recognises the voice · understands the command · executes it') })}
    ${B.chip('x1', 760, 640, '🧪 ' + L('أمثلة:', 'e.g.') + ' Siri · Google Assistant', 'c-violet big')}
  </div>
  <div id="lf-s2" class="mv-stage">
    <div id="lf-me" class="l12u l12-doc later" style="${B.at(100, 160, 620)}"><div class="ltr"><b>🍽️ MENU</b><br>Fresh orange juice<br>Grilled chicken<br>Chocolate cake</div><i class="sweep"></i></div>
    ${B.svg('bot2', 820, 190, 280, 280, '0 0 300 300', ROBOT('#38bdf8'))}
    ${B.chip('lang', 800, 490, '<bdi>EN</bdi> ' + B.arrow + ' <bdi>AR</bdi>', 'c-blue big', 320)}
    <div id="lf-ma" class="l12u l12-doc later" style="${B.at(1200, 160, 620)}"><b>🍽️ ${L('المنيو', 'Menu (Arabic)')}</b><br>${L('عصير برتقال فريش', 'عصير برتقال فريش')}<br>${L('فراخ مشوية', 'فراخ مشوية')}<br>${L('كيكة شوكولاتة', 'كيكة شوكولاتة')}</div>
    ${B.card('d2', 100, 590, 1720, 0, 'c-blue', { row: true, ic: '🌐', h: L('الترجمة الآلية', 'Machine translation'), p: L('بتترجم النصوص تلقائيًا للغات مختلفة — أمثلة: Google Translate · DeepL', 'translates text automatically into other languages — e.g. Google Translate · DeepL') })}
  </div>
  <div id="lf-s3" class="mv-stage">
    <div id="lf-p3" class="l12u l12-phone later" style="${B.at(120, 110, 380, 600)}"><div class="scr"><svg viewBox="0 0 220 240" class="face">${FACE}</svg><div class="lockline"><span class="lk c">🔒</span><span class="lk o">🔓 ${L('اتفتح!', 'unlocked!')}</span></div></div></div>
    ${B.card('gal', 600, 150, 760, 320, 'c-slate', { h: '🖼️ ' + L('صورك', 'Your photos'), html: `<div class="l12-gal">${[['👦', L('أحمد', 'Ahmed')], ['👨', L('خالد', 'Khaled')], ['🧔', L('عمر', 'Omar')]].map(([e, n]) => `<span><b>${e}</b><i>${n}</i></span>`).join('')}</div>` })}
    ${B.card('d3', 600, 510, 1250, 0, 'c-amber', { row: true, ic: '🙂', h: L('التعرّف على الوجه', 'Face recognition'), p: L('يكتشف ويتعرّف على وجوه الناس في الصور تلقائيًا — مثال: فتح قفل الموبايل', 'automatically detects and identifies faces in photos — e.g. unlocking a phone') })}
    ${B.chip('x3', 600, 680, '⚠️ ' + L('فخ: الترجمة الآلية = برنامج ذكاء اصطناعي… مش بشر بيترجموا', 'trap: machine translation = AI software… not people translating'), 'c-red')}
  </div>

  <div id="lf-s4" class="mv-stage">
    ${B.svg('xr', 90, 150, 420, 420, '0 0 440 440', XRAY)}
    ${B.chip('mk', 90, 596, '🔴 ' + L('مكان مشكوك فيه — 91%', 'a suspicious spot — 91%'), 'c-red')}
    ${B.ch('dr', 640, 380, 'md')}
    ${B.chip('dok', 600, 690, '👨‍⚕️ ' + L('الطبيب يراجع ويأكّد', 'the doctor checks and confirms'), 'c-green')}
    ${B.card('d4', 900, 150, 960, 0, 'c-pink', { row: true, ic: '🏥', h: L('الرعاية الصحية', 'Healthcare'), p: L('التشخيص بالصور: كشف الأمراض من صور الأشعة السينية والمقطعية', 'image diagnosis: detecting disease in X-ray and CT images') })}
    ${B.svg('mol', 1020, 380, 220, 220, '0 0 200 200', MOLE)}
    ${B.chip('drug', 1280, 450, '💊 ' + L('ودعم اكتشاف الأدوية', 'and drug-discovery support'), 'c-pink big')}
  </div>
  <div id="lf-s5" class="mv-stage">
    ${B.svg('fld', 70, 150, 900, 420, '0 0 900 420', FIELD(B))}
    ${B.card('cal', 1040, 150, 380, 250, 'c-amber', { ic: '📅', h: L('أنسب ميعاد للحصاد', 'Best harvest date'), k: L('15 مايو', '15 May') })}
    ${B.chip('bug', 1040, 430, '🐛 ' + L('آفة اتكشفت في الصف 3', 'a pest found in row 3'), 'c-red big')}
    ${B.card('d5', 70, 610, 1800, 0, 'c-green', { row: true, ic: '🌾', h: L('الزراعة', 'Agriculture'), p: L('التنبؤ بميعاد الحصاد · كشف الآفات وأمراض النبات', 'predicting harvest time · detecting pests and plant disease') })}
  </div>
  <div id="lf-s6" class="mv-stage">
    ${B.card('d6', 70, 140, 1100, 0, 'c-amber', { row: true, ic: '🏭', h: L('التصنيع', 'Manufacturing'), p: L('أتمتة فحص جودة المنتج · الصيانة التنبؤية', 'automated quality inspection · predictive maintenance') })}
    ${B.big('cam', 560, 300, 110, 80, '📷')}
    ${B.svg('beam6', 560, 380, 110, 150, '0 0 110 150', '<path d="M55 0 L5 150 L105 150Z" fill="#38bdf8" opacity=".25"/>')}
    ${B.svg('belt', 70, 600, 1080, 70, '0 0 1080 70', BELT(B))}
    ${range(4).map((k) => B.big('pr' + k, 90, 520, 90, 70, k === 2 ? '📦' : '📦')).join('')}
    ${B.big('bad', 560, 440, 90, 54, '❌')}
    ${B.svg('gau', 1260, 140, 560, 320, '0 0 560 320', GAUGE(P, B))}
    ${B.chip('pm', 1240, 480, '⚠️ ' + L('هيعطل خلال 3 أيام ← نصلّحه قبلها', 'will fail in 3 days → fix it first'), 'c-amber big', 600)}
  </div>
  <div id="lf-s7" class="mv-stage">
    ${B.svg('map', 70, 140, 900, 520, '0 0 900 520', MAP(B))}
    ${B.card('d7', 1040, 150, 820, 0, 'c-blue', { row: true, ic: '🚚', h: L('اللوجستيات', 'Logistics'), p: L('تحسين مسارات التوصيل', 'optimising delivery routes') })}
    ${B.chip('lng', 1040, 330, '❌ ' + L('طريق عشوائي: 42 كم', 'random route: 42 km'), 'c-red big')}
    ${B.chip('sht', 1040, 430, '✅ ' + L('أقصر مسار: 18 كم', 'shortest route: 18 km'), 'c-green big')}
    ${B.chip('sav', 1040, 530, '⛽ ' + L('وقت أقل · بنزين أقل', 'less time · less fuel'), 'c-amber')}
  </div>
  <div id="lf-s8" class="mv-stage">
    ${[['🏥', L('الصحة', 'Healthcare'), L('التشخيص بالصور · دعم اكتشاف الأدوية', 'image diagnosis · drug discovery'), 'c-pink'], ['🌾', L('الزراعة', 'Agriculture'), L('ميعاد الحصاد · كشف الآفات', 'harvest timing · pests'), 'c-green'],
      ['🏭', L('التصنيع', 'Manufacturing'), L('فحص الجودة · الصيانة التنبؤية', 'quality inspection · predictive maintenance'), 'c-amber'], ['🚚', L('اللوجستيات', 'Logistics'), L('تحسين مسارات التوصيل', 'route optimisation'), 'c-blue']]
      .map(([ic, h, p, c], k) => B.card('r' + k, 70 + k * 450, 150, 420, 300, c, { ic, h, p })).join('')}
    ${B.mid('rp', 520, '🔧 ' + L('الصيانة التنبؤية = نتنبّأ بعطل الآلة قبل ما يحصل', 'predictive maintenance = predicting a failure before it happens'), 'c-amber big')}
  </div>

    ${U.hd(0, '🎯 ' + L('أنظمة التوصية', 'Recommendation systems'))}
    ${U.hd(1, '🎙️ ' + L('المساعد الصوتي', 'Voice assistants'))}
    ${U.hd(2, '🌐 ' + L('الترجمة الآلية', 'Machine translation'))}
    ${U.hd(3, '🙂 ' + L('التعرّف على الوجه', 'Face recognition'))}
    ${U.hd(4, '🏥 ' + L('الصحة: التشخيص بالصور', 'Healthcare: image diagnosis'))}
    ${U.hd(5, '🌾 ' + L('الزراعة: الحصاد والآفات', 'Agriculture: harvest and pests'))}
    ${U.hd(6, '🏭 ' + L('التصنيع: الجودة والصيانة التنبؤية', 'Manufacturing: quality and predictive maintenance'))}
    ${U.hd(7, '🚚 ' + L('اللوجستيات: أحسن طريق للتوصيل', 'Logistics: the best delivery route'))}
    ${U.hd(8, '📌 ' + L('الخلاصة: الذكاء الاصطناعي في 4 صناعات', 'Recap: AI in four industries'))}
    ${U.nt(4, L('الـAI يعلّم على المكان المشكوك فيه… والقرار النهائي للطبيب', 'AI flags the suspicious spot… the final decision is the doctor’s'), 'ok')}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    /* 0 — recommendations */
    let c = at(0);
    frame(0, c);
    IN(q('his'), c + 0.3, 0.5, { x: -40 * sx });
    tl.fromTo(all('#lf-his li'), { opacity: 0, x: 20 * sx }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.3 }, c + 0.7);
    IN(q('ar0'), c + 1.8, 0.3); POP(q('bot0'), c + 2.0, 0.5); SND('pop', c + 2.0);
    tl.fromTo(all('#lf-bot0 .eyes circle'), { attr: { fill: '#34d399' } }, { attr: { fill: '#fde68a' }, duration: 0.2, yoyo: true, repeat: 5 }, c + 2.4);
    IN(q('ar1'), c + 3.4, 0.3); IN(q('ph'), c + 3.6, 0.5, { y: 30 });
    tl.fromTo(all('#lf-ph .tile'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.25 }, c + 4.0);
    tl.fromTo(all('#lf-ph .t0 b'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 5.0); SND('ok', c + 5.0);
    IN(q('d0'), c + 5.6, 0.5, { y: 24 }); IN(q('x0'), c + 6.6, 0.4, { y: 16 });

    /* 1 — voice assistant */
    c = at(1);
    frame(1, c);
    leave(1, c);
    IN(q('st'), c + 0.4, 0.5, { x: -40 * sx }); POP(q('say'), c + 0.9, 0.4); SND('pop', c + 0.9);
    IN(q('wv'), c + 1.3, 0.3);
    tl.fromTo(all('#lf-wv .wb'), { scaleY: 0.2, transformOrigin: '50% 50%' }, { scaleY: 1, duration: 0.25, stagger: 0.04, yoyo: true, repeat: 1 }, c + 1.4);
    range(3).forEach((k) => { IN(q('v' + k), c + 2.4 + k * 0.9, 0.45, { y: 24 }); SND('pop', c + 2.4 + k * 0.9); if (k < 2) IN(q('va' + k), c + 2.9 + k * 0.9, 0.3); });
    glow(M, q('v2'), c + 5.2, 'rgba(52,211,153,.95)'); SND('ok', c + 5.2);
    IN(q('d1'), c + 5.8, 0.5, { y: 24 }); IN(q('x1'), c + 6.8, 0.4, { y: 16 });

    /* 2 — machine translation */
    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('me'), c + 0.4, 0.5, { x: -40 * sx });
    POP(q('bot2'), c + 1.2, 0.5); IN(q('lang'), c + 1.5, 0.4, { y: 12 });
    tl.fromTo(all('#lf-me .sweep'), { opacity: 1, top: '0%' }, { top: '96%', duration: 1.2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, c + 2.0);
    tl.fromTo(all('#lf-bot2 .eyes circle'), { attr: { fill: '#38bdf8' } }, { attr: { fill: '#fde68a' }, duration: 0.2, yoyo: true, repeat: 7 }, c + 2.0);
    IN(q('ma'), c + 4.6, 0.6, { x: 40 * sx }); SND('ok', c + 4.6);
    IN(q('d2'), c + 5.8, 0.5, { y: 24 });

    /* 3 — face recognition */
    c = at(3);
    frame(3, c);
    leave(3, c);
    IN(q('p3'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#lf-p3 .box'), { opacity: 0, scale: 1.3, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.5 }, c + 1.2); SND('tap', c + 1.2);
    tl.fromTo(all('#lf-p3 .pts'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, c + 1.8);
    tl.to(all('#lf-p3 .lk.c'), { opacity: 0, duration: 0.2 }, c + 2.8);
    tl.fromTo(all('#lf-p3 .lk.o'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 2.9); SND('ok', c + 2.9);
    tl.to(all('#lf-p3 .scr'), { backgroundColor: '#064e3b', duration: 0.4 }, c + 2.9);
    IN(q('gal'), c + 3.6, 0.5, { y: 24 });
    tl.fromTo(all('#lf-gal span'), { boxShadow: '0 0 0 0 rgba(56,189,248,0)' }, { boxShadow: '0 0 0 5px rgba(56,189,248,1)', duration: 0.3, stagger: 0.35 }, c + 4.2);
    tl.fromTo(all('#lf-gal i'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.35 }, c + 4.4);
    IN(q('d3'), c + 5.8, 0.5, { y: 24 }); IN(q('x3'), c + 7.0, 0.4, { y: 16 });

    /* 4 — healthcare */
    c = at(4);
    frame(4, c, 7.6);
    leave(4, c);
    IN(q('xr'), c + 0.4, 0.5, { scale: 0.9 });
    tl.fromTo(all('#lf-xr .beam'), { opacity: 1, attr: { y: 40 } }, { attr: { y: 380 }, duration: 1.2, ease: 'power1.inOut', yoyo: true, repeat: 1 }, c + 1.0);
    tl.fromTo(all('#lf-xr .mark'), { opacity: 0, scale: 1.8, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 3.4); SND('bad', c + 3.4);
    POP(q('mk'), c + 3.7, 0.4);
    IN(q('dr'), c + 4.4, 0.5, { x: 40 * sx }); IN(q('dok'), c + 5.0, 0.4, { y: 12 }); SND('ok', c + 5.0);
    IN(q('d4'), c + 5.6, 0.5, { y: 24 }); POP(q('mol'), c + 6.4, 0.5); IN(q('drug'), c + 6.7, 0.4, { x: 30 * sx });

    /* 5 — agriculture */
    c = at(5);
    frame(5, c);
    leave(5, c);
    IN(q('fld'), c + 0.4, 0.5, { y: 24 });
    tl.fromTo(all('#lf-fld .pl'), { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: 0.3, stagger: 0.02, ease: 'back.out(2)' }, c + 0.8);
    tl.fromTo(all('#lf-fld .scanl'), { opacity: 1, attr: { x: 20 } }, { attr: { x: 870 }, duration: 2.0, ease: 'none' }, c + 1.8);
    tl.to(all('#lf-fld .scanl'), { opacity: 0, duration: 0.2 }, c + 3.8);
    tl.fromTo(all('#lf-fld .bugbox'), { opacity: 0, scale: 1.6, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4 }, c + 3.0); SND('bad', c + 3.0);
    POP(q('bug'), c + 3.4, 0.4);
    IN(q('cal'), c + 4.4, 0.5, { y: 24 }); SND('ok', c + 4.6);
    IN(q('d5'), c + 5.8, 0.5, { y: 24 });

    /* 6 — manufacturing */
    c = at(6);
    frame(6, c);
    leave(6, c);
    IN(q('d6'), c + 0.3, 0.5, { y: -20 }); IN(Q('belt cam beam6'), c + 0.6, 0.4);
    range(4).forEach((k) => {
      const t = c + 1.0 + k * 0.7;
      tl.fromTo(q('pr' + k), { opacity: 0, x: 0 }, { opacity: 1, duration: 0.2 }, t);
      tl.to(q('pr' + k), { x: (k === 2 ? 470 : 1000) * sx, duration: k === 2 ? 1.0 : 2.2, ease: 'none' }, t + 0.2);
      if (k === 2) { POP(q('bad'), t + 1.2, 0.3); SND('bad', t + 1.2); tl.to(q('pr' + k), { y: 160, rotation: 40, opacity: 0, duration: 0.6, ease: 'power2.in' }, t + 1.3); }
      else tl.to(q('pr' + k), { opacity: 0, duration: 0.2 }, t + 2.4);
    });
    OUT(q('bad'), c + 4.4, 0.3);
    IN(q('gau'), c + 4.4, 0.5, { y: 24 });
    const ND = all('#lf-gau .nd');
    tl.fromTo(ND, { rotation: -80, svgOrigin: '280 290' }, { rotation: 70, svgOrigin: '280 290', duration: 1.4, ease: 'power2.in' }, c + 4.8);
    POP(q('pm'), c + 6.3, 0.5); SND('bad', c + 6.3);

    /* 7 — logistics */
    c = at(7);
    frame(7, c);
    leave(7, c);
    IN(q('map'), c + 0.4, 0.5, { y: 24 }); IN(q('d7'), c + 0.6, 0.5, { x: 30 * sx });
    tl.fromTo(all('#lf-map .long'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'none' }, c + 1.2);
    POP(q('lng'), c + 3.1, 0.4); SND('bad', c + 3.1);
    tl.fromTo(all('#lf-map .short'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.0, ease: 'power1.inOut' }, c + 3.8);
    POP(q('sht'), c + 4.9, 0.4); SND('ok', c + 4.9);
    const TR = all('#lf-map .truck'), path = M.board.querySelector('#lf-map .short');
    tl.fromTo(TR, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0 } }, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 2.2, ease: 'power1.inOut' }, c + 5.2);
    IN(q('sav'), c + 6.6, 0.4, { y: 12 });

    /* 8 — recap */
    c = at(8);
    frame(8, c);
    leave(8, c);
    range(4).forEach((k) => { IN(q('r' + k), c + 0.5 + k * 0.5, 0.5, { y: 30 }); SND('pop', c + 0.5 + k * 0.5); });
    POP(q('rp'), c + 2.8, 0.5);

    /* living loops */
    M.loop(0, 7.2, () => M.glowLoop(all('#lf-ph .t0'), 'rgba(52,211,153,.9)', 1.0));
    M.loop(1, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#lf-wv .wb'), { scaleY: 0.35, transformOrigin: '50% 50%', duration: 0.35, stagger: { each: 0.05, from: 'random' }, ease: 'sine.inOut' }));
    M.loop(2, 6.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#lf-me .sweep'), { top: '0%' }, { top: '96%', duration: 1.6, ease: 'sine.inOut' }));
    M.loop(3, 7.6, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#lf-p3 .box'), { opacity: 1 }, { opacity: 0.35, duration: 0.8 }));
    M.loop(4, 7.4, () => M.breathe(all('#lf-xr .mark'), 1.12, 0.8));
    M.loop(4, 7.4, () => gsap.timeline({ repeat: -1 }).to(all('#lf-mol .mol'), { rotation: 360, svgOrigin: '100 100', duration: 8, ease: 'none' }));
    M.loop(5, 6.6, () => M.breathe(all('#lf-fld .bugbox'), 1.1, 0.7));
    M.loop(6, 7.2, () => gsap.timeline({ repeat: -1 }).fromTo(all('#lf-belt .mv'), { strokeDashoffset: 0 }, { strokeDashoffset: -48, duration: 0.8, ease: 'none' }));
    M.loop(6, 7.2, () => gsap.timeline({ repeat: -1, yoyo: true }).to(ND, { rotation: 78, svgOrigin: '280 290', duration: 0.4, ease: 'sine.inOut' }));
    M.loop(7, 7.6, () => gsap.timeline({ repeat: -1, repeatDelay: 0.6 }).fromTo(TR, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0 } }, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 }, duration: 2.6, ease: 'power1.inOut' }));
    M.loop(8, 3.6, () => glowCycle(Q('r0 r1 r2 r3'), 'rgba(52,211,153,.9)', 0.5));
    return M.done();
  });

  /* ═════════════════════════ cautionMovie ═════════════════════════ */
  K.defineAnim('cautionMovie', (stage, props, api) => {
    const P = 'ca-', U = MK.ui(P), B = kit(P, MK.RTL());
    const M = MK.create(stage, api, { props,
      cls: 'mv-ca mv-l12 mv-l13', prefix: P, beats: 6, cast: { dr: 'doctor', ap: 'applicant' },
      html: (L) => `
  <div id="ca-s0" class="mv-stage">
    ${B.card('g0', 70, 150, 580, 520, 'c-blue', { ic: '🔍', h: L('الأنماط', 'Patterns'), p: L('بيلاقي ويصنّف الأنماط في بيانات معقّدة (صور ونصوص)', 'finds and classifies patterns in complex data (images, text)'), html: `<svg class="l12-in tall" viewBox="0 0 400 300">${DOTS}</svg>` })}
    ${B.card('g1', 670, 150, 580, 520, 'c-violet', { ic: '🖼️', h: L('التعرّف والتوليد', 'Recognition & generation'), p: L('للصور والصوت والنص', 'of images, audio and text'), html: `<div class="l12-recog"><span class="pic">🐱</span><span class="arr">${B.arrow}</span><span class="lab">${L('قطة', 'cat')} ✓</span></div><div class="l12-gen">✍️ <i>${L('بيكتب نص جديد…', 'writing new text…')}</i></div>` })}
    ${B.card('g2', 1270, 150, 580, 520, 'c-green', { ic: '📊', h: L('التنبؤ الاحتمالي', 'Probabilistic prediction'), p: L('بيتنبّأ من البيانات', 'predicts from data'), html: `<div class="l12-pr"><b>🌧️ ${L('مطر بكرة', 'rain tomorrow')}</b><span class="l12-bar o"><i data-w="70" style="width:70%"></i></span><em>70%</em></div>` })}
  </div>
  <div id="ca-s1" class="mv-stage">
    ${[['⚖️', L('الأحكام الأخلاقية', 'Ethical judgements'), L('ممكن تأدّي لتمييز أو تحيّز', 'may lead to discrimination')], ['🔒', L('الخصوصية', 'Privacy'), L('بيانات شخصية', 'personal data')],
      ['👨‍⚖️', L('القرار النهائي', 'The final decision'), L('مين المسؤول عن النتيجة؟', 'who is responsible?')], ['📊', L('بيانات متحيّزة', 'Biased data'), L('الحكم بيبقى غير دقيق', 'judgements become inaccurate')],
      ['😵', L('الهلوسة', 'Hallucination'), L('كلام مختلف عن الحقيقة', 'content that differs from the facts')], ['©️', L('حقوق النشر', 'Copyright'), L('استخدام أعمال محمية في التدريب', 'protected works as training data')],
      ['⬛', L('الصندوق الأسود', 'The black box'), L('مش واضح وصل للحكم إزاي', 'unclear how it reached the result')]]
      .map(([ic, h, p], k) => B.card('w' + k, 70 + (k % 4) * 450, 140 + Math.floor(k / 4) * 280, 420, 250, 'c-red', { ic, h, p })).join('')}
  </div>
  <div id="ca-s2" class="mv-stage">
    ${B.svg('xr', 90, 150, 420, 420, '0 0 440 440', XRAY)}
    ${B.chip('sug', 560, 200, '🤖 ' + L('الـAI يقترح: مكان مشكوك فيه', 'AI suggests: a suspicious spot'), 'c-blue big')}
    ${B.ch('dr', 640, 330, 'md')}
    ${B.chip('dec', 900, 420, '👨‍⚕️ ' + L('الطبيب يراجع ويقرّر', 'the doctor reviews and decides'), 'c-green big')}
    ${B.chip('why', 900, 520, '❤️ ' + L('الغلط بيأثر على حياة إنسان', 'a mistake affects a human life'), 'c-red')}
    ${B.stamp('hum', 1300, 230, '✓ ' + L('القرار النهائي للإنسان', 'the final decision is human'), true)}
  </div>
  <div id="ca-s3" class="mv-stage">
    ${B.ch('ap', 70, 380, 'md')}
    ${B.card('app', 60, 150, 360, 0, 'c-slate', { h: '📝 ' + L('طلب قرض', 'Loan application'), p: L('أحمد · 22 سنة', 'Ahmed · 22') })}
    ${B.big('a1', 450, 330, 90, 60, B.arrow, 'l12-gold')}
    ${B.svg('cube', 580, 170, 400, 360, '0 0 400 360', CUBE)}
    ${B.big('a2', 1000, 330, 90, 60, B.arrow, 'l12-gold')}
    ${B.chip('rej', 1120, 320, '❌ ' + L('مرفوض', 'rejected'), 'c-red big')}
    ${B.chip('q', 1120, 430, '❓ ' + L('ليه؟… محدش عارف', 'why?… nobody knows'), 'c-amber big')}
  </div>
  <div id="ca-s4" class="mv-stage">
    ${B.svg('cube2', 120, 170, 400, 360, '0 0 400 360', CUBE)}
    <div id="ca-num" class="l12u l12-doc l12-mat later" style="${B.at(640, 150, 820, 300)}"><div class="ltr code">${range(6).map((r) => range(6).map((k) => ((((r * 7 + k * 13) % 17) - 8) / 4.3).toFixed(2)).join('  ')).join('<br>')}</div></div>
    ${B.chip('mil', 640, 490, '🔢 ' + L('ملايين ومليارات الأرقام (الأوزان)', 'millions or billions of numbers (weights)'), 'c-slate big')}
    ${B.chip('res', 640, 590, '✅ ' + L('النتيجة واضحة… بس مفيش سبب مكتوب نقدر نقراه', 'the result is clear… but there is no written reason to read'), 'c-amber')}
  </div>
  <div id="ca-s5" class="mv-stage">
    ${[['🏦', L('قرض اترفض', 'A rejected loan'), L('محدش عارف يشرح ليه', 'no one can explain why')], ['💼', L('وظيفة اترفضت', 'A rejected job'), L('يمكن بسبب تحيّز', 'maybe because of bias')],
      ['🩺', L('تشخيص طبي', 'A medical diagnosis'), L('الطبيب لازم يفهم شاف إيه', 'the doctor must know what it saw')], ['🛡️', L('رفض تأمين', 'A refused insurance'), L('لو غلط… مين يتحاسب؟', 'if wrong… who is accountable?')]]
      .map(([ic, h, p], k) => B.card('h' + k, 70 + (k % 2) * 910, 140 + Math.floor(k / 2) * 250, 870, 220, 'c-red', { row: true, ic, h, p })).join('')}
  </div>
    ${U.hd(0, '💪 ' + L('الذكاء الاصطناعي شاطر في إيه؟', 'What is AI good at?'))}
    ${U.hd(1, '⚠️ ' + L('ومحتاج حذر في إيه؟', 'And where do we need caution?'))}
    ${U.hd(2, '🩻 ' + L('الـAI يقترح… والطبيب يقرّر', 'AI suggests… the doctor decides'))}
    ${U.hd(3, '⬛ ' + L('مشكلة الصندوق الأسود', 'The black-box problem'))}
    ${U.hd(4, '🔦 ' + L('جوّه الصندوق: ملايين الأرقام', 'Inside the box: millions of numbers'))}
    ${U.hd(5, '🚨 ' + L('فين الصندوق الأسود ممكن يأذي؟', 'Where can the black box hurt?'))}
    ${U.nt(1, '⚠️ ' + L('«نسيب الأحكام الأخلاقية للـAI بالكامل» ← غلط', '“Leave ethical judgements fully to AI” → false'), 'bad')}
    ${U.nt(3, L('لو مش فاهمين «ليه»، صعب نتحقّق إن القرار صح أو نكتشف الغلط', 'Without the “why”, we cannot check the decision or find the mistake'), 'warn')}
    ${U.nt(4, L('من غير «ليه» مانقدرش نتحقّق ولا نكتشف التحيّز ولا نعرف نحاسب مين', 'Without the “why” we cannot verify, spot bias or hold anyone accountable'), 'bad')}
    ${U.nt(5, '✅ ' + L('الحل: إنسان يراجع في المهام الحسّاسة — والعالم بيشتغل على XAI', 'The fix: a human reviews sensitive tasks — and the world works on XAI'), 'ok')}`,
    });
    const { q, Q, tl, IN, POP, OUT, SND, frame, sx } = M;
    const all = (sel) => M.board.querySelectorAll(sel);
    const at = M.at;
    const leave = (k, c) => { if (k > 0) OUT(q('s' + (k - 1)), c, 0.4); };

    /* 0 — good at */
    let c = at(0);
    frame(0, c);
    IN(q('g0'), c + 0.4, 0.5, { y: 30 });
    tl.fromTo(all('#ca-g0 .dt'), { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.01 }, c + 0.8);
    tl.to(all('#ca-g0 .dt'), { attr: { cx: (k, e) => +e.dataset.x, cy: (k, e) => +e.dataset.y }, fill: (k, e) => ['#38bdf8', '#f472b6', '#fbbf24'][+e.getAttribute('class').slice(-1)], duration: 1.2, ease: 'power2.inOut' }, c + 1.6);
    SND('pop', c + 1.6);
    IN(q('g1'), c + 2.8, 0.5, { y: 30 });
    tl.fromTo(all('#ca-g1 .l12-recog > span'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.4, ease: 'back.out(2)' }, c + 3.3);
    tl.fromTo(all('#ca-g1 .l12-gen i'), { opacity: 0 }, { opacity: 1, duration: 0.5 }, c + 4.6);
    IN(q('g2'), c + 5.2, 0.5, { y: 30 });
    tl.fromTo(all('#ca-g2 .l12-bar i'), { width: '0%' }, { width: '70%', duration: 1.0 }, c + 5.8); SND('ok', c + 6.8);

    /* 1 — needs caution */
    c = at(1);
    frame(1, c, 6.6);
    leave(1, c);
    range(7).forEach((k) => { IN(q('w' + k), c + 0.5 + k * 0.6, 0.45, { y: 30 }); SND('pop', c + 0.5 + k * 0.6); });

    /* 2 — the doctor decides */
    c = at(2);
    frame(2, c);
    leave(2, c);
    IN(q('xr'), c + 0.4, 0.5, { scale: 0.9 });
    tl.fromTo(all('#ca-xr .beam'), { opacity: 1, attr: { y: 40 } }, { attr: { y: 380 }, duration: 1.1, ease: 'power1.inOut', yoyo: true, repeat: 1 }, c + 0.9);
    tl.fromTo(all('#ca-xr .mark'), { opacity: 0, scale: 1.8, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, c + 3.1);
    POP(q('sug'), c + 3.4, 0.4); SND('pop', c + 3.4);
    IN(q('dr'), c + 4.2, 0.5, { x: 40 * sx });
    POP(q('dec'), c + 5.0, 0.4); SND('ok', c + 5.0);
    IN(q('why'), c + 5.8, 0.4, { y: 12 });
    stampIn(M, q('hum'), c + 6.6);

    /* 3 — the black box */
    c = at(3);
    frame(3, c, 7.2);
    leave(3, c);
    IN(Q('ap app'), c + 0.4, 0.5, { x: -30 * sx });
    IN(q('a1'), c + 1.4, 0.3);
    tl.to(q('app'), { x: 560 * sx, y: 120, scale: 0.3, opacity: 0, duration: 0.8, ease: 'power2.in' }, c + 1.8);
    POP(q('cube'), c + 1.2, 0.5);
    tl.fromTo(q('cube'), { rotation: 0 }, { rotation: 3, duration: 0.08, yoyo: true, repeat: 9, transformOrigin: '50% 50%' }, c + 2.7);
    IN(q('a2'), c + 3.6, 0.3); POP(q('rej'), c + 3.9, 0.4); SND('bad', c + 3.9);
    M.mood('ap', true, c + 4.0);
    POP(q('q'), c + 5.0, 0.4);

    /* 4 — inside the box */
    c = at(4);
    frame(4, c, 6.0);
    leave(4, c);
    IN(q('cube2'), c + 0.4, 0.5);
    tl.to(all('#ca-cube2 path'), { fillOpacity: 0.25, stroke: '#38bdf8', strokeWidth: 4, duration: 0.8 }, c + 1.2);
    IN(q('num'), c + 1.6, 0.6, { x: 40 * sx });
    tl.fromTo(all('#ca-num .code'), { y: 0 }, { y: -40, duration: 2.0, ease: 'none' }, c + 2.0);
    IN(q('mil'), c + 2.6, 0.4, { y: 12 }); IN(q('res'), c + 3.8, 0.4, { y: 12 }); SND('bad', c + 3.8);

    /* 5 — where it hurts */
    c = at(5);
    frame(5, c, 4.4);
    leave(5, c);
    range(4).forEach((k) => { IN(q('h' + k), c + 0.5 + k * 0.6, 0.45, { y: 24 }); SND('bad', c + 0.5 + k * 0.6); });

    /* living loops */
    M.loop(0, 7.4, () => gsap.timeline({ repeat: -1, yoyo: true }).to(all('#ca-g0 .dt'), { attr: { r: 13 }, duration: 0.8, stagger: { each: 0.02, from: 'random' }, ease: 'sine.inOut' }));
    M.loop(1, 5.0, () => glowCycle(Q('w0 w1 w2 w3 w4 w5 w6'), 'rgba(248,113,113,.9)', 0.4));
    M.loop(2, 7.2, () => M.breathe(all('#ca-xr .mark'), 1.12, 0.8));
    M.loop(3, 6.0, () => gsap.timeline({ repeat: -1, repeatDelay: 1.2 }).fromTo(q('cube'), { rotation: 0 }, { rotation: 3, duration: 0.08, yoyo: true, repeat: 7, transformOrigin: '50% 50%' }));
    M.loop(4, 4.4, () => gsap.timeline({ repeat: -1, yoyo: true }).fromTo(all('#ca-num .code'), { y: -40 }, { y: 0, duration: 3, ease: 'sine.inOut' }));
    M.loop(5, 3.2, () => glowCycle(Q('h0 h1 h2 h3'), 'rgba(248,113,113,.9)', 0.5));
    return M.done();
  });
})();

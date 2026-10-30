/* =========================================================
 * screens/sheet-art.js — the drawings of the printable summaries. Each one is
 * a small labelled SVG; `currentColor` is the lesson colour. Words go through
 * T(ar, en), so every drawing follows the language of the sheet.
 * ========================================================= */
(function () {
  'use strict';
  const T = (ar, en) => RV.i18n.t({ ar, en });
  const svg = (w, h, inner) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', `0 0 ${w} ${h}`);
    el.innerHTML = inner;
    return el;
  };
  const txt = (x, y, s, size, extra) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size || 12}" ${extra || ''}>${s}</text>`;
  const seq = (n, f) => Array.from({ length: n }, (_, k) => f(k)).join('');
  const axes = (x, y, w, h) => `<path d="M${x} ${y}V${y + h}H${x + w}" fill="none" stroke="#64748b" stroke-width="2.5" stroke-linecap="round"/>`;
  const head = (x, y, dx, dy) => { const l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l; return `<path d="M${x - ux * 9 - uy * 5} ${y - uy * 9 + ux * 5}L${x} ${y}L${x - ux * 9 + uy * 5} ${y - uy * 9 - ux * 5}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const line = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>${head(x2, y2, x2 - x1, y2 - y1)}`;
  const tag = (x, y, w, h, s, fill, size) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="#334155" stroke-width="1.5"/>${txt(x + w / 2, y + h / 2 + 4.5, s, size || 12)}`;
  /* a fixed scatter, so every print of a sheet looks the same */
  const SCATTER = [[30, 118], [52, 112], [70, 96], [92, 100], [112, 82], [134, 86], [152, 66], [176, 62], [196, 50], [218, 44], [238, 30]];

  RV.sheet.art = {
    crowd() {
      const pick = [3, 10, 15, 21, 27, 34, 38];
      return svg(280, 150, `<rect x="2" y="2" width="276" height="146" rx="14" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
        ${seq(40, (k) => { const on = pick.includes(k), x = 26 + (k % 8) * 32, y = 24 + Math.floor(k / 8) * 26; return `<circle cx="${x}" cy="${y}" r="9" fill="${on ? '#f59e0b' : '#94a3b8'}"/>${on ? `<circle cx="${x}" cy="${y}" r="12.5" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3"/>` : ''}`; })}`);
    },
    scale() {
      const row = (y, a, b, c, col) => `<path d="M30 ${y}H250" stroke="#94a3b8" stroke-width="3"/>${[30, 140, 250].map((x, k) => `<circle cx="${x}" cy="${y}" r="7" fill="${col}"/>${txt(x, y - 12, [a, b, c][k], 12)}`).join('')}`;
      return svg(280, 150, `${row(36, '160', '170', '180', '#f59e0b')}${row(84, '50', '70', '90', '#f59e0b')}${line(140, 95, 140, 113)}${row(136, '0', '0.5', '1', '#059669')}`);
    },
    json() {
      const lines = ['{', '  "country": "EGY",', '  "year": 2024,', '  "value": 114500000', '}'];
      return svg(230, 110, `<rect x="2" y="2" width="226" height="106" rx="11" fill="#0f172a"/>
        ${lines.map((l, k) => `<text x="16" y="${25 + k * 18}" font-size="12.5" direction="ltr" xml:space="preserve" style="font-family:var(--mono);fill:#6ee7b7">${l}</text>`).join('')}`);
    },
    moore() {
      const pts = seq(7, (k) => { const x = 40 + k * 36, y = 126 - 2 ** k * 1.7; return `<circle cx="${x}" cy="${y}" r="4.5" fill="currentColor"/>${txt(x, y - 9, `×${2 ** k}`, 10.5)}`; });
      const path = Array.from({ length: 7 }, (_, k) => `${k ? 'L' : 'M'}${40 + k * 36} ${126 - 2 ** k * 1.7}`).join('');
      return svg(290, 150, `${axes(26, 8, 256, 120)}<path d="${path}" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>${pts}
        ${txt(160, 144, T('كل سنتين ← الضعف', 'every 2 years → double'), 11.5)}`);
    },
    arvr() {
      return svg(290, 124, `<rect x="4" y="6" width="134" height="88" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><path d="M12 84l34-34 22 20 18-14 44 28" fill="none" stroke="#64748b" stroke-width="2.5"/><rect x="58" y="22" width="66" height="26" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="2"/>${txt(91, 40, T('إضافة', 'added'), 11.5)}
        <rect x="152" y="6" width="134" height="88" rx="10" fill="#1e1b4b" stroke="#7c3aed" stroke-width="2"/><circle cx="196" cy="36" r="13" fill="#a78bfa"/><path d="M160 84l40-30 26 18 22-16 30 28" fill="none" stroke="#a78bfa" stroke-width="2.5"/>
        ${txt(71, 114, T('AR يضيف فوق الواقع', 'AR adds to reality'), 12)}${txt(219, 114, T('VR عالم كامل بديل', 'VR replaces it all'), 12)}`);
    },
    edge() {
      return svg(290, 124, `${tag(10, 40, 84, 44, '🚗', '#d1fae5', 20)}${tag(196, 40, 84, 44, '☁️', '#e0f2fe', 20)}<path d="M102 62H188" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="6 5"/>${txt(145, 54, T('بطيء', 'slow'), 11)}
        ${txt(52, 26, T('طرفية: قرار فوري', 'edge: instant'), 11.5)}${txt(238, 26, T('سحابة: بعيدة', 'cloud: far'), 11.5)}${txt(145, 112, T('بتعالج بعض البيانات محليًا على المركبة', 'A self-driving car decides on the device'), 11.5)}`);
    },
    nn() {
      const L = [[40, 3], [130, 4], [220, 4], [300, 2]], ys = (n, k) => 80 - ((n - 1) * 30) / 2 + k * 30;
      let edges = '', dots = '';
      L.forEach(([x, n], i) => {
        if (i < L.length - 1) { const [x2, n2] = L[i + 1]; for (let a = 0; a < n; a++) for (let b = 0; b < n2; b++) edges += `<path d="M${x} ${ys(n, a)}L${x2} ${ys(n2, b)}" stroke="#cbd5e1" stroke-width="1.2"/>`; }
        for (let a = 0; a < n; a++) dots += `<circle cx="${x}" cy="${ys(n, a)}" r="10" fill="${['#e0f2fe', '#ede9fe', '#ede9fe', '#d1fae5'][i]}" stroke="${['#0284c7', '#7c3aed', '#7c3aed', '#059669'][i]}" stroke-width="2.5"/>`;
      });
      return svg(340, 176, `${edges}${dots}${txt(40, 170, T('إدخال', 'Input'), 12)}${txt(175, 170, T('طبقات مخفية', 'Hidden layers'), 12)}${txt(300, 170, T('إخراج', 'Output'), 12)}`);
    },
    neuron() {
      const inp = [[20, 22, 'x₁', 'w₁'], [20, 70, 'x₂', 'w₂'], [20, 118, 'x₃', 'w₃']];
      return svg(340, 140, `${inp.map(([x, y, a, w]) => `<circle cx="${x + 12}" cy="${y}" r="15" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>${txt(x + 12, y + 4.5, a, 12)}<path d="M${x + 28} ${y}L150 70" stroke="#94a3b8" stroke-width="2.5"/>${txt((x + 28 + 150) / 2, (y + 70) / 2 - 5, w, 11)}`).join('')}
        <circle cx="172" cy="70" r="26" fill="#ede9fe" stroke="#7c3aed" stroke-width="2.5"/>${txt(172, 75, 'Σ + b', 13)}${line(199, 70, 236, 70)}${tag(238, 54, 42, 32, 'f( )', '#fef3c7', 12.5)}${line(282, 70, 322, 70)}${txt(258, 104, T('تنشيط', 'activation'), 11)}`);
    },
    keys() {
      const K = (x, y, c) => `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${c}" stroke-width="4"/><path d="M${x + 9} ${y}h26m-9 0v8m-8-8v6" stroke="${c}" stroke-width="4" fill="none"/>`;
      return svg(300, 150, `${txt(150, 15, T('متماثل: نفس المفتاح في الناحيتين', 'Common-key: the same key both ways'), 12)}${K(44, 42, '#d97706')}${tag(106, 26, 88, 32, '🔒', '#f1f5f9', 16)}${K(226, 42, '#d97706')}
        ${txt(150, 88, T('عام: العام يقفل · الخاص يفتح', 'Public-key: public locks · private opens'), 12)}${K(44, 116, '#0284c7')}${tag(106, 100, 88, 32, '🔒', '#f1f5f9', 16)}${K(226, 116, '#dc2626')}${txt(56, 144, T('عام', 'public'), 11)}${txt(240, 144, T('خاص', 'private'), 11)}`);
    },
    network() {
      return svg(340, 150, `${tag(6, 52, 70, 44, T('إنترنت', 'Internet'), '#fee2e2', 11.5)}${line(78, 74, 112, 74)}<rect x="114" y="34" width="22" height="80" rx="5" fill="#d97706"/>${txt(125, 130, T('جدار حماية', 'Firewall'), 11)}
        ${line(138, 60, 182, 34)}${line(138, 88, 182, 114)}${tag(184, 12, 150, 44, T('DMZ: ويب + بريد', 'DMZ: web + mail'), '#fef3c7', 11.5)}${tag(184, 92, 150, 44, T('الشبكة الداخلية', 'Internal network'), '#d1fae5', 11.5)}`);
    },
    risk() {
      const cell = 44, x0 = 54, y0 = 8;
      const col = (i, l) => { const v = (i + 1) * (l + 1); return v >= 6 ? '#fecaca' : v >= 3 ? '#fde68a' : '#bbf7d0'; };
      const dot = (i, l, s, v) => { const x = x0 + i * cell + cell / 2, y = y0 + (2 - l) * cell + cell / 2; return `<circle cx="${x}" cy="${y}" r="15" fill="#0f172a"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="12" style="fill:#fff">${s}=${v}</text>`; };
      return svg(250, 172, `${seq(9, (k) => { const i = k % 3, l = Math.floor(k / 3); return `<rect x="${x0 + i * cell}" y="${y0 + (2 - l) * cell}" width="${cell - 2}" height="${cell - 2}" rx="5" fill="${col(i, l)}"/>`; })}
        ${dot(2, 2, 'a', 9)}${dot(2, 1, 'c', 6)}${dot(0, 2, 'b', 3)}${dot(0, 0, 'd', 1)}${txt(x0 + 66, 160, T('التأثير →', 'Impact →'), 12)}<text x="24" y="80" text-anchor="middle" font-size="12" transform="rotate(-90 24 80)">${T('الاحتمالية →', 'Likelihood →')}</text>`);
    },
    semantic() {
      return svg(250, 150, `<rect x="4" y="4" width="242" height="142" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>${tag(14, 12, 222, 26, '&lt;header&gt;', '#bae6fd', 12)}${tag(14, 44, 222, 22, '&lt;nav&gt;', '#fde68a', 12)}${tag(14, 72, 222, 42, '&lt;main&gt;', '#bbf7d0', 12)}${tag(14, 120, 222, 20, '&lt;footer&gt;', '#ddd6fe', 11.5)}`);
    },
    responsive() {
      const dev = (x, y, w, h, n) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#f8fafc" stroke="#64748b" stroke-width="2.5"/>${seq(n, (k) => { const g = (w - 12 - (n - 1) * 5) / n; return `<rect x="${x + 6 + k * (g + 5)}" y="${y + 8}" width="${g}" height="${h - 16}" rx="3" fill="#bae6fd"/>`; })}`;
      return svg(290, 116, `${dev(4, 8, 138, 86, 3)}${dev(156, 22, 76, 72, 2)}${dev(246, 34, 40, 60, 1)}${txt(145, 112, T('نفس الصفحة بتتكيّف مع كل شاشة', 'One page adapts to every screen'), 11.5)}`);
    },
    wire() {
      return svg(230, 130, `<rect x="3" y="3" width="224" height="124" rx="8" fill="#fff" stroke="#64748b" stroke-width="2" stroke-dasharray="6 4"/><rect x="14" y="12" width="202" height="20" rx="3" fill="#cbd5e1"/>${tag(14, 40, 96, 56, '🖼️', '#e2e8f0', 16)}<rect x="120" y="42" width="96" height="9" fill="#cbd5e1"/><rect x="120" y="58" width="76" height="9" fill="#cbd5e1"/><rect x="120" y="74" width="62" height="20" rx="4" fill="#94a3b8"/><rect x="14" y="104" width="202" height="12" rx="3" fill="#e2e8f0"/>`);
    },
    funnel() {
      const row = (k, w, s, c) => `<path d="M${150 - w} ${8 + k * 44}H${150 + w}L${150 + w - 24} ${48 + k * 44}H${150 - w + 24}Z" fill="${c}"/>${txt(150, 33 + k * 44, s, 12)}`;
      return svg(300, 144, `${row(0, 140, T('100 زيارة', '100 visits'), '#bae6fd')}${row(1, 110, T('30 شافوا المنتج', '30 saw a product'), '#fde68a')}${row(2, 80, T('3 اشتروا ← CVR 3%', '3 bought → CVR 3%'), '#bbf7d0')}`);
    },
    intervals() {
      return svg(290, 150, `<path d="M145 6V128" stroke="#d97706" stroke-width="2.5" stroke-dasharray="6 5"/>${seq(10, (k) => { const miss = k === 6, o = [-22, 14, -8, 20, -14, 6, 62, -18, 10, -4][k], w = [72, 78, 66, 74, 70, 80, 60, 76, 68, 74][k], x = 145 + o - w / 2, y = 12 + k * 11.5; return `<path d="M${x} ${y}h${w}" stroke="${miss ? '#dc2626' : '#059669'}" stroke-width="4.5" stroke-linecap="round"/>`; })}${txt(145, 144, T('الخط = القيمة الحقيقية · الأحمر فاتها', 'Line = true value · red misses it'), 11.5)}`);
    },
    pvalue() {
      return svg(290, 86, `<rect x="16" y="26" width="258" height="18" rx="9" fill="#e2e8f0"/><rect x="16" y="26" width="129" height="18" rx="9" fill="#34d399"/><path d="M145 16V54" stroke="#d97706" stroke-width="3"/>${txt(145, 70, 'α = 0.05', 12.5)}${txt(80, 18, T('p ≤ α ← نرفض H₀', 'p < α → reject H₀'), 11.5)}${txt(214, 18, T('p > α ← مانرفضش', 'p ≥ α → do not reject H₀'), 11.5)}`);
    },
    balance() {
      return svg(250, 110, `<path d="M28 34L222 66" stroke="#64748b" stroke-width="5" stroke-linecap="round"/><path d="M125 50l-14 40h28z" fill="#94a3b8"/>${tag(8, 8, 92, 28, T('النوع الأول', 'Type I'), '#fecaca', 11.5)}${tag(150, 66, 92, 28, T('النوع التاني', 'Type II'), '#fde68a', 11.5)}${txt(125, 106, T('نقلّل α ← الأول يقلّ والتاني يزيد', 'Lower α → I falls, II rises'), 11.5)}`);
    },
    regression() {
      return svg(290, 150, `${axes(22, 8, 258, 124)}<path d="M26 122L262 26" stroke="#d97706" stroke-width="3"/>${SCATTER.map(([x, y], k) => { const ly = 122 - ((x - 26) * 96) / 236; return `${k % 3 === 1 ? `<path d="M${x} ${y}V${ly}" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 3"/>` : ''}<circle cx="${x}" cy="${y}" r="4.5" fill="#0284c7"/>`; }).join('')}${txt(150, 147, T('الخط الأصفر: y = ax + b · المتقطّع: المتبقّي', 'Line: y = ax + b · dashed: residual'), 11.5)}`);
    },
    confounder() {
      return svg(300, 124, `${tag(100, 4, 100, 34, T('☀️ حر الصيف', '☀️ Summer heat'), '#fde68a', 11.5)}${tag(4, 84, 118, 34, T('🍦 مبيعات آيس كريم', '🍦 Ice-cream sales'), '#bae6fd', 10.5)}${tag(178, 84, 118, 34, T('🏊 حوادث السباحة', '🏊 Swimming accidents'), '#fecaca', 10.5)}${line(124, 40, 80, 82)}${line(176, 40, 220, 82)}<path d="M126 101H174" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="5 4"/>${txt(150, 96, T('ارتباط', 'correlation'), 10.5)}`);
    },
    charts() {
      const bx = 10, lx = 130, sx = 250, hx = 370, mx = 490, Y = 12, H = 84;
      const box = (x) => `<rect x="${x}" y="${Y}" width="104" height="${H}" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>`;
      const bars = [40, 62, 30, 54].map((v, k) => `<rect x="${bx + 14 + k * 20}" y="${Y + H - 10 - v}" width="14" height="${v}" rx="2" fill="#0284c7"/>`).join('');
      const pl = [[0, 58], [18, 46], [36, 52], [54, 30], [72, 34], [86, 14]].map(([x, y], k) => `${k ? 'L' : 'M'}${lx + 10 + x} ${Y + 8 + y}`).join('');
      const dots = [[10, 62], [20, 54], [32, 56], [40, 42], [52, 40], [60, 28], [72, 24], [84, 12]].map(([x, y]) => `<circle cx="${sx + 8 + x}" cy="${Y + 6 + y}" r="3.5" fill="#d97706"/>`).join('');
      const heat = seq(16, (k) => `<rect x="${hx + 12 + (k % 4) * 20}" y="${Y + 6 + Math.floor(k / 4) * 18}" width="18" height="16" rx="2" fill="#dc2626" opacity="${[0.15, 0.2, 0.3, 0.2, 0.2, 0.5, 0.7, 0.3, 0.3, 0.7, 1, 0.5, 0.15, 0.3, 0.5, 0.2][k]}"/>`);
      const mosaic = `<rect x="${mx + 10}" y="${Y + 8}" width="50" height="28" fill="#38bdf8"/><rect x="${mx + 10}" y="${Y + 38}" width="50" height="38" fill="#34d399"/><rect x="${mx + 62}" y="${Y + 8}" width="32" height="44" fill="#38bdf8"/><rect x="${mx + 62}" y="${Y + 54}" width="32" height="22" fill="#34d399"/>`;
      const lab = [T('أعمدة', 'Bar'), T('خطوط', 'Line'), T('مبعثر', 'Scatter'), T('خريطة حرارية', 'Heatmap'), T('مستطيلات', 'Mosaic')];
      return svg(604, 118, `${[bx, lx, sx, hx, mx].map(box).join('')}${bars}<path d="${pl}" fill="none" stroke="#059669" stroke-width="3"/>${dots}${heat}${mosaic}${lab.map((s, k) => txt(62 + k * 120, 113, s, 12)).join('')}`);
    },
    classify() {
      const A = [[34, 30], [58, 22], [46, 52], [76, 44], [30, 70]], B = [[150, 96], [176, 84], [168, 112], [196, 104], [204, 76]];
      return svg(240, 130, `<rect x="2" y="2" width="236" height="126" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/><path d="M20 118L216 12" stroke="#d97706" stroke-width="2.5" stroke-dasharray="6 5"/>${A.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#0284c7"/>`).join('')}${B.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#dc2626"/>`).join('')}`);
    },
    cluster() {
      const G = [[[50, 36], '#0284c7'], [[186, 40], '#059669'], [[118, 96], '#d97706']];
      return svg(240, 130, `<rect x="2" y="2" width="236" height="126" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>${G.map(([[x, y], c]) => `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="5 4"/>${seq(5, (k) => `<circle cx="${x + Math.cos(k * 1.26) * 14}" cy="${y + Math.sin(k * 1.26) * 14}" r="5" fill="${c}"/>`)}`).join('')}`);
    },
    grid() {
      return svg(240, 130, `${seq(15, (k) => `<rect x="${12 + (k % 5) * 44}" y="${6 + Math.floor(k / 5) * 40}" width="40" height="36" rx="6" fill="${k === 7 ? '#fecaca' : '#e2e8f0'}"/>`)}${txt(34, 111, '🤖', 20)}${txt(210, 111, '🏁', 20)}${txt(122, 71, '🕳️', 18)}`);
    },
    features() {
      const stage = (x, inner, s) => `<rect x="${x}" y="6" width="74" height="74" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>${inner}${txt(x + 37, 100, s, 11.5)}`;
      return svg(390, 110, `${stage(4, `<text x="41" y="62" text-anchor="middle" font-size="52" style="fill:#0f172a">8</text>`, T('الصورة', 'Image'))}${line(80, 43, 100, 43)}
        ${stage(104, `<path d="M122 26l18-8M152 28l10 16M124 60l18 8M156 56l-14 12" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>`, T('خطوط', 'Lines'))}${line(180, 43, 200, 43)}
        ${stage(204, `<circle cx="241" cy="29" r="12" fill="none" stroke="#7c3aed" stroke-width="4"/><circle cx="241" cy="57" r="14" fill="none" stroke="#7c3aed" stroke-width="4"/>`, T('أجزاء', 'Parts'))}${line(280, 43, 300, 43)}
        ${stage(304, `<text x="341" y="62" text-anchor="middle" font-size="52" style="fill:#059669">8</text>`, T('الكل', 'Whole'))}`);
    },
    nextword() {
      const rows = [[T('مشمس', 'sunny'), 62, '#059669'], [T('حار', 'hot'), 25, '#0284c7'], [T('بارد', 'cold'), 13, '#94a3b8']];
      return svg(290, 112, `${txt(145, 15, T('«طقس اليوم …»', '“Today’s weather is …”'), 13)}${rows.map(([s, v, c], k) => `${txt(38, 42 + k * 26, s, 12)}<rect x="74" y="${30 + k * 26}" width="${v * 2.8}" height="17" rx="8" fill="${c}"/>${txt(96 + v * 2.8, 43 + k * 26, `${v}%`, 11.5)}`).join('')}`);
    },
    hub() {
      const n = [[50, 26, T('📝 نص', '📝 Text')], [240, 26, T('🖼️ صورة', '🖼️ Image')], [50, 110, T('🔊 صوت', '🔊 Audio')], [240, 110, T('🎬 فيديو', '🎬 Video')]];
      return svg(290, 136, `${n.map(([x, y, s]) => `${tag(x - 44, y - 16, 88, 32, s, '#e0f2fe', 12)}<path d="M${x < 145 ? x + 44 : x - 44} ${y}L${x < 145 ? 104 : 186} ${y < 68 ? 58 : 80}" stroke="currentColor" stroke-width="2.5"/>`).join('')}${tag(100, 48, 90, 42, T('🤖 نموذج أو نظام', '🤖 One model'), '#ede9fe', 11.5)}`);
    },
    house() {
      return svg(250, 140, `<path d="M20 62L125 8L230 62" fill="none" stroke="#64748b" stroke-width="5" stroke-linejoin="round"/><rect x="38" y="62" width="174" height="66" fill="#f8fafc" stroke="#64748b" stroke-width="4"/>${tag(52, 74, 62, 42, '🏗️', '#fed7aa', 18)}${tag(136, 74, 62, 42, '💡', '#fef3c7', 18)}${txt(83, 136, '', 11)}`);
    },
  };
})();

/* =========================================================
 * core/icons.js — stroke icon set (24×24 grid).
 * Responsibility: one source of truth for every icon.
 *   RV.icon('cloud')            → <svg class="ico">
 *   RV.iconMarkup('cloud')      → inner markup string (for SVG scenes)
 * ========================================================= */
(function () {
  'use strict';
  const P = {
    // navigation / ui
    arrowNext: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowPrev: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    mute: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M17 9l5 6M22 9l-5 6"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    teacher: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 12l3-3 2 2 4-4"/>',
    play: '<path d="M7 4l13 8-13 8z"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    book: '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    cards: '<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4"/><path d="M12 13v4M8 21h8M9 17h6"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    // tech
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    server: '<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M8 17.5h.01M12 6.5h5M12 17.5h5"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 8.5a4.8 4.8 0 0 1-.5 9.5z"/>',
    wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.8 16a4.8 4.8 0 0 1 6.4 0"/><path d="M12 19.5h.01"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    share: '<circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="6" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M8.3 10.8l7.4-3.6M8.3 13.2l7.4 3.6"/>',
    cart: '<path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
    laptopHome: '<path d="M3 11l9-7 9 7"/><rect x="7" y="11" width="10" height="6.5" rx="1"/><path d="M5.5 20h13"/>',
    cap: '<path d="M2 9.5L12 5l10 4.5-10 4.5z"/><path d="M6 11.5V16c3.5 2.6 8.5 2.6 12 0v-4.5"/><path d="M22 9.5v5"/>',
    qr: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2.5v2.5h-2.5zM18 18h2.5v2.5H18zM14.5 20.5h1M20.5 14.5v1"/>',
    car: '<path d="M4 16v-3.5L6.2 7.5A2 2 0 0 1 8 6.3h8a2 2 0 0 1 1.8 1.2L20 12.5V16"/><rect x="2.5" y="12.5" width="19" height="4.5" rx="1.5"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    vr: '<path d="M3 8h18v8.5h-5.5L13.5 14h-3l-2 2.5H3z"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/>',
    ar: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M9.5 9.5l2.5-1.5 2.5 1.5v3L12 14l-2.5-1.5z"/><path d="M12 11v3M9.5 9.5l2.5 1.5 2.5-1.5"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="4"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/>',
    translate: '<path d="M3 5h9M7.5 3v2M5 5c.7 3.5 3 6 6 7.5M10 5c-.6 3.2-2.7 6-6 8"/><path d="M12.5 21l4-10 4 10M14 17.5h5"/>',
    face: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M9 10v1M15 10v1M9.5 15.5a3.5 3.5 0 0 0 5 0"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M10 9l5 3-5 3z"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.5 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/><path d="M8 12h2l1-2 2 4 1-2h2"/>',
    leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19l7-7"/>',
    factory: '<path d="M3 21V10l5 3V10l5 3V6h4l1-3h2v18z"/><path d="M7 17h2M12 17h2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    truck: '<path d="M2.5 6h11v10h-11zM13.5 9.5H18l3.5 3.5V16h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    scale: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    userCheck: '<circle cx="10" cy="8" r="4"/><path d="M2.5 21a7.5 7.5 0 0 1 12.5-5.6"/><path d="M15.5 18.5l2 2 4-4.5"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    brain: '<path d="M9.5 4.5a3 3 0 0 0-5 2.2 3 3 0 0 0-1 5.3 3.2 3.2 0 0 0 2.5 5 3 3 0 0 0 5 1.5V5.8a2.2 2.2 0 0 0-1.5-1.3zM14.5 4.5a3 3 0 0 1 5 2.2 3 3 0 0 1 1 5.3 3.2 3.2 0 0 1-2.5 5 3 3 0 0 1-5 1.5V5.8a2.2 2.2 0 0 1 1.5-1.3z"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    network: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l3.3 3.8M7 17l3.3-3.8M17 7l-3.3 3.8M17 17l-3.3-3.8"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9.5" r="1.8"/><path d="M21 16l-5.5-5.5L5 20"/>',
    wave: '<path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0"/>',
    text: '<path d="M4 6h16M4 10h16M4 14h10M4 18h13"/>',
    blackbox: '<path d="M12 2.5l8.5 4.8v9.4L12 21.5l-8.5-4.8V7.3z"/><path d="M12 12l8.5-4.7M12 12v9.5M12 12L3.5 7.3"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.6M12 17h.01"/>',
    camera: '<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13.5" r="3.5"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    building: '<path d="M4 21V5l8-2v18M12 8l8 2v11M2 21h20M7.5 8h1M7.5 12h1M7.5 16h1M15.5 13h1M15.5 17h1"/>',
    wrench: '<path d="M14.5 6.5a4.5 4.5 0 0 0 5.6 5.7L13 19.3a2 2 0 0 1-2.8 0l-.5-.5a2 2 0 0 1 0-2.8l7.1-7.1a4.5 4.5 0 0 1-2.3-2.4z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v4.5h4.5M12 7.5V12l3 2"/>',
  };

  const NS = 'http://www.w3.org/2000/svg';
  RV.iconMarkup = (name) => P[name] || P.question;
  RV.iconNames = () => Object.keys(P);
  RV.icon = function (name, cls) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'ico' + (cls ? ' ' + cls : ''));
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = RV.iconMarkup(name);
    return svg;
  };
})();

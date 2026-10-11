/* =========================================================
 * anims/driving.js — autonomous driving.
 *   selfDriving : top-down road; beats: drives itself → sees (camera/radar/LiDAR)
 *                 → thinks (detects objects) → acts (steer/brake/speed)
 *   edgeVsCloud : a pedestrian steps out 25 m ahead. Real physics:
 *                 60 km/h = 16.7 m/s, braking 8 m/s². Latency: cloud 0.8 s, edge 0.05 s.
 *                 beats: idle → cloud run → edge run → side-by-side comparison
 * ========================================================= */
(function () {
  'use strict';
  const K = RV.kit;

  /** Top-down car centred on (0,0), facing +x. */
  function carShape(s, cls) {
    return s('g', { class: 'car ' + (cls || '') },
      s('rect', { x: -38, y: -21, width: 76, height: 42, rx: 13, class: 'car-body' }),
      s('rect', { x: 6, y: -16, width: 16, height: 32, rx: 5, class: 'car-glass' }),
      s('rect', { x: -26, y: -15, width: 12, height: 30, rx: 4, class: 'car-glass' }),
      s('rect', { x: -16, y: -16, width: 22, height: 32, rx: 4, class: 'car-roof' }),
      s('rect', { x: 33, y: -17, width: 6, height: 8, rx: 2, class: 'car-light' }),
      s('rect', { x: 33, y: 9, width: 6, height: 8, rx: 2, class: 'car-light' }),
      s('rect', { x: -39, y: -16, width: 4, height: 7, rx: 2, class: 'car-tail' }),
      s('rect', { x: -39, y: 9, width: 4, height: 7, rx: 2, class: 'car-tail' }));
  }
  function person(s) {
    return s('g', { class: 'ped' },
      s('ellipse', { cx: 0, cy: 0, rx: 9, ry: 15, class: 'ped-body' }),
      s('circle', { cx: 0, cy: 0, r: 7, class: 'ped-head' }));
  }
  function roadBase(s, W, yTop, yBot) {
    const g = s('g', { class: 'road' });
    g.append(
      s('rect', { x: 0, y: 0, width: W, height: yTop, class: 'sidewalk' }),
      s('rect', { x: 0, y: yBot, width: W, height: 500 - yBot, class: 'sidewalk' }),
      s('rect', { x: 0, y: yTop, width: W, height: yBot - yTop, class: 'asphalt' }),
      s('line', { x1: 0, x2: W, y1: yTop + 2, y2: yTop + 2, class: 'curb' }),
      s('line', { x1: 0, x2: W, y1: yBot - 2, y2: yBot - 2, class: 'curb' }));
    const mid = s('line', { x1: -60, x2: W + 60, y1: (yTop + yBot) / 2, y2: (yTop + yBot) / 2, class: 'lane-dash' });
    g.appendChild(mid);
    return { g, mid };
  }

  /* ───────────────────────── selfDriving ───────────────────────── */
  K.defineAnim('selfDriving', (stage, props, api) => {
    const { s, h } = api;
    const t = api.t;
    const svg = K.svgCanvas(stage, 1000, 500);
    const { g: road, mid } = roadBase(s, 1000, 130, 370);
    // world objects (scroll past)
    const world = s('g');
    const otherCar = s('g', { transform: 'translate(820 190)' }, carShape(s, 'car-other'));
    const ped = s('g', { transform: 'translate(700 95)' }, person(s));
    const light = s('g', { transform: 'translate(930 400)' }, s('rect', { x: -14, y: -34, width: 28, height: 68, rx: 8, class: 'tl-box' }), s('circle', { cx: 0, cy: -18, r: 8, class: 'tl-red' }), s('circle', { cx: 0, cy: 0, r: 8, class: 'tl-off' }), s('circle', { cx: 0, cy: 18, r: 8, class: 'tl-off' }));
    world.append(otherCar, ped, light);
    // boxes for perception
    const box = (x, y, w, hh, label) => s('g', { class: 'det-box' }, s('rect', { x: x - w / 2, y: y - hh / 2, width: w, height: hh, rx: 6 }), s('text', x > 860 ? { x: x + w / 2, y: y - hh / 2 - 8, 'text-anchor': 'end', class: 'det-lbl' } : { x: x - w / 2, y: y - hh / 2 - 8, class: 'det-lbl' }, label));
    const boxes = s('g', null,
      box(820, 190, 100, 64, t({ ar: '🚗 عربية', en: '🚗 car' })),
      box(700, 95, 44, 50, t({ ar: '🚶 شخص', en: '🚶 person' })),
      box(930, 400, 50, 86, t({ ar: '🚦 إشارة حمراء', en: '🚦 red light' })));
    // ego car + sensors
    const ego = s('g', { transform: 'translate(330 310)' });
    const cam = s('path', { d: 'M38 0 L330 -110 A 340 340 0 0 1 330 110 Z', class: 'sensor-cam' });
    const radar = s('g', { class: 'sensor-radar' }, ...[0, 1, 2].map(() => s('circle', { cx: 0, cy: 0, r: 40 })));
    const lidar = s('g', { class: 'sensor-lidar' }, s('circle', { cx: 0, cy: 0, r: 150 }), s('line', { x1: 0, y1: 0, x2: 150, y2: 0 }));
    const chip = s('g', { class: 'ai-chip', transform: 'translate(0 -70)' }, s('rect', { x: -26, y: -20, width: 52, height: 40, rx: 8 }), s('text', { x: 0, y: 6, 'text-anchor': 'middle', class: 'ai-chip-t' }, 'AI'));
    ego.append(cam, radar, lidar, carShape(s, 'car-ego'), chip);
    const labels = s('g', null,
      s('text', { x: 520, y: 300, class: 'sens-lbl' }, t({ ar: '📷 كاميرا', en: '📷 camera' })),
      s('text', { x: 180, y: 455, class: 'sens-lbl' }, t({ ar: '📡 رادار / LiDAR', en: '📡 radar / LiDAR' })));
    svg.append(road, world, boxes, ego, labels);

    // HUD for "acts"
    const speedV = h('b', { class: 'mono' }, '60');
    const wheel = h('div', { class: 'hud-wheel' }, api.icon('compass'));
    const brake = h('div', { class: 'hud-brake' }, h('i'));
    const hud = h('div', { class: 'drive-hud' },
      h('div', { class: 'hud-item' }, wheel, h('small', null, t({ ar: 'دريكسيون', en: 'steering' }))),
      h('div', { class: 'hud-item' }, brake, h('small', null, t({ ar: 'فرامل', en: 'brake' }))),
      h('div', { class: 'hud-item hud-speed' }, speedV, h('small', null, 'km/h')));
    const think = h('div', { class: 'drive-think' }, api.icon('brain'), h('span'));
    const noDriver = h('div', { class: 'stage-label drive-nodriver' }, '🚗 ', t({ ar: 'مفيش سواق — الذكاء الاصطناعي هو اللي سايق', en: 'No driver — AI is driving' }));
    stage.append(hud, think, noDriver);

    // perpetual motion
    gsap.to(mid, { attr: { 'stroke-dashoffset': -120 }, duration: 0.6, repeat: -1, ease: 'none' });
    gsap.to(ego, { y: '+=3', duration: 0.25, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.set([cam, radar, lidar, boxes, labels, hud, think], { autoAlpha: 0 });
    const loops = [];

    function sees() {
      gsap.to([cam, radar, lidar, labels], { autoAlpha: 1, duration: 0.5, stagger: 0.15 });
      loops.push(gsap.fromTo(cam, { opacity: 0.25 }, { opacity: 0.6, duration: 0.8, repeat: -1, yoyo: true }));
      Array.from(radar.children).forEach((c, k) => loops.push(gsap.fromTo(c, { attr: { r: 30 }, opacity: 0.8 }, { attr: { r: 180 }, opacity: 0, duration: 1.8, repeat: -1, delay: k * 0.6, ease: 'power1.out' })));
      loops.push(gsap.to(lidar.querySelector('line'), { rotation: 360, svgOrigin: '0 0', duration: 1.6, repeat: -1, ease: 'none' }));
    }
    function thinks() {
      gsap.to(boxes, { autoAlpha: 1, duration: 0.2 });
      gsap.from(boxes.children, { scale: 1.6, opacity: 0, transformOrigin: '50% 50%', stagger: 0.35, duration: 0.45, ease: 'back.out(2)', onStart: () => api.sound.play('beep') });
      gsap.to(think, { autoAlpha: 1, duration: 0.4, delay: 1 });
      think.lastChild.textContent = t({ ar: 'فيه شخص + إشارة حمراء ← أهدّي وأستعد أقف', en: 'Person + red light → slow down, get ready to stop' });
      loops.push(gsap.to(chip, { scale: 1.15, svgOrigin: '0 -70', duration: 0.4, repeat: -1, yoyo: true }));
    }
    function acts() {
      gsap.to(hud, { autoAlpha: 1, duration: 0.4 });
      const v = { s: 60 };
      loops.push(gsap.to(v, { s: 20, duration: 2.5, ease: 'power2.out', onUpdate: () => { speedV.textContent = Math.round(v.s); } }));
      loops.push(gsap.to(wheel, { rotation: 25, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
      loops.push(gsap.fromTo(brake.firstChild, { height: '10%' }, { height: '80%', duration: 0.7, repeat: -1, yoyo: true }));
      loops.push(gsap.to(mid, { timeScale: 0.4, duration: 1 }));
      loops.push(gsap.to(ego.querySelectorAll('.car-tail'), { fill: '#ff3b5c', duration: 0.3, repeat: -1, yoyo: true }));
    }

    let level = -1;
    return {
      beat(i) {
        if (i === level) return;
        if (i < level) { loops.splice(0).forEach((l) => l.kill()); gsap.set([cam, radar, lidar, boxes, labels, hud, think], { autoAlpha: 0 }); level = -1; }
        for (let k = level + 1; k <= i; k++) { if (k === 1) sees(); if (k === 2) thinks(); if (k === 3) acts(); }
        if (i === 0) gsap.fromTo(noDriver, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
        level = i;
      },
    };
  });

  /* ───────────────────────── edgeVsCloud ───────────────────────── */
  const PHYS = { v: 16.67, a: 8, startFront: 4, detectFront: 22, ped: 47, slow: 1.6, latency: { cloud: 0.8, edge: 0.05, custom: 0.3 } };
  /** Pure physics: front-of-car position (m) at sim time t for a mode. Exported for tests. */
  function carAt(mode, time) {
    const P = PHYS;
    const td = (P.detectFront - P.startFront) / P.v;
    const tb = td + P.latency[mode];
    if (time <= tb) return { x: P.startFront + P.v * time, speed: P.v, braking: false };
    const xb = P.startFront + P.v * tb;
    const dt = Math.min(time - tb, P.v / P.a);
    return { x: xb + P.v * dt - 0.5 * P.a * dt * dt, speed: Math.max(0, P.v - P.a * dt), braking: true };
  }
  function outcome(mode) {
    const P = PHYS;
    const lat = P.latency[mode];
    const reaction = P.v * lat;
    const braking = (P.v * P.v) / (2 * P.a);
    const stopFront = P.detectFront + reaction + braking;
    return { lat, reaction, braking, total: reaction + braking, gap: P.ped - P.detectFront, safe: stopFront < P.ped - 0.6, margin: P.ped - stopFront };
  }
  RV.drivePhysics = { carAt, outcome, PHYS };

  K.defineAnim('edgeVsCloud', (stage, props, api) => {
    const { s, h } = api;
    const t = api.t;
    const PX = 15; // px per metre
    const X = (m) => 20 + m * PX;
    const svg = K.svgCanvas(stage, 1000, 500);
    const { g: road } = roadBase(s, 1000, 200, 420);
    const tower = s('g', { transform: 'translate(880 120)', class: 'tower' }, s('path', { d: 'M-18 70 L0 -40 L18 70 M-12 30 H12 M-8 0 H8' }), s('circle', { cx: 0, cy: -46, r: 6 }));
    const cloud = s('g', { class: 'cloud-node', transform: 'translate(560 70)' });
    cloud.appendChild(K.svgIcon('cloud', 0, 0, 90));
    cloud.appendChild(s('text', { x: 0, y: 60, 'text-anchor': 'middle', class: 'cloud-lbl' }, t({ ar: 'السحابة (بعيدة)', en: 'Cloud (far away)' })));
    const pedG = s('g', { class: 'ped-wrap' }, person(s));
    const alert = s('text', { x: 0, y: -28, 'text-anchor': 'middle', class: 'ped-alert' }, '!');
    pedG.appendChild(alert);
    const detBox = s('rect', { x: -24, y: -26, width: 48, height: 52, rx: 6, class: 'det-box-r' });
    pedG.appendChild(detBox);
    const carG = s('g', null, carShape(s, 'car-ego'));
    const edgeChip = s('g', { class: 'edge-chip', transform: 'translate(0 -44)' }, s('rect', { x: -30, y: -15, width: 60, height: 30, rx: 8 }), s('text', { x: 0, y: 6, 'text-anchor': 'middle', class: 'edge-chip-t' }, '⚡ EDGE'));
    carG.appendChild(edgeChip);
    const packet = s('circle', { r: 9, cx: 0, cy: 0, class: 'packet' });
    const signalPath = s('path', { class: 'signal-path', d: '' });
    const reactBar = s('rect', { x: 0, width: 0, y: 300, height: 14, rx: 7, class: 'react-bar' });
    const brakeBar = s('rect', { x: 0, width: 0, y: 300, height: 14, rx: 7, class: 'brake-bar' });
    const barLbl = s('text', { y: 290, class: 'bar-lbl' }, '');
    const brakeLbl = s('text', { y: 336, class: 'bar-lbl' }, '');
    const gapLine = s('g', { class: 'gap-line' }, s('line', { x1: X(PHYS.detectFront), x2: X(PHYS.ped), y1: 450, y2: 450 }), s('text', { x: (X(PHYS.detectFront) + X(PHYS.ped)) / 2, y: 475, 'text-anchor': 'middle' }, t({ ar: '25 متر', en: '25 m' })));
    svg.append(road, tower, cloud, signalPath, gapLine, reactBar, brakeBar, barLbl, brakeLbl, pedG, carG, packet);

    const timerV = h('b', { class: 'mono' }, '0.00');
    const distV = h('b', { class: 'mono' }, '0.0');
    const speedV = h('b', { class: 'mono' }, '60');
    const hud = h('div', { class: 'evc-hud' },
      h('div', null, h('small', null, t({ ar: 'زمن من لحظة الرصد', en: 'time since detection' })), h('span', null, timerV, ' s')),
      h('div', null, h('small', null, t({ ar: 'مسافة قبل ما يبدأ يفرمل', en: 'distance before braking' })), h('span', null, distV, ' m')),
      h('div', null, h('small', null, t({ ar: 'السرعة', en: 'speed' })), h('span', null, speedV, ' km/h')));
    const banner = h('div', { class: 'evc-banner' });
    const compare = h('div', { class: 'evc-compare' });
    stage.append(hud, banner, compare);

    const lane = 360;
    let sim = null;
    function reset() {
      if (sim) sim.kill();
      gsap.killTweensOf([packet, pedG, carG, banner, alert, detBox]);
      gsap.set(carG, { x: X(PHYS.startFront) - 38, y: lane });
      gsap.set(pedG, { x: X(PHYS.ped), y: 170 });
      gsap.set([alert, detBox, packet, signalPath, edgeChip, banner, reactBar, brakeBar, barLbl, brakeLbl, compare], { autoAlpha: 0 });
      timerV.textContent = '0.00'; distV.textContent = '0.0'; speedV.textContent = '60';
      stage.classList.remove('is-crash', 'is-safe');
    }

    function run(mode) {
      reset();
      const P = PHYS;
      const td = (P.detectFront - P.startFront) / P.v;
      const lat = P.latency[mode];
      const res = outcome(mode);
      const crashFront = res.safe ? null : P.ped - 0.5;
      const T = td + lat + P.v / P.a + 0.2;
      const clock = { t: 0 };
      let detected = false, decided = false, ended = false;
      api.sound.play('whoosh');
      sim = gsap.to(clock, {
        t: T, duration: T * P.slow, ease: 'none',
        onUpdate() {
          if (ended) return;
          const c = carAt(mode, clock.t);
          let front = c.x;
          if (crashFront != null && front >= crashFront) { front = crashFront; crash(); return; }
          gsap.set(carG, { x: X(front) - 38 });
          speedV.textContent = Math.round(c.speed * 3.6);
          if (clock.t >= td) {
            timerV.textContent = (clock.t - td).toFixed(2);
            if (!detected) { detected = true; detect(mode, lat); }
            if (!c.braking) distV.textContent = (front - P.detectFront).toFixed(1);
            gsap.set(reactBar, { attr: { x: X(P.detectFront), width: Math.max(0, X(Math.min(front, P.detectFront + res.reaction)) - X(P.detectFront)) } });
          }
          if (c.braking && !decided) { decided = true; startBrake(front); }
          if (c.braking) gsap.set(brakeBar, { attr: { width: Math.max(0, X(front) - X(P.detectFront + res.reaction)) } });
        },
        onComplete() { if (!ended) safe(); },
      });

      function detect(m, latency) {
        gsap.to(pedG, { y: lane - 4, duration: 0.25, ease: 'power3.out' });
        gsap.to([alert, detBox], { autoAlpha: 1, duration: 0.1 });
        gsap.fromTo(alert, { scale: 2, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
        api.sound.play('bad');
        gsap.set(reactBar, { autoAlpha: 1, attr: { x: X(P.detectFront), width: 0 } });
        gsap.set(barLbl, { autoAlpha: 1, attr: { x: X(P.detectFront) } });
        const viaCloud = m === 'cloud' || (m === 'custom' && latency > 0.2);
        barLbl.textContent = t(viaCloud ? { ar: '⏳ مستني رد السحابة…', en: '⏳ waiting for the cloud…' } : { ar: '⚡ قرار فوري', en: '⚡ instant decision' });
        if (viaCloud) {
          const sx = X(P.detectFront), sy = lane - 20;
          const d = `M${sx} ${sy} L880 80 L560 70 L880 80 L${sx + P.v * latency * PX} ${sy}`;
          signalPath.setAttribute('d', d);
          gsap.set([signalPath, packet], { autoAlpha: 1 });
          gsap.fromTo(signalPath, { drawSVG: '0%' }, { drawSVG: '100%', duration: latency * P.slow, ease: 'none' });
          gsap.to(packet, { duration: latency * P.slow, ease: 'none', motionPath: { path: signalPath, align: signalPath, alignOrigin: [0.5, 0.5] } });
        } else {
          gsap.set(edgeChip, { autoAlpha: 1 });
          gsap.fromTo(edgeChip, { scale: 0.4, svgOrigin: '0 -44' }, { scale: 1.2, svgOrigin: '0 -44', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(3)' });
        }
      }
      function startBrake(front) {
        api.sound.play('beep');
        gsap.set([brakeBar, brakeLbl], { autoAlpha: 1 });
        gsap.set(brakeBar, { attr: { x: X(front), width: 0 } });
        gsap.set(brakeLbl, { attr: { x: X(front) } });
        brakeLbl.textContent = t({ ar: '🛑 بيفرمل', en: '🛑 braking' });
        gsap.to(packet, { autoAlpha: 0, duration: 0.2 });
        gsap.to(carG.querySelectorAll('.car-tail'), { fill: '#ff3b5c', duration: 0.1 });
      }
      function crash() {
        ended = true;
        sim.kill();
        stage.classList.add('is-crash');
        api.sound.play('bad');
        gsap.fromTo(svg, { x: -10 }, { x: 10, duration: 0.05, repeat: 7, yoyo: true, clearProps: 'x' });
        gsap.to(pedG, { y: 250, x: '+=20', duration: 0.35, ease: 'power2.out' });
        speedV.textContent = Math.round(P.v * 3.6 * 0.5);
        showBanner('bad', t({ ar: `💥 خطر! العربية مشيت ${res.reaction.toFixed(1)} م وهي مستنية السحابة — مالحقتش تقف`, en: `💥 Danger! The car travelled ${res.reaction.toFixed(1)} m waiting for the cloud — it could not stop in time` }));
      }
      function safe() {
        ended = true;
        stage.classList.add('is-safe');
        api.sound.play('ok');
        showBanner('ok', t({ ar: `✅ أمان! وقفت قبل الشخص بـ ${res.margin.toFixed(1)} متر`, en: `✅ Safe! Stopped ${res.margin.toFixed(1)} m before the person` }));
      }
    }
    function showBanner(kind, text) {
      banner.dataset.kind = kind;
      banner.textContent = text;
      gsap.fromTo(banner, { autoAlpha: 0, y: -20, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' });
    }
    function showCompare() {
      reset();
      gsap.set(carG, { x: X(PHYS.startFront) - 38 });
      const row = (mode, icon, name) => {
        const r = outcome(mode);
        return h('div', { class: 'evc-col ' + (r.safe ? 'ok' : 'bad') },
          h('h4', null, icon, ' ', t(name)),
          h('p', null, t({ ar: 'زمن القرار', en: 'decision time' }), ': ', h('b', { class: 'mono' }, r.lat + ' s')),
          h('p', null, t({ ar: 'مسافة قبل الفرملة', en: 'distance before braking' }), ': ', h('b', { class: 'mono' }, r.reaction.toFixed(1) + ' m')),
          h('p', null, t({ ar: 'مسافة الفرملة', en: 'braking distance' }), ': ', h('b', { class: 'mono' }, r.braking.toFixed(1) + ' m')),
          h('p', { class: 'evc-total' }, t({ ar: 'الإجمالي', en: 'total' }), ': ', h('b', { class: 'mono' }, r.total.toFixed(1) + ' m'), ' ', r.safe ? '< 25 ✅' : '> 25 💥'));
      };
      RV.dom.clear(compare);
      compare.append(row('cloud', '☁️', { ar: 'السحابة', en: 'Cloud' }), row('edge', '⚡', { ar: 'حوسبة طرفية', en: 'Edge computing' }));
      gsap.set(compare, { autoAlpha: 1 });
      gsap.from(compare.children, { y: 30, opacity: 0, stagger: 0.25, duration: 0.5, ease: 'back.out(1.6)' });
    }

    // ── "try it yourself" lab: the student picks the decision delay ──
    const latIn = h('input', { type: 'range', min: 2, max: 120, value: 30, class: 'no-swipe' });
    const latV = h('b', { class: 'mono' });
    const predict = h('span', { class: 'evc-lab-pred' });
    const go = h('button', { class: 'btn btn-sm btn-primary', type: 'button' }, '▶ ', t({ ar: 'شغّل', en: 'Run' }));
    const lab = h('div', { class: 'evc-lab no-swipe', hidden: true },
      h('label', null, t({ ar: '⏱️ زمن اتخاذ القرار: ', en: '⏱️ Decision delay: ' }), latV, ' s'), latIn, predict, go);
    stage.appendChild(lab);
    function paintLab() {
      PHYS.latency.custom = latIn.value / 100;
      latV.textContent = PHYS.latency.custom.toFixed(2);
      const r = outcome('custom');
      predict.textContent = t({ ar: `قبل الفرملة هتمشي ${r.reaction.toFixed(1)} م`, en: `travels ${r.reaction.toFixed(1)} m before braking` });
    }
    paintLab();
    latIn.addEventListener('input', paintLab);
    go.addEventListener('click', () => { gsap.set(lab, { autoAlpha: 1 }); run('custom'); gsap.set(lab, { autoAlpha: 1 }); });

    api.toolbar([
      { icon: 'cloud', label: { ar: 'أرسل للسحابة', en: 'Send to cloud' }, group: true, onClick: () => { lab.hidden = true; run('cloud'); } },
      { icon: 'bolt', label: { ar: 'حوسبة طرفية', en: 'Edge computing' }, group: true, onClick: () => { lab.hidden = true; run('edge'); } },
      { icon: 'gear', label: { ar: 'جرّب بنفسك', en: 'Try it yourself' }, group: true, onClick: () => { reset(); lab.hidden = false; gsap.fromTo(lab, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }); } },
      { icon: 'scale', label: { ar: 'قارن', en: 'Compare' }, group: true, onClick: () => { lab.hidden = true; showCompare(); } },
    ]);

    // idle: car cruising loop until a beat triggers a run
    let idle = null;
    function idleLoop() {
      reset();
      idle = gsap.fromTo(carG, { x: X(0) - 38 }, { x: X(30), duration: 3.2, ease: 'none', repeat: -1 });
    }
    reset();
    return {
      beat(i) {
        if (idle) { idle.kill(); idle = null; }
        if (i === 0) idleLoop();
        else if (i === 1) run('cloud');
        else if (i === 2) run('edge');
        else showCompare();
      },
      destroy() { if (sim) sim.kill(); },
    };
  });
})();

/* =========================================================
 * tools/movie-audit.js — layout audit for the teacher-driven movies.
 * Not part of the app. In the browser (on #/audit/<lesson>/<station>/<step>/0):
 *   eval(await (await fetch('tools/movie-audit.js')).text());
 *   await mvAudit([firstScene, lastScene], ['allowed×pair', …]);
 * Seeks the movie timeline every 0.2 s and reports text/props that overlap,
 * leave the 1920×880 board, overflow their box, or use text under 26px.
 * ========================================================= */
window.mvAudit = async function (R, OK) {
  for (let i = 0; i < 30 && !(document.querySelector('.hm-board') || {}).__tl; i++) await new Promise((r) => setTimeout(r, 200));
  const board = document.querySelector('.hm-board');
  if (!board || !board.__tl) return 'NO BOARD';
  const tl = board.__tl;
  tl.pause();
  const k1 = board.getBoundingClientRect().width / 1920;
  const B = board.getBoundingClientRect();
  const units = [...board.querySelectorAll('.char,.box,.pill,.head,.note,.bubble,.card,.tag,.ptag,.emo,.rp,svg.art,.xc,.lbl,.typed')];
  const op = (el) => { let o = 1; for (let e = el; e && e !== board; e = e.parentElement) o *= +getComputedStyle(e).opacity; return o; };
  const box = (e) => (e.classList.contains('char') ? (e.querySelector('.bob') || e) : e).getBoundingClientRect();
  OK = OK || [];
  const pairs = {}, edge = {}, over = {}, small = {};
  for (let t = R[0] * 10; t < (R[1] + 1) * 10 - 0.05; t += 0.2) {
    tl.seek(t, true);
    const vis = units.filter((e) => op(e) > 0.15).map((e) => ({ e, id: (e.id || '').replace(/^[a-z0-9]+-/, ''), r: box(e) }));
    for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
      const a = vis[i], b = vis[j];
      if (a.e.contains(b.e) || b.e.contains(a.e)) continue;
      const w = (Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left)) / k1;
      const h = (Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top)) / k1;
      const kk = a.id + '×' + b.id;
      if (w > 2 && h > 2 && !OK.includes(kk) && !OK.includes(b.id + '×' + a.id)) (pairs[kk] = pairs[kk] || []).push(+t.toFixed(1));
    }
    vis.forEach((v) => {
      if (v.r.left < B.left - 2 || v.r.right > B.right + 2 || v.r.top < B.top - 2 || v.r.bottom > B.bottom + 2) (edge[v.id] = edge[v.id] || []).push(+t.toFixed(1));
      if (!v.e.matches('svg,.char') && (v.e.scrollWidth > v.e.clientWidth + 2 || v.e.scrollHeight > v.e.clientHeight + 2)) (over[v.id] = over[v.id] || []).push(+t.toFixed(1));
    });
  }
  board.querySelectorAll('*').forEach((c) => {
    if ([...c.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
      const f = parseFloat(getComputedStyle(c).fontSize);
      if (f < 26 && !c.closest('svg')) small[(c.id || c.className) + '=' + f] = 1;
    }
  });
  const fmt = (o) => Object.entries(o).filter(([, ts]) => ts.length > 1).map(([kk, ts]) => kk + '@' + ts[0] + '→' + ts[ts.length - 1]).join(', ');
  tl.seek(R[0] * 10);
  return `OVERLAP: ${fmt(pairs)}\nEDGE: ${fmt(edge)}\nOVERFLOW: ${fmt(over)}\nSMALL: ${Object.keys(small).join(', ')}`;
};

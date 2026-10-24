/* Test zone: ten interactive game formats built on the handbook content. */
(function () {
  const App = window.App;
  const { esc, shuffle, $, $$, data } = App.util;
  const G = window.GAMES;
  const T = App.TOOLS;

  const ICON = {
    match: '<circle cx="8" cy="7" r="3"/><circle cx="8" cy="17" r="3"/><circle cx="24" cy="7" r="3"/><circle cx="24" cy="17" r="3"/><path d="M11 7 L21 17 M11 17 L21 7"/>',
    order: '<rect x="5" y="3" width="16" height="4" rx="1"/><rect x="5" y="10" width="12" height="4" rx="1"/><rect x="5" y="17" width="8" height="4" rx="1"/><path d="M26 4v16m-3-3 3 3 3-3"/>',
    sort: '<path d="M3 12h10l-1 9H4z M19 12h10l-1 9h-8z"/><circle cx="8" cy="5" r="2"/><circle cx="24" cy="5" r="2"/>',
    map: '<path d="M16 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="16" cy="10" r="2.5"/>',
    gaps: '<path d="M3 8h8M21 8h8M3 16h4M17 16h12"/><rect x="12" y="5" width="8" height="6" rx="1" stroke-dasharray="2 2"/><rect x="8" y="13" width="8" height="6" rx="1" stroke-dasharray="2 2"/>',
    quickfire: '<circle cx="16" cy="13" r="9"/><path d="M16 13V8M13 2h6M16 13l4 3"/>',
    whoami: '<circle cx="13" cy="8" r="4"/><path d="M5 22c0-5 4-8 8-8s8 3 8 8"/><path d="M24 6a3 3 0 1 1 3 3v2M27 15v.5"/>',
    picture: '<rect x="3" y="4" width="26" height="17" rx="2"/><path d="M3 18l7-7 5 5 4-4 10 9"/><circle cx="22" cy="9" r="2"/>',
    odd: '<circle cx="8" cy="8" r="4"/><circle cx="24" cy="8" r="4"/><circle cx="8" cy="18" r="4"/><rect x="20" y="14" width="8" height="8" rx="1"/>',
    numbers: '<path d="M3 13h26"/><circle cx="19" cy="13" r="4"/><path d="M3 7v12M29 7v12"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 32 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;

  const LIST = [
    ['match', 'Match up', 'Pair people with inventions, writers with books, battles with dates.'],
    ['order', 'Put in order', 'Arrange monarchs, events and inventions in the right order.'],
    ['sort', 'Sort it', 'Drop things into the right group: which nation, which side, which court.'],
    ['map', 'Map quiz', 'Tap the map to find cities, landmarks and nations.'],
    ['gaps', 'Fill the gaps', 'Complete key sentences using a word bank.'],
    ['quickfire', 'Quickfire', 'True or false? As many as you can in 60 seconds.'],
    ['whoami', 'Who am I?', 'Guess the person from clues. Fewer clues, more points.'],
    ['picture', 'Picture round', 'Name the place, person or invention from a picture.'],
    ['odd', 'Odd one out', 'Spot the one that doesn’t belong, and learn why.'],
    ['numbers', 'Guess the number', 'Slide to the right number or year. Closer scores more.']
  ];
  App.GAME_LIST = LIST;

  const best = (k) => ((App.store.get().games || {})[k] || null);
  function saveScore(k, score, max) {
    App.store.set((s) => {
      s.games = s.games || {};
      const pct = max ? Math.round((score / max) * 100) : 0;
      const prev = s.games[k];
      s.games[k] = { best: Math.max(pct, prev ? prev.best : 0), plays: (prev ? prev.plays : 0) + 1 };
    });
  }
  function summary(el, k, score, max, extra, again) {
    saveScore(k, score, max);
    const pct = Math.round((score / max) * 100);
    el.insertAdjacentHTML('beforeend', `<div class="q-card result ${pct >= 75 ? 'pass' : 'fail'} game-result"><div class="score">${score}<span class="muted" style="font-size:.45em"> / ${max}</span></div><div class="verdict">${pct === 100 ? 'Perfect score!' : pct >= 75 ? 'Well done!' : pct >= 50 ? 'Not bad. Try again?' : 'Keep practising.'}</div>${extra || ''}<div class="q-actions" style="justify-content:center"><button class="btn" data-g="again">Play again</button><a class="btn ghost" href="#tests">All games</a></div></div>`);
    $('[data-g="again"]', el).addEventListener('click', again);
    $('.game-result', el).scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function deckChips(decks, cur) {
    return `<div class="chips deck-chips" role="group" aria-label="Choose a set" style="margin:0 0 16px">${decks.map((d) => `<button class="chip" data-deck="${d.id}" aria-pressed="${d.id === cur}">${esc(d.title)}</button>`).join('')}</div>`;
  }
  const page = (k, body) => {
    const g = LIST.find((x) => x[0] === k);
    return `<div class="page"><header class="sec-head" style="--accent:var(--c6)"><span class="eyebrow"><a href="#tests">Test zone</a></span><h1 class="game-h1"><span class="game-ic">${icon(k)}</span>${esc(g[1])}</h1><p class="lead" style="margin:0">${esc(g[2])}</p></header><div data-mount="game-${k}"></div></div>`;
  };

  // ================= hub =================
  T.tests = {
    title: 'Test zone',
    render: () => `<div class="page"><header class="sec-head" style="--accent:var(--c6)"><span class="eyebrow">Practise</span><h1>Test zone</h1><p class="lead" style="margin:0">Ten different ways to test yourself, from matching pairs to finding places on the map. Every question comes from the handbook.</p></header>
      <div class="game-grid">${LIST.map(([k, n, d]) => { const b = best(k); return `<a class="game-card" href="#test-${k}"><span class="game-ic">${icon(k)}</span><b>${esc(n)}</b><span class="d">${esc(d)}</span><span class="b">${b ? `Best ${b.best}% · played ${b.plays}` : 'Not played yet'}</span></a>`; }).join('')}</div>
      <div class="note tip" style="margin-top:22px">Want the real exam format? The <a href="#mock">mock test</a> has 24 multiple-choice questions in 45 minutes.</div></div>`
  };
  LIST.forEach(([k, n]) => { T[`test-${k}`] = { title: n, render: () => page(k) }; });

  // ================= 1. match up =================
  App.MOUNT['game-match'] = function (el) {
    let deck = G.match[0]; let pairs; let rights; let sel = null; let done; let mistakes; let colours;
    function round() {
      const pool = shuffle(deck.pairs); const used = new Set(); pairs = [];
      for (const p of pool) { if (used.has(p[1])) continue; used.add(p[1]); pairs.push(p); if (pairs.length === 5) break; }
      rights = shuffle(pairs.map((p, i) => i)); sel = null; done = {}; mistakes = 0; colours = {}; paint();
    }
    function paint(flash) {
      const n = Object.keys(done).length;
      el.innerHTML = `${deckChips(G.match, deck.id)}<div class="q-card"><div class="q-top"><span>Tap an item on the left, then its partner on the right.</span><span>${n} of ${pairs.length} matched · ${mistakes} mistake${mistakes === 1 ? '' : 's'}</span></div>
        <div class="match-cols"><div class="match-col">${pairs.map((p, i) => `<button class="match-item ${sel === i ? 'sel' : ''} ${done[i] != null ? 'done' : ''}" data-l="${i}" ${done[i] != null ? `style="--mc:var(--m${colours[i]})" disabled` : ''}>${done[i] != null ? `<i class="mk">${colours[i] + 1}</i>` : ''}<span>${esc(p[0])}</span></button>`).join('')}</div>
        <div class="match-col">${rights.map((i) => { const li = Object.keys(done).find((k) => done[k] === i); return `<button class="match-item right ${li != null ? 'done' : ''} ${flash === i ? 'shake' : ''}" data-r="${i}" ${li != null ? `style="--mc:var(--m${colours[li]})" disabled` : ''}>${li != null ? `<i class="mk">${colours[li] + 1}</i>` : ''}<span>${esc(pairs[i][1])}</span></button>`; }).join('')}</div></div></div>`;
      if (n === pairs.length) summary(el, 'match', Math.max(0, pairs.length * 2 - mistakes), pairs.length * 2, `<p class="muted">${mistakes} mistake${mistakes === 1 ? '' : 's'}. Scoring: 2 points per pair, minus 1 per mistake.</p>`, round);
    }
    el.addEventListener('click', (e) => {
      const d = e.target.closest('[data-deck]'); if (d) { deck = G.match.find((x) => x.id === d.dataset.deck); round(); return; }
      const l = e.target.closest('[data-l]'); const r = e.target.closest('[data-r]');
      if (l) { sel = +l.dataset.l; paint(); }
      else if (r && sel != null) {
        const ri = +r.dataset.r;
        if (ri === sel) { done[sel] = ri; colours[sel] = Object.keys(done).length - 1; sel = null; paint(); }
        else { mistakes += 1; paint(ri); }
      }
    });
    round();
  };

  // ================= 2. put in order =================
  App.MOUNT['game-order'] = function (el) {
    let deck = G.order[0]; let items; let pick = null; let checked = false;
    function round() {
      let src;
      if (deck.random) {
        const pool = shuffle(window.TIMELINE.filter((e) => !e.approx)); const years = new Set(); src = [];
        for (const e of pool) { const y = Math.floor(e.y); if ([...years].some((x) => Math.abs(x - y) < 3)) continue; years.add(y); src.push([e.t, e.y, e.d]); if (src.length === 5) break; }
      } else src = deck.items.slice(0, 6);
      items = shuffle(src); while (items.length > 1 && items.every((it, i, a) => i === 0 || a[i - 1][1] < it[1])) items = shuffle(src);
      pick = null; checked = false; paint();
    }
    function paint() {
      const sorted = items.slice().sort((a, b) => a[1] - b[1]);
      el.innerHTML = `${deckChips(G.order, deck.id)}<div class="q-card"><div class="q-top"><span>${checked ? 'Green items are in the right place.' : 'Tap two items to swap them, or use the arrows. Earliest at the top.'}</span></div>
        <ol class="order-list">${items.map((it, i) => { const ok = checked && sorted[i] === it; return `<li class="order-item ${pick === i ? 'sel' : ''} ${checked ? (ok ? 'right' : 'wrong') : ''}"><button class="order-main" data-i="${i}" ${checked ? 'disabled' : ''}><span class="pos">${i + 1}</span><span>${esc(it[0])}</span>${checked && it[2] ? `<span class="yr">${esc(it[2])}</span>` : ''}</button>${checked ? '' : `<span class="order-arrows"><button data-up="${i}" aria-label="Move up" ${i === 0 ? 'disabled' : ''}>↑</button><button data-down="${i}" aria-label="Move down" ${i === items.length - 1 ? 'disabled' : ''}>↓</button></span>`}</li>`; }).join('')}</ol>
        ${checked ? `<p class="chips-h">Correct order</p><ol class="order-answer">${sorted.map((it) => `<li><b>${esc(it[0])}</b>${it[2] ? ` <span class="muted">${esc(it[2])}</span>` : ''}</li>`).join('')}</ol>` : '<div class="q-actions"><button class="btn" data-check>Check order</button></div>'}</div>`;
      if (checked) summary(el, 'order', items.filter((it, i) => sorted[i] === it).length, items.length, '', round);
    }
    const swap = (a, b) => { [items[a], items[b]] = [items[b], items[a]]; };
    el.addEventListener('click', (e) => {
      const d = e.target.closest('[data-deck]'); if (d) { deck = G.order.find((x) => x.id === d.dataset.deck); round(); return; }
      const m = e.target.closest('[data-i]'); const up = e.target.closest('[data-up]'); const dn = e.target.closest('[data-down]');
      if (e.target.closest('[data-check]')) { checked = true; paint(); }
      else if (up) { const i = +up.dataset.up; swap(i, i - 1); pick = null; paint(); }
      else if (dn) { const i = +dn.dataset.down; swap(i, i + 1); pick = null; paint(); }
      else if (m) { const i = +m.dataset.i; if (pick == null) pick = i; else { if (pick !== i) swap(pick, i); pick = null; } paint(); }
    });
    round();
  };

  // ================= 3. sort it =================
  App.MOUNT['game-sort'] = function (el) {
    let deck = G.sort[0]; let items; let place; let sel = null; let checked = false;
    function round() { items = shuffle(deck.items).slice(0, Math.min(10, deck.items.length)); place = items.map(() => -1); sel = null; checked = false; paint(); }
    function paint() {
      const chip = (i) => { const ok = checked && place[i] === items[i][1]; return `<button class="sort-chip ${sel === i ? 'sel' : ''} ${checked ? (ok ? 'right' : 'wrong') : ''}" data-c="${i}" ${checked ? 'disabled' : ''}>${esc(items[i][0])}${checked && !ok ? ` <small>→ ${esc(deck.buckets[items[i][1]])}</small>` : ''}</button>`; };
      const pool = items.map((_, i) => i).filter((i) => place[i] === -1);
      el.innerHTML = `${deckChips(G.sort, deck.id)}<div class="q-card"><div class="q-top"><span>${checked ? 'Wrong ones show where they belong.' : sel != null ? 'Now tap a group.' : 'Tap an item, then the group it belongs to.'}</span><span>${pool.length} left</span></div>
        <div class="sort-pool">${pool.length ? pool.map(chip).join('') : checked ? '' : '<span class="muted small">All placed. Check your answers.</span>'}</div>
        <div class="sort-buckets" style="--n:${deck.buckets.length}">${deck.buckets.map((b, bi) => `<div class="bucket ${sel != null ? 'ready' : ''}" data-b="${bi}" role="button" tabindex="0" aria-label="${esc(b)}"><b>${esc(b)}</b><div class="bucket-items">${items.map((_, i) => i).filter((i) => place[i] === bi).map(chip).join('')}</div></div>`).join('')}</div>
        ${checked ? '' : `<div class="q-actions"><button class="btn" data-check ${pool.length ? 'disabled' : ''}>Check</button></div>`}</div>`;
      if (checked) summary(el, 'sort', items.filter((it, i) => place[i] === it[1]).length, items.length, '', round);
    }
    function drop(bi) { if (sel == null) return; place[sel] = bi; sel = null; paint(); }
    el.addEventListener('click', (e) => {
      const d = e.target.closest('[data-deck]'); if (d) { deck = G.sort.find((x) => x.id === d.dataset.deck); round(); return; }
      if (e.target.closest('[data-check]')) { checked = true; paint(); return; }
      const c = e.target.closest('[data-c]');
      if (c) { const i = +c.dataset.c; if (place[i] !== -1) { place[i] = -1; sel = i; } else sel = sel === i ? null : i; paint(); return; }
      const b = e.target.closest('[data-b]'); if (b) drop(+b.dataset.b);
    });
    el.addEventListener('keydown', (e) => { const b = e.target.closest('[data-b]'); if (b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); drop(+b.dataset.b); } });
    round();
  };

  // ================= 4. map quiz =================
  App.MOUNT['game-map'] = function (el) {
    const M = window.UK_MAP; const P = M.proj; const { CITIES, POI, NATIONS } = window.UK_PLACES;
    const xy = (ll) => [(ll[1] - P.lonMin) * P.k * P.scale + P.pad, (P.latMax - ll[0]) * P.scale + P.pad];
    const MODES = [
      { id: 'cities', title: 'Cities and capitals', targets: CITIES.map((c) => ({ n: c.n, ll: c.ll })) },
      { id: 'landmarks', title: 'Landmarks and places', targets: POI.landmarks.filter((p) => !p.g).map((p) => ({ n: p.n, ll: p.ll })).concat([{ n: 'Stonehenge', ll: [51.179, -1.826] }, { n: 'Hadrian’s Wall', ll: [55.0, -2.3] }, { n: 'St Andrews', ll: [56.34, -2.796] }, { n: 'Skara Brae', ll: [59.049, -3.343] }, { n: 'Aintree', ll: [53.477, -2.94] }, { n: 'Culloden', ll: [57.478, -4.096] }]) },
      { id: 'nations', title: 'Nations and islands', targets: [{ n: 'England', u: ['england'] }, { n: 'Scotland', u: ['scotland'] }, { n: 'Wales', u: ['wales'] }, { n: 'Northern Ireland', u: ['ni'] }, { n: 'The Isle of Man (a Crown dependency)', u: ['iom'] }, { n: 'The Channel Islands (Crown dependencies)', u: ['jersey', 'guernsey'] }, { n: 'Ireland (an independent country)', u: ['ireland'] }] }
    ];
    let mode = MODES[0]; let qs; let qi; let score; let ans;
    function round() { qs = shuffle(mode.targets).slice(0, mode.id === 'nations' ? 6 : 8); qi = 0; score = 0; ans = null; paint(); }
    const unitsSvg = () => Object.keys(M.paths).map((k) => `<path class="land n-${k === 'ni' ? 'ni' : k} ${['iom', 'jersey', 'guernsey'].includes(k) ? 'n-cd' : ''} game-land" data-unit="${k}" d="${M.paths[k]}"/>`).join('');
    function paint() {
      const q = qs[qi];
      let overlay = '';
      if (ans) {
        if (mode.id === 'nations') overlay = '';
        else {
          const [tx, ty] = xy(q.ll);
          overlay = `<line x1="${ans.x}" y1="${ans.y}" x2="${tx}" y2="${ty}" class="game-line"/><circle cx="${ans.x}" cy="${ans.y}" r="4" class="game-tap"/><circle cx="${tx}" cy="${ty}" r="5" class="game-target"/><text x="${tx + 7}" y="${ty + 3}" class="lbl">${esc(q.n)}</text>`;
        }
      }
      el.innerHTML = `${deckChips(MODES, mode.id)}<div class="q-card"><div class="q-top"><span>Question ${qi + 1} of ${qs.length}</span><span>Score ${score}</span></div>
        <p class="q-text">Where is <span class="map-target">${esc(q.n)}</span>?</p><p class="q-hint">${ans ? '' : 'Tap the map.'}</p>
        <div class="mapfig game-mapfig"><svg viewBox="0 0 ${M.w} ${M.h}" class="game-svg ${ans ? '' : 'live'}" role="img" aria-label="Map of the UK and Ireland: tap to answer"><rect class="sea" x="0" y="0" width="${M.w}" height="${M.h}" rx="10"/>${unitsSvg()}<g>${overlay}</g></svg>
        <div class="map-side">${ans ? `<div class="feedback ${ans.pts ? 'ok' : 'no'}"><b>${ans.msg}</b> ${ans.detail || ''}</div><div class="q-actions" style="justify-content:flex-start"><button class="btn" data-next>${qi + 1 < qs.length ? 'Next' : 'See score'} →</button></div>` : '<p class="muted small">Scoring: 2 points if you are spot on, 1 if you are close.</p>'}</div></div></div>`;
      if (ans && mode.id === 'nations') $$('.game-land', el).forEach((p) => { p.classList.toggle('hl', q.u.includes(p.dataset.unit)); p.classList.toggle('dim', !q.u.includes(p.dataset.unit)); });
    }
    el.addEventListener('click', (e) => {
      const d = e.target.closest('[data-deck]'); if (d) { mode = MODES.find((m) => m.id === d.dataset.deck); round(); return; }
      if (e.target.closest('[data-next]')) {
        qi += 1; ans = null;
        if (qi >= qs.length) { qi = qs.length - 1; summary(el, 'map', score, qs.length * 2, '', round); $('[data-next]', el).remove(); return; }
        paint(); return;
      }
      const svg = e.target.closest('svg.live'); if (!svg || ans) return;
      const q = qs[qi];
      if (mode.id === 'nations') {
        const p = e.target.closest('.game-land'); if (!p) return;
        const ok = q.u.includes(p.dataset.unit);
        ans = { pts: ok ? 2 : 0, msg: ok ? 'Correct!' : 'Not quite.', detail: ok ? '' : `<span>You tapped:</span> <span>${{ england: 'England', scotland: 'Scotland', wales: 'Wales', ni: 'Northern Ireland', ireland: 'Ireland', iom: 'Isle of Man', jersey: 'Jersey', guernsey: 'Guernsey' }[p.dataset.unit]}</span>` };
      } else {
        const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
        const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
        const [tx, ty] = xy(q.ll); const dist = Math.hypot(loc.x - tx, loc.y - ty);
        const miles = Math.round(dist * 1.5 / 5) * 5;
        const pts = dist < 10 ? 2 : dist < 26 ? 1 : 0;
        ans = { x: loc.x.toFixed(1), y: loc.y.toFixed(1), pts, msg: pts === 2 ? 'Spot on!' : pts === 1 ? 'Close!' : 'Too far away.', detail: `<span>About ${Math.max(miles, 5)} miles off.</span>` };
      }
      score += ans.pts; paint();
    });
    round();
  };

  // ================= 5. fill the gaps =================
  App.MOUNT['game-gaps'] = function (el) {
    let qs; let qi; let score; let total; let slots; let answers; let bank; let sel; let checked;
    function round() { qs = shuffle(G.gaps).slice(0, 5); qi = 0; score = 0; total = 0; load(); }
    // A translation can bring its own distractors after "||", so they match the grammar of the gaps.
    const split = (g) => { const [tpl, alt] = window.t(g.x).split('||'); return { tpl: tpl.trim(), ds: alt ? alt.split('|').map((x) => x.trim()) : g.d.map((x) => window.t(x)) }; };
    function load() {
      const { tpl, ds } = split(qs[qi]);
      answers = []; tpl.replace(/\{([^}]+)\}/g, (_, a) => { answers.push(a); return ''; });
      bank = shuffle(answers.concat(ds));
      slots = answers.map(() => null); sel = 0; checked = false; paint();
    }
    function paint() {
      const { tpl } = split(qs[qi]); let si = 0;
      const parts = tpl.split(/\{[^}]+\}/);
      const sentence = parts.map((p, i) => esc(p) + (i < parts.length - 1 ? (() => { const k = si++; const v = slots[k]; const st = checked ? (v === answers[k] ? 'right' : 'wrong') : ''; return `<button class="gap ${sel === k && !checked ? 'sel' : ''} ${v != null ? 'filled' : ''} ${st}" data-s="${k}" ${checked ? 'disabled' : ''}>${v != null ? esc(bank[v]) : ' '}</button>${checked && st === 'wrong' ? `<span class="gap-fix">${esc(answers[k])}</span>` : ''}`; })() : '')).join('');
      const used = new Set(slots.filter((v) => v != null));
      el.innerHTML = `<div class="q-card" data-noi18n><div class="q-top"><span>${window.t(`Sentence ${qi + 1} of ${qs.length}`)}</span><span>${window.t(`Score ${score}`)}</span></div>
        <p class="gap-sentence">${sentence}</p>
        <div class="gap-bank">${bank.map((w, i) => `<button class="chip bank-chip" data-w="${i}" ${used.has(i) || checked ? 'disabled' : ''}>${esc(w)}</button>`).join('')}</div>
        <div class="q-actions">${checked ? `<button class="btn" data-next>${window.t(qi + 1 < qs.length ? 'Next sentence' : 'See score')} →</button>` : `<button class="btn" data-check ${slots.every((v) => v != null) ? '' : 'disabled'}>${window.t('Check')}</button>`}</div></div>`;
    }
    el.addEventListener('click', (e) => {
      const s = e.target.closest('[data-s]'); const w = e.target.closest('[data-w]');
      if (s) { const k = +s.dataset.s; if (slots[k] != null) slots[k] = null; sel = k; paint(); }
      else if (w) { const k = sel != null && slots[sel] == null ? sel : slots.findIndex((v) => v == null); if (k < 0) return; slots[k] = +w.dataset.w; const nx = slots.findIndex((v) => v == null); sel = nx < 0 ? null : nx; paint(); }
      else if (e.target.closest('[data-check]')) { checked = true; slots.forEach((v, k) => { total += 1; if (bank[v] === answers[k]) score += 1; }); paint(); }
      else if (e.target.closest('[data-next]')) { qi += 1; if (qi >= qs.length) { $('[data-next]', el).remove(); summary(el, 'gaps', score, total, '', round); } else load(); }
    });
    round();
  };

  // ================= 6. quickfire =================
  App.MOUNT['game-quickfire'] = function (el) {
    const strip = (q) => q.replace(/^Is the statement below true or false\?\s*/, '').replace(/^"|"$/g, '');
    const pool = window.QUESTIONS.filter((q) => q.o.length === 2 && q.o[0] === 'True').map((q) => [strip(q.q), q.a === 0, q.x]).concat(G.tf);
    let deck; let i; let score; let streak; let bestStreak; let misses; let end; let timer; let flash;
    function intro() {
      el.innerHTML = `<div class="q-card quickfire"><p class="lead">You have <b>60 seconds</b>. Decide whether each statement is true or false.</p><p class="muted">Keyboard: <span class="kbd">←</span> false · <span class="kbd">→</span> true</p><div class="q-actions" style="justify-content:flex-start"><button class="btn" data-start>Start</button></div></div>`;
    }
    function start() { deck = shuffle(pool); i = 0; score = 0; streak = 0; bestStreak = 0; misses = []; flash = null; end = Date.now() + 60000; clearInterval(timer); timer = setInterval(tick, 200); paint(); }
    function left() { return Math.max(0, Math.ceil((end - Date.now()) / 1000)); }
    function tick() { if (!document.body.contains(el)) { clearInterval(timer); return; } const s = $('.qf-time', el); if (s) { s.textContent = `${left()}s`; s.classList.toggle('low', left() <= 10); const bar = $('.qf-bar i', el); if (bar) bar.style.width = `${(left() / 60) * 100}%`; } if (left() <= 0) finish(); }
    function paint() {
      const q = deck[i % deck.length];
      el.innerHTML = `<div class="q-card quickfire ${flash || ''}"><div class="q-top"><span>Score <b class="mono">${score}</b> · streak <b class="mono">${streak}</b></span><span class="timer qf-time">${left()}s</span></div><div class="qf-bar"><i style="width:${(left() / 60) * 100}%"></i></div>
        <p class="qf-statement">${esc(q[0])}</p>
        <div class="qf-btns"><button class="btn qf-false" data-a="0">← False</button><button class="btn qf-true" data-a="1">True →</button></div></div>`;
    }
    function answer(v) {
      if (!deck || left() <= 0) return;
      const q = deck[i % deck.length]; const ok = v === q[1];
      if (ok) { score += 1; streak += 1; bestStreak = Math.max(bestStreak, streak); } else { streak = 0; misses.push(q); }
      i += 1; flash = ok ? 'flash-ok' : 'flash-no'; paint();
    }
    function finish() {
      clearInterval(timer); if (!deck) return;
      const answered = i; const d = deck; deck = null;
      el.innerHTML = `<div class="q-card"><p class="lead" style="margin:0">Time’s up! You answered ${answered} statement${answered === 1 ? '' : 's'}, best streak ${bestStreak}.</p></div>${misses.length ? `<div class="review" style="margin-top:12px">${misses.map((m) => `<div class="review-item bad"><div class="q">${esc(m[0])}</div><div class="a">${m[1] ? 'True' : 'False'}. ${esc(m[2] || '')}</div></div>`).join('')}</div>` : ''}`;
      summary(el, 'quickfire', score, Math.max(answered, 1), '', start);
      void d;
    }
    el.addEventListener('click', (e) => { if (e.target.closest('[data-start]')) start(); const a = e.target.closest('[data-a]'); if (a) answer(a.dataset.a === '1'); });
    const onKey = (e) => { if (!document.body.contains(el)) { document.removeEventListener('keydown', onKey); return; } if (!deck) return; if (e.key === 'ArrowLeft') { e.preventDefault(); answer(false); } else if (e.key === 'ArrowRight') { e.preventDefault(); answer(true); } };
    document.addEventListener('keydown', onKey);
    intro();
  };

  // ================= 7. who am I =================
  App.MOUNT['game-whoami'] = function (el) {
    let qs; let qi; let score; let shown; let opts; let picked;
    function round() { qs = shuffle(G.whoami).slice(0, 5); qi = 0; score = 0; load(); }
    function load() { const q = qs[qi]; shown = 1; picked = null; opts = shuffle([q[0]].concat(shuffle(G.whoami.filter((x) => x !== q).map((x) => x[0])).slice(0, 3))); paint(); }
    function paint() {
      const q = qs[qi]; const done = picked != null; const ok = picked === q[0];
      const person = window.PEOPLE.find((p) => p.n === q[0] || p.n.endsWith(q[0]) || q[0].endsWith(p.n));
      el.innerHTML = `<div class="q-card"><div class="q-top"><span>Person ${qi + 1} of ${qs.length}</span><span>Score ${score}</span></div>
        <ol class="clues">${q[1].map((c, ci) => `<li class="${ci < shown || done ? 'on' : ''}">${ci < shown || done ? esc(c) : `Clue ${ci + 1}`}</li>`).join('')}</ol>
        ${done ? '' : `<p class="q-hint">Points if you answer now: ${5 - shown}</p>`}
        <div class="opts">${opts.map((o) => `<button class="opt ${done ? (o === q[0] ? 'right' : o === picked ? 'wrong' : '') : ''}" data-o="${esc(o)}" ${done ? 'disabled' : ''}><span>${esc(o)}</span></button>`).join('')}</div>
        ${done ? `<div class="feedback ${ok ? 'ok' : 'no'}"><b>${ok ? `Correct: ${5 - shown} point${5 - shown === 1 ? '' : 's'}.` : `<span>Answer:</span> <span>${esc(q[0])}</span>`}</b> ${person ? `<span>${esc(person.f)}</span>` : ''}</div>` : ''}
        <div class="q-actions">${done ? `<button class="btn" data-next>${qi + 1 < qs.length ? 'Next person' : 'See score'} →</button>` : `<button class="btn ghost" data-more ${shown >= q[1].length ? 'disabled' : ''}>Show another clue</button>`}</div></div>`;
    }
    el.addEventListener('click', (e) => {
      const o = e.target.closest('[data-o]');
      if (o && picked == null) { picked = o.dataset.o; if (picked === qs[qi][0]) score += 5 - shown; paint(); }
      else if (e.target.closest('[data-more]')) { shown = Math.min(shown + 1, qs[qi][1].length); paint(); }
      else if (e.target.closest('[data-next]')) { qi += 1; if (qi >= qs.length) { $('[data-next]', el).remove(); summary(el, 'whoami', score, qs.length * 4, '', round); } else load(); }
    });
    round();
  };

  // ================= 8. picture round =================
  App.MOUNT['game-picture'] = function (el) {
    const PLACES = [['stonehenge', 'Stonehenge'], ['hadrians-wall', 'Hadrian’s Wall'], ['bayeux-tapestry', 'The Bayeux Tapestry'], ['conwy-castle', 'Conwy Castle'], ['windsor-castle', 'Windsor Castle'], ['london-eye', 'The London Eye'], ['tower-bridge', 'Tower Bridge'], ['cenotaph', 'The Cenotaph'], ['kew-gardens', 'Kew Gardens'], ['lake-district', 'The Lake District'], ['house-of-commons', 'The House of Commons'], ['house-of-lords', 'The House of Lords'], ['big-ben', 'Big Ben'], ['giants-causeway', 'Giant’s Causeway'], ['edinburgh-castle', 'Edinburgh Castle'], ['eden-project', 'The Eden Project'], ['snowdon', 'Snowdon'], ['loch-lomond', 'Loch Lomond'], ['tower-of-london', 'The Tower of London']];
    const PEOPLE = [['henry-viii', 'Henry VIII'], ['elizabeth-i', 'Elizabeth I'], ['cromwell', 'Oliver Cromwell'], ['victoria', 'Queen Victoria'], ['attlee', 'Clement Attlee'], ['thatcher', 'Margaret Thatcher'], ['chaplin', 'Charlie Chaplin'], ['coronation', 'King Charles III']];
    const INV = Object.keys(App.ART).map((k) => [k, App.ART[k].title]);
    const CATS = [['Which place is this?', PLACES], ['Who is this?', PEOPLE], ['Which invention is this?', INV]];
    let qs; let qi; let score; let picked;
    function round() {
      const all = [];
      CATS.forEach(([q, list], ci) => list.forEach((it) => all.push({ q, ci, it })));
      qs = shuffle(all).slice(0, 8); qi = 0; score = 0; load();
    }
    function load() { const q = qs[qi]; const list = CATS[q.ci][1]; q.opts = shuffle([q.it[1]].concat(shuffle(list.filter((x) => x !== q.it).map((x) => x[1])).slice(0, 3))); picked = null; paint(); }
    function paint() {
      const q = qs[qi]; const done = picked != null; const ok = picked === q.it[1];
      el.innerHTML = `<div class="q-card"><div class="q-top"><span>Picture ${qi + 1} of ${qs.length}</span><span>Score ${score}</span></div>
        <div class="pic-grid"><div class="pic-frame">${App.media(q.it[0])}</div><div><p class="q-text">${esc(q.q)}</p>
        <div class="opts">${q.opts.map((o) => `<button class="opt ${done ? (o === q.it[1] ? 'right' : o === picked ? 'wrong' : '') : ''}" data-o="${esc(o)}" ${done ? 'disabled' : ''}><span>${esc(o)}</span></button>`).join('')}</div>
        ${done ? `<div class="feedback ${ok ? 'ok' : 'no'}"><b>${ok ? 'Correct.' : `<span>Answer:</span> <span>${esc(q.it[1])}</span>`}</b> <span>${window.PHOTOS[q.it[0]] ? esc(window.PHOTOS[q.it[0]].cap) : App.ART[q.it[0]] ? esc(App.ART[q.it[0]].who) : ''}</span></div><div class="q-actions"><button class="btn" data-next>${qi + 1 < qs.length ? 'Next picture' : 'See score'} →</button></div>` : ''}</div></div></div>`;
    }
    el.addEventListener('click', (e) => {
      const o = e.target.closest('[data-o]');
      if (o && picked == null) { picked = o.dataset.o; if (picked === qs[qi].it[1]) score += 1; paint(); }
      else if (e.target.closest('[data-next]')) { qi += 1; if (qi >= qs.length) { $('[data-next]', el).remove(); summary(el, 'picture', score, qs.length, '', round); } else load(); }
    });
    round();
  };

  // ================= 9. odd one out =================
  App.MOUNT['game-odd'] = function (el) {
    let qs; let qi; let score; let picked; let opts;
    function round() { qs = shuffle(G.odd).slice(0, 6); qi = 0; score = 0; load(); }
    function load() { const q = qs[qi]; opts = shuffle(q[0].map((x, i) => [x, i === q[1]])); picked = null; paint(); }
    function paint() {
      const q = qs[qi]; const done = picked != null;
      el.innerHTML = `<div class="q-card"><div class="q-top"><span>Set ${qi + 1} of ${qs.length}</span><span>Score ${score}</span></div><p class="q-text">Which is the odd one out?</p>
        <div class="odd-grid">${opts.map(([x, odd], i) => `<button class="odd-item ${done ? (odd ? 'right' : i === picked ? 'wrong' : '') : ''}" data-i="${i}" ${done ? 'disabled' : ''}>${esc(x)}</button>`).join('')}</div>
        ${done ? `<div class="feedback ${opts[picked][1] ? 'ok' : 'no'}"><b>${opts[picked][1] ? 'Correct.' : 'Not quite.'}</b> <span>${esc(q[2])}</span></div><div class="q-actions"><button class="btn" data-next>${qi + 1 < qs.length ? 'Next set' : 'See score'} →</button></div>` : ''}</div>`;
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (b && picked == null) { picked = +b.dataset.i; if (opts[picked][1]) score += 1; paint(); }
      else if (e.target.closest('[data-next]')) { qi += 1; if (qi >= qs.length) { $('[data-next]', el).remove(); summary(el, 'odd', score, qs.length, '', round); } else load(); }
    });
    round();
  };

  // ================= 10. guess the number =================
  App.MOUNT['game-numbers'] = function (el) {
    let qs; let qi; let score; let val; let locked;
    function round() { qs = shuffle(G.numbers).slice(0, 5); qi = 0; score = 0; load(); }
    function load() { const q = qs[qi]; val = Math.round((q[2] + (q[3] - q[2]) / 2) / q[4]) * q[4]; locked = null; paint(); }
    const fmtN = (n) => Number(n).toLocaleString(App.locale());
    function paint() {
      const q = qs[qi]; const [text, ansN, min, max, step, shown, note] = q;
      const pct = (v) => ((v - min) / (max - min)) * 100;
      el.innerHTML = `<div class="q-card"><div class="q-top"><span>Question ${qi + 1} of ${qs.length}</span><span>Score ${score}</span></div><p class="q-text">${esc(text)}</p>
        <div class="num-guess"><output class="num-val" for="ng">${fmtN(val)}</output>
        <div class="num-track"><input id="ng" type="range" min="${min}" max="${max}" step="${step}" value="${val}" ${locked ? 'disabled' : ''} aria-label="Your guess">${locked ? `<span class="num-ans" style="left:${pct(ansN)}%"><i>${esc(fmtN(ansN))}</i></span>` : ''}</div>
        <div class="num-ends"><span>${fmtN(min)}</span><span>${fmtN(max)}</span></div>
        ${locked ? '' : `<div class="num-step"><button class="btn sm ghost" data-d="-1" aria-label="Lower">−</button><button class="btn sm ghost" data-d="1" aria-label="Higher">+</button></div>`}</div>
        ${locked ? `<div class="feedback ${locked.pts ? 'ok' : 'no'}"><b>${locked.pts === 3 ? 'Exactly right!' : locked.pts === 2 ? 'Very close!' : locked.pts === 1 ? 'Close.' : 'Not close.'} ${locked.pts} point${locked.pts === 1 ? '' : 's'}.</b> <span>Answer:</span> <span>${esc(shown)}</span>. <span>${esc(note)}</span></div><div class="q-actions"><button class="btn" data-next>${qi + 1 < qs.length ? 'Next question' : 'See score'} →</button></div>` : '<div class="q-actions"><button class="btn" data-lock>Lock in my answer</button></div>'}</div>`;
    }
    el.addEventListener('input', (e) => { if (e.target.id === 'ng') { val = +e.target.value; $('.num-val', el).textContent = fmtN(val); } });
    el.addEventListener('click', (e) => {
      const q = qs[qi];
      const d = e.target.closest('[data-d]'); if (d && !locked) { val = Math.min(q[3], Math.max(q[2], val + (+d.dataset.d) * q[4])); paint(); return; }
      if (e.target.closest('[data-lock]')) {
        const range = q[3] - q[2]; const diff = Math.abs(val - q[1]);
        const pts = diff <= q[4] / 2 ? 3 : diff <= range * 0.05 ? 2 : diff <= range * 0.15 ? 1 : 0;
        locked = { pts }; score += pts; paint();
      } else if (e.target.closest('[data-next]')) { qi += 1; if (qi >= qs.length) { $('[data-next]', el).remove(); summary(el, 'numbers', score, qs.length * 3, '', round); } else load(); }
    });
    round();
  };
})();

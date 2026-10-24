/* Photos, illustrations and the world / Europe map engine. */
(function () {
  const App = window.App;
  const { esc, data, $, $$ } = App.util;
  const V = App.VIZ;
  const fig = App.figHtml;
  const PH = window.PHOTOS;

  // ---------------- photos ----------------
  App.img = (name) => (window.IMAGES && window.IMAGES[name]) || `img/${name}.webp`;
  App.photoHtml = (name, opts) => {
    const p = PH[name]; if (!p) return '';
    opts = opts || {};
    const cls = ['photo', opts.side ? 'pside' : '', p.portrait ? 'portrait' : '', opts.hero ? 'hero-img' : ''].join(' ');
    return `<figure class="${cls}"><img src="${App.img(name)}" alt="${esc(p.cap)}" loading="lazy" decoding="async" style="${p.pos ? `object-position:${p.pos}` : ''}"><figcaption>${esc(p.cap)}</figcaption></figure>`;
  };
  App.galleryHtml = (names) => `<div class="gallery g${names.length}">${names.map((n) => App.photoHtml(n)).join('')}</div>`;
  // A landmark or invention picture: a photo if there is one, otherwise a drawing.
  App.media = (name) => {
    if (!name) return '';
    if (PH[name]) return `<img class="media-img" src="${App.img(name)}" alt="${esc(PH[name].cap)}" loading="lazy" style="${PH[name].pos ? `object-position:${PH[name].pos}` : ''}">`;
    const s = App.artSvg(name);
    return s ? `<div class="media-art">${s}</div>` : '';
  };

  // ---------------- illustrated "how it works" figure ----------------
  V.art = (o) => {
    const a = App.ART[o.a]; if (!a) return '';
    return `<figure class="fig art-fig"><div class="fig-h"><h3>${esc(o.title || `How it works: ${a.title}`)}</h3><span class="muted">${esc([a.who, a.when].filter(Boolean).join(' · '))}</span></div>
      <div class="art-grid"><div class="art-stage">${a.svg()}</div><ol class="steps">${a.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join('')}</ol></div></figure>`;
  };

  const INV_ORDER = ['tv', 'turing', 'jet', 'radar', 'telescope', 'insulin', 'dna', 'hovercraft', 'concorde', 'harrier', 'atm', 'ivf', 'mri', 'web', 'dolly'];
  V.inventions = () => `<figure class="fig testable inv-fig"><div class="fig-h"><h3>Invented or discovered in Britain</h3><div class="testme"><span class="muted small">Hide the inventors</span>${App.testBtn}</div></div><div data-mount="inventions"></div></figure>`;
  App.MOUNT.inventions = function (el) {
    let sel = 'tv';
    function detail() {
      const a = App.ART[sel];
      return `<div class="inv-detail" aria-live="polite"><div class="art-stage ${sel === 'harrier' ? 'harrier-stage' : ''}">${a.svg()}${sel === 'harrier' ? '<div class="seg" role="group" style="margin-top:8px"><button data-h="up" aria-pressed="true">Take off</button><button data-h="fwd" aria-pressed="false">Fly forwards</button></div>' : ''}</div>
        <div><span class="eyebrow">${esc(a.when || ' ')}</span><h3 class="inv-title">${esc(a.title)}</h3><p class="inv-who ans" data-reveal>${esc(a.who)}</p><ol class="steps">${a.steps.map((s) => `<li><span>${esc(s)}</span></li>`).join('')}</ol></div></div>`;
    }
    function paint() {
      el.innerHTML = `${detail()}<p class="chips-h" style="margin-top:6px">Choose an invention</p><div class="inv-grid">${INV_ORDER.map((k) => { const a = App.ART[k]; return `<button class="inv ${k === sel ? 'on' : ''}" data-k="${k}" data-reveal><span class="inv-art">${a.svg()}</span><span class="when">${esc(a.when || '—')}</span><b>${esc(a.title)}</b><span class="ans">${esc(a.who)}</span></button>`; }).join('')}</div>`;
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-k]'); const h = e.target.closest('[data-h]');
      if (b) { sel = b.dataset.k; paint(); $('.inv-detail', el).scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
      else if (h) { const s = $('.inv-detail .art', el); s.classList.toggle('forward', h.dataset.h === 'fwd'); $$('[data-h]', el).forEach((x) => x.setAttribute('aria-pressed', String(x === h))); }
    });
    paint();
  };

  // ---------------- map engine ----------------
  const W = window.WORLD_MAP;
  function projector(view) {
    const m = W[view]; const p = m.proj;
    return ([lat, lon]) => {
      if (view === 'world' && lon < -169) lon += 360;
      return [(lon - p.lonMin) * p.k * p.scale, (p.latMax - lat) * p.scale];
    };
  }
  const r1 = (n) => Math.round(n * 10) / 10;
  function arrowPath(P, a, b, bend) {
    const [x1, y1] = P(a); const [x2, y2] = P(b);
    const mx = (x1 + x2) / 2; const my = (y1 + y2) / 2; const dx = x2 - x1; const dy = y2 - y1;
    const cx = mx - dy * (bend == null ? 0.25 : bend); const cy = my + dx * (bend == null ? 0.25 : bend);
    return { d: `M${r1(x1)} ${r1(y1)} Q${r1(cx)} ${r1(cy)} ${r1(x2)} ${r1(y2)}`, lx: r1((x1 + 2 * cx + x2) / 4), ly: r1((y1 + 2 * cy + y2) / 4) };
  }
  // layer: { fill: {CODE: cls}, dots: [{ll, cls, t}], arrows: [{from, to, cls, t, bend}], pins: [{ll, t, cls}] }
  function geoSvg(view, layer, opts) {
    const m = W[view]; const P = projector(view);
    opts = opts || {};
    const vb = opts.crop ? (() => { const [x1, y1] = P([opts.crop[3], opts.crop[0]]); const [x2, y2] = P([opts.crop[2], opts.crop[1]]); return `${r1(x1)} ${r1(y1)} ${r1(x2 - x1)} ${r1(y2 - y1)}`; })() : `0 0 ${m.w} ${m.h}`;
    const fill = layer.fill || {};
    const sw = opts.stroke || (view === 'world' ? 0.35 : 0.5);
    const paths = Object.entries(m.paths).map(([k, d]) => `<path d="${d}" class="geo ${fill[k] || ''}" data-c="${k}" style="stroke-width:${sw}"/>`).join('');
    const scale = opts.ms || 1;
    const arrows = (layer.arrows || []).map((a, i) => { const ap = arrowPath(P, a.from, a.to, a.bend); return `<g class="geo-arrow ${a.cls || ''}" data-g="${a.g || ''}"><path d="${ap.d}" class="geo-arrow-line" style="stroke-width:${2.2 * scale};animation-delay:${(i % 6) * 0.15}s" marker-end="url(#gah-${opts.id || 'm'})"/>${a.t ? `<text x="${ap.lx}" y="${r1(ap.ly - 3 * scale)}" class="geo-lbl" style="font-size:${9 * scale}px" text-anchor="middle">${esc(a.t)}</text>` : ''}</g>`; }).join('');
    const dots = (layer.dots || []).map((d) => { const [x, y] = P(d.ll); return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${(d.r || 2.4) * scale}" class="geo-dot ${d.cls || ''}"><title>${esc(d.t || '')}</title></circle>`; }).join('');
    const pins = (layer.pins || []).map((d) => { const [x, y] = P(d.ll); return `<g class="geo-pin ${d.cls || ''}"><circle cx="${r1(x)}" cy="${r1(y)}" r="${3.2 * scale}"/>${d.t ? `<text x="${r1(x + (d.dx == null ? 5 : d.dx) * scale)}" y="${r1(y + 3 * scale)}" class="geo-lbl" style="font-size:${8.5 * scale}px" text-anchor="${d.a || 'start'}">${esc(d.t)}</text>` : ''}</g>`; }).join('');
    const labels = (layer.labels || []).map((d) => { const [x, y] = P(d.ll); return `<text x="${r1(x)}" y="${r1(y)}" class="geo-lbl big" style="font-size:${10 * scale}px" text-anchor="middle">${esc(d.t)}</text>`; }).join('');
    return `<svg class="geo-svg" viewBox="${vb}" role="img" aria-label="${esc(opts.aria || 'Map')}"><defs><marker id="gah-${opts.id || 'm'}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="geo-head"/></marker></defs><rect x="-50" y="-50" width="${m.w + 100}" height="${m.h + 100}" class="geo-sea"/>${paths}${dots}${arrows}${pins}${labels}</svg>`;
  }
  App.geoSvg = geoSvg;

  // A map with switchable modes. modes: [{k, label, layer, legend:[[cls, text]], note}]
  function modalMap(id, view, modes, opts) {
    V[id] = (o) => `<figure class="fig geo-fig"><div class="fig-h"><h3>${esc((o && o.title) || opts.title)}</h3>${opts.sub && !(o && o.only && o.only.length === 1) ? `<span class="muted">${esc(opts.sub)}</span>` : ''}</div><div data-mount="geomap" data-o="${data({ id, only: o && o.only, start: o && o.start })}"></div></figure>`;
    MAPS[id] = { view, modes, opts };
  }
  const MAPS = {};
  App.MOUNT.geomap = function (el, o) {
    const M = MAPS[o.id];
    const modes = o.only ? M.modes.filter((m) => o.only.includes(m.k)) : M.modes;
    let cur = modes.find((m) => m.k === o.start) || modes[0];
    function paint() {
      el.innerHTML = `${modes.length > 1 ? `<div class="seg" role="group" aria-label="Map view" style="margin-bottom:12px">${modes.map((m) => `<button data-m="${m.k}" aria-pressed="${m === cur}">${esc(m.label)}</button>`).join('')}</div>` : ''}
        <div class="geo-wrap ${M.view}">${geoSvg(M.view, cur.layer, Object.assign({ id: o.id, aria: cur.label }, M.opts, cur.opts || {}))}</div>
        <div class="geo-foot">${cur.legend ? `<div class="legend">${cur.legend.map(([c, t]) => `<span><i class="sw ${c}"></i>${esc(t)}</span>`).join('')}</div>` : ''}${cur.note ? `<p class="geo-note">${esc(cur.note)}</p>` : ''}</div>`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) { cur = modes.find((m) => m.k === b.dataset.m); paint(); } });
    paint();
  };

  // ---------- places ----------
  const LL = {
    britain: [52.6, -1.4], london: [51.5, -0.1], kent: [51.2, 1.0], eastAnglia: [52.6, 1.2], essex: [51.75, 0.7], hastings: [50.9, 0.6], canterbury: [51.28, 1.08],
    rome: [41.9, 12.5], gaul: [47.5, 3], jutland: [56.2, 9.3], saxony: [53.3, 8.5], norway: [60.4, 5.3], denmark: [55.6, 10.5], orkney: [59.0, -3.0], lindisfarne: [55.67, -1.8], danelaw: [53.3, -0.6],
    normandy: [49.2, -0.4], ireland: [53.6, -7.5], iona: [56.33, -6.4], dunkirk: [51.03, 2.37], dover: [51.13, 1.3], normandyBeach: [49.35, -0.6], portsmouth: [50.8, -1.1], coventry: [52.41, -1.51], poland: [52.2, 19.0], germany: [52.5, 13.4], berlin: [52.5, 13.4],
    virginia: [37.5, -77], westIndies: [17.5, -72], jamaica: [18.1, -77.3], westAfrica: [6.5, -1], india: [22, 79], indonesia: [-2, 116], canada: [56, -100], australia: [-25, 134], nz: [-41, 174], southAfrica: [-29, 25], kenya: [0.5, 37.9], uganda: [1.3, 32.3], pakistan: [30, 70], bangladesh: [23.7, 90.4], sriLanka: [7.8, 80.7], france: [46.6, 2.4], netherlands: [52.2, 5.3], russia: [56, 38], polandJ: [52, 21]
  };

  // ---------- invasions of early Britain ----------
  const INV_CROP = [-11, 16, 41.2, 62];
  modalMap('invasions', 'europe', [
    { k: 'all', label: 'All', layer: { fill: { GBR: 'hl-uk', IRL: 'hl-soft' }, arrows: [
      { from: LL.rome, to: LL.kent, cls: 'c-rom', t: 'Romans, AD 43', bend: 0.18 },
      { from: LL.jutland, to: LL.eastAnglia, cls: 'c-sax', t: 'Angles, Jutes', bend: -0.2 },
      { from: LL.saxony, to: LL.essex, cls: 'c-sax', t: 'Saxons', bend: 0.15 },
      { from: LL.norway, to: LL.orkney, cls: 'c-vik', t: 'Vikings', bend: 0.2 },
      { from: LL.denmark, to: LL.danelaw, cls: 'c-vik', t: 'Danes', bend: 0.2 },
      { from: LL.normandy, to: LL.hastings, cls: 'c-nor', t: 'Normans, 1066', bend: -0.3 }] }, legend: [['c-rom', 'Romans (AD 43)'], ['c-sax', 'Jutes, Angles, Saxons (after AD 410)'], ['c-vik', 'Vikings (from AD 789)'], ['c-nor', 'Normans (1066)']] },
    { k: 'romans', label: 'Romans', layer: { fill: { GBR: 'hl-uk', ITA: 'hl-rom', FRA: 'hl-rom-soft' }, arrows: [{ from: LL.rome, to: LL.kent, cls: 'c-rom', t: 'AD 43: Claudius', bend: 0.18 }], pins: [{ ll: [55.0, -2.3], t: 'Hadrian’s Wall', cls: 'c-rom' }, { ll: LL.rome, t: 'Rome', cls: 'c-rom' }] }, note: 'Julius Caesar’s invasion of 55 BC failed. In AD 43 Emperor Claudius conquered almost all of Britain. The Romans stayed for 400 years, until AD 410, and never conquered what is now Scotland.' },
    { k: 'saxons', label: 'Anglo-Saxons', layer: { fill: { GBR: 'hl-uk', DNK: 'hl-sax', DEU: 'hl-sax-soft' }, arrows: [{ from: LL.jutland, to: LL.eastAnglia, cls: 'c-sax', t: 'Angles and Jutes', bend: -0.2 }, { from: LL.saxony, to: LL.essex, cls: 'c-sax', t: 'Saxons', bend: 0.15 }], pins: [{ ll: [52.09, 1.34], t: 'Sutton Hoo', cls: 'c-sax', dx: 5 }] }, note: 'After the Romans left in AD 410, tribes from northern Europe invaded. By about AD 600 Anglo-Saxon kingdoms were established, mainly in what is now England. Their languages are the basis of modern English.' },
    { k: 'vikings', label: 'Vikings', layer: { fill: { GBR: 'hl-uk', NOR: 'hl-vik', DNK: 'hl-vik' }, arrows: [{ from: LL.norway, to: LL.orkney, cls: 'c-vik', t: 'from Norway', bend: 0.2 }, { from: LL.denmark, to: LL.danelaw, cls: 'c-vik', t: 'from Denmark', bend: 0.2 }], pins: [{ ll: LL.danelaw, t: 'Danelaw', cls: 'c-vik', a: 'end', dx: -6 }] }, note: 'Vikings from Denmark and Norway first raided in AD 789, then settled in the east of England and Scotland. Alfred the Great defeated them, but many stayed in the Danelaw.' },
    { k: 'normans', label: 'Normans', layer: { fill: { GBR: 'hl-uk', FRA: 'hl-nor' }, arrows: [{ from: LL.normandy, to: LL.hastings, cls: 'c-nor', t: '1066', bend: -0.3 }], pins: [{ ll: LL.hastings, t: 'Hastings', cls: 'c-nor' }, { ll: LL.normandy, t: 'Normandy', cls: 'c-nor', a: 'end', dx: -6 }] }, note: 'In 1066 William, Duke of Normandy, defeated King Harold at the Battle of Hastings: the last successful foreign invasion of England.' },
    { k: 'missions', label: 'Missionaries', layer: { fill: { GBR: 'hl-uk', IRL: 'hl-mis' }, arrows: [{ from: LL.ireland, to: LL.iona, cls: 'c-mis', t: 'St Patrick, St Columba', bend: -0.3 }, { from: LL.rome, to: LL.canterbury, cls: 'c-mis', t: 'St Augustine', bend: -0.12 }], pins: [{ ll: LL.iona, t: 'Iona', cls: 'c-mis', a: 'end', dx: -6 }, { ll: LL.canterbury, t: 'Canterbury', cls: 'c-mis' }] }, note: 'Missionaries from Ireland spread Christianity in the north; St Augustine led missionaries from Rome in the south and became the first Archbishop of Canterbury.' }
  ], { title: 'Who invaded Britain, and where from', sub: 'Choose a group', crop: INV_CROP, ms: 0.9 });

  // ---------- Second World War ----------
  modalMap('ww2map', 'europe', [
    { k: 'ww2', label: '1939–1945', layer: { fill: { GBR: 'hl-uk', DEU: 'hl-axis', ITA: 'hl-axis-soft', POL: 'hl-soft', FRA: 'hl-ally-soft' }, arrows: [
      { from: LL.berlin, to: [52.2, 19.5], cls: 'c-axis', t: '1939: Poland invaded', bend: 0.3 },
      { from: LL.dunkirk, to: LL.dover, cls: 'c-ally', bend: -0.6 },
      { from: LL.portsmouth, to: LL.normandyBeach, cls: 'c-ally', bend: 0.3 }],
      pins: [{ ll: LL.london, t: 'The Blitz', cls: 'c-axis', a: 'end', dx: -6 }, { ll: LL.coventry, t: 'Coventry', cls: 'c-axis', a: 'end', dx: -6 }, { ll: LL.dunkirk, t: 'Dunkirk, 1940', cls: 'c-ally' }, { ll: [49.3, -0.4], t: 'D-Day, 1944', cls: 'c-ally' }],
      labels: [{ ll: [50.25, -3.6], t: 'Battle of Britain' }] }, legend: [['c-axis', 'Germany and the Axis'], ['c-ally', 'Britain and the Allies']], note: 'Hitler’s invasion of Poland in 1939 led Britain and France to declare war. In 1940 more than 300,000 men were rescued from Dunkirk and the RAF won the Battle of Britain in the skies over southern England. On D-Day, 6 June 1944, Allied forces landed in Normandy.' }
  ], { title: 'The Second World War in Europe', sub: 'Key moments from the handbook', crop: [-10.5, 25, 45.5, 58.5], ms: 0.85 });

  // ---------- the wider world ----------
  const EMPIRE = { IND: 'emp', PAK: 'emp', BGD: 'emp', LKA: 'emp', MMR: 'emp', CAN: 'emp', AUS: 'emp', NZL: 'emp', ZAF: 'emp', BWA: 'emp', ZWE: 'emp', ZMB: 'emp', MWI: 'emp', KEN: 'emp', UGA: 'emp', TZA: 'emp', NGA: 'emp', GHA: 'emp', SLE: 'emp', GMB: 'emp', SDN: 'emp', EGY: 'emp', LSO: 'emp', SWZ: 'emp', GBR: 'hl-uk', GUY: 'emp', JAM: 'emp', BHS: 'emp', BLZ: 'emp', TTO: 'emp', MYS: 'emp', PNG: 'emp-soft', FJI: 'emp' };
  const CW = {
    africa: { codes: ['BWA', 'CMR', 'GAB', 'GMB', 'GHA', 'KEN', 'SWZ', 'LSO', 'MWI', 'MOZ', 'NAM', 'NGA', 'RWA', 'SLE', 'ZAF', 'TGO', 'UGA', 'TZA', 'ZMB'], dots: [['Mauritius', [-20.3, 57.55]], ['Seychelles', [-4.68, 55.49]]] },
    asia: { codes: ['BGD', 'BRN', 'IND', 'MYS', 'PAK', 'LKA'], dots: [['Maldives', [3.2, 73.2]], ['Singapore', [1.35, 103.8]]] },
    americas: { codes: ['BHS', 'BLZ', 'CAN', 'GUY', 'JAM', 'TTO'], dots: [['Antigua and Barbuda', [17.07, -61.8]], ['Barbados', [13.19, -59.54]], ['Dominica', [15.41, -61.37]], ['Grenada', [12.11, -61.68]], ['Saint Lucia', [13.91, -60.98]], ['St Kitts and Nevis', [17.3, -62.72]], ['St Vincent and the Grenadines', [13.25, -61.2]]] },
    europe: { codes: ['CYP', 'GBR'], dots: [['Malta', [35.9, 14.5]]] },
    pacific: { codes: ['AUS', 'FJI', 'NZL', 'PNG', 'SLB', 'VUT'], dots: [['Kiribati', [1.87, -157.36]], ['Nauru', [-0.52, 166.93]], ['Samoa', [-13.76, -172.1]], ['Tonga', [-21.18, -175.2]], ['Tuvalu', [-7.11, 177.6]]] }
  };
  const cwFill = {}; const cwDots = [];
  Object.entries(CW).forEach(([r, v]) => { v.codes.forEach((c) => { cwFill[c] = `cw-${r}`; }); v.dots.forEach(([t, ll]) => cwDots.push({ ll, t, cls: `cw-${r}` })); });
  cwFill.GBR = 'hl-uk';

  const worldModes = [
    { k: 'trade', label: 'Trade in the 1700s', layer: { fill: { GBR: 'hl-uk', CAN: 'emp', IND: 'emp-soft', AUS: 'emp-soft', ZAF: 'emp-soft', USA: 'col13' }, arrows: [
      { from: LL.virginia, to: LL.britain, cls: 'c-trade', t: 'sugar, tobacco', bend: -0.15 },
      { from: LL.westIndies, to: LL.britain, cls: 'c-trade', t: '', bend: -0.25 },
      { from: LL.india, to: LL.britain, cls: 'c-trade', t: 'textiles, tea, spices', bend: 0.18 },
      { from: LL.indonesia, to: LL.britain, cls: 'c-trade', t: '', bend: 0.2 }],
      pins: [{ ll: [-34, 151], t: 'Cook maps Australia', cls: 'c-trade', a: 'end', dx: -6 }] }, legend: [['emp', 'Under British control by the 1700s'], ['col13', 'The 13 American colonies (independent from 1776)']], note: 'Sugar and tobacco came from North America and the West Indies; textiles, tea and spices from India and what is now Indonesia. Britain gained control over Canada, the East India Company took over large parts of India, and colonies began in southern Africa and Australia.' },
    { k: 'slavery', label: 'The slave trade', layer: { fill: { GBR: 'hl-uk' }, arrows: [
      { from: LL.britain, to: LL.westAfrica, cls: 'c-ship', t: 'British ships', bend: 0.25 },
      { from: LL.westAfrica, to: LL.westIndies, cls: 'c-slave', t: 'enslaved people', bend: 0.2 },
      { from: LL.westAfrica, to: LL.virginia, cls: 'c-slave', t: '', bend: 0.28 },
      { from: LL.westIndies, to: LL.britain, cls: 'c-trade', t: 'sugar, tobacco', bend: -0.2 }] }, legend: [['c-ship', 'British ships'], ['c-slave', 'Enslaved people from West Africa'], ['c-trade', 'Goods back to Britain']], note: 'Slaves came mainly from West Africa, carried on British ships in horrible conditions to America and the Caribbean to work on tobacco and sugar plantations. The trade was abolished in 1807, and slavery throughout the Empire in 1833.' },
    { k: 'empire', label: 'The Empire at its height', layer: { fill: EMPIRE, arrows: [{ from: LL.britain, to: LL.canada, cls: 'c-emig', t: '', bend: 0.2 }, { from: LL.britain, to: LL.australia, cls: 'c-emig', t: 'settlers', bend: 0.25 }, { from: LL.britain, to: LL.southAfrica, cls: 'c-emig', t: '', bend: 0.15 }, { from: LL.britain, to: LL.nz, cls: 'c-emig', t: '', bend: 0.3 }] }, legend: [['emp', 'Part of the British Empire (illustrative)'], ['c-emig', 'About 13 million left Britain, 1853–1913']], note: 'In the Victorian period the Empire grew to cover all of India, Australia and large parts of Africa: the largest empire the world has ever seen, with more than 400 million people. Shaded areas are approximate and use modern borders.' },
    { k: 'independence', label: 'Independence after 1947', layer: { fill: { IND: 'ind47', PAK: 'ind47', BGD: 'ind47', LKA: 'ind47', GBR: 'hl-uk', KEN: 'ind-later', UGA: 'ind-later', NGA: 'ind-later', GHA: 'ind-later', TZA: 'ind-later', ZMB: 'ind-later', MWI: 'ind-later', JAM: 'ind-later', TTO: 'ind-later', SLE: 'ind-later', GMB: 'ind-later', BWA: 'ind-later', LSO: 'ind-later', GUY: 'ind-later', FJI: 'ind-later', MYS: 'ind-later', SWZ: 'ind-later' } }, legend: [['ind47', '1947: India, Pakistan and Ceylon (now Sri Lanka) among nine countries'], ['ind-later', 'Over the next 20 years: colonies in Africa, the Caribbean and the Pacific']], note: 'Most former colonies made an orderly transition from Empire to Commonwealth. In 1947 Pakistan included what is now Bangladesh. Borders shown are modern.' },
    { k: 'migration', label: 'Coming to Britain after 1945', layer: { fill: { GBR: 'hl-uk', JAM: 'mig', TTO: 'mig', IND: 'mig', PAK: 'mig', BGD: 'mig', UGA: 'mig', IRL: 'mig' }, arrows: [
      { from: LL.westIndies, to: LL.britain, cls: 'c-mig', t: 'West Indies, from 1948', bend: -0.22 },
      { from: LL.india, to: LL.britain, cls: 'c-mig', t: 'India', bend: 0.12 },
      { from: LL.pakistan, to: LL.britain, cls: 'c-mig', t: 'Pakistan', bend: -0.12 },
      { from: LL.bangladesh, to: LL.britain, cls: 'c-mig', t: '', bend: 0.2 },
      { from: LL.uganda, to: LL.britain, cls: 'c-mig', t: '28,000 from Uganda, 1970s', bend: 0.15 }] }, legend: [['mig', 'Many people came to work and settle']], note: 'Labour shortages after the war: workers came from Ireland and Europe, then the West Indies (from 1948), India, Pakistan and later Bangladesh. In the early 1970s Britain admitted 28,000 people of Indian origin forced to leave Uganda.' },
    { k: 'commonwealth', label: 'The Commonwealth today', layer: { fill: cwFill, dots: cwDots }, legend: [['cw-africa', 'Africa (21)'], ['cw-asia', 'Asia (8)'], ['cw-americas', 'Caribbean and Americas (13)'], ['cw-europe', 'Europe (3)'], ['cw-pacific', 'Pacific (11)']], note: '56 member states, most once part of the British Empire. Small island states are shown as dots. King Charles III is the ceremonial head; membership is voluntary.' }
  ];
  modalMap('worldmap', 'world', worldModes, { title: 'Britain and the world', sub: 'Choose a map' });

  // ---------- Europe: the EU ----------
  const EU = ['AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST', 'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'IRL', 'ITA', 'LVA', 'LTU', 'LUX', 'NLD', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE'];
  const FOUND = ['BEL', 'FRA', 'DEU', 'ITA', 'LUX', 'NLD'];
  const euFill = { GBR: 'left-eu' }; EU.forEach((c) => { euFill[c] = FOUND.includes(c) ? 'eu-found' : 'eu'; });
  modalMap('eumap', 'europe', [{ k: 'eu', label: 'EU', layer: { fill: euFill, dots: [{ ll: [35.9, 14.5], cls: 'eu', t: 'Malta', r: 3 }], pins: [{ ll: [41.9, 12.5], t: 'Rome: Treaty of Rome, 1957', cls: 'c-eu' }] }, legend: [['eu-found', 'Founders of the EEC, 1957'], ['eu', 'Other EU members (27 in total)'], ['left-eu', 'United Kingdom: joined 1973, left 31 January 2020']] }], { title: 'The European Union today', sub: '27 member states', ms: 1.4 });
})();

/* Interactive UK map built from Natural Earth outlines (js/data/map.js). */
(function () {
  const App = window.App;
  const { esc, data, $, $$ } = App.util;
  const M = window.UK_MAP;
  const { NATIONS, CITIES, POI } = window.UK_PLACES;
  const P = M.proj;
  const xy = (ll) => [(ll[1] - P.lonMin) * P.k * P.scale + P.pad, (P.latMax - ll[0]) * P.scale + P.pad];
  const r1 = (n) => Math.round(n * 10) / 10;

  const UNIT_CLASS = { england: 'n-england', scotland: 'n-scotland', wales: 'n-wales', ni: 'n-ni', ireland: 'n-ireland', iom: 'n-cd', jersey: 'n-cd', guernsey: 'n-cd' };
  const LABELS = [
    { k: 'scotland', t: 'Scotland', ll: [57.2, -4.4] }, { k: 'england', t: 'England', ll: [52.75, -1.25] },
    { k: 'wales', t: 'Wales', ll: [52.25, -3.75] }, { k: 'ni', t: 'N. Ireland', ll: [54.55, -6.85] },
    { k: 'ireland', t: 'Ireland', ll: [53.0, -8.1] }
  ];
  const SMALL_LABELS = [{ k: 'iom', t: 'Isle of Man', ll: [54.25, -4.6], a: 'end', dx: -6 }, { k: 'jersey', t: 'Channel Islands', ll: [49.35, -2.75], a: 'end', dx: -6 }];
  const NAME_MODES = {
    uk: { label: 'United Kingdom', set: ['england', 'scotland', 'wales', 'ni'], h: 'The United Kingdom', x: 'Official name: <b>the United Kingdom of Great Britain and Northern Ireland</b>. England, Scotland, Wales and Northern Ireland, governed by Parliament at Westminster, with devolved parliaments or assemblies in Scotland, Wales and Northern Ireland.' },
    gb: { label: 'Great Britain', set: ['england', 'scotland', 'wales'], h: 'Great Britain', x: 'England, Scotland and Wales only. <b>Great Britain does not include Northern Ireland.</b> The handbook uses ‘Britain’ and ‘British’ to mean everyone in the UK.' },
    england: { label: 'England', set: ['england'], nation: 'england' },
    scotland: { label: 'Scotland', set: ['scotland'], nation: 'scotland' },
    wales: { label: 'Wales', set: ['wales'], nation: 'wales' },
    ni: { label: 'N. Ireland', set: ['ni'], nation: 'ni' },
    cd: { label: 'Crown dependencies', set: ['iom', 'jersey', 'guernsey'], h: 'Crown dependencies', x: 'The <b>Isle of Man</b> and the <b>Channel Islands</b> (Jersey and Guernsey are shown). Closely linked to the UK and with their own governments, but <b>not part of the UK</b>.' },
    ireland: { label: 'Ireland', set: ['ireland'], h: 'Ireland', x: 'The rest of Ireland is an <b>independent country</b>. Only Northern Ireland is part of the UK.' }
  };

  function baseSvg(o) {
    const paths = Object.keys(M.paths).map((k) => `<path class="land ${UNIT_CLASS[k]} u-${k} ${o.clickNations && NATIONS[k] ? 'clickable' : ''}" data-unit="${k}" d="${M.paths[k]}"><title>${esc(NATIONS[k] ? NATIONS[k].name : { ireland: 'Ireland (independent country)', iom: 'Isle of Man (Crown dependency)', jersey: 'Jersey (Crown dependency)', guernsey: 'Guernsey (Crown dependency)' }[k])}</title></path>`).join('');
    const labels = LABELS.map((l) => { const [x, y] = xy(l.ll); return `<text class="lbl-lg" x="${r1(x)}" y="${r1(y)}" text-anchor="middle">${l.t}</text>`; }).join('');
    const small = (o.smallLabels ? SMALL_LABELS : []).map((l) => { const [x, y] = xy(l.ll); return `<text class="lbl" x="${r1(x + l.dx)}" y="${r1(y)}" text-anchor="${l.a}">${l.t}</text>`; }).join('');
    return `<svg viewBox="0 0 ${M.w} ${M.h}" role="img" aria-label="${esc(o.aria || 'Map of the United Kingdom and Ireland')}"><rect class="sea" x="0" y="0" width="${M.w}" height="${M.h}" rx="10"/>${paths}<g class="labels">${labels}${small}</g><g class="overlay"></g></svg>`;
  }

  function nationCard(k) {
    const n = NATIONS[k];
    return `<div class="nation-card"><h3>${esc(n.name)}</h3><dl>
      <dt>Capital</dt><dd>${esc(n.capital)}</dd>
      <dt>Cities</dt><dd>${esc(n.cities.join(', '))}</dd>
      <dt>Population</dt><dd>${esc(n.share)} of the UK</dd>
      <dt>Patron saint</dt><dd>${esc(n.saint)}, ${esc(n.saintDay)}. ${esc(n.saintHoliday)}.</dd>
      <dt>Flower</dt><dd>${esc(n.flower)}</dd>
      <dt>Food</dt><dd>${esc(n.food)}</dd>
      <dt>Language</dt><dd>${esc(n.language)}</dd>
      <dt>Governed by</dt><dd>${esc(n.legislature)}</dd>
      <dt>Church</dt><dd>${esc(n.church)}</dd>
      <dt>Flag</dt><dd>${esc(n.flag)}</dd>
    </dl></div>`;
  }

  App.VIZ.ukmap = function (o) {
    const titles = { names: ['Which name covers what?', 'Choose a name to see it on the map'], cities: ['Nations, capitals and cities', 'Tap a nation for its key facts'], landmarks: ['UK landmarks', 'Tap a pin or a name'], gardens: ['Famous gardens', 'Tap a pin or a name'], sport: ['Where the big sporting events happen', 'Tap a pin or a name'] };
    const t = titles[o.mode] || ['Map', ''];
    return `<figure class="fig"><div class="fig-h"><h3>${t[0]}</h3><span class="muted">${t[1]}</span></div><div data-mount="ukmap" data-o="${data(o)}"></div></figure>`;
  };
  App.VIZ.histmap = function (o) {
    return `<figure class="fig"><div class="fig-h"><h3>${esc(o.title || 'Where it happened')}</h3><span class="muted">Tap a pin or a name</span></div><div data-mount="ukmap" data-o="${data({ mode: 'poi', layer: o.layer })}"></div></figure>`;
  };

  App.MOUNT.ukmap = function (el, o) {
    if (o.mode === 'names') return mountNames(el);
    if (o.mode === 'cities') return mountCities(el);
    return mountPoi(el, o.mode === 'poi' ? o.layer : o.mode);
  };

  function mountNames(el) {
    let mode = 'uk';
    el.innerHTML = `<div class="seg" role="group" aria-label="Show on map" style="margin-bottom:14px">${Object.entries(NAME_MODES).map(([k, m]) => `<button data-m="${k}" aria-pressed="${k === mode}">${m.label}</button>`).join('')}</div>
      <div class="mapfig">${baseSvg({ smallLabels: true })}<div class="map-side"><div class="map-explain" aria-live="polite"></div><p class="small muted" style="margin:0">British overseas territories such as <b>St Helena</b> and the <b>Falkland Islands</b> are far away in other parts of the world. Like the Crown dependencies, they are linked to the UK but are not part of it.</p></div></div>`;
    const svg = $('svg', el);
    function apply() {
      const m = NAME_MODES[mode];
      $$('.land', svg).forEach((p) => { const on = m.set.includes(p.dataset.unit); p.classList.toggle('dim', !on); p.classList.toggle('hl', on && m.set.length < 4); });
      $$('[data-m]', el).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === mode)));
      const box = $('.map-explain', el);
      if (m.nation) { const n = NATIONS[m.nation]; box.innerHTML = `<span class="mh">${esc(n.name)}</span>${m.nation === 'ni' ? 'Part of the UK, but <b>not</b> part of Great Britain.' : 'Part of the UK and of Great Britain.'} Capital: <b>${esc(n.capital)}</b>. Patron saint: ${esc(n.saint)} (${esc(n.saintDay)}).`; }
      else box.innerHTML = `<span class="mh">${m.h}</span>${m.x}`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b) { mode = b.dataset.m; apply(); } });
    apply();
  }

  function mountCities(el) {
    let sel = 'england';
    el.innerHTML = `<div class="mapfig">${baseSvg({ clickNations: true, aria: 'Map of UK cities and capitals' })}<div class="map-side"><div class="seg" role="group" aria-label="Choose a nation">${Object.keys(NATIONS).map((k) => `<button data-n="${k}" aria-pressed="${k === sel}">${esc(NATIONS[k].name)}</button>`).join('')}</div><div class="nc" aria-live="polite"></div><p class="small muted" style="margin:0"><span style="color:var(--flag-red)">■</span> capital city &nbsp; ● city</p></div></div>`;
    const svg = $('svg', el);
    const g = $('.overlay', svg);
    g.innerHTML = CITIES.map((c) => {
      const [x, y] = xy(c.ll);
      const mark = c.capital ? `<rect class="cap" x="${r1(x - 3.4)}" y="${r1(y - 3.4)}" width="6.8" height="6.8" transform="rotate(45 ${r1(x)} ${r1(y)})"/>` : `<circle class="city" cx="${r1(x)}" cy="${r1(y)}" r="2.3"/>`;
      return `<g data-city="${esc(c.n)}">${mark}<text class="lbl" x="${r1(x + c.lab[0])}" y="${r1(y + c.lab[1])}" text-anchor="${c.lab[2]}" ${c.capital ? 'font-weight="700"' : ''}>${esc(c.n === 'Newcastle upon Tyne' ? 'Newcastle' : c.n)}</text></g>`;
    }).join('');
    $$('.labels', svg).forEach((l) => l.remove());
    function apply() {
      $$('.land', svg).forEach((p) => { const k = p.dataset.unit; p.classList.toggle('dim', NATIONS[k] ? false : true); p.classList.toggle('hl', k === sel); });
      $$('[data-n]', el).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.n === sel)));
      $('.nc', el).innerHTML = nationCard(sel);
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-n]'); const p = e.target.closest('.land');
      if (b) sel = b.dataset.n; else if (p && NATIONS[p.dataset.unit]) sel = p.dataset.unit; else return;
      apply();
    });
    apply();
  }

  function mountPoi(el, layer) {
    const items = POI[layer] || [];
    const groups = []; const gi = {};
    items.forEach((it, i) => {
      const key = it.g || `i${i}`;
      if (!(key in gi)) { gi[key] = groups.length; groups.push({ key, ll: it.ll, label: it.g || it.n, members: [] }); }
      groups[gi[key]].members.push(i);
      it._g = gi[key];
    });
    let sel = -1;
    el.innerHTML = `<div class="mapfig">${baseSvg({ aria: 'Map with numbered places' })}<div class="map-side"><ol class="poi-list">${items.map((it, i) => `<li><button data-p="${i}"><span class="n">${it._g + 1}</span><span><b>${esc(it.n)}</b>${it.g ? `<small class="muted">${esc(it.g)}</small>` : ''}<span class="d">${it.img ? App.media(it.img) : ''}${esc(it.d)}</span></span></button></li>`).join('')}</ol></div></div>`;
    const svg = $('svg', el);
    const ov = $('.overlay', svg);
    let extra = '';
    if (layer === 'early') {
      const wall = [[54.99, -1.53], [55.0, -2.0], [55.02, -2.4], [54.99, -2.9], [54.95, -3.21]].map(xy).map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ');
      extra = `<polyline class="wall" points="${wall}"><title>Hadrian’s Wall</title></polyline>`;
    }
    ov.innerHTML = extra + groups.map((g, i) => { const [x, y] = xy(g.ll); return `<g class="pin" data-g="${i}" tabindex="0" role="button" aria-label="${esc(g.label)}"><circle cx="${r1(x)}" cy="${r1(y)}" r="6.2"/><text x="${r1(x)}" y="${r1(y + 2.4)}" text-anchor="middle">${i + 1}</text></g>`; }).join('');
    $$('.land', svg).forEach((p) => { if (!NATIONS[p.dataset.unit]) p.classList.add('dim'); });
    function apply() {
      const g = sel >= 0 ? items[sel]._g : -1;
      $$('.pin', svg).forEach((p) => p.classList.toggle('on', +p.dataset.g === g));
      $$('[data-p]', el).forEach((b) => b.classList.toggle('on', +b.dataset.p === sel));
      const on = $('[data-p].on', el); if (on && sel >= 0) on.scrollIntoView({ block: 'nearest' });
    }
    function pickGroup(gidx) { sel = groups[gidx].members[0]; apply(); }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]'); const p = e.target.closest('.pin');
      if (b) { const i = +b.dataset.p; sel = sel === i ? -1 : i; apply(); }
      else if (p) pickGroup(+p.dataset.g);
    });
    el.addEventListener('keydown', (e) => { const p = e.target.closest('.pin'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pickGroup(+p.dataset.g); } });
    apply();
  }
})();

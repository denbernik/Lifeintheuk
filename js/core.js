/* Core: helpers, progress store, layout, routing, home, chapter and section pages. */
(function () {
  const App = (window.App = window.App || {});
  App.VIZ = App.VIZ || {};
  App.MOUNT = App.MOUNT || {};
  App.TOOLS = App.TOOLS || {};

  // ---------------- helpers ----------------
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/==(.+?)==/g, '<mark>$1</mark>');
  const strip = (s) => String(s || '').replace(/\*\*|==/g, '');
  const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}\u2026` : s);
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  // Monogram from the name in the current language (skipping titles), e.g. "Sir Francis Drake" -> "FD".
  const initials = (n) => (window.t ? window.t(n) : n).replace(/^(Sir|Dame|Dr|Lord|Baroness|King|Queen|Prince|Emperor|Admiral|Captain|St|Король|Королева|Принц|Император|Адмирал|Капитан|Лорд|Баронесса|Св\.)\s+/i, '').split(/\s+/).filter((w) => /^\p{Lu}/u.test(w)).slice(0, 2).map((w) => w[0]).join('');
  const data = (o) => esc(JSON.stringify(o || {}));
  App.util = { esc, fmt, strip, shuffle, $, $$, initials, data };
  App.locale = () => (window.I18N && I18N.lang === 'ru' ? 'ru-RU' : 'en-GB');

  // ---------------- icons ----------------
  const I = (d, extra) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra || ''}>${d}</svg>`;
  App.icons = {
    search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: I('<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>'),
    auto: I('<circle cx="12" cy="12" r="8"/><path d="M12 4v16" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>'),
    timeline: I('<path d="M4 12h16"/><circle cx="7" cy="12" r="2"/><circle cx="13" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6v4M13 14v4M19 6v4"/>'),
    people: I('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c2.8.3 5 2.7 5 5.8"/>'),
    numbers: I('<path d="M5 4v16M19 4v16"/><path d="M9 9h6M9 15h6M11 6l-1 12M15 6l-1 12"/>'),
    sheet: I('<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>'),
    cards: I('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
    practice: I('<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>'),
    mock: I('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>'),
    games: I('<rect x="3" y="7" width="18" height="11" rx="5"/><path d="M8 10v5M5.5 12.5h5"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="17.5" cy="14" r="1"/>'),
    map: I('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
    arrowR: I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    check: I('<path d="m5 12 5 5 9-10"/>')
  };

  // ---------------- book index ----------------
  App.BOOK = (window.BOOK || []).slice().sort((a, b) => a.n - b.n);
  App.SECTIONS = [];
  App.byId = {};
  App.BOOK.forEach((ch) => {
    ch.sections.forEach((sec, i) => {
      const entry = { id: sec.id, sec, ch, idx: i };
      App.SECTIONS.push(entry);
      App.byId[sec.id] = entry;
    });
  });
  App.chColor = (ch) => `var(--${ch.color})`;
  App.secColor = (id) => (App.byId[id] ? App.chColor(App.byId[id].ch) : 'var(--c6)');

  // ---------------- store ----------------
  const KEY = 'liuk-study-v1';
  let state = { studied: {}, checks: {}, quiz: {}, cards: {}, mocks: [], theme: 'system', lang: 'en' };
  try { const raw = localStorage.getItem(KEY); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  App.store = {
    get: () => state,
    save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } },
    set(fn) { fn(state); this.save(); }
  };
  App.studiedCount = () => App.SECTIONS.filter((s) => state.studied[s.id]).length;

  // ---------------- theme ----------------
  function applyTheme() {
    const t = state.theme;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    const btn = $('#theme-btn');
    if (btn) {
      btn.innerHTML = t === 'light' ? App.icons.sun : t === 'dark' ? App.icons.moon : App.icons.auto;
      btn.setAttribute('aria-label', `Theme: ${t}. Change theme`);
      btn.title = `Theme: ${t}`;
    }
  }

  // ---------------- sidebar ----------------
  const TOOL_LINKS = [
    ['timeline', 'Timeline', 'timeline'], ['people', 'Who’s who', 'people'], ['numbers', 'Numbers & ages', 'numbers'],
    ['keyfacts', 'Key facts sheet', 'sheet'], ['flashcards', 'Flashcards', 'cards'], ['tests', 'Test zone', 'games'], ['practice', 'Practice questions', 'practice'], ['mock', 'Mock test', 'mock']
  ];
  App.TOOL_LINKS = TOOL_LINKS;

  function renderSide(route) {
    const lines = App.BOOK.map((ch) => `
      <div class="line" style="--lc:${App.chColor(ch)}">
        <a class="line-head" href="#${ch.id}"><span class="disc">${ch.n}</span><span>${esc(ch.short)}</span></a>
        <ol class="stops">${ch.sections.map((s) => `
          <li class="${state.studied[s.id] ? 'done' : ''} ${route === s.id ? 'cur' : ''}">
            <a href="#${s.id}" ${route === s.id ? 'aria-current="page"' : ''}><span class="stn" aria-hidden="true"></span><span class="stn-label">${esc(s.station)}</span>${state.studied[s.id] ? '<span class="sr">(studied)</span>' : ''}</a>
          </li>`).join('')}
        </ol>
      </div>`).join('');
    $('#side').innerHTML = `
      <h2>The study map</h2>
      ${lines}
      <h2 style="margin-top:22px">Revise &amp; practise</h2>
      <ul class="tools">${TOOL_LINKS.map(([r, label, ic]) => `<li><a href="#${r}" class="${route === r ? 'cur' : ''}">${App.icons[ic]}${label}</a></li>`).join('')}</ul>
      <p class="side-foot">Based on <i>Life in the United Kingdom: A guide for new residents</i>, 3rd edition (Crown copyright). Progress is saved in this browser only.</p>`;
  }

  // ---------------- block renderer ----------------
  App.renderBlocks = function (sec) {
    const out = [];
    sec.blocks.forEach((b, i) => {
      const prev = sec.blocks[i - 1];
      out.push(renderBlock(b, sec, prev));
    });
    return out.join('');
  };

  function renderBlock(b, sec, prev) {
    switch (b.t) {
      case 'lead': return `<p class="lead">${fmt(b.x)}</p>`;
      case 'h': return `<h2 class="block-h">${fmt(b.x)}</h2>`;
      case 'p': return `<p>${fmt(b.x)}</p>`;
      case 'list': return `${b.h ? `<p class="facts-h">${fmt(b.h)}</p>` : ''}<ul class="facts">${b.items.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>`;
      case 'note': return `<div class="note ${b.kind || 'tip'}">${fmt(b.x)}</div>`;
      case 'quote': return `<blockquote class="quote"><p>‘${fmt(b.x)}’</p><footer>${fmt(b.by)}</footer></blockquote>`;
      case 'poem': return `<figure class="fig"><div class="fig-h"><h3>${fmt(b.title)}</h3></div><p class="poem">${b.lines.map(esc).join('\n')}</p><p class="fig-cap">${fmt(b.by)}</p></figure>`;
      case 'chips': return `${b.h ? `<p class="chips-h">${fmt(b.h)}</p>` : ''}<ul class="chips">${b.items.map((x) => `<li class="chip">${fmt(x)}</li>`).join('')}</ul>`;
      case 'tiles': return `<div class="tiles">${b.items.map((t) => `<div class="tile"><span class="k">${esc(t.k)}</span><span class="v">${fmt(t.v)}</span>${t.x ? `<span class="x">${fmt(t.x)}</span>` : ''}</div>`).join('')}</div>`;
      case 'cards': return `<div class="cards" style="--cols:${b.cols || 2}">${b.items.map((c) => `<div class="card"><h3>${fmt(c.h)}</h3>${c.sub ? `<span class="sub">${fmt(c.sub)}</span>` : ''}<p>${fmt(c.x)}</p></div>`).join('')}</div>`;
      case 'compare': return `<div class="compare">${b.items.map((c) => `<div style="--tc:var(--${c.tone || 'c5'})"><h3>${fmt(c.h)}</h3>${c.items ? `<ul>${c.items.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>` : `<p>${fmt(c.text)}</p>`}</div>`).join('')}</div>`;
      case 'table': return `<div class="table-wrap"><table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'steps': return `<ol class="steps">${b.items.map((s) => `<li><b>${fmt(s.h)}</b><span>${fmt(s.x)}</span></li>`).join('')}</ol>`;
      case 'photo': return App.photoHtml(b.src, { side: b.side });
      case 'gallery': return App.galleryHtml(b.items);
      case 'events': return renderEvents(sec);
      case 'people': return renderPeopleBlock(sec, prev);
      case 'viz': {
        const fn = App.VIZ[b.v];
        return fn ? fn(b.o || {}, sec) : `<div class="note tip">Missing figure: ${esc(b.v)}</div>`;
      }
      default: return '';
    }
  }

  function renderEvents(sec) {
    const evs = window.TIMELINE.filter((e) => e.s === sec.id).sort((a, b) => a.y - b.y);
    if (!evs.length) return '';
    return `<h2 class="block-h">Key dates</h2><ul class="events">${evs.map((e) => `<li><span class="d">${esc(e.d)}</span><span class="t">${esc(e.t)}</span>${e.x ? `<span class="x">${esc(e.x)}</span>` : ''}</li>`).join('')}</ul>`;
  }

  App.personCard = function (p, opts) {
    opts = opts || {};
    const link = opts.link && App.byId[p.s] ? `<a class="sec-link" href="#${p.s}">${esc(App.byId[p.s].sec.title)}</a>` : '';
    return `<div class="person ${p.b && !opts.flat ? 'bio' : ''}" style="--accent:${App.secColor(p.s)}">
      ${p.img ? `<img class="pic" src="${App.img(p.img)}" alt="${esc(p.n)}" loading="lazy">` : ''}<span class="nm">${esc(p.n)}</span>${p.y ? `<span class="yr">${esc(p.y)}</span>` : ''}
      <span class="rl">${esc(p.r)}</span>${p.f ? `<span class="ft">${esc(p.f)}</span>` : ''}${link}</div>`;
  };

  function renderPeopleBlock(sec, prev) {
    let ps = window.PEOPLE.filter((p) => p.s === sec.id);
    if (sec.id === 'since-1945') ps = ps.filter((p) => p.c !== 'science');
    if (!ps.length) return '';
    ps = ps.filter((p) => p.b).concat(ps.filter((p) => !p.b));
    const head = prev && prev.t === 'h' ? '' : '<h2 class="block-h">People to know</h2>';
    return `${head}<div class="people">${ps.map((p) => App.personCard(p)).join('')}</div>`;
  }

  // ---------------- views ----------------
  function homeView() {
    const done = App.studiedCount();
    const total = App.SECTIONS.length;
    const best = state.mocks.length ? Math.max(...state.mocks.map((m) => m.score)) : null;
    const next = App.SECTIONS.find((s) => !state.studied[s.id]) || App.SECTIONS[0];
    const qn = window.QUESTIONS.length;
    const net = App.BOOK.map((ch) => `
      <div class="netline" style="--lc:${App.chColor(ch)}">
        <a class="netline-name" href="#${ch.id}"><span class="disc">${ch.n}</span><span><span>${esc(ch.short)}</span><small>${ch.sections.length} stop${ch.sections.length > 1 ? 's' : ''}</small></span></a>
        <div class="track ${ch.sections.length === 1 ? 'solo' : ''} ${ch.sections.length > 7 ? 'many' : ''}">${ch.sections.map((s) => `<a class="tstop ${state.studied[s.id] ? 'done' : ''}" href="#${s.id}"><span class="stn" aria-hidden="true"></span><span>${esc(s.station)}</span></a>`).join('')}</div>
      </div>`).join('');
    const toolDesc = {
      timeline: `${window.TIMELINE.length} dated events, plus a “which came first?” game`,
      people: `${window.PEOPLE.length} people from Boudicca to Mo Farah`,
      numbers: 'Ages, dates and figures that come up in the test',
      keyfacts: 'The handbook’s own summary on one page',
      flashcards: 'Flip through dates, people and questions',
      tests: '10 games: match up, put in order, map quiz and more',
      practice: `${qn} questions, by chapter, with explanations`,
      mock: '24 questions, 45 minutes, 18 to pass'
    };
    return `<div class="page">
      <section class="hero">
        <div>
          <span class="eyebrow">Interactive study guide · handbook, 3rd edition</span>
          <h1>Life in the&nbsp;UK, <em>stop by stop</em></h1>
          <p>Every chapter of the official handbook, rebuilt as a line map you can travel. Read each stop, explore the maps and timelines, then test yourself until the facts stick.</p>
          <div class="hero-cta">
            <a class="btn" href="#${next.id}">${done ? 'Continue' : 'Start'}: ${esc(next.sec.station)} ${App.icons.arrowR}</a>
            <a class="btn ghost" href="#mock">Take a mock test</a>
          </div>
        </div>
        <div class="ticket" aria-label="Your progress">
          <div class="ticket-row"><span class="k">Stops studied</span><span class="v">${done} / ${total}</span></div>
          <div class="meter" aria-hidden="true"><i style="width:${Math.round((done / total) * 100)}%"></i></div>
          <div class="ticket-row"><span class="k">Best mock score</span><span class="v">${best == null ? '—' : `${best} / 24`}</span></div>
          <div class="ticket-row"><span class="k">Pass mark</span><span class="v">18 / 24</span></div>
        </div>
      </section>
      <section>
        <div class="map-title"><h2>The study map</h2><span class="muted small">Filled stations are stops you’ve marked as studied.</span></div>
        <div class="netmap">${net}</div>
      </section>
      <section style="margin-top:36px">
        <div class="map-title"><h2>Revise and practise</h2></div>
        <div class="tool-grid">${TOOL_LINKS.map(([r, label, ic]) => `<a class="tool ${r === 'mock' ? 'feature' : ''}" href="#${r}">${App.icons[ic]}<b>${label}</b><span>${toolDesc[r]}</span></a>`).join('')}</div>
      </section>
      <section style="margin-top:36px">
        <div class="map-title"><h2>How to use this guide</h2></div>
        <div class="howto">
          <div class="card"><h3>1. Read a stop</h3><p>Each stop condenses one part of the handbook into key facts, figures and maps. Nothing is left out that the test can ask.</p></div>
          <div class="card"><h3>2. Check yourself</h3><p>Tick the handbook’s “check that you understand” points and answer the quick questions at the end.</p></div>
          <div class="card"><h3>3. Revise</h3><p>Use flashcards, the timeline game and the numbers page to drill dates, people and figures.</p></div>
          <div class="card"><h3>4. Sit a mock</h3><p>The real test is 24 questions from the whole book. Aim to score 18 or more every time.</p></div>
        </div>
      </section>
    </div>`;
  }

  function chapterView(ch) {
    const color = App.chColor(ch);
    const qn = window.QUESTIONS.filter((q) => ch.sections.some((s) => s.id === q.s)).length;
    const mins = ch.sections.reduce((a, s) => a + (s.mins || 5), 0);
    return `<div class="page">
      <header class="sec-head" style="--accent:${color}">
        <span class="eyebrow">Chapter ${ch.n}</span>
        <h1>${esc(ch.title)}</h1>
        <p class="lead" style="margin:0 0 10px">${esc(ch.blurb)}</p>
        <div class="sec-meta"><span>${ch.sections.length} stop${ch.sections.length > 1 ? 's' : ''}</span><span>about ${mins} min reading</span><span>${qn} practice questions</span></div>
      </header>
      <div class="sec-body" style="--accent:${color}">
        <ol class="flow">${ch.sections.map((s) => `<li><span class="when">${esc(s.era || `Stop ${ch.sections.indexOf(s) + 1}`)}</span><span class="rail"></span><span class="what"><b><a href="#${s.id}">${esc(s.title)}</a></b><span>${state.studied[s.id] ? 'Studied · ' : ''}about ${s.mins || 5} min</span></span></li>`).join('')}</ol>
        <div class="hero-cta"><a class="btn accent" href="#${ch.sections[0].id}">Start chapter ${ch.n} ${App.icons.arrowR}</a><a class="btn ghost" href="#practice" data-practice-ch="${ch.id}">Practise chapter ${ch.n}</a></div>
      </div>
    </div>`;
  }

  function sectionView(entry) {
    const { sec, ch, idx } = entry;
    const color = App.chColor(ch);
    const pos = App.SECTIONS.indexOf(entry);
    const prev = App.SECTIONS[pos - 1];
    const next = App.SECTIONS[pos + 1];
    const studied = !!state.studied[sec.id];
    const checks = state.checks[sec.id] || [];
    const strip = ch.sections.length > 1 ? `<nav class="line-strip" aria-label="Stops in this chapter">${ch.sections.map((s, i) => `<a href="#${s.id}" class="${state.studied[s.id] ? 'done' : ''} ${i === idx ? 'cur' : ''}" title="${esc(s.title)}"><span class="sr">${esc(s.title)}</span></a>`).join('')}</nav>` : '';
    const qcount = window.QUESTIONS.filter((q) => q.s === sec.id).length;
    return `<div class="page">
      <header class="sec-head" style="--accent:${color}">
        <span class="eyebrow"><a href="#${ch.id}">Chapter ${ch.n} · ${esc(ch.title)}</a></span>
        <h1>${esc(sec.title)}</h1>
        <div class="sec-meta">
          ${sec.era ? `<span class="era">${esc(sec.era)}</span>` : ''}
          <span>Stop ${idx + 1} of ${ch.sections.length}</span>
          <span>about ${sec.mins || 5} min</span>
          <button class="btn sm ghost studied-btn" data-act="toggle-studied" data-id="${sec.id}" aria-pressed="${studied}">${studied ? `${App.icons.check} Studied` : 'Mark as studied'}</button>
        </div>
        ${strip}
        ${sec.hero ? App.photoHtml(sec.hero, { hero: true }) : ''}
      </header>
      <article class="sec-body" style="--accent:${color}">${App.renderBlocks(sec)}</article>
      <div class="endcap" style="--accent:${color}">
        <section class="fig">
          <div class="fig-h"><h3>Check that you understand</h3><span class="muted">From the handbook. Tick each one you could explain.</span></div>
          <ul class="checklist">${(sec.check || []).map((c, i) => `<li><label><input type="checkbox" id="chk-${sec.id}-${i}" data-act="check" data-id="${sec.id}" data-i="${i}" ${checks[i] ? 'checked' : ''}> <span>${esc(c)}</span></label></li>`).join('')}</ul>
        </section>
        <section class="fig">
          <div class="fig-h"><h3>Quick check</h3><span class="muted">4 random questions from this stop (${qcount} in the bank)</span></div>
          <div data-mount="quickquiz" data-o="${data({ s: sec.id })}"></div>
        </section>
        <div class="hero-cta">
          <button class="btn ${studied ? 'ghost' : 'accent'}" data-act="toggle-studied" data-id="${sec.id}" aria-pressed="${studied}">${studied ? `${App.icons.check} Studied` : 'Mark this stop as studied'}</button>
        </div>
      </div>
      <nav class="pager">
        ${prev ? `<a href="#${prev.id}"><span class="k">← Previous stop</span><span class="t">${esc(prev.sec.title)}</span></a>` : '<span></span>'}
        ${next ? `<a class="next" href="#${next.id}"><span class="k">Next stop →</span><span class="t">${esc(next.sec.title)}</span></a>` : `<a class="next" href="#mock"><span class="k">Finished the book →</span><span class="t">Take a mock test</span></a>`}
      </nav>
    </div>`;
  }

  // ---------------- router ----------------
  let currentRoute = null;
  App.route = () => currentRoute;

  function render() {
    const route = (location.hash || '#home').slice(1) || 'home';
    const main = $('#main');
    const prevRoute = currentRoute;
    currentRoute = route;
    let html; let title = 'Life in the UK';
    const ch = App.BOOK.find((c) => c.id === route);
    if (App.byId[route]) { html = sectionView(App.byId[route]); title = `${App.byId[route].sec.title} · Life in the UK`; }
    else if (ch) { html = chapterView(ch); title = `Chapter ${ch.n} · Life in the UK`; }
    else if (App.TOOLS[route]) { html = App.TOOLS[route].render(); title = `${App.TOOLS[route].title} · Life in the UK`; }
    else { html = homeView(); currentRoute = 'home'; }
    main.innerHTML = html;
    document.title = t(title);
    renderSide(currentRoute);
    App.mountAll(main);
    if (prevRoute !== null && prevRoute !== currentRoute) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
    document.body.classList.remove('nav-open');
    const scrim = $('.scrim'); if (scrim) scrim.remove();
  }
  App.rerender = render;

  App.mountAll = function (root) {
    $$('[data-mount]', root).forEach((el) => {
      const fn = App.MOUNT[el.dataset.mount];
      if (fn && !el._mounted) { el._mounted = true; let o = {}; try { o = JSON.parse(el.dataset.o || '{}'); } catch (e) { /* ignore */ } fn(el, o); }
    });
  };

  // ---------------- search ----------------
  let index = null;
  function buildIndex() {
    index = [];
    const tr = (s) => I18N.plain(fmt(s));
    // x may be a list of separately translated parts, joined into one snippet.
    const add = (k, title, x, r, hay) => { const xt = Array.isArray(x) ? x.map(tr).join('. ') : tr(x); index.push({ k: tr(k), t: tr(title), x: clip(xt, 120), r, hay: `${hay} ${tr(title)} ${xt}`.toLowerCase() }); };
    App.SECTIONS.forEach(({ sec, ch }) => {
      const text = sec.blocks.map((b) => [b.x, b.h, (b.items || []).map((i) => (typeof i === 'string' ? i : [i.h, i.x, i.v, i.k, i.sub, (i.items || []).join(' '), i.text].join(' '))).join(' '), (b.rows || []).flat().join(' ')].join(' ')).join(' ');
      const tText = I18N.lang === 'en' ? '' : sec.blocks.map((b) => [b.x, ...(b.items || []).filter((i) => typeof i === 'string')].filter(Boolean).map(tr).join(' ')).join(' ');
      add(`Chapter ${ch.n}`, sec.title, (sec.blocks[0] && sec.blocks[0].x) || '', sec.id, `${sec.title} ${strip(text)} ${tText}`);
    });
    window.PEOPLE.forEach((p) => add('Person', p.n, [p.r, p.f], p.s, `${p.n} ${p.r} ${p.f}`));
    window.TIMELINE.forEach((e) => add(e.d, e.t, e.x, e.s, `${e.d} ${e.t} ${e.x}`));
    App.TOOL_LINKS.forEach(([r, label]) => add('Study tool', label, '', r, label));
  }
  function doSearch(q) {
    if (!index) buildIndex();
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const res = index.filter((e) => terms.every((t) => e.hay.includes(t)));
    res.sort((a, b) => {
      const at = terms.every((t) => a.t.toLowerCase().includes(t)) ? 0 : 1;
      const bt = terms.every((t) => b.t.toLowerCase().includes(t)) ? 0 : 1;
      return at - bt;
    });
    return res.slice(0, 12);
  }
  function setupSearch() {
    const input = $('#q');
    const box = $('#search-results');
    let sel = -1; let results = [];
    const close = () => { box.hidden = true; sel = -1; input.setAttribute('aria-expanded', 'false'); };
    const paint = () => {
      box.innerHTML = results.length ? results.map((r, i) => `<a href="#${r.r}" class="${i === sel ? 'on' : ''}" role="option"><span class="k">${esc(r.k)}</span><span class="t">${esc(r.t)}</span>${r.x ? `<span class="x">${esc(r.x)}</span>` : ''}</a>`).join('') : `<div class="empty"><span>No matches for</span> “<span data-noi18n>${esc(input.value)}</span>”. <span>Try a name, a date or a place.</span></div>`;
      box.hidden = false; input.setAttribute('aria-expanded', 'true');
    };
    input.addEventListener('input', () => { if (!input.value.trim()) { close(); return; } results = doSearch(input.value); sel = -1; paint(); });
    input.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'ArrowDown') { sel = Math.min(results.length - 1, sel + 1); paint(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); paint(); e.preventDefault(); }
      else if (e.key === 'Enter') { const r = results[sel < 0 ? 0 : sel]; if (r) { location.hash = r.r; input.value = ''; close(); input.blur(); } }
      else if (e.key === 'Escape') close();
    });
    box.addEventListener('click', (e) => { if (e.target.closest('a')) { input.value = ''; close(); } });
  }

  // ---------------- global events ----------------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]');
    if (t) {
      const act = t.dataset.act;
      if (act === 'toggle-studied') {
        const id = t.dataset.id;
        App.store.set((s) => { s.studied[id] = !s.studied[id]; if (!s.studied[id]) delete s.studied[id]; });
        const y = window.scrollY; render(); window.scrollTo(0, y);
      } else if (act === 'theme') {
        const order = ['system', 'light', 'dark'];
        App.store.set((s) => { s.theme = order[(order.indexOf(s.theme) + 1) % 3]; });
        applyTheme();
      } else if (act === 'lang') {
        App.setLang(t.dataset.lang);
      } else if (act === 'menu') {
        const open = !document.body.classList.contains('nav-open');
        document.body.classList.toggle('nav-open', open);
        t.setAttribute('aria-expanded', String(open));
        if (open) { const s = document.createElement('div'); s.className = 'scrim'; s.dataset.act = 'menu-close'; document.body.appendChild(s); }
        else { const s = $('.scrim'); if (s) s.remove(); }
      } else if (act === 'menu-close') {
        document.body.classList.remove('nav-open'); t.remove(); $('#menu-btn').setAttribute('aria-expanded', 'false');
      } else if (act === 'testme') {
        const box = t.closest('.testable');
        const on = !box.classList.contains('hide');
        box.classList.toggle('hide', on);
        $$('.revealed', box).forEach((x) => x.classList.remove('revealed'));
        t.setAttribute('aria-pressed', String(on));
        t.textContent = on ? 'Show answers' : 'Test me';
      }
    }
    const rev = e.target.closest('.testable.hide [data-reveal]');
    if (rev) rev.classList.toggle('revealed');
    const pc = e.target.closest('[data-practice-ch]');
    if (pc) App.pendingPractice = pc.dataset.practiceCh;
  });
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.act === 'check') {
      App.store.set((s) => { const arr = s.checks[t.dataset.id] || (s.checks[t.dataset.id] = []); arr[+t.dataset.i] = t.checked; });
    }
  });

  // ---------------- boot ----------------
  function buildShell() {
    const lang = I18N.lang;
    $('#app').innerHTML = `
      <header class="top">
        <button class="icon-btn menu-btn" id="menu-btn" data-act="menu" aria-label="Open the study map" aria-expanded="false">${App.icons.menu}</button>
        <a class="brand" href="#home" aria-label="Life in the UK study guide, home">
          <svg class="brand-mark" viewBox="0 0 30 30" aria-hidden="true"><rect x="0" y="12" width="30" height="6" rx="3" fill="var(--flag-red)"/><rect x="12" y="0" width="6" height="30" rx="3" fill="var(--flag-blue)"/><circle cx="15" cy="15" r="6" fill="var(--panel)" stroke="var(--ink)" stroke-width="3"/></svg>
          <span class="brand-name">Life in the UK <em>study line</em></span>
        </a>
        <div class="top-search" role="search">
          ${App.icons.search}
          <label for="q" class="sr">Search the guide</label>
          <input id="q" type="search" placeholder="Search people, dates, places\u2026" autocomplete="off" aria-controls="search-results" aria-expanded="false">
          <div class="search-results" id="search-results" role="listbox" hidden></div>
        </div>
        <div class="lang-switch" role="group" aria-label="Language" data-noi18n>
          <button data-act="lang" data-lang="en" aria-pressed="${lang === 'en'}" lang="en" title="English">EN</button><button data-act="lang" data-lang="ru" aria-pressed="${lang === 'ru'}" lang="ru" title="\u0420\u0443\u0441\u0441\u043a\u0438\u0439">RU</button>
        </div>
        <button class="icon-btn" id="theme-btn" data-act="theme" aria-label="Change theme"></button>
      </header>
      <div class="shell">
        <nav class="side" id="side" aria-label="Chapters and study tools"></nav>
        <main class="main" id="main" tabindex="-1"></main>
      </div>`;
    applyTheme();
    setupSearch();
    currentRoute = null;
    render();
  }
  App.setLang = function (lang) {
    if (lang === I18N.lang) return;
    App.store.set((s) => { s.lang = lang; });
    I18N.setLang(lang);
    index = null;
    const y = window.scrollY;
    I18N.observe(document.body);
    buildShell();
    window.scrollTo(0, y);
  };

  function boot() {
    I18N.setLang(state.lang === 'ru' ? 'ru' : 'en');
    I18N.observe(document.body);
    window.addEventListener('hashchange', render);
    document.addEventListener('click', (e) => { if (!e.target.closest('.top-search')) { const b = $('#search-results'); if (b) b.hidden = true; } });
    document.addEventListener('keydown', (e) => { if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { e.preventDefault(); const q = $('#q'); if (q) q.focus(); } });
    buildShell();
  }
  App.boot = boot;
})();

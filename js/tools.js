/* Study tools: timeline, people, numbers, key facts, flashcards, practice, mock test. */
(function () {
  const App = window.App;
  const { esc, fmt, data, shuffle, $, $$ } = App.util;
  const T = App.TOOLS;
  const head = (eyebrow, title, lead, color) => `<header class="sec-head" style="--accent:${color || 'var(--c6)'}"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${lead ? `<p class="lead" style="margin:0">${lead}</p>` : ''}</header>`;

  // ================= TIMELINE =================
  const ERAS = [
    ['Early Britain', -100000, 1065, 'early-britain'], ['The Middle Ages', 1066, 1484, 'middle-ages'], ['Tudors and Stuarts', 1485, 1688.99, 'tudors-stuarts'],
    ['A global power', 1689, 1836, 'global-power'], ['The Victorian Age', 1837, 1900.99, 'victorian'], ['The 20th century to 1945', 1901, 1945.99, 'twentieth-century'], ['Britain since 1945', 1946, 3000, 'since-1945']
  ];
  const ERA_COL = ['var(--c2)', 'var(--c4)', 'var(--c5)', 'var(--c1)', 'var(--c3)', 'var(--ink-2)', 'var(--c6)'];
  const TAGS = { monarchy: 'Monarchy', war: 'Wars & battles', law: 'Law & rights', politics: 'Politics & voting', religion: 'Religion', science: 'Science & invention', empire: 'Empire', ireland: 'Ireland', scotland: 'Scotland', wales: 'Wales', society: 'Society', culture: 'Culture', migration: 'Migration', sport: 'Sport' };
  const HOUSE_COL = { Norman: 'var(--c2)', Plantagenet: 'var(--c4)', Lancaster: 'var(--c3)', York: 'var(--muted-line)', Tudor: 'var(--c3)', Stuart: 'var(--c5)', Commonwealth: 'var(--ink-3)', Hanover: 'var(--c1)', Windsor: 'var(--c6)' };

  T.timeline = {
    title: 'Timeline',
    render: () => `<div class="page">${head('Revise', 'The timeline', `Every dated event in the handbook, ${window.TIMELINE.length} in all, from the Stone Age to the 2024 election. The handbook says to learn all the dates in the history chapter.`)}
      <section class="game"><div class="fig-h"><h3>Which came first?</h3><span class="muted">Pick the earlier event</span></div><div data-mount="whichfirst"></div></section>
      <figure class="fig"><div class="fig-h"><h3>Monarchs and rulers named in the handbook</h3><span class="muted">Scroll the line</span></div>
        <div class="ribbon">${window.RULERS.map((r) => `<div style="--rc:${HOUSE_COL[r.house] || 'var(--ink-3)'}"><span class="h">${esc(r.house)}${r.from ? ` · ${r.from}` : ''}</span><b>${esc(r.n)}</b><small>${esc(r.note)}</small></div>`).join('')}</div></figure>
      <div data-mount="timeline"></div></div>`
  };
  App.MOUNT.timeline = function (el) {
    let tag = 'all';
    function paint() {
      const evs = window.TIMELINE.filter((e) => tag === 'all' || e.tags.includes(tag)).sort((a, b) => a.y - b.y);
      const groups = ERAS.map(([n, a, b, s], i) => ({ n, s, i, evs: evs.filter((e) => e.y >= a && e.y <= b) })).filter((g) => g.evs.length);
      el.innerHTML = `<div class="tl-controls"><div class="chips" role="group" aria-label="Filter by theme" style="margin:0"><button class="chip" data-tag="all" aria-pressed="${tag === 'all'}">All (${window.TIMELINE.length})</button>${Object.entries(TAGS).map(([k, v]) => `<button class="chip" data-tag="${k}" aria-pressed="${tag === k}">${v}</button>`).join('')}</div></div>
        ${groups.map((g) => `<div class="tl-era" style="--accent:${ERA_COL[g.i]}"><h2>${g.n}</h2><a href="#${g.s}">Read this stop →</a></div><ul class="tl">${g.evs.map((e) => `<li class="ev" style="--ec:${ERA_COL[g.i]}"><span class="when">${esc(e.d)}</span><span class="rail"></span><span class="what"><b>${esc(e.t)}</b>${e.x ? `<span>${esc(e.x)}</span>` : ''}<span class="tags">${e.tags.map((t) => `<i>${TAGS[t]}</i>`).join('')}${App.byId[e.s] && e.s !== g.s ? `<a class="small" href="#${e.s}" style="color:var(--ink-3)">${esc(App.byId[e.s].sec.station)} →</a>` : ''}</span></span></li>`).join('')}</ul>`).join('')}`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-tag]'); if (b) { tag = b.dataset.tag; paint(); } });
    paint();
  };
  App.MOUNT.whichfirst = function (el) {
    const pool = window.TIMELINE.filter((e) => !e.approx);
    let streak = 0; let best = 0; let pair; let answered = null;
    function next() {
      let a; let b;
      do { [a, b] = shuffle(pool).slice(0, 2); } while (Math.floor(a.y) === Math.floor(b.y));
      pair = [a, b]; answered = null; paint();
    }
    function paint() {
      const early = pair[0].y < pair[1].y ? 0 : 1;
      el.innerHTML = `<div class="game-pair">${pair.map((e, i) => `<button class="game-opt ${answered !== null ? (i === early ? 'right' : (i === answered ? 'wrong' : '')) : ''}" data-w="${i}" ${answered !== null ? 'disabled' : ''}><b>${esc(e.t)}</b>${answered !== null ? `<span class="yr">${esc(e.d)}</span>` : ''}</button>${i === 0 ? '<span class="vs">or</span>' : ''}`).join('')}</div>
        <div class="q-actions" style="justify-content:space-between;align-items:center"><span class="muted small">Streak <b class="mono">${streak}</b> · best <b class="mono">${best}</b></span>${answered !== null ? '<button class="btn sm" data-w="next">Next pair →</button>' : ''}</div>`;
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-w]'); if (!b) return;
      if (b.dataset.w === 'next') { next(); return; }
      if (answered !== null) return;
      answered = +b.dataset.w;
      const early = pair[0].y < pair[1].y ? 0 : 1;
      if (answered === early) { streak += 1; best = Math.max(best, streak); } else streak = 0;
      paint();
    });
    next();
  };

  // ================= PEOPLE =================
  T.people = {
    title: 'Who’s who',
    render: () => `<div class="page">${head('Revise', 'Who’s who', `All ${window.PEOPLE.length} people and groups named in the handbook. The test often asks who did what, so filter by type or search by name, work or place.`)}<div data-mount="people"></div></div>`
  };
  App.MOUNT.people = function (el) {
    let cat = 'all'; let q = '';
    el.innerHTML = `<div class="tl-controls"><div class="top-search" style="max-width:420px;margin:0"><label for="pq" class="sr">Filter people</label>${App.icons.search}<input id="pq" type="search" placeholder="Filter by name, work or place…" autocomplete="off"></div>
      <div class="chips" role="group" aria-label="Filter by type" style="margin:0"><button class="chip" data-c="all" aria-pressed="true">Everyone</button>${Object.entries(window.PEOPLE_CATS).map(([k, v]) => `<button class="chip" data-c="${k}" aria-pressed="false">${v}</button>`).join('')}</div></div><div class="out"></div>`;
    const out = $('.out', el);
    function paint() {
      const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      const list = window.PEOPLE.filter((p) => (cat === 'all' || p.c === cat) && terms.every((t) => `${p.n} ${p.r} ${p.f} ${p.y || ''}`.toLowerCase().includes(t)));
      out.innerHTML = list.length ? `<p class="muted small">${list.length} shown</p><div class="people">${list.map((p) => App.personCard(p, { link: true, flat: true })).join('')}</div>` : '<p class="muted">No one matches that filter.</p>';
      $$('[data-c]', el).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.c === cat)));
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-c]'); if (b) { cat = b.dataset.c; paint(); } });
    $('#pq', el).addEventListener('input', (e) => { q = e.target.value; paint(); });
    paint();
  };

  // ================= NUMBERS =================
  const AGES = [
    [10, ['Youth Court for accused aged 10 to 17 (England, Wales, NI)']],
    [16, ['Ride a moped', 'National Insurance number sent just before your 16th birthday', 'Drink wine or beer with a meal in a hotel or restaurant, with someone over 18', 'National Citizen Service (16–17)']],
    [17, ['Drive a car or motor cycle']],
    [18, ['Vote (voting age since 1969)', 'Buy alcohol, buy tobacco', 'Enter betting shops; play the National Lottery (from April 2021)', 'Stand for election as an MP or other public office', 'Jury service (18–70); school governor']],
    [21, ['Voting age for men and women from 1928 to 1969', 'Before 1832, only men over 21 owning property could vote']],
    [30, ['Women over 30 got the vote in 1918']],
    [70, ['Driving licence renewed every 3 years after 70', 'Upper age for jury service']],
    [75, ['Free TV licence (on application)']],
    [85, ['A record number of people are now 85 or over']]
  ];
  const NUMS = [
    ['The test', 'var(--c1)', [['24', 'questions in the test'], ['~60', 'registered test centres'], ['18 / 24', 'to pass (75%) – not in the handbook'], ['45 min', 'time limit – not in the handbook']]],
    ['The UK', 'var(--c4)', [['4', 'countries: England, Scotland, Wales, NI'], ['870 mi', 'John O’Groats to Land’s End (~1,400 km)'], ['67.6m', 'estimated population, 2022'], ['84%', 'of people live in England'], ['~10%', 'have a parent or grandparent born abroad'], ['15', 'national parks in England, Wales and Scotland'], ['61,000+', 'National Trust volunteers (founded 1895 by 3)'], ['100p', 'in £1']]],
    ['Parliament and government', 'var(--c5)', [['5 yrs', 'maximum between General Elections'], ['~20', 'cabinet ministers'], ['129', 'MSPs (Scottish Parliament)'], ['60', 'AMs (Welsh Assembly), elected every 4 years'], ['90', 'MLAs (Northern Ireland Assembly)'], ['20', 'areas where Wales can make laws'], ['33', 'local authorities in London'], ['7am–10pm', 'polling station hours']]],
    ['Law and courts', 'var(--c3)', [['12', 'jurors in England, Wales and NI'], ['15', 'jurors in Scotland'], ['£10,000', 'small claims limit, England & Wales'], ['£5,000', 'small claims limit, Scotland & NI'], ['3', 'verdicts in Scotland (incl. ‘not proven’)'], ['2 yrs', 'jail for breaching a Forced Marriage Protection Order'], ['£1,000', 'maximum fine for no TV licence'], ['0808 2000 247', 'National Domestic Violence Freephone Helpline']]],
    ['The UK and the world', 'var(--c6)', [['56', 'Commonwealth members on the list (text says 54)'], ['27', 'EU member states'], ['47', 'Council of Europe members'], ['190+', 'UN members'], ['15', 'UN Security Council members'], ['5', 'permanent Security Council members (incl. UK)'], ['50', 'nations in the ISAF coalition'], ['6', 'founders of the EEC in 1957']]],
    ['Numbers from history', 'var(--c2)', [['400', 'years of Roman rule'], ['116', 'years the Hundred Years War lasted'], ['1/3', 'of England’s people died in the Black Death'], ['6', 'wives of Henry VIII'], ['11', 'years Charles I ruled without Parliament; 11 years of republic'], ['~64', 'years of Victoria’s reign'], ['400m+', 'people in the Empire'], ['13m', 'Britons emigrated 1853–1913'], ['1m / 1.5m', 'died / emigrated in the Irish famine'], ['2m', 'Indian and Chinese workers after 1833'], ['60,000', 'British casualties on the Somme’s first day'], ['300,000+', 'men rescued from Dunkirk'], ['3,000', 'deaths in the Troubles after 1969'], ['28,000', 'Ugandan Asians admitted in the early 1970s']]]
  ];
  T.numbers = {
    title: 'Numbers & ages',
    render: () => `<div class="page">${head('Revise', 'Numbers and ages', 'The ages, figures and limits that come up in the test, gathered from every chapter.')}
      <figure class="fig" style="--accent:var(--c6)"><div class="fig-h"><h3>Ages that matter</h3><span class="muted">Tap an age on the line</span></div><div data-mount="ages"></div></figure>
      <div class="num-groups">${NUMS.map(([h, c, items]) => `<section style="--accent:${c}"><h2 class="block-h" style="margin-top:6px">${h}</h2><div class="num-grid">${items.map(([n, t]) => `<div class="num-card"><span class="n">${esc(n)}</span><span class="t">${esc(t)}</span></div>`).join('')}</div></section>`).join('')}</div></div>`
  };
  App.MOUNT.ages = function (el) {
    let sel = 18;
    function paint() {
      el.innerHTML = `<div class="ages"><div class="ages-track">${AGES.map(([a], i) => `<button class="age-mark ${a === sel ? 'on' : ''}" style="left:${4 + (i / (AGES.length - 1)) * 92}%" data-a="${a}" aria-label="Age ${a}">${a}</button>`).join('')}</div>
        <div class="age-list">${AGES.map(([a, xs]) => `<div class="age-item ${a === sel ? 'on' : ''}" data-a="${a}"><span class="a">${a}</span><ul>${xs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div></div>`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-a]'); if (b) { sel = +b.dataset.a; paint(); const it = $(`.age-item[data-a="${sel}"]`, el); if (it) it.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } });
    paint();
  };

  // ================= KEY FACTS =================
  const SHEET = [
    ['Key acts and charters', 'var(--c5)', ['**Magna Carta (1215)**: limited the king’s power and established that the king is subject to the law', '**Statute of Rhuddlan (1284)**: Edward I annexed Wales to the Crown of England', '**Act for the Government of Wales** (reign of Henry VIII): formally united England and Wales', '**Habeas Corpus Act (1679)**: no unlawful imprisonment', '**Bill of Rights (1689)**: rights of Parliament, limits of the king’s power; monarch must be Protestant', '**Act of Union (1707)**: Kingdom of Great Britain (Treaty of Union in Scotland)', '**Act of Union (1800)**: Ireland joins in 1801; new Union Flag', '**Slave trade abolished (1807)**; **Emancipation Act (1833)** abolished slavery in the Empire', '**Reform Act (1832)**: abolished pocket and rotten boroughs; more voters', '**Women’s suffrage**: 1918 (over 30), 1928 (over 21, equal with men)', '**Education Act 1944** (Butler Act): free secondary education', '**Human Rights Act 1998**: brought the ECHR into UK law']],
    ['Eras', 'var(--c2)', ['**Romans**: AD 43–410 (about 400 years). Hadrian’s Wall kept out the Picts', '**Middle Ages**: 1066–1485, almost constant war incl. the Crusades and the Hundred Years War', '**Elizabethan period** (late 1500s): patriotism, exploration, poetry and drama', '**The Enlightenment** (18th century): Adam Smith, David Hume, James Watt', '**Industrial Revolution** (18th–19th centuries): over half the world’s cotton cloth, coal and iron', '**Victorian Age** (1837–1901): the largest empire in world history']],
    ['Battles and wars', 'var(--c3)', ['**1066** Hastings: William of Normandy defeats Harold (Bayeux Tapestry)', '**1314** Bannockburn: Robert the Bruce defeats the English', '**1415** Agincourt: Henry V beats the French', '**1455–1485** Wars of the Roses: Lancaster (red) v York (white); ends at Bosworth Field', '**1588** Spanish Armada defeated', '**1642–1646** Civil war: Roundheads (Parliament) v Cavaliers (king); Marston Moor and Naseby', '**1690** Battle of the Boyne', '**1746** Culloden: Bonnie Prince Charlie defeated', '**1776** American independence declared', '**1805** Trafalgar: Nelson; **1815** Waterloo: Wellington defeats Napoleon', '**1853–1856** Crimean War; **1899–1902** Boer War', '**1914–1918** First World War; **1916** Somme', '**1939–1945** Second World War: Dunkirk and Battle of Britain (1940), D-Day (6 June 1944)', '**1982** Falklands']],
    ['Key events', 'var(--c1)', ['**1348** Black Death: one third of England dies', '**By 1400** English the language of court and Parliament', '**1530s** Church of England founded by Henry VIII', '**1603** James VI of Scotland becomes James I', '**1649** Charles I executed; republic. **1660** Restoration', '**1665** Great Plague; **1666** Great Fire of London', '**1688** Glorious Revolution: William of Orange', '**1721** Walpole, first Prime Minister', '**1922** Ireland divided; **1928** equal votes at 21', '**1948** NHS founded; **1973** UK joins the EEC', '**1998** Good Friday Agreement; **1999** Scottish Parliament and Welsh Assembly', '**31 January 2020** UK leaves the EU', '**2022** Charles III becomes king; **2024** Labour wins under Keir Starmer']],
    ['People', 'var(--c4)', ['**Alfred the Great**: united the Anglo-Saxon kingdoms, defeated the Vikings', '**Henry VIII**: six wives; broke from Rome; Wales united with England', '**Elizabeth I**: Protestant; Armada; balanced religious views', '**Oliver Cromwell**: Lord Protector of the republic', '**Sir Francis Drake**: Armada; sailed around the world in the Golden Hind', '**Isaac Newton**: gravity; white light is the colours of the rainbow', '**Sir Robert Walpole**: first PM (1721–1742)', '**Robert Burns**: Scottish poet, Auld Lang Syne', '**Richard Arkwright**: efficient factories', '**Sake Dean Mahomet**: first curry house (1810); shampooing', '**George and Robert Stephenson**: railway engines', '**Isambard Kingdom Brunel**: Great Western Railway, bridges, tunnels, ships', '**Florence Nightingale**: founder of modern nursing', '**Emmeline Pankhurst**: suffragette leader', '**Rudyard Kipling**: The Jungle Book; If', '**Winston Churchill**: WWII leader; greatest Briton (2002)', '**Alexander Fleming**: penicillin (1928)', '**Clement Attlee**: PM 1945–51; NHS and welfare state', '**Margaret Thatcher**: first woman PM; longest-serving PM of the 20th century', '**Mary Peters**: Olympic gold 1972; promoted sport in NI', '**Roald Dahl**: Welsh-born author', '**Dylan Thomas**: Welsh poet, Under Milk Wood', '**Sir Arthur Conan Doyle**: Scottish author of Sherlock Holmes']]
  ];
  T.keyfacts = {
    title: 'Key facts sheet',
    render: () => `<div class="page">${head('Revise', 'Key facts on one page', 'Based on the handbook’s own summary of key material and facts, checked against the main text. Use it for a last read before the test.')}
      <div class="cheat">${SHEET.map(([h, c, items]) => `<section style="--accent:${c}"><h2>${h}</h2><ul>${items.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul></section>`).join('')}</div>
      <div class="note tip">The handbook’s summary page says the Act for the Government of Wales was under Henry VII. The main text says it was during the reign of <b>Henry VIII</b>, which is correct.</div></div>`
  };

  // ================= FLASHCARDS =================
  function buildCards(kind) {
    const secCh = (s) => (App.byId[s] ? App.byId[s].ch.id : 'x');
    if (kind === 'dates') return window.TIMELINE.filter((e) => !e.approx).map((e, i) => ({ id: `d${i}-${e.t}`, ch: secCh(e.s), s: e.s, kind: 'When did this happen?', front: e.t, back: e.d, more: e.x }));
    if (kind === 'people') return window.PEOPLE.filter((p) => p.f).map((p) => ({ id: `p-${p.n}`, ch: secCh(p.s), s: p.s, kind: 'Who was this?', front: p.n, back: p.r, more: p.f }));
    return window.QUESTIONS.map((q, i) => {
      const a = (Array.isArray(q.a) ? q.a : [q.a]).map((j) => q.o[j]).join(' and ');
      return { id: `q${i}`, ch: secCh(q.s), s: q.s, kind: 'Question', front: q.q, back: a, more: q.x };
    });
  }
  T.flashcards = {
    title: 'Flashcards',
    render: () => `<div class="page">${head('Revise', 'Flashcards', 'Flip a card, say the answer out loud, then mark whether you knew it. Cards you know leave the pile.')}<div data-mount="flashcards"></div></div>`
  };
  App.MOUNT.flashcards = function (el) {
    const st = App.store.get();
    let kind = 'dates'; let ch = 'all'; let pile = []; let flipped = false; let seen = 0;
    function load() {
      const all = buildCards(kind).filter((c) => ch === 'all' || c.ch === ch);
      pile = shuffle(all.filter((c) => !st.cards[c.id]));
      flipped = false; seen = 0;
      paint(all.length);
    }
    let total = 0;
    function paint(t) {
      if (t != null) total = t;
      const known = total - pile.length;
      const c = pile[0];
      const color = c ? App.secColor(c.s) : 'var(--c6)';
      el.innerHTML = `<div class="setup" style="margin-bottom:18px">
        <div class="seg" role="group" aria-label="Card type">${[['dates', 'Dates'], ['people', 'People'], ['questions', 'Questions']].map(([k, v]) => `<button data-k="${k}" aria-pressed="${k === kind}">${v}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Chapter" style="margin:0"><button class="chip" data-ch="all" aria-pressed="${ch === 'all'}">All chapters</button>${App.BOOK.map((b) => `<button class="chip" data-ch="${b.id}" aria-pressed="${ch === b.id}"><span class="dot" style="--dc:${App.chColor(b)}"></span>${b.n}. ${esc(b.short)}</button>`).join('')}</div></div>
        ${c ? `<div class="fc-stage" style="--accent:${color}"><button class="fc ${flipped ? 'flipped' : ''}" data-f="flip" aria-label="${flipped ? 'Answer shown. Tap to see the front' : 'Tap to show the answer'}">
            <div class="fc-face"><span class="kind">${esc(c.kind)}</span><span class="big">${esc(c.front)}</span><span class="sm">Tap or press space to flip</span></div>
            <div class="fc-face back"><span class="kind">${esc(c.kind === 'When did this happen?' ? c.front : 'Answer')}</span><span class="big">${esc(c.back)}</span>${c.more ? `<span class="sm">${esc(c.more)}</span>` : ''}${App.byId[c.s] ? `<span class="sm" style="font-size:.8rem">From: ${esc(App.byId[c.s].sec.title)}</span>` : ''}</div>
          </button></div>
          <div class="fc-bar"><div class="fc-stats"><span>In pile <b>${pile.length}</b></span><span>Known <b>${known}</b> / ${total}</span><span>Seen this session <b>${seen}</b></span></div>
            <div class="q-actions" style="margin:0"><button class="btn ghost" data-f="again" ${flipped ? '' : 'disabled'}>Study again</button><button class="btn" data-f="got" ${flipped ? '' : 'disabled'}>${App.icons.check} I knew it</button></div></div>
          <p class="fig-cap">Keys: <span class="kbd">space</span> flip · <span class="kbd">→</span> I knew it · <span class="kbd">←</span> study again</p>`
        : `<div class="q-card result pass"><div class="verdict">You know every card in this deck.</div><p class="muted">${total} cards marked as known.</p><button class="btn" data-f="reset">Reset this deck</button></div>`}
        ${c && known ? `<p class="fig-cap"><button class="btn sm ghost" data-f="reset">Reset known cards in this deck</button></p>` : ''}`;
    }
    function act(a) {
      const c = pile[0];
      if (a === 'flip' && c) { flipped = !flipped; paint(); }
      else if (a === 'got' && c && flipped) { App.store.set((s) => { s.cards[c.id] = 1; }); pile.shift(); flipped = false; seen += 1; paint(); }
      else if (a === 'again' && c && flipped) { pile.push(pile.shift()); flipped = false; seen += 1; paint(); }
      else if (a === 'reset') { const ids = buildCards(kind).filter((x) => ch === 'all' || x.ch === ch).map((x) => x.id); App.store.set((s) => ids.forEach((id) => delete s.cards[id])); load(); }
    }
    el.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]'); const c = e.target.closest('[data-ch]'); const f = e.target.closest('[data-f]');
      if (k) { kind = k.dataset.k; load(); } else if (c) { ch = c.dataset.ch; load(); } else if (f) act(f.dataset.f);
    });
    const onKey = (e) => {
      if (!document.body.contains(el)) { document.removeEventListener('keydown', onKey); return; }
      if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
      if (e.key === ' ') { e.preventDefault(); act('flip'); } else if (e.key === 'ArrowRight') act('got'); else if (e.key === 'ArrowLeft') act('again');
    };
    document.addEventListener('keydown', onKey);
    load();
  };

  // ================= PRACTICE =================
  T.practice = {
    title: 'Practice questions',
    render: () => `<div class="page">${head('Practise', 'Practice questions', `${window.QUESTIONS.length} questions written from the handbook, with instant feedback and an explanation for every answer.`)}<div data-mount="practice"></div></div>`
  };
  App.MOUNT.practice = function (el) {
    const st = App.store.get();
    let chs = new Set(App.pendingPractice ? [App.pendingPractice] : App.BOOK.map((b) => b.id));
    let sec = App.pendingPracticeSec || null;
    let count = 20;
    App.pendingPractice = null; App.pendingPracticeSec = null;
    function pool() { return window.QUESTIONS.filter((q) => (sec ? q.s === sec : chs.has(App.byId[q.s].ch.id))); }
    function stats() {
      return App.BOOK.map((b) => {
        let seen = 0; let right = 0;
        b.sections.forEach((s) => { const r = st.quiz[s.id]; if (r) { seen += r.seen; right += r.right; } });
        const pct = seen ? Math.round((right / seen) * 100) : 0;
        return `<div class="bar-row"><span>${b.n}. ${esc(b.short)}</span><span class="track-b"><i style="width:${pct}%;--bc:${App.chColor(b)}"></i></span><span class="v">${seen ? `${pct}%` : '—'}</span></div>`;
      }).join('');
    }
    function setup() {
      const n = pool().length;
      el.innerHTML = `<div class="q-card setup">
        ${sec ? `<div><p class="chips-h">Practising one stop</p><div class="chips" style="margin:0"><span class="chip"><span class="dot" style="--dc:${App.secColor(sec)}"></span>${esc(App.byId[sec].sec.title)}</span><button class="chip" data-p="clear">Choose chapters instead</button></div></div>`
        : `<fieldset><legend>Chapters</legend><div class="chips" style="margin:0">${App.BOOK.map((b) => `<button class="chip" data-ch="${b.id}" aria-pressed="${chs.has(b.id)}"><span class="dot" style="--dc:${App.chColor(b)}"></span>${b.n}. ${esc(b.short)}</button>`).join('')}</div></fieldset>`}
        <fieldset><legend>How many questions?</legend><div class="seg">${[10, 20, 40, 0].map((c) => `<button data-n="${c}" aria-pressed="${c === count}">${c || `All ${n}`}</button>`).join('')}</div></fieldset>
        <div class="q-actions" style="justify-content:flex-start"><button class="btn" data-p="start" ${n ? '' : 'disabled'}>Start ${Math.min(count || n, n)} questions ${App.icons.arrowR}</button></div>
      </div>
      <figure class="fig" style="margin-top:18px"><div class="fig-h"><h3>Your accuracy by chapter</h3><span class="muted">From practice and quick checks in this browser</span></div><div class="bars">${stats()}</div></figure>`;
    }
    function start() {
      const qs = shuffle(pool()).slice(0, count || undefined);
      el.innerHTML = '<div class="runner"></div>';
      App.Quiz.instant($('.runner', el), qs, { showSection: true, again: () => shuffle(pool()).slice(0, count || undefined), againLabel: 'New set of questions', extra: '<button class="btn sm" data-p="setup">Change settings</button>' });
    }
    el.addEventListener('click', (e) => {
      const c = e.target.closest('[data-ch]'); const n = e.target.closest('[data-n]'); const p = e.target.closest('[data-p]');
      if (c) { const id = c.dataset.ch; if (chs.has(id) && chs.size > 1) chs.delete(id); else chs.add(id); setup(); }
      else if (n) { count = +n.dataset.n; setup(); }
      else if (p) { if (p.dataset.p === 'start') start(); else if (p.dataset.p === 'setup') setup(); else if (p.dataset.p === 'clear') { sec = null; setup(); } }
    });
    setup();
  };

  // ================= MOCK TEST =================
  T.mock = {
    title: 'Mock test',
    render: () => `<div class="page">${head('Practise', 'Mock test', 'Like the real thing: 24 questions drawn from the whole handbook and 45 minutes on the clock. You need 18 correct to pass.', 'var(--flag-red)')}<div data-mount="mock"></div></div>`
  };
  function drawMock() {
    const per = {}; const out = [];
    for (const q of shuffle(window.QUESTIONS)) {
      if ((per[q.s] || 0) >= 2) continue;
      per[q.s] = (per[q.s] || 0) + 1; out.push(q);
      if (out.length === 24) break;
    }
    return out;
  }
  App.MOUNT.mock = function (el) {
    const st = App.store.get();
    const mm = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
    function intro() {
      const hist = st.mocks.slice().reverse().slice(0, 8);
      el.innerHTML = `<div class="q-card"><div class="tiles" style="margin-bottom:16px;--accent:var(--flag-red)">
          <div class="tile"><span class="k">24</span><span class="v">questions</span><span class="x">From every chapter, at most 2 per stop</span></div>
          <div class="tile"><span class="k">45</span><span class="v">minutes</span><span class="x">The test finishes when time runs out</span></div>
          <div class="tile"><span class="k">18</span><span class="v">to pass</span><span class="x">75%. Some questions need TWO answers</span></div></div>
        <ul class="facts" style="--accent:var(--flag-red)"><li>You can move between questions and flag ones to come back to.</li><li>Results show every answer with an explanation and a link to the right stop.</li></ul>
        <button class="btn" data-m="start" style="background:var(--flag-red);border-color:var(--flag-red)">Start the mock test ${App.icons.arrowR}</button></div>
        ${hist.length ? `<figure class="fig" style="margin-top:18px"><div class="fig-h"><h3>Your recent attempts</h3><span class="muted">Saved in this browser</span></div><ul class="history-list">${hist.map((m) => `<li><span>${new Date(m.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ${new Date(m.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span><span class="mono"><b style="color:${m.score >= 18 ? 'var(--ok)' : 'var(--bad)'}">${m.score}/24</b> · ${mm(m.secs)}</span></li>`).join('')}</ul></figure>` : ''}`;
    }
    function run() {
      el.innerHTML = '<div class="runner"></div>';
      App.Quiz.exam($('.runner', el), drawMock(), { seconds: 45 * 60, onFinish: results });
      el.scrollIntoView({ block: 'start' });
    }
    function results(items, score, secs) {
      const pass = score >= 18;
      const weak = {};
      items.forEach((it) => { if (!App.Quiz.isRight(it)) weak[it.src.s] = (weak[it.src.s] || 0) + 1; });
      el.innerHTML = `<div class="q-card result ${pass ? 'pass' : 'fail'}"><div class="score">${score}<span class="muted" style="font-size:.4em"> / 24</span></div><div class="verdict">${pass ? 'Pass' : 'Not a pass yet'}</div><p class="muted">${pass ? 'You scored 18 or more.' : `You needed ${18 - score} more correct answer${18 - score === 1 ? '' : 's'}.`} Time taken: ${mm(secs)}.</p>
          <div class="q-actions" style="justify-content:center"><button class="btn" data-m="start">Take another mock</button><a class="btn ghost" href="#practice">Practise by chapter</a></div></div>
        ${Object.keys(weak).length ? `<figure class="fig" style="margin-top:16px"><div class="fig-h"><h3>Stops to revise</h3></div><ul class="chips" style="margin:0">${Object.entries(weak).sort((a, b) => b[1] - a[1]).map(([s, n]) => `<li><a class="chip" href="#${s}" style="text-decoration:none"><span class="dot" style="--dc:${App.secColor(s)}"></span>${esc(App.byId[s].sec.title)} · ${n}</a></li>`).join('')}</ul></figure>` : ''}
        <h2 class="block-h">Your answers</h2>
        <div class="review">${items.map((it, i) => { const ok = App.Quiz.isRight(it); const correct = it.opts.filter((o) => o.ok).map((o) => o.t).join(' and '); const yours = it.picked.length ? it.picked.map((p) => it.opts[p].t).join(' and ') : 'No answer'; return `<div class="review-item ${ok ? '' : 'bad'}"><div class="q">${i + 1}. ${esc(it.src.q)}</div><div class="a">${ok ? `<span class="yes">✓</span> ${esc(correct)}` : `<span class="no-mark">✗</span> You said: ${esc(yours)}. Correct: <b>${esc(correct)}</b>`}. ${esc(it.src.x)} ${App.Quiz.sectionLink(it.src.s)}</div></div>`; }).join('')}</div>`;
      el.scrollIntoView({ block: 'start' });
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-m]'); if (b && b.dataset.m === 'start') run(); });
    intro();
  };
})();

/* Figures for chapters 4-5. */
(function () {
  const App = window.App;
  const { esc, fmt, data, $, $$, shuffle } = App.util;
  const V = App.VIZ;
  const fig = App.figHtml; const flow = App.flowHtml; const testBtn = App.testBtn;
  const { NATIONS } = window.UK_PLACES;
  const NOW = 2026;

  // lifespans chart: rows [name, born, died|null, note]
  function lifespans(rows, opts) {
    opts = opts || {};
    const a = Math.floor(Math.min(...rows.map((r) => r[1])) / 50) * 50;
    const b = Math.ceil(NOW / 50) * 50;
    const pct = (y) => ((y - a) / (b - a)) * 100;
    const ticks = []; for (let t = a; t <= b; t += 50) ticks.push(t);
    const grid = ticks.map((t) => `<span class="gl" style="left:${pct(t)}%"></span>`).join('');
    return `<div class="life" role="img" aria-label="Lifespans on a shared time axis">${rows.map(([n, bo, d, x]) => `<div class="life-row"><span class="nm">${esc(n)}${x ? `<small>${esc(x)}</small>` : ''}</span><span class="lt life-grid">${grid}<i class="${d ? '' : 'open'}" style="left:${pct(bo)}%;width:${pct(d || NOW) - pct(bo)}%" title="${bo}–${d || ''}"></i></span></div>`).join('')}
      <div class="life-axis">${ticks.map((t) => `<span style="left:${pct(t)}%">${t}</span>`).join('')}</div></div>`;
  }

  // ---------- UK today ----------
  V.nations = () => {
    const ks = Object.keys(NATIONS);
    const row = (label, f) => `<tr><td>${label}</td>${ks.map((k) => `<td>${esc(f(NATIONS[k]))}</td>`).join('')}</tr>`;
    return fig('The four nations side by side', 'Everything you need to compare them', `<div class="table-wrap" style="margin:0"><table><thead><tr><th></th>${ks.map((k) => `<th>${esc(NATIONS[k].name)}</th>`).join('')}</tr></thead><tbody>
      ${row('Capital', (n) => n.capital)}${row('Share of population', (n) => n.share)}${row('Patron saint', (n) => `${n.saint}, ${n.saintDay}`)}${row('Saint’s day a holiday?', (n) => (/official holiday/.test(n.saintHoliday) ? 'Yes' : 'No'))}${row('National flower', (n) => n.flower)}${row('Other languages', (n) => ({ england: '—', scotland: 'Gaelic (Highlands and Islands)', wales: 'Welsh', ni: 'Irish Gaelic' }[Object.keys(NATIONS).find((k) => NATIONS[k] === n)]))}${row('Law-making body', (n) => ({ England: 'UK Parliament (Westminster)', Scotland: 'Scottish Parliament (Holyrood)', Wales: 'National Assembly (Senedd)', 'Northern Ireland': 'NI Assembly (Stormont)' }[n.name]))}
    </tbody></table></div>`);
  };

  V.currency = () => {
    const coins = [['1p', 26, 'copper'], ['2p', 34, 'copper'], ['5p', 26, 'silver'], ['10p', 34, 'silver'], ['20p', 30, 'silver'], ['50p', 38, 'silver'], ['£1', 34, 'gold'], ['£2', 40, 'bi']];
    const notes = [['£5', '#3f7f8c'], ['£10', '#a3552e'], ['£20', '#6b4a8c'], ['£50', '#b23a3a']];
    return fig('The pound sterling (£)', '100 pence = £1', `<div class="coins">${coins.map(([t, s, c]) => `<div class="coin ${c}" style="width:${s + 14}px;height:${s + 14}px;font-size:${s > 33 ? '.85rem' : '.72rem'}">${t}</div>`).join('')}</div>
      <div class="notes">${notes.map(([t, c]) => `<div class="bnote" style="background:${c}">${t}</div>`).join('')}</div>`, 'Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2. Notes: £5, £10, £20, £50. Scotland and Northern Ireland issue their own banknotes, valid everywhere in the UK, but shops and businesses do not have to accept them. Sizes are illustrative.');
  };

  const POP = [[1600, 4.1, 'Just over 4 million'], [1700, 5, '5 million'], [1801, 8, '8 million'], [1851, 20, '20 million'], [1901, 40, '40 million'], [1951, 50, '50 million'], [1998, 57, '57 million'], [2005, 59.8, 'Just under 60 million'], [2010, 62.2, 'Just over 62 million'], [2022, 67.6, 'Estimated 67.6 million']];
  V.population = () => {
    const W = 640; const H = 260; const L = 44; const R = 20; const T = 18; const B = 34;
    const X = (y) => L + ((y - 1600) / (2030 - 1600)) * (W - L - R);
    const Y = (v) => T + (1 - v / 70) * (H - T - B);
    const grid = [0, 10, 20, 30, 40, 50, 60, 70].map((v) => `<line class="grid" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${L - 8}" y="${Y(v) + 4}" text-anchor="end">${v}m</text>`).join('');
    const xt = [1600, 1700, 1800, 1900, 2000].map((y) => `<text x="${X(y)}" y="${H - 12}" text-anchor="middle">${y}</text>`).join('');
    const pts = POP.map(([y, v]) => `${X(y).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
    const area = `${X(1600)},${Y(0)} ${pts} ${X(2022)},${Y(0)}`;
    const labelled = [1600, 1801, 1851, 1901, 1951, 2022];
    const dots = POP.map(([y, v, t]) => `<circle class="pt" cx="${X(y).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4.5"><title>${y}: ${t}</title></circle>${labelled.includes(y) ? `<text class="val" x="${(X(y) + (y === 1600 ? 8 : 0)).toFixed(1)}" y="${(Y(v) - 10).toFixed(1)}" text-anchor="${y === 2022 ? 'end' : y === 1600 ? 'start' : 'middle'}">${y === 1600 ? '4m+' : `${v}m`}</text>` : ''}`).join('');
    return fig('Population growth in the UK', 'Source: National Statistics', `<div class="chart scroll-x"><svg viewBox="0 0 ${W} ${H}" style="min-width:480px" role="img" aria-label="Line chart of UK population from just over 4 million in 1600 to an estimated 67.6 million in 2022">${grid}<line class="axis" x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}"/>${xt}<polygon class="area" points="${area}"/><polyline class="ln" points="${pts}"/>${dots}</svg></div>
      <ul class="chips" style="margin:12px 0 0">${POP.map(([y, , t]) => `<li class="chip"><b class="mono">${y}</b> ${esc(t)}</li>`).join('')}</ul>`);
  };

  V.share = () => fig('Where people live', 'Share of the UK population', `<div class="stack" role="img" aria-label="England 84 percent, Scotland just over 8 percent, Wales around 5 percent, Northern Ireland less than 3 percent">
    <div style="flex:84;background:var(--flag-red)">England 84%</div><div style="flex:8.3;background:var(--flag-blue)">8%</div><div style="flex:5;background:var(--c2)">5%</div><div style="flex:2.7;background:var(--c4)"></div></div>
    <div class="legend" style="margin:10px 0 0"><span><i style="--lc:var(--flag-red)"></i>England ~84%</span><span><i style="--lc:var(--flag-blue)"></i>Scotland just over 8%</span><span><i style="--lc:var(--c2)"></i>Wales around 5%</span><span><i style="--lc:var(--c4)"></i>Northern Ireland less than 3%</span></div>`);

  // ---------- religion ----------
  V.religion = () => {
    const rows = [['Christian', 70, '70%'], ['No religion', 21, '21%'], ['Muslim', 4, '4%'], ['Hindu', 2, '2%'], ['Another religion', 2, '2%'], ['Sikh', 1, '1%'], ['Jewish', 0.4, '<0.5%'], ['Buddhist', 0.4, '<0.5%']];
    return fig('Religion in the UK', '2009 Citizenship Survey', `<div class="bars">${rows.map(([n, v, t], i) => `<div class="bar-row"><span>${n}</span><span class="track-b"><i style="width:${v}%;--bc:${i === 0 ? 'var(--accent)' : i === 1 ? 'var(--ink-3)' : 'color-mix(in srgb, var(--accent) 60%, var(--panel))'}"></i></span><span class="v">${t}</span></div>`).join('')}</div>`, 'Bars to scale (0–100%).');
  };
  V.saints = () => `<figure class="fig testable"><div class="fig-h"><h3>Patron saints’ days</h3><div class="testme"><span class="muted small">Hide the dates</span>${testBtn}</div></div>
    <div class="tiles">${['wales', 'ni', 'england', 'scotland'].map((k) => { const n = NATIONS[k]; return `<div class="tile" data-reveal><span class="k ans">${n.saintDay.replace(' ', ' ')}</span><span class="v">${n.saint}</span><span class="x">${n.name}${/official holiday/.test(n.saintHoliday) ? ' · <b>official holiday</b>' : ''}</span></div>`; }).join('')}</div>
    <p class="fig-cap">In date order through the year: 1 March, 17 March, 23 April, 30 November.</p></figure>`;

  // ---------- calendar ----------
  const CAL = [
    [1, '1', 'New Year’s Day', 'trad', true], [1, '2', 'Public holiday in Scotland', 'trad', true],
    [2, '14', 'Valentine’s Day', 'trad'],
    [3, '1', 'St David’s Day (Wales)', 'saint'], [3, '17', 'St Patrick’s Day (NI)', 'saint', true],
    [4, '1', 'April Fool’s Day', 'trad'], [4, '14', 'Vaisakhi (Sikh)', 'faith'], [4, '23', 'St George’s Day (England)', 'saint'],
    [5, 'Early', 'Bank holiday', 'bank', true], [5, 'Late', 'Bank holiday (or early June)', 'bank', true],
    [6, '3rd Sun', 'Father’s Day', 'trad'],
    [7, '12', 'Battle of the Boyne (NI)', 'bank', true],
    [8, 'Late', 'Bank holiday', 'bank', true],
    [10, '31', 'Halloween', 'trad'], [10, 'Oct/Nov', 'Diwali (5 days; Hindu & Sikh)', 'faith'],
    [11, '5', 'Bonfire Night', 'trad'], [11, '11', 'Remembrance Day', 'trad'], [11, '30', 'St Andrew’s Day (Scotland)', 'saint', true], [11, 'Nov/Dec', 'Hannukah (8 days; Jewish)', 'faith'],
    [12, '24', 'Christmas Eve', 'christian'], [12, '25', 'Christmas Day', 'christian', true], [12, '26', 'Boxing Day', 'christian', true], [12, '31', 'New Year’s Eve / Hogmanay', 'trad']
  ];
  const MOVE = [
    ['Feb/Mar', 'Shrove Tuesday (Pancake Day)', 'christian'], ['Feb/Mar', 'Ash Wednesday: Lent begins (40 days)', 'christian'],
    ['3 weeks before Easter', 'Mothering Sunday', 'trad'], ['Mar/Apr', 'Good Friday', 'christian', true], ['Mar/Apr', 'Easter Sunday', 'christian'], ['Mar/Apr', 'Easter Monday', 'christian', true],
    ['Changes yearly', 'Eid al-Fitr: end of Ramadan', 'faith'], ['Changes yearly', 'Eid ul Adha', 'faith']
  ];
  const TYPES = { christian: ['Christian', 'var(--c5)'], faith: ['Other faiths', 'var(--c1)'], saint: ['Saints’ days', 'var(--c2)'], trad: ['Traditions', 'var(--c4)'], bank: ['Bank holidays', 'var(--ink-3)'] };
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  V.calendar = () => `<figure class="fig"><div class="fig-h"><h3>The festival year</h3><span class="muted">★ = public or bank holiday (somewhere in the UK)</span></div><div data-mount="calendar"></div></figure>`;
  App.MOUNT.calendar = function (el) {
    let on = new Set(Object.keys(TYPES));
    function item(d, n, t, hol, wide) { return `<li style="display:grid;grid-template-columns:${wide ? '108px' : '62px'} minmax(0,1fr);gap:8px;font-size:.88rem;padding:3px 0"><span class="mono" style="color:${TYPES[t][1]};font-weight:600">${esc(d)}</span><span>${esc(n)}${hol ? ' <b title="Public or bank holiday">★</b>' : ''}</span></li>`; }
    function paint() {
      const months = MONTHS.map((m, i) => { const evs = CAL.filter((c) => c[0] === i + 1 && on.has(c[3])); return `<div class="card" style="padding:12px 14px"><h3 style="font-size:1rem;margin-bottom:6px">${m}</h3>${evs.length ? `<ul style="list-style:none;margin:0;padding:0">${evs.map((c) => item(c[1], c[2], c[3], c[4])).join('')}</ul>` : '<p class="small muted">Nothing from the handbook this month.</p>'}</div>`; }).join('');
      const mv = MOVE.filter((m) => on.has(m[2]));
      el.innerHTML = `<div class="chips" role="group" aria-label="Filter festivals">${Object.entries(TYPES).map(([k, [n, c]]) => `<button class="chip" data-t="${k}" aria-pressed="${on.has(k)}"><span class="dot" style="--dc:${c}"></span>${n}</button>`).join('')}</div>
        <div class="cards" style="--cols:3;margin-bottom:12px">${months}</div>
        ${mv.length ? `<div class="card" style="padding:12px 14px"><h3 style="font-size:1rem;margin-bottom:6px">Moveable dates</h3><ul style="list-style:none;margin:0;padding:0;columns:2 220px">${mv.map((m) => item(m[0].replace('3 weeks before Easter', 'Easter − 3 wks'), m[1], m[2], m[3], true)).join('')}</ul></div>` : ''}`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (!b) return; const t = b.dataset.t; if (on.has(t) && on.size > 1) on.delete(t); else on.add(t); paint(); });
    paint();
  };

  // ---------- sport ----------
  V.olympics = () => fig('The UK has hosted the Olympic Games three times', '', `<div class="tiles">${[['1908', 'London'], ['1948', 'London'], ['2012', 'London: Olympics and Paralympics; main site in Stratford, east London; Team GB 3rd in the medal table']].map(([k, x]) => `<div class="tile"><span class="k">${k}</span><span class="x">${x}</span></div>`).join('')}</div>`);

  // ---------- arts ----------
  const COMPOSERS = [['Henry Purcell', 1659, 1695, 'Westminster Abbey organist'], ['George Frederick Handel', 1695, 1759, 'Water Music; Messiah'], ['Sir Edward Elgar', 1857, 1934, 'Pomp and Circumstance'], ['Ralph Vaughan Williams', 1872, 1958, 'English folk influence'], ['Gustav Holst', 1874, 1934, 'The Planets'], ['Sir William Walton', 1902, 1983, 'Façade; Belshazzar’s Feast'], ['Benjamin Britten', 1913, 1976, 'Peter Grimes; Billy Budd']];
  V.composers = () => fig('Great composers', 'Lifespans to scale', lifespans(COMPOSERS)) + `<div class="cards" style="--cols:2">${window.PEOPLE.filter((p) => p.c === 'music' && p.y).map((p) => `<div class="card"><h3>${esc(p.n)}</h3><span class="sub">${esc(p.y)}</span><p>${esc(p.f)}</p></div>`).join('')}</div>`;
  V.awards = () => fig('Prizes and awards to know', 'A cross-chapter cheat sheet', `<div class="table-wrap" style="margin:0"><table><thead><tr><th>Award</th><th>For</th><th>Detail</th></tr></thead><tbody>${[
    ['Mercury Music Prize', 'Best album from the UK and Ireland', 'Awarded each September'],
    ['Brit Awards', 'Pop music', 'e.g. best British group, best British solo artist'],
    ['Laurence Olivier Awards', 'Theatre', 'Annually at venues in London'],
    ['Turner Prize', 'Contemporary art', 'Since 1984; four works shown at Tate Britain'],
    ['Man Booker Prize', 'Fiction', 'Since 1968; Commonwealth, Irish or Zimbabwean authors'],
    ['BAFTAs', 'Film', 'The British equivalent of the Oscars'],
    ['Nobel Prize in Literature', 'Writing', 'Kipling (1907), Golding, Heaney, Pinter'],
    ['Victoria Cross', 'Valour by soldiers', 'Introduced by Queen Victoria in the Crimean War']
  ].map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>`);

  const ARTISTS = [['Thomas Gainsborough', 1727, 1788, 'Portraits in country scenery'], ['David Allan', 1744, 1796, 'Scottish; The Origin of Painting'], ['Joseph Turner', 1775, 1851, 'Modern-style landscapes'], ['John Constable', 1776, 1837, 'Dedham Vale'], ['Sir John Lavery', 1856, 1941, 'Northern Irish; Royal Family'], ['Henry Moore', 1898, 1986, 'Bronze abstract sculpture'], ['John Petts', 1914, 1991, 'Welsh; engravings, stained glass'], ['Lucian Freud', 1922, 2011, 'German-born; portraits'], ['David Hockney', 1937, null, '1960s pop art']];
  V.artists = () => fig('Notable British artists', 'Lifespans to scale', lifespans(ARTISTS), 'Also the Pre-Raphaelites (second half of the 19th century): Holman Hunt, Dante Gabriel Rossetti and Sir John Millais, painting detailed religious or literary scenes in bright colours.');
  V.architecture = () => fig('Architecture through the centuries', '', flow([
    ['Middle Ages', 'Great cathedrals and castles', 'Cathedrals in **Durham, Lincoln, Canterbury and Salisbury**. The **White Tower** (Tower of London), a Norman castle keep built for William the Conqueror.'],
    ['Later', 'Great country houses', 'As the countryside became more peaceful, e.g. **Hardwick Hall**, Derbyshire. British styles begin to evolve.'],
    ['17th century', 'Classical inspiration', '**Inigo Jones**: the Queen’s House at Greenwich and the Banqueting House in Whitehall. **Sir Christopher Wren**: a British version of ornate European style, e.g. the new **St Paul’s Cathedral**.'],
    ['18th century', 'Simpler designs', 'Scottish architect **Robert Adam** designed buildings and interiors, e.g. **Dumfries House**. His ideas influenced **Bath**’s **Royal Crescent**.'],
    ['19th century', 'Gothic revival', 'The **Houses of Parliament**, **St Pancras Station**, and town halls in **Manchester** and **Sheffield**.'],
    ['20th century', 'Across the Empire', '**Sir Edwin Lutyens** designed **New Delhi** and war memorials including the **Cenotaph** in Whitehall.'],
    ['Today', 'Global architects', '**Sir Norman Foster**, **Lord (Richard) Rogers** and **Dame Zaha Hadid**.']
  ]));
  const AUTHORS = [['Jane Austen', 1775, 1817, 'Pride and Prejudice'], ['Charles Dickens', 1812, 1870, 'Oliver Twist'], ['Thomas Hardy', 1840, 1928, 'Far from the Madding Crowd'], ['Robert Louis Stevenson', 1850, 1894, 'Treasure Island'], ['Sir Arthur Conan Doyle', 1859, 1930, 'Sherlock Holmes'], ['Evelyn Waugh', 1903, 1966, 'Brideshead Revisited'], ['Graham Greene', 1904, 1991, 'Brighton Rock'], ['Sir Kingsley Amis', 1922, 1995, 'Lucky Jim'], ['J K Rowling', 1965, null, 'Harry Potter']];
  V.authors = () => fig('Notable authors', 'Lifespans to scale', lifespans(AUTHORS)) + `<div class="people">${window.PEOPLE.filter((p) => p.s === 'literature' && p.c === 'writer' && p.y).map((p) => App.personCard(p, { flat: true })).join('')}</div>`;
  V.poets = () => fig('British poetry through the ages', '', flow([
    ['Anglo-Saxon', 'Beowulf', 'A hero’s battles against monsters; still translated into modern English'],
    ['Middle Ages', 'Chaucer’s Canterbury Tales; Sir Gawain and the Green Knight', 'Sir Gawain was a knight at King Arthur’s court'],
    ['16th–17th c.', 'Shakespeare’s sonnets; John Milton', 'Sonnets are 14 lines. As Protestant ideas spread, Milton wrote **Paradise Lost**'],
    ['Nature & Scotland', 'William Wordsworth; Sir Walter Scott', 'Wordsworth was inspired by nature; Scott by Scotland and the Borders (he also wrote novels)'],
    ['19th century', 'Blake, Keats, Byron, Shelley, Tennyson, Robert and Elizabeth Browning', 'Poetry was very popular'],
    ['First World War', 'Wilfred Owen; Siegfried Sassoon', 'Wrote about their experiences of the war'],
    ['More recently', 'Walter de la Mare, John Masefield, Sir John Betjeman, Ted Hughes', 'Popular modern poets']
  ]), 'Also: Robert Burns (Auld Lang Syne), Dylan Thomas (Do Not Go Gentle into That Good Night) and Kipling (If). Many poets are buried or commemorated in Poets’ Corner, Westminster Abbey.');
  const POEMS = [
    ['Oh to be in England now that April’s there\nAnd whoever wakes in England sees, some morning, unaware,\nThat the lowest boughs and the brushwood sheaf\nRound the elm-tree bole are in tiny leaf\nWhile the Chaffinch sings on the orchard bough\nIn England – Now!', 'Robert Browning (1812–89)', 'Home Thoughts from Abroad'],
    ['She walks in beauty, like the night\nOf cloudless climes and starry skies,\nAll that’s best of dark and bright\nMeet in her aspect and her eyes', 'Lord Byron (1788–1824)', 'She Walks in Beauty'],
    ['I wander’d lonely as a cloud\nThat floats on high o’er vales and hills\nWhen all at once I saw a crowd,\nA host of golden daffodils', 'William Wordsworth (1770–1850)', 'The Daffodils'],
    ['Tyger! Tyger! Burning bright\nIn the forests of the night,\nWhat immortal hand or eye\nCould frame thy fearful symmetry?', 'William Blake (1757–1827)', 'The Tyger'],
    ['What passing-bells for these who die as cattle?\nOnly the monstrous anger of the guns.\nOnly the stuttering rifles’ rapid rattle\nCan patter out their hasty orisons.', 'Wilfred Owen (1893–1918)', 'Anthem for Doomed Youth']
  ];
  V.poems = () => `<figure class="fig testable"><div class="fig-h"><h3>Who wrote it?</h3><div class="testme"><span class="muted small">Hide the poets, then tap to check</span>${testBtn}</div></div>
    <div class="quote-grid">${POEMS.map(([l, w, t]) => `<div class="qcard" data-reveal><p class="poem" style="font-size:1rem">${esc(l)}</p><span class="who ans"><b>${esc(w)}</b> – ${esc(t)}</span></div>`).join('')}</div></figure>`;

  // ---------- leisure ----------
  V.flowersfood = () => `<figure class="fig testable"><div class="fig-h"><h3>National flowers and traditional foods</h3><div class="testme">${testBtn}</div></div><div class="cards" style="--cols:2;margin:0">${['england', 'scotland', 'wales', 'ni'].map((k) => { const n = NATIONS[k]; return `<div class="card" data-reveal><h3>${n.name}</h3><span class="sub ans">Flower: ${n.flower}</span><p class="ans">${esc(n.food)}</p></div>`; }).join('')}</div><p class="fig-cap">National flowers are sometimes worn on saints’ days. (The flowers come from the official handbook’s table, which is missing from some PDF versions.)</p></figure>`;

  // ---------- film & media ----------
  const FILMS = [['1935', 'The 39 Steps', 'Alfred Hitchcock'], ['1945', 'Brief Encounter', 'David Lean'], ['1949', 'The Third Man', 'Carol Reed'], ['1954', 'The Belles of St Trinian’s', 'Frank Launder'], ['1962', 'Lawrence of Arabia', 'David Lean'], ['1969', 'Women in Love', 'Ken Russell'], ['1973', 'Don’t Look Now', 'Nicolas Roeg'], ['1981', 'Chariots of Fire', 'Hugh Hudson'], ['1984', 'The Killing Fields', 'Roland Joffé'], ['1994', 'Four Weddings and a Funeral', 'Mike Newell'], ['2003', 'Touching the Void', 'Kevin MacDonald']];
  V.films = () => `<figure class="fig testable"><div class="fig-h"><h3>Famous British films</h3><div class="testme"><span class="muted small">Hide the directors</span>${testBtn}</div></div><div class="film-strip">${FILMS.map(([y, t, d]) => `<div class="film" data-reveal><span class="yr">${y}</span><b>${esc(t)}</b><span class="ans">dir. ${esc(d)}</span></div>`).join('')}</div></figure>`;
  V.comedy = () => fig('A long tradition of laughing at ourselves', '', flow([
    ['Middle Ages', 'Court jesters', 'Told jokes and made fun of people at court'],
    ['16th–17th c.', 'Shakespeare’s comic characters', ''],
    ['18th century', 'Political cartoons', 'Attacked politicians, sometimes the monarch or Royal Family'],
    ['1840s', 'Punch', 'The most famous satirical magazine. Private Eye continues the tradition today.'],
    ['Until TV', 'Music hall comedians', 'Variety theatre; Morecambe and Wise became TV stars'],
    ['1960s', 'That Was The Week That Was', 'TV satire. Sitcoms about family and work remain popular.'],
    ['1969', 'Monty Python’s Flying Circus', 'A new type of progressive comedy'],
    ['1980s–90s', 'Spitting Image', 'Satire'],
    ['Recent years', 'Stand-up comedy', 'A solo comedian with a live audience, popular again']
  ]));
  V.tvlicence = () => fig('The TV licence and the BBC', '', `<div class="tiles">
    <div class="tile"><span class="k">1</span><span class="v">licence per home</span><span class="x">Covers all TVs, computers and other devices used to watch TV. People renting rooms with separate tenancies each need one.</span></div>
    <div class="tile"><span class="k">75+</span><span class="v">free licence</span><span class="x">People over 75 can apply for a free TV licence</span></div>
    <div class="tile"><span class="k">50%</span><span class="v">discount</span><span class="x">For blind people</span></div>
    <div class="tile"><span class="k">£1,000</span><span class="v">maximum fine</span><span class="x">For watching TV without a licence</span></div>
  </div><p style="margin:0" class="small">Licence money pays for the <b>BBC</b>: the largest broadcaster in the world and the only wholly state-funded media organisation that is <b>independent of government</b>. Other channels are funded by advertisements and subscriptions; BBC radio is also licence-funded.</p>`);

  // ---------- places ----------
  V.parks = () => {
    const rows = [['The Lake District', 885, 2292, 'England’s largest; Windermere; Wastwater'], ['Snowdonia', 838, 2170, 'North Wales; Snowdon'], ['Loch Lomond & the Trossachs', 720, 1865, 'West of Scotland']];
    return fig('Three national parks compared', 'Area in square miles, to scale', `<div class="bars">${rows.map(([n, m, k, x]) => `<div class="bar-row" style="grid-template-columns:minmax(0,190px) minmax(0,1fr) 120px"><span><b>${n}</b><br><small class="muted">${x}</small></span><span class="track-b"><i style="width:${(m / 900) * 100}%"></i></span><span class="v">${m} sq mi<br><small class="muted">${k.toLocaleString('en-GB')} km²</small></span></div>`).join('')}</div>`);
  };

  // ================= chapter 5 =================
  V.chartists = () => fig('The Chartists’ six demands (1830s–1840s)', 'Seen as a failure at the time; by 1918 most had been adopted', `<div class="cards" style="--cols:3;margin:0">${[
    ['Every man to have the vote', true], ['Elections every year', false], ['All regions equal in the electoral system', true], ['Secret ballots', true], ['Any man able to stand as an MP', true], ['MPs to be paid', true]
  ].map(([t, ok], i) => `<div class="card"><span class="sub">Demand ${i + 1}</span><h3>${t}</h3><p>${ok ? '<span class="yes">✓</span> Now part of the system' : '<span class="no-mark">✗</span> Never adopted'}</p></div>`).join('')}</div>`);
  V.institutions = () => fig('The UK’s constitutional institutions', 'The main parts of government named in the handbook', `<div class="org-grid">${[
    ['The monarchy', 'Head of state; appoints the government; opens Parliament'],
    ['Parliament', 'The House of Commons and the House of Lords: make and check laws'],
    ['The Prime Minister', 'Leader of the party in power'],
    ['The cabinet', 'About 20 senior ministers who decide policy'],
    ['The judiciary (courts)', 'Interpret the law; independent of government'],
    ['The police', 'Keep the peace; independent of government'],
    ['The civil service', 'Politically neutral staff who carry out policy'],
    ['Local government', 'Elected councils running local services']
  ].map(([n, x]) => `<div class="org"><b>${n}</b><span class="small muted">${x}</span></div>`).join('')}</div>`, 'Scotland, Wales and Northern Ireland also have devolved governments with power to legislate on certain issues.');
  V.royals = () => fig('The royal line of succession', '', `<div class="royal-line">
    <div class="royal"><b>Queen Elizabeth II</b><small>1952–2022 · married to Prince Philip · Diamond Jubilee 2012</small></div><span class="arrow">→</span>
    <div class="royal now"><b>King Charles III</b><small>The sovereign since 2022</small></div><span class="arrow">→</span>
    <div class="royal"><b>William, Prince of Wales</b><small>Heir apparent</small></div><span class="arrow">→</span>
    <div class="royal"><b>Prince George</b><small>then</small></div><span class="arrow">→</span>
    <div class="royal"><b>Princess Charlotte</b><small>then</small></div><span class="arrow">→</span>
    <div class="royal"><b>Prince Louis</b><small>in order of birth</small></div>
  </div>`, '‘Prince of Wales’ is the title of the heir apparent. In 2023 King Charles III gave his former title, Duke of Edinburgh, to his brother Prince Edward on his 59th birthday.');
  V.houses = () => fig('The two Houses of Parliament', '', `<div class="house-cmp">
    <div class="house" style="--hc:var(--c2)"><h3>House of Commons</h3><dl>
      <dt>Members</dt><dd><b>MPs</b>, democratically elected; each represents a <b>constituency</b></dd>
      <dt>Importance</dt><dd>Regarded as the more important chamber because it is elected. The PM and almost all the cabinet are MPs.</dd>
      <dt>MPs</dt><dd>represent everyone in their constituency · help create new laws · scrutinise the government · debate national issues</dd>
      <dt>Chaired by</dt><dd>The <b>Speaker</b>, a neutral MP chosen by secret ballot</dd></dl></div>
    <div class="house" style="--hc:var(--c3)"><h3>House of Lords</h3><dl>
      <dt>Members</dt><dd><b>Peers</b>, not elected and not representing a constituency</dd>
      <dt>Until 1958</dt><dd>All peers were hereditary, senior judges or Church of England bishops</dd>
      <dt>Since 1958</dt><dd><b>Life peers</b>, appointed by the monarch on the PM’s advice (also nominees of other party leaders and an independent Appointments Commission)</dd>
      <dt>Since 1999</dt><dd>Hereditary peers lost their automatic right to attend; they elect a few of their number</dd>
      <dt>Role</dt><dd>More independent of government. Suggests amendments, proposes laws, checks Commons bills and holds the government to account. The Commons can overrule it, but rarely does.</dd></dl></div>
  </div>`);
  V.elections = () => fig('Elections at a glance', '', `<div class="table-wrap" style="margin:0"><table><thead><tr><th>Election</th><th>How often</th><th>System</th><th>Elects</th></tr></thead><tbody>
    <tr><td>General Election</td><td>At least every 5 years</td><td>First past the post: most votes in a constituency wins</td><td>MPs</td></tr>
    <tr><td>By-election</td><td>When an MP dies or resigns</td><td>First past the post, in that constituency</td><td>One MP</td></tr>
    <tr><td>Local elections</td><td>May, every year (most areas)</td><td>—</td><td>Councillors</td></tr>
    <tr><td>Scottish Parliament</td><td>—</td><td>A form of proportional representation</td><td>129 MSPs</td></tr>
    <tr><td>Welsh Assembly</td><td>Every 4 years</td><td>A form of proportional representation</td><td>60 AMs</td></tr>
    <tr><td>NI Assembly</td><td>—</td><td>A form of proportional representation</td><td>90 MLAs</td></tr>
    <tr><td>European Parliament</td><td>Every 5 years</td><td>Proportional representation: seats in proportion to votes</td><td>MEPs</td></tr>
  </tbody></table></div>`, 'If no party wins a majority, two parties may form a coalition. The handbook still describes European elections, but the UK left the EU in 2020 and no longer elects MEPs.');
  V.cabinet = () => fig('Who runs the government, and who challenges it', '', `<div class="cab">
    <div class="cab-col"><h4>Government</h4><div class="role top"><b>Prime Minister</b><span>Leader of the party in power; appoints the cabinet</span></div>
      <div class="role"><b>Chancellor of the Exchequer</b><span>The economy</span></div><div class="role"><b>Home Secretary</b><span>Crime, policing and immigration</span></div><div class="role"><b>Foreign Secretary</b><span>Relationships with foreign countries</span></div><div class="role"><b>Other Secretaries of State</b><span>e.g. education, health, defence</span></div>
      <div class="role"><b>Ministers of State and Parliamentary Under-Secretaries</b><span>Take charge of areas within each department</span></div></div>
    <div class="cab-col"><h4>Opposition</h4><div class="role top"><b>Leader of the Opposition</b><span>Leads the second-largest party; usually becomes PM if it wins the next election</span></div>
      <div class="role"><b>Shadow cabinet</b><span>Senior opposition MPs (‘shadow ministers’) who challenge the government and put forward alternative policies</span></div>
      <div class="role"><b>Prime Minister’s Questions</b><span>Every week whilst Parliament sits: a key chance to point out failures</span></div></div>
  </div>`, 'The cabinet is about 20 senior MPs. It usually meets weekly; many of its decisions must be debated or approved by Parliament.');
  V.devolution = () => fig('Devolved administrations compared', 'Since 1997, some powers devolved from Westminster', `<div class="table-wrap" style="margin:0"><table><thead><tr><th></th><th>Wales</th><th>Scotland</th><th>Northern Ireland</th></tr></thead><tbody>
    <tr><td>Body</td><td>Welsh Government and National Assembly for Wales</td><td>Scottish Parliament</td><td>Northern Ireland Assembly</td></tr>
    <tr><td>Where</td><td>The Senedd, Cardiff Bay</td><td>Holyrood, Edinburgh</td><td>Stormont, Belfast</td></tr>
    <tr><td>Members</td><td><b>60</b> AMs (Assembly members)</td><td><b>129</b> MSPs</td><td><b>90</b> MLAs (members of the Legislative Assembly)</td></tr>
    <tr><td>Since</td><td>1999</td><td>1999</td><td>Soon after the 1998 Belfast (Good Friday) Agreement</td></tr>
    <tr><td>Voting</td><td>Proportional representation, every 4 years</td><td>Proportional representation</td><td>Proportional representation; power-sharing among the main parties</td></tr>
    <tr><td>Powers</td><td>Laws in 20 areas, e.g. education and training, health and social services, economic development, housing. Since 2011 without the UK Parliament’s agreement</td><td>All matters not reserved to Westminster, e.g. civil and criminal law, health, education, planning, additional tax-raising</td><td>e.g. education, agriculture, the environment, health, social services</td></tr>
    <tr><td>Note</td><td>Members can speak Welsh or English; all publications in both</td><td>—</td><td>The earlier NI Parliament (1922) was abolished in 1972. The UK government has suspended the Assembly several times; running successfully since 2007</td></tr>
  </tbody></table></div><p class="chips-h" style="margin-top:14px">Still controlled by the UK government</p><ul class="chips" style="margin:0">${['Defence', 'Foreign affairs', 'Immigration', 'Taxation', 'Social security'].map((x) => `<li class="chip">${x}</li>`).join('')}</ul>`, 'Each devolved administration has its own civil service. The UK government can suspend all devolved assemblies.');
  V.whovotes = () => fig('Who can vote?', 'Adults aged 18 or over, resident in the UK', `<div class="table-wrap matrix" style="margin:0"><table><thead><tr><th>Citizens of…</th><th>General Elections</th><th>All other public elections</th></tr></thead><tbody>
    <tr><td>The UK</td><td class="yes">✓</td><td class="yes">✓</td></tr>
    <tr><td>The Commonwealth</td><td class="yes">✓</td><td class="yes">✓</td></tr>
    <tr><td>The Irish Republic</td><td class="yes">✓</td><td class="yes">✓</td></tr>
    <tr><td>Other EU states</td><td class="no-mark">✗</td><td class="yes">✓</td></tr>
  </tbody></table></div>`, 'You must be on the electoral register to vote.');
  V.pollingday = () => `<ol class="steps">${[
    ['Get on the electoral register', 'Through your local council. Northern Ireland uses individual registration.'],
    ['Receive your poll card', 'It tells you where your polling station is and when the election takes place.'],
    ['Go to the polling station', 'Called a polling place in Scotland. Open 7.00 am to 10.00 pm on election day.'],
    ['Give your name and address', 'In Northern Ireland you must also show photographic identification.'],
    ['Fill in your ballot paper in private', 'In a polling booth. Make up your own mind: no one can make you vote for a particular candidate.'],
    ['Put it in the ballot box', 'Or vote by post: register for a postal ballot when you register to vote.']
  ].map(([h, x]) => `<li><b>${h}</b><span>${x}</span></li>`).join('')}</ol>`;

  V.intl = () => fig('International organisations', '', `<div class="org-grid">
    <div class="org"><b>The Commonwealth</b><span class="num">56 <small>member states (list below)</small></span><span class="badge st member">UK: member</span><span class="small muted">Mostly former Empire countries. The monarch is ceremonial head. Voluntary; no power over members but can suspend them. Values: democracy, good government, rule of law.</span></div>
    <div class="org"><b>The European Union</b><span class="num">27 <small>member states</small></span><span class="badge st left">UK: left 31 Jan 2020</span><span class="small muted">Began as the EEC, founded by six countries (Treaty of Rome, 1957). The UK joined in 1973.</span></div>
    <div class="org"><b>The Council of Europe</b><span class="num">47 <small>members</small></span><span class="badge st member">UK: member</span><span class="small muted">Separate from the EU. Protects human rights. Cannot make laws; draws up conventions and charters, e.g. the European Convention on Human Rights.</span></div>
    <div class="org"><b>The United Nations</b><span class="num">190+ <small>members</small></span><span class="badge st member">UK: permanent Security Council member</span><span class="small muted">Set up after WWII to prevent war and promote peace. The Security Council has 15 members; the UK is one of 5 permanent members.</span></div>
    <div class="org"><b>NATO</b><span class="num">—</span><span class="badge st member">UK: member</span><span class="small muted">European and North American countries that agree to help each other if attacked, and keep peace between members.</span></div>
  </div>`, 'The handbook’s text says the Commonwealth “currently has 54 member states”, but its own updated list shows 56 (Gabon and Togo joined in 2022). The original 3rd edition says 54.');
  const CW = { Africa: ['Botswana', 'Cameroon', 'Gabon', 'The Gambia', 'Ghana', 'Kenya', 'Kingdom of Eswatini', 'Lesotho', 'Malawi', 'Mauritius', 'Mozambique', 'Namibia', 'Nigeria', 'Rwanda', 'Seychelles', 'Sierra Leone', 'South Africa', 'Togo', 'Uganda', 'United Republic of Tanzania', 'Zambia'], Asia: ['Bangladesh', 'Brunei Darussalam', 'India', 'Malaysia', 'Maldives', 'Pakistan', 'Singapore', 'Sri Lanka'], 'Caribbean and Americas': ['Antigua and Barbuda', 'The Bahamas', 'Barbados', 'Belize', 'Canada', 'Dominica', 'Grenada', 'Guyana', 'Jamaica', 'Saint Lucia', 'St Kitts and Nevis', 'St Vincent and the Grenadines', 'Trinidad and Tobago'], Europe: ['Cyprus', 'Malta', 'United Kingdom'], Pacific: ['Australia', 'Fiji', 'Kiribati', 'Nauru', 'New Zealand', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'] };
  V.commonwealth = () => `<div class="fig">${Object.entries(CW).map(([r, cs]) => `<div class="region"><h4>${r} · ${cs.length}</h4><ul class="chips">${cs.map((c) => `<li class="chip ${c === 'United Kingdom' ? 'hl' : ''}">${c}</li>`).join('')}</ul></div>`).join('')}</div>`;
  const EU = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'];
  const FOUNDERS = ['Belgium', 'France', 'Germany', 'Italy', 'Luxembourg', 'Netherlands'];
  V.eu = () => fig('The 27 EU member states', 'Highlighted: the six founders of 1957', `<ul class="chips" style="margin:0">${EU.map((c) => `<li class="chip ${FOUNDERS.includes(c) ? 'hl' : ''}">${c}</li>`).join('')}</ul>`);

  // ---------- law ----------
  const LAW_ITEMS = [
    ['Carrying a knife, even for self-defence', 'crim', 'Carrying a weapon of any kind is a criminal offence.'],
    ['Buying or selling cannabis', 'crim', 'Selling or buying drugs such as heroin, cocaine, ecstasy and cannabis is illegal.'],
    ['Harassing someone because of their religion', 'crim', 'Racial crime: causing harassment, alarm or distress because of religion or ethnic origin.'],
    ['Selling cigarettes to a 16-year-old', 'crim', 'Illegal to sell tobacco products to anyone under 18.'],
    ['Smoking in an enclosed public place', 'crim', 'Against the law in nearly every enclosed public place.'],
    ['Buying alcohol for a 17-year-old', 'crim', 'A criminal offence to sell alcohol to, or buy it for, under-18s.'],
    ['Theft, assault or murder', 'crim', 'Crimes that apply in most countries.'],
    ['A landlord refusing to do repairs', 'civil', 'Housing law: disputes between landlords and tenants over repairs and eviction.'],
    ['A shop refusing to replace faulty goods', 'civil', 'Consumer rights: disputes about faulty goods or services.'],
    ['Being unfairly dismissed from work', 'civil', 'Employment law: wages, unfair dismissal, workplace discrimination.'],
    ['Someone owes you money and won’t pay', 'civil', 'Debt: people may be taken to court if they owe money.'],
    ['A dispute with your employer over wages', 'civil', 'Employment law is civil law.']
  ];
  V.lawsort = () => `<figure class="fig"><div class="fig-h"><h3>Criminal or civil? Sort the cases</h3><span class="muted">Examples from the handbook</span></div><div data-mount="lawsort"></div></figure>`;
  App.MOUNT.lawsort = function (el) {
    let deck; let i; let score; let last;
    function reset() { deck = shuffle(LAW_ITEMS); i = 0; score = 0; last = null; paint(); }
    function paint() {
      if (i >= deck.length) {
        el.innerHTML = `<div class="result ${score >= 10 ? 'pass' : 'fail'}" style="padding:10px 0"><div class="score">${score}<span class="muted" style="font-size:.45em"> / ${deck.length}</span></div><div class="verdict">${score === deck.length ? 'All sorted correctly.' : 'Good effort. Try again to get them all.'}</div><p class="muted small">Criminal law: crimes punished by the courts. Civil law: settling disputes between people or groups.</p><button class="btn sm" data-l="again">Play again</button></div>`;
        return;
      }
      const it = deck[i];
      el.innerHTML = `<div class="q-top"><span>Case ${i + 1} of ${deck.length}</span><span>Score ${score}</span></div>
        <div class="sorter-item">${esc(it[0])}</div>
        <div class="sorter-btns"><button class="btn" style="background:var(--c3);border-color:var(--c3)" data-l="crim">Criminal law</button><button class="btn" style="background:var(--c5);border-color:var(--c5)" data-l="civil">Civil law</button></div>
        ${last ? `<div class="feedback ${last.ok ? 'ok' : 'no'}" role="status"><b>${last.ok ? 'Right' : 'Not quite'}: “${esc(last.it[0])}” is ${last.it[1] === 'crim' ? 'criminal' : 'civil'} law.</b>${esc(last.it[2])}</div>` : ''}`;
    }
    el.addEventListener('click', (e) => {
      const b = e.target.closest('[data-l]'); if (!b) return;
      if (b.dataset.l === 'again') { reset(); return; }
      const it = deck[i]; const ok = b.dataset.l === it[1];
      if (ok) score += 1; last = { ok, it }; i += 1; paint();
    });
    reset();
  };

  // ---------- courts ----------
  const NATS = { ew: 'England & Wales', sc: 'Scotland', ni: 'Northern Ireland' };
  const CASES = { minor: 'Minor criminal offence', serious: 'Serious criminal offence', gravest: 'Most serious crime (e.g. murder)', youth: 'Accused aged 10–17', civil: 'Civil dispute (debt, injury, family, contract, divorce)', bigcivil: 'Serious civil case (large compensation)', small: 'Small claim' };
  const COURT = {
    minor: { ew: ['Magistrates’ Court', 'Magistrates', 'Members of the local community, usually unpaid and without legal qualifications, trained and supported by a legal adviser. They decide the verdict and the sentence.'], sc: ['Justice of the Peace Court', 'Justices of the Peace (JPs)', 'Members of the local community, usually unpaid and without legal qualifications, trained and supported by a legal adviser.'], ni: ['Magistrates’ Court', 'A District Judge or Deputy District Judge', 'In Northern Ireland they are legally qualified and paid.'] },
    serious: { ew: ['Crown Court', 'A judge and a jury of 12', 'The jury decides guilty or not guilty; the judge decides the penalty.'], sc: ['Sheriff Court', 'A sheriff, or a sheriff with a jury of 15', 'Scottish juries can also return ‘not proven’.'], ni: ['Crown Court', 'A judge and a jury of 12', 'The jury decides guilty or not guilty; the judge decides the penalty.'] },
    gravest: { ew: ['Crown Court', 'A judge and a jury of 12', 'Serious offences are tried in the Crown Court.'], sc: ['High Court', 'A judge and a jury of 15', 'The most serious cases in Scotland, such as murder.'], ni: ['Crown Court', 'A judge and a jury of 12', 'Serious offences are tried in the Crown Court.'] },
    youth: { ew: ['Youth Court', 'Up to three specially trained magistrates or a District Judge', 'The most serious cases go to the Crown Court. Parents or carers attend. The public are not allowed in, and the young person’s name or photo cannot be published.'], sc: ['Children’s Hearings System', 'A system for children and young people who offend', 'Scotland deals with young offenders through Children’s Hearings.'], ni: ['Youth Court', 'Specially trained magistrates or a District Judge', 'Northern Ireland also has youth conferencing to consider how a child who has offended should be dealt with.'] },
    civil: { ew: ['County Court', 'A judge', 'Getting back money owed, personal injury, family matters, breach of contract and divorce.'], sc: ['Sheriff Court', 'A sheriff', 'Most of these civil matters are dealt with in the Sheriff Court in Scotland.'], ni: ['County Court', 'A judge', 'Getting back money owed, personal injury, family matters, breach of contract and divorce.'] },
    bigcivil: { ew: ['High Court', 'A judge', 'More serious civil cases, e.g. when a large amount of compensation is claimed.'], sc: ['Court of Session, Edinburgh', 'Judges', 'Scotland’s court for serious civil cases.'], ni: ['High Court', 'A judge', 'More serious civil cases, e.g. when a large amount of compensation is claimed.'] },
    small: { ew: ['Small claims procedure (County Court)', 'A judge, in an ordinary room', 'For claims of less than £10,000. Informal: both sides sit around a table, no need for a lawyer. Can be issued online through Money Claims Online.'], sc: ['Small claims procedure (Sheriff Court)', 'A judge, in an ordinary room', 'For claims of less than £5,000. Informal: both sides sit around a table.'], ni: ['Small claims procedure (County Court)', 'A judge, in an ordinary room', 'For claims of less than £5,000. Informal: both sides sit around a table.'] }
  };
  V.courtfinder = () => `<figure class="fig"><div data-mount="courtfinder"></div></figure>`;
  App.MOUNT.courtfinder = function (el) {
    let n = 'ew'; let c = 'minor';
    function paint() {
      const [court, who, x] = COURT[c][n];
      el.innerHTML = `<div class="court-pick"><div><p class="chips-h">Where?</p><div class="seg" role="group" aria-label="Nation">${Object.entries(NATS).map(([k, v]) => `<button data-n="${k}" aria-pressed="${k === n}">${v}</button>`).join('')}</div></div>
        <div><p class="chips-h">What kind of case?</p><div class="chips" role="group" aria-label="Case type" style="margin:0">${Object.entries(CASES).map(([k, v]) => `<button class="chip" data-c="${k}" aria-pressed="${k === c}">${v}</button>`).join('')}</div></div>
        <div class="court-out" aria-live="polite"><span class="eyebrow">${esc(NATS[n])} · ${esc(CASES[c])}</span><div class="court">${esc(court)}</div><div class="who">${esc(who)}</div><p>${esc(x)}</p></div></div>`;
    }
    el.addEventListener('click', (e) => { const a = e.target.closest('[data-n]'); const b = e.target.closest('[data-c]'); if (a) n = a.dataset.n; else if (b) c = b.dataset.c; else return; paint(); });
    paint();
  };
  V.courts = () => `<div class="table-wrap"><table><thead><tr><th>Case</th><th>England &amp; Wales</th><th>Scotland</th><th>Northern Ireland</th></tr></thead><tbody>${Object.keys(CASES).map((k) => `<tr><td>${CASES[k]}</td>${['ew', 'sc', 'ni'].map((n) => `<td>${esc(COURT[k][n][0])}<br><small class="muted">${esc(COURT[k][n][1])}</small></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  // ---------- driving ----------
  V.driving = () => fig('Driving: the rules in the handbook', '', `<div class="tiles">
    <div class="tile"><span class="k">16</span><span class="v">ride a moped</span></div>
    <div class="tile"><span class="k">17</span><span class="v">drive a car or motor cycle</span><span class="x">With a driving licence, on public roads</span></div>
    <div class="tile"><span class="k">70</span><span class="v">renew every 3 years</span><span class="x">Licences last until 70, then 3 years at a time</span></div>
    <div class="tile"><span class="k">R</span><span class="v">plate for 1 year</span><span class="x">Newly qualified drivers in Northern Ireland (restricted driver)</span></div>
    <div class="tile"><span class="k">12</span><span class="v">months on a foreign licence</span><span class="x">From outside the EU, Iceland, Liechtenstein or Norway. EU etc. licences: as long as valid</span></div>
    <div class="tile"><span class="k">3+</span><span class="v">years old: yearly MOT</span><span class="x">An offence not to have an MOT certificate</span></div>
  </div>
  <ol class="steps" style="margin:6px 0 0">
    <li><b>Apply for a provisional licence and find an instructor</b><span>Following government guidelines</span></li>
    <li><b>Pass the theory test</b><span>A multiple-choice test and a hazard perception test</span></li>
    <li><b>Pass the practical driving test</b><span>Tests your skills on the road</span></li>
    <li><b>Register, tax and insure your vehicle</b><span>Register with the <b>DVLA</b>, pay annual road tax (and display the tax disc), and have valid motor insurance: driving without it is a serious criminal offence</span></li>
  </ol>`);
})();

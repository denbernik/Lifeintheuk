/* Figures for chapters 1-3. Each VIZ returns HTML; interactive ones mount via data-mount. */
(function () {
  const App = window.App;
  const { esc, fmt, data, $, $$, initials } = App.util;
  const V = App.VIZ;

  const fig = (title, sub, body, cap) => `<figure class="fig"><div class="fig-h"><h3>${title}</h3>${sub ? `<span class="muted">${sub}</span>` : ''}</div>${body}${cap ? `<p class="fig-cap">${cap}</p>` : ''}</figure>`;
  const flow = (rows) => `<ol class="flow">${rows.map(([w, t, x]) => `<li><span class="when">${esc(w)}</span><span class="rail"></span><span class="what"><b>${fmt(t)}</b>${x ? `<span>${fmt(x)}</span>` : ''}</span></li>`).join('')}</ol>`;
  const testBtn = '<button class="btn sm ghost" data-act="testme" aria-pressed="false">Test me</button>';
  App.figHtml = fig; App.flowHtml = flow; App.testBtn = testBtn;

  function bio(name, extra) {
    const p = window.PEOPLE.find((x) => x.n === name);
    if (!p) return '';
    return `<figure class="fig" style="--accent:${App.secColor(p.s)}"><div class="bio-card ${p.img ? 'has-photo' : ''}">${p.img ? `<img class="bio-photo" src="${App.img(p.img)}" alt="${esc(p.n)}" loading="lazy">` : `<div class="bio-mono" aria-hidden="true">${esc(initials(p.n))}</div>`}<div><h3>${esc(p.n)}</h3><span class="yr">${esc(p.y || '')} · ${esc(p.r)}</span><p style="margin:0 0 10px">${esc(p.f)}</p>${extra || ''}</div></div></figure>`;
  }
  App.bioHtml = bio;

  // ---------- chapter 1 ----------
  const IC = {
    ballot: '<rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M8 10V4h8v6M10 7h4"/>',
    scales: '<path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0L5 7zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7z"/>',
    liberty: '<circle cx="12" cy="5" r="2"/><path d="M12 7v7M12 14l-3 6M12 14l3 6M4 5l8 5 8-5"/>',
    tolerance: '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
    community: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>'
  };
  const icon = (d) => `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:var(--accent)">${d}</svg>`;
  V.principles = () => fig('The five fundamental principles of British life', 'New citizens pledge to uphold them', `<div class="tiles">${[
    ['ballot', 'Democracy', 'The whole adult population gets a say'], ['scales', 'The rule of law', 'The law applies equally to everyone'],
    ['liberty', 'Individual liberty', 'Freedom of belief, speech and choice'], ['tolerance', 'Tolerance', 'Of those with different faiths and beliefs'],
    ['community', 'Participation in community life', 'Taking part where you live']
  ].map(([i, k, x]) => `<div class="tile">${icon(IC[i])}<span class="v">${k}</span><span class="x">${x}</span></div>`).join('')}</div>`);

  V.residency = () => fig('Two sets of rules in the handbook', 'Requirements changed in October 2013', `<div class="compare">
    <div style="--tc:var(--ink-3)"><h3>As of January 2013: either</h3><ul><li>pass the <b>Life in the UK test</b> (written at ESOL Entry Level 3, so no separate English test), <b>or</b></li><li>pass an <b>ESOL course in English with Citizenship</b> if your English is below Entry Level 3</li></ul></div>
    <div style="--tc:var(--c1)"><h3>From October 2013: both</h3><ul><li>pass the <b>Life in the UK test</b>, <b>and</b></li><li>show acceptable evidence of speaking and listening in English at <b>B1</b> of the Common European Framework of Reference (= ESOL Entry Level 3)</li></ul></div>
  </div><p class="small muted" style="margin:0">Then apply for permanent residence (settlement) or British citizenship, with the forms, evidence and fee for your circumstances.</p>`);

  // ---------- early Britain ----------
  V.invaders = () => fig('Who came to Britain, and what they brought', 'In order of arrival', `<div class="arrow-flow">${[
    ['Stone Age', 'Hunter-gatherers', 'Crossed a land bridge from the continent'],
    ['c. 6,000 years ago', 'First farmers', 'From south-east Europe; built Stonehenge'],
    ['c. 4,000 years ago', 'Bronze Age', 'Roundhouses, round barrows, metalwork'],
    ['Iron Age', 'Celtic-speaking peoples', 'Hill forts, first coins: British history begins'],
    ['AD 43–410', 'Romans', 'Roads, buildings, law, new plants and animals'],
    ['by AD 600', 'Jutes, Angles, Saxons', 'Languages became the basis of English'],
    ['from AD 789', 'Vikings', 'From Denmark and Norway; the Danelaw'],
    ['1066', 'Normans', 'Norman French; the last successful invasion']
  ].map(([w, t, x]) => `<div><span class="when">${w}</span><b>${t}</b><span>${x}</span></div>`).join('')}</div>`);

  // ---------- middle ages ----------
  V.feudal = () => fig('How feudalism worked', 'The Norman system of land ownership', `<div class="pyramid">
    <div style="--p:40;width:34%"><b>The king</b><span>gave land to his lords</span></div>
    <div style="--p:28;width:56%"><b>Lords and landowners</b><span>in return helped in war and sent men to the army</span></div>
    <div style="--p:16;width:78%"><b>Peasants</b><span>some had their own land, but most were serfs</span></div>
    <div style="--p:8;width:100%"><b>Serfs</b><span>farmed a small area of the lord’s land, worked for him and could not move away</span></div>
  </div><p class="small muted" style="margin:0">The same system developed in southern Scotland. In the north of Scotland and in Ireland, land was owned by clans (prominent families).</p>`);

  const RIGHTS = [
    ['1215', 'Magna Carta', 'King John must accept that even the king is subject to the law'],
    ['1679', 'Habeas Corpus Act', 'No one can be held prisoner unlawfully; every prisoner has the right to a court hearing'],
    ['1689', 'Bill of Rights', 'Confirms the rights of Parliament and the limits of the king’s power'],
    ['1950', 'European Convention on Human Rights', 'The UK is one of the first countries to sign'],
    ['1998', 'Human Rights Act', 'Brings the Convention into UK law']
  ];
  V.magna = () => fig('Magna Carta: where British rights begin', 'Its ideas run through to today’s human rights law', flow(RIGHTS.slice(0, 3)));
  V.rightsline = () => fig('Roots of British rights', 'From the handbook: rights rooted in Magna Carta, Habeas Corpus and the Bill of Rights', flow(RIGHTS));

  V.words = () => fig('Two languages became one', 'Norman French + Anglo-Saxon = English', `<div class="words"><div><h4>From Norman French</h4><p>park · beauty · demand</p></div><div><h4>From Anglo-Saxon</h4><p>apple · cow · summer · ask</p></div></div><p class="small muted" style="margin:10px 0 0">Many English words come in pairs with similar meanings, one from each: <b>demand</b> (French) and <b>ask</b> (Anglo-Saxon).</p>`);

  const rose = (outer, inner, stroke) => {
    const petals = (r, d, fill) => [0, 72, 144, 216, 288].map((a) => { const rad = (a - 90) * Math.PI / 180; return `<circle cx="${(50 + d * Math.cos(rad)).toFixed(1)}" cy="${(50 + d * Math.sin(rad)).toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`; }).join('');
    return `<svg viewBox="0 0 100 100" aria-hidden="true">${petals(22, 24, outer)}${inner ? petals(13, 13, inner) : ''}<circle cx="50" cy="50" r="9" fill="#e2b33c" stroke="${stroke}" stroke-width="1.5"/></svg>`;
  };
  V.roses = () => fig('From two roses to one', '1455–1485', `<div class="rose-fig">
    <div>${rose('#c8102e', null, 'var(--ink)')}<b>House of Lancaster</b><span>Red rose</span></div>
    <div>${rose('#ffffff', null, 'var(--ink)')}<b>House of York</b><span>White rose</span></div>
    <div>${rose('#c8102e', '#ffffff', 'var(--ink)')}<b>House of Tudor</b><span>Red rose with a white rose inside</span></div>
  </div>${flow([
    ['1455', 'Civil war begins', 'To decide who should be king of England'],
    ['1485', 'Battle of Bosworth Field', 'King **Richard III** (York) is killed. **Henry Tudor** (Lancaster) becomes **Henry VII**.'],
    ['After 1485', 'The families united', 'Henry VII marries **Elizabeth of York**, Richard’s niece: the first king of the House of Tudor']
  ])}`);

  // ---------- Tudors & Stuarts ----------
  const REL = { Protestant: 'var(--c5)', Catholic: 'var(--c3)', Puritan: 'var(--ink-3)' };
  V.succession = () => {
    const from = window.RULERS.findIndex((r) => r.n === 'Henry VII');
    const to = window.RULERS.findIndex((r) => r.n === 'George II');
    const rows = window.RULERS.slice(from, to + 1);
    return fig('Who ruled, and which faith they followed', 'Scroll the line', `<div class="legend"><span><i style="--lc:var(--c5)"></i>Protestant</span><span><i style="--lc:var(--c3)"></i>Catholic</span><span><i style="--lc:var(--ink-3)"></i>Republic (Puritan-led)</span><span><i style="--lc:var(--muted-line)"></i>Before the break with Rome</span></div>
      <div class="ribbon">${rows.map((r) => `<div style="--rc:${r.rel ? REL[r.rel] : 'var(--muted-line)'}"><span class="h">${esc(r.house)}${r.from ? ` · ${r.from}` : ''}</span><b>${esc(r.n)}</b><small>${esc(r.note)}</small></div>`).join('')}</div>`, 'Henry VIII broke with Rome and founded the Church of England. Years shown are those the handbook gives.');
  };

  const WIVES = [
    ['Catherine of Aragon', 'Divorced', 'Spanish princess. Mother of Mary. Henry divorced her when she was too old to give him another child.'],
    ['Anne Boleyn', 'Executed', 'English. Mother of Elizabeth. Unpopular; accused of taking lovers; executed at the Tower of London.'],
    ['Jane Seymour', 'Died', 'Gave Henry the son he wanted, Edward, but died shortly after the birth.'],
    ['Anne of Cleves', 'Divorced', 'German princess, married for political reasons and divorced soon after.'],
    ['Catherine Howard', 'Executed', 'Cousin of Anne Boleyn. Also accused of taking lovers and executed.'],
    ['Catherine Parr', 'Survived', 'A widow who married Henry late in his life. She survived him and married again.']
  ];
  const FATE = { Divorced: 'var(--c5)', Executed: 'var(--c3)', Died: 'var(--ink-3)', Survived: 'var(--ok)' };
  V.wives = () => `<figure class="fig testable"><div class="fig-h"><h3>The six wives of Henry VIII</h3><div class="testme">${testBtn}</div></div>
    <div class="wives">${WIVES.map(([n, f, x], i) => `<div class="wife" data-reveal><span class="no">Wife ${i + 1}</span><b>${n}</b><span class="fate ans" style="--fc:${FATE[f]}">${f}</span><span>${x}</span></div>`).join('')}</div>
    <p class="mnemonic">“Divorced, executed, died; divorced, executed, survived.”</p><p class="fig-cap">Turn on “Test me” to hide each fate, then tap a card to check yourself.</p></figure>`;

  V.shakespeare = () => bio('William Shakespeare', `<div class="testable"><div class="testme" style="margin-bottom:8px"><b class="small">Famous lines – which play?</b>${testBtn}</div><div class="quote-grid">${[
    ['Once more unto the breach', 'Henry V'], ['To be or not to be', 'Hamlet'], ['A rose by any other name', 'Romeo and Juliet'],
    ['All the world’s a stage', 'As You Like It'], ['The darling buds of May', 'Sonnet 18 – Shall I Compare Thee To a Summer’s Day']
  ].map(([l, p]) => `<div class="qcard" data-reveal><p class="line">‘${l}’</p><span class="who ans">${p}</span></div>`).join('')}</div><p class="fig-cap">Many regard him as the greatest playwright of all time. The Globe Theatre in London is a modern copy of the theatres where his plays were first performed.</p></div>`);

  V.civilwar = () => fig('King against Parliament', 'The road to a republic and back', `<div class="compare">
    <div style="--tc:var(--c3)"><h3>Cavaliers</h3><ul><li>Supporters of King Charles I</li><li>The king believed in the Divine Right of Kings</li><li>Defeated at Marston Moor and Naseby</li></ul></div>
    <div style="--tc:var(--c5)"><h3>Roundheads</h3><ul><li>Supporters of Parliament</li><li>Many MPs were Puritans</li><li>Won the war by 1646</li></ul></div>
  </div>${flow([
    ['1640', 'Charles I recalls Parliament', 'He needs money to fight a Scottish army; Parliament refuses'],
    ['1641', 'Rebellion in Ireland', 'Catholics fear the Puritans’ growing power'],
    ['1642', 'Civil war begins', 'After Charles tries to arrest five MPs in the Commons'],
    ['1646', 'Parliament has won', 'Battles of Marston Moor and Naseby'],
    ['1649', 'Charles I executed', 'England becomes a republic: the Commonwealth'],
    ['1650s', 'Cromwell defeats Charles II', 'At Dunbar and Worcester. Cromwell becomes Lord Protector'],
    ['1658', 'Cromwell dies', 'His son Richard cannot hold power'],
    ['1660', 'The Restoration', 'Charles II returns from exile in the Netherlands']
  ])}`);

  // ---------- global power ----------
  V.burns = () => bio('Robert Burns', '<p class="small muted" style="margin:0">Auld Lang Syne is sung in the UK and other countries at New Year, called <b>Hogmanay</b> in Scotland.</p>');
  V.slavery = () => fig('The slave trade and its abolition', 'From booming trade to emancipation', flow([
    ['18th century', 'A fully established overseas industry', 'Slavery was illegal in Britain itself, but slaves from **West Africa** were shipped in horrible conditions to America and the Caribbean to work on **tobacco and sugar plantations**. Many escaped or revolted.'],
    ['Late 1700s', 'The Quakers organise', 'The first formal **anti-slavery groups** petition Parliament'],
    ['', 'William Wilberforce', 'Evangelical Christian MP who, with other **abolitionists**, turns public opinion against the trade'],
    ['1807', 'The slave trade is abolished', 'Illegal to trade slaves in British ships or from British ports'],
    ['1833', 'The Emancipation Act', 'Abolishes **slavery throughout the British Empire**. The Royal Navy stops other countries’ slave ships, frees slaves and punishes traders.'],
    ['After 1833', '2 million Indian and Chinese workers', 'Employed to replace freed slaves: Caribbean sugar plantations, South African mines, East African railways and the army in Kenya']
  ]));

  // Union flag builder
  V.unionflag = () => `<figure class="fig"><div class="fig-h"><h3>Build the Union Flag</h3><span class="muted">Tap each cross to add or remove it</span></div><div data-mount="unionflag"></div>
    <p class="fig-cap">Ireland unified with England, Scotland and Wales in 1801 (Act of Union of 1800), creating the United Kingdom of Great Britain and Ireland. The flag is often called the Union Jack. The official Welsh flag shows the Welsh dragon, which is not on the Union Flag because Wales was already united with England in 1606.</p></figure>`;
  const flagSvg = (g, a, p, cls) => {
    const field = a ? '#012169' : '#ffffff';
    let s = `<svg class="${cls || 'flag-svg'}" viewBox="0 0 60 30" aria-hidden="true"><defs><clipPath id="fs"><rect width="60" height="30"/></clipPath><clipPath id="ft"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath></defs><g clip-path="url(#fs)"><rect width="60" height="30" fill="${field}"/>`;
    if (a) s += '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>';
    if (p) s += a ? '<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ft)" stroke="#C8102E" stroke-width="4"/>' : '<path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="5"/>';
    if (g) s += (a || p ? '<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>' : '') + '<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>';
    return s + '</g></svg>';
  };
  App.MOUNT.unionflag = function (el) {
    const on = { g: true, a: true, p: true };
    const meta = [
      ['g', 'Cross of St George', 'England · red cross on a white ground'],
      ['a', 'Cross of St Andrew', 'Scotland · diagonal white cross on a blue ground'],
      ['p', 'Cross of St Patrick', 'Ireland · diagonal red cross on a white ground']
    ];
    function cap() {
      if (on.g && on.a && on.p) return 'All three crosses: today’s Union Flag (from 1801)';
      if (on.g && on.a && !on.p) return 'England + Scotland: the first Union Flag (1606)';
      if (on.g && !on.a && !on.p) return 'The flag of England';
      if (!on.g && on.a && !on.p) return 'The flag of Scotland';
      if (!on.g && !on.a && on.p) return 'The cross of St Patrick';
      if (!on.g && !on.a && !on.p) return 'Add a cross to start';
      return 'Not a real flag: try another combination';
    }
    function paint() {
      el.innerHTML = `<div class="flagbuild"><div>${flagSvg(on.g, on.a, on.p)}<p class="flag-cap" aria-live="polite">${cap()}</p></div>
        <div class="cross-btns">${meta.map(([k, n, x]) => `<button class="cross-btn" data-k="${k}" aria-pressed="${on[k]}">${flagSvg(k === 'g', k === 'a', k === 'p', 'mini')}<span><b>${n}</b><span>${x}</span></span></button>`).join('')}</div></div>`;
    }
    el.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) { on[b.dataset.k] = !on[b.dataset.k]; paint(); } });
    paint();
  };

  // ---------- right to vote ----------
  const VOTES = [
    [1800, 'Before 1832', 'Men over 21 who owned property', 'Pocket and rotten boroughs; no women'],
    [1832, '1832', 'Reform Act', 'Many more voters; boroughs abolished; seats moved to towns and cities'],
    [1867, '1867', 'Second Reform Act', 'Less property needed; more urban seats. Most men still could not vote'],
    [1918, '1918', 'Women over 30', 'And the right to stand for Parliament. Most Chartist reforms adopted'],
    [1928, '1928', 'Men and women over 21', 'Equal votes: the UK becomes fully democratic'],
    [1969, '1969', 'Everyone over 18', 'The voting age is lowered for men and women']
  ];
  V.vote = () => {
    const W = 640; const x0 = 30; const x1 = 610; const y0 = 1795; const y1 = 1975;
    const X = (y) => x0 + ((y - y0) / (y1 - y0)) * (x1 - x0);
    const ticks = [1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975].map((t) => `<line class="grid" x1="${X(t)}" x2="${X(t)}" y1="54" y2="66"/><text x="${X(t)}" y="82" text-anchor="middle">${t}</text>`).join('');
    const marks = VOTES.map(([y, d, t], i) => {
      const up = i % 2 === 0;
      return `<line class="grid" x1="${X(y)}" x2="${X(y)}" y1="${up ? 28 : 60}" y2="${up ? 60 : 92}" style="stroke:var(--accent)"/><circle cx="${X(y)}" cy="60" r="6" fill="var(--panel)" stroke="var(--accent)" stroke-width="3"/><text x="${X(y)}" y="${up ? 22 : 106}" text-anchor="middle" class="val">${y === 1800 ? 'pre-1832' : d}</text>`;
    }).join('');
    const svg = `<div class="chart scroll-x"><svg viewBox="0 0 ${W} 118" style="min-width:520px" role="img" aria-label="Timeline of the right to vote, 1800 to 1969"><line class="axis" x1="${x0}" x2="${x1}" y1="60" y2="60"/>${ticks}${marks}</svg></div>`;
    return fig('How the right to vote grew', 'Dates to scale', svg + flow(VOTES.map(([, d, t, x]) => [d, t, x])));
  };

  V.kipling = () => bio('Rudyard Kipling', `<p class="poem" style="font-size:1rem">‘If you can keep your head when all about you\nAre losing theirs and blaming it on you;\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too…’</p><p class="fig-cap">If, often voted among the UK’s favourite poems. His work reflected the idea that the Empire was a force for good.</p>`);

  // ---------- 20th century ----------
  V.ireland = () => fig('How Ireland was divided', '1913–1949, and what followed', flow([
    ['1913', 'Home Rule promised', 'A self-governing Ireland with its own parliament, still in the UK. Protestants in the north threaten to resist by force.'],
    ['1914', 'Changes postponed', 'Because of the First World War'],
    ['1916', 'The Easter Rising', 'Irish Nationalists rise in Dublin; the leaders are executed under military law. A guerrilla war follows.'],
    ['1921', 'Peace treaty signed', ''],
    ['1922', 'Two countries', 'Six mainly Protestant northern counties stay in the UK as **Northern Ireland**. The rest becomes the **Irish Free State**.'],
    ['1949', 'The Free State becomes a republic', ''],
    ['After 1969', '‘The Troubles’', 'Conflict between those wanting a single independent Ireland and those loyal to Britain; a terror campaign in Northern Ireland and elsewhere']
  ]));
  V.ww2 = () => fig('The Second World War, step by step', '1933–1945', flow([
    ['1933', 'Hitler comes to power in Germany', 'He thinks the post-WWI conditions unfair and wants more land. Britain tries to avoid war.'],
    ['1939', 'Germany invades Poland', 'Britain and France declare war'],
    ['1940', 'France falls; Churchill becomes PM', 'Germany has taken Austria, Czechoslovakia, Poland, Belgium and the Netherlands'],
    ['1940', 'Dunkirk', 'More than 300,000 men rescued, helped by civilian boats: ‘the Dunkirk spirit’'],
    ['Summer 1940', 'The Battle of Britain', 'The RAF’s Spitfires and Hurricanes win the air battle'],
    ['1940–41', 'The Blitz', 'Night bombing of London and other cities; Coventry almost totally destroyed: ‘the Blitz spirit’'],
    ['June 1940–June 1941', 'Britain stands almost alone', 'Until Germany invades the Soviet Union'],
    ['December 1941', 'The USA joins', 'After Japan bombs Pearl Harbour. Japan had beaten the British in Singapore and occupied Burma.'],
    ['1942–43', 'The tide turns', 'Allied victories in North Africa and Italy; heavy German losses in the Soviet Union'],
    ['6 June 1944', 'D-Day', 'Allied landings in Normandy, then on through France into Germany'],
    ['May 1945', 'Germany defeated', ''],
    ['August 1945', 'Japan defeated', 'After atom bombs on Hiroshima and Nagasaki. Rutherford’s team had first ‘split the atom’.']
  ]));
  V.churchill = () => bio('Winston Churchill', ['‘I have nothing to offer but blood, toil, tears and sweat’|First speech to the House of Commons as Prime Minister, 1940', '‘We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender’|Speech to the House of Commons after Dunkirk, 1940', '‘Never in the field of human conflict was so much owed by so many to so few’|Speech to the House of Commons during the Battle of Britain, 1940'].map((s) => { const [q, c] = s.split('|'); return `<div class="speech"><p>${q}</p><small>${c}</small></div>`; }).join(''));

  // ---------- since 1945 ----------
  const GOVTS = [
    [1945, 1951, 'lab', 'Labour', 'Attlee'], [1951, 1964, 'con', 'Conservative', 'Churchill, Macmillan'], [1964, 1979, 'gap', 'Not covered', ''],
    [1979, 1997, 'con', 'Conservative', 'Thatcher, Major'], [1997, 2010, 'lab', 'Labour', 'Blair, Brown'], [2010, 2015, 'coal', 'Coalition', 'Cameron'],
    [2015, 2024, 'con', 'Conservative', 'Cameron to Sunak'], [2024, 2026, 'lab', 'Labour', 'Starmer']
  ];
  V.govts = () => {
    const a = 1945; const b = 2026; const pct = (y) => ((y - a) / (b - a)) * 100;
    return fig('Governments since 1945', 'Widths to scale', `<div class="govt-ribbon"><div class="govt-bar" role="img" aria-label="Ribbon of governments from 1945 to today">${GOVTS.map(([f, t, c, n]) => `<div class="${c}" style="width:${pct(t) - pct(f)}%" title="${f}–${t}: ${n}">${t - f >= 9 ? n : ''}</div>`).join('')}</div>
      <div class="govt-axis">${[1945, 1960, 1975, 1990, 2005, 2020].map((y) => `<span style="left:${pct(y)}%">${y}</span>`).join('')}</div></div>
      <div class="govt-list">${[
        ['var(--lab)', '1945–51 Labour', 'Clement Attlee: NHS, welfare state, nationalisation'],
        ['var(--con)', '1951–64 Conservative', 'Churchill returns in 1951; Macmillan’s ‘wind of change’'],
        ['var(--con)', '1979–97 Conservative', 'Margaret Thatcher (1979–90), then John Major'],
        ['var(--lab)', '1997–2010 Labour', 'Tony Blair, then Gordon Brown from 2007'],
        ['var(--coal)', '2010–15 Coalition', 'Conservative and Liberal Democrat; David Cameron'],
        ['var(--con)', '2015–24 Conservative', 'Cameron, May, Johnson, Truss, Sunak'],
        ['var(--lab)', '2024– Labour', 'Keir Starmer wins a majority']
      ].map(([c, h, x]) => `<div style="--gc:${c}"><b>${h}</b><br>${x}</div>`).join('')}</div>`, 'The handbook does not cover 1964–1979 (hatched).');
  };
  V.giants = () => fig('The Beveridge Report (1942): five ‘Giant Evils’', 'The basis of the modern welfare state', `<div class="giants">${['Want', 'Disease', 'Ignorance', 'Squalor', 'Idleness'].map((g, i) => `<div><span>${i + 1} / 5</span><b>${g}</b></div>`).join('')}</div>`, 'Commissioned by the wartime government in 1941 and written by William Beveridge, later Lord Beveridge.');

  const INVENTIONS = [
    ['1920s', 'Television', 'John Logie Baird', 'Scottish; first broadcast London–Glasgow, 1932'],
    ['1930s', 'Turing machine', 'Alan Turing', 'Theoretical device behind computer science'],
    ['1930s', 'Jet engine', 'Sir Frank Whittle', 'RAF engineer officer'],
    ['1935', 'Radar', 'Sir Robert Watson-Watt', 'Scottish; detecting aircraft by radio waves'],
    ['After radar', 'Radio telescope', 'Sir Bernard Lovell', 'Jodrell Bank, Cheshire; once the world’s biggest'],
    ['—', 'Insulin (co-discovered)', 'John MacLeod', 'Scottish physician; treats diabetes'],
    ['1953', 'Structure of DNA', 'Francis Crick and others', 'London and Cambridge universities; Nobel Prize'],
    ['1950s', 'Hovercraft', 'Sir Christopher Cockerell', ''],
    ['1960s', 'Concorde', 'Britain and France', 'Supersonic airliner: flew 1969, passengers 1976–2003'],
    ['—', 'Harrier jump jet', 'Designed in the UK', 'Takes off vertically'],
    ['1967', 'Cash machine (ATM)', 'James Goodfellow', 'First used by Barclays in Enfield, north London'],
    ['1978', 'IVF', 'Sir Robert Edwards and Patrick Steptoe', 'First ‘test-tube baby’ born in Oldham, Lancashire'],
    ['—', 'MRI scanner (co-inventor)', 'Sir Peter Mansfield', 'Non-invasive images of internal organs'],
    ['1990', 'World Wide Web', 'Sir Tim Berners-Lee', 'First transfer on 25 December 1990'],
    ['1996', 'Dolly the sheep', 'Sir Ian Wilmut and Keith Campbell', 'The first cloned mammal']
  ];
  V.inventions = () => `<figure class="fig testable"><div class="fig-h"><h3>Invented or discovered in Britain</h3><div class="testme"><span class="muted small">Hide the inventors and quiz yourself</span>${testBtn}</div></div>
    <div class="inv-grid">${INVENTIONS.map(([w, t, who, x]) => `<div class="inv" data-reveal><span class="when">${w}</span><b>${t}</b><span class="ans"><strong>${who}</strong>${x ? ` · ${x}` : ''}</span></div>`).join('')}</div></figure>`;
})();

/* Illustrations: "how it works" diagrams for inventions and simple landmark drawings.
   All drawn with theme tokens so they work in light and dark; motion respects prefers-reduced-motion. */
(function () {
  const App = window.App;
  const svg = (vb, body, label) => `<svg class="art" viewBox="${vb}" role="img" aria-label="${label || ''}">${body}</svg>`;
  const lbl = (x, y, s, a) => `<text class="a-lbl" x="${x}" y="${y}" text-anchor="${a || 'middle'}">${s}</text>`;
  const arrowDefs = '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="a-arrowhead"/></marker></defs>';
  const sheep = (x, y, face, body) => `<g transform="translate(${x},${y})"><g class="${body || 'a-wool'}">${[[0, 0], [12, -4], [24, 0], [6, 8], [18, 8], [28, 6], [-4, 6]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="9"/>`).join('')}</g><ellipse cx="38" cy="-2" rx="7" ry="9" class="${face}"/><circle cx="40" cy="-4" r="1.3" class="a-eye"/><path d="M4 14v12M12 15v11M22 15v11M30 14v12" class="a-line"/></g>`;

  const ART = {};

  // ---------- inventions ----------
  ART.tv = {
    title: 'Television', who: 'John Logie Baird', when: '1920s',
    steps: ['A spinning disc with a spiral of holes scans the scene, one line at a time.', 'A light sensor behind the disc turns the brightness of each spot into an electrical signal.', 'The signal travels by wire or radio to the receiver.', 'In the receiver a lamp flickers in time with the signal behind a matching spinning disc, rebuilding the picture.'],
    svg: () => {
      const holes = Array.from({ length: 12 }, (_, i) => { const a = (i * 30 - 90) * Math.PI / 180; const r = 14 + i * 2.1; return `<circle cx="${(110 + r * Math.cos(a)).toFixed(1)}" cy="${(88 + r * Math.sin(a)).toFixed(1)}" r="2.6" class="a-hole"/>`; }).join('');
      return svg('0 0 320 175', `${arrowDefs}
        <circle cx="34" cy="88" r="18" class="a-skin"/><circle cx="28" cy="84" r="2" class="a-eye"/><circle cx="40" cy="84" r="2" class="a-eye"/><path d="M28 95q6 5 12 0" class="a-line"/>
        <path d="M54 80L70 84M54 96L70 92" class="a-ray"/>
        <g class="spin"><circle cx="110" cy="88" r="40" class="a-disc"/>${holes}<circle cx="110" cy="88" r="4" class="a-ink"/></g>
        <rect x="160" y="77" width="14" height="22" rx="3" class="a-ink"/>
        <path d="M176 88H222" class="a-wire flow"/>
        <rect x="224" y="50" width="86" height="76" rx="8" class="a-wood"/><rect x="234" y="60" width="52" height="52" rx="4" class="a-screen"/>
        <g class="a-glow flicker"><circle cx="260" cy="86" r="14"/></g>${[66, 72, 78, 84, 90, 96, 102, 108].map((y) => `<path d="M236 ${y}h48" class="a-scan"/>`).join('')}
        <circle cx="298" cy="72" r="4" class="a-ink"/><circle cx="298" cy="90" r="4" class="a-ink"/>
        <g class="lbls">${lbl(34, 124, 'Scene')}${lbl(110, 146, 'Spinning disc')}${lbl(167, 70, 'Sensor')}${lbl(199, 80, 'Signal')}${lbl(267, 142, 'Receiver')}</g>`, 'Baird’s mechanical television');
    }
  };
  ART.radar = {
    title: 'Radar', who: 'Sir Robert Watson-Watt', when: '1935',
    steps: ['A transmitter sends out short pulses of radio waves.', 'The waves bounce off an aircraft and an echo comes back.', 'The time the echo takes shows how far away the aircraft is; the direction of the aerial shows where it is.', 'The aircraft appears as a “blip” on a screen, even at night or in cloud.'],
    svg: () => svg('0 0 320 175', `
      <path d="M0 160H320" class="a-line"/>
      <path d="M30 160l12-22 12 22" class="a-line"/><path d="M22 128q20 22 40 0" class="a-dish"/><circle cx="42" cy="132" r="3" class="a-ink"/>
      ${[0, 0.6, 1.2].map((d) => `<path d="M60 124 A90 90 0 0 1 132 58" class="a-wave ping" style="animation-delay:${d}s;transform-origin:42px 132px"/>`).join('')}
      <g transform="translate(205,38) rotate(-8)"><path d="M0 10 L44 6 L56 0 L60 4 L50 12 L60 22 L56 24 L44 16 L0 14 Z" class="a-plane"/><path d="M24 8 L14 -6 L20 -6 L34 8 Z M24 14 L14 28 L20 28 L34 14 Z" class="a-plane"/></g>
      ${[0.3, 0.9].map((d) => `<path d="M196 70 A70 70 0 0 0 150 100" class="a-echo ping" style="animation-delay:${d}s;transform-origin:220px 48px"/>`).join('')}
      <circle cx="268" cy="122" r="34" class="a-radar"/><circle cx="268" cy="122" r="22" class="a-radar-ring"/><circle cx="268" cy="122" r="10" class="a-radar-ring"/>
      <g class="spin slow" style="transform-origin:268px 122px;transform-box:view-box"><path d="M268 122 L268 88" class="a-sweep"/></g><circle cx="284" cy="104" r="3.4" class="a-blip blink"/>
      <g class="lbls">${lbl(42, 174, 'Transmitter')}${lbl(110, 46, 'Pulse', 'end')}${lbl(150, 118, 'Echo')}${lbl(232, 30, 'Aircraft')}${lbl(268, 172, 'Screen')}</g>`, 'Radar pulses and echo')
  };
  ART.jet = {
    title: 'Jet engine', who: 'Sir Frank Whittle', when: '1930s',
    steps: ['Suck: a fan at the front draws air in.', 'Squeeze: the compressor squeezes the air tightly.', 'Bang: fuel is sprayed in and burnt, so the hot gas expands with great force.', 'Blow: the gas rushes out of the back, spinning a turbine on its way and pushing the aircraft forwards.'],
    svg: () => svg('0 0 360 160', `
      <path d="M14 38 L250 48 L340 66 L340 94 L250 112 L14 122 Z" class="a-shell"/>
      <path d="M30 44V116" class="a-ink-line thick"/>${[52, 62, 72, 82, 92, 102].map((y) => `<path d="M24 ${y}h14" class="a-ink-line"/>`).join('')}
      ${[70, 84, 98, 112, 126].map((x, i) => `<rect x="${x}" y="${50 + i * 4}" width="7" height="${60 - i * 8}" rx="2" class="a-metal"/>`).join('')}
      <path d="M144 62 H206 V98 H144 Z" class="a-chamber"/>
      <g class="flicker">${[150, 166, 182].map((x) => `<path d="M${x} 92 q6 -26 12 0 q-6 -10 -12 0" class="a-flame"/>`).join('')}</g>
      ${[214, 226].map((x) => `<rect x="${x}" y="58" width="7" height="44" rx="2" class="a-metal"/>`).join('')}
      ${[58, 70, 80, 90, 102].map((y) => `<path d="M0 ${y} H138" class="a-air flow"/>`).join('')}
      ${[72, 80, 88].map((y) => `<path d="M236 ${y} H356" class="a-hot flow fast"/>`).join('')}
      <g class="lbls">${lbl(30, 20, 'Suck')}${lbl(100, 20, 'Squeeze')}${lbl(175, 20, 'Bang')}${lbl(300, 20, 'Blow')}${lbl(30, 145, 'Fan')}${lbl(100, 145, 'Compressor')}${lbl(175, 145, 'Combustion')}${lbl(226, 128, 'Turbine')}</g>`, 'Jet engine cutaway')
  };
  ART.telescope = {
    title: 'Radio telescope', who: 'Sir Bernard Lovell', when: 'After radar',
    steps: ['Stars, galaxies and other objects in space give off faint radio waves.', 'The huge bowl-shaped dish collects the waves over a wide area.', 'The dish reflects them to a receiver held at its focus.', 'Computers turn the signals into maps of the sky. Lovell’s telescope at Jodrell Bank, Cheshire, was for many years the biggest in the world.'],
    svg: () => svg('0 0 320 180', `
      ${[[40, 22], [90, 12], [250, 18], [290, 40], [20, 60]].map(([x, y]) => `<path d="M${x} ${y - 6}L${x + 2} ${y - 2}L${x + 6} ${y}L${x + 2} ${y + 2}L${x} ${y + 6}L${x - 2} ${y + 2}L${x - 6} ${y}L${x - 2} ${y - 2}Z" class="a-star twinkle"/>`).join('')}
      ${[110, 160, 210].map((x) => `<path d="M${x} 10 q6 8 0 16 t0 16 t0 16 t0 16" class="a-wave flow"/>`).join('')}
      <path d="M70 92 Q160 160 250 92 Z" class="a-dishfill"/><path d="M70 92 Q160 160 250 92" class="a-dish"/>
      <path d="M90 104 L160 64 L230 104" class="a-line"/><rect x="152" y="54" width="16" height="14" rx="2" class="a-ink"/>
      <path d="M110 122 L92 168 M210 122 L228 168 M100 150 H220" class="a-line"/><path d="M60 168 H300" class="a-line"/>
      <path d="M168 62 Q250 70 262 140" class="a-wire flow"/><rect x="250" y="140" width="40" height="28" rx="3" class="a-wood"/><rect x="256" y="145" width="28" height="15" class="a-screen"/>
      <g class="lbls">${lbl(160, 8, 'Radio waves from space')}${lbl(80, 132, 'Dish', 'end')}${lbl(160, 48, 'Receiver')}${lbl(270, 134, 'Computer')}</g>`, 'Radio telescope dish')
  };
  ART.turing = {
    title: 'Turing machine', who: 'Alan Turing', when: '1930s',
    steps: ['An imaginary machine reads a long tape divided into squares.', 'Each square holds a symbol, such as 0 or 1.', 'Following a short list of rules, the head reads a symbol, writes a new one and moves left or right.', 'Turing showed that a machine like this can carry out any calculation: the idea behind every modern computer.'],
    svg: () => {
      const cells = ['1', '0', '1', '1', '0', '0', '1', '0', '1'];
      return svg('0 0 320 160', `
        <rect x="14" y="14" width="150" height="46" rx="6" class="a-card"/>${lbl(89, 33, 'Rule: read 1 → write 0,')}${lbl(89, 49, 'then move right')}
        ${cells.map((c, i) => `<rect x="${20 + i * 31}" y="104" width="29" height="30" rx="3" class="a-cell"/><text x="${34.5 + i * 31}" y="125" class="a-sym" text-anchor="middle">${c}</text>`).join('')}
        <text x="8" y="125" class="a-sym" text-anchor="middle">…</text><text x="312" y="125" class="a-sym" text-anchor="middle">…</text>
        <g class="head-move"><path d="M98 64 h34 v22 l-17 14 l-17 -14 z" class="a-headbox"/><text x="115" y="81" class="a-sym small" text-anchor="middle">R/W</text></g>
        <g class="lbls">${lbl(160, 152, 'Tape of squares')}${lbl(240, 80, 'Read/write head moves', 'middle')}</g>`, 'Turing machine tape and head');
    }
  };
  ART.insulin = {
    title: 'Insulin', who: 'John MacLeod (co-discoverer)', when: '',
    steps: ['Insulin is a hormone made in the pancreas.', 'It works like a key, letting the body’s cells take in sugar from the blood for energy.', 'In diabetes the body does not make or use enough insulin, so sugar builds up in the blood.', 'Injections of insulin keep blood sugar under control.'],
    svg: () => svg('0 0 320 160', `${arrowDefs}
      <rect x="20" y="40" width="34" height="70" rx="6" class="a-glass"/><rect x="26" y="30" width="22" height="12" rx="2" class="a-ink"/><rect x="20" y="70" width="34" height="40" rx="0" class="a-liquid"/>${lbl(37, 130, 'Insulin')}
      <path d="M70 20 Q160 0 250 20 V140 Q160 160 70 140 Z" class="a-vessel"/>
      ${[[100, 50], [130, 92], [160, 46], [118, 120], [180, 108]].map(([x, y], i) => `<path d="M${x} ${y - 7} l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7z" class="a-sugar drift" style="animation-delay:${i * 0.4}s"/>`).join('')}
      <circle cx="262" cy="84" r="44" class="a-cell-body"/><circle cx="270" cy="74" r="12" class="a-nucleus"/>
      <rect x="214" y="72" width="10" height="24" rx="2" class="a-door"/>
      <g transform="translate(196,60)"><circle cx="0" cy="0" r="6" class="a-key"/><path d="M6 0 H18 V5 M14 0 V4" class="a-keyline"/></g>
      <path d="M186 84 H210" class="a-line" marker-end="url(#ah)"/>
      <g class="lbls">${lbl(160, 14, 'Sugar in the blood')}${lbl(262, 146, 'Body cell')}${lbl(200, 48, 'Key')}</g>`, 'Insulin lets sugar into cells')
  };
  ART.dna = {
    title: 'Structure of DNA', who: 'Francis Crick and others', when: '1953',
    steps: ['DNA is the molecule that carries the instructions for every living thing.', 'Its shape is a “double helix”: two strands twisted like a spiral staircase.', 'The “steps” are pairs of chemical bases that spell out the genetic code.', 'Knowing the structure led to many advances, especially in medicine and in fighting crime.'],
    svg: () => {
      const P = 80; const W = 320; const A = 34; const cy = 80;
      const pts = (ph) => { let d = ''; for (let x = -P; x <= W + P; x += 4) { const y = cy + A * Math.sin(((x / P) * 2 * Math.PI) + ph); d += `${x === -P ? 'M' : 'L'}${x},${y.toFixed(1)}`; } return d; };
      const cols = ['a-b1', 'a-b2', 'a-b3', 'a-b4'];
      let rungs = '';
      for (let x = -P; x <= W + P; x += 10) { const y1 = cy + A * Math.sin((x / P) * 2 * Math.PI); const y2 = cy + A * Math.sin((x / P) * 2 * Math.PI + Math.PI); rungs += `<path d="M${x} ${y1.toFixed(1)}V${y2.toFixed(1)}" class="${cols[Math.abs(Math.round(x / 10)) % 4]}"/>`; }
      return svg('0 0 320 175', `<defs><clipPath id="dnaclip"><rect x="0" y="0" width="320" height="160"/></clipPath></defs><g clip-path="url(#dnaclip)"><g class="dna-scroll">${rungs}<path d="${pts(0)}" class="a-strand"/><path d="${pts(Math.PI)}" class="a-strand two"/></g></g>
        <g class="lbls">${lbl(60, 172, 'Strand')}${lbl(160, 172, 'Base pairs (the code)')}${lbl(270, 172, 'Double helix')}</g>`, 'DNA double helix');
    }
  };
  ART.hovercraft = {
    title: 'Hovercraft', who: 'Sir Christopher Cockerell', when: '1950s',
    steps: ['A powerful fan blows air down underneath the craft.', 'A flexible rubber “skirt” around the edge traps the air, making a cushion.', 'The craft floats on this cushion just above land or water, so there is very little friction.', 'Propellers push it forwards.'],
    svg: () => svg('0 0 320 175', `${arrowDefs}
      <path d="M0 140 q20 -8 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V175 H0 Z" class="a-water"/>
      <g class="bob"><path d="M58 108 Q50 130 70 132 H250 Q270 130 262 108 Z" class="a-skirt"/>
        <rect x="64" y="72" width="192" height="38" rx="10" class="a-hull"/>${[110, 132, 154, 176].map((x) => `<rect x="${x}" y="80" width="16" height="10" rx="2" class="a-window"/>`).join('')}
        <ellipse cx="208" cy="70" rx="20" ry="6" class="a-metal"/>${[-1, 0, 1].map((i) => `<path d="M${208 + i * 8} 76 V96" class="a-air flow" marker-end="url(#ah)"/>`).join('')}
        <g transform="translate(86,48)"><circle r="18" class="a-prop-ring"/><g class="spin fast"><path d="M0 -16 V16 M-16 0 H16" class="a-ink-line thick"/></g></g>
        ${[118, 126].map((y) => `<path d="M80 ${y} H240" class="a-air flow"/>`).join('')}</g>
      <path d="M60 48 H14" class="a-air flow" marker-end="url(#ah)"/>
      <g class="lbls">${lbl(208, 56, 'Lift fan')}${lbl(86, 22, 'Propeller')}${lbl(160, 162, 'Cushion of air')}${lbl(284, 126, 'Skirt', 'middle')}</g>`, 'Hovercraft on a cushion of air')
  };
  ART.concorde = {
    title: 'Concorde', who: 'Britain and France', when: '1969',
    steps: ['A supersonic airliner: it flew faster than the speed of sound.', 'Its slim triangular “delta” wings suited very high speeds.', 'The long nose drooped down for take-off and landing so the pilots could see the runway.', 'It carried passengers from 1976 until it was retired in 2003.'],
    svg: () => svg('0 0 360 150', `
      ${[0, 1, 2, 3].map((i) => `<path d="M${46 - i * 4} ${78 - 26 - i * 10} A${30 + i * 12} ${30 + i * 12} 0 0 0 ${46 - i * 4} ${78 + 26 + i * 10}" class="a-wave shock" style="animation-delay:${i * 0.25}s"/>`).join('')}
      <path d="M40 78 L120 36 M40 78 L120 120" class="a-shockline"/>
      <path d="M40 78 Q60 70 90 70 L300 66 Q330 66 340 74 L300 82 L90 84 Q60 84 40 78 Z" class="a-plane"/>
      <path d="M150 82 L270 82 L300 112 L250 112 Z" class="a-wing"/><path d="M290 66 L318 30 L330 30 L320 68 Z" class="a-plane"/>
      ${[205, 222, 239, 256].map((x) => `<rect x="${x}" y="84" width="14" height="10" rx="2" class="a-metal"/>`).join('')}
      <path d="M40 78 Q52 86 66 82" class="a-droop"/>
      <g class="lbls">${lbl(230, 132, 'Delta wing')}${lbl(46, 112, 'Drooping nose', 'start')}${lbl(110, 24, 'Shock wave: faster than sound')}</g>`, 'Concorde supersonic airliner')
  };
  ART.harrier = {
    title: 'Harrier jump jet', who: 'Designed in the UK', when: '',
    steps: ['The engine’s thrust comes out of four nozzles that can swivel.', 'Pointing the nozzles down lifts the aircraft straight up: vertical take-off.', 'Swivelling them backwards pushes it forwards like a normal jet.', 'It can take off from small clearings or ships instead of long runways.'],
    svg: () => svg('0 0 320 175', `${arrowDefs}
      <path d="M0 165 H320" class="a-line"/>
      <g class="harrier-body"><path d="M40 70 Q60 58 100 60 L250 62 Q270 62 280 70 L250 78 L100 80 Q60 80 40 70 Z" class="a-plane"/>
        <path d="M120 66 L210 40 L222 42 L170 70 Z M246 62 L270 34 L280 36 L266 64 Z" class="a-wing"/>
        ${[130, 180].map((x) => `<g class="nozzle" style="transform-origin:${x}px 82px"><rect x="${x - 6}" y="78" width="12" height="20" rx="3" class="a-metal"/><path d="M${x} 102 V136" class="a-hot flow" marker-end="url(#ah)"/></g>`).join('')}</g>
      <g class="lbls">${lbl(155, 156, 'Swivelling nozzles: thrust down = vertical take-off')}</g>`, 'Harrier jump jet nozzles')
  };
  ART.atm = {
    title: 'Cash machine (ATM)', who: 'James Goodfellow', when: '1967',
    steps: ['You put in a bank card that identifies your account.', 'You type a secret PIN (personal identification number) to prove it is you.', 'The machine checks with the bank’s computer that there is enough money.', 'It counts out the cash. The first was used by Barclays in Enfield, north London, in 1967.'],
    svg: () => svg('0 0 280 180', `
      <rect x="40" y="10" width="200" height="160" rx="10" class="a-wood"/>
      <rect x="62" y="24" width="96" height="62" rx="4" class="a-screen"/><text x="110" y="52" class="a-screen-text" text-anchor="middle">ENTER PIN</text><text x="110" y="70" class="a-screen-text" text-anchor="middle">* * * *</text>
      ${Array.from({ length: 12 }, (_, i) => `<rect x="${70 + (i % 3) * 28}" y="${96 + Math.floor(i / 3) * 16}" width="22" height="12" rx="2" class="a-key"/>`).join('')}
      <rect x="172" y="40" width="50" height="6" rx="2" class="a-ink"/><g class="card-in"><rect x="178" y="14" width="38" height="28" rx="3" class="a-cardbank"/></g>
      <rect x="170" y="120" width="56" height="8" rx="2" class="a-ink"/><g class="cash-out"><rect x="176" y="124" width="44" height="22" rx="2" class="a-note"/><text x="198" y="139" class="a-sym small" text-anchor="middle">£</text></g>
      <g class="lbls">${lbl(197, 8, 'Card')}${lbl(110, 175, 'Keypad for PIN')}${lbl(258, 128, 'Cash', 'middle')}</g>`, 'Cash machine')
  };
  ART.ivf = {
    title: 'IVF', who: 'Sir Robert Edwards and Patrick Steptoe', when: '1978',
    steps: ['IVF means in-vitro fertilisation: fertilisation “in glass”, outside the body.', 'An egg and sperm are brought together in a laboratory dish.', 'The fertilised egg divides into two cells, then four, then more: an early embryo.', 'The embryo is placed in the mother’s womb to grow. The first “test-tube baby” was born in Oldham in 1978.'],
    svg: () => svg('0 0 300 170', `
      <ellipse cx="150" cy="112" rx="120" ry="38" class="a-glass"/><ellipse cx="150" cy="106" rx="112" ry="32" class="a-liquid soft"/>
      <path d="M150 10 V54" class="a-pipette"/><path d="M144 54 L150 70 L156 54 Z" class="a-ink"/>
      <g class="stage s1"><circle cx="150" cy="104" r="20" class="a-egg"/></g>
      <g class="stage s2"><circle cx="140" cy="104" r="12" class="a-egg"/><circle cx="160" cy="104" r="12" class="a-egg"/></g>
      <g class="stage s3"><circle cx="140" cy="96" r="9" class="a-egg"/><circle cx="160" cy="96" r="9" class="a-egg"/><circle cx="140" cy="113" r="9" class="a-egg"/><circle cx="160" cy="113" r="9" class="a-egg"/></g>
      <g class="lbls">${lbl(150, 164, 'Laboratory dish: 1 cell → 2 → 4')}</g>`, 'IVF in a laboratory dish')
  };
  ART.mri = {
    title: 'MRI scanner', who: 'Sir Peter Mansfield (co-inventor)', when: '',
    steps: ['The patient lies inside a large, very strong magnet.', 'The magnet lines up tiny particles in the water in the body.', 'Radio pulses knock them out of line; as they settle back they give off signals.', 'A computer turns the signals into detailed pictures of the organs inside, without surgery.'],
    svg: () => svg('0 0 320 170', `
      <rect x="40" y="20" width="130" height="130" rx="22" class="a-shell"/><circle cx="105" cy="85" r="36" class="a-bore"/>
      ${[50, 58].map((r, i) => `<circle cx="105" cy="85" r="${r}" class="a-field ${i ? 'ping' : ''}"/>`).join('')}
      <rect x="10" y="104" width="180" height="10" rx="3" class="a-metal"/><g class="slide"><ellipse cx="74" cy="98" rx="11" ry="9" class="a-skin"/><rect x="84" y="92" width="60" height="12" rx="6" class="a-skin"/></g>
      <path d="M176 60 H210" class="a-wire flow"/><rect x="212" y="30" width="96" height="90" rx="6" class="a-wood"/><rect x="220" y="38" width="80" height="62" rx="3" class="a-screen"/>
      <ellipse cx="260" cy="69" rx="26" ry="22" class="a-scanimg"/><path d="M260 49 V89 M240 62 q20 10 40 0 M242 78 q18 -8 36 0" class="a-scanline"/>
      <g class="lbls">${lbl(105, 14, 'Strong magnet')}${lbl(105, 134, 'Patient')}${lbl(260, 114, 'Picture of the organ')}</g>`, 'MRI scanner')
  };
  ART.web = {
    title: 'World Wide Web', who: 'Sir Tim Berners-Lee', when: '25 December 1990',
    steps: ['Web pages are stored on computers called servers, connected through the internet.', 'Every page has an address and can link to any other page.', 'Clicking a link asks the server for that page, and your browser shows it.', 'Information was first transferred via the web on 25 December 1990.'],
    svg: () => {
      const comp = (x, y, l) => `<g transform="translate(${x},${y})"><rect x="-34" y="-26" width="68" height="46" rx="4" class="a-wood"/><rect x="-28" y="-20" width="56" height="34" rx="2" class="a-page"/><path d="M-22 -12 h30 M-22 -4 h44 M-22 4 h20" class="a-text"/><path d="M0 4 h22" class="a-link"/><path d="M-10 20 h20 v8 h-20z" class="a-ink"/></g>${lbl(x, y + 42, l)}`;
      return svg('0 0 320 180', `
        <path id="w1" d="M70 60 L250 60" class="a-net"/><path d="M70 60 L160 140" class="a-net"/><path d="M250 60 L160 140" class="a-net"/>
        ${['M70 60 L250 60', 'M250 60 L160 140', 'M160 140 L70 60'].map((d, i) => `<circle r="4" class="a-packet"><animateMotion dur="3s" begin="${i}s" repeatCount="indefinite" path="${d}"/></circle>`).join('')}
        ${comp(70, 52, 'Server')}${comp(250, 52, 'Server')}${comp(160, 130, 'Your browser')}
        <g class="lbls">${lbl(160, 48, 'Links join pages')}</g>`, 'Linked web pages on servers');
    }
  };
  ART.dolly = {
    title: 'Dolly the sheep', who: 'Sir Ian Wilmut and Keith Campbell', when: '1996',
    steps: ['A cell was taken from sheep A.', 'An egg was taken from sheep B and its nucleus (its DNA) removed.', 'The two were joined using a tiny electric pulse and grew into an embryo.', 'Sheep C gave birth to Dolly, a genetic copy of sheep A: the first cloned mammal.'],
    svg: () => svg('0 0 360 175', `${arrowDefs}
      ${sheep(20, 40, 'a-face-white')}${lbl(40, 82, 'Sheep A: body cell')}
      ${sheep(20, 120, 'a-face-black')}${lbl(40, 162, 'Sheep B: empty egg')}
      <path d="M86 44 L132 76 M86 124 L132 96" class="a-line" marker-end="url(#ah)"/>
      <circle cx="150" cy="86" r="16" class="a-egg"/><circle cx="150" cy="86" r="6" class="a-nucleus"/><path d="M146 62 l6 -10 l-2 8 l6 -2 l-8 12 l2 -8z" class="a-zap blink"/>${lbl(150, 122, 'Embryo')}
      <path d="M170 86 H206" class="a-line" marker-end="url(#ah)"/>
      ${sheep(216, 86, 'a-face-black')}${lbl(236, 128, 'Sheep C gives birth')}
      <path d="M266 86 H286" class="a-line" marker-end="url(#ah)"/>
      <g class="bob">${sheep(296, 90, 'a-face-white', 'a-wool small')}</g>${lbl(318, 128, 'Dolly')}`, 'How Dolly the sheep was cloned')
  };
  ART.steam = {
    title: 'Steam power', who: 'James Watt’s work', when: '18th century',
    steps: ['Burning coal heats water in a boiler, turning it into steam.', 'The steam pushes a piston along a cylinder, first one way and then back.', 'A rod links the piston to a wheel, turning the push into spinning.', 'The spinning wheel drives machines in mills and mines, and later trains and ships.'],
    svg: () => svg('0 0 320 175', `
      <rect x="20" y="70" width="90" height="70" rx="30" class="a-metal"/><path d="M30 150 q10 -24 20 0 q10 -24 20 0 q10 -24 20 0" class="a-flame flicker"/>
      <path d="M100 82 H140 V96" class="a-pipe"/><rect x="132" y="96" width="80" height="30" rx="4" class="a-shell"/>
      <g class="piston"><rect x="150" y="99" width="12" height="24" class="a-ink"/><path d="M162 111 H232" class="a-ink-line thick"/></g>
      <g class="spin" style="transform-origin:262px 111px;transform-box:view-box"><circle cx="262" cy="111" r="36" class="a-wheel"/><path d="M262 75 V147 M226 111 H298 M237 86 L287 136 M287 86 L237 136" class="a-spoke"/></g>
      ${[0, 0.7, 1.4].map((d) => `<circle cx="60" cy="56" r="8" class="a-steam rise" style="animation-delay:${d}s"/>`).join('')}
      <g class="lbls">${lbl(65, 166, 'Boiler and fire')}${lbl(172, 90, 'Cylinder and piston')}${lbl(262, 166, 'Flywheel')}${lbl(60, 30, 'Steam')}</g>`, 'Steam engine')
  };
  ART.rocket = {
    title: 'Railway engine', who: 'George and Robert Stephenson', when: 'Before 1837',
    steps: ['A coal fire in the firebox boils water in the boiler.', 'Steam drives pistons that turn the large wheels.', 'The engine pulls carriages along iron rails.', 'Railways spread across Britain and the Empire in the Victorian period.'],
    svg: () => svg('0 0 320 165', `
      <path d="M0 150 H320" class="a-rail"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${i * 20}" y="150" width="10" height="6" class="a-sleeper"/>`).join('')}
      <rect x="70" y="72" width="130" height="40" rx="20" class="a-loco" transform="rotate(-8 135 92)"/><rect x="186" y="56" width="50" height="62" rx="4" class="a-wood"/>
      <rect x="80" y="18" width="14" height="60" class="a-ink"/><rect x="74" y="12" width="26" height="10" rx="2" class="a-ink"/>
      ${[0, 0.6, 1.2].map((d) => `<circle cx="88" cy="4" r="9" class="a-steam rise" style="animation-delay:${d}s"/>`).join('')}
      <g class="spin slow" style="transform-origin:130px 122px;transform-box:view-box"><circle cx="130" cy="122" r="27" class="a-wheel"/><path d="M130 95 V149 M103 122 H157 M111 103 L149 141 M149 103 L111 141" class="a-spoke"/></g>
      <g class="spin slow" style="transform-origin:220px 134px;transform-box:view-box"><circle cx="220" cy="134" r="15" class="a-wheel"/><path d="M220 119 V149 M205 134 H235" class="a-spoke"/></g>
      <g class="lbls">${lbl(150, 54, 'Boiler')}${lbl(211, 50, 'Driver')}${lbl(130, 164, 'Driving wheel')}</g>`, 'Early steam locomotive')
  };
  ART.penicillin = {
    title: 'Penicillin', who: 'Alexander Fleming', when: '1928',
    steps: ['Bacteria were growing on a laboratory dish.', 'A mould landed on the dish.', 'No bacteria grew around the mould: it made a substance that killed them.', 'Howard Florey and Ernst Chain turned it into a usable drug, mass-produced by the 1940s.'],
    svg: () => {
      let dots = '';
      for (let i = 0; i < 140; i++) { const a = i * 2.39996; const r = 8 * Math.sqrt(i); const x = 140 + r * Math.cos(a) * 1.25; const y = 84 + r * Math.sin(a) * 0.85; const dx = x - 112; const dy = y - 72; if (Math.hypot(dx / 1.25, dy / 0.85) < 44 || Math.hypot((x - 140) / 1.25, (y - 84) / 0.85) > 86) continue; dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" class="a-bacteria"/>`; }
      return svg('0 0 280 175', `<ellipse cx="140" cy="84" rx="118" ry="78" class="a-glass"/><ellipse cx="140" cy="84" rx="110" ry="72" class="a-agar"/>${dots}
        <ellipse cx="112" cy="72" rx="44" ry="34" class="a-zone"/>${[[104, 66, 14], [118, 76, 11], [108, 82, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" class="a-mould"/>`).join('')}
        <g class="lbls">${lbl(112, 40, 'Mould')}${lbl(112, 120, 'No bacteria here')}${lbl(214, 52, 'Bacteria')}</g>`, 'Penicillin mould on a dish');
    }
  };

  // ---------- landmarks ----------
  const LM = {};
  LM['big-ben'] = () => svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><rect x="0" y="92" width="200" height="38" class="a-stone dark"/>${[0, 20, 40, 130, 150, 170].map((x) => `<rect x="${x}" y="70" width="18" height="40" class="a-stone"/><path d="M${x} 70 l9 -8 l9 8" class="a-stone"/>`).join('')}<rect x="80" y="30" width="40" height="80" class="a-stone"/><rect x="76" y="28" width="48" height="6" class="a-stone dark"/><circle cx="100" cy="46" r="13" class="a-clock"/><path d="M100 46 V38 M100 46 H106" class="a-ink-line"/><path d="M84 28 L100 4 L116 28 Z" class="a-stone dark"/><path d="M0 110 H200" class="a-line"/>`, 'Big Ben and the Houses of Parliament');
  LM['giants-causeway'] = () => { let h = ''; const hex = (x, y, r, cls) => `<path d="M${x - r} ${y} l${r / 2} ${-r * 0.87} h${r} l${r / 2} ${r * 0.87} l${-r / 2} ${r * 0.87} h${-r} z" class="${cls}"/>`; [[30, 70], [56, 62], [82, 74], [108, 66], [134, 78], [160, 70], [44, 90], [70, 86], [96, 96], [122, 90], [148, 100], [174, 94]].forEach(([x, y], i) => { const top = y - 10 - (i % 3) * 6; h += `<rect x="${x - 13}" y="${top}" width="26" height="${130 - top}" class="a-basalt ${i % 2 ? 'dark' : ''}"/>${hex(x, top, 13, 'a-basalt-top')}`; }); return svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><path d="M0 60 q25 -6 50 0 t50 0 t50 0 t50 0 V130 H0 Z" class="a-sea"/>${h}`, 'Giant’s Causeway basalt columns'); };
  LM['edinburgh-castle'] = () => svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><path d="M0 130 L20 96 L60 84 L90 70 L150 72 L180 92 L200 130 Z" class="a-rock"/><rect x="58" y="50" width="96" height="24" class="a-stone"/>${[58, 74, 90, 106, 122, 138].map((x) => `<rect x="${x}" y="44" width="10" height="8" class="a-stone"/>`).join('')}<rect x="98" y="30" width="22" height="22" class="a-stone dark"/><path d="M98 30 l11 -10 l11 10z" class="a-stone dark"/><rect x="66" y="56" width="6" height="10" class="a-window dark"/><rect x="136" y="56" width="6" height="10" class="a-window dark"/>`, 'Edinburgh Castle on its rock');
  LM['eden-project'] = () => { const dome = (cx, r) => { let p = `<path d="M${cx - r} 104 A${r} ${r} 0 0 1 ${cx + r} 104 Z" class="a-dome"/>`; for (let i = 1; i < 6; i++) { const a = Math.PI * i / 6; p += `<path d="M${cx} 104 L${(cx - r * Math.cos(a)).toFixed(1)} ${(104 - r * Math.sin(a)).toFixed(1)}" class="a-dome-line"/>`; } p += `<path d="M${cx - r * 0.7} 104 A${r * 0.7} ${r * 0.7} 0 0 1 ${cx + r * 0.7} 104" class="a-dome-line"/><path d="M${cx - r * 0.38} 104 A${r * 0.38} ${r * 0.38} 0 0 1 ${cx + r * 0.38} 104" class="a-dome-line"/>`; return p; }; return svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><path d="M0 104 H200 V130 H0 Z" class="a-grass"/>${dome(64, 46)}${dome(138, 34)}${dome(178, 22)}`, 'Eden Project biomes'); };
  LM.snowdon = () => svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><path d="M0 130 L50 60 L76 82 L112 22 L150 76 L170 58 L200 96 V130 Z" class="a-mountain"/><path d="M98 44 L112 22 L126 44 L118 40 L112 48 L104 40 Z" class="a-snow"/><path d="M0 130 L40 98 L80 112 L130 96 L200 120 V130 Z" class="a-grass"/>`, 'Snowdon, the highest mountain in Wales');
  LM['loch-lomond'] = () => svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><path d="M0 84 L40 40 L70 66 L110 30 L150 62 L200 44 V90 H0 Z" class="a-mountain"/><path d="M0 84 H200 V130 H0 Z" class="a-sea"/><ellipse cx="70" cy="100" rx="20" ry="5" class="a-grass"/><ellipse cx="140" cy="112" rx="14" ry="4" class="a-grass"/><path d="M0 84 q50 4 100 0 t100 0" class="a-line"/>`, 'Loch Lomond');
  LM['tower-of-london'] = () => svg('0 0 200 130', `<rect x="0" y="0" width="200" height="130" class="a-sky"/><rect x="0" y="100" width="200" height="30" class="a-grass"/><rect x="10" y="84" width="180" height="20" class="a-stone dark"/><rect x="56" y="40" width="88" height="62" class="a-stone"/>${[56, 132].map((x) => `<rect x="${x - 4}" y="26" width="20" height="20" class="a-stone"/><path d="M${x - 4} 26 q10 -16 20 0z" class="a-cupola"/>`).join('')}${[62, 82, 102, 122].map((x) => `<rect x="${x}" y="58" width="8" height="12" rx="4" class="a-window dark"/>`).join('')}`, 'The White Tower, Tower of London');
  LM['lake-district'] = null;

  App.ART = ART;
  App.LANDMARK_ART = LM;
  App.artSvg = (k) => (ART[k] ? ART[k].svg() : LM[k] ? LM[k]() : '');
})();

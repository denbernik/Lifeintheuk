/* Nations, cities and points of interest. Coordinates are [lat, lon]. */
(function () {
  const NATIONS = {
    england: {
      name: 'England', capital: 'London', saint: 'St George', saintDay: '23 April',
      saintHoliday: 'Not a public holiday, but still celebrated with parades and festivals',
      flower: 'Rose', food: 'Roast beef with Yorkshire puddings; fish and chips',
      flag: 'Cross of St George: red cross on a white ground',
      share: '84%', language: 'English (many accents and dialects)',
      legislature: 'No separate parliament. Governed by the UK Parliament at Westminster.',
      church: 'Church of England (Anglican) is the established Church; the monarch is its head.',
      cities: ['London', 'Birmingham', 'Liverpool', 'Leeds', 'Sheffield', 'Bristol', 'Manchester', 'Bradford', 'Newcastle upon Tyne', 'Plymouth', 'Southampton', 'Norwich']
    },
    scotland: {
      name: 'Scotland', capital: 'Edinburgh', saint: 'St Andrew', saintDay: '30 November',
      saintHoliday: 'An official holiday (not all businesses close)',
      flower: 'Thistle', food: 'Haggis: sheep’s stomach stuffed with offal, suet, onions and oatmeal',
      flag: 'Cross of St Andrew: diagonal white cross on a blue ground',
      share: 'just over 8%', language: 'English; Gaelic in parts of the Highlands and Islands; the Scots language',
      legislature: 'Scottish Parliament at Holyrood, Edinburgh (since 1999): 129 MSPs elected by proportional representation.',
      church: 'Church of Scotland (Presbyterian) is the national Church. It is not a state Church.',
      cities: ['Edinburgh', 'Glasgow', 'Dundee', 'Aberdeen']
    },
    wales: {
      name: 'Wales', capital: 'Cardiff', saint: 'St David', saintDay: '1 March',
      saintHoliday: 'Not a public holiday, but still celebrated with parades and festivals',
      flower: 'Daffodil', food: 'Welsh cakes: flour, dried fruits and spices, served hot or cold',
      flag: 'The Welsh dragon. It is not on the Union Flag because Wales was already united with England in 1606.',
      share: 'around 5%', language: 'English and Welsh (a completely different language, taught in schools and universities)',
      legislature: 'Welsh Government and National Assembly (the Senedd) in Cardiff Bay (since 1999): 60 AMs elected every four years by proportional representation.',
      church: 'No established Church.',
      cities: ['Cardiff', 'Swansea', 'Newport']
    },
    ni: {
      name: 'Northern Ireland', capital: 'Belfast', saint: 'St Patrick', saintDay: '17 March',
      saintHoliday: 'An official holiday',
      flower: 'Shamrock', food: 'Ulster fry: bacon, eggs, sausage, black and white pudding, tomatoes, mushrooms, soda bread and potato bread',
      flag: 'Represented on the Union Flag by the cross of St Patrick: diagonal red cross on a white ground',
      share: 'less than 3%', language: 'English; some people speak Irish Gaelic',
      legislature: 'Northern Ireland Assembly at Stormont, Belfast (after the 1998 Good Friday Agreement): 90 MLAs, power-sharing, proportional representation.',
      church: 'No established Church.',
      cities: ['Belfast']
    }
  };

  // label: [dx, dy, anchor] relative to the projected point
  const CITIES = [
    { n: 'London', ll: [51.507, -0.128], nation: 'england', capital: 'uk', lab: [6, 4, 'start'] },
    { n: 'Birmingham', ll: [52.486, -1.890], nation: 'england', lab: [-6, 4, 'end'] },
    { n: 'Liverpool', ll: [53.408, -2.991], nation: 'england', lab: [-6, 0, 'end'] },
    { n: 'Manchester', ll: [53.481, -2.243], nation: 'england', lab: [-5, 10, 'end'] },
    { n: 'Leeds', ll: [53.801, -1.549], nation: 'england', lab: [6, -1, 'start'] },
    { n: 'Bradford', ll: [53.795, -1.759], nation: 'england', lab: [-6, -4, 'end'] },
    { n: 'Sheffield', ll: [53.381, -1.470], nation: 'england', lab: [6, 4, 'start'] },
    { n: 'Bristol', ll: [51.454, -2.588], nation: 'england', lab: [5, -5, 'start'] },
    { n: 'Newcastle upon Tyne', ll: [54.978, -1.618], nation: 'england', lab: [6, 3, 'start'] },
    { n: 'Plymouth', ll: [50.376, -4.143], nation: 'england', lab: [0, 13, 'middle'] },
    { n: 'Southampton', ll: [50.910, -1.404], nation: 'england', lab: [0, 13, 'middle'] },
    { n: 'Norwich', ll: [52.630, 1.297], nation: 'england', lab: [-4, -7, 'end'] },
    { n: 'Cardiff', ll: [51.481, -3.179], nation: 'wales', capital: 'wales', lab: [-2, 13, 'middle'] },
    { n: 'Swansea', ll: [51.621, -3.944], nation: 'wales', lab: [-6, 2, 'end'] },
    { n: 'Newport', ll: [51.588, -2.998], nation: 'wales', lab: [5, -5, 'start'] },
    { n: 'Edinburgh', ll: [55.953, -3.189], nation: 'scotland', capital: 'scotland', lab: [6, 4, 'start'] },
    { n: 'Glasgow', ll: [55.864, -4.252], nation: 'scotland', lab: [-6, 8, 'end'] },
    { n: 'Dundee', ll: [56.462, -2.971], nation: 'scotland', lab: [6, 3, 'start'] },
    { n: 'Aberdeen', ll: [57.150, -2.094], nation: 'scotland', lab: [6, 3, 'start'] },
    { n: 'Belfast', ll: [54.597, -5.930], nation: 'ni', capital: 'ni', lab: [6, 4, 'start'] }
  ];

  // Points of interest grouped by layer. "g" groups pins that sit on top of each other.
  const POI = {
    landmarks: [
      { n: 'Big Ben (Elizabeth Tower)', ll: [51.5007, -0.1246], g: 'London', d: 'Nickname for the great bell of the clock at the Houses of Parliament. The clock is over 150 years old. The tower was named Elizabeth Tower for the Diamond Jubilee in 2012.' },
      { n: 'London Eye', ll: [51.5033, -0.1196], g: 'London', d: 'A Ferris wheel 443 feet (135 m) tall on the south bank of the Thames, built for the millennium. Part of New Year celebrations.' },
      { n: 'Tower of London', ll: [51.508, -0.076], g: 'London', d: 'First built by William the Conqueror after 1066. Tours by the Yeoman Warders (Beefeaters). Home of the Crown Jewels.' },
      { n: 'Eden Project', ll: [50.362, -4.745], d: 'Cornwall, south-west England. Giant greenhouse “biomes” with plants from all over the world. Also a charity running environmental and social projects.' },
      { n: 'Edinburgh Castle', ll: [55.949, -3.200], d: 'Dominates the Edinburgh skyline. History dating back to the early Middle Ages. Looked after by Historic Scotland.' },
      { n: 'Giant’s Causeway', ll: [55.241, -6.512], d: 'North-east coast of Northern Ireland. Columns of volcanic lava formed about 50 million years ago. Many legends about how it formed.' },
      { n: 'Loch Lomond & the Trossachs', ll: [56.10, -4.60], d: 'National park of 720 sq miles (1,865 km²) in the west of Scotland. Loch Lomond is the largest expanse of fresh water in mainland Britain.' },
      { n: 'Snowdonia', ll: [53.068, -4.076], d: 'National park in North Wales, 838 sq miles (2,170 km²). Snowdon is the highest mountain in Wales.' },
      { n: 'The Lake District', ll: [54.46, -3.09], d: 'England’s largest national park, 885 sq miles (2,292 km²). Windermere is the biggest stretch of water. Wastwater was voted Britain’s favourite view in 2007.' }
    ],
    gardens: [
      { n: 'Kew Gardens', ll: [51.478, -0.296], d: 'England' },
      { n: 'Sissinghurst', ll: [51.115, 0.585], d: 'England' },
      { n: 'Hidcote', ll: [52.083, -1.745], d: 'England' },
      { n: 'Crathes Castle', ll: [57.058, -2.441], d: 'Scotland' },
      { n: 'Inveraray Castle', ll: [56.237, -5.073], d: 'Scotland' },
      { n: 'Bodnant Garden', ll: [53.218, -3.799], d: 'Wales' },
      { n: 'Mount Stewart', ll: [54.553, -5.602], d: 'Northern Ireland' }
    ],
    sport: [
      { n: 'Wembley Stadium', ll: [51.556, -0.280], g: 'London', d: 'Major stadium in London' },
      { n: 'Wimbledon', ll: [51.434, -0.214], g: 'London', d: 'The Wimbledon Championships at the All England Lawn Tennis and Croquet Club: oldest tennis tournament and the only Grand Slam on grass' },
      { n: 'Millennium Stadium', ll: [51.478, -3.183], d: 'Major stadium in Cardiff' },
      { n: 'St Andrews', ll: [56.340, -2.796], d: 'The home of golf' },
      { n: 'Aintree', ll: [53.477, -2.940], d: 'The Grand National, near Liverpool' },
      { n: 'Ayr', ll: [55.458, -4.629], d: 'The Scottish Grand National' },
      { n: 'Royal Ascot', ll: [51.410, -0.676], d: 'Five-day race meeting in Berkshire attended by the Royal Family' },
      { n: 'Newmarket', ll: [52.245, 0.405], d: 'National Horseracing Museum, Suffolk' },
      { n: 'Cowes', ll: [50.763, -1.297], d: 'Most famous sailing event, Isle of Wight' },
      { n: 'Leamington Spa', ll: [52.292, -1.536], d: 'First tennis club, founded 1872' },
      { n: 'Stoke Mandeville', ll: [51.790, -0.788], d: 'Origin of the Paralympics: Dr Sir Ludwig Guttman’s work, Buckinghamshire' }
    ],
    early: [
      { n: 'Stonehenge', ll: [51.179, -1.826], d: 'Stone Age monument in Wiltshire; probably a gathering place for seasonal ceremonies' },
      { n: 'Skara Brae', ll: [59.049, -3.343], d: 'Orkney: best-preserved prehistoric village in northern Europe' },
      { n: 'Maiden Castle', ll: [50.695, -2.469], d: 'Iron Age hill fort in Dorset' },
      { n: 'Hadrian’s Wall', ll: [55.013, -2.331], d: 'Built to keep out the Picts. Forts at Housesteads and Vindolanda. UNESCO World Heritage Site' },
      { n: 'Sutton Hoo', ll: [52.089, 1.338], d: 'Suffolk: burial of an Anglo-Saxon king in a ship with treasure and armour' },
      { n: 'Iona', ll: [56.334, -6.392], d: 'St Columba founded a monastery here' },
      { n: 'Canterbury', ll: [51.280, 1.080], d: 'St Augustine became the first Archbishop of Canterbury' },
      { n: 'Grimsby & Scunthorpe', ll: [53.567, -0.300], d: 'In the Danelaw: place names from Viking languages' },
      { n: 'Hastings', ll: [50.912, 0.487], d: '1066: William of Normandy defeats Harold' }
    ],
    middle: [
      { n: 'Conwy Castle', ll: [53.280, -3.826], d: 'Built by Edward I to hold Wales' },
      { n: 'Caernarvon Castle', ll: [53.139, -4.277], d: 'Built by Edward I to hold Wales' },
      { n: 'Bannockburn', ll: [56.093, -3.920], d: '1314: Robert the Bruce defeats the English' },
      { n: 'The Pale (Dublin)', ll: [53.350, -6.260], d: 'By 1200 the English ruled this area around Dublin' },
      { n: 'Windsor Castle', ll: [51.483, -0.604], d: 'Medieval castle still in use' },
      { n: 'Edinburgh Castle', ll: [55.949, -3.200], d: 'Medieval castle still in use' },
      { n: 'Lincoln Cathedral', ll: [53.234, -0.536], d: 'Great medieval cathedral' },
      { n: 'York Minster', ll: [53.962, -1.082], d: 'Famous medieval stained glass' },
      { n: 'Canterbury', ll: [51.280, 1.080], d: 'Destination of Chaucer’s pilgrims' },
      { n: 'Bosworth Field', ll: [52.590, -1.410], d: '1485: end of the Wars of the Roses' }
    ],
    tudor: [
      { n: 'Stratford-upon-Avon', ll: [52.192, -1.707], d: 'Birthplace of Shakespeare' },
      { n: 'Ulster plantations', ll: [54.85, -6.90], d: 'Protestant settlers from Scotland and England' },
      { n: 'Marston Moor', ll: [53.960, -1.270], d: 'Civil war: king’s army defeated' },
      { n: 'Naseby', ll: [52.400, -0.980], d: 'Civil war: king’s army defeated' },
      { n: 'Dunbar', ll: [55.999, -2.513], d: 'Cromwell defeats the Scottish army of Charles II' },
      { n: 'Worcester', ll: [52.192, -2.220], d: 'Cromwell defeats Charles II, who hides in an oak tree' },
      { n: 'London', ll: [51.507, -0.128], d: '1665 plague, 1666 Great Fire, Wren’s new St Paul’s' },
      { n: 'Battle of the Boyne', ll: [53.720, -6.420], d: '1690: William defeats James II in Ireland' },
      { n: 'Killiecrankie', ll: [56.730, -3.780], d: 'Rebellion in support of James quickly defeated' },
      { n: 'Glencoe', ll: [56.680, -5.100], d: 'The MacDonalds were massacred for taking the oath late' }
    ],
    global: [
      { n: 'Culloden', ll: [57.478, -4.096], d: '1746: Bonnie Prince Charlie defeated by George II’s army' },
      { n: 'Scottish Highlands', ll: [57.30, -5.20], d: 'The Highland Clearances: crofts destroyed for sheep and cattle' },
      { n: 'Portsmouth', ll: [50.800, -1.090], d: 'Nelson’s ship HMS Victory can be visited; birthplace of Brunel' },
      { n: 'London', ll: [51.507, -0.128], d: 'Nelson’s Column, Trafalgar Square; Great Exhibition 1851 in Hyde Park' }
    ]
  };

  window.UK_PLACES = { NATIONS, CITIES, POI };
})();

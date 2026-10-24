window.BOOK = window.BOOK || [];

window.BOOK.push({
  id: 'ch4', n: 4, color: 'c4',
  title: 'A modern, thriving society',
  short: 'Modern society',
  blurb: 'Cities, population, religion, festivals, sport, the arts and leisure. Expect questions on who did what and where things are.',
  sections: [
    // ================= UK TODAY =================
    {
      id: 'uk-today', station: 'UK today', title: 'The UK today', mins: 6,
      blocks: [
        { t: 'lead', x: 'The UK is a more diverse society than 100 years ago, in both ethnic and religious terms. Post-war immigration means **nearly 10%** of the population has a parent or grandparent born outside the UK.' },
        { t: 'h', x: 'The nations and their cities' },
        { t: 'p', x: 'The UK is in the **north west of Europe**. The longest distance on the mainland is from **John O’Groats** (north coast of Scotland) to **Land’s End** (south-west corner of England): about ==870 miles== (approximately ==1,400 km==). Most people live in towns and cities, but much of Britain is still countryside. Tap a nation for its key facts.' },
        { t: 'viz', v: 'ukmap', o: { mode: 'cities' } },
        { t: 'viz', v: 'nations' },
        { t: 'h', x: 'Currency' },
        { t: 'viz', v: 'currency' },
        { t: 'h', x: 'Languages and dialects' },
        { t: 'list', items: [
          'English has many **accents and dialects**.',
          'In **Wales**, many people speak **Welsh**, a completely different language from English, taught in schools and universities.',
          'In **Scotland**, **Gaelic** is spoken in parts of the **Highlands and Islands**.',
          'In **Northern Ireland**, some people speak **Irish Gaelic**.'
        ] },
        { t: 'h', x: 'Population' },
        { t: 'viz', v: 'population' },
        { t: 'list', items: [
          'Growth has been faster in recent years. **Migration** and **longer life expectancy** both played a part.',
          'The population is very unequally distributed: **England** is about ==84%==, **Wales** around ==5%==, **Scotland** just over ==8%== and **Northern Ireland** less than ==3%==.',
          '**An ageing population**: people are living longer than ever thanks to better living standards and health care. There is a record number of people **aged 85 and over**, which affects the cost of pensions and health care.'
        ] },
        { t: 'viz', v: 'share' },
        { t: 'h', x: 'Ethnic diversity' },
        { t: 'p', x: 'The population is ethnically diverse and changing rapidly, especially in large cities such as London. The most common description chosen in surveys is **white** (which includes people of European, Australian, Canadian, New Zealand and American descent). Other significant groups are people of **Asian, black and mixed** descent.' },
        { t: 'h', x: 'An equal society' },
        { t: 'list', items: [
          'By law, men and women must not be discriminated against because of their **gender** or because they are, or are not, **married**. They have equal rights to work, own property, marry and divorce. Married parents are **equally responsible** for their children.',
          'Women make up about **half of the workforce**. On average girls leave school with better qualifications than boys, and **more women than men study at university**.',
          'Women work in all sectors, with more in high-level positions than ever. Men now work in more varied jobs too.',
          'Women often keep working after having children; in many families both partners work and share childcare and chores.'
        ] }
      ],
      check: ['The capital cities of the UK', 'What languages other than English are spoken in particular parts of the UK', 'How the population of the UK has changed', 'That the UK is an equal society and ethnically diverse', 'The currency of the UK']
    },

    // ================= RELIGION =================
    {
      id: 'religion', station: 'Religion', title: 'Religion and patron saints', mins: 4,
      blocks: [
        { t: 'lead', x: 'The UK is historically a Christian country. Everyone has the legal right to choose their religion, or to choose not to practise one.' },
        { t: 'viz', v: 'religion' },
        { t: 'p', x: 'There are religious buildings for other religions all over the UK: Islamic **mosques**, Hindu **temples**, Jewish **synagogues**, Sikh **gurdwaras** and Buddhist **temples**.' },
        { t: 'h', x: 'Christian Churches' },
        { t: 'photo', src: 'church' },
        { t: 'cards', cols: 2, items: [
          { h: 'England: the Church of England', sub: 'The established (state) Church', x: 'Called the **Anglican** Church in other countries and the **Episcopal** Church in Scotland and the USA. **Protestant**; has existed since the Reformation in the ==1530s==. The **monarch is its head**; the **Archbishop of Canterbury** is its spiritual leader. The monarch can select the Archbishop and senior officials, but usually the **Prime Minister** and a Church committee choose. Several bishops sit in the **House of Lords**.' },
          { h: 'Scotland: the Church of Scotland', sub: 'The national Church', x: 'A **Presbyterian** Church governed by **ministers and elders**. The chairperson of its General Assembly is the **Moderator**, appointed for **one year only**, who often speaks for the Church.' },
          { h: 'Wales and Northern Ireland', sub: 'No established Church', x: 'There is **no established Church** in Wales or Northern Ireland.' },
          { h: 'Other Christian groups', sub: 'Protestant and other denominations', x: 'Other Protestant groups: **Baptists, Methodists, Presbyterians and Quakers**. The biggest other denomination is **Roman Catholic**.' }
        ] },
        { t: 'h', x: 'Patron saints’ days' },
        { t: 'viz', v: 'saints' },
        { t: 'list', items: [
          'Only **Scotland** and **Northern Ireland** have their patron saint’s day as an **official holiday** (in Scotland not all businesses close).',
          'In England and Wales the days are not public holidays but are still celebrated with parades and small festivals.'
        ] }
      ],
      check: ['The different religions that are practised in the UK', 'That the Anglican Church (the Church of England) is the Church of the state in England (the ‘established Church’)', 'That other branches of the Christian Church practise their faith without being linked to the state', 'That other religions are practised in the UK', 'About the patron saints']
    },

    // ================= CUSTOMS =================
    {
      id: 'customs', station: 'Customs', title: 'Customs, festivals and traditions', mins: 6, hero: 'hogmanay',
      blocks: [
        { t: 'lead', x: 'A year of festivals: Christian holidays, other faiths’ celebrations, national traditions and bank holidays. Use the calendar to see when each falls.' },
        { t: 'viz', v: 'calendar' },
        { t: 'h', x: 'The main Christian festivals' },
        { t: 'photo', src: 'easter-eggs' },
        { t: 'cards', cols: 2, items: [
          { h: 'Christmas Day', sub: '25 December · public holiday', x: 'Celebrates the birth of Jesus Christ. Many go to church on **Christmas Eve** (24 Dec) or Christmas Day. People eat **roast turkey, Christmas pudding and mince pies**, give gifts, send cards, decorate their homes and a tree. Young children believe **Father Christmas (Santa Claus)** brings presents the night before.' },
          { h: 'Boxing Day', sub: '26 December · public holiday', x: 'The day after Christmas Day.' },
          { h: 'Easter', sub: 'March or April', x: 'Marks the death of Jesus on **Good Friday** and his rising from the dead on **Easter Sunday**. Good Friday and **Easter Monday** are public holidays. Chocolate **Easter eggs** symbolise new life and are given even by non-religious people.' },
          { h: 'Lent', sub: '40 days before Easter', x: 'A time to reflect and prepare; traditionally a fast, today people often give something up. It begins on **Ash Wednesday** (an ash cross on the forehead as a symbol of death and sorrow for sin). The day before is **Shrove Tuesday (Pancake Day)**, when pancakes used up eggs, fat and milk.' }
        ] },
        { t: 'h', x: 'Other religious festivals' },
        { t: 'cards', cols: 2, items: [
          { h: 'Diwali', sub: 'Hindus and Sikhs · October or November · 5 days', x: 'The **Festival of Lights**: the victory of good over evil and the gaining of knowledge. Famous celebration in **Leicester**.' },
          { h: 'Hannukah', sub: 'Jewish · November or December · 8 days', x: 'Remembers the Jews’ struggle for religious freedom. A candle is lit each day on a **menorah**, recalling oil that should have lasted one day but lasted eight.' },
          { h: 'Eid al-Fitr', sub: 'Muslim · date changes every year', x: 'Celebrates the **end of Ramadan**, a month of fasting. Muslims thank Allah for the strength to complete the fast, with special services and meals.' },
          { h: 'Eid ul Adha', sub: 'Muslim', x: 'Remembers that the **prophet Ibrahim** was willing to sacrifice his son when God ordered him to. Many Muslims sacrifice an animal to eat; in Britain this must be done in a **slaughterhouse**.' },
          { h: 'Vaisakhi (Baisakhi)', sub: 'Sikh · 14 April', x: 'Celebrates the founding of the Sikh community known as the **Khalsa**, with parades, dancing and singing.' }
        ] },
        { t: 'h', x: 'Other festivals and traditions' },
        { t: 'table', head: ['Day', 'Date', 'What happens'], rows: [
          ['New Year', '1 January (public holiday)', 'Celebrated on New Year’s Eve, 31 December.'],
          ['Hogmanay', '31 December (Scotland)', 'For some Scots a bigger holiday than Christmas. **2 January** is also a public holiday in Scotland.'],
          ['Valentine’s Day', '14 February', 'Lovers exchange cards and gifts; some send anonymous cards to a secret admirer.'],
          ['April Fool’s Day', '1 April', 'People play jokes **until midday**; TV and newspapers run April Fool stories.'],
          ['Mothering Sunday', 'Three weeks before Easter', 'Children send cards or buy gifts for their mothers.'],
          ['Father’s Day', 'Third Sunday in June', 'Children send cards or buy gifts for their fathers.'],
          ['Halloween', '31 October', 'Roots in a pagan festival marking the beginning of winter. ‘Trick or treat’ in frightening costumes; pumpkin lanterns.'],
          ['Bonfire Night', '5 November', 'Fireworks in Great Britain, remembering the failed 1605 plot by Catholics led by **Guy Fawkes** to kill the Protestant king in Parliament.'],
          ['Remembrance Day', '11 November', 'Remembers those who died fighting for the UK and its allies (originally WWI, which ended 11 Nov 1918). People wear **poppies**; **two-minute silence at 11am**; wreaths laid at the **Cenotaph**, Whitehall.']
        ] },
        { t: 'h', x: 'Bank holidays' },
        { t: 'p', x: 'Public holidays when banks and many businesses close, with **no religious significance**: the **beginning of May**, **late May or early June**, and **August**. In **Northern Ireland**, the anniversary of the **Battle of the Boyne** in **July** is also a public holiday.' }
      ],
      check: ['The main Christian festivals that are celebrated in the UK', 'Other religious festivals that are important in the UK', 'Some of the other events that are celebrated in the UK', 'What a bank holiday is']
    },

    // ================= SPORT =================
    {
      id: 'sport', station: 'Sport', title: 'Sport', mins: 7, hero: 'olympics-2012',
      blocks: [
        { t: 'lead', x: 'Many famous sports, including **cricket, football, lawn tennis, golf and rugby**, began in Britain. Major events take place at stadiums such as **Wembley** (London) and the **Millennium Stadium** (Cardiff).' },
        { t: 'viz', v: 'olympics' },
        { t: 'list', items: [
          'The main site for the 2012 Games was in **Stratford, east London**. The British team finished **third in the medal table**.',
          'The **2012 Paralympics** were also in London. The Paralympics began with **Dr Sir Ludwig Guttman**, a German refugee at **Stoke Mandeville** hospital (Buckinghamshire), who used exercise and sport to treat spinal injuries.',
          'Local governments and private companies provide swimming pools, tennis courts, football pitches, dry ski slopes and gyms.'
        ] },
        { t: 'h', x: 'Notable British sportsmen and women' },
        { t: 'people' },
        { t: 'h', x: 'Sports at a glance' },
        { t: 'photo', src: 'football' },
        { t: 'cards', cols: 2, items: [
          { h: 'Football', sub: 'The UK’s most popular sport', x: 'First professional clubs in the **late 19th century**. Separate leagues in England, Scotland, Wales and Northern Ireland; the **English Premier League** has a huge international audience. Clubs play in the **UEFA Champions League**. Each country has its own national team (FIFA World Cup, UEFA European Championships). **England’s only international tournament win was the 1966 World Cup**, hosted in the UK.' },
          { h: 'Cricket', sub: 'Originated in England', x: 'Games can last up to **five days** and still end in a draw. Said to reflect the British sense of fair play. Phrases: ‘rain stopped play’, ‘batting on a sticky wicket’, ‘playing a straight bat’, ‘bowled a googly’, ‘it’s just not cricket’. Most famous competition: **the Ashes**, England v Australia Test matches.' },
          { h: 'Rugby', sub: 'Originated in England, early 19th century', x: 'Two types: **union** and **league**, with different rules. Northern Ireland plays with the Irish Republic. **Six Nations** (rugby union): England, Ireland, Scotland, Wales, France and Italy. **Super League**: best-known rugby league club competition.' },
          { h: 'Horse racing', sub: 'Back to Roman times', x: 'Long royal association. **Royal Ascot** (five days, Berkshire, attended by the Royal Family); the **Grand National** at **Aintree** near Liverpool; the **Scottish Grand National** at **Ayr**. **National Horseracing Museum** in **Newmarket**, Suffolk.' },
          { h: 'Golf', sub: '15th-century Scotland', x: '**St Andrews** in Scotland is the **home of golf**. **The Open Championship** is the only ‘Major’ held outside the USA, at a different course each year.' },
          { h: 'Tennis', sub: 'England, late 19th century', x: 'First tennis club: **Leamington Spa, 1872**. **Wimbledon**, at the All England Lawn Tennis and Croquet Club, is the **oldest tournament in the world** and the **only Grand Slam played on grass**.' },
          { h: 'Water sports', sub: 'A maritime heritage', x: '**Sir Francis Chichester**: first to sail single-handed around the world (1966/67). **Sir Robin Knox-Johnston**: first to do it **without stopping**, two years later. Famous sailing at **Cowes**, Isle of Wight. Yearly **Oxford v Cambridge** boat race on the Thames.' },
          { h: 'Motor sports', sub: 'Car racing since 1902', x: 'The UK leads in motor-sport technology. A **Formula 1 Grand Prix** is held every year. Recent British champions: **Damon Hill, Lewis Hamilton, Jensen Button**.' },
          { h: 'Skiing', sub: 'Increasingly popular', x: 'Dry ski slopes throughout the UK; **five ski centres in Scotland**; **Europe’s longest dry ski slope** is near **Edinburgh**.' }
        ] },
        { t: 'viz', v: 'ukmap', o: { mode: 'sport' } }
      ],
      check: ['Which sports are particularly popular in the UK', 'Some of the major sporting events that take place each year']
    },

    // ================= MUSIC & THEATRE =================
    {
      id: 'music-theatre', station: 'Music & theatre', title: 'Music and theatre', mins: 6, hero: 'orchestra',
      blocks: [
        { t: 'lead', x: 'From Purcell to punk: music and theatre are central to British culture, with venues and festivals across the country.' },
        { t: 'h', x: 'Classical music' },
        { t: 'p', x: '**The Proms** is an **eight-week summer season** of orchestral music in venues including the **Royal Albert Hall**, organised by the **BBC since 1927**. The **Last Night of the Proms** is the best-known concert and is broadcast on TV.' },
        { t: 'viz', v: 'composers' },
        { t: 'h', x: 'Pop, festivals and awards' },
        { t: 'list', items: [
          'Folk, jazz and pop have flourished since the 20th century. British pop has had a world impact thanks to the English language, cultural links and invention.',
          'Since the **1960s** pop has been one of Britain’s most important cultural contributions: **The Beatles** and **The Rolling Stones**, the **Punk** movement of the late **1970s**, and **boy and girl bands** in the **1990s**.',
          'Big venues: **Wembley Stadium**, **The O2** in Greenwich (south-east London), and the **SECC** (Scottish Exhibition and Conference Centre) in **Glasgow**.',
          'Summer festivals: **Glastonbury**, the **Isle of Wight Festival** and the **V Festival**.',
          'The **National Eisteddfod of Wales**: annual festival of music, dance, art and performance, largely in **Welsh**, with important Welsh poetry competitions.',
          'The **Mercury Music Prize** (each **September**) for the best album from the UK and Ireland. The **Brit Awards**: annual awards such as best British group and best British solo artist.'
        ] },
        { t: 'h', x: 'Theatre' },
        { t: 'list', items: [
          'Theatres in most towns and cities show professional and amateur productions. London’s **West End** is known as ‘**Theatreland**’.',
          '**The Mousetrap**, a murder mystery by **Dame Agatha Christie**, has run in the West End since ==1952==: the **longest initial run of any show in history**.',
          '**Gilbert and Sullivan** wrote 19th-century comic operas poking fun at popular culture and politics: **HMS Pinafore**, **The Pirates of Penzance** and **The Mikado**.',
          '**Andrew Lloyd Webber**: with **Tim Rice**, **Jesus Christ Superstar** and **Evita**; also **Cats** and **The Phantom of the Opera**.',
          '**Pantomime**: Christmas plays based on fairy stories, with music and comedy. Traditional characters: the **Dame** (a woman played by a man) and a **pantomime horse or cow** played by two actors.',
          'The **Edinburgh Festival** every summer is a series of arts festivals; the biggest is the **Edinburgh Festival Fringe** (‘the Fringe’), mainly theatre and comedy, often experimental.',
          'The **Laurence Olivier Awards** take place annually in London (best director, actor, actress…), named after **Sir Laurence Olivier**, known for Shakespeare roles.'
        ] },
        { t: 'viz', v: 'awards' }
      ],
      check: ['Some of the major arts and culture events that happen in the UK', 'How achievements in arts and culture are formally recognised']
    },

    // ================= ART & DESIGN =================
    {
      id: 'art-design', station: 'Art & design', title: 'Art, architecture and design', mins: 6,
      blocks: [
        { t: 'lead', x: 'Medieval art was mostly religious; much was lost after the Reformation. British portrait and landscape painters became well known from the 18th century.' },
        { t: 'h', x: 'Art' },
        { t: 'list', items: [
          'In the Middle Ages most art had a **religious theme**: church wall paintings and illustrated religious books.',
          'Many painters in Britain in the 16th and 17th centuries came from abroad, such as **Hans Holbein** and **Sir Anthony Van Dyck**.',
          'Galleries: **The National Gallery**, **Tate Britain** and **Tate Modern** (London), the **National Museum** (Cardiff), the **National Gallery of Scotland** (Edinburgh).',
          'The **Turner Prize** (est. ==1984==) celebrates contemporary art, named after **Joseph Turner**. Four works are shortlisted each year and shown at **Tate Britain**. Past winners: **Damien Hirst** and **Richard Wright**.'
        ] },
        { t: 'viz', v: 'artists' },
        { t: 'h', x: 'Architecture through the centuries' },
        { t: 'viz', v: 'architecture' },
        { t: 'photo', src: 'cenotaph' },
        { t: 'h', x: 'Gardens' },
        { t: 'list', items: [
          'In the 18th century **Lancelot ‘Capability’ Brown** designed grounds so the landscape looked natural, with grass, trees and lakes. He often said a place had ‘capabilities’.',
          '**Gertrude Jekyll** often worked with **Edwin Lutyens** to design colourful gardens around his houses.',
          'The annual **Chelsea Flower Show** showcases garden design from Britain and around the world.'
        ] },
        { t: 'h', x: 'Fashion and design' },
        { t: 'cards', cols: 3, items: [
          { h: 'Thomas Chippendale', sub: '18th century', x: 'Furniture designer.' },
          { h: 'Clarice Cliff', sub: 'Art Deco', x: 'Ceramics designer.' },
          { h: 'Sir Terence Conran', sub: '20th century', x: 'Interior designer.' },
          { h: 'Mary Quant', sub: 'Fashion', x: 'Leading fashion designer.' },
          { h: 'Alexander McQueen', sub: 'Fashion', x: 'Leading fashion designer.' },
          { h: 'Vivienne Westwood', sub: 'Fashion', x: 'Leading fashion designer.' }
        ] }
      ],
      check: ['How achievements in arts and culture are formally recognised']
    },

    // ================= LITERATURE =================
    {
      id: 'literature', station: 'Literature', title: 'Literature and poetry', mins: 6,
      blocks: [
        { t: 'lead', x: 'The UK has a prestigious literary history. Several British writers have won the **Nobel Prize in Literature**: novelist **Sir William Golding**, poet **Seamus Heaney** and playwright **Harold Pinter**.' },
        { t: 'list', items: [
          '**Agatha Christie**’s detective stories are read all over the world; **Ian Fleming**’s books introduced **James Bond**.',
          'In ==2003== **The Lord of the Rings** by **JRR Tolkien** was voted the country’s best-loved novel.',
          'The **Man Booker Prize for Fiction** (since ==1968==) goes to the best novel by an author from the **Commonwealth, Ireland or Zimbabwe**. Past winners: **Ian McEwan, Hilary Mantel, Julian Barnes**.'
        ] },
        { t: 'h', x: 'Notable authors and writers' },
        { t: 'viz', v: 'authors' },
        { t: 'h', x: 'British poets' },
        { t: 'viz', v: 'poets' },
        { t: 'p', x: 'Some of the best-known poets are buried or commemorated in **Poets’ Corner** in **Westminster Abbey**. Sonnets (Shakespeare wrote many) must be **14 lines** long.' },
        { t: 'h', x: 'Famous lines you should recognise' },
        { t: 'viz', v: 'poems' }
      ],
      check: ['Important figures in British literature']
    },

    // ================= LEISURE =================
    {
      id: 'leisure', station: 'Leisure', title: 'Leisure and everyday life', mins: 5, hero: 'kew-gardens',
      blocks: [
        { t: 'lead', x: 'Gardens, shopping, food, pubs and pets: how people in the UK spend their free time, and the rules that come with it.' },
        { t: 'h', x: 'Gardening' },
        { t: 'list', items: [
          'Many people have gardens; some rent extra land called an **allotment** to grow fruit and vegetables.',
          'Flower shows range from national exhibitions to local events; many towns have **garden centres**.',
          'Famous gardens: **Kew Gardens, Sissinghurst and Hidcote** (England); **Crathes Castle and Inveraray Castle** (Scotland); **Bodnant Garden** (Wales); **Mount Stewart** (Northern Ireland).'
        ] },
        { t: 'viz', v: 'ukmap', o: { mode: 'gardens' } },
        { t: 'h', x: 'National flowers and traditional foods' },
        { t: 'viz', v: 'flowersfood' },
        { t: 'h', x: 'Shopping' },
        { t: 'p', x: 'Most towns and cities have a central shopping area called the **town centre**, and undercover **shopping centres** are common. Most shops are open **seven days a week**, with reduced hours on Sundays and public holidays. Many towns have **markets** one or more days a week.' },
        { t: 'h', x: 'Rules to remember' },
        { t: 'cards', cols: 2, items: [
          { h: 'Pubs and night clubs', x: 'Pubs are an important part of social culture; most communities have a ‘**local**’. Pub quizzes, **pool and darts** are popular. You must be **18** to buy alcohol; under-18s may be allowed in some pubs with an adult. At **16** you can drink **wine or beer with a meal** in a hotel or restaurant if with someone over 18. Pubs usually open from **11am** (**12 noon on Sundays**); the **licensee** decides opening hours.' },
          { h: 'Betting and gambling', x: 'You must be **18** to enter betting shops or gambling clubs. There are casinos in many places. The **National Lottery** has weekly draws (tickets or scratch cards). Players must be **18 or over** (the minimum age rose from 16 to 18 in April 2021).' },
          { h: 'Pets', x: 'It is against the law to treat a pet cruelly or neglect it. **All dogs in public places must wear a collar** showing the owner’s **name and address**. Owners must keep dogs under control and **clean up after them**. Vets provide vaccinations and treatment; charities may help people who cannot afford one.' },
          { h: 'Social networking', x: 'Sites such as **Facebook** and **Twitter** are a popular way to keep in touch, organise events and share photos, videos and opinions, often on mobile phones.' }
        ] },
        { t: 'h', x: 'Cooking and food' },
        { t: 'p', x: 'Many people enjoy cooking and invite each other for dinner. A wide variety of food is eaten thanks to the UK’s rich cultural heritage and diverse population.' }
      ],
      check: ['Some of the ways in which people in the UK spend their leisure time']
    },

    // ================= FILM & MEDIA =================
    {
      id: 'film-media', station: 'Film & media', title: 'Film, comedy, TV and radio', mins: 6,
      blocks: [
        { t: 'lead', x: 'The UK has had a major influence on modern cinema. Films were first shown publicly here in ==1896==, and British film makers have been famous for **special effects** ever since.' },
        { t: 'h', x: 'The British film industry' },
        { t: 'photo', src: 'chaplin', side: true },
        { t: 'list', items: [
          'British actors have worked in the UK and USA since the early days. **Sir Charles (Charlie) Chaplin** became famous in silent movies for his **tramp** character.',
          'British studios flourished in the **1930s**: directors **Sir Alexander Korda** and **Sir Alfred Hitchcock** (who later left for Hollywood and directed until his death in 1980).',
          'In the **Second World War**, films such as **In Which We Serve** boosted morale. Later, **Sir David Lean** and **Ridley Scott** found great success.',
          'The **1950s and 1960s** were a high point for comedies: **Passport to Pimlico**, **The Ladykillers** and the **Carry On** films.',
          'Many films are now made in the UK by foreign companies using British expertise, including the two highest-grossing franchises: **Harry Potter** and **James Bond**.',
          '**Ealing Studios** claims to be the **oldest continuously working film studio** in the world.',
          'Britain is strong in special effects and animation: **Nick Park** has won **four Oscars**, three for **Wallace and Gromit**.',
          'Actors **Sir Laurence Olivier, David Niven, Sir Rex Harrison and Richard Burton**; recent Oscar winners **Colin Firth, Sir Anthony Hopkins, Dame Judi Dench, Kate Winslet and Tilda Swinton**.',
          'The **BAFTAs** (British Academy Film Awards) are the British equivalent of the Oscars.'
        ] },
        { t: 'h', x: 'Some famous British films' },
        { t: 'viz', v: 'films' },
        { t: 'h', x: 'British comedy' },
        { t: 'viz', v: 'comedy' },
        { t: 'h', x: 'Television and radio' },
        { t: 'list', items: [
          'Many channels, some free, some by subscription. Popular **soap operas**: **Coronation Street** and **EastEnders**.',
          'Scotland has Scotland-specific programmes and a **Gaelic-language** channel; Wales has a **Welsh-language** channel; Northern Ireland has its own programmes and some in **Irish Gaelic**.',
          'Many radio stations, national and local; some broadcast in **Welsh or Gaelic**.'
        ] },
        { t: 'viz', v: 'tvlicence' }
      ],
      check: ['The development of British cinema', 'What the television licence is and how it funds the BBC']
    },

    // ================= PLACES =================
    {
      id: 'places', station: 'Places', title: 'Places of interest', mins: 5, hero: 'london-eye',
      blocks: [
        { t: 'lead', x: 'A large network of **public footpaths** crosses the countryside, with mountain biking, mountaineering and hill walking. There are ==15 national parks== in England, Wales and Scotland: protected countryside everyone can visit, where people also live and work.' },
        { t: 'list', items: [
          'Museums range from small community museums to large national collections. Most landmarks are open to the public, generally for a charge.',
          'The **National Trust** (England, Wales and Northern Ireland) and the **National Trust for Scotland** are **charities** that preserve important buildings, coastline and countryside.',
          'The National Trust was founded in ==1895== by **three volunteers**. It now has **more than 61,000 volunteers**.'
        ] },
        { t: 'h', x: 'UK landmarks' },
        { t: 'viz', v: 'ukmap', o: { mode: 'landmarks' } },
        { t: 'gallery', items: ['lake-district', 'tower-bridge'] },
        { t: 'viz', v: 'parks' }
      ],
      check: ['Some of the places of interest to visit in the UK']
    }
  ]
});

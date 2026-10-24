window.BOOK = window.BOOK || [];

window.BOOK.push({
  id: 'ch3', n: 3, color: 'c3',
  title: 'A long and illustrious history',
  short: 'History',
  blurb: 'From the Stone Age to today: invasions, monarchs, Parliament, Empire, two world wars and modern Britain. The handbook expects you to know every date.',
  sections: [
    // ================= EARLY BRITAIN =================
    {
      id: 'early-britain', station: 'Early Britain', title: 'Early Britain', era: 'Stone Age – 1066', mins: 7, hero: 'stonehenge',
      blocks: [
        { t: 'lead', x: 'Waves of people arrived in Britain over thousands of years. Each shaped the language, religion and culture that followed.' },
        { t: 'viz', v: 'invasions' },
        { t: 'viz', v: 'invaders' },
        { t: 'h', x: 'Stone Age, Bronze Age and Iron Age' },
        { t: 'list', items: [
          'The first people were **hunter-gatherers** in the Stone Age. Britain was joined to the continent by a land bridge, and only became permanently separated by the Channel about ==10,000 years ago==.',
          'The **first farmers** arrived about ==6,000 years ago==, probably from south-east Europe. They built houses, tombs and monuments.',
          '**Stonehenge** (Wiltshire) was probably a special gathering place for seasonal ceremonies. **Skara Brae** on Orkney is the best-preserved prehistoric village in northern Europe.',
          'The **Bronze Age** began around ==4,000 years ago==: roundhouses, tombs called **round barrows**, and fine metalwork in bronze and gold.',
          'In the **Iron Age** people made iron tools and weapons and built **hill forts**, like **Maiden Castle** in Dorset. They spoke **Celtic** languages, related to languages still spoken in parts of Wales, Scotland and Ireland.',
          'Iron Age people minted the **first coins in Britain**, some with the names of Iron Age kings. This marks **the beginning of British history**.'
        ] },
        { t: 'h', x: 'The Romans (AD 43–410)' },
        { t: 'photo', src: 'hadrians-wall', side: true },
        { t: 'list', items: [
          '**Julius Caesar** led an unsuccessful invasion in ==55 BC==. Britain stayed outside the Roman Empire for nearly 100 years.',
          'In ==AD 43== **Emperor Claudius** led a successful invasion. **Boudicca**, queen of the **Iceni** (eastern England), fought the Romans; her statue is on Westminster Bridge.',
          'Parts of what is now Scotland were never conquered. **Emperor Hadrian** built a wall to keep out the **Picts** (ancestors of the Scottish people). Forts at **Housesteads** and **Vindolanda** can still be seen; it is a **UNESCO World Heritage Site**.',
          'The Romans stayed for ==400 years==. They built roads and public buildings, created a structure of law, and introduced new plants and animals.',
          'The first **Christian communities** appeared in the ==3rd and 4th centuries AD==.'
        ] },
        { t: 'h', x: 'The Anglo-Saxons' },
        { t: 'list', items: [
          'The Roman army left in ==AD 410== and never returned. **Jutes, Angles and Saxons** from northern Europe invaded. Their languages are the **basis of modern English**.',
          'By about ==AD 600== Anglo-Saxon kingdoms were established, mainly in what is now England. Much of Wales and Scotland stayed free of Anglo-Saxon rule.',
          'A king was buried at **Sutton Hoo** (Suffolk) in a ship with treasure and armour, covered by a mound of earth.',
          'The Anglo-Saxons were not Christian at first. Missionaries from **Ireland** spread Christianity in the north (**St Patrick**, **St Columba** on Iona); **St Augustine** led missionaries from **Rome** in the south and became the **first Archbishop of Canterbury**.'
        ] },
        { t: 'h', x: 'The Vikings' },
        { t: 'photo', src: 'vikings', side: true },
        { t: 'list', items: [
          'Vikings came from **Denmark and Norway**, first raiding in ==AD 789==, then settling in the east of England and Scotland.',
          '**Alfred the Great** united the Anglo-Saxon kingdoms and defeated the Vikings.',
          'Many Vikings stayed in the **Danelaw** (east and north of England). Place names such as **Grimsby** and **Scunthorpe** come from Viking languages.',
          'Anglo-Saxon kings kept ruling, apart from a short period of Danish kings; the first was **Cnut (Canute)**.',
          'In the north, the Viking threat united people under **Kenneth MacAlpin**, and the term **Scotland** began to be used.'
        ] },
        { t: 'h', x: 'The Norman Conquest (1066)' },
        { t: 'photo', src: 'bayeux-tapestry' },
        { t: 'list', items: [
          'In ==1066== **William, Duke of Normandy**, defeated **Harold**, the Saxon king, at the **Battle of Hastings**. Harold was killed and William became **William the Conqueror**.',
          'The battle is shown in the **Bayeux Tapestry**, which can still be seen in France.',
          'It was the **last successful foreign invasion of England**. Norman French influenced the English language.',
          'The Normans conquered Wales at first, but the Welsh gradually won territory back. The Normans took some border land but did not invade Scotland.',
          'William ordered the **Domesday Book**, listing towns, villages, people, land and animals. It still exists today.'
        ] },
        { t: 'viz', v: 'histmap', o: { layer: 'early', title: 'Where it happened' } },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['The history of the UK before the Romans', 'The impact of the Romans on British society', 'The different groups that invaded after the Romans', 'The importance of the Norman invasion in 1066']
    },

    // ================= MIDDLE AGES =================
    {
      id: 'middle-ages', station: 'Middle Ages', title: 'The Middle Ages', era: '1066 – 1485', mins: 8, hero: 'conwy-castle',
      blocks: [
        { t: 'lead', x: 'The period after the Norman Conquest until about ==1485== is the **Middle Ages** (the medieval period). It was a time of almost **constant war**, but also when Parliament, the legal system and the English language took shape.' },
        { t: 'h', x: 'War at home and abroad' },
        { t: 'cards', cols: 2, items: [
          { h: 'Wales', sub: 'Conquered', x: 'In ==1284== **Edward I** introduced the **Statute of Rhuddlan**, annexing Wales to the Crown of England. Castles such as **Conwy** and **Caernarvon** held it. The last Welsh rebellions were defeated by the middle of the 15th century, and English laws and language were introduced.' },
          { h: 'Scotland', sub: 'Unconquered', x: 'In ==1314== the Scots, led by **Robert the Bruce**, defeated the English at the **Battle of Bannockburn**. Scotland remained unconquered by the English.' },
          { h: 'Ireland', sub: 'The Pale', x: 'Ireland was independent at first. The English came as troops to help the Irish king and stayed. By ==1200== they ruled **the Pale**, an area around **Dublin**. Some lords elsewhere accepted the English king.' },
          { h: 'Abroad', sub: 'Crusades and France', x: 'Knights fought in the **Crusades** for the Holy Land. The **Hundred Years War** with France actually lasted **116 years**. At **Agincourt** (==1415==) **Henry V**’s outnumbered army beat the French. The English left France in the ==1450s==.' }
        ] },
        { t: 'h', x: 'Feudalism and the Black Death' },
        { t: 'viz', v: 'feudal' },
        { t: 'list', items: [
          'The Normans used **feudalism**: the king gave land to lords in return for help in war; landowners sent men to the army.',
          'Most peasants were **serfs**: they farmed a small area of their lord’s land, worked for the lord and could not move away. The same system developed in southern Scotland. In the north of Scotland and Ireland, land was owned by **clans** (prominent families).',
          'In ==1348== the **Black Death** (probably plague) killed **one third** of England’s population, and a similar proportion in Scotland and Wales.',
          'Afterwards fewer cereal crops were needed, labour was short and peasants demanded **higher wages**. New classes appeared: the **gentry** (owners of large areas of land) and a strong **middle class** in the towns.',
          'In Ireland the Black Death killed many in the Pale, and English-controlled territory shrank for a time.'
        ] },
        { t: 'h', x: 'Legal and political changes' },
        { t: 'viz', v: 'magna' },
        { t: 'list', items: [
          'Parliament grew out of the **king’s council of advisers**: important noblemen and Church leaders.',
          'In ==1215== **King John** was forced by his noblemen to agree to the **Magna Carta** (the Great Charter). It established that **even the king was subject to the law**, protected the rights of the nobility, and limited the king’s power to collect taxes and make or change laws.',
          'English parliaments were called when the king needed to consult nobles, especially to raise money. Two **Houses** formed: the **House of Lords** (nobility, great landowners, bishops) and the **House of Commons** (knights and wealthy town people, elected by a small part of the population).',
          'Scotland’s Parliament had **three Houses, called Estates**: the lords, the commons and the clergy.',
          'Judges began to be **independent of the government**. In England, judges developed **common law** by precedent and tradition; in Scotland, laws were **codified** (written down).'
        ] },
        { t: 'h', x: 'A distinct identity' },
        { t: 'viz', v: 'words' },
        { t: 'photo', src: 'windsor-castle', side: true },
        { t: 'list', items: [
          'By ==1400== official documents in England were written in English, and English was the preferred language of the royal court and Parliament.',
          '**Geoffrey Chaucer** wrote **The Canterbury Tales** in English: pilgrims travelling to Canterbury tell each other stories. It was one of the first books printed by **William Caxton**, the first person in England to print books with a printing press.',
          'In Scotland many spoke **Gaelic** and the **Scots** language developed. **John Barbour** wrote **The Bruce** about Bannockburn.',
          'Castles were built across Britain and Ireland; **Windsor** and **Edinburgh** are still in use. Great cathedrals such as **Lincoln** were built; **York Minster** is famous for its stained glass.',
          'English **wool** was a very important export. Skilled people came to work: weavers from France, engineers from Germany, glass makers from Italy, canal builders from Holland.'
        ] },
        { t: 'h', x: 'The Wars of the Roses (1455–1485)' },
        { t: 'viz', v: 'roses' },
        { t: 'viz', v: 'histmap', o: { layer: 'middle', title: 'Where it happened' } },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['The wars that took place in the Middle Ages', 'How Parliament began to develop', 'The way that land ownership worked', 'The effect of the Black Death', 'The development of English language and culture', 'The Wars of the Roses and the founding of the House of Tudor']
    },

    // ================= TUDORS & STUARTS =================
    {
      id: 'tudors-stuarts', station: 'Tudors & Stuarts', title: 'The Tudors and Stuarts', era: '1485 – 1689', mins: 10,
      blocks: [
        { t: 'lead', x: 'Two dynasties, one long struggle: **Protestant against Catholic**, and **king against Parliament**. By the end, Parliament had won.' },
        { t: 'viz', v: 'succession' },
        { t: 'h', x: 'Henry VII and Henry VIII' },
        { t: 'photo', src: 'henry-viii', side: true },
        { t: 'list', items: [
          '**Henry VII** wanted peace and security: he strengthened central administration, reduced the power of the nobles and, being thrifty, built up the monarchy’s reserves.',
          '**Henry VIII** continued centralising power. He is most famous for **breaking away from the Church of Rome** and **marrying six times**.',
          'To divorce his first wife he needed the Pope’s approval. When the Pope refused, Henry established the **Church of England**, where the king, not the Pope, appointed bishops and decided how people should worship.',
          'In his reign Wales was formally united with England by the **Act for the Government of Wales**. Welsh representatives sat in the House of Commons and the Welsh legal system was reformed.'
        ] },
        { t: 'viz', v: 'wives' },
        { t: 'h', x: 'The Reformation' },
        { t: 'list', items: [
          'The **Reformation** was a movement across Europe against the authority of the Pope and the ideas of the Roman Catholic Church. **Protestants** formed their own churches.',
          'Protestants read the **Bible in their own languages** instead of Latin, did not pray to saints or at shrines, and believed a person’s own relationship with God mattered more than the Church’s authority.',
          'Protestant ideas gained strength in England, Wales and Scotland during the 16th century. In **Ireland**, attempts to impose Protestantism and English land laws led to rebellion and brutal fighting.',
          '**Edward VI** was strongly Protestant; the **Book of Common Prayer** was written in his reign. He died aged 15 after just over six years.',
          '**Mary I** was a devout Catholic who persecuted Protestants: ‘**Bloody Mary**’.'
        ] },
        { t: 'h', x: 'Elizabeth I' },
        { t: 'list', items: [
          'A Protestant, Elizabeth **re-established the Church of England**. Everyone had to attend church, but she did not ask about people’s real beliefs, and found a **balance between Catholics and extreme Protestants**.',
          'She became one of the most popular monarchs, especially after ==1588==, when the English defeated the **Spanish Armada**, sent to conquer England and restore Catholicism.',
          'She was very skilled at **managing Parliament**.',
          'The Elizabethan period saw growing **patriotism**. **Sir Francis Drake**, a commander against the Armada, sailed around the world in the **Golden Hind**. English settlers first began to colonise the **east coast of America**.',
          'It is remembered for rich poetry and drama, especially **William Shakespeare**.'
        ] },
        { t: 'gallery', items: ['elizabeth-i', 'golden-hind'] },
        { t: 'h', x: 'Scotland and Mary, Queen of Scots' },
        { t: 'list', items: [
          'In ==1560== the mainly Protestant Scottish Parliament abolished the Pope’s authority; Catholic services became illegal. A Protestant **Church of Scotland** was established but, unlike in England, it was **not a state Church**.',
          '**Mary Stuart** (Mary, Queen of Scots) was a Catholic who became queen at **a week old** and spent much of her childhood in France.',
          'Suspected of involvement in her husband’s murder, she fled to England and gave her throne to her Protestant son, **James VI**. Elizabeth I, her cousin, kept her prisoner for **20 years**; she was executed for plotting against Elizabeth.'
        ] },
        { t: 'viz', v: 'shakespeare' },
        { t: 'h', x: 'James VI and I' },
        { t: 'list', items: [
          'Elizabeth never married. When she died in ==1603== her cousin **James VI of Scotland** became **James I of England, Wales and Ireland**. Scotland remained a separate country.',
          'His reign produced the **King James Version** (Authorised Version) of the Bible, still used in many Protestant churches.',
          'Ireland was almost completely Catholic. Henry VII and Henry VIII had extended English control beyond the Pale; Henry VIII took the title **King of Ireland**, and local leaders followed the **Lord Lieutenants** in Dublin.',
          'Under Elizabeth I and James I, Protestant settlers from Scotland (especially the south-west) and England were given land in **Ulster**, taken from Catholic landholders: the **plantations**. This had serious long-term consequences.'
        ] },
        { t: 'h', x: 'The rise of Parliament and the civil war' },
        { t: 'viz', v: 'civilwar' },
        { t: 'list', items: [
          'James I and **Charles I** believed in the **Divine Right of Kings**: the king was appointed by God and need not seek Parliament’s approval.',
          'Charles ruled **11 years without Parliament**, but trouble in Scotland forced him to recall it.',
          'He tried to impose a revised **Prayer Book** on the Presbyterian Church in Scotland, causing serious unrest and a Scottish army.',
          'In ==1640== he recalled Parliament to ask for money. Many MPs were **Puritans** (Protestants wanting strict, simple worship). They refused, even after the Scots invaded England.',
          'A rebellion began in **Ireland**. Parliament demanded control of the army. Charles entered the Commons to **arrest five MPs**, who had been warned and were not there. **No monarch has set foot in the Commons since.**',
          'Civil war began in ==1642==: **Cavaliers** (for the king) against **Roundheads** (for Parliament).'
        ] },
        { t: 'h', x: 'Oliver Cromwell and the English Republic' },
        { t: 'photo', src: 'cromwell', side: true },
        { t: 'list', items: [
          'The king’s army was defeated at **Marston Moor** and **Naseby**. By ==1646== Parliament had won. Charles still refused to agree and was **executed in 1649**.',
          'England became a **republic** called the **Commonwealth**, with no monarch. The army was in control.',
          '**Oliver Cromwell** was sent to Ireland to crush the revolt that began in 1641. He succeeded with such violence that he remains **controversial in Ireland** today.',
          'The Scots had not agreed to the execution and crowned **Charles II**. Cromwell defeated his army at **Dunbar** and **Worcester**. Charles famously **hid in an oak tree** and fled to Europe.',
          'Cromwell became **Lord Protector** and ruled until his death in ==1658==. His son **Richard** could not control the army. After 11 years as a republic, people wanted stability and a king.'
        ] },
        { t: 'h', x: 'The Restoration' },
        { t: 'list', items: [
          'In ==May 1660== Parliament invited **Charles II** back from exile in the Netherlands. He had ‘no wish to go on his travels again’ and knew he must sometimes agree with Parliament.',
          'The Church of England became the established Church again; Catholics and Puritans were kept out of power.',
          '==1665==: a major outbreak of **plague** in London. ==1666==: a **great fire** destroyed much of the city, including St Paul’s. **Sir Christopher Wren** designed the new St Paul’s. **Samuel Pepys** wrote about these events in his diary.',
          '==1679==: the **Habeas Corpus Act** (‘you must present the person in court’): no one can be held prisoner unlawfully; every prisoner has the right to a court hearing.',
          'The **Royal Society** was formed to promote ‘natural knowledge’: the **oldest surviving scientific society in the world**. Early members included **Sir Edmund Halley** and **Sir Isaac Newton**.'
        ] },
        { t: 'h', x: 'A Catholic king and the Glorious Revolution' },
        { t: 'list', items: [
          'Charles II had no legitimate children. In ==1685== his Catholic brother became **James II** (James VII of Scotland). He favoured Catholics, made them army officers (forbidden by law) and arrested bishops.',
          'His heirs were two Protestant daughters, but then his wife had a **son**, making a Catholic succession likely.',
          'James’s elder daughter **Mary** was married to **William of Orange**, Protestant ruler of the Netherlands. In ==1688== Protestants invited William to invade. There was **no resistance**; James fled to France. William and Mary ruled jointly.',
          'It was called the **Glorious Revolution** because there was no fighting in England and it **guaranteed the power of Parliament**.',
          'James invaded Ireland with a French army but William beat him at the **Battle of the Boyne** in ==1690==, still celebrated by some in Northern Ireland. Restrictions were placed on Catholics in Ireland.',
          'In Scotland a rebellion for James was defeated at **Killiecrankie**. The **MacDonalds of Glencoe** were late taking an oath to William and were **all killed**; the massacre left some Scots distrustful.',
          'James’s supporters were called **Jacobites**.'
        ] },
        { t: 'viz', v: 'histmap', o: { layer: 'tudor', title: 'Where it happened' } },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['How and why religion changed during this period', 'The importance of poetry and drama in the Elizabethan period', 'About the involvement of Britain in Ireland', 'The development of Parliament and the only period in history when England was a republic', 'Why there was a restoration of the monarchy', 'How the Glorious Revolution happened']
    },

    // ================= A GLOBAL POWER (1689-1815) =================
    {
      id: 'global-power', station: 'Global power', title: 'A global power', era: '1689 – 1833', mins: 9, hero: 'industry',
      blocks: [
        { t: 'lead', x: 'Parliament takes control, Scotland and then Ireland join the Union, Britain industrialises first, and the slave trade is abolished.' },
        { t: 'h', x: 'Constitutional monarchy: the Bill of Rights (1689)' },
        { t: 'list', items: [
          'At the coronation of William and Mary a **Declaration of Rights** was read: the king could no longer raise taxes or administer justice without Parliament.',
          'The **Bill of Rights, 1689**, confirmed the rights of Parliament and limits on the king. Parliament controlled who could be monarch, who **had to be Protestant**.',
          'A new Parliament had to be elected **at least every three years** (later seven, now **five**). Every year the monarch had to ask Parliament to renew funding for the army and navy.',
          'Monarchs now needed ministers with majorities in both Houses. The two main groups were the **Whigs** and the **Tories** (the Conservatives are still called Tories): **the beginning of party politics**.',
          'From ==1695== newspapers could operate **without a government licence**: the start of a **free press**.',
          'This is the start of **constitutional monarchy**. But it was not a modern democracy: only **men owning property** of a certain value could vote, and **no women**. Some seats were **pocket boroughs** (controlled by one wealthy family); some had hardly any voters: **rotten boroughs**.'
        ] },
        { t: 'h', x: 'A growing population' },
        { t: 'list', items: [
          'Many people left to settle in America and other colonies, while others arrived.',
          'The **first Jews since the Middle Ages** settled in London in ==1656==.',
          'Between ==1680 and 1720== many **Huguenots** came from France: Protestants persecuted for their religion. Many were educated and skilled: scientists, bankers, weavers and craftspeople.'
        ] },
        { t: 'h', x: 'Union, the first Prime Minister and the Jacobites' },
        { t: 'list', items: [
          'Queen **Anne** had no surviving children, creating uncertainty over the succession. The **Act of Union** (the **Treaty of Union** in Scotland) was agreed in ==1707==, creating the **Kingdom of Great Britain**.',
          'Scotland was no longer independent, but **kept its own legal and education systems and Presbyterian Church**.',
          'When Anne died in ==1714== Parliament chose **George I**, a German and her nearest Protestant relative. A Jacobite attempt to crown James II’s son was quickly defeated.',
          'George I did not speak good English, so relied more on ministers. The most important became known as the **Prime Minister**. The first was **Sir Robert Walpole** (==1721–1742==).',
          'In ==1745== **Charles Edward Stuart** (**Bonnie Prince Charlie**), grandson of James II, landed in Scotland with support from Highland clansmen. He was defeated by George II’s army at **Culloden** in ==1746== and escaped to Europe.',
          'The clans lost power: chieftains became landlords and clansmen became paying tenants. In the **Highland Clearances** landlords destroyed small farms (**crofts**) for sheep and cattle; evictions peaked in the early 19th century and many Scots left for North America.'
        ] },
        { t: 'viz', v: 'burns' },
        { t: 'h', x: 'The Enlightenment' },
        { t: 'list', items: [
          'In the 18th century, new ideas about politics, philosophy and science developed. Many great thinkers were **Scottish**.',
          '**Adam Smith**: ideas about economics still used today. **David Hume**: ideas about human nature. **James Watt**: steam power, helping the Industrial Revolution.',
          'A key principle: **everyone has the right to their own political and religious beliefs** and the state should not dictate them. This is still important in the UK today.'
        ] },
        { t: 'h', x: 'The Industrial Revolution' },
        { t: 'photo', src: 'wheat', side: true },
        { t: 'list', items: [
          'Before the 18th century, **agriculture** was the biggest employer, with many **cottage industries** (cloth and lace made at home).',
          'The **Industrial Revolution** was the rapid development of industry in the 18th and 19th centuries. **Britain was the first country to industrialise on a large scale**, using machinery and **steam power**.',
          'Coal and raw materials powered factories; people moved from the countryside to mining and manufacturing.',
          'The **Bessemer process** for mass-producing steel led to shipbuilding and the railways. Manufacturing became the main source of employment.',
          '**Canals** linked factories to towns, cities and ports, especially in the middle and north of England.',
          'Working conditions were very poor: no laws protected workers, hours were long and dangerous, and **children** worked like adults or worse.',
          'Colonies grew: **Captain James Cook** mapped Australia’s coast; Britain gained **Canada**; the **East India Company** controlled large parts of India; colonies began in southern Africa.',
          'Sugar and tobacco came from North America and the West Indies; textiles, tea and spices from India and today’s Indonesia. Trade often brought conflict with **France**.'
        ] },
        { t: 'viz', v: 'art', o: { a: 'steam', title: 'How steam power works' } },
        { t: 'viz', v: 'worldmap', o: { only: ['trade'], title: 'Trade and colonies in the 1700s' } },
        { t: 'h', x: 'The slave trade' },
        { t: 'viz', v: 'worldmap', o: { only: ['slavery'], title: 'The route of the slave trade' } },
        { t: 'viz', v: 'slavery' },
        { t: 'h', x: 'Wars with America and France' },
        { t: 'list', items: [
          'By the 1760s the North American colonies were wealthy and largely self-governing. Many colonists had gone there for **religious freedom**.',
          'Britain wanted to tax them; colonists said ‘**no taxation without representation**’. In ==1776== **13 colonies declared independence**. Britain recognised it in ==1783==.',
          'After the French revolution of ==1789== France declared war. **Napoleon** continued it.',
          '**Battle of Trafalgar** (==1805==): **Admiral Nelson** beat the French and Spanish fleets but was killed. **Nelson’s Column** is in Trafalgar Square; his ship **HMS Victory** is in Portsmouth.',
          '**Battle of Waterloo** (==1815==): the **Duke of Wellington** (the **Iron Duke**, later PM) defeated Napoleon, ending the French Wars.'
        ] },
        { t: 'h', x: 'The Union Flag' },
        { t: 'viz', v: 'unionflag' },
        { t: 'viz', v: 'histmap', o: { layer: 'global', title: 'Where it happened' } },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['The change in the balance of power between Parliament and the monarchy', 'When and why Scotland joined England and Wales to become Great Britain', 'The reasons for a rebellion in Scotland led by Bonnie Prince Charlie', 'The ideas of the Enlightenment', 'The importance of the Industrial Revolution and development of industry', 'The slave trade and when it was abolished']
    },

    // ================= VICTORIAN =================
    {
      id: 'victorian', station: 'Victorians', title: 'The Victorian Age and the Empire', era: '1832 – 1902', mins: 8, hero: 'victoria',
      blocks: [
        { t: 'lead', x: 'In ==1837== **Queen Victoria** became queen at **18**. She reigned until ==1901==, almost **64 years**. Britain grew in power abroad, the middle classes grew, and reformers improved life for the poor.' },
        { t: 'h', x: 'The British Empire' },
        { t: 'tiles', items: [
          { k: '400m+', v: 'people', x: 'Estimated population of the Empire, the largest the world has ever seen' },
          { k: '13m', v: 'emigrants', x: 'British citizens who left the country between 1853 and 1913' },
          { k: '120,000', v: 'Jewish refugees', x: 'Russian and Polish Jews who came 1870–1914, settling in London’s East End, Manchester and Leeds' }
        ] },
        { t: 'p', x: 'The Empire grew to cover **all of India, Australia and large parts of Africa**. People from the Empire, including India and Africa, came to Britain to live, work and study.' },
        { t: 'viz', v: 'worldmap', o: { only: ['empire'], title: 'The British Empire at its height' } },
        { t: 'h', x: 'Trade and industry' },
        { t: 'list', items: [
          'The government promoted **free trade**. The **Corn Laws** (which prevented cheap grain imports) were repealed in ==1846==, making raw materials cheaper.',
          'In ==1847== working hours for **women and children** were limited to **10 hours a day**. Better housing was built for workers.',
          '**George and Robert Stephenson**, father and son, pioneered the **railway engine** just before Victoria’s reign. Railways expanded across Britain and the Empire.',
          'Engineers such as **Isambard Kingdom Brunel** built bridges, tunnels, railways and ships.',
          'British industry led the world: the UK produced **more than half of the world’s iron, coal and cotton cloth**, and became a centre of finance, insurance and banking.',
          'In ==1851== the **Great Exhibition** opened in **Hyde Park** in the **Crystal Palace**, a huge steel and glass building. Most of the objects were made in Britain.'
        ] },
        { t: 'viz', v: 'art', o: { a: 'rocket', title: 'The railway engine' } },
        { t: 'h', x: 'The Crimean War (1853–1856)' },
        { t: 'list', items: [
          'Britain, with **Turkey and France**, fought **Russia**.',
          'The **first war extensively covered by the media** through news stories and photographs.',
          'Conditions were very poor; many soldiers died of illnesses caught in hospital rather than wounds.',
          'Queen Victoria introduced the **Victoria Cross** to honour acts of valour.',
          '**Florence Nightingale** nursed soldiers in Turkey and reduced the death rate.'
        ] },
        { t: 'h', x: 'Ireland in the 19th century' },
        { t: 'list', items: [
          'Two-thirds of Irish people depended on farming, often tiny plots, and many relied on potatoes.',
          'When the potato crop failed in the middle of the century, **a million people died** and **another million and a half left** Ireland, for the USA and England. By ==1861== there were large Irish populations in **Liverpool, London, Manchester and Glasgow**.',
          'The Irish Nationalist movement grew. The **Fenians** wanted complete independence; **Charles Stuart Parnell** wanted **Home Rule** (Ireland in the UK with its own parliament).'
        ] },
        { t: 'h', x: 'The right to vote' },
        { t: 'viz', v: 'vote' },
        { t: 'list', items: [
          'The **Reform Act of 1832** greatly increased the number of voters, **abolished pocket and rotten boroughs** and gave more seats to towns and cities. Voting was still based on property, so the working class could not vote.',
          'The **Chartists** campaigned for votes for working people and those without property. Another **Reform Act in 1867** created more urban seats and reduced the property needed to vote. Most men, and all women, still could not vote.',
          'Parties began to organise to reach ordinary voters. **Universal suffrage** (every adult can vote) followed in the next century.',
          'Until ==1870== a married woman’s earnings, property and money belonged to her husband. Acts in ==1870 and 1882== let wives keep their own earnings and property.',
          'Women campaigned for the vote and became known as **suffragettes**.'
        ] },
        { t: 'h', x: 'The future of the Empire' },
        { t: 'list', items: [
          'The Empire kept growing until the 1920s, but its future was debated. Supporters saw more trade; others thought it over-expanded, with costly conflicts on **India’s north-west frontier** and in **southern Africa**. Most British people still saw it as a force for good.',
          'The **Boer War** (==1899–1902==) against Dutch settlers (**Boers**) in South Africa lasted over three years. Many died in fighting and more from disease; some public sympathy for the Boers led people to question the Empire.',
          'Parts of the Empire gained more freedom; by the second half of the 20th century there was mostly an **orderly transition from Empire to Commonwealth**.'
        ] },
        { t: 'viz', v: 'kipling' },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['The growth of the British Empire', 'How democracy developed during this period']
    },

    // ================= 20th CENTURY =================
    {
      id: 'twentieth-century', station: '20th century', title: 'The 20th century: two world wars', era: '1900 – 1945', mins: 8, hero: 'ww1',
      blocks: [
        { t: 'lead', x: 'The early 20th century was a time of optimism: Britain was a global ‘superpower’ with an expansive Empire, a well-admired navy, thriving industry and strong political institutions.' },
        { t: 'list', h: 'Social progress before the war', items: [
          'Financial help for the unemployed, **old-age pensions** and **free school meals**.',
          'Laws to improve workplace safety; tighter town planning to prevent slums; better support for mothers and children after divorce or separation.',
          'Local government became more democratic, and **MPs were paid a salary** for the first time, so more people could take part in public life.'
        ] },
        { t: 'h', x: 'The First World War (1914–1918)' },
        { t: 'list', items: [
          'On ==28 June 1914== **Archduke Franz Ferdinand** of Austria was assassinated: the trigger. Underlying causes were nationalism, militarism, imperialism and Europe divided into two camps.',
          'It was a global war. **More than a million Indians** fought for Britain and around **40,000** were killed. Men from the West Indies, Africa, Australia, New Zealand and Canada also fought.',
          'Millions were killed or wounded, with **more than 2 million British casualties**. The **Somme** attack in ==July 1916== caused about **60,000 British casualties on the first day alone**.',
          'The war ended at ==11.00 am on 11 November 1918== with victory for Britain and its allies.'
        ] },
        { t: 'compare', items: [
          { h: 'The Allied Powers', tone: 'c5', items: ['Britain and the whole British Empire', 'France', 'Russia', 'Japan', 'Belgium', 'Serbia', 'later: Greece, Italy, Romania and the United States'] },
          { h: 'The Central Powers', tone: 'c3', items: ['Germany', 'the Austro-Hungarian Empire', 'the Ottoman Empire', 'later: Bulgaria'] }
        ] },
        { t: 'h', x: 'The partition of Ireland' },
        { t: 'viz', v: 'ireland' },
        { t: 'h', x: 'The inter-war period' },
        { t: 'list', items: [
          'In the 1920s living conditions improved, with better public housing and new homes.',
          'In ==1929== the world entered the **Great Depression**. Some areas suffered mass unemployment; heavy industries like **shipbuilding** were badly affected.',
          'New industries grew: **automobile** and **aviation**. Prices fell, so people in work had more to spend. **Car ownership doubled from 1 million to 2 million** between 1930 and 1939. Many new houses were built.',
          'A cultural blossoming: writers **Graham Greene** and **Evelyn Waugh**; economist **John Maynard Keynes**.',
          'The **BBC** started radio broadcasts in ==1922== and the **world’s first regular television service** in ==1936==.'
        ] },
        { t: 'h', x: 'The Second World War (1939–1945)' },
        { t: 'viz', v: 'ww2map' },
        { t: 'viz', v: 'ww2' },
        { t: 'photo', src: 'ww2-planes' },
        { t: 'compare', items: [
          { h: 'The Allies', tone: 'c5', items: ['the UK', 'France', 'Poland', 'Australia', 'New Zealand', 'Canada', 'the Union of South Africa', 'later: the USA and the Soviet Union fought Germany too'] },
          { h: 'The Axis powers', tone: 'c3', items: ['fascist Germany', 'Italy', 'the Empire of Japan'] }
        ] },
        { t: 'h', x: 'Churchill’s speeches' },
        { t: 'viz', v: 'churchill' },
        { t: 'viz', v: 'art', o: { a: 'penicillin', title: 'How penicillin was discovered' } },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['What happened during the First World War', 'The partition of Ireland and the establishment of the UK as it is today', 'The events of the Second World War']
    },

    // ================= SINCE 1945 =================
    {
      id: 'since-1945', station: 'Since 1945', title: 'Britain since 1945', era: '1945 – today', mins: 10,
      blocks: [
        { t: 'lead', x: 'The UK had won the war but was exhausted economically, and people wanted change. The welfare state, migration, the Swinging Sixties, devolution and a run of British inventions shaped modern Britain.' },
        { t: 'viz', v: 'govts' },
        { t: 'h', x: 'The welfare state' },
        { t: 'viz', v: 'giants' },
        { t: 'list', items: [
          'In ==1945== voters elected a **Labour** government. PM **Clement Attlee** promised the welfare state outlined in the **Beveridge Report**.',
          'In ==1948== **Aneurin (Nye) Bevan**, Minister for Health, led the creation of the **NHS**: a minimum standard of health care for all, **free at the point of use**.',
          'A national system of benefits (‘**social security**’) protected people ‘from the **cradle to the grave**’.',
          'The government **nationalised** the railways, coal mines, and gas, water and electricity supplies.',
          'The wartime **Education Act 1944** (‘the Butler Act’, R A Butler) introduced **free secondary education** in England and Wales, and the primary/secondary division that still exists.',
          'In ==1947== independence was granted to **nine countries**, including **India, Pakistan and Ceylon** (now Sri Lanka). Colonies in Africa, the Caribbean and the Pacific followed over the next 20 years.',
          'The UK developed its own **atomic bomb** and joined **NATO**, set up to resist the perceived threat from the Soviet Union.',
          '**Conservative** government ==1951–1964==: economic recovery and rising prosperity. PM **Harold Macmillan** gave the ‘**wind of change**’ speech about decolonisation.'
        ] },
        { t: 'viz', v: 'worldmap', o: { only: ['independence'], title: 'Independence for former colonies' } },
        { t: 'h', x: 'Migration in post-war Britain' },
        { t: 'list', items: [
          'Labour shortages: workers from **Ireland and Europe** were encouraged to help rebuild. In ==1948== people from the **West Indies** were invited to work.',
          'In the 1950s recruitment centres in the West Indies hired **bus drivers**; textile and engineering firms in the north of England and the Midlands sent agents to **India and Pakistan**.',
          'For about **25 years** people from the West Indies, India, Pakistan and later **Bangladesh** came to work and settle.',
          'In the late 1960s new laws restricted immigration: immigrants needed a strong connection to Britain through birth or ancestry.',
          'In the early 1970s Britain admitted **28,000 people of Indian origin** forced to leave **Uganda**.'
        ] },
        { t: 'viz', v: 'worldmap', o: { only: ['migration'], title: 'Where people came from after the war' } },
        { t: 'h', x: 'The Swinging Sixties' },
        { t: 'list', items: [
          'Growth in British fashion, cinema and pop music: **The Beatles** and **The Rolling Stones**. People became better off and bought cars and consumer goods.',
          'Social laws were liberalised, for example on **divorce** and **abortion** in England, Wales and Scotland.',
          'Women gained the right to **equal pay** and it became illegal to discriminate against them because of their gender (employers had often made women leave when they married).',
          'Technological progress: Britain and France developed **Concorde**. High-rise concrete and steel buildings became common.'
        ] },
        { t: 'h', x: 'Great British inventions of the 20th century' },
        { t: 'viz', v: 'inventions' },
        { t: 'note', kind: 'exam', x: 'For inventions you do not need to remember dates of births and deaths, but do link each invention to its inventor.' },
        { t: 'h', x: 'The 1970s' },
        { t: 'list', items: [
          'The post-war boom ended. Prices rose sharply and the pound was unstable, causing **balance of payments** problems (imports worth more than exports).',
          'Many **strikes**; people argued the **trade unions** were too powerful.',
          'Serious unrest in **Northern Ireland**: in ==1972== its Parliament was suspended and it was ruled directly from London. Some **3,000 people** died in the violence in the decades after 1969.',
          '**Europe**: West Germany, France, Belgium, Italy, Luxembourg and the Netherlands formed the **EEC** in ==1957==. The UK joined in ==1973==. It never used the Euro, and left the EU in ==2020==.'
        ] },
        { t: 'h', x: 'Conservative government 1979–1997' },
        { t: 'list', items: [
          '**Margaret Thatcher**, the **first woman PM**, led from ==1979 to 1990==.',
          '**Privatisation** of nationalised industries and legal controls on **trade union** powers.',
          '**Deregulation** grew the **City of London** as a centre for investment, insurance and finance. Traditional industries such as **shipbuilding and coal mining** declined.',
          'In ==1982== **Argentina invaded the Falkland Islands**; a naval taskforce recovered them.',
          '**John Major** followed Thatcher and helped establish the **Northern Ireland peace process**.'
        ] },
        { t: 'h', x: 'Labour government 1997–2010' },
        { t: 'list', items: [
          '**Tony Blair**’s government introduced a **Scottish Parliament** (substantial law-making powers) and a **Welsh Assembly** (fewer legislative powers but considerable control over public services).',
          'The **Good Friday Agreement** was signed in ==1998==. The **Northern Ireland Assembly** was elected in ==1999==, suspended in ==2002== and reinstated in ==2007==. Most paramilitary groups have decommissioned their arms.',
          '**Gordon Brown** became PM in ==2007==.'
        ] },
        { t: 'h', x: 'Conflicts abroad' },
        { t: 'list', items: [
          'In the 1990s Britain helped liberate **Kuwait** after Iraq invaded in ==1990==, and took part in the conflict in the former Republic of **Yugoslavia**.',
          'Since 2000, British forces have fought international terrorism and the spread of weapons of mass destruction, in **Afghanistan** and **Iraq**. Combat troops left Iraq in ==2009==.',
          'In Afghanistan the UK served in the UN-mandated, **50-nation ISAF** coalition, building up Afghan security forces, with full Afghan responsibility by the end of ==2014==.'
        ] },
        { t: 'h', x: 'Recent governments' },
        { t: 'list', items: [
          'In ==May 2010== no party won an overall majority, for the first time since **February 1974**. The **Conservatives and Liberal Democrats** formed a coalition under **David Cameron**.',
          'Conservative governments ==2015–2024== had five PMs: **David Cameron, Theresa May, Boris Johnson, Liz Truss and Rishi Sunak**. Events included the ==2016== **EU referendum (Brexit)** and the **COVID-19 pandemic**. Sunak called an election for ==4 July 2024==.',
          '**Labour**, led by **Keir Starmer**, won a majority in the ==2024== general election.'
        ] },
        { t: 'events' },
        { t: 'people' }
      ],
      check: ['The establishment of the welfare state', 'How life in Britain changed in the 1960s and 1970s', 'British inventions of the 20th century', 'Events since 1979']
    }
  ]
});

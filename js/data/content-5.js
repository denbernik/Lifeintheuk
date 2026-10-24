window.BOOK = window.BOOK || [];

window.BOOK.push({
  id: 'ch5', n: 5, color: 'c5',
  title: 'The UK government, the law and your role',
  short: 'Government & law',
  blurb: 'How the UK is governed, how laws, police and courts work, your rights, and how to take part in your community.',
  sections: [
    // ================= DEMOCRACY & CONSTITUTION =================
    {
      id: 'democracy', station: 'Democracy', title: 'Democracy and the constitution', mins: 5,
      blocks: [
        { t: 'lead', x: 'The UK is a **parliamentary democracy** with the **monarch as head of state**. Democracy is a system where the whole adult population gets a say, by voting directly or choosing representatives.' },
        { t: 'h', x: 'How democracy developed' },
        { t: 'p', x: 'At the turn of the 19th century only a small group could vote: **men over 21 who owned a certain amount of property**. The franchise (the number of people with the right to vote) grew during the 19th century, and parties began to involve ordinary men and women.' },
        { t: 'viz', v: 'chartists' },
        { t: 'viz', v: 'vote' },
        { t: 'h', x: 'The British constitution' },
        { t: 'list', items: [
          'A **constitution** is a set of principles by which a country is governed: its institutions, how their power is kept in check, and its laws and conventions.',
          'The British constitution is **not written down in any single document**, so it is called ‘**unwritten**’.',
          'This is mainly because the UK, unlike America or France, **never had a revolution** that permanently created a totally new system. Institutions developed over hundreds of years.',
          'Some want a single document; others think an unwritten constitution gives **more flexibility** and better government.'
        ] },
        { t: 'viz', v: 'institutions' }
      ],
      check: ['How democracy has developed in the UK', 'What a constitution is and how the UK’s constitution is different from those of most other countries']
    },

    // ================= MONARCHY =================
    {
      id: 'monarchy', station: 'Monarchy', title: 'The monarchy', mins: 5, hero: 'coronation',
      blocks: [
        { t: 'lead', x: 'The UK has a **constitutional monarchy**: the King does not rule the country but **appoints the government** the people have chosen in a democratic election.' },
        { t: 'viz', v: 'royals' },
        { t: 'h', x: 'What the monarch does' },
        { t: 'list', items: [
          'Is **head of state of the UK** and of many Commonwealth countries.',
          'Invites the leader of the party with the most MPs (or of a coalition) to become **Prime Minister**.',
          'Meets the PM regularly and can **advise, warn and encourage**, but government decisions are made by the PM and cabinet.',
          '**Opens each new parliamentary session** with a speech summarising the government’s policies for the year. All **Acts of Parliament** are made in the monarch’s name.',
          '**Represents the UK** abroad: receives ambassadors and high commissioners, entertains visiting heads of state, makes state visits.',
          'Provides **stability and continuity** whilst governments change, and a focus for national identity and pride, as seen in the Jubilee celebrations.'
        ] },
        { t: 'h', x: 'The national anthem' },
        { t: 'poem', title: 'God Save the King', by: 'First verse. Played at national occasions and events attended by the King or the Royal Family.', lines: ['God save our gracious King!', 'Long live our noble King!', 'God save the King!', 'Send him victorious,', 'Happy and glorious,', 'Long to reign over us,', 'God save the King!'] },
        { t: 'h', x: 'Oath or affirmation of allegiance' },
        { t: 'p', x: 'New citizens **swear or affirm loyalty to the King** as part of the citizenship ceremony. The oath mentions God; the affirmation does not.' },
        { t: 'compare', items: [
          { h: 'Oath of allegiance', tone: 'c5', text: '‘I (name) swear by Almighty God that on becoming a British citizen, I will be faithful and bear true allegiance to His Majesty King Charles the Third, his Heirs and Successors, according to law.’' },
          { h: 'Affirmation of allegiance', tone: 'c1', text: '‘I (name) do solemnly, sincerely and truly declare and affirm that on becoming a British citizen, I will be faithful and bear true allegiance to His Majesty King Charles the Third, his Heirs and Successors, according to law.’' }
        ] }
      ],
      check: ['The role of the monarch']
    },

    // ================= PARLIAMENT =================
    {
      id: 'parliament', station: 'Parliament', title: 'Parliament and elections', mins: 6,
      blocks: [
        { t: 'lead', x: 'The UK is divided into **parliamentary constituencies**. Voters in each elect a **Member of Parliament (MP)** at a **General Election**. All the MPs form the **House of Commons**; the party with a majority forms the government. If no party has a majority, two parties can form a **coalition**.' },
        { t: 'viz', v: 'houses' },
        { t: 'gallery', items: ['house-of-commons', 'house-of-lords'] },
        { t: 'h', x: 'The Speaker' },
        { t: 'list', items: [
          'Chairs debates in the House of Commons; the **chief officer** of the Commons.',
          '**Neutral**: does not represent a party, even though the Speaker is an MP with a constituency and constituents.',
          'Chosen by other MPs in a **secret ballot**.',
          'Keeps order, makes sure rules are followed, guarantees the opposition time to debate issues it chooses, and represents Parliament on ceremonial occasions.'
        ] },
        { t: 'h', x: 'Elections' },
        { t: 'viz', v: 'elections' },
        { t: 'h', x: 'Contacting elected members' },
        { t: 'list', items: [
          'All elected members must serve and represent their constituents. Find contact details at your **local library** or **www.parliament.uk**; they are also in **The Phone Book** (BT) and **Yellow Pages**.',
          'Contact MPs by letter or phone at their **constituency office** or at the House of Commons, Westminster, London SW1A 0AA (020 7729 3000).',
          'Many hold local ‘**surgeries**’ where you can talk to them in person, often advertised in the local newspaper.'
        ] }
      ],
      check: ['The role of the House of Commons and House of Lords', 'What the Speaker does', 'How the UK elects MPs and MEPs']
    },

    // ================= GOVERNMENT =================
    {
      id: 'government', station: 'Government', title: 'The government and devolution', mins: 8,
      blocks: [
        { t: 'lead', x: 'The Prime Minister leads the government with a cabinet of senior ministers. The opposition holds them to account, and devolved administrations run many services in Scotland, Wales and Northern Ireland.' },
        { t: 'viz', v: 'cabinet' },
        { t: 'h', x: 'The Prime Minister' },
        { t: 'list', items: [
          'The **leader of the party in power**. Appoints the cabinet and controls many important public appointments.',
          'Official home: **10 Downing Street**, central London, near Parliament. Country house: **Chequers**.',
          'Can be changed if MPs in the governing party decide, or if they resign. The PM usually resigns if the party loses a General Election.'
        ] },
        { t: 'h', x: 'The opposition' },
        { t: 'list', items: [
          'The **second-largest party** in the Commons. Its leader usually becomes PM if the party wins the next election.',
          'Points out the government’s failures and weaknesses, especially at **Prime Minister’s Questions**, every week whilst Parliament sits.',
          'The leader of the opposition appoints **shadow ministers**, who form the **shadow cabinet** to challenge the government and propose alternatives.'
        ] },
        { t: 'h', x: 'Parties and pressure groups' },
        { t: 'list', items: [
          'Anyone **aged 18 or over** can stand as an MP, but is unlikely to win without a major party: the **Conservative Party**, the **Labour Party**, the **Liberal Democrats**, or parties for Scottish, Welsh or Northern Irish interests.',
          'MPs not in any main party are **independents**, usually representing a local issue.',
          'Parties look for members to join debates, contribute to costs and help at elections. They have branches in most constituencies and hold yearly **policy-making conferences**.',
          '**Pressure and lobby groups** try to influence government policy. Some represent groups, like the **CBI** (Confederation of British Industry, for business); others campaign on topics, like **Greenpeace** (environment) or **Liberty** (human rights).'
        ] },
        { t: 'h', x: 'The civil service' },
        { t: 'list', items: [
          'Civil servants support the government in developing and implementing policy, and deliver public services. They are **accountable to ministers**.',
          'Chosen **on merit** and **politically neutral**: they are not political appointees. Anyone can apply.',
          'Core values: **integrity, honesty, objectivity and impartiality** (including being politically neutral).'
        ] },
        { t: 'h', x: 'Local government' },
        { t: 'list', items: [
          'Towns, cities and rural areas are run by elected **councils** (‘local authorities’). Some areas have both **district and county** councils; most large towns and cities have a single authority.',
          'Funded by **central government** and **local taxes**.',
          'Many appoint a **mayor** as ceremonial leader; in some towns the mayor is elected to lead the administration.',
          '**London has 33 local authorities**, with the **Greater London Authority** and the **Mayor of London** coordinating policy.',
          'Local elections for councillors are held in **May every year** in most areas.'
        ] },
        { t: 'h', x: 'Devolved administrations' },
        { t: 'p', x: 'Since ==1997== some powers have been **devolved** to give people in Wales, Scotland and Northern Ireland more control over matters that directly affect them. Each devolved administration has its **own civil service**.' },
        { t: 'viz', v: 'devolution' },
        { t: 'h', x: 'The media and government' },
        { t: 'list', items: [
          'Parliament is broadcast on TV and published in official reports called **Hansard** (in large libraries and at www.parliament.uk).',
          'The UK has a **free press**: newspapers are free from government control. Some owners and editors hold strong views and run campaigns.',
          'By law, radio and TV coverage of political parties must be **balanced**, with equal time for rival viewpoints.'
        ] }
      ],
      check: ['The role of the Prime Minister, cabinet, opposition and shadow cabinet', 'The role of political parties in the UK system of government', 'Who the main political parties are', 'What pressure and lobby groups do', 'The role of the civil service', 'The role of local government', 'The powers of the devolved governments in Wales, Scotland and Northern Ireland', 'How proceedings in Parliament are recorded', 'The role of the media in keeping people informed about political issues']
    },

    // ================= VOTING =================
    {
      id: 'voting', station: 'Voting', title: 'Who can vote, and how', mins: 5, hero: 'polling-station',
      blocks: [
        { t: 'lead', x: 'The UK has had a **fully democratic voting system since 1928**. The present voting age of **18** was set in **1969**. With a few exceptions, all UK-born and naturalised adult citizens can vote.' },
        { t: 'viz', v: 'whovotes' },
        { t: 'h', x: 'The electoral register' },
        { t: 'list', items: [
          'To vote in a parliamentary, local or European election you must be on the **electoral register**.',
          'Register through your **local council electoral registration office** (find yours by postcode at www.aboutmyvote.co.uk; forms in English, Welsh and other languages).',
          'The register is **updated every year in September or October**. A form goes to every household listing everyone eligible to vote.',
          '**Northern Ireland** uses ‘**individual registration**’: everyone completes their own form, and stays registered whilst their details do not change.',
          'Local authorities must make the register **available for anyone to look at** (supervised), at electoral registration offices and some public buildings such as libraries.'
        ] },
        { t: 'h', x: 'Where and how to vote' },
        { t: 'viz', v: 'pollingday' },
        { t: 'h', x: 'Standing for office' },
        { t: 'list', items: [
          'Most citizens of the **UK, the Irish Republic or the Commonwealth aged 18 or over** can stand for public office.',
          'Exceptions include **members of the armed forces**, **civil servants** and **people found guilty of certain criminal offences**.',
          '**Members of the House of Lords** may not stand for the House of Commons but can stand for all other public offices.'
        ] },
        { t: 'h', x: 'Visiting Parliament and the devolved administrations' },
        { t: 'cards', cols: 2, items: [
          { h: 'UK Parliament', sub: 'Palace of Westminster', x: 'Watch debates from public galleries in both Houses. Write to your MP for tickets or queue on the day; **entrance is free**. Commons queues can take **one to two hours**; the **Lords is usually easier** to get into.' },
          { h: 'Northern Ireland Assembly', sub: 'Stormont, Belfast', x: 'MLAs meet here. Arrange a visit through the **Education Service** or by contacting an **MLA**.' },
          { h: 'Scottish Parliament', sub: 'Holyrood, Edinburgh', x: 'MSPs meet here. Book tickets or tours through **visitor services**.' },
          { h: 'Welsh Assembly', sub: 'The Senedd, Cardiff Bay', x: 'AMs meet here. An **open building**: book guided tours or gallery seats through the Assembly Booking Service.' }
        ] }
      ],
      check: ['Who is eligible to vote', 'How you register to vote', 'How to vote', 'Who can stand for public office', 'How you can visit Parliament, the Northern Ireland Assembly, the Scottish Parliament and the Welsh Assembly']
    },

    // ================= INTERNATIONAL =================
    {
      id: 'international', station: 'International', title: 'The UK and international institutions', mins: 5, hero: 'eu-flag',
      blocks: [
        { t: 'lead', x: 'The UK belongs to several international organisations. Know what each one is for and which the UK is part of.' },
        { t: 'viz', v: 'intl' },
        { t: 'viz', v: 'worldmap', o: { only: ['commonwealth'], title: 'The Commonwealth on the map' } },
        { t: 'h', x: 'Commonwealth member states' },
        { t: 'viz', v: 'commonwealth' },
        { t: 'h', x: 'The European Union and Brexit' },
        { t: 'list', items: [
          'The EU, originally the **European Economic Community (EEC)**, was set up by **six countries** (Belgium, France, Germany, Italy, Luxembourg and the Netherlands) who signed the **Treaty of Rome** on ==25 March 1957==.',
          'The UK first decided not to join, but became a member in ==1973==.',
          'After the Brexit vote, the UK **left the EU** at **23:00 GMT** on ==31 January 2020==. There are now **27 member states**.',
          'European laws are called **directives, regulations or framework decisions**. From ==2024==, no general principle of EU law is part of UK law.'
        ] },
        { t: 'viz', v: 'eumap' },
        { t: 'viz', v: 'eu' }
      ],
      check: ['What the Commonwealth is and its role', 'Other international organisations of which the UK is a member']
    },

    // ================= RIGHTS =================
    {
      id: 'rights', station: 'Rights', title: 'Fundamental principles and rights', mins: 5,
      blocks: [
        { t: 'lead', x: 'Britain has a long history of respecting individual rights. British diplomats and lawyers helped draft the **European Convention on Human Rights**, and the UK was one of the first countries to sign it, in ==1950==.' },
        { t: 'viz', v: 'rightsline' },
        { t: 'h', x: 'Principles in the European Convention on Human Rights' },
        { t: 'chips', items: ['Right to life', 'Prohibition of torture', 'Prohibition of slavery and forced labour', 'Right to liberty and security', 'Right to a fair trial', 'Freedom of thought, conscience and religion', 'Freedom of expression (speech)'] },
        { t: 'p', x: 'The **Human Rights Act 1998** incorporated the Convention into UK law. The government, public bodies and the courts must follow its principles.' },
        { t: 'h', x: 'Equal opportunities' },
        { t: 'p', x: 'UK laws make sure people are not treated unfairly in any area of life or work because of:' },
        { t: 'chips', items: ['age', 'disability', 'sex', 'pregnancy and maternity', 'race', 'religion or belief', 'sexuality', 'marital status'] },
        { t: 'table', head: ['Where', 'Who to contact about discrimination'], rows: [
          ['Anywhere', 'Citizens Advice Bureau'],
          ['England and Wales', 'Equality and Human Rights Commission'],
          ['Scotland', 'Equality and Human Rights Commission in Scotland; Scottish Human Rights Commission'],
          ['Northern Ireland', 'Equality Commission for Northern Ireland; Northern Ireland Human Rights Commission']
        ] },
        { t: 'h', x: 'Serious crimes to know about' },
        { t: 'cards', cols: 3, items: [
          { h: 'Domestic violence', x: 'A serious crime. Anyone violent towards their partner (man or woman, married or living together) can be prosecuted. A man who forces a woman to have sex, **including her husband**, can be charged with **rape**. Get help from a solicitor, Citizens Advice, refuges or shelters, the police, or the **24-hour National Domestic Violence Freephone Helpline: 0808 2000 247**.' },
          { h: 'Female genital mutilation', x: 'FGM (also called cutting or female circumcision) is **illegal**. Practising FGM, or **taking a girl or woman abroad** for FGM, is a criminal offence.' },
          { h: 'Forced marriage', x: 'Marriage needs the **full and free consent** of both people. **Arranged marriages** where both agree are acceptable. Forcing someone to marry is a **criminal offence**. **Forced Marriage Protection Orders**: England, Wales and NI from ==2008== (Forced Marriage (Civil Protection) Act 2007); Scotland from **November 2011**. A victim or someone for them can apply; breaching an order can mean **up to two years in jail** for contempt of court.' }
        ] }
      ],
      check: ['The fundamental principles of UK law', 'That domestic violence, FGM and forced marriage are illegal in the UK']
    },

    // ================= TAX & DRIVING =================
    {
      id: 'tax-driving', station: 'Tax & driving', title: 'Tax, National Insurance and driving', mins: 5,
      blocks: [
        { t: 'lead', x: 'Paying tax and National Insurance funds public services. Driving comes with licences, tests, insurance and road tax.' },
        { t: 'h', x: 'Income tax' },
        { t: 'chips', h: 'You pay tax on income from', items: ['wages from paid employment', 'profits from self-employment', 'taxable benefits', 'pensions', 'income from property, savings and dividends'] },
        { t: 'list', items: [
          'Income tax pays for **roads, education, police and the armed forces**.',
          'For most people the right amount is taken automatically by the employer and paid to **HM Revenue & Customs (HMRC)**: this is **Pay As You Earn (PAYE)**.',
          'If you are **self-employed** you pay through **self-assessment**, which includes a **tax return**. If HMRC sends you a tax return, complete it as soon as you have the information.'
        ] },
        { t: 'h', x: 'National Insurance' },
        { t: 'list', items: [
          'Almost everyone in paid work, including the self-employed, pays **National Insurance Contributions**. They pay for **state benefits** and services such as the **state retirement pension** and the **NHS**.',
          'Employees have NI deducted by their employer; self-employed people pay it themselves.',
          'Not paying enough means you cannot get some **contributory benefits** such as **Jobseeker’s Allowance** or a **full state pension**. Some part-time workers may not qualify for statutory payments like maternity pay.',
          'A **National Insurance number** is a unique personal account number. Young people are sent one **just before their 16th birthday**.',
          'Non-UK nationals looking for or starting work need one, but **can start work without one**. Phone the **Department for Work and Pensions (DWP)**; you may need an interview and documents proving identity and permission to work.',
          'An NI number does **not on its own prove** you have the right to work in the UK.'
        ] },
        { t: 'h', x: 'Driving' },
        { t: 'viz', v: 'driving' }
      ],
      check: ['The system of income tax and National Insurance', 'The requirements for driving a car']
    },

    // ================= THE LAW =================
    {
      id: 'law', station: 'The law', title: 'Respecting the law', mins: 6, hero: 'police',
      blocks: [
        { t: 'lead', x: 'Knowing and obeying the law is one of the most important responsibilities of every resident. **Everyone receives equal treatment under the law.** Some things allowed in other legal systems are not acceptable in the UK.' },
        { t: 'h', x: 'Criminal law and civil law' },
        { t: 'compare', items: [
          { h: 'Criminal law', tone: 'c3', text: 'Relates to **crimes**, usually investigated by the **police** or another authority such as a council, and **punished by the courts**.' },
          { h: 'Civil law', tone: 'c5', text: 'Used to **settle disputes** between individuals or groups.' }
        ] },
        { t: 'viz', v: 'lawsort' },
        { t: 'h', x: 'The police and their duties' },
        { t: 'chips', h: 'The job of the police is to', items: ['protect life and property', 'prevent disturbances (keep the peace)', 'prevent and detect crime'] },
        { t: 'list', items: [
          'Police are organised into separate forces headed by **Chief Constables**, and are **independent of the government**.',
          'In **November 2012** the public elected **Police and Crime Commissioners (PCCs)** in England and Wales. They set local police priorities and budget, and **appoint the Chief Constable**.',
          'Police officers must obey the law and must not misuse their authority, make false statements, be rude or abusive, or commit racial discrimination. Corrupt officers are severely punished.',
          'Officers are supported by **police community support officers (PCSOs)**, who patrol, work with the public and support officers at crime scenes and major events.',
          'Everyone is expected to **help the police** prevent and detect crime. If arrested, you will be told why and can seek legal advice.'
        ] },
        { t: 'h', x: 'Complaints about the police' },
        { t: 'table', head: ['Where', 'Independent complaints body'], rows: [
          ['England and Wales', 'Independent Police Complaints Commission'],
          ['Scotland', 'Police Complaints Commissioner for Scotland'],
          ['Northern Ireland', 'Police Ombudsman for Northern Ireland']
        ] },
        { t: 'p', x: 'You can also complain at a **police station** or by writing to the **Chief Constable** of the force involved.' },
        { t: 'h', x: 'Terrorism and extremism' },
        { t: 'list', items: [
          'The most serious terrorist threat is from **Al Qa’ida**, its affiliates and like-minded groups; there are other threats such as **Northern Ireland-related terrorism**.',
          'Terrorist groups try to **radicalise and recruit**, but attract very low public support.',
          '**Extremism** is vocal or active opposition to fundamental British values, including religious and far-right extremism.',
          'If someone tries to persuade you to join an extremist or terrorist cause, **notify your local police**.'
        ] }
      ],
      check: ['The difference between civil and criminal law and some examples of each', 'The duties of the police', 'The possible terrorist threats facing the UK']
    },

    // ================= COURTS =================
    {
      id: 'courts', station: 'Courts', title: 'The courts', mins: 6,
      blocks: [
        { t: 'lead', x: 'Judges (together, **the judiciary**) interpret the law and make sure trials are fair. **The government cannot interfere.**' },
        { t: 'list', items: [
          'If judges find government actions illegal, the government must **change its policies** or ask Parliament to **change the law**.',
          'If a public body is not respecting someone’s legal rights, judges can order it to change and/or **pay compensation**.',
          'Judges also decide disputes between people or organisations: contracts, property, employment rights, accidents.'
        ] },
        { t: 'h', x: 'Which court? Try it' },
        { t: 'viz', v: 'courtfinder' },
        { t: 'h', x: 'The courts compared' },
        { t: 'viz', v: 'courts' },
        { t: 'h', x: 'Juries' },
        { t: 'list', items: [
          'A jury is chosen **at random from the local electoral register**: **12 members** in England, Wales and Northern Ireland, **15 in Scotland**.',
          'If summoned you must serve unless **not eligible** (e.g. a criminal conviction) or you have a **good reason** to be excused, such as ill health.',
          'The jury decides **‘guilty’ or ‘not guilty’**. In **Scotland** a third verdict, **‘not proven’**, is possible. If guilty, **the judge decides the penalty**.'
        ] },
        { t: 'h', x: 'Legal advice: solicitors' },
        { t: 'list', items: [
          '**Solicitors** are trained lawyers who give legal advice, act for clients and represent them in court.',
          'Check which areas of law a solicitor specialises in. Find one through local newspapers, **Yellow Pages**, the **Citizens Advice Bureau**, or the **Law Society** (England and Wales), **Law Society of Scotland** or **Law Society of Northern Ireland**.',
          'Charges are usually based on **time spent**. Find out at the start how much a case is likely to cost.'
        ] }
      ],
      check: ['The role of the judiciary', 'About the different criminal courts in the UK', 'About the different civil courts in the UK', 'How you can settle a small claim']
    },

    // ================= COMMUNITY =================
    {
      id: 'community', station: 'Community', title: 'Your role in the community', mins: 6,
      blocks: [
        { t: 'lead', x: 'Becoming a citizen or settling in the UK brings responsibilities and opportunities. Everyone can take part in their community.' },
        { t: 'h', x: 'Shared values and responsibilities' },
        { t: 'chips', items: ['obey and respect the law', 'be aware of and respect the rights of others', 'treat others with fairness', 'behave responsibly', 'help and protect your family', 'respect and preserve the environment', 'treat everyone equally, regardless of sex, race, religion, age, disability, class or sexual orientation', 'work to provide for yourself and your family', 'help others', 'vote in local and national government elections'] },
        { t: 'h', x: 'Being a good neighbour' },
        { t: 'list', items: [
          'Introduce yourself when you move in. Neighbours can help you make friends, feed pets whilst you are away and advise on local shops and services.',
          'Prevent problems by respecting their **privacy**, limiting **noise**, keeping your **garden tidy**, and putting **bins** out only when they are due to be collected.'
        ] },
        { t: 'h', x: 'Ways to support your community' },
        { t: 'cards', cols: 2, items: [
          { h: 'Jury service', x: 'Anyone on the electoral register aged **18 to 70** can be randomly selected.' },
          { h: 'Helping in schools', x: 'Help in classrooms, listen to children read, help raise money at book or toy sales. Events are often run by **parent-teacher associations (PTAs)**.' },
          { h: 'School governors and school boards', x: 'Local people (called **school board** members in Scotland), aged **18 or over**, no upper age limit. Three roles: **setting the strategic direction**, **ensuring accountability**, **monitoring and evaluating performance**. In England, parents and community groups can also apply to open a **free school**.' },
          { h: 'Supporting political parties', x: 'Members hand out leaflets and knock on doors at elections: ‘**canvassing**’. You **do not have to tell a canvasser** how you will vote. Citizens can stand as a councillor, MP (or devolved equivalent).' },
          { h: 'Helping with local services', x: 'Volunteer at hospitals and youth projects, or on the governing bodies of universities, housing associations, museums and arts councils. Become a **special constable** or a lay (non-police) representative, or a **magistrate**.' },
          { h: 'Blood and organ donation', x: 'Giving blood takes **about an hour**. Register to be an **organ donor** to make it easier for your family to decide. **Living people can donate a kidney.**' }
        ] },
        { t: 'h', x: 'Volunteering' },
        { t: 'list', items: [
          'Volunteering is **working for good causes without payment**. You meet people, help your community, and can practise English or build work skills for your CV.',
          'Examples: animal rescue shelters, youth groups, litter pick-ups, homelessness shelters, mentoring someone just out of prison, hospital information desks, residential care homes.',
          'Charities include the **British Red Cross**, **Age UK** (older people), the **NSPCC** (children), **Crisis** and **Shelter** (homeless), **Cancer Research UK**, the **National Trust** and **Friends of the Earth** (environment), and the **PDSA** (animals).',
          'Young people can join the **National Citizen Service** programme, for **16- and 17-year-olds**: outdoor activities, skills and a community project.'
        ] },
        { t: 'h', x: 'Looking after the environment' },
        { t: 'list', items: [
          '**Recycle** as much waste as you can: it uses less energy, needs fewer raw materials and puts less rubbish into **landfill**.',
          '**Shop locally** to help local businesses and farmers and reduce your **carbon footprint**.',
          '**Walk and use public transport** when you can: it creates less pollution than driving.'
        ] }
      ],
      check: ['The different ways you can help at your child’s school', 'The role of school governors and members of school boards, and how you can become one', 'The role of members of political parties', 'The different local services people can volunteer to support', 'How to donate blood and organs', 'The benefits of volunteering for you, other people and the community', 'The types of activities that volunteers can do', 'How you can look after the environment']
    }
  ]
});

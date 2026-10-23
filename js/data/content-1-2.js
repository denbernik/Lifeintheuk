/* Chapter content. Text supports **bold**, *italic* and ==highlight== (dates, numbers). */
window.BOOK = window.BOOK || [];

window.BOOK.push({
  id: 'ch1', n: 1, color: 'c1',
  title: 'The values and principles of the UK',
  short: 'Values & principles',
  blurb: 'The rights and responsibilities of everyone who lives in the UK, how to become a permanent resident, and how the test works.',
  sections: [
    {
      id: 'values', station: 'Values', title: 'British values and principles', mins: 4,
      blocks: [
        { t: 'lead', x: 'British society is founded on fundamental values and principles which everyone living in the UK should respect and support. They are based on history and traditions and are protected by law, customs and expectations. **There is no place in British society for extremism or intolerance.**' },
        { t: 'viz', v: 'principles' },
        { t: 'h', x: 'The citizenship pledge' },
        { t: 'p', x: 'As part of the citizenship ceremony, new citizens pledge to uphold these values:' },
        { t: 'quote', x: 'I will give my loyalty to the United Kingdom and respect its rights and freedoms. I will uphold its democratic values. I will observe its laws faithfully and fulfil my duties and obligations as a British citizen.', by: 'The citizenship pledge' },
        { t: 'h', x: 'Responsibilities and freedoms' },
        { t: 'p', x: 'Following from the fundamental principles are responsibilities and freedoms shared by everyone living in the UK.' },
        { t: 'compare', items: [
          { h: 'If you want to be a permanent resident or citizen, you should…', tone: 'c1', items: ['respect and obey the law', 'respect the rights of others, including their right to their own opinions', 'treat others with fairness', 'look after yourself and your family', 'look after the area in which you live and the environment'] },
          { h: 'In return, the UK offers…', tone: 'c5', items: ['freedom of belief and religion', 'freedom of speech', 'freedom from unfair discrimination', 'a right to a fair trial', 'a right to join in the election of a government'] }
        ] },
        { t: 'p', x: 'Britain is described as a modern, thriving society with a long and illustrious history, whose people have been at the heart of the world’s political, scientific, industrial and cultural development, and which is proud of welcoming new migrants. Applying for permanent residence or citizenship means agreeing to accept its responsibilities and to respect the laws, values and traditions of the UK.' }
      ],
      check: ['The origin of the values underlying British society', 'The fundamental principles of British life', 'The responsibilities and freedoms which come with permanent residence']
    },
    {
      id: 'residency', station: 'Residency', title: 'Becoming a permanent resident', mins: 3,
      blocks: [
        { t: 'lead', x: 'To become a permanent resident or citizen of the UK you need to **speak and read English** and have **a good understanding of life in the UK**.' },
        { t: 'viz', v: 'residency' },
        { t: 'list', h: 'Key points', items: [
          'The test questions are written at **ESOL Entry Level 3**, so no separate English test was needed under the 2013 rules.',
          'People on work visas, including **Tier 1 and Tier 2** of the points-based system, normally must pass the Life in the UK test to become permanent residents.',
          'If your English is below ESOL Entry Level 3, the alternative was an **ESOL course in English with Citizenship**, with a test at the end.',
          'The application form and evidence depend on your circumstances. There is a **fee**, which varies by application type.',
          'Forms and fees were on the **UK Border Agency** website. Requirements for citizenship may change, so always check before applying.'
        ] },
        { t: 'note', kind: 'exam', x: 'Remember the pairing: **B1** of the Common European Framework of Reference is equivalent to **ESOL Entry Level 3**.' }
      ],
      check: ['The process of becoming a permanent resident or citizen']
    },
    {
      id: 'the-test', station: 'The test', title: 'Taking the Life in the UK test', mins: 3,
      blocks: [
        { t: 'lead', x: 'The test checks your knowledge of the **whole** handbook, including this introductory chapter.' },
        { t: 'tiles', items: [
          { k: '24', v: 'questions', x: 'Different for each person at the same session' },
          { k: '~60', v: 'test centres', x: 'Registered and approved, around the UK' },
          { k: 'Online', v: 'booking only', x: 'At the Life in the UK test website' }
        ] },
        { t: 'list', h: 'What to know', items: [
          'The test is usually in **English**, but special arrangements can be made to take it in **Welsh or Scottish Gaelic**.',
          'Take it only at a **registered test centre**: certificates from anywhere else are not accepted.',
          'Bring **identification and proof of address**. Without them you cannot take the test.',
          'The **Isle of Man and the Channel Islands** have different arrangements.',
          'Enter your details carefully when booking.'
        ] },
        { t: 'h', x: 'How to use the handbook' },
        { t: 'list', items: [
          'Everything you need to pass is in the handbook; anyone who reads English at **ESOL Entry Level 3** or above should manage the language.',
          'The **glossary** at the back explains key words and phrases.',
          'The **‘Check that you understand’** boxes are guidance only. Knowing just those points is not enough to pass.'
        ] },
        { t: 'h', x: 'Where to find more information' },
        { t: 'cards', cols: 3, items: [
          { h: 'UK Border Agency', x: 'The application process and the forms you need.' },
          { h: 'Life in the UK test website', x: 'Information about the test and booking a place.' },
          { h: 'GOV.UK', x: 'ESOL courses and finding one near you.' }
        ] },
        { t: 'note', kind: 'tip', x: 'Not in the handbook, but useful: the test has a 45-minute time limit and you need **18 correct answers out of 24 (75%)** to pass. The mock test on this site uses the same format.' }
      ],
      check: ['How the test works and what to bring']
    }
  ]
});

window.BOOK.push({
  id: 'ch2', n: 2, color: 'c2',
  title: 'What is the UK?',
  short: 'What is the UK?',
  blurb: 'The four countries of the Union and the names used to describe them.',
  sections: [
    {
      id: 'what-is-uk', station: 'The Union', title: 'The countries that make up the UK', mins: 4,
      blocks: [
        { t: 'lead', x: 'The UK is made up of **England, Scotland, Wales and Northern Ireland**. The rest of Ireland is an independent country.' },
        { t: 'viz', v: 'ukmap', o: { mode: 'names' } },
        { t: 'cards', cols: 2, items: [
          { h: 'The United Kingdom', sub: 'Official name: the United Kingdom of Great Britain and Northern Ireland', x: 'England + Scotland + Wales + Northern Ireland.' },
          { h: 'Great Britain', sub: 'Not the same as the UK', x: 'England, Scotland and Wales only. It does **not** include Northern Ireland.' },
          { h: '‘Britain’ and ‘British’', sub: 'How the handbook uses them', x: 'Used in the handbook to refer to everyone in the UK.' },
          { h: 'Crown dependencies', sub: 'Linked to the UK but not part of it', x: 'The **Channel Islands** and the **Isle of Man**. They have their own governments.' },
          { h: 'British overseas territories', sub: 'Linked to the UK but not part of it', x: 'In other parts of the world, such as **St Helena** and the **Falkland Islands**.' },
          { h: 'Ireland', sub: 'Independent country', x: 'Only Northern Ireland is part of the UK.' }
        ] },
        { t: 'h', x: 'Who governs?' },
        { t: 'p', x: 'The UK is governed by the **parliament sitting in Westminster**. Scotland, Wales and Northern Ireland also have **parliaments or assemblies** of their own, with **devolved powers** in defined areas.' },
        { t: 'note', kind: 'exam', x: 'A classic trick question: Great Britain = England, Scotland and Wales. The UK adds Northern Ireland. The Channel Islands and Isle of Man are **not** part of the UK.' }
      ],
      check: ['The different countries that make up the UK']
    }
  ]
});

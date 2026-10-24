# Life in the UK Study Line

An interactive, visual study guide to *Life in the United Kingdom: A guide for new residents* (3rd edition). Every chapter of the handbook is laid out as a transit-style line map: each chapter is a line, each section a stop.

## What's inside

- **32 stops covering all 5 chapters.** Each one condenses its part of the handbook into key facts, with the handbook's "Check that you understand" list and a quick quiz at the end. History is reordered chronologically (the source PDF runs it backwards).
- **Interactive figures.** These include:
  - a real UK map (Natural Earth outlines) showing which name covers what, plus cities, landmarks, gardens, sports venues and historic sites
  - a Union Flag builder
  - the six wives of Henry VIII, Tudor and Stuart succession by faith, and a timeline of the right to vote
  - governments since 1945, a population chart, and religion and festival calendars
  - devolution and court comparisons, a "which court?" finder and a criminal-or-civil sorting game
- **Study tools:**
  - a timeline of 152 dated events, with a "which came first?" game
  - Who's who: 180 people
  - a numbers and ages page
  - a one-page key facts sheet
  - flashcards for dates, people and questions
  - 524 practice questions with explanations
  - a timed 24-question mock test (45 minutes, 18 to pass)
- **Pictures and diagrams:**
  - photos reproduced from the handbook PDF (people, castles, landmarks, events)
  - animated diagrams of how 18 British inventions work, from the steam engine and jet engine to IVF, MRI and the World Wide Web
  - world and Europe maps for the invasions, trade and the slave trade, the Empire, independence, post-war migration, the Second World War, the Commonwealth and the EU
- **Test zone** with ten game formats:
  - match pairs (inventors, writers, poets, battles, laws…)
  - put events in order
  - sort into groups
  - find places on a map
  - fill the gaps from a word bank
  - 60-second true-or-false quickfire
  - "Who am I?" clues
  - a picture round
  - odd one out
  - guess the number with a slider
- **English and Russian.** The EN/RU switch in the top bar translates the whole site, including questions, games and charts. English uses British spelling.
- Progress (stops studied, checklists, flashcards, mock scores, game bests, language) is saved in the browser's `localStorage`.
- Light and dark themes, keyboard support, and layouts for phone and desktop.

## Run it

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

To host it on GitHub Pages, go to Settings → Pages and deploy from this branch's root folder.

## Single-file version

```sh
node tools/build-single.mjs            # writes dist/life-in-the-uk.html (CSS, JS and photos inlined)
```

## Translation

The site renders English, and `js/i18n.js` swaps rendered text for the active language. Each sentence-sized piece of markup is looked up by a hash of its English HTML. Numbers can be templated, with Russian plural forms, for example `{0} {0:вопрос|вопроса|вопросов}`. Translations live in `i18n/ru/*.tsv`, one `id text` pair per line.

```sh
node tools/i18n-extract.mjs > i18n/en.json   # crawl every page and state, collect English strings (needs Playwright)
python3 tools/i18n-prep.py                   # list strings without a translation in i18n/todo/
python3 tools/i18n-build.py                  # check markup and number slots, write js/i18n-ru.js
node tools/i18n-coverage.mjs                 # list English still visible in Russian mode
```

## Project layout

```
index.html              page shell
css/styles.css          design tokens, layout, components (light + dark)
js/core.js              routing, layout, sidebar line map, search, home/chapter/section pages
js/quiz.js              quiz engine (instant feedback and timed exam modes)
js/viz-*.js             maps, charts and interactive figures
js/tools.js             timeline, people, numbers, key facts, flashcards, practice, mock test
js/viz-art.js           animated invention and landmark diagrams
js/viz-visual.js        photos, invention explorer, world and Europe maps
js/games.js             Test zone games
js/i18n.js              translation layer; js/i18n-ru.js is generated from i18n/ru/*.tsv
js/data/*.js            handbook content, timeline, people, places, question bank, games, photo captions, map paths
img/*.webp              photos from the handbook PDF
tools/build-map.py      regenerates js/data/map.js from Natural Earth GeoJSON
tools/build-world.py    regenerates js/data/world.js (world and Europe outlines)
tools/build-single.mjs  bundles everything into one HTML file
tools/i18n-*            translation tooling (see above)
```

## Notes on the source

- The content follows the handbook PDF supplied (Britizen's edition, updated to 2024: King Charles III, Brexit, the 2024 election). Where the handbook is outdated or inconsistent, the site says so. Examples: the Commonwealth is listed as both 54 and 56 members, the handbook still describes European Parliament elections, and its summary page names Henry VII instead of Henry VIII for the Act for the Government of Wales.
- The national flowers table (rose, thistle, daffodil, shamrock) is missing from the PDF and was restored from the official handbook.
- The 45-minute limit and the 18/24 pass mark aren't in the handbook. They're labelled as such.
- Handbook text is Crown copyright. Map outlines are from Natural Earth (public domain).
- Photos are reproduced from the handbook PDF. Diagrams are drawn for this site. Map outlines are from Natural Earth (public domain).
- Russian translations of quoted poems and speeches are plain glosses written for this site. The English original is kept alongside, since the test is in English.

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
- Progress (stops studied, checklists, flashcards, mock scores) is saved in the browser's `localStorage`.
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
node tools/build-single.mjs            # writes dist/life-in-the-uk.html (CSS + JS inlined)
```

## Project layout

```
index.html              page shell
css/styles.css          design tokens, layout, components (light + dark)
js/core.js              routing, layout, sidebar line map, search, home/chapter/section pages
js/quiz.js              quiz engine (instant feedback and timed exam modes)
js/viz-*.js             maps, charts and interactive figures
js/tools.js             timeline, people, numbers, key facts, flashcards, practice, mock test
js/data/*.js            handbook content, timeline, people, places, question bank, map paths
tools/build-map.py      regenerates js/data/map.js from Natural Earth GeoJSON
tools/build-single.mjs  bundles everything into one HTML file
```

## Notes on the source

- The content follows the handbook PDF supplied (Britizen's edition, updated to 2024: King Charles III, Brexit, the 2024 election). Where the handbook is outdated or inconsistent, the site says so. Examples: the Commonwealth is listed as both 54 and 56 members, the handbook still describes European Parliament elections, and its summary page names Henry VII instead of Henry VIII for the Act for the Government of Wales.
- The national flowers table (rose, thistle, daffodil, shamrock) is missing from the PDF and was restored from the official handbook.
- The 45-minute limit and the 18/24 pass mark aren't in the handbook. They're labelled as such.
- Handbook text is Crown copyright. Map outlines are from Natural Earth (public domain).

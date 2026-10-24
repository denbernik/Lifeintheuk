// Collects every English string the site can show, so it can be translated.
// Crawls each route in English with I18N.record switched on, clicks through the interactive pieces,
// and adds the data-driven strings (questions, people, timeline, games...) directly.
// Usage: node tools/i18n-extract.mjs > i18n/en.json   (needs Playwright with Chromium)
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let chromium;
for (const base of [root + '/', '/opt/node-tools/node_modules/']) {
  try { ({ chromium } = createRequire(base)('playwright')); break; } catch (e) { /* try next */ }
}
if (!chromium) { console.error('Playwright not found'); process.exit(1); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => {
  window.__keys = {};
  let v;
  Object.defineProperty(window, 'I18N', {
    configurable: true,
    get() { return v; },
    set(x) { v = x; x.record = (k) => { if (!(k in window.__keys)) window.__keys[k] = window.__where || ''; }; }
  });
  try { localStorage.clear(); } catch (e) { /* ignore */ }
});
await page.goto('file://' + root + '/index.html#home');
await page.waitForTimeout(500);

// Every theme label.
for (let i = 0; i < 3; i++) { await page.click('#theme-btn'); await page.waitForTimeout(50); }

const routes = await page.evaluate(() => ['home', ...App.BOOK.map((c) => c.id), ...App.SECTIONS.map((s) => s.id), ...Object.keys(App.TOOLS)]);

// Click every not-yet-clicked control in the main area, re-querying after each click.
async function explore(route, cap) {
  const seen = new Set();
  for (let n = 0; n < cap; n++) {
    const sig = await page.evaluate((seenArr) => {
      const seen = new Set(seenArr);
      const els = Array.from(document.querySelectorAll('#main button, #main [data-k], #main [role=button], #main .chip, #main svg [data-p], #main svg [data-i]'));
      for (const el of els) {
        if (el.disabled || el.closest('a[href]')) continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const s = [el.tagName, el.className && el.className.baseVal != null ? el.className.baseVal : el.className, ...Array.from(el.attributes).filter((a) => a.name.startsWith('data-')).map((a) => a.name + '=' + a.value), el.textContent.trim().slice(0, 40)].join('|');
        if (seen.has(s)) continue;
        el.scrollIntoView({ block: 'center' });
        el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 }));
        return s;
      }
      return null;
    }, [...seen]);
    if (!sig) break;
    seen.add(sig);
    await page.waitForTimeout(15);
    const now = await page.evaluate(() => (location.hash || '#home').slice(1));
    if (now !== route) { await page.goto('file://' + root + '/index.html#' + route); await page.waitForTimeout(150); }
  }
}

for (const r of routes) {
  await page.evaluate((r) => { window.__where = r; location.hash = r; }, r);
  await page.waitForTimeout(250);
  const cap = r.startsWith('test-') || r === 'practice' || r === 'mock' || r === 'flashcards' ? 120 : 60;
  await explore(r, cap);
}
// Search results and a finished mock test.
await page.evaluate(() => { window.__where = 'search'; });
for (const q of ['Magna', 'Wales', 'xyzzy']) { await page.fill('#q', q); await page.waitForTimeout(150); }
await page.fill('#q', '');

// Messages that depend on a score or outcome the crawl may not hit.
const EXTRA = ['Exactly right! 3 points.', 'Very close! 2 points.', 'Close. 1 point.', 'Not close. 0 points.', 'Correct: 1 point.', 'Correct: 4 points.',
  'Spot on!', 'Close!', 'Too far away.', 'Correct!', 'Not quite.', 'You tapped:', 'About 25 miles off.', 'Perfect score!', 'Well done!', 'Not bad. Try again?',
  'Keep practising.', 'See score', 'Next', 'Best 80% · played 2', 'You have 1 unanswered question.', 'You have 3 unanswered questions.',
  'You needed 1 more correct answer.', 'You needed 3 more correct answers.', 'Time taken: 12m 05s.', 'You scored 18 or more.', 'Pass', 'Not a pass yet',
  'Take another mock', 'Practise by chapter', 'Stops to revise', 'Your answers', 'You said:', 'Correct:', 'No answer', 'Your recent attempts',
  'Saved in this browser', 'Perfect.', 'Good work.', 'Try 4 more', 'Try again', 'Practise all 12 questions', 'See results', 'Who is this?',
  'Which invention is this?', 'Which place is this?', 'Answer:', 'Not played yet', 'You know every card in this deck.', '12 cards marked as known.',
  'Reset this deck', 'Reset known cards in this deck', 'Right.', 'criminal law', 'civil law', 'Sentence 1 of 5', 'See score', 'Next sentence', 'Check',
  // criminal or civil sorter (viz-society.js)
  'Carrying a knife, even for self-defence', 'Carrying a weapon of any kind is a criminal offence.', 'Buying or selling cannabis', 'Selling or buying drugs such as heroin, cocaine, ecstasy and cannabis is illegal.', 'Harassing someone because of their religion', 'Racial crime: causing harassment, alarm or distress because of religion or ethnic origin.', 'Selling cigarettes to a 16-year-old', 'Illegal to sell tobacco products to anyone under 18.', 'Smoking in an enclosed public place', 'Against the law in nearly every enclosed public place.', 'Buying alcohol for a 17-year-old', 'A criminal offence to sell alcohol to, or buy it for, under-18s.', 'Theft, assault or murder', 'Crimes that apply in most countries.', 'A landlord refusing to do repairs', 'Housing law: disputes between landlords and tenants over repairs and eviction.', 'A shop refusing to replace faulty goods', 'Consumer rights: disputes about faulty goods or services.', 'Being unfairly dismissed from work', 'Employment law: wages, unfair dismissal, workplace discrimination.', 'Someone owes you money and won’t pay', 'Debt: people may be taken to court if they owe money.', 'A dispute with your employer over wages', 'Employment law is civil law.'];
await page.evaluate((xs) => { window.__where = 'extra'; xs.forEach((x) => window.t(x)); }, EXTRA);

const data = await page.evaluate(() => {
  const { esc, fmt } = App.util;
  const out = {};
  const box = document.createElement('div');
  const key = (html) => { box.innerHTML = html; return I18N.norm(box.innerHTML); };
  const add = (s, where) => {
    if (s == null || typeof s !== 'string' || !/[A-Za-z]{2}/.test(s)) return;
    for (const k of new Set([key(esc(s)), key(fmt(s))])) if (!(k in window.__keys) && !(k in out)) out[k] = where;
  };
  const deep = (o, where, skip) => {
    if (typeof o === 'string') return add(o, where);
    if (Array.isArray(o)) return o.forEach((x) => deep(x, where, skip));
    if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) if (!skip.includes(k)) deep(v, where, skip);
  };
  window.QUESTIONS.forEach((q) => {
    add(q.q, 'data:questions'); q.o.forEach((o) => add(o, 'data:questions')); add(q.x, 'data:questions');
    if (Array.isArray(q.a)) add(q.a.map((j) => q.o[j]).join(' and '), 'data:questions');
    if (q.o.length === 2 && q.o[0] === 'True') add(q.q.replace(/^Is the statement below true or false\?\s*/, '').replace(/^"|"$/g, ''), 'data:questions');
  });
  window.PEOPLE.forEach((p) => ['n', 'r', 'f', 'y'].forEach((k) => add(p[k], 'data:people')));
  deep(window.PEOPLE_CATS, 'data:people', []);
  window.TIMELINE.forEach((e) => ['d', 't', 'x'].forEach((k) => add(e[k], 'data:timeline')));
  window.RULERS.forEach((r) => ['house', 'n', 'note'].forEach((k) => add(r[k], 'data:timeline')));
  deep(window.GAMES, 'data:games', ['k', 'id', 'img', 's', 'icon', 'lat', 'lon', 'at']);
  Object.values(window.PHOTOS).forEach((p) => add(p.cap, 'data:photos'));
  Object.values(App.ART || {}).forEach((a) => { add(a.title, 'data:art'); add(a.who, 'data:art'); add(a.when, 'data:art'); (a.steps || []).forEach((s) => add(s, 'data:art')); });
  deep(window.UK_PLACES, 'data:places', ['id', 'img', 'nat', 'k', 'side', 'region', 'll', 'lab', 'anchor']);
  return out;
});

const keys = await page.evaluate(() => window.__keys);
Object.assign(keys, data);
console.error(`${Object.keys(keys).length} keys; page errors: ${errors.length ? errors.join(' | ') : 'none'}`);
process.stdout.write(JSON.stringify(keys, null, 1));
await browser.close();

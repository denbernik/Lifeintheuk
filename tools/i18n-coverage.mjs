// Lists English text still visible with the Russian translation switched on.
// Crawls every route in RU mode, clicks through the interactive pieces and reports text nodes and
// attributes that contain Latin letters but no Cyrillic. Usage: node tools/i18n-coverage.mjs
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let chromium;
for (const base of [root + '/', '/opt/node-tools/node_modules/']) {
  try { ({ chromium } = createRequire(base)('playwright')); break; } catch (e) { /* try next */ }
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.addInitScript(() => { try { localStorage.setItem('liuk-study-v1', JSON.stringify({ lang: 'ru' })); } catch (e) { /* ignore */ } });
await page.goto('file://' + root + '/index.html#home');
await page.waitForTimeout(500);
const routes = await page.evaluate(() => ['home', ...App.BOOK.map((c) => c.id), ...App.SECTIONS.map((s) => s.id), ...Object.keys(App.TOOLS)]);
const found = {};
async function scan(route) {
  const items = await page.evaluate(() => {
    const out = [];
    const bad = (s) => /[A-Za-z]{2}/.test(s) && !/[А-Яа-яЁё]/.test(s);
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const s = n.nodeValue.trim();
      if (s && bad(s) && !n.parentElement.closest('script,style,[data-noi18n],.lang-switch')) out.push(s.slice(0, 140));
    }
    document.querySelectorAll('[title],[aria-label],[placeholder],[alt]').forEach((el) => {
      if (el.closest('[data-noi18n],.lang-switch')) return;
      ['title', 'aria-label', 'placeholder', 'alt'].forEach((a) => { const v = el.getAttribute(a); if (v && bad(v)) out.push(`@${a}: ${v.slice(0, 120)}`); });
    });
    return out;
  });
  items.forEach((s) => { (found[s] = found[s] || new Set()).add(route); });
}
async function explore(route, cap) {
  const seen = new Set();
  for (let n = 0; n < cap; n++) {
    const sig = await page.evaluate((seenArr) => {
      const seen = new Set(seenArr);
      for (const el of document.querySelectorAll('#main button, #main [data-k], #main [role=button], #main .chip, #main svg [data-p], #main svg [data-i]')) {
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
    await page.waitForTimeout(20);
    await scan(route);
    const now = await page.evaluate(() => (location.hash || '#home').slice(1));
    if (now !== route) { await page.goto('file://' + root + '/index.html#' + route); await page.waitForTimeout(150); }
  }
}
for (const r of routes) {
  await page.evaluate((r) => { location.hash = r; }, r);
  await page.waitForTimeout(250);
  await scan(r);
  await explore(r, r.startsWith('test-') || ['practice', 'mock', 'flashcards'].includes(r) ? 120 : 60);
}
for (const q of ['Магна', 'Уэльс', 'Черчилль', 'xyzzy']) { await page.fill('#q', q); await page.waitForTimeout(200); await scan('search'); }
const rows = Object.entries(found).sort((a, b) => b[1].size - a[1].size);
console.log(`${rows.length} untranslated strings; page errors: ${errors.length ? errors.join(' | ') : 'none'}`);
for (const [s, rs] of rows) console.log(`${[...rs].slice(0, 3).join(',')}${rs.size > 3 ? '…' : ''}\t${s}`);
await browser.close();

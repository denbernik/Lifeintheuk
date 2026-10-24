// Bundle index.html, its stylesheet, scripts and photos into one self-contained HTML file.
// Usage: node tools/build-single.mjs [out.html] [--fragment]
//   --fragment  omit <!doctype>, <html>, <head> and <body> (for hosts that wrap the page themselves)
// Photos in img/ are inlined as data URIs in window.IMAGES, which App.img() prefers over img/ paths.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const fragment = args.includes('--fragment');
const out = resolve(args.find((a) => !a.startsWith('--')) || join(root, 'dist', 'life-in-the-uk.html'));

let html = readFileSync(join(root, 'index.html'), 'utf8');
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, (_, p) => `<style>\n${readFileSync(join(root, p), 'utf8')}\n</style>`);
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, (_, p) => `<script>\n${readFileSync(join(root, p), 'utf8').replace(/<\/script/gi, '<\\/script')}\n</script>`);
html = html.replace(/<!-- [a-z]+ -->\n/g, '');
const images = Object.fromEntries(readdirSync(join(root, 'img')).filter((f) => f.endsWith('.webp'))
  .map((f) => [f.replace(/\.webp$/, ''), `data:image/webp;base64,${readFileSync(join(root, 'img', f)).toString('base64')}`]));
html = html.replace('<script>\n', () => `<script>window.IMAGES = ${JSON.stringify(images)};</script>\n<script>\n`);

if (fragment) {
  html = html
    .replace(/<!doctype html>\s*/i, '')
    .replace(/<html[^>]*>\s*/i, '')
    .replace(/<head>\s*/i, '')
    .replace(/<meta charset="utf-8">\s*/i, '')
    .replace(/<meta name="viewport"[^>]*>\s*/i, '')
    .replace(/<\/head>\s*<body>\s*/i, '')
    .replace(/\s*<\/body>\s*<\/html>\s*$/i, '\n');
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);

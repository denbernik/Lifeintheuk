"""Turns i18n/en.json (from i18n-extract.mjs) into translation batches.

Keys with numbers that vary (counters, scores) become templates: digits are replaced by {#}, and the
translation uses {0}, {1}... for the numbers in order, or {0:one|few|many} for a plural form.
Already-translated keys (in i18n/ru/*.tsv) are skipped, so re-running only lists new strings.
Usage: python3 tools/i18n-prep.py [batch size]   -> i18n/todo/NN.tsv  (id <TAB> English)
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
size = int(sys.argv[1]) if len(sys.argv) > 1 else 250


def fnv(s):
    # Same FNV-1a as js/i18n.js, over UTF-16 code units like JavaScript strings.
    h = 0x811c9dc5
    units = []
    for ch in s:
        o = ord(ch)
        if o > 0xFFFF:
            o -= 0x10000
            units += [0xD800 + (o >> 10), 0xDC00 + (o & 0x3FF)]
        else:
            units.append(o)
    for u in units:
        h ^= u
        h = (h * 0x01000193) & 0xFFFFFFFF
    return base36(h)


def base36(n):
    d = '0123456789abcdefghijklmnopqrstuvwxyz'
    s = ''
    while True:
        n, r = divmod(n, 36)
        s = d[r] + s
        if n == 0:
            return s


def plain(k):
    return re.sub(r'<[^>]*>', '', k)


en = json.load(open(os.path.join(ROOT, 'i18n/en.json'), encoding='utf8'))
tpl_of = lambda k: re.sub(r'\d+', '{#}', k)
groups = {}
for k in en:
    if re.search(r'\d', plain(k)):
        groups.setdefault(tpl_of(k), []).append(k)

items = []  # (id, english)
seen = set()
for k, where in en.items():
    use = k
    if re.search(r'\d', plain(k)):
        t = tpl_of(k)
        if len(groups[t]) > 1 or len(plain(k)) <= 60:
            use = t
    if use in seen:
        continue
    seen.add(use)
    items.append((fnv(use), use, where))

done = {}
for f in glob.glob(os.path.join(ROOT, 'i18n/ru/*.tsv')):
    for line in open(f, encoding='utf8'):
        parts = line.split(None, 1)
        if len(parts) == 2 and not line.startswith('#'):
            done[parts[0]] = parts[1]

todo = [it for it in items if it[0] not in done]
out = os.path.join(ROOT, 'i18n/todo')
os.makedirs(out, exist_ok=True)
for f in glob.glob(os.path.join(out, '*.tsv')):
    os.remove(f)
for n in range(0, len(todo), size):
    with open(os.path.join(out, '%02d.tsv' % (n // size + 1)), 'w', encoding='utf8') as fh:
        last = None
        for i, k, where in todo[n:n + size]:
            if where != last:
                fh.write('# %s\n' % where)
                last = where
            fh.write('%s\t%s\n' % (i, k))
json.dump({i: k for i, k, _ in items}, open(os.path.join(ROOT, 'i18n/keys.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=0)
print('%d keys, %d translated, %d to do in %d batches, %d chars' % (len(items), len(items) - len(todo), len(todo), (len(todo) + size - 1) // size, sum(len(k) for _, k, _ in todo)))

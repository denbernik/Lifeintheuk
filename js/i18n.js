/* Translation layer.
   The app renders English. When another language is active, rendered text is swapped in place:
   - "units" are elements whose content is only text plus simple formatting tags (b, strong, mark, a...);
     their whole innerHTML is the key, so sentences translate as a whole and keep their markup;
   - other text nodes and the title / aria-label / placeholder / alt attributes are translated one by one.
   Keys are FNV-1a hashes of the normalised English HTML. If no exact key exists, numbers are replaced by
   {#} and looked up again, so "Question 3 of 24" can use one entry: "Вопрос {0} из {1}"; "{0:form|forms|forms}"
   gives the plural form that suits the number in slot 0.
   Dictionaries register themselves with I18N.add('ru', {...}). */
(function () {
  const I = (window.I18N = { lang: 'en', dict: {}, record: null });
  const FORMAT = new Set(['B', 'STRONG', 'EM', 'I', 'MARK', 'SMALL', 'A', 'BR', 'SUP', 'SUB', 'Q', 'ABBR', 'CODE', 'U', 'S', 'TIME', 'KBD']);
  const ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
  const LATIN = /[A-Za-z]{2}/;

  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;');
  const unescText = (s) => String(s).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  function hash(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  }
  const tplOf = (s) => s.replace(/\d+/g, '{#}');

  I.add = (lang, entries) => { I.dict[lang] = Object.assign(I.dict[lang] || {}, entries); };
  I.hash = hash; I.norm = norm; I.escText = escText; I.tplOf = tplOf;

  // {0:книга|книги|книг} picks the plural form for the number in slot 0 (one | few | many).
  const plural = (n, forms) => {
    const f = forms.split('|');
    let cat = 'many';
    try { cat = new Intl.PluralRules(I.lang).select(n); } catch (e) { /* default */ }
    return f[{ one: 0, few: 1, many: 2, other: 2 }[cat] || 0] || f[f.length - 1];
  };
  function lookup(key) {
    const d = I.dict[I.lang];
    if (!d) return null;
    let r = d[hash(key)];
    if (r != null) return r;
    if (/\d/.test(key)) {
      const nums = key.match(/\d+/g);
      r = d[hash(tplOf(key))];
      if (r != null) return r.replace(/\{(\d+)(?::([^}]*))?\}/g, (_, i, forms) => (forms ? plural(+nums[+i], forms) : nums[+i] != null ? nums[+i] : ''));
    }
    return null;
  }
  const wanted = (key) => LATIN.test(key.replace(/<[^>]*>/g, ''));
  const note = (key) => { if (I.record && wanted(key)) I.record(key); };

  // Plain-text translation for strings used by code (document.title, prompts, sort keys...).
  window.t = function (s) {
    if (s == null || s === '') return s;
    const key = norm(escText(s));
    if (I.lang === 'en') { note(key); return s; }
    const r = lookup(key);
    return r == null ? s : unescText(r);
  };

  // Translate an HTML fragment produced by the app's own formatter (used for search and sorting).
  I.tHtml = (html) => {
    if (I.lang === 'en' || !html) return html;
    const r = lookup(norm(String(html).replace(/&#39;/g, "'").replace(/&quot;/g, '"')));
    return r == null ? html : r;
  };
  I.plain = (html) => unescText(I.tHtml(html));

  function inlineOnly(el) {
    for (const c of el.childNodes) {
      if (c.nodeType === 1 && (!FORMAT.has(c.tagName) || !inlineOnly(c))) return false;
    }
    return true;
  }
  function hasText(el) { return LATIN.test(el.textContent); }

  function doAttrs(el) {
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v || !LATIN.test(v)) continue;
      const key = norm(escText(v));
      if (I.lang === 'en') { note(key); continue; }
      const r = lookup(key);
      if (r != null) el.setAttribute(a, unescText(r));
    }
  }
  function doText(node) {
    const raw = node.nodeValue;
    if (!LATIN.test(raw)) return;
    const key = norm(escText(raw));
    if (I.lang === 'en') { note(key); return; }
    const r = lookup(key);
    if (r != null) node.nodeValue = raw.match(/^\s*/)[0] + unescText(r) + raw.match(/\s*$/)[0];
  }
  function walk(el) {
    if (el.nodeType === 3) { doText(el); return; }
    if (el.nodeType !== 1) return;
    const tag = el.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'INPUT' || tag === 'TEXTAREA' || el.hasAttribute('data-noi18n')) { if (tag === 'INPUT') doAttrs(el); return; }
    doAttrs(el);
    if (el.__i18n === I.lang) return;
    if (el.firstChild && hasText(el) && inlineOnly(el)) {
      const key = norm(el.innerHTML);
      if (I.lang === 'en') { note(key); return; }
      const r = lookup(key);
      if (r != null) { el.innerHTML = r; el.__i18n = I.lang; }
      return;
    }
    for (const c of Array.from(el.childNodes)) walk(c);
  }
  I.translate = (root) => { if (I.lang !== 'en' || I.record) walk(root || document.body); };

  // The translated unit that contains n, if any.
  function unitOf(n) {
    for (let p = n; p; p = p.parentNode) if (p.__i18n === I.lang) return p;
    return null;
  }
  let observer = null;
  I.observe = (root) => {
    if (observer) observer.disconnect();
    if (I.lang === 'en' && !I.record) return;
    observer = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'childList') {
          // Code may rewrite a unit that was already translated (a toggle label, a live score): translate it again.
          const u = unitOf(m.target);
          if (u) { if (LATIN.test(u.textContent)) { u.__i18n = null; walk(u); } continue; }
          m.addedNodes.forEach((n) => walk(n));
        } else if (m.type === 'attributes' && !unitOf(m.target)) doAttrs(m.target);
      }
    });
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ATTRS });
  };
  I.setLang = (lang) => {
    I.lang = lang;
    document.documentElement.lang = lang === 'ru' ? 'ru' : 'en-GB';
  };
})();

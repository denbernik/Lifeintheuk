/* Quiz engine: instant-feedback practice and timed exam mode. */
(function () {
  const App = window.App;
  const { esc, shuffle, $, $$ } = App.util;
  const LETTERS = 'ABCD';

  function prep(src) {
    const isTF = src.o.length === 2 && src.o[0] === 'True';
    const correct = Array.isArray(src.a) ? src.a : [src.a];
    let opts = src.o.map((t, i) => ({ t, ok: correct.includes(i) }));
    if (!isTF) opts = shuffle(opts);
    return { src, opts, multi: correct.length > 1, need: correct.length, picked: [], checked: false, flagged: false };
  }
  const isRight = (it) => it.picked.length === it.need && it.picked.every((i) => it.opts[i].ok);

  function recordPractice(items) {
    App.store.set((s) => {
      items.forEach((it) => {
        if (!it.checked) return;
        const r = s.quiz[it.src.s] || (s.quiz[it.src.s] = { seen: 0, right: 0 });
        r.seen += 1; if (isRight(it)) r.right += 1;
      });
    });
  }

  function optsHtml(it, reveal) {
    return it.opts.map((o, i) => {
      const on = it.picked.includes(i);
      let cls = '';
      if (reveal) { if (o.ok) cls = 'right'; else if (on) cls = 'wrong'; }
      return `<button class="opt ${cls}" data-i="${i}" aria-pressed="${on}" ${reveal ? 'disabled' : ''}><span class="key">${LETTERS[i]}</span><span>${esc(o.t)}</span></button>`;
    }).join('');
  }
  function sectionLink(s) {
    const e = App.byId[s];
    return e ? `<a href="#${s}">Revise: ${esc(e.sec.title)} →</a>` : '';
  }

  // ---------------- instant mode ----------------
  App.Quiz = {};
  App.Quiz.instant = function (el, sources, opts) {
    opts = opts || {};
    let items = sources.map(prep);
    let cur = 0;
    function paint() {
      if (cur >= items.length) return summary();
      const it = items[cur];
      const right = it.checked && isRight(it);
      el.innerHTML = `<div class="quiz"><div class="q-card">
        <div class="q-top"><span>Question ${cur + 1} of ${items.length}</span>${opts.showSection && App.byId[it.src.s] ? `<span class="badge">${esc(App.byId[it.src.s].sec.station)}</span>` : ''}</div>
        <p class="q-text">${esc(it.src.q)}</p>
        <p class="q-hint">${it.multi ? 'Select TWO answers.' : 'Select one answer.'}</p>
        <div class="opts" role="group" aria-label="Answers">${optsHtml(it, it.checked)}</div>
        ${it.checked ? `<div class="feedback ${right ? 'ok' : 'no'}" role="status"><b>${right ? 'Correct.' : 'Not quite.'}</b>${esc(it.src.x)} ${opts.showSection ? sectionLink(it.src.s) : ''}</div>` : ''}
        <div class="q-actions">
          ${!it.checked && it.multi ? `<button class="btn sm" data-q="check" ${it.picked.length === it.need ? '' : 'disabled'}>Check answer</button>` : ''}
          ${it.checked ? `<button class="btn sm" data-q="next">${cur + 1 < items.length ? 'Next question' : 'See results'} →</button>` : ''}
        </div>
      </div></div>`;
    }
    function summary() {
      recordPractice(items);
      const score = items.filter(isRight).length;
      const wrong = items.filter((it) => !isRight(it));
      el.innerHTML = `<div class="quiz"><div class="q-card">
        <div class="result ${score / items.length >= 0.75 ? 'pass' : 'fail'}" style="padding:8px 0 16px">
          <div class="score">${score}<span class="muted" style="font-size:.45em"> / ${items.length}</span></div>
          <div class="verdict">${score === items.length ? 'Perfect.' : score / items.length >= 0.75 ? 'Good work.' : 'Keep practising.'}</div>
        </div>
        ${wrong.length ? `<div class="review">${wrong.map((it) => `<div class="review-item bad"><div class="q">${esc(it.src.q)}</div><div class="a">Answer: <b>${esc(it.src.o.filter((_, i) => (Array.isArray(it.src.a) ? it.src.a : [it.src.a]).includes(i)).join(' and '))}</b>. ${esc(it.src.x)} ${sectionLink(it.src.s)}</div></div>`).join('')}</div>` : ''}
        <div class="q-actions">${opts.again ? `<button class="btn sm ghost" data-q="again">${esc(opts.againLabel || 'Try again')}</button>` : ''}${opts.extra || ''}</div>
      </div></div>`;
    }
    el.addEventListener('click', (e) => {
      const o = e.target.closest('.opt');
      const it = items[cur];
      if (o && it && !it.checked) {
        const i = +o.dataset.i;
        if (it.multi) {
          if (it.picked.includes(i)) it.picked = it.picked.filter((x) => x !== i);
          else if (it.picked.length < it.need) it.picked.push(i);
        } else { it.picked = [i]; it.checked = true; }
        paint(); return;
      }
      const q = e.target.closest('[data-q]');
      if (!q) return;
      if (q.dataset.q === 'check') { it.checked = true; paint(); }
      else if (q.dataset.q === 'next') { cur += 1; paint(); const top = el.getBoundingClientRect().top; if (top < 0) el.scrollIntoView({ block: 'start' }); }
      else if (q.dataset.q === 'again') { items = (opts.again ? opts.again() : sources).map(prep); cur = 0; paint(); }
    });
    paint();
  };

  // ---------------- exam mode ----------------
  App.Quiz.exam = function (el, sources, opts) {
    const items = sources.map(prep);
    let cur = 0; let finished = false; let confirming = false;
    const limit = opts.seconds || 45 * 60;
    const start = Date.now();
    let timerId = null;
    const left = () => Math.max(0, limit - Math.floor((Date.now() - start) / 1000));
    const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    function tick() {
      const t = $('.timer', el);
      const s = left();
      if (t) { t.textContent = mmss(s); t.classList.toggle('low', s < 300); }
      if (s <= 0) finish();
    }
    function paint() {
      if (finished) return;
      const it = items[cur];
      const answered = items.filter((x) => x.picked.length === x.need).length;
      el.innerHTML = `<div class="quiz">
        <div class="q-card" style="padding:14px 16px">
          <div class="q-top" style="margin:0 0 10px"><span>${answered} of ${items.length} answered</span><span>Time left <span class="timer" aria-live="off">${mmss(left())}</span></span></div>
          <div class="progress-dots">${items.map((x, i) => `<button data-go="${i}" class="${x.picked.length === x.need ? 'answered' : ''} ${x.flagged ? 'flagged' : ''} ${i === cur ? 'cur' : ''}" aria-label="Question ${i + 1}${x.flagged ? ', flagged' : ''}">${i + 1}</button>`).join('')}</div>
        </div>
        <div class="q-card">
          <div class="q-top"><span>Question ${cur + 1} of ${items.length}</span><button class="btn sm ghost" data-q="flag" aria-pressed="${it.flagged}">${it.flagged ? 'Flagged' : 'Flag for review'}</button></div>
          <p class="q-text">${esc(it.src.q)}</p>
          <p class="q-hint">${it.multi ? 'Select TWO answers.' : 'Select one answer.'}</p>
          <div class="opts" role="group" aria-label="Answers">${optsHtml(it, false)}</div>
          <div class="q-actions">
            <button class="btn sm ghost" data-q="prev" ${cur === 0 ? 'disabled' : ''}>← Previous</button>
            ${cur + 1 < items.length ? '<button class="btn sm" data-q="nextq">Next →</button>' : ''}
            <button class="btn sm ${cur + 1 === items.length ? '' : 'ghost'}" data-q="finish">Finish test</button>
          </div>
          ${confirming ? `<div class="feedback no" role="alert"><b>Finish now?</b>${answered < items.length ? `You have ${items.length - answered} unanswered question${items.length - answered > 1 ? 's' : ''}. ` : ''}You can’t change answers after finishing.<div class="q-actions"><button class="btn sm ghost" data-q="cancel">Keep going</button><button class="btn sm" data-q="confirm">Yes, finish</button></div></div>` : ''}
        </div>
      </div>`;
    }
    function finish() {
      if (finished) return;
      finished = true; clearInterval(timerId);
      items.forEach((it) => { it.checked = true; });
      const score = items.filter(isRight).length;
      const secs = Math.floor((Date.now() - start) / 1000);
      App.store.set((s) => { s.mocks.push({ at: Date.now(), score, secs }); if (s.mocks.length > 30) s.mocks = s.mocks.slice(-30); });
      recordPractice(items);
      if (opts.onFinish) opts.onFinish(items, score, secs);
    }
    el.addEventListener('click', (e) => {
      if (finished) return;
      const it = items[cur];
      const o = e.target.closest('.opt');
      if (o) {
        const i = +o.dataset.i;
        if (it.multi) {
          if (it.picked.includes(i)) it.picked = it.picked.filter((x) => x !== i);
          else if (it.picked.length < it.need) it.picked.push(i);
          else { it.picked.shift(); it.picked.push(i); }
        } else it.picked = [i];
        paint(); return;
      }
      const g = e.target.closest('[data-go]');
      if (g) { cur = +g.dataset.go; confirming = false; paint(); return; }
      const q = e.target.closest('[data-q]');
      if (!q) return;
      const a = q.dataset.q;
      if (a === 'prev' && cur > 0) { cur -= 1; confirming = false; }
      else if (a === 'nextq' && cur + 1 < items.length) { cur += 1; confirming = false; }
      else if (a === 'flag') it.flagged = !it.flagged;
      else if (a === 'finish') confirming = true;
      else if (a === 'cancel') confirming = false;
      else if (a === 'confirm') { finish(); return; }
      paint();
    });
    el.addEventListener('keydown', (e) => {
      if (finished) return;
      if (e.key === 'ArrowRight' && cur + 1 < items.length) { cur += 1; paint(); }
      else if (e.key === 'ArrowLeft' && cur > 0) { cur -= 1; paint(); }
    });
    paint();
    timerId = setInterval(() => { if (!document.body.contains(el)) { clearInterval(timerId); return; } tick(); }, 1000);
    return { items, isRight };
  };
  App.Quiz.isRight = isRight;
  App.Quiz.optsHtml = optsHtml;
  App.Quiz.sectionLink = sectionLink;

  // quick check on each section page
  App.MOUNT.quickquiz = function (el, o) {
    const pool = window.QUESTIONS.filter((q) => q.s === o.s);
    if (!pool.length) { el.innerHTML = '<p class="muted">No questions for this stop yet.</p>'; return; }
    const pick = () => shuffle(pool).slice(0, Math.min(4, pool.length));
    App.Quiz.instant(el, pick(), {
      again: pick, againLabel: 'Try 4 more',
      extra: `<a class="btn sm" href="#practice" data-practice-sec="${o.s}">Practise all ${pool.length} questions</a>`
    });
    el.addEventListener('click', (e) => { const a = e.target.closest('[data-practice-sec]'); if (a) App.pendingPracticeSec = a.dataset.practiceSec; });
  };
})();

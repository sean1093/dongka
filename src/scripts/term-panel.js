// 名詞側欄面板：桌機從右側滑出（不遮住內文），手機從底部升起。
let data = null;
let panel = null;
let backdrop = null;
let lastFocus = null;
const base = () => document.documentElement.dataset.base || '';

async function getData() {
  if (!data) {
    const r = await fetch(`${base()}/glossary.json`);
    const j = await r.json();
    data = { figs: j.figs, map: new Map(j.terms.map((t) => [t.term, t])) };
    for (const t of j.terms) for (const a of t.alias || []) if (!data.map.has(a)) data.map.set(a, t);
  }
  return data;
}

function build() {
  backdrop = document.createElement('div');
  backdrop.className = 'tp-backdrop';
  backdrop.hidden = true;
  panel = document.createElement('aside');
  panel.className = 'tp';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'tp-title');
  panel.tabIndex = -1;
  document.body.append(backdrop, panel);
  backdrop.addEventListener('click', closeTerm);
  addEventListener('keydown', (e) => e.key === 'Escape' && !panel.hidden && closeTerm());
  panel.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open]');
    if (t) openTerm(t.dataset.open);
    if (e.target.closest('.tp-close')) closeTerm();
  });
}

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

export async function openTerm(name) {
  if (!panel) build();
  const { map, figs } = await getData();
  const t = map.get(name);
  if (!t) return;
  if (panel.hidden) lastFocus = document.activeElement;
  panel.replaceChildren();
  const close = el('button', 'tp-close', '✕');
  close.type = 'button';
  close.setAttribute('aria-label', '關閉');
  const h = el('h2', '', t.term);
  h.id = 'tp-title';
  h.append(' ', el('small', '', t.en));
  panel.append(close, el('p', 'eyebrow', t.group), h, el('p', 'tp-def', t.def));
  if (t.fig && figs[t.fig]) {
    const f = el('div', 'tp-fig');
    f.innerHTML = figs[t.fig]; // 建置時產生的站內插圖
    panel.append(f);
  }
  if (t.more) panel.append(el('h3', '', '多說一點'), el('p', '', t.more));
  if (t.why) panel.append(el('h3', '', '知道這個有什麼用'), el('p', '', t.why));
  if (t.related?.length) {
    const box = el('div', 'tp-chips');
    for (const r of t.related) {
      const b = el('button', 'chip', r);
      b.type = 'button';
      b.dataset.open = r;
      box.append(b);
    }
    panel.append(el('h3', '', '相關名詞'), box);
  }
  if (t.lessons?.length) {
    const ul = el('ul', 'tp-lessons');
    for (const l of t.lessons) {
      const a = el('a', '', `${l.id} ${l.title}`);
      a.href = `${base()}/lessons/${l.slug}/`;
      const li = el('li');
      li.append(a);
      ul.append(li);
    }
    panel.append(el('h3', '', '出現在'), ul);
  }
  panel.hidden = false;
  backdrop.hidden = false;
  requestAnimationFrame(() => { panel.classList.add('on'); backdrop.classList.add('on'); });
  panel.scrollTop = 0;
  panel.focus({ preventScroll: true });
  document.dispatchEvent(new CustomEvent('term:open', { detail: t.term }));
}

export function closeTerm() {
  if (!panel || panel.hidden) return;
  panel.classList.remove('on');
  backdrop.classList.remove('on');
  setTimeout(() => { panel.hidden = true; backdrop.hidden = true; }, 200);
  lastFocus?.focus?.({ preventScroll: true });
  document.dispatchEvent(new CustomEvent('term:close'));
}

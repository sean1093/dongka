// 把從 Notion 匯出的 Notion-flavored Markdown 轉成 HTML。
// 處理：<callout>、<toggle>、<table>（Notion 區塊表格）、mermaid 與配方程式碼區塊。
import { Marked } from 'marked';
import { lessons } from '../data/lessons.js';
import { glossary } from '../data/glossary.js';
import { placeFigures } from './figures.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }) {
      if (lang === 'mermaid') return `<pre class="mermaid">${esc(text)}</pre>\n`;
      return `<div class="recipe"><span class="recipe-tag">配方</span><pre><code>${esc(text)}</code></pre></div>\n`;
    },
  },
});

const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`)) || [])[1];

function dedent(lines) {
  const body = lines.filter((l) => l.trim());
  const n = Math.min(...body.map((l) => l.match(/^\t*/)[0].length), 99);
  return n && n < 99 ? lines.map((l) => l.slice(n)) : lines;
}

function inline(s) {
  return marked.parseInline(s.trim());
}

function notionTable(open, inner) {
  const headRow = attr(open, 'header-row') === 'true';
  const headCol = attr(open, 'header-column') === 'true';
  const rows = [...inner.join('\n').matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) =>
    [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1])
  );
  const cell = (c, th) => {
    const html = c.trim().split(/\n\s*\n/).map(inline).join('<br>');
    return th ? `<th>${html}</th>` : `<td>${html}</td>`;
  };
  const tr = (r, i) => `<tr>${r.map((c, j) => cell(c, (headRow && i === 0) || (headCol && j === 0))).join('')}</tr>`;
  const head = headRow && rows.length ? `<thead>${tr(rows[0], 0)}</thead>` : '';
  const body = rows.slice(headRow ? 1 : 0).map((r, i) => tr(r, i + (headRow ? 1 : 0))).join('');
  return `<table>${head}<tbody>${body}</tbody></table>\n`;
}

// 區塊層級掃描：把自訂標籤切出來，其他交給 marked。
function blocks(src) {
  const lines = src.split('\n');
  let out = '';
  let buf = [];
  let fence = false;
  const flush = () => {
    if (buf.length) out += marked.parse(buf.join('\n'));
    buf = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (/^(```|~~~)/.test(t)) fence = !fence;
    const m = !fence && t.match(/^<(callout|toggle|details|table)\b[^>]*>/);
    if (!m) {
      buf.push(line);
      continue;
    }
    const tag = m[1];
    const rest = t.slice(m[0].length);
    // 收集到對應的結束標籤（允許巢狀）
    let depth = 1;
    const inner = [];
    if (rest) {
      if (rest.includes(`</${tag}>`)) { depth = 0; inner.push(rest.replace(`</${tag}>`, '')); }
      else inner.push(rest);
    }
    while (depth > 0 && ++i < lines.length) {
      const l = lines[i];
      const lt = l.trim();
      if (new RegExp(`^<${tag}\\b`).test(lt)) depth++;
      if (lt.endsWith(`</${tag}>`) && --depth === 0) {
        const before = lt.slice(0, -(`</${tag}>`.length));
        if (before) inner.push(before);
        break;
      }
      inner.push(l);
    }
    flush();
    if (tag === 'table') {
      out += notionTable(m[0], inner);
    } else if (tag === 'callout') {
      const icon = attr(m[0], 'icon') || '💡';
      const color = (attr(m[0], 'color') || 'gray_bg').replace(/_bg$/, '');
      out += `<aside class="callout callout-${color}"><span class="callout-icon" aria-hidden="true">${icon}</span><div class="callout-body">${blocks(dedent(inner).join('\n'))}</div></aside>\n`;
    } else {
      const { q, a } = splitToggle(inner);
      out += `<details class="toggle"><summary>${inline(q)}</summary><div>${blocks(a)}</div></details>\n`;
    }
  }
  flush();
  return out;
}

function splitToggle(inner) {
  let ls = dedent(inner);
  while (ls.length && !ls[0].trim()) ls.shift();
  let q = ls.shift() || '';
  const s = q.match(/^<summary>([\s\S]*?)<\/summary>$/);
  if (s) q = s[1];
  return { q: q.replace(/^#+\s*/, ''), a: dedent(ls).join('\n').trim() };
}

const strip = (h) => h.replace(/<[^>]+>/g, '');

// 三欄以上的表格加上 data-label，手機上改成卡片式排版
function stackTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (all, inner) => {
    const head = inner.match(/<thead>([\s\S]*?)<\/thead>/);
    if (!head) return all;
    const labels = [...head[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => strip(m[1]).trim());
    if (labels.length < 3 || /<tbody>[\s\S]*<th/.test(inner)) return all;
    const body = inner.replace(/<tbody>[\s\S]*<\/tbody>/, (tb) =>
      tb.replace(/<tr>([\s\S]*?)<\/tr>/g, (_, row) => {
        let c = 0;
        return `<tr>${row.replace(/<td([^>]*)>/g, (_m, a) => `<td${a} data-label="${esc(labels[c++] || '')}">`)}</tr>`;
      })
    );
    return `<table class="stack">${body}</table>`;
  });
}

// 每個名詞在一篇裡第一次出現時標記起來
function markTerms(html) {
  const terms = glossary.flatMap((g) => [g.term, ...(g.alias || [])].map((w) => ({ w, g }))).sort((a, b) => b.w.length - a.w.length);
  const used = new Set();
  const marks = [];
  let skip = 0;
  const out = html.split(/(<[^>]+>)/).map((seg) => {
    if (seg.startsWith('<')) {
      const m = seg.match(/^<(\/?)(h[1-4]|a|pre|code|summary|figure|svg|th|button)\b/);
      if (m) skip += m[1] ? -1 : 1;
      return seg;
    }
    if (skip > 0 || !seg.trim()) return seg;
    for (const { w, g } of terms) {
      if (used.has(g.term)) continue;
      const i = seg.indexOf(w);
      if (i < 0) continue;
      used.add(g.term);
      marks.push(`<button type="button" class="term" data-term="${esc(g.term)}" data-en="${esc(g.en)}" data-def="${esc(g.def)}">${w}</button>`);
      seg = `${seg.slice(0, i)}\u0000${marks.length - 1}\u0000${seg.slice(i + w.length)}`;
    }
    return seg;
  }).join('');
  return out.replace(/\u0000(\d+)\u0000/g, (_, n) => marks[+n]);
}

function postprocess(html, base, lesson) {
  const toc = [];
  let n = 0;
  if (lesson) html = placeFigures(html, lesson.id);
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const id = `s${++n}`;
    const num = +(strip(inner).match(/^(\d+)\./) || [])[1];
    const adv = !!lesson?.advanced?.includes(num);
    toc.push({ id, text: strip(inner), adv });
    return `\u0001${adv ? 'adv' : strip(inner).trim() === '參考資料' ? 'refs' : 'core'}\u0001<h2 id="${id}">${inner}${adv ? ' <span class="badge">進階</span>' : ''}</h2>`;
  });
  // 以 h2 為界包成 section，進階段落可以整段收合
  const parts = html.split(/\u0001(adv|core|refs)\u0001/);
  html = parts[0];
  for (let i = 1; i < parts.length; i += 2) {
    html += `<section class="sec${parts[i] === 'refs' ? ' refs' : ''}"${parts[i] === 'adv' ? ' data-adv' : ''}>${parts[i + 1]}</section>`;
  }
  html = stackTables(html);
  html = html.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, '</table></div>');
  html = html.replace(/第 (\d{2}) 篇/g, (m0, id) => {
    const l = lessons.find((x) => x.id === id);
    return l ? `<a href="${base}/lessons/${l.slug}/">${m0}</a>` : m0;
  });
  if (lesson) html = markTerms(html);
  return { html, toc };
}

export function renderLesson(src, base = '', lesson = null) {
  const parts = src.split(/^## 自我檢核\s*$/m);
  const main = parts[0];
  const tail = parts.slice(1).join('\n');
  const quiz = [];
  let quizIntro = '';
  if (tail) {
    const lines = tail.split('\n');
    const restLines = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === '<toggle>') {
        const inner = [];
        while (++i < lines.length && lines[i].trim() !== '</toggle>') inner.push(lines[i]);
        const { q, a } = splitToggle(inner);
        const qm = q.match(/^(Q\d+)[\s.．、:：]*(.*)$/);
        quiz.push({ label: qm ? qm[1] : `Q${quiz.length + 1}`, q: inline(qm ? qm[2] : q), a: blocks(a) });
      } else restLines.push(lines[i]);
    }
    quizIntro = blocks(restLines.join('\n').replace(/<callout[^>]*>[\s\S]*?<\/callout>/, ''));
  }
  // 開頭的「學習目標」callout 由頁首的重點區塊取代
  const body = blocks(main).replace(/^\s*<aside class="callout callout-brown">[\s\S]*?學習目標[\s\S]*?<\/aside>/, '');
  const { html, toc } = postprocess(body + (quiz.length ? '' : quizIntro), base, lesson);
  const minutes = Math.max(3, Math.round(strip(html).replace(/\s+/g, '').length / 420));
  return { html, toc, quiz, minutes, extra: quiz.length ? postprocess(quizIntro, base).html : '' };
}

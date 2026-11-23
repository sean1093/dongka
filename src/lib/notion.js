// 把從 Notion 匯出的 Notion-flavored Markdown 轉成 HTML。
// 處理：<callout>、<toggle>、<table>（Notion 區塊表格）、mermaid 與配方程式碼區塊。
import { Marked } from 'marked';
import { lessons } from '../data/lessons.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const marked = new Marked({
  gfm: true,
  renderer: {
    code({ text, lang }) {
      if (lang === 'mermaid') return `<pre class="mermaid">${esc(text)}</pre>\n`;
      return `<pre class="recipe"><code>${esc(text)}</code></pre>\n`;
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

function postprocess(html, base) {
  const toc = [];
  let n = 0;
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const id = `s${++n}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  // 「第 04 篇」→ 連到該篇
  html = html.replace(/第 (\d{2}) 篇/g, (m0, id) => {
    const l = lessons.find((x) => x.id === id);
    return l ? `<a href="${base}/lessons/${l.slug}/">${m0}</a>` : m0;
  });
  return { html, toc };
}

export function renderLesson(src, base = '') {
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
    // 檢核區塊前的提示 callout 由頁面自己呈現，其餘內容保留
    quizIntro = blocks(restLines.join('\n').replace(/<callout[^>]*>[\s\S]*?<\/callout>/, ''));
  }
  const { html, toc } = postprocess(blocks(main) + (quiz.length ? '' : quizIntro), base);
  return { html, toc, quiz, extra: quiz.length ? postprocess(quizIntro, base).html : '' };
}

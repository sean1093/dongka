// 分享列、複製、圖表存成圖片。全部在瀏覽器內完成，不載入任何第三方腳本。
const toast = (btn, text) => {
  const old = btn.textContent;
  btn.textContent = text;
  setTimeout(() => (btn.textContent = old), 1600);
};
async function copy(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    toast(btn, '已複製');
  } catch {
    prompt('複製這段文字', text);
  }
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-share]');
  if (b) {
    const url = location.href.split('#')[0];
    const title = document.querySelector('.share')?.dataset.title || document.title;
    if (b.dataset.share === 'native') navigator.share({ title, text: title, url }).catch(() => {});
    if (b.dataset.share === 'copy') copy(url, b);
    if (b.dataset.share === 'line') window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'noopener');
    return;
  }
  const c = e.target.closest('[data-copy]');
  if (c) copy(`${c.dataset.copy}\n（出處：懂咖 ${location.href.split('#')[0]}）`, c);
  const sec = e.target.closest('[data-section-share]');
  if (sec) shareSection(sec);
  const si = e.target.closest('[data-section-image]');
  if (si) sectionImage(si);
  const s = e.target.closest('.fig-save');
  if (s) saveFigure(s.closest('.fig'), s);
});

// 手機才有原生分享
if (navigator.share) document.querySelectorAll('[data-share="native"]').forEach((b) => (b.hidden = false));

// 每張示意圖加上「存成圖片」
document.querySelectorAll('figure.fig').forEach((f) => {
  if (!f.querySelector('svg') || f.closest('.tp')) return;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'fig-save';
  b.textContent = '存成圖片';
  f.append(b);
});

const PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'fill-opacity', 'font-family', 'font-size', 'font-weight', 'text-anchor', 'letter-spacing'];
async function saveFigure(fig, btn) {
  try {
    const svg = fig.querySelector('svg');
    const clone = svg.cloneNode(true);
    // 把 CSS 算出來的樣式寫進元素，離開頁面後顏色與字體才會正確
    const src = svg.querySelectorAll('*');
    clone.querySelectorAll('*').forEach((n, i) => {
      const cs = getComputedStyle(src[i]);
      let st = '';
      for (const p of PROPS) st += `${p}:${cs.getPropertyValue(p)};`;
      n.setAttribute('style', st);
    });
    const vb = svg.viewBox.baseVal;
    const W = 1200, pad = 48, h = Math.round(((W - pad * 2) * vb.height) / vb.width);
    clone.setAttribute('width', W - pad * 2);
    clone.setAttribute('height', h);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const img = new Image();
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone));
    await img.decode();
    const cap = fig.querySelector('figcaption')?.textContent.trim() || '';
    const bodyCs = getComputedStyle(document.body);
    const text = bodyCs.color, bg = getComputedStyle(fig).backgroundColor;
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    ctx.font = '26px sans-serif';
    // 圖說自動換行
    const lines = [];
    let line = '';
    for (const ch of cap) {
      if (ctx.measureText(line + ch).width > W - pad * 2) { lines.push(line); line = ''; }
      line += ch;
    }
    if (line) lines.push(line);
    const H = pad + h + 24 + lines.length * 38 + 86;
    cv.width = W; cv.height = H;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.drawImage(img, pad, pad, W - pad * 2, h);
    ctx.fillStyle = text; ctx.globalAlpha = 0.75; ctx.font = '26px sans-serif'; ctx.textBaseline = 'top';
    lines.forEach((l, i) => ctx.fillText(l, pad, pad + h + 24 + i * 38));
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#a8481f'; ctx.fillRect(0, H - 64, W, 64);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 26px sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillText('懂咖 Dongka｜從喜歡喝，到喝得懂', pad, H - 32);
    ctx.font = '22px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(location.host + location.pathname, W - pad, H - 32);
    await deliver(cv, `dongka-${slug()}-fig${[...document.querySelectorAll('figure.fig')].indexOf(fig) + 1}.png`, btn, cap);
  } catch {
    toast(btn, '這個瀏覽器不支援，請直接截圖');
  }
}

// 速查表的單一段落：分享標題、內容摘要與指向該段的網址（#16）
async function shareSection(btn) {
  const id = btn.dataset.sectionShare;
  const el = document.getElementById(id);
  if (!el) return;
  const url = `${location.href.split('#')[0]}#${id}`;
  const title = `${el.querySelector('h2')?.textContent.trim() || ''}｜${document.querySelector('h1')?.textContent.trim() || ''}`;
  const body = [...el.querySelectorAll('tr, li')].map((n) => n.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 8).join('\n');
  const text = `${title}\n${body}`;
  if (navigator.share) {
    try { await navigator.share({ title, text, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
  }
  copy(`${text}\n（出處：懂咖 ${url}）`, btn);
}

// 檔名只用英數：部分瀏覽器遇到中文檔名會改成「download」
const slug = () => location.pathname.split('/').filter(Boolean).slice(1).join('-').replace(/[^\w-]/g, '') || 'home';

// 圖片交給使用者：手機支援分享檔案時叫出系統分享（可以直接傳到 LINE），否則下載（#26、#27）
async function deliver(cv, name, btn, text) {
  const blob = await new Promise((r) => cv.toBlob(r, 'image/png'));
  if (blob && navigator.canShare) {
    const file = new File([blob], name, { type: 'image/png' });
    if (navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: document.title, text: text || '' }); return; }
      catch (e) { if (e && e.name === 'AbortError') return; }
    }
  }
  const a = document.createElement('a');
  a.href = blob ? URL.createObjectURL(blob) : cv.toDataURL('image/png');
  a.download = name;
  a.hidden = true;
  document.body.append(a); // 沒有掛在頁面上時，部分瀏覽器會忽略檔名
  a.click();
  a.remove();
  if (blob) setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(btn, '已下載');
}

// 把速查表的一段畫成分享圖：頁名、段落標題、表格列或清單，底部是品牌與指向這一段的網址
function wrap(ctx, text, max) {
  const out = [];
  let line = '';
  for (const ch of text) {
    if (ch === '\n') { out.push(line); line = ''; continue; }
    if (ctx.measureText(line + ch).width > max && line) { out.push(line); line = ''; }
    line += ch;
  }
  if (line) out.push(line);
  return out;
}
async function sectionImage(btn) {
  const id = btn.dataset.sectionImage;
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const W = 1080, pad = 64, max = W - pad * 2;
    const page = document.querySelector('h1')?.textContent.trim() || '';
    const head = el.querySelector('h2')?.textContent.trim() || '';
    const rows = [...el.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent.trim()).filter(Boolean).join('｜'));
    const items = [...el.querySelectorAll('li')].map((li, i) => (el.querySelector('ol') ? `${i + 1}. ` : '・') + li.textContent.trim());
    const lines = (rows.length ? rows : items).slice(0, 12);
    const url = `${location.host}${location.pathname}#${id}`;
    const cv = document.createElement('canvas');
    const ctx = cv.getContext('2d');
    const F = '"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif';
    // 先量高度
    ctx.font = `30px ${F}`;
    const body = lines.map((l) => wrap(ctx, l, max));
    ctx.font = `bold 52px ${F}`;
    const headLines = wrap(ctx, head, max);
    const H = pad + 40 + 20 + headLines.length * 66 + 24 + body.reduce((n, b) => n + b.length * 44 + 18, 0) + 40 + 96;
    cv.width = W; cv.height = H;
    ctx.fillStyle = '#fbf7f1'; ctx.fillRect(0, 0, W, H);
    ctx.textBaseline = 'top';
    let y = pad;
    ctx.fillStyle = '#a8481f'; ctx.font = `bold 28px ${F}`; ctx.fillText(page, pad, y); y += 60;
    ctx.fillStyle = '#2a1d15'; ctx.font = `bold 52px ${F}`;
    headLines.forEach((l) => { ctx.fillText(l, pad, y); y += 66; });
    y += 24;
    ctx.font = `30px ${F}`;
    body.forEach((b) => {
      ctx.fillStyle = '#e8ddd0'; ctx.fillRect(pad, y - 10, max, 1);
      ctx.fillStyle = '#2a1d15';
      b.forEach((l) => { ctx.fillText(l, pad, y); y += 44; });
      y += 18;
    });
    ctx.fillStyle = '#a8481f'; ctx.fillRect(0, H - 96, W, 96);
    ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle';
    ctx.font = `bold 30px ${F}`; ctx.fillText('懂咖 Dongka', pad, H - 48);
    ctx.font = `22px ${F}`; ctx.textAlign = 'right'; ctx.fillText(url.length > 60 ? url.slice(0, 60) + '…' : url, W - pad, H - 48);
    await deliver(cv, `dongka-${slug()}-${id}.png`, btn, `${head}｜${page}\n${location.href.split('#')[0]}#${id}`);
  } catch {
    toast(btn, '這個瀏覽器不支援，請直接截圖');
  }
}

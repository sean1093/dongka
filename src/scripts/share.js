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
    const a = document.createElement('a');
    a.href = cv.toDataURL('image/png');
    a.download = `dongka-${(svg.getAttribute('aria-label') || 'figure').slice(0, 20)}.png`;
    a.click();
    toast(btn, '已下載');
  } catch {
    toast(btn, '這個瀏覽器不支援，請直接截圖');
  }
}

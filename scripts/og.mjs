// 產生社群分享圖（1200×630 JPEG）到 public/og/，並更新 src/data/og-manifest.json。
// 用法：npm run og（需要本機有 Playwright 的 Chromium 與中日韓字型，所以不在 CI 上跑；產生後把圖一起提交）
// 策略：每篇課程一張，其餘頁面依類別共用一張，避免在 repo 裡放上百張圖。
import { createRequire } from 'node:module';
// 用 require 載入，才找得到裝在全域的 Playwright
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync, writeFileSync } from 'node:fs';
import { lessons, tools } from '../src/data/lessons.js';
import { glossary } from '../src/data/glossary.js';

const cards = [
  { key: 'home', kicker: `懂咖 Dongka · 咖啡自學課 ${lessons.length} 篇`, title: '從喜歡喝，到喝得懂', sub: '課程、常見問題、豆子圖鑑、飲品配方與沖煮工具，全部免費' },
  // 每個工具與練習各一張
  ...tools.filter((t) => /^\/(tools|practice)\//.test(t.path)).map((t) => ({ key: t.path.replace(/^\/|\/$/g, '').replace(/\//g, '--'), kicker: t.kind === 'practice' ? '懂咖 · 練習' : '懂咖 · 工具', title: t.title, sub: t.desc })),

  ...lessons.map((l) => ({ key: `lessons--${l.slug}`, kicker: `懂咖課程 · 第 ${l.id} 篇`, title: l.title, sub: l.takeaways[0] })),
  { key: 'faq', kicker: '懂咖 · 速查', title: '咖啡常見問題', sub: '每個問題，先用一兩句話回答' },
  { key: 'compare', kicker: '懂咖 · 速查', title: '咖啡比一比', sub: '水洗和日曬、淺焙和深焙、拿鐵和馥列白差在哪' },
  { key: 'career', kicker: '懂咖 · 第 11 篇延伸', title: '台灣咖啡證照與比賽', sub: '飲料調製丙級、乙級與世界咖啡錦標賽，一頁看懂' },
  { key: 'cheatsheets', kicker: '懂咖 · 速查', title: '咖啡速查表', sub: '手沖參數、味道排查、養豆保存，一頁一張' },
  { key: 'atlas', kicker: '懂咖 · 圖鑑', title: '豆子圖鑑', sub: '選你喜歡的味道，找適合的產區' },
  { key: 'drinks', kicker: '懂咖 · 圖鑑', title: '咖啡飲品配方', sub: '拿鐵、馥列白、冷萃、Dirty 的比例與做法' },
  { key: 'glossary', kicker: '懂咖 · 圖鑑', title: '咖啡名詞辭典', sub: `${glossary.length} 個術語，白話解釋` },
  { key: 'tools', kicker: '懂咖 · 工具', title: '沖煮工具', sub: '計時器、味道排查、萃取率計算機' },
  { key: 'start', kicker: '懂咖 · 新手入口', title: '咖啡從哪裡開始學', sub: '六條不用從頭讀到尾的入門路線' },
];
// 類別共用：這些路徑開頭的頁面都用同一張
const shared = { faq: 'faq', compare: 'compare', cheatsheets: 'cheatsheets', atlas: 'atlas', drinks: 'drinks', glossary: 'glossary', tools: 'tools', practice: 'tools' };

const html = (c) => `<body style="margin:0;width:1200px;height:630px;background:#faf6ef;font-family:'Noto Sans CJK TC','Noto Sans TC',sans-serif;display:flex;flex-direction:column;justify-content:space-between">
  <div style="padding:70px 80px 0">
    <div style="font-size:30px;font-weight:700;letter-spacing:.1em;color:#a8481f">${c.kicker}</div>
    <div style="font-family:'Noto Serif CJK TC','Noto Serif TC',serif;font-weight:700;font-size:${c.title.length > 13 ? 68 : 84}px;line-height:1.25;color:#2a1d15;margin-top:26px">${c.title}</div>
    <div style="font-size:36px;line-height:1.5;color:#6f5d50;margin-top:26px">${c.sub}</div>
  </div>
  <div style="background:#a8481f;color:#fff;padding:22px 80px;font-size:30px;font-weight:700;display:flex;justify-content:space-between"><span>懂咖 Dongka</span><span style="font-weight:400">從喜歡喝，到喝得懂</span></div>
</body>`;

mkdirSync('public/og', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await page.setContent(html(c));
  await page.screenshot({ path: `public/og/${c.key}.jpg`, type: 'jpeg', quality: 82 });
}
// 舊網址 /og.png 保留，內容換成首頁卡片
await page.setContent(html(cards[0]));
await page.screenshot({ path: 'public/og.png', type: 'png' });
await browser.close();
writeFileSync('src/data/og-manifest.json', JSON.stringify({ pages: cards.map((c) => c.key), shared }, null, 1) + '\n');
console.log(`generated ${cards.length} images`);

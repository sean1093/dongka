// 給 AI 助理與爬蟲看的網站摘要（llms.txt 慣例）
import { lessons } from '../data/lessons.js';
import { faqs } from '../data/faq.js';
import { comparisons } from '../data/compare.js';
import { sheets } from '../data/cheatsheets.js';
import { site } from '../data/site.js';

export function GET({ site: origin }) {
  const root = `${(origin?.origin || '').replace(/\/$/, '')}${import.meta.env.BASE_URL.replace(/\/$/, '')}`;
  const li = (t, p, d = '') => `- [${t}](${root}${p})${d ? `: ${d}` : ''}`;
  const txt = [
    `# ${site.name} ${site.nameEn}`,
    '',
    `> 繁體中文（台灣）的咖啡自學網站：${site.tagline}。內容整理自學習筆記。${site.checkLong}最近一次整體查核 ${site.updated}。全部免費。`,
    '',
    '## 課程',
    ...lessons.map((l) => li(`第 ${l.id} 篇 ${l.title}`, `/lessons/${l.slug}/`, l.seoDesc)),
    '',
    '## 常見問題',
    ...faqs.map((f) => li(f.q, `/faq/${f.slug}/`, f.short)),
    '',
    '## 比較',
    ...comparisons.map((c) => li(c.title, `/compare/${c.slug}/`, c.verdict)),
    '',
    '## 速查表',
    ...sheets.map((s) => li(s.title, `/cheatsheets/${s.slug}/`, s.question)),
    '',
    '## 查詢與工具',
    li('台灣咖啡證照與比賽', '/career/', '飲料調製丙級、乙級的資格、時程、費用，以及世界咖啡錦標賽怎麼參加'),
    li('豆子圖鑑', '/atlas/', '產區、品種、處理法，依風味推薦'),
    li('飲品配方', '/drinks/', '義式、冷咖啡、特調與咖啡調酒的組成與做法'),
    li('名詞辭典', '/glossary/', '咖啡術語白話解釋'),
    li('工具', '/tools/', '沖煮計時器、味道排查、萃取率計算機、沖煮與杯測紀錄'),
    '',
  ].join('\n');
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

// 一致性檢查（#19）：建置前執行，發現站內數字或說法互相矛盾時讓建置失敗。
// 不需要任何套件。新增檢查時，訊息請寫明「哪裡、為什麼錯、該改成什麼」。
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { lessons } from '../src/data/lessons.js';
import { glossary } from '../src/data/glossary.js';
import { faqs, faqGroups } from '../src/data/faq.js';
import { slugify } from '../src/data/site.js';
import { fileURLToPath } from 'node:url';

// 從任何目錄執行都以 repo 根目錄為準
process.chdir(fileURLToPath(new URL('..', import.meta.url)));

const problems = [];
const fail = (where, msg) => problems.push(`${where}：${msg}`);

// 要檢查的文字檔：課程、資料、頁面、版型、腳本
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|js|mjs|md)$/.test(f)) files.push(p);
  }
};
walk('src');
files.push('scripts/og.mjs');
const text = Object.fromEntries(files.map((f) => [f, readFileSync(f, 'utf8')]));
const lineOf = (s, i) => s.slice(0, i).split('\n').length;
const scan = (re, msg, { skip = () => false } = {}) => {
  for (const [f, s] of Object.entries(text)) {
    if (f.endsWith('scripts/check.mjs')) continue;
    for (const m of s.matchAll(re)) if (!skip(m, s, f)) fail(`${f}:${lineOf(s, m.index)}`, `${msg}（「${m[0]}」）`);
  }
};

// 1. 課程篇數：課程檔案、lessons.js 與文案要一致
const mdCount = readdirSync('src/content/lessons').filter((f) => /^\d\d\.md$/.test(f)).length;
if (mdCount !== lessons.length) fail('src/data/lessons.js', `有 ${mdCount} 個課程檔，但 lessons.js 列了 ${lessons.length} 篇`);
scan(/(\d+)\s*(?:堂課|堂|篇課程)/g, `課程篇數應為 ${lessons.length}`, { skip: (m) => +m[1] === lessons.length });
scan(/(十一|十二|十三)\s*(?:堂|篇課程)/g, `課程篇數請用數字並與實際一致`);
scan(/自學課\s*(\d+)\s*篇/g, `課程篇數應為 ${lessons.length}，請用 lessons.length`, { skip: (m) => +m[1] === lessons.length });

// 2. 名詞數量不要寫死
scan(/(\d+)\s*個(?:咖啡)?(?:術語|名詞)/g, `名詞數量應由 glossary.length 計算（目前 ${glossary.length}）`, { skip: (m) => +m[1] === glossary.length });
scan(/七十個術語/g, '名詞數量請由 glossary.length 計算');

// 3. 舊站名與舊說法
scan(/Seed to Cup/g, '舊站名');
scan(/做過一輪(?:事實)?查核|前後共三輪/g, '查核範圍請引用 site.checkShort／site.checkLong，不要另寫');

// 4. 咖啡因紅黃綠標示：現行規定是 紅 201 毫克以上、黃 101 至 200、綠 100 以下（#10）
scan(/紅[^\n。]{0,16}?(?<!\d)200\s*毫克(?:以上|或以上)/g, '紅標門檻是 201 毫克以上（2022 年公告，2023 年起適用）');
scan(/黃[^\n。]{0,10}?(?<!\d)100\s*(?:到|至|–|-)\s*200/g, '黃標門檻是 101 至 200 毫克');

// 5. FAQ 指向的課程與章節必須存在
const lessonIds = new Set(lessons.map((l) => l.id));
const fsl = new Set(faqs.map((f) => f.slug));
for (const f of faqs) {
  if (!faqGroups.includes(f.group)) fail(`faq:${f.slug}`, `分類「${f.group}」不在 faqGroups`);
  if (!lessonIds.has(f.lesson)) { fail(`faq:${f.slug}`, `課程 ${f.lesson} 不存在`); continue; }
  const md = readFileSync(`src/content/lessons/${f.lesson}.md`, 'utf8');
  if (!md.split('\n').includes(`## ${f.section}`)) fail(`faq:${f.slug}`, `第 ${f.lesson} 篇沒有「## ${f.section}」這個標題`);
  for (const r of f.related) if (!fsl.has(r)) fail(`faq:${f.slug}`, `related 指向不存在的 ${r}`);
}

// 6. 名詞的網址代稱不可重複或空白
const slugs = new Map();
for (const g of glossary) {
  const s = slugify(g.en); // 與頁面和 sitemap 用同一個函式
  if (!s) fail(`glossary:${g.term}`, '英文名稱產生的網址是空的');
  else if (slugs.has(s)) fail(`glossary:${g.term}`, `網址 ${s} 和「${slugs.get(s)}」重複`);
  slugs.set(s, g.term);
}

if (problems.length) {
  console.error(`一致性檢查失敗（${problems.length} 項）：\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`一致性檢查通過：${lessons.length} 篇課程、${faqs.length} 題 FAQ、${glossary.length} 個名詞`);

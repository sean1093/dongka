# 懂咖 Dongka

從喜歡喝，到喝得懂。一套 12 堂的繁體中文咖啡自學課程，附圖鑑、配方、名詞辭典與沖煮工具。

線上版：https://sean1093.github.io/dongka/

## 內容

- **課程**：12 篇文章，分七個階段（原料、轉化、感官、沖煮、文化與創意、產業與職涯、日常），每篇結尾有可標記的自我檢核題。
- **閱讀輔助**：每篇有導言、三個重點、閱讀時間；「進階」段落可整段收合；名詞第一次出現時可點開解釋；原創示意圖；全站搜尋。
- **速查**：常見問題（每題先用一兩句話回答）、比一比（並排對照表）、速查表（可列印）、新手入口。內容都從課程整理，各頁標明依據。
- **查詢**：豆子圖鑑（產區、品種、處理法，依風味偏好推薦）、飲品配方（可依器材、冷熱、酒精篩選）、名詞辭典（點開側欄看延伸說明）。
- **工具**：沖煮計時器、味道排查、萃取率計算機（含沖煮控制圖）、沖煮紀錄與杯測紀錄表。
- **練習**：讀懂豆袋標籤、錯題複習。
- 學習進度與紀錄存在瀏覽器的 localStorage，沒有後端。

## 開發

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`build` 會在 Astro 建置後用 Pagefind 產生搜尋索引，所以搜尋頁只有在 build 之後（`npm run preview`）才有結果。

### 加照片

把圖檔放到 `public/images/`，在文章的 Markdown 裡用一般語法插入，並在圖說寫上作者與授權：

```md
![咖啡櫻桃](/dongka/images/cherry.jpg)
```

## 需要你填的設定

都在 `src/data/site.js`：

- `googleSiteVerification`：Google Search Console 的 HTML 標記驗證碼。
- `updated`：內容最後查核日期，會顯示在文章頁，也寫進結構化資料與 sitemap。改過內容後記得更新。

## SEO

- 每頁有獨立的 title、description、canonical。
- 社群分享圖：每篇課程一張，其餘頁面依類別共用（`public/og/`）。改了課程標題或新增類別後執行 `npm run og` 重新產生並提交；這個指令需要本機有 Playwright 與中文字型。
- 每頁頁尾有分享列（手機原生分享、LINE、複製連結），圖表可存成帶網站名稱的圖片，圖鑑推薦與萃取率計算機的狀態會寫進網址。
- `/llms.txt` 提供給 AI 助理的網站摘要。
- 文章、名詞頁、飲品頁輸出 Article 與 BreadcrumbList 結構化資料；首頁輸出 WebSite。
- `/sitemap.xml` 由 `src/pages/sitemap.xml.js` 產生；新增頁面類型時要加進去。
- 每個名詞（`/glossary/<英文名>/`）與每款飲品（`/drinks/<key>/`）都有獨立頁面。
- `robots.txt` 只有在網域根目錄才有效，目前的專案網址（`/dongka/`）下搜尋引擎讀不到，換成自訂網域後才會生效。

## 結構

| 路徑 | 說明 |
| --- | --- |
| `src/content/lessons/NN.md` | 文章內容，從 Notion 匯出的 Notion-flavored Markdown（含 `<callout>`、`<toggle>` 等標籤） |
| `src/lib/notion.js` | 把上述格式轉成 HTML，並把「自我檢核」的 toggle 抽成題目 |
| `src/data/lessons.js` | 課程階段、文章標題、導言（lede）、三個重點（takeaways）、進階段落編號（advanced）、工具清單 |
| `src/data/faq.js`、`compare.js`、`cheatsheets.js` | 常見問題、比一比、速查表的內容。只收課程能支持的說法；課程更正時要一起改 |
| `src/data/recipes.js` | 沖煮計時器的配方資料 |
| `src/data/glossary.js` | 名詞辭典；文章中的名詞會自動標記，點開是側欄面板（`src/scripts/term-panel.js`） |
| `src/data/atlas.js` | 豆子圖鑑：產區、品種、處理法（整理自第 01、02 篇） |
| `src/data/drinks.js` | 飲品配方（整理自第 06、08 篇） |
| `src/lib/figures.js` | 原創 SVG 示意圖，以及每張圖插在哪一篇的哪個標題後面 |
| `src/pages/` | 首頁、文章頁、工具頁、關於 |

更新文章：直接改 `src/content/lessons/` 裡對應的檔案。新增一篇：加一個 `NN.md`，並在 `src/data/lessons.js` 加一筆。

## 部署

推到 `main` 會由 `.github/workflows/deploy.yml` 建置並部署到 GitHub Pages。第一次需要到 repo 的 Settings → Pages，把 Source 設為 **GitHub Actions**。

網址的路徑（`/dongka/`）由 workflow 依 repo 名稱自動帶入，repo 改名或換成自訂網域後重新部署即可，不用改設定檔。

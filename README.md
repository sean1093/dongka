# Seed to Cup

從種子到杯子：一套 11 堂的繁體中文咖啡自學課程，附自我檢核與沖煮工具。

線上版：https://sean1093.github.io/seed-to-cup/

## 內容

- **課程**：11 篇文章，分六個階段（原料、轉化、感官、沖煮、文化與創意、產業與職涯），每篇結尾有可標記的自我檢核題。
- **工具**：萃取率計算機（含沖煮控制圖）、味道排查、沖煮計時器（六套配方、依粉量換算）、沖煮紀錄（可匯出 CSV）。
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

## 結構

| 路徑 | 說明 |
| --- | --- |
| `src/content/lessons/NN.md` | 文章內容，從 Notion 匯出的 Notion-flavored Markdown（含 `<callout>`、`<toggle>` 等標籤） |
| `src/lib/notion.js` | 把上述格式轉成 HTML，並把「自我檢核」的 toggle 抽成題目 |
| `src/data/lessons.js` | 課程階段、文章標題與網址、工具清單 |
| `src/data/recipes.js` | 沖煮計時器的配方資料 |
| `src/pages/` | 首頁、文章頁、工具頁、關於 |

更新文章：直接改 `src/content/lessons/` 裡對應的檔案。新增一篇：加一個 `NN.md`，並在 `src/data/lessons.js` 加一筆。

## 部署

推到 `main` 會由 `.github/workflows/deploy.yml` 建置並部署到 GitHub Pages。第一次需要到 repo 的 Settings → Pages，把 Source 設為 **GitHub Actions**。

若改用自訂網域，修改 `astro.config.mjs` 的 `site` 與 `base`。

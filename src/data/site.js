// 全站設定。需要你自己填的值都集中在這裡。
export const site = {
  name: '懂咖',
  nameEn: 'Dongka',
  tagline: '從喜歡喝，到喝得懂',
  description: '懂咖：從喜歡喝，到喝得懂。12 篇繁體中文咖啡自學課，附豆子圖鑑、飲品配方、名詞辭典與沖煮工具。',
  // 內容最後一次整體查核與改寫的日期（顯示在文章頁，也寫進結構化資料與 sitemap）
  published: '2026-11-23',
  updated: '2026-11-27',
  // Google Search Console 的「HTML 標記」驗證碼：只貼 content="…" 裡面那一串
  googleSiteVerification: '',
  // 查核範圍：全站共用同一個說法（#8），依 docs/fact-check 的實際紀錄
  checkShort: '內容經過查核並附參考資料（範圍與限制見關於頁），但不是專業審訂的教材。',
  checkLong: '01 至 11 篇在 2026 年 11 月改寫時逐篇查核過，之後三輪針對特定主題、第 12 篇、證照與杯測頁再查，部分項目已改以官方原文確認，其餘仍是搜尋摘要或二手資料；每項的依據與未確認處公開在 docs/fact-check。這不是專業審訂。',
  // 讀者回報錯誤的地方
  issuesUrl: 'https://github.com/sean1093/dongka/issues/new',
};

// 名詞的網址代稱：用英文名轉成小寫加連字號
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// 全站設定。需要你自己填的值都集中在這裡。
export const site = {
  name: '懂咖',
  nameEn: 'Dongka',
  tagline: '從喜歡喝，到喝得懂',
  description: '懂咖：從喜歡喝，到喝得懂。11 堂繁體中文咖啡自學課，附豆子圖鑑、飲品配方、名詞辭典與沖煮工具。',
  // 內容最後一次整體查核與改寫的日期（顯示在文章頁，也寫進結構化資料與 sitemap）
  published: '2026-11-23',
  updated: '2026-11-23',
  // Google Search Console 的「HTML 標記」驗證碼：只貼 content="…" 裡面那一串
  googleSiteVerification: '',
  // 讀者回報錯誤的地方
  issuesUrl: 'https://github.com/sean1093/dongka/issues/new',
};

// 名詞的網址代稱：用英文名轉成小寫加連字號
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

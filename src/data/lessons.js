export const stages = [
  { id: 1, name: '原料', ability: '看懂一包豆子的標籤，預測它大概喝起來怎樣' },
  { id: 2, name: '轉化', ability: '理解烘焙度與曲線如何影響風味，知道怎麼養豆' },
  { id: 3, name: '感官', ability: '會用專業語言描述咖啡，能做杯測' },
  { id: 4, name: '沖煮', ability: '能穩定沖出好咖啡，並依問題調整參數' },
  { id: 5, name: '文化與創意', ability: '說得出咖啡的故事，也能設計自己的特調' },
  { id: 6, name: '產業與職涯', ability: '看懂供應鏈與法規，認識台灣咖啡，能評估職涯與開店的可行性' },
];

export const lessons = [
  { id: '01', slug: 'beans', stage: 1, title: '咖啡豆：植物、品種與處理法' },
  { id: '02', slug: 'origins', stage: 1, title: '產區巡禮：風土如何決定風味' },
  { id: '03', slug: 'roasting', stage: 2, title: '烘焙：從生豆到熟豆的化學' },
  { id: '04', slug: 'tasting', stage: 3, title: '風味分析與品飲' },
  { id: '05', slug: 'brewing', stage: 4, title: '萃取原理與手沖技巧' },
  { id: '06', slug: 'espresso', stage: 4, title: '義式濃縮與經典咖啡飲品' },
  { id: '07', slug: 'culture', stage: 5, title: '世界咖啡文化與歷史' },
  { id: '08', slug: 'signature-drinks', stage: 5, title: '現代特調與咖啡創意飲品' },
  { id: '09', slug: 'trade', stage: 6, title: '生豆貿易、包裝運輸與食品衛生' },
  { id: '10', slug: 'taiwan', stage: 6, title: '台灣咖啡：產業的過去與未來' },
  { id: '11', slug: 'career', stage: 6, title: '咖啡職涯與咖啡館經營' },
];

export const tools = [
  { slug: 'extraction', icon: '📈', title: '萃取率計算機', desc: '輸入粉重、液重與 TDS，在沖煮控制圖上看這杯落在哪一格。' },
  { slug: 'troubleshoot', icon: '🩺', title: '味道排查', desc: '選一個症狀，得到可能原因與調整順序。' },
  { slug: 'timer', icon: '⏱️', title: '沖煮計時器', desc: '六套配方依粉量換算，跟著時間點注水。' },
  { slug: 'brew-log', icon: '📝', title: '沖煮紀錄', desc: '記下每一杯的參數與感受，存在你的瀏覽器裡，可匯出 CSV。' },
];

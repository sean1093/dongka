export const stages = [
  { id: 1, name: '原料', ability: '看懂一包豆子的標籤，預測它大概喝起來怎樣' },
  { id: 2, name: '轉化', ability: '理解烘焙度與曲線如何影響風味，知道怎麼養豆' },
  { id: 3, name: '感官', ability: '會用專業語言描述咖啡，能做杯測' },
  { id: 4, name: '沖煮', ability: '能穩定沖出好咖啡，並依問題調整參數' },
  { id: 5, name: '文化與創意', ability: '說得出咖啡的故事，也能設計自己的特調' },
  { id: 6, name: '產業與職涯', ability: '看懂供應鏈與法規，認識台灣咖啡，能評估職涯與開店的可行性' },
];

export const lessons = [
  { id: '01', slug: 'beans', stage: 1, title: '咖啡豆：植物、品種與處理法' , lede: '一包豆子的標籤上寫著產區、品種、處理法、海拔。看懂這幾個詞，你就能在開封前猜到它大概的味道。', takeaways: ["咖啡豆是果實的種子，果實由外到內有六層", "阿拉比卡與羅布斯塔是兩個主要物種，品種家譜都從葉門傳出", "水洗、日曬、蜜處理的差別，在乾燥時留下了哪幾層"], advanced: [3, 5, 6] },
  { id: '02', slug: 'origins', stage: 1, title: '產區巡禮：風土如何決定風味' , lede: '同樣是阿拉比卡，衣索比亞的像花茶，巴西的像堅果巧克力。差別來自海拔、氣候、土壤，還有種的人。', takeaways: ["咖啡種在南北回歸線之間的咖啡帶，海拔越高通常越明亮", "非洲偏花果、中南美偏平衡、亞洲偏厚實，是好用的第一印象", "不確定時先查「產區風味速查表」"], advanced: [7, 8] },
  { id: '03', slug: 'roasting', stage: 2, title: '烘焙：從生豆到熟豆的化學' , lede: '生豆聞起來像青草，喝起來幾乎沒有咖啡味。我們熟悉的香氣，全是烘焙那十幾分鐘裡的化學反應造出來的。', takeaways: ["一爆與二爆是判斷烘焙度的兩個路標", "越淺越能喝到產地的酸與香，越深越是烘焙本身的苦甜", "烘好的豆子要養幾天，並且避光、防潮、防氧"], advanced: [3, 5, 6] },
  { id: '04', slug: 'tasting', stage: 3, title: '風味分析與品飲' , lede: '「好喝」和「喝得出為什麼好喝」是兩件事。這一篇給你一套語言和一套方法，把模糊的感覺變成說得出口的描述。', takeaways: ["風味 = 味道 + 香氣 + 口感，大部分的「風味」其實來自嗅覺", "用風味輪由內而外找詞，停在中間層比亂猜準確", "杯測是業界共通的評估方法，在家也能做"], advanced: [5, 8] },
  { id: '05', slug: 'brewing', stage: 4, title: '萃取原理與手沖技巧' , lede: '手沖看起來像儀式，其實只在控制一件事：讓水從咖啡粉裡帶走剛剛好的東西。懂了萃取，任何配方你都能自己調。', takeaways: ["萃取不足偏酸、萃取過度偏苦；濃淡是另一回事，由粉水比決定", "研磨是最有效的調整，一次只改一個變數", "先照一套配方穩定沖，再用排查表修正"], advanced: [7, 9, 11, 12, 13] },
  { id: '06', slug: 'espresso', stage: 4, title: '義式濃縮與經典咖啡飲品' , lede: '咖啡店菜單上的拿鐵、卡布奇諾、馥列白，底下都是同一杯濃縮。差別只在加了多少牛奶、多厚的奶泡。', takeaways: ["濃縮是用壓力在短時間內做出的高濃度咖啡，參數很敏感", "奶泡的厚薄決定了一杯奶咖的名字與口感", "認得十幾種經典飲品的組成，就看得懂大部分菜單"], advanced: [] },
  { id: '07', slug: 'culture', stage: 5, title: '世界咖啡文化與歷史' , lede: '咖啡從衣索比亞的森林出發，經過葉門的修道院、伊斯坦堡的咖啡館、歐洲的殖民船隊，才來到你的杯子裡。', takeaways: ["咖啡的傳播路線：衣索比亞、葉門、鄂圖曼、歐洲，再到殖民地", "每個地方都長出自己的喝法與咖啡館文化", "「三波咖啡浪潮」是理解今天精品咖啡的一把鑰匙"], advanced: [9] },
  { id: '08', slug: 'signature-drinks', stage: 5, title: '現代特調與咖啡創意飲品' , lede: '冷萃、氣泡、檸檬、通寧水、調酒。當咖啡變成一種材料，重點是讓其他東西放大它，而不是蓋掉它。', takeaways: ["冷萃、冰滴、冰手沖是三種不同原理的冷咖啡", "幾款經典特調與咖啡調酒的配方和成功關鍵", "用「呼應、對比、補完」設計自己的飲品"], advanced: [] },
  { id: '09', slug: 'trade', stage: 6, title: '生豆貿易、包裝運輸與食品衛生' , lede: '一杯咖啡背後是一條橫跨半個地球的供應鏈。這一篇偏專業：生豆怎麼買賣、怎麼運、怎麼保存，以及做吃的該守的衛生規矩。', takeaways: ["生豆從農場到烘豆廠要經過哪些人、哪些環節", "包裝、運輸與倉儲如何決定豆子到手時的狀態", "咖啡價格的形成，以及食品衛生的基本要求"], advanced: [2, 5, 6] },
  { id: '10', slug: 'taiwan', stage: 6, title: '台灣咖啡：產業的過去與未來' , lede: '台灣種咖啡已經超過一百年，產量很小、價格很高。它為什麼值得認識，又面對什麼樣的難題？', takeaways: ["台灣咖啡從日治時期到今天的發展脈絡", "主要產區、風味特色與產業的挑戰", "怎麼實際去拜訪、品嚐台灣咖啡"], advanced: [6] },
  { id: '11', slug: 'career', stage: 6, title: '咖啡職涯與咖啡館經營' , lede: '想把興趣變成工作，或是開一間自己的店？先看清楚這個產業有哪些位置，以及一間咖啡館的帳怎麼算。', takeaways: ["咖啡產業有哪些職位與發展路徑", "證照、課程與比賽各自能帶給你什麼", "開店前該算清楚的數字"], advanced: [3, 6] },
];

export const tools = [
  { slug: 'timer', kind: 'tool', path: '/tools/timer/', icon: '⏱️', title: '沖煮計時器', desc: '六套配方依粉量換算，跟著時間點注水。' },
  { slug: 'troubleshoot', kind: 'tool', path: '/tools/troubleshoot/', icon: '🩺', title: '味道排查', desc: '選一個症狀，得到可能原因與調整順序。' },
  { slug: 'extraction', kind: 'tool', path: '/tools/extraction/', icon: '📈', title: '萃取率計算機', desc: '輸入粉重、液重與 TDS，在沖煮控制圖上看這杯落在哪一格。' },
  { slug: 'brew-log', kind: 'tool', path: '/tools/brew-log/', icon: '📝', title: '沖煮紀錄', desc: '記下每一杯的參數與感受，存在你的瀏覽器裡，可匯出 CSV。' },
  { slug: 'cupping', kind: 'tool', path: '/tools/cupping/', icon: '🥄', title: '杯測紀錄表', desc: '照 100 分制杯測表打分數，自動加總並畫出雷達圖。' },
  { slug: 'label', kind: 'practice', path: '/practice/label/', icon: '🏷️', title: '讀懂豆袋標籤', desc: '看標籤先預測風味，再對答案，共八題。' },
  { slug: 'review', kind: 'practice', path: '/practice/review/', icon: '🔁', title: '錯題複習', desc: '把各篇標記「還要再練」的題目集中重做，或隨機抽題。' },
  { slug: 'atlas', kind: 'explore', path: '/atlas/', icon: '🌍', title: '豆子圖鑑', desc: '依喜歡的味道找產區，查詢產區、品種與處理法。' },
  { slug: 'drinks', kind: 'explore', path: '/drinks/', icon: '🥛', title: '飲品配方', desc: '三十多款飲品的組成與做法，可依器材、冷熱、酒精篩選。' },
  { slug: 'glossary', kind: 'explore', path: '/glossary/', icon: '📖', title: '名詞辭典', desc: '白話解釋加延伸說明，點一下看完整內容。' },
];

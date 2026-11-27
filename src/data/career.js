// 台灣咖啡證照與比賽一頁通（/career/，issue #24）
// 每一項時效性資料都附 src（對應下方 sources 的 key）與查核日。
// 查核紀錄：docs/fact-check/round-4/r4-career.md。只寫實際讀到的官方原文；讀不到的寫明「請以主辦單位公告為準」。
// 每年更新時：先看 sources 裡的簡章與公告，再改 schedule、fees 與 world 三段，最後改 checked。

export const checked = '2026-11-27';
export const checkedLabel = '2026-11';

// 官方來源。checked 是實際打開並讀過內容的日期
export const sources = {
  brochure: {
    name: '115 年度全國技術士技能檢定簡章（115.08 版）',
    org: '勞動部勞動力發展署技能檢定中心／技專校院入學測驗中心基金會',
    url: 'https://skill.tcte.edu.tw/download.php',
    note: '收費標準、各梯次辦理職類、報檢資格、測試時間與補助都在簡章裡。',
    checked,
  },
  schedule: {
    name: '115 年度全國技術士技能檢定 重要日程表',
    org: '全國技術士技能檢定試務資訊網站',
    url: 'https://skill.tcte.edu.tw/notice.php',
    note: '三個梯次的簡章發售、報名、學科測試與成績公告日期。',
    checked,
  },
  regStep: {
    name: '報名程序說明',
    org: '全國技術士技能檢定試務資訊網站',
    url: 'https://skill.tcte.edu.tw/reg_step.php',
    note: '網路報名、紙本通信報名、團體報名與補件方式。',
    checked,
  },
  wdasec: {
    name: '技能檢定中心：檢定試題與參考資料',
    org: '勞動部勞動力發展署技能檢定中心',
    url: 'https://www.wdasec.gov.tw/Content_List.aspx?n=C5944E4886CBFDCF',
    note: '技能檢定規範、歷屆試題與測試參考資料的入口。本次查核時，飲料調製的規範與參考資料檔案位在另一個網域，無法開啟。',
    checked,
  },
  rules: {
    name: '技術士技能檢定作業及試場規則（112.11.02 修正）',
    org: '全國法規資料庫',
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0080014',
    note: '第 19 條：學科測驗題、百分法 60 分及格；術科以實作為原則。',
    checked,
  },
  law: {
    name: '技術士技能檢定及發證辦法（112.11.02 修正）',
    org: '全國法規資料庫',
    url: 'https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0080004',
    note: '第 5 條分級、第 6 條丙級資格、第 10 條合格與術科成績保留。',
    checked,
  },
  mol: {
    name: '勞委會澄清稿：調酒職類調整為飲料調製職類',
    org: '勞動部全球資訊網',
    url: 'https://www.mol.gov.tw/1607/1632/1640/17666/post',
    note: '丙級與乙級的技能範圍。',
    checked,
  },
  scaEvents: {
    name: 'SCA Events',
    org: 'Specialty Coffee Association',
    url: 'https://sca.coffee/events',
    note: '七項世界咖啡錦標賽；2026 世界咖啡大師比賽在巴拿馬。',
    checked,
  },
  scaTaipei: {
    name: 'Announcing the 2023 Taipei World Coffee Championships',
    org: 'Specialty Coffee Association',
    url: 'https://sca.coffee/sca-news/2022/7/12/announcing-the-2023-taipei-world-coffee-championships-wh4zy',
    note: '世界賽由 SCA 子公司 World Coffee Events 製作；台灣的世界冠軍與 2023 台北世界賽。',
    checked,
  },
  scaRules2023: {
    name: 'Announcing the 2023 Taipei WCC Rules & Regulations',
    org: 'Specialty Coffee Association',
    url: 'https://sca.coffee/sca-news/announcing-the-2023-taipei-wcc-rules-regulations-5crbb',
    note: '規則由全球 60 多個取得授權的比賽主辦單位（Competition Body）採用。',
    checked,
  },
  scaTokyo: {
    name: 'World of Coffee Tokyo 2027 and the 2027 World Barista Championship',
    org: 'Specialty Coffee Association',
    url: 'https://sca.coffee/sca-news/2025/9/25/announcing-world-of-coffee-tokyo-2027-and-the-2027-world-barista-championship-tokyo-dn5nc',
    note: '第 27 屆世界咖啡大師比賽：2027 年 4 月 28 日至 5 月 1 日，東京。',
    checked,
  },
  scaBogota: {
    name: '2027 World Cup Tasters Championship to Take Place in Bogotá',
    org: 'Specialty Coffee Association',
    url: 'https://sca.coffee/sca-news/2025/10/17/world-cup-tasters-championships-bogota-2027',
    note: '2027 世界杯測大賽與世界手沖咖啡大賽：2027 年 9 月 30 日至 10 月 2 日，波哥大。',
    checked,
  },
  wcc: {
    name: 'World Coffee Championships 官方網站',
    org: 'World Coffee Events',
    url: 'https://wcc.coffee',
    note: '各國比賽主辦單位名單、規則與賽程。本次查核時無法連線，未讀到內容。',
    checked: null,
  },
};

// 每年會變的項目（頁面上的提醒框）
export const yearly = [
  ['檢定梯次與日期', '每年三個梯次的報名、學科測試日期都不同，簡章通常在前一年 12 月公告（115 年度簡章於 114 年 12 月 15 日公告）。', 'brochure'],
  ['飲料調製排在哪一梯次', '「並非所有職類、級別每梯次皆有辦理」。115 年度丙級只在第二梯次、乙級只在第三梯次，116 年度要看新簡章。', 'brochure'],
  ['報名費用', '審查費與學科測試費目前固定，術科測試費依當年公告的收費標準，所以總額可能每年不同。', 'brochure'],
  ['報檢資格與表件', '簡章寫明「依技檢中心最新公告為主」，報名前要再看一次。', 'brochure'],
  ['世界賽的城市、日期與規則', '每一季都會公布新規則與新的主辦城市。', 'scaRules2023'],
  ['國內選拔賽', '日期、報名費、名額與主辦單位以當年公告為準，本頁沒有查到官方原文。', 'wcc'],
];

// 飲料調製技術士：丙級與乙級
export const levels = [
  {
    level: '丙級',
    who: '年滿 15 歲或國民中學畢業即可報檢。',
    whoSrc: 'law',
    scope: '調製無酒精成分的飲料（如咖啡、茶飲、奶類），以及水果的刀工、擺飾、壓汁。',
    scopeSrc: 'mol',
    batch2026: '第二梯次',
    fit: '想要第一張國家證照、從零開始的人。',
  },
  {
    level: '乙級',
    who: '符合 12 種資格之一，例如：持相關職類丙級證並高中職畢業；或大專校院以上畢業（不限科系）；或從事相關工作 6 年以上。',
    whoSrc: 'brochure',
    scope: '調酒技能、其他飲品調製，以及成本計算等管理能力。',
    scopeSrc: 'mol',
    batch2026: '第三梯次',
    fit: '已有丙級或餐飲工作經驗，或大專畢業、想直接挑戰進階的人。',
  },
];

// 115 年度（2026）時程：只列飲料調製有辦理的梯次
export const schedule = [
  { batch: '第二梯次', level: '丙級', sale: '115/04/17 至 05/05', reg: '115/04/24 上午 9 時至 05/05 下午 5 時（網路）', ticket: '115/06/16 寄出', written: '115/07/05（日）上午 10:00 至 11:40', score: '115/07/31 網路公告' },
  { batch: '第三梯次', level: '乙級', sale: '115/08/20 至 09/07', reg: '115/08/27 上午 9 時至 09/07 下午 5 時（網路）', ticket: '115/10/20 寄出', written: '115/11/08（日）下午 2:00 至 3:40', score: '115/12/04 網路公告' },
];

// 115 年度飲料調製收費（簡章第 24 頁、第 39 頁）。不含及格後的證照費 160 元
export const fees = [
  { level: '丙級', normal: 2240, noWritten: 2050, noPractical: 340, practical: 1900 },
  { level: '乙級', normal: 3075, noWritten: 2885, noPractical: 340, practical: 2735 },
];
export const feeParts = '審查費 150 元、學科測試費 190 元，其餘是術科測試費；學、術科都及格後再繳證照費 160 元。';

// 考什麼
export const exam = {
  written: [
    '筆試或電腦的測驗題，百分法計算，60 分及格。',
    '題目裡有共用的部分：職業安全衛生、工作倫理與職業道德、環境保護、節能減碳 4 項各佔 5%；飲料調製屬「食品安全衛生及營養相關職類」，這個共用科目佔 20%。',
    '共用部分的參考資料（代號 90006 至 90012）可以在技檢中心的測試參考資料頁面下載。',
  ],
  practical: [
    '以實作為原則，成績用百分法（60 分及格）或及格、不及格評定。',
    '日期不限假日，由術科辦理單位排定，在測試前 14 天以掛號通知。',
    '具體題目、材料與評分表在技檢中心的「測試參考資料」，本頁沒有讀到原文，請以官方檔案為準。',
  ],
  rules: [
    '學科、術科要在報名時一起報；不論學科有沒有通過，都可以參加術科。',
    '兩科都及格才算檢定合格。',
    '術科及格的成績自下年度起保留三年；學科成績自 104 年起不再保留。',
  ],
};

// 報名步驟
export const steps = [
  ['看簡章', '確認這一年飲料調製排在哪一梯次、費用多少、自己符合哪一項報檢資格。'],
  ['準備文件', '資格證明（學歷、丙級證、訓練或工作證明）。112 至 115 年曾報過資格未修改的同職類級別，可免附資格文件，但要附其中一年的學科或術科成績單影本。'],
  ['報名與繳費', '網路報名在報名第一天上午 9 時開放、最後一天下午 5 時關閉，送出後依系統指定方式在期限內繳費。也可以在全家便利商店買紙本報名表通信報名；申請特定對象補助一律紙本報名。'],
  ['注意不能反悔', '完成報名手續後，不得撤回、退費或改職類、級別、梯次與考區。'],
  ['收准考證與術科通知', '學科准考證依日程表寄出；術科由辦理單位在測試前 14 天掛號通知。'],
  ['合格發證', '兩科都及格，繳證照費 160 元後由技檢中心核發技術士證。'],
];

// 國際認證（細節在第 11 篇）
export const intl = [
  ['SCA 咖啡技能課程', '精品咖啡協會的模組化課程，可累積點數取得文憑。'],
  ['Q Grader', '生豆與杯測品質評鑑師執照，2025 年起由 SCA 發照。'],
];

// 世界咖啡錦標賽七項（SCA 官網說有七項；中文名沿用第 11 篇）
export const world = [
  { zh: '世界咖啡大師比賽', en: 'World Barista Championship', next: '2026：10 月 22 日至 25 日，巴拿馬（第 26 屆）。2027：4 月 28 日至 5 月 1 日，東京（第 27 屆）', src: ['scaEvents', 'scaTokyo'] },
  { zh: '世界手沖咖啡大賽', en: 'World Brewers Cup', next: '2027：9 月 30 日至 10 月 2 日，哥倫比亞波哥大', src: ['scaBogota'] },
  { zh: '世界杯測大賽', en: 'World Cup Tasters Championship', next: '2027：9 月 30 日至 10 月 2 日，波哥大', src: ['scaBogota'] },
  { zh: '世界拉花大賽', en: 'World Latte Art Championship', next: '下一屆地點與日期本頁未查到，請看 wcc.coffee', src: ['wcc'] },
  { zh: '世界咖啡烘焙大賽', en: 'World Coffee Roasting Championship', next: '下一屆地點與日期本頁未查到，請看 wcc.coffee', src: ['wcc'] },
  { zh: '咖啡調酒大賽', en: 'World Coffee in Good Spirits Championship', next: '下一屆地點與日期本頁未查到，請看 wcc.coffee', src: ['wcc'] },
  { zh: '土耳其壺大賽', en: 'Cezve/Ibrik Championship', next: '下一屆地點與日期本頁未查到，請看 wcc.coffee', src: ['wcc'] },
];

// SCA 新聞稿（2022）列出的台灣世界冠軍
export const twChampions = [
  ['Berg Wu（吳則霖）', '2016 世界咖啡大師比賽'],
  ['Chad Wang', '2017 世界手沖咖啡大賽'],
  ['Pang-Yu Liu', '2014 世界杯測大賽'],
  ['Jacky Lai', '2014 世界咖啡烘焙大賽'],
];

// 半年準備路線（以考丙級為主線，比賽為支線）
export const route = [
  { m: 1, title: '定目標、讀簡章', items: ['確認要考丙級還是乙級，對照報檢資格。', '下載技能檢定規範與測試參考資料，看術科要做哪些飲品、用哪些器具。', '每天練基本功：濃縮、奶泡、手沖各一次並記錄（第 05、06 篇）。'] },
  { m: 2, title: '術科逐題練', items: ['照參考資料把每一題做一遍，先求正確，再求時間。', '練水果刀工、擺飾與壓汁，丙級不只考咖啡。', '學科每天固定一小段，先從佔 20% 的食品安全衛生共用科目開始。'] },
  { m: 3, title: '準備報名', items: ['盯緊報名期間：115 年度第二梯次只開 12 天（4/24 至 5/5）。', '備齊資格文件，決定網路或紙本報名；要申請補助就走紙本。', '學科題庫全部讀過一輪。'] },
  { m: 4, title: '報名、計時模擬', items: ['在報名期間內完成送出與繳費。', '每週做兩次完整計時的術科模擬，錄影檢查衛生動作與流程。', '學科錯題整理成自己的清單。'] },
  { m: 5, title: '衝刺', items: ['留意術科掛號通知（測試前 14 天寄出）與學科准考證。', '學科做整份模擬，穩定在 60 分以上再加強弱項。', '找朋友當客人，練習在壓力下出杯。'] },
  { m: 6, title: '應試，接著看比賽', items: ['115 年度丙級學科在 7 月 5 日上午，術科日期依辦理單位通知。', '考完去觀賽：看世界賽轉播與國內選拔，挑一項想參加的比賽讀它的規則。', '下一步：乙級、SCA 課程，或報名國內選拔賽。'] },
];

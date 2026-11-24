# verify-a 查證紀錄（lessons 01、04、06）

## 存取狀況
- WebFetch 對所有允許網域都回「host not found」；改用 curl。
- sca.coffee 的 HTML 頁可讀；所有 SCA PDF（SCA-102/103/104、CVA 表格、Coffee-Standards）會轉址到 static1.squarespace.com，被 proxy 擋（403）。
- worldcoffeeresearch.org 主網域可讀；varieties.worldcoffeeresearch.org（品種目錄）被擋。WCR 品種相關內容只有搜尋摘要。
- pmc.ncbi.nlm.nih.gov：讀了 PMC10074501、PMC13281520、PMC13227252 三篇，之後出現 reCAPTCHA 檢查頁，就沒再讀 PMC。
- ico.org、fao.org、smithsonianmag.com 被擋。
- WebSearch 用了 24 次。

## 讀過原文（curl）
- https://sca.coffee/value-assessment ：CVA 四種評估；物理評估以 2004 年 SCA 生豆分級系統為基礎 → 01 瑕疵分級那一條
- https://sca.coffee/research/coffee-standards ：SCA-102「Sample Preparation and Tasting Mechanics」到 SCA-105；SCA-110 生豆分級標準制定中 → 01、04
- https://sca.coffee/what-is-specialty-coffee ：精品咖啡的定義（具有獨特屬性、在市場上有顯著額外價值），不綁定單一分數 → 04
- https://sca.coffee/sca-news/25/issue-18/how-do-cuppers-cup-... ：舊杯測表把描述型與情感型測試混在一起，感官科學建議避免 → 04
- https://sca.coffee/sca-news/2025/4/22/...historic-partnership... ：2025 年 10 月 1 日起由 SCA 以 CVA 營運 Q Grader，CQI 不再參與；CVA 於 2023 年推出 → 04
- https://sca.coffee/sca-news/2025/10/1/q-grader-courses-now-available... ：新課程涵蓋物理、描述、情感、外在四種評估（只作佐證，未寫入）
- https://worldcoffeeresearch.org/news/2020/study-all-arabica-derived-from-a-single-ancestral-plant ：canephora × eugenioides 單次雜交、源自 1 萬到 2 萬年前的同一株植物、遺傳多樣性比其他主要作物都低、1997 年起推出 F1 雜交種 → 01 新段落
- PMC10074501（Acids in brewed coffees, 2023）：檸檬酸、蘋果酸、綠原酸隨烘焙減少；醋酸、乳酸、奎寧酸、磷酸、甘醇酸增加；沒測到可量化的酒石酸；除檸檬酸外的感知門檻；專家認不出添加的酸；肯亞的酸沒有比較高；熟豆的糖被認為太少，無法單獨帶來甜味；Alstrup 2020 發現甜感改變但糖不變 → 04
- PMC13281520（Melanoidins & caffeine bitterness, JAFC 2026, TUM）：咖啡因占苦味最多 10 至 30%（Chen）；CQA 轉成內酯（quinides）、苯基茚滿；類黑素讓咖啡因苦味減半；低因咖啡加入 7.5 mmol/L 咖啡因後苦味無顯著差異 → 04
- PMC13227252（香氣誘發甜感增強的綜論, 2025）→ 04

## 只看搜尋摘要
- 2004 年 SCA 協議：Agtron 63（研磨後）／58（整豆）±1、烘焙 8 至 12 分鐘、杯測前 8 至 24 小時內烘焙。71°C、8 至 10 分鐘、21°C 結束評估：沒找到來源，仍未查證（文中未改）。
- 精品級 350 g、零個一級瑕疵、二級瑕疵不超過 5 個；水活性 < 0.70：SCA 標準摘要
- WCR 的 Pacamara（Pacas × Maragogipe、ISIC、易染葉鏽病）、Pacas（1949 年、波旁突變）、Maragogipe（1870 年、鐵比卡突變）、Caturra（IAC 1937）、Bourbon（1700 年代初到波旁島，約 1860 年傳入巴西）、Centroamericano（T5296 × Rume Sudan）
- 44 條染色體、自花授粉：Scientific Reports 2020（摘要）
- 水洗發酵 12 至 72 小時（常見 12 至 48、18 至 36 小時）；日曬乾燥最多 3 至 4 週：IFT、Barista Magazine
- Screen 號數 = 1/64 英吋：Royal Coffee 等
- 衣索比亞分級 1 到 5 或 1 到 9，說法互相矛盾：Cafe Imports 等
- Mountain Water 由 Descamex（墨西哥）處理；EA 由 Descafecol（哥倫比亞）處理：InterAmerican Coffee、Purity Coffee、PDG
- 可塔朵約 4 oz、西班牙份量較小：Barista Magazine、Wikipedia
- β-乳球蛋白在 70°C 以下沒有明顯變化，80°C 以上大量變性：NYCU 摘要；約 70°C 起出現含硫的煮熟味：論文摘要
- Kapuziner 首見於十八世紀維也納：Britannica
- 早期蒸氣機約 1.5 bar：多份來源一致（Smithsonian 等），但都是摘要，保留原有的保留語氣

## 想寫但沒寫
- INEI 的 espresso 參數（7 g、88°C、9 bar、25 秒、25 ml）：只有部落格與論壇來源，數字互相衝突，官方網站已移除這些數字 → 沒寫；改為加一句「不是國際統一的標準」
- 74110／74112 在 1974 年由 JARC 選育：只有供應商資料
- 阿拉比卡種植海拔 1,000 至 2,200 m：沒找到來源
- 牛奶約 60°C 最甜：沒有對照研究；改寫成明確標示是經驗值
- Laurina 咖啡因、肯亞雙重發酵、熱衝擊、科契爾譯名、ICO 57/43：沒有再查證

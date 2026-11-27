# r4-cva 查證紀錄（杯測工具 src/pages/tools/cupping.astro，issue #25）

存取：用 curl 下載 sca.coffee 的 /s/ PDF，以 pdftotext 抽文字；公式與量表是圖片，改用 pdftoppm 轉成圖檔直接看。讀到的文件：

- SCA-104-2024 Affective Assessment：https://sca.coffee/s/AW_SCA-104_Affective-Assessment_Sept2024_Secured.pdf
- SCA-103-2024 Descriptive Assessment：https://sca.coffee/s/AW_SCA-103_Descriptive-Assessment_Sept2024_Secured.pdf
- SCA-102-2024 Sample Preparation and Tasting Mechanics：https://sca.coffee/s/AW_SCA-102_Sample-Preparation_281024_Secured.pdf
- CVA 表格合集：https://sca.coffee/s/CVA-Cupping-Forms-EN.pdf（情感表註記「SCA Version 2 (June 2024)」；物理評估表 Alpha V1.1 May 2025；外在評估表 Version 2 October 2025）

## 1. 情感評估分數公式（SCA-104 第 5.5 節）
- 原文（圖片）：S = 0.65625 Σ(i=1..8) h_i + 52.75 − 2u − 4d，「rounded to the nearest 0.25 points」；S 是取整前的分數，h_i 是各項 9 點分數（i = 1 乾香到 i = 8 整體），u 不一致杯數，d 瑕疵杯數 → **證實**（與 issue 中的寫法相同）
- 附錄 7.1 兩欄對照表（ΣH 8 至 72）：65 列全部用公式重算比對。只有 ΣH = 12、28、44、60 四列公式值剛好落在兩個 0.25 中間（例如 60.625），表上一律進位（60.75）→ 工具用 `Math.round(S × 4) / 4`（正數時中間值進位），與整張表一致
- 定義（4.2 Cupping score）：八項都 9 分時為 100、都 5 分時為 79（假設沒有不一致與瑕疵杯）→ 證實，公式驗算 0.65625 × 72 + 52.75 = 100、× 40 + 52.75 = 79
- 對照表說明：「每一杯不一致扣 2 分、每一杯瑕疵扣 4 分」→ 證實

## 2. 八個項目與九點量表（SCA-104 第 4.3、5.1、5.2 節與 7.2 表單）
- 項目與順序：Fragrance、Aroma、Flavor、Aftertaste、Acidity、Sweetness、Mouthfeel、Overall → 證實（工具譯為乾香、濕香、風味、餘韻、酸質、甜感、口感、整體）
- 九點量表衡量「品質印象」（impression of quality）：1 Extremely low、2 Very low、3 Moderately low、4 Slightly low、5 Neither high nor low、6 Slightly high、7 Moderately high、8 Very high、9 Extremely high → 證實（圖 1）
- 可以反映自己的偏好，或「一個已知的市場偏好」；不應受同組杯測者影響 → 證實
- 降溫後印象改變可再填一格並畫箭頭，最後的評分寫在 FINAL 欄 → 證實（工具簡化為「以最後選的為準」）
- 情感筆記用來說明打分理由，不重複描述評估的內容 → 證實（5.3）
- 表單上是整數圈選 1 至 9，沒有半分 → 依 7.2 表單圖面，工具只提供整數

## 3. 不一致與瑕疵杯（SCA-104 第 5.4 節）
- 感官瑕疵實務上限於 potato、moldy、phenolic（酚類表現範圍很廣）→ 證實
- 需同時勾「哪幾杯」與「瑕疵種類」，兩者缺一就不算瑕疵 → 證實；工具在沒選種類時 d = 0 並顯示提醒
- 不一致只計「性質上」的差異，只是強度高低不同不扣分（避免沖煮誤差影響）→ 證實
- 瑕疵杯也要標為不一致，只有五杯都同樣有瑕疵時例外 → 證實；工具顯示提醒，不自動勾選
- 每支樣品 5 杯 → 證實（表單 5 格；SCA-102 情感評估 5 杯）

## 4. 描述評估（SCA-103）
- 結合各項「整體強度」評分與 CATA 勾選；不是評個別風味的強度，而是整個項目的總強度 → 證實
- 強度量表是 15 點量表，圖面刻度標 0、5、10、15，分 LOW／MEDIUM／HIGH；可以畫在整數之間，但紀錄取最接近的整數 → 證實（第 6.2 節與圖 1）
- 乾香與濕香共用一張 CATA 表，最多選 5 個；風味／餘韻的鼻後 CATA 表同樣最多 5 個，主要味道最多 2 個；口感 CATA 最多 2 個 → 證實
- 香氣 CATA 主類別：Floral、Fruity（Berry、Dried Fruit、Citrus Fruit）、Sour/Fermented（Sour、Fermented）、Green/Vegetative、Other（Chemical、Musty/Earthy、Woody）、Roasted（Cereal、Burnt、Tobacco）、Nutty/Cocoa（Nutty、Cocoa）、Spice、Sweet（Vanilla/Vanillin、Brown Sugar）→ 證實（圖 2）。工具只列 9 個主類別，最多選 5 個，並註明是簡化
- 描述評估不打分 → 證實

## 5. 流程參數（SCA-102，第 04 篇已整理，這次再讀原文）
- 8.25 g／150 mL 杯容量、±0.2 g；70–75% 通過 US 20 號篩（850 µm）；93 ± 3°C 注滿；粉層靜置 3–5 分後攪約三次破渣；全部破渣後用一或兩支湯匙撈渣；降到約 70°C 開始啜吸；至少三輪，評到低於體溫 → 全部證實
- 「注水後約 8 至 10 分開始啜吸」：SCA-102 沒有這個數字，沿用第 04 篇的「實務估計」說法；工具 8:00 的提示寫成「量一下溫度」
- 工具預設破渣 4 分（3–5 分的中間值），可自行修改

## 6. 版本與年份
- SCA-102/103/104 皆為 2024 年標準，SCA-104 與 SCA-103 明文取代 SCA Cupping Protocol (2004) → 證實
- CVA 在 2023 年推出：沿用 r3-sca 讀過的 SCA 新聞稿（2025-04-22 SCA 與 CQI 合作公告）；這次讀 https://sca.coffee/value-assessment 沒有找到年份文字 → 本輪未再證實
- CVA 文件沒有 80／85／90 分級 → 這次重讀 SCA-104 也沒有，工具在 CVA 模式不顯示等級

## 未證實／未處理
- 2023 推出的年份這次沒有重新讀到原文（見上）
- 舊版 100 分制的 2004 協議原文仍讀不到（舊網址 404），傳統模式維持原本內容，沒有改動
- SCA 線上計分器 sca.coffee/cuppingscore（表單上寫的網址）未開啟比對

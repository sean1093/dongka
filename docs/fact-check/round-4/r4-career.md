# r4-career 查證紀錄（/career/ 台灣咖啡證照與比賽一頁通，issue #24）

查證日期：2026-11-27。原文以 curl 下載後讀取（PDF 用 pdftotext），暫存於 scratchpad/cert/。沒有使用搜尋摘要。

頁面資料集中在 `src/data/career.js`，每一項時效性資料標「查核日 2026-11」並連到下表的官方來源。

## 讀得到的來源

| 代號 | 來源 | 網址 | 讀了什麼 |
| --- | --- | --- | --- |
| brochure | 115 年度全國技術士技能檢定簡章（115.08 版 PDF，檔名 115Skill_reg_20260801.pdf） | https://skill.tcte.edu.tw/download.php | 報檢人重點摘要、玖「報名費用說明」、壹拾「各梯次辦理職類與收費標準」（p.24、p.39）、壹拾參「報檢資格」（p.33、p.38–40）、捌「測試當天時間說明」、特定對象補助、壹拾柒「合格發證」 |
| schedule | 115 年度重要日程表 | https://skill.tcte.edu.tw/notice.php | 三個梯次的發售、報名、准考證、學科測試、成績公告日期；最新公告列表（115 年度簡章 2025-12-15 公告；未見 116 年度簡章） |
| regStep | 報名程序說明 | https://skill.tcte.edu.tw/reg_step.php | 網路報名時間、紙本通信報名、全家購買報名表 |
| wdasec | 技能檢定中心 | https://www.wdasec.gov.tw/ | 「技能檢定報檢流程與費用」「檢定試題與參考資料」選單；「技能檢定規範」列表中有「20600飲料調製規範.pdf」，但檔案在 ws.wda.gov.tw，被網路政策擋下 |
| rules | 技術士技能檢定作業及試場規則（112.11.02 修正） | https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0080014 | 第 19 條全文 |
| law | 技術士技能檢定及發證辦法（112.11.02 修正） | https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=N0080004 | 第 5、6、10 條 |
| mol | 勞委會澄清稿 | https://www.mol.gov.tw/1607/1632/1640/17666/post | 丙級、乙級技能範圍（第三輪已讀，本輪重讀確認） |
| scaEvents | SCA Events | https://sca.coffee/events | 「seven World Coffee Championships」；比賽項目 barista、brewing、roasting、latte art、coffee tasting、coffee in spirits；「World Barista Championship 2026, THURS OCT 22 – SUN OCT 25 (EST)… The 26th World Barista Championship returns to Latin America」（Panama） |
| scaTaipei | SCA 新聞 2022-07-12 | https://sca.coffee/sca-news/2022/7/12/announcing-the-2023-taipei-world-coffee-championships-wh4zy | WCC 由 SCA 子公司 World Coffee Events 製作；2023 台北：WLAC、WCIGS、WCRC，2023-11-17 至 20，南港展覽館，台灣國際咖啡展；與 Taiwan Coffee Association 合作；台灣 16 位世界賽決賽選手；四位冠軍；同年雅典辦 WBC、WBrC、WCTC、Cezve/Ibrik（合計七項） |
| scaRules2023 | SCA 新聞（2023 台北規則） | https://sca.coffee/sca-news/announcing-the-2023-taipei-wcc-rules-regulations-5crbb | 「over 60 licensed Competition Bodies around the world」使用同一套規則 |
| scaTokyo | SCA 新聞 2025-09-25 | https://sca.coffee/sca-news/2025/9/25/announcing-world-of-coffee-tokyo-2027-and-the-2027-world-barista-championship-tokyo-dn5nc | 第 27 屆 WBC：2027-04-28 至 05-01，東京 Big Sight |
| scaBogota | SCA 新聞 2025-10-17 | https://sca.coffee/sca-news/2025/10/17/world-cup-tasters-championships-bogota-2027 | 2027 WCTC 與 World Brewers Cup：2027-09-30 至 10-02，波哥大；「Competition Body champions from around the world will travel to Bogotá to represent their communities」 |

## 逐項查核

| # | 頁面說法 | 依據 | 結果 |
| --- | --- | --- | --- |
| 1 | 技能檢定分甲、乙、丙三級 | law 第 5 條 | 證實 |
| 2 | 丙級：年滿 15 歲或國中畢業 | law 第 6 條；brochure p.33「一般職類 報檢人年滿 15 歲或國民中學畢業」；飲料調製不在丙級特殊規定職類 | 證實 |
| 3 | 乙級 12 種資格之一；大專校院以上畢業（不限科系）可直接報乙級；持相關丙級證＋高中職畢業；從事相關工作 6 年以上 | brochure p.38 一般職類第 2、11、12 點，「上述報檢資格涉及學歷部分無科系限制」；p.39 飲料調製乙級的相關丙級職類為「15000 調酒；20600 飲料調製」 | 證實 |
| 4 | 丙級範圍：無酒精飲料（咖啡、茶飲、奶類）、水果刀工、擺飾、壓汁；乙級：調酒、其他飲品、成本計算 | mol | 證實（勞委會說明，非技能檢定規範原文） |
| 5 | 115 年度丙級只在第二梯次、乙級只在第三梯次 | brochure 收費表：序號 42「20600 飲料調製 丙」在第二梯次表；序號 76「20600 飲料調製 乙」在第三梯次表；全文只有這兩列 | 證實。即測即評是否有飲料調製未查 |
| 6 | 第二梯次：發售 115/04/17–05/05、報名 04/24–05/05（網路 9:00 起至 17:00 止）、准考證 06/16、學科 07/05、成績 07/31 | schedule | 證實 |
| 7 | 第三梯次：發售 08/20–09/07、報名 08/27–09/07、准考證 10/20、學科 11/08、成績 12/04 | schedule | 證實 |
| 8 | 丙級學科上午 10:00–11:40；乙級（除 3 個資訊職類）下午 2:00–3:40 | brochure 捌「測試當天時間說明」及重點摘要第 9 點 | 證實 |
| 9 | 術科日期不限假日，由術科辦理單位於測試前 14 天掛號通知 | brochure 捌 | 證實 |
| 10 | 丙級一般報檢人 2,240、免試學科 2,050、免試術科 340 元；乙級 3,075、2,885、340 元 | brochure p.24、p.39 | 證實（115 年度） |
| 11 | 費用＝審查費 150＋學科 190＋術科；術科＝一般報檢人金額減 340（丙級 1,900、乙級 2,735，為計算值）；及格後證照費 160 元 | brochure 玖、特定對象補助（十）、壹拾柒 | 證實 |
| 12 | 學科：測驗題，百分法 60 分及格；術科以實作為原則，百分法 60 分或及格／不及格 | rules 第 19 條 | 證實 |
| 13 | 學科含共用工作項目 4 項各 5%；食品安全衛生及營養相關職類共用科目 20%（適用飲料調製）；參考資料代號 90006–90012 | brochure 重點摘要第 22、23 點 | 證實 |
| 14 | 學、術科要同時報名；不論學科是否通過都可參加術科；兩科都及格為合格 | brochure 重點摘要第 11 點；law 第 10 條 | 證實 |
| 15 | 術科及格成績自下年度起保留三年；學科成績自 104 年起不再保留 | law 第 10 條；brochure 重點摘要第 16 點 | 證實 |
| 16 | 完成報名後不得撤回、退費或改職類級別梯次考區 | brochure 重點摘要第 7 點 | 證實 |
| 17 | 112–115 年報過資格未修改的同職類級別免附資格文件，但須附成績單影本 | brochure 重點摘要第 17 點 | 證實 |
| 18 | 特定對象（中高齡失業者、長期失業者、二度就業婦女等）可申請補助；申請補助一律紙本報名 | brochure 重點摘要 1(2)、(十二)、特定對象補助（十） | 證實 |
| 19 | 全家便利商店購買紙本報名表 | regStep 二 | 證實 |
| 20 | 115 年度簡章於 114 年 12 月 15 日公告；查核日尚無 116 年度簡章 | schedule 最新公告列表 | 證實（截至 2026-11-27） |
| 21 | 世界咖啡錦標賽共七項，由 World Coffee Events（SCA 子公司）製作 | scaEvents、scaTaipei | 證實。七項名稱由 scaTaipei 2023 年的兩地分配合計得出 |
| 22 | 各國由取得授權的 Competition Body 辦選拔，全球 60 多個，冠軍代表參加世界賽 | scaRules2023、scaBogota | 證實 |
| 23 | 2026 WBC 巴拿馬 10/22–25（第 26 屆） | scaEvents | 證實 |
| 24 | 2027 WBC 東京 4/28–5/1（第 27 屆）；2027 WBrC、WCTC 波哥大 9/30–10/2 | scaTokyo、scaBogota | 證實 |
| 25 | 2023 台北世界賽（拉花、咖啡調酒、烘焙）11/17–20，南港展覽館，台灣國際咖啡展；SCA 與 Taiwan Coffee Association 合作 | scaTaipei | 證實 |
| 26 | 台灣世界冠軍：Berg Wu 2016 WBC、Chad Wang 2017 WBrC、Pang-Yu Liu 2014 WCTC、Jacky Lai 2014 WCRC；當時 16 位決賽選手 | scaTaipei | 證實（2022 年資料；之後的成績未查） |

## 未能確認（頁面已註明「請以主辦單位公告為準」或「本頁沒有讀到原文」）

1. **飲料調製技能檢定規範與術科試題、學科題庫**：wdasec 列表有連結，但檔案在 ws.wda.gov.tw，owinform.wdasec.gov.tw（測試參考資料、歷屆試題）也被擋。頁面只寫勞委會的範圍說明，沒有列術科題目、時間或評分。
2. **台灣的世界賽授權單位（Competition Body）名稱與國內選拔賽**：worldcoffeeevents.org 轉址到 wcc.coffee，被網路政策擋下。SCA 新聞只說與 Taiwan Coffee Association 合作辦 2023 台北世界賽，沒有明說它是台灣的授權單位，頁面也沒有這樣寫。中文名稱未查。選拔賽日期、報名費、名額全部未查。
3. **拉花、烘焙、咖啡調酒、土耳其壺的下一屆地點與日期**：未查到，頁面寫「本頁未查到，請看 wcc.coffee」。
4. **合格率**：沒有查，頁面沒有寫。
5. **116 年度（2027）梯次安排與費用**：查核日尚未公告。頁面的半年路線以 115 年度為例，並說明公告後要挪月份。
6. **即測即評是否開辦飲料調製**：未查。
7. 2026 世界咖啡大師冠軍 Pan Wei 的國籍：新聞稿正文讀不到，頁面未提。

## 每年要重查的項目

schedule、fees、levels[].batch2026、yearly、world[].next（`src/data/career.js`），以及 `checked`。新簡章通常在前一年 12 月中公告。

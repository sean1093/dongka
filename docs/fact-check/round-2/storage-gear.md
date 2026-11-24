# storage-gear 查證紀錄（lesson 03 第 8 節、lesson 05 第 2、3 節）

搜尋次數：29 次。WebFetch 對所有網站都 ENOTFOUND（含 brief 列為可開的 sca.coffee、pmc、law.moj.gov.tw）；改用 curl 經代理成功讀到 sca.coffee、law.moj.gov.tw、www.fda.gov.tw 的原文。pmc.ncbi.nlm.nih.gov、hario.co.uk、hario-europe.com、dpma.de、water.gov.tw、water.gov.taipei、data.gov.tw、digitalcollection.zhaw.ch 無法連線（water 兩站代理回 403），只能看搜尋摘要。

## Lesson 03 新增

| 事實 | 來源 | 讀過原文／摘要 |
| --- | --- | --- |
| 咖啡為常溫穩定食品，不因微生物腐壞；走味定義 | https://sca.coffee/sca-news/2012/02/15/what-is-the-shelf-life-of-roasted-coffee-a-literature-review-on-coffee-staling-bjcx7 | 原文 |
| 氧氣最主要；氧氣降到 0.5% 保存期限約延長 20 倍（Labuza 2001） | 同上；25 Magazine 同數字 | 原文 |
| Q10 1.5（整豆排氣）；咖啡粉 Q10 約為整豆兩倍 | SCA 文獻回顧 | 原文 |
| 每升高 10°C 排氣約加倍 | https://sca.coffee/sca-news/25-magazine/issue-4/preserving-freshness-race-time-25-magazine-issue-4-2spkp | 原文（與 1.5 倍矛盾，正文寫 1.5 到 2 倍） |
| 濕度高吸水、加速香氣流失 | SCA 文獻回顧 | 原文 |
| CO2 阻擋氧氣、散失後空氣進入；整豆前 20 天排氣最快；整豆約三週、粉約一小時 | https://sca.coffee/sca-news/coffee-decoded-9-fresh-coffee | 原文 |
| 淺焙排氣較慢；閥袋內 CO2 約 80%；35°C vs −25°C 冷凍減緩排氣 | 25 Magazine | 原文 |
| 香氣流失頭幾天最劇烈（Nicoli 1993）；第一個月新鮮度下降最快（Sanz 2001） | SCA 文獻回顧 | 原文 |
| 冷藏冷凍研究未量測冷凍本身與溫度波動 | SCA 文獻回顧 | 原文 |
| 賓州州立大學 2018：−20°C vs 25°C、9 週、48 人、深焙差異、淺焙差異小、一批豆、只評香氣；研究者稱文獻中無冷凝問題證據 | https://www.psu.edu/news/research/story/wake-and-smell-coffee-research-shows-freezing-beans-can-preserve-aroma ；https://mdpi.com/2306-5710/4/3/68 | 摘要 |
| 充氮 6 個月 vs 未充氮 3 個月（Alves 2001）；真空包裝走味速度約空氣包裝五分之一（Nicoli 1993）；包裝比較研究很少；開封後「second shelf life」 | SCA 文獻回顧 | 原文 |
| ZHAW 重量法排氣研究 | https://digitalcollection.zhaw.ch/handle/11475/12175 | 摘要 |
| 食安法第 22 條第 1 項第 7 款有效日期 | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=22 | 原文 |
| 施行細則第 13 條：年月日；三個月以上可只標年月、當月末日 | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040003&flno=13 | 原文 |
| 第 15 條第 1 項第 8 款逾有效日期不得販賣 | https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=L0040001&flno=15 | 原文 |

沒寫的：光線對走味的量化影響（SCA 文獻回顧未提，只寫「常見建議」）；冰箱異味吸附的研究數據（只有商家文章）；2022 Smrke 開封後保存方式比較的排名（只有部落格轉述）；Agtron 例子屬哪種量表（HunterLab 摘要說 SCAA 色卡 8 片 #95 至 #25，但沒確認是 Gourmet 量表，未改正文）。

## Lesson 05 新增

| 事實 | 來源 | 讀過原文／摘要 |
| --- | --- | --- |
| 低豆溫研磨粒徑分布較窄；分布呈雙峰（細粉加主要顆粒）；豆子在液態氮、乾冰、冷凍庫、室溫各平衡 2 小時後研磨，0°C 以下的樣本未見冷凝水；研究量測的是粒徑，不是保存風味 | https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4834475/ | 讀過原文（PMC 網頁有 reCAPTCHA，改用 curl 抓 PMC OAI API 全文：https://pmc.ncbi.nlm.nih.gov/api/oai/v1/mh/?verb=GetRecord&identifier=oai:pubmedcentral.nih.gov:4834475&metadataPrefix=pmc） |
| Matter 2020：研磨過細時水流不均、萃取率下降、變異增加，歸因於細顆粒阻塞 | https://www.pnnl.gov/publications/systematically-improving-espresso-insights-mathematical-modeling-and-experiment | 摘要 |
| 刀片式研磨時間改變粒徑分布與咖啡成分；刀片式分布寬、刀盤式一致性較高 | Murray & Laredo 2014，researchgate PDF | 摘要 |
| 錐刀與平刀：沒有找到同儕審查研究，只寫「常見的說法」 | Clive Coffee、Mahlkönig、Home-Barista（只當線索，不列參考） | 摘要 |
| 手搖與電動：無來源，標明為使用經驗 | 無 | — |
| 大臺北長興、公館、直潭 97.5% 出水量、總硬度 <50 mg/L；陽明山第三湧泉約 150；高地其他 <100 | 臺北自來水事業處常見問答（https://www.water.gov.taipei/News_Content.aspx?n=20FD034365D9809C&sms=87415A8B9CE81B16&s=BAA972EAAA70789C 與常見問答列表頁） | 摘要（頁面無年份，寫「2026 年查閱」） |
| 板新淨水場 73.2 mg/L（2026/09/10）、鳳山淨水場 139 mg/L（2026/10/12）、上限 300 | water.gov.tw 平均水質頁 | 摘要；注意：搜尋結果沒有標明哪個 Detail 編號對應哪個淨水場，參考資料用的 Detail/2047 是其中一頁，請作者確認 |
| 台水硬度分級 0–75 軟水、75–150 中等、150–300 硬水、>300 極硬 | https://www.water.gov.tw/dist12/Contents?nodeId=7568 | 摘要 |
| 活性碳去除餘氯與有機物；軟化濾水器增加鈉；處理後的水不宜久放；碳酸氫鈣煮沸成碳酸鈣水垢 | 臺北自來水事業處常見問答 | 摘要 |
| 掀蓋煮沸數分鐘或活性碳可去除餘氯氣味 | https://www.water.gov.tw/ch/Subject/Detail/3816?nodeId=4889 | 摘要 |
| RO 水：礦物質主要來自食物，均衡飲食不會缺乏 | https://www.fda.gov.tw/tc/newsContent.aspx?cid=5049&id=13755 | 原文（2015-06-25 發布、2022-11-29 維護） |

沒寫的：美濃（250）、台東利嘉（221）、關山（188）等數字（無法確認對應網址與年份）；彰化地下水區數字；活性碳不改變硬度（只有專利文件支持）。

## 修改既有內容

- 05 第 2 節水質段：「實務上，台灣自來水多半經過濾水器處理後就能用。」→「實務上，台灣不少地區的自來水經過濾水器去除氯味後就能用，但各地硬度差異很大，見下一段。」（依據：各地總硬度從 <50 到 >150 mg/L）
- 05 第 3 節基本工具：「刀盤分錐刀與平刀，各有風格：平刀通常粒徑分布較集中，風味清晰；錐刀常帶來較厚實的口感。」→「刀盤分錐刀與平刀，常見的說法是平刀粒徑分布較集中、風味清晰，錐刀口感較厚實，下一段說明這些說法有多少根據。」（依據：沒有同儕審查研究）

## fact-check 待確認事項

03：
1. 養豆天數／總烘焙時間／150°C：未找到權威來源。相關佐證：ZHAW 測得整豆前 20 天排氣最快、淺焙排氣較慢、最快在烘焙後 24–48 小時（SCA 原文），與「淺焙需要較久養豆」方向一致，但無法支持具體天數。未改。
2. French 重複：未查到權威來源，未改。
3. Agtron 量表：HunterLab（廠商）摘要稱 SCAA 色卡 8 片 #95 至 #25，無法確認對應 Gourmet 量表，未改。

05：
1. 4:6 時間點：Hario UK 大使訪談頁（搜尋摘要，無法開啟）顯示第 4 注 2:10、第 5 注 2:40、各 60 mL、3:30 移開，20g／300mL／92°C／粗研磨。課文寫 2:15、2:45，與此不符；第 1–3 注的時間沒查到。未改課文。
2. Melitta mermaid 節點：DPMA 描述 1908 實用新型為「底部拱起、內凹底面、斜向出水孔」；Melitta 官方只說在黃銅杯上打孔。「多孔」有依據，「平底」沒有依據。錐形濾紙依 Wikipedia 為 1936 或 1937 年（摘要）。未改 mermaid。

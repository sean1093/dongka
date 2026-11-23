// 只有內容夠獨立的產區才有自己的頁面：要有風味資料，且有著名產區或常見處理法可以說
export const hasOriginPage = (o) => o.flavors.length > 0 && (o.areas.length > 0 || o.processes.length > 0) && o.notes.length >= 30;

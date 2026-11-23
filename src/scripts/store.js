// 所有狀態都存在 localStorage；讀寫失敗（隱私模式等）時安靜退回預設值。
export function load(key, fallback) {
  try {
    const v = localStorage.getItem(`stc:${key}`);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
export function save(key, value) {
  try {
    localStorage.setItem(`stc:${key}`, JSON.stringify(value));
  } catch {}
}
export const getDone = () => load('done', []);
export function setDone(id, on) {
  const s = new Set(getDone());
  on ? s.add(id) : s.delete(id);
  save('done', [...s].sort());
}
export const fmtTime = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

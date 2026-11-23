// 依 layers（由下往上）畫一杯飲品的分層示意圖
export const COLORS = {
  espresso: '#4a2c1a', coffee: '#6b4226', water: '#cfdfe6', milk: '#f3e6cf', foam: '#fffaf0', cream: '#fff3d6', ice: '#dcecf2',
  chocolate: '#2a1710', tonic: '#e3eef0', juice: '#f0a73c', syrup: '#c9973a', spirit: '#d9b98a', icecream: '#fbf1dc', other: '#b98d5f',
};
export function cup(layers) {
  const total = layers.reduce((s, l) => s + l.amount, 0) || 1;
  const H = Math.min(96, 30 + total * 3);
  let y = 112;
  const rects = layers.map((l) => {
    const h = (l.amount / total) * H;
    y -= h;
    return `<rect x="26" y="${y.toFixed(1)}" width="48" height="${(h + 0.5).toFixed(1)}" fill="${COLORS[l.part] || COLORS.other}"/>`;
  }).join('');
  const top = (112 - H - 8).toFixed(1);
  return `<svg viewBox="0 0 100 124" class="cup" aria-hidden="true">${rects}<path d="M25 ${top} V113 H75 V${top}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}

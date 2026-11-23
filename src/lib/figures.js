// 原創教學插圖（SVG）。顏色用固定色表現咖啡本身，文字與線條跟著主題色。
const wrap = (svg, caption, cls = '') =>
  `<figure class="fig ${cls}">${svg}<figcaption>${caption}</figcaption></figure>`;

const cherry = () => {
  const L = 'M185 85 A62 75 0 0 0 185 235 Z';
  const R = 'M195 85 A62 75 0 0 1 195 235 Z';
  const bean = (d) => `
    <path d="${d}" fill="none" stroke="#f0d37c" stroke-width="36" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#e9dcc0" stroke-width="18" stroke-linejoin="round"/>
    <path d="${d}" fill="none" stroke="#b9b4a8" stroke-width="6" stroke-linejoin="round"/>
    <path d="${d}" fill="#9fae7f"/>`;
  const labels = [
    ['外果皮', '成熟時多為紅色', 286, 80],
    ['果肉', '含糖，曬乾後是卡斯卡拉', 296, 130],
    ['果膠層', '黏滑含糖，蜜處理的「蜜」', 270, 165],
    ['內果皮（羊皮紙）', '包覆種子的硬質薄殼', 256, 196],
    ['銀皮', '烘焙時剝落成皮屑', 240, 216],
    ['種子', '我們喝的「咖啡豆」', 215, 150],
  ];
  const ys = [48, 94, 140, 186, 232, 278];
  return wrap(
    `<svg viewBox="0 0 640 320" role="img" aria-label="咖啡櫻桃剖面圖">
      <path d="M190 40 q10 -26 40 -30" fill="none" stroke="#6b7d4a" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="190" cy="160" rx="128" ry="122" fill="#b3312a"/>
      <ellipse cx="190" cy="160" rx="119" ry="113" fill="#e58f6b"/>
      ${bean(L)}${bean(R)}
      <path d="M150 105 q-22 55 0 110" fill="none" stroke="#7f8d62" stroke-width="3" stroke-linecap="round"/>
      <path d="M230 105 q22 55 0 110" fill="none" stroke="#7f8d62" stroke-width="3" stroke-linecap="round"/>
      ${labels.map(([t, d, x, y], i) => `
        <path d="M${x} ${y} L352 ${ys[i] - 5} H366" class="lead"/><circle cx="${x}" cy="${y}" r="3.5" class="dot"/>
        <text x="374" y="${ys[i]}" class="t-b">${t}</text><text x="374" y="${ys[i] + 18}" class="t-s">${d}</text>`).join('')}
    </svg>`,
    '咖啡櫻桃由外到內的六層。處理法的差別，就在於乾燥時留下了哪幾層。'
  );
};

const processing = () => {
  const cols = [
    ['水洗', ['#e9dcc0', '#9fae7f'], '去皮、發酵洗掉果膠，只帶羊皮紙乾燥', '乾淨、明亮、酸質清晰'],
    ['蜜處理', ['#f0d37c', '#e9dcc0', '#9fae7f'], '去皮去果肉，保留果膠層乾燥', '甜感與醇厚提高，仍保有乾淨度'],
    ['日曬', ['#b3312a', '#e58f6b', '#f0d37c', '#e9dcc0', '#9fae7f'], '整顆果實直接乾燥', '濃郁果香、酒香、醇厚'],
  ];
  return wrap(
    `<svg viewBox="0 0 640 250" role="img" aria-label="水洗、蜜處理、日曬三種處理法乾燥時保留的層次">
      ${cols.map(([name, layers, how, taste], i) => {
        const cx = 107 + i * 213;
        const r0 = 26 + layers.length * 9;
        return `<g>
          ${layers.map((c, j) => `<circle cx="${cx}" cy="82" r="${r0 - j * 10}" fill="${c}"/>`).join('')}
          <text x="${cx}" y="168" text-anchor="middle" class="t-b" style="font-size:17px">${name}</text>
          <text x="${cx}" y="192" text-anchor="middle" class="t-s">${how}</text>
          <text x="${cx}" y="218" text-anchor="middle" class="t-a">${taste}</text>
        </g>`;
      }).join('')}
    </svg>`,
    '三種主要處理法：乾燥時留在種子外面的東西越多，果香、甜感與醇厚越強，乾淨度越低。'
  );
};

const roast = () => {
  const names = ['極淺焙', '淺焙', '中焙', '中深焙', '深焙', '極深焙'];
  const cols = ['#c49a5e', '#a97843', '#87552c', '#63391c', '#3f2312', '#22130b'];
  return wrap(
    `<svg viewBox="0 0 640 250" role="img" aria-label="烘焙度光譜">
      <defs><linearGradient id="rg" x1="0" x2="1">${cols.map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join('')}</linearGradient></defs>
      <rect x="30" y="70" width="580" height="34" rx="17" fill="url(#rg)"/>
      ${names.map((n, i) => {
        const x = 78 + i * 97;
        return `<ellipse cx="${x}" cy="36" rx="13" ry="18" fill="${cols[i]}" transform="rotate(20 ${x} 36)"/>
          <path d="M${x - 3} 22 q8 14 -2 28" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2" transform="rotate(20 ${x} 36)"/>
          <text x="${x}" y="128" text-anchor="middle" class="t-b">${n}</text>`;
      }).join('')}
      <path d="M205 62 V112" class="lead" stroke-dasharray="4 3"/><text x="205" y="150" text-anchor="middle" class="t-a">一爆</text>
      <path d="M470 62 V112" class="lead" stroke-dasharray="4 3"/><text x="470" y="150" text-anchor="middle" class="t-a">二爆</text>
      <path d="M40 186 H590" class="arrow"/><path d="M40 186 l10 -5 v10 z" class="arrowhead"/>
      <text x="40" y="176" class="t-s">← 越淺：酸質、花果香、產地特色越明顯</text>
      <path d="M50 226 H600" class="arrow"/><path d="M600 226 l-10 -5 v10 z" class="arrowhead"/>
      <text x="600" y="216" text-anchor="end" class="t-s">越深：苦味、醇厚、烘焙味越重，表面開始出油 →</text>
    </svg>`,
    '烘焙度光譜（示意）。一爆與二爆是判斷下豆時機的兩個路標。'
  );
};

const extraction = () =>
  wrap(
    `<svg viewBox="0 0 640 270" role="img" aria-label="萃取順序示意圖">
      <rect x="40" y="20" width="190" height="190" fill="var(--surface-2)"/>
      <rect x="230" y="20" width="180" height="190" fill="#c9973a" opacity=".28"/>
      <rect x="410" y="20" width="200" height="190" fill="var(--surface-2)"/>
      <text x="135" y="42" text-anchor="middle" class="t-b">萃取不足</text><text x="135" y="60" text-anchor="middle" class="t-s">尖酸、薄、鹹、尾韻短</text>
      <text x="320" y="42" text-anchor="middle" class="t-b">剛好</text><text x="320" y="60" text-anchor="middle" class="t-s">酸甜平衡、尾韻長</text>
      <text x="510" y="42" text-anchor="middle" class="t-b">萃取過度</text><text x="510" y="60" text-anchor="middle" class="t-s">苦、澀、乾、空洞</text>
      <path d="M40 210 C70 60 120 70 170 150 S300 205 610 208" fill="none" stroke="#d9822b" stroke-width="3.5"/>
      <path d="M40 210 C150 205 200 90 290 95 S470 190 610 204" fill="none" stroke="#b8860b" stroke-width="3.5"/>
      <path d="M40 210 C250 208 380 195 470 140 S570 80 610 72" fill="none" stroke="#5b3a29" stroke-width="3.5"/>
      <text x="182" y="104" class="t-b" style="fill:#d9822b">酸、果香</text>
      <text x="262" y="86" class="t-b" style="fill:#b8860b">甜</text>
      <text x="486" y="164" class="t-b" style="fill:#8a5a44">苦、澀</text>
      <path d="M40 210 H610" class="arrow"/><path d="M610 210 l-10 -5 v10 z" class="arrowhead"/>
      <text x="325" y="240" text-anchor="middle" class="t-s">萃取的進行（研磨越細、水越熱、時間越長、擾流越強，走得越遠）→</text>
    </svg>`,
    '萃取順序（示意）：酸最先溶出，甜居中，苦澀最後。沖煮就是決定要在哪裡停下來。'
  );

const drippers = () => {
  const item = (x, name, shape, note1, note2) => `<g transform="translate(${x} 0)">
    ${shape}
    <text x="100" y="178" text-anchor="middle" class="t-b" style="font-size:16px">${name}</text>
    <text x="100" y="200" text-anchor="middle" class="t-s">${note1}</text>
    <text x="100" y="220" text-anchor="middle" class="t-a">${note2}</text></g>`;
  const cup = (path, bed, holes) => `<path d="${path}" class="vessel"/><path d="${bed}" fill="#6b4226"/>${holes}`;
  return wrap(
    `<svg viewBox="0 0 640 235" role="img" aria-label="三種濾杯的剖面比較">
      ${item(7, 'V60（圓錐）', cup('M30 30 L95 140 H105 L170 30', 'M62 84 L95 140 H105 L138 84 Z', '<path d="M100 142 V156" class="drip"/>'), '單一大孔，粉層中心深', '流速由手法控制，明亮但敏感')}
      ${item(220, 'Kalita Wave（平底）', cup('M30 30 L60 140 H140 L170 30', 'M47 92 L60 140 H140 L153 92 Z', '<path d="M78 142 V156 M100 142 V156 M122 142 V156" class="drip"/>'), '平底三孔，粉床厚度均勻', '萃取均勻、容錯高')}
      ${item(433, 'Melitta（梯形）', cup('M30 30 L78 140 H122 L170 30', 'M52 80 L78 140 H122 L148 80 Z', '<path d="M100 142 V156" class="drip" style="stroke-width:2"/>'), '底部小孔，濾杯限制流速', '流速慢、萃取較充分')}
    </svg>`,
    '濾杯的形狀與孔，決定了水怎麼通過粉層。'
  );
};

const drinks = () => {
  // 由下往上：[顏色, 相對高度]，總高約等於容量的比例（示意）
  const E = '#4a2c1a', W = '#b98d5f', M = '#f3e6cf', F = '#fffaf0', C = '#2a1710';
  const list = [
    ['Espresso', '濃縮', [[E, 18]]],
    ['瑪奇朵', '濃縮＋一匙奶泡', [[E, 18], [F, 7]]],
    ['可塔朵', '濃縮：牛奶 1:1', [[E, 30], [M, 30], [F, 3]]],
    ['馥列白', '雙份濃縮、極薄奶泡', [[E, 30], [M, 52], [F, 4]]],
    ['卡布奇諾', '奶泡厚', [[E, 28], [M, 34], [F, 24]]],
    ['拿鐵', '牛奶多、奶泡薄', [[E, 26], [M, 86], [F, 8]]],
    ['美式', '濃縮＋熱水', [[W, 80]]],
    ['摩卡', '加巧克力', [[C, 14], [E, 22], [M, 70], [F, 14]]],
  ];
  return wrap(
    `<svg viewBox="0 0 680 240" role="img" aria-label="經典義式飲品的組成比例">
      ${list.map(([name, sub, layers], i) => {
        const x = 14 + i * 83;
        let y = 160;
        const total = layers.reduce((s, l) => s + l[1], 0);
        const rects = layers.map(([c, h]) => { y -= h; return `<rect x="${x + 12}" y="${y}" width="46" height="${h}" fill="${c}"/>`; }).join('');
        return `<g>${rects}<path d="M${x + 11} ${160 - total - 8} V161 H${x + 59} V${160 - total - 8}" class="vessel"/>
          <text x="${x + 35}" y="184" text-anchor="middle" class="t-b" style="font-size:13px">${name}</text>
          <text x="${x + 35}" y="202" text-anchor="middle" class="t-s" style="font-size:10px">${sub}</text></g>`;
      }).join('')}
      ${[[E, '濃縮'], [M, '牛奶'], [F, '奶泡／鮮奶油'], [W, '濃縮加水'], [C, '巧克力']].map(([c, t], i) =>
        `<rect x="${60 + i * 122}" y="218" width="14" height="14" rx="3" fill="${c}" stroke="var(--line)"/><text x="${80 + i * 122}" y="230" class="t-s">${t}</text>`).join('')}
    </svg>`,
    '經典飲品的組成（示意比例，各店做法不同）：差別主要在杯量、牛奶量與奶泡厚度。',
    'fig-wide'
  );
};

const wheel = () => {
  const cats = [['花香', '#d98cb3'], ['水果', '#d9534f'], ['酸發酵', '#d4b43c'], ['綠色植物', '#6f9f4f'], ['其他', '#7ea3b5'],
    ['烘焙', '#a0522d'], ['香料', '#9c3d54'], ['堅果可可', '#8b6b4a'], ['甜', '#e08a3c']];
  const cx = 180, cy = 170, r1 = 150, r0 = 62, n = cats.length;
  const pt = (r, a) => `${(cx + r * Math.sin(a)).toFixed(1)} ${(cy - r * Math.cos(a)).toFixed(1)}`;
  return wrap(
    `<svg viewBox="0 0 640 340" role="img" aria-label="簡化的咖啡風味輪：九個大類">
      ${cats.map(([name, c], i) => {
        const a0 = (i / n) * 2 * Math.PI, a1 = ((i + 1) / n) * 2 * Math.PI, am = (a0 + a1) / 2;
        return `<path d="M${pt(r0, a0)} L${pt(r1, a0)} A${r1} ${r1} 0 0 1 ${pt(r1, a1)} L${pt(r0, a1)} A${r0} ${r0} 0 0 0 ${pt(r0, a0)} Z" fill="${c}" stroke="var(--surface)" stroke-width="2"/>
          <text x="${(cx + 106 * Math.sin(am)).toFixed(1)}" y="${(cy - 106 * Math.cos(am) + 5).toFixed(1)}" text-anchor="middle" style="fill:#fff;font-size:13px;font-weight:700">${name}</text>`;
      }).join('')}
      <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="t-b">由內</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" class="t-b">而外</text>
      <text x="370" y="92" class="t-b" style="font-size:16px">怎麼用</text>
      <text x="370" y="124" class="t-s" style="font-size:14px">1. 先選大類：「這是水果，還是堅果？」</text>
      <text x="370" y="152" class="t-s" style="font-size:14px">2. 再往外找細項：水果 → 莓果 → 藍莓</text>
      <text x="370" y="180" class="t-s" style="font-size:14px">3. 找不到確切的詞，就停在中間層</text>
      <text x="370" y="226" class="t-a" style="font-size:14px">停在「莓果」比亂猜「藍莓」更準確。</text>
    </svg>`,
    '簡化的風味輪：只畫出最內圈的九個大類。完整版請參考 SCA 咖啡品鑑者風味輪。'
  );
};

export const journey = () => {
  const steps = [
    ['種植', '01–02', `<circle cx="22" cy="30" r="13" fill="#b3312a"/><circle cx="40" cy="36" r="12" fill="#c8402f"/><path d="M30 18 q4 -14 18 -14 q-2 12 -18 14" fill="#6b7d4a"/>`],
    ['處理', '01', `<ellipse cx="30" cy="30" rx="15" ry="21" fill="#9fae7f" transform="rotate(25 30 30)"/><path d="M26 12 q10 18 0 36" fill="none" stroke="#7f8d62" stroke-width="2.5" transform="rotate(25 30 30)"/>`],
    ['烘焙', '03', `<ellipse cx="30" cy="30" rx="15" ry="21" fill="#63391c" transform="rotate(25 30 30)"/><path d="M26 12 q10 18 0 36" fill="none" stroke="#2f1a0d" stroke-width="2.5" transform="rotate(25 30 30)"/>`],
    ['品飲', '04', `<path d="M14 18 h32 l-4 26 a8 8 0 0 1 -8 6 h-8 a8 8 0 0 1 -8 -6 z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M18 26 h24 l-2.5 16 a6 6 0 0 1 -6 4 h-7 a6 6 0 0 1 -6 -4 z" fill="#63391c"/>`],
    ['沖煮', '05–06', `<path d="M10 10 L27 36 h6 L50 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M19 22 L27 36 h6 L41 22 Z" fill="#6b4226"/><path d="M30 40 v5" stroke="#6b4226" stroke-width="2.5" stroke-linecap="round"/><path d="M18 48 h24 v4 a6 6 0 0 1 -6 6 h-12 a6 6 0 0 1 -6 -6 z" fill="none" stroke="currentColor" stroke-width="2.5"/>`],
    ['文化與產業', '07–11', `<path d="M12 22 h30 v14 a12 12 0 0 1 -12 12 h-6 a12 12 0 0 1 -12 -12 z" fill="#a8481f"/><path d="M42 26 h4 a6 6 0 0 1 0 12 h-5" fill="none" stroke="#a8481f" stroke-width="3"/><path d="M20 16 q-4 -5 0 -10 M30 16 q-4 -5 0 -10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>`],
  ];
  return `<svg class="journey" viewBox="0 0 660 110" role="img" aria-label="從種子到杯子的六個階段">
    ${steps.map(([name, no, icon], i) => `<g transform="translate(${20 + i * 108} 6)">${icon}
      <text x="30" y="78" text-anchor="middle" class="t-b" style="font-size:14px">${name}</text>
      <text x="30" y="96" text-anchor="middle" class="t-a" style="font-size:12px">${no}</text>
      ${i < 5 ? '<path d="M72 30 h22 m-7 -6 l7 6 l-7 6" class="lead" style="stroke-width:2"/>' : ''}</g>`).join('')}
  </svg>`;
};

// 放置位置：lesson id → [標題關鍵字（h2 或 h3），圖]；圖會插在該標題之後。
export const placements = {
  '01': [['咖啡櫻桃的結構', cherry], ['4. 處理法', processing]],
  '03': [['4. 烘焙度', roast]],
  '04': [['3. SCA 風味輪', wheel]],
  '05': [['萃取順序', extraction], ['濾杯與沖煮器', drippers]],
  '06': [['3. 經典飲品', drinks]],
};

export function placeFigures(html, id) {
  for (const [key, fn] of placements[id] || []) {
    const re = new RegExp(`(<h([23])[^>]*>[^<]*${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?</h\\2>)`);
    if (!re.test(html)) throw new Error(`第 ${id} 篇找不到插圖位置：「${key}」`);
    html = html.replace(re, `$1\n${fn()}`);
  }
  return html;
}

import { origins as _origins } from '../data/atlas.js';
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

// ---------- v3：更多圖表 ----------

const roastCurve = () =>
  wrap(
    `<svg viewBox="0 0 640 290" role="img" aria-label="烘焙曲線示意圖">
      <rect x="105" y="30" width="157" height="200" fill="#9fae7f" opacity=".16"/>
      <rect x="262" y="30" width="180" height="200" fill="#c9973a" opacity=".2"/>
      <rect x="442" y="30" width="90" height="200" fill="#a8481f" opacity=".2"/>
      <text x="183" y="46" text-anchor="middle" class="t-b">脫水期</text><text x="183" y="64" text-anchor="middle" class="t-s">綠轉黃、青草味</text>
      <text x="352" y="204" text-anchor="middle" class="t-b">梅納反應期</text><text x="352" y="221" text-anchor="middle" class="t-s">黃轉褐、烤麵包香</text>
      <text x="487" y="204" text-anchor="middle" class="t-b">發展期</text><text x="487" y="221" text-anchor="middle" class="t-s">風味定型</text>
      <path d="M60 230 H610 M60 230 V30" class="arrow"/>
      <path d="M60 72 C75 150 90 183 105 183 C160 183 200 140 262 125 C330 108 390 88 442 74 C480 66 510 63 532 60" fill="none" stroke="#a8481f" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M532 60 C560 55 580 50 600 46" fill="none" stroke="#a8481f" stroke-width="3" stroke-dasharray="6 5"/>
      <circle cx="105" cy="183" r="5" class="dot"/><text x="112" y="204" class="t-a">回溫點</text>
      <circle cx="442" cy="74" r="5" class="dot"/><text x="436" y="142" text-anchor="end" class="t-a">一爆（約 195–205°C）</text><path d="M440 80 L428 128" class="lead"/>
      <circle cx="532" cy="60" r="5" class="dot"/><text x="538" y="84" class="t-a">下豆</text>
      <circle cx="600" cy="46" r="4" class="dot"/><text x="604" y="34" text-anchor="end" class="t-s">繼續烘會進入二爆</text>
      <text x="335" y="256" text-anchor="middle" class="t-s">時間 →（一鍋通常十分鐘上下）</text>
      <text x="20" y="130" text-anchor="middle" class="t-s" transform="rotate(-90 20 130)">豆溫 →</text>
      <text x="64" y="64" class="t-s">入豆</text>
    </svg>`,
    '烘焙曲線（示意）：豆溫先掉到回溫點再爬升。一爆之後到下豆的「發展期」長短，決定了酸、甜、苦的比例。'
  );

const cuppingTimeline = () => {
  const steps = [['磨粉後', '聞乾香', ''], ['注水', '93 ±3°C 熱水', '0:00'], ['破渣', '推開粉層聞濕香', '3–5 分'], ['撈渣', '撈掉浮沫與粉', ''], ['啜吸', '降到約 70°C 開始', '8–10 分'], ['再評', '隨降溫至少三輪', '到體溫以下']];
  return wrap(
    `<svg viewBox="0 0 640 150" role="img" aria-label="杯測流程時間軸">
      <path d="M50 62 H590" class="arrow" style="stroke-width:3"/>
      ${steps.map(([a, b, t], i) => {
        const x = 50 + i * 108;
        return `<circle cx="${x}" cy="62" r="13" fill="var(--accent)"/><text x="${x}" y="67" text-anchor="middle" style="fill:#fff;font:700 13px var(--sans)">${i + 1}</text>
          <text x="${x}" y="34" text-anchor="middle" class="t-a">${t}</text>
          <text x="${x}" y="98" text-anchor="middle" class="t-b">${a}</text><text x="${x}" y="118" text-anchor="middle" class="t-s">${b}</text>`;
      }).join('')}
    </svg>`,
    '一次杯測的節奏：重點是每一杯的時間與動作都一樣，才比得出差異。'
  );
};

const grindScale = () => {
  const levels = [['粗', '法式濾壓、冷萃', 7, 5.5], ['中粗', '聰明濾杯、4:6 法', 12, 4.2], ['中細', '一般手沖', 20, 3.1], ['細', '摩卡壺、愛樂壓', 36, 2.1], ['極細', '義式濃縮', 70, 1.3]];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return wrap(
    `<svg viewBox="0 0 640 215" role="img" aria-label="研磨度與適合的沖煮法">
      ${levels.map(([n, use, count, r], i) => {
        const cx = 70 + i * 125;
        let dots = '';
        for (let k = 0; k < count; k++) {
          const a = rnd() * 6.283, d = Math.sqrt(rnd()) * 36;
          dots += `<circle cx="${(cx + d * Math.cos(a)).toFixed(1)}" cy="${(62 + d * Math.sin(a)).toFixed(1)}" r="${r}" fill="#63391c"/>`;
        }
        return `<circle cx="${cx}" cy="62" r="44" fill="var(--surface-2)"/>${dots}
          <text x="${cx}" y="130" text-anchor="middle" class="t-b" style="font-size:15px">${n}</text><text x="${cx}" y="150" text-anchor="middle" class="t-s">${use}</text>`;
      }).join('')}
      <path d="M40 182 H600" class="arrow"/><path d="M600 182 l-10 -5 v10 z" class="arrowhead"/>
      <text x="320" y="204" text-anchor="middle" class="t-s">越細：表面積越大、水流越慢、萃取越多 →</text>
    </svg>`,
    '研磨度是最有效的調整。先依沖煮法選大範圍，再一格一格微調。'
  );
};

const newDrippers = () => {
  const item = (x, name, shape, n1, n2) => `<g transform="translate(${x} 0)">${shape}
    <text x="76" y="168" text-anchor="middle" class="t-b" style="font-size:14px">${name}</text>
    <text x="76" y="188" text-anchor="middle" class="t-s">${n1}</text><text x="76" y="206" text-anchor="middle" class="t-a">${n2}</text></g>`;
  const bed = '#6b4226', liq = '#b98d5f';
  return wrap(
    `<svg viewBox="0 0 640 220" role="img" aria-label="近年濾杯的四種設計方向">
      ${item(4, '閥門式', `<path d="M24 26 L68 126 H84 L128 26" class="vessel"/><path d="M33 46 L68 126 H84 L119 46 Z" fill="${liq}"/><path d="M52 90 L68 126 H84 L100 90 Z" fill="${bed}"/><circle cx="76" cy="132" r="7" fill="var(--accent)"/><path d="M62 144 H90" class="vessel"/>`, '關上浸泡，打開放流', '例：Hario Switch')}
      ${item(162, '快流速平底', `<path d="M22 40 L40 126 H112 L130 40" class="vessel"/><path d="M33 92 L40 126 H112 L119 92 Z" fill="${bed}"/><path d="M52 130 V146 M76 130 V148 M100 130 V146" class="drip"/>`, '底部大開口，粉床淺而平', '例：Orea、April、B75')}
      ${item(320, '無旁通', `<path d="M40 22 V126 H112 V22" class="vessel"/><path d="M42 86 H110 V126 H42 Z" fill="${bed}"/><path d="M42 44 H110" class="lead" stroke-dasharray="3 3"/><path d="M58 50 V78 M76 50 V78 M94 50 V78" class="drip" style="stroke:${liq};stroke-width:3"/><path d="M76 130 V146" class="drip"/>`, '直筒，水全部穿過粉層', '例：Tricolate、Pulsar')}
      ${item(478, '可調流速', `<path d="M22 40 L40 126 H112 L130 40" class="vessel"/><path d="M33 92 L40 126 H112 L119 92 Z" fill="${bed}"/><path d="M40 136 H112" class="vessel" style="stroke:var(--accent)"/><path d="M56 140 V150 M96 140 V150" class="drip" style="stroke-width:2"/><path d="M118 130 a12 12 0 0 1 14 12 m0 0 l-6 -3 m6 3 l3 -6" class="lead" style="stroke:var(--accent);stroke-width:2"/>`, '轉動底座改變出水孔', '例：December Dripper')}
    </svg>`,
    '近年新濾杯的四個方向：控制浸泡時間、加快流速並整平粉床、消除旁通、讓流速可調。'
  );
};

const controlChart = () => {
  const X = (e) => 80 + ((e - 14) / 12) * 500, Y = (t) => 230 - ((t - 0.8) / 1) * 200;
  const cell = (e, t, a, b) => `<text x="${X(e)}" y="${Y(t)}" text-anchor="middle" class="t-b" style="font-size:13px">${a}</text><text x="${X(e)}" y="${Y(t) + 17}" text-anchor="middle" class="t-s">${b}</text>`;
  return wrap(
    `<svg viewBox="0 0 640 290" role="img" aria-label="沖煮控制圖九宮格">
      <rect x="80" y="30" width="500" height="200" fill="var(--surface-2)"/>
      <rect x="${X(18)}" y="${Y(1.35)}" width="${X(22) - X(18)}" height="${Y(1.15) - Y(1.35)}" fill="#c9973a" opacity=".4"/>
      <path d="M${X(18)} 30 V230 M${X(22)} 30 V230 M80 ${Y(1.15)} H580 M80 ${Y(1.35)} H580" class="lead" stroke-dasharray="4 4"/>
      ${cell(16, 1.58, '濃而尖酸', '先磨細，再減粉')}${cell(20, 1.58, '濃但平衡', '加水或減粉')}${cell(24, 1.58, '濃而苦澀', '先磨粗，再調比例')}
      ${cell(16, 1.27, '酸、缺甜感', '磨細')}${cell(20, 1.27, '金杯區', '平衡')}${cell(24, 1.27, '苦、澀、空洞', '磨粗')}
      ${cell(16, 1.0, '淡而酸', '磨細，再加粉')}${cell(20, 1.0, '淡但平衡', '加粉')}${cell(24, 1.0, '淡而苦澀', '磨粗，再加粉')}
      <path d="M${X(14.6)} ${Y(0.93)} L${X(25.4)} ${Y(1.62)}" stroke="var(--accent)" stroke-width="2" opacity=".7"/>
      <text x="${X(25.3)}" y="${Y(1.68)}" text-anchor="end" class="t-a">同一粉水比：磨細往右上走</text>
      ${[14, 18, 22, 26].map((e) => `<text x="${X(e)}" y="248" text-anchor="middle" class="t-s">${e}%</text>`).join('')}
      ${[0.8, 1.15, 1.35, 1.8].map((t) => `<text x="72" y="${Y(t) + 4}" text-anchor="end" class="t-s">${t}</text>`).join('')}
      <text x="330" y="272" text-anchor="middle" class="t-s">萃取率 →</text>
      <text x="22" y="130" text-anchor="middle" class="t-s" transform="rotate(-90 22 130)">濃度 TDS % →</text>
    </svg>`,
    '沖煮控制圖：橫軸是萃取率（味道的組成），縱軸是濃度（味道的強弱）。先用研磨左右移動，再用粉水比上下移動。'
  );
};

const espressoShot = () =>
  wrap(
    `<svg viewBox="0 0 640 235" role="img" aria-label="一份義式濃縮的參數">
      <rect x="30" y="52" width="130" height="76" rx="12" fill="var(--surface-2)"/><text x="95" y="84" text-anchor="middle" class="t-b" style="font-size:20px">18 g</text><text x="95" y="108" text-anchor="middle" class="t-s">極細研磨的咖啡粉</text>
      <path d="M170 90 H230" class="arrow" style="stroke-width:2.5"/><path d="M232 90 l-10 -6 v12 z" class="arrowhead"/>
      <rect x="240" y="30" width="170" height="120" rx="14" fill="var(--accent-soft)"/>
      <text x="325" y="62" text-anchor="middle" class="t-b" style="font-size:16px">約 9 bar</text><text x="325" y="88" text-anchor="middle" class="t-b" style="font-size:16px">90–94°C</text><text x="325" y="114" text-anchor="middle" class="t-b" style="font-size:16px">25–30 秒</text><text x="325" y="138" text-anchor="middle" class="t-s">壓力、水溫、時間</text>
      <path d="M420 90 H480" class="arrow" style="stroke-width:2.5"/><path d="M482 90 l-10 -6 v12 z" class="arrowhead"/>
      <rect x="490" y="52" width="130" height="76" rx="12" fill="#4a2c1a"/><text x="555" y="84" text-anchor="middle" style="fill:#fff;font:700 20px var(--sans)">36 g</text><text x="555" y="108" text-anchor="middle" style="fill:#e9dcc0;font:12px var(--sans)">濃縮液（1:2）</text>
      ${[['Ristretto 短萃', '約 1:1 至 1:1.5', 60, '濃稠、甜'], ['Normale 標準', '約 1:2', 120, '平衡'], ['Lungo 長萃', '約 1:3 以上', 200, '較淡、苦味增加']].map(([n, r, w, d], i) => {
        const x = 30 + i * 205;
        return `<rect x="${x}" y="176" width="${w * 0.9}" height="12" rx="6" fill="#4a2c1a" opacity="${1 - i * 0.25}"/><text x="${x}" y="168" class="t-b" style="font-size:13px">${n}</text><text x="${x}" y="208" class="t-s">${r}　${d}</text>`;
      }).join('')}
    </svg>`,
    '一份濃縮的標準起點（以 18g 粉為例），以及同樣粉量、不同出液量的三種萃取。'
  );

const threeWaves = () => {
  const w = [['第一波', '普及', '讓家家戶戶喝得到：即溶、罐裝、大量生產', '#b98d5f'], ['第二波', '咖啡館與義式飲品', '連鎖咖啡館、拿鐵與卡布奇諾，咖啡變成一種生活場所', '#87552c'], ['第三波', '精品咖啡', '把咖啡當成農產品：產地、品種、處理、淺焙、手沖', '#4a2c1a']];
  return wrap(
    `<svg viewBox="0 0 640 170" role="img" aria-label="三波咖啡浪潮">
      ${w.map(([n, t, d, c], i) => {
        const x = 20 + i * 205;
        const words = d.match(/.{1,13}/g);
        return `<path d="M${x} 20 H${x + 175} l20 34 l-20 34 H${x} l20 -34 z" fill="${c}"/>
          <text x="${x + 98}" y="48" text-anchor="middle" style="fill:#fff;font:700 15px var(--sans)">${n}</text><text x="${x + 98}" y="70" text-anchor="middle" style="fill:#f3e6cf;font:13px var(--sans)">${t}</text>
          ${words.map((s, k) => `<text x="${x + 98}" y="${114 + k * 19}" text-anchor="middle" class="t-s" style="font-size:13px">${s}</text>`).join('')}`;
      }).join('')}
    </svg>`,
    '「三波」是從美國咖啡史切出來的分期，每一波都沒有取代前一波，而是疊加上去。'
  );
};

const coldMethods = () => {
  const m = [['冰手沖', '熱水沖、直接滴在冰上', '數分鐘', '保留花果香與明亮酸質', 175, 60, '#d9822b'], ['冰滴', '冰水一滴一滴通過粉層', '數小時', '乾淨，熟成後帶酒香', 330, 150, '#7ea3b5'], ['冷萃', '冷水長時間浸泡', '12–24 小時', '酸感低、柔順、巧克力堅果', 520, 150, '#5b3a29']];
  return wrap(
    `<svg viewBox="0 0 640 270" role="img" aria-label="三種冷咖啡：水溫與時間">
      <path d="M70 200 H610 M70 200 V24" class="arrow"/>
      <text x="62" y="64" text-anchor="end" class="t-s">熱水</text><text x="62" y="154" text-anchor="end" class="t-s">冷水</text>
      <text x="340" y="224" text-anchor="middle" class="t-s">萃取時間 →</text>
      ${m.map(([n, how, t, f, x, y, c]) => `<circle cx="${x}" cy="${y}" r="26" fill="${c}" opacity=".9"/>
        <text x="${x}" y="${y + 5}" text-anchor="middle" style="fill:#fff;font:700 13px var(--sans)">${n}</text>
        <text x="${x}" y="${y - 34}" text-anchor="middle" class="t-a">${t}</text>
        <text x="${x}" y="${y === 60 ? y + 46 : 246}" text-anchor="middle" class="t-s">${how}</text>
        <text x="${x}" y="${y === 60 ? y + 64 : 264}" text-anchor="middle" class="t-b" style="font-size:12px">${f}</text>`).join('')}
    </svg>`,
    '三種冷咖啡的差別在水溫和時間。熱水才溶得出大部分的香氣與酸，所以想喝淺焙豆的花果香，選冰手沖。'
  );
};

const taiwanSupply = () => {
  let dots = '';
  for (let i = 0; i < 100; i++) dots += `<circle cx="${42 + (i % 20) * 22}" cy="${40 + Math.floor(i / 20) * 22}" r="8" fill="${i < 2 ? 'var(--accent)' : '#b98d5f'}" opacity="${i < 2 ? 1 : 0.45}"/>`;
  return wrap(
    `<svg viewBox="0 0 640 215" role="img" aria-label="台灣咖啡自給率約百分之二">
      ${dots}
      <circle cx="500" cy="62" r="8" fill="var(--accent)"/><text x="516" y="67" class="t-b">國產：不到 2%</text><text x="516" y="86" class="t-s">2025 年約 907 公噸</text>
      <circle cx="500" cy="118" r="8" fill="#b98d5f" opacity=".45"/><text x="516" y="123" class="t-b">進口：超過 98%</text><text x="516" y="142" class="t-s">每年超過 5 萬公噸</text>
      <text x="42" y="182" class="t-s">每一點代表台灣一年咖啡供應量的 1%。</text>
    </svg>`,
    '台灣人喝的咖啡，一百杯裡不到兩杯是台灣種的。產量為農業部 2025 年統計，進口量為農業部農試所 2025 年的說法。'
  );
};

const REGION_COLORS = { '非洲': '#d9534f', '中美洲與加勒比海': '#6f9f4f', '南美洲': '#c9973a', '亞洲、中東與大洋洲': '#7ea3b5' };
export const originMapSvg = (list = _origins.filter((o) => o.flavors.length), interactive = false) => {
  const X = (a) => 70 + ((a - 0.5) / 5) * 540, Y = (b) => 400 - ((b - 0.5) / 5) * 370;
  // 同一格的產區排成一欄，避免文字重疊
  const cells = {};
  for (const o of list) (cells[`${o.acidity}-${o.body}`] ||= []).push(o);
  const pts = [];
  for (const group of Object.values(cells)) {
    group.forEach((o, n) => pts.push({ o, x: X(o.acidity) - 34, y: Y(o.body) + (n - (group.length - 1) / 2) * 15 }));
  }
  return `<svg viewBox="0 0 640 460" role="img" aria-label="各產區的酸質與醇厚度分布">
    <rect x="70" y="30" width="540" height="370" fill="var(--surface-2)" rx="6"/>
    <path d="M340 30 V400 M70 215 H610" class="lead" stroke-dasharray="4 4"/>
    <text x="190" y="48" class="t-s">厚實、低酸</text><text x="600" y="48" text-anchor="end" class="t-s">厚實、明亮</text>
    <text x="80" y="392" class="t-s">輕盈、低酸</text><text x="600" y="392" text-anchor="end" class="t-s">輕盈、明亮</text>
    ${pts.map(({ o, x, y }) => `<g${interactive ? ` class="om-pt" data-key="${o.key}" tabindex="0" role="button" aria-label="${o.name}"` : ''}>
      <circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="5" fill="${REGION_COLORS[o.region] || '#888'}" stroke="var(--surface)" stroke-width="1.5"/>
      <text x="${(x + 9).toFixed(0)}" y="${(y + 4).toFixed(0)}" class="t-s" style="font-size:11.5px;fill:var(--text)">${o.name}</text></g>`).join('')}
    <text x="340" y="422" text-anchor="middle" class="t-s">酸質 →</text>
    <text x="24" y="215" text-anchor="middle" class="t-s" transform="rotate(-90 24 215)">醇厚度 →</text>
    ${Object.entries(REGION_COLORS).map(([r, c], i) => `<circle cx="${82 + i * 138}" cy="446" r="5" fill="${c}"/><text x="${92 + i * 138}" y="450" class="t-s">${r}</text>`).join('')}
  </svg>`;
};
const originMap = () => wrap(originMapSvg(), '各產區的典型印象（示意）：位置依課文的描述給分，同一個產區不同處理法與烘焙度會差很多。');

Object.assign(placements, {
  '02': [['6. 產區風味速查表', originMap]],
  '03': [...placements['03'], ['5. 烘焙曲線', roastCurve]],
  '04': [...placements['04'], ['4. 杯測', cuppingTimeline]],
  '05': [...placements['05'], ['2. 六大變數', grindScale], ['近年的新濾杯', newDrippers], ['9. 萃取控制圖', controlChart]],
  '06': [['1. 義式濃縮', espressoShot], ...placements['06']],
  '07': [['6. 美國與三波咖啡浪潮', threeWaves]],
  '08': [['1. 冷咖啡的三個流派', coldMethods]],
  '10': [['2. 產業現況', taiwanSupply]],
});

// 名詞面板可用的插圖
export const figByKey = { cherry, processing, roast, extraction, wheel, drippers, drinks, chart: controlChart, grind: grindScale, curve: roastCurve, cupping: cuppingTimeline, shot: espressoShot, cold: coldMethods };

// 第 12 篇：各國官方的每日咖啡因參考值
const caffeineGuide = () => {
  const rows = [
    ['EFSA（歐盟）', '健康成人', 400, 'var(--accent)'], ['美國 FDA', '多數成人', 400, 'var(--accent)'], ['加拿大衛生部', '成人', 400, 'var(--accent)'], ['台灣食藥署', '一般民眾', 300, 'var(--accent)'],
    ['加拿大衛生部', '懷孕、備孕、哺乳', 300, '#c9973a'], ['EFSA（歐盟）', '孕婦、哺乳者', 200, '#c9973a'], ['台灣國健署', '孕婦', 200, '#c9973a'],
  ];
  const X = (v) => 250 + (v / 400) * 330;
  return wrap(
    `<svg viewBox="0 0 640 330" role="img" aria-label="各國官方的每日咖啡因參考值">
      ${[0, 100, 200, 300, 400].map((v) => `<path d="M${X(v)} 20 V266" class="lead" stroke-dasharray="3 4" opacity=".5"/><text x="${X(v)}" y="284" text-anchor="middle" class="t-s">${v}</text>`).join('')}
      ${rows.map(([who, grp, v, c], i) => {
        const y = 26 + i * 34;
        return `<text x="240" y="${y + 9}" text-anchor="end" class="t-b" style="font-size:13px">${who}</text><text x="240" y="${y + 24}" text-anchor="end" class="t-s" style="font-size:11px">${grp}</text>
          <rect x="250" y="${y}" width="${X(v) - 250}" height="22" rx="5" fill="${c}"/><text x="${X(v) - 8}" y="${y + 16}" text-anchor="end" style="fill:#fff;font:700 13px var(--sans)">${v}</text>`;
      }).join('')}
      <text x="415" y="306" text-anchor="middle" class="t-s">每天的咖啡因（毫克）</text>
      <rect x="250" y="314" width="12" height="12" rx="3" fill="var(--accent)"/><text x="268" y="324" class="t-s">一般成人</text>
      <rect x="350" y="314" width="12" height="12" rx="3" fill="#c9973a"/><text x="368" y="324" class="t-s">懷孕或哺乳</text>
    </svg>`,
    '各國主管機關公布的每日咖啡因參考值，數字與年份見下表。這是參考值，不是醫療建議；個人狀況請諮詢醫師。'
  );
};
Object.assign(placements, { '12': [['2. 每天可以喝多少', caffeineGuide]] });

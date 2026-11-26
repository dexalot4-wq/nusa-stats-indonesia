// Hand-rolled SVG charts. No library, no network: every chart is drawn from the
// numbers in data.js into an inline <svg>. Both builders return an SVG string
// with axes, gridlines and value labels, so the figure is readable even when
// the page is printed or the script that built it is not inspected.

const NS = 'http://www.w3.org/2000/svg';
const INK = '#1c2420';
const MUTED = '#5d6b66';
const GRID = '#dfe6e1';
const TEAL = '#0e4f4a';
const AMBER = '#d98a12';
const RED = '#b3402e';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function niceMax(max) {
  // Round the axis ceiling up to a tidy step (1, 2, 5 or 10 × a power of 10).
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  for (const m of [1, 2, 5, 10]) if (max <= m * pow) return m * pow;
  return 10 * pow;
}

function axisTicks(max, count = 4) {
  const step = max / count;
  return Array.from({ length: count + 1 }, (_, i) => +(step * i).toFixed(2));
}

// A vertical bar chart. `points` is [{label, value}]; `unit` is appended to
// the value labels (e.g. "%" or "m").
export function barChart(points, { unit = '', color = TEAL, height = 260 } = {}) {
  const width = 640;
  const padL = 52;
  const padR = 14;
  const padT = 26;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const slot = plotW / points.length;
  const barW = Math.min(64, slot * 0.58);
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" xmlns="${NS}" aria-label="Bar chart">`;
  for (const t of axisTicks(max)) {
    const y = padT + plotH - (t / max) * plotH;
    s += `<line x1="${padL}" y1="${y}" x2="${width - padR}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${t}</text>`;
  }
  points.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const h = (p.value / max) * plotH;
    const y = padT + plotH - h;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"/>`;
    s += `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${p.value}${unit}</text>`;
    s += `<text x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  s += `<line x1="${padL}" y1="${padT + plotH}" x2="${width - padR}" y2="${padT + plotH}" stroke="${INK}" stroke-width="1"/>`;
  return s + '</svg>';
}

// A line chart with dots and value labels. `points` is [{label, value}].
export function lineChart(points, { unit = '', color = TEAL, height = 260, min = null } = {}) {
  const width = 640;
  const padL = 52;
  const padR = 34;
  const padT = 30;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const values = points.map((p) => p.value);
  const lo = min ?? Math.min(0, ...values);
  const hi = niceMax(Math.max(...values) * 1.06);
  const span = hi - lo || 1;
  const x = (i) => padL + (plotW * i) / (points.length - 1);
  const y = (v) => padT + plotH - ((v - lo) / span) * plotH;
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" xmlns="${NS}" aria-label="Line chart">`;
  for (const t of axisTicks(hi, 4)) {
    if (t < lo) continue;
    s += `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${t}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${color}" stroke-width="2.5"/>`;
    const above = i % 2 === 0;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) + (above ? -11 : 20)).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${p.value}${unit}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  s += `<line x1="${padL}" y1="${padT + plotH}" x2="${width - padR}" y2="${padT + plotH}" stroke="${INK}" stroke-width="1"/>`;
  return s + '</svg>';
}

// A horizontal bar list, best for ranked categories such as provinces.
// `rows` is [{label, value, note}]; the longest bar fills the track.
export function rankBars(rows, { unit = '', color = TEAL } = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  return rows
    .map(
      (r) => `<div class="rank-row">
  <span class="rank-label">${esc(r.label)}</span>
  <span class="rank-track"><span class="rank-fill" style="width:${((r.value / max) * 100).toFixed(1)}%;background:${color}"></span></span>
  <span class="rank-value">${r.value}${unit}${r.note ? ` <span class="rank-note">${esc(r.note)}</span>` : ''}</span>
</div>`,
    )
    .join('');
}

export const CHART_COLORS = { teal: TEAL, amber: AMBER, red: RED, muted: MUTED };

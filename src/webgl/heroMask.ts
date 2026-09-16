/**
 * JOEL.NOIR — Hero glyph mask.
 *
 * TYPOGRAPHY BECOMES ARTWORK. The desktop hero headline is the mask through
 * which the Russian Viking plane is first seen. Nothing here invents a letter
 * shape: every glyph is drawn at the exact position the browser laid the real
 * <h1> out at (one Range rect per character), in the h1's own computed font.
 * The h1 stays the semantic, selectable text; only its paint hands over.
 *
 * Output is one RGBA texture over the h1's box:
 *   G — antialiased glyph coverage (the letters exactly as set)
 *   R — signed distance to the letter contour, so the letters stay sharp edged
 *       at any scale
 * The shader enlarges the real letterforms around a point deep inside one
 * stroke until that stroke alone is larger than the screen.
 */

export type HeroMask = {
  data: Uint8Array | Float32Array;
  width: number;
  height: number;
  /** RG16F texture (WebGL2) rather than 8-bit RGBA */
  float: boolean;
  /** signed distance = (R - bias) * scale, CSS px at the headline's own size */
  bias: number;
  scale: number;
  /** where the typography opens from, CSS px inside the untransformed h1 box */
  focal: [number, number];
  /** how deep that point sits inside its stroke, CSS px */
  depth: number;
};

const INF = 1e20;

/** Felzenszwalb & Huttenlocher 1D squared distance transform. */
function edt1d(f: Float64Array, n: number, d: Float64Array, v: Int32Array, z: Float64Array) {
  let k = 0;
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) {
      k--;
      s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
  }
}

/** Yield to the browser between the heavy steps, so no single task blocks input. */
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

export async function buildHeroMask(h1: HTMLElement, float: boolean): Promise<HeroMask | null> {
  const box = h1.getBoundingClientRect();
  const s0 = h1.offsetWidth > 0 ? box.width / h1.offsetWidth : 1; // live transform scale
  const cssW = h1.offsetWidth;
  const cssH = h1.offsetHeight;
  if (cssW < 10 || cssH < 10) return null;

  // texel density: at least 2 per CSS px, so the enlarged contour stays smooth;
  // capped so the one-time distance transform stays cheap
  const k = Math.min(Math.max(window.devicePixelRatio || 1, 2), 2.5);
  const W = Math.ceil(cssW * k);
  const H = Math.ceil(cssH * k);

  const cs = getComputedStyle(h1);
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.scale(k, k);
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "alphabetic";
  const upper = cs.textTransform === "uppercase";

  // every character at the position the browser actually set it
  const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? "";
    for (let i = 0; i < text.length; i++) {
      const ch = upper ? text[i].toUpperCase() : text[i];
      if (!ch.trim()) continue;
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getClientRects()[0];
      if (!r) continue;
      const m = ctx.measureText(ch);
      const x = (r.left - box.left) / s0;
      const top = (r.top - box.top) / s0;
      const contentH = r.height / s0;
      // the inline content box is ascent + descent of the font; its baseline
      // sits at ascent from the top
      const asc = m.fontBoundingBoxAscent;
      const desc = m.fontBoundingBoxDescent;
      const lead = (contentH - (asc + desc)) / 2;
      ctx.fillText(ch, x, top + lead + asc);
    }
  }

  const px = ctx.getImageData(0, 0, W, H).data;
  const n = W * H;
  await nextFrame();

  // squared distance (texels) to the nearest inked texel
  /* Seeded from the antialiased coverage rather than a hard threshold (the
     approach of Mapbox's TinySDF): an edge texel starts at its sub-texel
     distance to the true contour, so enlarged edges stay straight and clean
     instead of stepping along the pixel grid. */
  const grid = new Float64Array(n);
  const inner = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const a = px[i * 4 + 3] / 255;
    if (a >= 1) {
      grid[i] = 0;
      inner[i] = INF;
    } else if (a <= 0) {
      grid[i] = INF;
      inner[i] = 0;
    } else {
      const o = Math.max(0, 0.5 - a);
      const q = Math.max(0, a - 0.5);
      grid[i] = o * o;
      inner[i] = q * q;
    }
  }
  const m = Math.max(W, H);
  const f = new Float64Array(m);
  const d = new Float64Array(m);
  const v = new Int32Array(m);
  const z = new Float64Array(m + 1);
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) f[y] = grid[y * W + x];
    edt1d(f, H, d, v, z);
    for (let y = 0; y < H; y++) grid[y * W + x] = d[y];
  }
  await nextFrame();
  for (let y = 0; y < H; y++) {
    const row = y * W;
    for (let x = 0; x < W; x++) f[x] = grid[row + x];
    edt1d(f, W, d, v, z);
    for (let x = 0; x < W; x++) grid[row + x] = d[x];
  }
  await nextFrame();

  // and the other way: depth of every inked texel inside its letter
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) f[y] = inner[y * W + x];
    edt1d(f, H, d, v, z);
    for (let y = 0; y < H; y++) inner[y * W + x] = d[y];
  }
  await nextFrame();
  for (let y = 0; y < H; y++) {
    const row = y * W;
    for (let x = 0; x < W; x++) f[x] = inner[row + x];
    edt1d(f, W, d, v, z);
    for (let x = 0; x < W; x++) inner[row + x] = d[x];
  }
  await nextFrame();

  /* The point the typography opens from: the deepest point of a stroke
     (so the letter itself can grow past the frame), and of those, the one
     nearest the middle of the headline, so it opens evenly. */
  let deepest = 0;
  for (let i = 0; i < n; i++) if (inner[i] > deepest) deepest = inner[i];
  let best = -1;
  let bestD = INF;
  const cx = W / 2;
  const cy = H / 2;
  for (let i = 0; i < n; i++) {
    if (inner[i] < deepest * 0.8) continue;
    const x = i % W;
    const y = (i - x) / W;
    const dd = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    if (dd < bestD) { bestD = dd; best = i; }
  }
  const fx = best >= 0 ? (best % W) / k : cssW / 2;
  const fy = best >= 0 ? Math.floor(best / W) / k : cssH / 2;
  const depth = Math.sqrt(deepest) / k;
  await nextFrame();

  /* R: signed distance to the contour in CSS px (negative inside), G: coverage.
     Float where the context can filter it (exact straight edges at any scale),
     otherwise 8-bit, linearly encoded over ±span. */
  const span = Math.max(16, depth * 1.5);
  const sd = (i: number) => (Math.sqrt(grid[i]) - Math.sqrt(inner[i])) / k;
  if (float) {
    // two channels are all the float path needs (RG16F: half the memory)
    const out = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      out[i * 2] = sd(i);
      out[i * 2 + 1] = px[i * 4 + 3] / 255;
    }
    return { data: out, width: W, height: H, float: true, bias: 0, scale: 1, focal: [fx, fy], depth };
  }
  const out = new Uint8Array(n * 4);
  for (let i = 0; i < n; i++) {
    out[i * 4] = Math.round(Math.min(1, Math.max(0, 0.5 + sd(i) / (2 * span))) * 255);
    out[i * 4 + 1] = px[i * 4 + 3];
    out[i * 4 + 3] = 255;
  }
  return { data: out, width: W, height: H, float: false, bias: 0.5, scale: 2 * span, focal: [fx, fy], depth };
}

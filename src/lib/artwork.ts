/**
 * ARTWORK MODE — geometry.
 *
 * A poster is not a background. It has a format, and the format is part of the
 * design. This module computes the one rectangle in which an artwork is drawn
 * at its true aspect ratio, fully visible, never cropped — used identically by
 * the reel (WebGL plane) and by the case-study hero (DOM image), so the morph
 * between them stays one continuous frame.
 *
 * Everything else on screen is deliberate negative space.
 */

import type { ArtworkStage } from "./projects";

export type Rect = { x: number; y: number; w: number; h: number };

/**
 * The artwork's rect in CSS pixels.
 *
 * Height-led: the artwork takes `fit` of the viewport height. A width ceiling
 * keeps a real margin on the open side, so the caption column never has to
 * fight the image on narrow desktop windows.
 */
export function artworkRect(a: ArtworkStage, vw: number, vh: number): Rect {
  const w = Math.round(Math.min(a.fit * vh * a.aspect, a.maxW * vw));
  const h = Math.round(w / a.aspect);
  let x: number;
  if (a.ax === "gutter") x = gutter(vw);
  else if (a.ax === "gutter-right") x = vw - w - gutter(vw);
  else x = (vw - w) * a.ax;
  return { x: Math.round(x), y: Math.round((vh - h) * a.ay), w, h };
}

/**
 * Which side the plate line lives on. Not a per-project choice: the caption
 * always sits in the open margin, so an artwork pinned right puts its line
 * left, and everything else keeps the line right.
 */
export function plateSide(a: ArtworkStage): "left" | "right" {
  return a.ax === "gutter-right" || (typeof a.ax === "number" && a.ax > 0.6)
    ? "left"
    : "right";
}

/**
 * The page gutter — the same clamp every other element on the site is set to.
 * An artwork anchored here shares its left edge with the wordmark above it and
 * with the body copy on every other section, so it reads as set on the page
 * rather than floating near the middle of it.
 */
export const GUTTER_CSS = "clamp(1.25rem, 5vw, 3.5rem)";
function gutter(vw: number) {
  return Math.min(Math.max(20, vw * 0.05), 56);
}

/**
 * The same formula written as CSS custom properties.
 *
 * Used wherever the geometry has to be right on the first paint and stay right
 * on resize without measuring: the case hero, and the plate line, whose baseline
 * is tied to the artwork's bottom edge rather than to a coincidence of clamps.
 */
export function artworkVars(a: ArtworkStage): Record<string, string> {
  return {
    "--art-w": `min(calc(${a.fit} * 100svh * ${a.aspect}), ${a.maxW * 100}vw)`,
    "--art-h": `calc(var(--art-w) / ${a.aspect})`,
    "--art-x":
      a.ax === "gutter"
        ? GUTTER_CSS
        : a.ax === "gutter-right"
          ? `calc(100vw - var(--art-w) - ${GUTTER_CSS})`
          : `calc((100vw - var(--art-w)) * ${a.ax})`,
    "--art-y": `calc((100svh - var(--art-h)) * ${a.ay})`,
    /* distance from the viewport bottom to the artwork's bottom edge */
    "--art-b": `calc((100svh - var(--art-h)) * ${1 - a.ay})`,
    /* the file's own ratio — the mobile case hero sizes from this alone */
    "--art-aspect": String(a.aspect),
  };
}

/** Full-bleed rect — the reel's normal state, and where every entry starts. */
export function fullRect(vw: number, vh: number): Rect {
  return { x: 0, y: 0, w: vw, h: vh };
}

/** Blend two rects. `t` 0 = full-bleed crop, 1 = the artwork's own format. */
export function lerpRect(a: Rect, b: Rect, t: number): Rect {
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    w: a.w + (b.w - a.w) * t,
    h: a.h + (b.h - a.h) * t,
  };
}

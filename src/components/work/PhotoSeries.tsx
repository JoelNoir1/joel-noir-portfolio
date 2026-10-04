import type { CSSProperties } from "react";
import type { SeriesRow } from "@/lib/projects";
import { artworkVars, plateSide } from "@/lib/artwork";

/**
 * PHOTO SERIES — frames set one after another in normal page flow, each
 * complete at its own 4:5, placed with the artwork-mode geometry so every
 * frame sits on the page gutter. No effect, no motion: the photographs are
 * the product. Shared by the home page and the series' own case page.
 */
export default function PhotoSeries({
  rows,
  lang,
  eager = 0,
}: {
  rows: (SeriesRow & { caption?: string })[];
  lang: "de" | "en";
  /** How many leading frames load eagerly (the first one on screen). */
  eager?: number;
}) {
  let n = 0;
  return (
    <div className="jn-series">
      {rows.map((row, r) => {
        const pair = row.frames.length > 1;
        const stage = { aspect: 4 / 5, fit: row.fit, maxW: pair ? 0.42 : 0.46, ax: row.ax, ay: 0 };
        return (
          <div
            key={r}
            className={`jn-series-row${pair ? " jn-series-row--pair" : ""}`}
            data-ax={row.ax}
            style={artworkVars(stage) as CSSProperties}
          >
            {row.frames.map((f) => {
              const first = n++ < eager;
              return (
                <figure key={f.src} className="jn-series-frame">
                  {/* native srcset: images are served unoptimised site-wide,
                      so next/image would ship one width to every screen */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${f.src}-1600.jpg`}
                    srcSet={`${f.src}-960.jpg 960w, ${f.src}-1600.jpg 1600w`}
                    sizes={`(max-width: 767px) 92vw, ${pair ? 42 : 46}vw`}
                    width={1600}
                    height={2000}
                    alt={f.alt[lang]}
                    loading={first ? "eager" : "lazy"}
                    fetchPriority={first ? "high" : undefined}
                    decoding="async"
                  />
                </figure>
              );
            })}
            {/* the one name, once, in the open margin on the frame's baseline */}
            {row.caption && (
              <p className="jn-series-caption label" data-side={plateSide(stage)}>
                {row.caption}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

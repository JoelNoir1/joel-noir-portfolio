import type { ReactNode } from "react";
import type { SeriesFrame, SeriesRow } from "@/lib/projects";

type Size = "l" | "s" | "m";

/* what each frame size is actually drawn at, so the browser picks the file */
const SIZES: Record<Size, string> = {
  l: "(max-width: 767px) 92vw, 46vw",
  s: "(max-width: 767px) 62vw, 28vw",
  m: "(max-width: 767px) 78vw, 36vw",
};

/**
 * PHOTO SERIES — set like a photo book: spreads of one large and one small
 * frame, the large one changing sides, and a single frame as the close. Every
 * frame complete at its own 4:5, in normal page flow. No effect, no motion:
 * the photographs are the product. Shared by the home page and the series'
 * own case page.
 */
export default function PhotoSeries({
  rows,
  lang,
  lead,
}: {
  rows: SeriesRow[];
  lang: "de" | "en";
  /** An opening frame with the series' own intro beside it (home page). */
  lead?: { frame: SeriesFrame; intro: ReactNode; caption?: string };
}) {
  return (
    <div className="jn-photo">
      {lead && (
        <div className="jn-photo-lead">
          <div className="jn-photo-intro">{lead.intro}</div>
          <Frame f={lead.frame} size="l" lang={lang} eager />
          {/* the one name, once, on the frame's baseline: a name, never a claim */}
          {lead.caption && <p className="jn-photo-cap label">{lead.caption}</p>}
        </div>
      )}
      {rows.map((row, r) => (
        <div key={r} className="jn-photo-row" data-big={row.frames.length > 1 ? (row.big ?? 0) : "single"}>
          {row.frames.map((f, i) => (
            <Frame
              key={f.src}
              f={f}
              size={row.frames.length === 1 ? "m" : i === (row.big ?? 0) ? "l" : "s"}
              lang={lang}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Frame({ f, size, lang, eager }: { f: SeriesFrame; size: Size; lang: "de" | "en"; eager?: boolean }) {
  return (
    <figure className={`jn-photo-frame jn-photo-frame--${size}`}>
      {/* native srcset: images are served unoptimised site-wide, so next/image
          would ship one width to every screen */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${f.src}-1600.jpg`}
        srcSet={`${f.src}-960.jpg 960w, ${f.src}-1600.jpg 1600w`}
        sizes={SIZES[size]}
        width={1600}
        height={2000}
        alt={f.alt[lang]}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
      />
    </figure>
  );
}

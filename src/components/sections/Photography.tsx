"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { photoSections, allPhotos, srcOf, srcSetOf, type Photo } from "@/lib/photography";

/**
 * PHOTOGRAPHY — the selection, by shoot: at most three frames each, set as one
 * row at a shared height (each frame's width follows its own ratio), so every
 * photograph is shown whole: no crop, no stretch. A click opens it large.
 */
export default function Photography() {
  const { lang } = useLang();
  const c = content[lang].photo;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="photography" className="jn-chapter jn-sec" aria-labelledby="photography-title">
      <h2 id="photography-title" className="jn-chapter-title display">
        {c.title}
      </h2>

      {photoSections.map((s) => (
        <div key={s.id} className="jn-gal-section" aria-labelledby={`gal-${s.id}`}>
          <div className="jn-gal-head">
            <h3 id={`gal-${s.id}`} className="jn-gal-title">
              {s.title[lang]}
            </h3>
          </div>
          <div className="jn-gal jn-gal--shoots">
            {s.shoots.map((sh) => {
              /* up to three frames share one row. A larger shoot opens with a
                 landscape lead alone and the rest beneath; four portraits are
                 set as two pairs, so no frame stands alone at the edge */
              const lead = sh.photos[0];
              const rows =
                sh.photos.length <= 3
                  ? [sh.photos]
                  : lead.w > lead.h
                    ? [sh.photos.slice(0, 1), sh.photos.slice(1)]
                    : [sh.photos.slice(0, 2), sh.photos.slice(2)];
              return (
                <figure key={sh.id} className="jn-shoot" aria-label={sh.name}>
                  {rows.map((row, r) => {
                    const sum = row.reduce((a, ph) => a + ph.w / ph.h, 0);
                    return (
                      <div
                        key={r}
                        className="jn-gal-row"
                        style={{ "--sum": sum.toFixed(4), "--n": row.length } as CSSProperties}
                      >
                        {row.map((ph) => {
                          const ar = ph.w / ph.h;
                          return (
                            <button
                              key={ph.id}
                              type="button"
                              className="jn-gal-item"
                              style={{ "--ar": ar.toFixed(4) } as CSSProperties}
                              onClick={() => setOpen(allPhotos.indexOf(ph))}
                              aria-label={`${c.enlarge}: ${ph.alt[lang]}`}
                              aria-haspopup="dialog"
                            >
                              {/* native srcset: images are served unoptimised
                                  site-wide, so next/image would ship one width */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={srcOf(ph, ph.widths[Math.min(1, ph.widths.length - 1)])}
                                srcSet={srcSetOf(ph)}
                                sizes={`(max-width: 767px) 100vw, ${Math.round((ar / sum) * 92)}vw`}
                                width={ph.w}
                                height={ph.h}
                                alt={ph.alt[lang]}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                  {/* the shoot, set like a caption: name, place, year */}
                  <figcaption className="jn-shoot-cap">
                    <span className="jn-shoot-name">{sh.name}</span>
                    <span className="label text-muted">
                      {[sh.place, sh.year].filter(Boolean).join(" · ")}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      ))}

      <Lightbox index={open} onIndex={setOpen} lang={lang} labels={c} />
    </section>
  );
}

function Lightbox({
  index,
  onIndex,
  lang,
  labels,
}: {
  index: number | null;
  onIndex: (i: number | null) => void;
  lang: "de" | "en";
  labels: { close: string; prev: string; next: string; enlarge: string };
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const n = allPhotos.length;
  const ph: Photo | null = index === null ? null : allPhotos[index];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + n) % n);
    },
    [index, n, onIndex],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  return (
    <dialog
      ref={ref}
      className="jn-lightbox"
      aria-label={ph ? ph.alt[lang] : undefined}
      onClose={() => onIndex(null)}
      /* a click on the dark ground (the dialog itself) closes; clicks on the
         photo or the controls do not */
      onClick={(e) => {
        if (e.target === e.currentTarget) onIndex(null);
      }}
    >
      {ph && (
        <>
          <figure className="jn-lightbox-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={ph.id}
              src={srcOf(ph, ph.widths[ph.widths.length - 1])}
              srcSet={srcSetOf(ph)}
              sizes="100vw"
              width={ph.w}
              height={ph.h}
              alt={ph.alt[lang]}
            />
            <figcaption className="jn-lightbox-cap label">
              <span>{ph.shoot}</span>
              <span className="tabular-nums">
                {String((index ?? 0) + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="jn-lightbox-btn jn-lightbox-close label" onClick={() => onIndex(null)}>
            {labels.close}
          </button>
          <button type="button" className="jn-lightbox-btn jn-lightbox-prev label" onClick={() => step(-1)} aria-label={labels.prev}>
            ←
          </button>
          <button type="button" className="jn-lightbox-btn jn-lightbox-next label" onClick={() => step(1)} aria-label={labels.next}>
            →
          </button>
        </>
      )}
    </dialog>
  );
}

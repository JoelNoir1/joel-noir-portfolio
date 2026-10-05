"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import {
  photoProjects,
  designProjects,
  compOf,
  plateOf,
  type ArtworkStage,
  type Project,
} from "@/lib/projects";
import { artworkVars, plateSide } from "@/lib/artwork";
import PhotoSeries from "@/components/work/PhotoSeries";

const FiratMobile = dynamic(
  () => import("@/components/work/firat/FiratSurface").then((m) => m.FiratMobile),
  { ssr: false },
);

/* The real Firat mobile UI is 390 x 800. */
const FIRAT_ASPECT = 390 / 800;

/**
 * SELECTED WORK — two chapters, read top to bottom: photography, then the
 * design work. Each opens on a hairline with its registration mark and a
 * display title. Scrolling only scrolls: no stage, no transition, no reveal.
 */
export default function Work() {
  const { lang } = useLang();
  const c = content[lang].index;

  return (
    <section id="index" className="jn-work" aria-label={c.eyebrow}>
      {photoProjects.map((p) => (
        <div key={p.slug} className="jn-chapter jn-sec" aria-labelledby="work-photography">
          <h2 id="work-photography" className="jn-chapter-title display">
            {c.photography}
          </h2>
          <PhotoSeries
            lang={lang}
            lead={{
              frame: { src: p.image.replace(/\.jpg$/, ""), alt: p.alt ?? { de: p.title, en: p.title } },
              caption: p.subject,
              intro: (
                <>
                  <p className="jn-photo-title">{p.title}</p>
                  <p className="label mt-3 tabular-nums text-muted">{p.year}</p>
                </>
              ),
            }}
            rows={p.series ?? []}
          />
        </div>
      ))}

      <div className="jn-chapter jn-sec" aria-labelledby="work-design">
        <h2 id="work-design" className="jn-chapter-title display">
          {c.design}
        </h2>
        <ol className="jn-work-list">
          {designProjects.map((p) => (
            <DesignWork key={p.slug} p={p} lang={lang} />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Where a design work sits on the page — the composition it already has. */
function stageOf(p: Project): { stage: ArtworkStage; below: boolean } {
  const comp = compOf(p.slug);
  if (comp.artwork) return { stage: comp.artwork, below: false };
  /* web work: Firat as its real mobile UI (a portrait column), everything
     else as its landscape screen, wide enough to read, caption beneath */
  if (comp.surface === "firat") {
    return { stage: { aspect: FIRAT_ASPECT, fit: 0.86, maxW: 0.46, ax: "gutter-right", ay: 0 }, below: false };
  }
  return { stage: { aspect: 16 / 10, fit: 0.78, maxW: 0.9, ax: "gutter", ay: 0 }, below: true };
}

function DesignWork({ p, lang }: { p: Project; lang: "de" | "en" }) {
  const comp = compOf(p.slug);
  const { stage, below } = stageOf(p);
  const side = below ? "below" : plateSide(stage);

  return (
    <li className="jn-work-item" data-side={side}>
      <Link
        href={`/work/${p.slug}`}
        aria-label={`${p.title} — ${p.category[lang]}, ${p.year}`}
        className="jn-work-link"
        style={artworkVars(stage) as CSSProperties}
      >
        <span className={`jn-work-media${comp.surface === "firat" ? " jn-work-media--firat" : ""}`}>
          {comp.surface === "firat" ? (
            /* the real mobile design, native and sharp — never a shrunk desktop */
            <FiratMobileFit />
          ) : (
            <Image
              src={p.image}
              alt={p.alt?.[lang] ?? p.title}
              fill
              sizes="(max-width: 767px) 92vw, 46vw"
              className="object-cover"
            />
          )}
        </span>
        {/* name, discipline, year: set right beside the work it belongs to */}
        <span className="jn-info">
          <span className="jn-info-num">{plateOf(p.slug)}</span>
          <h3 className="jn-info-name">
            {p.title}
            <i className="jn-plate-rule" aria-hidden="true" />
          </h3>
          <span className="jn-info-cat">{p.category[lang].split("·").map((seg) => seg.trim()).join(" · ")}</span>
          <span className="jn-info-year">{p.year}</span>
        </span>
      </Link>
    </li>
  );
}

/** Fits the real 390px-wide Firat mobile layout into its column. */
function FiratMobileFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const fit = () => setS((ref.current?.clientWidth ?? 390) / 390);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <div ref={ref} className="fr-fit-m firat-scope bg-[#17100b]">
      <div style={{ transform: `scale(${s})` }}>
        <FiratMobile />
      </div>
    </div>
  );
}

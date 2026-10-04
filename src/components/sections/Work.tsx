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
 * SELECTED WORK — one page, read top to bottom. Photography first, then the
 * design work, each piece complete at its own format on the page gutter.
 * Scrolling only scrolls: no stage, no transition between works, no reveal.
 */
export default function Work() {
  const { lang } = useLang();
  const c = content[lang].index;

  return (
    <section id="index" className="jn-work border-t border-line" aria-label={c.eyebrow}>
      {photoProjects.map((p) => (
        <div key={p.slug} className="jn-work-group" aria-labelledby="work-photography">
          <div className="jn-work-head">
            <h2 id="work-photography" className="label text-muted">
              {c.photography}
            </h2>
            <p className="jn-work-note label">
              <span>{p.title}</span>
              <span className="tabular-nums">{p.year}</span>
            </p>
          </div>
          <PhotoSeries
            lang={lang}
            eager={1}
            /* the opening portrait first, then the series as on its own page */
            rows={[
              {
                frames: [{ src: p.image.replace(/\.jpg$/, ""), alt: p.alt ?? { de: p.title, en: p.title } }],
                fit: compOf(p.slug).artwork?.fit ?? 0.84,
                ax: "gutter-right",
                caption: p.subject,
              },
              ...(p.series ?? []),
            ]}
          />
        </div>
      ))}

      <div className="jn-work-group" aria-labelledby="work-design">
        <div className="jn-work-head">
          <h2 id="work-design" className="label text-muted">
            {c.design}
          </h2>
        </div>
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
  const artMode = Boolean(comp.artwork);
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
        {/* the plate line, set on paper beside the work */}
        <span className={`jn-plate jn-plate--static${artMode ? " jn-plate--art" : ""}`}>
          <span className="jn-plate-num">{plateOf(p.slug)}</span>
          <span className="jn-plate-body">
            {artMode ? (
              /* the artwork carries its own name; the line does not repeat it */
              <h3 className="jn-plate-name jn-plate-name--silent">{p.title}</h3>
            ) : (
              <h3 className="jn-plate-name jn-plate-name--web">
                {p.title}
                <i className="jn-plate-rule" aria-hidden="true" />
              </h3>
            )}
            <span className="jn-plate-meta">
              {p.category[lang].split("·").map((seg) => (
                <span key={seg}>{seg.trim()}</span>
              ))}
              <span className="jn-plate-year">{p.year}</span>
            </span>
          </span>
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

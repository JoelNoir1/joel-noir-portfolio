"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { designProjects, compOf, plateOf, type Project } from "@/lib/projects";

const FiratMobile = dynamic(
  () => import("@/components/work/firat/FiratSurface").then((m) => m.FiratMobile),
  { ssr: false },
);

/* The real Firat mobile UI is 390 x 800. */
const FIRAT_ASPECT = 390 / 800;

/** Each work's own format: posters 4:5, Firat its phone UI, web screens 16:10. */
function aspectOf(p: Project): number {
  const comp = compOf(p.slug);
  if (comp.artwork) return comp.artwork.aspect;
  if (comp.surface === "firat") return FIRAT_ASPECT;
  return 16 / 10;
}

/** Two rows: the posters together, then poster, live UI and web work. */
const ROWS = 2;

/**
 * DESIGN — a compact selection, set like the photography: rows at one shared
 * height, every work whole at its own format, its name, discipline and year
 * beneath. Each opens its case.
 */
export default function Work() {
  const { lang } = useLang();
  const c = content[lang].index;
  const per = Math.ceil(designProjects.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) => designProjects.slice(r * per, r * per + per));

  return (
    <section id="design" className="jn-chapter jn-sec" aria-labelledby="design-title">
      <h2 id="design-title" className="jn-chapter-title display">
        {c.design}
      </h2>
      <div className="jn-gal">
        {rows.map((row, r) => {
          const sum = row.reduce((a, p) => a + aspectOf(p), 0);
          return (
            <div
              key={r}
              className="jn-gal-row jn-design-row"
              style={{ "--sum": sum.toFixed(4), "--n": row.length } as CSSProperties}
            >
              {row.map((p) => (
                <DesignWork key={p.slug} p={p} lang={lang} ar={aspectOf(p)} sum={sum} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DesignWork({ p, lang, ar, sum }: { p: Project; lang: "de" | "en"; ar: number; sum: number }) {
  const firat = compOf(p.slug).surface === "firat";
  return (
    <Link
      href={`/work/${p.slug}`}
      aria-label={`${p.title} — ${p.category[lang]}, ${p.year}`}
      className="jn-design-item"
      style={{ "--ar": ar.toFixed(4) } as CSSProperties}
    >
      <span className="jn-design-media">
        {firat ? (
          /* the real mobile design, native and sharp — never a shrunk desktop */
          <FiratMobileFit />
        ) : (
          <Image
            src={p.image}
            alt={p.alt?.[lang] ?? p.title}
            fill
            sizes={`(max-width: 767px) 100vw, ${Math.round((ar / sum) * 92)}vw`}
            className="object-cover"
          />
        )}
      </span>
      {/* name, discipline, year */}
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
  );
}

/** Fits the real 390px-wide Firat mobile layout into its column. */
function FiratMobileFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setS(el.clientWidth / 390);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="fr-fit-m firat-scope bg-[#17100b]">
      <div style={{ transform: `scale(${s})` }}>
        <FiratMobile />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const FiratSurface = dynamic(() => import("@/components/work/firat/FiratSurface"), {
  ssr: false,
});
const FiratMobileCase = dynamic(
  () => import("@/components/work/firat/FiratSurface").then((m) => m.FiratMobileCase),
  { ssr: false },
);
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { compOf, type Bi, type Project } from "@/lib/projects";
import { artworkVars, plateSide } from "@/lib/artwork";
import type { CaseStudy } from "@/lib/caseStudies";
import Footer from "@/components/layout/Footer";
import PhotoSeries from "@/components/work/PhotoSeries";

export default function ProjectDetail({
  project,
  study,
  next,
}: {
  project: Project;
  study: CaseStudy | null;
  next: { slug: string; title: string; category: Bi; year: string; plate: string };
}) {
  const { lang, setLang } = useLang();
  const t = content[lang].project;
  const dd = study?.designDirection;
  const comp = compOf(project.slug);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ARTWORK MODE — the case hero shows the work complete at its own format,
     on the gutter. The geometry is the artworkRect formula written in CSS, so
     it is right on the very first paint (no measure, no hydration mismatch)
     and stays right on resize without a listener. */
  const art = comp.artwork;
  const artVars = art ? (artworkVars(art) as CSSProperties) : undefined;

  /* VISUAL CASE — only for artwork-mode work flagged as such. Every other case
     page renders exactly the DOM it rendered before. */
  const visual = project.caseKind === "visual" && Boolean(art);
  const series = visual ? project.series : undefined;
  const nextLabel = `${lang === "de" ? "Nächste Arbeit" : "Next work"}: ${next.title} — ${
    next.category[lang]
  }, ${next.year}`;

  /* CASE HEADER OVER PHOTOGRAPHY — difference blending inverts cleanly over
     dark and over paper, but over a mid-grey photo it lands on mid-grey. While
     the header line is still over an image hero (the web cases), it is set in
     plain paper with a tight shadow instead; once the hero has scrolled out
     from under it, the blend takes over again for paper and footer. */
  const photoHero = !art;
  const [overPhoto, setOverPhoto] = useState(photoHero);
  const headRef = useRef<HTMLElement>(null);
  const inactive = overPhoto ? "opacity-[0.82]" : "opacity-65";
  useEffect(() => {
    if (!photoHero) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const bottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      /* hand over while the hero's dark lower edge still fills the header
         box — never with the type straddling the edge onto paper */
      setOverPhoto(bottom > (headRef.current?.offsetHeight ?? 64));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [photoHero]);

  const hero = (
    <>
        {/* full-bleed hero */}
        <div
          ref={heroRef}
          style={artVars}
          className={`jn-hero relative h-[100svh] w-full overflow-hidden ${
            art ? "jn-hero--art" : "bg-paper-2"
          }${visual ? " jn-hero--visual" : ""}${comp.surface === "firat" ? " jn-hero--firat" : ""}`}
        >
          <div className={art ? "jn-art-frame" : "jn-hero-media absolute inset-0"}>
            {comp.surface === "firat" ? (
              /* the client's real UI on its own brand ground, not a screenshot */
              <>
                <div className="jn-firat-desk absolute inset-0 bg-[#17100b]">
                  <Image src="/work/firat-stage.webp" alt="" fill priority sizes="100vw" className="object-cover" />
                  {/* nudged down so the client's wordmark clears the Joel.Noir header */}
                  <div className="absolute inset-0 translate-y-[2.75rem]">
                    <FiratSurface progress={0} />
                  </div>
                </div>
                {/* phone: the client's own mobile layout, full width — not the
                    desktop surface shrunk to a third of its size */}
                <div className="jn-firat-m">
                  <FiratMobileCase />
                </div>
              </>
            ) : (
              <Image
                src={comp.stage ?? project.image}
                alt={project.alt?.[lang] ?? project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{
                  objectPosition: `${comp.focus[0] * 100}% ${comp.focus[1] * 100}%`,
                  transform: `scale(${comp.scale})`,
                  transformOrigin: `${comp.focus[0] * 100}% ${comp.focus[1] * 100}%`,
                }}
              />
            )}
          </div>

          {/* an artwork on open ground needs no gradient graded over it */}
          {!art && <div className="jn-hero-scrim pointer-events-none absolute inset-0" />}

          <div
            className={
              art
                ? "jn-art-caption"
                : "jn-onimg absolute inset-x-0 bottom-0 px-[clamp(1.25rem,5vw,3.5rem)] pb-[clamp(2.5rem,7vh,4.5rem)]"
            }
            /* the caption in the open margin, mirrored side included */
            data-side={art ? plateSide(art) : undefined}
          >
            {visual ? (
              /* VISUAL CASE NOTE — exactly what the poster cannot say, on one
                 line: discipline and year. The name is in the artwork; for
                 assistive tech it stays the page's h1. A photograph carries no
                 name, so a series sets its title in that slot instead, and the
                 person in the opening frame once above it. */
              <>
                <div>
                  {project.subject && (
                    <p className="jn-visual-subject label">{project.subject}</p>
                  )}
                  <p className="jn-visual-note label">
                    <span>{series ? project.title : project.category[lang]}</span>
                    <span className="tabular-nums">{project.year}</span>
                  </p>
                </div>
                <h1 className="sr-only">{project.title}</h1>
              </>
            ) : (
            <div className={art ? undefined : "mx-auto max-w-[1500px]"}>
              <span
                className="label block text-paper/80"
              >
                {project.category[lang]}
              </span>
              {comp.title === "type" ? (
                <h1
                  className="jn-title-reveal display mt-3 text-[clamp(2.6rem,11vw,8rem)] text-paper"
                >
                  {project.title}
                </h1>
              ) : art?.carriesClient ? (
                /* the club block / the gym's mark is printed inside the artwork
                   standing right next to this line — setting it again here is
                   the one thing ARTWORK MODE exists to stop. The year takes the
                   slot instead: information the poster does not carry. */
                <span
                  className="label mt-3 block tabular-nums text-paper/55"
                >
                  {project.year}
                </span>
              ) : comp.title === "meta" ? (
                /* the visible project name is the page's h1 (web cases) —
                   same classes, same render; preflight gives h1 no styling */
                <h1
                  className="serif mt-3 block text-[clamp(1.4rem,3vw,2.4rem)] font-light text-paper"
                >
                  {project.title}
                </h1>
              ) : (
                <span
                  className="serif mt-3 block text-[clamp(1.4rem,3vw,2.4rem)] font-light text-paper"
                >
                  {project.client[lang]}
                </span>
              )}
              {/* keep the project name reachable for assistive tech even when the
                  artwork carries it visually */}
              {comp.title === "artwork" && <h1 className="sr-only">{project.title}</h1>}
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
                {study && (
                  <span className="serif text-[clamp(1rem,2vw,1.4rem)] font-light text-paper/85">
                    {study.role[lang]}
                  </span>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jn-live label inline-flex items-center gap-2 border border-paper/70 px-4 py-2.5 text-paper hover:bg-paper hover:text-ink"
                  >
                    {t.live} ↗
                  </a>
                )}
              </div>
            </div>
            )}
          </div>
        </div>
    </>
  );

  /* VISUAL CASE EXIT — the next work announced the way the list announces
     work: plate number, name, discipline, year. One link, not a heading: a
     project's page should not carry another project's name as its outline. */
  const exit = (
    <nav className="jn-exit" data-side={art ? plateSide(art) : undefined}>
      <Link href={`/work/${next.slug}`} className="jn-exit-link" aria-label={nextLabel}>
        <span className="jn-plate-num">{next.plate}</span>
        <span className="jn-plate-name jn-plate-name--work">
          {next.title}
          <i className="jn-plate-rule" aria-hidden="true" />
        </span>
        <span className="jn-plate-meta">
          {next.category[lang].split("·").map((seg) => (
            <span key={seg}>{seg.trim()}</span>
          ))}
          <span className="jn-plate-year">{next.year}</span>
        </span>
        <span className="jn-exit-mark" aria-hidden="true">↗</span>
      </Link>
    </nav>
  );

  return (
    <div id="top">
      {/* text-paper + difference on the positioned header itself: light over the
          dark stage, ink over paper. On the children it never worked — the
          header's own z-index opened a stacking context, so they blended
          against nothing and stayed paper-coloured on paper. */}
      <header
        ref={headRef}
        className={`fixed inset-x-0 top-0 z-50 text-paper ${
          overPhoto ? "jn-head-photo" : "mix-blend-difference"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-[clamp(1.25rem,5vw,3.5rem)] py-5">
          <Link
            href="/"
            className="font-display text-[1.05rem] font-extrabold uppercase tracking-[-0.03em]"
          >
            Joel.Noir
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/#index" className="label transition-opacity hover:opacity-70">
              ← {t.all}
            </Link>
            <div className="label flex items-center gap-1">
              {/* inactive language at 0.65: AA for small text on the dark stage and on
                  paper; over a photo hero 0.82, the lowest that holds AA on mid-grey */}
              <button onClick={() => setLang("de")} className={lang === "de" ? "" : inactive}>DE</button>
              <span className="opacity-50">/</span>
              <button onClick={() => setLang("en")} className={lang === "en" ? "" : inactive}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {visual ? (
        /* THE ARTWORK IS THE CASE: the stage, one note, the next work. */
        <main className="jn-visual">
          {hero}
          {/* PHOTO SERIES — the frames after the hero, in page flow */}
          {series && <PhotoSeries rows={series} lang={lang} />}
          {exit}
        </main>
      ) : (
        <>
          {hero}

          <main className="relative z-10 bg-paper">
            <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,3.5rem)]">
              {/* intro + spec */}
              <div className="grid gap-8 border-b border-line py-[clamp(2.5rem,6vw,4.5rem)] md:grid-cols-[1.5fr_1fr] md:items-start">
                <div>
                  <p className="serif max-w-[24ch] text-[clamp(1.4rem,2.8vw,2.1rem)] font-light leading-[1.3] text-ink">
                    {study ? study.intro[lang] : project.tagline?.[lang]}
                  </p>
                </div>
                {/* one row per fact at every width — three columns on a phone crushed
                    label and value into each other */}
                <dl className="grid grid-cols-1 gap-3 font-mono text-xs">
                  <div className="flex justify-between gap-2 border-b border-line pb-2">
                    <dt className="label text-faint">{t.client}</dt>
                    <dd className="text-right text-ink">{project.client[lang]}</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-line pb-2">
                    <dt className="label text-faint">{t.field}</dt>
                    <dd className="text-right text-ink">{project.category[lang]}</dd>
                  </div>
                  <div className="flex justify-between gap-2 border-b border-line pb-2">
                    <dt className="label text-faint">{t.year}</dt>
                    <dd className="tabular-nums text-right text-ink">{project.year}</dd>
                  </div>
                </dl>
              </div>

              {/* design direction (web projects) */}
              {dd && (
                <div className="border-b border-line py-[clamp(2.5rem,6vw,5rem)]">
                  <h2 className="label text-muted">Design Direction</h2>
                  <div className="mt-8 grid gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-2">
                    <div>
                      <div className="flex flex-wrap gap-x-6 gap-y-4">
                        {dd.palette.map((col) => (
                          <div key={col.hex} className="flex items-center gap-3">
                            <span
                              className="h-9 w-9 rounded-full border border-line"
                              style={{ background: col.hex }}
                            />
                            <span className="font-mono text-[0.7rem] uppercase leading-tight tracking-widest text-muted">
                              {col.name}
                              <br />
                              <span className="tabular-nums text-faint">{col.hex}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="serif mt-9 max-w-[34ch] text-[clamp(1.1rem,1.8vw,1.4rem)] font-light text-ink">
                        {dd.typeNote[lang]}
                      </p>
                    </div>
                    <div>
                      <h3 className="label text-faint">{lang === "de" ? "Umfang" : "Scope"}</h3>
                      <ul className="mt-5 grid gap-2 text-ink sm:grid-cols-2">
                        {dd.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-ink" />
                            {cap[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {study && (
                <>
                  <div className="grid gap-x-8 gap-y-[clamp(2rem,5vw,3.5rem)] border-b border-line py-[clamp(2.5rem,6vw,5rem)] md:grid-cols-2">
                    {study.sections.map((s, i) => (
                      <div key={i}>
                          <h2 className="label text-ink">{s.heading[lang]}</h2>
                          <p className="mt-3 max-w-[46ch] text-lg leading-relaxed text-muted">
                            {s.body[lang]}
                          </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-b border-line py-[clamp(2.5rem,6vw,5rem)]">
                    <h2 className="label text-muted">{t.overview}</h2>
                    <div className="mt-8 flex flex-wrap gap-[clamp(1.5rem,3vw,2.5rem)]">
                      {study.gallery.map((g, i) => (
                        <div
                          key={i}
                          className={
                            g.span === "half"
                              ? "w-full md:w-[calc(50%-1.25rem)]"
                              : "w-full"
                          }
                        >
                          <figure>
                            <div
                              className={`relative w-full overflow-hidden bg-paper-2 ${
                                g.span === "half" ? "aspect-[4/3]" : "aspect-[16/9]"
                              }`}
                            >
                              <Image
                                src={g.src}
                                alt={g.label[lang]}
                                fill
                                sizes="(max-width:768px) 100vw, 50vw"
                                className="object-cover"
                              />
                            </div>
                            <figcaption className="label mt-3 text-muted">
                              {g.label[lang]}
                            </figcaption>
                          </figure>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* next */}
              <Link
                href={`/work/${next.slug}`}
                className="jn-next group flex items-center justify-between py-[clamp(2.5rem,6vw,4.5rem)]"
              >
                <div>
                  <span className="label text-muted">{t.next}</span>
                  <div className="display mt-3 text-[clamp(2rem,6vw,4.5rem)] text-ink transition-opacity duration-300 group-hover:opacity-55">
                    {next.title}
                  </div>
                </div>
                <span className="font-display text-4xl text-ink transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

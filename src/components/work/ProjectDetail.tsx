"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { categories, type Project } from "@/lib/projects";
import type { CaseStudyDetail } from "@/lib/caseStudies";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectDetail({
  project,
  detail,
  next,
}: {
  project: Project;
  detail: CaseStudyDetail | null;
  next: { slug: string; title: string };
}) {
  const { lang, setLang } = useLang();

  const t = {
    all: lang === "de" ? "Alle Arbeiten" : "All work",
    client: lang === "de" ? "Kunde" : "Client",
    year: lang === "de" ? "Jahr" : "Year",
    field: lang === "de" ? "Disziplin" : "Discipline",
    process: lang === "de" ? "Der Prozess" : "The process",
    next: lang === "de" ? "Nächstes Projekt" : "Next project",
    challenge: lang === "de" ? "Herausforderung" : "Challenge",
    idea: lang === "de" ? "Idee" : "Idea",
    craft: lang === "de" ? "Umsetzung" : "Craft",
    result: lang === "de" ? "Ergebnis" : "Result",
  };

  const stepLabel: Record<string, { de: string; en: string }> = {
    composite: { de: "Komposition", en: "Composition" },
    particles: { de: "Atmosphäre", en: "Atmosphere" },
    final: { de: "Finale", en: "Final" },
  };

  return (
    <div id="top">
      {/* minimal header */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-noir/80 to-transparent"
        />
        <div className="relative mx-auto flex max-w-[1500px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-5">
          <Link
            href="/"
            data-cursor-hover
            className="font-display text-lg font-extrabold tracking-[-0.04em] text-bone"
          >
            Joel<span className="text-flame">.</span>Noir
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/#work"
              data-cursor-hover
              className="eyebrow text-bone/70 transition-colors hover:text-bone"
            >
              ← {t.all}
            </Link>
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setLang("de")}
                className={lang === "de" ? "text-flame" : "text-ash hover:text-bone"}
              >
                DE
              </button>
              <span className="text-ash/40">/</span>
              <button
                onClick={() => setLang("en")}
                className={lang === "en" ? "text-flame" : "text-ash hover:text-bone"}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)] pt-[clamp(7rem,15vw,11rem)]">
        {/* title block */}
        <div className="grid gap-8 border-b border-line pb-[clamp(2rem,5vw,3.5rem)] md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <motion.span
              className="eyebrow text-flame"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              {categories[project.category][lang]}
            </motion.span>
            <motion.h1
              className="display mt-4 text-[clamp(2.5rem,9vw,7rem)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.05 }}
            >
              {project.title}
            </motion.h1>
            {project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="mt-6 inline-flex items-center gap-2 border border-flame px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-flame transition-colors hover:bg-flame hover:text-noir"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {lang === "de" ? "Live ansehen" : "View live"} ↗
              </motion.a>
            )}
          </div>
          <motion.dl
            className="grid grid-cols-3 gap-4 font-mono text-xs md:grid-cols-1 md:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="uppercase tracking-widest text-ash">{t.client}</dt>
              <dd className="text-bone">{project.client}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="uppercase tracking-widest text-ash">{t.field}</dt>
              <dd className="text-bone">{categories[project.category][lang]}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="uppercase tracking-widest text-ash">{t.year}</dt>
              <dd className="text-bone">{project.year}</dd>
            </div>
          </motion.dl>
        </div>

        {/* cover */}
        <motion.div
          className="relative mt-[clamp(2rem,5vw,4rem)] h-[62vh] w-full overflow-hidden md:h-[80vh]"
          initial={{ clipPath: "inset(6% 6% 6% 6%)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </motion.div>

        {/* intro */}
        <div className="mx-auto max-w-[62ch] py-[clamp(3.5rem,9vw,7rem)]">
          <Reveal>
            <p className="text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-[-0.02em] text-bone">
              {detail ? detail.intro[lang] : project.tagline[lang]}
            </p>
          </Reveal>
        </div>

        {detail && (
          <>
            {/* story grid */}
            <div className="grid gap-x-8 gap-y-[clamp(2.5rem,5vw,4rem)] border-t border-line py-[clamp(3rem,7vw,6rem)] md:grid-cols-2">
              {(
                [
                  ["challenge", t.challenge],
                  ["idea", t.idea],
                  ["craft", t.craft],
                  ["result", t.result],
                ] as const
              ).map(([key, label]) => (
                <Reveal key={key}>
                  <div>
                    <h2 className="eyebrow text-flame">{label}</h2>
                    <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ash">
                      {detail.story[key][lang]}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* process */}
            <div className="border-t border-line py-[clamp(3rem,7vw,6rem)]">
              <div className="flex items-baseline justify-between">
                <h2 className="headline text-[clamp(1.8rem,4vw,3rem)]">
                  {t.process}
                </h2>
                <span className="font-mono text-xs text-ash">
                  {String(detail.process.length).padStart(2, "0")}{" "}
                  {lang === "de" ? "Schritte" : "steps"}
                </span>
              </div>

              <div className="mt-[clamp(2rem,5vw,4rem)] flex flex-col gap-[clamp(2.5rem,6vw,5rem)]">
                {detail.process.map((s, i) => (
                  <Reveal key={s.image}>
                    <figure>
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-flame">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="eyebrow text-bone">
                          {stepLabel[s.step][lang]}
                        </span>
                      </div>
                      <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden bg-ink sm:aspect-[16/10]">
                        <Image
                          src={s.image}
                          alt={stepLabel[s.step][lang]}
                          fill
                          sizes="100vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <figcaption className="mt-3 max-w-[60ch] text-sm text-ash">
                        {s.caption[lang]}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </>
        )}

        {/* next project */}
        <Link
          href={`/work/${next.slug}`}
          data-cursor-hover
          className="group flex items-center justify-between border-t border-line py-[clamp(2.5rem,6vw,5rem)]"
        >
          <div>
            <span className="eyebrow text-ash">{t.next}</span>
            <h2 className="display mt-3 text-[clamp(2rem,6vw,5rem)] transition-colors duration-300 group-hover:text-flame">
              {next.title}
            </h2>
          </div>
          <span className="font-display text-4xl text-flame transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}

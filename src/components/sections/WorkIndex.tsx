"use client";

import Image from "next/image";
import { useState, useRef, type MouseEvent } from "react";
import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { projects, categories, type CategoryKey } from "@/lib/projects";

const filterKeys: (CategoryKey | "all")[] = [
  "all",
  "fight",
  "sports",
  "event",
  "commercial",
  "editorial",
];

export default function WorkIndex() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<CategoryKey | "all">("all");
  const [preview, setPreview] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const list =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);
  const previewProject = projects.find((p) => p.slug === preview);

  const t = {
    eyebrow: lang === "de" ? "Archiv" : "Archive",
    title: lang === "de" ? "Alle Arbeiten" : "All work",
    all: lang === "de" ? "Alle" : "All",
  };

  const onMove = (e: MouseEvent) => {
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 130}px, 0)`;
    }
  };

  return (
    <section
      id="index"
      onMouseMove={onMove}
      className="border-t border-line py-[clamp(4.5rem,11vw,9rem)]"
    >
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-flame">{t.eyebrow}</span>
            <h2 className="headline mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              {t.title}
            </h2>
          </div>
          {/* filters */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest">
            {filterKeys.map((k) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                data-cursor-hover
                className={
                  filter === k
                    ? "text-flame"
                    : "text-ash transition-colors hover:text-bone"
                }
              >
                {k === "all" ? t.all : categories[k][lang]}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-[clamp(2rem,5vw,3.5rem)]">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="border-t border-line last:border-b"
            >
              <a
                href={`/work/${p.slug}`}
                data-cursor-hover
                onMouseEnter={() => setPreview(p.slug)}
                onMouseLeave={() => setPreview(null)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[3rem_1fr_1fr_auto] md:gap-8 md:py-6"
              >
                <span className="font-mono text-xs text-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-bone transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                  {p.title}
                </h3>
                <span className="hidden font-mono text-xs uppercase tracking-widest text-ash md:block">
                  {categories[p.category][lang]}
                </span>
                <span className="font-mono text-xs text-ash">{p.year}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* floating hover preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-52 overflow-hidden md:block"
        style={{ opacity: previewProject ? 1 : 0, transition: "opacity .25s ease" }}
      >
        {previewProject && (
          <Image
            src={previewProject.image}
            alt=""
            fill
            sizes="208px"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}

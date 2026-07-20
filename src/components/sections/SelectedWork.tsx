"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { featuredProjects, categories } from "@/lib/projects";
import { scrollToId } from "@/lib/lenis";

export default function SelectedWork() {
  const { lang } = useLang();
  const c = content[lang].work;

  return (
    <section id="work" className="border-t border-line py-[clamp(4.5rem,11vw,9rem)]">
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow text-flame">{c.eyebrow}</span>
            <h2 className="headline mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              {c.title}
            </h2>
          </div>
          <button
            onClick={() => scrollToId("index")}
            data-cursor-hover
            className="eyebrow hidden shrink-0 text-ash transition-colors hover:text-bone md:block"
          >
            {c.all} →
          </button>
        </div>

        <div className="mt-[clamp(2.5rem,6vw,5rem)] grid grid-cols-1 gap-x-8 gap-y-[clamp(2.5rem,6vw,5rem)] md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/work/${p.slug}`}
              data-cursor-hover
              className={`group block ${i % 2 === 1 ? "md:mt-28" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute left-5 top-4 font-mono text-xs tracking-widest text-bone/85 mix-blend-difference">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-5 top-4 font-mono text-[0.65rem] uppercase tracking-widest text-bone/80 mix-blend-difference">
                  {categories[p.category][lang]}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em] md:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-1 max-w-[38ch] text-sm text-ash">
                    {p.tagline[lang]}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-ash">
                  {p.year}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

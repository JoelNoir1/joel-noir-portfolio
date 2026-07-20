"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { categories, projects, type CategoryKey } from "@/lib/projects";

const order: CategoryKey[] = ["fight", "sports", "event", "commercial", "editorial"];

const blurb: Record<CategoryKey, { de: string; en: string }> = {
  fight: {
    de: "Kampfsport-Keyvisuals mit roher Präsenz.",
    en: "Fight-sport key visuals with raw presence.",
  },
  sports: {
    de: "Matchday-Grafiken und Spieler-Branding.",
    en: "Matchday graphics and player branding.",
  },
  event: {
    de: "Club- und Event-Poster mit Attitüde.",
    en: "Club and event posters with attitude.",
  },
  commercial: {
    de: "Marken, Werbung und Service-Design.",
    en: "Brands, advertising and service design.",
  },
  editorial: {
    de: "Freie Studien in Form, Licht und Haltung.",
    en: "Free studies in form, light and posture.",
  },
};

export default function Disciplines() {
  const { lang } = useLang();
  const c = content[lang].disciplinesSection;

  return (
    <section
      id="disciplines"
      className="border-t border-line py-[clamp(4.5rem,11vw,9rem)]"
    >
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow text-flame">{c.eyebrow}</span>
            <h2 className="headline mt-4 text-[clamp(2rem,5vw,3.75rem)]">
              {c.title}
            </h2>
          </div>
          <p className="max-w-[46ch] self-end text-lg text-ash">{c.body}</p>
        </div>

        <ul className="mt-[clamp(2.5rem,6vw,5rem)]">
          {order.map((key, i) => {
            const count = projects.filter((p) => p.category === key).length;
            return (
              <motion.li
                key={key}
                className="group border-t border-line last:border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-5 py-6 md:gap-8 md:py-8">
                  <span className="font-mono text-xs text-flame">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.6rem] font-extrabold tracking-[-0.03em] text-bone transition-colors duration-300 group-hover:text-flame md:text-5xl">
                    {categories[key][lang]}
                  </h3>
                  <span className="ml-auto hidden max-w-[34ch] text-right text-sm text-ash lg:block">
                    {blurb[key][lang]}
                  </span>
                  <span className="ml-auto font-mono text-xs text-ash lg:ml-0">
                    {String(count).padStart(2, "0")}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

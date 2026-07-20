"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  const { lang } = useLang();
  const c = content[lang].about;

  return (
    <section
      id="about"
      className="border-t border-line py-[clamp(4.5rem,11vw,9rem)]"
    >
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="grid gap-[clamp(2.5rem,5vw,4.5rem)] md:grid-cols-[0.85fr_1.15fr] md:items-center">
          {/* portrait */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <Image
                src="/joel.jpg"
                alt="Joel — Creative Designer & Art Director"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
                className="object-cover object-[58%_18%]"
                style={{ filter: "grayscale(0.35) contrast(1.05) brightness(0.95)" }}
              />
              <div className="absolute inset-0 bg-flame/10 mix-blend-overlay" />
            </div>
          </Reveal>

          {/* text */}
          <div>
            <span className="eyebrow text-flame">{c.eyebrow}</span>
            <h2 className="headline mt-4 text-[clamp(1.8rem,4vw,3.25rem)]">
              {c.title}
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg text-ash">{c.body1}</p>
            <p className="mt-4 max-w-[54ch] text-lg text-ash">{c.body2}</p>

            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow text-ash">{c.skillsTitle}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <li
                      key={s}
                      className="border border-line px-3 py-1.5 text-sm text-bone"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="eyebrow text-ash">{c.toolsTitle}</h3>
                <ul className="mt-4 flex flex-col gap-1.5 text-sm text-bone">
                  {c.tools.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-flame" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

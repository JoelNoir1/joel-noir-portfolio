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
      className="border-t border-line px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(3.5rem,8vw,7rem)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <span className="label text-muted">{c.eyebrow}</span>

        <div className="mt-8 grid gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[1fr_1.2fr] md:items-start">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
              <Image
                src="/joel.jpg"
                alt="Joel Hildebrand"
                fill
                sizes="(max-width:768px) 100vw, 42vw"
                className="object-cover object-[58%_18%]"
                style={{ filter: "grayscale(1) contrast(1.04) brightness(1.02)" }}
              />
            </div>
          </Reveal>

          <div>
            <h2 className="serif max-w-[18ch] text-[clamp(1.8rem,4.6vw,3.4rem)] font-light leading-[1.04] text-ink">
              {c.lead}
            </h2>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted">{c.body1}</p>
            <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-muted">{c.body2}</p>

            {/* the disciplines once, as a line of text — not two template lists */}
            <p className="label mt-10 max-w-[52ch] leading-relaxed text-muted">
              {/* a term never breaks inside itself ("Social / Media") */}
              {c.skills.map((s) => s.replace(/ /g, " ")).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

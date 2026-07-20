"use client";

import { useLang } from "@/lib/i18n";
import { content, disciplines } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export default function Manifest() {
  const { lang } = useLang();
  const c = content[lang].manifest;

  return (
    <section id="manifest" className="border-t border-line py-[clamp(4.5rem,11vw,9rem)]">
      <div className="mx-auto max-w-[1400px] px-[clamp(1.25rem,5vw,4rem)]">
        <Reveal>
          <span className="eyebrow text-flame">{c.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="headline mt-6 text-[clamp(2rem,6vw,5rem)]">
            {c.line1} {c.line2}{" "}
            <span className="text-ash">{c.line3}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[52ch] text-lg text-ash">{c.body}</p>
        </Reveal>
      </div>

      {/* marquee */}
      <div className="mt-[clamp(3rem,7vw,6rem)] overflow-hidden border-y border-line py-6">
        <div className="flex w-max [animation:marquee_34s_linear_infinite]">
          {[...disciplines, ...disciplines].map((d, i) => (
            <span
              key={i}
              className="display mx-8 text-[clamp(2rem,4vw,3.5rem)] text-bone"
            >
              {d}
              <span className="mx-8 text-flame">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

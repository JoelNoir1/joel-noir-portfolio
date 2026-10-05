"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * ABOUT — the stance first, as typography; then the person and a few lines.
 * The statement carries the section, the portrait and text follow it.
 */
export default function About() {
  const { lang } = useLang();
  const c = content[lang].about;

  return (
    <section id="about" className="jn-sec jn-about">
      <div className="jn-wrap">
        <span className="label text-muted">{c.eyebrow}</span>
        <h2 className="jn-about-lead">{c.lead}</h2>

        <div className="jn-about-grid">
          <div className="jn-about-portrait">
            <Image
              src="/joel.jpg"
              alt="Joel Hildebrand"
              fill
              sizes="(max-width: 767px) 92vw, 36vw"
              className="object-cover object-[58%_18%]"
              style={{ filter: "grayscale(1) contrast(1.04) brightness(1.02)" }}
            />
          </div>

          <div className="jn-about-text">
            <p>{c.body1}</p>
            <p>{c.body2}</p>
            {/* the disciplines once, as one quiet line: spacing separates
                them, so no dot is ever left hanging at a line end */}
            <ul className="label jn-about-skills">
              {c.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

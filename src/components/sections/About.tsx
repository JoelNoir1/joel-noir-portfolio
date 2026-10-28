"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * ABOUT — short: the stance, the person, three sentences.
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
            <p>{c.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

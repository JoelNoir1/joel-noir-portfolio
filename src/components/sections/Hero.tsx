"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

const HERO_W = [960, 1600, 2560];
const heroSet = (ext: string) => HERO_W.map((w) => `/hero/hero-${w}.${ext} ${w}w`).join(", ");

/**
 * HERO — the title artwork as the image: Joel, the red block and the name are
 * one finished picture (16:9), shown whole on a ground matched to its edge.
 * Beneath it, small: who, what, and the two ways on.
 */
export default function Hero() {
  const { lang } = useLang();
  const c = content[lang].hero;
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" className="jn-hx" aria-labelledby="hx-title">
      {/* the name is in the picture; the heading says it for assistive tech */}
      <h1 id="hx-title" className="sr-only">
        Joel.Noir, {c.line}
      </h1>

      <div className="jn-hx-media">
        {/* native srcset: images are served unoptimised site-wide */}
        <picture>
          <source type="image/webp" srcSet={heroSet("webp")} sizes="100vw" />
          <img
            src="/hero/hero-1600.jpg"
            srcSet={heroSet("jpg")}
            sizes="100vw"
            width={2560}
            height={1440}
            alt={c.alt}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className="jn-hx-bottom">
        <p className="jn-hx-claim">
          <span className="jn-hx-claim-meta label">
            Joel Hildebrand · {c.role}
          </span>
          <span className="jn-hx-claim-line">{c.line}</span>
          <span className="jn-hx-claim-sub">{c.sub}</span>
        </p>
        <div className="jn-hx-cta">
          <a href="#photography" onClick={go("photography")} className="jn-btn jn-btn--solid">
            {c.work}
          </a>
          <a href="#contact" onClick={go("contact")} className="jn-btn">
            {c.enquire}
          </a>
        </div>
      </div>
    </section>
  );
}

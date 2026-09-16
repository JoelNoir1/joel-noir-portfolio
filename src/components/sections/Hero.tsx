"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { heroProject } from "@/lib/projects";
import { scrollToId } from "@/lib/lenis";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang].hero;
  const ref = useRef<HTMLElement>(null);

  // One of the strongest artworks (Russian Viking) lives inside the headline,
  // only partly visible through the letters, and opens as the hero exits —
  // handing off, same image, into the first reel project.
  const fill = heroProject.image;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Positioned onto the figure (dark, high-contrast) so the letters read on paper.
  const bgY = useTransform(scrollYProgress, [0, 1], ["50%", "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.3, 1.5]);
  const bgSizeStr = useTransform(bgScale, (s) => `${s * 100}% auto`);

  // The type opens up (scales) as the reel artwork rises over it. Visibility is
  // never tied to scroll progress, so the hero can't blank out if layout is
  // measured late — the rising canvas carries the hand-off on its own.
  const titleScale = useTransform(scrollYProgress, [0.35, 1], [1, 1.14]);

  return (
    <section
      id="top"
      ref={ref}
      /* jn-home-hero: on a touch phone the hero gives up the full first screen
         (see globals.css, MOBILE HERO) so the first work enters the frame */
      className="jn-home-hero relative flex min-h-[92svh] flex-col justify-between px-[clamp(1.25rem,5vw,3.5rem)] pb-9 pt-[clamp(6.5rem,15vh,9.5rem)]"
    >
      <motion.div className="mx-auto flex w-full max-w-[1500px] items-start justify-between gap-4">
        <motion.span
          className="label text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {c.role}
        </motion.span>
        <motion.span
          className="label hidden text-faint sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          01683 Nossen
        </motion.span>
      </motion.div>

      <motion.div
        className="jn-hero-lockup mx-auto w-full max-w-[1500px]"
        style={{ scale: titleScale, transformOrigin: "left bottom" }}
      >
        <motion.h1
          className="jn-hero-title max-w-[15ch] font-display text-[clamp(2.4rem,7.6vw,6.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]"
          style={{
            backgroundImage: `url(${fill})`,
            backgroundPositionY: bgY,
            backgroundSize: bgSizeStr,
          }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.75, delay: 0.15, ease }}
        >
          {c.line}
        </motion.h1>

        <motion.div className="jn-hero-sub mt-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-[46ch] text-lg leading-snug text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.42, ease }}
          >
            {c.sub}
          </motion.p>
          <motion.button
            onClick={() => scrollToId("index")}
            className="jn-scroll-cue label flex shrink-0 items-center gap-3 text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            <span className="jn-scroll-line inline-block h-px w-8 bg-ink" />
            {c.scroll}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

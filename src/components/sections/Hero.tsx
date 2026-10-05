"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang].hero;

  return (
    <section
      id="top"
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
          className="label hidden text-muted sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          01683 Nossen
        </motion.span>
      </motion.div>

      <div className="jn-hero-lockup mx-auto w-full max-w-[1500px]">
        {/* one solid warm black, static: no image, no texture, no motion */}
        <h1 className="jn-hero-title max-w-[15ch] font-display text-[clamp(2.6rem,10.4vw,10.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em]">
          {c.line}
        </h1>

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
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Hero() {
  const { lang } = useLang();
  const c = content[lang].hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // gentle parallax: portrait drifts slower than the page
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  const wordmark = "JOEL.NOIR";

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* ── cinematic background portrait (parallax) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ y: reduce ? 0 : y }}
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        {/* oversize buffer hides the parallax edges */}
        <div className="absolute inset-[-9%]">
          <Image
            src="/joel.jpg"
            alt="Joel, Creative Designer & Art Director"
            fill
            priority
            quality={88}
            sizes="100vw"
            className="hero-portrait object-cover object-[58%_22%] md:object-[64%_28%]"
          />
          {/* duotone: warm the mids, keep the shadows noir */}
          <div className="absolute inset-0 bg-flame/[0.16] mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-flame/[0.12] via-transparent to-transparent mix-blend-soft-light" />
        </div>
      </motion.div>

      {/* legibility scrims (fixed, no parallax), keep the centre clear */}
      {/* top: header + meta row */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 h-[42%] bg-gradient-to-b from-noir/75 via-noir/20 to-transparent"
      />
      {/* bottom: wordmark + lead */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-0 h-[74%] bg-gradient-to-t from-noir via-noir/55 to-transparent"
      />
      {/* subtle left anchor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-noir/45 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="hero-vignette pointer-events-none absolute inset-0 z-0"
      />

      {/* ── top meta row ── */}
      <div className="absolute inset-x-0 top-0 z-10 pt-28">
        <div className="mx-auto flex w-full max-w-[1500px] items-start justify-between px-[clamp(1.25rem,5vw,4rem)]">
          <motion.span
            className="eyebrow max-w-[16ch] text-bone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1 }}
          >
            {c.role}
          </motion.span>
          <motion.span
            className="eyebrow hidden items-center gap-2 text-bone/80 sm:flex"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-flame" />
            {c.status}
          </motion.span>
        </div>
      </div>

      {/* ── wordmark + lead (bottom) ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)] pb-[clamp(2rem,5vh,3.5rem)]"
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : fade }}
      >
        <h1 className="display text-[clamp(3.25rem,15.5vw,14rem)]" aria-label="Joel.Noir">
          <span aria-hidden="true" className="flex overflow-hidden pb-[0.08em] leading-[0.82]">
            {wordmark.split("").map((ch, i) => (
              <motion.span
                key={i}
                className={`inline-block ${ch === "." ? "text-flame" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease, delay: 0.35 + i * 0.045 }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-[42ch] text-lg leading-snug text-bone/90 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.15 }}
          >
            {c.lead}
          </motion.p>

          <motion.span
            className="eyebrow flex shrink-0 items-center gap-3 text-bone/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.35 }}
          >
            <span className="inline-block h-px w-10 origin-left bg-flame [animation:cue_2.4s_ease-in-out_infinite]" />
            {c.scroll}
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}

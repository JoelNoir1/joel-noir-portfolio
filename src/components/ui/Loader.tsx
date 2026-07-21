"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Brand load-in: a 0 to 100 counter, then a curtain lift revealing the hero. */
export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";

    if (reduce) {
      setCount(100);
      const t = setTimeout(() => setDone(true), 200);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 300);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-noir px-[var(--pad,1.5rem)] py-6"
          style={{ ["--pad" as string]: "clamp(1.25rem,5vw,4rem)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ash">Joel.Noir</span>
            <span className="eyebrow text-ash">Portfolio ’26</span>
          </div>

          <div className="flex items-end justify-between">
            <span className="font-display text-[18vw] font-extrabold leading-[0.8] tracking-[-0.05em] text-bone md:text-[12vw]">
              {String(count).padStart(3, "0")}
            </span>
            <span className="eyebrow mb-3 text-flame">Loading</span>
          </div>

          <div className="relative h-px w-full bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-flame"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * The brand signature: a flame-coloured dot that trails the pointer and
 * swells into a ring over interactive elements. Desktop / fine-pointer only.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const el = ref.current;
    if (!fine || !el) return;

    document.body.dataset.cursor = "on";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      const k = reduce ? 1 : 0.2;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    const hoverSel = "a, button, [data-cursor-hover]";
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(hoverSel)) el.classList.add("is-hover");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(hoverSel)) el.classList.remove("is-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      delete document.body.dataset.cursor;
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor-inner" />
    </div>
  );
}

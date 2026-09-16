"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { projects } from "@/lib/projects";

export default function Index() {
  const { lang } = useLang();
  const c = content[lang].index;
  const [hover, setHover] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const snapped = useRef(false);
  const raf = useRef(0);
  const hp = projects.find((p) => p.slug === hover) ?? null;

  // Smooth cursor-follow (lerp) — the preview trails the pointer with weight.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const onMove = (e: MouseEvent) => {
    const el = boxRef.current;
    if (!el) return;
    const w = el.offsetWidth || 300;
    const h = el.offsetHeight || 380;
    const m = 28;
    let x = e.clientX + m;
    const y = Math.max(m, Math.min(e.clientY - h / 2, window.innerHeight - h - m));
    if (x + w + m > window.innerWidth) x = e.clientX - w - m;
    target.current.x = x;
    target.current.y = y;
    if (!snapped.current) {
      pos.current.x = x;
      pos.current.y = y;
      snapped.current = true;
    }
  };

  return (
    <section
      id="index"
      data-preview={hover ? "on" : "off"}
      onMouseMove={onMove}
      className="jn-index border-t border-line px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(3.5rem,8vw,7rem)]"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline justify-between">
          <h2 className="label text-muted">{c.eyebrow}</h2>
          <span className="label tabular-nums text-faint">{c.note}</span>
        </div>

        <ul
          className="mt-[clamp(1.5rem,4vw,3rem)]"
          onMouseLeave={() => setHover(null)}
        >
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-line first:border-t">
              <Link
                href={`/work/${p.slug}`}
                onMouseEnter={() => {
                  setHover(p.slug);
                  setMounted(true);
                }}
                className={`group block py-[clamp(1.1rem,2.6vw,2.05rem)] transition-opacity duration-300 ${
                  hover && hover !== p.slug ? "md:opacity-30" : "opacity-100"
                }`}
              >
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span className="font-mono text-xs tabular-nums text-faint md:w-10 md:shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display flex flex-1 items-baseline gap-4 text-[clamp(2rem,7vw,5.2rem)] leading-[0.92] text-ink">
                    {p.title}
                    <span
                      aria-hidden="true"
                      className="hidden -translate-x-2 self-center text-[0.3em] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:inline"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center justify-end gap-6 font-mono text-[0.68rem] uppercase tracking-widest text-muted md:flex">
                    <span>{p.category[lang]}</span>
                    <span className="tabular-nums text-faint">{p.year}</span>
                  </span>
                </div>

                {/* mobile meta, aligned under the title */}
                <div className="mt-2 flex gap-4 pl-[1.9rem] font-mono text-[0.66rem] uppercase tracking-widest text-muted md:hidden">
                  <span>{p.category[lang]}</span>
                  <span className="tabular-nums text-faint">{p.year}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* floating cursor preview (desktop only) */}
      <div
        ref={boxRef}
        aria-hidden="true"
        className={`jn-preview hidden md:block ${hover ? "is-on" : ""} ${
          hp?.previewAspect === "landscape" ? "jn-landscape" : "jn-portrait"
        }`}
      >
        <div className="jn-preview-inner">
          {mounted &&
            projects.map((p) => (
              <Image
                key={p.slug}
                src={p.image}
                alt=""
                fill
                sizes="464px"
                className={`object-cover transition-opacity duration-300 ${
                  hover === p.slug ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/lenis";

export default function Header() {
  const { lang, setLang } = useLang();
  const c = content[lang].nav;
  const [open, setOpen] = useState(false);

  const links = [
    { id: "work", label: c.work },
    { id: "disciplines", label: c.disciplines },
    { id: "about", label: c.about },
    { id: "contact", label: c.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-noir/75 via-noir/25 to-transparent"
      />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-5">
        <button
          onClick={() => go("top")}
          className="font-display text-lg font-extrabold tracking-[-0.04em] text-bone"
          aria-label="Joel.Noir, nach oben"
        >
          Joel<span className="text-flame">.</span>Noir
        </button>

        {/* desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-sm text-bone/70 transition-colors hover:text-bone"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* language toggle */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setLang("de")}
              className={lang === "de" ? "text-flame" : "text-ash hover:text-bone"}
              aria-pressed={lang === "de"}
            >
              DE
            </button>
            <span className="text-ash/40">/</span>
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-flame" : "text-ash hover:text-bone"}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>

          {/* mobile trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="font-mono text-xs uppercase tracking-widest text-bone md:hidden"
            aria-expanded={open}
          >
            {open ? c.close : c.menu}
          </button>
        </div>
      </div>

      {/* mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 bg-noir px-[clamp(1.25rem,5vw,4rem)] md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="headline py-1 text-left text-4xl text-bone"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

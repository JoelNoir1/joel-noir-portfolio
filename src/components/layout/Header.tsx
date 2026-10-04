"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

export default function Header() {
  const { lang, setLang } = useLang();
  const c = content[lang].nav;
  const [open, setOpen] = useState(false);

  const links = [
    { id: "index", label: c.index },
    { id: "about", label: c.about },
    { id: "contact", label: c.contact },
  ];
  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      {/* text-paper + difference: reads as ink over the paper sections and
          inverts to light by itself over any dark ground underneath.
          The blend has to sit on the positioned element itself — a z-indexed
          parent would open its own stacking context and the child would then
          blend against nothing. The menu panel is a sibling for the same
          reason: inside here it would be inverted too. */}
      <header className="fixed inset-x-0 top-0 z-50 text-paper mix-blend-difference">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-[clamp(1.25rem,5vw,3.5rem)] py-5">
        <button
          onClick={() => go("top")}
          className="font-display text-[1.05rem] font-extrabold uppercase tracking-[-0.03em]"
          aria-label={`Joel.Noir, ${content[lang].footer.back}`}
        >
          Joel.Noir
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="label opacity-70 transition-opacity hover:opacity-100"
            >
              {l.label}
            </button>
          ))}
          <span className="h-3 w-px bg-current opacity-30" aria-hidden="true" />
          <div className="label flex items-center gap-1">
            <button
              onClick={() => setLang("de")}
              className={lang === "de" ? "" : "opacity-65 transition-opacity hover:opacity-100"}
              aria-pressed={lang === "de"}
            >
              DE
            </button>
            <span className="opacity-45">/</span>
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "" : "opacity-65 transition-opacity hover:opacity-100"}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="label md:hidden"
          aria-expanded={open}
        >
          {open ? c.close : c.menu}
        </button>
      </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center gap-1 bg-paper px-[clamp(1.25rem,5vw,3.5rem)] md:hidden">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="display py-1 text-left text-[13vw] text-ink"
            >
              {l.label}
            </button>
          ))}
          <div className="label mt-8 flex gap-5">
            {/* inactive language: ink at 0.65 clears AA on paper; text-faint did not */}
            <button onClick={() => setLang("de")} className={lang === "de" ? "text-ink" : "text-ink opacity-65"}>DE</button>
            <button onClick={() => setLang("en")} className={lang === "en" ? "text-ink" : "text-ink opacity-65"}>EN</button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-[clamp(1.25rem,5vw,3.5rem)] py-[clamp(2.5rem,5vw,4rem)]">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <button
            onClick={() => scrollToId("top")}
            className="font-display text-2xl font-extrabold uppercase tracking-[-0.03em] text-ink"
            aria-label={`Joel.Noir, ${c.back}`}
          >
            Joel.Noir
          </button>
          <button
            onClick={() => scrollToId("top")}
            className="label text-muted transition-colors hover:text-ink"
          >
            ↑ {c.back}
          </button>
        </div>
        <div className="label mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-muted">
          <span>© {year} Joel.Noir · {c.rights}</span>
          <div className="flex gap-5">
            <Link href="/impressum" className="transition-colors hover:text-ink">Impressum</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-ink">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { scrollToId } from "@/lib/lenis";

export default function Footer() {
  const { lang } = useLang();
  const c = content[lang].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-[clamp(2.5rem,5vw,4rem)]">
      <div className="mx-auto max-w-[1500px] px-[clamp(1.25rem,5vw,4rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <button
              onClick={() => scrollToId("top")}
              data-cursor-hover
              className="font-display text-2xl font-extrabold tracking-[-0.04em] text-bone"
              aria-label="Joel.Noir, nach oben"
            >
              Joel<span className="text-flame">.</span>Noir
            </button>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ash">
              {c.madeIn}
            </p>
          </div>
          <button
            onClick={() => scrollToId("top")}
            data-cursor-hover
            className="eyebrow text-ash transition-colors hover:text-bone"
          >
            ↑ {c.back}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-xs text-ash">
          <span>
            © {year} Joel.Noir · {c.rights}
          </span>
          <div className="flex gap-5">
            <Link
              href="/impressum"
              data-cursor-hover
              className="transition-colors hover:text-bone"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              data-cursor-hover
              className="transition-colors hover:text-bone"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

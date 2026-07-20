"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div id="top">
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-noir/80 to-transparent"
        />
        <div className="relative mx-auto flex max-w-[900px] items-center justify-between px-[clamp(1.25rem,5vw,3rem)] py-5">
          <Link
            href="/"
            data-cursor-hover
            className="font-display text-lg font-extrabold tracking-[-0.04em] text-bone"
          >
            Joel<span className="text-flame">.</span>Noir
          </Link>
          <Link
            href="/"
            data-cursor-hover
            className="eyebrow text-bone/70 transition-colors hover:text-bone"
          >
            ← Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-[clamp(1.25rem,5vw,3rem)] pb-24 pt-[clamp(7rem,15vw,10rem)]">
        <h1 className="display text-[clamp(2.5rem,8vw,5rem)]">{title}</h1>
        {updated && (
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-ash">
            {updated}
          </p>
        )}
        <div className="legal-prose mt-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

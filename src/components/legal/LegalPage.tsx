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
        <div className="mx-auto flex max-w-[900px] items-center justify-between px-[clamp(1.25rem,5vw,3rem)] py-5">
          <Link
            href="/"
            className="font-display text-lg font-extrabold uppercase tracking-[-0.03em] text-ink"
          >
            Joel.Noir
          </Link>
          <Link
            href="/"
            className="label text-muted transition-colors hover:text-ink"
          >
            ← Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-[clamp(1.25rem,5vw,3rem)] pb-24 pt-[clamp(7rem,15vw,10rem)]">
        <h1 className="display text-[clamp(2.5rem,8vw,5rem)] text-ink">{title}</h1>
        {updated && (
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-faint">
            {updated}
          </p>
        )}
        <div className="legal-prose mt-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

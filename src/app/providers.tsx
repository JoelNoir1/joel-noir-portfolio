"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";

/* Native scrolling only: no smooth-scroll layer, no WebGL stage. */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}

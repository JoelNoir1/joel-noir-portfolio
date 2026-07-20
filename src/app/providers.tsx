"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Grain from "@/components/ui/Grain";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          {children}
          <Grain />
          <Cursor />
        </SmoothScroll>
      </MotionConfig>
    </LanguageProvider>
  );
}

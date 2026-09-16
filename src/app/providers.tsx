"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/providers/SmoothScroll";
import StageProvider from "@/webgl/StageProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <StageProvider>{children}</StageProvider>
        </SmoothScroll>
      </MotionConfig>
    </LanguageProvider>
  );
}

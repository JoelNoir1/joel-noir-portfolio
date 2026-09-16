"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle cross-page enter transition. Opacity only, so it never establishes a
 * containing block that would break the fixed header or the cursor preview.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

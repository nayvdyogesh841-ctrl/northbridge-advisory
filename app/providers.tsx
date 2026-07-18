"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { easePremium } from "@/lib/motion";

/**
 * Global motion contract. `reducedMotion="user"` makes every Framer animation
 * honor the OS "reduce motion" setting (transforms collapse, opacity kept),
 * and a shared transition keeps timing consistent across the whole product.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: easePremium }}>
      {children}
    </MotionConfig>
  );
}

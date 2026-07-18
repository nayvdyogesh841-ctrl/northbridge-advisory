"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

// Deterministic stand-in for Math.random() so server and client agree (no
// hydration mismatch) and durations stay stable across re-renders. Same visual
// distribution as the canonical `20 + Math.random() * 10`.
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Canonical 21st.dev "Background Paths" — reused verbatim (path geometry,
 * viewBox, stroke widths/opacities, animation keyframes, timing and easing).
 * Compatibility adaptations only:
 *  - color: fixed light stroke (this project is always-dark and does not use
 *    Tailwind's `dark:` variant, so the original slate-950 would be invisible);
 *  - durations: deterministic (seeded) to avoid SSR/CSR hydration mismatch;
 *  - decorative: aria-hidden + pointer-events-none, no <title>.
 */
export function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        // ~1.4× the canonical width for presence on a dark backdrop.
        width: 0.7 + i * 0.04,
        duration: 20 + seeded(i + (position === 1 ? 0 : 50)) * 10,
      })),
    [position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="h-full w-full text-ink"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden
        style={{ filter: "drop-shadow(0 0 2px rgba(242, 240, 235, 0.3))" }}
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Full-bleed layer that renders both mirrored path fields — drop this behind any
 * section's content. Purely decorative and non-interactive.
 */
export function BackgroundPathsLayer({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}

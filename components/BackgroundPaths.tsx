"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

type BackgroundPathsProps = {
  className?: string;
  /** Number of layered strokes. Fewer = calmer, lighter. */
  count?: number;
  /** Mirrors the sweep so adjacent sections don't repeat. */
  direction?: 1 | -1;
  /** Overall visibility of the whole layer. */
  opacity?: number;
};

/**
 * Layered flowing SVG strokes — a quiet echo of the hero's silk for otherwise
 * flat sections. Deterministic geometry (no random → no hydration mismatch),
 * animated only while on screen (IntersectionObserver gate), and frozen under
 * prefers-reduced-motion. Purely decorative: aria-hidden + pointer-events-none.
 */
export function BackgroundPaths({
  className,
  count = 22,
  direction = 1,
  opacity = 0.5,
}: BackgroundPathsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => setAnimate(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paths = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const o = i * 5 * direction;
        return {
          id: i,
          d: `M-${380 - o} -${189 + i * 6}C-${380 - o} -${189 + i * 6} -${
            312 - o
          } ${216 - i * 6} ${152 - o} ${343 - i * 6}C${616 - o} ${470 - i * 6} ${
            684 - o
          } ${875 - i * 6} ${684 - o} ${875 - i * 6}`,
          width: 0.5 + i * 0.05,
          strokeOpacity: 0.06 + i * 0.012,
          duration: 20 + i * 0.7,
        };
      }),
    [count, direction]
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 text-ink", className)}
      style={{ opacity }}
    >
      <svg
        className="h-full w-full"
        viewBox="-520 -340 1240 1260"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={p.strokeOpacity}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={
              animate
                ? { pathLength: 1, opacity: [0.25, 0.55, 0.25] }
                : { pathLength: 0.3, opacity: 0.5 }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

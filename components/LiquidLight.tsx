"use client";

import { useEffect, useRef } from "react";

type LiquidLightProps = {
  /** button = light substrate, hover-only; card/panel = dark, ambient in-view. */
  variant?: "button" | "card" | "panel";
};

/**
 * The hero's silk, rendered as a soft iridescent reflection that travels INSIDE
 * a surface (clipped by the host's overflow) rather than around its edge. Two
 * blurred layers — colored blobs + fine striations — flow via transform only.
 *
 * Performance contract:
 *  - animations are paused by default; only run while hovered (buttons) or on
 *    screen (cards/panels, toggled by one IntersectionObserver);
 *  - a single rAF-throttled pointer handler feeds --lx/--ly (no React re-render);
 *  - transform/opacity only; frozen under prefers-reduced-motion.
 */
export function LiquidLight({ variant = "card" }: LiquidLightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = ref.current;
    const host = light?.parentElement;
    if (!light || !host) return;

    const layers = () => light.querySelectorAll<HTMLElement>("[data-layer]");
    const setState = (state: "running" | "paused") =>
      layers().forEach((l) => (l.style.animationPlayState = state));

    let io: IntersectionObserver | undefined;
    if (variant !== "button") {
      io = new IntersectionObserver(
        ([entry]) => setState(entry.isIntersecting ? "running" : "paused"),
        { rootMargin: "120px" }
      );
      io.observe(host);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        light.style.setProperty("--lx", ((e.clientX - r.left) / r.width).toFixed(3));
        light.style.setProperty("--ly", ((e.clientY - r.top) / r.height).toFixed(3));
      });
    };
    if (!reduce) host.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io?.disconnect();
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [variant]);

  return (
    <div ref={ref} aria-hidden className={`liquid__light liquid--${variant}`}>
      <span data-layer className="liquid__blobs" />
      <span data-layer className="liquid__bands" />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Spline community scene "Clarity Stream" (CC0), served by Spline's viewer.
const SCENE_URL =
  "https://app.spline.design/file/c4a94242-659c-4944-85c6-dbb34a469ed3?view=preview";

/**
 * The hero's living centrepiece: the Clarity Stream silk, in its original
 * colors, flowing full-bleed through the graphite stage. Because the page is
 * near-black, the viewer's black canvas dissolves into the site and only the
 * ribbon reads — no visible embed rectangle.
 *
 * A CSS poster (ember/violet thread) renders instantly and is the permanent
 * experience on mobile and under prefers-reduced-motion. On capable desktops
 * the viewer iframe fades in once the hero is on screen AND the main thread is
 * idle, so the runtime never competes with first paint.
 */
export function ClarityStream() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !desktop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const idle =
          "requestIdleCallback" in window
            ? (cb: () => void) => (window as any).requestIdleCallback(cb, { timeout: 2500 })
            : (cb: () => void) => window.setTimeout(cb, 350);
        idle(() => setMount(true));
      },
      { rootMargin: "160px 0px" }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        // The silk dissolves into the stage above — no embed seam.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 26%, #000 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 26%, #000 86%, transparent 100%)",
      }}
    >
      {/* Poster — an ember/violet thread on the dark stage, always present. */}
      <div
        className="absolute inset-x-0 top-[54%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(224,82,92,0.55) 26%, rgba(242,240,235,0.85) 50%, rgba(99,91,255,0.5) 74%, transparent)",
          boxShadow:
            "0 0 28px 8px rgba(224,82,92,0.14), 0 0 44px 14px rgba(99,91,255,0.1)",
        }}
      />
      <div
        className="absolute inset-x-0 top-[54%] h-[140px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 50%, rgba(224,82,92,0.07), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Live scene — original colors, desktop only, mounted near-view + idle. */}
      {mount && (
        <iframe
          src={SCENE_URL}
          title=""
          tabIndex={-1}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute transition-opacity duration-[1600ms] ease-premium"
          style={{
            // Overscan hides the viewer's edges and badge chrome.
            inset: "-10% -4%",
            width: "108%",
            height: "120%",
            border: 0,
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

// Spline community scene "Clarity Stream" (CC0), served by Spline's viewer.
const SCENE_URL =
  "https://app.spline.design/file/c4a94242-659c-4944-85c6-dbb34a469ed3?view=preview";

/**
 * The hero's living centrepiece — the Clarity Stream silk flowing through the
 * graphite stage. The scene is embedded via Spline's viewer iframe.
 *
 * Loading behaviour (why it looks smooth now):
 *  - the iframe mounts on the first client tick (no IntersectionObserver /
 *    requestIdleCallback gate) so the heavy runtime starts downloading at page
 *    load rather than 1–2s later;
 *  - a wave-shaped CSS poster paints instantly underneath, so there is never a
 *    blank hero — the scene simply cross-fades over it once ready;
 *  - it renders on every device (desktop, tablet, mobile), scaled up on small
 *    screens so the horizontal ribbon fills the frame instead of showing as a
 *    thin band;
 *  - under prefers-reduced-motion only the static poster is used.
 *
 * Note: because this is Spline's viewer iframe (not the @splinetool runtime),
 * the scene's polygon/texture/quality settings can't be tuned from here — only
 * the container. The eager mount + poster cross-fade is the smoothest result
 * achievable without a self-hosted `.splinecode` export of the scene.
 */
export function ClarityStream() {
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Client-only, immediate: start loading the runtime as early as possible.
    // Skip entirely under reduced motion — the poster stands on its own.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) setMount(true);
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        // The silk dissolves into the stage above — no visible embed seam.
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 24%, #000 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 24%, #000 88%, transparent 100%)",
      }}
    >
      {/* Poster — a soft wave-shaped glow, always painted instantly so the hero
          is never blank and the scene has something to cross-fade over. */}
      <div
        className="absolute inset-x-[-10%] top-[46%] h-24 -translate-y-1/2 sm:h-28"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(224,82,92,0.35) 22%, rgba(242,240,235,0.65) 50%, rgba(99,91,255,0.32) 78%, transparent)",
          filter: "blur(14px)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute inset-x-0 top-[52%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(242,240,235,0.55) 40%, rgba(242,240,235,0.7) 50%, rgba(242,240,235,0.5) 60%, transparent)",
          boxShadow: "0 0 24px 6px rgba(242,240,235,0.08)",
        }}
      />

      {/* Live scene — mounts immediately on all devices, cross-fades in on load.
          Scaled up on mobile so the ribbon fills the frame (fixes the thin line);
          natural scale on ≥sm. */}
      {mount && (
        <iframe
          src={SCENE_URL}
          title=""
          tabIndex={-1}
          loading="eager"
          onLoad={() => setLoaded(true)}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[130%] origin-center -translate-x-1/2 -translate-y-1/2 scale-[2] border-0 transition-opacity duration-700 ease-premium sm:h-[120%] sm:w-[108%] sm:scale-100"
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}

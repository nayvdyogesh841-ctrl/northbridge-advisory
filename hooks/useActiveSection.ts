"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently occupying the middle of the viewport.
 * One IntersectionObserver, no dependencies. Used to mark the active nav link.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A thin band across the vertical middle: the section crossing it wins.
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // ids is a stable list from content; join keeps the dep primitive.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}

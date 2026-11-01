"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Adds "is-visible" to [data-reveal] elements as they scroll into view. The hidden start state only
 * applies once this component has mounted and added <html class="reveal-ready">, so content stays
 * visible without JavaScript; the reduced-motion styles in globals.css switch it off entirely.
 *
 * Each page's pass runs before the browser paints (a layout effect), so after a client-side
 * navigation the blocks already on screen show at once, as on a full load, instead of blinking out and
 * fading back in: the hidden state is lifted while they are measured and marked, then switched back on
 * for the blocks below the fold, which an observer reveals as soon as their top edge enters the view.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      pending.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    // Measured without the hidden state, so a block on screen is marked visible before it is styled
    // hidden. Transitions are held off for the pass (the router may already have styled the new page
    // hidden while restoring scroll), so blocks on screen show at once and the rest hide at once.
    pending.forEach((element) => { element.style.transition = "none"; });
    root.classList.remove("reveal-ready");
    pending.forEach((element) => { if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible"); });
    root.classList.add("reveal-ready");
    void root.offsetHeight;
    pending.forEach((element) => { element.style.transition = ""; });
    const below = pending.filter((element) => !element.classList.contains("is-visible"));
    if (below.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    below.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

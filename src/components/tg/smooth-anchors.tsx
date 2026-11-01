"use client";

import { useEffect } from "react";

/** Dispatched on window to close the mobile navigation sheet (the header listens for it). */
export const CLOSE_MENU_EVENT = "trainingenie:close-menu";

/** Below lg the header tucks away on a scroll down once the page is more than this far from the top (SiteHeader). */
export const HEADER_TUCK_FROM = 400;

// Where a target lands when the header has tucked away: just under the top edge.
const TUCKED_OFFSET = 24;
const FOCUSABLE = "a[href], button, input, select, textarea, summary, [tabindex]";

/** The page's scroll padding (96px, or less on short screens): where a target lands under the header. */
const baseOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 96;

const targetOf = (hash: string) => {
  if (hash.length < 2) return null;
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
};

/**
 * Smooth scrolling for same-page "#…" links only (never global `scroll-behavior: smooth`). On a click
 * whose target exists: update the hash without a history entry and close the mobile sheet (the
 * CLOSE_MENU_EVENT); then, on the next animation frame, scroll the target to the page's scroll padding
 * (96px; instantly under reduced motion) and move focus to it for keyboard and screen-reader users.
 * Below lg a jump down past the header's tuck point lands 24px from the top instead, since the header
 * slides away on the way down and would otherwise leave the end of the previous section showing.
 *
 * On a load with a hash (a deep link), the target is checked again once the web font has swapped in,
 * which moves it in Firefox: unless the visitor has already scrolled, touched or pressed a key, it is
 * scrolled back to the scroll padding. Mounted once in the root layout.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const hash = link.getAttribute("href") ?? "";
      const target = targetOf(hash);
      if (!target) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.replaceState(window.history.state, "", hash);
      window.dispatchEvent(new Event(CLOSE_MENU_EVENT));
      // Scroll and focus on the next frame: closing the mobile sheet releases its scroll lock (and may
      // restore the old scroll position), which must happen first or it would undo this scroll.
      window.requestAnimationFrame(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        let top = targetTop - baseOffset();
        if (!window.matchMedia("(min-width: 1024px)").matches && top > window.scrollY && targetTop - TUCKED_OFFSET > HEADER_TUCK_FROM) top = targetTop - TUCKED_OFFSET;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
        if (!target.matches(FOCUSABLE)) { target.setAttribute("tabindex", "-1"); target.setAttribute("data-anchor-target", ""); }
        target.focus({ preventScroll: true });
      });
    };
    // Capture phase, so this runs before next/link's own click handling.
    document.addEventListener("click", onClick, true);

    // A deep link: settle the target once the font is in, unless the visitor has taken over.
    const deepTarget = targetOf(window.location.hash);
    const inputs = ["wheel", "touchstart", "keydown"] as const;
    let frame = 0;
    let cancelled = false;
    const stopWatching = () => inputs.forEach((type) => window.removeEventListener(type, takeOver));
    function takeOver() { cancelled = true; stopWatching(); }
    if (deepTarget) {
      inputs.forEach((type) => window.addEventListener(type, takeOver, { passive: true }));
      document.fonts.ready.then(() => {
        if (cancelled) return;
        frame = window.requestAnimationFrame(() => {
          stopWatching();
          if (!cancelled && Math.abs(deepTarget.getBoundingClientRect().top - baseOffset()) > 2) deepTarget.scrollIntoView({ block: "start" });
        });
      });
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      takeOver();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Focus left in the site chrome (or nowhere) after a navigation is moved to the new page.
const CHROME = "body > header, body > footer, aside[aria-label='Quick contact'], #mobile-navigation";
const FOCUSABLE = "a[href], button, input, select, textarea, summary, [tabindex]";

/** The element a "#…" hash names, if any. */
const hashTarget = (hash: string) => {
  if (hash.length < 2) return null;
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
};

/**
 * Moves keyboard focus to the new page after a client-side navigation, as a full page load would:
 * when focus was left on the body or in the site chrome (a header, footer, quick-contact or menu sheet
 * link), it moves to the page's h1 (or <main>), so the next Tab lands on the first control of the new
 * page and a screen reader announces its title. A navigation to a "#…" target (a programme pill to
 * /contact-us#enquiry) focuses that target's own first heading instead, or the target itself, so the
 * next Tab continues from where the page landed. The target takes focus without a ring
 * (data-anchor-target) and without scrolling, as SmoothAnchors does. Mounted once in the root layout;
 * the first render (a full page load) is skipped.
 */
export function RouteFocus() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const frame = window.requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active && active !== document.body && !active.closest(CHROME)) return;
      const anchor = hashTarget(window.location.hash);
      const target = anchor ? anchor.querySelector<HTMLElement>("h1, h2, h3") ?? anchor : document.querySelector<HTMLElement>("main h1") ?? document.getElementById("main");
      if (!target) return;
      if (!target.matches(FOCUSABLE)) { target.setAttribute("tabindex", "-1"); target.setAttribute("data-anchor-target", ""); }
      target.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

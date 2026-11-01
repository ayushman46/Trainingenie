"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { PlusIcon } from "@/components/tg/icons";

const WIDE = "(min-width: 768px)";

/** The element a "#…" hash names, or null (a malformed escape names nothing). */
function hashTarget(hash: string) {
  if (hash.length < 2) return null;
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return null; }
}

/**
 * A catalogue area's topics behind one closed hairline row below `md` ("See all 15 topics", a plus
 * that turns to a cross when open), the same disclosure as the area pages' "See all steps" and the
 * hero's collapsed index, so the catalogue reads as a list of areas on a phone. From `md` the summary
 * is hidden and the content always shows: the same <details> is opened there (by CSS through
 * ::details-content at once, and by the `open` property after hydration), so the topics render once
 * and the `#group-…` ids stay unique.
 *
 * It also opens when the page is reached at, or jumps to, an id inside its area block (`scope`, the
 * nearest <section>): on load, on hashchange, and on a same-page "#…" click (SmoothAnchors updates the
 * hash with replaceState, which fires no hashchange; this runs before its scroll, which waits a frame).
 */
export function TopicsDisclosure({ count, children }: { count: number; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    const scope = details.closest("section") ?? details;
    const wide = window.matchMedia(WIDE);
    const opens = (target: Element | null) => Boolean(target && scope.contains(target));

    const sync = () => {
      if (details.open) return;
      const target = hashTarget(window.location.hash);
      if (wide.matches) { details.open = true; return; }
      if (!opens(target)) return;
      details.open = true;
      // The browser could not scroll to a topic group while it was closed, so bring it into view now.
      if (target && details.contains(target)) window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };
    const onClick = (event: MouseEvent) => {
      if (details.open || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
      if (link && opens(hashTarget(link.getAttribute("href") ?? ""))) details.open = true;
    };

    sync();
    wide.addEventListener("change", sync);
    window.addEventListener("hashchange", sync);
    document.addEventListener("click", onClick, true);
    return () => {
      wide.removeEventListener("change", sync);
      window.removeEventListener("hashchange", sync);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return <details ref={ref} className="group/topics mt-8 border-t border-border md:mt-10 md:border-0 md:[&::details-content]:block md:[&::details-content]:[content-visibility:visible]">
    <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 type-ui font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground md:hidden [&::-webkit-details-marker]:hidden">
      <span>See all {count} topics</span>
      <PlusIcon className="size-[18px] text-foreground transition-transform duration-200 group-open/topics:rotate-45" />
    </summary>
    {children}
  </details>;
}

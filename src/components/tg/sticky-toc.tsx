"use client";

import { useEffect, useRef, useState } from "react";
import { listTitleClass } from "./fact-list";

export type TocItem = { id: string; label: string };

// A section becomes current once its top is within this distance of the viewport top.
const ACTIVE_OFFSET = 160;

/** "01", "02", … */
const tocNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The desktop "On this page" rail, Nike plain: a sticky list of same-page links (render it inside a
 * column that spans the content, from `lg`) on a grey hairline track. The current section's link is
 * ink with aria-current="location", and its stretch of the track turns ink; the others are grey and
 * darken on hover. No red, no dots. `numbered` adds plain grey "01", "02", … before each label (ink
 * for the current one). Current means the last section whose top has passed 160px from the viewport
 * top, or the final one once the page bottom is reached. Plain anchor links, so it works without
 * JavaScript (SmoothAnchors adds the smooth scroll). On phones the page renders its own open list
 * under the hero instead. While the rail is not rendered (an ancestor is display:none, as below `lg`
 * on /what-we-do), each scroll frame returns before measuring anything; a resize that shows it again
 * runs the full update.
 */
export function StickyToc({ items, numbered = false, title = "On this page", id = "toc-title", className = "" }: { items: TocItem[]; numbered?: boolean; title?: string; id?: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // offsetParent is null when the nav or an ancestor is display:none (phones and tablets).
      if (!navRef.current || navRef.current.offsetParent === null) return;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items.at(-1)?.id ?? current;
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return <nav ref={navRef} aria-labelledby={id} className={`sticky top-[116px] ${className}`}>
    <p id={id} className={listTitleClass}>{title}</p>
    {/* The 1px track is the list's left border; each link's own 2px border sits over it (-ml-px) and
        turns ink for the current section. Links are padded to a 36px row pitch, so the hit areas meet. */}
    <ol className="mt-4 border-l border-border type-ui">
      {items.map((item, index) => {
        const current = item.id === active;
        return <li key={item.id}>
          <a href={`#${item.id}`} aria-current={current ? "location" : undefined} className={`-ml-px flex gap-3 border-l-2 py-1.5 pl-4 transition-colors focus-visible:rounded-none ${current ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {numbered && <span aria-hidden="true" className="shrink-0 tabular-nums">{tocNumber(index)}</span>}
            <span>{item.label}</span>
          </a>
        </li>;
      })}
    </ol>
  </nav>;
}

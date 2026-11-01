"use client";

import { useEffect, useState } from "react";
import { listTitleClass } from "@/components/tg/fact-list";
import { PlusIcon } from "@/components/tg/icons";

const OFFSET = 160; // a section becomes current once its top is this close to the viewport top

/**
 * A table of contents for long documents (the privacy policy). On desktop, an open list that follows
 * the reader on the same grey hairline track as the /what-we-do rail (StickyToc): the current section
 * is set in ink, its stretch of the track turns ink, and it carries aria-current="location" (the last
 * section whose top is within 160px of the viewport top, or the final one once the page bottom is
 * reached; the scroll listener is throttled to one check per frame). Below lg, where the list would sit
 * above the text, it is folded into a native disclosure (titled with the label alone, and animated like
 * the site's other disclosure rows) so the document starts sooner; there each link is a 44px+ hairline
 * row, and the disclosure has only a closing rule, so it does not stack a third hairline under the
 * hero's In short list. Rows keep a square focus ring, so their hairlines stay straight. Plain anchor
 * links, so both work without JavaScript. The page decides where it sticks.
 */
export function TocNav({ items, label = "Contents", className = "" }: { items: { id: string; label: string }[]; label?: string; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id ?? "";
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= OFFSET) current = item.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items.at(-1)?.id ?? current;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [items]);

  return <nav aria-label={label} className={className}>
    <details className="disclosure group/toc border-b border-border lg:hidden">
      <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 type-ui font-medium text-foreground transition-colors hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
        {label}
        <PlusIcon className="size-[18px] text-foreground transition-transform duration-(--motion-ui) group-open/toc:rotate-45" />
      </summary>
      <ol className="border-t border-border pb-2">
        {items.map((item) => <li key={item.id} className="border-b border-border last:border-b-0"><a href={`#${item.id}`} className="flex min-h-11 items-center py-2.5 type-ui text-foreground decoration-1 underline-offset-4 hover:underline focus-visible:rounded-none">{item.label}</a></li>)}
      </ol>
    </details>
    <div className="max-lg:hidden">
      <p className={listTitleClass}>{label}</p>
      {/* The 1px track is the list's left border; each link's own 2px border sits over it (-ml-px) and turns
          ink for the current section, as on the /what-we-do rail. */}
      <ol className="mt-4 border-l border-border type-ui">
        {items.map((item) => {
          const current = active === item.id;
          return <li key={item.id}>
            <a href={`#${item.id}`} aria-current={current ? "location" : undefined} className={`-ml-px flex border-l-2 py-1.5 pl-4 transition-colors focus-visible:rounded-none ${current ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {item.label}
            </a>
          </li>;
        })}
      </ol>
    </div>
  </nav>;
}

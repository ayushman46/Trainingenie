import type { ReactNode } from "react";

/**
 * Short facts separated by middots ("4 training areas · 45 topics") in 14px grey. Each item stays whole
 * and its dot leads it, so a dot never ends a line; the list is pulled 20px left under a clipping
 * wrapper, so the dot leading each line's first item is cut off and never starts one either. A wrapped
 * line therefore reads as cleanly as the first, at every width. Screen readers hear a list, not the dots.
 * Items are plain text (the clip would cut a focus ring). Counts come from data.
 */
export function MetaLine({ items, tone = "light", className = "" }: { items: ReactNode[]; tone?: "light" | "night"; className?: string }) {
  return <div className={`overflow-hidden ${className}`}>
    <ul className={`-ml-5 flex flex-wrap items-center gap-y-1 type-label font-normal ${tone === "night" ? "text-night-muted" : "text-muted-foreground"}`}>
      {items.map((item, index) => <li key={index} className="flex items-center whitespace-nowrap">
        <span aria-hidden="true" className={`w-5 shrink-0 text-center ${tone === "night" ? "text-night-border" : "text-border-strong"}`}>·</span>
        <span>{item}</span>
      </li>)}
    </ul>
  </div>;
}

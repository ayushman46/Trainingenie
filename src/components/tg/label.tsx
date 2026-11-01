import type { ReactNode } from "react";

/**
 * The small sentence-case label above a heading, Nike style: plain 14px medium grey text, with no
 * dot and no number. `n` is accepted for compatibility with the numbered v5 labels but is not shown.
 * `as="h2"` makes the label itself the section heading. `tone="night"` for the black band.
 */
export function Label({ tone = "light", as: Tag = "p", id, className = "", children }: { n?: string; tone?: "light" | "night"; as?: "p" | "h2" | "span"; id?: string; className?: string; children: ReactNode }) {
  return <Tag id={id} className={`block type-label ${tone === "night" ? "text-night-muted" : "text-muted-foreground"} ${className}`}>{children}</Tag>;
}

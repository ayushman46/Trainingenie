import type { ReactNode } from "react";
import { Container } from "./container";

export type SectionTone = "paper" | "tint" | "sand" | "night";

// Each tone also sets --section-bg, which the timeline dots use to mask the dotted rule behind them.
const tones: Record<SectionTone, string> = {
  paper: "bg-background text-foreground [--section-bg:var(--background)]",
  tint: "bg-tint text-foreground [--section-bg:var(--tint)]",
  // The v5 name for the grey band, kept for existing callers.
  sand: "bg-tint text-foreground [--section-bg:var(--tint)]",
  night: "bg-night text-night-foreground [--section-bg:var(--night)]",
};
// Phones get a little less than tablets, so stacked hero and section paddings never leave an empty band.
const sizes = { default: "py-12 md:py-20 lg:py-24", tight: "py-10 lg:py-16", none: "" };

/**
 * A full-width band. White is the page; use `tint` (#f5f5f5, alias `sand`) at most once per page and
 * never behind MediaTiles (their panels are #f5f5f5 too); `night` (black) only for the closing band.
 * `divider` draws the hairline that separates two adjacent white sections. It is inset to the
 * container (1200px of content, like every other rule on the page), not full-bleed, and sits on the
 * section's top edge whatever its padding; it carries `data-section-divider` so a neighbour can hide
 * it (PageHero does, on phones, when its aside already closes on a hairline).
 * `size="none"` drops the vertical padding so the caller can set its own through `className`.
 */
export function Section({ id, tone = "paper", size = "default", divider = false, labelledBy, ariaLabel, className = "", containerClassName = "", children }: { id?: string; tone?: SectionTone; size?: keyof typeof sizes; divider?: boolean; labelledBy?: string; ariaLabel?: string; className?: string; containerClassName?: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={labelledBy} aria-label={ariaLabel} className={`${tones[tone]} ${sizes[size]} ${divider ? "relative" : ""} ${className}`}>
    {divider && <div aria-hidden="true" data-section-divider className="pointer-events-none absolute inset-x-0 top-0"><Container><div className="border-t border-border" /></Container></div>}
    <Container className={containerClassName}>{children}</Container>
  </section>;
}

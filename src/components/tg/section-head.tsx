import type { ReactNode } from "react";
import { Label } from "./label";

/**
 * The shared gaps after a section opening: `body` from a SectionHead to the section's content,
 * `action` to a trailing TextLink, `rowBody` from a RowHead to its row of tiles, logos or links.
 */
export const HEAD = { body: "mt-10 lg:mt-16", action: "mt-10 lg:mt-12", rowBody: "mt-6 lg:mt-8" } as const;

/**
 * A section opening: a plain grey label, the h2 statement (Geist 500), an optional intro and an
 * optional action (a TextLink). `split` (default) puts the label in columns 1–3 and the heading in
 * columns 4–12 from `lg`, the label on the heading's first baseline; `stack` keeps the label above
 * the heading. Below `lg` both stack, 20px from label to heading. Body blocks that follow a split head
 * start at column 4 (`lg:col-start-4 lg:col-span-9`, or `lg:pl-col-4`), `HEAD.body` below it.
 * `n` is accepted for compatibility and not shown.
 *
 * Which opening to use:
 * - Statement sections (an h2 statement with an intro) use the split head.
 * - Full-width rows of tiles, logos or links use RowHead, at column 1.
 * - Programme pages and the catalogue use `layout="stack"` throughout.
 */
export function SectionHead({ id, label, n, title, intro, action, layout = "split", titleClass = "", tone = "light", className = "" }: { id: string; label: ReactNode; n?: string; title: ReactNode; intro?: ReactNode; action?: ReactNode; layout?: "split" | "stack"; titleClass?: string; tone?: "light" | "night"; className?: string }) {
  const night = tone === "night";
  const body = <>
    <h2 id={id} className={`type-h2 max-w-[22ch] ${night ? "text-night-foreground" : "text-foreground"} ${titleClass}`}>{title}</h2>
    {intro && <p className={`mt-5 max-w-measure type-lead ${night ? "text-night-muted" : "text-copy"}`}>{intro}</p>}
    {action && <div className={HEAD.action}>{action}</div>}
  </>;
  if (layout === "stack") return <div data-reveal className={className}>
    <Label n={n} tone={tone}>{label}</Label>
    <div className="mt-5">{body}</div>
  </div>;
  return <div data-reveal className={`grid gap-y-5 lg:grid-cols-12 lg:items-baseline lg:gap-x-10 ${className}`}>
    <div className="lg:col-span-3"><Label n={n} tone={tone}>{label}</Label></div>
    <div className="lg:col-span-9">{body}</div>
  </div>;
}

/**
 * A row title, Nike style: the small h2 (type-h3) on the left and its action (a TextLink) on the
 * right, on one baseline, with an optional grey label above and a short intro under it. For
 * full-width rows of tiles, logos or links, at column 1; the row follows at `HEAD.rowBody`.
 * With an intro, phones read title, intro, then the action (as SectionHead), so an action that no
 * longer fits beside a long title never lands between the title and its intro; from `sm` the intro
 * is ordered after the action, on its own line under the title's row.
 */
export function RowHead({ id, title, action, label, intro, className = "" }: { id: string; title: ReactNode; action?: ReactNode; label?: ReactNode; intro?: ReactNode; className?: string }) {
  return <div data-reveal className={className}>
    {label && <Label className="mb-3">{label}</Label>}
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h2 id={id} className="type-h3 text-foreground">{title}</h2>
      {intro && <div className="mt-1 basis-full sm:order-last"><p className="max-w-measure type-ui text-copy">{intro}</p></div>}
      {action && (intro ? <div className="flex max-sm:mt-2">{action}</div> : action)}
    </div>
  </div>;
}

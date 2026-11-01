import type { ReactNode } from "react";
import { Disclosure } from "@/components/kit/disclosure";

/** The small title used by FactList, IndexList and the other "overview" asides ("At a glance", "On this page"): 14px medium ink. */
export const listTitleClass = "type-label text-foreground";

type FactRows = [term: string, detail: ReactNode][];
type FactLayout = "inline" | "stacked" | "auto";

/** The rows. `rule` is the side each row's hairline is drawn on (top inside a disclosure, which closes on its own rule). */
function FactRowList({ rows, layout, rule, className = "" }: { rows: FactRows; layout: FactLayout; rule: "top" | "bottom"; className?: string }) {
  const hairline = rule === "top" ? "border-t" : "border-b";
  return <dl className={`border-border ${rule === "bottom" ? "border-t" : ""} ${className}`}>
    {rows.map(([term, detail]) => layout !== "stacked"
      ? <div key={term} className={`flex items-baseline justify-between border-border py-3.5 type-ui ${hairline} ${layout === "auto" ? "flex-wrap gap-x-6 gap-y-0.5 max-sm:block" : "gap-6"}`}>
        <dt className={`shrink-0 text-muted-foreground ${layout === "auto" ? "max-sm:type-caption" : ""}`}>{term}</dt>
        <dd className={`tabular-nums text-foreground ${layout === "auto" ? "text-left max-sm:mt-0.5" : "text-right"}`}>{detail}</dd>
      </div>
      : <div key={term} className={`border-border py-3.5 ${hairline}`}>
        <dt className="type-caption text-muted-foreground">{term}</dt>
        <dd className="mt-0.5 type-ui text-foreground">{detail}</dd>
      </div>)}
  </dl>;
}

/**
 * Short facts as hairline rows: "At a glance", the company facts, the programme glance.
 * `inline` puts the term and the value on one row (value right-aligned); `stacked` puts the term
 * above the value, for values longer than about 30 characters; `auto` is stacked below sm, and from
 * sm keeps a row inline (the value at the right) while the value fits beside the term on one line,
 * wrapping the value onto its own left-aligned line under the term when it does not, so a legal name
 * or an address never wraps raggedly beside the term. The title is a <p> by default; pass
 * `headingLevel` 2 or 3 to make it a heading at the same size.
 *
 * `collapsible` (with a title): below `md` the rows fold into one closed Disclosure row named by the
 * title, so a phone hero is not pushed down by an open list; from `md` (a tablet, where the hero has
 * the width for it) the list is open as usual, and print always shows the open list. The title
 * element and its `id` belong to the open copy only, so no id is ever repeated.
 */
export function FactList({ title, rows, layout = "inline", headingLevel = "p", id, collapsible = false, className = "" }: { title?: string; rows: FactRows; layout?: FactLayout; headingLevel?: 2 | 3 | "p"; id?: string; collapsible?: boolean; className?: string }) {
  const Title = headingLevel === 2 ? "h2" : headingLevel === 3 ? "h3" : "p";
  const open = <>
    {title && <Title id={id} className={listTitleClass}>{title}</Title>}
    <FactRowList rows={rows} layout={layout} rule="bottom" className={title ? "mt-3" : ""} />
  </>;
  if (!collapsible || !title) return <div className={className}>{open}</div>;
  return <div className={className}>
    <Disclosure title={title} className="md:hidden print:hidden"><FactRowList rows={rows} layout={layout} rule="top" /></Disclosure>
    <div className="max-md:hidden print:block">{open}</div>
  </div>;
}

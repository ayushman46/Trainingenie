import Link from "next/link";
import { Disclosure } from "@/components/kit/disclosure";
import { isPlainHref } from "./button";
import { listTitleClass } from "./fact-list";
import { ArrowIcon } from "./icons";

export type IndexRow = { href: string; label: string; count?: number; unit?: string; sub?: string; arrow?: "right" | "down" };
export type IndexSection = { heading?: string; rows: IndexRow[] };

// "1 topics" reads wrong, so a unit ending in "s" drops it for a count of one.
const countLabel = (count: number, unit = "") => `${count} ${count === 1 && unit.endsWith("s") ? unit.slice(0, -1) : unit}`.trim();

/**
 * One hairline row: the label (and optional sub-line) on the left, the count or an arrow on the right.
 * `rule` is the side its hairline is drawn on. Keyboard focus shows the hover cues too (the underline
 * and the arrow's nudge), and a square ring, so the hairline's ends stay straight.
 */
function IndexRowLink({ row, rule }: { row: IndexRow; rule: "top" | "bottom" }) {
  const className = `group/index flex items-baseline justify-between gap-4 border-border py-3.5 focus-visible:rounded-none ${rule === "top" ? "border-t" : "border-b"}`;
  const direction = row.arrow ?? (row.href.startsWith("#") ? "down" : "right");
  const content = <>
    <span className="min-w-0">
      <span className="block type-ui text-foreground decoration-1 underline-offset-4 group-hover/index:underline group-focus-visible/index:underline">{row.label}</span>
      {row.sub && <span className="mt-0.5 block type-caption text-muted-foreground">{row.sub}</span>}
    </span>
    {row.count !== undefined
      ? <span className="shrink-0 text-[0.875rem] tabular-nums text-muted-foreground">{countLabel(row.count, row.unit)}</span>
      : <ArrowIcon direction={direction} className={`size-4 translate-y-[3px] text-muted-foreground transition-[color,translate] duration-200 group-hover/index:text-foreground group-focus-visible/index:text-foreground ${direction === "down" ? "group-hover/index:translate-y-[6px] group-focus-visible/index:translate-y-[6px]" : "group-hover/index:translate-x-[3px] group-focus-visible/index:translate-x-[3px]"}`} />}
  </>;
  return isPlainHref(row.href) ? <a href={row.href} className={className}>{content}</a> : <Link href={row.href} className={className}>{content}</Link>;
}

/**
 * An overview index for hero asides ("In this area", "In this catalogue", "On this page"): a nav of
 * hairline rows, each one link whose label underlines on hover. The right side shows
 * "{count} {unit}" when a count is given, else an arrow (down for same-page "#…" links, right
 * otherwise, or as set per row). Section headings sit in the title style.
 *
 * `collapsible`: below `lg` the index folds into one closed Disclosure row (its title, with a plus
 * that turns to a cross when open), the same pattern as the privacy policy's contents, so a phone hero
 * does not stack open rows before the content. From `lg` it is open as usual.
 * `collapsible="always"` keeps that closed disclosure row at every width (the programme hero asides).
 */
export function IndexList({ title, id, sections, collapsible = false, className = "" }: { title: string; id: string; sections: IndexSection[]; collapsible?: boolean | "always"; className?: string }) {
  const open = <>
    <p id={id} className={listTitleClass}>{title}</p>
    {sections.map((section, sectionIndex) => <div key={section.heading ?? sectionIndex}>
      {section.heading && <p className={`mt-8 ${listTitleClass}`}>{section.heading}</p>}
      <ul className="mt-3 border-t border-border">
        {section.rows.map((row) => <li key={row.href + row.label}><IndexRowLink row={row} rule="bottom" /></li>)}
      </ul>
    </div>)}
  </>;
  return <nav aria-labelledby={id} className={className}>
    {/* With no open copy of the index (`always`), the summary's title names the nav. */}
    {collapsible && <Disclosure title={<span id={collapsible === "always" ? id : undefined}>{title}</span>} className={collapsible === "always" ? "" : "lg:hidden"}>
      {sections.map((section, sectionIndex) => <div key={section.heading ?? sectionIndex}>
        {section.heading && <p className="border-t border-border pb-1 pt-4 type-label text-muted-foreground">{section.heading}</p>}
        <ul>{section.rows.map((row) => <li key={row.href + row.label}><IndexRowLink row={row} rule="top" /></li>)}</ul>
      </div>)}
    </Disclosure>}
    {collapsible === "always" ? null : collapsible ? <div className="max-lg:hidden">{open}</div> : open}
  </nav>;
}

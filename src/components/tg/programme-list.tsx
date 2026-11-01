import Link from "next/link";
import type { ReactNode } from "react";
import { programmeArea } from "@/components/site/areas";
import { COURSES } from "@/data";
import { isPlainHref } from "./button";
import { ArrowIcon } from "./icons";

export type LinkRow = { href: string; title: ReactNode; meta?: ReactNode; aside?: ReactNode; external?: boolean };

const columnClasses = { 1: "", 2: "sm:grid sm:grid-cols-2 sm:gap-x-10", 3: "sm:grid sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3" } as const;

/**
 * One hairline link row, the site's one size for it: a 16px title, an optional grey `meta` line under
 * it, optional `aside` text on the right and a 16px arrow. Hover and keyboard focus show the same cue
 * (the title underlined, the arrow nudged the way it points and inked). Site paths use next/link, other
 * hrefs a plain <a>; same-page "#…" links get a down arrow, as in IndexList, and `external` opens in a
 * new tab with an up-right arrow. The row draws its own bottom rule, so its focus ring stays square (a
 * rounded ring would bend the rule's ends).
 */
export function RowLink({ href, title, meta, aside, external = false, className = "" }: LinkRow & { className?: string }) {
  const rowClass = `group/row flex min-h-13 items-center justify-between gap-4 border-b border-border py-3.5 focus-visible:rounded-none ${className}`;
  const direction = external ? "up-right" : href.startsWith("#") ? "down" : "right";
  const content = <>
    <span className="min-w-0">
      <span className="block text-[1rem] leading-[1.45] text-foreground decoration-1 underline-offset-4 group-hover/row:underline group-focus-visible/row:underline">{title}</span>
      {meta && <span className="mt-0.5 block type-caption text-muted-foreground">{meta}</span>}
    </span>
    <span className="flex shrink-0 items-center gap-3">
      {aside && <span className="text-[0.875rem] text-muted-foreground">{aside}</span>}
      <ArrowIcon direction={direction} className={`size-4 shrink-0 text-muted-foreground transition-[color,translate] duration-200 group-hover/row:text-foreground group-focus-visible/row:text-foreground ${direction === "down" ? "group-hover/row:translate-y-[3px] group-focus-visible/row:translate-y-[3px]" : "group-hover/row:translate-x-[3px] group-focus-visible/row:translate-x-[3px]"}`} />
    </span>
    {external && <span className="sr-only"> (opens in a new tab)</span>}
  </>;
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={rowClass}>{content}</a>;
  if (isPlainHref(href)) return <a href={href} className={rowClass}>{content}</a>;
  return <Link href={href} className={rowClass}>{content}</Link>;
}

/**
 * Compact hairline link rows, each one RowLink. The building block for ProgrammeList, the company
 * links, the status pages' links and the blog's reading list. Rows flow into 2 or 3 columns from
 * `sm` / `lg`; every cell in a grid row shares one bottom rule.
 */
export function LinkRows({ items, columns = 1, className = "" }: { items: LinkRow[]; columns?: 1 | 2 | 3; className?: string }) {
  return <ul className={`border-t border-border ${columnClasses[columns]} ${className}`}>
    {/* h-full: in a multi-column grid the li stretches to the row height, so the link (which carries
        the hairline) must too, or the rules in one grid row sit at different heights. */}
    {items.map((item, index) => <li key={`${item.href}-${index}`}><RowLink {...item} className="h-full" /></li>)}
  </ul>;
}

/**
 * The focused programmes as compact link rows: the title, with the area's short name ("Frameworks")
 * on the right. Pass `courses` to show a subset; `showArea={false}` drops the area name (when the
 * rows already sit under their area).
 */
export function ProgrammeList({ courses = COURSES, columns = 1, showArea = true, className = "" }: { courses?: typeof COURSES; columns?: 1 | 2 | 3; showArea?: boolean; className?: string }) {
  return <LinkRows columns={columns} className={className} items={courses.map((course) => ({ href: `/${course.slug}`, title: course.title, aside: showArea ? programmeArea(course.pillar) : undefined }))} />;
}

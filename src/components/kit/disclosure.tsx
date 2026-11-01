import type { ReactNode } from "react";
import { PlusIcon } from "@/components/tg/icons";

/**
 * The site's one disclosure row: a native <details> between two hairlines, its 52px summary the title
 * in 15px medium ink (grey on hover) with a plus that turns into a × when open. It opens and closes at
 * the accordion's pace where the browser can animate it (the `disclosure` class in globals.css), and
 * works without JavaScript. Used for the folded indexes and glance lists on phones.
 */
export function Disclosure({ title, children, id, className = "", summaryClassName = "", defaultOpen = false }: { title: ReactNode; children: ReactNode; id?: string; className?: string; summaryClassName?: string; defaultOpen?: boolean }) {
  return <details id={id} open={defaultOpen || undefined} className={`disclosure group/disclosure border-y border-border ${className}`}>
    <summary className={`flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 type-ui font-medium text-foreground transition-colors hover:text-muted-foreground [&::-webkit-details-marker]:hidden ${summaryClassName}`}>
      {title}
      <PlusIcon className="size-[18px] text-foreground transition-transform duration-(--motion-ui) group-open/disclosure:rotate-45" />
    </summary>
    {children}
  </details>;
}

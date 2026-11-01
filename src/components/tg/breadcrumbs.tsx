import Link from "next/link";

/** `short` is a linked crumb's phone label (below sm), e.g. "Frameworks"; the JSON-LD keeps `label`. */
export type Crumb = { label: string; href?: string; short?: string };

/**
 * Home / … / the current page, in 14px grey with the current page in ink. Home is always first; pass
 * the trail after it. An item without an href is the current page. Each link's 13px vertical padding,
 * cancelled by an equal negative margin, gives it a 44px tap target without changing the line.
 *
 * Phones (below sm) keep the trail to one line: in a trail deeper than Home / page, the current page
 * (and the slash before it) is for screen readers only, since the h1 right under it already names the
 * page. A parent with a `short` label shows it there instead, so a programme reads in full as
 * "Home / Training / Frameworks"; a long parent label without one ends in an ellipsis rather than
 * wrapping. Only the deepest parent shrinks: Home and any short level above it ("Training") stay
 * whole. A short Home / page trail stays whole, so it never shows a lone "Home". The Home link is not
 * prefetched, so an inner page never loads the landing page (and its slogan font) in the background.
 */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const deep = trail.length > 2;
  return <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-y-1 text-[0.875rem] leading-[1.4] text-muted-foreground max-sm:flex-nowrap">
      {trail.map((item, index) => <li key={`${item.label}-${index}`} className={`flex items-center ${index === 0 || (deep && index < trail.length - 2) ? "shrink-0" : "min-w-0"} ${!item.href && deep ? "max-sm:sr-only" : ""}`}>
        {index > 0 && <span aria-hidden="true" className="mx-2 shrink-0 text-border-strong">/</span>}
        {item.href
          ? <Link href={item.href} prefetch={index === 0 ? false : undefined} className={`-my-[13px] min-w-0 py-[13px] transition-colors duration-200 hover:text-foreground ${item.short ? "" : "max-sm:truncate"}`}>{item.short ? <><span className="sm:hidden">{item.short}</span><span className="max-sm:hidden">{item.label}</span></> : item.label}</Link>
          : <span aria-current="page" className="min-w-0 text-foreground max-sm:truncate">{item.label}</span>}
      </li>)}
    </ol>
  </nav>;
}

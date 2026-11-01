import type { ReactNode } from "react";
import { PRIMARY_CTA } from "@/data/site-copy";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { ButtonLink } from "./button";
import { Container } from "./container";
import { Label } from "./label";
import { MetaLine } from "./meta-line";

export type HeroAction = { label: string; href: string };

/**
 * A text h1 of three or more words keeps its last two together, so balancing never leaves one word on
 * the last line ("ITIL 4 Foundation / Training" sets as "ITIL 4 / Foundation Training"). The longest
 * last pair fits a 360px screen's measure; below that it may break, so nothing overflows a 320px one.
 */
function keepLastPair(title: ReactNode) {
  if (typeof title !== "string") return title;
  const words = title.split(" ");
  if (words.length < 3) return title;
  return <>{words.slice(0, -2).join(" ")} <span className="min-[360px]:whitespace-nowrap">{words.slice(-2).join(" ")}</span></>;
}

/**
 * Every inner page's opening: breadcrumbs, then the label, the h1 (Geist 500), the lead, optional
 * meta and the actions as Nike pills, in columns 1–8 on desktop, with an optional aside (At a glance,
 * In this area, On this page…) in columns 9–12, top-aligned with the label, and after the actions on
 * phones. The text keeps all eight columns beside an aside, so the longest h1 still sets in three
 * lines at the display size (the lead stops at its measure well before the aside); without one it
 * spans the row, so the h1's own 20ch measure decides its breaks ("Frequently Asked Questions" stays
 * one line at 1024). It also emits the
 * BreadcrumbList JSON-LD exactly as PageShell did: `ldCrumbs` overrides its items when they differ
 * from the visible `crumbs`.
 *
 * - `label` is the plain grey label above the h1; omit it for none. `eyebrow` is a second grey line.
 * - `primary` defaults to "Discuss your training needs" → /contact-us (black pill); pass null to hide it.
 * - `secondary` is a white pill beside it (a same-page "#…" href scrolls smoothly).
 * - `asideTop` renders above the aside (the area pages' DotNumeral).
 * - `children` render after the meta line, before the actions.
 * - `proof` renders last in the text column, after the actions (or after `children` when there are
 *   none): the client proof row (ClientProof).
 * - `size="compact"` shortens the bottom padding.
 *
 * On phones the pills stack at the full content width (one pill width site-wide, as in the closing
 * band and the menu sheet); from `sm` they sit side by side at their own widths. The pill row is a
 * `data-cta-zone`, so the phone action bar steps aside while it is on screen.
 * With an aside, the aside's closing hairline separates the hero from the next section below `lg`, so
 * that section's own divider is hidden there (no double rule); from `lg` the divider shows. When the
 * aside folds into a disclosure row there (In this area, On this page, At a glance), the hero keeps
 * only a 16px step under that row, so the next section's own top padding is the gap and no blank
 * band reads as something that failed to load. Open asides and asides hidden below `lg` keep the
 * hero's usual padding.
 */
export function PageHero({ crumbs, ldCrumbs, label, eyebrow, title, lead, meta, primary, secondary, aside, asideTop, proof, size = "default", titleClassName = "", children }: { crumbs: Crumb[]; ldCrumbs?: Crumb[]; label?: ReactNode; eyebrow?: ReactNode; title: ReactNode; lead: ReactNode; meta?: ReactNode[]; primary?: HeroAction | null; secondary?: HeroAction; aside?: ReactNode; asideTop?: ReactNode; proof?: ReactNode; size?: "default" | "compact"; titleClassName?: string; children?: ReactNode }) {
  const hasAside = Boolean(aside || asideTop);
  const button = primary === null ? null : primary ?? PRIMARY_CTA;
  const bottom = `${size === "compact" ? "pb-8 md:pb-12 lg:pb-16" : "pb-10 md:pb-16 lg:pb-20"} ${hasAside ? "max-lg:has-[[data-hero-aside]_details]:pb-4" : ""}`;
  return <header className={`bg-background ${hasAside ? "max-lg:[&+section>[data-section-divider]]:hidden" : ""}`}>
    <Container className={`pt-8 sm:pt-10 lg:pt-12 ${bottom}`}>
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 grid gap-y-10 lg:mt-12 lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-14">
        <div className={hasAside ? "lg:col-span-8" : "lg:col-span-12"}>
          {label && <Label>{label}</Label>}
          {eyebrow && <p className={`type-caption text-muted-foreground ${label ? "mt-1" : ""}`}>{eyebrow}</p>}
          <h1 className={`type-display max-w-[20ch] text-foreground ${label || eyebrow ? "mt-5" : ""} ${titleClassName}`}>{keepLastPair(title)}</h1>
          <p className="mt-7 max-w-measure type-lead text-copy">{lead}</p>
          {meta && meta.length > 0 && <MetaLine items={meta} className="mt-6" />}
          {children}
          {(button || secondary) && <div data-cta-zone className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
            {button && <ButtonLink href={button.href}>{button.label}</ButtonLink>}
            {secondary && <ButtonLink href={secondary.href} variant="secondary">{secondary.label}</ButtonLink>}
          </div>}
          {proof && <div className="mt-8 sm:mt-10">{proof}</div>}
        </div>
        {hasAside && <div data-hero-aside className="lg:col-span-4 lg:col-start-9">
          {asideTop}
          {aside}
        </div>}
      </div>
    </Container>
    {breadcrumbJsonLd(ldCrumbs ?? crumbs)}
  </header>;
}

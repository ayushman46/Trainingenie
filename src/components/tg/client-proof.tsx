import { CLIENT_REFERENCES, HERO_CLIENTS } from "@/data";
import { UI_LABELS } from "@/data/site-copy";
import { LogoWall } from "./logo-wall";
import { TextLink } from "./text-link";

/**
 * The shared client proof row: the grey label (UI_LABELS.clientsInclude), with "All 12 clients" (the
 * count comes from the list) on the right linking to the Clients page, over the five hero logos in one
 * inline row. Phones show the first four, and screens under 360px the first three, so the row never
 * wraps there. The row is as wide as its logos (never wider than its column), so the link ends on the
 * last logo's edge however wide the column is. For the heroes (PageHero's `proof` slot) and the
 * enquiry aside; `link={false}` drops the link. Every page that renders it is in ClientNote's list,
 * so the references note shows in its footer.
 */
export function ClientProof({ link = true, className = "" }: { link?: boolean; className?: string }) {
  return <div className={`w-fit max-w-full ${className}`}>
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <p className="type-label text-muted-foreground">{UI_LABELS.clientsInclude}</p>
      {link && <TextLink href="/clients-and-testimonials" size="sm">All {CLIENT_REFERENCES.length} clients</TextLink>}
    </div>
    <LogoWall variant="inline" clients={HERO_CLIENTS} className="mt-3 max-sm:[&>li:nth-child(5)]:hidden max-[359px]:[&>li:nth-child(4)]:hidden" />
  </div>;
}

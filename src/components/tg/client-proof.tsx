import { CLIENT_REFERENCES, HERO_CLIENTS } from "@/data";
import { UI_LABELS } from "@/data/site-copy";
import { LogoWall } from "./logo-wall";
import { TextLink } from "./text-link";

/**
 * The shared client proof row: the grey label over the five hero logos, then "All 12 clients and past
 * work" (the count comes from the list) linking to the Clients page. The link follows the list, so
 * screen readers hear every client before it, and it sits under the label on the same left edge. Desktop shows
 * the logos in one inline row; phones show all five as a three-column grid, so the row is never cut
 * off. The row is as wide as its logos (never wider than its column). With the link (programme, area
 * and enquiry pages) the label reads "TraininGenie clients include", since the names are clients
 * across training areas, not of that programme. For the heroes (PageHero's `proof` slot) and the
 * enquiry aside; `link={false}` drops the link. Every page that renders it is in ClientNote's list,
 * so the references note shows in its footer.
 */
export function ClientProof({ link = true, className = "" }: { link?: boolean; className?: string }) {
  return <div className={`w-fit max-w-full ${className}`}>
    <p className="type-label text-muted-foreground">{link ? `TraininGenie ${UI_LABELS.clientsInclude.toLowerCase()}` : UI_LABELS.clientsInclude}</p>
    <LogoWall variant="inline" clients={HERO_CLIENTS} label="Selected clients" className="mt-3 max-sm:grid max-sm:grid-cols-3 max-sm:gap-x-4" />
    {link && <p className="mt-2"><TextLink href="/clients-and-testimonials" size="sm">All {CLIENT_REFERENCES.length} clients and past work</TextLink></p>}
  </div>;
}

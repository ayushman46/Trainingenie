import { plural } from "@/components/catalogue/utils";
import { TopicsDisclosure } from "@/components/catalogue/topics-disclosure";
import type { Area } from "@/components/site/areas";
import { AREA_COPY, type AreaSlug } from "@/data/site-copy";
import { Label } from "./label";
import { MetaLine } from "./meta-line";
import { TextLink } from "./text-link";
import { TopicGroups } from "./topic-groups";

/**
 * One training area of the catalogue, open rather than boxed: the area's plain grey eyebrow over its
 * name on the left; on the right its one-line summary, its counts and the link to its page. Every
 * topic follows by group. Blocks after the first open with a hairline. The focused programmes are
 * listed once, as tiles in the catalogue's programmes section, so a block links to them only from
 * its topics (the grey "Focused programme" tags); every other topic opens the enquiry form with the
 * topic filled in. On phones the counts sit over the link, so the link
 * always starts at the left edge, and the topics wait behind one closed "See all … topics" row (one
 * column when open, as on the area pages), so the catalogue reads as four areas rather than a wall.
 */
export function AreaBlock({ area, className = "" }: { area: Area; className?: string }) {
  const copy = AREA_COPY[area.slug as AreaSlug];
  const headingId = `${area.slug}-heading`;
  // A count of one says little, so a single group is not counted.
  const meta = [plural(area.topics, "topic"), ...(area.groups.length > 1 ? [plural(area.groups.length, "group")] : [])];
  return <section id={area.slug} aria-labelledby={headingId} className={`border-t border-border pt-10 first:border-t-0 first:pt-0 md:pt-14 lg:pt-16 ${className}`}>
    <div className="grid gap-y-5 lg:grid-cols-12 lg:items-end lg:gap-x-10">
      <div className="lg:col-span-7">
        <Label>{copy.eyebrow}</Label>
        <h2 id={headingId} className="mt-5 max-w-[22ch] type-h2 text-foreground">{area.title}</h2>
      </div>
      <div className="lg:col-span-5">
        <p className="max-w-measure type-body text-copy">{copy.summary}</p>
        <div className="mt-4 flex flex-col items-start gap-y-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
          <MetaLine items={meta} />
          <TextLink href={area.href} size="sm">Explore {area.title}</TextLink>
        </div>
      </div>
    </div>
    <TopicsDisclosure count={area.topics}>
      <TopicGroups variant="compact" groups={area.groups} className="max-md:pb-6 max-md:pt-4" />
    </TopicsDisclosure>
  </section>;
}

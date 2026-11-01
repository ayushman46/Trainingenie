import type { Metadata } from "next";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { AREAS, TOTAL_PROGRAMMES, TOTAL_TOPICS } from "@/components/site/areas";
import { AreaBlock } from "@/components/tg/area-block";
import { HowItWorks } from "@/components/tg/area-page";
import { ClientProof } from "@/components/tg/client-proof";
import { ClosingBand } from "@/components/tg/closing-band";
import { ArrowIcon } from "@/components/tg/icons";
import { MediaTile, MediaTileGrid } from "@/components/tg/media-tile";
import { PageHero } from "@/components/tg/page-hero";
import { ProgrammeGroups } from "@/components/tg/programme-groups";
import { CustomizedTile } from "@/components/tg/programme-rows";
import { Section } from "@/components/tg/section";
import { HEAD, RowHead, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { PAST_TRAININGS } from "@/data";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Corporate Training Services", "Explore TraininGenie's complete corporate training catalogue across technology, leadership, soft skills, management systems, standards, and GRC.", "/corporate-training-services");

// The catalogue's defining counts, set as plain figures with the labels /what-we-do uses for the same counts.
const COUNTS: [count: number, label: string][] = [[AREAS.length, "Training areas"], [TOTAL_TOPICS, "Topics"], [TOTAL_PROGRAMMES, "Programmes"]];

export default function Page() {
  return <>
    {/* The counts sit beside the text as plain figures, each with its label: stacked rows from lg, the
        figures right-aligned in a two-digit column so the labels share one edge. Below lg they run as
        three columns under the client proof row, pulled 16px into the hero's gap: the figure over its
        label, as on /what-we-do. */}
    <PageHero crumbs={[{ label: "Training" }]} label="Training" title="Corporate Training Services"
      lead="A complete catalogue of learning areas for organizations. Programmes can be selected as standard offerings or fine-tuned around a specific requirement, audience, and desired outcome."
      meta={["Online, onsite or hybrid"]}
      secondary={{ label: `Browse ${TOTAL_TOPICS} topics`, href: `#${AREAS[0].slug}` }} size="compact"
      proof={<ClientProof />}
      aside={<ul className="grid grid-cols-3 gap-x-4 border-t border-border pt-5 max-lg:-mt-4 lg:block lg:pt-0">
        {COUNTS.map(([count, label]) => <li key={label} className="flex flex-col items-start gap-1 lg:flex-row lg:items-baseline lg:gap-5 lg:border-b lg:border-border lg:py-4">
          <span className="type-h2 tabular-nums text-foreground lg:w-[2ch] lg:shrink-0 lg:text-right">{count}</span>
          <span className="type-caption text-copy lg:type-ui">{label}</span>
        </li>)}
      </ul>} />

    {/* The catalogue's index, Nike style: a row title with the jump to the programmes on the right,
        then the four areas as media tiles, each jumping to its full topic list below (the down arrow
        after the count says so, as on the site's same-page links). Four across from lg, two by two
        below (an index should show every area at once, so no sideways rail). */}
    <Section size="none" labelledBy="catalogue-index-heading" className="pb-12 md:pb-20 lg:pb-24">
      {/* "focused" is dropped from the link below sm, so the title and link share one baseline on phones */}
      <RowHead id="catalogue-index-heading" title="Training areas" action={<TextLink href="#programmes" arrow="down" size="sm"><span>{TOTAL_PROGRAMMES} <span className="max-sm:hidden">focused </span>programmes</span></TextLink>} />
      <div data-reveal className={HEAD.rowBody}>
        <MediaTileGrid columns={4} phone={2} label="Training areas">
          {AREAS.map((area) => <MediaTile key={area.slug} aspect="square" href={`#${area.slug}`} emblem={EMBLEM_BY_PATH[area.href]}
            title={<span className="block pr-4">{area.title}</span>}
            subtitle={<span className="inline-flex items-center gap-1">{area.topics} topics<ArrowIcon direction="down" className="size-3.5 transition-transform duration-200 ease-out group-hover/tile:translate-y-[2px]" /></span>} />)}
        </MediaTileGrid>
      </div>
    </Section>

    {/* Every area with every topic */}
    <Section divider ariaLabel="All training topics">
      <div className="space-y-10 md:space-y-14 lg:space-y-16">{AREAS.map((area) => <AreaBlock key={area.slug} area={area} />)}</div>
    </Section>

    {/* The one listing of the focused programmes: seven tiles across the full width, with the
        customized tile in the eighth cell. On phones the tiles run two across and the customized tile
        follows as one full-width row. White, because the tiles' panels are grey. The head is stacked,
        so it starts at the tiles' left edge. */}
    <Section id="programmes" divider labelledBy="programmes-heading">
      <SectionHead id="programmes-heading" layout="stack" label="Focused programmes" title="Programmes explained in depth." intro="Each programme page sets out what the subject is, the key concepts participants learn, who should attend, and how it is shaped for your team." />
      <div data-reveal className={HEAD.body}>
        <ProgrammeGroups extra={<CustomizedTile />} />
      </div>
    </Section>

    {/* How every programme is shaped, the same strip as on the area pages: the page's one grey band */}
    <HowItWorks tone="tint" />

    {/* Recently delivered, stacked like the programmes head, so every head on the page starts at the left edge */}
    <Section id="past-training-topics" labelledBy="past-training-topics-heading">
      <SectionHead id="past-training-topics-heading" layout="stack" label="Past training topics" title="Recently delivered topics" intro="A sample of recent programmes. See what each covers on the past trainings page." action={<TextLink href="/past-trainings">See past trainings</TextLink>} />
      <ul data-reveal className={`${HEAD.body} grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4`}>
        {PAST_TRAININGS.slice(0, 4).map((training) => <li key={training.title} className="border-t border-border pt-5">
          <h3 className="type-ui font-medium text-pretty text-foreground">{training.title}</h3>
          <p className="mt-1 type-label text-muted-foreground">{training.tags.join("\u00a0· ")}</p>
        </li>)}
      </ul>
    </Section>

    <ClosingBand />
    {serviceJsonLd({ name: "Corporate Training Services", description: "Corporate training and professional learning across technology, leadership, management systems, standards, and GRC.", path: "/corporate-training-services" })}
  </>;
}

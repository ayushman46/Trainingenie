import type { Metadata } from "next";
import Link from "next/link";
import { CompanyLinks } from "@/components/company/company-links";
import { OnThisPage } from "@/components/company/on-this-page";
import { PAST_TRAINING_GROUPS } from "@/components/company/past-training-groups";
import { ClosingBand } from "@/components/tg/closing-band";
import { LogoWall } from "@/components/tg/logo-wall";
import { PageHero } from "@/components/tg/page-hero";
import { Section } from "@/components/tg/section";
import { HEAD, RowHead, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { CLIENT_REFERENCES } from "@/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Clients", "Organizations that have worked with TraininGenie for corporate training and learning include Colgate-Palmolive, HDFC Home Loans, Harman, NTT DATA, Alcon and TeamLease.", "/clients-and-testimonials");

// The sectors the clients come from, read in the hero lead, so the logos follow the hero directly.
// Neither the sector count nor the past-training count is promoted to the meta line until the owner
// supplies real scale numbers: the trainings show per group in #past-work.
const sectors = ["technology", "financial services", "healthcare", "consumer goods", "staffing", "the non-profit sector"];
const lead = `A selection of organizations that have worked with TraininGenie, across ${sectors.slice(0, -1).join(", ")}, and ${sectors.at(-1)}.`;
const meta = [`${CLIENT_REFERENCES.length} clients`];

// The hero aside: the page's two sections.
const chapters = [
  { href: "#client-references", label: "Selected clients" },
  { href: "#past-work", label: "Past work" },
];

// The logo wall, set as Nike's product grid: each logo on a square-cornered #f5f5f5 panel (3:2), 4px
// apart, in two rows of six on desktop, three of four from sm and four of three on phones, so all
// twelve start on the first screen and fit in two phone screens. The logos keep LogoWall's own
// greyscale, multiply blend and per-logo sizes; only the cell layout is restyled here, so the
// important (!) utilities override the wall's centred, ruled cells: no hairlines, the panel instead.
// The name captions are dropped: each logo's alt text names it, and NTT DATA, which has no logo
// file, shows its name in its panel, on one line (a 360px phone's panel is about 107px wide).
const logoGrid = [
  "grid-cols-3! gap-1! sm:grid-cols-4! lg:grid-cols-6!",
  "*:items-stretch! *:border-t-0! *:pt-0!",
  "[&>li>div]:h-auto! [&>li>div]:aspect-[3/2] [&>li>div]:bg-tint [&>li>div]:px-4 [&>li>div>span]:whitespace-nowrap",
  "[&>li>p]:hidden!",
].join(" ");

// A training with its own programme page links to it, set like TextLink (an ink underline that turns
// grey on hover, no red). The ::before pads the inline box (about 22px, the font's own height) by 12px
// above and below, to a hit area of about 46px, without moving the line.
const itemLink = "relative text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-3 hover:text-muted-foreground";

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Clients" }]} label="Company" title="Clients" lead={lead} meta={meta} size="compact" aside={<OnThisPage items={chapters} />} />

    {/* The selected clients: every logo on its grey panel, in a tight row band right under the hero
        (the hero lead already says who they are, so the row needs no second opening). The grid runs
        the full width under the row title, as the landing's tile rows do. The references-only line is
        stated once, in the footer's legal lines on every page, not repeated under the logos. */}
    <Section id="client-references" size="tight" divider labelledBy="client-references-heading">
      <RowHead id="client-references-heading" title="Organizations we have worked with." />
      <div className={HEAD.rowBody}>
        <LogoWall variant="captioned" className={logoGrid} />
      </div>
    </Section>

    {/* What the work covered: the past training titles grouped by area, titles only (the tags and
        descriptions live on the Past trainings page). A title with its own programme page links to it.
        The page's one grey band. */}
    <Section id="past-work" tone="tint" labelledBy="past-work-heading">
      <SectionHead id="past-work-heading" label="Past work" title="What the work covered" intro="Training across business tools, ERP and AI, leadership, team effectiveness, and innovation." action={<TextLink href="/past-trainings">See past trainings</TextLink>} />
      {/* From column 4, under the heading, so the text keeps the heading's axis instead of spans that
          start from column 1 (the logo grid above is imagery, so it runs the full width). */}
      <div className={`${HEAD.body} grid gap-12 md:grid-cols-2 md:gap-x-10 lg:pl-col-4`}>
        {PAST_TRAINING_GROUPS.map((group) => <section key={group.key} aria-labelledby={`work-${group.key}`} className="border-t border-border-strong pt-6">
          <h3 id={`work-${group.key}`} className="type-h3 text-foreground">{group.title}</h3>
          <p className="mt-1 type-label tabular-nums text-muted-foreground">{group.items.length} {group.items.length === 1 ? "training" : "trainings"}</p>
          {/* One hairline between titles, so a title that wraps still reads as one item */}
          <ul className="mt-4 divide-y divide-border type-body text-copy">
            {group.items.map((item) => <li key={item.title} className="py-2.5">{item.programme
              ? <Link href={item.programme.href} className={itemLink}>{item.title}<span className="sr-only">: programme page</span></Link>
              : item.title}</li>)}
          </ul>
          {group.area && <div className="mt-5"><TextLink href={group.area.href} size="sm">Explore the area<span className="sr-only">: {group.area.title}</span></TextLink></div>}
        </section>)}
      </div>
    </Section>

    <CompanyLinks current="/clients-and-testimonials" divider={false} />
    <ClosingBand />
  </>;
}

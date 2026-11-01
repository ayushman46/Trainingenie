import type { ReactNode } from "react";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { groupAnchor, type Programme } from "@/components/catalogue/utils";
import { PAST_TRAINING_GROUPS, type PastTraining } from "@/components/company/past-training-groups";
import { AREAS, areaBySlug } from "@/components/site/areas";
import { DELIVERY_PROMISE, PRIMARY_CTA, UI_LABELS } from "@/data/site-copy";
import { ButtonLink } from "./button";
import { ClientProof } from "./client-proof";
import { ClosingBand } from "./closing-band";
import { DeliveryLine } from "./delivery-line";
import { IndexList, type IndexSection } from "./index-list";
import { MediaTile, MediaTileGrid } from "./media-tile";
import { MethodStepsDisclosure } from "./method-steps";
import { PageHero } from "./page-hero";
import { PhaseLine } from "./phase-line";
import { Point } from "./point";
import { ProgrammeFeature } from "./programme-feature";
import { CustomizedTile, ProgrammeRows } from "./programme-rows";
import { Section, type SectionTone } from "./section";
import { HEAD, RowHead, SectionHead } from "./section-head";
import { TextLink } from "./text-link";
import { TopicGroups } from "./topic-groups";

type Props = {
  slug: string;
  title: string;
  intro: string;
  /** Who the area is for, under the label "Who it is for": `title` is a short statement, `statement`
   *  leads and `support` follows; `audiences` lists who its programmes are written for. */
  overview: { title: string; statement: string; support?: string[]; audiences?: boolean };
  /** Every topic by group, under the label "Topics". */
  catalogue: { title: string; intro?: string };
  /** `title` is singular or plural with the count. `discuss` labels the hero's black pill (default
   *  "Discuss your training needs"), which enquires with the area prefilled as the topic. */
  programmes: { title: string; intro?: string; items: Programme[]; showAudience?: boolean; discuss?: string };
  /** The area's own principles, shown as plain columns under the three phases of the method. */
  approach?: [title: string, text: ReactNode][];
  /** Extra content closing the programmes section, such as the note on certification language. It renders
   *  inside that section, so it needs at least one programme: an area without programmes has no such section. */
  note?: ReactNode;
  /** A line under "Recently delivered in this area", where the area has delivered trainings; it can say what that work was. */
  deliveredIntro?: string;
  children?: ReactNode;
};

// Hyphenated words kept on one line, so a narrow column never breaks them at the hyphen.
const needBased = <span className="whitespace-nowrap">need-based</span>;
const fineTuned = <span className="whitespace-nowrap">fine-tuned</span>;
// A title's last two words kept on one line from 360px, so it never ends on one word when it wraps; on
// narrower screens the pair is wider than the column, so there it breaks normally. A no-break space the
// page's title already binds them with counts as a space here.
const keepLastWords = (text: string) => {
  const words = text.split(/[ \u00a0]+/);
  if (words.length < 3) return text;
  return <>{words.slice(0, -2).join(" ")} <span className="min-[360px]:whitespace-nowrap">{words.slice(-2).join(" ")}</span></>;
};

/**
 * "How it works" as a compact reference strip rather than a chapter, shared by the area pages and the
 * catalogue: a row title with the link to the methodology, the three phases on their timeline (set
 * compact, as list items, so the strip's own title outranks them), the
 * area's own principles where it has any (plain columns without numbers, so the six steps stay the only
 * numbered process), then one ruled row with every step behind a disclosure on the left and the
 * delivery formats on the right. The row draws the one rule; the disclosure and the DeliveryLine drop
 * their own, so rules never stack. From `md` the disclosure's plus follows its label, so it never
 * floats mid-row beside the formats. On phones the row stacks: the steps, then the formats, and the
 * phases (which /, /what-we-do and the methodology already show open) fold into the disclosure above
 * the steps, so the strip opens on the principles or the disclosure row. The two copies are never
 * shown together, so the phases are read once at any width.
 */
export function HowItWorks({ principles, tone, divider = false }: { principles?: [title: string, text: ReactNode][]; tone?: SectionTone; divider?: boolean }) {
  return <Section id="approach" tone={tone} size="tight" divider={divider} labelledBy="approach-heading">
    <RowHead id="approach-heading" title="How it works" action={<TextLink href="/training-methodology" size="sm">See how we work</TextLink>} intro="The approach begins by understanding the client problem and the desired outcome. That context shapes the learning experience, the activities, and the practical application." />
    <div data-reveal className={HEAD.rowBody}>
      <PhaseLine size="compact" className="max-md:hidden" />
      {principles && <ul className="mt-10 grid gap-8 border-t border-border pt-8 max-md:mt-0 max-md:border-t-0 max-md:pt-0 md:grid-cols-3 md:gap-10">
        {principles.map(([name, text]) => <li key={name}>
          <h3 className="type-ui font-medium text-foreground">{name}</h3>
          <p className="mt-1 max-w-measure type-ui text-copy">{text}</p>
        </li>)}
      </ul>}
      <div className={`mt-8 grid gap-6 border-t border-border pt-0 md:grid-cols-12 md:items-start ${principles ? "" : "max-md:mt-0"}`}>
        <MethodStepsDisclosure className="border-t-0 md:col-span-8" summaryClassName="md:justify-start md:gap-3" before={<PhaseLine size="compact" className="pt-6 pb-2 md:hidden" />} />
        <div className="md:col-span-4 md:justify-self-end md:pt-4"><DeliveryLine className="!border-t-0 !pt-0" /></div>
      </div>
    </div>
  </Section>;
}

/**
 * One delivered training under a hairline: its title, what the topic covers and its tags. On phones
 * they stack; from `md` the title and tags sit on the left and the description on the right. A
 * training with its own programme page says so in words, as on /past-trainings: "See the programme"
 * under its description (last on phones). No row is a link as a whole, so every title reads the same
 * and a row without a programme page never looks like a link that does nothing.
 */
function DeliveredRow({ item }: { item: PastTraining }) {
  return <div className="py-5 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:grid-rows-[auto_1fr_auto] md:gap-x-10">
    <h3 className="type-ui font-medium text-pretty text-foreground">{item.title}</h3>
    {item.about && <p className="mt-1 max-w-measure type-ui text-copy md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0">{item.about}</p>}
    <p className="mt-2 type-label text-muted-foreground md:col-start-1 md:row-start-2 md:mt-1">{item.tags.join(" · ")}</p>
    {item.programme && <div className="mt-4 md:col-start-2 md:row-start-3 md:mt-3"><TextLink href={item.programme.href} size="sm">See the programme<span className="sr-only">: {item.programme.title}</span></TextLink></div>}
  </div>;
}

/**
 * A training area page, overview first, then the detail, every part open rather than boxed: the hero
 * with a plain "Training area" label, the client proof row and an index of the area (one closed row
 * below `lg`), who it is for, every topic by group (the page's one grey band) with a link to ask about
 * them, the focused programmes across the full width (several as a row of media tiles closed by the
 * customized tile in its last cell; one in full beside its panel, with the customized option under
 * the panel), the area's recently delivered trainings where there are any, how a programme is shaped
 * and delivered (the compact HowItWorks strip), and the other areas as three tiles, closing on the
 * black band. The hero pill, the topics link and the band's pill all open the enquiry form with the
 * area as its topic. The four areas share their section labels ("Who it is for", "Topics",
 * "Programmes", "Past trainings").
 * The visible trail is Home / Training / {title}; the BreadcrumbList keeps its two items (Home, {title}).
 */
export function AreaPage({ slug, title, intro, overview, catalogue, programmes, approach, note, deliveredIntro, children }: Props) {
  const area = areaBySlug(slug);
  const { groups, topics } = area;
  const count = programmes.items.length;
  const others = AREAS.filter((other) => other.slug !== slug);
  const delivered = PAST_TRAINING_GROUPS.filter((group) => group.area?.slug === slug).flatMap((group) => group.items);
  const enquire = (topic: string) => `/contact-us?topic=${encodeURIComponent(topic)}#enquiry`;
  // On phones the option's title is set a step under the programme it follows (17px), so it never outranks it.
  const customized = <Point label="Customized" title={<span className="max-md:text-[1.0625rem] max-md:font-medium max-md:tracking-[-0.005em]">Customized training</span>} action={<TextLink href="#approach" arrow="down">How it works</TextLink>}>TraininGenie specializes in {needBased} customized training, and standard offerings can be {fineTuned} to specific requirements.</Point>;

  // The hero's index: each topic group with its count, then the programme pages.
  const index: IndexSection[] = [
    { rows: groups.map((group) => ({ href: `#${groupAnchor(group.title)}`, label: group.title, count: group.items.length, unit: "topics" })) },
    ...(count > 0 ? [{ heading: count === 1 ? "Focused programme" : "Focused programmes", rows: programmes.items.map((programme) => ({ href: `/${programme.slug}`, label: programme.title, arrow: "right" as const })) }] : []),
  ];

  return <>
    <PageHero
      crumbs={[{ label: "Training", href: "/corporate-training-services" }, { label: title }]}
      ldCrumbs={[{ label: title }]}
      label="Training area"
      title={title}
      lead={intro}
      primary={{ label: programmes.discuss ?? PRIMARY_CTA.label, href: enquire(title) }}
      secondary={{ label: `Browse the ${topics} topics`, href: "#topics" }}
      proof={<ClientProof />}
      // Below lg the delivery promise comes first, as the hero's meta line under the pills, above the closed index row.
      aside={<div className="flex flex-col">
        <IndexList id="in-this-area" title="In this area" sections={index} collapsible />
        <p className="mt-5 type-ui text-copy max-lg:order-first max-lg:mt-0 max-lg:mb-6 lg:mt-8">{DELIVERY_PROMISE}</p>
      </div>}
    />

    {/* Who it is for: where the area lists its audiences, they answer first and the statement follows */}
    <Section id="overview" divider labelledBy="overview-heading">
      <SectionHead id="overview-heading" label="Who it is for" title={overview.title} />
      <div data-reveal className={`${HEAD.body} lg:pl-col-4`}>
        {/* Each programme's audience under its title, between hairlines; three run as one row from lg, so
            no cell is left empty. Once the list has columns each cell draws both its rules, so they break at the gutter. */}
        {overview.audiences ? <>
          <ul className={`grid border-t border-border ${count === 3 ? "lg:grid-cols-3 lg:gap-x-12 lg:border-t-0" : "sm:grid-cols-2 sm:gap-x-12 sm:border-t-0"}`}>
            {programmes.items.map((programme) => <li key={programme.slug} className={`border-b border-border py-4 ${count === 3 ? "lg:border-t" : "sm:border-t"}`}>
              <p className="type-label text-muted-foreground">{programme.title}</p>
              <p className="mt-1 type-body text-foreground">{programme.audience}</p>
            </li>)}
          </ul>
          <p className="mt-6 max-w-measure type-body text-copy">{overview.statement}</p>
        </> : overview.support?.length ? <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          <p className="max-w-measure type-lead text-foreground">{overview.statement}</p>
          <div className="space-y-4">{overview.support.map((text) => <p key={text} className="max-w-measure type-body text-copy">{text}</p>)}</div>
        </div> : <p className="max-w-measure type-lead text-foreground">{overview.statement}</p>}
      </div>
    </Section>

    {/* Every topic, by group: the page's one grey band (no tiles on it), closed by a one-tap enquiry
        with the area prefilled as the training topic */}
    <Section id="topics" tone="tint" labelledBy="topics-heading">
      <SectionHead id="topics-heading" label="Topics" title={catalogue.title} intro={catalogue.intro} />
      <div data-reveal className={`${HEAD.body} lg:pl-col-4`}>
        {/* A lone group named like the section heading keeps its title for screen readers only. */}
        <TopicGroups groups={groups} variant="feature" hideTitle={groups.length === 1 && groups[0].title.toLowerCase() === catalogue.title.toLowerCase()} />
        <div className="mt-10"><TextLink href={enquire(title)}>{UI_LABELS.askTopics}</TextLink></div>
      </div>
    </Section>

    {/* The focused programmes across the full width, like the other areas' tiles below, under a
        stacked section head (it outranks the programme names under it): several as a row of tiles with
        the customized tile in its last cell, one in full beside its panel with the customized option
        under the panel, its black pill enquiring about that programme. The title's last two words are
        kept together from 360px, so a phone never leaves "programme" alone on its last line */}
    {count > 0 && <Section id="programmes" labelledBy="programmes-heading">
      <SectionHead layout="stack" id="programmes-heading" label={count === 1 ? "Programme" : "Programmes"} title={keepLastWords(programmes.title)} intro={programmes.intro} action={<TextLink href="/corporate-training-services#programmes" size="sm">All focused programmes</TextLink>} />
      <div className={HEAD.body}>
        <div data-reveal>
          {count === 1
            ? <ProgrammeFeature programme={programmes.items[0]} aside={customized}><ButtonLink href={enquire(programmes.items[0].title)}>{PRIMARY_CTA.label}</ButtonLink></ProgrammeFeature>
            : <ProgrammeRows items={programmes.items} showAudience={programmes.showAudience !== false} extra={<CustomizedTile />} />}
        </div>
        {note}
      </div>
    </Section>}

    {/* Proof beside the catalogue: the area's trainings from the past trainings page, if it has any */}
    {delivered.length > 0 && <Section id="recently-delivered" divider labelledBy="recently-delivered-heading">
      <SectionHead id="recently-delivered-heading" label="Past trainings" title="Recently delivered in this area" intro={deliveredIntro} action={<TextLink href="/past-trainings">See past trainings</TextLink>} />
      <ul data-reveal className={`${HEAD.body} lg:pl-col-4`}>
        {delivered.map((item) => <li key={item.title} className="border-t border-border"><DeliveredRow item={item} /></li>)}
      </ul>
    </Section>}

    {/* How a programme is shaped and delivered: the three phases, every step one tap away */}
    <HowItWorks principles={approach} divider />

    {/* The rest of the catalogue: a Nike row title from the row's own left edge with its link on the
        right (as the catalogue's "Training areas" row), then the other three areas as media tiles
        across the full width; on phones one compact row per area */}
    <Section id="other-areas" divider labelledBy="other-areas-heading">
      {/* "training" is dropped from the link below sm, so the title and link share one baseline on phones */}
      <div data-reveal className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 id="other-areas-heading" className="type-title text-foreground">Other training areas</h2>
        <TextLink href="/corporate-training-services" size="sm"><span>All <span className="max-sm:hidden">training </span>topics</span></TextLink>
      </div>
      <div data-reveal className="mt-6 lg:mt-8">
        <MediaTileGrid columns={3} phone="list" label="Other training areas" className="max-md:gap-y-0 md:!grid-cols-3">
          {others.map((other) => <MediaTile key={other.slug} aspect="wide" href={other.href} emblem={EMBLEM_BY_PATH[other.href]} title={other.title} subtitle={`${other.topics} topics`} meta={other.description} />)}
        </MediaTileGrid>
      </div>
    </Section>

    <ClosingBand href={enquire(title)} />
    {children}
  </>;
}

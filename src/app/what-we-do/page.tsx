import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { Disclosure } from "@/components/kit/disclosure";
import { AREAS, TOTAL_PROGRAMMES, TOTAL_TOPICS } from "@/components/site/areas";
import { AreaTiles } from "@/components/tg/area-tiles";
import { ClientProof } from "@/components/tg/client-proof";
import { ClosingBand } from "@/components/tg/closing-band";
import { Container } from "@/components/tg/container";
import { DeliveryTriplet } from "@/components/tg/delivery-triplet";
import { FactList } from "@/components/tg/fact-list";
import { Label } from "@/components/tg/label";
import { MethodSteps, MethodStepsDisclosure } from "@/components/tg/method-steps";
import { PageHero } from "@/components/tg/page-hero";
import { PhaseLine } from "@/components/tg/phase-line";
import { ProgrammeList, RowLink } from "@/components/tg/programme-list";
import { Pull } from "@/components/tg/pull";
import { StickyToc, type TocItem } from "@/components/tg/sticky-toc";
import { TextLink } from "@/components/tg/text-link";
import { COMPANY_NAME, COURSES, FAQS, SITE_URL, TRAINING_PILLARS } from "@/data";
import { AUDIENCE_LINKS, AUDIENCES, WHAT_WE_DO } from "@/data/site-copy";
import { jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("What We Do", "What TraininGenie does: need-based corporate training across technology, leadership and soft skills, ITIL, PRINCE2 and Agile, and ISO standards and GRC, customized or standard, delivered online, onsite or hybrid.", "/what-we-do");

// The eight chapters, in page order: the desktop rail, the phone list under the hero and the
// section labels all read from here. The last one is the closing band. No numbers anywhere: Nike
// labels are plain words.
const CHAPTERS: TocItem[] = [
  { id: "what", label: "What TraininGenie is" },
  { id: "kinds", label: "Kinds of training" },
  { id: "custom", label: "Customized or standard" },
  { id: "cert", label: "Certification preparation" },
  { id: "formats", label: "Delivery formats" },
  { id: "who", label: "Who it is for" },
  { id: "engagement", label: "How an engagement works" },
  { id: "next", label: "What to do next" },
];

// The hero lead is the "What is TraininGenie?" answer, verbatim.
const whatIs = FAQS.find(([question]) => question === "What is TraininGenie?")?.[1] ?? FAQS[0][1];

// "At a glance": the counts are computed from the data, never typed. Desktop lists all five as rows;
// phones set the three counts as a figure row ("Programmes" there, as a third of a phone is too narrow
// for "Focused programmes") above the two text rows.
const GLANCE_COUNTS: [string, number][] = [["Training areas", AREAS.length], ["Topics", TOTAL_TOPICS], ["Programmes", TOTAL_PROGRAMMES]];
const GLANCE_DELIVERY: [string, string] = ["Delivery", "Online, onsite or hybrid"];
const GLANCE_BASED_IN: [string, string] = ["Based in", "Bengaluru, India"];

// "Who it is for": each audience (existing copy) leads to the same page as on the landing's "Who it is
// for" rows (AUDIENCE_LINKS), except the HR and L&D row: the landing sends it here, so on this page it
// opens the full catalogue of areas and programmes instead of linking to itself. As on the landing,
// each row names that page under the audience (the same names; the catalogue as the header names it).
const audienceHref: Record<string, string> = { ...AUDIENCE_LINKS, "HR and learning & development teams": "/corporate-training-services" };
const destinationName: Record<string, string> = {
  ...Object.fromEntries(COURSES.map((course) => [`/${course.slug}`, course.title])),
  "/corporate-training-services": "All training topics",
  "/technology-training": "Technology Training",
  "/past-trainings#group-technology-training": "Past trainings: business tools, ERP and AI",
  "/leadership-soft-skills-training#topics": "Leadership and soft skills topics",
};
const audienceRows = AUDIENCES.map((audience) => {
  const href = audienceHref[audience] ?? "/corporate-training-services";
  return { title: audience, href, meta: destinationName[href] };
});

// "What TraininGenie is": the two supporting paragraphs, set side by side from md and folded into a
// disclosure row on phones (see the chapter).
const ABOUT_PARAGRAPHS = [
  "TraininGenie delivers high-quality, enriching training intended to help organizations meet demanding markets and create long-term value by increasing organizational capability, productivity, and competitive edge.",
  "TraininGenie aims to empower people to hone their skills, equip participants with useful knowledge, improve on-the-job productivity, support organizational objectives, and work as partners with clients and participants.",
];

/**
 * One chapter of the page: the plain grey label, one h2 and an optional lead, then its list or visual.
 * `hiddenTitle` keeps the h2 for the outline but hides it, for a chapter whose visual is its heading
 * (the delivery triplet); the visible label is then hidden from assistive technology instead.
 */
function Chapter({ index, title, lead, hiddenTitle = false, titleClassName = "max-w-[20ch]", children }: { index: number; title?: ReactNode; lead?: ReactNode; hiddenTitle?: boolean; titleClassName?: string; children?: ReactNode }) {
  const { id, label } = CHAPTERS[index];
  const headingId = `${id}-heading`;
  return <section id={id} aria-labelledby={headingId} className="border-t border-border py-12 first:border-t-0 first:pt-0 md:py-20 lg:py-24">
    <div data-reveal>
      {hiddenTitle
        ? <><div aria-hidden="true"><Label>{label}</Label></div><h2 id={headingId} className="sr-only">{label}</h2></>
        : <><Label>{label}</Label><h2 id={headingId} className={`mt-5 type-h2 text-foreground ${titleClassName}`}>{title}</h2></>}
      {lead && <p className="mt-5 max-w-measure type-lead text-copy">{lead}</p>}
    </div>
    {children}
  </section>;
}

export default function WhatWeDo() {
  return <>
    <PageHero
      crumbs={[{ label: "What we do" }]}
      label="What we do"
      title="Corporate training for your teams, designed around your requirement."
      lead={whatIs}
      secondary={{ label: "Browse the training areas", href: "#kinds" }}
      proof={<ClientProof />}
      aside={<>
        <FactList title="At a glance" className="hidden lg:block" rows={[
          ["Training areas", String(AREAS.length)],
          ["Topics", String(TOTAL_TOPICS)],
          ["Focused programmes", String(TOTAL_PROGRAMMES)],
          GLANCE_DELIVERY,
          GLANCE_BASED_IN,
        ]} />
        {/* Phones and tablets: the three counts as one row of large figures (the term first in the
            markup, the figure on top on screen), then the two text facts as rows. The facts list's top
            hairline closes the figure row, so the two never double up. */}
        <div className="lg:hidden">
          <p className="sr-only">At a glance</p>
          <dl className="grid grid-cols-3 gap-x-4 border-t border-border py-5">
            {GLANCE_COUNTS.map(([term, value]) => <div key={term} className="flex min-w-0 flex-col-reverse">
              <dt className="mt-1 type-caption text-muted-foreground">{term}</dt>
              <dd className="type-h2 tabular-nums text-foreground">{value}</dd>
            </div>)}
          </dl>
          <FactList rows={[GLANCE_DELIVERY, GLANCE_BASED_IN]} />
        </div>
      </>}
    />

    {/* Phones and tablets: every chapter one tap away, right under the hero, folded into the site's
        disclosure row (closed by default, like the privacy policy's contents) so the first chapter
        comes straight after "At a glance". Desktop uses the sticky rail. The row draws no rules of its
        own: the body's top hairline, straight after it, underlines it when closed and closes the list
        when open. Inside, from sm, two columns that fill top to bottom (chapters 1-4, then 5-8), so
        each column reads in page order; grid-rows-4 is half of the eight chapters, and the 4th and 8th
        drop their rule. */}
    <nav aria-labelledby="chapters-title" className="lg:hidden">
      <Container>
        <Disclosure title={<span id="chapters-title">On this page</span>} className="border-t-0 border-b-0">
          <ol className="grid grid-cols-1 border-t border-border sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4 sm:gap-x-8">
            {CHAPTERS.map((chapter) => <li key={chapter.id} className="border-b border-border last:border-b-0 sm:nth-4:border-b-0">
              <a href={`#${chapter.id}`} className="flex min-h-12 items-center py-3 text-[1rem] leading-[1.4] text-foreground transition-colors duration-250 hover:text-muted-foreground">{chapter.label}</a>
            </li>)}
          </ol>
        </Disclosure>
      </Container>
    </nav>

    <Container>
      <div className="grid border-t border-border pt-12 md:pt-16 lg:grid-cols-12 lg:gap-x-10 lg:pt-24">
        <div className="hidden lg:col-span-3 lg:block">
          <StickyToc items={CHAPTERS} />
        </div>

        {/* min-w-0: no chapter's content (a tile grid, an unbreakable line) may widen this grid item past the screen. */}
        <div className="min-w-0 lg:col-span-9">
          {/* The pull line sits straight under the heading, so the chapter's idea reads before its prose.
              The two supporting paragraphs sit side by side from md; on phones, where the chapter otherwise
              ran to some 26 lines of copy in a row, they fold into one closed native disclosure row (the
              same row as "On this page" under the hero). Both copies read from ABOUT_PARAGRAPHS. */}
          <Chapter index={0} title="A serious learning partner for organizations.">
            <Pull quote="Knowledge. Hands-On. Fun." className="mt-8">Training should be practical, engaging, knowledge-rich, and participatory.</Pull>
            <p className="mt-8 max-w-measure type-lead text-copy md:mt-10">TraininGenie is a corporate training and learning and development partner. We create practical learning experiences for teams building capability across technology, leadership, business tools, management systems, standards, and governance.</p>
            <div className="hidden gap-x-12 md:mt-8 md:grid md:grid-cols-2 md:gap-y-6">
              {ABOUT_PARAGRAPHS.map((paragraph) => <p key={paragraph} className="max-w-measure type-body text-copy">{paragraph}</p>)}
            </div>
            <Disclosure title={<span>More about TraininGenie</span>} className="mt-6 md:hidden">
              <div className="space-y-4 pt-1 pb-6">
                {ABOUT_PARAGRAPHS.map((paragraph) => <p key={paragraph} className="max-w-measure type-small text-copy">{paragraph}</p>)}
              </div>
            </Disclosure>
            <div className="mt-8 md:mt-10"><TextLink href="/about-us">About TraininGenie</TextLink></div>
          </Chapter>

          <Chapter index={1} title="A broad capability, organized for clarity." lead="Browse the major areas of learning supported by TraininGenie. Each programme can be adapted around the organization, the participants, and the outcome.">
            <AreaTiles className="mt-12 lg:mt-16" />
          </Chapter>

          <Chapter index={2} title={WHAT_WE_DO.customTitle} lead="TraininGenie specializes in need-based customized training, and standard offerings can be fine-tuned to specific requirements.">
            <div className="mt-12 grid gap-y-16 md:grid-cols-2 md:gap-x-12 lg:mt-16">
              <div>
                <h3 className="type-h3 text-foreground">Customized training</h3>
                <p className="mt-4 max-w-measure type-small text-copy">{WHAT_WE_DO.customLine}</p>
                {/* The five parts as one quiet line, not rows that look like links: each part is kept whole with
                    its middot trailing it (a comma for screen readers), so a line breaks only between parts. */}
                <p className="mt-9 type-label text-muted-foreground">{WHAT_WE_DO.customPartsLabel}</p>
                <p className="mt-2 type-ui text-copy">{WHAT_WE_DO.customParts.map((part, index) => <Fragment key={part}><span className="whitespace-nowrap">{part}{index < WHAT_WE_DO.customParts.length - 1 && <><span className="sr-only">,</span><span aria-hidden="true">{"\u00a0·"}</span></>}</span>{" "}</Fragment>)}</p>
              </div>
              <div>
                <h3 className="type-h3 text-foreground">Focused programmes</h3>
                <p className="mt-4 max-w-measure type-small text-copy">Each programme page sets out what the subject is, the key concepts participants learn, who should attend, and how it is shaped for your team.</p>
                {/* Phones: the last row drops its rule, as the next chapter's hairline closes the list (two full-width rules 80px apart otherwise). */}
                <ProgrammeList className="mt-6 max-md:[&_li:last-child>a]:border-b-0" />
              </div>
            </div>
          </Chapter>

          {/* Positive first: what is offered, then how examinations are arranged, then the caveat once,
              in the small grey note. */}
          <Chapter index={3} title={WHAT_WE_DO.certTitle}>
            <p className="mt-8 max-w-measure type-lead text-copy">TraininGenie&apos;s work includes corporate training, certification preparation where applicable, process frameworks, and governance, risk and compliance learning for organizations of different sizes.</p>
            <div className="mt-10 border-t border-border pt-7 lg:mt-12">
              <h3 className="type-ui font-medium text-foreground">How certification works</h3>
              <p className="mt-2 max-w-measure type-small text-copy md:type-body">Examination arrangements, including vouchers and the accredited body involved, are confirmed for each engagement.</p>
              <p className="mt-3 max-w-measure type-ui text-copy">A programme named after a standard or framework, such as ITIL or ISO, does not by itself make TraininGenie an accredited examination institute, authorized training partner, or certification body.</p>
            </div>
          </Chapter>

          <Chapter index={4} hiddenTitle>
            <DeliveryTriplet className="mt-8 md:mt-10" />
            {/* Where the formats apply (the triplet names them), then what to bring to the conversation. */}
            <p className="mt-10 max-w-measure type-lead text-copy md:mt-12">For organizations across India. Share your preferred format, location, and team context when you get in touch.</p>
          </Chapter>

          <Chapter index={5} title={WHAT_WE_DO.whoTitle} lead="TraininGenie works with organizations and participants across corporate, technology, leadership, behavioral, management systems, standards, risk, governance, and compliance learning needs.">
            {/* Each audience is one RowLink that leads to its most relevant page, laid out as the landing's
                "Who it is for": two columns from md, each opened by its own hairline. Phones: the last row
                drops its rule, as the next chapter's hairline closes the list. */}
            <ul aria-label={CHAPTERS[5].label} className="mt-10 grid md:grid-cols-2 md:gap-x-10 lg:mt-12 max-md:[&_li:last-child>a]:border-b-0">
              {audienceRows.map((row) => <li key={row.title} className="border-border first:border-t md:nth-2:border-t"><RowLink {...row} className="h-full" /></li>)}
            </ul>
          </Chapter>

          <Chapter index={6} titleClassName="" title={<><span className="lg:block lg:whitespace-nowrap">Start with the requirement.</span>{" "}<span className="lg:block lg:whitespace-nowrap">Work backward from the outcome.</span></>} lead={`${WHAT_WE_DO.stepsLeadPrefix} The approach begins by understanding the client problem and the desired outcome. That context shapes the learning experience, the activities, and the practical application.`}>
            {/* Phones: the three phases, with every step one tap away; from md the six steps in full, which
                keep the #understand, #shape and #deliver anchors. The disclosure draws only its top rule:
                the link's hairline closes it. */}
            <div className="mt-10 md:hidden"><PhaseLine /><MethodStepsDisclosure className="mt-8" /></div>
            <MethodSteps className="max-md:hidden mt-12 lg:mt-16" />
            <div className="border-t border-border pt-8 md:pt-10"><TextLink href="/training-methodology">See how we work</TextLink></div>
          </Chapter>
        </div>
      </div>
    </Container>

    <ClosingBand id={CHAPTERS[7].id} label={CHAPTERS[7].label} title={WHAT_WE_DO.nextTitle} body="Contact TraininGenie with your preferred format and team context." />

    {jsonLd({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE_URL}/what-we-do#webpage`, name: `What ${COMPANY_NAME} does`, url: `${SITE_URL}/what-we-do`, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORGANIZATION_ID }, mainEntity: { "@type": "ItemList", name: `${COMPANY_NAME} training areas`, itemListElement: TRAINING_PILLARS.map((pillar, index) => ({ "@type": "ListItem", position: index + 1, name: pillar.title, description: pillar.description, url: `${SITE_URL}/${pillar.slug}` })) } })}
  </>;
}

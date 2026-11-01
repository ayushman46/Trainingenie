import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { TOTAL_TOPICS } from "@/components/site/areas";
import { ClosingBand } from "@/components/tg/closing-band";
import { PageHero } from "@/components/tg/page-hero";
import { LinkRows } from "@/components/tg/programme-list";
import { Section } from "@/components/tg/section";
import { HEAD, SectionHead } from "@/components/tg/section-head";
import { COURSES, FAQS, METHOD_STEPS, TRAINING_PILLARS } from "@/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = { ...pageMetadata("Blog and Resources", "Practical perspectives on corporate training, technology learning, leadership, and management systems.", "/blog"), robots: { index: false, follow: true } };

// The kinds of resource named in the page introduction, named on one line as forthcoming.
const forthcoming = ["Insights", "Buyer guides", "Checklists", "Practical learning resources"];

// Pages on the site that already work as reference material, in the order a buyer would read them.
// The past-training total is not promoted until the owner supplies real scale numbers.
const available = [
  { href: "/corporate-training-services", title: "All training topics", meta: `${TOTAL_TOPICS} topics across ${TRAINING_PILLARS.length} training areas` },
  { href: "/corporate-training-services#programmes", title: "Focused programmes", meta: `${COURSES.length} programme pages, explained in depth` },
  { href: "/training-methodology", title: "How we work", meta: `${METHOD_STEPS.length} steps, from requirement to review` },
  { href: "/past-trainings", title: "Past trainings", meta: "Recently delivered topics, by training area" },
  { href: "/faqs", title: "FAQs", meta: `${FAQS.length} questions answered` },
  { href: "/about-us", title: "About TraininGenie", meta: "The company, its founder and its values" },
];

// Nike's inline link, as TextLink: ink with a 1px underline that stays on hover while the colour turns grey.
const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Blog" }]} label="Blog" title="Blog and Resources" lead="Insights, buyer guides, checklists, and practical learning resources from TraininGenie." />

    {/* What can be read now leads: reference pages that already exist, as hairline link rows, in the page's
        one grey band. Their counts are in the rows, so the hero carries none. */}
    <Section tone="tint" labelledBy="read-now">
      <SectionHead id="read-now" label="Read now" title="Pages to start with." intro="Everything below is already on the site: what TraininGenie teaches, how training is shaped, and what has been delivered." />
      {/* The rows follow the split head, so they start at column 4 like its title and intro; three to a row on desktop. */}
      <LinkRows columns={3} className={`${HEAD.body} lg:ml-col-4`} items={available.map((resource) => ({ href: resource.href, title: resource.title, meta: <span className="tabular-nums">{resource.meta}</span> }))} />
    </Section>

    {/* What is being written: the split head, then the resource types from column 4, under the heading, as one
        quiet line (at a trailing link's gap) rather than rows that look like links, as nothing is written under
        them yet. Each name is kept whole with its middot trailing it (a comma for screen readers), so a line
        breaks only between names. */}
    <Section labelledBy="blog-status">
      <SectionHead id="blog-status" label="In preparation" title="Articles, buyer guides, and practical learning resources are on the way." intro={<>In the meantime, browse the <Link href="/corporate-training-services" className={inlineLink}>training catalogue</Link> or read the <Link href="/faqs" className={inlineLink}>FAQs</Link>.</>} />
      <p className={`${HEAD.action} type-ui text-copy lg:ml-col-4`}>{forthcoming.map((title, index) => <Fragment key={title}><span className="whitespace-nowrap">{title}{index < forthcoming.length - 1 && <><span className="sr-only">,</span><span aria-hidden="true">{"\u00a0·"}</span></>}</span>{" "}</Fragment>)}</p>
    </Section>

    <ClosingBand />
  </>;
}

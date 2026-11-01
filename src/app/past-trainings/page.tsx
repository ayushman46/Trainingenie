import type { Metadata } from "next";
import Link from "next/link";
import { slugify } from "@/components/catalogue/utils";
import { CompanyLinks } from "@/components/company/company-links";
import { OnThisPage } from "@/components/company/on-this-page";
import { PAST_TRAINING_GROUPS } from "@/components/company/past-training-groups";
import { ClosingBand } from "@/components/tg/closing-band";
import { PageHero } from "@/components/tg/page-hero";
import { Section } from "@/components/tg/section";
import { HEAD, RowHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { CLIENT_REFERENCES } from "@/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Past Trainings", "Past corporate training topics delivered by TraininGenie, including SAP DRC, Advanced Excel and VBA, agentic AI for finance, AI tools for procurement, leadership development, team building, and Design Thinking.", "/past-trainings");

// Computed totals are not promoted to the hero until the owner supplies real scale numbers; each
// group still shows its own count beside its heading. The clients count pairs with "See clients".
const meta = [`${CLIENT_REFERENCES.length} clients`];

// A link inside running text, set like TextLink: an ink underline that turns grey on hover (no red).
// An invisible ::before pads the hit area to at least 44px tall without moving the line or enlarging
// the focus ring.
const inlineLink = "relative before:absolute before:inset-x-0 before:-inset-y-[13px] underline decoration-1 underline-offset-[5px] transition-colors duration-200 hover:text-muted-foreground";

// The hero aside: one jump link per group, to its heading. The counts stay beside each group's heading.
const chapters = PAST_TRAINING_GROUPS.map((group) => ({ href: `#group-${group.key}`, label: group.title }));

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Past Trainings" }]} label="Company" title="Past Trainings" lead="A selection of past training topics delivered by TraininGenie, spanning business tools, ERP and AI, leadership, team effectiveness, and innovation." meta={meta} secondary={{ label: "See clients", href: "/clients-and-testimonials" }} size="compact" aside={<OnThisPage items={chapters} />} />

    {/* A tight band under a compact hero, opened by one row title rather than a second statement, so
        the first training follows the hero (as the Clients page's logos do) */}
    <Section id="topics" size="tight" divider labelledBy="past-topics">
      <RowHead id="past-topics" title="Topics we have recently delivered." />
      {/* An index: the area and its link on the left, then one row per training with its title and
          tags beside what it covers. A training that has its own programme page links to it. Each
          training has its own anchor, so a search result opens it. */}
      <div className={`${HEAD.rowBody} space-y-16`}>{PAST_TRAINING_GROUPS.map((group) => <section key={group.key} aria-labelledby={`group-${group.key}`} className="grid gap-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3">
          <h3 id={`group-${group.key}`} className="type-h3 text-foreground">{group.title}</h3>
          <p className="mt-1 type-label tabular-nums text-muted-foreground">{group.items.length} {group.items.length === 1 ? "training" : "trainings"}</p>
          {group.area && <div className="mt-5"><TextLink href={group.area.href} size="sm">Explore the area<span className="sr-only">: {group.area.title}</span></TextLink></div>}
        </div>
        <ul className="border-t border-border-strong lg:col-span-9">
          {group.items.map((item) => <li key={item.title} id={`past-${slugify(item.title)}`} className="grid gap-2 border-b border-border py-6 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-5">
              <h4 className="type-ui text-[1.0625rem] font-medium text-foreground">{item.title}</h4>
              <p className="mt-1 type-label text-muted-foreground">{item.tags.join(" · ")}</p>
            </div>
            {/* What it covers, then its links: the programme page when it has one, and an enquiry with the
                topic filled in. The links wrap with 20px between lines so their 40px hit areas never overlap. */}
            <div className="md:col-span-7">
              {item.about && <p className="max-w-measure type-ui text-copy">{item.about}</p>}
              <div className={`flex flex-wrap gap-x-8 gap-y-5 ${item.about ? "mt-4" : ""}`}>
                {item.programme && <TextLink href={item.programme.href} size="sm">See the programme<span className="sr-only">: {item.programme.title}</span></TextLink>}
                <TextLink href={`/contact-us?topic=${encodeURIComponent(item.title)}#enquiry`} size="sm">Discuss a similar programme<span className="sr-only">: {item.title}</span></TextLink>
              </div>
            </div>
          </li>)}
        </ul>
      </section>)}</div>

      {/* The closing line closes the index itself, set in the list column, so the page has one enquiry prompt before the dark band */}
      <div className="mt-16 lg:pl-col-4">
        <p className="max-w-measure type-lead text-foreground">Each new programme is shaped around the organization, the audience, and the desired outcome. <Link href="/contact-us#enquiry" className={inlineLink}>Discuss a similar programme</Link> for your team.</p>
        <div className="mt-8"><TextLink href="/training-methodology">See how we work</TextLink></div>
      </div>
    </Section>

    <CompanyLinks current="/past-trainings" />
    <ClosingBand />
  </>;
}

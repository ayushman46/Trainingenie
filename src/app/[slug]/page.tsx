import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { lowerFirst } from "@/components/catalogue/utils";
import { PAST_TRAINING_GROUPS } from "@/components/company/past-training-groups";
import { Accordion } from "@/components/kit/accordion";
import { areaByTitle } from "@/components/site/areas";
import { ButtonLink } from "@/components/tg/button";
import { ClientProof } from "@/components/tg/client-proof";
import { ClosingBand } from "@/components/tg/closing-band";
import { ConceptList } from "@/components/tg/concept-list";
import { DeliveryLine } from "@/components/tg/delivery-line";
import { FactList, listTitleClass } from "@/components/tg/fact-list";
import { IndexList } from "@/components/tg/index-list";
import { Label } from "@/components/tg/label";
import { PageHero } from "@/components/tg/page-hero";
import { RelatedProgrammes } from "@/components/tg/related-programmes";
import { Section } from "@/components/tg/section";
import { HEAD, RowHead, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { ShareActions } from "@/components/utility/share-actions";
import { CONTACT_INFO, COURSE_DETAILS, COURSES, SITE_URL } from "@/data";
import { DELIVERY_PROMISE, UI_LABELS } from "@/data/site-copy";
import { jsonLd, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return COURSES.map((course) => ({ slug: course.slug })); }
// Only the programmes above exist: any other single-segment path is a 404 (the site's not-found page)
// without this page rendering at all.
export const dynamicParams = false;
// Each programme shares its own card (./opengraph-image.tsx and ./twitter-image.tsx) rather than the site's.
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { return params.then(({ slug }) => { const course = COURSES.find((item) => item.slug === slug); return course ? pageMetadata(course.title, course.description, `/${course.slug}`, true) : {}; }); }

// Links to the programme's training area, by the area's short name: the header's second action, and
// the "Explore further" row's link (short enough to stay on one line on phones).
const AREA_LINKS: Record<string, { action: string; all: string }> = {
  "technology-training": { action: "Explore technology training", all: "All technology training" },
  "leadership-soft-skills-training": { action: "Explore leadership training", all: "All leadership training" },
  "itil-prince2-agile-training": { action: "Explore frameworks training", all: "All frameworks training" },
  "iso-standards-training": { action: "Explore ISO and GRC training", all: "All ISO and GRC training" },
};
// "ISO 27001 Training" -> "ISO 27001", "ReactJS Corporate Training" -> "ReactJS"
function subjectOf(title: string) { return title.replace(/( Corporate)? (Training|Workshop)$/, ""); }
// Keeps a version number with its name ("ITIL 4", "ISO 9001") when a heading wraps.
function keepNumbers(text: string) { return text.replace(/ (?=\d)/g, " "); }
// Keeps a hyphenated word whole ("full-stack") when a heading wraps, instead of breaking at its hyphen.
function keepHyphenated(text: string): ReactNode[] { return text.split(/(\S+-\S+)/).map((part, index) => index % 2 ? <span key={index} className="whitespace-nowrap">{part}</span> : part); }
// The opening sentence of the overview is set as the lead; the rest follows as body copy.
function splitLead(paragraph: string): [string, string] { const match = /^(.+?[.?!])\s+(?=[A-Z])/.exec(paragraph); return match ? [match[1], paragraph.slice(match[0].length)] : [paragraph, ""]; }

// A section opening beside a side list: the label, then the h2, 20px apart, as in a stacked
// SectionHead, so every h2 on the page starts at column 1. The column is a flex column so the
// inline-flex label sits on no line box: its top then lines up with the side list's title in column 9.
const headBlock = "flex flex-col items-start";
const headingClass = "mt-5 max-w-[22ch] type-h2 text-foreground";
// "To discuss": plain hairline rows from lg. Below lg the three items are too short for rows of their
// own, so they run on after the title as one line, each followed by a middot held to it (no line
// starts with one, and no item breaks); screen readers hear commas instead of the middots.
const DISCUSS = ["Audience", "Business objective", "Preferred format"];
const sideRow = "border-b border-border py-3 type-ui text-foreground max-lg:inline max-lg:border-b-0 max-lg:py-0 max-lg:text-copy";
// On phones a white section that follows a list ending on a hairline (the outcomes) hides its own
// divider, so the two rules do not stack.
const noPhoneDivider = "max-lg:[&>[data-section-divider]]:hidden";
// The hero's "Training area" value: an ink link with a 1px underline that turns grey on hover, as
// TextLink does. Its hit area is padded to 45px (4px up, 22px down), so it stays clear of the
// "Training area" term 6px above and of the next row's term. The "Recently delivered" value is the
// list's last row, with the On this page row right under it, so its pad stops at the row's bottom
// edge (16px down) and reaches 10px up instead.
const glanceLinkBase = "relative underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:text-muted-foreground before:absolute before:inset-x-0";
const glanceLink = `${glanceLinkBase} before:-top-1 before:-bottom-[22px]`;
const glanceLastLink = `${glanceLinkBase} before:-top-[10px] before:-bottom-4`;
// A link inside running text (the founder's name), as on the methodology page: the same underline,
// with an invisible ::before padding the hit area to 44px tall. It never wraps, so that pad is one box.
const inlineLink = "relative whitespace-nowrap text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:text-muted-foreground before:absolute before:inset-x-0 before:-inset-y-[13px]";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES.find((item) => item.slug === slug);
  const detail = COURSE_DETAILS[slug];
  if (!course || !detail) notFound();
  const subject = keepNumbers(subjectOf(course.title));
  const url = `${SITE_URL}/${course.slug}`;
  const area = areaByTitle(course.pillar);
  const related = detail.related.map((item) => COURSES.find((other) => other.slug === item)).filter((item) => item !== undefined);
  const [lead, leadRest] = splitLead(detail.overview[0] ?? "");
  const overviewBody = [leadRest, ...detail.overview.slice(1)].filter(Boolean);
  const areaLinks = AREA_LINKS[area.slug] ?? { action: `Explore ${area.title}`, all: `All ${lowerFirst(area.short)} training` };
  // "What is PRINCE2?", "What are Scrum and Agile?"
  const question = `${subject.includes(" and ") ? "What are" : "What is"} ${subject}?`;
  // The past trainings whose topic is this programme (today only the Design Thinking workshop).
  const delivered = PAST_TRAINING_GROUPS.flatMap((group) => group.items).filter((training) => training.programme?.href === `/${course.slug}`);
  // Practical facts beside the title: where the programme sits, how it is delivered and how learning
  // is reviewed (the method's pre- and post-assessment steps), who it is for, and, where the programme
  // is among the past trainings, a link back to them. The audience keeps its full stop: this is the
  // only place its sentence renders exactly as written. What the programme covers is listed under the
  // hero's actions instead.
  const glance: [string, ReactNode][] = [
    ["Training area", <Link key="area" href={area.href} className={glanceLink}>{course.pillar}</Link>],
    ["Delivery formats", DELIVERY_PROMISE],
    [UI_LABELS.reviewed, UI_LABELS.reviewedValue],
    ["Who it is for", course.audience],
    ...(delivered.length > 0 ? [["Recently delivered", <Link key="delivered" href="/past-trainings" className={glanceLastLink}>{delivered.map((training) => training.title).join(", ")}</Link>] as [string, ReactNode]] : []),
  ];
  // The rest of the page in reading order, listed in the hero aside under At a glance.
  const contents: [string, string][] = [["#key-concepts", "Key concepts covered"], ["#audience", "Who should attend"], ["#overview", question], ["#customization", "Customization and delivery"], ["#next-steps", "Next steps"], ["#faqs", `${subject} training FAQs`], ["#related", "Other focused programmes"]];
  // The hero, Next steps and closing band pills all open the enquiry form with this programme as the
  // topic, and their "Email us" links start an email whose subject names it.
  const enquiryHref = `/contact-us?topic=${encodeURIComponent(course.title)}#enquiry`;
  // The hero and Next steps pills name the programme, as the area pages' pills name their area.
  const discussLabel = `Discuss ${subject} training`;
  const emailSubject = `Training enquiry: ${course.title}`;

  return <>
    {/* The visible trail names the Training level above the area (by its short name on phones, so
        the trail reads in full there); the BreadcrumbList JSON-LD keeps its area → programme trail. */}
    <PageHero
      crumbs={[{ label: "Training", href: "/corporate-training-services" }, { label: area.title, href: area.href, short: area.short }, { label: course.title }]}
      ldCrumbs={[{ label: course.pillar, href: area.href }, { label: course.title }]}
      label="Focused programme"
      title={course.title}
      lead={course.description}
      primary={null}
      aside={<>
        {/* Closed below lg, so a phone hero ends on two folded rows. */}
        <FactList title="At a glance" layout="stacked" rows={glance} collapsible />
        {/* The page's own index, one closed disclosure row at every width, so the syllabus follows the
            hero. It sits on the glance list's last hairline (its own top rule is dropped), so the
            aside reads as one list ending on a single rule. */}
        <IndexList id="on-this-page" title="On this page" collapsible="always" className="[&>details]:border-t-0" sections={[{ rows: contents.map(([href, label]) => ({ href, label })) }]} />
      </>}
    >
      {/* PageHero's action row, set here (its own is off) so that the client proof and what the
          programme covers can follow the pills: from lg the concept names fill the column beside the
          aside, in two columns. Phones skip them, as the Key concepts band right after the hero lists
          them. Below md, where At a glance is folded, the delivery formats show under the proof
          instead (not in print, which prints the glance list open). */}
      <div data-cta-zone className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
        <ButtonLink href={enquiryHref}>{discussLabel}</ButtonLink>
        <ButtonLink href={area.href} variant="secondary">{areaLinks.action}</ButtonLink>
      </div>
      <ClientProof className="mt-8 sm:mt-10" />
      <p className="mt-6 type-ui text-copy md:hidden print:hidden">{DELIVERY_PROMISE}</p>
      <div className="mt-10 max-lg:hidden lg:mt-12">
        <p className="type-label text-muted-foreground">Covers</p>
        <ul className="mt-2 lg:columns-2 lg:gap-x-8">
          {detail.concepts.map((concept) => <li key={concept.name} className="break-inside-avoid py-1 type-ui text-copy">{concept.name}</li>)}
        </ul>
      </div>
    </PageHero>

    {/* The programme itself first. The page's one grey band: what it covers, as a plain spec list. */}
    <Section id="key-concepts" tone="tint" labelledBy="concepts-heading">
      <SectionHead id="concepts-heading" layout="stack" label="What participants learn" title="Key concepts covered" intro="The emphasis, examples, and exercises are shaped around the team's context and objectives." />
      <ConceptList items={detail.concepts} className="mt-12 md:mt-14 lg:mt-16" />
    </Section>

    {/* Who should attend, as one sentence, beside what they can do afterwards. The side lists on this
        page all start on the hero aside's line (column 9). */}
    <Section id="audience" labelledBy="audience-heading">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
        <div data-reveal className={`${headBlock} lg:col-span-7`}>
          <Label>Who should attend</Label>
          <h2 id="audience-heading" className={headingClass}>Designed for {keepHyphenated(lowerFirst(course.audience))}</h2>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className={listTitleClass}>After the programme, participants can</h3>
          <ol className="mt-4 border-t border-border">
            {detail.outcomes.map((outcome) => <li key={outcome} className="border-b border-border py-3.5 type-ui text-copy">{outcome}</li>)}
          </ol>
        </div>
      </div>
    </Section>

    {/* In brief, for readers new to the subject, straight after who should attend and before how the
        programme is shaped: the overview's opening sentence as the lead (in ink), the rest beneath it
        at the paragraphs' own 20px rhythm, in one column. On phones its divider is hidden: the
        outcomes list above it already ends on a hairline. */}
    <Section id="overview" divider labelledBy="overview-heading" className={noPhoneDivider}>
      <div className="grid lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-8">
          <div data-reveal className={headBlock}>
            <Label>In brief</Label>
            <h2 id="overview-heading" className={headingClass}>{question}</h2>
            <p className="mt-6 max-w-measure type-lead text-foreground">{lead}</p>
          </div>
          {overviewBody.length > 0 && <div className="mt-5 space-y-5">
            {overviewBody.map((paragraph) => <p key={paragraph.slice(0, 40)} className="max-w-measure type-body text-copy">{paragraph}</p>)}
          </div>}
        </div>
      </div>
    </Section>

    {/* How the programme is shaped and run: what to discuss, the delivery formats (the method itself is
        set out on the methodology page), then the next step. */}
    <Section id="customization" divider labelledBy="customization-heading">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
        <div data-reveal className={`${headBlock} lg:col-span-7`}>
          <Label>Customization and delivery</Label>
          {/* Its last two words stay together, except below 360px, where together they are wider than the column. */}
          <h2 id="customization-heading" className={headingClass}>How is the <span className="whitespace-nowrap max-[359px]:whitespace-normal">programme customized?</span></h2>
          <p className="mt-6 max-w-measure type-body text-copy">TraininGenie uses a requirements-driven approach. Standard offerings can be fine-tuned to specific requirements.</p>
        </div>
        <div className="max-lg:border-t max-lg:border-border max-lg:pt-6 max-lg:type-ui max-lg:text-copy lg:col-span-4 lg:col-start-9">
          <h3 className={`${listTitleClass} max-lg:inline max-lg:type-ui max-lg:text-copy`}>To discuss<span className="lg:hidden">:</span></h3>{" "}
          <ul className="mt-4 border-t border-border max-lg:mt-0 max-lg:inline max-lg:border-t-0">
            {DISCUSS.map((item, index) => <li key={item} className={sideRow}>
              <span className="max-lg:whitespace-nowrap">{item}{index < DISCUSS.length - 1 && <><span className="sr-only lg:hidden">,</span><span aria-hidden="true" className="lg:hidden">{"\u00a0·"}</span></>}</span>{" "}
            </li>)}
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start gap-5 border-t border-border pt-6 md:flex-row md:items-baseline md:justify-between md:gap-6 lg:mt-12">
        <DeliveryLine className="!border-t-0 !pt-0" />
        <TextLink href="/training-methodology">See how we work</TextLink>
      </div>
      {/* Where a reader is ready to act: how an engagement is scoped and who stands behind it, then the
          site's one primary pill with "Email us" beside it (the address itself is in the footer and on
          the contact page), and on a row of their own the quiet Share and Print actions for passing the
          programme on to an approver. `data-cta-zone` tells the phone's sticky enquiry bar to step
          aside while this pill is on screen, so the two never double up. */}
      <div id="next-steps" data-cta-zone className="mt-10 grid gap-2 border-t border-border pt-7 lg:grid-cols-12 lg:gap-x-10">
        <h3 className="type-h3 text-foreground lg:col-span-3">Next steps</h3>
        <div className="lg:col-span-9">
          <p className="max-w-measure type-body text-copy">Each engagement is scoped with you: programme duration, delivery mode, pricing, and certification or examination arrangements are agreed around your team&apos;s requirement.</p>
          <p className="mt-4 max-w-measure type-body text-copy">TraininGenie is led by its founder, <Link href="/our-team" className={inlineLink}>Mousumi Chakraborty</Link>, who brings more than two decades of experience across multiple businesses and industries.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            {/* The enquiry form's topic is prefilled with this programme, and the email's subject names it. */}
            <ButtonLink href={enquiryHref} className="max-sm:w-full">{discussLabel}</ButtonLink>
            <TextLink href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}`}>{UI_LABELS.emailUs}</TextLink>
          </div>
          <ShareActions title={course.title} url={url} className="mt-6" />
        </div>
      </div>
    </Section>

    {/* The questions, then the link to the site-wide FAQs: beside the heading from lg, after the
        answers on phones, so a phone reader meets the questions before a way off the page. Version
        numbers stay with their names in the visible questions ("ITIL 4"); the FAQPage JSON-LD below
        keeps the strings exactly as written. */}
    <Section id="faqs" divider labelledBy="faqs-heading">
      <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-10">
        <div data-reveal className={`${headBlock} lg:col-span-3`}>
          <Label>Questions</Label>
          <h2 id="faqs-heading" className="mt-5 max-w-[22ch] type-h3 text-foreground">{subject} training FAQs</h2>
          <p className="mt-6 max-lg:hidden"><TextLink href="/faqs">Read the FAQs</TextLink></p>
        </div>
        <div className="lg:col-span-9">
          <Accordion headingLevel={3} items={detail.faqs.map(([question, answer]) => ({ question: keepNumbers(question), answer }))} />
          <p className="mt-6 lg:hidden"><TextLink href="/faqs">Read the FAQs</TextLink></p>
        </div>
      </div>
    </Section>

    {/* A Nike row header: the title on the tiles' left edge, the link to the whole area on the right. */}
    <Section id="related" divider labelledBy="related-heading">
      <RowHead id="related-heading" label="Explore further" title="Other focused programmes" action={<TextLink href={area.href} size="sm">{areaLinks.all}</TextLink>} />
      <RelatedProgrammes items={related} className={HEAD.rowBody} />
    </Section>

    <ClosingBand href={enquiryHref} emailSubject={emailSubject} />

    {jsonLd({ "@context": "https://schema.org", "@type": "Course", "@id": `${url}#course`, name: course.title, description: course.description, url, inLanguage: "en-IN", teaches: detail.concepts.map((concept) => concept.name), audience: { "@type": "Audience", audienceType: course.audience }, provider: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "TraininGenie", url: SITE_URL } })}
    {jsonLd({ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`, url, mainEntity: detail.faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) })}
  </>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cin } from "@/components/company/cin";
import { CompanyLinks } from "@/components/company/company-links";
import { OnThisPage } from "@/components/company/on-this-page";
import { Accordion } from "@/components/kit/accordion";
import { AREAS, TOTAL_TOPICS } from "@/components/site/areas";
import { ClosingBand } from "@/components/tg/closing-band";
import { FactList, listTitleClass } from "@/components/tg/fact-list";
import { Label } from "@/components/tg/label";
import { PageHero } from "@/components/tg/page-hero";
import { LinkRows } from "@/components/tg/programme-list";
import { Pull } from "@/components/tg/pull";
import { Section } from "@/components/tg/section";
import { TextLink } from "@/components/tg/text-link";
import { ValuesList } from "@/components/tg/values-list";
import { ClientOnly } from "@/components/utility/client-only";
import { CopyButton } from "@/components/utility/copy-button";
import { CLIENT_REFERENCES, COMPANY_NAME, COMPANY_TAGLINE, CONTACT_INFO, FAQS, LEGAL_ENTITY, SITE_URL, TRAINING_PILLARS } from "@/data";
import { DELIVERY_PROMISE } from "@/data/site-copy";
import { jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("About TraininGenie", "Learn about TraininGenie's corporate learning position, mission, vision, PRIDE values, and Founder Director Mousumi Chakraborty.", "/about-us");

// The scale first (the clients, the areas and the topics); the incorporation date stays in the record.
const meta = ["Bengaluru, India", `${CLIENT_REFERENCES.length} clients`, `${TRAINING_PILLARS.length} training areas`, `${TOTAL_TOPICS} topics`];

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const website = SITE_URL.replace(/^https?:\/\//, "");
// A link inside a record value, set like TextLink (an ink underline that turns grey on hover). The
// ::before pads the line to a hit area of about 47px without moving it.
const recordLink = "relative underline decoration-1 underline-offset-4 transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-3 hover:text-muted-foreground";

const companyDetails: [string, ReactNode][] = [
  ["Legal name", LEGAL_ENTITY.name],
  ["Brand", COMPANY_NAME],
  ["CIN", <Cin key="cin" copyFirst />],
  ["Incorporated", LEGAL_ENTITY.incorporatedLabel],
  ["Registered office", LEGAL_ENTITY.registeredOffice.label],
  ["Founder Director", "Mousumi Chakraborty"],
  // Where the company works, in one row (the FAQ's own words), then where training is delivered.
  ["Based in", "Bengaluru, India (Kolkata is an associated location)"],
  ["Training delivered", DELIVERY_PROMISE],
  // How to reach and check the company, so the record answers a vendor form on its own
  ["Email", <a key="email" href={`mailto:${CONTACT_INFO.email}`} className={recordLink}>{CONTACT_INFO.email}</a>],
  ["Phone", <span key="phone">{CONTACT_INFO.phones.map((phone, index) => <span key={phone}>{index > 0 && <span aria-hidden="true" className="text-muted-foreground"> · </span>}<a href={tel(phone)} className={`${recordLink} whitespace-nowrap`}>{phone}</a></span>)}</span>],
  ["Website", website],
  // The links wrap with 20px between lines, so their hit areas never overlap
  ["LinkedIn", <span key="linkedin" className="inline-flex flex-wrap gap-x-6 gap-y-5"><TextLink href={CONTACT_INFO.companyLinkedIn} size="sm" external>TraininGenie on LinkedIn</TextLink><TextLink href={CONTACT_INFO.directorLinkedIn} size="sm" external>Founder on LinkedIn</TextLink></span>],
];

// The record as plain text for a vendor or supplier form, one "Label: value" per line
const companyRecord = [
  ["Legal name", LEGAL_ENTITY.name],
  ["Brand", COMPANY_NAME],
  ["CIN", LEGAL_ENTITY.cin],
  ["Incorporated", LEGAL_ENTITY.incorporatedLabel],
  ["Registered office", LEGAL_ENTITY.registeredOffice.label],
  ["Email", CONTACT_INFO.email],
  ["Phone", CONTACT_INFO.phones.join(", ")],
  ["Website", website],
].map(([term, value]) => `${term}: ${value}`).join("\n");

// The company questions from the FAQ page, picked by question and listed in this order (a buyer's
// questions first, the spelling of the name last), so a reordered FAQ list cannot swap them.
// The accreditation question stays where main had it (/faqs and the ISO certification note) and in the
// ITIL and PRINCE2 programme FAQs, not repeated here.
const companyQuestions = ["Where is TraininGenie based?", "Is TraininGenie a registered company?", "Is it TraininGenie or Training Genie?"];
const questions = companyQuestions.flatMap((name) => FAQS.filter(([question]) => question === name)).map(([question, answer]) => ({ question, answer }));
const whatIs = FAQS.find(([question]) => question === "What is TraininGenie?")?.[1];

// The founder's facts, as on the Founder profile (/our-team): the site's own copy only.
const founderFacts: [string, string][] = [
  ["Experience", "More than two decades, across multiple businesses and industries"],
  ["Languages", "English, Hindi, Bengali, Odia"],
  ["Studied at", "Birla Institute of Liberal Arts and Management Sciences"],
];

const chapters = [
  { href: "#who-we-are", label: "Who we are" },
  { href: "#vision", label: "Vision and mission" },
  { href: "#values", label: "PRIDE values" },
  { href: "#philosophy", label: "Learning philosophy" },
  { href: "#founder", label: "Founder Director" },
  { href: "#company", label: "Registered company and questions" },
];

// The page's one split: seven columns, then four from column nine, so every side column sits under
// the hero aside.
const split = "grid gap-y-10 lg:grid-cols-12 lg:gap-x-10";
const left = "lg:col-span-7";
const right = "lg:col-span-4 lg:col-start-9";
// A right column that starts level with the h2 beside it, under its label (label 20px + 20px gap).
const besideHeading = "lg:pt-10";

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "About" }]} label="About" title="A learning partner built around the real requirement" lead="TraininGenie delivers high-quality, enriching training intended to help organizations meet demanding markets and create long-term value by increasing organizational capability, productivity, and competitive edge." meta={meta} secondary={{ label: "Company record", href: "#company" }} aside={<OnThisPage items={chapters} />} />

    {/* Who we are: the brand and what the company does, with the four areas as an index into the catalogue.
        The name and the tagline read as a Nike title and subtitle: ink, then grey (no red). */}
    <Section id="who-we-are" divider labelledBy="about-who">
      <div className={split}>
        <div data-reveal className={left}>
          <Label>Who we are</Label>
          <h2 id="about-who" className="mt-5"><span className="block type-h2 text-foreground">{COMPANY_NAME}</span><span className="sr-only">: </span><span className="mt-3 block type-tagline text-muted-foreground">{COMPANY_TAGLINE}</span></h2>
          {whatIs && <p className="mt-8 max-w-measure type-lead text-copy">{whatIs}</p>}
          <p className="mt-5 max-w-measure type-body text-copy">TraininGenie specializes in need-based customized training, and standard offerings can be fine-tuned to specific requirements.</p>
        </div>
        <div className={right}>
          <h3 className={listTitleClass}>What we train</h3>
          <LinkRows className="mt-4" items={AREAS.map((area) => ({ href: area.href, title: area.title, meta: `${area.topics} topics · ${area.groups.length} ${area.groups.length === 1 ? "group" : "groups"}` }))} />
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5"><TextLink href="/corporate-training-services">All training topics</TextLink><TextLink href="/training-methodology">See how we work</TextLink></div>
        </div>
      </div>
    </Section>

    {/* What the company aims for, in the page's one grey band: the vision beside the mission. */}
    <Section id="vision" tone="tint">
      <section aria-label="Vision and mission" className={split}>
        <div data-reveal className={left}>
          <Label>Vision</Label>
          <h2 className="mt-5 max-w-[20ch] type-h2 text-foreground">Inspire people to realize their potential through superior training solutions.</h2>
        </div>
        <div className={right}>
          <Label>Mission</Label>
          <p className="mt-5 max-w-measure type-body text-copy">TraininGenie aims to empower people to hone their skills, equip participants with useful knowledge, improve on-the-job productivity, support organizational objectives, and work as partners with clients and participants.</p>
          <p className="mt-4 max-w-measure type-body text-copy">This includes corporate training, certification preparation where applicable, process frameworks, and governance, risk and compliance learning for organizations of different sizes.</p>
        </div>
      </section>
    </Section>

    {/* What the company believes, back on white: the PRIDE values, then the learning philosophy. No divider:
        the change from the grey band already separates it. */}
    <Section id="values" labelledBy="about-values">
      <div data-reveal className={`${split} lg:items-end`}>
        <div className={left}>
          <Label>PRIDE</Label>
          <h2 id="about-values" className="mt-5 max-w-[22ch] type-h2 text-foreground">The values behind the work.</h2>
        </div>
        <p className={`${right} max-w-measure type-lead text-copy`}>Passion, Respect, Innovation, Determination, and Enthusiasm guide the learning experience.</p>
      </div>
      <ValuesList className="mt-12 lg:mt-14" />

      {/* The values list closes on its own hairline, so this part opens on space alone, not on another
          border-t + pt-14 (a second rule here would double the first). */}
      <section id="philosophy" aria-labelledby="about-philosophy" className="mt-20 md:mt-24">
        <Label as="h2" id="about-philosophy">Learning philosophy</Label>
        <Pull quote="Knowledge. Hands-On. Fun." className="mt-6 max-w-measure">Training should be practical, engaging, knowledge-rich, and participatory. That philosophy supports the requirements-driven approach across technology, people, leadership, management systems, standards, and GRC learning.</Pull>
        <div className="mt-10"><TextLink href="/training-methodology">See how we work</TextLink></div>
      </section>
    </Section>

    {/* Founder: the name with her facts under it (the Founder profile's own glance), the biography beside
        it, handing over to the Founder profile */}
    <Section id="founder" divider labelledBy="about-founder">
      <div className={split}>
        <div data-reveal className={left}>
          <Label>Founder Director</Label>
          <h2 id="about-founder" className="mt-5 type-h2 text-foreground">Mousumi Chakraborty</h2>
          <FactList layout="stacked" className="mt-10" rows={founderFacts} />
        </div>
        <div className={`${right} ${besideHeading}`}>
          <p className="max-w-measure type-lead text-foreground">Mousumi brings more than two decades of experience across multiple businesses and industries. Her experience includes navigating challenges involving people, process, products, and technology.</p>
          <p className="mt-5 max-w-measure type-body text-copy">She has worked with teams establishing and executing mid-to-large delivery units focused on end-customer delight. The company ambition is to become a learning provider of choice for participants and corporates.</p>
          <div className="mt-8"><TextLink href="/our-team">Founder profile</TextLink></div>
        </div>
      </div>
    </Section>

    {/* The registered company and its record, beside the questions people ask about the company */}
    <Section id="company" divider labelledBy="about-company">
      <div className={split}>
        <div className={left}>
          <div data-reveal>
            <Label>Company record</Label>
            <h2 id="about-company" className="mt-5 type-h2 text-foreground">The registered company</h2>
            <p className="mt-6 max-w-measure type-lead text-copy">TraininGenie (also written Training Genie) is a corporate training and learning and development company.</p>
          </div>
          {/* Stacked on phones, where the longer values (the location, the delivery line) would wrap
              right-aligned beside the term; inline from sm. The copy button takes the record as text,
              and when no clipboard is available it selects the record instead. */}
          <div className="mt-12">
            <div id="company-record"><FactList title="Company record" headingLevel={3} rows={companyDetails} layout="auto" /></div>
            <ClientOnly><CopyButton label="Copy company record" what="company record" value={companyRecord} target="company-record" className="mt-2" /></ClientOnly>
          </div>
        </div>
        {/* Its own h2, so the accordion's h3 questions sit under it */}
        <div className={`${right} ${besideHeading}`}>
          <h2 className="type-h3 text-foreground">Questions about the company</h2>
          <Accordion className="mt-6" items={questions} />
          <div className="mt-8"><TextLink href="/faqs">Read the FAQs</TextLink></div>
        </div>
      </div>
    </Section>

    <CompanyLinks current="/about-us" />
    <ClosingBand />
    {jsonLd({ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/about-us#webpage`, name: "About TraininGenie", url: `${SITE_URL}/about-us`, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORGANIZATION_ID }, mainEntity: { "@id": ORGANIZATION_ID } })}
  </>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CompanyLinks } from "@/components/company/company-links";
import { ClosingBand } from "@/components/tg/closing-band";
import { FactList } from "@/components/tg/fact-list";
import { PageHero } from "@/components/tg/page-hero";
import { Point } from "@/components/tg/point";
import { Section } from "@/components/tg/section";
import { HEAD, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { CONTACT_INFO, LEGAL_ENTITY, SITE_URL } from "@/data";
import { FOUNDER_ID, jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Founder Profile", "Meet Mousumi Chakraborty, Founder Director of TraininGenie: a Bengaluru-based learning and business leader with more than two decades of experience across multiple businesses and industries.", "/our-team");

// The facts in the header beside the name. Only the site's own copy: the delivery units (the
// biography's own sentence, her most concrete achievement, so it leads), "more than two decades"
// (About page and FAQ), the institute and the four languages. Bengaluru is left to the intro and
// the biography, which already say it, and the role to the eyebrow above the name. The registered
// company closes the list, linked to its record on the About page; its middot trails the name, so a
// wrapped line never starts with one.
const glance: [string, ReactNode][] = [
  ["Delivery work", "Worked with teams establishing and executing mid-to-large delivery units"],
  ["Experience", "More than two decades, across multiple businesses and industries"],
  ["Studied at", "Birla Institute of Liberal Arts and Management Sciences"],
  ["Languages", "English, Hindi, Bengali, Odia"],
  ["Company", <>{LEGAL_ENTITY.name}{"\u00a0· "}<TextLink href="/about-us#company" size="sm">Company record</TextLink></>],
];

// Each principle links to the page that shows it in practice.
const principles = [
  { label: "Perspective", title: "Requirement first", text: "Start with the real capability need and work backward from the outcome.", href: "/training-methodology", link: "How we work" },
  { label: "Practice", title: "Learning by doing", text: "Make the experience useful, participatory, and connected to work.", href: "/about-us#philosophy", link: "The learning philosophy" },
  { label: "Values", title: "People and trust", text: "Build respectful relationships that support long-term capability.", href: "/about-us#values", link: "The PRIDE values" },
];

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Founder Profile" }]} label="Founder Profile" eyebrow="Founder Director, TraininGenie" title="Mousumi Chakraborty" lead="Meet Mousumi Chakraborty, a Bengaluru-based learning and business leader focused on practical capability building." secondary={{ label: "About TraininGenie", href: "/about-us" }} aside={<FactList title="At a glance" layout="stacked" rows={glance} />}>
      {/* The verification link buyers look for first, directly under the lead */}
      <div className="mt-6"><TextLink href={CONTACT_INFO.directorLinkedIn} external>Founder on LinkedIn</TextLink></div>
    </PageHero>

    {/* Profile: the split head (her focus, in the intro's own words), then the biography from column 4, under the heading */}
    <Section id="profile" divider labelledBy="founder-profile">
      <SectionHead id="founder-profile" label="Profile" title="Practical capability building." />
      <div className={`${HEAD.body} grid lg:grid-cols-12 lg:gap-x-10`}>
        <div className="lg:col-span-9 lg:col-start-4">
          <p className="max-w-measure type-lead text-foreground">Mousumi brings experience across multiple businesses and industries, with a focus on people, process, products, and technology. Her work is grounded in understanding the requirement, building practical solutions, and helping teams apply learning in the workplace.</p>
          <p className="mt-6 max-w-measure type-body text-copy">She has worked with teams establishing and executing mid-to-large delivery units focused on end-customer delight. As Founder Director, she leads TraininGenie, whose ambition is to become a learning provider of choice for participants and corporates.</p>
          <p className="mt-5 max-w-measure type-body text-copy">Mousumi is based in Bengaluru. She studied at the Birla Institute of Liberal Arts and Management Sciences and works in English, Hindi, Bengali, and Odia.</p>
        </div>
      </div>
    </Section>

    {/* The three working principles, each pointing to the page that shows it in practice. The page's one grey band. */}
    <Section id="principles" tone="tint" labelledBy="working-principles">
      <SectionHead id="working-principles" label="Working principles" title="Perspective, practice and values." />
      <div className="mt-12 grid lg:mt-16 lg:grid-cols-12 lg:gap-x-10">
        <ul className="grid gap-12 md:grid-cols-3 md:gap-x-10 lg:col-span-9 lg:col-start-4">
          {/* Each item is a column: the Point, then its link pinned to the bottom (at least 24px under the
              text, as Point's own action spacing), so the three links share one line. The link sits
              outside the Point so the layout relies only on Point's public props. */}
          {principles.map((item) => <li key={item.title} className="flex flex-col">
            <Point label={item.label} title={item.title}>{item.text}</Point>
            <div className="mt-auto pt-6"><TextLink href={item.href}>{item.link}</TextLink></div>
          </li>)}
        </ul>
      </div>
    </Section>

    <CompanyLinks current="/our-team" divider={false} />
    <ClosingBand />
    {jsonLd({ "@context": "https://schema.org", "@type": "ProfilePage", "@id": `${SITE_URL}/our-team#webpage`, url: `${SITE_URL}/our-team`, name: "Mousumi Chakraborty, Founder Director of TraininGenie", isPartOf: { "@id": WEBSITE_ID }, mainEntity: { "@type": "Person", "@id": FOUNDER_ID, name: "Mousumi Chakraborty", jobTitle: "Founder Director", url: `${SITE_URL}/our-team`, worksFor: { "@id": ORGANIZATION_ID }, alumniOf: { "@type": "CollegeOrUniversity", name: "Birla Institute of Liberal Arts and Management Sciences" }, sameAs: [CONTACT_INFO.directorLinkedIn] } })}
  </>;
}

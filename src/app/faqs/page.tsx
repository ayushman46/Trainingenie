import type { Metadata } from "next";
import { ClosingBand } from "@/components/tg/closing-band";
import { PageHero } from "@/components/tg/page-hero";
import { Section } from "@/components/tg/section";
import { FaqSearch, type FaqGroup, type FaqLink } from "@/components/utility/faq-search";
import { COURSES, FAQS, SITE_URL, TRAINING_PILLARS } from "@/data";
import { jsonLd, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("FAQs", "Answers to common questions about TraininGenie: who we are, who founded the company, where we are based, and how our corporate training works.", "/faqs");

const meta = [`${FAQS.length} questions answered`, `${TRAINING_PILLARS.length} training areas`, `${COURSES.length} focused programmes`];

// Words that each find one of the questions below, shown as grey search-term pills. Four short ones, so the
// pills keep to one line in the desktop search column; on phones they wrap under "Try" ("Exam" finds the
// certification question).
const suggestions = ["Founder", "Customized", "Onsite", "Exam"];

// The questions sorted by what the reader wants to know: a buyer's questions about training and delivery come
// first, then the company (the spelling of the name last). Each group lists its questions in this order. Each name must match a question in
// FAQS exactly; anything left out is still listed, under "Other questions".
const groups: FaqGroup[] = [
  { id: "training", title: "Training and delivery", questions: ["Can TraininGenie deliver onsite training?", "Can training be customized?", "What training does TraininGenie offer?", "Who is TraininGenie's training for?", "How do certification and examinations work?"] },
  { id: "company", title: "About the company", questions: ["What is TraininGenie?", "Who founded TraininGenie?", "Where is TraininGenie based?", "Is TraininGenie a registered company?", "How do I contact TraininGenie?", "Is it TraininGenie or Training Genie?"] },
];

// Where to read more after an answer.
const related: Record<string, FaqLink> = {
  "What is TraininGenie?": { href: "/about-us", label: "About TraininGenie" },
  "Who founded TraininGenie?": { href: "/our-team", label: "Founder profile" },
  "Where is TraininGenie based?": { href: "/contact-us", label: "Contact details" },
  "What training does TraininGenie offer?": { href: "/corporate-training-services", label: "All training topics" },
  "Can training be customized?": { href: "/training-methodology", label: "See how we work" },
  "Who is TraininGenie's training for?": { href: "/clients-and-testimonials", label: "Selected clients" },
  "Can TraininGenie deliver onsite training?": { href: "/contact-us#enquiry", label: "Share your format and location" },
  "How do I contact TraininGenie?": { href: "/contact-us#enquiry", label: "Go to the enquiry form" },
};

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Frequently Asked Questions" }]} label="FAQs" title="Frequently Asked Questions" size="compact" meta={meta} lead="Clear answers for organizations evaluating corporate training and certification preparation with TraininGenie." />
    <Section divider labelledBy="questions-heading">
      <FaqSearch items={FAQS} groups={groups} related={related} suggestions={suggestions} title="Find an answer" intro="Who we are, who founded the company, where we are based, and how our corporate training works." />
    </Section>
    {jsonLd({ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/faqs#faq`, url: `${SITE_URL}/faqs`, about: { "@id": ORGANIZATION_ID }, mainEntity: FAQS.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) })}
    <ClosingBand title="Still have a question? Ask TraininGenie directly." />
  </>;
}

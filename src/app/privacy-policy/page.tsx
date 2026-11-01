import type { Metadata } from "next";
import { listTitleClass } from "@/components/tg/fact-list";
import { IndexList } from "@/components/tg/index-list";
import { PageHero } from "@/components/tg/page-hero";
import { Section } from "@/components/tg/section";
import { TocNav } from "@/components/utility/toc-nav";
import { CONTACT_INFO, LEGAL_ENTITY } from "@/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Privacy Policy", "How TraininGenie collects, uses, and protects the personal data you share through this website.", "/privacy-policy");

const LAST_UPDATED = "11 October 2026";
// Nike's inline link, as TextLink: ink with a 1px underline that stays on hover while the colour turns grey.
// The email link also pads its hit area to about 46px tall with an invisible ::before, as TextLink does.
const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";
const email = <a href={`mailto:${CONTACT_INFO.email}`} className={`${inlineLink} relative break-words before:absolute before:inset-x-0 before:-inset-y-3`}>{CONTACT_INFO.email}</a>;
const list = "list-disc space-y-3 pl-5 marker:text-border-strong";
const term = "font-medium text-foreground";

const sections: { id: string; heading: string; body: React.ReactNode }[] = [
  { id: "who-we-are", heading: "Who we are", body: <p>TraininGenie is a corporate training and learning and development company based in Bengaluru, India, operated by {LEGAL_ENTITY.name} (CIN {LEGAL_ENTITY.cin}), registered office {LEGAL_ENTITY.registeredOffice.label}. This policy explains how we handle personal data collected through www.trainingenie.com. For any privacy question or request, contact us at {email}.</p> },
  { id: "what-we-collect", heading: "What we collect", body: <><p>We only collect the information you choose to give us:</p><ul className={list}><li>Details you enter in the enquiry form: your name, company, work email, phone number, training topic, number of participants, preferred format, and message.</li><li>Anything you send us directly by email or phone.</li></ul><p>This website does not use cookies, analytics, advertising trackers, or user accounts.</p></> },
  { id: "how-we-use-it", heading: "How we use it", body: <p>We use your details only to respond to your enquiry, discuss and arrange training, and keep a record of that conversation. We do not sell your data or use it for unrelated marketing.</p> },
  { id: "who-processes-it", heading: "Who processes it", body: <ul className={list}><li><strong className={term}>FormSubmit</strong> (formsubmit.co) receives enquiry form submissions and forwards them to us by email.</li><li><strong className={term}>Vercel</strong> hosts this website. Like any web host, it processes technical request data such as IP addresses in its server logs to deliver and secure the site.</li><li><strong className={term}>Our email provider</strong> stores the enquiries we receive.</li></ul> },
  { id: "how-long-we-keep-it", heading: "How long we keep it", body: <p>We keep enquiry details for as long as needed to respond to you and manage any resulting training engagement, and then delete them unless we need to keep them for legal or accounting reasons.</p> },
  { id: "your-choices-and-rights", heading: "Your choices and rights", body: <p>You can ask us to tell you what personal data we hold about you, correct it, delete it, or stop using it, and you can withdraw your consent at any time. Email {email} and we will respond as soon as we can. If you are not satisfied with our response, you may also raise a complaint with the relevant data protection authority.</p> },
  { id: "changes-to-this-policy", heading: "Changes to this policy", body: <p>We will update this page if the way we handle personal data changes. The date below shows when it was last revised.</p> },
];

// The policy in four lines, each one stated in full below, and where each is stated.
const summary = [["No cookies, analytics or ad trackers", "what-we-collect"], ["Used only to respond to your enquiry", "how-we-use-it"], ["3 services process data", "who-processes-it"], ["You can withdraw your consent any time", "your-choices-and-rights"]];

// The policy in brief, beside the title on desktop and after the lead on small screens: hairline rows,
// each one jumping to the section that states it in full.
const inShort = <IndexList id="in-short-heading" title="In short" sections={[{ rows: summary.map(([label, id]) => ({ href: `#${id}`, label })) }]} />;

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Privacy Policy" }]} title="Privacy Policy" primary={null} meta={[`Last updated: ${LAST_UPDATED}`]} aside={inShort} lead="How TraininGenie collects, uses, and protects the personal data you share through this website." />

    {/* Below lg the hero's In short list already closes on a hairline, so the policy starts a short step below it
        rather than after a full section's padding. */}
    <Section divider size="none" className="pb-12 pt-6 md:pb-20 md:pt-8 lg:py-24">
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        {/* Contents: beside the text and sticky on desktop; folded above it on small screens, so the policy comes sooner. */}
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-[116px]">
            <TocNav items={sections.map(({ id, heading }) => ({ id, label: heading }))} />
            {/* On small screens the email is in the first section just below, so this block is desktop only. */}
            <div className="mt-8 border-t border-border pt-6 max-lg:hidden">
              <p className={listTitleClass}>Questions about your data</p>
              <p className="mt-2 type-ui">{email}</p>
            </div>
          </div>
        </div>

        {/* Plain blocks rather than named regions: the h2s already carry the outline. */}
        <div className="min-w-0 lg:col-span-7 lg:col-start-4">
          {sections.map((section) => <div key={section.id} id={section.id} className="border-t border-border pt-8 max-lg:first:border-t-0 max-lg:first:pt-0 [&+&]:mt-12">
            <h2 className="type-h3 text-foreground">{section.heading}</h2>
            <div className="mt-4 max-w-measure space-y-4 type-body text-copy">{section.body}</div>
          </div>)}
          <p className="mt-12 border-t border-border pt-6 type-fine text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>
    </Section>
  </>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { Cin } from "@/components/company/cin";
import { Accordion } from "@/components/kit/accordion";
import { Breadcrumbs } from "@/components/tg/breadcrumbs";
import { ButtonLink } from "@/components/tg/button";
import { ClientProof } from "@/components/tg/client-proof";
import { Container } from "@/components/tg/container";
import { Label } from "@/components/tg/label";
import { Section } from "@/components/tg/section";
import { TextLink } from "@/components/tg/text-link";
import { ClientOnly } from "@/components/utility/client-only";
import { CopyButton } from "@/components/utility/copy-button";
import { CONTACT_INFO, FAQS, LEGAL_ENTITY } from "@/data";
import { DELIVERY_PROMISE } from "@/data/site-copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Contact TraininGenie", `Discuss your organization's training requirements with TraininGenie: call ${CONTACT_INFO.phones[0]} or send an enquiry. Based in Bengaluru; online, onsite or hybrid across India.`, "/contact-us");

const tel = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
const crumbs = [{ label: "Contact" }];
// The h1 sets its own breaks, the same in every browser: "Discuss your / training requirements" up to lg, and a
// three-line stack beside the lead from lg. The display size is 36px on every phone; under 375px wide (a 360px
// Android screen) "training requirements" no longer fits one line, so it steps down to 34px.
const title = <><span className="block">Discuss your</span> <span className="lg:block">training</span> requirements</>;
const h1Fit = "max-[374px]:text-[2.125rem]";
const linkedIn = [["TraininGenie on LinkedIn", CONTACT_INFO.companyLinkedIn], ["Founder on LinkedIn", CONTACT_INFO.directorLinkedIn]];
// The questions people most often have before sending an enquiry, in this order (the order /faqs opens with), then
// the one a buyer checks before writing to a new supplier.
const beforeYouWrite = ["Can TraininGenie deliver onsite training?", "Can training be customized?", "Who is TraininGenie's training for?", "Is TraininGenie a registered company?"];
const questions = beforeYouWrite.flatMap((name) => FAQS.filter(([question]) => question === name)).map(([question, answer]) => ({ question, answer }));

// What follows an enquiry, in the site's own words: the form's delivery note, the thank-you page and the first method
// step. How it travels (FormSubmit) and the privacy promise ("used only to respond to you") are said once, beside the
// submit button.
const nextSteps = [
  ["We receive your enquiry", "By email, to TraininGenie."],
  ["We follow up", "By email or phone, using the details you provided."],
  ["We shape the approach", "Starting from the business problem, participant context, and desired outcome."],
];

/**
 * What happens after an enquiry: plain hairline rows, without numbering or markers, in the same list language as
 * the direct contact rows, under a title at the h3 size of "Direct contact". It closes the column beside the form
 * (after it, below lg), so the next steps are read at the point of sending.
 */
function WhatHappensNext({ className }: { className: string }) {
  return <div className={className}>
    <h2 id="what-happens-next" className="type-h3 text-foreground">What happens next</h2>
    <ol className="mt-6 border-t border-border">
      {nextSteps.map(([title, text]) => <li key={title} className="border-b border-border py-5">
        <h3 className="type-ui font-medium text-foreground">{title}</h3>
        <p className="mt-1 type-ui text-copy">{text}</p>
      </li>)}
    </ol>
    <div className="mt-9"><TextLink href="/training-methodology">See how we work</TextLink></div>
  </div>;
}

// The quickest routes, a tap away before the form on phones and tablets. On phones the two pills share the row; from
// sm they keep one shared minimum width, and "Call" also shows the number, for screens that cannot dial. From lg the
// direct contact list stands beside the form with the same links (and Copy buttons), so the pills are not repeated.
const quickContact = <div className="mt-8 flex gap-3 lg:hidden">
  <ButtonLink href={`mailto:${CONTACT_INFO.email}?subject=Training%20enquiry`} variant="secondary" arrow={false} className="flex-1 sm:min-w-36 sm:flex-none">Email us</ButtonLink>
  <ButtonLink href={tel(CONTACT_INFO.phones[0])} variant="secondary" arrow={false} className="flex-1 sm:min-w-36 sm:flex-none"><span>Call<span className="tabular-nums max-sm:hidden"> {CONTACT_INFO.phones[0]}</span></span></ButtonLink>
</div>;

/** One row of the direct contact list: the label, then the detail, under a hairline. No icons: the label says what it is. */
function Row({ title, children }: { title: string; children: ReactNode }) {
  return <div className="min-w-0 border-t border-border py-5">
    <dt className="type-label text-muted-foreground">{title}</dt>
    <dd className="mt-2">{children}</dd>
  </div>;
}

/** A contact detail with its copy button. The button's space is reserved in the server HTML, so nothing moves when it appears. */
function Copyable({ children, value, what, target }: { children: ReactNode; value: string; what: string; target: string }) {
  return <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4">
    {children}
    <span className="flex min-h-11 min-w-16 shrink-0 items-center justify-end"><ClientOnly><CopyButton value={value} what={what} target={target} /></ClientOnly></span>
  </div>;
}

// 15px, like the rest of the aside, so the block keeps to the heading, one text size, the labels and the legal line.
// Ink at rest; on hover the detail underlines and turns grey, like every other link on the site.
const detail = "inline-flex min-h-11 items-center type-ui font-medium text-foreground decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground hover:underline";

export default function Page() {
  return <>
    {/* A short hero, so the form starts on the first screen: PageHero's compact opening, with the h1 and the lead set
        side by side from lg: the title's three lines on the left, the lead ending level with them on the right, over
        the direct contact column (from xl, exactly its width), so the hero spans the row and the form rises to meet it. On phones, where every line pushes the form down, the
        delivery line stays out of the hero; the Location row and the onsite answer below say the same. */}
    <header className="bg-background">
      <Container className="pb-8 pt-8 sm:pt-10 md:pb-12 lg:pb-16 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-y-7 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-6">
            <Label>Contact</Label>
            <h1 className={`mt-5 type-display text-foreground ${h1Fit}`}>{title}</h1>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <p className="max-w-measure type-lead text-copy">Tell us about your team, your objectives, and your preferred learning format. We can then discuss a suitable training or certification-preparation approach with you.</p>
            <p className="mt-6 type-ui text-copy max-sm:hidden">{DELIVERY_PROMISE}</p>
            {quickContact}
          </div>
        </div>
      </Container>
      {breadcrumbJsonLd(crumbs)}
    </header>

    {/* The form comes first, with the direct details, the client proof and what happens next beside it on desktop,
        and after it below lg. */}
    <Section divider size="none" className="pb-12 pt-8 md:pb-28 md:pt-10 lg:pb-32">
      <div className="grid gap-y-16 md:gap-y-20 lg:grid-cols-12 lg:gap-x-10">
        <div id="enquiry" className="min-w-0 lg:col-span-7">
          <ContactForm />
        </div>

        <aside aria-label="Other ways to reach TraininGenie" className="min-w-0 lg:col-span-4 lg:col-start-9">
          <div>
            <h2 id="direct-contact" className="type-h3 text-foreground">Direct contact</h2>
            <p className="mt-3 type-ui text-muted-foreground">Prefer to write or call? Reach us directly.</p>
            <dl className="mt-8 border-b border-border">
              <Row title="Email">
                <Copyable value={CONTACT_INFO.email} what="email address" target="contact-email"><a id="contact-email" href={`mailto:${CONTACT_INFO.email}`} className={`${detail} break-all`}>{CONTACT_INFO.email}</a></Copyable>
              </Row>
              <Row title="Phone">
                <ul>{CONTACT_INFO.phones.map((phone, index) => <li key={phone}><Copyable value={phone} what={`phone number ${phone}`} target={`contact-phone-${index + 1}`}><a id={`contact-phone-${index + 1}`} href={tel(phone)} className={`${detail} whitespace-nowrap tabular-nums`}>{phone}</a></Copyable></li>)}</ul>
              </Row>
              <Row title="LinkedIn">
                <ul className="flex min-h-11 flex-wrap items-center gap-x-8 gap-y-5">{linkedIn.map(([label, href]) => <li key={href}><TextLink href={href} external>{label}</TextLink></li>)}</ul>
              </Row>
              <Row title="Location">
                <p className="type-ui text-copy">Based in Bengaluru, with Kolkata as an associated location.</p>
                <p className="mt-1 type-ui text-copy">Training is offered to organizations across India.</p>
                {/* The legal name, then the CIN on its own line with its Copy button, for a registry check. */}
                <div className="mt-3 type-caption text-muted-foreground">
                  <p>{LEGAL_ENTITY.name}</p>
                  <p>CIN <Cin /></p>
                  <p>Registered office: {LEGAL_ENTITY.registeredOffice.label}</p>
                </div>
              </Row>
            </dl>
          </div>

          {/* Beside the form the column is narrow: it holds four of the five logos on one line from xl, as phones do,
              and three from lg to xl, so the row never wraps. */}
          <ClientProof className="mt-12 lg:[&_li:nth-child(5)]:hidden lg:max-xl:[&_li:nth-child(4)]:hidden" />
          <WhatHappensNext className="mt-14" />
        </aside>
      </div>
    </Section>

    {/* Common questions, answered before anyone has to write in: the page's one grey band. No closing band here,
        because this page is where every closing band leads. */}
    <Section tone="tint" labelledBy="before-you-write">
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div data-reveal className="lg:col-span-4">
          <Label>Before you write</Label>
          <h2 id="before-you-write" className="mt-5 type-h2 text-foreground">Have a question first?</h2>
          {/* A way back up to the form, beside the way out to the FAQs. */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4"><TextLink href="/faqs">Read the FAQs</TextLink><TextLink href="#enquiry" arrow="none">Send an enquiry</TextLink></div>
        </div>
        <Accordion className="min-w-0 lg:col-span-8" items={questions} />
      </div>
    </Section>
  </>;
}

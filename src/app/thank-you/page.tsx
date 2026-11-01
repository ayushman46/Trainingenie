import type { Metadata } from "next";
import { BULB_LIGHT, ParticleBulb } from "@/components/brand/particle-bulb";
import { ButtonLink } from "@/components/tg/button";
import { EnquiryEcho } from "@/components/utility/enquiry-echo";
import { StatusLinks, StatusState } from "@/components/utility/status-state";
import { CONTACT_INFO, FAQS, METHOD_STEPS } from "@/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = { ...pageMetadata("Thank You", "Your TraininGenie enquiry has been received.", "/thank-you"), robots: { index: false, follow: false } };

// Useful reading before the follow-up conversation (the buttons already lead home and to the catalogue), led by the
// company record, for a buyer who starts vendor checks now. The past-training total is not promoted until the owner
// supplies real scale numbers.
const links = [
  { href: "/about-us#company", title: "Company record", meta: "Legal name, CIN and registered office" },
  { href: "/training-methodology", title: "How we work", meta: `${METHOD_STEPS.length} steps, from requirement to review` },
  { href: "/past-trainings", title: "Past trainings", meta: "Recently delivered topics, by training area" },
  { href: "/faqs", title: "FAQs", meta: `${FAQS.length} questions answered` },
];

const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";
const phone = CONTACT_INFO.phones[0];

// The bulb "switches on" on the white page, with no panel: the dots assemble and the glass lights, as on the landing
// page. From lg it scales with the screen's height (320px wide on a 900px-tall screen, 272px from 840px down), so the
// h1 and the pills stay in the first view.
const bulb = <div className="w-[210px] sm:w-[250px] lg:w-[clamp(272px,calc((100svh_-_500px)*0.8),320px)]"><ParticleBulb palette={BULB_LIGHT} /></div>;

// Under the pills, centred with the message above them: what was sent and where the reply goes (when this tab sent
// it), and a direct line for anything the form left out. Then where to read on. Both pills are white, so nothing
// pushes the visitor away from here.
const after = <>
  <div className="mx-auto mt-10 max-w-[44ch] text-center text-balance">
    <EnquiryEcho className="mb-4" />
    <p className="type-ui text-copy">Something to add? Email <a href={`mailto:${CONTACT_INFO.email}`} className={`${inlineLink} wrap-anywhere`}>{CONTACT_INFO.email}</a> or call <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${inlineLink} whitespace-nowrap tabular-nums`}>{phone}</a>.</p>
  </div>
  <StatusLinks title="While you wait" links={links} className="mt-16 sm:mt-20" />
</>;

export default function Page() {
  return <StatusState visual={bulb} label="Enquiry sent" title="Thank you" after={after} actions={<>
    <ButtonLink href="/" variant="secondary" className="max-sm:w-full">Return home</ButtonLink>
    <ButtonLink href="/corporate-training-services" variant="secondary" className="max-sm:w-full">All training topics</ButtonLink>
  </>}>
    We have received your enquiry and will follow up using the details you provided.
  </StatusState>;
}

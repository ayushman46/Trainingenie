import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CONTACT_INFO } from "@/data";
import { pageMetadata } from "@/lib/seo";
import { textLink } from "@/lib/ui";
export const metadata: Metadata = pageMetadata("Privacy Policy", "How TraininGenie collects, uses, and protects the personal data you share through this website.", "/privacy-policy");
const LAST_UPDATED = "11 October 2026";
const email = <a href={`mailto:${CONTACT_INFO.email}`} className={`${textLink} break-all`}>{CONTACT_INFO.email}</a>;
const sections: { heading: string; body: React.ReactNode }[] = [
  { heading: "Who we are", body: <p>TraininGenie is a corporate training and learning and development company based in Bengaluru, India. This policy explains how we handle personal data collected through www.trainingenie.com. For any privacy question or request, contact us at {email}.</p> },
  { heading: "What we collect", body: <><p>We only collect the information you choose to give us:</p><ul className="mt-3 list-disc space-y-2 pl-6 max-md:list-none max-md:pl-0"><li>Details you enter in the enquiry form: your name, company, work email, phone number, training topic, number of participants, preferred format, and message.</li><li>Anything you send us directly by email or phone.</li></ul><p className="mt-3">This website does not use cookies, analytics, advertising trackers, or user accounts.</p></> },
  { heading: "How we use it", body: <p>We use your details only to respond to your enquiry, discuss and arrange training, and keep a record of that conversation. We do not sell your data or use it for unrelated marketing.</p> },
  { heading: "Who processes it", body: <ul className="list-disc space-y-2 pl-6 max-md:list-none max-md:pl-0"><li><strong>FormSubmit</strong> (formsubmit.co) receives enquiry form submissions and forwards them to us by email.</li><li><strong>Vercel</strong> hosts this website. Like any web host, it processes technical request data such as IP addresses in its server logs to deliver and secure the site.</li><li><strong>Our email provider</strong> stores the enquiries we receive.</li></ul> },
  { heading: "How long we keep it", body: <p>We keep enquiry details for as long as needed to respond to you and manage any resulting training engagement, and then delete them unless we need to keep them for legal or accounting reasons.</p> },
  { heading: "Your choices and rights", body: <p>You can ask us to tell you what personal data we hold about you, correct it, delete it, or stop using it, and you can withdraw your consent at any time. Email {email} and we will respond as soon as we can. If you are not satisfied with our response, you may also raise a complaint with the relevant data protection authority.</p> },
  { heading: "Changes to this policy", body: <p>We will update this page if the way we handle personal data changes. The date below shows when it was last revised.</p> },
];
export default function Page() { return <PageShell title="Privacy Policy" cta={false} intro="How TraininGenie collects, uses, and protects the personal data you share through this website."><div className="mt-16 max-w-3xl border-t border-border">{sections.map((section) => <section key={section.heading} className="border-b border-border py-8"><h2 className="text-2xl font-medium tracking-[-0.03em]">{section.heading}</h2><div className="mt-4 text-lg leading-relaxed text-slate-600">{section.body}</div></section>)}<p className="pt-8 text-sm text-slate-600">Last updated: {LAST_UPDATED}</p></div></PageShell>; }

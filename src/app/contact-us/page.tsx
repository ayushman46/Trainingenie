import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";
import { CONTACT_INFO } from "@/data";
import { pageMetadata } from "@/lib/seo";
import { eyebrow, textLink } from "@/lib/ui";
export const metadata: Metadata = pageMetadata("Contact TraininGenie", "Discuss your organization's training requirements with TraininGenie.", "/contact-us");
export default function Page() { return <PageShell title="Discuss your training requirements" label="Contact" cta={false} intro="Tell TraininGenie about your team, objectives, and preferred learning format. We can then discuss a suitable training or certification-preparation approach."><div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_.8fr]"><ContactForm /><div className="min-w-0 border-t border-border"><section className="border-b border-border py-7"><h2 className={eyebrow}>Email</h2><p className="mt-3 text-lg"><a href={`mailto:${CONTACT_INFO.email}`} className={`${textLink} break-all`}>{CONTACT_INFO.email}</a></p></section><section className="border-b border-border py-7"><h2 className={eyebrow}>Phone</h2><ul className="mt-3 space-y-2 text-lg">{CONTACT_INFO.phones.map((phone) => <li key={phone}><a href={`tel:${phone.replace(/\s/g, "")}`} className={textLink}>{phone}</a></li>)}</ul></section><section className="border-b border-border py-7"><h2 className={eyebrow}>Location</h2><p className="mt-3 leading-relaxed text-slate-600">Based in Bengaluru, with Kolkata as an associated location. Training is offered to organizations across India.</p></section><p className="py-7 text-slate-600">Have a question first? <Link href="/faqs" className={textLink}>Read the FAQs</Link>.</p></div></div></PageShell>; }

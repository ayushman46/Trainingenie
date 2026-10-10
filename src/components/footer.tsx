import Link from "next/link";
import { COMPANY_NAME, COMPANY_TAGLINE, CONTACT_INFO, COURSES, TRAINING_PILLARS } from "@/data";
import { newTabHint } from "@/lib/ui";

const companyLinks = [["About", "/about-us"], ["Training", "/corporate-training-services"], ["Clients", "/clients-and-testimonials"], ["Contact", "/contact-us"], ["Privacy policy", "/privacy-policy"]];
const footerLink = "block py-1.5 text-sm text-white/75 transition hover:text-white";
const footerHeading = "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70";
const socialLink = "inline-flex items-center rounded-md border border-white/25 px-3 py-2 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:text-white";

export function Footer() {
  return <footer className="bg-[#081426] px-5 pb-8 pt-16 text-white sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
      <div>
        <p className="text-2xl font-medium tracking-[-0.04em]">{COMPANY_NAME}</p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{COMPANY_TAGLINE}</p>
        <p className="mt-6 text-sm leading-7 text-white/75"><a href={`mailto:${CONTACT_INFO.email}`} className="break-all transition hover:text-white">{CONTACT_INFO.email}</a><br />{CONTACT_INFO.phones.map((phone, index) => <span key={phone}>{index > 0 && " | "}<a href={`tel:${phone.replace(/\s/g, "")}`} className="whitespace-nowrap transition hover:text-white">{phone}</a></span>)}</p>
        <div className="mt-6 flex flex-wrap gap-2 max-md:justify-center">
          <a href={CONTACT_INFO.companyLinkedIn} target="_blank" rel="noreferrer" className={socialLink}>Company LinkedIn<span className="sr-only"> {newTabHint}</span></a>
          <a href={CONTACT_INFO.directorLinkedIn} target="_blank" rel="noreferrer" className={socialLink}>Director LinkedIn<span className="sr-only"> {newTabHint}</span></a>
        </div>
      </div>
      <nav aria-label="Company"><p className={footerHeading}>Company</p>{companyLinks.map(([label, href]) => <Link key={href} href={href} className={footerLink}>{label}</Link>)}</nav>
      <nav aria-label="Training areas"><p className={footerHeading}>Training</p>{TRAINING_PILLARS.map((item) => <Link key={item.slug} href={`/${item.slug}`} className={footerLink}>{item.title}</Link>)}</nav>
      <nav aria-label="Popular programmes"><p className={footerHeading}>Popular programmes</p>{COURSES.slice(0, 4).map((item) => <Link key={item.slug} href={`/${item.slug}`} className={footerLink}>{item.title}</Link>)}</nav>
    </div>
    <div className="mx-auto mt-14 max-w-7xl border-t border-white/15 pt-6 text-xs text-white/70">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</div>
  </footer>;
}

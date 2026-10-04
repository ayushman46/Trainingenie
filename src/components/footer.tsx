import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COMPANY_NAME, COMPANY_TAGLINE, CONTACT_INFO, COURSES, TRAINING_PILLARS } from "@/data";

const companyLinks = [["About", "/about"], ["Services", "/services"], ["Case Studies", "/case-studies"], ["Past Trainings", "/past-trainings"], ["Contact", "/contact"]];

export function Footer() {
  return <footer className="bg-[#081426] px-5 pb-8 pt-16 text-white sm:px-8">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
      <div>
        <p className="text-2xl font-extrabold tracking-[-0.04em]">{COMPANY_NAME}</p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{COMPANY_TAGLINE}</p>
        <p className="mt-6 text-sm leading-7 text-white/65">{CONTACT_INFO.email}<br />{CONTACT_INFO.phones.join(" | ")}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href="https://www.linkedin.com/company/trainingenie/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-white/75 transition hover:border-white/40 hover:text-white">Company LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/mousumi-chakraborty-468b1916/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-white/75 transition hover:border-white/40 hover:text-white">Director LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Company</p>{companyLinks.map(([label, href]) => <Link key={href} href={href} className="block py-1.5 text-sm text-white/65 transition hover:text-white">{label}</Link>)}</div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Training</p>{TRAINING_PILLARS.slice(0, 4).map((item) => <Link key={item.slug} href={`/${item.slug}`} className="block py-1.5 text-sm text-white/65 transition hover:text-white">{item.title}</Link>)}</div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Popular programs</p>{COURSES.slice(0, 4).map((item) => <Link key={item.slug} href={`/${item.slug}`} className="flex items-center gap-1 py-1.5 text-sm text-white/65 transition hover:text-white">{item.title}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}</div>
    </div>
    <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/40">(c) {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</div>
  </footer>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { COMPANY_NAME } from "@/data";

const trainingLinks = [
  ["All Training Programs", "/corporate-training-services"],
  ["Technology", "/technology-training"],
  ["Leadership and Soft Skills", "/leadership-soft-skills-training"],
  ["Management Systems", "/itil-prince2-agile-training"],
  ["ISO and GRC", "/iso-standards-training"],
  ["Training Methodology", "/training-methodology"],
] as const;
const experienceLinks = [["Past Trainings", "/past-trainings"], ["Clients and Testimonials", "/clients-and-testimonials"]] as const;
const resourceLinks = [["FAQs", "/faqs"], ["Blog and Resources", "/blog"]] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const linkClass = (href: string) => `rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${pathname === href ? "bg-[#eef1f8] text-[#1d2a63]" : "text-slate-600 hover:bg-[#f5f6fa] hover:text-[#0e1726]"}`;
  const dropdown = (label: string, links: readonly (readonly [string, string])[]) => <div className="group relative"><button type="button" className="inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-slate-600 transition hover:bg-[#f5f6fa] hover:text-[#0e1726]">{label}<ChevronDown className="h-3.5 w-3.5" /></button><div className="invisible absolute left-0 top-full w-64 translate-y-2 pt-3 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"><div className="border border-border bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.14)]">{links.map(([item, href]) => <Link key={href} href={href} className="block px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1d2a63]">{item}</Link>)}</div></div></div>;
  return <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"><div className="mx-auto flex min-h-[68px] w-full max-w-7xl items-center justify-between border border-white/60 bg-white/90 px-4 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-6"><Link href="/" className="flex items-center gap-3" onClick={close}><Image src="/logo_icon.png" alt="TraininGenie" width={38} height={38} className="object-contain" priority /><span className="text-[15px] font-extrabold tracking-[-0.03em] text-[#0e1726]">{COMPANY_NAME}</span></Link><nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{dropdown("Training", trainingLinks)}<Link href="/about-us" className={linkClass("/about-us")}>About</Link>{dropdown("Experience", experienceLinks)}{dropdown("Resources", resourceLinks)}<Link href="/contact-us" className="ml-2 inline-flex items-center gap-2 bg-[#0e1726] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#1d2a63]">Contact <ArrowUpRight className="h-4 w-4" /></Link></nav><button type="button" className="p-2.5 text-[#0e1726] transition hover:bg-[#f0f2f7] lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>{open && <nav className="absolute left-3 right-3 top-[76px] max-h-[calc(100vh-90px)] overflow-y-auto border border-border bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.14)] lg:hidden" aria-label="Mobile navigation"><p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Training</p>{trainingLinks.map(([label, href]) => <Link key={href} href={href} onClick={close} className="block px-3 py-2.5 text-sm font-semibold text-slate-700">{label}</Link>)}<p className="mb-2 mt-5 px-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Explore</p>{[["About TraininGenie", "/about-us"], ...experienceLinks, ...resourceLinks].map(([label, href]) => <Link key={href} href={href} onClick={close} className="block px-3 py-2.5 text-sm font-semibold text-slate-700">{label}</Link>)}<Link href="/contact-us" onClick={close} className="mt-4 block bg-[#0e1726] px-3 py-3 text-center text-sm font-bold text-white">Contact TraininGenie</Link></nav>}</div></header>;
}

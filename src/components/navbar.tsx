"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { COMPANY_NAME } from "@/data";
import { buttonPrimary } from "@/lib/ui";

type NavLink = readonly [label: string, href: string];
const aboutLinks: readonly NavLink[] = [["About profile", "/about-us"], ["Founder profile", "/our-team"]];
const trainingLinks: readonly NavLink[] = [
  ["All training topics", "/corporate-training-services"],
  ["Technology", "/technology-training"],
  ["Leadership and soft skills", "/leadership-soft-skills-training"],
  ["Management systems", "/itil-prince2-agile-training"],
  ["Standards and governance", "/iso-standards-training"],
  ["Training methodology", "/training-methodology"],
  ["Past training topics", "/past-trainings"],
];
const resourceLinks: readonly NavLink[] = [["FAQs", "/faqs"], ["Blog and resources", "/blog"]];
const menus = [["About", aboutLinks], ["Training", trainingLinks], ["Resources", resourceLinks]] as const;
type MenuName = (typeof menus)[number][0] | "mobile";

export function Navbar() {
  const pathname = usePathname();
  // Menus remember the page they were opened on, so navigating anywhere (links, back/forward) closes them without an effect.
  const [opened, setOpened] = useState<{ name: MenuName; path: string } | null>(null);
  const openMenu = opened?.path === pathname ? opened.name : null;
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuName, HTMLButtonElement | null>>>({});

  const toggle = (name: MenuName) => setOpened(openMenu === name ? null : { name, path: pathname });
  const close = () => setOpened(null);

  useEffect(() => {
    if (!openMenu) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { triggerRefs.current[openMenu]?.focus(); setOpened(null); } };
    const onPointerDown = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpened(null); };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => { document.removeEventListener("keydown", onKeyDown); document.removeEventListener("pointerdown", onPointerDown); };
  }, [openMenu]);

  useEffect(() => {
    if (openMenu !== "mobile") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [openMenu]);

  const isCurrent = (href: string) => pathname === href;
  const linkClass = (href: string) => `rounded-full px-3 py-2.5 text-[13px] font-semibold transition ${isCurrent(href) ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-primary/5 hover:text-foreground"}`;

  const dropdown = (label: (typeof menus)[number][0], links: readonly NavLink[]) => {
    const id = `menu-${label.toLowerCase()}`;
    const expanded = openMenu === label;
    const sectionActive = links.some(([, href]) => isCurrent(href));
    return <div key={label} className="group relative">
      <button type="button" ref={(element) => { triggerRefs.current[label] = element; }} aria-expanded={expanded} aria-controls={id} onClick={() => toggle(label)} className={`rounded-full px-3 py-2.5 text-[13px] font-semibold transition ${sectionActive || expanded ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-primary/5 hover:text-foreground"}`}>{label}<span aria-hidden="true" className="ml-1 inline-block text-[10px]">▾</span></button>
      <div id={id} className={`absolute left-0 top-full w-64 pt-3 transition ${expanded ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"}`}>
        <ul className="rounded-xl border border-border bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.14)]">{links.map(([item, href]) => <li key={href}><Link href={href} aria-current={isCurrent(href) ? "page" : undefined} className={`block rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-50 hover:text-primary ${isCurrent(href) ? "text-primary" : "text-slate-700"}`}>{item}</Link></li>)}</ul>
      </div>
    </div>;
  };

  const mobileGroup = (label: string, links: readonly NavLink[]) => <div key={label}>
    <p id={`mobile-${label.toLowerCase()}`} className="mb-2 mt-5 px-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">{label}</p>
    <ul aria-labelledby={`mobile-${label.toLowerCase()}`}>{links.map(([item, href]) => <li key={href}><Link href={href} aria-current={isCurrent(href) ? "page" : undefined} onClick={close} className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${isCurrent(href) ? "text-primary" : "text-slate-700"}`}>{item}</Link></li>)}</ul>
  </div>;

  return <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
    <div className="mx-auto flex min-h-[68px] w-full max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:px-6">
      <Link href="/" className="flex min-w-0 items-center gap-3"><Image src="/logo_icon.png" alt="" width={38} height={38} className="shrink-0 object-contain" priority /><span className="truncate text-[15px] font-extrabold tracking-[-0.03em] text-foreground">{COMPANY_NAME}</span></Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        <Link href="/" aria-current={isCurrent("/") ? "page" : undefined} className={linkClass("/")}>Home</Link>
        {dropdown("About", aboutLinks)}
        {dropdown("Training", trainingLinks)}
        <Link href="/clients-and-testimonials" aria-current={isCurrent("/clients-and-testimonials") ? "page" : undefined} className={linkClass("/clients-and-testimonials")}>Clients</Link>
        {dropdown("Resources", resourceLinks)}
        <Link href="/contact-us" aria-current={isCurrent("/contact-us") ? "page" : undefined} className={`${buttonPrimary} ml-2 px-5 py-2.5 text-[13px]`}>Contact</Link>
      </nav>
      <button type="button" ref={(element) => { triggerRefs.current.mobile = element; }} className="shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold text-foreground transition hover:bg-primary/5 lg:hidden" aria-expanded={openMenu === "mobile"} aria-controls="mobile-navigation" onClick={() => toggle("mobile")}>{openMenu === "mobile" ? "Close" : "Menu"}<span className="sr-only"> navigation</span></button>
      {openMenu === "mobile" && <nav id="mobile-navigation" className="absolute left-3 right-3 top-[76px] max-h-[calc(100dvh-90px)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.14)] sm:left-6 sm:right-6 lg:hidden" aria-label="Mobile navigation">
        <ul><li><Link href="/" aria-current={isCurrent("/") ? "page" : undefined} onClick={close} className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${isCurrent("/") ? "text-primary" : "text-slate-700"}`}>Home</Link></li></ul>
        {menus.slice(0, 2).map(([label, links]) => mobileGroup(label, links))}
        <ul className="mt-5"><li><Link href="/clients-and-testimonials" aria-current={isCurrent("/clients-and-testimonials") ? "page" : undefined} onClick={close} className={`block rounded-lg px-3 py-2.5 text-sm font-semibold ${isCurrent("/clients-and-testimonials") ? "text-primary" : "text-slate-700"}`}>Clients</Link></li></ul>
        {menus.slice(2).map(([label, links]) => mobileGroup(label, links))}
        <Link href="/contact-us" onClick={close} className={`${buttonPrimary} mt-4 w-full`}>Contact</Link>
      </nav>}
    </div>
  </header>;
}

import { Link } from "wouter";
import { COMPANY_NAME, SERVICES } from "@/data";

const PROGRAMMES = SERVICES.slice(0, 5).map((s) => ({
  label: s.title,
  href: `/contact?service=${encodeURIComponent(s.title)}`,
}));

const COMPANY_LINKS = [
  { label: "About Us",       href: "/about" },
  { label: "Impact Stories", href: "/case-studies" },
  { label: "All Programmes", href: "/services" },
  { label: "Contact",        href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground pt-16 pb-8">
      <div className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                T
              </div>
              <span className="font-bold text-base text-white">{COMPANY_NAME}</span>
            </Link>
            <p className="text-sidebar-foreground/60 text-sm leading-relaxed max-w-xs">
              Hands-on technical training for India's fastest-growing engineering teams.
            </p>
          </div>

          {/* Programmes */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50 mb-5">Programmes</p>
            <ul className="space-y-3">
              {PROGRAMMES.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-sidebar-foreground/70 hover:text-white transition-colors text-sm">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50 mb-5">Company</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sidebar-foreground/70 hover:text-white transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-sidebar-foreground/40">
          <p>© {new Date().getFullYear()} {COMPANY_NAME} Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

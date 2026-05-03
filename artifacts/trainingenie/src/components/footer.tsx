import { Link } from "wouter";
import { COMPANY_NAME, SERVICES } from "@/data";

// ── Footer column config — easy to update ────────────────────────────────────
const PROGRAMMES = SERVICES.slice(0, 5).map((s) => ({
  label: s.title,
  href: `/contact?service=${encodeURIComponent(s.title)}`,
}));

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Impact Stories", href: "/case-studies" },
  { label: "All Programmes", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
                T
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                {COMPANY_NAME}
              </span>
            </Link>
            <p className="text-sidebar-foreground/70 leading-relaxed text-sm">
              Hands-on technical training for India's fastest-growing engineering
              teams — built around your stack, not a generic curriculum.
            </p>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="font-semibold text-base mb-6 text-white">
              Programmes
            </h4>
            <ul className="space-y-3">
              {PROGRAMMES.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-base mb-6 text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sidebar-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sidebar-foreground/50">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME} Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

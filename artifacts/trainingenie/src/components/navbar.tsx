// ─────────────────────────────────────────────────────────────────────────────
// LOGO CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
//
// To use your own company logo:
//
//   STEP 1 — Place your logo file here:
//              artifacts/trainingenie/public/logo.png
//            (also works with .svg, .webp, .jpg)
//
//   STEP 2 — Uncomment the line below that imports the logo:
//              import companyLogo from "/logo.png";
//            (the leading "/" means it's served from the public/ folder)
//
//   STEP 3 — In the JSX below, find the comment:
//              {/* ── LOGO: swap between image logo and lettermark ── */}
//            and follow the swap instructions there.
//
//   The navbar currently shows the "T" lettermark as a fallback.
//   Once you add your logo file and uncomment the import, swap as shown.
// ─────────────────────────────────────────────────────────────────────────────

// import companyLogo from "/logo.png"; // ← STEP 2: uncomment this line

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { COMPANY_NAME, NAV_LINKS } from "@/data";

export function Navbar() {
  const [location]  = useLocation();
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 50));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/92 backdrop-blur-lg border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 flex h-[72px] items-center justify-between">

        {/* ── LOGO: swap between image logo and lettermark ── */}
        <Link href="/" className="flex items-center gap-2.5 group">

          {/* ── OPTION A (default): Lettermark fallback ──────────────────────
              Shows a "T" box + company name. Used when no logo image exists.
              DELETE or comment out this block when you add your logo image. */}
          <div className="h-7 w-7 rounded-md bg-foreground flex items-center justify-center text-background font-black text-xs group-hover:opacity-80 transition-opacity">
            T
          </div>
          <span className="font-bold text-sm tracking-tight group-hover:opacity-70 transition-opacity">
            {COMPANY_NAME}
          </span>
          {/* ── End of OPTION A ──────────────────────────────────────────── */}

          {/* ── OPTION B: Image logo ─────────────────────────────────────────
              After completing STEP 2 above, DELETE the OPTION A block above
              and UNCOMMENT the block below.

          <img
            src={companyLogo}
            alt={COMPANY_NAME}
            className="h-8 w-auto object-contain group-hover:opacity-80 transition-opacity"
          />

          ── End of OPTION B ────────────────────────────────────────────── */}

        </Link>
        {/* ── End logo area ───────────────────────────────────────────────── */}

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                "relative text-sm font-medium py-1 transition-colors hover:text-foreground",
                location === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.span
                  layoutId="nav-line"
                  className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="hidden md:block">
          <span className="text-sm font-semibold text-foreground hover:opacity-60 transition-opacity cursor-pointer">
            Let's Talk
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden bg-background border-b border-border"
      >
        <div className="px-5 pt-2 pb-6 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-base font-medium border-b border-border/40 last:border-0 transition-colors",
                location === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 text-base font-bold text-foreground"
          >
            Let's Talk
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

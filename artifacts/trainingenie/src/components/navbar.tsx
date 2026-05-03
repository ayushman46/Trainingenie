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
          ? "bg-background/90 backdrop-blur-lg border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 flex h-[72px] items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-xs group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="font-extrabold text-sm tracking-tight group-hover:text-primary transition-colors">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                "relative text-sm font-semibold py-1 transition-colors hover:text-foreground",
                location === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.span
                  layoutId="nav-line"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="hidden md:block">
          <motion.span
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary cursor-pointer"
          >
            Let's Talk ↗
          </motion.span>
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden md:hidden bg-background border-b border-border"
      >
        <div className="px-5 pt-2 pb-5 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-base font-semibold border-b border-border/40 last:border-0 transition-colors",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 text-base font-bold text-primary"
          >
            Let's Talk ↗
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

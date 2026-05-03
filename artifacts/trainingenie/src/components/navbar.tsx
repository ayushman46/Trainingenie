import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { COMPANY_NAME, NAV_LINKS } from "@/data";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen,     setIsOpen]     = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const { scrollY } = useScroll();

  // Swap classes instead of animated inline styles — avoids re-renders
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-5 md:px-8 h-18 flex items-center justify-between" style={{ height: "4.5rem" }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="font-bold text-base tracking-tight group-hover:text-primary transition-colors">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium py-1 transition-colors hover:text-foreground",
                location === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:block">
            <Button size="sm" className="rounded-full px-5 font-semibold">
              Let's Talk
            </Button>
          </Link>

          <button
            className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background border-b border-border px-5 pb-5 pt-2 flex flex-col gap-1"
          onClick={() => setIsOpen(false)}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block py-3 text-base font-medium border-b border-border/50 last:border-0 transition-colors",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/contact">
              <Button className="w-full rounded-full font-semibold">Let's Talk</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

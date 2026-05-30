import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { COMPANY_NAME, NAV_LINKS } from "@/data";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 20));

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300">
      {/* Outer container for the floating pill */}
      <div 
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-full transition-all duration-300",
          scrolled 
            ? "bg-background/95 backdrop-blur-md shadow-lg border border-border/50 w-full max-w-4xl" 
            : "bg-background/80 backdrop-blur-sm shadow-md border border-border/20 w-full max-w-4xl"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group pl-3">
          <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center text-background font-black text-sm group-hover:opacity-80 transition-opacity">
            T
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:block group-hover:opacity-70 transition-opacity">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 rounded-full px-1.5 py-1.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                "relative text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:text-foreground",
                location === link.href ? "text-foreground bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-1">
            <span className="px-6 py-2.5 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors cursor-pointer inline-block">
              Enquire
            </span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full text-foreground hover:bg-muted transition-colors mr-1"
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
        animate={open ? { height: "auto", opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -10 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-4 right-4 mt-3 overflow-hidden md:hidden bg-background rounded-2xl shadow-xl border border-border"
      >
        <div className="p-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                location === link.href ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 text-center rounded-xl text-base font-bold bg-foreground text-background"
          >
            Enquire
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

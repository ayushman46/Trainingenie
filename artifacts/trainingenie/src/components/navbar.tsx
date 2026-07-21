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
    <header className="fixed inset-x-0 top-0 sm:top-4 z-50 flex justify-center px-2 sm:px-4 transition-all duration-300">
      {/* Outer container for the floating pill */}
      <div 
        className={cn(
          "flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2 rounded-none sm:rounded-full transition-all duration-300 w-full sm:w-[calc(100%-2rem)] max-w-4xl sm:mx-4",
          scrolled 
            ? "bg-background/95 backdrop-blur-md shadow-lg border-border/50 border-b sm:border" 
            : "bg-background/80 backdrop-blur-sm shadow-md border-border/20 border-b sm:border"
        )}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group pl-1 sm:pl-3 min-h-[44px]">
          <img 
            src="/logo_icon.png" 
            alt="TraininGenie Logo" 
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-bold text-xs sm:text-sm tracking-tight hidden sm:block group-hover:opacity-70 transition-opacity">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/40 rounded-full px-1.5 py-1.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={cn(
                "relative text-sm font-medium px-4 xl:px-5 py-2.5 rounded-full transition-all hover:text-foreground",
                location === link.href ? "text-foreground bg-background shadow-sm" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="ml-1">
            <span className="px-5 xl:px-6 py-2.5 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors cursor-pointer inline-block">
              Enquire
            </span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2.5 rounded-full text-foreground hover:bg-muted transition-colors mr-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
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
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-2 right-2 sm:left-4 sm:right-4 mt-2 sm:mt-3 overflow-hidden md:hidden bg-background rounded-2xl shadow-xl border border-border"
      >
        <div className="p-2 sm:p-3 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "px-4 py-3.5 rounded-xl text-base font-medium transition-colors min-h-[48px] flex items-center",
                location === link.href ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-2 mx-2 px-4 py-3.5 text-center rounded-xl text-base font-bold bg-foreground text-background min-h-[48px] flex items-center justify-center"
          >
            Enquire
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

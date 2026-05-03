import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { COMPANY_NAME, NAV_LINKS } from "@/data";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transparent at top, frosted glass as you scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.92)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 80],
    ["blur(0px)", "blur(14px)"]
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 80],
    ["1px solid rgba(226,232,240,0)", "1px solid rgba(226,232,240,1)"]
  );

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-105 transition-transform">
            T
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2",
                location === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {location === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/contact">
            <Button
              size="sm"
              className="rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              Let's Talk
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-background border-b border-border shadow-xl md:hidden py-4 px-6 flex flex-col gap-3"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base font-medium py-2",
                location === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border">
            <Link href="/contact" className="block w-full">
              <Button size="lg" className="w-full rounded-full">
                Let's Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

/**
 * CtaLink — minimal animated text link.
 * Hover: underline wipes out → redraws (no arrows, no icons).
 *
 * Usage:
 *   <CtaLink href="/contact">Start a conversation</CtaLink>
 *   <CtaLink href="/contact" variant="light">Schedule a call</CtaLink>
 *   <CtaLink href="/services" variant="muted">Explore programmes</CtaLink>
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "default" | "light" | "muted";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const colourMap: Record<Variant, { text: string; bar: string }> = {
  default: { text: "text-foreground",                    bar: "bg-foreground" },
  light:   { text: "text-white",                          bar: "bg-white" },
  muted:   { text: "text-muted-foreground hover:text-foreground", bar: "bg-muted-foreground" },
};

export function CtaLink({ href, children, variant = "default", className, external }: Props) {
  const { text, bar } = colourMap[variant];

  const inner = (
    <motion.span
      className={cn("group relative inline-block font-semibold select-none cursor-pointer", text, className)}
      whileHover="hovered"
      initial="idle"
    >
      {children}
      {/* wipe-out underline */}
      <motion.span
        className={cn("absolute -bottom-px left-0 right-0 h-px", bar)}
        variants={{
          idle:    { scaleX: 1, transformOrigin: "right" },
          hovered: { scaleX: 0, transformOrigin: "right" },
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* redraw underline */}
      <motion.span
        className={cn("absolute -bottom-px left-0 right-0 h-px", bar)}
        variants={{
          idle:    { scaleX: 0, transformOrigin: "left" },
          hovered: { scaleX: 1, transformOrigin: "left" },
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      />
    </motion.span>
  );

  if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <Link href={href}>{inner}</Link>;
}

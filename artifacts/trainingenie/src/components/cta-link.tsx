/**
 * CtaLink — replaces boring pill buttons with an animated text CTA.
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
  default: { text: "text-foreground hover:text-primary",   bar: "bg-primary" },
  light:   { text: "text-white/90 hover:text-white",        bar: "bg-white" },
  muted:   { text: "text-muted-foreground hover:text-foreground", bar: "bg-foreground" },
};

export function CtaLink({ href, children, variant = "default", className, external }: Props) {
  const { text, bar } = colourMap[variant];

  const inner = (
    <motion.span
      className={cn("group relative inline-flex items-center gap-2 font-semibold select-none cursor-pointer", text, className)}
      whileHover="hovered"
      initial="idle"
    >
      {/* Label */}
      <span className="relative">
        {children}
        {/* sliding underline */}
        <motion.span
          className={cn("absolute -bottom-0.5 left-0 h-px rounded-full", bar)}
          variants={{ idle: { scaleX: 1, transformOrigin: "left" }, hovered: { scaleX: 0, transformOrigin: "right" } }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* re-draw from right on hover */}
        <motion.span
          className={cn("absolute -bottom-0.5 left-0 h-px rounded-full", bar)}
          variants={{ idle: { scaleX: 0, transformOrigin: "right" }, hovered: { scaleX: 1, transformOrigin: "left" } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
        />
      </span>

      {/* Arrow */}
      <motion.span
        className="inline-block leading-none"
        variants={{ idle: { x: 0, y: 0 }, hovered: { x: 3, y: -3 } }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        ↗
      </motion.span>
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <Link href={href}>{inner}</Link>;
}

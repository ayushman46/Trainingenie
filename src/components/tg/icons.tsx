// The site's only glyphs: functional marks drawn on a 16px grid, all decorative (aria-hidden).
// The only glyphs the design allows: arrow, chevron, plus, menu, close, search, phone and copy. No decorative icons.

type GlyphProps = { className?: string };

const glyph = { viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

// In forced colours an SVG keeps the author colour it is given (text-foreground would draw #111 on a
// black High Contrast canvas), so every glyph takes its parent's forced colour there: ButtonText in a
// button, LinkText in a link. It follows the caller's className and, as a variant, outranks its colour.
const forced = "forced-colors:text-inherit";

/** Arrow in one of three directions. Defaults to 16px; size it with a size-* class. */
export function ArrowIcon({ direction = "right", className = "size-4" }: GlyphProps & { direction?: "right" | "down" | "up-right" }) {
  const path = direction === "down" ? "M8 2.5v10.5M4 9l4 4 4-4" : direction === "up-right" ? "M4.5 11.5l7-7M5.75 4.5h5.75v5.75" : "M2.5 8h10.5M9 4l4 4-4 4";
  return <svg {...glyph} strokeWidth={1.35} className={`shrink-0 ${className} ${forced}`}><path d={path} /></svg>;
}

/** Chevron, down by default (rotate it 180deg for "open"); `right` for list rows that lead on (the mobile menu). */
export function ChevronIcon({ direction = "down", className = "size-3.5" }: GlyphProps & { direction?: "down" | "right" }) {
  return <svg {...glyph} strokeWidth={1.4} className={`shrink-0 ${className} ${forced}`}><path d={direction === "right" ? "M6.25 4l4 4-4 4" : "M4 6.25l4 4 4-4"} /></svg>;
}

/** Plus (rotate it 45deg for a close ×). */
export function PlusIcon({ className = "size-4" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.4} className={`shrink-0 ${className} ${forced}`}><path d="M8 2.75v10.5M2.75 8h10.5" /></svg>;
}

/** Two-line menu mark. */
export function MenuIcon({ className = "size-3.5" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.4} className={`shrink-0 ${className} ${forced}`}><path d="M2 5h12M2 11h12" /></svg>;
}

/** Close ×. */
export function CloseIcon({ className = "size-3.5" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.4} className={`shrink-0 ${className} ${forced}`}><path d="M4 4l8 8M12 4l-8 8" /></svg>;
}

/** Search magnifier. */
export function SearchIcon({ className = "size-4" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.5} className={`shrink-0 ${className} ${forced}`}><circle cx="7" cy="7" r="4.75" /><path d="m10.5 10.5 3 3" /></svg>;
}

/** Telephone handset, for call actions (the phone action bar). */
export function PhoneIcon({ className = "size-4" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.35} className={`shrink-0 ${className} ${forced}`}><path d="M5.6 2.25H3.75a1.25 1.25 0 0 0-1.25 1.36A10.5 10.5 0 0 0 12.4 13.5a1.25 1.25 0 0 0 1.35-1.25V10.4a.75.75 0 0 0-.55-.72l-2.1-.6a.75.75 0 0 0-.75.2l-.92.94a8 8 0 0 1-3.55-3.55l.94-.92a.75.75 0 0 0 .2-.75l-.6-2.1a.75.75 0 0 0-.72-.55Z" /></svg>;
}

/** Copy (two overlapping sheets). */
export function CopyIcon({ className = "size-4" }: GlyphProps) {
  return <svg {...glyph} strokeWidth={1.35} className={`shrink-0 ${className} ${forced}`}><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" /></svg>;
}

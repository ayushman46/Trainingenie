import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "outline" | "light";
export type ButtonSize = "md" | "sm";

// No variant has a border at rest, so every pill's outer edge is its painted edge. Forced colours (Windows
// High Contrast) drop backgrounds and shadows, so there a 1.5px border, painted in the system's
// ButtonText, outlines every pill. A label stays on one line from `sm`; below it a long label (or
// enlarged text spacing) wraps inside the pill rather than widening the page. A press shrinks it a touch.
const base = "group/button inline-flex items-center justify-center rounded-full text-center font-medium leading-[1.2] transition-[color,background-color,box-shadow,scale] duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 forced-colors:border-[1.5px] forced-colors:border-solid sm:whitespace-nowrap";
// The secondary edge is an inset shadow rather than a border: it draws at exactly 1.5px in every
// browser (Chrome rounds a 1.5px border down) and stays inside the box, so a secondary pill beside a
// primary one has the same outer size.
const secondaryEdge = "bg-background text-foreground shadow-[inset_0_0_0_1.5px_var(--border-strong)] hover:shadow-[inset_0_0_0_1.5px_var(--foreground)]";
const variants: Record<ButtonVariant, string> = {
  // Black pill, white text.
  primary: "bg-foreground text-background hover:bg-copy",
  // White pill with a 1.5px grey edge that turns ink on hover.
  secondary: secondaryEdge,
  // The same as `secondary` (the v5 name, kept for existing callers).
  outline: secondaryEdge,
  // White pill on the black night band.
  light: "bg-background text-foreground hover:bg-border",
};
const sizes: Record<ButtonSize, string> = {
  // Below 360px a md pill tightens a little, so a long label still fits a 320px screen on one line.
  // A one-line pill is exactly 48px (md) or 40px (sm); a wrapped label grows it.
  md: "min-h-12 gap-2 px-6 py-3 text-[1rem] max-[359px]:px-4 max-[359px]:text-[0.9375rem]",
  sm: "min-h-10 gap-2 px-5 py-2.5 text-[0.9375rem]",
};

/** Class string for a pill button, for markup that cannot use the components below. */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

/** The optional 16px arrow, which moves 3px when its button is hovered. Pills are text-only by default. */
function ButtonArrow() {
  return <ArrowIcon className="size-4 transition-transform duration-200 ease-out group-hover/button:translate-x-[3px]" />;
}

/** mailto:, tel:, external and same-page links render as a plain <a>; site paths use next/link. */
export const isPlainHref = (href: string) => /^(mailto:|tel:|https?:|#)/.test(href);

type ButtonLinkProps = Omit<ComponentProps<"a">, "href" | "className" | "children"> & { href: string; variant?: ButtonVariant; size?: ButtonSize; arrow?: boolean; className?: string; children: ReactNode };

/**
 * A pill link, Nike style: fully rounded, 16px medium text, no arrow unless `arrow` is set.
 * `primary` is black, `secondary` (alias `outline`) white with a grey edge, `light` white on the
 * night band. `md` is 48px tall, `sm` 40px (taller only if a label wraps on a phone).
 */
export function ButtonLink({ href, variant = "primary", size = "md", arrow = false, className = "", children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  const content = <>{children}{arrow && <ButtonArrow />}</>;
  if (isPlainHref(href)) return <a href={href} {...props} className={classes}>{content}</a>;
  return <Link href={href} {...props} className={classes}>{content}</Link>;
}

/** A pill <button> (forms and dialogs), styled like ButtonLink; text-only unless `arrow` is set. */
export function Button({ variant = "primary", size = "md", arrow = false, className = "", type = "button", children, ...props }: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize; arrow?: boolean }) {
  return <button type={type} {...props} className={buttonClasses(variant, size, className)}>{children}{arrow && <ButtonArrow />}</button>;
}

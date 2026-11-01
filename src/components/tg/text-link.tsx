import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { isPlainHref } from "./button";
import { ArrowIcon } from "./icons";

type TextLinkProps = Omit<ComponentProps<"a">, "href" | "className" | "children"> & { href: string; children: ReactNode; external?: boolean; arrow?: "right" | "down" | "none"; size?: "md" | "sm"; tone?: "light" | "night"; prefetch?: boolean | null; className?: string };

/**
 * The "go somewhere" link inside sections, Nike style: medium ink text with a 1px underline, which
 * stays on hover while the colour turns grey. No arrow by default; `arrow="right"` or `"down"` adds
 * one (down for same-page jumps). `external` adds a small ↗, opens a new tab and says so to screen
 * readers. `md` is 16px, `sm` 14px. The invisible ::before pads the hit area to 45px tall without
 * moving the layout. `prefetch` is passed to next/link only (site paths).
 */
export function TextLink({ href, children, external = false, arrow = "none", size = "md", tone = "light", prefetch, className = "", ...props }: TextLinkProps) {
  const colour = tone === "night" ? "text-night-foreground hover:text-night-muted" : "text-foreground hover:text-muted-foreground";
  const classes = `group/text-link relative inline-flex items-center gap-1.5 font-medium underline decoration-1 underline-offset-4 ${size === "sm" ? "text-[0.875rem]" : "text-[1rem]"} ${colour} transition-colors duration-200 ease-out before:absolute before:inset-x-0 before:-inset-y-3 ${className}`;
  const icon = external
    ? <ArrowIcon direction="up-right" className="size-3.5 transition-transform duration-200 ease-out group-hover/text-link:-translate-y-px group-hover/text-link:translate-x-px" />
    : arrow === "none" ? null
    : <ArrowIcon direction={arrow} className={`size-4 transition-transform duration-200 ease-out ${arrow === "down" ? "group-hover/text-link:translate-y-[3px]" : "group-hover/text-link:translate-x-[3px]"}`} />;
  const content = <>{children}{icon}{external && <span className="sr-only"> (opens in a new tab)</span>}</>;
  if (external) return <a href={href} target="_blank" rel="noreferrer" {...props} className={classes}>{content}</a>;
  if (isPlainHref(href)) return <a href={href} {...props} className={classes}>{content}</a>;
  return <Link href={href} prefetch={prefetch} {...props} className={classes}>{content}</Link>;
}

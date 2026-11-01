import type { ReactNode } from "react";

/**
 * A statement under a plain hairline: an optional grey label, a type-h3 title and short body text,
 * with an optional `action` (a TextLink) at mt-6. Used for the landing statements, the "Customized
 * training" note, the methodology columns and the founder principles. Use `as="li"` inside a list.
 */
export function Point({ label, title, children, action, headingLevel = 3, as: Tag = "div", className = "" }: { label?: string; title?: ReactNode; children?: ReactNode; action?: ReactNode; headingLevel?: 3 | 4; as?: "div" | "li"; className?: string }) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  return <Tag className={`border-t border-border pt-6 ${className}`}>
    {label && <p className="type-label text-muted-foreground">{label}</p>}
    {title && <Heading className={`type-h3 text-foreground ${label ? "mt-2" : ""}`}>{title}</Heading>}
    {children && <div className={`type-small text-copy ${label || title ? "mt-2.5" : ""}`}>{children}</div>}
    {action && <div className="mt-6">{action}</div>}
  </Tag>;
}

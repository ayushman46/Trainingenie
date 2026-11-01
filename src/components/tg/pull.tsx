import type { ReactNode } from "react";

/** A short line set large in Geist 500 ("Knowledge. Hands-On. Fun."), with an optional sub-line in body grey. A plain block: no rule or quote bar, as Nike uses none. */
export function Pull({ quote, children, className = "" }: { quote: ReactNode; children?: ReactNode; className?: string }) {
  return <div className={className}>
    <p className="type-pull text-foreground">{quote}</p>
    {children && <p className="mt-3 type-small text-copy">{children}</p>}
  </div>;
}

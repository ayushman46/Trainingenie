import type { ReactNode } from "react";
import { Container } from "@/components/tg/container";
import { listTitleClass } from "@/components/tg/fact-list";
import { Label } from "@/components/tg/label";
import { LinkRows, type LinkRow } from "@/components/tg/programme-list";

/**
 * Pages that sit outside the normal page hero, such as the enquiry confirmation and the 404 page, set
 * like a Nike campaign hero: the visual (the bulb, or a dot-matrix numeral) centred on the white page,
 * with no panel or box around it, then one centred column with the grey label, the h1, a short text
 * and the pills. The visual's area hugs the drawing, so the white above and below it is the drawing's
 * own margin. On phones the pills stack at the full content width, as on every other page.
 * `hideLabel` keeps the label for screen readers only (the 404 page, whose numeral already says it).
 * `after` is optional content below the actions, set left-aligned.
 */
export function StatusState({ visual, label, hideLabel = false, title, children, actions, after }: { visual?: ReactNode; label?: ReactNode; hideLabel?: boolean; title: string; children: ReactNode; actions: ReactNode; after?: ReactNode }) {
  const showLabel = Boolean(label) && !hideLabel;
  return <section aria-labelledby="status-title" className={`bg-background pb-12 md:pb-20 lg:pb-24 ${visual ? "pt-8 sm:pt-10" : ""}`}>
    <Container>
      {/* The visual sets its own size; each page scales it so the h1 and the pills stay in the first view. */}
      {visual && <div className="grid place-items-center">{visual}</div>}
      <div className={`mx-auto max-w-[560px] ${visual ? "mt-8 sm:mt-10" : "pt-16 md:pt-24"}`}>
        <div className="flex flex-col items-center text-center">
          {label && (hideLabel ? <p className="sr-only">{label}</p> : <Label>{label}</Label>)}
          <h1 id="status-title" className={`type-display text-foreground ${showLabel ? "mt-4" : ""}`}>{title}</h1>
          <p className="mt-5 max-w-[44ch] type-lead text-copy">{children}</p>
          <div className="mt-9 flex w-full justify-center gap-3 max-sm:flex-col">{actions}</div>
        </div>
        {after}
      </div>
    </Container>
  </section>;
}

/** A titled list of hairline link rows under the status message: where to go from here. */
export function StatusLinks({ title, links, className = "mt-20" }: { title: string; links: LinkRow[]; className?: string }) {
  return <nav aria-labelledby="status-links" className={className}>
    <h2 id="status-links" className={listTitleClass}>{title}</h2>
    <LinkRows items={links} className="mt-4" />
  </nav>;
}

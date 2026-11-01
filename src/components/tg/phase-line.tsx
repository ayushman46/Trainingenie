import { PHASES } from "@/components/site/areas";
import { UI_LABELS } from "@/data/site-copy";

/**
 * The three phases (Understand, Shape, Deliver) on a dotted grey timeline with small ink dots:
 * across from `md`, down the left on phones (with "Phase n" beside each dot). The dots mask the rule
 * with the section's own background (--section-bg, set by Section). `size="compact"` sets each phase
 * as a list item (17px medium name, 15px line at the column's full measure, like the principles under
 * it) under a section head that already outranks it (the HowItWorks strip); the default (the landing,
 * the methodology) keeps the h3 size.
 */
export function PhaseLine({ headingLevel = 3, size = "default", className = "" }: { headingLevel?: 3 | 4; size?: "default" | "compact"; className?: string }) {
  const compact = size === "compact";
  const Heading = headingLevel === 4 ? "h4" : "h3";
  // The rule runs from the first dot to the last: the third column starts (100% - 2 gaps) / 3 from the right.
  return <div className={className}><div className="relative">
    <div aria-hidden="true" className="dot-rule-x pointer-events-none absolute left-2 right-[calc((100%_-_5rem)/3_-_8px)] top-[7px] hidden h-[3px] md:block" />
    <ol className="relative grid md:grid-cols-3 md:gap-10">
      {PHASES.map((phase, index) => <li key={phase.name} className="relative pb-9 pl-8 last:pb-0 md:pb-0 md:pl-0">
        {index < PHASES.length - 1 && <span aria-hidden="true" className="dot-rule-y absolute bottom-0 left-[7px] top-[17px] w-[3px] md:hidden" />}
        <span aria-hidden="true" className="absolute left-0 top-0 grid size-[17px] place-items-center rounded-full bg-[var(--section-bg,var(--background))] md:relative">
          <span className="size-[9px] rounded-full bg-foreground" />
        </span>
        <p className="type-label font-normal leading-[17px] tabular-nums text-muted-foreground md:hidden">{UI_LABELS.phase} {index + 1}</p>
        <Heading className={`mt-2 text-foreground md:mt-6 ${compact ? "type-item" : "type-h3"}`}>{phase.name}</Heading>
        <p className={`text-copy ${compact ? "mt-1.5 max-w-measure type-ui" : "mt-2.5 max-w-[32ch] type-small"}`}>{phase.line}</p>
      </li>)}
    </ol>
  </div></div>;
}

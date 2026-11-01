import type { ReactNode } from "react";
import { lowerFirst } from "@/components/catalogue/utils";
import { Disclosure } from "@/components/kit/disclosure";
import { PHASES } from "@/components/site/areas";
import { UI_LABELS } from "@/data/site-copy";

type Phase = (typeof PHASES)[number];

const STEPS = PHASES.flatMap((phase) => phase.steps);

// A step's number, set on its title's baseline, and its title and text: shared by both views.
const stepRow = "grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline md:grid-cols-[2.25rem_minmax(0,1fr)]";
const stepNumber = "type-caption tabular-nums text-muted-foreground";
const stepTitle = "type-item text-foreground";
const stepText = "max-w-measure type-ui text-copy";

/** "Steps 1 and 2", "Step 3", "Steps 4 to 6": the step numbers a phase covers. */
export function stepRange(steps: Phase["steps"]) {
  const first = Number(steps[0][0]);
  const last = Number(steps[steps.length - 1][0]);
  if (first === last) return `Step ${first}`;
  return last - first === 1 ? `Steps ${first} and ${last}` : `Steps ${first} to ${last}`;
}

/** The anchor id of a phase block: "understand", "shape", "deliver". */
export const phaseId = (name: string) => name.toLowerCase();

/**
 * The six-step method as three open chapters, one per phase, each opened by a hairline. On the left
 * sit "Phase 1 · Steps 1 and 2", the phase name and its line; on the right, the phase's steps with
 * a plain grey number on the title's baseline, the title and the text (no red: Nike keeps colour
 * for imagery). `worksWith` maps a step number ("01") to what it works with,
 * shown under the step as a comma list. Each phase carries its anchor id (#understand, #shape,
 * #deliver). The list has no closing rule, so the caller can follow it with its own ruled line.
 * Phones tighten the rhythm (32px phase padding, 20px between steps, a narrower number column) so the
 * six steps do not run to several screens; from `md` the spacing opens up.
 * Phase names are h3 and step titles h4 by default; `headingLevel={4}` shifts both down one level.
 */
export function MethodSteps({ worksWith, headingLevel = 3, className = "" }: { worksWith?: Record<string, string[]>; headingLevel?: 3 | 4; className?: string }) {
  const PhaseHeading = headingLevel === 4 ? "h4" : "h3";
  const StepHeading = headingLevel === 4 ? "h5" : "h4";
  return <ol className={className}>
    {PHASES.map((phase, index) => <li key={phase.name} id={phaseId(phase.name)} className="grid gap-y-5 border-t border-border py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-x-12 md:gap-y-6 md:py-10">
      <div>
        <p className="type-label text-muted-foreground">
          {UI_LABELS.phase} {index + 1}
          <span aria-hidden="true" className="mx-2 text-border-strong">·</span><span className="sr-only">, </span>
          {stepRange(phase.steps)}
        </p>
        <PhaseHeading className="mt-3 type-row text-foreground">{phase.name}</PhaseHeading>
        <p className="mt-3 max-w-[34ch] type-small text-copy">{phase.line}</p>
      </div>
      <ol className="space-y-5 md:space-y-7 md:pt-8">
        {phase.steps.map(([number, title, text]) => {
          const tags = worksWith?.[number] ?? [];
          return <li key={number} className={`${stepRow} gap-x-2 md:gap-x-3`}>
            <span aria-hidden="true" className={stepNumber}>{number}</span>
            <div>
              <StepHeading className={stepTitle}><span className="sr-only">{UI_LABELS.step} {Number(number)}: </span>{title}</StepHeading>
              <p className={`mt-1.5 ${stepText}`}>{text}</p>
              {tags.length > 0 && <p className="mt-2 type-label text-muted-foreground"><span className="text-copy">Works with:</span> {tags.map((tag, tagIndex) => tagIndex ? lowerFirst(tag) : tag).join(", ")}</p>}
            </div>
          </li>;
        })}
      </ol>
    </li>)}
  </ol>;
}

/**
 * Every step of the method, closed by default behind the site's one disclosure row ("See all 6
 * steps"). For pages that show the three phases on their own (PhaseLine) and keep the detail one tap
 * away. Each step is a grey number on its title's baseline, the title and the text, in two columns
 * from `md`. The steps carry no anchor ids (those stay on MethodSteps, which a page may show as well).
 * Only the top rule is drawn: what follows opens with its own, so two rules never stack.
 * `summaryClassName` is passed to the disclosure row, for a caller that shares the row with other content;
 * `before` opens the disclosure's content, above the steps (the HowItWorks strip folds its phases there on phones).
 */
export function MethodStepsDisclosure({ before, className = "", summaryClassName = "" }: { before?: ReactNode; className?: string; summaryClassName?: string }) {
  return <Disclosure title={<span>See all {STEPS.length} steps</span>} className={`border-b-0 ${className}`} summaryClassName={summaryClassName}>
    {before}
    <ol className="grid gap-y-5 py-6 md:grid-cols-2 md:gap-x-10 md:gap-y-6">
      {STEPS.map(([number, title, text]) => <li key={number} className={stepRow}>
        <span aria-hidden="true" className={stepNumber}>{number}</span>
        <div>
          <p className={stepTitle}><span className="sr-only">{UI_LABELS.step} {Number(number)}: </span>{title}</p>
          <p className={`mt-1 ${stepText}`}>{text}</p>
        </div>
      </li>)}
    </ol>
  </Disclosure>;
}

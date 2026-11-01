import Link from "next/link";
import type { ReactNode } from "react";
import { EmblemDots } from "@/components/brand/emblem-dots";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { capitalise, type Programme } from "@/components/catalogue/utils";
import { COURSE_DETAILS } from "@/data";
import { ButtonLink } from "./button";

/**
 * An area's one focused programme, shown in full rather than as a single tile (Technology →
 * ReactJS, Leadership → Design Thinking), laid out like a Nike product page across the full width.
 * On the left, a third of the row (the size of a tile in a row of three), the programme's emblem on a
 * square grey panel: a link to the programme page, named by the heading beside it. On the right the
 * programme's name as the heading, its description, who it is for and the key topics, then what
 * participants learn, each block under a plain hairline. A pill row closes it: `children` (the black
 * enquiry pill) first, then "See the programme" (a white pill), stacked on phones. The row is a
 * `data-cta-zone`, so the phone action bar steps aside while it is on screen. `aside` (the customized
 * option) sits under the panel in the left column, so its rule is exactly the panel's width. Below `md`
 * everything stacks: panel, details, aside, and the panel is 4:3 so the name is not pushed below a
 * screen of grey. Two columns on tablets.
 */
export function ProgrammeFeature({ programme, headingLevel = 3, aside, className = "", children }: { programme: Programme; headingLevel?: 3 | 4; aside?: ReactNode; className?: string; children?: ReactNode }) {
  const outcomes = COURSE_DETAILS[programme.slug]?.outcomes ?? [];
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const headingId = `${programme.slug}-feature-heading`;
  // Row 1 is the panel's height; the details span both rows, and any extra height goes to row 2, so the aside sits right under the panel.
  return <div className={`grid gap-y-8 md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-1 lg:grid-cols-3 ${className}`}>
    <Link href={`/${programme.slug}`} aria-labelledby={headingId} className="group/tile block focus-visible:outline-offset-4 md:col-start-1 md:row-start-1">
      <div className="grid aspect-[4/3] place-items-center overflow-hidden bg-tint md:aspect-square">
        <EmblemDots name={EMBLEM_BY_PATH[`/${programme.slug}`]} className="w-[52%] md:w-[68%]" />
      </div>
    </Link>
    <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:pl-8 lg:col-span-2 lg:pl-12">
      <Heading id={headingId} className="type-h3 text-foreground">{programme.title}</Heading>
      <p className="mt-3 max-w-measure type-body text-copy">{programme.description}</p>
      <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-border pt-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <dt className="type-label text-muted-foreground">Who it is for</dt>
          <dd className="mt-1.5 type-ui text-foreground">{programme.audience}</dd>
        </div>
        <div>
          <dt className="type-label text-muted-foreground">Key topics</dt>
          <dd className="mt-1.5 type-ui text-foreground">{capitalise(programme.topics.join(", "))}</dd>
        </div>
      </dl>
      {outcomes.length > 0 && <div className="mt-8 border-t border-border pt-6">
        <p className="type-label text-muted-foreground">What participants learn</p>
        <ol className="mt-3 space-y-2.5">
          {outcomes.map((outcome, index) => <li key={outcome} className="flex items-baseline gap-4 type-ui text-copy">
            <span aria-hidden="true" className="w-5 shrink-0 type-caption tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span>{outcome}</span>
          </li>)}
        </ol>
      </div>}
      <div data-cta-zone className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {children}
        <ButtonLink href={`/${programme.slug}`} variant="secondary">See the programme<span className="sr-only">: {programme.title}</span></ButtonLink>
      </div>
    </div>
    {aside && <div className="mt-6 md:col-start-1 md:row-start-2">{aside}</div>}
  </div>;
}

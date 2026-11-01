import Link from "next/link";
import { AREAS, type Area } from "@/components/site/areas";
import { UI_LABELS } from "@/data/site-copy";
import { ArrowIcon } from "./icons";

/**
 * The training areas as a full-width index: each row is one link with the title (underlined on
 * hover and on keyboard focus), the description, the topic count and an arrow (nudged right on both). `descriptionKey` picks `area.intro`
 * (default) or the catalogue's `area.description`; `includes` adds the "Includes …" line of sample
 * topics. For the visual version of the same index, use MediaTile.
 */
export function AreaRows({ areas = AREAS, includes = false, descriptionKey = "intro", headingLevel = 3, className = "" }: { areas?: Area[]; includes?: boolean; descriptionKey?: "intro" | "description"; headingLevel?: 2 | 3; className?: string }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return <ol className={`border-t border-border ${className}`}>
    {areas.map((area) => <li key={area.slug}>
      <Link href={area.href} className="group/row grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-3 border-b border-border py-7 focus-visible:rounded-none lg:grid-cols-12 lg:gap-x-10 lg:py-9">
        <Heading className="type-row text-foreground decoration-[1.5px] underline-offset-[6px] group-hover/row:underline group-focus-visible/row:underline lg:col-span-6">{area.title}</Heading>
        <div className="col-start-1 row-start-2 lg:col-span-4 lg:col-start-auto lg:row-start-auto">
          <p className="max-w-[46ch] type-small text-copy">{area[descriptionKey]}</p>
          {includes && <p className="mt-3 type-caption text-copy"><span className="text-muted-foreground">{UI_LABELS.includes} </span>{area.sample.join(", ")}</p>}
        </div>
        <span className="col-start-2 row-start-1 flex items-center gap-4 justify-self-end type-label font-normal tabular-nums text-muted-foreground lg:col-span-2 lg:col-start-auto lg:row-start-auto">
          <span className="hidden sm:inline">{area.topics} topics</span>
          <ArrowIcon className="size-5 text-foreground transition-transform duration-200 group-hover/row:translate-x-[3px] group-focus-visible/row:translate-x-[3px]" />
        </span>
      </Link>
    </li>)}
  </ol>;
}

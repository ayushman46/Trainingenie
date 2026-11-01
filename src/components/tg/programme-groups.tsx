import type { ReactNode } from "react";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { AREAS } from "@/components/site/areas";
import { MediaTile } from "./media-tile";
import { TileCells } from "./programme-rows";

/**
 * Every focused programme page as a wall of Nike media tiles, in catalogue order (grouped by training
 * area): each programme's emblem on a square grey panel, with its title and its area's short name
 * under it, one link per tile. It is the catalogue's single listing of the programmes. Four across
 * from `lg` and three on tablets. `extra` (the customized tile) is not a programme, so it sits outside
 * the list but in the same grid, as one more tile: the eighth of two rows of four from `lg`, beside the
 * last tile on tablets. On phones each programme is a compact row (its panel beside its title and
 * area), as the area pages' programme rows, and `extra` is the last row in the same format.
 */
export function ProgrammeGroups({ extra, headingLevel = 3, className = "" }: { extra?: ReactNode; headingLevel?: 3 | 4; className?: string }) {
  const programmes = AREAS.flatMap((area) => area.programmes.map((course) => ({ ...course, area: area.short })));
  return <TileCells label="Focused programmes" md={3} lg={4} phone="rows" extra={extra} className={className}>
    {programmes.map((course) => <MediaTile key={course.slug} aspect="square" layout="row" href={`/${course.slug}`} emblem={EMBLEM_BY_PATH[`/${course.slug}`]}
      title={<span className="block md:pr-4">{course.title}</span>} subtitle={course.area} headingLevel={headingLevel} />)}
  </TileCells>;
}

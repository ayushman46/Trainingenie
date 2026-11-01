import { lowerFirst } from "@/components/catalogue/utils";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { programmeArea } from "@/components/site/areas";
import { MediaTile, MediaTileGrid } from "./media-tile";

type RelatedProgramme = { slug: string; title: string; pillar: string; description: string; audience: string };

// Two local adjustments to the shared MediaTile, for tiles that carry several lines of copy (focus
// keeps MediaTile's own ring, as every other tile does):
// - Text inset: the panels are 4px apart (as on Nike), but the description and "For …" lines are long
//   enough to fill the tile's width, so neighbouring lines would read as one sentence. The text block
//   (the tile's last child) keeps 24px clear on the right, so lines from neighbouring tiles are at
//   least 28px apart. The panels themselves keep the 4px gap. Below `md` the tiles are compact rows
//   with nothing beside them, so the inset applies from `md` only.
// - Phone rows: below `md` the "For …" audience line (the second detail line) is hidden, so each row is
//   the emblem, title, area and description. It stays in the DOM and shows from `md`.
const tileClass = "md:[&>div:last-child]:pr-6 max-md:[&_p[data-tile-detail]+p[data-tile-detail]]:hidden";

/**
 * Related programmes as a row of three Nike product tiles: each programme's dot-matrix emblem on a
 * flat 3:2 grey panel (a cross-sell row, so it never outweighs the page above it), then its title,
 * the area's short name in grey (the "category" line), the description and "For …" (the
 * audience). Each tile is one link, named by the title and the area;
 * the description is its accessible description. The audience line is grey like the description,
 * so the tile reads title, then everything else: it is the least important line, not the darkest.
 *
 * Three across from `md` (the grid's own `columns={3}` drops to two on tablets, which would leave
 * the third tile alone on a row); below `md` the compact row layout (`phone="list"`), so every title
 * and line reads in full on a phone instead of a half-cut sideways rail.
 */
export function RelatedProgrammes({ items, className = "" }: { items: RelatedProgramme[]; className?: string }) {
  return <MediaTileGrid columns={3} phone="list" className={`md:!grid-cols-3 ${className}`}>
    {items.map((item) => {
      const href = `/${item.slug}`;
      return <MediaTile key={item.slug} href={href} aspect="wide" emblem={EMBLEM_BY_PATH[href]} title={item.title} subtitle={programmeArea(item.pillar)} meta={item.description} note={<span className="text-muted-foreground">For {lowerFirst(item.audience)}</span>} className={tileClass} />;
    })}
  </MediaTileGrid>;
}

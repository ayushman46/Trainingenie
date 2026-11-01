import { AREAS, type Area } from "@/components/site/areas";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { UI_LABELS } from "@/data/site-copy";
import { MediaTile, MediaTileGrid } from "./media-tile";

/**
 * The four training areas as Nike-style media tiles (What we do, "Kinds of training"): each a grey
 * panel with the area's dot-matrix emblem, then the area name, "15 topics", the area's intro and the
 * "Includes …" line (the label grey, the topics it names in body grey, as they wrap). The panels are 4:3 in the 2-up grid (square ones grow to 443px there and dwarf
 * the landing's and the catalogue's tile rows) and square on phones. Two columns at every width, as
 * the catalogue's phone grid: the four areas read as one 2 by 2 block on phones and desktop alike, with
 * nothing cut off at the screen edge (the page's content column is 9 of 12 from `lg`, so four across
 * would leave the text a 220px sliver). Below `md` the grid shows the name and topic count only; the
 * intro and "Includes …" lines stay in the markup (the intro remains the link's description).
 * Each tile is one link, named by the area and its topic count, with the intro as its description.
 * `className` goes on a plain wrapper, so it is safe for margins and other spacing.
 */
export function AreaTiles({ areas = AREAS, headingLevel = 3, className = "" }: { areas?: Area[]; headingLevel?: 3 | 4; className?: string }) {
  return <div className={className}>
    <MediaTileGrid columns={2} phone={2} label="Training areas">
      {areas.map((area) => <MediaTile
        key={area.slug}
        href={area.href}
        emblem={EMBLEM_BY_PATH[area.href]}
        aspect="landscape"
        headingLevel={headingLevel}
        title={area.title}
        subtitle={`${area.topics} topics`}
        meta={area.intro}
        note={<><span className="text-muted-foreground">{UI_LABELS.includes} </span><span className="text-copy">{area.sample.join(", ")}</span></>}
      />)}
    </MediaTileGrid>
  </div>;
}

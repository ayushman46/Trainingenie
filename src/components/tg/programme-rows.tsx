import { Children, isValidElement, type ReactNode } from "react";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { capitalise, lowerFirst, type Programme } from "@/components/catalogue/utils";
import { MediaTile } from "./media-tile";

// Every class written out in full, so Tailwind sees it.
const mdColumns = { 2: "md:grid-cols-2", 3: "md:grid-cols-3" } as const;
const lgColumns = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;
// Below md: two tiles across, or one compact row per tile between hairlines, exactly as MediaTileGrid's
// `phone={2}` and `phone="list"`, so these tiles match the other tile rows on the same page.
// In the two-up grid the list dissolves at every width, so `extra` shares the phone grid too, as one
// full-width row under the tiles. In rows, `extra` is one more row: the list's bottom rule separates
// it from the last tile and its own bottom rule closes the list, so there is one hairline between rows.
const phoneLists = {
  grid2: { wrapper: "grid grid-cols-2 gap-x-1 gap-y-8 md:gap-y-10", list: "contents", item: "min-w-0", extra: "max-md:col-span-2 max-md:mt-2" },
  rows: { wrapper: "md:grid md:gap-x-1 md:gap-y-10", list: "grid grid-cols-1 divide-y divide-border border-y border-border md:contents md:divide-y-0", item: "min-w-0 py-5 md:py-0", extra: "border-b border-border py-5 md:border-0 md:py-0" },
} as const;

/**
 * A row (or wall) of MediaTiles with an optional closing cell. Below `md` the tiles never scroll
 * sideways: `phone="grid2"` sets them two across, with `extra` as one full-width row under them;
 * `"rows"` sets one compact row per tile between hairlines (pair it with MediaTile's `layout="row"`),
 * with `extra` as the last row. From `md` the list dissolves (display: contents; `role="list"` keeps
 * it a list for assistive technology) so the tiles and `extra` share one grid: `extra` sits outside
 * the list and takes exactly one cell, like a tile. `md` and `lg` are the column counts.
 */
export function TileCells({ label, md, lg, phone, extra, className = "", children }: { label: string; md: 2 | 3; lg: 2 | 3 | 4; phone: "grid2" | "rows"; extra?: ReactNode; className?: string; children: ReactNode }) {
  const tiles = Children.toArray(children).filter(isValidElement);
  const layout = phoneLists[phone];
  return <div className={`${layout.wrapper} ${mdColumns[md]} ${lgColumns[lg]} ${className}`}>
    <ul role="list" aria-label={label} className={layout.list}>
      {tiles.map((tile, index) => <li key={tile.key ?? index} className={layout.item}>{tile}</li>)}
    </ul>
    {extra && <div className={`min-w-0 ${layout.extra}`}>{extra}</div>}
  </div>;
}

/**
 * The customized option as a tile of its own, closing a row or wall of programme tiles: the method's
 * emblem on the grey panel, "Customized training" and the one sentence under it, linking to how it
 * works on the same page. A square tile from `md`; below it a full-width compact row (its panel beside
 * its lines), so the sentence never sets in a half-width column.
 */
export function CustomizedTile() {
  return <MediaTile aspect="square" layout="row" href="#approach" emblem="methodology" title="Customized training"
    meta={<>TraininGenie specializes in <span className="whitespace-nowrap">need-based</span> customized training, and standard offerings can be <span className="whitespace-nowrap">fine-tuned</span> to specific requirements.</>} />;
}

/**
 * An area's focused programmes as a row of Nike media tiles (for areas with more than one programme),
 * across the full width like the other rows of tiles: each programme's dot-matrix emblem on a square
 * grey panel, its title under the panel, the description as the tile's grey third line, and the key
 * topics (and who the programme is for, unless the page lists the audiences elsewhere) as its last
 * line. Each tile is one link to the programme page. The text under a tile keeps a right gutter, so
 * the lines of neighbouring tiles never read across as one.
 *
 * `extra` (the customized tile) is the row's last cell: two programmes and the tile make a row of
 * three (from `md`), three programmes and the tile a row of four from `lg` and two by two on tablets.
 * On phones each programme is a compact row (its panel beside its title, its lines under both), as the
 * "Other training areas" below, and the tile is the last row.
 */
export function ProgrammeRows({ items, showAudience = true, extra, className = "" }: { items: Programme[]; showAudience?: boolean; extra?: ReactNode; className?: string }) {
  const cells = items.length + (extra ? 1 : 0);
  const lg = cells >= 4 ? 4 : cells === 3 ? 3 : 2;
  return <TileCells label="Focused programmes" md={cells % 3 === 0 ? 3 : 2} lg={lg} phone="rows" extra={extra} className={className}>
    {items.map((programme) => <MediaTile key={programme.slug} aspect="square" href={`/${programme.slug}`} emblem={EMBLEM_BY_PATH[`/${programme.slug}`]} layout="row"
      title={<span className="block md:pr-4">{programme.title}</span>}
      meta={<span className="block md:pr-5">{programme.description}</span>}
      note={<>
        <span className="block md:pr-5"><span className="font-medium text-foreground">Key topics </span>{capitalise(programme.topics.join(", "))}</span>
        {showAudience && <span className="mt-1 block md:pr-5"><span className="font-medium text-foreground">For </span>{lowerFirst(programme.audience)}</span>}
      </>} />)}
  </TileCells>;
}

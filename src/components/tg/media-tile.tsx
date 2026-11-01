import Link from "next/link";
import { Children, cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { EmblemDots } from "@/components/brand/emblem-dots";
import type { EmblemName } from "@/components/brand/emblems";

export type MediaTileAspect = "portrait" | "square" | "landscape" | "wide";

// The panel's proportion and the emblem's width within it: about 56% of a square panel's width is
// drawing; the flatter panels shrink the emblem so it keeps the same share of the panel's height.
const panels: Record<MediaTileAspect, { panel: string; emblem: string }> = {
  portrait: { panel: "aspect-square md:aspect-[4/5]", emblem: "w-[68%]" },
  square: { panel: "aspect-square", emblem: "w-[68%]" },
  landscape: { panel: "aspect-square md:aspect-[4/3]", emblem: "w-[68%] md:w-[52%]" },
  wide: { panel: "aspect-square md:aspect-[3/2]", emblem: "w-[68%] md:w-[44%]" },
};

export type MediaTileProps = {
  /** Where the tile leads. The whole tile is one link. */
  href: string;
  /** The tile's name (17px medium ink; 15px in a phone grid), rendered as a heading at `headingLevel`. */
  title: ReactNode;
  /** The second line (15px grey; 14px in a phone grid), e.g. "15 topics". */
  subtitle?: ReactNode;
  /** An optional third line (14px copy grey, wraps), e.g. the area's one-line description. Hidden in a 2-up phone grid. */
  meta?: ReactNode;
  /** An optional last line (14px copy grey, wraps), e.g. "Includes Cloud Computing, Azure, …"; a caller greys a one-line lead-in itself. Hidden in a 2-up phone grid. */
  note?: ReactNode;
  /** The dot-matrix emblem shown on the panel (see EMBLEM_BY_PATH in brand/emblems). */
  emblem: EmblemName;
  headingLevel?: 2 | 3 | 4;
  /**
   * The panel's proportion. Every option is square on phones.
   * - `portrait` (default): 4:5 from md.
   * - `square`: square everywhere (the landing's choice, and the better one for 4-up rows: 4:5 panels leave a lot of empty grey).
   * - `landscape`: 4:3 from md, for 2-up grids, where square panels grow too large.
   * - `wide`: 3:2 from md, a flatter 2-up panel for an overview that should read at a glance.
   */
  aspect?: MediaTileAspect;
  /**
   * `tile` (default) is the panel with the text under it. `row` (set by MediaTileGrid's `phone="list"`)
   * is, below `md`, a compact row: a 96px panel with every line (title, subtitle, meta, note) in one
   * column beside it, so the text keeps a single left edge. From `md` a row renders exactly as a tile.
   */
  layout?: "tile" | "row";
  /**
   * Set by MediaTileGrid on a single-row grid of 3 or 4. From `lg` the tile is then a four-row subgrid
   * of the row, so the panels, the title and subtitle, the meta and the note each start on one line
   * across the row, however the titles wrap.
   */
  align?: boolean;
  className?: string;
};

/**
 * Nike's product tile: a square-cornered #f5f5f5 panel holding a centred dot-matrix emblem (the SVG
 * at 68% of a square panel's width, so the drawing itself fills about 56%), with the title in ink and
 * the subtitle in grey and the optional `meta` and `note` lines in body-copy grey under it. The whole tile is one link; on
 * hover or keyboard focus the title underlines and the emblem's glass dots warm up, like the bulb
 * switching on. The focus ring sits 1px outside the tile, inside the 4px gap, and draws above the
 * neighbouring tile.
 *
 * Accessible name: the link is named by the title and subtitle only ("Technology Training 15 topics"),
 * through aria-labelledby, and `meta` is its description (aria-describedby); `note` stays readable in
 * the page but is not announced with the link. The emblem is decorative (aria-hidden). Place tiles in
 * a MediaTileGrid. Never put them on a `tint` band: the panels would vanish.
 */
export function MediaTile({ href, title, subtitle, meta, note, emblem, headingLevel = 3, aspect = "portrait", layout = "tile", align = false, className = "" }: MediaTileProps) {
  const Heading = headingLevel === 2 ? "h2" : headingLevel === 4 ? "h4" : "h3";
  const id = useId();
  const titleId = `${id}-title`, subtitleId = `${id}-subtitle`, metaId = `${id}-meta`;
  const row = layout === "row";
  // In a row, below md, the text wrapper is the second grid column: every line sits beside the panel,
  // centred on it while the text is shorter and starting at its top edge when it is taller. From md it
  // is the tile's text block. Aligned (from lg), the tile spans the grid's four row tracks (panel,
  // title, meta, note) and the text wrapper the last three, itself a subgrid so it keeps its padding
  // (and any inset a caller gives it); the meta and note keep their own tracks even when a line is absent.
  return <Link href={href} aria-labelledby={subtitle ? `${titleId} ${subtitleId}` : titleId} aria-describedby={meta ? metaId : undefined} className={`group/tile relative block focus-visible:z-10 focus-visible:outline-offset-1 ${row ? "max-md:grid max-md:grid-cols-[6rem_minmax(0,1fr)] max-md:items-start max-md:gap-x-4" : ""} ${align ? "lg:grid lg:row-span-4 lg:grid-rows-subgrid lg:gap-y-0" : ""} ${className}`}>
    <div className={`grid place-items-center overflow-hidden bg-tint ${panels[aspect].panel} ${row ? "max-md:size-24" : ""}`}>
      <EmblemDots name={emblem} className={`${panels[aspect].emblem} ${row ? "max-md:w-[78%]" : ""}`} />
    </div>
    <div className={`${row ? "max-md:self-center md:pr-4 md:pt-3.5" : "pr-2 pt-3 md:pr-4 md:pt-3.5"} ${align ? "lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-0" : ""}`}>
      <div>
        <Heading id={titleId} className={`${row ? "text-[1.0625rem]" : "text-[0.9375rem] md:text-[1.0625rem]"} text-balance font-medium leading-[1.35] tracking-[-0.005em] text-foreground decoration-1 underline-offset-4 group-hover/tile:underline group-focus-visible/tile:underline`}>{title}</Heading>
        {subtitle && <p id={subtitleId} className={`mt-0.5 ${row ? "text-[0.9375rem]" : "text-[0.875rem] md:text-[0.9375rem]"} leading-[1.45] text-muted-foreground`}>{subtitle}</p>}
      </div>
      {meta && <p id={metaId} data-tile-detail className={`mt-1.5 max-w-[42ch] type-caption text-copy md:mt-2 ${row ? "max-md:max-w-none" : ""} ${align ? "lg:row-start-2" : ""}`}>{meta}</p>}
      {note && <p data-tile-detail className={`mt-1 max-w-[42ch] type-caption text-copy ${row ? "max-md:max-w-none" : ""} ${align ? "lg:row-start-3" : ""}`}>{note}</p>}
    </div>
  </Link>;
}

const desktopColumns = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;
const phoneLayouts = {
  1: "grid grid-cols-1 gap-y-10",
  // Two up on phones, with only the title and subtitle under each panel: the meta and note lines stay
  // in the DOM (the meta is still the link's description) but are hidden below md, so a phone grid
  // never turns into a wall of small grey text.
  2: "grid grid-cols-2 gap-y-8 max-md:[&_[data-tile-detail]]:hidden",
  // Below md one compact row per tile (a 96px panel with every line beside it) between hairlines;
  // from md the grid.
  list: "grid grid-cols-1 divide-y divide-border border-y border-border md:divide-y-0 md:border-0 md:gap-y-10",
} as const;

const itemClasses: Record<keyof typeof phoneLayouts, string | undefined> = { 1: undefined, 2: undefined, list: "py-5 md:py-0" };

/**
 * A row or grid of MediaTiles, Nike style: 4px between panels, the text under each. `columns`
 * (2, 3 or 4) applies from `lg` (3 and 4 drop to 2 on tablets). `phone` sets the layout below `md`:
 * 2 (default: two columns, title and subtitle only), 1 (one column), or `"list"` (compact rows
 * between hairlines, every line in full). Each child is wrapped in an <li>; pass `label` to name the
 * list for assistive technology. A single row of 3 or 4 tiles aligns its lines from `lg` (MediaTile's
 * `align`): each <li> is a subgrid of the row, so the row gap is 0 there and the tracks sit flush.
 */
export function MediaTileGrid({ columns = 4, phone = 2, label, className = "", children }: { columns?: 2 | 3 | 4; phone?: 1 | 2 | "list"; label?: string; className?: string; children: ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  const align = columns > 2 && items.length <= columns && items.every((child) => child.type === MediaTile);
  return <ul aria-label={label} className={`gap-x-1 ${phoneLayouts[phone]} ${desktopColumns[columns]} ${align ? "lg:gap-y-0" : ""} ${className}`}>
    {items.map((child, index) => <li key={child.key ?? index} className={`${itemClasses[phone] ?? ""} ${align ? "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0" : ""}`.trim() || undefined}>
      {child.type === MediaTile ? cloneElement(child as ReactElement<MediaTileProps>, phone === "list" ? { layout: "row", align } : { align }) : child}
    </li>)}
  </ul>;
}

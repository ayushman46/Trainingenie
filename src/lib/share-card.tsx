/* eslint-disable @next/next/no-img-element -- the card is drawn by satori (next/og), which takes plain <img>; next/image does not apply */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BULB_ASPECT, BULB_POINTS } from "@/components/brand/bulb-points";
import { emblemPoints, type EmblemName } from "@/components/brand/emblems";
import { COMPANY_NAME, SITE_URL } from "@/data";

// The site's palette: ink and muted text on white. Only the drawing carries the bulb's grey glass and
// red, so red appears in the brand marks alone, as on the site.
const INK = "#111111";
const MUTED = "#6b6b6d";
const GLASS = "#d9d9db";
const RED = "#9e2a2b";
// 88px padding, the 640px text column, then the art centred in the remaining 384px.
const TEXT_WIDTH = 640;
const ART_WIDTH = 340;

export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

/**
 * Dot art for the card's right-hand column: points [x, y, part] in a `width` x `height` box, `cell`
 * apart. Parts follow the bulb: -1 = glass, 0 = ink outline, 1 or more = red.
 */
export type ShareArt = { points: readonly (readonly [number, number, number])[]; width: number; height: number; cell: number };

/** The TraininGenie bulb, dot for dot as on the landing page (its points are 1/95 apart). */
export const BULB_ART: ShareArt = { points: BULB_POINTS, width: 1, height: BULB_ASPECT, cell: 1 / 95 };

/** A page's emblem, a little coarser than on the site so its dots still read in a small link preview. */
export function emblemArt(name: EmblemName, columns = 44): ShareArt {
  return { points: emblemPoints(name, columns).points, width: 100, height: 100, cell: 100 / columns };
}

// The art as an SVG data URI: one path per colour, each dot a zero-length round-capped segment (as in
// EmblemDots), at the landing bulb's proportions (glass dots smaller than the outline's). A cell of
// margin keeps the edge dots whole.
function artSource(art: ShareArt) {
  const scale = 1000 / art.width, cell = art.cell * scale, height = art.height * scale;
  const dots = (match: (part: number) => boolean, color: string, size: number) => {
    const d = art.points.filter(([, , part]) => match(part)).map(([x, y]) => `M${(x * scale).toFixed(1)} ${(y * scale).toFixed(1)}h0`).join("");
    return `<path d="${d}" stroke="${color}" stroke-width="${(cell * size).toFixed(2)}"/>`;
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-cell} ${-cell} ${1000 + 2 * cell} ${height + 2 * cell}" fill="none" stroke-linecap="round">${dots((part) => part === -1, GLASS, 0.64)}${dots((part) => part === 0, INK, 0.8)}${dots((part) => part > 0, RED, 0.8)}</svg>`;
  return { src: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`, height: Math.round((ART_WIDTH * (height + 2 * cell)) / (1000 + 2 * cell)) };
}

// Satori spaces words by their unkerned widths but draws each word kerned, so a word with tight pairs
// ("Te", "Co") leaves a wider gap after it. Geist's four-per-em space is exactly as wide as its space
// and still a line-break opportunity, but satori does not end a drawn run at it, so each line is drawn
// as one kerned run and every gap comes out the same.
const tidy = (text: string) => text.trim().split(/\s+/).join(" ");

/**
 * The 1200 x 630 link preview (opengraph-image and twitter-image): the wordmark at the top, then an
 * optional eyebrow, the title and an optional line, the page's address at the foot, and the dot-matrix
 * art on the right (the bulb unless the page has its own). Set in the Geist Regular that next/og
 * bundles, so nothing is fetched while the image renders.
 */
export async function renderShareCard({ eyebrow, title, line, path, art = BULB_ART }: { eyebrow?: string; title: string; line?: string; path: string; art?: ShareArt }) {
  const logo = await readFile(join(process.cwd(), "public/logo_icon.png"));
  const drawing = artSource(art);
  // A sentence-long title (the landing's) is set a size down, so it stays within three lines.
  const titleSize = title.length > 40 ? 56 : 64;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 88, background: "#ffffff", color: INK }}>
      <div style={{ width: TEXT_WIDTH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={50} height={44} alt="" />
          <div style={{ fontSize: 30, letterSpacing: -0.6 }}>{COMPANY_NAME}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && <div style={{ marginBottom: 18, fontSize: 24, color: MUTED }}>{tidy(eyebrow)}</div>}
          <div style={{ fontSize: titleSize, lineHeight: 1.05, letterSpacing: titleSize * -0.025, textWrap: "balance" }}>{tidy(title)}</div>
          {line && <div style={{ marginTop: 24, fontSize: 26, lineHeight: 1.35, color: MUTED, textWrap: "balance" }}>{tidy(line)}</div>}
        </div>
        <div style={{ fontSize: 24, color: MUTED }}>{`${SITE_URL.replace(/^https?:\/\//, "")}${path}`}</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={drawing.src} width={ART_WIDTH} height={drawing.height} alt="" />
      </div>
    </div>,
    SHARE_CARD_SIZE,
  );
}

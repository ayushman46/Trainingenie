import { emblemPoints, type EmblemName } from "./emblems";

// One path per colour, each dot a zero-length round-capped segment, which keeps the markup small.
function path(points: readonly (readonly number[])[]) {
  return points.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0`).join("");
}

/**
 * A dot-matrix emblem as a static SVG: the "product shot" inside a MediaTile. Ink outline, grey
 * glass and bulb-red accents (colours from the `.emblem-*` rules in globals.css). The glass switches
 * on (turns warm) while a surrounding `group`, `group/link`, `group/card` or `group/tile` is hovered
 * or focused, like the bulb on the landing page. Decorative: always aria-hidden.
 * `columns` is the lattice resolution across the 100-unit box (more columns, finer dots).
 */
export function EmblemDots({ name, columns = 40, tone = "light", className = "" }: { name: EmblemName; columns?: number; tone?: "light" | "night"; className?: string }) {
  const { points } = emblemPoints(name, columns);
  const cell = 100 / columns;
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" fill="none" strokeLinecap="round" className={`emblem-dots ${tone === "night" ? "emblem-night" : ""} ${className}`}>
    <path className="emblem-glass" d={path(points.filter((point) => point[2] === -1))} strokeWidth={cell * 0.56} />
    <path className="emblem-ink" d={path(points.filter((point) => point[2] === 0))} strokeWidth={cell * 0.7} />
    <path className="emblem-accent" d={path(points.filter((point) => point[2] > 0))} strokeWidth={cell * 0.7} />
  </svg>;
}

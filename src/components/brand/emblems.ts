// Page emblems: small line drawings set as dots on the same kind of lattice as the TraininGenie bulb,
// so every page shares the logo's dot-matrix look. Each is drawn in a 100 x 100 box (y down) from
// strokes and fills, then rasterised on demand at any resolution.
//
// Parts follow the bulb: 0 = ink outline, -1 = soft checkerboard fill (the bulb's glass), and
// 1 or more = red accents, each of which twinkles on its own phase like the bulb's rays.

export type EmblemPoint = readonly [x: number, y: number, part: number];
export type EmblemName =
  | "corporate" | "technology" | "leadership" | "frameworks" | "iso" | "methodology"
  | "about" | "founder" | "clients" | "past" | "faqs" | "contact" | "blog" | "privacy" | "thanks" | "notfound"
  | "itil" | "prince2" | "scrum" | "iso27001" | "iso9001" | "design" | "reactjs";

type Pt = readonly [number, number];
type Layer = { part: number; width: number; paths: Pt[][]; fills: Pt[][] };

const W = 3.4; // default stroke width, about two to three dots at full resolution

const rad = (deg: number) => (deg * Math.PI) / 180;
const arc = (cx: number, cy: number, r: number, from: number, to: number, ry = r): Pt[] => {
  // About one segment per 1.5 units of arc length: smooth at full resolution, cheap to test against.
  const steps = Math.max(8, Math.ceil((Math.abs(to - from) / 360) * 2 * Math.PI * Math.max(r, ry) / 1.5));
  return Array.from({ length: steps + 1 }, (_, i) => { const a = rad(from + ((to - from) * i) / steps); return [cx + Math.cos(a) * r, cy + Math.sin(a) * ry] as const; });
};
const circle = (cx: number, cy: number, r: number) => arc(cx, cy, r, 0, 360);
const rect = (x: number, y: number, w: number, h: number, r = 0): Pt[] => r > 0
  ? [...arc(x + w - r, y + r, r, -90, 0), ...arc(x + w - r, y + h - r, r, 0, 90), ...arc(x + r, y + h - r, r, 90, 180), ...arc(x + r, y + r, r, 180, 270), [x + w - r, y]]
  : [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
const line = (x1: number, y1: number, x2: number, y2: number): Pt[] => [[x1, y1], [x2, y2]];
const poly = (...points: Pt[]): Pt[] => points;
const bezier = (p0: Pt, p1: Pt, p2: Pt, p3: Pt): Pt[] => Array.from({ length: 25 }, (_, i) => {
  const t = i / 24, u = 1 - t;
  return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]] as const;
});
// A two-stroke arrowhead whose tip points along `direction` (degrees, 0 = right, 90 = down).
const head = (tip: Pt, direction: number, length = 8, spread = 34): Pt[] => [
  [tip[0] - Math.cos(rad(direction - spread)) * length, tip[1] - Math.sin(rad(direction - spread)) * length], tip,
  [tip[0] - Math.cos(rad(direction + spread)) * length, tip[1] - Math.sin(rad(direction + spread)) * length],
];
const ray = (cx: number, cy: number, angle: number, from: number, to: number): Pt[] => line(cx + Math.cos(rad(angle)) * from, cy + Math.sin(rad(angle)) * from, cx + Math.cos(rad(angle)) * to, cy + Math.sin(rad(angle)) * to);

const stroke = (part: number, width: number, ...paths: Pt[][]): Layer => ({ part, width, paths, fills: [] });
const fill = (part: number, ...fills: Pt[][]): Layer => ({ part, width: 0, paths: [], fills });

const shield = [
  ...bezier([50, 10], [60, 17], [72, 20], [82, 20]), [82, 46],
  ...bezier([82, 46], [82, 70], [66, 84], [50, 92]),
  ...bezier([50, 92], [34, 84], [18, 70], [18, 46]), [18, 20],
  ...bezier([18, 20], [28, 20], [40, 17], [50, 10]),
] as Pt[];
const mirror = (points: Pt[]): Pt[] => points.map(([x, y]) => [100 - x, y] as const);
const bookPage = [[50, 30], ...bezier([50, 30], [38, 22], [22, 22], [10, 26]), [10, 78], ...bezier([10, 78], [22, 74], [38, 74], [50, 82]), [50, 30]] as Pt[];
const hexagon = [-90, -30, 30, 90, 150, 210].map((angle) => [50 + Math.cos(rad(angle)) * 32, 52 + Math.sin(rad(angle)) * 32] as const);
const shorten = (a: Pt, b: Pt, by: number): Pt[] => {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / length, uy = (b[1] - a[1]) / length;
  return [[a[0] + ux * by, a[1] + uy * by], [b[0] - ux * by, b[1] - uy * by]];
};
const star = (cx: number, cy: number, outer: number, inner: number, points: number): Pt[] => Array.from({ length: points * 2 + 1 }, (_, i) => {
  const r = i % 2 ? inner : outer, a = rad(-90 + (180 / points) * i);
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
});

// Layers are listed front to back: where layers overlap, the first one listed wins.
const DRAWINGS: Record<EmblemName, () => Layer[]> = {
  // A presentation board with three rising bars.
  corporate: () => [
    fill(1, rect(26, 45, 9, 11)), fill(2, rect(40, 36, 9, 20)), fill(3, rect(54, 26, 9, 30)),
    stroke(0, W, rect(14, 14, 72, 48, 3), line(50, 62, 32, 90), line(50, 62, 68, 90), line(50, 62, 50, 84)),
    fill(-1, rect(17, 17, 66, 42)),
  ],
  // A chip with code brackets on the die.
  technology: () => [
    stroke(1, 4.2, poly([42, 39], [34, 50], [42, 61])), stroke(2, 4.2, line(54, 37, 46, 63)), stroke(3, 4.2, poly([58, 39], [66, 50], [58, 61])),
    stroke(0, W, rect(24, 24, 52, 52, 5), ...[34, 45, 55, 66].flatMap((p) => [line(p, 11, p, 24), line(p, 76, p, 89), line(11, p, 24, p), line(76, p, 89, p)])),
    fill(-1, rect(28, 28, 44, 44)),
  ],
  // Three people; the one in front has the bulb's rays.
  leadership: () => [
    stroke(1, 4.4, ray(50, 34, -150, 15, 22)), stroke(2, 4.4, ray(50, 34, -90, 15, 22)), stroke(3, 4.4, ray(50, 34, -30, 15, 22)),
    stroke(0, W, circle(50, 34, 9.5), arc(50, 84, 18, 180, 360, 26), circle(19, 50, 7), arc(19, 84, 11, 180, 360, 17), circle(81, 50, 7), arc(81, 84, 11, 180, 360, 17)),
    fill(-1, circle(50, 34, 8), [...arc(50, 84, 16, 180, 360, 24), [66, 84]]),
  ],
  // A continual-improvement cycle of four arrows, one in red.
  frameworks: () => [
    stroke(1, W, arc(50, 50, 33, -76, -14), head([50 + Math.cos(rad(-14)) * 33, 50 + Math.sin(rad(-14)) * 33], 76)),
    stroke(0, W, ...[0, 90, 180].flatMap((a) => [arc(50, 50, 33, a + 14, a + 76), head([50 + Math.cos(rad(a + 76)) * 33, 50 + Math.sin(rad(a + 76)) * 33], a + 166)])),
    fill(-1, circle(50, 50, 20)),
  ],
  // A shield with a tick.
  iso: () => [
    stroke(1, 5.6, poly([34, 51], [45, 63], [67, 37])),
    stroke(0, W, shield),
    fill(-1, shield),
  ],
  // A switchback route with six stops; the destination in red.
  methodology: () => [
    fill(1, circle(86, 18, 6.5)),
    fill(0, ...[[14, 82], [44, 82], [82, 66], [50, 50], [18, 34], [54, 18]].map(([x, y]) => circle(x, y, 4.6))),
    stroke(-1, 9, [[10, 82], [66, 82], ...arc(66, 66, 16, 90, -90), [34, 50], ...arc(34, 34, 16, 90, 270), [86, 18]]),
  ],
  // A red sun rising behind a range of peaks: transcend beyond growth.
  about: () => [
    fill(1, circle(76, 17, 9)),
    stroke(0, W, poly([4, 82], [36, 22], [54, 52], [68, 35], [96, 82]), line(2, 82, 98, 82)),
    stroke(0, 2.6, poly([26.4, 40], [31, 45], [36, 40], [41.5, 45], [46.8, 40])),
    fill(-1, poly([4, 82], [36, 22], [54, 52], [68, 35], [96, 82])),
  ],
  // The founder's monogram; light comes out of the C.
  founder: () => [
    stroke(1, 4.4, ray(65, 51, -32, 26, 32)), stroke(2, 4.4, ray(65, 51, 0, 26, 33)), stroke(3, 4.4, ray(65, 51, 32, 26, 32)),
    stroke(0, 5.2, poly([4, 71], [4, 31], [20, 55], [36, 31], [36, 71]), arc(65, 51, 20, 45, 315)),
  ],
  // A skyline of organizations; one flies the flag.
  clients: () => [
    fill(1, poly([43, 7], [56, 10.5], [43, 14])),
    stroke(0, W, line(6, 88, 94, 88), poly([12, 88], [12, 52], [28, 52], [28, 88]), poly([33, 88], [33, 24], [53, 24], [53, 88]), poly([58, 88], [58, 42], [72, 42], [72, 88]), poly([77, 88], [77, 60], [90, 60], [90, 88])),
    stroke(0, 2.6, line(43, 24, 43, 9)),
    fill(-1, rect(15, 55, 10, 31), rect(36, 27, 14, 59), rect(61, 45, 8, 41), rect(80, 63, 7, 23)),
  ],
  // A calendar with marked days.
  past: () => [
    ...[1, 4, 7, 8, 12, 17].map((day, i) => fill(1 + (i % 3), rect(19 + (day % 5) * 14, 43 + Math.floor(day / 5) * 11, 6, 6))),
    stroke(0, W, rect(12, 20, 76, 68, 4), line(12, 36, 88, 36)),
    stroke(0, 4.6, line(32, 11, 32, 26), line(68, 11, 68, 26)),
    fill(-1, ...Array.from({ length: 20 }, (_, day) => rect(19 + (day % 5) * 14, 43 + Math.floor(day / 5) * 11, 6, 6))),
  ],
  // A question mark in a ring.
  faqs: () => [
    fill(1, circle(50, 78, 5.2)),
    stroke(0, 6, [...arc(50, 36, 15, 195, 400), [50, 57], [50, 64]]),
    stroke(0, W, circle(50, 50, 42)),
    fill(-1, circle(50, 50, 38)),
  ],
  // An envelope with a red seal.
  contact: () => [
    fill(1, circle(50, 56, 7)),
    stroke(0, W, rect(10, 24, 80, 54, 3), poly([10, 26], [50, 56], [90, 26])),
    fill(-1, rect(13, 27, 74, 48)),
  ],
  // An open book with a ribbon.
  blog: () => [
    fill(1, poly([60, 16], [68, 16], [68, 42], [64, 37.5], [60, 42])),
    stroke(0, W, bookPage, mirror(bookPage)),
    fill(-1, bookPage, mirror(bookPage)),
  ],
  // A padlock with a red keyhole.
  privacy: () => [
    fill(1, circle(50, 63, 5.5), poly([47, 65], [53, 65], [54.5, 77], [45.5, 77])),
    stroke(0, 5, [[34, 49], [34, 40], ...arc(50, 40, 16, 180, 360), [66, 40], [66, 49]]),
    stroke(0, W, rect(22, 48, 56, 40, 5)),
    fill(-1, rect(25, 51, 50, 34)),
  ],
  // A tick in a ring, with the bulb's rays.
  thanks: () => [
    stroke(1, 6, poly([31, 55], [43, 67], [65, 41])),
    stroke(2, 4.4, ray(46, 54, -80, 40, 48)), stroke(3, 4.4, ray(46, 54, -50, 40, 48)), stroke(4, 4.4, ray(46, 54, -20, 40, 48)),
    stroke(0, W, circle(46, 54, 32)),
    fill(-1, circle(46, 54, 28)),
  ],
  // A compass: find your way back.
  notfound: () => [
    fill(1, poly([50, 22], [57, 50], [43, 50])),
    fill(0, poly([43, 50], [57, 50], [50, 78])),
    stroke(0, W, circle(50, 50, 38), line(50, 14, 50, 20), line(86, 50, 80, 50), line(50, 86, 50, 80), line(14, 50, 20, 50)),
    fill(-1, circle(50, 50, 34)),
  ],
  // ITIL 4: the six activities of the service value chain around value.
  itil: () => [
    fill(1, circle(50, 52, 8)),
    stroke(0, W, ...hexagon.map((p) => circle(p[0], p[1], 7))),
    stroke(0, 2.8, ...hexagon.map((p, i) => shorten(p, hexagon[(i + 1) % 6], 9.5))),
    fill(-1, ...hexagon.map((p) => circle(p[0], p[1], 5.4))),
  ],
  // PRINCE2: a staged plan with milestones.
  prince2: () => [
    fill(1, poly([64, 32], [69, 37], [64, 42], [59, 37])), fill(2, poly([86, 64], [91, 69], [86, 74], [81, 69])),
    stroke(0, W, poly([10, 10], [10, 88], [92, 88])),
    stroke(0, 2.8, rect(16, 16, 30, 10, 2), rect(26, 32, 30, 10, 2), rect(38, 48, 30, 10, 2), rect(50, 64, 28, 10, 2)),
    fill(-1, rect(18, 18, 26, 6), rect(28, 34, 26, 6), rect(40, 50, 26, 6), rect(52, 66, 24, 6)),
  ],
  // Scrum: a backlog feeding a sprint loop that produces an increment.
  scrum: () => [
    fill(1, rect(84, 42, 12, 14)),
    fill(0, rect(4, 37, 20, 4.5), rect(4, 47, 20, 4.5), rect(4, 57, 20, 4.5)),
    stroke(0, 4, arc(55, 49, 19, -40, 270), head([55, 30], 0, 8)),
    stroke(0, 2.8, line(27, 49, 33, 49), line(76, 49, 82, 49)),
    fill(-1, circle(55, 49, 13)),
  ],
  // ISO 27001: a shield with a keyhole.
  iso27001: () => [
    fill(1, circle(50, 45, 6.5), poly([46, 48], [54, 48], [56, 66], [44, 66])),
    stroke(0, W, shield),
    fill(-1, shield),
  ],
  // ISO 9001: a quality rosette with ribbons.
  iso9001: () => [
    stroke(0, 2.8, star(50, 40, 34, 29.5, 16), circle(50, 40, 22)),
    fill(-1, circle(50, 40, 19)),
    fill(1, poly([37, 62], [47, 67], [42, 95], [37, 88], [30, 92])), fill(2, poly([63, 62], [53, 67], [58, 95], [63, 88], [70, 92])),
  ],
  // Design thinking: the double diamond.
  design: () => [
    fill(1, circle(8, 50, 4.6)), fill(2, circle(50, 50, 6)), fill(3, circle(92, 50, 4.6)),
    stroke(0, W, poly([8, 50], [29, 27], [50, 50], [29, 73], [8, 50]), poly([50, 50], [71, 27], [92, 50], [71, 73], [50, 50])),
    fill(-1, poly([8, 50], [29, 27], [50, 50], [29, 73]), poly([50, 50], [71, 27], [92, 50], [71, 73])),
  ],
  // ReactJS: a tree of components.
  reactjs: () => [
    fill(1, rect(38, 10, 24, 14, 3)),
    stroke(0, 2.8, rect(14, 42, 26, 14, 3), rect(60, 42, 26, 14, 3), rect(4, 74, 20, 12, 3), rect(28, 74, 20, 12, 3), rect(52, 74, 20, 12, 3), rect(76, 74, 20, 12, 3)),
    stroke(0, 2.6, line(50, 24, 50, 33), line(27, 33, 73, 33), line(27, 33, 27, 42), line(73, 33, 73, 42), line(27, 56, 27, 65), line(14, 65, 38, 65), line(14, 65, 14, 74), line(38, 65, 38, 74), line(73, 56, 73, 65), line(62, 65, 84, 65), line(62, 65, 62, 74), line(84, 65, 84, 74)),
    fill(-1, rect(16, 44, 22, 10), rect(62, 44, 22, 10), rect(6, 76, 16, 8), rect(30, 76, 16, 8), rect(54, 76, 16, 8), rect(78, 76, 16, 8)),
  ],
};

function distanceToSegment(px: number, py: number, a: Pt, b: Pt) {
  const dx = b[0] - a[0], dy = b[1] - a[1], lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / lengthSquared)) : 0;
  return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy));
}

// Where a horizontal line at y crosses a polygon's edges, sorted: a point on that line is inside
// when an odd number of crossings lie to its left.
function crossings(polygon: Pt[], y: number) {
  const xs: number[] = [];
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j];
    if ((yi > y) !== (yj > y)) xs.push(xi + ((y - yi) * (xj - xi)) / (yj - yi));
  }
  return xs.sort((a, b) => a - b);
}

type Segment = readonly [Pt, Pt];
type Prepared = { part: number; half: number; segments: Segment[]; fills: Pt[][] };
const prepare = (layer: Layer, minHalf: number): Prepared => ({
  part: layer.part,
  half: Math.max(layer.width / 2, minHalf),
  segments: layer.paths.flatMap((path) => path.slice(1).map((point, i) => [path[i], point] as const)),
  fills: layer.fills,
});

export type Emblem = { points: EmblemPoint[]; columns: number; accents: number };
const cache = new Map<string, Emblem>();

/**
 * The emblem as lattice dots: `columns` cells across the 100-unit box, each point in box units.
 * Soft fills keep every other cell, like the bulb's glass. Results are cached per resolution.
 */
export function emblemPoints(name: EmblemName, columns = 78): Emblem {
  const key = `${name}:${columns}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const cell = 100 / columns;
  const layers = DRAWINGS[name]().map((layer) => prepare(layer, cell * 0.72));
  const points: EmblemPoint[] = [];
  // Rasterised a row at a time: only the segments near the row and the fills' crossings with it
  // are considered, which keeps the full-resolution emblems to a few milliseconds.
  for (let row = 0; row < columns; row++) {
    const py = (row + 0.5) * cell;
    const near = layers.map((layer) => ({
      part: layer.part, half: layer.half,
      segments: layer.segments.filter(([a, b]) => Math.min(a[1], b[1]) - layer.half <= py && Math.max(a[1], b[1]) + layer.half >= py),
      spans: layer.fills.map((polygon) => crossings(polygon, py)).filter((xs) => xs.length > 0),
    }));
    for (let col = 0; col < columns; col++) {
      const px = (col + 0.5) * cell;
      for (const layer of near) {
        const onStroke = layer.segments.some(([a, b]) => distanceToSegment(px, py, a, b) <= layer.half);
        const inFill = !onStroke && layer.spans.some((xs) => { let left = 0; for (const x of xs) if (x < px) left++; return left % 2 === 1; });
        if (!onStroke && !inFill) continue;
        if (layer.part === -1 && (row + col) % 2) break;
        points.push([px, py, layer.part]);
        break;
      }
    }
  }
  const emblem = { points, columns, accents: Math.max(0, ...layers.map((layer) => layer.part)) };
  cache.set(key, emblem);
  return emblem;
}

/** The emblem for each page, by path. Focused programme pages use their own; areas use theirs. */
export const EMBLEM_BY_PATH: Record<string, EmblemName> = {
  "/corporate-training-services": "corporate",
  "/technology-training": "technology",
  "/leadership-soft-skills-training": "leadership",
  "/itil-prince2-agile-training": "frameworks",
  "/iso-standards-training": "iso",
  "/training-methodology": "methodology",
  "/about-us": "about",
  "/our-team": "founder",
  "/clients-and-testimonials": "clients",
  "/past-trainings": "past",
  "/faqs": "faqs",
  "/contact-us": "contact",
  "/blog": "blog",
  "/privacy-policy": "privacy",
  "/thank-you": "thanks",
  "/itil-4-foundation-training": "itil",
  "/prince2-training": "prince2",
  "/scrum-agile-training": "scrum",
  "/iso-27001-training": "iso27001",
  "/iso-9001-training": "iso9001",
  "/design-thinking-workshop": "design",
  "/reactjs-training": "reactjs",
};

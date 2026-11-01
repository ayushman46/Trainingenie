import Image from "next/image";
import type { CSSProperties } from "react";
import { CLIENT_REFERENCES, type ClientReference } from "@/data";

// Per-logo tuning: the intrinsic file size (for next/image), the strip height in px, the resting
// opacity and an optical scale. The heights balance the logos' outlines; the opacities are measured
// from a 2x screenshot: each mark's darkest tone is at least 3:1 on white (about 3.2:1 for HDFC's
// solid box, 4-7:1 for the thinner marks), so none drops out and none outweighs the rest. `scale`
// then evens out the optical weight inside the same fixed box: the solid, heavy marks (Alcon) step
// down and the thin, light ones (metricstream, Subex, Essentra) step up, so the wall reads as one
// even row. `inline` replaces it in the small hero row, where TeamLease's square file leaves the mark
// tiny. Colgate's file has a solid blue box, so its resting filter inverts it to a light mark.
const LOGOS: Record<string, { width: number; height: number; strip: number; opacity: number; scale?: number; inline?: number; filter?: string }> = {
  "/client-logos/subex.png": { width: 442, height: 150, strip: 38, opacity: 0.7, scale: 1.1 },
  "/client-logos/hdfc-home-loans.png": { width: 806, height: 426, strip: 38, opacity: 0.48, inline: 1.1 },
  "/client-logos/harman.png": { width: 810, height: 436, strip: 56, opacity: 0.9 },
  "/client-logos/teamlease.png": { width: 360, height: 360, strip: 66, opacity: 0.65, inline: 1.2 },
  "/client-logos/metricstream.png": { width: 978, height: 228, strip: 30, opacity: 0.65, scale: 1.08 },
  "/client-logos/alcon.png": { width: 1024, height: 356, strip: 27, opacity: 0.62, scale: 0.8 },
  "/client-logos/colgate-palmolive.png": { width: 982, height: 390, strip: 36, opacity: 0.52, filter: "grayscale(1) invert(1) contrast(3) brightness(1.15)" },
  "/client-logos/essentra.png": { width: 952, height: 320, strip: 34, opacity: 0.7, scale: 1.1 },
  "/client-logos/247-ai.png": { width: 802, height: 366, strip: 32, opacity: 0.6 },
  "/client-logos/akshaya-patra.png": { width: 910, height: 406, strip: 46, opacity: 0.7 },
  "/client-logos/iquanti.png": { width: 952, height: 298, strip: 30, opacity: 0.8 },
};
const DEFAULT_LOGO: (typeof LOGOS)[string] = { width: 240, height: 96, strip: 36, opacity: 0.7 };
// The widest mark renders about 130px wide (captioned, desktop) and about 105px on phones, so the
// browser picks a 256w or 384w file instead of the 1080w / 2048w default.
const LOGO_SIZES = "(min-width: 640px) 160px, 120px";

/**
 * One logo, greyscale and faded at rest, full colour on hover where hover exists. The filter and
 * opacity sit on the image itself: on a parent they would isolate the multiply blend that keeps
 * white logo backgrounds from showing as boxes. In forced colours (high contrast) each logo shows as
 * its own file, unfaded and unblended on a white backing, since multiplied onto a dark Canvas, or
 * drawn there with a transparent background (Subex, TeamLease), it would vanish. Phones
 * show the strip at 0.9× height; `inline` (the hero row, which is already small) keeps the same
 * height on phones and takes each logo's `inline` scale. `sizes` and `loading` pass through to next/image (the hero row loads its small
 * logos eagerly, at 80px).
 */
function Logo({ client, scale, inline = false, sizes = LOGO_SIZES, loading }: { client: ClientReference; scale: number; inline?: boolean; sizes?: string; loading?: "eager" | "lazy" }) {
  // NTT DATA, the one text tile, at 0.85× the size it first had, so its solid caps weigh the same as the marks.
  if (!client.logo) return <span className={`font-semibold tracking-[-0.01em] text-[rgb(17_17_17/0.6)] transition-colors duration-300 [@media(hover:hover)]:group-hover/logo:text-[#174a8b] ${scale > 1 ? "text-[15px] sm:text-[19px]" : scale < 1 ? "text-[12px]" : "text-[13px] sm:text-[16px]"}`}>{client.name}</span>;
  const logo = LOGOS[client.logo] ?? DEFAULT_LOGO;
  const optical = (inline ? logo.inline : undefined) ?? logo.scale ?? 1;
  const style = { "--logo-h": `${Math.round(logo.strip * scale * optical)}px`, "--logo-o": logo.opacity, "--logo-filter": "filter" in logo && logo.filter ? logo.filter : "grayscale(1) contrast(1.05)" } as CSSProperties;
  return <Image src={client.logo} alt={client.name} width={logo.width} height={logo.height} sizes={sizes} loading={loading} style={style} className={`${inline ? "h-[var(--logo-h)]" : "h-[calc(var(--logo-h)*0.9)] sm:h-[var(--logo-h)]"} w-auto max-w-full object-contain opacity-[var(--logo-o)] mix-blend-multiply transition-[opacity,filter] duration-300 [filter:var(--logo-filter)] [@media(hover:hover)]:group-hover/logo:opacity-100 [@media(hover:hover)]:group-hover/logo:[filter:none] forced-colors:bg-white forced-colors:opacity-100 forced-colors:mix-blend-normal forced-colors:[filter:none] forced-colors:[forced-color-adjust:none]`} />;
}

/**
 * The client references. `strip` (landing): all 12 logos, six to a row on desktop and three on
 * phones. `captioned` (Clients page): each logo at 1.15× under a hairline, captioned with its name
 * (the caption stays invisible for NTT DATA, which is already text). `inline`: one wrapping row of
 * the passed clients at 0.8× strip height, with no captions (the hero proof rows, see ClientProof,
 * loaded eagerly so they do not pop in after the first paint). It stays 0.8× from lg too: at 1×
 * the five hero logos wrap in the landing hero's column at 1024.
 */
export function LogoWall({ variant, clients = CLIENT_REFERENCES, className = "" }: { variant: "strip" | "captioned" | "inline"; clients?: ClientReference[]; className?: string }) {
  if (variant === "captioned") return <ul className={`grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
    {clients.map((client) => <li key={client.name} className="group/logo flex flex-col items-center gap-4 border-t border-border pt-8">
      <div className="flex h-[70px] w-full items-center justify-center"><Logo client={client} scale={1.15} /></div>
      <p aria-hidden="true" className={`type-caption text-muted-foreground ${client.logo ? "" : "invisible"}`}>{client.name}</p>
    </li>)}
  </ul>;
  if (variant === "inline") return <ul className={`flex flex-wrap items-center gap-x-3.5 gap-y-3 min-[375px]:gap-x-5 sm:gap-x-6 ${className}`}>
    {clients.map((client) => <li key={client.name} className="group/logo flex h-11 items-center"><Logo client={client} scale={0.8} inline loading="eager" sizes="80px" /></li>)}
  </ul>;
  return <ul className={`grid grid-cols-3 items-center gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-6 lg:gap-x-14 lg:gap-y-12 ${className}`}>
    {clients.map((client) => <li key={client.name} className="group/logo flex h-12 items-center justify-center sm:h-14"><Logo client={client} scale={1} /></li>)}
  </ul>;
}

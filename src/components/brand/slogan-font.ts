import { Archivo } from "next/font/google";

/**
 * The campaign face: Archivo with its width axis, set heavy and condensed (wdth 62, weight 800) by
 * the `type-slogan` utility, in the spirit of Nike's condensed Futura. Used only for the landing slogan.
 *
 * It lives in its own module, imported only by src/app/page.tsx, so next/font preloads the file
 * (about 90KB, latin) on "/" alone instead of on every route. Apply `sloganFont.variable` to the
 * element that wraps the slogan (the landing hero <section>); `type-slogan` reads `--font-archivo`
 * there and falls back to a condensed system face anywhere it is unset.
 *
 * `adjustFontFallback: false` stops next/font putting a size-adjusted, normal-width Arial ahead of
 * the fallbacks, so until Archivo arrives the slogan renders in a condensed system face (Arial
 * Narrow, Roboto Condensed on Android, Bahnschrift on Windows) and keeps roughly its final width.
 * The slogan is one line from lg (it never wraps there), so its line count, and the hero's height,
 * do not change there when the font swaps in.
 */
export const sloganFont = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Roboto Condensed", "Bahnschrift", "sans-serif-condensed", "Helvetica Neue", "sans-serif"],
});

import { Geist } from "next/font/google";

// The site's typeface: a plain, neutral grotesque in the Helvetica tradition (the stand-in for
// nike.com's Helvetica Now), used for display and text alike. Variable and self-hosted by next/font,
// so the production CSP (font-src 'self') holds.
//
// The condensed campaign face (Archivo, for the landing slogan only) is NOT loaded here: this module
// is imported by the root layout, so anything in it is preloaded on every route. It lives in
// src/components/brand/slogan-font.ts, which only the landing page imports.
export const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });

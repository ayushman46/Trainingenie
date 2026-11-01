import type { MetadataRoute } from "next";
import { COMPANY_DESCRIPTION, COMPANY_NAME } from "@/data";

// For "Add to Home screen": the site opens in the browser as it is, on the page's white (--background,
// and the viewport's themeColor). The icons are the bulb of src/app/icon.svg, the 512px one rendered
// from it with its transparent background, for launchers that need a bitmap.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_NAME,
    short_name: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

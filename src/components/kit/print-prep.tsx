"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ClientOnly } from "@/components/utility/client-only";
import { COMPANY_NAME, SITE_URL } from "@/data";

/**
 * The print layer's two client pieces (the rules are under @media print in globals.css). A one-line
 * masthead shown on paper only, naming the brand and the page's address, since the header does not
 * print. And every closed <details> opens for printing, then closes again afterwards: Chromium prints
 * closed disclosures open through ::details-content, but Safari and Firefox print only their summary.
 * Mounted once in the root layout, before the header.
 */
export function PrintPrep() {
  const pathname = usePathname();

  useEffect(() => {
    let opened: HTMLDetailsElement[] = [];
    const before = () => {
      opened = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
      opened.forEach((details) => { details.open = true; });
    };
    const after = () => {
      opened.forEach((details) => { details.open = false; });
      opened = [];
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => { window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);

  // The page's path is added in the browser: the not-found page is prerendered once, at /_not-found, and
  // served for every missing path, so a server-rendered path would not match the address being printed.
  return <div className="mb-6 hidden border-b border-border pb-3 type-caption text-muted-foreground print:block">
    {COMPANY_NAME} · {SITE_URL.replace(/^https?:\/\//, "")}<ClientOnly>{pathname === "/" ? "" : pathname}</ClientOnly>
  </div>;
}

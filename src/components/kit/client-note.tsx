"use client";

import { usePathname } from "next/navigation";
import { CLIENT_DISCLAIMER, COURSES, TRAINING_PILLARS } from "@/data";

// The pages that show client logos: the landing's logo row, the Clients page's wall, and every page
// with a ClientProof row (the enquiry page, What we do, the catalogue, the four training areas and
// every programme page). Main showed the note only beside the logos, so it does not follow a visitor
// to the pages without them. The area paths are built from TRAINING_PILLARS, as AREAS builds its
// hrefs, so this client component does not pull in the areas module.
const LOGO_PAGES = new Set([
  "/",
  "/clients-and-testimonials",
  "/contact-us",
  "/what-we-do",
  "/corporate-training-services",
  ...TRAINING_PILLARS.map((pillar) => `/${pillar.slug}`),
  ...COURSES.map((course) => `/${course.slug}`),
]);

/** The client references note in the footer's legal lines, shown only on the pages with client logos. */
export function ClientNote() {
  const pathname = usePathname();
  return LOGO_PAGES.has(pathname) ? <p>{CLIENT_DISCLAIMER}</p> : null;
}

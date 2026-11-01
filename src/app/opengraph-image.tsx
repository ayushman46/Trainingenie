import { COMPANY_NAME } from "@/data";
import { LANDING_HERO } from "@/data/site-copy";
import { renderShareCard, SHARE_CARD_SIZE } from "@/lib/share-card";

export const alt = `${COMPANY_NAME}, corporate training and professional learning in India`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

// The site's card, for every page without one of its own: the landing hero's lead over the training areas.
export default function OpengraphImage() {
  return renderShareCard({ title: LANDING_HERO.lead, line: "Technology · Leadership · ITIL · Agile · ISO and GRC", path: "" });
}

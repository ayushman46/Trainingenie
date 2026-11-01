import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { areaBySlug } from "@/components/site/areas";
import { COMPANY_NAME } from "@/data";
import { emblemArt, renderShareCard, SHARE_CARD_SIZE } from "@/lib/share-card";

const title = "Technology Training";
export const alt = `${title}, ${COMPANY_NAME}`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

// The area's own card: its title over the area's catalogue line, with its emblem as the art.
export default function OpengraphImage() {
  return renderShareCard({ eyebrow: "Training area", title, line: areaBySlug("technology-training").description, path: "/technology-training", art: emblemArt(EMBLEM_BY_PATH["/technology-training"]) });
}

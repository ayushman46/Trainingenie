import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { COMPANY_NAME, COURSES } from "@/data";
import { emblemArt, renderShareCard, SHARE_CARD_SIZE } from "@/lib/share-card";

export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

// Each programme shares its own card. Its alt names the programme, which a static `alt` export cannot,
// so the card's metadata is generated (one card, id "card"); any other slug has none, and so a 404.
// The params are guarded: the build may call this without them.
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const course = COURSES.find((item) => item.slug === params?.slug);
  return course ? [{ id: "card", alt: `${course.title}, ${COMPANY_NAME}`, size, contentType }] : [];
}

// The programme's training area over its title, who it is for beneath, and its emblem as the art.
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES.find((item) => item.slug === slug);
  if (!course) return new Response(null, { status: 404 });
  const emblem = EMBLEM_BY_PATH[`/${course.slug}`];
  return renderShareCard({ eyebrow: course.pillar, title: course.title, line: course.audience, path: `/${course.slug}`, art: emblem ? emblemArt(emblem) : undefined });
}

import { BEHAVIORAL_GROUPS, COURSES, FRAMEWORK_GROUPS, ISO_GROUPS, TECHNOLOGY_GROUPS, TRAINING_PILLARS } from "@/data";

export type TopicGroup = { title: string; items: string[] };
export type Programme = { slug: string; title: string; description: string; audience: string; topics: string[] };

export const countTopics = (groups: TopicGroup[]) => groups.reduce((total, group) => total + group.items.length, 0);
export const plural = (count: number, one: string, many = `${one}s`) => `${count} ${count === 1 ? one : many}`;
export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
// Leaves acronyms alone: "Quality teams" -> "quality teams", but "IT service teams" stays as written.
export const lowerFirst = (text: string) => (/^[A-Z][a-z]/.test(text) ? text.charAt(0).toLowerCase() + text.slice(1) : text);

/**
 * The focused programme pages that belong to a training area, in catalogue order, under the same
 * titles the catalogue, the programme pages and the footer use.
 */
export function programmesFor(pillar: string): Programme[] {
  return COURSES.filter((course) => course.pillar === pillar).map(({ slug, title, description, audience, topics }) => ({ slug, title, description, audience, topics }));
}

/** The topic groups of each training area, keyed by the area's page slug. */
export const GROUPS_BY_AREA: Record<string, TopicGroup[]> = { "technology-training": TECHNOLOGY_GROUPS, "leadership-soft-skills-training": BEHAVIORAL_GROUPS, "itil-prince2-agile-training": FRAMEWORK_GROUPS, "iso-standards-training": ISO_GROUPS };

/** One training area with its catalogue counts, for cards and indexes. */
export function areaSummary(slug: string) {
  const pillar = TRAINING_PILLARS.find((entry) => entry.slug === slug) ?? TRAINING_PILLARS[0];
  const groups = GROUPS_BY_AREA[pillar.slug];
  return { ...pillar, groups, topics: countTopics(groups), programmes: COURSES.filter((course) => course.pillar === pillar.title) };
}

/** Catalogue topics that have a focused programme page on the same subject. */
export const TOPIC_PROGRAMMES: Record<string, string> = {
  ReactJS: "reactjs-training",
  "Design Thinking": "design-thinking-workshop",
  ITIL: "itil-4-foundation-training",
  PRINCE2: "prince2-training",
  "ISO 9001 Lead Auditor": "iso-9001-training",
  "ISO 9001 Lead Implementer": "iso-9001-training",
  "ISO 27001 Lead Auditor": "iso-27001-training",
  "ISO 27001 Lead Implementer": "iso-27001-training",
};

/** Anchor id of a topic group, shared by the topic lists and the links that point into them. */
export const groupAnchor = (title: string) => `group-${slugify(title)}`;

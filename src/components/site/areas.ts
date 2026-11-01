import { Cpu, ShieldCheck, Users, Workflow, type LucideIcon } from "lucide-react";
import { COURSES, METHOD_STEPS, TRAINING_PILLARS } from "@/data";
import { areaSummary, countTopics, GROUPS_BY_AREA } from "@/components/catalogue/utils";

// Presentation details for the four training areas. Descriptions, eyebrows and topics are the
// site's existing copy; only the icon, the short name and the choice of sample topics are new.
const DETAILS: Record<string, { icon: LucideIcon; short: string; meta: string; intro: string; sample: string[] }> = {
  "technology-training": { icon: Cpu, short: "Technology", meta: "Technology", intro: "Technical learning across infrastructure, software engineering, data, emerging technology, security, and networks.", sample: ["Cloud Computing", "Azure", "ReactJS", "Cybersecurity"] },
  "leadership-soft-skills-training": { icon: Users, short: "Leadership", meta: "People and performance", intro: "Practical programmes for leadership, communication, collaboration, workplace effectiveness, and team performance.", sample: ["Leadership", "Business Communications", "Presentation Skills", "Design Thinking"] },
  "itil-prince2-agile-training": { icon: Workflow, short: "Frameworks", meta: "Delivery and management", intro: "Shared approaches for service management, project delivery, agile ways of working, and organizational change.", sample: ["ITIL", "PRINCE2", "COBIT", "DevOps"] },
  "iso-standards-training": { icon: ShieldCheck, short: "ISO and GRC", meta: "Standards and governance", intro: "Learning across quality, information security, service continuity, risk, governance, privacy, and compliance.", sample: ["ISO 9001 Lead Auditor", "ISO 27001 Lead Implementer", "ISO 31000", "GDPR"] },
};

export type Area = ReturnType<typeof areaSummary> & (typeof DETAILS)[string] & { href: string };

/** The four training areas, in catalogue order, with counts derived from the data. */
export const AREAS: Area[] = TRAINING_PILLARS.map((pillar) => ({ ...areaSummary(pillar.slug), ...DETAILS[pillar.slug], href: `/${pillar.slug}` }));

export const areaBySlug = (slug: string) => AREAS.find((area) => area.slug === slug) ?? AREAS[0];
export const areaByTitle = (title: string) => AREAS.find((area) => area.title === title) ?? AREAS[0];

export const TOTAL_TOPICS = Object.values(GROUPS_BY_AREA).reduce((total, groups) => total + countTopics(groups), 0);
export const TOTAL_PROGRAMMES = COURSES.length;

/** The short area name shown above a programme card, e.g. "Frameworks". */
export const programmeArea = (pillar: string) => areaByTitle(pillar).short;

/**
 * The six-step method grouped into three phases. The phase names and lines are the home page's
 * existing Understand / Shape / Deliver copy; the steps are METHOD_STEPS.
 */
export const PHASES = [
  { name: "Understand", line: "Clarify the business problem, participants, capability need, and desired outcome.", steps: METHOD_STEPS.slice(0, 2) },
  { name: "Shape", line: "Fine-tune a standard offering, or create a need-based learning intervention.", steps: METHOD_STEPS.slice(2, 3) },
  { name: "Deliver", line: "Use practical and engaging methods suited to the requirement and the people in the room.", steps: METHOD_STEPS.slice(3) },
];

import { AREAS, type Area } from "@/components/site/areas";
import { COURSES, PAST_TRAININGS } from "@/data";

// What each topic covers, and the catalogue page it belongs to. Describes the subject only, not any specific client engagement.
const TOPIC_CONTEXT: Record<string, { about: string; href: string }> = {
  "SAP Document and Reporting Compliance readiness": { about: "Preparing finance and ERP teams for SAP Document and Reporting Compliance (DRC), the SAP solution for electronic invoicing and statutory reporting requirements.", href: "/technology-training" },
  "Leadership development programmes": { about: "Building leadership capability across communication, coaching, decision making, and leading high-performing teams.", href: "/leadership-soft-skills-training" },
  "VBA macros for Excel": { about: "Automating repetitive Excel work with VBA macros, from recording simple macros to writing and maintaining reusable code.", href: "/technology-training" },
  "Advanced Excel": { about: "Advanced formulas, lookups, PivotTables, data analysis, and modelling techniques for business users who work with data every day.", href: "/technology-training" },
  "Agentic AI for finance": { about: "How AI agents that plan and carry out multi-step tasks can support finance workflows, along with the controls and judgement needed to use them responsibly.", href: "/technology-training" },
  "AI tools in Excel and PowerPoint for procurement": { about: "Using AI assistants inside Excel and PowerPoint to speed up procurement analysis, reporting, and presentations.", href: "/technology-training" },
  "Experiential team building": { about: "Activity-based sessions that strengthen collaboration, trust, and collective problem solving within and across teams.", href: "/leadership-soft-skills-training" },
  "Design Thinking workshop": { about: "A facilitated, human-centred approach to understanding users, framing problems, and prototyping and testing ideas.", href: "/design-thinking-workshop" },
};

export type PastTraining = (typeof PAST_TRAININGS)[number] & { about?: string; programme?: { href: string; title: string }; area?: Area };
export type PastTrainingGroup = { key: string; area?: Area; title: string; items: PastTraining[] };

// Each training with its context, the area its catalogue link belongs to (a programme page counts
// for its programme's area), and that programme. Context is optional, as on main: nothing is dropped.
const trainings: PastTraining[] = PAST_TRAININGS.map((training) => {
  const context = TOPIC_CONTEXT[training.title];
  const course = context && COURSES.find((entry) => `/${entry.slug}` === context.href);
  const area = context && AREAS.find((entry) => entry.href === context.href || entry.title === course?.pillar);
  return { ...training, about: context?.about, programme: context && course ? { href: context.href, title: course.title } : undefined, area };
});

// Area names in sentence case for headings ("Technology training"); acronyms such as ISO and GRC keep their capitals.
const sentenceCase = (title: string) => title.split(" ").map((word, index) => index === 0 || word === word.toUpperCase() ? word : word.toLowerCase()).join(" ");

/**
 * The past trainings grouped by training area in catalogue order; a training with no known area
 * goes in a final group. Counts on the pages come from these groups, so they add up to what shows.
 */
export const PAST_TRAINING_GROUPS: PastTrainingGroup[] = [
  ...AREAS.map((area) => ({ key: area.slug, area, title: sentenceCase(area.title), items: trainings.filter((item) => item.area === area) })),
  { key: "other", area: undefined, title: "Other trainings", items: trainings.filter((item) => !item.area) },
].filter((group) => group.items.length);

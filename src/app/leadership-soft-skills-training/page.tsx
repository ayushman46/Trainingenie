import type { Metadata } from "next";
import { groupAnchor, programmesFor } from "@/components/catalogue/utils";
import { areaBySlug } from "@/components/site/areas";
import { AreaPage } from "@/components/tg/area-page";
import { TextLink } from "@/components/tg/text-link";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Leadership and Soft Skills Training", "Explore TraininGenie leadership, business communication, workplace effectiveness, team, and behavioral training programmes.", "/leadership-soft-skills-training", true);

const programmes = programmesFor("Leadership and Soft Skills");

// What each topic is about, in one neutral line: its scope, not a promised result.
const topicNotes: Record<string, string> = {
  Leadership: "Leading people, setting direction and making decisions at work.",
  "Team Management": "Organizing, guiding and supporting a team's day-to-day work.",
  "Managing and Sustaining High Performance Teams": "Building team performance and keeping it up over time.",
  "Interpersonal Skills": "Working relationships, listening and collaboration with colleagues.",
  "Business Communications": "Clear written and spoken communication in a business setting.",
  "Presentation Skills": "Planning, structuring and delivering presentations.",
  "Corporate Etiquette": "Professional conduct and expectations in the workplace.",
  "Time Management": "Planning, prioritizing and managing time and workload.",
  "SMART Goal Setting": "Setting goals that are specific, measurable, achievable, relevant and time-bound.",
  "Conflict Management": "Recognizing, discussing and resolving disagreements at work.",
  "Problem Solving and Decision Making": "Structured ways to analyse problems and choose between options.",
  "Strengths Workshops": "Identifying individual and team strengths and how they are used at work.",
  "Campus to Corporate": "The move from education into the workplace, for new joiners and participants entering their first job. Related topics on this page: Business Communications, Corporate Etiquette, Interpersonal Skills and Time Management.",
};

// For senior managers and leadership teams: the existing topics and programme that suit them, each a
// link to its topic group on this page or to its programme page. No claims beyond the names.
const groupOf = (topic: string) => `#${groupAnchor(areaBySlug("leadership-soft-skills-training").groups.find((group) => group.items.includes(topic))?.title ?? "")}`;
const seniorLinks: [label: string, href: string][] = [...["Leadership", "Managing and Sustaining High Performance Teams", "Problem Solving and Decision Making"].map((topic): [string, string] => [topic, groupOf(topic)]), ["Design Thinking Workshop", "/design-thinking-workshop"]];
const seniorPointer = <div id="senior-leaders" className="mt-10 border-t border-border pt-6">
  <h3 className="type-ui font-medium text-foreground">For senior managers and leadership teams</h3>
  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-3">{seniorLinks.map(([label, href]) => <li key={label}><TextLink href={href} size="sm">{label}</TextLink></li>)}</ul>
</div>;

export default function Page() {
  return <AreaPage slug="leadership-soft-skills-training" title="Leadership and Soft Skills Training" intro="Learning programmes that help people lead, communicate, collaborate, manage time, solve problems, and sustain high performance at work."
    overview={{ title: "Practical skills for better working relationships and outcomes.", statement: "The catalogue includes leadership, communication, effectiveness, collaboration, and problem solving. Programmes can be shaped for managers, cross-functional teams, participants entering the workplace, or other organizational needs." }}
    catalogue={{ title: "Leadership and behavioral learning", intro: "Browse the supported training areas and discuss the specific participant context with TraininGenie." }}
    programmes={{ title: "Focused people\u00a0programme", items: programmes, discuss: "Discuss leadership training" }} topicNotes={topicNotes} pointer={seniorPointer}>
    {serviceJsonLd({ name: "Leadership and Soft Skills Training", description: "Leadership, communication, collaboration, workplace effectiveness, problem solving, and team performance training for organizations.", path: "/leadership-soft-skills-training" })}
  </AreaPage>;
}

import type { Metadata } from "next";
import { programmesFor } from "@/components/catalogue/utils";
import { AreaPage } from "@/components/tg/area-page";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Leadership and Soft Skills Training", "Explore TraininGenie leadership, business communication, workplace effectiveness, team, and behavioral training programmes.", "/leadership-soft-skills-training", true);

const programmes = programmesFor("Leadership and Soft Skills");

export default function Page() {
  return <AreaPage slug="leadership-soft-skills-training" title="Leadership and Soft Skills Training" intro="Learning programmes that help people lead, communicate, collaborate, manage time, solve problems, and sustain high performance at work."
    overview={{ title: "Practical skills for better working relationships and outcomes.", statement: "The catalogue includes leadership, communication, effectiveness, collaboration, and problem solving. Programmes can be shaped for managers, cross-functional teams, participants entering the workplace, or other organizational needs." }}
    catalogue={{ title: "Leadership and behavioral learning", intro: "Browse the supported training areas and discuss the specific participant context with TraininGenie." }}
    programmes={{ title: "Focused people\u00a0programme", items: programmes, discuss: "Discuss leadership training" }}>
    {serviceJsonLd({ name: "Leadership and Soft Skills Training", description: "Leadership, communication, collaboration, workplace effectiveness, problem solving, and team performance training for organizations.", path: "/leadership-soft-skills-training" })}
  </AreaPage>;
}

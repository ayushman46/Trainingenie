import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { programmesFor } from "@/components/catalogue/utils";
import { AreaPage } from "@/components/tg/area-page";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Technology Training", "Explore TraininGenie technology training across cloud, software engineering, data, AI, enterprise systems, cybersecurity, and networks.", "/technology-training", true);

const programmes = programmesFor("Technology Training");

// An inline link in running text, as TextLink: ink with a 1px underline that stays on hover while the colour turns grey.
const inlineLink = "text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 ease-out hover:text-muted-foreground";

const principles: [string, ReactNode][] = [
  ["Interactive learning", "Use lectures, discussion, practical work, and examples appropriate to the programme."],
  // "fine-tuned" stays on one line, so a narrow column never breaks it at the hyphen.
  ["Context first", <>Standard content can be <span className="whitespace-nowrap">fine-tuned</span> around participant needs and organizational requirements.</>],
  ["A clear next step", <>Discuss the audience, topic, and desired outcome through <Link href="/contact-us#enquiry" className={inlineLink}>the contact page</Link>.</>],
];

export default function Page() {
  return <AreaPage slug="technology-training" title="Technology Training" intro="Technology training for corporate teams that need practical capability across infrastructure, software engineering, data, emerging technology, enterprise platforms, security, and networks." approach={principles}
    overview={{ title: "Teams building, operating, and improving technology.", statement: "Programmes can support engineering, technology, data, security, and delivery teams. The emphasis can be adjusted to the participant level and the organization context.", support: ["TraininGenie starts with the requirement, then works backward to shape the learning experience and practical application."] }}
    catalogue={{ title: "Areas of learning", intro: "The catalogue is organized by the kind of capability a corporate team may need to build." }}
    programmes={{ title: "Focused technology\u00a0programme", intro: "Explore focused pages for teams looking for a specific technology learning path.", items: programmes, discuss: "Discuss technology training" }}
    // The work delivered so far is business tools, ERP and AI (as /past-trainings says), so the intro names it.
    deliveredIntro="Training across business tools, ERP and AI.">
    {serviceJsonLd({ name: "Technology Training", description: "Technology training for corporate teams across infrastructure, software engineering, data, emerging technology, enterprise platforms, security, and networks.", path: "/technology-training" })}
  </AreaPage>;
}

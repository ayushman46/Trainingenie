import type { Metadata } from "next";
import { programmesFor } from "@/components/catalogue/utils";
import { AreaPage } from "@/components/tg/area-page";
import { CertificationNote } from "@/components/tg/certification-note";
import { TRAINING_PILLARS } from "@/data";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("ISO, Standards and GRC Training", "Explore TraininGenie training across ISO 9001, ISO 27001, ISO 20000, ISO 22301, ISO 31000, risk, privacy, and compliance.", "/iso-standards-training", true);

const programmes = programmesFor("ISO, Standards and GRC");

// Who the area serves comes from the audiences of its focused programmes.
export default function Page() {
  return <AreaPage slug="iso-standards-training" title="ISO, Standards and GRC Training" intro="Learning support across quality, information security, service management, business continuity, risk, privacy, governance, and compliance."
    overview={{ title: "Quality, security, risk, and compliance teams.", statement: "Choose a topic from the catalogue; the programme, delivery, and any certification preparation are then agreed with TraininGenie.", audiences: true }}
    catalogue={{ title: "ISO and Governance, Risk and Compliance", intro: TRAINING_PILLARS[3].description }}
    programmes={{ title: "Focused standards\u00a0programmes", items: programmes, showAudience: false }}
    // Below md the programme rows already close on a hairline, so the note drops its own there.
    note={<CertificationNote className="mt-14 max-md:mt-8 max-md:border-t-0 max-md:pt-0" />}>
    {serviceJsonLd({ name: "ISO, Standards and GRC Training", description: "Training across ISO standards, quality, information security, service management, business continuity, risk, privacy, governance, and compliance.", path: "/iso-standards-training" })}
  </AreaPage>;
}

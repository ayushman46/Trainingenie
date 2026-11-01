import type { Metadata } from "next";
import { programmesFor } from "@/components/catalogue/utils";
import { AreaPage } from "@/components/tg/area-page";
import { TRAINING_PILLARS } from "@/data";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Management Systems and Frameworks", "Explore TraininGenie training across ITIL, PRINCE2, PRINCE2 Agile, COBIT, DevOps, and change management.", "/itil-prince2-agile-training", true);

const programmes = programmesFor("Management Systems and Frameworks");

// Who the area serves comes from the audiences of its focused programmes.
export default function Page() {
  return <AreaPage slug="itil-prince2-agile-training" title="Management Systems and Frameworks" intro="Training that helps organizations build shared language and practical understanding around service management, project delivery, agile ways of working, DevOps, and change."
    overview={{ title: "Service management, project delivery, and agile teams.", statement: "These programmes can be discussed and adapted around the organization, the participant group, and the intended application.", audiences: true }}
    catalogue={{ title: "Management systems and delivery", intro: TRAINING_PILLARS[2].description }}
    programmes={{ title: "Focused framework\u00a0programmes", intro: "Explore ITIL 4 Foundation, PRINCE2, and Scrum and Agile training pages for more focused programme information.", items: programmes, showAudience: false }}>
    {serviceJsonLd({ name: "Management Systems and Frameworks Training", description: "Training across ITIL, PRINCE2, Agile, COBIT, DevOps, service management, project delivery, and change management.", path: "/itil-prince2-agile-training" })}
  </AreaPage>;
}

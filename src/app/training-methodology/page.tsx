import type { Metadata } from "next";
import { lowerFirst } from "@/components/catalogue/utils";
import { AREAS, PHASES, TOTAL_TOPICS } from "@/components/site/areas";
import { AreaRows } from "@/components/tg/area-rows";
import { ClosingBand } from "@/components/tg/closing-band";
import { DeliveryLine } from "@/components/tg/delivery-line";
import { IndexList } from "@/components/tg/index-list";
import { Label } from "@/components/tg/label";
import { MethodSteps, phaseId, stepRange } from "@/components/tg/method-steps";
import { PageHero } from "@/components/tg/page-hero";
import { Point } from "@/components/tg/point";
import { ProgrammeList } from "@/components/tg/programme-list";
import { Section } from "@/components/tg/section";
import { HEAD, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { COURSES, METHOD_CONSTANTS, METHOD_STEPS } from "@/data";
import { UI_LABELS } from "@/data/site-copy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Training Methodology", "Understand TraininGenie's requirements-driven approach to customized corporate training and practical learning.", "/training-methodology");

// A same-page link inside running text, set like TextLink: an ink underline that turns grey on hover
// (no red). An invisible ::before pads the hit area to at least 44px tall without moving the line or
// enlarging the focus ring.
const inlineLink = "relative text-foreground before:absolute before:inset-x-0 before:-inset-y-[13px] underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";

// The two halves of every engagement: the stated sentence, then what each part means, in the site's own words
// (the page intro, the method and the Shape phase). Only definitions that add to the sentence above them; the
// activities and the levels of customization point to the step that names them, rather than listing them again.
const contrast = [
  { title: "What stays consistent", text: METHOD_CONSTANTS.consistent, parts: [
    ["Requirements-driven", "Work backward from the client problem and desired outcome."],
    ["The method", <a key="method" href="#method" className={inlineLink}>Understand, Shape, Deliver</a>],
  ] },
  { title: "What can change", text: METHOD_CONSTANTS.changeable, parts: [
    ["Emphasis and examples", "Adapted around the organization, the participants, and the outcome."],
    ["Learning activities", "Discussed for each engagement; see step 4."],
    ["Delivery choices", "Online, onsite or hybrid."],
    ["Level of customization", "From a fine-tuned standard offering to a need-based intervention; see step 3."],
  ] },
] as const;

// How learning is reviewed is the method's two measuring steps, 02 (pre-assessments or discussion) and
// 06 (post-assessments, feedback and the agreed objectives). The steps above already show both in full,
// so #review answers "how is it measured?" in one line, and the glance row names the two steps by title.
const reviewTitles = METHOD_STEPS.filter(([number]) => number === "02" || number === "06").map(([, title]) => title);

const meta = [`${METHOD_STEPS.length} steps, from requirement to review`, "Online, onsite or hybrid", `${TOTAL_TOPICS} topics`];

// The three phases as jump links, then how learning is reviewed, so the whole method can be read at a
// glance before the detail.
// Below lg it folds into one closed row, as the phases start right under the hero.
const glance = <IndexList id="glance-heading" title="The method at a glance" collapsible sections={[{
  rows: PHASES.map((phase) => ({
    href: `#${phaseId(phase.name)}`,
    label: `${phase.name} · ${stepRange(phase.steps)}`,
    sub: phase.steps.map(([, title], index) => index ? lowerFirst(title) : title).join(", "),
    arrow: "down" as const,
  })).concat({ href: "#review", label: "How learning is reviewed", sub: reviewTitles.map((title, index) => index ? lowerFirst(title) : title).join(", "), arrow: "down" as const }),
}]} />;

export default function Page() {
  return <>
    <PageHero crumbs={[{ label: "Training Methodology" }]} label="How we work" title="Training Methodology" lead="TraininGenie works backward from the client problem and desired outcome to formulate a training solution that fits the actual requirement." meta={meta} aside={glance} />

    {/* The six steps, as three chapters: Understand, Shape, Deliver. The heading breaks after its first
        sentence, as on the landing page, instead of where text balancing would put it. */}
    <Section id="method" divider labelledBy="method-heading">
      <SectionHead id="method-heading" label={`The method, in ${METHOD_STEPS.length} steps`} title={<><span className="block lg:whitespace-nowrap">Start with the requirement.</span> <span className="block lg:whitespace-nowrap">Work backward from the outcome.</span></>} intro="The approach begins by understanding the client problem and the desired outcome. That context shapes the learning experience, the activities, and the practical application." />
      <div className="mt-12 lg:mt-16 lg:pl-col-4">
        <MethodSteps />
        <DeliveryLine className="mt-14" />
      </div>

      {/* How learning is reviewed: the heading in columns 1–3, as the page's other sub-blocks, and one ruled
          line from column 4 in the landing's words, naming the two steps above that measure it (no repeat
          of their text). From lg the heading shares the line's baseline, so the two read as one row. */}
      <section id="review" aria-labelledby="review-heading" className="mt-16 grid gap-y-5 lg:mt-20 lg:grid-cols-12 lg:items-baseline lg:gap-x-10">
        <div data-reveal className="lg:col-span-3">
          <h3 id="review-heading" className="type-h3 text-foreground">How learning is reviewed</h3>
        </div>
        <div className="border-t border-border pt-6 lg:col-span-9">
          <p className="type-ui text-copy"><span className="font-medium text-foreground">Before and after:</span> {UI_LABELS.reviewedValue} (steps 2 and 6).</p>
        </div>
      </section>
    </Section>

    {/* What is fixed and what is shaped: the page's one grey band. The split head, as every other section
        here, so the three h2s share column 4; under it two open columns, each with what its parts mean,
        then the way on to the catalogue. */}
    <Section id="every-engagement" tone="tint" labelledBy="every-engagement-heading">
      <SectionHead id="every-engagement-heading" label="Every engagement" title="Consistent in approach, shaped in the detail." />
      <div className={`${HEAD.body} grid lg:grid-cols-12 lg:gap-x-10`}>
        <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:col-span-9 lg:col-start-4">
          {contrast.map((side) => <Point key={side.title} title={side.title}>
            <p>{side.text}</p>
            <dl className="mt-6 border-t border-border">
              {side.parts.map(([term, detail]) => <div key={term} className="border-b border-border py-4">
                <dt className="type-ui font-medium text-foreground">{term}</dt>
                <dd className="mt-0.5 type-ui text-muted-foreground">{detail}</dd>
              </div>)}
            </dl>
          </Point>)}
        </div>
      </div>
      <div className={`${HEAD.action} lg:pl-col-4`}><TextLink href="/corporate-training-services">All training topics</TextLink></div>
    </Section>

    {/* The same method behind each training area and each focused programme. */}
    <Section id="where-it-applies" labelledBy="where-it-applies-heading">
      <SectionHead id="where-it-applies-heading" label="Where it applies" title={`One method, across all ${AREAS.length} training areas.`} intro="Each programme can be adapted around the organization, the participants, and the outcome." />
      <AreaRows descriptionKey="description" className="mt-12 lg:mt-16" />
      {/* The focused programmes as open link rows, each with its training area, so the list scans like an index.
          Two columns, not three: at three, most titles wrap beside their area name. */}
      <div className="mt-14 grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <h3 className="lg:col-span-3 lg:pt-4"><Label as="span">{COURSES.length} focused programmes</Label></h3>
        <ProgrammeList columns={2} className="lg:col-span-9" />
      </div>
    </Section>

    <ClosingBand />
  </>;
}

import Link from "next/link";
import { groupAnchor, TOPIC_PROGRAMMES, type TopicGroup } from "@/components/catalogue/utils";
import { COURSES } from "@/data";
import { UI_LABELS } from "@/data/site-copy";
import { ArrowIcon } from "./icons";

/**
 * A topic row's vertical padding (its <li>), and the same padding taken over by the topic's link with
 * an equal negative margin. The link then fills its row from edge to edge without changing the list's
 * rhythm, and stops where the next row starts: a link padded past its row would reach into its
 * neighbour's, and a tap just under one topic would open the next one. Below md every row is a tap
 * target of at least 44px between hairlines, its tag at the right.
 */
const rowPadding = (feature: boolean) => `${feature ? "py-2" : "py-1.5"} max-md:border-b max-md:border-border max-md:py-3`;
const linkPadding = (feature: boolean) => `${feature ? "-my-2 py-2" : "-my-1.5 py-1.5"} max-md:-my-3 max-md:flex max-md:min-h-11 max-md:items-center max-md:justify-between max-md:gap-4 max-md:py-3`;

/**
 * A topic with a programme page: the underlined topic and a small grey tag that turns ink on hover.
 * The tag reads "Focused programme →" when the page is the topic's own subject (ReactJS, ITIL, PRINCE2,
 * Design Thinking) and "Related programme →" when the topic only leads to a broader page (the Lead
 * Auditor and Lead Implementer topics open the ISO 9001 and ISO 27001 pages), so a buyer is never
 * promised a course the page does not describe. Below md the row is the topic with the tag at its
 * right (no underline, as every row of the list is a link); from md the tag follows the topic inline.
 * The link's name starts with what it shows: "ITIL, Focused programme: ITIL 4 Foundation".
 */
function ProgrammeTopic({ topic, slug, title, feature }: { topic: string; slug: string; title: string; feature: boolean }) {
  const tag = topic.includes("Lead ") ? UI_LABELS.relatedTag : UI_LABELS.programmeTag;
  return <Link href={`/${slug}`} aria-label={`${topic}, ${tag}: ${title}`} className={`group/tag md:inline-flex md:flex-wrap md:items-baseline md:gap-x-3 ${linkPadding(feature)}`}>
    <span className="decoration-border-strong decoration-1 underline-offset-4 transition-colors duration-200 group-hover/tag:decoration-foreground md:underline">{topic}</span>
    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap type-label text-muted-foreground transition-colors duration-200 group-hover/tag:text-foreground">{tag}<ArrowIcon className="size-3.5 transition-transform duration-200 group-hover/tag:translate-x-[3px]" /></span>
  </Link>;
}

/**
 * Any other topic: a link to the enquiry form with the topic filled in, so no topic is a dead end.
 * Below md the row shows a grey "Ask →" tag at its right at all times, so a tap is known to open the
 * enquiry. From md the topic rests with the programme topics' grey hairline underline, which turns ink
 * on hover or keyboard focus while the "Ask →" tag fades in after it. There the tag is drawn past the
 * end of the text with a net width of zero (its negative right margin cancels its width), so showing
 * it never wraps or adds a line, and the link keeps enough room on its right that the tag, reaching
 * about 52px past the text, ends at least 8px short of the next column across the gap (48px in
 * `feature`, 32px in `compact`). The tag's word is drawn by CSS, so the page's text (copied, or read
 * by a crawler) is the topic alone. Each topic has its own URL, so these links are not prefetched:
 * dozens would be fetched as they scroll by.
 */
function AskTopic({ topic, feature }: { topic: string; feature: boolean }) {
  return <Link href={`/contact-us?topic=${encodeURIComponent(topic)}#enquiry`} prefetch={false} aria-label={`Ask about ${topic}`} className={`group/ask md:block md:underline md:decoration-border-strong md:decoration-1 md:underline-offset-4 md:transition-colors md:duration-200 md:hover:decoration-foreground md:focus-visible:decoration-foreground ${linkPadding(feature)} ${feature ? "md:pr-3" : "md:pr-7"}`}>
    <span>{topic}</span>
    <span aria-hidden="true" className="ml-2 -mr-[3.25rem] inline-flex w-11 items-center gap-1 whitespace-nowrap type-label text-muted-foreground opacity-0 transition-opacity duration-200 before:content-['Ask'] group-hover/ask:opacity-100 group-focus-visible/ask:opacity-100 max-md:mx-0 max-md:w-auto max-md:shrink-0 max-md:opacity-100"><ArrowIcon className="size-3.5" /></span>
  </Link>;
}

function Topic({ topic, feature }: { topic: string; feature: boolean }) {
  const programme = COURSES.find((course) => course.slug === TOPIC_PROGRAMMES[topic]);
  return programme ? <ProgrammeTopic topic={topic} slug={programme.slug} title={programme.title} feature={feature} /> : <AskTopic topic={topic} feature={feature} />;
}

const compactColumns = (count: number) => (count === 1 ? "" : count === 3 ? "md:grid-cols-2 lg:grid-cols-3" : count === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4");

/**
 * Every topic of an area, grouped under a heading with its count; each topic is a link, to its
 * programme page or to the enquiry form. Each group is an anchor target
 * (`#group-…`) with no scroll-margin of its own: html's scroll-padding-top (96px) already clears the
 * header on arrival from another page, and SmoothAnchors uses the same 96px for same-page clicks, so
 * both land the group at 96px. (A scroll margin here would stack on that padding and overshoot.)
 *
 * `feature` (area pages): type-h3 group titles, two columns, 17px topics (16px on phones, as on the
 * catalogue) with no bullets and no rules per item. `compact` (catalogue): 15px medium group titles,
 * up to four columns, 16px topics. A single group
 * spreads its topics over columns instead. `hideTitle` keeps a lone group's title for screen readers
 * only, for when it would just repeat the section heading above it.
 */
export function TopicGroups({ groups, variant = "feature", headingLevel = 3, hideTitle = false, className = "" }: { groups: TopicGroup[]; variant?: "feature" | "compact"; headingLevel?: 3 | 4; hideTitle?: boolean; className?: string }) {
  const Heading = headingLevel === 4 ? "h4" : "h3";
  const feature = variant === "feature";
  const single = groups.length === 1;
  const grid = feature ? `grid gap-x-12 gap-y-14 ${single ? "" : "md:grid-cols-2"}` : `grid gap-x-8 gap-y-10 ${compactColumns(groups.length)}`;
  const itemColumns = single ? (feature ? "md:columns-2 md:gap-x-12" : "sm:columns-2 sm:gap-x-8 lg:columns-3") : "";
  return <div className={`${grid} ${className}`}>
    {groups.map((group) => <div key={group.title} id={groupAnchor(group.title)}>
      <div className={hideTitle ? "sr-only" : "flex items-baseline justify-between gap-4"}>
        <Heading className={feature ? "type-h3 text-foreground" : "type-ui font-medium text-foreground"}>{group.title}</Heading>
        <span className="shrink-0 type-label font-normal tabular-nums text-muted-foreground">{group.items.length}<span className="sr-only"> topics</span></span>
      </div>
      <ul className={`border-t border-border pt-2 max-md:pt-0 ${hideTitle ? "" : feature ? "mt-4" : "mt-3"} ${itemColumns}`}>
        {group.items.map((topic) => <li key={topic} className={`break-inside-avoid ${rowPadding(feature)} ${feature ? "type-body text-foreground max-md:text-[1rem]" : "type-small text-copy"}`}><Topic topic={topic} feature={feature} /></li>)}
      </ul>
    </div>)}
  </div>;
}

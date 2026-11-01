import Link from "next/link";
import { TOTAL_TOPICS } from "@/components/site/areas";
import { listTitleClass } from "@/components/tg/fact-list";
import { LinkRows } from "@/components/tg/programme-list";
import { Section } from "@/components/tg/section";
import { CLIENT_REFERENCES, TRAINING_PILLARS } from "@/data";

// The four company pages, then the pages that explain the training itself. Each line under a
// title says what the page holds; the counts come from the data. The past-training total is not
// promoted (as in the Past trainings hero) until the owner supplies real scale numbers.
const COMPANY = [
  { href: "/about-us", title: "About TraininGenie", meta: "Vision, mission, values and the registered company" },
  { href: "/our-team", title: "Founder profile", meta: "Mousumi Chakraborty, Founder Director" },
  { href: "/clients-and-testimonials", title: "Clients", meta: `${CLIENT_REFERENCES.length} selected clients` },
  { href: "/past-trainings", title: "Past trainings", meta: "Recently delivered topics, by training area" },
] as const;
const TRAINING = [
  { href: "/corporate-training-services", title: "All training topics", meta: `${TOTAL_TOPICS} topics in ${TRAINING_PILLARS.length} training areas` },
  { href: "/training-methodology", title: "How we work", meta: "Understand, shape and deliver" },
  { href: "/faqs", title: "FAQs", meta: "Common questions, answered" },
];

export type CompanyPath = (typeof COMPANY)[number]["href"];

/**
 * Closing links on the company pages: a tight band with the heading in columns 1–3 and, from
 * column 4, the other company pages and the training pages as two groups of hairline link rows
 * (title, with what the page holds under it). Below `md` the intro and the lines under the titles
 * drop and both groups become one compact grid of titles, two to a row, so a phone page ends
 * sooner with every link still a tap away. `tone="tint"` makes it the page's one grey (#f5f5f5)
 * band; use it only when the page has not spent its grey band elsewhere. A white band draws the
 * divider rule unless `divider={false}` (when it follows a grey band, the change of tone already
 * separates it).
 */
export function CompanyLinks({ current, tone = "white", divider = tone === "white" }: { current: CompanyPath; tone?: "white" | "tint"; divider?: boolean }) {
  const groups = [
    { title: "The company", pages: COMPANY.filter((page) => page.href !== current) },
    { title: "The training", pages: TRAINING },
  ];
  return <Section size="tight" tone={tone === "tint" ? "tint" : "paper"} divider={divider}>
    <nav aria-labelledby="company-links-heading" className="grid gap-y-6 md:gap-y-10 lg:grid-cols-12 lg:gap-x-10">
      <div className="lg:col-span-3">
        <h2 id="company-links-heading" className="type-h3 text-foreground">Where to go next</h2>
        <p className="mt-3 max-w-measure type-ui text-copy max-md:hidden">More about the company and the training it designs and delivers.</p>
      </div>
      {/* Phones: the titles only, one hairline row per pair. Each row draws its own bottom rule, so its
          focus ring stays square, as in LinkRows. */}
      <ul className="grid grid-cols-2 gap-x-6 border-t border-border md:hidden">
        {groups.flatMap((group) => group.pages).map((page) => <li key={page.href}>
          <Link href={page.href} className="flex h-full min-h-11 items-center border-b border-border py-2.5 type-ui font-medium text-foreground decoration-1 underline-offset-4 hover:underline focus-visible:rounded-none focus-visible:underline">{page.title}</Link>
        </li>)}
      </ul>
      <div className="grid gap-y-10 max-md:hidden sm:grid-cols-2 sm:gap-x-10 lg:col-span-9">
        {groups.map((group) => <div key={group.title}>
          <h3 className={listTitleClass}>{group.title}</h3>
          <LinkRows className="mt-4" items={group.pages.map((page) => ({ href: page.href, title: page.title, meta: page.meta }))} />
        </div>)}
      </div>
    </nav>
  </Section>;
}

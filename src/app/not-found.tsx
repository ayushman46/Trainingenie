import type { Metadata } from "next";
import { DocumentTitle } from "@/components/document-title";
import { SearchField } from "@/components/kit/command-menu";
import { ButtonLink } from "@/components/tg/button";
import { DotNumeral } from "@/components/tg/dot-numeral";
import { ClientOnly } from "@/components/utility/client-only";
import { StatusLinks, StatusState } from "@/components/utility/status-state";
import { COMPANY_NAME, COURSES, FAQS, METHOD_STEPS } from "@/data";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

// Useful places to go from a broken link (the buttons above already lead home and to the training catalogue).
const links = [
  { href: "/about-us", title: "About TraininGenie", meta: "Vision, mission, values and the registered company" },
  { href: "/corporate-training-services#programmes", title: "Focused programmes", meta: `${COURSES.length} programme pages` },
  { href: "/training-methodology", title: "How we work", meta: `${METHOD_STEPS.length} steps, from requirement to review` },
  { href: "/faqs", title: "FAQs", meta: `${FAQS.length} questions answered` },
  { href: "/contact-us", title: "Contact", meta: "Email, phone and the enquiry form" },
];

// Site search needs JavaScript, so its trigger is only rendered in the browser; the links work without it. It
// comes after the links, so its arrival once the page hydrates never pushes them down, and draws no rule of its
// own: the links' last hairline already closes the list above it.
const after = <>
  <StatusLinks title="Where to go next" links={links} className="mt-12" />
  <ClientOnly>
    <div className="mt-12">
      <p className="type-ui font-medium text-foreground">Or search the site</p>
      <SearchField placeholder="Search topics and pages" className="mt-3" />
    </div>
  </ClientOnly>
</>;

// "404" in the bulb's dot language, drawn large on the white page; it is the page's visible label, so the text label
// is for screen readers only.
const numeral = <DotNumeral value="404" size="lg" label="Error 404" className="mx-auto h-auto w-[272px] sm:w-[400px] lg:w-[470px]" />;

export default function NotFound() {
  return <>
    <DocumentTitle title={`Page not found | ${COMPANY_NAME}`} />
    <StatusState visual={numeral} label={<span className="tabular-nums">404</span>} hideLabel title="Page not found" after={after} actions={<>
      <ButtonLink href="/" className="max-sm:w-full">Return home</ButtonLink>
      <ButtonLink href="/corporate-training-services" variant="secondary" className="max-sm:w-full">All training topics</ButtonLink>
    </>}>
      The page you are looking for does not exist or has moved.
    </StatusState>
  </>;
}

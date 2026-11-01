import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { COMPANY_NAME, COMPANY_TAGLINE, CONTACT_INFO, COURSES, LEGAL_ENTITY } from "@/data";
import { ClientNote } from "@/components/kit/client-note";
import { AREAS } from "@/components/site/areas";
import { Container } from "./container";
import { ArrowIcon, PlusIcon } from "./icons";
import { Wordmark } from "./wordmark";

type FooterLink = [label: string, href: string];

const TRAINING_LINKS: FooterLink[] = [...AREAS.map((area): FooterLink => [area.title, area.href]), ["All training topics", "/corporate-training-services"], ["What we do", "/what-we-do"]];
const PROGRAMME_LINKS: FooterLink[] = COURSES.map((course) => [course.title, `/${course.slug}`]);
const COMPANY_LINKS: FooterLink[] = [["About", "/about-us"], ["Founder profile", "/our-team"], ["How we work", "/training-methodology"], ["Clients", "/clients-and-testimonials"], ["Past trainings", "/past-trainings"], ["FAQs", "/faqs"], ["Blog and resources", "/blog"], ["Contact", "/contact-us"]];
// In the legal lines, so they show at every width (the Company column is folded on phones).
const LEGAL_LINKS: FooterLink[] = [["Privacy policy", "/privacy-policy"], ["Company record", "/about-us#company"]];

const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
// Below lg every link is a 44px row (touch); from lg the list tightens to a 12px rhythm. Balanced
// wraps keep a two-line area name from leaving one word alone.
const linkClass = "flex min-h-11 items-center py-2.5 leading-[1.35] text-balance transition-colors duration-200 hover:text-foreground lg:inline-flex lg:min-h-0 lg:py-0 lg:leading-normal";
const listClass = "mt-3 text-[0.875rem] font-medium text-muted-foreground lg:mt-5 lg:space-y-3";
const headClass = "text-[0.875rem] font-medium text-foreground";
// Below lg each contact is a 44px row (touch); from lg the block tightens to the spec's space-y-1 pitch.
// Underlined, so they read as links where nothing hovers. The legal lines are grey already, so their
// links turn ink on hover instead.
const underlinedRow = "inline-flex min-h-11 items-center underline decoration-border-strong decoration-1 underline-offset-4 transition-colors duration-200 lg:min-h-0 lg:py-0.5";
const contactClass = `${underlinedRow} hover:text-muted-foreground`;
const legalClass = `${underlinedRow} hover:text-foreground`;
const externalLinks: FooterLink[] = [["TraininGenie on LinkedIn", CONTACT_INFO.companyLinkedIn], ["Founder on LinkedIn", CONTACT_INFO.directorLinkedIn]];

function LinkList({ links }: { links: FooterLink[] }) {
  return <ul className={listClass}>{links.map(([label, href]) => <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>)}</ul>;
}

function Column({ title, links, className = "" }: { title: string; links: FooterLink[]; className?: string }) {
  return <div className={className}>
    <h2 className={headClass}>{title}</h2>
    <LinkList links={links} />
  </div>;
}

/** A link column folded into a disclosure row, for phones: the 16px title with a plus that turns to a cross when open. */
function FoldedColumn({ title, links, className = "" }: { title: string; links: FooterLink[]; className?: string }) {
  return <details className={`disclosure group col-span-2 border-b border-border sm:hidden ${className}`}>
    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[1rem] font-medium text-foreground [&::-webkit-details-marker]:hidden">
      {title}
      <PlusIcon className="size-[18px] text-foreground transition-transform duration-(--motion-ui) group-open:rotate-45" />
    </summary>
    <div className="pb-4 [&_ul]:mt-0"><LinkList links={links} /></div>
  </details>;
}

/**
 * Items joined by middots. Each middot follows its item with no space in between, so a wrapped line
 * never starts with one; its margins give it room, so the separator never crowds its neighbours.
 * On phones each item takes its own line instead, so no line ends with a stray dot.
 */
function Dotted({ items }: { items: ReactNode[] }) {
  return <>{items.map((item, index) => <Fragment key={index}><span className="max-sm:block">{item}</span>{index < items.length - 1 && <><span aria-hidden="true" className="ml-2 mr-1 text-border-strong max-sm:hidden">·</span>{" "}</>}</Fragment>)}</>;
}

/**
 * The white site footer, Nike style: the brand block (wordmark, the tagline in plain ink, the line
 * about the company, then the email, phones, where the company is based and the two LinkedIn links, all
 * links in the one underlined 15px style), three link columns with 14px medium ink titles and 14px
 * grey links (Training areas, Focused programmes, Company) and the legal lines in 13px grey, which
 * link the privacy policy and the company record, so both are one tap away on every device. On
 * phones the three columns fold into one stack of disclosure rows, as on Nike's phone footer, and the
 * spacing tightens, so the end of the page stays short. The top hairline is dropped when the page ends
 * on the black closing band or on a grey band, which already mark the edge. The phone action bar steps aside
 * while the footer is in view, so no room is reserved for it: the bottom padding is 40px, or the
 * phone's safe area when that is larger. The client references note in the legal lines shows only on
 * the two pages that show client logos (/ and /clients-and-testimonials), as on main.
 */
export function SiteFooter() {
  return <footer className="border-t border-border bg-background [main:has(>section.bg-night:last-of-type)+&]:border-t-transparent [main:has(>section.bg-tint:last-of-type)+&]:border-t-transparent">
    <Container className="pt-12 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-16 lg:pt-20 lg:pb-10">
      <div className="grid gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Wordmark size="footer" />
          <p className="mt-4 text-[0.9375rem] font-medium text-foreground">{COMPANY_TAGLINE}</p>
          <p className="mt-3 max-w-[36ch] type-ui text-copy max-sm:mt-2">Corporate training, learning and development for organizations across India, shaped around each team&apos;s requirement.</p>
          {/* The margins allow for the rows' own padding: 24px above the text, 16px below. */}
          <div className="mt-3.5 text-[0.9375rem] text-foreground lg:mt-5.5">
            <p className="flex"><a href={`mailto:${CONTACT_INFO.email}`} className={`${contactClass} break-all`}>{CONTACT_INFO.email}</a></p>
            {/* Each middot trails its phone, so a wrapped line never starts with one. */}
            <p className="flex flex-wrap items-center tabular-nums">
              {CONTACT_INFO.phones.map((phone, index) => <span key={phone} className="flex items-center">
                <a href={tel(phone)} className={`${contactClass} whitespace-nowrap`}>{phone}</a>
                {index < CONTACT_INFO.phones.length - 1 && <span aria-hidden="true" className="mx-2 text-border-strong">·</span>}
              </span>)}
            </p>
            <p className="mt-1 type-ui text-copy max-lg:mb-1 lg:mt-1.5">Based in Bengaluru, with Kolkata as an associated location.</p>
            {/* The LinkedIn links in the contacts' style, with the external arrow, opening a new tab. */}
            <p className="flex flex-wrap gap-x-5 lg:mt-1.5">
              {externalLinks.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className={`${contactClass} group/out gap-1`}>
                {label}<ArrowIcon direction="up-right" className="size-3.5 transition-transform duration-200 ease-out group-hover/out:-translate-y-px group-hover/out:translate-x-px" /><span className="sr-only"> (opens in a new tab)</span>
              </a>)}
            </p>
          </div>
        </div>

        {/* From sm three open columns; below sm the same three groups as one stack of disclosure rows. */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10 lg:col-span-8">
          <Column title="Training areas" links={TRAINING_LINKS} className="max-sm:hidden" />
          <Column title="Focused programmes" links={PROGRAMME_LINKS} className="max-sm:hidden" />
          <Column title="Company" links={COMPANY_LINKS} className="max-sm:hidden" />
          <FoldedColumn title="Training areas" links={TRAINING_LINKS} className="border-t" />
          <FoldedColumn title="Focused programmes" links={PROGRAMME_LINKS} />
          <FoldedColumn title="Company" links={COMPANY_LINKS} />
        </nav>
      </div>

      <div className="mt-8 space-y-1.5 type-fine text-muted-foreground sm:mt-16 sm:border-t sm:border-border sm:pt-8">
        <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        {/* The legal name, the CIN and the date are kept whole, so none splits across lines. */}
        <p><Dotted items={[<span key="operator">{COMPANY_NAME} is operated by <span className="whitespace-nowrap">{LEGAL_ENTITY.name}</span></span>,<span key="cin" className="whitespace-nowrap">CIN {LEGAL_ENTITY.cin}</span>, <span key="incorporated" className="whitespace-nowrap">Incorporated {LEGAL_ENTITY.incorporatedLabel}</span>, `Registered office: ${LEGAL_ENTITY.registeredOffice.label}`]} /></p>
        {/* Below lg each link is a 44px row, as the contacts are, so the 13px links stay easy to tap. */}
        <p><Dotted items={LEGAL_LINKS.map(([label, href]) => <Link key={href} href={href} className={legalClass}>{label}</Link>)} /></p>
        <ClientNote />
      </div>
    </Container>
  </footer>;
}

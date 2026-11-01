import { Fragment, type ReactNode } from "react";
import { CONTACT_INFO } from "@/data";
import { CLOSING, PRIMARY_CTA, UI_LABELS } from "@/data/site-copy";
import { ButtonLink } from "./button";
import { Label } from "./label";
import { Section } from "./section";

const tel = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
// Underlined, so the email and phones read as links on a phone, where nothing hovers.
const contactLink = "inline-flex min-h-11 items-center underline decoration-night-muted/60 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-night-foreground hover:decoration-night-foreground";

/**
 * The page's one dark band, before the footer: black (#111) with white text. The grey label, a
 * Geist 500 heading, an optional body, and "What to share" as one quiet line ("What to share: a · b
 * · c"; pass `points={null}` to drop it), then the one white pill and the email and phones. `href`
 * points the pill somewhere other than the enquiry form's default (a programme page prefills the
 * form's topic); `emailSubject` is the subject the "Email us" link starts the email with ("Training
 * enquiry" by default). Its heading id is "closing-heading", so use one per page.
 *
 * Every band has one structure, so the pill never moves between pages: the copy, then the pill with
 * "Email us" and the phones in a row under it (one wrapping line from lg), all in the first eight
 * columns. A `visual` (the landing passes its small dark-palette bulb; the band itself never loads
 * the bulb's code, and the caller sets its width and hides it below lg) sits alone and centred in the
 * last four columns from lg, centred on the copy and actions as in the hero; without one those
 * columns stay empty. Below lg everything stacks: the copy, the pill and the contacts. The heading
 * is capped at 28ch, so the default title sets in two even lines from 1024 to 1920px.
 *
 * The block holding the pill, email and phones is a `data-cta-zone`: the phone action bar steps aside
 * while it is on screen, not as soon as the band's black edge appears. On phones (below sm) the pill
 * takes the full content width, as the hero pills do.
 *
 * The email shows as "Email us" (the /contact-us button's words), so the address is not repeated
 * just above the footer, which shows it in full; the phones show in full.
 */
export function ClosingBand({ id, label = CLOSING.label, title = CLOSING.title, body, points = CLOSING.points, visual, href = PRIMARY_CTA.href, emailSubject = "Training enquiry" }: { id?: string; label?: ReactNode; title?: ReactNode; body?: ReactNode; points?: string[] | null; visual?: ReactNode; href?: string; emailSubject?: string }) {
  const copy = <>
    <Label tone="night">{label}</Label>
    <h2 id="closing-heading" className="mt-5 max-w-[28ch] type-closing text-night-foreground">{title}</h2>
    {body && <p className="mt-6 max-w-measure type-body text-night-muted">{body}</p>}
    {/* Each point is kept whole, with its middot trailing it, so a line breaks only between points
        and never starts with a dot. The dot's 4px margin matches the space after it. */}
    {points && points.length > 0 && <p className="mt-6 type-ui text-night-muted">{CLOSING.pointsLabel}: {points.map((point, index) => <Fragment key={point}><span className="whitespace-nowrap">{point}{index < points.length - 1 && <><span className="sr-only">,</span><span aria-hidden="true" className="ml-1">·</span></>}</span>{" "}</Fragment>)}</p>}
  </>;
  const actions = <div data-cta-zone className="mt-10 flex flex-col items-stretch sm:mt-12 sm:items-start lg:mt-10 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-1">
    <ButtonLink href={href} variant="light" className="w-full sm:w-auto">{PRIMARY_CTA.label}</ButtonLink>
    {/* Each contact link is a 44px-tall row (the spec's minimum tap target); mt-3.5 plus the row's
        own centring keeps the text about 24px under the button. From lg they follow the pill in its row. */}
    <div className="mt-3.5 type-ui text-night-muted lg:mt-0 lg:flex lg:flex-wrap lg:items-center lg:gap-x-5">
      <p className="flex"><a href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}`} className={contactLink}>{UI_LABELS.emailUs}</a></p>
      <p className="flex flex-wrap items-center tabular-nums">
        {CONTACT_INFO.phones.map((phone, index) => <span key={phone} className="flex items-center">
          {index > 0 && <span aria-hidden="true" className="mx-2 opacity-50">·</span>}
          <a href={tel(phone)} className={`whitespace-nowrap ${contactLink}`}>{phone}</a>
        </span>)}
      </p>
    </div>
  </div>;

  return <Section id={id} tone="night" labelledBy="closing-heading">
    <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
      <div className="lg:col-span-8">{copy}{actions}</div>
      {visual && <div className="lg:col-span-4 lg:col-start-9 lg:flex lg:justify-center">{visual}</div>}
    </div>
  </Section>;
}

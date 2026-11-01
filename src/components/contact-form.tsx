"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/tg/button";
import { PlusIcon } from "@/components/tg/icons";
import { ENQUIRY_SENT_KEY } from "@/components/utility/enquiry-echo";
import { CONTACT_INFO, COURSES, SITE_URL, TRAINING_PILLARS } from "@/data";

// Nike's form fields: white, 56px tall, an 8px radius and a 1px grey edge (#8d8d8f, 3.3:1 on white)
// that turns ink on hover. Focus thickens the edge to 2px ink (an inset shadow, so nothing moves);
// a field the visitor has left invalid, or that failed on submit, takes the danger colour instead,
// at rest and in focus. In forced colours the shadow is dropped, so focus falls back to a real outline
// (outline-hidden). Text is 17px, so iOS does not zoom the page on focus.
const control = "mt-2.5 block w-full min-w-0 rounded-[var(--radius-control)] border border-input bg-surface px-4 type-body font-normal text-foreground [--edge:var(--foreground)] transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground hover:border-foreground focus-visible:border-[var(--edge)] focus-visible:shadow-[inset_0_0_0_1px_var(--edge)] focus-visible:outline-hidden user-invalid:border-danger user-invalid:[--edge:var(--danger)] aria-[invalid=true]:border-danger aria-[invalid=true]:[--edge:var(--danger)]";
const input = `${control} h-14`;
const fieldLabel = "block min-w-0 type-ui font-medium text-foreground";
// Required fields carry no mark: four of them are, and the rest say "(optional)" in grey after the label.
const Optional = () => <span className="font-normal text-muted-foreground"> (optional)</span>;
const formats = ["Online", "Onsite", "Hybrid", "Not sure yet"];
const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";

// The browser compiles `pattern` with the `v` flag, so parentheses and hyphens inside a class are escaped.
const emailPattern = String.raw`[^@\s]+@[^@\s]+\.[^@\s]{2,}`;
const phonePattern = String.raw`[0-9+\(\)\s.\-]{7,30}`;

type Field = HTMLInputElement | HTMLTextAreaElement;
const errorId = (name: string) => `contact-${name}-error`;
const messageHint = "contact-message-hint";
const phoneHint = "contact-phone-hint";
// The Training topic field suggests the programme and area titles as the visitor types; any other topic can still be typed.
const topicSuggestions = [...COURSES.map((course) => course.title), ...TRAINING_PILLARS.map((pillar) => pillar.title)];
const asField = (target: EventTarget) => target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ? target : null;

// What to fix, in words, for the constraint the browser found broken. The constraints themselves are the fields' own attributes.
const emailProblem = "Enter an email address in the format name@company.com.";
const missing: Record<string, string> = { name: "Enter your name.", company: "Enter your organization.", email: "Enter your email.", training_topic: "Enter the training topic." };
const mismatch: Record<string, string> = { email: emailProblem, phone: "Enter a phone number using digits, spaces and +.", participants: "Enter a number from 1 to 100,000." };
function problem(field: Field) {
  const { validity } = field;
  if (validity.valueMissing) return missing[field.name] ?? field.validationMessage;
  if (validity.typeMismatch && field.type === "email") return emailProblem;
  if (validity.patternMismatch) return mismatch[field.name] ?? field.validationMessage;
  return field.validationMessage;
}

// An unsent draft is kept in this tab's session storage, so following a link (the privacy policy) and coming back
// does not empty the form. Storage can be missing or throw (private modes, blocked site data); the form works the
// same without it.
const DRAFT_KEY = "tg-enquiry-draft";
const draftFields = ["name", "email", "company", "phone", "training_topic", "message", "participants", "format"];
const storage = {
  read: (key: string) => { try { return JSON.parse(sessionStorage.getItem(key) ?? "null") as unknown; } catch { return null; } },
  write: (key: string, value: unknown) => { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* not kept */ } },
  remove: (key: string) => { try { sessionStorage.removeItem(key); } catch { /* nothing to remove */ } },
};

/**
 * Hands a ?topic= in the URL to the form: a programme or topic link can name the topic
 * (/contact-us?topic=ITIL%204%20Foundation), on arrival or from the site search while the form is already open. Only
 * a topic name travels in the URL. It renders nothing and sits in its own Suspense boundary, so only it waits for the
 * URL when the page is prerendered: the form itself stays in the HTML.
 */
function LinkedTopic({ onTopic }: { onTopic: (topic: string | null) => void }) {
  const linked = useSearchParams().get("topic")?.trim().slice(0, 160) || null;
  useEffect(() => { onTopic(linked); }, [linked, onTopic]);
  return null;
}

// Where Enter moves while the form is incomplete: the next field the visitor can see, in form order. Fields folded
// into the closed optional row are passed over, and a radio group counts once (its checked radio, or its first).
function canTakeFocus(element: Element) {
  if (element.closest("details:not([open])") || element.getClientRects().length === 0) return false;
  if (element instanceof HTMLButtonElement || element instanceof HTMLTextAreaElement) return true;
  if (!(element instanceof HTMLInputElement)) return false;
  if (element.type !== "radio") return true;
  const group = element.form?.elements.namedItem(element.name);
  return element.checked || (group instanceof RadioNodeList && !group.value && group[0] === element);
}

/**
 * A titled group of fields, opened by a hairline rule rather than a box. The rule sits on a wrapper,
 * because a fieldset's own border would break around its legend.
 */
function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return <div className="border-t border-border pt-6 sm:pt-8">
    <fieldset className="min-w-0">
      <legend className="type-h4 text-foreground">{legend}</legend>
      <div className="mt-5 space-y-6 sm:mt-7 sm:space-y-7">{children}</div>
    </fieldset>
  </div>;
}

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  // Set when a send has run on for 20 seconds with the page still open: the button is re-enabled with a note under it.
  const [stalled, setStalled] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const [topicChanged, setTopicChanged] = useState(false);
  // Set once the visitor types in the Training topic field, and cleared when a URL topic is put into it.
  const topicEdited = useRef(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const focusNext = useRef<Field | null>(null);
  const validating = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const moreRef = useRef<HTMLDetailsElement>(null);
  const saveTimer = useRef<number | undefined>(undefined);
  const stopWaiting = useRef<() => void>(() => {});

  // On arrival the form takes back an unsent draft from this tab, into the fields that are still empty. A draft value
  // inside the folded optional row opens it, so nothing restored is hidden.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const stored = storage.read(DRAFT_KEY);
    const draft = stored && typeof stored === "object" ? stored as Record<string, unknown> : {};
    for (const name of draftFields) {
      const field = form.elements.namedItem(name) as Field | RadioNodeList | null;
      const value = draft[name];
      if (!field || typeof value !== "string" || !value || field.value) continue;
      field.value = value;
      const fold = moreRef.current;
      if (fold?.contains(field instanceof RadioNodeList ? field[0] : field)) fold.open = true;
    }
  }, []);

  // The optional fields fold into a closed <details> on phones and sit open from md. CSS opens its content at md
  // (::details-content); where that is unsupported, this sets `open` once the viewport reaches md.
  useEffect(() => {
    const details = moreRef.current;
    if (!details) return;
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => { if (wide.matches) details.open = true; };
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);

  // A pending draft save is written at once when the page is left or the form unmounts (a link to another page),
  // and the send timer stops. A page restored from the back/forward cache keeps React state, so the button is
  // re-enabled when the visitor returns.
  useEffect(() => {
    const form = formRef.current;
    const flush = () => { if (saveTimer.current !== undefined) { window.clearTimeout(saveTimer.current); saveTimer.current = undefined; if (form) saveDraft(form); } };
    const onPageHide = () => { flush(); stopWaiting.current(); };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) { stopWaiting.current(); setSubmitting(false); setStalled(false); } };
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    return () => { window.removeEventListener("pagehide", onPageHide); window.removeEventListener("pageshow", onPageShow); onPageHide(); };
  }, []);

  // A topic in the URL, on arrival or whenever it changes, fills the Training topic field ahead of a restored draft
  // and is named under the heading. It never replaces what the visitor has typed there: only an empty field, or one
  // they have not edited, takes the new topic. The visitor can still change it.
  const onTopic = useCallback((next: string | null) => {
    const field = formRef.current?.elements.namedItem("training_topic");
    if (!(field instanceof HTMLInputElement)) return;
    if (next && (!topicEdited.current || !field.value.trim())) {
      field.value = next;
      topicEdited.current = false;
      setErrors((current) => { if (!current.training_topic) return current; const next = { ...current }; delete next.training_topic; return next; });
    }
    setTopic(next);
    setTopicChanged(Boolean(next) && field.value.trim() !== next);
  }, []);

  // Focus moves once the messages are rendered, so a screen reader hears the field together with its error.
  useEffect(() => { focusNext.current?.focus(); focusNext.current = null; }, [errors]);

  // The form posts natively to FormSubmit; this only blocks repeat submissions while the first one is in flight.
  // A submit event means the browser found the form valid, so the draft goes and the thank-you page is told what
  // was sent. If the page is still here, and visible, 20 seconds later, the send has stalled (a slow or lost
  // connection): the button comes back with a note, rather than reading "Sending…" for ever. A hidden page is
  // checked again when it is shown.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (submitting) { event.preventDefault(); return; }
    const data = new FormData(event.currentTarget);
    window.clearTimeout(saveTimer.current);
    saveTimer.current = undefined;
    storage.remove(DRAFT_KEY);
    storage.write(ENQUIRY_SENT_KEY, { email: String(data.get("email") ?? "").trim(), topic: String(data.get("training_topic") ?? "").trim() });
    setStalled(false);
    setSubmitting(true);
    stopWaiting.current();
    const stall = () => { stopWaiting.current(); setSubmitting(false); setStalled(true); };
    const onVisible = () => { if (document.visibilityState === "visible") stall(); };
    const timer = window.setTimeout(() => { if (document.visibilityState === "visible") stall(); else document.addEventListener("visibilitychange", onVisible); }, 20000);
    stopWaiting.current = () => { window.clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); stopWaiting.current = () => {}; };
  };

  // The browser still validates on submit and fires "invalid" at each broken field in order. The page shows its
  // own message under each one instead of the browser's passing tooltip, and focuses the first.
  const show = (field: Field) => setErrors((current) => {
    const next = { ...current };
    if (field.validity.valid) delete next[field.name]; else next[field.name] = problem(field);
    return next;
  });
  const onInvalid = (event: FormEvent<HTMLFormElement>) => {
    const field = asField(event.target);
    if (!field?.name) return;
    event.preventDefault();
    // A broken optional field folded away on a phone is shown before it takes focus and its message.
    const fold = field.closest("details");
    if (fold && !fold.open) fold.open = true;
    // One submit fires all its "invalid" events in the same task; only the first of them takes focus.
    if (!validating.current) { validating.current = true; focusNext.current = field; window.setTimeout(() => { validating.current = false; }); }
    show(field);
  };

  // A field the visitor leaves invalid gets its message with its danger border; a message follows the
  // field as it is corrected, and goes once the value is valid.
  const onBlur = (event: FocusEvent<HTMLFormElement>) => {
    const field = asField(event.target);
    if (!field?.name || field.type === "radio") return;
    let leftInvalid = false;
    try { leftInvalid = field.matches(":user-invalid"); } catch { /* without :user-invalid support, messages wait for submit */ }
    if (leftInvalid) show(field);
  };
  // Each change also saves the draft, about 300ms after the typing stops. The carried-over topic line goes while the
  // visitor's topic differs from it, so it never contradicts the field.
  const onInput = (event: FormEvent<HTMLFormElement>) => {
    const field = asField(event.target);
    if (field && errors[field.name]) show(field);
    if (field?.name === "training_topic") { topicEdited.current = true; if (topic) setTopicChanged(field.value.trim() !== topic); }
    const form = event.currentTarget;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => { saveTimer.current = undefined; saveDraft(form); }, 300);
  };

  // Enter in a one-line field moves on to the next field while the form is still incomplete (a phone's "next" key),
  // instead of submitting it half filled; once every field is valid, Enter submits as usual. Validity is read, not
  // checked, so no "invalid" events fire and no messages appear.
  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    const field = event.target;
    if (event.key !== "Enter" || event.nativeEvent.isComposing || !(field instanceof HTMLInputElement) || field.type === "radio") return;
    const elements = Array.from(event.currentTarget.elements);
    if (!elements.some((element) => "validity" in element && !(element as HTMLInputElement).validity.valid)) return;
    event.preventDefault();
    (elements.slice(elements.indexOf(field) + 1).find(canTakeFocus) as HTMLElement | undefined)?.focus();
  };

  // A field's description is its hint, if it has one, then its error message while there is one.
  const check = (name: string, hint?: string) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": [hint, errors[name] && errorId(name)].filter(Boolean).join(" ") || undefined,
  });
  // The message in words only (no icon); "Error:" is read out first, for screen readers.
  const error = (name: string) => errors[name] && <p id={errorId(name)} className="mt-2 type-label text-danger"><span className="sr-only">Error: </span>{errors[name]}</p>;

  return <form ref={formRef} action={`https://formsubmit.co/${CONTACT_INFO.email}`} method="POST" onSubmit={onSubmit} onInvalidCapture={onInvalid} onBlur={onBlur} onInput={onInput} onKeyDown={onKeyDown} aria-labelledby="contact-form-title" className="min-w-0">
    <input type="hidden" name="_subject" value="New TraininGenie website enquiry" />
    <input type="hidden" name="_next" value={`${SITE_URL}/thank-you`} />
    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {/* FormSubmit's own reCAPTCHA page is turned off, so a visitor is never sent off the site to solve one; the honeypot above stays. */}
    <input type="hidden" name="_captcha" value="false" />
    <Suspense fallback={null}><LinkedTopic onTopic={onTopic} /></Suspense>

    {/* The form sits open on the page: a heading, then each fieldset under its own rule. */}
    <h2 id="contact-form-title" className="type-h2 text-foreground">Send an enquiry</h2>
    {topic && !topicChanged && <p className="mt-3 type-ui text-foreground">About {topic}.</p>}

    <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-14">
      <Group legend="Your details">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
          <div className="min-w-0 sm:col-span-2"><label className={fieldLabel}>Name<input required name="name" autoComplete="name" autoCapitalize="words" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={120} className={input} {...check("name")} /></label>{error("name")}</div>
          <div className="min-w-0"><label className={fieldLabel}>Email<input required type="email" name="email" autoComplete="email" inputMode="email" pattern={emailPattern} spellCheck={false} enterKeyHint="next" maxLength={254} className={input} {...check("email")} /></label>{error("email")}</div>
          <div className="min-w-0"><label className={fieldLabel}>Organization<input required name="company" autoComplete="organization" autoCapitalize="words" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={160} className={input} {...check("company")} /></label>{error("company")}</div>
          {/* The hint sits between the label and the box, as under Message. */}
          <div className="min-w-0">
            <label htmlFor="contact-phone" className={fieldLabel}>Phone<Optional /></label>
            <p id={phoneHint} className="mt-1 type-caption text-muted-foreground">With the country code, such as +91 for India.</p>
            <input id="contact-phone" type="tel" name="phone" autoComplete="tel" inputMode="tel" pattern={phonePattern} enterKeyHint="next" maxLength={30} className={input} {...check("phone", phoneHint)} />
            {error("phone")}
          </div>
        </div>
      </Group>

      <Group legend="Your requirement">
        <div className="min-w-0"><label className={fieldLabel}>Training topic<input required name="training_topic" list="topic-suggestions" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={160} className={`${input} [&::-webkit-calendar-picker-indicator]:hidden`} {...check("training_topic")} /></label>{error("training_topic")}
          <datalist id="topic-suggestions">{topicSuggestions.map((title) => <option key={title} value={title} />)}</datalist>
        </div>
        {/* The hint sits between the label and the box, outside the label, so it is read as the description, not the name. */}
        <div className="min-w-0">
          <label htmlFor="contact-message" className={fieldLabel}>Message<Optional /></label>
          <p id={messageHint} className="mt-1 type-caption text-muted-foreground">Who the training is for and the desired outcome.</p>
          <textarea id="contact-message" name="message" rows={5} maxLength={5000} className={`${control} min-h-36 resize-y py-3`} {...check("message", messageHint)} />
          {error("message")}
        </div>
      </Group>

      {/* The two remaining optional fields. On phones they fold into one hairline row, so the form opens on its
          four required fields and the phone number; from md the row is hidden and the fields stand open as the
          form's third group. */}
      <details ref={moreRef} className="group/more border-t border-border md:border-0 md:[&::details-content]:block md:[&::details-content]:[content-visibility:visible]">
        <summary className="group/summary flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 type-ui font-medium text-foreground md:hidden [&::-webkit-details-marker]:hidden">
          {/* Plain wrapping, so a narrow phone breaks before "(optional)" rather than mid-phrase. */}
          <span className="decoration-1 underline-offset-4 [text-wrap:wrap] group-hover/summary:underline">Add participants and format <span className="whitespace-nowrap font-normal text-muted-foreground">(optional)</span></span>
          <PlusIcon className="size-[18px] text-foreground transition-transform duration-200 group-open/more:rotate-45" />
        </summary>
        <div className="pb-8 pt-3 md:border-t md:border-border md:pb-0 md:pt-8">
          <fieldset className="min-w-0">
            <legend className="type-h4 text-foreground max-md:sr-only">Optional details</legend>
            <div className="space-y-6 md:mt-7 md:space-y-7">
              {/* A text field with a number pattern: no native stepper, and no wheel or arrow key changes the count by accident. */}
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
                <div className="min-w-0"><label className={fieldLabel}>Number of participants<input type="text" name="participants" inputMode="numeric" pattern="[1-9][0-9]{0,4}|100000" maxLength={6} autoComplete="off" enterKeyHint="next" className={input} {...check("participants")} /></label>{error("participants")}</div>
              </div>
              {/* Native radios in one open row, no tiles. Each label is a 44px-tall target. Checked is Nike's
                  ink radio: a black ring, a white gap and a black centre. */}
              <fieldset className="min-w-0">
                <legend className={fieldLabel}>Preferred format</legend>
                <div className="mt-2 grid grid-cols-2 gap-x-6 sm:flex sm:flex-wrap sm:gap-x-8">
                  {formats.map((format) => <label key={format} className="group/format inline-flex min-h-11 cursor-pointer items-center gap-3 type-ui text-foreground">
                    <input type="radio" name="format" value={format} className="size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-input bg-surface transition-[background-color,border-color,box-shadow] duration-200 not-checked:group-hover/format:border-foreground checked:border-foreground checked:bg-foreground checked:shadow-[inset_0_0_0_3.5px_var(--surface)] forced-colors:appearance-auto" />
                    {format}
                  </label>)}
                </div>
              </fieldset>
            </div>
          </fieldset>
        </div>
      </details>
    </div>

    {/* On phones the submit row's rule closes the optional row above it; from md it keeps the groups' spacing.
        Where the enquiry goes, and what the site does not do, is read just before the button. */}
    <div className="border-t border-border pt-6 sm:pt-8 md:mt-14">
      <p className="max-w-measure type-ui text-copy">Your enquiry is sent to TraininGenie by email through FormSubmit and used only to respond to you. This website does not use cookies, analytics or advertising trackers. Read the <Link href="/privacy-policy" className={inlineLink}>privacy policy</Link>.</p>
      {/* Not natively disabled while sending, so keyboard focus stays on the button; onSubmit blocks repeats. A mouse
          press does not move focus off the field being typed in, so a message that field shows on blur cannot shift
          the button between press and release (WebKit then loses the click). Keyboard and touch are unchanged. */}
      <Button type="submit" aria-disabled={submitting} onMouseDown={(event) => event.preventDefault()} className="mt-6 aria-disabled:cursor-progress aria-disabled:opacity-60 max-sm:w-full">{submitting ? "Sending…" : "Request a training proposal"}</Button>
      <div role="status">
        {submitting && <span className="sr-only">Sending your enquiry…</span>}
        {stalled && <p className="mt-4 max-w-measure type-ui text-copy">Still sending. If nothing changes, check your connection and try again, or email <a href={`mailto:${CONTACT_INFO.email}`} className={`${inlineLink} wrap-anywhere`}>{CONTACT_INFO.email}</a>.</p>}
      </div>
    </div>
  </form>;
}

/** Writes the named fields that have a value to the tab's draft, or removes the draft once they are all empty. */
function saveDraft(form: HTMLFormElement) {
  const data = new FormData(form);
  const draft = Object.fromEntries(draftFields.map((name) => [name, String(data.get(name) ?? "")]).filter(([, value]) => value.trim()));
  if (Object.keys(draft).length) storage.write(DRAFT_KEY, draft); else storage.remove(DRAFT_KEY);
}

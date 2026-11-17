"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/tg/button";
import { ChevronIcon } from "@/components/tg/icons";
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
// Required fields carry no mark: three of them are (a line under the heading says so), and the rest say "(optional)" in grey after the label.
const Optional = () => <span className="font-normal text-muted-foreground"> (optional)</span>;
const formats = ["Online", "Onsite", "Hybrid", "Not sure yet"];
// The kind of request goes into the email subject, so a repeat batch or a quotation stands out in the inbox.
const requestTypes = ["Training enquiry", "Training for myself", "Quick question", "Repeat or new batch of a previous programme", "Formal quotation or proposal", "Vendor registration documents"];
const examChoices = ["Yes", "No", "Not sure"];
const defaultSubject = "New TraininGenie website enquiry";
const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";

// The browser compiles `pattern` with the `v` flag, so parentheses and hyphens inside a class are escaped.
const emailPattern = String.raw`[^@\s]+@[^@\s]+\.[^@\s]{2,}`;
const phonePattern = String.raw`[0-9+\(\)\s.\-]{7,30}`;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
const errorId = (name: string) => `contact-${name}-error`;
const messageHint = "contact-message-hint";
const phoneHint = "contact-phone-hint";
const topicHint = "contact-topic-hint";
// The Training topic field suggests the programme and area titles as the visitor types, and offers them as chips under
// it (with "Not sure yet"); any other topic can still be typed.
const topicSuggestions = [...COURSES.map((course) => course.title), ...TRAINING_PILLARS.map((pillar) => pillar.title)];
// "Not sure yet" leads; on phones only the programme chips show, so the four area chips are hidden there.
const topicChips = ["Not sure yet", ...topicSuggestions];
const programmeCount = COURSES.length;
const vendorType = "Vendor registration documents";
const locationsHint = "contact-locations-hint";
const timeframeHint = "contact-timeframe-hint";
const asField = (target: EventTarget) => target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement ? target : null;

// What to fix, in words, for the constraint the browser found broken. The constraints themselves are the fields' own attributes.
const emailProblem = "Enter an email like name@company.com.";
const missing: Record<string, string> = { name: "Enter your name.", email: "Enter your email, like name@company.com.", training_topic: "Enter a training topic, or tap Not sure yet." };
const mismatch: Record<string, string> = { email: emailProblem, phone: "Enter a phone number using digits, spaces and +, for example +91 98765 43210.", participants: "Enter the number of participants as a whole number, for example 12." };
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
const draftFields = ["name", "email", "company", "phone", "training_topic", "message", "participants", "format", "request_type", "locations", "timeframe", "exam"];
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
function LinkedTopic({ onTopic, onVendor }: { onTopic: (topic: string | null) => void; onVendor: () => void }) {
  const params = useSearchParams();
  const linked = params.get("topic")?.trim().slice(0, 160) || null;
  const vendor = params.get("type") === "vendor";
  useEffect(() => { onTopic(linked); }, [linked, onTopic]);
  // ?type=vendor preselects "Vendor registration documents", only while the visitor has chosen no type.
  useEffect(() => { if (vendor) onVendor(); }, [vendor, onVendor]);
  return null;
}

// Where Enter moves while the form is incomplete: the next field the visitor can see, in form order. Topic chips are
// passed over, and a radio group counts once (its checked radio, or its first).
function canTakeFocus(element: Element) {
  if (element.getClientRects().length === 0 || element.hasAttribute("data-chip")) return false;
  if (element instanceof HTMLButtonElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) return true;
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
  const saveTimer = useRef<number | undefined>(undefined);
  const stopWaiting = useRef<() => void>(() => {});
  // The chosen request type (vendor documents changes the button and makes the topic optional), the topic text (for
  // the chips' added state) and the last chip press, announced in the status region.
  const [requestType, setRequestType] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [chipNote, setChipNote] = useState("");
  const vendor = requestType === vendorType;

  // On arrival the form takes back an unsent draft from this tab, into the fields that are still empty.
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
    }
    const type = form.elements.namedItem("request_type");
    if (type instanceof HTMLSelectElement) setRequestType(type.value);
    const topicField = form.elements.namedItem("training_topic");
    if (topicField instanceof HTMLInputElement) setTopicValue(topicField.value);
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
    setTopicValue(field.value);
    setTopicChanged(Boolean(next) && field.value.trim() !== next);
  }, []);
  const onVendor = useCallback(() => {
    const field = formRef.current?.elements.namedItem("request_type");
    if (!(field instanceof HTMLSelectElement) || field.value) return;
    field.value = vendorType;
    setRequestType(vendorType);
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
    // The request type, unless it is a plain enquiry, goes into the subject; the browser reads the fields after this.
    const subject = event.currentTarget.elements.namedItem("_subject");
    const requestType = String(data.get("request_type") ?? "");
    if (subject instanceof HTMLInputElement) subject.value = requestType && requestType !== requestTypes[0] ? `${defaultSubject}: ${requestType}` : defaultSubject;
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
    if (field?.name === "request_type") setRequestType(field.value);
    if (field?.name === "training_topic") { setTopicValue(field.value); topicEdited.current = true; if (topic) setTopicChanged(field.value.trim() !== topic); }
    const form = event.currentTarget;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => { saveTimer.current = undefined; saveDraft(form); }, 300);
  };

  // A tapped chip fills an empty Training topic field, or adds itself after what is there (never replacing it), and
  // the field announces the change as typing would. "Not sure yet" only fills an empty field.
  const addTopic = (chip: string) => {
    const field = formRef.current?.elements.namedItem("training_topic");
    if (!(field instanceof HTMLInputElement)) return;
    const current = field.value.trim();
    if (current.toLowerCase().includes(chip.toLowerCase()) || (current && chip === "Not sure yet")) { setChipNote(`${chip}: already added`); return; }
    setChipNote(`${chip} added to Training topic`);
    field.value = (current ? `${current}, ${chip}` : chip).slice(0, field.maxLength);
    field.dispatchEvent(new Event("input", { bubbles: true }));
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
    <input type="hidden" name="_subject" defaultValue={defaultSubject} />
    <input type="hidden" name="_next" value={`${SITE_URL}/thank-you`} />
    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    {/* FormSubmit's own reCAPTCHA page is turned off, so a visitor is never sent off the site to solve one; the honeypot above stays. */}
    <input type="hidden" name="_captcha" value="false" />
    <Suspense fallback={null}><LinkedTopic onTopic={onTopic} onVendor={onVendor} /></Suspense>

    {/* The form sits open on the page: a heading, then each fieldset under its own rule. */}
    <h2 id="contact-form-title" className="type-h2 text-foreground">Send an enquiry</h2>
    <p className="mt-3 type-ui text-copy">All fields are required unless marked optional.</p>
    {topic && !topicChanged && <p className="mt-2 type-ui text-foreground">About {topic}.</p>}

    <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-14">
      <Group legend="Your details">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
          <div className="min-w-0 sm:col-span-2"><label className={fieldLabel}>Name<input required name="name" autoComplete="name" autoCapitalize="words" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={120} className={input} {...check("name")} /></label>{error("name")}</div>
          <div className="min-w-0"><label className={fieldLabel}>Email<input required type="email" name="email" autoComplete="email" inputMode="email" pattern={emailPattern} spellCheck={false} enterKeyHint="next" maxLength={254} className={input} {...check("email")} /></label>{error("email")}</div>
          <div className="min-w-0"><label className={fieldLabel}>Organization<Optional /><input name="company" autoComplete="organization" autoCapitalize="words" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={160} className={input} {...check("company")} /></label>{error("company")}</div>
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
        {/* The request type comes first: vendor documents need no training topic. Its change reaches onInput. */}
        <div className="min-w-0"><label className={fieldLabel}>Type of request<Optional /><span className="relative block"><select name="request_type" defaultValue="" className={`${input} cursor-pointer appearance-none truncate pr-11`}><option value="">Choose one</option>{requestTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select><ChevronIcon className="pointer-events-none absolute right-4 top-[calc(50%+5px)] size-3.5 -translate-y-1/2 text-foreground" /></span></label></div>
        <div className="min-w-0">
          <label htmlFor="contact-topic" className={fieldLabel}>Training topic{vendor && <Optional />}</label>
          <p id={topicHint} className="mt-1 type-caption text-muted-foreground">One or more topics, for example ISO 9001 awareness and communication skills.</p>
          <input id="contact-topic" required={!vendor} name="training_topic" list="topic-suggestions" autoCorrect="off" spellCheck={false} enterKeyHint="next" maxLength={160} className={`${input} [&::-webkit-calendar-picker-indicator]:hidden`} {...check("training_topic", topicHint)} />
          {error("training_topic")}
          <datalist id="topic-suggestions">{topicSuggestions.map((title) => <option key={title} value={title} />)}</datalist>
          {/* Hairline chips that wrap at every width, 44px tall on phones: a tap adds the topic to the field above. A chip
              whose topic is already in the field is filled ink, with a check, and pressed. */}
          <ul aria-label="Suggested topics" className="mt-3 flex flex-wrap gap-2">
            {topicChips.map((chip, index) => {
              const added = topicValue.toLowerCase().includes(chip.toLowerCase());
              return <li key={chip} className={index > programmeCount ? "max-sm:hidden" : undefined}><button type="button" data-chip aria-pressed={added} aria-label={`Add topic: ${chip}`} onClick={() => addTopic(chip)} className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border bg-surface px-4 type-label text-foreground transition-colors duration-200 hover:border-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background sm:min-h-9">{added && <span aria-hidden="true">✓</span>}{chip}</button></li>;
            })}
          </ul>
        </div>
        {/* The hint sits between the label and the box, outside the label, so it is read as the description, not the name. */}
        <div className="min-w-0">
          <label htmlFor="contact-message" className={fieldLabel}>Message<Optional /></label>
          <p id={messageHint} className="mt-1 type-caption text-muted-foreground">Who the training is for and the desired outcome.</p>
          <textarea id="contact-message" name="message" rows={5} maxLength={5000} className={`${control} min-h-36 resize-y py-3`} {...check("message", messageHint)} />
          {error("message")}
        </div>
      </Group>

      {/* The optional details stand open as the form's third group, on phones too, so nobody misses them. */}
      <Group legend="Optional details">
        {/* A text field with a number pattern: no native stepper, and no wheel or arrow key changes the count by accident. */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-7">
          <div className="min-w-0"><label className={fieldLabel}>Number of participants<Optional /><input type="text" name="participants" inputMode="numeric" pattern="[1-9][0-9]{0,4}|100000" maxLength={6} autoComplete="off" enterKeyHint="next" className={input} {...check("participants")} /></label>{error("participants")}</div>
          <div className="min-w-0">
            <label htmlFor="contact-locations" className={fieldLabel}>Participant location(s)<Optional /></label>
            <p id={locationsHint} className="mt-1 type-caption text-muted-foreground">For example Pune, or teams in India and UAE.</p>
            <input id="contact-locations" name="locations" autoCorrect="off" enterKeyHint="next" maxLength={200} className={input} aria-describedby={locationsHint} />
          </div>
          <div className="min-w-0">
            <label htmlFor="contact-timeframe" className={fieldLabel}>Preferred timeframe<Optional /></label>
            <p id={timeframeHint} className="mt-1 type-caption text-muted-foreground">For example next quarter.</p>
            <input id="contact-timeframe" name="timeframe" enterKeyHint="next" maxLength={120} className={input} aria-describedby={timeframeHint} />
          </div>
        </div>
        {/* Native radios in one open row, no tiles. Each label is a 44px-tall target. Checked is Nike's
            ink radio: a black ring, a white gap and a black centre. */}
        {[{ legend: "Preferred format", name: "format", options: formats }, { legend: "Certification exam needed?", name: "exam", options: examChoices }].map((group) => <fieldset key={group.name} className="min-w-0">
          <legend className={fieldLabel}>{group.legend}<Optional /></legend>
          <div className="mt-2 grid grid-cols-2 gap-x-6 sm:flex sm:flex-wrap sm:gap-x-8">
            {group.options.map((option) => <label key={option} className="group/format inline-flex min-h-11 cursor-pointer items-center gap-3 type-ui text-foreground">
              <input type="radio" name={group.name} value={option} className="size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-input bg-surface transition-[background-color,border-color,box-shadow] duration-200 not-checked:group-hover/format:border-foreground checked:border-foreground checked:bg-foreground checked:shadow-[inset_0_0_0_3.5px_var(--surface)] forced-colors:appearance-auto" />
              {option}
            </label>)}
          </div>
        </fieldset>)}
      </Group>
    </div>

    {/* Where the enquiry goes, and what the site does not do, is read just before the button. */}
    <div className="mt-10 border-t border-border pt-6 sm:mt-14 sm:pt-8">
      <p className="max-w-measure type-ui text-copy">Your enquiry is sent to TraininGenie by email through FormSubmit and used only to respond to you. This website does not use cookies, analytics or advertising trackers. Read the <Link href="/privacy-policy" className={inlineLink}>privacy policy</Link>.</p>
      {/* Not natively disabled while sending, so keyboard focus stays on the button; onSubmit blocks repeats. A mouse
          press does not move focus off the field being typed in, so a message that field shows on blur cannot shift
          the button between press and release (WebKit then loses the click). Keyboard and touch are unchanged. */}
      <Button type="submit" aria-disabled={submitting} onMouseDown={(event) => event.preventDefault()} className="mt-6 aria-disabled:cursor-progress aria-disabled:opacity-60 max-sm:w-full">{submitting ? "Sending…" : vendor ? "Request vendor documents" : "Send enquiry"}</Button>
      <div role="status">
        {submitting && <span className="sr-only">Sending your enquiry…</span>}
        {!submitting && chipNote && <span className="sr-only">{chipNote}</span>}
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

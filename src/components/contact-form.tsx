"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CONTACT_INFO, SITE_URL } from "@/data";
import { buttonPrimary } from "@/lib/ui";

const input = "mt-2 block w-full min-w-0 rounded-md border border-input bg-background px-4 py-3 text-base font-normal text-foreground placeholder:text-slate-600/80";
const fieldLabel = "block min-w-0 text-sm font-semibold text-foreground";
const Required = () => <span aria-hidden="true" className="text-accent"> *</span>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  // A page restored from the back/forward cache keeps React state, so re-enable the button when the visitor returns.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) setSubmitting(false); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // The form posts natively to FormSubmit; this only blocks repeat submissions while the first one is in flight.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (submitting) { event.preventDefault(); return; }
    setSubmitting(true);
  };

  return <form action={`https://formsubmit.co/${CONTACT_INFO.email}`} method="POST" onSubmit={onSubmit} aria-describedby="contact-required-note" className="min-w-0 space-y-5 rounded-md border border-border bg-white p-5 sm:p-8">
    <input type="hidden" name="_subject" value="New TraininGenie website enquiry" />
    <input type="hidden" name="_next" value={`${SITE_URL}/thank-you`} />
    <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <p id="contact-required-note" className="text-sm text-slate-600">Fields marked <span className="text-accent">*</span> are required.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className={fieldLabel}>Name<Required /><input required name="name" autoComplete="name" maxLength={120} className={input} /></label>
      <label className={fieldLabel}>Company<Required /><input required name="company" autoComplete="organization" maxLength={160} className={input} /></label>
      <label className={fieldLabel}>Work email<Required /><input required type="email" name="email" autoComplete="email" inputMode="email" maxLength={254} className={input} /></label>
      <label className={fieldLabel}>Phone<input type="tel" name="phone" autoComplete="tel" inputMode="tel" maxLength={30} className={input} /></label>
      <label className={fieldLabel}>Training topic<Required /><input required name="training_topic" maxLength={160} className={input} /></label>
      <label className={fieldLabel}>Number of participants<input type="number" name="participants" inputMode="numeric" min={1} max={100000} className={input} /></label>
    </div>
    <label className={fieldLabel}>Preferred format<input name="format" placeholder="Online, onsite, or hybrid" maxLength={120} className={input} /></label>
    <label className={fieldLabel}>Message<Required /><textarea required name="message" rows={5} maxLength={5000} className={input} /></label>
    <p className="text-sm leading-relaxed text-slate-600">Your enquiry is sent to TraininGenie by email through FormSubmit and used only to respond to you. Read the <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-4">privacy policy</Link>.</p>
    <button type="submit" disabled={submitting} aria-disabled={submitting} className={`${buttonPrimary} max-md:w-full`}>{submitting ? "Sending…" : "Request a training proposal"}</button>
  </form>;
}

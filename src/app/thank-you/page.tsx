import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { buttonPrimary, eyebrow } from "@/lib/ui";
export const metadata: Metadata = { ...pageMetadata("Thank You", "Your TraininGenie enquiry has been received.", "/thank-you"), robots: { index: false, follow: false } };
export default function Page() { return <div className="mx-auto max-w-2xl px-5 pb-32 pt-48 text-center"><p className={eyebrow}>Enquiry sent</p><h1 className="mt-4 text-4xl font-extrabold tracking-[-0.05em]">Thank you</h1><p className="mt-5 text-lg leading-relaxed text-slate-600">Your enquiry has been received. The TraininGenie team will follow up using the details you provided.</p><Link href="/" className={`${buttonPrimary} mt-8`}>Return home</Link></div>; }

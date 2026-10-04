import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = { ...pageMetadata("Thank You", "Your TraininGenie enquiry has been received.", "/thank-you"), robots: { index: false, follow: false } };
export default function Page() { return <div className="mx-auto max-w-2xl px-5 py-48 text-center"><h1 className="text-4xl font-extrabold">Thank you</h1><p className="mt-5 text-muted-foreground">Your enquiry has been received. The TraininGenie team can follow up using the details you provided.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 font-bold text-background">Return home</Link></div>; }

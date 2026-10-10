import Link from "next/link";
import type { Metadata } from "next";
import { DocumentTitle } from "@/components/document-title";
import { COMPANY_NAME } from "@/data";
import { buttonPrimary, buttonSecondary, eyebrow } from "@/lib/ui";
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };
export default function NotFound() { return <><DocumentTitle title={`Page not found | ${COMPANY_NAME}`} /><div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 pb-24 pt-40 text-center"><p className={eyebrow}>404</p><h1 className="mt-4 text-4xl font-medium tracking-[-0.05em]">Page not found</h1><p className="mt-4 text-lg leading-relaxed text-slate-600">The page you are looking for does not exist or has moved.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/" className={buttonPrimary}>Return home</Link><Link href="/corporate-training-services" className={buttonSecondary}>Explore training</Link></div></div></>; }

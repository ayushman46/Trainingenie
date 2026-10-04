import type { Metadata } from "next";
import { COMPANY_NAME, SITE_URL } from "@/data";
export function pageMetadata(title: string, description: string, path: string): Metadata { const fullTitle = title === COMPANY_NAME ? title : `${title} | ${COMPANY_NAME}`; return { title, description, alternates: { canonical: `${SITE_URL}${path}` }, openGraph: { title: fullTitle, description, url: `${SITE_URL}${path}`, siteName: COMPANY_NAME, type: "website" }, twitter: { card: "summary", title: fullTitle, description }, robots: { index: true, follow: true } }; }
export function jsonLd(data: Record<string, unknown>) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }

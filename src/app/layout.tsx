import type { Metadata } from "next";
import "./globals.css";
import { plusJakarta } from "./fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { COMPANY_DESCRIPTION, COMPANY_NAME, SITE_URL, CONTACT_INFO } from "@/data";
import { jsonLd } from "@/lib/seo";
export const metadata: Metadata = { metadataBase: new URL(SITE_URL), title: { default: COMPANY_NAME, template: `%s | ${COMPANY_NAME}` }, description: COMPANY_DESCRIPTION, alternates: { canonical: SITE_URL }, openGraph: { siteName: COMPANY_NAME, type: "website", url: SITE_URL, title: COMPANY_NAME, description: COMPANY_DESCRIPTION }, robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={plusJakarta.variable}><Navbar /><main>{children}</main><Footer />{jsonLd({ "@context": "https://schema.org", "@type": "Organization", name: COMPANY_NAME, url: SITE_URL, description: COMPANY_DESCRIPTION, email: CONTACT_INFO.email, telephone: CONTACT_INFO.phones, founder: { "@type": "Person", name: "Mousumi Chakraborty", jobTitle: "Founder Director" }, areaServed: ["Bengaluru", "Kolkata", "India"], sameAs: ["https://www.linkedin.com/company/trainingenie/", "https://www.linkedin.com/in/mousumi-chakraborty-468b1916/"] })}</body></html>; }

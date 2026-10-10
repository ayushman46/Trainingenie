import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { textLink } from "@/lib/ui";
export const metadata: Metadata = { ...pageMetadata("Blog and Resources", "Practical perspectives on corporate training, technology learning, leadership, and management systems.", "/blog"), robots: { index: false, follow: true } };
export default function Page() { return <PageShell title="Blog and Resources" label="Blog" intro="Insights, buyer guides, checklists, and practical learning resources from TraininGenie."><section className="mt-16 border-y border-border py-12"><p className="max-w-2xl text-lg leading-relaxed text-slate-600">Articles, buyer guides, and practical learning resources are on the way. In the meantime, browse the <Link href="/corporate-training-services" className={textLink}>training catalogue</Link> or read the <Link href="/faqs" className={textLink}>FAQs</Link>.</p></section></PageShell>; }

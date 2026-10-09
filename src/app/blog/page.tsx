import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = { ...pageMetadata("Blog and Resources", "Practical perspectives on corporate training, technology learning, leadership, and management systems.", "/blog"), robots: { index: false, follow: true } };
export default function Page() { return <PageShell title="Blog and Resources" intro="A structured home for future TraininGenie insights, buyer guides, checklists, and practical learning resources."><section className="mt-16 border-y border-[#cfd5df] py-12"><p className="max-w-2xl text-lg leading-relaxed text-slate-600">Resources are being developed. Future articles will include a clear answer, author information, dates, references where appropriate, related commercial pages, and a useful next step. No placeholder articles are published here.</p></section></PageShell>; }

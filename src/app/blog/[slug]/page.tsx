import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClosingBand } from "@/components/tg/closing-band";
import { PageHero } from "@/components/tg/page-hero";
import { Section } from "@/components/tg/section";
import { TocNav } from "@/components/utility/toc-nav";
import { ARTICLES } from "@/content/articles";
import { COMPANY_NAME, COURSES, SITE_URL } from "@/data";
import { jsonLd, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";

export function generateStaticParams() { return ARTICLES.map((article) => ({ slug: article.slug })); }
// Only the articles above exist: any other path under /blog is the site's 404.
export const dynamicParams = false;
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { return params.then(({ slug }) => { const article = ARTICLES.find((item) => item.slug === slug); if (!article) return {}; const path = `/blog/${article.slug}`; const base = pageMetadata(article.metaTitle, article.description, path); return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: article.published, modifiedTime: article.updated } }; }); }

const inlineLink = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";
// "2026-11-23" -> "23 November 2026", without depending on the build machine's time zone.
function longDate(iso: string) { const [year, month, day] = iso.split("-").map(Number); return `${day} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1]} ${year}`; }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = `${SITE_URL}/blog/${article.slug}`;
  const programmes = article.courses.map((courseSlug) => COURSES.find((course) => course.slug === courseSlug)).filter((course) => course !== undefined);

  return <>
    {/* The answer is the lead: the first thing under the h1, in the page's raw HTML. */}
    <PageHero crumbs={[{ label: "Blog", href: "/blog" }, { label: article.title }]} label="Blog" title={article.title} lead={article.answer} meta={[`Updated ${longDate(article.updated)}`, `By ${COMPANY_NAME}`]} />

    <Section divider size="none" className="pb-12 pt-6 md:pb-20 md:pt-8 lg:py-24">
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-[116px]">
            <TocNav items={article.sections.map(({ id, heading }) => ({ id, label: heading }))} label="In this article" />
          </div>
        </div>

        <article className="min-w-0 lg:col-span-8 lg:col-start-4">
          {article.sections.map((section) => <div key={section.id} id={section.id} className="scroll-mt-28 border-t border-border pt-8 max-lg:first:border-t-0 max-lg:first:pt-0 [&+&]:mt-12">
            <h2 className="type-h3 text-foreground">{section.heading}</h2>
            <div className="mt-4 space-y-4 type-body text-copy [&>p]:max-w-measure [&>ul]:max-w-measure">{section.body}</div>
          </div>)}

          {programmes.length > 0 && <div className="mt-12 border-t border-border pt-8">
            <h2 className="type-h3 text-foreground">Related training</h2>
            <ul className="mt-4 space-y-3 type-body text-copy">
              {programmes.map((course) => <li key={course.slug}><Link href={`/${course.slug}`} className={inlineLink}>{course.title}</Link>: {course.description}</li>)}
            </ul>
          </div>}

          <p className="mt-12 max-w-measure border-t border-border pt-6 type-fine text-muted-foreground">Framework facts checked against PeopleCert&apos;s published material on {article.checked}. {article.note}</p>
        </article>
      </div>
    </Section>

    <ClosingBand />

    {jsonLd({ "@context": "https://schema.org", "@type": "Article", "@id": `${url}#article`, headline: article.title, description: article.description, abstract: article.answer, url, mainEntityOfPage: url, datePublished: article.published, dateModified: article.updated, inLanguage: "en-IN", author: { "@id": ORGANIZATION_ID }, publisher: { "@id": ORGANIZATION_ID }, image: `${SITE_URL}/opengraph-image`, about: programmes.map((course) => ({ "@type": "Thing", name: course.title.replace(/ Training$/, "") })) })}
  </>;
}

# TraininGenie SEO and Google Indexing Audit

Audit scope: the Next.js App Router source for `https://www.trainingenie.com/`.

## 1. Problems found

- The homepage had a brand tagline as its only H1, so the page topic was less explicit to search engines.
- The homepage canonical URL was generated through a different path normalization branch than the other pages.
- Sitemap entries used the current build time as `lastModified`, which would imply freshness that was not verified from repository history.
- `robots.txt` disallowed `/_next/`, which could unnecessarily prevent crawlers from fetching rendering assets.
- The homepage had only generic root metadata instead of a search-intent title for corporate training in India.
- The generated favicon route used a tall logo lockup rather than the compact brand icon.
- The project already had good foundations: App Router, server-rendered page content, page-level metadata for important routes, breadcrumbs, Organization and WebSite JSON-LD, path redirects, and a sitemap route.
- The blog page is intentionally thin because no verified articles are present. No filler content was added.

## 2. Changes made

### CODE FIXES

- Added homepage metadata for `Corporate Training Company in India | TraininGenie` through the existing metadata template.
- Added a natural homepage description covering the verified training areas.
- Changed the homepage H1 to `Corporate Training and Professional Learning in India` and preserved `Transcend Beyond Growth` as the visible tagline.
- Normalized all page canonical and Open Graph URLs, including the homepage root and its sitemap entry.
- Kept canonical URLs on `https://www.trainingenie.com`.
- Kept the authoritative Organization ID at `https://www.trainingenie.com/#organization`.
- Improved the existing Organization and WebSite JSON-LD with verified founder, LinkedIn, contact, area served, training catalogue, and topic information.
- Added a homepage CollectionPage and ItemList schema connected to the four training pillars.
- Removed fabricated sitemap modification timestamps and retained only crawl frequency and priority signals.
- Updated robots rules to allow public pages and Next.js assets, expose `/sitemap.xml`, and keep only utility/API areas restricted.
- Changed the generated icon asset to the existing compact TraininGenie icon.
- Added `public/llms.txt` as a concise, human-readable source of truth for AI systems and crawlers.
- Preserved existing breadcrumbs, internal links, course pages, FAQ schema, social links, redirects, and noindex treatment for the thank-you page.

## 3. Files changed

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/icon.png`
- `src/lib/seo.tsx`
- `public/llms.txt`
- `SEO_AUDIT.md`

## 4. Issues that cannot be solved in code

- Code cannot force Google to crawl, index, rank, or show a page instantly.
- Google Search Console ownership and indexing requests require access to the verified property.
- Google ranking for company names and training terms also depends on external authority, links, mentions, reviews where genuine, and ongoing useful content.
- HTTP to HTTPS and non-www to www redirects must be confirmed in the hosting or domain provider configuration. Next.js path redirects cannot replace a platform-level hostname redirect.
- The current blog has no verified article content. Publishing genuinely useful, authored resources is an editorial task, not something to solve with generated filler.

## 5. Google Search Console actions I must perform manually

1. Verify `https://www.trainingenie.com/` as a Domain property in Google Search Console.
2. Submit `https://www.trainingenie.com/sitemap.xml` under Sitemaps.
3. Use URL Inspection for `https://www.trainingenie.com/` and select Request indexing.
4. Confirm that the inspected URL is canonical, indexable, returns HTTP 200, and has no blocked resources.
5. Request indexing for the priority pages listed below.
6. Check Page indexing, Sitemaps, Core Web Vitals, and HTTPS reports after Google has crawled the deployment.

## 6. URLs to request indexing for first

- `https://www.trainingenie.com/`
- `https://www.trainingenie.com/corporate-training-services`
- `https://www.trainingenie.com/technology-training`
- `https://www.trainingenie.com/leadership-soft-skills-training`
- `https://www.trainingenie.com/itil-prince2-agile-training`
- `https://www.trainingenie.com/iso-standards-training`
- `https://www.trainingenie.com/itil-4-foundation-training`
- `https://www.trainingenie.com/prince2-training`
- `https://www.trainingenie.com/scrum-agile-training`
- `https://www.trainingenie.com/iso-27001-training`

## 7. External and off-page recommendations

- Link to the official website from the company LinkedIn page and keep the company name and website URL consistent.
- Ensure the founder LinkedIn profile and company profile identify the same official website where appropriate.
- Publish original, useful articles answering real buyer questions about corporate training, ITIL, ISO, leadership, technology, and Agile.
- Earn genuine links from partner organizations, event pages, professional associations, and relevant business directories. Do not buy links or use automated link schemes.
- Add genuine case studies, testimonials, locations, certifications, or awards only when the business can verify and approve the exact claims.
- Monitor branded searches and queries in Search Console rather than relying on instant results.

## 8. Tests performed

- `npm run lint` passed.
- `npx tsc --noEmit` passed.
- `npx next build --webpack` passed.
- Build output generated `/`, `/robots.txt`, `/sitemap.xml`, all training category pages, all configured course pages, and the utility routes.
- `git diff --check` passed.
- Repository inspection confirmed public page content is server-rendered through the App Router.

## Important limitation

The implementation is technically prepared for discovery and indexing. Search Console submission and ongoing external authority work are still required; no legitimate code change can guarantee immediate Google or AI visibility.

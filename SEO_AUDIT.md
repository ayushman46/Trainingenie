# TraininGenie SEO Audit

Audit date: 2026-10-05

## Executive result

The site is a Next.js App Router site with server-rendered marketing pages, one dynamic server-rendered course route, generated `robots.txt`, generated `sitemap.xml`, canonical metadata, Open Graph metadata, favicon and logo assets, organization and website JSON-LD, FAQ schema, course schema, breadcrumbs, legacy redirects, and a noindex utility route.

The site is technically ready for Google crawling once the production deployment is reachable at `https://www.trainingenie.com` and the owner verifies the domain in Google Search Console. Search visibility and rankings cannot be guaranteed by code.

## Changes made in this audit

- Added BreadcrumbList JSON-LD to every `PageShell` page while keeping visible semantic breadcrumbs.
- Added `noindex, follow` metadata to the custom 404 page.
- Kept `/thank-you` out of the index with page-level robots metadata.
- Added direct internal links from Technology to ReactJS, Leadership to Design Thinking, and ISO and GRC to ISO 27001 and ISO 9001.
- Preserved permanent redirects for `/about`, `/services`, `/contact`, and `/case-studies`.
- Kept canonical URLs on the `www` production origin through the shared metadata helper.
- Confirmed course pages use unique generated metadata and Course JSON-LD.
- Confirmed the FAQ page uses visible answers and matching FAQPage JSON-LD.
- Kept truthful organization information, verified LinkedIn URLs, and the current contact details.

## Route inventory

| URL | Component | Rendering | Intent | Indexability | Primary links or CTA |
|---|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Corporate training company | Index | Training pillars, About, Clients, Contact |
| `/about-us` | `src/app/about-us/page.tsx` | Server | About the learning partner | Index | Founder profile, Contact |
| `/corporate-training-services` | `src/app/corporate-training-services/page.tsx` | Server | Corporate training programmes | Index | Four pillars, past topics |
| `/technology-training` | `src/app/technology-training/page.tsx` | Server | Corporate technology training | Index | ReactJS, Contact |
| `/leadership-soft-skills-training` | `src/app/leadership-soft-skills-training/page.tsx` | Server | Leadership and soft skills training | Index | Design Thinking, Contact |
| `/itil-prince2-agile-training` | `src/app/itil-prince2-agile-training/page.tsx` | Server | Management systems training | Index | ITIL, PRINCE2, Scrum, Contact |
| `/iso-standards-training` | `src/app/iso-standards-training/page.tsx` | Server | ISO and GRC training | Index | ISO 27001, ISO 9001, Contact |
| `/training-methodology` | `src/app/training-methodology/page.tsx` | Server | Custom training methodology | Index | Contact via shared shell |
| `/past-trainings` | `src/app/past-trainings/page.tsx` | Server | Past training topics | Index | Contact via shared shell |
| `/clients-and-testimonials` | `src/app/clients-and-testimonials/page.tsx` | Server | Client references | Index | Contact via shared shell |
| `/our-team` | `src/app/our-team/page.tsx` | Server | Founder profile | Index | LinkedIn, Contact |
| `/faqs` | `src/app/faqs/page.tsx` | Server | Training buyer questions | Index | FAQ answers, Contact |
| `/blog` | `src/app/blog/page.tsx` | Server | Resources hub | Index | Content gap noted below |
| `/contact-us` | `src/app/contact-us/page.tsx` | Server | Commercial enquiry | Index | Form and contact details |
| `/[slug]` | `src/app/[slug]/page.tsx` | Server | Individual course intent | Index for seven known slugs | Parent pillar, Contact |
| `/thank-you` | `src/app/thank-you/page.tsx` | Server | Form utility response | Noindex | Home |
| unknown routes | `src/app/not-found.tsx` | Server | Error recovery | Noindex | Home, Training |

## Technical map

- Production canonical origin: `https://www.trainingenie.com`
- Sitemap: `/sitemap.xml`, generated from canonical route data
- Robots: `/robots.txt`, allows public content and references the sitemap
- Redirects: `/about`, `/services`, `/contact`, `/case-studies` permanently redirect to their canonical equivalents
- Metadata: shared `pageMetadata` helper plus route-specific metadata
- Organization data: Organization and WebSite JSON-LD in the root layout
- Course data: Course JSON-LD on dynamic course pages
- FAQ data: FAQPage JSON-LD on `/faqs`
- Breadcrumb data: BreadcrumbList JSON-LD on all `PageShell` pages
- Images: Next Image for the navigation logo; branded Open Graph and favicon assets are present
- Fonts: `next/font/google` with Plus Jakarta Sans; no CSS Google Fonts import

## Remaining content and authority gaps

- The live domain and deployment must be checked in Search Console; this environment cannot verify ownership or submit URLs.
- The resource hub has no published articles yet. Do not publish planned topics until real, useful articles are written.
- No approved client testimonials, delivery dates, participant counts, feedback scores, trainer biographies, or confirmed case studies are available in the supplied material.
- Google Business Profile, reviews, external citations, backlinks, and LinkedIn publishing require owner action.
- Redirect behavior for bare and non-`www` domains is controlled by the hosting and DNS provider and cannot be safely changed from this repository alone.

## Validation

- `npm run lint` passes.
- `npx tsc --noEmit` passes.
- `npx next build --webpack` passes.
- Live HTTP, redirect, and Search Console checks remain deployment-owner tasks.

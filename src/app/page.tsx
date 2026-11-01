import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EMBLEM_BY_PATH } from "@/components/brand/emblems";
import { BULB_DARK, BULB_LIGHT, ParticleBulb } from "@/components/brand/particle-bulb";
import { sloganFont } from "@/components/brand/slogan-font";
import { Cin } from "@/components/company/cin";
import { AREAS, TOTAL_TOPICS } from "@/components/site/areas";
import { ButtonLink } from "@/components/tg/button";
import { ClientProof } from "@/components/tg/client-proof";
import { ClosingBand } from "@/components/tg/closing-band";
import { Container } from "@/components/tg/container";
import { FactList } from "@/components/tg/fact-list";
import { LogoWall } from "@/components/tg/logo-wall";
import { MediaTile, MediaTileGrid } from "@/components/tg/media-tile";
import { PhaseLine } from "@/components/tg/phase-line";
import { Point } from "@/components/tg/point";
import { RowLink } from "@/components/tg/programme-list";
import { Section } from "@/components/tg/section";
import { HEAD, RowHead, SectionHead } from "@/components/tg/section-head";
import { TextLink } from "@/components/tg/text-link";
import { COMPANY_NAME, COMPANY_TAGLINE, CONTACT_INFO, COURSES, LEGAL_ENTITY, SITE_URL, TRAINING_PILLARS } from "@/data";
import { AUDIENCE_LINKS, AUDIENCES, LANDING_HERO, LANDING_POINTS, PRIMARY_CTA, UI_LABELS } from "@/data/site-copy";
import { jsonLd, ORGANIZATION_ID, SEO_KEYWORDS, WEBSITE_ID } from "@/lib/seo";

const homepageDescription = "TraininGenie provides corporate training in India across technology, leadership, soft skills, ITIL, PRINCE2, Agile, ISO standards and GRC.";
export const metadata: Metadata = { title: { absolute: `${COMPANY_NAME} | Corporate Training Company in India` }, description: homepageDescription, keywords: SEO_KEYWORDS, alternates: { canonical: `${SITE_URL}/` }, openGraph: { title: `${COMPANY_NAME} | Corporate Training Company in India`, description: homepageDescription, url: `${SITE_URL}/`, siteName: COMPANY_NAME, type: "website", locale: "en_IN" }, twitter: { card: "summary_large_image", title: `${COMPANY_NAME} | Corporate Training Company in India`, description: homepageDescription }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } } };

// The slogan, the hero's display line, one word per span so the last one can carry the CSS full stop.
const sloganWords = COMPANY_TAGLINE.split(" ");

// The page's one-line description: a quiet caption under the bulb from lg (its last line on the logo
// row's bottom edge), and at the end of the text column on phones, so the bulb has its whole column there.
const heroCaption = "Corporate training and professional learning in India";

// "Who it is for": each audience (existing copy) leads to the page most relevant to it (AUDIENCE_LINKS,
// in the site copy), and its row names that page under the audience, so each link says where it goes:
// a programme page by its title, the other pages by their name or the part of the page it opens.
const destinationName: Record<string, string> = {
  ...Object.fromEntries(COURSES.map((course) => [`/${course.slug}`, course.title])),
  "/technology-training": "Technology Training",
  "/what-we-do": "What we do",
  "/past-trainings#group-technology-training": "Past trainings: business tools, ERP and AI",
  "/leadership-soft-skills-training#topics": "Leadership and soft skills topics",
};
const audienceRows = AUDIENCES.map((audience) => {
  const href = AUDIENCE_LINKS[audience] ?? "/what-we-do";
  return { label: audience, href, meta: destinationName[href] };
});

// The founder facts beside the Company statement. The full company record lives on /about-us. The CIN
// is the copyable, tabular one used there, so it can be pasted into a registry search.
const companyFacts: [string, ReactNode][] = [
  ["Founder Director", "Mousumi Chakraborty"],
  ["Based in", "Bengaluru, India"],
  ["Company", LEGAL_ENTITY.name],
  ["CIN", <Cin key="cin" copyFirst />],
  ["Incorporated", LEGAL_ENTITY.incorporatedLabel],
];

/**
 * The landing page, in nike.com's visual language: a split hero (the condensed slogan and the value
 * line on the left, the animated bulb standing on the page on the right), then short sections that
 * each link on to the page holding the detail. The four training areas are Nike-style media tiles,
 * and the client logos, the founder and the company facts close the page as one trust block.
 */
export default function Home() {
  return <>
    {/* Hero, split: the text on the left (columns 1-6) and the animated bulb on the right (columns
        7-12), standing directly on the page with no panel around it, and the page's one-line
        description as a quiet caption under it. The bulb's column is sized to the screen (100svh less
        the header and padding, 460-600px; from 2xl the drawing takes 92% of the column's width, which
        is what caps it there), and the two columns share a bottom edge: the caption's last line sits
        on the logo row's. On screens at least 1536x864 the hero grows with the screen, its content
        centred in it: it fills the first screen up to 832px, then stops, so a tall screen (1920x1080,
        2560x1440) shows the next section's start rather than wide blank bands around the content.
        Below lg the bulb comes first, above the left-aligned text (the visual first, as on Nike's
        phones), at about a fifth of the screen (160-320px; a little over a quarter on screens 740px
        and taller), and the caption moves to the end of the text column so the drawing fills that
        space. The value line, the primary pill and the client proof still sit on a phone's first screen.
        In the source the text column comes first and the bulb column second (placed by its column
        from lg, and pulled above the text by `order` below it), so a screen reader meets the h1 before
        the caption at every width.
        The h1 reads "TraininGenie Transcend Beyond Growth": the name as a small line, then the
        condensed slogan as the hero's display line, the largest text in it at every width (the value
        line under it is the h2 size: 28px on phones, 40px at 1440). `sloganFont.variable` scopes the
        condensed Archivo face to this section. */}
    <section className={`${sloganFont.variable} flex flex-col justify-center bg-background [@media(min-width:96rem)_and_(min-height:54rem)]:min-h-[min(calc(100svh-4rem),52rem)]`}>
      <Container className="pb-12 sm:pb-20 lg:pb-24 lg:pt-6">
        <div className="grid lg:grid-cols-12 lg:items-end lg:gap-x-10">
          {/* The heading, then each block under it, fade up in reading order (.hero-rise, --rise-delay):
              on phones lead, pills, proof, then the rest and the caption; from lg lead, rest, pills, proof. */}
          <div className="pt-2 sm:pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pt-0">
            <h1 className="hero-rise">
              <span className="block text-[1rem] font-medium leading-[1.4] text-foreground">{COMPANY_NAME}</span>{" "}
              {/* The slogan, the hero's display line. On phones two lines, "Transcend / Beyond growth.",
                  sized to the column: the longer line is about 6.4em in Archivo and 7.6em in the
                  normal-width fallback a phone shows while Archivo loads, so a 1/8.1 column size keeps
                  it on two lines in both and the hero's height does not change when the font swaps in.
                  Short screens (700px tall or less) keep a step smaller size, so the pill and the logos
                  stay on the first screen. Up to 56px between 640 and 1023px, two lines at most. One
                  line from lg, where it never wraps, grows with the column to 52px and fills about 95%
                  of it. The closing full stop is drawn by CSS, so the heading text stays "TraininGenie
                  Transcend Beyond Growth". */}
              <span className="mt-2 block type-slogan text-foreground max-lg:text-[clamp(1.875rem,calc((100vw-2.5rem)/8.1),3.5rem)] max-lg:[@media(max-height:700px)]:text-[clamp(1.875rem,9.5vw,2.375rem)] lg:mt-3 lg:whitespace-nowrap lg:text-[clamp(2.25rem,-0.3rem+4.3vw,3.25rem)]">
                {sloganWords.map((word, index) => <span key={word} className={index === sloganWords.length - 1 ? "after:content-['.']" : undefined}>{word}{index < sloganWords.length - 1 ? " " : ""}</span>)}
              </span>
            </h1>
            {/* The value line, the pills, the proof and the rest of the sentence. Phones reorder them so
                the primary pill and the logos come before the longer sentence: lead, pills, proof,
                rest, then the caption. From lg the sentence reads straight on: lead, rest, pills,
                proof. Phones keep the gaps a step tighter, and below 360px the lead steps down to
                24px so it sets in three lines instead of four: the primary pill and the logo row then
                stay on the first screen down to 320x640 and 375x667. */}
            <div className="flex flex-col">
              <p className="hero-rise mt-4 max-w-[22ch] type-h2 text-foreground [--rise-delay:60ms] max-[359px]:text-[1.5rem] lg:mt-6">{LANDING_HERO.lead}</p>
              <p className="hero-rise mt-8 max-w-measure type-hero text-copy [--rise-delay:240ms] max-lg:order-3 lg:mt-4 lg:[--rise-delay:120ms]">{LANDING_HERO.rest}</p>
              <div data-cta-zone className="hero-rise mt-5 flex flex-col gap-3 [--rise-delay:120ms] max-lg:order-1 sm:mt-6 sm:flex-row sm:flex-wrap lg:mt-7 lg:[--rise-delay:180ms]">
                <ButtonLink href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonLink>
                <ButtonLink href="/what-we-do" variant="secondary">See what we do</ButtonLink>
              </div>
              <div className="hero-rise mt-6 [--rise-delay:180ms] max-lg:order-2 sm:mt-8 lg:[--rise-delay:240ms]">
                <ClientProof link={false} />
              </div>
              <p className="hero-rise mt-6 type-label text-muted-foreground [--rise-delay:240ms] max-lg:order-4 lg:hidden">{heroCaption}</p>
            </div>
          </div>
          <div className="flex h-[22svh] min-h-[160px] max-h-[320px] flex-col max-lg:-order-1 max-lg:[@media(min-height:740px)]:h-[27svh] lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:h-[calc(100svh-10rem)] lg:min-h-[460px] lg:max-h-[600px]">
            <div className="flex min-h-0 flex-1 items-center justify-center pt-2 lg:pt-8">
              <div className="flex aspect-[1000/843] h-[94%] max-w-[86%] items-center 2xl:max-w-[92%]"><ParticleBulb palette={BULB_LIGHT} /></div>
            </div>
            <p className="pb-2 text-balance text-center type-label text-muted-foreground max-lg:hidden lg:pb-0">{heroCaption}</p>
          </div>
        </div>
      </Container>
    </section>

    {/* 01 What we do: three statements, then on to /what-we-do. */}
    <Section id="what-we-do" divider labelledBy="what-we-do-heading">
      <SectionHead id="what-we-do-heading" n="01" label="What we do" title="Training shaped around your requirement, not a fixed syllabus." intro="Organizations bring a capability need; TraininGenie designs and delivers the learning around it, for teams across technology, leadership, management systems, standards, and governance." />
      {/* A small departure from the spec's `sm:grid-cols-3`: between 640 and 1023px three columns are
          only 170-215px wide, so the titles wrap unevenly. The statements stay stacked (at a readable
          measure) until lg. From lg each Point is a two-row subgrid, so the three texts start on one
          line even when only one title wraps (around 1024-1200px). */}
      <div data-reveal className={`${HEAD.body} grid lg:grid-cols-12 lg:gap-x-10`}>
        <ul className="grid gap-y-8 lg:col-span-9 lg:col-start-4 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0">
          {LANDING_POINTS.map((point) => <Point key={point.title} as="li" title={point.title} className="max-w-[36rem] lg:row-span-2 lg:grid lg:max-w-none lg:grid-rows-subgrid">{point.text}</Point>)}
        </ul>
      </div>
      <div className={`${HEAD.action} lg:pl-col-4`}><TextLink href="/what-we-do">See what we do</TextLink></div>
    </Section>

    {/* 02 Training areas: the four area pages as media tiles, each a dot-matrix emblem on a grey panel
        with the name, the topic count and the description under it. On phones a 2x2 grid of the
        name and the topic count. */}
    <Section id="training-areas" divider labelledBy="training-areas-heading">
      <SectionHead id="training-areas-heading" n="02" label="Training areas" title={`Four training areas, ${TOTAL_TOPICS} topics.`} intro="Each programme can be adapted around the organization, the participants, and the outcome." />
      <div data-reveal className={HEAD.body}>
        <MediaTileGrid columns={4} phone={2} label="Training areas">
          {AREAS.map((area) => <MediaTile key={area.slug} aspect="square" href={area.href} emblem={EMBLEM_BY_PATH[area.href]} title={area.title} subtitle={`${area.topics} topics`} meta={area.intro} note={`${UI_LABELS.includes} ${area.sample.join(", ")}`} />)}
        </MediaTileGrid>
      </div>
      <div className={HEAD.action}><TextLink href="/corporate-training-services">All training topics</TextLink></div>
    </Section>

    {/* 03 Who it is for: the audiences, each one hairline RowLink that leads to its most relevant
        page, named in grey under the audience. Two columns from md, one on phones; the first row of
        each column draws the top rule. */}
    <Section id="who-it-is-for" divider labelledBy="who-heading">
      <SectionHead id="who-heading" n="03" label="Who it is for" title="Find the training for your team." />
      <div data-reveal className={`${HEAD.body} lg:pl-col-4`}>
        <ul aria-label="Who it is for" className="grid md:grid-cols-2 md:gap-x-10">
          {audienceRows.map((row) => <li key={row.label} className="border-border first:border-t md:[&:nth-child(2)]:border-t"><RowLink href={row.href} title={row.label} meta={row.meta} className="h-full" /></li>)}
        </ul>
      </div>
    </Section>

    {/* 04 How we work: the three phases, how learning is reviewed, then on to the methodology. The
        page's one grey band, a change of pace after the white sections (the phase dots mask the
        dotted rule with it), so neither it nor the clients row after it needs a hairline. */}
    <Section id="how-we-work" tone="tint" labelledBy="how-we-work-heading">
      <SectionHead id="how-we-work-heading" n="04" label="How we work" title={<><span className="lg:block lg:whitespace-nowrap">Start with the requirement.</span>{" "}<span className="lg:block lg:whitespace-nowrap">Work backward from the outcome.</span></>} intro="The approach begins by understanding the client problem and the desired outcome." />
      <div data-reveal className={`${HEAD.body} lg:pl-col-4`}>
        <PhaseLine />
        <p className="mt-10 border-t border-border pt-5 type-ui text-copy lg:mt-12"><span className="font-medium text-foreground">{UI_LABELS.reviewed}:</span> {UI_LABELS.reviewedValue}.</p>
      </div>
      <div className={`${HEAD.action} lg:pl-col-4`}><TextLink href="/training-methodology">See how we work</TextLink></div>
    </Section>

    {/* Selected clients: a Nike row title with its link on the right, then all twelve logos. It sits
        here, after How we work, so it does not repeat the hero's logo row straight away, and it opens
        the trust block (the clients, then the founder and company facts) before the closing band.
        The references note is shown once per page, in the footer's legal lines. */}
    <Section id="clients" size="tight" labelledBy="clients-heading">
      <RowHead id="clients-heading" title="Selected clients" action={<TextLink href="/clients-and-testimonials" size="sm">See clients</TextLink>} />
      <LogoWall variant="strip" className={HEAD.rowBody} />
    </Section>

    {/* 05 Company: who stands behind it, with the founder and company facts. */}
    <Section id="company" divider labelledBy="company-heading">
      <SectionHead id="company-heading" n="05" label="Company" title="Founded and led by Mousumi Chakraborty." />
      {/* The statement and the facts sit side by side from xl. Between 1024 and 1279px four columns
          (about 290px) would wrap "Trainingenie (OPC) Private Limited" and the founder's name into
          ragged right-aligned pairs, so there the facts run under the statement, still from column 4,
          capped at 34rem so each term stays close to its value instead of stretching across the row. */}
      <div data-reveal className={`${HEAD.body} lg:grid lg:grid-cols-12 lg:gap-x-10`}>
        <div className="grid gap-12 lg:col-span-9 lg:col-start-4 xl:grid-cols-9 xl:gap-x-10">
          <div className="xl:col-span-5">
            <p className="max-w-measure type-lead text-copy">Mousumi brings more than two decades of experience across multiple businesses and industries. Her experience includes navigating challenges involving people, process, products, and technology.</p>
            {/* From xl the statement is five columns (about 477px), so the gap steps back to the phones'
                32px there and the three links share one line. */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10 xl:gap-x-8">
              <TextLink href="/our-team">Founder profile</TextLink>
              <TextLink href={CONTACT_INFO.directorLinkedIn} external>Founder on LinkedIn</TextLink>
              <TextLink href="/about-us#company">Company record</TextLink>
            </div>
          </div>
          <FactList rows={companyFacts} layout="auto" className="max-w-[34rem] xl:col-span-4 xl:max-w-none" />
        </div>
      </div>
    </Section>

    {/* The closing band mirrors the hero from lg: the copy and the pill on the left, a small dark bulb
        on the right, drawn whole and still (no assembly, so it is never seen as a scattered dot cloud
        as it scrolls in). Below lg the band is the copy and the actions only. */}
    <ClosingBand visual={<div className="hidden w-[280px] lg:block"><ParticleBulb palette={BULB_DARK} intro={false} /></div>} />
    {jsonLd({ "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE_URL}/#webpage`, name: `${COMPANY_NAME} | Corporate Training Company in India`, url: `${SITE_URL}/`, isPartOf: { "@id": WEBSITE_ID }, about: { "@id": ORGANIZATION_ID }, mainEntity: { "@type": "ItemList", name: `${COMPANY_NAME} training areas`, itemListElement: TRAINING_PILLARS.map((pillar, index) => ({ "@type": "ListItem", position: index + 1, name: pillar.title, description: pillar.description, url: `${SITE_URL}/${pillar.slug}` })) } })}
  </>;
}

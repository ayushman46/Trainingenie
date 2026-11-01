import { COURSE_DETAILS, COURSES, FAQS, PAST_TRAININGS } from "@/data";
import { AREA_COPY, UI_LABELS, type AreaSlug } from "@/data/site-copy";
import { AREAS } from "@/components/site/areas";
import { PAST_TRAINING_GROUPS } from "@/components/company/past-training-groups";
import { groupAnchor, slugify, TOPIC_PROGRAMMES } from "@/components/catalogue/utils";

export type SearchGroup = "Pages" | "Training areas" | "Programmes" | "Topics" | "Past trainings" | "Questions";
export type SearchItem = { id: string; title: string; href: string; group: SearchGroup; hint: string; keywords: string };

/** The groups in tie-break order: when two results rank the same, the one in the earlier group comes first. */
export const SEARCH_GROUPS: SearchGroup[] = ["Pages", "Training areas", "Programmes", "Topics", "Past trainings", "Questions"];

// Each page: title, path, a short plain-language hint shown in the results, and extra search words.
// The last three rows are the answers buyers search for most, each linked to where the site gives it.
const pages: [string, string, string, string][] = [
  ["Home", "/", "TraininGenie at a glance", "trainingenie corporate training india"],
  ["What we do", "/what-we-do", "The whole offer, explained", "what traininggenie does services offer overview customized delivery formats who it is for"],
  ["About TraininGenie", "/about-us", "Vision, values and the registered company", "company profile vision mission values pride registered cin incorporated legal registered office company record vendor supplier empanelment"],
  ["Founder profile", "/our-team", "Mousumi Chakraborty, Founder Director", "mousumi chakraborty founder director team linkedin languages english hindi bengali odia"],
  ["All training topics", "/corporate-training-services", "Every area, topic and programme", "corporate training services catalogue programmes"],
  ["Training methodology", "/training-methodology", "How an engagement works, in six steps", "approach process how we work engagement"],
  ["Clients", "/clients-and-testimonials", "Selected clients", "references organizations companies customers logos technology financial services healthcare consumer goods staffing non-profit ngo bank banking bfsi nonprofit"],
  ["Past trainings", "/past-trainings", "Topics we have recently delivered", "history delivered topics"],
  ["FAQs", "/faqs", "Common questions, answered", "questions answers help kolkata bengaluru bangalore"],
  ["Blog and resources", "/blog", "Articles and guides, in preparation", "articles insights guides"],
  ["Contact", "/contact-us", "Send an enquiry, email or call", "enquiry proposal email phone get in touch quote call kolkata bengaluru bangalore"],
  ["Privacy policy", "/privacy-policy", "How enquiry data is handled", "data personal information"],
  ["Certification preparation", "/what-we-do#cert", "Where it applies, with exams confirmed per engagement", "certification exam examination voucher accredited certificate certificates certified"],
  ["Online, onsite or hybrid", "/what-we-do#formats", "For organizations across India", "onsite on-site in-person classroom virtual online hybrid location india mumbai pune hyderabad chennai delhi ncr noida gurugram gurgaon ahmedabad kolkata bengaluru bangalore city cities"],
  ["Duration and pricing", "/contact-us#enquiry", "Agreed with you for each engagement", "price pricing cost fees quote budget duration days how long batch"],
];

// Pages suggested before anything is typed, after the programmes and areas. Home, Privacy and the
// Blog stay searchable.
const SUGGESTED_PAGES = ["/contact-us", "/faqs", "/clients-and-testimonials", "/our-team"];

// Plain words buyers use for a subject the site names differently, keyed by the result's title. Each
// routes to a topic or programme the site already offers; none adds an offering of its own.
const SYNONYMS: Record<string, string> = {
  "Campus to Corporate": "freshers graduates new joiners induction students college colleges university universities placement onboarding",
  Leadership: "managers first-time managers new managers people managers",
  "Team Management": "supervisors team leaders team leads people managers",
  "Presentation Skills": "public speaking presenting",
  ITIL: "service desk itsm",
  "ITIL 4 Foundation Training": "service desk itsm",
  "ISO 9001 Training": "internal auditor audit qms quality",
  "ISO 27001 Training": "isms information security infosec",
};

const programmeTitle = (slug: string) => COURSES.find((course) => course.slug === slug)?.title ?? "";
const pastAbout = (title: string) => PAST_TRAINING_GROUPS.flatMap((group) => group.items).find((item) => item.title === title)?.about ?? "";

// Areas, programmes and topics all name their area by its title (AREAS), so every result spells an
// area the same way. A topic with a programme page opens that page; any other topic opens its group
// on the area page. Programme keywords carry the page's own words: who it is for, the concepts, the
// outcomes and the questions.
export const SEARCH_INDEX: SearchItem[] = [
  ...pages.map(([title, href, hint, keywords]) => ({ id: `page${href}`, title, href, group: "Pages" as const, hint, keywords })),
  ...AREAS.map((area) => ({ id: `area-${area.slug}`, title: area.title, href: area.href, group: "Training areas" as const, hint: area.description, keywords: `${area.description} ${AREA_COPY[area.slug as AreaSlug]?.summary ?? ""} ${area.intro}` })),
  ...COURSES.map((course) => {
    const detail = COURSE_DETAILS[course.slug];
    const words = detail ? [...detail.concepts.map((concept) => concept.name), ...detail.outcomes, ...detail.faqs.map(([question]) => question)] : [];
    return { id: `course-${course.slug}`, title: course.title, href: `/${course.slug}`, group: "Programmes" as const, hint: course.pillar, keywords: `${course.pillar} ${course.description} ${course.topics.join(" ")} ${course.audience} ${words.join(" ")} ${SYNONYMS[course.title] ?? ""}` };
  }),
  ...AREAS.flatMap((area) => area.groups.flatMap((group) => group.items.map((item) => {
    const slug = TOPIC_PROGRAMMES[item];
    const hint = !slug ? area.title : `${/ Lead /.test(item) ? UI_LABELS.relatedTag : UI_LABELS.programmeTag}: ${programmeTitle(slug)}`;
    return { id: `topic-${area.href}-${item}`, title: item, href: slug ? `/${slug}` : `${area.href}#${groupAnchor(group.title)}`, group: "Topics" as const, hint, keywords: `${group.title} ${area.title} ${SYNONYMS[item] ?? ""}` };
  }))),
  ...PAST_TRAININGS.map((training) => ({ id: `past-${training.title}`, title: training.title, href: `/past-trainings#past-${slugify(training.title)}`, group: "Past trainings" as const, hint: training.tags.join(" · "), keywords: `${training.tags.join(" ")} ${pastAbout(training.title)}` })),
  ...FAQS.map(([question, answer]) => ({ id: `faq-${slugify(question)}`, title: question, href: `/faqs?q=${encodeURIComponent(question)}`, group: "Questions" as const, hint: "From the FAQs", keywords: answer })),
];

// The most results a group shows; a broad word would otherwise fill the list with one group.
const GROUP_CAPS: Partial<Record<SearchGroup, number>> = { Topics: 6, "Past trainings": 4, Questions: 4 };
// Words that name no subject ("ITIL course", "sales training"). They count towards the exact and
// leading title matches, but a result never matches on them alone.
const FILLER = new Set(["training", "trainings", "course", "courses", "programme", "programmes", "program", "programs", "workshop", "workshops", "class", "classes", "session", "sessions", "for", "and", "the", "of", "in", "on", "a", "an", "to", "with"]);

// Case, accents and punctuation are ignored: "On-site", "onsite" and "ON SITE" split the same way.
const tokenise = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(Boolean);
// A query word matches a word that starts with it; a word of one or two letters ("ai", "it") must be
// the whole word, so it never matches inside another ("trAIning").
const matchesToken = (word: string, token: string) => (word.length <= 2 ? token === word : token.startsWith(word));
const matchesAny = (word: string, tokens: string[]) => tokens.some((token) => matchesToken(word, token));

// Whether the words appear one after another in the tokens ("internal auditor", "service desk").
const hasPhrase = (words: string[], tokens: string[]) => tokens.some((_, start) => words.every((word, index) => start + index < tokens.length && matchesToken(word, tokens[start + index])));

// A topic named for its own programme (ITIL, PRINCE2, ReactJS, Design Thinking) is folded into that
// programme's result when both match, so the programme is listed once, at the better rank. Lead
// Auditor and Lead Implementer topics stay listed: they name more than the programme.
const PREPARED = SEARCH_INDEX.map((item) => {
  const title = tokenise(item.title);
  const keywords = tokenise(item.keywords);
  const programme = item.group === "Topics" && !/ Lead /.test(item.title) ? TOPIC_PROGRAMMES[item.title] : undefined;
  return { item, title, keywords, all: [...new Set([...title, ...keywords])], groupIndex: SEARCH_GROUPS.indexOf(item.group), foldsInto: programme && `course-${programme}` };
});

/**
 * Word-start search over titles and keywords. Every subject word of the query must match a word of
 * the result; when no result has them all, only results whose title holds the most of them are shown,
 * and none when no title does, so a stray keyword ("intelligence" in an AI course) never answers.
 * Ranked: the exact title, then a title that starts with the query, then a title holding every word,
 * then keywords holding the words as a phrase, then any keyword match; ties keep SEARCH_GROUPS order. With no query, suggests the focused
 * programmes, the training areas and the pages a buyer asks for (Contact, FAQs, Clients, Founder).
 */
export function searchSite(query: string): SearchItem[] {
  const words = tokenise(query);
  if (words.length === 0) {
    const inGroup = (group: SearchGroup) => SEARCH_INDEX.filter((item) => item.group === group);
    return [...inGroup("Programmes"), ...inGroup("Training areas"), ...SUGGESTED_PAGES.flatMap((href) => SEARCH_INDEX.filter((item) => item.id === `page${href}`))];
  }
  const subject = words.filter((word) => !FILLER.has(word));
  const core = subject.length ? subject : words;
  const matched = PREPARED.map((entry) => ({ entry, hits: core.filter((word) => matchesAny(word, entry.all)) }));
  const best = Math.max(...matched.map(({ hits }) => hits.length));
  if (best === 0) return [];

  const partial = best < core.length;
  const scored = matched.filter(({ hits }) => hits.length === best).map(({ entry, hits }) => {
    const exact = entry.title.join(" ") === words.join(" ");
    const leads = words.length <= entry.title.length && words.every((word, index) => (index === words.length - 1 ? matchesToken(word, entry.title[index]) : word === entry.title[index]));
    const inTitle = hits.every((word) => matchesAny(word, entry.title));
    const phrase = hits.length > 1 && hasPhrase(hits, entry.keywords);
    return { entry, score: exact ? -1 : leads ? 0 : inTitle ? 1 : phrase ? 2 : 3 };
  }).filter(({ score }) => !partial || score <= 1);
  const folded = scored.filter((result) => {
    const programme = result.entry.foldsInto && scored.find((other) => other.entry.item.id === result.entry.foldsInto);
    if (programme) programme.score = Math.min(programme.score, result.score);
    return !programme;
  });
  folded.sort((a, b) => a.score - b.score || a.entry.groupIndex - b.entry.groupIndex);

  const shown: Partial<Record<SearchGroup, number>> = {};
  return folded.flatMap(({ entry: { item } }) => {
    const count = (shown[item.group] ?? 0) + 1;
    shown[item.group] = count;
    return count > (GROUP_CAPS[item.group] ?? Infinity) ? [] : [item];
  }).slice(0, 40);
}

// Every new helper string of the v5 site in one place, so the owner can review it at a glance.
// Lines marked "existing" are the site's current copy, moved here; lines marked "HELPER" are new
// wording derived from existing copy (flagged for the owner's review). Counts are never typed here:
// pages compute them from the data.
//
// House style for the site's copy:
// - Oxford -ize spelling (organization, customized), and "programme";
// - hyphenated compound adjectives ("need-based learning", "fine-tuned to your context");
// - a serial comma in sentences ("the audience, the topic, and the outcome"), none in names
//   ("ITIL, PRINCE2 and Agile");
// - no dashes: a comma, a colon or a new sentence instead;
// - "we" in direct interface and contact copy, "TraininGenie" in definitional statements.

/** The catalogue's eyebrow and one-line summary per training area (existing, moved from /corporate-training-services). The header mega-menu uses the same summaries. */
export const AREA_COPY = {
  "technology-training": { eyebrow: "Technical capability", summary: "Cloud, software engineering, data, emerging technology, enterprise systems, security, and networks." },
  "leadership-soft-skills-training": { eyebrow: "People capability", summary: "Leadership development, communication, collaboration, personal effectiveness, problem solving, and team performance." },
  "itil-prince2-agile-training": { eyebrow: "Operational capability", summary: "ITIL, PRINCE2, Agile, COBIT, DevOps, and change management." },
  "iso-standards-training": { eyebrow: "Governance capability", summary: "Quality, security, service continuity, risk, privacy, governance, and compliance learning." },
} as const;

export type AreaSlug = keyof typeof AREA_COPY;

/** Who the training is for (existing, from the home page). */
export const AUDIENCES = ["HR and learning & development teams", "IT service and operations", "Project and delivery offices", "Product and engineering teams", "Security, risk and compliance", "Quality and process owners", "Finance and procurement", "Managers and new joiners"];

/**
 * "Who it is for": the page most relevant to each audience, shared by the landing and /what-we-do. Finance and
 * procurement opens the technology group of /past-trainings (its Excel, SAP and AI-for-finance sessions; the key
 * is that group's PAST_TRAINING_GROUPS key), and managers and new joiners the whole topics band of the leadership
 * area, which holds both the leadership topics and Campus to Corporate.
 */
export const AUDIENCE_LINKS: Record<string, string> = {
  "HR and learning & development teams": "/what-we-do",
  "IT service and operations": "/itil-4-foundation-training",
  "Project and delivery offices": "/prince2-training",
  "Product and engineering teams": "/technology-training",
  "Security, risk and compliance": "/iso-27001-training",
  "Quality and process owners": "/iso-9001-training",
  "Finance and procurement": "/past-trainings#group-technology-training",
  "Managers and new joiners": "/leadership-soft-skills-training#topics",
};

/**
 * The landing hero sentence. `lead` is existing (set in ink); HELPER: `rest` is the second half,
 * condensed from the existing hero sentence so that it also names the delivery formats.
 */
export const LANDING_HERO = {
  lead: "Corporate training for your teams, designed around your requirement.",
  rest: "Technology, leadership and soft skills, management systems such as ITIL, PRINCE2 and Agile, and ISO standards and GRC. Customized or standard, delivered online, onsite or hybrid.",
};

/** The three statements under the landing page's "What we do". HELPER: derived wording. Product names keep a non-breaking space, so "ITIL 4" never splits. */
export const LANDING_POINTS = [
  { title: "Customized training", text: "Need-based learning, shaped around the business problem, the participants and the desired outcome." },
  { title: "Focused programmes", text: "Standard programmes such as ITIL\u00a04, PRINCE2, Scrum and ISO\u00a027001, fine-tuned to your context." },
  { title: "Online, onsite or hybrid", text: "Delivered in the format that suits your teams, for organizations across India." },
];

/** The delivery formats. Names existing; HELPER: the plain definitions. */
export const DELIVERY_FORMATS = [
  { name: "Online", text: "Delivered remotely, wherever participants work." },
  { name: "Onsite", text: "Delivered in person, at your location." },
  { name: "Hybrid", text: "A combination of online and onsite sessions." },
];

/**
 * The closing band. Title and label existing; HELPER: "What to share" and the three points, derived
 * from "Discuss the audience, topic, and desired outcome". "your teams" is joined by a non-breaking
 * space, so the two-line heading never leaves "teams" alone at the start of its second line.
 */
export const CLOSING = {
  label: "Start a conversation",
  title: "Bring us the capability challenge your\u00a0teams are facing.",
  pointsLabel: "What to share",
  points: ["Who the training is for", "The topic", "The desired outcome"],
};

/**
 * /what-we-do. HELPER: new headings and lines (flagged for the owner's review). The page's other strings are
 * existing copy or come from the data files.
 */
export const WHAT_WE_DO = {
  /** Chapter 03 heading. */
  customTitle: "Customized training, or a focused programme.",
  /** Chapter 03, left column: the sentence under "Customized training". */
  customLine: "A need-based learning intervention, created around the requirement: the business problem, the participant context, and the desired outcome.",
  /** Chapter 03: the label over the five parts, from METHOD_CONSTANTS.changeable ("… can be discussed for each engagement"). */
  customPartsLabel: "Discussed for each engagement",
  /** Chapter 03: METHOD_CONSTANTS.changeable split into its five parts. */
  customParts: ["The emphasis", "The examples", "The learning activities", "The delivery choices", "The level of customization"],
  /** Chapter 04 heading (derived from "certification preparation where applicable"). */
  certTitle: "Certification preparation, where it applies.",
  /** Chapter 06 heading. */
  whoTitle: "Teams across the organization.",
  /** Chapter 07: the first sentence of the lead, before the existing "The approach begins by …" sentences. */
  stepsLeadPrefix: "Six steps in three phases.",
  /** Chapter 08: the closing band heading. */
  nextTitle: "Discuss the audience, the topic and the outcome you need.",
};

/** Formerly the area pages' hero aside line under "In this area"; no longer rendered (DELIVERY_PROMISE replaced it). HELPER. */
export const AREA_ASIDE_DELIVERY = "Delivered online, onsite or hybrid.";

/**
 * The one plain answer to "Can you deliver onsite?". HELPER: DELIVERY_FORMATS' three names joined with
 * the existing line "Training is offered to organizations across India".
 */
export const DELIVERY_PROMISE = "Online, onsite at your location, or hybrid, for organizations across India.";

/**
 * The site-wide call to action (existing label). It opens /contact-us at the enquiry form (#enquiry), not
 * at the top of the page; links meant for the contact details (the footer's Contact, the 404 page,
 * search, the FAQ's contact details) keep the plain "/contact-us".
 */
export const PRIMARY_CTA = { label: "Discuss your training needs", href: "/contact-us#enquiry" };

/** The header's Company menu (existing lines). */
export const COMPANY_MENU = [
  { title: "About TraininGenie", href: "/about-us", line: "Vision, values and the registered company" },
  { title: "Founder profile", href: "/our-team", line: "Mousumi Chakraborty, Founder Director" },
  { title: "Clients", href: "/clients-and-testimonials", line: "Selected clients" },
  { title: "Past trainings", href: "/past-trainings", line: "Topics we have recently delivered" },
  { title: "FAQs", href: "/faqs", line: "Common questions, answered" },
];

/** Small interface words used by the shared components. HELPER: short labels. */
export const UI_LABELS = {
  /** Prefix of the example-topics line under an area row: "Includes Cloud Computing, Azure, …". */
  includes: "Includes",
  /** The red tag after a topic that has its own programme page. */
  programmeTag: "Focused programme",
  /** The label in front of "Online · Onsite · Hybrid". */
  delivered: "Delivered",
  /** Phase label beside the timeline dot on small screens: "Phase 1". */
  phase: "Phase",
  /** Screen-reader prefix of a step in a phase: "Step 1:". */
  step: "Step",
  /** The visible label of the phone action bar's round call button (from sm). */
  call: "Call",
  /**
   * The email link where the address would repeat (closing band, phone menu): the words of the
   * /contact-us quick button. The footer, /contact-us, /privacy-policy and the FAQ keep the full address.
   */
  emailUs: "Email us",
  /** The grey tag after a topic whose link leads to a broader programme page (Lead Auditor and Lead Implementer topics). */
  relatedTag: "Related programme",
  /** The label in front of a short row of client logos (the landing hero). */
  clientsInclude: "Clients include",
  /** The disclosure that opens the six process steps on area pages. */
  allSteps: "See all steps",
  /** The link from a topic list to the enquiry form. */
  askTopics: "Ask about any of these topics",
  /** The "At a glance" term for the review steps. */
  reviewed: "How learning is reviewed",
  /** Its value, from METHOD_STEPS 02 (pre-assessment or discussion) and 06 (post-assessment and feedback). */
  reviewedValue: "Pre-assessment or discussion before; post-assessment and feedback after",
};

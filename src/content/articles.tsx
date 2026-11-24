import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The blog's articles. Each one answers a single question a training buyer asks, and opens with the
 * answer in two or three sentences (`answer`), so a reader, a search engine or an AI assistant can lift
 * it whole. Facts about a framework are checked against its owner's published material on `checked`;
 * nothing about TraininGenie is stated here that the rest of the site does not already state.
 * `courses` are the programme pages (by slug) that link back to the article.
 */
export type ArticleSection = { id: string; heading: string; body: ReactNode };
export type Article = { slug: string; title: string; metaTitle: string; description: string; answer: string; published: string; updated: string; checked: string; courses: string[]; sections: ArticleSection[]; note: ReactNode };

const link = "font-medium text-foreground underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-muted-foreground";
const list = "list-disc space-y-3 pl-5 marker:text-border-strong";
const term = "font-medium text-foreground";
const cell = "border-b border-border py-3 pr-4 align-top";
const headCell = `${cell} text-left font-medium text-foreground`;

// ITIL and PRINCE2 side by side: a real table, so the comparison can be read (and quoted) row by row.
const comparison: [string, string, string][] = [
  ["What it is", "A framework of guidance for IT service management", "A method for managing projects"],
  ["What it manages", "Services that run continuously, such as a service desk, hosting or an internal application", "A project: temporary work with a start, an end and a business case"],
  ["Main question it answers", "How do we run and keep improving this service?", "How do we deliver this change in a controlled way?"],
  ["Time horizon", "Ongoing, for as long as the service exists", "Fixed, from the project mandate to project closure"],
  ["Core ideas", "Service value system, guiding principles, management practices, continual improvement", "Seven principles, seven practices and seven processes, with stage-by-stage control"],
  ["Typical learners", "Service desk and IT support, operations, service delivery and transformation teams", "Project managers, PMOs, project sponsors and delivery teams"],
  ["Entry certification", "ITIL Foundation", "PRINCE2 Foundation"],
  ["Owner", "PeopleCert", "PeopleCert"],
];

export const ARTICLES: Article[] = [
  {
    slug: "itil-vs-prince2",
    title: "ITIL vs PRINCE2: What Is the Difference?",
    metaTitle: "ITIL vs PRINCE2: What Is the Difference?",
    description: "ITIL is a framework for running IT services; PRINCE2 is a method for managing projects. A side-by-side comparison, and which one a team should learn first.",
    answer: "ITIL is a framework for running and improving IT services day to day. PRINCE2 is a method for managing a project from start to finish. ITIL suits teams that keep a service working, such as a service desk. PRINCE2 suits teams that deliver a defined change on time and within budget. Many organizations use both, and TraininGenie delivers corporate training in each.",
    published: "2026-11-23",
    updated: "2026-11-23",
    checked: "23 November 2026",
    courses: ["itil-4-foundation-training", "prince2-training"],
    sections: [
      {
        id: "side-by-side",
        heading: "ITIL and PRINCE2 side by side",
        body: <>
          <p>The two are not alternatives. They manage different kinds of work: ITIL manages services, PRINCE2 manages projects.</p>
          <div className="max-w-none overflow-x-auto">
            <table className="w-full min-w-[36rem] border-t border-border type-ui">
              <caption className="sr-only">ITIL compared with PRINCE2</caption>
              <thead><tr><th scope="col" className={headCell}><span className="sr-only">Aspect</span></th><th scope="col" className={headCell}>ITIL</th><th scope="col" className={headCell}>PRINCE2</th></tr></thead>
              <tbody>{comparison.map(([aspect, itil, prince2]) => <tr key={aspect}><th scope="row" className={`${headCell} w-[24%]`}>{aspect}</th><td className={cell}>{itil}</td><td className={`${cell} pr-0`}>{prince2}</td></tr>)}</tbody>
            </table>
          </div>
        </>,
      },
      {
        id: "what-is-itil",
        heading: "What is ITIL?",
        body: <>
          <p>ITIL is a body of guidance for IT service management: how an organization designs, delivers, supports and improves the services its users and customers depend on. It is guidance to adopt and adapt, not a rulebook to follow line by line.</p>
          <p>ITIL 4, published in 2019, is built around a few ideas:</p>
          <ul className={list}>
            <li><strong className={term}>The service value system.</strong> How every part of the organization works together to turn demand into value.</li>
            <li><strong className={term}>Seven guiding principles.</strong> Recommendations such as &ldquo;focus on value&rdquo; and &ldquo;progress iteratively with feedback&rdquo; that apply to any decision.</li>
            <li><strong className={term}>34 management practices.</strong> Among them incident management, change enablement, problem management and the service desk.</li>
            <li><strong className={term}>Continual improvement.</strong> Improvement as a routine part of the work, not a one-off project.</li>
          </ul>
          <p>PeopleCert released a newer edition, ITIL (Version 5), in early 2026. Organizations planning certification should confirm with PeopleCert which edition&apos;s examination currently applies.</p>
          <p>TraininGenie&apos;s programme: <Link href="/itil-4-foundation-training" className={link}>ITIL 4 Foundation Training</Link>.</p>
        </>,
      },
      {
        id: "what-is-prince2",
        heading: "What is PRINCE2?",
        body: <>
          <p>PRINCE2 stands for PRojects IN Controlled Environments. It is a structured project management method: it says who is responsible for what, how a project is divided into stages, and what must be decided before each stage begins.</p>
          <p>The current edition, PRINCE2 7 (2023), has three sets of seven, with people at the centre:</p>
          <ul className={list}>
            <li><strong className={term}>Seven principles.</strong> For example, a project must keep a continued business justification and be managed by stages.</li>
            <li><strong className={term}>Seven practices.</strong> Business case, organizing, plans, quality, risk, issues and progress.</li>
            <li><strong className={term}>Seven processes.</strong> The steps from starting up a project to closing it.</li>
          </ul>
          <p>PRINCE2 is not tied to IT. It is used for construction, policy, product and business change projects as well as technology ones, and is meant to be tailored to the size and risk of each project.</p>
          <p>TraininGenie&apos;s programme: <Link href="/prince2-training" className={link}>PRINCE2 Training</Link>.</p>
        </>,
      },
      {
        id: "how-they-work-together",
        heading: "How do ITIL and PRINCE2 work together?",
        body: <>
          <p>A project ends; the service it creates carries on. That hand-over is where the two meet.</p>
          <p>Take a company replacing its HR system. Selecting, configuring and launching the new system is a project, with a budget, a deadline and a business case: PRINCE2 territory. Once the system is live, people need support, incidents need resolving and changes need controlling for years afterwards: ITIL territory.</p>
          <p>Teams that know both tend to plan the hand-over early, so that the support team is involved before go-live and the project closes with a service that operations can actually run.</p>
        </>,
      },
      {
        id: "which-first",
        heading: "Which should your team learn first?",
        body: <>
          <p>Start from the work the team does most of the time:</p>
          <ul className={list}>
            <li><strong className={term}>Mostly keeping services running</strong> (service desk, IT support, operations, service delivery): start with ITIL.</li>
            <li><strong className={term}>Mostly delivering change with a deadline</strong> (project managers, PMOs, sponsors, delivery teams): start with PRINCE2.</li>
            <li><strong className={term}>Both</strong> (for example an IT team that runs services and also delivers upgrades): train the service roles in ITIL and the project roles in PRINCE2, then bring the two groups together on the hand-over between them.</li>
            <li><strong className={term}>Working in sprints rather than stages:</strong> look at <Link href="/scrum-agile-training" className={link}>Scrum and Agile training</Link>, which can be combined with either.</li>
          </ul>
          <p>If the choice is not obvious, describe the team and the problem in an <Link href="/contact-us" className={link}>enquiry</Link>. TraininGenie scopes each programme with the client before recommending a topic.</p>
        </>,
      },
      {
        id: "certification",
        heading: "How do the certifications compare?",
        body: <>
          <p>Both certification schemes belong to PeopleCert, and both begin with a Foundation level that tests understanding of the concepts and vocabulary.</p>
          <ul className={list}>
            <li><strong className={term}>ITIL</strong> starts at ITIL Foundation, followed by more advanced modules for practitioners, managers and leaders.</li>
            <li><strong className={term}>PRINCE2</strong> has two main levels: Foundation, then Practitioner, which tests applying the method to a project scenario.</li>
          </ul>
          <p>Neither Foundation certificate is a prerequisite for the other. Examination content, fees and renewal rules are set by PeopleCert and change over time, so confirm them on <a href="https://www.peoplecert.org/" target="_blank" rel="noreferrer" className={link}>peoplecert.org<span className="sr-only"> (opens in a new tab)</span></a> before budgeting.</p>
        </>,
      },
      {
        id: "common-questions",
        heading: "Common questions",
        body: <>
          <p><strong className={term}>Is ITIL better than PRINCE2?</strong> Neither is better. They solve different problems: ITIL is for managing services, PRINCE2 is for managing projects.</p>
          <p><strong className={term}>Can one person hold both certifications?</strong> Yes. They are independent, and people who move between project and service roles often hold both.</p>
          <p><strong className={term}>Is PRINCE2 only for IT projects?</strong> No. PRINCE2 is a general project management method used in many sectors.</p>
          <p><strong className={term}>Is ITIL a project management method?</strong> No. ITIL includes a project management practice, but it is a service management framework and does not replace a project method.</p>
          <p><strong className={term}>Do ITIL and PRINCE2 work with Agile?</strong> Yes. Both are designed to be tailored, and PRINCE2 Agile exists specifically for combining PRINCE2 with agile delivery.</p>
        </>,
      },
    ],
    note: <>ITIL&reg; and PRINCE2&reg; are registered trademarks of the PeopleCert group. A programme named after a framework does not by itself make TraininGenie an accredited examination institute, authorized training partner, or certification body. Examination arrangements are confirmed for each engagement.</>,
  },
];

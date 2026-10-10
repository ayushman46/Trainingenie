// ─────────────────────────────────────────────────────────────────────────────
// COURSE PAGE CONTENT — the explanatory body of each /[slug] course page.
// Facts about the frameworks themselves are public; anything specific to an
// engagement (duration, price, exam vouchers, accreditation) is deliberately
// left to be confirmed per enquiry.
// ─────────────────────────────────────────────────────────────────────────────

export type CourseDetail = {
  overview: string[];
  concepts: { name: string; detail: string }[];
  outcomes: string[];
  faqs: [string, string][];
  related: string[];
};

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  "itil-4-foundation-training": {
    overview: [
      "ITIL 4 is the current version of ITIL, the most widely used framework for IT service management. It describes how organizations co-create value with their customers through digital products and services, and how IT, operations, and business teams can work together around that value instead of around isolated processes.",
      "ITIL 4 Foundation is the entry-level qualification in the ITIL 4 scheme. A corporate ITIL 4 Foundation programme gives a whole team the same vocabulary and mental model for service management, which makes later improvement work, tooling decisions, and cross-team handoffs far easier to agree on.",
    ],
    concepts: [
      { name: "Key concepts of service management", detail: "Value, outcomes, costs and risks; products and services; service offerings; and the service relationships between providers and consumers." },
      { name: "The seven guiding principles", detail: "Focus on value; start where you are; progress iteratively with feedback; collaborate and promote visibility; think and work holistically; keep it simple and practical; optimize and automate." },
      { name: "The four dimensions of service management", detail: "Organizations and people; information and technology; partners and suppliers; and value streams and processes." },
      { name: "The service value system (SVS)", detail: "How guiding principles, governance, the service value chain, practices, and continual improvement combine to turn demand into value." },
      { name: "The service value chain", detail: "The six activities of plan, improve, engage, design and transition, obtain or build, and deliver and support, and how value streams move through them." },
      { name: "ITIL management practices", detail: "The purpose and key ideas of commonly used practices such as incident management, problem management, change enablement, service request management, service desk, and service level management." },
    ],
    outcomes: [
      "Explain ITIL 4 terminology consistently across IT, operations, and business teams.",
      "Describe how the service value system and value chain apply to their own services.",
      "Use the seven guiding principles to frame improvement decisions.",
      "Prepare for the ITIL 4 Foundation examination where certification is part of the engagement.",
    ],
    faqs: [
      ["Who should attend ITIL 4 Foundation training?", "Anyone who works in or with IT services: service desk and support staff, operations and infrastructure teams, developers moving towards DevOps, project and delivery managers, and business stakeholders who consume IT services."],
      ["Does this training include the ITIL 4 Foundation exam?", "Examination arrangements, including vouchers and the accredited body involved, are confirmed for each engagement. Training on ITIL content does not by itself imply accreditation."],
      ["Can ITIL 4 training be tailored to our tools and processes?", "Yes. Examples and exercises can be built around the organization's own services, ticketing workflows, and improvement priorities, while still covering the Foundation syllabus."],
    ],
    related: ["prince2-training", "scrum-agile-training", "iso-27001-training"],
  },
  "prince2-training": {
    overview: [
      "PRINCE2 (PRojects IN Controlled Environments) is a structured, process-based project management method used by governments and private organizations worldwide. It defines what must happen in a project, who is responsible for it, and when decisions should be escalated, while remaining usable for projects of any size or industry.",
      "PRINCE2 is built on principles, practices (called themes in earlier editions), and processes, and it is designed to be tailored to the project's environment. Corporate PRINCE2 training helps project professionals and sponsors share one approach to business justification, roles, stage-based control, and reporting.",
    ],
    concepts: [
      { name: "The seven principles", detail: "Ensure continued business justification; learn from experience; define roles, responsibilities and relationships; manage by stages; manage by exception; focus on products; and tailor to suit the project." },
      { name: "The seven practices", detail: "Business case, organizing, plans, quality, risk, issues, and progress: the aspects of a project that must be addressed continually throughout its life." },
      { name: "The seven processes", detail: "Starting up a project, directing a project, initiating a project, controlling a stage, managing product delivery, managing a stage boundary, and closing a project." },
      { name: "Project roles and the project board", detail: "How the executive, senior user, senior supplier, project manager, and team managers share decision-making and accountability." },
      { name: "Management by exception", detail: "Setting tolerances for time, cost, scope, quality, risk, and benefits so that leaders are involved only when a deviation needs a decision." },
      { name: "Tailoring PRINCE2", detail: "Adapting the method to the scale, complexity, and delivery approach of the project, including when it is combined with agile delivery." },
    ],
    outcomes: [
      "Apply PRINCE2 principles to plan and control projects in stages.",
      "Clarify project roles, decision rights, and escalation paths.",
      "Use business case, risk, and issue practices to keep projects justified and under control.",
      "Prepare for PRINCE2 examinations where certification is part of the engagement.",
    ],
    faqs: [
      ["Is PRINCE2 still relevant for agile teams?", "Yes. PRINCE2 governs the project as a whole, and the method explicitly supports tailoring. PRINCE2 Agile combines PRINCE2 governance with agile delivery approaches such as Scrum and Kanban."],
      ["Who benefits most from PRINCE2 training?", "Project managers, project coordinators, PMO staff, team leads, and sponsors or board members who need to understand how a controlled project should be run."],
      ["Does the training include PRINCE2 certification?", "Examination and certification arrangements are confirmed for each engagement. A PRINCE2 training title does not by itself imply accreditation."],
    ],
    related: ["scrum-agile-training", "itil-4-foundation-training", "design-thinking-workshop"],
  },
  "scrum-agile-training": {
    overview: [
      "Agile is a set of values and principles for delivering work in small, frequent increments, learning from feedback, and adapting plans as understanding improves. The Agile Manifesto (2001) sets out four values and twelve principles that underpin frameworks such as Scrum and Kanban.",
      "Scrum is the most widely used agile framework. It organizes work into fixed-length Sprints, with clear accountabilities, events, and artifacts defined in the Scrum Guide. Corporate Scrum and Agile training helps product, engineering, and business teams adopt the same practical ways of working rather than each team inventing its own interpretation.",
    ],
    concepts: [
      { name: "Agile values and principles", detail: "Individuals and interactions, working results, customer collaboration, and responding to change, and what the twelve principles mean in day-to-day work." },
      { name: "Scrum accountabilities", detail: "The Product Owner, who maximizes value; the Scrum Master, who enables the team's effectiveness; and the Developers, who create a usable Increment each Sprint." },
      { name: "Scrum events", detail: "The Sprint, Sprint Planning, the Daily Scrum, the Sprint Review, and the Sprint Retrospective, and the purpose of each." },
      { name: "Scrum artifacts and commitments", detail: "The Product Backlog with its Product Goal, the Sprint Backlog with its Sprint Goal, and the Increment with its Definition of Done." },
      { name: "Backlog management and estimation", detail: "Writing and refining backlog items, ordering by value, and practical approaches to estimation and forecasting." },
      { name: "Kanban and flow", detail: "Visualizing work, limiting work in progress, and using flow metrics alongside or instead of Scrum where it fits better." },
    ],
    outcomes: [
      "Run Scrum events with a clear purpose and timebox.",
      "Write, refine, and prioritize backlog items that deliver value.",
      "Understand each Scrum accountability and how the roles collaborate.",
      "Choose between Scrum, Kanban, or a combination for their own context.",
    ],
    faqs: [
      ["What is the difference between Agile and Scrum?", "Agile is the broader set of values and principles. Scrum is one specific framework for putting those values into practice, with defined accountabilities, events, and artifacts."],
      ["Can non-software teams use Scrum?", "Yes. Scrum and Kanban are used in marketing, operations, HR, and other functions wherever work can be delivered and reviewed in small increments."],
      ["Can the training be built around our existing agile setup?", "Yes. The programme can start from how the teams work today and focus on the specific gaps, whether that is backlog quality, Sprint events, or cross-team coordination."],
    ],
    related: ["prince2-training", "design-thinking-workshop", "reactjs-training"],
  },
  "iso-27001-training": {
    overview: [
      "ISO/IEC 27001 is the international standard for information security management systems (ISMS). It sets out the requirements for establishing, implementing, maintaining, and continually improving an ISMS, so that an organization can manage risks to the confidentiality, integrity, and availability of its information in a systematic way.",
      "The current edition, ISO/IEC 27001:2022, pairs the management system requirements with Annex A, a reference set of 93 information security controls grouped into organizational, people, physical, and technological themes. ISO 27001 training helps security, IT, risk, and compliance teams understand both the management system and the controls, and their responsibilities in implementation or audit.",
    ],
    concepts: [
      { name: "ISMS fundamentals", detail: "The context of the organization, interested parties, ISMS scope, and the leadership commitment the standard requires." },
      { name: "Information security risk assessment and treatment", detail: "Identifying risks, evaluating them against criteria, selecting treatment options, and producing the Statement of Applicability." },
      { name: "Annex A controls", detail: "The 93 controls in the 2022 edition across organizational, people, physical, and technological themes, and how to decide which apply." },
      { name: "Clauses 4 to 10", detail: "Context, leadership, planning, support, operation, performance evaluation, and improvement, following the common structure used across ISO management system standards." },
      { name: "Internal audit and management review", detail: "How the ISMS is monitored, audited, and reviewed by leadership to drive continual improvement." },
      { name: "Lead Implementer and Lead Auditor perspectives", detail: "The difference between building an ISMS and auditing one, for teams preparing for either role." },
    ],
    outcomes: [
      "Explain the purpose and structure of ISO/IEC 27001:2022.",
      "Carry out and document an information security risk assessment.",
      "Relate Annex A controls to the organization's own risks and environment.",
      "Support certification readiness, internal audits, and continual improvement.",
    ],
    faqs: [
      ["What is the difference between ISO 27001 and ISO 27002?", "ISO/IEC 27001 contains the certifiable requirements for an ISMS. ISO/IEC 27002 is guidance that explains the Annex A controls in more detail and how they can be implemented."],
      ["Do you offer ISO 27001 Lead Auditor and Lead Implementer training?", "Both are part of the ISO and GRC training area. The specific scope and any examination or certification body arrangements are confirmed for each engagement."],
      ["Does training make our organization ISO 27001 certified?", "No. Organizational certification comes from an accredited certification body's audit. Training builds the knowledge teams need to implement, operate, and audit the ISMS."],
    ],
    related: ["iso-9001-training", "itil-4-foundation-training", "prince2-training"],
  },
  "iso-9001-training": {
    overview: [
      "ISO 9001 is the international standard for quality management systems (QMS) and one of the most widely adopted management system standards in the world. It helps organizations consistently deliver products and services that meet customer and regulatory requirements, and improve customer satisfaction over time.",
      "ISO 9001:2015 is built on seven quality management principles, the process approach, and risk-based thinking, all tied together by the Plan-Do-Check-Act cycle. ISO 9001 training helps quality, operations, and management teams understand the requirements and apply them to how their organization actually works.",
    ],
    concepts: [
      { name: "The seven quality management principles", detail: "Customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management." },
      { name: "The process approach", detail: "Managing activities as interrelated processes with defined inputs, outputs, owners, and measures." },
      { name: "Risk-based thinking", detail: "Identifying risks and opportunities that could affect quality outcomes and planning actions to address them." },
      { name: "Plan-Do-Check-Act", detail: "Using the PDCA cycle to plan, operate, monitor, and improve the quality management system." },
      { name: "Clauses 4 to 10", detail: "Context of the organization, leadership, planning, support, operation, performance evaluation, and improvement." },
      { name: "Auditing and corrective action", detail: "Internal audits, nonconformity handling, root cause analysis, and corrective action as drivers of continual improvement." },
    ],
    outcomes: [
      "Explain the requirements and structure of ISO 9001:2015.",
      "Map their own processes and identify risks and opportunities.",
      "Support internal audits and handle nonconformities effectively.",
      "Contribute to certification readiness and continual improvement.",
    ],
    faqs: [
      ["Who should attend ISO 9001 training?", "Quality managers and coordinators, process owners, operations and production teams, internal auditors, and managers responsible for customer outcomes."],
      ["Do you offer ISO 9001 Lead Auditor and Lead Implementer training?", "Both are part of the ISO and GRC training area. The specific scope and any examination or certification body arrangements are confirmed for each engagement."],
      ["How is ISO 9001 related to other ISO standards?", "ISO 9001 shares a common high-level structure with standards such as ISO/IEC 27001 and ISO 22301, which makes it easier to run an integrated management system."],
    ],
    related: ["iso-27001-training", "itil-4-foundation-training", "design-thinking-workshop"],
  },
  "design-thinking-workshop": {
    overview: [
      "Design Thinking is a human-centred approach to solving problems. It starts by understanding the people affected by a problem, reframes the problem from their perspective, and then generates, prototypes, and tests ideas quickly so that teams learn before committing time and money.",
      "A common way to describe the approach is five modes: empathize, define, ideate, prototype, and test. The Double Diamond model describes the same idea as two cycles of divergent and convergent thinking: discover and define the right problem, then develop and deliver the right solution. A facilitated workshop lets a cross-functional team practise the full cycle on a real challenge.",
    ],
    concepts: [
      { name: "Empathize", detail: "Interviews, observation, and empathy mapping to understand the needs, pains, and context of the people affected." },
      { name: "Define", detail: "Turning research into a clear problem statement and \"How might we\" questions that frame the challenge well." },
      { name: "Ideate", detail: "Structured divergent techniques that generate many ideas, followed by convergent methods to select the most promising." },
      { name: "Prototype", detail: "Building quick, low-cost representations of ideas, such as sketches, storyboards, mock-ups, or role plays." },
      { name: "Test", detail: "Putting prototypes in front of real users, capturing feedback, and iterating." },
      { name: "Applying it at work", detail: "Using Design Thinking for customer experience, internal process, product, and change challenges." },
    ],
    outcomes: [
      "Frame problems from the customer's or user's perspective.",
      "Run structured ideation sessions that move from many ideas to a few good ones.",
      "Build and test simple prototypes to learn quickly.",
      "Bring a repeatable innovation approach back to their own teams.",
    ],
    faqs: [
      ["Who should join a Design Thinking workshop?", "Cross-functional groups work best: people from product, operations, customer service, sales, HR, and leadership who share a real challenge."],
      ["Can the workshop use our own business challenge?", "Yes. Working on a real customer, process, or product challenge is usually the most effective format and gives the team usable output."],
      ["Is Design Thinking only for designers?", "No. It is a problem-solving approach for any team that needs to understand users better and test ideas before committing to them."],
    ],
    related: ["scrum-agile-training", "prince2-training", "reactjs-training"],
  },
  "reactjs-training": {
    overview: [
      "React is an open-source JavaScript library, created at Meta, for building user interfaces from reusable components. It is one of the most widely used technologies for modern web front ends and is also the foundation of React Native for mobile apps and frameworks such as Next.js.",
      "ReactJS corporate training helps developers move from knowing the syntax to building maintainable, performant applications as a team. Programmes can range from fundamentals for developers new to React to advanced sessions on state management, performance, testing, and architecture for experienced engineers.",
    ],
    concepts: [
      { name: "Components, JSX, and props", detail: "Composing user interfaces from small, reusable function components and passing data between them." },
      { name: "State and hooks", detail: "useState, useEffect, useRef, useMemo, and custom hooks, and when each one is the right tool." },
      { name: "Data fetching and forms", detail: "Loading and updating server data, handling loading and error states, and building validated forms." },
      { name: "State management and context", detail: "Lifting state, React Context, and when a dedicated state management library is justified." },
      { name: "Performance", detail: "How rendering works, avoiding unnecessary re-renders, code splitting, and profiling." },
      { name: "Testing and TypeScript", detail: "Testing components with tools such as React Testing Library, and using TypeScript for safer, self-documenting components." },
    ],
    outcomes: [
      "Build and structure React applications from reusable components.",
      "Manage local and shared state with hooks and context.",
      "Diagnose and fix common performance problems.",
      "Write tested, typed components that a whole team can maintain.",
    ],
    faqs: [
      ["What experience do participants need for ReactJS training?", "Working knowledge of HTML, CSS, and modern JavaScript is enough for a fundamentals programme. Advanced programmes assume participants already build React applications."],
      ["Can the training use our own codebase or stack?", "Yes. Examples and exercises can be aligned with the team's stack, for example TypeScript, Next.js, or a specific state management library."],
      ["Do you also offer training on related technologies?", "Yes. Technology training covers web and mobile, programming and testing, microservices, UI and UX, cloud, data, and more."],
    ],
    related: ["scrum-agile-training", "design-thinking-workshop", "itil-4-foundation-training"],
  },
};

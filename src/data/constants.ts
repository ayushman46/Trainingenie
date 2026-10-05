export const COMPANY_NAME = "TraininGenie";
export const COMPANY_TAGLINE = "You Can Do It When You Skill It.";
export const SITE_URL = "https://www.trainingenie.com";
export const COMPANY_DESCRIPTION = "TraininGenie is a corporate learning and development partner providing need-based training, certification preparation, technology learning, leadership development, and management systems support.";

export const CONTACT_INFO = {
  email: "s.mousumi@gmail.com",
  phones: ["+91 70226 12620", "+91 88846 26200"],
  locations: ["Bengaluru", "Kolkata", "India"],
  companyLinkedIn: "https://www.linkedin.com/company/trainingenie/",
  directorLinkedIn: "https://www.linkedin.com/in/mousumi-chakraborty-468b1916/",
};

export const TRAINING_PILLARS = [
  { slug: "technology-training", number: "01", title: "Technology Training", description: "Technical learning across cloud, AI, data, software engineering, enterprise systems, and cybersecurity." },
  { slug: "leadership-soft-skills-training", number: "02", title: "Leadership and Soft Skills", description: "Leadership, communication, workplace effectiveness, collaboration, and team capability programs." },
  { slug: "itil-prince2-agile-training", number: "03", title: "Management Systems and Frameworks", description: "ITIL, PRINCE2, Agile, COBIT, DevOps, and change management learning." },
  { slug: "iso-standards-training", number: "04", title: "ISO, Standards and GRC", description: "Training across quality, information security, service continuity, risk, governance, and compliance." },
];

export const TECHNOLOGY_GROUPS = [
  { title: "Cloud and infrastructure", items: ["Cloud Computing", "Azure", "Virtualization and Storage"] },
  { title: "Software engineering", items: ["Web and Mobile", "Programming and Testing", "ReactJS", "Microservices", "UI UX"] },
  { title: "Data and emerging technology", items: ["AI, Machine Learning and IoT", "Big Data and Analytics", "Databases", "ERP", "Blockchain"] },
  { title: "Security and networks", items: ["Cybersecurity", "Networking"] },
];

export const BEHAVIORAL_GROUPS = [
  { title: "Leadership and collaboration", items: ["Leadership", "Team Management", "Managing and Sustaining High Performance Teams", "Interpersonal Skills"] },
  { title: "Communication and effectiveness", items: ["Business Communications", "Presentation Skills", "Corporate Etiquette", "Time Management"] },
  { title: "Problem solving and growth", items: ["SMART Goal Setting", "Conflict Management", "Problem Solving and Decision Making", "Design Thinking", "Strengths Workshops", "Campus to Corporate"] },
];

export const FRAMEWORK_GROUPS = [
  { title: "Management systems and delivery", items: ["ITIL", "PRINCE2", "PRINCE2 Agile", "COBIT", "Change Management", "DevOps"] },
];

export const ISO_GROUPS = [
  { title: "Quality and service management", items: ["ISO 9001 Lead Auditor", "ISO 9001 Lead Implementer", "ISO 20000 Lead Auditor", "ISO 20000 Lead Implementer"] },
  { title: "Security and continuity", items: ["ISO 27001 Lead Auditor", "ISO 27001 Lead Implementer", "ISO 22301 Lead Implementer"] },
  { title: "Risk, privacy and compliance", items: ["Enterprise Risk Manager", "ISO 31000", "GDPR"] },
];

export const TECHNOLOGY_TOPICS = TECHNOLOGY_GROUPS.flatMap((group) => group.items);
export const BEHAVIORAL_TOPICS = BEHAVIORAL_GROUPS.flatMap((group) => group.items);
export const FRAMEWORK_TOPICS = FRAMEWORK_GROUPS.flatMap((group) => group.items);
export const ISO_TOPICS = ISO_GROUPS.flatMap((group) => group.items);

export const COURSES = [
  { slug: "itil-4-foundation-training", title: "ITIL 4 Foundation Training", pillar: "Management Systems and Frameworks", description: "Corporate ITIL 4 Foundation training that helps teams build a shared understanding of service management concepts and practices.", audience: "IT service, operations, delivery, and transformation teams.", topics: ["ITIL 4 concepts", "service management practices", "value-focused ways of working"] },
  { slug: "prince2-training", title: "PRINCE2 Training", pillar: "Management Systems and Frameworks", description: "PRINCE2 training for organizations that want a structured approach to project management learning.", audience: "Project professionals, delivery teams, and managers.", topics: ["PRINCE2 principles", "project management practices", "tailoring learning to context"] },
  { slug: "scrum-agile-training", title: "Scrum and Agile Training", pillar: "Management Systems and Frameworks", description: "Agile and Scrum training designed to help teams build practical shared ways of working around their delivery context.", audience: "Product, engineering, delivery, and cross-functional teams.", topics: ["Agile principles", "Scrum roles and events", "team collaboration"] },
  { slug: "iso-27001-training", title: "ISO 27001 Training", pillar: "ISO, Standards and GRC", description: "ISO 27001 training for organizations building knowledge around information security management and risk-aware ways of working.", audience: "Information security, risk, compliance, IT, and management teams.", topics: ["information security management concepts", "risk awareness", "standard-related responsibilities"] },
  { slug: "iso-9001-training", title: "ISO 9001 Training", pillar: "ISO, Standards and GRC", description: "ISO 9001 training that helps teams understand quality management concepts and apply them in their organizational context.", audience: "Quality, process, operations, and management teams.", topics: ["quality management concepts", "process thinking", "continual improvement"] },
  { slug: "design-thinking-workshop", title: "Design Thinking Workshop", pillar: "Leadership and Soft Skills", description: "A facilitated design thinking workshop for teams working on customer, process, or product challenges.", audience: "Cross-functional teams, managers, and innovation groups.", topics: ["understanding user needs", "problem framing", "collaborative ideation"] },
  { slug: "reactjs-training", title: "ReactJS Corporate Training", pillar: "Technology Training", description: "ReactJS corporate training for teams that need practical, context-aware learning around modern web development.", audience: "Frontend developers, full-stack teams, and engineering groups.", topics: ["ReactJS fundamentals", "component-based development", "team-specific application"] },
];

export const PAST_TRAININGS = [
  { title: "SAP Document and Reporting Compliance readiness", tags: ["ERP", "Finance", "Compliance"] },
  { title: "Leadership development programmes", tags: ["Leadership", "Communication", "Coaching"] },
  { title: "VBA macros for Excel", tags: ["Excel", "VBA", "Automation"] },
  { title: "Advanced Excel", tags: ["Excel", "Analysis", "Modelling"] },
  { title: "Agentic AI for finance", tags: ["Artificial intelligence", "Finance", "Workflows"] },
  { title: "AI tools in Excel and PowerPoint for procurement", tags: ["AI tools", "Excel", "Procurement"] },
  { title: "Experiential team building", tags: ["Team building", "Collaboration", "Problem solving"] },
  { title: "Design Thinking workshop", tags: ["Innovation", "Change", "Prototyping"] },
];

export const PRIDE_VALUES = [
  { letter: "P", title: "Passion", text: "A dedication to empowering people while protecting the quality of the training experience and the reputation of the organization." },
  { letter: "R", title: "Respect", text: "Mutual respect, courtesy, modesty, and a willingness to go the extra mile support long-term, mutually beneficial relationships." },
  { letter: "I", title: "Innovation", text: "Kaizen and continuous improvement keep learning relevant to participant needs and changing requirements." },
  { letter: "D", title: "Determination", text: "A commitment to leading by example and treating corporate social responsibility as part of the organization\'s objectives." },
  { letter: "E", title: "Enthusiasm", text: "Knowledge, hands-on practice, and fun come together in a learning philosophy that aims to be practical and engaging." },
];

export const NAV_LINKS = [
  { href: "/about-us", label: "About" },
  { href: "/corporate-training-services", label: "Training" },
  { href: "/clients-and-testimonials", label: "Experience" },
  { href: "/blog", label: "Resources" },
];

export const TESTIMONIALS: never[] = [];

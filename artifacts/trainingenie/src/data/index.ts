// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit this file to update any text, stats, or lists on the site
// ─────────────────────────────────────────────────────────────────────────────

export const COMPANY_NAME = "TraininGenie";
export const COMPANY_TAGLINE = "India's Premier Tech Training Partner";
export const COMPANY_DESCRIPTION =
  "We deliver hands-on, outcome-driven software engineering training programs — from microservices to DevOps — that help engineering teams ship faster and build better.";

// ── Contact info ──────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  address: "Level 4, Innovate Tower\nCyber City, Bengaluru\nKarnataka, India 560081",
  email: "hello@trainingenie.com",
  emailPartnership: "partnerships@trainingenie.com",
  phone: "+91 80 4123 4567",
  hours: "Mon–Fri, 9:00 AM – 6:00 PM IST",
};

// ── Stats strip ───────────────────────────────────────────────────────────────
export const STATS = [
  { label: "Tech Companies", value: "500+" },
  { label: "Developers Trained", value: "25k+" },
  { label: "Cities Covered", value: "20+" },
  { label: "Satisfaction Rate", value: "98%" },
];

// ── Services ──────────────────────────────────────────────────────────────────
// Each service has an id (used in URL query params), title, short tagline,
// and a longer description shown on the Services page.
export const SERVICES = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    tagline: "Design and decompose systems that scale independently.",
    description:
      "Deep-dive workshops covering service decomposition, domain-driven design, inter-service communication (gRPC, REST, messaging), and patterns like Saga, CQRS, and API Gateway — built around your existing stack.",
  },
  {
    id: "devops",
    title: "DevOps & CI/CD",
    tagline: "From code commit to production in minutes, not days.",
    description:
      "Hands-on training on CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI), container orchestration with Kubernetes, infrastructure-as-code with Terraform, and SRE principles including SLOs and error budgets.",
  },
  {
    id: "cloud",
    title: "Cloud Engineering (AWS / Azure / GCP)",
    tagline: "Build cloud-native systems with confidence.",
    description:
      "Platform-specific and cloud-agnostic programs covering serverless architectures, managed databases, cost optimisation, IAM, and multi-cloud strategies — aligned to real workloads, not just certifications.",
  },
  {
    id: "api-design",
    title: "API Design & Integration",
    tagline: "APIs your consumers actually want to use.",
    description:
      "From REST and GraphQL to event-driven APIs with Kafka and NATS — training your teams on contract-first design, versioning, authentication, rate limiting, and building developer-friendly documentation.",
  },
  {
    id: "software-engineering",
    title: "Software Engineering Best Practices",
    tagline: "Write code that lasts and teams that thrive.",
    description:
      "Clean code, SOLID principles, test-driven development, refactoring legacy systems, and design patterns — delivered through code reviews, pair programming sessions, and real codebase walkthroughs.",
  },
  {
    id: "data-engineering",
    title: "Data Engineering & Analytics",
    tagline: "Turn raw pipelines into business insight.",
    description:
      "Hands-on training on modern data stacks — Spark, dbt, Airflow, Kafka — along with data modelling, pipeline optimisation, and building reliable data platforms for analytics and ML workloads.",
  },
  {
    id: "security",
    title: "Cybersecurity & Secure Coding",
    tagline: "Security as a first-class engineering concern.",
    description:
      "OWASP top 10, secure SDLC, threat modelling, penetration testing basics, secrets management, and compliance (SOC2, ISO 27001) — helping your engineers own security from day one.",
  },
  {
    id: "ai-ml",
    title: "AI & ML for Engineering Teams",
    tagline: "From LLM wrappers to production ML systems.",
    description:
      "Practical AI training covering prompt engineering, RAG architectures, fine-tuning, ML Ops pipelines, and integrating AI capabilities into existing software products — no PhD required.",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    clientName: "Arjun Kapoor",
    clientRole: "VP Engineering",
    clientCompany: "Infosys",
    industry: "IT Services",
    quote:
      "TraininGenie's microservices workshop was exactly what our architects needed. They didn't teach theory — they worked through our actual migration challenges. Deployment frequency doubled within a quarter.",
    rating: 5,
  },
  {
    id: 2,
    clientName: "Priya Nair",
    clientRole: "Head of Platform Engineering",
    clientCompany: "Razorpay",
    industry: "Fintech",
    quote:
      "The DevOps immersion program was phenomenal. Our team went from manual deployments to fully automated pipelines in three weeks. The trainers understood our Kubernetes setup and adapted every session to it.",
    rating: 5,
  },
  {
    id: 3,
    clientName: "Sandeep Menon",
    clientRole: "CTO",
    clientCompany: "Freshworks",
    industry: "SaaS",
    quote:
      "We engaged TraininGenie for a secure coding bootcamp across 4 engineering pods. The depth and relevance were outstanding — not a single boilerplate slide. OWASP vulnerabilities we'd lived with for years got fixed.",
    rating: 5,
  },
  {
    id: 4,
    clientName: "Kavitha Reddy",
    clientRole: "Director of Data Engineering",
    clientCompany: "Swiggy",
    industry: "Consumer Tech",
    quote:
      "Our data engineers were intimidated by the move to a modern data stack. TraininGenie built a custom dbt + Airflow curriculum around our pipeline and turned apprehension into ownership in four weeks.",
    rating: 5,
  },
  {
    id: 5,
    clientName: "Rahul Sharma",
    clientRole: "Engineering Manager",
    clientCompany: "Zepto",
    industry: "Quick Commerce",
    quote:
      "The API design training transformed how our teams collaborate across services. Clear contracts, fewer integration bugs, faster reviews. ROI was visible in the first sprint after the program.",
    rating: 4,
  },
  {
    id: 6,
    clientName: "Nandini Iyer",
    clientRole: "Chief Architect",
    clientCompany: "Wipro",
    industry: "IT Services",
    quote:
      "TraininGenie trained 200+ engineers across our cloud migration program over six months. The consistency of quality across batches in five cities was remarkable. A partner we trust at scale.",
    rating: 5,
  },
];

// ── Why choose us ─────────────────────────────────────────────────────────────
export const WHY_US = [
  {
    title: "Practitioners, Not Lecturers",
    description:
      "Every trainer is a working engineer or ex-FAANG architect with real battle scars. No slides-and-theory — your team learns from people who've solved these problems in production.",
  },
  {
    title: "Customised to Your Stack",
    description:
      "We audit your codebase, CI/CD setup, and architecture before designing a single module. Training is built around your system, not a fictional one.",
  },
  {
    title: "Measurable Engineering Outcomes",
    description:
      "We track deployment frequency, defect rates, and PR cycle times — not NPS surveys. If the needle doesn't move, we come back.",
  },
];

// ── Home page featured services (shown in the homepage preview grid) ───────────
export const FEATURED_SERVICES = [SERVICES[0], SERVICES[1], SERVICES[6]];

// ── Navbar links ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/past-trainings", label: "Past Trainings" },
  { href: "/about", label: "About" },
];

// ── Past Trainings ────────────────────────────────────────────────────────────
export const PAST_TRAININGS = [
  {
    id: "doc-intel",
    title: "Multimodal Document Intelligence",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "TensorFlow", "Computer Vision"],
  },
  {
    id: "cloud-arch",
    title: "Distributed Cloud Architecture at Scale",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    tags: ["Kubernetes", "AWS", "Go"],
  },
  {
    id: "gen-ai",
    title: "Advanced Generative AI Models",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    tags: ["PyTorch", "LLMs", "NLP"],
  },
  {
    id: "data-pipes",
    title: "Real-time Event Streaming Pipelines",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    tags: ["Kafka", "Scala", "Spark"],
  },
  {
    id: "sec-ops",
    title: "Zero-Trust Security Architecture",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000",
    tags: ["Security", "Rust", "Networking"],
  }
];

// ── About page content ────────────────────────────────────────────────────────
export const MISSION =
  "To empower engineering teams across India with world-class technical training that's built around real systems, real codebases, and real outcomes — not generic curricula.";

export const VISION =
  "To be the most trusted technical training partner for India's fastest-growing engineering organisations — closing the gap between where teams are and where they need to be.";

export const ABOUT_STATS = [
  { label: "Cities", value: "20+" },
  { label: "Expert Trainers", value: "80+" },
  { label: "Enterprise Clients", value: "500+" },
  { label: "Satisfaction Rate", value: "98%" },
];

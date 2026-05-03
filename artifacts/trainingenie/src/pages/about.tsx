import { motion } from "framer-motion";
import { MISSION, VISION, ABOUT_STATS } from "@/data";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const VALUES = [
  { title: "Practitioner-Led",     description: "Every trainer is a working engineer or veteran architect — no academics, no generalists." },
  { title: "Context-First",        description: "We review your stack before writing a single slide. Training is built around your actual systems." },
  { title: "Outcome-Oriented",     description: "We measure success in engineering metrics — deployment frequency, DORA scores, defect rates." },
  { title: "India-Scale Ready",    description: "Delivering consistently across 20+ cities. We've built the logistics to scale with you." },
];

export default function About() {
  return (
    <div className="w-full pt-20 pb-24">

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 px-5 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Practitioners who became teachers.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary-foreground/75 text-base md:text-lg leading-relaxed"
          >
            TraininGenie was built by engineers who spent years closing skill gaps inside large Indian enterprises — and eventually decided to do it at scale.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 md:py-28 container mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-4">Mission</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">What we're here to do.</h2>
            <p className="text-muted-foreground leading-relaxed">{MISSION}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-4">Vision</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Where we're headed.</h2>
            <p className="text-muted-foreground leading-relaxed">{VISION}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-5 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16">How we operate.</h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {VALUES.map((v, i) => (
              <motion.div key={i} variants={FADE_UP} className="bg-card border border-border rounded-2xl p-7 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-primary">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 container mx-auto px-5 md:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">India-wide presence.</h2>
        <p className="text-muted-foreground mb-12 max-w-lg">From Bengaluru and Hyderabad to Pune, Noida, and Chennai — we span the country's engineering hubs.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {ABOUT_STATS.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-1">{s.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

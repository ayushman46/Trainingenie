import { motion } from "framer-motion";
import { Target, Zap } from "lucide-react";
import { MISSION, VISION, ABOUT_STATS } from "@/data";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

// Values that define how TraininGenie operates
const VALUES = [
  {
    title: "Practitioner-Led",
    description:
      "Every trainer is a working engineer or veteran architect. No academics, no generalists — only specialists who've shipped in production.",
  },
  {
    title: "Context-First",
    description:
      "We review your stack before writing a single slide. Training is built around your actual systems, not a fictional demo app.",
  },
  {
    title: "Outcome-Oriented",
    description:
      "We measure success in engineering metrics — not satisfaction surveys. Deployment frequency, DORA metrics, defect rates.",
  },
  {
    title: "India-Scale Ready",
    description:
      "Delivering simultaneously across 20+ cities with consistent quality. We've built the logistics and trainer network to scale with you.",
  },
];

export default function About() {
  return (
    <div className="w-full pt-20 pb-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Practitioners who became teachers because the gap was too large to
            ignore.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            TraininGenie was built by engineers who spent years closing skill
            gaps inside large Indian enterprises — and eventually decided to do
            it at scale.
          </motion.p>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {MISSION}
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {VISION}
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
            How we operate.
          </h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={STAGGER}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── India-wide presence stats ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            India-wide presence.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            From Bengaluru and Hyderabad to Pune, Noida, and Chennai — our
            network of expert trainers spans the country's engineering hubs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {ABOUT_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

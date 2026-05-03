import { motion } from "framer-motion";
import { MISSION, VISION, ABOUT_STATS } from "@/data";

const EASE = [0.16, 1, 0.3, 1] as const;
const FADE_UP = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const VALUES = [
  { title: "Practitioner-Led",  description: "Every trainer is a working engineer or veteran architect — no academics, no generalists." },
  { title: "Context-First",     description: "We review your stack before writing a single slide. Training is built around your actual systems." },
  { title: "Outcome-Oriented",  description: "We measure success in engineering metrics — deployment frequency, DORA scores, defect rates." },
  { title: "India-Scale Ready", description: "Delivering consistently across 20+ cities. We've built the logistics to scale with you." },
];

export default function About() {
  return (
    <div className="w-full pt-[72px] pb-24">

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 px-5 sm:px-6 md:px-10">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight"
          >
            Practitioners who became teachers.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed max-w-xl"
          >
            TraininGenie was built by engineers who spent years closing skill gaps inside large Indian enterprises — and eventually decided to do it at scale.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 md:py-28 container mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20">
          {[
            { tag: "Mission", heading: "What we're here to do.", body: MISSION },
            { tag: "Vision",  heading: "Where we're headed.",   body: VISION },
          ].map((item) => (
            <div key={item.tag}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">{item.tag}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">{item.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 leading-tight">How we operate.</h2>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={STAGGER}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          >
            {VALUES.map((v, i) => (
              <motion.div key={i} variants={FADE_UP}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
              >
                <h3 className="text-base md:text-lg font-bold mb-3 text-primary">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 container mx-auto px-5 sm:px-6 md:px-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">India-wide presence.</h2>
        <p className="text-muted-foreground text-sm md:text-base mb-12 max-w-md leading-relaxed">
          From Bengaluru and Hyderabad to Pune, Noida, and Chennai.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ABOUT_STATS.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 md:p-7 text-center shadow-sm">
              <p className="text-3xl md:text-4xl font-black text-primary mb-1 tracking-tight">{s.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

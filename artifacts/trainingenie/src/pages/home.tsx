import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Code2, Cloud, Shield, PlayCircle } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const FADE_UP = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        {/* Clean SaaS Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          {/* Soft Glow */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-10 flex flex-col items-center text-center pt-24 pb-20">
          
          <motion.h1 
            variants={FADE_UP} initial="hidden" animate="show"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-[#0e1726] max-w-5xl leading-[1.05]"
          >
            Build engineering teams that <span className="text-[#313b72]">ship</span> <span className="text-[#bd6d38]">faster</span>
          </motion.h1>

          <motion.p 
            variants={FADE_UP} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium leading-relaxed"
          >
            Shape scattered skills into meaningful outcomes via hands-on, outcome-driven software engineering training programs.
          </motion.p>

          <motion.div 
            variants={FADE_UP} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="mt-12 flex items-center justify-center"
          >
            <Link href="/contact">
              <button className="px-8 py-4 bg-[#0e1726] text-white text-base font-bold rounded-full hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2">
                Start a conversation <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CLEAN FEATURES SECTION (NO CLUNKY BOXES) ───────────────── */}
      <section className="py-24 md:py-32 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}
            className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 max-w-6xl mx-auto"
          >
            <motion.div variants={FADE_UP} className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Modern Architecture</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deep-dive workshops covering microservices, domain-driven design, and scalable systems built around your stack.
              </p>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent">
                <Cloud className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Cloud & DevOps</h3>
              <p className="text-muted-foreground leading-relaxed">
                Hands-on training for Kubernetes, CI/CD pipelines, and infrastructure-as-code to streamline your deployments.
              </p>
            </motion.div>

            <motion.div variants={FADE_UP} className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6 text-destructive">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Zero-Trust Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Empower your engineers to own security from day one with secure coding practices and threat modeling.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="mt-20 text-center">
            <Link href="/past-trainings">
              <span className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors cursor-pointer text-lg">
                View our past trainings
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

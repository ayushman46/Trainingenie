import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/images/hero.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import techImage from "@/assets/images/service-technical.png";
import digitalImage from "@/assets/images/service-digital.png";
import {
  COMPANY_DESCRIPTION,
  STATS,
  FEATURED_SERVICES,
  TESTIMONIALS,
  WHY_US,
} from "@/data";

// ─── Animation variants (reused across sections) ─────────────────────────────
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Images mapped to featured services by index
const FEATURED_IMAGES = [techImage, digitalImage, leadershipImage];

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
          <img
            src={heroImage}
            alt="Software engineering training"
            className="w-full h-full object-cover object-right-top"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={STAGGER}
            className="max-w-3xl space-y-8"
          >
            <motion.div
              variants={FADE_UP}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              India's Premier Tech Training Partner
            </motion.div>

            <motion.h1
              variants={FADE_UP}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              Build engineering{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                teams
              </span>{" "}
              that ship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                faster.
              </span>
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
            >
              {COMPANY_DESCRIPTION}
            </motion.p>

            <motion.div
              variants={FADE_UP}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-13 px-8 rounded-full shadow-xl shadow-primary/20"
                >
                  Discuss Your Needs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-13 px-8 rounded-full bg-white/50 backdrop-blur hover:bg-white/80"
                >
                  Explore Programs
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={STAGGER}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                variants={FADE_UP}
                className="flex flex-col items-center text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMS ────────────────────────────────────────────── */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Hands-on training for every layer of the stack.
              </h2>
              <p className="text-lg text-muted-foreground">
                Not generic courses. Programmes customised to your codebase,
                your team, and your shipping goals.
              </p>
            </div>
            <Link href="/services">
              <Button
                variant="link"
                className="text-primary font-semibold text-base p-0 h-auto hover:no-underline group"
              >
                View all programmes{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={FEATURED_IMAGES[i]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                    {service.tagline}
                  </p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary font-medium text-sm">
                    Learn more{" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
            >
              <motion.h2
                variants={FADE_UP}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Why engineering teams choose us.
              </motion.h2>
              <motion.p
                variants={FADE_UP}
                className="text-lg text-muted-foreground mb-10 leading-relaxed"
              >
                We're not a training vendor. We're practitioners who spent years
                in the trenches before building the programme we wish had
                existed.
              </motion.p>

              <div className="space-y-6">
                {WHY_US.map((item, i) => (
                  <motion.div
                    variants={FADE_UP}
                    key={i}
                    className="flex gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial preview cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-full bg-primary/5 absolute -inset-8 blur-3xl" />
              <div className="bg-card border border-border shadow-2xl rounded-3xl p-8 relative z-10 space-y-6">
                {TESTIMONIALS.slice(0, 2).map((t) => (
                  <div key={t.id} className="p-6 bg-muted/50 rounded-2xl">
                    <div className="flex gap-1 mb-3 text-accent">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-base italic font-serif text-foreground/80 mb-5">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0">
                        {t.clientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{t.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.clientRole}, {t.clientCompany}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to level up your engineering team?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Let's build a training programme around your stack, your team size,
            and your delivery goals.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="text-base h-13 px-10 rounded-full shadow-2xl"
            >
              Schedule a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

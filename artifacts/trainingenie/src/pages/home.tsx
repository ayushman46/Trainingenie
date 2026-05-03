import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/images/hero.png";
import techImage from "@/assets/images/service-technical.png";
import digitalImage from "@/assets/images/service-digital.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import { STATS, FEATURED_SERVICES, TESTIMONIALS, WHY_US } from "@/data";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const FEATURED_IMAGES = [techImage, digitalImage, leadershipImage];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/10 z-10" />
          <img src={heroImage} alt="" className="w-full h-full object-cover object-right" />
        </div>

        <div className="relative z-20 container mx-auto px-5 md:px-8">
          <motion.div
            initial="hidden" animate="show" variants={STAGGER}
            className="max-w-2xl space-y-7"
          >
            <motion.span
              variants={FADE_UP}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              India's Premier Tech Training Partner
            </motion.span>

            <motion.h1
              variants={FADE_UP}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
            >
              Build engineering teams<br className="hidden sm:block" />{" "}
              that ship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                faster.
              </span>
            </motion.h1>

            <motion.p
              variants={FADE_UP}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Hands-on software engineering programmes — from microservices to DevOps —
              customised to your codebase and your team.
            </motion.p>

            <motion.div variants={FADE_UP} className="pt-2">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-primary/20 font-semibold">
                  Start a conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-14 overflow-hidden relative">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="container mx-auto px-5 md:px-8">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {STATS.map((s, i) => (
              <motion.div key={i} variants={FADE_UP} className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-1.5 text-sm text-primary-foreground/70 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROGRAMMES ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-5 md:px-8">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Training for every layer of the stack.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Not generic courses — programmes built around your actual systems and delivery goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURED_SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/15 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={FEATURED_IMAGES[i]}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2">{svc.tagline}</p>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <Button variant="outline" className="rounded-full px-8">
                See all programmes <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}
            >
              <motion.h2 variants={FADE_UP} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
                Why engineering teams choose us.
              </motion.h2>
              <motion.p variants={FADE_UP} className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
                We're practitioners who spent years in the trenches before building the programme we wish had existed.
              </motion.p>
              <div className="space-y-7">
                {WHY_US.map((item, i) => (
                  <motion.div key={i} variants={FADE_UP} className="flex gap-4">
                    <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <div key={t.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-1 mb-3 text-accent">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80 mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.clientName}</p>
                      <p className="text-xs text-muted-foreground">{t.clientRole} · {t.clientCompany}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.08),transparent)]" />
        <div className="relative z-10 container mx-auto px-5 md:px-8 text-center max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Ready to level up your engineering team?
          </h2>
          <p className="text-primary-foreground/75 text-base md:text-lg mb-8">
            Let's build a training programme around your stack, your team, and your goals.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-full px-10 h-12 font-semibold">
              Schedule a free call
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

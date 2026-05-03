import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/images/hero.png";
import techImage from "@/assets/images/service-technical.png";
import digitalImage from "@/assets/images/service-digital.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import { STATS, FEATURED_SERVICES, TESTIMONIALS, WHY_US } from "@/data";
import { CtaLink } from "@/components/cta-link";

const EASE = [0.16, 1, 0.3, 1] as const;
const FADE_UP = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const IMGS = [techImage, digitalImage, leadershipImage];

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end pb-16 md:items-center md:pb-0 pt-[72px] overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/10" />
          <img src={heroImage} alt="" className="h-full w-full object-cover object-center md:object-right" />
        </div>

        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <motion.div
            initial="hidden" animate="show" variants={STAGGER}
            className="max-w-xl space-y-6 md:space-y-8"
          >
            <motion.h1 variants={FADE_UP}
              className="text-[2.75rem] leading-[1.04] sm:text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tight"
            >
              Build engineering<br />
              teams that ship{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                faster.
              </span>
            </motion.h1>

            <motion.p variants={FADE_UP}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-md font-normal"
            >
              Hands-on software engineering programmes — microservices, DevOps, cloud — built around your actual codebase.
            </motion.p>

            <motion.div variants={FADE_UP} className="flex flex-row flex-wrap items-center gap-6 pt-4">
              {/* Primary CTA — sharp bordered box, fill slides up on hover */}
              <Link href="/contact">
                <span className="group relative inline-flex items-center overflow-hidden border border-foreground/70 px-8 py-3 text-sm font-bold cursor-pointer select-none tracking-wide">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-foreground group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 text-foreground group-hover:text-background transition-colors duration-200">
                    Start a conversation
                  </span>
                </span>
              </Link>

              {/* Secondary CTA — underline text link, no arrow */}
              <CtaLink href="/services" variant="muted" className="text-sm tracking-wide">
                See all programmes
              </CtaLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16 overflow-hidden relative">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/4 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10"
          >
            {STATS.map((s, i) => (
              <motion.div key={i}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                className="text-center py-2"
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight tabular-nums">{s.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-primary-foreground/65 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMMES ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-xs md:max-w-sm leading-tight">
              Training for every layer.
            </h2>
            <CtaLink href="/services" variant="muted">All programmes</CtaLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {FEATURED_SERVICES.map((svc, i) => (
              <motion.div key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: EASE }}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/12 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={IMGS[i]} alt={svc.title}
                    className="h-full w-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{svc.tagline}</p>
                  <h3 className="text-base md:text-lg font-bold leading-snug mb-1.5 group-hover:text-primary transition-colors">{svc.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">{svc.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={STAGGER}>
              <motion.h2 variants={FADE_UP} className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Why engineering teams choose us.
              </motion.h2>
              <motion.p variants={FADE_UP} className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-sm">
                Practitioners who spent years in the trenches — then built the training they wished existed.
              </motion.p>
              <div className="space-y-6">
                {WHY_US.map((item, i) => (
                  <motion.div key={i} variants={FADE_UP} className="flex gap-3.5">
                    <div className="mt-0.5 h-5 w-5 shrink-0 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial cards */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="space-y-4 lg:mt-8"
            >
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <div key={t.id} className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm">
                  <div className="flex gap-1 mb-3 text-accent">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80 mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.clientName}</p>
                      <p className="text-xs text-muted-foreground">{t.clientRole} · {t.clientCompany}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <CtaLink href="/case-studies" variant="muted">Read all impact stories</CtaLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/6 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
          >
            Ready to level up your engineering team?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-primary-foreground/70 text-base md:text-lg mb-10"
          >
            Let's build a programme around your stack, your team, and your goals.
          </motion.p>
          <CtaLink href="/contact" variant="light" className="text-lg md:text-xl">
            Schedule a free call
          </CtaLink>
        </div>
      </section>

    </div>
  );
}

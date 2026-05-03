import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CaseStudies() {
  return (
    <div className="w-full pt-[72px] pb-24">

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 px-5 sm:px-6 md:px-10">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-tight"
          >
            Impact that engineers measure.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
            className="text-primary-foreground/70 text-base md:text-lg leading-relaxed"
          >
            From 10-person startups to 5,000-engineer enterprises — hear from the leaders who've trained with us.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24 container mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.07, duration: 0.55, ease: EASE }}
              className="flex flex-col bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <div className="flex gap-1 mb-4 text-accent">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm md:text-base leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="h-9 w-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.clientName}</p>
                  <p className="text-xs text-muted-foreground">{t.clientRole} · {t.clientCompany}</p>
                  {t.industry && <p className="text-xs text-primary/70 font-semibold mt-0.5">{t.industry}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

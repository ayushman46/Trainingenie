import { motion } from "framer-motion";
import { Star, Quote, Building } from "lucide-react";
import { TESTIMONIALS } from "@/data";

export default function CaseStudies() {
  return (
    <div className="w-full pt-20 pb-24">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Impact that engineers measure.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            From 10-person startups to 5,000-engineer enterprises — hear from the
            engineering leaders who've trained with us.
          </motion.p>
        </div>
      </section>

      {/* ── Testimonials grid ────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index % 2 === 0 ? 0 : 0.1 }}
              className="bg-card border border-border p-10 rounded-3xl shadow-sm flex flex-col h-full"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-6 text-accent">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <Quote className="w-10 h-10 text-muted/40 mb-4" />

              <p className="text-lg md:text-xl italic font-serif leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base shrink-0">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t.clientName}</h4>
                  <p className="text-sm text-muted-foreground">{t.clientRole}</p>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium mt-1">
                    <Building className="w-4 h-4" />
                    {t.clientCompany}
                    {t.industry && (
                      <span className="opacity-50 font-normal">
                        {" "}
                        · {t.industry}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

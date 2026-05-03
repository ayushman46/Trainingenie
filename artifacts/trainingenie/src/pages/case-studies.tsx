import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data";

export default function CaseStudies() {
  return (
    <div className="w-full pt-20 pb-24">

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28 px-5 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
          >
            Impact that engineers measure.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary-foreground/75 text-base md:text-lg leading-relaxed"
          >
            Hear from the engineering leaders who've trained with us.
          </motion.p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 2) * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col bg-card border border-border rounded-2xl p-7 md:p-8 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5 text-accent">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base md:text-lg leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.clientName}</p>
                  <p className="text-xs text-muted-foreground">{t.clientRole} · {t.clientCompany}</p>
                  {t.industry && (
                    <p className="text-xs text-primary/70 font-medium mt-0.5">{t.industry}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

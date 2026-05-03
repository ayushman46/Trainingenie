import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data";
import techImage from "@/assets/images/service-technical.png";
import digitalImage from "@/assets/images/service-digital.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import salesImage from "@/assets/images/service-sales.png";
import softSkillsImage from "@/assets/images/service-soft-skills.png";
import deiImage from "@/assets/images/service-dei.png";

const IMAGES: Record<string, string> = {
  microservices:         techImage,
  devops:                digitalImage,
  cloud:                 leadershipImage,
  "api-design":          salesImage,
  "software-engineering": softSkillsImage,
  "data-engineering":    deiImage,
  security:              techImage,
  "ai-ml":               digitalImage,
};

export default function Services() {
  return (
    <div className="w-full pt-20 pb-24">

      {/* Header */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5"
          >
            Every layer of the modern stack.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
          >
            Customised to your codebase. Delivered by practitioners who've shipped in production.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-20">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 bg-muted">
                <img
                  src={IMAGES[svc.id] ?? techImage}
                  alt={svc.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2">{svc.tagline}</p>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">{svc.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">{svc.description}</p>
              <Link href={`/contact?service=${encodeURIComponent(svc.title)}`}>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

import { motion } from "framer-motion";
import { SERVICES } from "@/data";
import { CtaLink } from "@/components/cta-link";
import techImage        from "@/assets/images/service-technical.png";
import digitalImage     from "@/assets/images/service-digital.png";
import leadershipImage  from "@/assets/images/service-leadership.png";
import salesImage       from "@/assets/images/service-sales.png";
import softSkillsImage  from "@/assets/images/service-soft-skills.png";
import deiImage         from "@/assets/images/service-dei.png";

const EASE = [0.16, 1, 0.3, 1] as const;
const IMGS: Record<string, string> = {
  microservices:          techImage,
  devops:                 digitalImage,
  cloud:                  leadershipImage,
  "api-design":           salesImage,
  "software-engineering": softSkillsImage,
  "data-engineering":     deiImage,
  security:               techImage,
  "ai-ml":                digitalImage,
};

export default function Services() {
  return (
    <div className="w-full pt-[72px] pb-24">

      {/* Header */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10 container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 max-w-2xl"
        >
          Every layer of the modern stack.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
          className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed"
        >
          Customised to your codebase. Delivered by engineers who've shipped in production.
        </motion.p>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 md:gap-y-24">
          {SERVICES.map((svc, i) => (
            <motion.div key={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 2) * 0.06, duration: 0.55, ease: EASE }}
              className="group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6 bg-muted">
                <img src={IMGS[svc.id] ?? techImage} alt={svc.title}
                  className="h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{svc.tagline}</p>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-3 leading-snug">{svc.title}</h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">{svc.description}</p>
              <CtaLink href={`/contact?service=${encodeURIComponent(svc.title)}`} variant="muted">
                Inquire about this programme
              </CtaLink>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

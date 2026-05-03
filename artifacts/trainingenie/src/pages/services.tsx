import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data";
import techImage from "@/assets/images/service-technical.png";
import digitalImage from "@/assets/images/service-digital.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import salesImage from "@/assets/images/service-sales.png";
import softSkillsImage from "@/assets/images/service-soft-skills.png";
import deiImage from "@/assets/images/service-dei.png";

// Map service IDs to local images (add more as needed)
const SERVICE_IMAGES: Record<string, string> = {
  microservices: techImage,
  devops: digitalImage,
  cloud: leadershipImage,
  "api-design": salesImage,
  "software-engineering": softSkillsImage,
  "data-engineering": deiImage,
  security: techImage,
  "ai-ml": digitalImage,
};

export default function Services() {
  return (
    <div className="w-full pt-20 pb-24">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="bg-muted/30 py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Technical training for every layer of your stack.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Every programme is customised to your team's codebase and
            infrastructure — not a generic curriculum delivered from a deck.
          </motion.p>
        </div>
      </section>

      {/* ── Service grid ─────────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index % 2 === 0 ? 0 : 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl mb-8 bg-muted relative">
                <img
                  src={SERVICE_IMAGES[service.id] ?? techImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
                {service.tagline}
              </p>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base mb-6">
                {service.description}
              </p>
              <Link
                href={`/contact?service=${encodeURIComponent(service.title)}`}
              >
                <Button variant="outline" className="rounded-full group/btn">
                  Inquire about this programme
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

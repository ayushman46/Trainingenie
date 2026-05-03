import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import leadershipImage from "@/assets/images/service-leadership.png";
import salesImage from "@/assets/images/service-sales.png";
import techImage from "@/assets/images/service-technical.png";
import softSkillsImage from "@/assets/images/service-soft-skills.png";
import deiImage from "@/assets/images/service-dei.png";
import digitalImage from "@/assets/images/service-digital.png";

const SERVICES = [
  {
    id: "leadership",
    title: "Leadership & Management Development",
    desc: "Transform managers into visionary leaders. Programs focused on emotional intelligence, strategic thinking, and navigating complex organizational change.",
    image: leadershipImage
  },
  {
    id: "sales",
    title: "Sales Force Effectiveness",
    desc: "Equip your frontline with consultative selling skills, objection handling frameworks, and relationship-building strategies that close deals.",
    image: salesImage
  },
  {
    id: "soft-skills",
    title: "Communication & Soft Skills",
    desc: "Foster a culture of clarity. Workshops on executive presence, business storytelling, active listening, and cross-functional collaboration.",
    image: softSkillsImage
  },
  {
    id: "technical",
    title: "Technical & Functional Training",
    desc: "Bridge the skill gap with rigorous functional training tailored to your industry's specific technical requirements and operational processes.",
    image: techImage
  },
  {
    id: "compliance",
    title: "Compliance & Safety Training",
    desc: "Make mandatory training engaging. We transform dry regulatory requirements into interactive, memorable learning experiences.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80"
  },
  {
    id: "dei",
    title: "Diversity, Equity & Inclusion",
    desc: "Move beyond awareness to actionable inclusion. Programs designed to build psychological safety, mitigate bias, and leverage diverse perspectives.",
    image: deiImage
  },
  {
    id: "behavioral",
    title: "Behavioral & Mindset Transformation",
    desc: "Shift organizational culture by shifting individual mindsets. Deep interventions focused on resilience, agility, and growth mindset.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
  },
  {
    id: "digital",
    title: "Digital & AI Upskilling",
    desc: "Future-proof your workforce. Demystify AI, data analytics, and digital tools for non-technical professionals to drive innovation.",
    image: digitalImage
  }
];

export default function Services() {
  return (
    <div className="w-full pt-20 pb-24">
      {/* Header */}
      <section className="bg-muted/30 py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Specialized expertise for complex challenges.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Explore our comprehensive suite of learning interventions, tailored to meet the exact needs of your organization.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
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
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {service.desc}
              </p>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                <Button variant="outline" className="rounded-full">Inquire about this program</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

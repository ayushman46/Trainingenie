import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetCompanyStats, useListTestimonials } from "@workspace/api-client-react";
import { ArrowRight, Star, Building2, Users, MapPin, Award, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/images/hero.png";
import leadershipImage from "@/assets/images/service-leadership.png";
import salesImage from "@/assets/images/service-sales.png";
import techImage from "@/assets/images/service-technical.png";

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const { data: stats } = useGetCompanyStats();
  const { data: testimonials } = useListTestimonials();

  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
          <img 
            src={heroImage} 
            alt="Corporate Training" 
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
            <motion.div variants={FADE_UP} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              India's Premier B2B Training Partner
            </motion.div>
            
            <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Transform your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">people.</span><br />
              Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">growth.</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP} className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We deliver high-impact corporate training solutions that walk into boardrooms, factory floors, and tech parks to change how people work.
            </motion.p>
            
            <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact">
                <Button size="xl" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-xl shadow-primary/20">
                  Discuss Your Needs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="xl" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-white/50 backdrop-blur hover:bg-white/80">
                  Explore Expertise
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
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
            {[
              { icon: Building2, label: "Enterprises", value: stats?.clientsTrained ? `${stats.clientsTrained}+` : "500+" },
              { icon: Users, label: "Professionals", value: "50k+" },
              { icon: MapPin, label: "Cities Covered", value: stats?.citiesCovered ? `${stats.citiesCovered}+` : "25+" },
              { icon: Award, label: "Satisfaction", value: stats?.satisfactionRate ? `${stats.satisfactionRate}%` : "98%" },
            ].map((stat, i) => (
              <motion.div key={i} variants={FADE_UP} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 text-accent">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-primary-foreground/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPERTISE / SERVICES SECTION */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Mastery across every domain of work.</h2>
              <p className="text-lg text-muted-foreground">We don't do generic off-the-shelf courses. We build tailored interventions designed to move the needle on specific business outcomes.</p>
            </div>
            <Link href="/services">
              <Button variant="link" className="text-primary font-semibold text-lg p-0 h-auto hover:no-underline group">
                View all programs <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Leadership & Management", desc: "Building the next generation of confident, strategic leaders.", img: leadershipImage },
              { title: "Sales Force Effectiveness", desc: "Equipping your frontline to close deals and build relationships.", img: salesImage },
              { title: "Digital & Technical", desc: "Future-proofing your workforce for the AI era.", img: techImage },
            ].map((service, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.desc}</p>
                  <div className="flex items-center text-primary font-medium">
                    Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={STAGGER}
            >
              <motion.h2 variants={FADE_UP} className="text-3xl md:text-5xl font-bold mb-6">Why India's best companies choose us.</motion.h2>
              <motion.p variants={FADE_UP} className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We are not a generic consultancy. We are specialists who understand the nuance of the Indian corporate landscape — from factory floors to boardrooms.
              </motion.p>

              <div className="space-y-6">
                {[
                  { title: "Deep Domain Expertise", desc: "Our trainers aren't just facilitators; they are industry veterans with real-world experience." },
                  { title: "Measurable Impact", desc: "We link learning objectives directly to business KPIs. No vanity metrics." },
                  { title: "Engaging Delivery", desc: "Interactive, scenario-based learning that actually keeps professionals awake and engaged." }
                ].map((item, i) => (
                  <motion.div variants={FADE_UP} key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-full bg-primary/5 absolute -inset-8 blur-3xl" />
              <div className="bg-card border border-border shadow-2xl rounded-3xl p-8 relative z-10">
                <div className="flex flex-col gap-6">
                  {testimonials?.slice(0, 2).map((testimonial, i) => (
                    <div key={testimonial.id} className="p-6 bg-muted/50 rounded-2xl">
                      <div className="flex gap-1 mb-4 text-accent">
                        {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-lg italic font-serif text-foreground/80 mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                          {testimonial.clientName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{testimonial.clientName}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.clientRole}, {testimonial.clientCompany}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Ready to transform your workforce?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">
            Let's build a tailored learning strategy that drives real business results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-2xl">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { MapPin, Users, Target, Zap } from "lucide-react";
import { useGetCompanyStats } from "@workspace/api-client-react";

export default function About() {
  const { data: stats } = useGetCompanyStats();

  return (
    <div className="w-full pt-20 pb-24">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            The intersection of human potential and enterprise transformation.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            TraininGenie was founded with a singular belief: generic training doesn't work. We exist to build specialized, engaging learning experiences that fundamentally change how teams operate.
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To empower Indian enterprises with transformative learning solutions that drive measurable business performance, foster inclusive cultures, and unlock the true potential of every professional.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the most trusted and impactful learning partner for forward-looking organizations across India, redefining the standard of corporate education through innovation and empathy.
            </p>
          </div>
        </div>
      </section>

      {/* Presence Map Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">India-wide Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            From metropolitan tech hubs to industrial heartlands, our network of expert trainers spans across the country.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">{stats?.citiesCovered || 25}+</h3>
              <p className="text-muted-foreground font-medium">Cities</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">{stats?.expertTrainers || 80}+</h3>
              <p className="text-muted-foreground font-medium">Expert Trainers</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">{(stats?.clientsTrained || 500)}</h3>
              <p className="text-muted-foreground font-medium">Enterprise Clients</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-4xl font-bold text-primary mb-2">{(stats?.satisfactionRate || 98)}%</h3>
              <p className="text-muted-foreground font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

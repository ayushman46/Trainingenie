import { motion } from "framer-motion";
import { Star, Quote, Building } from "lucide-react";
import { useListTestimonials } from "@workspace/api-client-react";

export default function CaseStudies() {
  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <div className="w-full pt-20 pb-24">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Impact that speaks for itself.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 leading-relaxed"
          >
            Don't just take our word for it. Hear from the leaders and organizations whose teams we've helped transform.
          </motion.p>
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-24 container mx-auto px-4 md:px-6 max-w-6xl">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials?.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index % 2 === 0 ? 0 : 0.1 }}
                className="bg-card border border-border p-10 rounded-3xl shadow-sm flex flex-col h-full"
              >
                <div className="flex gap-1 mb-6 text-accent">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <Quote className="w-10 h-10 text-muted/50 mb-4" />
                
                <p className="text-lg md:text-xl italic font-serif leading-relaxed mb-8 flex-1">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl overflow-hidden shrink-0">
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
                    ) : (
                      testimonial.clientName.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">{testimonial.clientName}</h4>
                    <p className="text-muted-foreground">{testimonial.clientRole}</p>
                    <div className="flex items-center gap-1 text-sm text-primary font-medium mt-1">
                      <Building className="w-4 h-4" />
                      {testimonial.clientCompany} {testimonial.industry && <span className="opacity-60 font-normal">| {testimonial.industry}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import { PastTrainingsCarousel } from "@/components/past-trainings-carousel";
import { motion } from "framer-motion";

export default function PastTrainings() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#fcfdfa] overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1a3a28]">
            Our Legacy of Learning
          </h1>
          <p className="text-base sm:text-lg text-[#596d60] leading-relaxed max-w-2xl mx-auto font-medium">
            Explore our portfolio of past technical workshops and masterclasses. From AI to advanced cloud architectures, see the skills we've empowered teams with.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full"
      >
        <PastTrainingsCarousel />
      </motion.div>
    </div>
  );
}

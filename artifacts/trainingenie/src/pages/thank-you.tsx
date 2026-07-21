import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ThankYou() {
  return (
    <div className="w-full min-h-screen bg-[#fcfdfa] flex items-center justify-center pt-[72px] pb-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex justify-center mb-8"
        >
          <div className="h-20 w-20 rounded-full bg-[#e8efe9] flex items-center justify-center text-[#2d4a36]">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
          className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#2d4a36] leading-tight"
        >
          Thank You for Reaching Out
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
          className="text-lg text-[#596d60] leading-relaxed mb-4"
        >
          Your enquiry has been received successfully. Our team will review your requirements and get back to you within 24 business hours.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease: EASE }}
          className="text-[#8a9e90] text-sm mb-12"
        >
          In the meantime, feel free to explore our past trainings and case studies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto h-14 px-10 rounded-full text-base font-bold bg-[#0b2818] hover:bg-[#1a3a28] text-white">
              Back to Home <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <Link href="/past-trainings">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 rounded-full text-base font-bold border-[#d0ddd1] text-[#2d4a36] hover:bg-[#f0f4f1]">
              View Past Trainings
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

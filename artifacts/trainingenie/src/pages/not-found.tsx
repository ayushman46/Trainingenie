import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping" />
            <Compass className="w-12 h-12" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-primary"
        >
          404
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Looks like you've wandered off the training path.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-12"
        >
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/">
            <Button size="xl" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
              Return Home
            </Button>
          </Link>
          <Link href="/services">
            <Button size="xl" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
              Explore Our Expertise
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

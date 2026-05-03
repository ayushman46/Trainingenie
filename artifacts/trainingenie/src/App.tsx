import { Layout } from "@/components/layout";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 } },
});

// Smooth page-level transition — fade + subtle upward slide
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        className="page-wrapper"
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Switch location={location}>
          <Route path="/"             component={Home} />
          <Route path="/about"        component={About} />
          <Route path="/services"     component={Services} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/contact"      component={Contact} />
          <Route                      component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

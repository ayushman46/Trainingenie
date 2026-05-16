import { Layout } from "@/components/layout";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

import Home        from "@/pages/home";
import About       from "@/pages/about";
import Services    from "@/pages/services";
import CaseStudies from "@/pages/case-studies";
import Contact     from "@/pages/contact";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 5 * 60 * 1000 } },
});

// ── Dramatic page transition — blur + scale + fade ────────────────────────
// Pages "zoom focus-pull" in and out, like a camera lens pulling focus
const variants: any = {
  initial: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
    y: 24,
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      filter: { duration: 0.4 },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: "blur(8px)",
    y: -16,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
    },
  },
};

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        className="page-transition"
        variants={variants}
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
          <Route component={() => (
            <div className="flex items-center justify-center min-h-screen text-muted-foreground text-lg">
              Page not found.
            </div>
          )} />
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

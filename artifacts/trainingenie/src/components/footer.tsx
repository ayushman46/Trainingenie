import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribeNewsletter } from "@workspace/api-client-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const subscribe = useSubscribeNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          toast({
            title: "Subscribed successfully",
            description: "Welcome to the TraininGenie newsletter.",
          });
          setEmail("");
        },
        onError: () => {
          toast({
            title: "Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <footer className="bg-sidebar text-sidebar-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">
                T
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
                TraininGenie
              </span>
            </Link>
            <p className="text-sidebar-foreground/70 mb-6 leading-relaxed">
              India's trusted training partner for forward-looking enterprises. We transform potential into performance.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Expertise</h4>
            <ul className="space-y-4">
              <li><Link href="/services" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Leadership Development</Link></li>
              <li><Link href="/services" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Sales Effectiveness</Link></li>
              <li><Link href="/services" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Digital Upskilling</Link></li>
              <li><Link href="/services" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Soft Skills</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sidebar-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/case-studies" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Impact Stories</Link></li>
              <li><Link href="/contact" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="text-sidebar-foreground/70 hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Stay Updated</h4>
            <p className="text-sidebar-foreground/70 mb-4">
              Insights on enterprise learning and development, straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Work email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary"
              />
              <Button type="submit" disabled={subscribe.isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {subscribe.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join"}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sidebar-foreground/50">
          <p>© {new Date().getFullYear()} TraininGenie Pvt Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

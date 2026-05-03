import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button }   from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CONTACT_INFO, SERVICES } from "@/data";

const formSchema = z.object({
  name:    z.string().min(2, "Name is required"),
  email:   z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone:   z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Please provide a bit more detail"),
});
type FormValues = z.infer<typeof formSchema>;

const INFO = [
  { icon: MapPin, heading: "Headquarters", lines: CONTACT_INFO.address.split("\n") },
  { icon: Mail,   heading: "Email",        lines: [CONTACT_INFO.email, CONTACT_INFO.emailPartnership] },
  { icon: Phone,  heading: "Phone",        lines: [CONTACT_INFO.phone, CONTACT_INFO.hours] },
];

export default function Contact() {
  const [done, setDone] = useState(false);
  const defaultService = new URLSearchParams(window.location.search).get("service") || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", phone: "", service: defaultService, message: "" },
  });

  const onSubmit = (_data: FormValues) => setDone(true);

  return (
    <div className="w-full pt-20 pb-24">
      <div className="container mx-auto px-5 md:px-8 max-w-5xl mt-10 md:mt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
              Let's talk about your team.
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed mb-10">
              Whether it's a microservices bootcamp, a DevOps overhaul, or a cloud migration programme — we'll build something bespoke.
            </p>

            <div className="space-y-7">
              {INFO.map(({ icon: Icon, heading, lines }) => (
                <div key={heading} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">{heading}</p>
                    {lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border rounded-2xl p-7 md:p-8 shadow-md"
          >
            {done ? (
              <div className="flex flex-col items-center justify-center text-center py-14 gap-5">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold">Message received.</h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  We'll review your requirements and reach out within one business day.
                </p>
                <Button variant="outline" className="rounded-full" onClick={() => { setDone(false); form.reset(); }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6">Send a message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Arjun Mehta" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Work Email</FormLabel>
                          <FormControl><Input placeholder="arjun@company.com" type="email" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="company" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl><Input placeholder="Acme Tech" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="service" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Programme of interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a programme..." /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your engineering team, the skill gaps you're seeing, and your objectives..."
                            className="min-h-[110px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit" size="lg" className="w-full rounded-full font-semibold">
                      Submit Inquiry
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}

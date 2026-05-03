import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_INFO, SERVICES } from "@/data";

// ── Form validation schema ────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Please provide a bit more detail"),
});

type FormValues = z.infer<typeof formSchema>;

// ── Contact info items ────────────────────────────────────────────────────────
const INFO_ITEMS = [
  {
    icon: MapPin,
    heading: "Corporate Headquarters",
    lines: CONTACT_INFO.address.split("\n"),
  },
  {
    icon: Mail,
    heading: "Email Us",
    lines: [CONTACT_INFO.email, CONTACT_INFO.emailPartnership],
  },
  {
    icon: Phone,
    heading: "Call Us",
    lines: [CONTACT_INFO.phone, CONTACT_INFO.hours],
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Read service from URL query param so /contact?service=X pre-selects it
  const defaultService =
    new URLSearchParams(window.location.search).get("service") || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service: defaultService,
      message: "",
    },
  });

  const onSubmit = (_data: FormValues) => {
    // Replace this with your actual form submission logic (e.g. email service, CRM API)
    setSubmitted(true);
  };

  return (
    <div className="w-full pt-20 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl mt-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* ── Left — info ────────────────────────────────────────────── */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Let's talk about your team's next level.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-12"
            >
              Whether you need to upskill a microservices team, run a DevOps
              bootcamp, or roll out a cloud migration programme, we'll build
              something bespoke.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {INFO_ITEMS.map(({ icon: Icon, heading, lines }) => (
                <div key={heading} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{heading}</h3>
                    {lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — form ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-3xl p-8 shadow-xl"
          >
            {submitted ? (
              /* ── Success state ─────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Message received.</h2>
                <p className="text-muted-foreground max-w-xs">
                  We'll review your requirements and reach out within one
                  business day.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              /* ── Contact form ──────────────────────────────────────── */
              <>
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Arjun Mehta" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="arjun@company.com"
                                type="email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Tech" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+91 98765 43210"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Programme of interest</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a programme..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {SERVICES.map((s) => (
                                <SelectItem key={s.id} value={s.title}>
                                  {s.title}
                                </SelectItem>
                              ))}
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How can we help?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your engineering team, the skill gaps you're seeing, and what outcomes you're aiming for..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full"
                    >
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

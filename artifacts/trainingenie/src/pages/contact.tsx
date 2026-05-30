import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ArrowRight, Building2, User, Globe, Target, Users, MapPin } from "lucide-react";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button }   from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const EASE = [0.16, 1, 0.3, 1] as const;

const schema = z.object({
  organization: z.string().min(2, "Required"),
  role:         z.string().min(2, "Required"),
  domain:       z.string().optional(),
  depth:        z.string().optional(),
  teamSize:     z.string().optional(),
  skillLevel:   z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const DOMAINS = [
  "Microservices & Architecture",
  "DevOps & CI/CD",
  "Cloud Engineering",
  "Data Engineering",
  "Cybersecurity",
  "AI & Machine Learning",
];

export default function Contact() {
  const [done, setDone] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { organization: "", role: "", domain: "", depth: "", teamSize: "", skillLevel: "" },
  });

  const onSubmit = (_data: FormValues) => setDone(true);

  return (
    <div className="w-full bg-[#fcfdfa] min-h-screen pt-[120px] pb-24 font-sans text-[#2c3e32]">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight text-[#2d4a36]">
            Synthesizing Your<br />Technical Roadmap
          </h1>
          <p className="text-[#596d60] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            We bridge the gap between complex organizational needs and elite technical delivery. Initiate the process to find your perfect technical mediator.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
          className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8efe9]"
        >
          <h2 className="text-2xl font-bold mb-8 text-[#2d4a36]">Mediation Console</h2>
          
          {done ? (
            <div className="flex flex-col items-center justify-center text-center py-14 gap-5">
              <div className="h-16 w-16 rounded-full bg-[#e8efe9] flex items-center justify-center text-[#2d4a36]">
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#2d4a36]">Inquiry Submitted.</h2>
              <p className="text-[#596d60] text-base max-w-sm">
                We will analyze your requirements and connect with your team shortly.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Row 1: Org & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <FormField control={form.control} name="organization" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-[#596d60] uppercase tracking-wider flex items-center gap-2 mb-2">
                        <Building2 className="h-3.5 w-3.5" /> Client Organization
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" className="bg-[#f7f9f7] border-none h-12 rounded-xl text-sm px-4 focus-visible:ring-1 focus-visible:ring-[#2d4a36]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-[#596d60] uppercase tracking-wider flex items-center gap-2 mb-2">
                        <User className="h-3.5 w-3.5" /> Requester Role
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. CTO, Eng Manager" className="bg-[#f7f9f7] border-none h-12 rounded-xl text-sm px-4 focus-visible:ring-1 focus-visible:ring-[#2d4a36]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="w-full h-px bg-[#f0f4f1]" />

                {/* Row 2: Domain */}
                <FormField control={form.control} name="domain" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-[#596d60] uppercase tracking-wider flex items-center gap-2 mb-2">
                      <Globe className="h-3.5 w-3.5" /> Desired Technical Domain
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#f7f9f7] border-none h-12 rounded-xl text-sm px-4 focus-visible:ring-1 focus-visible:ring-[#2d4a36]">
                          <SelectValue placeholder="Select primary domain focus" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DOMAINS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="w-full h-px bg-[#f0f4f1]" />

                {/* Row 3: Depth & Cohort */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <FormField control={form.control} name="depth" render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-xs font-bold text-[#596d60] uppercase tracking-wider flex items-center gap-2 mb-4">
                        <Target className="h-3.5 w-3.5" /> Training Depth
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="foundational" className="border-[#2d4a36] text-[#2d4a36]" /></FormControl>
                            <FormLabel className="font-medium text-sm">Foundational (Conceptual)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="intermediate" className="border-[#2d4a36] text-[#2d4a36]" /></FormControl>
                            <FormLabel className="font-medium text-sm">Intermediate (Applied)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="advanced" className="border-[#2d4a36] text-[#2d4a36]" /></FormControl>
                            <FormLabel className="font-medium text-sm">Production-Grade (Advanced)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="space-y-4">
                    <label className="text-xs font-bold text-[#596d60] uppercase tracking-wider flex items-center gap-2 mb-4">
                      <Users className="h-3.5 w-3.5" /> Cohort Profile
                    </label>
                    <FormField control={form.control} name="teamSize" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Est. Team Size" className="bg-[#f7f9f7] border-none h-12 rounded-xl text-sm px-4 focus-visible:ring-1 focus-visible:ring-[#2d4a36]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="skillLevel" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe current skill level..." 
                            className="bg-[#f7f9f7] border-none min-h-[90px] rounded-xl text-sm p-4 resize-none focus-visible:ring-1 focus-visible:ring-[#2d4a36]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#f0f4f1]">
                  <Button type="submit" className="bg-[#0b2818] hover:bg-[#1a3a28] text-white rounded-full px-8 py-6 text-xs font-bold uppercase tracking-widest gap-2">
                    Submit Inquiry <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </motion.div>

        {/* Contact Info Footer Box */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <div className="bg-[#1e2a22] text-[#f7f9f7] rounded-3xl p-8 sm:p-10 w-full max-w-2xl text-center flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8 sm:gap-16">
            <div>
              <p className="text-[10px] font-bold text-[#8a9e90] uppercase tracking-widest mb-2">Direct Line</p>
              <p className="text-sm font-medium flex items-center justify-center gap-2">
                <Globe className="h-4 w-4 text-[#8a9e90]" />
                mediate@trainingenie.com
              </p>
            </div>
            <div className="hidden sm:block w-px bg-[#2d3a31] h-12 self-center" />
            <div>
              <p className="text-[10px] font-bold text-[#8a9e90] uppercase tracking-widest mb-2">Headquarters</p>
              <p className="text-sm font-medium flex items-start justify-center gap-2">
                <MapPin className="h-4 w-4 text-[#8a9e90] shrink-0 mt-0.5" />
                <span>100 Tech Hub Blvd.<br />Innovation District</span>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

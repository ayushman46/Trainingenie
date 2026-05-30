import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#042013] text-white pt-12 pb-8 flex flex-col items-center border-t border-[#123120]">
      <div className="text-2xl font-bold tracking-tight mb-8">
        Trainingenie
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-6 text-[#75907e] text-sm font-medium mb-10">
        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>

      <div className="text-[#597162] text-xs">
        © {new Date().getFullYear()} Trainingenie. All rights reserved.
      </div>
    </footer>
  );
}

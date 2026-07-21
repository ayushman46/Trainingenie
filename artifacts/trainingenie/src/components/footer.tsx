import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#042013] text-white pt-12 pb-8 flex flex-col items-center border-t border-[#123120] px-5 w-full">
      <div className="text-2xl font-bold tracking-tight mb-8">
        TraininGenie
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#75907e] text-xs sm:text-sm font-medium mb-10 px-2">
        <Link href="/privacy" className="hover:text-white transition-colors min-h-[44px] flex items-center">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-white transition-colors min-h-[44px] flex items-center">Terms of Service</Link>
        <Link href="/cookies" className="hover:text-white transition-colors min-h-[44px] flex items-center">Cookie Policy</Link>
        <Link href="/contact" className="hover:text-white transition-colors min-h-[44px] flex items-center">Contact</Link>
      </div>

      <div className="text-[#597162] text-xs px-4 text-center">
        © {new Date().getFullYear()} TraininGenie. All rights reserved.
      </div>
    </footer>
  );
}

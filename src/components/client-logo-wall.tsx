import Image from "next/image";

type ClientLogo = { name: string; logo?: string; className?: string };

const selectedClients: ClientLogo[] = [
  { name: "Subex", logo: "/client-logos/subex.png" },
  { name: "HDFC Home Loans", logo: "/client-logos/hdfc-home-loans.png" },
  { name: "Harman", logo: "/client-logos/harman.png" },
  { name: "TeamLease", logo: "/client-logos/teamlease.png" },
  { name: "NTT DATA", className: "text-[#174a8b]" },
  { name: "MetricStream", logo: "/client-logos/metricstream.png" },
  { name: "Alcon", logo: "/client-logos/alcon.png" },
  { name: "Colgate Palmolive", logo: "/client-logos/colgate-palmolive.png" },
  { name: "Essentra", logo: "/client-logos/essentra.png" },
  { name: "24 7 ai", logo: "/client-logos/247-ai.png" },
  { name: "Akshaya Patra", logo: "/client-logos/akshaya-patra.png" },
  { name: "iQUANTI", logo: "/client-logos/iquanti.png" },
];

export function ClientLogoWall({ clients = selectedClients }: { clients?: ClientLogo[] }) {
  return <section aria-label="Selected client references" className="bg-white px-5 py-14 sm:px-8 md:py-18"><div className="mx-auto max-w-7xl"><p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-accent">Selected client references</p><ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{clients.map((client) => <li key={client.name} className="flex min-h-24 items-center justify-center rounded-md border border-[#e8ebf0] bg-white px-3 py-4 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">{client.logo ? <Image src={client.logo} alt={client.name} width={220} height={92} className="max-h-16 w-auto max-w-[92%] object-contain" /> : <span className={`text-lg font-medium tracking-[-0.04em] sm:text-xl ${client.className ?? ""}`}>{client.name}</span>}</li>)}</ul><p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-600">Client names are shown as references only and do not describe a specific engagement or imply endorsement.</p></div></section>;
}

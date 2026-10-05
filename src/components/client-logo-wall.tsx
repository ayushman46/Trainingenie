import Image from "next/image";

type ClientLogo = { name: string; logo?: string; className?: string };

const selectedClients: ClientLogo[] = [
  { name: "Subex", logo: "/client-logos/subex.png" },
  { name: "HDFC Home Loans" },
  { name: "Harman" },
  { name: "TeamLease", logo: "/client-logos/teamlease.png" },
  { name: "NTT DATA" },
  { name: "MetricStream" },
  { name: "Alcon" },
  { name: "Colgate Palmolive", logo: "/client-logos/colgate-palmolive.jpg" },
];

export function ClientLogoWall({ clients = selectedClients }: { clients?: ClientLogo[] }) {
  return <section aria-label="Selected client references" className="bg-[#0e1726] px-5 py-14 text-white sm:px-8 md:py-18"><div className="mx-auto max-w-7xl"><p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-[#e6a16f]">Selected client references</p><div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">{clients.map((client) => <div key={client.name} className="flex min-h-16 items-center justify-center text-center"><span className="sr-only">{client.name}</span>{client.logo ? <Image src={client.logo} alt={client.name} width={180} height={64} className="max-h-14 w-auto max-w-[82%] object-contain brightness-0 invert" /> : <span aria-hidden="true" className={`text-lg font-extrabold tracking-[-0.04em] text-white/90 sm:text-xl ${client.className ?? ""}`}>{client.name}</span>}</div>)}</div><p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/45">Client names are shown as references only and do not describe a specific engagement or imply endorsement.</p></div></section>;
}

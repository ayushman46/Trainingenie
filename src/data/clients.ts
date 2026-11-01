// Client references shown on the home page, the Clients page and the hero proof rows. Entries without a logo render as a text tile.
export type ClientReference = { name: string; logo?: string; className?: string };

export const CLIENT_REFERENCES: ClientReference[] = [
  { name: "Subex", logo: "/client-logos/subex.png" },
  { name: "HDFC Home Loans", logo: "/client-logos/hdfc-home-loans.png" },
  { name: "Harman", logo: "/client-logos/harman.png" },
  { name: "TeamLease", logo: "/client-logos/teamlease.png" },
  { name: "NTT DATA", className: "text-[#174a8b]" },
  { name: "MetricStream", logo: "/client-logos/metricstream.png" },
  { name: "Alcon", logo: "/client-logos/alcon.png" },
  { name: "Colgate-Palmolive", logo: "/client-logos/colgate-palmolive.png" },
  { name: "Essentra", logo: "/client-logos/essentra.png" },
  { name: "[24]7.ai", logo: "/client-logos/247-ai.png" },
  { name: "Akshaya Patra", logo: "/client-logos/akshaya-patra.png" },
  { name: "iQUANTI", logo: "/client-logos/iquanti.png" },
];

export const CLIENT_DISCLAIMER = "Client names are shown as references only and do not describe a specific engagement or imply endorsement.";

// The five client references in the hero proof rows (ClientProof), in this order, taken from the client
// list by name, so a name that ever leaves the list simply drops out. Phones show the first four.
export const HERO_CLIENT_NAMES = ["HDFC Home Loans", "Harman", "NTT DATA", "Colgate-Palmolive", "TeamLease"];
export const HERO_CLIENTS = HERO_CLIENT_NAMES.map((name) => CLIENT_REFERENCES.find((client) => client.name === name)).filter((client): client is ClientReference => Boolean(client));

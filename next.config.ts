import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/services", destination: "/corporate-training-services", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/case-studies", destination: "/clients-and-testimonials", permanent: true },
    ];
  },
};

export default nextConfig;

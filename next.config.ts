import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera un servidor autocontenido en .next/standalone (imagen Docker mínima).
  output: "standalone",
};

export default nextConfig;

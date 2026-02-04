import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://images.openfoodfacts.org/**")],
  },
};

export default nextConfig;

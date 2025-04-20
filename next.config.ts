import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

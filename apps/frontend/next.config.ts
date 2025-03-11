import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vwfjdsgzdmzetylkknib.supabase.co",
        pathname: "/storage/v1/object/public/menu_image/*",
      },
    ],
  },
};

export default nextConfig;

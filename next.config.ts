// import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  // output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ['10.206.144.63',
    '192.168.254.104',
  ]
};

// export default nextConfig;
module.exports = nextConfig;

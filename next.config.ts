import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Assets are already web-ready JPG/PNG. sharp's install script was blocked
    // by npm and D: is a slow disk, so skip on-the-fly optimisation and serve
    // originals directly. Revisit sharp + re-enable for AVIF/resizing later.
    unoptimized: true,
  },
};

export default nextConfig;

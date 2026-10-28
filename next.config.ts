import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Assets are already web-ready JPG/PNG. sharp's install script was blocked
    // by npm and D: is a slow disk, so skip on-the-fly optimisation and serve
    // originals directly. Revisit sharp + re-enable for AVIF/resizing later.
    unoptimized: true,
  },
  // The single photo-series case was folded into the photography section of
  // the home page; links to the old URL land there instead of on a 404.
  async redirects() {
    return [
      {
        source: "/work/club-event-photography",
        destination: "/#photography",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

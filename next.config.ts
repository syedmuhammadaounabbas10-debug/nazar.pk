import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  /*
    The Next.js dev-tools indicator (the floating "N" badge) defaults to the
    bottom-left of the viewport, where it sat on top of the checkout form's
    "WhatsApp / Phone Number" field. It is development chrome rather than part
    of the page, so disabling it keeps the UI under review unobstructed. It has
    no effect on production builds.
  */
  devIndicators: false,
};

export default nextConfig;
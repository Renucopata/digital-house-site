import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// next-intl reads its request config from src/i18n/request.ts
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smaller), WebP for browsers without AVIF; chosen per request from the Accept header
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);

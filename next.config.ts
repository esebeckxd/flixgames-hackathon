import type { NextConfig } from "next";

// CF_PAGES is set automatically by Cloudflare Pages' build environment — so
// this only switches to a static export when Cloudflare is doing the build.
// Vercel's build (no CF_PAGES var) is completely unaffected and keeps using
// the default hybrid output. The app has no API routes/server actions/
// middleware/dynamic routes, so a static export is a safe, lossless mode.
const isCloudflareBuild = Boolean(process.env.CF_PAGES);

const nextConfig: NextConfig = {
  ...(isCloudflareBuild && {
    output: "export",
    images: { unoptimized: true },
  }),
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

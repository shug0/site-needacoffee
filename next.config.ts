import type { NextConfig } from 'next';

// Static export: `next build` writes plain HTML to out/, served by a Cloudflare Worker
// (wrangler.jsonc). Security headers live in public/_headers, since an export ignores headers().
const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'static.supabase.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    // Turbopack configuration (enabled by default in dev script)
    turbo: {
      // Any custom Turbopack configuration would go here
    },
    // Server components features
    serverComponentsExternalPackages: [],
    // Other experimental features you might want to enable
    // mdxRs: true,
  },
  // Customize headers, rewrites or redirects if needed
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Configure redirects/rewrites as needed
  // rewrites: async () => [],
  // redirects: async () => [],
};

export default nextConfig;

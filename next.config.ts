import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Disable source maps in production for smaller bundles
  productionBrowserSourceMaps: false,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    qualities: [75, 90],
    // Minimize image processing quality for faster loading
    minimumCacheTTL: 31536000,
  },

  // Compression
  compress: true,

  // Optimize package imports for tree-shaking
  experimental: {
    optimizePackageImports: [
      '@untitledui/icons',
      'framer-motion',
      'react-aria-components',
      'react-aria',
      '@react-email/components',
    ],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Video files cache headers
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // MDX support (for future blog)
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default nextConfig

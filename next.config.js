/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/hooks', 'lodash-es'],
  },
}

module.exports = nextConfig

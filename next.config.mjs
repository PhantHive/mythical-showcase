import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure output is configured for static export
  output: 'export',

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Build optimizations
  reactStrictMode: true,

  // Webpack configuration
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },

  // Optionally, configure images export if you're using next/image
  images: {
    unoptimized: true
  }
};

export default nextConfig;
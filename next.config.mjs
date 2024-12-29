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
  webpack: (config, { isServer }) => {
    // Explicitly set up module resolution
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  }
};

export default nextConfig;
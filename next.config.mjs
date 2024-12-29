import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure output is configured for static export
  output: 'export',

  // Disable server-side rendering for static export
  reactStrictMode: true,

  // Configure static export
  trailingSlash: true,

  // Webpack configuration
  webpack: (config) => {
    // Explicit module resolution for App Router
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },
};

export default nextConfig;
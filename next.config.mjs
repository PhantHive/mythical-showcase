import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure output is configured for static export
  output: 'export',

  // Add basePath for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/mythical-showcase' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mythical-showcase/' : '',

  // Disable server-side rendering for static export
  reactStrictMode: true,

  // Configure static export
  trailingSlash: true,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Explicit module resolution
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'src/components');

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },
};

export default nextConfig;
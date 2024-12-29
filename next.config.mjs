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
  webpack: (config, { isServer }) => {
    // Explicit module resolution
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');

    // Additional webpack configuration for module resolution
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },

  // Ensure all pages are statically generated
  async generateStaticParams() {
    return [];
  }
};

export default nextConfig;
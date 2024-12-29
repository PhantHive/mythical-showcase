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
    // Verbose module resolution
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');

    // Log module resolution details
    config.resolve.plugins.push({
      apply: (resolver) => {
        resolver.hooks.resolve.tap('CustomResolver', (resolveContext) => {
          console.log('Resolving:', resolveContext.request);
        });
      }
    });

    // Additional webpack configuration for module resolution
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },

  // Logging for module not found errors
  onBuildError: (error) => {
    console.error('Build Error:', error);
  }
};

export default nextConfig;
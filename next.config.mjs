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
    config.resolve.alias['@/components'] = path.resolve(process.cwd(), 'src/components');

    // Add .ts and .tsx to resolved extensions
    config.resolve.extensions.push('.ts', '.tsx');

    // Logging for debugging
    config.resolve.plugins.push({
      apply: (resolver) => {
        resolver.hooks.resolve.tap('CustomResolver', (request) => {
          console.log('Resolving:', request.request);
        });
      }
    });

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },
};

export default nextConfig;
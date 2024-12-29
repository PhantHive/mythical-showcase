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

    // Ensure all dynamic imports are handled for static export
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: false,
        },
      };
    }

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  },

  // Optionally, configure export paths if needed
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      ...defaultPathMap,
    };
  },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // GitHub Pages configuration
  basePath: process.env.GITHUB_ACTIONS ? '/mythical-showcase' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/mythical-showcase/' : '',

  // Images configuration
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '',
  },

  // Static exports settings
  trailingSlash: true,

  // Fix for static assets loading
  distDir: 'dist',

  // Webpack configuration to handle static assets
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
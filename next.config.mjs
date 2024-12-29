/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/mythical-showcase' : '',

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Build optimizations
  reactStrictMode: true,

  // Webpack configuration
  webpack: (config) => {
    const path = require('path');
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
import path from 'path';

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
    config.resolve.alias['@'] = path.resolve('src');
    return config;
  },
};

export default nextConfig;
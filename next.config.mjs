/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/mythical-showcase' : '',

  // Image optimization options
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'discord.com',
      },
    ],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Build optimizations
  reactStrictMode: true,

  // Environment configuration
  env: {
    NEXT_PUBLIC_DISCORD_CLIENT_ID: '1250496056521654393',
    NEXT_PUBLIC_DISCORD_INVITE: 'JJw53tsMcq',
  },

  // Experimental features
  experimental: {
    // Empty for now as previous options were incompatible
  },
};

export default nextConfig;
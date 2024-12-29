import path from 'path';
import fs from 'fs';

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
  webpack: (config, { isServer }) => {
    // Explicitly set up module resolution
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    // Debug logging for module resolution
    config.plugins.push(new (require('webpack')).DefinePlugin({
      'process.env.NEXT_DEBUG_MODULE_RESOLUTION': JSON.stringify('true')
    }));

    // Log existing aliases
    console.log('Webpack Aliases:', config.resolve.alias);

    // Verify file existence
    const cookieConsentPath = path.resolve(__dirname, 'src/components/cookies/CookieConsent.tsx');
    console.log('Checking CookieConsent path:', cookieConsentPath);
    console.log('CookieConsent file exists:', fs.existsSync(cookieConsentPath));

    return config;
  },

  // Configure static images
  images: {
    unoptimized: true
  }
};

export default nextConfig;
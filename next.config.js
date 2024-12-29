/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages configuration
    output: 'export',
    basePath: process.env.GITHUB_ACTIONS ? '/mythical-website' : '',
    assetPrefix: process.env.GITHUB_ACTIONS ? '/mythical-website/' : '',

    // Images configuration
    images: {
        unoptimized: true,
    },

    // Static exports settings
    trailingSlash: true,
};

export default nextConfig;

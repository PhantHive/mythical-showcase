/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages configuration
    output: 'export',
    assetPrefix: 'https://mythical.phearion.fr/mythical-showcase',
    basePath: process.env.GITHUB_ACTIONS ? '/mythical-showcase' : '',

    // Images configuration
    images: {
        unoptimized: true,
    },

    // Static exports settings
    trailingSlash: true,
};

export default nextConfig;

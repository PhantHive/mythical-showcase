import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import '@/styles/legal/legal.css';

const inter = Inter({ subsets: ['latin'] });

const basePath = process.env.GITHUB_PAGES
    ? 'https://mythical.phearion.fr/'
    : 'http://localhost:3000/';

export const metadata: Metadata = {
    title: 'Mythical Bot - Magical Discord Adventure',
    description:
        'MYTHICAL BOT - The ultimate bot for your Discord server. Enhance your server with powerful features and seamless integration.',
    keywords:
        'MYTHICAL BOT, Discord, Bot, Features, Integration, Server, Luminals, Cardinals, Discord Game, RPG Bot, Fantasy Game, Discord Adventure, Magical Creatures',
    authors: [{ name: 'PhantHive' }],
    openGraph: {
        type: 'website',
        title: 'MYTHICAL BOT',
        description:
            'The ultimate bot for your Discord server. Enhance your server with powerful features and seamless integration.',
        images: [
            {
                url: `${basePath}/Eggs/mystic-egg.png`,
                width: 256,
                height: 256,
                alt: 'Mythical Bot Logo',
            },
        ],
        url: 'https://mythical.phearion.fr/',
        siteName: 'Mythical Bot',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@PhantHive',
        creator: '@PhantHive',
        title: 'MYTHICAL BOT',
        description:
            'The ultimate bot for your Discord server. Enhance your server with powerful features and seamless integration.',
        images: [
            {
                url: `${basePath}/Eggs/mystic-egg.png`,
                width: 256,
                height: 256,
                alt: 'Mythical Bot Logo',
            },
        ],
    },
    icons: {
        icon: [
            {
                url: `${basePath}favicon.png`,
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: `${basePath}favicon.png`,
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
    applicationName: 'Mythical Bot',
    metadataBase: new URL('https://mythical.phearion.fr/'),
};

export const viewport: Viewport = {
    themeColor: '#8B5CF6',
    width: 'device-width',
    initialScale: 1,
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                {/* Google Analytics */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-CXJWKW5N4C" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-CXJWKW5N4C');
                        `,
                    }}
                />

                {/* Additional Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap"
                    rel="stylesheet"
                />

                {/* Paper Texture Filter */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <filter id="roughpaper" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.04"
                            result="noise"
                            numOctaves="5"
                        />
                        <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2">
                            <feDistantLight azimuth="45" elevation="60" />
                        </feDiffuseLighting>
                    </filter>
                </svg>
            </head>
            <body className={`${inter.className} bg-gray-900 text-white`}>
                {children}

                {/* Noscript Message */}
                <noscript>
                    <div
                        style={{
                            padding: '20px',
                            textAlign: 'center',
                            background: '#8b5cf6',
                            color: 'white',
                        }}
                    >
                        Please enable JavaScript to experience the magical world of Mythical Bot.
                    </div>
                </noscript>
            </body>
        </html>
    );
}

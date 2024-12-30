import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import '@/styles/legal/legal.css';

const inter = Inter({ subsets: ['latin'] });

const basePath = process.env.GITHUB_PAGES ? '/mythical.phearion.fr' : '';

export const metadata: Metadata = {
    title: 'Mythical Bot - Magical Discord Adventure',
    description:
        'Discover Mythical Bot: A unique Discord gaming experience featuring Luminals, Cardinals, and magical adventures. Collect creatures, customize your house, and join our enchanted community!',
    keywords:
        'Mythical Bot, Discord Bot, Luminals, Cardinals, Discord Game, RPG Bot, Fantasy Game, Discord Adventure, Magical Creatures',
    authors: [{ name: 'PhantHive' }],
    openGraph: {
        type: 'website',
        title: 'Mythical Bot - Your Magical Discord Adventure',
        description:
            'Embark on a magical journey! Collect Luminals, battle with Cardinals, customize your house, and explore an enchanted realm just within Discord!',
        images: [{ url: `${basePath}/Eggs/mystic-egg.png` }],
        url: 'https://phanthive.github.io/mythical-website/',
        siteName: 'Mythical Bot',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@PhantHive',
        creator: '@PhantHive',
        title: 'Mythical Bot - Your Magical Discord Adventure',
        description:
            'Join the magical world of Mythical Bot! Collect luminals, battle with Cardinals, and create your own house.',
        images: [`${basePath}/Eggs/mystic-egg.png`],
    },
    icons: {
        icon: [
            {
                url: `${basePath}/favicon.png`,
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: `${basePath}/favicon.png`,
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
    applicationName: 'Mythical Bot',
    metadataBase: new URL('https://phanthive.github.io/mythical-website/'),
};

export const viewport: Viewport = {
    themeColor: '#8B5CF6',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} bg-gray-900 text-white`}>{children}</body>
        </html>
    );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import '@/styles/legal/legal.css';

const inter = Inter({ subsets: ['latin'] });

const basePath = process.env.GITHUB_PAGES ? '/' : '';

export const metadata: Metadata = {
    title: 'Mythical - Discord Bot',
    description:
        'A magical Discord bot to enhance your server with a marvelous realm of Luminals, Cardinals and more!',
    icons: {
        icon: [
            {
                url: `${basePath}/Eggs/mystic-egg.png`,
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: `${basePath}/Eggs/mystic-egg.png`,
                sizes: '180x180',
                type: 'image/png',
            },
        ],
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="icon" href={`${basePath}/Eggs/mystic-egg.png`} type="image/png" />
            </head>
            <body className={`${inter.className} bg-gray-900 text-white`}>{children}</body>
        </html>
    );
}

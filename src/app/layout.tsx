import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import '@/styles/legal/legal.css';

const inter = Inter({ subsets: ['latin'] });

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
    title: 'Mythical - Discord Bot',
    description: 'A magical world of Luminals and Cardinals',
    icons: {
        icon: [
            {
                url: `${basePath}/eggs/mystic-egg.png`,
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [
            {
                url: `${basePath}/eggs/mystic-egg.png`,
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

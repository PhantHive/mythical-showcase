import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/theme.css';
import '@/styles/LegalComponents/LegalPage.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Mythical - Discord Bot',
    description: 'A magical world of Luminals and Cardinals',
    icons: {
        icon: [
          {
            url: '/Eggs/mystic-egg.png',
            sizes: '32x32',
            type: 'image/png',
          },
        ],
        apple: [
          {
            url: '/Eggs/mystic-egg.png',
            sizes: '180x180',
            type: 'image/png',
          },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} bg-gray-900 text-white`}>{children}</body>
        </html>
    );
}

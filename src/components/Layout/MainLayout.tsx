'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import MusicPlayer from '@/components/PhearionMusic/MusicPlayer';
import Footer from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    currentPath?: string;
    showNavigation?: boolean;
    showFooter?: boolean;
    showMusicPlayer?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    currentPath = '/',
    showNavigation = true,
    showFooter = true,
    showMusicPlayer = true,
}) => {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-gray-900 text-white">
            {/* Navigation */}
            {showNavigation && <Navigation currentPath={currentPath} />}

            {/* Main Content */}
            <main className="relative z-10">{children}</main>

            {/* Footer */}
            {showFooter && <Footer />}

            {/* Music Player */}
            {showMusicPlayer && <MusicPlayer />}

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
};

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!mounted) return null;

    return (
        <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-20 right-6 z-40 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
            initial={{ scale: 0 }}
            animate={{ scale: isVisible ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
            </svg>
        </motion.button>
    );
};

export default MainLayout;

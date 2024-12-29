'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameLayout from '../GameLayout';
import GameHero from '../GameHero';
import Cardinals from '@/components/Features/Cardinals';
import Eggs from '@/components/Features/Eggs';
import Footer from '../Footer';
import PrivacyPolicy from '@/app/legal/privacy/page';
import TermsOfService from '@/app/legal/terms/page';
import WinterGuide from '@/components/Special/WinterGuide';
import House from '@/components/Features/House';

const AppRouter = () => {
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        // Set initial path from hash
        setCurrentPath(window.location.hash.slice(1) || '/');

        // Listen for hash changes
        const handleHashChange = () => {
            setCurrentPath(window.location.hash.slice(1) || '/');
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const renderContent = () => {
        switch (currentPath) {
            case '/':
                return (
                    <GameLayout>
                        <GameHero />
                        <Eggs />
                        <Cardinals />
                        <House />
                        <Footer />
                    </GameLayout>
                );
            case '/legal/privacy':
                return (
                    <div className="legal-page">
                        <div className="scroll-container">
                            <a
                                href="#/"
                                className="group mb-8 inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                            >
                                ← Back to Home
                            </a>
                            <PrivacyPolicy />
                        </div>
                    </div>
                );
            case '/legal/terms':
                return (
                    <div className="legal-page">
                        <div className="scroll-container">
                            <a
                                href="#/"
                                className="group mb-8 inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                            >
                                ← Back to Home
                            </a>
                            <TermsOfService />
                        </div>
                    </div>
                );

            case '/winter':
                return (
                    <div>
                        <a
                            href="#/"
                            className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-lg bg-[#1a1b4b] px-4 py-2 text-[#FFD700] transition-colors hover:bg-[#0B1729]"
                        >
                            ← Back to Home
                        </a>
                        <WinterGuide />
                    </div>
                );
            default:
                return (
                    <GameLayout>
                        <GameHero />
                        <Eggs />
                        <Cardinals />
                        <House />
                        <Footer />
                    </GameLayout>
                );
        }
    };

    return renderContent();
};

// Use dynamic import with ssr disabled for client-side only routing
export default dynamic(() => Promise.resolve(AppRouter), {
    ssr: false,
});

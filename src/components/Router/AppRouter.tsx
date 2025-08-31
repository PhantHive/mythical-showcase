'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '../Layout/MainLayout';
import HeroSection from '../Layout/HeroSection';
import GameSections from '../Layout/GameSections';
import TermsOfService from '@/pages/legal/terms/page';
import PrivacyPolicy from '@/pages/legal/privacy/page';


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
                    <MainLayout currentPath={currentPath}>
                        <HeroSection />
                        <GameSections />
                    </MainLayout>
                );

            case '/privacy':
            case '/legal/privacy':
                return (
                    <MainLayout
                        currentPath={currentPath}
                        showNavigation={false}
                        showFooter={false}
                        showMusicPlayer={false}
                    >
                        <PrivacyPolicy />
                    </MainLayout>
                );

            case '/terms':
            case '/legal/terms':
                return (
                    <MainLayout
                        currentPath={currentPath}
                        showNavigation={false}
                        showFooter={false}
                        showMusicPlayer={false}
                    >
                        <TermsOfService />
                    </MainLayout>
                );

            // Future routes can be easily added here
            case '/shop':
                return (
                    <MainLayout currentPath={currentPath}>
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-white mb-4">Shop Coming Soon</h1>
                                <p className="text-white/70">Get ready for amazing items and upgrades!</p>
                                <a
                                    href="#/"
                                    className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </MainLayout>
                );

            case '/login':
                return (
                    <MainLayout currentPath={currentPath}>
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-white mb-4">Discord Login Coming Soon</h1>
                                <p className="text-white/70">Connect your Discord account for enhanced features!</p>
                                <a
                                    href="#/"
                                    className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </MainLayout>
                );

            // 404 fallback - use Next.js router
            default:
                // Use Next.js built-in 404 handling
                if (typeof window !== 'undefined') {
                    window.location.href = '/nonexistent-route-to-trigger-404';
                }
                return (
                    <MainLayout currentPath="/">
                        <div className="min-h-screen flex items-center justify-center">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold text-white mb-4">Redirecting...</h1>
                                <p className="text-xl text-white/70 mb-6">Taking you to our magical 404 page...</p>
                            </div>
                        </div>
                    </MainLayout>
                );
        }
    };

    return renderContent();
};

// Use dynamic import with ssr disabled for client-side only routing
export default dynamic(() => Promise.resolve(AppRouter), {
    ssr: false,
});

/**
 * EASY FEATURE ADDITIONS GUIDE:
 *
 * To add new pages/features:
 *
 * 1. Add a new case in the switch statement above
 * 2. Create the component in the appropriate folder
 * 3. Import it at the top of this file
 *
 * Examples:
 * - Shop: Already prepared above, just create ShopSection component
 * - Discord Login: Already prepared above, create LoginSection component
 * - Profile: Add case '/profile', create ProfileSection component
 * - Leaderboards: Add case '/leaderboards', create LeaderboardSection component
 *
 * The MainLayout handles all common functionality (nav, footer, music player)
 * so you only need to focus on the specific page content.
 */

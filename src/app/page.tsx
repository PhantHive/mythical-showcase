'use client';

import CookieConsent from '@/components/Cookies/CookieConsent';
import AppRouter from '@/components/Router/AppRouter';

/**
 * Root Page Component
 *
 * This is the main entry point for the Mythical Bot website.
 * It handles routing and includes the cookie consent component.
 *
 * Features:
 * - Client-side routing with hash-based navigation
 * - Cookie consent compliance
 * - Clean, maintainable structure
 *
 * Easy to extend with:
 * - Authentication state management
 * - Global state providers
 * - Analytics tracking
 * - Error boundaries
 */
export default function RootPage() {
    return (
        <>
            <AppRouter />
            <CookieConsent />
        </>
    );
}

'use client';

import CookieConsent from '@/components/cookies/CookieConsent';
import AppRouter from '@/components/router/AppRouter';

export default function RootPage() {
    return (
        <>
            <AppRouter />
            <CookieConsent />
        </>
    );
}

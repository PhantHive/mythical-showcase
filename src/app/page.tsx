'use client';

import AppRouter from '@/components/router/AppRouter';
import CookieConsent from '../components/cookies/CookieConsent';

export default function RootPage() {
    return (
        <>
            <AppRouter />
            <CookieConsent />
        </>
    );
}

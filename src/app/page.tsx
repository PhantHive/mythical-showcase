'use client';

import CookieConsent from '@/components/Cookies/CookieConsent';
import AppRouter from '@/components/Router/AppRouter';

export default function RootPage() {
    return (
        <>
            <AppRouter />
            <CookieConsent />
        </>
    );
}

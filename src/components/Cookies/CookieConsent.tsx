import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const CookieConsent = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShow(false);
    };

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Cookie Consent Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="rounded-xl border border-purple-500/20 bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-xl">
                            <div className="flex items-start gap-6">
                                {/* Cardinal Image */}
                                <div className="relative h-32 w-32 flex-shrink-0">
                                    <Image
                                        src="/Cardinals/heal-cardinal.png"
                                        alt="Cardinal Assistant"
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="mb-2 text-xl font-bold text-white">
                                        Welcome to Mythical!
                                    </h3>
                                    <p className="mb-4 text-gray-300">
                                        Our Cardinals use cookies to enhance your magical
                                        experience. By continuing to explore our realm, you agree to
                                        our use of cookies. 🍪
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={handleAccept}
                                            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2
                        font-medium text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Accept & Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;

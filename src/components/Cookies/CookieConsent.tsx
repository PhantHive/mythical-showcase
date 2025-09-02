'use client';

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
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Cookie Consent Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative mx-auto w-[90%] max-w-lg"
                    >
                        <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl">
                            <div className="p-4 sm:p-6">
                                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                                    {/* Cardinal Image */}
                                    <div className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
                                        <Image
                                            src="assets/Cardinals/heal-cardinal.png"
                                            alt="Cardinal Assistant"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="mb-2 text-xl font-bold text-white">
                                            Welcome to Mythical!
                                        </h3>
                                        <p className="mb-4 text-sm text-gray-300 sm:text-base">
                                            Our Cardinals use cookies to enhance your magical
                                            experience. By continuing to explore our realm, you
                                            agree to our use of cookies. 🍪
                                        </p>

                                        {/* Button */}
                                        <div className="flex justify-center sm:justify-end">
                                            <button
                                                onClick={handleAccept}
                                                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                                            >
                                                Accept & Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;

'use client';

import React, { useState, useEffect } from 'react';
import { FaYoutube, FaGamepad, FaPalette, FaDiscord, FaUsers } from 'react-icons/fa';

const Footer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (
                window.pageYOffset + window.innerHeight >=
                document.documentElement.scrollHeight - 100
            ) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <footer
            className={`relative mt-20 bg-gray-900 pb-6 pt-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600" />

            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Legal Links */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-white">Legal</h3>
                        <div className="space-y-2">
                            <a
                                href="/legal/privacy"
                                className="block text-gray-400 transition-colors hover:text-purple-400"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/legal/terms"
                                className="block text-gray-400 transition-colors hover:text-purple-400"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    {/* Credits */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-white">Credits</h3>
                        <div className="space-y-2">
                            <a
                                href="https://maya-design.cloud"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-purple-400"
                            >
                                <FaPalette className="text-xl" />
                                <span>Graphics by Maya Design</span>
                            </a>
                            <a
                                href="https://www.youtube.com/@PhearionMusic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-purple-400"
                            >
                                <FaYoutube className="text-xl" />
                                <span>Phearion Music</span>
                            </a>
                            <a
                                href="https://faultbox.itch.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-purple-400"
                            >
                                <FaGamepad className="text-xl" />
                                <span>Housing by Faultbox</span>
                            </a>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-white">Connect</h3>
                        <div className="space-y-4">
                            <a
                                href="https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
                            >
                                <FaDiscord className="text-xl" />
                                <span>Add to Discord</span>
                            </a>
                            <a
                                href="https://discord.gg/9bfmjajSEt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
                            >
                                <FaUsers className="text-xl" />
                                <span>Support Server</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-8">
                    <p className="text-center text-gray-400">
                        © 2024 Phearion Games • Mythical Bot • All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

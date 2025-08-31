'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FaYoutube,
    FaGamepad,
    FaPalette,
    FaDiscord,
    FaUsers,
    FaHeart,
    FaGem,
    FaServer,
    FaFistRaised,
    FaHome,
} from 'react-icons/fa';

const Footer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const toggleVisibility = () => {
            if (isMobile) {
                // On mobile, footer is always visible
                setIsVisible(true);
                return;
            }

            // Desktop behavior: show when near bottom
            if (
                window.pageYOffset + window.innerHeight >=
                document.documentElement.scrollHeight - 100
            ) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Initial check
        toggleVisibility();

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.05 : 0.1,
                duration: isMobile ? 0.3 : 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: isMobile ? 10 : 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.footer
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className={`relative mt-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden ${isMobile ? 'mobile-simple' : ''}`}
        >
            {/* Simplified Magical Background Elements for Mobile */}
            <div className="absolute inset-0 opacity-10">
                <div className={`absolute top-10 left-10 ${isMobile ? 'w-20 h-20' : 'w-32 h-32'} bg-purple-500 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'} ${isMobile ? '' : 'animate-pulse'}`}></div>
                <div className={`absolute bottom-20 right-20 ${isMobile ? 'w-24 h-24' : 'w-40 h-40'} bg-pink-500 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'} ${isMobile ? '' : 'animate-pulse delay-1000'}`}></div>
                <div className={`absolute top-1/2 left-1/3 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'} bg-yellow-500 rounded-full ${isMobile ? 'blur-lg' : 'blur-2xl'} ${isMobile ? '' : 'animate-pulse delay-500'}`}></div>
            </div>

            {/* Animated Top Border */}
            <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 ${isMobile ? '' : 'animate-pulse'}`} />

            {/* Floating Cardinals - Simplified for mobile */}
            <div className={`absolute top-8 right-8 ${isMobile ? 'opacity-10' : 'opacity-20'}`}>
                <motion.div
                    animate={isMobile ? {} : { y: [0, -10, 0] }}
                    transition={isMobile ? {} : { duration: 3, repeat: Infinity }}
                >
                    <Image
                        src="assets/Cardinals/Chibi/chibi-attack.png"
                        alt="Floating Cardinal"
                        width={isMobile ? 50 : 80}
                        height={isMobile ? 50 : 80}
                        className="object-contain"
                    />
                </motion.div>
            </div>

            <div className={`relative z-10 mx-auto max-w-7xl ${isMobile ? 'px-2 pt-12 pb-6' : 'px-4 pt-20 pb-8'}`}>
                {/* Main Footer Content */}
                <motion.div
                    variants={itemVariants}
                    className={`${isMobile ? 'mb-8' : 'mb-16'} text-center`}
                >
                    <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold mb-4`}>
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                            MYTHICAL
                        </span>
                    </h2>
                    <p className={`${isMobile ? 'text-base px-4' : 'text-xl'} text-gray-300 max-w-2xl mx-auto leading-relaxed`}>
                        The most magical Discord gaming experience. One command, infinite adventures.
                    </p>
                </motion.div>

                {/* Honest Stats Row - Mobile optimized */}
                <motion.div
                    variants={itemVariants}
                    className={`grid ${isMobile ? 'grid-cols-2 gap-3 mb-8' : 'grid-cols-2 md:grid-cols-4 gap-6 mb-16'}`}
                >
                    <div className={`text-center ${isMobile ? 'p-3' : 'p-6'} rounded-xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10`}>
                        <FaServer className={`${isMobile ? 'text-xl' : 'text-3xl'} text-purple-400 mx-auto mb-3`} />
                        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>300+</div>
                        <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Discord Servers</div>
                    </div>
                    <div className={`text-center ${isMobile ? 'p-3' : 'p-6'} rounded-xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10`}>
                        <FaGem className={`${isMobile ? 'text-xl' : 'text-3xl'} text-blue-400 mx-auto mb-3`} />
                        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>50+</div>
                        <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Unique Luminals</div>
                    </div>
                    <div className={`text-center ${isMobile ? 'p-3' : 'p-6'} rounded-xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10`}>
                        <FaFistRaised className={`${isMobile ? 'text-xl' : 'text-3xl'} text-red-400 mx-auto mb-3`} />
                        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>50</div>
                        <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Battle Stages</div>
                    </div>
                    <div className={`text-center ${isMobile ? 'p-3' : 'p-6'} rounded-xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10`}>
                        <FaHome className={`${isMobile ? 'text-xl' : 'text-3xl'} text-green-400 mx-auto mb-3`} />
                        <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white`}>100s</div>
                        <div className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Housing Options</div>
                    </div>
                </motion.div>

                {/* Links Grid - Mobile optimized */}
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-6 mb-8' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'}`}>
                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-6 flex items-center gap-2`}>
                            <FaGamepad className="text-purple-400" />
                            Quick Start
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Add to Server
                            </a>
                            <a
                                href="https://discord.gg/9bfmjajSEt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Support Server
                            </a>
                            <a
                                href="https://top.gg/bot/1250496056521654393"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Vote on Top.gg
                            </a>
                        </div>
                    </motion.div>

                    {/* Legal */}
                    <motion.div variants={itemVariants}>
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-6`}>Legal</h3>
                        <div className="space-y-3">
                            <a
                                href="#/privacy"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Privacy Policy
                            </a>
                            <a
                                href="#/terms"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Terms of Service
                            </a>
                            <a
                                href="https://discord.com/terms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block text-gray-400 hover:text-purple-400 transition-colors ${isMobile ? '' : 'hover:translate-x-2 transform'} duration-200 ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                → Discord ToS
                            </a>
                        </div>
                    </motion.div>

                    {/* Credits */}
                    <motion.div variants={itemVariants}>
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-6 flex items-center gap-2`}>
                            <FaHeart className="text-red-400" />
                            Credits
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="https://maya-design.cloud"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                <FaPalette className={`text-sm ${isMobile ? '' : 'group-hover:text-pink-400'} transition-colors`} />
                                <span>Maya Design</span>
                            </a>
                            <a
                                href="https://www.youtube.com/@PhearionMusic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                <FaYoutube className={`text-sm ${isMobile ? '' : 'group-hover:text-red-400'} transition-colors`} />
                                <span>Phearion Music</span>
                            </a>
                            <a
                                href="https://faultbox.itch.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                <FaGamepad className={`text-sm ${isMobile ? '' : 'group-hover:text-green-400'} transition-colors`} />
                                <span>Faultbox Housing</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Community */}
                    <motion.div variants={itemVariants}>
                        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-6`}>Community</h3>
                        <div className="space-y-4">
                            <a
                                href="https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} text-white transition-all ${isMobile ? '' : 'hover:scale-105 transform'} ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                <FaDiscord className={`${isMobile ? 'text-base' : 'text-lg'}`} />
                                <span className="font-medium">Add Bot</span>
                            </a>
                            <a
                                href="https://discord.gg/9bfmjajSEt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} text-white transition-all ${isMobile ? '' : 'hover:scale-105 transform'} ${isMobile ? 'mobile-touch-target' : ''}`}
                            >
                                <FaUsers className={`${isMobile ? 'text-base' : 'text-lg'}`} />
                                <span className="font-medium">Join Server</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    variants={itemVariants}
                    className={`border-t border-gray-800 ${isMobile ? 'pt-6' : 'pt-8'}`}
                >
                    <div className={`flex ${isMobile ? 'flex-col gap-4 text-center' : 'flex-col md:flex-row justify-between items-center gap-4'}`}>
                        <div className={`${isMobile ? 'text-center' : 'text-center md:text-left'}`}>
                            <p className={`text-gray-400 ${isMobile ? 'text-sm mb-1' : 'mb-2'}`}>
                                © 2024 Phearion Games • Mythical Bot • All rights reserved
                            </p>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>
                                Made with <FaHeart className={`inline text-red-400 ${isMobile ? 'text-xs' : 'text-xs'}`} /> for the Discord community
                            </p>
                        </div>

                        {/* Mini Cardinal - Simplified animation for mobile */}
                        <motion.div
                            animate={isMobile ? {} : { rotate: [0, 10, -10, 0] }}
                            transition={isMobile ? {} : { duration: 4, repeat: Infinity }}
                            className="opacity-60"
                        >
                            <Image
                                src="/assets/Cardinals/Chibi/chibi-heal.png"
                                alt="Mini Cardinal"
                                width={isMobile ? 30 : 40}
                                height={isMobile ? 30 : 40}
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Glow Effect - Simplified for mobile */}
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${isMobile ? 'w-48 h-12' : 'w-96 h-24'} bg-gradient-to-t from-purple-600/20 to-transparent ${isMobile ? 'blur-xl' : 'blur-3xl'}`} />
        </motion.footer>
    );
};

export default Footer;

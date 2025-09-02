'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import ActionButtons from './ActionButtons';

interface NavigationProps {
    currentPath?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath = '/' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobile, setIsMobile] = useState(false);
    const [tcgDropdownOpen, setTcgDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const sections = ['home', 'luminals', 'cardinals', 'features'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const navItems = [
        { label: 'Home', href: 'home', id: 'home' },
        { label: 'Luminals', href: 'luminals', id: 'luminals' },
        { label: 'Cardinals', href: 'cardinals', id: 'cardinals' },
        { label: 'Features', href: 'features', id: 'features' },
    ];

    const scrollToSection = (sectionId: string) => {
        if (sectionId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    const navigateToTCG = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/tcg';
        }
        setTcgDropdownOpen(false);
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'border-b border-white/10 bg-black/80 py-1 shadow-xl backdrop-blur-lg'
                        : 'bg-transparent py-3'
                } `}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`flex items-center justify-between ${isMobile ? 'h-16' : 'h-20'}`}
                    >
                        {/* Logo */}
                        <motion.div
                            className="flex cursor-pointer items-center"
                            onClick={() => scrollToSection('home')}
                            whileHover={isMobile ? {} : { scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span
                                className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-horizon bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-bold text-transparent`}
                            >
                                MYTHICAL
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center space-x-8 lg:flex">
                            {navItems.map(item => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`relative rounded-lg px-4 py-3 text-lg font-medium transition-all duration-200 ${
                                        activeSection === item.id
                                            ? 'font-bold text-purple-400'
                                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                                    } `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                                        />
                                    )}
                                </motion.button>
                            ))}

                            {/* TCG Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setTcgDropdownOpen(true)}
                                onMouseLeave={() => setTcgDropdownOpen(false)}
                            >
                                <motion.button
                                    className="relative flex items-center gap-2 rounded-lg px-4 py-3 text-lg font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    MYTHICAL TCG
                                    {mounted && (
                                        <FaChevronDown
                                            className={`transition-transform duration-200 ${tcgDropdownOpen ? 'rotate-180' : ''}`}
                                            size={12}
                                        />
                                    )}
                                </motion.button>

                                {/* TCG Dropdown Menu - Massive Banner, Clean Display */}
                                <AnimatePresence>
                                    {tcgDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -15, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -15, scale: 0.9 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            className="absolute left-0 top-full mt-3 w-[650px] overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-black/95 shadow-2xl backdrop-blur-2xl"
                                            style={{
                                                boxShadow:
                                                    '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(147, 51, 234, 0.3)',
                                            }}
                                        >
                                            {/* MASSIVE Clean Card Banner - Full Width Display */}
                                            <div className="relative h-80 overflow-hidden">
                                                <img
                                                    src="/assets/tcg/card-banner.png"
                                                    alt="TCG Banner"
                                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                                {/* Minimal overlay only at very bottom */}
                                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent" />

                                                {/* Subtle sparkles */}
                                                <div className="absolute inset-0 opacity-30">
                                                    <div
                                                        className="absolute left-20 top-10 h-2 w-2 animate-pulse rounded-full bg-yellow-400"
                                                        style={{ animationDelay: '0s' }}
                                                    />
                                                    <div
                                                        className="absolute right-28 top-24 h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400"
                                                        style={{ animationDelay: '0.8s' }}
                                                    />
                                                    <div
                                                        className="absolute bottom-24 left-28 h-1 w-1 animate-pulse rounded-full bg-purple-400"
                                                        style={{ animationDelay: '1.6s' }}
                                                    />
                                                    <div
                                                        className="absolute bottom-20 right-24 h-2 w-2 animate-pulse rounded-full bg-cyan-400"
                                                        style={{ animationDelay: '2.4s' }}
                                                    />
                                                    <div
                                                        className="absolute right-16 top-16 h-1 w-1 animate-pulse rounded-full bg-yellow-300"
                                                        style={{ animationDelay: '3.2s' }}
                                                    />
                                                    <div
                                                        className="absolute bottom-16 left-16 h-1.5 w-1.5 animate-pulse rounded-full bg-pink-300"
                                                        style={{ animationDelay: '4s' }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Dropdown Options */}
                                            <div className="space-y-4 p-6">
                                                <motion.button
                                                    onClick={navigateToTCG}
                                                    className="group relative w-full overflow-hidden"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 transition-all duration-300 group-hover:from-purple-600/30 group-hover:to-pink-600/30" />
                                                    <div className="relative rounded-xl border border-white/10 px-6 py-4 text-left transition-all duration-300 group-hover:border-white/20">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-horizon mb-1 text-lg font-bold text-white">
                                                                    See All Cards
                                                                </h4>
                                                                <p className="text-sm text-white/70">
                                                                    Explore the complete collection
                                                                    of 15 unique cards
                                                                </p>
                                                            </div>
                                                            <motion.div
                                                                className="text-purple-400 transition-colors group-hover:text-pink-400"
                                                                whileHover={{ x: 5 }}
                                                            >
                                                                {mounted && (
                                                                    <svg
                                                                        className="h-6 w-6"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.button>

                                                {/* Card preview mini gallery */}
                                                <div className="flex justify-center gap-3 pt-2">
                                                    <div className="h-12 w-10 rounded bg-gradient-to-b from-gray-400 to-gray-600 opacity-60" />
                                                    <div className="h-12 w-10 rounded bg-gradient-to-b from-blue-400 to-blue-600 opacity-70" />
                                                    <div className="h-12 w-10 rounded bg-gradient-to-b from-purple-400 to-purple-600 opacity-80" />
                                                    <div className="h-12 w-10 rounded bg-gradient-to-b from-yellow-400 to-yellow-600 opacity-90" />
                                                </div>
                                                <p className="mt-2 text-center text-sm font-medium text-white/50">
                                                    C • R • SR • SSR
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden lg:flex">
                            <ActionButtons variant="compact" showTopGG={false} />
                        </div>

                        {/* Mobile Menu Button - Enhanced for touch */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`mobile-touch-target rounded-lg p-3 text-white transition-colors hover:bg-white/10`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {mounted &&
                                    (isOpen ? (
                                        <FaTimes size={isMobile ? 20 : 24} />
                                    ) : (
                                        <FaBars size={isMobile ? 20 : 24} />
                                    ))}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Optimized */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: isMobile ? 0.15 : 0.2 }}
                        className="mobile-simple fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className={`h-full bg-black/95 backdrop-blur-xl ${isMobile ? 'px-2 pt-20' : 'px-4 pt-24'}`}
                        >
                            <div className="space-y-6">
                                {/* Mobile Navigation Items */}
                                <div className="space-y-3">
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item.label}
                                            onClick={() => scrollToSection(item.href)}
                                            className={`block w-full text-left ${isMobile ? 'px-4 py-3' : 'px-6 py-4'} rounded-xl font-medium ${isMobile ? 'text-lg' : 'text-xl'} mobile-touch-target transition-all ${
                                                activeSection === item.id
                                                    ? 'bg-purple-400/20 font-bold text-purple-400'
                                                    : 'text-white hover:bg-white/10'
                                            } `}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * (isMobile ? 0.05 : 0.1) }}
                                        >
                                            {item.label}
                                        </motion.button>
                                    ))}

                                    {/* Mobile TCG Button */}
                                    <motion.button
                                        onClick={navigateToTCG}
                                        className={`block w-full text-left ${isMobile ? 'px-4 py-3' : 'px-6 py-4'} rounded-xl font-medium ${isMobile ? 'text-lg' : 'text-xl'} mobile-touch-target text-white transition-all hover:bg-white/10`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: navItems.length * (isMobile ? 0.05 : 0.1),
                                        }}
                                    >
                                        MYTHICAL TCG
                                    </motion.button>
                                </div>

                                {/* Mobile Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: isMobile ? 0.2 : 0.3 }}
                                    className="border-t border-white/20 pt-8"
                                >
                                    <ActionButtons variant="section" className="flex-col" />
                                </motion.div>

                                {/* Additional Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: isMobile ? 0.25 : 0.4 }}
                                    className="space-y-3 pt-8 text-center"
                                >
                                    <a
                                        href="#/privacy"
                                        className={`block text-white/60 transition-colors hover:text-white ${isMobile ? 'text-base' : 'text-lg'} mobile-touch-target`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Privacy Policy
                                    </a>
                                    <a
                                        href="#/terms"
                                        className={`block text-white/60 transition-colors hover:text-white ${isMobile ? 'text-base' : 'text-lg'} mobile-touch-target`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Terms of Service
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;

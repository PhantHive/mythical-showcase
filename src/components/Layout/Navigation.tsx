'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaGem } from 'react-icons/fa';
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
    const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
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
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    const navigateToTCG = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/collection/tcg';
        }
        setTcgDropdownOpen(false);
        setIsOpen(false);
    };

    const navigateToLuminalsCollection = () => {
        if (typeof window !== 'undefined') {
            window.location.href = '/collection/luminals';
        }
        setCollectionDropdownOpen(false);
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <>
            <nav
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'border-b border-white/10 bg-black/80 py-2 shadow-xl backdrop-blur-md'
                        : 'bg-transparent py-4'
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div
                        className={`flex items-center justify-between ${isMobile ? 'h-14' : 'h-16'}`}
                    >
                        {/* Logo */}
                        <div
                            className="flex cursor-pointer items-center transition-transform duration-200 hover:scale-105"
                            onClick={() => scrollToSection('home')}
                        >
                            <span
                                className={`${isMobile ? 'text-xl' : 'text-2xl'} font-horizon bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text font-bold text-transparent`}
                            >
                                MYTHICAL
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden items-center space-x-6 lg:flex">
                            {navItems.map(item => (
                                <button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`relative px-3 py-2 text-base font-medium transition-colors duration-200 ${
                                        activeSection === item.id
                                            ? 'text-purple-400'
                                            : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </button>
                            ))}

                            {/* Collection Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setCollectionDropdownOpen(true)}
                                onMouseLeave={() => setCollectionDropdownOpen(false)}
                            >
                                <button
                                    className={`flex items-center gap-1 px-3 py-2 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white ${
                                        collectionDropdownOpen ? 'text-white' : ''
                                    }`}
                                >
                                    Collection
                                    <FaChevronDown
                                        className={`text-xs transition-transform duration-200 ${
                                            collectionDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* Collection Dropdown Menu */}
                                <AnimatePresence>
                                    {collectionDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-white/10 bg-black/95 p-4 shadow-xl backdrop-blur-sm"
                                        >
                                            <button
                                                onClick={navigateToLuminalsCollection}
                                                className="group w-full rounded-lg border border-white/10 p-4 text-left transition-colors duration-200 hover:border-white/20 hover:bg-white/5"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="mb-1 flex items-center gap-2">
                                                            <FaGem className="text-sm text-blue-400" />
                                                            <h4 className="font-medium text-white">
                                                                Luminals Collection
                                                            </h4>
                                                        </div>
                                                        <p className="text-sm text-white/60">
                                                            View all 41 magical Luminals
                                                        </p>
                                                    </div>
                                                    <div className="text-blue-400 transition-transform duration-200 group-hover:translate-x-1">
                                                        →
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* TCG Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setTcgDropdownOpen(true)}
                                onMouseLeave={() => setTcgDropdownOpen(false)}
                            >
                                <button
                                    className={`flex items-center gap-1 px-3 py-2 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white ${
                                        tcgDropdownOpen ? 'text-white' : ''
                                    }`}
                                >
                                    MYTHICAL TCG
                                    <FaChevronDown
                                        className={`text-xs transition-transform duration-200 ${
                                            tcgDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {/* TCG Dropdown Menu */}
                                <AnimatePresence>
                                    {tcgDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-0 top-full mt-2 w-96 overflow-hidden rounded-xl border border-white/10 bg-black/95 shadow-xl backdrop-blur-sm"
                                        >
                                            {/* Simplified banner */}
                                            <div className="h-32 overflow-hidden">
                                                <img
                                                    src="/assets/tcg/card-banner.png"
                                                    alt="TCG Banner"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="p-4">
                                                <button
                                                    onClick={navigateToTCG}
                                                    className="group w-full rounded-lg border border-white/10 p-4 text-left transition-colors duration-200 hover:border-white/20 hover:bg-white/5"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="mb-1 font-medium text-white">
                                                                See All Cards
                                                            </h4>
                                                            <p className="text-sm text-white/60">
                                                                Explore 15 unique cards
                                                            </p>
                                                        </div>
                                                        <div className="text-purple-400 transition-transform duration-200 group-hover:translate-x-1">
                                                            →
                                                        </div>
                                                    </div>
                                                </button>
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

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                            >
                                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div className="h-full bg-black/95 px-4 pt-20 backdrop-blur-sm">
                            <div className="space-y-4">
                                {/* Mobile Navigation Items */}
                                <div className="space-y-2">
                                    {navItems.map(item => (
                                        <button
                                            key={item.label}
                                            onClick={() => scrollToSection(item.href)}
                                            className={`block w-full rounded-lg px-4 py-3 text-left text-lg font-medium transition-colors ${
                                                activeSection === item.id
                                                    ? 'bg-purple-400/20 text-purple-400'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}

                                    {/* Mobile Collection Button */}
                                    <button
                                        onClick={navigateToLuminalsCollection}
                                        className="block w-full rounded-lg px-4 py-3 text-left text-lg font-medium text-white transition-colors hover:bg-white/10"
                                    >
                                        Luminals Collection
                                    </button>

                                    {/* Mobile TCG Button */}
                                    <button
                                        onClick={navigateToTCG}
                                        className="block w-full rounded-lg px-4 py-3 text-left text-lg font-medium text-white transition-colors hover:bg-white/10"
                                    >
                                        MYTHICAL TCG
                                    </button>
                                </div>

                                {/* Mobile Action Buttons */}
                                <div className="border-t border-white/20 pt-6">
                                    <ActionButtons variant="section" className="flex-col" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;

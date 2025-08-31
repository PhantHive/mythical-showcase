'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ActionButtons from './ActionButtons';

interface NavigationProps {
    currentPath?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPath = '/' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
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
        { label: 'Features', href: 'features', id: 'features' }
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

    return (
        <>
            <nav className={`
                fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isScrolled
                ? 'bg-black/80 backdrop-blur-lg py-1 border-b border-white/10 shadow-xl'
                : 'bg-transparent py-3'
            }
            `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex items-center justify-between ${isMobile ? 'h-16' : 'h-20'}`}>

                        {/* Logo */}
                        <motion.div
                            className="flex items-center cursor-pointer"
                            onClick={() => scrollToSection('home')}
                            whileHover={isMobile ? {} : { scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-horizon`}>
                                MYTHICAL
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.href)}
                                    className={`
                                        px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 relative
                                        ${activeSection === item.id
                                        ? 'text-purple-400 font-bold'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }
                                    `}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden lg:flex">
                            <ActionButtons variant="compact" showTopGG={false} />
                        </div>

                        {/* Mobile Menu Button - Enhanced for touch */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-3 rounded-lg text-white hover:bg-white/10 transition-colors mobile-touch-target`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isOpen ? <FaTimes size={isMobile ? 20 : 24} /> : <FaBars size={isMobile ? 20 : 24} />}
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
                        className="fixed inset-0 z-40 lg:hidden mobile-simple"
                    >
                        <div className={`bg-black/95 backdrop-blur-xl h-full ${isMobile ? 'pt-20 px-2' : 'pt-24 px-4'}`}>
                            <div className="space-y-6">

                                {/* Mobile Navigation Items */}
                                <div className="space-y-3">
                                    {navItems.map((item, index) => (
                                        <motion.button
                                            key={item.label}
                                            onClick={() => scrollToSection(item.href)}
                                            className={`
                                                block w-full text-left ${isMobile ? 'px-4 py-3' : 'px-6 py-4'} rounded-xl font-medium ${isMobile ? 'text-lg' : 'text-xl'} transition-all mobile-touch-target
                                                ${activeSection === item.id
                                                ? 'text-purple-400 bg-purple-400/20 font-bold'
                                                : 'text-white hover:bg-white/10'
                                            }
                                            `}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * (isMobile ? 0.05 : 0.1) }}
                                        >
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Mobile Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: isMobile ? 0.2 : 0.3 }}
                                    className="pt-8 border-t border-white/20"
                                >
                                    <ActionButtons variant="section" className="flex-col" />
                                </motion.div>

                                {/* Additional Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: isMobile ? 0.25 : 0.4 }}
                                    className="pt-8 space-y-3 text-center"
                                >
                                    <a
                                        href="#/privacy"
                                        className={`block text-white/60 hover:text-white transition-colors ${isMobile ? 'text-base' : 'text-lg'} mobile-touch-target`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Privacy Policy
                                    </a>
                                    <a
                                        href="#/terms"
                                        className={`block text-white/60 hover:text-white transition-colors ${isMobile ? 'text-base' : 'text-lg'} mobile-touch-target`}
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

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDiscord, FaGamepad, FaCrown, FaGem } from 'react-icons/fa';
import ActionButtons from './ActionButtons';

const HeroSection = () => {
    const [, setCurrentFeature] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showingCardinals, setShowingCardinals] = useState(false); // Start with Luminals
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    const features = [
        {
            iconComponent: FaDiscord,
            title: 'One Command',
            description: 'Everything accessible through /mythical',
        },
        {
            iconComponent: FaGamepad,
            title: '300+ Servers',
            description: 'Join the magical Discord community',
        },
        {
            iconComponent: FaCrown,
            title: 'Beautiful Cardinals',
            description: 'Unlock stunning warrior allies',
        },
    ];

    const luminalSkins = [
        {
            name: 'Natsu',
            image: '/Luminals/mystic/Natsu.png',
            role: 'Mystic Fire',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            name: 'Prismetia',
            image: '/Luminals/enchanted/Prismetia.png',
            role: 'Enchanted Neko',
            color: 'from-purple-400 to-violet-500',
        },
        {
            name: 'Yume',
            image: '/Luminals/mystic/Yume.png',
            role: 'Mystic Light & Neko',
            color: 'from-blue-400 to-cyan-500',
        },
    ];

    const cardinalSkins = [
        {
            name: 'Erza',
            image: '/assets/Cardinals/Skins/Erza_Z/Summer_Party_Erza.png',
            role: 'Defense Tank',
            color: 'from-red-400 to-pink-500',
        },
        {
            name: 'Esen',
            image: '/assets/Cardinals/Skins/Esen_W/Elsena_W.png',
            role: 'Healer Support',
            color: 'from-blue-400 to-cyan-500',
        },
        {
            name: 'Ena',
            image: '/assets/Cardinals/Skins/Ena_X/Dea_X_Ena.png',
            role: 'DPS Striker',
            color: 'from-purple-400 to-violet-500',
        },
    ];

    const currentSkins = showingCardinals ? cardinalSkins : luminalSkins;

    useEffect(() => {
        setMounted(true);

        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const interval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % features.length);
        }, 4000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Disable mouse tracking on mobile
        if (isMobile) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
    };

    const getCardinalTransform = (index: number) => {
        // Simplified transforms for mobile
        if (isMobile) {
            return {
                transform: 'none',
                transition: 'transform 0.3s ease',
            };
        }

        const centerX = 0.5;
        const centerY = 0.5;
        const maxTilt = 20;
        const maxMove = 30;

        // Calculate normalized position relative to center (-1 to 1)
        const normalizedX = (mousePosition.x - centerX) * 2;
        const normalizedY = (mousePosition.y - centerY) * 2;

        // Different perspective for each cardinal based on their position
        let rotateX = 0;
        let rotateY = 0;
        let translateX = 0;
        let translateY = 0;
        let translateZ = 0;

        if (index === 0) {
            // Left cardinal
            rotateY = normalizedX * maxTilt * 0.8; // Follow cursor horizontally
            rotateX = -normalizedY * maxTilt * 0.6; // Tilt based on vertical position
            translateY = normalizedX > 0 ? normalizedX * maxMove : normalizedX * maxMove * 0.5; // Down when cursor right
            translateX = normalizedX * 15; // Slight horizontal movement
            translateZ = Math.abs(normalizedX) * 25;
        } else if (index === 1) {
            // Center cardinal (most prominent)
            rotateX = -normalizedY * maxTilt * 0.8; // Strong vertical tilt
            rotateY = normalizedX * maxTilt * 0.4; // Slight horizontal tilt
            translateY = -Math.abs(normalizedY) * 10; // Move up slightly when mouse moves
            translateZ = Math.abs(normalizedY) * 35; // Come forward
        } else {
            // Right cardinal
            rotateY = normalizedX * maxTilt * 0.8; // Follow cursor horizontally
            rotateX = -normalizedY * maxTilt * 0.6; // Tilt based on vertical position
            translateY = normalizedX > 0 ? -normalizedX * maxMove * 0.5 : -normalizedX * maxMove; // Up when cursor right
            translateX = normalizedX * 15; // Slight horizontal movement
            translateZ = Math.abs(normalizedX) * 25;
        }

        return {
            transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        };
    };

    if (!mounted) return null;

    return (
        <section
            id="home"
            className={`relative flex min-h-screen items-center justify-center overflow-hidden ${isMobile ? 'mobile-simple' : ''}`}
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/assets/background-1.png)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60" />
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
                <div
                    className={`${isMobile ? 'flex flex-col' : 'grid min-h-screen items-center gap-20 lg:grid-cols-2'}`}
                >
                    {/* Left Side - Discord Bot Information */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <motion.h1
                            className={`${isMobile ? 'text-5xl' : 'text-7xl lg:text-8xl'} font-horizon font-bold leading-tight`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                                MYTHICAL
                            </span>
                            <br />
                            <span
                                className={`text-white ${isMobile ? 'text-xl' : 'text-3xl lg:text-4xl'} mt-2 block font-medium`}
                            >
                                Discord Bot
                            </span>
                        </motion.h1>

                        <motion.p
                            className={`${isMobile ? 'text-lg' : 'text-xl'} leading-relaxed text-white/90`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Experience the ultimate Discord gaming bot featuring beautiful
                            Cardinals, magical creatures, and epic adventures. All accessible with
                            one simple command.
                        </motion.p>

                        {/* Key Features - Simplified on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            {features.map((feature, index) => {
                                const IconComponent = feature.iconComponent;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className={`group flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm transition-all hover:border-white/20 ${isMobile ? 'mobile-touch-target' : ''}`}
                                    >
                                        <div
                                            className={`text-yellow-400 ${isMobile ? '' : 'group-hover:scale-110'} transition-transform`}
                                        >
                                            <IconComponent className="text-3xl" />
                                        </div>
                                        <div>
                                            <h3
                                                className={`${isMobile ? 'text-base' : 'text-lg'} font-horizon font-bold text-white`}
                                            >
                                                {feature.title}
                                            </h3>
                                            <p
                                                className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Toggle Button - Mobile optimized */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="pt-6"
                        >
                            <motion.div
                                onClick={() => setShowingCardinals(!showingCardinals)}
                                className={`group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-white/30 bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/50 ${isMobile ? 'mobile-touch-target' : ''}`}
                                whileHover={isMobile ? {} : { scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                animate={
                                    isMobile
                                        ? {}
                                        : {
                                              boxShadow: [
                                                  '0 0 20px rgba(147, 51, 234, 0.2)',
                                                  '0 0 25px rgba(147, 51, 234, 0.4)',
                                                  '0 0 20px rgba(147, 51, 234, 0.2)',
                                              ],
                                          }
                                }
                                transition={
                                    isMobile
                                        ? { duration: 0.3 }
                                        : {
                                              duration: 2,
                                              repeat: Infinity,
                                              ease: 'easeInOut',
                                          }
                                }
                            >
                                <div
                                    className={`text-yellow-400 ${isMobile ? '' : 'group-hover:scale-110'} transition-transform`}
                                >
                                    {showingCardinals ? (
                                        <FaGem className="text-3xl" />
                                    ) : (
                                        <FaCrown className="text-3xl" />
                                    )}
                                </div>
                                <div>
                                    <h3
                                        className={`${isMobile ? 'text-base' : 'text-lg'} font-horizon font-bold text-white`}
                                    >
                                        {showingCardinals
                                            ? 'Switch to Luminals'
                                            : 'Switch to Cardinals'}
                                    </h3>
                                    <p
                                        className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}
                                    >
                                        {showingCardinals
                                            ? 'View magical creatures instead'
                                            : 'View warrior allies instead'}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Creatures Title - Mobile positioned below toggle button */}
                            {isMobile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 }}
                                    className="mt-4 text-center"
                                >
                                    <h2 className="font-horizon mb-1 text-lg font-bold text-white">
                                        Meet Your
                                        <span
                                            className={`bg-gradient-to-r ${showingCardinals ? 'from-purple-400 to-violet-500' : 'from-yellow-400 to-orange-500'} bg-clip-text text-transparent`}
                                        >
                                            {showingCardinals ? ' Cardinals' : ' Luminals'}
                                        </span>
                                    </h2>
                                    <p className="text-xs text-white/80">
                                        {showingCardinals
                                            ? 'Your powerful warrior allies'
                                            : 'Tap to explore these magical creatures'}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Mobile Cardinals/Luminals Section - Positioned after the text */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="mt-4"
                            >
                                {/* Mobile Cardinals Container */}
                                <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
                                    {/* Simplified Background Glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-purple-500/10" />

                                    {/* Cardinals Grid */}
                                    <div className="relative grid h-full w-full grid-cols-3 gap-2 p-4">
                                        {currentSkins.map(cardinal => (
                                            <div
                                                key={cardinal.name}
                                                className="group relative cursor-pointer"
                                            >
                                                {/* Cardinal Image */}
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={cardinal.image}
                                                        alt={cardinal.name}
                                                        fill
                                                        className="scale-110 object-contain drop-shadow-xl transition-all duration-300 group-hover:scale-125"
                                                    />

                                                    {/* Info Card */}
                                                    <div className="absolute bottom-0 left-1/2 z-30 min-w-max -translate-x-1/2 transform rounded-md border border-white/20 bg-black/90 px-2 py-1 opacity-100 backdrop-blur-sm">
                                                        <h4 className="font-horizon text-center text-xs font-bold text-white">
                                                            {cardinal.name}
                                                        </h4>
                                                        <p className="text-center text-xs font-medium text-yellow-400">
                                                            {cardinal.role}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="pt-4"
                        >
                            <ActionButtons variant="hero" />
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Desktop Only Cardinals */}
                    {!isMobile && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative h-[700px]"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
                        >
                            {/* Background Glow */}
                            <div className="via-pink-500/8 absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/10 to-yellow-500/10 opacity-50 blur-2xl" />

                            {/* Cardinals Container - Desktop Layout */}
                            <div className="perspective-[1200px] relative h-full w-full">
                                {currentSkins.map((cardinal, index) => (
                                    <div
                                        key={cardinal.name}
                                        className="group absolute cursor-pointer"
                                        style={{
                                            left: index === 0 ? '5%' : index === 1 ? '35%' : '65%',
                                            top: index === 1 ? '5%' : '15%',
                                            width: '35%',
                                            height: '85%',
                                            zIndex: index === 1 ? 1 : 5, // Middle cardinal (index 1) behind side ones
                                            ...getCardinalTransform(index),
                                        }}
                                    >
                                        {/* Cardinal Image */}
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={cardinal.image}
                                                alt={cardinal.name}
                                                fill
                                                className="group-hover:scale-175 scale-150 object-contain drop-shadow-2xl transition-all duration-500"
                                                priority
                                            />

                                            {/* Info Card */}
                                            <div className="absolute bottom-2 left-1/2 z-30 min-w-max -translate-x-1/2 transform rounded-lg border border-white/30 bg-black/95 px-3 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                                <h4 className="font-horizon text-center text-xs font-bold text-white">
                                                    {cardinal.name}
                                                </h4>
                                                <p className="text-center text-xs font-medium text-yellow-400">
                                                    {cardinal.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4 }}
                                className="absolute -bottom-20 left-1/2 -translate-x-1/2 transform text-center"
                            >
                                <h2 className="font-horizon mb-2 text-2xl font-bold text-white lg:text-3xl">
                                    Meet Your
                                    <span
                                        className={`bg-gradient-to-r ${showingCardinals ? 'from-purple-400 to-violet-500' : 'from-yellow-400 to-orange-500'} bg-clip-text text-transparent`}
                                    >
                                        {showingCardinals ? ' Cardinals' : ' Luminals'}
                                    </span>
                                </h2>
                                <p className="text-sm text-white/80">
                                    {showingCardinals
                                        ? 'Your powerful warrior allies'
                                        : 'Hover to explore these magical creatures'}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

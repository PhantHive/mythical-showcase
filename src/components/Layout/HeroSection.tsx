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

    const features = [
        {
            icon: <FaDiscord className="text-3xl" />,
            title: "One Command",
            description: "Everything accessible through /mythical"
        },
        {
            icon: <FaGamepad className="text-3xl" />,
            title: "300+ Servers",
            description: "Join the magical Discord community"
        },
        {
            icon: <FaCrown className="text-3xl" />,
            title: "Beautiful Cardinals",
            description: "Unlock stunning warrior allies"
        }
    ];

    const luminalSkins = [
        {
            name: "Natsu",
            image: "/Luminals/mystic/Natsu.png",
            role: "Mystic Fire",
            color: "from-yellow-400 to-orange-500"
        },
        {
            name: "Prismetia",
            image: "/Luminals/enchanted/Prismetia.png",
            role: "Enchanted Neko",
            color: "from-purple-400 to-violet-500"
        },
        {
            name: "Yume",
            image: "/Luminals/mystic/Yume.png",
            role: "Mystic Light & Neko",
            color: "from-blue-400 to-cyan-500"
        }
    ];

    const cardinalSkins = [
        {
            name: "Erza",
            image: "/assets/Cardinals/Skins/Erza_Z/Summer_Party_Erza.png",
            role: "Defense Tank",
            color: "from-red-400 to-pink-500"
        },
        {
            name: "Esen",
            image: "/assets/Cardinals/Skins/Esen_W/Elsena_W.png",
            role: "Healer Support",
            color: "from-blue-400 to-cyan-500"
        },
        {
            name: "Ena",
            image: "/assets/Cardinals/Skins/Ena_X/Dea_X_Ena.png",
            role: "DPS Striker",
            color: "from-purple-400 to-violet-500"
        }
    ];

    const currentSkins = showingCardinals ? cardinalSkins : luminalSkins;

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
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
                transition: 'transform 0.3s ease'
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

        if (index === 0) { // Left cardinal
            rotateY = normalizedX * maxTilt * 0.8; // Follow cursor horizontally
            rotateX = -normalizedY * maxTilt * 0.6; // Tilt based on vertical position
            translateY = normalizedX > 0 ? normalizedX * maxMove : normalizedX * maxMove * 0.5; // Down when cursor right
            translateX = normalizedX * 15; // Slight horizontal movement
            translateZ = Math.abs(normalizedX) * 25;
        } else if (index === 1) { // Center cardinal (most prominent)
            rotateX = -normalizedY * maxTilt * 0.8; // Strong vertical tilt
            rotateY = normalizedX * maxTilt * 0.4; // Slight horizontal tilt
            translateY = -Math.abs(normalizedY) * 10; // Move up slightly when mouse moves
            translateZ = Math.abs(normalizedY) * 35; // Come forward
        } else { // Right cardinal
            rotateY = normalizedX * maxTilt * 0.8; // Follow cursor horizontally
            rotateX = -normalizedY * maxTilt * 0.6; // Tilt based on vertical position
            translateY = normalizedX > 0 ? -normalizedX * maxMove * 0.5 : -normalizedX * maxMove; // Up when cursor right
            translateX = normalizedX * 15; // Slight horizontal movement
            translateZ = Math.abs(normalizedX) * 25;
        }

        return {
            transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        };
    };

    return (
        <section
            id="home"
            className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isMobile ? 'mobile-simple' : ''}`}
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/assets/background-1.png)' }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/60" />
            </div>

            {/* Main Content - Responsive Layout */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
                <div className={`${isMobile ? 'flex flex-col' : 'grid lg:grid-cols-2 gap-20 items-center min-h-screen'}`}>

                    {/* Left Side - Discord Bot Information */}
                    <motion.div
                        initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <motion.h1
                            className={`${isMobile ? 'text-5xl' : 'text-7xl lg:text-8xl'} font-bold leading-tight font-horizon`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                                MYTHICAL
                            </span>
                            <br />
                            <span className={`text-white ${isMobile ? 'text-xl' : 'text-3xl lg:text-4xl'} font-medium block mt-2`}>
                                Discord Bot
                            </span>
                        </motion.h1>

                        <motion.p
                            className={`${isMobile ? 'text-lg' : 'text-xl'} text-white/90 leading-relaxed`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Experience the ultimate Discord gaming bot featuring beautiful Cardinals, magical creatures, and epic adventures. All accessible with one simple command.
                        </motion.p>

                        {/* Key Features - Simplified on mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: isMobile ? 0 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className={`flex items-center gap-4 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all group ${isMobile ? 'mobile-touch-target' : ''}`}
                                >
                                    <div className={`text-yellow-400 ${isMobile ? '' : 'group-hover:scale-110'} transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-white font-horizon`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
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
                                className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 transition-all duration-300 group cursor-pointer ${isMobile ? 'mobile-touch-target' : ''}`}
                                whileHover={isMobile ? {} : { scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                animate={isMobile ? {} : {
                                    boxShadow: [
                                        "0 0 20px rgba(147, 51, 234, 0.2)",
                                        "0 0 25px rgba(147, 51, 234, 0.4)",
                                        "0 0 20px rgba(147, 51, 234, 0.2)"
                                    ]
                                }}
                                transition={isMobile ? { duration: 0.3 } : {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className={`text-yellow-400 ${isMobile ? '' : 'group-hover:scale-110'} transition-transform`}>
                                    {showingCardinals ? (
                                        <FaGem className="text-3xl" />
                                    ) : (
                                        <FaCrown className="text-3xl" />
                                    )}
                                </div>
                                <div>
                                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-white font-horizon`}>
                                        {showingCardinals ? 'Switch to Luminals' : 'Switch to Cardinals'}
                                    </h3>
                                    <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                                        {showingCardinals ? 'View magical creatures instead' : 'View warrior allies instead'}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Creatures Title - Mobile positioned below toggle button */}
                            {isMobile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.0 }}
                                    className="text-center mt-4"
                                >
                                    <h2 className="text-lg font-bold text-white font-horizon mb-1">
                                        Meet Your
                                        <span className={`bg-gradient-to-r ${showingCardinals ? 'from-purple-400 to-violet-500' : 'from-yellow-400 to-orange-500'} bg-clip-text text-transparent`}>
                                            {showingCardinals ? ' Cardinals' : ' Luminals'}
                                        </span>
                                    </h2>
                                    <p className="text-white/80 text-xs">
                                        {showingCardinals ? 'Your powerful warrior allies' : 'Tap to explore these magical creatures'}
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
                                <div className="relative h-[300px] bg-black/20 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden">
                                    {/* Simplified Background Glow */}
                                    <div className="absolute inset-0 bg-purple-500/10 rounded-2xl" />

                                    {/* Cardinals Grid */}
                                    <div className="relative w-full h-full grid grid-cols-3 gap-2 p-4">
                                        {currentSkins.map((cardinal) => (
                                            <div
                                                key={cardinal.name}
                                                className="relative group cursor-pointer"
                                            >
                                                {/* Cardinal Image */}
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={cardinal.image}
                                                        alt={cardinal.name}
                                                        fill
                                                        className="object-contain scale-110 group-hover:scale-125 transition-all duration-300 drop-shadow-xl"
                                                    />

                                                    {/* Info Card */}
                                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/20 rounded-md backdrop-blur-sm z-30 min-w-max opacity-100">
                                                        <h4 className="text-xs font-bold text-white font-horizon text-center">
                                                            {cardinal.name}
                                                        </h4>
                                                        <p className="text-yellow-400 font-medium text-xs text-center">
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
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/8 to-yellow-500/10 rounded-full blur-2xl opacity-50" />

                            {/* Cardinals Container - Desktop Layout */}
                            <div className="relative w-full h-full perspective-[1200px]">
                                {currentSkins.map((cardinal, index) => (
                                    <div
                                        key={cardinal.name}
                                        className="absolute group cursor-pointer"
                                        style={{
                                            left: index === 0 ? '5%' : index === 1 ? '35%' : '65%',
                                            top: index === 1 ? '5%' : '15%',
                                            width: '35%',
                                            height: '85%',
                                            zIndex: index === 1 ? 5 : 10, // Middle cardinal behind side ones
                                            ...getCardinalTransform(index)
                                        }}
                                    >
                                        {/* Cardinal Image */}
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={cardinal.image}
                                                alt={cardinal.name}
                                                fill
                                                className="object-contain scale-150 group-hover:scale-175 transition-all duration-500 drop-shadow-2xl"
                                                priority
                                            />

                                            {/* Info Card */}
                                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/95 border border-white/30 rounded-lg backdrop-blur-sm z-30 min-w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <h4 className="text-xs font-bold text-white font-horizon text-center">
                                                    {cardinal.name}
                                                </h4>
                                                <p className="text-yellow-400 font-medium text-xs text-center">
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
                                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
                            >
                                <h2 className="text-2xl lg:text-3xl font-bold text-white font-horizon mb-2">
                                    Meet Your
                                    <span className={`bg-gradient-to-r ${showingCardinals ? 'from-purple-400 to-violet-500' : 'from-yellow-400 to-orange-500'} bg-clip-text text-transparent`}>
                                        {showingCardinals ? ' Cardinals' : ' Luminals'}
                                    </span>
                                </h2>
                                <p className="text-white/80 text-sm">
                                    {showingCardinals ? 'Your powerful warrior allies' : 'Hover to explore these magical creatures'}
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

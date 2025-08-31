'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FaHome,
    FaSearch,
    FaUsers,
    FaClipboardList,
    FaTree,
    FaFistRaised,
    FaGlobe,
    FaTrophy,
    FaChevronLeft,
    FaChevronRight,
    FaLanguage
} from 'react-icons/fa';
import carouselData from '../../data/carousel-features.json';

const iconMap = {
    FaHome: FaHome,
    FaSearch: FaSearch,
    FaUsers: FaUsers,
    FaClipboardList: FaClipboardList,
    FaTree: FaTree,
    FaFistRaised: FaFistRaised,
    FaGlobe: FaGlobe,
    FaTrophy: FaTrophy,
};

const FeatureCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const features = carouselData.features;

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        if (!autoPlay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % features.length);
        }, 5000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', checkMobile);
        };
    }, [autoPlay, features.length]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
        setAutoPlay(false);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
        setAutoPlay(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setAutoPlay(false);
    };

    const currentFeature = features[currentIndex];
    const IconComponent = iconMap[currentFeature.icon as keyof typeof iconMap];

    // Mobile: Simple single image, Desktop: 3D carousel
    const getVisibleFeatures = () => {
        if (isMobile) {
            // Mobile: Just return current feature
            return [{ ...features[currentIndex], position: 'current', index: currentIndex }];
        }

        // Desktop: 3D carousel logic
        const visible = [];
        const totalFeatures = features.length;

        // Previous feature
        const prevIndex = (currentIndex - 1 + totalFeatures) % totalFeatures;
        visible.push({ ...features[prevIndex], position: 'prev', index: prevIndex });

        // Current feature
        visible.push({ ...features[currentIndex], position: 'current', index: currentIndex });

        // Next feature
        const nextIndex = (currentIndex + 1) % totalFeatures;
        visible.push({ ...features[nextIndex], position: 'next', index: nextIndex });

        return visible;
    };

    const visibleFeatures = getVisibleFeatures();

    return (
        <section id="features" className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isMobile ? 'mobile-simple' : ''}`}>
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/assets/background-4.png)' }}
            >
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full px-6 py-32">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`flex items-center ${isMobile ? 'justify-center' : 'justify-center'} ${isMobile ? 'gap-2' : 'gap-4'} mb-8`}
                    >
                        <div className={`${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent`}>
                            <FaTrophy />
                        </div>
                        <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-7xl'} font-bold text-white font-horizon`}>
                            Game Features
                        </h2>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-horizon`}
                    >
                        Endless Adventures Await
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`${isMobile ? 'text-base' : 'text-lg'} text-white/90 leading-relaxed max-w-3xl mx-auto mb-8`}
                    >
                        Explore housing customization, epic hunts, strategic battles, and achievement tracking - all in one magical Discord experience.
                    </motion.p>

                    {/* Language Support Banner - Mobile optimized */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-6 mb-12"
                    >
                        <div className={`flex items-center gap-6 ${isMobile ? 'px-4 py-4' : 'px-8 py-6'} rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 group shadow-2xl`}>
                            <div className={`${isMobile ? 'text-2xl' : 'text-3xl'} text-yellow-400 group-hover:scale-110 transition-transform`}>
                                <FaLanguage />
                            </div>
                            <div className="text-center">
                                <div className={`text-white font-bold ${isMobile ? 'text-lg' : 'text-xl'} font-horizon mb-3`}>
                                    Multilingual Support
                                </div>
                                <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-6'}`}>
                                    <div className="flex flex-col items-center gap-2 group/flag">
                                        <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full overflow-hidden border-4 border-white/30 shadow-xl group-hover/flag:border-white/50 transition-all duration-300 group-hover/flag:scale-110`}>
                                            {/* Glow effect - disabled on mobile */}
                                            {!isMobile && (
                                                <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/40 to-blue-600/40 rounded-full blur-md opacity-0 group-hover/flag:opacity-100 transition-opacity duration-300" />
                                            )}
                                            <Image
                                                src="/assets/flags/us.png"
                                                alt="English"
                                                width={50}
                                                height={50}
                                                className="object-cover w-full h-full relative z-10"
                                            />
                                        </div>
                                        <span className={`text-white/90 ${isMobile ? 'text-xs' : 'text-sm'} font-medium group-hover/flag:text-white transition-colors`}>English</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 group/flag">
                                        <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full overflow-hidden border-4 border-white/30 shadow-xl group-hover/flag:border-white/50 transition-all duration-300 group-hover/flag:scale-110`}>
                                            {/* Glow effect - disabled on mobile */}
                                            {!isMobile && (
                                                <div className="absolute -inset-2 bg-gradient-to-br from-red-400/40 to-yellow-400/40 rounded-full blur-md opacity-0 group-hover/flag:opacity-100 transition-opacity duration-300" />
                                            )}
                                            <Image
                                                src="/assets/flags/es.png"
                                                alt="Spanish"
                                                width={50}
                                                height={50}
                                                className="object-cover w-full h-full relative z-10"
                                            />
                                        </div>
                                        <span className={`text-white/90 ${isMobile ? 'text-xs' : 'text-sm'} font-medium group-hover/flag:text-white transition-colors`}>Español</span>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 group/flag">
                                        <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} rounded-full overflow-hidden border-4 border-white/30 shadow-xl group-hover/flag:border-white/50 transition-all duration-300 group-hover/flag:scale-110`}>
                                            {/* Glow effect - disabled on mobile */}
                                            {!isMobile && (
                                                <div className="absolute -inset-2 bg-gradient-to-br from-blue-400/40 to-red-400/40 rounded-full blur-md opacity-0 group-hover/flag:opacity-100 transition-opacity duration-300" />
                                            )}
                                            <Image
                                                src="/assets/flags/fr.png"
                                                alt="French"
                                                width={50}
                                                height={50}
                                                className="object-cover w-full h-full relative z-10"
                                            />
                                        </div>
                                        <span className={`text-white/90 ${isMobile ? 'text-xs' : 'text-sm'} font-medium group-hover/flag:text-white transition-colors`}>Français</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Carousel Container - Mobile vs Desktop */}
                <div className="relative w-full max-w-none mx-auto">
                    {/* Images Container */}
                    <div className={`relative ${isMobile ? 'h-[400px]' : 'h-[700px]'} ${isMobile ? 'mb-8' : 'mb-16'}`} style={isMobile ? {} : { perspective: '2000px' }}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            {visibleFeatures.map((feature) => {
                                const { position, index } = feature;

                                return (
                                    <motion.div
                                        key={index}
                                        className={`${isMobile ? 'relative' : 'absolute'} cursor-pointer transition-all duration-800 ease-out ${
                                            position === 'current' ? 'z-30' : 'z-10'
                                        }`}
                                        onClick={() => position !== 'current' && goToSlide(index)}
                                        animate={isMobile ? {
                                            // Mobile: Simple fade/scale
                                            opacity: 1,
                                            scale: 1,
                                        } : {
                                            // Desktop: Complex 3D positioning
                                            x: position === 'prev' ? '-600px' :
                                               position === 'next' ? '600px' : '0px',
                                            scale: position === 'current' ? 1.1 : 0.55,
                                            rotateY: position === 'prev' ? 65 :
                                                    position === 'next' ? -65 : 0,
                                            rotateX: position === 'current' ? 0 : 15,
                                            opacity: position === 'current' ? 1 : 0.3,
                                            z: position === 'current' ? 100 : -200,
                                        }}
                                        transition={{
                                            duration: isMobile ? 0.3 : 0.8,
                                            ease: isMobile ? "easeOut" : [0.175, 0.885, 0.32, 1.1]
                                        }}
                                        style={isMobile ? {} : {
                                            transformStyle: 'preserve-3d',
                                        }}
                                        whileHover={isMobile ? {} : {
                                            scale: position === 'current' ? 1.15 : 0.65,
                                            opacity: position === 'current' ? 1 : 0.6,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className={`relative ${isMobile ? 'w-[300px] h-[300px]' : 'w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] xl:w-[700px] xl:h-[700px]'} rounded-3xl overflow-hidden bg-black/30 border ${
                                            position === 'current'
                                                ? 'border-white/30 shadow-2xl bg-black/20'
                                                : 'border-white/10 hover:border-white/20'
                                        } transition-all duration-500 backdrop-blur-sm`}>

                                            {/* Enhanced Glow for Current Image - disabled on mobile */}
                                            {position === 'current' && !isMobile && (
                                                <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/40 via-pink-500/30 to-yellow-500/40 rounded-3xl blur-2xl opacity-80" />
                                            )}

                                            <Image
                                                src={feature.image}
                                                alt={feature.title}
                                                fill
                                                className={`object-contain ${position === 'current' ? 'p-4' : 'p-6'} transition-all duration-500`}
                                                priority={position === 'current'}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Current Feature Information */}
                    <motion.div
                        key={`info-${currentIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center max-w-6xl mx-auto"
                    >
                        <div className={`flex items-center justify-center ${isMobile ? 'gap-3' : 'gap-6'} ${isMobile ? 'mb-4' : 'mb-8'}`}>
                            <div className={`${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r ${currentFeature.color} bg-clip-text text-transparent`}>
                                <IconComponent />
                            </div>
                            <h3 className={`${isMobile ? 'text-2xl' : 'text-4xl lg:text-6xl'} font-bold text-white font-horizon`}>
                                {currentFeature.title}
                            </h3>
                        </div>

                        <p className={`${isMobile ? 'text-base' : 'text-xl lg:text-2xl'} text-white/90 leading-relaxed ${isMobile ? 'mb-6' : 'mb-10'} max-w-5xl mx-auto`}>
                            {currentFeature.description}
                        </p>

                        {/* Navigation Dots - Mobile optimized and smaller */}
                        <div className="flex items-center justify-center gap-3">
                            {features.map((_, index) => {
                                const isActive = index === currentIndex;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`block ${isMobile ? 'h-1.5' : 'h-1.5'} cursor-pointer rounded-2xl transition-all duration-300 content-[''] ${isMobile ? 'mobile-touch-target' : ''} ${
                                            isActive ? `${isMobile ? 'w-6' : 'w-12'} bg-white shadow-lg` : `${isMobile ? 'w-3' : 'w-6'} bg-white/50 hover:bg-white/70`
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Navigation Arrows - Desktop only */}
                    {!isMobile && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 lg:left-12 top-80 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center group shadow-2xl"
                                aria-label="Previous feature"
                            >
                                <FaChevronLeft className="group-hover:scale-110 transition-transform text-xl lg:text-2xl" />
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-4 lg:right-12 top-80 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white hover:bg-black/90 transition-all duration-300 flex items-center justify-center group shadow-2xl"
                                aria-label="Next feature"
                            >
                                <FaChevronRight className="group-hover:scale-110 transition-transform text-xl lg:text-2xl" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;

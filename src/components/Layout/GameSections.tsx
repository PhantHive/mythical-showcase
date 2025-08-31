'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGem, FaStar, FaCrown } from 'react-icons/fa';
import ActionButtons from './ActionButtons';
import FeatureCarousel from './FeatureCarousel';

interface GameSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    background: string;
    icon: React.ReactNode;
    color: string;
    content: any;
}

const GameSections = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const sections: GameSection[] = [
        {
            id: 'luminals',
            title: 'Collect Luminals',
            subtitle: 'Magical Creatures Await',
            description: 'Discover over 50 unique Luminals across fairy, enchanted, and mystic rarities. Each with their own  element and stories',
            background: '/assets/background-2.png',
            icon: <FaGem className="text-4xl" />,
            color: 'from-blue-400 to-cyan-500',
            content: {
                type: 'luminals',
                items: [
                    { name: 'Solarian', image: '/Luminals/mystic/Solarian.png', rarity: 'Mystic', element: 'Fire, Light' },
                    { name: 'Yume', image: '/Luminals/mystic/Yume.png', rarity: 'Mystic', element: 'Light, Neko' },
                    { name: 'Nalil', image: '/Luminals/mystic/Nalil.png', rarity: 'Mystic', element: 'Flora, Air' },
                    { name: 'Prismetia', image: '/Luminals/enchanted/Prismetia.png', rarity: 'Enchanted', element: 'Neko' },
                    { name: 'Blizou', image: '/Luminals/enchanted/Blizou.png', rarity: 'Enchanted', element: 'Snow' },
                    { name: 'Lumi', image: '/Luminals/fairy/Lumi.png', rarity: 'Fairy', element: 'Flora' },
                    { name: 'Thundy', image: '/Luminals/fairy/Thundy.png', rarity: 'Fairy', element: 'Storm, Flora' },
                    { name: 'Yumiko', image: '/Luminals/fairy/Yumiko.png', rarity: 'Fairy', element: 'Flora' }
                ]
            }
        },
        {
            id: 'cardinals',
            title: 'Mighty Cardinals',
            subtitle: 'Your Ultimate Allies',
            description: 'Unlock powerful Cardinals - Erza, Esen & Ena. These beautiful warriors from another world enhance your battles and provide unique strategic advantages through constellation alignment.',
            background: '/assets/background-3.png',
            icon: <FaCrown className="text-4xl" />,
            color: 'from-purple-400 to-violet-600',
            content: {
                type: 'cardinals',
                items: [
                    { name: 'Erza', image: '/assets/Cardinals/defense-cardinal.png', role: 'Steadfast Guardian', description: 'She will always be by your side.' },
                    { name: 'Esen', image: '/assets/Cardinals/heal-cardinal.png', role: 'Gentle Healer', description: 'She is here to heal the hearts of those who need it.' },
                    { name: 'Ena', image: '/assets/Cardinals/attack-cardinal.png', role: 'Fierce Protector', description: 'She is here to protect others whatever it takes.' }
                ]
            }
        }
    ];

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Mystic': return 'text-yellow-400';
            case 'Legendary': return 'text-yellow-400';
            case 'Enchanted': return 'text-purple-400';
            case 'Epic': return 'text-purple-400';
            case 'Fairy': return 'text-blue-400';
            case 'Rare': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    const getRarityStars = (rarity: string) => {
        const levels = { 'Fairy': 2, 'Rare': 3, 'Enchanted': 4, 'Epic': 4, 'Mystic': 5, 'Legendary': 5 };
        const level = levels[rarity as keyof typeof levels] || 1;
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar key={i} className={`text-sm ${i < level ? 'text-yellow-400' : 'text-gray-600'}`} />
        ));
    };

    const renderContent = (section: GameSection) => {
        const { content } = section;

        switch (content.type) {
            case 'cardinals':
                return (
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-1 md:grid-cols-3 gap-16'}`}>
                        {content.items.map((cardinal: any, index: number) => (
                            <motion.div
                                key={cardinal.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Simplified Glow Effect for Mobile */}
                                <div className={`absolute ${isMobile ? '-inset-4 bg-purple-500/30 blur-xl' : '-inset-12 bg-gradient-to-br from-purple-500/60 via-pink-500/40 to-yellow-500/60 blur-3xl group-hover:blur-2xl'} rounded-full transition-all duration-700 opacity-80 group-hover:opacity-100`} />

                                {/* Character - Mobile optimized sizing with proper positioning */}
                                <div className={`relative ${isMobile ? 'aspect-[4/5] flex flex-col' : 'aspect-[3/5]'} z-10 overflow-visible`}>
                                    {/* Image container - positioned to keep feet above info */}
                                    <div className={`relative ${isMobile ? 'flex-1 mb-16' : 'w-full h-full'}`}>
                                        <Image
                                            src={cardinal.image}
                                            alt={cardinal.name}
                                            fill
                                            className={`object-contain ${isMobile ? 'scale-125 group-hover:scale-140 object-bottom' : 'scale-175 group-hover:scale-200'} transition-transform duration-700 drop-shadow-2xl`}
                                        />
                                    </div>

                                    {/* Content - Mobile positioned below image */}
                                    <div className={`${isMobile ? 'mt-auto' : 'absolute bottom-0 left-0 right-0'} ${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-t from-black/95 via-black/70 to-transparent rounded-b-2xl`}>
                                        <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-white mb-1 font-horizon`}>
                                            {cardinal.name}
                                        </h4>
                                        <p className={`text-yellow-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'} mb-1`}>
                                            {cardinal.role}
                                        </p>
                                        <p className={`text-white/80 ${isMobile ? 'text-xs' : 'text-xs'} leading-relaxed`}>
                                            {cardinal.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'luminals':
                return (
                    <div className={`grid ${isMobile ? 'grid-cols-2 gap-6' : 'grid-cols-2 md:grid-cols-4 gap-12'}`}>
                        {content.items.map((luminal: any, index: number) => (
                            <motion.div
                                key={luminal.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Simplified Glow Effect for Mobile */}
                                <div className={`absolute ${isMobile ? '-inset-3 bg-blue-500/20 blur-lg' : '-inset-6 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl group-hover:blur-xl'} rounded-full transition-all duration-500 opacity-60 group-hover:opacity-90`} />

                                {/* Image Container - Mobile optimized */}
                                <div className="relative aspect-[4/5] overflow-visible">
                                    <Image
                                        src={luminal.image}
                                        alt={luminal.name}
                                        fill
                                        className={`object-contain ${isMobile ? 'scale-110 group-hover:scale-125' : 'scale-125 group-hover:scale-150'} transition-transform duration-500 z-10 drop-shadow-2xl`}
                                    />

                                    {/* Text BELOW the image - Mobile optimized */}
                                    <div className={`absolute ${isMobile ? '-bottom-6' : '-bottom-8'} left-0 right-0 ${isMobile ? 'p-2' : 'p-3'} bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 rounded-xl`}>
                                        <h5 className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-sm'} mb-1 font-horizon text-center`}>{luminal.name}</h5>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            {getRarityStars(luminal.rarity)}
                                        </div>
                                        <p className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium text-center ${getRarityColor(luminal.rarity)}`}>
                                            {luminal.rarity}
                                        </p>
                                        <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-white/80 text-center`}>{luminal.element}</p>
                                    </div>
                                </div>

                                {/* Floating Egg - Mobile optimized */}
                                <motion.div
                                    animate={isMobile ? {
                                        // Simplified animation for mobile
                                        y: [0, -4, 0]
                                    } : {
                                        y: [0, -8, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.3
                                    }}
                                    className={`absolute ${isMobile ? '-top-2 -right-2 w-8 h-8' : '-top-4 -right-4 w-12 h-12'} z-20`}
                                >
                                    <Image
                                        src={`/Eggs/${luminal.rarity.toLowerCase()}-egg.png`}
                                        alt={`${luminal.rarity} Egg`}
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'housing_hunt':
            case 'battles':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {content.items.map((item: any, index: number) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500 opacity-40 group-hover:opacity-70" />

                                <div className="aspect-video rounded-2xl overflow-hidden relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h5 className="text-white font-bold text-2xl mb-2 font-horizon">{item.name}</h5>
                                        <p className="text-yellow-400 font-medium text-lg">
                                            {item.type || item.stage}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'tcg':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {content.items.map((card: any, index: number) => (
                            <motion.div
                                key={card.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-60 group-hover:opacity-90" />

                                {/* Let Images Break Out of Container */}
                                <div className={`${index === 0 ? 'aspect-square' : 'aspect-[3/4]'} relative overflow-visible`}>
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        className="object-contain scale-110 group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl z-10"
                                    />

                                    {/* Minimal Text - Much Smaller */}
                                    <div className="absolute bottom-2 left-2 right-2 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 rounded-xl">
                                        <h5 className="text-white font-bold text-sm mb-1 font-horizon">{card.name}</h5>
                                        <p className={`text-xs font-medium ${getRarityColor(card.rarity)}`}>
                                            {card.rarity}
                                        </p>
                                        <p className="text-xs text-white/80 mt-1">{card.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'achievements':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {content.items.map((achievement: any, index: number) => (
                            <motion.div
                                key={achievement.name}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-6 p-6 rounded-xl bg-black/50 backdrop-blur-sm group hover:bg-black/60 transition-all duration-300"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-500 opacity-0 group-hover:opacity-60" />

                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 flex-shrink-0 relative">
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div>
                                    <h5 className="text-white font-bold text-xl mb-2 font-horizon">{achievement.name}</h5>
                                    <p className="text-white/90 text-lg">{achievement.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-0">
            {sections.map((section) => (
                <section
                    key={section.id}
                    id={section.id}
                    className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isMobile ? 'mobile-simple' : ''}`}
                >
                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${section.background})` }}
                    >
                        <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Content */}
                    <div className={`relative z-10 max-w-7xl mx-auto ${isMobile ? 'px-2 py-16' : 'px-4 py-32'}`}>
                        <div className={`text-center ${isMobile ? 'mb-12' : 'mb-20'}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex items-center justify-center ${isMobile ? 'gap-2' : 'gap-4'} mb-8`}
                            >
                                <div className={`${isMobile ? 'text-3xl' : 'text-5xl'} bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                                    {section.icon}
                                </div>
                                <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-7xl'} font-bold text-white font-horizon`}>
                                    {section.title}
                                </h2>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold mb-6 bg-gradient-to-r ${section.color} bg-clip-text text-transparent font-horizon`}
                            >
                                {section.subtitle}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className={`${isMobile ? 'text-sm px-4' : 'text-lg'} text-white/90 leading-relaxed max-w-3xl mx-auto mb-8`}
                            >
                                {section.description}
                            </motion.p>
                        </div>

                        {/* Dynamic Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            {renderContent(section)}
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Feature Carousel Section */}
            <FeatureCarousel />

            {/* Call to Action Section */}
            <section className={`relative ${isMobile ? 'py-16' : 'py-32'} bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900`}>
                <div className="absolute inset-0 bg-black/40" />
                <div className={`relative z-10 max-w-6xl mx-auto text-center ${isMobile ? 'px-2' : 'px-4'}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={`${isMobile ? 'text-3xl' : 'text-5xl lg:text-7xl'} font-bold text-white ${isMobile ? 'mb-4' : 'mb-8'} font-horizon`}>
                            Ready to Start Your
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Adventure</span>?
                        </h2>
                        <p className={`${isMobile ? 'text-base px-4 mb-8' : 'text-xl mb-12'} text-white/90 max-w-3xl mx-auto`}>
                            Join 300+ Discord servers in the most magical Discord gaming experience.
                            One command, infinite possibilities!
                        </p>
                        <ActionButtons variant="hero" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default GameSections;

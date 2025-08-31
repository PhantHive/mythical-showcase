'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGem, FaStar, FaCrown } from 'react-icons/fa';

interface EggData {
    id: string;
    name: string;
    rarity: string;
    description: string;
    background: string;
    eggImage: string;
    rarityLevel: number;
    color: string;
    features: string[];
    icon: React.ReactNode;
}

const EggSections = () => {
    const eggs: EggData[] = [
        {
            id: 'fairy',
            name: 'Fairy Egg',
            rarity: 'Common',
            description: 'Your starting point in the magical realm. Perfect for beginners to discover their first Luminals.',
            background: '/assets/background-2.png',
            eggImage: '/Eggs/fairy-egg.png',
            rarityLevel: 2,
            color: 'from-blue-400 to-cyan-500',
            features: [
                'Easy to obtain',
                'Great for beginners',
                'Common Luminals',
                'Base stats creatures'
            ],
            icon: <FaGem className="text-3xl" />
        },
        {
            id: 'enchanted',
            name: 'Enchanted Egg',
            rarity: 'Rare',
            description: 'Infused with magical essence, these eggs contain more powerful Luminals with enhanced abilities.',
            background: '/assets/background-3.png',
            eggImage: '/Eggs/enchanted-egg.png',
            rarityLevel: 4,
            color: 'from-purple-400 to-violet-600',
            features: [
                'Enhanced abilities',
                'Better stats',
                'Rare Luminals',
                'Special skills'
            ],
            icon: <FaStar className="text-3xl" />
        },
        {
            id: 'mystic',
            name: 'Mystic Egg',
            rarity: 'Legendary',
            description: 'The ultimate prize! These legendary eggs hold the most powerful and rarest Luminals in existence.',
            background: '/assets/background-4.png',
            eggImage: '/Eggs/mystic-egg.png',
            rarityLevel: 5,
            color: 'from-yellow-400 to-orange-500',
            features: [
                'Legendary Luminals',
                'Maximum stats',
                'Unique abilities',
                'Extremely rare'
            ],
            icon: <FaCrown className="text-3xl" />
        }
    ];

    const getRarityStars = (level: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`text-xl ${i < level ? 'text-yellow-400' : 'text-gray-600'}`}
            />
        ));
    };

    return (
        <div className="space-y-0">
            {eggs.map((egg, index) => (
                <section
                    key={egg.id}
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                >
                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${egg.background})` }}
                    >
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
                        <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                        }`}>

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className={`text-center lg:text-left space-y-6 ${
                                    index % 2 === 1 ? 'lg:order-2' : ''
                                }`}
                            >
                                <div className="flex items-center gap-4 justify-center lg:justify-start">
                                    <div className={`text-transparent bg-gradient-to-r ${egg.color} bg-clip-text`}>
                                        {egg.icon}
                                    </div>
                                    <h2 className="text-4xl lg:text-6xl font-bold text-white">
                                        {egg.name}
                                    </h2>
                                </div>

                                {/* Rarity Display */}
                                <div className="flex flex-col items-center lg:items-start gap-2">
                                    <div className="flex items-center gap-2">
                                        {getRarityStars(egg.rarityLevel)}
                                    </div>
                                    <span className={`text-xl font-bold bg-gradient-to-r ${egg.color} bg-clip-text text-transparent`}>
                                        {egg.rarity}
                                    </span>
                                </div>

                                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                                    {egg.description}
                                </p>

                                {/* Features List */}
                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                                    {egg.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: featureIndex * 0.1 }}
                                            className="flex items-center gap-2 p-3 rounded-lg bg-black/30 backdrop-blur-sm border border-white/20"
                                        >
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${egg.color}`} />
                                            <span className="text-white text-sm font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Unlock Info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20"
                                >
                                    <p className="text-white/80 text-center lg:text-left">
                                        {egg.id === 'fairy' && "Available from the start of your journey"}
                                        {egg.id === 'enchanted' && "Unlocked through gameplay progression"}
                                        {egg.id === 'mystic' && "The ultimate reward for dedicated players"}
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Egg Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className={`flex justify-center ${
                                    index % 2 === 1 ? 'lg:order-1' : ''
                                }`}
                            >
                                <div className="relative group">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${egg.color} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                                    <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                                        <Image
                                            src={egg.eggImage}
                                            alt={egg.name}
                                            fill
                                            className="object-contain group-hover:scale-110 transition-transform duration-500"
                                            priority={index === 0}
                                        />
                                    </div>

                                    {/* Floating Rarity Indicator */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute -top-6 -right-6 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20"
                                    >
                                        <div className={`text-transparent bg-gradient-to-r ${egg.color} bg-clip-text`}>
                                            {egg.icon}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default EggSections;

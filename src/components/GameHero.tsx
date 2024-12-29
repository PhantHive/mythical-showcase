'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaDiscord, FaDonate, FaSnowflake, FaGlobe, FaEnvelope } from 'react-icons/fa';

const GameHero = () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const snowflakeVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    const featureCards = [
        {
            id: 'play',
            title: 'Start Playing',
            image: '/Eggs/mystic-egg.png',
            description: 'Begin your adventure in the magical realm',
            primaryAction: {
                label: 'Add to Discord',
                icon: <Image src="/Eggs/mystic-egg.png" width={24} height={24} alt="Mystic Egg" />,
                href: 'https://discord.com/oauth2/authorize?client_id=1250496056521654393&permissions=517611048032&integration_type=0&scope=bot+applications.commands',
            },
            secondaryAction: {
                label: 'Support Server',
                icon: <FaDiscord />,
                href: 'https://discord.gg/JJw53tsMcq',
            },
        },
        {
            id: 'discover',
            title: 'Discover',
            image: '/Cardinals/attack-cardinal.png',
            description: 'Explore the world of Cardinals and Luminals',
            primaryAction: {
                label: 'View Cardinals',
                href: '#cardinals',
            },
            secondaryAction: {
                label: 'View Eggs',
                href: '#eggs',
            },
        },
        {
            id: 'support',
            title: 'Support Us',
            image: '/Luminals/mystic/Solarian.png',
            description: 'Help us grow and improve Mythical',
            primaryAction: {
                label: 'Donate',
                icon: <FaDonate />,
                href: 'https://paypal.me/phearion?country.x=FR&locale.x=fr_FR',
            },
            secondaryAction: {
                label: 'Feedback',
                icon: <FaEnvelope />,
                href: 'mailto:hestia@phearion.fr',
            },
        },
    ];

    return (
        <div className="relative min-h-[80vh]" id="home">
            {/* Winter Event Banner */}
            <motion.div
                className="absolute right-4 top-4 z-20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <a href="#/winter" className="relative block">
                    <div className="group overflow-hidden rounded-lg border border-[#8B9FDE]/20 bg-gradient-to-r from-[#1a1b4b] to-[#0B1729] p-4 shadow-lg">
                        <div className="relative z-10 flex items-center gap-3">
                            <motion.div variants={snowflakeVariants} animate="animate">
                                <FaSnowflake className="text-2xl text-[#FFD700]" />
                            </motion.div>
                            <div>
                                <h3 className="text-lg font-bold text-[#FFD700]">Winter Event</h3>
                                <p className="text-sm text-[#8B9FDE]">Ongoing Special Event</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FFD700]/5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                </a>
            </motion.div>

            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, #000 70%)',
                    }}
                />
            </div>

            <div className="relative px-4 pb-12 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
                        Mythical
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-purple-200 md:text-2xl">
                        Embark on an epic journey through a realm of magic and mystery
                    </p>
                </motion.div>

                <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                    {featureCards.map(card => (
                        <motion.div
                            key={card.id}
                            className="relative h-96"
                            onHoverStart={() => setHoveredCard(card.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div
                                className="absolute inset-0 overflow-hidden rounded-2xl"
                                initial={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
                                animate={{
                                    backgroundColor:
                                        hoveredCard === card.id
                                            ? 'rgba(88, 28, 135, 0.8)'
                                            : 'rgba(15, 23, 42, 0.8)',
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                <div className="relative flex h-full flex-col p-6">
                                    <div className="relative mb-4 h-40 w-full flex-shrink-0">
                                        <motion.div
                                            className="absolute inset-0"
                                            animate={{
                                                scale: hoveredCard === card.id ? 1.05 : 1,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className="object-contain transition-transform duration-300"
                                                priority
                                            />
                                        </motion.div>
                                    </div>

                                    <div className="mb-4 flex-1">
                                        <h3 className="mb-2 text-xl font-bold text-white">
                                            {card.title}
                                        </h3>
                                        <p className="text-sm text-purple-200">
                                            {card.description}
                                        </p>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {hoveredCard === card.id && (
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.button
                                                    onClick={() =>
                                                        (window.location.href =
                                                            card.primaryAction.href)
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-all hover:bg-purple-700"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {card.primaryAction.icon && (
                                                        <span className="text-xl">
                                                            {card.primaryAction.icon}
                                                        </span>
                                                    )}
                                                    {card.primaryAction.label}
                                                </motion.button>
                                                <motion.button
                                                    onClick={() =>
                                                        (window.location.href =
                                                            card.secondaryAction.href)
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-white transition-all hover:bg-gray-700"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {card.secondaryAction.icon && (
                                                        <span className="text-xl">
                                                            {card.secondaryAction.icon}
                                                        </span>
                                                    )}
                                                    {card.secondaryAction.label}
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Phearion Website Link */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                >
                    <a
                        href="https://phearion.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1b4b] to-[#0B1729] px-8 py-4 text-white shadow-lg transition-all hover:scale-105"
                    >
                        <FaGlobe className="text-xl text-[#FFD700]" />
                        <span className="text-lg font-semibold">Visit Phearion.fr</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{
                                x: ['-200%', '200%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default GameHero;

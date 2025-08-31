'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import Image from 'next/image';

const privacyContent = `
  <h2>1. Data Collection</h2>
  <p>At Phearion Games, we only store your Discord User ID in our database. This is used solely to link your in-game profile and track your progress within Mythical. No other personal information, such as email addresses, phone numbers, or real names, is collected or stored.</p>

  <p>All other IDs and data stored are purely related to in-game virtual content, such as creatures, inventory, and achievements. These do not directly link to your personal identity outside of the game.</p>

  <h2>2. Bot Permissions and Access</h2>
  <p>The bot has permissions to view channels, send messages, embed links, and manage interactions like reactions and stickers. However, it does not access private messages, read full message history (only per server/channel), or gather personal data beyond the Discord User ID required for gameplay.</p>

  <h2>3. Data Protection and Compliance</h2>
  <p>We comply with the General Data Protection Regulation (GDPR) for users in the European Economic Area (EEA) and other relevant jurisdictions. This means that you have the right to access, modify, or request the deletion of your User ID data at any time.</p>

  <p>For users within the United States, we adhere to relevant U.S. privacy laws. The User ID collected is used solely to enhance your gaming experience, and we do not share or sell your data to third parties for commercial purposes.</p>

  <h2>4. Data Retention</h2>
  <p>Your Discord User ID is stored as long as your account remains active. If you delete your account or request data deletion, all stored data will be permanently removed from our servers, including in-game progress and virtual assets.</p>

  <h2>5. Contact and Data Requests</h2>
  <p>If you have any concerns or requests regarding your data, you can contact us through our Discord Support Server. We aim to respond to inquiries or data deletion requests within 30 days, in accordance with GDPR and U.S. privacy law requirements.</p>
`;

const cardinalSkins = [
    { src: '/assets/Cardinals/Chibi/chibi-attack.png', alt: 'Chibi Attack Cardinal' },
    { src: '/assets/Cardinals/Chibi/chibi-defense.png', alt: 'Chibi Defense Cardinal' },
    { src: '/assets/Cardinals/Chibi/chibi-heal.png', alt: 'Chibi Heal Cardinal' },
    { src: '/assets/Cardinals/Chibi/Skins/Chibi_Dea_X_Ena.png', alt: 'Chibi Dea X Ena' },
    { src: '/assets/Cardinals/Chibi/Skins/Chibi_Elsena_W.png', alt: 'Chibi Elsena W' },
    { src: '/assets/Cardinals/Skins/Ena_X/Dea_X_Ena.png', alt: 'Dea X Ena Cardinal' },
    { src: '/assets/Cardinals/Skins/Erza_Z/Summer_Party_Erza.png', alt: 'Summer Party Erza' },
    { src: '/assets/Cardinals/Skins/Esen_W/Elsena_W.png', alt: 'Elsena W Cardinal' },
];

export default function PrivacyPolicy() {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        // Create twinkling stars
        const numberOfStars = 50;
        const newStars = Array.from({ length: numberOfStars }, (_, i) => {
            const style: React.CSSProperties = {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                opacity: Math.random() * 0.7 + 0.3,
            };

            return <span key={i} style={style}></span>;
        });

        setStars(newStars);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

            {/* Stars */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {stars}
            </div>

            {/* MASSIVE Cardinal Skins positioned right at container borders */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
                {cardinalSkins.map((cardinal, index) => {
                    const yTransform = useTransform(
                        scrollYProgress,
                        [index * 0.18, (index + 1) * 0.18],
                        [200, -200]
                    );
                    const opacity = useTransform(
                        scrollYProgress,
                        [index * 0.15, index * 0.18 + 0.1, (index + 1) * 0.18],
                        [0, 0.9, 0]
                    );
                    const scale = useTransform(
                        scrollYProgress,
                        [index * 0.15, index * 0.18 + 0.05, (index + 1) * 0.18],
                        [0.9, 1.4, 0.9]
                    );

                    return (
                        <motion.div
                            key={index}
                            className={`fixed ${index % 2 === 0
                                ? 'right-2 lg:right-12 xl:right-16'
                                : 'left-2 lg:left-12 xl:left-16'
                            }`}
                            style={{
                                y: yTransform,
                                opacity,
                                scale,
                                top: `${10 + (index * 15)}%`,
                                zIndex: 5,
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    y: [0, -15, 0]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    delay: index * 1.5
                                }}
                                className="relative"
                            >
                                <Image
                                    src={cardinal.src}
                                    alt={cardinal.alt}
                                    width={400}
                                    height={400}
                                    className="object-contain filter drop-shadow-2xl"
                                />
                                {/* Enhanced magical glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur-3xl -z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-purple-400/30 rounded-full blur-2xl -z-10 animate-pulse" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.a
                        href="#/"
                        className="group mb-8 inline-flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                        Return to Home
                    </motion.a>

                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-4 mb-6">
                            <FaShieldAlt className="text-5xl text-purple-400" />
                            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-horizon">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-2xl text-white font-medium">
                            Your privacy matters to us
                        </p>
                    </motion.div>

                    {/* Content Container - Extra wide to accommodate huge Cardinals */}
                    <motion.div
                        className="bg-black/70 backdrop-blur-xl border border-white/30 rounded-3xl p-16 shadow-2xl mx-16 lg:mx-32"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div
                            className="prose prose-invert prose-purple max-w-none legal-content"
                            dangerouslySetInnerHTML={{ __html: privacyContent }}
                        />

                        {/* Discord Links */}
                        <div className="mt-20 pt-12 border-t border-white/40">
                            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Additional Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <a
                                    href="https://discord.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-300 hover:text-purple-200 hover:bg-purple-600/30 transition-all text-lg"
                                >
                                    Discord Terms of Service ↗
                                </a>
                                <a
                                    href="https://discord.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-6 bg-purple-600/20 border border-purple-400/30 rounded-xl text-purple-300 hover:text-purple-200 hover:bg-purple-600/30 transition-all text-lg"
                                >
                                    Discord Privacy Policy ↗
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

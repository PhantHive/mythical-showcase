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
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

            {/* Stars */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">{stars}</div>

            {/* MASSIVE Cardinal Skins positioned right at container borders */}
            <div className="z-5 pointer-events-none absolute inset-0 overflow-hidden">
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
                            className={`fixed ${
                                index % 2 === 0
                                    ? 'right-2 lg:right-12 xl:right-16'
                                    : 'left-2 lg:left-12 xl:left-16'
                            }`}
                            style={{
                                y: yTransform,
                                opacity,
                                scale,
                                top: `${10 + index * 15}%`,
                                zIndex: 5,
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    delay: index * 1.5,
                                }}
                                className="relative"
                            >
                                <Image
                                    src={cardinal.src}
                                    alt={cardinal.alt}
                                    width={400}
                                    height={400}
                                    className="object-contain drop-shadow-2xl filter"
                                />
                                {/* Enhanced magical glow */}
                                <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-400/50 to-pink-400/50 blur-3xl" />
                                <div className="absolute inset-0 -z-10 animate-pulse rounded-full bg-gradient-to-r from-yellow-400/30 to-purple-400/30 blur-2xl" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="mx-auto max-w-7xl">
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

                    {/* Header - Extremely reduced for mobile readability */}
                    <motion.div
                        className="mb-4 text-center md:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="mb-1 inline-flex items-center gap-1 md:mb-3 md:gap-2">
                            <FaShieldAlt className="text-sm text-purple-400 md:text-2xl lg:text-3xl" />
                            <h1 className="font-horizon bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-base font-bold text-transparent md:text-3xl lg:text-4xl">
                                Privacy Policy
                            </h1>
                        </div>
                        <p className="text-xs font-medium text-white md:text-base lg:text-lg">
                            Your privacy matters to us
                        </p>
                    </motion.div>

                    {/* Content Container - Extremely mobile-friendly */}
                    <motion.div
                        className="mx-1 rounded-md border border-white/30 bg-black/70 p-2 shadow-2xl backdrop-blur-xl md:mx-2 md:rounded-xl md:p-4 lg:mx-4 lg:p-6 xl:mx-8 xl:p-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <style jsx global>{`
                            .legal-content h2 {
                                font-size: 0.875rem !important; /* 14px */
                                margin-top: 1rem !important;
                                margin-bottom: 0.5rem !important;
                                color: #c084fc !important;
                                font-weight: 600 !important;
                            }
                            .legal-content p {
                                font-size: 0.75rem !important; /* 12px */
                                line-height: 1.4 !important;
                                margin-bottom: 0.75rem !important;
                                border-left: none !important;
                                padding-left: 0 !important;
                                margin-left: 0 !important;
                            }
                            .legal-content ul {
                                font-size: 0.75rem !important; /* 12px */
                                margin: 0.5rem 0 !important;
                                padding-left: 1rem !important;
                                border-left: none !important;
                            }
                            .legal-content li {
                                font-size: 0.75rem !important; /* 12px */
                                line-height: 1.4 !important;
                                margin-bottom: 0.5rem !important;
                                border-left: none !important;
                                padding-left: 0 !important;
                            }
                            .legal-content blockquote {
                                border-left: none !important;
                                padding-left: 0 !important;
                                margin-left: 0 !important;
                                font-style: normal !important;
                            }
                            @media (min-width: 768px) {
                                .legal-content h2 {
                                    font-size: 1.125rem !important; /* 18px */
                                }
                                .legal-content p,
                                .legal-content ul,
                                .legal-content li {
                                    font-size: 0.875rem !important; /* 14px */
                                    line-height: 1.5 !important;
                                }
                            }
                            @media (min-width: 1024px) {
                                .legal-content h2 {
                                    font-size: 1.25rem !important; /* 20px */
                                }
                                .legal-content p,
                                .legal-content ul,
                                .legal-content li {
                                    font-size: 1rem !important; /* 16px */
                                    line-height: 1.6 !important;
                                }
                            }
                        `}</style>
                        <div
                            className="legal-content max-w-none text-white"
                            dangerouslySetInnerHTML={{ __html: privacyContent }}
                        />

                        {/* Discord Links - Extremely mobile optimized */}
                        <div className="mt-6 border-t border-white/40 pt-3 md:mt-12 md:pt-6">
                            <h3 className="mb-2 text-sm font-semibold text-purple-400 md:mb-3 md:text-base lg:text-lg">
                                Additional Resources
                            </h3>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                                <a
                                    href="https://discord.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block rounded-md border border-purple-400/30 bg-purple-600/20 p-2 text-xs text-purple-300 transition-all hover:bg-purple-600/30 hover:text-purple-200 md:p-3 md:text-sm lg:p-4 lg:text-base"
                                >
                                    Discord Terms ↗
                                </a>
                                <a
                                    href="https://discord.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block rounded-md border border-purple-400/30 bg-purple-600/20 p-2 text-xs text-purple-300 transition-all hover:bg-purple-600/30 hover:text-purple-200 md:p-3 md:text-sm lg:p-4 lg:text-base"
                                >
                                    Discord Privacy ↗
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

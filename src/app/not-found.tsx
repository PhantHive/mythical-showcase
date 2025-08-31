'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NotFound() {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const [currentMessage, setCurrentMessage] = useState(0);

    const messages = [
        '"Ara ara~ Lost traveler, let me show you the way!" 💕',
        '"Even I can\'t find this page... but I found you!" 💖',
        '"Oops! Wrong dimension again!" ✨💘',
        '"Don\'t look so sad! Let\'s go back together!" 💗',
        '"Maybe this page is on a magical adventure?" 🌟💕',
        '"I\'ll be your guide back home, darling~" 💝',
        '"Looks like we both got lost here!" 💖'
    ];

    const heartEmojis = ['💖', '💕', '💝', '💗', '💓', '💘'];

    useEffect(() => {
        // Create twinkling stars
        const numberOfStars = 120;
        const newStars = Array.from({ length: numberOfStars }, (_, i) => {
            const style: React.CSSProperties = {
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                animation: `twinkle ${Math.random() * 2 + 2}s infinite`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3,
            };

            return <span key={i} style={style}></span>;
        });

        setStars(newStars);

        // Rotate messages
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 4500);

        return () => clearInterval(interval);
    }, []);

    const handleErzaClick = () => {
        // Create heart burst effect - we'll handle this with state
        const specialMessages = [
            '"Kyaa! You surprised me!" 💖',
            '"That tickles~!" 💕',
            '"Hehe, found the secret!" ✨',
            '"Magical power activated!" 🌟'
        ];

        setCurrentMessage(-1); // Temporary special message
        setTimeout(() => {
            setCurrentMessage(Math.floor(Math.random() * messages.length));
        }, 2000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />

            {/* Stars */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {stars}
            </div>

            {/* Floating Hearts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }, (_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-400 text-2xl opacity-70"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, -10, -15, 0],
                            rotate: [0, 10, -5, 8, 0],
                            opacity: [0.7, 1, 0.8, 0.9, 0.7],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                        }}
                    >
                        {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
                    </motion.div>
                ))}
            </div>

            {/* Magical Orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: [0, -15, -5],
                        rotate: [0, 5, -3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-[70%] right-[15%] w-24 h-24 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: [0, -15, -5],
                        rotate: [0, 5, -3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: -2,
                    }}
                />
                <motion.div
                    className="absolute top-[40%] left-[85%] w-20 h-20 rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        y: [0, -15, -5],
                        rotate: [0, 5, -3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: -4,
                    }}
                />
            </div>

            {/* 404 Error Code */}
           <motion.div
               className="text-9xl md:text-[12rem] font-bold mb-6 z-10"
               style={{
                   background: 'linear-gradient(45deg, #a855f7, #ec4899, #fbbf24)',
                   backgroundSize: '200% 200%',
                   WebkitBackgroundClip: 'text',
                   backgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   textShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
                   fontFamily: 'Horizon, MedievalSharp, cursive',
               }}
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{
                   backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                   opacity: 1,
                   scale: 1,
               }}
               transition={{
                   duration: 3,
                   repeat: Infinity,
                   ease: "easeInOut",
               }}
           >
                404
            </motion.div>

            {/* Title */}
            <motion.h1
                className="text-5xl md:text-6xl font-bold text-slate-200 mb-6 z-10"
                style={{
                    fontFamily: 'Horizon, MedievalSharp, cursive',
                    textShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                You Got Lost?
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-xl md:text-2xl text-pink-400 mb-12 font-semibold z-10 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                Don&apos;t worry, Erza is here to guide you back to safety!
                <motion.span
                    className="inline-block ml-2 text-pink-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💖
                </motion.span>
            </motion.p>

            {/* Bigger Summer Party Erza */}
            <motion.div
                className="relative inline-block my-12 cursor-pointer z-10"
                onClick={handleErzaClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.3, rotate: 15 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
                <motion.div
                    animate={{
                        y: [0, -15, -20, -8, 0],
                        rotate: [0, 3, 0, -3, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Image
                        src="/assets/Cardinals/Skins/Erza_Z/Summer_Party_Erza.png"
                        alt="Summer Party Erza"
                        width={350}
                        height={350}
                        className="object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 35px rgba(236, 72, 153, 0.8))',
                        }}
                    />
                </motion.div>

                {/* Heart Particles around Erza */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 12 }, (_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-pink-400 text-2xl"
                            style={{
                                left: '50%',
                                top: '50%',
                            }}
                            animate={{
                                x: [0, (Math.random() - 0.5) * 180, (Math.random() - 0.5) * 220],
                                y: [0, (Math.random() - 0.5) * 180, (Math.random() - 0.5) * 220],
                                scale: [1, 1.5, 0.5],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                                ease: "easeInOut",
                            }}
                        >
                            💕
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Fun Messages */}
            <motion.div
                className="mb-12 italic text-pink-300 text-xl md:text-2xl font-semibold z-10 px-4"
                style={{
                    textShadow: '0 0 10px rgba(244, 114, 182, 0.5)',
                }}
                key={currentMessage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {currentMessage === -1
                    ? `"Kyaa! You surprised me!" 💖`
                    : messages[currentMessage]
                }
            </motion.div>

            {/* Back Button */}
            <motion.a
                href="/"
                className="inline-block px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl md:text-2xl font-bold rounded-2xl transition-all duration-300 relative overflow-hidden z-10"
                style={{
                    fontFamily: 'Horizon, MedievalSharp, cursive',
                    boxShadow: '0 8px 30px rgba(236, 72, 153, 0.6)',
                }}
                whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 12px 40px rgba(236, 72, 153, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                />
                💖 Return to the Mythical Realm
            </motion.a>

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.2; }
                }
            `}</style>
        </div>
    );
}

'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MusicPlayer from '@/components/PhearionMusic/MusicPlayer';
import Image from 'next/image';

interface ParticleProps {
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
}

const Particle: React.FC<ParticleProps> = ({ x, y, size, color, speed }) => {
    return (
        <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
                x,
                y,
                width: size,
                height: size,
                backgroundColor: color,
            }}
            animate={{
                y: [y, y + 1000],
                opacity: [0.8, 0],
            }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
};

const ParticleSystem = () => {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    useEffect(() => {
        const particleCount = 50;
        const newParticles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 4 + 2,
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.5)`,
            speed: Math.random() * 10 + 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0">
            {particles.map((particle, index) => (
                <Particle key={index} {...particle} />
            ))}
        </div>
    );
};

const FloatingIslands = () => {
    const { scrollYProgress } = useScroll();

    const island1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const island2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const island3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <div className="pointer-events-none fixed inset-0">
            <motion.div
                style={{ y: island1Y }}
                className="absolute left-0 top-1/4 h-64 w-64 bg-contain bg-no-repeat"
            >
                <Image
                    src="/lobby/map.png"
                    alt="Floating Island 1"
                    className="h-full w-full object-contain opacity-20"
                    width={256}
                    height={256}
                />
            </motion.div>
            <motion.div
                style={{ y: island2Y }}
                className="absolute right-0 top-1/2 h-48 w-48 bg-contain bg-no-repeat"
            >
                <Image
                    src="/lobby/map.png"
                    alt="Floating Island 2"
                    className="h-full w-full object-contain opacity-20"
                    width={256}
                    height={256}
                />
            </motion.div>
            <motion.div
                style={{ y: island3Y }}
                className="absolute bottom-1/4 left-1/3 h-56 w-56 bg-contain bg-no-repeat"
            >
                <Image
                    src="/lobby/map.png"
                    alt="Floating Island 3"
                    className="h-full w-full object-contain opacity-20"
                    width={256}
                    height={256}
                />
            </motion.div>
        </div>
    );
};

const GameLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0B0B2E] via-[#1B1B4B] to-[#2E0B2E] text-white">
            <div className="fixed inset-0 bg-[url('/lobby/map.png')] bg-cover bg-center opacity-10" />
            <ParticleSystem />
            <FloatingIslands />
            <div className="relative z-10">{children}</div>
            <MusicPlayer />
        </div>
    );
};

export default GameLayout;

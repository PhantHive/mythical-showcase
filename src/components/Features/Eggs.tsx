'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Dna, Snowflake } from 'lucide-react';

type EggType = 'enchanted' | 'fairy' | 'mystic';
type LuminalType = 'normal' | 'snow';

interface Luminal {
    name: string;
    type: LuminalType;
    rarity: number; // 1-5 stars
}

interface Egg {
    name: string;
    image: string;
    description: string;
    luminals: Record<string, Luminal>;
}

interface HatchedLuminal {
    name: string;
    image: string;
    type: LuminalType;
    rarity: number;
}

const eggs: Record<EggType, Egg> = {
    fairy: {
        name: 'Fairy Egg',
        image: '/Eggs/fairy-egg.png',
        description: 'Home to magical fairy Luminals',
        luminals: {
            Merrycal: { name: 'Merrycal', type: 'snow', rarity: 2 },
            Nowmi: { name: 'Nowmi', type: 'snow', rarity: 2 },
            Brushy: { name: 'Brushy', type: 'normal', rarity: 2 },
            Labali: { name: 'Labali', type: 'normal', rarity: 2 },
            Lumi: { name: 'Lumi', type: 'normal', rarity: 2 },
            Mavi: { name: 'Mavi', type: 'normal', rarity: 2 },
            Mentari: { name: 'Mentari', type: 'normal', rarity: 2 },
            Pawnee: { name: 'Pawnee', type: 'normal', rarity: 2 },
            Pioupy: { name: 'Pioupy', type: 'normal', rarity: 2 },
            Raizu: { name: 'Raizu', type: 'normal', rarity: 2 },
            Syrex: { name: 'Syrex', type: 'normal', rarity: 2 },
            Thundy: { name: 'Thundy', type: 'normal', rarity: 2 },
            Umella: { name: 'Umella', type: 'normal', rarity: 2 },
            Yumiko: { name: 'Yumiko', type: 'normal', rarity: 2 },
        },
    },
    enchanted: {
        name: 'Enchanted Egg',
        image: '/Eggs/enchanted-egg.png',
        description: 'Contains powerful enchanted Luminals',
        luminals: {
            Blizou: { name: 'Blizou', type: 'snow', rarity: 4 },
            Blutari: { name: 'Blutari', type: 'normal', rarity: 4 },
            Cloufy: { name: 'Cloufy', type: 'normal', rarity: 4 },
            Faber: { name: 'Faber', type: 'normal', rarity: 4 },
            Huky: { name: 'Huky', type: 'normal', rarity: 4 },
            Pandora: { name: 'Pandora', type: 'normal', rarity: 4 },
            PoliPoli: { name: 'PoliPoli', type: 'normal', rarity: 4 },
            Prismetia: { name: 'Prismetia', type: 'normal', rarity: 4 },
            Redari: { name: 'Redari', type: 'normal', rarity: 4 },
            Vegat: { name: 'Vegat', type: 'normal', rarity: 4 },
            Wadoon: { name: 'Wadoon', type: 'normal', rarity: 4 },
            Zahakyu: { name: 'Zahakyu', type: 'normal', rarity: 4 },
        },
    },
    mystic: {
        name: 'Mystic Egg',
        image: '/Eggs/mystic-egg.png',
        description: 'Holds rare mystic Luminals',
        luminals: {
            Woka: { name: 'Woka', type: 'snow', rarity: 5 },
            Nufair: { name: 'Nufair', type: 'normal', rarity: 5 },
            Oltar: { name: 'Oltar', type: 'normal', rarity: 5 },
            Solarian: { name: 'Solarian', type: 'normal', rarity: 5 },
            Yume: { name: 'Yume', type: 'normal', rarity: 5 },
        },
    },
};

export default function Eggs() {
    const [selectedEgg, setSelectedEgg] = useState<EggType | null>(null);
    const [isHatching, setIsHatching] = useState(false);
    const [isSequencing, setIsSequencing] = useState(false);
    const [hatchedLuminal, setHatchedLuminal] = useState<HatchedLuminal | null>(null);

    const handleHatch = async (sequenced: boolean = false) => {
        if (!selectedEgg) return;

        if (sequenced) {
            setIsSequencing(true);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Longer animation for sequencing
            setIsSequencing(false);
        } else {
            setIsHatching(true);
        }

        const availableLuminals = Object.values(eggs[selectedEgg].luminals).filter(luminal =>
            sequenced ? luminal.type === 'snow' : true
        );

        if (availableLuminals.length === 0) {
            setIsHatching(false);
            return; // No valid Luminals available
        }

        const randomLuminal =
            availableLuminals[Math.floor(Math.random() * availableLuminals.length)];

        // Simulate hatching animation
        await new Promise(resolve => setTimeout(resolve, 2000));

        setHatchedLuminal({
            name: randomLuminal.name,
            image: `/Luminals/${selectedEgg}/${randomLuminal.name}.png`,
            type: randomLuminal.type,
            rarity: randomLuminal.rarity,
        });

        setIsHatching(false);
    };

    const getEggRarityText = (type: EggType) => {
        switch (type) {
            case 'fairy':
                return '★★';
            case 'enchanted':
                return '★★★★';
            case 'mystic':
                return '★★★★★';
        }
    };

    return (
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16" id="eggs">
            <div className="mx-auto max-w-6xl">
                <h2 className="medieval-title medieval-gradient mb-16 text-center text-4xl">
                    Discover Magical Eggs
                </h2>

                <div className="grid gap-8 md:grid-cols-3">
                    {(Object.entries(eggs) as [EggType, Egg][]).map(([type, egg]) => (
                        <motion.div
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`medieval-card glow-effect egg-card cursor-pointer ${
                                selectedEgg === type ? `${type}-selected glow-effect-${type}` : ''
                            }`}
                            onClick={() => {
                                setSelectedEgg(prevEgg => (prevEgg === type ? null : type));
                                setHatchedLuminal(null);
                            }}
                        >
                            <div className="relative mb-6 h-48">
                                <Image
                                    src={egg.image}
                                    alt={egg.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="medieval-title mb-2 text-center text-xl">{egg.name}</h3>
                            <p className="mb-2 text-center text-gray-300">{egg.description}</p>
                            <p className="text-center text-yellow-400">{getEggRarityText(type)}</p>
                            {Object.values(egg.luminals).some(l => l.type === 'snow') && (
                                <div className="mt-2 flex justify-center">
                                    <Snowflake className="text-blue-300" size={20} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedEgg && !hatchedLuminal && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-12"
                        >
                            <div className="mx-auto max-w-md space-y-6">
                                {/* Normal Hatch Button */}
                                <button
                                    className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4
                    font-medium text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                    onClick={() => handleHatch(false)}
                                    disabled={isHatching || isSequencing}
                                >
                                    <div className="relative z-10 flex items-center justify-center">
                                        {isHatching ? (
                                            <span className="flex items-center">
                                                <svg
                                                    className="-ml-1 mr-3 h-5 w-5 animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Hatching...
                                            </span>
                                        ) : (
                                            <span className="text-lg">Hatch Egg</span>
                                        )}
                                    </div>
                                    {!isHatching && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            animate={{
                                                x: ['-100%', '100%'],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'linear',
                                            }}
                                        />
                                    )}
                                </button>

                                {/* Snow Type Sequencing Button - Only show if egg has snow types */}
                                {Object.values(eggs[selectedEgg].luminals).some(
                                    l => l.type === 'snow'
                                ) && (
                                    <div className="relative">
                                        <button
                                            className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4
                        font-medium text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                            onClick={() => handleHatch(true)}
                                            disabled={isHatching || isSequencing}
                                        >
                                            <div className="relative z-10 flex items-center justify-center gap-2">
                                                {isSequencing ? (
                                                    <span className="flex items-center">
                                                        <Dna
                                                            className="mr-2 animate-spin"
                                                            size={20}
                                                        />
                                                        Sequencing DNA...
                                                    </span>
                                                ) : (
                                                    <>
                                                        <Dna size={20} />
                                                        <span className="text-lg">
                                                            Hatch Sequenced Snow Type
                                                        </span>
                                                        <div className="flex items-center gap-1 rounded bg-black/20 px-2 py-1">
                                                            <span>5</span>
                                                            <span className="text-yellow-300">
                                                                🍫
                                                            </span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            {!isSequencing && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    animate={{
                                                        x: ['-100%', '100%'],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    }}
                                                />
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {hatchedLuminal && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="mt-12"
                        >
                            <div className="medieval-card mx-auto max-w-md text-center">
                                <h3 className="mb-4 text-2xl font-bold">
                                    You hatched {hatchedLuminal.name}!
                                </h3>
                                <div className="mb-4 flex items-center justify-center gap-2">
                                    <span className="text-yellow-400">
                                        {'★'.repeat(hatchedLuminal.rarity)}
                                    </span>
                                    {hatchedLuminal.type === 'snow' && (
                                        <Snowflake className="text-blue-300" size={20} />
                                    )}
                                </div>
                                <div className="relative mb-6 h-64">
                                    <Image
                                        src={hatchedLuminal.image}
                                        alt={hatchedLuminal.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <button
                                    className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3
                    font-medium text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    onClick={() => setHatchedLuminal(null)}
                                >
                                    Hatch Another
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

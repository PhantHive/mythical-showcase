'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaHome, FaFilter, FaPalette } from 'react-icons/fa';

interface Luminal {
    id: string;
    name: string;
    rarity: 'fairy' | 'enchanted' | 'mystic';
    image: string;
    chromaImage?: string;
    element?: string;
    description?: string;
}

const LuminalsCollectionPage: React.FC = () => {
    const [selectedRarity, setSelectedRarity] = useState<string>('all');
    const [selectedLuminal, setSelectedLuminal] = useState<Luminal | null>(null);
    const [showChroma, setShowChroma] = useState<{ [key: string]: boolean }>({});
    const [luminals, setLuminals] = useState<Luminal[]>([]);
    const [luminalsData, setLuminalsData] = useState<any>({});
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Load luminals data
        const loadLuminalsData = async () => {
            try {
                const response = await fetch('/assets/luminalsDesc.json');
                const data = await response.json();
                setLuminalsData(data);
            } catch (error) {
                console.error('Failed to load luminals data:', error);
            }
        };

        loadLuminalsData();

        // Initialize luminals based on file structure
        const allLuminals: Luminal[] = [
            // Fairy Luminals
            {
                id: 'aviva',
                name: 'Aviva',
                rarity: 'fairy',
                image: '/Luminals/fairy/Aviva.png',
                chromaImage: '/Luminals/fairy/Chroma/Aviva/Aviva-variant.png',
            },
            {
                id: 'brushy',
                name: 'Brushy',
                rarity: 'fairy',
                image: '/Luminals/fairy/Brushy.png',
                chromaImage: '/Luminals/fairy/Chroma/Brushy/Brushy-variant.png',
            },
            {
                id: 'labali',
                name: 'Labali',
                rarity: 'fairy',
                image: '/Luminals/fairy/Labali.png',
                chromaImage: '/Luminals/fairy/Chroma/Labali/Labali-variant.png',
            },
            {
                id: 'leafflo',
                name: 'Leafflo',
                rarity: 'fairy',
                image: '/Luminals/fairy/Leafflo.png',
                chromaImage: '/Luminals/fairy/Chroma/Leafflo/Leafflo-variant.png',
            },
            {
                id: 'lumi',
                name: 'Lumi',
                rarity: 'fairy',
                image: '/Luminals/fairy/Lumi.png',
                chromaImage: '/Luminals/fairy/Chroma/Lumi/Lumi-variant.png',
            },
            {
                id: 'mavi',
                name: 'Mavi',
                rarity: 'fairy',
                image: '/Luminals/fairy/Mavi.png',
                chromaImage: '/Luminals/fairy/Chroma/Mavi/Mavi-variant.png',
            },
            {
                id: 'mentari',
                name: 'Mentari',
                rarity: 'fairy',
                image: '/Luminals/fairy/Mentari.png',
                chromaImage: '/Luminals/fairy/Chroma/Mentari/Mentari-variant.png',
            },
            {
                id: 'merrycal',
                name: 'Merrycal',
                rarity: 'fairy',
                image: '/Luminals/fairy/Merrycal.png',
                chromaImage: '/Luminals/fairy/Chroma/Merrycal/Merrycal-variant.png',
            },
            {
                id: 'nowmi',
                name: 'Nowmi',
                rarity: 'fairy',
                image: '/Luminals/fairy/Nowmi.png',
                chromaImage: '/Luminals/fairy/Chroma/Nowmi/Nowmi-variant.png',
            },
            { id: 'pawnee', name: 'Pawnee', rarity: 'fairy', image: '/Luminals/fairy/Pawnee.png' },
            { id: 'pioupy', name: 'Pioupy', rarity: 'fairy', image: '/Luminals/fairy/Pioupy.png' },
            {
                id: 'raizu',
                name: 'Raizu',
                rarity: 'fairy',
                image: '/Luminals/fairy/Raizu.png',
                chromaImage: '/Luminals/fairy/Chroma/Raizu/Raizu-variant.png',
            },
            {
                id: 'syrex',
                name: 'Syrex',
                rarity: 'fairy',
                image: '/Luminals/fairy/Syrex.png',
                chromaImage: '/Luminals/fairy/Chroma/Syrex/Syrex-variant.png',
            },
            {
                id: 'thundy',
                name: 'Thundy',
                rarity: 'fairy',
                image: '/Luminals/fairy/Thundy.png',
                chromaImage: '/Luminals/fairy/Chroma/Thundy/Thundy-variant.png',
            },
            {
                id: 'umella',
                name: 'Umella',
                rarity: 'fairy',
                image: '/Luminals/fairy/Umella.png',
                chromaImage: '/Luminals/fairy/Chroma/Umella/Umella-variant.png',
            },
            {
                id: 'yumiko',
                name: 'Yumiko',
                rarity: 'fairy',
                image: '/Luminals/fairy/Yumiko.png',
                chromaImage: '/Luminals/fairy/Chroma/Yumiko/Yumiko-variant.png',
            },

            // Enchanted Luminals
            {
                id: 'blizou',
                name: 'Blizou',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Blizou.png',
            },
            {
                id: 'blutari',
                name: 'Blutari',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Blutari.png',
                chromaImage: '/Luminals/enchanted/Chroma/Blutari/Blutari-variant.png',
            },
            {
                id: 'cloufy',
                name: 'Cloufy',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Cloufy.png',
                chromaImage: '/Luminals/enchanted/Chroma/Cloufy/Cloufy-variant.png',
            },
            {
                id: 'cocogii',
                name: 'Cocogii',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Cocogii.png',
            },
            {
                id: 'faber',
                name: 'Faber',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Faber.png',
                chromaImage: '/Luminals/enchanted/Chroma/Faber/Faber-variant.png',
            },
            {
                id: 'huky',
                name: 'Huky',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Huky.png',
            },
            {
                id: 'pandora',
                name: 'Pandora',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Pandora.png',
                chromaImage: '/Luminals/enchanted/Chroma/Pandora/Pandora-variant.png',
            },
            {
                id: 'polipoli',
                name: 'PoliPoli',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/PoliPoli.png',
                chromaImage: '/Luminals/enchanted/Chroma/PoliPoli/PoliPoli-variant.png',
            },
            {
                id: 'prismetia',
                name: 'Prismetia',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Prismetia.png',
            },
            {
                id: 'redari',
                name: 'Redari',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Redari.png',
            },
            {
                id: 'vegat',
                name: 'Vegat',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Vegat.png',
            },
            {
                id: 'wadoon',
                name: 'Wadoon',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Wadoon.png',
                chromaImage: '/Luminals/enchanted/Chroma/Wadoon/Wadoon-variant.png',
            },
            {
                id: 'zahakyu',
                name: 'Zahakyu',
                rarity: 'enchanted',
                image: '/Luminals/enchanted/Zahakyu.png',
                chromaImage: '/Luminals/enchanted/Chroma/Zahakyu/Zahakyu-variant.png',
            },

            // Mystic Luminals (no chroma variants)
            { id: 'ala', name: 'Ala', rarity: 'mystic', image: '/Luminals/mystic/Ala.png' },
            { id: 'alina', name: 'Alina', rarity: 'mystic', image: '/Luminals/mystic/Alina.png' },
            { id: 'aslow', name: 'Aslow', rarity: 'mystic', image: '/Luminals/mystic/Aslow.png' },
            {
                id: 'flaneris',
                name: 'Flaneris',
                rarity: 'mystic',
                image: '/Luminals/mystic/Flaneris.png',
            },
            { id: 'ina', name: 'Ina', rarity: 'mystic', image: '/Luminals/mystic/Ina.png' },
            { id: 'nalil', name: 'Nalil', rarity: 'mystic', image: '/Luminals/mystic/Nalil.png' },
            { id: 'natsu', name: 'Natsu', rarity: 'mystic', image: '/Luminals/mystic/Natsu.png' },
            {
                id: 'nufair',
                name: 'Nufair',
                rarity: 'mystic',
                image: '/Luminals/mystic/Nufair.png',
            },
            { id: 'oltar', name: 'Oltar', rarity: 'mystic', image: '/Luminals/mystic/Oltar.png' },
            {
                id: 'solarian',
                name: 'Solarian',
                rarity: 'mystic',
                image: '/Luminals/mystic/Solarian.png',
            },
            { id: 'woka', name: 'Woka', rarity: 'mystic', image: '/Luminals/mystic/Woka.png' },
            { id: 'yume', name: 'Yume', rarity: 'mystic', image: '/Luminals/mystic/Yume.png' },
        ];

        setLuminals(allLuminals);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filteredLuminals = useMemo(() => {
        if (selectedRarity === 'all') return luminals;
        return luminals.filter(l => l.rarity === selectedRarity);
    }, [luminals, selectedRarity]);

    const rarityColors = {
        fairy: 'from-blue-400 to-cyan-500',
        enchanted: 'from-purple-400 to-violet-600',
        mystic: 'from-yellow-400 to-orange-500',
    };

    const rarityBorders = {
        fairy: 'border-blue-400/50',
        enchanted: 'border-purple-400/50',
        mystic: 'border-yellow-400/50',
    };

    const toggleChroma = (luminalId: string) => {
        setShowChroma(prev => ({ ...prev, [luminalId]: !prev[luminalId] }));
    };

    if (!mounted) return null;

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Home Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="fixed left-6 top-6 z-40"
            >
                <button
                    onClick={() => (window.location.href = '/')}
                    className={`group flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-5 py-3 text-white/80 backdrop-blur-lg transition-all duration-200 hover:bg-black/60 hover:text-white ${isMobile ? 'mobile-touch-target' : ''}`}
                >
                    <FaHome
                        className={`transition-transform duration-200 group-hover:scale-110 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`}
                    />
                    <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                        Home
                    </span>
                </button>
            </motion.div>

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/background-2.png"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className={`relative z-10 ${isMobile ? 'px-4 pb-16 pt-24' : 'px-6 pb-16 pt-32'}`}>
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1
                            className={`font-horizon mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text font-bold text-transparent ${isMobile ? 'text-4xl' : 'text-6xl'}`}
                        >
                            Luminals Collection
                        </h1>
                        <p
                            className={`mx-auto max-w-2xl text-white/80 ${isMobile ? 'text-base' : 'text-xl'}`}
                        >
                            Discover all {luminals.length} magical Luminals across three rarities
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`mb-12 flex ${isMobile ? 'flex-col gap-3' : 'flex-wrap'} justify-center gap-4`}
                    >
                        <motion.button
                            onClick={() => setSelectedRarity('all')}
                            className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${isMobile ? 'mobile-touch-target' : ''} ${
                                selectedRarity === 'all'
                                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 text-white'
                                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                            }`}
                            whileHover={isMobile ? {} : { scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaFilter className="mr-2 inline" />
                            All ({luminals.length})
                        </motion.button>

                        {Object.entries({
                            fairy: 'Fairy',
                            enchanted: 'Enchanted',
                            mystic: 'Mystic',
                        }).map(([key, label]) => {
                            const count = luminals.filter(l => l.rarity === key).length;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => setSelectedRarity(key)}
                                    className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${isMobile ? 'mobile-touch-target' : ''} ${
                                        selectedRarity === key
                                            ? `bg-gradient-to-r ${rarityColors[key as keyof typeof rarityColors]} text-white`
                                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                                    }`}
                                    whileHover={isMobile ? {} : { scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {label} ({count})
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Luminals Grid */}
                    <motion.div
                        layout
                        className={`grid gap-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'}`}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredLuminals.map((luminal, index) => (
                                <LuminalCard
                                    key={luminal.id}
                                    luminal={luminal}
                                    index={index}
                                    showChroma={showChroma[luminal.id]}
                                    onToggleChroma={() => toggleChroma(luminal.id)}
                                    onClick={() => setSelectedLuminal(luminal)}
                                    rarityColors={rarityColors}
                                    rarityBorders={rarityBorders}
                                    isMobile={isMobile}
                                    luminalsData={luminalsData}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedLuminal && (
                    <LuminalModal
                        luminal={selectedLuminal}
                        showChroma={showChroma[selectedLuminal.id]}
                        onToggleChroma={() => toggleChroma(selectedLuminal.id)}
                        onClose={() => setSelectedLuminal(null)}
                        rarityColors={rarityColors}
                        rarityBorders={rarityBorders}
                        isMobile={isMobile}
                        luminalsData={luminalsData}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Luminal Card Component with 3D Effects
interface LuminalCardProps {
    luminal: Luminal;
    index: number;
    showChroma: boolean;
    onToggleChroma: () => void;
    onClick: () => void;
    rarityColors: any;
    rarityBorders: any;
    isMobile: boolean;
    luminalsData: any;
}

const LuminalCard: React.FC<LuminalCardProps> = ({
    luminal,
    index,
    showChroma,
    onToggleChroma,
    onClick,
    rarityColors,
    rarityBorders,
    isMobile,
    luminalsData,
}) => {
    const currentImage = showChroma && luminal.chromaImage ? luminal.chromaImage : luminal.image;
    const luminalInfo = luminalsData[luminal.name];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.03, layout: { duration: 0.3 } }}
            className="group relative cursor-pointer"
            style={{ zIndex: 1 }}
            whileHover={
                isMobile
                    ? {}
                    : {
                          zIndex: 2000,
                          transition: {
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                          },
                      }
            }
        >
            <motion.div
                className="relative aspect-[3/4] rounded-xl bg-black/30 shadow-lg backdrop-blur-sm transition-all duration-300"
                onClick={onClick}
                whileHover={
                    isMobile
                        ? {}
                        : {
                              scale: 1.02,
                              y: -4,
                              transition: {
                                  type: 'spring',
                                  stiffness: 400,
                                  damping: 25,
                              },
                          }
                }
                whileTap={{ scale: 0.98 }}
                style={{
                    zIndex: 2,
                    overflow: 'visible',
                }}
            >
                {/* Background Glow Effect */}
                {!isMobile && (
                    <div
                        className={`absolute -inset-2 bg-gradient-to-r ${rarityColors[luminal.rarity]} -z-10 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50`}
                    />
                )}

                {/* Card Frame Background - maintains visual structure */}
                <div className="absolute inset-0 overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm">
                    {/* This creates the visual card frame without borders */}
                </div>

                {/* Main Image Container - can now overflow */}
                <div className="relative h-full w-full">
                    <motion.div
                        className="relative h-full w-full"
                        whileHover={
                            isMobile
                                ? {}
                                : {
                                      scale: 1.4,
                                      y: -20,
                                      transition: {
                                          type: 'spring',
                                          stiffness: 300,
                                          damping: 20,
                                      },
                                  }
                        }
                        style={{
                            zIndex: 3,
                            transformOrigin: 'center center',
                        }}
                    >
                        <Image
                            src={currentImage}
                            alt={luminal.name}
                            fill
                            className="scale-110 object-contain transition-all duration-300"
                            style={{
                                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                            }}
                        />
                    </motion.div>
                </div>

                {/* Chroma Toggle Button - Top Right (moved from left) */}
                {luminal.chromaImage && (
                    <motion.button
                        onClick={e => {
                            e.stopPropagation();
                            onToggleChroma();
                        }}
                        className={`absolute right-2 top-2 rounded-lg bg-black/80 p-2 backdrop-blur-sm transition-all duration-200 ${
                            isMobile ? 'active:scale-95' : 'hover:bg-black/90'
                        }`}
                        whileHover={
                            isMobile
                                ? {}
                                : {
                                      scale: 1.05,
                                      transition: { type: 'spring', stiffness: 300 },
                                  }
                        }
                        whileTap={{ scale: 0.9 }}
                        style={{ zIndex: 200 }}
                    >
                        <FaPalette
                            className={`${showChroma ? 'text-purple-400' : 'text-white/60'} ${
                                isMobile ? 'text-sm' : 'text-base'
                            }`}
                        />
                    </motion.button>
                )}

                {/* Info Overlay - Bottom - ALWAYS ON TOP */}
                <div
                    className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3"
                    style={{ zIndex: 300 }}
                >
                    <motion.div
                        whileHover={
                            isMobile
                                ? {}
                                : {
                                      y: -2,
                                      transition: { type: 'spring', stiffness: 300 },
                                  }
                        }
                    >
                        <h3
                            className={`font-horizon font-bold text-white ${isMobile ? 'text-sm' : 'text-base'} drop-shadow-lg`}
                        >
                            {luminal.name}
                        </h3>
                        <p
                            className={`bg-gradient-to-r capitalize text-transparent ${rarityColors[luminal.rarity]} bg-clip-text font-medium ${
                                isMobile ? 'text-xs' : 'text-sm'
                            } drop-shadow-lg`}
                        >
                            {luminal.rarity}
                        </p>
                        {luminalInfo?.element && (
                            <p
                                className={`text-white/70 ${isMobile ? 'text-xs' : 'text-sm'} drop-shadow-lg`}
                            >
                                {luminalInfo.element}
                            </p>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Luminal Modal Component
interface LuminalModalProps {
    luminal: Luminal;
    showChroma: boolean;
    onToggleChroma: () => void;
    onClose: () => void;
    rarityColors: any;
    rarityBorders: any;
    isMobile: boolean;
    luminalsData: any;
}

const LuminalModal: React.FC<LuminalModalProps> = ({
    luminal,
    showChroma,
    onToggleChroma,
    onClose,
    rarityColors,
    rarityBorders,
    isMobile,
    luminalsData,
}) => {
    const currentImage = showChroma && luminal.chromaImage ? luminal.chromaImage : luminal.image;
    const luminalInfo = luminalsData[luminal.name];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 50 }}
                className={`relative mx-4 w-full ${isMobile ? 'max-w-md' : 'max-w-2xl'}`}
                onClick={e => e.stopPropagation()}
            >
                <div
                    className={`relative overflow-hidden rounded-2xl border-4 bg-black/40 shadow-2xl backdrop-blur-xl ${rarityBorders[luminal.rarity]}`}
                >
                    {/* Image Section */}
                    <div
                        className={`relative ${isMobile ? 'h-96' : 'h-[500px]'} bg-gradient-to-b from-transparent to-black/60`}
                    >
                        <Image
                            src={currentImage}
                            alt={luminal.name}
                            fill
                            className="scale-125 object-contain"
                        />

                        {/* Chroma Toggle */}
                        {luminal.chromaImage && (
                            <button
                                onClick={onToggleChroma}
                                className={`absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-black/60 px-4 py-2 backdrop-blur-sm transition-all ${isMobile ? 'mobile-touch-target' : 'hover:bg-black/80'}`}
                            >
                                <FaPalette
                                    className={showChroma ? 'text-purple-400' : 'text-white/60'}
                                />
                                <span
                                    className={`text-white ${isMobile ? 'text-sm' : 'text-base'}`}
                                >
                                    {showChroma ? 'Chroma' : 'Original'}
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                        <h2
                            className={`font-horizon mb-2 font-bold text-white ${isMobile ? 'text-2xl' : 'text-4xl'}`}
                        >
                            {luminal.name}
                        </h2>
                        <p
                            className={`mb-4 bg-gradient-to-r font-bold capitalize text-transparent ${rarityColors[luminal.rarity]} bg-clip-text ${isMobile ? 'text-lg' : 'text-xl'}`}
                        >
                            {luminal.rarity}
                        </p>

                        {luminalInfo && (
                            <>
                                {luminalInfo.element && (
                                    <div className="mb-3">
                                        <span className="font-bold text-white/90">Element: </span>
                                        <span className="text-white/70">{luminalInfo.element}</span>
                                    </div>
                                )}
                                {luminalInfo.story && (
                                    <div
                                        className={`rounded-lg bg-white/5 p-4 backdrop-blur-sm ${isMobile ? 'text-sm' : 'text-base'}`}
                                    >
                                        <h3 className="mb-2 font-bold text-white">Story:</h3>
                                        <p className="leading-relaxed text-white/80">
                                            {luminalInfo.story}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}

                        <p
                            className={`mt-4 text-center text-white/60 ${isMobile ? 'text-xs' : 'text-sm'}`}
                        >
                            Click outside to close or press ESC
                        </p>
                    </div>
                </div>

                {/* Glow Effect */}
                <div
                    className={`absolute -inset-8 bg-gradient-to-r ${rarityColors[luminal.rarity]} -z-10 rounded-2xl opacity-20 blur-2xl`}
                />
            </motion.div>
        </motion.div>
    );
};

export default LuminalsCollectionPage;

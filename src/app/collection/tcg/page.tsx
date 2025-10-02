'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

interface Card {
    id: string;
    name: string;
    rarity: 'C' | 'R' | 'SR' | 'SSR';
    image: string;
}

const TCGPage: React.FC = () => {
    const [selectedRarity, setSelectedRarity] = useState<string>('all');
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [cards, setCards] = useState<Card[]>([]);
    const [cardsFlipped, setCardsFlipped] = useState<boolean>(false);

    useEffect(() => {
        // Add the shimmer animation styles
        const style = document.createElement('style');
        style.textContent = `
          @keyframes shimmer {
            0% { background-position: -200% -200%; }
            50% { background-position: 200% 200%; }
            100% { background-position: -200% -200%; }
          }
        `;
        document.head.appendChild(style);

        // Initialize cards based on the file structure
        const cardData: Card[] = [
            // Common cards (G prefix)
            {
                id: 'G001-0925',
                name: 'Lumi',
                rarity: 'C',
                image: '/assets/tcg/cards/G001-0925.png',
            },
            {
                id: 'G002-0925',
                name: 'Brushy',
                rarity: 'C',
                image: '/assets/tcg/cards/G002-0925.png',
            },
            {
                id: 'G003-0925',
                name: 'Nowmi',
                rarity: 'C',
                image: '/assets/tcg/cards/G003-0925.png',
            },
            {
                id: 'G004-0925',
                name: 'Thundy',
                rarity: 'C',
                image: '/assets/tcg/cards/G004-0925.png',
            },
            {
                id: 'G013-0925',
                name: 'Aviva',
                rarity: 'C',
                image: '/assets/tcg/cards/G013-0925.png',
            },
            {
                id: 'G014-0925',
                name: 'Umella',
                rarity: 'C',
                image: '/assets/tcg/cards/G014-0925.png',
            },

            // Rare cards (B prefix)
            {
                id: 'B005-0925',
                name: 'Redari',
                rarity: 'R',
                image: '/assets/tcg/cards/B005-0925.png',
            },
            {
                id: 'B006-0925',
                name: 'Blutari',
                rarity: 'R',
                image: '/assets/tcg/cards/B006-0925.png',
            },
            {
                id: 'B007-0925',
                name: 'Cocogii',
                rarity: 'R',
                image: '/assets/tcg/cards/B007-0925.png',
            },
            {
                id: 'B008-0925',
                name: 'Faber',
                rarity: 'R',
                image: '/assets/tcg/cards/B008-0925.png',
            },

            // Super Rare cards (P prefix)
            {
                id: 'P009-0925',
                name: 'Yume Dreamland',
                rarity: 'SR',
                image: '/assets/tcg/cards/P009-0925.png',
            },
            {
                id: 'P010-0925',
                name: 'Natsu Sakura Guardian',
                rarity: 'SR',
                image: '/assets/tcg/cards/P010-0925.png',
            },
            {
                id: 'P011-0925',
                name: 'Nalil Natural Wonder',
                rarity: 'SR',
                image: '/assets/tcg/cards/P011-0925.png',
            },
            {
                id: 'P012-0925',
                name: 'Oltar Thundergod',
                rarity: 'SR',
                image: '/assets/tcg/cards/P012-0925.png',
            },

            // Super Super Rare cards (Y prefix)
            {
                id: 'Y015-0925',
                name: 'Erza Summer Party',
                rarity: 'SSR',
                image: '/assets/tcg/cards/Y015-0925.png',
            },
        ];

        setCards(cardData);

        // Start flipping cards after 1 second (faster start)
        const timer = setTimeout(() => {
            setCardsFlipped(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const filteredCards =
        selectedRarity === 'all' ? cards : cards.filter(card => card.rarity === selectedRarity);

    const rarityColors = {
        C: 'from-green-400 to-green-600',
        R: 'from-blue-400 to-blue-600',
        SR: 'from-purple-400 to-purple-600',
        SSR: 'from-yellow-400 to-yellow-600',
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Floating Home Button - Enhanced for ultra-wide */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="fixed left-6 top-6 z-40"
            >
                <button
                    onClick={() => (window.location.href = '/')}
                    className="group flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-5 py-3 text-white/80 backdrop-blur-lg transition-all duration-200 hover:bg-black/60 hover:text-white"
                >
                    <FaHome className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 xl:h-6 xl:w-6" />
                    <span className="text-sm font-medium xl:text-base">Home</span>
                </button>
            </motion.div>

            {/* Background with dragon scale pattern */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/background-3.png"
                    alt="Dragon Scale Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 pb-16 pt-32 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-full">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="font-horizon mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                            MYTHICAL TCG
                        </h1>
                        <p className="mx-auto mb-3 max-w-2xl text-xl text-white/80">
                            Discover the complete collection of Mythical Trading Cards with stunning
                            artwork and powerful abilities.
                        </p>
                        <div className="inline-flex items-center gap-3 rounded-full border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 px-5 py-3 backdrop-blur-sm">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-orange-400"></div>
                            <span className="text-sm font-semibold text-white/90 xl:text-base">
                                Beta • Official designs coming soon!
                            </span>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12 flex flex-wrap justify-center gap-4"
                    >
                        <motion.button
                            onClick={() => setSelectedRarity('all')}
                            className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                                selectedRarity === 'all'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            All Cards ({cards.length})
                        </motion.button>

                        {Object.entries(rarityColors).map(([key, label]) => {
                            const count = cards.filter(card => card.rarity === key).length;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => setSelectedRarity(key)}
                                    className={`rounded-xl px-6 py-3 font-medium transition-all duration-200 ${
                                        selectedRarity === key
                                            ? `bg-gradient-to-r ${rarityColors[key as keyof typeof rarityColors]} text-white`
                                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {key} ({count})
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    {/* Cards Grid - Reduced card size by 15% with increased spacing */}
                    <motion.div
                        layout
                        className="3xl:grid-cols-9 4xl:grid-cols-10 5xl:grid-cols-10 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 md:grid-cols-5 lg:grid-cols-6 lg:gap-12 xl:grid-cols-7 xl:gap-16 2xl:grid-cols-8 2xl:gap-20"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredCards.map((card, index) => (
                                <Card3D
                                    key={card.id}
                                    card={card}
                                    index={index}
                                    onClick={() => setSelectedCard(card)}
                                    isFlipped={cardsFlipped}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Card Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

// 3D Card Component with proper perspective effects
interface Card3DProps {
    card: Card;
    index: number;
    onClick: () => void;
    isFlipped: boolean;
}

const Card3D: React.FC<Card3DProps> = ({ card, index, onClick, isFlipped }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const [animationPhase, setAnimationPhase] = useState<
        'initial' | 'spinning' | 'bouncing' | 'completed'
    >('initial');

    useEffect(() => {
        if (isFlipped && animationPhase === 'initial') {
            // Start the complex animation sequence
            setTimeout(() => {
                setAnimationPhase('spinning');
                setTimeout(() => {
                    setAnimationPhase('bouncing');
                    setTimeout(() => {
                        setAnimationPhase('completed');
                    }, 800); // Bounce phase duration
                }, 2200); // Spin phase duration
            }, index * 120); // Staggered start
        }
    }, [isFlipped, index, animationPhase]);

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!cardRef.current || !isFlipped) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on mouse position relative to card center
        const rotateX = Math.max(-15, Math.min(15, (clientY - centerY) / 8));
        const rotateY = Math.max(-15, Math.min(15, (centerX - clientX) / 8));

        // Calculate glare position for reflection effect
        const glareX = ((clientX - rect.left) / rect.width) * 100;
        const glareY = ((clientY - rect.top) / rect.height) * 100;

        setRotation({ x: rotateX, y: rotateY });
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            const touch = e.touches[0];
            handleInteraction(touch.clientX, touch.clientY);
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
        setGlarePosition({ x: 50, y: 50 });
    };

    const handleTouchEnd = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
        setGlarePosition({ x: 50, y: 50 });
    };

    const handleCardClick = () => {
        if (isFlipped) {
            onClick();
        }
    };

    const rarityColors = {
        C: 'from-green-400 to-green-600',
        R: 'from-blue-400 to-blue-600',
        SR: 'from-purple-400 to-purple-600',
        SSR: 'from-yellow-400 to-yellow-600',
    };

    const rarityBorders = {
        C: 'border-green-400/50',
        R: 'border-blue-400/50',
        SR: 'border-purple-400/50',
        SSR: 'border-yellow-400/50',
    };

    // Calculate the rotation based on animation phase
    const getCardRotation = () => {
        if (animationPhase === 'initial') {
            return 'rotateY(180deg)'; // Start with card back showing
        } else if (animationPhase === 'spinning') {
            return 'rotateY(540deg)'; // 360° + 180° = full spin + reveal
        } else if (animationPhase === 'bouncing') {
            return 'rotateY(15deg)'; // Slight bounce back
        } else {
            // Completed - add hover effects
            return `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) ${isHovered ? 'scale(1.08)' : 'scale(1)'}`;
        }
    };

    // Get animation timing
    const getAnimationTiming = () => {
        if (animationPhase === 'spinning') {
            return 'transform 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else if (animationPhase === 'bouncing') {
            return 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        } else if (animationPhase === 'completed') {
            return 'transform 0.2s ease-out';
        }
        return 'transform 0s';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.05, layout: { duration: 0.3 } }}
            className="group relative cursor-pointer touch-manipulation"
            style={{ perspective: '1000px' }}
        >
            <div
                ref={cardRef}
                className={`relative aspect-[3/4] w-full ${animationPhase === 'completed' ? 'cursor-pointer' : 'cursor-default'}`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: getCardRotation(),
                    transition: getAnimationTiming(),
                }}
                onMouseMove={animationPhase === 'completed' ? handleMouseMove : undefined}
                onMouseEnter={animationPhase === 'completed' ? () => setIsHovered(true) : undefined}
                onMouseLeave={animationPhase === 'completed' ? handleMouseLeave : undefined}
                onTouchMove={animationPhase === 'completed' ? handleTouchMove : undefined}
                onTouchEnd={animationPhase === 'completed' ? handleTouchEnd : undefined}
                onClick={animationPhase === 'completed' ? handleCardClick : undefined}
            >
                {/* Card Front */}
                <div
                    className={`absolute inset-0 h-full w-full overflow-hidden rounded-xl border-2 shadow-2xl ${rarityBorders[card.rarity]} select-none bg-black/20`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                    }}
                >
                    {/* Card Image */}
                    <img
                        src={card.image}
                        alt={card.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                    />

                    {/* Mirror reflection effect */}
                    {isHovered && isFlipped && (
                        <div
                            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, transparent 60%)`,
                            }}
                        />
                    )}

                    {/* Holographic shimmer overlay */}
                    {isHovered && isFlipped && (
                        <div className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300">
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 60%, transparent 70%)`,
                                    backgroundSize: '200% 200%',
                                    animation: 'shimmer 2s ease-in-out infinite',
                                }}
                            />
                        </div>
                    )}

                    {/* Rarity badge */}
                    <div
                        className={`absolute right-3 top-3 rounded-lg bg-gradient-to-r px-3 py-1 ${rarityColors[card.rarity]} text-sm font-bold text-white shadow-lg xl:text-base`}
                    >
                        {card.rarity}
                    </div>
                </div>

                {/* Card Back */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl border-2 border-purple-400/40 shadow-2xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <img
                        src="/assets/tcg/card-back.png"
                        alt="Card Back"
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                </div>

                {/* Enhanced glow effect for rarity */}
                {isHovered && isFlipped && (
                    <div
                        className={`absolute -inset-2 bg-gradient-to-r ${rarityColors[card.rarity]} -z-10 rounded-xl opacity-30 blur-lg transition-opacity duration-300`}
                    />
                )}
            </div>
        </motion.div>
    );
};

// Enhanced Card Modal Component with proper 3D perspective
interface CardModalProps {
    card: Card;
    onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
    const modalCardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!modalCardRef.current) return;

        const rect = modalCardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Enhanced rotation for modal view (more dramatic)
        const rotateX = Math.max(-20, Math.min(20, (clientY - centerY) / 10));
        const rotateY = Math.max(-20, Math.min(20, (centerX - clientX) / 10));

        // Enhanced glare position
        const glareX = ((clientX - rect.left) / rect.width) * 100;
        const glareY = ((clientY - rect.top) / rect.height) * 100;

        setRotation({ x: rotateX, y: rotateY });
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            const touch = e.touches[0];
            handleInteraction(touch.clientX, touch.clientY);
        }
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setGlarePosition({ x: 50, y: 50 });
        setIsHovered(false);
    };

    const handleTouchEnd = () => {
        setRotation({ x: 0, y: 0 });
        setGlarePosition({ x: 50, y: 50 });
        setIsHovered(false);
    };

    const rarityColors = {
        C: 'from-green-400 to-green-600',
        R: 'from-blue-400 to-blue-600',
        SR: 'from-purple-400 to-purple-600',
        SSR: 'from-yellow-400 to-yellow-600',
    };

    const rarityBorders = {
        C: 'border-green-400/50',
        R: 'border-blue-400/50',
        SR: 'border-purple-400/50',
        SSR: 'border-yellow-400/50',
    };

    // Close modal on Escape key
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
                className="relative mx-4 w-full max-w-2xl"
                style={{ perspective: '1200px' }}
                onClick={e => e.stopPropagation()}
            >
                <div
                    ref={modalCardRef}
                    className={`relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-4 shadow-2xl ${rarityBorders[card.rarity]} bg-black/20`}
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
                        transition: 'transform 0.2s ease-out',
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Card Image */}
                    <img
                        src={card.image}
                        alt={card.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                    />

                    {/* Enhanced mirror reflection for modal */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 15%, rgba(255,255,255,0.1) 30%, transparent 50%)`,
                        }}
                    />

                    {/* Enhanced holographic overlay for modal */}
                    <div className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-300">
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 25%, transparent 50%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.1) 100%)`,
                                backgroundSize: '200% 200%',
                                animation: 'shimmer 3s ease-in-out infinite',
                            }}
                        />
                    </div>

                    {/* Rarity badge */}
                    <div
                        className={`absolute right-4 top-4 rounded-lg bg-gradient-to-r px-4 py-2 ${rarityColors[card.rarity]} text-lg font-bold text-white shadow-lg`}
                    >
                        {card.rarity}
                    </div>
                </div>

                {/* Card info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-center"
                >
                    <h3 className="font-horizon mb-2 text-3xl font-bold text-white">{card.name}</h3>
                    <div
                        className={`inline-block rounded-full bg-gradient-to-r px-6 py-2 ${rarityColors[card.rarity]} text-lg font-medium text-white`}
                    >
                        {card.rarity}
                    </div>
                    <p className="mt-4 text-sm text-white/60">
                        Click outside to close or press ESC
                    </p>
                </motion.div>

                {/* Enhanced rarity glow for modal */}
                <div
                    className={`absolute -inset-8 bg-gradient-to-r ${rarityColors[card.rarity]} -z-10 rounded-2xl opacity-20 blur-2xl transition-opacity duration-300 ${
                        isHovered ? 'opacity-30' : 'opacity-20'
                    }`}
                />
            </motion.div>
        </motion.div>
    );
};

export default TCGPage;

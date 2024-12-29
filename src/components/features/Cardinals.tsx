'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type CardinalType = 'attack' | 'defense' | 'heal';
type CardinalForm = 'normal' | 'chibi';

interface Skin {
    name: string;
    image: string;
}

interface CardinalForms {
    normal: {
        base: string;
        skins: Record<string, Skin>;
    };
    chibi: {
        base: string;
        skins: Record<string, Skin>;
    };
}

interface Cardinal {
    name: string;
    description: string;
    forms: CardinalForms;
}

const cardinals: Record<CardinalType, Cardinal> = {
    attack: {
        name: 'Attack Cardinal',
        description: 'Master of offensive tactics and powerful strikes',
        forms: {
            normal: {
                base: '/Cardinals/attack-cardinal.png',
                skins: {
                    'ena-x': {
                        name: 'Ena X',
                        image: '/Cardinals/Skins/Ena X/Dea X Ena.png',
                    },
                },
            },
            chibi: {
                base: '/Cardinals/Chibi/chibi-attack.png',
                skins: {
                    'dea-x-ena': {
                        name: 'Dea X Ena',
                        image: '/Cardinals/Chibi/Skins/Chibi_Dea_X_Ena.png',
                    },
                },
            },
        },
    },
    defense: {
        name: 'Defense Cardinal',
        description: 'Guardian of the realm, protector of allies',
        forms: {
            normal: {
                base: '/Cardinals/defense-cardinal.png',
                skins: {},
            },
            chibi: {
                base: '/Cardinals/Chibi/chibi-defense.png',
                skins: {},
            },
        },
    },
    heal: {
        name: 'Heal Cardinal',
        description: 'Blessed with divine healing powers',
        forms: {
            normal: {
                base: '/Cardinals/heal-cardinal.png',
                skins: {
                    elsena_w: {
                        name: 'Elsena W',
                        image: '/Cardinals/Skins/Esen W/Elsena_W.png',
                    },
                },
            },
            chibi: {
                base: '/Cardinals/Chibi/chibi-heal.png',
                skins: {
                    elsena_w: {
                        name: 'Elsena W',
                        image: '/Cardinals/Chibi/Skins/Chibi_Elsena_W.png',
                    },
                },
            },
        },
    },
};

export default function Cardinals() {
    const [selectedCardinal, setSelectedCardinal] = useState<CardinalType>('attack');
    const [selectedForm, setSelectedForm] = useState<CardinalForm>('normal');
    const [selectedSkin, setSelectedSkin] = useState<string | null>(null);

    const currentCardinal = cardinals[selectedCardinal];
    const currentForm = currentCardinal.forms[selectedForm];
    const currentImage = selectedSkin ? currentForm.skins[selectedSkin].image : currentForm.base;

    return (
        <section className="bg-gradient-to-b from-[#1B1B4B] to-[#2E0B2E] px-4 py-16" id="cardinals">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent">
                    Choose Your Guardian
                </h2>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                        {/* Cardinal Selection */}
                        <div className="medieval-card">
                            <div className="grid grid-cols-3 gap-4">
                                {(Object.entries(cardinals) as [CardinalType, Cardinal][]).map(
                                    ([id, cardinal]) => (
                                        <button
                                            key={id}
                                            onClick={() => {
                                                setSelectedCardinal(id);
                                                setSelectedSkin(null);
                                            }}
                                            className={`rounded-lg p-4 transition-all ${
                                                selectedCardinal === id
                                                    ? 'bg-purple-600 hover:bg-purple-700'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                        >
                                            <h4 className="text-lg font-bold">{cardinal.name}</h4>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Form Selection */}
                        <div className="medieval-card">
                            <h3 className="mb-4 text-xl font-bold">Select Form</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {(['normal', 'chibi'] as CardinalForm[]).map(form => (
                                    <button
                                        key={form}
                                        onClick={() => {
                                            setSelectedForm(form);
                                            setSelectedSkin(null);
                                        }}
                                        className={`rounded-lg p-4 capitalize transition-all ${
                                            selectedForm === form
                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        {form}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Skin Selection */}
                        {Object.keys(currentForm.skins).length > 0 && (
                            <div className="medieval-card">
                                <h3 className="mb-4 text-xl font-bold">Select Skin</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setSelectedSkin(null)}
                                        className={`rounded-lg p-4 transition-all ${
                                            selectedSkin === null
                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        Default
                                    </button>
                                    {Object.entries(currentForm.skins).map(([id, skin]) => (
                                        <button
                                            key={id}
                                            onClick={() => setSelectedSkin(id)}
                                            className={`rounded-lg p-4 transition-all ${
                                                selectedSkin === id
                                                    ? 'bg-purple-600 hover:bg-purple-700'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                        >
                                            {skin.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cardinal Preview */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${selectedCardinal}-${selectedForm}-${selectedSkin}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="medieval-card relative h-96"
                        >
                            <Image
                                src={currentImage}
                                alt={`${currentCardinal.name} - ${selectedForm}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

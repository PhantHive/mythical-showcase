'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Home, Users, Settings, Maximize2 } from 'lucide-react';

interface CompanionSlot {
    type: 'cardinal' | 'luminal' | null;
    name: string | null;
    image: string | null;
}

const House = () => {
    const [activeTab, setActiveTab] = useState<'house' | 'companions'>('house');
    const [companions] = useState<CompanionSlot[]>([
        { type: 'cardinal', name: 'Attack Cardinal', image: '/Cardinals/Chibi/chibi-attack.png' },
        { type: 'luminal', name: 'Nufair', image: '/Luminals/mystic/Nufair.png' },
    ]);

    const [isViewingDashboard, setIsViewingDashboard] = useState(false);

    return (
        <section className="relative px-4 py-16">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-purple-900/30" />
            <div className="absolute inset-0 bg-[url('/House/house.png')] bg-cover bg-center opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent" />

            {/* Content */}
            <div className="relative z-10">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
                            Your Magical Home
                        </h2>
                        <button
                            onClick={() => setIsViewingDashboard(!isViewingDashboard)}
                            className="flex items-center gap-2 rounded-lg bg-gray-800/80 px-4 py-2 transition-colors hover:bg-gray-700"
                        >
                            <Maximize2 size={18} />
                            {isViewingDashboard ? 'View House' : 'View Dashboard'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main House Display */}
                        <div className="lg:col-span-2">
                            <motion.div
                                className="relative overflow-hidden rounded-xl bg-gray-800/50 p-1 shadow-2xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <Image
                                    src={
                                        isViewingDashboard
                                            ? '/House/house-dashboard.png'
                                            : '/House/house.png'
                                    }
                                    alt="Your Magical House"
                                    width={800}
                                    height={500}
                                    className="w-full rounded-lg object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* House Controls & Companions */}
                        <div className="space-y-4 lg:col-span-1">
                            {/* Tab Navigation */}
                            <div className="flex rounded-lg bg-gray-800/80 p-1">
                                <button
                                    className={`flex-1 rounded-md px-4 py-2 transition-colors ${
                                        activeTab === 'house'
                                            ? 'bg-purple-600'
                                            : 'hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('house')}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Home size={18} />
                                        House
                                    </span>
                                </button>
                                <button
                                    className={`flex-1 rounded-md px-4 py-2 transition-colors ${
                                        activeTab === 'companions'
                                            ? 'bg-purple-600'
                                            : 'hover:bg-gray-700'
                                    }`}
                                    onClick={() => setActiveTab('companions')}
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Users size={18} />
                                        Companions
                                    </span>
                                </button>
                            </div>

                            {/* Content Area */}
                            <AnimatePresence mode="wait">
                                {activeTab === 'house' ? (
                                    <motion.div
                                        key="house"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="rounded-lg bg-gray-800/80 p-4"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <Settings className="text-purple-400" />
                                            <h3 className="text-lg font-semibold">
                                                House Settings
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span>House Comfort</span>
                                                <span className="text-purple-400">24</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Companion Slots</span>
                                                <span className="text-purple-400">2/2</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>House Type</span>
                                                <span className="text-purple-400">
                                                    Large (Enchanted)
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="companions"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="grid grid-cols-2 gap-3"
                                    >
                                        {companions.map((companion, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center rounded-lg bg-gray-800/80 p-3"
                                            >
                                                {companion.type ? (
                                                    <>
                                                        <div className="relative mb-2 h-20 w-20">
                                                            <Image
                                                                src={companion.image!}
                                                                alt={companion.name!}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        <span className="text-sm text-gray-300">
                                                            {companion.name}
                                                        </span>
                                                        <span className="text-xs capitalize text-purple-400">
                                                            {companion.type}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-600">
                                                        <span className="text-sm text-gray-500">
                                                            Empty Slot
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default House;

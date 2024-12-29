import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';

interface Song {
    title: string;
    path: string;
}

const songs: Song[] = [
    { title: 'Lumières de Phearion', path: '/songs/Lumières de Phearion.mp3' },
    { title: "Phearin's warriors", path: "/songs/Phearin's warriors.mp3" },
];

const chibiImages = [
    '/Cardinals/Chibi/chibi-attack.png',
    '/Cardinals/Chibi/chibi-defense.png',
    '/Cardinals/Chibi/chibi-heal.png',
];

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [randomChibi] = useState(
        () => chibiImages[Math.floor(Math.random() * chibiImages.length)]
    );

    useEffect(() => {
        const audio = new Audio(songs[currentSong].path);
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handlePlayPause = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
            setShowPrompt(false);
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error('Playback failed:', error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <>
            {/* Music Player */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-4 right-4 z-50"
            >
                <div className="rounded-lg border border-purple-500/20 bg-gray-900/90 p-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        {/* Chibi Image */}
                        <div className="relative h-12 w-12">
                            <Image
                                src={randomChibi}
                                alt="Chibi Cardinal"
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Song Info & Controls */}
                        <div>
                            <h3 className="text-sm font-medium text-white">
                                {songs[currentSong].title}
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                                <button
                                    onClick={handlePlayPause}
                                    className="rounded-full p-1 transition-colors hover:bg-purple-500/20"
                                >
                                    {isPlaying ? (
                                        <Pause className="h-5 w-5 text-white" />
                                    ) : (
                                        <Play className="h-5 w-5 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={toggleMute}
                                    className="rounded-full p-1 transition-colors hover:bg-purple-500/20"
                                >
                                    {isMuted ? (
                                        <VolumeX className="h-5 w-5 text-white" />
                                    ) : (
                                        <Volume2 className="h-5 w-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Initial Prompt */}
            <AnimatePresence>
                {showPrompt && !hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-20 right-4 z-50 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-lg"
                    >
                        <p className="text-sm">Click to enable music 🎵</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MusicPlayer;

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import Image from 'next/image';

interface Song {
    title: string;
    path: string;
}

const songs: Song[] = [
    { title: 'Lumières de Phearion', path: '/songs/Lumières de Phearion.mp3' },
    { title: "Phearion's warriors", path: "/songs/Phearion's warriors.mp3" },
];

const chibiImages = [
    '/Cardinals/Chibi/chibi-attack.png',
    '/Cardinals/Chibi/chibi-defense.png',
    '/Cardinals/Chibi/chibi-heal.png',
];

const MusicPlayer: React.FC = () => {
    // State management
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const playPromiseRef = useRef<Promise<void> | null>(null);

    // Memoized selections
    const currentSong = useMemo(() => songs[currentSongIndex], [currentSongIndex]);
    const randomChibi = useMemo(
        () => chibiImages[Math.floor(Math.random() * chibiImages.length)],
        []
    );

    const initializeAudio = useCallback(() => {
        if (!audioRef.current) {
            const audioElement = new Audio(currentSong.path);
            audioElement.preload = 'auto';
            audioRef.current = audioElement;
            setCurrentSongIndex(0);

            audioRef.current.addEventListener('ended', handleSongEnd);
        } else {
            // Update source if different
            audioRef.current.src = currentSong.path;
        }

        audioRef.current.muted = isMuted;
    }, [currentSong, isMuted]);

    // Safely play audio
    const safePlay = useCallback(async () => {
        if (!audioRef.current) return;

        try {
            if (playPromiseRef.current) {
                await playPromiseRef.current.catch(() => {});
            }

            // Ensure audio is ready
            await new Promise<void>(resolve => {
                if (audioRef.current?.readyState === 4) {
                    resolve();
                } else {
                    audioRef.current?.addEventListener('canplaythrough', () => resolve(), {
                        once: true,
                    });
                }
            });

            playPromiseRef.current = audioRef.current.play();
            await playPromiseRef.current;
            setIsPlaying(true);
        } catch (error) {
            console.error('Playback failed:', error);
            setIsPlaying(false);
        }
    }, []);

    // Safely pause audio
    const safePause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        playPromiseRef.current = null;
        setIsPlaying(false);
    }, []);

    // Handle song end
    const handleSongEnd = useCallback(() => {
        goToNextSong();
    }, []);

    // Play/Pause handler
    const handlePlayPause = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
            setShowPrompt(false);
        }

        initializeAudio();

        if (isPlaying) {
            safePause();
        } else {
            safePlay();
        }
    }, [hasInteracted, isPlaying, initializeAudio, safePlay, safePause]);

    const goToNextSong = useCallback(() => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        safePause();
        setCurrentSongIndex(nextIndex);

        initializeAudio();
        if (isPlaying) {
            const playSong = safePlay();

            if (playSong) {
                playSong.catch(() => {
                    goToNextSong();
                });
            }
        }
    }, [currentSongIndex, isPlaying, initializeAudio, safePlay, safePause]);

    const goToPreviousSong = useCallback(() => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        safePause();

        setCurrentSongIndex(prevIndex);

        initializeAudio();
        if (isPlaying) {
            safePlay();
        }
    }, [currentSongIndex, isPlaying, initializeAudio, safePlay, safePause]);

    // Toggle mute
    const toggleMute = useCallback(() => {
        setIsMuted(prev => {
            if (audioRef.current) {
                audioRef.current.muted = !prev;
            }
            return !prev;
        });
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        const currentAudio = audioRef.current;
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.removeEventListener('ended', handleSongEnd);
            }
        };
    }, []);

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
                            <h3 className="text-sm font-medium text-white">{currentSong.title}</h3>
                            <div className="mt-1 flex items-center gap-2">
                                <button
                                    onClick={goToPreviousSong}
                                    className="rounded-full p-1 transition-colors hover:bg-purple-500/20"
                                >
                                    <SkipBack className="h-5 w-5 text-white" />
                                </button>
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
                                    onClick={goToNextSong}
                                    className="rounded-full p-1 transition-colors hover:bg-purple-500/20"
                                >
                                    <SkipForward className="h-5 w-5 text-white" />
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

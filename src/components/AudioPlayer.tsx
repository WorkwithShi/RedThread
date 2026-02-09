import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Loader2, AlertCircle } from 'lucide-react';

// Global audio element to prevent multiple instances
let globalAudio: HTMLAudioElement | null = null;
let globalListeners: Set<(isPlaying: boolean) => void> = new Set();

const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Romantic Piano Instrumental - "Love" by Bensound (Stable royalty free)
    const trackUrl = "https://www.bensound.com/bensound-music/bensound-love.mp3";

    useEffect(() => {
        // Register this component's state updater
        globalListeners.add(setIsPlaying);

        // Initialize global audio if it doesn't exist
        if (!globalAudio) {
            globalAudio = new Audio(trackUrl);
            globalAudio.loop = true;
            globalAudio.volume = 0.4;
            globalAudio.preload = 'auto';

            const handleLoadStart = () => setIsLoading(true);
            const handleCanPlay = () => setIsLoading(false);
            const handleError = () => {
                setIsLoading(false);
                setHasError(true);
                console.error("Audio failed to load.");
            };

            globalAudio.addEventListener('loadstart', handleLoadStart);
            globalAudio.addEventListener('canplay', handleCanPlay);
            globalAudio.addEventListener('error', handleError);

            // Attempt to auto-play on mount
            const attemptAutoPlay = async () => {
                try {
                    await globalAudio!.play();
                    globalListeners.forEach(listener => listener(true));
                } catch (err) {
                    console.log("Auto-play blocked by browser, waiting for user interaction");
                    // Add one-time click listener to start music
                    const startOnClick = () => {
                        globalAudio!.play()
                            .then(() => globalListeners.forEach(listener => listener(true)))
                            .catch(() => { });
                        document.removeEventListener('click', startOnClick);
                    };
                    document.addEventListener('click', startOnClick, { once: true });
                }
            };
            attemptAutoPlay();
        } else {
            // Sync state with existing audio
            setIsPlaying(!globalAudio.paused);
        }

        return () => {
            // Unregister this component's state updater
            globalListeners.delete(setIsPlaying);
        };
    }, [trackUrl]);

    const togglePlay = () => {
        if (globalAudio) {
            if (!globalAudio.paused) {
                globalAudio.pause();
                globalListeners.forEach(listener => listener(false));
            } else {
                setHasError(false);
                globalAudio.play()
                    .then(() => globalListeners.forEach(listener => listener(true)))
                    .catch((err) => {
                        console.warn("Audio play blocked", err);
                        globalListeners.forEach(listener => listener(false));
                    });
            }
        }
    };

    return (
        <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-[var(--color-pink)] shadow-sm">
            <button
                onClick={togglePlay}
                disabled={hasError}
                className={`flex items-center gap-1.5 text-xs font-medium transition-all ${hasError ? 'text-gray-400 cursor-not-allowed' : 'text-[var(--color-red)] hover:scale-110'
                    }`}
                title={hasError ? "Audio Load Failed" : isPlaying ? "Mute Music" : "Play Music"}
            >
                {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : hasError ? (
                    <AlertCircle size={16} />
                ) : isPlaying ? (
                    <Volume2 size={16} />
                ) : (
                    <VolumeX size={16} />
                )}

                <span className="hidden md:inline">
                    {isLoading ? "Loading..." : hasError ? "Audio Error" : isPlaying ? "Music On" : "Music Off"}
                </span>

                {!isLoading && !hasError && (
                    <Music size={14} className={isPlaying ? "animate-pulse" : ""} />
                )}
            </button>
        </div>
    );
};

export default AudioPlayer;

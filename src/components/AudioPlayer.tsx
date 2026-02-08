import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Loader2, AlertCircle } from 'lucide-react';

const AudioPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Romantic Piano Instrumental - "Love" by Bensound (Stable royalty free)
    const trackUrl = "https://www.bensound.com/bensound-music/bensound-love.mp3";


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;

            const handleLoadStart = () => setIsLoading(true);
            const handleCanPlay = () => setIsLoading(false);
            const handleError = () => {
                setIsLoading(false);
                setHasError(true);
                console.error("Audio failed to load.");
            };

            const el = audioRef.current;
            el.addEventListener('loadstart', handleLoadStart);
            el.addEventListener('canplay', handleCanPlay);
            el.addEventListener('error', handleError);

            return () => {
                el.removeEventListener('loadstart', handleLoadStart);
                el.removeEventListener('canplay', handleCanPlay);
                el.removeEventListener('error', handleError);
            };
        }
    }, [trackUrl]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setHasError(false);
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => {
                        console.warn("Audio play blocked", err);
                        setIsPlaying(false);
                    });
            }
        }
    };

    return (
        <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-[var(--color-pink)] shadow-sm">
            <audio ref={audioRef} src={trackUrl} preload="auto" />

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

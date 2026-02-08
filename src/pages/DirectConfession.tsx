import { useState, useRef } from 'react';
import Button from '../components/Button';
import { Download, Type, Image as ImageIcon, Smile, RefreshCw } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import '../styles/animations.css';

const backgrounds = [
    'bg-white',
    'bg-[var(--color-cream)]',
    'bg-gradient-to-br from-pink-100 to-red-100',
    'bg-red-50',
];

const patterns = [
    'none',
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d32f2f\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d32f2f\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'
];

const stickers = ['❤️', '🌹', '💌', '🦢', '✨', '🎀', '🧸', '💋'];

const DirectConfession = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState('To my beloved,\n\n');
    const [bgIndex, setBgIndex] = useState(0);
    const [patternIndex, setPatternIndex] = useState(0);
    const [placedStickers, setPlacedStickers] = useState<{ id: number, char: string, x: number, y: number }[]>([]);

    const handleDownload = () => {
        if (cardRef.current) {
            htmlToImage.toPng(cardRef.current)
                .then((dataUrl) => {
                    download(dataUrl, 'love-note.png');
                })
                .catch((err) => {
                    console.error('Failed to download image', err);
                    alert('Failed to download. Please verify browser support or try screenshotting.');
                });
        }
    };

    const addSticker = (char: string) => {
        const x = Math.random() * 80; // random percent
        const y = Math.random() * 80;
        setPlacedStickers([...placedStickers, { id: Date.now(), char, x, y }]);
    };

    const clearStickers = () => setPlacedStickers([]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center min-h-[80vh] p-4 animate-fade-in max-w-6xl mx-auto">

            {/* Controls */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] flex flex-col gap-6">
                <h2 className="text-2xl font-heading text-[var(--color-red)]">Design Your Note</h2>

                <div>
                    <label className="block text-sm font-bold opacity-70 mb-2 flex items-center gap-2"><Type size={16} /> Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 rounded-[var(--radius-lg)] border border-[var(--color-pink)] h-32 resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold opacity-70 mb-2 flex items-center gap-2"><ImageIcon size={16} /> Background</label>
                    <div className="flex gap-2">
                        <button onClick={() => setBgIndex((bgIndex + 1) % backgrounds.length)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">Color</button>
                        <button onClick={() => setPatternIndex((patternIndex + 1) % patterns.length)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">Pattern</button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold opacity-70 mb-2 flex items-center gap-2"><Smile size={16} /> Stickers (Click to Add)</label>
                    <div className="flex flex-wrap gap-2 text-2xl cursor-pointer select-none">
                        {stickers.map(s => (
                            <span key={s} onClick={() => addSticker(s)} className="hover:scale-125 transition-transform">{s}</span>
                        ))}
                    </div>
                    <button onClick={clearStickers} className="text-xs text-red-500 mt-2 hover:underline flex items-center gap-1"><RefreshCw size={12} /> Clear Stickers</button>
                </div>

                <Button onClick={handleDownload} className="w-full mt-4">
                    Download Card <Download size={18} />
                </Button>
            </div>

            {/* Preview */}
            <div className="w-full lg:w-2/3 flex items-center justify-center bg-gray-100 p-8 rounded-[var(--radius-xl)] min-h-[500px]">
                <div
                    ref={cardRef}
                    className={`relative w-full max-w-md aspect-[3/4] p-8 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden transition-all ${backgrounds[bgIndex]}`}
                    style={{ backgroundImage: patterns[patternIndex] }}
                >
                    {/* Border Decoration */}
                    <div className="absolute inset-4 border-2 border-[var(--color-red)] opacity-50 pointer-events-none rounded-lg" />
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply" />

                    {/* Stickers */}
                    {placedStickers.map(s => (
                        <div
                            key={s.id}
                            className="absolute text-4xl animate-pulse"
                            style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${Math.random() * 45 - 22.5}deg)` }}
                        >
                            {s.char}
                        </div>
                    ))}

                    {/* Content */}
                    <div className="relative z-10 w-full font-serif">
                        <div className="mb-8 text-[var(--color-red)] opacity-80">
                            <HeartIcon />
                        </div>
                        <p className="whitespace-pre-wrap text-xl md:text-2xl leading-relaxed text-[var(--color-text)] drop-shadow-sm min-h-[100px]">
                            {message}
                        </p>
                        <div className="mt-12 pt-4 border-t border-[var(--color-red)] w-1/2 mx-auto">
                            <p className="text-sm font-heading text-[var(--color-red)]">With all my love</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeartIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

export default DirectConfession;

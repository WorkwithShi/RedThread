import React, { useState, useRef } from 'react';
import Button from '../components/Button';
import { Sparkles, Heart, Download, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import '../styles/animations.css';

const Compatibility = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    const calculateCompatibility = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simple deterministic hash for "real" feeling results
        const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            hash = combined.charCodeAt(i) + ((hash << 5) - hash);
        }
        const calculatedScore = Math.abs(hash % 101);

        setTimeout(() => {
            setScore(calculatedScore);
            setLoading(false);
        }, 1500);
    };

    const downloadCertificate = async () => {
        if (!certificateRef.current) return;
        setLoading(true);
        try {
            const dataUrl = await toPng(certificateRef.current, { quality: 0.95, backgroundColor: '#fff5f5' });
            download(dataUrl, `compatibility-certificate-${Date.now()}.png`);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-[80vh] gap-8 animate-fade-in p-4 max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
                <h1 className="text-5xl font-heading text-[var(--color-red)] mb-2">Destiny Match</h1>
                <p className="text-[var(--color-text)] opacity-70">
                    Calculated by the stars, woven by the red thread.
                </p>
            </div>

            <div className="w-full max-w-md bg-white/80 p-8 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border border-[var(--color-pink)]">
                <form onSubmit={calculateCompatibility} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 opacity-70">Your Name</label>
                        <input
                            type="text"
                            value={name1}
                            onChange={(e) => setName1(e.target.value)}
                            className="w-full p-3 rounded-[var(--radius-lg)] border border-[var(--color-pink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] bg-white/50"
                            placeholder="Person A"
                            required
                        />
                    </div>

                    <div className="flex justify-center -my-2 relative z-10">
                        <div className="bg-[var(--color-red)] text-white p-2 rounded-full shadow-md animate-pulse">
                            <Heart size={24} fill="currentColor" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 opacity-70">Their Name</label>
                        <input
                            type="text"
                            value={name2}
                            onChange={(e) => setName2(e.target.value)}
                            className="w-full p-3 rounded-[var(--radius-lg)] border border-[var(--color-pink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] bg-white/50"
                            placeholder="Person B"
                            required
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Calculate Love"} <Sparkles size={18} />
                    </Button>
                </form>
            </div>

            {/* Results Section */}
            {score !== null && (
                <div className="w-full max-w-2xl animate-fade-in flex flex-col gap-8">
                    <div className="bg-white p-6 rounded-[var(--radius-xl)] shadow-lg text-center border-2 border-[var(--color-red-light)] max-w-md mx-auto w-full">
                        <h2 className="text-xl font-bold mb-1 text-[var(--color-text)]">Compatibility Score</h2>
                        <div className="text-5xl font-heading text-[var(--color-red)] mb-1">{score}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div
                                className="bg-[var(--color-red)] h-full transition-all duration-1000 ease-out"
                                style={{ width: `${score}%` }}
                            />
                        </div>
                        <p className="italic opacity-80 text-sm">
                            {score > 80 ? "A match made in heaven!" :
                                score > 50 ? "A promising connection." :
                                    "The red thread may be tangled..."}
                        </p>
                    </div>

                    {/* Detailed Report / Certificate */}
                    <div ref={certificateRef} className="bg-white p-8 rounded-[var(--radius-xl)] shadow-2xl text-center border-[8px] border-double border-[var(--color-red)] mx-auto w-full max-w-md relative overflow-hidden transition-all bg-[var(--color-cream)]">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--color-red)] opacity-20" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[var(--color-red)] opacity-20" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[var(--color-red)] opacity-20" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[var(--color-red)] opacity-20" />

                        <div className="animate-fade-in text-center space-y-6 relative z-10">
                            <div className="flex flex-col items-center gap-3 text-[var(--color-red)]">
                                <Heart fill="currentColor" size={32} className="animate-pulse" />
                                <h2 className="text-2xl font-bold uppercase tracking-[4px] border-b border-[var(--color-red)] pb-1" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Certificate of Destiny</h2>
                            </div>

                            <div className="py-6 space-y-2">
                                <p className="text-sm italic text-gray-700 font-serif" style={{ fontFamily: "'Prata', serif" }}>This solemnly certifies that the souls of</p>
                                <h3 className="text-3xl font-bold text-[var(--color-text)] truncate px-4" style={{ fontFamily: "'Prata', serif" }}>{name1} & {name2}</h3>
                                <p className="text-sm italic text-gray-700 font-serif" style={{ fontFamily: "'Prata', serif" }}>hold a compatibility of</p>
                                <div className="text-6xl font-bold text-[var(--color-red)] my-4 drop-shadow-sm" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>{score}%</div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 text-sm opacity-90 max-w-xs mx-auto border-t border-[var(--color-red)] border-opacity-20 pt-6">
                                <div className="flex justify-between border-b border-pink-100 pb-1" style={{ fontFamily: "'Prata', serif" }}>
                                    <span className="font-bold">Dynamic:</span>
                                    <span>{score > 85 ? "Eternal Twin Flames" : score > 70 ? "Sacred Connection" : score > 40 ? "Kindred Spirits" : "A Lesson in Growth"}</span>
                                </div>
                                <div className="text-center italic text-gray-600 px-2 leading-relaxed" style={{ fontFamily: "'Prata', serif" }}>
                                    "Your threads are {score > 50 ? "woven with golden silk and destiny's grace." : "tangled in a way that only time and care can unravel."}"
                                </div>
                            </div>

                            <div className="pt-8 flex justify-between items-end px-2">
                                <div className="text-left opacity-40">
                                    <p className="text-[8px] uppercase tracking-widest mb-1" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Issue Date</p>
                                    <p className="text-[10px] font-mono">{new Date().toLocaleDateString()}</p>
                                </div>
                                {/* Kanji Hanko Stamp */}
                                <div className="relative group">
                                    <div className="w-12 h-12 border-[2px] border-[var(--color-red)] flex items-center justify-center text-[var(--color-red)] font-bold text-2xl rounded-sm rotate-[-12deg] bg-red-500/5 shadow-inner relative overflow-hidden">
                                        <span className="relative z-10">縁</span>
                                        {/* Distress effect */}
                                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                                    </div>
                                    <p className="text-[7px] mt-1 text-[var(--color-red)] opacity-50 uppercase tracking-tighter text-center" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>Fate Stamp</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                            <Heart size={200} />
                        </div>
                    </div>

                    <Button onClick={downloadCertificate} variant="outline" className="w-full max-w-md mx-auto flex items-center justify-center gap-2" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : "Download Scroll"} <Download size={18} />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Compatibility;

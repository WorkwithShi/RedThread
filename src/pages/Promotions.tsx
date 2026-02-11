import { useRef, useState } from 'react';
import { Heart, Instagram, Share2, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { QRCodeCanvas } from 'qrcode.react';
import Button from '../components/Button';
import '../styles/animations.css';

const Promotions = () => {
    const feedRef = useRef<HTMLDivElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);
    const guideRef = useRef<HTMLDivElement>(null);
    const qrFrameRef = useRef<HTMLDivElement>(null);
    const projectQrRef = useRef<HTMLDivElement>(null);

    const [myInboxId] = useState<string | null>(localStorage.getItem('red_thread_recipient_id'));

    const handleDownload = async (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
        if (!ref.current) return;
        try {
            const dataUrl = await toPng(ref.current, { quality: 0.95, backgroundColor: '#FFFBF0' });
            download(dataUrl, `${name}.png`);
        } catch (e) {
            console.error(e);
            alert("Could not generate image. Please try a screenshot!");
        }
    };

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-heading text-[var(--color-red)] text-center mb-4">Promotional Studio</h1>
            <p className="text-center opacity-60 mb-12">Create cute assets to share your Red Thread link on social media!</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* 1. Instagram Feed Post */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Instagram size={20} /> Feed Post</h2>
                        <Button size="sm" onClick={() => handleDownload(feedRef, 'red-thread-feed')}>Download</Button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl overflow-hidden flex justify-center">
                        <div ref={feedRef} className="w-[400px] h-[400px] bg-[var(--color-cream)] relative flex flex-col items-center justify-center text-center p-8 border-4 border-[var(--color-red)]/20">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] mix-blend-multiply" />
                            <div className="absolute top-4 right-4"><Heart className="text-[var(--color-pink)] animate-pulse" fill="currentColor" size={32} /></div>
                            <div className="absolute bottom-4 left-4"><Heart className="text-[var(--color-pink)] animate-pulse" fill="currentColor" size={24} /></div>

                            <h3 className="text-4xl font-heading text-[var(--color-red)] mb-2">Red Thread</h3>
                            <div className="w-16 h-1 bg-[var(--color-red)] mb-6 rounded-full opacity-50" />

                            <p className="text-xl font-serif italic text-gray-700 leading-relaxed mb-6">
                                "Send me an anonymous whisper...<br />
                                <span className="text-[var(--color-red)]">written from the heart.</span>"
                            </p>

                            <div className="bg-white/80 px-6 py-3 rounded-full border border-[var(--color-pink)] text-sm font-bold text-[var(--color-red)] shadow-sm">
                                Link in Bio 🔗
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Instagram Story */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Camera size={20} /> Story Background</h2>
                        <Button size="sm" onClick={() => handleDownload(storyRef, 'red-thread-story')}>Download</Button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl overflow-hidden flex justify-center">
                        <div ref={storyRef} className="w-[300px] h-[533px] bg-gradient-to-b from-[var(--color-cream)] to-pink-50 relative flex flex-col items-center pt-20 text-center p-6">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />

                            <div className="w-full border-b-2 border-dashed border-[var(--color-pink)]/50 absolute top-12" />
                            <div className="w-full border-b-2 border-dashed border-[var(--color-pink)]/50 absolute bottom-12" />

                            <h3 className="text-3xl font-heading text-[var(--color-red)] mb-8 bg-white/50 px-4 py-1 rounded-full">Ask Me Anything</h3>

                            {/* Sticker Placeholder Area */}
                            <div className="w-full aspect-[4/3] border-4 border-dashed border-[var(--color-pink)] rounded-2xl flex items-center justify-center bg-white/30 mb-8">
                                <span className="text-[var(--color-red)] opacity-30 font-bold text-sm uppercase tracking-widest text-center">
                                    Place "Ask Me" Sticker<br />Here
                                </span>
                            </div>

                            <p className="font-serif italic text-lg opacity-60 mb-8">
                                Or send a secret whisper via my link
                            </p>

                            <div className="mt-auto mb-12">
                                <Heart size={48} className="text-[var(--color-red)] animate-bounce-subtle mx-auto opacity-80" fill="currentColor" />
                                <p className="text-[10px] uppercase tracking-[0.2em] mt-2 opacity-40">Red Thread</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Guide */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Share2 size={20} /> How it Works</h2>
                        <Button size="sm" onClick={() => handleDownload(guideRef, 'red-thread-guide')}>Download</Button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl overflow-hidden flex justify-center">
                        <div ref={guideRef} className="w-[400px] h-[500px] bg-white relative flex flex-col p-8 border border-[var(--color-pink)]">
                            <h3 className="text-3xl font-heading text-[var(--color-red)] mb-8 text-center">How to Whisper</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-red)] text-white flex items-center justify-center font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text)]">Create your Inbox</h4>
                                        <p className="text-sm opacity-60">Get your unique link.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-pink)] text-white flex items-center justify-center font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text)]">Share the Link</h4>
                                        <p className="text-sm opacity-60">Post it on your story or bio.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-red)] text-white flex items-center justify-center font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-[var(--color-text)]">Read Secrets</h4>
                                        <p className="text-sm opacity-60">Receive anonymous messages from friends.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-dashed border-gray-200 text-center">
                                <p className="font-serif italic text-[var(--color-red)]">"Dare to be honest?"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. QR Frame */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Camera size={20} /> My QR Code</h2>
                        <Button size="sm" onClick={() => handleDownload(qrFrameRef, 'red-thread-qr-frame')}>Download</Button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl overflow-hidden flex justify-center">
                        <div ref={qrFrameRef} className="w-[350px] h-[500px] bg-[var(--color-red)] relative flex flex-col items-center justify-center p-2 rounded-2xl">
                            <div className="absolute inset-0 border-[8px] border-[var(--color-cream)] rounded-xl m-2 opacity-50 pointer-events-none" />

                            <div className="bg-[var(--color-cream)] w-full h-full rounded-lg flex flex-col items-center p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 w-full h-32 bg-[var(--color-pink)]/20 -skew-y-6 origin-top transform -translate-y-10" />

                                <h3 className="text-3xl font-heading text-[var(--color-red)] mb-2 relative z-10">Scan Me</h3>
                                <p className="text-xs uppercase tracking-widest opacity-50 mb-8 relative z-10">To send a whisper</p>

                                <div className="p-4 bg-white rounded-xl shadow-lg mb-6 relative z-10">
                                    {myInboxId ? (
                                        <QRCodeCanvas
                                            value={`${window.location.origin}/confessions?to=${myInboxId}`}
                                            size={160}
                                            bgColor={"#ffffff"}
                                            fgColor={"#D32F2F"}
                                            level={"H"}
                                            includeMargin={true}
                                        />
                                    ) : (
                                        <div className="w-[160px] h-[160px] bg-gray-100 flex items-center justify-center text-xs text-center text-gray-400">
                                            Create inbox to<br />see QR
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 justify-center text-[var(--color-red)] opacity-80">
                                    <Heart fill="currentColor" size={20} />
                                    <Heart fill="currentColor" size={20} />
                                    <Heart fill="currentColor" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Project Link QR */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold flex items-center gap-2"><Share2 size={20} /> Red Thread QR</h2>
                        <Button size="sm" onClick={() => handleDownload(projectQrRef, 'red-thread-qr')}>Download</Button>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl overflow-hidden flex justify-center">
                        <div ref={projectQrRef} className="w-[350px] h-[500px] bg-[var(--color-cream)] relative flex flex-col items-center justify-center p-2 rounded-2xl border-4 border-[var(--color-pink)]">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />

                            <div className="bg-white w-full h-full rounded-lg flex flex-col items-center p-8 text-center relative overflow-hidden shadow-inner">
                                <h3 className="text-3xl font-heading text-[var(--color-red)] mb-2 mt-8">Red Thread</h3>
                                <p className="text-sm italic opacity-60 mb-8">Send anonymous whispers</p>

                                <div className="p-4 bg-[var(--color-cream)] rounded-xl border-2 border-dashed border-[var(--color-red)] mb-6 relative z-10 transform rotate-2 hover:rotate-0 transition-transform">
                                    <QRCodeCanvas
                                        value="https://redthread.vercel.app/confessions"
                                        size={160}
                                        bgColor={"#FFFBF0"}
                                        fgColor={"#D32F2F"}
                                        level={"H"}
                                        includeMargin={true}
                                        imageSettings={{
                                            src: "/logo.png",
                                            x: undefined,
                                            y: undefined,
                                            height: 24,
                                            width: 24,
                                            excavate: true,
                                        }}
                                    />
                                </div>

                                <p className="text-[10px] font-bold tracking-widest text-[var(--color-red)] opacity-40 uppercase">
                                    redthread.vercel.app
                                </p>

                                <div className="absolute bottom-4 right-4 text-[var(--color-pink)] opacity-50">
                                    <Heart fill="currentColor" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Promotions;

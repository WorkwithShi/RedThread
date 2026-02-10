import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, MessageCircle, Gift, Info, BookHeart, Sparkles, X } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import Modal from './Modal';
import { playPopSound } from '../utils/audioEffects';

const Navbar = () => {
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <>
            <nav className="navbar">
                <NavLink to="/" className="nav-brand font-outfit tracking-[0.05em] uppercase font-bold text-lg">
                    <span className="text-[var(--color-red)]">Red</span>
                    <span className="opacity-60 ml-1">Thread</span>
                    <span className="text-[8px] opacity-10 absolute -bottom-1 left-0">v2.5</span>
                </NavLink>

                {/* Mobile top bar buttons */}
                <div className="flex items-center gap-2 md:hidden">
                    <AudioPlayer />
                    <button
                        onClick={() => setIsGuideOpen(!isGuideOpen)}
                        className={`p-2 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] transition-all z-[60] relative ${isGuideOpen ? 'bg-[var(--color-red)] text-white hover:bg-[var(--color-red)]/90' : 'bg-white/50 hover:bg-white'}`}
                        aria-label={isGuideOpen ? "Close Guide" : "App Guide"}
                    >
                        {isGuideOpen ? <X size={20} /> : <Info size={20} />}
                    </button>
                </div>

                {/* Desktop navigation - hidden on mobile */}
                <div className="nav-links hidden md:flex">
                    <NavLink to="/" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <Home className="nav-icon" size={24} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/love-card" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <Heart className="nav-icon" size={24} />
                        <span>Love Card</span>
                    </NavLink>
                    <NavLink to="/confessions" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <MessageCircle className="nav-icon" size={24} />
                        <span>Secrets</span>
                    </NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <Gift className="nav-icon" size={24} />
                        <span>Wishlist</span>
                    </NavLink>
                    <NavLink to="/compatibility" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <Heart className="nav-icon" size={24} fill="currentColor" />
                        <span>Match</span>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`}>
                        <BookHeart className="nav-icon" size={24} />
                        <span>Club</span>
                    </NavLink>

                    <div className="flex items-center gap-4 ml-4">
                        <button
                            onClick={() => setIsGuideOpen(!isGuideOpen)}
                            className={`p-2 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] transition-all z-[60] relative ${isGuideOpen ? 'bg-[var(--color-red)] text-white hover:bg-[var(--color-red)]/90' : 'bg-white/50 hover:bg-white'}`}
                            aria-label={isGuideOpen ? "Close Guide" : "App Guide"}
                        >
                            {isGuideOpen ? <X size={20} /> : <Info size={20} />}
                        </button>
                        <AudioPlayer />
                    </div>
                </div>
            </nav>

            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--color-pink)]/30 shadow-lg md:hidden z-[9999] safe-area-bottom">
                <div className="flex justify-around items-center px-1 py-2">
                    <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Home size={18} />
                        <span className="text-[9px] font-bold">Home</span>
                    </NavLink>
                    <NavLink to="/love-card" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Heart size={18} />
                        <span className="text-[9px] font-bold">Card</span>
                    </NavLink>
                    <NavLink to="/confessions" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <MessageCircle size={18} />
                        <span className="text-[9px] font-bold">Secrets</span>
                    </NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Gift size={18} />
                        <span className="text-[9px] font-bold">Wishlist</span>
                    </NavLink>
                    <NavLink to="/compatibility" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Heart size={18} fill="currentColor" />
                        <span className="text-[9px] font-bold">Match</span>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <BookHeart size={18} />
                        <span className="text-[9px] font-bold">Club</span>
                    </NavLink>
                </div>
            </div>

            {/* App Guide Modal */}
            <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} title="How to Use Red Thread">
                <div className="space-y-5 text-left">
                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-[var(--color-red-light)]/20 rounded-lg">
                            <Heart className="text-[var(--color-red)]" size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[var(--color-red)] mb-1">Love Card</h3>
                            <p className="text-sm opacity-80">Generate a personalized romantic card that reveals your love language, personality traits, and compatibility insights. Share it with friends or your crush!</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MessageCircle className="text-purple-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[var(--color-red)] mb-1">Secret Confessions</h3>
                            <p className="text-sm opacity-80">Send anonymous messages to anyone or create your own inbox to receive confessions. Perfect for sharing feelings without revealing your identity!</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <Gift className="text-pink-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[var(--color-red)] mb-1">Wishlist</h3>
                            <p className="text-sm opacity-80">Create and share your wishlist of gifts, experiences, or dreams. Let friends and loved ones know what would make you smile!</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Sparkles className="text-red-600" size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[var(--color-red)] mb-1">Destiny Match</h3>
                            <p className="text-sm opacity-80">Calculate the compatibility between two people and get a beautiful certificate to download or share on Instagram Stories!</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Navbar;

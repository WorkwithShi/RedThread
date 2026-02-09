import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, MessageCircle, Gift, Menu, X, Info } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import Modal from './Modal';
import { playPopSound } from '../utils/audioEffects';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const toggleMenu = () => {
        playPopSound();
        setIsOpen(!isOpen);
    };
    const closeMenu = () => {
        playPopSound();
        setIsOpen(false);
    };

    return (
        <>
            <nav className="navbar">
                <NavLink to="/" className="nav-brand font-outfit tracking-[0.05em] uppercase font-bold text-lg" onClick={closeMenu}>
                    <span className="text-[var(--color-red)]">Red</span>
                    <span className="opacity-60 ml-1">Thread</span>
                    <span className="text-[8px] opacity-10 absolute -bottom-1 left-0">v2.5</span>
                </NavLink>

                {/* Desktop hamburger menu - hidden on mobile */}
                <button className="mobile-toggle hidden md:block p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] hover:bg-white transition-all" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile top bar buttons */}
                <div className="flex items-center gap-2 md:hidden">
                    <AudioPlayer />
                    <button
                        onClick={() => setIsGuideOpen(true)}
                        className="p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] hover:bg-white transition-all"
                        aria-label="App Guide"
                    >
                        <Info size={20} />
                    </button>
                </div>

                <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <Home className="nav-icon" size={24} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/love-card" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <Heart className="nav-icon" size={24} />
                        <span>Love Card</span>
                    </NavLink>
                    <NavLink to="/confessions" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <MessageCircle className="nav-icon" size={24} />
                        <span>Secrets</span>
                    </NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <Gift className="nav-icon" size={24} />
                        <span>Wishlist</span>
                    </NavLink>
                    <NavLink to="/compatibility" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <Heart className="nav-icon" size={24} fill="currentColor" />
                        <span>Match</span>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => `nav-link icon-heartbeat ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <Info className="nav-icon" size={24} />
                        <span>Club</span>
                    </NavLink>

                    <div className="flex items-center gap-4 ml-4">
                        <AudioPlayer />
                    </div>
                </div>

                {/* Overlay for mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 z-1000 md:hidden"
                        onClick={closeMenu}
                        style={{ zIndex: 1000 }}
                    />
                )}
            </nav>

            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[var(--color-pink)]/30 shadow-lg md:hidden z-[9999] safe-area-bottom">
                <div className="flex justify-around items-center px-2 py-2">
                    <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Home size={20} />
                        <span className="text-[10px] font-bold">Home</span>
                    </NavLink>
                    <NavLink to="/love-card" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Heart size={20} />
                        <span className="text-[10px] font-bold">Card</span>
                    </NavLink>
                    <NavLink to="/confessions" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <MessageCircle size={20} />
                        <span className="text-[10px] font-bold">Secrets</span>
                    </NavLink>
                    <NavLink to="/wishlist" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Gift size={20} />
                        <span className="text-[10px] font-bold">Wishlist</span>
                    </NavLink>
                    <NavLink to="/compatibility" className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${isActive ? 'text-[var(--color-red)] bg-[var(--color-red-light)]/20' : 'text-gray-600'}`} onClick={() => playPopSound()}>
                        <Heart size={20} fill="currentColor" />
                        <span className="text-[10px] font-bold">Match</span>
                    </NavLink>
                </div>
            </div>

            {/* App Guide Modal */}
            <Modal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} title="How to Use Red Thread">
                <div className="space-y-4 text-left">
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">🏠 Home</h3>
                        <p className="text-sm opacity-80">Your starting point. Quick access to all features.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">💌 Love Card</h3>
                        <p className="text-sm opacity-80">Generate a personalized love card based on your personality.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">🤫 Secrets</h3>
                        <p className="text-sm opacity-80">Send and receive anonymous confessions. Create your inbox to get started!</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">🎁 Wishlist</h3>
                        <p className="text-sm opacity-80">Create a wishlist of things you'd love to receive. Share it with friends!</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">❤️ Match</h3>
                        <p className="text-sm opacity-80">Calculate compatibility between two people and download a certificate!</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--color-red)] mb-2">📱 Navigation</h3>
                        <p className="text-sm opacity-80">Use the bottom bar on mobile to quickly switch between features.</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Navbar;

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, MessageCircle, Gift, Menu, X, Info } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { playPopSound } from '../utils/audioEffects';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

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

                <button className="mobile-toggle md:hidden p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] hover:bg-white transition-all" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

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
        </>
    );
};

export default Navbar;

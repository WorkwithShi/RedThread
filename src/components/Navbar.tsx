import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, MessageCircle, Gift, Menu, X } from 'lucide-react';
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
        <nav className="navbar">
            <NavLink to="/" className="nav-brand font-outfit tracking-[0.05em] uppercase font-bold text-lg" onClick={closeMenu}>
                <span className="text-[var(--color-red)]">Red</span>
                <span className="opacity-60 ml-1">Thread</span>
            </NavLink>

            <button className="mobile-toggle p-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm border border-[var(--color-pink)]/20 text-[var(--color-red)] hover:bg-white transition-all" onClick={toggleMenu}>
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
    );
};

export default Navbar;

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
            <NavLink to="/" className="nav-brand" onClick={closeMenu}>
                Red Thread
            </NavLink>

            <button className="mobile-toggle text-[var(--color-red)]" onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
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

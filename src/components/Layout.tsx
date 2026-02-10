import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import HeartParticles from './HeartParticles';
import HeartBurst from './HeartBurst';
import '../styles/animations.css';

const Layout = () => {
    return (
        <div className="layout-wrapper min-h-screen flex flex-col relative overflow-hidden">
            <HeartParticles />
            <HeartBurst />
            {/* Decorative Red Thread Background */}
            <svg className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
                <path
                    className="path-thread path-thread-animated"
                    d="M0,50 C150,150 300,0 450,100 C600,200 750,50 900,150 C1050,250 1200,100 1350,200"
                    fill="none"
                    stroke="var(--color-thread)"
                    strokeWidth="2"
                />
                <path
                    className="path-thread path-thread-animated"
                    d="M0,300 C200,400 400,200 600,350 C800,500 1000,250 1200,400"
                    fill="none"
                    stroke="var(--color-thread)"
                    strokeWidth="1"
                    style={{ animationDelay: '1s', opacity: 0.5, animationDirection: 'reverse', animationDuration: '45s' }}
                />
            </svg>

            <Navbar />

            <main className="container mx-auto flex-grow relative z-10 animate-fade-in">
                <Outlet />
            </main>

            <footer className="mt-auto py-12 px-6 border-t border-[var(--color-pink)]/30 bg-white/40 backdrop-blur-md relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
                    {/* Club Branding */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-heading text-[var(--color-red)]">Expressions</h2>
                        <p className="text-sm tracking-widest uppercase opacity-60">The Literary Club of UIT</p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-8">
                        <a
                            href="https://www.instagram.com/uitliteraryclub?igsh=bDhtc3B3dTd0Mnlv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-text)] hover:text-[var(--color-red)] transition-all transform hover:scale-110"
                            aria-label="Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/literary-club-uit/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-text)] hover:text-[var(--color-red)] transition-all transform hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                        </a>
                    </div>

                    {/* Navigation/Footer Links */}
                    <div className="flex gap-6 text-xs uppercase tracking-tighter opacity-50 font-bold">
                        <a href="/policy" className="hover:text-[var(--color-red)] transition-colors">Privacy & Politeness</a>
                        <span className="opacity-20">|</span>
                        <span className="italic">Bound by Fate, Woven in Words</span>
                    </div>

                    <div className="text-[10px] opacity-40 uppercase tracking-widest pt-4">
                        © {new Date().getFullYear()} Red Thread Whispers • UIT Literary Club
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;

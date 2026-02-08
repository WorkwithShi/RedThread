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

            <main className="container flex-grow relative z-10 animate-fade-in">
                <Outlet />
            </main>

            <footer className="py-6 text-center text-sm text-[var(--color-red)] opacity-60">
                <p>Made with ❤️ for Valentine's Day</p>
            </footer>
        </div>
    );
};

export default Layout;

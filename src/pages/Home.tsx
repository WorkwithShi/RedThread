import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useUser } from '../context/UserContext';
import { Heart, ChevronRight, MessageCircle, Gift } from 'lucide-react';
import '../styles/animations.css';

const Home = () => {
    const navigate = useNavigate();
    const { user, login } = useUser();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (user) {
            setStep(3); // Already logged in
        }
    }, [user]);

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && gender) {
            login(name, gender);
            setStep(3);
        }
    };



    if (step === 3) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8 animate-fade-in px-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-red)] drop-shadow-sm">
                    Welcome back, {user?.name}
                </h1>
                <p className="text-base md:text-lg text-[var(--color-text)] max-w-lg italic opacity-80">
                    "Every thread has two ends, but only one destiny."
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-3xl">
                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-[var(--color-red-light)] hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/love-card')}>
                        <Heart className="w-10 h-10 text-[var(--color-red)] mb-2 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-sm font-semibold">Love Card</h3>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-[var(--color-red-light)] hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/confessions')}>
                        <MessageCircle className="w-10 h-10 text-[var(--color-red)] mb-2 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-sm font-semibold">Secrets</h3>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-[var(--color-red-light)] hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/wishlist')}>
                        <Gift className="w-10 h-10 text-[var(--color-red)] mb-2 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-sm font-semibold">Wishlist</h3>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-[var(--color-red-light)] hover:shadow-lg transition-all cursor-pointer group" onClick={() => navigate('/compatibility')}>
                        <Heart className="w-10 h-10 text-[var(--color-red)] mb-2 mx-auto group-hover:scale-110 transition-transform" fill="currentColor" />
                        <h3 className="text-sm font-semibold">Match</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 animate-fade-in px-4">
            <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-red)] mb-2">
                    The Red Thread
                </h1>
                <p className="text-base md:text-lg text-[var(--color-text)] opacity-80">
                    Where destiny weaves hearts together.
                </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] w-full max-w-md border border-white/50">
                <h2 className="text-2xl mb-6 font-semibold text-[var(--color-text)]">Who are you?</h2>

                <form onSubmit={handleStart} className="flex flex-col gap-5">
                    <div className="text-left">
                        <label className="block text-sm font-medium mb-2 opacity-70">Your Name (or Nickname)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-[var(--radius-lg)] border border-[var(--color-pink)] focus:outline-none focus:ring-2 focus:ring-[var(--color-red)] bg-white/50 transition-all"
                            placeholder="e.g. Secret Admirer"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium mb-2 opacity-70">Gender</label>
                        <div className="flex gap-3">
                            {['Male', 'Female', 'Other'].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-2 px-3 rounded-[var(--radius-lg)] border transition-all text-sm ${gender === g ? 'bg-[var(--color-red)] text-white border-[var(--color-red)] shadow-md' : 'bg-white border-[var(--color-pink)] text-[var(--color-text)] hover:bg-[var(--color-pink)] hover:text-white'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="mt-2 w-full group btn-big-burst">
                        Start Your Journey
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useUser } from '../context/UserContext';
import { Heart, User, ChevronRight } from 'lucide-react';
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
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8 animate-fade-in">
                <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-red)] animate-pulse drop-shadow-sm">
                    Welcome back, {user?.name}
                </h1>
                <p className="text-xl md:text-2xl text-[var(--color-text)] max-w-lg italic">
                    "Every thread has two ends, but only one destiny."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-2xl px-4">
                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-red-light)] hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/love-card')}>
                        <Heart className="w-12 h-12 text-[var(--color-red)] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-semibold mb-2">My Love Card</h3>
                        <p className="text-sm opacity-80">Discover your romantic persona.</p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-[var(--radius-xl)] shadow-lg border border-[var(--color-red-light)] hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/confessions')}>
                        <User className="w-12 h-12 text-[var(--color-pink)] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                        <h3 className="text-2xl font-semibold mb-2">Secret Confessions</h3>
                        <p className="text-sm opacity-80">Send and receive anonymous notes.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 animate-fade-in px-4">
            <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-red)] mb-2 animate-pulse">
                    The Red Thread
                </h1>
                <p className="text-lg md:text-xl text-[var(--color-text)] opacity-80">
                    Where destiny weaves hearts together.
                </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] w-full max-w-md border border-white/50">
                <h2 className="text-3xl mb-6 font-semibold text-[var(--color-text)]">Who are you?</h2>

                <form onSubmit={handleStart} className="flex flex-col gap-6">
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
                        <div className="flex gap-4">
                            {['Male', 'Female', 'Other'].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-2 px-4 rounded-[var(--radius-lg)] border transition-all ${gender === g ? 'bg-[var(--color-red)] text-white border-[var(--color-red)] shadow-md' : 'bg-white border-[var(--color-pink)] text-[var(--color-text)] hover:bg-[var(--color-pink)] hover:text-white'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" size="lg" className="mt-4 w-full group btn-big-burst">
                        Start Your Journey
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Home;

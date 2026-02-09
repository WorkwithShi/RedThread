import { Heart, Instagram, Linkedin, Quote, Users, Sparkles } from 'lucide-react';
import '../styles/animations.css';

const About = () => {
    return (
        <div className="min-h-[80vh] py-12 px-4 animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--color-pink)]/10 rounded-full blur-3xl -z-10" />
                <h1 className="text-6xl font-heading text-[var(--color-red)] mb-4 drop-shadow-sm">Expressions</h1>
                <p className="text-lg tracking-[0.2em] uppercase opacity-60 font-medium">The Literary Club of UIT</p>
                <div className="mt-6 flex justify-center gap-2">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[var(--color-red)]/40 rounded-full" />
                    <Heart size={16} className="text-[var(--color-red)] animate-pulse" fill="currentColor" />
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[var(--color-red)]/40 rounded-full" />
                </div>
            </div>

            <div className="grid gap-12">
                {/* Hero Section */}
                <section className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-pink)]/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-[var(--color-red)] transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Quote size={120} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-heading text-[var(--color-red)] mb-6 flex items-center gap-3">
                            <Sparkles className="text-[var(--color-pink)]" /> Woven in Words
                        </h2>
                        <p className="text-xl font-serif italic text-gray-700 leading-relaxed mb-8">
                            "Expressions is not just a club; it's the creative heartbeat of UIT. We believe that every soul has a story, and every story deserves a thread to bind it to the world."
                        </p>
                        <div className="space-y-4 opacity-80 leading-loose">
                            <p>
                                Founded on the belief that literature is the ultimate bridge between hearts, we provide a sanctuary for poets, storytellers, and dreamers to express the inexpressible.
                            </p>
                            <p>
                                From secret whispers to grand proclamations of love, we curate experiences that celebrate the delicate balance between fate and creativity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-[var(--color-pink)]/20 hover:bg-white/60 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 mb-6 shadow-sm">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Our Community</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            A diverse family of creative minds bound by a shared passion for the written word and the magic of storytelling.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-[var(--color-pink)]/20 hover:bg-white/60 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Our Vision</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            To weave a global tapestry where anonymity meets intimacy, allowing true expressions to flow freely through the red thread.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-[var(--color-pink)]/20 hover:bg-white/60 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6 shadow-sm">
                            <Sparkles size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Our Events</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            From slam poetry nights to creative writing workshops, we create spaces for spirits to collide and create.
                        </p>
                    </div>

                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-[var(--color-pink)]/20 hover:bg-white/60 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-6 shadow-sm">
                            <Quote size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Our Journal</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            A curated collection of the finest expressions from our community, preserved forever in our seasonal publications.
                        </p>
                    </div>
                </div>

                {/* Connect Section */}
                <section className="text-center py-12">
                    <h3 className="text-2xl font-bold text-[var(--color-red)] mb-8">Join the Circle</h3>
                    <div className="flex justify-center gap-6">
                        <a
                            href="https://www.instagram.com/uitliteraryclub?igsh=bDhtc3B3dTd0Mnlv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-3xl border border-[var(--color-pink)] text-[#E4405F] hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group"
                        >
                            <Instagram size={32} />
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Instagram</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/literary-club-uit/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-3xl border border-[var(--color-pink)] text-[#0A66C2] hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center gap-2 group"
                        >
                            <Linkedin size={32} />
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                        </a>
                    </div>
                    <p className="mt-12 text-xs opacity-40 italic">
                        Expressions • Bound by Fate • Woven in Words
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;

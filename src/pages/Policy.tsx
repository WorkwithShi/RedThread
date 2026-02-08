import { Shield, Users, Heart, MessageCircle } from 'lucide-react';

const Policy = () => {
    return (
        <div className="max-w-3xl mx-auto p-8 animate-fade-in space-y-12 pb-20">
            <header className="text-center space-y-4">
                <h1 className="text-5xl font-heading text-[var(--color-red)]">Politeness & Privacy</h1>
                <p className="opacity-70 italic font-serif text-lg">"Love is woven with respect and bound by trust."</p>
            </header>

            <section className="bg-white/50 backdrop-blur-sm p-8 rounded-[var(--radius-xl)] border border-[var(--color-pink)] space-y-8">
                <div className="flex gap-4">
                    <div className="bg-[var(--color-red-light)] p-3 rounded-full h-fit">
                        <Users className="text-[var(--color-red)]" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Respectfulness & Community</h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            Expressions, the Literary Club of UIT, believes in the power of words to heal and connect.
                            While this platform offers anonymity, it is not a shield for harm. We ask every user to
                            treat each "Whisper" with kindness and respect. Harassment, hate speech, or bullying
                            will not be tolerated and may result in content removal.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[var(--color-red-light)] p-3 rounded-full h-fit">
                        <Shield className="text-[var(--color-red)]" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Anonymity & Privacy</h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            Your secrets are yours alone until you choose to share them. We do not track personal
                            identities or sell your data. Our goal is to create a safe space for artistic and romantic
                            expression.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-[var(--color-red-light)] p-3 rounded-full h-fit">
                        <Heart className="text-[var(--color-red)]" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">The Red Thread Spirit</h2>
                        <p className="text-[var(--color-text)] leading-relaxed">
                            This project is a labor of love by the Literary Club. Let's keep the thread golden,
                            not tangled in malice. Share love, not hate.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="text-center">
                <div className="inline-flex items-center gap-2 text-[var(--color-red)] opacity-60">
                    <MessageCircle size={20} />
                    <span className="font-heading text-xl">Expressions • UIT</span>
                </div>
            </footer>
        </div>
    );
};

export default Policy;

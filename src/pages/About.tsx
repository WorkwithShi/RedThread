import { Instagram, Linkedin, Quote, Users, Sparkles, BookOpen, Calendar } from 'lucide-react';
import '../styles/animations.css';

const About = () => {
    const testimonials = [
        {
            quote: "Red Thread gave me the courage to share my poetry. The anonymous confessions feature helped me express feelings I never could before.",
            name: "Ananya S.",
            role: "2nd Year, CSE"
        },
        {
            quote: "The love card feature is genius! It helped me understand my own love language and share it with someone special.",
            name: "Rohan M.",
            role: "3rd Year, ECE"
        },
        {
            quote: "Expressions isn't just a club, it's a family. The events are always so creative and bring out the best in everyone.",
            name: "Priya K.",
            role: "1st Year, IT"
        }
    ];

    const events = [
        { title: "Poetry Slam Night", date: "Dec 2025", color: "from-pink-400 to-red-400" },
        { title: "Valentine's Special", date: "Feb 2026", color: "from-red-400 to-pink-500" },
        { title: "Creative Writing Workshop", date: "Jan 2026", color: "from-purple-400 to-pink-400" },
        { title: "Open Mic Sessions", date: "Nov 2025", color: "from-pink-500 to-red-500" }
    ];

    return (
        <div className="min-h-[80vh] py-12 px-4 animate-fade-in max-w-5xl mx-auto">
            <div className="text-center mb-16 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[var(--color-pink)]/10 rounded-full blur-3xl -z-10" />
                <h1 className="text-4xl md:text-6xl font-heading text-[var(--color-red)] mb-4 drop-shadow-sm">Expressions</h1>
                <p className="text-lg tracking-[0.2em] uppercase opacity-60 font-medium">The Literary Club of UIT</p>
                <div className="mt-6 flex justify-center gap-2">
                    <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[var(--color-red)]/40 rounded-full" />
                    <Sparkles size={16} className="text-[var(--color-red)] animate-pulse" />
                    <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[var(--color-red)]/40 rounded-full" />
                </div>
            </div>

            <div className="grid gap-12">
                {/* Hero Section - Woven in Words */}
                <section className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-pink)]/30 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 text-[var(--color-red)] transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                        <Quote size={120} />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-red)] mb-6">
                            Woven in Words
                        </h2>
                        <p className="text-xl md:text-2xl font-serif font-bold italic text-gray-800 leading-relaxed mb-8">
                            "Expressions is not just a club; it's the creative heartbeat of UIT. We believe that every soul has a story, and every story deserves a thread to bind it to the world."
                        </p>
                        <div className="space-y-4 opacity-80 leading-loose text-base">
                            <p>
                                Founded on the belief that literature is the ultimate bridge between hearts, we provide a sanctuary for poets, storytellers, and dreamers to express the inexpressible.
                            </p>
                            <p>
                                From secret whispers to grand proclamations of love, we curate experiences that celebrate the delicate balance between fate and creativity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Red Thread Theory Section */}
                <section className="bg-gradient-to-br from-red-50 to-pink-50 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-red)]/20 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-heading text-[var(--color-red)]">The Red Thread of Fate</h2>
                    </div>

                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="text-lg font-medium">
                            An ancient East Asian belief that transcends time and space.
                        </p>
                        <p>
                            According to Chinese and Japanese mythology, the gods tie an invisible red thread around the ankles (or fingers) of those who are destined to meet, help each other, or be together. This thread may stretch or tangle, but it will never break.
                        </p>
                        <p>
                            The legend teaches us that our connections are not mere coincidences—they are threads woven by fate itself. No matter the distance, time, or circumstances, those meant to cross paths will find their way to each other.
                        </p>
                        <div className="bg-white/60 p-6 rounded-2xl border border-[var(--color-red)]/10 mt-6">
                            <p className="italic text-[var(--color-red)] font-medium">
                                "An invisible red thread connects those who are destined to meet, regardless of time, place, or circumstance. The thread may stretch or tangle, but will never break."
                            </p>
                            <p className="text-sm opacity-60 mt-2">— Ancient Chinese Proverb</p>
                        </div>
                    </div>
                </section>

                {/* Project Description */}
                <section className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[var(--color-pink)]/30 shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-heading text-[var(--color-red)] mb-6">Our Project: Red Thread</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="text-lg">
                            Red Thread is more than just a web platform—it's a digital manifestation of the ancient legend, connecting hearts through modern expressions.
                        </p>
                        <p>
                            We've created a space where students can explore their emotions, share their stories, and discover connections through:
                        </p>
                        <ul className="space-y-3 ml-6">
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-red)] mt-1">•</span>
                                <span><strong>Love Cards</strong> that reveal your unique love language and personality</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-red)] mt-1">•</span>
                                <span><strong>Anonymous Confessions</strong> for sharing feelings without fear</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-red)] mt-1">•</span>
                                <span><strong>Wishlists</strong> to express dreams and desires</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[var(--color-red)] mt-1">•</span>
                                <span><strong>Destiny Match</strong> to explore compatibility and connections</span>
                            </li>
                        </ul>
                        <p className="pt-4">
                            Our mission is to weave a tapestry of genuine human connections, where anonymity meets intimacy, and every expression finds its thread.
                        </p>
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

                    <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[2rem] border border-[var(--color-pink)]/20 hover:bg-white/60 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">Our Vision</h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            To weave a global tapestry where anonymity meets intimacy, allowing true expressions to flow freely through the red thread.
                        </p>
                    </div>
                </div>

                {/* Event Posters Section */}
                <section className="py-8">
                    <div className="text-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center text-red-600 shadow-sm">
                                <Calendar size={24} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-heading text-[var(--color-red)]">Our Events</h2>
                        </div>
                        <p className="text-sm opacity-60">Moments that brought us together</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                                    <div className="text-xs font-bold uppercase tracking-wider opacity-80">{event.date}</div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold leading-tight mb-2">{event.title}</h3>
                                        <div className="w-12 h-1 bg-white/50 rounded-full" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-heading text-[var(--color-red)] mb-4">Voices from the Thread</h2>
                        <p className="text-sm opacity-60">What our community says</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-[var(--color-pink)]/30 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <Quote size={24} className="text-[var(--color-red)]/30 mb-4" />
                                <p className="text-sm italic text-gray-700 leading-relaxed mb-4">
                                    "{testimonial.quote}"
                                </p>
                                <div className="border-t border-[var(--color-pink)]/20 pt-4">
                                    <p className="font-bold text-[var(--color-red)] text-sm">{testimonial.name}</p>
                                    <p className="text-xs opacity-60">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

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

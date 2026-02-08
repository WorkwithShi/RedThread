import { useState } from 'react';
import { useUser } from '../context/UserContext';
import Button from '../components/Button';
import { Heart, Star, Moon, Sun, Cloud, Music, Coffee, Book } from 'lucide-react';
import '../styles/animations.css';

interface Option {
    text: string;
    icon?: React.ReactNode;
    type: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "Where would you most like to meet your soulmate?",
        options: [
            { text: "In a quiet, dusty library", icon: <Book size={20} />, type: "Intellectual" },
            { text: "At a bustling coffee shop", icon: <Coffee size={20} />, type: "Social" },
            { text: "Under the stars", icon: <Moon size={20} />, type: "Romantic" },
            { text: "At a lively music festival", icon: <Music size={20} />, type: "Adventurous" }
        ]
    },
    {
        id: 2,
        text: "What describes your ideal date?",
        options: [
            { text: "Deep conversation over dinner", type: "Social" },
            { text: "An exciting road trip", type: "Adventurous" },
            { text: "Picnic in a flower field", type: "Romantic" },
            { text: "Visiting a museum", type: "Intellectual" }
        ]
    },
    {
        id: 3,
        text: "Pick a symbol that calls to you.",
        options: [
            { text: "The Sun (Warmth)", icon: <Sun size={20} />, type: "Social" },
            { text: "The Moon (Mystery)", icon: <Moon size={20} />, type: "Intellectual" },
            { text: "The Cloud (Dreams)", icon: <Cloud size={20} />, type: "Romantic" },
            { text: "The Star (Guide)", icon: <Star size={20} />, type: "Adventurous" }
        ]
    },
    {
        id: 4,
        text: "What is your love language?",
        options: [
            { text: "Words of Affirmation", type: "Romantic" },
            { text: "Quality Time", type: "Social" },
            { text: "Acts of Service", type: "Intellectual" },
            { text: "Physical Touch", type: "Adventurous" }
        ]
    },
    {
        id: 5,
        text: "How do you handle conflict?",
        options: [
            { text: "Discuss it calmly right away", type: "Intellectual" },
            { text: "Give it space then reconnect", type: "Social" },
            { text: "Make a romantic gesture", type: "Romantic" },
            { text: "Go for a run/drive to clear head", type: "Adventurous" }
        ]
    },
    {
        id: 6,
        text: "Which season reflects your heart?",
        options: [
            { text: "Spring (New Beginnings)", type: "Social" },
            { text: "Summer (Passion)", type: "Adventurous" },
            { text: "Autumn (Reflection)", type: "Intellectual" },
            { text: "Winter (Intimacy)", type: "Romantic" }
        ]
    },
    {
        id: 7,
        text: "What gift do you prefer?",
        options: [
            { text: "A handwritten letter", type: "Romantic" },
            { text: "A thoughtful book", type: "Intellectual" },
            { text: "A fun experience ticket", type: "Adventurous" },
            { text: "Something useful/needed", type: "Social" }
        ]
    },
    {
        id: 8,
        text: "Which genre of movie?",
        options: [
            { text: "Rom-Com", type: "Romantic" },
            { text: "Documentary", type: "Intellectual" },
            { text: "Action/Adventure", type: "Adventurous" },
            { text: "Drama", type: "Social" }
        ]
    },
    {
        id: 9,
        text: "What attracts you first?",
        options: [
            { text: "Smile and eyes", type: "Romantic" },
            { text: "Wit and intelligence", type: "Intellectual" },
            { text: "Energy and vibe", type: "Adventurous" },
            { text: "Kindness and manners", type: "Social" }
        ]
    },
    {
        id: 10,
        text: "Your dream home is...",
        options: [
            { text: "A cozy cottage", type: "Romantic" },
            { text: "A modern city apartment", type: "Social" },
            { text: "A cabin in the woods", type: "Adventurous" },
            { text: "A historic townhouse", type: "Intellectual" }
        ]
    }
];

const nicknames = [
    { char: '月', pinyin: 'Yuè', meaning: 'Moon' },
    { char: '爱', pinyin: 'Ài', meaning: 'Love' },
    { char: '云', pinyin: 'Yún', meaning: 'Cloud' },
    { char: '星', pinyin: 'Xīng', meaning: 'Star' },
    { char: '花', pinyin: 'Huā', meaning: 'Flower' },
    { char: '心', pinyin: 'Xīn', meaning: 'Heart' },
    { char: '梦', pinyin: 'Mèng', meaning: 'Dream' },
    { char: '灵', pinyin: 'Líng', meaning: 'Spirit' },
    { char: '美', pinyin: 'Měi', meaning: 'Beautiful' },
    { char: '福', pinyin: 'Fú', meaning: 'Fortune' }
];

const getChineseNickname = (name: string) => {
    // Simple deterministic random based on name length or char codes
    const index = name.length % nicknames.length;
    return nicknames[index];
};

const LoveId = () => {
    const { user } = useUser();
    const [step, setStep] = useState(0); // 0: Start, 1-N: Questions, N+1: Result
    const [answers, setAnswers] = useState<string[]>([]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6">
                <h2 className="text-3xl">Please create your profile first.</h2>
                <Button onClick={() => window.location.href = '/'}>Go Home</Button>
            </div>
        );
    }

    const handleAnswer = (type: string) => {
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);
        if (step < questions.length) {
            setStep(step + 1);
        } else {
            setStep(step + 1); // Show result
        }
    };

    const getPersona = () => {
        // Determine most frequent type
        const counts: Record<string, number> = {};
        answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sorted[0]?.[0] || "Mystery";
    };

    const getQuote = (type: string) => {
        const quotes: Record<string, { cn: string, en: string }> = {
            "Romantic": { cn: "愿得一心人，白头不相离", en: "Wish for one heart, never to be apart till white hair." },
            "Social": { cn: "海内存知己，天涯若比邻", en: "A bosom friend afar brings a distant land near." },
            "Adventurous": { cn: "读万卷书，行万里路", en: "Read ten thousand books, travel ten thousand miles." },
            "Intellectual": { cn: "学而不思则罔，思而不学则殆", en: "Learning without thought is lost; thought without learning is perilous." },
            "Mystery": { cn: "花开堪折直须折", en: "Gather ye rosebuds while ye may." }
        };
        return quotes[type] || quotes["Mystery"];
    };

    const nickname = getChineseNickname(user.name);
    const persona = getPersona();
    const quote = getQuote(persona);

    if (step === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8 animate-fade-in p-4">
                <h1 className="text-5xl font-heading text-[var(--color-red)]">Reveal Your Love Persona</h1>
                <p className="max-w-md text-lg opacity-80">Answer 10 simple questions to discover your romantic archetype and receive your Yuanfen (Destiny) nickname.</p>
                <Button size="lg" onClick={() => setStep(1)}>Begin Quiz</Button>
            </div>
        );
    }

    if (step <= questions.length) {
        const q = questions[step - 1];
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-fade-in p-4 max-w-2xl mx-auto">
                <div className="w-full bg-[var(--color-red-light)] h-2 rounded-full mb-4">
                    <div className="bg-[var(--color-red)] h-2 rounded-full transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }}></div>
                </div>

                <h2 className="text-3xl md:text-4xl text-center font-serif text-[var(--color-red)]">{q.text}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt.type)}
                            className="flex items-center gap-4 p-6 bg-white/60 hover:bg-white border border-transparent hover:border-[var(--color-pink)] rounded-[var(--radius-xl)] shadow-sm hover:shadow-md transition-all text-left group"
                        >
                            <div className="text-[var(--color-red)] group-hover:scale-110 transition-transform">{opt.icon || <Heart size={20} />}</div>
                            <span className="text-lg font-medium">{opt.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 animate-fade-in p-4">
            <h1 className="text-5xl font-heading text-[var(--color-red)]">Your Love Card</h1>

            <div className="relative bg-[#FFFBF0] p-8 md:p-12 rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] border-4 border-[var(--color-red)] max-w-md w-full text-center overflow-hidden">
                {/* Decorative corner stamps */}
                <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-[var(--color-red)] rounded-br-[var(--radius-lg)]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-[var(--color-red)] rounded-tl-[var(--radius-lg)]" />

                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-[var(--color-red-light)] rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-[var(--color-red)] text-[var(--color-red)]">
                        {nickname.char}
                    </div>
                    <h2 className="text-3xl font-bold text-[var(--color-text)]">{user.name}</h2>
                    <p className="text-[var(--color-red)] font-heading text-2xl mt-1">{nickname.pinyin} ({nickname.meaning})</p>
                </div>

                <div className="border-t border-b border-[var(--color-pink)] py-8 my-6 flex flex-col items-center">
                    <p className="uppercase tracking-[0.2em] text-[10px] opacity-50 mb-4">Destiny Alignment</p>
                    <h3 className="text-3xl font-heading text-[var(--color-red)] mb-6 tracking-wide">{persona} Soul</h3>

                    <div className="w-full bg-[#faecd7] p-6 rounded-lg relative">
                        <span className="absolute -top-3 left-6 text-4xl text-[var(--color-red)] opacity-20 font-serif">"</span>
                        <p className="text-2xl font-serif text-[var(--color-red)] mb-3 leading-relaxed tracking-widest text-center">{quote.cn}</p>
                        <p className="text-[11px] opacity-60 italic font-mono tracking-tight text-center border-t border-[var(--color-red)]/10 pt-3">{quote.en}</p>
                        <span className="absolute -bottom-6 right-6 text-4xl text-[var(--color-red)] opacity-20 font-serif">"</span>
                    </div>
                </div>

                <div className="flex justify-between text-sm opacity-70">
                    <span>ID: #{user.id}</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex gap-4">
                <Button onClick={() => window.print()}>Save Card</Button>
                <Button variant="outline" onClick={() => { setStep(0); setAnswers([]); }}>Retake Quiz</Button>
            </div>
        </div>
    );
};

export default LoveId;

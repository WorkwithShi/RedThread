import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AlertCircle, MessageCircle, Copy, Check, Loader2, Download, Heart, Trash2, Gift, ExternalLink } from 'lucide-react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import '../styles/animations.css';

interface Message {
    id: string;
    content: string;
    sender_gender: string;
    sender_name: string;
    created_at: string;
}

const utf8tob64 = (str: string) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
const b64toutf8 = (str: string) => {
    try {
        return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    } catch (e) {
        return atob(str);
    }
};

const CHINESE_SAYINGS = [
    "千里姻缘一线牵 (A thousand miles apart, linked by a red thread)",
    "执子之手，与子偕老 (To hold your hand and grow old together)",
    "心有灵犀一点通 (Hearts are linked by a common beat)",
    "海内存知己，天涯若比邻 (Soulmates are close, even at the end of the world)",
    "众里寻他千百度 (Searching for the one in a thousand crowds)",
    "愿得一心人，白头不相离 (To win one heart, never to part until gray hair)"
];

const Confess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const [saying] = useState(() => CHINESE_SAYINGS[Math.floor(Math.random() * CHINESE_SAYINGS.length)]);

    const [activeTab, setActiveTab] = useState<'inbox' | 'write'>('inbox');
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderGender, setSenderGender] = useState('Secret');
    const [targetName, setTargetName] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [receivedSecret, setReceivedSecret] = useState<any>(null);
    const [targetWishlist, setTargetWishlist] = useState<any[]>([]);
    const [targetOwnerName, setTargetOwnerName] = useState('');

    // Core IDs
    const [myInboxId, setMyInboxId] = useState<string | null>(localStorage.getItem('red_thread_recipient_id'));
    const [myUserGender, setMyUserGender] = useState<string | null>(localStorage.getItem('red_thread_user_gender'));
    const [targetRecipientId, setTargetRecipientId] = useState<string | null>(null);

    // Modal states
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [tempName, setTempName] = useState('');

    useEffect(() => {
        const toParam = searchParams.get('to');
        const secretParam = searchParams.get('secret');

        if (toParam) {
            setTargetRecipientId(toParam);
            setActiveTab('write');
            try { setRecipientName(b64toutf8(toParam)); } catch { setRecipientName(toParam); }
            fetchTargetWishlist(toParam);
        } else if (secretParam) {
            handleIncomingSecret(secretParam);
        } else {
            setTargetRecipientId(null);
            setTargetWishlist([]);
        }
    }, [searchParams]);

    const fetchTargetWishlist = async (id: string) => {
        console.log("Fetching wishlist for recipient:", id);
        const { data, error } = await supabase
            .from('wishlists')
            .select('*')
            .eq('recipient_id', id)
            .single();

        if (error) {
            console.log("Wishlist fetch note:", error.message);
            // It's okay if it doesn't exist, we just show emptiness later
            setTargetWishlist([]);
            return;
        }

        if (data) {
            console.log("Wishlist found:", data.items?.length || 0, "items");
            setTargetWishlist(data.items || []);
            setTargetOwnerName(data.user_name);
        } else {
            console.log("No wishlist found for this user.");
            setTargetWishlist([]);
        }
    };

    useEffect(() => {
        if (!myInboxId || activeTab !== 'inbox') return;
        const fetchMessages = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('confessions').select('*').eq('recipient_id', myInboxId).order('created_at', { ascending: false });
            if (!error && data) setMessages(data);
            setLoading(false);
        };
        fetchMessages();
        const channel = supabase.channel('public:confessions')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'confessions', filter: `recipient_id=eq.${myInboxId}` },
                (payload) => setMessages(prev => [payload.new as Message, ...prev]))
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [myInboxId, activeTab]);

    const handleIncomingSecret = async (secret: string) => {
        try {
            const decoded = JSON.parse(b64toutf8(secret));
            setReceivedSecret(decoded);
            // Don't navigate or clear yet, let the user see the card first
        } catch (e) {
            console.error(e);
            // Fallback for old style secrets or direct text
            setReceivedSecret({ content: b64toutf8(secret), senderName: 'Anonymous' });
        }
    };

    const handleSendToInbox = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!targetRecipientId) return;
        setLoading(true);
        const { error } = await supabase.from('confessions').insert([{
            content: newMessage,
            sender_name: senderName || 'Anonymous',
            sender_gender: senderGender,
            recipient_id: targetRecipientId
        }]);
        setLoading(false);
        if (error) {
            console.error("Confession insert error:", error);
            if (error.message.includes('keys missing')) {
                alert("Supabase keys are missing in Vercel settings. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your project environment variables.");
            } else {
                alert(`Failed to send: ${error.message}. Please check if the database table is set up correctly.`);
            }
        }
        else { setGeneratedLink('SENT'); setNewMessage(""); }
    };

    const handleGenerateShareableCard = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { id: Date.now().toString(), content: newMessage, senderName: senderName || 'Anonymous', senderGender, targetName };
        const encoded = utf8tob64(JSON.stringify(payload));
        setGeneratedLink(`${window.location.origin}${window.location.pathname}?secret=${encoded}`);
    };

    const handleSaveInboxName = () => {
        if (!tempName) return;
        const id = utf8tob64(tempName);
        setMyInboxId(id);
        const gender = (document.getElementById('gender-select') as HTMLSelectElement)?.value || 'Secret';
        setMyUserGender(gender);
        localStorage.setItem('red_thread_recipient_id', id);
        localStorage.setItem('red_thread_user_gender', gender);
        setIsNameModalOpen(false);
        // Copy link automatically
        const link = `${window.location.origin}${window.location.pathname}?to=${id}`;
        navigator.clipboard.writeText(link);
        alert(`Link for "${tempName}" copied to clipboard!`);
    };

    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Delete this secret permanently?")) return;
        const { error } = await supabase.from('confessions').delete().eq('id', id);
        if (error) alert("Failed to delete.");
        else setMessages(prev => prev.filter(m => m.id !== id));
    };

    const downloadCard = async () => {
        if (!cardRef.current) return;
        setLoading(true);
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 0.95, backgroundColor: '#fff5f5' });
            download(dataUrl, `love-card-${Date.now()}.png`);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-[70vh] gap-8 animate-fade-in p-4 max-w-4xl mx-auto w-full">
            <div className="text-center mb-4">
                <h1 className="text-5xl font-heading text-[var(--color-red)] mb-2">Red Thread Whispers</h1>
                <p className="text-[var(--color-text)] opacity-70">
                    {receivedSecret ? "A whisper has reached you through the thread of fate." : (myInboxId && activeTab === 'inbox' ? (
                        <span className="flex items-center justify-center gap-2">
                            Inbox for {b64toutf8(myInboxId)}
                            <span className={`w-3 h-3 rounded-full ${myUserGender === 'Female' ? 'bg-pink-500' : myUserGender === 'Male' ? 'bg-blue-500' : 'bg-gray-400'} animate-pulse shadow-sm`} />
                        </span>
                    ) : "Anonymously woven by fate.")}
                </p>
            </div>

            {!isSupabaseConfigured && (
                <div className="w-full max-w-lg bg-orange-50 border-2 border-orange-200 p-4 rounded-xl flex items-center gap-4 text-orange-800 animate-pulse">
                    <AlertCircle size={24} />
                    <div className="text-sm">
                        <p className="font-bold">Supabase Not Connected</p>
                        <p className="opacity-80">Check your Vercel Environment Variables. The app is running in offline/demo mode.</p>
                    </div>
                </div>
            )}

            {!receivedSecret && (
                <div className="flex gap-4 mb-2">
                    <Button variant={activeTab === 'inbox' ? 'primary' : 'outline'} onClick={() => setActiveTab('inbox')}>
                        <MessageCircle size={20} /> My Inbox
                    </Button>
                    <Button variant={activeTab === 'write' ? 'primary' : 'outline'} onClick={() => { setActiveTab('write'); setGeneratedLink(''); }}>
                        <Heart size={20} /> Write a Secret
                    </Button>
                </div>
            )}

            {receivedSecret ? (
                <div className="w-full max-w-lg animate-fade-in space-y-6">
                    <div ref={cardRef} className="bg-[var(--color-cream)] p-8 rounded-[var(--radius-xl)] border-2 border-[var(--color-red)] shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-4 min-h-[400px] justify-center">
                        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-red)] opacity-20" />
                        <Heart className="text-[var(--color-red)] animate-pulse" size={48} fill="currentColor" />
                        <h3 className="text-3xl font-heading text-[var(--color-red)]">
                            {receivedSecret.targetName ? `To: ${receivedSecret.targetName}` : "A Message of Fate"}
                        </h3>
                        <p className="text-2xl font-serif italic text-gray-800 leading-relaxed px-4">"{receivedSecret.content}"</p>
                        <div className="mt-8 pt-8 border-t border-[var(--color-pink)] w-full text-center">
                            <p className="text-sm font-bold opacity-60 uppercase tracking-widest">From: {receivedSecret.senderName || 'Anonymous'}</p>
                            <p className="text-xs mt-4 font-heading text-[var(--color-red)] opacity-80">{saying}</p>
                            <p className="text-[10px] mt-4 opacity-30">Scan or visit: redthread.love</p>
                        </div>
                        <div className="absolute bottom-0 right-0 p-4 opacity-10"><Heart size={80} /></div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button onClick={downloadCard} size="lg" className="w-full btn-glow">
                            Download Photo <Download size={20} />
                        </Button>
                        <Button onClick={() => { setReceivedSecret(null); navigate('/confessions', { replace: true }); }} variant="outline" className="w-full">
                            Close & Continue
                        </Button>
                    </div>
                </div>
            ) : activeTab === 'inbox' ? (
                myInboxId ? (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">Recent Whispers</h2>
                            <Button variant="outline" size="sm" onClick={() => setIsNameModalOpen(true)}>Sharing Link</Button>
                        </div>
                        {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[var(--color-red)]" size={48} /></div> : (
                            <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                        <MessageCircle className={`mb-4 ${myUserGender === 'Female' ? 'text-pink-400' : myUserGender === 'Male' ? 'text-blue-400' : 'text-[var(--color-pink)]'}`} size={48} />
                                        <p className="opacity-60 text-lg">Your inbox is quiet...</p>
                                        <p className="text-xs italic mt-2">"True words are often whispered in silence."</p>
                                    </div>
                                ) : messages.map((msg) => (
                                    <div key={msg.id} className="bg-white/80 p-6 rounded-[var(--radius-lg)] shadow-sm border-l-4 border-[var(--color-red)] relative animate-fade-in group hover:shadow-md transition-shadow">
                                        <div className="absolute top-4 right-4 flex items-center gap-3">
                                            <div className="text-[10px] opacity-30 font-mono">{new Date(msg.created_at).toLocaleTimeString()}</div>
                                            <button onClick={() => handleDeleteMessage(msg.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <div className={`p-1.5 rounded-full ${msg.sender_gender === 'Male' ? 'bg-blue-100 text-blue-600' : msg.sender_gender === 'Female' ? 'bg-pink-100 text-pink-600' : msg.sender_gender === 'Others' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                                                <Heart size={10} fill="currentColor" />
                                            </div>
                                            <span className="text-xs font-bold text-[var(--color-red)]">From: {msg.sender_name}</span>
                                        </div>
                                        <p className="text-xl font-serif italic">"{msg.content}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full max-w-lg text-center py-16 bg-white/50 rounded-[var(--radius-xl)] border-2 border-dashed border-[var(--color-pink)] p-8">
                        <MessageCircle className="mx-auto mb-4 text-[var(--color-pink)] opacity-40" size={48} />
                        <h3 className="text-2xl font-bold mb-4">Claim Your Box</h3>
                        <p className="opacity-70 mb-8">Create an inbox to receive secrets from your friends, and choose your theme!</p>
                        <Button onClick={() => setIsNameModalOpen(true)} size="lg" className="btn-glow">Claim Now</Button>
                    </div>
                )
            ) : (
                <div className="w-full max-w-lg">
                    {generatedLink === 'SENT' ? (
                        <div className="text-center py-10 bg-white/80 p-8 rounded-[var(--radius-xl)]">
                            <Check className="mx-auto mb-4 text-green-500" size={48} />
                            <h3 className="text-2xl font-bold mb-2">Whisper Sent!</h3>
                            <p className="opacity-70 mb-8">Your secret has been woven into their inbox in real-time.</p>
                            <Button onClick={() => { setGeneratedLink(''); setActiveTab('inbox'); }} variant="outline">Back to My Inbox</Button>
                        </div>
                    ) : (generatedLink && !targetRecipientId) ? (
                        <div className="animate-fade-in space-y-6">
                            <div ref={cardRef} className="bg-[var(--color-cream)] p-8 rounded-[var(--radius-xl)] border-2 border-[var(--color-red)] shadow-2xl relative overflow-hidden flex flex-col items-center text-center gap-4 min-h-[400px] justify-center">
                                <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-red)] opacity-20" />
                                <Heart className="text-[var(--color-red)] animate-pulse" size={48} fill="currentColor" />
                                <h3 className="text-3xl font-heading text-[var(--color-red)]">
                                    {targetName ? `To: ${targetName}` : "A Message of Fate"}
                                </h3>
                                <p className="text-2xl font-serif italic text-gray-800 leading-relaxed px-4">"{newMessage}"</p>
                                <div className="mt-8 pt-8 border-t border-[var(--color-pink)] w-full text-center">
                                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest">From: {senderName || 'Anonymous'}</p>
                                    <p className="text-xs mt-4 font-heading text-[var(--color-red)] opacity-80">{saying}</p>
                                    <p className="text-[10px] mt-4 opacity-30">Scan or visit: redthread.love</p>
                                </div>
                                <div className="absolute bottom-0 right-0 p-4 opacity-10"><Heart size={80} /></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button onClick={downloadCard} size="lg" className="w-full btn-glow">
                                    {loading ? "Sealing..." : "Download Photo"} <Download size={20} />
                                </Button>
                                <Button onClick={() => { navigator.clipboard.writeText(generatedLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }} variant="outline" className="w-full">
                                    {copied ? 'Copied' : 'Copy Love Link'} <Copy size={18} />
                                </Button>
                                <Button onClick={() => setGeneratedLink('')} variant="outline" className="text-xs opacity-50">Edit</Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={targetRecipientId ? handleSendToInbox : handleGenerateShareableCard} className="bg-white/80 p-8 rounded-[var(--radius-xl)] shadow-xl flex flex-col gap-6">
                            <div className="text-center">
                                <h3 className="text-2xl font-heading text-[var(--color-red)]">{targetRecipientId ? `To: ${recipientName}` : "Whisper into the Void"}</h3>
                                <p className="text-xs opacity-60 mb-4">{targetRecipientId ? "Sending directly to their inbox." : "Shared as a card or link."}</p>
                                <div className="bg-[var(--color-red-light)]/30 p-2 rounded-lg text-[10px] text-[var(--color-red)] italic mb-4 border border-[var(--color-red)]/10 animate-pulse">
                                    "Love is kind. Please remain respectful and polite, even when whispering anonymously."
                                </div>
                            </div>
                            <textarea
                                value={newMessage}
                                onChange={(e) => { setNewMessage(e.target.value); try { new AudioContext().resume(); } catch { } }}
                                className="w-full p-4 rounded-xl border border-[var(--color-pink)] h-40 focus:ring-2 focus:ring-[var(--color-red)] outline-none resize-none font-serif text-lg bg-pink-50/30"
                                placeholder="..."
                                required
                            />
                            {!targetRecipientId && (
                                <input
                                    type="text"
                                    value={targetName}
                                    onChange={e => setTargetName(e.target.value)}
                                    placeholder="To: (Name or Nickname)"
                                />
                            )}
                            <div className="flex gap-2 mb-2 justify-center">
                                {['❤️', '💌', '🌹', '✨', '🦋', '🧸'].map(icon => (
                                    <button key={icon} type="button" onClick={() => setNewMessage(p => p + icon)} className="text-2xl hover:scale-125 transition-transform">{icon}</button>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" value={senderName} onChange={e => setSenderName(e.target.value)} placeholder="From (Optional)" className="p-3 rounded-lg border border-[var(--color-pink)] bg-white/50 text-center" />
                                <select value={senderGender} onChange={e => setSenderGender(e.target.value)} className="p-3 rounded-lg border border-[var(--color-pink)] bg-white/50">
                                    <option>Secret</option><option>Male</option><option>Female</option><option>Others</option>
                                </select>
                            </div>
                            <Button type="submit" size="lg" className="w-full btn-big-burst" disabled={loading}>
                                {targetRecipientId ? (loading ? "..." : "Send") : "Generate Card"}
                            </Button>
                        </form>
                    )}

                    {/* Unified Wishlist Display */}
                    {targetRecipientId && !generatedLink && (
                        <div className="mt-12 animate-fade-in w-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[var(--color-pink)]" />
                                <h3 className="text-2xl font-heading text-[var(--color-red)] whitespace-nowrap flex items-center gap-2">
                                    <Gift className="animate-bounce-subtle" /> {targetOwnerName || recipientName}'s Wishlist
                                </h3>
                                <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[var(--color-pink)]" />
                            </div>

                            {targetWishlist.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {targetWishlist.map((wish: any) => (
                                        <a
                                            key={wish.id}
                                            href={wish.link || '#'}
                                            target={wish.link ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className="bg-white/90 p-4 rounded-2xl shadow-sm border border-[var(--color-pink)]/30 flex items-center gap-4 hover:shadow-md hover:border-[var(--color-red)] transition-all group cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="w-16 h-16 rounded-xl bg-[var(--color-cream)] flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                {wish.image ? (
                                                    <img src={wish.image} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                ) : (
                                                    <Gift className="text-[var(--color-pink)] opacity-50" size={24} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-sm truncate group-hover:text-[var(--color-red)] transition-colors">{wish.name}</h4>
                                                <p className="text-[10px] opacity-70 italic line-clamp-1">{wish.note}</p>
                                                <p className="text-xs text-[var(--color-red)] font-bold mt-0.5">{wish.price || 'Gift'}</p>
                                            </div>
                                            {wish.link ? (
                                                <div className="p-2 rounded-full bg-[var(--color-red)] text-white shadow-sm transform translate-x-12 group-hover:translate-x-0 transition-transform">
                                                    <ExternalLink size={14} />
                                                </div>
                                            ) : (
                                                <div className="text-[10px] opacity-30 font-bold uppercase tracking-tight">Vibe</div>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-white/40 rounded-2xl border border-dashed border-[var(--color-pink)]/30">
                                    <Gift className="mx-auto mb-2 text-[var(--color-pink)] opacity-40 animate-pulse" size={32} />
                                    <p className="text-sm opacity-60">No wishes found for {recipientName} yet...</p>
                                    <p className="text-[10px] opacity-40 italic mt-2">"True wishes are often kept in the heart."</p>
                                </div>
                            )}
                            <p className="text-[10px] text-center opacity-40 mt-6 italic">"A small token of love can bridge the greatest distances."</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal for Claiming Inbox */}
            <Modal isOpen={isNameModalOpen} onClose={() => setIsNameModalOpen(false)} title="My Inbox Link">
                <div className="flex flex-col gap-6">
                    {myInboxId ? (
                        <div className="text-center space-y-4">
                            <p className="text-sm opacity-70">You already have a box claimed as <span className="font-bold text-[var(--color-red)]">{b64toutf8(myInboxId)}</span>.</p>
                            <div className="bg-white/80 p-4 rounded-xl border border-[var(--color-pink)] text-xs font-mono break-all shadow-inner">
                                {window.location.origin}/confessions?to={myInboxId}
                            </div>
                            <Button onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/confessions?to=${myInboxId}`);
                                alert("Link copied!");
                            }} className="w-full">Copy Link</Button>
                            <button
                                onClick={() => { localStorage.removeItem('red_thread_recipient_id'); window.location.reload(); }}
                                className="text-[10px] opacity-40 hover:opacity-100 uppercase tracking-widest mt-4"
                            >
                                Reset & Create New (Careful!)
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm opacity-70">Enter a name and select your gender to claim your inbox.</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-1">My Secret Name</label>
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        placeholder="Nickname"
                                        className="w-full p-4 rounded-xl border-2 border-[var(--color-pink)] focus:border-[var(--color-red)] outline-none text-xl text-center"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-40 ml-1">My Gender</label>
                                    <select
                                        id="gender-select"
                                        className="w-full p-4 rounded-xl border-2 border-[var(--color-pink)] bg-white text-lg appearance-none text-center cursor-pointer hover:border-[var(--color-red)] transition-colors"
                                        defaultValue="Secret"
                                    >
                                        <option value="Secret">Keep it Secret 🎭</option>
                                        <option value="Female">Damsel (Woman) 🌸</option>
                                        <option value="Male">Gentleman (Man) 👔</option>
                                        <option value="Others">Something Else ✨</option>
                                    </select>
                                </div>
                            </div>
                            <Button onClick={handleSaveInboxName} size="lg" className="w-full btn-glow mt-2">
                                Create My Inbox
                            </Button>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Confess;

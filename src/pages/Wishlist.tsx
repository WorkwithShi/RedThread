import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Gift, Plus, Trash2, ExternalLink, X, Share2, Copy, Check, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import '../styles/animations.css';

interface WishItem {
    id: string;
    name: string;
    price: string;
    link: string;
    note: string;
    image?: string; // Optional URL for image
}

const Wishlist = () => {
    const [searchParams] = useSearchParams();
    const [wishes, setWishes] = useState<WishItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', link: '', note: '', image: '' });
    const [myInboxId] = useState<string | null>(localStorage.getItem('red_thread_recipient_id'));
    const [viewOnly, setViewOnly] = useState(false);
    const [ownerName, setOwnerName] = useState('');
    const [loading, setLoading] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [isSynced, setIsSynced] = useState(false);

    // Track online sync status
    useEffect(() => {
        const checkSyncStatus = async () => {
            if (!myInboxId) return;
            try {
                const { data } = await supabase
                    .from('wishlists')
                    .select('recipient_id')
                    .eq('recipient_id', myInboxId)
                    .single();
                setIsSynced(!!data);
            } catch (e) {
                console.log("Sync check delayed or failed:", e);
            }
        };
        checkSyncStatus();
    }, [myInboxId]);

    useEffect(() => {
        const viewId = searchParams.get('view');
        // If viewing someone else, or if the URL has a view param
        if (viewId) {
            fetchSharedWishlist(viewId);
        } else {
            // Personal Mode
            const saved = localStorage.getItem('red_thread_wishlist');
            if (saved) {
                setWishes(JSON.parse(saved));
            }
            // If they have an inbox, show the share link preview
            if (myInboxId) {
                setShareLink(`${window.location.origin}/confessions?to=${myInboxId}`);
            }
        }
    }, [searchParams, myInboxId]);

    const fetchSharedWishlist = async (id: string) => {
        setLoading(true);
        setViewOnly(true);
        const { data, error } = await supabase
            .from('wishlists')
            .select('*')
            .eq('recipient_id', id)
            .single();

        if (!error && data) {
            setWishes(data.items);
            setOwnerName(data.user_name);
        } else {
            console.error("Error fetching wishlist:", error);
            // Don't alert if it just doesn't exist yet, just show empty
        }
        setLoading(false);
    };

    const handleShare = async () => {
        if (!myInboxId) {
            alert("Please create an Anonymous Inbox first to get a shareable link!");
            window.location.href = '/confessions';
            return;
        }

        if (wishes.length === 0) {
            alert("Add some wishes first!");
            return;
        }

        const name = ownerName || prompt("Enter your name to display on the wishlist:");
        if (!name) return;
        setOwnerName(name);

        setLoading(true);
        console.log("Syncing wishlist for ID:", myInboxId);

        // Upsert logic: using recipient_id as the primary key
        const { error } = await supabase
            .from('wishlists')
            .upsert({
                recipient_id: myInboxId,
                user_name: name,
                items: wishes,
                updated_at: new Date().toISOString()
            });

        setLoading(false);

        if (!error) {
            console.log("Wishlist synced successfully");
            setIsSynced(true);
            alert("Wishlist synced! Anyone with your Anonymous Link can now see these items. 🏮✨");
        } else {
            console.error("Error sharing wishlist:", error);
            alert(`Failed to share wishlist: ${error.message}. Please ensure you've created the 'wishlists' table in Supabase.`);
        }
    };

    const saveWishes = (items: WishItem[]) => {
        setWishes(items);
        localStorage.setItem('red_thread_wishlist', JSON.stringify(items));
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const item: WishItem = {
            id: Date.now().toString(),
            ...newItem
        };
        saveWishes([...wishes, item]);
        setNewItem({ name: '', price: '', link: '', note: '', image: '' });
        setShowForm(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to remove this wish?')) {
            saveWishes(wishes.filter(w => w.id !== id));
        }
    };

    return (
        <div className="min-h-[70vh] p-4 animate-fade-in max-w-6xl mx-auto">

            <div className="text-center mb-8 relative">
                <h1 className="text-5xl font-heading text-[var(--color-red)] mb-2">
                    {viewOnly ? `${ownerName}'s Wishlist` : 'My Wishlist'}
                </h1>
                <p className="text-[var(--color-text)] opacity-70">
                    {viewOnly ? "Dreams woven of fate and red thread." : 'Dreams tied with a red thread.'}
                </p>

                {!viewOnly && (
                    <div className="mt-8 flex flex-col items-center gap-6 p-6 bg-white/40 rounded-3xl border border-[var(--color-pink)]/30 backdrop-blur-sm animate-fade-in shadow-sm w-full max-w-2xl mx-auto mb-10">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-[var(--color-red)] mb-1 flex items-center justify-center gap-2">
                                <Share2 size={18} /> Public Sharing Link
                            </h3>
                            <p className="text-xs opacity-60">Your wishlist is connected to your Anonymous Inbox link.</p>
                            <div className="mt-2 flex items-center justify-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isSynced ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                                    {isSynced ? "Live on your public link" : "Not yet synced online"}
                                </span>
                            </div>
                        </div>

                        {myInboxId ? (
                            <div className="flex flex-col items-center gap-3 w-full">
                                <div className="flex items-center gap-2 bg-white/80 p-2 pl-4 rounded-full border border-[var(--color-pink)] text-sm shadow-inner w-full sm:w-auto">
                                    <span className="opacity-60 truncate max-w-[150px] sm:max-w-[300px] font-mono">{shareLink || "...loading..."}</span>
                                    <button
                                        onClick={() => {
                                            if (!shareLink) return;
                                            navigator.clipboard.writeText(shareLink);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        }}
                                        className="p-2 bg-[var(--color-red)] text-white rounded-full hover:bg-[var(--color-thread)] transition-colors shadow-sm"
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <a
                                    href={shareLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-[var(--color-red)] underline hover:opacity-80 transition-opacity"
                                >
                                    Preview My Public Page
                                </a>
                            </div>
                        ) : (
                            <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100">
                                <p className="text-sm font-bold text-[var(--color-red)] mb-2">Anonymous Link Required</p>
                                <Button size="sm" onClick={() => window.location.href = '/confessions'}>
                                    Claim Your Box First
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-2">
                            <Button
                                variant="primary"
                                onClick={handleShare}
                                disabled={loading || !wishes.length || !myInboxId}
                                className={`btn-glow transition-all ${(!wishes.length || !myInboxId) ? 'opacity-50 grayscale cursor-not-allowed' : 'animate-pulse-subtle'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Gift size={20} />}
                                {!myInboxId ? "Create Inbox to Sync" : wishes.length === 0 ? "Add items to enable sync" : (isSupabaseConfigured ? (isSynced ? "Update My Public Link" : "Save to My Public Link") : "Online Sharing Disabled")}
                            </Button>
                        </div>
                    </div>
                )}

                {viewOnly && (
                    <div className="mt-4">
                        <Button variant="outline" size="sm" onClick={() => window.location.href = '/wishlist'}>
                            Create My Own
                        </Button>
                    </div>
                )}
            </div>

            {loading && !wishes.length ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-[var(--color-red)]" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Add New Card (Only if not view-only) */}
                    {!viewOnly && (
                        <div
                            onClick={() => setShowForm(true)}
                            className="bg-white/50 border-2 border-dashed border-[var(--color-red-light)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-[var(--color-red-light)]/20 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-red)] group-hover:scale-110 transition-transform">
                                <Plus size={32} />
                            </div>
                            <span className="mt-4 font-bold text-[var(--color-red)]">Add a Wish</span>
                        </div>
                    )}

                    {/* Existing Wishes */}
                    {wishes.map((wish) => (
                        <div key={wish.id} className="bg-white rounded-[var(--radius-xl)] shadow-sm hover:shadow-[var(--shadow-card)] transition-all overflow-hidden border border-transparent hover:border-[var(--color-pink)] relative group">
                            <div className="h-48 bg-[var(--color-cream)] flex items-center justify-center w-full relative overflow-hidden">
                                {wish.image ? (
                                    <img src={wish.image} alt={wish.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <Gift size={48} className="text-[var(--color-pink)] opacity-50" />
                                )}
                                {wish.price && (
                                    <span className="absolute top-4 right-4 bg-[var(--color-red)] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
                                        {wish.price}
                                    </span>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 truncate">{wish.name}</h3>
                                <p className="text-sm opacity-70 mb-4 line-clamp-2">{wish.note || "No notes."}</p>

                                <div className="flex gap-2">
                                    {wish.link && (
                                        <a
                                            href={wish.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2 rounded-full border border-[var(--color-pink)] text-[var(--color-red)] hover:bg-[var(--color-red-light)] text-sm flex items-center justify-center gap-1 transition-colors"
                                        >
                                            View <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {!viewOnly && (
                                        <button
                                            onClick={() => handleDelete(wish.id)}
                                            className="p-2 rounded-full text-gray-400 hover:text-[var(--color-red)] hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[var(--radius-xl)] p-8 max-w-md w-full shadow-2xl animate-pulse-in relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-[var(--color-red)] transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-heading text-[var(--color-red)] mb-6 text-center">Make a Wish</h2>

                        <form onSubmit={handleAdd} className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-bold opacity-70">Item Name</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full p-2 border border-[var(--color-pink)] rounded-[var(--radius-lg)] focus:outline-none focus:ring-1 focus:ring-[var(--color-red)]"
                                    required
                                    placeholder="e.g., Cute Plushie"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold opacity-70">Price (Approx)</label>
                                    <input
                                        type="text"
                                        value={newItem.price}
                                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                        className="w-full p-2 border border-[var(--color-pink)] rounded-[var(--radius-lg)]"
                                        placeholder="$0.00"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold opacity-70">Link (Optional)</label>
                                    <input
                                        type="url"
                                        value={newItem.link}
                                        onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                                        className="w-full p-2 border border-[var(--color-pink)] rounded-[var(--radius-lg)]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold opacity-70">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    value={newItem.image}
                                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                    className="w-full p-2 border border-[var(--color-pink)] rounded-[var(--radius-lg)]"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold opacity-70">Note</label>
                                <textarea
                                    value={newItem.note}
                                    onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
                                    className="w-full p-2 border border-[var(--color-pink)] rounded-[var(--radius-lg)] resize-none h-24"
                                    placeholder="Why do you want this?"
                                />
                            </div>

                            <Button type="submit" className="w-full mt-2">Add to Wishlist</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;

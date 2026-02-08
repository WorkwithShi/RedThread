import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Gift, Plus, Trash2, ExternalLink, X } from 'lucide-react';
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
    const [wishes, setWishes] = useState<WishItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '', link: '', note: '', image: '' });

    useEffect(() => {
        const saved = localStorage.getItem('red_thread_wishlist');
        if (saved) {
            setWishes(JSON.parse(saved));
        }
    }, []);

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
            <div className="text-center mb-8">
                <h1 className="text-5xl font-heading text-[var(--color-red)] mb-2">My Wishlist</h1>
                <p className="text-[var(--color-text)] opacity-70">Dreams tied with a red thread.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Add New Card */}
                <div
                    onClick={() => setShowForm(true)}
                    className="bg-white/50 border-2 border-dashed border-[var(--color-red-light)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:bg-[var(--color-red-light)]/20 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-red)] group-hover:scale-110 transition-transform">
                        <Plus size={32} />
                    </div>
                    <span className="mt-4 font-bold text-[var(--color-red)]">Add a Wish</span>
                </div>

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
                                <button
                                    onClick={() => handleDelete(wish.id)}
                                    className="p-2 rounded-full text-gray-400 hover:text-[var(--color-red)] hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

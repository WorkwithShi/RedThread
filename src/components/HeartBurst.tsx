import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface BurstHeart {
    id: number;
    x: number;
    y: number;
    angle: number;
    velocity: number;
    size: number;
}

const HeartBurst: React.FC = () => {
    const [bursts, setBursts] = useState<BurstHeart[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // Only trigger on buttons or clickable items for "burst" feel
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) {
                const isBigBurst = target.closest('.btn-big-burst');
                const heartCount = isBigBurst ? 20 : 6;
                const newHearts = Array.from({ length: heartCount }).map((_, i) => ({
                    id: Math.random() + i,
                    x: e.clientX,
                    y: e.clientY,
                    angle: (Math.PI * 2 / heartCount) * i + (Math.random() * 0.5),
                    velocity: (isBigBurst ? 4 : 2) + Math.random() * (isBigBurst ? 6 : 3),
                    size: (isBigBurst ? 15 : 10) + Math.random() * 10
                }));
                setBursts(prev => [...prev.slice(-24), ...newHearts]);

                // Cleanup after animation
                setTimeout(() => {
                    setBursts(prev => prev.filter(h => !newHearts.includes(h)));
                }, 1000);
            }
        };

        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {bursts.map(h => (
                <div
                    key={h.id}
                    className="absolute animate-heart-burst"
                    style={{
                        left: h.x,
                        top: h.y,
                        '--angle': `${h.angle}rad`,
                        '--velocity': `${h.velocity}`,
                    } as any}
                >
                    <Heart
                        size={h.size}
                        fill="var(--color-red)"
                        className="text-[var(--color-red)] opacity-80"
                    />
                </div>
            ))}
        </div>
    );
};

export default HeartBurst;

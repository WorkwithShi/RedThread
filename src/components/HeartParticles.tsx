import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Particle {
    id: number;
    x: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
}

const HeartParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 20,
            duration: 10 + Math.random() * 20,
            size: 10 + Math.random() * 20,
            opacity: 0.1 + Math.random() * 0.3,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute bottom-[-50px] animate-float-heart"
                    style={{
                        left: `${p.x}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        opacity: p.opacity,
                    }}
                >
                    <Heart
                        size={p.size}
                        fill="var(--color-red)"
                        className="text-[var(--color-red)]"
                    />
                </div>
            ))}
        </div>
    );
};

export default HeartParticles;

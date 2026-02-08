import React, { useEffect, useRef } from 'react';

const RedThread: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<{ x: number, y: number, vx: number, vy: number }[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const pointCount = 25;
        const friction = 0.7;
        const spring = 0.03;

        // Initialize points
        pointsRef.current = Array.from({ length: pointCount }, () => ({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            vx: 0,
            vy: 0
        }));

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const update = () => {
            let targetX = mouseRef.current.x;
            let targetY = mouseRef.current.y;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = '#e63946'; // var(--color-red)
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 0.5;

            pointsRef.current.forEach((p) => {
                const dx = targetX - p.x;
                const dy = targetY - p.y;

                p.vx += dx * spring;
                p.vy += dy * spring;
                p.vx *= friction;
                p.vy *= friction;

                p.x += p.vx;
                p.y += p.vy;

                targetX = p.x;
                targetY = p.y;
            });

            // Draw the smooth curve
            ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

            for (let i = 1; i < pointsRef.current.length - 2; i++) {
                const xc = (pointsRef.current[i].x + pointsRef.current[i + 1].x) / 2;
                const yc = (pointsRef.current[i].y + pointsRef.current[i + 1].y) / 2;
                ctx.quadraticCurveTo(pointsRef.current[i].x, pointsRef.current[i].y, xc, yc);
            }

            // For the last 2 points
            if (pointsRef.current.length > 2) {
                const i = pointsRef.current.length - 2;
                ctx.quadraticCurveTo(
                    pointsRef.current[i].x,
                    pointsRef.current[i].y,
                    pointsRef.current[i + 1].x,
                    pointsRef.current[i + 1].y
                );
            }

            ctx.stroke();
            animationId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();
        update();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
};

export default RedThread;

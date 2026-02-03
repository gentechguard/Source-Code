'use client';

import React from 'react';

interface BeamsMobileProps {
    beamCount?: number;
    className?: string;
}

/**
 * Lightweight mobile alternative to Beams Three.js component.
 * Uses pure CSS animations to create beam/light ray effect.
 */
export default function BeamsMobile({
    beamCount = 8,
    className = ''
}: BeamsMobileProps) {
    // Generate beam data with random positions and delays
    const beams = React.useMemo(() => {
        return Array.from({ length: beamCount }, (_, i) => ({
            id: i,
            left: `${(i / beamCount) * 100 + Math.random() * 10 - 5}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${4 + Math.random() * 3}s`,
            width: `${1 + Math.random() * 2}px`,
            opacity: 0.1 + Math.random() * 0.2,
        }));
    }, [beamCount]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Dark background */}
            <div className="absolute inset-0 bg-black" />

            {/* Gradient overlay for depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(20,20,40,0.8) 0%, rgba(0,0,0,1) 70%)',
                }}
            />

            {/* Animated beams */}
            {beams.map((beam) => (
                <div
                    key={beam.id}
                    className="absolute top-0 h-full beam-line"
                    style={{
                        left: beam.left,
                        width: beam.width,
                        opacity: beam.opacity,
                        animationDelay: beam.delay,
                        animationDuration: beam.duration,
                        background: `linear-gradient(
              to bottom,
              transparent 0%,
              rgba(100, 120, 255, 0.3) 30%,
              rgba(150, 180, 255, 0.5) 50%,
              rgba(100, 120, 255, 0.3) 70%,
              transparent 100%
            )`,
                        transform: 'rotate(-25deg) translateY(-50%)',
                        transformOrigin: 'center center',
                    }}
                />
            ))}

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* CSS for beam animation */}
            <style jsx>{`
        .beam-line {
          animation: beam-move linear infinite;
        }
        
        @keyframes beam-move {
          0% {
            transform: rotate(-25deg) translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: var(--beam-opacity, 0.2);
          }
          80% {
            opacity: var(--beam-opacity, 0.2);
          }
          100% {
            transform: rotate(-25deg) translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}

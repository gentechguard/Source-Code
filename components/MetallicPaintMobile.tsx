'use client';

import React from 'react';
import Image from 'next/image';

interface MetallicPaintMobileProps {
    src: string;
    className?: string;
    alt?: string;
}

/**
 * Lightweight mobile alternative to MetallicPaint WebGL component.
 * Uses CSS animations to create a shimmer effect without WebGL overhead.
 */
export default function MetallicPaintMobile({
    src,
    className = '',
    alt = 'Logo'
}: MetallicPaintMobileProps) {
    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            {/* Base image with metallic gradient overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* The actual SVG/image */}
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain filter brightness-110 contrast-110"
                        priority
                    />

                    {/* Metallic shimmer overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none metallic-shimmer"
                        style={{
                            background: `linear-gradient(
                105deg,
                transparent 20%,
                rgba(255, 255, 255, 0.1) 35%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 65%,
                transparent 80%
              )`,
                            backgroundSize: '200% 100%',
                            mixBlendMode: 'overlay',
                        }}
                    />

                    {/* Subtle glow effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-50"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
                        }}
                    />
                </div>
            </div>

            {/* CSS for shimmer animation */}
            <style jsx>{`
        .metallic-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
        </div>
    );
}

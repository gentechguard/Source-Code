"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 1. Updated Interface to match your Modal's data requirements
export interface Product {
    id: string;
    name: string;
    shortDesc: string;
    // New fields required for the modal
    features: string[];
    specs: { label: string; value: string }[];
}

interface Props {
    products: Product[];
}

const ProductShowcase: React.FC<Props> = ({ products }) => {
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);

    // --- BACKGROUND SYNC LOGIC (The "JS Part") ---
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const syncBackgrounds = () => {
            const container = containerRef.current;
            // If modal is open, we can technically skip updates to save performance, 
            // but keeping it running ensures it looks right when modal closes.
            if (!container || cardsRef.current.length === 0) return;

            const containerRect = container.getBoundingClientRect();

            cardsRef.current.forEach((card) => {
                if (!card) return;
                const cardRect = card.getBoundingClientRect();
                const xOffset = containerRect.left - cardRect.left;

                // Sync the background
                card.style.backgroundSize = `${containerRect.width}px ${containerRect.height}px`;
                card.style.backgroundPositionX = `${xOffset}px`;
                card.style.backgroundPositionY = 'center';
            });

            animationFrameId = requestAnimationFrame(syncBackgrounds);
        };

        syncBackgrounds();
        return () => cancelAnimationFrame(animationFrameId);
    }, [products]);

    return (
        <>
            {/* --- THE EXPANDING CARDS SECTION --- */}
            <div
                ref={containerRef}
                className="relative z-10 flex flex-col md:flex-row gap-4 mx-20 my-8 aspect-video"
            >
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        ref={(el) => { cardsRef.current[index] = el; }}
                        onClick={() => setActiveProduct(product)}
                        className={`
                            group relative flex-1 
                            hover:flex-[2] 
                            transition-[flex] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
                            overflow-hidden cursor-pointer 
                            border border-white/5 bg-[#111] rounded-2xl
                        `}
                        style={{
                            backgroundImage: "url('/assets/solutions_bg.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundAttachment: "scroll",
                        }}
                    >
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-500 z-10" />

                        {/* Vertical Title (Collapsed State) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-300 group-hover:opacity-0">
                            <h3 className="whitespace-nowrap -rotate-90 text-2xl font-black tracking-widest text-white/80 uppercase">
                                {product.name}
                            </h3>
                        </div>

                        {/* Expanded Content (Hover State) */}
                        <div className="absolute inset-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-20">
                            {/* Width fixed to viewport to prevent text jitter */}
                            <div className="w-full md:w-[20vw] text-left">
                                <span className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2 block translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Click for Details
                                </span>
                                <h4 className="text-3xl font-black text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {product.name}
                                </h4>
                                <p className="text-white/80 line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 mb-6">
                                    {product.shortDesc}
                                </p>
                                <button className="border border-blue-500 text-blue-500 font-bold tracking-widest uppercase text-xs px-6 py-2 hover:bg-blue-500 hover:text-white transition-colors translate-y-4 group-hover:translate-y-0 duration-500 delay-150">
                                    View Solution
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- PRODUCT DETAIL MODAL --- */}
            <AnimatePresence>
                {activeProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
                        onClick={() => setActiveProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl shadow-blue-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveProduct(null)}
                                className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Modal Left: Visual */}
                            <div className="w-full md:w-1/3 bg-gradient-to-br from-blue-900/20 to-black relative overflow-hidden p-8 flex flex-col justify-between min-h-[300px]">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/assets/solutions_bg.png"
                                        alt="Product Background"
                                        fill
                                        className="object-cover opacity-60"
                                        style={{
                                            // This ensures the modal shows the same "slice" of the image as the card did
                                            objectPosition: `${products.indexOf(activeProduct) * 25}% center`,
                                            scale: "1.2"
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-blue-500/10 mix-blend-multiply" />
                                </div>

                                {/* Ensure you have this logo, or remove this block */}
                                {/* 
                                <Image
                                    src="/assets/gentech-tall.png"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="hidden opacity-60 absolute top-4 left-4 z-10"
                                /> 
                                */}

                                <div className="relative z-10 mt-auto">
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase leading-none drop-shadow-lg">
                                        {activeProduct.name}
                                    </h2>
                                    <div className="h-1 w-20 bg-blue-500 mt-4 shadow-[0_0_15px_rgba(0,170,255,0.8)]" />
                                </div>
                            </div>

                            {/* Modal Right: Details */}
                            <div className="w-full md:w-2/3 p-8 md:p-12">
                                <h3 className="text-xl font-bold text-blue-500 mb-4 uppercase tracking-widest">
                                    Product Highlights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                                    {activeProduct.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <ShieldCheck size={18} className="text-blue-500 shrink-0 mt-1" />
                                            <span className="text-white/80 text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                    <Zap size={20} className="text-blue-500" />
                                    Technical Specs
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {activeProduct.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <p className="text-white/40 text-xs uppercase font-bold tracking-wider mb-1">{spec.label}</p>
                                            <p className="text-white font-bold text-lg">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="hidden mt-10 pt-8 border-t border-white/10 flex justify-end">
                                    <Link
                                        href="/#contact"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-black uppercase tracking-widest hover:bg-blue-500 transition-colors"
                                        onClick={() => setActiveProduct(null)}
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductShowcase;
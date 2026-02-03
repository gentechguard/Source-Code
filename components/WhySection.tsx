"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Flame, Zap, Droplets, Shield, Sun, CheckCircle2, Waves, Diamond, Maximize, ArrowRight } from "lucide-react";
import Link from "next/link";

const coreUSPs = [
    {
        title: "Self-Healing",
        description: "Aliphatic TPU surface heals swirl marks and light scratches with heat.",
        icon: Flame,
        color: "from-blue-600 to-cyan-500",
        size: "small"
    },
    {
        title: "Non-Yellowing",
        description: "Zero oxidation technology prevents film discoloration over time.",
        icon: Sun,
        color: "from-blue-700 to-indigo-600",
        size: "small"
    },
    {
        title: "Mirror-Like Gloss",
        description: "High-transparency film that enhances paint depth and clarity.",
        icon: Diamond,
        color: "from-cyan-600 to-blue-500",
        size: "small"
    },
    {
        title: "High Impact Resistance",
        description: "Maximum energy absorption against stone chips and road debris.",
        icon: Shield,
        color: "from-indigo-700 to-blue-800",
        size: "small"
    },
    {
        title: "Anti-Fouling",
        description: "Hyper-hydrophobic surface repels water, dust, and grime.",
        icon: Waves,
        color: "from-blue-500 to-sky-400",
        size: "small"
    },
    {
        title: "Max Stretchability",
        description: "High-elongation properties for a perfect edge wrap and factory finish.",
        icon: Maximize,
        color: "from-blue-800 to-indigo-900",
        size: "small"
    }
];

const technicalSpecs = [
    "Crystal Clarity",
    "Anti-Scratch Surface",
    "Smooth Satin & Matte Options",
    "Anti-Oxidation Layer",
    "Advanced UV-Rejection",
    "Acid Rain Resistance",
    "Swirl Resistance",
    "Alkali Resistance",
    "Chemical Resistant Topcoat",
    "Optimized Adhesion"
];

export default function WhySection() {
    return (
        <section id="about" className="py-16 sm:py-20 md:py-24 bg-dark-bg relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary-blue/5 rounded-full blur-[160px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-3xl mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-blue font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 inline-block"
                    >
                        Engineering Excellence
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tighter"
                    >
                        WHY <span className="blue-text font-black uppercase text-2xl sm:text-3xl md:text-5xl">GENTECH GUARD</span>?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-grey text-base sm:text-lg font-medium leading-relaxed"
                    >
                        Our films are a precisely engineered multi-layer defense systems designed for the ultimate automotive preservation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* BENTO GRID OF CORE USPs */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {coreUSPs.map((usp, index) => (
                            <motion.div
                                key={usp.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-start group relative overflow-hidden ${usp.size === "large" ? "md:col-span-2" : "col-span-1"
                                    }`}
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${usp.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${usp.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <usp.icon className="text-white" size={28} />
                                </div>

                                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                                    {usp.title}
                                </h3>
                                <p className="text-text-grey text-sm leading-relaxed font-medium">
                                    {usp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* TECHNICAL MATRIX SIDEBAR */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex-grow"
                        >
                            <h4 className="text-primary-blue font-black tracking-widest uppercase text-xs mb-8 flex items-center gap-2">
                                <ShieldCheck size={16} />
                                Technical Protection Matrix
                            </h4>
                            <ul className="space-y-4">
                                {technicalSpecs.map((spec, idx) => (
                                    <motion.li
                                        key={spec}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="flex items-center gap-3 text-sm font-bold text-white/80 group/spec"
                                    >
                                        <CheckCircle2 size={16} className="text-primary-blue shrink-0 group-hover/spec:scale-125 transition-transform" />
                                        <span className="uppercase tracking-tight">{spec}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-12 p-6 rounded-2xl bg-primary-blue/10 border border-primary-blue/20">
                                <p className="text-[10px] font-black text-primary-blue uppercase tracking-widest mb-2">Verified Standard</p>
                                <p className="text-xs text-white/50 font-medium">
                                    All Gentech Guard® films undergo rigorous ASTM testing for clarity and durability.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Ultra-Fancy Neon Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-24 flex justify-center"
                >
                    <Link
                        href="/about"
                        className="group relative inline-flex items-center px-1 py-1 rounded-full overflow-hidden transition-all duration-500 scale-110 md:scale-125"
                    >
                        {/* 1. Revolving Border Layer */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            //className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_20%,var(--primary-blue)_50%,transparent_80%)] opacity-40 group-hover:opacity-100 transition-opacity"
                            className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_20%,var(--primary-blue)_50%,transparent_80%)] opacity-80 group-hover:opacity-100 transition-opacity"
                        />

                        {/* 2. Inner Button Body */}
                        <div className="relative max-w-[80dvw] z-10 flex items-center gap-6 px-10 py-4 bg-[#050505] rounded-full border border-white/5 group-hover:bg-primary-blue transition-colors">
                            <span className="text-white font-black uppercase tracking-[0.3em] text-[11px] md:text-sm">
                                Discover Our Heritage
                            </span>

                            {/* Neon Icon Circle */}
                            <div className="flex items-center justify-center h-10 aspect-square rounded-full bg-primary-blue text-white shadow-[0_0_20px_rgba(0,170,255,0.6)] group-hover:scale-110 group-hover:bg-white group-hover:text-primary-blue transition-transform">
                                <ArrowRight size={20} />
                            </div>
                        </div>

                        {/* 3. Outer Aura (Glow) */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-2xl bg-primary-blue transition-opacity duration-500" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary-blue/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow pointer-events-none" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

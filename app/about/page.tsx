"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldCheck, Target, Eye, Globe, ChevronDown, CheckCircle2, Award, Zap, Users, ArrowRight } from "lucide-react";

// --- Components ---

const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <Image
                    src="/assets/Hero Image Front On 01.png"
                    alt="Gentech Guard Hero"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/10 via-dark-bg/10 to-dark-bg" />
                <div className="absolute inset-0 bg-primary-blue/10 mix-blend-overlay" />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <span className="inline-block px-4 py-2 rounded-full border border-primary-blue/30 bg-primary-blue/10 text-primary-blue font-black tracking-[0.3em] uppercase text-xs mb-8 backdrop-blur-md">
                        Gentech Guard
                    </span>
                    <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-16 relative">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">PROTECTION</span>
                        <span className="block text-primary-blue drop-shadow-[0_0_30px_rgba(0,170,255,0.4)]">REDEFINED</span>
                    </h1>
                    <p className="hidden text-xl md:text-2xl text-text-grey font-medium max-w-2xl mx-auto mb-12">
                        Driving the future of automotive preservation with advanced Aliphatic TPU technology and engineer-grade precision.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/#contact" className="group relative px-8 py-4 bg-white text-dark-bg font-black uppercase tracking-widest rounded-full overflow-hidden hover:scale-105 transition-transform">
                            <span className="relative z-10">Partner With Us</span>
                            <div className="absolute inset-0 bg-primary-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-0" />
                            <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Partner With Us</span>
                        </Link>
                        <Link href="/#solutions" className="group flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm hover:text-primary-blue transition-colors">
                            Explore Solutions <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

const StorySection = () => {
    return (
        <section className="py-32 bg-dark-bg relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-blue/5 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Typography */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight uppercase">
                            Who We <span className="text-primary-blue italic">Are</span>
                        </h2>
                        <div className="space-y-8 text-lg text-text-grey leading-relaxed font-medium">
                            <p>
                                Gentech Guard® is not just a brand; it is a collective of <span className="text-white">industry veterans</span>. Managed by a team of experienced automobile professionals, we bring years of hands-on exposure to global automotive markets.
                            </p>
                            <div className="pl-6 border-l-4 border-primary-blue/50 italic text-white/80">
                                "Our strength lies in combining industry insight, product innovation, and customer-focused support."
                            </div>
                            <p>
                                From authorized car dealers to professional detailers and care studios, our products are the trusted backbone of automotive protection businesses across India.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-2 gap-8">
                            {[
                                { label: "Global Sourcing", value: "Best-in-class TPU" },
                                { label: "Expert Managed", value: "Decades of Exp." },
                                { label: "India Ready", value: "Climate Tested" },
                                { label: "Dealer Network", value: "Rapidly Growing" }
                            ].map((stat, i) => (
                                <div key={i} className="border-t border-white/10 pt-4">
                                    <h4 className="text-primary-blue font-black uppercase text-sm mb-1">{stat.label}</h4>
                                    <p className="text-white font-bold text-lg">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Modern Grid */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="aspect-[4/5] rounded-[2rem] bg-white/5 border border-white/10 relative overflow-hidden group"
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-4 border border-primary-blue/20">
                                            <Users size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase text-white mb-2">Expert Team</h3>
                                        <div className="h-1 w-12 bg-primary-blue/50 rounded-full mb-4" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-primary-blue">20+</span>
                                            <span className="text-sm text-text-grey uppercase font-bold">Years Combined</span>
                                        </div>
                                        <p className="text-sm text-text-grey leading-relaxed">
                                            Automotive veterans with hands-on experience across dealerships, distribution, and international markets.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-primary-blue/10 to-transparent border border-white/10 relative overflow-hidden mt-12 group"
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-primary-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 border border-white/20">
                                            <Globe size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase text-white mb-2">Global Tech</h3>
                                        <div className="h-1 w-12 bg-white/30 rounded-full mb-4" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-white">TPU</span>
                                        </div>
                                        <p className="text-sm text-text-grey leading-relaxed">
                                            International-grade materials sourced from reputed global suppliers, engineered for Indian conditions.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Card3D = ({ title, desc, icon: Icon, delay }: { title: string, desc: string, icon: any, delay: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            className="w-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative h-[450px] w-full rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-12 flex flex-col justify-between group cursor-grab active:cursor-grabbing overflow-hidden"
            >
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                {/* Neon Glow on hover */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-primary-blue/10 to-transparent rotate-45 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 transform translate-z-20">
                    <div className="w-16 h-16 rounded-2xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mb-8 border border-primary-blue/20 shadow-[0_0_30px_rgba(0,170,255,0.1)]">
                        <Icon size={32} />
                    </div>
                    <h3 className="text-4xl font-black uppercase text-white mb-2">{title}</h3>
                    <div className="h-1 w-20 bg-primary-blue/50 rounded-full" />
                </div>

                <div className="relative z-10 transform translate-z-10">
                    <p className="text-text-grey text-lg font-medium leading-relaxed">
                        {desc}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const SpecsTicker = () => {
    return (
        <div className="w-full bg-primary-blue/5 border-y border-primary-blue/10 py-6 overflow-hidden relative">
            <motion.div
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-16 items-center">
                        {["Self-Healing", "Anti-Yellowing", "Hydrophobic", "High-Gloss", "Impact Resistant", "Verified Durability", "Installer Friendly"].map((text) => (
                            <div key={text} className="flex items-center gap-4 text-white/40 font-black uppercase tracking-widest text-sm">
                                <Zap size={16} className="text-primary-blue" />
                                {text}
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-bg to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-bg to-transparent z-10" />
        </div>
    )
}

const QualitySection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Parallax effect that works both ways (scroll in and scroll out)
    const y = useTransform(scrollYProgress, [0, 0.5, 1], ["15%", "0%", "30%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    return (
        <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
            {/* Top Gradient Fade - Soften transition from previous section */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-dark-bg via-dark-bg/80 to-transparent z-10" />

            {/* Background Image with Bidirectional Parallax */}
            <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                <Image
                    src="/assets/Hero Image Front On 02.png"
                    alt="Gentech Guard Quality"
                    fill
                    className="object-cover object-center"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />
                {/* Blue Accent Overlay */}
                <div className="absolute inset-0 bg-primary-blue/5 mix-blend-overlay" />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-5xl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Award Icon with Glow */}
                    <div className="relative inline-block mb-12">
                        <div className="absolute inset-0 bg-primary-blue/30 blur-3xl rounded-full" />
                        <Award size={60} className="text-primary-blue relative z-10" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[1.20] mb-12 tracking-tighter">
                        "Quality is <br />
                        <span className="text-primary-blue drop-shadow-[0_0_40px_rgba(0,170,255,0.5)]">Non-Negotiable</span>."
                    </h2>

                    <p className="text-lg md:text-xl text-text-grey font-medium leading-relaxed mb-16 max-w-3xl mx-auto backdrop-blur-sm bg-dark-bg/30 p-6 rounded-3xl border border-white/10">
                        Premium protection should be accessible.<br />Our products go through strict quality control checks to ensure consistency, reliability, and professional installation standards.
                    </p>

                    <Link
                        href="/#solutions"
                        className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-dark-bg font-black uppercase tracking-widest hover:bg-primary-blue hover:text-white transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(0,170,255,0.4)]"
                    >
                        View Our Products <ChevronDown className="-rotate-90" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent z-10" />
        </section>
    );
}

export default function AboutPage() {
    return (
        <main className="min-h-[100dvh] bg-dark-bg text-white selection:bg-primary-blue selection:text-white">
            <Header />
            <HeroSection />
            <SpecsTicker />
            <StorySection />

            {/* Mission & Vision Split */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                        <Card3D
                            title="Our Vision"
                            desc="To become a preferred and trusted brand among automotive professionals by delivering innovative, durable, and aesthetically superior car care products that set new industry benchmarks."
                            icon={Target}
                            delay={0}
                        />
                        <Card3D
                            title="Our Mission"
                            desc="To protect and preserve vehicles using advanced, transparent, and affordable automotive protection solutions, empowering customers and professionals with products that enhance appearance."
                            icon={Eye}
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            <QualitySection />
            <Footer />
        </main>
    );
}

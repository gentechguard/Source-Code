"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, PlayCircle, Shield, Zap, Droplets } from "lucide-react";
import { useRef } from "react";
import { EtherealFade } from "./EtherealFade";

const carouselImages = [
    {
        id: "hero-1",
        url: "/assets/mobile-hero-1.png",
        title: "GEN 4 PPF",
        subtitle: "Reliable TPU Gloss Protection"
    }, {
        id: "hero-2",
        url: "/assets/mobile-hero-2.png",
        title: "GEN 5 PPF",
        subtitle: "Engineered for Hot Climate Performance"
    }, {
        id: "hero-3",
        url: "/assets/mobile-hero-3.png",
        title: "GEN PRO 6",
        subtitle: "High-clarity TPU with hydrophobic properties"
    }, {
        id: "hero-4",
        url: "/assets/mobile-hero-4.png",
        title: "GEN ULTRA PRO 8",
        subtitle: "Advanced instant self-healing TPU"
    }, {
        id: "hero-5",
        url: "/assets/mobile-hero-5.png",
        title: "GEN MATTE 5",
        subtitle: "Stealth Matte Finish with TPU Protection"
    }
];

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative h-[100dvh] w-full overflow-hidden bg-dark-bg flex items-start md:items-center justify-center pt-20 pb-0 md:pt-0"
        >
            {/* BACKGROUND: Static for Desktop, Carousel for Mobile */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                {/* Desktop Static Image */}
                <div className="hidden md:block relative w-full h-full">
                    <Image
                        src="/assets/Hero Image Side On.png"
                        alt="Gentech Guard Hero"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/40 to-transparent" />
                </div>

                {/* Mobile Carousel */}
                <div className="block md:hidden relative w-full h-full">
                    <EtherealFade images={carouselImages} interval={5000} />
                    <div className="hidden absolute inset-0 bg-gradient-to-t from-dark-bg via-black/20 to-transparent z-10" />
                </div>
            </motion.div>

            {/* CONTENT */}
            <div className="container mx-auto px-4 md:px-8 pt-8 md:pt-0 relative z-10 w-full md:translate-y-[-10%]">
                <div className="max-w-4xl text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center md:items-start justify-center"
                    >
                        <div className="hidden sm:block w-24 h-24 md:w-32 md:h-32 mb-8 relative justify-self-center md:justify-self-start">
                            <Image
                                src="/assets/gentech-tall.png"
                                alt="Gentech Guard Tall Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <h1 className="text-[min(8cqi,48px)] md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                            GENTECH GUARD <br />
                            <span className="blue-text tracking-wider">ADVANCED <br /> PROTECTION FILMS</span>
                        </h1>
                        <p className="hidden text-base md:text-lg text-text-grey max-w-xl mb-8 font-medium leading-relaxed">
                            Step into the future of car care. Our international-grade Aliphatic TPU
                            Film provides invisible, self-healing armor for your vehicle.
                        </p>

                        <div className="flex flex-row gap-4 mb-12 flex-wrap justify-center sm:justify-start">
                            <Link
                                href="/#contact"
                                className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-8 py-3 rounded-full font-black text-base transition-all neon-glow flex items-center justify-center gap-2 group"
                            >
                                BECOME A DEALER
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/#solutions"
                                className="border border-white/20 hover:border-primary-blue text-white px-8 py-3 rounded-full font-black text-base transition-all backdrop-blur-sm flex items-center justify-center"
                            >
                                EXPLORE TECH
                            </Link>
                        </div>
                    </motion.div>

                    {/* MICRO FEATURES */}
                    <motion.div
                        style={{ y: y, opacity }}
                        className="hidden grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">SELF-HEALING</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">Surface Tech</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Droplets size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">HYDROPHOBIC</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">High Clarity</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-elevated-bg border border-white/10 flex items-center justify-center text-primary-blue">
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-widest">ANTI-YELLOW</h3>
                                <p className="text-xs text-text-grey uppercase font-bold tracking-tighter">10 Year Warranty</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* DECORATIVE LINE */}
            <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent to-primary-blue opacity-50" />
        </section>
    );
}

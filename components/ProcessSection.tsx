"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Brush, Droplets, CheckCircle2, Award, Zap, Paintbrush } from "lucide-react";

const steps = [
    {
        id: "01",
        title: "Surface Preparation",
        subtitle: "Washing, Decontamination & Inspection",
        details: ["Thorough vehicle washing", "Surface decontamination", "Multi-point inspection to ensure flawless product performance"],
        image: "/assets/steps/prep.png",
        icon: Brush
    },
    {
        id: "02",
        title: "Precision Installation",
        subtitle: "Expert Application & Alignment",
        details: ["Trained professional application", "Advanced tools for perfect alignment", "Precision fit and finish"],
        image: "/assets/steps/application.png",
        icon: Droplets
    },
    {
        id: "03",
        title: "Curing & Quality Check",
        subtitle: "Final Inspection & Delivery",
        details: ["Final curing process", "Edge sealing", "Multi-point quality inspection before delivery"],
        image: "/assets/steps/finishing.png",
        icon: ShieldCheck
    }
];

export default function ProcessSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end 1"]
    });

    const springPath = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const pathLength = useTransform(springPath, [0, 1], [0, 1]);

    return (
        <section id="process" className="py-32 bg-dark-bg relative overflow-hidden" ref={containerRef}>
            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 mb-24 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-primary-blue font-black tracking-[0.3em] uppercase text-xs mb-4 inline-block"
                >
                    Our Process
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
                >
                    PRECISION. EXPERTISE. <span className="blue-text italic text-3xl md:text-7xl">QUALITY CONTROL</span>
                </motion.h2>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative">
                {/* Connecting Path (Mobile: Hidden, Desktop: Shown) */}
                <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-white/5 hidden lg:block">
                    <motion.div
                        style={{ height: "100%", scaleY: pathLength, originY: 0 }}
                        className="w-full bg-primary-blue shadow-[0_0_15px_rgba(0,170,255,0.5)]"
                    />
                </div>

                <div className="flex flex-col gap-32">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative z-10`}
                        >
                            {/* Visual Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="flex-1 w-full"
                            >
                                <div className="group relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 glass">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />

                                    {/* Number Overlay */}
                                    <div className="absolute top-8 left-8 w-16 h-16 rounded-3xl bg-primary-blue/20 backdrop-blur-xl border border-white/20 flex items-center justify-center font-black text-2xl text-white">
                                        {step.id}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Node Dot (Lg Only) */}
                            <div className="absolute left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-dark-bg border-4 border-primary-blue hidden lg:block" />

                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex-1 w-full text-center ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}
                            >
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-blue/10 text-primary-blue mb-8 border border-primary-blue/20`}>
                                    <step.icon size={28} />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{step.title}</h3>
                                <p className="text-primary-blue font-bold uppercase tracking-widest text-xs mb-8 italic">{step.subtitle}</p>

                                <ul className={`space-y-4 inline-block ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                                    {step.details.map((detail, i) => (
                                        <li key={i} className={`flex items-center gap-3 text-text-grey font-medium ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                                            <CheckCircle2 size={16} className="text-primary-blue shrink-0" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Expertise Highlight */}
            <div className="container mx-auto px-4 mt-20 relative">
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-primary-blue/5 blur-[120px] rounded-full -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <span className="hidden text-primary-blue font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Certified Standards</span>
                    <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                        WHY PROFESSIONALS CHOOSE <span className="blue-text">GENTECH GUARD™</span>
                    </h4>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Consistent Quality",
                            desc: "Premium products with consistent quality across every application.",
                            icon: Award
                        },
                        {
                            title: "Installer Support",
                            desc: "Dedicated installer-focused support and training programs.",
                            icon: Paintbrush
                        },
                        {
                            title: "Dealer Programs",
                            desc: "Structured dealer programs with marketing and technical assistance.",
                            icon: Zap
                        },
                        {
                            title: "Growing Network",
                            desc: "Be part of a growing nationwide network of premium protection studios.",
                            icon: ShieldCheck
                        }
                    ].map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary-blue/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-blue mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <benefit.icon size={28} />
                                </div>
                                <h5 className="text-white font-black uppercase tracking-tight text-lg mb-3 group-hover:text-primary-blue transition-colors">
                                    {benefit.title}
                                </h5>
                                <p className="text-text-grey text-sm leading-relaxed font-medium">
                                    {benefit.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

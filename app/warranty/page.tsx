"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WarrantyChecker from "@/components/WarrantyChecker";
import WarrantyForm from "@/components/WarrantyForm";
import { ShieldCheck, UserPlus, ChevronDown, Check, AlertTriangle, Info } from "lucide-react";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function WarrantyPage() {
    return (
        <Suspense fallback={<div className="min-h-[100dvh] bg-dark-bg" />}>
            <WarrantyPageContent />
        </Suspense>
    );
}

function WarrantyPageContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<"check" | "register">("register");

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "check") setActiveTab("check");
        if (tab === "register") setActiveTab("register");
    }, [searchParams]);


    return (
        <main className="min-h-[100dvh] bg-dark-bg text-white selection:bg-primary-blue selection:text-white" style={{ background: '#050505', color: '#fff' }}>
            <Header />

            {/* HERO SECTION */}
            <section className="relative pt-28 pb-20 overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-dark-bg z-0 h-[100dvh]">
                    <Image
                        src="/assets/Hero Image Warranty.png"
                        alt="Warranty Protection"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-b from-primary-blue/20 via-dark-bg/80 to-dark-bg" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000000ff_0px,#000000ff_100px,#00000000_200px,#00000000_calc(100%-200px),#000000ff_100%)]" />
                    <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-blue/20 via-transparent to-transparent opacity-60 mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-primary-blue text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                            <ShieldCheck size={14} />
                            Official Protection Portal
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none">
                            E-WARRANTY <br />
                            <span className="hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-primary-blue drop-shadow-lg">
                                REGISTRATION
                            </span>
                        </h1>
                        <p className="hidden text-text-grey max-w-2xl mx-auto text-lg md:text-xl font-medium mb-10 leading-relaxed">
                            Secure your investment instantly. Verify authenticity or register your new protection package for complete peace of mind.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
                            <Link
                                href="/warranty?tab=check#warranty-portal"
                                className="border border-white/20 hover:border-primary-blue text-white px-8 py-3 rounded-full font-black text-base transition-all backdrop-blur-sm flex items-center justify-center"
                            >
                                Check Status
                            </Link>
                            <Link
                                href="/warranty?tab=register#warranty-portal"
                                className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-8 py-3 rounded-full font-black text-base transition-all neon-glow flex items-center justify-center gap-2 group"
                            >
                                Register
                            </Link>
                            <Link
                                href="/warranty?tab=check#warranty-portal"
                                className="border border-white/20 hover:border-primary-blue text-white px-8 py-3 rounded-full font-black text-base transition-all backdrop-blur-sm flex items-center justify-center"
                            >
                                Claim
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

            {/* MAIN PORTAL */}
            <section className="py-24 relative z-20"
                id="warranty-portal"
                style={{
                    backgroundImage: "url('/assets/spread_bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "no-repeat",
                }}>
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000000ff_0px,#00000000_200px,#00000000_100%)]" />
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-12 max-w-md mx-auto relative backdrop-blur-xl">
                        <button
                            onClick={() => setActiveTab("check")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${activeTab === "check" ? "bg-primary-blue text-white shadow-lg neon-glow scale-100" : "text-text-grey hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <ShieldCheck size={18} />
                            Check Status
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${activeTab === "register" ? "bg-primary-blue text-white shadow-lg neon-glow scale-100" : "text-text-grey hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <UserPlus size={18} />
                            Register
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "check" ? (
                                <motion.div
                                    key="check"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <WarrantyChecker />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <WarrantyForm />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* WARRANTY INFORMATION (LEGAL TEXT) */}
            <section className="py-24 bg-dark-bg border-t border-white/5 relative">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                            Protection <span className="text-primary-blue">Policy</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary-blue mx-auto rounded-full" />
                    </div>

                    {/* Grid with equal height rows */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-8 h-full">
                            <InfoCard title="What Is Covered" className="flex-1">
                                <ul className="space-y-2">
                                    <ListItem text="Manufacturing defects" />
                                    <ListItem text="Bubbling" />
                                    <ListItem text="Cracking" />
                                    <ListItem text="Discoloration (Film defect)" />
                                </ul>
                            </InfoCard>

                            <InfoCard title="Exclusions (Not Covered)" className="flex-1">
                                <ul className="space-y-2">
                                    <ListItem text="Accidents, misuse, or negligence" error />
                                    <ListItem text="Stone chips, scratches, vandalism" error />
                                    <ListItem text="Harsh chemicals / pressure washing damage" error />
                                    <ListItem text="Water spots / normal wear and tear" error />
                                </ul>
                            </InfoCard>

                            <InfoCard title="Care Guidelines" className="flex-1">
                                <div className="bg-primary-blue/10 p-4 rounded-xl border border-primary-blue/20 h-full">
                                    <ul className="space-y-2">
                                        <ListItem text="Use pH-neutral products" />
                                        <ListItem text="Avoid harsh chemicals" />
                                        <ListItem text="No sharp objects" />
                                    </ul>
                                </div>
                            </InfoCard>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-8 h-full">
                            <InfoCard title="Warranty Period" className="flex-1">
                                <ul className="space-y-3">
                                    <ListItem text="TPU Series: Up to 8 Years" highlight />
                                    <ListItem text="TPU Series: Up to 5 Years" highlight />
                                </ul>
                                <p className="text-xs text-text-grey/60 mt-4 italic">*From date of installation</p>
                            </InfoCard>

                            <InfoCard title="Conditions" className="flex-1">
                                <ul className="space-y-3">
                                    <ListItem text="Valid only for original owner (non-transferable)." />
                                    <ListItem text="Applicable only on OEM-painted surfaces." />
                                    <ListItem text="Void if repainted, altered, or misused." />
                                    <ListItem text="Must be installed by authorized personnel." />
                                </ul>
                            </InfoCard>

                            {/* Empty spacer to balance grid if needed, or remove if 3-3 distribution preferred */}
                            <div className="hidden flex-1 min-h-[200px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                                <p className="text-text-grey/30 text-sm uppercase tracking-widest">Additional terms apply</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 text-center">
                        <p className="text-text-grey/40 text-xs uppercase tracking-widest leading-relaxed max-w-3xl mx-auto">
                            Disclaimer: This warranty cannot be modified, extended, or transferred. Gentech Guard®'s liability is limited strictly to product replacement for verified defects. Labour costs and loss of vehicle usage are not covered.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function InfoCard({ title, children }: any) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary-blue/30 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white/[0.02]"
            >
                <h3 className="text-white font-bold uppercase tracking-widest text-sm text-left">{title}</h3>
                <ChevronDown size={16} className={`text-primary-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="p-6 pt-0 border-t border-white/5">
                            <div className="pt-4">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ListItem({ text, highlight, error }: any) {
    return (
        <li className="flex items-start gap-3 text-sm font-medium text-text-grey">
            {error ? (
                <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
            ) : (
                <Check size={16} className={`${highlight ? 'text-white' : 'text-primary-blue'} shrink-0 mt-0.5`} />
            )}
            <span className={highlight ? 'text-white font-bold' : ''}>{text}</span>
        </li>
    );
}

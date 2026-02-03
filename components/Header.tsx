"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site-config";

const navLinks = siteConfig.navigation;

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full ${isOpen ? "px-4" : "px-4 sm:px-6 md:px-8"} z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-4 sm:py-5"
                }`}
            style={{
                background: `${scrolled ? "linear-gradient(to right, #000, #111111b3 50%)" : "linear-gradient(to right, #000 25%, transparent 50%)"}`,
            }}
        >
            <div className={`container mx-auto ${isOpen ? "px-6" : "px-0"} flex items-center justify-between gap-8`}>
                <Link href="/" className="relative z-50">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: isAboutPage || scrolled || !scrolled ? 1 : 0,
                            x: isAboutPage || scrolled || !scrolled ? 0 : -10
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-40 md:w-48 h-10 md:h-12 relative"
                    >
                        <Image
                            src="/assets/logo-final-wide.png"
                            alt="Gentech Guard"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-widest text-text-grey hover:text-primary-blue transition-colors whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/home#contact"
                        className="bg-primary-blue hover:bg-white hover:text-dark-bg text-white px-6 py-2 rounded-full text-sm font-black transition-all neon-glow uppercase tracking-wider whitespace-nowrap"
                    >
                        Become a Dealer
                    </Link>
                </nav>

                {/* MOBILE TOGGLE */}
                <button
                    className={`lg:hidden text-white p-2 ${isOpen ? "z-42" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU BACKDROP */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden hidden h-[100dvh] fixed inset-0 bg-black/80 backdrop-blur-md z-40 overscroll-none"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
                        className="lg:hidden bg-dark-bg border-b border-white/10 overflow-hidden relative z-50 py-6 sm:py-8 shadow-[0_500px_0_rgba(0,0,0,0.9)] gpu-accelerated"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg py-2 font-bold uppercase text-center tracking-widest text-text-grey hover:text-primary-blue flex items-center justify-center group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                    <ChevronRight size={20} className="text-primary-blue group-hover:translate-x-1 transition-transform ml-2" />
                                </Link>
                            ))}
                            <Link
                                href="/home#contact"
                                className="bg-primary-blue mt-2 text-white px-6 py-3 rounded-lg text-center font-black uppercase tracking-wider neon-glow active:scale-95 transition-transform touch-manipulation"
                                onClick={() => setIsOpen(false)}
                            >
                                Become a Dealer
                            </Link>
                        </div>
                        {/* Safe area for notched devices */}
                        <div className="h-[env(safe-area-inset-bottom)]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

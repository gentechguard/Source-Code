"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

// Dynamic import to prevent hydration issues
const EnquiryDropdown = dynamic(() => import('@/components/enquiry/EnquiryDropdown'), { ssr: false });
const EnquiryModal = dynamic(() => import('@/components/enquiry/EnquiryModal'), { ssr: false });

import { siteConfig } from "@/lib/site-config";

const navLinks = siteConfig.navigation;

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeForm, setActiveForm] = useState<'customer' | 'dealer' | 'distributor' | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSelectOption = (option: 'customer' | 'dealer' | 'distributor' | 'network') => {
        if (option === 'network') {
            window.location.href = '/home#network';
        } else {
            setActiveForm(option);
            setShowModal(true);
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled ? "glass py-3" : "bg-transparent py-4 sm:py-5"
                }`}
                style={{
                    background: scrolled 
                        ? "linear-gradient(to right, #000 0%, #111 50%, #000 100%)" 
                        : "linear-gradient(to right, #000 0%, transparent 100%)",
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-36 md:w-48 h-10 md:h-12 relative"
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

                    {/* DESKTOP NAV - Fixed layout with gap */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold uppercase tracking-widest text-text-grey hover:text-primary-blue transition-colors whitespace-nowrap"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        {/* Enquiry Dropdown - Fixed width container */}
                        <div className="shrink-0">
                            {isMounted && <EnquiryDropdown onSelectOption={handleSelectOption} />}
                        </div>
                    </nav>

                    {/* MOBILE TOGGLE */}
                    <button
                        className="lg:hidden text-white p-2 z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Backdrop */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="lg:hidden fixed top-0 left-0 right-0 bg-dark-bg border-b border-white/10 z-40 pt-20 pb-8 px-6"
                        >
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg py-3 font-bold uppercase tracking-widest text-text-grey hover:text-primary-blue flex items-center justify-between group border-b border-white/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                        <ChevronRight size={20} className="text-primary-blue group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ))}
                                
                                {/* Mobile Enquiry Options */}
                                <div className="pt-6 mt-2">
                                    <p className="text-white/50 text-xs uppercase tracking-widest mb-4 font-black">Enquiries</p>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleSelectOption('customer');
                                            }}
                                            className="w-full bg-violet-600/20 border border-violet-500/30 text-violet-300 py-4 rounded-xl text-center font-bold uppercase tracking-wider hover:bg-violet-600/30 transition-colors"
                                        >
                                            PPF/Sun Film/Graphene Enquiry
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleSelectOption('dealer');
                                            }}
                                            className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-300 py-4 rounded-xl text-center font-bold uppercase tracking-wider hover:bg-amber-500/30 transition-colors"
                                        >
                                            Become a Dealer
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false);
                                                handleSelectOption('distributor');
                                            }}
                                            className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 py-4 rounded-xl text-center font-bold uppercase tracking-wider hover:bg-emerald-500/30 transition-colors"
                                        >
                                            Become a Distributor
                                        </button>
                                        <Link
                                            href="/home"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-300 py-4 rounded-xl text-center font-bold uppercase tracking-wider hover:bg-blue-500/30 transition-colors block"
                                        >
                                            Our Network
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Enquiry Modal */}
            {isMounted && (
                <EnquiryModal 
                    isOpen={showModal} 
                    onClose={() => setShowModal(false)} 
                    type={activeForm} 
                />
            )}
        </>
    );
}
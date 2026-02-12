"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';
import { useBackButton } from '@/hooks/useBackButton';

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
    const [mobileEnquiryOpen, setMobileEnquiryOpen] = useState(false);
    const pathname = usePathname();
    const isAboutPage = pathname === "/about";

    // Browser back button closes the mobile menu
    useBackButton(isMenuOpen, () => setIsMenuOpen(false));

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 120);
        };
        window.addEventListener("scroll", handleScroll);

        // Listen for custom enquiry open events from any component
        const handleOpenEnquiry = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.type === 'customer' || detail?.type === 'dealer' || detail?.type === 'distributor') {
                setActiveForm(detail.type);
                setShowModal(true);
            }
        };
        window.addEventListener('open-enquiry', handleOpenEnquiry);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('open-enquiry', handleOpenEnquiry);
        };
    }, []);

    const handleSelectOption = (option: 'customer' | 'dealer' | 'distributor' | 'network') => {
        if (option === 'network') {
            window.location.href = '/home#network';
        } else {
            setActiveForm(option);
            setShowModal(true);
        }
    };

    // Lock body scroll when mobile menu is open, reset enquiry toggle on close
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setMobileEnquiryOpen(false);
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ${
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
                    <Link href="/home" className="relative z-10 shrink-0">
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
                        className="lg:hidden text-white p-2 relative z-10"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu - OUTSIDE header for independent root-level z-index */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="lg:hidden fixed inset-0 z-[55] bg-[#0A0A0A] pt-20 pb-8 px-6 overflow-y-auto"
                    >
                        <nav className="flex flex-col gap-1 mt-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: 0.04 * i, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-lg py-3.5 font-bold uppercase tracking-widest text-white/80 hover:text-primary-blue flex items-center justify-between group border-b border-white/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                        <ChevronRight size={20} className="text-primary-blue opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile Enquiry Toggle */}
                        <motion.div
                            className="mt-4"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.04 * navLinks.length, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <button
                                onClick={() => setMobileEnquiryOpen(!mobileEnquiryOpen)}
                                className="w-full text-lg py-3.5 font-bold uppercase tracking-widest text-white/80 hover:text-primary-blue flex items-center justify-between group border-b border-white/5"
                            >
                                Enquiry
                                <ChevronRight
                                    size={20}
                                    className={`text-primary-blue opacity-50 group-hover:opacity-100 transition-all duration-300 ${mobileEnquiryOpen ? 'rotate-90' : ''}`}
                                />
                            </button>

                            <AnimatePresence>
                                {mobileEnquiryOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-3 pt-4 pb-2">
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setMobileEnquiryOpen(false);
                                                    handleSelectOption('customer');
                                                }}
                                                className="w-full bg-violet-600/20 border border-violet-500/30 text-violet-300 py-3.5 rounded-xl text-center font-bold uppercase tracking-wider text-sm hover:bg-violet-600/30 transition-colors"
                                            >
                                                PPF/Sun Film/Graphene Enquiry
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setMobileEnquiryOpen(false);
                                                    handleSelectOption('dealer');
                                                }}
                                                className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-300 py-3.5 rounded-xl text-center font-bold uppercase tracking-wider text-sm hover:bg-amber-500/30 transition-colors"
                                            >
                                                Become a Dealer
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setMobileEnquiryOpen(false);
                                                    handleSelectOption('distributor');
                                                }}
                                                className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 py-3.5 rounded-xl text-center font-bold uppercase tracking-wider text-sm hover:bg-emerald-500/30 transition-colors"
                                            >
                                                Become a Distributor
                                            </button>
                                            <Link
                                                href="/our-network"
                                                onClick={() => { setIsMenuOpen(false); setMobileEnquiryOpen(false); }}
                                                className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-300 py-3.5 rounded-xl text-center font-bold uppercase tracking-wider text-sm hover:bg-blue-500/30 transition-colors block"
                                            >
                                                Our Network
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
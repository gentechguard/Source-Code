"use client";

import { ArrowRight } from "lucide-react";
import FloatingLines from "./FloatingLines";
import FluidGlass from './FluidGlass'
import GlassSurface from "./GlassSurface";

export default function WarrantySection() {
    return (
        <section id="warranty" className="relative w-full h-[600px] overflow-hidden mb-16 bg-black flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <FloatingLines
                    linesGradient={['#00AAFF', '#ffffff', '#00AAFF']}
                    //enabledWaves={['top', 'middle', 'bottom']}
                    enabledWaves={['middle']}
                    lineCount={[5]}
                    lineDistance={[8]}
                    bendRadius={5.0}
                    bendStrength={0}
                    interactive={false}
                    parallax={true}
                    mixBlendMode="screen"
                />
            </div>

            {/* Overlay Gradient for smoother transitions */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none z-10" />

            {/* Content */}
            <div className="relative z-10 w-full h-full container mx-auto p-4 text-center">
                <div className="inline-block relative mb-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 shadow-xl drop-shadow-2xl">
                        E-<span className="text-primary-blue">WARRANTY</span>
                    </h2>
                </div>
                <p className="text-blue-200/80 text-md md:text-lg font-bold tracking-widest uppercase">
                    All of our products are backed by a warranty. <br /> Check your warranty status or register your new product installation.
                </p>
                <a href="/warranty" className="group">
                    <GlassSurface
                        borderRadius={100}
                        width={"fit-content"}
                        className="whitespace-nowrap w-fit px-24 py-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:!shadow-[0_0_16px_0_#00aaff88]"
                        style={{ position: "absolute", maxWidth: "90dvw" }}
                    >
                        <span className="text-xl font-black text-white uppercase w-fit whitespace-nowrap flex items-center justify-center gap-2">
                            <span className="blue-text">Warranty</span>
                            Information
                            <ArrowRight className="w-6 h-6 ml-2" />
                        </span>
                    </GlassSurface>
                </a>


            </div>


        </section>
    );
}

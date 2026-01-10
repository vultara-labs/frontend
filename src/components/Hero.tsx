"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { HeroCard } from "./landing/HeroCard";
import { AUDIT_PARTNERS } from "@/constants";

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
    const yParallax = useTransform(scrollYProgress, [0, 0.6], [0, 100]);

    return (
        <section ref={targetRef} className="relative min-h-screen flex flex-col pt-36 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-animate opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--obsidian-base)]/80 to-[var(--obsidian-base)] z-0" />

            <motion.div
                style={isDesktop ? { opacity, scale, y: yParallax } : {}}
                className="relative z-10 mx-auto max-w-[1280px] px-6 w-full flex-grow flex items-center"
            >
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-7 flex flex-col min-h-[85dvh] lg:min-h-0 justify-center lg:justify-start gap-8 lg:gap-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left py-12 lg:py-0 relative"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[var(--volt)]/20 blur-[80px] rounded-full lg:hidden pointer-events-none animate-pulse-slow" />

                        <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 relative z-10">
                            <div className="inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-3 py-1.5 text-[10px] font-bold text-[var(--warning)] uppercase tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(255,170,0,0.1)]">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--warning)] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--warning)]"></span>
                                </span>
                                <span>Testnet Beta</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                                REAL YIELD. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] bg-[length:200%_auto] animate-gradient">
                                    MADE ACCESSIBLE.
                                </span>
                            </h1>

                            <p className="text-[15px] sm:text-base lg:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-xs sm:max-w-xl mx-auto lg:mx-0">
                                Institutional options strategies, simplified directly on-chain. No inflationary tokens, just pure USDC growth.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 lg:mt-4 w-full sm:w-auto px-4 sm:px-0">
                                <Link href="/dashboard" className="h-11 lg:h-12 px-6 lg:px-8 w-full sm:w-auto flex items-center justify-center gap-2 btn-primary group shadow-[0_0_20px_rgba(204,255,0,0.15)] text-sm lg:text-base font-bold tracking-wide">
                                    <span className="relative z-10">Start Earning</span>
                                    <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    className="h-11 lg:h-12 px-6 lg:px-8 w-full sm:w-auto flex items-center justify-center gap-2 btn-secondary group text-sm lg:text-base font-bold tracking-wide"
                                    aria-label="Learn how Vultara works"
                                    onClick={() => {
                                        document.querySelector("#how-it-works")?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    <PlayCircle size={18} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                                    <span>How it works</span>
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 lg:pt-10 border-t border-white/5 flex flex-col justify-end items-center lg:items-start lg:justify-start gap-6 lg:gap-6 mt-auto lg:mt-0 relative z-10">
                            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center w-full lg:w-auto">
                                <span className="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest text-center lg:text-left w-full lg:w-auto">
                                    Audited & Trusted By
                                </span>
                                <div className="flex gap-x-6 gap-y-4 flex-wrap justify-center items-center">
                                    {AUDIT_PARTNERS.map((partner) => (
                                        <a
                                            key={partner.name}
                                            href={partner.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`h-8 lg:h-10 px-3 lg:px-4 bg-white/[0.02] rounded-lg flex items-center justify-center border border-white/[0.05] hover:border-${partner.hoverColor}/30 hover:bg-${partner.hoverColor}/5 transition-all duration-300 opacity-70 hover:opacity-100 group`}
                                        >
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="h-4 lg:h-6 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="lg:hidden flex flex-col items-center gap-2 opacity-50 animate-bounce pt-4">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    <HeroCard />
                </div>
            </motion.div>
        </section>
    );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PlayCircle, MoreHorizontal } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <section ref={targetRef} className="relative min-h-[110vh] flex flex-col pt-32 pb-10 overflow-hidden">
            {/* Background with Unified Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-animate" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-0" />

            {/* Main Content */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 mx-auto max-w-[1280px] px-6 w-full flex-grow flex items-center"
            >
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="lg:col-span-7 flex flex-col gap-8 max-w-2xl"
                    >
                        {/* Live Badge */}
                        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="tracking-wide">V2.0 LIVE ON MAINNET</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1] text-white">
                            The Salary Engine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
                                for the Open Economy.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-[var(--foreground-muted)] font-normal leading-relaxed max-w-xl tracking-tight">
                            Streamline crypto payroll and earn generic yield on idle USDC. Secure, automated, and compliant financial infrastructure for the future of work.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <button className="h-12 px-8 rounded-lg flex items-center gap-2 btn-neon group">
                                <span>Start Earning</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="h-12 px-8 rounded-lg flex items-center gap-2 btn-outline group">
                                <PlayCircle size={20} className="text-white/60 group-hover:text-white transition-colors" />
                                <span>How it works</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-6 sm:items-center">
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Audited & Trusted By</span>
                            <div className="flex gap-4 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                {['CERTIK', 'HACKEN', 'OPENZEP'].map((partner) => (
                                    <div key={partner} className="h-6 px-3 bg-white/5 rounded flex items-center justify-center text-[10px] text-white font-bold border border-white/5">
                                        {partner}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content: 3D Floating Yield Card */}
                    <motion.div
                        initial={{ opacity: 0, rotateX: 10, rotateY: 10, y: 50 }}
                        animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                        className="lg:col-span-5 relative perspective-1000 w-full flex justify-center lg:justify-end"
                    >
                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        {/* The Unified Class Card */}
                        <div className="card-prime w-full max-w-md rounded-3xl p-8 relative floating-card transform-style-3d bg-[#0A0A0A]/50">

                            {/* Floating Badge (Z-Index Pop) */}
                            <div className="absolute -right-4 -top-6 bg-[#111] border border-white/10 p-3 rounded-2xl shadow-xl flex items-center gap-3 transform translate-z-20 animate-[bounce_3s_infinite]">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                </div>
                                <div className="pr-2">
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Yield Generated</p>
                                    <p className="text-white font-bold">+$1,240.50</p>
                                </div>
                            </div>

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold text-sm shadow-[0_4px_20px_rgba(0,82,255,0.4)] ring-2 ring-white/10">
                                        <span className="font-serif italic text-xl">$</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-xl tracking-tight">USDC Treasury</h3>
                                        <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full w-fit mt-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            Compounding Active
                                        </div>
                                    </div>
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Main Stat */}
                            <div className="mb-8">
                                <p className="text-zinc-500 text-sm font-medium mb-1 tracking-wide">TOTAL BALANCE</p>
                                <h2 className="text-5xl font-bold text-white tracking-tighter tabular-nums">$124,592.00</h2>
                            </div>

                            {/* Chart */}
                            <div className="relative h-24 w-full mb-8">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.1" />
                                            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,100 L0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5 L300,100 Z" fill="url(#chartGradient)" />
                                    <path className="chart-line drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]" d="M0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5" fill="none" stroke="#CCFF00" strokeLinecap="round" strokeWidth="3" />
                                    {/* End Point Dot */}
                                    <circle cx="300" cy="5" r="4" fill="#0A0A0A" stroke="#CCFF00" strokeWidth="2" className="drop-shadow-[0_0_10px_#CCFF00]" />
                                </svg>
                            </div>

                            {/* Secondary Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Current APY</p>
                                    <p className="text-2xl font-bold text-primary">4.5%</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2">Next Payout</p>
                                    <p className="text-2xl font-bold text-white tabular-nums">4h 12m</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

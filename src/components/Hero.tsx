"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, MoreHorizontal, TrendingUp } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col pt-32 pb-10 overflow-hidden">
            {/* Background with Unified Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-grid-animate" />

            {/* Main Content */}
            <div className="relative z-10 mx-auto max-w-[1280px] px-6 w-full flex-grow flex items-center">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col gap-8 max-w-2xl"
                    >
                        {/* Live Badge */}
                        <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary shadow-lg shadow-primary/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v2.0 Now Live on Mainnet
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
                            The Salary Engine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                                for the Open Economy.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl">
                            Streamline crypto payroll and earn generic yield on idle USDC. Secure, automated, and compliant financial infrastructure for the future of work.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <button className="h-12 px-8 rounded-lg flex items-center gap-2 btn-neon">
                                <span>Start Earning</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="h-12 px-8 rounded-lg flex items-center gap-2 btn-outline group">
                                <PlayCircle size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                <span>How it works</span>
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-6 sm:items-center">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Audited & Trusted By</span>
                            <div className="flex gap-4 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                                {['CERTIK', 'HACKEN', 'OPENZEP'].map((partner) => (
                                    <div key={partner} className="h-6 w-20 bg-white/5 rounded flex items-center justify-center text-[10px] text-white font-bold border border-white/5">
                                        {partner}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content: Floating Yield Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative perspective-1000"
                    >
                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* The Unified Class Card */}
                        <div className="card-prime rounded-2xl p-6 relative">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-[#0052FF]/20">
                                        $
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-tight">USDC Treasury</h3>
                                        <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#CCFF00]" />
                                            Compounding Active
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Main Stat */}
                            <div className="mb-6">
                                <div className="flex items-baseline justify-between mb-1">
                                    <p className="text-gray-400 text-sm font-medium">Total Balance</p>
                                    <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded">
                                        +1.2% this week
                                    </span>
                                </div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">$124,592.00</h2>
                            </div>

                            {/* Chart */}
                            <div className="relative h-32 w-full mb-6">
                                {/* CSS Gradient Fade at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />

                                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.2" />
                                            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,100 L0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5 L300,100 Z" fill="url(#chartGradient)" />
                                    <path className="chart-line drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]" d="M0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5" fill="none" stroke="#CCFF00" strokeLinecap="round" strokeWidth="3" />

                                    {/* End Point Dot */}
                                    <circle cx="300" cy="5" r="4" fill="#0A0A0A" stroke="#CCFF00" strokeWidth="2" className="drop-shadow-[0_0_10px_#CCFF00]" />
                                </svg>
                            </div>

                            {/* Secondary Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Current APY</p>
                                    <p className="text-xl font-bold text-primary">4.5%</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                    <p className="text-xs text-gray-500 font-medium uppercase mb-1">Next Payout</p>
                                    <p className="text-xl font-bold text-white">4h 12m</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

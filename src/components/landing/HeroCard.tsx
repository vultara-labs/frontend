"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { Counter } from "./Counter";
import { PROTOCOL } from "@/constants";

export function HeroCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onMouseMove={(e) => {
                if (window.innerWidth >= 1024) handleMouseMove(e);
            }}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative perspective-1000 w-full flex justify-center lg:justify-end py-10 lg:py-10 mt-6 lg:mt-0"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] bg-[var(--volt)] opacity-20 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none will-change-transform"
            />

            <motion.div
                ref={cardRef}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
                className="card-solid w-full max-w-[340px] sm:max-w-md rounded-[1.5rem] lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 relative bg-[var(--obsidian-surface)] will-change-transform mx-auto"
            >
                <motion.div style={{ z: 30 }} className="transform-style-3d">
                    <div className="flex justify-between items-start mb-6 lg:mb-10">
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_20px_rgba(39,117,202,0.4)] ring-1 ring-white/5">
                                <img src="/logos/usdc.svg" alt="USDC" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base lg:text-lg uppercase tracking-wider">USDC Vault</h3>
                                <div className="flex items-center gap-2 text-[8px] lg:text-[10px] text-[var(--volt)] font-bold uppercase tracking-widest bg-[var(--volt-glass)] px-2 py-0.5 rounded-full w-fit mt-1 border border-[var(--volt)]/10">
                                    <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[var(--volt)] animate-pulse" />
                                    Active Strategy
                                </div>
                            </div>
                        </div>
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 text-[var(--text-tertiary)] hover:text-white transition-colors"
                            aria-label="More options"
                        >
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="mb-6 lg:mb-8">
                        <p className="text-[var(--text-tertiary)] text-[10px] font-bold uppercase tracking-widest mb-1 lg:mb-2">Total Balance</p>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter tabular-nums">
                            <Counter from={100000} to={124592.5} />
                        </h2>
                    </div>

                    <div className="relative h-16 lg:h-24 w-full mb-6 lg:mb-8">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,100 L0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5 L300,100 Z" fill="url(#chartGradient)" className="animate-[fadeIn_1.5s_ease-out_0.5s_both]" />
                            <path
                                className="drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]"
                                d="M0,70 Q30,65 60,75 T120,60 T180,45 T240,20 L300,5"
                                fill="none"
                                stroke="#CCFF00"
                                strokeLinecap="round"
                                strokeWidth="3"
                                strokeDasharray="500"
                                strokeDashoffset="500"
                                style={{ animation: "drawLine 2s ease-out 0.3s forwards" }}
                            />
                            <circle cx="300" cy="5" r="5" fill="#0A0A0A" stroke="#CCFF00" strokeWidth="3" className="drop-shadow-[0_0_10px_#CCFF00] animate-[fadeIn_0.3s_ease-out_2s_both]" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:gap-4">
                        <div className="p-3 lg:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                            <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">APY</p>
                            <p className="text-xl lg:text-2xl font-bold text-[var(--volt)] tracking-tighter">{PROTOCOL.APY}%</p>
                        </div>
                        <div className="p-3 lg:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default">
                            <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest mb-1">Next Payout</p>
                            <p className="text-xl lg:text-2xl font-bold text-white tabular-nums tracking-tighter">4h 12m</p>
                        </div>
                    </div>

                    <div className="mt-5 lg:mt-6 pt-4 lg:pt-5 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[var(--volt)]/10 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--volt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[8px] lg:text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">Total Yield Earned</p>
                                </div>
                            </div>
                            <p className="text-[var(--volt)] font-bold tracking-tight text-base lg:text-lg">+$1,240.50</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { TrendingUp, Trophy, ShieldCheck, Lock, Zap } from "lucide-react";
import { Alien } from "@phosphor-icons/react";

export default function CorePillars() {
    return (
        <section id="features" className="py-12 md:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-12 md:mb-16 lg:mb-24 max-w-3xl">
                    <h2 className="mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                        WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] bg-[length:200%_auto] animate-gradient">VULTARA</span>
                    </h2>
                    <p className="max-w-xl text-[15px] sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                        Simple DeFi yield for everyone. Deposit USDC, earn real yield from Thetanuts options strategies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="col-span-1 md:col-span-12 lg:col-span-6 min-h-[440px] lg:min-h-[480px] card-solid rounded-[2rem] p-6 sm:p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--volt)]/5 blur-[80px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-16 lg:h-16 items-center justify-center rounded-2xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                                <TrendingUp size={24} className="lg:w-8 lg:h-8" />
                            </div>
                            <h3 className="mb-2 lg:mb-4 text-xl lg:text-3xl font-black uppercase tracking-tight text-white">Real Yield</h3>
                            <p className="max-w-md text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed">
                                Earn ~4.5% APY on your USDC through Thetanuts options strategies. No token emissions—real yield from market premiums.
                            </p>
                        </div>

                        <div className="relative mt-8 lg:mt-10 group-hover:translate-y-[-5px] transition-transform duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--volt)]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl rounded-lg" />
                            <div className="relative h-48 w-[120%] -mx-8 -mb-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--volt)]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <svg className="absolute bottom-0 left-0 right-0 h-40 w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                                    <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0" fill="none" stroke="#CCFF00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                    <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0 V 100 H 0 Z" fill="url(#yieldGradient)" opacity="0.3" />
                                    <defs>
                                        <linearGradient id="yieldGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[380px] lg:min-h-[480px] card-solid rounded-[2rem] p-6 lg:p-8 flex flex-col group overflow-hidden relative"
                    >
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--volt)]/5 blur-[60px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-12 lg:h-12 items-center justify-center rounded-xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500">
                                <Alien size={24} weight="duotone" className="lg:w-6 lg:h-6" />
                            </div>
                            <h3 className="mb-2 lg:mb-4 text-xl lg:text-2xl font-black uppercase tracking-tight text-white">AI Advisor</h3>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                Meet Nova—your personal DeFi guide. Get strategy explanations and risk assessments in plain language.
                            </p>
                        </div>

                        <div className="mt-auto flex flex-1 items-center justify-center pb-8 relative z-10">
                            <div className="relative w-28 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out">
                                <div className="absolute w-24 h-24 rounded-full border border-dashed border-[var(--border-medium)] animate-[spin_20s_linear_infinite]" />
                                <div className="absolute w-32 h-32 rounded-full border border-dashed border-[var(--border-subtle)] animate-[spin_30s_linear_infinite_reverse]" />
                                <div className="absolute w-16 h-16 rounded-full border border-[var(--volt)]/20 bg-[var(--volt)]/5 backdrop-blur-sm flex items-center justify-center">
                                    <Alien size={24} weight="duotone" className="text-[var(--volt)]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[380px] lg:min-h-[480px] card-solid rounded-[2rem] p-6 lg:p-8 flex flex-col group relative overflow-hidden"
                    >
                        <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-12 lg:h-12 items-center justify-center rounded-xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500">
                            <Trophy size={24} className="lg:w-6 lg:h-6" />
                        </div>
                        <h3 className="mb-2 lg:mb-4 text-xl lg:text-2xl font-black uppercase tracking-tight text-white">Access Tiers</h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            Unlock higher tiers as you deposit more. Each tier comes with priority features and enhanced benefits.
                        </p>

                        <div className="mt-auto pt-8 space-y-3">
                            {[
                                { name: "INITIATE", color: "#6B7280" },
                                { name: "ASSOCIATE", color: "#3B82F6" },
                                { name: "PARTNER", color: "#CCFF00" },
                                { name: "SOVEREIGN", color: "#F59E0B" },
                            ].map((tier, idx) => (
                                <div key={tier.name} className="flex items-center gap-3 group/tier cursor-default">
                                    <div
                                        className={`w-2 h-2 rounded-full transition-all duration-300 group-hover/tier:scale-150`}
                                        style={{
                                            backgroundColor: tier.color,
                                            boxShadow: idx === 2 ? `0 0 10px ${tier.color}` : "none",
                                        }}
                                    />
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider transition-colors group-hover/tier:text-white"
                                        style={{ color: idx === 2 ? tier.color : "var(--text-tertiary)" }}
                                    >
                                        {tier.name}
                                    </span>
                                    {idx === 2 && (
                                        <span className="ml-auto text-[10px] font-bold flex items-center gap-1" style={{ color: tier.color }}>
                                            <Zap size={10} /> ACTIVE
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="col-span-1 md:col-span-12 min-h-[320px] card-solid rounded-[2rem] p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-16 relative overflow-visible group"
                    >
                        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[var(--volt)]/5 blur-[100px] group-hover:bg-[var(--volt)]/10 transition-colors duration-1000" />

                        <div className="flex-1 relative z-10 w-full">
                            <div className="mb-5 lg:mb-6 flex w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-2xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500">
                                <ShieldCheck size={24} className="lg:w-7 lg:h-7" />
                            </div>
                            <h3 className="mb-3 lg:mb-4 text-xl lg:text-2xl font-black uppercase tracking-tighter text-white">Non-Custodial & Secure</h3>
                            <p className="max-w-lg text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed">
                                Your keys, your crypto. Vultara never holds your funds—everything runs through audited smart contracts on Base.
                            </p>
                        </div>

                        <div className="relative h-40 w-40 lg:h-48 lg:w-48 flex-shrink-0 flex items-center justify-center">
                            <div className="relative w-full h-full rounded-[2rem] bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform duration-700">
                                <Lock size={40} className="text-white/30 group-hover:text-[var(--volt)]/60 transition-colors lg:w-12 lg:h-12" />
                                <div className="absolute top-4 right-4 w-2 h-2 bg-[var(--volt)] rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
                                <div className="absolute inset-5 border border-[var(--border-subtle)] rounded-3xl" />
                                <div className="absolute inset-0 bg-grid-animate opacity-30 rounded-[2rem]" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent)" }} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

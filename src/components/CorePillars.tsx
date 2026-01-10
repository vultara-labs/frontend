"use client";

import { motion } from "framer-motion";
import { Gavel, Droplets, Network, Fingerprint, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CorePillars() {
    const [activeLine, setActiveLine] = useState<number | null>(null);

    return (
        <section id="features" className="py-12 md:py-24 lg:py-32 px-4 sm:px-6 relative z-10">
            <div className="mx-auto max-w-[1280px]">
                <div className="mb-12 md:mb-16 lg:mb-24 max-w-3xl">
                    <h2 className="mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                        PROTOCOL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--volt)] via-white to-[var(--volt)] bg-[length:200%_auto] animate-gradient">ARCHITECTURE</span>
                    </h2>
                    <p className="max-w-xl text-[15px] sm:text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
                        Infrastructure built for the automated economy. Precision-engineered modules working in perfect sync.
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
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--volt)]/5 blur-[80px] rounded-full pointer-events-none lg:hidden" />

                        <div className="relative z-10">
                            <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-16 lg:h-16 items-center justify-center rounded-2xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                                <Gavel size={24} className="lg:w-8 lg:h-8" />
                            </div>
                            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                <div>
                                    <h3 className="mb-2 lg:mb-4 text-xl lg:text-3xl font-black uppercase tracking-tight text-white">Automated Compliance</h3>
                                    <p className="max-w-md text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed">Automated tax logic embedded directly into payment streams. Never miss a withholding.</p>
                                </div>
                                <div className="hidden sm:flex flex-col gap-3 text-[10px] font-bold tracking-widest uppercase shrink-0">
                                    <div className={`flex items-center gap-2 transition-colors duration-300 ${activeLine === 1 ? "text-[var(--volt)]" : "text-[var(--text-tertiary)]"}`}>
                                        <div className={`w-2 h-2 rounded-full ${activeLine === 1 ? "bg-[var(--volt)] shadow-[0_0_10px_#CCFF00]" : "bg-[var(--obsidian-elevated)]"}`} />
                                        CALCULATED
                                    </div>
                                    <div className={`flex items-center gap-2 transition-colors duration-300 ${activeLine === 2 ? "text-[var(--info)]" : "text-[var(--text-tertiary)]"}`}>
                                        <div className={`w-2 h-2 rounded-full ${activeLine === 2 ? "bg-[var(--info)] shadow-[0_0_10px_#3B82F6]" : "bg-[var(--obsidian-elevated)]"}`} />
                                        DISTRIBUTED
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mt-8 lg:mt-12 group-hover:translate-y-[-5px] transition-transform duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--volt)]/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 blur-2xl rounded-lg" />
                            <div className="relative w-full overflow-hidden rounded-xl bg-[#080808] border border-white/10 font-mono text-xs p-5 lg:p-6 shadow-2xl">
                                <div className="w-full space-y-2 text-[var(--volt)]/80">
                                    <div className="flex justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
                                        <span className="text-[var(--text-tertiary)] font-bold uppercase tracking-widest text-[10px]">SmartContract.sol</span>
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--obsidian-elevated)]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[var(--obsidian-elevated)]" />
                                        </div>
                                    </div>

                                    <div className="opacity-60 hover:opacity-100 transition-opacity">
                                        <span className="text-purple-400">function</span> <span className="text-[var(--info)]">executePayment</span>() <span className="text-[var(--text-tertiary)]">{"{"}</span>
                                    </div>

                                    <div
                                        onMouseEnter={() => setActiveLine(1)}
                                        onMouseLeave={() => setActiveLine(null)}
                                        className={`pl-4 py-2 border-l-2 transition-all duration-300 cursor-help rounded-r ${activeLine === 1 ? "border-[var(--volt)] bg-[var(--volt)]/10" : "border-transparent hover:bg-white/5"}`}
                                    >
                                        <span className="text-purple-400">uint256</span> tax = (amount * TAX_RATE) / 100;
                                    </div>

                                    <div
                                        onMouseEnter={() => setActiveLine(2)}
                                        onMouseLeave={() => setActiveLine(null)}
                                        className={`pl-4 py-2 border-l-2 transition-all duration-300 cursor-help rounded-r ${activeLine === 2 ? "border-[var(--info)] bg-[var(--info)]/10" : "border-transparent hover:bg-white/5"}`}
                                    >
                                        payable(taxAuthority).transfer(tax);
                                    </div>

                                    <div className="pl-4 py-1.5 border-l-2 border-transparent text-[var(--success)]/40 italic">{"// Auto-distribution success"}</div>
                                    <div className="text-[var(--text-tertiary)] opacity-60">{"}"}</div>
                                </div>
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
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--volt)]/5 blur-[60px] rounded-full pointer-events-none lg:hidden" />

                        <div className="relative z-10">
                            <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-12 lg:h-12 items-center justify-center rounded-xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500">
                                <Droplets size={24} className="lg:w-6 lg:h-6" />
                            </div>
                            <h3 className="mb-2 lg:mb-4 text-xl lg:text-2xl font-black uppercase tracking-tight text-white">Instant Liquidity</h3>
                            <p className="mb-6 text-sm text-[var(--text-secondary)] leading-relaxed">Pay by the second, settled instantly using optimized yield vaults.</p>
                        </div>

                        <div className="mt-auto relative h-48 w-[120%] -mx-8 -mb-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out z-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--volt)]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <svg className="absolute bottom-0 left-0 right-0 h-40 w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0" fill="none" stroke="#CCFF00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0 V 100 H 0 Z" fill="url(#liquidityGradient)" opacity="0.3" />
                                <defs>
                                    <linearGradient id="liquidityGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
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
                            <Network size={24} className="lg:w-6 lg:h-6" />
                        </div>
                        <h3 className="mb-2 lg:mb-4 text-xl lg:text-2xl font-black uppercase tracking-tight text-white">Cross-Chain</h3>
                        <p className="mb-8 text-sm text-[var(--text-secondary)] leading-relaxed">Unified liquidity layer across Base, Ethereum, and Solana.</p>

                        <div className="mt-auto flex flex-1 items-center justify-center pb-8 relative z-10">
                            <div className="relative w-28 h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out">
                                <div className="absolute w-24 h-24 rounded-full border border-dashed border-[var(--border-medium)] animate-[spin_20s_linear_infinite]" />
                                <div className="absolute w-32 h-32 rounded-full border border-dashed border-[var(--border-subtle)] animate-[spin_30s_linear_infinite_reverse]" />
                                <div className="absolute w-16 h-16 rounded-full border border-[var(--volt)]/20 bg-[var(--volt)]/5 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[var(--volt)] shadow-[0_0_20px_#CCFF00] animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        id="security"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="col-span-1 md:col-span-12 min-h-[440px] card-solid rounded-[2rem] p-6 sm:p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 lg:gap-16 relative overflow-visible group"
                    >
                        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[var(--volt)]/5 blur-[100px] group-hover:bg-[var(--volt)]/10 transition-colors duration-1000" />

                        <div className="flex-1 relative z-10 w-full">
                            <div className="mb-5 lg:mb-8 flex w-12 h-12 lg:w-16 lg:h-16 items-center justify-center rounded-2xl bg-white/5 text-[var(--volt)] border border-white/5 group-hover:bg-[var(--volt-glass)] group-hover:border-[var(--volt)]/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                                <Fingerprint size={24} className="lg:w-8 lg:h-8" />
                            </div>
                            <h3 className="mb-3 lg:mb-6 text-xl lg:text-3xl font-black uppercase tracking-tighter text-white">Identity Sovereignty</h3>
                            <p className="max-w-md text-sm lg:text-lg text-[var(--text-secondary)] leading-relaxed">
                                Zero-Knowledge Proofs ensure salary data remains private. Your financial data is encrypted, owned by you, and never exposed to 3rd parties.
                            </p>
                            <div className="mt-8 lg:mt-10 flex flex-wrap gap-3 lg:gap-4">
                                <span className="rounded-full bg-[var(--volt)]/10 px-4 lg:px-5 py-1.5 lg:py-2 text-[10px] lg:text-xs font-bold text-[var(--volt)] border border-[var(--volt)]/20 tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                                    <CheckCircle2 size={12} className="lg:w-[14px] lg:h-[14px]" /> ZK-SNARKs
                                </span>
                                <span className="rounded-full bg-white/5 px-4 lg:px-5 py-1.5 lg:py-2 text-[10px] lg:text-xs font-bold text-white border border-white/10 tracking-widest uppercase">AES-256 Encryption</span>
                            </div>
                        </div>

                        <div className="relative h-40 w-40 lg:h-48 lg:w-48 flex-shrink-0 flex items-center justify-center mt-4 lg:mt-0">
                            <div className="relative w-full h-full rounded-[2rem] bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-2xl group-hover:rotate-3 transition-transform duration-700">
                                <Lock size={40} className="text-white/30 group-hover:text-white/60 transition-colors lg:w-12 lg:h-12" />
                                <div className="absolute top-4 right-4 w-2 h-2 bg-[var(--volt)] rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
                                <div className="absolute inset-5 border border-[var(--border-subtle)] rounded-3xl" />
                                <div className="absolute inset-0 bg-grid-animate opacity-30" style={{ maskImage: "radial-gradient(ellipse at center, black, transparent)" }} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

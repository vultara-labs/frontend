"use client";

import { motion } from "framer-motion";
import { Gavel, Droplets, Network, Fingerprint, Lock } from "lucide-react";

export default function CorePillars() {
    return (
        <section id="features" className="py-32 px-6 relative z-10">
            <div className="mx-auto max-w-[1280px]">
                {/* Header - Unified Style */}
                <div className="mb-20 max-w-3xl">
                    <h2 className="mb-6 text-4xl font-bold uppercase leading-[0.9] tracking-tighter text-white md:text-6xl lg:text-7xl">
                        Protocol <span className="text-primary">Architecture</span>
                    </h2>
                    <p className="max-w-xl text-lg text-[var(--foreground-muted)] leading-relaxed">
                        Infrastructure built for the automated economy.
                        Precision-engineered modules working in perfect sync.
                    </p>
                </div>

                {/* Bento Grid - Unified Cards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

                    {/* Card 1: Compliance */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-1 md:col-span-12 lg:col-span-6 min-h-[420px] card-prime rounded-3xl p-10 flex flex-col justify-between group"
                    >
                        <div>
                            <div className="mb-8 flex w-14 h-14 items-center justify-center rounded-2xl bg-white/5 text-primary border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                <Gavel size={28} />
                            </div>
                            <h3 className="mb-3 text-3xl font-bold uppercase tracking-tight text-white">Automated Compliance</h3>
                            <p className="max-w-md text-[var(--foreground-muted)] text-base leading-relaxed">Automated tax logic embedded directly into payment streams. Smart contracts execute withholding in real-time.</p>
                        </div>

                        {/* Code Visual */}
                        <div className="relative mt-10 group-hover:translate-y-[-5px] transition-transform duration-500">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-xl rounded-lg" />
                            <div className="relative w-full overflow-hidden rounded-xl bg-[#080808] border border-white/10 font-mono text-xs p-6 shadow-2xl">
                                <div className="w-full space-y-3 text-primary/80">
                                    <div className="flex justify-between border-b border-white/5 pb-3 mb-3">
                                        <span className="text-zinc-600 font-bold">SmartContract.sol</span>
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                                        </div>
                                    </div>
                                    <div><span className="text-purple-400">function</span> <span className="text-blue-400">executePayment</span>() <span className="text-zinc-600">{"{"}</span></div>
                                    <div className="pl-4 border-l border-white/5"><span className="text-purple-400">uint256</span> tax = (amount * TAX_RATE) / 100;</div>
                                    <div className="pl-4 border-l border-white/5">payable(taxAuthority).transfer(tax);</div>
                                    <div className="pl-4 border-l border-white/5 text-green-400/50">// Auto-distribution success</div>
                                    <div className="text-zinc-600">{"}"}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Liquidity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[420px] card-prime rounded-3xl p-8 flex flex-col group overflow-hidden"
                    >
                        <div className="relative z-10 text-pretty">
                            <div className="mb-8 flex w-12 h-12 items-center justify-center rounded-2xl bg-white/5 text-primary border border-white/5 group-hover:rotate-12 transition-transform duration-500">
                                <Droplets size={24} />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white">Instant Liquidity</h3>
                            <p className="mb-6 text-sm text-[var(--foreground-muted)] leading-relaxed">Pay by the second, settled instantly. No more waiting for bi-weekly cycles.</p>
                        </div>

                        <div className="mt-auto relative h-40 w-full -mx-8 -mb-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <svg className="absolute bottom-0 left-0 right-0 h-32 w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0" fill="none" stroke="#CCFF00" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0 V 100 H 0 Z" fill="url(#liquidityGradient)" opacity="0.2" />
                                <defs>
                                    <linearGradient id="liquidityGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Card 3: Cross-Chain */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[420px] card-prime rounded-3xl p-8 flex flex-col group"
                    >
                        <div className="mb-8 flex w-12 h-12 items-center justify-center rounded-2xl bg-white/5 text-primary border border-white/5">
                            <Network size={24} />
                        </div>
                        <h3 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white">Cross-Chain</h3>
                        <p className="mb-8 text-sm text-[var(--foreground-muted)] leading-relaxed">Pay in stablecoins across Ethereum, Solana, and L2s seamlessly.</p>

                        <div className="mt-auto flex flex-1 items-center justify-center">
                            <div className="relative w-32 h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute w-32 h-32 rounded-full border border-dashed border-white/10 animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute w-16 h-16 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm" />
                                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_#CCFF00] animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: Identity */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="col-span-1 md:col-span-12 min-h-[300px] card-prime rounded-3xl p-10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group"
                    >
                        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-[120px] group-hover:bg-primary/10 transition-colors duration-700" />

                        <div className="flex-1 relative z-10">
                            <div className="mb-8 flex w-14 h-14 items-center justify-center rounded-2xl bg-white/5 text-primary border border-white/5">
                                <Fingerprint size={28} />
                            </div>
                            <h3 className="mb-4 text-3xl font-bold uppercase tracking-tight text-white">Identity Sovereignty</h3>
                            <p className="max-w-xl text-lg text-[var(--foreground-muted)] leading-relaxed">
                                Zero-Knowledge Proofs ensure salary data remains private. Your financial data is encrypted, owned by you.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 uppercase tracking-wider">ZK-SNARKs</span>
                                <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold text-white border border-white/10 uppercase tracking-wider">Encrypted Metadata</span>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="relative h-40 w-40 flex-shrink-0 flex items-center justify-center">
                            <div className="relative w-full h-full rounded-3xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                                <Lock size={40} className="text-white/50" />
                                <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
                                {/* Biometric Lines */}
                                <div className="absolute inset-4 border border-white/5 rounded-2xl" />
                                <div className="absolute inset-0 bg-grid-animate opacity-20 mask-image:radial-gradient(ellipse_at_center,black,transparent)" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

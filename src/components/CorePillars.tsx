"use client";

import { motion } from "framer-motion";
import { Gavel, Droplets, Network, Fingerprint, Lock } from "lucide-react";

export default function CorePillars() {
    return (
        <section id="features" className="py-24 px-6 relative z-10">
            <div className="mx-auto max-w-[1280px]">
                {/* Header - Unified Style */}
                <div className="mb-16 max-w-3xl">
                    <h2 className="mb-6 text-4xl font-bold uppercase leading-[0.9] tracking-tighter text-white md:text-6xl lg:text-7xl">
                        Protocol <span className="text-primary">Architecture</span>
                    </h2>
                    <p className="max-w-xl text-lg text-gray-400">
                        Infrastructure built for the automated economy.
                        Precision-engineered modules working in perfect sync.
                    </p>
                </div>

                {/* Bento Grid - Unified Cards */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

                    {/* Card 1: Compliance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-12 lg:col-span-6 min-h-[400px] card-prime rounded-2xl p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className="mb-6 flex w-12 h-12 items-center justify-center rounded-xl bg-white/5 text-primary border border-white/5">
                                <Gavel size={24} />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold uppercase tracking-tight text-white">Automated Compliance</h3>
                            <p className="max-w-md text-gray-400">Automated tax logic embedded directly into payment streams. Smart contracts execute withholding in real-time.</p>
                        </div>

                        {/* Code Visual */}
                        <div className="relative mt-8 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur rounded-lg" />
                            <div className="relative w-full overflow-hidden rounded-lg bg-[#080808] border border-white/10 font-mono text-xs p-5">
                                <div className="w-full space-y-2 text-primary/60">
                                    <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
                                        <span className="text-white/40">SmartContract.sol</span>
                                    </div>
                                    <div><span className="text-purple-400">function</span> <span className="text-blue-400">executePayment</span>() <span className="text-white/40">{"{"}</span></div>
                                    <div className="pl-4"><span className="text-purple-400">uint256</span> tax = (amount * TAX_RATE) / 100;</div>
                                    <div className="pl-4">payable(taxAuthority).transfer(tax);</div>
                                    <div className="pl-4 text-white/40">// Auto-distribution</div>
                                    <div className="text-white/40">{"}"}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Liquidity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[400px] card-prime rounded-2xl p-6 flex flex-col"
                    >
                        <div className="mb-6 flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 text-primary border border-white/5">
                            <Droplets size={20} />
                        </div>
                        <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white">Instant Liquidity</h3>
                        <p className="mb-8 text-sm text-gray-400">Pay by the second, settled instantly. No more waiting for bi-weekly cycles.</p>

                        <div className="mt-auto relative h-32 w-full">
                            <svg className="absolute bottom-0 left-0 right-0 h-24 w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                                <path d="M0 45 L10 40 L20 42 L30 35 L40 38 L50 20 L60 25 L70 15 L80 18 L90 5 L100 0" fill="none" stroke="#CCFF00" strokeWidth="2" />
                            </svg>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/10 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Card 3: Cross-Chain */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1 md:col-span-6 lg:col-span-3 min-h-[400px] card-prime rounded-2xl p-6 flex flex-col"
                    >
                        <div className="mb-6 flex w-10 h-10 items-center justify-center rounded-xl bg-white/5 text-primary border border-white/5">
                            <Network size={20} />
                        </div>
                        <h3 className="mb-2 text-xl font-bold uppercase tracking-tight text-white">Cross-Chain</h3>
                        <p className="mb-8 text-sm text-gray-400">Pay in stablecoins across Ethereum, Solana, and L2s seamlessly.</p>

                        <div className="mt-auto flex flex-1 items-center justify-center">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <div className="absolute w-24 h-24 rounded-full border border-dashed border-white/10 animate-spin duration-[10s]" />
                                <div className="absolute w-16 h-16 rounded-full border border-primary/20 bg-primary/5" />
                                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#CCFF00]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: Identity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1 md:col-span-12 min-h-[280px] card-prime rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                    >
                        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-[100px]" />

                        <div className="flex-1 relative z-10">
                            <div className="mb-6 flex w-12 h-12 items-center justify-center rounded-xl bg-white/5 text-primary border border-white/5">
                                <Fingerprint size={24} />
                            </div>
                            <h3 className="mb-3 text-2xl font-bold uppercase tracking-tight text-white">Identity Sovereignty</h3>
                            <p className="max-w-xl text-lg text-gray-400">
                                Zero-Knowledge Proofs ensure salary data remains private. Your financial data is encrypted, owned by you.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20">ZK-SNARKs</span>
                                <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold text-white border border-white/5">Encrypted Metadata</span>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="relative h-32 w-32 flex-shrink-0 flex items-center justify-center">
                            <div className="relative w-full h-full rounded-2xl bg-black border border-white/10 flex items-center justify-center">
                                <Lock size={32} className="text-primary/50" />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

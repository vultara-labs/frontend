"use client";

import { motion } from "framer-motion";
import { TrendUp, ArrowSquareOut, ShieldCheck, LockKey, Clock, Pulse } from "@phosphor-icons/react";
import Link from "next/link";
import { PROTOCOL } from "@/constants";

export default function VaultPage() {
    return (
        <div className="h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column: Hero/Action */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md mx-auto lg:mx-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 mb-8">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-[10px] font-bold text-[var(--success)] uppercase tracking-wider">Strategy Active</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl font-black text-[var(--volt)] tracking-tighter mb-2">
                        {PROTOCOL.APY}%
                    </h1>
                    <p className="text-xl font-bold text-white mb-6">Cash-Secured Put Vault</p>

                    <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                        Earn organic yield on your USDC by selling out-of-the-money put options.
                        Powered by <a href="https://thetanuts.finance" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--volt)] underline decoration-[var(--border-medium)] underline-offset-4 transition-colors">Thetanuts Finance V4</a>.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href="/dashboard/deposit"
                            className="flex-1 h-14 rounded-xl bg-[var(--volt)] text-black font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(204,255,0,0.15)] flex items-center justify-center gap-2"
                        >
                            Deposit USDC
                        </Link>
                        <a
                            href="https://docs.thetanuts.finance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 h-14 rounded-xl border border-[var(--border-medium)] text-white font-bold text-base hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                        >
                            View Docs <ArrowSquareOut size={16} />
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Visual/Stats */}
                <div className="hidden lg:grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] flex flex-col justify-between h-40 group hover:border-[var(--volt)]/50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[var(--volt)]/10 flex items-center justify-center text-[var(--volt)] group-hover:scale-110 transition-transform">
                            <Pulse size={24} weight="duotone" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">$2.4M</p>
                            <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Total Value Locked</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] flex flex-col justify-between h-40 group hover:border-[var(--volt)]/50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[var(--volt)]/10 flex items-center justify-center text-[var(--volt)] group-hover:scale-110 transition-transform">
                            <Clock size={24} weight="duotone" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white mb-1">None</p>
                            <p className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Lock-up Period</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-2 p-6 rounded-3xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] flex items-center justify-between group hover:border-[var(--volt)]/50 transition-colors"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <ShieldCheck size={20} weight="duotone" className="text-[var(--success)]" />
                                <span className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Risk Assessment</span>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)]">Standard market risk options strategy.</p>
                            <p className="text-sm text-[var(--text-secondary)]">Audited contracts.</p>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20">
                            <span className="text-sm font-bold text-[var(--warning)]">Medium Risk</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

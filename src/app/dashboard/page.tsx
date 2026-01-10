"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Vault, Lightning, ArrowCircleDown, Wallet, TrendUp, Crown, Lock } from "@phosphor-icons/react";
import { PROTOCOL, DEMO } from "@/constants";
import { Counter } from "@/components/landing/Counter";

export default function DashboardPage() {
    const totalBalance = DEMO.USER_BALANCE + DEMO.MONTHLY_EARNINGS;

    // Logic Mockup for Tiers
    const currentLevel = 2; // Elite
    const nextLevelThreshold = 10000;
    const progress = (totalBalance / nextLevelThreshold) * 100;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-1">
                        Overview
                    </h1>
                    <p className="text-[var(--text-secondary)]">Welcome back to Vultara.</p>
                </div>
            </header>

            {/* Main Stats Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-[2rem] overflow-hidden bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-8 lg:p-12 mb-8 group"
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[var(--volt)]/10 transition-colors duration-700" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Wallet size={20} className="text-[var(--volt)]" weight="duotone" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Total Balance</span>
                        </div>
                        <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-2">
                            <Counter from={0} to={totalBalance} />
                        </h2>
                        <div className="flex items-center gap-3">
                            <span className="text-lg text-[var(--text-secondary)]">USDC</span>
                            <div className="px-3 py-1 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-1.5">
                                <TrendUp size={14} className="text-[var(--success)]" weight="bold" />
                                <span className="text-xs font-bold text-[var(--success)]">+{PROTOCOL.APY}% APY Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link href="/dashboard/deposit" className="flex-1 h-14 rounded-xl bg-[var(--volt)] text-black font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
                            Deposit
                        </Link>
                        <Link href="/dashboard/withdraw" className="flex-1 h-14 rounded-xl bg-white/[0.05] border border-white/10 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2">
                            Withdraw
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Feature Grid - Vault, AI, Tier */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Vault Module */}
                <Link href="/dashboard/vault" className="block h-full">
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="group relative h-full min-h-[280px] p-8 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--volt)]/50 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <Vault size={120} weight="duotone" className="text-[var(--volt)]" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[var(--volt)]/10 border border-[var(--volt)]/20 flex items-center justify-center text-[var(--volt)] mb-6 relative z-10">
                            <Vault size={24} weight="duotone" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Vault Strategy</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-4">
                                Thetanuts V4 Cash-Secured Puts.
                            </p>
                            <div className="flex items-center gap-2 text-[var(--volt)] font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                Manage <ArrowUpRight weight="bold" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* AI Module */}
                <Link href="/dashboard/ai" className="block h-full">
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="group relative h-full min-h-[280px] p-8 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-subtle)] overflow-hidden hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <Lightning size={120} weight="duotone" className="text-amber-400" />
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6 relative z-10">
                            <Lightning size={24} weight="duotone" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Nova AI</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-4">
                                Risk analysis & strategy advisor.
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                Chat Now <ArrowUpRight weight="bold" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Access Tier Module */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative h-full min-h-[280px] p-8 rounded-[2rem] bg-gradient-to-b from-[var(--obsidian-surface)] to-black border border-[var(--border-subtle)] overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-all duration-500">
                        <Crown size={120} weight="duotone" className="text-blue-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                                <Crown size={24} weight="duotone" />
                            </div>
                            <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                                Associate
                            </span>
                        </div>

                        <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">Associate Tier</h3>
                        <p className="text-[var(--text-secondary)] text-sm mb-6">
                            Verified member. Unlock Partner status at $5,000.
                        </p>

                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-[var(--text-secondary)]">Next: Partner</span>
                                <span className="text-white">$5,000</span>
                            </div>
                            <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${(totalBalance / 5000) * 100}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] pt-1">
                                Deposit ${(5000 - totalBalance).toLocaleString()} more to upgrade
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

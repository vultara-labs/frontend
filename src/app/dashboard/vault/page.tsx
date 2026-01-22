"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TrendUp, ShieldCheck, Clock, ChartLineUp, ArrowRight, CaretDown, CaretUp, Vault, Lightning, Info } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { PROTOCOL } from "@/constants";
import { useDashboardData } from "@/hooks";
import { EpochTimerCompact } from "@/components/dashboard/EpochTimer";
import { TransactionHistory } from "@/components/dashboard/TransactionHistory";

export default function VaultPage() {
    const { ethPrice, currentAPY, marketLoading, vaultBalanceETH, vaultBalanceUSD } = useDashboardData();
    const [showDetails, setShowDetails] = useState(false);

    const hasPosition = vaultBalanceETH > 0;
    const loading = marketLoading;
    const dynamicAPY = currentAPY.toFixed(1);

    // Calculate next epoch end
    function getNextFridayExpiry() {
        const now = new Date();
        const nextFriday = new Date();
        const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;
        nextFriday.setUTCDate(now.getUTCDate() + daysUntilFriday);
        nextFriday.setUTCHours(8, 0, 0, 0);
        if (now > nextFriday) nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
        const diff = nextFriday.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days}d ${hours}h`;
    }

    const epochEnd = getNextFridayExpiry();
    const strikePrice = ethPrice ? Math.floor(ethPrice * PROTOCOL.VAULT.STRIKE_PERCENTAGE / 50) * 50 : 0;

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Clean Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center sm:text-left"
                >
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="px-2.5 py-1 rounded-lg bg-[var(--volt)]/10 border border-[var(--volt)]/20 label text-[var(--volt)] flex items-center gap-1.5">
                            <Lightning weight="fill" size={12} />
                            Powered by Thetanuts V4
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                        ETH Yield Vault
                    </h1>
                    <p className="text-body text-[var(--text-secondary)]">
                        Earn yield through automated covered call strategies.
                    </p>
                </motion.header>

                {/* Main Hero Card - APY + Position */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-2xl sm:rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-6 sm:p-8 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--volt)]/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                        {/* APY Display */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <ChartLineUp size={16} className="text-[var(--success)]" weight="bold" />
                                <span className="label text-[var(--text-tertiary)]">Current APY</span>
                            </div>
                            <p className="text-5xl sm:text-6xl lg:text-7xl font-black text-[var(--volt)] tracking-tighter leading-none">
                                {loading ? "..." : `${dynamicAPY}%`}
                            </p>
                            <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">
                                Variable, based on market volatility
                            </p>
                        </div>

                        {/* Your Position */}
                        <div className="sm:text-right">
                            <div className="flex items-center gap-2 mb-2 sm:justify-end">
                                <Vault size={16} className="text-[var(--text-secondary)]" weight="duotone" />
                                <span className="label text-[var(--text-tertiary)]">Your Position</span>
                            </div>
                            {hasPosition ? (
                                <>
                                    <p className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
                                        {vaultBalanceETH.toFixed(4)} <span className="text-lg text-[var(--text-tertiary)]">ETH</span>
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                                        ≈ ${vaultBalanceUSD.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-4xl sm:text-5xl font-black text-[var(--text-tertiary)] tracking-tight leading-none">
                                        0 <span className="text-lg">ETH</span>
                                    </p>
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                                        No active position
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="relative z-10 grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--border-subtle)]">
                        <div className="text-center sm:text-left">
                            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Strike</p>
                            <p className="text-sm font-bold text-white font-mono">${loading ? "..." : strikePrice.toLocaleString("en-US")}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Epoch Ends</p>
                            <EpochTimerCompact />
                        </div>
                        <div className="text-center sm:text-right">
                            <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Security</p>
                            <p className="text-sm font-bold text-[var(--success)] flex items-center gap-1 justify-center sm:justify-end">
                                <ShieldCheck size={14} weight="fill" /> Audited
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Simple Strategy Flow - Horizontal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]"
                >
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">1</span>
                        <span className="text-[var(--text-secondary)] hidden sm:inline">Deposit ETH</span>
                    </div>
                    <ArrowRight size={14} className="text-[var(--text-tertiary)]" />
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-6 h-6 rounded-full bg-[var(--volt)]/20 text-[var(--volt)] flex items-center justify-center text-[10px] font-bold">2</span>
                        <span className="text-[var(--text-secondary)] hidden sm:inline">Sell Covered Calls</span>
                    </div>
                    <ArrowRight size={14} className="text-[var(--text-tertiary)]" />
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-6 h-6 rounded-full bg-[var(--success)]/20 text-[var(--success)] flex items-center justify-center text-[10px] font-bold">3</span>
                        <span className="text-[var(--text-secondary)] hidden sm:inline">Earn Premium</span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <Link
                        href="/dashboard/deposit"
                        className="btn-primary h-14 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2"
                    >
                        {hasPosition ? "Add More" : "Deposit"}
                    </Link>
                    <Link
                        href="/dashboard/withdraw"
                        className="btn-secondary h-14 flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                    >
                        Withdraw
                    </Link>
                </motion.div>

                {/* Collapsible Details */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.04] transition-colors text-left group"
                    >
                        <div className="flex items-center gap-2">
                            <Info size={16} className="text-[var(--text-tertiary)]" />
                            <span className="text-sm font-medium text-[var(--text-secondary)]">Strategy Details & Risks</span>
                        </div>
                        {showDetails ? (
                            <CaretUp size={16} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                        ) : (
                            <CaretDown size={16} className="text-[var(--text-tertiary)] group-hover:text-white transition-colors" />
                        )}
                    </button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 sm:p-8 mt-3 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)] space-y-6">

                                    {/* Strategy Visual Flow */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-[var(--volt)]/10 border border-[var(--volt)]/20 flex items-center justify-center">
                                                <Lightning size={16} className="text-[var(--volt)]" weight="fill" />
                                            </div>
                                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">Covered Call Strategy</h4>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {[
                                                { step: 1, title: "You Deposit", desc: "ETH goes into vault", color: "info" },
                                                { step: 2, title: "Vault Sells Calls", desc: `Strike: $${strikePrice.toLocaleString("en-US")}`, color: "volt" },
                                                { step: 3, title: "Collect Premium", desc: "Weekly earnings", color: "success" },
                                                { step: 4, title: "Auto-Compound", desc: "Reinvest gains", color: "warning" },
                                            ].map((item) => (
                                                <div key={item.step} className="relative p-4 rounded-xl bg-white/[0.03] border border-[var(--border-subtle)] text-center hover:bg-white/[0.05] transition-colors">
                                                    <div className={`w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center text-sm font-bold ${item.color === 'info' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        item.color === 'volt' ? 'bg-[var(--volt)]/10 text-[var(--volt)] border border-[var(--volt)]/20' :
                                                            item.color === 'success' ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20' :
                                                                'bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20'
                                                        }`}>
                                                        {item.step}
                                                    </div>
                                                    <p className="text-xs font-bold text-white mb-1">{item.title}</p>
                                                    <p className="text-[10px] text-[var(--text-tertiary)]">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* What is a Covered Call? */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20">
                                        <h5 className="label text-[var(--volt)] mb-2">What is a Covered Call?</h5>
                                        <p className="text-body-sm text-[var(--text-secondary)] leading-relaxed">
                                            A <span className="text-white font-medium">covered call</span> is when you own an asset (ETH) and sell someone the <em>right</em> to buy it at a higher price (strike price).
                                            You collect a <span className="text-[var(--volt)] font-medium">premium</span> upfront. If ETH stays below the strike, you keep both your ETH and the premium.
                                            If ETH goes above the strike, your gains are capped but you still profit.
                                        </p>
                                    </div>

                                    {/* Epoch Cycle */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Clock size={16} className="text-[var(--warning)]" />
                                            <h4 className="text-sm font-bold text-white">Weekly Epoch Cycle</h4>
                                        </div>
                                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {["Friday 8AM UTC", "Options Sold", "Week Passes", "Options Expire", "Premium Collected"].map((step, i) => (
                                                <div key={i} className="flex items-center gap-2 shrink-0">
                                                    <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] whitespace-nowrap font-medium">
                                                        {step}
                                                    </div>
                                                    {i < 4 && <ArrowRight size={10} className="text-[var(--text-tertiary)]" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Outcomes Grid */}
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-3">Possible Outcomes</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="p-4 rounded-xl bg-[var(--success)]/5 border border-[var(--success)]/20">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TrendUp size={16} className="text-[var(--success)]" weight="fill" />
                                                    <span className="label text-[var(--success)]">Best Case</span>
                                                </div>
                                                <p className="text-body-sm text-[var(--text-secondary)]">
                                                    ETH stays below strike → Keep 100% of ETH + Premium earned.
                                                </p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-[var(--warning)]/5 border border-[var(--warning)]/20">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <ChartLineUp size={16} className="text-[var(--warning)]" weight="fill" />
                                                    <span className="label text-[var(--warning)]">ETH Moons</span>
                                                </div>
                                                <p className="text-body-sm text-[var(--text-secondary)]">
                                                    ETH goes above strike → Gains capped, but still profitable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Risks */}
                                    <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-[var(--border-subtle)]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <ShieldCheck size={14} className="text-[var(--text-tertiary)]" weight="fill" />
                                            <span className="label text-[var(--text-secondary)]">Risks to Understand</span>
                                        </div>
                                        <ul className="space-y-2 text-body-sm text-[var(--text-secondary)]">
                                            <li className="flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                                <span><strong className="text-white">APY is Variable</strong> — Depends on market volatility.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                                <span><strong className="text-white">Capped Upside</strong> — Gains limited to strike price.</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="w-1 h-1 rounded-full bg-[var(--warning)] mt-2 shrink-0" />
                                                <span><strong className="text-white">Smart Contract Risk</strong> — Mitigated by audits.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>


                {/* Transaction History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <TransactionHistory limit={5} />
                </motion.div>

            </div>
        </div>
    );
}


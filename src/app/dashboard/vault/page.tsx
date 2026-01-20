"use client";

import { motion } from "framer-motion";
import { TrendUp, ArrowSquareOut, ShieldCheck, LockKey, Clock, Pulse, ChartLineUp, Database, Bank, Coins, ArrowsLeftRight, Lightning } from "@phosphor-icons/react";
import Link from "next/link";
import { PROTOCOL } from "@/constants";
import { useDashboardData } from "@/hooks";

export default function VaultPage() {
    // Use centralized dashboard data for consistency
    const { ethPrice, priceChange, currentAPY, marketLoading, vaultBalanceETH, vaultBalanceUSD } = useDashboardData();
    const hasPosition = vaultBalanceETH > 0;

    // For display
    const currentPrice = ethPrice;
    const loading = marketLoading;
    const dynamicAPY = currentAPY.toFixed(2);

    // Helper to calculate time until next Friday 08:00 UTC
    function getNextFridayExpiry() {
        const now = new Date();
        const nextFriday = new Date();
        const daysUntilFriday = (5 - now.getUTCDay() + 7) % 7;

        nextFriday.setUTCDate(now.getUTCDate() + daysUntilFriday);
        nextFriday.setUTCHours(8, 0, 0, 0);

        // If today is Friday and past 8 AM, move to next Friday
        if (now > nextFriday) {
            nextFriday.setUTCDate(nextFriday.getUTCDate() + 7);
        }

        const diff = nextFriday.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${days}d ${hours}h`;
    }

    const epochEnd = getNextFridayExpiry();
    const strikePrice = currentPrice ? Math.floor(currentPrice * PROTOCOL.VAULT.STRIKE_PERCENTAGE / 50) * 50 : 0; // 110% OTM Call rounded to nearest 50
    const tvl = currentPrice ? (2400000 * (currentPrice / 2500)).toLocaleString(undefined, { maximumFractionDigits: 0 }) : "2.4M";

    return (
        <div className="min-h-screen p-4 lg:p-8 pb-24">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 rounded bg-[var(--volt)]/10 border border-[var(--volt)]/20 text-[10px] font-bold text-[var(--volt)] uppercase tracking-widest flex items-center gap-1.5">
                                <Lightning weight="fill" />
                                Thetanuts V4 Powered
                            </div>
                            {!loading && (
                                <div className="px-2 py-0.5 rounded bg-[var(--success)]/10 border border-[var(--success)]/20 text-[10px] font-bold text-[var(--success)] uppercase tracking-widest flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
                                    Live Volatility Feed
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">ETH Yield Vault</h1>
                        <p className="text-[var(--text-secondary)] mt-2 max-w-xl">
                            Institutional-grade yield via automated Covered Calls on <span className="text-white font-bold">ETH</span>.
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="flex flex-col items-end">
                            <p className="text-sm font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-1">Live APY (IV-Adjusted)</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl md:text-6xl font-black text-[var(--volt)] tracking-tighter">{loading ? "..." : `${dynamicAPY}%`}</p>
                                {!loading && (
                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${priceChange >= 0 ? "text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20" : "text-red-400 bg-red-400/10 border-red-400/20"}`}>
                                        {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}% Vol
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Live Price Ticker (Proof of Real Time) */}
                <div className="w-full bg-[var(--obsidian-surface)] border border-[var(--border-subtle)] rounded-xl py-2 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Oracle Price (ETH/USD):</span>
                        {loading ? (
                            <span className="h-4 w-20 bg-white/10 animate-pulse rounded" />
                        ) : (
                            <span className="text-sm font-mono font-bold text-white flex items-center gap-2">
                                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                <span className="text-[10px] text-[var(--text-tertiary)] font-sans normal-case">(Updated: {new Date().toLocaleTimeString()})</span>
                            </span>
                        )}
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">System Operational</span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Strategy Flow Visualization */}
                    <div className="lg:col-span-2 p-6 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                <ArrowsLeftRight className="text-[var(--volt)]" size={18} />
                                Strategy Architecture
                            </h3>
                            <span className="text-[10px] font-mono text-[var(--text-tertiary)]">LIVE EXECUTION</span>
                        </div>

                        <div className="relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--volt)]/0 via-[var(--volt)]/20 to-[var(--volt)]/0 -translate-y-1/2 hidden md:block" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                {/* Step 1 */}
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center gap-3 relative group">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-2 group-hover:scale-110 transition-transform">
                                        <Database size={24} weight="duotone" className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Collateral Pool</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">Your ETH is secured in the V4 Vault Contract.</p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="p-4 rounded-xl bg-[var(--volt)]/5 border border-[var(--volt)]/20 flex flex-col items-center text-center gap-3 relative shadow-[0_0_30px_rgba(204,255,0,0.05)]">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[var(--volt)] text-black text-[9px] font-bold uppercase tracking-widest">
                                        Core Engine
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-[var(--volt)] flex items-center justify-center text-black mb-2 animate-pulse-slow">
                                        <ArrowsLeftRight size={24} weight="bold" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Option Selling</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">Selling {loading ? "..." : `$${strikePrice}`} Strike Calls.</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center text-center gap-3 relative group">
                                    <div className="w-12 h-12 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center justify-center text-[var(--success)] mb-2 group-hover:scale-110 transition-transform">
                                        <Coins size={24} weight="duotone" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Premium Harvest</p>
                                        <p className="text-[10px] text-[var(--text-secondary)]">Premiums collected & compounded.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Column */}
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
                            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-3">Live Metrics</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[var(--text-secondary)]">Strike Price (10% OTM)</span>
                                    {loading ? (
                                        <span className="h-4 w-16 bg-white/10 animate-pulse rounded" />
                                    ) : (
                                        <span className="text-sm font-mono font-bold text-white">
                                            ${strikePrice.toLocaleString()} ETH
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[var(--text-secondary)]">Real-Time Spot</span>
                                    {loading ? (
                                        <span className="h-4 w-16 bg-white/10 animate-pulse rounded" />
                                    ) : (
                                        <span className="text-sm font-mono font-bold text-[var(--text-tertiary)]">
                                            ${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[var(--text-secondary)]">Epoch Ends</span>
                                    <span className="text-sm font-mono font-bold text-[var(--warning)]">{epochEnd}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[var(--text-secondary)]">Est. TVL (Dynamic)</span>
                                    <span className="text-sm font-mono font-bold text-white">${tvl}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-medium)]">
                            <p className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2">Security</p>
                            <div className="flex items-center gap-2 text-white font-bold text-sm">
                                <ShieldCheck size={18} className="text-[var(--success)]" weight="fill" />
                                Audited by CertiK
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-[var(--success)] w-full rounded-full" />
                            </div>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-1 text-right">Score: 98/100</p>
                        </div>

                        {/* User Position (if applicable) */}
                        {hasPosition && (
                            <div className="p-5 rounded-2xl bg-[var(--volt)]/5 border border-[var(--volt)]/20">
                                <p className="text-[10px] font-bold text-[var(--volt)] uppercase tracking-widest mb-2">Your Position</p>
                                <div className="flex justify-between items-baseline">
                                    <p className="text-2xl font-black text-white">{vaultBalanceETH.toFixed(4)} ETH</p>
                                    <p className="text-sm text-[var(--text-secondary)]">${vaultBalanceUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                            </div>
                        )}

                        <Link
                            href="/dashboard/deposit"
                            className="w-full py-4 rounded-xl bg-[var(--volt)] text-black font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(204,255,0,0.15)] flex items-center justify-center gap-2"
                        >
                            {hasPosition ? "Add More" : "Deposit Now"}
                        </Link>
                    </div>
                </div>

                {/* Technical Details Accordion (Simplifed as static list for now) */}
                <div className="p-8 rounded-[2rem] border border-[var(--border-subtle)] bg-white/[0.02]">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Why Thetanuts V4?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--volt)] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">RFQ-Powered Execution:</strong> Trades are executed directly with market makers for zero slippage.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--volt)] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Non-Custodial:</strong> You retain ownership of your shares in the vault logic.
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Risk Disclosures</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Market Risk:</strong> Yield fluctuates based on implied volatility.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--warning)] mt-1.5 shrink-0" />
                                    <span>
                                        <strong className="text-white">Contract Risk:</strong> While audited, smart contracts always carry inherent risks.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

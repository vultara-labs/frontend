"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    ExternalLink,
    Zap,
    ChevronRight,
    Lock,
    TrendingUp,
    Info,
    Shield,
    Calendar
} from "lucide-react";

export default function VaultPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto min-h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 lg:mb-12 border-b border-[var(--border-subtle)] pb-6 lg:pb-8">
                <div>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors mb-4 lg:mb-6 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Dashboard</span>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-2">
                        USDC Vault
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[var(--volt)]/10 border border-[var(--volt)]/20 text-[10px] uppercase font-bold tracking-wider text-[var(--volt)]">
                            Core Strategy
                        </span>
                        <span className="text-[var(--text-secondary)] text-sm">•</span>
                        <span className="text-[var(--text-secondary)] text-sm">Powered by Thetanuts Finance V3</span>
                    </div>
                </div>
                <a
                    href="https://thetanuts.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-medium)] text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.05] transition-all text-xs font-bold uppercase tracking-wider mt-4 sm:mt-0"
                >
                    View Contract
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12">
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 p-5 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[var(--obsidian-uplift)] to-[var(--obsidian-surface)] border border-[var(--border-medium)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--info)]/5 blur-3xl pointer-events-none" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 lg:mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[var(--info)]/10 flex items-center justify-center border border-[var(--info)]/20">
                                <img src="/logos/usdc.svg" alt="USDC" className="w-6 h-6 lg:w-8 lg:h-8" />
                            </div>
                            <div>
                                <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">Cash-Secured Put</h2>
                                <p className="text-sm text-[var(--text-secondary)]">Organic Yield Strategy</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Current APY</p>
                            <p className="text-2xl lg:text-3xl font-mono font-medium text-[var(--volt)]">4.5%</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
                        {[
                            { label: "Your Deposit", value: "$124,592.50", sub: "USDC" },
                            { label: "Total Earned", value: "+$1,240.50", sub: "USDC", highlight: true },
                            { label: "TVL", value: "$2.4M", sub: "USDC" },
                            { label: "Next Round", value: "Fri, 12PM", sub: "UTC" },
                        ].map((stat, i) => (
                            <div key={i} className="p-3 lg:p-4 rounded-lg lg:rounded-xl bg-black/20 border border-[var(--border-subtle)]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">{stat.label}</p>
                                <p className={`text-base lg:text-lg font-mono font-medium ${stat.highlight ? "text-[var(--success)]" : "text-white"}`}>{stat.value}</p>
                                <p className="text-[10px] text-[var(--text-tertiary)] mt-1">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                        <button className="flex-1 py-3 lg:py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm lg:text-base">
                            <Zap size={18} />
                            Deposit
                        </button>
                        <Link href="/dashboard/withdraw" className="flex-1 py-3 lg:py-4 rounded-xl border border-[var(--border-medium)] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2 text-sm lg:text-base">
                            Withdraw
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-5 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-base)] border border-[var(--border-medium)]"
                >
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mb-4 lg:mb-6">
                        <Info size={16} className="text-[var(--text-secondary)]" />
                        Vault Details
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Strategy Type", value: "Options Selling" },
                            { label: "Underlying", value: "ETH" },
                            { label: "Strike Selection", value: "Delta 0.1 (OTM)" },
                            { label: "Performance Fee", value: "10%" },
                            { label: "Management Fee", value: "0%" },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--border-subtle)] last:border-0">
                                <span className="text-xs lg:text-sm text-[var(--text-secondary)]">{row.label}</span>
                                <span className="text-xs lg:text-sm font-medium text-white text-right">{row.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* How it Works Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
            >
                <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white">How it works</h3>
                    <div className="h-px bg-white/[0.05] flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Lock,
                            title: "1. Deposit",
                            desc: "USDC deposit anda dikunci di smart contract sebagai kolateral (jaminan)."
                        },
                        {
                            icon: TrendingUp,
                            title: "2. Sell Options",
                            desc: "Vault otomatis menjual 'Put Options' mingguan ke market makers."
                        },
                        {
                            icon: Calendar,
                            title: "3. Earn Premium",
                            desc: "Anda menerima premium opsi sebagai yield. Jika harga ETH stabil/naik, anda untung."
                        },
                    ].map((step, i) => (
                        <div key={i} className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)] relative group">
                            <div className="absolute top-4 right-4 lg:top-6 lg:right-6 text-3xl lg:text-4xl font-black text-white/[0.02] group-hover:text-[var(--volt)]/10 transition-colors">
                                0{i + 1}
                            </div>
                            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-[var(--volt)]/10 flex items-center justify-center mb-3 lg:mb-4 text-[var(--volt)]">
                                <step.icon size={18} className="lg:w-5 lg:h-5" />
                            </div>
                            <h4 className="font-bold text-white mb-2 text-sm lg:text-base">{step.title}</h4>
                            <p className="text-xs lg:text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Risk Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl lg:rounded-2xl bg-[var(--warning)]/[0.05] border border-[var(--warning)]/[0.1] p-4 lg:p-6 flex gap-3 lg:gap-4"
            >
                <Shield size={20} className="text-[var(--warning)] shrink-0 mt-0.5 lg:mt-1" />
                <div>
                    <h4 className="font-bold text-[var(--warning)] mb-1 text-xs lg:text-sm uppercase tracking-wide">Risk Disclosure</h4>
                    <p className="text-xs lg:text-sm text-[var(--warning)]/60 leading-relaxed max-w-3xl">
                        Vault "Cash-Secured Put" memiliki risiko pasar. Jika harga aset underlying (ETH) jatuh drastis di bawah Strike Price saat expiry, vault akan tereksekusi untuk membeli ETH tersebut. Nilai aset anda dalam USD mungkin turun sementara, namun anda tetap memiliki aset ETH tersebut. Pastikan anda memahami risiko options selling.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

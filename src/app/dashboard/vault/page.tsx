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
        <div className="p-8 max-w-[1200px] mx-auto min-h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-white/[0.05] pb-8">
                <div>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-white transition-colors mb-6 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Dashboard</span>
                    </Link>
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">
                        USDC Vault
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[var(--volt)]/10 border border-[var(--volt)]/20 text-[10px] uppercase font-bold tracking-wider text-[var(--volt)]">
                            Core Strategy
                        </span>
                        <span className="text-[#A1A1AA] text-sm">•</span>
                        <span className="text-[#A1A1AA] text-sm">Powered by Thetanuts Finance V3</span>
                    </div>
                </div>
                <a
                    href="https://thetanuts.finance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.1] text-[#A1A1AA] hover:text-white hover:bg-white/[0.05] transition-all text-xs font-bold uppercase tracking-wider"
                >
                    View Contract
                    <ExternalLink size={14} />
                </a>
            </div>

            {/* Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[var(--obsidian-uplift)] to-[var(--obsidian-surface)] border border-white/[0.08] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl pointer-events-none" />

                    <div className="flex items-start justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#2775CA]/10 flex items-center justify-center border border-[#2775CA]/20">
                                <img src="/logos/usdc.svg" alt="USDC" className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Cash-Secured Put</h2>
                                <p className="text-sm text-[#A1A1AA]">Organic Yield Strategy</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] mb-1">Current APY</p>
                            <p className="text-3xl font-mono font-medium text-[var(--volt)]">4.5%</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "Your Deposit", value: "$124,592.50", sub: "USDC" },
                            { label: "Total Earned", value: "+$1,240.50", sub: "USDC", highlight: true },
                            { label: "TV\L", value: "$2.4M", sub: "USDC" },
                            { label: "Next Round", value: "Fri, 12PM", sub: "UTC" },
                        ].map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#52525B] mb-2">{stat.label}</p>
                                <p className={`text-lg font-mono font-medium ${stat.highlight ? "text-emerald-400" : "text-white"}`}>{stat.value}</p>
                                <p className="text-[10px] text-[#52525B] mt-1">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 py-4 rounded-xl bg-[var(--volt)] text-black font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            <Zap size={18} />
                            Deposit
                        </button>
                        <Link href="/dashboard/withdraw" className="flex-1 py-4 rounded-xl border border-white/[0.1] text-white font-bold uppercase tracking-widest hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2">
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
                    className="p-8 rounded-3xl bg-[var(--obsidian-base)] border border-white/[0.08]"
                >
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white mb-6">
                        <Info size={16} className="text-[#A1A1AA]" />
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
                            <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.05] last:border-0">
                                <span className="text-sm text-[#A1A1AA]">{row.label}</span>
                                <span className="text-sm font-medium text-white text-right">{row.value}</span>
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
                        <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative group">
                            <div className="absolute top-6 right-6 text-4xl font-black text-white/[0.02] group-hover:text-[var(--volt)]/10 transition-colors">
                                0{i + 1}
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-[var(--volt)]/10 flex items-center justify-center mb-4 text-[var(--volt)]">
                                <step.icon size={20} />
                            </div>
                            <h4 className="font-bold text-white mb-2">{step.title}</h4>
                            <p className="text-sm text-[#A1A1AA] leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Risk Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl bg-amber-500/[0.05] border border-amber-500/[0.1] p-6 flex gap-4"
            >
                <Shield size={20} className="text-amber-500 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-amber-500 mb-1 text-sm uppercase tracking-wide">Risk Disclosure</h4>
                    <p className="text-sm text-amber-200/60 leading-relaxed max-w-3xl">
                        Vault "Cash-Secured Put" memiliki risiko pasar. Jika harga aset underlying (ETH) jatuh drastis di bawah Strike Price saat expiry, vault akan tereksekusi untuk membeli ETH tersebut. Nilai aset anda dalam USD mungkin turun sementara, namun anda tetap memiliki aset ETH tersebut. Pastikan anda memahami risiko options selling.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

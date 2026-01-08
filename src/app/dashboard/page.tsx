"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Zap,
    ChevronRight,
    Clock,
    Shield
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between pb-6 border-b border-white/[0.05]">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="text-[var(--text-secondary)] font-medium">
                        Welcome back. Your wealth is compounding.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
                            Vault Active
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Card - The Hero Component of Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 relative p-8 rounded-3xl bg-gradient-to-br from-[var(--obsidian-uplift)] to-[var(--obsidian-surface)] border border-white/[0.08] overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[var(--volt)]/10 transition-colors duration-700" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 opacity-80">
                            <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                                <Wallet size={14} className="text-[var(--volt)]" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
                                Total Balance (USDC)
                            </span>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-6xl md:text-7xl font-medium tracking-tighter text-white mb-4">
                                $124,592<span className="text-white/40">.50</span>
                            </h2>
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/10">
                                <TrendingUp size={14} className="text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-400">+$1,240.50</span>
                                <span className="text-xs font-medium text-emerald-500/60 uppercase tracking-wide">
                                    This Month
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Stats Stack */}
                <div className="space-y-6">
                    {/* APY Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 p-6 rounded-3xl bg-[var(--obsidian-base)] border border-white/[0.08] relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
                                Current APY
                            </span>
                            <Zap size={16} className="text-[var(--volt)]" />
                        </div>
                        <p className="text-4xl font-medium tracking-tighter text-[var(--volt)]">
                            4.5%
                        </p>
                        <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">
                            Organic yield from Thetanuts V3 options strategies.
                        </p>
                    </motion.div>

                    {/* Next Payout Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 p-6 rounded-3xl bg-[var(--obsidian-base)] border border-white/[0.08]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
                                Next Payout
                            </span>
                            <Clock size={16} className="text-white/40" />
                        </div>
                        <p className="text-4xl font-medium tracking-tighter text-white">
                            4h 12m
                        </p>
                        <div className="w-full bg-white/[0.05] h-1 mt-4 rounded-full overflow-hidden">
                            <div className="bg-[var(--volt)] h-full w-[85%] shadow-[0_0_10px_var(--volt)]" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Deposit Funds", desc: "Add USDC to start earning", icon: ArrowUpRight, href: "#", color: "text-[var(--volt)]" },
                    { title: "Withdraw IDR", desc: "Instant transfer to Bank/E-wallet", icon: ArrowDownRight, href: "/dashboard/withdraw", color: "text-blue-400" },
                    { title: "Shieldie AI", desc: "Analyze risks & strategies", icon: Zap, href: "/dashboard/ai", color: "text-purple-400" },
                ].map((action, i) => (
                    <Link key={i} href={action.href}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-3 rounded-xl bg-white/[0.05] ${action.color}`}>
                                    <action.icon size={24} />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/40 transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--volt)] transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-sm text-[#A1A1AA]">
                                {action.desc}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Activity Feed */}
            <div className="rounded-3xl border border-white/[0.05] bg-[var(--obsidian-surface)] overflow-hidden">
                <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#A1A1AA]">
                        Recent Activity
                    </h3>
                    <button className="text-xs text-[var(--volt)] hover:underline font-bold uppercase tracking-wider">
                        View All
                    </button>
                </div>
                <div className="divide-y divide-white/[0.05]">
                    {[
                        { type: "Yield", amount: "+$12.50", label: "Weekly Premium", date: "2h ago", icon: TrendingUp, color: "text-emerald-400" },
                        { type: "Deposit", amount: "+$5,000.00", label: "Salary Deposit", date: "3d ago", icon: ArrowUpRight, color: "text-[var(--volt)]" },
                        { type: "Withdraw", amount: "-$1,500.00", label: "IDR Cashout (BCA)", date: "1w ago", icon: ArrowDownRight, color: "text-white" },
                    ].map((item, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center border border-white/[0.05]">
                                    <item.icon size={18} className={item.color} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white mb-0.5">{item.label}</p>
                                    <p className="text-xs text-[#A1A1AA]">{item.date}</p>
                                </div>
                            </div>
                            <span className={`font-mono font-medium ${item.amount.startsWith("+") ? "text-emerald-400" : "text-white"}`}>
                                {item.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

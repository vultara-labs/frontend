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
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="text-[var(--text-secondary)] font-medium">
                        Welcome back. Your wealth is compounding.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-xs text-[var(--success)] font-bold uppercase tracking-widest">
                            Vault Active
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Balance Card - The Hero Component of Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[var(--obsidian-uplift)] to-[var(--obsidian-surface)] border border-[var(--border-medium)] overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[var(--volt)]/10 transition-colors duration-700" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 lg:mb-6 opacity-80">
                            <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                                <Wallet size={14} className="text-[var(--volt)]" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                Total Balance (USDC)
                            </span>
                        </div>

                        <div className="mb-6 lg:mb-8">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-white mb-4">
                                $124,592<span className="text-white/40">.50</span>
                            </h2>
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/10">
                                <TrendingUp size={14} className="text-[var(--success)]" />
                                <span className="text-sm font-bold text-[var(--success)]">+$1,240.50</span>
                                <span className="text-xs font-medium text-[var(--success)]/60 uppercase tracking-wide">
                                    This Month
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Stats Stack */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                    {/* APY Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-base)] border border-[var(--border-medium)] relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-3 lg:mb-4">
                            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                Current APY
                            </span>
                            <Zap size={16} className="text-[var(--volt)]" />
                        </div>
                        <p className="text-2xl lg:text-4xl font-medium tracking-tighter text-[var(--volt)]">
                            4.5%
                        </p>
                        <p className="text-[10px] lg:text-xs text-[var(--text-secondary)] mt-2 leading-relaxed hidden lg:block">
                            Organic yield from Thetanuts V3 options strategies.
                        </p>
                    </motion.div>

                    {/* Next Payout Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-base)] border border-[var(--border-medium)]"
                    >
                        <div className="flex justify-between items-start mb-3 lg:mb-4">
                            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                                Next Payout
                            </span>
                            <Clock size={16} className="text-[var(--text-tertiary)]" />
                        </div>
                        <p className="text-2xl lg:text-4xl font-medium tracking-tighter text-white">
                            4h 12m
                        </p>
                        <div className="w-full bg-white/[0.05] h-1 mt-3 lg:mt-4 rounded-full overflow-hidden">
                            <div className="bg-[var(--volt)] h-full w-[85%] shadow-[0_0_10px_var(--volt)]" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {[
                    { title: "Deposit Funds", desc: "Add USDC to start earning", icon: ArrowUpRight, href: "#", color: "text-[var(--volt)]" },
                    { title: "Withdraw IDR", desc: "Instant transfer to Bank/E-wallet", icon: ArrowDownRight, href: "/dashboard/withdraw", color: "text-[var(--info)]" },
                    { title: "Shieldie AI", desc: "Analyze risks & strategies", icon: Zap, href: "/dashboard/ai", color: "text-purple-400" },
                ].map((action, i) => (
                    <Link key={i} href={action.href}>
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-5 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.05] hover:border-[var(--border-medium)] transition-all cursor-pointer group h-full"
                        >
                            <div className="flex items-start justify-between mb-6 lg:mb-8">
                                <div className={`p-2.5 lg:p-3 rounded-lg lg:rounded-xl bg-white/[0.05] ${action.color}`}>
                                    <action.icon size={20} className="lg:w-6 lg:h-6" />
                                </div>
                                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] group-hover:text-white group-hover:border-[var(--border-bright)] transition-all">
                                    <ChevronRight size={14} className="lg:w-4 lg:h-4" />
                                </div>
                            </div>
                            <h3 className="text-base lg:text-lg font-bold text-white mb-1 group-hover:text-[var(--volt)] transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-[var(--text-secondary)]">
                                {action.desc}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Activity Feed */}
            <div className="rounded-2xl lg:rounded-3xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                        Recent Activity
                    </h3>
                    <button className="text-[10px] lg:text-xs text-[var(--volt)] hover:underline font-bold uppercase tracking-wider">
                        View All
                    </button>
                </div>
                <div className="divide-y divide-[var(--border-subtle)]">
                    {[
                        { type: "Yield", amount: "+$12.50", label: "Weekly Premium", date: "2h ago", icon: TrendingUp, color: "text-[var(--success)]" },
                        { type: "Deposit", amount: "+$5,000.00", label: "Salary Deposit", date: "3d ago", icon: ArrowUpRight, color: "text-[var(--volt)]" },
                        { type: "Withdraw", amount: "-$1,500.00", label: "IDR Cashout (BCA)", date: "1w ago", icon: ArrowDownRight, color: "text-white" },
                    ].map((item, i) => (
                        <div key={i} className="p-4 lg:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-3 lg:gap-4">
                                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/[0.03] flex items-center justify-center border border-[var(--border-subtle)]">
                                    <item.icon size={16} className={`lg:w-[18px] lg:h-[18px] ${item.color}`} />
                                </div>
                                <div>
                                    <p className="text-xs lg:text-sm font-bold text-white mb-0.5">{item.label}</p>
                                    <p className="text-[10px] lg:text-xs text-[var(--text-secondary)]">{item.date}</p>
                                </div>
                            </div>
                            <span className={`font-mono text-sm lg:text-base font-medium ${item.amount.startsWith("+") ? "text-[var(--success)]" : "text-white"}`}>
                                {item.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

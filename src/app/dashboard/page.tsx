"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    TrendUp,
    ArrowCircleUp,
    ArrowCircleDown,
    Wallet,
    Lightning,
    CaretRight,
    Clock,
    Tray,
} from "@phosphor-icons/react";
import { EmptyState, ActivitySkeleton, CardSkeleton } from "@/components/ui";

// Mock data - in production this would come from API/blockchain
const MOCK_USER_DATA = {
    balance: 2450.00,
    monthlyEarnings: 9.18,
    apy: 4.5,
    nextPayout: "4h 12m",
    payoutProgress: 85,
    activities: [
        { type: "Yield", amount: "+$2.30", label: "Weekly Premium", date: "2h ago", icon: TrendUp, color: "text-[var(--success)]" },
        { type: "Deposit", amount: "+$500.00", label: "Salary Deposit", date: "3d ago", icon: ArrowCircleUp, color: "text-[var(--volt)]" },
        { type: "Withdraw", amount: "-$200.00", label: "IDR Cashout (BCA)", date: "1w ago", icon: ArrowCircleDown, color: "text-white" },
    ]
};

// Set to true to test empty state
const DEMO_EMPTY_STATE = false;
const DEMO_LOADING_STATE = false;

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(DEMO_LOADING_STATE);
    const [userData, setUserData] = useState<typeof MOCK_USER_DATA | null>(null);

    // Simulate data loading
    useEffect(() => {
        if (DEMO_LOADING_STATE) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setUserData(DEMO_EMPTY_STATE ? null : MOCK_USER_DATA);
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setUserData(DEMO_EMPTY_STATE ? null : MOCK_USER_DATA);
        }
    }, []);

    const hasBalance = userData && userData.balance > 0;
    const hasActivities = userData && userData.activities.length > 0;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                        Dashboard
                    </h1>
                    <p className="text-[var(--text-secondary)] font-medium">
                        {hasBalance ? "Preview mode. Connect wallet to see your actual data." : "Welcome! Start your journey."}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${hasBalance
                        ? "bg-[var(--warning)]/10 border border-[var(--warning)]/20"
                        : "bg-white/[0.03] border border-[var(--border-subtle)]"
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${hasBalance ? "bg-[var(--warning)] animate-pulse" : "bg-[var(--text-tertiary)]"}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${hasBalance ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`}>
                            {hasBalance ? "Demo Mode" : "No Deposits"}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Balance Card */}
                {isLoading ? (
                    <div className="lg:col-span-2">
                        <CardSkeleton />
                    </div>
                ) : hasBalance ? (
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
                                    ${Math.floor(userData!.balance).toLocaleString()}<span className="text-white/40">.{(userData!.balance % 1).toFixed(2).slice(2)}</span>
                                </h2>
                                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/10">
                                    <TrendUp size={14} weight="duotone" className="text-[var(--success)]" />
                                    <span className="text-sm font-bold text-[var(--success)]">+${userData!.monthlyEarnings.toLocaleString()}</span>
                                    <span className="text-xs font-medium text-[var(--success)]/60 uppercase tracking-wide">
                                        This Month
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-surface)] border border-dashed border-[var(--border-medium)] overflow-hidden"
                    >
                        <EmptyState
                            title="No deposits yet"
                            description="Make your first deposit to start earning yield on your USDC."
                            icon={<Wallet size={28} className="text-[var(--volt)]" />}
                            action={{
                                label: "Make First Deposit",
                                onClick: () => window.location.href = '/dashboard/vault'
                            }}
                        />
                    </motion.div>
                )}

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
                            <Lightning size={16} weight="duotone" className="text-[var(--volt)]" />
                        </div>
                        <p className="text-2xl lg:text-4xl font-medium tracking-tighter text-[var(--volt)]">
                            {userData?.apy || 4.5}%
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
                            <Clock size={16} weight="duotone" className="text-[var(--text-tertiary)]" />
                        </div>
                        <p className="text-2xl lg:text-4xl font-medium tracking-tighter text-white">
                            {userData?.nextPayout || "—"}
                        </p>
                        <div className="w-full bg-white/[0.05] h-1 mt-3 lg:mt-4 rounded-full overflow-hidden">
                            <div
                                className="bg-[var(--volt)] h-full shadow-[0_0_10px_var(--volt)]"
                                style={{ width: `${userData?.payoutProgress || 0}%` }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {[
                    { title: "Deposit Funds", desc: "Add USDC to start earning", icon: ArrowCircleUp, href: "/dashboard/deposit", color: "text-[var(--volt)]" },
                    { title: "Withdraw IDR", desc: "Instant transfer to Bank/E-wallet", icon: ArrowCircleDown, href: "/dashboard/withdraw", color: "text-[var(--info)]" },
                    { title: "Nova AI", desc: "Analyze risks & strategies", icon: Lightning, href: "/dashboard/ai", color: "text-amber-400" },
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
                                    <CaretRight size={14} weight="bold" className="lg:w-4 lg:h-4" />
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
                    {hasActivities && (
                        <button className="text-[10px] lg:text-xs text-[var(--volt)] hover:underline font-bold uppercase tracking-wider">
                            View All
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="divide-y divide-[var(--border-subtle)]">
                        <ActivitySkeleton />
                        <ActivitySkeleton />
                        <ActivitySkeleton />
                    </div>
                ) : hasActivities ? (
                    <div className="divide-y divide-[var(--border-subtle)]">
                        {userData!.activities.map((item, i) => (
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
                ) : (
                    <EmptyState
                        title="No activity yet"
                        description="Your transaction history will appear here once you start using Vultara."
                        icon={<Tray size={28} weight="duotone" className="text-[var(--text-tertiary)]" />}
                    />
                )}
            </div>
        </div>
    );
}

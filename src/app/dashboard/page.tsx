"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendUp, ArrowCircleUp, ArrowCircleDown, Wallet, Lightning, CaretRight, Tray } from "@phosphor-icons/react";
import { EmptyState, ActivitySkeleton, CardSkeleton } from "@/components/ui";
import { ProtocolStatus } from "@/components/dashboard/ProtocolStatus";
import { PROTOCOL, DEMO } from "@/constants";
import { splitBalance } from "@/lib/formatters";

const MOCK_ACTIVITIES = [
    { type: "Yield", amount: "+$2.30", label: "Weekly Premium", date: "2h ago", icon: TrendUp, color: "text-[var(--success)]" },
    { type: "Deposit", amount: "+$500.00", label: "Salary Deposit", date: "3d ago", icon: ArrowCircleUp, color: "text-[var(--volt)]" },
    { type: "Withdraw", amount: "-$200.00", label: "IDR Cashout (BCA)", date: "1w ago", icon: ArrowCircleDown, color: "text-white" },
];

const DEMO_EMPTY_STATE = false;
const DEMO_LOADING_STATE = false;

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(DEMO_LOADING_STATE);
    const [liveApy, setLiveApy] = useState<number>(PROTOCOL.APY);
    const [userData, setUserData] = useState<{
        balance: number;
        monthlyEarnings: number;
        apy: number;
        activities: typeof MOCK_ACTIVITIES;
    } | null>(null);

    useEffect(() => {
        const dynamicRate = 4.2 + Math.random() * 0.6;
        const formattedRate = Number(dynamicRate.toFixed(2));
        setLiveApy(formattedRate);

        if (DEMO_LOADING_STATE) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setUserData(DEMO_EMPTY_STATE ? null : { balance: DEMO.USER_BALANCE, monthlyEarnings: DEMO.MONTHLY_EARNINGS, apy: formattedRate, activities: MOCK_ACTIVITIES });
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setUserData(DEMO_EMPTY_STATE ? null : { balance: DEMO.USER_BALANCE, monthlyEarnings: DEMO.MONTHLY_EARNINGS, apy: formattedRate, activities: MOCK_ACTIVITIES });
        }
    }, []);

    const hasBalance = userData && userData.balance > 0;
    const hasActivities = userData && userData.activities.length > 0;

    const quickActions = [
        { title: "Deposit Funds", desc: "Add USDC to start earning", icon: ArrowCircleUp, href: "/dashboard/deposit", color: "text-[var(--volt)]" },
        { title: "Withdraw IDR", desc: "Instant transfer to Bank/E-wallet", icon: ArrowCircleDown, href: "/dashboard/withdraw", color: "text-[var(--info)]" },
        { title: "Nova AI", desc: "Analyze risks & strategies", icon: Lightning, href: "/dashboard/ai", color: "text-amber-400" },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6 lg:space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="text-sm text-[var(--text-secondary)]">{hasBalance ? "Preview mode. Connect wallet to see your actual data." : "Welcome! Start your journey."}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${hasBalance ? "bg-[var(--warning)]/10 border border-[var(--warning)]/20" : "bg-white/[0.03] border border-[var(--border-subtle)]"}`}>
                        <span className={`w-2 h-2 rounded-full ${hasBalance ? "bg-[var(--warning)] animate-pulse" : "bg-[var(--text-tertiary)]"}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${hasBalance ? "text-[var(--warning)]" : "text-[var(--text-tertiary)]"}`}>{hasBalance ? "Demo Mode" : "No Deposits"}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {isLoading ? (
                    <div className="lg:col-span-2">
                        <CardSkeleton />
                    </div>
                ) : hasBalance ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 relative p-4 sm:p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[var(--obsidian-uplift)] to-[var(--obsidian-surface)] border border-[var(--border-medium)] overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[var(--volt)]/10 transition-colors duration-700" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4 lg:mb-6 opacity-80">
                                <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center">
                                    <Wallet size={14} className="text-[var(--volt)]" />
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Total Balance (USDC)</span>
                            </div>

                            <div className="mb-6 lg:mb-8">
                                {(() => {
                                    const { whole, decimal } = splitBalance(userData!.balance);
                                    return (
                                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-white mb-3">
                                            ${whole}<span className="text-white/40">.{decimal}</span>
                                        </h2>
                                    );
                                })()}
                                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/10">
                                    <TrendUp size={14} weight="duotone" className="text-[var(--success)]" />
                                    <span className="text-sm font-bold text-[var(--success)]">+${userData!.monthlyEarnings.toLocaleString()}</span>
                                    <span className="text-xs text-[var(--success)]/60 uppercase tracking-widest font-bold">This Month</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 relative p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-surface)] border border-dashed border-[var(--border-medium)] overflow-hidden">
                        <EmptyState
                            title="No deposits yet"
                            description="Make your first deposit to start earning yield on your USDC."
                            icon={<Wallet size={28} className="text-[var(--volt)]" />}
                            action={{
                                label: "Make First Deposit",
                                onClick: () => (window.location.href = "/dashboard/vault"),
                            }}
                        />
                    </motion.div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-base)] border border-[var(--border-medium)] relative overflow-hidden">
                        <div className="flex justify-between items-start mb-3 lg:mb-4">
                            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">Current APY</span>
                            <Lightning size={16} weight="duotone" className="text-[var(--volt)]" />
                        </div>
                        <p className="text-2xl lg:text-4xl font-bold tracking-tighter text-[var(--volt)]">{userData?.apy || PROTOCOL.APY}%</p>
                        <div className="mt-3 pt-3 border-t border-white/5">
                            <p className="text-[10px] lg:text-xs text-[var(--text-secondary)] leading-relaxed">
                                Powered by{" "}
                                <a href="https://thetanuts.finance" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--volt)] transition-colors font-bold border-b border-white/20 hover:border-[var(--volt)]">
                                    Thetanuts Finance
                                </a>
                            </p>
                            <p className="text-[10px] text-[var(--text-tertiary)] mt-0.5">Basic Volatility Strategy (V4)</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-[var(--obsidian-base)] border border-[var(--border-medium)] flex flex-col justify-center">
                        <ProtocolStatus balance={userData?.balance || 0} />
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {quickActions.map((action, i) => (
                    <Link key={i} href={action.href}>
                        <motion.div whileHover={{ y: -5 }} className="p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-white/[0.02] border border-[var(--border-subtle)] hover:bg-white/[0.05] hover:border-[var(--border-medium)] transition-all cursor-pointer group h-full">
                            <div className="flex items-start justify-between mb-4 lg:mb-6">
                                <div className={`p-2.5 lg:p-3 rounded-lg lg:rounded-xl bg-white/[0.05] ${action.color}`}>
                                    <action.icon size={20} className="lg:w-6 lg:h-6" />
                                </div>
                                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-tertiary)] group-hover:text-white group-hover:border-[var(--border-bright)] transition-all">
                                    <CaretRight size={14} weight="bold" className="lg:w-4 lg:h-4" />
                                </div>
                            </div>
                            <h3 className="text-base lg:text-lg font-bold text-white mb-1 group-hover:text-[var(--volt)] transition-colors">{action.title}</h3>
                            <p className="text-xs lg:text-sm text-[var(--text-secondary)]">{action.desc}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="rounded-2xl lg:rounded-3xl border border-[var(--border-subtle)] bg-[var(--obsidian-surface)] overflow-hidden">
                <div className="p-4 lg:p-6 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <h3 className="text-xs lg:text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">Recent Activity</h3>
                    {hasActivities && (
                        <button className="text-[10px] lg:text-xs text-[var(--volt)] hover:underline font-bold uppercase tracking-wider">View All</button>
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
                                <span className={`font-mono text-sm lg:text-base font-bold ${item.amount.startsWith("+") ? "text-[var(--success)]" : "text-white"}`}>{item.amount}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState title="No activity yet" description="Your transaction history will appear here once you start using Vultara." icon={<Tray size={28} weight="duotone" className="text-[var(--text-tertiary)]" />} />
                )}
            </div>
        </div>
    );
}

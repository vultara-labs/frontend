"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Vault, Lightning, TrendUp, Crown } from "@phosphor-icons/react";
import { ACCESS_LEVELS } from "@/constants";
import { TierDetailsModal } from "@/components/dashboard/TierDetailsModal";
import { VaultEmptyState, SkeletonBalance, IconBox, StaggerContainer } from "@/components/ui";
import { useDashboardData } from "@/hooks";

export default function DashboardPage() {
    // Use centralized dashboard data hook (auto-switches between demo/live)
    const {
        isPreviewMode,
        vaultBalanceETH,
        vaultBalanceUSD,
        currentAPY,
        marketLoading,
    } = useDashboardData();

    const [isTierModalOpen, setIsTierModalOpen] = useState(false);

    // For display purposes
    const vaultBalance = vaultBalanceETH;
    const totalBalance = vaultBalanceUSD;
    const loading = marketLoading;

    // Dynamic Tier Logic based on ACCESS_LEVELS
    // [INITIATE, ASSOCIATE, PARTNER, SOVEREIGN]
    const matchedTierIndex = [...ACCESS_LEVELS].reverse().findIndex(t => totalBalance >= t.min);
    // Because we reversed, the index is from the end. Convert back to original index.
    const originalIndex = ACCESS_LEVELS.length - 1 - matchedTierIndex;
    const currentTier = ACCESS_LEVELS[originalIndex >= 0 ? originalIndex : 0];
    const nextTier = ACCESS_LEVELS[originalIndex + 1];

    const toTitleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const currentTierName = toTitleCase(currentTier.name);
    const nextTierName = nextTier ? toTitleCase(nextTier.name) : "Max Level";
    const nextLevelThreshold = nextTier ? nextTier.min : currentTier.min;

    const progress = nextTier
        ? Math.min((totalBalance / nextTier.min) * 100, 100)
        : 100;

    const CurrentTierIcon = currentTier.icon;
    const tierColorMap: Record<string, string> = {
        INITIATE: "var(--text-secondary)",
        ASSOCIATE: "var(--info)",
        PARTNER: "var(--volt)",
        SOVEREIGN: "var(--warning)"
    };
    const tierColor = tierColorMap[currentTier.name] || "var(--text-secondary)";

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-1">
                        Overview
                    </h1>
                    <p className="text-body text-[var(--text-secondary)]">Welcome back to Vultara.</p>
                </div>
            </header>

            {/* Main Stats Hero - Show Empty State for First-Time Users */}
            {vaultBalance === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[var(--obsidian-surface)] border border-[var(--border-medium)] mb-6 sm:mb-8"
                >
                    <VaultEmptyState />
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[var(--obsidian-surface)] border border-[var(--border-medium)] p-6 sm:p-10 lg:p-12 mb-6 sm:mb-8 group"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--volt)]/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-[var(--volt)]/10 transition-colors duration-700" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Vault size={20} className="text-[var(--volt)]" weight="duotone" />
                                <span className="label text-[var(--text-secondary)]">Vault Balance</span>
                            </div>
                            {loading ? (
                                <SkeletonBalance />
                            ) : (
                                <>
                                    <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-2 leading-none">
                                        {vaultBalance.toFixed(4)}
                                        <span className="text-2xl sm:text-3xl lg:text-4xl text-[var(--text-tertiary)] ml-2">ETH</span>
                                    </h2>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                        <span className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">≈ ${totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="px-2 sm:px-3 py-1 rounded-full bg-[var(--success)]/10 border border-[var(--success)]/20 flex items-center gap-1.5 w-fit">
                                                <TrendUp size={12} className="text-[var(--success)]" weight="bold" />
                                                <span className="text-[10px] sm:text-xs font-bold text-[var(--success)]">~{currentAPY}% APY</span>
                                            </div>
                                            <span className="text-[10px] text-[var(--text-tertiary)] italic label lowercase">*Variable</span>
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-[var(--text-tertiary)] mt-1 italic">Yields are strategy-dependent and not guaranteed.</p>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                            <Link href="/dashboard/deposit" className="btn-primary h-12 sm:h-14 px-8 flex items-center justify-center gap-2 w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2">
                                Deposit
                            </Link>
                            <Link href="/dashboard/withdraw" className="btn-secondary h-12 sm:h-14 px-8 flex items-center justify-center gap-2 w-full sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2">
                                Withdraw
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}


            {/* Feature Grid - Vault, AI, Tier */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Vault Module */}
                <Link href="/dashboard/vault" className="block h-full">
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -4 }}
                        className="group relative h-full min-h-[260px] p-6 sm:p-8 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--volt)]/50 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <Vault size={120} weight="duotone" className="text-[var(--volt)]" />
                        </div>
                        <IconBox icon={Vault} color="var(--volt)" size="lg" className="mb-6 relative z-10" />

                        <div className="relative z-10">
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">Vault Strategy</h3>
                            <p className="text-body-sm text-[var(--text-secondary)] mb-4">
                                Thetanuts V4 Cash-Secured Puts.
                            </p>
                            <div className="flex items-center gap-2 text-[var(--volt)] label group-hover:gap-3 transition-all">
                                Manage <ArrowUpRight weight="bold" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* AI Module */}
                <Link href="/dashboard/ai" className="block h-full">
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -4 }}
                        className="group relative h-full min-h-[260px] p-6 sm:p-8 rounded-[2rem] bg-[var(--obsidian-surface)] border border-[var(--border-subtle)] overflow-hidden hover:border-amber-400/50 transition-all duration-500 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                            <Lightning size={120} weight="duotone" className="text-amber-400" />
                        </div>
                        <IconBox icon={Lightning} color="#fbbf24" size="lg" className="mb-6 relative z-10" />

                        <div className="relative z-10">
                            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">Nova AI</h3>
                            <p className="text-body-sm text-[var(--text-secondary)] mb-4">
                                Risk analysis & strategy advisor.
                            </p>
                            <div className="flex items-center gap-2 text-amber-400 label group-hover:gap-3 transition-all">
                                Chat Now <ArrowUpRight weight="bold" />
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Access Tier Module */}
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -4 }}
                    onClick={() => setIsTierModalOpen(true)}
                    className="group relative h-full min-h-[260px] p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-[var(--obsidian-surface)] to-black border border-[var(--border-subtle)] overflow-hidden transition-all duration-500 flex flex-col justify-between cursor-pointer md:col-span-2 lg:col-span-1"
                    style={{ borderColor: `color-mix(in srgb, ${tierColor} 20%, transparent)` }}
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-all duration-500">
                        <CurrentTierIcon size={120} weight="duotone" style={{ color: tierColor }} />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <IconBox icon={CurrentTierIcon} color={tierColor} size="lg" />

                            <span
                                className="px-3 py-1 rounded-lg border label"
                                style={{
                                    backgroundColor: `color-mix(in srgb, ${tierColor} 10%, transparent)`,
                                    borderColor: `color-mix(in srgb, ${tierColor} 20%, transparent)`,
                                    color: tierColor
                                }}
                            >
                                {currentTierName}
                            </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1">{currentTierName} Tier</h3>
                        <p className="text-body-sm text-[var(--text-secondary)] mb-6">
                            {nextTier
                                ? `Unlock ${nextTierName} benefits at $${nextLevelThreshold.toLocaleString()}.`
                                : "You have reached the highest tier status."}
                        </p>

                        <div className="space-y-3">
                            {nextTier ? (
                                <>
                                    <div className="flex justify-between label">
                                        <span className="text-[var(--text-secondary)]">Progress</span>
                                        <span className="text-white">${Math.floor(totalBalance).toLocaleString()} / ${nextLevelThreshold.toLocaleString()}</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${progress}%`, backgroundColor: tierColor }}
                                        />
                                    </div>
                                    <p className="label text-[var(--text-tertiary)] lowercase">
                                        ${Math.max(0, nextLevelThreshold - totalBalance).toLocaleString()} more to unlock {nextTierName}
                                    </p>
                                </>
                            ) : (
                                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                                    <Crown size={20} weight="duotone" className="text-[var(--volt)]" />
                                    <span className="label text-white">Max Level Achieved</span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </StaggerContainer>

            <TierDetailsModal
                isOpen={isTierModalOpen}
                onClose={() => setIsTierModalOpen(false)}
                currentTierName={currentTierName}
                totalBalance={totalBalance}
            />
        </div>
    );
}

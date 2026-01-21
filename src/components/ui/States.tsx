"use client";

import { motion } from "framer-motion";
import { Tray, ArrowsClockwise, Vault, Sparkle, ArrowRight, RocketLaunch } from "@phosphor-icons/react";
import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({ title = "No data yet", description = "When you have activity, it will appear here.", icon, action }: EmptyStateProps) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-[var(--border-subtle)] flex items-center justify-center mb-4">{icon || <Tray size={28} className="text-[var(--text-tertiary)]" weight="duotone" />}</div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">{description}</p>
            {action && (
                <button onClick={action.onClick} className="px-5 py-2.5 rounded-xl bg-[var(--volt)] text-black font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2">
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}

// Special empty state for first-time vault users
interface VaultEmptyStateProps {
    onDeposit?: () => void;
}

export function VaultEmptyState({ onDeposit }: VaultEmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex flex-col items-center justify-center py-16 px-8 text-center overflow-hidden"
        >
            {/* Animated Background Glow */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[var(--volt)]/10 blur-[100px] rounded-full"
            />

            {/* Floating Icon */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--volt)]/20 to-transparent border border-[var(--volt)]/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(204,255,0,0.15)]"
            >
                <Vault size={48} className="text-[var(--volt)]" weight="duotone" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 -right-1"
                >
                    <Sparkle size={20} className="text-[var(--volt)]" weight="fill" />
                </motion.div>
            </motion.div>

            <h3 className="relative z-10 text-2xl font-black uppercase tracking-tight text-white mb-3">
                Ready to Earn?
            </h3>
            <p className="relative z-10 text-sm text-[var(--text-secondary)] max-w-md mb-8 leading-relaxed">
                Deposit ETH into the vault and start earning yield automatically. No lockups, withdraw anytime.
            </p>

            {/* Stats Preview */}
            <div className="relative z-10 flex items-center gap-6 mb-8 text-center">
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <p className="text-2xl font-black text-[var(--volt)]">~8%</p>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Est. APY</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <p className="text-2xl font-black text-white">0</p>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Lock Days</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <p className="text-2xl font-black text-[var(--success)]">✓</p>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">Audited</p>
                </div>
            </div>

            <Link
                href="/dashboard/deposit"
                className="relative z-10 group flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--volt)] text-black font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--volt)] focus-visible:outline-offset-2"
            >
                <RocketLaunch size={18} weight="duotone" />
                Make First Deposit
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>

            <p className="relative z-10 text-[10px] text-[var(--text-tertiary)] mt-4 italic">
                Start with as little as 0.001 ETH
            </p>
        </motion.div>
    );
}

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return <div className={`skeleton animate-pulse ${className}`} />;
}

export function CardSkeleton() {
    return (
        <div className="p-6 rounded-2xl bg-[var(--obsidian-surface)] border border-[var(--border-subtle)]">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

export function ActivitySkeleton() {
    return (
        <div className="p-6 flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-24" />
        </div>
    );
}

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ErrorState({ title = "Something went wrong", description = "We couldn't load this data. Please try again.", onRetry }: ErrorStateProps) {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--error)]/10 border border-[var(--error)]/20 flex items-center justify-center mb-4">
                <ArrowsClockwise size={28} className="text-[var(--error)]" weight="bold" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">{description}</p>
            {onRetry && (
                <button onClick={onRetry} className="px-5 py-2.5 rounded-xl border border-[var(--border-medium)] text-white font-bold text-sm hover:bg-white/5 active:scale-[0.98] transition-all flex items-center gap-2">
                    <ArrowsClockwise size={16} weight="bold" />
                    Try Again
                </button>
            )}
        </motion.div>
    );
}

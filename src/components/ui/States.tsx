"use client";

import { motion } from "framer-motion";
import { Inbox, RefreshCw } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export function EmptyState({
    title = "No data yet",
    description = "When you have activity, it will appear here.",
    icon,
    action
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 px-6 text-center"
        >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-[var(--border-subtle)] flex items-center justify-center mb-4">
                {icon || <Inbox size={28} className="text-[var(--text-tertiary)]" />}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">
                {description}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-5 py-2.5 rounded-xl bg-[var(--volt)] text-black font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all"
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div className={`skeleton animate-pulse ${className}`} />
    );
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

export function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load this data. Please try again.",
    onRetry
}: ErrorStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 px-6 text-center"
        >
            <div className="w-16 h-16 rounded-2xl bg-[var(--error)]/10 border border-[var(--error)]/20 flex items-center justify-center mb-4">
                <RefreshCw size={28} className="text-[var(--error)]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-6">
                {description}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-5 py-2.5 rounded-xl border border-[var(--border-medium)] text-white font-bold text-sm hover:bg-white/5 active:scale-[0.98] transition-all flex items-center gap-2"
                >
                    <RefreshCw size={16} />
                    Try Again
                </button>
            )}
        </motion.div>
    );
}

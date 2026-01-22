"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X, LockKeyOpen, LockKey } from "@phosphor-icons/react";
import { ACCESS_LEVELS } from "@/constants";
import { AccessLevel } from "@/types";

interface TierDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentTierName: string;
    totalBalance: number;
}

export function TierDetailsModal({ isOpen, onClose, currentTierName, totalBalance }: TierDetailsModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[var(--obsidian-surface)] border border-[var(--border-medium)] w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 sm:p-8 border-b border-[var(--border-subtle)] flex justify-between items-center bg-[var(--obsidian-base)]">
                                <div>
                                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-1">Access Tiers</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Unlock higher yields and exclusive benefits.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-[var(--text-secondary)] hover:text-white"
                                >
                                    <X size={20} weight="bold" />
                                </button>
                            </div>

                            {/* Tiers Grid */}
                            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {ACCESS_LEVELS.map((tier) => {
                                        const isUnlocked = totalBalance >= tier.min;
                                        const isCurrent = tier.name.toLowerCase() === currentTierName.toLowerCase();
                                        const Icon = tier.icon;

                                        // Define base color for this tier
                                        const tierColors: Record<string, string> = {
                                            INITIATE: "var(--text-secondary)",
                                            ASSOCIATE: "var(--info)",
                                            PARTNER: "var(--volt)",
                                            SOVEREIGN: "var(--warning)"
                                        };
                                        const baseColor = tierColors[tier.name] || "var(--text-secondary)";

                                        return (
                                            <div
                                                key={tier.name}
                                                className={`relative p-6 rounded-2xl border transition-all duration-300 flex flex-col h-full ${isCurrent
                                                        ? "ring-1"
                                                        : isUnlocked
                                                            ? "bg-[var(--obsidian-base)] border-[var(--border-medium)]"
                                                            : "bg-[var(--obsidian-base)] border-[var(--border-subtle)] opacity-60 grayscale-[0.5]"
                                                    }`}
                                                style={isCurrent ? {
                                                    backgroundColor: `color-mix(in srgb, ${baseColor} 5%, transparent)`,
                                                    borderColor: baseColor,
                                                    color: baseColor // This sets the text color context
                                                } : {}}
                                            >
                                                {isCurrent && (
                                                    <div
                                                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-black text-[10px] font-bold uppercase tracking-widest shadow-lg whitespace-nowrap"
                                                        style={{
                                                            backgroundColor: baseColor,
                                                            boxShadow: `0 4px 20px -5px color-mix(in srgb, ${baseColor} 40%, transparent)`
                                                        }}
                                                    >
                                                        Current Tier
                                                    </div>
                                                )}

                                                <div className="flex flex-col items-center text-center mb-6">
                                                    <div
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors`}
                                                        style={isCurrent ? {
                                                            backgroundColor: `color-mix(in srgb, ${baseColor} 10%, transparent)`,
                                                            color: baseColor
                                                        } : {
                                                            backgroundColor: "rgba(255,255,255,0.05)",
                                                            color: "var(--text-secondary)"
                                                        }}
                                                    >
                                                        <Icon size={24} weight="duotone" />
                                                    </div>

                                                    <h3 className={`text-lg font-black uppercase tracking-tight mb-1 ${isCurrent ? "" : "text-[var(--text-primary)]"}`}
                                                        style={isCurrent ? { color: baseColor } : {}}
                                                    >
                                                        {tier.name}
                                                    </h3>

                                                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)] bg-white/5 px-2 py-0.5 rounded">
                                                        {tier.min === 0 ? "Anyone" : `$${tier.min.toLocaleString()}+`}
                                                    </p>
                                                </div>

                                                <div className="space-y-3 mb-6 flex-grow">
                                                    {tier.benefits?.map((benefit, idx) => (
                                                        <div key={idx} className="flex items-start gap-2 text-left">
                                                            <Check
                                                                size={14}
                                                                weight="bold"
                                                                className="mt-0.5 flex-shrink-0"
                                                                style={{ color: isCurrent || isUnlocked ? "var(--success)" : "var(--text-tertiary)" }}
                                                            />
                                                            <span className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
                                                                {benefit}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-auto pt-4 border-t border-white/5 w-full flex justify-center">
                                                    {isUnlocked ? (
                                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--success)" }}>
                                                            <LockKeyOpen weight="bold" /> Unlocked
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-[var(--text-tertiary)] text-xs font-bold uppercase tracking-widest">
                                                            <LockKey weight="bold" /> Locked
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
